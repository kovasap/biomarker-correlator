goog.provide('expound.paths');
cljs.spec.alpha.def_impl(new cljs.core.Keyword("expound","path","expound/path",-1026376555),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","nilable","cljs.spec.alpha/nilable",1628308748,null),new cljs.core.Symbol("cljs.core","sequential?","cljs.core/sequential?",1777854658,null)),cljs.spec.alpha.nilable_impl(new cljs.core.Symbol("cljs.core","sequential?","cljs.core/sequential?",1777854658,null),cljs.core.sequential_QMARK_,null));

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
expound.paths.KeyPathSegment = (function (key,__meta,__extmap,__hash){
this.key = key;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(expound.paths.KeyPathSegment.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4502__auto__,k__4503__auto__){
var self__ = this;
var this__4502__auto____$1 = this;
return this__4502__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4503__auto__,null);
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4504__auto__,k51231,else__4505__auto__){
var self__ = this;
var this__4504__auto____$1 = this;
var G__51255 = k51231;
var G__51255__$1 = (((G__51255 instanceof cljs.core.Keyword))?G__51255.fqn:null);
switch (G__51255__$1) {
case "key":
return self__.key;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k51231,else__4505__auto__);

}
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4522__auto__,f__4523__auto__,init__4524__auto__){
var self__ = this;
var this__4522__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4525__auto__,p__51257){
var vec__51258 = p__51257;
var k__4526__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51258,(0),null);
var v__4527__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51258,(1),null);
return (f__4523__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4523__auto__.cljs$core$IFn$_invoke$arity$3(ret__4525__auto__,k__4526__auto__,v__4527__auto__) : f__4523__auto__.call(null,ret__4525__auto__,k__4526__auto__,v__4527__auto__));
}),init__4524__auto__,this__4522__auto____$1);
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4517__auto__,writer__4518__auto__,opts__4519__auto__){
var self__ = this;
var this__4517__auto____$1 = this;
var pr_pair__4520__auto__ = (function (keyval__4521__auto__){
return cljs.core.pr_sequential_writer(writer__4518__auto__,cljs.core.pr_writer,""," ","",opts__4519__auto__,keyval__4521__auto__);
});
return cljs.core.pr_sequential_writer(writer__4518__auto__,pr_pair__4520__auto__,"#expound.paths.KeyPathSegment{",", ","}",opts__4519__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"key","key",-1516042587),self__.key],null))], null),self__.__extmap));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__51230){
var self__ = this;
var G__51230__$1 = this;
return (new cljs.core.RecordIter((0),G__51230__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"key","key",-1516042587)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4500__auto__){
var self__ = this;
var this__4500__auto____$1 = this;
return self__.__meta;
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4497__auto__){
var self__ = this;
var this__4497__auto____$1 = this;
return (new expound.paths.KeyPathSegment(self__.key,self__.__meta,self__.__extmap,self__.__hash));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4506__auto__){
var self__ = this;
var this__4506__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4498__auto__){
var self__ = this;
var this__4498__auto____$1 = this;
var h__4360__auto__ = self__.__hash;
if((!((h__4360__auto__ == null)))){
return h__4360__auto__;
} else {
var h__4360__auto____$1 = (function (coll__4499__auto__){
return (233526946 ^ cljs.core.hash_unordered_coll(coll__4499__auto__));
})(this__4498__auto____$1);
(self__.__hash = h__4360__auto____$1);

return h__4360__auto____$1;
}
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this51232,other51233){
var self__ = this;
var this51232__$1 = this;
return (((!((other51233 == null)))) && ((((this51232__$1.constructor === other51233.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this51232__$1.key,other51233.key)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this51232__$1.__extmap,other51233.__extmap)))))));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4512__auto__,k__4513__auto__){
var self__ = this;
var this__4512__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),null], null), null),k__4513__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4512__auto____$1),self__.__meta),k__4513__auto__);
} else {
return (new expound.paths.KeyPathSegment(self__.key,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4513__auto__)),null));
}
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4509__auto__,k51231){
var self__ = this;
var this__4509__auto____$1 = this;
var G__51297 = k51231;
var G__51297__$1 = (((G__51297 instanceof cljs.core.Keyword))?G__51297.fqn:null);
switch (G__51297__$1) {
case "key":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k51231);

}
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4510__auto__,k__4511__auto__,G__51230){
var self__ = this;
var this__4510__auto____$1 = this;
var pred__51302 = cljs.core.keyword_identical_QMARK_;
var expr__51303 = k__4511__auto__;
if(cljs.core.truth_((pred__51302.cljs$core$IFn$_invoke$arity$2 ? pred__51302.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"key","key",-1516042587),expr__51303) : pred__51302.call(null,new cljs.core.Keyword(null,"key","key",-1516042587),expr__51303)))){
return (new expound.paths.KeyPathSegment(G__51230,self__.__meta,self__.__extmap,null));
} else {
return (new expound.paths.KeyPathSegment(self__.key,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4511__auto__,G__51230),null));
}
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4515__auto__){
var self__ = this;
var this__4515__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"key","key",-1516042587),self__.key,null))], null),self__.__extmap));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4501__auto__,G__51230){
var self__ = this;
var this__4501__auto____$1 = this;
return (new expound.paths.KeyPathSegment(self__.key,G__51230,self__.__extmap,self__.__hash));
}));

(expound.paths.KeyPathSegment.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4507__auto__,entry__4508__auto__){
var self__ = this;
var this__4507__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4508__auto__)){
return this__4507__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__4508__auto__,(0)),cljs.core._nth(entry__4508__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4507__auto____$1,entry__4508__auto__);
}
}));

(expound.paths.KeyPathSegment.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"key","key",124488940,null)], null);
}));

(expound.paths.KeyPathSegment.cljs$lang$type = true);

(expound.paths.KeyPathSegment.cljs$lang$ctorPrSeq = (function (this__4546__auto__){
return (new cljs.core.List(null,"expound.paths/KeyPathSegment",null,(1),null));
}));

(expound.paths.KeyPathSegment.cljs$lang$ctorPrWriter = (function (this__4546__auto__,writer__4547__auto__){
return cljs.core._write(writer__4547__auto__,"expound.paths/KeyPathSegment");
}));

/**
 * Positional factory function for expound.paths/KeyPathSegment.
 */
expound.paths.__GT_KeyPathSegment = (function expound$paths$__GT_KeyPathSegment(key){
return (new expound.paths.KeyPathSegment(key,null,null,null));
});

/**
 * Factory function for expound.paths/KeyPathSegment, taking a map of keywords to field values.
 */
expound.paths.map__GT_KeyPathSegment = (function expound$paths$map__GT_KeyPathSegment(G__51238){
var extmap__4542__auto__ = (function (){var G__51318 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__51238,new cljs.core.Keyword(null,"key","key",-1516042587));
if(cljs.core.record_QMARK_(G__51238)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__51318);
} else {
return G__51318;
}
})();
return (new expound.paths.KeyPathSegment(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(G__51238),null,cljs.core.not_empty(extmap__4542__auto__),null));
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
expound.paths.KeyValuePathSegment = (function (idx,__meta,__extmap,__hash){
this.idx = idx;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(expound.paths.KeyValuePathSegment.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4502__auto__,k__4503__auto__){
var self__ = this;
var this__4502__auto____$1 = this;
return this__4502__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4503__auto__,null);
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4504__auto__,k51323,else__4505__auto__){
var self__ = this;
var this__4504__auto____$1 = this;
var G__51328 = k51323;
var G__51328__$1 = (((G__51328 instanceof cljs.core.Keyword))?G__51328.fqn:null);
switch (G__51328__$1) {
case "idx":
return self__.idx;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k51323,else__4505__auto__);

}
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4522__auto__,f__4523__auto__,init__4524__auto__){
var self__ = this;
var this__4522__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4525__auto__,p__51335){
var vec__51336 = p__51335;
var k__4526__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51336,(0),null);
var v__4527__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51336,(1),null);
return (f__4523__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4523__auto__.cljs$core$IFn$_invoke$arity$3(ret__4525__auto__,k__4526__auto__,v__4527__auto__) : f__4523__auto__.call(null,ret__4525__auto__,k__4526__auto__,v__4527__auto__));
}),init__4524__auto__,this__4522__auto____$1);
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4517__auto__,writer__4518__auto__,opts__4519__auto__){
var self__ = this;
var this__4517__auto____$1 = this;
var pr_pair__4520__auto__ = (function (keyval__4521__auto__){
return cljs.core.pr_sequential_writer(writer__4518__auto__,cljs.core.pr_writer,""," ","",opts__4519__auto__,keyval__4521__auto__);
});
return cljs.core.pr_sequential_writer(writer__4518__auto__,pr_pair__4520__auto__,"#expound.paths.KeyValuePathSegment{",", ","}",opts__4519__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"idx","idx",1053688473),self__.idx],null))], null),self__.__extmap));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__51322){
var self__ = this;
var G__51322__$1 = this;
return (new cljs.core.RecordIter((0),G__51322__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"idx","idx",1053688473)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4500__auto__){
var self__ = this;
var this__4500__auto____$1 = this;
return self__.__meta;
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4497__auto__){
var self__ = this;
var this__4497__auto____$1 = this;
return (new expound.paths.KeyValuePathSegment(self__.idx,self__.__meta,self__.__extmap,self__.__hash));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4506__auto__){
var self__ = this;
var this__4506__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4498__auto__){
var self__ = this;
var this__4498__auto____$1 = this;
var h__4360__auto__ = self__.__hash;
if((!((h__4360__auto__ == null)))){
return h__4360__auto__;
} else {
var h__4360__auto____$1 = (function (coll__4499__auto__){
return (1269438429 ^ cljs.core.hash_unordered_coll(coll__4499__auto__));
})(this__4498__auto____$1);
(self__.__hash = h__4360__auto____$1);

return h__4360__auto____$1;
}
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this51324,other51325){
var self__ = this;
var this51324__$1 = this;
return (((!((other51325 == null)))) && ((((this51324__$1.constructor === other51325.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this51324__$1.idx,other51325.idx)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this51324__$1.__extmap,other51325.__extmap)))))));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4512__auto__,k__4513__auto__){
var self__ = this;
var this__4512__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"idx","idx",1053688473),null], null), null),k__4513__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4512__auto____$1),self__.__meta),k__4513__auto__);
} else {
return (new expound.paths.KeyValuePathSegment(self__.idx,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4513__auto__)),null));
}
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4509__auto__,k51323){
var self__ = this;
var this__4509__auto____$1 = this;
var G__51369 = k51323;
var G__51369__$1 = (((G__51369 instanceof cljs.core.Keyword))?G__51369.fqn:null);
switch (G__51369__$1) {
case "idx":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k51323);

}
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4510__auto__,k__4511__auto__,G__51322){
var self__ = this;
var this__4510__auto____$1 = this;
var pred__51370 = cljs.core.keyword_identical_QMARK_;
var expr__51371 = k__4511__auto__;
if(cljs.core.truth_((pred__51370.cljs$core$IFn$_invoke$arity$2 ? pred__51370.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"idx","idx",1053688473),expr__51371) : pred__51370.call(null,new cljs.core.Keyword(null,"idx","idx",1053688473),expr__51371)))){
return (new expound.paths.KeyValuePathSegment(G__51322,self__.__meta,self__.__extmap,null));
} else {
return (new expound.paths.KeyValuePathSegment(self__.idx,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4511__auto__,G__51322),null));
}
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4515__auto__){
var self__ = this;
var this__4515__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"idx","idx",1053688473),self__.idx,null))], null),self__.__extmap));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4501__auto__,G__51322){
var self__ = this;
var this__4501__auto____$1 = this;
return (new expound.paths.KeyValuePathSegment(self__.idx,G__51322,self__.__extmap,self__.__hash));
}));

(expound.paths.KeyValuePathSegment.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4507__auto__,entry__4508__auto__){
var self__ = this;
var this__4507__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4508__auto__)){
return this__4507__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__4508__auto__,(0)),cljs.core._nth(entry__4508__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4507__auto____$1,entry__4508__auto__);
}
}));

(expound.paths.KeyValuePathSegment.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"idx","idx",-1600747296,null)], null);
}));

(expound.paths.KeyValuePathSegment.cljs$lang$type = true);

(expound.paths.KeyValuePathSegment.cljs$lang$ctorPrSeq = (function (this__4546__auto__){
return (new cljs.core.List(null,"expound.paths/KeyValuePathSegment",null,(1),null));
}));

(expound.paths.KeyValuePathSegment.cljs$lang$ctorPrWriter = (function (this__4546__auto__,writer__4547__auto__){
return cljs.core._write(writer__4547__auto__,"expound.paths/KeyValuePathSegment");
}));

/**
 * Positional factory function for expound.paths/KeyValuePathSegment.
 */
expound.paths.__GT_KeyValuePathSegment = (function expound$paths$__GT_KeyValuePathSegment(idx){
return (new expound.paths.KeyValuePathSegment(idx,null,null,null));
});

/**
 * Factory function for expound.paths/KeyValuePathSegment, taking a map of keywords to field values.
 */
expound.paths.map__GT_KeyValuePathSegment = (function expound$paths$map__GT_KeyValuePathSegment(G__51327){
var extmap__4542__auto__ = (function (){var G__51377 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__51327,new cljs.core.Keyword(null,"idx","idx",1053688473));
if(cljs.core.record_QMARK_(G__51327)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__51377);
} else {
return G__51377;
}
})();
return (new expound.paths.KeyValuePathSegment(new cljs.core.Keyword(null,"idx","idx",1053688473).cljs$core$IFn$_invoke$arity$1(G__51327),null,cljs.core.not_empty(extmap__4542__auto__),null));
});

expound.paths.kps_QMARK_ = (function expound$paths$kps_QMARK_(x){
return (x instanceof expound.paths.KeyPathSegment);
});
expound.paths.kvps_QMARK_ = (function expound$paths$kvps_QMARK_(x){
return (x instanceof expound.paths.KeyValuePathSegment);
});
expound.paths.fn_equal = (function expound$paths$fn_equal(x,y){
return ((cljs.core.fn_QMARK_(x)) && (((cljs.core.fn_QMARK_(y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([x], 0)),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([y], 0)))))));
});
expound.paths.both_nan_QMARK_ = (function expound$paths$both_nan_QMARK_(x,y){
var and__4251__auto__ = expound.util.nan_QMARK_(x);
if(cljs.core.truth_(and__4251__auto__)){
return expound.util.nan_QMARK_(y);
} else {
return and__4251__auto__;
}
});
expound.paths.equalish_QMARK_ = (function expound$paths$equalish_QMARK_(x,y){
var or__4253__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,y);
if(or__4253__auto__){
return or__4253__auto__;
} else {
var or__4253__auto____$1 = expound.paths.fn_equal(x,y);
if(or__4253__auto____$1){
return or__4253__auto____$1;
} else {
return expound.paths.both_nan_QMARK_(x,y);
}
}
});
expound.paths.in_with_kps_maps_as_seqs = (function expound$paths$in_with_kps_maps_as_seqs(form,val,in$,in_SINGLEQUOTE_){
var vec__51394 = in$;
var seq__51395 = cljs.core.seq(vec__51394);
var first__51396 = cljs.core.first(seq__51395);
var seq__51395__$1 = cljs.core.next(seq__51395);
var k = first__51396;
var rst = seq__51395__$1;
var vec__51397 = rst;
var seq__51398 = cljs.core.seq(vec__51397);
var first__51399 = cljs.core.first(seq__51398);
var seq__51398__$1 = cljs.core.next(seq__51398);
var idx = first__51399;
var rst2 = seq__51398__$1;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795),form)){
return new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795);
} else {
if(cljs.core.truth_((function (){var and__4251__auto__ = cljs.core.empty_QMARK_(in$);
if(and__4251__auto__){
return expound.paths.equalish_QMARK_(form,val);
} else {
return and__4251__auto__;
}
})())){
return in_SINGLEQUOTE_;
} else {
if(((cljs.core.map_QMARK_(form)) && (((cljs.core.nat_int_QMARK_(k)) && ((cljs.core.long$(k) < cljs.core.count(cljs.core.seq(form)))))))){
var G__51402 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(form),k);
var G__51403 = val;
var G__51404 = rst;
var G__51405 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in_SINGLEQUOTE_,expound.paths.__GT_KeyValuePathSegment(k));
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51402,G__51403,G__51404,G__51405) : expound.paths.in_with_kps_STAR_.call(null,G__51402,G__51403,G__51404,G__51405));
} else {
if(((cljs.core.map_QMARK_(form)) && (((cljs.core.nat_int_QMARK_(k)) && (((cljs.core.int_QMARK_(idx)) && ((((cljs.core.long$(k) < cljs.core.count(cljs.core.seq(form)))) && ((cljs.core.long$(idx) < cljs.core.count(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(form),k)))))))))))){
var G__51408 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(form),k),idx);
var G__51409 = val;
var G__51410 = rst2;
var G__51411 = cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(in_SINGLEQUOTE_,expound.paths.__GT_KeyValuePathSegment(k),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([idx], 0));
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51408,G__51409,G__51410,G__51411) : expound.paths.in_with_kps_STAR_.call(null,G__51408,G__51409,G__51410,G__51411));
} else {
return new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795);

}
}
}
}
});
expound.paths.in_with_kps_fuzzy_match_for_regex_failures = (function expound$paths$in_with_kps_fuzzy_match_for_regex_failures(form,val,in$,in_SINGLEQUOTE_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795))){
return form;
} else {
var vec__51416 = in$;
var seq__51417 = cljs.core.seq(vec__51416);
var first__51418 = cljs.core.first(seq__51417);
var seq__51417__$1 = cljs.core.next(seq__51417);
var k = first__51418;
var rst = seq__51417__$1;
if(((cljs.core.empty_QMARK_(in$)) && (((cljs.core.seqable_QMARK_(form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(val,cljs.core.List.EMPTY)))))){
return in_SINGLEQUOTE_;
} else {
if(((cljs.core.empty_QMARK_(in$)) && (((cljs.core.seq_QMARK_(val)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,cljs.core.first(val))))))){
return in_SINGLEQUOTE_;
} else {
if(((cljs.core.nat_int_QMARK_(k)) && (cljs.core.seqable_QMARK_(form)))){
var G__51419 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(cljs.core.seq(form),k,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795));
var G__51420 = val;
var G__51421 = rst;
var G__51422 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in_SINGLEQUOTE_,k);
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51419,G__51420,G__51421,G__51422) : expound.paths.in_with_kps_STAR_.call(null,G__51419,G__51420,G__51421,G__51422));
} else {
return new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795);

}
}
}
}
});
expound.paths.in_with_kps_ints_are_keys = (function expound$paths$in_with_kps_ints_are_keys(form,val,in$,in_SINGLEQUOTE_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795))){
return form;
} else {
var vec__51430 = in$;
var seq__51431 = cljs.core.seq(vec__51430);
var first__51432 = cljs.core.first(seq__51431);
var seq__51431__$1 = cljs.core.next(seq__51431);
var k = first__51432;
var rst = seq__51431__$1;
if(cljs.core.truth_((function (){var and__4251__auto__ = cljs.core.empty_QMARK_(in$);
if(and__4251__auto__){
return expound.paths.equalish_QMARK_(form,val);
} else {
return and__4251__auto__;
}
})())){
return in_SINGLEQUOTE_;
} else {
if(cljs.core.associative_QMARK_(form)){
var G__51436 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(form,k,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795));
var G__51437 = val;
var G__51438 = rst;
var G__51439 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in_SINGLEQUOTE_,k);
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51436,G__51437,G__51438,G__51439) : expound.paths.in_with_kps_STAR_.call(null,G__51436,G__51437,G__51438,G__51439));
} else {
if(((cljs.core.int_QMARK_(k)) && (cljs.core.seqable_QMARK_(form)))){
var G__51440 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(cljs.core.seq(form),k,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795));
var G__51441 = val;
var G__51442 = rst;
var G__51443 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in_SINGLEQUOTE_,k);
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51440,G__51441,G__51442,G__51443) : expound.paths.in_with_kps_STAR_.call(null,G__51440,G__51441,G__51442,G__51443));
} else {
return new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795);

}
}
}
}
});
expound.paths.in_with_kps_ints_are_key_value_indicators = (function expound$paths$in_with_kps_ints_are_key_value_indicators(form,val,in$,in_SINGLEQUOTE_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795))){
return form;
} else {
var vec__51445 = in$;
var seq__51446 = cljs.core.seq(vec__51445);
var first__51447 = cljs.core.first(seq__51446);
var seq__51446__$1 = cljs.core.next(seq__51446);
var k = first__51447;
var rst = seq__51446__$1;
var vec__51448 = rst;
var seq__51449 = cljs.core.seq(vec__51448);
var first__51450 = cljs.core.first(seq__51449);
var seq__51449__$1 = cljs.core.next(seq__51449);
var idx = first__51450;
var rst2 = seq__51449__$1;
if(cljs.core.truth_((function (){var and__4251__auto__ = cljs.core.empty_QMARK_(in$);
if(and__4251__auto__){
return expound.paths.equalish_QMARK_(form,val);
} else {
return and__4251__auto__;
}
})())){
return in_SINGLEQUOTE_;
} else {
if(((cljs.core.map_QMARK_(form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),idx)))){
var G__51453 = k;
var G__51454 = val;
var G__51455 = rst2;
var G__51456 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in_SINGLEQUOTE_,expound.paths.__GT_KeyPathSegment(k));
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51453,G__51454,G__51455,G__51456) : expound.paths.in_with_kps_STAR_.call(null,G__51453,G__51454,G__51455,G__51456));
} else {
if(((cljs.core.map_QMARK_(form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),idx)))){
var G__51457 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(form,k,new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795));
var G__51458 = val;
var G__51459 = rst2;
var G__51460 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(in_SINGLEQUOTE_,k);
return (expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4 ? expound.paths.in_with_kps_STAR_.cljs$core$IFn$_invoke$arity$4(G__51457,G__51458,G__51459,G__51460) : expound.paths.in_with_kps_STAR_.call(null,G__51457,G__51458,G__51459,G__51460));
} else {
return new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795);

}
}
}
}
});
expound.paths.in_with_kps_STAR_ = (function expound$paths$in_with_kps_STAR_(form,val,in$,in_SINGLEQUOTE_){
if(cljs.core.fn_QMARK_(form)){
return in_SINGLEQUOTE_;
} else {
var br1 = expound.paths.in_with_kps_ints_are_key_value_indicators(form,val,in$,in_SINGLEQUOTE_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795),br1)){
return br1;
} else {
var br2 = expound.paths.in_with_kps_maps_as_seqs(form,val,in$,in_SINGLEQUOTE_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795),br2)){
return br2;
} else {
var br3 = expound.paths.in_with_kps_ints_are_keys(form,val,in$,in_SINGLEQUOTE_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795),br3)){
return br3;
} else {
var br4 = expound.paths.in_with_kps_fuzzy_match_for_regex_failures(form,val,in$,in_SINGLEQUOTE_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795),br4)){
return br4;
} else {
return new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795);
}
}
}
}
}
});
expound.paths.paths_to_value = (function expound$paths$paths_to_value(form,val,path,paths){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,val)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(paths,path);
} else {
if(((cljs.core.sequential_QMARK_(form)) || (cljs.core.set_QMARK_(form)))){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ps,p__51473){
var vec__51475 = p__51473;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51475,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51475,(1),null);
var G__51478 = x;
var G__51479 = val;
var G__51480 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,i);
var G__51481 = ps;
return (expound.paths.paths_to_value.cljs$core$IFn$_invoke$arity$4 ? expound.paths.paths_to_value.cljs$core$IFn$_invoke$arity$4(G__51478,G__51479,G__51480,G__51481) : expound.paths.paths_to_value.call(null,G__51478,G__51479,G__51480,G__51481));
}),paths,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,form,cljs.core.range.cljs$core$IFn$_invoke$arity$0()));
} else {
if(cljs.core.map_QMARK_(form)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ps,p__51482){
var vec__51484 = p__51482;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51484,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51484,(1),null);
var G__51487 = v;
var G__51488 = val;
var G__51489 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k);
var G__51490 = (function (){var G__51491 = k;
var G__51492 = val;
var G__51493 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,expound.paths.__GT_KeyPathSegment(k));
var G__51494 = ps;
return (expound.paths.paths_to_value.cljs$core$IFn$_invoke$arity$4 ? expound.paths.paths_to_value.cljs$core$IFn$_invoke$arity$4(G__51491,G__51492,G__51493,G__51494) : expound.paths.paths_to_value.call(null,G__51491,G__51492,G__51493,G__51494));
})();
return (expound.paths.paths_to_value.cljs$core$IFn$_invoke$arity$4 ? expound.paths.paths_to_value.cljs$core$IFn$_invoke$arity$4(G__51487,G__51488,G__51489,G__51490) : expound.paths.paths_to_value.call(null,G__51487,G__51488,G__51489,G__51490));
}),paths,form);
} else {
return paths;

}
}
}
});
expound.paths.in_with_kps = (function expound$paths$in_with_kps(form,val,in$,in_SINGLEQUOTE_){
var res = expound.paths.in_with_kps_STAR_(form,val,in$,in_SINGLEQUOTE_);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("expound.paths","not-found","expound.paths/not-found",-195785795),res)){
return null;
} else {
return res;
}
});
expound.paths.compare_path_segment = (function expound$paths$compare_path_segment(x,y){
if(((cljs.core.int_QMARK_(x)) && (expound.paths.kvps_QMARK_(y)))){
return cljs.core.compare(x,new cljs.core.Keyword(null,"idx","idx",1053688473).cljs$core$IFn$_invoke$arity$1(y));
} else {
if(((expound.paths.kvps_QMARK_(x)) && (cljs.core.int_QMARK_(y)))){
return cljs.core.compare(new cljs.core.Keyword(null,"idx","idx",1053688473).cljs$core$IFn$_invoke$arity$1(x),y);
} else {
if(((expound.paths.kps_QMARK_(x)) && ((!(expound.paths.kps_QMARK_(y)))))){
return (-1);
} else {
if((((!(expound.paths.kps_QMARK_(x)))) && (expound.paths.kps_QMARK_(y)))){
return (1);
} else {
if(((cljs.core.vector_QMARK_(x)) && (cljs.core.vector_QMARK_(y)))){
return (expound.paths.compare_paths.cljs$core$IFn$_invoke$arity$2 ? expound.paths.compare_paths.cljs$core$IFn$_invoke$arity$2(x,y) : expound.paths.compare_paths.call(null,x,y));
} else {
return cljs.core.compare(x,y);

}
}
}
}
}
});
expound.paths.compare_paths = (function expound$paths$compare_paths(path1,path2){
return cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [(0),null], null), null),cljs.core.map.cljs$core$IFn$_invoke$arity$3(expound.paths.compare_path_segment,path1,path2)));
});
/**
 * Similar to get-in, but works with paths that reference map keys
 */
expound.paths.value_in = (function expound$paths$value_in(form,in$){
while(true){
if((in$ == null)){
return form;
} else {
var vec__51506 = in$;
var seq__51507 = cljs.core.seq(vec__51506);
var first__51508 = cljs.core.first(seq__51507);
var seq__51507__$1 = cljs.core.next(seq__51507);
var k = first__51508;
var rst = seq__51507__$1;
if(cljs.core.empty_QMARK_(in$)){
return form;
} else {
if(((cljs.core.map_QMARK_(form)) && (expound.paths.kps_QMARK_(k)))){
var G__51609 = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(k);
var G__51610 = rst;
form = G__51609;
in$ = G__51610;
continue;
} else {
if(((cljs.core.map_QMARK_(form)) && (expound.paths.kvps_QMARK_(k)))){
var G__51611 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(form),new cljs.core.Keyword(null,"idx","idx",1053688473).cljs$core$IFn$_invoke$arity$1(k));
var G__51612 = rst;
form = G__51611;
in$ = G__51612;
continue;
} else {
if(cljs.core.associative_QMARK_(form)){
var G__51614 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(form,k);
var G__51615 = rst;
form = G__51614;
in$ = G__51615;
continue;
} else {
if(((cljs.core.int_QMARK_(k)) && (cljs.core.seqable_QMARK_(form)))){
var G__51616 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.seq(form),k);
var G__51617 = rst;
form = G__51616;
in$ = G__51617;
continue;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("No value found",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"form","form",-1624062471),form,new cljs.core.Keyword(null,"in","in",-1531184865),in$], null));

}
}
}
}
}
}
break;
}
});

//# sourceMappingURL=expound.paths.js.map
