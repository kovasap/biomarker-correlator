(ns app.data-io.validation
  (:require [app.data-atom :refer [data]]
            [app.specs :refer [Hiccup]]
            [app.csv-data-processing :refer [DatedRow]]
            [clojure.string :as st]))

; TODO add spec validation to this function
(defn get-all-data-validation-string
  {:malli/schema [:=> [:cat [:* [:sequential DatedRow]]]
                  Hiccup]}
  [& sets-of-rows]
  (let [headers (remove #(= :date %)
                        (flatten (map #(keys (first %)) sets-of-rows)))
        duplicate-headers (for [[id freq] (frequencies headers)
                                :when (> freq 1)]
                            id)]
    (if (seq duplicate-headers)  ; if not empty
      [:div {:style {:color "red"}}
       "Some inputs headers were duplicated: " (st/join ", " duplicate-headers)]
      [:div {:style {:color "green"}} "Data validated successfully"])))

(defn dups [sequence]
  (for [[element freq] (frequencies sequence)
        :when (> freq 1)]
   element))

(defn get-validation-string
  {:malli/schema [:=> [:cat [:sequential DatedRow]]
                  Hiccup]}
  [rows]
  (let [duplicate-dates (dups (map :date rows))]
    (if (> (count duplicate-dates) 0)
      [:div {:style {:color "red"}}
       "Repeated dates found in file " (str duplicate-dates) "!"]
      [:div {:style {:color "green"}} "Data validated successfully"])))

(defn validation-ui []
  (fn []
    (let [input-data (:input-data @data)
          biomarker-data (:biomarker-data @data)]
      [:div
       [:div "Input validation: " (get-validation-string input-data)]
       [:div "Biomarker validation: " (get-validation-string biomarker-data)]
       [:div
        "Cross data validation: "
        (get-all-data-validation-string input-data biomarker-data)]])))


