(ns app.time
  (:require
    [cljs-time.core :as time]
    [cljs-time.coerce :refer [to-long from-long to-string]]
    [clojure.string :as st]))


(def Date :string)
(def Timestamp [:and :int [:>= 0]])
; Outputs dates in format https://vega.github.io/vega-lite/docs/datetime.html
(def VegaDate [:map [:month :int]
                    [:date :int]
                    [:year :int]])

(defn map-to-timestamp
  {:malli/schema [:=> [:cat VegaDate] Timestamp]}
  [{:keys [month date year]}]
  (to-long (time/date-time year month date)))

(defn parse-date
  {:malli/schema [:=> [:cat Date] [:or :nil VegaDate]]}
  [date-string]
  (let [split (st/split (st/trim date-string) "/")]
    (if (not (= 3 (count split)))
      nil
      (let [[month day year] split]
        {:month (int month)
         :date (int day)
         :year (int (case (count year)
                       2 (str "20" year)
                       4 year
                       nil))}))))

(defn parse-date-range
  "Converts a range like '1/1/2021 to 2/1/2021' into a single date. Will return
  the first date unless it is unparsable, in which case will return the second.
  If no 'to' is in the string, will just return the only date (if it is one)."
  {:malli/schema [:=> [:cat Date] VegaDate]}
  [date-range]
  (let [split-date (st/split date-range " to ")]
    (cond
      (= 1 (count split-date)) (parse-date (first split-date))
      :else
      (let [[date1 date2] split-date 
            parsed1 (parse-date date1)
            parsed2 (parse-date date2)]
        (if (nil? parsed1)
          parsed2
          parsed1)))))

(st/split "4/4/4" " to ")

(defn timestamp-to-full-string
  {:malli/schema [:=> [:cat Timestamp] :string]}
  [timestamp]
  (to-string (from-long timestamp)))

(defn timestamp-to-date-string
  {:malli/schema [:=> [:cat Timestamp] :string]}
  [timestamp]
  (first (st/split (to-string (from-long timestamp)) "T")))

(defn date-to-timestamp
  {:malli/schema [:=> [:cat Date] Timestamp]}
  [date]
  (map-to-timestamp (parse-date-range date)))

(def PeriodIdTypes
  [:enum :month :2-month :year :none])

(def PeriodRange
  "Start and end timestamps for a range of time."
  [:cat Timestamp Timestamp])

(defn get-period-range
  "Returns the period range in which the input timestamp falls."
  {:malli/schema [:=> [:cat Timestamp PeriodIdTypes] PeriodRange]}
  [timestamp period-type]
  (let [date-time (from-long timestamp)
        year (time/year date-time)
        month (time/month date-time)
        day (time/day date-time)
        hour (time/hour date-time)]
    (case period-type
      :none [timestamp timestamp]
      :month [(to-long (time/date-time year month 1)) 
              (to-long (time/date-time year (inc month) 1))] 
      :2-month (if (even? month)
                 [(to-long (time/date-time year (dec month) 1))
                  (to-long (time/date-time year (inc month) 1))]
                 [(to-long (time/date-time year month 1))
                  (to-long (time/date-time year (+ 2 month) 1))])
      :year [(to-long (time/date-time year 1 1))
             (to-long (time/date-time (inc year) 1 1))])))

(defn group-by-period
  {:malli/schema [:=> [:cat [:sequential [:map [:timestamp Timestamp]]]
                       PeriodIdTypes]
                  [:map-of PeriodRange [:sequential
                                        [:map [:timestamp Timestamp]]]]]}
  [data period-type]
  (group-by #(get-period-range (:timestamp %) period-type) data))

(group-by-period
  [{:timestamp (date-to-timestamp "1/1/00") :a 1}
   {:timestamp (date-to-timestamp "1/5/00") :a 2}
   {:timestamp (date-to-timestamp "1/6/00") :a 3}
   {:timestamp (date-to-timestamp "2/6/00") :a 4}]
  :month) 
