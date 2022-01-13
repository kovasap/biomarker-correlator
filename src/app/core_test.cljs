(ns app.core-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.core :as core]))

(deftest a-failing-test
  (is (= 1 2)))

(def test-data
  [{:var1 1 :var2 2}
   {:var1 1 :var2 3}])

(deftest test-correlation
  (is (= 5 (core/compute-correlation :var1 :var2 test-data))))
