(ns app.single-var-table
  (:require
    [app.stats :as stats]
    [app.biomarker-data :as biodata]
    [app.csv-data-processing :as proc]
    [app.ui :as ui]
    ; [spec-tools.data-spec :as ds]
    [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
    [cljs.spec.alpha :as s]))

; (def one-to-many-correlation
;   (ds/spec ::one-to-many-correlation
;     {:one-var keyword?
;      :aggregates {:score int?
;                   :average float?}
;      :correlations [{:many-var keyword?
;                      :regression-results :app.stats/regression-results}]}))
; (s/def ::one-to-many-correlation one-to-many-correlation)
; (s/def ::one-to-many-correlations
;   (s/map-of keyword? ::one-to-many-correlation))

(s/def ::one-var keyword?)
(s/def ::many-var keyword?)

(s/def ::score int?)
(s/def ::average float?)
(s/def ::aggregates (s/keys :req-un [::score ::average]))

(s/def ::correlations
  (s/coll-of (s/keys :req-un [::many-var :app.stats/regression-results])))

(s/def ::one-to-many-correlation
  (s/keys :req-un
          [::one-var ::aggregates ::correlations]))
(s/def ::one-to-many-correlations
  (s/map-of keyword? ::one-to-many-correlation))

(def OneToManyCorrelation
  [:map [:one-var :keyword]
        [:aggregates [:map [:score :int]
                           [:average :number]
                           [:acm-score :number]]]
        [:correlations [:map [:many-var :keyword]
                             [:regression-results stats/CorrelationResults]]]])

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
(>defn calc-counted-score
  "Sums up all postive correlations and all negatives correlations, then takes
  the difference."
  [correlations]
  [::pairwise-correlations
   => int?]
  (reduce + (map #(if (neg? (:correlation (:regression-results %))) -1 1)
                 correlations)))


(defn get-significant-correlations
  {:malli/schema [:=> [:cat
                       stats/PairwiseCorrelations
                       :keyword
                       :keyword
                       :keyword
                       [:vector :number]]
                  OneToManyCorrelation]}
  [data one-var-type one-var many-var-type one-var-raw-data]
  ; [::pairwise-correlations keyword? keyword? keyword?
  ;  | #(every? (fn [d] (contains? d one-var-type))  data)
  ;  => ::one-to-many-correlation]
  (let [one-var-significant-correlations
        (one-var (group-by one-var-type (filter-insignificant data)))]
    {:one-var one-var
     :aggregates {:score (calc-counted-score one-var-significant-correlations)
                  ; :acm-score 0
                  :average (stats/round (/ (reduce + one-var-raw-data)
                                         (count one-var-raw-data)))}
     :correlations (for [correlation one-var-significant-correlations]
                     {:many-var (many-var-type correlation)
                      :regression-results (:regression-results correlation)})}))

(defn make-all-correlations
  {:malli/schema [:=> [:cat
                       stats/PairwiseCorrelations
                       proc/ProcessedRows
                       :keyword
                       :keyword]
                  OneToManyCorrelation]}
  [correlations csv-data one-var-type many-var-type]
  ; [::pairwise-correlations keyword? keyword?
  ;  => ::one-to-many-correlations]
  (let [unique-one-vars (set (map #(one-var-type %) correlations))]
    (into {} (for [one-var unique-one-vars]
               [one-var (get-significant-correlations
                          correlations one-var-type one-var many-var-type
                          (mapv #(one-var %) csv-data))]))))

(def table-keys [:correlation :p-value :datapoints])

(>defn get-one-var-timeseries-data
  [data]
  [::one-to-many-correlation => :app.biomarker-data/timeseries-data]
  (map #(select-keys % [:timestamp (:one-var data)])
       (-> data
           :correlations
           first
           :regression-results
           :raw-data)))

(>defn make-hiccup
  "Creates a table like this:
           Input
        Aggregate 1
        Aggregate 2
  Biomarker | r | p | n
  data      | 0 | 0 | 0
  ...
  "
  [data]
  [::one-to-many-correlation => :app.specs/hiccup]
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
