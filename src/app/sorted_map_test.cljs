(ns app.sorted-map-test
  (:require
   [clojure.string :as st]
   [cljs.test :refer (deftest is)]))

; Reproducing sorted map problem.
; See discussion at https://groups.google.com/g/clojurescript/c/0-SJ0zmVX6c/m/Rt7rDog5CgAJ

(prn *clojurescript-version*)

(defn single-row [result-row]
  {:input (:input result-row)
   (keyword (st/join [(name (:biomarker result-row)) "-datapoints"])) (:datapoints result-row)})

(defn sort-map [m]
  ; Sort row so that :input is first, then put this rest in alphabetical order
  (into (sorted-map-by #(if (= % :input) "aaaaa" (name %))) m))

(defn get-per-input-row [same-input-results]
  ; Calling sort-map twice here resolves the problem.
  (sort-map (reduce merge (map single-row same-input-results))))

(defn make-per-input-results
  [results]
  (let [rows-by-input (group-by :input results)]
    (map get-per-input-row (vals rows-by-input))))

(deftest test-bad-map-sorting
  (is (= '({:input 1 :a-datapoints 5}
           {:input 2 :a-datapoints 5}
           {:input 3 :b-datapoints 5}
           {:input 4 :b-datapoints 5})
         (make-per-input-results
          [{:input 1 :biomarker :a :datapoints 5}
           {:input 2 :biomarker :a :datapoints 5}
           {:input 3 :biomarker :b :datapoints 5}
           {:input 4 :biomarker :b :datapoints 5}]))))
