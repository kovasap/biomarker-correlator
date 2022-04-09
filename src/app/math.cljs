(ns app.math)

(defn round [n]
  (/ (Math/round (* 1000 (+ n (. js/Number -EPSILON)))) 1000))

(defn average
  {:malli/schema [:=> [:cat [:sequential :double]] :double]}
  [coll]
  (/ (reduce + coll) (count coll)))
