(ns app.core
  #:ghostwheel.core {:check     true
                     :num-tests 10}
  (:require
    [app.csv :as csv]
    [app.stats :as stats]
    [app.time :as time]
    [app.comparison-matrix-table :as comp-matrix-tbl]
    [app.single-var-table :as single-var-table]
    [app.ui :as ui]
    [cljs.spec.alpha :as s]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
    [reagent.core :as r]
    [reagent.dom :as d]))

(s/def ::dated-row (s/keys :req-un [:app.time/date]))
(s/def ::dated-rows (s/coll-of ::dated-row))

(s/def ::input keyword?)
(s/def ::biomarker keyword?)
(s/def ::pairwise-correlations 
  (s/coll-of (s/keys :req-un [::input ::biomarker
                              :app.stats/regression-results])))


; Returns map of dates to :dated-row maps.
;; TODO figure out how to express this in spec
(defn get-rows-by-dates [rows]
  ; TODO find out how to get spec to do this assert for me
  ; (assert (:date (first rows)))
  (into (sorted-map) (map (fn [row] [(:date row) row]) rows)))

(>defn merge-rows-using-dates
  "Merges two sequences of row maps (e.g. from different spreadsheets) using
  the :date field as the joining attribute."
  [rows1 rows2]
  [::dated-rows ::dated-rows
   => ::dated-rows]
  (vals (merge-with (fn [row1 row2] (merge row1 row2))
                    (get-rows-by-dates rows1) (get-rows-by-dates rows2))))

(defn get-vars
  "Gets all variables (csv columns) from parsed csv maps besides the date."
  [data]
  (filter #(not= % :date) (keys (first data))))

(>defn add-timestamps
  [data]
  [::dated-rows => ::dated-rows]
  (map #(assoc % :timestamp (time/map-to-timestamp
                              (time/parse-date-range
                                (:date %))))
       data))

(>defn floatify-data
  [data]
  [::dated-rows => ::dated-rows]
  (map #(into {} (map (fn [[k v]] [k (js/parseFloat v)]) %)) data))

(floatify-data [{:a "100" :b "20"}])

(>defn compute-correlations
  [input-data biomarker-data]
  [::dated-rows ::dated-rows
   => ::pairwise-correlations]
  (let [merged-data (-> (merge-rows-using-dates input-data biomarker-data)
                        add-timestamps
                        floatify-data)]
    (for [input (get-vars input-data)
          biomarker (get-vars biomarker-data)]
      {:input input :biomarker biomarker
       :regression-results (stats/calc-correlation input biomarker
                                                   merged-data)})))

(defn flatten-map
  "Converts map like {:input :hi :results {:slope 50}} to
  {:input :hi :slope 50}"
  [data]
  (into (sorted-map-by <) (filter #(and (vector? %) (not (map? (last %))))
                                (tree-seq associative? seq data))))

(defn home-page []
  (let [{:keys [input-file-name biomarker-file-name input-data biomarker-data]
         :as state} @csv/csv-data
        pairwise-correlations (compute-correlations input-data biomarker-data)
        input-correlations (single-var-table/make-all-correlations
                             pairwise-correlations :input :biomarker)
        biomarker-correlations (single-var-table/make-all-correlations
                                 pairwise-correlations :biomarker :input)
        pairwise-correlations-no-plots (map
                                        #(update-in % [:regression-results]
                                                    dissoc :scatterplot)
                                        pairwise-correlations)
        flat-results (map flatten-map pairwise-correlations-no-plots)
        flat-results-atom (r/atom flat-results)]
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
     [:h3 "Per-Input Table"]
     [:p "Not statistically significant results are displayed with greyed-out
      text.  The score for each input is calculated as the number of
      statistically significant correlations that are positive, minus the number
      that are negative.  We need a spreadsheet (or something built in to the
      app) that determines for each biomarker whether up is good or bad with
      respect to calculating the score."]
     (ui/maps-to-datagrid
       (comp-matrix-tbl/make-comparison-matrix-data
        pairwise-correlations-no-plots
        input-correlations)
       :custom-make-datagrid-column comp-matrix-tbl/make-datagrid-column)
     [:h3 "Pairwise Table"]
     [ui/hideable
       (ui/maps-to-datagrid flat-results)] 
     ; [ui/hideable
     ;   (ui/reagent-table flat-results-atom)]
     [:h3 "Significant Correlations"]
     [:div
      [:h4 "Input Correlations"]
      (into [:div]
            (for [sig-correlations (vals input-correlations)]
              (single-var-table/make-hiccup sig-correlations)))
      [:h4 "Biomarker Correlations"]
      (into [:div]
            (for [sig-correlations (vals biomarker-correlations)]
              (single-var-table/make-hiccup sig-correlations)))]]))

; Run ghostwheel generative tests
; TODO determine if there is a better place for this.
; (g/check)

;; -------------------------
;; Initialize app

(defn ^:dev/after-load mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
