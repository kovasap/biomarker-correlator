(ns app.specs
  (:require
    [cljs.spec.alpha :as s]))


(s/def ::maps
  (s/coll-of (s/map-of keyword? (s/or :keyword keyword?
                                      :number number?))))

(s/def ::hiccup vector?)
; TODO use a more specific hiccup spec
(def Hiccup [:vector :any])
(def ReagentComponent [:or [:=> [:cat :any] Hiccup]
                           Hiccup])

(defn make-hiccup
  {:malli/schema [:=> [:cat :string] Hiccup]}
  [s]
  [:div s])
