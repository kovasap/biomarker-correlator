; Depends on code in public/js/gdrive.js to setup the js/gapi.
(ns app.google-drive
  (:require
    [reagent.core :as r]
    [cljs.core.async :refer [chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]]
    [cljs.core.async :refer-macros [go go-loop alt!]]))

; Defined in publi/js/gdrive.js
(js/handleClientLoad)

(def data
  (r/atom {}))

(def get-biomarker-correlator-folder-request
  {:pageSize 100
   :q "mimeType='application/vnd.google-apps.folder'
       and name='biomarker-correlator'"
   :fields "nextPageToken, files(id, name)"})

; Check out
; https://www.learn-clojurescript.com/section-4/lesson-25-intro-to-core-async/
; for a good explanation of how these channels work.
(def list-files-requests (chan))
(def listed-files (chan))

; Calls the list-files Google Drive API and puts the results into listed-files.
(go-loop []
  (. (.. js/gapi -client -drive -files
       (list
         ; Update request with default parameters if they are not provided.
         (clj->js (merge {:pageSize 100
                          :fields "nextPageToken, files(id, name)"}
                         (<! list-files-requests)))))
     (then (fn [response]
             (put! listed-files (js->clj response :keywordize-keys true)))))
  (recur))

(defn get-single-file-id
  "Gets the single file id in a list-files response."
  [list-files-response]
  (let [files (:files (:result list-files-response))]
    (assert (= 1 (count files)))
    (:id (first files))))

(defn get-file-data
  "Gets data for all files in the folder with the given id."
  [folder-id]
  (put! list-files-requests {:q (str "'" folder-id "' in parents")})
  (take! listed-files
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
  (put! list-files-requests {:q "mimeType='application/vnd.google-apps.folder'
                               and name='biomarker-correlator'"})
  (take! listed-files #(get-file-data (get-single-file-id %))))
