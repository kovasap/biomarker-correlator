(ns app.specs
  (:require
   [spec-tools.data-spec :as ds]
   [cljs.spec.gen.alpha :as gen]
   [cljs.spec.alpha :as s]))

; My structure defined in a schema-like syntax using spec-tools.data-spec
(def ::input-correlations-concise
  (ds/spec
   {:input keyword?
    :score int?
    :average float?
    :correlations [{:biomarker keyword?
                    :regression-results {:slope float?
                                         :rsq float?
                                         :datapoints int?}}]}))

; Unfortunately, this throws an exception and I'm not sure why
(gen/generate (s/gen ::input-correlations-concise))

; My structure defined using pure spec.
(s/def ::input-correlations
  (s/keys :req-un [::input ::aggregates ::correlations]))

(s/def ::input keyword?)

(s/def ::aggregates
  (s/keys :req-un [::score ::average]))
(s/def ::score int?)
(s/def ::average float?)

(s/def ::correlations
  (s/keys :req-un [::biomarker ::regression-results]))
(s/def ::biomarker keyword?)
(s/def ::regression-results
  (s/coll-of ::regression-result))

(s/def ::regression-result
  (s/keys :req-un [::slope ::datapoints ::rsq]))
(s/def ::slope float?)
(s/def ::datapoints int?)
(s/def ::rsq float?)

(s/valid? ::regression-result {:slope 1.0 :datapoints 2 :rsq 3.4})

; This works as expected!
(gen/generate (s/gen ::input-correlations))

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
