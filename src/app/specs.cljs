(ns app.specs
  (:require
   [spec-tools.data-spec :as ds]
   [cljs.spec.alpha :as s]))

; Schema seems like a less verbose, simpler option to start with
; Or maybe ghostwheel??
; https://github.com/gnl/ghostwheel
; This would require doing something like
; https://github.com/clj-kondo/clj-kondo/blob/master/doc/config.md#lint-a-custom-macro-like-a-built-in-macro

; TODO use https://github.com/binaryage/cljs-devtools

; Documentation
; https://github.com/metosin/spec-tools/blob/master/docs/02_data_specs.md

(def significant-correlations
  (ds/spec
   {:input keyword?
    :score int?
    :average float?
    :correlations {:biomarker keyword?
                   :slope float?
                   :rsq float?
                   :datapoints int?}}))

(def dated-row-spec
  (ds/spec
   {:date string?}))

;; TODO add date validation here
(s/def :bc/date (s/and string? #(re-matches #".* to .*" %)))

(s/def :bc/dated-row (s/keys :req [:bc/date]))

(s/def :bc/dated-rows (fn [input] every? #(s/valid? :bc/dated-row %) input))
