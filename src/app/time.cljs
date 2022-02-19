(ns app.time
  (:require
    [cljs-time.core :refer [date-time]]
    [cljs-time.coerce :refer [to-long]]
    [clojure.string :as st]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
    [cljs.spec.alpha :as s]
    [spec-tools.data-spec :as ds]))


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

(s/def ::date string?)

; Outputs dates in format https://vega.github.io/vega-lite/docs/datetime.html
(s/def ::vega-date
  (ds/spec ::vega-date {:month int?
                        :date int?
                        :year int?}))

(>defn parse-date-range
  "Converts a range like '1/1/2021 to 2/1/2021' into a single date. Will return
  the first date unless it is unparsable, in which case will return the second"
  [date-range]
  [::date => ::vega-date]
  (let [[date1 date2] (st/split date-range " to ")
        parsed1 (parse-date date1)
        parsed2 (parse-date date2)]
    (if (nil? parsed1)
      parsed2
      parsed1)))
