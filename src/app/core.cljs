(ns app.core
  (:require
   [app.csv :as csv]
   [app.stats :as stats]
   [app.specs :as specs]
   [clojure.string :as st]
   [spec-tools.data-spec :as ds]
   [cljs.spec.alpha :as s]
   [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
   [reagent.dom :as d]))

;; TODO Split this code into multiple files and clean it up.
;; TODO Make a table with columns like this:
;; Food | Significant biomarker correlation 1 | ... | +1/-1 Correlation Sum | Another Aggregation
;; TODO Make a table with columns like this:
;; Biomarker | Significant food correlation 1 | ... | +1/-1 Correlation Sum | Another Aggregation

; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  {:pre [(s/valid? :bc/dated-rows rows)]}
  ; TODO find out how to get spec to do this assert for me
  ; (assert (:date (first rows)))
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(defn merge-rows-using-dates
  "Merges two sequences of row maps (e.g. from different spreadsheets) using
  the :date field as the joining attribute."
  [rows1 rows2]
  {:pre [(s/valid? :bc/dated-rows rows1)
         (s/valid? :bc/dated-rows rows2)]
   :post [(s/valid? :bc/dated-rows %)]}
  (vals (merge-with (fn [row1 row2] (merge row1 row2))
                    (get-rows-by-dates rows1) (get-rows-by-dates rows2))))

(defn compute-correlations [input-data biomarker-data]
  (let [input-vars (filter #(not= % :date) (keys (first input-data)))
        biomarker-vars (filter #(not= % :date) (keys (first biomarker-data)))
        merged-data (merge-rows-using-dates input-data biomarker-data)
        results (for [input input-vars biomarker biomarker-vars]
                  (conj
                   {:input input :biomarker biomarker}
                   (stats/calc-linear-regression input biomarker merged-data)))]
    results))

(defn filter-insignificant
  "Filter row maps from the input that show statistically insignificant
  correlations"
  [rows]
  (filter #(> (:rsq %) 0.05) rows))

(defn make-significant-table
  "Creates a list of maps showing statistically significant results only with
  keys like:
  {:input keyword?
   :biomarker-correlations}
  Food | Significant biomarker correlation 1 | ... | +1/-1 Correlation Sum |
  Another Aggregation
  "
  [rows])

(defn get-significant-correlations-for-input
  [data])
  ; {:pre [(s/valid? :bc/dated-rows data)]
  ;  :post [(s/valid? specs/significant-correlations %)]])

(defn make-significant-correlations-html
  "Creates a table like this:

           Input
        Aggregate 1
        Aggregate 2
  Biomarker | r | p | n
  data      | 0 | 0 | 0
  ...
  "
  [data]
  {:pre [(s/valid? specs/significant-correlations data)]
   :post [(s/valid? string? %)]}
  ; [specs/significant-correlations :ret string?]
  [:table
   [:tbody
    ; https://www.w3schools.com/html/html_table_headers.asp
    [:tr [:th {:colspan "4"} (:input data)]]
    [:tr [:th {:colspan "4"} (:score data)]]
    [:tr [:th {:colspan "4"} (:average data)]]
    ; TODO find out how to generate this header from the spec.
    [:tr [:th "Biomarker"] [:th "Slope"] [:th "R-squared"] [:th "Datapoints"]]
    (for [correlations (:correlations data)]
      [:tr (for [v (vals correlations)]
             [:td v])])]])

; Per-input Table Generation ------------------------------------

(defn single-biomarker-row [result-row]
  {:input (:input result-row)
   (keyword (st/join [(name (:biomarker result-row)) "-slope"])) (:slope result-row)
   (keyword (st/join [(name (:biomarker result-row)) "-rsq"])) (:rsq result-row)
   (keyword (st/join [(name (:biomarker result-row)) "-datapoints"])) (:datapoints result-row)})

(defn get-per-input-row [same-input-results]
  (reduce merge (map single-biomarker-row same-input-results)))

(defn make-per-input-correlation-results
  "Collection of maps with keys like:
  {:input 
   :biomarker1-slope
   :biomarker1-rsq
   :biomarker1-datapoints}
  "
  [results]
  (let [rows-by-input (group-by :input results)]
    (map get-per-input-row (vals rows-by-input))))

; ------------------------------------

; Beware sorting maps directly - it's been unreliable.  It's better to convert
; to lists of 2-vectors and sort those.
(defn map-to-sorted-pairs [m]
  (sort-by (fn [pair]
             (let [k (first pair)]
               ; Capital letters get sorted before lowercase!
               (if (= k :input) "AAAAA" (name k))))
           (seq m)))

(defn maps-to-html
  "Converts collection of maps like
  [{:col1 val1 :col2 val2} {:col1 val3 :col2 val4}]
  to an HTML table.
  
  See https://stackoverflow.com/a/33458370 for ^{:key} map explanation.
  "
  [maps]
  (let [sorted-pairs (map map-to-sorted-pairs maps)]
    [:table
     [:tbody
      ^{:key (random-uuid)} [:tr (for [k (map first (first sorted-pairs))]
                                   ^{:key (random-uuid)} [:th k])]
      (for [pairs sorted-pairs]
        ^{:key (random-uuid)} [:tr (for [r (map peek pairs)]
                                     ^{:key (random-uuid)} [:td r])])]]))

(defn home-page []
  (let [{:keys [input-file-name biomarker-file-name input-data biomarker-data]
         :as state} @csv/csv-data
        correlation-results (compute-correlations input-data biomarker-data)]
    [:div.app.content
     [:h1.title "Biomarker Correlator"]
     [:p "This application calculates cross correlations between inputs and
      biomarkers in an attempt to identify statistically significant
      correlations. "]
     [:p "Despite presenting like a website, there is no server
      behind this app that data is sent to for analysis; everything is done
      client side in the browser. Therefore, it can be saved and run offline as
      needed."]
     [:div.topbar.hidden-print "\"Upload\" input data"
      [csv/upload-btn input-file-name csv/input-upload-reqs]]
     [:div.topbar.hidden-print "\"Upload\" biomarker data"
      [csv/upload-btn biomarker-file-name csv/biomarker-upload-reqs]]
     [:h3 "Pairwise Table"]
     (maps-to-html correlation-results)
     [:h3 "Per-Input Table"]
     (maps-to-html (make-per-input-correlation-results correlation-results))]))

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
