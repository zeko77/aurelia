import { subscriberCollection as t, withFlushQueue as e, connectable as i, ConnectableSwitcher as s, ProxyObservable as n, Scope as r, ICoercionConfiguration as o, IObserverLocator as l, IExpressionParser as h, AccessScopeExpression as c, DelegationStrategy as a, BindingBehaviorExpression as u, PrimitiveLiteralExpression as f, ISignaler as d, PropertyAccessor as m, INodeObserverLocator as g, SetterObserver as p, IDirtyChecker as v, applyMutationsToIndices as w, getCollectionObserver as b, BindingContext as x, synchronizeIndices as y } from "../../../runtime/dist/native-modules/index.mjs";

export { LifecycleFlags } from "../../../runtime/dist/native-modules/index.mjs";

import { Protocol as k, getPrototypeChain as C, firstDefined as A, kebabCase as R, noop as B, Registration as S, DI as E, emptyArray as I, all as T, IPlatform as D, mergeArrays as $, fromAnnotationOrDefinitionOrTypeOrDefault as P, fromDefinitionOrDefault as O, pascalCase as L, fromAnnotationOrTypeOrDefault as q, IContainer as U, nextId as V, optional as F, InstanceProvider as _, resolveAll as j, ILogger as M, onResolve as N, camelCase as W, toArray as H, emptyObject as z, IServiceLocator as G, compareNumber as X, transient as K } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as Y, isObject as Z } from "../../../metadata/dist/native-modules/index.mjs";

import { TaskAbortError as J } from "../../../platform/dist/native-modules/index.mjs";

import { BrowserPlatform as Q } from "../../../platform-browser/dist/native-modules/index.mjs";

function tt(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function et(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

var it;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(it || (it = {}));

const st = Y.getOwn;

const nt = Y.hasOwn;

const rt = Y.define;

const {annotation: ot, resource: lt} = k;

const ht = ot.keyFor;

const ct = lt.keyFor;

const at = lt.appendTo;

const ut = ot.appendTo;

const ft = ot.getKeys;

const dt = () => Object.create(null);

const mt = Object.prototype.hasOwnProperty;

const gt = dt();

const pt = (t, e, i) => {
    if (true === gt[e]) return true;
    if (!bt(e)) return false;
    const s = e.slice(0, 5);
    return gt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const vt = t => t instanceof Promise;

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
        rt(Bt, BindableDefinition.create(e, t, i), t.constructor, e);
        ut(t.constructor, St.keyFrom(e));
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

const Bt = ht("bindable");

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
                if (!nt(Bt, t, n)) ut(t, St.keyFrom(n));
                rt(Bt, e, t, n);
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
            o = ft(h).filter(Rt);
            l = o.length;
            for (c = 0; c < l; ++c) i[r++] = st(Bt, h, o[c].slice(e));
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
        return new BindableDefinition(A(i.attribute, R(t)), A(i.callback, `${t}Changed`), A(i.mode, it.toView), A(i.primary, false), A(i.property, t), A(i.set, Tt(t, e, i)));
    }
}

function Et(t, e, i) {
    It.define(t, e);
}

const It = {
    key: ht("coercer"),
    define(t, e) {
        rt(It.key, t[e].bind(t), t);
    },
    for(t) {
        return st(It.key, t);
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
        this.f = 0;
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
        $t = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, $t, this.f);
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

const qt = S.instance;

const Ut = S.callback;

const Vt = S.transient;

function Ft(...t) {
    return function(e) {
        const i = ht("aliases");
        const s = st(i, e);
        if (void 0 === s) rt(i, t, e); else s.push(...t);
    };
}

function _t(t, e, i, s) {
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
        this.q = {};
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

const jt = E.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        this.U = {};
        this.V = t;
        const i = this.F = {};
        const s = e.reduce(((t, e) => {
            const s = Kt(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), I);
        t.add(s);
    }
    parse(t, e) {
        let i = this.U[t];
        if (null == i) i = this.U[t] = this.V.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.F[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ jt, T(Wt) ];

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

const Gt = ct("attribute-pattern");

const Xt = "attribute-pattern-definitions";

const Kt = t => k.annotation.get(t, Xt);

const Yt = Object.freeze({
    name: Gt,
    definitionAnnotationKey: Xt,
    define(t, e) {
        const i = new AttributePatternResourceDefinition(e);
        rt(Gt, i, e);
        at(e, Gt);
        k.annotation.set(e, Xt, t);
        ut(e, Xt);
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

Zt = tt([ zt({
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

Jt = tt([ zt({
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

Qt = tt([ zt({
    pattern: ":PART",
    symbols: ":"
}) ], Qt);

let te = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

te = tt([ zt({
    pattern: "@PART",
    symbols: "@"
}) ], te);

let ee = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

ee = tt([ zt({
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
    const e = dt();
    let i;
    for (i of t) e[i] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this._ = Object.assign(dt(), {
            a: ne([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: ne([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: dt(),
            altGlyphDef: ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: dt(),
            altGlyphItem: ne([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: dt(),
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
            glyphref: dt(),
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
        this.j = ne([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.M = ne([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this._;
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
        return true === this.j[t.nodeName] && true === this.M[e] || true === this._[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ ie ];

const re = E.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = dt();
        this.W = dt();
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
            s = (e = this.N)[n] ?? (e[n] = dt());
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
        return this.N[t.nodeName]?.[e] ?? this.W[e] ?? (pt(t, e, this.svg) ? e : null);
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
        _t(s, de, i, t);
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
    updateTarget(t, e) {
        this.binding.updateTarget(t, e);
    }
    updateSource(t, e) {
        this.binding.updateSource(t, e);
    }
    callSource(t) {
        return this.binding.callSource(t);
    }
    handleChange(t, e, i) {
        this.binding.handleChange(t, e, i);
    }
    handleCollectionChange(t, e) {
        this.binding.handleCollectionChange(t, e);
    }
    observe(t, e) {
        this.binding.observe(t, e);
    }
    observeCollection(t) {
        this.binding.observeCollection(t);
    }
    $bind(t, e) {
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.binding.$unbind(t);
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

const ue = ct("binding-behavior");

const fe = (t, e) => st(ht(e), t);

const de = Object.freeze({
    name: ue,
    keyFrom(t) {
        return `${ue}:${t}`;
    },
    isType(t) {
        return wt(t) && nt(ue, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        rt(ue, i, i.Type);
        rt(ue, i, i);
        at(e, ue);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(ue, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
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
        _t(s, ve, i, t);
    }
}

const ge = ct("value-converter");

const pe = (t, e) => st(ht(e), t);

const ve = Object.freeze({
    name: ge,
    keyFrom: t => `${ge}:${t}`,
    isType(t) {
        return wt(t) && nt(ge, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        rt(ge, i, i.Type);
        rt(ge, i, i);
        at(e, ge);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(ge, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: pe
});

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, i) {
        const s = this.b;
        if (t !== s.ast.evaluate(s.$scope, s, null)) s.updateSource(t, i);
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
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.ast.hasBind) this.ast.bind(t, e, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), t, this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
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

we(true)(CallBinding);

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
        if (0 === (32 & e)) this.K();
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
                this.f = 0;
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
        this.subs.notify(this.v, Ce, this.f);
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

const {oneTime: Ae, toView: Re, fromView: Be} = it;

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
        this.persistentFlags = 0;
        this.value = void 0;
        this.Y = 0;
        this.Z = t;
        this.target = r;
        this.oL = i;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const s = this.mode;
        const n = this.interceptor;
        const r = this.ast;
        const o = this.$scope;
        const l = this.targetObserver;
        const h = 1 !== this.Z.state && (4 & l.type) > 0;
        let c = false;
        let a;
        if (10082 !== r.$kind || this.obs.count > 1) {
            c = 0 === (s & Ae);
            if (c) this.obs.version++;
            t = r.evaluate(o, this, n);
            if (c) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (h) {
                a = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    n.updateTarget(t, i);
                }), Ee);
                a?.cancel();
            } else n.updateTarget(t, i);
        }
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.persistentFlags = 33 & t;
        this.$scope = e;
        this.Y++;
        let i = this.ast;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        let s = this.targetObserver;
        if (!s) s = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        i = this.ast;
        const n = this.mode;
        const r = this.interceptor;
        let o = false;
        if (n & Se) {
            o = (n & Re) > 0;
            r.updateTarget(this.value = i.evaluate(e, this, o ? r : null), t);
        }
        if (n & Be) s.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r)));
        this.Y++;
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
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

const {toView: Ie} = it;

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
        this.Z = t;
        this.oL = i;
        this.targetObserver = i.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, i, this);
    }
    updateTarget(t, e) {
        const i = this.partBindings;
        const s = this.ast.parts;
        const n = i.length;
        let r = "";
        let o = 0;
        if (1 === n) r = s[0] + i[0].value + s[1]; else {
            r = s[0];
            for (;n > o; ++o) r += i[o].value + s[o + 1];
        }
        const l = this.targetObserver;
        const h = 1 !== this.Z.state && (4 & l.type) > 0;
        let c;
        if (h) {
            c = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                l.setValue(r, e, this.target, this.targetProperty);
            }), Te);
            c?.cancel();
            c = null;
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
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const e = this.partBindings;
        const i = e.length;
        let s = 0;
        for (;i > s; ++s) e[s].interceptor.$unbind(t);
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
        this.mode = it.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.ast;
        const n = this.obs;
        const r = 10082 === s.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & Ie) > 0;
            if (o) n.version++;
            t = s.evaluate(this.$scope, this, o ? this.interceptor : null);
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
        if (this.ast.hasBind) this.ast.bind(t, e, this.interceptor);
        this.value = this.ast.evaluate(e, this, (this.mode & Ie) > 0 ? this.interceptor : null);
        if (this.value instanceof Array) this.observeCollection(this.value);
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
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
        this.mode = it.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.Y = 0;
        this.Z = t;
        this.oL = i;
    }
    updateTarget(t, e) {
        const i = this.target;
        const s = this.p.Node;
        const n = this.value;
        this.value = t;
        if (n instanceof s) n.parentNode?.removeChild(n);
        if (t instanceof s) {
            i.textContent = "";
            i.parentNode?.insertBefore(t, i);
        } else i.textContent = String(t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.ast;
        const n = this.obs;
        const r = 10082 === s.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & Ie) > 0;
            if (o) n.version++;
            i |= this.strict ? 1 : 0;
            t = s.evaluate(this.$scope, this, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t === this.value) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const l = 1 !== this.Z.state;
        if (l) this.queueUpdate(t, i); else this.updateTarget(t, i);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.value = this.ast.evaluate(this.$scope, this, (this.mode & Ie) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (t instanceof Array) this.observeCollection(t);
        const e = 0 === this.Y;
        if (e) this.queueUpdate(t, 0); else this.updateTarget(t, 0);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        this.Y++;
        if (this.ast.hasBind) this.ast.bind(t, e, this.interceptor);
        t |= this.strict ? 1 : 0;
        const i = this.value = this.ast.evaluate(e, this, (this.mode & Ie) > 0 ? this.interceptor : null);
        if (i instanceof Array) this.observeCollection(i);
        this.updateTarget(i, t);
        this.Y--;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.task?.cancel();
        this.task = null;
    }
    queueUpdate(t, e) {
        const i = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t, e);
        }), Te);
        i?.cancel();
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
        this.J = n;
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.target;
        const n = this.targetProperty;
        const r = s[n];
        this.obs.version++;
        t = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (t !== r) s[n] = t;
    }
    handleCollectionChange(t, e) {
        if (!this.isBound) return;
        const i = this.target;
        const s = this.targetProperty;
        const n = i[s];
        this.obs.version++;
        const r = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (r !== n) i[s] = r;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        this.target = this.J ? e.bindingContext : e.overrideContext;
        const i = this.ast;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        this.target[this.targetProperty] = this.ast.evaluate(e, this, this.interceptor);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.ast;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

i(LetBinding);

we(true)(LetBinding);

const {oneTime: De, toView: $e, fromView: Pe} = it;

const Oe = $e | De;

const Le = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
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
        this.targetObserver = void 0;
        this.persistentFlags = 0;
        this.task = null;
        this.targetSubscriber = null;
        this.Z = t;
        this.oL = i;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const s = 1 !== this.Z.state && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        let r = false;
        if (10082 !== this.ast.$kind || n.count > 1) {
            r = this.mode > De;
            if (r) n.version++;
            t = this.ast.evaluate(this.$scope, this, this.interceptor);
            if (r) n.clear();
        }
        if (s) {
            qe = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), Le);
            qe?.cancel();
            qe = null;
        } else this.interceptor.updateTarget(t, i);
    }
    handleCollectionChange(t, e) {
        if (!this.isBound) return;
        const i = 1 !== this.Z.state && (4 & this.targetObserver.type) > 0;
        this.obs.version++;
        const s = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (i) {
            qe = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(s, e);
                this.task = null;
            }), Le);
            qe?.cancel();
            qe = null;
        } else this.interceptor.updateTarget(s, e);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 33 & t;
        this.$scope = e;
        let i = this.ast;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        const s = this.oL;
        const n = this.mode;
        let r = this.targetObserver;
        if (!r) {
            if (n & Pe) r = s.getObserver(this.target, this.targetProperty); else r = s.getAccessor(this.target, this.targetProperty);
            this.targetObserver = r;
        }
        i = this.ast;
        const o = this.interceptor;
        const l = (n & $e) > 0;
        if (n & Oe) o.updateTarget(i.evaluate(e, this, l ? o : null), t);
        if (n & Pe) {
            r.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(o)));
            if (!l) o.updateSource(r.getValue(this.target, this.targetProperty), t);
        }
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        qe = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != qe) {
            qe.cancel();
            qe = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

i(PropertyBinding);

we(true, false)(PropertyBinding);

let qe = null;

class RefBinding {
    constructor(t, e, i) {
        this.locator = t;
        this.ast = e;
        this.target = i;
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
        if (this.ast.hasBind) this.ast.bind(t, e, this);
        this.ast.assign(this.$scope, this, this.target);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        let e = this.ast;
        if (e.evaluate(this.$scope, this, null) === this.target) e.assign(this.$scope, this, null);
        e = this.ast;
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

const Ue = E.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(qt(Ue, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Ve = Object.freeze({
    creating: Fe("creating"),
    hydrating: Fe("hydrating"),
    hydrated: Fe("hydrated"),
    activating: Fe("activating"),
    activated: Fe("activated"),
    deactivating: Fe("deactivating"),
    deactivated: Fe("deactivated")
});

function Fe(t) {
    function e(e, i) {
        if (wt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function _e(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        rt(Me, ChildrenDefinition.create(e, i), t.constructor, e);
        ut(t.constructor, Ne.keyFrom(e));
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

function je(t) {
    return t.startsWith(Me);
}

const Me = ht("children-observer");

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
            o = ft(h).filter(je);
            l = o.length;
            for (let t = 0; t < l; ++t) i[r++] = st(Me, h, o[t].slice(e));
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
        this.subs.notify(this.children, void 0, 0);
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
        return new CustomAttributeDefinition(e, A(ti(e, "name"), i), $(ti(e, "aliases"), s.aliases, e.aliases), Qe(i), A(ti(e, "defaultBindingMode"), s.defaultBindingMode, e.defaultBindingMode, it.toView), A(ti(e, "isTemplateController"), s.isTemplateController, e.isTemplateController, false), St.from(e, ...St.getAll(e), ti(e, "bindables"), e.bindables, s.bindables), A(ti(e, "noMultiBindings"), s.noMultiBindings, e.noMultiBindings, false), $(ci.getAnnotation(e), e.watches), $(ti(e, "dependencies"), s.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Vt(i, e).register(t);
        Lt(i, e).register(t);
        _t(s, ri, i, t);
    }
}

const Je = ct("custom-attribute");

const Qe = t => `${Je}:${t}`;

const ti = (t, e) => st(ht(e), t);

const ei = t => wt(t) && nt(Je, t);

const ii = (t, e) => Ms(t, Qe(e)) ?? void 0;

const si = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    rt(Je, i, i.Type);
    rt(Je, i, i);
    at(e, Je);
    return i.Type;
};

const ni = t => {
    const e = st(Je, t);
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
        rt(ht(e), i, t);
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

const hi = ht("watch");

const ci = Object.freeze({
    name: hi,
    add(t, e) {
        let i = st(hi, t);
        if (null == i) rt(hi, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return st(hi, t) ?? li;
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
    const e = st(ki, t);
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
            return new CustomElementDefinition(e, s, $(i.aliases), O("key", i, (() => Ci(s))), O("cache", i, vi), O("capture", i, bi), O("template", i, wi), $(i.instructions), $(i.dependencies), O("injectable", i, wi), O("needsCompile", i, xi), $(i.surrogates), St.from(e, i.bindables), Ne.from(i.childrenObservers), O("containerless", i, bi), O("isStrictBinding", i, bi), O("shadowOptions", i, wi), O("hasSlots", i, bi), O("enhance", i, bi), O("watches", i, yi), q("processContent", e, wi));
        }
        if (bt(t)) return new CustomElementDefinition(e, t, $(Ii(e, "aliases"), e.aliases), Ci(t), q("cache", e, vi), q("capture", e, bi), q("template", e, wi), $(Ii(e, "instructions"), e.instructions), $(Ii(e, "dependencies"), e.dependencies), q("injectable", e, wi), q("needsCompile", e, xi), $(Ii(e, "surrogates"), e.surrogates), St.from(e, ...St.getAll(e), Ii(e, "bindables"), e.bindables), Ne.from(...Ne.getAll(e), Ii(e, "childrenObservers"), e.childrenObservers), q("containerless", e, bi), q("isStrictBinding", e, bi), q("shadowOptions", e, wi), q("hasSlots", e, bi), q("enhance", e, bi), $(ci.getAnnotation(e), e.watches), q("processContent", e, wi));
        const i = O("name", t, Ai);
        return new CustomElementDefinition(e, i, $(Ii(e, "aliases"), t.aliases, e.aliases), Ci(i), P("cache", t, e, vi), P("capture", t, e, bi), P("template", t, e, wi), $(Ii(e, "instructions"), t.instructions, e.instructions), $(Ii(e, "dependencies"), t.dependencies, e.dependencies), P("injectable", t, e, wi), P("needsCompile", t, e, xi), $(Ii(e, "surrogates"), t.surrogates, e.surrogates), St.from(e, ...St.getAll(e), Ii(e, "bindables"), e.bindables, t.bindables), Ne.from(...Ne.getAll(e), Ii(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), P("containerless", t, e, bi), P("isStrictBinding", t, e, bi), P("shadowOptions", t, e, wi), P("hasSlots", t, e, bi), P("enhance", t, e, bi), $(t.watches, ci.getAnnotation(e), e.watches), P("processContent", t, e, wi));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (gi.has(t)) return gi.get(t);
        const e = CustomElementDefinition.create(t);
        gi.set(t, e);
        rt(ki, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            Vt(i, e).register(t);
            Lt(i, e).register(t);
            _t(s, Pi, i, t);
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

const ki = ct("custom-element");

const Ci = t => `${ki}:${t}`;

const Ai = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Ri = (t, e, i) => {
    rt(ht(e), i, t);
};

const Bi = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    rt(ki, i, i.Type);
    rt(ki, i, i);
    at(i.Type, ki);
    return i.Type;
};

const Si = t => wt(t) && nt(ki, t);

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

const Ii = (t, e) => st(ht(e), t);

const Ti = t => {
    const e = st(ki, t);
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

const Oi = ht("processContent");

function Li(t) {
    return void 0 === t ? function(t, e, i) {
        rt(Oi, qi(t, e), t);
    } : function(e) {
        t = qi(e, t);
        const i = st(ki, e);
        if (void 0 !== i) i.processContent = t; else rt(Oi, t, e);
        return e;
    };
}

function qi(t, e) {
    if (bt(e)) e = t[e];
    if (!wt(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function Ui(t) {
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
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (32 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.et;
            const i = Vi(t);
            let s = this.it;
            this.ov = t;
            if (i.length > 0) this.st(i);
            this.it += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!mt.call(e, t) || e[t] !== s) continue;
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

function Vi(t) {
    if (bt(t)) return Fi(t);
    if ("object" !== typeof t) return I;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...Vi(t[s]));
            return i;
        } else return I;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...Fi(i)); else e.push(i);
    return e;
}

function Fi(t) {
    const e = t.match(/\S+/g);
    if (null === e) return I;
    return e;
}

function _i(...t) {
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
                this.element.className = Vi(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ Ws ], e));
        t.register(s);
    }
}

function ji(...t) {
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
        t.register(qt(Ni, i.createStyles(this.css, e)));
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
        return Ve.creating(U, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(Mi);
                e.register(qt(Wi, i.createStyles(t.sharedStyles, null)));
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

const Ji = ht("lifecycle-hooks");

const Qi = Object.freeze({
    name: Ji,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        rt(Ji, i, e);
        at(e, Ji);
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
                r = st(Ji, n.constructor);
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

const rs = ct("views");

const os = Object.freeze({
    name: rs,
    has(t) {
        return wt(t) && (nt(rs, t) || "$views" in t);
    },
    get(t) {
        if (wt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(ss).map(ns);
            for (const e of i) os.add(t, e);
        }
        let e = st(rs, t);
        if (void 0 === e) rt(rs, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = st(rs, t);
        if (void 0 === s) rt(rs, s = [ i ], t); else s.push(i);
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
        }), dt()) : this.rs;
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

Rendering.inject = [ U ];

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
        this.id = V("au$component");
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
        const l = t.get(F(Bs));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        t.registerResolver(Bs, new _("IHydrationContext", new HydrationContext(o, s, l)));
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
        if (null !== o.injectable) i.registerResolver(o.injectable, new _("definition.injectable", n));
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
        i |= 2;
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
        if (this.isStrictBinding) i |= 1;
        this.$initiator = t;
        this.$flags = i;
        this.Bt();
        let n;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) n = j(...this.lifecycleHooks.binding.map(Ds, this));
        if (this.hooks.hasBinding) n = j(n, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (vt(n)) {
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
                this.bindings[t].$bind(this.$flags, this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = j(...this.lifecycleHooks.bound.map($s, this));
        if (this.hooks.hasBound) i = j(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (vt(i)) {
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) e = j(...this.lifecycleHooks.attaching.map(Ps, this));
        if (this.hooks.hasAttaching) e = j(e, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (vt(e)) {
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) n = j(...this.lifecycleHooks.detaching.map(Ls, this));
        if (this.hooks.hasDetaching) n = j(n, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (vt(n)) {
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
            Us = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Us();
            Us = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            Vs = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Vs(t);
            Vs = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    Bt() {
        ++this.xt;
        if (this.$initiator !== this) this.parent.Bt();
    }
    Dt() {
        if (0 === --this.xt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Fs = j(...this.lifecycleHooks.attached.map(Os, this));
            if (this.hooks.hasAttached) Fs = j(Fs, this.viewModel.attached(this.$initiator, this.$flags));
            if (vt(Fs)) {
                this.St();
                Fs.then((() => {
                    this.state = 2;
                    this.Ot();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                Fs = void 0;
                return;
            }
            Fs = void 0;
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
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) e = j(...t.lifecycleHooks.unbinding.map(qs, this));
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = j(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (vt(e)) {
                    this.St();
                    this.Lt();
                    e.then((() => {
                        this.qt();
                    })).catch((t => {
                        this.Et(t);
                    }));
                }
                e = void 0;
                t = t.next;
            }
            this.qt();
        }
    }
    Lt() {
        ++this.kt;
    }
    qt() {
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
    return Z(t) && Si(t.constructor);
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

function qs(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let Us;

let Vs;

let Fs;

const _s = E.createInterface("IAppRoot");

const js = E.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.Ut = 0;
        this.Vt = null;
        this.Ot = null;
        this.Ft = t.scopeTo("WorkTracker");
    }
    start() {
        this.Ft.trace(`start(stack:${this.Ut})`);
        ++this.Ut;
    }
    finish() {
        this.Ft.trace(`finish(stack:${this.Ut})`);
        if (0 === --this.Ut) {
            const t = this.Ot;
            if (null !== t) {
                this.Ot = this.Vt = null;
                t();
            }
        }
    }
    wait() {
        this.Ft.trace(`wait(stack:${this.Ut})`);
        if (null === this.Vt) {
            if (0 === this.Ut) return Promise.resolve();
            this.Vt = new Promise((t => {
                this.Ot = t;
            }));
        }
        return this.Vt;
    }
}

WorkTracker.inject = [ M ];

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this._t = void 0;
        this.host = t.host;
        this.work = i.get(js);
        s.prepare(this);
        i.registerResolver(e.HTMLElement, i.registerResolver(e.Element, i.registerResolver(Ws, new _("ElementResolver", t.host))));
        this._t = N(this.jt("creating"), (() => {
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
            return N(this.jt("hydrating"), (() => {
                o.hS(null);
                return N(this.jt("hydrated"), (() => {
                    o.hC();
                    this._t = void 0;
                }));
            }));
        }));
    }
    activate() {
        return N(this._t, (() => N(this.jt("activating"), (() => N(this.controller.activate(this.controller, null, 2, void 0), (() => this.jt("activated")))))));
    }
    deactivate() {
        return N(this.jt("deactivating"), (() => N(this.controller.deactivate(this.controller, null, 0), (() => this.jt("deactivated")))));
    }
    jt(t) {
        return j(...this.container.getAll(Ue).reduce(((e, i) => {
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
    if (t.has(_s, true)) return t.get(_s).host;
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
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        const i = this.ast;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        if (this.Mt.strategy === a.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Hs), this.target, this.targetEvent, this, sn[this.Mt.strategy]);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.ast;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
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
    handleChange(t, e, i) {
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
        if (void 0 === i) e.set(t, i = dt());
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
        this.Qt = dt();
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
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value, 2); else s[i.to] = i.value;
    }
};

vn = tt([ dn("re") ], vn);

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
        f.registerResolver(n, new _(s.key, r));
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

wn = tt([ dn("ra") ], wn);

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

bn = tt([ dn("rb") ], bn);

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

xn = tt([ dn("rc") ], xn);

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

yn = tt([ dn("rd") ], yn);

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

kn = tt([ dn("rh") ], kn);

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

Cn = tt([ dn("rj") ], Cn);

let An = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = mn(this.ep, i.from, 1);
        const r = new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, gn(e), i.to, it.toView);
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

An = tt([ dn("rf") ], An);

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

Rn = tt([ dn("rg") ], Rn);

let Bn = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, gn(e), i.to, it.toView);
        t.addBinding(38963 === s.iterable.$kind ? In(n, s.iterable, t.container) : n);
    }
};

Bn.inject = [ h, l, ie ];

Bn = tt([ dn("rk") ], Bn);

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

Tn = tt([ dn("ha") ], Tn);

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

$n = tt([ dn("hb") ], $n);

let Pn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Pn = tt([ dn("he") ], Pn);

let On = class SetClassAttributeRenderer {
    render(t, e, i) {
        Fn(e.classList, i.value);
    }
};

On = tt([ dn("hf") ], On);

let Ln = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Ln = tt([ dn("hg") ], Ln);

let qn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, it.toView);
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

qn.inject = [ h, l, ie ];

qn = tt([ dn("hd") ], qn);

let Un = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = mn(this.ep, i.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, it.toView);
        t.addBinding(38963 === s.$kind ? In(n, s, t.container) : n);
    }
};

Un.inject = [ ie, h, l ];

Un = tt([ dn("hc") ], Un);

let Vn = class SpreadRenderer {
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
            const n = _n(s);
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

Vn = tt([ dn("hs") ], Vn);

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
    $bind(t, e) {
        if (this.isBound) return;
        this.isBound = true;
        const i = this.$scope = this.ne.controller.scope.parentScope ?? void 0;
        if (null == i) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.se.forEach((e => e.$bind(t, i)));
    }
    $unbind(t) {
        this.se.forEach((e => e.$unbind(t)));
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

function Fn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const _n = t => new SpreadBinding([], t);

const jn = "IController";

const Mn = "IInstruction";

const Nn = "IRenderLocation";

const Wn = "IAuSlotsInfo";

function Hn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    o.registerResolver(t.HTMLElement, o.registerResolver(t.Element, o.registerResolver(Ws, new _("ElementResolver", i))));
    o.registerResolver(Rs, new _(jn, e));
    o.registerResolver(cn, new _(Mn, s));
    o.registerResolver(zs, null == n ? Gn : new RenderLocationProvider(n));
    o.registerResolver(es, Xn);
    o.registerResolver(ln, null == r ? Kn : new _(Wn, r));
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
    h.registerResolver(t.HTMLElement, h.registerResolver(t.Element, h.registerResolver(Ws, new _("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    h.registerResolver(Rs, new _(jn, i));
    h.registerResolver(cn, new _(Mn, n));
    h.registerResolver(zs, null == o ? Gn : new _(Nn, o));
    h.registerResolver(es, null == r ? Xn : new ViewFactoryProvider(r));
    h.registerResolver(ln, null == l ? Kn : new _(Wn, l));
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

const Kn = new _(Wn, new AuSlotsInfo(I));

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
        _t(s, er, i, t);
    }
}

const Jn = ct("binding-command");

const Qn = t => `${Jn}:${t}`;

const tr = (t, e) => st(ht(e), t);

const er = Object.freeze({
    name: Jn,
    keyFrom: Qn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        rt(Jn, i, i.Type);
        rt(Jn, i, i);
        at(e, Jn);
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
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, it.oneTime);
    }
};

ir.inject = [ re, h ];

ir = tt([ Zn("one-time") ], ir);

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
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, it.toView);
    }
};

sr.inject = [ re, h ];

sr = tt([ Zn("to-view") ], sr);

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
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, it.fromView);
    }
};

nr.inject = [ re, h ];

nr = tt([ Zn("from-view") ], nr);

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
        return new PropertyBindingInstruction(this.ep.parse(s, 8), i, it.twoWay);
    }
};

rr.inject = [ re, h ];

rr = tt([ Zn("two-way") ], rr);

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
            n = this.m.isTwoWay(t.node, r) ? it.twoWay : it.toView;
            r = this.m.map(t.node, r) ?? W(r);
        } else {
            if ("" === o && 1 === t.def.type) o = W(r);
            s = t.def.defaultBindingMode;
            n = i.mode === it.default || null == i.mode ? null == s || s === it.default ? it.toView : s : i.mode;
            r = i.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, n);
    }
};

or.inject = [ re, h ];

or = tt([ Zn("bind") ], or);

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

lr = tt([ Zn("call") ], lr);

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

hr = tt([ Zn("for") ], hr);

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

cr = tt([ Zn("trigger") ], cr);

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

ar = tt([ Zn("delegate") ], ar);

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

ur = tt([ Zn("capture") ], ur);

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

fr = tt([ Zn("attr") ], fr);

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

dr = tt([ Zn("style") ], dr);

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

mr = tt([ Zn("class") ], mr);

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

gr = tt([ Zn("ref") ], gr);

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

pr = tt([ Zn("...$attrs") ], pr);

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
        let q;
        let U = null;
        let V;
        let F;
        let _;
        let j;
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
            U = e.ue(C);
            _ = C.target;
            j = C.rawValue;
            if (u && (!f || f && u(_))) {
                if (null != U && 1 & U.type) {
                    g();
                    d.push(C);
                    continue;
                }
                H = "au-slot" !== _ && "slot" !== _;
                if (H) {
                    V = BindablesInfo.from(h, false);
                    if (null == V.attrs[_] && !e.fe(_)?.isTemplateController) {
                        g();
                        d.push(C);
                        continue;
                    }
                }
            }
            if (null !== U && 1 & U.type) {
                Cr.node = t;
                Cr.attr = C;
                Cr.bindable = null;
                Cr.def = null;
                (A ?? (A = [])).push(U.build(Cr));
                g();
                continue;
            }
            S = e.fe(_);
            if (null !== S) {
                V = BindablesInfo.from(S, true);
                E = false === S.noMultiBindings && null === U && br(j);
                if (E) $ = this.de(t, j, S, e); else {
                    F = V.primary;
                    if (null === U) {
                        L = m.parse(j, 1);
                        $ = [ null === L ? new SetPropertyInstruction(j, F.property) : new InterpolationInstruction(L, F.property) ];
                    } else {
                        Cr.node = t;
                        Cr.attr = C;
                        Cr.bindable = F;
                        Cr.def = S;
                        $ = [ U.build(Cr) ];
                    }
                }
                g();
                if (S.isTemplateController) (P ?? (P = [])).push(new HydrateTemplateController(kr, this.resolveResources ? S : S.name, void 0, $)); else (D ?? (D = [])).push(new HydrateAttributeInstruction(this.resolveResources ? S : S.name, null != S.aliases && S.aliases.includes(_) ? _ : void 0, $));
                continue;
            }
            if (null === U) {
                if (c) {
                    V = BindablesInfo.from(h, false);
                    T = V.attrs[_];
                    if (void 0 !== T) {
                        L = m.parse(j, 1);
                        (R ?? (R = [])).push(null == L ? new SetPropertyInstruction(j, T.property) : new InterpolationInstruction(L, T.property));
                        g();
                        continue;
                    }
                }
                L = m.parse(j, 1);
                if (null != L) {
                    g();
                    (A ?? (A = [])).push(new InterpolationInstruction(L, e.m.map(t, _) ?? W(_)));
                }
                continue;
            }
            g();
            if (c) {
                V = BindablesInfo.from(h, false);
                T = V.attrs[_];
                if (void 0 !== T) {
                    Cr.node = t;
                    Cr.attr = C;
                    Cr.bindable = T;
                    Cr.def = h;
                    (R ?? (R = [])).push(U.build(Cr));
                    continue;
                }
            }
            Cr.node = t;
            Cr.attr = C;
            Cr.bindable = null;
            Cr.def = null;
            (A ?? (A = [])).push(U.build(Cr));
        }
        xr();
        if (this.be(t) && null != A && A.length > 1) this.xe(t, A);
        if (c) {
            q = new HydrateElementInstruction(this.resolveResources ? h : h.name, void 0, R ?? I, null, N, d);
            if (l === Vr) {
                const i = t.getAttribute("name") || Ur;
                const s = e.h("template");
                const n = e.ye();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.he(s.content, n);
                q.auSlot = {
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
        if (null != A || null != q || null != D) {
            v = I.concat(q ?? I, D ?? I, A ?? I);
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
                f = 1 === A.nodeType ? A.getAttribute(Vr) : null;
                if (null !== f) A.removeAttribute(Vr);
                if (c) {
                    u = A.nextSibling;
                    if (!a) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = f || Ur] ?? (i[s] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = u;
                } else {
                    if (null !== f) {
                        f = f || Ur;
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
                q.projections = d;
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
                o = 1 === i.nodeType ? i.getAttribute(Vr) : null;
                if (null !== o) i.removeAttribute(Vr);
                if (c) {
                    s = i.nextSibling;
                    if (!a) {
                        w = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!w) ((n = f ?? (f = {}))[r = o || Ur] ?? (n[r] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== o) {
                        o = o || Ur;
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
                q.projections = u;
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
        this.Ae = dt();
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
        this.Ft = o ? s.Ft : e.get(M);
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

const Ar = Object.assign(dt(), {
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
            const n = dt();
            const r = e ? void 0 === t.defaultBindingMode ? it.default : t.defaultBindingMode : it.default;
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
        return it.oneTime;

      case "toView":
        return it.toView;

      case "fromView":
        return it.fromView;

      case "twoWay":
        return it.twoWay;

      case "default":
      default:
        return it.default;
    }
}

const $r = E.createInterface("ITemplateCompilerHooks");

const Pr = new WeakMap;

const Or = ct("compiler-hooks");

const Lr = Object.freeze({
    name: Or,
    define(t) {
        let e = Pr.get(t);
        if (void 0 === e) {
            Pr.set(t, e = new TemplateCompilerHooksDefinition(t));
            rt(Or, e, t);
            at(t, Or);
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

const qr = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Lr.define(t);
    }
};

const Ur = "default";

const Vr = "au-slot";

const Fr = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e, i) {
        Fr.set(i, i.mode);
        i.mode = this.mode;
    }
    unbind(t, e, i) {
        i.mode = Fr.get(i);
        Fr.delete(i);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(it.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(it.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(it.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(it.twoWay);
    }
}

ce("oneTime")(OneTimeBindingBehavior);

ce("toView")(ToViewBindingBehavior);

ce("fromView")(FromViewBindingBehavior);

ce("twoWay")(TwoWayBindingBehavior);

const _r = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: _r
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
        e?.cancel();
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const t = Number(this.firstArg.evaluate(e, this, null));
            this.opts.delay = isNaN(t) ? _r : t;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.task?.cancel();
        this.task = null;
        this.binding.$unbind(t);
    }
}

ce("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Jt = new Map;
        this.Re = t;
    }
    bind(t, e, i, ...s) {
        if (!("handleChange" in i)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Jt.set(i, s);
        let n;
        for (n of s) this.Re.addSignalListener(n, i);
    }
    unbind(t, e, i) {
        const s = this.Jt.get(i);
        this.Jt.delete(i);
        let n;
        for (n of s) this.Re.removeSignalListener(n, i);
    }
}

SignalBindingBehavior.inject = [ d ];

ce("signal")(SignalBindingBehavior);

const jr = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: jr
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.get(D);
        this.Be = this.p.taskQueue;
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
            this.task = this.Be.queueTask((() => {
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
    $bind(t, e) {
        if (null !== this.firstArg) {
            const t = Number(this.firstArg.evaluate(e, this, null));
            this.opts.delay = this.delay = isNaN(t) ? jr : t;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.task?.cancel();
        this.task = null;
        super.$unbind(t);
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
    setValue(t, e, i, s) {
        if (null == t) i.removeAttribute(s); else i.setAttribute(s, t);
    }
}

const Mr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, i) {
        i.targetObserver = Mr;
    }
    unbind(t, e, i) {
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
    bind(t, e, i) {
        if (!i.callSource || !i.targetEvent) throw new Error(`AUR0801`);
        i.selfEventCallSource = i.callSource;
        i.callSource = Nr;
    }
    unbind(t, e, i) {
        i.callSource = i.selfEventCallSource;
        i.selfEventCallSource = null;
    }
}

ce("self")(SelfBindingBehavior);

const Wr = dt();

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
    setValue(t, e, i, s) {
        if (null == t) i.removeAttributeNS(this.ns, s); else i.setAttributeNS(this.ns, s, t);
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
        this.Ee = void 0;
        this.Ie = void 0;
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
        this.Te();
        this.De();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.De();
    }
    handleChange(t, e, i) {
        this.De();
    }
    De() {
        const t = this.v;
        const e = this.o;
        const i = mt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Hr;
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
        const i = mt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Hr;
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
        this.Te();
    }
    stop() {
        this.handler.dispose();
        this.Ee?.unsubscribe(this);
        this.Ee = void 0;
        this.Ie?.unsubscribe(this);
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
        this.subs.notify(this.v, zr, this.f);
    }
    Te() {
        const t = this.o;
        (this.Ie ?? (this.Ie = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Ee?.unsubscribe(this);
        this.Ee = void 0;
        if ("checkbox" === t.type) (this.Ee = no(this.v, this.oL))?.subscribe(this);
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
        this.$e = void 0;
        this.Pe = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Kr(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Oe(t instanceof Array ? t : null);
        if (0 === (32 & e)) this.K();
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
        const i = Array.isArray(t);
        const s = e.matcher ?? Xr;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = mt.call(e, "model") ? e.model : e.value;
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
                if (r.selected) l.push(mt.call(r, "model") ? r.model : r.value);
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
                r = mt.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Le() {
        (this.Pe = new this.o.ownerDocument.defaultView.MutationObserver(this.qe.bind(this))).observe(this.o, Gr);
        this.Oe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ue() {
        this.Pe.disconnect();
        this.$e?.unsubscribe(this);
        this.Pe = this.$e = void 0;
        this.iO = false;
    }
    Oe(t) {
        this.$e?.unsubscribe(this);
        this.$e = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.$e = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    qe(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Le();
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
        this.subs.notify(this.v, Yr, 0);
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
        if (n.selected) e[e.length] = mt.call(n, "model") ? n.model : n.value;
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
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (32 & e)) this.K();
    }
    Ve(t) {
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
    Fe(t) {
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
            s.push(...this._e(e));
        }
        return s;
    }
    je(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this._e(t[s]));
            return i;
        }
        return I;
    }
    _e(t) {
        if (bt(t)) return this.Ve(t);
        if (t instanceof Array) return this.je(t);
        if (t instanceof Object) return this.Fe(t);
        return I;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const i = this._e(t);
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
                if (!mt.call(e, s) || e[s] !== n) continue;
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
        if (!this.handler.config.readonly && 0 === (32 & e)) this.K(e);
    }
    K(t) {
        if (this.H) {
            this.H = false;
            this.o[this.k] = this.v ?? this.handler.config.default;
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
        Jr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Jr, 0);
    }
}

t(ValueAttributeObserver);

e(ValueAttributeObserver);

let Jr;

const Qr = "http://www.w3.org/1999/xlink";

const to = "http://www.w3.org/XML/1998/namespace";

const eo = "http://www.w3.org/2000/xmlns/";

const io = Object.assign(dt(), {
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
        this.Me = dt();
        this.Ne = dt();
        this.We = dt();
        this.He = dt();
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
        const s = this.Me;
        let n;
        if (bt(t)) {
            n = s[t] ?? (s[t] = dt());
            if (null == n[e]) n[e] = new NodeObserverConfig(i); else ro(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = dt());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else ro(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ne;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else ro("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else ro("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.He || e in (this.We[t.tagName] ?? z)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
            return Mr;

          default:
            {
                const i = io[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (pt(t, e, this.svgAnalyzer)) return Mr;
                return so;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (bt(t)) {
            n = (i = this.We)[t] ?? (i[t] = dt());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.We)[e] ?? (s[e] = dt());
            n[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.He[e] = true;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const s = this.Me[t.tagName]?.[e] ?? this.Ne[e];
        if (null != s) return new s.type(t, e, new EventSubscriber(s), i, this.locator);
        const n = io[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (pt(t, e, this.svgAnalyzer)) return Mr;
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
    bind(t, e, i, ...s) {
        if (0 === s.length) throw new Error(`AUR0802`);
        if (i.mode !== it.twoWay && i.mode !== it.fromView) throw new Error(`AUR0803`);
        const n = this.oL.getObserver(i.target, i.targetProperty);
        if (!n.handler) throw new Error(`AUR0804`);
        i.targetObserver = n;
        const r = n.handler;
        n.originalHandler = r;
        n.handler = new EventSubscriber(new NodeObserverConfig({
            default: r.config.default,
            events: s,
            readonly: r.config.readonly
        }));
    }
    unbind(t, e, i) {
        i.targetObserver.handler.dispose();
        i.targetObserver.handler = i.targetObserver.originalHandler;
        i.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ l ];

ce("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.ze = t;
        this.p = e;
        this.Ge = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.Xe(); else this.Ge = true;
    }
    attached() {
        if (this.Ge) {
            this.Ge = false;
            this.Xe();
        }
        this.ze.addEventListener("focus", this);
        this.ze.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ze;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Ke) this.value = false;
    }
    Xe() {
        const t = this.ze;
        const e = this.Ke;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get Ke() {
        return this.ze === this.p.document.activeElement;
    }
}

Focus.inject = [ Ws, ie ];

tt([ At({
    mode: it.twoWay
}) ], Focus.prototype, "value", void 0);

Ye("focus")(Focus);

let oo = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.Ye = false;
        this.Ze = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ze = null;
            if (Boolean(this.value) !== this.Je) if (this.Je === this.Qe) {
                this.Je = !this.Qe;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Je = this.Qe;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Je = this.Qe = "hide" !== i.alias;
    }
    binding() {
        this.Ye = true;
        this.update();
    }
    detaching() {
        this.Ye = false;
        this.Ze?.cancel();
        this.Ze = null;
    }
    valueChanged() {
        if (this.Ye && null === this.Ze) this.Ze = this.p.domWriteQueue.queueTask(this.update);
    }
};

tt([ At ], oo.prototype, "value", void 0);

oo = tt([ et(0, Ws), et(1, ie), et(2, cn) ], oo);

Ft("hide")(oo);

Ye("show")(oo);

class Portal {
    constructor(t, e, i) {
        this.id = V("au$component");
        this.strict = false;
        this.p = i;
        this.ti = i.document.createElement("div");
        this.view = t.create();
        Ys(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.ti = this.ei();
        this.view.setHost(s);
        return this.ii(t, s, i);
    }
    detaching(t, e, i) {
        return this.si(t, this.ti, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.ti;
        const i = this.ti = this.ei();
        if (e === i) return;
        this.view.setHost(i);
        const s = N(this.si(null, i, t.flags), (() => this.ii(null, i, t.flags)));
        if (vt(s)) s.catch((t => {
            throw t;
        }));
    }
    ii(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return N(s?.call(n, e, r), (() => this.ni(t, e, i)));
    }
    ni(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return N(n.activate(t ?? n, s, i, s.scope), (() => this.ri(e)));
        return this.ri(e);
    }
    ri(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    si(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return N(s?.call(n, e, r), (() => this.oi(t, e, i)));
    }
    oi(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return N(n.deactivate(t, s, i), (() => this.li(e)));
        return this.li(e);
    }
    li(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    ei() {
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

tt([ At({
    primary: true
}) ], Portal.prototype, "target", void 0);

tt([ At({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

tt([ At() ], Portal.prototype, "strict", void 0);

tt([ At() ], Portal.prototype, "deactivating", void 0);

tt([ At() ], Portal.prototype, "activating", void 0);

tt([ At() ], Portal.prototype, "deactivated", void 0);

tt([ At() ], Portal.prototype, "activated", void 0);

tt([ At() ], Portal.prototype, "callbackContext", void 0);

Ze("portal")(Portal);

class If {
    constructor(t, e, i) {
        this.ifFactory = t;
        this.location = e;
        this.work = i;
        this.id = V("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.hi = false;
        this.ai = 0;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.ai++;
        const o = () => !this.hi && this.ai === r + 1;
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
        this.hi = true;
        return N(this.pending, (() => {
            this.hi = false;
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
        const r = this.ai++;
        const o = () => !this.hi && this.ai === r + 1;
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

If.inject = [ es, zs, js ];

tt([ At ], If.prototype, "value", void 0);

tt([ At({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Ze("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = V("au$component");
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
        this.ui = e;
        this.f = i;
        this.id = V("au$component");
        this.views = [];
        this.key = void 0;
        this.fi = void 0;
        this.di = false;
        this.mi = false;
        this.gi = null;
        this.pi = void 0;
        this.vi = false;
    }
    binding(t, e, i) {
        const s = this.ui.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.wi = r;
                let t = o.iterable;
                while (null != t && ho.includes(t.$kind)) {
                    t = t.expression;
                    this.di = true;
                }
                this.gi = t;
                break;
            }
        }
        this.bi(i);
        const h = o.declaration;
        if (!(this.vi = 90138 === h.$kind || 106523 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.xi(i);
        return this.yi(t, i);
    }
    detaching(t, e, i) {
        this.bi(i);
        return this.ki(t, i);
    }
    itemsChanged(t) {
        const {$controller: e} = this;
        if (!e.isActive) return;
        t |= e.flags;
        this.bi(t);
        this.xi(t);
        const i = N(this.ki(null, t), (() => this.yi(null, t)));
        if (vt(i)) i.catch(yt);
    }
    handleCollectionChange(t, e) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        if (this.di) {
            if (this.mi) return;
            this.mi = true;
            this.items = this.forOf.iterable.evaluate(i.scope, this.wi, null);
            this.mi = false;
            return;
        }
        e |= i.flags;
        this.xi(e);
        if (void 0 === t) {
            const t = N(this.ki(null, e), (() => this.yi(null, e)));
            if (vt(t)) t.catch(yt);
        } else {
            const i = this.views.length;
            const s = w(t);
            if (s.deletedItems.length > 0) {
                s.deletedItems.sort(X);
                const t = N(this.Ci(s, e), (() => this.Ai(i, s, e)));
                if (vt(t)) t.catch(yt);
            } else this.Ai(i, s, e);
        }
    }
    bi(t) {
        const e = this.$controller.scope;
        let i = this.Ri;
        let s = this.di;
        let n;
        if (s) {
            i = this.Ri = this.gi.evaluate(e, this.wi, null) ?? null;
            s = this.di = !Object.is(this.items, i);
        }
        const r = this.fi;
        if (this.$controller.isActive) {
            n = this.fi = b(s ? i : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.fi = void 0;
        }
    }
    xi(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.pi = e;
            return;
        }
        const i = this.forOf;
        if (void 0 === i) return;
        const s = [];
        this.forOf.iterate(t, e, ((t, e, i) => {
            s[e] = i;
        }));
        this.pi = s;
    }
    yi(t, e) {
        let i;
        let s;
        let n;
        let o;
        const {$controller: l, f: h, local: c, l: a, items: u} = this;
        const f = l.scope;
        const d = this.forOf;
        const m = d.count(e, u);
        const g = this.views = Array(m);
        d.iterate(e, u, ((u, p, v) => {
            n = g[p] = h.create().setLocation(a);
            n.nodes.unlink();
            if (this.vi) d.declaration.assign(o = r.fromParent(f, x.create()), this.wi, v); else o = r.fromParent(f, x.create(c, v));
            mo(o.overrideContext, p, m);
            s = n.activate(t ?? n, l, e, o);
            if (vt(s)) (i ?? (i = [])).push(s);
        }));
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    ki(t, e) {
        let i;
        let s;
        let n;
        let r = 0;
        const {views: o, $controller: l} = this;
        const h = o.length;
        for (;h > r; ++r) {
            n = o[r];
            n.release();
            s = n.deactivate(t ?? n, l, e);
            if (vt(s)) (i ?? (i = [])).push(s);
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    Ci(t, e) {
        let i;
        let s;
        let n;
        const {$controller: r, views: o} = this;
        const l = t.deletedItems;
        const h = l.length;
        let c = 0;
        for (;h > c; ++c) {
            n = o[l[c]];
            n.release();
            s = n.deactivate(n, r, e);
            if (vt(s)) (i ?? (i = [])).push(s);
        }
        c = 0;
        let a = 0;
        for (;h > c; ++c) {
            a = l[c] - c;
            o.splice(a, 1);
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    Ai(t, e, i) {
        let s;
        let n;
        let o;
        let l;
        let h = 0;
        const {$controller: c, f: a, local: u, pi: f, l: d, views: m} = this;
        const g = e.length;
        for (;g > h; ++h) if (-2 === e[h]) {
            o = a.create();
            m.splice(h, 0, o);
        }
        if (m.length !== g) throw new Error(`AUR0814:${m.length}!=${g}`);
        const p = c.scope;
        const v = e.length;
        y(m, e);
        const w = fo(e);
        const b = w.length;
        let k;
        let C = b - 1;
        h = v - 1;
        for (;h >= 0; --h) {
            o = m[h];
            k = m[h + 1];
            o.nodes.link(k?.nodes ?? d);
            if (-2 === e[h]) {
                if (this.vi) this.forOf.declaration.assign(l = r.fromParent(p, x.create()), this.wi, f[h]); else l = r.fromParent(p, x.create(u, f[h]));
                mo(l.overrideContext, h, v);
                o.setLocation(d);
                n = o.activate(o, c, i, l);
                if (vt(n)) (s ?? (s = [])).push(n);
            } else if (C < 0 || 1 === b || h !== w[C]) {
                mo(o.scope.overrideContext, h, v);
                o.nodes.insertBefore(o.location);
            } else {
                if (t !== v) mo(o.scope.overrideContext, h, v);
                --C;
            }
        }
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
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

tt([ At ], Repeat.prototype, "items", void 0);

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

function mo(t, e, i) {
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
        this.id = V("au$component");
        this.id = V("au$component");
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, i) {
        const s = this.$controller;
        const n = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (s.isActive && null != n) {
            o = r.fromParent(s.scope, void 0 === t ? {} : t);
            for (h = n.length; h > l; ++l) n[l].$bind(2, o);
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

tt([ At ], With.prototype, "value", void 0);

Ze("with")(With);

let go = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = V("au$component");
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
        this.view?.dispose();
        this.view = void 0;
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, i, this.value)));
    }
    caseChanged(t, e) {
        this.queue((() => this.Bi(t, e)));
    }
    Bi(t, e) {
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
        return N(this.Si(null, e, r), (() => {
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
        return N(this.activeCases.length > 0 ? this.Si(t, e, s) : void 0, (() => {
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
        return j(...s.map((i => i.activate(t, e, r))));
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
        return N(j(...s.reduce(((s, n) => {
            if (!i.includes(n)) s.push(n.deactivate(t, e));
            return s;
        }), [])), (() => {
            s.length = 0;
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

tt([ At ], go.prototype, "value", void 0);

go = tt([ Ze("switch"), et(0, es), et(1, zs) ], go);

let po = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Ii = e;
        this.l = i;
        this.id = V("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Ti = s.config.level <= 1;
        this.Ft = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof go) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t, e) {
        this.Ft.debug("isMatch()");
        const i = this.value;
        if (Array.isArray(i)) {
            if (void 0 === this.fi) this.fi = this.Di(e, i);
            return i.includes(t);
        }
        return i === t;
    }
    valueChanged(t, e, i) {
        if (Array.isArray(t)) {
            this.fi?.unsubscribe(this);
            this.fi = this.Di(i, t);
        } else if (void 0 !== this.fi) this.fi.unsubscribe(this);
        this.$switch.caseChanged(this, i);
    }
    handleCollectionChange(t, e) {
        this.$switch.caseChanged(this, e);
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
        this.fi?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Di(t, e) {
        const i = this.Ii.getArrayObserver(e);
        i.subscribe(this);
        return i;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

po.inject = [ es, l, zs, M ];

tt([ At ], po.prototype, "value", void 0);

tt([ At({
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
    mode: it.oneTime
}) ], po.prototype, "fallThrough", void 0);

po = tt([ Ze("case") ], po);

let vo = class DefaultCase extends po {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

vo = tt([ Ze("default-case") ], vo);

let wo = class PromiseTemplateController {
    constructor(t, e, i, s) {
        this.f = t;
        this.l = e;
        this.p = i;
        this.id = V("au$component");
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
        if (!vt(i)) {
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
            void j(h = (this.preSettledTask = s.queueTask((() => j(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), c)).result.catch((t => {
                if (!(t instanceof J)) throw t;
            })), i.then((a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => j(o?.deactivate(t, e), r?.deactivate(t, e), n?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            }), (a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => j(o?.deactivate(t, e), n?.deactivate(t, e), r?.activate(t, e, l, a))), c)).result;
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

tt([ At ], wo.prototype, "value", void 0);

wo = tt([ Ze("promise"), et(0, es), et(1, zs), et(2, ie), et(3, M) ], wo);

let bo = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = V("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        ko(t).pending = this;
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

tt([ At({
    mode: it.toView
}) ], bo.prototype, "value", void 0);

bo = tt([ Ze("pending"), et(0, es), et(1, zs) ], bo);

let xo = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = V("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        ko(t).fulfilled = this;
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

tt([ At({
    mode: it.fromView
}) ], xo.prototype, "value", void 0);

xo = tt([ Ze("then"), et(0, es), et(1, zs) ], xo);

let yo = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = V("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        ko(t).rejected = this;
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

tt([ At({
    mode: it.fromView
}) ], yo.prototype, "value", void 0);

yo = tt([ Ze("catch"), et(0, es), et(1, zs) ], yo);

function ko(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof wo) return i;
    throw new Error(`AUR0813`);
}

let Co = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Co = tt([ zt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Co);

let Ao = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Ao = tt([ zt({
    pattern: "then",
    symbols: ""
}) ], Ao);

let Ro = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Ro = tt([ zt({
    pattern: "catch",
    symbols: ""
}) ], Ro);

function Bo(t, e, i, s) {
    if (bt(e)) return So(t, e, i, s);
    if (Si(e)) return Eo(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.$i = i;
        this.Pi = void 0;
    }
    get definition() {
        if (void 0 === this.Pi) this.Pi = CustomElementDefinition.create({
            name: Ai(),
            template: this.node,
            needsCompile: bt(this.node),
            instructions: this.instructions,
            dependencies: this.$i
        });
        return this.Pi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(cs).getViewFactory(this.definition, t.createChild().register(...this.$i));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.$i);
    }
}

function So(t, e, i, s) {
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
    if (s) Io(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function Eo(t, e, i, s) {
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
    if (s) Io(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function Io(t, e, i, s, n) {
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

function To(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Oi = e;
        this.Li = i;
        this.r = s;
        this.id = V("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.qi = void 0;
        this.Ui = e.props.reduce(To, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.qi !== s) {
            this.qi = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.oi(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.qi === t) return;
        this.qi = t;
        this.composing = true;
        i |= s.flags;
        const n = N(this.oi(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (vt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return N(void 0 === t ? N(e, (t => this.Vi(t, s))) : t, (t => this.ni(this.view = t, i, s)));
    }
    oi(t, e, i) {
        return t?.deactivate(e ?? t, this.$controller, i);
    }
    ni(t, e, i) {
        const {$controller: s} = this;
        return N(t?.activate(e ?? t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    Vi(t, e) {
        const i = this.Fi(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Fi(t, e) {
        if (null == t) return;
        const i = this.Li.controller.container;
        if ("object" === typeof t) {
            if (Do(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (bt(t)) {
            const e = i.find(Pi, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return Bo(this.p, t, this.Ui, this.$controller.host.childNodes).createView(i);
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

tt([ At ], AuRender.prototype, "component", void 0);

tt([ At({
    mode: it.fromView
}) ], AuRender.prototype, "composing", void 0);

ai({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function Do(t) {
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
        this._i = void 0;
        this.r = t.get(cs);
        this.Oi = r;
        this.ji = o;
    }
    static get inject() {
        return [ U, Rs, Ws, zs, ie, cn, K(CompositionContextFactory) ];
    }
    get pending() {
        return this.Mi;
    }
    get composition() {
        return this._i;
    }
    attaching(t, e, i) {
        return this.Mi = N(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.ji.isCurrent(t)) this.Mi = void 0;
        }));
    }
    detaching(t) {
        const e = this._i;
        const i = this.Mi;
        this.ji.invalidate();
        this._i = this.Mi = void 0;
        return N(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this._i) {
            this._i.update(this.model);
            return;
        }
        this.Mi = N(this.Mi, (() => N(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.ji.isCurrent(t)) this.Mi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.ji;
        const s = this._i;
        return N(i.create(t), (t => {
            if (i.isCurrent(t)) return N(this.compose(t), (n => {
                if (i.isCurrent(t)) return N(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this._i = n;
                        return N(s?.deactivate(e), (() => t));
                    } else return N(n.controller.deactivate(n.controller, this.$controller, 4), (() => {
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
                    projections: this.Oi.projections
                }, f);
                return new CompositionController(n, (t => n.activate(t ?? n, a, 2, a.scope.parentScope)), (t => N(n.deactivate(t ?? n, a, 4), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Pi.generateName(),
                    template: n
                });
                const o = this.r.getViewFactory(s, d);
                const l = Controller.$view(o, a);
                const h = "auto" === this.scopeBehavior ? r.fromParent(this.parent.scope, e) : r.create(e);
                if (Js(i)) l.setLocation(i); else l.setHost(i);
                return new CompositionController(l, (t => l.activate(t ?? l, a, 2, h)), (t => l.deactivate(t ?? l, a, 4)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return N(e.activate(l), (() => g())); else return g();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = Js(i);
        t.registerResolver(s.Element, t.registerResolver(Ws, new _("ElementResolver", n ? null : i)));
        t.registerResolver(zs, new _("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        t.registerResolver(e, new _("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = wt(t) ? t : t?.constructor;
        return Pi.isType(e) ? Pi.getDefinition(e) : null;
    }
}

tt([ At ], AuCompose.prototype, "view", void 0);

tt([ At ], AuCompose.prototype, "viewModel", void 0);

tt([ At ], AuCompose.prototype, "model", void 0);

tt([ At({
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
        if (vt(this.view) || vt(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        this.Ni = null;
        this.Wi = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.Hi = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.Hi = true;
        }
        this.Li = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ zs, cn, Bs, cs ];
    }
    binding(t, e, i) {
        this.Ni = this.$controller.scope.parentScope;
        let s;
        if (this.Hi) {
            s = this.Li.controller.scope.parentScope;
            (this.Wi = r.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.Ni.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Hi ? this.Wi : this.Ni);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Hi && null != this.Wi) this.Wi.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

tt([ At ], AuSlot.prototype, "expose", void 0);

ai({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const $o = E.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let Po = class SanitizeValueConverter {
    constructor(t) {
        this.zi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.zi.sanitize(t);
    }
};

Po = tt([ et(0, $o) ], Po);

me("sanitize")(Po);

let Oo = class ViewValueConverter {
    constructor(t) {
        this.Gi = t;
    }
    toView(t, e) {
        return this.Gi.getViewComponentForObject(t, e);
    }
};

Oo = tt([ et(0, hs) ], Oo);

me("view")(Oo);

const Lo = DebounceBindingBehavior;

const qo = OneTimeBindingBehavior;

const Uo = ToViewBindingBehavior;

const Vo = FromViewBindingBehavior;

const Fo = SignalBindingBehavior;

const _o = ThrottleBindingBehavior;

const jo = TwoWayBindingBehavior;

const Mo = TemplateCompiler;

const No = NodeObserverLocator;

const Wo = [ Mo, No ];

const Ho = SVGAnalyzer;

const zo = te;

const Go = Qt;

const Xo = Jt;

const Ko = Zt;

const Yo = ee;

const Zo = [ Xo, Ko, Yo ];

const Jo = [ zo, Go ];

const Qo = lr;

const tl = or;

const el = hr;

const il = nr;

const sl = ir;

const nl = sr;

const rl = rr;

const ol = gr;

const ll = cr;

const hl = ar;

const cl = ur;

const al = fr;

const ul = mr;

const fl = dr;

const dl = pr;

const ml = [ tl, sl, il, nl, rl, Qo, el, ol, ll, hl, cl, ul, fl, al, dl ];

const gl = Po;

const pl = Oo;

const vl = If;

const wl = Else;

const bl = Repeat;

const xl = With;

const yl = go;

const kl = po;

const Cl = vo;

const Al = wo;

const Rl = bo;

const Bl = xo;

const Sl = yo;

const El = Co;

const Il = Ao;

const Tl = Ro;

const Dl = AttrBindingBehavior;

const $l = SelfBindingBehavior;

const Pl = UpdateTriggerBindingBehavior;

const Ol = AuRender;

const Ll = AuCompose;

const ql = Portal;

const Ul = Focus;

const Vl = oo;

const Fl = [ Lo, qo, Uo, Vo, Fo, _o, jo, gl, pl, vl, wl, bl, xl, yl, kl, Cl, Al, Rl, Bl, Sl, El, Il, Tl, Dl, $l, Pl, Ol, Ll, ql, Ul, Vl, AuSlot ];

const _l = kn;

const jl = bn;

const Ml = wn;

const Nl = An;

const Wl = Bn;

const Hl = yn;

const zl = Rn;

const Gl = Cn;

const Xl = vn;

const Kl = xn;

const Yl = $n;

const Zl = Un;

const Jl = Pn;

const Ql = On;

const th = Ln;

const eh = qn;

const ih = Tn;

const sh = Vn;

const nh = [ zl, Wl, _l, Gl, Nl, Xl, Ml, jl, Kl, Hl, Yl, Zl, Jl, Ql, th, eh, ih, sh ];

const rh = oh(B);

function oh(t) {
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
            return e.register(qt(o, i.coercingOptions), ...Wo, ...Fl, ...Zo, ...ml, ...nh);
        },
        customize(e) {
            return oh(e ?? t);
        }
    };
}

const lh = E.createInterface("IAurelia");

class Aurelia {
    constructor(t = E.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Xi = false;
        this.Ki = false;
        this.Yi = void 0;
        this.next = void 0;
        this.Zi = void 0;
        this.Ji = void 0;
        if (t.has(lh, true)) throw new Error(`AUR0768`);
        t.registerResolver(lh, new _("IAurelia", this));
        t.registerResolver(_s, this.Qi = new _("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Xi;
    }
    get isStopping() {
        return this.Ki;
    }
    get root() {
        if (null == this.Yi) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.Yi;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.ts(t.host), this.container, this.Qi);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.ts(s);
        const r = t.component;
        let o;
        if (wt(r)) {
            i.registerResolver(n.HTMLElement, i.registerResolver(n.Element, i.registerResolver(Ws, new _("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        i.registerResolver(Hs, new _("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: Ai(),
            template: s,
            enhance: true
        }));
        return N(l.activate(l, e, 2), (() => l));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    ts(t) {
        let e;
        if (!this.container.has(ie, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new Q(t.ownerDocument.defaultView);
            this.container.register(qt(ie, e));
        } else e = this.container.get(ie);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (vt(this.Zi)) return this.Zi;
        return this.Zi = N(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.Qi.prepare(this.Yi = t);
            this.Xi = true;
            return N(t.activate(), (() => {
                this.ir = true;
                this.Xi = false;
                this.Zi = void 0;
                this.es(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (vt(this.Ji)) return this.Ji;
        if (true === this.ir) {
            const e = this.Yi;
            this.ir = false;
            this.Ki = true;
            return this.Ji = N(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.Yi = void 0;
                this.Qi.dispose();
                this.Ki = false;
                this.es(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Ki) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    es(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var hh;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(hh || (hh = {}));

const ch = E.createInterface("IDialogService");

const ah = E.createInterface("IDialogController");

const uh = E.createInterface("IDialogDomRenderer");

const fh = E.createInterface("IDialogDom");

const dh = E.createInterface("IDialogGlobalSettings");

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

var mh;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(mh || (mh = {}));

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
        return [ ie, U ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(uh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(Hs, true) ? e.get(Hs) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(qt(Hs, o));
        e.register(qt(Ws, c), qt(fh, l));
        return new Promise((s => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(e, t, c), {
                $dialog: this
            });
            s(n.canActivate?.(i) ?? true);
        })).then((r => {
            if (true !== r) {
                l.dispose();
                if (n) throw gh(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const o = this.cmp;
            return N(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Pi.generateName(),
                    template: s
                }));
                return N(i.activate(i, null, 2), (() => {
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
        if (this.ss) return this.ss;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(N(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.ss = void 0;
                    if (l) throw gh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return N(r.deactivate?.(h), (() => N(s.deactivate(s, null, 4), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.Ot(h); else this.Et(gh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.ss = void 0;
            throw t;
        }));
        this.ss = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = ph(t);
        return new Promise((t => t(N(this.cmp.deactivate?.(DialogCloseResult.create("error", e)), (() => N(this.controller.deactivate(this.controller, null, 4), (() => {
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(Ws, new _("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = wt(t) ? t : t?.constructor;
        return Pi.isType(e) ? Pi.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function gh(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function ph(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.gt = t;
        this.p = e;
        this.os = i;
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
        return [ U, ie, dh ];
    }
    static register(t) {
        t.register(Ot(ch, this), Ve.deactivating(ch, (t => N(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return wh(new Promise((e => {
            const i = DialogSettings.from(this.os, t);
            const s = i.container ?? this.gt.createChild();
            e(N(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(qt(ah, e));
                s.register(Ut(DialogController, (() => {
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
        const i = bh(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).cs().ls();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const s = j(null == e ? void 0 : N(e(), (e => {
            t.component = e;
        })), wt(i) ? N(i(), (e => {
            t.template = e;
        })) : void 0);
        return vt(s) ? s.then((() => t)) : t;
    }
    cs() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    ls() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function vh(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function wh(t) {
    t.whenClosed = vh;
    return t;
}

function bh(t) {
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
        Ot(dh, this).register(t);
    }
}

const xh = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${xh} display:flex;`;
        this.overlayCss = xh;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        Ot(uh, this).register(t);
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

function yh(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, Ve.creating((() => t(i.get(dh))))),
        customize(t, i) {
            return yh(t, i ?? e);
        }
    };
}

const kh = yh((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(Ot(dh, this));
    }
} ]);

const Ch = yh(B, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Ah = E.createInterface((t => t.singleton(WcCustomElementRegistry)));

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
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(Ws, new _("ElementProvider", this))));
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

WcCustomElementRegistry.inject = [ U, ie, cs ];

export { AdoptedStyleSheetsStyles, AppRoot, Ve as AppTask, te as AtPrefixedTriggerAttributePattern, zo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, Dl as AttrBindingBehaviorRegistration, fr as AttrBindingCommand, al as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, Zl as AttributeBindingRendererRegistration, AttributeNSAccessor, Yt as AttributePattern, AuCompose, AuRender, Ol as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, St as Bindable, BindableDefinition, BindableObserver, BindablesInfo, de as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorFactory, he as BindingBehaviorStrategy, er as BindingCommand, BindingCommandDefinition, BindingInterceptor, it as BindingMode, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, lr as CallBindingCommand, Qo as CallBindingCommandRegistration, CallBindingInstruction, _l as CallBindingRendererRegistration, ur as CaptureBindingCommand, cl as CaptureBindingCommandRegistration, po as Case, CheckedObserver, Ne as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, mr as ClassBindingCommand, ul as ClassBindingCommandRegistration, Qt as ColonPrefixedBindAttributePattern, Go as ColonPrefixedBindAttributePatternRegistration, Yn as CommandType, ComputedWatcher, Controller, ri as CustomAttribute, CustomAttributeDefinition, jl as CustomAttributeRendererRegistration, Pi as CustomElement, CustomElementDefinition, Ml as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Lo as DebounceBindingBehaviorRegistration, or as DefaultBindingCommand, tl as DefaultBindingCommandRegistration, ml as DefaultBindingLanguage, Zo as DefaultBindingSyntax, vo as DefaultCase, Wo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, nh as DefaultRenderers, Fl as DefaultResources, hh as DefinitionType, ar as DelegateBindingCommand, hl as DelegateBindingCommandRegistration, DialogCloseResult, kh as DialogConfiguration, DialogController, mh as DialogDeactivationStatuses, Ch as DialogDefaultConfiguration, DialogOpenResult, DialogService, Zt as DotSeparatedAttributePattern, Ko as DotSeparatedAttributePatternRegistration, Else, wl as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, Focus, hr as ForBindingCommand, el as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Vo as FromViewBindingBehaviorRegistration, nr as FromViewBindingCommand, il as FromViewBindingCommandRegistration, xo as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, _s as IAppRoot, Ue as IAppTask, re as IAttrMapper, Ht as IAttributeParser, Wt as IAttributePattern, ln as IAuSlotsInfo, lh as IAurelia, Rs as IController, ah as IDialogController, fh as IDialogDom, uh as IDialogDomRenderer, dh as IDialogGlobalSettings, ch as IDialogService, rn as IEventDelegator, Hs as IEventTarget, en as IHistory, Bs as IHydrationContext, cn as IInstruction, Yi as ILifecycleHooks, Dn as IListenerBehaviorOptions, tn as ILocation, Ws as INode, No as INodeObserverLocatorRegistration, ie as IPlatform, on as IProjections, zs as IRenderLocation, fn as IRenderer, cs as IRendering, se as ISVGAnalyzer, $o as ISanitizer, Wi as IShadowDOMGlobalStyles, Ni as IShadowDOMStyles, jt as ISyntaxInterpreter, un as ITemplateCompiler, $r as ITemplateCompilerHooks, Mo as ITemplateCompilerRegistration, vr as ITemplateElementFactory, es as IViewFactory, hs as IViewLocator, Ah as IWcElementRegistry, Qs as IWindow, js as IWorkTracker, If, vl as IfRegistration, hn as InstructionType, InterpolationBinding, Nl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Wl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Hl as LetElementRendererRegistration, Qi as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, Yl as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, Gs as NodeType, NoopSVGAnalyzer, OneTimeBindingBehavior, qo as OneTimeBindingBehaviorRegistration, ir as OneTimeBindingCommand, sl as OneTimeBindingCommandRegistration, bo as PendingTemplateController, Portal, wo as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, zl as PropertyBindingRendererRegistration, Jt as RefAttributePattern, Xo as RefAttributePatternRegistration, RefBinding, ol as RefBindingCommandRegistration, RefBindingInstruction, Gl as RefBindingRendererRegistration, yo as RejectedTemplateController, RenderPlan, Rendering, Repeat, bl as RepeatRegistration, SVGAnalyzer, Ho as SVGAnalyzerRegistration, Po as SanitizeValueConverter, gl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, $l as SelfBindingBehaviorRegistration, SetAttributeInstruction, Jl as SetAttributeRendererRegistration, SetClassAttributeInstruction, Ql as SetClassAttributeRendererRegistration, SetPropertyInstruction, Xl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, th as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, Jo as ShortHandBindingSyntax, SignalBindingBehavior, Fo as SignalBindingBehaviorRegistration, rh as StandardConfiguration, Cs as State, StyleAttributeAccessor, dr as StyleBindingCommand, fl as StyleBindingCommandRegistration, Hi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, eh as StylePropertyBindingRendererRegistration, go as Switch, TemplateCompiler, Lr as TemplateCompilerHooks, Kl as TemplateControllerRendererRegistration, TextBindingInstruction, ih as TextBindingRendererRegistration, ThrottleBindingBehavior, _o as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, Uo as ToViewBindingBehaviorRegistration, sr as ToViewBindingCommand, nl as ToViewBindingCommandRegistration, cr as TriggerBindingCommand, ll as TriggerBindingCommandRegistration, TwoWayBindingBehavior, jo as TwoWayBindingBehaviorRegistration, rr as TwoWayBindingCommand, rl as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, Pl as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, ve as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, ks as ViewModelKind, Oo as ViewValueConverter, pl as ViewValueConverterRegistration, os as Views, ci as Watch, WcCustomElementRegistry, With, xl as WithRegistration, Ft as alias, Pt as allResources, In as applyBindingBehavior, we as astEvaluator, zt as attributePattern, At as bindable, ce as bindingBehavior, Zn as bindingCommand, Ui as capture, _e as children, Et as coercer, fi as containerless, Zs as convertToRenderLocation, Bo as createElement, _i as cssModules, Ye as customAttribute, ai as customElement, Ks as getEffectiveParentNode, Ms as getRef, bs as isCustomElementController, xs as isCustomElementViewModel, an as isInstruction, Js as isRenderLocation, ts as lifecycleHooks, Li as processContent, _t as registerAliases, dn as renderer, Ys as setEffectiveParentNode, Ns as setRef, ji as shadowCSS, mi as strict, qr as templateCompilerHooks, Ze as templateController, ui as useShadowDOM, me as valueConverter, ls as view, oi as watch };

