(ns app.timeline
  (:require 
    ["react-svg-timeline" :refer (Timeline)]
    [app.specs :refer [ReagentComponent]]
    [app.csv-data-processing :refer [ProcessedRow]]))


(def Event
  [:map [:eventId :string]
        [:tooltip :string]
        [:laneId :string]
        [:startTimeMillis :int]
        [:endTimeMillis :int]])

(def Lane
  [:map [:laneId :string]
        [:label :string]])

(defn rows-to-events
  {:malli/schema [:=> [:cat [:sequential ProcessedRow]]
                  [:sequential Event]]}
  [rows]
  (for [row rows
        [k v] row
        :when (not (contains? #{:date :timestamp} k))]
    {:eventId (str (:timestamp row) (name k))
     :tooltip (str (:date row))
     :laneId  (name k)
     :startTimeMillis (:timestamp row)
     ; event is one day long for now
     :endTimeMillis (+ 86400000 (:timestamp row))}))

(defn get-unique-lanes
  {:malli/schema [:=> [:cat [:sequential Event]]
                  [:sequential Lane]]}
  [events]
  (let [unique-lane-ids (into #{} (map :laneId events))]
    (for [id unique-lane-ids]
      {:laneId id
       :label id})))

(defn make-timeline
  "Creates a react-svg-timeline from event data.
  
  https://github.com/netzwerg/react-svg-timeline"
  {:malli/schema [:=> [:cat [:sequential Event]] ReagentComponent]}
  [events]
  [:div
   [:> Timeline
    {:events (clj->js events)
     :lanes (clj->js (get-unique-lanes events))
     :component "div" ; removes <p> cannot be descendant of <p> error
     :width 600
     :height 300
     :dateFormat (fn [ms] (.toLocaleString (js/Date. ms)))}]])
  
(defn timeline-for-page
  {:malli/schema [:=> [:cat [:sequential ProcessedRow]] ReagentComponent]}
  [rows]
  [:h3 "Timeline"
    (make-timeline (rows-to-events rows))])
          
