(ns app.core-test
  (:require
   [cljs.test :refer (deftest is)]
   [clojure.string :as st]
   [app.core :as core]))

(deftest test-linear-regression
  (is (= {:slope 1 :rsq 1}
         (core/calc-linear-regression :var1 :var2
                                      [{:var1 1 :var2 1}
                                       {:var1 2 :var2 2}
                                       {:var1 3 :var2 3}]))))

(deftest test-maps-to-html
  (is (= [:table]
         (core/maps-to-html
          [{"input1" "biomarker1" :slope 5 :rsq 2}
           {"input2" "biomarker1" :slope 10 :rsq 2}]))))

(deftest test-make-per-input-correlation-results
  (is (= []
         (core/make-per-input-correlation-results
          [{:input 1 :biomarker :a :slope 2 :rsq 1 :datapoints 5}
           {:input 2 :biomarker :a :slope 2 :rsq 1 :datapoints 5}
           {:input 3 :biomarker :b :slope 2 :rsq 1 :datapoints 5}
           {:input 4 :biomarker :b :slope 2 :rsq 1 :datapoints 5}]))))

; Reproducing bad map problem.

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
