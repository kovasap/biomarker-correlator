(ns app.stats
  (:require
    [app.specs :as specs]
    [app.csv-data-processing :as proc]
    [app.time :as time]
    [app.math :as math]
    [oz.core :as oz]
    [kixi.stats.math :refer [sq sqrt]]
    [kixi.stats.core :as kixi]
    [kixi.stats.test :as kixi-t]
    [kixi.stats.distribution :as kixi-d]
    [kixi.stats.protocols :as kixi-p]))

(def p-value-cutoff 0.05)

; model is [offset slope]
(defn compute-linear-estimate [model input]
  (let [params (kixi-p/parameters model)
        offset (first params)
        slope (last params)]
    (+ offset (* slope input))))

(defn calc-rsq
  "To compute r-squared, we need to compare each value in data for var2
  to the value we would expected to get for var2 if we plugged var1
  into our linear model (computed by kixi/simple-linear-regression)
  To do this, we need to pass in to kixi/r-squared: 
    1. a function that takes in a data entry, plugs var1 into the linear
       model, and returns the var2 value according to the model
    2. a function that takes in a data entry and returns the actual
       var2 value"
  [linear-model var1 var2 data]
  (if (nil? linear-model)
    nil
    (transduce
     identity (kixi/r-squared
               #(compute-linear-estimate linear-model (var1 %))
               var2)
     data)))

(defn filter-missing
  "Remove maps from data (collection of maps) for which any of the given keys
  are not present or have nil values."
  [data & ks]
  (filter (fn [datum] (every? #(not (js/isNaN (% datum))) ks))
          data))

(defn make-into-floats
  {:malli/schema [:=> [:cat
                       [:map-of :keyword :any]]
                  [:map-of :keyword :double]]}
  [data]
  (into {} (for [[k v] data]
             [k (if (#{:date :timestamp} k)
                  v
                  (js/parseFloat v))])))

(defn get-correlation-with-pval
  "Gets a correlation between the two given vars in the data.
  
  See discussion at https://github.com/MastodonC/kixi.stats/issues/40 for some
  more context"
  [data var1 var2]
  (let [r (transduce identity (kixi/correlation var1 var2) data)
        degrees-of-freedom (- (count data) 2)
        t-stat (/ (* r (sqrt degrees-of-freedom))
                  (sqrt (- 1 (sq r))))
        t-test (kixi-t/test-result t-stat (kixi-d/t {:v degrees-of-freedom}))
        p-val (kixi-t/p-value t-test)]
    {:correlation r
     :p-value p-val}))

(defn get-plot-scale
  [variable data]
  (let [var-data (map variable data)]
    {:domain [(apply min var-data)
              (apply max var-data)]}))

(def CorrelationResults
  [:map [:scatterplot specs/ReagentComponent]
        [:correlation :double]
        [:p-value :double]
        [:raw-data [:sequential [:map [:timestamp time/Timestamp]]]]
        [:datapoints :int]])

(def CorrelationResultsLite
  [:map [:correlation :double]
        [:p-value :double]
        [:datapoints :int]])

(defn calc-correlation
  [var1 var2 data]
  ; [keyword? keyword? :app.specs/maps
  ;  => ::regression-results]
  (let [cleaned-data (map #(select-keys % [:timestamp var1 var2])
                          (filter-missing
                            data ; (map make-into-floats data)
                            var1 var2))
        ; linear-result (transduce identity
        ;                          (kixi/simple-linear-regression var1 var2)
        ;                          cleaned-data))
        ; rsq (calc-rsq linear-result var1 var2 cleaned-data)
        correlation-result (get-correlation-with-pval cleaned-data var1 var2)]
        ; error (transduce identity
        ;                  (kixi/regression-standard-error var1 var2)
        ;                  cleaned-data]
    ; (prn (first  cleaned-data))
    ; (if (and (= var1 :na) (= var2 :hdl))
    ;   (do (prn cleaned-data) (prn correlation-result))
    ; {:linear-slope (round (if (nil? linear-result) nil
    ;                           (last (kixi-p/parameters linear-result)))]
    ;  :linear-r-squared (round rsq)
    {:scatterplot [oz.core/vega-lite
                   {:data {:values cleaned-data}
                    :width 300
                    :height 300
                    :mark "circle"
                    :encoding {:x {:field var1
                                   :scale (get-plot-scale var1 data)
                                   :type "quantitative"}
                               :y {:field var2
                                   :scale (get-plot-scale var2 data)
                                   :type "quantitative"}
                               :color {:field :timestamp 
                                       :scale {:type "time"
                                               :scheme "viridis"}}}}]
     :raw-data cleaned-data
     :correlation (math/round (:correlation correlation-result))
     :p-value (:p-value correlation-result)
     :rounded-p-value (let [rounded-pval
                            (math/round (:p-value correlation-result))]
                        (if (= 0 rounded-pval) "<0.001" (str rounded-pval)))
     :datapoints (count cleaned-data)}))

(def PairwiseCorrelations
  [:sequential
   [:map [:input :keyword]
         [:biomarker :keyword]
         [:regression-results CorrelationResults]]])

(def PairwiseCorrelationsLite
  [:sequential
   [:map [:input :keyword]
         [:biomarker :keyword]
         [:regression-results CorrelationResultsLite]]])

(defn enliten
  {:malli/schema [:=> [:cat PairwiseCorrelations]
                  PairwiseCorrelationsLite]}
  [pairwise-correlations]
  (map #(update-in % [:regression-results] dissoc :scatterplot :raw-data)
       pairwise-correlations))

(defn compute-correlations
  {:malli/schema [:=> [:cat
                       [:sequential :keyword]
                       [:sequential :keyword]
                       [:sequential proc/ProcessedRow]]
                  PairwiseCorrelations]}
  [inputs biomarkers data]
  (for [input inputs
        biomarker biomarkers]
    {:input input
     :biomarker biomarker
     :regression-results (calc-correlation input biomarker data)}))
