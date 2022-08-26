import { BindingMode as t, subscriberCollection as i, withFlushQueue as e, connectable as s, registerAliases as n, ConnectableSwitcher as r, ProxyObservable as o, Scope as l, ICoercionConfiguration as h, IObserverLocator as c, IExpressionParser as a, AccessScopeExpression as u, DelegationStrategy as f, BindingBehaviorExpression as d, BindingBehaviorFactory as v, PrimitiveLiteralExpression as m, bindingBehavior as g, BindingInterceptor as p, ISignaler as w, PropertyAccessor as b, INodeObserverLocator as x, SetterObserver as y, IDirtyChecker as k, alias as C, applyMutationsToIndices as A, getCollectionObserver as R, BindingContext as S, synchronizeIndices as E, valueConverter as B } from "../../../runtime/dist/native-modules/index.mjs";

export { LifecycleFlags, bindingBehavior, valueConverter } from "../../../runtime/dist/native-modules/index.mjs";

import { Protocol as I, getPrototypeChain as T, firstDefined as D, kebabCase as $, noop as P, DI as O, emptyArray as L, all as q, Registration as U, IPlatform as _, mergeArrays as F, fromDefinitionOrDefault as V, pascalCase as M, fromAnnotationOrTypeOrDefault as j, fromAnnotationOrDefinitionOrTypeOrDefault as N, IContainer as W, nextId as H, optional as z, InstanceProvider as G, resolveAll as X, ILogger as K, onResolve as Y, camelCase as Z, toArray as J, emptyObject as Q, IServiceLocator as tt, compareNumber as it, transient as et } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as st, isObject as nt } from "../../../metadata/dist/native-modules/index.mjs";

import { TaskAbortError as rt } from "../../../platform/dist/native-modules/index.mjs";

import { BrowserPlatform as ot } from "../../../platform-browser/dist/native-modules/index.mjs";

function lt(t, i, e, s) {
    var n = arguments.length, r = n < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, i, e, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(i, e, r) : o(i, e)) || r;
    return n > 3 && r && Object.defineProperty(i, e, r), r;
}

function ht(t, i) {
    return function(e, s) {
        i(e, s, t);
    };
}

const ct = st.getOwn;

const at = st.hasOwn;

const ut = st.define;

const {annotation: ft, resource: dt} = I;

const vt = ft.keyFor;

const mt = dt.keyFor;

const gt = dt.appendTo;

const pt = ft.appendTo;

const wt = ft.getKeys;

const bt = () => Object.create(null);

const xt = Object.prototype.hasOwnProperty;

const yt = bt();

const kt = (t, i, e) => {
    if (true === yt[i]) return true;
    if (!Rt(i)) return false;
    const s = i.slice(0, 5);
    return yt[i] = "aria-" === s || "data-" === s || e.isStandardSvgAttribute(t, i);
};

const Ct = t => t instanceof Promise;

const At = t => "function" === typeof t;

const Rt = t => "string" === typeof t;

const St = Object.defineProperty;

const Et = t => {
    throw t;
};

function Bt(t, i) {
    let e;
    function s(t, i) {
        if (arguments.length > 1) e.property = i;
        ut(Tt, BindableDefinition.create(i, t, e), t.constructor, i);
        pt(t.constructor, Dt.keyFrom(i));
    }
    if (arguments.length > 1) {
        e = {};
        s(t, i);
        return;
    } else if (Rt(t)) {
        e = {};
        return s;
    }
    e = void 0 === t ? {} : t;
    return s;
}

function It(t) {
    return t.startsWith(Tt);
}

const Tt = vt("bindable");

const Dt = Object.freeze({
    name: Tt,
    keyFrom: t => `${Tt}:${t}`,
    from(t, ...i) {
        const e = {};
        const s = Array.isArray;
        function n(i) {
            e[i] = BindableDefinition.create(i, t);
        }
        function r(i, s) {
            e[i] = s instanceof BindableDefinition ? s : BindableDefinition.create(i, t, s);
        }
        function o(t) {
            if (s(t)) t.forEach(n); else if (t instanceof BindableDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((i => r(i, t[i])));
        }
        i.forEach(o);
        return e;
    },
    for(t) {
        let i;
        const e = {
            add(s) {
                let n;
                let r;
                if (Rt(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                i = BindableDefinition.create(n, t, r);
                if (!at(Tt, t, n)) pt(t, Dt.keyFrom(n));
                ut(Tt, i, t, n);
                return e;
            },
            mode(t) {
                i.mode = t;
                return e;
            },
            callback(t) {
                i.callback = t;
                return e;
            },
            attribute(t) {
                i.attribute = t;
                return e;
            },
            primary() {
                i.primary = true;
                return e;
            },
            set(t) {
                i.set = t;
                return e;
            }
        };
        return e;
    },
    getAll(t) {
        const i = Tt.length + 1;
        const e = [];
        const s = T(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        let c;
        while (--n >= 0) {
            h = s[n];
            o = wt(h).filter(It);
            l = o.length;
            for (c = 0; c < l; ++c) e[r++] = ct(Tt, h, o[c].slice(i));
        }
        return e;
    }
});

class BindableDefinition {
    constructor(t, i, e, s, n, r) {
        this.attribute = t;
        this.callback = i;
        this.mode = e;
        this.primary = s;
        this.property = n;
        this.set = r;
    }
    static create(i, e, s = {}) {
        return new BindableDefinition(D(s.attribute, $(i)), D(s.callback, `${i}Changed`), D(s.mode, t.toView), D(s.primary, false), D(s.property, i), D(s.set, Ot(i, e, s)));
    }
}

function $t(t, i, e) {
    Pt.define(t, i);
}

const Pt = {
    key: vt("coercer"),
    define(t, i) {
        ut(Pt.key, t[i].bind(t), t);
    },
    for(t) {
        return ct(Pt.key, t);
    }
};

function Ot(t, i, e = {}) {
    var s, n, r;
    const o = null !== (n = null !== (s = e.type) && void 0 !== s ? s : Reflect.getMetadata("design:type", i, t)) && void 0 !== n ? n : null;
    if (null == o) return P;
    let l;
    switch (o) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        l = o;
        break;

      default:
        {
            const t = o.coerce;
            l = "function" === typeof t ? t.bind(o) : null !== (r = Pt.for(o)) && void 0 !== r ? r : P;
            break;
        }
    }
    return l === P ? l : Lt(l, e.nullable);
}

function Lt(t, i) {
    return function(e, s) {
        var n;
        if (!(null === s || void 0 === s ? void 0 : s.enableCoercion)) return e;
        return (null !== i && void 0 !== i ? i : (null !== (n = null === s || void 0 === s ? void 0 : s.coerceNullish) && void 0 !== n ? n : false) ? false : true) && null == e ? e : t(e, s);
    };
}

class BindableObserver {
    constructor(t, i, e, s, n, r) {
        this.set = s;
        this.$controller = n;
        this.t = r;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        const o = t[e];
        const l = t.propertyChanged;
        const h = this.i = At(o);
        const c = this.u = At(l);
        const a = this.hs = s !== P;
        let u;
        this.o = t;
        this.k = i;
        this.cb = h ? o : P;
        this.C = c ? l : P;
        if (void 0 === this.cb && !c && !a) this.iO = false; else {
            this.iO = true;
            u = t[i];
            this.v = a && void 0 !== u ? s(u, this.t) : u;
            this.A();
        }
    }
    get type() {
        return 1;
    }
    getValue() {
        return this.v;
    }
    setValue(t, i) {
        if (this.hs) t = this.set(t, this.t);
        const e = this.v;
        if (this.iO) {
            if (Object.is(t, e)) return;
            this.v = t;
            this.ov = e;
            this.f = i;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, e, i);
                if (this.u) this.C.call(this.o, this.k, t, e, i);
            }
            this.queue.add(this);
        } else this.o[this.k] = t;
    }
    subscribe(t) {
        if (false === !this.iO) {
            this.iO = true;
            this.v = this.hs ? this.set(this.o[this.k], this.t) : this.o[this.k];
            this.A();
        }
        this.subs.add(t);
    }
    flush() {
        qt = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, qt, this.f);
    }
    A() {
        Reflect.defineProperty(this.o, this.k, {
            enumerable: true,
            configurable: true,
            get: () => this.v,
            set: t => {
                this.setValue(t, 0);
            }
        });
    }
}

i(BindableObserver);

e(BindableObserver);

let qt;

class CharSpec {
    constructor(t, i, e, s) {
        this.chars = t;
        this.repeat = i;
        this.isSymbol = e;
        this.isInverted = s;
        if (s) switch (t.length) {
          case 0:
            this.has = this.R;
            break;

          case 1:
            this.has = this.B;
            break;

          default:
            this.has = this.I;
        } else switch (t.length) {
          case 0:
            this.has = this.T;
            break;

          case 1:
            this.has = this.$;
            break;

          default:
            this.has = this.P;
        }
    }
    equals(t) {
        return this.chars === t.chars && this.repeat === t.repeat && this.isSymbol === t.isSymbol && this.isInverted === t.isInverted;
    }
    P(t) {
        return this.chars.includes(t);
    }
    $(t) {
        return this.chars === t;
    }
    T(t) {
        return false;
    }
    I(t) {
        return !this.chars.includes(t);
    }
    B(t) {
        return this.chars !== t;
    }
    R(t) {
        return true;
    }
}

class Interpretation {
    constructor() {
        this.parts = L;
        this.O = "";
        this.L = {};
        this.q = {};
    }
    get pattern() {
        const t = this.O;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.O = "";
            this.parts = L;
        } else {
            this.O = t;
            this.parts = this.q[t];
        }
    }
    append(t, i) {
        const e = this.L;
        if (void 0 === e[t]) e[t] = i; else e[t] += i;
    }
    next(t) {
        const i = this.L;
        let e;
        if (void 0 !== i[t]) {
            e = this.q;
            if (void 0 === e[t]) e[t] = [ i[t] ]; else e[t].push(i[t]);
            i[t] = void 0;
        }
    }
}

class AttrParsingState {
    constructor(t, ...i) {
        this.charSpec = t;
        this.nextStates = [];
        this.types = null;
        this.isEndpoint = false;
        this.patterns = i;
    }
    get pattern() {
        return this.isEndpoint ? this.patterns[0] : null;
    }
    findChild(t) {
        const i = this.nextStates;
        const e = i.length;
        let s = null;
        let n = 0;
        for (;n < e; ++n) {
            s = i[n];
            if (t.equals(s.charSpec)) return s;
        }
        return null;
    }
    append(t, i) {
        const e = this.patterns;
        if (!e.includes(i)) e.push(i);
        let s = this.findChild(t);
        if (null == s) {
            s = new AttrParsingState(t, i);
            this.nextStates.push(s);
            if (t.repeat) s.nextStates.push(s);
        }
        return s;
    }
    findMatches(t, i) {
        const e = [];
        const s = this.nextStates;
        const n = s.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = s[l];
            if (o.charSpec.has(t)) {
                e.push(o);
                r = o.patterns.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) i.next(o.patterns[h]); else for (;h < r; ++h) i.append(o.patterns[h], t);
            }
        }
        return e;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const i = this.len = t.length;
        const e = this.specs = [];
        let s = 0;
        for (;i > s; ++s) e.push(new CharSpec(t[s], false, false, false));
    }
    eachChar(t) {
        const i = this.len;
        const e = this.specs;
        let s = 0;
        for (;i > s; ++s) t(e[s]);
    }
}

class DynamicSegment {
    constructor(t) {
        this.text = "PART";
        this.spec = new CharSpec(t, true, false, true);
    }
    eachChar(t) {
        t(this.spec);
    }
}

class SymbolSegment {
    constructor(t) {
        this.text = t;
        this.spec = new CharSpec(t, false, true, false);
    }
    eachChar(t) {
        t(this.spec);
    }
}

class SegmentTypes {
    constructor() {
        this.statics = 0;
        this.dynamics = 0;
        this.symbols = 0;
    }
}

const Ut = O.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

class SyntaxInterpreter {
    constructor() {
        this.rootState = new AttrParsingState(null);
        this.initialStates = [ this.rootState ];
    }
    add(t) {
        t = t.slice(0).sort(((t, i) => t.pattern > i.pattern ? 1 : -1));
        const i = t.length;
        let e;
        let s;
        let n;
        let r;
        let o;
        let l;
        let h;
        let c = 0;
        let a;
        while (i > c) {
            e = this.rootState;
            s = t[c];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.parse(s, r);
            l = o.length;
            h = t => {
                e = e.append(t, n);
            };
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            e.types = r;
            e.isEndpoint = true;
            ++c;
        }
    }
    interpret(t) {
        const i = new Interpretation;
        const e = t.length;
        let s = this.initialStates;
        let n = 0;
        let r;
        for (;n < e; ++n) {
            s = this.getNextStates(s, t.charAt(n), i);
            if (0 === s.length) break;
        }
        s = s.filter(_t);
        if (s.length > 0) {
            s.sort(Ft);
            r = s[0];
            if (!r.charSpec.isSymbol) i.next(r.pattern);
            i.pattern = r.pattern;
        }
        return i;
    }
    getNextStates(t, i, e) {
        const s = [];
        let n = null;
        const r = t.length;
        let o = 0;
        for (;o < r; ++o) {
            n = t[o];
            s.push(...n.findMatches(i, e));
        }
        return s;
    }
    parse(t, i) {
        const e = [];
        const s = t.pattern;
        const n = s.length;
        const r = t.symbols;
        let o = 0;
        let l = 0;
        let h = "";
        while (o < n) {
            h = s.charAt(o);
            if (0 === r.length || !r.includes(h)) if (o === l) if ("P" === h && "PART" === s.slice(o, o + 4)) {
                l = o += 4;
                e.push(new DynamicSegment(r));
                ++i.dynamics;
            } else ++o; else ++o; else if (o !== l) {
                e.push(new StaticSegment(s.slice(l, o)));
                ++i.statics;
                l = o;
            } else {
                e.push(new SymbolSegment(s.slice(l, o + 1)));
                ++i.symbols;
                l = ++o;
            }
        }
        if (l !== o) {
            e.push(new StaticSegment(s.slice(l, o)));
            ++i.statics;
        }
        return e;
    }
}

function _t(t) {
    return t.isEndpoint;
}

function Ft(t, i) {
    const e = t.types;
    const s = i.types;
    if (e.statics !== s.statics) return s.statics - e.statics;
    if (e.dynamics !== s.dynamics) return s.dynamics - e.dynamics;
    if (e.symbols !== s.symbols) return s.symbols - e.symbols;
    return 0;
}

class AttrSyntax {
    constructor(t, i, e, s) {
        this.rawName = t;
        this.rawValue = i;
        this.target = e;
        this.command = s;
    }
}

const Vt = O.createInterface("IAttributePattern");

const Mt = O.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, i) {
        this.U = {};
        this._ = t;
        const e = this.F = {};
        const s = i.reduce(((t, i) => {
            const s = Ht(i.constructor);
            s.forEach((t => e[t.pattern] = i));
            return t.concat(s);
        }), L);
        t.add(s);
    }
    parse(t, i) {
        let e = this.U[t];
        if (null == e) e = this.U[t] = this._.interpret(t);
        const s = e.pattern;
        if (null == s) return new AttrSyntax(t, i, t, null); else return this.F[s][s](t, i, e.parts);
    }
}

AttributeParser.inject = [ Ut, q(Vt) ];

function jt(...t) {
    return function i(e) {
        return zt.define(t, e);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        U.singleton(Vt, this.Type).register(t);
    }
}

const Nt = mt("attribute-pattern");

const Wt = "attribute-pattern-definitions";

const Ht = t => I.annotation.get(t, Wt);

const zt = Object.freeze({
    name: Nt,
    definitionAnnotationKey: Wt,
    define(t, i) {
        const e = new AttributePatternResourceDefinition(i);
        ut(Nt, e, i);
        gt(i, Nt);
        I.annotation.set(i, Wt, t);
        pt(i, Wt);
        return i;
    },
    getPatternDefinitions: Ht
});

let Gt = class DotSeparatedAttributePattern {
    "PART.PART"(t, i, e) {
        return new AttrSyntax(t, i, e[0], e[1]);
    }
    "PART.PART.PART"(t, i, e) {
        return new AttrSyntax(t, i, e[0], e[2]);
    }
};

Gt = lt([ jt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], Gt);

let Xt = class RefAttributePattern {
    ref(t, i, e) {
        return new AttrSyntax(t, i, "element", "ref");
    }
    "PART.ref"(t, i, e) {
        return new AttrSyntax(t, i, e[0], "ref");
    }
};

Xt = lt([ jt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], Xt);

let Kt = class ColonPrefixedBindAttributePattern {
    ":PART"(t, i, e) {
        return new AttrSyntax(t, i, e[0], "bind");
    }
};

Kt = lt([ jt({
    pattern: ":PART",
    symbols: ":"
}) ], Kt);

let Yt = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, i, e) {
        return new AttrSyntax(t, i, e[0], "trigger");
    }
};

Yt = lt([ jt({
    pattern: "@PART",
    symbols: "@"
}) ], Yt);

let Zt = class SpreadAttributePattern {
    "...$attrs"(t, i, e) {
        return new AttrSyntax(t, i, "", "...$attrs");
    }
};

Zt = lt([ jt({
    pattern: "...$attrs",
    symbols: ""
}) ], Zt);

const Jt = _;

const Qt = O.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, i) {
        return false;
    }
}

function ti(t) {
    const i = bt();
    let e;
    for (e of t) i[e] = true;
    return i;
}

class SVGAnalyzer {
    constructor(t) {
        this.V = Object.assign(bt(), {
            a: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: ti([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: bt(),
            altGlyphDef: ti([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: bt(),
            altGlyphItem: ti([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: bt(),
            animate: ti([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: ti([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: ti([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: ti([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: ti([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: ti([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": ti([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: ti([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: ti([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: ti([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: ti([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: ti([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: ti([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: ti([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: ti([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: ti([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: ti([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: ti([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: ti([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: ti([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: ti([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: ti([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: ti([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: ti([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: ti([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: ti([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: ti([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: ti([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: ti([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: ti([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: ti([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: ti([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: ti([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: ti([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: ti([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: ti([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": ti([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": ti([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": ti([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": ti([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": ti([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: ti([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: ti([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: ti([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: bt(),
            hkern: ti([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: ti([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: ti([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: ti([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: ti([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: ti([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": ti([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: ti([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: ti([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: ti([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: ti([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: ti([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: ti([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: ti([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: ti([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: ti([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: ti([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: ti([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: ti([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: ti([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: ti([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: ti([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: ti([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: ti([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: ti([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: ti([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.M = ti([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.j = ti([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const i = t.document.createElement("div");
        i.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === i.firstElementChild.nodeName) {
            const t = this.V;
            let i = t.altGlyph;
            t.altGlyph = t.altglyph;
            t.altglyph = i;
            i = t.altGlyphDef;
            t.altGlyphDef = t.altglyphdef;
            t.altglyphdef = i;
            i = t.altGlyphItem;
            t.altGlyphItem = t.altglyphitem;
            t.altglyphitem = i;
            i = t.glyphRef;
            t.glyphRef = t.glyphref;
            t.glyphref = i;
        }
    }
    static register(t) {
        return U.singleton(Qt, this).register(t);
    }
    isStandardSvgAttribute(t, i) {
        var e;
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.M[t.nodeName] && true === this.j[i] || true === (null === (e = this.V[t.nodeName]) || void 0 === e ? void 0 : e[i]);
    }
}

SVGAnalyzer.inject = [ Jt ];

const ii = O.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = bt();
        this.W = bt();
        this.useMapping({
            LABEL: {
                for: "htmlFor"
            },
            IMG: {
                usemap: "useMap"
            },
            INPUT: {
                maxlength: "maxLength",
                minlength: "minLength",
                formaction: "formAction",
                formenctype: "formEncType",
                formmethod: "formMethod",
                formnovalidate: "formNoValidate",
                formtarget: "formTarget",
                inputmode: "inputMode"
            },
            TEXTAREA: {
                maxlength: "maxLength"
            },
            TD: {
                rowspan: "rowSpan",
                colspan: "colSpan"
            },
            TH: {
                rowspan: "rowSpan",
                colspan: "colSpan"
            }
        });
        this.useGlobalMapping({
            accesskey: "accessKey",
            contenteditable: "contentEditable",
            tabindex: "tabIndex",
            textcontent: "textContent",
            innerhtml: "innerHTML",
            scrolltop: "scrollTop",
            scrollleft: "scrollLeft",
            readonly: "readOnly"
        });
    }
    static get inject() {
        return [ Qt ];
    }
    useMapping(t) {
        var i;
        var e;
        let s;
        let n;
        let r;
        let o;
        for (r in t) {
            s = t[r];
            n = null !== (i = (e = this.N)[r]) && void 0 !== i ? i : e[r] = bt();
            for (o in s) {
                if (void 0 !== n[o]) throw si(o, r);
                n[o] = s[o];
            }
        }
    }
    useGlobalMapping(t) {
        const i = this.W;
        for (const e in t) {
            if (void 0 !== i[e]) throw si(e, "*");
            i[e] = t[e];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, i) {
        return ei(t, i) || this.fns.length > 0 && this.fns.some((e => e(t, i)));
    }
    map(t, i) {
        var e, s, n;
        return null !== (n = null !== (s = null === (e = this.N[t.nodeName]) || void 0 === e ? void 0 : e[i]) && void 0 !== s ? s : this.W[i]) && void 0 !== n ? n : kt(t, i, this.svg) ? i : null;
    }
}

function ei(t, i) {
    switch (t.nodeName) {
      case "INPUT":
        switch (t.type) {
          case "checkbox":
          case "radio":
            return "checked" === i;

          default:
            return "value" === i || "files" === i || "value-as-number" === i || "value-as-date" === i;
        }

      case "TEXTAREA":
      case "SELECT":
        return "value" === i;

      default:
        switch (i) {
          case "textcontent":
          case "innerhtml":
            return t.hasAttribute("contenteditable");

          case "scrolltop":
          case "scrollleft":
            return true;

          default:
            return false;
        }
    }
}

function si(t, i) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === i ? "all elements" : `<${i}/>`}`);
}

class CallBinding {
    constructor(t, i, e, s, n) {
        this.sourceExpression = t;
        this.target = i;
        this.targetProperty = e;
        this.locator = n;
        this.interceptor = this;
        this.isBound = false;
        this.targetObserver = s.getAccessor(i, e);
    }
    callSource(t) {
        const i = this.$scope.overrideContext;
        i.$event = t;
        const e = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(i, "$event");
        return e;
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = i;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, i, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), t, this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.targetObserver.setValue(null, t, this.target, this.targetProperty);
        this.isBound = false;
    }
    observe(t, i) {
        return;
    }
    handleChange(t, i, e) {
        return;
    }
}

class AttributeObserver {
    constructor(t, i, e) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.H = false;
        this.f = 0;
        this.o = t;
        this.G = i;
        this.X = e;
    }
    getValue() {
        return this.v;
    }
    setValue(t, i) {
        this.v = t;
        this.H = t !== this.ov;
        if (0 === (64 & i)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.ov = this.v;
            switch (this.X) {
              case "class":
                this.o.classList.toggle(this.G, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let i = this.v;
                    if (Rt(i) && i.includes("!important")) {
                        t = "important";
                        i = i.replace("!important", "");
                    }
                    this.o.style.setProperty(this.G, i, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.X); else this.o.setAttribute(this.X, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let i = false;
        for (let e = 0, s = t.length; s > e; ++e) {
            const s = t[e];
            if ("attributes" === s.type && s.attributeName === this.G) {
                i = true;
                break;
            }
        }
        if (i) {
            let t;
            switch (this.X) {
              case "class":
                t = this.o.classList.contains(this.G);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.G);
                break;

              default:
                throw new Error(`AUR0651:${this.X}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.H = false;
                this.f = 0;
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            ni(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) ri(this.o, this);
    }
    flush() {
        hi = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, hi, this.f);
    }
}

i(AttributeObserver);

e(AttributeObserver);

const ni = (t, i, e) => {
    if (void 0 === i.$eMObs) i.$eMObs = new Set;
    if (void 0 === i.$mObs) (i.$mObs = new t(oi)).observe(i, {
        attributes: true
    });
    i.$eMObs.add(e);
};

const ri = (t, i) => {
    const e = t.$eMObs;
    if (e && e.delete(i)) {
        if (0 === e.size) {
            t.$mObs.disconnect();
            t.$mObs = void 0;
        }
        return true;
    }
    return false;
};

const oi = t => {
    t[0].target.$eMObs.forEach(li, t);
};

function li(t) {
    t.handleMutation(this);
}

let hi;

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, i, e) {
        const s = this.b;
        if (t !== s.sourceExpression.evaluate(e, s.$scope, s.locator, null)) s.updateSource(t, e);
    }
}

const {oneTime: ci, toView: ai, fromView: ui} = t;

const fi = ai | ci;

const di = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, i, e, s, n, r, o) {
        this.sourceExpression = t;
        this.targetAttribute = e;
        this.targetProperty = s;
        this.mode = n;
        this.locator = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = null;
        this.task = null;
        this.targetSubscriber = null;
        this.persistentFlags = 0;
        this.value = void 0;
        this.target = i;
        this.p = o.get(Jt);
        this.oL = r;
    }
    updateTarget(t, i) {
        i |= this.persistentFlags;
        this.targetObserver.setValue(t, i, this.target, this.targetProperty);
    }
    updateSource(t, i) {
        i |= this.persistentFlags;
        this.sourceExpression.assign(i, this.$scope, this.locator, t);
    }
    handleChange(t, i, e) {
        if (!this.isBound) return;
        e |= this.persistentFlags;
        const s = this.mode;
        const n = this.interceptor;
        const r = this.sourceExpression;
        const o = this.$scope;
        const l = this.locator;
        const h = this.targetObserver;
        const c = 0 === (2 & e) && (4 & h.type) > 0;
        let a = false;
        let u;
        if (10082 !== r.$kind || this.obs.count > 1) {
            a = 0 === (s & ci);
            if (a) this.obs.version++;
            t = r.evaluate(e, o, l, n);
            if (a) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (c) {
                u = this.task;
                this.task = this.p.domWriteQueue.queueTask((() => {
                    this.task = null;
                    n.updateTarget(t, e);
                }), di);
                null === u || void 0 === u ? void 0 : u.cancel();
            } else n.updateTarget(t, e);
        }
    }
    $bind(t, i) {
        var e;
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        this.persistentFlags = 97 & t;
        this.$scope = i;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, i, this.interceptor);
        let n = this.targetObserver;
        if (!n) n = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        s = this.sourceExpression;
        const r = this.mode;
        const o = this.interceptor;
        let l = false;
        if (r & fi) {
            l = (r & ai) > 0;
            o.updateTarget(this.value = s.evaluate(t, i, this.locator, l ? o : null), t);
        }
        if (r & ui) n.subscribe(null !== (e = this.targetSubscriber) && void 0 !== e ? e : this.targetSubscriber = new BindingTargetSubscriber(o));
        this.isBound = true;
    }
    $unbind(t) {
        var i;
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        null === (i = this.task) || void 0 === i ? void 0 : i.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(AttributeBinding);

const {toView: vi} = t;

const mi = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, i, e, s, n, r, o) {
        this.interpolation = i;
        this.target = e;
        this.targetProperty = s;
        this.mode = n;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.oL = t;
        this.targetObserver = t.getAccessor(e, s);
        const l = i.expressions;
        const h = this.partBindings = Array(l.length);
        const c = l.length;
        let a = 0;
        for (;c > a; ++a) h[a] = new InterpolationPartBinding(l[a], e, s, r, t, this);
    }
    updateTarget(t, i) {
        const e = this.partBindings;
        const s = this.interpolation.parts;
        const n = e.length;
        let r = "";
        let o = 0;
        if (1 === n) r = s[0] + e[0].value + s[1]; else {
            r = s[0];
            for (;n > o; ++o) r += e[o].value + s[o + 1];
        }
        const l = this.targetObserver;
        const h = 0 === (2 & i) && (4 & l.type) > 0;
        let c;
        if (h) {
            c = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                l.setValue(r, i, this.target, this.targetProperty);
            }), mi);
            null === c || void 0 === c ? void 0 : c.cancel();
            c = null;
        } else l.setValue(r, i, this.target, this.targetProperty);
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = i;
        const e = this.partBindings;
        const s = e.length;
        let n = 0;
        for (;s > n; ++n) e[n].$bind(t, i);
        this.updateTarget(void 0, t);
    }
    $unbind(t) {
        var i;
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const e = this.partBindings;
        const s = e.length;
        let n = 0;
        for (;s > n; ++n) e[n].interceptor.$unbind(t);
        null === (i = this.task) || void 0 === i ? void 0 : i.cancel();
        this.task = null;
    }
}

class InterpolationPartBinding {
    constructor(i, e, s, n, r, o) {
        this.sourceExpression = i;
        this.target = e;
        this.targetProperty = s;
        this.locator = n;
        this.owner = o;
        this.interceptor = this;
        this.mode = t.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = r;
    }
    handleChange(t, i, e) {
        if (!this.isBound) return;
        const s = this.sourceExpression;
        const n = this.obs;
        const r = 10082 === s.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & vi) > 0;
            if (o) n.version++;
            t = s.evaluate(e, this.$scope, this.locator, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t, e);
        }
    }
    handleCollectionChange(t, i) {
        this.owner.updateTarget(void 0, i);
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = i;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, i, this.interceptor);
        this.value = this.sourceExpression.evaluate(t, i, this.locator, (this.mode & vi) > 0 ? this.interceptor : null);
        if (this.value instanceof Array) this.observeCollection(this.value);
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

s(InterpolationPartBinding);

class ContentBinding {
    constructor(i, e, s, n, r, o) {
        this.sourceExpression = i;
        this.target = e;
        this.locator = s;
        this.p = r;
        this.strict = o;
        this.interceptor = this;
        this.mode = t.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    updateTarget(t, i) {
        var e, s;
        const n = this.target;
        const r = this.p.Node;
        const o = this.value;
        this.value = t;
        if (o instanceof r) null === (e = o.parentNode) || void 0 === e ? void 0 : e.removeChild(o);
        if (t instanceof r) {
            n.textContent = "";
            null === (s = n.parentNode) || void 0 === s ? void 0 : s.insertBefore(t, n);
        } else n.textContent = String(t);
    }
    handleChange(t, i, e) {
        var s;
        if (!this.isBound) return;
        const n = this.sourceExpression;
        const r = this.obs;
        const o = 10082 === n.$kind && 1 === r.count;
        let l = false;
        if (!o) {
            l = (this.mode & vi) > 0;
            if (l) r.version++;
            e |= this.strict ? 1 : 0;
            t = n.evaluate(e, this.$scope, this.locator, l ? this.interceptor : null);
            if (l) r.clear();
        }
        if (t === this.value) {
            null === (s = this.task) || void 0 === s ? void 0 : s.cancel();
            this.task = null;
            return;
        }
        const h = 0 === (2 & e);
        if (h) this.queueUpdate(t, e); else this.updateTarget(t, e);
    }
    handleCollectionChange() {
        this.queueUpdate(this.value, 0);
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = i;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, i, this.interceptor);
        t |= this.strict ? 1 : 0;
        const e = this.value = this.sourceExpression.evaluate(t, i, this.locator, (this.mode & vi) > 0 ? this.interceptor : null);
        if (e instanceof Array) this.observeCollection(e);
        this.updateTarget(e, t);
    }
    $unbind(t) {
        var i;
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        null === (i = this.task) || void 0 === i ? void 0 : i.cancel();
        this.task = null;
    }
    queueUpdate(t, i) {
        const e = this.task;
        this.task = this.p.domWriteQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t, i);
        }), mi);
        null === e || void 0 === e ? void 0 : e.cancel();
    }
}

s(ContentBinding);

class LetBinding {
    constructor(t, i, e, s, n = false) {
        this.sourceExpression = t;
        this.targetProperty = i;
        this.locator = s;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.target = null;
        this.oL = e;
        this.Y = n;
    }
    handleChange(t, i, e) {
        if (!this.isBound) return;
        const s = this.target;
        const n = this.targetProperty;
        const r = s[n];
        this.obs.version++;
        t = this.sourceExpression.evaluate(e, this.$scope, this.locator, this.interceptor);
        this.obs.clear();
        if (t !== r) s[n] = t;
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = i;
        this.target = this.Y ? i.bindingContext : i.overrideContext;
        const e = this.sourceExpression;
        if (e.hasBind) e.bind(t, i, this.interceptor);
        this.target[this.targetProperty] = this.sourceExpression.evaluate(2 | t, i, this.locator, this.interceptor);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const i = this.sourceExpression;
        if (i.hasUnbind) i.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(LetBinding);

const {oneTime: gi, toView: pi, fromView: wi} = t;

const bi = pi | gi;

const xi = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, i, e, s, n, r, o) {
        this.sourceExpression = t;
        this.target = i;
        this.targetProperty = e;
        this.mode = s;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.targetObserver = void 0;
        this.persistentFlags = 0;
        this.task = null;
        this.targetSubscriber = null;
        this.oL = n;
    }
    updateTarget(t, i) {
        i |= this.persistentFlags;
        this.targetObserver.setValue(t, i, this.target, this.targetProperty);
    }
    updateSource(t, i) {
        i |= this.persistentFlags;
        this.sourceExpression.assign(i, this.$scope, this.locator, t);
    }
    handleChange(t, i, e) {
        if (!this.isBound) return;
        e |= this.persistentFlags;
        const s = 0 === (2 & e) && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        let r = false;
        if (10082 !== this.sourceExpression.$kind || n.count > 1) {
            r = this.mode > gi;
            if (r) n.version++;
            t = this.sourceExpression.evaluate(e, this.$scope, this.locator, this.interceptor);
            if (r) n.clear();
        }
        if (s) {
            yi = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, e);
                this.task = null;
            }), xi);
            null === yi || void 0 === yi ? void 0 : yi.cancel();
            yi = null;
        } else this.interceptor.updateTarget(t, e);
    }
    $bind(t, i) {
        var e;
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 97 & t;
        this.$scope = i;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, i, this.interceptor);
        const n = this.oL;
        const r = this.mode;
        let o = this.targetObserver;
        if (!o) {
            if (r & wi) o = n.getObserver(this.target, this.targetProperty); else o = n.getAccessor(this.target, this.targetProperty);
            this.targetObserver = o;
        }
        s = this.sourceExpression;
        const l = this.interceptor;
        const h = (r & pi) > 0;
        if (r & bi) l.updateTarget(s.evaluate(t, i, this.locator, h ? l : null), t);
        if (r & wi) {
            o.subscribe(null !== (e = this.targetSubscriber) && void 0 !== e ? e : this.targetSubscriber = new BindingTargetSubscriber(l));
            if (!h) l.updateSource(o.getValue(this.target, this.targetProperty), t);
        }
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        yi = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != yi) {
            yi.cancel();
            yi = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(PropertyBinding);

let yi = null;

class RefBinding {
    constructor(t, i, e) {
        this.sourceExpression = t;
        this.target = i;
        this.locator = e;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = i;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, i, this);
        this.sourceExpression.assign(t, this.$scope, this.locator, this.target);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        let i = this.sourceExpression;
        if (i.evaluate(t, this.$scope, this.locator, null) === this.target) i.assign(t, this.$scope, this.locator, null);
        i = this.sourceExpression;
        if (i.hasUnbind) i.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.isBound = false;
    }
    observe(t, i) {
        return;
    }
    handleChange(t, i, e) {
        return;
    }
}

const ki = O.createInterface("IAppTask");

class $AppTask {
    constructor(t, i, e) {
        this.c = void 0;
        this.slot = t;
        this.k = i;
        this.cb = e;
    }
    register(t) {
        return this.c = t.register(U.instance(ki, this));
    }
    run() {
        const t = this.k;
        const i = this.cb;
        return null === t ? i() : i(this.c.get(t));
    }
}

const Ci = Object.freeze({
    beforeCreate: Ai("beforeCreate"),
    hydrating: Ai("hydrating"),
    hydrated: Ai("hydrated"),
    beforeActivate: Ai("beforeActivate"),
    afterActivate: Ai("afterActivate"),
    beforeDeactivate: Ai("beforeDeactivate"),
    afterDeactivate: Ai("afterDeactivate")
});

function Ai(t) {
    function i(i, e) {
        if (At(e)) return new $AppTask(t, i, e);
        return new $AppTask(t, null, i);
    }
    return i;
}

function Ri(t, i) {
    let e;
    function s(t, i) {
        if (arguments.length > 1) e.property = i;
        ut(Ei, ChildrenDefinition.create(i, e), t.constructor, i);
        pt(t.constructor, Bi.keyFrom(i));
    }
    if (arguments.length > 1) {
        e = {};
        s(t, i);
        return;
    } else if (Rt(t)) {
        e = {};
        return s;
    }
    e = void 0 === t ? {} : t;
    return s;
}

function Si(t) {
    return t.startsWith(Ei);
}

const Ei = vt("children-observer");

const Bi = Object.freeze({
    name: Ei,
    keyFrom: t => `${Ei}:${t}`,
    from(...t) {
        const i = {};
        const e = Array.isArray;
        function s(t) {
            i[t] = ChildrenDefinition.create(t);
        }
        function n(t, e) {
            i[t] = ChildrenDefinition.create(t, e);
        }
        function r(t) {
            if (e(t)) t.forEach(s); else if (t instanceof ChildrenDefinition) i[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((i => n(i, t)));
        }
        t.forEach(r);
        return i;
    },
    getAll(t) {
        const i = Ei.length + 1;
        const e = [];
        const s = T(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        while (--n >= 0) {
            h = s[n];
            o = wt(h).filter(Si);
            l = o.length;
            for (let t = 0; t < l; ++t) e[r++] = ct(Ei, h, o[t].slice(i));
        }
        return e;
    }
});

const Ii = {
    childList: true
};

class ChildrenDefinition {
    constructor(t, i, e, s, n, r) {
        this.callback = t;
        this.property = i;
        this.options = e;
        this.query = s;
        this.filter = n;
        this.map = r;
    }
    static create(t, i = {}) {
        var e;
        return new ChildrenDefinition(D(i.callback, `${t}Changed`), D(i.property, t), null !== (e = i.options) && void 0 !== e ? e : Ii, i.query, i.filter, i.map);
    }
}

class ChildrenObserver {
    constructor(t, i, e, s, n = Ti, r = Di, o = $i, l) {
        this.controller = t;
        this.obj = i;
        this.propertyKey = e;
        this.query = n;
        this.filter = r;
        this.map = o;
        this.options = l;
        this.observing = false;
        this.children = void 0;
        this.observer = void 0;
        this.callback = i[s];
        Reflect.defineProperty(this.obj, this.propertyKey, {
            enumerable: true,
            configurable: true,
            get: () => this.getValue(),
            set: () => {}
        });
    }
    getValue() {
        return this.observing ? this.children : this.get();
    }
    setValue(t) {}
    start() {
        var t;
        if (!this.observing) {
            this.observing = true;
            this.children = this.get();
            (null !== (t = this.observer) && void 0 !== t ? t : this.observer = new this.controller.host.ownerDocument.defaultView.MutationObserver((() => {
                this.Z();
            }))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = L;
        }
    }
    Z() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0, 0);
    }
    get() {
        return Oi(this.controller, this.query, this.filter, this.map);
    }
}

i()(ChildrenObserver);

function Ti(t) {
    return t.host.childNodes;
}

function Di(t, i, e) {
    return !!e;
}

function $i(t, i, e) {
    return e;
}

const Pi = {
    optional: true
};

function Oi(t, i, e, s) {
    var n;
    const r = i(t);
    const o = r.length;
    const l = [];
    let h;
    let c;
    let a;
    let u = 0;
    for (;u < o; ++u) {
        h = r[u];
        c = he.for(h, Pi);
        a = null !== (n = null === c || void 0 === c ? void 0 : c.viewModel) && void 0 !== n ? n : null;
        if (e(h, c, a)) l.push(s(h, c, a));
    }
    return l;
}

function Li(t) {
    return function(i) {
        return Vi.define(t, i);
    };
}

function qi(t) {
    return function(i) {
        return Vi.define(Rt(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, i);
    };
}

class CustomAttributeDefinition {
    constructor(t, i, e, s, n, r, o, l, h, c) {
        this.Type = t;
        this.name = i;
        this.aliases = e;
        this.key = s;
        this.defaultBindingMode = n;
        this.isTemplateController = r;
        this.bindables = o;
        this.noMultiBindings = l;
        this.watches = h;
        this.dependencies = c;
    }
    get type() {
        return 2;
    }
    static create(i, e) {
        let s;
        let n;
        if (Rt(i)) {
            s = i;
            n = {
                name: s
            };
        } else {
            s = i.name;
            n = i;
        }
        return new CustomAttributeDefinition(e, D(Fi(e, "name"), s), F(Fi(e, "aliases"), n.aliases, e.aliases), Vi.keyFrom(s), D(Fi(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, t.toView), D(Fi(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Dt.from(e, ...Dt.getAll(e), Fi(e, "bindables"), e.bindables, n.bindables), D(Fi(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), F(Wi.getAnnotation(e), e.watches), F(Fi(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: i, key: e, aliases: s} = this;
        U.transient(e, i).register(t);
        U.aliasTo(e, i).register(t);
        n(s, Vi, e, t);
    }
}

const Ui = mt("custom-attribute");

const _i = t => `${Ui}:${t}`;

const Fi = (t, i) => ct(vt(i), t);

const Vi = Object.freeze({
    name: Ui,
    keyFrom: _i,
    isType(t) {
        return At(t) && at(Ui, t);
    },
    for(t, i) {
        var e;
        return null !== (e = ps(t, _i(i))) && void 0 !== e ? e : void 0;
    },
    define(t, i) {
        const e = CustomAttributeDefinition.create(t, i);
        ut(Ui, e, e.Type);
        ut(Ui, e, e);
        gt(i, Ui);
        return e.Type;
    },
    getDefinition(t) {
        const i = ct(Ui, t);
        if (void 0 === i) throw new Error(`AUR0759:${t.name}`);
        return i;
    },
    annotate(t, i, e) {
        ut(vt(i), e, t);
    },
    getAnnotation: Fi
});

function Mi(t, i) {
    if (null == t) throw new Error(`AUR0772`);
    return function e(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? i : r.value);
        if (o) {
            if (!At(i) && (null == i || !(i in l.prototype))) throw new Error(`AUR0773:${String(i)}@${l.name}}`);
        } else if (!At(null === r || void 0 === r ? void 0 : r.value)) throw new Error(`AUR0774:${String(n)}`);
        Wi.add(l, h);
        if (Vi.isType(l)) Vi.getDefinition(l).watches.push(h);
        if (he.isType(l)) he.getDefinition(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, i) {
        this.expression = t;
        this.callback = i;
    }
}

const ji = L;

const Ni = vt("watch");

const Wi = Object.freeze({
    name: Ni,
    add(t, i) {
        let e = ct(Ni, t);
        if (null == e) ut(Ni, e = [], t);
        e.push(i);
    },
    getAnnotation(t) {
        var i;
        return null !== (i = ct(Ni, t)) && void 0 !== i ? i : ji;
    }
});

function Hi(t) {
    return function(i) {
        return he.define(t, i);
    };
}

function zi(t) {
    if (void 0 === t) return function(t) {
        oe(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!At(t)) return function(i) {
        oe(i, "shadowOptions", t);
    };
    oe(t, "shadowOptions", {
        mode: "open"
    });
}

function Gi(t) {
    if (void 0 === t) return function(t) {
        Xi(t);
    };
    Xi(t);
}

function Xi(t) {
    const i = ct(se, t);
    if (void 0 === i) {
        oe(t, "containerless", true);
        return;
    }
    i.containerless = true;
}

function Ki(t) {
    if (void 0 === t) return function(t) {
        oe(t, "isStrictBinding", true);
    };
    oe(t, "isStrictBinding", true);
}

const Yi = new WeakMap;

class CustomElementDefinition {
    constructor(t, i, e, s, n, r, o, l, h, c, a, u, f, d, v, m, g, p, w, b, x) {
        this.Type = t;
        this.name = i;
        this.aliases = e;
        this.key = s;
        this.cache = n;
        this.capture = r;
        this.template = o;
        this.instructions = l;
        this.dependencies = h;
        this.injectable = c;
        this.needsCompile = a;
        this.surrogates = u;
        this.bindables = f;
        this.childrenObservers = d;
        this.containerless = v;
        this.isStrictBinding = m;
        this.shadowOptions = g;
        this.hasSlots = p;
        this.enhance = w;
        this.watches = b;
        this.processContent = x;
    }
    get type() {
        return 1;
    }
    static create(t, i = null) {
        if (null === i) {
            const e = t;
            if (Rt(e)) throw new Error(`AUR0761:${t}`);
            const s = V("name", e, re);
            if (At(e.Type)) i = e.Type; else i = he.generateType(M(s));
            return new CustomElementDefinition(i, s, F(e.aliases), V("key", e, (() => he.keyFrom(s))), V("cache", e, Ji), V("capture", e, te), V("template", e, Qi), F(e.instructions), F(e.dependencies), V("injectable", e, Qi), V("needsCompile", e, ie), F(e.surrogates), Dt.from(i, e.bindables), Bi.from(e.childrenObservers), V("containerless", e, te), V("isStrictBinding", e, te), V("shadowOptions", e, Qi), V("hasSlots", e, te), V("enhance", e, te), V("watches", e, ee), j("processContent", i, Qi));
        }
        if (Rt(t)) return new CustomElementDefinition(i, t, F(le(i, "aliases"), i.aliases), he.keyFrom(t), j("cache", i, Ji), j("capture", i, te), j("template", i, Qi), F(le(i, "instructions"), i.instructions), F(le(i, "dependencies"), i.dependencies), j("injectable", i, Qi), j("needsCompile", i, ie), F(le(i, "surrogates"), i.surrogates), Dt.from(i, ...Dt.getAll(i), le(i, "bindables"), i.bindables), Bi.from(...Bi.getAll(i), le(i, "childrenObservers"), i.childrenObservers), j("containerless", i, te), j("isStrictBinding", i, te), j("shadowOptions", i, Qi), j("hasSlots", i, te), j("enhance", i, te), F(Wi.getAnnotation(i), i.watches), j("processContent", i, Qi));
        const e = V("name", t, re);
        return new CustomElementDefinition(i, e, F(le(i, "aliases"), t.aliases, i.aliases), he.keyFrom(e), N("cache", t, i, Ji), N("capture", t, i, te), N("template", t, i, Qi), F(le(i, "instructions"), t.instructions, i.instructions), F(le(i, "dependencies"), t.dependencies, i.dependencies), N("injectable", t, i, Qi), N("needsCompile", t, i, ie), F(le(i, "surrogates"), t.surrogates, i.surrogates), Dt.from(i, ...Dt.getAll(i), le(i, "bindables"), i.bindables, t.bindables), Bi.from(...Bi.getAll(i), le(i, "childrenObservers"), i.childrenObservers, t.childrenObservers), N("containerless", t, i, te), N("isStrictBinding", t, i, te), N("shadowOptions", t, i, Qi), N("hasSlots", t, i, te), N("enhance", t, i, te), F(t.watches, Wi.getAnnotation(i), i.watches), N("processContent", t, i, Qi));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Yi.has(t)) return Yi.get(t);
        const i = CustomElementDefinition.create(t);
        Yi.set(t, i);
        ut(se, i, i.Type);
        return i;
    }
    register(t) {
        const {Type: i, key: e, aliases: s} = this;
        if (!t.has(e, false)) {
            U.transient(e, i).register(t);
            U.aliasTo(e, i).register(t);
            n(s, he, e, t);
        }
    }
}

const Zi = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Ji = () => 0;

const Qi = () => null;

const te = () => false;

const ie = () => true;

const ee = () => L;

const se = mt("custom-element");

const ne = t => `${se}:${t}`;

const re = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const oe = (t, i, e) => {
    ut(vt(i), e, t);
};

const le = (t, i) => ct(vt(i), t);

const he = Object.freeze({
    name: se,
    keyFrom: ne,
    isType(t) {
        return At(t) && at(se, t);
    },
    for(t, i = Zi) {
        if (void 0 === i.name && true !== i.searchParents) {
            const e = ps(t, se);
            if (null === e) {
                if (true === i.optional) return null;
                throw new Error(`AUR0762`);
            }
            return e;
        }
        if (void 0 !== i.name) {
            if (true !== i.searchParents) {
                const e = ps(t, se);
                if (null === e) throw new Error(`AUR0763`);
                if (e.is(i.name)) return e;
                return;
            }
            let e = t;
            let s = false;
            while (null !== e) {
                const t = ps(e, se);
                if (null !== t) {
                    s = true;
                    if (t.is(i.name)) return t;
                }
                e = As(e);
            }
            if (s) return;
            throw new Error(`AUR0764`);
        }
        let e = t;
        while (null !== e) {
            const t = ps(e, se);
            if (null !== t) return t;
            e = As(e);
        }
        throw new Error(`AUR0765`);
    },
    define(t, i) {
        const e = CustomElementDefinition.create(t, i);
        ut(se, e, e.Type);
        ut(se, e, e);
        gt(e.Type, se);
        return e.Type;
    },
    getDefinition(t) {
        const i = ct(se, t);
        if (void 0 === i) throw new Error(`AUR0760:${t.name}`);
        return i;
    },
    annotate: oe,
    getAnnotation: le,
    generateName: re,
    createInjectable() {
        const t = function(i, e, s) {
            const n = O.getOrCreateAnnotationParamTypes(i);
            n[s] = t;
            return i;
        };
        t.register = function(i) {
            return {
                resolve(i, e) {
                    if (e.has(t, true)) return e.get(t); else return null;
                }
            };
        };
        return t;
    },
    generateType: function() {
        const t = {
            value: "",
            writable: false,
            enumerable: false,
            configurable: true
        };
        const i = {};
        return function(e, s = i) {
            const n = class {};
            t.value = e;
            Reflect.defineProperty(n, "name", t);
            if (s !== i) Object.assign(n.prototype, s);
            return n;
        };
    }()
});

const ce = vt("processContent");

function ae(t) {
    return void 0 === t ? function(t, i, e) {
        ut(ce, ue(t, i), t);
    } : function(i) {
        t = ue(i, t);
        const e = ct(se, i);
        if (void 0 !== e) e.processContent = t; else ut(ce, t, i);
        return i;
    };
}

function ue(t, i) {
    if (Rt(i)) i = t[i];
    if (!At(i)) throw new Error(`AUR0766:${typeof i}`);
    return i;
}

function fe(t) {
    return function(i) {
        const e = At(t) ? t : true;
        oe(i, "capture", e);
        if (he.isType(i)) he.getDefinition(i).capture = e;
    };
}

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.J = {};
        this.tt = 0;
        this.H = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t, i) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (64 & i)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const i = this.J;
            const e = de(t);
            let s = this.tt;
            this.ov = t;
            if (e.length > 0) this.it(e);
            this.tt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in i) {
                if (!xt.call(i, t) || i[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    it(t) {
        const i = this.obj;
        const e = t.length;
        let s = 0;
        let n;
        for (;s < e; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.J[n] = this.tt;
            i.classList.add(n);
        }
    }
}

function de(t) {
    if (Rt(t)) return ve(t);
    if ("object" !== typeof t) return L;
    if (t instanceof Array) {
        const i = t.length;
        if (i > 0) {
            const e = [];
            let s = 0;
            for (;i > s; ++s) e.push(...de(t[s]));
            return e;
        } else return L;
    }
    const i = [];
    let e;
    for (e in t) if (Boolean(t[e])) if (e.includes(" ")) i.push(...ve(e)); else i.push(e);
    return i;
}

function ve(t) {
    const i = t.match(/\S+/g);
    if (null === i) return L;
    return i;
}

function me(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var i;
        const e = Object.assign({}, ...this.modules);
        const s = Vi.define({
            name: "class",
            bindables: [ "value" ],
            noMultiBindings: true
        }, (i = class CustomAttributeClass {
            constructor(t) {
                this.element = t;
            }
            binding() {
                this.valueChanged();
            }
            valueChanged() {
                if (!this.value) {
                    this.element.className = "";
                    return;
                }
                this.element.className = de(this.value).map((t => e[t] || t)).join(" ");
            }
        }, i.inject = [ bs ], i));
        t.register(s);
    }
}

function ge(...t) {
    return new ShadowDOMRegistry(t);
}

const pe = O.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Jt))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const i = t.get(be);
        const e = t.get(pe);
        t.register(U.instance(we, e.createStyles(this.css, i)));
    }
}

class AdoptedStyleSheetsStylesFactory {
    constructor(t) {
        this.p = t;
        this.cache = new Map;
    }
    createStyles(t, i) {
        return new AdoptedStyleSheetsStyles(this.p, t, this.cache, i);
    }
}

AdoptedStyleSheetsStylesFactory.inject = [ Jt ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, i) {
        return new StyleElementStyles(this.p, t, i);
    }
}

StyleElementStylesFactory.inject = [ Jt ];

const we = O.createInterface("IShadowDOMStyles");

const be = O.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: P
})));

class AdoptedStyleSheetsStyles {
    constructor(t, i, e, s = null) {
        this.sharedStyles = s;
        this.styleSheets = i.map((i => {
            let s;
            if (i instanceof t.CSSStyleSheet) s = i; else {
                s = e.get(i);
                if (void 0 === s) {
                    s = new t.CSSStyleSheet;
                    s.replaceSync(i);
                    e.set(i, s);
                }
            }
            return s;
        }));
    }
    static supported(t) {
        return "adoptedStyleSheets" in t.ShadowRoot.prototype;
    }
    applyTo(t) {
        if (null !== this.sharedStyles) this.sharedStyles.applyTo(t);
        t.adoptedStyleSheets = [ ...t.adoptedStyleSheets, ...this.styleSheets ];
    }
}

class StyleElementStyles {
    constructor(t, i, e = null) {
        this.p = t;
        this.localStyles = i;
        this.sharedStyles = e;
    }
    applyTo(t) {
        const i = this.localStyles;
        const e = this.p;
        for (let s = i.length - 1; s > -1; --s) {
            const n = e.document.createElement("style");
            n.innerHTML = i[s];
            t.prepend(n);
        }
        if (null !== this.sharedStyles) this.sharedStyles.applyTo(t);
    }
}

const xe = {
    shadowDOM(t) {
        return Ci.beforeCreate(W, (i => {
            if (null != t.sharedStyles) {
                const e = i.get(pe);
                i.register(U.instance(be, e.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ye, exit: ke} = r;

const {wrap: Ce, unwrap: Ae} = o;

class ComputedWatcher {
    constructor(t, i, e, s, n) {
        this.obj = t;
        this.get = e;
        this.cb = s;
        this.useProxy = n;
        this.interceptor = this;
        this.value = void 0;
        this.isBound = false;
        this.running = false;
        this.oL = i;
    }
    handleChange() {
        this.run();
    }
    handleCollectionChange() {
        this.run();
    }
    $bind() {
        if (this.isBound) return;
        this.isBound = true;
        this.compute();
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
    }
    run() {
        if (!this.isBound || this.running) return;
        const t = this.obj;
        const i = this.value;
        const e = this.compute();
        if (!Object.is(e, i)) this.cb.call(t, e, i, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            ye(this);
            return this.value = Ae(this.get.call(void 0, this.useProxy ? Ce(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ke(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, i, e, s, n) {
        this.scope = t;
        this.locator = i;
        this.oL = e;
        this.expression = s;
        this.callback = n;
        this.interceptor = this;
        this.isBound = false;
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const i = this.expression;
        const e = this.obj;
        const s = this.value;
        const n = 10082 === i.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = i.evaluate(0, this.scope, this.locator, this);
            this.obs.clear();
        }
        if (!Object.is(t, s)) {
            this.value = t;
            this.callback.call(e, t, s, e);
        }
    }
    $bind() {
        if (this.isBound) return;
        this.isBound = true;
        this.obs.version++;
        this.value = this.expression.evaluate(0, this.scope, this.locator, this);
        this.obs.clear();
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
        this.value = void 0;
    }
}

s(ComputedWatcher);

s(ExpressionWatcher);

const Re = O.createInterface("ILifecycleHooks");

class LifecycleHooksEntry {
    constructor(t, i) {
        this.definition = t;
        this.instance = i;
    }
}

class LifecycleHooksDefinition {
    constructor(t, i) {
        this.Type = t;
        this.propertyNames = i;
    }
    static create(t, i) {
        const e = new Set;
        let s = i.prototype;
        while (s !== Object.prototype) {
            for (const t of Object.getOwnPropertyNames(s)) if ("constructor" !== t) e.add(t);
            s = Object.getPrototypeOf(s);
        }
        return new LifecycleHooksDefinition(i, e);
    }
    register(t) {
        U.singleton(Re, this.Type).register(t);
    }
}

const Se = new WeakMap;

const Ee = vt("lifecycle-hooks");

const Be = Object.freeze({
    name: Ee,
    define(t, i) {
        const e = LifecycleHooksDefinition.create(t, i);
        ut(Ee, e, i);
        gt(i, Ee);
        return e.Type;
    },
    resolve(t) {
        let i = Se.get(t);
        if (void 0 === i) {
            Se.set(t, i = new LifecycleHooksLookupImpl);
            const e = t.root;
            const s = e.id === t.id ? t.getAll(Re) : t.has(Re, false) ? e.getAll(Re).concat(t.getAll(Re)) : e.getAll(Re);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = ct(Ee, n.constructor);
                o = new LifecycleHooksEntry(r, n);
                for (l of r.propertyNames) {
                    h = i[l];
                    if (void 0 === h) i[l] = [ o ]; else h.push(o);
                }
            }
        }
        return i;
    }
});

class LifecycleHooksLookupImpl {}

function Ie() {
    return function t(i) {
        return Be.define({}, i);
    };
}

const Te = O.createInterface("IViewFactory");

class ViewFactory {
    constructor(t, i) {
        this.isCaching = false;
        this.cache = null;
        this.cacheSize = -1;
        this.name = i.name;
        this.container = t;
        this.def = i;
    }
    setCacheSize(t, i) {
        if (t) {
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (Rt(t)) t = parseInt(t, 10);
            if (-1 === this.cacheSize || !i) this.cacheSize = t;
        }
        if (this.cacheSize > 0) this.cache = []; else this.cache = null;
        this.isCaching = this.cacheSize > 0;
    }
    canReturnToCache(t) {
        return null != this.cache && this.cache.length < this.cacheSize;
    }
    tryReturnToCache(t) {
        if (this.canReturnToCache(t)) {
            this.cache.push(t);
            return true;
        }
        return false;
    }
    create(t) {
        const i = this.cache;
        let e;
        if (null != i && i.length > 0) {
            e = i.pop();
            return e;
        }
        e = Controller.$view(this, t);
        return e;
    }
}

ViewFactory.maxCacheSize = 65535;

const De = new WeakSet;

function $e(t) {
    return !De.has(t);
}

function Pe(t) {
    De.add(t);
    return CustomElementDefinition.create(t);
}

const Oe = mt("views");

const Le = Object.freeze({
    name: Oe,
    has(t) {
        return At(t) && (at(Oe, t) || "$views" in t);
    },
    get(t) {
        if (At(t) && "$views" in t) {
            const i = t.$views;
            const e = i.filter($e).map(Pe);
            for (const i of e) Le.add(t, i);
        }
        let i = ct(Oe, t);
        if (void 0 === i) ut(Oe, i = [], t);
        return i;
    },
    add(t, i) {
        const e = CustomElementDefinition.create(i);
        let s = ct(Oe, t);
        if (void 0 === s) ut(Oe, s = [ e ], t); else s.push(e);
        return s;
    }
});

function qe(t) {
    return function(i) {
        Le.add(i, t);
    };
}

const Ue = O.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.et = new WeakMap;
        this.st = new Map;
    }
    getViewComponentForObject(t, i) {
        if (t) {
            const e = Le.has(t.constructor) ? Le.get(t.constructor) : [];
            const s = At(i) ? i(t, e) : this.nt(e, i);
            return this.rt(t, e, s);
        }
        return null;
    }
    rt(t, i, e) {
        let s = this.et.get(t);
        let n;
        if (void 0 === s) {
            s = {};
            this.et.set(t, s);
        } else n = s[e];
        if (void 0 === n) {
            const r = this.ot(t, i, e);
            n = he.define(he.getDefinition(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[e] = n;
        }
        return n;
    }
    ot(t, i, e) {
        let s = this.st.get(t.constructor);
        let n;
        if (void 0 === s) {
            s = {};
            this.st.set(t.constructor, s);
        } else n = s[e];
        if (void 0 === n) {
            n = he.define(this.lt(i, e), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, i, e) {
                    const s = this.viewModel;
                    t.scope = l.fromParent(t.scope, s);
                    if (void 0 !== s.define) return s.define(t, i, e);
                }
            });
            const r = n.prototype;
            if ("hydrating" in t) r.hydrating = function t(i) {
                this.viewModel.hydrating(i);
            };
            if ("hydrated" in t) r.hydrated = function t(i) {
                this.viewModel.hydrated(i);
            };
            if ("created" in t) r.created = function t(i) {
                this.viewModel.created(i);
            };
            if ("binding" in t) r.binding = function t(i, e, s) {
                return this.viewModel.binding(i, e, s);
            };
            if ("bound" in t) r.bound = function t(i, e, s) {
                return this.viewModel.bound(i, e, s);
            };
            if ("attaching" in t) r.attaching = function t(i, e, s) {
                return this.viewModel.attaching(i, e, s);
            };
            if ("attached" in t) r.attached = function t(i, e) {
                return this.viewModel.attached(i, e);
            };
            if ("detaching" in t) r.detaching = function t(i, e, s) {
                return this.viewModel.detaching(i, e, s);
            };
            if ("unbinding" in t) r.unbinding = function t(i, e, s) {
                return this.viewModel.unbinding(i, e, s);
            };
            if ("dispose" in t) r.dispose = function t() {
                this.viewModel.dispose();
            };
            s[e] = n;
        }
        return n;
    }
    nt(t, i) {
        if (i) return i;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    lt(t, i) {
        const e = t.find((t => t.name === i));
        if (void 0 === e) throw new Error(`Could not find view: ${i}`);
        return e;
    }
}

const _e = O.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ht = new WeakMap;
        this.ct = new WeakMap;
        this.ut = (this.ft = t.root).get(Jt);
        this.dt = new FragmentNodeSequence(this.ut, this.ut.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.ft.getAll(Vs, false).reduce(((t, i) => {
            t[i.target] = i;
            return t;
        }), bt()) : this.rs;
    }
    compile(t, i, e) {
        if (false !== t.needsCompile) {
            const s = this.ht;
            const n = i.get(Fs);
            let r = s.get(t);
            if (null == r) s.set(t, r = n.compile(t, i, e)); else i.register(...r.dependencies);
            return r;
        }
        return t;
    }
    getViewFactory(t, i) {
        return new ViewFactory(i, CustomElementDefinition.getOrCreate(t));
    }
    createNodes(t) {
        if (true === t.enhance) return new FragmentNodeSequence(this.ut, t.template);
        let i;
        const e = this.ct;
        if (e.has(t)) i = e.get(t); else {
            const s = this.ut;
            const n = s.document;
            const r = t.template;
            let o;
            if (null === r) i = null; else if (r instanceof s.Node) if ("TEMPLATE" === r.nodeName) i = n.adoptNode(r.content); else (i = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (Rt(r)) o.innerHTML = r;
                n.adoptNode(i = o.content);
            }
            e.set(t, i);
        }
        return null == i ? this.dt : new FragmentNodeSequence(this.ut, i.cloneNode(true));
    }
    render(t, i, e, s) {
        const n = e.instructions;
        const r = this.renderers;
        const o = i.length;
        if (i.length !== n.length) throw new Error(`AUR0757:${o}<>${n.length}`);
        let l = 0;
        let h = 0;
        let c = 0;
        let a;
        let u;
        let f;
        if (o > 0) while (o > l) {
            a = n[l];
            f = i[l];
            h = 0;
            c = a.length;
            while (c > h) {
                u = a[h];
                r[u.type].render(t, f, u);
                ++h;
            }
            ++l;
        }
        if (void 0 !== s && null !== s) {
            a = e.surrogates;
            if ((c = a.length) > 0) {
                h = 0;
                while (c > h) {
                    u = a[h];
                    r[u.type].render(t, s, u);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ W ];

var Fe;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Fe || (Fe = {}));

const Ve = {
    optional: true
};

const Me = new WeakMap;

class Controller {
    constructor(t, i, e, s, n, r, o) {
        this.container = t;
        this.vmKind = i;
        this.definition = e;
        this.viewFactory = s;
        this.viewModel = n;
        this.host = r;
        this.id = H("au$component");
        this.head = null;
        this.tail = null;
        this.next = null;
        this.parent = null;
        this.bindings = null;
        this.children = null;
        this.hasLockedScope = false;
        this.isStrictBinding = false;
        this.scope = null;
        this.isBound = false;
        this.hostController = null;
        this.mountTarget = 0;
        this.shadowRoot = null;
        this.nodes = null;
        this.location = null;
        this.lifecycleHooks = null;
        this.state = 0;
        this.vt = false;
        this.gt = L;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.wt = 0;
        this.bt = 0;
        this.xt = 0;
        this.location = o;
        this.r = t.root.get(_e);
        switch (i) {
          case 1:
          case 0:
            this.hooks = new HooksDefinition(n);
            break;

          case 2:
            this.hooks = HooksDefinition.none;
            break;
        }
    }
    get isActive() {
        return (this.state & (1 | 2)) > 0 && 0 === (4 & this.state);
    }
    get name() {
        var t;
        if (null === this.parent) switch (this.vmKind) {
          case 1:
            return `[${this.definition.name}]`;

          case 0:
            return this.definition.name;

          case 2:
            return this.viewFactory.name;
        }
        switch (this.vmKind) {
          case 1:
            return `${this.parent.name}>[${this.definition.name}]`;

          case 0:
            return `${this.parent.name}>${this.definition.name}`;

          case 2:
            return this.viewFactory.name === (null === (t = this.parent.definition) || void 0 === t ? void 0 : t.name) ? `${this.parent.name}[view]` : `${this.parent.name}[view:${this.viewFactory.name}]`;
        }
    }
    static getCached(t) {
        return Me.get(t);
    }
    static getCachedOrThrow(t) {
        const i = Controller.getCached(t);
        if (void 0 === i) throw new Error(`AUR0500:${t}`);
        return i;
    }
    static $el(t, i, e, s, n = void 0, r = null) {
        if (Me.has(i)) return Me.get(i);
        n = null !== n && void 0 !== n ? n : he.getDefinition(i.constructor);
        const o = new Controller(t, 0, n, null, i, e, r);
        const l = t.get(z(is));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        t.registerResolver(is, new G("IHydrationContext", new HydrationContext(o, s, l)));
        Me.set(i, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, i, e, s) {
        if (Me.has(i)) return Me.get(i);
        s = null !== s && void 0 !== s ? s : Vi.getDefinition(i.constructor);
        const n = new Controller(t, 1, s, null, i, e, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        Me.set(i, n);
        n.yt();
        return n;
    }
    static $view(t, i = void 0) {
        const e = new Controller(t.container, 2, null, t, null, null, null);
        e.parent = null !== i && void 0 !== i ? i : null;
        e.kt();
        return e;
    }
    hE(t, i) {
        const e = this.container;
        const s = this.flags;
        const n = this.viewModel;
        let r = this.definition;
        this.scope = l.create(n, null, true);
        if (r.watches.length > 0) Ge(this, e, r, n);
        Ne(this, r, s, n);
        this.gt = We(this, r, n);
        if (this.hooks.hasDefine) {
            const t = n.define(this, i, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Be.resolve(e);
        r.register(e);
        if (null !== r.injectable) e.registerResolver(r.injectable, new G("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(ns, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const i = this.Ct = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: e, isStrictBinding: s, hasSlots: n} = i;
        const r = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = he.for(this.host, Ve))) this.host = this.container.root.get(Jt).document.createElement(this.definition.name);
        ws(this.host, he.name, this);
        ws(this.host, this.definition.key, this);
        if (null !== e || n) {
            if (null != r) throw new Error(`AUR0501`);
            ws(this.shadowRoot = this.host.attachShadow(null !== e && void 0 !== e ? e : Ye), he.name, this);
            ws(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != r) {
            ws(r, he.name, this);
            ws(r, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(i);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(rs, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ct, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ss, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    yt() {
        const t = this.definition;
        const i = this.viewModel;
        if (t.watches.length > 0) Ge(this, this.container, t, i);
        Ne(this, t, this.flags, i);
        i.$controller = this;
        this.lifecycleHooks = Be.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ss, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    kt() {
        this.Ct = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Ct.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Ct)).findTargets(), this.Ct, void 0);
    }
    activate(t, i, e, s) {
        switch (this.state) {
          case 0:
          case 8:
            if (!(null === i || i.isActive)) return;
            this.state = 1;
            break;

          case 2:
            return;

          case 32:
            throw new Error(`AUR0502:${this.name}`);

          default:
            throw new Error(`AUR0503:${this.name} ${Qe(this.state)}`);
        }
        this.parent = i;
        e |= 2;
        switch (this.vmKind) {
          case 0:
            this.scope.parentScope = null !== s && void 0 !== s ? s : null;
            break;

          case 1:
            this.scope = null !== s && void 0 !== s ? s : null;
            break;

          case 2:
            if (void 0 === s || null === s) throw new Error(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) e |= 1;
        this.$initiator = t;
        this.$flags = e;
        this.At();
        let n;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) n = X(...this.lifecycleHooks.binding.map(os, this));
        if (this.hooks.hasBinding) n = X(n, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (Ct(n)) {
            this.Rt();
            n.then((() => {
                this.bind();
            })).catch((t => {
                this.St(t);
            }));
            return this.$promise;
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let t = 0;
        let i = this.gt.length;
        let e;
        if (i > 0) while (i > t) {
            this.gt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            i = this.bindings.length;
            while (i > t) {
                this.bindings[t].$bind(this.$flags, this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) e = X(...this.lifecycleHooks.bound.map(ls, this));
        if (this.hooks.hasBound) e = X(e, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (Ct(e)) {
            this.Rt();
            e.then((() => {
                this.isBound = true;
                this.Et();
            })).catch((t => {
                this.St(t);
            }));
            return;
        }
        this.isBound = true;
        this.Et();
    }
    Bt(...t) {
        switch (this.mountTarget) {
          case 1:
            this.host.append(...t);
            break;

          case 2:
            this.shadowRoot.append(...t);
            break;

          case 3:
            {
                let i = 0;
                for (;i < t.length; ++i) this.location.parentNode.insertBefore(t[i], this.location);
                break;
            }
        }
    }
    Et() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Bt(this.host);
            break;

          case 3:
            this.hostController.Bt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const i = t.has(we, false) ? t.get(we) : t.get(be);
                i.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        let t = 0;
        let i;
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) i = X(...this.lifecycleHooks.attaching.map(hs, this));
        if (this.hooks.hasAttaching) i = X(i, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (Ct(i)) {
            this.Rt();
            this.At();
            i.then((() => {
                this.It();
            })).catch((t => {
                this.St(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.It();
    }
    deactivate(t, i, e) {
        switch (~16 & this.state) {
          case 2:
            this.state = 4;
            break;

          case 0:
          case 8:
          case 32:
          case 8 | 32:
            return;

          default:
            throw new Error(`AUR0505:${this.name} ${Qe(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = e;
        if (t === this) this.Tt();
        let s = 0;
        let n;
        if (this.gt.length) for (;s < this.gt.length; ++s) this.gt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, e);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) n = X(...this.lifecycleHooks.detaching.map(as, this));
        if (this.hooks.hasDetaching) n = X(n, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (Ct(n)) {
            this.Rt();
            t.Tt();
            n.then((() => {
                t.Dt();
            })).catch((i => {
                t.St(i);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.Dt();
        return this.$promise;
    }
    removeNodes() {
        switch (this.vmKind) {
          case 0:
          case 2:
            this.nodes.remove();
            this.nodes.unlink();
        }
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.host.remove();
            break;

          case 3:
            this.location.$start.remove();
            this.location.remove();
            break;
        }
    }
    unbind() {
        const t = 4 | this.$flags;
        let i = 0;
        if (null !== this.bindings) for (;i < this.bindings.length; ++i) this.bindings[i].$unbind(t);
        this.parent = null;
        switch (this.vmKind) {
          case 1:
            this.scope = null;
            break;

          case 2:
            if (!this.hasLockedScope) this.scope = null;
            if (16 === (16 & this.state) && !this.viewFactory.tryReturnToCache(this) && this.$initiator === this) this.dispose();
            break;

          case 0:
            this.scope.parentScope = null;
            break;
        }
        if (16 === (16 & t) && this.$initiator === this) this.dispose();
        this.state = 32 & this.state | 8;
        this.$initiator = null;
        this.$t();
    }
    Rt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, i) => {
                this.$resolve = t;
                this.$reject = i;
            }));
            if (this.$initiator !== this) this.parent.Rt();
        }
    }
    $t() {
        if (void 0 !== this.$promise) {
            fs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            fs();
            fs = void 0;
        }
    }
    St(t) {
        if (void 0 !== this.$promise) {
            ds = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            ds(t);
            ds = void 0;
        }
        if (this.$initiator !== this) this.parent.St(t);
    }
    At() {
        ++this.wt;
        if (this.$initiator !== this) this.parent.At();
    }
    It() {
        if (0 === --this.wt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) vs = X(...this.lifecycleHooks.attached.map(cs, this));
            if (this.hooks.hasAttached) vs = X(vs, this.viewModel.attached(this.$initiator, this.$flags));
            if (Ct(vs)) {
                this.Rt();
                vs.then((() => {
                    this.state = 2;
                    this.$t();
                    if (this.$initiator !== this) this.parent.It();
                })).catch((t => {
                    this.St(t);
                }));
                vs = void 0;
                return;
            }
            vs = void 0;
            this.state = 2;
            this.$t();
        }
        if (this.$initiator !== this) this.parent.It();
    }
    Tt() {
        ++this.bt;
    }
    Dt() {
        if (0 === --this.bt) {
            this.Pt();
            this.removeNodes();
            let t = this.$initiator.head;
            let i;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) i = X(...t.lifecycleHooks.unbinding.map(us, this));
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    i = X(i, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (Ct(i)) {
                    this.Rt();
                    this.Pt();
                    i.then((() => {
                        this.Ot();
                    })).catch((t => {
                        this.St(t);
                    }));
                }
                i = void 0;
                t = t.next;
            }
            this.Ot();
        }
    }
    Pt() {
        ++this.xt;
    }
    Ot() {
        if (0 === --this.xt) {
            let t = this.$initiator.head;
            let i = null;
            while (null !== t) {
                if (t !== this) {
                    t.isBound = false;
                    t.unbind();
                }
                i = t.next;
                t.next = null;
                t = i;
            }
            this.head = this.tail = null;
            this.isBound = false;
            this.unbind();
        }
    }
    addBinding(t) {
        if (null === this.bindings) this.bindings = [ t ]; else this.bindings[this.bindings.length] = t;
    }
    addChild(t) {
        if (null === this.children) this.children = [ t ]; else this.children[this.children.length] = t;
    }
    is(t) {
        switch (this.vmKind) {
          case 1:
            return Vi.getDefinition(this.viewModel.constructor).name === t;

          case 0:
            return he.getDefinition(this.viewModel.constructor).name === t;

          case 2:
            return this.viewFactory.name === t;
        }
    }
    lockScope(t) {
        this.scope = t;
        this.hasLockedScope = true;
    }
    setHost(t) {
        if (0 === this.vmKind) {
            ws(t, he.name, this);
            ws(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            ws(t, he.name, this);
            ws(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            ws(t, he.name, this);
            ws(t, this.definition.key, this);
        }
        this.location = t;
        this.mountTarget = 3;
        return this;
    }
    release() {
        this.state |= 16;
    }
    dispose() {
        if (32 === (32 & this.state)) return;
        this.state |= 32;
        if (this.hooks.hasDispose) this.viewModel.dispose();
        if (null !== this.children) {
            this.children.forEach(es);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            Me.delete(this.viewModel);
            this.viewModel = null;
        }
        this.viewModel = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.hooks.hasAccept && true === this.viewModel.accept(t)) return true;
        if (null !== this.children) {
            const {children: i} = this;
            for (let e = 0, s = i.length; e < s; ++e) if (true === i[e].accept(t)) return true;
        }
    }
}

function je(t) {
    let i = t.$observers;
    if (void 0 === i) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: i = {}
    });
    return i;
}

function Ne(t, i, e, s) {
    const n = i.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let i;
        let e;
        let l = 0;
        const c = je(s);
        const a = t.container;
        const u = a.has(h, true) ? a.get(h) : null;
        for (;l < o; ++l) {
            i = r[l];
            if (void 0 === c[i]) {
                e = n[i];
                c[i] = new BindableObserver(s, i, e.callback, e.set, t, u);
            }
        }
    }
}

function We(t, i, e) {
    const s = i.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const i = je(e);
        const o = [];
        let l;
        let h = 0;
        let c;
        for (;h < r; ++h) {
            l = n[h];
            if (null == i[l]) {
                c = s[l];
                o[o.length] = i[l] = new ChildrenObserver(t, e, l, c.callback, c.query, c.filter, c.map, c.options);
            }
        }
        return o;
    }
    return L;
}

const He = new Map;

const ze = t => {
    let i = He.get(t);
    if (null == i) {
        i = new u(t, 0);
        He.set(t, i);
    }
    return i;
};

function Ge(t, i, e, s) {
    const n = i.get(c);
    const r = i.get(a);
    const o = e.watches;
    const h = 0 === t.vmKind ? t.scope : l.create(s, null, true);
    const u = o.length;
    let f;
    let d;
    let v;
    let m = 0;
    for (;u > m; ++m) {
        ({expression: f, callback: d} = o[m]);
        d = At(d) ? d : Reflect.get(s, d);
        if (!At(d)) throw new Error(`AUR0506:${String(d)}`);
        if (At(f)) t.addBinding(new ComputedWatcher(s, n, f, d, true)); else {
            v = Rt(f) ? r.parse(f, 8) : ze(f);
            t.addBinding(new ExpressionWatcher(h, i, n, v, d));
        }
    }
}

function Xe(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Ke(t) {
    return nt(t) && he.isType(t.constructor);
}

class HooksDefinition {
    constructor(t) {
        this.hasDefine = "define" in t;
        this.hasHydrating = "hydrating" in t;
        this.hasHydrated = "hydrated" in t;
        this.hasCreated = "created" in t;
        this.hasBinding = "binding" in t;
        this.hasBound = "bound" in t;
        this.hasAttaching = "attaching" in t;
        this.hasAttached = "attached" in t;
        this.hasDetaching = "detaching" in t;
        this.hasUnbinding = "unbinding" in t;
        this.hasDispose = "dispose" in t;
        this.hasAccept = "accept" in t;
    }
}

HooksDefinition.none = new HooksDefinition({});

const Ye = {
    mode: "open"
};

var Ze;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(Ze || (Ze = {}));

var Je;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Je || (Je = {}));

function Qe(t) {
    const i = [];
    if (1 === (1 & t)) i.push("activating");
    if (2 === (2 & t)) i.push("activated");
    if (4 === (4 & t)) i.push("deactivating");
    if (8 === (8 & t)) i.push("deactivated");
    if (16 === (16 & t)) i.push("released");
    if (32 === (32 & t)) i.push("disposed");
    return 0 === i.length ? "none" : i.join("|");
}

const ts = O.createInterface("IController");

const is = O.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, i, e) {
        this.instruction = i;
        this.parent = e;
        this.controller = t;
    }
}

function es(t) {
    t.dispose();
}

function ss(t) {
    t.instance.created(this.viewModel, this);
}

function ns(t) {
    t.instance.hydrating(this.viewModel, this);
}

function rs(t) {
    t.instance.hydrated(this.viewModel, this);
}

function os(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function ls(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function hs(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function cs(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function as(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function us(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let fs;

let ds;

let vs;

const ms = O.createInterface("IAppRoot");

const gs = O.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.Lt = 0;
        this.qt = null;
        this.$t = null;
        this.Ut = t.scopeTo("WorkTracker");
    }
    start() {
        this.Ut.trace(`start(stack:${this.Lt})`);
        ++this.Lt;
    }
    finish() {
        this.Ut.trace(`finish(stack:${this.Lt})`);
        if (0 === --this.Lt) {
            const t = this.$t;
            if (null !== t) {
                this.$t = this.qt = null;
                t();
            }
        }
    }
    wait() {
        this.Ut.trace(`wait(stack:${this.Lt})`);
        if (null === this.qt) {
            if (0 === this.Lt) return Promise.resolve();
            this.qt = new Promise((t => {
                this.$t = t;
            }));
        }
        return this.qt;
    }
}

WorkTracker.inject = [ K ];

class AppRoot {
    constructor(t, i, e, s) {
        this.config = t;
        this.platform = i;
        this.container = e;
        this.controller = void 0;
        this._t = void 0;
        this.host = t.host;
        this.work = e.get(gs);
        s.prepare(this);
        e.registerResolver(i.HTMLElement, e.registerResolver(i.Element, e.registerResolver(bs, new G("ElementResolver", t.host))));
        this._t = Y(this.Ft("beforeCreate"), (() => {
            const i = t.component;
            const s = e.createChild();
            let n;
            if (he.isType(i)) n = this.container.get(i); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return Y(this.Ft("hydrating"), (() => {
                o.hS(null);
                return Y(this.Ft("hydrated"), (() => {
                    o.hC();
                    this._t = void 0;
                }));
            }));
        }));
    }
    activate() {
        return Y(this._t, (() => Y(this.Ft("beforeActivate"), (() => Y(this.controller.activate(this.controller, null, 2, void 0), (() => this.Ft("afterActivate")))))));
    }
    deactivate() {
        return Y(this.Ft("beforeDeactivate"), (() => Y(this.controller.deactivate(this.controller, null, 0), (() => this.Ft("afterDeactivate")))));
    }
    Ft(t) {
        return X(...this.container.getAll(ki).reduce(((i, e) => {
            if (e.slot === t) i.push(e.run());
            return i;
        }), []));
    }
    dispose() {
        var t;
        null === (t = this.controller) || void 0 === t ? void 0 : t.dispose();
    }
}

class Refs {}

function ps(t, i) {
    var e, s;
    return null !== (s = null === (e = t.$au) || void 0 === e ? void 0 : e[i]) && void 0 !== s ? s : null;
}

function ws(t, i, e) {
    var s;
    var n;
    (null !== (s = (n = t).$au) && void 0 !== s ? s : n.$au = new Refs)[i] = e;
}

const bs = O.createInterface("INode");

const xs = O.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(ms, true)) return t.get(ms).host;
    return t.get(Jt).document;
}))));

const ys = O.createInterface("IRenderLocation");

var ks;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attr"] = 2] = "Attr";
    t[t["Text"] = 3] = "Text";
    t[t["CDATASection"] = 4] = "CDATASection";
    t[t["EntityReference"] = 5] = "EntityReference";
    t[t["Entity"] = 6] = "Entity";
    t[t["ProcessingInstruction"] = 7] = "ProcessingInstruction";
    t[t["Comment"] = 8] = "Comment";
    t[t["Document"] = 9] = "Document";
    t[t["DocumentType"] = 10] = "DocumentType";
    t[t["DocumentFragment"] = 11] = "DocumentFragment";
    t[t["Notation"] = 12] = "Notation";
})(ks || (ks = {}));

const Cs = new WeakMap;

function As(t) {
    if (Cs.has(t)) return Cs.get(t);
    let i = 0;
    let e = t.nextSibling;
    while (null !== e) {
        if (8 === e.nodeType) switch (e.textContent) {
          case "au-start":
            ++i;
            break;

          case "au-end":
            if (0 === i--) return e;
        }
        e = e.nextSibling;
    }
    if (null === t.parentNode && 11 === t.nodeType) {
        const i = he.for(t);
        if (void 0 === i) return null;
        if (2 === i.mountTarget) return As(i.host);
    }
    return t.parentNode;
}

function Rs(t, i) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const e = t.childNodes;
        for (let t = 0, s = e.length; t < s; ++t) Cs.set(e[t], i);
    } else Cs.set(t, i);
}

function Ss(t) {
    if (Es(t)) return t;
    const i = t.ownerDocument.createComment("au-end");
    const e = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(i, t);
        i.parentNode.insertBefore(e, i);
    }
    i.$start = e;
    return i;
}

function Es(t) {
    return "au-end" === t.textContent;
}

class FragmentNodeSequence {
    constructor(t, i) {
        this.platform = t;
        this.fragment = i;
        this.isMounted = false;
        this.isLinked = false;
        this.next = void 0;
        this.refNode = void 0;
        const e = i.querySelectorAll(".au");
        let s = 0;
        let n = e.length;
        let r;
        let o = this.targets = Array(n);
        while (n > s) {
            r = e[s];
            if ("AU-M" === r.nodeName) o[s] = Ss(r); else o[s] = r;
            ++s;
        }
        const l = i.childNodes;
        const h = this.childNodes = Array(n = l.length);
        s = 0;
        while (n > s) {
            h[s] = l[s];
            ++s;
        }
        this.firstChild = i.firstChild;
        this.lastChild = i.lastChild;
    }
    findTargets() {
        return this.targets;
    }
    insertBefore(t) {
        if (this.isLinked && !!this.refNode) this.addToLinked(); else {
            const i = t.parentNode;
            if (this.isMounted) {
                let e = this.firstChild;
                let s;
                const n = this.lastChild;
                while (null != e) {
                    s = e.nextSibling;
                    i.insertBefore(e, t);
                    if (e === n) break;
                    e = s;
                }
            } else {
                this.isMounted = true;
                t.parentNode.insertBefore(this.fragment, t);
            }
        }
    }
    appendTo(t, i = false) {
        if (this.isMounted) {
            let i = this.firstChild;
            let e;
            const s = this.lastChild;
            while (null != i) {
                e = i.nextSibling;
                t.appendChild(i);
                if (i === s) break;
                i = e;
            }
        } else {
            this.isMounted = true;
            if (!i) t.appendChild(this.fragment);
        }
    }
    remove() {
        if (this.isMounted) {
            this.isMounted = false;
            const t = this.fragment;
            const i = this.lastChild;
            let e;
            let s = this.firstChild;
            while (null !== s) {
                e = s.nextSibling;
                t.appendChild(s);
                if (s === i) break;
                s = e;
            }
        }
    }
    addToLinked() {
        const t = this.refNode;
        const i = t.parentNode;
        if (this.isMounted) {
            let e = this.firstChild;
            let s;
            const n = this.lastChild;
            while (null != e) {
                s = e.nextSibling;
                i.insertBefore(e, t);
                if (e === n) break;
                e = s;
            }
        } else {
            this.isMounted = true;
            i.insertBefore(this.fragment, t);
        }
    }
    unlink() {
        this.isLinked = false;
        this.next = void 0;
        this.refNode = void 0;
    }
    link(t) {
        this.isLinked = true;
        if (Es(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Bs = O.createInterface("IWindow", (t => t.callback((t => t.get(Jt).window))));

const Is = O.createInterface("ILocation", (t => t.callback((t => t.get(Bs).location))));

const Ts = O.createInterface("IHistory", (t => t.callback((t => t.get(Bs).history))));

const Ds = {
    [f.capturing]: {
        capture: true
    },
    [f.bubbling]: {
        capture: false
    }
};

class ListenerOptions {
    constructor(t, i, e) {
        this.prevent = t;
        this.strategy = i;
        this.expAsHandler = e;
    }
}

class Listener {
    constructor(t, i, e, s, n, r, o) {
        this.platform = t;
        this.targetEvent = i;
        this.sourceExpression = e;
        this.target = s;
        this.eventDelegator = n;
        this.locator = r;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
        this.Vt = o;
    }
    callSource(t) {
        const i = this.$scope.overrideContext;
        i.$event = t;
        let e = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        delete i.$event;
        if (this.Vt.expAsHandler) {
            if (!At(e)) throw new Error(`Handler of "${this.targetEvent}" event is not a function.`);
            e = e(t);
        }
        if (true !== e && this.Vt.prevent) t.preventDefault();
        return e;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = i;
        const e = this.sourceExpression;
        if (e.hasBind) e.bind(t, i, this.interceptor);
        if (this.Vt.strategy === f.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(xs), this.target, this.targetEvent, this, Ds[this.Vt.strategy]);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const i = this.sourceExpression;
        if (i.hasUnbind) i.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.Vt.strategy === f.none) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
        this.isBound = false;
    }
    observe(t, i) {
        return;
    }
    handleChange(t, i, e) {
        return;
    }
}

const $s = {
    capture: false
};

class ListenerTracker {
    constructor(t, i, e = $s) {
        this.Mt = t;
        this.jt = i;
        this.Vt = e;
        this.Nt = 0;
        this.Wt = new Map;
        this.Ht = new Map;
    }
    zt() {
        if (1 === ++this.Nt) this.Mt.addEventListener(this.jt, this, this.Vt);
    }
    Gt() {
        if (0 === --this.Nt) this.Mt.removeEventListener(this.jt, this, this.Vt);
    }
    dispose() {
        if (this.Nt > 0) {
            this.Nt = 0;
            this.Mt.removeEventListener(this.jt, this, this.Vt);
        }
        this.Wt.clear();
        this.Ht.clear();
    }
    Xt(t) {
        const i = true === this.Vt.capture ? this.Wt : this.Ht;
        let e = i.get(t);
        if (void 0 === e) i.set(t, e = bt());
        return e;
    }
    handleEvent(t) {
        const i = true === this.Vt.capture ? this.Wt : this.Ht;
        const e = t.composedPath();
        if (true === this.Vt.capture) e.reverse();
        for (const s of e) {
            const e = i.get(s);
            if (void 0 === e) continue;
            const n = e[this.jt];
            if (void 0 === n) continue;
            if (At(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, i, e, s) {
        this.Kt = t;
        this.Yt = i;
        this.jt = e;
        t.zt();
        i[e] = s;
    }
    dispose() {
        this.Kt.Gt();
        this.Yt[this.jt] = void 0;
    }
}

class EventSubscriber {
    constructor(t) {
        this.config = t;
        this.target = null;
        this.handler = null;
    }
    subscribe(t, i) {
        this.target = t;
        this.handler = i;
        let e;
        for (e of this.config.events) t.addEventListener(e, i);
    }
    dispose() {
        const {target: t, handler: i} = this;
        let e;
        if (null !== t && null !== i) for (e of this.config.events) t.removeEventListener(e, i);
        this.target = this.handler = null;
    }
}

const Ps = O.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Zt = bt();
    }
    addEventListener(t, i, e, s, n) {
        var r;
        var o;
        const l = null !== (r = (o = this.Zt)[e]) && void 0 !== r ? r : o[e] = new Map;
        let h = l.get(t);
        if (void 0 === h) l.set(t, h = new ListenerTracker(t, e, n));
        return new DelegateSubscription(h, h.Xt(i), e, s);
    }
    dispose() {
        for (const t in this.Zt) {
            const i = this.Zt[t];
            for (const t of i.values()) t.dispose();
            i.clear();
        }
    }
}

const Os = O.createInterface("IProjections");

const Ls = O.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var qs;

(function(t) {
    t["hydrateElement"] = "ra";
    t["hydrateAttribute"] = "rb";
    t["hydrateTemplateController"] = "rc";
    t["hydrateLetElement"] = "rd";
    t["setProperty"] = "re";
    t["interpolation"] = "rf";
    t["propertyBinding"] = "rg";
    t["callBinding"] = "rh";
    t["letBinding"] = "ri";
    t["refBinding"] = "rj";
    t["iteratorBinding"] = "rk";
    t["textBinding"] = "ha";
    t["listenerBinding"] = "hb";
    t["attributeBinding"] = "hc";
    t["stylePropertyBinding"] = "hd";
    t["setAttribute"] = "he";
    t["setClassAttribute"] = "hf";
    t["setStyleAttribute"] = "hg";
    t["spreadBinding"] = "hs";
    t["spreadElementProp"] = "hp";
})(qs || (qs = {}));

const Us = O.createInterface("Instruction");

function _s(t) {
    const i = t.type;
    return Rt(i) && 2 === i.length;
}

class InterpolationInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
    }
    get type() {
        return "rf";
    }
}

class PropertyBindingInstruction {
    constructor(t, i, e) {
        this.from = t;
        this.to = i;
        this.mode = e;
    }
    get type() {
        return "rg";
    }
}

class IteratorBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
    }
    get type() {
        return "rk";
    }
}

class CallBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
    }
    get type() {
        return "rh";
    }
}

class RefBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
    }
    get type() {
        return "rj";
    }
}

class SetPropertyInstruction {
    constructor(t, i) {
        this.value = t;
        this.to = i;
    }
    get type() {
        return "re";
    }
}

class HydrateElementInstruction {
    constructor(t, i, e, s, n, r) {
        this.res = t;
        this.alias = i;
        this.props = e;
        this.projections = s;
        this.containerless = n;
        this.captures = r;
        this.auSlot = null;
    }
    get type() {
        return "ra";
    }
}

class HydrateAttributeInstruction {
    constructor(t, i, e) {
        this.res = t;
        this.alias = i;
        this.props = e;
    }
    get type() {
        return "rb";
    }
}

class HydrateTemplateController {
    constructor(t, i, e, s) {
        this.def = t;
        this.res = i;
        this.alias = e;
        this.props = s;
    }
    get type() {
        return "rc";
    }
}

class HydrateLetElementInstruction {
    constructor(t, i) {
        this.instructions = t;
        this.toBindingContext = i;
    }
    get type() {
        return "rd";
    }
}

class LetBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
    }
    get type() {
        return "ri";
    }
}

class TextBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.strict = i;
    }
    get type() {
        return "ha";
    }
}

class ListenerBindingInstruction {
    constructor(t, i, e, s) {
        this.from = t;
        this.to = i;
        this.preventDefault = e;
        this.strategy = s;
    }
    get type() {
        return "hb";
    }
}

class StylePropertyBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
    }
    get type() {
        return "hd";
    }
}

class SetAttributeInstruction {
    constructor(t, i) {
        this.value = t;
        this.to = i;
    }
    get type() {
        return "he";
    }
}

class SetClassAttributeInstruction {
    constructor(t) {
        this.value = t;
        this.type = "hf";
    }
}

class SetStyleAttributeInstruction {
    constructor(t) {
        this.value = t;
        this.type = "hg";
    }
}

class AttributeBindingInstruction {
    constructor(t, i, e) {
        this.attr = t;
        this.from = i;
        this.to = e;
    }
    get type() {
        return "hc";
    }
}

class SpreadBindingInstruction {
    get type() {
        return "hs";
    }
}

class SpreadElementPropBindingInstruction {
    constructor(t) {
        this.instructions = t;
    }
    get type() {
        return "hp";
    }
}

const Fs = O.createInterface("ITemplateCompiler");

const Vs = O.createInterface("IRenderer");

function Ms(t) {
    return function i(e) {
        e.register = function(t) {
            U.singleton(Vs, this).register(t);
        };
        St(e.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return e;
    };
}

function js(t, i, e) {
    if (Rt(i)) return t.parse(i, e);
    return i;
}

function Ns(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function Ws(t, i) {
    if ("element" === i) return t;
    switch (i) {
      case "controller":
        return he.for(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return he.for(t).viewModel;

      default:
        {
            const e = Vi.for(t, i);
            if (void 0 !== e) return e.viewModel;
            const s = he.for(t, {
                name: i
            });
            if (void 0 === s) throw new Error(`AUR0751:${i}`);
            return s.viewModel;
        }
    }
}

let Hs = class SetPropertyRenderer {
    render(t, i, e) {
        const s = Ns(i);
        if (void 0 !== s.$observers && void 0 !== s.$observers[e.to]) s.$observers[e.to].setValue(e.value, 2); else s[e.to] = e.value;
    }
};

Hs = lt([ Ms("re") ], Hs);

let zs = class CustomElementRenderer {
    constructor(t, i) {
        this.r = t;
        this.p = i;
    }
    static get inject() {
        return [ _e, Jt ];
    }
    render(t, i, e) {
        let s;
        let n;
        let r;
        let o;
        const l = e.res;
        const h = e.projections;
        const c = t.container;
        switch (typeof l) {
          case "string":
            s = c.find(he, l);
            if (null == s) throw new Error(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = e.containerless || s.containerless;
        const u = a ? Ss(i) : null;
        const f = xn(this.p, t, i, e, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        f.registerResolver(n, new G(s.key, r));
        o = Controller.$el(f, r, i, e, s, u);
        ws(i, s.key, o);
        const d = this.r.renderers;
        const v = e.props;
        const m = v.length;
        let g = 0;
        let p;
        while (m > g) {
            p = v[g];
            d[p.type].render(t, o, p);
            ++g;
        }
        t.addChild(o);
    }
};

zs = lt([ Ms("ra") ], zs);

let Gs = class CustomAttributeRenderer {
    constructor(t, i) {
        this.r = t;
        this.p = i;
    }
    static get inject() {
        return [ _e, Jt ];
    }
    render(t, i, e) {
        let s = t.container;
        let n;
        switch (typeof e.res) {
          case "string":
            n = s.find(Vi, e.res);
            if (null == n) throw new Error(`AUR0753:${e.res}@${t["name"]}`);
            break;

          default:
            n = e.res;
        }
        const r = yn(this.p, n, t, i, e, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, i, n);
        ws(i, n.key, o);
        const l = this.r.renderers;
        const h = e.props;
        const c = h.length;
        let a = 0;
        let u;
        while (c > a) {
            u = h[a];
            l[u.type].render(t, o, u);
            ++a;
        }
        t.addChild(o);
    }
};

Gs = lt([ Ms("rb") ], Gs);

let Xs = class TemplateControllerRenderer {
    constructor(t, i) {
        this.r = t;
        this.p = i;
    }
    static get inject() {
        return [ _e, Jt ];
    }
    render(t, i, e) {
        var s, n;
        let r = t.container;
        let o;
        switch (typeof e.res) {
          case "string":
            o = r.find(Vi, e.res);
            if (null == o) throw new Error(`AUR0754:${e.res}@${t["name"]}`);
            break;

          default:
            o = e.res;
        }
        const l = this.r.getViewFactory(e.def, r);
        const h = Ss(i);
        const c = yn(this.p, o, t, i, e, l, h);
        const a = Controller.$attr(c.ctn, c.vm, i, o);
        ws(h, o.key, a);
        null === (n = (s = c.vm).link) || void 0 === n ? void 0 : n.call(s, t, a, i, e);
        const u = this.r.renderers;
        const f = e.props;
        const d = f.length;
        let v = 0;
        let m;
        while (d > v) {
            m = f[v];
            u[m.type].render(t, a, m);
            ++v;
        }
        t.addChild(a);
    }
};

Xs = lt([ Ms("rc") ], Xs);

let Ks = class LetElementRenderer {
    constructor(t, i) {
        this.ep = t;
        this.oL = i;
    }
    render(t, i, e) {
        i.remove();
        const s = e.instructions;
        const n = e.toBindingContext;
        const r = t.container;
        const o = s.length;
        let l;
        let h;
        let c;
        let a = 0;
        while (o > a) {
            l = s[a];
            h = js(this.ep, l.from, 8);
            c = new LetBinding(h, l.to, this.oL, r, n);
            t.addBinding(38962 === h.$kind ? nn(c, h, r) : c);
            ++a;
        }
    }
};

Ks.inject = [ a, c ];

Ks = lt([ Ms("rd") ], Ks);

let Ys = class CallBindingRenderer {
    constructor(t, i) {
        this.ep = t;
        this.oL = i;
    }
    render(t, i, e) {
        const s = js(this.ep, e.from, 8 | 4);
        const n = new CallBinding(s, Ns(i), e.to, this.oL, t.container);
        t.addBinding(38962 === s.$kind ? nn(n, s, t.container) : n);
    }
};

Ys.inject = [ a, c ];

Ys = lt([ Ms("rh") ], Ys);

let Zs = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, i, e) {
        const s = js(this.ep, e.from, 8);
        const n = new RefBinding(s, Ws(i, e.to), t.container);
        t.addBinding(38962 === s.$kind ? nn(n, s, t.container) : n);
    }
};

Zs.inject = [ a ];

Zs = lt([ Ms("rj") ], Zs);

let Js = class InterpolationBindingRenderer {
    constructor(t, i, e) {
        this.ep = t;
        this.oL = i;
        this.p = e;
    }
    render(i, e, s) {
        const n = i.container;
        const r = js(this.ep, s.from, 1);
        const o = new InterpolationBinding(this.oL, r, Ns(e), s.to, t.toView, n, this.p.domWriteQueue);
        const l = o.partBindings;
        const h = l.length;
        let c = 0;
        let a;
        for (;h > c; ++c) {
            a = l[c];
            if (38962 === a.sourceExpression.$kind) l[c] = nn(a, a.sourceExpression, n);
        }
        i.addBinding(o);
    }
};

Js.inject = [ a, c, Jt ];

Js = lt([ Ms("rf") ], Js);

let Qs = class PropertyBindingRenderer {
    constructor(t, i, e) {
        this.ep = t;
        this.oL = i;
        this.p = e;
    }
    render(t, i, e) {
        const s = js(this.ep, e.from, 8);
        const n = new PropertyBinding(s, Ns(i), e.to, e.mode, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === s.$kind ? nn(n, s, t.container) : n);
    }
};

Qs.inject = [ a, c, Jt ];

Qs = lt([ Ms("rg") ], Qs);

let tn = class IteratorBindingRenderer {
    constructor(t, i, e) {
        this.ep = t;
        this.oL = i;
        this.p = e;
    }
    render(i, e, s) {
        const n = js(this.ep, s.from, 2);
        const r = new PropertyBinding(n, Ns(e), s.to, t.toView, this.oL, i.container, this.p.domWriteQueue);
        i.addBinding(38962 === n.iterable.$kind ? nn(r, n.iterable, i.container) : r);
    }
};

tn.inject = [ a, c, Jt ];

tn = lt([ Ms("rk") ], tn);

let en = 0;

const sn = [];

function nn(t, i, e) {
    while (i instanceof d) {
        sn[en++] = i;
        i = i.expression;
    }
    while (en > 0) {
        const i = sn[--en];
        const s = e.get(i.behaviorKey);
        if (s instanceof v) t = s.construct(t, i);
    }
    sn.length = 0;
    return t;
}

let rn = class TextBindingRenderer {
    constructor(t, i, e) {
        this.ep = t;
        this.oL = i;
        this.p = e;
    }
    render(t, i, e) {
        const s = t.container;
        const n = i.nextSibling;
        const r = i.parentNode;
        const o = this.p.document;
        const l = js(this.ep, e.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        let v;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            v = c[u];
            d = new ContentBinding(v, r.insertBefore(o.createTextNode(""), n), s, this.oL, this.p, e.strict);
            t.addBinding(38962 === v.$kind ? nn(d, v, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === i.nodeName) i.remove();
    }
};

rn.inject = [ a, c, Jt ];

rn = lt([ Ms("ha") ], rn);

const on = O.createInterface("IListenerBehaviorOptions", (t => t.singleton(ListenerBehaviorOptions)));

class ListenerBehaviorOptions {
    constructor() {
        this.expAsHandler = false;
    }
}

let ln = class ListenerBindingRenderer {
    constructor(t, i, e, s) {
        this.ep = t;
        this.Jt = i;
        this.p = e;
        this.Qt = s;
    }
    render(t, i, e) {
        const s = js(this.ep, e.from, 4);
        const n = new Listener(this.p, e.to, s, i, this.Jt, t.container, new ListenerOptions(e.preventDefault, e.strategy, this.Qt.expAsHandler));
        t.addBinding(38962 === s.$kind ? nn(n, s, t.container) : n);
    }
};

ln.inject = [ a, Ps, Jt, on ];

ln = lt([ Ms("hb") ], ln);

let hn = class SetAttributeRenderer {
    render(t, i, e) {
        i.setAttribute(e.to, e.value);
    }
};

hn = lt([ Ms("he") ], hn);

let cn = class SetClassAttributeRenderer {
    render(t, i, e) {
        vn(i.classList, e.value);
    }
};

cn = lt([ Ms("hf") ], cn);

let an = class SetStyleAttributeRenderer {
    render(t, i, e) {
        i.style.cssText += e.value;
    }
};

an = lt([ Ms("hg") ], an);

let un = class StylePropertyBindingRenderer {
    constructor(t, i, e) {
        this.ep = t;
        this.oL = i;
        this.p = e;
    }
    render(i, e, s) {
        const n = js(this.ep, s.from, 8);
        const r = new PropertyBinding(n, e.style, s.to, t.toView, this.oL, i.container, this.p.domWriteQueue);
        i.addBinding(38962 === n.$kind ? nn(r, n, i.container) : r);
    }
};

un.inject = [ a, c, Jt ];

un = lt([ Ms("hd") ], un);

let fn = class AttributeBindingRenderer {
    constructor(t, i) {
        this.ep = t;
        this.oL = i;
    }
    render(i, e, s) {
        const n = js(this.ep, s.from, 8);
        const r = new AttributeBinding(n, e, s.attr, s.to, t.toView, this.oL, i.container);
        i.addBinding(38962 === n.$kind ? nn(r, n, i.container) : r);
    }
};

fn.inject = [ a, c ];

fn = lt([ Ms("hc") ], fn);

let dn = class SpreadRenderer {
    constructor(t, i) {
        this.ti = t;
        this.r = i;
    }
    static get inject() {
        return [ Fs, _e ];
    }
    render(t, i, e) {
        const s = t.container;
        const n = s.get(is);
        const r = this.r.renderers;
        const o = t => {
            let i = t;
            let e = n;
            while (null != e && i > 0) {
                e = e.parent;
                --i;
            }
            if (null == e) throw new Error("No scope context for spread binding.");
            return e;
        };
        const l = e => {
            var s, n;
            const h = o(e);
            const c = mn(h);
            const a = this.ti.compileSpread(h.controller.definition, null !== (n = null === (s = h.instruction) || void 0 === s ? void 0 : s.captures) && void 0 !== n ? n : L, h.controller.container, i);
            let u;
            for (u of a) switch (u.type) {
              case "hs":
                l(e + 1);
                break;

              case "hp":
                r[u.instructions.type].render(c, he.for(i), u.instructions);
                break;

              default:
                r[u.type].render(c, i, u);
            }
            t.addBinding(c);
        };
        l(0);
    }
};

dn = lt([ Ms("hs") ], dn);

class SpreadBinding {
    constructor(t, i) {
        this.ii = t;
        this.ei = i;
        this.interceptor = this;
        this.isBound = false;
        this.ctrl = i.controller;
        this.locator = this.ctrl.container;
    }
    get container() {
        return this.locator;
    }
    get definition() {
        return this.ctrl.definition;
    }
    get isStrictBinding() {
        return this.ctrl.isStrictBinding;
    }
    $bind(t, i) {
        var e;
        if (this.isBound) return;
        this.isBound = true;
        const s = this.$scope = null !== (e = this.ei.controller.scope.parentScope) && void 0 !== e ? e : void 0;
        if (null == s) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.ii.forEach((i => i.$bind(t, s)));
    }
    $unbind(t) {
        this.ii.forEach((i => i.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.ii.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function vn(t, i) {
    const e = i.length;
    let s = 0;
    for (let n = 0; n < e; ++n) if (32 === i.charCodeAt(n)) {
        if (n !== s) t.add(i.slice(s, n));
        s = n + 1;
    } else if (n + 1 === e) t.add(i.slice(s));
}

const mn = t => new SpreadBinding([], t);

const gn = "IController";

const pn = "IInstruction";

const wn = "IRenderLocation";

const bn = "IAuSlotsInfo";

function xn(t, i, e, s, n, r) {
    const o = i.container.createChild();
    o.registerResolver(t.HTMLElement, o.registerResolver(t.Element, o.registerResolver(bs, new G("ElementResolver", e))));
    o.registerResolver(ts, new G(gn, i));
    o.registerResolver(Us, new G(pn, s));
    o.registerResolver(ys, null == n ? kn : new RenderLocationProvider(n));
    o.registerResolver(Te, Cn);
    o.registerResolver(Ls, null == r ? An : new G(bn, r));
    return o;
}

class ViewFactoryProvider {
    constructor(t) {
        this.f = t;
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        const t = this.f;
        if (null === t) throw new Error(`AUR7055`);
        if (!Rt(t.name) || 0 === t.name.length) throw new Error(`AUR0756`);
        return t;
    }
}

function yn(t, i, e, s, n, r, o, l) {
    const h = e.container.createChild();
    h.registerResolver(t.HTMLElement, h.registerResolver(t.Element, h.registerResolver(bs, new G("ElementResolver", s))));
    e = e instanceof Controller ? e : e.ctrl;
    h.registerResolver(ts, new G(gn, e));
    h.registerResolver(Us, new G(pn, n));
    h.registerResolver(ys, null == o ? kn : new G(wn, o));
    h.registerResolver(Te, null == r ? Cn : new ViewFactoryProvider(r));
    h.registerResolver(Ls, null == l ? An : new G(bn, l));
    return {
        vm: h.invoke(i.Type),
        ctn: h
    };
}

class RenderLocationProvider {
    constructor(t) {
        this.l = t;
    }
    get name() {
        return "IRenderLocation";
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        return this.l;
    }
}

const kn = new RenderLocationProvider(null);

const Cn = new ViewFactoryProvider(null);

const An = new G(bn, new AuSlotsInfo(L));

var Rn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Rn || (Rn = {}));

function Sn(t) {
    return function(i) {
        return Tn.define(t, i);
    };
}

class BindingCommandDefinition {
    constructor(t, i, e, s, n) {
        this.Type = t;
        this.name = i;
        this.aliases = e;
        this.key = s;
        this.type = n;
    }
    static create(t, i) {
        let e;
        let s;
        if (Rt(t)) {
            e = t;
            s = {
                name: e
            };
        } else {
            e = t.name;
            s = t;
        }
        return new BindingCommandDefinition(i, D(In(i, "name"), e), F(In(i, "aliases"), s.aliases, i.aliases), Bn(e), D(In(i, "type"), s.type, i.type, null));
    }
    register(t) {
        const {Type: i, key: e, aliases: s} = this;
        U.singleton(e, i).register(t);
        U.aliasTo(e, i).register(t);
        n(s, Tn, e, t);
    }
}

const En = mt("binding-command");

const Bn = t => `${En}:${t}`;

const In = (t, i) => ct(vt(i), t);

const Tn = Object.freeze({
    name: En,
    keyFrom: Bn,
    define(t, i) {
        const e = BindingCommandDefinition.create(t, i);
        ut(En, e, e.Type);
        ut(En, e, e);
        gt(i, En);
        return e.Type;
    },
    getAnnotation: In
});

let Dn = class OneTimeBindingCommand {
    constructor(t, i) {
        this.type = 0;
        this.m = t;
        this.ep = i;
    }
    get name() {
        return "one-time";
    }
    build(i) {
        var e;
        const s = i.attr;
        let n = s.target;
        let r = i.attr.rawValue;
        if (null == i.bindable) n = null !== (e = this.m.map(i.node, n)) && void 0 !== e ? e : Z(n); else {
            if ("" === r && 1 === i.def.type) r = Z(n);
            n = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.oneTime);
    }
};

Dn.inject = [ ii, a ];

Dn = lt([ Sn("one-time") ], Dn);

let $n = class ToViewBindingCommand {
    constructor(t, i) {
        this.type = 0;
        this.m = t;
        this.ep = i;
    }
    get name() {
        return "to-view";
    }
    build(i) {
        var e;
        const s = i.attr;
        let n = s.target;
        let r = i.attr.rawValue;
        if (null == i.bindable) n = null !== (e = this.m.map(i.node, n)) && void 0 !== e ? e : Z(n); else {
            if ("" === r && 1 === i.def.type) r = Z(n);
            n = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.toView);
    }
};

$n.inject = [ ii, a ];

$n = lt([ Sn("to-view") ], $n);

let Pn = class FromViewBindingCommand {
    constructor(t, i) {
        this.type = 0;
        this.m = t;
        this.ep = i;
    }
    get name() {
        return "from-view";
    }
    build(i) {
        var e;
        const s = i.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == i.bindable) n = null !== (e = this.m.map(i.node, n)) && void 0 !== e ? e : Z(n); else {
            if ("" === r && 1 === i.def.type) r = Z(n);
            n = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.fromView);
    }
};

Pn.inject = [ ii, a ];

Pn = lt([ Sn("from-view") ], Pn);

let On = class TwoWayBindingCommand {
    constructor(t, i) {
        this.type = 0;
        this.m = t;
        this.ep = i;
    }
    get name() {
        return "two-way";
    }
    build(i) {
        var e;
        const s = i.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == i.bindable) n = null !== (e = this.m.map(i.node, n)) && void 0 !== e ? e : Z(n); else {
            if ("" === r && 1 === i.def.type) r = Z(n);
            n = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.twoWay);
    }
};

On.inject = [ ii, a ];

On = lt([ Sn("two-way") ], On);

let Ln = class DefaultBindingCommand {
    constructor(t, i) {
        this.type = 0;
        this.m = t;
        this.ep = i;
    }
    get name() {
        return "bind";
    }
    build(i) {
        var e;
        const s = i.attr;
        const n = i.bindable;
        let r;
        let o;
        let l = s.target;
        let h = s.rawValue;
        if (null == n) {
            o = this.m.isTwoWay(i.node, l) ? t.twoWay : t.toView;
            l = null !== (e = this.m.map(i.node, l)) && void 0 !== e ? e : Z(l);
        } else {
            if ("" === h && 1 === i.def.type) h = Z(l);
            r = i.def.defaultBindingMode;
            o = n.mode === t.default || null == n.mode ? null == r || r === t.default ? t.toView : r : n.mode;
            l = n.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(h, 8), l, o);
    }
};

Ln.inject = [ ii, a ];

Ln = lt([ Sn("bind") ], Ln);

let qn = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(t) {
        const i = null === t.bindable ? Z(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(this.ep.parse(t.attr.rawValue, 8 | 4), i);
    }
};

qn.inject = [ a ];

qn = lt([ Sn("call") ], qn);

let Un = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(t) {
        const i = null === t.bindable ? Z(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(t.attr.rawValue, 2), i);
    }
};

Un.inject = [ a ];

Un = lt([ Sn("for") ], Un);

let _n = class TriggerBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "trigger";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, true, f.none);
    }
};

_n.inject = [ a ];

_n = lt([ Sn("trigger") ], _n);

let Fn = class DelegateBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "delegate";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, f.bubbling);
    }
};

Fn.inject = [ a ];

Fn = lt([ Sn("delegate") ], Fn);

let Vn = class CaptureBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "capture";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, f.capturing);
    }
};

Vn.inject = [ a ];

Vn = lt([ Sn("capture") ], Vn);

let Mn = class AttrBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "attr";
    }
    build(t) {
        return new AttributeBindingInstruction(t.attr.target, this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Mn.inject = [ a ];

Mn = lt([ Sn("attr") ], Mn);

let jn = class StyleBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "style";
    }
    build(t) {
        return new AttributeBindingInstruction("style", this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

jn.inject = [ a ];

jn = lt([ Sn("style") ], jn);

let Nn = class ClassBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "class";
    }
    build(t) {
        return new AttributeBindingInstruction("class", this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Nn.inject = [ a ];

Nn = lt([ Sn("class") ], Nn);

let Wn = class RefBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "ref";
    }
    build(t) {
        return new RefBindingInstruction(this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Wn.inject = [ a ];

Wn = lt([ Sn("ref") ], Wn);

let Hn = class SpreadBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() {
        return "...$attrs";
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Hn = lt([ Sn("...$attrs") ], Hn);

const zn = O.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Gn = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.si = t.document.createElement("template");
    }
    createTemplate(t) {
        var i;
        if (Rt(t)) {
            let i = Gn[t];
            if (void 0 === i) {
                const e = this.si;
                e.innerHTML = t;
                const s = e.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.si = this.p.document.createElement("template");
                    i = e;
                } else {
                    e.content.removeChild(s);
                    i = s;
                }
                Gn[t] = i;
            }
            return i.cloneNode(true);
        }
        if ("TEMPLATE" !== t.nodeName) {
            const i = this.p.document.createElement("template");
            i.content.appendChild(t);
            return i;
        }
        null === (i = t.parentNode) || void 0 === i ? void 0 : i.removeChild(t);
        return t.cloneNode(true);
    }
}

TemplateElementFactory.inject = [ Jt ];

const Xn = function(t) {
    function i(t, e, s) {
        O.inject(i)(t, e, s);
    }
    i.$isResolver = true;
    i.resolve = function(i, e) {
        if (e.root === e) return e.getAll(t, false);
        return e.has(t, false) ? e.getAll(t, false).concat(e.root.getAll(t, false)) : e.root.getAll(t, false);
    };
    return i;
};

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return U.singleton(Fs, this).register(t);
    }
    compile(t, i, e) {
        var s, n, r, o;
        const l = CustomElementDefinition.getOrCreate(t);
        if (null === l.template || void 0 === l.template) return l;
        if (false === l.needsCompile) return l;
        null !== e && void 0 !== e ? e : e = Zn;
        const h = new CompilationContext(t, i, e, null, null, void 0);
        const c = Rt(l.template) || !t.enhance ? h.ni.createTemplate(l.template) : l.template;
        const a = "TEMPLATE" === c.nodeName && null != c.content;
        const u = a ? c.content : c;
        const f = i.get(Xn(hr));
        const d = f.length;
        let v = 0;
        if (d > 0) while (d > v) {
            null === (n = (s = f[v]).compiling) || void 0 === n ? void 0 : n.call(s, c);
            ++v;
        }
        if (c.hasAttribute(rr)) throw new Error(`AUR0701`);
        this.ri(u, h);
        this.oi(u, h);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || dr(),
            dependencies: (null !== (r = t.dependencies) && void 0 !== r ? r : L).concat(null !== (o = h.deps) && void 0 !== o ? o : L),
            instructions: h.rows,
            surrogates: a ? this.li(c, h) : L,
            template: c,
            hasSlots: h.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, i, e, s) {
        var n;
        const r = new CompilationContext(t, e, Zn, null, null, void 0);
        const o = [];
        const l = r.hi(s.nodeName.toLowerCase());
        const h = null !== l;
        const c = r.ep;
        const a = i.length;
        let u = 0;
        let f;
        let d = null;
        let v;
        let m;
        let g;
        let p;
        let w;
        let b = null;
        let x;
        let y;
        let k;
        let C;
        for (;a > u; ++u) {
            f = i[u];
            k = f.target;
            C = f.rawValue;
            b = r.ai(f);
            if (null !== b && (1 & b.type) > 0) {
                Qn.node = s;
                Qn.attr = f;
                Qn.bindable = null;
                Qn.def = null;
                o.push(b.build(Qn));
                continue;
            }
            d = r.ui(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                g = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === b && Kn(C);
                if (y) m = this.fi(s, C, d, r); else {
                    w = g.primary;
                    if (null === b) {
                        x = c.parse(C, 1);
                        m = [ null === x ? new SetPropertyInstruction(C, w.property) : new InterpolationInstruction(x, w.property) ];
                    } else {
                        Qn.node = s;
                        Qn.attr = f;
                        Qn.bindable = w;
                        Qn.def = d;
                        m = [ b.build(Qn) ];
                    }
                }
                (null !== v && void 0 !== v ? v : v = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === b) {
                x = c.parse(C, 1);
                if (h) {
                    g = BindablesInfo.from(l, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        x = c.parse(C, 1);
                        o.push(new SpreadElementPropBindingInstruction(null == x ? new SetPropertyInstruction(C, p.property) : new InterpolationInstruction(x, p.property)));
                        continue;
                    }
                }
                if (null != x) o.push(new InterpolationInstruction(x, null !== (n = r.m.map(s, k)) && void 0 !== n ? n : Z(k))); else switch (k) {
                  case "class":
                    o.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    o.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    o.push(new SetAttributeInstruction(C, k));
                }
            } else {
                if (h) {
                    g = BindablesInfo.from(l, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        Qn.node = s;
                        Qn.attr = f;
                        Qn.bindable = p;
                        Qn.def = l;
                        o.push(new SpreadElementPropBindingInstruction(b.build(Qn)));
                        continue;
                    }
                }
                Qn.node = s;
                Qn.attr = f;
                Qn.bindable = null;
                Qn.def = null;
                o.push(b.build(Qn));
            }
        }
        Yn();
        if (null != v) return v.concat(o);
        return o;
    }
    li(t, i) {
        var e;
        const s = [];
        const n = t.attributes;
        const r = i.ep;
        let o = n.length;
        let l = 0;
        let h;
        let c;
        let a;
        let u;
        let f = null;
        let d;
        let v;
        let m;
        let g;
        let p = null;
        let w;
        let b;
        let x;
        let y;
        for (;o > l; ++l) {
            h = n[l];
            c = h.name;
            a = h.value;
            u = i.di.parse(c, a);
            x = u.target;
            y = u.rawValue;
            if (tr[x]) throw new Error(`AUR0702:${c}`);
            p = i.ai(u);
            if (null !== p && (1 & p.type) > 0) {
                Qn.node = t;
                Qn.attr = u;
                Qn.bindable = null;
                Qn.def = null;
                s.push(p.build(Qn));
                continue;
            }
            f = i.ui(x);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${x}`);
                m = BindablesInfo.from(f, true);
                b = false === f.noMultiBindings && null === p && Kn(y);
                if (b) v = this.fi(t, y, f, i); else {
                    g = m.primary;
                    if (null === p) {
                        w = r.parse(y, 1);
                        v = [ null === w ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(w, g.property) ];
                    } else {
                        Qn.node = t;
                        Qn.attr = u;
                        Qn.bindable = g;
                        Qn.def = f;
                        v = [ p.build(Qn) ];
                    }
                }
                t.removeAttribute(c);
                --l;
                --o;
                (null !== d && void 0 !== d ? d : d = []).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(x) ? x : void 0, v));
                continue;
            }
            if (null === p) {
                w = r.parse(y, 1);
                if (null != w) {
                    t.removeAttribute(c);
                    --l;
                    --o;
                    s.push(new InterpolationInstruction(w, null !== (e = i.m.map(t, x)) && void 0 !== e ? e : Z(x)));
                } else switch (c) {
                  case "class":
                    s.push(new SetClassAttributeInstruction(y));
                    break;

                  case "style":
                    s.push(new SetStyleAttributeInstruction(y));
                    break;

                  default:
                    s.push(new SetAttributeInstruction(y, c));
                }
            } else {
                Qn.node = t;
                Qn.attr = u;
                Qn.bindable = null;
                Qn.def = null;
                s.push(p.build(Qn));
            }
        }
        Yn();
        if (null != d) return d.concat(s);
        return s;
    }
    oi(t, i) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.vi(t, i);

              default:
                return this.mi(t, i);
            }

          case 3:
            return this.gi(t, i);

          case 11:
            {
                let e = t.firstChild;
                while (null !== e) e = this.oi(e, i);
                break;
            }
        }
        return t.nextSibling;
    }
    vi(t, i) {
        const e = t.attributes;
        const s = e.length;
        const n = [];
        const r = i.ep;
        let o = false;
        let l = 0;
        let h;
        let c;
        let a;
        let u;
        let f;
        let d;
        let v;
        let g;
        for (;s > l; ++l) {
            h = e[l];
            a = h.name;
            u = h.value;
            if ("to-binding-context" === a) {
                o = true;
                continue;
            }
            c = i.di.parse(a, u);
            d = c.target;
            v = c.rawValue;
            f = i.ai(c);
            if (null !== f) switch (f.name) {
              case "to-view":
              case "bind":
                n.push(new LetBindingInstruction(r.parse(v, 8), Z(d)));
                continue;

              default:
                throw new Error(`AUR0704:${c.command}`);
            }
            g = r.parse(v, 1);
            n.push(new LetBindingInstruction(null === g ? new m(v) : g, Z(d)));
        }
        i.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.pi(t).nextSibling;
    }
    mi(t, i) {
        var e, s, n, r, o, l;
        var h, c, a, u;
        const f = t.nextSibling;
        const d = (null !== (e = t.getAttribute("as-element")) && void 0 !== e ? e : t.nodeName).toLowerCase();
        const v = i.hi(d);
        const m = null !== v;
        const g = m && null != v.shadowOptions;
        const p = null === v || void 0 === v ? void 0 : v.capture;
        const w = null != p && "boolean" !== typeof p;
        const b = p ? [] : L;
        const x = i.ep;
        const y = this.debug ? P : () => {
            t.removeAttribute(E);
            --R;
            --A;
        };
        let k = t.attributes;
        let C;
        let A = k.length;
        let R = 0;
        let S;
        let E;
        let B;
        let I;
        let T;
        let D;
        let $ = null;
        let O = false;
        let q;
        let U;
        let _;
        let F;
        let V;
        let M;
        let j;
        let N = null;
        let W;
        let H;
        let z;
        let G;
        let X = true;
        let K = false;
        let Y = false;
        if ("slot" === d) {
            if (null == i.root.def.shadowOptions) throw new Error(`AUR0717:${i.root.def.name}`);
            i.root.hasSlot = true;
        }
        if (m) {
            X = null === (s = v.processContent) || void 0 === s ? void 0 : s.call(v.Type, t, i.p);
            k = t.attributes;
            A = k.length;
        }
        if (i.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;A > R; ++R) {
            S = k[R];
            E = S.name;
            B = S.value;
            switch (E) {
              case "as-element":
              case "containerless":
                y();
                if (!K) K = "containerless" === E;
                continue;
            }
            I = i.di.parse(E, B);
            N = i.ai(I);
            z = I.target;
            G = I.rawValue;
            if (p && (!w || w && p(z))) {
                if (null != N && 1 & N.type) {
                    y();
                    b.push(I);
                    continue;
                }
                Y = "au-slot" !== z && "slot" !== z;
                if (Y) {
                    W = BindablesInfo.from(v, false);
                    if (null == W.attrs[z] && !(null === (n = i.ui(z)) || void 0 === n ? void 0 : n.isTemplateController)) {
                        y();
                        b.push(I);
                        continue;
                    }
                }
            }
            if (null !== N && 1 & N.type) {
                Qn.node = t;
                Qn.attr = I;
                Qn.bindable = null;
                Qn.def = null;
                (null !== T && void 0 !== T ? T : T = []).push(N.build(Qn));
                y();
                continue;
            }
            $ = i.ui(z);
            if (null !== $) {
                W = BindablesInfo.from($, true);
                O = false === $.noMultiBindings && null === N && Kn(G);
                if (O) _ = this.fi(t, G, $, i); else {
                    H = W.primary;
                    if (null === N) {
                        M = x.parse(G, 1);
                        _ = [ null === M ? new SetPropertyInstruction(G, H.property) : new InterpolationInstruction(M, H.property) ];
                    } else {
                        Qn.node = t;
                        Qn.attr = I;
                        Qn.bindable = H;
                        Qn.def = $;
                        _ = [ N.build(Qn) ];
                    }
                }
                y();
                if ($.isTemplateController) (null !== F && void 0 !== F ? F : F = []).push(new HydrateTemplateController(Jn, this.resolveResources ? $ : $.name, void 0, _)); else (null !== U && void 0 !== U ? U : U = []).push(new HydrateAttributeInstruction(this.resolveResources ? $ : $.name, null != $.aliases && $.aliases.includes(z) ? z : void 0, _));
                continue;
            }
            if (null === N) {
                if (m) {
                    W = BindablesInfo.from(v, false);
                    q = W.attrs[z];
                    if (void 0 !== q) {
                        M = x.parse(G, 1);
                        (null !== D && void 0 !== D ? D : D = []).push(null == M ? new SetPropertyInstruction(G, q.property) : new InterpolationInstruction(M, q.property));
                        y();
                        continue;
                    }
                }
                M = x.parse(G, 1);
                if (null != M) {
                    y();
                    (null !== T && void 0 !== T ? T : T = []).push(new InterpolationInstruction(M, null !== (r = i.m.map(t, z)) && void 0 !== r ? r : Z(z)));
                }
                continue;
            }
            y();
            if (m) {
                W = BindablesInfo.from(v, false);
                q = W.attrs[z];
                if (void 0 !== q) {
                    Qn.node = t;
                    Qn.attr = I;
                    Qn.bindable = q;
                    Qn.def = v;
                    (null !== D && void 0 !== D ? D : D = []).push(N.build(Qn));
                    continue;
                }
            }
            Qn.node = t;
            Qn.attr = I;
            Qn.bindable = null;
            Qn.def = null;
            (null !== T && void 0 !== T ? T : T = []).push(N.build(Qn));
        }
        Yn();
        if (this.wi(t) && null != T && T.length > 1) this.bi(t, T);
        if (m) {
            j = new HydrateElementInstruction(this.resolveResources ? v : v.name, void 0, null !== D && void 0 !== D ? D : L, null, K, b);
            if (d === mr) {
                const e = t.getAttribute("name") || vr;
                const s = i.h("template");
                const n = i.xi();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.oi(s.content, n);
                j.auSlot = {
                    name: e,
                    fallback: CustomElementDefinition.create({
                        name: dr(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.yi(t, i);
            }
        }
        if (null != T || null != j || null != U) {
            C = L.concat(null !== j && void 0 !== j ? j : L, null !== U && void 0 !== U ? U : L, null !== T && void 0 !== T ? T : L);
            this.pi(t);
        }
        let J;
        if (null != F) {
            A = F.length - 1;
            R = A;
            V = F[R];
            let e;
            this.yi(t, i);
            if ("TEMPLATE" === t.nodeName) e = t; else {
                e = i.h("template");
                e.content.appendChild(t);
            }
            const s = e;
            const n = i.xi(null == C ? [] : [ C ]);
            let r;
            let l;
            let a;
            let u;
            let f;
            let p;
            let w;
            let b;
            let x = 0, y = 0;
            let k = t.firstChild;
            let S = false;
            if (false !== X) while (null !== k) {
                l = 1 === k.nodeType ? k.getAttribute(mr) : null;
                if (null !== l) k.removeAttribute(mr);
                if (m) {
                    r = k.nextSibling;
                    if (!g) {
                        S = 3 === k.nodeType && "" === k.textContent.trim();
                        if (!S) (null !== (o = (h = null !== u && void 0 !== u ? u : u = {})[c = l || vr]) && void 0 !== o ? o : h[c] = []).push(k);
                        t.removeChild(k);
                    }
                    k = r;
                } else {
                    if (null !== l) {
                        l = l || vr;
                        throw new Error(`AUR0706:${d}[${l}]`);
                    }
                    k = k.nextSibling;
                }
            }
            if (null != u) {
                a = {};
                for (l in u) {
                    e = i.h("template");
                    f = u[l];
                    for (x = 0, y = f.length; y > x; ++x) {
                        p = f[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) e.content.appendChild(p); else e.content.appendChild(p.content); else e.content.appendChild(p);
                    }
                    b = i.xi();
                    this.oi(e.content, b);
                    a[l] = CustomElementDefinition.create({
                        name: dr(),
                        template: e,
                        instructions: b.rows,
                        needsCompile: false,
                        isStrictBinding: i.root.def.isStrictBinding
                    });
                }
                j.projections = a;
            }
            if (m && (K || v.containerless)) this.yi(t, i);
            J = !m || !v.containerless && !K && false !== X;
            if (J) if ("TEMPLATE" === t.nodeName) this.oi(t.content, n); else {
                k = t.firstChild;
                while (null !== k) k = this.oi(k, n);
            }
            V.def = CustomElementDefinition.create({
                name: dr(),
                template: s,
                instructions: n.rows,
                needsCompile: false,
                isStrictBinding: i.root.def.isStrictBinding
            });
            while (R-- > 0) {
                V = F[R];
                e = i.h("template");
                w = i.h("au-m");
                w.classList.add("au");
                e.content.appendChild(w);
                V.def = CustomElementDefinition.create({
                    name: dr(),
                    template: e,
                    needsCompile: false,
                    instructions: [ [ F[R + 1] ] ],
                    isStrictBinding: i.root.def.isStrictBinding
                });
            }
            i.rows.push([ V ]);
        } else {
            if (null != C) i.rows.push(C);
            let e = t.firstChild;
            let s;
            let n;
            let r = null;
            let o;
            let h;
            let c;
            let f;
            let p;
            let w = false;
            let b = 0, x = 0;
            if (false !== X) while (null !== e) {
                n = 1 === e.nodeType ? e.getAttribute(mr) : null;
                if (null !== n) e.removeAttribute(mr);
                if (m) {
                    s = e.nextSibling;
                    if (!g) {
                        w = 3 === e.nodeType && "" === e.textContent.trim();
                        if (!w) (null !== (l = (a = null !== o && void 0 !== o ? o : o = {})[u = n || vr]) && void 0 !== l ? l : a[u] = []).push(e);
                        t.removeChild(e);
                    }
                    e = s;
                } else {
                    if (null !== n) {
                        n = n || vr;
                        throw new Error(`AUR0706:${d}[${n}]`);
                    }
                    e = e.nextSibling;
                }
            }
            if (null != o) {
                r = {};
                for (n in o) {
                    f = i.h("template");
                    h = o[n];
                    for (b = 0, x = h.length; x > b; ++b) {
                        c = h[b];
                        if ("TEMPLATE" === c.nodeName) if (c.attributes.length > 0) f.content.appendChild(c); else f.content.appendChild(c.content); else f.content.appendChild(c);
                    }
                    p = i.xi();
                    this.oi(f.content, p);
                    r[n] = CustomElementDefinition.create({
                        name: dr(),
                        template: f,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: i.root.def.isStrictBinding
                    });
                }
                j.projections = r;
            }
            if (m && (K || v.containerless)) this.yi(t, i);
            J = !m || !v.containerless && !K && false !== X;
            if (J && t.childNodes.length > 0) {
                e = t.firstChild;
                while (null !== e) e = this.oi(e, i);
            }
        }
        return f;
    }
    gi(t, i) {
        let e = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            e += s.textContent;
            s = s.nextSibling;
        }
        const n = i.ep.parse(e, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.pi(i.h("au-m")), t);
        i.rows.push([ new TextBindingInstruction(n, !!i.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    fi(t, i, e, s) {
        const n = BindablesInfo.from(e, true);
        const r = i.length;
        const o = [];
        let l;
        let h;
        let c = 0;
        let a = 0;
        let u;
        let f;
        let d;
        let v;
        for (let m = 0; m < r; ++m) {
            a = i.charCodeAt(m);
            if (92 === a) ++m; else if (58 === a) {
                l = i.slice(c, m);
                while (i.charCodeAt(++m) <= 32) ;
                c = m;
                for (;m < r; ++m) {
                    a = i.charCodeAt(m);
                    if (92 === a) ++m; else if (59 === a) {
                        h = i.slice(c, m);
                        break;
                    }
                }
                if (void 0 === h) h = i.slice(c);
                f = s.di.parse(l, h);
                d = s.ai(f);
                v = n.attrs[f.target];
                if (null == v) throw new Error(`AUR0707:${e.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, v.property) : new InterpolationInstruction(u, v.property));
                } else {
                    Qn.node = t;
                    Qn.attr = f;
                    Qn.bindable = v;
                    Qn.def = e;
                    o.push(d.build(Qn));
                }
                while (m < r && i.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        Yn();
        return o;
    }
    ri(t, i) {
        var e, s;
        const n = t;
        const r = J(n.querySelectorAll("template[as-custom-element]"));
        const o = r.length;
        if (0 === o) return;
        if (o === n.childElementCount) throw new Error(`AUR0708`);
        const l = new Set;
        const h = [];
        for (const t of r) {
            if (t.parentNode !== n) throw new Error(`AUR0709`);
            const e = or(t, l);
            const s = class LocalTemplate {};
            const r = t.content;
            const o = J(r.querySelectorAll("bindable"));
            const c = Dt.for(s);
            const a = new Set;
            const u = new Set;
            for (const t of o) {
                if (t.parentNode !== r) throw new Error(`AUR0710`);
                const i = t.getAttribute("property");
                if (null === i) throw new Error(`AUR0711`);
                const e = t.getAttribute("attribute");
                if (null !== e && u.has(e) || a.has(i)) throw new Error(`AUR0712:${i}+${e}`); else {
                    if (null !== e) u.add(e);
                    a.add(i);
                }
                c.add({
                    property: i,
                    attribute: null !== e && void 0 !== e ? e : void 0,
                    mode: lr(t)
                });
                const s = t.getAttributeNames().filter((t => !nr.includes(t)));
                if (s.length > 0) ;
                r.removeChild(t);
            }
            h.push(s);
            i.ki(he.define({
                name: e,
                template: t
            }, s));
            n.removeChild(t);
        }
        let c = 0;
        const a = h.length;
        for (;a > c; ++c) he.getDefinition(h[c]).dependencies.push(...null !== (e = i.def.dependencies) && void 0 !== e ? e : L, ...null !== (s = i.deps) && void 0 !== s ? s : L);
    }
    wi(t) {
        return "INPUT" === t.nodeName && 1 === ir[t.type];
    }
    bi(t, i) {
        switch (t.nodeName) {
          case "INPUT":
            {
                const t = i;
                let e;
                let s;
                let n = 0;
                let r;
                for (let i = 0; i < t.length && n < 3; i++) {
                    r = t[i];
                    switch (r.to) {
                      case "model":
                      case "value":
                      case "matcher":
                        e = i;
                        n++;
                        break;

                      case "checked":
                        s = i;
                        n++;
                        break;
                    }
                }
                if (void 0 !== s && void 0 !== e && s < e) [t[e], t[s]] = [ t[s], t[e] ];
            }
        }
    }
    pi(t) {
        t.classList.add("au");
        return t;
    }
    yi(t, i) {
        const e = t.parentNode;
        const s = i.h("au-m");
        this.pi(e.insertBefore(s, t));
        e.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, i, e, s, n, r) {
        this.hasSlot = false;
        this.Ci = bt();
        const o = null !== s;
        this.c = i;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = e;
        this.parent = s;
        this.ni = o ? s.ni : i.get(zn);
        this.di = o ? s.di : i.get(Mt);
        this.ep = o ? s.ep : i.get(a);
        this.m = o ? s.m : i.get(ii);
        this.Ut = o ? s.Ut : i.get(K);
        this.p = o ? s.p : i.get(Jt);
        this.localEls = o ? s.localEls : new Set;
        this.rows = null !== r && void 0 !== r ? r : [];
    }
    ki(t) {
        var i;
        var e;
        (null !== (i = (e = this.root).deps) && void 0 !== i ? i : e.deps = []).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const i = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(i.content);
        return i;
    }
    hi(t) {
        return this.c.find(he, t);
    }
    ui(t) {
        return this.c.find(Vi, t);
    }
    xi(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ai(t) {
        if (this.root !== this) return this.root.ai(t);
        const i = t.command;
        if (null === i) return null;
        let e = this.Ci[i];
        if (void 0 === e) {
            e = this.c.create(Tn, i);
            if (null === e) throw new Error(`AUR0713:${i}`);
            this.Ci[i] = e;
        }
        return e;
    }
}

function Kn(t) {
    const i = t.length;
    let e = 0;
    let s = 0;
    while (i > s) {
        e = t.charCodeAt(s);
        if (92 === e) ++s; else if (58 === e) return true; else if (36 === e && 123 === t.charCodeAt(s + 1)) return false;
        ++s;
    }
    return false;
}

function Yn() {
    Qn.node = Qn.attr = Qn.bindable = Qn.def = null;
}

const Zn = {
    projections: null
};

const Jn = {
    name: "unnamed"
};

const Qn = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const tr = Object.assign(bt(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const ir = {
    checkbox: 1,
    radio: 1
};

const er = new WeakMap;

class BindablesInfo {
    constructor(t, i, e) {
        this.attrs = t;
        this.bindables = i;
        this.primary = e;
    }
    static from(i, e) {
        let s = er.get(i);
        if (null == s) {
            const n = i.bindables;
            const r = bt();
            const o = e ? void 0 === i.defaultBindingMode ? t.default : i.defaultBindingMode : t.default;
            let l;
            let h;
            let c = false;
            let a;
            let u;
            for (h in n) {
                l = n[h];
                u = l.attribute;
                if (true === l.primary) {
                    if (c) throw new Error(`AUR0714:${i.name}`);
                    c = true;
                    a = l;
                } else if (!c && null == a) a = l;
                r[u] = BindableDefinition.create(h, i.Type, l);
            }
            if (null == l && e) a = r.value = BindableDefinition.create("value", i.Type, {
                mode: o
            });
            er.set(i, s = new BindablesInfo(r, n, a));
        }
        return s;
    }
}

var sr;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(sr || (sr = {}));

const nr = Object.freeze([ "property", "attribute", "mode" ]);

const rr = "as-custom-element";

function or(t, i) {
    const e = t.getAttribute(rr);
    if (null === e || "" === e) throw new Error(`AUR0715`);
    if (i.has(e)) throw new Error(`AUR0716:${e}`); else {
        i.add(e);
        t.removeAttribute(rr);
    }
    return e;
}

function lr(i) {
    switch (i.getAttribute("mode")) {
      case "oneTime":
        return t.oneTime;

      case "toView":
        return t.toView;

      case "fromView":
        return t.fromView;

      case "twoWay":
        return t.twoWay;

      case "default":
      default:
        return t.default;
    }
}

const hr = O.createInterface("ITemplateCompilerHooks");

const cr = new WeakMap;

const ar = mt("compiler-hooks");

const ur = Object.freeze({
    name: ar,
    define(t) {
        let i = cr.get(t);
        if (void 0 === i) {
            cr.set(t, i = new TemplateCompilerHooksDefinition(t));
            ut(ar, i, t);
            gt(t, ar);
        }
        return t;
    }
});

class TemplateCompilerHooksDefinition {
    constructor(t) {
        this.Type = t;
    }
    get name() {
        return "";
    }
    register(t) {
        t.register(U.singleton(hr, this.Type));
    }
}

const fr = t => {
    return void 0 === t ? i : i(t);
    function i(t) {
        return ur.define(t);
    }
};

const dr = he.generateName;

const vr = "default";

const mr = "au-slot";

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
        this.Ai = new Map;
    }
    bind(t, i, e) {
        this.Ai.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, i, e) {
        e.mode = this.Ai.get(e);
        this.Ai.delete(e);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.twoWay);
    }
}

g("oneTime")(OneTimeBindingBehavior);

g("toView")(ToViewBindingBehavior);

g("fromView")(FromViewBindingBehavior);

g("twoWay")(TwoWayBindingBehavior);

const gr = 200;

class DebounceBindingBehavior extends p {
    constructor(t, i) {
        super(t, i);
        this.opts = {
            delay: gr
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.locator.get(_).taskQueue;
        if (i.args.length > 0) this.firstArg = i.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, i, e) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.binding.handleChange(t, i, e);
    }
    updateSource(t, i) {
        this.queueTask((() => this.binding.updateSource(t, i)));
    }
    queueTask(t) {
        const i = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            return t();
        }), this.opts);
        null === i || void 0 === i ? void 0 : i.cancel();
    }
    $bind(t, i) {
        if (null !== this.firstArg) {
            const e = Number(this.firstArg.evaluate(t, i, this.locator, null));
            this.opts.delay = isNaN(e) ? gr : e;
        }
        this.binding.$bind(t, i);
    }
    $unbind(t) {
        var i;
        null === (i = this.task) || void 0 === i ? void 0 : i.cancel();
        this.task = null;
        this.binding.$unbind(t);
    }
}

g("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Yt = new Map;
        this.Ri = t;
    }
    bind(t, i, e, ...s) {
        if (!("handleChange" in e)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Yt.set(e, s);
        let n;
        for (n of s) this.Ri.addSignalListener(n, e);
    }
    unbind(t, i, e) {
        const s = this.Yt.get(e);
        this.Yt.delete(e);
        let n;
        for (n of s) this.Ri.removeSignalListener(n, e);
    }
}

SignalBindingBehavior.inject = [ w ];

g("signal")(SignalBindingBehavior);

const pr = 200;

class ThrottleBindingBehavior extends p {
    constructor(t, i) {
        super(t, i);
        this.opts = {
            delay: pr
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.locator.get(_);
        this.Si = this.p.taskQueue;
        if (i.args.length > 0) this.firstArg = i.args[0];
    }
    callSource(t) {
        this.Ei((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, i, e) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
            this.lastCall = this.p.performanceNow();
        }
        this.binding.handleChange(t, i, e);
    }
    updateSource(t, i) {
        this.Ei((() => this.binding.updateSource(t, i)));
    }
    Ei(t) {
        const i = this.opts;
        const e = this.p;
        const s = this.lastCall + i.delay - e.performanceNow();
        if (s > 0) {
            const n = this.task;
            i.delay = s;
            this.task = this.Si.queueTask((() => {
                this.lastCall = e.performanceNow();
                this.task = null;
                i.delay = this.delay;
                t();
            }), i);
            null === n || void 0 === n ? void 0 : n.cancel();
        } else {
            this.lastCall = e.performanceNow();
            t();
        }
    }
    $bind(t, i) {
        if (null !== this.firstArg) {
            const e = Number(this.firstArg.evaluate(t, i, this.locator, null));
            this.opts.delay = this.delay = isNaN(e) ? pr : e;
        }
        this.binding.$bind(t, i);
    }
    $unbind(t) {
        var i;
        null === (i = this.task) || void 0 === i ? void 0 : i.cancel();
        this.task = null;
        super.$unbind(t);
    }
}

g("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, i) {
        return t.getAttribute(i);
    }
    setValue(t, i, e, s) {
        if (null == t) e.removeAttribute(s); else e.setAttribute(s, t);
    }
}

const wr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, i, e) {
        e.targetObserver = wr;
    }
    unbind(t, i, e) {
        return;
    }
}

g("attr")(AttrBindingBehavior);

function br(t) {
    const i = t.composedPath()[0];
    if (this.target !== i) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, i, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = br;
    }
    unbind(t, i, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

g("self")(SelfBindingBehavior);

const xr = bt();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        var i;
        return null !== (i = xr[t]) && void 0 !== i ? i : xr[t] = new AttributeNSAccessor(t);
    }
    getValue(t, i) {
        return t.getAttributeNS(this.ns, i);
    }
    setValue(t, i, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

function yr(t, i) {
    return t === i;
}

class CheckedObserver {
    constructor(t, i, e, s) {
        this.handler = e;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Bi = void 0;
        this.Ii = void 0;
        this.f = 0;
        this.o = t;
        this.oL = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t, i) {
        const e = this.v;
        if (t === e) return;
        this.v = t;
        this.ov = e;
        this.f = i;
        this.Ti();
        this.Di();
        this.queue.add(this);
    }
    handleCollectionChange(t, i) {
        this.Di();
    }
    handleChange(t, i, e) {
        this.Di();
    }
    Di() {
        const t = this.v;
        const i = this.o;
        const e = xt.call(i, "model") ? i.model : i.value;
        const s = "radio" === i.type;
        const n = void 0 !== i.matcher ? i.matcher : yr;
        if (s) i.checked = !!n(t, e); else if (true === t) i.checked = true; else {
            let s = false;
            if (t instanceof Array) s = -1 !== t.findIndex((t => !!n(t, e))); else if (t instanceof Set) {
                for (const i of t) if (n(i, e)) {
                    s = true;
                    break;
                }
            } else if (t instanceof Map) for (const i of t) {
                const t = i[0];
                const r = i[1];
                if (n(t, e) && true === r) {
                    s = true;
                    break;
                }
            }
            i.checked = s;
        }
    }
    handleEvent() {
        let t = this.ov = this.v;
        const i = this.o;
        const e = xt.call(i, "model") ? i.model : i.value;
        const s = i.checked;
        const n = void 0 !== i.matcher ? i.matcher : yr;
        if ("checkbox" === i.type) {
            if (t instanceof Array) {
                const i = t.findIndex((t => !!n(t, e)));
                if (s && -1 === i) t.push(e); else if (!s && -1 !== i) t.splice(i, 1);
                return;
            } else if (t instanceof Set) {
                const i = {};
                let r = i;
                for (const i of t) if (true === n(i, e)) {
                    r = i;
                    break;
                }
                if (s && r === i) t.add(e); else if (!s && r !== i) t.delete(r);
                return;
            } else if (t instanceof Map) {
                let i;
                for (const s of t) {
                    const t = s[0];
                    if (true === n(t, e)) {
                        i = t;
                        break;
                    }
                }
                t.set(i, s);
                return;
            }
            t = s;
        } else if (s) t = e; else return;
        this.v = t;
        this.queue.add(this);
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Ti();
    }
    stop() {
        var t, i;
        this.handler.dispose();
        null === (t = this.Bi) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Bi = void 0;
        null === (i = this.Ii) || void 0 === i ? void 0 : i.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        kr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, kr, this.f);
    }
    Ti() {
        var t, i, e, s, n, r, o;
        const l = this.o;
        null === (n = null !== (t = this.Ii) && void 0 !== t ? t : this.Ii = null !== (e = null === (i = l.$observers) || void 0 === i ? void 0 : i.model) && void 0 !== e ? e : null === (s = l.$observers) || void 0 === s ? void 0 : s.value) || void 0 === n ? void 0 : n.subscribe(this);
        null === (r = this.Bi) || void 0 === r ? void 0 : r.unsubscribe(this);
        this.Bi = void 0;
        if ("checkbox" === l.type) null === (o = this.Bi = Or(this.v, this.oL)) || void 0 === o ? void 0 : o.subscribe(this);
    }
}

i(CheckedObserver);

e(CheckedObserver);

let kr;

const Cr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Ar(t, i) {
    return t === i;
}

class SelectValueObserver {
    constructor(t, i, e, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.$i = void 0;
        this.Pi = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = e;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Rr(this.o.options) : this.o.value;
    }
    setValue(t, i) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Oi(t instanceof Array ? t : null);
        if (0 === (64 & i)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        this.syncOptions();
    }
    syncOptions() {
        var t;
        const i = this.v;
        const e = this.o;
        const s = Array.isArray(i);
        const n = null !== (t = e.matcher) && void 0 !== t ? t : Ar;
        const r = e.options;
        let o = r.length;
        while (o-- > 0) {
            const t = r[o];
            const e = xt.call(t, "model") ? t.model : t.value;
            if (s) {
                t.selected = -1 !== i.findIndex((t => !!n(e, t)));
                continue;
            }
            t.selected = !!n(e, i);
        }
    }
    syncValue() {
        const t = this.o;
        const i = t.options;
        const e = i.length;
        const s = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(s instanceof Array)) return true;
            let r;
            const o = t.matcher || Ar;
            const l = [];
            while (n < e) {
                r = i[n];
                if (r.selected) l.push(xt.call(r, "model") ? r.model : r.value);
                ++n;
            }
            let h;
            n = 0;
            while (n < s.length) {
                h = s[n];
                if (-1 === l.findIndex((t => !!o(h, t)))) s.splice(n, 1); else ++n;
            }
            n = 0;
            while (n < l.length) {
                h = l[n];
                if (-1 === s.findIndex((t => !!o(h, t)))) s.push(h);
                ++n;
            }
            return false;
        }
        let r = null;
        let o;
        while (n < e) {
            o = i[n];
            if (o.selected) {
                r = xt.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Li() {
        (this.Pi = new this.o.ownerDocument.defaultView.MutationObserver(this.qi.bind(this))).observe(this.o, Cr);
        this.Oi(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ui() {
        var t;
        this.Pi.disconnect();
        null === (t = this.$i) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Pi = this.$i = void 0;
        this.iO = false;
    }
    Oi(t) {
        var i;
        null === (i = this.$i) || void 0 === i ? void 0 : i.unsubscribe(this);
        this.$i = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.$i = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    qi(t) {
        this.syncOptions();
        const i = this.syncValue();
        if (i) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Li();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Ui();
        }
    }
    flush() {
        Sr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Sr, 0);
    }
}

i(SelectValueObserver);

e(SelectValueObserver);

function Rr(t) {
    const i = [];
    if (0 === t.length) return i;
    const e = t.length;
    let s = 0;
    let n;
    while (e > s) {
        n = t[s];
        if (n.selected) i[i.length] = xt.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return i;
}

let Sr;

const Er = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.H = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t, i) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (64 & i)) this.K();
    }
    _i(t) {
        const i = [];
        const e = /url\([^)]+$/;
        let s = 0;
        let n = "";
        let r;
        let o;
        let l;
        let h;
        while (s < t.length) {
            r = t.indexOf(";", s);
            if (-1 === r) r = t.length;
            n += t.substring(s, r);
            s = r + 1;
            if (e.test(n)) {
                n += ";";
                continue;
            }
            o = n.indexOf(":");
            l = n.substring(0, o).trim();
            h = n.substring(o + 1).trim();
            i.push([ l, h ]);
            n = "";
        }
        return i;
    }
    Fi(t) {
        let i;
        let e;
        const s = [];
        for (e in t) {
            i = t[e];
            if (null == i) continue;
            if (Rt(i)) {
                if (e.startsWith(Er)) {
                    s.push([ e, i ]);
                    continue;
                }
                s.push([ $(e), i ]);
                continue;
            }
            s.push(...this.Vi(i));
        }
        return s;
    }
    Mi(t) {
        const i = t.length;
        if (i > 0) {
            const e = [];
            let s = 0;
            for (;i > s; ++s) e.push(...this.Vi(t[s]));
            return e;
        }
        return L;
    }
    Vi(t) {
        if (Rt(t)) return this._i(t);
        if (t instanceof Array) return this.Mi(t);
        if (t instanceof Object) return this.Fi(t);
        return L;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const i = this.styles;
            const e = this.Vi(t);
            let s;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const c = e.length;
            for (;h < c; ++h) {
                r = e[h];
                o = r[0];
                l = r[1];
                this.setProperty(o, l);
                i[o] = n;
            }
            this.styles = i;
            this.version += 1;
            if (0 === n) return;
            n -= 1;
            for (s in i) {
                if (!xt.call(i, s) || i[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, i) {
        let e = "";
        if (null != i && At(i.indexOf) && i.includes("!important")) {
            e = "important";
            i = i.replace("!important", "");
        }
        this.obj.style.setProperty(t, i, e);
    }
    bind(t) {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, i, e) {
        this.handler = e;
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.H = false;
        this.o = t;
        this.k = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t, i) {
        if (Object.is(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.H = true;
        if (!this.handler.config.readonly && 0 === (64 & i)) this.K(i);
    }
    K(t) {
        var i;
        if (this.H) {
            this.H = false;
            this.o[this.k] = null !== (i = this.v) && void 0 !== i ? i : this.handler.config.default;
            if (0 === (2 & t)) this.queue.add(this);
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.o[this.k];
        if (this.ov !== this.v) {
            this.H = false;
            this.queue.add(this);
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.v = this.ov = this.o[this.k];
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.handler.dispose();
    }
    flush() {
        Br = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Br, 0);
    }
}

i(ValueAttributeObserver);

e(ValueAttributeObserver);

let Br;

const Ir = "http://www.w3.org/1999/xlink";

const Tr = "http://www.w3.org/XML/1998/namespace";

const Dr = "http://www.w3.org/2000/xmlns/";

const $r = Object.assign(bt(), {
    "xlink:actuate": [ "actuate", Ir ],
    "xlink:arcrole": [ "arcrole", Ir ],
    "xlink:href": [ "href", Ir ],
    "xlink:role": [ "role", Ir ],
    "xlink:show": [ "show", Ir ],
    "xlink:title": [ "title", Ir ],
    "xlink:type": [ "type", Ir ],
    "xml:lang": [ "lang", Tr ],
    "xml:space": [ "space", Tr ],
    xmlns: [ "xmlns", Dr ],
    "xmlns:xlink": [ "xlink", Dr ]
});

const Pr = new b;

Pr.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        var i;
        this.type = null !== (i = t.type) && void 0 !== i ? i : ValueAttributeObserver;
        this.events = t.events;
        this.readonly = t.readonly;
        this.default = t.default;
    }
}

class NodeObserverLocator {
    constructor(t, i, e, s) {
        this.locator = t;
        this.platform = i;
        this.dirtyChecker = e;
        this.svgAnalyzer = s;
        this.allowDirtyCheck = true;
        this.ji = bt();
        this.Ni = bt();
        this.Wi = bt();
        this.Hi = bt();
        const n = [ "change", "input" ];
        const r = {
            events: n,
            default: ""
        };
        this.useConfig({
            INPUT: {
                value: r,
                valueAsNumber: {
                    events: n,
                    default: 0
                },
                checked: {
                    type: CheckedObserver,
                    events: n
                },
                files: {
                    events: n,
                    readonly: true
                }
            },
            SELECT: {
                value: {
                    type: SelectValueObserver,
                    events: [ "change" ],
                    default: ""
                }
            },
            TEXTAREA: {
                value: r
            }
        });
        const o = {
            events: [ "change", "input", "blur", "keyup", "paste" ],
            default: ""
        };
        const l = {
            events: [ "scroll" ],
            default: 0
        };
        this.useConfigGlobal({
            scrollTop: l,
            scrollLeft: l,
            textContent: o,
            innerHTML: o
        });
        this.overrideAccessorGlobal("css", "style", "class");
        this.overrideAccessor({
            INPUT: [ "value", "checked", "model" ],
            SELECT: [ "value" ],
            TEXTAREA: [ "value" ]
        });
    }
    static register(t) {
        U.aliasTo(x, NodeObserverLocator).register(t);
        U.singleton(x, NodeObserverLocator).register(t);
    }
    handles(t, i) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, i, e) {
        var s, n;
        const r = this.ji;
        let o;
        if (Rt(t)) {
            o = null !== (s = r[t]) && void 0 !== s ? s : r[t] = bt();
            if (null == o[i]) o[i] = new NodeObserverConfig(e); else Lr(t, i);
        } else for (const e in t) {
            o = null !== (n = r[e]) && void 0 !== n ? n : r[e] = bt();
            const s = t[e];
            for (i in s) if (null == o[i]) o[i] = new NodeObserverConfig(s[i]); else Lr(e, i);
        }
    }
    useConfigGlobal(t, i) {
        const e = this.Ni;
        if ("object" === typeof t) for (const i in t) if (null == e[i]) e[i] = new NodeObserverConfig(t[i]); else Lr("*", i); else if (null == e[t]) e[t] = new NodeObserverConfig(i); else Lr("*", t);
    }
    getAccessor(t, i, e) {
        var s;
        if (i in this.Hi || i in (null !== (s = this.Wi[t.tagName]) && void 0 !== s ? s : Q)) return this.getObserver(t, i, e);
        switch (i) {
          case "src":
          case "href":
          case "role":
            return wr;

          default:
            {
                const e = $r[i];
                if (void 0 !== e) return AttributeNSAccessor.forNs(e[1]);
                if (kt(t, i, this.svgAnalyzer)) return wr;
                return Pr;
            }
        }
    }
    overrideAccessor(t, i) {
        var e, s;
        var n, r;
        let o;
        if (Rt(t)) {
            o = null !== (e = (n = this.Wi)[t]) && void 0 !== e ? e : n[t] = bt();
            o[i] = true;
        } else for (const i in t) for (const e of t[i]) {
            o = null !== (s = (r = this.Wi)[i]) && void 0 !== s ? s : r[i] = bt();
            o[e] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const i of t) this.Hi[i] = true;
    }
    getObserver(t, i, e) {
        var s, n;
        switch (i) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const r = null !== (n = null === (s = this.ji[t.tagName]) || void 0 === s ? void 0 : s[i]) && void 0 !== n ? n : this.Ni[i];
        if (null != r) return new r.type(t, i, new EventSubscriber(r), e, this.locator);
        const o = $r[i];
        if (void 0 !== o) return AttributeNSAccessor.forNs(o[1]);
        if (kt(t, i, this.svgAnalyzer)) return wr;
        if (i in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, i);
            throw new Error(`AUR0652:${String(i)}`);
        } else return new y(t, i);
    }
}

NodeObserverLocator.inject = [ tt, Jt, k, Qt ];

function Or(t, i) {
    if (t instanceof Array) return i.getArrayObserver(t);
    if (t instanceof Map) return i.getMapObserver(t);
    if (t instanceof Set) return i.getSetObserver(t);
}

function Lr(t, i) {
    throw new Error(`AUR0653:${String(i)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(i, e, s, ...n) {
        if (0 === n.length) throw new Error(`AUR0802`);
        if (s.mode !== t.twoWay && s.mode !== t.fromView) throw new Error(`AUR0803`);
        const r = this.oL.getObserver(s.target, s.targetProperty);
        if (!r.handler) throw new Error(`AUR0804`);
        s.targetObserver = r;
        const o = r.handler;
        r.originalHandler = o;
        r.handler = new EventSubscriber(new NodeObserverConfig({
            default: o.config.default,
            events: n,
            readonly: o.config.readonly
        }));
    }
    unbind(t, i, e) {
        e.targetObserver.handler.dispose();
        e.targetObserver.handler = e.targetObserver.originalHandler;
        e.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ c ];

g("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, i) {
        this.zi = t;
        this.p = i;
        this.Gi = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.Xi(); else this.Gi = true;
    }
    attached() {
        if (this.Gi) {
            this.Gi = false;
            this.Xi();
        }
        this.zi.addEventListener("focus", this);
        this.zi.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.zi;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Ki) this.value = false;
    }
    Xi() {
        const t = this.zi;
        const i = this.Ki;
        const e = this.value;
        if (e && !i) t.focus(); else if (!e && i) t.blur();
    }
    get Ki() {
        return this.zi === this.p.document.activeElement;
    }
}

Focus.inject = [ bs, Jt ];

lt([ Bt({
    mode: t.twoWay
}) ], Focus.prototype, "value", void 0);

Li("focus")(Focus);

let qr = class Show {
    constructor(t, i, e) {
        this.el = t;
        this.p = i;
        this.Yi = false;
        this.Zi = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Zi = null;
            if (Boolean(this.value) !== this.Ji) if (this.Ji === this.Qi) {
                this.Ji = !this.Qi;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Ji = this.Qi;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Ji = this.Qi = "hide" !== e.alias;
    }
    binding() {
        this.Yi = true;
        this.update();
    }
    detaching() {
        var t;
        this.Yi = false;
        null === (t = this.Zi) || void 0 === t ? void 0 : t.cancel();
        this.Zi = null;
    }
    valueChanged() {
        if (this.Yi && null === this.Zi) this.Zi = this.p.domWriteQueue.queueTask(this.update);
    }
};

lt([ Bt ], qr.prototype, "value", void 0);

qr = lt([ ht(0, bs), ht(1, Jt), ht(2, Us) ], qr);

C("hide")(qr);

Li("show")(qr);

class Portal {
    constructor(t, i, e) {
        this.id = H("au$component");
        this.strict = false;
        this.p = e;
        this.te = e.document.createElement("div");
        this.view = t.create();
        Rs(this.view.nodes, i);
    }
    attaching(t, i, e) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.te = this.ie();
        this.view.setHost(s);
        return this.ee(t, s, e);
    }
    detaching(t, i, e) {
        return this.se(t, this.te, e);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const i = this.te;
        const e = this.te = this.ie();
        if (i === e) return;
        this.view.setHost(e);
        const s = Y(this.se(null, e, t.flags), (() => this.ee(null, e, t.flags)));
        if (Ct(s)) s.catch((t => {
            throw t;
        }));
    }
    ee(t, i, e) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(i);
        return Y(null === s || void 0 === s ? void 0 : s.call(n, i, r), (() => this.ne(t, i, e)));
    }
    ne(t, i, e) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(i); else return Y(n.activate(null !== t && void 0 !== t ? t : n, s, e, s.scope), (() => this.re(i)));
        return this.re(i);
    }
    re(t) {
        const {activated: i, callbackContext: e, view: s} = this;
        return null === i || void 0 === i ? void 0 : i.call(e, t, s);
    }
    se(t, i, e) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return Y(null === s || void 0 === s ? void 0 : s.call(n, i, r), (() => this.oe(t, i, e)));
    }
    oe(t, i, e) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return Y(n.deactivate(t, s, e), (() => this.le(i)));
        return this.le(i);
    }
    le(t) {
        const {deactivated: i, callbackContext: e, view: s} = this;
        return null === i || void 0 === i ? void 0 : i.call(e, t, s);
    }
    ie() {
        const t = this.p;
        const i = t.document;
        let e = this.target;
        let s = this.renderContext;
        if ("" === e) {
            if (this.strict) throw new Error(`AUR0811`);
            return i.body;
        }
        if (Rt(e)) {
            let n = i;
            if (Rt(s)) s = i.querySelector(s);
            if (s instanceof t.Node) n = s;
            e = n.querySelector(e);
        }
        if (e instanceof t.Node) return e;
        if (null == e) {
            if (this.strict) throw new Error(`AUR0812`);
            return i.body;
        }
        return e;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
        this.callbackContext = null;
    }
    accept(t) {
        var i;
        if (true === (null === (i = this.view) || void 0 === i ? void 0 : i.accept(t))) return true;
    }
}

Portal.inject = [ Te, ys, Jt ];

lt([ Bt({
    primary: true
}) ], Portal.prototype, "target", void 0);

lt([ Bt({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

lt([ Bt() ], Portal.prototype, "strict", void 0);

lt([ Bt() ], Portal.prototype, "deactivating", void 0);

lt([ Bt() ], Portal.prototype, "activating", void 0);

lt([ Bt() ], Portal.prototype, "deactivated", void 0);

lt([ Bt() ], Portal.prototype, "activated", void 0);

lt([ Bt() ], Portal.prototype, "callbackContext", void 0);

qi("portal")(Portal);

class FlagsTemplateController {
    constructor(t, i, e) {
        this.fs = e;
        this.id = H("au$component");
        this.view = t.create().setLocation(i);
    }
    attaching(t, i, e) {
        const {$controller: s} = this;
        return this.view.activate(t, s, e | this.fs, s.scope);
    }
    detaching(t, i, e) {
        return this.view.deactivate(t, this.$controller, e);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var i;
        if (true === (null === (i = this.view) || void 0 === i ? void 0 : i.accept(t))) return true;
    }
}

class ObserveShallow extends FlagsTemplateController {
    constructor(t, i) {
        super(t, i, 32);
    }
}

ObserveShallow.inject = [ Te, ys ];

qi("observe-shallow")(ObserveShallow);

class If {
    constructor(t, i, e) {
        this.ifFactory = t;
        this.location = i;
        this.work = e;
        this.id = H("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.he = false;
        this.ce = 0;
    }
    attaching(t, i, e) {
        let s;
        const n = this.$controller;
        const r = this.ce++;
        const o = () => !this.he && this.ce === r + 1;
        return Y(this.pending, (() => {
            var i;
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (i = this.elseFactory) || void 0 === i ? void 0 : i.create();
            if (null == s) return;
            s.setLocation(this.location);
            this.pending = Y(s.activate(t, n, e, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, i, e) {
        this.he = true;
        return Y(this.pending, (() => {
            var i;
            this.he = false;
            this.pending = void 0;
            void (null === (i = this.view) || void 0 === i ? void 0 : i.deactivate(t, this.$controller, e));
        }));
    }
    valueChanged(t, i, e) {
        if (!this.$controller.isActive) return;
        t = !!t;
        i = !!i;
        if (t === i) return;
        this.work.start();
        const s = this.view;
        const n = this.$controller;
        const r = this.ce++;
        const o = () => !this.he && this.ce === r + 1;
        let l;
        return Y(Y(this.pending, (() => this.pending = Y(null === s || void 0 === s ? void 0 : s.deactivate(s, n, e), (() => {
            var i;
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (i = this.elseFactory) || void 0 === i ? void 0 : i.create();
            if (null == l) return;
            l.setLocation(this.location);
            return Y(l.activate(l, n, e, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        })))), (() => this.work.finish()));
    }
    dispose() {
        var t, i;
        null === (t = this.ifView) || void 0 === t ? void 0 : t.dispose();
        null === (i = this.elseView) || void 0 === i ? void 0 : i.dispose();
        this.ifView = this.elseView = this.view = void 0;
    }
    accept(t) {
        var i;
        if (true === (null === (i = this.view) || void 0 === i ? void 0 : i.accept(t))) return true;
    }
}

If.inject = [ Te, ys, gs ];

lt([ Bt ], If.prototype, "value", void 0);

lt([ Bt({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

qi("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = H("au$component");
    }
    link(t, i, e, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ Te ];

qi({
    name: "else"
})(Else);

function Ur(t) {
    t.dispose();
}

const _r = [ 38962, 36913 ];

class Repeat {
    constructor(t, i, e) {
        this.l = t;
        this.ae = i;
        this.f = e;
        this.id = H("au$component");
        this.views = [];
        this.key = void 0;
        this.ue = void 0;
        this.fe = false;
        this.de = false;
        this.ve = null;
        this.me = void 0;
        this.ge = false;
    }
    binding(t, i, e) {
        const s = this.ae.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.sourceExpression;
                this.pe = r;
                let t = o.iterable;
                while (null != t && _r.includes(t.$kind)) {
                    t = t.expression;
                    this.fe = true;
                }
                this.ve = t;
                break;
            }
        }
        this.we(e);
        const h = o.declaration;
        if (!(this.ge = 90137 === h.$kind || 106521 === h.$kind)) this.local = h.evaluate(e, this.$controller.scope, r.locator, null);
    }
    attaching(t, i, e) {
        this.be(e);
        return this.xe(t, e);
    }
    detaching(t, i, e) {
        this.we(e);
        return this.ye(t, e);
    }
    itemsChanged(t) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        t |= i.flags;
        this.we(t);
        this.be(t);
        const e = Y(this.ye(null, t), (() => this.xe(null, t)));
        if (Ct(e)) e.catch(Et);
    }
    handleCollectionChange(t, i) {
        const {$controller: e} = this;
        if (!e.isActive) return;
        if (this.fe) {
            if (this.de) return;
            this.de = true;
            this.items = this.forOf.iterable.evaluate(i, e.scope, this.pe.locator, null);
            this.de = false;
            return;
        }
        i |= e.flags;
        this.be(i);
        if (void 0 === t) {
            const t = Y(this.ye(null, i), (() => this.xe(null, i)));
            if (Ct(t)) t.catch(Et);
        } else {
            const e = this.views.length;
            const s = A(t);
            if (s.deletedItems.length > 0) {
                s.deletedItems.sort(it);
                const t = Y(this.ke(s, i), (() => this.Ce(e, s, i)));
                if (Ct(t)) t.catch(Et);
            } else this.Ce(e, s, i);
        }
    }
    we(t) {
        var i;
        const e = this.$controller.scope;
        let s = this.Ae;
        let n = this.fe;
        let r;
        if (n) {
            s = this.Ae = null !== (i = this.ve.evaluate(t, e, this.pe.locator, null)) && void 0 !== i ? i : null;
            n = this.fe = !Object.is(this.items, s);
        }
        const o = this.ue;
        if (this.$controller.isActive) {
            r = this.ue = R(n ? s : this.items);
            if (o !== r) {
                null === o || void 0 === o ? void 0 : o.unsubscribe(this);
                null === r || void 0 === r ? void 0 : r.subscribe(this);
            }
        } else {
            null === o || void 0 === o ? void 0 : o.unsubscribe(this);
            this.ue = void 0;
        }
    }
    be(t) {
        const i = this.items;
        if (i instanceof Array) {
            this.me = i;
            return;
        }
        const e = this.forOf;
        if (void 0 === e) return;
        const s = [];
        this.forOf.iterate(t, i, ((t, i, e) => {
            s[i] = e;
        }));
        this.me = s;
    }
    xe(t, i) {
        let e;
        let s;
        let n;
        let r;
        const {$controller: o, f: h, local: c, l: a, items: u} = this;
        const f = o.scope;
        const d = this.forOf;
        const v = d.count(i, u);
        const m = this.views = Array(v);
        d.iterate(i, u, ((u, g, p) => {
            n = m[g] = h.create().setLocation(a);
            n.nodes.unlink();
            if (this.ge) d.declaration.assign(i, r = l.fromParent(f, S.create()), this.pe.locator, p); else r = l.fromParent(f, S.create(c, p));
            Nr(r.overrideContext, g, v);
            s = n.activate(null !== t && void 0 !== t ? t : n, o, i, r);
            if (Ct(s)) (null !== e && void 0 !== e ? e : e = []).push(s);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    ye(t, i) {
        let e;
        let s;
        let n;
        let r = 0;
        const {views: o, $controller: l} = this;
        const h = o.length;
        for (;h > r; ++r) {
            n = o[r];
            n.release();
            s = n.deactivate(null !== t && void 0 !== t ? t : n, l, i);
            if (Ct(s)) (null !== e && void 0 !== e ? e : e = []).push(s);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    ke(t, i) {
        let e;
        let s;
        let n;
        const {$controller: r, views: o} = this;
        const l = t.deletedItems;
        const h = l.length;
        let c = 0;
        for (;h > c; ++c) {
            n = o[l[c]];
            n.release();
            s = n.deactivate(n, r, i);
            if (Ct(s)) (null !== e && void 0 !== e ? e : e = []).push(s);
        }
        c = 0;
        let a = 0;
        for (;h > c; ++c) {
            a = l[c] - c;
            o.splice(a, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ce(t, i, e) {
        var s;
        let n;
        let r;
        let o;
        let h;
        let c = 0;
        const {$controller: a, f: u, local: f, me: d, l: v, views: m} = this;
        const g = i.length;
        for (;g > c; ++c) if (-2 === i[c]) {
            o = u.create();
            m.splice(c, 0, o);
        }
        if (m.length !== g) throw new Error(`AUR0814:${m.length}!=${g}`);
        const p = a.scope;
        const w = i.length;
        E(m, i);
        const b = jr(i);
        const x = b.length;
        let y;
        let k = x - 1;
        c = w - 1;
        for (;c >= 0; --c) {
            o = m[c];
            y = m[c + 1];
            o.nodes.link(null !== (s = null === y || void 0 === y ? void 0 : y.nodes) && void 0 !== s ? s : v);
            if (-2 === i[c]) {
                if (this.ge) this.forOf.declaration.assign(e, h = l.fromParent(p, S.create()), this.pe.locator, d[c]); else h = l.fromParent(p, S.create(f, d[c]));
                Nr(h.overrideContext, c, w);
                o.setLocation(v);
                r = o.activate(o, a, e, h);
                if (Ct(r)) (null !== n && void 0 !== n ? n : n = []).push(r);
            } else if (k < 0 || 1 === x || c !== b[k]) {
                Nr(o.scope.overrideContext, c, w);
                o.nodes.insertBefore(o.location);
            } else {
                if (t !== w) Nr(o.scope.overrideContext, c, w);
                --k;
            }
        }
        if (void 0 !== n) return 1 === n.length ? n[0] : Promise.all(n);
    }
    dispose() {
        this.views.forEach(Ur);
        this.views = void 0;
    }
    accept(t) {
        const {views: i} = this;
        if (void 0 !== i) for (let e = 0, s = i.length; e < s; ++e) if (true === i[e].accept(t)) return true;
    }
}

Repeat.inject = [ ys, ts, Te ];

lt([ Bt ], Repeat.prototype, "items", void 0);

qi("repeat")(Repeat);

let Fr = 16;

let Vr = new Int32Array(Fr);

let Mr = new Int32Array(Fr);

function jr(t) {
    const i = t.length;
    if (i > Fr) {
        Fr = i;
        Vr = new Int32Array(i);
        Mr = new Int32Array(i);
    }
    let e = 0;
    let s = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let c = 0;
    for (;r < i; r++) {
        s = t[r];
        if (-2 !== s) {
            o = Vr[e];
            n = t[o];
            if (-2 !== n && n < s) {
                Mr[r] = o;
                Vr[++e] = r;
                continue;
            }
            l = 0;
            h = e;
            while (l < h) {
                c = l + h >> 1;
                n = t[Vr[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[Vr[l]];
            if (s < n || -2 === n) {
                if (l > 0) Mr[r] = Vr[l - 1];
                Vr[l] = r;
            }
        }
    }
    r = ++e;
    const a = new Int32Array(r);
    s = Vr[e - 1];
    while (e-- > 0) {
        a[e] = s;
        s = Mr[s];
    }
    while (r-- > 0) Vr[r] = 0;
    return a;
}

function Nr(t, i, e) {
    const s = 0 === i;
    const n = i === e - 1;
    const r = i % 2 === 0;
    t.$index = i;
    t.$first = s;
    t.$last = n;
    t.$middle = !s && !n;
    t.$even = r;
    t.$odd = !r;
    t.$length = e;
}

class With {
    constructor(t, i) {
        this.id = H("au$component");
        this.id = H("au$component");
        this.view = t.create().setLocation(i);
    }
    valueChanged(t, i, e) {
        const s = this.$controller;
        const n = this.view.bindings;
        let r;
        let o = 0, h = 0;
        if (s.isActive && null != n) {
            r = l.fromParent(s.scope, void 0 === t ? {} : t);
            for (h = n.length; h > o; ++o) n[o].$bind(2, r);
        }
    }
    attaching(t, i, e) {
        const {$controller: s, value: n} = this;
        const r = l.fromParent(s.scope, void 0 === n ? {} : n);
        return this.view.activate(t, s, e, r);
    }
    detaching(t, i, e) {
        return this.view.deactivate(t, this.$controller, e);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var i;
        if (true === (null === (i = this.view) || void 0 === i ? void 0 : i.accept(t))) return true;
    }
}

With.inject = [ Te, ys ];

lt([ Bt ], With.prototype, "value", void 0);

qi("with")(With);

let Wr = class Switch {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = H("au$component");
        this.cases = [];
        this.activeCases = [];
        this.promise = void 0;
    }
    link(t, i, e, s) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, i, e) {
        const s = this.view;
        const n = this.$controller;
        this.queue((() => s.activate(t, n, e, n.scope)));
        this.queue((() => this.swap(t, e, this.value)));
        return this.promise;
    }
    detaching(t, i, e) {
        this.queue((() => {
            const i = this.view;
            return i.deactivate(t, this.$controller, e);
        }));
        return this.promise;
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    valueChanged(t, i, e) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, e, this.value)));
    }
    caseChanged(t, i) {
        this.queue((() => this.Re(t, i)));
    }
    Re(t, i) {
        const e = t.isMatch(this.value, i);
        const s = this.activeCases;
        const n = s.length;
        if (!e) {
            if (n > 0 && s[0].id === t.id) return this.Se(null, i);
            return;
        }
        if (n > 0 && s[0].id < t.id) return;
        const r = [];
        let o = t.fallThrough;
        if (!o) r.push(t); else {
            const i = this.cases;
            const e = i.indexOf(t);
            for (let t = e, s = i.length; t < s && o; t++) {
                const e = i[t];
                r.push(e);
                o = e.fallThrough;
            }
        }
        return Y(this.Se(null, i, r), (() => {
            this.activeCases = r;
            return this.Ee(null, i);
        }));
    }
    swap(t, i, e) {
        const s = [];
        let n = false;
        for (const t of this.cases) {
            if (n || t.isMatch(e, i)) {
                s.push(t);
                n = t.fallThrough;
            }
            if (s.length > 0 && !n) break;
        }
        const r = this.defaultCase;
        if (0 === s.length && void 0 !== r) s.push(r);
        return Y(this.activeCases.length > 0 ? this.Se(t, i, s) : void 0, (() => {
            this.activeCases = s;
            if (0 === s.length) return;
            return this.Ee(t, i);
        }));
    }
    Ee(t, i) {
        const e = this.$controller;
        if (!e.isActive) return;
        const s = this.activeCases;
        const n = s.length;
        if (0 === n) return;
        const r = e.scope;
        if (1 === n) return s[0].activate(t, i, r);
        return X(...s.map((e => e.activate(t, i, r))));
    }
    Se(t, i, e = []) {
        const s = this.activeCases;
        const n = s.length;
        if (0 === n) return;
        if (1 === n) {
            const n = s[0];
            if (!e.includes(n)) {
                s.length = 0;
                return n.deactivate(t, i);
            }
            return;
        }
        return Y(X(...s.reduce(((s, n) => {
            if (!e.includes(n)) s.push(n.deactivate(t, i));
            return s;
        }), [])), (() => {
            s.length = 0;
        }));
    }
    queue(t) {
        const i = this.promise;
        let e;
        e = this.promise = Y(Y(i, t), (() => {
            if (this.promise === e) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((i => i.accept(t)))) return true;
    }
};

lt([ Bt ], Wr.prototype, "value", void 0);

Wr = lt([ qi("switch"), ht(0, Te), ht(1, ys) ], Wr);

let Hr = class Case {
    constructor(t, i, e, s) {
        this.f = t;
        this.Be = i;
        this.l = e;
        this.id = H("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Ie = s.config.level <= 1;
        this.Ut = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, i, e, s) {
        const n = t.parent;
        const r = null === n || void 0 === n ? void 0 : n.viewModel;
        if (r instanceof Wr) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, i, e) {
        return this.deactivate(t, e);
    }
    isMatch(t, i) {
        this.Ut.debug("isMatch()");
        const e = this.value;
        if (Array.isArray(e)) {
            if (void 0 === this.ue) this.ue = this.Te(i, e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, i, e) {
        var s;
        if (Array.isArray(t)) {
            null === (s = this.ue) || void 0 === s ? void 0 : s.unsubscribe(this);
            this.ue = this.Te(e, t);
        } else if (void 0 !== this.ue) this.ue.unsubscribe(this);
        this.$switch.caseChanged(this, e);
    }
    handleCollectionChange(t, i) {
        this.$switch.caseChanged(this, i);
    }
    activate(t, i, e) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(null !== t && void 0 !== t ? t : s, this.$controller, i, e);
    }
    deactivate(t, i) {
        const e = this.view;
        if (void 0 === e || !e.isActive) return;
        return e.deactivate(null !== t && void 0 !== t ? t : e, this.$controller, i);
    }
    dispose() {
        var t, i;
        null === (t = this.ue) || void 0 === t ? void 0 : t.unsubscribe(this);
        null === (i = this.view) || void 0 === i ? void 0 : i.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Te(t, i) {
        const e = this.Be.getArrayObserver(i);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        var i;
        if (true === this.$controller.accept(t)) return true;
        return null === (i = this.view) || void 0 === i ? void 0 : i.accept(t);
    }
};

Hr.inject = [ Te, c, ys, K ];

lt([ Bt ], Hr.prototype, "value", void 0);

lt([ Bt({
    set: t => {
        switch (t) {
          case "true":
            return true;

          case "false":
            return false;

          default:
            return !!t;
        }
    },
    mode: t.oneTime
}) ], Hr.prototype, "fallThrough", void 0);

Hr = lt([ qi("case") ], Hr);

let zr = class DefaultCase extends Hr {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

zr = lt([ qi("default-case") ], zr);

let Gr = class PromiseTemplateController {
    constructor(t, i, e, s) {
        this.f = t;
        this.l = i;
        this.p = e;
        this.id = H("au$component");
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = s.scopeTo("promise.resolve");
    }
    link(t, i, e, s) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, i, e) {
        const s = this.view;
        const n = this.$controller;
        return Y(s.activate(t, n, e, this.viewScope = l.fromParent(n.scope, {})), (() => this.swap(t, e)));
    }
    valueChanged(t, i, e) {
        if (!this.$controller.isActive) return;
        this.swap(null, e);
    }
    swap(t, i) {
        var e, s;
        const n = this.value;
        if (!Ct(n)) {
            this.logger.warn(`The value '${String(n)}' is not a promise. No change will be done.`);
            return;
        }
        const r = this.p.domWriteQueue;
        const o = this.fulfilled;
        const l = this.rejected;
        const h = this.pending;
        const c = this.viewScope;
        let a;
        const u = {
            reusable: false
        };
        const f = () => {
            void X(a = (this.preSettledTask = r.queueTask((() => X(null === o || void 0 === o ? void 0 : o.deactivate(t, i), null === l || void 0 === l ? void 0 : l.deactivate(t, i), null === h || void 0 === h ? void 0 : h.activate(t, i, c))), u)).result.catch((t => {
                if (!(t instanceof rt)) throw t;
            })), n.then((e => {
                if (this.value !== n) return;
                const s = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => X(null === h || void 0 === h ? void 0 : h.deactivate(t, i), null === l || void 0 === l ? void 0 : l.deactivate(t, i), null === o || void 0 === o ? void 0 : o.activate(t, i, c, e))), u)).result;
                };
                if (1 === this.preSettledTask.status) void a.then(s); else {
                    this.preSettledTask.cancel();
                    s();
                }
            }), (e => {
                if (this.value !== n) return;
                const s = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => X(null === h || void 0 === h ? void 0 : h.deactivate(t, i), null === o || void 0 === o ? void 0 : o.deactivate(t, i), null === l || void 0 === l ? void 0 : l.activate(t, i, c, e))), u)).result;
                };
                if (1 === this.preSettledTask.status) void a.then(s); else {
                    this.preSettledTask.cancel();
                    s();
                }
            })));
        };
        if (1 === (null === (e = this.postSettledTask) || void 0 === e ? void 0 : e.status)) void this.postSettlePromise.then(f); else {
            null === (s = this.postSettledTask) || void 0 === s ? void 0 : s.cancel();
            f();
        }
    }
    detaching(t, i, e) {
        var s, n;
        null === (s = this.preSettledTask) || void 0 === s ? void 0 : s.cancel();
        null === (n = this.postSettledTask) || void 0 === n ? void 0 : n.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, e);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt ], Gr.prototype, "value", void 0);

Gr = lt([ qi("promise"), ht(0, Te), ht(1, ys), ht(2, Jt), ht(3, K) ], Gr);

let Xr = class PendingTemplateController {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, i, e, s) {
        Zr(t).pending = this;
    }
    activate(t, i, e) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(s, this.$controller, i, e);
    }
    deactivate(t, i) {
        const e = this.view;
        if (void 0 === e || !e.isActive) return;
        return e.deactivate(e, this.$controller, i);
    }
    detaching(t, i, e) {
        return this.deactivate(t, e);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt({
    mode: t.toView
}) ], Xr.prototype, "value", void 0);

Xr = lt([ qi("pending"), ht(0, Te), ht(1, ys) ], Xr);

let Kr = class FulfilledTemplateController {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, i, e, s) {
        Zr(t).fulfilled = this;
    }
    activate(t, i, e, s) {
        this.value = s;
        let n = this.view;
        if (void 0 === n) n = this.view = this.f.create().setLocation(this.l);
        if (n.isActive) return;
        return n.activate(n, this.$controller, i, e);
    }
    deactivate(t, i) {
        const e = this.view;
        if (void 0 === e || !e.isActive) return;
        return e.deactivate(e, this.$controller, i);
    }
    detaching(t, i, e) {
        return this.deactivate(t, e);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt({
    mode: t.fromView
}) ], Kr.prototype, "value", void 0);

Kr = lt([ qi("then"), ht(0, Te), ht(1, ys) ], Kr);

let Yr = class RejectedTemplateController {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, i, e, s) {
        Zr(t).rejected = this;
    }
    activate(t, i, e, s) {
        this.value = s;
        let n = this.view;
        if (void 0 === n) n = this.view = this.f.create().setLocation(this.l);
        if (n.isActive) return;
        return n.activate(n, this.$controller, i, e);
    }
    deactivate(t, i) {
        const e = this.view;
        if (void 0 === e || !e.isActive) return;
        return e.deactivate(e, this.$controller, i);
    }
    detaching(t, i, e) {
        return this.deactivate(t, e);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt({
    mode: t.fromView
}) ], Yr.prototype, "value", void 0);

Yr = lt([ qi("catch"), ht(0, Te), ht(1, ys) ], Yr);

function Zr(t) {
    const i = t.parent;
    const e = null === i || void 0 === i ? void 0 : i.viewModel;
    if (e instanceof Gr) return e;
    throw new Error(`AUR0813`);
}

let Jr = class PromiseAttributePattern {
    "promise.resolve"(t, i, e) {
        return new AttrSyntax(t, i, "promise", "bind");
    }
};

Jr = lt([ jt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Jr);

let Qr = class FulfilledAttributePattern {
    then(t, i, e) {
        return new AttrSyntax(t, i, "then", "from-view");
    }
};

Qr = lt([ jt({
    pattern: "then",
    symbols: ""
}) ], Qr);

let to = class RejectedAttributePattern {
    catch(t, i, e) {
        return new AttrSyntax(t, i, "catch", "from-view");
    }
};

to = lt([ jt({
    pattern: "catch",
    symbols: ""
}) ], to);

function io(t, i, e, s) {
    if (Rt(i)) return eo(t, i, e, s);
    if (he.isType(i)) return so(t, i, e, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, i, e) {
        this.node = t;
        this.instructions = i;
        this.De = e;
        this.$e = void 0;
    }
    get definition() {
        if (void 0 === this.$e) this.$e = CustomElementDefinition.create({
            name: he.generateName(),
            template: this.node,
            needsCompile: Rt(this.node),
            instructions: this.instructions,
            dependencies: this.De
        });
        return this.$e;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(_e).getViewFactory(this.definition, t.createChild().register(...this.De));
    }
    mergeInto(t, i, e) {
        t.appendChild(this.node);
        i.push(...this.instructions);
        e.push(...this.De);
    }
}

function eo(t, i, e, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(i);
    let h = false;
    if (e) Object.keys(e).forEach((t => {
        const i = e[t];
        if (_s(i)) {
            h = true;
            n.push(i);
        } else l.setAttribute(t, i);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) no(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function so(t, i, e, s) {
    const n = he.getDefinition(i);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const c = n.bindables;
    const a = t.document.createElement(n.name);
    a.className = "au";
    if (!l.includes(i)) l.push(i);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (e) Object.keys(e).forEach((t => {
        const i = e[t];
        if (_s(i)) h.push(i); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(i, t)); else h.push(new SetPropertyInstruction(i, t));
    }));
    if (s) no(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function no(t, i, e, s, n) {
    for (let r = 0, o = e.length; r < o; ++r) {
        const o = e[r];
        switch (typeof o) {
          case "string":
            i.appendChild(t.document.createTextNode(o));
            break;

          case "object":
            if (o instanceof t.Node) i.appendChild(o); else if ("mergeInto" in o) o.mergeInto(i, s, n);
        }
    }
}

function ro(t, i) {
    const e = i.to;
    if (void 0 !== e && "subject" !== e && "composing" !== e) t[e] = i;
    return t;
}

class AuRender {
    constructor(t, i, e, s) {
        this.p = t;
        this.Pe = i;
        this.Oe = e;
        this.r = s;
        this.id = H("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Le = void 0;
        this.qe = i.props.reduce(ro, {});
    }
    attaching(t, i, e) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Le !== s) {
            this.Le = s;
            this.composing = true;
            return this.compose(void 0, s, t, e);
        }
        return this.compose(n, s, t, e);
    }
    detaching(t, i, e) {
        return this.oe(this.view, t, e);
    }
    componentChanged(t, i, e) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Le === t) return;
        this.Le = t;
        this.composing = true;
        e |= s.flags;
        const n = Y(this.oe(this.view, null, e), (() => this.compose(void 0, t, null, e)));
        if (Ct(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, i, e, s) {
        return Y(void 0 === t ? Y(i, (t => this.Ue(t, s))) : t, (t => this.ne(this.view = t, e, s)));
    }
    oe(t, i, e) {
        return null === t || void 0 === t ? void 0 : t.deactivate(null !== i && void 0 !== i ? i : t, this.$controller, e);
    }
    ne(t, i, e) {
        const {$controller: s} = this;
        return Y(null === t || void 0 === t ? void 0 : t.activate(null !== i && void 0 !== i ? i : t, s, e, s.scope), (() => {
            this.composing = false;
        }));
    }
    Ue(t, i) {
        const e = this._e(t, i);
        if (e) {
            e.setLocation(this.$controller.location);
            e.lockScope(this.$controller.scope);
            return e;
        }
        return;
    }
    _e(t, i) {
        if (null == t) return;
        const e = this.Oe.controller.container;
        if ("object" === typeof t) {
            if (oo(t)) return t;
            if ("createView" in t) return t.createView(e);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), e).create();
        }
        if (Rt(t)) {
            const i = e.find(he, t);
            if (null == i) throw new Error(`AUR0809:${t}`);
            t = i.Type;
        }
        return io(this.p, t, this.qe, this.$controller.host.childNodes).createView(e);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    accept(t) {
        var i;
        if (true === (null === (i = this.view) || void 0 === i ? void 0 : i.accept(t))) return true;
    }
}

AuRender.inject = [ Jt, Us, is, _e ];

lt([ Bt ], AuRender.prototype, "component", void 0);

lt([ Bt({
    mode: t.fromView
}) ], AuRender.prototype, "composing", void 0);

Hi({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function oo(t) {
    return "lockScope" in t;
}

class AuCompose {
    constructor(t, i, e, s, n, r, o) {
        this.c = t;
        this.parent = i;
        this.host = e;
        this.l = s;
        this.p = n;
        this.scopeBehavior = "auto";
        this.Fe = void 0;
        this.r = t.get(_e);
        this.Pe = r;
        this.Ve = o;
    }
    static get inject() {
        return [ W, ts, bs, ys, Jt, Us, et(CompositionContextFactory) ];
    }
    get pending() {
        return this.Me;
    }
    get composition() {
        return this.Fe;
    }
    attaching(t, i, e) {
        return this.Me = Y(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Ve.isCurrent(t)) this.Me = void 0;
        }));
    }
    detaching(t) {
        const i = this.Fe;
        const e = this.Me;
        this.Ve.invalidate();
        this.Fe = this.Me = void 0;
        return Y(e, (() => null === i || void 0 === i ? void 0 : i.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Fe) {
            this.Fe.update(this.model);
            return;
        }
        this.Me = Y(this.Me, (() => Y(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Ve.isCurrent(t)) this.Me = void 0;
        }))));
    }
    queue(t, i) {
        const e = this.Ve;
        const s = this.Fe;
        return Y(e.create(t), (t => {
            if (e.isCurrent(t)) return Y(this.compose(t), (n => {
                if (e.isCurrent(t)) return Y(n.activate(i), (() => {
                    if (e.isCurrent(t)) {
                        this.Fe = n;
                        return Y(null === s || void 0 === s ? void 0 : s.deactivate(i), (() => t));
                    } else return Y(n.controller.deactivate(n.controller, this.$controller, 4), (() => {
                        n.controller.dispose();
                        return t;
                    }));
                }));
                n.controller.dispose();
                return t;
            }));
            return t;
        }));
    }
    compose(t) {
        let i;
        let e;
        let s;
        const {view: n, viewModel: r, model: o} = t.change;
        const {c: h, host: c, $controller: a, l: u} = this;
        const f = this.getDef(r);
        const d = h.createChild();
        const v = null == u ? c.parentNode : u.parentNode;
        if (null !== f) {
            if (f.containerless) throw new Error(`AUR0806`);
            if (null == u) {
                e = c;
                s = () => {};
            } else {
                e = v.insertBefore(this.p.document.createElement(f.name), u);
                s = () => {
                    e.remove();
                };
            }
            i = this.getVm(d, r, e);
        } else {
            e = null == u ? c : u;
            i = this.getVm(d, r, e);
        }
        const m = () => {
            if (null !== f) {
                const n = Controller.$el(d, i, e, {
                    projections: this.Pe.projections
                }, f);
                return new CompositionController(n, (t => n.activate(null !== t && void 0 !== t ? t : n, a, 2, a.scope.parentScope)), (t => Y(n.deactivate(null !== t && void 0 !== t ? t : n, a, 4), s)), (t => {
                    var e;
                    return null === (e = i.activate) || void 0 === e ? void 0 : e.call(i, t);
                }), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: he.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, d);
                const o = Controller.$view(r, a);
                const h = "auto" === this.scopeBehavior ? l.fromParent(this.parent.scope, i) : l.create(i);
                if (Es(e)) o.setLocation(e); else o.setHost(e);
                return new CompositionController(o, (t => o.activate(null !== t && void 0 !== t ? t : o, a, 2, h)), (t => o.deactivate(null !== t && void 0 !== t ? t : o, a, 4)), (t => {
                    var e;
                    return null === (e = i.activate) || void 0 === e ? void 0 : e.call(i, t);
                }), t);
            }
        };
        if ("activate" in i) return Y(i.activate(o), (() => m())); else return m();
    }
    getVm(t, i, e) {
        if (null == i) return new EmptyComponent$1;
        if ("object" === typeof i) return i;
        const s = this.p;
        const n = Es(e);
        t.registerResolver(s.Element, t.registerResolver(bs, new G("ElementResolver", n ? null : e)));
        t.registerResolver(ys, new G("IRenderLocation", n ? e : null));
        const r = t.invoke(i);
        t.registerResolver(i, new G("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const i = At(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return he.isType(i) ? he.getDefinition(i) : null;
    }
}

lt([ Bt ], AuCompose.prototype, "view", void 0);

lt([ Bt ], AuCompose.prototype, "viewModel", void 0);

lt([ Bt ], AuCompose.prototype, "model", void 0);

lt([ Bt({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Hi("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return Y(t.load(), (t => new CompositionContext(++this.id, t)));
    }
    invalidate() {
        this.id++;
    }
}

class ChangeInfo {
    constructor(t, i, e, s) {
        this.view = t;
        this.viewModel = i;
        this.model = e;
        this.src = s;
    }
    load() {
        if (Ct(this.view) || Ct(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, i]) => new LoadedChangeInfo(t, i, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
    }
}

class LoadedChangeInfo {
    constructor(t, i, e, s) {
        this.view = t;
        this.viewModel = i;
        this.model = e;
        this.src = s;
    }
}

class CompositionContext {
    constructor(t, i) {
        this.id = t;
        this.change = i;
    }
}

class CompositionController {
    constructor(t, i, e, s, n) {
        this.controller = t;
        this.start = i;
        this.stop = e;
        this.update = s;
        this.context = n;
        this.state = 0;
    }
    activate(t) {
        if (0 !== this.state) throw new Error(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw new Error(`AUR0808`);

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, i, e, s) {
        var n, r;
        this.je = null;
        this.Ne = null;
        let o;
        const l = i.auSlot;
        const h = null === (r = null === (n = e.instruction) || void 0 === n ? void 0 : n.projections) || void 0 === r ? void 0 : r[l.name];
        if (null == h) {
            o = s.getViewFactory(l.fallback, e.controller.container);
            this.We = false;
        } else {
            o = s.getViewFactory(h, e.parent.controller.container);
            this.We = true;
        }
        this.Oe = e;
        this.view = o.create().setLocation(t);
    }
    static get inject() {
        return [ ys, Us, is, _e ];
    }
    binding(t, i, e) {
        var s;
        this.je = this.$controller.scope.parentScope;
        let n;
        if (this.We) {
            n = this.Oe.controller.scope.parentScope;
            (this.Ne = l.fromParent(n, n.bindingContext)).overrideContext.$host = null !== (s = this.expose) && void 0 !== s ? s : this.je.bindingContext;
        }
    }
    attaching(t, i, e) {
        return this.view.activate(t, this.$controller, e, this.We ? this.Ne : this.je);
    }
    detaching(t, i, e) {
        return this.view.deactivate(t, this.$controller, e);
    }
    exposeChanged(t) {
        if (this.We && null != this.Ne) this.Ne.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var i;
        if (true === (null === (i = this.view) || void 0 === i ? void 0 : i.accept(t))) return true;
    }
}

lt([ Bt ], AuSlot.prototype, "expose", void 0);

Hi({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const lo = O.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let ho = class SanitizeValueConverter {
    constructor(t) {
        this.He = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.He.sanitize(t);
    }
};

ho = lt([ ht(0, lo) ], ho);

B("sanitize")(ho);

let co = class ViewValueConverter {
    constructor(t) {
        this.ze = t;
    }
    toView(t, i) {
        return this.ze.getViewComponentForObject(t, i);
    }
};

co = lt([ ht(0, Ue) ], co);

B("view")(co);

const ao = DebounceBindingBehavior;

const uo = OneTimeBindingBehavior;

const fo = ToViewBindingBehavior;

const vo = FromViewBindingBehavior;

const mo = SignalBindingBehavior;

const go = ThrottleBindingBehavior;

const po = TwoWayBindingBehavior;

const wo = TemplateCompiler;

const bo = NodeObserverLocator;

const xo = [ wo, bo ];

const yo = SVGAnalyzer;

const ko = Yt;

const Co = Kt;

const Ao = Xt;

const Ro = Gt;

const So = Zt;

const Eo = [ Ao, Ro, So ];

const Bo = [ ko, Co ];

const Io = qn;

const To = Ln;

const Do = Un;

const $o = Pn;

const Po = Dn;

const Oo = $n;

const Lo = On;

const qo = Wn;

const Uo = _n;

const _o = Fn;

const Fo = Vn;

const Vo = Mn;

const Mo = Nn;

const jo = jn;

const No = Hn;

const Wo = [ To, Po, $o, Oo, Lo, Io, Do, qo, Uo, _o, Fo, Mo, jo, Vo, No ];

const Ho = ho;

const zo = co;

const Go = ObserveShallow;

const Xo = If;

const Ko = Else;

const Yo = Repeat;

const Zo = With;

const Jo = Wr;

const Qo = Hr;

const tl = zr;

const il = Gr;

const el = Xr;

const sl = Kr;

const nl = Yr;

const rl = Jr;

const ol = Qr;

const ll = to;

const hl = AttrBindingBehavior;

const cl = SelfBindingBehavior;

const al = UpdateTriggerBindingBehavior;

const ul = AuRender;

const fl = AuCompose;

const dl = Portal;

const vl = Focus;

const ml = qr;

const gl = [ ao, uo, fo, vo, mo, go, po, Ho, zo, Go, Xo, Ko, Yo, Zo, Jo, Qo, tl, il, el, sl, nl, rl, ol, ll, hl, cl, al, ul, fl, dl, vl, ml, AuSlot ];

const pl = Ys;

const wl = Gs;

const bl = zs;

const xl = Js;

const yl = tn;

const kl = Ks;

const Cl = Qs;

const Al = Zs;

const Rl = Hs;

const Sl = Xs;

const El = ln;

const Bl = fn;

const Il = hn;

const Tl = cn;

const Dl = an;

const $l = un;

const Pl = rn;

const Ol = dn;

const Ll = [ Cl, yl, pl, Al, xl, Rl, bl, wl, Sl, kl, El, Bl, Il, Tl, Dl, $l, Pl, Ol ];

const ql = Ul(P);

function Ul(t) {
    return {
        optionsProvider: t,
        register(i) {
            const e = {
                coercingOptions: {
                    enableCoercion: false,
                    coerceNullish: false
                }
            };
            t(e);
            return i.register(U.instance(h, e.coercingOptions), ...xo, ...gl, ...Eo, ...Wo, ...Ll);
        },
        customize(i) {
            return Ul(null !== i && void 0 !== i ? i : t);
        }
    };
}

const _l = O.createInterface("IAurelia");

class Aurelia {
    constructor(t = O.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Ge = false;
        this.Xe = false;
        this.Ke = void 0;
        this.next = void 0;
        this.Ye = void 0;
        this.Ze = void 0;
        if (t.has(_l, true)) throw new Error(`AUR0768`);
        t.registerResolver(_l, new G("IAurelia", this));
        t.registerResolver(ms, this.Je = new G("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Ge;
    }
    get isStopping() {
        return this.Xe;
    }
    get root() {
        if (null == this.Ke) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.Ke;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.Qe(t.host), this.container, this.Je);
        return this;
    }
    enhance(t, i) {
        var e;
        const s = null !== (e = t.container) && void 0 !== e ? e : this.container.createChild();
        const n = t.host;
        const r = this.Qe(n);
        const o = t.component;
        let l;
        if (At(o)) {
            s.registerResolver(r.HTMLElement, s.registerResolver(r.Element, s.registerResolver(bs, new G("ElementResolver", n))));
            l = s.invoke(o);
        } else l = o;
        s.registerResolver(xs, new G("IEventTarget", n));
        i = null !== i && void 0 !== i ? i : null;
        const h = Controller.$el(s, l, n, null, CustomElementDefinition.create({
            name: he.generateName(),
            template: n,
            enhance: true
        }));
        return Y(h.activate(h, i, 2), (() => h));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    Qe(t) {
        let i;
        if (!this.container.has(Jt, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            i = new ot(t.ownerDocument.defaultView);
            this.container.register(U.instance(Jt, i));
        } else i = this.container.get(Jt);
        return i;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (Ct(this.Ye)) return this.Ye;
        return this.Ye = Y(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.Je.prepare(this.Ke = t);
            this.Ge = true;
            return Y(t.activate(), (() => {
                this.ir = true;
                this.Ge = false;
                this.Ye = void 0;
                this.ts(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (Ct(this.Ze)) return this.Ze;
        if (true === this.ir) {
            const i = this.Ke;
            this.ir = false;
            this.Xe = true;
            return this.Ze = Y(i.deactivate(), (() => {
                Reflect.deleteProperty(i.host, "$aurelia");
                if (t) i.dispose();
                this.Ke = void 0;
                this.Je.dispose();
                this.Xe = false;
                this.ts(i, "au-stopped", i.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Xe) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    ts(t, i, e) {
        const s = new t.platform.window.CustomEvent(i, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        e.dispatchEvent(s);
    }
}

var Fl;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(Fl || (Fl = {}));

const Vl = O.createInterface("IDialogService");

const Ml = O.createInterface("IDialogController");

const jl = O.createInterface("IDialogDomRenderer");

const Nl = O.createInterface("IDialogDom");

const Wl = O.createInterface("IDialogGlobalSettings");

class DialogOpenResult {
    constructor(t, i) {
        this.wasCancelled = t;
        this.dialog = i;
    }
    static create(t, i) {
        return new DialogOpenResult(t, i);
    }
}

class DialogCloseResult {
    constructor(t, i) {
        this.status = t;
        this.value = i;
    }
    static create(t, i) {
        return new DialogCloseResult(t, i);
    }
}

var Hl;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(Hl || (Hl = {}));

class DialogController {
    constructor(t, i) {
        this.p = t;
        this.ctn = i;
        this.closed = new Promise(((t, i) => {
            this.$t = t;
            this.St = i;
        }));
    }
    static get inject() {
        return [ Jt, W ];
    }
    activate(t) {
        var i;
        const e = this.ctn.createChild();
        const {model: s, template: n, rejectOnCancel: r} = t;
        const o = e.get(jl);
        const l = null !== (i = t.host) && void 0 !== i ? i : this.p.document.body;
        const h = this.dom = o.render(l, t);
        const c = e.has(xs, true) ? e.get(xs) : null;
        const a = h.contentHost;
        this.settings = t;
        if (null == c || !c.contains(l)) e.register(U.instance(xs, l));
        e.register(U.instance(bs, a), U.instance(Nl, h));
        return new Promise((i => {
            var n, r;
            const o = Object.assign(this.cmp = this.getOrCreateVm(e, t, a), {
                $dialog: this
            });
            i(null !== (r = null === (n = o.canActivate) || void 0 === n ? void 0 : n.call(o, s)) && void 0 !== r ? r : true);
        })).then((i => {
            var o;
            if (true !== i) {
                h.dispose();
                if (r) throw zl(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return Y(null === (o = l.activate) || void 0 === o ? void 0 : o.call(l, s), (() => {
                var i;
                const s = this.controller = Controller.$el(e, l, a, null, CustomElementDefinition.create(null !== (i = this.getDefinition(l)) && void 0 !== i ? i : {
                    name: he.generateName(),
                    template: n
                }));
                return Y(s.activate(s, null, 2), (() => {
                    var i;
                    h.overlay.addEventListener(null !== (i = t.mouseEvent) && void 0 !== i ? i : "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            h.dispose();
            throw t;
        }));
    }
    deactivate(t, i) {
        if (this.es) return this.es;
        let e = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, i);
        const c = new Promise((c => {
            var a, u;
            c(Y(null !== (u = null === (a = r.canDeactivate) || void 0 === a ? void 0 : a.call(r, h)) && void 0 !== u ? u : true, (c => {
                var a;
                if (true !== c) {
                    e = false;
                    this.es = void 0;
                    if (l) throw zl(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return Y(null === (a = r.deactivate) || void 0 === a ? void 0 : a.call(r, h), (() => Y(s.deactivate(s, null, 4), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(null !== o && void 0 !== o ? o : "click", this);
                    if (!l && "error" !== t) this.$t(h); else this.St(zl(i, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.es = void 0;
            throw t;
        }));
        this.es = e ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const i = Gl(t);
        return new Promise((t => {
            var e, s;
            return t(Y(null === (s = (e = this.cmp).deactivate) || void 0 === s ? void 0 : s.call(e, DialogCloseResult.create("error", i)), (() => Y(this.controller.deactivate(this.controller, null, 4), (() => {
                this.dom.dispose();
                this.St(i);
            })))));
        }));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, i, e) {
        const s = i.component;
        if (null == s) return new EmptyComponent;
        if ("object" === typeof s) return s;
        const n = this.p;
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(bs, new G("ElementResolver", e))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const i = At(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return he.isType(i) ? he.getDefinition(i) : null;
    }
}

class EmptyComponent {}

function zl(t, i) {
    const e = new Error(i);
    e.wasCancelled = true;
    e.value = t;
    return e;
}

function Gl(t) {
    const i = new Error;
    i.wasCancelled = false;
    i.value = t;
    return i;
}

class DialogService {
    constructor(t, i, e) {
        this.ft = t;
        this.p = i;
        this.ss = e;
        this.dlgs = [];
    }
    get controllers() {
        return this.dlgs.slice(0);
    }
    get top() {
        const t = this.dlgs;
        return t.length > 0 ? t[t.length - 1] : null;
    }
    static get inject() {
        return [ W, Jt, Wl ];
    }
    static register(t) {
        t.register(U.singleton(Vl, this), Ci.beforeDeactivate(Vl, (t => Y(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Kl(new Promise((i => {
            var e;
            const s = DialogSettings.from(this.ss, t);
            const n = null !== (e = s.container) && void 0 !== e ? e : this.ft.createChild();
            i(Y(s.load(), (t => {
                const i = n.invoke(DialogController);
                n.register(U.instance(Ml, i));
                n.register(U.callback(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return Y(i.activate(t), (t => {
                    if (!t.wasCancelled) {
                        if (1 === this.dlgs.push(i)) this.p.window.addEventListener("keydown", this);
                        const t = () => this.remove(i);
                        i.closed.then(t, t);
                    }
                    return t;
                }));
            })));
        })));
    }
    closeAll() {
        return Promise.all(Array.from(this.dlgs).map((t => {
            if (t.settings.rejectOnCancel) return t.cancel().then((() => null));
            return t.cancel().then((i => "cancel" === i.status ? null : t));
        }))).then((t => t.filter((t => !!t))));
    }
    remove(t) {
        const i = this.dlgs;
        const e = i.indexOf(t);
        if (e > -1) this.dlgs.splice(e, 1);
        if (0 === i.length) this.p.window.removeEventListener("keydown", this);
    }
    handleEvent(t) {
        const i = t;
        const e = Yl(i);
        if (null == e) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === e && n.includes(e)) void s.cancel(); else if ("Enter" === e && n.includes(e)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).ls().os();
    }
    load() {
        const t = this;
        const i = this.component;
        const e = this.template;
        const s = X(null == i ? void 0 : Y(i(), (i => {
            t.component = i;
        })), At(e) ? Y(e(), (i => {
            t.template = i;
        })) : void 0);
        return Ct(s) ? s.then((() => t)) : t;
    }
    ls() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    os() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Xl(t, i) {
    return this.then((e => e.dialog.closed.then(t, i)), i);
}

function Kl(t) {
    t.whenClosed = Xl;
    return t;
}

function Yl(t) {
    if ("Escape" === (t.code || t.key) || 27 === t.keyCode) return "Escape";
    if ("Enter" === (t.code || t.key) || 13 === t.keyCode) return "Enter";
    return;
}

class DefaultDialogGlobalSettings {
    constructor() {
        this.lock = true;
        this.startingZIndex = 1e3;
        this.rejectOnCancel = false;
    }
    static register(t) {
        U.singleton(Wl, this).register(t);
    }
}

const Zl = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Zl} display:flex;`;
        this.overlayCss = Zl;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        U.singleton(jl, this).register(t);
    }
    render(t) {
        const i = this.p.document;
        const e = (t, e) => {
            const s = i.createElement(t);
            s.style.cssText = e;
            return s;
        };
        const s = t.appendChild(e("au-dialog-container", this.wrapperCss));
        const n = s.appendChild(e("au-dialog-overlay", this.overlayCss));
        const r = s.appendChild(e("div", this.hostCss));
        return new DefaultDialogDom(s, n, r);
    }
}

DefaultDialogDomRenderer.inject = [ Jt ];

class DefaultDialogDom {
    constructor(t, i, e) {
        this.wrapper = t;
        this.overlay = i;
        this.contentHost = e;
    }
    dispose() {
        this.wrapper.remove();
    }
}

function Jl(t, i) {
    return {
        settingsProvider: t,
        register: e => e.register(...i, Ci.beforeCreate((() => t(e.get(Wl))))),
        customize(t, e) {
            return Jl(t, null !== e && void 0 !== e ? e : i);
        }
    };
}

const Ql = Jl((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(U.singleton(Wl, this));
    }
} ]);

const th = Jl(P, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const ih = O.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, i, e) {
        this.ctn = t;
        this.p = i;
        this.r = e;
    }
    define(t, i, e) {
        if (!t.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let s;
        if (null == i) throw new Error("Invalid custom element definition");
        switch (typeof i) {
          case "function":
            s = he.isType(i) ? he.getDefinition(i) : CustomElementDefinition.create(he.generateName(), i);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(i);
            break;
        }
        if (s.containerless) throw new Error("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const n = !(null === e || void 0 === e ? void 0 : e.extends) ? HTMLElement : this.p.document.createElement(e.extends).constructor;
        const r = this.ctn;
        const o = this.r;
        const l = s.bindables;
        const h = this.p;
        class CustomElementClass extends n {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = r.createChild();
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(bs, new G("ElementProvider", this))));
                const i = o.compile(s, t, {
                    projections: null
                });
                const e = t.invoke(i.Type);
                const n = this.auCtrl = Controller.$el(t, e, this, null, i);
                ws(this, i.key, n);
            }
            connectedCallback() {
                this.auInit();
                this.auCtrl.activate(this.auCtrl, null, 0);
            }
            disconnectedCallback() {
                this.auCtrl.deactivate(this.auCtrl, null, 0);
            }
            adoptedCallback() {
                this.auInit();
            }
            attributeChangedCallback(t, i, e) {
                this.auInit();
                this.auCtrl.viewModel[t] = e;
            }
        }
        CustomElementClass.observedAttributes = Object.keys(l);
        for (const t in l) Object.defineProperty(CustomElementClass.prototype, t, {
            configurable: true,
            enumerable: false,
            get() {
                return this["auCtrl"].viewModel[t];
            },
            set(i) {
                if (!this["auInited"]) this["auInit"]();
                this["auCtrl"].viewModel[t] = i;
            }
        });
        this.p.customElements.define(t, CustomElementClass, e);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ W, Jt, _e ];

export { AdoptedStyleSheetsStyles, AppRoot, Ci as AppTask, Yt as AtPrefixedTriggerAttributePattern, ko as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, hl as AttrBindingBehaviorRegistration, Mn as AttrBindingCommand, Vo as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, Bl as AttributeBindingRendererRegistration, AttributeNSAccessor, zt as AttributePattern, AuCompose, AuRender, ul as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Dt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, Tn as BindingCommand, BindingCommandDefinition, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, qn as CallBindingCommand, Io as CallBindingCommandRegistration, CallBindingInstruction, pl as CallBindingRendererRegistration, Vn as CaptureBindingCommand, Fo as CaptureBindingCommandRegistration, Hr as Case, CheckedObserver, Bi as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, Nn as ClassBindingCommand, Mo as ClassBindingCommandRegistration, Kt as ColonPrefixedBindAttributePattern, Co as ColonPrefixedBindAttributePatternRegistration, Rn as CommandType, ComputedWatcher, Controller, Vi as CustomAttribute, CustomAttributeDefinition, wl as CustomAttributeRendererRegistration, he as CustomElement, CustomElementDefinition, bl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, ao as DebounceBindingBehaviorRegistration, Ln as DefaultBindingCommand, To as DefaultBindingCommandRegistration, Wo as DefaultBindingLanguage, Eo as DefaultBindingSyntax, zr as DefaultCase, xo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, Ll as DefaultRenderers, gl as DefaultResources, Fl as DefinitionType, Fn as DelegateBindingCommand, _o as DelegateBindingCommandRegistration, DialogCloseResult, Ql as DialogConfiguration, DialogController, Hl as DialogDeactivationStatuses, th as DialogDefaultConfiguration, DialogOpenResult, DialogService, Gt as DotSeparatedAttributePattern, Ro as DotSeparatedAttributePatternRegistration, Else, Ko as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, Focus, Un as ForBindingCommand, Do as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, vo as FromViewBindingBehaviorRegistration, Pn as FromViewBindingCommand, $o as FromViewBindingCommandRegistration, Kr as FulfilledTemplateController, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, ms as IAppRoot, ki as IAppTask, ii as IAttrMapper, Mt as IAttributeParser, Vt as IAttributePattern, Ls as IAuSlotsInfo, _l as IAurelia, ts as IController, Ml as IDialogController, Nl as IDialogDom, jl as IDialogDomRenderer, Wl as IDialogGlobalSettings, Vl as IDialogService, Ps as IEventDelegator, xs as IEventTarget, Ts as IHistory, is as IHydrationContext, Us as IInstruction, Re as ILifecycleHooks, on as IListenerBehaviorOptions, Is as ILocation, bs as INode, bo as INodeObserverLocatorRegistration, Jt as IPlatform, Os as IProjections, ys as IRenderLocation, Vs as IRenderer, _e as IRendering, Qt as ISVGAnalyzer, lo as ISanitizer, be as IShadowDOMGlobalStyles, we as IShadowDOMStyles, Ut as ISyntaxInterpreter, Fs as ITemplateCompiler, hr as ITemplateCompilerHooks, wo as ITemplateCompilerRegistration, zn as ITemplateElementFactory, Te as IViewFactory, Ue as IViewLocator, ih as IWcElementRegistry, Bs as IWindow, gs as IWorkTracker, If, Xo as IfRegistration, qs as InstructionType, InterpolationBinding, xl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, yl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, kl as LetElementRendererRegistration, Be as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, El as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, ks as NodeType, NoopSVGAnalyzer, ObserveShallow, OneTimeBindingBehavior, uo as OneTimeBindingBehaviorRegistration, Dn as OneTimeBindingCommand, Po as OneTimeBindingCommandRegistration, Xr as PendingTemplateController, Portal, Gr as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Cl as PropertyBindingRendererRegistration, Xt as RefAttributePattern, Ao as RefAttributePatternRegistration, RefBinding, qo as RefBindingCommandRegistration, RefBindingInstruction, Al as RefBindingRendererRegistration, Yr as RejectedTemplateController, RenderPlan, Rendering, Repeat, Yo as RepeatRegistration, SVGAnalyzer, yo as SVGAnalyzerRegistration, ho as SanitizeValueConverter, Ho as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, cl as SelfBindingBehaviorRegistration, SetAttributeInstruction, Il as SetAttributeRendererRegistration, SetClassAttributeInstruction, Tl as SetClassAttributeRendererRegistration, SetPropertyInstruction, Rl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, Dl as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, Bo as ShortHandBindingSyntax, SignalBindingBehavior, mo as SignalBindingBehaviorRegistration, ql as StandardConfiguration, StyleAttributeAccessor, jn as StyleBindingCommand, jo as StyleBindingCommandRegistration, xe as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, $l as StylePropertyBindingRendererRegistration, Wr as Switch, TemplateCompiler, ur as TemplateCompilerHooks, Sl as TemplateControllerRendererRegistration, TextBindingInstruction, Pl as TextBindingRendererRegistration, ThrottleBindingBehavior, go as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, fo as ToViewBindingBehaviorRegistration, $n as ToViewBindingCommand, Oo as ToViewBindingCommandRegistration, _n as TriggerBindingCommand, Uo as TriggerBindingCommandRegistration, TwoWayBindingBehavior, po as TwoWayBindingBehaviorRegistration, On as TwoWayBindingCommand, Lo as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, al as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, ViewFactory, ViewLocator, Ze as ViewModelKind, co as ViewValueConverter, zo as ViewValueConverterRegistration, Le as Views, Wi as Watch, WcCustomElementRegistry, With, Zo as WithRegistration, Xn as allResources, nn as applyBindingBehavior, jt as attributePattern, Bt as bindable, Sn as bindingCommand, fe as capture, Ri as children, $t as coercer, Gi as containerless, Ss as convertToRenderLocation, io as createElement, me as cssModules, Li as customAttribute, Hi as customElement, As as getEffectiveParentNode, ps as getRef, Xe as isCustomElementController, Ke as isCustomElementViewModel, _s as isInstruction, Es as isRenderLocation, Ie as lifecycleHooks, ae as processContent, Ms as renderer, Rs as setEffectiveParentNode, ws as setRef, ge as shadowCSS, Ki as strict, fr as templateCompilerHooks, qi as templateController, zi as useShadowDOM, qe as view, Mi as watch };

