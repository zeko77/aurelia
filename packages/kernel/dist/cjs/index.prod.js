Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@aurelia/metadata"),t=require("@aurelia/platform");const r={};function n(e){switch(typeof e){case"number":return e>=0&&(0|e)===e;case"string":{const t=r[e];if(void 0!==t)return t;const n=e.length;if(0===n)return r[e]=!1;let o=0,s=0;for(;s<n;++s)if(o=e.charCodeAt(s),0===s&&48===o&&n>1||o<48||o>57)return r[e]=!1;return r[e]=!0}default:return!1}}const o=function(){let e;!function(e){e[e.none=0]="none",e[e.digit=1]="digit",e[e.upper=2]="upper",e[e.lower=3]="lower"}(e||(e={}));const t=Object.assign(Object.create(null),{0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0});function r(e){return""===e?0:e!==e.toUpperCase()?3:e!==e.toLowerCase()?2:!0===t[e]?1:0}return function(e,t){const n=e.length;if(0===n)return e;let o,s=!1,i="",a="",l=0,c=e.charAt(0),u=r(c),f=0;for(;f<n;++f)o=l,a=c,l=u,c=e.charAt(f+1),u=r(c),0===l?i.length>0&&(s=!0):(!s&&i.length>0&&2===l&&(s=3===o||3===u),i+=t(a,s),s=!1);return i}}(),s=function(){const e=Object.create(null);function t(e,t){return t?e.toUpperCase():e.toLowerCase()}return function(r){let n=e[r];return void 0===n&&(n=e[r]=o(r,t)),n}}(),i=function(){const e=Object.create(null);return function(t){let r=e[t];return void 0===r&&(r=s(t),r.length>0&&(r=r[0].toUpperCase()+r.slice(1)),e[t]=r),r}}(),a=function(){const e=Object.create(null);function t(e,t){return t?`-${e.toLowerCase()}`:e.toLowerCase()}return function(r){let n=e[r];return void 0===n&&(n=e[r]=o(r,t)),n}}();const l={};function c(e,t,r){return{configurable:!0,enumerable:r.enumerable,get(){const e=r.value.bind(this);return Reflect.defineProperty(this,t,{value:e,writable:!0,configurable:!0,enumerable:r.enumerable}),e}}}const u=function(){const e=Function.prototype,t=Object.getPrototypeOf,r=new WeakMap;let n,o=e,s=0;return function(i){if(n=r.get(i),void 0===n)for(r.set(i,n=[o=i]),s=0;(o=t(o))!==e;)n[++s]=o;return n}}();function f(...e){return Object.assign(Object.create(null),...e)}const h=function(){const e=new WeakMap;let t=!1,r="",n=0;return function(o){return t=e.get(o),void 0===t&&(r=o.toString(),n=r.length,t=n>=29&&n<=100&&125===r.charCodeAt(n-1)&&r.charCodeAt(n-2)<=32&&93===r.charCodeAt(n-3)&&101===r.charCodeAt(n-4)&&100===r.charCodeAt(n-5)&&111===r.charCodeAt(n-6)&&99===r.charCodeAt(n-7)&&32===r.charCodeAt(n-8)&&101===r.charCodeAt(n-9)&&118===r.charCodeAt(n-10)&&105===r.charCodeAt(n-11)&&116===r.charCodeAt(n-12)&&97===r.charCodeAt(n-13)&&110===r.charCodeAt(n-14)&&88===r.charCodeAt(n-15),e.set(o,t)),t}}();const g={name:"au:annotation",appendTo(t,r){const n=e.Metadata.getOwn(g.name,t);void 0===n?e.Metadata.define(g.name,[r],t):n.push(r)},set(t,r,n){e.Metadata.define(g.keyFor(r),n,t)},get:(t,r)=>e.Metadata.getOwn(g.keyFor(r),t),getKeys(t){let r=e.Metadata.getOwn(g.name,t);return void 0===r&&e.Metadata.define(g.name,r=[],t),r},isKey:e=>e.startsWith(g.name),keyFor:(e,t)=>void 0===t?`${g.name}:${e}`:`${g.name}:${e}:${t}`},p={name:"au:resource",appendTo(t,r){const n=e.Metadata.getOwn(p.name,t);void 0===n?e.Metadata.define(p.name,[r],t):n.push(r)},has:t=>e.Metadata.hasOwn(p.name,t),getAll(t){const r=e.Metadata.getOwn(p.name,t);return void 0===r?oe:r.map((r=>e.Metadata.getOwn(r,t)))},getKeys(t){let r=e.Metadata.getOwn(p.name,t);return void 0===r&&e.Metadata.define(p.name,r=[],t),r},isKey:e=>e.startsWith(p.name),keyFor:(e,t)=>void 0===t?`${p.name}:${e}`:`${p.name}:${e}:${t}`},d={annotation:g,resource:p},v=Object.prototype.hasOwnProperty;e.applyMetadataPolyfill(Reflect,!1,!1);class y{constructor(e,t){this.container=e,this.key=t}instance(e){return this.registerResolver(0,e)}singleton(e){return this.registerResolver(1,e)}transient(e){return this.registerResolver(2,e)}callback(e){return this.registerResolver(3,e)}cachedCallback(e){return this.registerResolver(3,Y(e))}aliasTo(e){return this.registerResolver(5,e)}registerResolver(e,t){const{container:r,key:n}=this;return this.container=this.key=void 0,r.registerResolver(n,new Q(n,e,t))}}function m(e){const t=e.slice(),r=Object.keys(e),o=r.length;let s;for(let i=0;i<o;++i)s=r[i],n(s)||(t[s]=e[s]);return t}const w={none(e){throw Error(`AUR0002:${e.toString()}`)},singleton:e=>new Q(e,1,e),transient:e=>new Q(e,2,e)};class b{constructor(e,t){this.inheritParentResources=e,this.defaultResolver=t}static from(e){var t,r;return void 0===e||e===b.DEFAULT?b.DEFAULT:new b(null!==(t=e.inheritParentResources)&&void 0!==t&&t,null!==(r=e.defaultResolver)&&void 0!==r?r:w.singleton)}}b.DEFAULT=b.from({});const R={createContainer:e=>new V(null,b.from(e)),getDesignParamtypes:t=>e.Metadata.getOwn("design:paramtypes",t),getAnnotationParamtypes(t){const r=d.annotation.keyFor("di:paramtypes");return e.Metadata.getOwn(r,t)},getOrCreateAnnotationParamTypes:k,getDependencies:x,createInterface(e,t){const r="function"==typeof e?e:t,n="string"==typeof e?e:void 0,o=function(e,t,r){if(null==e||void 0!==new.target)throw new Error(`AUR0001:${o.friendlyName}`);k(e)[r]=o};return o.$isInterface=!0,o.friendlyName=null==n?"(anonymous)":n,null!=r&&(o.register=function(e,t){return r(new y(e,null!=t?t:o))}),o.toString=function(){return`InterfaceSymbol<${o.friendlyName}>`},o},inject:(...e)=>function(t,r,n){if("number"==typeof n){const r=k(t),o=e[0];void 0!==o&&(r[n]=o)}else if(r){const n=k(t.constructor),o=e[0];void 0!==o&&(n[r]=o)}else if(n){const t=k(n.value);let r;for(let n=0;n<e.length;++n)r=e[n],void 0!==r&&(t[n]=r)}else{const r=k(t);let n;for(let t=0;t<e.length;++t)n=e[t],void 0!==n&&(r[t]=n)}},transient:e=>(e.register=function(t){return Z.transient(e,e).register(t,e)},e.registerInRequestor=!1,e),singleton:(e,t=I)=>(e.register=function(t){return Z.singleton(e,e).register(t,e)},e.registerInRequestor=t.scoped,e)};function x(t){const r=d.annotation.keyFor("di:dependencies");let o=e.Metadata.getOwn(r,t);if(void 0===o){const s=t.inject;if(void 0===s){const e=R.getDesignParamtypes(t),r=R.getAnnotationParamtypes(t);if(void 0===e)if(void 0===r){const e=Object.getPrototypeOf(t);o="function"==typeof e&&e!==Function.prototype?m(x(e)):[]}else o=m(r);else if(void 0===r)o=m(e);else{o=m(e);let t,s=r.length,i=0;for(;i<s;++i)t=r[i],void 0!==t&&(o[i]=t);const a=Object.keys(r);let l;for(i=0,s=a.length,i=0;i<s;++i)l=a[i],n(l)||(o[l]=r[l])}}else o=m(s);e.Metadata.define(r,o,t),d.annotation.appendTo(t,r)}return o}function k(t){const r=d.annotation.keyFor("di:paramtypes");let n=e.Metadata.getOwn(r,t);return void 0===n&&(e.Metadata.define(r,n=[],t),d.annotation.appendTo(t,r)),n}const O=R.createInterface("IContainer"),A=O;function j(e){return function(t){const r=function(e,t,n){R.inject(r)(e,t,n)};return r.$isResolver=!0,r.resolve=function(r,n){return e(t,r,n)},r}}const C=R.inject;function S(e){return R.transient(e)}const I={scoped:!1};const E=(L=(e,t,r,n)=>r.getAll(e,n),function(e,t){t=!!t;const r=function(e,t,n){R.inject(r)(e,t,n)};return r.$isResolver=!0,r.resolve=function(r,n){return L(e,r,n,t)},r});var L;const $=j(((e,t,r)=>()=>r.get(e))),F=j(((e,t,r)=>r.has(e,!0)?r.get(e):void 0));function P(e,t,r){R.inject(P)(e,t,r)}P.$isResolver=!0,P.resolve=()=>{};const D=j(((e,t,r)=>(...n)=>t.getFactory(e).construct(r,n))),M=j(((e,t,r)=>{const n=U(e,t,r),o=new ee(String(e),n);return r.registerResolver(e,o),n})),T=j(((e,t,r)=>U(e,t,r)));function U(e,t,r){return t.getFactory(e).construct(r)}var N;!function(e){e[e.instance=0]="instance",e[e.singleton=1]="singleton",e[e.transient=2]="transient",e[e.callback=3]="callback",e[e.array=4]="array",e[e.alias=5]="alias"}(N||(N={}));class Q{constructor(e,t,r){this.key=e,this.strategy=t,this.state=r,this.resolving=!1}get $isResolver(){return!0}register(e,t){return e.registerResolver(t||this.key,this)}resolve(e,t){switch(this.strategy){case 0:return this.state;case 1:if(this.resolving)throw new Error(`AUR0003:${this.state.name}`);return this.resolving=!0,this.state=e.getFactory(this.state).construct(t),this.strategy=0,this.resolving=!1,this.state;case 2:{const r=e.getFactory(this.state);if(null===r)throw new Error(`AUR0004:${String(this.key)}`);return r.construct(t)}case 3:return this.state(e,t,this);case 4:return this.state[0].resolve(e,t);case 5:return t.get(this.state);default:throw new Error(`AUR0005:${this.strategy}`)}}getFactory(e){var t,r,n;switch(this.strategy){case 1:case 2:return e.getFactory(this.state);case 5:return null!==(n=null===(r=null===(t=e.getResolver(this.state))||void 0===t?void 0:t.getFactory)||void 0===r?void 0:r.call(t,e))&&void 0!==n?n:null;default:return null}}}function W(e){return this.get(e)}function B(e,t){return t(e)}class z{constructor(e,t){this.Type=e,this.dependencies=t,this.transformers=null}construct(e,t){let r;return r=void 0===t?new this.Type(...this.dependencies.map(W,e)):new this.Type(...this.dependencies.map(W,e),...t),null==this.transformers?r:this.transformers.reduce(B,r)}registerTransformer(e){var t;(null!==(t=this.transformers)&&void 0!==t?t:this.transformers=[]).push(e)}}const q={$isResolver:!0,resolve:(e,t)=>t};function G(e){return"function"==typeof e.register}function H(e){return function(e){return G(e)&&"boolean"==typeof e.registerInRequestor}(e)&&e.registerInRequestor}const K=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]);d.annotation.keyFor("di:factory");let _=0;class V{constructor(e,t){this.parent=e,this.config=t,this.id=++_,this.registerDepth=0,this.disposableResolvers=new Set,null===e?(this.root=this,this.resolvers=new Map,this.factories=new Map,this.resourceResolvers=Object.create(null)):(this.root=e.root,this.resolvers=new Map,this.factories=e.factories,this.resourceResolvers=t.inheritParentResources?Object.assign(Object.create(null),e.resourceResolvers,this.root.resourceResolvers):Object.create(null)),this.resolvers.set(O,q)}get depth(){return null===this.parent?0:this.parent.depth+1}register(...t){if(100==++this.registerDepth)throw new Error(`AUR0006:${t.map(String)}`);let r,n,o,s,i,a=0,l=t.length;for(;a<l;++a)if(r=t[a],e.isObject(r))if(G(r))r.register(this);else if(d.resource.has(r)){const e=d.resource.getAll(r);if(1===e.length)e[0].register(this);else for(s=0,i=e.length;i>s;)e[s].register(this),++s}else if(void 0!==r.prototype)Z.singleton(r,r).register(this);else for(n=Object.keys(r),s=0,i=n.length;s<i;++s)o=r[n[s]],e.isObject(o)&&(G(o)?o.register(this):this.register(o));return--this.registerDepth,this}registerResolver(e,t,r=!1){te(e);const n=this.resolvers,o=n.get(e);if(null==o){if(n.set(e,t),function(e){return"string"==typeof e&&e.indexOf(":")>0}(e)){if(void 0!==this.resourceResolvers[e])throw new Error(`AUR0007:${e}`);this.resourceResolvers[e]=t}}else o instanceof Q&&4===o.strategy?o.state.push(t):n.set(e,new Q(e,4,[o,t]));return r&&this.disposableResolvers.add(t),t}registerTransformer(e,t){const r=this.getResolver(e);if(null==r)return!1;if(r.getFactory){const e=r.getFactory(this);return null!=e&&(e.registerTransformer(t),!0)}return!1}getResolver(e,t=!0){if(te(e),void 0!==e.resolve)return e;let r,n=this;for(;null!=n;){if(r=n.resolvers.get(e),null!=r)return r;if(null==n.parent){const r=H(e)?this:n;return t?this.jitRegister(e,r):null}n=n.parent}return null}has(e,t=!1){return!!this.resolvers.has(e)||!(!t||null==this.parent)&&this.parent.has(e,!0)}get(e){if(te(e),e.$isResolver)return e.resolve(this,this);let t,r=this;for(;null!=r;){if(t=r.resolvers.get(e),null!=t)return t.resolve(r,this);if(null==r.parent){const n=H(e)?this:r;return t=this.jitRegister(e,n),t.resolve(r,this)}r=r.parent}throw new Error(`AUR0008:${e}`)}getAll(e,t=!1){te(e);const r=this;let n,o=r;if(t){let t=oe;for(;null!=o;)n=o.resolvers.get(e),null!=n&&(t=t.concat(re(n,o,r))),o=o.parent;return t}for(;null!=o;){if(n=o.resolvers.get(e),null!=n)return re(n,o,r);if(o=o.parent,null==o)return oe}return oe}invoke(e,t){if(h(e))throw ne(e);return void 0===t?new e(...x(e).map(W,this)):new e(...x(e).map(W,this),...t)}getFactory(e){let t=this.factories.get(e);if(void 0===t){if(h(e))throw ne(e);this.factories.set(e,t=new z(e,x(e)))}return t}registerFactory(e,t){this.factories.set(e,t)}createChild(e){return new V(this,void 0===e&&this.config.inheritParentResources?this.config===b.DEFAULT?this.config:b.from({...this.config,inheritParentResources:!1}):b.from(null!=e?e:this.config))}disposeResolvers(){let e;for(e of this.disposableResolvers)e.dispose()}find(t,r){const n=t.keyFrom(r);let o=this.resourceResolvers[n];if(void 0===o&&(o=this.root.resourceResolvers[n],void 0===o))return null;if(null===o)return null;if("function"==typeof o.getFactory){const r=o.getFactory(this);if(null==r)return null;const n=e.Metadata.getOwn(t.name,r.Type);return void 0===n?null:n}return null}create(e,t){var r,n;const o=e.keyFrom(t);let s=this.resourceResolvers[o];return void 0===s?(s=this.root.resourceResolvers[o],void 0===s?null:null!==(r=s.resolve(this.root,this))&&void 0!==r?r:null):null!==(n=s.resolve(this,this))&&void 0!==n?n:null}dispose(){this.disposableResolvers.size>0&&this.disposeResolvers(),this.resolvers.clear()}jitRegister(e,t){if("function"!=typeof e)throw new Error(`AUR0009:${e}`);if(K.has(e.name))throw new Error(`AUR0010:${e.name}`);if(G(e)){const r=e.register(t,e);if(!(r instanceof Object)||null==r.resolve){const r=t.resolvers.get(e);if(null!=r)return r;throw new Error("AUR0011")}return r}if(d.resource.has(e)){const r=d.resource.getAll(e);if(1===r.length)r[0].register(t);else{const e=r.length;for(let n=0;n<e;++n)r[n].register(t)}const n=t.resolvers.get(e);if(null!=n)return n;throw new Error("AUR0011")}if(e.$isInterface)throw new Error(`AUR0012:${e.friendlyName}`);{const r=this.config.defaultResolver(e,t);return t.resolvers.set(e,r),r}}}class J{constructor(e,t){this.key=e,this.params=t}register(e){if(e.has(this.key,!0)){e.get(this.key).register(e,...this.params)}else e.register(...this.params.filter((e=>"object"==typeof e)))}}const X=new WeakMap;function Y(e){return function(t,r,n){let o=X.get(t);if(void 0===o&&X.set(t,o=new WeakMap),o.has(n))return o.get(n);const s=e(t,r,n);return o.set(n,s),s}}const Z={instance:(e,t)=>new Q(e,0,t),singleton:(e,t)=>new Q(e,1,t),transient:(e,t)=>new Q(e,2,t),callback:(e,t)=>new Q(e,3,t),cachedCallback:(e,t)=>new Q(e,3,Y(t)),aliasTo:(e,t)=>new Q(t,5,e),defer:(e,...t)=>new J(e,t)};class ee{constructor(e,t){this.friendlyName=e,this.instance=null,void 0!==t&&(this.instance=t)}prepare(e){this.instance=e}get $isResolver(){return!0}resolve(){if(null==this.instance)throw new Error(`AUR0013:${this.friendlyName}`);return this.instance}dispose(){this.instance=null}}function te(e){if(null==e)throw new Error("AUR0014")}function re(e,t,r){if(e instanceof Q&&4===e.strategy){const n=e.state;let o=n.length;const s=new Array(o);for(;o--;)s[o]=n[o].resolve(t,r);return s}return[e.resolve(t,r)]}function ne(e){return new Error(`AUR0015:${e.name}`)}const oe=Object.freeze([]),se=Object.freeze({});const ie=R.createInterface("IPlatform");
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
***************************************************************************** */function ae(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i}function le(e,t){return function(r,n){t(r,n,e)}}var ce,ue;exports.LogLevel=void 0,(ce=exports.LogLevel||(exports.LogLevel={}))[ce.trace=0]="trace",ce[ce.debug=1]="debug",ce[ce.info=2]="info",ce[ce.warn=3]="warn",ce[ce.error=4]="error",ce[ce.fatal=5]="fatal",ce[ce.none=6]="none",exports.ColorOptions=void 0,(ue=exports.ColorOptions||(exports.ColorOptions={}))[ue.noColors=0]="noColors",ue[ue.colors=1]="colors";const fe=R.createInterface("ILogConfig",(e=>e.instance(new me(0,3)))),he=R.createInterface("ISink"),ge=R.createInterface("ILogEventFactory",(e=>e.singleton(exports.DefaultLogEventFactory))),pe=R.createInterface("ILogger",(e=>e.singleton(exports.DefaultLogger))),de=R.createInterface("ILogScope"),ve=Object.freeze({key:d.annotation.keyFor("logger-sink-handles"),define(t,r){return e.Metadata.define(this.key,r.handles,t.prototype),t},getHandles(t){return e.Metadata.get(this.key,t)}});const ye=f({red:e=>`[31m${e}[39m`,green:e=>`[32m${e}[39m`,yellow:e=>`[33m${e}[39m`,blue:e=>`[34m${e}[39m`,magenta:e=>`[35m${e}[39m`,cyan:e=>`[36m${e}[39m`,white:e=>`[37m${e}[39m`,grey:e=>`[90m${e}[39m`});class me{constructor(e,t){this.colorOptions=e,this.level=t}}const we=function(){const e=[f({TRC:"TRC",DBG:"DBG",INF:"INF",WRN:"WRN",ERR:"ERR",FTL:"FTL",QQQ:"???"}),f({TRC:ye.grey("TRC"),DBG:ye.grey("DBG"),INF:ye.white("INF"),WRN:ye.yellow("WRN"),ERR:ye.red("ERR"),FTL:ye.red("FTL"),QQQ:ye.grey("???")})];return function(t,r){return t<=0?e[r].TRC:t<=1?e[r].DBG:t<=2?e[r].INF:t<=3?e[r].WRN:t<=4?e[r].ERR:t<=5?e[r].FTL:e[r].QQQ}}();function be(e,t){return 0===t?new Date(e).toISOString():ye.grey(new Date(e).toISOString())}class Re{constructor(e,t,r,n,o,s){this.severity=e,this.message=t,this.optionalParams=r,this.scope=n,this.colorOptions=o,this.timestamp=s}toString(){const{severity:e,message:t,scope:r,colorOptions:n,timestamp:o}=this;return 0===r.length?`${be(o,n)} [${we(e,n)}] ${t}`:`${be(o,n)} [${we(e,n)} ${function(e,t){return 0===t?e.join("."):e.map(ye.cyan).join(".")}(r,n)}] ${t}`}}exports.DefaultLogEventFactory=class{constructor(e){this.config=e}createLogEvent(e,t,r,n){return new Re(t,r,n,e.scope,this.config.colorOptions,Date.now())}},exports.DefaultLogEventFactory=ae([le(0,fe)],exports.DefaultLogEventFactory),exports.ConsoleSink=class e{constructor(e){const t=e.console;this.handleEvent=function(e){const r=e.optionalParams;if(void 0===r||0===r.length){const r=e.toString();switch(e.severity){case 0:case 1:return t.debug(r);case 2:return t.info(r);case 3:return t.warn(r);case 4:case 5:return t.error(r)}}else{let n=e.toString(),o=0;for(;n.includes("%s");)n=n.replace("%s",String(r[o++]));switch(e.severity){case 0:case 1:return t.debug(n,...r.slice(o));case 2:return t.info(n,...r.slice(o));case 3:return t.warn(n,...r.slice(o));case 4:case 5:return t.error(n,...r.slice(o))}}}}static register(t){Z.singleton(he,e).register(t)}},exports.ConsoleSink=ae([le(0,ie)],exports.ConsoleSink),exports.DefaultLogger=class e{constructor(e,t,r,n=[],o=null){var s,i,a,l,c,u;let f,h,g,p,d,v;if(this.config=e,this.factory=t,this.scope=n,this.scopedLoggers=Object.create(null),null===o){this.root=this,this.parent=this,f=this.traceSinks=[],h=this.debugSinks=[],g=this.infoSinks=[],p=this.warnSinks=[],d=this.errorSinks=[],v=this.fatalSinks=[];for(const e of r){const t=ve.getHandles(e);(null===(s=null==t?void 0:t.includes(0))||void 0===s||s)&&f.push(e),(null===(i=null==t?void 0:t.includes(1))||void 0===i||i)&&h.push(e),(null===(a=null==t?void 0:t.includes(2))||void 0===a||a)&&g.push(e),(null===(l=null==t?void 0:t.includes(3))||void 0===l||l)&&p.push(e),(null===(c=null==t?void 0:t.includes(4))||void 0===c||c)&&d.push(e),(null===(u=null==t?void 0:t.includes(5))||void 0===u||u)&&v.push(e)}}else this.root=o.root,this.parent=o,f=this.traceSinks=o.traceSinks,h=this.debugSinks=o.debugSinks,g=this.infoSinks=o.infoSinks,p=this.warnSinks=o.warnSinks,d=this.errorSinks=o.errorSinks,v=this.fatalSinks=o.fatalSinks}trace(e,...t){this.config.level<=0&&this.emit(this.traceSinks,0,e,t)}debug(e,...t){this.config.level<=1&&this.emit(this.debugSinks,1,e,t)}info(e,...t){this.config.level<=2&&this.emit(this.infoSinks,2,e,t)}warn(e,...t){this.config.level<=3&&this.emit(this.warnSinks,3,e,t)}error(e,...t){this.config.level<=4&&this.emit(this.errorSinks,4,e,t)}fatal(e,...t){this.config.level<=5&&this.emit(this.fatalSinks,5,e,t)}scopeTo(t){const r=this.scopedLoggers;let n=r[t];return void 0===n&&(n=r[t]=new e(this.config,this.factory,void 0,this.scope.concat(t),this)),n}emit(e,t,r,n){const o="function"==typeof r?r():r,s=this.factory.createLogEvent(this,t,o,n);for(let t=0,r=e.length;t<r;++t)e[t].handleEvent(s)}},ae([c],exports.DefaultLogger.prototype,"trace",null),ae([c],exports.DefaultLogger.prototype,"debug",null),ae([c],exports.DefaultLogger.prototype,"info",null),ae([c],exports.DefaultLogger.prototype,"warn",null),ae([c],exports.DefaultLogger.prototype,"error",null),ae([c],exports.DefaultLogger.prototype,"fatal",null),exports.DefaultLogger=ae([le(0,fe),le(1,ge),le(2,E(he)),le(3,F(de)),le(4,P)],exports.DefaultLogger);const xe=f({create:({level:e=3,colorOptions:t=0,sinks:r=[]}={})=>f({register(n){n.register(Z.instance(fe,new me(t,e)));for(const e of r)n.register("function"==typeof e?Z.singleton(he,e):e);return n}})}),ke=R.createInterface((e=>e.singleton(je)));function Oe(e){return e}class Ae{constructor(e){this.$transform=e,this.promiseCache=new Map,this.objectCache=new Map}transform(e){if(e instanceof Promise)return this.transformPromise(e);if("object"==typeof e&&null!==e)return this.transformObject(e);throw new Error(`Invalid input: ${String(e)}. Expected Promise or Object.`)}transformPromise(e){if(this.promiseCache.has(e))return this.promiseCache.get(e);const t=e.then((e=>this.transformObject(e)));return this.promiseCache.set(e,t),t.then((t=>{this.promiseCache.set(e,t)})),t}transformObject(e){if(this.objectCache.has(e))return this.objectCache.get(e);const t=this.$transform(this.analyze(e));return this.objectCache.set(e,t),t instanceof Promise&&t.then((t=>{this.objectCache.set(e,t)})),t}analyze(e){let t,r,n,o;const s=[];for(const i in e){switch(typeof(t=e[i])){case"object":if(null===t)continue;r="function"==typeof t.register,n=!1,o=oe;break;case"function":r="function"==typeof t.register,n=void 0!==t.prototype,o=d.resource.getAll(t);break;default:continue}s.push(new Se(i,t,r,n,o))}return new Ce(e,s)}}class je{constructor(){this.transformers=new Map}load(e,t=Oe){const r=this.transformers;let n=r.get(t);return void 0===n&&r.set(t,n=new Ae(t)),n.transform(e)}dispose(){this.transformers.clear()}}class Ce{constructor(e,t){this.raw=e,this.items=t}}class Se{constructor(e,t,r,n,o){this.key=e,this.value=t,this.isRegistry=r,this.isConstructable=n,this.definitions=o}}class Ie{constructor(e,t){this.messageType=e,this.callback=t}handle(e){e instanceof this.messageType&&this.callback.call(null,e)}}const Ee=R.createInterface("IEventAggregator",(e=>e.singleton(Le)));class Le{constructor(){this.eventLookup={},this.messageHandlers=[]}publish(e,t){if(!e)throw new Error(`Invalid channel name or instance: ${e}.`);if("string"==typeof e){let r=this.eventLookup[e];if(void 0!==r){r=r.slice();let n=r.length;for(;n-- >0;)r[n](t,e)}}else{const t=this.messageHandlers.slice();let r=t.length;for(;r-- >0;)t[r].handle(e)}}subscribe(e,t){if(!e)throw new Error(`Invalid channel name or type: ${e}.`);let r,n;return"string"==typeof e?(void 0===this.eventLookup[e]&&(this.eventLookup[e]=[]),r=t,n=this.eventLookup[e]):(r=new Ie(e,t),n=this.messageHandlers),n.push(r),{dispose(){const e=n.indexOf(r);-1!==e&&n.splice(e,1)}}}subscribeOnce(e,t){const r=this.subscribe(e,(function(e,n){r.dispose(),t(e,n)}));return r}}Object.defineProperty(exports,"Metadata",{enumerable:!0,get:function(){return e.Metadata}}),Object.defineProperty(exports,"applyMetadataPolyfill",{enumerable:!0,get:function(){return e.applyMetadataPolyfill}}),Object.defineProperty(exports,"isNullOrUndefined",{enumerable:!0,get:function(){return e.isNullOrUndefined}}),Object.defineProperty(exports,"isObject",{enumerable:!0,get:function(){return e.isObject}}),Object.defineProperty(exports,"metadata",{enumerable:!0,get:function(){return e.metadata}}),Object.defineProperty(exports,"Platform",{enumerable:!0,get:function(){return t.Platform}}),Object.defineProperty(exports,"Task",{enumerable:!0,get:function(){return t.Task}}),Object.defineProperty(exports,"TaskAbortError",{enumerable:!0,get:function(){return t.TaskAbortError}}),Object.defineProperty(exports,"TaskQueue",{enumerable:!0,get:function(){return t.TaskQueue}}),Object.defineProperty(exports,"TaskQueuePriority",{enumerable:!0,get:function(){return t.TaskQueuePriority}}),Object.defineProperty(exports,"TaskStatus",{enumerable:!0,get:function(){return t.TaskStatus}}),exports.AnalyzedModule=Ce,exports.ContainerConfiguration=b,exports.DI=R,exports.DefaultLogEvent=Re,exports.DefaultResolver=w,exports.EventAggregator=Le,exports.IContainer=O,exports.IEventAggregator=Ee,exports.ILogConfig=fe,exports.ILogEventFactory=ge,exports.ILogger=pe,exports.IModuleLoader=ke,exports.IPlatform=ie,exports.IServiceLocator=A,exports.ISink=he,exports.InstanceProvider=ee,exports.LogConfig=me,exports.LoggerConfiguration=xe,exports.ModuleItem=Se,exports.Protocol=d,exports.Registration=Z,exports.all=E,exports.bound=c,exports.camelCase=s,exports.compareNumber=function(e,t){return e-t},exports.emptyArray=oe,exports.emptyObject=se,exports.factory=D,exports.firstDefined=function(...e){const t=e.length;let r;for(let n=0;n<t;++n)if(r=e[n],void 0!==r)return r;throw new Error("No default value found")},exports.format=ye,exports.fromAnnotationOrDefinitionOrTypeOrDefault=function(t,r,n,o){let s=e.Metadata.getOwn(d.annotation.keyFor(t),n);return void 0===s?(s=r[t],void 0===s?(s=n[t],void 0!==s&&v.call(n,t)?s:o()):s):s},exports.fromAnnotationOrTypeOrDefault=function(t,r,n){let o=e.Metadata.getOwn(d.annotation.keyFor(t),r);return void 0===o?(o=r[t],void 0!==o&&v.call(r,t)?o:n()):o},exports.fromDefinitionOrDefault=function(e,t,r){const n=t[e];return void 0===n?r():n},exports.getPrototypeChain=u,exports.ignore=P,exports.inject=C,exports.isArrayIndex=n,exports.isNativeFunction=h,exports.isNumberOrBigInt=function(e){switch(typeof e){case"number":case"bigint":return!0;default:return!1}},exports.isStringOrDate=function(e){switch(typeof e){case"string":return!0;case"object":return e instanceof Date;default:return!1}},exports.kebabCase=a,exports.lazy=$,exports.mergeArrays=function(...e){const t=[];let r=0;const n=e.length;let o,s=0,i=0;for(;i<n;++i)if(o=e[i],void 0!==o){s=o.length;let e=0;for(;e<s;++e)t[r++]=o[e]}return t},exports.mergeDistinct=function(e,t,r){if(null==e||e===oe)return null==t||t===oe?oe:r?t.slice(0):t;if(null==t||t===oe)return r?e.slice(0):e;const n={},o=r?e.slice(0):e;let s,i=e.length,a=t.length;for(;i-- >0;)n[e[i]]=!0;for(;a-- >0;)s=t[a],void 0===n[s]&&(o.push(s),n[s]=!0);return o},exports.mergeObjects=function(...e){const t={},r=e.length;let n,o;for(let s=0;s<r;++s)if(n=e[s],void 0!==n)for(o in n)t[o]=n[o];return t},exports.newInstanceForScope=M,exports.newInstanceOf=T,exports.nextId=function(e){return void 0===l[e]&&(l[e]=0),++l[e]},exports.noop=function(){},exports.onResolve=function(e,t){return e instanceof Promise?e.then(t):t(e)},exports.optional=F,exports.pascalCase=i,exports.resetId=function(e){l[e]=0},exports.resolveAll=function(...e){let t,r,n,o=0,s=e.length;for(;o<s;++o)t=e[o],(t=e[o])instanceof Promise&&(void 0===r?r=t:void 0===n?n=[r,t]:n.push(t));return void 0===n?r:Promise.all(n)},exports.singleton=function(e){return"function"==typeof e?R.singleton(e):function(t){return R.singleton(t,e)}},exports.sink=function(e){return function(t){return ve.define(t,e)}},exports.toArray=function(e){const{length:t}=e,r=Array(t);let n=0;for(;n<t;++n)r[n]=e[n];return r},exports.transient=function(e){return null==e?S:S(e)};
