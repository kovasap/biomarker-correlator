(ns app.core-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.core :as core]))

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

(deftest test-flatten-map
  (is (= {:input :hi :slope 50}
         (core/flatten-map {:input :hi :results {:slope 50}}))))

(deftest test-flatten-map-concat-keys
  (is (= {:input :hi :results-slope 50}
         (core/flatten-map-concat-keys {:input :hi :results {:slope 50}} "-"))))
