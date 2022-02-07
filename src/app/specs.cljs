(ns app.specs
  (:require
   [spec-tools.data-spec :as ds]
   [clojure.test.check.generators]
   [cljs.spec.gen.alpha :as gen]
   [cljs.spec.alpha :as s]))


(def dated-rows
  (ds/spec ::dated-rows
    [{:date keyword?}]))
(s/def ::dated-rows dated-rows)


(def regression-results
  (ds/spec ::regression-results
    {:slope float?
     :rsq float?
     :datapoints int?}))
(s/def ::regression-results regression-results)


(def pairwise-correlations
  (ds/spec ::pairwise-correlations
    [{:input keyword?
      :biomarker keyword?
      :regression-results ::regression-results}]))
(s/def ::pairwise-correlations pairwise-correlations)


(def one-to-many-correlation
  (ds/spec ::one-to-many-correlation
    {:one-var keyword?
     :score int?
     :average float?
     :correlations [{:many-var keyword?
                     :regression-results ::regression-results}]}))
(s/def ::one-to-many-correlation one-to-many-correlation)
(def one-to-many-correlations
  (ds/spec ::one-to-many-correlations
    {keyword? ::one-to-many-correlation}))
(s/def ::one-to-many-correlations one-to-many-correlations)


(s/def ::hiccup vector?)

; (gen/generate (s/gen one-to-many-correlation))





; My structure defined using pure spec.
; (s/def ::input-correlations
;   (s/keys :req-un [::input ::aggregates ::correlations]))
; 
; (s/def ::input keyword?)
; 
; (s/def ::aggregates
;   (s/keys :req-un [::score ::average]))
; (s/def ::score int?)
; (s/def ::average float?)
; 
; (s/def ::correlations
;   (s/keys :req-un [::biomarker ::regression-results]))
; (s/def ::biomarker keyword?)
; (s/def ::regression-results
;   (s/coll-of ::regression-result))
; 
; (s/def ::regression-result
;   (s/keys :req-un [::slope ::datapoints ::rsq]))
; (s/def ::slope float?)
; (s/def ::datapoints int?)
; (s/def ::rsq float?)
; 
; (s/valid? ::regression-result {:slope 1.0 :datapoints 2 :rsq 3.4})
; 
; ; This works as expected!
; (gen/generate (s/gen ::input-correlations))

; (def dated-row-spec
;   (ds/spec
;    {:date string?}))

;; TODO add date validation here
; (s/def :bc/date (s/and string? #(re-matches #".* to .*" %)))
; 
; (s/def :bc/dated-row (s/keys :req [:bc/date]))
; 
; (s/def :bc/dated-rows (fn [input] every? #(s/valid? :bc/dated-row %) input))

; This is helpful: https://www.youtube.com/watch?v=5OuOnJXLxVE

; Schema seems like a less verbose, simpler option to start with
; Or maybe ghostwheel??
; https://github.com/gnl/ghostwheel
; This would require doing something like
; https://github.com/clj-kondo/clj-kondo/blob/master/doc/config.md#lint-a-custom-macro-like-a-built-in-macro

; TODO use https://github.com/binaryage/cljs-devtools

; Documentation
; https://github.com/metosin/spec-tools/blob/master/docs/02_data_specs.md
