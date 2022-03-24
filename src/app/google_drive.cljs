; Depends on code in public/js/gdrive.js to setup the js/gapi.
(ns app.google-drive
  (:require
    [app.csv :as csv]
    [reagent.core :as r]
    [cljs.core.async :refer [chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]]
    [cljs.core.async :refer-macros [go go-loop alt!]]
    [clojure.string :as st]))

; Defined in publi/js/gdrive.js
; (js/handleClientLoad)

(def found-files
  (r/atom []))

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

; Calls the files.list Google Drive API and puts the results into listed-files.
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

(def get-file-ids (chan))
(def file-datas (chan))

; Calls the files.get Google Drive API and puts the results into file-datas.
(go-loop []
  (. (.. js/gapi -client -drive -files
       (get (clj->js {:fileId (<! get-file-ids)
                      :alt "media"})))
     (then (fn [response]
             (put! file-datas (js->clj response :keywordize-keys true)))))
  (recur))

(defn get-file-data
  [file-id data-key]
  (put! get-file-ids file-id)
  (take! file-datas
         (fn [response]
           (swap! csv/csv-data assoc
                  data-key (csv/my-parse-csv (:body response))))))

(defn get-data-key
  "Returns the key under which to add the data to the csv-data atom. Returns
  nil if the file in question should not be parsed (it is not a csv file, or
  otherwise isn't parsable)"
  [file-name]
  (cond
    (not (st/ends-with? file-name ".csv")) nil
    (st/includes? file-name "biomarker") :biomarker-data
    (st/includes? file-name "input") :input-data
    :else nil))

(defn get-folder-file-data
  "Gets data for all files in the folder with the given id."
  [folder-id]
  (put! list-files-requests {:q (str "'" folder-id "' in parents")})
  (take! listed-files
         (fn [response] 
           (let [files (:files (:result response))]
             ; doseq is the right choice here, but i have absolutely no idea why
             ; `map` and `for` don't seem to work.
             (doseq [file files]
               (let [data-key (get-data-key (:name file))]
                 (if data-key
                   (do
                     (get-file-data (:id file) data-key)
                     (swap! found-files conj (:name file)))
                   ())))))))

(defn populate-data!
  "Populates the data atom with a map from filenames to csv data for all
   datafiles in the 'biomarker-correlator' Google Drive folder."
  []
  (put! list-files-requests {:q "mimeType='application/vnd.google-apps.folder'
                               and name='biomarker-correlator'"})
  (take! listed-files #(get-folder-file-data (get-single-file-id %))))
