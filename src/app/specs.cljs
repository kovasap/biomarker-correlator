(ns app.specs
  (:require
    [cljs.spec.alpha :as s]))


(s/def ::maps
  (s/coll-of (s/map-of keyword? (s/or :keyword keyword?
                                      :number number?))))

(s/def ::hiccup vector?)
; TODO use a more specific hiccup spec
(def Hiccup
  [:schema
   {:registry {"hiccup" [:orn
                         [:node [:catn
                                 [:name keyword?]
                                 [:props [:? [:map-of keyword? any?]]]
                                 [:children [:* [:schema [:ref "hiccup"]]]]]]
                         [:primitive [:orn
                                      [:nil nil?]
                                      [:boolean boolean?]
                                      [:number number?]
                                      [:text string?]]]]}}
   "hiccup"])
(def ReagentComponent [:or [:=> [:cat :any] Hiccup]
                           Hiccup])

(defn make-hiccup
  {:malli/schema [:=> [:cat :string] Hiccup]}
  [s]
  [:div s])
