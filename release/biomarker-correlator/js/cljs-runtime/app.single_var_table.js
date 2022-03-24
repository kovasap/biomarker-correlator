goog.provide('app.single_var_table');
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","one-var","app.single-var-table/one-var",255437168),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","many-var","app.single-var-table/many-var",1377845227),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.keyword_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","score","app.single-var-table/score",-1771772252),new cljs.core.Symbol("cljs.core","int?","cljs.core/int?",50730120,null),cljs.core.int_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","average","app.single-var-table/average",-801834968),new cljs.core.Symbol("cljs.core","float?","cljs.core/float?",-941017745,null),cljs.core.float_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","aggregates","app.single-var-table/aggregates",-1624386113),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","score","app.single-var-table/score",-1771772252),new cljs.core.Keyword("app.single-var-table","average","app.single-var-table/average",-801834968)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","score","app.single-var-table/score",-1771772252),new cljs.core.Keyword("app.single-var-table","average","app.single-var-table/average",-801834968)], null),null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__57133){
return cljs.core.map_QMARK_(G__57133);
}),(function (G__57133){
return cljs.core.contains_QMARK_(G__57133,new cljs.core.Keyword(null,"score","score",-1963588780));
}),(function (G__57133){
return cljs.core.contains_QMARK_(G__57133,new cljs.core.Keyword(null,"average","average",-492356168));
})], null),(function (G__57133){
return ((cljs.core.map_QMARK_(G__57133)) && (((cljs.core.contains_QMARK_(G__57133,new cljs.core.Keyword(null,"score","score",-1963588780))) && (cljs.core.contains_QMARK_(G__57133,new cljs.core.Keyword(null,"average","average",-492356168))))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","score","app.single-var-table/score",-1771772252),new cljs.core.Keyword("app.single-var-table","average","app.single-var-table/average",-801834968)], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"score","score",-1963588780),new cljs.core.Keyword(null,"average","average",-492356168)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"score","score",-1963588780))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"average","average",-492356168)))], null),null])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","correlations","app.single-var-table/correlations",1382134613),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","many-var","app.single-var-table/many-var",1377845227),new cljs.core.Keyword("app.stats","regression-results","app.stats/regression-results",-475462570)], null))),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("s","keys","s/keys",-1586011188,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","many-var","app.single-var-table/many-var",1377845227),new cljs.core.Keyword("app.stats","regression-results","app.stats/regression-results",-475462570)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","many-var","app.single-var-table/many-var",1377845227),new cljs.core.Keyword("app.stats","regression-results","app.stats/regression-results",-475462570)], null),null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__57142){
return cljs.core.map_QMARK_(G__57142);
}),(function (G__57142){
return cljs.core.contains_QMARK_(G__57142,new cljs.core.Keyword(null,"many-var","many-var",1186068059));
}),(function (G__57142){
return cljs.core.contains_QMARK_(G__57142,new cljs.core.Keyword(null,"regression-results","regression-results",224318376));
})], null),(function (G__57142){
return ((cljs.core.map_QMARK_(G__57142)) && (((cljs.core.contains_QMARK_(G__57142,new cljs.core.Keyword(null,"many-var","many-var",1186068059))) && (cljs.core.contains_QMARK_(G__57142,new cljs.core.Keyword(null,"regression-results","regression-results",224318376))))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","many-var","app.single-var-table/many-var",1377845227),new cljs.core.Keyword("app.stats","regression-results","app.stats/regression-results",-475462570)], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"many-var","many-var",1186068059),new cljs.core.Keyword(null,"regression-results","regression-results",224318376)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"many-var","many-var",1186068059))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"regression-results","regression-results",224318376)))], null),null])),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__57141){
return cljs.core.coll_QMARK_(G__57141);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","many-var","app.single-var-table/many-var",1377845227),new cljs.core.Keyword("app.stats","regression-results","app.stats/regression-results",-475462570)], null)))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-var","app.single-var-table/one-var",255437168),new cljs.core.Keyword("app.single-var-table","aggregates","app.single-var-table/aggregates",-1624386113),new cljs.core.Keyword("app.single-var-table","correlations","app.single-var-table/correlations",1382134613)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-var","app.single-var-table/one-var",255437168),new cljs.core.Keyword("app.single-var-table","aggregates","app.single-var-table/aggregates",-1624386113),new cljs.core.Keyword("app.single-var-table","correlations","app.single-var-table/correlations",1382134613)], null),null,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__57147){
return cljs.core.map_QMARK_(G__57147);
}),(function (G__57147){
return cljs.core.contains_QMARK_(G__57147,new cljs.core.Keyword(null,"one-var","one-var",65273568));
}),(function (G__57147){
return cljs.core.contains_QMARK_(G__57147,new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289));
}),(function (G__57147){
return cljs.core.contains_QMARK_(G__57147,new cljs.core.Keyword(null,"correlations","correlations",517036229));
})], null),(function (G__57147){
return ((cljs.core.map_QMARK_(G__57147)) && (((cljs.core.contains_QMARK_(G__57147,new cljs.core.Keyword(null,"one-var","one-var",65273568))) && (((cljs.core.contains_QMARK_(G__57147,new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289))) && (cljs.core.contains_QMARK_(G__57147,new cljs.core.Keyword(null,"correlations","correlations",517036229))))))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-var","app.single-var-table/one-var",255437168),new cljs.core.Keyword("app.single-var-table","aggregates","app.single-var-table/aggregates",-1624386113),new cljs.core.Keyword("app.single-var-table","correlations","app.single-var-table/correlations",1382134613)], null),null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"one-var","one-var",65273568),new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289),new cljs.core.Keyword(null,"correlations","correlations",517036229)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"one-var","one-var",65273568))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"correlations","correlations",517036229)))], null),null])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("app.single-var-table","one-to-many-correlations","app.single-var-table/one-to-many-correlations",2054560857),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__57148){
return cljs.core.map_QMARK_(G__57148);
}),new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__9377__auto__,v__9378__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__9378__auto__,(0));
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195))], null),null));
app.single_var_table.OneToManyCorrelation = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"one-var","one-var",65273568),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"score","score",-1963588780),new cljs.core.Keyword(null,"int","int",-1741416922)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"average","average",-492356168),new cljs.core.Keyword(null,"number","number",1570378438)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"acm-score","acm-score",-1488232861),new cljs.core.Keyword(null,"number","number",1570378438)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"correlations","correlations",517036229),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"many-var","many-var",1186068059),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"regression-results","regression-results",224318376),app.stats.CorrelationResults], null)], null)], null)], null);
app.single_var_table.aggregate_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"acm-score","acm-score",-1488232861),null,new cljs.core.Keyword(null,"score","score",-1963588780),null,new cljs.core.Keyword(null,"average","average",-492356168),null], null), null);
/**
 * Filter row maps from the input that show statistically insignificant
 *   correlations
 */
app.single_var_table.filter_insignificant = (function app$single_var_table$filter_insignificant(rows){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__57149_SHARP_){
return (new cljs.core.Keyword(null,"p-value","p-value",1434023819).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(p1__57149_SHARP_)) < app.stats.p_value_cutoff);
}),rows);
});
cljs.spec.alpha.def_impl(new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"correlations","correlations",517036229),new cljs.core.Keyword("app.single-var-table","pairwise-correlations","app.single-var-table/pairwise-correlations",1280960539)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Symbol("cljs.core","int?","cljs.core/int?",50730120,null)),cljs.spec.alpha.fspec_impl(cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"correlations","correlations",517036229),new cljs.core.Keyword("app.single-var-table","pairwise-correlations","app.single-var-table/pairwise-correlations",1280960539)),cljs.spec.alpha.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"correlations","correlations",517036229)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","pairwise-correlations","app.single-var-table/pairwise-correlations",1280960539)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","pairwise-correlations","app.single-var-table/pairwise-correlations",1280960539)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"correlations","correlations",517036229),new cljs.core.Keyword("app.single-var-table","pairwise-correlations","app.single-var-table/pairwise-correlations",1280960539)),cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol("cljs.core","int?","cljs.core/int?",50730120,null),cljs.core.int_QMARK_,null,null),new cljs.core.Symbol("cljs.core","int?","cljs.core/int?",50730120,null),null,null,null));

/**
 * Sums up all postive correlations and all negatives correlations, then takes
 *   the difference.
 * @type {function(*): !number}
 */
app.single_var_table.calc_counted_score = (function app$single_var_table$calc_counted_score(correlations){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__57151_SHARP_){
if((new cljs.core.Keyword(null,"correlation","correlation",-975773207).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(p1__57151_SHARP_)) < (0))){
return (-1);
} else {
return (1);
}
}),correlations));
});
app.single_var_table.get_significant_correlations = (function app$single_var_table$get_significant_correlations(data,one_var_type,one_var,many_var_type,one_var_raw_data){
var one_var_significant_correlations = (function (){var G__57153 = cljs.core.group_by(one_var_type,app.single_var_table.filter_insignificant(data));
return (one_var.cljs$core$IFn$_invoke$arity$1 ? one_var.cljs$core$IFn$_invoke$arity$1(G__57153) : one_var.call(null,G__57153));
})();
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([one_var,one_var_raw_data], 0));

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"one-var","one-var",65273568),one_var,new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"score","score",-1963588780),app.single_var_table.calc_counted_score(one_var_significant_correlations),new cljs.core.Keyword(null,"average","average",-492356168),app.stats.round((cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,one_var_raw_data) / cljs.core.count(one_var_raw_data)))], null),new cljs.core.Keyword(null,"correlations","correlations",517036229),(function (){var iter__4652__auto__ = (function app$single_var_table$get_significant_correlations_$_iter__57154(s__57155){
return (new cljs.core.LazySeq(null,(function (){
var s__57155__$1 = s__57155;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__57155__$1);
if(temp__5753__auto__){
var s__57155__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__57155__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__57155__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__57157 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__57156 = (0);
while(true){
if((i__57156 < size__4651__auto__)){
var correlation = cljs.core._nth(c__4650__auto__,i__57156);
cljs.core.chunk_append(b__57157,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"many-var","many-var",1186068059),(many_var_type.cljs$core$IFn$_invoke$arity$1 ? many_var_type.cljs$core$IFn$_invoke$arity$1(correlation) : many_var_type.call(null,correlation)),new cljs.core.Keyword(null,"regression-results","regression-results",224318376),new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(correlation)], null));

var G__57251 = (i__57156 + (1));
i__57156 = G__57251;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57157),app$single_var_table$get_significant_correlations_$_iter__57154(cljs.core.chunk_rest(s__57155__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57157),null);
}
} else {
var correlation = cljs.core.first(s__57155__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"many-var","many-var",1186068059),(many_var_type.cljs$core$IFn$_invoke$arity$1 ? many_var_type.cljs$core$IFn$_invoke$arity$1(correlation) : many_var_type.call(null,correlation)),new cljs.core.Keyword(null,"regression-results","regression-results",224318376),new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(correlation)], null),app$single_var_table$get_significant_correlations_$_iter__57154(cljs.core.rest(s__57155__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(one_var_significant_correlations);
})()], null);
});
/**
 * Filters NaNs while getting the data.
 */
app.single_var_table.get_csv_values = (function app$single_var_table$get_csv_values(csv_data,column_name){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,(function (){var iter__4652__auto__ = (function app$single_var_table$get_csv_values_$_iter__57158(s__57159){
return (new cljs.core.LazySeq(null,(function (){
var s__57159__$1 = s__57159;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__57159__$1);
if(temp__5753__auto__){
var s__57159__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__57159__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__57159__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__57161 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__57160 = (0);
while(true){
if((i__57160 < size__4651__auto__)){
var row = cljs.core._nth(c__4650__auto__,i__57160);
var value = (column_name.cljs$core$IFn$_invoke$arity$1 ? column_name.cljs$core$IFn$_invoke$arity$1(row) : column_name.call(null,row));
if(cljs.core.not(isNaN(value))){
cljs.core.chunk_append(b__57161,value);

var G__57256 = (i__57160 + (1));
i__57160 = G__57256;
continue;
} else {
var G__57257 = (i__57160 + (1));
i__57160 = G__57257;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57161),app$single_var_table$get_csv_values_$_iter__57158(cljs.core.chunk_rest(s__57159__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57161),null);
}
} else {
var row = cljs.core.first(s__57159__$2);
var value = (column_name.cljs$core$IFn$_invoke$arity$1 ? column_name.cljs$core$IFn$_invoke$arity$1(row) : column_name.call(null,row));
if(cljs.core.not(isNaN(value))){
return cljs.core.cons(value,app$single_var_table$get_csv_values_$_iter__57158(cljs.core.rest(s__57159__$2)));
} else {
var G__57261 = cljs.core.rest(s__57159__$2);
s__57159__$1 = G__57261;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(csv_data);
})());
});
app.single_var_table.make_all_correlations = (function app$single_var_table$make_all_correlations(correlations,csv_data,one_var_type,many_var_type){
var unique_one_vars = cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__57165_SHARP_){
return (one_var_type.cljs$core$IFn$_invoke$arity$1 ? one_var_type.cljs$core$IFn$_invoke$arity$1(p1__57165_SHARP_) : one_var_type.call(null,p1__57165_SHARP_));
}),correlations));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4652__auto__ = (function app$single_var_table$make_all_correlations_$_iter__57167(s__57168){
return (new cljs.core.LazySeq(null,(function (){
var s__57168__$1 = s__57168;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__57168__$1);
if(temp__5753__auto__){
var s__57168__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__57168__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__57168__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__57170 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__57169 = (0);
while(true){
if((i__57169 < size__4651__auto__)){
var one_var = cljs.core._nth(c__4650__auto__,i__57169);
cljs.core.chunk_append(b__57170,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [one_var,app.single_var_table.get_significant_correlations(correlations,one_var_type,one_var,many_var_type,app.single_var_table.get_csv_values(csv_data,one_var))], null));

var G__57268 = (i__57169 + (1));
i__57169 = G__57268;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57170),app$single_var_table$make_all_correlations_$_iter__57167(cljs.core.chunk_rest(s__57168__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57170),null);
}
} else {
var one_var = cljs.core.first(s__57168__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [one_var,app.single_var_table.get_significant_correlations(correlations,one_var_type,one_var,many_var_type,app.single_var_table.get_csv_values(csv_data,one_var))], null),app$single_var_table$make_all_correlations_$_iter__57167(cljs.core.rest(s__57168__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(unique_one_vars);
})());
});
app.single_var_table.table_keys = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"correlation","correlation",-975773207),new cljs.core.Keyword(null,"p-value","p-value",1434023819),new cljs.core.Keyword(null,"datapoints","datapoints",-1250577876)], null);
cljs.spec.alpha.def_impl(new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword("app.biomarker-data","timeseries-data","app.biomarker-data/timeseries-data",-222962694)),cljs.spec.alpha.fspec_impl(cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),cljs.spec.alpha.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("app.biomarker-data","timeseries-data","app.biomarker-data/timeseries-data",-222962694),new cljs.core.Keyword("app.biomarker-data","timeseries-data","app.biomarker-data/timeseries-data",-222962694),null,null),new cljs.core.Keyword("app.biomarker-data","timeseries-data","app.biomarker-data/timeseries-data",-222962694),null,null,null));

/**
 * @type {function(*): *}
 */
app.single_var_table.get_one_var_timeseries_data = (function app$single_var_table$get_one_var_timeseries_data(data){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__57172_SHARP_){
return cljs.core.select_keys(p1__57172_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),new cljs.core.Keyword(null,"one-var","one-var",65273568).cljs$core$IFn$_invoke$arity$1(data)], null));
}),new cljs.core.Keyword(null,"raw-data","raw-data",617791828).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword(null,"correlations","correlations",517036229).cljs$core$IFn$_invoke$arity$1(data)))));
});
cljs.spec.alpha.def_impl(new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","fspec","cljs.spec.alpha/fspec",-1289128341,null),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword("app.specs","hiccup","app.specs/hiccup",787155257)),cljs.spec.alpha.fspec_impl(cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),cljs.spec.alpha.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)], null)),null,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("app.single-var-table","one-to-many-correlation","app.single-var-table/one-to-many-correlation",342121195)),cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("app.specs","hiccup","app.specs/hiccup",787155257),new cljs.core.Keyword("app.specs","hiccup","app.specs/hiccup",787155257),null,null),new cljs.core.Keyword("app.specs","hiccup","app.specs/hiccup",787155257),null,null,null));

/**
 * Creates a table like this:
 *         Input
 *      Aggregate 1
 *      Aggregate 2
 *   Biomarker | r | p | n
 *   data      | 0 | 0 | 0
 *   ...
 *   
 * @type {function(*): *}
 */
app.single_var_table.make_hiccup = (function app$single_var_table$make_hiccup(data){
var one_var = new cljs.core.Keyword(null,"one-var","one-var",65273568).cljs$core$IFn$_invoke$arity$1(data);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colSpan","colSpan",872137394),(4)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),one_var], null),one_var], null),", Counted score of ",new cljs.core.Keyword(null,"score","score",-1963588780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289).cljs$core$IFn$_invoke$arity$1(data)),", Average value ",new cljs.core.Keyword(null,"average","average",-492356168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289).cljs$core$IFn$_invoke$arity$1(data))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"colSpan","colSpan",872137394),(4)], null),((cljs.core.contains_QMARK_(app.biomarker_data.data,one_var))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),app.biomarker_data.make_acm_plot(app.single_var_table.get_one_var_timeseries_data(data),(one_var.cljs$core$IFn$_invoke$arity$1 ? one_var.cljs$core$IFn$_invoke$arity$1(app.biomarker_data.data) : one_var.call(null,app.biomarker_data.data))),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1((one_var.cljs$core$IFn$_invoke$arity$1 ? one_var.cljs$core$IFn$_invoke$arity$1(app.biomarker_data.data) : one_var.call(null,app.biomarker_data.data)))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Source: ",new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1((one_var.cljs$core$IFn$_invoke$arity$1 ? one_var.cljs$core$IFn$_invoke$arity$1(app.biomarker_data.data) : one_var.call(null,app.biomarker_data.data)))], null)], null):"No data found for this metric.")], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Correlate"], null),(function (){var iter__4652__auto__ = (function app$single_var_table$make_hiccup_$_iter__57187(s__57188){
return (new cljs.core.LazySeq(null,(function (){
var s__57188__$1 = s__57188;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__57188__$1);
if(temp__5753__auto__){
var s__57188__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__57188__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__57188__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__57190 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__57189 = (0);
while(true){
if((i__57189 < size__4651__auto__)){
var k = cljs.core._nth(c__4650__auto__,i__57189);
cljs.core.chunk_append(b__57190,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(k),"-head"].join('')], null),k], null));

var G__57270 = (i__57189 + (1));
i__57189 = G__57270;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57190),app$single_var_table$make_hiccup_$_iter__57187(cljs.core.chunk_rest(s__57188__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57190),null);
}
} else {
var k = cljs.core.first(s__57188__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(k),"-head"].join('')], null),k], null),app$single_var_table$make_hiccup_$_iter__57187(cljs.core.rest(s__57188__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.keys((function (p1__57180_SHARP_){
return cljs.core.select_keys(p1__57180_SHARP_,app.single_var_table.table_keys);
})(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword(null,"correlations","correlations",517036229).cljs$core$IFn$_invoke$arity$1(data))))));
})()], null),(function (){var iter__4652__auto__ = (function app$single_var_table$make_hiccup_$_iter__57197(s__57198){
return (new cljs.core.LazySeq(null,(function (){
var s__57198__$1 = s__57198;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__57198__$1);
if(temp__5753__auto__){
var s__57198__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__57198__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__57198__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__57200 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__57199 = (0);
while(true){
if((i__57199 < size__4651__auto__)){
var correlations = cljs.core._nth(c__4650__auto__,i__57199);
cljs.core.chunk_append(b__57200,(function (){var mvar = cljs.core.name(new cljs.core.Keyword(null,"many-var","many-var",1186068059).cljs$core$IFn$_invoke$arity$1(correlations));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[mvar,"-row"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.ui.hover_to_render,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),["#",mvar].join('')], null),mvar], null),new cljs.core.Keyword(null,"scatterplot","scatterplot",2135008985).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(correlations))], null)], null),(function (){var iter__4652__auto__ = ((function (i__57199,mvar,correlations,c__4650__auto__,size__4651__auto__,b__57200,s__57198__$2,temp__5753__auto__,one_var){
return (function app$single_var_table$make_hiccup_$_iter__57197_$_iter__57201(s__57202){
return (new cljs.core.LazySeq(null,((function (i__57199,mvar,correlations,c__4650__auto__,size__4651__auto__,b__57200,s__57198__$2,temp__5753__auto__,one_var){
return (function (){
var s__57202__$1 = s__57202;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__57202__$1);
if(temp__5753__auto____$1){
var s__57202__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__57202__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__57202__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__57204 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__57203 = (0);
while(true){
if((i__57203 < size__4651__auto____$1)){
var vec__57207 = cljs.core._nth(c__4650__auto____$1,i__57203);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57207,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57207,(1),null);
cljs.core.chunk_append(b__57204,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[mvar,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join('')], null),v], null));

var G__57275 = (i__57203 + (1));
i__57203 = G__57275;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57204),app$single_var_table$make_hiccup_$_iter__57197_$_iter__57201(cljs.core.chunk_rest(s__57202__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57204),null);
}
} else {
var vec__57210 = cljs.core.first(s__57202__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57210,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57210,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[mvar,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join('')], null),v], null),app$single_var_table$make_hiccup_$_iter__57197_$_iter__57201(cljs.core.rest(s__57202__$2)));
}
} else {
return null;
}
break;
}
});})(i__57199,mvar,correlations,c__4650__auto__,size__4651__auto__,b__57200,s__57198__$2,temp__5753__auto__,one_var))
,null,null));
});})(i__57199,mvar,correlations,c__4650__auto__,size__4651__auto__,b__57200,s__57198__$2,temp__5753__auto__,one_var))
;
return iter__4652__auto__(cljs.core.select_keys(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(correlations),app.single_var_table.table_keys));
})()], null);
})());

var G__57279 = (i__57199 + (1));
i__57199 = G__57279;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57200),app$single_var_table$make_hiccup_$_iter__57197(cljs.core.chunk_rest(s__57198__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57200),null);
}
} else {
var correlations = cljs.core.first(s__57198__$2);
return cljs.core.cons((function (){var mvar = cljs.core.name(new cljs.core.Keyword(null,"many-var","many-var",1186068059).cljs$core$IFn$_invoke$arity$1(correlations));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[mvar,"-row"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.ui.hover_to_render,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),["#",mvar].join('')], null),mvar], null),new cljs.core.Keyword(null,"scatterplot","scatterplot",2135008985).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(correlations))], null)], null),(function (){var iter__4652__auto__ = ((function (mvar,correlations,s__57198__$2,temp__5753__auto__,one_var){
return (function app$single_var_table$make_hiccup_$_iter__57197_$_iter__57215(s__57216){
return (new cljs.core.LazySeq(null,(function (){
var s__57216__$1 = s__57216;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__57216__$1);
if(temp__5753__auto____$1){
var s__57216__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__57216__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__57216__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__57218 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__57217 = (0);
while(true){
if((i__57217 < size__4651__auto__)){
var vec__57220 = cljs.core._nth(c__4650__auto__,i__57217);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57220,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57220,(1),null);
cljs.core.chunk_append(b__57218,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[mvar,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join('')], null),v], null));

var G__57283 = (i__57217 + (1));
i__57217 = G__57283;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__57218),app$single_var_table$make_hiccup_$_iter__57197_$_iter__57215(cljs.core.chunk_rest(s__57216__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__57218),null);
}
} else {
var vec__57223 = cljs.core.first(s__57216__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57223,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57223,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[mvar,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join('')], null),v], null),app$single_var_table$make_hiccup_$_iter__57197_$_iter__57215(cljs.core.rest(s__57216__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(mvar,correlations,s__57198__$2,temp__5753__auto__,one_var))
;
return iter__4652__auto__(cljs.core.select_keys(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(correlations),app.single_var_table.table_keys));
})()], null);
})(),app$single_var_table$make_hiccup_$_iter__57197(cljs.core.rest(s__57198__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2((function (p1__57181_SHARP_){
return new cljs.core.Keyword(null,"correlation","correlation",-975773207).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(p1__57181_SHARP_));
}),new cljs.core.Keyword(null,"correlations","correlations",517036229).cljs$core$IFn$_invoke$arity$1(data)));
})()], null)], null)], null);
});

//# sourceMappingURL=app.single_var_table.js.map
