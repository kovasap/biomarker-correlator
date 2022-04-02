(ns app.csv-data-processing
  (:require
    [app.time :as time]
    [app.specs :as specs]
    [clojure.string :as st]))

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
  (map #(assoc % :timestamp (time/map-to-timestamp
                              (time/parse-date-range
                                (:date %))))
       data))

(defn floatify-data
  {:malli/schema [:=> [:cat [:sequential DatedRow]]
                  [:sequential DatedRow]]}
  [data]
  (map #(into {} (map (fn [[k v]]
                        [k (if (= k :date)
                             v
                             (js/parseFloat v))])
                      %))
       data))

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

(process-csv-data [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}]
                  [{:a "100" :b "20" :date "4/2/10"}])
