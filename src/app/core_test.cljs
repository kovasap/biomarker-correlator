(ns app.core-test
  (:require
   [cljs.test :refer (deftest is)]
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
          [["input1" "biomarker1" {:slope 5 :rsq 2}]
           ["input2" "biomarker1" {:slope 10 :rsq 2}]]))))

(deftest test-make-per-input-correlation-results
  (is (= []
         (core/make-per-input-correlation-results
          [{:input 1 :biomarker :a :slope 2 :rsq 1 :datapoints 5}
           {:input 2 :biomarker :a :slope 2 :rsq 1 :datapoints 5}
           {:input 3 :biomarker :b :slope 2 :rsq 1 :datapoints 5}
           {:input 4 :biomarker :b :slope 2 :rsq 1 :datapoints 5}]))))

(deftest test-sorted-map
  (is (= {:input 6, :a 4, :c 1, :b 2}
         (into (sorted-map-by #(if (= % :input) "aaa" (name %)))
               {:b 2 :c 1 :a 4 :input 6}))))

(defn help-test-map-sorted-maps [m]
  (into (sorted-map-by #(if (= % :input) "aaa" (name %))) m))

(deftest test-map-sorted-maps
  (is (= []
         (let [data (group-by :input [{:b 5 :a-ad 4 :input 6}
                                      {:b 10 :a-ad 4 :input 5}])]
           (map help-test-map-sorted-maps (vals data))))))

;; I don't think sorted-map-by can be relied upon in cljs
