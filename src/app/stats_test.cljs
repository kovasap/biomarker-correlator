(ns app.stats-test
  (:require
   [app.stats :as stats]
   [clojure.set :refer [subset?]]
   [cljs.test :refer (deftest is)]))

(deftest folate-glucose-correlation
  (let [{:keys [correlation p-value datapoints]}
        (stats/calc-correlation
          :folate :glucose 
          [{:folate 1410.8 :glucose 80}
           {:folate 1376.3 :glucose 84}
           {:folate 2026.4 :glucose 92}
           {:folate 1930.3 :glucose 92}
           {:folate 1447.0 :glucose 90}
           {:folate 1254.7 :glucose 93}
           {:folate 1423.8 :glucose 85}
           {:folate 2148.2 :glucose 91}
           {:folate 1506.3 :glucose 87}
           {:folate 1646.6 :glucose 88}
           {:folate 1403.3 :glucose 92}
           {:folate 1673.0 :glucose 81}
           {:folate 2167.5 :glucose 91}
           {:folate 1662.5 :glucose 91}
           {:folate 1557.3 :glucose 89}
           {:folate 1242.2 :glucose 83}
           {:folate 1384.0 :glucose 99}
           {:folate 1308.2 :glucose 94}
           {:folate 1718.9 :glucose 85}
           {:folate 1564.5 :glucose 88}
           {:folate 1570.3 :glucose 99}
           {:folate 1754.6 :glucose 90}
           {:folate 1845.1 :glucose 86}
           {:folate 1142.4 :glucose 95}
           {:folate 1857.6 :glucose 96}
           {:folate 1645.4 :glucose 90}
           {:folate 1541.1 :glucose 94}
           {:folate 1708.4 :glucose 89}
           {:folate 1404.7 :glucose 87}
           {:folate 1703.2 :glucose 84}
           {:folate 1635.3 :glucose 94}
           {:folate 1178.6 :glucose 98}])]
    (is (= correlation -0.045))
    (is (= p-value 0.8052837744021459))
    (is (= datapoints 32))))


            
; See https://github.com/kovasap/biomarker-correlator/issues/1
(deftest na-hdl-correlation
  (let [{:keys [correlation p-value datapoints]}
        (stats/calc-correlation
           :hdl :na
          [{:hdl 35 :na 1420.9}
           {:hdl 53 :na 1545.1}
           {:hdl 49 :na 1679.7}
           {:hdl 51 :na 1781.2}
           {:hdl 53 :na 1728.9}
           {:hdl 47 :na 1675.3}
           {:hdl 46 :na 1597.8}
           {:hdl 40 :na 1591.8}
           {:hdl 42 :na 1534.1}
           {:hdl 37 :na 1536.4}
           {:hdl 38 :na 1588.3}
           {:hdl 41 :na 1647.3}
           {:hdl 36 :na 1703.1}
           {:hdl 45 :na 1467.3}
           {:hdl 35 :na 1529.2}
           {:hdl 46 :na 1855.5}
           {:hdl 34 :na 1687.1}
           {:hdl 45 :na 2318.2}
           {:hdl 51 :na 2245.4}
           {:hdl 51 :na 2485.7}
           {:hdl 53 :na 2348.5}
           {:hdl 56 :na 2329.4}
           {:hdl 51 :na 2238.0}
           {:hdl 51 :na 2243.5}
           {:hdl 46 :na 2078.5}
           {:hdl 39 :na 1841.9}
           {:hdl 40 :na 1983.8}
           {:hdl 44 :na 1917.7}
           {:hdl 49 :na 2153.5}
           {:hdl 47 :na 2689.4}
           {:hdl 41 :na 2335.9}
           {:hdl 49 :na 2114.7}
           {:hdl 45 :na 1966.3}
           {:hdl 39 :na 1831.9}])]
    (is (= correlation 0.515))
    (is (= p-value 0.0018470700387155678))
    (is (= datapoints 34))))

; See https://github.com/kovasap/biomarker-correlator/issues/2
(deftest crp-b1-correlation-pruned
  (let [{:keys [correlation p-value datapoints]}
        (stats/calc-correlation
           :crp :b1
          [{:crp 0.67 :b1 2.3}
           {:crp 0.41 :b1 2.3}
           {:crp 0.34 :b1 1.7}
           {:crp 0.47 :b1 1.8}
           {:crp 0.29 :b1 1.9}
           {:crp 0.2  :b1 2}
           {:crp 0.3  :b1 1.9}
           {:crp 0.37 :b1 2.3}
           {:crp 0.53 :b1 2.3}
           {:crp 1.01 :b1 2.1}
           {:crp 0.84 :b1 2.3}
           {:crp 0.46 :b1 2}
           {:crp 0.27 :b1 2.1}
           {:crp 1.01 :b1 2}
           {:crp 0.66 :b1 1.9}
           {:crp 0.57 :b1 1.6}
           {:crp 0.69 :b1 1.7}
           {:crp 0.36 :b1 1.9}
           {:crp 0.3  :b1 2}
           {:crp 0.3  :b1 2}])]
    (is (= correlation 0.132))
    (is (= p-value 0.5776584722913792))
    (is (= datapoints 20))))

(deftest missing-keys-not-counted
  (is (= (stats/clean-data
           :oxalate :crp
           '({:timestamp 1566172800000, :date "hi" :oxalate 1909.7, :crp 0.47}
             {:timestamp 1534723200000, :date "hi" :oxalate 2093.5}))
         '({:timestamp 1566172800000, :oxalate 1909.7, :crp 0.47}))))

(deftest p-values
  (let [{:keys [correlation p-value datapoints]}
        (stats/calc-correlation
           :oxalate :neut
           [{:oxalate 259.3 :neut 1584}
            {:oxalate 179.0  :neut 1974}
            {:oxalate 249.9  :neut 2600}
            {:oxalate 1404.8 :neut 2068}
            {:oxalate 978.4  :neut 1404}
            {:oxalate 825.8  :neut 1872}
            {:oxalate 1150.3 :neut 2025}
            {:oxalate 1622.0 :neut 3300}
            {:oxalate 1656.1 :neut 1974}
            {:oxalate 1913.9 :neut 1720}
            {:oxalate 1822.4 :neut 2750}
            {:oxalate 2280.6 :neut 2385}
            {:oxalate 2104.0 :neut 2484}
            {:oxalate 2238.0 :neut 1974}
            {:oxalate 2093.5 :neut 1848}
            {:oxalate 1966.3 :neut 2400}
            {:oxalate 1914.0 :neut 2646}
            {:oxalate 2041.0 :neut 2703}
            {:oxalate 2154.0 :neut 2436}
            {:oxalate 2074.4 :neut 3538}
            {:oxalate 1613.9 :neut 2679}
            {:oxalate 1927.6 :neut 2499}
            {:oxalate 1588.1 :neut 2750}
            {:oxalate 1638.9 :neut 2444}
            {:oxalate 1576.4 :neut 2601}
            {:oxalate 2184.1 :neut 2024}
            {:oxalate 1952.1 :neut 2678}
            {:oxalate 2064.6 :neut 2548}
            {:oxalate 1557.1 :neut 2652}
            {:oxalate 1027.3 :neut 2496}
            {:oxalate 1289.8 :neut 2352}
            {:oxalate 1204.3 :neut 2062}
            {:oxalate 1187.4 :neut 2387}])]
    (is (= correlation 0.336))
    (is (= p-value 0.056224303488854016))
    (is (= datapoints 33))))
