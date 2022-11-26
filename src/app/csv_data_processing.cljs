;TODO remove this file
(ns app.csv-data-processing
  (:require
    [app.time :as time]
    [clojure.string :refer [replace]]))

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
