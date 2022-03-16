(ns app.core
  ; #:ghostwheel.core {:check     true
  ;                    :num-tests 10
  (:require
    [app.csv :as csv]
    [app.stats :as stats]
    ; Load namespace for malli checking.
    [app.biomarker-data]
    [app.specs :as specs]
    [app.csv-data-processing :as proc]
    [app.comparison-matrix-table :as comp-matrix-tbl]
    [app.single-var-table :as single-var-table]
    [app.ui :as ui]
    [malli.core :as m]
    [malli.instrument.cljs :as mi]
    ; Uncomment when https://github.com/metosin/malli/pull/655 is in.
    [malli.dev.cljs :as dev]
    [malli.dev.pretty :as pretty]
    [cljs.spec.alpha :as s]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
    [reagent.core :as r]
    [reagent.dom :as d]))

(s/def ::input keyword?)
(s/def ::biomarker keyword?)
(s/def ::pairwise-correlations 
  (s/coll-of (s/keys :req-un [::input
                              ::biomarker
                              :app.stats/regression-results])))

(defn get-vars
  "Gets all variables (csv columns) from parsed csv maps besides the date."
  {:malli/schema [:=> [:cat proc/DatedRows]
                  [:sequential :keyword]]}
  [data]
  (filter #(not= % :date) (keys (first data))))

(defn flatten-map
  "Converts map like {:input :hi :results {:slope 50}} to
  {:input :hi :slope 50}"
  [data]
  (into (sorted-map-by <) (filter #(and (vector? %) (not (map? (last %))))
                                (tree-seq associative? seq data))))

(defn home-page []
  (let [{:keys [input-file-name biomarker-file-name
                input-data biomarker-data]} @csv/csv-data
        inputs (get-vars input-data)
        biomarkers (get-vars biomarker-data)
        processed-data (proc/process-csv-data input-data biomarker-data)
        pairwise-correlations (stats/compute-correlations
                                inputs biomarkers processed-data)
        input-correlations (single-var-table/make-all-correlations
                             pairwise-correlations processed-data
                             :input :biomarker)
        biomarker-correlations (single-var-table/make-all-correlations
                                 pairwise-correlations processed-data
                                 :biomarker :input)
        pairwise-correlations-for-table (map
                                         #(update-in % [:regression-results]
                                                     dissoc :scatterplot
                                                     :raw-data)
                                         pairwise-correlations)
        flat-results (map flatten-map pairwise-correlations-for-table)
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
     ; Google drive integration controlled by public/js/gdrive.js.
     [:button {:id "authorize_button" :style {:display "none"}} "Authorize"]
     [:button {:id "signout_button" :style {:display "none"}} "Sign Out"]
     [:pre {:id "content" :style {:white-space "pre-wrap"}}]

     [:div.topbar.hidden-print "\"Upload\" input data"
      [csv/upload-btn input-file-name csv/input-upload-reqs]]
     [:div.topbar.hidden-print "\"Upload\" biomarker data"
      [csv/upload-btn biomarker-file-name csv/biomarker-upload-reqs]]
     [:br]
     [:div "Input validation: " (proc/get-validation-string input-data)]
     [:div "Biomarker validation: " (proc/get-validation-string biomarker-data)]
     [:div "Cross data validation: " (proc/get-all-data-validation-string
                                       input-data biomarker-data)]
     [:h3 "Per-Input Table"]
     [:p "Not statistically significant results are displayed with greyed-out
      text.  The score for each input is calculated as the number of
      statistically significant correlations that are positive, minus the number
      that are negative.  We need a spreadsheet (or something built in to the
      app) that determines for each biomarker whether up is good or bad with
      respect to calculating the score."]
     (ui/maps-to-datagrid
       (comp-matrix-tbl/make-comparison-matrix-data
        pairwise-correlations-for-table
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


(defn ^:dev/after-load refresh []
  (prn "Hot code Remount")
  ; Check all malli function "specs"
  ; TODO use the dev namespace once the PR referenced in
  ; https://github.com/metosin/malli/issues/654#issuecomment-1065650984 is
  ; merged.
  ; (dev/start! {:report (pretty/reporter)})
  ; (malli.dev.cljs/collect-all!)
  ; (malli.instrument.cljs/instrument!)
  (mount-root))

(defn ^:export init! []
  ; (malli.dev.cljs/collect-all!)
  ; (malli.instrument.cljs/instrument!)
  (mount-root))
