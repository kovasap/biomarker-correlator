(ns app.csv
  (:require
   ["csv-parse/sync" :rename {parse parse-csv}]
   ["csv-stringify/sync" :rename {stringify stringify-csv}]
   [cljs.core.async :refer [chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]]
   [cljs.core.async :refer-macros [go go-loop alt!]]
   [reagent.core :as r]
   [clojure.string :refer [lower-case]]))


;; --------- Export as CSV ------------------------------------------

(def csv-data
  (r/atom
    {:input-data
     [{:date "1/1/00 to 2/1/00" :walks 2 :potatoes 10 :climbs 1 :na "1420.9" :b1 "2"}
      {:date "2/2/00 to 3/1/00" :walks 2 :potatoes 10 :climbs 1 :na "1545.1" :b1 "2.5"}
      {:date "3/2/00 to 4/1/00" :walks 3 :potatoes 15 :climbs 3 :na "1679.7" :b1 "2.4"}
      {:date "4/2/00 to 5/1/00" :walks 2 :potatoes 20 :climbs 3 :na "1781.2" :b1 "2.4"}
      {:date "5/2/00"           :walks 2 :potatoes 20 :climbs 3 :na "1728.9" :b1 "2.3"}
      {:date "6/2/00"           :walks 2 :potatoes 20 :climbs 3 :na "1675.3" :b1 "2.2"}
      {:date "7/2/00"           :walks 2 :potatoes 20 :climbs 3 :na "1597.8" :b1 "2.3"}
      {:date "8/2/00"           :walks 2 :potatoes 20 :climbs 3 :na "1591.8" :b1 "2.3"}
      {:date "9/2/00"           :walks 2 :potatoes 20 :climbs 3 :na "1534.1" :b1 "2.4"}
      {:date "10/2/00"          :walks 2 :potatoes 20 :climbs 3 :na "1536.4" :b1 "2.4"}
      {:date "11/2/00"          :walks 2 :potatoes 20 :climbs 3 :na "1588.3" :b1 "2.5"}
      {:date "12/2/00"          :walks 2 :potatoes 20 :climbs 3 :na "1647.3" :b1 "2.2"}
      {:date "1/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "1703.1" :b1 "2.4"}
      {:date "2/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "1467.3" :b1 "2.3"}
      {:date "3/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "1529.2" :b1 "2.3"}
      {:date "4/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "1855.5" :b1 "2.1"}
      {:date "5/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "1687.1" :b1 "2.3"}
      {:date "6/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "2318.2" :b1 "2.1"}
      {:date "7/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "2245.4" :b1 "1.7"}
      {:date "8/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "2485.7" :b1 "1.8"}
      {:date "9/2/01"           :walks 2 :potatoes 20 :climbs 3 :na "2348.5" :b1 "1.9"}
      {:date "10/2/01"          :walks 2 :potatoes 20 :climbs 3 :na "2329.4" :b1 "2"}
      {:date "11/2/01"          :walks 2 :potatoes 20 :climbs 3 :na "2238.0" :b1 "1.9"}
      {:date "12/2/01"          :walks 2 :potatoes 20 :climbs 3 :na "2243.5" :b1 "2.3"}
      {:date "1/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "2078.5" :b1 "2.3"}
      {:date "2/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "1841.9" :b1 "2.1"}
      {:date "3/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "1983.8" :b1 "2.3"}
      {:date "4/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "1917.7" :b1 "2"}
      {:date "5/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "2153.5" :b1 "2.1"}
      {:date "6/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "2689.4" :b1 "2"}
      {:date "7/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "2335.9" :b1 "1.9"}
      {:date "8/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "2114.7" :b1 "1.6"}
      {:date "9/2/02"           :walks 2 :potatoes 20 :climbs 3 :na "1966.3" :b1 "1.7"}
      {:date "10/2/02"          :walks 2 :potatoes 20 :climbs 3 :na "1831.9" :b1 "1.9"}
      {:date "11/2/02"          :walks 2 :potatoes 20 :climbs 3 :na "1831.9" :b1 "2"}
      {:date "12/2/02"          :walks 2 :potatoes 20 :climbs 3 :na "1831.9" :b1 "2"}]
     :biomarker-data
     [{:date "1/1/00 to 2/1/00" :na 100 :health 50 :glucose 65 :hdl "35" :crp ""}
      {:date "2/2/00 to 3/1/00" :BW 100 :health 50 :glucose 65 :hdl "53" :crp ""}
      {:date "3/2/00 to 4/1/00" :BW 150 :health 60 :glucose 70 :hdl "49" :crp ""}
      {:date "4/2/00 to 5/1/00" :BW 150 :health 70 :glucose 80 :hdl "51" :crp ""}
      {:date "5/2/00"           :BW 150 :health 70 :glucose 80 :hdl "53" :crp ""}
      {:date "6/2/00"           :BW 150 :health 70 :glucose 80 :hdl "47" :crp ""}
      {:date "7/2/00"           :BW 150 :health 70 :glucose 80 :hdl "46" :crp ""}
      {:date "8/2/00"           :BW 150 :health 70 :glucose 80 :hdl "40" :crp ""}
      {:date "9/2/00"           :BW 150 :health 70 :glucose 80 :hdl "42" :crp ""}
      {:date "10/2/00"          :BW 150 :health 70 :glucose 80 :hdl "37" :crp ""}
      {:date "11/2/00"          :BW 150 :health 70 :glucose 80 :hdl "38" :crp ""}
      {:date "12/2/00"          :BW 150 :health 70 :glucose 80 :hdl "41" :crp ""}
      {:date "1/2/01"           :BW 150 :health 70 :glucose 80 :hdl "36" :crp ""}
      {:date "2/2/01"           :BW 150 :health 70 :glucose 80 :hdl "45" :crp "0.67"}
      {:date "3/2/01"           :BW 150 :health 70 :glucose 80 :hdl "35" :crp ""}
      {:date "4/2/01"           :BW 150 :health 70 :glucose 80 :hdl "46" :crp ""}
      {:date "5/2/01"           :BW 150 :health 70 :glucose 80 :hdl "34" :crp "0.41"}
      {:date "6/2/01"           :BW 150 :health 70 :glucose 80 :hdl "45" :crp ""}
      {:date "7/2/01"           :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.34"}
      {:date "8/2/01"           :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.47"}
      {:date "9/2/01"           :BW 150 :health 70 :glucose 80 :hdl "53" :crp "0.29"}
      {:date "10/2/01"          :BW 150 :health 70 :glucose 80 :hdl "56" :crp "0.2"}
      {:date "11/2/01"          :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.3"}
      {:date "12/2/01"          :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.37"}
      {:date "1/2/02"           :BW 150 :health 70 :glucose 80 :hdl "46" :crp "0.53"}
      {:date "2/2/02"           :BW 150 :health 70 :glucose 80 :hdl "39" :crp "1.01"}
      {:date "3/2/02"           :BW 150 :health 70 :glucose 80 :hdl "40" :crp "0.84"}
      {:date "4/2/02"           :BW 150 :health 70 :glucose 80 :hdl "44" :crp "0.46"}
      {:date "5/2/02"           :BW 150 :health 70 :glucose 80 :hdl "49" :crp "0.27"}
      {:date "6/2/02"           :BW 150 :health 70 :glucose 80 :hdl "47" :crp "1.01"}
      {:date "7/2/02"           :BW 150 :health 70 :glucose 80 :hdl "41" :crp "0.66"}
      {:date "8/2/02"           :BW 150 :health 70 :glucose 80 :hdl "49" :crp "0.57"}
      {:date "9/2/02"           :BW 150 :health 70 :glucose 80 :hdl "45" :crp "0.69"}
      {:date "10/2/02"          :BW 150 :health 70 :glucose 80 :hdl "39" :crp "0.36"}
      {:date "11/2/02"          :BW 150 :health 70 :glucose 80 :hdl "39" :crp "0.3"}
      {:date "12/2/02"          :BW 150 :health 70 :glucose 80 :hdl "39" :crp "0.3"}]}))

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

(defn -remove-empty-rows
  "The :skip_empty_lines option to parse-csv doesn't always seem to work, so we
  do our own filtering here, removing all rows for which all values are the
  empty string."
  [parsed-data]
  (filter (fn [row] (not= #{""} (set (vals row)))) parsed-data))

(defn -remove-empty-cols
  "Remove empty columns from the parsed csv data."
  [parsed-data]
  (map (fn [row] (dissoc row (keyword ""))) parsed-data))

(defn -standardize-keys
  {:malli/schema [:=> [:cat [:sequential [:map-of :string :string]]]
                  [:sequential [:map-of :keyword :string]]]}
  [parsed-data]
  (map (fn [row] (into {} (for [[k v] row]
                            [(keyword (lower-case k)) v])))
       parsed-data))

(defn my-parse-csv [csv-data]
  (let [parsed-data
        (js->clj
          (parse-csv csv-data (clj->js {:columns true
                                        :skip_empty_lines true
                                        :trim true})))]
          ; We do this ourselves in -standardize-keys
          ; :keywordize-keys true)]
    (-> parsed-data
      -standardize-keys
      -remove-empty-rows
      -remove-empty-cols)))

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
