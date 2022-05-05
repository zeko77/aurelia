import { BindingMode as t, subscriberCollection as e, withFlushQueue as i, connectable as s, registerAliases as n, ConnectableSwitcher as r, ProxyObservable as o, Scope as l, ICoercionConfiguration as h, IObserverLocator as a, IExpressionParser as c, AccessScopeExpression as u, DelegationStrategy as f, BindingBehaviorExpression as d, BindingBehaviorFactory as m, PrimitiveLiteralExpression as v, bindingBehavior as g, BindingInterceptor as p, ISignaler as w, PropertyAccessor as b, INodeObserverLocator as x, SetterObserver as y, IDirtyChecker as k, alias as C, applyMutationsToIndices as A, getCollectionObserver as R, BindingContext as S, synchronizeIndices as E, valueConverter as B } from "@aurelia/runtime";

export { LifecycleFlags } from "@aurelia/runtime";

import { Protocol as I, getPrototypeChain as T, firstDefined as D, kebabCase as P, noop as $, DI as O, emptyArray as L, all as q, Registration as U, IPlatform as F, mergeArrays as _, fromDefinitionOrDefault as M, pascalCase as V, fromAnnotationOrTypeOrDefault as j, fromAnnotationOrDefinitionOrTypeOrDefault as N, IContainer as W, nextId as H, optional as z, InstanceProvider as G, ILogger as X, onResolve as K, resolveAll as Y, camelCase as Z, toArray as J, emptyObject as Q, IServiceLocator as tt, compareNumber as et, transient as it } from "@aurelia/kernel";

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

function St(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        ut(Bt, BindableDefinition.create(e, t, i), t.constructor, e);
        pt(t.constructor, It.keyFrom(e));
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

function Et(t) {
    return t.startsWith(Bt);
}

const Bt = mt("bindable");

const It = Object.freeze({
    name: Bt,
    keyFrom: t => `${Bt}:${t}`,
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
                if (!ct(Bt, t, n)) pt(t, It.keyFrom(n));
                ut(Bt, e, t, n);
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
        const e = Bt.length + 1;
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
            o = wt(h).filter(Et);
            l = o.length;
            for (a = 0; a < l; ++a) i[r++] = at(Bt, h, o[a].slice(e));
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
        return new BindableDefinition(D(s.attribute, P(e)), D(s.callback, `${e}Changed`), D(s.mode, t.toView), D(s.primary, false), D(s.property, e), D(s.set, Pt(e, i, s)));
    }
}

function Tt(t, e, i) {
    Dt.define(t, e);
}

const Dt = {
    key: mt("coercer"),
    define(t, e) {
        ut(Dt.key, t[e].bind(t), t);
    },
    for(t) {
        return at(Dt.key, t);
    }
};

function Pt(t, e, i = {}) {
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
            l = "function" === typeof t ? t.bind(o) : null !== (r = Dt.for(o)) && void 0 !== r ? r : $;
            break;
        }
    }
    return l === $ ? l : $t(l, i.nullable);
}

function $t(t, e) {
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
        Ot = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ot, this.f);
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

let Ot;

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

const Lt = O.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        s = s.filter(qt);
        if (s.length > 0) {
            s.sort(Ut);
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

function qt(t) {
    return t.isEndpoint;
}

function Ut(t, e) {
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

const Ft = O.createInterface("IAttributePattern");

const _t = O.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.U = {};
        this.F = t;
        const i = this._ = {};
        const s = e.reduce(((t, e) => {
            const s = Nt(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), L);
        t.add(s);
    }
    parse(t, e) {
        let i = this.U[t];
        if (null == i) i = this.U[t] = this.F.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this._[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ Lt, q(Ft) ];

function Mt(...t) {
    return function e(i) {
        return Wt.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        U.singleton(Ft, this.Type).register(t);
    }
}

const Vt = vt("attribute-pattern");

const jt = "attribute-pattern-definitions";

const Nt = t => I.annotation.get(t, jt);

const Wt = Object.freeze({
    name: Vt,
    definitionAnnotationKey: jt,
    define(t, e) {
        const i = new AttributePatternResourceDefinition(e);
        ut(Vt, i, e);
        gt(e, Vt);
        I.annotation.set(e, jt, t);
        pt(e, jt);
        return e;
    },
    getPatternDefinitions: Nt
});

let Ht = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

Ht = lt([ Mt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], Ht);

let zt = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

zt = lt([ Mt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], zt);

let Gt = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

Gt = lt([ Mt({
    pattern: ":PART",
    symbols: ":"
}) ], Gt);

let Xt = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

Xt = lt([ Mt({
    pattern: "@PART",
    symbols: "@"
}) ], Xt);

let Kt = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

Kt = lt([ Mt({
    pattern: "...$attrs",
    symbols: ""
}) ], Kt);

const Yt = F;

const Zt = O.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function Jt(t) {
    const e = bt();
    let i;
    for (i of t) e[i] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.M = Object.assign(bt(), {
            a: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: Jt([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: bt(),
            altGlyphDef: Jt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: bt(),
            altGlyphItem: Jt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: bt(),
            animate: Jt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: Jt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: Jt([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: Jt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: Jt([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: Jt([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": Jt([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: Jt([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: Jt([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: Jt([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: Jt([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: Jt([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: Jt([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: Jt([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: Jt([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: Jt([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: Jt([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: Jt([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: Jt([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: Jt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: Jt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: Jt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: Jt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: Jt([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: Jt([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: Jt([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: Jt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: Jt([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: Jt([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: Jt([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: Jt([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: Jt([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: Jt([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: Jt([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: Jt([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: Jt([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": Jt([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": Jt([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": Jt([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": Jt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": Jt([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: Jt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: Jt([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: Jt([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: bt(),
            hkern: Jt([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: Jt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: Jt([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: Jt([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: Jt([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: Jt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": Jt([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: Jt([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: Jt([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: Jt([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: Jt([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: Jt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: Jt([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: Jt([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: Jt([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: Jt([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: Jt([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: Jt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: Jt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: Jt([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: Jt([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: Jt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: Jt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: Jt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: Jt([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: Jt([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.V = Jt([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.j = Jt([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.M;
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
        return U.singleton(Zt, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        var i;
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.V[t.nodeName] && true === this.j[e] || true === (null === (i = this.M[t.nodeName]) || void 0 === i ? void 0 : i[e]);
    }
}

SVGAnalyzer.inject = [ Yt ];

const Qt = O.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

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
        return [ Zt ];
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
                if (void 0 !== n[o]) throw ee(o, r);
                n[o] = s[o];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const i in t) {
            if (void 0 !== e[i]) throw ee(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return te(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        var i, s, n;
        return null !== (n = null !== (s = null === (i = this.N[t.nodeName]) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : this.W[e]) && void 0 !== n ? n : kt(t, e, this.svg) ? e : null;
    }
}

function te(t, e) {
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

function ee(t, e) {
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
        if (0 === (256 & e)) this.K();
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
            ie(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) se(this.o, this);
    }
    flush() {
        oe = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, oe, this.f);
    }
}

e(AttributeObserver);

i(AttributeObserver);

const ie = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(ne)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const se = (t, e) => {
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

const ne = t => {
    t[0].target.$eMObs.forEach(re, t);
};

function re(t) {
    t.handleMutation(this);
}

let oe;

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, i) {
        const s = this.b;
        if (t !== s.sourceExpression.evaluate(i, s.$scope, s.locator, null)) s.updateSource(t, i);
    }
}

const {oneTime: le, toView: he, fromView: ae} = t;

const ce = he | le;

const ue = {
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
        this.p = o.get(Yt);
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
            c = 0 === (s & le);
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
                }), ue);
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
        this.persistentFlags = 961 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        let n = this.targetObserver;
        if (!n) n = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        s = this.sourceExpression;
        const r = this.mode;
        const o = this.interceptor;
        let l = false;
        if (r & ce) {
            l = (r & he) > 0;
            o.updateTarget(this.value = s.evaluate(t, e, this.locator, l ? o : null), t);
        }
        if (r & ae) n.subscribe(null !== (i = this.targetSubscriber) && void 0 !== i ? i : this.targetSubscriber = new BindingTargetSubscriber(o));
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

const {toView: fe} = t;

const de = {
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
            }), de);
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
            o = (this.mode & fe) > 0;
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
        this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & fe) > 0 ? this.interceptor : null);
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
            l = (this.mode & fe) > 0;
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
        const i = this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & fe) > 0 ? this.interceptor : null);
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
        }), de);
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

const {oneTime: me, toView: ve, fromView: ge} = t;

const pe = ve | me;

const we = {
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
            r = this.mode > me;
            if (r) n.version++;
            t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
            if (r) n.clear();
        }
        if (s) {
            be = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), we);
            null === be || void 0 === be ? void 0 : be.cancel();
            be = null;
        } else this.interceptor.updateTarget(t, i);
    }
    $bind(t, e) {
        var i;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 961 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        const n = this.oL;
        const r = this.mode;
        let o = this.targetObserver;
        if (!o) {
            if (r & ge) o = n.getObserver(this.target, this.targetProperty); else o = n.getAccessor(this.target, this.targetProperty);
            this.targetObserver = o;
        }
        s = this.sourceExpression;
        const l = this.interceptor;
        const h = (r & ve) > 0;
        if (r & pe) l.updateTarget(s.evaluate(t, e, this.locator, h ? l : null), t);
        if (r & ge) {
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
        be = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != be) {
            be.cancel();
            be = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

s(PropertyBinding);

let be = null;

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

const xe = O.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(U.instance(xe, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const ye = Object.freeze({
    beforeCreate: ke("beforeCreate"),
    hydrating: ke("hydrating"),
    hydrated: ke("hydrated"),
    beforeActivate: ke("beforeActivate"),
    afterActivate: ke("afterActivate"),
    beforeDeactivate: ke("beforeDeactivate"),
    afterDeactivate: ke("afterDeactivate")
});

function ke(t) {
    function e(e, i) {
        if (At(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ce(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        ut(Re, ChildrenDefinition.create(e, i), t.constructor, e);
        pt(t.constructor, Se.keyFrom(e));
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

function Ae(t) {
    return t.startsWith(Re);
}

const Re = mt("children-observer");

const Se = Object.freeze({
    name: Re,
    keyFrom: t => `${Re}:${t}`,
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
        const e = Re.length + 1;
        const i = [];
        const s = T(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        while (--n >= 0) {
            h = s[n];
            o = wt(h).filter(Ae);
            l = o.length;
            for (let t = 0; t < l; ++t) i[r++] = at(Re, h, o[t].slice(e));
        }
        return i;
    }
});

const Ee = {
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
        return new ChildrenDefinition(D(e.callback, `${t}Changed`), D(e.property, t), null !== (i = e.options) && void 0 !== i ? i : Ee, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = Be, r = Ie, o = Te, l) {
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
        return Pe(this.controller, this.query, this.filter, this.map);
    }
}

e()(ChildrenObserver);

function Be(t) {
    return t.host.childNodes;
}

function Ie(t, e, i) {
    return !!i;
}

function Te(t, e, i) {
    return i;
}

const De = {
    optional: true
};

function Pe(t, e, i, s) {
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
        a = ni.for(h, De);
        c = null !== (n = null === a || void 0 === a ? void 0 : a.viewModel) && void 0 !== n ? n : null;
        if (i(h, a, c)) l.push(s(h, a, c));
    }
    return l;
}

function $e(t) {
    return function(e) {
        return Fe.define(t, e);
    };
}

function Oe(t) {
    return function(e) {
        return Fe.define(Rt(t) ? {
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
        return new CustomAttributeDefinition(i, D(Ue(i, "name"), s), _(Ue(i, "aliases"), n.aliases, i.aliases), Fe.keyFrom(s), D(Ue(i, "defaultBindingMode"), n.defaultBindingMode, i.defaultBindingMode, t.toView), D(Ue(i, "isTemplateController"), n.isTemplateController, i.isTemplateController, false), It.from(i, ...It.getAll(i), Ue(i, "bindables"), i.bindables, n.bindables), D(Ue(i, "noMultiBindings"), n.noMultiBindings, i.noMultiBindings, false), _(je.getAnnotation(i), i.watches));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        U.transient(i, e).register(t);
        U.aliasTo(i, e).register(t);
        n(s, Fe, i, t);
    }
}

const Le = vt("custom-attribute");

const qe = t => `${Le}:${t}`;

const Ue = (t, e) => at(mt(e), t);

const Fe = Object.freeze({
    name: Le,
    keyFrom: qe,
    isType(t) {
        return At(t) && ct(Le, t);
    },
    for(t, e) {
        var i;
        return null !== (i = ss(t, qe(e))) && void 0 !== i ? i : void 0;
    },
    define(t, e) {
        const i = CustomAttributeDefinition.create(t, e);
        ut(Le, i, i.Type);
        ut(Le, i, i);
        gt(e, Le);
        return i.Type;
    },
    getDefinition(t) {
        const e = at(Le, t);
        if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        ut(mt(e), i, t);
    },
    getAnnotation: Ue
});

function _e(t, e) {
    if (!t) throw new Error("AUR0772");
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!At(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!At(null === r || void 0 === r ? void 0 : r.value)) throw new Error(`AUR0774:${String(n)}`);
        je.add(l, h);
        if (Fe.isType(l)) Fe.getDefinition(l).watches.push(h);
        if (ni.isType(l)) ni.getDefinition(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Me = L;

const Ve = mt("watch");

const je = Object.freeze({
    name: Ve,
    add(t, e) {
        let i = at(Ve, t);
        if (null == i) ut(Ve, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        var e;
        return null !== (e = at(Ve, t)) && void 0 !== e ? e : Me;
    }
});

function Ne(t) {
    return function(e) {
        return ni.define(t, e);
    };
}

function We(t) {
    if (void 0 === t) return function(t) {
        ii(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!At(t)) return function(e) {
        ii(e, "shadowOptions", t);
    };
    ii(t, "shadowOptions", {
        mode: "open"
    });
}

function He(t) {
    if (void 0 === t) return function(t) {
        ii(t, "containerless", true);
    };
    ii(t, "containerless", true);
}

const ze = new WeakMap;

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
            const s = M("name", i, ei);
            if (At(i.Type)) e = i.Type; else e = ni.generateType(V(s));
            return new CustomElementDefinition(e, s, _(i.aliases), M("key", i, (() => ni.keyFrom(s))), M("cache", i, Xe), M("capture", i, Ye), M("template", i, Ke), _(i.instructions), _(i.dependencies), M("injectable", i, Ke), M("needsCompile", i, Ze), _(i.surrogates), It.from(e, i.bindables), Se.from(i.childrenObservers), M("containerless", i, Ye), M("isStrictBinding", i, Ye), M("shadowOptions", i, Ke), M("hasSlots", i, Ye), M("enhance", i, Ye), M("watches", i, Je), j("processContent", e, Ke));
        }
        if (Rt(t)) return new CustomElementDefinition(e, t, _(si(e, "aliases"), e.aliases), ni.keyFrom(t), j("cache", e, Xe), j("capture", e, Ye), j("template", e, Ke), _(si(e, "instructions"), e.instructions), _(si(e, "dependencies"), e.dependencies), j("injectable", e, Ke), j("needsCompile", e, Ze), _(si(e, "surrogates"), e.surrogates), It.from(e, ...It.getAll(e), si(e, "bindables"), e.bindables), Se.from(...Se.getAll(e), si(e, "childrenObservers"), e.childrenObservers), j("containerless", e, Ye), j("isStrictBinding", e, Ye), j("shadowOptions", e, Ke), j("hasSlots", e, Ye), j("enhance", e, Ye), _(je.getAnnotation(e), e.watches), j("processContent", e, Ke));
        const i = M("name", t, ei);
        return new CustomElementDefinition(e, i, _(si(e, "aliases"), t.aliases, e.aliases), ni.keyFrom(i), N("cache", t, e, Xe), N("capture", t, e, Ye), N("template", t, e, Ke), _(si(e, "instructions"), t.instructions, e.instructions), _(si(e, "dependencies"), t.dependencies, e.dependencies), N("injectable", t, e, Ke), N("needsCompile", t, e, Ze), _(si(e, "surrogates"), t.surrogates, e.surrogates), It.from(e, ...It.getAll(e), si(e, "bindables"), e.bindables, t.bindables), Se.from(...Se.getAll(e), si(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), N("containerless", t, e, Ye), N("isStrictBinding", t, e, Ye), N("shadowOptions", t, e, Ke), N("hasSlots", t, e, Ye), N("enhance", t, e, Ye), _(t.watches, je.getAnnotation(e), e.watches), N("processContent", t, e, Ke));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (ze.has(t)) return ze.get(t);
        const e = CustomElementDefinition.create(t);
        ze.set(t, e);
        ut(Qe, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            U.transient(i, e).register(t);
            U.aliasTo(i, e).register(t);
            n(s, ni, i, t);
        }
    }
}

const Ge = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Xe = () => 0;

const Ke = () => null;

const Ye = () => false;

const Ze = () => true;

const Je = () => L;

const Qe = vt("custom-element");

const ti = t => `${Qe}:${t}`;

const ei = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const ii = (t, e, i) => {
    ut(mt(e), i, t);
};

const si = (t, e) => at(mt(e), t);

const ni = Object.freeze({
    name: Qe,
    keyFrom: ti,
    isType(t) {
        return At(t) && ct(Qe, t);
    },
    for(t, e = Ge) {
        if (void 0 === e.name && true !== e.searchParents) {
            const i = ss(t, Qe);
            if (null === i) {
                if (true === e.optional) return null;
                throw new Error("AUR0762");
            }
            return i;
        }
        if (void 0 !== e.name) {
            if (true !== e.searchParents) {
                const i = ss(t, Qe);
                if (null === i) throw new Error("AUR0763");
                if (i.is(e.name)) return i;
                return;
            }
            let i = t;
            let s = false;
            while (null !== i) {
                const t = ss(i, Qe);
                if (null !== t) {
                    s = true;
                    if (t.is(e.name)) return t;
                }
                i = cs(i);
            }
            if (s) return;
            throw new Error("AUR0764");
        }
        let i = t;
        while (null !== i) {
            const t = ss(i, Qe);
            if (null !== t) return t;
            i = cs(i);
        }
        throw new Error("AUR0765");
    },
    define(t, e) {
        const i = CustomElementDefinition.create(t, e);
        ut(Qe, i, i.Type);
        ut(Qe, i, i);
        gt(i.Type, Qe);
        return i.Type;
    },
    getDefinition(t) {
        const e = at(Qe, t);
        if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
        return e;
    },
    annotate: ii,
    getAnnotation: si,
    generateName: ei,
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

const ri = mt("processContent");

function oi(t) {
    return void 0 === t ? function(t, e, i) {
        ut(ri, li(t, e), t);
    } : function(e) {
        t = li(e, t);
        const i = at(Qe, e);
        if (void 0 !== i) i.processContent = t; else ut(ri, t, e);
        return e;
    };
}

function li(t, e) {
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
        if (0 === (256 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.J;
            const i = hi(t);
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

function hi(t) {
    if (Rt(t)) return ai(t);
    if ("object" !== typeof t) return L;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...hi(t[s]));
            return i;
        } else return L;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...ai(i)); else e.push(i);
    return e;
}

function ai(t) {
    const e = t.match(/\S+/g);
    if (null === e) return L;
    return e;
}

function ci(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Fe.define({
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
                this.element.className = hi(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ rs ], e));
        t.register(s);
    }
}

function ui(...t) {
    return new ShadowDOMRegistry(t);
}

const fi = O.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Yt))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(mi);
        const i = t.get(fi);
        t.register(U.instance(di, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Yt ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Yt ];

const di = O.createInterface("IShadowDOMStyles");

const mi = O.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
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

const vi = {
    shadowDOM(t) {
        return ye.beforeCreate(W, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(fi);
                e.register(U.instance(mi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: gi, exit: pi} = r;

const {wrap: wi, unwrap: bi} = o;

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
            gi(this);
            return this.value = bi(this.get.call(void 0, this.useProxy ? wi(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            pi(this);
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

const xi = O.createInterface("ILifecycleHooks");

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
        U.singleton(xi, this.Type).register(t);
    }
}

const yi = new WeakMap;

const ki = mt("lifecycle-hooks");

const Ci = Object.freeze({
    name: ki,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        ut(ki, i, e);
        gt(e, ki);
        return i.Type;
    },
    resolve(t) {
        let e = yi.get(t);
        if (void 0 === e) {
            e = new LifecycleHooksLookupImpl;
            const i = t.root;
            const s = i.id === t.id ? t.getAll(xi) : t.has(xi, false) ? [ ...i.getAll(xi), ...t.getAll(xi) ] : i.getAll(xi);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = at(ki, n.constructor);
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

function Ai() {
    return function t(e) {
        return Ci.define({}, e);
    };
}

const Ri = O.createInterface("IViewFactory");

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

const Si = new WeakSet;

function Ei(t) {
    return !Si.has(t);
}

function Bi(t) {
    Si.add(t);
    return CustomElementDefinition.create(t);
}

const Ii = vt("views");

const Ti = Object.freeze({
    name: Ii,
    has(t) {
        return At(t) && (ct(Ii, t) || "$views" in t);
    },
    get(t) {
        if (At(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Ei).map(Bi);
            for (const e of i) Ti.add(t, e);
        }
        let e = at(Ii, t);
        if (void 0 === e) ut(Ii, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = at(Ii, t);
        if (void 0 === s) ut(Ii, s = [ i ], t); else s.push(i);
        return s;
    }
});

function Di(t) {
    return function(e) {
        Ti.add(e, t);
    };
}

const Pi = O.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.it = new WeakMap;
        this.st = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Ti.has(t.constructor) ? Ti.get(t.constructor) : [];
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
            n = ni.define(ni.getDefinition(r), class extends r {
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
            n = ni.define(this.lt(e, i), class {
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

const $i = O.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ht = new WeakMap;
        this.ct = new WeakMap;
        this.ut = (this.ft = t.root).get(Yt);
        this.dt = new FragmentNodeSequence(this.ut, this.ut.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.ft.getAll(Ss, false).reduce(((t, e) => {
            t[e.instructionType] = e;
            return t;
        }), bt()) : this.rs;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ht;
            const n = e.get(Rs);
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

var Oi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Oi || (Oi = {}));

const Li = {
    optional: true
};

const qi = new WeakMap;

class Controller {
    constructor(t, e, i, s, n, r) {
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
        this.r = t.root.get($i);
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
        return qi.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0) {
        if (qi.has(e)) return qi.get(e);
        n = null !== n && void 0 !== n ? n : ni.getDefinition(e.constructor);
        const r = new Controller(t, 0, n, null, e, i);
        const o = t.get(z(Yi));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        t.registerResolver(Yi, new G("IHydrationContext", new HydrationContext(r, s, o)));
        qi.set(e, r);
        if (null == s || false !== s.hydrate) r.hE(s, o);
        return r;
    }
    static $attr(t, e, i, s) {
        if (qi.has(e)) return qi.get(e);
        s = null !== s && void 0 !== s ? s : Fe.getDefinition(e.constructor);
        const n = new Controller(t, 1, s, null, e, i);
        qi.set(e, n);
        n.yt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null);
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
        if (r.watches.length > 0) ji(this, i, r, n);
        Fi(this, r, s, n);
        this.gt = _i(this, r, n);
        if (this.hooks.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Ci.resolve(i);
        r.register(i);
        if (null !== r.injectable) i.registerResolver(r.injectable, new G("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Ct = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        this.isStrictBinding = s;
        if (null !== (this.hostController = ni.for(this.host, Li))) this.host = this.container.root.get(Yt).document.createElement(this.definition.name);
        ns(this.host, ni.name, this);
        ns(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (r) throw new Error("AUR0501");
            ns(this.shadowRoot = this.host.attachShadow(null !== i && void 0 !== i ? i : Hi), ni.name, this);
            ns(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (r) {
            ns(this.location = fs(this.host), ni.name, this);
            ns(this.location, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ct, this.host);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    yt() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) ji(this, this.container, t, e);
        Fi(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Ci.resolve(this.container);
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
            throw new Error(`AUR0503:${this.name} ${Xi(this.state)}`);
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
            if (void 0 === s || null === s) throw new Error("AUR0504");
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
                const e = t.has(di, false) ? t.get(di) : t.get(mi);
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
            throw new Error(`AUR0505:${this.name} ${Xi(this.state)}`);
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
        if (32 === (32 & t) && this.$initiator === this) this.dispose();
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
            Ji = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ji();
            Ji = void 0;
        }
    }
    St(t) {
        if (void 0 !== this.$promise) {
            Qi = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Qi(t);
            Qi = void 0;
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
                ts = this.viewModel.attached(this.$initiator, this.$flags);
                if (ts instanceof Promise) {
                    this.Rt();
                    ts.then((() => {
                        this.state = 2;
                        this.Pt();
                        if (this.$initiator !== this) this.parent.It();
                    })).catch((t => {
                        this.St(t);
                    }));
                    ts = void 0;
                    return;
                }
                ts = void 0;
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
                    ts = t.viewModel.unbinding(t.$initiator, t.parent, t.$flags);
                    if (ts instanceof Promise) {
                        this.Rt();
                        this.$t();
                        ts.then((() => {
                            this.Ot();
                        })).catch((t => {
                            this.St(t);
                        }));
                    }
                    ts = void 0;
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
            return Fe.getDefinition(this.viewModel.constructor).name === t;

          case 0:
            return ni.getDefinition(this.viewModel.constructor).name === t;

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
            ns(t, ni.name, this);
            ns(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            ns(t, ni.name, this);
            ns(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            ns(t, ni.name, this);
            ns(t, this.definition.key, this);
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
            this.children.forEach(Zi);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            qi.delete(this.viewModel);
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

function Ui(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Fi(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const a = Ui(s);
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

function _i(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = Ui(i);
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

const Mi = new Map;

const Vi = t => {
    let e = Mi.get(t);
    if (null == e) {
        e = new u(t, 0);
        Mi.set(t, e);
    }
    return e;
};

function ji(t, e, i, s) {
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
            m = Rt(f) ? r.parse(f, 8) : Vi(f);
            t.addBinding(new ExpressionWatcher(h, e, n, m, d));
        }
    }
}

function Ni(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Wi(t) {
    return nt(t) && ni.isType(t.constructor);
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

const Hi = {
    mode: "open"
};

var zi;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(zi || (zi = {}));

var Gi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Gi || (Gi = {}));

function Xi(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Ki = O.createInterface("IController");

const Yi = O.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function Zi(t) {
    t.dispose();
}

let Ji;

let Qi;

let ts;

const es = O.createInterface("IAppRoot");

const is = O.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

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
        this.Ft = void 0;
        this.host = t.host;
        this.work = i.get(is);
        s.prepare(this);
        i.registerResolver(e.HTMLElement, i.registerResolver(e.Element, i.registerResolver(rs, new G("ElementResolver", t.host))));
        this.Ft = K(this._t("beforeCreate"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (ni.isType(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return K(this._t("hydrating"), (() => {
                o.hS(null);
                return K(this._t("hydrated"), (() => {
                    o.hC();
                    this.Ft = void 0;
                }));
            }));
        }));
    }
    activate() {
        return K(this.Ft, (() => K(this._t("beforeActivate"), (() => K(this.controller.activate(this.controller, null, 2, void 0), (() => this._t("afterActivate")))))));
    }
    deactivate() {
        return K(this._t("beforeDeactivate"), (() => K(this.controller.deactivate(this.controller, null, 0), (() => this._t("afterDeactivate")))));
    }
    _t(t) {
        return Y(...this.container.getAll(xe).reduce(((e, i) => {
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

function ss(t, e) {
    var i, s;
    return null !== (s = null === (i = t.$au) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : null;
}

function ns(t, e, i) {
    var s;
    var n;
    (null !== (s = (n = t).$au) && void 0 !== s ? s : n.$au = new Refs)[e] = i;
}

const rs = O.createInterface("INode");

const os = O.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(es, true)) return t.get(es).host;
    return t.get(Yt).document;
}))));

const ls = O.createInterface("IRenderLocation");

var hs;

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
})(hs || (hs = {}));

const as = new WeakMap;

function cs(t) {
    if (as.has(t)) return as.get(t);
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
        const e = ni.for(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return cs(e.host);
    }
    return t.parentNode;
}

function us(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) as.set(i[t], e);
    } else as.set(t, e);
}

function fs(t) {
    if (ds(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function ds(t) {
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
            if ("AU-M" === r.nodeName) o[s] = fs(r); else o[s] = r;
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
        if (ds(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const ms = O.createInterface("IWindow", (t => t.callback((t => t.get(Yt).window))));

const vs = O.createInterface("ILocation", (t => t.callback((t => t.get(ms).location))));

const gs = O.createInterface("IHistory", (t => t.callback((t => t.get(ms).history))));

const ps = {
    [f.capturing]: {
        capture: true
    },
    [f.bubbling]: {
        capture: false
    }
};

class Listener {
    constructor(t, e, i, s, n, r, o, l) {
        this.platform = t;
        this.targetEvent = e;
        this.delegationStrategy = i;
        this.sourceExpression = s;
        this.target = n;
        this.preventDefault = r;
        this.eventDelegator = o;
        this.locator = l;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const i = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(e, "$event");
        if (true !== i && this.preventDefault) t.preventDefault();
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
        if (this.delegationStrategy === f.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(os), this.target, this.targetEvent, this, ps[this.delegationStrategy]);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.delegationStrategy === f.none) this.target.removeEventListener(this.targetEvent, this); else {
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

const ws = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = ws) {
        this.Mt = t;
        this.Vt = e;
        this.jt = i;
        this.Nt = 0;
        this.Wt = new Map;
        this.Ht = new Map;
    }
    zt() {
        if (1 === ++this.Nt) this.Mt.addEventListener(this.Vt, this, this.jt);
    }
    Gt() {
        if (0 === --this.Nt) this.Mt.removeEventListener(this.Vt, this, this.jt);
    }
    dispose() {
        if (this.Nt > 0) {
            this.Nt = 0;
            this.Mt.removeEventListener(this.Vt, this, this.jt);
        }
        this.Wt.clear();
        this.Ht.clear();
    }
    Xt(t) {
        const e = true === this.jt.capture ? this.Wt : this.Ht;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = bt());
        return i;
    }
    handleEvent(t) {
        const e = true === this.jt.capture ? this.Wt : this.Ht;
        const i = t.composedPath();
        if (true === this.jt.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.Vt];
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
        this.Vt = i;
        t.zt();
        e[i] = s;
    }
    dispose() {
        this.Kt.Gt();
        this.Yt[this.Vt] = void 0;
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

const bs = O.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

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

const xs = O.createInterface("IProjections");

const ys = O.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var ks;

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
})(ks || (ks = {}));

const Cs = O.createInterface("Instruction");

function As(t) {
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

const Rs = O.createInterface("ITemplateCompiler");

const Ss = O.createInterface("IRenderer");

function Es(t) {
    return function e(i) {
        const s = function(...e) {
            const s = new i(...e);
            s.instructionType = t;
            return s;
        };
        s.register = function t(e) {
            U.singleton(Ss, s).register(e);
        };
        const n = st.getOwnKeys(i);
        for (const t of n) ut(t, at(t, i), s);
        const r = Object.getOwnPropertyDescriptors(i);
        Object.keys(r).filter((t => "prototype" !== t)).forEach((t => {
            Reflect.defineProperty(s, t, r[t]);
        }));
        return s;
    };
}

function Bs(t, e, i) {
    if (Rt(e)) return t.parse(e, i);
    return e;
}

function Is(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function Ts(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return ni.for(t);

      case "view":
        throw new Error("AUR0750");

      case "view-model":
        return ni.for(t).viewModel;

      default:
        {
            const i = Fe.for(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = ni.for(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let Ds = class SetPropertyRenderer {
    render(t, e, i) {
        const s = Is(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value, 2); else s[i.to] = i.value;
    }
};

Ds = lt([ Es("re") ], Ds);

let Ps = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ $i, Yt ];
    }
    render(t, e, i) {
        let s;
        let n;
        let r;
        let o;
        const l = i.res;
        const h = i.projections;
        const a = t.container;
        const c = rn(this.p, t, e, i, e, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        switch (typeof l) {
          case "string":
            s = a.find(ni, l);
            if (null == s) throw new Error(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        n = s.Type;
        r = c.invoke(n);
        c.registerResolver(n, new G(s.key, r));
        o = Controller.$el(c, r, e, i, s);
        ns(e, s.key, o);
        const u = this.r.renderers;
        const f = i.props;
        const d = f.length;
        let m = 0;
        let v;
        while (d > m) {
            v = f[m];
            u[v.type].render(t, o, v);
            ++m;
        }
        t.addChild(o);
    }
};

Ps = lt([ Es("ra") ], Ps);

let $s = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ $i, Yt ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Fe, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = on(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(t.container, r, e, n);
        ns(e, n.key, o);
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

$s = lt([ Es("rb") ], $s);

let Os = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ $i, Yt ];
    }
    render(t, e, i) {
        var s;
        let n = t.container;
        let r;
        switch (typeof i.res) {
          case "string":
            r = n.find(Fe, i.res);
            if (null == r) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            r = i.res;
        }
        const o = this.r.getViewFactory(i.def, n);
        const l = fs(e);
        const h = on(this.p, r, t, e, i, o, l);
        const a = Controller.$attr(t.container, h, e, r);
        ns(l, r.key, a);
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

Os = lt([ Es("rc") ], Os);

let Ls = class LetElementRenderer {
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
            h = Bs(this.ep, l.from, 8);
            a = new LetBinding(h, l.to, this.oL, r, n);
            t.addBinding(38962 === h.$kind ? Ns(a, h, r) : a);
            ++c;
        }
    }
};

Ls.inject = [ c, a ];

Ls = lt([ Es("rd") ], Ls);

let qs = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = Bs(this.ep, i.from, 8 | 4);
        const n = new CallBinding(s, Is(e), i.to, this.oL, t.container);
        t.addBinding(38962 === s.$kind ? Ns(n, s, t.container) : n);
    }
};

qs.inject = [ c, a ];

qs = lt([ Es("rh") ], qs);

let Us = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = Bs(this.ep, i.from, 8);
        const n = new RefBinding(s, Ts(e, i.to), t.container);
        t.addBinding(38962 === s.$kind ? Ns(n, s, t.container) : n);
    }
};

Us.inject = [ c ];

Us = lt([ Es("rj") ], Us);

let Fs = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = e.container;
        const r = Bs(this.ep, s.from, 1);
        const o = new InterpolationBinding(this.oL, r, Is(i), s.to, t.toView, n, this.p.domWriteQueue);
        const l = o.partBindings;
        const h = l.length;
        let a = 0;
        let c;
        for (;h > a; ++a) {
            c = l[a];
            if (38962 === c.sourceExpression.$kind) l[a] = Ns(c, c.sourceExpression, n);
        }
        e.addBinding(o);
    }
};

Fs.inject = [ c, a, Yt ];

Fs = lt([ Es("rf") ], Fs);

let _s = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = Bs(this.ep, i.from, 8);
        const n = new PropertyBinding(s, Is(e), i.to, i.mode, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === s.$kind ? Ns(n, s, t.container) : n);
    }
};

_s.inject = [ c, a, Yt ];

_s = lt([ Es("rg") ], _s);

let Ms = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = Bs(this.ep, s.from, 2);
        const r = new PropertyBinding(n, Is(i), s.to, t.toView, this.oL, e.container, this.p.domWriteQueue);
        e.addBinding(38962 === n.iterable.$kind ? Ns(r, n.iterable, e.container) : r);
    }
};

Ms.inject = [ c, a, Yt ];

Ms = lt([ Es("rk") ], Ms);

let Vs = 0;

const js = [];

function Ns(t, e, i) {
    while (e instanceof d) {
        js[Vs++] = e;
        e = e.expression;
    }
    while (Vs > 0) {
        const e = js[--Vs];
        const s = i.get(e.behaviorKey);
        if (s instanceof m) t = s.construct(t, e);
    }
    js.length = 0;
    return t;
}

let Ws = class TextBindingRenderer {
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
        const l = Bs(this.ep, i.from, 1);
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
            t.addBinding(38962 === m.$kind ? Ns(d, m, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Ws.inject = [ c, a, Yt ];

Ws = lt([ Es("ha") ], Ws);

let Hs = class ListenerBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.Jt = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = Bs(this.ep, i.from, 4);
        const n = new Listener(this.p, i.to, i.strategy, s, e, i.preventDefault, this.Jt, t.container);
        t.addBinding(38962 === s.$kind ? Ns(n, s, t.container) : n);
    }
};

Hs.inject = [ c, bs, Yt ];

Hs = lt([ Es("hb") ], Hs);

let zs = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

zs = lt([ Es("he") ], zs);

let Gs = class SetClassAttributeRenderer {
    render(t, e, i) {
        Js(e.classList, i.value);
    }
};

Gs = lt([ Es("hf") ], Gs);

let Xs = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Xs = lt([ Es("hg") ], Xs);

let Ks = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = Bs(this.ep, s.from, 8);
        const r = new PropertyBinding(n, i.style, s.to, t.toView, this.oL, e.container, this.p.domWriteQueue);
        e.addBinding(38962 === n.$kind ? Ns(r, n, e.container) : r);
    }
};

Ks.inject = [ c, a, Yt ];

Ks = lt([ Es("hd") ], Ks);

let Ys = class AttributeBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(e, i, s) {
        const n = Bs(this.ep, s.from, 8);
        const r = new AttributeBinding(n, i, s.attr, s.to, t.toView, this.oL, e.container);
        e.addBinding(38962 === n.$kind ? Ns(r, n, e.container) : r);
    }
};

Ys.inject = [ c, a ];

Ys = lt([ Es("hc") ], Ys);

let Zs = class SpreadRenderer {
    constructor(t, e) {
        this.Qt = t;
        this.r = e;
    }
    static get inject() {
        return [ Rs, $i ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(Yi);
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
            const a = Qs(h);
            const c = this.Qt.compileSpread(h.controller.definition, null !== (n = null === (s = h.instruction) || void 0 === s ? void 0 : s.captures) && void 0 !== n ? n : L, h.controller.container, e);
            let u;
            for (u of c) switch (u.type) {
              case "hs":
                l(i + 1);
                break;

              case "hp":
                r[u.instructions.type].render(a, ni.for(e), u.instructions);
                break;

              default:
                r[u.type].render(a, e, u);
            }
            t.addBinding(a);
        };
        l(0);
    }
};

Zs = lt([ Es("hs") ], Zs);

class SpreadBinding {
    constructor(t, e) {
        this.te = t;
        this.ee = e;
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
        const s = this.$scope = null !== (i = this.ee.controller.scope.parentScope) && void 0 !== i ? i : void 0;
        if (null == s) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.te.forEach((e => e.$bind(t, s)));
    }
    $unbind(t) {
        this.te.forEach((e => e.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.te.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Js(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Qs = t => new SpreadBinding([], t);

const tn = "IController";

const en = "IInstruction";

const sn = "IRenderLocation";

const nn = "IAuSlotsInfo";

function rn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    o.registerResolver(t.HTMLElement, o.registerResolver(t.Element, o.registerResolver(rs, new G("ElementResolver", i))));
    o.registerResolver(Ki, new G(tn, e));
    o.registerResolver(Cs, new G(en, s));
    o.registerResolver(ls, null == n ? ln : new G(sn, n));
    o.registerResolver(Ri, hn);
    o.registerResolver(ys, null == r ? an : new G(nn, r));
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
        if (null === t) throw new Error("AUR7055");
        if (!Rt(t.name) || 0 === t.name.length) throw new Error("AUR0756");
        return t;
    }
}

function on(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    h.registerResolver(t.HTMLElement, h.registerResolver(t.Element, h.registerResolver(rs, new G("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    h.registerResolver(Ki, new G(tn, i));
    h.registerResolver(Cs, new G(en, n));
    h.registerResolver(ls, null == o ? ln : new G(sn, o));
    h.registerResolver(Ri, null == r ? hn : new ViewFactoryProvider(r));
    h.registerResolver(ys, null == l ? an : new G(nn, l));
    return h.invoke(e.Type);
}

const ln = new G(sn);

const hn = new ViewFactoryProvider(null);

const an = new G(nn, new AuSlotsInfo(L));

var cn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(cn || (cn = {}));

function un(t) {
    return function(e) {
        return vn.define(t, e);
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
        return new BindingCommandDefinition(e, D(mn(e, "name"), i), _(mn(e, "aliases"), s.aliases, e.aliases), dn(i), D(mn(e, "type"), s.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        U.singleton(i, e).register(t);
        U.aliasTo(i, e).register(t);
        n(s, vn, i, t);
    }
}

const fn = vt("binding-command");

const dn = t => `${fn}:${t}`;

const mn = (t, e) => at(mt(e), t);

const vn = Object.freeze({
    name: fn,
    keyFrom: dn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        ut(fn, i, i.Type);
        ut(fn, i, i);
        gt(e, fn);
        return i.Type;
    },
    getAnnotation: mn
});

let gn = class OneTimeBindingCommand {
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

gn.inject = [ Qt, c ];

gn = lt([ un("one-time") ], gn);

let pn = class ToViewBindingCommand {
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

pn.inject = [ Qt, c ];

pn = lt([ un("to-view") ], pn);

let wn = class FromViewBindingCommand {
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

wn.inject = [ Qt, c ];

wn = lt([ un("from-view") ], wn);

let bn = class TwoWayBindingCommand {
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

bn.inject = [ Qt, c ];

bn = lt([ un("two-way") ], bn);

let xn = class DefaultBindingCommand {
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

xn.inject = [ Qt, c ];

xn = lt([ un("bind") ], xn);

let yn = class CallBindingCommand {
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

yn.inject = [ c ];

yn = lt([ un("call") ], yn);

let kn = class ForBindingCommand {
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

kn.inject = [ c ];

kn = lt([ un("for") ], kn);

let Cn = class TriggerBindingCommand {
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

Cn.inject = [ c ];

Cn = lt([ un("trigger") ], Cn);

let An = class DelegateBindingCommand {
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

An.inject = [ c ];

An = lt([ un("delegate") ], An);

let Rn = class CaptureBindingCommand {
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

Rn.inject = [ c ];

Rn = lt([ un("capture") ], Rn);

let Sn = class AttrBindingCommand {
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

Sn.inject = [ c ];

Sn = lt([ un("attr") ], Sn);

let En = class StyleBindingCommand {
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

En.inject = [ c ];

En = lt([ un("style") ], En);

let Bn = class ClassBindingCommand {
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

Bn.inject = [ c ];

Bn = lt([ un("class") ], Bn);

let In = class RefBindingCommand {
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

In.inject = [ c ];

In = lt([ un("ref") ], In);

let Tn = class SpreadBindingCommand {
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

Tn = lt([ un("...$attrs") ], Tn);

const Dn = O.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Pn = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ie = t.document.createElement("template");
    }
    createTemplate(t) {
        var e;
        if (Rt(t)) {
            let e = Pn[t];
            if (void 0 === e) {
                const i = this.ie;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.ie = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                Pn[t] = e;
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

TemplateElementFactory.inject = [ Yt ];

const $n = function(t) {
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
        return U.singleton(Rs, this).register(t);
    }
    compile(t, e, i) {
        var s, n, r, o;
        const l = CustomElementDefinition.getOrCreate(t);
        if (null === l.template || void 0 === l.template) return l;
        if (false === l.needsCompile) return l;
        null !== i && void 0 !== i ? i : i = qn;
        const h = new CompilationContext(t, e, i, null, null, void 0);
        const a = Rt(l.template) || !t.enhance ? h.se.createTemplate(l.template) : l.template;
        const c = "TEMPLATE" === a.nodeName && null != a.content;
        const u = c ? a.content : a;
        const f = e.get($n(Gn));
        const d = f.length;
        let m = 0;
        if (d > 0) while (d > m) {
            null === (n = (s = f[m]).compiling) || void 0 === n ? void 0 : n.call(s, a);
            ++m;
        }
        if (a.hasAttribute(Wn)) throw new Error("AUR0701");
        this.ne(u, h);
        this.re(u, h);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Jn(),
            dependencies: (null !== (r = t.dependencies) && void 0 !== r ? r : L).concat(null !== (o = h.deps) && void 0 !== o ? o : L),
            instructions: h.rows,
            surrogates: c ? this.oe(a, h) : L,
            template: a,
            hasSlots: h.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        var n;
        const r = new CompilationContext(t, i, qn, null, null, void 0);
        const o = [];
        const l = r.le(s.nodeName.toLowerCase());
        const h = r.ep;
        const a = e.length;
        let c = 0;
        let u;
        let f = null;
        let d;
        let m;
        let v;
        let g;
        let p;
        let w = null;
        let b;
        let x;
        let y;
        let k;
        for (;a > c; ++c) {
            u = e[c];
            y = u.target;
            k = u.rawValue;
            w = r.he(u);
            if (null !== w && (1 & w.type) > 0) {
                Fn.node = s;
                Fn.attr = u;
                Fn.bindable = null;
                Fn.def = null;
                o.push(w.build(Fn));
                continue;
            }
            f = r.ae(y);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${y}`);
                v = BindablesInfo.from(f, true);
                x = false === f.noMultiBindings && null === w && On(k);
                if (x) m = this.ce(s, k, f, r); else {
                    p = v.primary;
                    if (null === w) {
                        b = h.parse(k, 1);
                        m = [ null === b ? new SetPropertyInstruction(k, p.property) : new InterpolationInstruction(b, p.property) ];
                    } else {
                        Fn.node = s;
                        Fn.attr = u;
                        Fn.bindable = p;
                        Fn.def = f;
                        m = [ w.build(Fn) ];
                    }
                }
                (null !== d && void 0 !== d ? d : d = []).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(y) ? y : void 0, m));
                continue;
            }
            if (null === w) {
                b = h.parse(k, 1);
                if (null !== l) {
                    v = BindablesInfo.from(l, false);
                    g = v.attrs[y];
                    if (void 0 !== g) {
                        b = h.parse(k, 1);
                        o.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(k, g.property) : new InterpolationInstruction(b, g.property)));
                        continue;
                    }
                }
                if (null != b) o.push(new InterpolationInstruction(b, null !== (n = r.m.map(s, y)) && void 0 !== n ? n : Z(y))); else switch (y) {
                  case "class":
                    o.push(new SetClassAttributeInstruction(k));
                    break;

                  case "style":
                    o.push(new SetStyleAttributeInstruction(k));
                    break;

                  default:
                    o.push(new SetAttributeInstruction(k, y));
                }
            } else {
                if (null !== l) {
                    v = BindablesInfo.from(l, false);
                    g = v.attrs[y];
                    if (void 0 !== g) {
                        Fn.node = s;
                        Fn.attr = u;
                        Fn.bindable = g;
                        Fn.def = l;
                        o.push(new SpreadElementPropBindingInstruction(w.build(Fn)));
                        continue;
                    }
                }
                Fn.node = s;
                Fn.attr = u;
                Fn.bindable = null;
                Fn.def = null;
                o.push(w.build(Fn));
            }
        }
        Ln();
        if (null != d) return d.concat(o);
        return o;
    }
    oe(t, e) {
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
            u = e.ue.parse(a, c);
            x = u.target;
            y = u.rawValue;
            if (_n[x]) throw new Error(`AUR0702:${a}`);
            p = e.he(u);
            if (null !== p && (1 & p.type) > 0) {
                Fn.node = t;
                Fn.attr = u;
                Fn.bindable = null;
                Fn.def = null;
                s.push(p.build(Fn));
                continue;
            }
            f = e.ae(x);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${x}`);
                v = BindablesInfo.from(f, true);
                b = false === f.noMultiBindings && null === p && On(y);
                if (b) m = this.ce(t, y, f, e); else {
                    g = v.primary;
                    if (null === p) {
                        w = r.parse(y, 1);
                        m = [ null === w ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(w, g.property) ];
                    } else {
                        Fn.node = t;
                        Fn.attr = u;
                        Fn.bindable = g;
                        Fn.def = f;
                        m = [ p.build(Fn) ];
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
                Fn.node = t;
                Fn.attr = u;
                Fn.bindable = null;
                Fn.def = null;
                s.push(p.build(Fn));
            }
        }
        Ln();
        if (null != d) return d.concat(s);
        return s;
    }
    re(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.fe(t, e);

              default:
                return this.de(t, e);
            }

          case 3:
            return this.me(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.re(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    fe(t, e) {
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
            a = e.ue.parse(c, u);
            d = a.target;
            m = a.rawValue;
            f = e.he(a);
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
        return this.ve(t).nextSibling;
    }
    de(t, e) {
        var i, s, n, r, o, l;
        var h, a;
        const c = t.nextSibling;
        const u = (null !== (i = t.getAttribute("as-element")) && void 0 !== i ? i : t.nodeName).toLowerCase();
        const f = e.le(u);
        const d = !!(null === f || void 0 === f ? void 0 : f.capture);
        const m = d ? [] : L;
        const v = e.ep;
        const g = this.debug ? $ : () => {
            t.removeAttribute(k);
            --x;
            --b;
        };
        let p = t.attributes;
        let w;
        let b = p.length;
        let x = 0;
        let y;
        let k;
        let C;
        let A;
        let R;
        let S;
        let E = null;
        let B = false;
        let I;
        let T;
        let D;
        let P;
        let O;
        let q;
        let U;
        let F = null;
        let _;
        let M;
        let V;
        let j;
        let N = true;
        let W = false;
        if ("slot" === u) e.root.hasSlot = true;
        if (null !== f) {
            N = null === (s = f.processContent) || void 0 === s ? void 0 : s.call(f.Type, t, e.p);
            p = t.attributes;
            b = p.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;b > x; ++x) {
            y = p[x];
            k = y.name;
            C = y.value;
            switch (k) {
              case "as-element":
              case "containerless":
                g();
                if (!W) W = "containerless" === k;
                continue;
            }
            A = e.ue.parse(k, C);
            F = e.he(A);
            V = A.target;
            j = A.rawValue;
            if (d) {
                if (null != F && 1 & F.type) {
                    g();
                    m.push(A);
                    continue;
                }
                if ("au-slot" !== V) {
                    _ = BindablesInfo.from(f, false);
                    if (null == _.attrs[V] && !(null === (n = e.ae(V)) || void 0 === n ? void 0 : n.isTemplateController)) {
                        g();
                        m.push(A);
                        continue;
                    }
                }
            }
            if (null !== F && 1 & F.type) {
                Fn.node = t;
                Fn.attr = A;
                Fn.bindable = null;
                Fn.def = null;
                (null !== R && void 0 !== R ? R : R = []).push(F.build(Fn));
                g();
                continue;
            }
            E = e.ae(V);
            if (null !== E) {
                _ = BindablesInfo.from(E, true);
                B = false === E.noMultiBindings && null === F && On(j);
                if (B) D = this.ce(t, j, E, e); else {
                    M = _.primary;
                    if (null === F) {
                        q = v.parse(j, 1);
                        D = [ null === q ? new SetPropertyInstruction(j, M.property) : new InterpolationInstruction(q, M.property) ];
                    } else {
                        Fn.node = t;
                        Fn.attr = A;
                        Fn.bindable = M;
                        Fn.def = E;
                        D = [ F.build(Fn) ];
                    }
                }
                g();
                if (E.isTemplateController) (null !== P && void 0 !== P ? P : P = []).push(new HydrateTemplateController(Un, this.resolveResources ? E : E.name, void 0, D)); else (null !== T && void 0 !== T ? T : T = []).push(new HydrateAttributeInstruction(this.resolveResources ? E : E.name, null != E.aliases && E.aliases.includes(V) ? V : void 0, D));
                continue;
            }
            if (null === F) {
                if (null !== f) {
                    _ = BindablesInfo.from(f, false);
                    I = _.attrs[V];
                    if (void 0 !== I) {
                        q = v.parse(j, 1);
                        (null !== S && void 0 !== S ? S : S = []).push(null == q ? new SetPropertyInstruction(j, I.property) : new InterpolationInstruction(q, I.property));
                        g();
                        continue;
                    }
                }
                q = v.parse(j, 1);
                if (null != q) {
                    g();
                    (null !== R && void 0 !== R ? R : R = []).push(new InterpolationInstruction(q, null !== (r = e.m.map(t, V)) && void 0 !== r ? r : Z(V)));
                }
                continue;
            }
            g();
            if (null !== f) {
                _ = BindablesInfo.from(f, false);
                I = _.attrs[V];
                if (void 0 !== I) {
                    Fn.node = t;
                    Fn.attr = A;
                    Fn.bindable = I;
                    Fn.def = f;
                    (null !== S && void 0 !== S ? S : S = []).push(F.build(Fn));
                    continue;
                }
            }
            Fn.node = t;
            Fn.attr = A;
            Fn.bindable = null;
            Fn.def = null;
            (null !== R && void 0 !== R ? R : R = []).push(F.build(Fn));
        }
        Ln();
        if (this.ge(t) && null != R && R.length > 1) this.pe(t, R);
        if (null !== f) {
            U = new HydrateElementInstruction(this.resolveResources ? f : f.name, void 0, null !== S && void 0 !== S ? S : L, null, W, m);
            if ("au-slot" === u) {
                const i = t.getAttribute("name") || "default";
                const s = e.h("template");
                const n = e.we();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.re(s.content, n);
                U.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: Jn(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.be(t, e);
            }
        }
        if (null != R || null != U || null != T) {
            w = L.concat(null !== U && void 0 !== U ? U : L, null !== T && void 0 !== T ? T : L, null !== R && void 0 !== R ? R : L);
            this.ve(t);
        }
        let H;
        if (null != P) {
            b = P.length - 1;
            x = b;
            O = P[x];
            let i;
            this.be(t, e);
            if ("TEMPLATE" === t.nodeName) i = t; else {
                i = e.h("template");
                i.content.appendChild(t);
            }
            const s = i;
            const n = e.we(null == w ? [] : [ w ]);
            let r;
            let l;
            let a;
            let c;
            let d;
            let m;
            let v;
            let g;
            let p = 0, y = 0;
            let k = t.firstChild;
            if (false !== N) while (null !== k) if (1 === k.nodeType) {
                r = k;
                k = k.nextSibling;
                l = r.getAttribute("au-slot");
                if (null !== l) {
                    if (null === f) throw new Error(`AUR0706:${u}[${l}]`);
                    if ("" === l) l = "default";
                    r.removeAttribute("au-slot");
                    t.removeChild(r);
                    (null !== (o = (h = null !== c && void 0 !== c ? c : c = {})[l]) && void 0 !== o ? o : h[l] = []).push(r);
                }
            } else k = k.nextSibling;
            if (null != c) {
                a = {};
                for (l in c) {
                    i = e.h("template");
                    d = c[l];
                    for (p = 0, y = d.length; y > p; ++p) {
                        m = d[p];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) i.content.appendChild(m); else i.content.appendChild(m.content); else i.content.appendChild(m);
                    }
                    g = e.we();
                    this.re(i.content, g);
                    a[l] = CustomElementDefinition.create({
                        name: Jn(),
                        template: i,
                        instructions: g.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                U.projections = a;
            }
            if (null !== f && f.containerless) this.be(t, e);
            H = null === f || !f.containerless && !W && false !== N;
            if (H) if ("TEMPLATE" === t.nodeName) this.re(t.content, n); else {
                k = t.firstChild;
                while (null !== k) k = this.re(k, n);
            }
            O.def = CustomElementDefinition.create({
                name: Jn(),
                template: s,
                instructions: n.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (x-- > 0) {
                O = P[x];
                i = e.h("template");
                v = e.h("au-m");
                v.classList.add("au");
                i.content.appendChild(v);
                O.def = CustomElementDefinition.create({
                    name: Jn(),
                    template: i,
                    needsCompile: false,
                    instructions: [ [ P[x + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ O ]);
        } else {
            if (null != w) e.rows.push(w);
            let i = t.firstChild;
            let s;
            let n;
            let r = null;
            let o;
            let h;
            let c;
            let u;
            let d;
            let m = 0, v = 0;
            if (false !== N) while (null !== i) if (1 === i.nodeType) {
                s = i;
                i = i.nextSibling;
                n = s.getAttribute("au-slot");
                if (null !== n) {
                    if (null === f) throw new Error(`AUR0706:${t.nodeName}[${n}]`);
                    if ("" === n) n = "default";
                    t.removeChild(s);
                    s.removeAttribute("au-slot");
                    (null !== (l = (a = null !== o && void 0 !== o ? o : o = {})[n]) && void 0 !== l ? l : a[n] = []).push(s);
                }
            } else i = i.nextSibling;
            if (null != o) {
                r = {};
                for (n in o) {
                    u = e.h("template");
                    h = o[n];
                    for (m = 0, v = h.length; v > m; ++m) {
                        c = h[m];
                        if ("TEMPLATE" === c.nodeName) if (c.attributes.length > 0) u.content.appendChild(c); else u.content.appendChild(c.content); else u.content.appendChild(c);
                    }
                    d = e.we();
                    this.re(u.content, d);
                    r[n] = CustomElementDefinition.create({
                        name: Jn(),
                        template: u,
                        instructions: d.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                U.projections = r;
            }
            if (null !== f && f.containerless) this.be(t, e);
            H = null === f || !f.containerless && !W && false !== N;
            if (H && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.re(i, e);
            }
        }
        return c;
    }
    me(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.ve(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    ce(t, e, i, s) {
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
                f = s.ue.parse(l, h);
                d = s.he(f);
                m = n.attrs[f.target];
                if (null == m) throw new Error(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    Fn.node = t;
                    Fn.attr = f;
                    Fn.bindable = m;
                    Fn.def = i;
                    o.push(d.build(Fn));
                }
                while (v < r && e.charCodeAt(++v) <= 32) ;
                a = v;
                l = void 0;
                h = void 0;
            }
        }
        Ln();
        return o;
    }
    ne(t, e) {
        var i, s;
        const n = t;
        const r = J(n.querySelectorAll("template[as-custom-element]"));
        const o = r.length;
        if (0 === o) return;
        if (o === n.childElementCount) throw new Error("AUR0708");
        const l = new Set;
        const h = [];
        for (const t of r) {
            if (t.parentNode !== n) throw new Error("AUR0709");
            const i = Hn(t, l);
            const s = class LocalTemplate {};
            const r = t.content;
            const o = J(r.querySelectorAll("bindable"));
            const a = It.for(s);
            const c = new Set;
            const u = new Set;
            for (const t of o) {
                if (t.parentNode !== r) throw new Error("AUR0710");
                const e = t.getAttribute("property");
                if (null === e) throw new Error("AUR0711");
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || c.has(e)) throw new Error(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    c.add(e);
                }
                a.add({
                    property: e,
                    attribute: null !== i && void 0 !== i ? i : void 0,
                    mode: zn(t)
                });
                const s = t.getAttributeNames().filter((t => !Nn.includes(t)));
                if (s.length > 0) ;
                r.removeChild(t);
            }
            h.push(s);
            e.xe(ni.define({
                name: i,
                template: t
            }, s));
            n.removeChild(t);
        }
        let a = 0;
        const c = h.length;
        for (;c > a; ++a) ni.getDefinition(h[a]).dependencies.push(...null !== (i = e.def.dependencies) && void 0 !== i ? i : L, ...null !== (s = e.deps) && void 0 !== s ? s : L);
    }
    ge(t) {
        return "INPUT" === t.nodeName && 1 === Mn[t.type];
    }
    pe(t, e) {
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
    ve(t) {
        t.classList.add("au");
        return t;
    }
    be(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.ve(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.ye = bt();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.se = o ? s.se : e.get(Dn);
        this.ue = o ? s.ue : e.get(_t);
        this.ep = o ? s.ep : e.get(c);
        this.m = o ? s.m : e.get(Qt);
        this.Ut = o ? s.Ut : e.get(X);
        this.p = o ? s.p : e.get(Yt);
        this.localEls = o ? s.localEls : new Set;
        this.rows = null !== r && void 0 !== r ? r : [];
    }
    xe(t) {
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
    le(t) {
        return this.c.find(ni, t);
    }
    ae(t) {
        return this.c.find(Fe, t);
    }
    we(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    he(t) {
        if (this.root !== this) return this.root.he(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.ye[e];
        if (void 0 === i) {
            i = this.c.create(vn, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.ye[e] = i;
        }
        return i;
    }
}

function On(t) {
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

function Ln() {
    Fn.node = Fn.attr = Fn.bindable = Fn.def = null;
}

const qn = {
    projections: null
};

const Un = {
    name: "unnamed"
};

const Fn = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const _n = Object.assign(bt(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const Mn = {
    checkbox: 1,
    radio: 1
};

const Vn = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(e, i) {
        let s = Vn.get(e);
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
            Vn.set(e, s = new BindablesInfo(r, n, c));
        }
        return s;
    }
}

var jn;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(jn || (jn = {}));

const Nn = Object.freeze([ "property", "attribute", "mode" ]);

const Wn = "as-custom-element";

function Hn(t, e) {
    const i = t.getAttribute(Wn);
    if (null === i || "" === i) throw new Error("AUR0715");
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Wn);
    }
    return i;
}

function zn(e) {
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

const Gn = O.createInterface("ITemplateCompilerHooks");

const Xn = new WeakMap;

const Kn = vt("compiler-hooks");

const Yn = Object.freeze({
    name: Kn,
    define(t) {
        let e = Xn.get(t);
        if (void 0 === e) {
            Xn.set(t, e = new TemplateCompilerHooksDefinition(t));
            ut(Kn, e, t);
            gt(t, Kn);
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
        t.register(U.singleton(Gn, this.Type));
    }
}

const Zn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Yn.define(t);
    }
};

const Jn = ni.generateName;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
        this.ke = new Map;
    }
    bind(t, e, i) {
        this.ke.set(i, i.mode);
        i.mode = this.mode;
    }
    unbind(t, e, i) {
        i.mode = this.ke.get(i);
        this.ke.delete(i);
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

const Qn = 200;

class DebounceBindingBehavior extends p {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: Qn
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.locator.get(F).taskQueue;
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
            this.opts.delay = isNaN(i) ? Qn : i;
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
        this.Ce = t;
    }
    bind(t, e, i, ...s) {
        if (!("handleChange" in i)) throw new Error("AUR0817");
        if (0 === s.length) throw new Error("AUR0818");
        this.Yt.set(i, s);
        let n;
        for (n of s) this.Ce.addSignalListener(n, i);
    }
    unbind(t, e, i) {
        const s = this.Yt.get(i);
        this.Yt.delete(i);
        let n;
        for (n of s) this.Ce.removeSignalListener(n, i);
    }
}

SignalBindingBehavior.inject = [ w ];

g("signal")(SignalBindingBehavior);

const tr = 200;

class ThrottleBindingBehavior extends p {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: tr
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.locator.get(F);
        this.Ae = this.p.taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.Re((() => this.binding.callSource(t)));
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
        this.Re((() => this.binding.updateSource(t, e)));
    }
    Re(t) {
        const e = this.opts;
        const i = this.p;
        const s = this.lastCall + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.task;
            e.delay = s;
            this.task = this.Ae.queueTask((() => {
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
            this.opts.delay = this.delay = isNaN(i) ? tr : i;
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

const er = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, i) {
        i.targetObserver = er;
    }
    unbind(t, e, i) {
        return;
    }
}

g("attr")(AttrBindingBehavior);

function ir(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e, i) {
        if (!i.callSource || !i.targetEvent) throw new Error("AUR0801");
        i.selfEventCallSource = i.callSource;
        i.callSource = ir;
    }
    unbind(t, e, i) {
        i.callSource = i.selfEventCallSource;
        i.selfEventCallSource = null;
    }
}

g("self")(SelfBindingBehavior);

const sr = bt();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        var e;
        return null !== (e = sr[t]) && void 0 !== e ? e : sr[t] = new AttributeNSAccessor(t);
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i, s) {
        if (null == t) i.removeAttributeNS(this.ns, s); else i.setAttributeNS(this.ns, s, t);
    }
}

function nr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Se = void 0;
        this.Ee = void 0;
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
        this.Be();
        this.Ie();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.Ie();
    }
    handleChange(t, e, i) {
        this.Ie();
    }
    Ie() {
        const t = this.v;
        const e = this.o;
        const i = xt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : nr;
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
        const n = void 0 !== e.matcher ? e.matcher : nr;
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
        this.Be();
    }
    stop() {
        var t, e;
        this.handler.dispose();
        null === (t = this.Se) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Se = void 0;
        null === (e = this.Ee) || void 0 === e ? void 0 : e.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        rr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, rr, this.f);
    }
    Be() {
        var t, e, i, s, n, r, o;
        const l = this.o;
        null === (n = null !== (t = this.Ee) && void 0 !== t ? t : this.Ee = null !== (i = null === (e = l.$observers) || void 0 === e ? void 0 : e.model) && void 0 !== i ? i : null === (s = l.$observers) || void 0 === s ? void 0 : s.value) || void 0 === n ? void 0 : n.subscribe(this);
        null === (r = this.Se) || void 0 === r ? void 0 : r.unsubscribe(this);
        this.Se = void 0;
        if ("checkbox" === l.type) null === (o = this.Se = pr(this.v, this.oL)) || void 0 === o ? void 0 : o.subscribe(this);
    }
}

e(CheckedObserver);

i(CheckedObserver);

let rr;

const or = {
    childList: true,
    subtree: true,
    characterData: true
};

function lr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.Te = void 0;
        this.De = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? hr(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Pe(t instanceof Array ? t : null);
        if (0 === (256 & e)) this.K();
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
        const n = null !== (t = i.matcher) && void 0 !== t ? t : lr;
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
            const o = t.matcher || lr;
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
    $e() {
        (this.De = new this.o.ownerDocument.defaultView.MutationObserver(this.Oe.bind(this))).observe(this.o, or);
        this.Pe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Le() {
        var t;
        this.De.disconnect();
        null === (t = this.Te) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.De = this.Te = void 0;
        this.iO = false;
    }
    Pe(t) {
        var e;
        null === (e = this.Te) || void 0 === e ? void 0 : e.unsubscribe(this);
        this.Te = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error("AUR0654");
            (this.Te = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    Oe(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.$e();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Le();
        }
    }
    flush() {
        ar = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ar, 0);
    }
}

e(SelectValueObserver);

i(SelectValueObserver);

function hr(t) {
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

let ar;

const cr = "--";

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
        if (0 === (256 & e)) this.K();
    }
    qe(t) {
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
    Ue(t) {
        let e;
        let i;
        const s = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (Rt(e)) {
                if (i.startsWith(cr)) {
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
    _e(t) {
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
        if (Rt(t)) return this.qe(t);
        if (t instanceof Array) return this._e(t);
        if (t instanceof Object) return this.Ue(t);
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
        if (!this.handler.config.readonly && 0 === (256 & e)) this.K(e);
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
        ur = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ur, 0);
    }
}

e(ValueAttributeObserver);

i(ValueAttributeObserver);

let ur;

const fr = "http://www.w3.org/1999/xlink";

const dr = "http://www.w3.org/XML/1998/namespace";

const mr = "http://www.w3.org/2000/xmlns/";

const vr = Object.assign(bt(), {
    "xlink:actuate": [ "actuate", fr ],
    "xlink:arcrole": [ "arcrole", fr ],
    "xlink:href": [ "href", fr ],
    "xlink:role": [ "role", fr ],
    "xlink:show": [ "show", fr ],
    "xlink:title": [ "title", fr ],
    "xlink:type": [ "type", fr ],
    "xml:lang": [ "lang", dr ],
    "xml:space": [ "space", dr ],
    xmlns: [ "xmlns", mr ],
    "xmlns:xlink": [ "xlink", mr ]
});

const gr = new b;

gr.type = 2 | 4;

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
        this.Ve = bt();
        this.je = bt();
        this.Ne = bt();
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
            if (null == o[e]) o[e] = new NodeObserverConfig(i); else wr(t, e);
        } else for (const i in t) {
            o = null !== (n = r[i]) && void 0 !== n ? n : r[i] = bt();
            const s = t[i];
            for (e in s) if (null == o[e]) o[e] = new NodeObserverConfig(s[e]); else wr(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ve;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else wr("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else wr("*", t);
    }
    getAccessor(t, e, i) {
        var s;
        if (e in this.Ne || e in (null !== (s = this.je[t.tagName]) && void 0 !== s ? s : Q)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
            return er;

          default:
            {
                const i = vr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (kt(t, e, this.svgAnalyzer)) return er;
                return gr;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        var n, r;
        let o;
        if (Rt(t)) {
            o = null !== (i = (n = this.je)[t]) && void 0 !== i ? i : n[t] = bt();
            o[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            o = null !== (s = (r = this.je)[e]) && void 0 !== s ? s : r[e] = bt();
            o[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.Ne[e] = true;
    }
    getObserver(t, e, i) {
        var s, n;
        switch (e) {
          case "role":
            return er;

          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const r = null !== (n = null === (s = this.Me[t.tagName]) || void 0 === s ? void 0 : s[e]) && void 0 !== n ? n : this.Ve[e];
        if (null != r) return new r.type(t, e, new EventSubscriber(r), i, this.locator);
        const o = vr[e];
        if (void 0 !== o) return AttributeNSAccessor.forNs(o[1]);
        if (kt(t, e, this.svgAnalyzer)) return er;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new y(t, e);
    }
}

NodeObserverLocator.inject = [ tt, Yt, k, Zt ];

function pr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function wr(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(e, i, s, ...n) {
        if (0 === n.length) throw new Error(`AUR0802`);
        if (s.mode !== t.twoWay && s.mode !== t.fromView) throw new Error("AUR0803");
        const r = this.oL.getObserver(s.target, s.targetProperty);
        if (!r.handler) throw new Error("AUR0804");
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
        this.We = t;
        this.p = e;
        this.He = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.ze(); else this.He = true;
    }
    attached() {
        if (this.He) {
            this.He = false;
            this.ze();
        }
        this.We.addEventListener("focus", this);
        this.We.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.We;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Ge) this.value = false;
    }
    ze() {
        const t = this.We;
        const e = this.Ge;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get Ge() {
        return this.We === this.p.document.activeElement;
    }
}

Focus.inject = [ rs, Yt ];

lt([ St({
    mode: t.twoWay
}) ], Focus.prototype, "value", void 0);

$e("focus")(Focus);

let br = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.Xe = false;
        this.Ke = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ke = null;
            if (Boolean(this.value) !== this.Ye) if (this.Ye === this.Ze) {
                this.Ye = !this.Ze;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Ye = this.Ze;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Ye = this.Ze = "hide" !== i.alias;
    }
    binding() {
        this.Xe = true;
        this.update();
    }
    detaching() {
        var t;
        this.Xe = false;
        null === (t = this.Ke) || void 0 === t ? void 0 : t.cancel();
        this.Ke = null;
    }
    valueChanged() {
        if (this.Xe && null === this.Ke) this.Ke = this.p.domWriteQueue.queueTask(this.update);
    }
};

lt([ St ], br.prototype, "value", void 0);

br = lt([ ht(0, rs), ht(1, Yt), ht(2, Cs) ], br);

C("hide")(br);

$e("show")(br);

class Portal {
    constructor(t, e, i) {
        this.id = H("au$component");
        this.strict = false;
        this.p = i;
        this.Je = i.document.createElement("div");
        this.view = t.create();
        us(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.Je = this.Qe();
        this.view.setHost(s);
        return this.ti(t, s, i);
    }
    detaching(t, e, i) {
        return this.ei(t, this.Je, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.Je;
        const i = this.Je = this.Qe();
        if (e === i) return;
        this.view.setHost(i);
        const s = K(this.ei(null, i, t.flags), (() => this.ti(null, i, t.flags)));
        if (s instanceof Promise) s.catch((t => {
            throw t;
        }));
    }
    ti(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return K(null === s || void 0 === s ? void 0 : s.call(n, e, r), (() => this.ii(t, e, i)));
    }
    ii(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return K(n.activate(null !== t && void 0 !== t ? t : n, s, i, s.scope), (() => this.si(e)));
        return this.si(e);
    }
    si(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    ei(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return K(null === s || void 0 === s ? void 0 : s.call(n, e, r), (() => this.ni(t, e, i)));
    }
    ni(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return K(n.deactivate(t, s, i), (() => this.ri(e)));
        return this.ri(e);
    }
    ri(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    Qe() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw new Error("AUR0811");
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
            if (this.strict) throw new Error("AUR0812");
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

Portal.inject = [ Ri, ls, Yt ];

lt([ St({
    primary: true
}) ], Portal.prototype, "target", void 0);

lt([ St({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

lt([ St() ], Portal.prototype, "strict", void 0);

lt([ St() ], Portal.prototype, "deactivating", void 0);

lt([ St() ], Portal.prototype, "activating", void 0);

lt([ St() ], Portal.prototype, "deactivated", void 0);

lt([ St() ], Portal.prototype, "activated", void 0);

lt([ St() ], Portal.prototype, "callbackContext", void 0);

Oe("portal")(Portal);

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

class FrequentMutations extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 512);
    }
}

FrequentMutations.inject = [ Ri, ls ];

class ObserveShallow extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 128);
    }
}

ObserveShallow.inject = [ Ri, ls ];

Oe("frequent-mutations")(FrequentMutations);

Oe("observe-shallow")(ObserveShallow);

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
        this.oi = false;
        this.li = 0;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.li++;
        const o = () => !this.oi && this.li === r + 1;
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
        this.oi = true;
        return K(this.pending, (() => {
            var e;
            this.oi = false;
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
        const r = this.li++;
        const o = () => !this.oi && this.li === r + 1;
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

If.inject = [ Ri, ls, is ];

lt([ St ], If.prototype, "value", void 0);

lt([ St({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Oe("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = H("au$component");
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error("AUR0810");
    }
}

Else.inject = [ Ri ];

Oe({
    name: "else"
})(Else);

function xr(t) {
    t.dispose();
}

const yr = [ 38962, 36913 ];

class Repeat {
    constructor(t, e, i) {
        this.l = t;
        this.hi = e;
        this.f = i;
        this.id = H("au$component");
        this.views = [];
        this.key = void 0;
        this.ai = void 0;
        this.ui = false;
        this.fi = false;
        this.di = null;
        this.mi = void 0;
        this.vi = false;
    }
    binding(t, e, i) {
        const s = this.hi.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.sourceExpression;
                this.gi = r;
                let t = o.iterable;
                while (null != t && yr.includes(t.$kind)) {
                    t = t.expression;
                    this.ui = true;
                }
                this.di = t;
                break;
            }
        }
        this.pi(i);
        const h = o.declaration;
        if (!(this.vi = 90137 === h.$kind || 106521 === h.$kind)) this.local = h.evaluate(i, this.$controller.scope, r.locator, null);
    }
    attaching(t, e, i) {
        this.wi(i);
        return this.bi(t, i);
    }
    detaching(t, e, i) {
        this.pi(i);
        return this.xi(t, i);
    }
    itemsChanged(t) {
        const {$controller: e} = this;
        if (!e.isActive) return;
        t |= e.flags;
        this.pi(t);
        this.wi(t);
        const i = K(this.xi(null, t), (() => this.bi(null, t)));
        if (i instanceof Promise) i.catch((t => {
            throw t;
        }));
    }
    handleCollectionChange(t, e) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        if (this.ui) {
            if (this.fi) return;
            this.fi = true;
            this.items = this.forOf.iterable.evaluate(e, i.scope, this.gi.locator, null);
            this.fi = false;
            return;
        }
        e |= i.flags;
        this.wi(e);
        if (void 0 === t) {
            const t = K(this.xi(null, e), (() => this.bi(null, e)));
            if (t instanceof Promise) t.catch((t => {
                throw t;
            }));
        } else {
            const i = this.views.length;
            A(t);
            if (t.deletedItems.length > 0) {
                t.deletedItems.sort(et);
                const s = K(this.yi(t, e), (() => this.ki(i, t, e)));
                if (s instanceof Promise) s.catch((t => {
                    throw t;
                }));
            } else this.ki(i, t, e);
        }
    }
    pi(t) {
        var e;
        const i = this.$controller.scope;
        let s = this.Ci;
        let n = this.ui;
        if (n) {
            s = this.Ci = null !== (e = this.di.evaluate(t, i, this.gi.locator, null)) && void 0 !== e ? e : null;
            n = this.ui = !Object.is(this.items, s);
        }
        const r = this.ai;
        if (4 & t) {
            if (void 0 !== r) r.unsubscribe(this);
        } else if (this.$controller.isActive) {
            const t = this.ai = R(n ? s : this.items);
            if (r !== t && r) r.unsubscribe(this);
            if (t) t.subscribe(this);
        }
    }
    wi(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.mi = e;
            return;
        }
        const i = this.forOf;
        if (void 0 === i) return;
        const s = [];
        this.forOf.iterate(t, e, ((t, e, i) => {
            s[e] = i;
        }));
        this.mi = s;
    }
    bi(t, e) {
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
            if (this.vi) d.declaration.assign(e, r = l.fromParent(f, S.create()), this.gi.locator, p); else r = l.fromParent(f, S.create(a, p));
            Sr(r.overrideContext, g, m);
            s = n.activate(null !== t && void 0 !== t ? t : n, o, e, r);
            if (s instanceof Promise) (null !== i && void 0 !== i ? i : i = []).push(s);
        }));
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    xi(t, e) {
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
    yi(t, e) {
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
    ki(t, e, i) {
        var s;
        let n;
        let r;
        let o;
        let h;
        let a = 0;
        const {$controller: c, f: u, local: f, mi: d, l: m, views: v} = this;
        const g = e.length;
        for (;g > a; ++a) if (-2 === e[a]) {
            o = u.create();
            v.splice(a, 0, o);
        }
        if (v.length !== g) throw new Error(`AUR0814:${v.length}!=${g}`);
        const p = c.scope;
        const w = e.length;
        E(v, e);
        const b = Rr(e);
        const x = b.length;
        let y;
        let k = x - 1;
        a = w - 1;
        for (;a >= 0; --a) {
            o = v[a];
            y = v[a + 1];
            o.nodes.link(null !== (s = null === y || void 0 === y ? void 0 : y.nodes) && void 0 !== s ? s : m);
            if (-2 === e[a]) {
                if (this.vi) this.forOf.declaration.assign(i, h = l.fromParent(p, S.create()), this.gi.locator, d[a]); else h = l.fromParent(p, S.create(f, d[a]));
                Sr(h.overrideContext, a, w);
                o.setLocation(m);
                r = o.activate(o, c, i, h);
                if (r instanceof Promise) (null !== n && void 0 !== n ? n : n = []).push(r);
            } else if (k < 0 || 1 === x || a !== b[k]) {
                Sr(o.scope.overrideContext, a, w);
                o.nodes.insertBefore(o.location);
            } else {
                if (t !== w) Sr(o.scope.overrideContext, a, w);
                --k;
            }
        }
        if (void 0 !== n) return 1 === n.length ? n[0] : Promise.all(n);
    }
    dispose() {
        this.views.forEach(xr);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ ls, Ki, Ri ];

lt([ St ], Repeat.prototype, "items", void 0);

Oe("repeat")(Repeat);

let kr = 16;

let Cr = new Int32Array(kr);

let Ar = new Int32Array(kr);

function Rr(t) {
    const e = t.length;
    if (e > kr) {
        kr = e;
        Cr = new Int32Array(e);
        Ar = new Int32Array(e);
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
            o = Cr[i];
            n = t[o];
            if (-2 !== n && n < s) {
                Ar[r] = o;
                Cr[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                a = l + h >> 1;
                n = t[Cr[a]];
                if (-2 !== n && n < s) l = a + 1; else h = a;
            }
            n = t[Cr[l]];
            if (s < n || -2 === n) {
                if (l > 0) Ar[r] = Cr[l - 1];
                Cr[l] = r;
            }
        }
    }
    r = ++i;
    const c = new Int32Array(r);
    s = Cr[i - 1];
    while (i-- > 0) {
        c[i] = s;
        s = Ar[s];
    }
    while (r-- > 0) Cr[r] = 0;
    return c;
}

function Sr(t, e, i) {
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

With.inject = [ Ri, ls ];

lt([ St ], With.prototype, "value", void 0);

Oe("with")(With);

let Er = class Switch {
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
        this.queue((() => this.Ai(t, e)));
    }
    Ai(t, e) {
        const i = t.isMatch(this.value, e);
        const s = this.activeCases;
        const n = s.length;
        if (!i) {
            if (n > 0 && s[0].id === t.id) return this.Ri(null, e);
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
        return K(this.Ri(null, e, r), (() => {
            this.activeCases = r;
            return this.Si(null, e);
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
        return K(this.activeCases.length > 0 ? this.Ri(t, e, s) : void 0, (() => {
            this.activeCases = s;
            if (0 === s.length) return;
            return this.Si(t, e);
        }));
    }
    Si(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        const s = this.activeCases;
        const n = s.length;
        if (0 === n) return;
        const r = i.scope;
        if (1 === n) return s[0].activate(t, e, r);
        return Y(...s.map((i => i.activate(t, e, r))));
    }
    Ri(t, e, i = []) {
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

lt([ St ], Er.prototype, "value", void 0);

Er = lt([ Oe("switch"), ht(0, Ri), ht(1, ls) ], Er);

let Br = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Ei = e;
        this.l = i;
        this.id = H("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Bi = s.config.level <= 1;
        this.Ut = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = null === n || void 0 === n ? void 0 : n.viewModel;
        if (r instanceof Er) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error("AUR0815");
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t, e) {
        this.Ut.debug("isMatch()");
        const i = this.value;
        if (Array.isArray(i)) {
            if (void 0 === this.ai) this.ai = this.Ii(e, i);
            return i.includes(t);
        }
        return i === t;
    }
    valueChanged(t, e, i) {
        var s;
        if (Array.isArray(t)) {
            null === (s = this.ai) || void 0 === s ? void 0 : s.unsubscribe(this);
            this.ai = this.Ii(i, t);
        } else if (void 0 !== this.ai) this.ai.unsubscribe(this);
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
        null === (t = this.ai) || void 0 === t ? void 0 : t.unsubscribe(this);
        null === (e = this.view) || void 0 === e ? void 0 : e.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ii(t, e) {
        const i = this.Ei.getArrayObserver(e);
        i.subscribe(this);
        return i;
    }
    accept(t) {
        var e;
        if (true === this.$controller.accept(t)) return true;
        return null === (e = this.view) || void 0 === e ? void 0 : e.accept(t);
    }
};

Br.inject = [ Ri, a, ls, X ];

lt([ St ], Br.prototype, "value", void 0);

lt([ St({
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
}) ], Br.prototype, "fallThrough", void 0);

Br = lt([ Oe("case") ], Br);

let Ir = class DefaultCase extends Br {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error("AUR0816");
        t.defaultCase = this;
    }
};

Ir = lt([ Oe("default-case") ], Ir);

let Tr = class PromiseTemplateController {
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

lt([ St ], Tr.prototype, "value", void 0);

Tr = lt([ Oe("promise"), ht(0, Ri), ht(1, ls), ht(2, Yt), ht(3, X) ], Tr);

let Dr = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        Or(t).pending = this;
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

lt([ St({
    mode: t.toView
}) ], Dr.prototype, "value", void 0);

Dr = lt([ Oe("pending"), ht(0, Ri), ht(1, ls) ], Dr);

let Pr = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        Or(t).fulfilled = this;
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

lt([ St({
    mode: t.fromView
}) ], Pr.prototype, "value", void 0);

Pr = lt([ Oe("then"), ht(0, Ri), ht(1, ls) ], Pr);

let $r = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = H("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        Or(t).rejected = this;
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

lt([ St({
    mode: t.fromView
}) ], $r.prototype, "value", void 0);

$r = lt([ Oe("catch"), ht(0, Ri), ht(1, ls) ], $r);

function Or(t) {
    const e = t.parent;
    const i = null === e || void 0 === e ? void 0 : e.viewModel;
    if (i instanceof Tr) return i;
    throw new Error("AUR0813");
}

let Lr = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Lr = lt([ Mt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Lr);

let qr = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

qr = lt([ Mt({
    pattern: "then",
    symbols: ""
}) ], qr);

let Ur = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Ur = lt([ Mt({
    pattern: "catch",
    symbols: ""
}) ], Ur);

function Fr(t, e, i, s) {
    if (Rt(e)) return _r(t, e, i, s);
    if (ni.isType(e)) return Mr(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Ti = i;
        this.Di = void 0;
    }
    get definition() {
        if (void 0 === this.Di) this.Di = CustomElementDefinition.create({
            name: ni.generateName(),
            template: this.node,
            needsCompile: Rt(this.node),
            instructions: this.instructions,
            dependencies: this.Ti
        });
        return this.Di;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get($i).getViewFactory(this.definition, t.createChild().register(...this.Ti));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Ti);
    }
}

function _r(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (As(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) Vr(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function Mr(t, e, i, s) {
    const n = ni.getDefinition(e);
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
        if (As(e)) h.push(e); else if (void 0 === a[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) Vr(t, c, s, o, l);
    return new RenderPlan(c, o, l);
}

function Vr(t, e, i, s, n) {
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

function jr(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Pi = e;
        this.$i = i;
        this.r = s;
        this.id = H("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Oi = void 0;
        this.Li = e.props.reduce(jr, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Oi !== s) {
            this.Oi = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.ni(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Oi === t) return;
        this.Oi = t;
        this.composing = true;
        i |= s.flags;
        const n = K(this.ni(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (n instanceof Promise) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return K(void 0 === t ? K(e, (t => this.qi(t, s))) : t, (t => this.ii(this.view = t, i, s)));
    }
    ni(t, e, i) {
        return null === t || void 0 === t ? void 0 : t.deactivate(null !== e && void 0 !== e ? e : t, this.$controller, i);
    }
    ii(t, e, i) {
        const {$controller: s} = this;
        return K(null === t || void 0 === t ? void 0 : t.activate(null !== e && void 0 !== e ? e : t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    qi(t, e) {
        const i = this.Ui(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Ui(t, e) {
        if (!t) return;
        const i = this.$i.controller.container;
        if ("object" === typeof t) {
            if (Nr(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (Rt(t)) {
            const e = i.find(ni, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return Fr(this.p, t, this.Li, this.$controller.host.childNodes).createView(i);
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

AuRender.inject = [ Yt, Cs, Yi, $i ];

lt([ St ], AuRender.prototype, "component", void 0);

lt([ St({
    mode: t.fromView
}) ], AuRender.prototype, "composing", void 0);

Ne({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function Nr(t) {
    return "lockScope" in t;
}

class AuCompose {
    constructor(t, e, i, s, n, r) {
        this.c = t;
        this.parent = e;
        this.host = i;
        this.p = s;
        this.scopeBehavior = "auto";
        this.Fi = void 0;
        this.l = n.containerless ? fs(this.host) : void 0;
        this.r = t.get($i);
        this.Pi = n;
        this._i = r;
    }
    static get inject() {
        return [ W, Ki, rs, Yt, Cs, it(CompositionContextFactory) ];
    }
    get pending() {
        return this.Mi;
    }
    get composition() {
        return this.Fi;
    }
    attaching(t, e, i) {
        return this.Mi = K(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this._i.isCurrent(t)) this.Mi = void 0;
        }));
    }
    detaching(t) {
        const e = this.Fi;
        const i = this.Mi;
        this._i.invalidate();
        this.Fi = this.Mi = void 0;
        return K(i, (() => null === e || void 0 === e ? void 0 : e.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Fi) {
            this.Fi.update(this.model);
            return;
        }
        this.Mi = K(this.Mi, (() => K(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this._i.isCurrent(t)) this.Mi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this._i;
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
            if (f.containerless) throw new Error("AUR0806");
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
                    projections: this.Pi.projections
                }, f);
                return new CompositionController(n, (t => n.activate(null !== t && void 0 !== t ? t : n, c, 2, c.scope.parentScope)), (t => K(n.deactivate(null !== t && void 0 !== t ? t : n, c, 4), s)), (t => {
                    var i;
                    return null === (i = e.activate) || void 0 === i ? void 0 : i.call(e, t);
                }), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: ni.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, d);
                const o = Controller.$view(r, c);
                const h = "auto" === this.scopeBehavior ? l.fromParent(this.parent.scope, e) : l.create(e);
                if (ds(i)) o.setLocation(i); else o.setHost(i);
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
        const n = ds(i);
        t.registerResolver(s.Element, t.registerResolver(rs, new G("ElementResolver", n ? null : i)));
        t.registerResolver(ls, new G("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        t.registerResolver(e, new G("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = At(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return ni.isType(e) ? ni.getDefinition(e) : null;
    }
}

lt([ St ], AuCompose.prototype, "view", void 0);

lt([ St ], AuCompose.prototype, "viewModel", void 0);

lt([ St ], AuCompose.prototype, "model", void 0);

lt([ St({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error("AUR0805");
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Ne("au-compose")(AuCompose);

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
            throw new Error("AUR0808");

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, i, s) {
        var n, r;
        this.Vi = null;
        this.ji = null;
        let o;
        const l = e.auSlot;
        const h = null === (r = null === (n = i.instruction) || void 0 === n ? void 0 : n.projections) || void 0 === r ? void 0 : r[l.name];
        if (null == h) {
            o = s.getViewFactory(l.fallback, i.controller.container);
            this.Ni = false;
        } else {
            o = s.getViewFactory(h, i.parent.controller.container);
            this.Ni = true;
        }
        this.$i = i;
        this.view = o.create().setLocation(t);
    }
    static get inject() {
        return [ ls, Cs, Yi, $i ];
    }
    binding(t, e, i) {
        var s;
        this.Vi = this.$controller.scope.parentScope;
        let n;
        if (this.Ni) {
            n = this.$i.controller.scope.parentScope;
            (this.ji = l.fromParent(n, n.bindingContext)).overrideContext.$host = null !== (s = this.expose) && void 0 !== s ? s : this.Vi.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Ni ? this.ji : this.Vi);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Ni && null != this.ji) this.ji.overrideContext.$host = t;
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

lt([ St ], AuSlot.prototype, "expose", void 0);

Ne({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Wr = O.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let Hr = class SanitizeValueConverter {
    constructor(t) {
        this.Wi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Wi.sanitize(t);
    }
};

Hr = lt([ ht(0, Wr) ], Hr);

B("sanitize")(Hr);

let zr = class ViewValueConverter {
    constructor(t) {
        this.Hi = t;
    }
    toView(t, e) {
        return this.Hi.getViewComponentForObject(t, e);
    }
};

zr = lt([ ht(0, Pi) ], zr);

B("view")(zr);

const Gr = DebounceBindingBehavior;

const Xr = OneTimeBindingBehavior;

const Kr = ToViewBindingBehavior;

const Yr = FromViewBindingBehavior;

const Zr = SignalBindingBehavior;

const Jr = ThrottleBindingBehavior;

const Qr = TwoWayBindingBehavior;

const to = TemplateCompiler;

const eo = NodeObserverLocator;

const io = [ to, eo ];

const so = SVGAnalyzer;

const no = Xt;

const ro = Gt;

const oo = zt;

const lo = Ht;

const ho = Kt;

const ao = [ oo, lo, ho ];

const co = [ no, ro ];

const uo = yn;

const fo = xn;

const mo = kn;

const vo = wn;

const go = gn;

const po = pn;

const wo = bn;

const bo = In;

const xo = Cn;

const yo = An;

const ko = Rn;

const Co = Sn;

const Ao = Bn;

const Ro = En;

const So = Tn;

const Eo = [ fo, go, vo, po, wo, uo, mo, bo, xo, yo, ko, Ao, Ro, Co, So ];

const Bo = Hr;

const Io = zr;

const To = FrequentMutations;

const Do = ObserveShallow;

const Po = If;

const $o = Else;

const Oo = Repeat;

const Lo = With;

const qo = Er;

const Uo = Br;

const Fo = Ir;

const _o = Tr;

const Mo = Dr;

const Vo = Pr;

const jo = $r;

const No = Lr;

const Wo = qr;

const Ho = Ur;

const zo = AttrBindingBehavior;

const Go = SelfBindingBehavior;

const Xo = UpdateTriggerBindingBehavior;

const Ko = AuRender;

const Yo = AuCompose;

const Zo = Portal;

const Jo = Focus;

const Qo = br;

const tl = [ Gr, Xr, Kr, Yr, Zr, Jr, Qr, Bo, Io, To, Do, Po, $o, Oo, Lo, qo, Uo, Fo, _o, Mo, Vo, jo, No, Wo, Ho, zo, Go, Xo, Ko, Yo, Zo, Jo, Qo, AuSlot ];

const el = qs;

const il = $s;

const sl = Ps;

const nl = Fs;

const rl = Ms;

const ol = Ls;

const ll = _s;

const hl = Us;

const al = Ds;

const cl = Os;

const ul = Hs;

const fl = Ys;

const dl = zs;

const ml = Gs;

const vl = Xs;

const gl = Ks;

const pl = Ws;

const wl = Zs;

const bl = [ ll, rl, el, hl, nl, al, sl, il, cl, ol, ul, fl, dl, ml, vl, gl, pl, wl ];

const xl = yl($);

function yl(t) {
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
            return e.register(U.instance(h, i.coercingOptions), ...io, ...tl, ...ao, ...Eo, ...bl);
        },
        customize(e) {
            return yl(null !== e && void 0 !== e ? e : t);
        }
    };
}

const kl = O.createInterface("IAurelia");

class Aurelia {
    constructor(t = O.createContainer()) {
        this.container = t;
        this.ir = false;
        this.zi = false;
        this.Gi = false;
        this.Xi = void 0;
        this.next = void 0;
        this.Ki = void 0;
        this.Yi = void 0;
        if (t.has(kl, true)) throw new Error("AUR0768");
        t.registerResolver(kl, new G("IAurelia", this));
        t.registerResolver(es, this.Zi = new G("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.zi;
    }
    get isStopping() {
        return this.Gi;
    }
    get root() {
        if (null == this.Xi) {
            if (null == this.next) throw new Error("AUR0767");
            return this.next;
        }
        return this.Xi;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.Ji(t.host), this.container, this.Zi);
        return this;
    }
    enhance(t, e) {
        var i;
        const s = null !== (i = t.container) && void 0 !== i ? i : this.container.createChild();
        const n = t.host;
        const r = this.Ji(n);
        const o = t.component;
        let l;
        if (At(o)) {
            s.registerResolver(r.HTMLElement, s.registerResolver(r.Element, s.registerResolver(rs, new G("ElementResolver", n))));
            l = s.invoke(o);
        } else l = o;
        s.registerResolver(os, new G("IEventTarget", n));
        e = null !== e && void 0 !== e ? e : null;
        const h = Controller.$el(s, l, n, null, CustomElementDefinition.create({
            name: ni.generateName(),
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
    Ji(t) {
        let e;
        if (!this.container.has(Yt, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error("AUR0769");
            e = new ot(t.ownerDocument.defaultView);
            this.container.register(U.instance(Yt, e));
        } else e = this.container.get(Yt);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error("AUR0770");
        if (this.Ki instanceof Promise) return this.Ki;
        return this.Ki = K(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.Zi.prepare(this.Xi = t);
            this.zi = true;
            return K(t.activate(), (() => {
                this.ir = true;
                this.zi = false;
                this.Ki = void 0;
                this.Qi(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (this.Yi instanceof Promise) return this.Yi;
        if (true === this.ir) {
            const e = this.Xi;
            this.ir = false;
            this.Gi = true;
            return this.Yi = K(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.Xi = void 0;
                this.Zi.dispose();
                this.Gi = false;
                this.Qi(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Gi) throw new Error("AUR0771");
        this.container.dispose();
    }
    Qi(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var Cl;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(Cl || (Cl = {}));

const Al = O.createInterface("IDialogService");

const Rl = O.createInterface("IDialogController");

const Sl = O.createInterface("IDialogDomRenderer");

const El = O.createInterface("IDialogDom");

const Bl = O.createInterface("IDialogGlobalSettings");

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

var Il;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(Il || (Il = {}));

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
        return [ Yt, W ];
    }
    activate(t) {
        var e;
        const i = this.ctn.createChild();
        const {model: s, template: n, rejectOnCancel: r} = t;
        const o = i.get(Sl);
        const l = null !== (e = t.host) && void 0 !== e ? e : this.p.document.body;
        const h = this.dom = o.render(l, t);
        const a = i.has(os, true) ? i.get(os) : null;
        const c = h.contentHost;
        this.settings = t;
        if (null == a || !a.contains(l)) i.register(U.instance(os, l));
        i.register(U.instance(rs, c), U.instance(El, h));
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
                if (r) throw Tl(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return K(null === (o = l.activate) || void 0 === o ? void 0 : o.call(l, s), (() => {
                var e;
                const s = this.controller = Controller.$el(i, l, c, null, CustomElementDefinition.create(null !== (e = this.getDefinition(l)) && void 0 !== e ? e : {
                    name: ni.generateName(),
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
        if (this.ts) return this.ts;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const a = new Promise((a => {
            var c, u;
            a(K(null !== (u = null === (c = r.canDeactivate) || void 0 === c ? void 0 : c.call(r, h)) && void 0 !== u ? u : true, (a => {
                var c;
                if (true !== a) {
                    i = false;
                    this.ts = void 0;
                    if (l) throw Tl(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return K(null === (c = r.deactivate) || void 0 === c ? void 0 : c.call(r, h), (() => K(s.deactivate(s, null, 4), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(null !== o && void 0 !== o ? o : "click", this);
                    if (!l && "error" !== t) this.Pt(h); else this.St(Tl(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.ts = void 0;
            throw t;
        }));
        this.ts = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = Dl(t);
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(rs, new G("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = At(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return ni.isType(e) ? ni.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Tl(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function Dl(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.ft = t;
        this.p = e;
        this.es = i;
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
        return [ W, Yt, Bl ];
    }
    static register(t) {
        t.register(U.singleton(Al, this), ye.beforeDeactivate(Al, (t => K(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return $l(new Promise((e => {
            var i;
            const s = DialogSettings.from(this.es, t);
            const n = null !== (i = s.container) && void 0 !== i ? i : this.ft.createChild();
            e(K(s.load(), (t => {
                const e = n.invoke(DialogController);
                n.register(U.instance(Rl, e));
                n.register(U.callback(DialogController, (() => {
                    throw new Error("AUR0902");
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
        const i = Ol(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).os().ss();
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
    os() {
        if (null == this.component && null == this.template) throw new Error("AUR0903");
        return this;
    }
    ss() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Pl(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function $l(t) {
    t.whenClosed = Pl;
    return t;
}

function Ol(t) {
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
        U.singleton(Bl, this).register(t);
    }
}

const Ll = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Ll} display:flex;`;
        this.overlayCss = Ll;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        U.singleton(Sl, this).register(t);
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

DefaultDialogDomRenderer.inject = [ Yt ];

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

function ql(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, ye.beforeCreate((() => t(i.get(Bl))))),
        customize(t, i) {
            return ql(t, null !== i && void 0 !== i ? i : e);
        }
    };
}

const Ul = ql((() => {
    throw new Error("AUR0904");
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(U.singleton(Bl, this));
    }
} ]);

const Fl = ql($, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const _l = O.createInterface((t => t.singleton(WcCustomElementRegistry)));

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
            s = ni.isType(e) ? ni.getDefinition(e) : CustomElementDefinition.create(ni.generateName(), e);
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
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(rs, new G("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                ns(this, e.key, n);
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

WcCustomElementRegistry.inject = [ W, Yt, $i ];

export { AdoptedStyleSheetsStyles, AppRoot, ye as AppTask, Xt as AtPrefixedTriggerAttributePattern, no as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, zo as AttrBindingBehaviorRegistration, Sn as AttrBindingCommand, Co as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, fl as AttributeBindingRendererRegistration, AttributeNSAccessor, Wt as AttributePattern, AuCompose, AuRender, Ko as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, It as Bindable, BindableDefinition, BindableObserver, BindablesInfo, vn as BindingCommand, BindingCommandDefinition, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, yn as CallBindingCommand, uo as CallBindingCommandRegistration, CallBindingInstruction, el as CallBindingRendererRegistration, Rn as CaptureBindingCommand, ko as CaptureBindingCommandRegistration, Br as Case, CheckedObserver, Se as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, Bn as ClassBindingCommand, Ao as ClassBindingCommandRegistration, Gt as ColonPrefixedBindAttributePattern, ro as ColonPrefixedBindAttributePatternRegistration, cn as CommandType, ComputedWatcher, Controller, Fe as CustomAttribute, CustomAttributeDefinition, il as CustomAttributeRendererRegistration, ni as CustomElement, CustomElementDefinition, sl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Gr as DebounceBindingBehaviorRegistration, xn as DefaultBindingCommand, fo as DefaultBindingCommandRegistration, Eo as DefaultBindingLanguage, ao as DefaultBindingSyntax, Ir as DefaultCase, io as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, bl as DefaultRenderers, tl as DefaultResources, Cl as DefinitionType, An as DelegateBindingCommand, yo as DelegateBindingCommandRegistration, DialogCloseResult, Ul as DialogConfiguration, DialogController, Il as DialogDeactivationStatuses, Fl as DialogDefaultConfiguration, DialogOpenResult, DialogService, Ht as DotSeparatedAttributePattern, lo as DotSeparatedAttributePatternRegistration, Else, $o as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, Focus, kn as ForBindingCommand, mo as ForBindingCommandRegistration, FragmentNodeSequence, FrequentMutations, FromViewBindingBehavior, Yr as FromViewBindingBehaviorRegistration, wn as FromViewBindingCommand, vo as FromViewBindingCommandRegistration, Pr as FulfilledTemplateController, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, es as IAppRoot, xe as IAppTask, Qt as IAttrMapper, _t as IAttributeParser, Ft as IAttributePattern, ys as IAuSlotsInfo, kl as IAurelia, Ki as IController, Rl as IDialogController, El as IDialogDom, Sl as IDialogDomRenderer, Bl as IDialogGlobalSettings, Al as IDialogService, bs as IEventDelegator, os as IEventTarget, gs as IHistory, Yi as IHydrationContext, Cs as IInstruction, xi as ILifecycleHooks, vs as ILocation, rs as INode, eo as INodeObserverLocatorRegistration, Yt as IPlatform, xs as IProjections, ls as IRenderLocation, Ss as IRenderer, $i as IRendering, Zt as ISVGAnalyzer, Wr as ISanitizer, mi as IShadowDOMGlobalStyles, di as IShadowDOMStyles, Lt as ISyntaxInterpreter, Rs as ITemplateCompiler, Gn as ITemplateCompilerHooks, to as ITemplateCompilerRegistration, Dn as ITemplateElementFactory, Ri as IViewFactory, Pi as IViewLocator, _l as IWcElementRegistry, ms as IWindow, is as IWorkTracker, If, Po as IfRegistration, ks as InstructionType, InterpolationBinding, nl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, rl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, ol as LetElementRendererRegistration, Ci as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, ul as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, hs as NodeType, NoopSVGAnalyzer, ObserveShallow, OneTimeBindingBehavior, Xr as OneTimeBindingBehaviorRegistration, gn as OneTimeBindingCommand, go as OneTimeBindingCommandRegistration, Dr as PendingTemplateController, Portal, Tr as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, ll as PropertyBindingRendererRegistration, zt as RefAttributePattern, oo as RefAttributePatternRegistration, RefBinding, bo as RefBindingCommandRegistration, RefBindingInstruction, hl as RefBindingRendererRegistration, $r as RejectedTemplateController, RenderPlan, Rendering, Repeat, Oo as RepeatRegistration, SVGAnalyzer, so as SVGAnalyzerRegistration, Hr as SanitizeValueConverter, Bo as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Go as SelfBindingBehaviorRegistration, SetAttributeInstruction, dl as SetAttributeRendererRegistration, SetClassAttributeInstruction, ml as SetClassAttributeRendererRegistration, SetPropertyInstruction, al as SetPropertyRendererRegistration, SetStyleAttributeInstruction, vl as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, co as ShortHandBindingSyntax, SignalBindingBehavior, Zr as SignalBindingBehaviorRegistration, xl as StandardConfiguration, StyleAttributeAccessor, En as StyleBindingCommand, Ro as StyleBindingCommandRegistration, vi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, gl as StylePropertyBindingRendererRegistration, Er as Switch, TemplateCompiler, Yn as TemplateCompilerHooks, cl as TemplateControllerRendererRegistration, TextBindingInstruction, pl as TextBindingRendererRegistration, ThrottleBindingBehavior, Jr as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, Kr as ToViewBindingBehaviorRegistration, pn as ToViewBindingCommand, po as ToViewBindingCommandRegistration, Cn as TriggerBindingCommand, xo as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Qr as TwoWayBindingBehaviorRegistration, bn as TwoWayBindingCommand, wo as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, Xo as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, ViewFactory, ViewLocator, zi as ViewModelKind, zr as ViewValueConverter, Io as ViewValueConverterRegistration, Ti as Views, je as Watch, WcCustomElementRegistry, With, Lo as WithRegistration, $n as allResources, Mt as attributePattern, St as bindable, un as bindingCommand, Ce as children, Tt as coercer, He as containerless, fs as convertToRenderLocation, Fr as createElement, ci as cssModules, $e as customAttribute, Ne as customElement, cs as getEffectiveParentNode, ss as getRef, Ni as isCustomElementController, Wi as isCustomElementViewModel, As as isInstruction, ds as isRenderLocation, Ai as lifecycleHooks, oi as processContent, Es as renderer, us as setEffectiveParentNode, ns as setRef, ui as shadowCSS, Zn as templateCompilerHooks, Oe as templateController, We as useShadowDOM, Di as view, _e as watch };
//# sourceMappingURL=index.mjs.map
