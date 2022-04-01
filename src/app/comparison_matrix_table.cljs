(ns app.comparison-matrix-table
  (:require
   [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
   [app.stats :as stats]
   [app.single-var-table :refer [aggregate-names]]
   [clojure.set :refer [union]]
   [clojure.string :as st]))

(defn -build--key
  [m suffix]
  (keyword (st/join "--" [(name (:biomarker m)) suffix])))

(defn get-flat-biomarker-result-keys
  "Converts {:input :i :biomarker :b :results {:slope 5.0}} to
  {:input :i :b--slope 5.0}

  Also adds blank columns like :b--blank that add spacing between each
  biomarker in the final visualizations.
  "
  [filter-func m]
  [:app.specs/pairwise-correlation => :app.specs/maps]
  (conj {:input (:input m)
         (-build--key m "blank") ""}
        (into {} (for [[k v] (:regression-results m)
                       :when (filter-func k)]
                   [(-build--key m (name k)) v]))))

(defn make-per-input-row
  [same-input-results regression-result-key-filter]
  (reduce merge (map (partial get-flat-biomarker-result-keys
                              regression-result-key-filter)
                     same-input-results)))

(>defn add-aggregates
  [input-significant-correlations flat-map]
  [:app.specs/one-to-many-correlations :app.specs/maps
   => :app.specs/maps]
  (merge flat-map (:aggregates
                    ((:input flat-map) input-significant-correlations))))

(def column-element-ordering
  "Column names should be sorted in the order signified by these substrings."
  ["correlation" "p-value" "datapoints"])

(defn get-column-element-order-key
  [string]
  (first
    (filter #(not (nil? %))
      (map-indexed (fn [index element] (if (st/includes? string element)
                                         (str index string)
                                         nil))
                   column-element-ordering))))

(defn column-name-compare-key
  [col-keyword]
  (cond
    (= :input col-keyword)
    "AAAA"
    (= :score col-keyword)
    "AAAB"
    (st/includes? (name col-keyword) "--")
    (let [[col-name data-type] (st/split (name col-keyword) #"--")]
      (str col-name (get-column-element-order-key data-type)))
    :else
    (name col-keyword)))

(defn compare-column-names
  "Comparison function for two names to be used when making a sorted-map-by.
  
  NOTE THAT the sorted-map-by requires UNIQUE comparison keys for distinct
  items. If one item has the same comparison key as another only one item will
  appear in the final map (seemly arbitrarily chosen)!"
  [name1 name2]
  (compare (column-name-compare-key name1)
           (column-name-compare-key name2)))

(>defn make-comparison-matrix-data
  [results input-significant-correlations p-values-rounded?]
  [:app.specs/pairwise-correlations :app.specs/one-to-many-correlations
   boolean?
   => :app.specs/maps]
  (let [per-input-rows (vals (group-by :input results))
        p-value-filter #(if @p-values-rounded?
                          (not= % :p-value)
                          (not= % :rounded-p-value))]
    (map (fn [row]
           (into (sorted-map-by compare-column-names)
                 (add-aggregates input-significant-correlations
                                 (make-per-input-row row p-value-filter))))
         per-input-rows)))

(defn make-datagrid-column
  "Generates a react-data-grid column 
  https://github.com/adazzle/react-data-grid/blob/929911c506919e96bd12e48ea5de68ec9511ca10/src/types.ts#L7"
  [k]
  (let [[biomarker stat] (st/split (name k) #"\-\-")]
    {:cellClass
     (fn [row]
       (let [clj-row (js->clj row :keywordize-keys true)
             pval-key (keyword (st/join "--" [biomarker "p-value"]))]
         (cond
           (nil? (pval-key clj-row))
           ""
           (< (pval-key clj-row) stats/p-value-cutoff)
           ""
           :else
           "has-text-grey-lighter")))
     :frozen
     ; TODO get all the :aggregates keys from the spec here instead of
     ; hardcoding
     (if (contains? (union #{:input} aggregate-names) k)
       true
       false)}))


