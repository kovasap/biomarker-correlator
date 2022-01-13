(ns app.core
  (:require
   [app.submodule :as submodule]
   [cljs.core.async :refer [chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]]
   [cljs.core.async :refer-macros [go go-loop alt!]]
   [cljs.spec.alpha :as s]
   ["csv-parse/lib/sync" :rename {parse parse-csv}]
   ["csv-stringify/lib/sync" :rename {stringify stringify-csv}]
   [kixi.stats.core :as kixi]
   [reagent.core :as r]
   [reagent.dom :as d]))

(def app-state (r/atom {:input-data [{}]
                        :biomarker-data [{}]}))

;; -------- Specs ----------------------------------------------

;; TODO add date validation here
(s/def :bc/date (s/and string? #(re-matches #".* to .*" %)))

(s/def :bc/dated-row (s/keys :req [:bc/date]))

(s/def :bc/dated-rows (fn [input] every? #(s/valid? :bc/dated-row %) input))

;; -------- Data "Uploading" --------------------------------------------
;; From https://mrmcc3.github.io/blog/posts/csv-with-clojurescript/ 

(def first-file
  (map (fn [e]
         (let [target (.-currentTarget e)
               file (-> target .-files (aget 0))]
           (set! (.-value target) "")
           file))))

(defn my-parse-csv [csv-data]
  (js->clj
   (parse-csv csv-data (clj->js {:columns true
                                 :skip_empty_lines true
                                 :trim true}))
   :keywordize-keys true))

(def extract-result
  (map #(-> % .-target .-result my-parse-csv)))

;; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  {:pre [(s/valid? :bc/dated-rows rows)]}
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(defn merge-rows-using-dates [rows1 rows2]
  {:pre [(s/valid? :bc/dated-rows rows1)
         (s/valid? :bc/dated-rows rows2)]
   :post [(s/valid? :bc/dated-rows %)]}
  (vals (merge-with (fn [row1 row2] (merge row1 row2))
                    (get-rows-by-dates rows1) (get-rows-by-dates rows2))))

;; Input data file

(def input-upload-reqs (chan 1 first-file))
(def input-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! input-upload-reqs)]
    (swap! app-state assoc :input-file-name (.-name file))
    (set! (.-onload reader) #(put! input-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! app-state assoc :input-data (<! input-file-reads))
  (recur))

;; Biomarker data file

(def biomarker-upload-reqs (chan 1 first-file))
(def biomarker-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! biomarker-upload-reqs)]
    (swap! app-state assoc :biomarker-file-name (.-name file))
    (set! (.-onload reader) #(put! biomarker-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! app-state assoc :biomarker-data (<! biomarker-file-reads))
  (recur))

(defn upload-btn [file-name upload-reqs-channel]
  [:span.upload-label
   [:label.file-label
    [:input.file-input
     {:type "file" :accept ".csv" :on-change #(put! upload-reqs-channel %)}]
    [:span.file-cta
     [:span.file-icon
      [:i.fa.fa-upload.fa-lg]]
     [:span.file-label (or file-name "Choose a file...")]]]])
     ;; Adds an "X" that can be clicked to clear the selected file.
     ;; (when file-name 
    ;;   [:i.fa.fa-times {:on-click #(reset! app-state {})}]]]]])

;; ----------------------------------------------------

; model is [offset slope]
(defn compute-linear-estimate [model input]
  (prn "model" (.stringify js/JSON model))
  (let [offset (first model)
        slope (last model)]
    (+ offset (* slope input))))

(defn compute-correlation [var1 var2 data]
  (let [result (transduce identity (kixi/simple-linear-regression var1 var2) data)
        error (transduce identity (kixi/regression-standard-error var1 var2) data)
        ; To compute r-squared, we need to compare each value in data for var2
        ; to the value we would expected to get for var2 if we plugged var1
        ; into our linear model (computed by kixi/simple-linear-regression)
        ; To do this, we need to pass in to kixi/r-squared: 
        ;   1. a function that takes in a data entry, plugs var1 into the linear
        ;      model, and returns the var2 value according to the model
        ;   2. a function that takes in a data entry and returns the actual
        ;      var2 value
        rsq (transduce identity (kixi/r-squared #(compute-linear-estimate result (var1 %)) var2) data)]
    (prn "Computing correlation between " var1 " and " var2 " gives " result
         " with error " error " and r-squared " rsq)
    result))

(defn compute-correlations [input-data biomarker-data]
  (prn input-data)
  (prn biomarker-data)
  (let [input-vars (filter #(not= % :date) (keys (first input-data)))
        biomarker-vars (filter #(not= % :date) (keys (first biomarker-data)))
        merged-data (merge-rows-using-dates input-data biomarker-data)
        results (for [input input-vars biomarker biomarker-vars]
                  [input biomarker (compute-correlation input biomarker merged-data)])]
    (prn results)
    (prn (stringify-csv (clj->js results)))
    [:div "Results"]))

(defn home-page []
  (let [{:keys [input-file-name biomarker-file-name input-data biomarker-data]
         :as state} @app-state]
    [:div.app
     [:div.topbar.hidden-print [upload-btn input-file-name input-upload-reqs]]
     [:div.topbar.hidden-print [upload-btn biomarker-file-name biomarker-upload-reqs]]
     [compute-correlations input-data biomarker-data]]))

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
