(ns app.ui
  (:require
   [ghostwheel.core :as g :refer [>defn >defn- >fdef => | <- ?]]
   [reagent.core :as r]
   [cljs.spec.alpha :as s]))

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
     [:tbody
      ^{:key (random-uuid)} [:tr (for [k (map first (first sorted-pairs))]
                                   ^{:key (random-uuid)} [:th k])]
      (for [pairs sorted-pairs]
        ^{:key (random-uuid)} [:tr (for [r (map peek pairs)]
                                     ^{:key (random-uuid)} [:td r])])]]))

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
