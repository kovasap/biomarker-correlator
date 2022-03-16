; Depends on code in public/js/gdrive.js to setup the js/gapi.
(ns app.google-drive
  (:require
    [reagent.core :as r]))

(def data
  (r/atom {}))


(defn list-files-request []
  (.. js/gapi -client -drive -files
    (list (clj->js {:pageSize 10
                    :fields "nextPageToken, files(id, name)"}))))

(defn list-files []
  (. (list-files-request) (then (fn [response] (prn response)))))
 
