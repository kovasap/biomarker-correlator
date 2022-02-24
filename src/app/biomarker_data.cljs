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
  {:glucose
   {:notes
    "in mg/dL, fully adjusted for age, smoking status, alcohol use, physical
    activity, BMI, systolic blood pressure, and total cholesterol."
    :source
    "10.1038/s41598-017-08498-6, Figure 2"
    :men
    [{:value 64  :hr-low 1.19  :hr-hi 1.27}
     {:value 65  :hr-low 1.06  :hr-hi 1.12}
     {:value 69  :hr-low 1.06  :hr-hi 1.12}
     {:value 70  :hr-low 1.05  :hr-hi 1.08}
     {:value 74  :hr-low 1.05  :hr-hi 1.08}
     {:value 75  :hr-low 1.02  :hr-hi 1.05}
     {:value 79  :hr-low 1.02  :hr-hi 1.05}
     {:value 80  :hr-low 1.00  :hr-hi 1.02}
     {:value 84  :hr-low 1.00  :hr-hi 1.02}
     {:value 85  :hr-low 0.98  :hr-hi 1.01}
     {:value 89  :hr-low 0.98  :hr-hi 1.01}
     {:value 90  :hr-low 1.00  :hr-hi 1.00}
     {:value 94  :hr-low 1.00  :hr-hi 1.00}
     {:value 95  :hr-low 1.00  :hr-hi 1.03}
     {:value 99  :hr-low 1.00  :hr-hi 1.03}
     {:value 100 :hr-low 1.04  :hr-hi 1.07}
     {:value 104 :hr-low 1.04  :hr-hi 1.07}
     {:value 105 :hr-low 1.09  :hr-hi 1.12}
     {:value 109 :hr-low 1.09  :hr-hi 1.12}
     {:value 110 :hr-low 1.16  :hr-hi 1.20}
     {:value 117 :hr-low 1.16  :hr-hi 1.20}
     {:value 118 :hr-low 1.25  :hr-hi 1.29}
     {:value 125 :hr-low 1.25  :hr-hi 1.29}
     {:value 126 :hr-low 1.35  :hr-hi 1.40}
     {:value 139 :hr-low 1.35  :hr-hi 1.40}
     {:value 140 :hr-low 1.50  :hr-hi 1.55}
     {:value 169 :hr-low 1.50  :hr-hi 1.55}
     {:value 170 :hr-low 1.68  :hr-hi 1.76}
     {:value 200 :hr-low 1.68  :hr-hi 1.76}
     {:value 201 :hr-low 2.22  :hr-hi 2.31}]
    :women
    [{:value 65  :hr-low 1.11 :hr-hi 1.22}
     {:value 65  :hr-low 1.06 :hr-hi 1.15}
     {:value 69  :hr-low 1.06 :hr-hi 1.15}
     {:value 70  :hr-low 1.04 :hr-hi 1.08}
     {:value 74  :hr-low 1.04 :hr-hi 1.08}
     {:value 75  :hr-low 1.02 :hr-hi 1.06}
     {:value 79  :hr-low 1.02 :hr-hi 1.06}
     {:value 80  :hr-low 1.00 :hr-hi 1.04}
     {:value 84  :hr-low 1.00 :hr-hi 1.04}
     {:value 85  :hr-low 0.99 :hr-hi 1.02}
     {:value 89  :hr-low 0.99 :hr-hi 1.02}
     {:value 90  :hr-low 1.00 :hr-hi 1.00}
     {:value 94  :hr-low 1.00 :hr-hi 1.00}
     {:value 95  :hr-low 1.01 :hr-hi 1.05}
     {:value 99  :hr-low 1.01 :hr-hi 1.05}
     {:value 100 :hr-low 1.03 :hr-hi 1.07}
     {:value 104 :hr-low 1.03 :hr-hi 1.07}
     {:value 105 :hr-low 1.08 :hr-hi 1.13}
     {:value 109 :hr-low 1.08 :hr-hi 1.13}
     {:value 110 :hr-low 1.17 :hr-hi 1.22}
     {:value 117 :hr-low 1.17 :hr-hi 1.22}
     {:value 118 :hr-low 1.22 :hr-hi 1.28}
     {:value 125 :hr-low 1.22 :hr-hi 1.28}
     {:value 126 :hr-low 1.28 :hr-hi 1.35}
     {:value 139 :hr-low 1.28 :hr-hi 1.35}
     {:value 140 :hr-low 1.42 :hr-hi 1.50}
     {:value 169 :hr-low 1.42 :hr-hi 1.50}
     {:value 170 :hr-low 1.70 :hr-hi 1.83}
     {:value 200 :hr-low 1.70 :hr-hi 1.83}
     {:value 201 :hr-low 2.20 :hr-hi 2.33}]}})
