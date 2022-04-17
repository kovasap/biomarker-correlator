(ns app.aggregation-test
  (:require
   [cljs.test :refer (deftest is)]
   [app.math :as math]
   [app.csv-data-processing :as proc]
   [app.aggregation :refer [aggregate-data]]))

(deftest test-aggregate-data-month
  (is (= (aggregate-data
           (proc/process-csv-data
             [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}
              {:a "100" :b "20" :date "5/1/00"}]
             [{:c "100" :d "20" :date "5/1/00"}])
           :month
           math/average)
         {[954547200000 957139200000]
          {:a 100 :b 20 :timestamp 954633600000 :date "4/2/00 to 5/2/00"}
          [957139200000 959817600000]
          {:a 100 :b 20 :c 100 :d 20 :timestamp 957139200000 :date "5/1/00"}})))


(deftest test-aggregate-data-2-month
  (is (= (aggregate-data
           (proc/process-csv-data
             [{:a "100" :b "20" :date "4/2/00 to 5/2/00"}
              {:a "100" :b "20" :date "5/1/00"}]
             [{:c "100" :d "20" :date "5/1/00"}])
           :2-month
           math/average)
         {[951868800000 957139200000]
          {:a 100 :b 20 :timestamp 954633600000 :date "4/2/00 to 5/2/00"}
          [957139200000 962409600000]
          {:a 100 :b 20 :c 100 :d 20 :timestamp 957139200000 :date "5/1/00"}})))

(deftest test-aggregate-data-2-month-merged
  (is (= (aggregate-data
           (proc/process-csv-data
             [{:a "100" :b "20" :date "3/2/00 to 4/2/00"}
              {:a "100" :b "20" :date "4/1/00"}]
             [{:c "100" :d "20" :date "4/1/00"}])
           :2-month
           math/average)
         {[951868800000 957139200000]
          {:a 100 :b 20 :c 100 :d 20 :timestamp 951955200000
           :date "3/2/00 to 4/2/00"}})))
