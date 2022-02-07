(ns app.core-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.core :as core]))

(deftest test-make-per-input-correlation-results
  (is (= []
         (core/make-per-input-correlation-results
          [{:input 1 :biomarker :a :slope 2 :rsq 1 :datapoints 5}
           {:input 2 :biomarker :a :slope 2 :rsq 1 :datapoints 5}
           {:input 3 :biomarker :b :slope 2 :rsq 1 :datapoints 5}
           {:input 4 :biomarker :b :slope 2 :rsq 1 :datapoints 5}]
          {1 {:input 1 :score 2}}))))

(deftest test-flatten-map
  (is (= {:input :hi :slope 50}
         (core/flatten-map {:input :hi :results {:slope 50}}))))

(deftest test-flatten-map-concat-keys
  (is (= {:input :hi :results-slope 50}
         (core/flatten-map-concat-keys {:input :hi :results {:slope 50}} "-"))))
