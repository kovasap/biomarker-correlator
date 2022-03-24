goog.provide('reagent.dom');
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(reagent.dom.roots,cljs.core.dissoc,container);

return shadow.js.shim.module$react_dom.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__49699 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__49700 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__49700);

try{return shadow.js.shim.module$react_dom.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__49701 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__49702 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__49702);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__49701);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__49699);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp(comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__49704 = arguments.length;
switch (G__49704) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3(comp,container,reagent.impl.template.default_compiler);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback_or_compiler){
reagent.ratom.flush_BANG_();

var vec__49711 = ((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template.default_compiler,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49711,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49711,(1),null);
var f = (function (){
return reagent.impl.protocols.as_element(compiler,((cljs.core.fn_QMARK_(comp))?(comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)):comp));
});
return reagent.dom.render_comp(f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp(container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return shadow.js.shim.module$react_dom.findDOMNode(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_();

var seq__49720_49752 = cljs.core.seq(cljs.core.deref(reagent.dom.roots));
var chunk__49721_49753 = null;
var count__49722_49754 = (0);
var i__49723_49755 = (0);
while(true){
if((i__49723_49755 < count__49722_49754)){
var vec__49738_49756 = chunk__49721_49753.cljs$core$IIndexed$_nth$arity$2(null,i__49723_49755);
var container_49757 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49738_49756,(0),null);
var comp_49758 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49738_49756,(1),null);
reagent.dom.re_render_component(comp_49758,container_49757);


var G__49759 = seq__49720_49752;
var G__49760 = chunk__49721_49753;
var G__49761 = count__49722_49754;
var G__49762 = (i__49723_49755 + (1));
seq__49720_49752 = G__49759;
chunk__49721_49753 = G__49760;
count__49722_49754 = G__49761;
i__49723_49755 = G__49762;
continue;
} else {
var temp__5753__auto___49763 = cljs.core.seq(seq__49720_49752);
if(temp__5753__auto___49763){
var seq__49720_49764__$1 = temp__5753__auto___49763;
if(cljs.core.chunked_seq_QMARK_(seq__49720_49764__$1)){
var c__4679__auto___49765 = cljs.core.chunk_first(seq__49720_49764__$1);
var G__49766 = cljs.core.chunk_rest(seq__49720_49764__$1);
var G__49767 = c__4679__auto___49765;
var G__49768 = cljs.core.count(c__4679__auto___49765);
var G__49769 = (0);
seq__49720_49752 = G__49766;
chunk__49721_49753 = G__49767;
count__49722_49754 = G__49768;
i__49723_49755 = G__49769;
continue;
} else {
var vec__49745_49770 = cljs.core.first(seq__49720_49764__$1);
var container_49771 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49745_49770,(0),null);
var comp_49772 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49745_49770,(1),null);
reagent.dom.re_render_component(comp_49772,container_49771);


var G__49773 = cljs.core.next(seq__49720_49764__$1);
var G__49774 = null;
var G__49775 = (0);
var G__49776 = (0);
seq__49720_49752 = G__49773;
chunk__49721_49753 = G__49774;
count__49722_49754 = G__49775;
i__49723_49755 = G__49776;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render();
});

//# sourceMappingURL=reagent.dom.js.map