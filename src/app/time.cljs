(ns app.time
  (:require
    [cljs-time.core :refer [date-time]]
    [cljs-time.coerce :refer [to-long]]
    [clojure.string :as st]))


(defn parse-date
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

(defn map-to-timestamp
  [{:keys [month date year]}]
  (to-long (date-time year month date)))

(def Date :string)
(def Timestamp [:and :int [:>= 0]])
; Outputs dates in format https://vega.github.io/vega-lite/docs/datetime.html
(def VegaDate [:map [:month :int]
                    [:date :int]
                    [:year :int]])

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
