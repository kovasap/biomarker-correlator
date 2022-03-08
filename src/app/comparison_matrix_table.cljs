(ns app.comparison-matrix-table
  (:require
   [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
   [app.stats :as stats]
   [app.single-var-table :refer [aggregate-names]]
   [clojure.set :refer [union]]
   [clojure.string :as st]))

(defn get-biomarker-regression-result-keys
  "Converts {:input :i :biomarker :b :results {:slope 5.0}} to
  {:input :i :b--slope 5.0}
  "
  [m]
  [:app.specs/pairwise-correlation => :app.specs/maps]
  (conj {:input (:input m)}
        (into {} (for [[k v] (:regression-results m)]
                   [(keyword (st/join "--" [(name (:biomarker m)) (name k)]))
                    v]))))

(defn make-per-input-row [same-input-results]
  (reduce merge
          (map get-biomarker-regression-result-keys same-input-results)))

(>defn add-aggregates
  [input-significant-correlations flat-map]
  [:app.specs/one-to-many-correlations :app.specs/maps
   => :app.specs/maps]
  (merge flat-map (:aggregates
                    ((:input flat-map) input-significant-correlations))))

(>defn make-comparison-matrix-data
  [results input-significant-correlations]
  [:app.specs/pairwise-correlations :app.specs/one-to-many-correlations
   => :app.specs/maps]
  (let [rows-by-input (group-by :input results)
        per-input-results (map #(add-aggregates input-significant-correlations
                                                (make-per-input-row %))
                               (vals rows-by-input))]
    (map #(into (sorted-map-by
                  (fn [a b]
                    (cond
                      (contains? #{:input :score} a) -1
                      (contains? #{:input :score} b) -1
                      :else (compare a b))))
                %)
         per-input-results)))

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


