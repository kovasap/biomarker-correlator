(ns app.stats-test
  (:require
   [app.stats :as stats]
   [cljs.test :refer (deftest is)]))

(deftest test-linear-regression
  (is (= {:slope 1 :rsq 1}
         (stats/calc-correlation
           :var1 :var2 [{:var1 1 :var2 1}
                        {:var1 2 :var2 2}
                        {:var1 3 :var2 3}]))))


(deftest folate-glucose-correlation
  (is (= {:correlation -0.05
          :correlation-p-value 0.81
          :datapoints 32}
         (stats/calc-correlation
           :folate :glucose 
           [{:folate "1410.8" :glucose "80"}
            {:folate "1376.3" :glucose "84"}
            {:folate "2026.4" :glucose "92"}
            {:folate "1930.3" :glucose "92"}
            {:folate "1447.0" :glucose "90"}
            {:folate "1254.7" :glucose "93"}
            {:folate "1423.8" :glucose "85"}
            {:folate "2148.2" :glucose "91"}
            {:folate "1506.3" :glucose "87"}
            {:folate "1646.6" :glucose "88"}
            {:folate "1403.3" :glucose "92"}
            {:folate "1673.0" :glucose "81"}
            {:folate "2167.5" :glucose "91"}
            {:folate "1662.5" :glucose "91"}
            {:folate "1557.3" :glucose "89"}
            {:folate "1242.2" :glucose "83"}
            {:folate "1384.0" :glucose "99"}
            {:folate "1308.2" :glucose "94"}
            {:folate "1718.9" :glucose "85"}
            {:folate "1564.5" :glucose "88"}
            {:folate "1570.3" :glucose "99"}
            {:folate "1754.6" :glucose "90"}
            {:folate "1845.1" :glucose "86"}
            {:folate "1142.4" :glucose "95"}
            {:folate "1857.6" :glucose "96"}
            {:folate "1645.4" :glucose "90"}
            {:folate "1541.1" :glucose "94"}
            {:folate "1708.4" :glucose "89"}
            {:folate "1404.7" :glucose "87"}
            {:folate "1703.2" :glucose "84"}
            {:folate "1635.3" :glucose "94"}
            {:folate "1178.6" :glucose "98"}]))))

            
