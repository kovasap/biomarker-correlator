goog.provide('malli.util');
malli.util.equals = (function malli$util$equals(var_args){
var G__62874 = arguments.length;
switch (G__62874) {
case 2:
return malli.util.equals.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.equals.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.equals.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema1,_QMARK_schema2){
return malli.util.equals.cljs$core$IFn$_invoke$arity$3(_QMARK_schema1,_QMARK_schema2,null);
}));

(malli.util.equals.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema1,_QMARK_schema2,options){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(malli.core.form.cljs$core$IFn$_invoke$arity$2(_QMARK_schema1,options),malli.core.form.cljs$core$IFn$_invoke$arity$2(_QMARK_schema2,options));
}));

(malli.util.equals.cljs$lang$maxFixedArity = 3);

malli.util._simplify_map_entry = (function malli$util$_simplify_map_entry(p__62882){
var vec__62883 = p__62882;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62883,(0),null);
var _QMARK_p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62883,(1),null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62883,(2),null);
if(cljs.core.not(s)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,_QMARK_p], null);
} else {
if(cljs.core.truth_((function (){var and__4251__auto__ = _QMARK_p;
if(cljs.core.truth_(and__4251__auto__)){
return ((new cljs.core.Keyword(null,"optional","optional",2053951509).cljs$core$IFn$_invoke$arity$1(_QMARK_p) === false) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(_QMARK_p))));
} else {
return and__4251__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,s], null);
} else {
if(cljs.core.not(cljs.core.seq(_QMARK_p))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,s], null);
} else {
if(new cljs.core.Keyword(null,"optional","optional",2053951509).cljs$core$IFn$_invoke$arity$1(_QMARK_p) === false){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(_QMARK_p,new cljs.core.Keyword(null,"optional","optional",2053951509)),s], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,_QMARK_p,s], null);

}
}
}
}
});
malli.util._required_map_entry_QMARK_ = (function malli$util$_required_map_entry_QMARK_(p__62889){
var vec__62890 = p__62889;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(0),null);
var _QMARK_p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(1),null);
return (!(((cljs.core.map_QMARK_(_QMARK_p)) && (new cljs.core.Keyword(null,"optional","optional",2053951509).cljs$core$IFn$_invoke$arity$1(_QMARK_p) === true))));
});
malli.util._entry = (function malli$util$_entry(p__62895,p__62896,merge_required,merge,options){
var vec__62897 = p__62895;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62897,(0),null);
var _QMARK_p1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62897,(1),null);
var s1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62897,(2),null);
var e1 = vec__62897;
var vec__62900 = p__62896;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62900,(0),null);
var _QMARK_p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62900,(1),null);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62900,(2),null);
var e2 = vec__62900;
var required = (function (){var G__62903 = malli.util._required_map_entry_QMARK_(e1);
var G__62904 = malli.util._required_map_entry_QMARK_(e2);
return (merge_required.cljs$core$IFn$_invoke$arity$2 ? merge_required.cljs$core$IFn$_invoke$arity$2(G__62903,G__62904) : merge_required.call(null,G__62903,G__62904));
})();
var p = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([_QMARK_p1,_QMARK_p2], 0));
return malli.util._simplify_map_entry(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p,new cljs.core.Keyword(null,"optional","optional",2053951509),cljs.core.not(required)),(merge.cljs$core$IFn$_invoke$arity$3 ? merge.cljs$core$IFn$_invoke$arity$3(s1,s2,options) : merge.call(null,s1,s2,options))], null));
});
malli.util._open_map_QMARK_ = (function malli$util$_open_map_QMARK_(schema,options){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"map","map",1371690461),malli.core.type.cljs$core$IFn$_invoke$arity$2(schema,options))) && ((!(new cljs.core.Keyword(null,"closed","closed",-919675359).cljs$core$IFn$_invoke$arity$1(malli.core.properties.cljs$core$IFn$_invoke$arity$1(schema)) === false))));
});
/**
 * Prewalks the Schema recursively with a 3-arity fn [schema path options], returns with
 *   and as soon as the function returns non-null value.
 */
malli.util.find_first = (function malli$util$find_first(var_args){
var G__62909 = arguments.length;
switch (G__62909) {
case 2:
return malli.util.find_first.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.find_first.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.find_first.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,f){
return malli.util.find_first.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,f,null);
}));

(malli.util.find_first.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,f,options){
var result = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
malli.core._walk(malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,options),(function (){
if((typeof malli !== 'undefined') && (typeof malli.util !== 'undefined') && (typeof malli.util.t_malli$util62910 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {malli.core.Walker}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.util.t_malli$util62910 = (function (_QMARK_schema,f,options,result,meta62911){
this._QMARK_schema = _QMARK_schema;
this.f = f;
this.options = options;
this.result = result;
this.meta62911 = meta62911;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.util.t_malli$util62910.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_62912,meta62911__$1){
var self__ = this;
var _62912__$1 = this;
return (new malli.util.t_malli$util62910(self__._QMARK_schema,self__.f,self__.options,self__.result,meta62911__$1));
}));

(malli.util.t_malli$util62910.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_62912){
var self__ = this;
var _62912__$1 = this;
return self__.meta62911;
}));

(malli.util.t_malli$util62910.prototype.malli$core$Walker$ = cljs.core.PROTOCOL_SENTINEL);

(malli.util.t_malli$util62910.prototype.malli$core$Walker$_accept$arity$4 = (function (_,s,path,options__$1){
var self__ = this;
var ___$1 = this;
return cljs.core.not((function (){var or__4253__auto__ = cljs.core.deref(self__.result);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return cljs.core.reset_BANG_(self__.result,(self__.f.cljs$core$IFn$_invoke$arity$3 ? self__.f.cljs$core$IFn$_invoke$arity$3(s,path,options__$1) : self__.f.call(null,s,path,options__$1)));
}
})());
}));

(malli.util.t_malli$util62910.prototype.malli$core$Walker$_inner$arity$4 = (function (this$,s,path,options__$1){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(cljs.core.deref(self__.result))){
return null;
} else {
return malli.core._walk(s,this$__$1,path,options__$1);
}
}));

(malli.util.t_malli$util62910.prototype.malli$core$Walker$_outer$arity$5 = (function (_,___$1,___$2,___$3,___$4){
var self__ = this;
var ___$5 = this;
return null;
}));

(malli.util.t_malli$util62910.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?schema","?schema",-271534072,null),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"options","options",1740170016,null),new cljs.core.Symbol(null,"result","result",-1239343558,null),new cljs.core.Symbol(null,"meta62911","meta62911",500427725,null)], null);
}));

(malli.util.t_malli$util62910.cljs$lang$type = true);

(malli.util.t_malli$util62910.cljs$lang$ctorStr = "malli.util/t_malli$util62910");

(malli.util.t_malli$util62910.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"malli.util/t_malli$util62910");
}));

/**
 * Positional factory function for malli.util/t_malli$util62910.
 */
malli.util.__GT_t_malli$util62910 = (function malli$util$__GT_t_malli$util62910(_QMARK_schema__$1,f__$1,options__$1,result__$1,meta62911){
return (new malli.util.t_malli$util62910(_QMARK_schema__$1,f__$1,options__$1,result__$1,meta62911));
});

}

return (new malli.util.t_malli$util62910(_QMARK_schema,f,options,result,cljs.core.PersistentArrayMap.EMPTY));
})()
,cljs.core.PersistentVector.EMPTY,options);

return cljs.core.deref(result);
}));

(malli.util.find_first.cljs$lang$maxFixedArity = 3);

/**
 * Merges two schemas into one with the following rules:
 * 
 *   * if either schemas is `nil`, the other one is used, regardless of value
 *   * with two :map schemas, both keys and values are merged
 *   * for :and schemas, the first child is used in merge, rest kept as-is
 *   * with two :map entries, `:merge-entries` fn is used (default last one wins)
 *   * with any other schemas, `:merge-default` fn is used (default last one wins)
 * 
 *   | key               | description
 *   | ------------------|-------------
 *   | `:merge-default`  | `schema1 schema2 options -> schema` fn to merge unknown entries
 *   | `:merge-required` | `boolean boolean -> boolean` fn to resolve how required keys are merged
 */
malli.util.merge = (function malli$util$merge(var_args){
var G__62918 = arguments.length;
switch (G__62918) {
case 2:
return malli.util.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.merge.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.merge.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema1,_QMARK_schema2){
return malli.util.merge.cljs$core$IFn$_invoke$arity$3(_QMARK_schema1,_QMARK_schema2,null);
}));

(malli.util.merge.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema1,_QMARK_schema2,options){
var s1 = (cljs.core.truth_(_QMARK_schema1)?malli.core.deref_all.cljs$core$IFn$_invoke$arity$1(malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema1,options)):null);
var s2 = (cljs.core.truth_(_QMARK_schema2)?malli.core.deref_all.cljs$core$IFn$_invoke$arity$1(malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema2,options)):null);
var t1 = (cljs.core.truth_(s1)?malli.core.type.cljs$core$IFn$_invoke$arity$1(s1):null);
var t2 = (cljs.core.truth_(s2)?malli.core.type.cljs$core$IFn$_invoke$arity$1(s2):null);
var map__62919 = options;
var map__62919__$1 = cljs.core.__destructure_map(map__62919);
var merge_default = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__62919__$1,new cljs.core.Keyword(null,"merge-default","merge-default",1152742083),(function (_,s2__$1,___$1){
return s2__$1;
}));
var merge_required = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__62919__$1,new cljs.core.Keyword(null,"merge-required","merge-required",75277811),(function (_,r2){
return r2;
}));
var bear = (function (p1,p2){
if(cljs.core.truth_((function (){var and__4251__auto__ = p1;
if(cljs.core.truth_(and__4251__auto__)){
return p2;
} else {
return and__4251__auto__;
}
})())){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1,p2], 0));
} else {
var or__4253__auto__ = p1;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return p2;
}
}
});
var tear = (function (t,s){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"map","map",1371690461),t)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,s], null);
} else {
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [malli.core.properties.cljs$core$IFn$_invoke$arity$1(s)], null),malli.core.children.cljs$core$IFn$_invoke$arity$1(s));
}
});
var join = (function (p__62924,p__62925){
var vec__62926 = p__62924;
var seq__62927 = cljs.core.seq(vec__62926);
var first__62928 = cljs.core.first(seq__62927);
var seq__62927__$1 = cljs.core.next(seq__62927);
var p1 = first__62928;
var first__62928__$1 = cljs.core.first(seq__62927__$1);
var seq__62927__$2 = cljs.core.next(seq__62927__$1);
var c1 = first__62928__$1;
var cs1 = seq__62927__$2;
var vec__62929 = p__62925;
var seq__62930 = cljs.core.seq(vec__62929);
var first__62931 = cljs.core.first(seq__62930);
var seq__62930__$1 = cljs.core.next(seq__62930);
var p2 = first__62931;
var first__62931__$1 = cljs.core.first(seq__62930__$1);
var seq__62930__$2 = cljs.core.next(seq__62930__$1);
var c2 = first__62931__$1;
var cs2 = seq__62930__$2;
return malli.core.into_schema.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"and","and",-971899817),bear(p1,p2),cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [malli.util.merge.cljs$core$IFn$_invoke$arity$3(c1,c2,options)], null),cs1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cs2], 0)),options);
});
if((s1 == null)){
return s2;
} else {
if((s2 == null)){
return s1;
} else {
if(cljs.core.not((function (){var and__4251__auto__ = (function (){var fexpr__62935 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"and","and",-971899817),null,new cljs.core.Keyword(null,"map","map",1371690461),null], null), null);
return (fexpr__62935.cljs$core$IFn$_invoke$arity$1 ? fexpr__62935.cljs$core$IFn$_invoke$arity$1(t1) : fexpr__62935.call(null,t1));
})();
if(cljs.core.truth_(and__4251__auto__)){
var fexpr__62936 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"and","and",-971899817),null,new cljs.core.Keyword(null,"map","map",1371690461),null], null), null);
return (fexpr__62936.cljs$core$IFn$_invoke$arity$1 ? fexpr__62936.cljs$core$IFn$_invoke$arity$1(t2) : fexpr__62936.call(null,t2));
} else {
return and__4251__auto__;
}
})())){
return (merge_default.cljs$core$IFn$_invoke$arity$3 ? merge_default.cljs$core$IFn$_invoke$arity$3(s1,s2,options) : merge_default.call(null,s1,s2,options));
} else {
if((!(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t1,new cljs.core.Keyword(null,"map","map",1371690461))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t2,new cljs.core.Keyword(null,"map","map",1371690461))))))){
return join(tear(t1,s1),tear(t2,s2));
} else {
var p = bear(malli.core._properties(s1),malli.core._properties(s2));
var ks = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
var children = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (form,p__62937){
var vec__62938 = p__62937;
var k2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62938,(0),null);
var e2 = vec__62938;
if(cljs.core.truth_((function (){var fexpr__62941 = cljs.core.deref(ks);
return (fexpr__62941.cljs$core$IFn$_invoke$arity$1 ? fexpr__62941.cljs$core$IFn$_invoke$arity$1(k2) : fexpr__62941.call(null,k2));
})())){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc_SINGLEQUOTE_,p__62942){
var vec__62943 = p__62942;
var k1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62943,(0),null);
var e1 = vec__62943;
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc_SINGLEQUOTE_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k1,k2))?malli.util._entry(e1,e2,merge_required,malli.util.merge,options):e1));
}),cljs.core.PersistentVector.EMPTY,form);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(ks,cljs.core.conj,k2);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(form,e2);
}
}),cljs.core.PersistentVector.EMPTY,cljs.core.into.cljs$core$IFn$_invoke$arity$2(malli.core._children(s1),malli.core._children(s2)));
return malli.core.into_schema.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"map","map",1371690461),p,children,options);

}
}
}
}
}));

(malli.util.merge.cljs$lang$maxFixedArity = 3);

/**
 * Union of two schemas. See [[merge]] for more details.
 */
malli.util.union = (function malli$util$union(var_args){
var G__62947 = arguments.length;
switch (G__62947) {
case 2:
return malli.util.union.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.union.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.union.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema1,_QMARK_schema2){
return malli.util.union.cljs$core$IFn$_invoke$arity$3(_QMARK_schema1,_QMARK_schema2,null);
}));

(malli.util.union.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema1,_QMARK_schema2,options){
var merge_default = (function (s1,s2,options__$1){
if(cljs.core.truth_(malli.util.equals.cljs$core$IFn$_invoke$arity$2(s1,s2))){
return s1;
} else {
return malli.core.schema.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"or","or",235744169),s1,s2], null),options__$1);
}
});
var merge_required = (function (r1,r2){
var and__4251__auto__ = r1;
if(cljs.core.truth_(and__4251__auto__)){
return r2;
} else {
return and__4251__auto__;
}
});
return malli.util.merge.cljs$core$IFn$_invoke$arity$3(_QMARK_schema1,_QMARK_schema2,cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(options,new cljs.core.Keyword(null,"merge-default","merge-default",1152742083),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,merge_default)),new cljs.core.Keyword(null,"merge-required","merge-required",75277811),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,merge_required)));
}));

(malli.util.union.cljs$lang$maxFixedArity = 3);

/**
 * Returns a Schema instance with updated properties.
 */
malli.util.update_properties = (function malli$util$update_properties(var_args){
var args__4870__auto__ = [];
var len__4864__auto___63160 = arguments.length;
var i__4865__auto___63161 = (0);
while(true){
if((i__4865__auto___63161 < len__4864__auto___63160)){
args__4870__auto__.push((arguments[i__4865__auto___63161]));

var G__63162 = (i__4865__auto___63161 + (1));
i__4865__auto___63161 = G__63162;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((2) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((2)),(0),null)):null);
return malli.util.update_properties.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4871__auto__);
});

(malli.util.update_properties.cljs$core$IFn$_invoke$arity$variadic = (function (_QMARK_schema,f,args){
var schema = malli.core.schema.cljs$core$IFn$_invoke$arity$1(_QMARK_schema);
return malli.core._set_properties(schema,cljs.core.not_empty(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,malli.core._properties(schema),args)));
}));

(malli.util.update_properties.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(malli.util.update_properties.cljs$lang$applyTo = (function (seq62948){
var G__62949 = cljs.core.first(seq62948);
var seq62948__$1 = cljs.core.next(seq62948);
var G__62950 = cljs.core.first(seq62948__$1);
var seq62948__$2 = cljs.core.next(seq62948__$1);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__62949,G__62950,seq62948__$2);
}));

/**
 * Closes recursively all :map schemas by adding `{:closed true}`
 *   property, unless schema explicitely open with `{:closed false}`
 */
malli.util.closed_schema = (function malli$util$closed_schema(var_args){
var G__62952 = arguments.length;
switch (G__62952) {
case 1:
return malli.util.closed_schema.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.closed_schema.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.closed_schema.cljs$core$IFn$_invoke$arity$1 = (function (_QMARK_schema){
return malli.util.closed_schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,null);
}));

(malli.util.closed_schema.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,options){
return malli.core.walk.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,malli.core.schema_walker((function (schema){
if(malli.util._open_map_QMARK_(schema,options)){
return malli.util.update_properties.cljs$core$IFn$_invoke$arity$variadic(schema,cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"closed","closed",-919675359),true], 0));
} else {
return schema;
}
})),options);
}));

(malli.util.closed_schema.cljs$lang$maxFixedArity = 2);

/**
 * Opens recursively all :map schemas by removing `:closed`
 *   property, unless schema explicitely open with `{:closed false}`
 */
malli.util.open_schema = (function malli$util$open_schema(var_args){
var G__62954 = arguments.length;
switch (G__62954) {
case 1:
return malli.util.open_schema.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.open_schema.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.open_schema.cljs$core$IFn$_invoke$arity$1 = (function (_QMARK_schema){
return malli.util.open_schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,null);
}));

(malli.util.open_schema.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,options){
return malli.core.walk.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,malli.core.schema_walker((function (schema){
if(malli.util._open_map_QMARK_(schema,options)){
return malli.util.update_properties.cljs$core$IFn$_invoke$arity$variadic(schema,cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"closed","closed",-919675359)], 0));
} else {
return schema;
}
})),options);
}));

(malli.util.open_schema.cljs$lang$maxFixedArity = 2);

/**
 * Returns all subschemas for unique paths as a vector of maps with :schema, :path and :in keys.
 * Walks over :schema references and top-level :refs. See [[malli.core/-walk]] for all options.
 */
malli.util.subschemas = (function malli$util$subschemas(var_args){
var G__62962 = arguments.length;
switch (G__62962) {
case 1:
return malli.util.subschemas.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.subschemas.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.subschemas.cljs$core$IFn$_invoke$arity$1 = (function (_QMARK_schema){
return malli.util.subschemas.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,null);
}));

(malli.util.subschemas.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,options){
var schema = malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,options);
var options__$1 = (function (){var ref = (function (){var and__4251__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"ref","ref",1289896967),malli.core.type.cljs$core$IFn$_invoke$arity$1(schema));
if(and__4251__auto__){
return malli.core._ref(schema);
} else {
return and__4251__auto__;
}
})();
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(options,new cljs.core.Keyword("malli.core","walk-schema-refs","malli.core/walk-schema-refs",-1140065954),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,true)),new cljs.core.Keyword("malli.core","walk-refs","malli.core/walk-refs",755904802),(function (f){
return (function (p1__62960_SHARP_){
var or__4253__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ref,p1__62960_SHARP_);
if(or__4253__auto__){
return or__4253__auto__;
} else {
var fexpr__62963 = malli.core._boolean_fn(f);
return (fexpr__62963.cljs$core$IFn$_invoke$arity$1 ? fexpr__62963.cljs$core$IFn$_invoke$arity$1(p1__62960_SHARP_) : fexpr__62963.call(null,p1__62960_SHARP_));
}
});
}));
})();
var state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
malli.util.find_first.cljs$core$IFn$_invoke$arity$3(schema,(function (s,p,_){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),p,new cljs.core.Keyword(null,"in","in",-1531184865),(malli.util.path__GT_in.cljs$core$IFn$_invoke$arity$2 ? malli.util.path__GT_in.cljs$core$IFn$_invoke$arity$2(schema,p) : malli.util.path__GT_in.call(null,schema,p)),new cljs.core.Keyword(null,"schema","schema",-1582001791),s], null));

return null;
}),options__$1);

return cljs.core.deref(state);
}));

(malli.util.subschemas.cljs$lang$maxFixedArity = 2);

/**
 * Returns a sequence of distinct (f x) values)
 */
malli.util.distinct_by = (function malli$util$distinct_by(f,coll){
var seen = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (x){
var v = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(x) : f.call(null,x));
if(cljs.core.truth_((function (){var fexpr__62964 = cljs.core.deref(seen);
return (fexpr__62964.cljs$core$IFn$_invoke$arity$1 ? fexpr__62964.cljs$core$IFn$_invoke$arity$1(v) : fexpr__62964.call(null,v));
})())){
return null;
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(seen,cljs.core.conj,v);
}
}),coll);
});
/**
 * Returns a value path for a given Schema and schema path
 */
malli.util.path__GT_in = (function malli$util$path__GT_in(schema,path){
var i = (0);
var s = schema;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
var or__4253__auto__ = (function (){var and__4251__auto__ = (i >= cljs.core.count(path));
if(and__4251__auto__){
return acc;
} else {
return and__4251__auto__;
}
})();
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
var G__63195 = (i + (1));
var G__63196 = malli.core._get(s,(path.cljs$core$IFn$_invoke$arity$1 ? path.cljs$core$IFn$_invoke$arity$1(i) : path.call(null,i)),null);
var G__63197 = (function (){var G__62966 = acc;
if(cljs.core.truth_(malli.core._keep(s))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__62966,(path.cljs$core$IFn$_invoke$arity$1 ? path.cljs$core$IFn$_invoke$arity$1(i) : path.call(null,i)));
} else {
return G__62966;
}
})();
i = G__63195;
s = G__63196;
acc = G__63197;
continue;
}
break;
}
});
/**
 * Returns a vector of schema paths for a given Schema and value path
 */
malli.util.in__GT_paths = (function malli$util$in__GT_paths(schema,in$){
var state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var in_equals = (function (p__62968,p__62969){
while(true){
var vec__62970 = p__62968;
var seq__62971 = cljs.core.seq(vec__62970);
var first__62972 = cljs.core.first(seq__62971);
var seq__62971__$1 = cljs.core.next(seq__62971);
var x = first__62972;
var xs = seq__62971__$1;
var vec__62973 = p__62969;
var seq__62974 = cljs.core.seq(vec__62973);
var first__62975 = cljs.core.first(seq__62974);
var seq__62974__$1 = cljs.core.next(seq__62974);
var y = first__62975;
var ys = seq__62974__$1;
if(cljs.core.truth_((function (){var and__4251__auto__ = x;
if(cljs.core.truth_(and__4251__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,y);
} else {
return and__4251__auto__;
}
})())){
var G__63198 = xs;
var G__63199 = ys;
p__62968 = G__63198;
p__62969 = G__63199;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,y)){
return true;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("malli.core","in","malli.core/in",-1208578537),x)){
var G__63200 = xs;
var G__63201 = ys;
p__62968 = G__63200;
p__62969 = G__63201;
continue;
} else {
return null;
}
}
}
break;
}
});
var parent_exists = (function (v1,v2){
var i = (function (){var x__4339__auto__ = cljs.core.count(v1);
var y__4340__auto__ = cljs.core.count(v2);
return ((x__4339__auto__ < y__4340__auto__) ? x__4339__auto__ : y__4340__auto__);
})();
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(v1,(0),i),cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(v2,(0),i));
});
malli.util.find_first.cljs$core$IFn$_invoke$arity$2(schema,(function (_,path,___$1){
if(cljs.core.truth_((function (){var and__4251__auto__ = in_equals(malli.util.path__GT_in(schema,path),in$);
if(cljs.core.truth_(and__4251__auto__)){
return cljs.core.not(cljs.core.some((function (p1__62967_SHARP_){
return parent_exists(path,p1__62967_SHARP_);
}),cljs.core.deref(state)));
} else {
return and__4251__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.conj,path);

return null;
} else {
return null;
}
}));

return cljs.core.deref(state);
});
/**
 * Transforms entries with f.
 */
malli.util.transform_entries = (function malli$util$transform_entries(var_args){
var G__62981 = arguments.length;
switch (G__62981) {
case 2:
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.transform_entries.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,f){
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,f,null);
}));

(malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,f,options){
var schema = malli.core.deref_all.cljs$core$IFn$_invoke$arity$1(malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,options));
return malli.core.into_schema.cljs$core$IFn$_invoke$arity$4(malli.core._parent(schema),malli.core._properties(schema),(function (){var G__62982 = malli.core._children(schema);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__62982) : f.call(null,G__62982));
})(),(function (){var or__4253__auto__ = malli.core.options.cljs$core$IFn$_invoke$arity$1(schema);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return options;
}
})());
}));

(malli.util.transform_entries.cljs$lang$maxFixedArity = 3);

/**
 * Makes map keys optional.
 */
malli.util.optional_keys = (function malli$util$optional_keys(var_args){
var G__62987 = arguments.length;
switch (G__62987) {
case 1:
return malli.util.optional_keys.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.optional_keys.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.optional_keys.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.optional_keys.cljs$core$IFn$_invoke$arity$1 = (function (_QMARK_schema){
return malli.util.optional_keys.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,null,null);
}));

(malli.util.optional_keys.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,_QMARK_keys){
var vec__62988 = ((cljs.core.map_QMARK_(_QMARK_keys))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,_QMARK_keys], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_keys,null], null));
var keys = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62988,(0),null);
var options = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62988,(1),null);
return malli.util.optional_keys.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,keys,options);
}));

(malli.util.optional_keys.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,keys,options){
var accept = (cljs.core.truth_(keys)?cljs.core.set(keys):cljs.core.constantly(true));
var mapper = (function (p__62991){
var vec__62992 = p__62991;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62992,(0),null);
var e = vec__62992;
if(cljs.core.truth_((accept.cljs$core$IFn$_invoke$arity$1 ? accept.cljs$core$IFn$_invoke$arity$1(k) : accept.call(null,k)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(e,(1),cljs.core.assoc,new cljs.core.Keyword(null,"optional","optional",2053951509),true);
} else {
return e;
}
});
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,(function (p1__62983_SHARP_){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(mapper,p1__62983_SHARP_);
}),options);
}));

(malli.util.optional_keys.cljs$lang$maxFixedArity = 3);

/**
 * Makes map keys required.
 */
malli.util.required_keys = (function malli$util$required_keys(var_args){
var G__62997 = arguments.length;
switch (G__62997) {
case 1:
return malli.util.required_keys.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.required_keys.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.required_keys.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.required_keys.cljs$core$IFn$_invoke$arity$1 = (function (_QMARK_schema){
return malli.util.required_keys.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,null,null);
}));

(malli.util.required_keys.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,_QMARK_keys){
var vec__63001 = ((cljs.core.map_QMARK_(_QMARK_keys))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,_QMARK_keys], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_keys,null], null));
var keys = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63001,(0),null);
var options = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63001,(1),null);
return malli.util.required_keys.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,keys,options);
}));

(malli.util.required_keys.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,keys,options){
var accept = (cljs.core.truth_(keys)?cljs.core.set(keys):cljs.core.constantly(true));
var required = (function (p){
var p_SINGLEQUOTE_ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p,new cljs.core.Keyword(null,"optional","optional",2053951509));
if(cljs.core.seq(p_SINGLEQUOTE_)){
return p_SINGLEQUOTE_;
} else {
return null;
}
});
var mapper = (function (p__63004){
var vec__63005 = p__63004;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63005,(0),null);
var e = vec__63005;
if(cljs.core.truth_((accept.cljs$core$IFn$_invoke$arity$1 ? accept.cljs$core$IFn$_invoke$arity$1(k) : accept.call(null,k)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(e,(1),required);
} else {
return e;
}
});
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,(function (p1__62995_SHARP_){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(mapper,p1__62995_SHARP_);
}),options);
}));

(malli.util.required_keys.cljs$lang$maxFixedArity = 3);

/**
 * Like [[clojure.core/select-keys]], but for EntrySchemas.
 */
malli.util.select_keys = (function malli$util$select_keys(var_args){
var G__63010 = arguments.length;
switch (G__63010) {
case 2:
return malli.util.select_keys.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.select_keys.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.select_keys.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,keys){
return malli.util.select_keys.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,keys,null);
}));

(malli.util.select_keys.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,keys,options){
var key_set = cljs.core.set(keys);
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,(function (p1__63008_SHARP_){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__63012){
var vec__63013 = p__63012;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63013,(0),null);
return (key_set.cljs$core$IFn$_invoke$arity$1 ? key_set.cljs$core$IFn$_invoke$arity$1(k) : key_set.call(null,k));
}),p1__63008_SHARP_);
}),options);
}));

(malli.util.select_keys.cljs$lang$maxFixedArity = 3);

/**
 * Like [[clojure.set/rename-keys]], but for EntrySchemas. Collisions are resolved in favor of the renamed key, like `assoc`-ing.
 */
malli.util.rename_keys = (function malli$util$rename_keys(var_args){
var G__63017 = arguments.length;
switch (G__63017) {
case 2:
return malli.util.rename_keys.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.rename_keys.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.rename_keys.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,kmap){
return malli.util.rename_keys.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,kmap,null);
}));

(malli.util.rename_keys.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,kmap,options){
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,(function (entries){
var source_keys = cljs.core.set(cljs.core.keys(kmap));
var target_keys = cljs.core.set(cljs.core.vals(kmap));
var remove_conflicts = (function (p__63018){
var vec__63019 = p__63018;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63019,(0),null);
var or__4253__auto__ = (source_keys.cljs$core$IFn$_invoke$arity$1 ? source_keys.cljs$core$IFn$_invoke$arity$1(k) : source_keys.call(null,k));
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return cljs.core.not((target_keys.cljs$core$IFn$_invoke$arity$1 ? target_keys.cljs$core$IFn$_invoke$arity$1(k) : target_keys.call(null,k)));
}
});
var alter_keys = (function (p__63022){
var vec__63023 = p__63022;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63023,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63023,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63023,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.get.cljs$core$IFn$_invoke$arity$3(kmap,k,k),m,v], null);
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(alter_keys,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(remove_conflicts,entries));
}),options);
}));

(malli.util.rename_keys.cljs$lang$maxFixedArity = 3);

/**
 * Like [[clojure.core/dissoc]], but for EntrySchemas.
 */
malli.util.dissoc = (function malli$util$dissoc(var_args){
var G__63028 = arguments.length;
switch (G__63028) {
case 2:
return malli.util.dissoc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.dissoc.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.dissoc.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,key){
return malli.util.dissoc.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,key,null);
}));

(malli.util.dissoc.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,key,options){
return malli.util.transform_entries.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,(function (p1__63026_SHARP_){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__63029){
var vec__63030 = p__63029;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63030,(0),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,k);
}),p1__63026_SHARP_);
}),options);
}));

(malli.util.dissoc.cljs$lang$maxFixedArity = 3);

/**
 * Like [[clojure.core/find]], but for EntrySchemas.
 */
malli.util.find = (function malli$util$find(var_args){
var G__63034 = arguments.length;
switch (G__63034) {
case 2:
return malli.util.find.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.find.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.find.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,k){
return malli.util.find.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,k,null);
}));

(malli.util.find.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,k,options){
var schema = malli.core.schema.cljs$core$IFn$_invoke$arity$2((function (){var or__4253__auto__ = _QMARK_schema;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return new cljs.core.Keyword(null,"map","map",1371690461);
}
})(),options);
if(cljs.core.truth_(schema)){
return malli.core._get(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("malli.core","find","malli.core/find",163301512),k], null),null);
} else {
return null;
}
}));

(malli.util.find.cljs$lang$maxFixedArity = 3);

/**
 * Like [[clojure.core/get]], but for LensSchemas.
 */
malli.util.get = (function malli$util$get(var_args){
var G__63036 = arguments.length;
switch (G__63036) {
case 2:
return malli.util.get.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.get.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return malli.util.get.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.get.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,k){
return malli.util.get.cljs$core$IFn$_invoke$arity$4(_QMARK_schema,k,null,null);
}));

(malli.util.get.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,k,default$){
return malli.util.get.cljs$core$IFn$_invoke$arity$4(_QMARK_schema,k,default$,null);
}));

(malli.util.get.cljs$core$IFn$_invoke$arity$4 = (function (_QMARK_schema,k,default$,options){
var schema = malli.core.schema.cljs$core$IFn$_invoke$arity$2((function (){var or__4253__auto__ = _QMARK_schema;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return new cljs.core.Keyword(null,"map","map",1371690461);
}
})(),options);
if(cljs.core.truth_(schema)){
return malli.core._get(schema,k,default$);
} else {
return null;
}
}));

(malli.util.get.cljs$lang$maxFixedArity = 4);

/**
 * Like [[clojure.core/assoc]], but for LensSchemas.
 */
malli.util.assoc = (function malli$util$assoc(var_args){
var G__63041 = arguments.length;
switch (G__63041) {
case 3:
return malli.util.assoc.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return malli.util.assoc.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.assoc.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,key,value){
return malli.util.assoc.cljs$core$IFn$_invoke$arity$4(_QMARK_schema,key,value,null);
}));

(malli.util.assoc.cljs$core$IFn$_invoke$arity$4 = (function (_QMARK_schema,key,value,options){
return malli.core._set(malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,options),key,value);
}));

(malli.util.assoc.cljs$lang$maxFixedArity = 4);

/**
 * Like [[clojure.core/update]], but for LensSchema instances.
 */
malli.util.update = (function malli$util$update(var_args){
var args__4870__auto__ = [];
var len__4864__auto___63262 = arguments.length;
var i__4865__auto___63263 = (0);
while(true){
if((i__4865__auto___63263 < len__4864__auto___63262)){
args__4870__auto__.push((arguments[i__4865__auto___63263]));

var G__63266 = (i__4865__auto___63263 + (1));
i__4865__auto___63263 = G__63266;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((3) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((3)),(0),null)):null);
return malli.util.update.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4871__auto__);
});

(malli.util.update.cljs$core$IFn$_invoke$arity$variadic = (function (schema,key,f,args){
return malli.core._set(malli.core.schema.cljs$core$IFn$_invoke$arity$1(schema),key,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,malli.util.get.cljs$core$IFn$_invoke$arity$2(schema,key),args));
}));

(malli.util.update.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(malli.util.update.cljs$lang$applyTo = (function (seq63042){
var G__63043 = cljs.core.first(seq63042);
var seq63042__$1 = cljs.core.next(seq63042);
var G__63044 = cljs.core.first(seq63042__$1);
var seq63042__$2 = cljs.core.next(seq63042__$1);
var G__63045 = cljs.core.first(seq63042__$2);
var seq63042__$3 = cljs.core.next(seq63042__$2);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__63043,G__63044,G__63045,seq63042__$3);
}));

/**
 * Like [[clojure.core/get-in]], but for LensSchemas.
 */
malli.util.get_in = (function malli$util$get_in(var_args){
var G__63050 = arguments.length;
switch (G__63050) {
case 2:
return malli.util.get_in.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return malli.util.get_in.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return malli.util.get_in.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.get_in.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,ks){
return malli.util.get_in.cljs$core$IFn$_invoke$arity$4(_QMARK_schema,ks,null,null);
}));

(malli.util.get_in.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,ks,default$){
return malli.util.get_in.cljs$core$IFn$_invoke$arity$4(_QMARK_schema,ks,default$,null);
}));

(malli.util.get_in.cljs$core$IFn$_invoke$arity$4 = (function (_QMARK_schema,p__63054,default$,options){
var vec__63055 = p__63054;
var seq__63056 = cljs.core.seq(vec__63055);
var first__63057 = cljs.core.first(seq__63056);
var seq__63056__$1 = cljs.core.next(seq__63056);
var k = first__63057;
var ks = seq__63056__$1;
var schema = malli.core.schema.cljs$core$IFn$_invoke$arity$2((function (){var or__4253__auto__ = _QMARK_schema;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return new cljs.core.Keyword(null,"map","map",1371690461);
}
})(),options);
if(cljs.core.not(k)){
return schema;
} else {
var sentinel = ({});
var schema__$1 = malli.util.get.cljs$core$IFn$_invoke$arity$3(schema,k,sentinel);
if((schema__$1 === sentinel)){
return default$;
} else {
if(ks){
return malli.util.get_in.cljs$core$IFn$_invoke$arity$3(schema__$1,ks,default$);
} else {
return schema__$1;

}
}
}
}));

(malli.util.get_in.cljs$lang$maxFixedArity = 4);

/**
 * Like [[clojure.core/assoc-in]], but for LensSchemas.
 */
malli.util.assoc_in = (function malli$util$assoc_in(var_args){
var G__63068 = arguments.length;
switch (G__63068) {
case 3:
return malli.util.assoc_in.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return malli.util.assoc_in.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.assoc_in.cljs$core$IFn$_invoke$arity$3 = (function (_QMARK_schema,ks,value){
return malli.util.assoc_in.cljs$core$IFn$_invoke$arity$4(_QMARK_schema,ks,value,null);
}));

(malli.util.assoc_in.cljs$core$IFn$_invoke$arity$4 = (function (_QMARK_schema,p__63069,value,options){
var vec__63070 = p__63069;
var seq__63071 = cljs.core.seq(vec__63070);
var first__63072 = cljs.core.first(seq__63071);
var seq__63071__$1 = cljs.core.next(seq__63071);
var k = first__63072;
var ks = seq__63071__$1;
var schema = malli.core.schema.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,options);
return malli.util.assoc.cljs$core$IFn$_invoke$arity$3(schema,k,((ks)?malli.util.assoc_in.cljs$core$IFn$_invoke$arity$3(malli.util.get.cljs$core$IFn$_invoke$arity$3(schema,k,malli.core.schema.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"map","map",1371690461),malli.core.options.cljs$core$IFn$_invoke$arity$1(schema))),ks,value):value));
}));

(malli.util.assoc_in.cljs$lang$maxFixedArity = 4);

/**
 * Like [[clojure.core/update-in]], but for LensSchemas.
 */
malli.util.update_in = (function malli$util$update_in(var_args){
var args__4870__auto__ = [];
var len__4864__auto___63310 = arguments.length;
var i__4865__auto___63311 = (0);
while(true){
if((i__4865__auto___63311 < len__4864__auto___63310)){
args__4870__auto__.push((arguments[i__4865__auto___63311]));

var G__63315 = (i__4865__auto___63311 + (1));
i__4865__auto___63311 = G__63315;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((3) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((3)),(0),null)):null);
return malli.util.update_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4871__auto__);
});

(malli.util.update_in.cljs$core$IFn$_invoke$arity$variadic = (function (schema,ks,f,args){
var up = (function malli$util$up(s,p__63081,f__$1,args__$1){
var vec__63082 = p__63081;
var seq__63083 = cljs.core.seq(vec__63082);
var first__63084 = cljs.core.first(seq__63083);
var seq__63083__$1 = cljs.core.next(seq__63083);
var k = first__63084;
var ks__$1 = seq__63083__$1;
return malli.util.assoc.cljs$core$IFn$_invoke$arity$3(s,k,((ks__$1)?malli$util$up(malli.util.get.cljs$core$IFn$_invoke$arity$3(s,k,malli.core.schema.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"map","map",1371690461),malli.core.options.cljs$core$IFn$_invoke$arity$1(schema))),ks__$1,f__$1,args__$1):cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f__$1,malli.util.get.cljs$core$IFn$_invoke$arity$2(s,k),args__$1)));
});
return up(schema,ks,f,args);
}));

(malli.util.update_in.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(malli.util.update_in.cljs$lang$applyTo = (function (seq63073){
var G__63074 = cljs.core.first(seq63073);
var seq63073__$1 = cljs.core.next(seq63073);
var G__63075 = cljs.core.first(seq63073__$1);
var seq63073__$2 = cljs.core.next(seq63073__$1);
var G__63076 = cljs.core.first(seq63073__$2);
var seq63073__$3 = cljs.core.next(seq63073__$2);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__63074,G__63075,G__63076,seq63073__$3);
}));

malli.util._map_syntax_walker = (function malli$util$_map_syntax_walker(schema,_,children,___$1){
var properties = malli.core.properties.cljs$core$IFn$_invoke$arity$1(schema);
var options = malli.core.options.cljs$core$IFn$_invoke$arity$1(schema);
var r = (cljs.core.truth_(properties)?(properties.cljs$core$IFn$_invoke$arity$1 ? properties.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"registry","registry",1021159018)) : properties.call(null,new cljs.core.Keyword(null,"registry","registry",1021159018))):null);
var properties__$1 = (cljs.core.truth_(r)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(properties,new cljs.core.Keyword(null,"registry","registry",1021159018),malli.core._property_registry(r,options,malli.core._form)):properties);
var G__63085 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),malli.core.type.cljs$core$IFn$_invoke$arity$1(schema)], null);
var G__63085__$1 = ((cljs.core.seq(properties__$1))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63085,new cljs.core.Keyword(null,"properties","properties",685819552),properties__$1):G__63085);
if(cljs.core.seq(children)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__63085__$1,new cljs.core.Keyword(null,"children","children",-940561982),children);
} else {
return G__63085__$1;
}
});
malli.util.to_map_syntax = (function malli$util$to_map_syntax(var_args){
var G__63087 = arguments.length;
switch (G__63087) {
case 1:
return malli.util.to_map_syntax.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.to_map_syntax.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.to_map_syntax.cljs$core$IFn$_invoke$arity$1 = (function (_QMARK_schema){
return malli.util.to_map_syntax.cljs$core$IFn$_invoke$arity$2(_QMARK_schema,null);
}));

(malli.util.to_map_syntax.cljs$core$IFn$_invoke$arity$2 = (function (_QMARK_schema,options){
return malli.core.walk.cljs$core$IFn$_invoke$arity$3(_QMARK_schema,malli.util._map_syntax_walker,options);
}));

(malli.util.to_map_syntax.cljs$lang$maxFixedArity = 2);

malli.util.from_map_syntax = (function malli$util$from_map_syntax(var_args){
var G__63092 = arguments.length;
switch (G__63092) {
case 1:
return malli.util.from_map_syntax.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return malli.util.from_map_syntax.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(malli.util.from_map_syntax.cljs$core$IFn$_invoke$arity$1 = (function (m){
return malli.util.from_map_syntax.cljs$core$IFn$_invoke$arity$2(m,null);
}));

(malli.util.from_map_syntax.cljs$core$IFn$_invoke$arity$2 = (function (p__63093,options){
var map__63094 = p__63093;
var map__63094__$1 = cljs.core.__destructure_map(map__63094);
var m = map__63094__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63094__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var properties = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63094__$1,new cljs.core.Keyword(null,"properties","properties",685819552));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63094__$1,new cljs.core.Keyword(null,"children","children",-940561982));
if(cljs.core.map_QMARK_(m)){
var _LT__child = ((cljs.core.vector_QMARK_(cljs.core.first(children)))?(function (f){
return (function (p1__63088_SHARP_){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(p1__63088_SHARP_,(2),f);
});
}):cljs.core.identity);
var vec__63095 = malli.core._properties_and_options(properties,options,malli.core._form);
var properties__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63095,(0),null);
var options__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63095,(1),null);
return malli.core.into_schema.cljs$core$IFn$_invoke$arity$4(type,properties__$1,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (){var G__63098 = (function (p1__63089_SHARP_){
return malli.util.from_map_syntax.cljs$core$IFn$_invoke$arity$2(p1__63089_SHARP_,options__$1);
});
return (_LT__child.cljs$core$IFn$_invoke$arity$1 ? _LT__child.cljs$core$IFn$_invoke$arity$1(G__63098) : _LT__child.call(null,G__63098));
})(),children),options__$1);
} else {
return m;
}
}));

(malli.util.from_map_syntax.cljs$lang$maxFixedArity = 2);

malli.util._reducing = (function malli$util$_reducing(f){
return (function (_,p__63102,options){
var vec__63103 = p__63102;
var seq__63104 = cljs.core.seq(vec__63103);
var first__63105 = cljs.core.first(seq__63104);
var seq__63104__$1 = cljs.core.next(seq__63104);
var first = first__63105;
var rest = seq__63104__$1;
var children = vec__63103;
var children__$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__63099_SHARP_){
return malli.core.schema.cljs$core$IFn$_invoke$arity$2(p1__63099_SHARP_,options);
}),children);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [children__$1,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(malli.core.form,children__$1),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__63100_SHARP_,p2__63101_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(p1__63100_SHARP_,p2__63101_SHARP_,options) : f.call(null,p1__63100_SHARP_,p2__63101_SHARP_,options));
}),first,rest)], null);
});
});
malli.util._applying = (function malli$util$_applying(f){
return (function (_,children,options){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update.cljs$core$IFn$_invoke$arity$3(children,(0),(function (p1__63107_SHARP_){
return malli.core.schema.cljs$core$IFn$_invoke$arity$2(p1__63107_SHARP_,options);
})),cljs.core.update.cljs$core$IFn$_invoke$arity$3(children,(0),(function (p1__63108_SHARP_){
return malli.core.form.cljs$core$IFn$_invoke$arity$2(p1__63108_SHARP_,options);
})),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(children,options))], null);
});
});
malli.util._util_schema = (function malli$util$_util_schema(p__63110){
var map__63111 = p__63110;
var map__63111__$1 = cljs.core.__destructure_map(map__63111);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63111__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63111__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63111__$1,new cljs.core.Keyword(null,"max","max",61366548));
var childs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63111__$1,new cljs.core.Keyword(null,"childs","childs",-1293201887));
var type_properties = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63111__$1,new cljs.core.Keyword(null,"type-properties","type-properties",-1728352126));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63111__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
if((typeof malli !== 'undefined') && (typeof malli.util !== 'undefined') && (typeof malli.util.t_malli$util63112 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {malli.core.IntoSchema}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.util.t_malli$util63112 = (function (p__63110,map__63111,type,min,max,childs,type_properties,fn,meta63113){
this.p__63110 = p__63110;
this.map__63111 = map__63111;
this.type = type;
this.min = min;
this.max = max;
this.childs = childs;
this.type_properties = type_properties;
this.fn = fn;
this.meta63113 = meta63113;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.util.t_malli$util63112.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_63114,meta63113__$1){
var self__ = this;
var _63114__$1 = this;
return (new malli.util.t_malli$util63112(self__.p__63110,self__.map__63111,self__.type,self__.min,self__.max,self__.childs,self__.type_properties,self__.fn,meta63113__$1));
}));

(malli.util.t_malli$util63112.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_63114){
var self__ = this;
var _63114__$1 = this;
return self__.meta63113;
}));

(malli.util.t_malli$util63112.prototype.malli$core$IntoSchema$ = cljs.core.PROTOCOL_SENTINEL);

(malli.util.t_malli$util63112.prototype.malli$core$IntoSchema$_type$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.type;
}));

(malli.util.t_malli$util63112.prototype.malli$core$IntoSchema$_type_properties$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.type_properties;
}));

(malli.util.t_malli$util63112.prototype.malli$core$IntoSchema$_properties_schema$arity$2 = (function (_,___$1){
var self__ = this;
var ___$2 = this;
return null;
}));

(malli.util.t_malli$util63112.prototype.malli$core$IntoSchema$_children_schema$arity$2 = (function (_,___$1){
var self__ = this;
var ___$2 = this;
return null;
}));

(malli.util.t_malli$util63112.prototype.malli$core$IntoSchema$_into_schema$arity$4 = (function (parent,properties,children,options){
var self__ = this;
var parent__$1 = this;
malli.core._check_children_BANG_.cljs$core$IFn$_invoke$arity$5(self__.type,properties,children,self__.min,self__.max);

var vec__63121 = (function (){var G__63124 = properties;
var G__63125 = cljs.core.vec(children);
var G__63126 = options;
return (self__.fn.cljs$core$IFn$_invoke$arity$3 ? self__.fn.cljs$core$IFn$_invoke$arity$3(G__63124,G__63125,G__63126) : self__.fn.call(null,G__63124,G__63125,G__63126));
})();
var children__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63121,(0),null);
var forms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63121,(1),null);
var schema = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63121,(2),null);
var form = (new cljs.core.Delay((function (){
return malli.core._create_form(self__.type,properties,forms,options);
}),null));
var cache = malli.core._create_cache(options);
if((typeof malli !== 'undefined') && (typeof malli.util !== 'undefined') && (typeof malli.util.t_malli$util63128 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {malli.core.Cached}
 * @implements {malli.core.LensSchema}
 * @implements {malli.core.Schema}
 * @implements {malli.core.RefSchema}
 * @implements {cljs.core.IWithMeta}
*/
malli.util.t_malli$util63128 = (function (form,options,meta63113,forms,properties,childs,schema,children,min,type_properties,map__63111,fn,parent,vec__63121,type,p__63110,cache,max,meta63129){
this.form = form;
this.options = options;
this.meta63113 = meta63113;
this.forms = forms;
this.properties = properties;
this.childs = childs;
this.schema = schema;
this.children = children;
this.min = min;
this.type_properties = type_properties;
this.map__63111 = map__63111;
this.fn = fn;
this.parent = parent;
this.vec__63121 = vec__63121;
this.type = type;
this.p__63110 = p__63110;
this.cache = cache;
this.max = max;
this.meta63129 = meta63129;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.util.t_malli$util63128.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_63130,meta63129__$1){
var self__ = this;
var _63130__$1 = this;
return (new malli.util.t_malli$util63128(self__.form,self__.options,self__.meta63113,self__.forms,self__.properties,self__.childs,self__.schema,self__.children,self__.min,self__.type_properties,self__.map__63111,self__.fn,self__.parent,self__.vec__63121,self__.type,self__.p__63110,self__.cache,self__.max,meta63129__$1));
}));

(malli.util.t_malli$util63128.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_63130){
var self__ = this;
var _63130__$1 = this;
return self__.meta63129;
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$ = cljs.core.PROTOCOL_SENTINEL);

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_validator$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return malli.core._validator(self__.schema);
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_options$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.options;
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_transformer$arity$4 = (function (this$,transformer,method,options__$1){
var self__ = this;
var this$__$1 = this;
return malli.core._parent_children_transformer(this$__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.schema], null),transformer,method,options__$1);
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_walk$arity$4 = (function (this$,walker,path,options__$1){
var self__ = this;
var this$__$1 = this;
var children__$1 = (cljs.core.truth_(self__.childs)?cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(self__.children,(0),self__.childs):self__.children);
if(cljs.core.truth_(malli.core._accept(walker,this$__$1,path,options__$1))){
return malli.core._outer(walker,this$__$1,path,malli.core._inner_indexed(walker,path,children__$1,options__$1),options__$1);
} else {
return null;
}
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_properties$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.properties;
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_children$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.children;
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_form$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.form);
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_explainer$arity$2 = (function (_,path){
var self__ = this;
var ___$1 = this;
return malli.core._explainer(self__.schema,path);
}));

(malli.util.t_malli$util63128.prototype.malli$core$Schema$_parent$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.parent;
}));

(malli.util.t_malli$util63128.prototype.malli$core$Cached$ = cljs.core.PROTOCOL_SENTINEL);

(malli.util.t_malli$util63128.prototype.malli$core$Cached$_cache$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.cache;
}));

(malli.util.t_malli$util63128.prototype.malli$core$LensSchema$ = cljs.core.PROTOCOL_SENTINEL);

(malli.util.t_malli$util63128.prototype.malli$core$LensSchema$_keep$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return null;
}));

(malli.util.t_malli$util63128.prototype.malli$core$LensSchema$_get$arity$3 = (function (_,key,default$){
var self__ = this;
var ___$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.children,key,default$);
}));

(malli.util.t_malli$util63128.prototype.malli$core$LensSchema$_set$arity$3 = (function (_,key,value){
var self__ = this;
var ___$1 = this;
return malli.core.into_schema.cljs$core$IFn$_invoke$arity$3(self__.type,self__.properties,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.children,key,value));
}));

(malli.util.t_malli$util63128.prototype.malli$core$RefSchema$ = cljs.core.PROTOCOL_SENTINEL);

(malli.util.t_malli$util63128.prototype.malli$core$RefSchema$_ref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return null;
}));

(malli.util.t_malli$util63128.prototype.malli$core$RefSchema$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.schema;
}));

(malli.util.t_malli$util63128.getBasis = (function (){
return new cljs.core.PersistentVector(null, 19, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"form","form",16469056,null),new cljs.core.Symbol(null,"options","options",1740170016,null),new cljs.core.Symbol(null,"meta63113","meta63113",-2122256124,null),new cljs.core.Symbol(null,"forms","forms",-608443419,null),new cljs.core.Symbol(null,"properties","properties",-1968616217,null),new cljs.core.Symbol(null,"childs","childs",347329640,null),new cljs.core.Symbol(null,"schema","schema",58529736,null),new cljs.core.Symbol(null,"children","children",699969545,null),new cljs.core.Symbol(null,"min","min",2085523049,null),new cljs.core.Symbol(null,"type-properties","type-properties",-87820599,null),new cljs.core.Symbol(null,"map__63111","map__63111",976611787,null),new cljs.core.Symbol(null,"fn","fn",465265323,null),cljs.core.with_meta(new cljs.core.Symbol(null,"parent","parent",761652748,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("malli.util","t_malli$util63112","malli.util/t_malli$util63112",1446188085,null)], null)),new cljs.core.Symbol(null,"vec__63121","vec__63121",-63373779,null),new cljs.core.Symbol(null,"type","type",-1480165421,null),new cljs.core.Symbol(null,"p__63110","p__63110",2139401397,null),new cljs.core.Symbol(null,"cache","cache",403508473,null),new cljs.core.Symbol(null,"max","max",1701898075,null),new cljs.core.Symbol(null,"meta63129","meta63129",2093598743,null)], null);
}));

(malli.util.t_malli$util63128.cljs$lang$type = true);

(malli.util.t_malli$util63128.cljs$lang$ctorStr = "malli.util/t_malli$util63128");

(malli.util.t_malli$util63128.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"malli.util/t_malli$util63128");
}));

/**
 * Positional factory function for malli.util/t_malli$util63128.
 */
malli.util.__GT_t_malli$util63128 = (function malli$util$_util_schema_$___GT_t_malli$util63128(form__$1,options__$1,meta63113__$1,forms__$1,properties__$1,childs__$1,schema__$1,children__$2,min__$1,type_properties__$1,map__63111__$1,fn__$1,parent__$2,vec__63121__$1,type__$1,p__63110__$1,cache__$1,max__$1,meta63129){
return (new malli.util.t_malli$util63128(form__$1,options__$1,meta63113__$1,forms__$1,properties__$1,childs__$1,schema__$1,children__$2,min__$1,type_properties__$1,map__63111__$1,fn__$1,parent__$2,vec__63121__$1,type__$1,p__63110__$1,cache__$1,max__$1,meta63129));
});

}

return (new malli.util.t_malli$util63128(form,options,self__.meta63113,forms,properties,self__.childs,schema,children__$1,self__.min,self__.type_properties,self__.map__63111,self__.fn,parent__$1,vec__63121,self__.type,self__.p__63110,cache,self__.max,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("malli.core","schema","malli.core/schema",-1780373863)], null)));
}));

(malli.util.t_malli$util63112.getBasis = (function (){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p__63110","p__63110",2139401397,null),new cljs.core.Symbol(null,"map__63111","map__63111",976611787,null),new cljs.core.Symbol(null,"type","type",-1480165421,null),new cljs.core.Symbol(null,"min","min",2085523049,null),new cljs.core.Symbol(null,"max","max",1701898075,null),new cljs.core.Symbol(null,"childs","childs",347329640,null),new cljs.core.Symbol(null,"type-properties","type-properties",-87820599,null),new cljs.core.Symbol(null,"fn","fn",465265323,null),new cljs.core.Symbol(null,"meta63113","meta63113",-2122256124,null)], null);
}));

(malli.util.t_malli$util63112.cljs$lang$type = true);

(malli.util.t_malli$util63112.cljs$lang$ctorStr = "malli.util/t_malli$util63112");

(malli.util.t_malli$util63112.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"malli.util/t_malli$util63112");
}));

/**
 * Positional factory function for malli.util/t_malli$util63112.
 */
malli.util.__GT_t_malli$util63112 = (function malli$util$_util_schema_$___GT_t_malli$util63112(p__63110__$1,map__63111__$2,type__$1,min__$1,max__$1,childs__$1,type_properties__$1,fn__$1,meta63113){
return (new malli.util.t_malli$util63112(p__63110__$1,map__63111__$2,type__$1,min__$1,max__$1,childs__$1,type_properties__$1,fn__$1,meta63113));
});

}

return (new malli.util.t_malli$util63112(p__63110,map__63111__$1,type,min,max,childs,type_properties,fn,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("malli.core","into-schema","malli.core/into-schema",1522165759)], null)));
});
malli.util._merge = (function malli$util$_merge(){
return malli.util._util_schema(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"merge","merge",-1804319409),new cljs.core.Keyword(null,"fn","fn",-1175266204),malli.util._reducing(malli.util.merge)], null));
});
malli.util._union = (function malli$util$_union(){
return malli.util._util_schema(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"union","union",2142937499),new cljs.core.Keyword(null,"fn","fn",-1175266204),malli.util._reducing(malli.util.union)], null));
});
malli.util._select_keys = (function malli$util$_select_keys(){
return malli.util._util_schema(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"select-keys","select-keys",1945879180),new cljs.core.Keyword(null,"childs","childs",-1293201887),(1),new cljs.core.Keyword(null,"min","min",444991522),(2),new cljs.core.Keyword(null,"max","max",61366548),(2),new cljs.core.Keyword(null,"fn","fn",-1175266204),malli.util._applying(malli.util.select_keys)], null));
});
malli.util.schemas = (function malli$util$schemas(){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"merge","merge",-1804319409),malli.util._merge(),new cljs.core.Keyword(null,"union","union",2142937499),malli.util._union(),new cljs.core.Keyword(null,"select-keys","select-keys",1945879180),malli.util._select_keys()], null);
});

//# sourceMappingURL=malli.util.js.map