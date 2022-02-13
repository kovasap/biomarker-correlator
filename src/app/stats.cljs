(ns app.stats
  (:require
   [oz.core :as oz]
   [app.specs :as specs]
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

(defn round [n]
  (/ (Math/round (* 1000 (+ n (. js/Number -EPSILON)))) 1000))

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

(defn calc-correlation [var1 var2 data]
  (let [cleaned-data (map #(select-keys % [:timestamp var1 var2])
                          (filter-missing data var1 var2))
        ; linear-result (transduce identity
        ;                          (kixi/simple-linear-regression var1 var2)
        ;                          cleaned-data))
        ; rsq (calc-rsq linear-result var1 var2 cleaned-data)
        correlation-result (get-correlation-with-pval cleaned-data var1 var2)]
        ; error (transduce identity
        ;                  (kixi/regression-standard-error var1 var2)
        ;                  cleaned-data]
    ; (prn (first  cleaned-data))
    ; (if (and (= var1 :folate) (= var2 :glucose))
    ;   (do (prn cleaned-data) (prn correlation-result))
    ; {:linear-slope (round (if (nil? linear-result) nil
    ;                           (last (kixi-p/parameters linear-result)))]
    ;  :linear-r-squared (round rsq)
    {:vega-scatterplot [oz.core/vega-lite
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
     :correlation (round (:correlation correlation-result))
     :correlation-p-value (round (:p-value correlation-result))
     :datapoints (count cleaned-data)}))
