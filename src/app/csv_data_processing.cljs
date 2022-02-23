(ns app.csv-data-processing
  (:require
    [app.time :as time]
    [cljs.spec.alpha :as s]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]))

(s/def ::dated-row (s/keys :req-un [:app.time/date]))
(s/def ::dated-rows (s/coll-of ::dated-row))

; Also all values are floats (not strings)
(s/def ::processed-row (s/keys :req-un [:app.time/date
                                        :app.time/timestamp]))
(s/def ::processed-rows (s/coll-of ::processed-row))

; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  ; TODO find out how to get spec to do this assert for me
  ; (assert (:date (first rows)))
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(>defn merge-rows-using-dates
  "Merges two sequences of row maps (e.g. from different spreadsheets) using
  the :date field as the joining attribute."
  [& rows]
  [(s/coll-of ::dated-rows)
   => ::dated-rows]
  (vals (merge-with (fn [row1 row2] (merge row1 row2))
                    (map get-rows-by-dates rows))))


(>defn add-timestamps
  [data]
  [::dated-rows => ::dated-rows]
  (map #(assoc % :timestamp (time/map-to-timestamp
                              (time/parse-date-range
                                (:date %))))
       data))

(>defn floatify-data
  [data]
  [::dated-rows => ::dated-rows]
  (map #(into {} (map (fn [[k v]] [k (js/parseFloat v)]) %)) data))

(floatify-data [{:a "100" :b "20"}])


(>defn process-csv-data
  [& rows]
  [(s/coll-of ::dated-rows)
   => ::processed-rows]
  (-> (merge-rows-using-dates rows)
      add-timestamps
      floatify-data))