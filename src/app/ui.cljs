(ns app.ui
  (:require
   [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
   [reagent-table.core :as rt]
   [reagent.core :as r]
   ; ["react-data-grid" :default DataGrid]
   [cljs.spec.alpha :as s]))

; (defn maps-to-datagrid
;   [maps]
;   [(r/adapt-react-class DataGrid)
;    {:columns (map #({:key % :name (name %)}) (keys (first maps)))
;     :rows maps}])

; Beware sorting maps directly - it's been unreliable.  It's better to convert
; to lists of 2-vectors and sort those.
(defn map-to-sorted-pairs [m]
  (sort-by (fn [pair]
             (let [k (first pair)]
               ; Capital letters get sorted before lowercase!
               (if (= k :input) "AAAAA" (name k))))
           (seq m)))

(>defn maps-to-html
  "Converts collection of maps like
  [{:col1 val1 :col2 val2} {:col1 val3 :col2 val4}]
  to an HTML table.
  
  See https://stackoverflow.com/a/33458370 for ^{:key} map explanation.
  "
  [maps]
  [(s/coll-of map?) => :app.specs/hiccup]
  (let [sorted-pairs (map map-to-sorted-pairs maps)]
    [:table
     (into [:tbody
            (into [:tr] (for [k (map first (first sorted-pairs))]
                          [:th k]))]
           (for [pairs sorted-pairs]
             (into [:tr] (for [r (map peek pairs)]
                           [:td r]))))]))

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

  Note this depends on some CSS classes in site.css.

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


; --- Reagent Table Logic ---------------------------
; See https://github.com/Frozenlock/reagent-table/blob/master/dev/reagent_table/dev.cljs

(defn- cell-data
  "Resolve the data within a row for a specific column"
  [row cell]
  (let [{:keys [path expr]} cell]
    (or (and path
             (get-in row path))
        (and expr
             (expr row)))))

(defn- cell-fn
  "Return the cell hiccup form for rendering.
   - render-info the specific column from :column-model
   - row the current row
   - row-num the row number
   - col-num the column number in model coordinates"
  [render-info row row-num col-num]
  (let [{:keys [format attrs]
         :or   {format identity
                attrs (fn [_] {})}} render-info
        data    (cell-data row render-info)
        content (format data)
        attrs   (attrs data)]
    [:span
     attrs
     content]))

(defn compare-vals
  "A comparator that works for the various types found in table structures.
  This is a limited implementation that expects the arguments to be of
  the same type. The :else case is to call compare, which will throw
  if the arguments are not comparable to each other or give undefined
  results otherwise.
  Both arguments can be a vector, in which case they must be of equal
  length and each element is compared in turn."
  [x y]
  (cond
    (and (vector? x)
         (vector? y)
         (= (count x) (count y)))
    (reduce #(let [r (compare (first %2) (second %2))]
               (if (not= r 0)
                 (reduced r)
                 r))
            0
            (map vector x y))

    (or (and (number? x) (number? y))
        (and (string? x) (string? y))
        (and (boolean? x) (boolean? y)))
    (compare x y)

    :else ;; hope for the best... are there any other possiblities?
    (compare x y)))

(defn- sort-fn
  "Generic sort function for tabular data. Sort rows using data resolved from
  the specified columns in the column model."
  [rows column-model sorting]
  (sort (fn [row-x row-y]
          (reduce
            (fn [_ sort]
              (let [column (column-model (first sort))
                    direction (second sort)
                    cell-x (cell-data row-x column)
                    cell-y (cell-data row-y column)
                    compared (if (= direction :asc)
                               (compare-vals cell-x cell-y)
                               (compare-vals cell-y cell-x))]
                (when-not (zero? compared)
                  (reduced compared))))
                
            0
            sorting))
        rows))

(defn- get-column-model
  [flattened-data]
  (into [] (for [k (keys (first flattened-data))]
             {:path [k] :header (name k) :key k})))

(defn reagent-table [data-atom]
  [rt/reagent-table
   data-atom
   {:column-model (get-column-model @data-atom)
    :render-cell cell-fn
    :sort sort-fn}])
