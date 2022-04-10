(ns app.csv-data-processing
  (:require
    [app.time :as time]
    [app.specs :as specs]
    [app.math :as math]
    [clojure.string :as st]
    [clojure.set :refer [union]]))

(def DatedRow
  [:map [:date time/Date]])

; TODO add `:keyword :double` pairs when
; https://github.com/metosin/malli/issues/682 is closed.
(def ProcessedRow
  [:map [:date time/Date]
        [:timestamp time/Timestamp]])

; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  ; TODO find out how to get spec to do this assert for me
  ; (assert (:date (first rows)))
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(defn merge-rows-using-dates
  "Merges N sequences of row maps (e.g. from different spreadsheets) using
  the :date field as the joining attribute."
  {:malli/schema [:=> [:cat [:* [:sequential DatedRow]]]
                  [:sequential DatedRow]]}
  [& sets-of-rows]
  (vals (apply merge-with (fn [row1 row2] (merge row1 row2))
               (map get-rows-by-dates sets-of-rows))))


(defn add-timestamps
  {:malli/schema [:=> [:cat [:sequential DatedRow]]
                  [:sequential DatedRow]]}
  [data]
  (map #(assoc % :timestamp (time/date-to-timestamp (:date %))) data))

(defn not-NaN
  [v]
  (not (or (nil? v) (= "" v))))

(defn floatify-data
  {:malli/schema [:=> [:cat [:sequential DatedRow]]
                  [:sequential DatedRow]]}
  [data]
  (for [row data]
    (into {} (for [[k v] row
                   :when (not-NaN v)]
               [k (if (= k :date) v (js/parseFloat v))]))))

(floatify-data [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}])

; TODO add spec validation to this function
(defn get-all-data-validation-string
  {:malli/schema [:=> [:cat [:* [:sequential DatedRow]]]
                  specs/Hiccup]}
  [& sets-of-rows]
  (let [headers (remove #(= :date %)
                        (flatten (map #(keys (first %)) sets-of-rows)))
        duplicate-headers (for [[id freq] (frequencies headers)
                                :when (> freq 1)]
                            id)]
    (if (seq duplicate-headers)  ; if not empty
      [:div {:style {:color "red"}}
       "Some inputs headers were duplicated: " (st/join ", " duplicate-headers)]
      [:div {:style {:color "green"}} "Data validated successfully"])))

(defn dups [sequence]
  (for [[element freq] (frequencies sequence)
        :when (> freq 1)]
   element))

(defn get-validation-string
  {:malli/schema [:=> [:cat [:sequential DatedRow]]
                  specs/Hiccup]}
  [rows]
  (let [duplicate-dates (dups (map :date rows))]
    (if (> (count duplicate-dates) 0)
      [:div {:style {:color "red"}}
       "Repeated dates found in file " (str duplicate-dates) "!"]
      [:div {:style {:color "green"}} "Data validated successfully"])))

(defn process-csv-data
  {:malli/schema [:=> [:cat [:* [:sequential DatedRow]]]
                  [:sequential ProcessedRow]]}
  [& sets-of-rows]
  (-> (apply merge-rows-using-dates sets-of-rows)
    add-timestamps
    floatify-data))

(process-csv-data [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}
                   {:a "100" :b "20" :date "4/2/10"}]
                  [{:c "100" :d "20" :date "4/2/10"}
                   {:c "" :d "20" :date "4/2/10"}])

(defn combine-rows
  {:malli/schema [:=> [:cat [:=> [:cat [:sequential :double]] :double]
                            [:sequential ProcessedRow]]
                  ProcessedRow]}
  [aggregation-fn rows]
  (let [earliest-row (first (sort-by :timestamp rows))
        unique-keys (reduce union (for [row rows] (set (keys row))))]
    (-> (into {} (for [k unique-keys
                       :when (not (contains? #{:timestamp :date} k))]
                   [k (aggregation-fn (filter #(not (nil? %)) (map k rows)))]))
        (assoc :timestamp (:timestamp earliest-row))
        (assoc :date      (:date earliest-row)))))

(combine-rows math/average [{:b 50} {:a 20 :b 40}])

(defn aggregate-data
  "Merges data points in the input together if they fall inside the same time
  window. The merged data point will use the earliest timestamp from all the points
  in the same window."
  {:malli/schema [:=> [:cat [:sequential ProcessedRow]
                            time/PeriodIdTypes
                            [:=> [:cat [:sequential :double]] :double]]
                  [:sequential ProcessedRow]]}
  [rows period-type aggregation-fn]
  (for [grouped-rows (vals (time/group-by-period rows period-type))]
    (combine-rows aggregation-fn grouped-rows)))
  
; TODO explicitely forbid the "[date] to [date]" input syntax
