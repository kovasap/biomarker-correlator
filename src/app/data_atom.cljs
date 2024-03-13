(ns app.data-atom
  (:require [reagent.core :as r]
            [malli.core :as m]
            [app.time :refer [Date Timestamp date-to-timestamp]]))

; TODO add `:keyword :double` pairs when
; https://github.com/metosin/malli/issues/682 is closed.
(def Event
  [:map [:date Date]])

(def DataSchema
  [:map [:raw-data [:map-of Timestamp [:map-of :keyword :double]]]
        [:input-keys [:sequential :keyword]]
        [:biomarker-keys [:sequential :keyword]]
        [:matched-data]])

(def data
  (r/atom {:raw-data {} :input-keys [] :biomarker-keys [] :matched-data {}}
          :validator
          #(m/validate DataSchema %)))

(defn not-NaN
  [v]
  (not (or (nil? v) (= "" v))))

(defn get-event-data
  {:malli/schema [:=> [:cat Event] [:map-of :keyword :double]]}
  [event]
  (into {}
        (for [[k v] event
              :when (and (not (#{:date :keyword} k)) (not-NaN v))]
          [k (js/parseFloat v)])))


(defn add-raw-data!
  "Adds raw data to the master data atom."
  {:malli/schema [:=> [:cat [:sequential Event]] :nil]}
  [events]
  (doseq [event events]
    (let [timestamp (or (:timestamp event) (date-to-timestamp (:date event)))]
      (swap! data (fn [cur-atom-val]
                    (update-in cur-atom-val
                               [:raw-data timestamp]
                               #(merge % (get-event-data event))))))))

(swap! data merge
  {:input-data
       [{:date     "1/1/00 to 2/1/00"
         :walks    2
         :potatoes 10
         :climbs   1
         :na       "1420.9"
         :b1       "2"}
        {:date     "2/2/00 to 3/1/00"
         :walks    2
         :potatoes 10
         :climbs   1
         :na       "1545.1"
         :b1       "2.5"}
        {:date     "3/2/00 to 4/1/00"
         :walks    3
         :potatoes 15
         :climbs   3
         :na       "1679.7"
         :b1       "2.4"}
        {:date     "4/2/00 to 5/1/00"
         :walks    2
         :potatoes 20
         :climbs   3
         :na       "1781.2"
         :b1       "2.4"}
        {:date "5/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1728.9" :b1 "2.3"}
        {:date "6/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1675.3" :b1 "2.2"}
        {:date "7/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1597.8" :b1 "2.3"}
        {:date "8/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1591.8" :b1 "2.3"}
        {:date "9/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1534.1" :b1 "2.4"}
        {:date "10/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1536.4" :b1 "2.4"}
        {:date "11/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1588.3" :b1 "2.5"}
        {:date "12/2/00" :walks 2 :potatoes 20 :climbs 3 :na "1647.3" :b1 "2.2"}
        {:date "1/2/01" :walks 2 :potatoes 20 :climbs 3 :na "1703.1" :b1 "2.4"}
        {:date "2/2/01" :walks 2 :potatoes 20 :climbs 3 :na "1467.3" :b1 "2.3"}
        {:date "3/2/01" :walks 2 :potatoes 20 :climbs 3 :na "1529.2" :b1 "2.3"}
        {:date "4/2/01" :walks 2 :potatoes 20 :climbs 3 :na "1855.5" :b1 "2.1"}
        {:date "5/2/01" :walks 2 :potatoes 20 :climbs 3 :na "1687.1" :b1 "2.3"}
        {:date "6/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2318.2" :b1 "2.1"}
        {:date "7/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2245.4" :b1 "1.7"}
        {:date "8/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2485.7" :b1 "1.8"}
        {:date "9/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2348.5" :b1 "1.9"}
        {:date "10/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2329.4" :b1 "2"}
        {:date "11/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2238.0" :b1 "1.9"}
        {:date "12/2/01" :walks 2 :potatoes 20 :climbs 3 :na "2243.5" :b1 "2.3"}
        {:date "1/2/02" :walks 2 :potatoes 20 :climbs 3 :na "2078.5" :b1 "2.3"}
        {:date "2/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1841.9" :b1 "2.1"}
        {:date "3/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1983.8" :b1 "2.3"}
        {:date "4/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1917.7" :b1 "2"}
        {:date "5/2/02" :walks 2 :potatoes 20 :climbs 3 :na "2153.5" :b1 "2.1"}
        {:date "6/2/02" :walks 2 :potatoes 20 :climbs 3 :na "2689.4" :b1 "2"}
        {:date "7/2/02" :walks 2 :potatoes 20 :climbs 3 :na "2335.9" :b1 "1.9"}
        {:date "8/2/02" :walks 2 :potatoes 20 :climbs 3 :na "2114.7" :b1 "1.6"}
        {:date "9/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1966.3" :b1 "1.7"}
        {:date "10/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1831.9" :b1 "1.9"}
        {:date "11/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1831.9" :b1 "2"}
        {:date "12/2/02" :walks 2 :potatoes 20 :climbs 3 :na "1831.9" :b1 "2"}]
     :biomarker-data
       [{:date    "1/1/00 to 2/1/00"
         :na      100
         :health  50
         :glucose 65
         :hdl     "35"
         :crp     ""}
        {:date    "2/2/00 to 3/1/00"
         :BW      100
         :health  50
         :glucose 65
         :hdl     "53"
         :crp     ""}
        {:date    "3/2/00 to 4/1/00"
         :BW      150
         :health  60
         :glucose 70
         :hdl     "49"
         :crp     ""}
        {:date    "4/2/00 to 5/1/00"
         :BW      150
         :health  70
         :glucose 80
         :hdl     "51"
         :crp     ""}
        {:date "5/2/00" :BW 150 :health 70 :glucose 80 :hdl "53" :crp ""}
        {:date "6/2/00" :BW 150 :health 70 :glucose 80 :hdl "47" :crp ""}
        {:date "7/2/00" :BW 150 :health 70 :glucose 80 :hdl "46" :crp ""}
        {:date "8/2/00" :BW 150 :health 70 :glucose 80 :hdl "40" :crp ""}
        {:date "9/2/00" :BW 150 :health 70 :glucose 80 :hdl "42" :crp ""}
        {:date "10/2/00" :BW 150 :health 70 :glucose 80 :hdl "37" :crp ""}
        {:date "11/2/00" :BW 150 :health 70 :glucose 80 :hdl "38" :crp ""}
        {:date "12/2/00" :BW 150 :health 70 :glucose 80 :hdl "41" :crp ""}
        {:date "1/2/01" :BW 150 :health 70 :glucose 80 :hdl "36" :crp ""}
        {:date "2/2/01" :BW 150 :health 70 :glucose 80 :hdl "45" :crp "0.67"}
        {:date "3/2/01" :BW 150 :health 70 :glucose 80 :hdl "35" :crp ""}
        {:date "4/2/01" :BW 150 :health 70 :glucose 80 :hdl "46" :crp ""}
        {:date "5/2/01" :BW 150 :health 70 :glucose 80 :hdl "34" :crp "0.41"}
        {:date "6/2/01" :BW 150 :health 70 :glucose 80 :hdl "45" :crp ""}
        {:date "7/2/01" :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.34"}
        {:date "8/2/01" :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.47"}
        {:date "9/2/01" :BW 150 :health 70 :glucose 80 :hdl "53" :crp "0.29"}
        {:date "10/2/01" :BW 150 :health 70 :glucose 80 :hdl "56" :crp "0.2"}
        {:date "11/2/01" :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.3"}
        {:date "12/2/01" :BW 150 :health 70 :glucose 80 :hdl "51" :crp "0.37"}
        {:date "1/2/02" :BW 150 :health 70 :glucose 80 :hdl "46" :crp "0.53"}
        {:date "2/2/02" :BW 150 :health 70 :glucose 80 :hdl "39" :crp "1.01"}
        {:date "3/2/02" :BW 150 :health 70 :glucose 80 :hdl "40" :crp "0.84"}
        {:date "4/2/02" :BW 150 :health 70 :glucose 80 :hdl "44" :crp "0.46"}
        {:date "5/2/02" :BW 150 :health 70 :glucose 80 :hdl "49" :crp "0.27"}
        {:date "6/2/02" :BW 150 :health 70 :glucose 80 :hdl "47" :crp "1.01"}
        {:date "7/2/02" :BW 150 :health 70 :glucose 80 :hdl "41" :crp "0.66"}
        {:date "8/2/02" :BW 150 :health 70 :glucose 80 :hdl "49" :crp "0.57"}
        {:date "9/2/02" :BW 150 :health 70 :glucose 80 :hdl "45" :crp "0.69"}
        {:date "10/2/02" :BW 150 :health 70 :glucose 80 :hdl "39" :crp "0.36"}
        {:date "11/2/02" :BW 150 :health 70 :glucose 80 :hdl "39" :crp "0.3"}
        {:date    "12/2/02"
         :BW      150
         :health  70
         :glucose 80
         :hdl     "39"
         :crp     "0.3"}]})
