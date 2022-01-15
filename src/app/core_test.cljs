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

(deftest test-correlation-results-to-html
  (is (= [:table]
         (core/correlation-results-to-html
          [["input1" "biomarker1" {:slope 5 :rsq 2}]
           ["input2" "biomarker1" {:slope 10 :rsq 2}]]))))
