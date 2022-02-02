(ns app.stats-test
  (:require
   [app.stats :as stats]
   [cljs.test :refer (deftest is)]))

(deftest test-linear-regression
  (is (= {:slope 1 :rsq 1}
         (stats/calc-correlation
           :var1 :var2 [{:var1 1 :var2 1
                         {:var1 2 :var2 2}
                         {:var1 3 :var2 3}}]))))
