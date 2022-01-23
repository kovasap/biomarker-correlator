(ns app.stats
  (:require
   [clojure.string :as st]
   [app.specs :as specs]
   [kixi.stats.core :as kixi-c]
   [kixi.stats.protocols :as kixi-p]))

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
     identity (kixi-c/r-squared
               #(compute-linear-estimate linear-model (var1 %))
               var2)
     data)))

(defn filter-missing
  "Remove maps from data (collection of maps) for which any of the given keys
  are not present or have nil values."
  [data & ks]
  (filter (fn [datum] (every? #(not (st/blank? (% datum))) ks))
          data))

(defn round [n]
  (/ (Math/round (* 1000 (+ n (. js/Number -EPSILON)))) 1000))

(defn calc-linear-regression [var1 var2 data]
  (let [cleaned-data (filter-missing data var1 var2)
        result (transduce identity
                          (kixi-c/simple-linear-regression var1 var2)
                          cleaned-data)
        error (transduce identity
                         (kixi-c/regression-standard-error var1 var2)
                         cleaned-data)
        rsq (calc-rsq result var1 var2 cleaned-data)]
    ; (prn "Computing correlation between " var1 " and " var2 " gives " result
    ;      " with error " error " and r-squared " rsq]
    {:datapoints (count cleaned-data)
     :slope (round (if (nil? result) nil
                       (last (kixi-p/parameters result))))
     :rsq (round rsq)}))
