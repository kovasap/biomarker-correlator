(ns app.timeline
  (:require 
    ["react-svg-timeline" :refer (Timeline)]
    [app.specs :refer [ReagentComponent]]
    [app.ui :as ui]
    [app.time :refer [timestamp-to-date-string PeriodRange]]
    [app.csv-data-processing :refer [ProcessedRow]]))


(def Event
  [:map [:eventId :string]
        [:tooltip :string]
        [:laneId :string]
        [:startTimeMillis :int]
        [:endTimeMillis {:optional true} :int]])

(def Lane
  [:map [:laneId :string]
        [:label :string]])

; TODO plot numeric data here as a line/scatter chart as opposed to just event
; dots.  https://github.com/netzwerg/react-svg-timeline/issues/90 should shadow-cljs
; how to do this.  If this question is unanswered, consider switching to
; plotly.
(defn rows-to-events
  {:malli/schema [:=> [:cat [:sequential ProcessedRow]]
                  [:sequential Event]]}
  [rows]
  (for [row rows
        [k v] row
        :when (not (contains? #{:date :timestamp} k))]
    {:eventId (str (:timestamp row) (name k))
     :tooltip (str v ", "(:date row))
     :laneId  (name k)
     :startTimeMillis (:timestamp row)}))
     ; event is one day long for now
     ; :endTimeMillis (+ 86400000 (:timestamp row))}))

(defn ranges-to-events
  {:malli/schema [:=> [:cat [:sequential PeriodRange]]
                  [:sequential Event]]}
  [ranges]
  (for [[idx [start end]] (map-indexed vector ranges)]
    {:eventId (str "range-" idx)
     :tooltip (str (timestamp-to-date-string start) " to "
                   (timestamp-to-date-string end))
     :laneId  "aggregation ranges"
     :startTimeMillis start
     :endTimeMillis end}))

(defn get-unique-lanes
  {:malli/schema [:=> [:cat [:sequential Event]]
                  [:sequential Lane]]}
  [events]
  (let [unique-lane-ids (into #{} (map :laneId events))]
    (for [id unique-lane-ids]
      {:laneId id
       :label id})))

(def single-lane-height 55)

(defn make-timeline
  "Creates a react-svg-timeline from event data.
  
  https://github.com/netzwerg/react-svg-timeline"
  {:malli/schema [:=> [:cat [:sequential Event]] ReagentComponent]}
  [events]
  (let [unique-lanes (get-unique-lanes events)]
    [:div
     [:> Timeline
      {:events (clj->js events)
       :lanes (clj->js unique-lanes)
       :component "div" ; removes <p> cannot be descendant of <p> error
       :width 1000
       :height (* single-lane-height (count unique-lanes))
       :dateFormat (fn [ms] (.toLocaleString (js/Date. ms)))}]]))
  
(defn timeline-for-page
  {:malli/schema [:=> [:cat [:sequential ProcessedRow]
                            [:sequential PeriodRange]]
                  ReagentComponent]}
  [rows aggregate-ranges]
  [:h3 "Timeline"
    [ui/hideable
      (make-timeline (concat (rows-to-events rows)
                             (ranges-to-events aggregate-ranges)))]])
          
