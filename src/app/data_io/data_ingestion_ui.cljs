(ns app.data-io.data-ingestion-ui
  (:require [app.data-io.csv-import :refer [csv-ui]]
            [app.data-io.google-drive-import :refer [google-drive-ui]]
            [app.data-io.validation :refer [validation-ui]]))

(defn ingestion-section
  []
  [:div
   [:h3 "Data Ingestion"]
   [google-drive-ui]
   [csv-ui]
   [validation-ui]])
   
