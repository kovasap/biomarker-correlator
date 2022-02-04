goog.provide('app.specs');
app.specs.dated_rows = spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("app.specs","dated-rows","app.specs/dated-rows",158947585),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"date","date",-1463434462),cljs.core.keyword_QMARK_], null)], null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.specs","dated-rows","app.specs/dated-rows",158947585),new cljs.core.Symbol("app.specs","dated-rows","app.specs/dated-rows",1799479112,null),app.specs.dated_rows);
app.specs.regression_results = spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("app.specs","regression-results","app.specs/regression-results",-475316269),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"slope","slope",-1227938123),cljs.core.float_QMARK_,new cljs.core.Keyword(null,"rsq","rsq",243329956),cljs.core.float_QMARK_,new cljs.core.Keyword(null,"datapoints","datapoints",-1250577876),cljs.core.int_QMARK_], null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.specs","regression-results","app.specs/regression-results",-475316269),new cljs.core.Symbol("app.specs","regression-results","app.specs/regression-results",1165215258,null),app.specs.regression_results);
app.specs.pairwise_correlations = spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("app.specs","pairwise-correlations","app.specs/pairwise-correlations",242931928),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"input","input",556931961),cljs.core.keyword_QMARK_,new cljs.core.Keyword(null,"biomarker","biomarker",-1934144816),cljs.core.keyword_QMARK_,new cljs.core.Keyword(null,"regression-results","regression-results",224318376),new cljs.core.Keyword("app.specs","regression-results","app.specs/regression-results",-475316269)], null)], null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.specs","pairwise-correlations","app.specs/pairwise-correlations",242931928),new cljs.core.Symbol("app.specs","pairwise-correlations","app.specs/pairwise-correlations",1883463455,null),app.specs.pairwise_correlations);
app.specs.one_to_many_correlation = spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",-892957838),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"one-var","one-var",65273568),cljs.core.keyword_QMARK_,new cljs.core.Keyword(null,"score","score",-1963588780),cljs.core.int_QMARK_,new cljs.core.Keyword(null,"average","average",-492356168),cljs.core.float_QMARK_,new cljs.core.Keyword(null,"correlations","correlations",517036229),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"many-var","many-var",1186068059),cljs.core.keyword_QMARK_,new cljs.core.Keyword(null,"regression-results","regression-results",224318376),new cljs.core.Keyword("app.specs","regression-results","app.specs/regression-results",-475316269)], null)], null)], null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",-892957838),new cljs.core.Symbol("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",747573689,null),app.specs.one_to_many_correlation);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.specs","one-to-many-correlations","app.specs/one-to-many-correlations",-719884522),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",-892957838)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",-892957838),new cljs.core.Keyword("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",-892957838),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__37532){
return cljs.core.coll_QMARK_(G__37532);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("app.specs","one-to-many-correlation","app.specs/one-to-many-correlation",-892957838))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.specs","hiccup","app.specs/hiccup",787155257),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),cljs.core.vector_QMARK_);

//# sourceMappingURL=app.specs.js.map
