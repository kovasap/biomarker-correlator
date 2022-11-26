(ns app.data-io.csv-parsing
  (:require
    ["csv-parse/sync" :rename {parse lib-parse-csv}]
    [clojure.string :as st]))

(defn -remove-empty-rows
  "The :skip_empty_lines option to parse-csv doesn't always seem to work, so we
  do our own filtering here, removing all rows for which all values are the
  empty string."
  [parsed-data]
  (filter (fn [row] (not= #{""} (set (vals row)))) parsed-data))

(defn -remove-empty-cols
  "Remove empty columns from the parsed csv data."
  [parsed-data]
  (map (fn [row] (dissoc row (keyword ""))) parsed-data))

(defn -standardize-keys
  {:malli/schema [:=> [:cat [:sequential [:map-of :string :string]]]
                  [:sequential [:map-of :keyword :string]]]}
  [parsed-data]
  (for [row parsed-data]
    (into {} (for [[k v] row]
               [(-> k
                  (st/replace #"/" "_over_")
                  (st/replace #" " "_")
                  st/lower-case
                  keyword)
                v]))))

(defn parse-csv [csv-data]
  (let [parsed-data
        (js->clj
          (lib-parse-csv csv-data (clj->js {:columns true
                                            :skip_empty_lines true
                                            :trim true})))]
          ; We do this ourselves in -standardize-keys
          ; :keywordize-keys true)]
    (prn "CSV INPUT")
    (prn csv-data)
    (prn "CSV PARSED")
    (prn parsed-data)
    (-> parsed-data
      -standardize-keys
      -remove-empty-rows
      -remove-empty-cols)))
