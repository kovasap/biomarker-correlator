(ns app.stats-test
  (:require
   [app.stats :as stats]
   [clojure.set :refer [subset?]]
   [cljs.test :refer (deftest is)]))

(deftest folate-glucose-correlation
  (is (subset?
        (set {:correlation -0.045
              :p-value 0.805
              :datapoints 32})
        (set (stats/calc-correlation
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
                {:folate "1178.6" :glucose "98"}])))))

            
; See https://github.com/kovasap/biomarker-correlator/issues/1
(deftest na-hdl-correlation
  (is (subset?
        (set {:correlation 0.515
              :p-value 0.002
              :datapoints 34})
        (set (stats/calc-correlation
               :hdl :na
              [{:hdl "35" :na "1420.9"}
               {:hdl "53" :na "1545.1"}
               {:hdl "49" :na "1679.7"}
               {:hdl "51" :na "1781.2"}
               {:hdl "53" :na "1728.9"}
               {:hdl "47" :na "1675.3"}
               {:hdl "46" :na "1597.8"}
               {:hdl "40" :na "1591.8"}
               {:hdl "42" :na "1534.1"}
               {:hdl "37" :na "1536.4"}
               {:hdl "38" :na "1588.3"}
               {:hdl "41" :na "1647.3"}
               {:hdl "36" :na "1703.1"}
               {:hdl "45" :na "1467.3"}
               {:hdl "35" :na "1529.2"}
               {:hdl "46" :na "1855.5"}
               {:hdl "34" :na "1687.1"}
               {:hdl "45" :na "2318.2"}
               {:hdl "51" :na "2245.4"}
               {:hdl "51" :na "2485.7"}
               {:hdl "53" :na "2348.5"}
               {:hdl "56" :na "2329.4"}
               {:hdl "51" :na "2238.0"}
               {:hdl "51" :na "2243.5"}
               {:hdl "46" :na "2078.5"}
               {:hdl "39" :na "1841.9"}
               {:hdl "40" :na "1983.8"}
               {:hdl "44" :na "1917.7"}
               {:hdl "49" :na "2153.5"}
               {:hdl "47" :na "2689.4"}
               {:hdl "41" :na "2335.9"}
               {:hdl "49" :na "2114.7"}
               {:hdl "45" :na "1966.3"}
               {:hdl "39" :na "1831.9"}])))))
