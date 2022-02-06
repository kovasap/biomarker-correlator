(ns app.utils
   (:require
     [cljs-time.core :refer [date-time]]
     [cljs-time.coerce :refer [to-long]]
     [clojure.string :as st]))

; Outputs dates in format https://vega.github.io/vega-lite/docs/datetime.html
; TODO encode this in specs

(def months
  ["jan" "feb" "mar" "apr" "may" "jun" "jul" "aug" "sep" "oct" "nov" "dec"])

(defn parse-date
  [date-string]
  (let [split (st/split (st/trim date-string) "/")]
    (if (not (= 3 (count split)))
      nil
      (let [[month day year] split]
        {:month (int month)
        ; {:month (nth months (- (int month) 1))
         :date (int day)
         :year (int (case (count year)
                       2 (str "20" year)
                       4 year
                       nil))}))))

(defn map-to-timestamp
  [{:keys [month date year]}]
  (to-long (date-time year month date)))

(defn parse-date-range
  "Converts a range like '1/1/2021 to 2/1/2021' into a single date. Will return
  the first date unless it is unparsable, in which case will return the second"
  [date-range]
  (let [[date1 date2] (st/split date-range " to ")
        parsed1 (parse-date date1)
        parsed2 (parse-date date2)]
    (if (nil? parsed1)
      parsed2
      parsed1)))
