(ns app.core
  (:require
   [app.submodule :as submodule]
   [cljs.core.async :refer [chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]]
   [cljs.core.async :refer-macros [go go-loop alt!]]
   [clojure.string :as s]
   ["csv-parse/lib/sync" :rename {parse parse-csv}]
   [kixi.stats.core :as kixi]
   [reagent.core :as r]
   [reagent.dom :as d]))


(def app-state (r/atom {:empty "map"}))


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

(def upload-reqs (chan 1 first-file))
(def file-reads (chan 1 extract-result))

(defn put-upload [e]
  (put! upload-reqs e))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! upload-reqs)]
    (swap! app-state assoc :file-name (.-name file))
    (set! (.-onload reader) #(put! file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! app-state assoc :data (<! file-reads))
  (recur))

(defn upload-btn [file-name]
  [:span.upload-label
   [:label.file-label
    [:input.file-input
     {:type "file" :accept ".csv" :on-change put-upload}]
    [:span.file-cta
     [:span.file-icon
      [:i.fa.fa-upload.fa-lg]]
     [:span.file-label (or file-name "Choose a file...")]]]])
    ;; Adds an "X" that can be clicked to clear the selected file.
    ;; (when file-name 
    ;;   [:i.fa.fa-times {:on-click #(reset! app-state {})}]]]]])

;; ----------------------------------------------------


(defn compute-correlations [data]
  (prn data)
  (prn (:Cals (first data)))
  (prn (transduce identity (kixi/correlation :Cals :PhenoAge) data))
  [:div "Results"])


(defn home-page []
  (let [{:keys [file-name data] :as state} @app-state]
    [:div.app
     [:div.topbar.hidden-print 
      [upload-btn file-name]]
     [compute-correlations data]]))


;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
