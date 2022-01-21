(ns app.specs
  (:require
   [cljs.spec.alpha :as s]))

; TODO look into using malli instead of spec here
; https://github.com/metosin/malli
; https://www.reddit.com/r/Clojure/comments/lpv8ok/spec_vs_malli/
; or schema:
; https://github.com/plumatic/schema

; Schema seems like a less verbose, simpler option to start with
; Or maybe ghostwheel??
; https://github.com/gnl/ghostwheel
; This would require doing something like
; https://github.com/clj-kondo/clj-kondo/blob/master/doc/config.md#lint-a-custom-macro-like-a-built-in-macro

;; TODO add date validation here
(s/def :bc/date (s/and string? #(re-matches #".* to .*" %)))

(s/def :bc/dated-row (s/keys :req [:bc/date]))

(s/def :bc/dated-rows (fn [input] every? #(s/valid? :bc/dated-row %) input))
