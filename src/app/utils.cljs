(ns app.utils)

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
