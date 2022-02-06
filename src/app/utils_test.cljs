(ns app.utils-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.utils :as utils]))

(deftest test-two-digit-year
  (is (= {:year 2002 :month "jan" :date 1}
         (utils/parse-date "1/1/02"))))

(deftest test-bad
  (is (nil? (utils/parse-date "4"))))

(deftest test-bad-range
  (is (nil? (utils/parse-date-range "4 to 5"))))

(deftest test-range
  (is (= {:year 2002 :month "jan" :date 1}
         (utils/parse-date-range "1/1/02 to 2/2/2022"))))
