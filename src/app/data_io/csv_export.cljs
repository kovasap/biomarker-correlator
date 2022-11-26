(ns app.data-io.csv-export
  (:require
   ["csv-stringify/sync" :rename {stringify stringify-csv}]))


(defn maps-to-csv [maps]
  (stringify-csv
    (clj->js maps)
    (clj->js {:header true})))

(defn download-as-csv [maps export-name]
  (let [data-blob (js/Blob. #js [(maps-to-csv maps)]
                            #js {:type "text/csv;charset=utf-8;"})
        link (.createElement js/document "a")]
    (set! (.-href link) (.createObjectURL js/URL data-blob))
    (.setAttribute link "download" export-name)
    (.appendChild (.-body js/document) link)
    (.click link)
    (.removeChild (.-body js/document) link)))
