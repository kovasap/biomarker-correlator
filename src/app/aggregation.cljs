(ns app.aggregation
  (:require
    [app.math :as math]
    [app.time :as time]
    [clojure.set :refer [union]]
    [clojure.string :as st]
    [app.specs :as specs]
    [app.csv-data-processing :refer [ProcessedRow]]))

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
                  [:map-of time/PeriodRange ProcessedRow]]}
  [rows period-type aggregation-fn]
  (into {} (for [[period grouped-rows] (time/group-by-period rows period-type)]
             [period (combine-rows aggregation-fn grouped-rows)])))

(defn aggregation-section
  {:malli/schema [:=> [:cat :any ; Actually an atom containing a keyword.
                            [:sequential time/PeriodRange]]
                  specs/ReagentComponent]}
  [aggregation-granularity aggregate-ranges]
  [:div
   [:h4 "Aggregation"]
   [:p "If your input data is not already aggregated to your desired time
    granularity you can aggregate it here. This is necessary if for example
    you have exact timings for all your measurements, but would like to
    correlate them to each other based on the windows of time they fall
    into."]
   (for [period-type (rest time/PeriodIdTypes)]
     [:div {:key period-type}
      [:input {:type :radio
               :name "period-type"
               :id period-type
               :on-change #(reset! aggregation-granularity
                                   (keyword (-> % .-target .-id)))}]
      [:label {:for period-type} (name period-type)]])
   [:p "These aggregate periods were found and are being used:"]
   [:pre (st/join "\n" (for [[start end] (sort aggregate-ranges)]
                         (str (time/timestamp-to-date-string start) " to "
                              (time/timestamp-to-date-string end))))]
   [:p "Not yet implemented is to do a two-tiered aggregation (e.g.
    get total calories eaten in a day, then average those cals-per-day
    numbers across a two-month span). Currently a two-month aggregation
    of a bunch of per-meal calorie datapoints will just return the
    average number of calories per meal, which is not really what we
    want. Each tier of aggregation should take a time window and a aggregation
    function (mean, median, total, etc.) that will collapse all the data points
    in that window to a single point."]
   [:p "Note that " [:code "<date>-to-<date>"] " syntax in the input
    files will just take the first date at the time point and ignore
    the second!"]])
