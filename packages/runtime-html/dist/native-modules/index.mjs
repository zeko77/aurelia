import { subscriberCollection as t, withFlushQueue as e, connectable as i, ConnectableSwitcher as s, ProxyObservable as n, Scope as r, ICoercionConfiguration as o, IObserverLocator as l, IExpressionParser as h, AccessScopeExpression as c, DelegationStrategy as a, BindingBehaviorExpression as u, PrimitiveLiteralExpression as f, ISignaler as d, PropertyAccessor as m, INodeObserverLocator as g, SetterObserver as p, IDirtyChecker as v, applyMutationsToIndices as w, getCollectionObserver as b, synchronizeIndices as x, BindingContext as y } from "../../../runtime/dist/native-modules/index.mjs";

export { LifecycleFlags } from "../../../runtime/dist/native-modules/index.mjs";

import { Protocol as k, getPrototypeChain as C, firstDefined as A, kebabCase as R, noop as B, Registration as S, DI as E, emptyArray as I, all as T, IPlatform as D, mergeArrays as $, fromAnnotationOrDefinitionOrTypeOrDefault as P, fromDefinitionOrDefault as O, pascalCase as L, fromAnnotationOrTypeOrDefault as U, IContainer as q, nextId as j, optional as V, InstanceProvider as F, resolveAll as _, ILogger as M, onResolve as N, camelCase as W, toArray as H, emptyObject as z, IServiceLocator as G, transient as X } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as K, isObject as Y } from "../../../metadata/dist/native-modules/index.mjs";

import { TaskAbortError as Z } from "../../../platform/dist/native-modules/index.mjs";

import { BrowserPlatform as J } from "../../../platform-browser/dist/native-modules/index.mjs";

function Q(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function tt(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

var et;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(et || (et = {}));

const it = K.getOwn;

const st = K.hasOwn;

const nt = K.define;

const {annotation: rt, resource: ot} = k;

const lt = rt.keyFor;

const ht = ot.keyFor;

const ct = ot.appendTo;

const at = rt.appendTo;

const ut = rt.getKeys;

const ft = () => Object.create(null);

const dt = Object.prototype.hasOwnProperty;

const mt = ft();

const gt = (t, e, i) => {
    if (true === mt[e]) return true;
    if (!bt(e)) return false;
    const s = e.slice(0, 5);
    return mt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const pt = t => t instanceof Promise;

const vt = t => t instanceof Array;

const wt = t => "function" === typeof t;

const bt = t => "string" === typeof t;

const xt = Object.defineProperty;

const yt = t => {
    throw t;
};

const kt = Reflect.defineProperty;

const Ct = (t, e, i) => {
    kt(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function At(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt(Bt, BindableDefinition.create(e, t, i), t.constructor, e);
        at(t.constructor, St.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (bt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Rt(t) {
    return t.startsWith(Bt);
}

const Bt = lt("bindable");

const St = Object.freeze({
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
                if (bt(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!st(Bt, t, n)) at(t, St.keyFrom(n));
                nt(Bt, e, t, n);
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
        const s = C(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        let c;
        while (--n >= 0) {
            h = s[n];
            o = ut(h).filter(Rt);
            l = o.length;
            for (c = 0; c < l; ++c) i[r++] = it(Bt, h, o[c].slice(e));
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
    static create(t, e, i = {}) {
        return new BindableDefinition(A(i.attribute, R(t)), A(i.callback, `${t}Changed`), A(i.mode, et.toView), A(i.primary, false), A(i.property, t), A(i.set, Tt(t, e, i)));
    }
}

function Et(t, e, i) {
    It.define(t, e);
}

const It = {
    key: lt("coercer"),
    define(t, e) {
        nt(It.key, t[e].bind(t), t);
    },
    for(t) {
        return it(It.key, t);
    }
};

function Tt(t, e, i = {}) {
    const s = i.type ?? Reflect.getMetadata("design:type", e, t) ?? null;
    if (null == s) return B;
    let n;
    switch (s) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        n = s;
        break;

      default:
        {
            const t = s.coerce;
            n = "function" === typeof t ? t.bind(s) : It.for(s) ?? B;
            break;
        }
    }
    return n === B ? n : Dt(n, i.nullable);
}

function Dt(t, e) {
    return function(i, s) {
        if (!s?.enableCoercion) return i;
        return (e ?? (s?.coerceNullish ?? false ? false : true)) && null == i ? i : t(i, s);
    };
}

class BindableObserver {
    constructor(t, e, i, s, n, r) {
        this.set = s;
        this.$controller = n;
        this.t = r;
        this.v = void 0;
        this.ov = void 0;
        const o = t[i];
        const l = t.propertyChanged;
        const h = this.i = wt(o);
        const c = this.u = wt(l);
        const a = this.hs = s !== B;
        let u;
        this.o = t;
        this.k = e;
        this.cb = h ? o : B;
        this.C = c ? l : B;
        if (void 0 === this.cb && !c && !a) this.iO = false; else {
            this.iO = true;
            u = t[e];
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
    setValue(t) {
        if (this.hs) t = this.set(t, this.t);
        const e = this.v;
        if (this.iO) {
            if (Object.is(t, e)) return;
            this.v = t;
            this.ov = e;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, e);
                if (this.u) this.C.call(this.o, this.k, t, e);
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
        $t = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, $t);
    }
    A() {
        Reflect.defineProperty(this.o, this.k, {
            enumerable: true,
            configurable: true,
            get: () => this.v,
            set: t => {
                this.setValue(t);
            }
        });
    }
}

t(BindableObserver);

e(BindableObserver);

let $t;

const Pt = function(t) {
    function e(t, i, s) {
        E.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.getAll(t, false);
        return i.has(t, false) ? i.getAll(t, false).concat(i.root.getAll(t, false)) : i.root.getAll(t, false);
    };
    return e;
};

const Ot = S.singleton;

const Lt = S.aliasTo;

const Ut = S.instance;

const qt = S.callback;

const jt = S.transient;

function Vt(...t) {
    return function(e) {
        const i = lt("aliases");
        const s = it(i, e);
        if (void 0 === s) nt(i, t, e); else s.push(...t);
    };
}

function Ft(t, e, i, s) {
    for (let n = 0, r = t.length; n < r; ++n) S.aliasTo(i, e.keyFrom(t[n])).register(s);
}

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
        this.parts = I;
        this.O = "";
        this.L = {};
        this.U = {};
    }
    get pattern() {
        const t = this.O;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.O = "";
            this.parts = I;
        } else {
            this.O = t;
            this.parts = this.U[t];
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
            i = this.U;
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

const _t = E.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        let c = 0;
        let a;
        while (e > c) {
            i = this.rootState;
            s = t[c];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.parse(s, r);
            l = o.length;
            h = t => {
                i = i.append(t, n);
            };
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            i.types = r;
            i.isEndpoint = true;
            ++c;
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
        s = s.filter(Mt);
        if (s.length > 0) {
            s.sort(Nt);
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

function Mt(t) {
    return t.isEndpoint;
}

function Nt(t, e) {
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

const Wt = E.createInterface("IAttributePattern");

const Ht = E.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.q = {};
        this.j = t;
        const i = this.V = {};
        const s = e.reduce(((t, e) => {
            const s = Kt(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), I);
        t.add(s);
    }
    parse(t, e) {
        let i = this.q[t];
        if (null == i) i = this.q[t] = this.j.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.V[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ _t, T(Wt) ];

function zt(...t) {
    return function e(i) {
        return Yt.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        Ot(Wt, this.Type).register(t);
    }
}

const Gt = ht("attribute-pattern");

const Xt = "attribute-pattern-definitions";

const Kt = t => k.annotation.get(t, Xt);

const Yt = Object.freeze({
    name: Gt,
    definitionAnnotationKey: Xt,
    define(t, e) {
        const i = new AttributePatternResourceDefinition(e);
        nt(Gt, i, e);
        ct(e, Gt);
        k.annotation.set(e, Xt, t);
        at(e, Xt);
        return e;
    },
    getPatternDefinitions: Kt
});

let Zt = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

Zt = Q([ zt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], Zt);

let Jt = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

Jt = Q([ zt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], Jt);

let Qt = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

Qt = Q([ zt({
    pattern: ":PART",
    symbols: ":"
}) ], Qt);

let te = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

te = Q([ zt({
    pattern: "@PART",
    symbols: "@"
}) ], te);

let ee = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

ee = Q([ zt({
    pattern: "...$attrs",
    symbols: ""
}) ], ee);

const ie = D;

const se = E.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function ne(t) {
    const e = ft();
    let i;
    for (i of t) e[i] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.F = Object.assign(ft(), {
            a: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: ne([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: ft(),
            altGlyphDef: ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: ft(),
            altGlyphItem: ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: ft(),
            animate: ne([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: ne([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: ne([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: ne([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: ne([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: ne([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": ne([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: ne([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: ne([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: ne([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: ne([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: ne([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: ne([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: ne([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: ne([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: ne([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: ne([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: ne([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: ne([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: ne([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: ne([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: ne([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: ne([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: ne([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: ne([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: ne([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: ne([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: ne([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: ne([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: ne([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: ne([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: ne([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: ne([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: ne([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: ne([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": ne([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": ne([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": ne([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": ne([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: ne([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: ne([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: ne([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: ft(),
            hkern: ne([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: ne([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: ne([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: ne([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: ne([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": ne([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: ne([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: ne([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: ne([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: ne([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: ne([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: ne([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: ne([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: ne([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: ne([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: ne([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: ne([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: ne([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: ne([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: ne([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: ne([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: ne([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: ne([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: ne([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this._ = ne([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.M = ne([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.F;
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
        return Ot(se, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this._[t.nodeName] && true === this.M[e] || true === this.F[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ ie ];

const re = E.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = ft();
        this.W = ft();
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
        return [ se ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.N)[n] ?? (e[n] = ft());
            for (r in i) {
                if (void 0 !== s[r]) throw le(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const i in t) {
            if (void 0 !== e[i]) throw le(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return oe(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.N[t.nodeName]?.[e] ?? this.W[e] ?? (gt(t, e, this.svg) ? e : null);
    }
}

function oe(t, e) {
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

function le(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

var he;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(he || (he = {}));

function ce(t) {
    return function(e) {
        return de.define(t, e);
    };
}

class BindingBehaviorDefinition {
    constructor(t, e, i, s, n) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
        this.strategy = n;
    }
    static create(t, e) {
        let i;
        let s;
        if (bt(t)) {
            i = t;
            s = {
                name: i
            };
        } else {
            i = t.name;
            s = t;
        }
        const n = Object.getPrototypeOf(e) === BindingInterceptor;
        return new BindingBehaviorDefinition(e, A(fe(e, "name"), i), $(fe(e, "aliases"), s.aliases, e.aliases), de.keyFrom(i), P("strategy", s, e, (() => n ? 2 : 1)));
    }
    register(t) {
        const {Type: e, key: i, aliases: s, strategy: n} = this;
        switch (n) {
          case 1:
            S.singleton(i, e).register(t);
            break;

          case 2:
            S.instance(i, new BindingBehaviorFactory(t, e)).register(t);
            break;
        }
        S.aliasTo(i, e).register(t);
        Ft(s, de, i, t);
    }
}

class BindingBehaviorFactory {
    constructor(t, e) {
        this.ctn = t;
        this.Type = e;
        this.deps = E.getDependencies(e);
    }
    construct(t, e) {
        const i = this.ctn;
        const s = this.deps;
        switch (s.length) {
          case 0:
            return new this.Type(t, e);

          case 1:
            return new this.Type(i.get(s[0]), t, e);

          case 2:
            return new this.Type(i.get(s[0]), i.get(s[1]), t, e);

          default:
            return new this.Type(...s.map((t => i.get(t))), t, e);
        }
    }
}

class BindingInterceptor {
    constructor(t, e) {
        this.binding = t;
        this.expr = e;
        this.type = "instance";
        this.interceptor = this;
        let i;
        while (t.interceptor !== this) {
            i = t.interceptor;
            t.interceptor = this;
            t = i;
        }
    }
    get(t) {
        return this.binding.get(t);
    }
    getConverter(t) {
        return this.binding.getConverter?.(t);
    }
    getBehavior(t) {
        return this.binding.getBehavior?.(t);
    }
    updateTarget(t) {
        this.binding.updateTarget(t);
    }
    updateSource(t) {
        this.binding.updateSource(t);
    }
    callSource(t) {
        return this.binding.callSource(t);
    }
    handleChange(t, e) {
        this.binding.handleChange(t, e);
    }
    handleCollectionChange(t) {
        this.binding.handleCollectionChange(t);
    }
    observe(t, e) {
        this.binding.observe(t, e);
    }
    observeCollection(t) {
        this.binding.observeCollection(t);
    }
    $bind(t) {
        this.binding.$bind(t);
    }
    $unbind() {
        this.binding.$unbind();
    }
}

const ae = [ "isBound", "$scope", "obs", "ast", "locator", "oL" ];

ae.forEach((t => {
    kt(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const ue = ht("binding-behavior");

const fe = (t, e) => it(lt(e), t);

const de = Object.freeze({
    name: ue,
    keyFrom(t) {
        return `${ue}:${t}`;
    },
    isType(t) {
        return wt(t) && st(ue, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        nt(ue, i, i.Type);
        nt(ue, i, i);
        ct(e, ue);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(ue, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: fe
});

function me(t) {
    return function(e) {
        return ve.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, i, s) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
    }
    static create(t, e) {
        let i;
        let s;
        if (bt(t)) {
            i = t;
            s = {
                name: i
            };
        } else {
            i = t.name;
            s = t;
        }
        return new ValueConverterDefinition(e, A(pe(e, "name"), i), $(pe(e, "aliases"), s.aliases, e.aliases), ve.keyFrom(i));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        S.singleton(i, e).register(t);
        S.aliasTo(i, e).register(t);
        Ft(s, ve, i, t);
    }
}

const ge = ht("value-converter");

const pe = (t, e) => it(lt(e), t);

const ve = Object.freeze({
    name: ge,
    keyFrom: t => `${ge}:${t}`,
    isType(t) {
        return wt(t) && st(ge, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        nt(ge, i, i.Type);
        nt(ge, i, i);
        ct(e, ge);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(ge, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: pe
});

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e) {
        const i = this.b;
        if (t !== i.ast.evaluate(i.$scope, i, null)) i.updateSource(t);
    }
}

function we(t, e = true) {
    return i => {
        const s = i.prototype;
        if (null != t) kt(s, "strict", {
            enumerable: true,
            get: function() {
                return t;
            }
        });
        kt(s, "strictFnCall", {
            enumerable: true,
            get: function() {
                return e;
            }
        });
        Ct(s, "get", (function(t) {
            return this.locator.get(t);
        }));
        Ct(s, "getConverter", (function(t) {
            return this.locator.get(ve.keyFrom(t));
        }));
        Ct(s, "getBehavior", (function(t) {
            return this.locator.get(de.keyFrom(t));
        }));
    };
}

class CallBinding {
    constructor(t, e, i, s, n) {
        this.locator = t;
        this.ast = i;
        this.target = s;
        this.targetProperty = n;
        this.interceptor = this;
        this.isBound = false;
        this.targetObserver = e.getAccessor(s, n);
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const i = this.ast.evaluate(this.$scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        if (this.ast.hasBind) this.ast.bind(t, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        this.targetObserver.setValue(null, this.target, this.targetProperty);
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e) {
        return;
    }
}

we(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.H = false;
        this.o = t;
        this.G = e;
        this.X = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        this.v = t;
        this.H = t !== this.ov;
        this.K();
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
                    if (bt(e) && e.includes("!important")) {
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
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            be(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) xe(this.o, this);
    }
    flush() {
        Ce = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ce);
    }
}

t(AttributeObserver);

e(AttributeObserver);

const be = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(ye)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const xe = (t, e) => {
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

const ye = t => {
    t[0].target.$eMObs.forEach(ke, t);
};

function ke(t) {
    t.handleMutation(this);
}

let Ce;

const {oneTime: Ae, toView: Re, fromView: Be} = et;

const Se = Re | Ae;

const Ee = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, i, s, n, r, o, l, h) {
        this.locator = e;
        this.taskQueue = s;
        this.ast = n;
        this.targetAttribute = o;
        this.targetProperty = l;
        this.mode = h;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = null;
        this.task = null;
        this.targetSubscriber = null;
        this.value = void 0;
        this.Y = t;
        this.target = r;
        this.oL = i;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e) {
        if (!this.isBound) return;
        const i = this.mode;
        const s = this.interceptor;
        const n = this.ast;
        const r = this.$scope;
        const o = this.targetObserver;
        const l = 1 !== this.Y.state && (4 & o.type) > 0;
        let h = false;
        let c;
        if (10082 !== n.$kind || this.obs.count > 1) {
            h = 0 === (i & Ae);
            if (h) this.obs.version++;
            t = n.evaluate(r, this, s);
            if (h) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (l) {
                c = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    s.updateTarget(t);
                }), Ee);
                c?.cancel();
            } else s.updateTarget(t);
        }
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        let e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        let i = this.targetObserver;
        if (!i) i = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        e = this.ast;
        const s = this.mode;
        const n = this.interceptor;
        let r = false;
        if (s & Se) {
            r = (s & Re) > 0;
            n.updateTarget(this.value = e.evaluate(t, this, r ? n : null));
        }
        if (s & Be) i.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n)));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

i(AttributeBinding);

we(true)(AttributeBinding);

const {toView: Ie} = et;

const Te = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.locator = e;
        this.taskQueue = s;
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.Y = t;
        this.oL = i;
        this.targetObserver = i.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, i, this);
    }
    updateTarget(t) {
        const e = this.partBindings;
        const i = this.ast.parts;
        const s = e.length;
        let n = "";
        let r = 0;
        if (1 === s) n = i[0] + e[0].value + i[1]; else {
            n = i[0];
            for (;s > r; ++r) n += e[r].value + i[r + 1];
        }
        const o = this.targetObserver;
        const l = 1 !== this.Y.state && (4 & o.type) > 0;
        let h;
        if (l) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                o.setValue(n, this.target, this.targetProperty);
            }), Te);
            h?.cancel();
            h = null;
        } else o.setValue(n, this.target, this.targetProperty);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.isBound = true;
        this.$scope = t;
        const e = this.partBindings;
        const i = e.length;
        let s = 0;
        for (;i > s; ++s) e[s].$bind(t);
        this.updateTarget(void 0);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const t = this.partBindings;
        const e = t.length;
        let i = 0;
        for (;e > i; ++i) t[i].interceptor.$unbind();
        this.task?.cancel();
        this.task = null;
    }
}

we(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, i, s, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = i;
        this.locator = s;
        this.owner = r;
        this.interceptor = this;
        this.mode = et.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.ast;
        const i = this.obs;
        const s = 10082 === e.$kind && 1 === i.count;
        let n = false;
        if (!s) {
            n = (this.mode & Ie) > 0;
            if (n) i.version++;
            t = e.evaluate(this.$scope, this, n ? this.interceptor : null);
            if (n) i.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t);
        }
    }
    handleCollectionChange(t) {
        this.owner.updateTarget(void 0);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.isBound = true;
        this.$scope = t;
        if (this.ast.hasBind) this.ast.bind(t, this.interceptor);
        this.value = this.ast.evaluate(t, this, (this.mode & Ie) > 0 ? this.interceptor : null);
        if (this.value instanceof Array) this.observeCollection(this.value);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

i(InterpolationPartBinding);

we(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.locator = e;
        this.taskQueue = s;
        this.p = n;
        this.ast = r;
        this.target = o;
        this.strict = l;
        this.interceptor = this;
        this.mode = et.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.Y = t;
        this.oL = i;
    }
    updateTarget(t) {
        const e = this.target;
        const i = this.p.Node;
        const s = this.value;
        this.value = t;
        if (s instanceof i) s.parentNode?.removeChild(s);
        if (t instanceof i) {
            e.textContent = "";
            e.parentNode?.insertBefore(t, e);
        } else e.textContent = String(t);
    }
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.ast;
        const i = this.obs;
        const s = 10082 === e.$kind && 1 === i.count;
        let n = false;
        if (!s) {
            n = (this.mode & Ie) > 0;
            if (n) i.version++;
            t = e.evaluate(this.$scope, this, n ? this.interceptor : null);
            if (n) i.clear();
        }
        if (t === this.value) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const r = 1 !== this.Y.state;
        if (r) this.queueUpdate(t); else this.updateTarget(t);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.value = this.ast.evaluate(this.$scope, this, (this.mode & Ie) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (t instanceof Array) this.observeCollection(t);
        const e = 1 !== this.Y.state;
        if (e) this.queueUpdate(t); else this.updateTarget(t);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.isBound = true;
        this.$scope = t;
        if (this.ast.hasBind) this.ast.bind(t, this.interceptor);
        const e = this.value = this.ast.evaluate(t, this, (this.mode & Ie) > 0 ? this.interceptor : null);
        if (e instanceof Array) this.observeCollection(e);
        this.updateTarget(e);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.task?.cancel();
        this.task = null;
    }
    queueUpdate(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t);
        }), Te);
        e?.cancel();
    }
}

i()(ContentBinding);

we(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, i, s, n = false) {
        this.locator = t;
        this.ast = i;
        this.targetProperty = s;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.target = null;
        this.oL = e;
        this.Z = n;
    }
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.target;
        const i = this.targetProperty;
        const s = e[i];
        this.obs.version++;
        t = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (t !== s) e[i] = t;
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        const t = this.target;
        const e = this.targetProperty;
        const i = t[e];
        this.obs.version++;
        const s = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (s !== i) t[e] = s;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        this.target = this.Z ? t.bindingContext : t.overrideContext;
        const e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        this.target[this.targetProperty] = this.ast.evaluate(t, this, this.interceptor);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        const t = this.ast;
        if (t.hasUnbind) t.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

i(LetBinding);

we(true)(LetBinding);

const {oneTime: De, toView: $e, fromView: Pe} = et;

const Oe = $e | De;

const Le = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.locator = e;
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.targetObserver = void 0;
        this.task = null;
        this.targetSubscriber = null;
        this.Y = t;
        this.J = s;
        this.oL = i;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e) {
        if (!this.isBound) return;
        const i = 1 !== this.Y.state && (4 & this.targetObserver.type) > 0;
        const s = this.obs;
        let n = false;
        if (10082 !== this.ast.$kind || s.count > 1) {
            n = this.mode > De;
            if (n) s.version++;
            t = this.ast.evaluate(this.$scope, this, this.interceptor);
            if (n) s.clear();
        }
        if (i) {
            Ue = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(t);
                this.task = null;
            }), Le);
            Ue?.cancel();
            Ue = null;
        } else this.interceptor.updateTarget(t);
    }
    handleCollectionChange(t) {
        if (!this.isBound) return;
        const e = 1 !== this.Y.state && (4 & this.targetObserver.type) > 0;
        this.obs.version++;
        const i = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (e) {
            Ue = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(i);
                this.task = null;
            }), Le);
            Ue?.cancel();
            Ue = null;
        } else this.interceptor.updateTarget(i);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        let e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        const i = this.oL;
        const s = this.mode;
        let n = this.targetObserver;
        if (!n) {
            if (s & Pe) n = i.getObserver(this.target, this.targetProperty); else n = i.getAccessor(this.target, this.targetProperty);
            this.targetObserver = n;
        }
        e = this.ast;
        const r = this.interceptor;
        const o = (s & $e) > 0;
        if (s & Oe) r.updateTarget(e.evaluate(t, this, o ? r : null));
        if (s & Pe) {
            n.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r)));
            if (!o) r.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        Ue = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != Ue) {
            Ue.cancel();
            Ue = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

i(PropertyBinding);

we(true, false)(PropertyBinding);

let Ue = null;

class RefBinding {
    constructor(t, e, i) {
        this.locator = t;
        this.ast = e;
        this.target = i;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        if (this.ast.hasBind) this.ast.bind(t, this);
        this.ast.assign(this.$scope, this, this.target);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        let t = this.ast;
        if (t.evaluate(this.$scope, this, null) === this.target) t.assign(this.$scope, this, null);
        t = this.ast;
        if (t.hasUnbind) t.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e) {
        return;
    }
}

const qe = E.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(Ut(qe, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const je = Object.freeze({
    creating: Ve("creating"),
    hydrating: Ve("hydrating"),
    hydrated: Ve("hydrated"),
    activating: Ve("activating"),
    activated: Ve("activated"),
    deactivating: Ve("deactivating"),
    deactivated: Ve("deactivated")
});

function Ve(t) {
    function e(e, i) {
        if (wt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Fe(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt(Me, ChildrenDefinition.create(e, i), t.constructor, e);
        at(t.constructor, Ne.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (bt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function _e(t) {
    return t.startsWith(Me);
}

const Me = lt("children-observer");

const Ne = Object.freeze({
    name: Me,
    keyFrom: t => `${Me}:${t}`,
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
        const e = Me.length + 1;
        const i = [];
        const s = C(t);
        let n = s.length;
        let r = 0;
        let o;
        let l;
        let h;
        while (--n >= 0) {
            h = s[n];
            o = ut(h).filter(_e);
            l = o.length;
            for (let t = 0; t < l; ++t) i[r++] = it(Me, h, o[t].slice(e));
        }
        return i;
    }
});

const We = {
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
        return new ChildrenDefinition(A(e.callback, `${t}Changed`), A(e.property, t), e.options ?? We, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = He, r = ze, o = Ge, l) {
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
        if (!this.observing) {
            this.observing = true;
            this.children = this.get();
            (this.observer ?? (this.observer = new this.controller.host.ownerDocument.defaultView.MutationObserver((() => {
                this.tt();
            })))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = I;
        }
    }
    tt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return Ke(this.controller, this.query, this.filter, this.map);
    }
}

t()(ChildrenObserver);

function He(t) {
    return t.host.childNodes;
}

function ze(t, e, i) {
    return !!i;
}

function Ge(t, e, i) {
    return i;
}

const Xe = {
    optional: true
};

function Ke(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Ei(l, Xe);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

function Ye(t) {
    return function(e) {
        return si(t, e);
    };
}

function Ze(t) {
    return function(e) {
        return si(bt(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, i, s, n, r, o, l, h, c) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
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
    static create(t, e) {
        let i;
        let s;
        if (bt(t)) {
            i = t;
            s = {
                name: i
            };
        } else {
            i = t.name;
            s = t;
        }
        return new CustomAttributeDefinition(e, A(ti(e, "name"), i), $(ti(e, "aliases"), s.aliases, e.aliases), Qe(i), A(ti(e, "defaultBindingMode"), s.defaultBindingMode, e.defaultBindingMode, et.toView), A(ti(e, "isTemplateController"), s.isTemplateController, e.isTemplateController, false), St.from(e, ...St.getAll(e), ti(e, "bindables"), e.bindables, s.bindables), A(ti(e, "noMultiBindings"), s.noMultiBindings, e.noMultiBindings, false), $(ci.getAnnotation(e), e.watches), $(ti(e, "dependencies"), s.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        jt(i, e).register(t);
        Lt(i, e).register(t);
        Ft(s, ri, i, t);
    }
}

const Je = ht("custom-attribute");

const Qe = t => `${Je}:${t}`;

const ti = (t, e) => it(lt(e), t);

const ei = t => wt(t) && st(Je, t);

const ii = (t, e) => Ms(t, Qe(e)) ?? void 0;

const si = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    nt(Je, i, i.Type);
    nt(Je, i, i);
    ct(e, Je);
    return i.Type;
};

const ni = t => {
    const e = it(Je, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
    return e;
};

const ri = Object.freeze({
    name: Je,
    keyFrom: Qe,
    isType: ei,
    for: ii,
    define: si,
    getDefinition: ni,
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: ti
});

function oi(t, e) {
    if (null == t) throw new Error(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!wt(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!wt(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        ci.add(l, h);
        if (ei(l)) ni(l).watches.push(h);
        if (Si(l)) Ti(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const li = I;

const hi = lt("watch");

const ci = Object.freeze({
    name: hi,
    add(t, e) {
        let i = it(hi, t);
        if (null == i) nt(hi, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return it(hi, t) ?? li;
    }
});

function ai(t) {
    return function(e) {
        return Bi(t, e);
    };
}

function ui(t) {
    if (void 0 === t) return function(t) {
        Ri(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!wt(t)) return function(e) {
        Ri(e, "shadowOptions", t);
    };
    Ri(t, "shadowOptions", {
        mode: "open"
    });
}

function fi(t) {
    if (void 0 === t) return function(t) {
        di(t);
    };
    di(t);
}

function di(t) {
    const e = it(ki, t);
    if (void 0 === e) {
        Ri(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function mi(t) {
    if (void 0 === t) return function(t) {
        Ri(t, "isStrictBinding", true);
    };
    Ri(t, "isStrictBinding", true);
}

const gi = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, c, a, u, f, d, m, g, p, v, w, b, x) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
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
        this.containerless = m;
        this.isStrictBinding = g;
        this.shadowOptions = p;
        this.hasSlots = v;
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
            if (bt(i)) throw new Error(`AUR0761:${t}`);
            const s = O("name", i, Ai);
            if (wt(i.Type)) e = i.Type; else e = $i(L(s));
            return new CustomElementDefinition(e, s, $(i.aliases), O("key", i, (() => Ci(s))), O("cache", i, vi), O("capture", i, bi), O("template", i, wi), $(i.instructions), $(i.dependencies), O("injectable", i, wi), O("needsCompile", i, xi), $(i.surrogates), St.from(e, i.bindables), Ne.from(i.childrenObservers), O("containerless", i, bi), O("isStrictBinding", i, bi), O("shadowOptions", i, wi), O("hasSlots", i, bi), O("enhance", i, bi), O("watches", i, yi), U("processContent", e, wi));
        }
        if (bt(t)) return new CustomElementDefinition(e, t, $(Ii(e, "aliases"), e.aliases), Ci(t), U("cache", e, vi), U("capture", e, bi), U("template", e, wi), $(Ii(e, "instructions"), e.instructions), $(Ii(e, "dependencies"), e.dependencies), U("injectable", e, wi), U("needsCompile", e, xi), $(Ii(e, "surrogates"), e.surrogates), St.from(e, ...St.getAll(e), Ii(e, "bindables"), e.bindables), Ne.from(...Ne.getAll(e), Ii(e, "childrenObservers"), e.childrenObservers), U("containerless", e, bi), U("isStrictBinding", e, bi), U("shadowOptions", e, wi), U("hasSlots", e, bi), U("enhance", e, bi), $(ci.getAnnotation(e), e.watches), U("processContent", e, wi));
        const i = O("name", t, Ai);
        return new CustomElementDefinition(e, i, $(Ii(e, "aliases"), t.aliases, e.aliases), Ci(i), P("cache", t, e, vi), P("capture", t, e, bi), P("template", t, e, wi), $(Ii(e, "instructions"), t.instructions, e.instructions), $(Ii(e, "dependencies"), t.dependencies, e.dependencies), P("injectable", t, e, wi), P("needsCompile", t, e, xi), $(Ii(e, "surrogates"), t.surrogates, e.surrogates), St.from(e, ...St.getAll(e), Ii(e, "bindables"), e.bindables, t.bindables), Ne.from(...Ne.getAll(e), Ii(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), P("containerless", t, e, bi), P("isStrictBinding", t, e, bi), P("shadowOptions", t, e, wi), P("hasSlots", t, e, bi), P("enhance", t, e, bi), $(t.watches, ci.getAnnotation(e), e.watches), P("processContent", t, e, wi));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (gi.has(t)) return gi.get(t);
        const e = CustomElementDefinition.create(t);
        gi.set(t, e);
        nt(ki, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            jt(i, e).register(t);
            Lt(i, e).register(t);
            Ft(s, Pi, i, t);
        }
    }
}

const pi = {
    name: void 0,
    searchParents: false,
    optional: false
};

const vi = () => 0;

const wi = () => null;

const bi = () => false;

const xi = () => true;

const yi = () => I;

const ki = ht("custom-element");

const Ci = t => `${ki}:${t}`;

const Ai = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Ri = (t, e, i) => {
    nt(lt(e), i, t);
};

const Bi = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    nt(ki, i, i.Type);
    nt(ki, i, i);
    ct(i.Type, ki);
    return i.Type;
};

const Si = t => wt(t) && st(ki, t);

const Ei = (t, e = pi) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = Ms(t, ki);
        if (null === i) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = Ms(t, ki);
            if (null === i) throw new Error(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = Ms(i, ki);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = Ks(i);
        }
        if (s) return;
        throw new Error(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = Ms(i, ki);
        if (null !== t) return t;
        i = Ks(i);
    }
    throw new Error(`AUR0765`);
};

const Ii = (t, e) => it(lt(e), t);

const Ti = t => {
    const e = it(ki, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const Di = () => {
    const t = function(e, i, s) {
        const n = E.getOrCreateAnnotationParamTypes(e);
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
};

const $i = function() {
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
}();

const Pi = Object.freeze({
    name: ki,
    keyFrom: Ci,
    isType: Si,
    for: Ei,
    define: Bi,
    getDefinition: Ti,
    annotate: Ri,
    getAnnotation: Ii,
    generateName: Ai,
    createInjectable: Di,
    generateType: $i
});

const Oi = lt("processContent");

function Li(t) {
    return void 0 === t ? function(t, e, i) {
        nt(Oi, Ui(t, e), t);
    } : function(e) {
        t = Ui(e, t);
        const i = it(ki, e);
        if (void 0 !== i) i.processContent = t; else nt(Oi, t, e);
        return e;
    };
}

function Ui(t, e) {
    if (bt(e)) e = t[e];
    if (!wt(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function qi(t) {
    return function(e) {
        const i = wt(t) ? t : true;
        Ri(e, "capture", i);
        if (Si(e)) Ti(e).capture = i;
    };
}

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.et = {};
        this.it = 0;
        this.H = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t) {
        this.value = t;
        this.H = t !== this.ov;
        this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.et;
            const i = ji(t);
            let s = this.it;
            this.ov = t;
            if (i.length > 0) this.st(i);
            this.it += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!dt.call(e, t) || e[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    st(t) {
        const e = this.obj;
        const i = t.length;
        let s = 0;
        let n;
        for (;s < i; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.et[n] = this.it;
            e.classList.add(n);
        }
    }
}

function ji(t) {
    if (bt(t)) return Vi(t);
    if ("object" !== typeof t) return I;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...ji(t[s]));
            return i;
        } else return I;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...Vi(i)); else e.push(i);
    return e;
}

function Vi(t) {
    const e = t.match(/\S+/g);
    if (null === e) return I;
    return e;
}

function Fi(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = si({
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
                this.element.className = ji(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ Ws ], e));
        t.register(s);
    }
}

function _i(...t) {
    return new ShadowDOMRegistry(t);
}

const Mi = E.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(ie))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Wi);
        const i = t.get(Mi);
        t.register(Ut(Ni, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ ie ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ ie ];

const Ni = E.createInterface("IShadowDOMStyles");

const Wi = E.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: B
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

const Hi = {
    shadowDOM(t) {
        return je.creating(q, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(Mi);
                e.register(Ut(Wi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: zi, exit: Gi} = s;

const {wrap: Xi, unwrap: Ki} = n;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.$get = i;
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
            zi(this);
            return this.value = Ki(this.$get.call(void 0, this.useProxy ? Xi(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Gi(this);
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
            t = e.evaluate(this.scope, this, this);
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
        this.value = this.expression.evaluate(this.scope, this, this);
        this.obs.clear();
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
        this.value = void 0;
    }
}

i(ComputedWatcher);

we(true)(ComputedWatcher);

i(ExpressionWatcher);

we(true)(ExpressionWatcher);

const Yi = E.createInterface("ILifecycleHooks");

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
        Ot(Yi, this.Type).register(t);
    }
}

const Zi = new WeakMap;

const Ji = lt("lifecycle-hooks");

const Qi = Object.freeze({
    name: Ji,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        nt(Ji, i, e);
        ct(e, Ji);
        return i.Type;
    },
    resolve(t) {
        let e = Zi.get(t);
        if (void 0 === e) {
            Zi.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Yi) : t.has(Yi, false) ? i.getAll(Yi).concat(t.getAll(Yi)) : i.getAll(Yi);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = it(Ji, n.constructor);
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

function ts() {
    return function t(e) {
        return Qi.define({}, e);
    };
}

const es = E.createInterface("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (bt(t)) t = parseInt(t, 10);
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

const is = new WeakSet;

function ss(t) {
    return !is.has(t);
}

function ns(t) {
    is.add(t);
    return CustomElementDefinition.create(t);
}

const rs = ht("views");

const os = Object.freeze({
    name: rs,
    has(t) {
        return wt(t) && (st(rs, t) || "$views" in t);
    },
    get(t) {
        if (wt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(ss).map(ns);
            for (const e of i) os.add(t, e);
        }
        let e = it(rs, t);
        if (void 0 === e) nt(rs, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = it(rs, t);
        if (void 0 === s) nt(rs, s = [ i ], t); else s.push(i);
        return s;
    }
});

function ls(t) {
    return function(e) {
        os.add(e, t);
    };
}

const hs = E.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = os.has(t.constructor) ? os.get(t.constructor) : [];
            const s = wt(e) ? e(t, i) : this.ot(i, e);
            return this.lt(t, i, s);
        }
        return null;
    }
    lt(t, e, i) {
        let s = this.nt.get(t);
        let n;
        if (void 0 === s) {
            s = {};
            this.nt.set(t, s);
        } else n = s[i];
        if (void 0 === n) {
            const r = this.ht(t, e, i);
            n = Bi(Ti(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[i] = n;
        }
        return n;
    }
    ht(t, e, i) {
        let s = this.rt.get(t.constructor);
        let n;
        if (void 0 === s) {
            s = {};
            this.rt.set(t.constructor, s);
        } else n = s[i];
        if (void 0 === n) {
            n = Bi(this.ct(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const s = this.viewModel;
                    t.scope = r.fromParent(t.scope, s);
                    if (void 0 !== s.define) return s.define(t, e, i);
                }
            });
            const o = n.prototype;
            if ("hydrating" in t) o.hydrating = function t(e) {
                this.viewModel.hydrating(e);
            };
            if ("hydrated" in t) o.hydrated = function t(e) {
                this.viewModel.hydrated(e);
            };
            if ("created" in t) o.created = function t(e) {
                this.viewModel.created(e);
            };
            if ("binding" in t) o.binding = function t(e, i, s) {
                return this.viewModel.binding(e, i, s);
            };
            if ("bound" in t) o.bound = function t(e, i, s) {
                return this.viewModel.bound(e, i, s);
            };
            if ("attaching" in t) o.attaching = function t(e, i, s) {
                return this.viewModel.attaching(e, i, s);
            };
            if ("attached" in t) o.attached = function t(e, i) {
                return this.viewModel.attached(e, i);
            };
            if ("detaching" in t) o.detaching = function t(e, i, s) {
                return this.viewModel.detaching(e, i, s);
            };
            if ("unbinding" in t) o.unbinding = function t(e, i, s) {
                return this.viewModel.unbinding(e, i, s);
            };
            if ("dispose" in t) o.dispose = function t() {
                this.viewModel.dispose();
            };
            s[i] = n;
        }
        return n;
    }
    ot(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    ct(t, e) {
        const i = t.find((t => t.name === e));
        if (void 0 === i) throw new Error(`Could not find view: ${e}`);
        return i;
    }
}

const cs = E.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.dt = (this.gt = t.root).get(ie);
        this.vt = new FragmentNodeSequence(this.dt, this.dt.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.gt.getAll(fn, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), ft()) : this.rs;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ut;
            const n = e.get(un);
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
        if (true === t.enhance) return new FragmentNodeSequence(this.dt, t.template);
        let e;
        const i = this.ft;
        if (i.has(t)) e = i.get(t); else {
            const s = this.dt;
            const n = s.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof s.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (bt(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            i.set(t, e);
        }
        return null == e ? this.vt : new FragmentNodeSequence(this.dt, e.cloneNode(true));
    }
    render(t, e, i, s) {
        const n = i.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw new Error(`AUR0757:${o}<>${n.length}`);
        let l = 0;
        let h = 0;
        let c = 0;
        let a;
        let u;
        let f;
        if (o > 0) while (o > l) {
            a = n[l];
            f = e[l];
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
            a = i.surrogates;
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

Rendering.inject = [ q ];

var as;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(as || (as = {}));

const us = {
    optional: true
};

const fs = new WeakMap;

class Controller {
    constructor(t, e, i, s, n, r, o) {
        this.container = t;
        this.vmKind = e;
        this.definition = i;
        this.viewFactory = s;
        this.viewModel = n;
        this.host = r;
        this.id = j("au$component");
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
        this.wt = false;
        this.bt = I;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.xt = 0;
        this.yt = 0;
        this.kt = 0;
        this.location = o;
        this.r = t.root.get(cs);
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
            return this.viewFactory.name === this.parent.definition?.name ? `${this.parent.name}[view]` : `${this.parent.name}[view:${this.viewFactory.name}]`;
        }
    }
    static getCached(t) {
        return fs.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (fs.has(e)) return fs.get(e);
        n = n ?? Ti(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(V(Bs));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        t.registerResolver(Bs, new F("IHydrationContext", new HydrationContext(o, s, l)));
        fs.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (fs.has(e)) return fs.get(e);
        s = s ?? ni(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        fs.set(e, n);
        n.Ct();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = e ?? null;
        i.At();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.viewModel;
        let o = this.definition;
        this.scope = r.create(n, null, true);
        if (o.watches.length > 0) ws(this, i, o, n);
        ms(this, o, s, n);
        this.bt = gs(this, o, n);
        if (this.hooks.hasDefine) {
            const t = n.define(this, e, o);
            if (void 0 !== t && t !== o) o = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Qi.resolve(i);
        o.register(i);
        if (null !== o.injectable) i.registerResolver(o.injectable, new F("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(Is, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = Ei(this.host, us))) {
            this.host = this.container.root.get(ie).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Zs(this.host);
        }
        Ns(this.host, ki, this);
        Ns(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw new Error(`AUR0501`);
            Ns(this.shadowRoot = this.host.attachShadow(i ?? ys), ki, this);
            Ns(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Ns(o, ki, this);
            Ns(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(Ts, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Rt, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Es, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    Ct() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) ws(this, this.container, t, e);
        ms(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Qi.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Es, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    At() {
        this.Rt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Rt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Rt)).findTargets(), this.Rt, void 0);
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
            throw new Error(`AUR0503:${this.name} ${As(this.state)}`);
        }
        this.parent = e;
        i |= 1;
        switch (this.vmKind) {
          case 0:
            this.scope.parentScope = s ?? null;
            break;

          case 1:
            this.scope = s ?? null;
            break;

          case 2:
            if (void 0 === s || null === s) throw new Error(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = t;
        this.$flags = i;
        this.Bt();
        let n;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) n = _(...this.lifecycleHooks.binding.map(Ds, this));
        if (this.hooks.hasBinding) n = _(n, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (pt(n)) {
            this.St();
            n.then((() => {
                this.bind();
            })).catch((t => {
                this.Et(t);
            }));
            return this.$promise;
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let t = 0;
        let e = this.bt.length;
        let i;
        if (e > 0) while (e > t) {
            this.bt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            e = this.bindings.length;
            while (e > t) {
                this.bindings[t].$bind(this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = _(...this.lifecycleHooks.bound.map($s, this));
        if (this.hooks.hasBound) i = _(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (pt(i)) {
            this.St();
            i.then((() => {
                this.isBound = true;
                this.It();
            })).catch((t => {
                this.Et(t);
            }));
            return;
        }
        this.isBound = true;
        this.It();
    }
    Tt(...t) {
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
    It() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Tt(this.host);
            break;

          case 3:
            this.hostController.Tt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(Ni, false) ? t.get(Ni) : t.get(Wi);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        let t = 0;
        let e;
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) e = _(...this.lifecycleHooks.attaching.map(Ps, this));
        if (this.hooks.hasAttaching) e = _(e, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (pt(e)) {
            this.St();
            this.Bt();
            e.then((() => {
                this.Dt();
            })).catch((t => {
                this.Et(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.Dt();
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
            throw new Error(`AUR0505:${this.name} ${As(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.$t();
        let s = 0;
        let n;
        if (this.bt.length) for (;s < this.bt.length; ++s) this.bt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) n = _(...this.lifecycleHooks.detaching.map(Ls, this));
        if (this.hooks.hasDetaching) n = _(n, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (pt(n)) {
            this.St();
            t.$t();
            n.then((() => {
                t.Pt();
            })).catch((e => {
                t.Et(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.Pt();
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
        const t = 2 | this.$flags;
        let e = 0;
        if (null !== this.bindings) for (;e < this.bindings.length; ++e) this.bindings[e].$unbind();
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
        if (4 === (4 & t) && this.$initiator === this) this.dispose();
        this.state = 32 & this.state | 8;
        this.$initiator = null;
        this.Ot();
    }
    St() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.St();
        }
    }
    Ot() {
        if (void 0 !== this.$promise) {
            qs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            qs();
            qs = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            js = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            js(t);
            js = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    Bt() {
        ++this.xt;
        if (this.$initiator !== this) this.parent.Bt();
    }
    Dt() {
        if (0 === --this.xt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Vs = _(...this.lifecycleHooks.attached.map(Os, this));
            if (this.hooks.hasAttached) Vs = _(Vs, this.viewModel.attached(this.$initiator, this.$flags));
            if (pt(Vs)) {
                this.St();
                Vs.then((() => {
                    this.state = 2;
                    this.Ot();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                Vs = void 0;
                return;
            }
            Vs = void 0;
            this.state = 2;
            this.Ot();
        }
        if (this.$initiator !== this) this.parent.Dt();
    }
    $t() {
        ++this.yt;
    }
    Pt() {
        if (0 === --this.yt) {
            this.Lt();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) e = _(...t.lifecycleHooks.unbinding.map(Us, this));
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = _(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (pt(e)) {
                    this.St();
                    this.Lt();
                    e.then((() => {
                        this.Ut();
                    })).catch((t => {
                        this.Et(t);
                    }));
                }
                e = void 0;
                t = t.next;
            }
            this.Ut();
        }
    }
    Lt() {
        ++this.kt;
    }
    Ut() {
        if (0 === --this.kt) {
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
            return ni(this.viewModel.constructor).name === t;

          case 0:
            return Ti(this.viewModel.constructor).name === t;

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
            Ns(t, ki, this);
            Ns(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Ns(t, ki, this);
            Ns(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Ns(t, ki, this);
            Ns(t, this.definition.key, this);
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
            this.children.forEach(Ss);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            fs.delete(this.viewModel);
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

function ds(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function ms(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const l = r.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const c = ds(s);
        const a = t.container;
        const u = a.has(o, true) ? a.get(o) : null;
        for (;h < l; ++h) {
            e = r[h];
            if (void 0 === c[e]) {
                i = n[e];
                c[e] = new BindableObserver(s, e, i.callback, i.set, t, u);
            }
        }
    }
}

function gs(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = ds(i);
        const o = [];
        let l;
        let h = 0;
        let c;
        for (;h < r; ++h) {
            l = n[h];
            if (null == e[l]) {
                c = s[l];
                o[o.length] = e[l] = new ChildrenObserver(t, i, l, c.callback, c.query, c.filter, c.map, c.options);
            }
        }
        return o;
    }
    return I;
}

const ps = new Map;

const vs = t => {
    let e = ps.get(t);
    if (null == e) {
        e = new c(t, 0);
        ps.set(t, e);
    }
    return e;
};

function ws(t, e, i, s) {
    const n = e.get(l);
    const o = e.get(h);
    const c = i.watches;
    const a = 0 === t.vmKind ? t.scope : r.create(s, null, true);
    const u = c.length;
    let f;
    let d;
    let m;
    let g = 0;
    for (;u > g; ++g) {
        ({expression: f, callback: d} = c[g]);
        d = wt(d) ? d : Reflect.get(s, d);
        if (!wt(d)) throw new Error(`AUR0506:${String(d)}`);
        if (wt(f)) t.addBinding(new ComputedWatcher(s, n, f, d, true)); else {
            m = bt(f) ? o.parse(f, 8) : vs(f);
            t.addBinding(new ExpressionWatcher(a, e, n, m, d));
        }
    }
}

function bs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function xs(t) {
    return Y(t) && Si(t.constructor);
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

const ys = {
    mode: "open"
};

var ks;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(ks || (ks = {}));

var Cs;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Cs || (Cs = {}));

function As(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Rs = E.createInterface("IController");

const Bs = E.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function Ss(t) {
    t.dispose();
}

function Es(t) {
    t.instance.created(this.viewModel, this);
}

function Is(t) {
    t.instance.hydrating(this.viewModel, this);
}

function Ts(t) {
    t.instance.hydrated(this.viewModel, this);
}

function Ds(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function $s(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ps(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Os(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function Ls(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Us(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let qs;

let js;

let Vs;

const Fs = E.createInterface("IAppRoot");

const _s = E.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.qt = 0;
        this.jt = null;
        this.Ot = null;
        this.Vt = t.scopeTo("WorkTracker");
    }
    start() {
        this.Vt.trace(`start(stack:${this.qt})`);
        ++this.qt;
    }
    finish() {
        this.Vt.trace(`finish(stack:${this.qt})`);
        if (0 === --this.qt) {
            const t = this.Ot;
            if (null !== t) {
                this.Ot = this.jt = null;
                t();
            }
        }
    }
    wait() {
        this.Vt.trace(`wait(stack:${this.qt})`);
        if (null === this.jt) {
            if (0 === this.qt) return Promise.resolve();
            this.jt = new Promise((t => {
                this.Ot = t;
            }));
        }
        return this.jt;
    }
}

WorkTracker.inject = [ M ];

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.Ft = void 0;
        this.host = t.host;
        this.work = i.get(_s);
        s.prepare(this);
        i.registerResolver(e.HTMLElement, i.registerResolver(e.Element, i.registerResolver(Ws, new F("ElementResolver", t.host))));
        this.Ft = N(this._t("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (Si(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return N(this._t("hydrating"), (() => {
                o.hS(null);
                return N(this._t("hydrated"), (() => {
                    o.hC();
                    this.Ft = void 0;
                }));
            }));
        }));
    }
    activate() {
        return N(this.Ft, (() => N(this._t("activating"), (() => N(this.controller.activate(this.controller, null, 1, void 0), (() => this._t("activated")))))));
    }
    deactivate() {
        return N(this._t("deactivating"), (() => N(this.controller.deactivate(this.controller, null, 0), (() => this._t("deactivated")))));
    }
    _t(t) {
        return _(...this.container.getAll(qe).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function Ms(t, e) {
    return t.$au?.[e] ?? null;
}

function Ns(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const Ws = E.createInterface("INode");

const Hs = E.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Fs, true)) return t.get(Fs).host;
    return t.get(ie).document;
}))));

const zs = E.createInterface("IRenderLocation");

var Gs;

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
})(Gs || (Gs = {}));

const Xs = new WeakMap;

function Ks(t) {
    if (Xs.has(t)) return Xs.get(t);
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
        const e = Ei(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Ks(e.host);
    }
    return t.parentNode;
}

function Ys(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) Xs.set(i[t], e);
    } else Xs.set(t, e);
}

function Zs(t) {
    if (Js(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function Js(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Zs(r); else o[s] = r;
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
        if (Js(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Qs = E.createInterface("IWindow", (t => t.callback((t => t.get(ie).window))));

const tn = E.createInterface("ILocation", (t => t.callback((t => t.get(Qs).location))));

const en = E.createInterface("IHistory", (t => t.callback((t => t.get(Qs).history))));

const sn = {
    [a.capturing]: {
        capture: true
    },
    [a.bubbling]: {
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
    constructor(t, e, i, s, n, r) {
        this.locator = t;
        this.ast = e;
        this.target = i;
        this.targetEvent = s;
        this.eventDelegator = n;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
        this.Mt = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let i = this.ast.evaluate(this.$scope, this, null);
        delete e.$event;
        if (this.Mt.expAsHandler) {
            if (!wt(i)) throw new Error(`Handler of "${this.targetEvent}" event is not a function.`);
            i = i(t);
        }
        if (true !== i && this.Mt.prevent) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        const e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        if (this.Mt.strategy === a.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Hs), this.target, this.targetEvent, this, sn[this.Mt.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = null;
        if (this.Mt.strategy === a.none) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e) {
        return;
    }
}

we(true, true)(Listener);

const nn = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = nn) {
        this.Nt = t;
        this.Wt = e;
        this.Mt = i;
        this.Ht = 0;
        this.zt = new Map;
        this.Gt = new Map;
    }
    Xt() {
        if (1 === ++this.Ht) this.Nt.addEventListener(this.Wt, this, this.Mt);
    }
    Kt() {
        if (0 === --this.Ht) this.Nt.removeEventListener(this.Wt, this, this.Mt);
    }
    dispose() {
        if (this.Ht > 0) {
            this.Ht = 0;
            this.Nt.removeEventListener(this.Wt, this, this.Mt);
        }
        this.zt.clear();
        this.Gt.clear();
    }
    Yt(t) {
        const e = true === this.Mt.capture ? this.zt : this.Gt;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = ft());
        return i;
    }
    handleEvent(t) {
        const e = true === this.Mt.capture ? this.zt : this.Gt;
        const i = t.composedPath();
        if (true === this.Mt.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.Wt];
            if (void 0 === n) continue;
            if (wt(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, i, s) {
        this.Zt = t;
        this.Jt = e;
        this.Wt = i;
        t.Xt();
        e[i] = s;
    }
    dispose() {
        this.Zt.Kt();
        this.Jt[this.Wt] = void 0;
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

const rn = E.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Qt = ft();
    }
    addEventListener(t, e, i, s, n) {
        var r;
        const o = (r = this.Qt)[i] ?? (r[i] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, i, n));
        return new DelegateSubscription(l, l.Yt(e), i, s);
    }
    dispose() {
        for (const t in this.Qt) {
            const e = this.Qt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const on = E.createInterface("IProjections");

const ln = E.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var hn;

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
})(hn || (hn = {}));

const cn = E.createInterface("Instruction");

function an(t) {
    const e = t.type;
    return bt(e) && 2 === e.length;
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

const un = E.createInterface("ITemplateCompiler");

const fn = E.createInterface("IRenderer");

function dn(t) {
    return function e(i) {
        i.register = function(t) {
            Ot(fn, this).register(t);
        };
        xt(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function mn(t, e, i) {
    if (bt(e)) return t.parse(e, i);
    return e;
}

function gn(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function pn(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Ei(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return Ei(t).viewModel;

      default:
        {
            const i = ii(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = Ei(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let vn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = gn(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

vn = Q([ dn("re") ], vn);

let wn = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ cs, ie ];
    }
    render(t, e, i) {
        let s;
        let n;
        let r;
        let o;
        const l = i.res;
        const h = i.projections;
        const c = t.container;
        switch (typeof l) {
          case "string":
            s = c.find(Pi, l);
            if (null == s) throw new Error(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Zs(e) : null;
        const f = Hn(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        f.registerResolver(n, new F(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        Ns(e, s.key, o);
        const d = this.r.renderers;
        const m = i.props;
        const g = m.length;
        let p = 0;
        let v;
        while (g > p) {
            v = m[p];
            d[v.type].render(t, o, v);
            ++p;
        }
        t.addChild(o);
    }
};

wn = Q([ dn("ra") ], wn);

let bn = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ cs, ie ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(ri, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = zn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Ns(e, n.key, o);
        const l = this.r.renderers;
        const h = i.props;
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

bn = Q([ dn("rb") ], bn);

let xn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ cs, ie ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(ri, i.res);
            if (null == n) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Zs(e);
        const l = zn(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Ns(o, n.key, h);
        l.vm.link?.(t, h, e, i);
        const c = this.r.renderers;
        const a = i.props;
        const u = a.length;
        let f = 0;
        let d;
        while (u > f) {
            d = a[f];
            c[d.type].render(t, h, d);
            ++f;
        }
        t.addChild(h);
    }
};

xn = Q([ dn("rc") ], xn);

let yn = class LetElementRenderer {
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
        let c;
        let a = 0;
        while (o > a) {
            l = s[a];
            h = mn(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(38963 === h.$kind ? In(c, h, r) : c);
            ++a;
        }
    }
};

yn.inject = [ h, l ];

yn = Q([ dn("rd") ], yn);

let kn = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, s, gn(e), i.to);
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

kn.inject = [ h, l ];

kn = Q([ dn("rh") ], kn);

let Cn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8);
        const n = new RefBinding(t.container, s, pn(e, i.to));
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

Cn.inject = [ h ];

Cn = Q([ dn("rj") ], Cn);

let An = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = mn(this.ep, i.from, 1);
        const r = new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, gn(e), i.to, et.toView);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (38963 === c.ast.$kind) o[h] = In(c, c.ast, s);
        }
        t.addBinding(r);
    }
};

An.inject = [ h, l, ie ];

An = Q([ dn("rf") ], An);

let Rn = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, gn(e), i.to, i.mode);
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

Rn.inject = [ h, l, ie ];

Rn = Q([ dn("rg") ], Rn);

let Bn = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, gn(e), i.to, et.toView);
        t.addBinding(38963 === s.iterable.$kind ? In(n, s.iterable, t.container) : n);
    }
};

Bn.inject = [ h, l, ie ];

Bn = Q([ dn("rk") ], Bn);

let Sn = 0;

const En = [];

function In(t, e, i) {
    while (e instanceof u) {
        En[Sn++] = e;
        e = e.expression;
    }
    while (Sn > 0) {
        const e = En[--Sn];
        const s = i.get(de.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    En.length = 0;
    return t;
}

let Tn = class TextBindingRenderer {
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
        const l = mn(this.ep, i.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        let m;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            m = c[u];
            d = new ContentBinding(t, s, this.oL, this.p.domWriteQueue, this.p, m, r.insertBefore(o.createTextNode(""), n), i.strict);
            t.addBinding(38963 === m.$kind ? In(d, m, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Tn.inject = [ h, l, ie ];

Tn = Q([ dn("ha") ], Tn);

const Dn = E.createInterface("IListenerBehaviorOptions", (t => t.singleton(ListenerBehaviorOptions)));

class ListenerBehaviorOptions {
    constructor() {
        this.expAsHandler = false;
    }
}

let $n = class ListenerBindingRenderer {
    constructor(t, e, i, s) {
        this.ep = t;
        this.te = e;
        this.p = i;
        this.ee = s;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 4);
        const n = new Listener(t.container, s, e, i.to, this.te, new ListenerOptions(i.preventDefault, i.strategy, this.ee.expAsHandler));
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

$n.inject = [ h, rn, ie, Dn ];

$n = Q([ dn("hb") ], $n);

let Pn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Pn = Q([ dn("he") ], Pn);

let On = class SetClassAttributeRenderer {
    render(t, e, i) {
        Vn(e.classList, i.value);
    }
};

On = Q([ dn("hf") ], On);

let Ln = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Ln = Q([ dn("hg") ], Ln);

let Un = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, et.toView);
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

Un.inject = [ h, l, ie ];

Un = Q([ dn("hd") ], Un);

let qn = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, et.toView);
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

qn.inject = [ ie, h, l ];

qn = Q([ dn("hc") ], qn);

let jn = class SpreadRenderer {
    constructor(t, e) {
        this.ie = t;
        this.r = e;
    }
    static get inject() {
        return [ un, cs ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(Bs);
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
            const s = o(i);
            const n = Fn(s);
            const h = this.ie.compileSpread(s.controller.definition, s.instruction?.captures ?? I, s.controller.container, e);
            let c;
            for (c of h) switch (c.type) {
              case "hs":
                l(i + 1);
                break;

              case "hp":
                r[c.instructions.type].render(n, Ei(e), c.instructions);
                break;

              default:
                r[c.type].render(n, e, c);
            }
            t.addBinding(n);
        };
        l(0);
    }
};

jn = Q([ dn("hs") ], jn);

class SpreadBinding {
    constructor(t, e) {
        this.se = t;
        this.ne = e;
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
    get state() {
        return this.ctrl.state;
    }
    get(t) {
        return this.locator.get(t);
    }
    $bind(t) {
        if (this.isBound) return;
        this.isBound = true;
        const e = this.$scope = this.ne.controller.scope.parentScope ?? void 0;
        if (null == e) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.se.forEach((t => t.$bind(e)));
    }
    $unbind() {
        this.se.forEach((t => t.$unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.se.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Vn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Fn = t => new SpreadBinding([], t);

const _n = "IController";

const Mn = "IInstruction";

const Nn = "IRenderLocation";

const Wn = "IAuSlotsInfo";

function Hn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    o.registerResolver(t.HTMLElement, o.registerResolver(t.Element, o.registerResolver(Ws, new F("ElementResolver", i))));
    o.registerResolver(Rs, new F(_n, e));
    o.registerResolver(cn, new F(Mn, s));
    o.registerResolver(zs, null == n ? Gn : new RenderLocationProvider(n));
    o.registerResolver(es, Xn);
    o.registerResolver(ln, null == r ? Kn : new F(Wn, r));
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
        if (!bt(t.name) || 0 === t.name.length) throw new Error(`AUR0756`);
        return t;
    }
}

function zn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    h.registerResolver(t.HTMLElement, h.registerResolver(t.Element, h.registerResolver(Ws, new F("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    h.registerResolver(Rs, new F(_n, i));
    h.registerResolver(cn, new F(Mn, n));
    h.registerResolver(zs, null == o ? Gn : new F(Nn, o));
    h.registerResolver(es, null == r ? Xn : new ViewFactoryProvider(r));
    h.registerResolver(ln, null == l ? Kn : new F(Wn, l));
    return {
        vm: h.invoke(e.Type),
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

const Gn = new RenderLocationProvider(null);

const Xn = new ViewFactoryProvider(null);

const Kn = new F(Wn, new AuSlotsInfo(I));

var Yn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Yn || (Yn = {}));

function Zn(t) {
    return function(e) {
        return er.define(t, e);
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
        if (bt(t)) {
            i = t;
            s = {
                name: i
            };
        } else {
            i = t.name;
            s = t;
        }
        return new BindingCommandDefinition(e, A(tr(e, "name"), i), $(tr(e, "aliases"), s.aliases, e.aliases), Qn(i), A(tr(e, "type"), s.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ot(i, e).register(t);
        Lt(i, e).register(t);
        Ft(s, er, i, t);
    }
}

const Jn = ht("binding-command");

const Qn = t => `${Jn}:${t}`;

const tr = (t, e) => it(lt(e), t);

const er = Object.freeze({
    name: Jn,
    keyFrom: Qn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        nt(Jn, i, i.Type);
        nt(Jn, i, i);
        ct(e, Jn);
        return i.Type;
    },
    getAnnotation: tr
});

let ir = class OneTimeBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "one-time";
    }
    build(t) {
        const e = t.attr;
        let i = e.target;
        let s = t.attr.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? W(i); else {
            if ("" === s && 1 === t.def.type) s = W(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, et.oneTime);
    }
};

ir.inject = [ re, h ];

ir = Q([ Zn("one-time") ], ir);

let sr = class ToViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "to-view";
    }
    build(t) {
        const e = t.attr;
        let i = e.target;
        let s = t.attr.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? W(i); else {
            if ("" === s && 1 === t.def.type) s = W(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, et.toView);
    }
};

sr.inject = [ re, h ];

sr = Q([ Zn("to-view") ], sr);

let nr = class FromViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "from-view";
    }
    build(t) {
        const e = t.attr;
        let i = e.target;
        let s = e.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? W(i); else {
            if ("" === s && 1 === t.def.type) s = W(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, et.fromView);
    }
};

nr.inject = [ re, h ];

nr = Q([ Zn("from-view") ], nr);

let rr = class TwoWayBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "two-way";
    }
    build(t) {
        const e = t.attr;
        let i = e.target;
        let s = e.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? W(i); else {
            if ("" === s && 1 === t.def.type) s = W(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, et.twoWay);
    }
};

rr.inject = [ re, h ];

rr = Q([ Zn("two-way") ], rr);

let or = class DefaultBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "bind";
    }
    build(t) {
        const e = t.attr;
        const i = t.bindable;
        let s;
        let n;
        let r = e.target;
        let o = e.rawValue;
        if (null == i) {
            n = this.m.isTwoWay(t.node, r) ? et.twoWay : et.toView;
            r = this.m.map(t.node, r) ?? W(r);
        } else {
            if ("" === o && 1 === t.def.type) o = W(r);
            s = t.def.defaultBindingMode;
            n = i.mode === et.default || null == i.mode ? null == s || s === et.default ? et.toView : s : i.mode;
            r = i.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, n);
    }
};

or.inject = [ re, h ];

or = Q([ Zn("bind") ], or);

let lr = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(t) {
        const e = null === t.bindable ? W(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(this.ep.parse(t.attr.rawValue, 8 | 4), e);
    }
};

lr.inject = [ h ];

lr = Q([ Zn("call") ], lr);

let hr = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(t) {
        const e = null === t.bindable ? W(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(t.attr.rawValue, 2), e);
    }
};

hr.inject = [ h ];

hr = Q([ Zn("for") ], hr);

let cr = class TriggerBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "trigger";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, true, a.none);
    }
};

cr.inject = [ h ];

cr = Q([ Zn("trigger") ], cr);

let ar = class DelegateBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "delegate";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, a.bubbling);
    }
};

ar.inject = [ h ];

ar = Q([ Zn("delegate") ], ar);

let ur = class CaptureBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "capture";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, a.capturing);
    }
};

ur.inject = [ h ];

ur = Q([ Zn("capture") ], ur);

let fr = class AttrBindingCommand {
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

fr.inject = [ h ];

fr = Q([ Zn("attr") ], fr);

let dr = class StyleBindingCommand {
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

dr.inject = [ h ];

dr = Q([ Zn("style") ], dr);

let mr = class ClassBindingCommand {
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

mr.inject = [ h ];

mr = Q([ Zn("class") ], mr);

let gr = class RefBindingCommand {
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

gr.inject = [ h ];

gr = Q([ Zn("ref") ], gr);

let pr = class SpreadBindingCommand {
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

pr = Q([ Zn("...$attrs") ], pr);

const vr = E.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const wr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.re = t.document.createElement("template");
    }
    createTemplate(t) {
        if (bt(t)) {
            let e = wr[t];
            if (void 0 === e) {
                const i = this.re;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.re = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                wr[t] = e;
            }
            return e.cloneNode(true);
        }
        if ("TEMPLATE" !== t.nodeName) {
            const e = this.p.document.createElement("template");
            e.content.appendChild(t);
            return e;
        }
        t.parentNode?.removeChild(t);
        return t.cloneNode(true);
    }
}

TemplateElementFactory.inject = [ ie ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Ot(un, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = yr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = bt(s.template) || !t.enhance ? n.oe.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const l = o ? r.content : r;
        const h = e.get(Pt($r));
        const c = h.length;
        let a = 0;
        if (c > 0) while (c > a) {
            h[a].compiling?.(r);
            ++a;
        }
        if (r.hasAttribute(Ir)) throw new Error(`AUR0701`);
        this.le(l, n);
        this.he(l, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Ai(),
            dependencies: (t.dependencies ?? I).concat(n.deps ?? I),
            instructions: n.rows,
            surrogates: o ? this.ce(r, n) : I,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, yr, null, null, void 0);
        const r = [];
        const o = n.ae(s.nodeName.toLowerCase());
        const l = null !== o;
        const h = n.ep;
        const c = e.length;
        let a = 0;
        let u;
        let f = null;
        let d;
        let m;
        let g;
        let p;
        let v;
        let w = null;
        let b;
        let x;
        let y;
        let k;
        for (;c > a; ++a) {
            u = e[a];
            y = u.target;
            k = u.rawValue;
            w = n.ue(u);
            if (null !== w && (1 & w.type) > 0) {
                Cr.node = s;
                Cr.attr = u;
                Cr.bindable = null;
                Cr.def = null;
                r.push(w.build(Cr));
                continue;
            }
            f = n.fe(y);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${y}`);
                g = BindablesInfo.from(f, true);
                x = false === f.noMultiBindings && null === w && br(k);
                if (x) m = this.de(s, k, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        b = h.parse(k, 1);
                        m = [ null === b ? new SetPropertyInstruction(k, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        Cr.node = s;
                        Cr.attr = u;
                        Cr.bindable = v;
                        Cr.def = f;
                        m = [ w.build(Cr) ];
                    }
                }
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(y) ? y : void 0, m));
                continue;
            }
            if (null === w) {
                b = h.parse(k, 1);
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[y];
                    if (void 0 !== p) {
                        b = h.parse(k, 1);
                        r.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(k, p.property) : new InterpolationInstruction(b, p.property)));
                        continue;
                    }
                }
                if (null != b) r.push(new InterpolationInstruction(b, n.m.map(s, y) ?? W(y))); else switch (y) {
                  case "class":
                    r.push(new SetClassAttributeInstruction(k));
                    break;

                  case "style":
                    r.push(new SetStyleAttributeInstruction(k));
                    break;

                  default:
                    r.push(new SetAttributeInstruction(k, y));
                }
            } else {
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[y];
                    if (void 0 !== p) {
                        Cr.node = s;
                        Cr.attr = u;
                        Cr.bindable = p;
                        Cr.def = o;
                        r.push(new SpreadElementPropBindingInstruction(w.build(Cr)));
                        continue;
                    }
                }
                Cr.node = s;
                Cr.attr = u;
                Cr.bindable = null;
                Cr.def = null;
                r.push(w.build(Cr));
            }
        }
        xr();
        if (null != d) return d.concat(r);
        return r;
    }
    ce(t, e) {
        const i = [];
        const s = t.attributes;
        const n = e.ep;
        let r = s.length;
        let o = 0;
        let l;
        let h;
        let c;
        let a;
        let u = null;
        let f;
        let d;
        let m;
        let g;
        let p = null;
        let v;
        let w;
        let b;
        let x;
        for (;r > o; ++o) {
            l = s[o];
            h = l.name;
            c = l.value;
            a = e.me.parse(h, c);
            b = a.target;
            x = a.rawValue;
            if (Ar[b]) throw new Error(`AUR0702:${h}`);
            p = e.ue(a);
            if (null !== p && (1 & p.type) > 0) {
                Cr.node = t;
                Cr.attr = a;
                Cr.bindable = null;
                Cr.def = null;
                i.push(p.build(Cr));
                continue;
            }
            u = e.fe(b);
            if (null !== u) {
                if (u.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && br(x);
                if (w) d = this.de(t, x, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(x, 1);
                        d = [ null === v ? new SetPropertyInstruction(x, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        Cr.node = t;
                        Cr.attr = a;
                        Cr.bindable = g;
                        Cr.def = u;
                        d = [ p.build(Cr) ];
                    }
                }
                t.removeAttribute(h);
                --o;
                --r;
                (f ?? (f = [])).push(new HydrateAttributeInstruction(this.resolveResources ? u : u.name, null != u.aliases && u.aliases.includes(b) ? b : void 0, d));
                continue;
            }
            if (null === p) {
                v = n.parse(x, 1);
                if (null != v) {
                    t.removeAttribute(h);
                    --o;
                    --r;
                    i.push(new InterpolationInstruction(v, e.m.map(t, b) ?? W(b)));
                } else switch (h) {
                  case "class":
                    i.push(new SetClassAttributeInstruction(x));
                    break;

                  case "style":
                    i.push(new SetStyleAttributeInstruction(x));
                    break;

                  default:
                    i.push(new SetAttributeInstruction(x, h));
                }
            } else {
                Cr.node = t;
                Cr.attr = a;
                Cr.bindable = null;
                Cr.def = null;
                i.push(p.build(Cr));
            }
        }
        xr();
        if (null != f) return f.concat(i);
        return i;
    }
    he(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.ge(t, e);

              default:
                return this.pe(t, e);
            }

          case 3:
            return this.ve(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.he(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    ge(t, e) {
        const i = t.attributes;
        const s = i.length;
        const n = [];
        const r = e.ep;
        let o = false;
        let l = 0;
        let h;
        let c;
        let a;
        let u;
        let d;
        let m;
        let g;
        let p;
        for (;s > l; ++l) {
            h = i[l];
            a = h.name;
            u = h.value;
            if ("to-binding-context" === a) {
                o = true;
                continue;
            }
            c = e.me.parse(a, u);
            m = c.target;
            g = c.rawValue;
            d = e.ue(c);
            if (null !== d) switch (d.name) {
              case "to-view":
              case "bind":
                n.push(new LetBindingInstruction(r.parse(g, 8), W(m)));
                continue;

              default:
                throw new Error(`AUR0704:${c.command}`);
            }
            p = r.parse(g, 1);
            n.push(new LetBindingInstruction(null === p ? new f(g) : p, W(m)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.we(t).nextSibling;
    }
    pe(t, e) {
        var i, s, n, r;
        const o = t.nextSibling;
        const l = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const h = e.ae(l);
        const c = null !== h;
        const a = c && null != h.shadowOptions;
        const u = h?.capture;
        const f = null != u && "boolean" !== typeof u;
        const d = u ? [] : I;
        const m = e.ep;
        const g = this.debug ? B : () => {
            t.removeAttribute(y);
            --b;
            --w;
        };
        let p = t.attributes;
        let v;
        let w = p.length;
        let b = 0;
        let x;
        let y;
        let k;
        let C;
        let A;
        let R;
        let S = null;
        let E = false;
        let T;
        let D;
        let $;
        let P;
        let O;
        let L;
        let U;
        let q = null;
        let j;
        let V;
        let F;
        let _;
        let M = true;
        let N = false;
        let H = false;
        if ("slot" === l) {
            if (null == e.root.def.shadowOptions) throw new Error(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (c) {
            M = h.processContent?.call(h.Type, t, e.p);
            p = t.attributes;
            w = p.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;w > b; ++b) {
            x = p[b];
            y = x.name;
            k = x.value;
            switch (y) {
              case "as-element":
              case "containerless":
                g();
                if (!N) N = "containerless" === y;
                continue;
            }
            C = e.me.parse(y, k);
            q = e.ue(C);
            F = C.target;
            _ = C.rawValue;
            if (u && (!f || f && u(F))) {
                if (null != q && 1 & q.type) {
                    g();
                    d.push(C);
                    continue;
                }
                H = "au-slot" !== F && "slot" !== F;
                if (H) {
                    j = BindablesInfo.from(h, false);
                    if (null == j.attrs[F] && !e.fe(F)?.isTemplateController) {
                        g();
                        d.push(C);
                        continue;
                    }
                }
            }
            if (null !== q && 1 & q.type) {
                Cr.node = t;
                Cr.attr = C;
                Cr.bindable = null;
                Cr.def = null;
                (A ?? (A = [])).push(q.build(Cr));
                g();
                continue;
            }
            S = e.fe(F);
            if (null !== S) {
                j = BindablesInfo.from(S, true);
                E = false === S.noMultiBindings && null === q && br(_);
                if (E) $ = this.de(t, _, S, e); else {
                    V = j.primary;
                    if (null === q) {
                        L = m.parse(_, 1);
                        $ = [ null === L ? new SetPropertyInstruction(_, V.property) : new InterpolationInstruction(L, V.property) ];
                    } else {
                        Cr.node = t;
                        Cr.attr = C;
                        Cr.bindable = V;
                        Cr.def = S;
                        $ = [ q.build(Cr) ];
                    }
                }
                g();
                if (S.isTemplateController) (P ?? (P = [])).push(new HydrateTemplateController(kr, this.resolveResources ? S : S.name, void 0, $)); else (D ?? (D = [])).push(new HydrateAttributeInstruction(this.resolveResources ? S : S.name, null != S.aliases && S.aliases.includes(F) ? F : void 0, $));
                continue;
            }
            if (null === q) {
                if (c) {
                    j = BindablesInfo.from(h, false);
                    T = j.attrs[F];
                    if (void 0 !== T) {
                        L = m.parse(_, 1);
                        (R ?? (R = [])).push(null == L ? new SetPropertyInstruction(_, T.property) : new InterpolationInstruction(L, T.property));
                        g();
                        continue;
                    }
                }
                L = m.parse(_, 1);
                if (null != L) {
                    g();
                    (A ?? (A = [])).push(new InterpolationInstruction(L, e.m.map(t, F) ?? W(F)));
                }
                continue;
            }
            g();
            if (c) {
                j = BindablesInfo.from(h, false);
                T = j.attrs[F];
                if (void 0 !== T) {
                    Cr.node = t;
                    Cr.attr = C;
                    Cr.bindable = T;
                    Cr.def = h;
                    (R ?? (R = [])).push(q.build(Cr));
                    continue;
                }
            }
            Cr.node = t;
            Cr.attr = C;
            Cr.bindable = null;
            Cr.def = null;
            (A ?? (A = [])).push(q.build(Cr));
        }
        xr();
        if (this.be(t) && null != A && A.length > 1) this.xe(t, A);
        if (c) {
            U = new HydrateElementInstruction(this.resolveResources ? h : h.name, void 0, R ?? I, null, N, d);
            if (l === jr) {
                const i = t.getAttribute("name") || qr;
                const s = e.h("template");
                const n = e.ye();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.he(s.content, n);
                U.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: Ai(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.ke(t, e);
            }
        }
        if (null != A || null != U || null != D) {
            v = I.concat(U ?? I, D ?? I, A ?? I);
            this.we(t);
        }
        let z;
        if (null != P) {
            w = P.length - 1;
            b = w;
            O = P[b];
            let n;
            this.ke(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.ye(null == v ? [] : [ v ]);
            let u;
            let f;
            let d;
            let m;
            let g;
            let p;
            let x;
            let y;
            let k = 0, C = 0;
            let A = t.firstChild;
            let R = false;
            if (false !== M) while (null !== A) {
                f = 1 === A.nodeType ? A.getAttribute(jr) : null;
                if (null !== f) A.removeAttribute(jr);
                if (c) {
                    u = A.nextSibling;
                    if (!a) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = f || qr] ?? (i[s] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = u;
                } else {
                    if (null !== f) {
                        f = f || qr;
                        throw new Error(`AUR0706:${l}[${f}]`);
                    }
                    A = A.nextSibling;
                }
            }
            if (null != m) {
                d = {};
                for (f in m) {
                    n = e.h("template");
                    g = m[f];
                    for (k = 0, C = g.length; C > k; ++k) {
                        p = g[k];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) n.content.appendChild(p); else n.content.appendChild(p.content); else n.content.appendChild(p);
                    }
                    y = e.ye();
                    this.he(n.content, y);
                    d[f] = CustomElementDefinition.create({
                        name: Ai(),
                        template: n,
                        instructions: y.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                U.projections = d;
            }
            if (c && (N || h.containerless)) this.ke(t, e);
            z = !c || !h.containerless && !N && false !== M;
            if (z) if ("TEMPLATE" === t.nodeName) this.he(t.content, o); else {
                A = t.firstChild;
                while (null !== A) A = this.he(A, o);
            }
            O.def = CustomElementDefinition.create({
                name: Ai(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (b-- > 0) {
                O = P[b];
                n = e.h("template");
                x = e.h("au-m");
                x.classList.add("au");
                n.content.appendChild(x);
                O.def = CustomElementDefinition.create({
                    name: Ai(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ P[b + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ O ]);
        } else {
            if (null != v) e.rows.push(v);
            let i = t.firstChild;
            let s;
            let o;
            let u = null;
            let f;
            let d;
            let m;
            let g;
            let p;
            let w = false;
            let b = 0, x = 0;
            if (false !== M) while (null !== i) {
                o = 1 === i.nodeType ? i.getAttribute(jr) : null;
                if (null !== o) i.removeAttribute(jr);
                if (c) {
                    s = i.nextSibling;
                    if (!a) {
                        w = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!w) ((n = f ?? (f = {}))[r = o || qr] ?? (n[r] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== o) {
                        o = o || qr;
                        throw new Error(`AUR0706:${l}[${o}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != f) {
                u = {};
                for (o in f) {
                    g = e.h("template");
                    d = f[o];
                    for (b = 0, x = d.length; x > b; ++b) {
                        m = d[b];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.ye();
                    this.he(g.content, p);
                    u[o] = CustomElementDefinition.create({
                        name: Ai(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                U.projections = u;
            }
            if (c && (N || h.containerless)) this.ke(t, e);
            z = !c || !h.containerless && !N && false !== M;
            if (z && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.he(i, e);
            }
        }
        return o;
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
        r.insertBefore(this.we(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    de(t, e, i, s) {
        const n = BindablesInfo.from(i, true);
        const r = e.length;
        const o = [];
        let l;
        let h;
        let c = 0;
        let a = 0;
        let u;
        let f;
        let d;
        let m;
        for (let g = 0; g < r; ++g) {
            a = e.charCodeAt(g);
            if (92 === a) ++g; else if (58 === a) {
                l = e.slice(c, g);
                while (e.charCodeAt(++g) <= 32) ;
                c = g;
                for (;g < r; ++g) {
                    a = e.charCodeAt(g);
                    if (92 === a) ++g; else if (59 === a) {
                        h = e.slice(c, g);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(c);
                f = s.me.parse(l, h);
                d = s.ue(f);
                m = n.attrs[f.target];
                if (null == m) throw new Error(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    Cr.node = t;
                    Cr.attr = f;
                    Cr.bindable = m;
                    Cr.def = i;
                    o.push(d.build(Cr));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                c = g;
                l = void 0;
                h = void 0;
            }
        }
        xr();
        return o;
    }
    le(t, e) {
        const i = t;
        const s = H(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw new Error(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw new Error(`AUR0709`);
            const s = Tr(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = H(l.querySelectorAll("bindable"));
            const c = St.for(n);
            const a = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw new Error(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw new Error(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || a.has(e)) throw new Error(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    a.add(e);
                }
                c.add({
                    property: e,
                    attribute: i ?? void 0,
                    mode: Dr(t)
                });
                const s = t.getAttributeNames().filter((t => !Er.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Ce(Bi({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let l = 0;
        const h = o.length;
        for (;h > l; ++l) Ti(o[l]).dependencies.push(...e.def.dependencies ?? I, ...e.deps ?? I);
    }
    be(t) {
        return "INPUT" === t.nodeName && 1 === Rr[t.type];
    }
    xe(t, e) {
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
    we(t) {
        t.classList.add("au");
        return t;
    }
    ke(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.we(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.Ae = ft();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.oe = o ? s.oe : e.get(vr);
        this.me = o ? s.me : e.get(Ht);
        this.ep = o ? s.ep : e.get(h);
        this.m = o ? s.m : e.get(re);
        this.Vt = o ? s.Vt : e.get(M);
        this.p = o ? s.p : e.get(ie);
        this.localEls = o ? s.localEls : new Set;
        this.rows = r ?? [];
    }
    Ce(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    ae(t) {
        return this.c.find(Pi, t);
    }
    fe(t) {
        return this.c.find(ri, t);
    }
    ye(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ue(t) {
        if (this.root !== this) return this.root.ue(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.Ae[e];
        if (void 0 === i) {
            i = this.c.create(er, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.Ae[e] = i;
        }
        return i;
    }
}

function br(t) {
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

function xr() {
    Cr.node = Cr.attr = Cr.bindable = Cr.def = null;
}

const yr = {
    projections: null
};

const kr = {
    name: "unnamed"
};

const Cr = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const Ar = Object.assign(ft(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const Rr = {
    checkbox: 1,
    radio: 1
};

const Br = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = Br.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = ft();
            const r = e ? void 0 === t.defaultBindingMode ? et.default : t.defaultBindingMode : et.default;
            let o;
            let l;
            let h = false;
            let c;
            let a;
            for (l in s) {
                o = s[l];
                a = o.attribute;
                if (true === o.primary) {
                    if (h) throw new Error(`AUR0714:${t.name}`);
                    h = true;
                    c = o;
                } else if (!h && null == c) c = o;
                n[a] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) c = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            Br.set(t, i = new BindablesInfo(n, s, c));
        }
        return i;
    }
}

var Sr;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(Sr || (Sr = {}));

const Er = Object.freeze([ "property", "attribute", "mode" ]);

const Ir = "as-custom-element";

function Tr(t, e) {
    const i = t.getAttribute(Ir);
    if (null === i || "" === i) throw new Error(`AUR0715`);
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Ir);
    }
    return i;
}

function Dr(t) {
    switch (t.getAttribute("mode")) {
      case "oneTime":
        return et.oneTime;

      case "toView":
        return et.toView;

      case "fromView":
        return et.fromView;

      case "twoWay":
        return et.twoWay;

      case "default":
      default:
        return et.default;
    }
}

const $r = E.createInterface("ITemplateCompilerHooks");

const Pr = new WeakMap;

const Or = ht("compiler-hooks");

const Lr = Object.freeze({
    name: Or,
    define(t) {
        let e = Pr.get(t);
        if (void 0 === e) {
            Pr.set(t, e = new TemplateCompilerHooksDefinition(t));
            nt(Or, e, t);
            ct(t, Or);
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
        t.register(Ot($r, this.Type));
    }
}

const Ur = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Lr.define(t);
    }
};

const qr = "default";

const jr = "au-slot";

const Vr = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        Vr.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = Vr.get(e);
        Vr.delete(e);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(et.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(et.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(et.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(et.twoWay);
    }
}

ce("oneTime")(OneTimeBindingBehavior);

ce("toView")(ToViewBindingBehavior);

ce("fromView")(FromViewBindingBehavior);

ce("twoWay")(TwoWayBindingBehavior);

const Fr = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: Fr
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.get(D).taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.binding.handleChange(t, e);
    }
    updateSource(t) {
        this.queueTask((() => this.binding.updateSource(t)));
    }
    queueTask(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            return t();
        }), this.opts);
        e?.cancel();
    }
    $bind(t) {
        if (null !== this.firstArg) {
            const e = Number(this.firstArg.evaluate(t, this, null));
            this.opts.delay = isNaN(e) ? Fr : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        this.binding.$unbind();
    }
}

ce("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Jt = new Map;
        this.Re = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw new Error(`AUR0817`);
        if (0 === i.length) throw new Error(`AUR0818`);
        this.Jt.set(e, i);
        let s;
        for (s of i) this.Re.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.Jt.get(e);
        this.Jt.delete(e);
        let s;
        for (s of i) this.Re.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ d ];

ce("signal")(SignalBindingBehavior);

const _r = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: _r
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.get(D);
        this.J = this.p.taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.Be((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
            this.lastCall = this.p.performanceNow();
        }
        this.binding.handleChange(t, e);
    }
    updateSource(t) {
        this.Be((() => this.binding.updateSource(t)));
    }
    Be(t) {
        const e = this.opts;
        const i = this.p;
        const s = this.lastCall + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.task;
            e.delay = s;
            this.task = this.J.queueTask((() => {
                this.lastCall = i.performanceNow();
                this.task = null;
                e.delay = this.delay;
                t();
            }), e);
            n?.cancel();
        } else {
            this.lastCall = i.performanceNow();
            t();
        }
    }
    $bind(t) {
        if (null !== this.firstArg) {
            const e = Number(this.firstArg.evaluate(t, this, null));
            this.opts.delay = this.delay = isNaN(e) ? _r : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        super.$unbind();
    }
}

ce("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttribute(i); else e.setAttribute(i, t);
    }
}

const Mr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = Mr;
    }
    unbind(t, e) {
        return;
    }
}

ce("attr")(AttrBindingBehavior);

function Nr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Nr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ce("self")(SelfBindingBehavior);

const Wr = ft();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Wr[t] ?? (Wr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

function Hr(t, e) {
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
        this.o = t;
        this.oL = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        const e = this.v;
        if (t === e) return;
        this.v = t;
        this.ov = e;
        this.Ie();
        this.Te();
        this.queue.add(this);
    }
    handleCollectionChange() {
        this.Te();
    }
    handleChange(t, e) {
        this.Te();
    }
    Te() {
        const t = this.v;
        const e = this.o;
        const i = dt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Hr;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (vt(t)) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const i = dt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Hr;
        if ("checkbox" === e.type) {
            if (vt(t)) {
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
        this.handler.dispose();
        this.Se?.unsubscribe(this);
        this.Se = void 0;
        this.Ee?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        zr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, zr);
    }
    Ie() {
        const t = this.o;
        (this.Ee ?? (this.Ee = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Se?.unsubscribe(this);
        this.Se = void 0;
        if ("checkbox" === t.type) (this.Se = no(this.v, this.oL))?.subscribe(this);
    }
}

t(CheckedObserver);

e(CheckedObserver);

let zr;

const Gr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Xr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.De = void 0;
        this.$e = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Kr(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Pe(t instanceof Array ? t : null);
        this.K();
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
        const t = this.v;
        const e = this.o;
        const i = vt(t);
        const s = e.matcher ?? Xr;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = dt.call(e, "model") ? e.model : e.value;
            if (i) {
                e.selected = -1 !== t.findIndex((t => !!s(o, t)));
                continue;
            }
            e.selected = !!s(o, t);
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
            const o = t.matcher || Xr;
            const l = [];
            while (n < i) {
                r = e[n];
                if (r.selected) l.push(dt.call(r, "model") ? r.model : r.value);
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
                r = dt.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Oe() {
        (this.$e = new this.o.ownerDocument.defaultView.MutationObserver(this.Le.bind(this))).observe(this.o, Gr);
        this.Pe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ue() {
        this.$e.disconnect();
        this.De?.unsubscribe(this);
        this.$e = this.De = void 0;
        this.iO = false;
    }
    Pe(t) {
        this.De?.unsubscribe(this);
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
            this.Ue();
        }
    }
    flush() {
        Yr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Yr);
    }
}

t(SelectValueObserver);

e(SelectValueObserver);

function Kr(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = dt.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let Yr;

const Zr = "--";

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
    setValue(t) {
        this.value = t;
        this.H = t !== this.ov;
        this.K();
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
    je(t) {
        let e;
        let i;
        const s = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (bt(e)) {
                if (i.startsWith(Zr)) {
                    s.push([ i, e ]);
                    continue;
                }
                s.push([ R(i), e ]);
                continue;
            }
            s.push(...this.Ve(e));
        }
        return s;
    }
    Fe(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this.Ve(t[s]));
            return i;
        }
        return I;
    }
    Ve(t) {
        if (bt(t)) return this.qe(t);
        if (t instanceof Array) return this.Fe(t);
        if (t instanceof Object) return this.je(t);
        return I;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const i = this.Ve(t);
            let s;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const c = i.length;
            for (;h < c; ++h) {
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
                if (!dt.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && wt(e.indexOf) && e.includes("!important")) {
            i = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, i);
    }
    bind() {
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
    setValue(t) {
        if (Object.is(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.H = true;
        if (!this.handler.config.readonly) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.o[this.k] = this.v ?? this.handler.config.default;
            this.queue.add(this);
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
        Jr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Jr);
    }
}

t(ValueAttributeObserver);

e(ValueAttributeObserver);

let Jr;

const Qr = "http://www.w3.org/1999/xlink";

const to = "http://www.w3.org/XML/1998/namespace";

const eo = "http://www.w3.org/2000/xmlns/";

const io = Object.assign(ft(), {
    "xlink:actuate": [ "actuate", Qr ],
    "xlink:arcrole": [ "arcrole", Qr ],
    "xlink:href": [ "href", Qr ],
    "xlink:role": [ "role", Qr ],
    "xlink:show": [ "show", Qr ],
    "xlink:title": [ "title", Qr ],
    "xlink:type": [ "type", Qr ],
    "xml:lang": [ "lang", to ],
    "xml:space": [ "space", to ],
    xmlns: [ "xmlns", eo ],
    "xmlns:xlink": [ "xlink", eo ]
});

const so = new m;

so.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        this.type = t.type ?? ValueAttributeObserver;
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
        this._e = ft();
        this.Me = ft();
        this.Ne = ft();
        this.We = ft();
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
        Lt(g, NodeObserverLocator).register(t);
        Ot(g, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this._e;
        let n;
        if (bt(t)) {
            n = s[t] ?? (s[t] = ft());
            if (null == n[e]) n[e] = new NodeObserverConfig(i); else ro(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = ft());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else ro(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Me;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else ro("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else ro("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.We || e in (this.Ne[t.tagName] ?? z)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
          case "minLength":
          case "maxLength":
          case "placeholder":
          case "type":
          case "size":
            return Mr;

          default:
            {
                const i = io[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (gt(t, e, this.svgAnalyzer)) return Mr;
                return so;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (bt(t)) {
            n = (i = this.Ne)[t] ?? (i[t] = ft());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Ne)[e] ?? (s[e] = ft());
            n[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.We[e] = true;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const s = this._e[t.tagName]?.[e] ?? this.Me[e];
        if (null != s) return new s.type(t, e, new EventSubscriber(s), i, this.locator);
        const n = io[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (gt(t, e, this.svgAnalyzer)) return Mr;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new p(t, e);
    }
}

NodeObserverLocator.inject = [ G, ie, v, se ];

function no(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function ro(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw new Error(`AUR0802`);
        if (e.mode !== et.twoWay && e.mode !== et.fromView) throw new Error(`AUR0803`);
        const s = this.oL.getObserver(e.target, e.targetProperty);
        if (!s.handler) throw new Error(`AUR0804`);
        e.targetObserver = s;
        const n = s.handler;
        s.originalHandler = n;
        s.handler = new EventSubscriber(new NodeObserverConfig({
            default: n.config.default,
            events: i,
            readonly: n.config.readonly
        }));
    }
    unbind(t, e) {
        e.targetObserver.handler.dispose();
        e.targetObserver.handler = e.targetObserver.originalHandler;
        e.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ l ];

ce("updateTrigger")(UpdateTriggerBindingBehavior);

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

Focus.inject = [ Ws, ie ];

Q([ At({
    mode: et.twoWay
}) ], Focus.prototype, "value", void 0);

Ye("focus")(Focus);

let oo = class Show {
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
        this.Ke = false;
        this.Ye?.cancel();
        this.Ye = null;
    }
    valueChanged() {
        if (this.Ke && null === this.Ye) this.Ye = this.p.domWriteQueue.queueTask(this.update);
    }
};

Q([ At ], oo.prototype, "value", void 0);

oo = Q([ tt(0, Ws), tt(1, ie), tt(2, cn) ], oo);

Vt("hide")(oo);

Ye("show")(oo);

class Portal {
    constructor(t, e, i) {
        this.id = j("au$component");
        this.strict = false;
        this.p = i;
        this.Qe = i.document.createElement("div");
        this.view = t.create();
        Ys(this.view.nodes, e);
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
        const s = N(this.ii(null, i, t.flags), (() => this.ei(null, i, t.flags)));
        if (pt(s)) s.catch((t => {
            throw t;
        }));
    }
    ei(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return N(s?.call(n, e, r), (() => this.si(t, e, i)));
    }
    si(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return N(n.activate(t ?? n, s, i, s.scope), (() => this.ni(e)));
        return this.ni(e);
    }
    ni(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    ii(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return N(s?.call(n, e, r), (() => this.ri(t, e, i)));
    }
    ri(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return N(n.deactivate(t, s, i), (() => this.oi(e)));
        return this.oi(e);
    }
    oi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
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
        if (bt(i)) {
            let n = e;
            if (bt(s)) s = e.querySelector(s);
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
        if (true === this.view?.accept(t)) return true;
    }
}

Portal.inject = [ es, zs, ie ];

Q([ At({
    primary: true
}) ], Portal.prototype, "target", void 0);

Q([ At({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

Q([ At() ], Portal.prototype, "strict", void 0);

Q([ At() ], Portal.prototype, "deactivating", void 0);

Q([ At() ], Portal.prototype, "activating", void 0);

Q([ At() ], Portal.prototype, "deactivated", void 0);

Q([ At() ], Portal.prototype, "activated", void 0);

Q([ At() ], Portal.prototype, "callbackContext", void 0);

Ze("portal")(Portal);

class If {
    constructor(t, e, i) {
        this.ifFactory = t;
        this.location = e;
        this.work = i;
        this.id = j("au$component");
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
        return N(this.pending, (() => {
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == s) return;
            s.setLocation(this.location);
            this.pending = N(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.li = true;
        return N(this.pending, (() => {
            this.li = false;
            this.pending = void 0;
            void this.view?.deactivate(t, this.$controller, i);
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
        return N(N(this.pending, (() => this.pending = N(s?.deactivate(s, n, i), (() => {
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == l) return;
            l.setLocation(this.location);
            return N(l.activate(l, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        })))), (() => this.work.finish()));
    }
    dispose() {
        this.ifView?.dispose();
        this.elseView?.dispose();
        this.ifView = this.elseView = this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

If.inject = [ es, zs, _s ];

Q([ At ], If.prototype, "value", void 0);

Q([ At({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Ze("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = j("au$component");
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ es ];

Ze({
    name: "else"
})(Else);

function lo(t) {
    t.dispose();
}

const ho = [ 38963, 36914 ];

class Repeat {
    constructor(t, e, i) {
        this.l = t;
        this.ai = e;
        this.f = i;
        this.id = j("au$component");
        this.views = [];
        this.key = void 0;
        this.ui = void 0;
        this.fi = false;
        this.di = false;
        this.mi = null;
        this.gi = void 0;
        this.pi = false;
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
                o = this.forOf = r.ast;
                this.vi = r;
                let t = o.iterable;
                while (null != t && ho.includes(t.$kind)) {
                    t = t.expression;
                    this.fi = true;
                }
                this.mi = t;
                break;
            }
        }
        this.wi();
        const h = o.declaration;
        if (!(this.pi = 90138 === h.$kind || 106523 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.bi();
        return this.xi(t);
    }
    detaching(t, e, i) {
        this.wi();
        return this.yi(t);
    }
    itemsChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        this.wi();
        this.bi();
        const e = N(this.yi(null), (() => this.xi(null)));
        if (pt(e)) e.catch(yt);
    }
    handleCollectionChange(t) {
        const {$controller: e} = this;
        if (!e.isActive) return;
        if (this.fi) {
            if (this.di) return;
            this.di = true;
            this.items = this.forOf.iterable.evaluate(e.scope, this.vi, null);
            this.di = false;
            return;
        }
        this.bi();
        if (void 0 === t) {
            const t = N(this.yi(null), (() => this.xi(null)));
            if (pt(t)) t.catch(yt);
        } else {
            const e = this.views.length;
            const i = w(t);
            if (i.deletedIndices.length > 0) {
                const t = N(this.ki(i), (() => this.Ci(e, i)));
                if (pt(t)) t.catch(yt);
            } else this.Ci(e, i);
        }
    }
    wi() {
        const t = this.$controller.scope;
        let e = this.Ai;
        let i = this.fi;
        let s;
        if (i) {
            e = this.Ai = this.mi.evaluate(t, this.vi, null) ?? null;
            i = this.fi = !Object.is(this.items, e);
        }
        const n = this.ui;
        if (this.$controller.isActive) {
            s = this.ui = b(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.ui = void 0;
        }
    }
    bi() {
        const t = this.items;
        if (t instanceof Array) {
            this.gi = t;
            return;
        }
        const e = [];
        vo(t, ((t, i) => {
            e[i] = t;
        }));
        this.gi = e;
    }
    xi(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = po(a);
        const m = this.views = Array(d);
        vo(a, ((a, g) => {
            s = m[g] = l.create().setLocation(c);
            s.nodes.unlink();
            if (this.pi) f.declaration.assign(n = r.fromParent(u, y.create()), this.vi, a); else n = r.fromParent(u, y.create(h, a));
            mo(n.overrideContext, g, d);
            i = s.activate(t ?? s, o, 0, n);
            if (pt(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    yi(t) {
        let e;
        let i;
        let s;
        let n = 0;
        const {views: r, $controller: o} = this;
        const l = r.length;
        for (;l > n; ++n) {
            s = r[n];
            s.release();
            i = s.deactivate(t ?? s, o, 0);
            if (pt(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    ki(t) {
        let e;
        let i;
        let s;
        const {$controller: n, views: r} = this;
        const o = t.deletedIndices;
        const l = o.length;
        let h = 0;
        for (;l > h; ++h) {
            s = r[o[h]];
            s.release();
            i = s.deactivate(s, n, 0);
            if (pt(i)) (e ?? (e = [])).push(i);
        }
        h = 0;
        let c = 0;
        for (;l > h; ++h) {
            c = o[h] - h;
            r.splice(c, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ci(t, e) {
        let i;
        let s;
        let n;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, gi: u, l: f, views: d} = this;
        const m = e.length;
        for (;m > l; ++l) if (-2 === e[l]) {
            n = c.create();
            d.splice(l, 0, n);
        }
        if (d.length !== m) throw new Error(`AUR0814:${d.length}!=${m}`);
        const g = h.scope;
        const p = e.length;
        x(d, e);
        const v = fo(e);
        const w = v.length;
        let b;
        let k = w - 1;
        l = p - 1;
        for (;l >= 0; --l) {
            n = d[l];
            b = d[l + 1];
            n.nodes.link(b?.nodes ?? f);
            if (-2 === e[l]) {
                if (this.pi) this.forOf.declaration.assign(o = r.fromParent(g, y.create()), this.vi, u[l]); else o = r.fromParent(g, y.create(a, u[l]));
                mo(o.overrideContext, l, p);
                n.setLocation(f);
                s = n.activate(n, h, 0, o);
                if (pt(s)) (i ?? (i = [])).push(s);
            } else if (k < 0 || 1 === w || l !== v[k]) {
                mo(n.scope.overrideContext, l, p);
                n.nodes.insertBefore(n.location);
            } else {
                if (t !== p) mo(n.scope.overrideContext, l, p);
                --k;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(lo);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ zs, Rs, es ];

Q([ At ], Repeat.prototype, "items", void 0);

Ze("repeat")(Repeat);

let co = 16;

let ao = new Int32Array(co);

let uo = new Int32Array(co);

function fo(t) {
    const e = t.length;
    if (e > co) {
        co = e;
        ao = new Int32Array(e);
        uo = new Int32Array(e);
    }
    let i = 0;
    let s = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let c = 0;
    for (;r < e; r++) {
        s = t[r];
        if (-2 !== s) {
            o = ao[i];
            n = t[o];
            if (-2 !== n && n < s) {
                uo[r] = o;
                ao[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                c = l + h >> 1;
                n = t[ao[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[ao[l]];
            if (s < n || -2 === n) {
                if (l > 0) uo[r] = ao[l - 1];
                ao[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = ao[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = uo[s];
    }
    while (r-- > 0) ao[r] = 0;
    return a;
}

const mo = (t, e, i) => {
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
};

const go = Object.prototype.toString;

const po = t => {
    switch (go.call(t)) {
      case "[object Array]":
        return t.length;

      case "[object Map]":
        return t.size;

      case "[object Set]":
        return t.size;

      case "[object Number]":
        return t;

      case "[object Null]":
        return 0;

      case "[object Undefined]":
        return 0;

      default:
        throw new Error(`Cannot count ${go.call(t)}`);
    }
};

const vo = (t, e) => {
    switch (go.call(t)) {
      case "[object Array]":
        return wo(t, e);

      case "[object Map]":
        return bo(t, e);

      case "[object Set]":
        return xo(t, e);

      case "[object Number]":
        return yo(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw new Error(`Cannot iterate over ${go.call(t)}`);
    }
};

const wo = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const bo = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const xo = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const yo = (t, e) => {
    let i = 0;
    for (;i < t; ++i) e(i, i, t);
};

class With {
    constructor(t, e) {
        this.id = j("au$component");
        this.id = j("au$component");
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, i) {
        const s = this.$controller;
        const n = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (s.isActive && null != n) {
            o = r.fromParent(s.scope, void 0 === t ? {} : t);
            for (h = n.length; h > l; ++l) n[l].$bind(o);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const o = r.fromParent(s.scope, void 0 === n ? {} : n);
        return this.view.activate(t, s, i, o);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

With.inject = [ es, zs ];

Q([ At ], With.prototype, "value", void 0);

Ze("with")(With);

let ko = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = j("au$component");
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
        this.queue((() => this.swap(t, this.value)));
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
        this.view?.dispose();
        this.view = void 0;
    }
    valueChanged(t, e) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, this.value)));
    }
    caseChanged(t) {
        this.queue((() => this.Ri(t)));
    }
    Ri(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.Bi(null);
            return;
        }
        if (s > 0 && i[0].id < t.id) return;
        const n = [];
        let r = t.fallThrough;
        if (!r) n.push(t); else {
            const e = this.cases;
            const i = e.indexOf(t);
            for (let t = i, s = e.length; t < s && r; t++) {
                const i = e[t];
                n.push(i);
                r = i.fallThrough;
            }
        }
        return N(this.Bi(null, n), (() => {
            this.activeCases = n;
            return this.Si(null);
        }));
    }
    swap(t, e) {
        const i = [];
        let s = false;
        for (const t of this.cases) {
            if (s || t.isMatch(e)) {
                i.push(t);
                s = t.fallThrough;
            }
            if (i.length > 0 && !s) break;
        }
        const n = this.defaultCase;
        if (0 === i.length && void 0 !== n) i.push(n);
        return N(this.activeCases.length > 0 ? this.Bi(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Si(t);
        }));
    }
    Si(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return _(...i.map((e => e.activate(t, 0, n))));
    }
    Bi(t, e = []) {
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        if (1 === s) {
            const s = i[0];
            if (!e.includes(s)) {
                i.length = 0;
                return s.deactivate(t, 0);
            }
            return;
        }
        return N(_(...i.reduce(((i, s) => {
            if (!e.includes(s)) i.push(s.deactivate(t, 0));
            return i;
        }), [])), (() => {
            i.length = 0;
        }));
    }
    queue(t) {
        const e = this.promise;
        let i;
        i = this.promise = N(N(e, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

Q([ At ], ko.prototype, "value", void 0);

ko = Q([ Ze("switch"), tt(0, es), tt(1, zs) ], ko);

let Co = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Ei = e;
        this.l = i;
        this.id = j("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Ii = s.config.level <= 1;
        this.Vt = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof ko) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Vt.debug("isMatch()");
        const e = this.value;
        if (Array.isArray(e)) {
            if (void 0 === this.ui) this.ui = this.Ti(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (Array.isArray(t)) {
            this.ui?.unsubscribe(this);
            this.ui = this.Ti(t);
        } else if (void 0 !== this.ui) this.ui.unsubscribe(this);
        this.$switch.caseChanged(this);
    }
    handleCollectionChange(t) {
        this.$switch.caseChanged(this);
    }
    activate(t, e, i) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(t ?? s, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(t ?? i, this.$controller, e);
    }
    dispose() {
        this.ui?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ti(t) {
        const e = this.Ei.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

Co.inject = [ es, l, zs, M ];

Q([ At ], Co.prototype, "value", void 0);

Q([ At({
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
    mode: et.oneTime
}) ], Co.prototype, "fallThrough", void 0);

Co = Q([ Ze("case") ], Co);

let Ao = class DefaultCase extends Co {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

Ao = Q([ Ze("default-case") ], Ao);

let Ro = class PromiseTemplateController {
    constructor(t, e, i, s) {
        this.f = t;
        this.l = e;
        this.p = i;
        this.id = j("au$component");
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
        return N(s.activate(t, n, i, this.viewScope = r.fromParent(n.scope, {})), (() => this.swap(t, i)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, e) {
        const i = this.value;
        if (!pt(i)) {
            this.logger.warn(`The value '${String(i)}' is not a promise. No change will be done.`);
            return;
        }
        const s = this.p.domWriteQueue;
        const n = this.fulfilled;
        const r = this.rejected;
        const o = this.pending;
        const l = this.viewScope;
        let h;
        const c = {
            reusable: false
        };
        const a = () => {
            void _(h = (this.preSettledTask = s.queueTask((() => _(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), c)).result.catch((t => {
                if (!(t instanceof Z)) throw t;
            })), i.then((a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => _(o?.deactivate(t, e), r?.deactivate(t, e), n?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            }), (a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => _(o?.deactivate(t, e), n?.deactivate(t, e), r?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            })));
        };
        if (1 === this.postSettledTask?.status) void this.postSettlePromise.then(a); else {
            this.postSettledTask?.cancel();
            a();
        }
    }
    detaching(t, e, i) {
        this.preSettledTask?.cancel();
        this.postSettledTask?.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
};

Q([ At ], Ro.prototype, "value", void 0);

Ro = Q([ Ze("promise"), tt(0, es), tt(1, zs), tt(2, ie), tt(3, M) ], Ro);

let Bo = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = j("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        Io(t).pending = this;
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
        this.view?.dispose();
        this.view = void 0;
    }
};

Q([ At({
    mode: et.toView
}) ], Bo.prototype, "value", void 0);

Bo = Q([ Ze("pending"), tt(0, es), tt(1, zs) ], Bo);

let So = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = j("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        Io(t).fulfilled = this;
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
        this.view?.dispose();
        this.view = void 0;
    }
};

Q([ At({
    mode: et.fromView
}) ], So.prototype, "value", void 0);

So = Q([ Ze("then"), tt(0, es), tt(1, zs) ], So);

let Eo = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = j("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        Io(t).rejected = this;
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
        this.view?.dispose();
        this.view = void 0;
    }
};

Q([ At({
    mode: et.fromView
}) ], Eo.prototype, "value", void 0);

Eo = Q([ Ze("catch"), tt(0, es), tt(1, zs) ], Eo);

function Io(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof Ro) return i;
    throw new Error(`AUR0813`);
}

let To = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

To = Q([ zt({
    pattern: "promise.resolve",
    symbols: ""
}) ], To);

let Do = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Do = Q([ zt({
    pattern: "then",
    symbols: ""
}) ], Do);

let $o = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

$o = Q([ zt({
    pattern: "catch",
    symbols: ""
}) ], $o);

function Po(t, e, i, s) {
    if (bt(e)) return Oo(t, e, i, s);
    if (Si(e)) return Lo(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Di = i;
        this.$i = void 0;
    }
    get definition() {
        if (void 0 === this.$i) this.$i = CustomElementDefinition.create({
            name: Ai(),
            template: this.node,
            needsCompile: bt(this.node),
            instructions: this.instructions,
            dependencies: this.Di
        });
        return this.$i;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(cs).getViewFactory(this.definition, t.createChild().register(...this.Di));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Di);
    }
}

function Oo(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (an(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) Uo(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function Lo(t, e, i, s) {
    const n = Ti(e);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const c = n.bindables;
    const a = t.document.createElement(n.name);
    a.className = "au";
    if (!l.includes(e)) l.push(e);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (an(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) Uo(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function Uo(t, e, i, s, n) {
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

function qo(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Pi = e;
        this.Oi = i;
        this.r = s;
        this.id = j("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Li = void 0;
        this.Ui = e.props.reduce(qo, {});
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
        const n = N(this.ri(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (pt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return N(void 0 === t ? N(e, (t => this.qi(t, s))) : t, (t => this.si(this.view = t, i, s)));
    }
    ri(t, e, i) {
        return t?.deactivate(e ?? t, this.$controller, i);
    }
    si(t, e, i) {
        const {$controller: s} = this;
        return N(t?.activate(e ?? t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    qi(t, e) {
        const i = this.ji(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    ji(t, e) {
        if (null == t) return;
        const i = this.Oi.controller.container;
        if ("object" === typeof t) {
            if (jo(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (bt(t)) {
            const e = i.find(Pi, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return Po(this.p, t, this.Ui, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ ie, cn, Bs, cs ];

Q([ At ], AuRender.prototype, "component", void 0);

Q([ At({
    mode: et.fromView
}) ], AuRender.prototype, "composing", void 0);

ai({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function jo(t) {
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
        this.Vi = void 0;
        this.r = t.get(cs);
        this.Pi = r;
        this.Fi = o;
    }
    static get inject() {
        return [ q, Rs, Ws, zs, ie, cn, X(CompositionContextFactory) ];
    }
    get pending() {
        return this._i;
    }
    get composition() {
        return this.Vi;
    }
    attaching(t, e, i) {
        return this._i = N(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Fi.isCurrent(t)) this._i = void 0;
        }));
    }
    detaching(t) {
        const e = this.Vi;
        const i = this._i;
        this.Fi.invalidate();
        this.Vi = this._i = void 0;
        return N(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Vi) {
            this.Vi.update(this.model);
            return;
        }
        this._i = N(this._i, (() => N(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Fi.isCurrent(t)) this._i = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Fi;
        const s = this.Vi;
        return N(i.create(t), (t => {
            if (i.isCurrent(t)) return N(this.compose(t), (n => {
                if (i.isCurrent(t)) return N(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Vi = n;
                        return N(s?.deactivate(e), (() => t));
                    } else return N(n.controller.deactivate(n.controller, this.$controller, 2), (() => {
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
        const {view: n, viewModel: o, model: l} = t.change;
        const {c: h, host: c, $controller: a, l: u} = this;
        const f = this.getDef(o);
        const d = h.createChild();
        const m = null == u ? c.parentNode : u.parentNode;
        if (null !== f) {
            if (f.containerless) throw new Error(`AUR0806`);
            if (null == u) {
                i = c;
                s = () => {};
            } else {
                i = m.insertBefore(this.p.document.createElement(f.name), u);
                s = () => {
                    i.remove();
                };
            }
            e = this.getVm(d, o, i);
        } else {
            i = null == u ? c : u;
            e = this.getVm(d, o, i);
        }
        const g = () => {
            if (null !== f) {
                const n = Controller.$el(d, e, i, {
                    projections: this.Pi.projections
                }, f);
                return new CompositionController(n, (t => n.activate(t ?? n, a, 1, a.scope.parentScope)), (t => N(n.deactivate(t ?? n, a, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Pi.generateName(),
                    template: n
                });
                const o = this.r.getViewFactory(s, d);
                const l = Controller.$view(o, a);
                const h = "auto" === this.scopeBehavior ? r.fromParent(this.parent.scope, e) : r.create(e);
                if (Js(i)) l.setLocation(i); else l.setHost(i);
                return new CompositionController(l, (t => l.activate(t ?? l, a, 1, h)), (t => l.deactivate(t ?? l, a, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return N(e.activate(l), (() => g())); else return g();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = Js(i);
        t.registerResolver(s.Element, t.registerResolver(Ws, new F("ElementResolver", n ? null : i)));
        t.registerResolver(zs, new F("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        t.registerResolver(e, new F("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = wt(t) ? t : t?.constructor;
        return Pi.isType(e) ? Pi.getDefinition(e) : null;
    }
}

Q([ At ], AuCompose.prototype, "view", void 0);

Q([ At ], AuCompose.prototype, "viewModel", void 0);

Q([ At ], AuCompose.prototype, "model", void 0);

Q([ At({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

ai("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return N(t.load(), (t => new CompositionContext(++this.id, t)));
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
        if (pt(this.view) || pt(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        this.Mi = null;
        this.Ni = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.Wi = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.Wi = true;
        }
        this.Oi = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ zs, cn, Bs, cs ];
    }
    binding(t, e, i) {
        this.Mi = this.$controller.scope.parentScope;
        let s;
        if (this.Wi) {
            s = this.Oi.controller.scope.parentScope;
            (this.Ni = r.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.Mi.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Wi ? this.Ni : this.Mi);
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
        if (true === this.view?.accept(t)) return true;
    }
}

Q([ At ], AuSlot.prototype, "expose", void 0);

ai({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Vo = E.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let Fo = class SanitizeValueConverter {
    constructor(t) {
        this.Hi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Hi.sanitize(t);
    }
};

Fo = Q([ tt(0, Vo) ], Fo);

me("sanitize")(Fo);

let _o = class ViewValueConverter {
    constructor(t) {
        this.zi = t;
    }
    toView(t, e) {
        return this.zi.getViewComponentForObject(t, e);
    }
};

_o = Q([ tt(0, hs) ], _o);

me("view")(_o);

const Mo = DebounceBindingBehavior;

const No = OneTimeBindingBehavior;

const Wo = ToViewBindingBehavior;

const Ho = FromViewBindingBehavior;

const zo = SignalBindingBehavior;

const Go = ThrottleBindingBehavior;

const Xo = TwoWayBindingBehavior;

const Ko = TemplateCompiler;

const Yo = NodeObserverLocator;

const Zo = [ Ko, Yo ];

const Jo = SVGAnalyzer;

const Qo = te;

const tl = Qt;

const el = Jt;

const il = Zt;

const sl = ee;

const nl = [ el, il, sl ];

const rl = [ Qo, tl ];

const ol = lr;

const ll = or;

const hl = hr;

const cl = nr;

const al = ir;

const ul = sr;

const fl = rr;

const dl = gr;

const ml = cr;

const gl = ar;

const pl = ur;

const vl = fr;

const wl = mr;

const bl = dr;

const xl = pr;

const yl = [ ll, al, cl, ul, fl, ol, hl, dl, ml, gl, pl, wl, bl, vl, xl ];

const kl = Fo;

const Cl = _o;

const Al = If;

const Rl = Else;

const Bl = Repeat;

const Sl = With;

const El = ko;

const Il = Co;

const Tl = Ao;

const Dl = Ro;

const $l = Bo;

const Pl = So;

const Ol = Eo;

const Ll = To;

const Ul = Do;

const ql = $o;

const jl = AttrBindingBehavior;

const Vl = SelfBindingBehavior;

const Fl = UpdateTriggerBindingBehavior;

const _l = AuRender;

const Ml = AuCompose;

const Nl = Portal;

const Wl = Focus;

const Hl = oo;

const zl = [ Mo, No, Wo, Ho, zo, Go, Xo, kl, Cl, Al, Rl, Bl, Sl, El, Il, Tl, Dl, $l, Pl, Ol, Ll, Ul, ql, jl, Vl, Fl, _l, Ml, Nl, Wl, Hl, AuSlot ];

const Gl = kn;

const Xl = bn;

const Kl = wn;

const Yl = An;

const Zl = Bn;

const Jl = yn;

const Ql = Rn;

const th = Cn;

const eh = vn;

const ih = xn;

const sh = $n;

const nh = qn;

const rh = Pn;

const oh = On;

const lh = Ln;

const hh = Un;

const ch = Tn;

const ah = jn;

const uh = [ Ql, Zl, Gl, th, Yl, eh, Kl, Xl, ih, Jl, sh, nh, rh, oh, lh, hh, ch, ah ];

const fh = dh(B);

function dh(t) {
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
            return e.register(Ut(o, i.coercingOptions), ...Zo, ...zl, ...nl, ...yl, ...uh);
        },
        customize(e) {
            return dh(e ?? t);
        }
    };
}

const mh = E.createInterface("IAurelia");

class Aurelia {
    constructor(t = E.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Gi = false;
        this.Xi = false;
        this.Ki = void 0;
        this.next = void 0;
        this.Yi = void 0;
        this.Zi = void 0;
        if (t.has(mh, true)) throw new Error(`AUR0768`);
        t.registerResolver(mh, new F("IAurelia", this));
        t.registerResolver(Fs, this.Ji = new F("IAppRoot"));
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
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.Qi(s);
        const r = t.component;
        let o;
        if (wt(r)) {
            i.registerResolver(n.HTMLElement, i.registerResolver(n.Element, i.registerResolver(Ws, new F("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        i.registerResolver(Hs, new F("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: Ai(),
            template: s,
            enhance: true
        }));
        return N(l.activate(l, e, 1), (() => l));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    Qi(t) {
        let e;
        if (!this.container.has(ie, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new J(t.ownerDocument.defaultView);
            this.container.register(Ut(ie, e));
        } else e = this.container.get(ie);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (pt(this.Yi)) return this.Yi;
        return this.Yi = N(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.Ji.prepare(this.Ki = t);
            this.Gi = true;
            return N(t.activate(), (() => {
                this.ir = true;
                this.Gi = false;
                this.Yi = void 0;
                this.ts(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (pt(this.Zi)) return this.Zi;
        if (true === this.ir) {
            const e = this.Ki;
            this.ir = false;
            this.Xi = true;
            return this.Zi = N(e.deactivate(), (() => {
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

var gh;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(gh || (gh = {}));

const ph = E.createInterface("IDialogService");

const vh = E.createInterface("IDialogController");

const wh = E.createInterface("IDialogDomRenderer");

const bh = E.createInterface("IDialogDom");

const xh = E.createInterface("IDialogGlobalSettings");

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

var yh;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(yh || (yh = {}));

class DialogController {
    constructor(t, e) {
        this.p = t;
        this.ctn = e;
        this.closed = new Promise(((t, e) => {
            this.Ot = t;
            this.Et = e;
        }));
    }
    static get inject() {
        return [ ie, q ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(wh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(Hs, true) ? e.get(Hs) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(Ut(Hs, o));
        e.register(Ut(Ws, c), Ut(bh, l));
        return new Promise((s => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(e, t, c), {
                $dialog: this
            });
            s(n.canActivate?.(i) ?? true);
        })).then((r => {
            if (true !== r) {
                l.dispose();
                if (n) throw kh(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const o = this.cmp;
            return N(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Pi.generateName(),
                    template: s
                }));
                return N(i.activate(i, null, 1), (() => {
                    l.overlay.addEventListener(t.mouseEvent ?? "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            l.dispose();
            throw t;
        }));
    }
    deactivate(t, e) {
        if (this.es) return this.es;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(N(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.es = void 0;
                    if (l) throw kh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return N(r.deactivate?.(h), (() => N(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.Ot(h); else this.Et(kh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.es = void 0;
            throw t;
        }));
        this.es = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = Ch(t);
        return new Promise((t => t(N(this.cmp.deactivate?.(DialogCloseResult.create("error", e)), (() => N(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Et(e);
        })))))));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, e, i) {
        const s = e.component;
        if (null == s) return new EmptyComponent;
        if ("object" === typeof s) return s;
        const n = this.p;
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(Ws, new F("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = wt(t) ? t : t?.constructor;
        return Pi.isType(e) ? Pi.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function kh(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function Ch(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.gt = t;
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
        return [ q, ie, xh ];
    }
    static register(t) {
        t.register(Ot(ph, this), je.deactivating(ph, (t => N(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Rh(new Promise((e => {
            const i = DialogSettings.from(this.ss, t);
            const s = i.container ?? this.gt.createChild();
            e(N(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(Ut(vh, e));
                s.register(qt(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return N(e.activate(t), (t => {
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
        const i = Bh(e);
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
        const s = _(null == e ? void 0 : N(e(), (e => {
            t.component = e;
        })), wt(i) ? N(i(), (e => {
            t.template = e;
        })) : void 0);
        return pt(s) ? s.then((() => t)) : t;
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

function Ah(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function Rh(t) {
    t.whenClosed = Ah;
    return t;
}

function Bh(t) {
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
        Ot(xh, this).register(t);
    }
}

const Sh = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Sh} display:flex;`;
        this.overlayCss = Sh;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        Ot(wh, this).register(t);
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

DefaultDialogDomRenderer.inject = [ ie ];

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

function Eh(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, je.creating((() => t(i.get(xh))))),
        customize(t, i) {
            return Eh(t, i ?? e);
        }
    };
}

const Ih = Eh((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(Ot(xh, this));
    }
} ]);

const Th = Eh(B, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Dh = E.createInterface((t => t.singleton(WcCustomElementRegistry)));

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
            s = Pi.isType(e) ? Pi.getDefinition(e) : CustomElementDefinition.create(Pi.generateName(), e);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (s.containerless) throw new Error("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const n = !i?.extends ? HTMLElement : this.p.document.createElement(i.extends).constructor;
        const r = this.ctn;
        const o = this.r;
        const l = s.bindables;
        const h = this.p;
        class CustomElementClass extends n {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = r.createChild();
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(Ws, new F("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                Ns(this, e.key, n);
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

WcCustomElementRegistry.inject = [ q, ie, cs ];

export { AdoptedStyleSheetsStyles, AppRoot, je as AppTask, te as AtPrefixedTriggerAttributePattern, Qo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, jl as AttrBindingBehaviorRegistration, fr as AttrBindingCommand, vl as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, nh as AttributeBindingRendererRegistration, AttributeNSAccessor, Yt as AttributePattern, AuCompose, AuRender, _l as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, St as Bindable, BindableDefinition, BindableObserver, BindablesInfo, de as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorFactory, he as BindingBehaviorStrategy, er as BindingCommand, BindingCommandDefinition, BindingInterceptor, et as BindingMode, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, lr as CallBindingCommand, ol as CallBindingCommandRegistration, CallBindingInstruction, Gl as CallBindingRendererRegistration, ur as CaptureBindingCommand, pl as CaptureBindingCommandRegistration, Co as Case, CheckedObserver, Ne as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, mr as ClassBindingCommand, wl as ClassBindingCommandRegistration, Qt as ColonPrefixedBindAttributePattern, tl as ColonPrefixedBindAttributePatternRegistration, Yn as CommandType, ComputedWatcher, Controller, ri as CustomAttribute, CustomAttributeDefinition, Xl as CustomAttributeRendererRegistration, Pi as CustomElement, CustomElementDefinition, Kl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Mo as DebounceBindingBehaviorRegistration, or as DefaultBindingCommand, ll as DefaultBindingCommandRegistration, yl as DefaultBindingLanguage, nl as DefaultBindingSyntax, Ao as DefaultCase, Zo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, uh as DefaultRenderers, zl as DefaultResources, gh as DefinitionType, ar as DelegateBindingCommand, gl as DelegateBindingCommandRegistration, DialogCloseResult, Ih as DialogConfiguration, DialogController, yh as DialogDeactivationStatuses, Th as DialogDefaultConfiguration, DialogOpenResult, DialogService, Zt as DotSeparatedAttributePattern, il as DotSeparatedAttributePatternRegistration, Else, Rl as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, Focus, hr as ForBindingCommand, hl as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Ho as FromViewBindingBehaviorRegistration, nr as FromViewBindingCommand, cl as FromViewBindingCommandRegistration, So as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, Fs as IAppRoot, qe as IAppTask, re as IAttrMapper, Ht as IAttributeParser, Wt as IAttributePattern, ln as IAuSlotsInfo, mh as IAurelia, Rs as IController, vh as IDialogController, bh as IDialogDom, wh as IDialogDomRenderer, xh as IDialogGlobalSettings, ph as IDialogService, rn as IEventDelegator, Hs as IEventTarget, en as IHistory, Bs as IHydrationContext, cn as IInstruction, Yi as ILifecycleHooks, Dn as IListenerBehaviorOptions, tn as ILocation, Ws as INode, Yo as INodeObserverLocatorRegistration, ie as IPlatform, on as IProjections, zs as IRenderLocation, fn as IRenderer, cs as IRendering, se as ISVGAnalyzer, Vo as ISanitizer, Wi as IShadowDOMGlobalStyles, Ni as IShadowDOMStyles, _t as ISyntaxInterpreter, un as ITemplateCompiler, $r as ITemplateCompilerHooks, Ko as ITemplateCompilerRegistration, vr as ITemplateElementFactory, es as IViewFactory, hs as IViewLocator, Dh as IWcElementRegistry, Qs as IWindow, _s as IWorkTracker, If, Al as IfRegistration, hn as InstructionType, InterpolationBinding, Yl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Zl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Jl as LetElementRendererRegistration, Qi as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, sh as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, Gs as NodeType, NoopSVGAnalyzer, OneTimeBindingBehavior, No as OneTimeBindingBehaviorRegistration, ir as OneTimeBindingCommand, al as OneTimeBindingCommandRegistration, Bo as PendingTemplateController, Portal, Ro as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Ql as PropertyBindingRendererRegistration, Jt as RefAttributePattern, el as RefAttributePatternRegistration, RefBinding, dl as RefBindingCommandRegistration, RefBindingInstruction, th as RefBindingRendererRegistration, Eo as RejectedTemplateController, RenderPlan, Rendering, Repeat, Bl as RepeatRegistration, SVGAnalyzer, Jo as SVGAnalyzerRegistration, Fo as SanitizeValueConverter, kl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Vl as SelfBindingBehaviorRegistration, SetAttributeInstruction, rh as SetAttributeRendererRegistration, SetClassAttributeInstruction, oh as SetClassAttributeRendererRegistration, SetPropertyInstruction, eh as SetPropertyRendererRegistration, SetStyleAttributeInstruction, lh as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, rl as ShortHandBindingSyntax, SignalBindingBehavior, zo as SignalBindingBehaviorRegistration, fh as StandardConfiguration, Cs as State, StyleAttributeAccessor, dr as StyleBindingCommand, bl as StyleBindingCommandRegistration, Hi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, hh as StylePropertyBindingRendererRegistration, ko as Switch, TemplateCompiler, Lr as TemplateCompilerHooks, ih as TemplateControllerRendererRegistration, TextBindingInstruction, ch as TextBindingRendererRegistration, ThrottleBindingBehavior, Go as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, Wo as ToViewBindingBehaviorRegistration, sr as ToViewBindingCommand, ul as ToViewBindingCommandRegistration, cr as TriggerBindingCommand, ml as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Xo as TwoWayBindingBehaviorRegistration, rr as TwoWayBindingCommand, fl as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, Fl as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, ve as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, ks as ViewModelKind, _o as ViewValueConverter, Cl as ViewValueConverterRegistration, os as Views, ci as Watch, WcCustomElementRegistry, With, Sl as WithRegistration, Vt as alias, Pt as allResources, In as applyBindingBehavior, we as astEvaluator, zt as attributePattern, At as bindable, ce as bindingBehavior, Zn as bindingCommand, qi as capture, Fe as children, Et as coercer, fi as containerless, Zs as convertToRenderLocation, Po as createElement, Fi as cssModules, Ye as customAttribute, ai as customElement, Ks as getEffectiveParentNode, Ms as getRef, bs as isCustomElementController, xs as isCustomElementViewModel, an as isInstruction, Js as isRenderLocation, ts as lifecycleHooks, Li as processContent, Ft as registerAliases, dn as renderer, Ys as setEffectiveParentNode, Ns as setRef, _i as shadowCSS, mi as strict, Ur as templateCompilerHooks, Ze as templateController, ui as useShadowDOM, me as valueConverter, ls as view, oi as watch };

