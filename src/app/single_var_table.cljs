(ns app.single-var-table
  (:require
    [app.stats :as stats]
    [app.math :as math]
    [app.specs :as specs]
    [app.biomarker-data :as biodata]
    [app.csv-data-processing :as proc]
    [app.ui :as ui]))

(def OneToManyCorrelation
  [:map [:one-var :keyword]
        [:aggregates [:map [:score :int]
                           [:average :double]]]
                           ; [:acm-score :double]]]
        [:correlations [:sequential
                        [:map [:many-var :keyword]
                              [:regression-results stats/CorrelationResults]]]]])

; TODO generate these from the OneToManyCorrelation spec above
(def aggregate-names #{:score :average :acm-score})


(defn filter-insignificant
  "Filter row maps from the input that show statistically insignificant
  correlations"
  [rows]
  (filter #(< (:p-value (:regression-results %))
              stats/p-value-cutoff)
          rows))

; TODO we may need to introduce a concept of "up is good" and "down is bad" so
; that this score instead takes the difference between "good" and "bad"
; correlations, not just positive and negative ones.
(defn calc-counted-score
  "Sums up all postive correlations and all negatives correlations, then takes
  the difference."
  {:malli/schema [:=> [:cat [:or :nil stats/PairwiseCorrelations]]
                  :int]}
  [correlations]
  (if (nil? correlations)
    0
    (reduce + (map #(if (neg? (:correlation (:regression-results %))) -1 1)
                   correlations))))


(defn get-significant-correlations
  {:malli/schema [:=> [:cat
                       stats/PairwiseCorrelations
                       :keyword
                       :keyword
                       :keyword
                       [:vector :double]]
                  OneToManyCorrelation]}
  [data one-var-type one-var many-var-type one-var-raw-data]
  (let [one-var-significant-correlations
        (one-var (group-by one-var-type (filter-insignificant data)))]
    {:one-var one-var
     :aggregates {:score (calc-counted-score one-var-significant-correlations)
                  ; :acm-score 0
                  :average (math/round (math/average one-var-raw-data))}
     :correlations (for [correlation one-var-significant-correlations]
                     {:many-var (many-var-type correlation)
                      :regression-results (:regression-results correlation)})}))

(defn get-csv-values
  "Filters NaNs while getting the data."
  {:malli/schema [:=> [:cat
                       [:sequential [:map-of :keyword :any]]
                       :keyword]
                  [:vector :double]]}
  [csv-data column-name]
  (into [] (for [row csv-data
                 :let [value (column-name row)]
                 :when (and (not (nil? value)) (not (js/isNaN value)))]
             value)))

(defn make-all-correlations
  {:malli/schema [:=> [:cat
                       stats/PairwiseCorrelations
                       [:sequential proc/ProcessedRow]
                       :keyword
                       :keyword]
                  [:map-of :keyword OneToManyCorrelation]]}
  [correlations csv-data one-var-type many-var-type]
  ; [::pairwise-correlations keyword? keyword?
  ;  => ::one-to-many-correlations]
  (let [unique-one-vars (set (map #(one-var-type %) correlations))]
    (into {} (for [one-var unique-one-vars]
               [one-var (get-significant-correlations
                          correlations one-var-type one-var many-var-type
                          (get-csv-values csv-data one-var))]))))

(def table-keys [:correlation :rounded-p-value :datapoints])

(defn get-one-var-timeseries-data
  {:malli/schema [:=> [:cat OneToManyCorrelation] biodata/TimeseriesData]}
  [data]
  (map #(select-keys % [:timestamp (:one-var data)])
       (-> data
           :correlations
           first
           :regression-results
           :raw-data)))

(defn make-hiccup
  "Creates a table like this:
           Input
        Aggregate 1
        Aggregate 2
  Biomarker | r | p | n
  data      | 0 | 0 | 0
  ...
  "
  {:malli/schema [:=> [:cat OneToManyCorrelation] specs/ReagentComponent]}
  [data]
  (let [one-var (:one-var data)]
    [:div
      [:table
        [:tbody
    ;  https://www.w3schools.com/html/html_table_headers.asp
         [:tr [:th {:colSpan 4}
               [:a {:id one-var} one-var]
               ", Counted score of " (:score (:aggregates data))
               ", Average value " (:average (:aggregates data))]]
         [:tr [:td {:colSpan 4}
               (if (contains? biodata/data one-var)
                 [:div
                   (biodata/make-acm-plot
                     (get-one-var-timeseries-data data)
                     (one-var biodata/data))
                   [:p (:notes (one-var biodata/data))]
                   [:p "Source: " (:source (one-var biodata/data))]]
                 "No data found for this metric.")]]
         [:tr [:th "Correlate"]
          (for [k (-> data
                      :correlations
                      first
                      :regression-results
                      (#(select-keys % table-keys))
                      keys)]
            [:th {:key (str k "-head")} k])]
         (for [correlations (sort-by #(:correlation (:regression-results %))
                                     (:correlations data))]
           (let [mvar (name (:many-var correlations))]
             [:tr {:key (str mvar "-row")} 
              [:td [ui/hover-to-render
                    [:a {:href (str "#" mvar)} mvar]
                    (:scatterplot (:regression-results correlations))]]
              (for [[k v] (select-keys (:regression-results correlations)
                                       table-keys)]
                [:td {:key (str mvar "-" k)} v])]))]]]))
