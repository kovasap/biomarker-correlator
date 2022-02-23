(ns app.biomarker-data
  (:require
    [app.time]
    [app.specs]
    [oz.core :as oz]
    [app.csv-data-processing :as proc]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
    [cljs.spec.alpha :as s]))

(s/def ::timeseries-data (s/and #(= 2 (count %))
                                (s/keys :req-un [:app.time/timestamp])))

(>defn make-acm-plot
  [personal-data acm-data]
  [::timeseries-data ? => :app.specs/hiccup]
  [oz.core/vega-lite
   {:data {:values cleaned-data}
    :layer [{:mark {:type "errorband" :extent "stddev"}}
            :encoding {:x {:field var1
                           :scale (get-plot-scale var1 data)
                           :type "quantitative"}
                       :y {:field var2
                           :scale (get-plot-scale var2 data)
                           :type "quantitative"}
                       :color {:field :timestamp 
                               :scale {:type "time"
                                       :scheme "viridis"}}}]
    :width 300
    :height 300
    :mark "circle"}])

(def data
  {:glucose {}})
