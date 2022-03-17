; Depends on code in public/js/gdrive.js to setup the js/gapi.
(ns app.google-drive
  (:require
    [reagent.core :as r]))

(def data
  (r/atom {}))


(def get-biomarker-correlator-folder-request
  {:pageSize 100
   :q "mimeType='application/vnd.google-apps.folder'
       and name='biomarker-correlator'"
   :fields "nextPageToken, files(id, name)"})

(defn list-files
  "Takes a map request for the `list` API call and a callback function which
  does something with the response map."
  [request callback]
  (. (.. js/gapi -client -drive -files
       (list (clj->js
               ; Update request with default parameters if they are not
               ; provided.
               (merge {:pageSize 100
                       :fields "nextPageToken, files(id, name)"}
                      request))))
     (then (fn [response]
             (callback (js->clj response :keywordize-keys true))))))

(defn get-single-file-id
  "Gets the single file id in response, then calls the callback feeding it in."
  [response callback]
  (let [files (:files (:result response))]
    (assert (= 1 (count files)))
    (callback (:id (first files)))))

(defn get-file-data
  "Gets data for all files in the folder with the given id."
  [folder-id]
  (list-files
    {:q (str "'" folder-id "' in parents")}
    (fn [response] 
      (let [files (:files (:result response))]
        ; doseq is the right choice here, but i have absolutely no idea why
        ; `map` and `for` don't seem to work.
        (doseq [file files]
          ; TODO instead of making the id the value here, instead call
          ; export_media like
          ; https://github.com/kovasap/autojournal/blob/8a4aa2b03deef040fc6b04c2e4a902265e71076c/autojournal/drive_api.py#L60
          ; and get the file data.
          (swap! data assoc (:name file) (:id file)))))))

(defn populate-data!
  "Populates the data atom with a map from filenames to csv data for all
   datafiles in the 'biomarker-correlator' Google Drive folder."
  []
  (list-files
    {:q "mimeType='application/vnd.google-apps.folder'
                   and name='biomarker-correlator'"}
    (fn [response]
      (get-single-file-id
        response
        (fn [id]
          (get-file-data id))))))
