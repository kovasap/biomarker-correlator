(ns app.time-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.time :as time]))

(deftest test-two-digit-year
  (is (= {:year 2002 :month 1 :date 1}
         (time/parse-date "1/1/02"))))

(deftest test-bad
  (is (nil? (time/parse-date "4"))))

(deftest test-bad-range
  (is (nil? (time/parse-date-range "4 to 5"))))

(deftest test-range
  (is (= {:year 2002 :month 1 :date 1}
         (time/parse-date-range "1/1/02 to 2/2/2022"))))
