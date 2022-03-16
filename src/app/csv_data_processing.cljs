(ns app.csv-data-processing
  (:require
    [app.time :as time]
    [app.specs :as specs]
    [cljs.spec.alpha :as s]
    [malli.core :as m]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
    [clojure.set :refer [union]]
    [clojure.string :as st]))

(s/def ::dated-row (s/keys :req-un [:app.time/date]))
(s/def ::dated-rows (s/coll-of ::dated-row))

; Also all values are floats (not strings)
(s/def ::processed-row (s/keys :req-un [:app.time/date
                                        :app.time/timestamp]))
(s/def ::processed-rows (s/coll-of ::processed-row))

(def DatedRows
  [:sequential [:map [:date time/Date]]])

(def ProcessedRows
  [:sequential [:map [:date time/Date]
                     [:timestamp time/Timestamp]]])

; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  ; TODO find out how to get spec to do this assert for me
  ; (assert (:date (first rows)))
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(>defn merge-rows-using-dates
  "Merges N sequences of row maps (e.g. from different spreadsheets) using
  the :date field as the joining attribute."
  [& sets-of-rows]
  [(s/coll-of ::dated-rows)
   => ::dated-rows]
  (vals (apply merge-with (fn [row1 row2] (merge row1 row2))
               (map get-rows-by-dates sets-of-rows))))


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
  (map #(into {} (map (fn [[k v]]
                        [k (if (= k :date)
                             v
                             (js/parseFloat v))])
                      %))
       data))

(floatify-data [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}])

; TODO add spec validation to this function
(defn get-all-data-validation-string
  {:malli/schema [:=> [:cat [:sequential DatedRows]]
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

(defn get-validation-string
  {:malli/schema [:=> [:cat DatedRows]
                  specs/Hiccup]}
  [rows]
  (let [all-dates (map :date rows)
        unique-dates (set all-dates)]
    (if (not (= (count all-dates) (count unique-dates)))
      [:div {:style {:color "red"}} "Repeated dates found in input!"]
      [:div {:style {:color "green"}} "Data validated successfully"])))

(>defn process-csv-data
  [& sets-of-rows]
  [(s/coll-of ::dated-rows)
   => ::processed-rows]
  (-> (apply merge-rows-using-dates sets-of-rows)
    add-timestamps
    floatify-data))

(process-csv-data [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}])
