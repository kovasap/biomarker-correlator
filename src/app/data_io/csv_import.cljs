(ns app.data-io.csv-import
  (:require
    [app.data-atom :refer [data]]
    [app.data-io.csv-parsing :refer [parse-csv]]
    [cljs.core.async :refer [chan put! take! >! <! timeout close! alts!]]
    [cljs.core.async :refer-macros [go-loop alt!]]
    [reagent.core :as r]))


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
    ;;   [:i.fa.fa-times {:on-click #(reset! data {})}]]]]])


;; -------- Data "Uploading" --------------------------------------------
;; From https://mrmcc3.github.io/blog/posts/csv-with-clojurescript/ 

(def first-file
  (map (fn [e]
         (let [target (.-currentTarget e)
               file (-> target .-files (aget 0))]
           (set! (.-value target) "")
           file))))

(def extract-result
  (map #(-> % .-target .-result parse-csv)))

;;; Input data file

(def input-filename (r/atom ""))
(def input-upload-reqs (chan 1 first-file))
(def input-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! input-upload-reqs)]
    (reset! input-filename (.-name file))
    (set! (.-onload reader) #(put! input-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! data assoc :input-data (<! input-file-reads))
  (recur))

(defn input-ui []
  [:div.topbar.hidden-print "\"Upload\" input data"
   [upload-btn @input-filename input-upload-reqs]])
  

;; Biomarker data file

(def biomarker-filename (r/atom ""))
(def biomarker-upload-reqs (chan 1 first-file))
(def biomarker-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! biomarker-upload-reqs)]
    (reset! biomarker-filename (.-name file))
    (set! (.-onload reader) #(put! biomarker-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! data assoc :biomarker-data (<! biomarker-file-reads))
  (recur))

(defn biomarker-ui []
  [:div.topbar.hidden-print
   "\"Upload\" biomarker data"
   [upload-btn @biomarker-filename biomarker-upload-reqs]])

;; Correlation Adjustment data file

(def adjustment-filename (r/atom ""))
(def adjustment-upload-reqs (chan 1 first-file))
(def adjustment-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! adjustment-upload-reqs)]
    (reset! adjustment-filename (.-name file))
    (set! (.-onload reader) #(put! adjustment-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! data assoc :adjustment-data (<! adjustment-file-reads))
  (recur))

(defn adjustment-ui []
  [:div.topbar.hidden-print
   "\"Upload\" adjustment data"
   [upload-btn @adjustment-filename adjustment-upload-reqs]])


(defn csv-ui []
  [:div
   [:h4 "CSV"]
   [input-ui]
   [biomarker-ui]
   [adjustment-ui]])
