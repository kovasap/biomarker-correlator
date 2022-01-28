(ns app.ui-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.ui :as ui]))

(deftest test-maps-to-html
  (is (= [:table]
         (ui/maps-to-html
          [{"input1" "biomarker1" :slope 5 :rsq 2}
           {"input2" "biomarker1" :slope 10 :rsq 2}]))))


