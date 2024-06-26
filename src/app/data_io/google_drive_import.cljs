; Depends on code in public/js/gdrive.js to setup the js/gapi.
(ns app.data-io.google-drive-import
  (:require
    [app.data-atom :refer [data]]
    [app.data-io.csv-parsing :refer [parse-csv]]
    [reagent.core :as r]
    [cljs.core.async :refer [chan put! take! >! <! timeout close! alts!]]
    [cljs.core.async :refer-macros [go-loop alt!]]
    [clojure.string :as st]))

(defn ^js/gapi get-gapi
  "Returns nil if getting the gapi failed for some reason and js/gapi is
  undefined as a result."
  []
  (if (nil? (.. js/gapi -client))
    nil
    js/gapi))

(def found-files
  (r/atom []))

; Check out
; https://www.learn-clojurescript.com/section-4/lesson-25-intro-to-core-async/
; for a good explanation of how these channels work.
(def list-files-requests (chan))
(def listed-files (chan))

; Calls the files.list Google Drive API and puts the results into listed-files.
(go-loop []
  ; https://lwhorton.github.io/2018/10/20/clojurescript-interop-with-javascript.html
  ; Explains this syntax.
  ; This let parks the process before it can enter an infinite loop if
  ; (get-gapi) returns nil.
  (let [request (<! list-files-requests)]
    (if (get-gapi)
      (. (.. (get-gapi) -client -drive -files
           (list
             ; Update request with default parameters if they are not provided.
             (clj->js (merge {:pageSize 100
                              :fields "nextPageToken, files(id, name)"}
                             request))))
         (then (fn [response]
                 (put! listed-files (js->clj response :keywordize-keys true)))))
      nil))
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
  ; This let parks the process before it can enter an infinite loop if
  ; (get-gapi) returns nil.
  (let [file-id (<! get-file-ids)]
    (if (get-gapi)
      (. (.. (get-gapi) -client -drive -files
           (get (clj->js {:fileId file-id
                          :alt "media"})))
         (then (fn [response]
                 (put! file-datas (js->clj response :keywordize-keys true)))))
      nil))
  (recur))

(defn get-file-data
  [file-id data-key]
  (put! get-file-ids file-id)
  (take! file-datas
         (fn [response]
           (swap! data assoc
                  data-key (parse-csv (:body response))))))

(defn get-data-key
  "Returns the key under which to add the data to the data atom. Returns
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

(defn google-drive-ui []
  [:div
   [:h4 "Google Drive Integration"]
   [:p
    "Once signed in and authorized, this application will search through
     your Google Drive, find a folder named \"biomarker-correlator\", and then
     process the files within that folder. Any CSV files with \"inputs\" in
     the name will be treated as the input data files and any with \"biomarkers\"
     in the name will be treated as the biomarker data files."]
   [:p
    "If you are getting permissions issues, note that you need to be
     whitelisted as this app is currently not verified with Google. Please
     contact kovas[dot]palunas[at]gmail.com if you want to be whitelisted."]
   [:button {:id "authorize_button" :style {:display "none"}}
    "Authorize"]
   [:button {:id "signout_button" :style {:display "none"}}
    "Sign Out"]
   [:button {:on-click #(populate-data!)}
    "Fetch Google Drive Data"]
   [:pre "Found files " (str @found-files)]])
