(ns app.core
  (:require
    [app.google-drive :as gd]
    [app.csv :as csv]
    [app.stats :as stats]
    [app.math :as math]
    [app.specs]
    [app.time :as time]
    [app.timeline :refer [timeline-for-page]]
    [app.csv-data-processing :refer [process-csv-data DatedRow]]
    [app.input-data-validation :refer [get-validation-string
                                       get-all-data-validation-string]]
    [app.aggregation :refer [aggregate-data aggregation-section]]
    [app.comparison-matrix-table :as comp-matrix-tbl]
    [app.single-var-table :as single-var-table]
    [app.ui :as ui]
    [malli.core :as m]
    [malli.dev.cljs :as dev]
    [malli.dev.pretty :as pretty]
    [reagent.core :as r]
    [reagent.dom :as d]))

(defn get-vars
  "Gets all variables (csv columns) from parsed csv maps besides the date."
  {:malli/schema [:=> [:cat [:sequential DatedRow]]
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
  (let [aggregation-granularity
        (r/atom :none :validator #(m/validate time/PeriodIdTypes %))
        p-values-rounded?
        (r/atom false)]
    (fn []
      (let [{:keys [input-file-name biomarker-file-name
                    input-data biomarker-data]} @csv/csv-data
            inputs (get-vars input-data)
            biomarkers (get-vars biomarker-data)
            processed-data (process-csv-data input-data biomarker-data)
            data-by-aggregates (aggregate-data
                                 processed-data
                                 @aggregation-granularity
                                 math/average)
            aggregated-data (vals data-by-aggregates)
            pairwise-correlations (stats/compute-correlations
                                    inputs biomarkers aggregated-data)
            input-correlations (single-var-table/make-all-correlations
                                 pairwise-correlations aggregated-data
                                 :input :biomarker)
            biomarker-correlations (single-var-table/make-all-correlations
                                     pairwise-correlations aggregated-data
                                     :biomarker :input)
            pairwise-correlations-for-table (stats/enliten pairwise-correlations)
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
         [:h3 "Data Ingestion"]
         [:h4 "Google Drive Integration"]
         [:p "Once signed in and authorized, this application will search through
        your Google Drive, find a folder named \"biomarker-correlator\", and then
        process the files within that folder. Any CSV files with \"inputs\" in
        the name will be treated as the input data files and any with \"biomarkers\"
        in the name will be treated as the biomarker data files."]
         [:p "If you are getting permissions issues, note that you need to be
        whitelisted as this app is currently not verified with Google. Please
        contact kovas[dot]palunas[at]gmail.com if you want to be whitelisted."]
         [:button {:id "authorize_button" :style {:display "none"}} "Authorize"]
         [:button {:id "signout_button" :style {:display "none"}} "Sign Out"]
         [:button {:on-click #(gd/populate-data!)}
                  "Fetch Google Drive Data"]
         [:pre "Found files " (str @gd/found-files)]

         [:h4 "CSV"]
         [:div.topbar.hidden-print "\"Upload\" input data"
          [csv/upload-btn input-file-name csv/input-upload-reqs]]
         [:div.topbar.hidden-print "\"Upload\" biomarker data"
          [csv/upload-btn biomarker-file-name csv/biomarker-upload-reqs]]
         [:br]
         [:div "Input validation: " (get-validation-string input-data)]
         [:div "Biomarker validation: " (get-validation-string biomarker-data)]
         [:div "Cross data validation: " (get-all-data-validation-string
                                           input-data biomarker-data)]

         (aggregation-section
           aggregation-granularity (keys data-by-aggregates))

         (timeline-for-page
           processed-data (keys data-by-aggregates))

         [:h3 "Per-Input Table"]
         [:p "Not statistically significant results are displayed with greyed-out
        text.  The score for each input is calculated as the number of
        statistically significant correlations that are positive, minus the number
        that are negative.  We need a spreadsheet (or something built in to the
        app) that determines for each biomarker whether up is good or bad with
        respect to calculating the score."]
         [:label {:for :p-values-rounded?} "Round p-values?"]
         [:input {:type :checkbox
                  :name :p-values-rounded?
                  :on-change #(reset! p-values-rounded? (-> % .-target .-checked))
                  :value @p-values-rounded?
                  :defaultChecked @p-values-rounded?}]
         (ui/maps-to-datagrid
           (comp-matrix-tbl/make-comparison-matrix-data
            pairwise-correlations-for-table
            input-correlations
            p-values-rounded?)
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
                  (single-var-table/make-hiccup sig-correlations)))]]))))


;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app"))
  ; Defined in publi/js/gdrive.js
  (js/handleClientLoad))


(defn ^:dev/after-load refresh []
  (prn "Hot code Remount")
  (dev/start! {:report (pretty/reporter)})  ; Check all malli function schemas
  (mount-root))

(defn ^:export init! []
  (dev/start! {:report (pretty/reporter)})  ; Check all malli function schemas
  (mount-root))
