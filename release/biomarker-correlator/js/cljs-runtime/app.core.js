goog.provide('app.core');
/**
 * Gets all variables (csv columns) from parsed csv maps besides the date.
 */
app.core.get_vars = (function app$core$get_vars(data){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__48376_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__48376_SHARP_,new cljs.core.Keyword(null,"date","date",-1463434462));
}),cljs.core.keys(cljs.core.first(data)));
});
/**
 * Converts map like {:input :hi :results {:slope 50}} to
 *   {:input :hi :slope 50}
 */
app.core.flatten_map = (function app$core$flatten_map(data){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map_by(cljs.core._LT_),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__48377_SHARP_){
return ((cljs.core.vector_QMARK_(p1__48377_SHARP_)) && ((!(cljs.core.map_QMARK_(cljs.core.last(p1__48377_SHARP_))))));
}),cljs.core.tree_seq(cljs.core.associative_QMARK_,cljs.core.seq,data)));
});
app.core.home_page = (function app$core$home_page(){
var aggregation_granularity = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"2-month","2-month",-1264344631));
var p_values_rounded_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return (function (){
var map__48380 = cljs.core.deref(app.csv.csv_data);
var map__48380__$1 = cljs.core.__destructure_map(map__48380);
var input_file_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48380__$1,new cljs.core.Keyword(null,"input-file-name","input-file-name",-1886577211));
var biomarker_file_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48380__$1,new cljs.core.Keyword(null,"biomarker-file-name","biomarker-file-name",1322694478));
var input_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48380__$1,new cljs.core.Keyword(null,"input-data","input-data",2052925403));
var biomarker_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48380__$1,new cljs.core.Keyword(null,"biomarker-data","biomarker-data",-1785875135));
var inputs = app.core.get_vars(input_data);
var biomarkers = app.core.get_vars(biomarker_data);
var data_by_aggregates = app.csv_data_processing.aggregate_data(app.csv_data_processing.process_csv_data.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([input_data,biomarker_data], 0)),cljs.core.deref(aggregation_granularity),app.math.average);
var aggregates = cljs.core.keys(data_by_aggregates);
var processed_data = cljs.core.vals(data_by_aggregates);
var pairwise_correlations = app.stats.compute_correlations(inputs,biomarkers,processed_data);
var input_correlations = app.single_var_table.make_all_correlations(pairwise_correlations,processed_data,new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.Keyword(null,"biomarker","biomarker",-1934144816));
var biomarker_correlations = app.single_var_table.make_all_correlations(pairwise_correlations,processed_data,new cljs.core.Keyword(null,"biomarker","biomarker",-1934144816),new cljs.core.Keyword(null,"input","input",556931961));
var pairwise_correlations_for_table = app.stats.enliten(pairwise_correlations);
var flat_results = cljs.core.map.cljs$core$IFn$_invoke$arity$2(app.core.flatten_map,pairwise_correlations_for_table);
var flat_results_atom = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(flat_results);
return cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"div.app.content","div.app.content",2048228731),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.title","h1.title",-2139952071),"Biomarker Correlator"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"This application calculates cross correlations between inputs and\n        biomarkers in an attempt to identify statistically significant\n        correlations. "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Despite presenting like a website, there is no server\n        behind this app that data is sent to for analysis; everything is done\n        client side in the browser. Therefore, the page can be saved and run\n        offline as needed."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Data Ingestion"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Google Drive Integration"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Once signed in and authorized, this application will search through\n        your Google Drive, find a folder named \"biomarker-correlator\", and then\n        process the files within that folder. Any CSV files with \"inputs\" in\n        the name will be treated as the input data files and any with \"biomarkers\"\n        in the name will be treated as the biomarker data files."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"If you are getting permissions issues, note that you need to be\n        whitelisted as this app is currently not verified with Google. Please\n        contact kovas[dot]palunas[at]gmail.com if you want to be whitelisted."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"authorize_button",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null)], null),"Authorize"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"signout_button",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null)], null),"Sign Out"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return app.google_drive.populate_data_BANG_();
})], null),"Fetch Google Drive Data"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),"Found files ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.google_drive.found_files))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"CSV"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.topbar.hidden-print","div.topbar.hidden-print",-603265413),"\"Upload\" input data",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.csv.upload_btn,input_file_name,app.csv.input_upload_reqs], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.topbar.hidden-print","div.topbar.hidden-print",-603265413),"\"Upload\" biomarker data",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.csv.upload_btn,biomarker_file_name,app.csv.biomarker_upload_reqs], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Input validation: ",app.csv_data_processing.get_validation_string(input_data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Biomarker validation: ",app.csv_data_processing.get_validation_string(biomarker_data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Cross data validation: ",app.csv_data_processing.get_all_data_validation_string.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([input_data,biomarker_data], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Aggregation"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"If your input data is not already aggregated to your desired time\n        granularity you can aggregate it here. This is necessary if for example\n        you have exact timings for all your measurements, but would like to\n        correlate them to each other based on the windows of time they fall\n        into."], null),(function (){var iter__4652__auto__ = (function app$core$home_page_$_iter__48381(s__48382){
return (new cljs.core.LazySeq(null,(function (){
var s__48382__$1 = s__48382;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__48382__$1);
if(temp__5753__auto__){
var s__48382__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__48382__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__48382__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__48384 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__48383 = (0);
while(true){
if((i__48383 < size__4651__auto__)){
var period_type = cljs.core._nth(c__4650__auto__,i__48383);
cljs.core.chunk_append(b__48384,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),period_type], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"radio","radio",1323726374),new cljs.core.Keyword(null,"name","name",1843675177),"period-type",new cljs.core.Keyword(null,"id","id",-1388402092),period_type,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__48383,period_type,c__4650__auto__,size__4651__auto__,b__48384,s__48382__$2,temp__5753__auto__,map__48380,map__48380__$1,input_file_name,biomarker_file_name,input_data,biomarker_data,inputs,biomarkers,data_by_aggregates,aggregates,processed_data,pairwise_correlations,input_correlations,biomarker_correlations,pairwise_correlations_for_table,flat_results,flat_results_atom,aggregation_granularity,p_values_rounded_QMARK_){
return (function (p1__48378_SHARP_){
return cljs.core.reset_BANG_(aggregation_granularity,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__48378_SHARP_.target.id));
});})(i__48383,period_type,c__4650__auto__,size__4651__auto__,b__48384,s__48382__$2,temp__5753__auto__,map__48380,map__48380__$1,input_file_name,biomarker_file_name,input_data,biomarker_data,inputs,biomarkers,data_by_aggregates,aggregates,processed_data,pairwise_correlations,input_correlations,biomarker_correlations,pairwise_correlations_for_table,flat_results,flat_results_atom,aggregation_granularity,p_values_rounded_QMARK_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"for","for",-1323786319),period_type], null),cljs.core.name(period_type)], null)], null));

var G__48830 = (i__48383 + (1));
i__48383 = G__48830;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48384),app$core$home_page_$_iter__48381(cljs.core.chunk_rest(s__48382__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48384),null);
}
} else {
var period_type = cljs.core.first(s__48382__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),period_type], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"radio","radio",1323726374),new cljs.core.Keyword(null,"name","name",1843675177),"period-type",new cljs.core.Keyword(null,"id","id",-1388402092),period_type,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (period_type,s__48382__$2,temp__5753__auto__,map__48380,map__48380__$1,input_file_name,biomarker_file_name,input_data,biomarker_data,inputs,biomarkers,data_by_aggregates,aggregates,processed_data,pairwise_correlations,input_correlations,biomarker_correlations,pairwise_correlations_for_table,flat_results,flat_results_atom,aggregation_granularity,p_values_rounded_QMARK_){
return (function (p1__48378_SHARP_){
return cljs.core.reset_BANG_(aggregation_granularity,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__48378_SHARP_.target.id));
});})(period_type,s__48382__$2,temp__5753__auto__,map__48380,map__48380__$1,input_file_name,biomarker_file_name,input_data,biomarker_data,inputs,biomarkers,data_by_aggregates,aggregates,processed_data,pairwise_correlations,input_correlations,biomarker_correlations,pairwise_correlations_for_table,flat_results,flat_results_atom,aggregation_granularity,p_values_rounded_QMARK_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"for","for",-1323786319),period_type], null),cljs.core.name(period_type)], null)], null),app$core$home_page_$_iter__48381(cljs.core.rest(s__48382__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.rest(app.time.PeriodIdTypes));
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"These aggregate periods were found and are being used:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",aggregates)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Note that ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),"<date>-to-<date>"], null)," syntax in the input\n          files will just take the first date at the time point and ignore\n          the second!"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Per-Input Table"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Not statistically significant results are displayed with greyed-out\n        text.  The score for each input is calculated as the number of\n        statistically significant correlations that are positive, minus the number\n        that are negative.  We need a spreadsheet (or something built in to the\n        app) that determines for each biomarker whether up is good or bad with\n        respect to calculating the score."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.Keyword(null,"p-values-rounded?","p-values-rounded?",-1239433302)], null),"Round p-values?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"checkbox","checkbox",1612615655),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"p-values-rounded?","p-values-rounded?",-1239433302),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__48379_SHARP_){
return cljs.core.reset_BANG_(p_values_rounded_QMARK_,p1__48379_SHARP_.target.checked);
}),new cljs.core.Keyword(null,"value","value",305978217),true,new cljs.core.Keyword(null,"defaultChecked","defaultChecked",-834047344),true], null)], null),app.ui.maps_to_datagrid.cljs$core$IFn$_invoke$arity$variadic(app.comparison_matrix_table.make_comparison_matrix_data(pairwise_correlations_for_table,input_correlations,p_values_rounded_QMARK_),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"custom-make-datagrid-column","custom-make-datagrid-column",1791443794),app.comparison_matrix_table.make_datagrid_column], 0)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Pairwise Table"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.ui.hideable,app.ui.maps_to_datagrid(flat_results)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Significant Correlations"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Input Correlations"], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null),(function (){var iter__4652__auto__ = (function app$core$home_page_$_iter__48387(s__48388){
return (new cljs.core.LazySeq(null,(function (){
var s__48388__$1 = s__48388;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__48388__$1);
if(temp__5753__auto__){
var s__48388__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__48388__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__48388__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__48390 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__48389 = (0);
while(true){
if((i__48389 < size__4651__auto__)){
var sig_correlations = cljs.core._nth(c__4650__auto__,i__48389);
cljs.core.chunk_append(b__48390,app.single_var_table.make_hiccup(sig_correlations));

var G__48832 = (i__48389 + (1));
i__48389 = G__48832;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48390),app$core$home_page_$_iter__48387(cljs.core.chunk_rest(s__48388__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48390),null);
}
} else {
var sig_correlations = cljs.core.first(s__48388__$2);
return cljs.core.cons(app.single_var_table.make_hiccup(sig_correlations),app$core$home_page_$_iter__48387(cljs.core.rest(s__48388__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.vals(input_correlations));
})()),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Biomarker Correlations"], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null),(function (){var iter__4652__auto__ = (function app$core$home_page_$_iter__48393(s__48394){
return (new cljs.core.LazySeq(null,(function (){
var s__48394__$1 = s__48394;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__48394__$1);
if(temp__5753__auto__){
var s__48394__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__48394__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__48394__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__48396 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__48395 = (0);
while(true){
if((i__48395 < size__4651__auto__)){
var sig_correlations = cljs.core._nth(c__4650__auto__,i__48395);
cljs.core.chunk_append(b__48396,app.single_var_table.make_hiccup(sig_correlations));

var G__48833 = (i__48395 + (1));
i__48395 = G__48833;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48396),app$core$home_page_$_iter__48393(cljs.core.chunk_rest(s__48394__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48396),null);
}
} else {
var sig_correlations = cljs.core.first(s__48394__$2);
return cljs.core.cons(app.single_var_table.make_hiccup(sig_correlations),app$core$home_page_$_iter__48393(cljs.core.rest(s__48394__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.vals(biomarker_correlations));
})())], null)], true);
});
});
app.core.mount_root = (function app$core$mount_root(){
reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [app.core.home_page], null),document.getElementById("app"));

return handleClientLoad();
});
app.core.refresh = (function app$core$refresh(){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Hot code Remount"], 0));

cljs.core.filterv(cljs.core.some_QMARK_,cljs.core.PersistentVector.fromArray([(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));
}));

(app.time.parse_date_range = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));

return new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));
}));

(app.time.date_to_timestamp = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));

return new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));
}));

(app.time.map_to_timestamp = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));

return new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));
}));

(app.time.parse_date = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));

return new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));
}));

(app.time.group_by_period = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));

return new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));
}));

(app.time.get_period_id = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));

return new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));
}));

(app.math.average = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));

return new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));
}));

(app.single_var_table.get_csv_values = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));

return new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));
}));

(app.single_var_table.get_one_var_timeseries_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));

return new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));
}));

(app.single_var_table.make_all_correlations = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));

return new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));
}));

(app.single_var_table.calc_counted_score = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));

return new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));
}));

(app.single_var_table.make_hiccup = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));

return new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));
}));

(app.single_var_table.get_significant_correlations = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));

return new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));
}));

(app.csv_data_processing.process_csv_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));

return new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));
}));

(app.csv_data_processing.add_timestamps = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));

return new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));
}));

(app.csv_data_processing.merge_rows_using_dates = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));

return new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));
}));

(app.csv_data_processing.combine_rows = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));

return new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));
}));

(app.csv_data_processing.aggregate_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));

return new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));
}));

(app.csv_data_processing.floatify_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));

return new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));
}));

(app.csv_data_processing.get_validation_string = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));

return new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));
}));

(app.csv_data_processing.get_all_data_validation_string = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));

return new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));
}));

(app.biomarker_data.get_var_name = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));

return new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));
}));

(app.biomarker_data.add_hrs = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));

return new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));
}));

(app.biomarker_data.make_acm_plot = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));

return new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));
}));

(app.csv._standardize_keys = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));

return new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));
}));

(app.ui.maps_to_html = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));

return new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));
}));

(app.stats.clean_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));

return new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));
}));

(app.stats.compute_correlations = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));

return new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));
}));

(app.stats.enliten = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));

return new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));
}));

(app.stats.calc_correlation = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));

return new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));
}));

(app.specs.make_hiccup = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));

return new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));
}));

(app.core.get_vars = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));

return new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));
}));

(app.comparison_matrix_table.make_comparison_matrix_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));

return new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));
}));

(app.comparison_matrix_table.add_aggregates = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));

return new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));
}));

(app.comparison_matrix_table.get_flat_biomarker_result_keys = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));

return new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null);
} else {
return null;
}
})()], true));

cljs.core.PersistentHashSet.createAsIfByAssoc([(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.specs","app.specs",384021979,null),new cljs.core.Symbol(null,"make-hiccup","make-hiccup",-2040101156,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"string","string",-1989541586)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"string","string",-1989541586)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.ui","app.ui",-1105541323,null),new cljs.core.Symbol(null,"maps-to-html","maps-to-html",-541539065,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-hiccup","make-hiccup",-2040101156,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates a table like this:\n           Input\n        Aggregate 1\n        Aggregate 2\n  Biomarker | r | p | n\n  data      | 0 | 0 | 0\n  ...\n  ",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.Symbol("specs","ReagentComponent","specs/ReagentComponent",-1072943109,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.specs.ReagentComponent], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.specs.ReagentComponent], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.comparison-matrix-table","app.comparison-matrix-table",990026492,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-flat-biomarker-result-keys","get-flat-biomarker-result-keys",-2049940581,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"filter-func","filter-func",1579225169,null),new cljs.core.Symbol(null,"m","m",-1021758608,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Converts {:input :i :biomarker :b :results {:slope 5.0}} to\n  {:input :i :b--slope 5.0}\n\n  Also adds blank columns like :b--blank that add spacing between each\n  biomarker in the final visualizations.\n  ",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"clean-data","clean-data",-1052461118,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairedData], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairedData], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.core","app.core",1762291291,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-vars","get-vars",-205083548,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Gets all variables (csv columns) from parsed csv maps besides the date.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Symbol("proc","DatedRow","proc/DatedRow",-311652020,null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"calc-counted-score","calc-counted-score",1920949326,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"correlations","correlations",-2137399540,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Sums up all postive correlations and all negatives correlations, then takes\n  the difference.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),new cljs.core.Symbol("stats","PairwiseCorrelations","stats/PairwiseCorrelations",2133201729,null)], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"date-to-timestamp","date-to-timestamp",2065727848,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.Timestamp], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.Timestamp], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"get-period-id","get-period-id",-1355761507,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Timestamp,app.time.PeriodIdTypes], null),new cljs.core.Keyword(null,"string","string",-1989541586)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Timestamp,app.time.PeriodIdTypes], null),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-significant-correlations","get-significant-correlations",-525312292,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"one-var-type","one-var-type",-412397558,null),new cljs.core.Symbol(null,"one-var","one-var",1705805095,null),new cljs.core.Symbol(null,"many-var-type","many-var-type",578410339,null),new cljs.core.Symbol(null,"one-var-raw-data","one-var-raw-data",555715652,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol("stats","PairwiseCorrelations","stats/PairwiseCorrelations",2133201729,null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),app.single_var_table.OneToManyCorrelation], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.biomarker-data","app.biomarker-data",420683242,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-acm-plot","make-acm-plot",-196269751,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"personal-data","personal-data",60654159,null),new cljs.core.Symbol(null,"bio-data","bio-data",1842952455,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"TimeseriesData","TimeseriesData",-31656625,null),new cljs.core.Symbol(null,"BiomarkerData","BiomarkerData",1377791739,null)], null),new cljs.core.Symbol("specs","ReagentComponent","specs/ReagentComponent",-1072943109,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,app.biomarker_data.BiomarkerData], null),app.specs.ReagentComponent], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,app.biomarker_data.BiomarkerData], null),app.specs.ReagentComponent], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"calc-correlation","calc-correlation",-1536134913,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.CorrelationResults], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.CorrelationResults], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.math","app.math",-1829237435,null),new cljs.core.Symbol(null,"average","average",1148175359,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.biomarker-data","app.biomarker-data",420683242,null),cljs.core.with_meta(new cljs.core.Symbol(null,"add-hrs","add-hrs",-806622053,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"personal-data","personal-data",60654159,null),new cljs.core.Symbol(null,"acm-data","acm-data",856269948,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Adds hazard ratios to personal data points for plotting purposes.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"TimeseriesData","TimeseriesData",-31656625,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Symbol(null,"HazardRatioData","HazardRatioData",1513549663,null)], null)], null),new cljs.core.Symbol(null,"HRTimeseriesData","HRTimeseriesData",1577978862,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.biomarker_data.HazardRatioData], null)], null),app.biomarker_data.HRTimeseriesData], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.biomarker_data.HazardRatioData], null)], null),app.biomarker_data.HRTimeseriesData], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"map-to-timestamp","map-to-timestamp",-1994834865,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.VegaDate], null),app.time.Timestamp], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.VegaDate], null),app.time.Timestamp], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.comparison-matrix-table","app.comparison-matrix-table",990026492,null),cljs.core.with_meta(new cljs.core.Symbol(null,"add-aggregates","add-aggregates",1165374252,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"input-significant-correlations","input-significant-correlations",1633920401,null),new cljs.core.Symbol(null,"flat-map","flat-map",290994851,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"add-timestamps","add-timestamps",1127532804,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"process-csv-data","process-csv-data",832595554,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"merge-rows-using-dates","merge-rows-using-dates",554591301,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"aggregate-data","aggregate-data",-2042941716,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),app.time.PeriodIdTypes,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),app.csv_data_processing.ProcessedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),app.time.PeriodIdTypes,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),app.csv_data_processing.ProcessedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.biomarker-data","app.biomarker-data",420683242,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-var-name","get-var-name",-1019029362,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"personal-data","personal-data",60654159,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"TimeseriesData","TimeseriesData",-31656625,null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv","app.csv",1676676688,null),new cljs.core.Symbol(null,"-standardize-keys","-standardize-keys",-1001622265,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"get-all-data-validation-string","get-all-data-validation-string",-1361206755,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"floatify-data","floatify-data",1587671821,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-csv-values","get-csv-values",1025959841,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"csv-data","csv-data",-294865515,null),new cljs.core.Symbol(null,"column-name","column-name",-2102912189,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Filters NaNs while getting the data.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"combine-rows","combine-rows",-1669772216,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.csv_data_processing.ProcessedRow], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.csv_data_processing.ProcessedRow], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"get-validation-string","get-validation-string",1434627800,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-all-correlations","make-all-correlations",-354399926,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"correlations","correlations",-2137399540,null),new cljs.core.Symbol(null,"csv-data","csv-data",-294865515,null),new cljs.core.Symbol(null,"one-var-type","one-var-type",-412397558,null),new cljs.core.Symbol(null,"many-var-type","many-var-type",578410339,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol("stats","PairwiseCorrelations","stats/PairwiseCorrelations",2133201729,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Symbol("proc","ProcessedRow","proc/ProcessedRow",1956179501,null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"parse-date-range","parse-date-range",-921785304,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.VegaDate], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.VegaDate], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-one-var-timeseries-data","get-one-var-timeseries-data",-218445081,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.Symbol("biodata","TimeseriesData","biodata/TimeseriesData",-193357283,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.biomarker_data.TimeseriesData], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.biomarker_data.TimeseriesData], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"group-by-period","group-by-period",-822796806,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null),app.time.PeriodIdTypes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null),app.time.PeriodIdTypes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"enliten","enliten",-1870304744,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations], null),app.stats.PairwiseCorrelationsLite], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations], null),app.stats.PairwiseCorrelationsLite], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"compute-correlations","compute-correlations",-1811559254,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairwiseCorrelations], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"parse-date","parse-date",-1997835208,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.time.VegaDate], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.time.VegaDate], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.comparison-matrix-table","app.comparison-matrix-table",990026492,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-comparison-matrix-data","make-comparison-matrix-data",-2779548,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"results","results",506361414,null),new cljs.core.Symbol(null,"input-significant-correlations","input-significant-correlations",1633920401,null),new cljs.core.Symbol(null,"p-values-rounded?","p-values-rounded?",401098225,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol("stats","PairwiseCorrelationsLite","stats/PairwiseCorrelationsLite",-1811135248,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelationsLite,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelationsLite,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null);
})()
]);

cljs.core.filterv(cljs.core.some_QMARK_,cljs.core.PersistentVector.fromArray([(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null),app.time.parse_date_range);
}));

(app.time.parse_date_range = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48411 = type__40663__auto__;
var G__48412 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));
var fexpr__48410 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48410.cljs$core$IFn$_invoke$arity$2 ? fexpr__48410.cljs$core$IFn$_invoke$arity$2(G__48411,G__48412) : fexpr__48410.call(null,G__48411,G__48412));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.VegaDate], null))], null),app.time.parse_date_range));

console.log("..instrumented",new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));

return new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null),app.time.date_to_timestamp);
}));

(app.time.date_to_timestamp = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48414 = type__40663__auto__;
var G__48415 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));
var fexpr__48413 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48413.cljs$core$IFn$_invoke$arity$2 ? fexpr__48413.cljs$core$IFn$_invoke$arity$2(G__48414,G__48415) : fexpr__48413.call(null,G__48414,G__48415));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.Timestamp], null))], null),app.time.date_to_timestamp));

console.log("..instrumented",new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));

return new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null),app.time.map_to_timestamp);
}));

(app.time.map_to_timestamp = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48417 = type__40663__auto__;
var G__48418 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));
var fexpr__48416 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48416.cljs$core$IFn$_invoke$arity$2 ? fexpr__48416.cljs$core$IFn$_invoke$arity$2(G__48417,G__48418) : fexpr__48416.call(null,G__48417,G__48418));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.VegaDate], null),app.time.Timestamp], null))], null),app.time.map_to_timestamp));

console.log("..instrumented",new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));

return new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null),app.time.parse_date);
}));

(app.time.parse_date = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48420 = type__40663__auto__;
var G__48421 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));
var fexpr__48419 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48419.cljs$core$IFn$_invoke$arity$2 ? fexpr__48419.cljs$core$IFn$_invoke$arity$2(G__48420,G__48421) : fexpr__48419.call(null,G__48420,G__48421));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.time.VegaDate], null)], null))], null),app.time.parse_date));

console.log("..instrumented",new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));

return new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null),app.time.group_by_period);
}));

(app.time.group_by_period = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48423 = type__40663__auto__;
var G__48424 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));
var fexpr__48422 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48422.cljs$core$IFn$_invoke$arity$2 ? fexpr__48422.cljs$core$IFn$_invoke$arity$2(G__48423,G__48424) : fexpr__48422.call(null,G__48423,G__48424));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null),app.time.PeriodIdTypes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null)], null)], null))], null),app.time.group_by_period));

console.log("..instrumented",new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));

return new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null),app.time.get_period_id);
}));

(app.time.get_period_id = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48426 = type__40663__auto__;
var G__48427 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));
var fexpr__48425 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48425.cljs$core$IFn$_invoke$arity$2 ? fexpr__48425.cljs$core$IFn$_invoke$arity$2(G__48426,G__48427) : fexpr__48425.call(null,G__48426,G__48427));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Timestamp,app.time.PeriodIdTypes], null),new cljs.core.Keyword(null,"string","string",-1989541586)], null))], null),app.time.get_period_id));

console.log("..instrumented",new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));

return new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null),app.math.average);
}));

(app.math.average = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48429 = type__40663__auto__;
var G__48430 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));
var fexpr__48428 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48428.cljs$core$IFn$_invoke$arity$2 ? fexpr__48428.cljs$core$IFn$_invoke$arity$2(G__48429,G__48430) : fexpr__48428.call(null,G__48429,G__48430));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null))], null),app.math.average));

console.log("..instrumented",new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));

return new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null),app.single_var_table.get_csv_values);
}));

(app.single_var_table.get_csv_values = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48432 = type__40663__auto__;
var G__48433 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));
var fexpr__48431 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48431.cljs$core$IFn$_invoke$arity$2 ? fexpr__48431.cljs$core$IFn$_invoke$arity$2(G__48432,G__48433) : fexpr__48431.call(null,G__48432,G__48433));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null))], null),app.single_var_table.get_csv_values));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));

return new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null),app.single_var_table.get_one_var_timeseries_data);
}));

(app.single_var_table.get_one_var_timeseries_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48435 = type__40663__auto__;
var G__48436 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));
var fexpr__48434 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48434.cljs$core$IFn$_invoke$arity$2 ? fexpr__48434.cljs$core$IFn$_invoke$arity$2(G__48435,G__48436) : fexpr__48434.call(null,G__48435,G__48436));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.biomarker_data.TimeseriesData], null))], null),app.single_var_table.get_one_var_timeseries_data));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));

return new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null),app.single_var_table.make_all_correlations);
}));

(app.single_var_table.make_all_correlations = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48438 = type__40663__auto__;
var G__48439 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));
var fexpr__48437 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48437.cljs$core$IFn$_invoke$arity$2 ? fexpr__48437.cljs$core$IFn$_invoke$arity$2(G__48438,G__48439) : fexpr__48437.call(null,G__48438,G__48439));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null)], null))], null),app.single_var_table.make_all_correlations));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));

return new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null),app.single_var_table.calc_counted_score);
}));

(app.single_var_table.calc_counted_score = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48441 = type__40663__auto__;
var G__48442 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));
var fexpr__48440 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48440.cljs$core$IFn$_invoke$arity$2 ? fexpr__48440.cljs$core$IFn$_invoke$arity$2(G__48441,G__48442) : fexpr__48440.call(null,G__48441,G__48442));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null))], null),app.single_var_table.calc_counted_score));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));

return new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null),app.single_var_table.make_hiccup);
}));

(app.single_var_table.make_hiccup = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48447 = type__40663__auto__;
var G__48448 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));
var fexpr__48446 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48446.cljs$core$IFn$_invoke$arity$2 ? fexpr__48446.cljs$core$IFn$_invoke$arity$2(G__48447,G__48448) : fexpr__48446.call(null,G__48447,G__48448));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.specs.ReagentComponent], null))], null),app.single_var_table.make_hiccup));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));

return new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null),app.single_var_table.get_significant_correlations);
}));

(app.single_var_table.get_significant_correlations = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48453 = type__40663__auto__;
var G__48454 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));
var fexpr__48452 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48452.cljs$core$IFn$_invoke$arity$2 ? fexpr__48452.cljs$core$IFn$_invoke$arity$2(G__48453,G__48454) : fexpr__48452.call(null,G__48453,G__48454));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),app.single_var_table.OneToManyCorrelation], null))], null),app.single_var_table.get_significant_correlations));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));

return new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null),app.csv_data_processing.process_csv_data);
}));

(app.csv_data_processing.process_csv_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48461 = type__40663__auto__;
var G__48462 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));
var fexpr__48459 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48459.cljs$core$IFn$_invoke$arity$2 ? fexpr__48459.cljs$core$IFn$_invoke$arity$2(G__48461,G__48462) : fexpr__48459.call(null,G__48461,G__48462));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null))], null),app.csv_data_processing.process_csv_data));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));

return new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null),app.csv_data_processing.add_timestamps);
}));

(app.csv_data_processing.add_timestamps = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48468 = type__40663__auto__;
var G__48469 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));
var fexpr__48467 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48467.cljs$core$IFn$_invoke$arity$2 ? fexpr__48467.cljs$core$IFn$_invoke$arity$2(G__48468,G__48469) : fexpr__48467.call(null,G__48468,G__48469));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null))], null),app.csv_data_processing.add_timestamps));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));

return new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null),app.csv_data_processing.merge_rows_using_dates);
}));

(app.csv_data_processing.merge_rows_using_dates = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48474 = type__40663__auto__;
var G__48475 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));
var fexpr__48473 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48473.cljs$core$IFn$_invoke$arity$2 ? fexpr__48473.cljs$core$IFn$_invoke$arity$2(G__48474,G__48475) : fexpr__48473.call(null,G__48474,G__48475));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null))], null),app.csv_data_processing.merge_rows_using_dates));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));

return new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null),app.csv_data_processing.combine_rows);
}));

(app.csv_data_processing.combine_rows = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48480 = type__40663__auto__;
var G__48481 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));
var fexpr__48479 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48479.cljs$core$IFn$_invoke$arity$2 ? fexpr__48479.cljs$core$IFn$_invoke$arity$2(G__48480,G__48481) : fexpr__48479.call(null,G__48480,G__48481));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.csv_data_processing.ProcessedRow], null))], null),app.csv_data_processing.combine_rows));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));

return new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null),app.csv_data_processing.aggregate_data);
}));

(app.csv_data_processing.aggregate_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48485 = type__40663__auto__;
var G__48486 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));
var fexpr__48483 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48483.cljs$core$IFn$_invoke$arity$2 ? fexpr__48483.cljs$core$IFn$_invoke$arity$2(G__48485,G__48486) : fexpr__48483.call(null,G__48485,G__48486));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),app.time.PeriodIdTypes,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),app.csv_data_processing.ProcessedRow], null)], null))], null),app.csv_data_processing.aggregate_data));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));

return new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null),app.csv_data_processing.floatify_data);
}));

(app.csv_data_processing.floatify_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48492 = type__40663__auto__;
var G__48493 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));
var fexpr__48491 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48491.cljs$core$IFn$_invoke$arity$2 ? fexpr__48491.cljs$core$IFn$_invoke$arity$2(G__48492,G__48493) : fexpr__48491.call(null,G__48492,G__48493));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null))], null),app.csv_data_processing.floatify_data));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));

return new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null),app.csv_data_processing.get_validation_string);
}));

(app.csv_data_processing.get_validation_string = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48498 = type__40663__auto__;
var G__48499 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));
var fexpr__48497 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48497.cljs$core$IFn$_invoke$arity$2 ? fexpr__48497.cljs$core$IFn$_invoke$arity$2(G__48498,G__48499) : fexpr__48497.call(null,G__48498,G__48499));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),app.specs.Hiccup], null))], null),app.csv_data_processing.get_validation_string));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));

return new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null),app.csv_data_processing.get_all_data_validation_string);
}));

(app.csv_data_processing.get_all_data_validation_string = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48504 = type__40663__auto__;
var G__48505 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));
var fexpr__48503 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48503.cljs$core$IFn$_invoke$arity$2 ? fexpr__48503.cljs$core$IFn$_invoke$arity$2(G__48504,G__48505) : fexpr__48503.call(null,G__48504,G__48505));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),app.specs.Hiccup], null))], null),app.csv_data_processing.get_all_data_validation_string));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));

return new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null),app.biomarker_data.get_var_name);
}));

(app.biomarker_data.get_var_name = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48507 = type__40663__auto__;
var G__48508 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));
var fexpr__48506 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48506.cljs$core$IFn$_invoke$arity$2 ? fexpr__48506.cljs$core$IFn$_invoke$arity$2(G__48507,G__48508) : fexpr__48506.call(null,G__48507,G__48508));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null))], null),app.biomarker_data.get_var_name));

console.log("..instrumented",new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));

return new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null),app.biomarker_data.add_hrs);
}));

(app.biomarker_data.add_hrs = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48513 = type__40663__auto__;
var G__48514 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));
var fexpr__48512 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48512.cljs$core$IFn$_invoke$arity$2 ? fexpr__48512.cljs$core$IFn$_invoke$arity$2(G__48513,G__48514) : fexpr__48512.call(null,G__48513,G__48514));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.biomarker_data.HazardRatioData], null)], null),app.biomarker_data.HRTimeseriesData], null))], null),app.biomarker_data.add_hrs));

console.log("..instrumented",new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));

return new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null),app.biomarker_data.make_acm_plot);
}));

(app.biomarker_data.make_acm_plot = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48522 = type__40663__auto__;
var G__48523 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));
var fexpr__48521 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48521.cljs$core$IFn$_invoke$arity$2 ? fexpr__48521.cljs$core$IFn$_invoke$arity$2(G__48522,G__48523) : fexpr__48521.call(null,G__48522,G__48523));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,app.biomarker_data.BiomarkerData], null),app.specs.ReagentComponent], null))], null),app.biomarker_data.make_acm_plot));

console.log("..instrumented",new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));

return new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null),app.csv._standardize_keys);
}));

(app.csv._standardize_keys = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48525 = type__40663__auto__;
var G__48526 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));
var fexpr__48524 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48524.cljs$core$IFn$_invoke$arity$2 ? fexpr__48524.cljs$core$IFn$_invoke$arity$2(G__48525,G__48526) : fexpr__48524.call(null,G__48525,G__48526));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null))], null),app.csv._standardize_keys));

console.log("..instrumented",new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));

return new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null),app.ui.maps_to_html);
}));

(app.ui.maps_to_html = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48531 = type__40663__auto__;
var G__48532 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));
var fexpr__48530 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48530.cljs$core$IFn$_invoke$arity$2 ? fexpr__48530.cljs$core$IFn$_invoke$arity$2(G__48531,G__48532) : fexpr__48530.call(null,G__48531,G__48532));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),app.specs.Hiccup], null))], null),app.ui.maps_to_html));

console.log("..instrumented",new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));

return new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null),app.stats.clean_data);
}));

(app.stats.clean_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48538 = type__40663__auto__;
var G__48541 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));
var fexpr__48536 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48536.cljs$core$IFn$_invoke$arity$2 ? fexpr__48536.cljs$core$IFn$_invoke$arity$2(G__48538,G__48541) : fexpr__48536.call(null,G__48538,G__48541));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairedData], null))], null),app.stats.clean_data));

console.log("..instrumented",new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));

return new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null),app.stats.compute_correlations);
}));

(app.stats.compute_correlations = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48546 = type__40663__auto__;
var G__48547 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));
var fexpr__48545 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48545.cljs$core$IFn$_invoke$arity$2 ? fexpr__48545.cljs$core$IFn$_invoke$arity$2(G__48546,G__48547) : fexpr__48545.call(null,G__48546,G__48547));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairwiseCorrelations], null))], null),app.stats.compute_correlations));

console.log("..instrumented",new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));

return new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null),app.stats.enliten);
}));

(app.stats.enliten = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48552 = type__40663__auto__;
var G__48553 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));
var fexpr__48551 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48551.cljs$core$IFn$_invoke$arity$2 ? fexpr__48551.cljs$core$IFn$_invoke$arity$2(G__48552,G__48553) : fexpr__48551.call(null,G__48552,G__48553));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations], null),app.stats.PairwiseCorrelationsLite], null))], null),app.stats.enliten));

console.log("..instrumented",new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));

return new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null),app.stats.calc_correlation);
}));

(app.stats.calc_correlation = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48558 = type__40663__auto__;
var G__48559 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));
var fexpr__48557 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48557.cljs$core$IFn$_invoke$arity$2 ? fexpr__48557.cljs$core$IFn$_invoke$arity$2(G__48558,G__48559) : fexpr__48557.call(null,G__48558,G__48559));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.CorrelationResults], null))], null),app.stats.calc_correlation));

console.log("..instrumented",new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));

return new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null),app.specs.make_hiccup);
}));

(app.specs.make_hiccup = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48562 = type__40663__auto__;
var G__48565 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));
var fexpr__48560 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48560.cljs$core$IFn$_invoke$arity$2 ? fexpr__48560.cljs$core$IFn$_invoke$arity$2(G__48562,G__48565) : fexpr__48560.call(null,G__48562,G__48565));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"string","string",-1989541586)], null),app.specs.Hiccup], null))], null),app.specs.make_hiccup));

console.log("..instrumented",new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));

return new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null),app.core.get_vars);
}));

(app.core.get_vars = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48567 = type__40663__auto__;
var G__48568 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));
var fexpr__48566 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48566.cljs$core$IFn$_invoke$arity$2 ? fexpr__48566.cljs$core$IFn$_invoke$arity$2(G__48567,G__48568) : fexpr__48566.call(null,G__48567,G__48568));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null))], null),app.core.get_vars));

console.log("..instrumented",new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));

return new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null),app.comparison_matrix_table.make_comparison_matrix_data);
}));

(app.comparison_matrix_table.make_comparison_matrix_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48576 = type__40663__auto__;
var G__48577 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));
var fexpr__48575 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48575.cljs$core$IFn$_invoke$arity$2 ? fexpr__48575.cljs$core$IFn$_invoke$arity$2(G__48576,G__48577) : fexpr__48575.call(null,G__48576,G__48577));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelationsLite,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null))], null),app.comparison_matrix_table.make_comparison_matrix_data));

console.log("..instrumented",new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));

return new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null),app.comparison_matrix_table.add_aggregates);
}));

(app.comparison_matrix_table.add_aggregates = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48582 = type__40663__auto__;
var G__48583 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));
var fexpr__48581 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48581.cljs$core$IFn$_invoke$arity$2 ? fexpr__48581.cljs$core$IFn$_invoke$arity$2(G__48582,G__48583) : fexpr__48581.call(null,G__48582,G__48583));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null))], null),app.comparison_matrix_table.add_aggregates));

console.log("..instrumented",new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));

return new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null),app.comparison_matrix_table.get_flat_biomarker_result_keys);
}));

(app.comparison_matrix_table.get_flat_biomarker_result_keys = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48588 = type__40663__auto__;
var G__48589 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));
var fexpr__48587 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48587.cljs$core$IFn$_invoke$arity$2 ? fexpr__48587.cljs$core$IFn$_invoke$arity$2(G__48588,G__48589) : fexpr__48587.call(null,G__48588,G__48589));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null))], null),app.comparison_matrix_table.get_flat_biomarker_result_keys));

console.log("..instrumented",new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));

return new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null);
})()
], true));

return app.core.mount_root();
});
app.core.init_BANG_ = (function app$core$init_BANG_(){
cljs.core.filterv(cljs.core.some_QMARK_,cljs.core.PersistentVector.fromArray([(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));
}));

(app.time.parse_date_range = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));

return new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));
}));

(app.time.date_to_timestamp = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));

return new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));
}));

(app.time.map_to_timestamp = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));

return new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));
}));

(app.time.parse_date = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));

return new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));
}));

(app.time.group_by_period = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));

return new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));
}));

(app.time.get_period_id = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));

return new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));
}));

(app.math.average = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));

return new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));
}));

(app.single_var_table.get_csv_values = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));

return new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));
}));

(app.single_var_table.get_one_var_timeseries_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));

return new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));
}));

(app.single_var_table.make_all_correlations = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));

return new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));
}));

(app.single_var_table.calc_counted_score = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));

return new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));
}));

(app.single_var_table.make_hiccup = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));

return new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));
}));

(app.single_var_table.get_significant_correlations = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));

return new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));
}));

(app.csv_data_processing.process_csv_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));

return new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));
}));

(app.csv_data_processing.add_timestamps = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));

return new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));
}));

(app.csv_data_processing.merge_rows_using_dates = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));

return new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));
}));

(app.csv_data_processing.combine_rows = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));

return new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));
}));

(app.csv_data_processing.aggregate_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));

return new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));
}));

(app.csv_data_processing.floatify_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));

return new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));
}));

(app.csv_data_processing.get_validation_string = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));

return new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));
}));

(app.csv_data_processing.get_all_data_validation_string = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));

return new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));
}));

(app.biomarker_data.get_var_name = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));

return new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));
}));

(app.biomarker_data.add_hrs = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));

return new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));
}));

(app.biomarker_data.make_acm_plot = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));

return new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));
}));

(app.csv._standardize_keys = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));

return new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));
}));

(app.ui.maps_to_html = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));

return new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));
}));

(app.stats.clean_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));

return new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));
}));

(app.stats.compute_correlations = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));

return new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));
}));

(app.stats.enliten = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));

return new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));
}));

(app.stats.calc_correlation = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));

return new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));
}));

(app.specs.make_hiccup = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));

return new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));
}));

(app.core.get_vars = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));

return new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));
}));

(app.comparison_matrix_table.make_comparison_matrix_data = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));

return new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));
}));

(app.comparison_matrix_table.add_aggregates = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));

return new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(malli.instrument.cljs.instrumented_vars),new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));
if(cljs.core.truth_(temp__5753__auto__)){
var orig_fn__40688__auto__ = temp__5753__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40687__40689__auto__){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40687__40689__auto__,new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));
}));

(app.comparison_matrix_table.get_flat_biomarker_result_keys = orig_fn__40688__auto__);

console.log("..unstrumented",new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));

return new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null);
} else {
return null;
}
})()], true));

cljs.core.PersistentHashSet.createAsIfByAssoc([(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.specs","app.specs",384021979,null),new cljs.core.Symbol(null,"make-hiccup","make-hiccup",-2040101156,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"string","string",-1989541586)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"string","string",-1989541586)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.ui","app.ui",-1105541323,null),new cljs.core.Symbol(null,"maps-to-html","maps-to-html",-541539065,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-hiccup","make-hiccup",-2040101156,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates a table like this:\n           Input\n        Aggregate 1\n        Aggregate 2\n  Biomarker | r | p | n\n  data      | 0 | 0 | 0\n  ...\n  ",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.Symbol("specs","ReagentComponent","specs/ReagentComponent",-1072943109,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.specs.ReagentComponent], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.specs.ReagentComponent], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.comparison-matrix-table","app.comparison-matrix-table",990026492,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-flat-biomarker-result-keys","get-flat-biomarker-result-keys",-2049940581,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"filter-func","filter-func",1579225169,null),new cljs.core.Symbol(null,"m","m",-1021758608,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Converts {:input :i :biomarker :b :results {:slope 5.0}} to\n  {:input :i :b--slope 5.0}\n\n  Also adds blank columns like :b--blank that add spacing between each\n  biomarker in the final visualizations.\n  ",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"clean-data","clean-data",-1052461118,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairedData], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairedData], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.core","app.core",1762291291,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-vars","get-vars",-205083548,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Gets all variables (csv columns) from parsed csv maps besides the date.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Symbol("proc","DatedRow","proc/DatedRow",-311652020,null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"calc-counted-score","calc-counted-score",1920949326,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"correlations","correlations",-2137399540,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Sums up all postive correlations and all negatives correlations, then takes\n  the difference.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),new cljs.core.Symbol("stats","PairwiseCorrelations","stats/PairwiseCorrelations",2133201729,null)], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"date-to-timestamp","date-to-timestamp",2065727848,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.Timestamp], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.Timestamp], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"get-period-id","get-period-id",-1355761507,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Timestamp,app.time.PeriodIdTypes], null),new cljs.core.Keyword(null,"string","string",-1989541586)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Timestamp,app.time.PeriodIdTypes], null),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-significant-correlations","get-significant-correlations",-525312292,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"one-var-type","one-var-type",-412397558,null),new cljs.core.Symbol(null,"one-var","one-var",1705805095,null),new cljs.core.Symbol(null,"many-var-type","many-var-type",578410339,null),new cljs.core.Symbol(null,"one-var-raw-data","one-var-raw-data",555715652,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol("stats","PairwiseCorrelations","stats/PairwiseCorrelations",2133201729,null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),app.single_var_table.OneToManyCorrelation], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.biomarker-data","app.biomarker-data",420683242,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-acm-plot","make-acm-plot",-196269751,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"personal-data","personal-data",60654159,null),new cljs.core.Symbol(null,"bio-data","bio-data",1842952455,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"TimeseriesData","TimeseriesData",-31656625,null),new cljs.core.Symbol(null,"BiomarkerData","BiomarkerData",1377791739,null)], null),new cljs.core.Symbol("specs","ReagentComponent","specs/ReagentComponent",-1072943109,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,app.biomarker_data.BiomarkerData], null),app.specs.ReagentComponent], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,app.biomarker_data.BiomarkerData], null),app.specs.ReagentComponent], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"calc-correlation","calc-correlation",-1536134913,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.CorrelationResults], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.CorrelationResults], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.math","app.math",-1829237435,null),new cljs.core.Symbol(null,"average","average",1148175359,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.biomarker-data","app.biomarker-data",420683242,null),cljs.core.with_meta(new cljs.core.Symbol(null,"add-hrs","add-hrs",-806622053,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"personal-data","personal-data",60654159,null),new cljs.core.Symbol(null,"acm-data","acm-data",856269948,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Adds hazard ratios to personal data points for plotting purposes.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"TimeseriesData","TimeseriesData",-31656625,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Symbol(null,"HazardRatioData","HazardRatioData",1513549663,null)], null)], null),new cljs.core.Symbol(null,"HRTimeseriesData","HRTimeseriesData",1577978862,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.biomarker_data.HazardRatioData], null)], null),app.biomarker_data.HRTimeseriesData], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.biomarker_data.HazardRatioData], null)], null),app.biomarker_data.HRTimeseriesData], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"map-to-timestamp","map-to-timestamp",-1994834865,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.VegaDate], null),app.time.Timestamp], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.VegaDate], null),app.time.Timestamp], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.comparison-matrix-table","app.comparison-matrix-table",990026492,null),cljs.core.with_meta(new cljs.core.Symbol(null,"add-aggregates","add-aggregates",1165374252,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"input-significant-correlations","input-significant-correlations",1633920401,null),new cljs.core.Symbol(null,"flat-map","flat-map",290994851,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"add-timestamps","add-timestamps",1127532804,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"process-csv-data","process-csv-data",832595554,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"merge-rows-using-dates","merge-rows-using-dates",554591301,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"aggregate-data","aggregate-data",-2042941716,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),app.time.PeriodIdTypes,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),app.csv_data_processing.ProcessedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),app.time.PeriodIdTypes,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),app.csv_data_processing.ProcessedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.biomarker-data","app.biomarker-data",420683242,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-var-name","get-var-name",-1019029362,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"personal-data","personal-data",60654159,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"TimeseriesData","TimeseriesData",-31656625,null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv","app.csv",1676676688,null),new cljs.core.Symbol(null,"-standardize-keys","-standardize-keys",-1001622265,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"get-all-data-validation-string","get-all-data-validation-string",-1361206755,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"floatify-data","floatify-data",1587671821,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-csv-values","get-csv-values",1025959841,null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"csv-data","csv-data",-294865515,null),new cljs.core.Symbol(null,"column-name","column-name",-2102912189,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Filters NaNs while getting the data.",new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"combine-rows","combine-rows",-1669772216,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.csv_data_processing.ProcessedRow], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.csv_data_processing.ProcessedRow], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.csv-data-processing","app.csv-data-processing",32426567,null),new cljs.core.Symbol(null,"get-validation-string","get-validation-string",1434627800,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),app.specs.Hiccup], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),app.specs.Hiccup], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-all-correlations","make-all-correlations",-354399926,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"correlations","correlations",-2137399540,null),new cljs.core.Symbol(null,"csv-data","csv-data",-294865515,null),new cljs.core.Symbol(null,"one-var-type","one-var-type",-412397558,null),new cljs.core.Symbol(null,"many-var-type","many-var-type",578410339,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol("stats","PairwiseCorrelations","stats/PairwiseCorrelations",2133201729,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Symbol("proc","ProcessedRow","proc/ProcessedRow",1956179501,null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"parse-date-range","parse-date-range",-921785304,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.VegaDate], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.VegaDate], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.single-var-table","app.single-var-table",-489991386,null),cljs.core.with_meta(new cljs.core.Symbol(null,"get-one-var-timeseries-data","get-one-var-timeseries-data",-218445081,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"data","data",1407862150,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.Symbol("biodata","TimeseriesData","biodata/TimeseriesData",-193357283,null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.biomarker_data.TimeseriesData], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.biomarker_data.TimeseriesData], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"group-by-period","group-by-period",-822796806,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null),app.time.PeriodIdTypes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null),app.time.PeriodIdTypes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"enliten","enliten",-1870304744,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations], null),app.stats.PairwiseCorrelationsLite], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations], null),app.stats.PairwiseCorrelationsLite], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.stats","app.stats",1790392152,null),new cljs.core.Symbol(null,"compute-correlations","compute-correlations",-1811559254,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairwiseCorrelations], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.time","app.time",-1018941024,null),new cljs.core.Symbol(null,"parse-date","parse-date",-1997835208,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.time.VegaDate], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.time.VegaDate], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null);
})()
,(function (){
malli.core._register_function_schema_BANG_.cljs$core$IFn$_invoke$arity$6(new cljs.core.Symbol(null,"app.comparison-matrix-table","app.comparison-matrix-table",990026492,null),cljs.core.with_meta(new cljs.core.Symbol(null,"make-comparison-matrix-data","make-comparison-matrix-data",-2779548,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"results","results",506361414,null),new cljs.core.Symbol(null,"input-significant-correlations","input-significant-correlations",1633920401,null),new cljs.core.Symbol(null,"p-values-rounded?","p-values-rounded?",401098225,null)], null))),new cljs.core.Keyword("malli","schema","malli/schema",-1764044328),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Symbol("stats","PairwiseCorrelationsLite","stats/PairwiseCorrelationsLite",-1811135248,null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Symbol(null,"OneToManyCorrelation","OneToManyCorrelation",-948827535,null)], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelationsLite,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"schema","schema",-1582001791),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelationsLite,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null)], null),new cljs.core.Keyword(null,"cljs","cljs",1492417629),cljs.core.identity);

return new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null);
})()
]);

cljs.core.filterv(cljs.core.some_QMARK_,cljs.core.PersistentVector.fromArray([(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null),app.time.parse_date_range);
}));

(app.time.parse_date_range = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48621 = type__40663__auto__;
var G__48622 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));
var fexpr__48620 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48620.cljs$core$IFn$_invoke$arity$2 ? fexpr__48620.cljs$core$IFn$_invoke$arity$2(G__48621,G__48622) : fexpr__48620.call(null,G__48621,G__48622));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.VegaDate], null))], null),app.time.parse_date_range));

console.log("..instrumented",new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null));

return new cljs.core.Symbol("app.time","parse-date-range","app.time/parse-date-range",876179030,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null),app.time.date_to_timestamp);
}));

(app.time.date_to_timestamp = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48624 = type__40663__auto__;
var G__48625 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));
var fexpr__48623 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48623.cljs$core$IFn$_invoke$arity$2 ? fexpr__48623.cljs$core$IFn$_invoke$arity$2(G__48624,G__48625) : fexpr__48623.call(null,G__48624,G__48625));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),app.time.Timestamp], null))], null),app.time.date_to_timestamp));

console.log("..instrumented",new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null));

return new cljs.core.Symbol("app.time","date-to-timestamp","app.time/date-to-timestamp",1007306734,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null),app.time.map_to_timestamp);
}));

(app.time.map_to_timestamp = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48627 = type__40663__auto__;
var G__48628 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));
var fexpr__48626 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48626.cljs$core$IFn$_invoke$arity$2 ? fexpr__48626.cljs$core$IFn$_invoke$arity$2(G__48627,G__48628) : fexpr__48626.call(null,G__48627,G__48628));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.VegaDate], null),app.time.Timestamp], null))], null),app.time.map_to_timestamp));

console.log("..instrumented",new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null));

return new cljs.core.Symbol("app.time","map-to-timestamp","app.time/map-to-timestamp",1308881601,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null),app.time.parse_date);
}));

(app.time.parse_date = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48630 = type__40663__auto__;
var G__48631 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));
var fexpr__48629 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48629.cljs$core$IFn$_invoke$arity$2 ? fexpr__48629.cljs$core$IFn$_invoke$arity$2(G__48630,G__48631) : fexpr__48629.call(null,G__48630,G__48631));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.time.VegaDate], null)], null))], null),app.time.parse_date));

console.log("..instrumented",new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null));

return new cljs.core.Symbol("app.time","parse-date","app.time/parse-date",1307686562,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null),app.time.group_by_period);
}));

(app.time.group_by_period = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48633 = type__40663__auto__;
var G__48634 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));
var fexpr__48632 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48632.cljs$core$IFn$_invoke$arity$2 ? fexpr__48632.cljs$core$IFn$_invoke$arity$2(G__48633,G__48634) : fexpr__48632.call(null,G__48633,G__48634));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null),app.time.PeriodIdTypes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"timestamp","timestamp",579478971),app.time.Timestamp], null)], null)], null)], null)], null))], null),app.time.group_by_period));

console.log("..instrumented",new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null));

return new cljs.core.Symbol("app.time","group-by-period","app.time/group-by-period",30301284,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null),app.time.get_period_id);
}));

(app.time.get_period_id = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48636 = type__40663__auto__;
var G__48637 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));
var fexpr__48635 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48635.cljs$core$IFn$_invoke$arity$2 ? fexpr__48635.cljs$core$IFn$_invoke$arity$2(G__48636,G__48637) : fexpr__48635.call(null,G__48636,G__48637));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.time.Timestamp,app.time.PeriodIdTypes], null),new cljs.core.Keyword(null,"string","string",-1989541586)], null))], null),app.time.get_period_id));

console.log("..instrumented",new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null));

return new cljs.core.Symbol("app.time","get-period-id","app.time/get-period-id",1813641747,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null),app.math.average);
}));

(app.math.average = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48639 = type__40663__auto__;
var G__48640 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));
var fexpr__48638 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48638.cljs$core$IFn$_invoke$arity$2 ? fexpr__48638.cljs$core$IFn$_invoke$arity$2(G__48639,G__48640) : fexpr__48638.call(null,G__48639,G__48640));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null))], null),app.math.average));

console.log("..instrumented",new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null));

return new cljs.core.Symbol("app.math","average","app.math/average",-2095983036,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null),app.single_var_table.get_csv_values);
}));

(app.single_var_table.get_csv_values = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48642 = type__40663__auto__;
var G__48643 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));
var fexpr__48641 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48641.cljs$core$IFn$_invoke$arity$2 ? fexpr__48641.cljs$core$IFn$_invoke$arity$2(G__48642,G__48643) : fexpr__48641.call(null,G__48642,G__48643));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null))], null),app.single_var_table.get_csv_values));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null));

return new cljs.core.Symbol("app.single-var-table","get-csv-values","app.single-var-table/get-csv-values",162860081,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null),app.single_var_table.get_one_var_timeseries_data);
}));

(app.single_var_table.get_one_var_timeseries_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48645 = type__40663__auto__;
var G__48646 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));
var fexpr__48644 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48644.cljs$core$IFn$_invoke$arity$2 ? fexpr__48644.cljs$core$IFn$_invoke$arity$2(G__48645,G__48646) : fexpr__48644.call(null,G__48645,G__48646));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.biomarker_data.TimeseriesData], null))], null),app.single_var_table.get_one_var_timeseries_data));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null));

return new cljs.core.Symbol("app.single-var-table","get-one-var-timeseries-data","app.single-var-table/get-one-var-timeseries-data",-1891160745,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null),app.single_var_table.make_all_correlations);
}));

(app.single_var_table.make_all_correlations = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48648 = type__40663__auto__;
var G__48649 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));
var fexpr__48647 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48647.cljs$core$IFn$_invoke$arity$2 ? fexpr__48647.cljs$core$IFn$_invoke$arity$2(G__48648,G__48649) : fexpr__48647.call(null,G__48648,G__48649));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null)], null))], null),app.single_var_table.make_all_correlations));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null));

return new cljs.core.Symbol("app.single-var-table","make-all-correlations","app.single-var-table/make-all-correlations",-1642924838,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null),app.single_var_table.calc_counted_score);
}));

(app.single_var_table.calc_counted_score = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48654 = type__40663__auto__;
var G__48655 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));
var fexpr__48653 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48653.cljs$core$IFn$_invoke$arity$2 ? fexpr__48653.cljs$core$IFn$_invoke$arity$2(G__48654,G__48655) : fexpr__48653.call(null,G__48654,G__48655));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"nil","nil",99600501),app.stats.PairwiseCorrelations], null)], null),new cljs.core.Keyword(null,"int","int",-1741416922)], null))], null),app.single_var_table.calc_counted_score));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null));

return new cljs.core.Symbol("app.single-var-table","calc-counted-score","app.single-var-table/calc-counted-score",-2049772802,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null),app.single_var_table.make_hiccup);
}));

(app.single_var_table.make_hiccup = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48660 = type__40663__auto__;
var G__48661 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));
var fexpr__48659 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48659.cljs$core$IFn$_invoke$arity$2 ? fexpr__48659.cljs$core$IFn$_invoke$arity$2(G__48660,G__48661) : fexpr__48659.call(null,G__48660,G__48661));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.single_var_table.OneToManyCorrelation], null),app.specs.ReagentComponent], null))], null),app.single_var_table.make_hiccup));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null));

return new cljs.core.Symbol("app.single-var-table","make-hiccup","app.single-var-table/make-hiccup",-1819067316,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null),app.single_var_table.get_significant_correlations);
}));

(app.single_var_table.get_significant_correlations = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48666 = type__40663__auto__;
var G__48667 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));
var fexpr__48665 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48665.cljs$core$IFn$_invoke$arity$2 ? fexpr__48665.cljs$core$IFn$_invoke$arity$2(G__48666,G__48667) : fexpr__48665.call(null,G__48666,G__48667));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations,new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"vector","vector",1902966158),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),app.single_var_table.OneToManyCorrelation], null))], null),app.single_var_table.get_significant_correlations));

console.log("..instrumented",new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null));

return new cljs.core.Symbol("app.single-var-table","get-significant-correlations","app.single-var-table/get-significant-correlations",-737968020,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null),app.csv_data_processing.process_csv_data);
}));

(app.csv_data_processing.process_csv_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48672 = type__40663__auto__;
var G__48673 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));
var fexpr__48671 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48671.cljs$core$IFn$_invoke$arity$2 ? fexpr__48671.cljs$core$IFn$_invoke$arity$2(G__48672,G__48673) : fexpr__48671.call(null,G__48672,G__48673));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null))], null),app.csv_data_processing.process_csv_data));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null));

return new cljs.core.Symbol("app.csv-data-processing","process-csv-data","app.csv-data-processing/process-csv-data",-281743776,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null),app.csv_data_processing.add_timestamps);
}));

(app.csv_data_processing.add_timestamps = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48678 = type__40663__auto__;
var G__48679 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));
var fexpr__48677 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48677.cljs$core$IFn$_invoke$arity$2 ? fexpr__48677.cljs$core$IFn$_invoke$arity$2(G__48678,G__48679) : fexpr__48677.call(null,G__48678,G__48679));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null))], null),app.csv_data_processing.add_timestamps));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null));

return new cljs.core.Symbol("app.csv-data-processing","add-timestamps","app.csv-data-processing/add-timestamps",-88588026,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null),app.csv_data_processing.merge_rows_using_dates);
}));

(app.csv_data_processing.merge_rows_using_dates = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48684 = type__40663__auto__;
var G__48685 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));
var fexpr__48683 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48683.cljs$core$IFn$_invoke$arity$2 ? fexpr__48683.cljs$core$IFn$_invoke$arity$2(G__48684,G__48685) : fexpr__48683.call(null,G__48684,G__48685));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null))], null),app.csv_data_processing.merge_rows_using_dates));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null));

return new cljs.core.Symbol("app.csv-data-processing","merge-rows-using-dates","app.csv-data-processing/merge-rows-using-dates",-275125181,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null),app.csv_data_processing.combine_rows);
}));

(app.csv_data_processing.combine_rows = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48690 = type__40663__auto__;
var G__48691 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));
var fexpr__48689 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48689.cljs$core$IFn$_invoke$arity$2 ? fexpr__48689.cljs$core$IFn$_invoke$arity$2(G__48690,G__48691) : fexpr__48689.call(null,G__48690,G__48691));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.csv_data_processing.ProcessedRow], null))], null),app.csv_data_processing.combine_rows));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null));

return new cljs.core.Symbol("app.csv-data-processing","combine-rows","app.csv-data-processing/combine-rows",-675101618,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null),app.csv_data_processing.aggregate_data);
}));

(app.csv_data_processing.aggregate_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48696 = type__40663__auto__;
var G__48697 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));
var fexpr__48695 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48695.cljs$core$IFn$_invoke$arity$2 ? fexpr__48695.cljs$core$IFn$_invoke$arity$2(G__48696,G__48697) : fexpr__48695.call(null,G__48696,G__48697));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null),app.time.PeriodIdTypes,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.Keyword(null,"double","double",884886883)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),app.csv_data_processing.ProcessedRow], null)], null))], null),app.csv_data_processing.aggregate_data));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null));

return new cljs.core.Symbol("app.csv-data-processing","aggregate-data","app.csv-data-processing/aggregate-data",1347401454,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null),app.csv_data_processing.floatify_data);
}));

(app.csv_data_processing.floatify_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48702 = type__40663__auto__;
var G__48703 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));
var fexpr__48701 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48701.cljs$core$IFn$_invoke$arity$2 ? fexpr__48701.cljs$core$IFn$_invoke$arity$2(G__48702,G__48703) : fexpr__48701.call(null,G__48702,G__48703));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null))], null),app.csv_data_processing.floatify_data));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null));

return new cljs.core.Symbol("app.csv-data-processing","floatify-data","app.csv-data-processing/floatify-data",-399226101,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null),app.csv_data_processing.get_validation_string);
}));

(app.csv_data_processing.get_validation_string = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48708 = type__40663__auto__;
var G__48709 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));
var fexpr__48707 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48707.cljs$core$IFn$_invoke$arity$2 ? fexpr__48707.cljs$core$IFn$_invoke$arity$2(G__48708,G__48709) : fexpr__48707.call(null,G__48708,G__48709));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),app.specs.Hiccup], null))], null),app.csv_data_processing.get_validation_string));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null));

return new cljs.core.Symbol("app.csv-data-processing","get-validation-string","app.csv-data-processing/get-validation-string",-1945229626,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null),app.csv_data_processing.get_all_data_validation_string);
}));

(app.csv_data_processing.get_all_data_validation_string = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48714 = type__40663__auto__;
var G__48715 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));
var fexpr__48713 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48713.cljs$core$IFn$_invoke$arity$2 ? fexpr__48713.cljs$core$IFn$_invoke$arity$2(G__48714,G__48715) : fexpr__48713.call(null,G__48714,G__48715));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"*","*",-1294732318),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null)], null),app.specs.Hiccup], null))], null),app.csv_data_processing.get_all_data_validation_string));

console.log("..instrumented",new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null));

return new cljs.core.Symbol("app.csv-data-processing","get-all-data-validation-string","app.csv-data-processing/get-all-data-validation-string",2034903571,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null),app.biomarker_data.get_var_name);
}));

(app.biomarker_data.get_var_name = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48720 = type__40663__auto__;
var G__48721 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));
var fexpr__48719 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48719.cljs$core$IFn$_invoke$arity$2 ? fexpr__48719.cljs$core$IFn$_invoke$arity$2(G__48720,G__48721) : fexpr__48719.call(null,G__48720,G__48721));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData], null),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null))], null),app.biomarker_data.get_var_name));

console.log("..instrumented",new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null));

return new cljs.core.Symbol("app.biomarker-data","get-var-name","app.biomarker-data/get-var-name",99435084,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null),app.biomarker_data.add_hrs);
}));

(app.biomarker_data.add_hrs = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48726 = type__40663__auto__;
var G__48727 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));
var fexpr__48725 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48725.cljs$core$IFn$_invoke$arity$2 ? fexpr__48725.cljs$core$IFn$_invoke$arity$2(G__48726,G__48727) : fexpr__48725.call(null,G__48726,G__48727));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.biomarker_data.HazardRatioData], null)], null),app.biomarker_data.HRTimeseriesData], null))], null),app.biomarker_data.add_hrs));

console.log("..instrumented",new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null));

return new cljs.core.Symbol("app.biomarker-data","add-hrs","app.biomarker-data/add-hrs",-2127067559,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null),app.biomarker_data.make_acm_plot);
}));

(app.biomarker_data.make_acm_plot = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48732 = type__40663__auto__;
var G__48733 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));
var fexpr__48731 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48731.cljs$core$IFn$_invoke$arity$2 ? fexpr__48731.cljs$core$IFn$_invoke$arity$2(G__48732,G__48733) : fexpr__48731.call(null,G__48732,G__48733));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.biomarker_data.TimeseriesData,app.biomarker_data.BiomarkerData], null),app.specs.ReagentComponent], null))], null),app.biomarker_data.make_acm_plot));

console.log("..instrumented",new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null));

return new cljs.core.Symbol("app.biomarker-data","make-acm-plot","app.biomarker-data/make-acm-plot",-1440620661,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null),app.csv._standardize_keys);
}));

(app.csv._standardize_keys = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48738 = type__40663__auto__;
var G__48739 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));
var fexpr__48737 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48737.cljs$core$IFn$_invoke$arity$2 ? fexpr__48737.cljs$core$IFn$_invoke$arity$2(G__48738,G__48739) : fexpr__48737.call(null,G__48738,G__48739));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"string","string",-1989541586)], null)], null)], null))], null),app.csv._standardize_keys));

console.log("..instrumented",new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null));

return new cljs.core.Symbol("app.csv","-standardize-keys","app.csv/-standardize-keys",-1798306212,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null),app.ui.maps_to_html);
}));

(app.ui.maps_to_html = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48744 = type__40663__auto__;
var G__48745 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));
var fexpr__48743 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48743.cljs$core$IFn$_invoke$arity$2 ? fexpr__48743.cljs$core$IFn$_invoke$arity$2(G__48744,G__48745) : fexpr__48743.call(null,G__48744,G__48745));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null),app.specs.Hiccup], null))], null),app.ui.maps_to_html));

console.log("..instrumented",new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null));

return new cljs.core.Symbol("app.ui","maps-to-html","app.ui/maps-to-html",-1954232442,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null),app.stats.clean_data);
}));

(app.stats.clean_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48750 = type__40663__auto__;
var G__48751 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));
var fexpr__48749 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48749.cljs$core$IFn$_invoke$arity$2 ? fexpr__48749.cljs$core$IFn$_invoke$arity$2(G__48750,G__48751) : fexpr__48749.call(null,G__48750,G__48751));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairedData], null))], null),app.stats.clean_data));

console.log("..instrumented",new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null));

return new cljs.core.Symbol("app.stats","clean-data","app.stats/clean-data",-415603632,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null),app.stats.compute_correlations);
}));

(app.stats.compute_correlations = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48756 = type__40663__auto__;
var G__48757 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));
var fexpr__48755 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48755.cljs$core$IFn$_invoke$arity$2 ? fexpr__48755.cljs$core$IFn$_invoke$arity$2(G__48756,G__48757) : fexpr__48755.call(null,G__48756,G__48757));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.PairwiseCorrelations], null))], null),app.stats.compute_correlations));

console.log("..instrumented",new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null));

return new cljs.core.Symbol("app.stats","compute-correlations","app.stats/compute-correlations",-1090864316,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null),app.stats.enliten);
}));

(app.stats.enliten = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48762 = type__40663__auto__;
var G__48763 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));
var fexpr__48761 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48761.cljs$core$IFn$_invoke$arity$2 ? fexpr__48761.cljs$core$IFn$_invoke$arity$2(G__48762,G__48763) : fexpr__48761.call(null,G__48762,G__48763));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelations], null),app.stats.PairwiseCorrelationsLite], null))], null),app.stats.enliten));

console.log("..instrumented",new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null));

return new cljs.core.Symbol("app.stats","enliten","app.stats/enliten",-143514198,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null),app.stats.calc_correlation);
}));

(app.stats.calc_correlation = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48768 = type__40663__auto__;
var G__48769 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));
var fexpr__48767 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48767.cljs$core$IFn$_invoke$arity$2 ? fexpr__48767.cljs$core$IFn$_invoke$arity$2(G__48768,G__48769) : fexpr__48767.call(null,G__48768,G__48769));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.ProcessedRow], null)], null),app.stats.CorrelationResults], null))], null),app.stats.calc_correlation));

console.log("..instrumented",new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null));

return new cljs.core.Symbol("app.stats","calc-correlation","app.stats/calc-correlation",-1900174739,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null),app.specs.make_hiccup);
}));

(app.specs.make_hiccup = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48774 = type__40663__auto__;
var G__48775 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));
var fexpr__48773 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48773.cljs$core$IFn$_invoke$arity$2 ? fexpr__48773.cljs$core$IFn$_invoke$arity$2(G__48774,G__48775) : fexpr__48773.call(null,G__48774,G__48775));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"string","string",-1989541586)], null),app.specs.Hiccup], null))], null),app.specs.make_hiccup));

console.log("..instrumented",new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null));

return new cljs.core.Symbol("app.specs","make-hiccup","app.specs/make-hiccup",2016545993,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null),app.core.get_vars);
}));

(app.core.get_vars = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48780 = type__40663__auto__;
var G__48781 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));
var fexpr__48779 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48779.cljs$core$IFn$_invoke$arity$2 ? fexpr__48779.cljs$core$IFn$_invoke$arity$2(G__48780,G__48781) : fexpr__48779.call(null,G__48780,G__48781));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),app.csv_data_processing.DatedRow], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null)], null))], null),app.core.get_vars));

console.log("..instrumented",new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null));

return new cljs.core.Symbol("app.core","get-vars","app.core/get-vars",920733976,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null),app.comparison_matrix_table.make_comparison_matrix_data);
}));

(app.comparison_matrix_table.make_comparison_matrix_data = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48786 = type__40663__auto__;
var G__48787 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));
var fexpr__48785 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48785.cljs$core$IFn$_invoke$arity$2 ? fexpr__48785.cljs$core$IFn$_invoke$arity$2(G__48786,G__48787) : fexpr__48785.call(null,G__48786,G__48787));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),app.stats.PairwiseCorrelationsLite,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.Keyword(null,"any","any",1705907423)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sequential","sequential",-1082983960),new cljs.core.Keyword(null,"map","map",1371690461)], null)], null))], null),app.comparison_matrix_table.make_comparison_matrix_data));

console.log("..instrumented",new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null));

return new cljs.core.Symbol("app.comparison-matrix-table","make-comparison-matrix-data","app.comparison-matrix-table/make-comparison-matrix-data",699980707,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null),app.comparison_matrix_table.add_aggregates);
}));

(app.comparison_matrix_table.add_aggregates = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48792 = type__40663__auto__;
var G__48793 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));
var fexpr__48791 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48791.cljs$core$IFn$_invoke$arity$2 ? fexpr__48791.cljs$core$IFn$_invoke$arity$2(G__48792,G__48793) : fexpr__48791.call(null,G__48792,G__48793));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),app.single_var_table.OneToManyCorrelation], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null))], null),app.comparison_matrix_table.add_aggregates));

console.log("..instrumented",new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null));

return new cljs.core.Symbol("app.comparison-matrix-table","add-aggregates","app.comparison-matrix-table/add-aggregates",-1751431577,null);
})()
,(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(malli.instrument.cljs.instrumented_vars,(function (p1__40665__40666__auto__){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40665__40666__auto__,new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null),app.comparison_matrix_table.get_flat_biomarker_result_keys);
}));

(app.comparison_matrix_table.get_flat_biomarker_result_keys = malli.core._instrument.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"report","report",1394055010),(function (type__40663__auto__,data__40664__auto__){
var G__48798 = type__40663__auto__;
var G__48799 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data__40664__auto__,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004),new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));
var fexpr__48797 = malli.dev.pretty.reporter.cljs$core$IFn$_invoke$arity$0();
return (fexpr__48797.cljs$core$IFn$_invoke$arity$2 ? fexpr__48797.cljs$core$IFn$_invoke$arity$2(G__48798,G__48799) : fexpr__48797.call(null,G__48798,G__48799));
}),new cljs.core.Keyword(null,"schema","schema",-1582001791),malli.core.function_schema.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"=>","=>",1841166128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cat","cat",-1457810207),new cljs.core.Keyword(null,"keyword","keyword",811389747)], null),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-of","map-of",1189682355),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"any","any",1705907423)], null)], null))], null),app.comparison_matrix_table.get_flat_biomarker_result_keys));

console.log("..instrumented",new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null));

return new cljs.core.Symbol("app.comparison-matrix-table","get-flat-biomarker-result-keys","app.comparison-matrix-table/get-flat-biomarker-result-keys",1806374466,null);
})()
], true));

return app.core.mount_root();
});
goog.exportSymbol('app.core.init_BANG_', app.core.init_BANG_);

//# sourceMappingURL=app.core.js.map
