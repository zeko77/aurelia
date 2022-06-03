import { BindingMode as t, subscriberCollection as e, withFlushQueue as i, connectable as s, registerAliases as n, ConnectableSwitcher as r, ProxyObservable as o, Scope as l, ICoercionConfiguration as h, IObserverLocator as a, IExpressionParser as c, AccessScopeExpression as u, DelegationStrategy as f, BindingBehaviorExpression as d, BindingBehaviorFactory as m, PrimitiveLiteralExpression as v, bindingBehavior as g, BindingInterceptor as p, ISignaler as w, PropertyAccessor as b, INodeObserverLocator as x, SetterObserver as y, IDirtyChecker as k, alias as C, applyMutationsToIndices as A, getCollectionObserver as R, BindingContext as S, synchronizeIndices as E, valueConverter as B } from "@aurelia/runtime";

export { LifecycleFlags, bindingBehavior, valueConverter } from "@aurelia/runtime";

import { Protocol as I, getPrototypeChain as T, firstDefined as D, kebabCase as P, noop as $, DI as O, emptyArray as L, all as q, Registration as U, IPlatform as _, mergeArrays as F, fromDefinitionOrDefault as V, pascalCase as M, fromAnnotationOrTypeOrDefault as j, fromAnnotationOrDefinitionOrTypeOrDefault as N, IContainer as W, nextId as H, optional as z, InstanceProvider as G, ILogger as X, onResolve as K, resolveAll as Y, camelCase as Z, toArray as J, emptyObject as Q, IServiceLocator as tt, compareNumber as et, transient as it } from "@aurelia/kernel";

import { Metadata as st, isObject as nt } from "@aurelia/metadata";

import { TaskAbortError as rt } from "@aurelia/platform";

import { BrowserPlatform as ot } from "@aurelia/platform-browser";

function lt(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function ht(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

const at = st.getOwn;

const ct = st.hasOwn;

const ut = st.define;

const {annotation: ft, resource: dt} = I;

const mt = ft.keyFor;

const vt = dt.keyFor;

const gt = dt.appendTo;

const pt = ft.appendTo;

const wt = ft.getKeys;

const bt = () => Object.create(null);

const xt = Object.prototype.hasOwnProperty;

const yt = bt();

const kt = (t, e, i) => {
    if (true === yt[e]) return true;
    if (!Rt(e)) return false;
    const s = e.slice(0, 5);
    return yt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const Ct = t => t instanceof Promise;

const At = t => "function" === typeof t;

const Rt = t => "string" === typeof t;

const St = Object.defineProperty;

const Et = t => {
    throw t;
};

function Bt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        ut(Tt, BindableDefinition.create(e, t, i), t.constructor, e);
        pt(t.constructor, Dt.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (Rt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function It(t) {
    return t.startsWith(Tt);
}

const Tt = mt("bindable");

const Dt = Object.freeze({
    name: Tt,
    keyFrom: t => `${Tt}:${t}`,
    from(t, ...e) {
        const i = {};
        const s = Array.isArray;
        function n(e) {
            i[e] = BindableDefinition.create(e, t);
        }
        function r(e, s) {
            i[e] = s instanceof BindableDefinition ? s : BindableDefinition.create(e, t, s);
        }
        function o(t) {
            if (s(t)) t.forEach(n); else if (t instanceof BindableDefinition) i[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => r(e, t[e])));
        }
        e.forEach(o);
        return i;
    },
    for(t) {
        let e;
        const i = {
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
                e = BindableDefinition.create(n, t, r);
                if (!ct(Tt, t, n)) pt(t, Dt.keyFrom(n));
                ut(Tt, e, t, n);
                return i;
            },
            mode(t) {
                e.mode = t;
                return i;
            },
            callback(t) {
                e.callback = t;
                return i;
            },
            attribute(t) {
                e.attribute = t;
                return i;
            },
            primary() {
                e.primary = true;
                return i;
            },
            set(t) {
                e.set = t;
                return i;
            }
        };
        return i;
    },
    getAll(t) {
        const e = Tt.length + 1;
        const i = [];
        const s = T(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        let a;
        while (--n >= 0) {
            h = s[n];
            o = wt(h).filter(It);
            l = o.length;
            for (a = 0; a < l; ++a) i[r++] = at(Tt, h, o[a].slice(e));
        }
        return i;
    }
});

class BindableDefinition {
    constructor(t, e, i, s, n, r) {
        this.attribute = t;
        this.callback = e;
        this.mode = i;
        this.primary = s;
        this.property = n;
        this.set = r;
    }
    static create(e, i, s = {}) {
        return new BindableDefinition(D(s.attribute, P(e)), D(s.callback, `${e}Changed`), D(s.mode, t.toView), D(s.primary, false), D(s.property, e), D(s.set, Ot(e, i, s)));
    }
}

function Pt(t, e, i) {
    $t.define(t, e);
}

const $t = {
    key: mt("coercer"),
    define(t, e) {
        ut($t.key, t[e].bind(t), t);
    },
    for(t) {
        return at($t.key, t);
    }
};

function Ot(t, e, i = {}) {
    var s, n, r;
    const o = null !== (n = null !== (s = i.type) && void 0 !== s ? s : Reflect.getMetadata("design:type", e, t)) && void 0 !== n ? n : null;
    if (null == o) return $;
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
            l = "function" === typeof t ? t.bind(o) : null !== (r = $t.for(o)) && void 0 !== r ? r : $;
            break;
        }
    }
    return l === $ ? l : Lt(l, i.nullable);
}

function Lt(t, e) {
    return function(i, s) {
        var n;
        if (!(null === s || void 0 === s ? void 0 : s.enableCoercion)) return i;
        return (null !== e && void 0 !== e ? e : (null !== (n = null === s || void 0 === s ? void 0 : s.coerceNullish) && void 0 !== n ? n : false) ? false : true) && null == i ? i : t(i, s);
    };
}

class BindableObserver {
    constructor(t, e, i, s, n, r) {
        this.set = s;
        this.$controller = n;
        this.t = r;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        const o = t[i];
        const l = t.propertyChanged;
        const h = this.i = At(o);
        const a = this.u = At(l);
        const c = this.hs = s !== $;
        let u;
        this.o = t;
        this.k = e;
        this.cb = h ? o : $;
        this.C = a ? l : $;
        if (void 0 === this.cb && !a && !c) this.iO = false; else {
            this.iO = true;
            u = t[e];
            this.v = c && void 0 !== u ? s(u, this.t) : u;
            this.A();
        }
    }
    get type() {
        return 1;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        if (this.hs) t = this.set(t, this.t);
        const i = this.v;
        if (this.iO) {
            if (Object.is(t, i)) return;
            this.v = t;
            this.ov = i;
            this.f = e;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, i, e);
                if (this.u) this.C.call(this.o, this.k, t, i, e);
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

e(BindableObserver);

i(BindableObserver);

let qt;

class CharSpec {
    constructor(t, e, i, s) {
        this.chars = t;
        this.repeat = e;
        this.isSymbol = i;
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
            this.has = this.P;
            break;

          default:
            this.has = this.$;
        }
    }
    equals(t) {
        return this.chars === t.chars && this.repeat === t.repeat && this.isSymbol === t.isSymbol && this.isInverted === t.isInverted;
    }
    $(t) {
        return this.chars.includes(t);
    }
    P(t) {
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
    append(t, e) {
        const i = this.L;
        if (void 0 === i[t]) i[t] = e; else i[t] += e;
    }
    next(t) {
        const e = this.L;
        let i;
        if (void 0 !== e[t]) {
            i = this.q;
            if (void 0 === i[t]) i[t] = [ e[t] ]; else i[t].push(e[t]);
            e[t] = void 0;
        }
    }
}

class AttrParsingState {
    constructor(t, ...e) {
        this.charSpec = t;
        this.nextStates = [];
        this.types = null;
        this.isEndpoint = false;
        this.patterns = e;
    }
    get pattern() {
        return this.isEndpoint ? this.patterns[0] : null;
    }
    findChild(t) {
        const e = this.nextStates;
        const i = e.length;
        let s = null;
        let n = 0;
        for (;n < i; ++n) {
            s = e[n];
            if (t.equals(s.charSpec)) return s;
        }
        return null;
    }
    append(t, e) {
        const i = this.patterns;
        if (!i.includes(e)) i.push(e);
        let s = this.findChild(t);
        if (null == s) {
            s = new AttrParsingState(t, e);
            this.nextStates.push(s);
            if (t.repeat) s.nextStates.push(s);
        }
        return s;
    }
    findMatches(t, e) {
        const i = [];
        const s = this.nextStates;
        const n = s.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = s[l];
            if (o.charSpec.has(t)) {
                i.push(o);
                r = o.patterns.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.patterns[h]); else for (;h < r; ++h) e.append(o.patterns[h], t);
            }
        }
        return i;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.len = t.length;
        const i = this.specs = [];
        let s = 0;
        for (;e > s; ++s) i.push(new CharSpec(t[s], false, false, false));
    }
    eachChar(t) {
        const e = this.len;
        const i = this.specs;
        let s = 0;
        for (;e > s; ++s) t(i[s]);
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
        t = t.slice(0).sort(((t, e) => t.pattern > e.pattern ? 1 : -1));
        const e = t.length;
        let i;
        let s;
        let n;
        let r;
        let o;
        let l;
        let h;
        let a = 0;
        let c;
        while (e > a) {
            i = this.rootState;
            s = t[a];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.parse(s, r);
            l = o.length;
            h = t => {
                i = i.append(t, n);
            };
            for (c = 0; l > c; ++c) o[c].eachChar(h);
            i.types = r;
            i.isEndpoint = true;
            ++a;
        }
    }
    interpret(t) {
        const e = new Interpretation;
        const i = t.length;
        let s = this.initialStates;
        let n = 0;
        let r;
        for (;n < i; ++n) {
            s = this.getNextStates(s, t.charAt(n), e);
            if (0 === s.length) break;
        }
        s = s.filter(_t);
        if (s.length > 0) {
            s.sort(Ft);
            r = s[0];
            if (!r.charSpec.isSymbol) e.next(r.pattern);
            e.pattern = r.pattern;
        }
        return e;
    }
    getNextStates(t, e, i) {
        const s = [];
        let n = null;
        const r = t.length;
        let o = 0;
        for (;o < r; ++o) {
            n = t[o];
            s.push(...n.findMatches(e, i));
        }
        return s;
    }
    parse(t, e) {
        const i = [];
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
                i.push(new DynamicSegment(r));
                ++e.dynamics;
            } else ++o; else ++o; else if (o !== l) {
                i.push(new StaticSegment(s.slice(l, o)));
                ++e.statics;
                l = o;
            } else {
                i.push(new SymbolSegment(s.slice(l, o + 1)));
                ++e.symbols;
                l = ++o;
            }
        }
        if (l !== o) {
            i.push(new StaticSegment(s.slice(l, o)));
            ++e.statics;
        }
        return i;
    }
}

function _t(t) {
    return t.isEndpoint;
}

function Ft(t, e) {
    const i = t.types;
    const s = e.types;
    if (i.statics !== s.statics) return s.statics - i.statics;
    if (i.dynamics !== s.dynamics) return s.dynamics - i.dynamics;
    if (i.symbols !== s.symbols) return s.symbols - i.symbols;
    return 0;
}

class AttrSyntax {
    constructor(t, e, i, s) {
        this.rawName = t;
        this.rawValue = e;
        this.target = i;
        this.command = s;
    }
}

const Vt = O.createInterface("IAttributePattern");

const Mt = O.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.U = {};
        this._ = t;
        const i = this.F = {};
        const s = e.reduce(((t, e) => {
            const s = Ht(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), L);
        t.add(s);
    }
    parse(t, e) {
        let i = this.U[t];
        if (null == i) i = this.U[t] = this._.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.F[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ Ut, q(Vt) ];

function jt(...t) {
    return function e(i) {
        return zt.define(t, i);
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

const Nt = vt("attribute-pattern");

const Wt = "attribute-pattern-definitions";

const Ht = t => I.annotation.get(t, Wt);

const zt = Object.freeze({
    name: Nt,
    definitionAnnotationKey: Wt,
    define(t, e) {
        const i = new AttributePatternResourceDefinition(e);
        ut(Nt, i, e);
        gt(e, Nt);
        I.annotation.set(e, Wt, t);
        pt(e, Wt);
        return e;
    },
    getPatternDefinitions: Ht
});

let Gt = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
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
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
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
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

Kt = lt([ jt({
    pattern: ":PART",
    symbols: ":"
}) ], Kt);

let Yt = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

Yt = lt([ jt({
    pattern: "@PART",
    symbols: "@"
}) ], Yt);

let Zt = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

Zt = lt([ jt({
    pattern: "...$attrs",
    symbols: ""
}) ], Zt);

const Jt = _;

const Qt = O.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function te(t) {
    const e = bt();
    let i;
    for (i of t) e[i] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.V = Object.assign(bt(), {
            a: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: te([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: bt(),
            altGlyphDef: te([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: bt(),
            altGlyphItem: te([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: bt(),
            animate: te([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: te([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: te([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: te([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: te([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: te([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": te([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: te([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: te([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: te([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: te([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: te([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: te([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: te([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: te([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: te([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: te([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: te([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: te([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: te([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: te([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: te([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: te([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: te([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: te([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: te([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: te([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: te([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: te([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: te([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: te([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: te([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: te([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: te([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: te([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: te([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": te([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": te([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": te([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": te([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": te([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: te([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: te([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: te([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: bt(),
            hkern: te([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: te([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: te([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: te([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: te([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: te([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": te([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: te([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: te([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: te([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: te([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: te([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: te([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: te([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: te([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: te([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: te([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: te([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: te([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: te([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: te([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: te([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: te([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: te([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: te([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: te([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.M = te([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.j = te([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.V;
            let e = t.altGlyph;
            t.altGlyph = t.altglyph;
            t.altglyph = e;
            e = t.altGlyphDef;
            t.altGlyphDef = t.altglyphdef;
            t.altglyphdef = e;
            e = t.altGlyphItem;
            t.altGlyphItem = t.altglyphitem;
            t.altglyphitem = e;
            e = t.glyphRef;
            t.glyphRef = t.glyphref;
            t.glyphref = e;
        }
    }
    static register(t) {
        return U.singleton(Qt, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        var i;
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.M[t.nodeName] && true === this.j[e] || true === (null === (i = this.V[t.nodeName]) || void 0 === i ? void 0 : i[e]);
    }
}

SVGAnalyzer.inject = [ Jt ];

const ee = O.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

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
        var e;
        var i;
        let s;
        let n;
        let r;
        let o;
        for (r in t) {
            s = t[r];
            n = null !== (e = (i = this.N)[r]) && void 0 !== e ? e : i[r] = bt();
            for (o in s) {
                if (void 0 !== n[o]) throw se(o, r);
                n[o] = s[o];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const i in t) {
            if (void 0 !== e[i]) throw se(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return ie(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        var i, s, n;
        return null !== (n = null !== (s = null === (i = this.N[t.nodeName]) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : this.W[e]) && void 0 !== n ? n : kt(t, e, this.svg) ? e : null;
    }
}

function ie(t, e) {
    switch (t.nodeName) {
      case "INPUT":
        switch (t.type) {
          case "checkbox":
          case "radio":
            return "checked" === e;

          default:
            return "value" === e || "files" === e || "value-as-number" === e || "value-as-date" === e;
        }

      case "TEXTAREA":
      case "SELECT":
        return "value" === e;

      default:
        switch (e) {
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

function se(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

class CallBinding {
    constructor(t, e, i, s, n) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = i;
        this.locator = n;
        this.interceptor = this;
        this.isBound = false;
        this.targetObserver = s.getAccessor(e, i);
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const i = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
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
    observe(t, e) {
        return;
    }
    handleChange(t, e, i) {
        return;
    }
}

class AttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.H = false;
        this.f = 0;
        this.o = t;
        this.G = e;
        this.X = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        this.v = t;
        this.H = t !== this.ov;
        if (0 === (64 & e)) this.K();
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
                    let e = this.v;
                    if (Rt(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.G, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.X); else this.o.setAttribute(this.X, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let i = 0, s = t.length; s > i; ++i) {
            const s = t[i];
            if ("attributes" === s.type && s.attributeName === this.G) {
                e = true;
                break;
            }
        }
        if (e) {
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
            ne(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) re(this.o, this);
    }
    flush() {
        he = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, he, this.f);
    }
}

e(AttributeObserver);

i(AttributeObserver);

const ne = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(oe)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const re = (t, e) => {
    const i = t.$eMObs;
    if (i && i.delete(e)) {
        if (0 === i.size) {
            t.$mObs.disconnect();
            t.$mObs = void 0;
        }
        return true;
    }
    return false;
};

const oe = t => {
    t[0].target.$eMObs.forEach(le, t);
};

function le(t) {
    t.handleMutation(this);
}

let he;

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, i) {
        const s = this.b;
        if (t !== s.sourceExpression.evaluate(i, s.$scope, s.locator, null)) s.updateSource(t, i);
    }
}

const {oneTime: ae, toView: ce, fromView: ue} = t;

const fe = ce | ae;

const de = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, i, s, n, r, o) {
        this.sourceExpression = t;
        this.targetAttribute = i;
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
        this.target = e;
        this.p = o.get(Jt);
        this.oL = r;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        e |= this.persistentFlags;
        this.sourceExpression.assign(e, this.$scope, this.locator, t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const s = this.mode;
        const n = this.interceptor;
        const r = this.sourceExpression;
        const o = this.$scope;
        const l = this.locator;
        const h = this.targetObserver;
        const a = 0 === (2 & i) && (4 & h.type) > 0;
        let c = false;
        let u;
        if (10082 !== r.$kind || this.obs.count > 1) {
            c = 0 === (s & ae);
            if (c) this.obs.version++;
            t = r.evaluate(i, o, l, n);
            if (c) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (a) {
                u = this.task;
                this.task = this.p.domWriteQueue.queueTask((() => {
                    this.task = null;
                    n.updateTarget(t, i);
                }), de);
                null === u || void 0 === u ? void 0 : u.cancel();
            } else n.updateTarget(t, i);
        }
    }
    $bind(t, e) {
        var i;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.persistentFlags = 97 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        let n = this.targetObserver;
        if (!n) n = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        s = this.sourceExpression;
        const r = this.mode;
        const o = this.interceptor;
        let l = false;
        if (r & fe) {
            l = (r & ce) > 0;
            o.updateTarget(this.value = s.evaluate(t, e, this.locator, l ? o : null), t);
        }
        if (r & ue) n.subscribe(null !== (i = this.targetSubscriber) && void 0 !== i ? i : this.targetSubscriber = new BindingTargetSubscriber(o));
        this.isBound = true;
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(AttributeBinding);

const {toView: me} = t;

const ve = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, i, s, n, r, o) {
        this.interpolation = e;
        this.target = i;
        this.targetProperty = s;
        this.mode = n;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.oL = t;
        this.targetObserver = t.getAccessor(i, s);
        const l = e.expressions;
        const h = this.partBindings = Array(l.length);
        const a = l.length;
        let c = 0;
        for (;a > c; ++c) h[c] = new InterpolationPartBinding(l[c], i, s, r, t, this);
    }
    updateTarget(t, e) {
        const i = this.partBindings;
        const s = this.interpolation.parts;
        const n = i.length;
        let r = "";
        let o = 0;
        if (1 === n) r = s[0] + i[0].value + s[1]; else {
            r = s[0];
            for (;n > o; ++o) r += i[o].value + s[o + 1];
        }
        const l = this.targetObserver;
        const h = 0 === (2 & e) && (4 & l.type) > 0;
        let a;
        if (h) {
            a = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                l.setValue(r, e, this.target, this.targetProperty);
            }), ve);
            null === a || void 0 === a ? void 0 : a.cancel();
            a = null;
        } else l.setValue(r, e, this.target, this.targetProperty);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        const i = this.partBindings;
        const s = i.length;
        let n = 0;
        for (;s > n; ++n) i[n].$bind(t, e);
        this.updateTarget(void 0, t);
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const i = this.partBindings;
        const s = i.length;
        let n = 0;
        for (;s > n; ++n) i[n].interceptor.$unbind(t);
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
    }
}

class InterpolationPartBinding {
    constructor(e, i, s, n, r, o) {
        this.sourceExpression = e;
        this.target = i;
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
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.sourceExpression;
        const n = this.obs;
        const r = 10082 === s.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & me) > 0;
            if (o) n.version++;
            t = s.evaluate(i, this.$scope, this.locator, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t, i);
        }
    }
    handleCollectionChange(t, e) {
        this.owner.updateTarget(void 0, e);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & me) > 0 ? this.interceptor : null);
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
    constructor(e, i, s, n, r, o) {
        this.sourceExpression = e;
        this.target = i;
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
    updateTarget(t, e) {
        var i, s;
        const n = this.target;
        const r = this.p.Node;
        const o = this.value;
        this.value = t;
        if (o instanceof r) null === (i = o.parentNode) || void 0 === i ? void 0 : i.removeChild(o);
        if (t instanceof r) {
            n.textContent = "";
            null === (s = n.parentNode) || void 0 === s ? void 0 : s.insertBefore(t, n);
        } else n.textContent = String(t);
    }
    handleChange(t, e, i) {
        var s;
        if (!this.isBound) return;
        const n = this.sourceExpression;
        const r = this.obs;
        const o = 10082 === n.$kind && 1 === r.count;
        let l = false;
        if (!o) {
            l = (this.mode & me) > 0;
            if (l) r.version++;
            i |= this.strict ? 1 : 0;
            t = n.evaluate(i, this.$scope, this.locator, l ? this.interceptor : null);
            if (l) r.clear();
        }
        if (t === this.value) {
            null === (s = this.task) || void 0 === s ? void 0 : s.cancel();
            this.task = null;
            return;
        }
        const h = 0 === (2 & i);
        if (h) this.queueUpdate(t, i); else this.updateTarget(t, i);
    }
    handleCollectionChange() {
        this.queueUpdate(this.value, 0);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        t |= this.strict ? 1 : 0;
        const i = this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & me) > 0 ? this.interceptor : null);
        if (i instanceof Array) this.observeCollection(i);
        this.updateTarget(i, t);
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
    }
    queueUpdate(t, e) {
        const i = this.task;
        this.task = this.p.domWriteQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t, e);
        }), ve);
        null === i || void 0 === i ? void 0 : i.cancel();
    }
}

s(ContentBinding);

class LetBinding {
    constructor(t, e, i, s, n = false) {
        this.sourceExpression = t;
        this.targetProperty = e;
        this.locator = s;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.target = null;
        this.oL = i;
        this.Y = n;
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.target;
        const n = this.targetProperty;
        const r = s[n];
        this.obs.version++;
        t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
        this.obs.clear();
        if (t !== r) s[n] = t;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        this.target = this.Y ? e.bindingContext : e.overrideContext;
        const i = this.sourceExpression;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        this.target[this.targetProperty] = this.sourceExpression.evaluate(2 | t, e, this.locator, this.interceptor);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(LetBinding);

const {oneTime: ge, toView: pe, fromView: we} = t;

const be = pe | ge;

const xe = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, e, i, s, n, r, o) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = i;
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
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        e |= this.persistentFlags;
        this.sourceExpression.assign(e, this.$scope, this.locator, t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const s = 0 === (2 & i) && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        let r = false;
        if (10082 !== this.sourceExpression.$kind || n.count > 1) {
            r = this.mode > ge;
            if (r) n.version++;
            t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
            if (r) n.clear();
        }
        if (s) {
            ye = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), xe);
            null === ye || void 0 === ye ? void 0 : ye.cancel();
            ye = null;
        } else this.interceptor.updateTarget(t, i);
    }
    $bind(t, e) {
        var i;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 97 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        const n = this.oL;
        const r = this.mode;
        let o = this.targetObserver;
        if (!o) {
            if (r & we) o = n.getObserver(this.target, this.targetProperty); else o = n.getAccessor(this.target, this.targetProperty);
            this.targetObserver = o;
        }
        s = this.sourceExpression;
        const l = this.interceptor;
        const h = (r & pe) > 0;
        if (r & be) l.updateTarget(s.evaluate(t, e, this.locator, h ? l : null), t);
        if (r & we) {
            o.subscribe(null !== (i = this.targetSubscriber) && void 0 !== i ? i : this.targetSubscriber = new BindingTargetSubscriber(l));
            if (!h) l.updateSource(o.getValue(this.target, this.targetProperty), t);
        }
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        ye = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != ye) {
            ye.cancel();
            ye = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(PropertyBinding);

let ye = null;

class RefBinding {
    constructor(t, e, i) {
        this.sourceExpression = t;
        this.target = e;
        this.locator = i;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this);
        this.sourceExpression.assign(t, this.$scope, this.locator, this.target);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        let e = this.sourceExpression;
        if (e.evaluate(t, this.$scope, this.locator, null) === this.target) e.assign(t, this.$scope, this.locator, null);
        e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, i) {
        return;
    }
}

const ke = O.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(U.instance(ke, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Ce = Object.freeze({
    beforeCreate: Ae("beforeCreate"),
    hydrating: Ae("hydrating"),
    hydrated: Ae("hydrated"),
    beforeActivate: Ae("beforeActivate"),
    afterActivate: Ae("afterActivate"),
    beforeDeactivate: Ae("beforeDeactivate"),
    afterDeactivate: Ae("afterDeactivate")
});

function Ae(t) {
    function e(e, i) {
        if (At(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Re(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        ut(Ee, ChildrenDefinition.create(e, i), t.constructor, e);
        pt(t.constructor, Be.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (Rt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Se(t) {
    return t.startsWith(Ee);
}

const Ee = mt("children-observer");

const Be = Object.freeze({
    name: Ee,
    keyFrom: t => `${Ee}:${t}`,
    from(...t) {
        const e = {};
        const i = Array.isArray;
        function s(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function n(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function r(t) {
            if (i(t)) t.forEach(s); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => n(e, t)));
        }
        t.forEach(r);
        return e;
    },
    getAll(t) {
        const e = Ee.length + 1;
        const i = [];
        const s = T(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        while (--n >= 0) {
            h = s[n];
            o = wt(h).filter(Se);
            l = o.length;
            for (let t = 0; t < l; ++t) i[r++] = at(Ee, h, o[t].slice(e));
        }
        return i;
    }
});

const Ie = {
    childList: true
};

class ChildrenDefinition {
    constructor(t, e, i, s, n, r) {
        this.callback = t;
        this.property = e;
        this.options = i;
        this.query = s;
        this.filter = n;
        this.map = r;
    }
    static create(t, e = {}) {
        var i;
        return new ChildrenDefinition(D(e.callback, `${t}Changed`), D(e.property, t), null !== (i = e.options) && void 0 !== i ? i : Ie, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = Te, r = De, o = Pe, l) {
        this.controller = t;
        this.obj = e;
        this.propertyKey = i;
        this.query = n;
        this.filter = r;
        this.map = o;
        this.options = l;
        this.observing = false;
        this.children = void 0;
        this.observer = void 0;
        this.callback = e[s];
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
        return Oe(this.controller, this.query, this.filter, this.map);
    }
}

e()(ChildrenObserver);

function Te(t) {
    return t.host.childNodes;
}

function De(t, e, i) {
    return !!i;
}

function Pe(t, e, i) {
    return i;
}

const $e = {
    optional: true
};

function Oe(t, e, i, s) {
    var n;
    const r = e(t);
    const o = r.length;
    const l = [];
    let h;
    let a;
    let c;
    let u = 0;
    for (;u < o; ++u) {
        h = r[u];
        a = oi.for(h, $e);
        c = null !== (n = null === a || void 0 === a ? void 0 : a.viewModel) && void 0 !== n ? n : null;
        if (i(h, a, c)) l.push(s(h, a, c));
    }
    return l;
}

function Le(t) {
    return function(e) {
        return Ve.define(t, e);
    };
}

function qe(t) {
    return function(e) {
        return Ve.define(Rt(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, i, s, n, r, o, l, h) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
        this.defaultBindingMode = n;
        this.isTemplateController = r;
        this.bindables = o;
        this.noMultiBindings = l;
        this.watches = h;
    }
    get type() {
        return 2;
    }
    static create(e, i) {
        let s;
        let n;
        if (Rt(e)) {
            s = e;
            n = {
                name: s
            };
        } else {
            s = e.name;
            n = e;
        }
        return new CustomAttributeDefinition(i, D(Fe(i, "name"), s), F(Fe(i, "aliases"), n.aliases, i.aliases), Ve.keyFrom(s), D(Fe(i, "defaultBindingMode"), n.defaultBindingMode, i.defaultBindingMode, t.toView), D(Fe(i, "isTemplateController"), n.isTemplateController, i.isTemplateController, false), Dt.from(i, ...Dt.getAll(i), Fe(i, "bindables"), i.bindables, n.bindables), D(Fe(i, "noMultiBindings"), n.noMultiBindings, i.noMultiBindings, false), F(We.getAnnotation(i), i.watches));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        U.transient(i, e).register(t);
        U.aliasTo(i, e).register(t);
        n(s, Ve, i, t);
    }
}

const Ue = vt("custom-attribute");

const _e = t => `${Ue}:${t}`;

const Fe = (t, e) => at(mt(e), t);

const Ve = Object.freeze({
    name: Ue,
    keyFrom: _e,
    isType(t) {
        return At(t) && ct(Ue, t);
    },
    for(t, e) {
        var i;
        return null !== (i = hs(t, _e(e))) && void 0 !== i ? i : void 0;
    },
    define(t, e) {
        const i = CustomAttributeDefinition.create(t, e);
        ut(Ue, i, i.Type);
        ut(Ue, i, i);
        gt(e, Ue);
        return i.Type;
    },
    getDefinition(t) {
        const e = at(Ue, t);
        if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        ut(mt(e), i, t);
    },
    getAnnotation: Fe
});

function Me(t, e) {
    if (!t) throw new Error(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!At(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!At(null === r || void 0 === r ? void 0 : r.value)) throw new Error(`AUR0774:${String(n)}`);
        We.add(l, h);
        if (Ve.isType(l)) Ve.getDefinition(l).watches.push(h);
        if (oi.isType(l)) oi.getDefinition(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const je = L;

const Ne = mt("watch");

const We = Object.freeze({
    name: Ne,
    add(t, e) {
        let i = at(Ne, t);
        if (null == i) ut(Ne, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        var e;
        return null !== (e = at(Ne, t)) && void 0 !== e ? e : je;
    }
});

function He(t) {
    return function(e) {
        return oi.define(t, e);
    };
}

function ze(t) {
    if (void 0 === t) return function(t) {
        ni(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!At(t)) return function(e) {
        ni(e, "shadowOptions", t);
    };
    ni(t, "shadowOptions", {
        mode: "open"
    });
}

function Ge(t) {
    if (void 0 === t) return function(t) {
        ni(t, "containerless", true);
    };
    ni(t, "containerless", true);
}

const Xe = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, a, c, u, f, d, m, v, g, p, w, b, x) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
        this.cache = n;
        this.capture = r;
        this.template = o;
        this.instructions = l;
        this.dependencies = h;
        this.injectable = a;
        this.needsCompile = c;
        this.surrogates = u;
        this.bindables = f;
        this.childrenObservers = d;
        this.containerless = m;
        this.isStrictBinding = v;
        this.shadowOptions = g;
        this.hasSlots = p;
        this.enhance = w;
        this.watches = b;
        this.processContent = x;
    }
    get type() {
        return 1;
    }
    static create(t, e = null) {
        if (null === e) {
            const i = t;
            if (Rt(i)) throw new Error(`AUR0761:${t}`);
            const s = V("name", i, si);
            if (At(i.Type)) e = i.Type; else e = oi.generateType(M(s));
            return new CustomElementDefinition(e, s, F(i.aliases), V("key", i, (() => oi.keyFrom(s))), V("cache", i, Ye), V("capture", i, Je), V("template", i, Ze), F(i.instructions), F(i.dependencies), V("injectable", i, Ze), V("needsCompile", i, Qe), F(i.surrogates), Dt.from(e, i.bindables), Be.from(i.childrenObservers), V("containerless", i, Je), V("isStrictBinding", i, Je), V("shadowOptions", i, Ze), V("hasSlots", i, Je), V("enhance", i, Je), V("watches", i, ti), j("processContent", e, Ze));
        }
        if (Rt(t)) return new CustomElementDefinition(e, t, F(ri(e, "aliases"), e.aliases), oi.keyFrom(t), j("cache", e, Ye), j("capture", e, Je), j("template", e, Ze), F(ri(e, "instructions"), e.instructions), F(ri(e, "dependencies"), e.dependencies), j("injectable", e, Ze), j("needsCompile", e, Qe), F(ri(e, "surrogates"), e.surrogates), Dt.from(e, ...Dt.getAll(e), ri(e, "bindables"), e.bindables), Be.from(...Be.getAll(e), ri(e, "childrenObservers"), e.childrenObservers), j("containerless", e, Je), j("isStrictBinding", e, Je), j("shadowOptions", e, Ze), j("hasSlots", e, Je), j("enhance", e, Je), F(We.getAnnotation(e), e.watches), j("processContent", e, Ze));
        const i = V("name", t, si);
        return new CustomElementDefinition(e, i, F(ri(e, "aliases"), t.aliases, e.aliases), oi.keyFrom(i), N("cache", t, e, Ye), N("capture", t, e, Je), N("template", t, e, Ze), F(ri(e, "instructions"), t.instructions, e.instructions), F(ri(e, "dependencies"), t.dependencies, e.dependencies), N("injectable", t, e, Ze), N("needsCompile", t, e, Qe), F(ri(e, "surrogates"), t.surrogates, e.surrogates), Dt.from(e, ...Dt.getAll(e), ri(e, "bindables"), e.bindables, t.bindables), Be.from(...Be.getAll(e), ri(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), N("containerless", t, e, Je), N("isStrictBinding", t, e, Je), N("shadowOptions", t, e, Ze), N("hasSlots", t, e, Je), N("enhance", t, e, Je), F(t.watches, We.getAnnotation(e), e.watches), N("processContent", t, e, Ze));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Xe.has(t)) return Xe.get(t);
        const e = CustomElementDefinition.create(t);
        Xe.set(t, e);
        ut(ei, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            U.transient(i, e).register(t);
            U.aliasTo(i, e).register(t);
            n(s, oi, i, t);
        }
    }
}

const Ke = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Ye = () => 0;

const Ze = () => null;

const Je = () => false;

const Qe = () => true;

const ti = () => L;

const ei = vt("custom-element");

const ii = t => `${ei}:${t}`;

const si = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const ni = (t, e, i) => {
    ut(mt(e), i, t);
};

const ri = (t, e) => at(mt(e), t);

const oi = Object.freeze({
    name: ei,
    keyFrom: ii,
    isType(t) {
        return At(t) && ct(ei, t);
    },
    for(t, e = Ke) {
        if (void 0 === e.name && true !== e.searchParents) {
            const i = hs(t, ei);
            if (null === i) {
                if (true === e.optional) return null;
                throw new Error(`AUR0762`);
            }
            return i;
        }
        if (void 0 !== e.name) {
            if (true !== e.searchParents) {
                const i = hs(t, ei);
                if (null === i) throw new Error(`AUR0763`);
                if (i.is(e.name)) return i;
                return;
            }
            let i = t;
            let s = false;
            while (null !== i) {
                const t = hs(i, ei);
                if (null !== t) {
                    s = true;
                    if (t.is(e.name)) return t;
                }
                i = vs(i);
            }
            if (s) return;
            throw new Error(`AUR0764`);
        }
        let i = t;
        while (null !== i) {
            const t = hs(i, ei);
            if (null !== t) return t;
            i = vs(i);
        }
        throw new Error(`AUR0765`);
    },
    define(t, e) {
        const i = CustomElementDefinition.create(t, e);
        ut(ei, i, i.Type);
        ut(ei, i, i);
        gt(i.Type, ei);
        return i.Type;
    },
    getDefinition(t) {
        const e = at(ei, t);
        if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
        return e;
    },
    annotate: ni,
    getAnnotation: ri,
    generateName: si,
    createInjectable() {
        const t = function(e, i, s) {
            const n = O.getOrCreateAnnotationParamTypes(e);
            n[s] = t;
            return e;
        };
        t.register = function(e) {
            return {
                resolve(e, i) {
                    if (i.has(t, true)) return i.get(t); else return null;
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
        const e = {};
        return function(i, s = e) {
            const n = class {};
            t.value = i;
            Reflect.defineProperty(n, "name", t);
            if (s !== e) Object.assign(n.prototype, s);
            return n;
        };
    }()
});

const li = mt("processContent");

function hi(t) {
    return void 0 === t ? function(t, e, i) {
        ut(li, ai(t, e), t);
    } : function(e) {
        t = ai(e, t);
        const i = at(ei, e);
        if (void 0 !== i) i.processContent = t; else ut(li, t, e);
        return e;
    };
}

function ai(t, e) {
    if (Rt(e)) e = t[e];
    if (!At(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
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
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (64 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.J;
            const i = ci(t);
            let s = this.tt;
            this.ov = t;
            if (i.length > 0) this.et(i);
            this.tt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!xt.call(e, t) || e[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    et(t) {
        const e = this.obj;
        const i = t.length;
        let s = 0;
        let n;
        for (;s < i; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.J[n] = this.tt;
            e.classList.add(n);
        }
    }
}

function ci(t) {
    if (Rt(t)) return ui(t);
    if ("object" !== typeof t) return L;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...ci(t[s]));
            return i;
        } else return L;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...ui(i)); else e.push(i);
    return e;
}

function ui(t) {
    const e = t.match(/\S+/g);
    if (null === e) return L;
    return e;
}

function fi(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Ve.define({
            name: "class",
            bindables: [ "value" ],
            noMultiBindings: true
        }, (e = class CustomAttributeClass {
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
                this.element.className = ci(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ cs ], e));
        t.register(s);
    }
}

function di(...t) {
    return new ShadowDOMRegistry(t);
}

const mi = O.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Jt))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(gi);
        const i = t.get(mi);
        t.register(U.instance(vi, i.createStyles(this.css, e)));
    }
}

class AdoptedStyleSheetsStylesFactory {
    constructor(t) {
        this.p = t;
        this.cache = new Map;
    }
    createStyles(t, e) {
        return new AdoptedStyleSheetsStyles(this.p, t, this.cache, e);
    }
}

AdoptedStyleSheetsStylesFactory.inject = [ Jt ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Jt ];

const vi = O.createInterface("IShadowDOMStyles");

const gi = O.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: $
})));

class AdoptedStyleSheetsStyles {
    constructor(t, e, i, s = null) {
        this.sharedStyles = s;
        this.styleSheets = e.map((e => {
            let s;
            if (e instanceof t.CSSStyleSheet) s = e; else {
                s = i.get(e);
                if (void 0 === s) {
                    s = new t.CSSStyleSheet;
                    s.replaceSync(e);
                    i.set(e, s);
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
    constructor(t, e, i = null) {
        this.p = t;
        this.localStyles = e;
        this.sharedStyles = i;
    }
    applyTo(t) {
        const e = this.localStyles;
        const i = this.p;
        for (let s = e.length - 1; s > -1; --s) {
            const n = i.document.createElement("style");
            n.innerHTML = e[s];
            t.prepend(n);
        }
        if (null !== this.sharedStyles) this.sharedStyles.applyTo(t);
    }
}

const pi = {
    shadowDOM(t) {
        return Ce.beforeCreate(W, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(mi);
                e.register(U.instance(gi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: wi, exit: bi} = r;

const {wrap: xi, unwrap: yi} = o;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.get = i;
        this.cb = s;
        this.useProxy = n;
        this.interceptor = this;
        this.value = void 0;
        this.isBound = false;
        this.running = false;
        this.oL = e;
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
        const e = this.value;
        const i = this.compute();
        if (!Object.is(i, e)) this.cb.call(t, i, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            wi(this);
            return this.value = yi(this.get.call(void 0, this.useProxy ? xi(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            bi(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, i, s, n) {
        this.scope = t;
        this.locator = e;
        this.oL = i;
        this.expression = s;
        this.callback = n;
        this.interceptor = this;
        this.isBound = false;
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const e = this.expression;
        const i = this.obj;
        const s = this.value;
        const n = 10082 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = e.evaluate(0, this.scope, this.locator, this);
            this.obs.clear();
        }
        if (!Object.is(t, s)) {
            this.value = t;
            this.callback.call(i, t, s, i);
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

const ki = O.createInterface("ILifecycleHooks");

class LifecycleHooksEntry {
    constructor(t, e) {
        this.definition = t;
        this.instance = e;
    }
}

class LifecycleHooksDefinition {
    constructor(t, e) {
        this.Type = t;
        this.propertyNames = e;
    }
    static create(t, e) {
        const i = new Set;
        let s = e.prototype;
        while (s !== Object.prototype) {
            for (const t of Object.getOwnPropertyNames(s)) if ("constructor" !== t) i.add(t);
            s = Object.getPrototypeOf(s);
        }
        return new LifecycleHooksDefinition(e, i);
    }
    register(t) {
        U.singleton(ki, this.Type).register(t);
    }
}

const Ci = new WeakMap;

const Ai = mt("lifecycle-hooks");

const Ri = Object.freeze({
    name: Ai,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        ut(Ai, i, e);
        gt(e, Ai);
        return i.Type;
    },
    resolve(t) {
        let e = Ci.get(t);
        if (void 0 === e) {
            Ci.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(ki) : t.has(ki, false) ? i.getAll(ki).concat(t.getAll(ki)) : i.getAll(ki);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = at(Ai, n.constructor);
                o = new LifecycleHooksEntry(r, n);
                for (l of r.propertyNames) {
                    h = e[l];
                    if (void 0 === h) e[l] = [ o ]; else h.push(o);
                }
            }
        }
        return e;
    }
});

class LifecycleHooksLookupImpl {}

function Si() {
    return function t(e) {
        return Ri.define({}, e);
    };
}

const Ei = O.createInterface("IViewFactory");

class ViewFactory {
    constructor(t, e) {
        this.isCaching = false;
        this.cache = null;
        this.cacheSize = -1;
        this.name = e.name;
        this.container = t;
        this.def = e;
    }
    setCacheSize(t, e) {
        if (t) {
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (Rt(t)) t = parseInt(t, 10);
            if (-1 === this.cacheSize || !e) this.cacheSize = t;
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
        const e = this.cache;
        let i;
        if (null != e && e.length > 0) {
            i = e.pop();
            return i;
        }
        i = Controller.$view(this, t);
        return i;
    }
}

ViewFactory.maxCacheSize = 65535;

const Bi = new WeakSet;

function Ii(t) {
    return !Bi.has(t);
}

function Ti(t) {
    Bi.add(t);
    return CustomElementDefinition.create(t);
}

const Di = vt("views");

const Pi = Object.freeze({
    name: Di,
    has(t) {
        return At(t) && (ct(Di, t) || "$views" in t);
    },
    get(t) {
        if (At(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Ii).map(Ti);
            for (const e of i) Pi.add(t, e);
        }
        let e = at(Di, t);
        if (void 0 === e) ut(Di, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = at(Di, t);
        if (void 0 === s) ut(Di, s = [ i ], t); else s.push(i);
        return s;
    }
});

function $i(t) {
    return function(e) {
        Pi.add(e, t);
    };
}

const Oi = O.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.it = new WeakMap;
        this.st = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Pi.has(t.constructor) ? Pi.get(t.constructor) : [];
            const s = At(e) ? e(t, i) : this.nt(i, e);
            return this.rt(t, i, s);
        }
        return null;
    }
    rt(t, e, i) {
        let s = this.it.get(t);
        let n;
        if (void 0 === s) {
            s = {};
            this.it.set(t, s);
        } else n = s[i];
        if (void 0 === n) {
            const r = this.ot(t, e, i);
            n = oi.define(oi.getDefinition(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[i] = n;
        }
        return n;
    }
    ot(t, e, i) {
        let s = this.st.get(t.constructor);
        let n;
        if (void 0 === s) {
            s = {};
            this.st.set(t.constructor, s);
        } else n = s[i];
        if (void 0 === n) {
            n = oi.define(this.lt(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const s = this.viewModel;
                    t.scope = l.fromParent(t.scope, s);
                    if (void 0 !== s.define) return s.define(t, e, i);
                }
            });
            const r = n.prototype;
            if ("hydrating" in t) r.hydrating = function t(e) {
                this.viewModel.hydrating(e);
            };
            if ("hydrated" in t) r.hydrated = function t(e) {
                this.viewModel.hydrated(e);
            };
            if ("created" in t) r.created = function t(e) {
                this.viewModel.created(e);
            };
            if ("binding" in t) r.binding = function t(e, i, s) {
                return this.viewModel.binding(e, i, s);
            };
            if ("bound" in t) r.bound = function t(e, i, s) {
                return this.viewModel.bound(e, i, s);
            };
            if ("attaching" in t) r.attaching = function t(e, i, s) {
                return this.viewModel.attaching(e, i, s);
            };
            if ("attached" in t) r.attached = function t(e, i) {
                return this.viewModel.attached(e, i);
            };
            if ("detaching" in t) r.detaching = function t(e, i, s) {
                return this.viewModel.detaching(e, i, s);
            };
            if ("unbinding" in t) r.unbinding = function t(e, i, s) {
                return this.viewModel.unbinding(e, i, s);
            };
            if ("dispose" in t) r.dispose = function t() {
                this.viewModel.dispose();
            };
            s[i] = n;
        }
        return n;
    }
    nt(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    lt(t, e) {
        const i = t.find((t => t.name === e));
        if (void 0 === i) throw new Error(`Could not find view: ${e}`);
        return i;
    }
}

const Li = O.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ht = new WeakMap;
        this.ct = new WeakMap;
        this.ut = (this.ft = t.root).get(Jt);
        this.dt = new FragmentNodeSequence(this.ut, this.ut.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.ft.getAll(Ds, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), bt()) : this.rs;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ht;
            const n = e.get(Ts);
            let r = s.get(t);
            if (null == r) s.set(t, r = n.compile(t, e, i)); else e.register(...r.dependencies);
            return r;
        }
        return t;
    }
    getViewFactory(t, e) {
        return new ViewFactory(e, CustomElementDefinition.getOrCreate(t));
    }
    createNodes(t) {
        if (true === t.enhance) return new FragmentNodeSequence(this.ut, t.template);
        let e;
        const i = this.ct;
        if (i.has(t)) e = i.get(t); else {
            const s = this.ut;
            const n = s.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof s.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (Rt(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            i.set(t, e);
        }
        return null == e ? this.dt : new FragmentNodeSequence(this.ut, e.cloneNode(true));
    }
    render(t, e, i, s) {
        const n = i.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw new Error(`AUR0757:${o}<>${n.length}`);
        let l = 0;
        let h = 0;
        let a = 0;
        let c;
        let u;
        let f;
        if (o > 0) while (o > l) {
            c = n[l];
            f = e[l];
            h = 0;
            a = c.length;
            while (a > h) {
                u = c[h];
                r[u.type].render(t, f, u);
                ++h;
            }
            ++l;
        }
        if (void 0 !== s && null !== s) {
            c = i.surrogates;
            if ((a = c.length) > 0) {
                h = 0;
                while (a > h) {
                    u = c[h];
                    r[u.type].render(t, s, u);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ W ];

var qi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(qi || (qi = {}));

const Ui = {
    optional: true
};

const _i = new WeakMap;

class Controller {
    constructor(t, e, i, s, n, r, o) {
        this.container = t;
        this.vmKind = e;
        this.definition = i;
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
        this.r = t.root.get(Li);
        switch (e) {
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
        return _i.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (_i.has(e)) return _i.get(e);
        n = null !== n && void 0 !== n ? n : oi.getDefinition(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(z(Ji));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        t.registerResolver(Ji, new G("IHydrationContext", new HydrationContext(o, s, l)));
        _i.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (_i.has(e)) return _i.get(e);
        s = null !== s && void 0 !== s ? s : Ve.getDefinition(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        _i.set(e, n);
        n.yt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = null !== e && void 0 !== e ? e : null;
        i.kt();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.viewModel;
        let r = this.definition;
        this.scope = l.create(n, null, true);
        if (r.watches.length > 0) Wi(this, i, r, n);
        Vi(this, r, s, n);
        this.gt = Mi(this, r, n);
        if (this.hooks.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Ri.resolve(i);
        r.register(i);
        if (null !== r.injectable) i.registerResolver(r.injectable, new G("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(es, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Ct = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n} = e;
        const r = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = oi.for(this.host, Ui))) this.host = this.container.root.get(Jt).document.createElement(this.definition.name);
        as(this.host, oi.name, this);
        as(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != r) throw new Error(`AUR0501`);
            as(this.shadowRoot = this.host.attachShadow(null !== i && void 0 !== i ? i : Gi), oi.name, this);
            as(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != r) {
            as(r, oi.name, this);
            as(r, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(is, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ct, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ts, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    yt() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) Wi(this, this.container, t, e);
        Vi(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Ri.resolve(this.container);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    kt() {
        this.Ct = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Ct.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Ct)).findTargets(), this.Ct, void 0);
    }
    activate(t, e, i, s) {
        switch (this.state) {
          case 0:
          case 8:
            if (!(null === e || e.isActive)) return;
            this.state = 1;
            break;

          case 2:
            return;

          case 32:
            throw new Error(`AUR0502:${this.name}`);

          default:
            throw new Error(`AUR0503:${this.name} ${Yi(this.state)}`);
        }
        this.parent = e;
        i |= 2;
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
        if (this.isStrictBinding) i |= 1;
        this.$initiator = t;
        this.$flags = i;
        this.At();
        if (this.hooks.hasBinding) {
            const t = this.viewModel.binding(this.$initiator, this.parent, this.$flags);
            if (t instanceof Promise) {
                this.Rt();
                t.then((() => {
                    this.bind();
                })).catch((t => {
                    this.St(t);
                }));
                return this.$promise;
            }
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let t = 0;
        let e = this.gt.length;
        let i;
        if (e > 0) while (e > t) {
            this.gt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            e = this.bindings.length;
            while (e > t) {
                this.bindings[t].$bind(this.$flags, this.scope);
                ++t;
            }
        }
        if (this.hooks.hasBound) {
            i = this.viewModel.bound(this.$initiator, this.parent, this.$flags);
            if (i instanceof Promise) {
                this.Rt();
                i.then((() => {
                    this.isBound = true;
                    this.Et();
                })).catch((t => {
                    this.St(t);
                }));
                return;
            }
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
                let e = 0;
                for (;e < t.length; ++e) this.location.parentNode.insertBefore(t[e], this.location);
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
                const e = t.has(vi, false) ? t.get(vi) : t.get(gi);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        if (this.hooks.hasAttaching) {
            const t = this.viewModel.attaching(this.$initiator, this.parent, this.$flags);
            if (t instanceof Promise) {
                this.Rt();
                this.At();
                t.then((() => {
                    this.It();
                })).catch((t => {
                    this.St(t);
                }));
            }
        }
        if (null !== this.children) {
            let t = 0;
            for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        }
        this.It();
    }
    deactivate(t, e, i) {
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
            throw new Error(`AUR0505:${this.name} ${Yi(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Tt();
        let s = 0;
        if (this.gt.length) for (;s < this.gt.length; ++s) this.gt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (this.hooks.hasDetaching) {
            const e = this.viewModel.detaching(this.$initiator, this.parent, this.$flags);
            if (e instanceof Promise) {
                this.Rt();
                t.Tt();
                e.then((() => {
                    t.Dt();
                })).catch((e => {
                    t.St(e);
                }));
            }
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
        let e = 0;
        if (null !== this.bindings) for (;e < this.bindings.length; ++e) this.bindings[e].$unbind(t);
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
        this.Pt();
    }
    Rt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Rt();
        }
    }
    Pt() {
        if (void 0 !== this.$promise) {
            ss = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            ss();
            ss = void 0;
        }
    }
    St(t) {
        if (void 0 !== this.$promise) {
            ns = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            ns(t);
            ns = void 0;
        }
        if (this.$initiator !== this) this.parent.St(t);
    }
    At() {
        ++this.wt;
        if (this.$initiator !== this) this.parent.At();
    }
    It() {
        if (0 === --this.wt) {
            if (this.hooks.hasAttached) {
                rs = this.viewModel.attached(this.$initiator, this.$flags);
                if (rs instanceof Promise) {
                    this.Rt();
                    rs.then((() => {
                        this.state = 2;
                        this.Pt();
                        if (this.$initiator !== this) this.parent.It();
                    })).catch((t => {
                        this.St(t);
                    }));
                    rs = void 0;
                    return;
                }
                rs = void 0;
            }
            this.state = 2;
            this.Pt();
        }
        if (this.$initiator !== this) this.parent.It();
    }
    Tt() {
        ++this.bt;
    }
    Dt() {
        if (0 === --this.bt) {
            this.$t();
            this.removeNodes();
            let t = this.$initiator.head;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    rs = t.viewModel.unbinding(t.$initiator, t.parent, t.$flags);
                    if (rs instanceof Promise) {
                        this.Rt();
                        this.$t();
                        rs.then((() => {
                            this.Ot();
                        })).catch((t => {
                            this.St(t);
                        }));
                    }
                    rs = void 0;
                }
                t = t.next;
            }
            this.Ot();
        }
    }
    $t() {
        ++this.xt;
    }
    Ot() {
        if (0 === --this.xt) {
            let t = this.$initiator.head;
            let e = null;
            while (null !== t) {
                if (t !== this) {
                    t.isBound = false;
                    t.unbind();
                }
                e = t.next;
                t.next = null;
                t = e;
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
            return Ve.getDefinition(this.viewModel.constructor).name === t;

          case 0:
            return oi.getDefinition(this.viewModel.constructor).name === t;

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
            as(t, oi.name, this);
            as(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            as(t, oi.name, this);
            as(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            as(t, oi.name, this);
            as(t, this.definition.key, this);
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
            this.children.forEach(Qi);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            _i.delete(this.viewModel);
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
            const {children: e} = this;
            for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
        }
    }
}

function Fi(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Vi(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const a = Fi(s);
        const c = t.container;
        const u = c.has(h, true) ? c.get(h) : null;
        for (;l < o; ++l) {
            e = r[l];
            if (void 0 === a[e]) {
                i = n[e];
                a[e] = new BindableObserver(s, e, i.callback, i.set, t, u);
            }
        }
    }
}

function Mi(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = Fi(i);
        const o = [];
        let l;
        let h = 0;
        let a;
        for (;h < r; ++h) {
            l = n[h];
            if (null == e[l]) {
                a = s[l];
                o[o.length] = e[l] = new ChildrenObserver(t, i, l, a.callback, a.query, a.filter, a.map, a.options);
            }
        }
        return o;
    }
    return L;
}

const ji = new Map;

const Ni = t => {
    let e = ji.get(t);
    if (null == e) {
        e = new u(t, 0);
        ji.set(t, e);
    }
    return e;
};

function Wi(t, e, i, s) {
    const n = e.get(a);
    const r = e.get(c);
    const o = i.watches;
    const h = 0 === t.vmKind ? t.scope : l.create(s, null, true);
    const u = o.length;
    let f;
    let d;
    let m;
    let v = 0;
    for (;u > v; ++v) {
        ({expression: f, callback: d} = o[v]);
        d = At(d) ? d : Reflect.get(s, d);
        if (!At(d)) throw new Error(`AUR0506:${String(d)}`);
        if (At(f)) t.addBinding(new ComputedWatcher(s, n, f, d, true)); else {
            m = Rt(f) ? r.parse(f, 8) : Ni(f);
            t.addBinding(new ExpressionWatcher(h, e, n, m, d));
        }
    }
}

function Hi(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function zi(t) {
    return nt(t) && oi.isType(t.constructor);
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

const Gi = {
    mode: "open"
};

var Xi;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(Xi || (Xi = {}));

var Ki;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Ki || (Ki = {}));

function Yi(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Zi = O.createInterface("IController");

const Ji = O.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function Qi(t) {
    t.dispose();
}

function ts(t) {
    t.instance.created(this.viewModel, this);
}

function es(t) {
    t.instance.hydrating(this.viewModel, this);
}

function is(t) {
    t.instance.hydrated(this.viewModel, this);
}

let ss;

let ns;

let rs;

const os = O.createInterface("IAppRoot");

const ls = O.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.Lt = 0;
        this.qt = null;
        this.Pt = null;
        this.Ut = t.scopeTo("WorkTracker");
    }
    start() {
        this.Ut.trace(`start(stack:${this.Lt})`);
        ++this.Lt;
    }
    finish() {
        this.Ut.trace(`finish(stack:${this.Lt})`);
        if (0 === --this.Lt) {
            const t = this.Pt;
            if (null !== t) {
                this.Pt = this.qt = null;
                t();
            }
        }
    }
    wait() {
        this.Ut.trace(`wait(stack:${this.Lt})`);
        if (null === this.qt) {
            if (0 === this.Lt) return Promise.resolve();
            this.qt = new Promise((t => {
                this.Pt = t;
            }));
        }
        return this.qt;
    }
}

WorkTracker.inject = [ X ];

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this._t = void 0;
        this.host = t.host;
        this.work = i.get(ls);
        s.prepare(this);
        i.registerResolver(e.HTMLElement, i.registerResolver(e.Element, i.registerResolver(cs, new G("ElementResolver", t.host))));
        this._t = K(this.Ft("beforeCreate"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (oi.isType(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return K(this.Ft("hydrating"), (() => {
                o.hS(null);
                return K(this.Ft("hydrated"), (() => {
                    o.hC();
                    this._t = void 0;
                }));
            }));
        }));
    }
    activate() {
        return K(this._t, (() => K(this.Ft("beforeActivate"), (() => K(this.controller.activate(this.controller, null, 2, void 0), (() => this.Ft("afterActivate")))))));
    }
    deactivate() {
        return K(this.Ft("beforeDeactivate"), (() => K(this.controller.deactivate(this.controller, null, 0), (() => this.Ft("afterDeactivate")))));
    }
    Ft(t) {
        return Y(...this.container.getAll(ke).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        var t;
        null === (t = this.controller) || void 0 === t ? void 0 : t.dispose();
    }
}

class Refs {}

function hs(t, e) {
    var i, s;
    return null !== (s = null === (i = t.$au) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : null;
}

function as(t, e, i) {
    var s;
    var n;
    (null !== (s = (n = t).$au) && void 0 !== s ? s : n.$au = new Refs)[e] = i;
}

const cs = O.createInterface("INode");

const us = O.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(os, true)) return t.get(os).host;
    return t.get(Jt).document;
}))));

const fs = O.createInterface("IRenderLocation");

var ds;

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
})(ds || (ds = {}));

const ms = new WeakMap;

function vs(t) {
    if (ms.has(t)) return ms.get(t);
    let e = 0;
    let i = t.nextSibling;
    while (null !== i) {
        if (8 === i.nodeType) switch (i.textContent) {
          case "au-start":
            ++e;
            break;

          case "au-end":
            if (0 === e--) return i;
        }
        i = i.nextSibling;
    }
    if (null === t.parentNode && 11 === t.nodeType) {
        const e = oi.for(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return vs(e.host);
    }
    return t.parentNode;
}

function gs(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ms.set(i[t], e);
    } else ms.set(t, e);
}

function ps(t) {
    if (ws(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function ws(t) {
    return "au-end" === t.textContent;
}

class FragmentNodeSequence {
    constructor(t, e) {
        this.platform = t;
        this.fragment = e;
        this.isMounted = false;
        this.isLinked = false;
        this.next = void 0;
        this.refNode = void 0;
        const i = e.querySelectorAll(".au");
        let s = 0;
        let n = i.length;
        let r;
        let o = this.targets = Array(n);
        while (n > s) {
            r = i[s];
            if ("AU-M" === r.nodeName) o[s] = ps(r); else o[s] = r;
            ++s;
        }
        const l = e.childNodes;
        const h = this.childNodes = Array(n = l.length);
        s = 0;
        while (n > s) {
            h[s] = l[s];
            ++s;
        }
        this.firstChild = e.firstChild;
        this.lastChild = e.lastChild;
    }
    findTargets() {
        return this.targets;
    }
    insertBefore(t) {
        if (this.isLinked && !!this.refNode) this.addToLinked(); else {
            const e = t.parentNode;
            if (this.isMounted) {
                let i = this.firstChild;
                let s;
                const n = this.lastChild;
                while (null != i) {
                    s = i.nextSibling;
                    e.insertBefore(i, t);
                    if (i === n) break;
                    i = s;
                }
            } else {
                this.isMounted = true;
                t.parentNode.insertBefore(this.fragment, t);
            }
        }
    }
    appendTo(t, e = false) {
        if (this.isMounted) {
            let e = this.firstChild;
            let i;
            const s = this.lastChild;
            while (null != e) {
                i = e.nextSibling;
                t.appendChild(e);
                if (e === s) break;
                e = i;
            }
        } else {
            this.isMounted = true;
            if (!e) t.appendChild(this.fragment);
        }
    }
    remove() {
        if (this.isMounted) {
            this.isMounted = false;
            const t = this.fragment;
            const e = this.lastChild;
            let i;
            let s = this.firstChild;
            while (null !== s) {
                i = s.nextSibling;
                t.appendChild(s);
                if (s === e) break;
                s = i;
            }
        }
    }
    addToLinked() {
        const t = this.refNode;
        const e = t.parentNode;
        if (this.isMounted) {
            let i = this.firstChild;
            let s;
            const n = this.lastChild;
            while (null != i) {
                s = i.nextSibling;
                e.insertBefore(i, t);
                if (i === n) break;
                i = s;
            }
        } else {
            this.isMounted = true;
            e.insertBefore(this.fragment, t);
        }
    }
    unlink() {
        this.isLinked = false;
        this.next = void 0;
        this.refNode = void 0;
    }
    link(t) {
        this.isLinked = true;
        if (ws(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const bs = O.createInterface("IWindow", (t => t.callback((t => t.get(Jt).window))));

const xs = O.createInterface("ILocation", (t => t.callback((t => t.get(bs).location))));

const ys = O.createInterface("IHistory", (t => t.callback((t => t.get(bs).history))));

const ks = {
    [f.capturing]: {
        capture: true
    },
    [f.bubbling]: {
        capture: false
    }
};

class ListenerOptions {
    constructor(t, e, i) {
        this.prevent = t;
        this.strategy = e;
        this.expAsHandler = i;
    }
}

class Listener {
    constructor(t, e, i, s, n, r, o) {
        this.platform = t;
        this.targetEvent = e;
        this.sourceExpression = i;
        this.target = s;
        this.eventDelegator = n;
        this.locator = r;
        this.Vt = o;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let i = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        delete e.$event;
        if (this.Vt.expAsHandler) {
            if (!At(i)) throw new Error(`Handler of "${this.targetEvent}" event is not a function.`);
            i = i(t);
        }
        if (true !== i && this.Vt.prevent) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        const i = this.sourceExpression;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        if (this.Vt.strategy === f.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(us), this.target, this.targetEvent, this, ks[this.Vt.strategy]);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.Vt.strategy === f.none) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, i) {
        return;
    }
}

const Cs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = Cs) {
        this.Mt = t;
        this.jt = e;
        this.Vt = i;
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
        const e = true === this.Vt.capture ? this.Wt : this.Ht;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = bt());
        return i;
    }
    handleEvent(t) {
        const e = true === this.Vt.capture ? this.Wt : this.Ht;
        const i = t.composedPath();
        if (true === this.Vt.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.jt];
            if (void 0 === n) continue;
            if (At(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, i, s) {
        this.Kt = t;
        this.Yt = e;
        this.jt = i;
        t.zt();
        e[i] = s;
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
    subscribe(t, e) {
        this.target = t;
        this.handler = e;
        let i;
        for (i of this.config.events) t.addEventListener(i, e);
    }
    dispose() {
        const {target: t, handler: e} = this;
        let i;
        if (null !== t && null !== e) for (i of this.config.events) t.removeEventListener(i, e);
        this.target = this.handler = null;
    }
}

const As = O.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Zt = bt();
    }
    addEventListener(t, e, i, s, n) {
        var r;
        var o;
        const l = null !== (r = (o = this.Zt)[i]) && void 0 !== r ? r : o[i] = new Map;
        let h = l.get(t);
        if (void 0 === h) l.set(t, h = new ListenerTracker(t, i, n));
        return new DelegateSubscription(h, h.Xt(e), i, s);
    }
    dispose() {
        for (const t in this.Zt) {
            const e = this.Zt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Rs = O.createInterface("IProjections");

const Ss = O.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var Es;

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
})(Es || (Es = {}));

const Bs = O.createInterface("Instruction");

function Is(t) {
    const e = t.type;
    return Rt(e) && 2 === e.length;
}

class InterpolationInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rf";
    }
}

class PropertyBindingInstruction {
    constructor(t, e, i) {
        this.from = t;
        this.to = e;
        this.mode = i;
    }
    get type() {
        return "rg";
    }
}

class IteratorBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rk";
    }
}

class CallBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rh";
    }
}

class RefBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rj";
    }
}

class SetPropertyInstruction {
    constructor(t, e) {
        this.value = t;
        this.to = e;
    }
    get type() {
        return "re";
    }
}

class HydrateElementInstruction {
    constructor(t, e, i, s, n, r) {
        this.res = t;
        this.alias = e;
        this.props = i;
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
    constructor(t, e, i) {
        this.res = t;
        this.alias = e;
        this.props = i;
    }
    get type() {
        return "rb";
    }
}

class HydrateTemplateController {
    constructor(t, e, i, s) {
        this.def = t;
        this.res = e;
        this.alias = i;
        this.props = s;
    }
    get type() {
        return "rc";
    }
}

class HydrateLetElementInstruction {
    constructor(t, e) {
        this.instructions = t;
        this.toBindingContext = e;
    }
    get type() {
        return "rd";
    }
}

class LetBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "ri";
    }
}

class TextBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.strict = e;
    }
    get type() {
        return "ha";
    }
}

class ListenerBindingInstruction {
    constructor(t, e, i, s) {
        this.from = t;
        this.to = e;
        this.preventDefault = i;
        this.strategy = s;
    }
    get type() {
        return "hb";
    }
}

class StylePropertyBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "hd";
    }
}

class SetAttributeInstruction {
    constructor(t, e) {
        this.value = t;
        this.to = e;
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
    constructor(t, e, i) {
        this.attr = t;
        this.from = e;
        this.to = i;
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

const Ts = O.createInterface("ITemplateCompiler");

const Ds = O.createInterface("IRenderer");

function Ps(t) {
    return function e(i) {
        i.register = function(t) {
            U.singleton(Ds, this).register(t);
        };
        St(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function $s(t, e, i) {
    if (Rt(e)) return t.parse(e, i);
    return e;
}

function Os(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function Ls(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return oi.for(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return oi.for(t).viewModel;

      default:
        {
            const i = Ve.for(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = oi.for(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let qs = class SetPropertyRenderer {
    render(t, e, i) {
        const s = Os(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value, 2); else s[i.to] = i.value;
    }
};

qs = lt([ Ps("re") ], qs);

let Us = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Li, Jt ];
    }
    render(t, e, i) {
        let s;
        let n;
        let r;
        let o;
        const l = i.res;
        const h = i.projections;
        const a = t.container;
        switch (typeof l) {
          case "string":
            s = a.find(oi, l);
            if (null == s) throw new Error(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const c = i.containerless || s.containerless;
        const u = c ? ps(e) : null;
        const f = un(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        f.registerResolver(n, new G(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        as(e, s.key, o);
        const d = this.r.renderers;
        const m = i.props;
        const v = m.length;
        let g = 0;
        let p;
        while (v > g) {
            p = m[g];
            d[p.type].render(t, o, p);
            ++g;
        }
        t.addChild(o);
    }
};

Us = lt([ Ps("ra") ], Us);

let _s = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Li, Jt ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ve, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = fn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(t.container, r, e, n);
        as(e, n.key, o);
        const l = this.r.renderers;
        const h = i.props;
        const a = h.length;
        let c = 0;
        let u;
        while (a > c) {
            u = h[c];
            l[u.type].render(t, o, u);
            ++c;
        }
        t.addChild(o);
    }
};

_s = lt([ Ps("rb") ], _s);

let Fs = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Li, Jt ];
    }
    render(t, e, i) {
        var s;
        let n = t.container;
        let r;
        switch (typeof i.res) {
          case "string":
            r = n.find(Ve, i.res);
            if (null == r) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            r = i.res;
        }
        const o = this.r.getViewFactory(i.def, n);
        const l = ps(e);
        const h = fn(this.p, r, t, e, i, o, l);
        const a = Controller.$attr(t.container, h, e, r);
        as(l, r.key, a);
        null === (s = h.link) || void 0 === s ? void 0 : s.call(h, t, a, e, i);
        const c = this.r.renderers;
        const u = i.props;
        const f = u.length;
        let d = 0;
        let m;
        while (f > d) {
            m = u[d];
            c[m.type].render(t, a, m);
            ++d;
        }
        t.addChild(a);
    }
};

Fs = lt([ Ps("rc") ], Fs);

let Vs = class LetElementRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        e.remove();
        const s = i.instructions;
        const n = i.toBindingContext;
        const r = t.container;
        const o = s.length;
        let l;
        let h;
        let a;
        let c = 0;
        while (o > c) {
            l = s[c];
            h = $s(this.ep, l.from, 8);
            a = new LetBinding(h, l.to, this.oL, r, n);
            t.addBinding(38962 === h.$kind ? Xs(a, h, r) : a);
            ++c;
        }
    }
};

Vs.inject = [ c, a ];

Vs = lt([ Ps("rd") ], Vs);

let Ms = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = $s(this.ep, i.from, 8 | 4);
        const n = new CallBinding(s, Os(e), i.to, this.oL, t.container);
        t.addBinding(38962 === s.$kind ? Xs(n, s, t.container) : n);
    }
};

Ms.inject = [ c, a ];

Ms = lt([ Ps("rh") ], Ms);

let js = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = $s(this.ep, i.from, 8);
        const n = new RefBinding(s, Ls(e, i.to), t.container);
        t.addBinding(38962 === s.$kind ? Xs(n, s, t.container) : n);
    }
};

js.inject = [ c ];

js = lt([ Ps("rj") ], js);

let Ns = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = e.container;
        const r = $s(this.ep, s.from, 1);
        const o = new InterpolationBinding(this.oL, r, Os(i), s.to, t.toView, n, this.p.domWriteQueue);
        const l = o.partBindings;
        const h = l.length;
        let a = 0;
        let c;
        for (;h > a; ++a) {
            c = l[a];
            if (38962 === c.sourceExpression.$kind) l[a] = Xs(c, c.sourceExpression, n);
        }
        e.addBinding(o);
    }
};

Ns.inject = [ c, a, Jt ];

Ns = lt([ Ps("rf") ], Ns);

let Ws = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = $s(this.ep, i.from, 8);
        const n = new PropertyBinding(s, Os(e), i.to, i.mode, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === s.$kind ? Xs(n, s, t.container) : n);
    }
};

Ws.inject = [ c, a, Jt ];

Ws = lt([ Ps("rg") ], Ws);

let Hs = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = $s(this.ep, s.from, 2);
        const r = new PropertyBinding(n, Os(i), s.to, t.toView, this.oL, e.container, this.p.domWriteQueue);
        e.addBinding(38962 === n.iterable.$kind ? Xs(r, n.iterable, e.container) : r);
    }
};

Hs.inject = [ c, a, Jt ];

Hs = lt([ Ps("rk") ], Hs);

let zs = 0;

const Gs = [];

function Xs(t, e, i) {
    while (e instanceof d) {
        Gs[zs++] = e;
        e = e.expression;
    }
    while (zs > 0) {
        const e = Gs[--zs];
        const s = i.get(e.behaviorKey);
        if (s instanceof m) t = s.construct(t, e);
    }
    Gs.length = 0;
    return t;
}

let Ks = class TextBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = e.nextSibling;
        const r = e.parentNode;
        const o = this.p.document;
        const l = $s(this.ep, i.from, 1);
        const h = l.parts;
        const a = l.expressions;
        const c = a.length;
        let u = 0;
        let f = h[0];
        let d;
        let m;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;c > u; ++u) {
            m = a[u];
            d = new ContentBinding(m, r.insertBefore(o.createTextNode(""), n), s, this.oL, this.p, i.strict);
            t.addBinding(38962 === m.$kind ? Xs(d, m, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Ks.inject = [ c, a, Jt ];

Ks = lt([ Ps("ha") ], Ks);

const Ys = O.createInterface("IListenerBehaviorOptions", (t => t.singleton(ListenerBehaviorOptions)));

class ListenerBehaviorOptions {
    constructor() {
        this.expAsHandler = false;
    }
}

let Zs = class ListenerBindingRenderer {
    constructor(t, e, i, s) {
        this.ep = t;
        this.Jt = e;
        this.p = i;
        this.Qt = s;
    }
    render(t, e, i) {
        const s = $s(this.ep, i.from, 4);
        const n = new Listener(this.p, i.to, s, e, this.Jt, t.container, new ListenerOptions(i.preventDefault, i.strategy, this.Qt.expAsHandler));
        t.addBinding(38962 === s.$kind ? Xs(n, s, t.container) : n);
    }
};

Zs.inject = [ c, As, Jt, Ys ];

Zs = lt([ Ps("hb") ], Zs);

let Js = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Js = lt([ Ps("he") ], Js);

let Qs = class SetClassAttributeRenderer {
    render(t, e, i) {
        rn(e.classList, i.value);
    }
};

Qs = lt([ Ps("hf") ], Qs);

let tn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

tn = lt([ Ps("hg") ], tn);

let en = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = $s(this.ep, s.from, 8);
        const r = new PropertyBinding(n, i.style, s.to, t.toView, this.oL, e.container, this.p.domWriteQueue);
        e.addBinding(38962 === n.$kind ? Xs(r, n, e.container) : r);
    }
};

en.inject = [ c, a, Jt ];

en = lt([ Ps("hd") ], en);

let sn = class AttributeBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(e, i, s) {
        const n = $s(this.ep, s.from, 8);
        const r = new AttributeBinding(n, i, s.attr, s.to, t.toView, this.oL, e.container);
        e.addBinding(38962 === n.$kind ? Xs(r, n, e.container) : r);
    }
};

sn.inject = [ c, a ];

sn = lt([ Ps("hc") ], sn);

let nn = class SpreadRenderer {
    constructor(t, e) {
        this.te = t;
        this.r = e;
    }
    static get inject() {
        return [ Ts, Li ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(Ji);
        const r = this.r.renderers;
        const o = t => {
            let e = t;
            let i = n;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw new Error("No scope context for spread binding.");
            return i;
        };
        const l = i => {
            var s, n;
            const h = o(i);
            const a = on(h);
            const c = this.te.compileSpread(h.controller.definition, null !== (n = null === (s = h.instruction) || void 0 === s ? void 0 : s.captures) && void 0 !== n ? n : L, h.controller.container, e);
            let u;
            for (u of c) switch (u.type) {
              case "hs":
                l(i + 1);
                break;

              case "hp":
                r[u.instructions.type].render(a, oi.for(e), u.instructions);
                break;

              default:
                r[u.type].render(a, e, u);
            }
            t.addBinding(a);
        };
        l(0);
    }
};

nn = lt([ Ps("hs") ], nn);

class SpreadBinding {
    constructor(t, e) {
        this.ee = t;
        this.ie = e;
        this.interceptor = this;
        this.isBound = false;
        this.ctrl = e.controller;
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
    $bind(t, e) {
        var i;
        if (this.isBound) return;
        this.isBound = true;
        const s = this.$scope = null !== (i = this.ie.controller.scope.parentScope) && void 0 !== i ? i : void 0;
        if (null == s) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.ee.forEach((e => e.$bind(t, s)));
    }
    $unbind(t) {
        this.ee.forEach((e => e.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.ee.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function rn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const on = t => new SpreadBinding([], t);

const ln = "IController";

const hn = "IInstruction";

const an = "IRenderLocation";

const cn = "IAuSlotsInfo";

function un(t, e, i, s, n, r) {
    const o = e.container.createChild();
    o.registerResolver(t.HTMLElement, o.registerResolver(t.Element, o.registerResolver(cs, new G("ElementResolver", i))));
    o.registerResolver(Zi, new G(ln, e));
    o.registerResolver(Bs, new G(hn, s));
    o.registerResolver(fs, null == n ? dn : new RenderLocationProvider(n));
    o.registerResolver(Ei, mn);
    o.registerResolver(Ss, null == r ? vn : new G(cn, r));
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

function fn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    h.registerResolver(t.HTMLElement, h.registerResolver(t.Element, h.registerResolver(cs, new G("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    h.registerResolver(Zi, new G(ln, i));
    h.registerResolver(Bs, new G(hn, n));
    h.registerResolver(fs, null == o ? dn : new G(an, o));
    h.registerResolver(Ei, null == r ? mn : new ViewFactoryProvider(r));
    h.registerResolver(Ss, null == l ? vn : new G(cn, l));
    return h.invoke(e.Type);
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

const dn = new RenderLocationProvider(null);

const mn = new ViewFactoryProvider(null);

const vn = new G(cn, new AuSlotsInfo(L));

var gn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(gn || (gn = {}));

function pn(t) {
    return function(e) {
        return yn.define(t, e);
    };
}

class BindingCommandDefinition {
    constructor(t, e, i, s, n) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
        this.type = n;
    }
    static create(t, e) {
        let i;
        let s;
        if (Rt(t)) {
            i = t;
            s = {
                name: i
            };
        } else {
            i = t.name;
            s = t;
        }
        return new BindingCommandDefinition(e, D(xn(e, "name"), i), F(xn(e, "aliases"), s.aliases, e.aliases), bn(i), D(xn(e, "type"), s.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        U.singleton(i, e).register(t);
        U.aliasTo(i, e).register(t);
        n(s, yn, i, t);
    }
}

const wn = vt("binding-command");

const bn = t => `${wn}:${t}`;

const xn = (t, e) => at(mt(e), t);

const yn = Object.freeze({
    name: wn,
    keyFrom: bn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        ut(wn, i, i.Type);
        ut(wn, i, i);
        gt(e, wn);
        return i.Type;
    },
    getAnnotation: xn
});

let kn = class OneTimeBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "one-time";
    }
    build(e) {
        var i;
        const s = e.attr;
        let n = s.target;
        let r = e.attr.rawValue;
        if (null == e.bindable) n = null !== (i = this.m.map(e.node, n)) && void 0 !== i ? i : Z(n); else {
            if ("" === r && 1 === e.def.type) r = Z(n);
            n = e.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.oneTime);
    }
};

kn.inject = [ ee, c ];

kn = lt([ pn("one-time") ], kn);

let Cn = class ToViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "to-view";
    }
    build(e) {
        var i;
        const s = e.attr;
        let n = s.target;
        let r = e.attr.rawValue;
        if (null == e.bindable) n = null !== (i = this.m.map(e.node, n)) && void 0 !== i ? i : Z(n); else {
            if ("" === r && 1 === e.def.type) r = Z(n);
            n = e.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.toView);
    }
};

Cn.inject = [ ee, c ];

Cn = lt([ pn("to-view") ], Cn);

let An = class FromViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "from-view";
    }
    build(e) {
        var i;
        const s = e.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == e.bindable) n = null !== (i = this.m.map(e.node, n)) && void 0 !== i ? i : Z(n); else {
            if ("" === r && 1 === e.def.type) r = Z(n);
            n = e.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.fromView);
    }
};

An.inject = [ ee, c ];

An = lt([ pn("from-view") ], An);

let Rn = class TwoWayBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "two-way";
    }
    build(e) {
        var i;
        const s = e.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == e.bindable) n = null !== (i = this.m.map(e.node, n)) && void 0 !== i ? i : Z(n); else {
            if ("" === r && 1 === e.def.type) r = Z(n);
            n = e.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(r, 8), n, t.twoWay);
    }
};

Rn.inject = [ ee, c ];

Rn = lt([ pn("two-way") ], Rn);

let Sn = class DefaultBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "bind";
    }
    build(e) {
        var i;
        const s = e.attr;
        const n = e.bindable;
        let r;
        let o;
        let l = s.target;
        let h = s.rawValue;
        if (null == n) {
            o = this.m.isTwoWay(e.node, l) ? t.twoWay : t.toView;
            l = null !== (i = this.m.map(e.node, l)) && void 0 !== i ? i : Z(l);
        } else {
            if ("" === h && 1 === e.def.type) h = Z(l);
            r = e.def.defaultBindingMode;
            o = n.mode === t.default || null == n.mode ? null == r || r === t.default ? t.toView : r : n.mode;
            l = n.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(h, 8), l, o);
    }
};

Sn.inject = [ ee, c ];

Sn = lt([ pn("bind") ], Sn);

let En = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(t) {
        const e = null === t.bindable ? Z(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(this.ep.parse(t.attr.rawValue, 8 | 4), e);
    }
};

En.inject = [ c ];

En = lt([ pn("call") ], En);

let Bn = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(t) {
        const e = null === t.bindable ? Z(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(t.attr.rawValue, 2), e);
    }
};

Bn.inject = [ c ];

Bn = lt([ pn("for") ], Bn);

let In = class TriggerBindingCommand {
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

In.inject = [ c ];

In = lt([ pn("trigger") ], In);

let Tn = class DelegateBindingCommand {
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

Tn.inject = [ c ];

Tn = lt([ pn("delegate") ], Tn);

let Dn = class CaptureBindingCommand {
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

Dn.inject = [ c ];

Dn = lt([ pn("capture") ], Dn);

let Pn = class AttrBindingCommand {
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

Pn.inject = [ c ];

Pn = lt([ pn("attr") ], Pn);

let $n = class StyleBindingCommand {
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

$n.inject = [ c ];

$n = lt([ pn("style") ], $n);

let On = class ClassBindingCommand {
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

On.inject = [ c ];

On = lt([ pn("class") ], On);

let Ln = class RefBindingCommand {
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

Ln.inject = [ c ];

Ln = lt([ pn("ref") ], Ln);

let qn = class SpreadBindingCommand {
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

qn = lt([ pn("...$attrs") ], qn);

const Un = O.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const _n = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.se = t.document.createElement("template");
    }
    createTemplate(t) {
        var e;
        if (Rt(t)) {
            let e = _n[t];
            if (void 0 === e) {
                const i = this.se;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.se = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                _n[t] = e;
            }
            return e.cloneNode(true);
        }
        if ("TEMPLATE" !== t.nodeName) {
            const e = this.p.document.createElement("template");
            e.content.appendChild(t);
            return e;
        }
        null === (e = t.parentNode) || void 0 === e ? void 0 : e.removeChild(t);
        return t.cloneNode(true);
    }
}

TemplateElementFactory.inject = [ Jt ];

const Fn = function(t) {
    function e(t, i, s) {
        O.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.getAll(t, false);
        return i.has(t, false) ? i.getAll(t, false).concat(i.root.getAll(t, false)) : i.root.getAll(t, false);
    };
    return e;
};

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return U.singleton(Ts, this).register(t);
    }
    compile(t, e, i) {
        var s, n, r, o;
        const l = CustomElementDefinition.getOrCreate(t);
        if (null === l.template || void 0 === l.template) return l;
        if (false === l.needsCompile) return l;
        null !== i && void 0 !== i ? i : i = jn;
        const h = new CompilationContext(t, e, i, null, null, void 0);
        const a = Rt(l.template) || !t.enhance ? h.ne.createTemplate(l.template) : l.template;
        const c = "TEMPLATE" === a.nodeName && null != a.content;
        const u = c ? a.content : a;
        const f = e.get(Fn(Qn));
        const d = f.length;
        let m = 0;
        if (d > 0) while (d > m) {
            null === (n = (s = f[m]).compiling) || void 0 === n ? void 0 : n.call(s, a);
            ++m;
        }
        if (a.hasAttribute(Yn)) throw new Error(`AUR0701`);
        this.re(u, h);
        this.oe(u, h);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || nr(),
            dependencies: (null !== (r = t.dependencies) && void 0 !== r ? r : L).concat(null !== (o = h.deps) && void 0 !== o ? o : L),
            instructions: h.rows,
            surrogates: c ? this.le(a, h) : L,
            template: a,
            hasSlots: h.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        var n;
        const r = new CompilationContext(t, i, jn, null, null, void 0);
        const o = [];
        const l = r.he(s.nodeName.toLowerCase());
        const h = null !== l;
        const a = r.ep;
        const c = e.length;
        let u = 0;
        let f;
        let d = null;
        let m;
        let v;
        let g;
        let p;
        let w;
        let b = null;
        let x;
        let y;
        let k;
        let C;
        for (;c > u; ++u) {
            f = e[u];
            k = f.target;
            C = f.rawValue;
            b = r.ae(f);
            if (null !== b && (1 & b.type) > 0) {
                Wn.node = s;
                Wn.attr = f;
                Wn.bindable = null;
                Wn.def = null;
                o.push(b.build(Wn));
                continue;
            }
            d = r.ce(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                g = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === b && Vn(C);
                if (y) v = this.ue(s, C, d, r); else {
                    w = g.primary;
                    if (null === b) {
                        x = a.parse(C, 1);
                        v = [ null === x ? new SetPropertyInstruction(C, w.property) : new InterpolationInstruction(x, w.property) ];
                    } else {
                        Wn.node = s;
                        Wn.attr = f;
                        Wn.bindable = w;
                        Wn.def = d;
                        v = [ b.build(Wn) ];
                    }
                }
                (null !== m && void 0 !== m ? m : m = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(k) ? k : void 0, v));
                continue;
            }
            if (null === b) {
                x = a.parse(C, 1);
                if (h) {
                    g = BindablesInfo.from(l, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        x = a.parse(C, 1);
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
                        Wn.node = s;
                        Wn.attr = f;
                        Wn.bindable = p;
                        Wn.def = l;
                        o.push(new SpreadElementPropBindingInstruction(b.build(Wn)));
                        continue;
                    }
                }
                Wn.node = s;
                Wn.attr = f;
                Wn.bindable = null;
                Wn.def = null;
                o.push(b.build(Wn));
            }
        }
        Mn();
        if (null != m) return m.concat(o);
        return o;
    }
    le(t, e) {
        var i;
        const s = [];
        const n = t.attributes;
        const r = e.ep;
        let o = n.length;
        let l = 0;
        let h;
        let a;
        let c;
        let u;
        let f = null;
        let d;
        let m;
        let v;
        let g;
        let p = null;
        let w;
        let b;
        let x;
        let y;
        for (;o > l; ++l) {
            h = n[l];
            a = h.name;
            c = h.value;
            u = e.fe.parse(a, c);
            x = u.target;
            y = u.rawValue;
            if (Hn[x]) throw new Error(`AUR0702:${a}`);
            p = e.ae(u);
            if (null !== p && (1 & p.type) > 0) {
                Wn.node = t;
                Wn.attr = u;
                Wn.bindable = null;
                Wn.def = null;
                s.push(p.build(Wn));
                continue;
            }
            f = e.ce(x);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${x}`);
                v = BindablesInfo.from(f, true);
                b = false === f.noMultiBindings && null === p && Vn(y);
                if (b) m = this.ue(t, y, f, e); else {
                    g = v.primary;
                    if (null === p) {
                        w = r.parse(y, 1);
                        m = [ null === w ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(w, g.property) ];
                    } else {
                        Wn.node = t;
                        Wn.attr = u;
                        Wn.bindable = g;
                        Wn.def = f;
                        m = [ p.build(Wn) ];
                    }
                }
                t.removeAttribute(a);
                --l;
                --o;
                (null !== d && void 0 !== d ? d : d = []).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(x) ? x : void 0, m));
                continue;
            }
            if (null === p) {
                w = r.parse(y, 1);
                if (null != w) {
                    t.removeAttribute(a);
                    --l;
                    --o;
                    s.push(new InterpolationInstruction(w, null !== (i = e.m.map(t, x)) && void 0 !== i ? i : Z(x)));
                } else switch (a) {
                  case "class":
                    s.push(new SetClassAttributeInstruction(y));
                    break;

                  case "style":
                    s.push(new SetStyleAttributeInstruction(y));
                    break;

                  default:
                    s.push(new SetAttributeInstruction(y, a));
                }
            } else {
                Wn.node = t;
                Wn.attr = u;
                Wn.bindable = null;
                Wn.def = null;
                s.push(p.build(Wn));
            }
        }
        Mn();
        if (null != d) return d.concat(s);
        return s;
    }
    oe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.de(t, e);

              default:
                return this.me(t, e);
            }

          case 3:
            return this.ve(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.oe(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    de(t, e) {
        const i = t.attributes;
        const s = i.length;
        const n = [];
        const r = e.ep;
        let o = false;
        let l = 0;
        let h;
        let a;
        let c;
        let u;
        let f;
        let d;
        let m;
        let g;
        for (;s > l; ++l) {
            h = i[l];
            c = h.name;
            u = h.value;
            if ("to-binding-context" === c) {
                o = true;
                continue;
            }
            a = e.fe.parse(c, u);
            d = a.target;
            m = a.rawValue;
            f = e.ae(a);
            if (null !== f) switch (f.name) {
              case "to-view":
              case "bind":
                n.push(new LetBindingInstruction(r.parse(m, 8), Z(d)));
                continue;

              default:
                throw new Error(`AUR0704:${a.command}`);
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new v(m) : g, Z(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.ge(t).nextSibling;
    }
    me(t, e) {
        var i, s, n, r, o, l;
        var h, a, c, u;
        const f = t.nextSibling;
        const d = (null !== (i = t.getAttribute("as-element")) && void 0 !== i ? i : t.nodeName).toLowerCase();
        const m = e.he(d);
        const v = null !== m;
        const g = v && null != m.shadowOptions;
        const p = !!(null === m || void 0 === m ? void 0 : m.capture);
        const w = p ? [] : L;
        const b = e.ep;
        const x = this.debug ? $ : () => {
            t.removeAttribute(S);
            --A;
            --C;
        };
        let y = t.attributes;
        let k;
        let C = y.length;
        let A = 0;
        let R;
        let S;
        let E;
        let B;
        let I;
        let T;
        let D = null;
        let P = false;
        let O;
        let q;
        let U;
        let _;
        let F;
        let V;
        let M;
        let j = null;
        let N;
        let W;
        let H;
        let z;
        let G = true;
        let X = false;
        if ("slot" === d) {
            if (null == e.root.def.shadowOptions) throw new Error(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (v) {
            G = null === (s = m.processContent) || void 0 === s ? void 0 : s.call(m.Type, t, e.p);
            y = t.attributes;
            C = y.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;C > A; ++A) {
            R = y[A];
            S = R.name;
            E = R.value;
            switch (S) {
              case "as-element":
              case "containerless":
                x();
                if (!X) X = "containerless" === S;
                continue;
            }
            B = e.fe.parse(S, E);
            j = e.ae(B);
            H = B.target;
            z = B.rawValue;
            if (p) {
                if (null != j && 1 & j.type) {
                    x();
                    w.push(B);
                    continue;
                }
                if ("au-slot" !== H) {
                    N = BindablesInfo.from(m, false);
                    if (null == N.attrs[H] && !(null === (n = e.ce(H)) || void 0 === n ? void 0 : n.isTemplateController)) {
                        x();
                        w.push(B);
                        continue;
                    }
                }
            }
            if (null !== j && 1 & j.type) {
                Wn.node = t;
                Wn.attr = B;
                Wn.bindable = null;
                Wn.def = null;
                (null !== I && void 0 !== I ? I : I = []).push(j.build(Wn));
                x();
                continue;
            }
            D = e.ce(H);
            if (null !== D) {
                N = BindablesInfo.from(D, true);
                P = false === D.noMultiBindings && null === j && Vn(z);
                if (P) U = this.ue(t, z, D, e); else {
                    W = N.primary;
                    if (null === j) {
                        V = b.parse(z, 1);
                        U = [ null === V ? new SetPropertyInstruction(z, W.property) : new InterpolationInstruction(V, W.property) ];
                    } else {
                        Wn.node = t;
                        Wn.attr = B;
                        Wn.bindable = W;
                        Wn.def = D;
                        U = [ j.build(Wn) ];
                    }
                }
                x();
                if (D.isTemplateController) (null !== _ && void 0 !== _ ? _ : _ = []).push(new HydrateTemplateController(Nn, this.resolveResources ? D : D.name, void 0, U)); else (null !== q && void 0 !== q ? q : q = []).push(new HydrateAttributeInstruction(this.resolveResources ? D : D.name, null != D.aliases && D.aliases.includes(H) ? H : void 0, U));
                continue;
            }
            if (null === j) {
                if (v) {
                    N = BindablesInfo.from(m, false);
                    O = N.attrs[H];
                    if (void 0 !== O) {
                        V = b.parse(z, 1);
                        (null !== T && void 0 !== T ? T : T = []).push(null == V ? new SetPropertyInstruction(z, O.property) : new InterpolationInstruction(V, O.property));
                        x();
                        continue;
                    }
                }
                V = b.parse(z, 1);
                if (null != V) {
                    x();
                    (null !== I && void 0 !== I ? I : I = []).push(new InterpolationInstruction(V, null !== (r = e.m.map(t, H)) && void 0 !== r ? r : Z(H)));
                }
                continue;
            }
            x();
            if (v) {
                N = BindablesInfo.from(m, false);
                O = N.attrs[H];
                if (void 0 !== O) {
                    Wn.node = t;
                    Wn.attr = B;
                    Wn.bindable = O;
                    Wn.def = m;
                    (null !== T && void 0 !== T ? T : T = []).push(j.build(Wn));
                    continue;
                }
            }
            Wn.node = t;
            Wn.attr = B;
            Wn.bindable = null;
            Wn.def = null;
            (null !== I && void 0 !== I ? I : I = []).push(j.build(Wn));
        }
        Mn();
        if (this.pe(t) && null != I && I.length > 1) this.we(t, I);
        if (v) {
            M = new HydrateElementInstruction(this.resolveResources ? m : m.name, void 0, null !== T && void 0 !== T ? T : L, null, X, w);
            if (d === or) {
                const i = t.getAttribute("name") || rr;
                const s = e.h("template");
                const n = e.be();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.oe(s.content, n);
                M.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: nr(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.xe(t, e);
            }
        }
        if (null != I || null != M || null != q) {
            k = L.concat(null !== M && void 0 !== M ? M : L, null !== q && void 0 !== q ? q : L, null !== I && void 0 !== I ? I : L);
            this.ge(t);
        }
        let K;
        if (null != _) {
            C = _.length - 1;
            A = C;
            F = _[A];
            let i;
            this.xe(t, e);
            if ("TEMPLATE" === t.nodeName) i = t; else {
                i = e.h("template");
                i.content.appendChild(t);
            }
            const s = i;
            const n = e.be(null == k ? [] : [ k ]);
            let r;
            let l;
            let c;
            let u;
            let f;
            let p;
            let w;
            let b;
            let x = 0, y = 0;
            let R = t.firstChild;
            let S = false;
            if (false !== G) while (null !== R) {
                l = 1 === R.nodeType ? R.getAttribute(or) : null;
                if (null !== l) R.removeAttribute(or);
                if (v) {
                    r = R.nextSibling;
                    if (!g) {
                        S = 3 === R.nodeType && "" === R.textContent.trim();
                        if (!S) (null !== (o = (h = null !== u && void 0 !== u ? u : u = {})[a = l || rr]) && void 0 !== o ? o : h[a] = []).push(R);
                        t.removeChild(R);
                    }
                    R = r;
                } else {
                    if (null !== l) {
                        l = l || rr;
                        throw new Error(`AUR0706:${d}[${l}]`);
                    }
                    R = R.nextSibling;
                }
            }
            if (null != u) {
                c = {};
                for (l in u) {
                    i = e.h("template");
                    f = u[l];
                    for (x = 0, y = f.length; y > x; ++x) {
                        p = f[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) i.content.appendChild(p); else i.content.appendChild(p.content); else i.content.appendChild(p);
                    }
                    b = e.be();
                    this.oe(i.content, b);
                    c[l] = CustomElementDefinition.create({
                        name: nr(),
                        template: i,
                        instructions: b.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                M.projections = c;
            }
            if (v && (X || m.containerless)) this.xe(t, e);
            K = !v || !m.containerless && !X && false !== G;
            if (K) if ("TEMPLATE" === t.nodeName) this.oe(t.content, n); else {
                R = t.firstChild;
                while (null !== R) R = this.oe(R, n);
            }
            F.def = CustomElementDefinition.create({
                name: nr(),
                template: s,
                instructions: n.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (A-- > 0) {
                F = _[A];
                i = e.h("template");
                w = e.h("au-m");
                w.classList.add("au");
                i.content.appendChild(w);
                F.def = CustomElementDefinition.create({
                    name: nr(),
                    template: i,
                    needsCompile: false,
                    instructions: [ [ _[A + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ F ]);
        } else {
            if (null != k) e.rows.push(k);
            let i = t.firstChild;
            let s;
            let n;
            let r = null;
            let o;
            let h;
            let a;
            let f;
            let p;
            let w = false;
            let b = 0, x = 0;
            if (false !== G) while (null !== i) {
                n = 1 === i.nodeType ? i.getAttribute(or) : null;
                if (null !== n) i.removeAttribute(or);
                if (v) {
                    s = i.nextSibling;
                    if (!g) {
                        w = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!w) (null !== (l = (c = null !== o && void 0 !== o ? o : o = {})[u = n || rr]) && void 0 !== l ? l : c[u] = []).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || rr;
                        throw new Error(`AUR0706:${d}[${n}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != o) {
                r = {};
                for (n in o) {
                    f = e.h("template");
                    h = o[n];
                    for (b = 0, x = h.length; x > b; ++b) {
                        a = h[b];
                        if ("TEMPLATE" === a.nodeName) if (a.attributes.length > 0) f.content.appendChild(a); else f.content.appendChild(a.content); else f.content.appendChild(a);
                    }
                    p = e.be();
                    this.oe(f.content, p);
                    r[n] = CustomElementDefinition.create({
                        name: nr(),
                        template: f,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                M.projections = r;
            }
            if (v && (X || m.containerless)) this.xe(t, e);
            K = !v || !m.containerless && !X && false !== G;
            if (K && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.oe(i, e);
            }
        }
        return f;
    }
    ve(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.ge(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    ue(t, e, i, s) {
        const n = BindablesInfo.from(i, true);
        const r = e.length;
        const o = [];
        let l;
        let h;
        let a = 0;
        let c = 0;
        let u;
        let f;
        let d;
        let m;
        for (let v = 0; v < r; ++v) {
            c = e.charCodeAt(v);
            if (92 === c) ++v; else if (58 === c) {
                l = e.slice(a, v);
                while (e.charCodeAt(++v) <= 32) ;
                a = v;
                for (;v < r; ++v) {
                    c = e.charCodeAt(v);
                    if (92 === c) ++v; else if (59 === c) {
                        h = e.slice(a, v);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(a);
                f = s.fe.parse(l, h);
                d = s.ae(f);
                m = n.attrs[f.target];
                if (null == m) throw new Error(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    Wn.node = t;
                    Wn.attr = f;
                    Wn.bindable = m;
                    Wn.def = i;
                    o.push(d.build(Wn));
                }
                while (v < r && e.charCodeAt(++v) <= 32) ;
                a = v;
                l = void 0;
                h = void 0;
            }
        }
        Mn();
        return o;
    }
    re(t, e) {
        var i, s;
        const n = t;
        const r = J(n.querySelectorAll("template[as-custom-element]"));
        const o = r.length;
        if (0 === o) return;
        if (o === n.childElementCount) throw new Error(`AUR0708`);
        const l = new Set;
        const h = [];
        for (const t of r) {
            if (t.parentNode !== n) throw new Error(`AUR0709`);
            const i = Zn(t, l);
            const s = class LocalTemplate {};
            const r = t.content;
            const o = J(r.querySelectorAll("bindable"));
            const a = Dt.for(s);
            const c = new Set;
            const u = new Set;
            for (const t of o) {
                if (t.parentNode !== r) throw new Error(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw new Error(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || c.has(e)) throw new Error(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    c.add(e);
                }
                a.add({
                    property: e,
                    attribute: null !== i && void 0 !== i ? i : void 0,
                    mode: Jn(t)
                });
                const s = t.getAttributeNames().filter((t => !Kn.includes(t)));
                if (s.length > 0) ;
                r.removeChild(t);
            }
            h.push(s);
            e.ye(oi.define({
                name: i,
                template: t
            }, s));
            n.removeChild(t);
        }
        let a = 0;
        const c = h.length;
        for (;c > a; ++a) oi.getDefinition(h[a]).dependencies.push(...null !== (i = e.def.dependencies) && void 0 !== i ? i : L, ...null !== (s = e.deps) && void 0 !== s ? s : L);
    }
    pe(t) {
        return "INPUT" === t.nodeName && 1 === zn[t.type];
    }
    we(t, e) {
        switch (t.nodeName) {
          case "INPUT":
            {
                const t = e;
                let i;
                let s;
                let n = 0;
                let r;
                for (let e = 0; e < t.length && n < 3; e++) {
                    r = t[e];
                    switch (r.to) {
                      case "model":
                      case "value":
                      case "matcher":
                        i = e;
                        n++;
                        break;

                      case "checked":
                        s = e;
                        n++;
                        break;
                    }
                }
                if (void 0 !== s && void 0 !== i && s < i) [t[i], t[s]] = [ t[s], t[i] ];
            }
        }
    }
    ge(t) {
        t.classList.add("au");
        return t;
    }
    xe(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.ge(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.ke = bt();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.ne = o ? s.ne : e.get(Un);
        this.fe = o ? s.fe : e.get(Mt);
        this.ep = o ? s.ep : e.get(c);
        this.m = o ? s.m : e.get(ee);
        this.Ut = o ? s.Ut : e.get(X);
        this.p = o ? s.p : e.get(Jt);
        this.localEls = o ? s.localEls : new Set;
        this.rows = null !== r && void 0 !== r ? r : [];
    }
    ye(t) {
        var e;
        var i;
        (null !== (e = (i = this.root).deps) && void 0 !== e ? e : i.deps = []).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    he(t) {
        return this.c.find(oi, t);
    }
    ce(t) {
        return this.c.find(Ve, t);
    }
    be(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ae(t) {
        if (this.root !== this) return this.root.ae(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.ke[e];
        if (void 0 === i) {
            i = this.c.create(yn, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.ke[e] = i;
        }
        return i;
    }
}

function Vn(t) {
    const e = t.length;
    let i = 0;
    let s = 0;
    while (e > s) {
        i = t.charCodeAt(s);
        if (92 === i) ++s; else if (58 === i) return true; else if (36 === i && 123 === t.charCodeAt(s + 1)) return false;
        ++s;
    }
    return false;
}

function Mn() {
    Wn.node = Wn.attr = Wn.bindable = Wn.def = null;
}

const jn = {
    projections: null
};

const Nn = {
    name: "unnamed"
};

const Wn = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const Hn = Object.assign(bt(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const zn = {
    checkbox: 1,
    radio: 1
};

const Gn = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(e, i) {
        let s = Gn.get(e);
        if (null == s) {
            const n = e.bindables;
            const r = bt();
            const o = i ? void 0 === e.defaultBindingMode ? t.default : e.defaultBindingMode : t.default;
            let l;
            let h;
            let a = false;
            let c;
            let u;
            for (h in n) {
                l = n[h];
                u = l.attribute;
                if (true === l.primary) {
                    if (a) throw new Error(`AUR0714:${e.name}`);
                    a = true;
                    c = l;
                } else if (!a && null == c) c = l;
                r[u] = BindableDefinition.create(h, e.Type, l);
            }
            if (null == l && i) c = r.value = BindableDefinition.create("value", e.Type, {
                mode: o
            });
            Gn.set(e, s = new BindablesInfo(r, n, c));
        }
        return s;
    }
}

var Xn;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(Xn || (Xn = {}));

const Kn = Object.freeze([ "property", "attribute", "mode" ]);

const Yn = "as-custom-element";

function Zn(t, e) {
    const i = t.getAttribute(Yn);
    if (null === i || "" === i) throw new Error(`AUR0715`);
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Yn);
    }
    return i;
}

function Jn(e) {
    switch (e.getAttribute("mode")) {
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

const Qn = O.createInterface("ITemplateCompilerHooks");

const tr = new WeakMap;

const er = vt("compiler-hooks");

const ir = Object.freeze({
    name: er,
    define(t) {
        let e = tr.get(t);
        if (void 0 === e) {
            tr.set(t, e = new TemplateCompilerHooksDefinition(t));
            ut(er, e, t);
            gt(t, er);
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
        t.register(U.singleton(Qn, this.Type));
    }
}

const sr = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return ir.define(t);
    }
};

const nr = oi.generateName;

const rr = "default";

const or = "au-slot";

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
        this.Ce = new Map;
    }
    bind(t, e, i) {
        this.Ce.set(i, i.mode);
        i.mode = this.mode;
    }
    unbind(t, e, i) {
        i.mode = this.Ce.get(i);
        this.Ce.delete(i);
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

const lr = 200;

class DebounceBindingBehavior extends p {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: lr
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.locator.get(_).taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, i) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.binding.handleChange(t, e, i);
    }
    updateSource(t, e) {
        this.queueTask((() => this.binding.updateSource(t, e)));
    }
    queueTask(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            return t();
        }), this.opts);
        null === e || void 0 === e ? void 0 : e.cancel();
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const i = Number(this.firstArg.evaluate(t, e, this.locator, null));
            this.opts.delay = isNaN(i) ? lr : i;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        var e;
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        this.binding.$unbind(t);
    }
}

g("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Yt = new Map;
        this.Ae = t;
    }
    bind(t, e, i, ...s) {
        if (!("handleChange" in i)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Yt.set(i, s);
        let n;
        for (n of s) this.Ae.addSignalListener(n, i);
    }
    unbind(t, e, i) {
        const s = this.Yt.get(i);
        this.Yt.delete(i);
        let n;
        for (n of s) this.Ae.removeSignalListener(n, i);
    }
}

SignalBindingBehavior.inject = [ w ];

g("signal")(SignalBindingBehavior);

const hr = 200;

class ThrottleBindingBehavior extends p {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: hr
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.locator.get(_);
        this.Re = this.p.taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.Se((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, i) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
            this.lastCall = this.p.performanceNow();
        }
        this.binding.handleChange(t, e, i);
    }
    updateSource(t, e) {
        this.Se((() => this.binding.updateSource(t, e)));
    }
    Se(t) {
        const e = this.opts;
        const i = this.p;
        const s = this.lastCall + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.task;
            e.delay = s;
            this.task = this.Re.queueTask((() => {
                this.lastCall = i.performanceNow();
                this.task = null;
                e.delay = this.delay;
                t();
            }), e);
            null === n || void 0 === n ? void 0 : n.cancel();
        } else {
            this.lastCall = i.performanceNow();
            t();
        }
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const i = Number(this.firstArg.evaluate(t, e, this.locator, null));
            this.opts.delay = this.delay = isNaN(i) ? hr : i;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        var e;
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        super.$unbind(t);
    }
}

g("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, i, s) {
        if (null == t) i.removeAttribute(s); else i.setAttribute(s, t);
    }
}

const ar = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, i) {
        i.targetObserver = ar;
    }
    unbind(t, e, i) {
        return;
    }
}

g("attr")(AttrBindingBehavior);

function cr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e, i) {
        if (!i.callSource || !i.targetEvent) throw new Error(`AUR0801`);
        i.selfEventCallSource = i.callSource;
        i.callSource = cr;
    }
    unbind(t, e, i) {
        i.callSource = i.selfEventCallSource;
        i.selfEventCallSource = null;
    }
}

g("self")(SelfBindingBehavior);

const ur = bt();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        var e;
        return null !== (e = ur[t]) && void 0 !== e ? e : ur[t] = new AttributeNSAccessor(t);
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i, s) {
        if (null == t) i.removeAttributeNS(this.ns, s); else i.setAttributeNS(this.ns, s, t);
    }
}

function fr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Ee = void 0;
        this.Be = void 0;
        this.f = 0;
        this.o = t;
        this.oL = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        const i = this.v;
        if (t === i) return;
        this.v = t;
        this.ov = i;
        this.f = e;
        this.Ie();
        this.Te();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.Te();
    }
    handleChange(t, e, i) {
        this.Te();
    }
    Te() {
        const t = this.v;
        const e = this.o;
        const i = xt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : fr;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (t instanceof Array) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
                for (const e of t) if (n(e, i)) {
                    s = true;
                    break;
                }
            } else if (t instanceof Map) for (const e of t) {
                const t = e[0];
                const r = e[1];
                if (n(t, i) && true === r) {
                    s = true;
                    break;
                }
            }
            e.checked = s;
        }
    }
    handleEvent() {
        let t = this.ov = this.v;
        const e = this.o;
        const i = xt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : fr;
        if ("checkbox" === e.type) {
            if (t instanceof Array) {
                const e = t.findIndex((t => !!n(t, i)));
                if (s && -1 === e) t.push(i); else if (!s && -1 !== e) t.splice(e, 1);
                return;
            } else if (t instanceof Set) {
                const e = {};
                let r = e;
                for (const e of t) if (true === n(e, i)) {
                    r = e;
                    break;
                }
                if (s && r === e) t.add(i); else if (!s && r !== e) t.delete(r);
                return;
            } else if (t instanceof Map) {
                let e;
                for (const s of t) {
                    const t = s[0];
                    if (true === n(t, i)) {
                        e = t;
                        break;
                    }
                }
                t.set(e, s);
                return;
            }
            t = s;
        } else if (s) t = i; else return;
        this.v = t;
        this.queue.add(this);
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Ie();
    }
    stop() {
        var t, e;
        this.handler.dispose();
        null === (t = this.Ee) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Ee = void 0;
        null === (e = this.Be) || void 0 === e ? void 0 : e.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        dr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, dr, this.f);
    }
    Ie() {
        var t, e, i, s, n, r, o;
        const l = this.o;
        null === (n = null !== (t = this.Be) && void 0 !== t ? t : this.Be = null !== (i = null === (e = l.$observers) || void 0 === e ? void 0 : e.model) && void 0 !== i ? i : null === (s = l.$observers) || void 0 === s ? void 0 : s.value) || void 0 === n ? void 0 : n.subscribe(this);
        null === (r = this.Ee) || void 0 === r ? void 0 : r.unsubscribe(this);
        this.Ee = void 0;
        if ("checkbox" === l.type) null === (o = this.Ee = Rr(this.v, this.oL)) || void 0 === o ? void 0 : o.subscribe(this);
    }
}

e(CheckedObserver);

i(CheckedObserver);

let dr;

const mr = {
    childList: true,
    subtree: true,
    characterData: true
};

function vr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.De = void 0;
        this.Pe = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? gr(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.$e(t instanceof Array ? t : null);
        if (0 === (64 & e)) this.K();
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
        const e = this.v;
        const i = this.o;
        const s = Array.isArray(e);
        const n = null !== (t = i.matcher) && void 0 !== t ? t : vr;
        const r = i.options;
        let o = r.length;
        while (o-- > 0) {
            const t = r[o];
            const i = xt.call(t, "model") ? t.model : t.value;
            if (s) {
                t.selected = -1 !== e.findIndex((t => !!n(i, t)));
                continue;
            }
            t.selected = !!n(i, e);
        }
    }
    syncValue() {
        const t = this.o;
        const e = t.options;
        const i = e.length;
        const s = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(s instanceof Array)) return true;
            let r;
            const o = t.matcher || vr;
            const l = [];
            while (n < i) {
                r = e[n];
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
        while (n < i) {
            o = e[n];
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
    Oe() {
        (this.Pe = new this.o.ownerDocument.defaultView.MutationObserver(this.Le.bind(this))).observe(this.o, mr);
        this.$e(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    qe() {
        var t;
        this.Pe.disconnect();
        null === (t = this.De) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Pe = this.De = void 0;
        this.iO = false;
    }
    $e(t) {
        var e;
        null === (e = this.De) || void 0 === e ? void 0 : e.unsubscribe(this);
        this.De = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.De = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    Le(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Oe();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.qe();
        }
    }
    flush() {
        pr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, pr, 0);
    }
}

e(SelectValueObserver);

i(SelectValueObserver);

function gr(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = xt.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let pr;

const wr = "--";

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
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (64 & e)) this.K();
    }
    Ue(t) {
        const e = [];
        const i = /url\([^)]+$/;
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
            if (i.test(n)) {
                n += ";";
                continue;
            }
            o = n.indexOf(":");
            l = n.substring(0, o).trim();
            h = n.substring(o + 1).trim();
            e.push([ l, h ]);
            n = "";
        }
        return e;
    }
    _e(t) {
        let e;
        let i;
        const s = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (Rt(e)) {
                if (i.startsWith(wr)) {
                    s.push([ i, e ]);
                    continue;
                }
                s.push([ P(i), e ]);
                continue;
            }
            s.push(...this.Fe(e));
        }
        return s;
    }
    Ve(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this.Fe(t[s]));
            return i;
        }
        return L;
    }
    Fe(t) {
        if (Rt(t)) return this.Ue(t);
        if (t instanceof Array) return this.Ve(t);
        if (t instanceof Object) return this._e(t);
        return L;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const i = this.Fe(t);
            let s;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const a = i.length;
            for (;h < a; ++h) {
                r = i[h];
                o = r[0];
                l = r[1];
                this.setProperty(o, l);
                e[o] = n;
            }
            this.styles = e;
            this.version += 1;
            if (0 === n) return;
            n -= 1;
            for (s in e) {
                if (!xt.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && At(e.indexOf) && e.includes("!important")) {
            i = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, i);
    }
    bind(t) {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.H = false;
        this.o = t;
        this.k = e;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        if (Object.is(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.H = true;
        if (!this.handler.config.readonly && 0 === (64 & e)) this.K(e);
    }
    K(t) {
        var e;
        if (this.H) {
            this.H = false;
            this.o[this.k] = null !== (e = this.v) && void 0 !== e ? e : this.handler.config.default;
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
        br = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, br, 0);
    }
}

e(ValueAttributeObserver);

i(ValueAttributeObserver);

let br;

const xr = "http://www.w3.org/1999/xlink";

const yr = "http://www.w3.org/XML/1998/namespace";

const kr = "http://www.w3.org/2000/xmlns/";

const Cr = Object.assign(bt(), {
    "xlink:actuate": [ "actuate", xr ],
    "xlink:arcrole": [ "arcrole", xr ],
    "xlink:href": [ "href", xr ],
    "xlink:role": [ "role", xr ],
    "xlink:show": [ "show", xr ],
    "xlink:title": [ "title", xr ],
    "xlink:type": [ "type", xr ],
    "xml:lang": [ "lang", yr ],
    "xml:space": [ "space", yr ],
    xmlns: [ "xmlns", kr ],
    "xmlns:xlink": [ "xlink", kr ]
});

const Ar = new b;

Ar.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        var e;
        this.type = null !== (e = t.type) && void 0 !== e ? e : ValueAttributeObserver;
        this.events = t.events;
        this.readonly = t.readonly;
        this.default = t.default;
    }
}

class NodeObserverLocator {
    constructor(t, e, i, s) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = i;
        this.svgAnalyzer = s;
        this.allowDirtyCheck = true;
        this.Me = bt();
        this.je = bt();
        this.Ne = bt();
        this.We = bt();
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
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        var s, n;
        const r = this.Me;
        let o;
        if (Rt(t)) {
            o = null !== (s = r[t]) && void 0 !== s ? s : r[t] = bt();
            if (null == o[e]) o[e] = new NodeObserverConfig(i); else Sr(t, e);
        } else for (const i in t) {
            o = null !== (n = r[i]) && void 0 !== n ? n : r[i] = bt();
            const s = t[i];
            for (e in s) if (null == o[e]) o[e] = new NodeObserverConfig(s[e]); else Sr(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.je;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else Sr("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else Sr("*", t);
    }
    getAccessor(t, e, i) {
        var s;
        if (e in this.We || e in (null !== (s = this.Ne[t.tagName]) && void 0 !== s ? s : Q)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
            return ar;

          default:
            {
                const i = Cr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (kt(t, e, this.svgAnalyzer)) return ar;
                return Ar;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        var n, r;
        let o;
        if (Rt(t)) {
            o = null !== (i = (n = this.Ne)[t]) && void 0 !== i ? i : n[t] = bt();
            o[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            o = null !== (s = (r = this.Ne)[e]) && void 0 !== s ? s : r[e] = bt();
            o[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.We[e] = true;
    }
    getObserver(t, e, i) {
        var s, n;
        switch (e) {
          case "role":
            return ar;

          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const r = null !== (n = null === (s = this.Me[t.tagName]) || void 0 === s ? void 0 : s[e]) && void 0 !== n ? n : this.je[e];
        if (null != r) return new r.type(t, e, new EventSubscriber(r), i, this.locator);
        const o = Cr[e];
        if (void 0 !== o) return AttributeNSAccessor.forNs(o[1]);
        if (kt(t, e, this.svgAnalyzer)) return ar;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new y(t, e);
    }
}

NodeObserverLocator.inject = [ tt, Jt, k, Qt ];

function Rr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Sr(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(e, i, s, ...n) {
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
    unbind(t, e, i) {
        i.targetObserver.handler.dispose();
        i.targetObserver.handler = i.targetObserver.originalHandler;
        i.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ a ];

g("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.He = t;
        this.p = e;
        this.ze = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.Ge(); else this.ze = true;
    }
    attached() {
        if (this.ze) {
            this.ze = false;
            this.Ge();
        }
        this.He.addEventListener("focus", this);
        this.He.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.He;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Xe) this.value = false;
    }
    Ge() {
        const t = this.He;
        const e = this.Xe;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get Xe() {
        return this.He === this.p.document.activeElement;
    }
}

Focus.inject = [ cs, Jt ];

lt([ Bt({
    mode: t.twoWay
}) ], Focus.prototype, "value", void 0);

Le("focus")(Focus);

let Er = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.Ke = false;
        this.Ye = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ye = null;
            if (Boolean(this.value) !== this.Ze) if (this.Ze === this.Je) {
                this.Ze = !this.Je;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Ze = this.Je;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Ze = this.Je = "hide" !== i.alias;
    }
    binding() {
        this.Ke = true;
        this.update();
    }
    detaching() {
        var t;
        this.Ke = false;
        null === (t = this.Ye) || void 0 === t ? void 0 : t.cancel();
        this.Ye = null;
    }
    valueChanged() {
        if (this.Ke && null === this.Ye) this.Ye = this.p.domWriteQueue.queueTask(this.update);
    }
};

lt([ Bt ], Er.prototype, "value", void 0);

Er = lt([ ht(0, cs), ht(1, Jt), ht(2, Bs) ], Er);

C("hide")(Er);

Le("show")(Er);

class Portal {
    constructor(t, e, i) {
        this.id = H("au$component");
        this.strict = false;
        this.p = i;
        this.Qe = i.document.createElement("div");
        this.view = t.create();
        gs(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.Qe = this.ti();
        this.view.setHost(s);
        return this.ei(t, s, i);
    }
    detaching(t, e, i) {
        return this.ii(t, this.Qe, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.Qe;
        const i = this.Qe = this.ti();
        if (e === i) return;
        this.view.setHost(i);
        const s = K(this.ii(null, i, t.flags), (() => this.ei(null, i, t.flags)));
        if (s instanceof Promise) s.catch((t => {
            throw t;
        }));
    }
    ei(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return K(null === s || void 0 === s ? void 0 : s.call(n, e, r), (() => this.si(t, e, i)));
    }
    si(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return K(n.activate(null !== t && void 0 !== t ? t : n, s, i, s.scope), (() => this.ni(e)));
        return this.ni(e);
    }
    ni(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    ii(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return K(null === s || void 0 === s ? void 0 : s.call(n, e, r), (() => this.ri(t, e, i)));
    }
    ri(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return K(n.deactivate(t, s, i), (() => this.oi(e)));
        return this.oi(e);
    }
    oi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    ti() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw new Error(`AUR0811`);
            return e.body;
        }
        if (Rt(i)) {
            let n = e;
            if (Rt(s)) s = e.querySelector(s);
            if (s instanceof t.Node) n = s;
            i = n.querySelector(i);
        }
        if (i instanceof t.Node) return i;
        if (null == i) {
            if (this.strict) throw new Error(`AUR0812`);
            return e.body;
        }
        return i;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
        this.callbackContext = null;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

Portal.inject = [ Ei, fs, Jt ];

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

qe("portal")(Portal);

class FlagsTemplateController {
    constructor(t, e, i) {
        this.fs = i;
        this.id = H("au$component");
        this.view = t.create().setLocation(e);
    }
    attaching(t, e, i) {
        const {$controller: s} = this;
        return this.view.activate(t, s, i | this.fs, s.scope);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

class ObserveShallow extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 32);
    }
}

ObserveShallow.inject = [ Ei, fs ];

qe("observe-shallow")(ObserveShallow);

class If {
    constructor(t, e, i) {
        this.ifFactory = t;
        this.location = e;
        this.work = i;
        this.id = H("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.li = false;
        this.hi = 0;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.hi++;
        const o = () => !this.li && this.hi === r + 1;
        return K(this.pending, (() => {
            var e;
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (e = this.elseFactory) || void 0 === e ? void 0 : e.create();
            if (null == s) return;
            s.setLocation(this.location);
            this.pending = K(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.li = true;
        return K(this.pending, (() => {
            var e;
            this.li = false;
            this.pending = void 0;
            void (null === (e = this.view) || void 0 === e ? void 0 : e.deactivate(t, this.$controller, i));
        }));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        t = !!t;
        e = !!e;
        if (t === e) return;
        this.work.start();
        const s = this.view;
        const n = this.$controller;
        const r = this.hi++;
        const o = () => !this.li && this.hi === r + 1;
        let l;
        return K(K(this.pending, (() => this.pending = K(null === s || void 0 === s ? void 0 : s.deactivate(s, n, i), (() => {
            var e;
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (e = this.elseFactory) || void 0 === e ? void 0 : e.create();
            if (null == l) return;
            l.setLocation(this.location);
            return K(l.activate(l, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        })))), (() => this.work.finish()));
    }
    dispose() {
        var t, e;
        null === (t = this.ifView) || void 0 === t ? void 0 : t.dispose();
        null === (e = this.elseView) || void 0 === e ? void 0 : e.dispose();
        this.ifView = this.elseView = this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

If.inject = [ Ei, fs, ls ];

lt([ Bt ], If.prototype, "value", void 0);

lt([ Bt({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

qe("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = H("au$component");
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ Ei ];

qe({
    name: "else"
})(Else);

function Br(t) {
    t.dispose();
}

const Ir = [ 38962, 36913 ];

class Repeat {
    constructor(t, e, i) {
        this.l = t;
        this.ai = e;
        this.f = i;
        this.id = H("au$component");
        this.views = [];
        this.key = void 0;
        this.ui = void 0;
        this.fi = false;
        this.di = false;
        this.mi = null;
        this.vi = void 0;
        this.gi = false;
    }
    binding(t, e, i) {
        const s = this.ai.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.sourceExpression;
                this.pi = r;
                let t = o.iterable;
                while (null != t && Ir.includes(t.$kind)) {
                    t = t.expression;
                    this.fi = true;
                }
                this.mi = t;
                break;
            }
        }
        this.wi(i);
        const h = o.declaration;
        if (!(this.gi = 90137 === h.$kind || 106521 === h.$kind)) this.local = h.evaluate(i, this.$controller.scope, r.locator, null);
    }
    attaching(t, e, i) {
        this.bi(i);
        return this.xi(t, i);
    }
    detaching(t, e, i) {
        this.wi(i);
        return this.yi(t, i);
    }
    itemsChanged(t) {
        const {$controller: e} = this;
        if (!e.isActive) return;
        t |= e.flags;
        this.wi(t);
        this.bi(t);
        const i = K(this.yi(null, t), (() => this.xi(null, t)));
        if (i instanceof Promise) i.catch(Et);
    }
    handleCollectionChange(t, e) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        if (this.fi) {
            if (this.di) return;
            this.di = true;
            this.items = this.forOf.iterable.evaluate(e, i.scope, this.pi.locator, null);
            this.di = false;
            return;
        }
        e |= i.flags;
        this.bi(e);
        if (void 0 === t) {
            const t = K(this.yi(null, e), (() => this.xi(null, e)));
            if (t instanceof Promise) t.catch(Et);
        } else {
            const i = this.views.length;
            const s = A(t);
            if (s.deletedItems.length > 0) {
                s.deletedItems.sort(et);
                const t = K(this.ki(s, e), (() => this.Ci(i, s, e)));
                if (t instanceof Promise) t.catch(Et);
            } else this.Ci(i, s, e);
        }
    }
    wi(t) {
        var e;
        const i = this.$controller.scope;
        let s = this.Ai;
        let n = this.fi;
        if (n) {
            s = this.Ai = null !== (e = this.mi.evaluate(t, i, this.pi.locator, null)) && void 0 !== e ? e : null;
            n = this.fi = !Object.is(this.items, s);
        }
        const r = this.ui;
        if (4 & t) {
            if (void 0 !== r) r.unsubscribe(this);
        } else if (this.$controller.isActive) {
            const t = this.ui = R(n ? s : this.items);
            if (r !== t && r) r.unsubscribe(this);
            if (t) t.subscribe(this);
        }
    }
    bi(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.vi = e;
            return;
        }
        const i = this.forOf;
        if (void 0 === i) return;
        const s = [];
        this.forOf.iterate(t, e, ((t, e, i) => {
            s[e] = i;
        }));
        this.vi = s;
    }
    xi(t, e) {
        let i;
        let s;
        let n;
        let r;
        const {$controller: o, f: h, local: a, l: c, items: u} = this;
        const f = o.scope;
        const d = this.forOf;
        const m = d.count(e, u);
        const v = this.views = Array(m);
        d.iterate(e, u, ((u, g, p) => {
            n = v[g] = h.create().setLocation(c);
            n.nodes.unlink();
            if (this.gi) d.declaration.assign(e, r = l.fromParent(f, S.create()), this.pi.locator, p); else r = l.fromParent(f, S.create(a, p));
            Or(r.overrideContext, g, m);
            s = n.activate(null !== t && void 0 !== t ? t : n, o, e, r);
            if (s instanceof Promise) (null !== i && void 0 !== i ? i : i = []).push(s);
        }));
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    yi(t, e) {
        let i;
        let s;
        let n;
        let r = 0;
        const {views: o, $controller: l} = this;
        const h = o.length;
        for (;h > r; ++r) {
            n = o[r];
            n.release();
            s = n.deactivate(null !== t && void 0 !== t ? t : n, l, e);
            if (s instanceof Promise) (null !== i && void 0 !== i ? i : i = []).push(s);
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    ki(t, e) {
        let i;
        let s;
        let n;
        const {$controller: r, views: o} = this;
        const l = t.deletedItems;
        const h = l.length;
        let a = 0;
        for (;h > a; ++a) {
            n = o[l[a]];
            n.release();
            s = n.deactivate(n, r, e);
            if (s instanceof Promise) (null !== i && void 0 !== i ? i : i = []).push(s);
        }
        a = 0;
        let c = 0;
        for (;h > a; ++a) {
            c = l[a] - a;
            o.splice(c, 1);
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    Ci(t, e, i) {
        var s;
        let n;
        let r;
        let o;
        let h;
        let a = 0;
        const {$controller: c, f: u, local: f, vi: d, l: m, views: v} = this;
        const g = e.length;
        for (;g > a; ++a) if (-2 === e[a]) {
            o = u.create();
            v.splice(a, 0, o);
        }
        if (v.length !== g) throw new Error(`AUR0814:${v.length}!=${g}`);
        const p = c.scope;
        const w = e.length;
        E(v, e);
        const b = $r(e);
        const x = b.length;
        let y;
        let k = x - 1;
        a = w - 1;
        for (;a >= 0; --a) {
            o = v[a];
            y = v[a + 1];
            o.nodes.link(null !== (s = null === y || void 0 === y ? void 0 : y.nodes) && void 0 !== s ? s : m);
            if (-2 === e[a]) {
                if (this.gi) this.forOf.declaration.assign(i, h = l.fromParent(p, S.create()), this.pi.locator, d[a]); else h = l.fromParent(p, S.create(f, d[a]));
                Or(h.overrideContext, a, w);
                o.setLocation(m);
                r = o.activate(o, c, i, h);
                if (r instanceof Promise) (null !== n && void 0 !== n ? n : n = []).push(r);
            } else if (k < 0 || 1 === x || a !== b[k]) {
                Or(o.scope.overrideContext, a, w);
                o.nodes.insertBefore(o.location);
            } else {
                if (t !== w) Or(o.scope.overrideContext, a, w);
                --k;
            }
        }
        if (void 0 !== n) return 1 === n.length ? n[0] : Promise.all(n);
    }
    dispose() {
        this.views.forEach(Br);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ fs, Zi, Ei ];

lt([ Bt ], Repeat.prototype, "items", void 0);

qe("repeat")(Repeat);

let Tr = 16;

let Dr = new Int32Array(Tr);

let Pr = new Int32Array(Tr);

function $r(t) {
    const e = t.length;
    if (e > Tr) {
        Tr = e;
        Dr = new Int32Array(e);
        Pr = new Int32Array(e);
    }
    let i = 0;
    let s = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let a = 0;
    for (;r < e; r++) {
        s = t[r];
        if (-2 !== s) {
            o = Dr[i];
            n = t[o];
            if (-2 !== n && n < s) {
                Pr[r] = o;
                Dr[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                a = l + h >> 1;
                n = t[Dr[a]];
                if (-2 !== n && n < s) l = a + 1; else h = a;
            }
            n = t[Dr[l]];
            if (s < n || -2 === n) {
                if (l > 0) Pr[r] = Dr[l - 1];
                Dr[l] = r;
            }
        }
    }
    r = ++i;
    const c = new Int32Array(r);
    s = Dr[i - 1];
    while (i-- > 0) {
        c[i] = s;
        s = Pr[s];
    }
    while (r-- > 0) Dr[r] = 0;
    return c;
}

function Or(t, e, i) {
    const s = 0 === e;
    const n = e === i - 1;
    const r = e % 2 === 0;
    t.$index = e;
    t.$first = s;
    t.$last = n;
    t.$middle = !s && !n;
    t.$even = r;
    t.$odd = !r;
    t.$length = i;
}

class With {
    constructor(t, e) {
        this.id = H("au$component");
        this.id = H("au$component");
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, i) {
        const s = this.$controller;
        const n = this.view.bindings;
        let r;
        let o = 0, h = 0;
        if (s.isActive && null != n) {
            r = l.fromParent(s.scope, void 0 === t ? {} : t);
            for (h = n.length; h > o; ++o) n[o].$bind(2, r);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const r = l.fromParent(s.scope, void 0 === n ? {} : n);
        return this.view.activate(t, s, i, r);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

With.inject = [ Ei, fs ];

lt([ Bt ], With.prototype, "value", void 0);

qe("with")(With);

let Lr = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.cases = [];
        this.activeCases = [];
        this.promise = void 0;
    }
    link(t, e, i, s) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, e, i) {
        const s = this.view;
        const n = this.$controller;
        this.queue((() => s.activate(t, n, i, n.scope)));
        this.queue((() => this.swap(t, i, this.value)));
        return this.promise;
    }
    detaching(t, e, i) {
        this.queue((() => {
            const e = this.view;
            return e.deactivate(t, this.$controller, i);
        }));
        return this.promise;
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, i, this.value)));
    }
    caseChanged(t, e) {
        this.queue((() => this.Ri(t, e)));
    }
    Ri(t, e) {
        const i = t.isMatch(this.value, e);
        const s = this.activeCases;
        const n = s.length;
        if (!i) {
            if (n > 0 && s[0].id === t.id) return this.Si(null, e);
            return;
        }
        if (n > 0 && s[0].id < t.id) return;
        const r = [];
        let o = t.fallThrough;
        if (!o) r.push(t); else {
            const e = this.cases;
            const i = e.indexOf(t);
            for (let t = i, s = e.length; t < s && o; t++) {
                const i = e[t];
                r.push(i);
                o = i.fallThrough;
            }
        }
        return K(this.Si(null, e, r), (() => {
            this.activeCases = r;
            return this.Ei(null, e);
        }));
    }
    swap(t, e, i) {
        const s = [];
        let n = false;
        for (const t of this.cases) {
            if (n || t.isMatch(i, e)) {
                s.push(t);
                n = t.fallThrough;
            }
            if (s.length > 0 && !n) break;
        }
        const r = this.defaultCase;
        if (0 === s.length && void 0 !== r) s.push(r);
        return K(this.activeCases.length > 0 ? this.Si(t, e, s) : void 0, (() => {
            this.activeCases = s;
            if (0 === s.length) return;
            return this.Ei(t, e);
        }));
    }
    Ei(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        const s = this.activeCases;
        const n = s.length;
        if (0 === n) return;
        const r = i.scope;
        if (1 === n) return s[0].activate(t, e, r);
        return Y(...s.map((i => i.activate(t, e, r))));
    }
    Si(t, e, i = []) {
        const s = this.activeCases;
        const n = s.length;
        if (0 === n) return;
        if (1 === n) {
            const n = s[0];
            if (!i.includes(n)) {
                s.length = 0;
                return n.deactivate(t, e);
            }
            return;
        }
        return K(Y(...s.reduce(((s, n) => {
            if (!i.includes(n)) s.push(n.deactivate(t, e));
            return s;
        }), [])), (() => {
            s.length = 0;
        }));
    }
    queue(t) {
        const e = this.promise;
        let i;
        i = this.promise = K(K(e, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

lt([ Bt ], Lr.prototype, "value", void 0);

Lr = lt([ qe("switch"), ht(0, Ei), ht(1, fs) ], Lr);

let qr = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Bi = e;
        this.l = i;
        this.id = H("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Ii = s.config.level <= 1;
        this.Ut = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = null === n || void 0 === n ? void 0 : n.viewModel;
        if (r instanceof Lr) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t, e) {
        this.Ut.debug("isMatch()");
        const i = this.value;
        if (Array.isArray(i)) {
            if (void 0 === this.ui) this.ui = this.Ti(e, i);
            return i.includes(t);
        }
        return i === t;
    }
    valueChanged(t, e, i) {
        var s;
        if (Array.isArray(t)) {
            null === (s = this.ui) || void 0 === s ? void 0 : s.unsubscribe(this);
            this.ui = this.Ti(i, t);
        } else if (void 0 !== this.ui) this.ui.unsubscribe(this);
        this.$switch.caseChanged(this, i);
    }
    handleCollectionChange(t, e) {
        this.$switch.caseChanged(this, e);
    }
    activate(t, e, i) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(null !== t && void 0 !== t ? t : s, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(null !== t && void 0 !== t ? t : i, this.$controller, e);
    }
    dispose() {
        var t, e;
        null === (t = this.ui) || void 0 === t ? void 0 : t.unsubscribe(this);
        null === (e = this.view) || void 0 === e ? void 0 : e.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ti(t, e) {
        const i = this.Bi.getArrayObserver(e);
        i.subscribe(this);
        return i;
    }
    accept(t) {
        var e;
        if (true === this.$controller.accept(t)) return true;
        return null === (e = this.view) || void 0 === e ? void 0 : e.accept(t);
    }
};

qr.inject = [ Ei, a, fs, X ];

lt([ Bt ], qr.prototype, "value", void 0);

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
}) ], qr.prototype, "fallThrough", void 0);

qr = lt([ qe("case") ], qr);

let Ur = class DefaultCase extends qr {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

Ur = lt([ qe("default-case") ], Ur);

let _r = class PromiseTemplateController {
    constructor(t, e, i, s) {
        this.f = t;
        this.l = e;
        this.p = i;
        this.id = H("au$component");
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = s.scopeTo("promise.resolve");
    }
    link(t, e, i, s) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, e, i) {
        const s = this.view;
        const n = this.$controller;
        return K(s.activate(t, n, i, this.viewScope = l.fromParent(n.scope, {})), (() => this.swap(t, i)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, e) {
        var i, s;
        const n = this.value;
        if (!(n instanceof Promise)) {
            this.logger.warn(`The value '${String(n)}' is not a promise. No change will be done.`);
            return;
        }
        const r = this.p.domWriteQueue;
        const o = this.fulfilled;
        const l = this.rejected;
        const h = this.pending;
        const a = this.viewScope;
        let c;
        const u = {
            reusable: false
        };
        const f = () => {
            void Y(c = (this.preSettledTask = r.queueTask((() => Y(null === o || void 0 === o ? void 0 : o.deactivate(t, e), null === l || void 0 === l ? void 0 : l.deactivate(t, e), null === h || void 0 === h ? void 0 : h.activate(t, e, a))), u)).result.catch((t => {
                if (!(t instanceof rt)) throw t;
            })), n.then((i => {
                if (this.value !== n) return;
                const s = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => Y(null === h || void 0 === h ? void 0 : h.deactivate(t, e), null === l || void 0 === l ? void 0 : l.deactivate(t, e), null === o || void 0 === o ? void 0 : o.activate(t, e, a, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void c.then(s); else {
                    this.preSettledTask.cancel();
                    s();
                }
            }), (i => {
                if (this.value !== n) return;
                const s = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => Y(null === h || void 0 === h ? void 0 : h.deactivate(t, e), null === o || void 0 === o ? void 0 : o.deactivate(t, e), null === l || void 0 === l ? void 0 : l.activate(t, e, a, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void c.then(s); else {
                    this.preSettledTask.cancel();
                    s();
                }
            })));
        };
        if (1 === (null === (i = this.postSettledTask) || void 0 === i ? void 0 : i.status)) void this.postSettlePromise.then(f); else {
            null === (s = this.postSettledTask) || void 0 === s ? void 0 : s.cancel();
            f();
        }
    }
    detaching(t, e, i) {
        var s, n;
        null === (s = this.preSettledTask) || void 0 === s ? void 0 : s.cancel();
        null === (n = this.postSettledTask) || void 0 === n ? void 0 : n.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt ], _r.prototype, "value", void 0);

_r = lt([ qe("promise"), ht(0, Ei), ht(1, fs), ht(2, Jt), ht(3, X) ], _r);

let Fr = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        jr(t).pending = this;
    }
    activate(t, e, i) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(s, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(i, this.$controller, e);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt({
    mode: t.toView
}) ], Fr.prototype, "value", void 0);

Fr = lt([ qe("pending"), ht(0, Ei), ht(1, fs) ], Fr);

let Vr = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        jr(t).fulfilled = this;
    }
    activate(t, e, i, s) {
        this.value = s;
        let n = this.view;
        if (void 0 === n) n = this.view = this.f.create().setLocation(this.l);
        if (n.isActive) return;
        return n.activate(n, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(i, this.$controller, e);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt({
    mode: t.fromView
}) ], Vr.prototype, "value", void 0);

Vr = lt([ qe("then"), ht(0, Ei), ht(1, fs) ], Vr);

let Mr = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        jr(t).rejected = this;
    }
    activate(t, e, i, s) {
        this.value = s;
        let n = this.view;
        if (void 0 === n) n = this.view = this.f.create().setLocation(this.l);
        if (n.isActive) return;
        return n.activate(n, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(i, this.$controller, e);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

lt([ Bt({
    mode: t.fromView
}) ], Mr.prototype, "value", void 0);

Mr = lt([ qe("catch"), ht(0, Ei), ht(1, fs) ], Mr);

function jr(t) {
    const e = t.parent;
    const i = null === e || void 0 === e ? void 0 : e.viewModel;
    if (i instanceof _r) return i;
    throw new Error(`AUR0813`);
}

let Nr = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Nr = lt([ jt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Nr);

let Wr = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Wr = lt([ jt({
    pattern: "then",
    symbols: ""
}) ], Wr);

let Hr = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Hr = lt([ jt({
    pattern: "catch",
    symbols: ""
}) ], Hr);

function zr(t, e, i, s) {
    if (Rt(e)) return Gr(t, e, i, s);
    if (oi.isType(e)) return Xr(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Di = i;
        this.Pi = void 0;
    }
    get definition() {
        if (void 0 === this.Pi) this.Pi = CustomElementDefinition.create({
            name: oi.generateName(),
            template: this.node,
            needsCompile: Rt(this.node),
            instructions: this.instructions,
            dependencies: this.Di
        });
        return this.Pi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Li).getViewFactory(this.definition, t.createChild().register(...this.Di));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Di);
    }
}

function Gr(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (Is(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) Kr(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function Xr(t, e, i, s) {
    const n = oi.getDefinition(e);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const a = n.bindables;
    const c = t.document.createElement(n.name);
    c.className = "au";
    if (!l.includes(e)) l.push(e);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (Is(e)) h.push(e); else if (void 0 === a[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) Kr(t, c, s, o, l);
    return new RenderPlan(c, o, l);
}

function Kr(t, e, i, s, n) {
    for (let r = 0, o = i.length; r < o; ++r) {
        const o = i[r];
        switch (typeof o) {
          case "string":
            e.appendChild(t.document.createTextNode(o));
            break;

          case "object":
            if (o instanceof t.Node) e.appendChild(o); else if ("mergeInto" in o) o.mergeInto(e, s, n);
        }
    }
}

function Yr(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.$i = e;
        this.Oi = i;
        this.r = s;
        this.id = H("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Li = void 0;
        this.qi = e.props.reduce(Yr, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Li !== s) {
            this.Li = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.ri(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Li === t) return;
        this.Li = t;
        this.composing = true;
        i |= s.flags;
        const n = K(this.ri(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (n instanceof Promise) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return K(void 0 === t ? K(e, (t => this.Ui(t, s))) : t, (t => this.si(this.view = t, i, s)));
    }
    ri(t, e, i) {
        return null === t || void 0 === t ? void 0 : t.deactivate(null !== e && void 0 !== e ? e : t, this.$controller, i);
    }
    si(t, e, i) {
        const {$controller: s} = this;
        return K(null === t || void 0 === t ? void 0 : t.activate(null !== e && void 0 !== e ? e : t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    Ui(t, e) {
        const i = this._i(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    _i(t, e) {
        if (!t) return;
        const i = this.Oi.controller.container;
        if ("object" === typeof t) {
            if (Zr(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (Rt(t)) {
            const e = i.find(oi, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return zr(this.p, t, this.qi, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

AuRender.inject = [ Jt, Bs, Ji, Li ];

lt([ Bt ], AuRender.prototype, "component", void 0);

lt([ Bt({
    mode: t.fromView
}) ], AuRender.prototype, "composing", void 0);

He({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function Zr(t) {
    return "lockScope" in t;
}

class AuCompose {
    constructor(t, e, i, s, n, r, o) {
        this.c = t;
        this.parent = e;
        this.host = i;
        this.l = s;
        this.p = n;
        this.scopeBehavior = "auto";
        this.Fi = void 0;
        this.r = t.get(Li);
        this.$i = r;
        this.Vi = o;
    }
    static get inject() {
        return [ W, Zi, cs, fs, Jt, Bs, it(CompositionContextFactory) ];
    }
    get pending() {
        return this.Mi;
    }
    get composition() {
        return this.Fi;
    }
    attaching(t, e, i) {
        return this.Mi = K(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Vi.isCurrent(t)) this.Mi = void 0;
        }));
    }
    detaching(t) {
        const e = this.Fi;
        const i = this.Mi;
        this.Vi.invalidate();
        this.Fi = this.Mi = void 0;
        return K(i, (() => null === e || void 0 === e ? void 0 : e.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Fi) {
            this.Fi.update(this.model);
            return;
        }
        this.Mi = K(this.Mi, (() => K(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Vi.isCurrent(t)) this.Mi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Vi;
        const s = this.Fi;
        return K(i.create(t), (t => {
            if (i.isCurrent(t)) return K(this.compose(t), (n => {
                if (i.isCurrent(t)) return K(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Fi = n;
                        return K(null === s || void 0 === s ? void 0 : s.deactivate(e), (() => t));
                    } else return K(n.controller.deactivate(n.controller, this.$controller, 4), (() => {
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
        let e;
        let i;
        let s;
        const {view: n, viewModel: r, model: o} = t.change;
        const {c: h, host: a, $controller: c, l: u} = this;
        const f = this.getDef(r);
        const d = h.createChild();
        const m = null == u ? a.parentNode : u.parentNode;
        if (null !== f) {
            if (f.containerless) throw new Error(`AUR0806`);
            if (null == u) {
                i = a;
                s = () => {};
            } else {
                i = m.insertBefore(this.p.document.createElement(f.name), u);
                s = () => {
                    i.remove();
                };
            }
            e = this.getVm(d, r, i);
        } else {
            i = null == u ? a : u;
            e = this.getVm(d, r, i);
        }
        const v = () => {
            if (null !== f) {
                const n = Controller.$el(d, e, i, {
                    projections: this.$i.projections
                }, f);
                return new CompositionController(n, (t => n.activate(null !== t && void 0 !== t ? t : n, c, 2, c.scope.parentScope)), (t => K(n.deactivate(null !== t && void 0 !== t ? t : n, c, 4), s)), (t => {
                    var i;
                    return null === (i = e.activate) || void 0 === i ? void 0 : i.call(e, t);
                }), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: oi.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, d);
                const o = Controller.$view(r, c);
                const h = "auto" === this.scopeBehavior ? l.fromParent(this.parent.scope, e) : l.create(e);
                if (ws(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(null !== t && void 0 !== t ? t : o, c, 2, h)), (t => o.deactivate(null !== t && void 0 !== t ? t : o, c, 4)), (t => {
                    var i;
                    return null === (i = e.activate) || void 0 === i ? void 0 : i.call(e, t);
                }), t);
            }
        };
        if ("activate" in e) return K(e.activate(o), (() => v())); else return v();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = ws(i);
        t.registerResolver(s.Element, t.registerResolver(cs, new G("ElementResolver", n ? null : i)));
        t.registerResolver(fs, new G("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        t.registerResolver(e, new G("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = At(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return oi.isType(e) ? oi.getDefinition(e) : null;
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

He("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return K(t.load(), (t => new CompositionContext(++this.id, t)));
    }
    invalidate() {
        this.id++;
    }
}

class ChangeInfo {
    constructor(t, e, i, s) {
        this.view = t;
        this.viewModel = e;
        this.model = i;
        this.src = s;
    }
    load() {
        if (Ct(this.view) || Ct(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
    }
}

class LoadedChangeInfo {
    constructor(t, e, i, s) {
        this.view = t;
        this.viewModel = e;
        this.model = i;
        this.src = s;
    }
}

class CompositionContext {
    constructor(t, e) {
        this.id = t;
        this.change = e;
    }
}

class CompositionController {
    constructor(t, e, i, s, n) {
        this.controller = t;
        this.start = e;
        this.stop = i;
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
    constructor(t, e, i, s) {
        var n, r;
        this.ji = null;
        this.Ni = null;
        let o;
        const l = e.auSlot;
        const h = null === (r = null === (n = i.instruction) || void 0 === n ? void 0 : n.projections) || void 0 === r ? void 0 : r[l.name];
        if (null == h) {
            o = s.getViewFactory(l.fallback, i.controller.container);
            this.Wi = false;
        } else {
            o = s.getViewFactory(h, i.parent.controller.container);
            this.Wi = true;
        }
        this.Oi = i;
        this.view = o.create().setLocation(t);
    }
    static get inject() {
        return [ fs, Bs, Ji, Li ];
    }
    binding(t, e, i) {
        var s;
        this.ji = this.$controller.scope.parentScope;
        let n;
        if (this.Wi) {
            n = this.Oi.controller.scope.parentScope;
            (this.Ni = l.fromParent(n, n.bindingContext)).overrideContext.$host = null !== (s = this.expose) && void 0 !== s ? s : this.ji.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Wi ? this.Ni : this.ji);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Wi && null != this.Ni) this.Ni.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

lt([ Bt ], AuSlot.prototype, "expose", void 0);

He({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Jr = O.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let Qr = class SanitizeValueConverter {
    constructor(t) {
        this.Hi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Hi.sanitize(t);
    }
};

Qr = lt([ ht(0, Jr) ], Qr);

B("sanitize")(Qr);

let to = class ViewValueConverter {
    constructor(t) {
        this.zi = t;
    }
    toView(t, e) {
        return this.zi.getViewComponentForObject(t, e);
    }
};

to = lt([ ht(0, Oi) ], to);

B("view")(to);

const eo = DebounceBindingBehavior;

const io = OneTimeBindingBehavior;

const so = ToViewBindingBehavior;

const no = FromViewBindingBehavior;

const ro = SignalBindingBehavior;

const oo = ThrottleBindingBehavior;

const lo = TwoWayBindingBehavior;

const ho = TemplateCompiler;

const ao = NodeObserverLocator;

const co = [ ho, ao ];

const uo = SVGAnalyzer;

const fo = Yt;

const mo = Kt;

const vo = Xt;

const go = Gt;

const po = Zt;

const wo = [ vo, go, po ];

const bo = [ fo, mo ];

const xo = En;

const yo = Sn;

const ko = Bn;

const Co = An;

const Ao = kn;

const Ro = Cn;

const So = Rn;

const Eo = Ln;

const Bo = In;

const Io = Tn;

const To = Dn;

const Do = Pn;

const Po = On;

const $o = $n;

const Oo = qn;

const Lo = [ yo, Ao, Co, Ro, So, xo, ko, Eo, Bo, Io, To, Po, $o, Do, Oo ];

const qo = Qr;

const Uo = to;

const _o = ObserveShallow;

const Fo = If;

const Vo = Else;

const Mo = Repeat;

const jo = With;

const No = Lr;

const Wo = qr;

const Ho = Ur;

const zo = _r;

const Go = Fr;

const Xo = Vr;

const Ko = Mr;

const Yo = Nr;

const Zo = Wr;

const Jo = Hr;

const Qo = AttrBindingBehavior;

const tl = SelfBindingBehavior;

const el = UpdateTriggerBindingBehavior;

const il = AuRender;

const sl = AuCompose;

const nl = Portal;

const rl = Focus;

const ol = Er;

const ll = [ eo, io, so, no, ro, oo, lo, qo, Uo, _o, Fo, Vo, Mo, jo, No, Wo, Ho, zo, Go, Xo, Ko, Yo, Zo, Jo, Qo, tl, el, il, sl, nl, rl, ol, AuSlot ];

const hl = Ms;

const al = _s;

const cl = Us;

const ul = Ns;

const fl = Hs;

const dl = Vs;

const ml = Ws;

const vl = js;

const gl = qs;

const pl = Fs;

const wl = Zs;

const bl = sn;

const xl = Js;

const yl = Qs;

const kl = tn;

const Cl = en;

const Al = Ks;

const Rl = nn;

const Sl = [ ml, fl, hl, vl, ul, gl, cl, al, pl, dl, wl, bl, xl, yl, kl, Cl, Al, Rl ];

const El = Bl($);

function Bl(t) {
    return {
        optionsProvider: t,
        register(e) {
            const i = {
                coercingOptions: {
                    enableCoercion: false,
                    coerceNullish: false
                }
            };
            t(i);
            return e.register(U.instance(h, i.coercingOptions), ...co, ...ll, ...wo, ...Lo, ...Sl);
        },
        customize(e) {
            return Bl(null !== e && void 0 !== e ? e : t);
        }
    };
}

const Il = O.createInterface("IAurelia");

class Aurelia {
    constructor(t = O.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Gi = false;
        this.Xi = false;
        this.Ki = void 0;
        this.next = void 0;
        this.Yi = void 0;
        this.Zi = void 0;
        if (t.has(Il, true)) throw new Error(`AUR0768`);
        t.registerResolver(Il, new G("IAurelia", this));
        t.registerResolver(os, this.Ji = new G("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Gi;
    }
    get isStopping() {
        return this.Xi;
    }
    get root() {
        if (null == this.Ki) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.Ki;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.Qi(t.host), this.container, this.Ji);
        return this;
    }
    enhance(t, e) {
        var i;
        const s = null !== (i = t.container) && void 0 !== i ? i : this.container.createChild();
        const n = t.host;
        const r = this.Qi(n);
        const o = t.component;
        let l;
        if (At(o)) {
            s.registerResolver(r.HTMLElement, s.registerResolver(r.Element, s.registerResolver(cs, new G("ElementResolver", n))));
            l = s.invoke(o);
        } else l = o;
        s.registerResolver(us, new G("IEventTarget", n));
        e = null !== e && void 0 !== e ? e : null;
        const h = Controller.$el(s, l, n, null, CustomElementDefinition.create({
            name: oi.generateName(),
            template: n,
            enhance: true
        }));
        return K(h.activate(h, e, 2), (() => h));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    Qi(t) {
        let e;
        if (!this.container.has(Jt, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new ot(t.ownerDocument.defaultView);
            this.container.register(U.instance(Jt, e));
        } else e = this.container.get(Jt);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (this.Yi instanceof Promise) return this.Yi;
        return this.Yi = K(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.Ji.prepare(this.Ki = t);
            this.Gi = true;
            return K(t.activate(), (() => {
                this.ir = true;
                this.Gi = false;
                this.Yi = void 0;
                this.ts(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (this.Zi instanceof Promise) return this.Zi;
        if (true === this.ir) {
            const e = this.Ki;
            this.ir = false;
            this.Xi = true;
            return this.Zi = K(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.Ki = void 0;
                this.Ji.dispose();
                this.Xi = false;
                this.ts(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Xi) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    ts(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var Tl;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(Tl || (Tl = {}));

const Dl = O.createInterface("IDialogService");

const Pl = O.createInterface("IDialogController");

const $l = O.createInterface("IDialogDomRenderer");

const Ol = O.createInterface("IDialogDom");

const Ll = O.createInterface("IDialogGlobalSettings");

class DialogOpenResult {
    constructor(t, e) {
        this.wasCancelled = t;
        this.dialog = e;
    }
    static create(t, e) {
        return new DialogOpenResult(t, e);
    }
}

class DialogCloseResult {
    constructor(t, e) {
        this.status = t;
        this.value = e;
    }
    static create(t, e) {
        return new DialogCloseResult(t, e);
    }
}

var ql;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(ql || (ql = {}));

class DialogController {
    constructor(t, e) {
        this.p = t;
        this.ctn = e;
        this.closed = new Promise(((t, e) => {
            this.Pt = t;
            this.St = e;
        }));
    }
    static get inject() {
        return [ Jt, W ];
    }
    activate(t) {
        var e;
        const i = this.ctn.createChild();
        const {model: s, template: n, rejectOnCancel: r} = t;
        const o = i.get($l);
        const l = null !== (e = t.host) && void 0 !== e ? e : this.p.document.body;
        const h = this.dom = o.render(l, t);
        const a = i.has(us, true) ? i.get(us) : null;
        const c = h.contentHost;
        this.settings = t;
        if (null == a || !a.contains(l)) i.register(U.instance(us, l));
        i.register(U.instance(cs, c), U.instance(Ol, h));
        return new Promise((e => {
            var n, r;
            const o = Object.assign(this.cmp = this.getOrCreateVm(i, t, c), {
                $dialog: this
            });
            e(null !== (r = null === (n = o.canActivate) || void 0 === n ? void 0 : n.call(o, s)) && void 0 !== r ? r : true);
        })).then((e => {
            var o;
            if (true !== e) {
                h.dispose();
                if (r) throw Ul(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return K(null === (o = l.activate) || void 0 === o ? void 0 : o.call(l, s), (() => {
                var e;
                const s = this.controller = Controller.$el(i, l, c, null, CustomElementDefinition.create(null !== (e = this.getDefinition(l)) && void 0 !== e ? e : {
                    name: oi.generateName(),
                    template: n
                }));
                return K(s.activate(s, null, 2), (() => {
                    var e;
                    h.overlay.addEventListener(null !== (e = t.mouseEvent) && void 0 !== e ? e : "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            h.dispose();
            throw t;
        }));
    }
    deactivate(t, e) {
        if (this.es) return this.es;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const a = new Promise((a => {
            var c, u;
            a(K(null !== (u = null === (c = r.canDeactivate) || void 0 === c ? void 0 : c.call(r, h)) && void 0 !== u ? u : true, (a => {
                var c;
                if (true !== a) {
                    i = false;
                    this.es = void 0;
                    if (l) throw Ul(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return K(null === (c = r.deactivate) || void 0 === c ? void 0 : c.call(r, h), (() => K(s.deactivate(s, null, 4), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(null !== o && void 0 !== o ? o : "click", this);
                    if (!l && "error" !== t) this.Pt(h); else this.St(Ul(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.es = void 0;
            throw t;
        }));
        this.es = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = _l(t);
        return new Promise((t => {
            var i, s;
            return t(K(null === (s = (i = this.cmp).deactivate) || void 0 === s ? void 0 : s.call(i, DialogCloseResult.create("error", e)), (() => K(this.controller.deactivate(this.controller, null, 4), (() => {
                this.dom.dispose();
                this.St(e);
            })))));
        }));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, e, i) {
        const s = e.component;
        if (null == s) return new EmptyComponent;
        if ("object" === typeof s) return s;
        const n = this.p;
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(cs, new G("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = At(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return oi.isType(e) ? oi.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Ul(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function _l(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.ft = t;
        this.p = e;
        this.ss = i;
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
        return [ W, Jt, Ll ];
    }
    static register(t) {
        t.register(U.singleton(Dl, this), Ce.beforeDeactivate(Dl, (t => K(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Vl(new Promise((e => {
            var i;
            const s = DialogSettings.from(this.ss, t);
            const n = null !== (i = s.container) && void 0 !== i ? i : this.ft.createChild();
            e(K(s.load(), (t => {
                const e = n.invoke(DialogController);
                n.register(U.instance(Pl, e));
                n.register(U.callback(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return K(e.activate(t), (t => {
                    if (!t.wasCancelled) {
                        if (1 === this.dlgs.push(e)) this.p.window.addEventListener("keydown", this);
                        const t = () => this.remove(e);
                        e.closed.then(t, t);
                    }
                    return t;
                }));
            })));
        })));
    }
    closeAll() {
        return Promise.all(Array.from(this.dlgs).map((t => {
            if (t.settings.rejectOnCancel) return t.cancel().then((() => null));
            return t.cancel().then((e => "cancel" === e.status ? null : t));
        }))).then((t => t.filter((t => !!t))));
    }
    remove(t) {
        const e = this.dlgs;
        const i = e.indexOf(t);
        if (i > -1) this.dlgs.splice(i, 1);
        if (0 === e.length) this.p.window.removeEventListener("keydown", this);
    }
    handleEvent(t) {
        const e = t;
        const i = Ml(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).ls().os();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const s = Y(null == e ? void 0 : K(e(), (e => {
            t.component = e;
        })), At(i) ? K(i(), (e => {
            t.template = e;
        })) : void 0);
        return s instanceof Promise ? s.then((() => t)) : t;
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

function Fl(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function Vl(t) {
    t.whenClosed = Fl;
    return t;
}

function Ml(t) {
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
        U.singleton(Ll, this).register(t);
    }
}

const jl = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${jl} display:flex;`;
        this.overlayCss = jl;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        U.singleton($l, this).register(t);
    }
    render(t) {
        const e = this.p.document;
        const i = (t, i) => {
            const s = e.createElement(t);
            s.style.cssText = i;
            return s;
        };
        const s = t.appendChild(i("au-dialog-container", this.wrapperCss));
        const n = s.appendChild(i("au-dialog-overlay", this.overlayCss));
        const r = s.appendChild(i("div", this.hostCss));
        return new DefaultDialogDom(s, n, r);
    }
}

DefaultDialogDomRenderer.inject = [ Jt ];

class DefaultDialogDom {
    constructor(t, e, i) {
        this.wrapper = t;
        this.overlay = e;
        this.contentHost = i;
    }
    dispose() {
        this.wrapper.remove();
    }
}

function Nl(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, Ce.beforeCreate((() => t(i.get(Ll))))),
        customize(t, i) {
            return Nl(t, null !== i && void 0 !== i ? i : e);
        }
    };
}

const Wl = Nl((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(U.singleton(Ll, this));
    }
} ]);

const Hl = Nl($, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const zl = O.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, i) {
        this.ctn = t;
        this.p = e;
        this.r = i;
    }
    define(t, e, i) {
        if (!t.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let s;
        if (null == e) throw new Error("Invalid custom element definition");
        switch (typeof e) {
          case "function":
            s = oi.isType(e) ? oi.getDefinition(e) : CustomElementDefinition.create(oi.generateName(), e);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (s.containerless) throw new Error("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const n = !(null === i || void 0 === i ? void 0 : i.extends) ? HTMLElement : this.p.document.createElement(i.extends).constructor;
        const r = this.ctn;
        const o = this.r;
        const l = s.bindables;
        const h = this.p;
        class CustomElementClass extends n {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = r.createChild();
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(cs, new G("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                as(this, e.key, n);
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
            attributeChangedCallback(t, e, i) {
                this.auInit();
                this.auCtrl.viewModel[t] = i;
            }
        }
        CustomElementClass.observedAttributes = Object.keys(l);
        for (const t in l) Object.defineProperty(CustomElementClass.prototype, t, {
            configurable: true,
            enumerable: false,
            get() {
                return this["auCtrl"].viewModel[t];
            },
            set(e) {
                if (!this["auInited"]) this["auInit"]();
                this["auCtrl"].viewModel[t] = e;
            }
        });
        this.p.customElements.define(t, CustomElementClass, i);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ W, Jt, Li ];

export { AdoptedStyleSheetsStyles, AppRoot, Ce as AppTask, Yt as AtPrefixedTriggerAttributePattern, fo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, Qo as AttrBindingBehaviorRegistration, Pn as AttrBindingCommand, Do as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, bl as AttributeBindingRendererRegistration, AttributeNSAccessor, zt as AttributePattern, AuCompose, AuRender, il as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Dt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, yn as BindingCommand, BindingCommandDefinition, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, En as CallBindingCommand, xo as CallBindingCommandRegistration, CallBindingInstruction, hl as CallBindingRendererRegistration, Dn as CaptureBindingCommand, To as CaptureBindingCommandRegistration, qr as Case, CheckedObserver, Be as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, On as ClassBindingCommand, Po as ClassBindingCommandRegistration, Kt as ColonPrefixedBindAttributePattern, mo as ColonPrefixedBindAttributePatternRegistration, gn as CommandType, ComputedWatcher, Controller, Ve as CustomAttribute, CustomAttributeDefinition, al as CustomAttributeRendererRegistration, oi as CustomElement, CustomElementDefinition, cl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, eo as DebounceBindingBehaviorRegistration, Sn as DefaultBindingCommand, yo as DefaultBindingCommandRegistration, Lo as DefaultBindingLanguage, wo as DefaultBindingSyntax, Ur as DefaultCase, co as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, Sl as DefaultRenderers, ll as DefaultResources, Tl as DefinitionType, Tn as DelegateBindingCommand, Io as DelegateBindingCommandRegistration, DialogCloseResult, Wl as DialogConfiguration, DialogController, ql as DialogDeactivationStatuses, Hl as DialogDefaultConfiguration, DialogOpenResult, DialogService, Gt as DotSeparatedAttributePattern, go as DotSeparatedAttributePatternRegistration, Else, Vo as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, Focus, Bn as ForBindingCommand, ko as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, no as FromViewBindingBehaviorRegistration, An as FromViewBindingCommand, Co as FromViewBindingCommandRegistration, Vr as FulfilledTemplateController, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, os as IAppRoot, ke as IAppTask, ee as IAttrMapper, Mt as IAttributeParser, Vt as IAttributePattern, Ss as IAuSlotsInfo, Il as IAurelia, Zi as IController, Pl as IDialogController, Ol as IDialogDom, $l as IDialogDomRenderer, Ll as IDialogGlobalSettings, Dl as IDialogService, As as IEventDelegator, us as IEventTarget, ys as IHistory, Ji as IHydrationContext, Bs as IInstruction, ki as ILifecycleHooks, Ys as IListenerBehaviorOptions, xs as ILocation, cs as INode, ao as INodeObserverLocatorRegistration, Jt as IPlatform, Rs as IProjections, fs as IRenderLocation, Ds as IRenderer, Li as IRendering, Qt as ISVGAnalyzer, Jr as ISanitizer, gi as IShadowDOMGlobalStyles, vi as IShadowDOMStyles, Ut as ISyntaxInterpreter, Ts as ITemplateCompiler, Qn as ITemplateCompilerHooks, ho as ITemplateCompilerRegistration, Un as ITemplateElementFactory, Ei as IViewFactory, Oi as IViewLocator, zl as IWcElementRegistry, bs as IWindow, ls as IWorkTracker, If, Fo as IfRegistration, Es as InstructionType, InterpolationBinding, ul as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, fl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, dl as LetElementRendererRegistration, Ri as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, wl as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, ds as NodeType, NoopSVGAnalyzer, ObserveShallow, OneTimeBindingBehavior, io as OneTimeBindingBehaviorRegistration, kn as OneTimeBindingCommand, Ao as OneTimeBindingCommandRegistration, Fr as PendingTemplateController, Portal, _r as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, ml as PropertyBindingRendererRegistration, Xt as RefAttributePattern, vo as RefAttributePatternRegistration, RefBinding, Eo as RefBindingCommandRegistration, RefBindingInstruction, vl as RefBindingRendererRegistration, Mr as RejectedTemplateController, RenderPlan, Rendering, Repeat, Mo as RepeatRegistration, SVGAnalyzer, uo as SVGAnalyzerRegistration, Qr as SanitizeValueConverter, qo as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, tl as SelfBindingBehaviorRegistration, SetAttributeInstruction, xl as SetAttributeRendererRegistration, SetClassAttributeInstruction, yl as SetClassAttributeRendererRegistration, SetPropertyInstruction, gl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, kl as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, bo as ShortHandBindingSyntax, SignalBindingBehavior, ro as SignalBindingBehaviorRegistration, El as StandardConfiguration, StyleAttributeAccessor, $n as StyleBindingCommand, $o as StyleBindingCommandRegistration, pi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, Cl as StylePropertyBindingRendererRegistration, Lr as Switch, TemplateCompiler, ir as TemplateCompilerHooks, pl as TemplateControllerRendererRegistration, TextBindingInstruction, Al as TextBindingRendererRegistration, ThrottleBindingBehavior, oo as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, so as ToViewBindingBehaviorRegistration, Cn as ToViewBindingCommand, Ro as ToViewBindingCommandRegistration, In as TriggerBindingCommand, Bo as TriggerBindingCommandRegistration, TwoWayBindingBehavior, lo as TwoWayBindingBehaviorRegistration, Rn as TwoWayBindingCommand, So as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, el as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, ViewFactory, ViewLocator, Xi as ViewModelKind, to as ViewValueConverter, Uo as ViewValueConverterRegistration, Pi as Views, We as Watch, WcCustomElementRegistry, With, jo as WithRegistration, Fn as allResources, Xs as applyBindingBehavior, jt as attributePattern, Bt as bindable, pn as bindingCommand, Re as children, Pt as coercer, Ge as containerless, ps as convertToRenderLocation, zr as createElement, fi as cssModules, Le as customAttribute, He as customElement, vs as getEffectiveParentNode, hs as getRef, Hi as isCustomElementController, zi as isCustomElementViewModel, Is as isInstruction, ws as isRenderLocation, Si as lifecycleHooks, hi as processContent, Ps as renderer, gs as setEffectiveParentNode, as as setRef, di as shadowCSS, sr as templateCompilerHooks, qe as templateController, ze as useShadowDOM, $i as view, Me as watch };
//# sourceMappingURL=index.mjs.map
