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
     [{:date "1/1/00 to 2/1/00" :walks 2 :potatoes 10 :climbs 1 :na "1420.9"}
      {:date "2/2/00 to 3/1/00" :walks 2 :potatoes 10 :climbs 1 :na "1545.1"}
      {:date "3/2/00 to 4/1/00" :walks 3 :potatoes 15 :climbs 3 :na "1679.7"}
      {:date "4/2/00 to 5/1/00" :walks 2 :potatoes 20 :climbs 3 :na "1781.2"}
      {:date "5/2/00"  :walks 2 :potatoes 20 :climbs 3 :na "1728.9"}
      {:date "6/2/00"  :walks 2 :potatoes 20 :climbs 3 :na "1675.3"}
      {:date "7/2/00"  :walks 2 :potatoes 20 :climbs 3 :na "1597.8"}
      {:date "8/2/00"  :walks 2 :potatoes 20 :climbs 3 :na "1591.8"}
      {:date "9/2/00"  :walks 2 :potatoes 20 :climbs 3 :na "1534.1"}
      {:date "10/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1536.4"}
      {:date "11/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1588.3"}
      {:date "12/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1647.3"}
      {:date "1/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "1703.1"}
      {:date "2/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "1467.3"}
      {:date "3/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "1529.2"}
      {:date "4/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "1855.5"}
      {:date "5/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "1687.1"}
      {:date "6/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "2318.2"}
      {:date "7/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "2245.4"}
      {:date "8/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "2485.7"}
      {:date "9/2/01"  :walks 2 :potatoes 20 :climbs 3 :na "2348.5"}
      {:date "10/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2329.4"}
      {:date "11/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2238.0"}
      {:date "12/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2243.5"}
      {:date "1/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "2078.5"}
      {:date "2/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "1841.9"}
      {:date "3/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "1983.8"}
      {:date "4/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "1917.7"}
      {:date "5/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "2153.5"}
      {:date "6/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "2689.4"}
      {:date "7/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "2335.9"}
      {:date "8/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "2114.7"}
      {:date "9/2/02"  :walks 2 :potatoes 20 :climbs 3 :na "1966.3"}
      {:date "10/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1831.9"}]
     :biomarker-data
     [{:date "1/1/00 to 2/1/00" :na 100 :health 50 :glucose 65 :hdl "35"}
      {:date "2/2/00 to 3/1/00" :BW 100 :health 50 :glucose 65 :hdl "53"}
      {:date "3/2/00 to 4/1/00" :BW 150 :health 60 :glucose 70 :hdl "49"}
      {:date "4/2/00 to 5/1/00" :BW 150 :health 70 :glucose 80 :hdl "51"}
      {:date "5/2/00"  :BW 150 :health 70 :glucose 80 :hdl "53"}
      {:date "6/2/00"  :BW 150 :health 70 :glucose 80 :hdl "47"}
      {:date "7/2/00"  :BW 150 :health 70 :glucose 80 :hdl "46"}
      {:date "8/2/00"  :BW 150 :health 70 :glucose 80 :hdl "40"}
      {:date "9/2/00"  :BW 150 :health 70 :glucose 80 :hdl "42"}
      {:date "10/2/00" :BW 150 :health 70 :glucose 80 :hdl "37"}
      {:date "11/2/00" :BW 150 :health 70 :glucose 80 :hdl "38"}
      {:date "12/2/00" :BW 150 :health 70 :glucose 80 :hdl "41"}
      {:date "1/2/01"  :BW 150 :health 70 :glucose 80 :hdl "36"}
      {:date "2/2/01"  :BW 150 :health 70 :glucose 80 :hdl "45"}
      {:date "3/2/01"  :BW 150 :health 70 :glucose 80 :hdl "35"}
      {:date "4/2/01"  :BW 150 :health 70 :glucose 80 :hdl "46"}
      {:date "5/2/01"  :BW 150 :health 70 :glucose 80 :hdl "34"}
      {:date "6/2/01"  :BW 150 :health 70 :glucose 80 :hdl "45"}
      {:date "7/2/01"  :BW 150 :health 70 :glucose 80 :hdl "51"}
      {:date "8/2/01"  :BW 150 :health 70 :glucose 80 :hdl "51"}
      {:date "9/2/01"  :BW 150 :health 70 :glucose 80 :hdl "53"}
      {:date "10/2/01" :BW 150 :health 70 :glucose 80 :hdl "56"}
      {:date "11/2/01" :BW 150 :health 70 :glucose 80 :hdl "51"}
      {:date "12/2/01" :BW 150 :health 70 :glucose 80 :hdl "51"}
      {:date "1/2/02"  :BW 150 :health 70 :glucose 80 :hdl "46"}
      {:date "2/2/02"  :BW 150 :health 70 :glucose 80 :hdl "39"}
      {:date "3/2/02"  :BW 150 :health 70 :glucose 80 :hdl "40"}
      {:date "4/2/02"  :BW 150 :health 70 :glucose 80 :hdl "44"}
      {:date "5/2/02"  :BW 150 :health 70 :glucose 80 :hdl "49"}
      {:date "6/2/02"  :BW 150 :health 70 :glucose 80 :hdl "47"}
      {:date "7/2/02"  :BW 150 :health 70 :glucose 80 :hdl "41"}
      {:date "8/2/02"  :BW 150 :health 70 :glucose 80 :hdl "49"}
      {:date "9/2/02"  :BW 150 :health 70 :glucose 80 :hdl "45"}
      {:date "10/2/02" :BW 150 :health 70 :glucose 80 :hdl "39"}]}))

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
