(ns app.csv
  (:require
   ["csv-parse/sync" :rename {parse parse-csv}]
   ["csv-stringify/sync" :rename {stringify stringify-csv}]
   [cljs.core.async :refer [chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]]
   [cljs.core.async :refer-macros [go go-loop alt!]]
   [reagent.core :as r]))


;; --------- Export as CSV ------------------------------------------

(def csv-data
  (r/atom
    {:input-data
     [{:date "1/1/00 to 2/1/00" :walks 2 :potatoes 10 :leaves 300 :climbs 1}
      {:date "2/2/00 to 3/1/00" :walks 2 :potatoes 10 :leaves 300 :climbs 1}
      {:date "3/2/00 to 4/1/00" :walks 3 :potatoes 15 :leaves 300 :climbs 3}
      {:date "4/2/00 to 5/1/00" :walks 2 :potatoes 20 :leaves 300 :climbs 3}]
     :biomarker-data
     [{:date "1/1/00 to 2/1/00" :BW 100 :health 50 :bio-age 6 :glucose 65}
      {:date "2/2/00 to 3/1/00" :BW 100 :health 50 :bio-age 8 :glucose 65}
      {:date "3/2/00 to 4/1/00" :BW 150 :health 60 :bio-age 9 :glucose 70}
      {:date "4/2/00 to 5/1/00" :BW 150 :health 70 :bio-age 9 :glucose 80}]}))

(defn maps-to-csv [maps]
  (stringify-csv
    (clj->js maps)
    (clj->js {:header true})))

(defn download-as-csv [maps export-name]
  (let [data-blob (js/Blob. #js [(maps-to-csv maps)]
                            #js {:type "text/csv;charset=utf-8;"})
        link (.createElement js/document "a")]
    (set! (.-href link) (.createObjectURL js/URL data-blob))
    (.setAttribute link "download" export-name)
    (.appendChild (.-body js/document) link)
    (.click link)
    (.removeChild (.-body js/document) link)))

;; -------- Data "Uploading" --------------------------------------------
;; From https://mrmcc3.github.io/blog/posts/csv-with-clojurescript/ 

(def first-file
  (map (fn [e]
         (let [target (.-currentTarget e)
               file (-> target .-files (aget 0))]
           (set! (.-value target) "")
           file))))

(defn my-parse-csv [csv-data]
  ; [{}])
  (js->clj
   (parse-csv csv-data (clj->js {:columns true
                                 :skip_empty_lines true
                                 :trim true}))
   :keywordize-keys true))

(def extract-result
  (map #(-> % .-target .-result my-parse-csv)))

;;; Input data file

(def input-upload-reqs (chan 1 first-file))
(def input-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! input-upload-reqs)]
    (swap! csv-data assoc :input-file-name (.-name file))
    (set! (.-onload reader) #(put! input-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! csv-data assoc :input-data (<! input-file-reads))
  (recur))

;; Biomarker data file
(def biomarker-upload-reqs (chan 1 first-file))
(def biomarker-file-reads (chan 1 extract-result))

(go-loop []
  (let [reader (js/FileReader.)
        file (<! biomarker-upload-reqs)]
    (swap! csv-data assoc :biomarker-file-name (.-name file))
    (set! (.-onload reader) #(put! biomarker-file-reads %))
    (.readAsText reader file)
    (recur)))

(go-loop []
  (swap! csv-data assoc :biomarker-data (<! biomarker-file-reads))
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
    ;;   [:i.fa.fa-times {:on-click #(reset! csv-data {})}]]]]])
