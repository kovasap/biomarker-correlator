goog.provide('app.stats');
app.stats.compute_linear_estimate = (function app$stats$compute_linear_estimate(model,input){
var params = kixi.stats.protocols.parameters(model);
var offset = cljs.core.first(params);
var slope = cljs.core.last(params);
return (offset + (slope * input));
});
/**
 * To compute r-squared, we need to compare each value in data for var2
 *   to the value we would expected to get for var2 if we plugged var1
 *   into our linear model (computed by kixi/simple-linear-regression)
 *   To do this, we need to pass in to kixi/r-squared: 
 *  1. a function that takes in a data entry, plugs var1 into the linear
 *     model, and returns the var2 value according to the model
 *  2. a function that takes in a data entry and returns the actual
 *     var2 value
 */
app.stats.calc_rsq = (function app$stats$calc_rsq(linear_model,var1,var2,data){
if((linear_model == null)){
return null;
} else {
return cljs.core.transduce.cljs$core$IFn$_invoke$arity$3(cljs.core.identity,kixi.stats.core.r_squared((function (p1__45135_SHARP_){
return app.stats.compute_linear_estimate(linear_model,(var1.cljs$core$IFn$_invoke$arity$1 ? var1.cljs$core$IFn$_invoke$arity$1(p1__45135_SHARP_) : var1.call(null,p1__45135_SHARP_)));
}),var2),data);
}
});
/**
 * Remove maps from data (collection of maps) for which any of the given keys
 *   are not present or have nil values.
 */
app.stats.filter_missing = (function app$stats$filter_missing(var_args){
var args__4870__auto__ = [];
var len__4864__auto___45161 = arguments.length;
var i__4865__auto___45162 = (0);
while(true){
if((i__4865__auto___45162 < len__4864__auto___45161)){
args__4870__auto__.push((arguments[i__4865__auto___45162]));

var G__45163 = (i__4865__auto___45162 + (1));
i__4865__auto___45162 = G__45163;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return app.stats.filter_missing.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(app.stats.filter_missing.cljs$core$IFn$_invoke$arity$variadic = (function (data,ks){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (datum){
return cljs.core.every_QMARK_((function (p1__45137_SHARP_){
return cljs.core.not(isNaN((p1__45137_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__45137_SHARP_.cljs$core$IFn$_invoke$arity$1(datum) : p1__45137_SHARP_.call(null,datum))));
}),ks);
}),data);
}));

(app.stats.filter_missing.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(app.stats.filter_missing.cljs$lang$applyTo = (function (seq45144){
var G__45145 = cljs.core.first(seq45144);
var seq45144__$1 = cljs.core.next(seq45144);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__45145,seq45144__$1);
}));

app.stats.round = (function app$stats$round(n){
return (Math.round(((1000) * (n + Number.EPSILON))) / (1000));
});
/**
 * Gets a correlation between the two given vars in the data.
 *   
 *   See discussion at https://github.com/MastodonC/kixi.stats/issues/40 for some
 *   more context
 */
app.stats.get_correlation_with_pval = (function app$stats$get_correlation_with_pval(data,var1,var2){
var r = cljs.core.transduce.cljs$core$IFn$_invoke$arity$3(cljs.core.identity,kixi.stats.core.correlation(var1,var2),data);
var degrees_of_freedom = (cljs.core.count(data) - (2));
var t_stat = ((r * kixi.stats.math.sqrt(degrees_of_freedom)) / kixi.stats.math.sqrt(((1) - kixi.stats.math.sq(r))));
var t_test = kixi.stats.test.test_result.cljs$core$IFn$_invoke$arity$2(t_stat,kixi.stats.distribution.t(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"v","v",21465059),degrees_of_freedom], null)));
var p_val = (kixi.stats.test.p_value.cljs$core$IFn$_invoke$arity$1 ? kixi.stats.test.p_value.cljs$core$IFn$_invoke$arity$1(t_test) : kixi.stats.test.p_value.call(null,t_test));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"correlation","correlation",-975773207),r,new cljs.core.Keyword(null,"p-value","p-value",1434023819),p_val], null);
});
app.stats.get_plot_scale = (function app$stats$get_plot_scale(variable,data){
var var_data = cljs.core.map.cljs$core$IFn$_invoke$arity$2(variable,data);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"domain","domain",1847214937),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,var_data),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,var_data)], null)], null);
});
app.stats.calc_correlation = (function app$stats$calc_correlation(var1,var2,data){
var cleaned_data = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__45157_SHARP_){
return cljs.core.select_keys(p1__45157_SHARP_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),var1,var2], null));
}),app.stats.filter_missing.cljs$core$IFn$_invoke$arity$variadic(data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([var1,var2], 0)));
var linear_result = cljs.core.transduce.cljs$core$IFn$_invoke$arity$3(cljs.core.identity,kixi.stats.core.simple_linear_regression(var1,var2),cleaned_data);
var correlation_result = app.stats.get_correlation_with_pval(cleaned_data,var1,var2);
var error = cljs.core.transduce.cljs$core$IFn$_invoke$arity$3(cljs.core.identity,kixi.stats.core.regression_standard_error.cljs$core$IFn$_invoke$arity$2(var1,var2),cleaned_data);
var rsq = app.stats.calc_rsq(linear_result,var1,var2,cleaned_data);
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"linear-slope","linear-slope",-1466839595),app.stats.round((((linear_result == null))?null:cljs.core.last(kixi.stats.protocols.parameters(linear_result)))),new cljs.core.Keyword(null,"linear-r-squared","linear-r-squared",565831642),app.stats.round(rsq),new cljs.core.Keyword(null,"vega-scatterplot","vega-scatterplot",-654239060),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [oz.core.vega_lite,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"values","values",372645556),cleaned_data], null),new cljs.core.Keyword(null,"width","width",-384071477),(300),new cljs.core.Keyword(null,"height","height",1025178622),(300),new cljs.core.Keyword(null,"mark","mark",-373816345),"circle",new cljs.core.Keyword(null,"encoding","encoding",1728578272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),var1,new cljs.core.Keyword(null,"scale","scale",-230427353),app.stats.get_plot_scale(var1,data),new cljs.core.Keyword(null,"type","type",1174270348),"quantitative"], null),new cljs.core.Keyword(null,"y","y",-1757859776),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),var2,new cljs.core.Keyword(null,"scale","scale",-230427353),app.stats.get_plot_scale(var2,data),new cljs.core.Keyword(null,"type","type",1174270348),"quantitative"], null),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"timestamp","timestamp",579478971),new cljs.core.Keyword(null,"scale","scale",-230427353),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"time",new cljs.core.Keyword(null,"scheme","scheme",90199613),"viridis"], null)], null)], null)], null)], null),new cljs.core.Keyword(null,"correlation","correlation",-975773207),app.stats.round(new cljs.core.Keyword(null,"correlation","correlation",-975773207).cljs$core$IFn$_invoke$arity$1(correlation_result)),new cljs.core.Keyword(null,"correlation-p-value","correlation-p-value",147752757),app.stats.round(new cljs.core.Keyword(null,"p-value","p-value",1434023819).cljs$core$IFn$_invoke$arity$1(correlation_result)),new cljs.core.Keyword(null,"datapoints","datapoints",-1250577876),cljs.core.count(cleaned_data)], null);
});

//# sourceMappingURL=app.stats.js.map
