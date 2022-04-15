goog.provide('app.comparison_matrix_table');
app.comparison_matrix_table._build__key = (function app$comparison_matrix_table$_build__key(m,suffix){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("--",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(new cljs.core.Keyword(null,"biomarker","biomarker",-1934144816).cljs$core$IFn$_invoke$arity$1(m)),suffix], null)));
});
/**
 * Converts {:input :i :biomarker :b :results {:slope 5.0}} to
 *   {:input :i :b--slope 5.0}
 * 
 *   Also adds blank columns like :b--blank that add spacing between each
 *   biomarker in the final visualizations.
 *   
 */
app.comparison_matrix_table.get_flat_biomarker_result_keys = (function app$comparison_matrix_table$get_flat_biomarker_result_keys(filter_func,m){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.createAsIfByAssoc([new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.Keyword(null,"input","input",556931961).cljs$core$IFn$_invoke$arity$1(m),app.comparison_matrix_table._build__key(m,"blank"),""]),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4652__auto__ = (function app$comparison_matrix_table$get_flat_biomarker_result_keys_$_iter__40775(s__40776){
return (new cljs.core.LazySeq(null,(function (){
var s__40776__$1 = s__40776;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__40776__$1);
if(temp__5753__auto__){
var s__40776__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40776__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__40776__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__40780 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__40779 = (0);
while(true){
if((i__40779 < size__4651__auto__)){
var vec__40786 = cljs.core._nth(c__4650__auto__,i__40779);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40786,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40786,(1),null);
if(cljs.core.truth_((filter_func.cljs$core$IFn$_invoke$arity$1 ? filter_func.cljs$core$IFn$_invoke$arity$1(k) : filter_func.call(null,k)))){
cljs.core.chunk_append(b__40780,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.comparison_matrix_table._build__key(m,cljs.core.name(k)),v], null));

var G__40839 = (i__40779 + (1));
i__40779 = G__40839;
continue;
} else {
var G__40841 = (i__40779 + (1));
i__40779 = G__40841;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40780),app$comparison_matrix_table$get_flat_biomarker_result_keys_$_iter__40775(cljs.core.chunk_rest(s__40776__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40780),null);
}
} else {
var vec__40789 = cljs.core.first(s__40776__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40789,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40789,(1),null);
if(cljs.core.truth_((filter_func.cljs$core$IFn$_invoke$arity$1 ? filter_func.cljs$core$IFn$_invoke$arity$1(k) : filter_func.call(null,k)))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.comparison_matrix_table._build__key(m,cljs.core.name(k)),v], null),app$comparison_matrix_table$get_flat_biomarker_result_keys_$_iter__40775(cljs.core.rest(s__40776__$2)));
} else {
var G__40847 = cljs.core.rest(s__40776__$2);
s__40776__$1 = G__40847;
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
return iter__4652__auto__(new cljs.core.Keyword(null,"regression-results","regression-results",224318376).cljs$core$IFn$_invoke$arity$1(m));
})()));
});
app.comparison_matrix_table.make_per_input_row = (function app$comparison_matrix_table$make_per_input_row(same_input_results,regression_result_key_filter){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(app.comparison_matrix_table.get_flat_biomarker_result_keys,regression_result_key_filter),same_input_results));
});
app.comparison_matrix_table.add_aggregates = (function app$comparison_matrix_table$add_aggregates(input_significant_correlations,flat_map){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([flat_map,new cljs.core.Keyword(null,"aggregates","aggregates",-1684250289).cljs$core$IFn$_invoke$arity$1((function (){var fexpr__40796 = new cljs.core.Keyword(null,"input","input",556931961).cljs$core$IFn$_invoke$arity$1(flat_map);
return (fexpr__40796.cljs$core$IFn$_invoke$arity$1 ? fexpr__40796.cljs$core$IFn$_invoke$arity$1(input_significant_correlations) : fexpr__40796.call(null,input_significant_correlations));
})())], 0));
});
/**
 * Column names should be sorted in the order signified by these substrings.
 */
app.comparison_matrix_table.column_element_ordering = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["correlation","p-value","datapoints"], null);
app.comparison_matrix_table.get_column_element_order_key = (function app$comparison_matrix_table$get_column_element_order_key(string){
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__40797_SHARP_){
return (!((p1__40797_SHARP_ == null)));
}),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (index,element){
if(clojure.string.includes_QMARK_(string,element)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(index),cljs.core.str.cljs$core$IFn$_invoke$arity$1(string)].join('');
} else {
return null;
}
}),app.comparison_matrix_table.column_element_ordering)));
});
app.comparison_matrix_table.column_name_compare_key = (function app$comparison_matrix_table$column_name_compare_key(col_keyword){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"input","input",556931961),col_keyword)){
return "AAAA";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"score","score",-1963588780),col_keyword)){
return "AAAB";
} else {
if(clojure.string.includes_QMARK_(cljs.core.name(col_keyword),"--")){
var vec__40798 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(col_keyword),/--/);
var col_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40798,(0),null);
var data_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40798,(1),null);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(col_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(app.comparison_matrix_table.get_column_element_order_key(data_type))].join('');
} else {
return cljs.core.name(col_keyword);

}
}
}
});
/**
 * Comparison function for two names to be used when making a sorted-map-by.
 *   
 *   NOTE THAT the sorted-map-by requires UNIQUE comparison keys for distinct
 *   items. If one item has the same comparison key as another only one item will
 *   appear in the final map (seemly arbitrarily chosen)!
 */
app.comparison_matrix_table.compare_column_names = (function app$comparison_matrix_table$compare_column_names(name1,name2){
return cljs.core.compare(app.comparison_matrix_table.column_name_compare_key(name1),app.comparison_matrix_table.column_name_compare_key(name2));
});
app.comparison_matrix_table.make_comparison_matrix_data = (function app$comparison_matrix_table$make_comparison_matrix_data(results,input_significant_correlations,p_values_rounded_QMARK_){
var per_input_rows = cljs.core.vals(cljs.core.group_by(new cljs.core.Keyword(null,"input","input",556931961),results));
var p_value_filter = (function (p1__40807_SHARP_){
if(cljs.core.truth_(cljs.core.deref(p_values_rounded_QMARK_))){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__40807_SHARP_,new cljs.core.Keyword(null,"p-value","p-value",1434023819));
} else {
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__40807_SHARP_,new cljs.core.Keyword(null,"rounded-p-value","rounded-p-value",1372746415));
}
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (row){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map_by(app.comparison_matrix_table.compare_column_names),app.comparison_matrix_table.add_aggregates(input_significant_correlations,app.comparison_matrix_table.make_per_input_row(row,p_value_filter)));
}),per_input_rows);
});
/**
 * Generates a react-data-grid column 
 *   https://github.com/adazzle/react-data-grid/blob/929911c506919e96bd12e48ea5de68ec9511ca10/src/types.ts#L7
 */
app.comparison_matrix_table.make_datagrid_column = (function app$comparison_matrix_table$make_datagrid_column(k){
var vec__40810 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(k),/\-\-/);
var biomarker = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40810,(0),null);
var stat = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40810,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cellClass","cellClass",-262516937),(function (row){
var clj_row = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(row,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
var pval_key = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("--",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [biomarker,"p-value"], null)));
if(((pval_key.cljs$core$IFn$_invoke$arity$1 ? pval_key.cljs$core$IFn$_invoke$arity$1(clj_row) : pval_key.call(null,clj_row)) == null)){
return "";
} else {
if(((pval_key.cljs$core$IFn$_invoke$arity$1 ? pval_key.cljs$core$IFn$_invoke$arity$1(clj_row) : pval_key.call(null,clj_row)) < app.stats.p_value_cutoff)){
return "";
} else {
return "has-text-grey-lighter";

}
}
}),new cljs.core.Keyword(null,"frozen","frozen",-1824610372),((cljs.core.contains_QMARK_(clojure.set.union.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"input","input",556931961),null], null), null),app.single_var_table.aggregate_names),k))?true:false)], null);
});

//# sourceMappingURL=app.comparison_matrix_table.js.map
