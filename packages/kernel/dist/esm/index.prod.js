import{Metadata as e,applyMetadataPolyfill as t,isObject as r}from"@aurelia/metadata";export{Metadata,applyMetadataPolyfill,isNullOrUndefined,isObject,metadata}from"@aurelia/metadata";export{Platform,Task,TaskAbortError,TaskQueue,TaskQueuePriority,TaskStatus}from"@aurelia/platform";const n={};function s(e){switch(typeof e){case"number":return e>=0&&(0|e)===e;case"string":{const t=n[e];if(void 0!==t)return t;const r=e.length;if(0===r)return n[e]=!1;let s=0,o=0;for(;o<r;++o)if(s=e.charCodeAt(o),0===o&&48===s&&r>1||s<48||s>57)return n[e]=!1;return n[e]=!0}default:return!1}}function o(e){switch(typeof e){case"number":case"bigint":return!0;default:return!1}}function i(e){switch(typeof e){case"string":return!0;case"object":return e instanceof Date;default:return!1}}const c=function(){let e;!function(e){e[e.none=0]="none",e[e.digit=1]="digit",e[e.upper=2]="upper",e[e.lower=3]="lower"}(e||(e={}));const t=Object.assign(Object.create(null),{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0});function r(e){return""===e?0:e!==e.toUpperCase()?3:e!==e.toLowerCase()?2:!0===t[e]?1:0}return function(e,t){const n=e.length;if(0===n)return e;let s,o=!1,i="",c="",a=0,l=e.charAt(0),u=r(l),h=0;for(;h<n;++h)s=a,c=l,a=u,l=e.charAt(h+1),u=r(l),0===a?i.length>0&&(o=!0):(!o&&i.length>0&&2===a&&(o=3===s||3===u),i+=t(c,o),o=!1);return i}}(),a=function(){const e=Object.create(null);function t(e,t){return t?e.toUpperCase():e.toLowerCase()}return function(r){let n=e[r];return void 0===n&&(n=e[r]=c(r,t)),n}}(),l=function(){const e=Object.create(null);return function(t){let r=e[t];return void 0===r&&(r=a(t),r.length>0&&(r=r[0].toUpperCase()+r.slice(1)),e[t]=r),r}}(),u=function(){const e=Object.create(null);function t(e,t){return t?`-${e.toLowerCase()}`:e.toLowerCase()}return function(r){let n=e[r];return void 0===n&&(n=e[r]=c(r,t)),n}}();function h(e){const{length:t}=e,r=Array(t);let n=0;for(;n<t;++n)r[n]=e[n];return r}const f={};function g(e){return void 0===f[e]&&(f[e]=0),++f[e]}function d(e){f[e]=0}function p(e,t){return e-t}function v(e,t,r){if(null==e||e===ke)return null==t||t===ke?ke:r?t.slice(0):t;if(null==t||t===ke)return r?e.slice(0):e;const n={},s=r?e.slice(0):e;let o,i=e.length,c=t.length;for(;i-- >0;)n[e[i]]=!0;for(;c-- >0;)o=t[c],void 0===n[o]&&(s.push(o),n[o]=!0);return s}function y(e,t,r){return{configurable:!0,enumerable:r.enumerable,get(){const e=r.value.bind(this);return Reflect.defineProperty(this,t,{value:e,writable:!0,configurable:!0,enumerable:r.enumerable}),e}}}function m(...e){const t=[];let r=0;const n=e.length;let s,o=0,i=0;for(;i<n;++i)if(s=e[i],void 0!==s){o=s.length;let e=0;for(;e<o;++e)t[r++]=s[e]}return t}function w(...e){const t={},r=e.length;let n,s;for(let o=0;o<r;++o)if(n=e[o],void 0!==n)for(s in n)t[s]=n[s];return t}function R(...e){const t=e.length;let r;for(let n=0;n<t;++n)if(r=e[n],void 0!==r)return r;throw new Error("No default value found")}const b=function(){const e=Function.prototype,t=Object.getPrototypeOf,r=new WeakMap;let n,s=e,o=0;return function(i){if(n=r.get(i),void 0===n)for(r.set(i,n=[s=i]),o=0;(s=t(s))!==e;)n[++o]=s;return n}}();function k(...e){return Object.assign(Object.create(null),...e)}const A=function(){const e=new WeakMap;let t=!1,r="",n=0;return function(s){return t=e.get(s),void 0===t&&(r=s.toString(),n=r.length,t=n>=29&&n<=100&&125===r.charCodeAt(n-1)&&r.charCodeAt(n-2)<=32&&93===r.charCodeAt(n-3)&&101===r.charCodeAt(n-4)&&100===r.charCodeAt(n-5)&&111===r.charCodeAt(n-6)&&99===r.charCodeAt(n-7)&&32===r.charCodeAt(n-8)&&101===r.charCodeAt(n-9)&&118===r.charCodeAt(n-10)&&105===r.charCodeAt(n-11)&&116===r.charCodeAt(n-12)&&97===r.charCodeAt(n-13)&&110===r.charCodeAt(n-14)&&88===r.charCodeAt(n-15),e.set(s,t)),t}}();function O(e,t){return e instanceof Promise?e.then(t):t(e)}function $(...e){let t,r,n,s=0,o=e.length;for(;s<o;++s)t=e[s],(t=e[s])instanceof Promise&&(void 0===r?r=t:void 0===n?n=[r,t]:n.push(t));return void 0===n?r:Promise.all(n)}const j={name:"au:annotation",appendTo(t,r){const n=e.getOwn(j.name,t);void 0===n?e.define(j.name,[r],t):n.push(r)},set(t,r,n){e.define(j.keyFor(r),n,t)},get:(t,r)=>e.getOwn(j.keyFor(r),t),getKeys(t){let r=e.getOwn(j.name,t);return void 0===r&&e.define(j.name,r=[],t),r},isKey:e=>e.startsWith(j.name),keyFor:(e,t)=>void 0===t?`${j.name}:${e}`:`${j.name}:${e}:${t}`},S={name:"au:resource",appendTo(t,r){const n=e.getOwn(S.name,t);void 0===n?e.define(S.name,[r],t):n.push(r)},has:t=>e.hasOwn(S.name,t),getAll(t){const r=e.getOwn(S.name,t);return void 0===r?ke:r.map((r=>e.getOwn(r,t)))},getKeys(t){let r=e.getOwn(S.name,t);return void 0===r&&e.define(S.name,r=[],t),r},isKey:e=>e.startsWith(S.name),keyFor:(e,t)=>void 0===t?`${S.name}:${e}`:`${S.name}:${e}:${t}`},C={annotation:j,resource:S},E=Object.prototype.hasOwnProperty;function F(t,r,n,s){let o=e.getOwn(C.annotation.keyFor(t),n);return void 0===o?(o=r[t],void 0===o?(o=n[t],void 0!==o&&E.call(n,t)?o:s()):o):o}function I(t,r,n){let s=e.getOwn(C.annotation.keyFor(t),r);return void 0===s?(s=r[t],void 0!==s&&E.call(r,t)?s:n()):s}function T(e,t,r){const n=t[e];return void 0===n?r():n}t(Reflect,!1,!1);class P{constructor(e,t){this.container=e,this.key=t}instance(e){return this.registerResolver(0,e)}singleton(e){return this.registerResolver(1,e)}transient(e){return this.registerResolver(2,e)}callback(e){return this.registerResolver(3,e)}cachedCallback(e){return this.registerResolver(3,ve(e))}aliasTo(e){return this.registerResolver(5,e)}registerResolver(e,t){const{container:r,key:n}=this;return this.container=this.key=void 0,r.registerResolver(n,new se(n,e,t))}}function U(e){const t=e.slice(),r=Object.keys(e),n=r.length;let o;for(let i=0;i<n;++i)o=r[i],s(o)||(t[o]=e[o]);return t}const L={none(e){throw Error(`AUR0002:${e.toString()}`)},singleton:e=>new se(e,1,e),transient:e=>new se(e,2,e)};class D{constructor(e,t){this.inheritParentResources=e,this.defaultResolver=t}static from(e){var t,r;return void 0===e||e===D.DEFAULT?D.DEFAULT:new D(null!==(t=e.inheritParentResources)&&void 0!==t&&t,null!==(r=e.defaultResolver)&&void 0!==r?r:L.singleton)}}D.DEFAULT=D.from({});const N={createContainer:e=>new ge(null,D.from(e)),getDesignParamtypes:t=>e.getOwn("design:paramtypes",t),getAnnotationParamtypes(t){const r=C.annotation.keyFor("di:paramtypes");return e.getOwn(r,t)},getOrCreateAnnotationParamTypes:W,getDependencies:M,createInterface(e,t){const r="function"==typeof e?e:t,n="string"==typeof e?e:void 0,s=function(e,t,r){if(null==e||void 0!==new.target)throw new Error(`AUR0001:${s.friendlyName}`);W(e)[r]=s};return s.$isInterface=!0,s.friendlyName=null==n?"(anonymous)":n,null!=r&&(s.register=function(e,t){return r(new P(e,null!=t?t:s))}),s.toString=function(){return`InterfaceSymbol<${s.friendlyName}>`},s},inject:(...e)=>function(t,r,n){if("number"==typeof n){const r=W(t),s=e[0];void 0!==s&&(r[n]=s)}else if(r){const n=W(t.constructor),s=e[0];void 0!==s&&(n[r]=s)}else if(n){const t=W(n.value);let r;for(let n=0;n<e.length;++n)r=e[n],void 0!==r&&(t[n]=r)}else{const r=W(t);let n;for(let t=0;t<e.length;++t)n=e[t],void 0!==n&&(r[t]=n)}},transient:e=>(e.register=function(t){return ye.transient(e,e).register(t,e)},e.registerInRequestor=!1,e),singleton:(e,t=q)=>(e.register=function(t){return ye.singleton(e,e).register(t,e)},e.registerInRequestor=t.scoped,e)};function M(t){const r=C.annotation.keyFor("di:dependencies");let n=e.getOwn(r,t);if(void 0===n){const o=t.inject;if(void 0===o){const e=N.getDesignParamtypes(t),r=N.getAnnotationParamtypes(t);if(void 0===e)if(void 0===r){const e=Object.getPrototypeOf(t);n="function"==typeof e&&e!==Function.prototype?U(M(e)):[]}else n=U(r);else if(void 0===r)n=U(e);else{n=U(e);let t,o=r.length,i=0;for(;i<o;++i)t=r[i],void 0!==t&&(n[i]=t);const c=Object.keys(r);let a;for(i=0,o=c.length,i=0;i<o;++i)a=c[i],s(a)||(n[a]=r[a])}}else n=U(o);e.define(r,n,t),C.annotation.appendTo(t,r)}return n}function W(t){const r=C.annotation.keyFor("di:paramtypes");let n=e.getOwn(r,t);return void 0===n&&(e.define(r,n=[],t),C.annotation.appendTo(t,r)),n}const Q=N.createInterface("IContainer"),x=Q;function B(e){return function(t){const r=function(e,t,n){N.inject(r)(e,t,n)};return r.$isResolver=!0,r.resolve=function(r,n){return e(t,r,n)},r}}const z=N.inject;function G(e){return N.transient(e)}function H(e){return null==e?G:G(e)}const q={scoped:!1};function K(e){return"function"==typeof e?N.singleton(e):function(t){return N.singleton(t,e)}}const V=(J=(e,t,r,n)=>r.getAll(e,n),function(e,t){t=!!t;const r=function(e,t,n){N.inject(r)(e,t,n)};return r.$isResolver=!0,r.resolve=function(r,n){return J(e,r,n,t)},r});var J;const X=B(((e,t,r)=>()=>r.get(e))),Y=B(((e,t,r)=>r.has(e,!0)?r.get(e):void 0));function Z(e,t,r){N.inject(Z)(e,t,r)}Z.$isResolver=!0,Z.resolve=()=>{};const _=B(((e,t,r)=>(...n)=>t.getFactory(e).construct(r,n))),ee=B(((e,t,r)=>{const n=re(e,t,r),s=new me(String(e),n);return r.registerResolver(e,s),n})),te=B(((e,t,r)=>re(e,t,r)));function re(e,t,r){return t.getFactory(e).construct(r)}var ne;!function(e){e[e.instance=0]="instance",e[e.singleton=1]="singleton",e[e.transient=2]="transient",e[e.callback=3]="callback",e[e.array=4]="array",e[e.alias=5]="alias"}(ne||(ne={}));class se{constructor(e,t,r){this.key=e,this.strategy=t,this.state=r,this.resolving=!1}get $isResolver(){return!0}register(e,t){return e.registerResolver(t||this.key,this)}resolve(e,t){switch(this.strategy){case 0:return this.state;case 1:if(this.resolving)throw new Error(`AUR0003:${this.state.name}`);return this.resolving=!0,this.state=e.getFactory(this.state).construct(t),this.strategy=0,this.resolving=!1,this.state;case 2:{const r=e.getFactory(this.state);if(null===r)throw new Error(`AUR0004:${String(this.key)}`);return r.construct(t)}case 3:return this.state(e,t,this);case 4:return this.state[0].resolve(e,t);case 5:return t.get(this.state);default:throw new Error(`AUR0005:${this.strategy}`)}}getFactory(e){var t,r,n;switch(this.strategy){case 1:case 2:return e.getFactory(this.state);case 5:return null!==(n=null===(r=null===(t=e.getResolver(this.state))||void 0===t?void 0:t.getFactory)||void 0===r?void 0:r.call(t,e))&&void 0!==n?n:null;default:return null}}}function oe(e){return this.get(e)}function ie(e,t){return t(e)}class ce{constructor(e,t){this.Type=e,this.dependencies=t,this.transformers=null}construct(e,t){let r;return r=void 0===t?new this.Type(...this.dependencies.map(oe,e)):new this.Type(...this.dependencies.map(oe,e),...t),null==this.transformers?r:this.transformers.reduce(ie,r)}registerTransformer(e){var t;(null!==(t=this.transformers)&&void 0!==t?t:this.transformers=[]).push(e)}}const ae={$isResolver:!0,resolve:(e,t)=>t};function le(e){return"function"==typeof e.register}function ue(e){return function(e){return le(e)&&"boolean"==typeof e.registerInRequestor}(e)&&e.registerInRequestor}const he=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]);C.annotation.keyFor("di:factory");let fe=0;class ge{constructor(e,t){this.parent=e,this.config=t,this.id=++fe,this.registerDepth=0,this.disposableResolvers=new Set,null===e?(this.root=this,this.resolvers=new Map,this.factories=new Map,this.resourceResolvers=Object.create(null)):(this.root=e.root,this.resolvers=new Map,this.factories=e.factories,this.resourceResolvers=t.inheritParentResources?Object.assign(Object.create(null),e.resourceResolvers,this.root.resourceResolvers):Object.create(null)),this.resolvers.set(Q,ae)}get depth(){return null===this.parent?0:this.parent.depth+1}register(...e){if(100==++this.registerDepth)throw new Error(`AUR0006:${e.map(String)}`);let t,n,s,o,i,c=0,a=e.length;for(;c<a;++c)if(t=e[c],r(t))if(le(t))t.register(this);else if(C.resource.has(t)){const e=C.resource.getAll(t);if(1===e.length)e[0].register(this);else for(o=0,i=e.length;i>o;)e[o].register(this),++o}else if(void 0!==t.prototype)ye.singleton(t,t).register(this);else for(n=Object.keys(t),o=0,i=n.length;o<i;++o)s=t[n[o]],r(s)&&(le(s)?s.register(this):this.register(s));return--this.registerDepth,this}registerResolver(e,t,r=!1){we(e);const n=this.resolvers,s=n.get(e);if(null==s){if(n.set(e,t),function(e){return"string"==typeof e&&e.indexOf(":")>0}(e)){if(void 0!==this.resourceResolvers[e])throw new Error(`AUR0007:${e}`);this.resourceResolvers[e]=t}}else s instanceof se&&4===s.strategy?s.state.push(t):n.set(e,new se(e,4,[s,t]));return r&&this.disposableResolvers.add(t),t}registerTransformer(e,t){const r=this.getResolver(e);if(null==r)return!1;if(r.getFactory){const e=r.getFactory(this);return null!=e&&(e.registerTransformer(t),!0)}return!1}getResolver(e,t=!0){if(we(e),void 0!==e.resolve)return e;let r,n=this;for(;null!=n;){if(r=n.resolvers.get(e),null!=r)return r;if(null==n.parent){const r=ue(e)?this:n;return t?this.jitRegister(e,r):null}n=n.parent}return null}has(e,t=!1){return!!this.resolvers.has(e)||!(!t||null==this.parent)&&this.parent.has(e,!0)}get(e){if(we(e),e.$isResolver)return e.resolve(this,this);let t,r=this;for(;null!=r;){if(t=r.resolvers.get(e),null!=t)return t.resolve(r,this);if(null==r.parent){const n=ue(e)?this:r;return t=this.jitRegister(e,n),t.resolve(r,this)}r=r.parent}throw new Error(`AUR0008:${e}`)}getAll(e,t=!1){we(e);const r=this;let n,s=r;if(t){let t=ke;for(;null!=s;)n=s.resolvers.get(e),null!=n&&(t=t.concat(Re(n,s,r))),s=s.parent;return t}for(;null!=s;){if(n=s.resolvers.get(e),null!=n)return Re(n,s,r);if(s=s.parent,null==s)return ke}return ke}invoke(e,t){if(A(e))throw be(e);return void 0===t?new e(...M(e).map(oe,this)):new e(...M(e).map(oe,this),...t)}getFactory(e){let t=this.factories.get(e);if(void 0===t){if(A(e))throw be(e);this.factories.set(e,t=new ce(e,M(e)))}return t}registerFactory(e,t){this.factories.set(e,t)}createChild(e){return new ge(this,void 0===e&&this.config.inheritParentResources?this.config===D.DEFAULT?this.config:D.from({...this.config,inheritParentResources:!1}):D.from(null!=e?e:this.config))}disposeResolvers(){let e;for(e of this.disposableResolvers)e.dispose()}find(t,r){const n=t.keyFrom(r);let s=this.resourceResolvers[n];if(void 0===s&&(s=this.root.resourceResolvers[n],void 0===s))return null;if(null===s)return null;if("function"==typeof s.getFactory){const r=s.getFactory(this);if(null==r)return null;const n=e.getOwn(t.name,r.Type);return void 0===n?null:n}return null}create(e,t){var r,n;const s=e.keyFrom(t);let o=this.resourceResolvers[s];return void 0===o?(o=this.root.resourceResolvers[s],void 0===o?null:null!==(r=o.resolve(this.root,this))&&void 0!==r?r:null):null!==(n=o.resolve(this,this))&&void 0!==n?n:null}dispose(){this.disposableResolvers.size>0&&this.disposeResolvers(),this.resolvers.clear()}jitRegister(e,t){if("function"!=typeof e)throw new Error(`AUR0009:${e}`);if(he.has(e.name))throw new Error(`AUR0010:${e.name}`);if(le(e)){const r=e.register(t,e);if(!(r instanceof Object)||null==r.resolve){const r=t.resolvers.get(e);if(null!=r)return r;throw new Error("AUR0011")}return r}if(C.resource.has(e)){const r=C.resource.getAll(e);if(1===r.length)r[0].register(t);else{const e=r.length;for(let n=0;n<e;++n)r[n].register(t)}const n=t.resolvers.get(e);if(null!=n)return n;throw new Error("AUR0011")}if(e.$isInterface)throw new Error(`AUR0012:${e.friendlyName}`);{const r=this.config.defaultResolver(e,t);return t.resolvers.set(e,r),r}}}class de{constructor(e,t){this.key=e,this.params=t}register(e){if(e.has(this.key,!0)){e.get(this.key).register(e,...this.params)}else e.register(...this.params.filter((e=>"object"==typeof e)))}}const pe=new WeakMap;function ve(e){return function(t,r,n){let s=pe.get(t);if(void 0===s&&pe.set(t,s=new WeakMap),s.has(n))return s.get(n);const o=e(t,r,n);return s.set(n,o),o}}const ye={instance:(e,t)=>new se(e,0,t),singleton:(e,t)=>new se(e,1,t),transient:(e,t)=>new se(e,2,t),callback:(e,t)=>new se(e,3,t),cachedCallback:(e,t)=>new se(e,3,ve(t)),aliasTo:(e,t)=>new se(t,5,e),defer:(e,...t)=>new de(e,t)};class me{constructor(e,t){this.friendlyName=e,this.instance=null,void 0!==t&&(this.instance=t)}prepare(e){this.instance=e}get $isResolver(){return!0}resolve(){if(null==this.instance)throw new Error(`AUR0013:${this.friendlyName}`);return this.instance}dispose(){this.instance=null}}function we(e){if(null==e)throw new Error("AUR0014")}function Re(e,t,r){if(e instanceof se&&4===e.strategy){const n=e.state;let s=n.length;const o=new Array(s);for(;s--;)o[s]=n[s].resolve(t,r);return o}return[e.resolve(t,r)]}function be(e){return new Error(`AUR0015:${e.name}`)}const ke=Object.freeze([]),Ae=Object.freeze({});function Oe(){}const $e=N.createInterface("IPlatform");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function je(e,t,r,n){var s,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(i=(o<3?s(i):o>3?s(t,r,i):s(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i}function Se(e,t){return function(r,n){t(r,n,e)}}var Ce,Ee;!function(e){e[e.trace=0]="trace",e[e.debug=1]="debug",e[e.info=2]="info",e[e.warn=3]="warn",e[e.error=4]="error",e[e.fatal=5]="fatal",e[e.none=6]="none"}(Ce||(Ce={})),function(e){e[e.noColors=0]="noColors",e[e.colors=1]="colors"}(Ee||(Ee={}));const Fe=N.createInterface("ILogConfig",(e=>e.instance(new Me(0,3)))),Ie=N.createInterface("ISink"),Te=N.createInterface("ILogEventFactory",(e=>e.singleton(Be))),Pe=N.createInterface("ILogger",(e=>e.singleton(Ge))),Ue=N.createInterface("ILogScope"),Le=Object.freeze({key:C.annotation.keyFor("logger-sink-handles"),define(t,r){return e.define(this.key,r.handles,t.prototype),t},getHandles(t){return e.get(this.key,t)}});function De(e){return function(t){return Le.define(t,e)}}const Ne=k({red:e=>`[31m${e}[39m`,green:e=>`[32m${e}[39m`,yellow:e=>`[33m${e}[39m`,blue:e=>`[34m${e}[39m`,magenta:e=>`[35m${e}[39m`,cyan:e=>`[36m${e}[39m`,white:e=>`[37m${e}[39m`,grey:e=>`[90m${e}[39m`});class Me{constructor(e,t){this.colorOptions=e,this.level=t}}const We=function(){const e=[k({TRC:"TRC",DBG:"DBG",INF:"INF",WRN:"WRN",ERR:"ERR",FTL:"FTL",QQQ:"???"}),k({TRC:Ne.grey("TRC"),DBG:Ne.grey("DBG"),INF:Ne.white("INF"),WRN:Ne.yellow("WRN"),ERR:Ne.red("ERR"),FTL:Ne.red("FTL"),QQQ:Ne.grey("???")})];return function(t,r){return t<=0?e[r].TRC:t<=1?e[r].DBG:t<=2?e[r].INF:t<=3?e[r].WRN:t<=4?e[r].ERR:t<=5?e[r].FTL:e[r].QQQ}}();function Qe(e,t){return 0===t?new Date(e).toISOString():Ne.grey(new Date(e).toISOString())}class xe{constructor(e,t,r,n,s,o){this.severity=e,this.message=t,this.optionalParams=r,this.scope=n,this.colorOptions=s,this.timestamp=o}toString(){const{severity:e,message:t,scope:r,colorOptions:n,timestamp:s}=this;return 0===r.length?`${Qe(s,n)} [${We(e,n)}] ${t}`:`${Qe(s,n)} [${We(e,n)} ${function(e,t){return 0===t?e.join("."):e.map(Ne.cyan).join(".")}(r,n)}] ${t}`}}let Be=class{constructor(e){this.config=e}createLogEvent(e,t,r,n){return new xe(t,r,n,e.scope,this.config.colorOptions,Date.now())}};Be=je([Se(0,Fe)],Be);let ze=class e{constructor(e){const t=e.console;this.handleEvent=function(e){const r=e.optionalParams;if(void 0===r||0===r.length){const r=e.toString();switch(e.severity){case 0:case 1:return t.debug(r);case 2:return t.info(r);case 3:return t.warn(r);case 4:case 5:return t.error(r)}}else{let n=e.toString(),s=0;for(;n.includes("%s");)n=n.replace("%s",String(r[s++]));switch(e.severity){case 0:case 1:return t.debug(n,...r.slice(s));case 2:return t.info(n,...r.slice(s));case 3:return t.warn(n,...r.slice(s));case 4:case 5:return t.error(n,...r.slice(s))}}}}static register(t){ye.singleton(Ie,e).register(t)}};ze=je([Se(0,$e)],ze);let Ge=class e{constructor(e,t,r,n=[],s=null){var o,i,c,a,l,u;let h,f,g,d,p,v;if(this.config=e,this.factory=t,this.scope=n,this.scopedLoggers=Object.create(null),null===s){this.root=this,this.parent=this,h=this.traceSinks=[],f=this.debugSinks=[],g=this.infoSinks=[],d=this.warnSinks=[],p=this.errorSinks=[],v=this.fatalSinks=[];for(const e of r){const t=Le.getHandles(e);(null===(o=null==t?void 0:t.includes(0))||void 0===o||o)&&h.push(e),(null===(i=null==t?void 0:t.includes(1))||void 0===i||i)&&f.push(e),(null===(c=null==t?void 0:t.includes(2))||void 0===c||c)&&g.push(e),(null===(a=null==t?void 0:t.includes(3))||void 0===a||a)&&d.push(e),(null===(l=null==t?void 0:t.includes(4))||void 0===l||l)&&p.push(e),(null===(u=null==t?void 0:t.includes(5))||void 0===u||u)&&v.push(e)}}else this.root=s.root,this.parent=s,h=this.traceSinks=s.traceSinks,f=this.debugSinks=s.debugSinks,g=this.infoSinks=s.infoSinks,d=this.warnSinks=s.warnSinks,p=this.errorSinks=s.errorSinks,v=this.fatalSinks=s.fatalSinks}trace(e,...t){this.config.level<=0&&this.emit(this.traceSinks,0,e,t)}debug(e,...t){this.config.level<=1&&this.emit(this.debugSinks,1,e,t)}info(e,...t){this.config.level<=2&&this.emit(this.infoSinks,2,e,t)}warn(e,...t){this.config.level<=3&&this.emit(this.warnSinks,3,e,t)}error(e,...t){this.config.level<=4&&this.emit(this.errorSinks,4,e,t)}fatal(e,...t){this.config.level<=5&&this.emit(this.fatalSinks,5,e,t)}scopeTo(t){const r=this.scopedLoggers;let n=r[t];return void 0===n&&(n=r[t]=new e(this.config,this.factory,void 0,this.scope.concat(t),this)),n}emit(e,t,r,n){const s="function"==typeof r?r():r,o=this.factory.createLogEvent(this,t,s,n);for(let t=0,r=e.length;t<r;++t)e[t].handleEvent(o)}};je([y],Ge.prototype,"trace",null),je([y],Ge.prototype,"debug",null),je([y],Ge.prototype,"info",null),je([y],Ge.prototype,"warn",null),je([y],Ge.prototype,"error",null),je([y],Ge.prototype,"fatal",null),Ge=je([Se(0,Fe),Se(1,Te),Se(2,V(Ie)),Se(3,Y(Ue)),Se(4,Z)],Ge);const He=k({create:({level:e=3,colorOptions:t=0,sinks:r=[]}={})=>k({register(n){n.register(ye.instance(Fe,new Me(t,e)));for(const e of r)n.register("function"==typeof e?ye.singleton(Ie,e):e);return n}})}),qe=N.createInterface((e=>e.singleton(Je)));function Ke(e){return e}class Ve{constructor(e){this.$transform=e,this.promiseCache=new Map,this.objectCache=new Map}transform(e){if(e instanceof Promise)return this.transformPromise(e);if("object"==typeof e&&null!==e)return this.transformObject(e);throw new Error(`Invalid input: ${String(e)}. Expected Promise or Object.`)}transformPromise(e){if(this.promiseCache.has(e))return this.promiseCache.get(e);const t=e.then((e=>this.transformObject(e)));return this.promiseCache.set(e,t),t.then((t=>{this.promiseCache.set(e,t)})),t}transformObject(e){if(this.objectCache.has(e))return this.objectCache.get(e);const t=this.$transform(this.analyze(e));return this.objectCache.set(e,t),t instanceof Promise&&t.then((t=>{this.objectCache.set(e,t)})),t}analyze(e){let t,r,n,s;const o=[];for(const i in e){switch(typeof(t=e[i])){case"object":if(null===t)continue;r="function"==typeof t.register,n=!1,s=ke;break;case"function":r="function"==typeof t.register,n=void 0!==t.prototype,s=C.resource.getAll(t);break;default:continue}o.push(new Ye(i,t,r,n,s))}return new Xe(e,o)}}class Je{constructor(){this.transformers=new Map}load(e,t=Ke){const r=this.transformers;let n=r.get(t);return void 0===n&&r.set(t,n=new Ve(t)),n.transform(e)}dispose(){this.transformers.clear()}}class Xe{constructor(e,t){this.raw=e,this.items=t}}class Ye{constructor(e,t,r,n,s){this.key=e,this.value=t,this.isRegistry=r,this.isConstructable=n,this.definitions=s}}class Ze{constructor(e,t){this.messageType=e,this.callback=t}handle(e){e instanceof this.messageType&&this.callback.call(null,e)}}const _e=N.createInterface("IEventAggregator",(e=>e.singleton(et)));class et{constructor(){this.eventLookup={},this.messageHandlers=[]}publish(e,t){if(!e)throw new Error(`Invalid channel name or instance: ${e}.`);if("string"==typeof e){let r=this.eventLookup[e];if(void 0!==r){r=r.slice();let n=r.length;for(;n-- >0;)r[n](t,e)}}else{const t=this.messageHandlers.slice();let r=t.length;for(;r-- >0;)t[r].handle(e)}}subscribe(e,t){if(!e)throw new Error(`Invalid channel name or type: ${e}.`);let r,n;return"string"==typeof e?(void 0===this.eventLookup[e]&&(this.eventLookup[e]=[]),r=t,n=this.eventLookup[e]):(r=new Ze(e,t),n=this.messageHandlers),n.push(r),{dispose(){const e=n.indexOf(r);-1!==e&&n.splice(e,1)}}}subscribeOnce(e,t){const r=this.subscribe(e,(function(e,n){r.dispose(),t(e,n)}));return r}}export{Xe as AnalyzedModule,Ee as ColorOptions,ze as ConsoleSink,D as ContainerConfiguration,N as DI,xe as DefaultLogEvent,Be as DefaultLogEventFactory,Ge as DefaultLogger,L as DefaultResolver,et as EventAggregator,Q as IContainer,_e as IEventAggregator,Fe as ILogConfig,Te as ILogEventFactory,Pe as ILogger,qe as IModuleLoader,$e as IPlatform,x as IServiceLocator,Ie as ISink,me as InstanceProvider,Me as LogConfig,Ce as LogLevel,He as LoggerConfiguration,Ye as ModuleItem,C as Protocol,ye as Registration,V as all,y as bound,a as camelCase,p as compareNumber,ke as emptyArray,Ae as emptyObject,_ as factory,R as firstDefined,Ne as format,F as fromAnnotationOrDefinitionOrTypeOrDefault,I as fromAnnotationOrTypeOrDefault,T as fromDefinitionOrDefault,b as getPrototypeChain,Z as ignore,z as inject,s as isArrayIndex,A as isNativeFunction,o as isNumberOrBigInt,i as isStringOrDate,u as kebabCase,X as lazy,m as mergeArrays,v as mergeDistinct,w as mergeObjects,ee as newInstanceForScope,te as newInstanceOf,g as nextId,Oe as noop,O as onResolve,Y as optional,l as pascalCase,d as resetId,$ as resolveAll,K as singleton,De as sink,h as toArray,H as transient};
