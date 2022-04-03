(ns app.biomarker-data
  (:require
    [app.time :as time]
    [app.specs :as specs]
    [oz.core :as oz]
    [app.csv-data-processing :as proc]
    [cljs.spec.alpha :as s]))

; TODO fix when https://github.com/metosin/malli/issues/652 is resolved
; (the map in TimeseriesData should only ever have two values (the :timestamp
; and one other))
(def TimeseriesData
  [:sequential [:map [:timestamp time/Timestamp]]])

(def HRTimeseriesData
  [:sequential [:map [:timestamp time/Timestamp]
                     [:hr [:or :nil :double]]]])

(def HazardRatioData
  [:map [:value :double]
        [:hr-low :double]
        [:hr-hi :double]])

(def BiomarkerData
  [:map [:notes specs/Hiccup]
        [:source :string]
        [:men [:sequential HazardRatioData]]
        [:women [:sequential HazardRatioData]]])

(defn get-var-name
  {:malli/schema [:=> [:cat TimeseriesData] :keyword]}
  [personal-data]
  (if (empty? personal-data)
    :no-data
    (-> personal-data
      first
      (#(dissoc % :timestamp))
      keys
      first)))


(defn add-hrs
  "Adds hazard ratios to personal data points for plotting purposes."
  {:malli/schema [:=> [:cat TimeseriesData [:sequential HazardRatioData]]
                      HRTimeseriesData]}
  [personal-data acm-data]
  (if (empty? personal-data)
    []
    (let [var-name (get-var-name personal-data)
          hr-to-value (into {} (for [{:keys [value hr-low hr-hi]} acm-data]
                                 [value (+ hr-low (/ (- hr-hi hr-low) 2))]))]
      (mapv #(assoc % :hr (get hr-to-value (var-name %)))
            personal-data))))


(defn make-acm-plot
  ; TODO add a spec check here that ensures the key in the ::timeseries-data is
  ; the same as the key used to access the ::biomarker-data
  {:malli/schema [:=> [:cat TimeseriesData BiomarkerData]
                  specs/ReagentComponent]}
  [personal-data bio-data]
  ; TODO add an if statement to switch between male and female data.
  (let [acm-data (:men bio-data)
        var-name (get-var-name personal-data)]
    [oz.core/vega-lite
     {:data {:values (concat acm-data
                             (add-hrs personal-data acm-data))}
      :width 850
      :height 450
      :layer [{:mark {:type "errorband"
                      :interpolate "linear"} ; :extent "stddev"}}
               :encoding {:x {:field :value
                              :scale {:zero false}
                              :type "quantitative"}
                          :y {:field :hr-hi
                              :scale {:zero false}
                              :type "quantitative"}
                          :y2 {:field :hr-low}}}
              {:mark {:type "circle"}
               :encoding {:x {:field var-name
                              :scale {:zero false}
                              :type "quantitative"}
                          :y {:field :hr
                              :scale {:zero false}
                              :type "quantitative"}
                          :color {:field :timestamp 
                                  :scale {:type "time"
                                          :scheme "magma"}}}}]}]))

(def data
  {:glucose
   {:notes
    [:p "in mg/dL, fully adjusted for age, smoking status, alcohol use, physical
    activity, BMI, systolic blood pressure, and total cholesterol.  OPEN
    QUESTION: if we are using data corrected for these vars, do we need to
    correct our own data for them for the comparison to be valid?  The stepwise
    appearance of this graph is intentional - it is how the researchers
    collected their data.  One thing we could do to remove the stepwise nature
    is average the two :value points that have the same HR range and plot those
    averaged points."]
    :source
    "10.1038/s41598-017-08498-6, Figure 2"
    :men
    [{:value 64.0  :hr-low 1.19  :hr-hi 1.27}
     {:value 65.0  :hr-low 1.06  :hr-hi 1.12}
     {:value 69.0  :hr-low 1.06  :hr-hi 1.12}
     {:value 70.0  :hr-low 1.05  :hr-hi 1.08}
     {:value 74.0  :hr-low 1.05  :hr-hi 1.08}
     {:value 75.0  :hr-low 1.02  :hr-hi 1.05}
     {:value 79.0  :hr-low 1.02  :hr-hi 1.05}
     {:value 80.0  :hr-low 1.00  :hr-hi 1.02}
     {:value 84.0  :hr-low 1.00  :hr-hi 1.02}
     {:value 85.0  :hr-low 0.98  :hr-hi 1.01}
     {:value 89.0  :hr-low 0.98  :hr-hi 1.01}
     {:value 90.0  :hr-low 1.00  :hr-hi 1.00}
     {:value 94.0  :hr-low 1.00  :hr-hi 1.00}
     {:value 95.0  :hr-low 1.00  :hr-hi 1.03}
     {:value 99.0  :hr-low 1.00  :hr-hi 1.03}
     {:value 100.0 :hr-low 1.04  :hr-hi 1.07}
     {:value 104.0 :hr-low 1.04  :hr-hi 1.07}
     {:value 105.0 :hr-low 1.09  :hr-hi 1.12}
     {:value 109.0 :hr-low 1.09  :hr-hi 1.12}
     {:value 110.0 :hr-low 1.16  :hr-hi 1.20}
     {:value 117.0 :hr-low 1.16  :hr-hi 1.20}
     {:value 118.0 :hr-low 1.25  :hr-hi 1.29}
     {:value 125.0 :hr-low 1.25  :hr-hi 1.29}
     {:value 126.0 :hr-low 1.35  :hr-hi 1.40}
     {:value 139.0 :hr-low 1.35  :hr-hi 1.40}
     {:value 140.0 :hr-low 1.50  :hr-hi 1.55}
     {:value 169.0 :hr-low 1.50  :hr-hi 1.55}
     {:value 170.0 :hr-low 1.68  :hr-hi 1.76}
     {:value 200.0 :hr-low 1.68  :hr-hi 1.76}
     {:value 201.0 :hr-low 2.22  :hr-hi 2.31}]
    :women
    [{:value 65.0  :hr-low 1.11 :hr-hi 1.22}
     {:value 65.0  :hr-low 1.06 :hr-hi 1.15}
     {:value 69.0  :hr-low 1.06 :hr-hi 1.15}
     {:value 70.0  :hr-low 1.04 :hr-hi 1.08}
     {:value 74.0  :hr-low 1.04 :hr-hi 1.08}
     {:value 75.0  :hr-low 1.02 :hr-hi 1.06}
     {:value 79.0  :hr-low 1.02 :hr-hi 1.06}
     {:value 80.0  :hr-low 1.00 :hr-hi 1.04}
     {:value 84.0  :hr-low 1.00 :hr-hi 1.04}
     {:value 85.0  :hr-low 0.99 :hr-hi 1.02}
     {:value 89.0  :hr-low 0.99 :hr-hi 1.02}
     {:value 90.0  :hr-low 1.00 :hr-hi 1.00}
     {:value 94.0  :hr-low 1.00 :hr-hi 1.00}
     {:value 95.0  :hr-low 1.01 :hr-hi 1.05}
     {:value 99.0  :hr-low 1.01 :hr-hi 1.05}
     {:value 100.0 :hr-low 1.03 :hr-hi 1.07}
     {:value 104.0 :hr-low 1.03 :hr-hi 1.07}
     {:value 105.0 :hr-low 1.08 :hr-hi 1.13}
     {:value 109.0 :hr-low 1.08 :hr-hi 1.13}
     {:value 110.0 :hr-low 1.17 :hr-hi 1.22}
     {:value 117.0 :hr-low 1.17 :hr-hi 1.22}
     {:value 118.0 :hr-low 1.22 :hr-hi 1.28}
     {:value 125.0 :hr-low 1.22 :hr-hi 1.28}
     {:value 126.0 :hr-low 1.28 :hr-hi 1.35}
     {:value 139.0 :hr-low 1.28 :hr-hi 1.35}
     {:value 140.0 :hr-low 1.42 :hr-hi 1.50}
     {:value 169.0 :hr-low 1.42 :hr-hi 1.50}
     {:value 170.0 :hr-low 1.70 :hr-hi 1.83}
     {:value 200.0 :hr-low 1.70 :hr-hi 1.83}
     {:value 201.0 :hr-low 2.20 :hr-hi 2.33}]}})
