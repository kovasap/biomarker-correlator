(ns app.ui
  (:require
    [app.specs :as specs]
    [reagent.core :as r]
    ["react-data-grid" :default DataGrid]
    [app.csv :as csv]
    [clojure.string :as st]))


(def px-per-character 13)
(defn get-rough-px-width
  "Gives a rough estimate for the pixel width of a string."
  [string]
  (* px-per-character (count string)))

(defn make-datagrid-column
  "Generates a react-data-grid column 
  https://github.com/adazzle/react-data-grid/blob/929911c506919e96bd12e48ea5de68ec9511ca10/src/types.ts#L7
  
  '--' substrings in the input key are converted to newlines."
  [k]
  (let [lines (st/split (name k) #"\-\-")]
    {:key k
     :name (r/as-element
             (into [] (concat
                        [:div {:style {:line-height "20px"}}]
                        (interleave lines (repeat [:br])))))
     :sortable true
     :width (apply max (map get-rough-px-width lines))})) 

(defn maps-to-datagrid
  [maps & {:keys [custom-make-datagrid-column]
           :or {custom-make-datagrid-column (fn [_] {})}}]
  (let [sorted-rows (r/atom maps)
        sort-columns (r/atom [{:columnKey "input" :direction "ASC"}])]
    [:div
      [:> DataGrid
       {:columns (clj->js (map #(merge (make-datagrid-column %)
                                       (custom-make-datagrid-column %))
                               (keys (first maps))))
        ; This in combination with [role=columndheader] in public/css/site.css
        ; allows for multiline column headers.
        :headerRowHeight 60
        :defaultColumnOptions #js {:sortable true
                                   :resizable true}
        ; See
        ; https://github.com/adazzle/react-data-grid/blob/b7ad586498ab8a6ed3235ccfd93d3d490b24f4cc/website/demos/CommonFeatures.tsx#L330
        ; for how to make column sorting work. See also
        ; https://github.com/reagent-project/reagent/issues/545
        :sortColumns (clj->js @sort-columns)
        :onSortColumnsChange
        (fn [newSortColumns]
          (let [{columnKey :columnKey
                 direction :direction} (first (js->clj newSortColumns
                                                       :keywordize-keys true))]
            (swap! sorted-rows
                   #(sort (fn [m1 m2]
                            (let [v1 (get columnKey m1)
                                  v2 (get columnKey m2)]
                              (if (= direction "ASC")
                                (< v1 v2)
                                (> v1 v2))))
                          %))))
        :rows (clj->js @sorted-rows)}]
      [:button {:on-click #(csv/download-as-csv maps "data.csv")}
       "Download as CSV"]]))

(maps-to-datagrid [{:test "v1" :test2 "v2"}])


(defn value-to-str
  "Converts a given value into something displayable by an html tabl."
  [value]
  (cond
    (map? value) "{...}"
    :else value))

; (value-to-str {:test "map"})

; Beware sorting maps directly - it's been unreliable.  It's better to convert
; to lists of 2-vectors and sort those.
(defn map-to-sorted-pairs [m]
  (sort-by (fn [pair]
             (let [k (first pair)]
               ; Capital letters get sorted before lowercase!
               (if (= k :input) "AAAAA" (name k))))
           (seq m)))

(defn maps-to-html
  "Converts collection of maps like
  [{:col1 val1 :col2 val2} {:col1 val3 :col2 val4}]
  to an HTML table.
  
  See https://stackoverflow.com/a/33458370 for ^{:key} map explanation.
  "
  {:malli/schema [:=> [:cat [:sequential :map]]
                  specs/Hiccup]}
  [maps]
  (let [sorted-pairs (map map-to-sorted-pairs maps)]
    [:table
     (into [:tbody
            (into [:tr] (for [k (map first (first sorted-pairs))]
                          [:th k]))]
           (for [pairs sorted-pairs]
             (into [:tr] (for [r (map peek pairs)]
                           [:td (value-to-str r)]))))]))

(defn hideable
  "Adds a clickable hide button to the component.

  I would use a details/summary html element, but they don't seem to play
  nicely with react/reagent :(.
  
  Can be used like this:
  [hidable component-to-hide]"
  [_]
  (let [hidden (r/atom true)]
    (fn [component]
      [:div
        [:button {:on-click #(reset! hidden (not @hidden))}
         "Click to hide/show"]
        [:div {:style {:display (if @hidden "none" "block")}}
         component]])))


(defn hover-to-render
  "Wraps a component in a function that only shows and renders it when an
  element is hovered.

  Original inspiration:
  https://www.reddit.com/r/Clojure/comments/sihk4b/comment/hv8xrh6/
  "
  [_]
  (let [hidden (r/atom true)]
    (fn [hoverable hidable]
      [:div
        [:div {:on-mouse-over #(reset! hidden false)
               :on-mouse-out #(reset! hidden true)}
         hoverable]
        (if @hidden
          nil
          [:div {:style {:position "absolute" :z-index 100}}
           hidable])])))
