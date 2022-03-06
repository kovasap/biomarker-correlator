(ns app.core-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.core :as core]))

(deftest test-flatten-map
  (is (= {:input :hi :slope 50}
         (core/flatten-map {:input :hi :results {:slope 50}}))))

