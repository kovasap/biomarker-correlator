(ns app.time
  (:require
    [cljs-time.core :as time]
    [cljs-time.coerce :refer [to-long from-long]]
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

(defn date-to-timestamp
  {:malli/schema [:=> [:cat Date] Timestamp]}
  [date]
  (map-to-timestamp (parse-date-range date)))

(def PeriodIdTypes
  [:enum :month :2-month :year :none])

(defn get-period-id
  {:malli/schema [:=> [:cat Timestamp PeriodIdTypes] :string]}
  [timestamp period-type]
  (let [date-time (from-long timestamp)
        year (time/year date-time)
        month (time/month date-time)
        day (time/day date-time)
        hour (time/hour date-time)]
    (case period-type
      :none (str timestamp)
      :month (str month "-" year)
      :2-month (str (if (even? month)
                      (str (dec month) "+" month)
                      (str month "+" (inc month)))
                    "-" year)
      :year (str year))))

(defn group-by-period
  {:malli/schema [:=> [:cat [:sequential [:map [:timestamp Timestamp]]]
                       PeriodIdTypes]
                  [:map-of :string [:sequential [:map [:timestamp Timestamp]]]]]}
  [data period-type]
  (group-by #(get-period-id (:timestamp %) period-type) data))

(group-by-period
  [{:timestamp (date-to-timestamp "1/1/00") :a 1}
   {:timestamp (date-to-timestamp "1/5/00") :a 2}
   {:timestamp (date-to-timestamp "1/6/00") :a 3}
   {:timestamp (date-to-timestamp "2/6/00") :a 4}]
  :month) 
