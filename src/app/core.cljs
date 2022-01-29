(ns app.core
  #:ghostwheel.core {:check     true
                     :num-tests 10}
  (:require
   [app.csv :as csv]
   [app.stats :as stats]
   [app.specs :as specs]
   [app.ui :as ui]
   [clojure.string :as st]
   [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
   [reagent.core :as r]
   [reagent.dom :as d]))

;; TODO Split this code into multiple files and clean it up.
;; TODO Make a table with columns like this:
;; Food | Significant biomarker correlation 1 | ... | +1/-1 Correlation Sum | Another Aggregation
;; TODO Make a table with columns like this:
;; Biomarker | Significant food correlation 1 | ... | +1/-1 Correlation Sum | Another Aggregation

; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  ; {:pre [(s/valid? :bc/dated-rows rows)]}
  ; TODO find out how to get spec to do this assert for me
  ; (assert (:date (first rows)))
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(>defn merge-rows-using-dates
  "Merges two sequences of row maps (e.g. from different spreadsheets) using
  the :date field as the joining attribute."
  [rows1 rows2]
  [:app.specs/dated-rows :app.specs/dated-rows
   => :app.specs/dated-rows]
  (vals (merge-with (fn [row1 row2] (merge row1 row2))
                    (get-rows-by-dates rows1) (get-rows-by-dates rows2))))

(defn get-vars
  "Gets all variables (csv columns) from parsed csv maps besides the date."
  [data]
  (filter #(not= % :date) (keys (first data))))

(>defn compute-correlations
  [input-data biomarker-data]
  [:app.specs/dated-rows :app.specs/dated-rows
   => :app.specs/pairwise-correlations]
  (let [merged-data (merge-rows-using-dates input-data biomarker-data)]
    (for [input (get-vars input-data)
          biomarker (get-vars biomarker-data)]
      {:input input :biomarker biomarker
       :regression-results (stats/calc-linear-regression input biomarker
                                                         merged-data)})))

(defn filter-insignificant
  "Filter row maps from the input that show statistically insignificant
  correlations"
  [rows]
  (filter #(> (:rsq (:regression-results %)) 0.05) rows))

(defn make-significant-table
  "Creates a list of maps showing statistically significant results only with
  keys like:
  {:input keyword?
   :biomarker-correlations}
  Food | Significant biomarker correlation 1 | ... | +1/-1 Correlation Sum |
  Another Aggregation
  "
  [rows])

(>defn get-significant-correlations
  [data one-var one-var-value many-var]
  [:app.specs/pairwise-correlations keyword? keyword? keyword?
   | #(every? (fn [d] (contains? d one-var))  data)
   => :app.specs/one-to-many-correlation]
  (let [one-var-significant-correlations
        (one-var-value (group-by one-var (filter-insignificant data)))]
    {:one-var one-var-value
     :score 0 ; TODO calculate and add here
     :average 0.0 ; TODO calculate and add here
     :correlations (for [correlation one-var-significant-correlations]
                     {:many-var (many-var correlation)
                      :regression-results (:regression-results correlation)})}))

(>defn make-significant-correlations-html
  "Creates a table like this:
           Input
        Aggregate 1
        Aggregate 2
  Biomarker | r | p | n
  data      | 0 | 0 | 0
  ...
  "
  {::g/ignore-fx true} ; I think the random-uuid calls trigger side effects as
                       ; far as ghostwheel is concerned
  [data]
  [:app.specs/one-to-many-correlation => :app.specs/hiccup]
  [:div]
  [:table
    [:tbody
;  https://www.w3schools.com/html/html_table_headers.asp
     [:tr [:th {:colSpan 4} [:a {:id (:one-var data)} (:one-var data)]]]
     [:tr [:th {:colSpan 1} :score] [:td {:colSpan 1} (:score data)]]
     [:tr [:th {:colSpan 1} :average] [:td {:colSpan 1} (:average data)]]
     [:tr [:th "Correlate"] 
       (for [k (-> data
                   :correlations
                   first
                   :regression-results
                   keys)]
         [:th k])]
     (for [correlations (:correlations data)]
       [:tr ^{:key (random-uuid)}
        [:td [:a {:href (st/join ["#" (name (:many-var correlations))])}
                 (:many-var correlations)]]
        (for [v (vals (:regression-results correlations))]
          ^{:key (random-uuid)} [:td v])])]])

(>defn make-pairwise-significant-correlations-html
  [correlations]
  [:app.specs/pairwise-correlations => :app.specs/hiccup]
  (let [unique-inputs (set (map #(:input %) correlations))
        unique-biomarkers (set (map #(:biomarker %) correlations))]
    [:div
      [:div (for [input unique-inputs]
              (make-significant-correlations-html
                (get-significant-correlations
                  correlations :input input :biomarker)))]
      [:div (for [biomarker unique-biomarkers]
              (make-significant-correlations-html
                (get-significant-correlations
                  correlations :biomarker biomarker :input)))]]))

(defn flatten-map
  "Converts map like {:input :hi :results {:slope 50}} to
  {:input :hi :slope 50}"
  [data]
  (into {} (filter #(and (vector? %) (not (map? (last %))))
                   (tree-seq associative? seq data))))

(defn flatten-map-concat-keys
  "Converts map like {:input :hi :results {:slope 50}} to
  {:input :hi :results-slope 50}
  
  Taken from https://stackoverflow.com/a/17902228"
  ([form separator]
   (into {} (flatten-map-concat-keys form separator nil)))
  ([form separator pre]
   (mapcat (fn [[k v]]
             (let [prefix (if pre (str pre separator (name k)) (name k))]
               (if (map? v)
                 (flatten-map-concat-keys v separator prefix)
                 [[(keyword prefix) v]])))
           form)))

; Per-input Table Generation ------------------------------------

(defn get-biomarker-regression-result-keys
  "Converts {:input :i :biomarker :b :results {:slope 5.0}} to
  {:input :i :b-slope 5.0}
  "
  [m]
  (conj {:input (:input m)}
        (into {} (for [[k v] (:regression-results m)]
                   [(st/join "-" [(name (:biomarker m)) (name k)]) v]))))

(defn get-per-input-row [same-input-results]
  (reduce merge
          (map get-biomarker-regression-result-keys same-input-results)))

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


(defn home-page []
  (let [{:keys [input-file-name biomarker-file-name input-data biomarker-data]
         :as state} @csv/csv-data
        correlation-results (compute-correlations input-data biomarker-data)
        correlation-results-atom (r/atom
                                   (map flatten-map correlation-results))]
    [:div.app.content
     [:h1.title "Biomarker Correlator"]
     [:p "This application calculates cross correlations between inputs and
      biomarkers in an attempt to identify statistically significant
      correlations. "]
     [:p "Despite presenting like a website, there is no server
      behind this app that data is sent to for analysis; everything is done
      client side in the browser. Therefore, the page can be saved and run
      offline as needed."]
     [:div.topbar.hidden-print "\"Upload\" input data"
      [csv/upload-btn input-file-name csv/input-upload-reqs]]
     [:div.topbar.hidden-print "\"Upload\" biomarker data"
      [csv/upload-btn biomarker-file-name csv/biomarker-upload-reqs]]
     [:h3 "Pairwise Table"]
     [ui/hideable
      (ui/maps-to-html (map flatten-map correlation-results))]
     [ui/hideable
      (ui/reagent-table correlation-results-atom)]
     [:h3 "Per-Input Table"]
     [ui/hideable
      (ui/maps-to-html (make-per-input-correlation-results
                        correlation-results))]
     [:h3 "Significant Correlations"]
     (if (nil? correlation-results)  ; TODO remove if unnecessary
       [:div]
       (make-pairwise-significant-correlations-html correlation-results))]))

; Run ghostwheel generative tests
; TODO determine if there is a better place for this.
(g/check)

;; -------------------------
;; Initialize app

(defn ^:dev/after-load mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
