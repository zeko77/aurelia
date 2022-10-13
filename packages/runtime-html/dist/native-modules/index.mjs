import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as a, IPlatform as c, IContainer as u, optional as f, InstanceProvider as d, resolveAll as m, onResolve as g, fromDefinitionOrDefault as p, pascalCase as v, fromAnnotationOrTypeOrDefault as x, fromAnnotationOrDefinitionOrTypeOrDefault as w, camelCase as b, toArray as y, ILogger as k, emptyObject as A, IServiceLocator as C, transient as B } from "../kernel/dist/native-modules/index.mjs";

import { Metadata as R, isObject as S } from "../metadata/dist/native-modules/index.mjs";

import { subscriberCollection as I, astEvaluate as T, ISignaler as P, connectable as E, astBind as L, astUnbind as D, astAssign as U, ConnectableSwitcher as $, ProxyObservable as q, IExpressionParser as M, IObserverLocator as _, Scope as F, ICoercionConfiguration as O, AccessScopeExpression as V, PrimitiveLiteralExpression as N, PropertyAccessor as j, INodeObserverLocator as H, getObserverLookup as W, SetterObserver as z, IDirtyChecker as G, createIndexMap as X, applyMutationsToIndices as K, getCollectionObserver as Q, synchronizeIndices as Y, BindingContext as Z } from "../runtime/dist/native-modules/index.mjs";

import { TaskAbortError as J } from "../platform/dist/native-modules/index.mjs";

import { BrowserPlatform as tt } from "../platform-browser/dist/native-modules/index.mjs";

function et(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function it(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

const st = R.getOwn;

const nt = R.hasOwn;

const rt = R.define;

const {annotation: ot, resource: lt} = t;

const ht = ot.keyFor;

const at = lt.keyFor;

const ct = lt.appendTo;

const ut = ot.appendTo;

const ft = ot.getKeys;

const dt = Object;

const mt = dt.prototype;

const gt = () => dt.create(null);

const pt = t => new Error(t);

const vt = mt.hasOwnProperty;

const xt = dt.freeze;

const wt = dt.assign;

const bt = dt.getOwnPropertyNames;

const yt = dt.keys;

const kt = gt();

const At = (t, e, i) => {
    if (true === kt[e]) return true;
    if (!St(e)) return false;
    const s = e.slice(0, 5);
    return kt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const Ct = t => t instanceof Promise;

const Bt = t => t instanceof Array;

const Rt = t => "function" === typeof t;

const St = t => "string" === typeof t;

const It = dt.defineProperty;

const Tt = t => {
    throw t;
};

const Pt = dt.is;

const Et = Reflect.defineProperty;

const Lt = (t, e, i) => {
    Et(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function Dt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        rt($t, BindableDefinition.create(e, t, i), t.constructor, e);
        ut(t.constructor, qt.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (St(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Ut(t) {
    return t.startsWith($t);
}

const $t = ht("bindable");

const qt = xt({
    name: $t,
    keyFrom: t => `${$t}:${t}`,
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
            if (s(t)) t.forEach(n); else if (t instanceof BindableDefinition) i[t.property] = t; else if (void 0 !== t) yt(t).forEach((e => r(e, t[e])));
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
                if (St(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!nt($t, t, n)) ut(t, qt.keyFrom(n));
                rt($t, e, t, n);
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
        const i = $t.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let a;
        let c;
        while (--r >= 0) {
            a = n[r];
            l = ft(a).filter(Ut);
            h = l.length;
            for (c = 0; c < h; ++c) s[o++] = st($t, a, l[c].slice(i));
        }
        return s;
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
    static create(t, e, n = {}) {
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Ft(t, e, n)));
    }
}

function Mt(t, e, i) {
    _t.define(t, e);
}

const _t = {
    key: ht("coercer"),
    define(t, e) {
        rt(_t.key, t[e].bind(t), t);
    },
    for(t) {
        return st(_t.key, t);
    }
};

function Ft(t, e, i = {}) {
    const s = i.type ?? Reflect.getMetadata("design:type", e, t) ?? null;
    if (null == s) return n;
    let r;
    switch (s) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        r = s;
        break;

      default:
        {
            const t = s.coerce;
            r = "function" === typeof t ? t.bind(s) : _t.for(s) ?? n;
            break;
        }
    }
    return r === n ? r : Ot(r, i.nullable);
}

function Ot(t, e) {
    return function(i, s) {
        if (!s?.enableCoercion) return i;
        return (e ?? (s?.coerceNullish ?? false ? false : true)) && null == i ? i : t(i, s);
    };
}

class BindableObserver {
    constructor(t, e, i, s, r, o) {
        this.set = s;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        const l = t[i];
        const h = t.propertyChanged;
        const a = this.i = Rt(l);
        const c = this.u = Rt(h);
        const u = this.hs = s !== n;
        let f;
        this.o = t;
        this.k = e;
        this.A = c ? h : n;
        this.cb = a ? l : n;
        if (void 0 === this.cb && !c && !u) this.iO = false; else {
            this.iO = true;
            f = t[e];
            this.v = u && void 0 !== f ? s(f, this.t) : f;
            this.C();
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
            if (Pt(t, e)) return;
            this.v = t;
            this.ov = e;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, e);
                if (this.u) this.A.call(this.o, this.k, t, e);
            }
            this.subs.notify(this.v, this.ov);
        } else this.o[this.k] = t;
    }
    subscribe(t) {
        if (false === !this.iO) {
            this.iO = true;
            this.v = this.hs ? this.set(this.o[this.k], this.t) : this.o[this.k];
            this.C();
        }
        this.subs.add(t);
    }
    C() {
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

I(BindableObserver);

const Vt = function(t) {
    function e(t, i, s) {
        r.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.get(t);
        return i.has(t, false) ? i.get(t) : i.root.get(t);
    };
    return e;
};

const Nt = function(t) {
    function e(t, i, s) {
        r.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.getAll(t, false);
        return i.has(t, false) ? i.getAll(t, false).concat(i.root.getAll(t, false)) : i.root.getAll(t, false);
    };
    return e;
};

const jt = r.createInterface;

const Ht = o.singleton;

const Wt = o.aliasTo;

const zt = o.instance;

o.callback;

const Gt = o.transient;

const Xt = (t, e, i) => t.registerResolver(e, i);

function Kt(...t) {
    return function(e) {
        const i = ht("aliases");
        const s = st(i, e);
        if (void 0 === s) rt(i, t, e); else s.push(...t);
    };
}

function Qt(t, e, i, s) {
    for (let n = 0, r = t.length; n < r; ++n) o.aliasTo(i, e.keyFrom(t[n])).register(s);
}

class CharSpec {
    constructor(t, e, i, s) {
        this.chars = t;
        this.repeat = e;
        this.isSymbol = i;
        this.isInverted = s;
        if (s) switch (t.length) {
          case 0:
            this.has = this.B;
            break;

          case 1:
            this.has = this.R;
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
            this.has = this.L;
        }
    }
    equals(t) {
        return this.chars === t.chars && this.repeat === t.repeat && this.isSymbol === t.isSymbol && this.isInverted === t.isInverted;
    }
    L(t) {
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
    R(t) {
        return this.chars !== t;
    }
    B(t) {
        return true;
    }
}

class Interpretation {
    constructor() {
        this.parts = l;
        this.U = "";
        this.$ = {};
        this.q = {};
    }
    get pattern() {
        const t = this.U;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.U = "";
            this.parts = l;
        } else {
            this.U = t;
            this.parts = this.q[t];
        }
    }
    append(t, e) {
        const i = this.$;
        if (void 0 === i[t]) i[t] = e; else i[t] += e;
    }
    next(t) {
        const e = this.$;
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
        this.M = [];
        this._ = null;
        this.F = false;
        this.O = e;
    }
    get U() {
        return this.F ? this.O[0] : null;
    }
    findChild(t) {
        const e = this.M;
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
        const i = this.O;
        if (!i.includes(e)) i.push(e);
        let s = this.findChild(t);
        if (null == s) {
            s = new AttrParsingState(t, e);
            this.M.push(s);
            if (t.repeat) s.M.push(s);
        }
        return s;
    }
    findMatches(t, e) {
        const i = [];
        const s = this.M;
        const n = s.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = s[l];
            if (o.charSpec.has(t)) {
                i.push(o);
                r = o.O.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.O[h]); else for (;h < r; ++h) e.append(o.O[h], t);
            }
        }
        return i;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.V = t.length;
        const i = this.N = [];
        let s = 0;
        for (;e > s; ++s) i.push(new CharSpec(t[s], false, false, false));
    }
    eachChar(t) {
        const e = this.V;
        const i = this.N;
        let s = 0;
        for (;e > s; ++s) t(i[s]);
    }
}

class DynamicSegment {
    constructor(t) {
        this.text = "PART";
        this.j = new CharSpec(t, true, false, true);
    }
    eachChar(t) {
        t(this.j);
    }
}

class SymbolSegment {
    constructor(t) {
        this.text = t;
        this.j = new CharSpec(t, false, true, false);
    }
    eachChar(t) {
        t(this.j);
    }
}

class SegmentTypes {
    constructor() {
        this.statics = 0;
        this.dynamics = 0;
        this.symbols = 0;
    }
}

const Yt = jt("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

class SyntaxInterpreter {
    constructor() {
        this.H = new AttrParsingState(null);
        this.W = [ this.H ];
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
            i = this.H;
            s = t[a];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.G(s, r);
            l = o.length;
            h = t => i = i.append(t, n);
            for (c = 0; l > c; ++c) o[c].eachChar(h);
            i._ = r;
            i.F = true;
            ++a;
        }
    }
    interpret(t) {
        const e = new Interpretation;
        const i = t.length;
        let s = this.W;
        let n = 0;
        let r;
        for (;n < i; ++n) {
            s = this.X(s, t.charAt(n), e);
            if (0 === s.length) break;
        }
        s = s.filter(Zt);
        if (s.length > 0) {
            s.sort(Jt);
            r = s[0];
            if (!r.charSpec.isSymbol) e.next(r.U);
            e.pattern = r.U;
        }
        return e;
    }
    X(t, e, i) {
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
    G(t, e) {
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

function Zt(t) {
    return t.F;
}

function Jt(t, e) {
    const i = t._;
    const s = e._;
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

const te = jt("IAttributePattern");

const ee = jt("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.K = {};
        this.Y = t;
        const i = this.O = {};
        const s = e.reduce(((t, e) => {
            const s = re(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), l);
        t.add(s);
    }
    parse(t, e) {
        let i = this.K[t];
        if (null == i) i = this.K[t] = this.Y.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.O[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ Yt, h(te) ];

function ie(...t) {
    return function e(i) {
        return oe.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        Ht(te, this.Type).register(t);
    }
}

const se = at("attribute-pattern");

const ne = "attribute-pattern-definitions";

const re = e => t.annotation.get(e, ne);

const oe = xt({
    name: se,
    definitionAnnotationKey: ne,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        rt(se, s, i);
        ct(i, se);
        t.annotation.set(i, ne, e);
        ut(i, ne);
        return i;
    },
    getPatternDefinitions: re
});

let le = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, `${i[0]}.${i[1]}`, i[2]);
    }
};

le = et([ ie({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], le);

let he = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

he = et([ ie({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], he);

let ae = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

ae = et([ ie({
    pattern: ":PART",
    symbols: ":"
}) ], ae);

let ce = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

ce = et([ ie({
    pattern: "@PART",
    symbols: "@"
}) ], ce);

let ue = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

ue = et([ ie({
    pattern: "...$attrs",
    symbols: ""
}) ], ue);

class AttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.Z = false;
        this.o = t;
        this.J = e;
        this.tt = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        this.v = t;
        this.Z = t !== this.ov;
        this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.ov = this.v;
            switch (this.tt) {
              case "class":
                this.o.classList.toggle(this.J, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let e = this.v;
                    if (St(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.J, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.tt); else this.o.setAttribute(this.tt, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let i = 0, s = t.length; s > i; ++i) {
            const s = t[i];
            if ("attributes" === s.type && s.attributeName === this.J) {
                e = true;
                break;
            }
        }
        if (e) {
            let t;
            switch (this.tt) {
              case "class":
                t = this.o.classList.contains(this.J);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.J);
                break;

              default:
                throw pt(`AUR0651:${this.tt}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.Z = false;
                this.it();
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.J);
            fe(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) de(this.o, this);
    }
    it() {
        pe = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, pe);
    }
}

I(AttributeObserver);

const fe = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(me)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const de = (t, e) => {
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

const me = t => {
    t[0].target.$eMObs.forEach(ge, t);
};

function ge(t) {
    t.handleMutation(this);
}

let pe;

function ve(t) {
    return function(e) {
        return be.define(t, e);
    };
}

class BindingBehaviorDefinition {
    constructor(t, e, i, s) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
    }
    static create(t, e) {
        let s;
        let n;
        if (St(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingBehaviorDefinition(e, i(we(e, "name"), s), a(we(e, "aliases"), n.aliases, e.aliases), be.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ht(i, e).register(t);
        Wt(i, e).register(t);
        Qt(s, be, i, t);
    }
}

const xe = at("binding-behavior");

const we = (t, e) => st(ht(e), t);

const be = xt({
    name: xe,
    keyFrom(t) {
        return `${xe}:${t}`;
    },
    isType(t) {
        return Rt(t) && nt(xe, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        rt(xe, i, i.Type);
        rt(xe, i, i);
        ct(e, xe);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(xe, t);
        if (void 0 === e) throw pt(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: we
});

function ye(t) {
    return function(e) {
        return Ce.define(t, e);
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
        let s;
        let n;
        if (St(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, i(Ae(e, "name"), s), a(Ae(e, "aliases"), n.aliases, e.aliases), Ce.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Qt(s, Ce, i, t);
    }
}

const ke = at("value-converter");

const Ae = (t, e) => st(ht(e), t);

const Ce = xt({
    name: ke,
    keyFrom: t => `${ke}:${t}`,
    isType(t) {
        return Rt(t) && nt(ke, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        rt(ke, i, i.Type);
        rt(ke, i, i);
        ct(e, ke);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(ke, t);
        if (void 0 === e) throw pt(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: Ae
});

class BindingTargetSubscriber {
    constructor(t, e) {
        this.v = void 0;
        this.b = t;
        this.st = e;
    }
    flush() {
        this.b.updateSource(this.v);
    }
    handleChange(t, e) {
        const i = this.b;
        if (t !== T(i.ast, i.s, i, null)) {
            this.v = t;
            this.st.add(this);
        }
    }
}

const Be = t => {
    Lt(t.prototype, "useScope", (function(t) {
        this.s = t;
    }));
};

const Re = (t, e = true) => i => {
    const s = i.prototype;
    if (null != t) Et(s, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    Et(s, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    Lt(s, "get", (function(t) {
        return this.l.get(t);
    }));
    Lt(s, "getSignaler", (function() {
        return this.l.root.get(P);
    }));
    Lt(s, "getConverter", (function(t) {
        const e = Ce.keyFrom(t);
        let i = Se.get(this);
        if (null == i) Se.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get(Vt(e)));
    }));
    Lt(s, "getBehavior", (function(t) {
        const e = be.keyFrom(t);
        let i = Se.get(this);
        if (null == i) Se.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get(Vt(e)));
    }));
};

const Se = new WeakMap;

class ResourceLookup {}

const Ie = jt("IFlushQueue", (t => t.singleton(FlushQueue)));

class FlushQueue {
    constructor() {
        this.nt = false;
        this.rt = new Set;
    }
    get count() {
        return this.rt.size;
    }
    add(t) {
        this.rt.add(t);
        if (this.nt) return;
        this.nt = true;
        try {
            this.rt.forEach(Te);
        } finally {
            this.nt = false;
        }
    }
    clear() {
        this.rt.clear();
        this.nt = false;
    }
}

function Te(t, e, i) {
    i.delete(t);
    t.flush();
}

const Pe = new WeakSet;

const Ee = (t, e) => {
    Lt(t.prototype, "limit", (function(t) {
        if (Pe.has(this)) throw pt(`AURXXXX: a rate limit has already been applied.`);
        Pe.add(this);
        const i = e(this, t);
        const s = this[i];
        const n = (...t) => s.call(this, ...t);
        const r = "debounce" === t.type ? Le(t, n, this) : De(t, n, this);
        this[i] = r;
        return {
            dispose: () => {
                Pe.delete(this);
                r.dispose();
                delete this[i];
            }
        };
    }));
};

const Le = (t, e, i) => {
    let s;
    let n;
    let r;
    const o = t.queue;
    const l = l => {
        r = l;
        if (i.isBound) {
            n = s;
            s = o.queueTask((() => e(r)), {
                delay: t.delay,
                reusable: false
            });
            n?.cancel();
        } else e(r);
    };
    l.dispose = () => {
        n?.cancel();
        s?.cancel();
    };
    return l;
};

const De = (t, e, i) => {
    let s;
    let n;
    let r = 0;
    let o = 0;
    let l;
    const h = t.queue;
    const a = () => t.now();
    const c = c => {
        l = c;
        if (i.isBound) {
            o = a() - r;
            n = s;
            if (o > t.delay) {
                r = a();
                e(l);
            } else s = h.queueTask((() => {
                r = a();
                e(l);
            }), {
                delay: t.delay - o,
                reusable: false
            });
            n?.cancel();
        } else e(l);
    };
    c.dispose = () => {
        n?.cancel();
        s?.cancel();
    };
    return c;
};

const Ue = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, i, s, n, r, o, l, h) {
        this.targetAttribute = o;
        this.targetProperty = l;
        this.mode = h;
        this.isBound = false;
        this.s = void 0;
        this.ot = null;
        this.v = void 0;
        this.boundFn = false;
        this.l = e;
        this.ast = n;
        this.lt = t;
        this.target = r;
        this.oL = i;
        this.ht = s;
    }
    updateTarget(t) {
        this.ct.setValue(t, this.target, this.targetProperty);
    }
    handleChange() {
        if (!this.isBound) return;
        let t;
        this.obs.version++;
        const e = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (e !== this.v) {
            this.v = e;
            const i = 1 !== this.lt.state && (4 & this.ct.type) > 0;
            if (i) {
                t = this.ot;
                this.ot = this.ht.queueTask((() => {
                    this.ot = null;
                    this.updateTarget(e);
                }), Ue);
                t?.cancel();
            } else this.updateTarget(e);
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        L(this.ast, t, this);
        this.ct ?? (this.ct = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = T(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.s, this);
        this.s = void 0;
        this.v = void 0;
        this.ot?.cancel();
        this.ot = null;
        this.obs.clearAll();
    }
}

Be(AttributeBinding);

Ee(AttributeBinding, (() => "updateTarget"));

E(AttributeBinding);

Re(true)(AttributeBinding);

const $e = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.s = void 0;
        this.ot = null;
        this.lt = t;
        this.oL = i;
        this.ht = s;
        this.ct = i.getAccessor(r, o);
        const h = n.expressions;
        const a = this.partBindings = Array(h.length);
        const c = h.length;
        let u = 0;
        for (;c > u; ++u) a[u] = new InterpolationPartBinding(h[u], r, o, e, i, this);
    }
    ut() {
        this.updateTarget();
    }
    updateTarget() {
        const t = this.partBindings;
        const e = this.ast.parts;
        const i = t.length;
        let s = "";
        let n = 0;
        if (1 === i) s = e[0] + t[0].v + e[1]; else {
            s = e[0];
            for (;i > n; ++n) s += t[n].v + e[n + 1];
        }
        const r = this.ct;
        const o = 1 !== this.lt.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.ot;
            this.ot = this.ht.queueTask((() => {
                this.ot = null;
                r.setValue(s, this.target, this.targetProperty);
            }), $e);
            l?.cancel();
            l = null;
        } else r.setValue(s, this.target, this.targetProperty);
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        const e = this.partBindings;
        const i = e.length;
        let s = 0;
        for (;i > s; ++s) e[s].bind(t);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.s = void 0;
        const t = this.partBindings;
        const e = t.length;
        let i = 0;
        for (;e > i; ++i) t[i].unbind();
        this.ot?.cancel();
        this.ot = null;
    }
}

class InterpolationPartBinding {
    constructor(t, e, i, s, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = i;
        this.owner = r;
        this.mode = 2;
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.l = s;
        this.oL = n;
    }
    updateTarget() {
        this.owner.ut();
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (t != this.v) {
            this.v = t;
            if (Bt(t)) this.observeCollection(t);
            this.updateTarget();
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        L(this.ast, t, this);
        this.v = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        if (Bt(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
    }
}

Be(InterpolationPartBinding);

Ee(InterpolationPartBinding, (() => "updateTarget"));

E(InterpolationPartBinding);

Re(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.p = n;
        this.ast = r;
        this.target = o;
        this.strict = l;
        this.isBound = false;
        this.mode = 2;
        this.ot = null;
        this.v = "";
        this.boundFn = false;
        this.l = e;
        this.lt = t;
        this.oL = i;
        this.ht = s;
    }
    updateTarget(t) {
        const e = this.target;
        const i = this.p.Node;
        const s = this.v;
        this.v = t;
        if (s instanceof i) s.parentNode?.removeChild(s);
        if (t instanceof i) {
            e.textContent = "";
            e.parentNode?.insertBefore(t, e);
        } else e.textContent = String(t);
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (t === this.v) {
            this.ot?.cancel();
            this.ot = null;
            return;
        }
        const e = 1 !== this.lt.state;
        if (e) this.ft(t); else this.updateTarget(t);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.v = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (Bt(t)) this.observeCollection(t);
        const e = 1 !== this.lt.state;
        if (e) this.ft(t); else this.updateTarget(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        L(this.ast, t, this);
        const e = this.v = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        if (Bt(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
        this.ot?.cancel();
        this.ot = null;
    }
    ft(t) {
        const e = this.ot;
        this.ot = this.ht.queueTask((() => {
            this.ot = null;
            this.updateTarget(t);
        }), $e);
        e?.cancel();
    }
}

Be(ContentBinding);

Ee(ContentBinding, (() => "updateTarget"));

E()(ContentBinding);

Re(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, i, s, n = false) {
        this.ast = i;
        this.targetProperty = s;
        this.isBound = false;
        this.s = void 0;
        this.target = null;
        this.boundFn = false;
        this.l = t;
        this.oL = e;
        this.dt = n;
    }
    updateTarget() {
        this.target[this.targetProperty] = this.v;
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        this.v = T(this.ast, this.s, this, this);
        this.obs.clear();
        this.updateTarget();
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        this.target = this.dt ? t.bindingContext : t.overrideContext;
        L(this.ast, t, this);
        this.v = T(this.ast, this.s, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
    }
}

Be(LetBinding);

Ee(LetBinding, (() => "updateTarget"));

E(LetBinding);

Re(true)(LetBinding);

class PropertyBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.s = void 0;
        this.ct = void 0;
        this.ot = null;
        this.gt = null;
        this.boundFn = false;
        this.l = e;
        this.lt = t;
        this.ht = s;
        this.oL = i;
    }
    updateTarget(t) {
        this.ct.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        U(this.ast, this.s, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        const e = 1 !== this.lt.state && (4 & this.ct.type) > 0;
        if (e) {
            qe = this.ot;
            this.ot = this.ht.queueTask((() => {
                this.updateTarget(t);
                this.ot = null;
            }), Me);
            qe?.cancel();
            qe = null;
        } else this.updateTarget(t);
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        L(this.ast, t, this);
        const e = this.oL;
        const i = this.mode;
        let s = this.ct;
        if (!s) {
            if (4 & i) s = e.getObserver(this.target, this.targetProperty); else s = e.getAccessor(this.target, this.targetProperty);
            this.ct = s;
        }
        const n = (2 & i) > 0;
        if (i & (2 | 1)) this.updateTarget(T(this.ast, this.s, this, n ? this : null));
        if (4 & i) {
            s.subscribe(this.gt ?? (this.gt = new BindingTargetSubscriber(this, this.l.get(Ie))));
            if (!n) this.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.s, this);
        this.s = void 0;
        if (this.gt) {
            this.ct.unsubscribe(this.gt);
            this.gt = null;
        }
        this.ot?.cancel();
        this.ot = null;
        this.obs.clearAll();
    }
    useTargetObserver(t) {
        this.ct?.unsubscribe(this);
        (this.ct = t).subscribe(this);
    }
    useTargetSubscriber(t) {
        if (null != this.gt) throw pt(`AURxxxx: binding already has a target subscriber`);
        this.gt = t;
    }
}

Be(PropertyBinding);

Ee(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

E(PropertyBinding);

Re(true, false)(PropertyBinding);

let qe = null;

const Me = {
    reusable: false,
    preempt: true
};

class RefBinding {
    constructor(t, e, i) {
        this.ast = e;
        this.target = i;
        this.isBound = false;
        this.s = void 0;
        this.l = t;
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        L(this.ast, t, this);
        U(this.ast, this.s, this, this.target);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (T(this.ast, this.s, this, null) === this.target) U(this.ast, this.s, this, null);
        D(this.ast, this.s, this);
        this.s = void 0;
    }
}

Re(false)(RefBinding);

class ListenerBindingOptions {
    constructor(t, e = false) {
        this.prevent = t;
        this.capture = e;
    }
}

class ListenerBinding {
    constructor(t, e, i, s, n) {
        this.ast = e;
        this.target = i;
        this.targetEvent = s;
        this.isBound = false;
        this.self = false;
        this.boundFn = true;
        this.l = t;
        this.vt = n;
    }
    callSource(t) {
        const e = this.s.overrideContext;
        e.$event = t;
        let i = T(this.ast, this.s, this, null);
        delete e.$event;
        if (Rt(i)) i = i(t);
        if (true !== i && this.vt.prevent) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        if (this.self) if (this.target !== t.composedPath()[0]) return;
        this.callSource(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        L(this.ast, t, this);
        this.target.addEventListener(this.targetEvent, this, this.vt);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.s, this);
        this.s = void 0;
        this.target.removeEventListener(this.targetEvent, this, this.vt);
    }
}

Be(ListenerBinding);

Ee(ListenerBinding, (() => "callSource"));

Re(true, true)(ListenerBinding);

const _e = jt("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(zt(_e, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Fe = xt({
    creating: Oe("creating"),
    hydrating: Oe("hydrating"),
    hydrated: Oe("hydrated"),
    activating: Oe("activating"),
    activated: Oe("activated"),
    deactivating: Oe("deactivating"),
    deactivated: Oe("deactivated")
});

function Oe(t) {
    function e(e, i) {
        if (Rt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ve(t, e) {
    if (null == t) throw pt(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!Rt(e) && (null == e || !(e in l.prototype))) throw pt(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!Rt(r?.value)) throw pt(`AUR0774:${String(n)}`);
        He.add(l, h);
        if (Qe(l)) Je(l).watches.push(h);
        if (Hs(l)) Gs(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Ne = l;

const je = ht("watch");

const He = xt({
    name: je,
    add(t, e) {
        let i = st(je, t);
        if (null == i) rt(je, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return st(je, t) ?? Ne;
    }
});

function We(t) {
    return function(e) {
        return Ze(t, e);
    };
}

function ze(t) {
    return function(e) {
        return Ze(St(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, i, s, n, r, o, l, h, a) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
        this.defaultBindingMode = n;
        this.isTemplateController = r;
        this.bindables = o;
        this.noMultiBindings = l;
        this.watches = h;
        this.dependencies = a;
    }
    get type() {
        return 2;
    }
    static create(t, e) {
        let s;
        let n;
        if (St(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(e, i(Ke(e, "name"), s), a(Ke(e, "aliases"), n.aliases, e.aliases), Xe(s), i(Ke(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(Ke(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), qt.from(e, ...qt.getAll(e), Ke(e, "bindables"), e.bindables, n.bindables), i(Ke(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), a(He.getAnnotation(e), e.watches), a(Ke(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Gt(i, e).register(t);
        Wt(i, e).register(t);
        Qt(s, ti, i, t);
    }
}

const Ge = at("custom-attribute");

const Xe = t => `${Ge}:${t}`;

const Ke = (t, e) => st(ht(e), t);

const Qe = t => Rt(t) && nt(Ge, t);

const Ye = (t, e) => ms(t, Xe(e)) ?? void 0;

const Ze = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    rt(Ge, i, i.Type);
    rt(Ge, i, i);
    ct(e, Ge);
    return i.Type;
};

const Je = t => {
    const e = st(Ge, t);
    if (void 0 === e) throw pt(`AUR0759:${t.name}`);
    return e;
};

const ti = xt({
    name: Ge,
    keyFrom: Xe,
    isType: Qe,
    for: Ye,
    define: Ze,
    getDefinition: Je,
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: Ke
});

function ei(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        rt(si, ChildrenDefinition.create(e, i), t.constructor, e);
        ut(t.constructor, ni.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (St(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function ii(t) {
    return t.startsWith(si);
}

const si = ht("children-observer");

const ni = xt({
    name: si,
    keyFrom: t => `${si}:${t}`,
    from(...t) {
        const e = {};
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function s(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function n(t) {
            if (Bt(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) yt(t).forEach((e => s(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(t) {
        const i = si.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let a;
        while (--r >= 0) {
            a = n[r];
            l = ft(a).filter(ii);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = st(si, a, l[t].slice(i));
        }
        return s;
    }
});

const ri = {
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? ri, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = oi, r = li, o = hi, l) {
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
                this.xt();
            })))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = l;
        }
    }
    xt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return ci(this.controller, this.query, this.filter, this.map);
    }
}

I()(ChildrenObserver);

function oi(t) {
    return t.host.childNodes;
}

function li(t, e, i) {
    return !!i;
}

function hi(t, e, i) {
    return i;
}

const ai = {
    optional: true
};

function ci(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let a;
    let c = 0;
    for (;c < r; ++c) {
        l = n[c];
        h = Ws(l, ai);
        a = h?.viewModel ?? null;
        if (i(l, h, a)) o.push(s(l, h, a));
    }
    return o;
}

const ui = c;

const fi = (t, e, i, s) => {
    t.addEventListener(e, i, s);
};

const di = (t, e, i, s) => {
    t.removeEventListener(e, i, s);
};

const mi = t => {
    const e = t.prototype;
    Lt(e, "subscribe", (function(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            for (gi of this.wt.events) fi(this.bt, gi, this);
            this.yt = true;
            this.kt?.();
        }
    }));
    Lt(e, "unsubscribe", (function(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            for (gi of this.wt.events) di(this.bt, gi, this);
            this.yt = false;
            this.At?.();
        }
    }));
    Lt(e, "useConfig", (function(t) {
        this.wt = t;
        if (this.yt) {
            for (gi of this.wt.events) di(this.bt, gi, this);
            for (gi of this.wt.events) fi(this.bt, gi, this);
        }
    }));
};

let gi;

const pi = t => {
    Lt(t.prototype, "subscribe", n);
    Lt(t.prototype, "unsubscribe", n);
};

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.Ct = {};
        this.Bt = 0;
        this.Z = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t) {
        this.value = t;
        this.Z = t !== this.ov;
        this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            const t = this.value;
            const e = this.Ct;
            const i = vi(t);
            let s = this.Bt;
            this.ov = t;
            if (i.length > 0) this.Rt(i);
            this.Bt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!vt.call(e, t) || e[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    Rt(t) {
        const e = this.obj;
        const i = t.length;
        let s = 0;
        let n;
        for (;s < i; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.Ct[n] = this.Bt;
            e.classList.add(n);
        }
    }
}

function vi(t) {
    if (St(t)) return xi(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...vi(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...xi(i)); else e.push(i);
    return e;
}

function xi(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

pi(ClassAttributeAccessor);

function wi(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = wt({}, ...this.modules);
        const s = Ze({
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
                this.element.className = vi(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ ps ], e));
        t.register(s);
    }
}

function bi(...t) {
    return new ShadowDOMRegistry(t);
}

const yi = jt("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(ui))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Ai);
        const i = t.get(yi);
        t.register(zt(ki, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ ui ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ ui ];

const ki = jt("IShadowDOMStyles");

const Ai = jt("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: n
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

const Ci = {
    shadowDOM(t) {
        return Fe.creating(u, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(yi);
                e.register(zt(Ai, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: Bi, exit: Ri} = $;

const {wrap: Si, unwrap: Ii} = q;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.$get = i;
        this.useProxy = n;
        this.isBound = false;
        this.running = false;
        this.v = void 0;
        this.cb = s;
        this.oL = e;
    }
    get value() {
        return this.v;
    }
    handleChange() {
        this.run();
    }
    handleCollectionChange() {
        this.run();
    }
    bind() {
        if (this.isBound) return;
        this.compute();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
    }
    run() {
        if (!this.isBound || this.running) return;
        const t = this.obj;
        const e = this.v;
        const i = this.compute();
        if (!Pt(i, e)) this.cb.call(t, i, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            Bi(this);
            return this.v = Ii(this.$get.call(void 0, this.useProxy ? Si(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Ri(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, i, s, n) {
        this.scope = t;
        this.l = e;
        this.oL = i;
        this.isBound = false;
        this.boundFn = false;
        this.obj = t.bindingContext;
        this.St = s;
        this.cb = n;
    }
    get value() {
        return this.v;
    }
    handleChange(t) {
        const e = this.St;
        const i = this.obj;
        const s = this.v;
        const n = 1 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = T(e, this.scope, this, this);
            this.obs.clear();
        }
        if (!Pt(t, s)) {
            this.v = t;
            this.cb.call(i, t, s, i);
        }
    }
    bind() {
        if (this.isBound) return;
        this.obs.version++;
        this.v = T(this.St, this.scope, this, this);
        this.obs.clear();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
        this.v = void 0;
    }
}

E(ComputedWatcher);

E(ExpressionWatcher);

Re(true)(ExpressionWatcher);

const Ti = jt("ILifecycleHooks");

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
        while (s !== mt) {
            for (const t of bt(s)) if ("constructor" !== t) i.add(t);
            s = Object.getPrototypeOf(s);
        }
        return new LifecycleHooksDefinition(e, i);
    }
    register(t) {
        Ht(Ti, this.Type).register(t);
    }
}

const Pi = new WeakMap;

const Ei = ht("lifecycle-hooks");

const Li = xt({
    name: Ei,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        rt(Ei, i, e);
        ct(e, Ei);
        return i.Type;
    },
    resolve(t) {
        let e = Pi.get(t);
        if (void 0 === e) {
            Pi.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Ti) : t.has(Ti, false) ? i.getAll(Ti).concat(t.getAll(Ti)) : i.getAll(Ti);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = st(Ei, n.constructor);
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

function Di() {
    return function t(e) {
        return Li.define({}, e);
    };
}

const Ui = jt("IViewFactory");

class ViewFactory {
    constructor(t, e) {
        this.isCaching = false;
        this.K = null;
        this.It = -1;
        this.name = e.name;
        this.container = t;
        this.def = e;
    }
    setCacheSize(t, e) {
        if (t) {
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (St(t)) t = parseInt(t, 10);
            if (-1 === this.It || !e) this.It = t;
        }
        if (this.It > 0) this.K = []; else this.K = null;
        this.isCaching = this.It > 0;
    }
    canReturnToCache(t) {
        return null != this.K && this.K.length < this.It;
    }
    tryReturnToCache(t) {
        if (this.canReturnToCache(t)) {
            this.K.push(t);
            return true;
        }
        return false;
    }
    create(t) {
        const e = this.K;
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

const $i = jt("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.Tt = new WeakMap;
        this.Pt = new WeakMap;
        const e = t.root;
        this.p = (this.Et = e).get(ui);
        this.ep = e.get(M);
        this.oL = e.get(_);
        this.Lt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return this.Dt ?? (this.Dt = this.Et.getAll(hn, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), gt()));
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.Tt;
            const n = e.get(ln);
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
        if (true === t.enhance) return new FragmentNodeSequence(this.p, t.template);
        let e;
        const i = this.Pt;
        if (i.has(t)) e = i.get(t); else {
            const s = this.p;
            const n = s.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof s.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (St(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            i.set(t, e);
        }
        return null == e ? this.Lt : new FragmentNodeSequence(this.p, e.cloneNode(true));
    }
    render(t, e, i, s) {
        const n = i.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw pt(`AUR0757:${o}<>${n.length}`);
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
                r[u.type].render(t, f, u, this.p, this.ep, this.oL);
                ++h;
            }
            ++l;
        }
        if (null != s) {
            c = i.surrogates;
            if ((a = c.length) > 0) {
                h = 0;
                while (a > h) {
                    u = c[h];
                    r[u.type].render(t, s, u, this.p, this.ep, this.oL);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ u ];

var qi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(qi || (qi = {}));

var Mi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Mi || (Mi = {}));

const _i = {
    optional: true
};

const Fi = new WeakMap;

class Controller {
    constructor(t, e, i, s, n, r, o) {
        this.container = t;
        this.vmKind = e;
        this.definition = i;
        this.viewFactory = s;
        this.host = r;
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
        this.Ut = null;
        this.state = 0;
        this.$t = false;
        this.qt = l;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.Mt = 0;
        this._t = 0;
        this.Ft = 0;
        this.Ot = n;
        this.Vt = 2 === e ? HooksDefinition.none : new HooksDefinition(n);
        this.location = o;
        this.r = t.root.get($i);
    }
    get lifecycleHooks() {
        return this.Ut;
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
    get hooks() {
        return this.Vt;
    }
    get viewModel() {
        return this.Ot;
    }
    set viewModel(t) {
        this.Ot = t;
        this.Vt = null == t || 2 === this.vmKind ? HooksDefinition.none : new HooksDefinition(t);
    }
    static getCached(t) {
        return Fi.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw pt(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (Fi.has(e)) return Fi.get(e);
        n = n ?? Gs(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(f(Ji));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        Xt(t, Ji, new d("IHydrationContext", new HydrationContext(o, s, l)));
        Fi.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (Fi.has(e)) return Fi.get(e);
        s = s ?? Je(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        Fi.set(e, n);
        n.Nt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = e ?? null;
        i.jt();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.Ot;
        let r = this.definition;
        this.scope = F.create(n, null, true);
        if (r.watches.length > 0) Wi(this, i, r, n);
        Vi(this, r, s, n);
        this.qt = Ni(this, r, n);
        if (this.Vt.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.Ut = Li.resolve(i);
        r.register(i);
        if (null !== r.injectable) Xt(i, r.injectable, new d("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.Ut.hydrating) this.Ut.hydrating.forEach(is, this);
        if (this.Vt.hasHydrating) this.Ot.hydrating(this);
        const e = this.Ht = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = Ws(this.host, _i))) {
            this.host = this.container.root.get(ui).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = ks(this.host);
        }
        gs(this.host, Fs, this);
        gs(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw pt(`AUR0501`);
            gs(this.shadowRoot = this.host.attachShadow(i ?? Xi), Fs, this);
            gs(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            gs(o, Fs, this);
            gs(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.Ot.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.Ut.hydrated) this.Ut.hydrated.forEach(ss, this);
        if (this.Vt.hasHydrated) this.Ot.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ht, this.host);
        if (void 0 !== this.Ut.created) this.Ut.created.forEach(es, this);
        if (this.Vt.hasCreated) this.Ot.created(this);
    }
    Nt() {
        const t = this.definition;
        const e = this.Ot;
        if (t.watches.length > 0) Wi(this, this.container, t, e);
        Vi(this, t, this.flags, e);
        e.$controller = this;
        this.Ut = Li.resolve(this.container);
        if (void 0 !== this.Ut.created) this.Ut.created.forEach(es, this);
        if (this.Vt.hasCreated) this.Ot.created(this);
    }
    jt() {
        this.Ht = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Ht.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Ht)).findTargets(), this.Ht, void 0);
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
            throw pt(`AUR0502:${this.name}`);

          default:
            throw pt(`AUR0503:${this.name} ${Yi(this.state)}`);
        }
        this.parent = e;
        i |= 1;
        switch (this.vmKind) {
          case 0:
            this.scope.parent = s ?? null;
            break;

          case 1:
            this.scope = s ?? null;
            break;

          case 2:
            if (void 0 === s || null === s) throw pt(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = t;
        this.$flags = i;
        this.Wt();
        let n;
        if (2 !== this.vmKind && null != this.Ut.binding) n = m(...this.Ut.binding.map(ns, this));
        if (this.Vt.hasBinding) n = m(n, this.Ot.binding(this.$initiator, this.parent, this.$flags));
        if (Ct(n)) {
            this.zt();
            n.then((() => {
                this.bind();
            })).catch((t => {
                this.Gt(t);
            }));
            return this.$promise;
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let t = 0;
        let e = this.qt.length;
        let i;
        if (e > 0) while (e > t) {
            this.qt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            e = this.bindings.length;
            while (e > t) {
                this.bindings[t].bind(this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.Ut.bound) i = m(...this.Ut.bound.map(rs, this));
        if (this.Vt.hasBound) i = m(i, this.Ot.bound(this.$initiator, this.parent, this.$flags));
        if (Ct(i)) {
            this.zt();
            i.then((() => {
                this.isBound = true;
                this.Xt();
            })).catch((t => {
                this.Gt(t);
            }));
            return;
        }
        this.isBound = true;
        this.Xt();
    }
    Kt(...t) {
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
    Xt() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Kt(this.host);
            break;

          case 3:
            this.hostController.Kt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(ki, false) ? t.get(ki) : t.get(Ai);
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
        if (2 !== this.vmKind && null != this.Ut.attaching) e = m(...this.Ut.attaching.map(os, this));
        if (this.Vt.hasAttaching) e = m(e, this.Ot.attaching(this.$initiator, this.parent, this.$flags));
        if (Ct(e)) {
            this.zt();
            this.Wt();
            e.then((() => {
                this.Qt();
            })).catch((t => {
                this.Gt(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.Qt();
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
            throw pt(`AUR0505:${this.name} ${Yi(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Yt();
        let s = 0;
        let n;
        if (this.qt.length) for (;s < this.qt.length; ++s) this.qt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.Ut.detaching) n = m(...this.Ut.detaching.map(hs, this));
        if (this.Vt.hasDetaching) n = m(n, this.Ot.detaching(this.$initiator, this.parent, this.$flags));
        if (Ct(n)) {
            this.zt();
            t.Yt();
            n.then((() => {
                t.Zt();
            })).catch((e => {
                t.Gt(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.Zt();
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
        if (null !== this.bindings) for (;e < this.bindings.length; ++e) this.bindings[e].unbind();
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
            this.scope.parent = null;
            break;
        }
        if (4 === (4 & t) && this.$initiator === this) this.dispose();
        this.state = 32 & this.state | 8;
        this.$initiator = null;
        this.Jt();
    }
    zt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.zt();
        }
    }
    Jt() {
        if (void 0 !== this.$promise) {
            cs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            cs();
            cs = void 0;
        }
    }
    Gt(t) {
        if (void 0 !== this.$promise) {
            us = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            us(t);
            us = void 0;
        }
        if (this.$initiator !== this) this.parent.Gt(t);
    }
    Wt() {
        ++this.Mt;
        if (this.$initiator !== this) this.parent.Wt();
    }
    Qt() {
        if (0 === --this.Mt) {
            if (2 !== this.vmKind && null != this.Ut.attached) fs = m(...this.Ut.attached.map(ls, this));
            if (this.Vt.hasAttached) fs = m(fs, this.Ot.attached(this.$initiator, this.$flags));
            if (Ct(fs)) {
                this.zt();
                fs.then((() => {
                    this.state = 2;
                    this.Jt();
                    if (this.$initiator !== this) this.parent.Qt();
                })).catch((t => {
                    this.Gt(t);
                }));
                fs = void 0;
                return;
            }
            fs = void 0;
            this.state = 2;
            this.Jt();
        }
        if (this.$initiator !== this) this.parent.Qt();
    }
    Yt() {
        ++this._t;
    }
    Zt() {
        if (0 === --this._t) {
            this.te();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.Ut.unbinding) e = m(...t.Ut.unbinding.map(as, this));
                if (t.Vt.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = m(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (Ct(e)) {
                    this.zt();
                    this.te();
                    e.then((() => {
                        this.ee();
                    })).catch((t => {
                        this.Gt(t);
                    }));
                }
                e = void 0;
                t = t.next;
            }
            this.ee();
        }
    }
    te() {
        ++this.Ft;
    }
    ee() {
        if (0 === --this.Ft) {
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
            return Je(this.Ot.constructor).name === t;

          case 0:
            return Gs(this.Ot.constructor).name === t;

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
            gs(t, Fs, this);
            gs(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            gs(t, Fs, this);
            gs(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            gs(t, Fs, this);
            gs(t, this.definition.key, this);
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
        if (this.Vt.hasDispose) this.Ot.dispose();
        if (null !== this.children) {
            this.children.forEach(ts);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.Ot) {
            Fi.delete(this.Ot);
            this.Ot = null;
        }
        this.Ot = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.Vt.hasAccept && true === this.Ot.accept(t)) return true;
        if (null !== this.children) {
            const {children: e} = this;
            for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
        }
    }
}

function Oi(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Vi(t, e, i, s) {
    const n = e.bindables;
    const r = bt(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = Oi(s);
        const a = t.container;
        const c = a.has(O, true) ? a.get(O) : null;
        for (;l < o; ++l) {
            e = r[l];
            if (void 0 === h[e]) {
                i = n[e];
                h[e] = new BindableObserver(s, e, i.callback, i.set, t, c);
            }
        }
    }
}

function Ni(t, e, i) {
    const s = e.childrenObservers;
    const n = bt(s);
    const r = n.length;
    if (r > 0) {
        const e = Oi(i);
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
    return l;
}

const ji = new Map;

const Hi = t => {
    let e = ji.get(t);
    if (null == e) {
        e = new V(t, 0);
        ji.set(t, e);
    }
    return e;
};

function Wi(t, e, i, s) {
    const n = e.get(_);
    const r = e.get(M);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : F.create(s, null, true);
    const h = o.length;
    let a;
    let c;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: a, callback: c} = o[f]);
        c = Rt(c) ? c : Reflect.get(s, c);
        if (!Rt(c)) throw pt(`AUR0506:${String(c)}`);
        if (Rt(a)) t.addBinding(new ComputedWatcher(s, n, a, c, true)); else {
            u = St(a) ? r.parse(a, 16) : Hi(a);
            t.addBinding(new ExpressionWatcher(l, e, n, u, c));
        }
    }
}

function zi(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Gi(t) {
    return S(t) && Hs(t.constructor);
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

const Xi = {
    mode: "open"
};

var Ki;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(Ki || (Ki = {}));

var Qi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Qi || (Qi = {}));

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

const Zi = jt("IController");

const Ji = jt("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function ts(t) {
    t.dispose();
}

function es(t) {
    t.instance.created(this.Ot, this);
}

function is(t) {
    t.instance.hydrating(this.Ot, this);
}

function ss(t) {
    t.instance.hydrated(this.Ot, this);
}

function ns(t) {
    return t.instance.binding(this.Ot, this["$initiator"], this.parent, this["$flags"]);
}

function rs(t) {
    return t.instance.bound(this.Ot, this["$initiator"], this.parent, this["$flags"]);
}

function os(t) {
    return t.instance.attaching(this.Ot, this["$initiator"], this.parent, this["$flags"]);
}

function ls(t) {
    return t.instance.attached(this.Ot, this["$initiator"], this["$flags"]);
}

function hs(t) {
    return t.instance.detaching(this.Ot, this["$initiator"], this.parent, this["$flags"]);
}

function as(t) {
    return t.instance.unbinding(this.Ot, this["$initiator"], this.parent, this["$flags"]);
}

let cs;

let us;

let fs;

const ds = jt("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.ie = void 0;
        this.host = t.host;
        s.prepare(this);
        Xt(i, e.HTMLElement, Xt(i, e.Element, Xt(i, ps, new d("ElementResolver", t.host))));
        this.ie = g(this.se("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (Hs(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return g(this.se("hydrating"), (() => {
                o.hS(null);
                return g(this.se("hydrated"), (() => {
                    o.hC();
                    this.ie = void 0;
                }));
            }));
        }));
    }
    activate() {
        return g(this.ie, (() => g(this.se("activating"), (() => g(this.controller.activate(this.controller, null, 1, void 0), (() => this.se("activated")))))));
    }
    deactivate() {
        return g(this.se("deactivating"), (() => g(this.controller.deactivate(this.controller, null, 0), (() => this.se("deactivated")))));
    }
    se(t) {
        return m(...this.container.getAll(_e).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function ms(t, e) {
    return t.$au?.[e] ?? null;
}

function gs(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const ps = jt("INode");

const vs = jt("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(ds, true)) return t.get(ds).host;
    return t.get(ui).document;
}))));

const xs = jt("IRenderLocation");

const ws = new WeakMap;

function bs(t) {
    if (ws.has(t)) return ws.get(t);
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
        const e = Ws(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return bs(e.host);
    }
    return t.parentNode;
}

function ys(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ws.set(i[t], e);
    } else ws.set(t, e);
}

function ks(t) {
    if (As(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function As(t) {
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
            if ("AU-M" === r.nodeName) o[s] = ks(r); else o[s] = r;
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
        if (As(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Cs = jt("IWindow", (t => t.callback((t => t.get(ui).window))));

const Bs = jt("ILocation", (t => t.callback((t => t.get(Cs).location))));

const Rs = jt("IHistory", (t => t.callback((t => t.get(Cs).history))));

function Ss(t) {
    return function(e) {
        return js(t, e);
    };
}

function Is(t) {
    if (void 0 === t) return function(t) {
        Ns(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!Rt(t)) return function(e) {
        Ns(e, "shadowOptions", t);
    };
    Ns(t, "shadowOptions", {
        mode: "open"
    });
}

function Ts(t) {
    if (void 0 === t) return function(t) {
        Ps(t);
    };
    Ps(t);
}

function Ps(t) {
    const e = st(Fs, t);
    if (void 0 === e) {
        Ns(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function Es(t) {
    if (void 0 === t) return function(t) {
        Ns(t, "isStrictBinding", true);
    };
    Ns(t, "isStrictBinding", true);
}

const Ls = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, a, c, u, f, d, m, g, p, v, x, w, b) {
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
        this.isStrictBinding = g;
        this.shadowOptions = p;
        this.hasSlots = v;
        this.enhance = x;
        this.watches = w;
        this.processContent = b;
    }
    get type() {
        return 1;
    }
    static create(t, e = null) {
        if (null === e) {
            const i = t;
            if (St(i)) throw pt(`AUR0761:${t}`);
            const s = p("name", i, Vs);
            if (Rt(i.Type)) e = i.Type; else e = Ks(v(s));
            return new CustomElementDefinition(e, s, a(i.aliases), p("key", i, (() => Os(s))), p("cache", i, Us), p("capture", i, qs), p("template", i, $s), a(i.instructions), a(i.dependencies), p("injectable", i, $s), p("needsCompile", i, Ms), a(i.surrogates), qt.from(e, i.bindables), ni.from(i.childrenObservers), p("containerless", i, qs), p("isStrictBinding", i, qs), p("shadowOptions", i, $s), p("hasSlots", i, qs), p("enhance", i, qs), p("watches", i, _s), x("processContent", e, $s));
        }
        if (St(t)) return new CustomElementDefinition(e, t, a(zs(e, "aliases"), e.aliases), Os(t), x("cache", e, Us), x("capture", e, qs), x("template", e, $s), a(zs(e, "instructions"), e.instructions), a(zs(e, "dependencies"), e.dependencies), x("injectable", e, $s), x("needsCompile", e, Ms), a(zs(e, "surrogates"), e.surrogates), qt.from(e, ...qt.getAll(e), zs(e, "bindables"), e.bindables), ni.from(...ni.getAll(e), zs(e, "childrenObservers"), e.childrenObservers), x("containerless", e, qs), x("isStrictBinding", e, qs), x("shadowOptions", e, $s), x("hasSlots", e, qs), x("enhance", e, qs), a(He.getAnnotation(e), e.watches), x("processContent", e, $s));
        const i = p("name", t, Vs);
        return new CustomElementDefinition(e, i, a(zs(e, "aliases"), t.aliases, e.aliases), Os(i), w("cache", t, e, Us), w("capture", t, e, qs), w("template", t, e, $s), a(zs(e, "instructions"), t.instructions, e.instructions), a(zs(e, "dependencies"), t.dependencies, e.dependencies), w("injectable", t, e, $s), w("needsCompile", t, e, Ms), a(zs(e, "surrogates"), t.surrogates, e.surrogates), qt.from(e, ...qt.getAll(e), zs(e, "bindables"), e.bindables, t.bindables), ni.from(...ni.getAll(e), zs(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), w("containerless", t, e, qs), w("isStrictBinding", t, e, qs), w("shadowOptions", t, e, $s), w("hasSlots", t, e, qs), w("enhance", t, e, qs), a(t.watches, He.getAnnotation(e), e.watches), w("processContent", t, e, $s));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Ls.has(t)) return Ls.get(t);
        const e = CustomElementDefinition.create(t);
        Ls.set(t, e);
        rt(Fs, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            Gt(i, e).register(t);
            Wt(i, e).register(t);
            Qt(s, Qs, i, t);
        }
    }
}

const Ds = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Us = () => 0;

const $s = () => null;

const qs = () => false;

const Ms = () => true;

const _s = () => l;

const Fs = at("custom-element");

const Os = t => `${Fs}:${t}`;

const Vs = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Ns = (t, e, i) => {
    rt(ht(e), i, t);
};

const js = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    rt(Fs, i, i.Type);
    rt(Fs, i, i);
    ct(i.Type, Fs);
    return i.Type;
};

const Hs = t => Rt(t) && nt(Fs, t);

const Ws = (t, e = Ds) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = ms(t, Fs);
        if (null === i) {
            if (true === e.optional) return null;
            throw pt(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = ms(t, Fs);
            if (null === i) throw pt(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = ms(i, Fs);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = bs(i);
        }
        if (s) return;
        throw pt(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = ms(i, Fs);
        if (null !== t) return t;
        i = bs(i);
    }
    throw pt(`AUR0765`);
};

const zs = (t, e) => st(ht(e), t);

const Gs = t => {
    const e = st(Fs, t);
    if (void 0 === e) throw pt(`AUR0760:${t.name}`);
    return e;
};

const Xs = () => {
    const t = function(e, i, s) {
        const n = r.getOrCreateAnnotationParamTypes(e);
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

const Ks = function() {
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
        if (s !== e) wt(n.prototype, s);
        return n;
    };
}();

const Qs = xt({
    name: Fs,
    keyFrom: Os,
    isType: Hs,
    for: Ws,
    define: js,
    getDefinition: Gs,
    annotate: Ns,
    getAnnotation: zs,
    generateName: Vs,
    createInjectable: Xs,
    generateType: Ks
});

const Ys = ht("processContent");

function Zs(t) {
    return void 0 === t ? function(t, e, i) {
        rt(Ys, Js(t, e), t);
    } : function(e) {
        t = Js(e, t);
        const i = st(Fs, e);
        if (void 0 !== i) i.processContent = t; else rt(Ys, t, e);
        return e;
    };
}

function Js(t, e) {
    if (St(e)) e = t[e];
    if (!Rt(e)) throw pt(`AUR0766:${typeof e}`);
    return e;
}

function tn(t) {
    return function(e) {
        const i = Rt(t) ? t : true;
        Ns(e, "capture", i);
        if (Hs(e)) Gs(e).capture = i;
    };
}

const en = jt("IProjections");

const sn = jt("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var nn;

(function(t) {
    t["hydrateElement"] = "ra";
    t["hydrateAttribute"] = "rb";
    t["hydrateTemplateController"] = "rc";
    t["hydrateLetElement"] = "rd";
    t["setProperty"] = "re";
    t["interpolation"] = "rf";
    t["propertyBinding"] = "rg";
    t["letBinding"] = "ri";
    t["refBinding"] = "rj";
    t["iteratorBinding"] = "rk";
    t["multiAttr"] = "rl";
    t["textBinding"] = "ha";
    t["listenerBinding"] = "hb";
    t["attributeBinding"] = "hc";
    t["stylePropertyBinding"] = "hd";
    t["setAttribute"] = "he";
    t["setClassAttribute"] = "hf";
    t["setStyleAttribute"] = "hg";
    t["spreadBinding"] = "hs";
    t["spreadElementProp"] = "hp";
})(nn || (nn = {}));

const rn = jt("Instruction");

function on(t) {
    const e = t.type;
    return St(e) && 2 === e.length;
}

class InterpolationInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "rf";
    }
}

class PropertyBindingInstruction {
    constructor(t, e, i) {
        this.from = t;
        this.to = e;
        this.mode = i;
        this.type = "rg";
    }
}

class IteratorBindingInstruction {
    constructor(t, e, i) {
        this.forOf = t;
        this.to = e;
        this.props = i;
        this.type = "rk";
    }
}

class RefBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "rj";
    }
}

class SetPropertyInstruction {
    constructor(t, e) {
        this.value = t;
        this.to = e;
        this.type = "re";
    }
}

class MultiAttrInstruction {
    constructor(t, e, i) {
        this.value = t;
        this.to = e;
        this.command = i;
        this.type = "rl";
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
        this.type = "ra";
        this.auSlot = null;
    }
}

class HydrateAttributeInstruction {
    constructor(t, e, i) {
        this.res = t;
        this.alias = e;
        this.props = i;
        this.type = "rb";
    }
}

class HydrateTemplateController {
    constructor(t, e, i, s) {
        this.def = t;
        this.res = e;
        this.alias = i;
        this.props = s;
        this.type = "rc";
    }
}

class HydrateLetElementInstruction {
    constructor(t, e) {
        this.instructions = t;
        this.toBindingContext = e;
        this.type = "rd";
    }
}

class LetBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "ri";
    }
}

class TextBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.strict = e;
        this.type = "ha";
    }
}

class ListenerBindingInstruction {
    constructor(t, e, i, s) {
        this.from = t;
        this.to = e;
        this.preventDefault = i;
        this.capture = s;
        this.type = "hb";
    }
}

class StylePropertyBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "hd";
    }
}

class SetAttributeInstruction {
    constructor(t, e) {
        this.value = t;
        this.to = e;
        this.type = "he";
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
        this.type = "hc";
    }
}

class SpreadBindingInstruction {
    constructor() {
        this.type = "hs";
    }
}

class SpreadElementPropBindingInstruction {
    constructor(t) {
        this.instructions = t;
        this.type = "hp";
    }
}

const ln = jt("ITemplateCompiler");

const hn = jt("IRenderer");

function an(t) {
    return function e(i) {
        i.register = function(t) {
            Ht(hn, this).register(t);
        };
        It(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function cn(t, e, i) {
    if (St(e)) return t.parse(e, i);
    return e;
}

function un(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function fn(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Ws(t);

      case "view":
        throw pt(`AUR0750`);

      case "view-model":
        return Ws(t).viewModel;

      default:
        {
            const i = Ye(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = Ws(t, {
                name: e
            });
            if (void 0 === s) throw pt(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let dn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = un(e);
        if (void 0 !== s.$observers?.[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

dn = et([ an("re") ], dn);

let mn = class CustomElementRenderer {
    constructor(t) {
        this.r = t;
    }
    static get inject() {
        return [ $i ];
    }
    render(t, e, i, s, n, r) {
        let o;
        let l;
        let h;
        let a;
        const c = i.res;
        const u = i.projections;
        const f = t.container;
        switch (typeof c) {
          case "string":
            o = f.find(Qs, c);
            if (null == o) throw pt(`AUR0752:${c}@${t["name"]}`);
            break;

          default:
            o = c;
        }
        const m = i.containerless || o.containerless;
        const g = m ? ks(e) : null;
        const p = qn(s, t, e, i, g, null == u ? void 0 : new AuSlotsInfo(yt(u)));
        l = o.Type;
        h = p.invoke(l);
        Xt(p, l, new d(o.key, h));
        a = Controller.$el(p, h, e, i, o, g);
        gs(e, o.key, a);
        const v = this.r.renderers;
        const x = i.props;
        const w = x.length;
        let b = 0;
        let y;
        while (w > b) {
            y = x[b];
            v[y.type].render(t, a, y, s, n, r);
            ++b;
        }
        t.addChild(a);
    }
};

mn = et([ an("ra") ], mn);

let gn = class CustomAttributeRenderer {
    constructor(t) {
        this.r = t;
    }
    static get inject() {
        return [ $i ];
    }
    render(t, e, i, s, n, r) {
        let o = t.container;
        let l;
        switch (typeof i.res) {
          case "string":
            l = o.find(ti, i.res);
            if (null == l) throw pt(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            l = i.res;
        }
        const h = Mn(s, l, t, e, i, void 0, void 0);
        const a = Controller.$attr(h.ctn, h.vm, e, l);
        gs(e, l.key, a);
        const c = this.r.renderers;
        const u = i.props;
        const f = u.length;
        let d = 0;
        let m;
        while (f > d) {
            m = u[d];
            c[m.type].render(t, a, m, s, n, r);
            ++d;
        }
        t.addChild(a);
    }
};

gn = et([ an("rb") ], gn);

let pn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ $i, ui ];
    }
    render(t, e, i, s, n, r) {
        let o = t.container;
        let l;
        switch (typeof i.res) {
          case "string":
            l = o.find(ti, i.res);
            if (null == l) throw pt(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            l = i.res;
        }
        const h = this.r.getViewFactory(i.def, o);
        const a = ks(e);
        const c = Mn(this.p, l, t, e, i, h, a);
        const u = Controller.$attr(c.ctn, c.vm, e, l);
        gs(a, l.key, u);
        c.vm.link?.(t, u, e, i);
        const f = this.r.renderers;
        const d = i.props;
        const m = d.length;
        let g = 0;
        let p;
        while (m > g) {
            p = d[g];
            f[p.type].render(t, u, p, s, n, r);
            ++g;
        }
        t.addChild(u);
    }
};

pn = et([ an("rc") ], pn);

let vn = class LetElementRenderer {
    render(t, e, i, s, n, r) {
        e.remove();
        const o = i.instructions;
        const l = i.toBindingContext;
        const h = t.container;
        const a = o.length;
        let c;
        let u;
        let f = 0;
        while (a > f) {
            c = o[f];
            u = cn(n, c.from, 16);
            t.addBinding(new LetBinding(h, r, u, c.to, l));
            ++f;
        }
    }
};

vn = et([ an("rd") ], vn);

let xn = class RefBindingRenderer {
    render(t, e, i, s, n) {
        t.addBinding(new RefBinding(t.container, cn(n, i.from, 16), fn(e, i.to)));
    }
};

xn = et([ an("rj") ], xn);

let wn = class InterpolationBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new InterpolationBinding(t, t.container, r, s.domWriteQueue, cn(n, i.from, 1), un(e), i.to, 2));
    }
};

wn = et([ an("rf") ], wn);

let bn = class PropertyBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, s.domWriteQueue, cn(n, i.from, 16), un(e), i.to, i.mode));
    }
};

bn = et([ an("rg") ], bn);

let yn = class IteratorBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, s.domWriteQueue, cn(n, i.forOf, 2), un(e), i.to, 2));
    }
};

yn = et([ an("rk") ], yn);

let kn = class TextBindingRenderer {
    render(t, e, i, s, n, r) {
        const o = t.container;
        const l = e.nextSibling;
        const h = e.parentNode;
        const a = s.document;
        const c = cn(n, i.from, 1);
        const u = c.parts;
        const f = c.expressions;
        const d = f.length;
        let m = 0;
        let g = u[0];
        let p;
        if ("" !== g) h.insertBefore(a.createTextNode(g), l);
        for (;d > m; ++m) {
            p = f[m];
            t.addBinding(new ContentBinding(t, o, r, s.domWriteQueue, s, p, h.insertBefore(a.createTextNode(""), l), i.strict));
            g = u[m + 1];
            if ("" !== g) h.insertBefore(a.createTextNode(g), l);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

kn = et([ an("ha") ], kn);

let An = class ListenerBindingRenderer {
    render(t, e, i, s, n) {
        t.addBinding(new ListenerBinding(t.container, cn(n, i.from, 8), e, i.to, new ListenerBindingOptions(i.preventDefault, i.capture)));
    }
};

An = et([ an("hb") ], An);

let Cn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Cn = et([ an("he") ], Cn);

let Bn = class SetClassAttributeRenderer {
    render(t, e, i) {
        Pn(e.classList, i.value);
    }
};

Bn = et([ an("hf") ], Bn);

let Rn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Rn = et([ an("hg") ], Rn);

let Sn = class StylePropertyBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, s.domWriteQueue, cn(n, i.from, 16), e.style, i.to, 2));
    }
};

Sn = et([ an("hd") ], Sn);

let In = class AttributeBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new AttributeBinding(t, t.container, r, s.domWriteQueue, cn(n, i.from, 16), e, i.attr, i.to, 2));
    }
};

In = et([ an("hc") ], In);

let Tn = class SpreadRenderer {
    constructor(t, e) {
        this.ne = t;
        this.r = e;
    }
    static get inject() {
        return [ ln, $i ];
    }
    render(t, e, i, s, n, r) {
        const o = t.container;
        const h = o.get(Ji);
        const a = this.r.renderers;
        const c = t => {
            let e = t;
            let i = h;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw pt("No scope context for spread binding.");
            return i;
        };
        const u = i => {
            const o = c(i);
            const h = En(o);
            const f = this.ne.compileSpread(o.controller.definition, o.instruction?.captures ?? l, o.controller.container, e);
            let d;
            for (d of f) switch (d.type) {
              case "hs":
                u(i + 1);
                break;

              case "hp":
                a[d.instructions.type].render(h, Ws(e), d.instructions, s, n, r);
                break;

              default:
                a[d.type].render(h, e, d, s, n, r);
            }
            t.addBinding(h);
        };
        u(0);
    }
};

Tn = et([ an("hs") ], Tn);

class SpreadBinding {
    constructor(t, e) {
        this.re = t;
        this.oe = e;
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
    bind(t) {
        if (this.isBound) return;
        this.isBound = true;
        const e = this.scope = this.oe.controller.scope.parent ?? void 0;
        if (null == e) throw pt("Invalid spreading. Context scope is null/undefined");
        this.re.forEach((t => t.bind(e)));
    }
    unbind() {
        this.re.forEach((t => t.unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.re.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw pt("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
    limit() {
        throw pt("not implemented");
    }
    useScope() {
        throw pt("not implemented");
    }
}

function Pn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const En = t => new SpreadBinding([], t);

const Ln = "IController";

const Dn = "IInstruction";

const Un = "IRenderLocation";

const $n = "IAuSlotsInfo";

function qn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    Xt(o, t.HTMLElement, Xt(o, t.Element, Xt(o, ps, new d("ElementResolver", i))));
    Xt(o, Zi, new d(Ln, e));
    Xt(o, rn, new d(Dn, s));
    Xt(o, xs, null == n ? _n : new RenderLocationProvider(n));
    Xt(o, Ui, Fn);
    Xt(o, sn, null == r ? On : new d($n, r));
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
        if (null === t) throw pt(`AUR7055`);
        if (!St(t.name) || 0 === t.name.length) throw pt(`AUR0756`);
        return t;
    }
}

function Mn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    Xt(h, t.HTMLElement, Xt(h, t.Element, Xt(h, ps, new d("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    Xt(h, Zi, new d(Ln, i));
    Xt(h, rn, new d(Dn, n));
    Xt(h, xs, null == o ? _n : new d(Un, o));
    Xt(h, Ui, null == r ? Fn : new ViewFactoryProvider(r));
    Xt(h, sn, null == l ? On : new d($n, l));
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

const _n = new RenderLocationProvider(null);

const Fn = new ViewFactoryProvider(null);

const On = new d($n, new AuSlotsInfo(l));

var Vn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Vn || (Vn = {}));

function Nn(t) {
    return function(e) {
        return zn.define(t, e);
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
        let s;
        let n;
        if (St(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, i(Wn(e, "name"), s), a(Wn(e, "aliases"), n.aliases, e.aliases), Hn(s), i(Wn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ht(i, e).register(t);
        Wt(i, e).register(t);
        Qt(s, zn, i, t);
    }
}

const jn = at("binding-command");

const Hn = t => `${jn}:${t}`;

const Wn = (t, e) => st(ht(e), t);

const zn = xt({
    name: jn,
    keyFrom: Hn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        rt(jn, i, i.Type);
        rt(jn, i, i);
        ct(e, jn);
        return i.Type;
    },
    getAnnotation: Wn
});

let Gn = class OneTimeBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? b(n); else {
            if ("" === r && 1 === t.def.type) r = b(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 1);
    }
};

Gn = et([ Nn("one-time") ], Gn);

let Xn = class ToViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? b(n); else {
            if ("" === r && 1 === t.def.type) r = b(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 2);
    }
};

Xn = et([ Nn("to-view") ], Xn);

let Kn = class FromViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? b(n); else {
            if ("" === r && 1 === t.def.type) r = b(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 4);
    }
};

Kn = et([ Nn("from-view") ], Kn);

let Qn = class TwoWayBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? b(n); else {
            if ("" === r && 1 === t.def.type) r = b(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 6);
    }
};

Qn = et([ Nn("two-way") ], Qn);

let Yn = class DefaultBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        const n = t.bindable;
        let r;
        let o;
        let l = s.target;
        let h = s.rawValue;
        if (null == n) {
            o = i.isTwoWay(t.node, l) ? 6 : 2;
            l = i.map(t.node, l) ?? b(l);
        } else {
            if ("" === h && 1 === t.def.type) h = b(l);
            r = t.def.defaultBindingMode;
            o = 8 === n.mode || null == n.mode ? null == r || 8 === r ? 2 : r : n.mode;
            l = n.property;
        }
        return new PropertyBindingInstruction(e.parse(h, 16), l, o);
    }
};

Yn = et([ Nn("bind") ], Yn);

let Zn = class ForBindingCommand {
    constructor(t) {
        this.le = t;
    }
    get type() {
        return 0;
    }
    static get inject() {
        return [ ee ];
    }
    build(t, e) {
        const i = null === t.bindable ? b(t.attr.target) : t.bindable.property;
        const s = e.parse(t.attr.rawValue, 2);
        let n = l;
        if (s.semiIdx > -1) {
            const e = t.attr.rawValue.slice(s.semiIdx + 1);
            const i = e.indexOf(":");
            if (i > -1) {
                const t = e.slice(0, i).trim();
                const s = e.slice(i + 1).trim();
                const r = this.le.parse(t, s);
                n = [ new MultiAttrInstruction(s, r.target, r.command) ];
            }
        }
        return new IteratorBindingInstruction(s, i, n);
    }
};

Zn = et([ Nn("for") ], Zn);

let Jn = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, true, false);
    }
};

Jn = et([ Nn("trigger") ], Jn);

let tr = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, false, true);
    }
};

tr = et([ Nn("capture") ], tr);

let er = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

er = et([ Nn("attr") ], er);

let ir = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

ir = et([ Nn("style") ], ir);

let sr = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

sr = et([ Nn("class") ], sr);

let nr = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

nr = et([ Nn("ref") ], nr);

let rr = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

rr = et([ Nn("...$attrs") ], rr);

const or = jt("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const lr = t => {
    const e = gt();
    t = St(t) ? t.split(" ") : t;
    let i;
    for (i of t) e[i] = true;
    return e;
};

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

class SVGAnalyzer {
    constructor(t) {
        this.he = wt(gt(), {
            a: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: lr("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: gt(),
            altGlyphDef: lr("id xml:base xml:lang xml:space"),
            altglyphdef: gt(),
            altGlyphItem: lr("id xml:base xml:lang xml:space"),
            altglyphitem: gt(),
            animate: lr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: lr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: lr("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: lr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: lr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: lr("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": lr("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: lr("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: lr("class id style xml:base xml:lang xml:space"),
            ellipse: lr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: lr("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: lr("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: lr("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: lr("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: lr("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: lr("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: lr("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: lr("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: lr("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: lr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: lr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: lr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: lr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: lr("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: lr("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: lr("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: lr("id xml:base xml:lang xml:space"),
            feMorphology: lr("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: lr("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: lr("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: lr("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: lr("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: lr("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: lr("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: lr("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: lr("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": lr("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": lr("id string xml:base xml:lang xml:space"),
            "font-face-name": lr("id name xml:base xml:lang xml:space"),
            "font-face-src": lr("id xml:base xml:lang xml:space"),
            "font-face-uri": lr("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: lr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: lr("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: lr("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: gt(),
            hkern: lr("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: lr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: lr("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: lr("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: lr("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: lr("id xml:base xml:lang xml:space"),
            "missing-glyph": lr("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: lr("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: lr("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: lr("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: lr("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: lr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: lr("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: lr("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: lr("class id offset style xml:base xml:lang xml:space"),
            style: lr("id media title type xml:base xml:lang xml:space"),
            svg: lr("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: lr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: lr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: lr("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: lr("class id style xml:base xml:lang xml:space"),
            tref: lr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: lr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: lr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: lr("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: lr("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.ae = lr("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.ce = lr("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.he;
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
        return Ht(or, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.ae[t.nodeName] && true === this.ce[e] || true === this.he[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ ui ];

const hr = jt("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ue = gt();
        this.fe = gt();
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
        return [ or ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.ue)[n] ?? (e[n] = gt());
            for (r in i) {
                if (void 0 !== s[r]) throw cr(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.fe;
        for (const i in t) {
            if (void 0 !== e[i]) throw cr(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return ar(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.ue[t.nodeName]?.[e] ?? this.fe[e] ?? (At(t, e, this.svg) ? e : null);
    }
}

function ar(t, e) {
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

function cr(t, e) {
    return pt(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const ur = jt("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const fr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.de = t.document.createElement("template");
    }
    createTemplate(t) {
        if (St(t)) {
            let e = fr[t];
            if (void 0 === e) {
                const i = this.de;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.de = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                fr[t] = e;
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

TemplateElementFactory.inject = [ ui ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Ht(ln, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = gr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = St(s.template) || !t.enhance ? n.me.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const a = e.get(Nt(Br));
        const c = a.length;
        let u = 0;
        if (c > 0) while (c > u) {
            a[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(kr)) throw pt(`AUR0701`);
        this.ge(h, n);
        this.pe(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Vs(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.ve(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, gr, null, null, void 0);
        const r = [];
        const o = n.xe(s.nodeName.toLowerCase());
        const l = null !== o;
        const h = n.ep;
        const a = e.length;
        let c = 0;
        let u;
        let f = null;
        let d;
        let m;
        let g;
        let p;
        let v;
        let x = null;
        let w;
        let y;
        let k;
        let A;
        for (;a > c; ++c) {
            u = e[c];
            k = u.target;
            A = u.rawValue;
            x = n.we(u);
            if (null !== x && (1 & x.type) > 0) {
                vr.node = s;
                vr.attr = u;
                vr.bindable = null;
                vr.def = null;
                r.push(x.build(vr, n.ep, n.m));
                continue;
            }
            f = n.be(k);
            if (null !== f) {
                if (f.isTemplateController) throw pt(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === x && dr(A);
                if (y) m = this.ye(s, A, f, n); else {
                    v = g.primary;
                    if (null === x) {
                        w = h.parse(A, 1);
                        m = [ null === w ? new SetPropertyInstruction(A, v.property) : new InterpolationInstruction(w, v.property) ];
                    } else {
                        vr.node = s;
                        vr.attr = u;
                        vr.bindable = v;
                        vr.def = f;
                        m = [ x.build(vr, n.ep, n.m) ];
                    }
                }
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === x) {
                w = h.parse(A, 1);
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        w = h.parse(A, 1);
                        r.push(new SpreadElementPropBindingInstruction(null == w ? new SetPropertyInstruction(A, p.property) : new InterpolationInstruction(w, p.property)));
                        continue;
                    }
                }
                if (null != w) r.push(new InterpolationInstruction(w, n.m.map(s, k) ?? b(k))); else switch (k) {
                  case "class":
                    r.push(new SetClassAttributeInstruction(A));
                    break;

                  case "style":
                    r.push(new SetStyleAttributeInstruction(A));
                    break;

                  default:
                    r.push(new SetAttributeInstruction(A, k));
                }
            } else {
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        vr.node = s;
                        vr.attr = u;
                        vr.bindable = p;
                        vr.def = o;
                        r.push(new SpreadElementPropBindingInstruction(x.build(vr, n.ep, n.m)));
                        continue;
                    }
                }
                vr.node = s;
                vr.attr = u;
                vr.bindable = null;
                vr.def = null;
                r.push(x.build(vr, n.ep, n.m));
            }
        }
        mr();
        if (null != d) return d.concat(r);
        return r;
    }
    ve(t, e) {
        const i = [];
        const s = t.attributes;
        const n = e.ep;
        let r = s.length;
        let o = 0;
        let l;
        let h;
        let a;
        let c;
        let u = null;
        let f;
        let d;
        let m;
        let g;
        let p = null;
        let v;
        let x;
        let w;
        let y;
        for (;r > o; ++o) {
            l = s[o];
            h = l.name;
            a = l.value;
            c = e.le.parse(h, a);
            w = c.target;
            y = c.rawValue;
            if (xr[w]) throw pt(`AUR0702:${h}`);
            p = e.we(c);
            if (null !== p && (1 & p.type) > 0) {
                vr.node = t;
                vr.attr = c;
                vr.bindable = null;
                vr.def = null;
                i.push(p.build(vr, e.ep, e.m));
                continue;
            }
            u = e.be(w);
            if (null !== u) {
                if (u.isTemplateController) throw pt(`AUR0703:${w}`);
                m = BindablesInfo.from(u, true);
                x = false === u.noMultiBindings && null === p && dr(y);
                if (x) d = this.ye(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        vr.node = t;
                        vr.attr = c;
                        vr.bindable = g;
                        vr.def = u;
                        d = [ p.build(vr, e.ep, e.m) ];
                    }
                }
                t.removeAttribute(h);
                --o;
                --r;
                (f ?? (f = [])).push(new HydrateAttributeInstruction(this.resolveResources ? u : u.name, null != u.aliases && u.aliases.includes(w) ? w : void 0, d));
                continue;
            }
            if (null === p) {
                v = n.parse(y, 1);
                if (null != v) {
                    t.removeAttribute(h);
                    --o;
                    --r;
                    i.push(new InterpolationInstruction(v, e.m.map(t, w) ?? b(w)));
                } else switch (h) {
                  case "class":
                    i.push(new SetClassAttributeInstruction(y));
                    break;

                  case "style":
                    i.push(new SetStyleAttributeInstruction(y));
                    break;

                  default:
                    i.push(new SetAttributeInstruction(y, h));
                }
            } else {
                vr.node = t;
                vr.attr = c;
                vr.bindable = null;
                vr.def = null;
                i.push(p.build(vr, e.ep, e.m));
            }
        }
        mr();
        if (null != f) return f.concat(i);
        return i;
    }
    pe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.ke(t, e);

              default:
                return this.Ae(t, e);
            }

          case 3:
            return this.Ce(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.pe(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    ke(t, e) {
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
            a = e.le.parse(c, u);
            d = a.target;
            m = a.rawValue;
            f = e.we(a);
            if (null !== f) {
                if ("bind" === a.command) n.push(new LetBindingInstruction(r.parse(m, 16), b(d))); else throw pt(`AUR0704:${a.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new N(m) : g, b(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.Be(t).nextSibling;
    }
    Ae(t, e) {
        var i, s, r, o;
        const h = t.nextSibling;
        const a = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const c = e.xe(a);
        const u = null !== c;
        const f = u && null != c.shadowOptions;
        const d = c?.capture;
        const m = null != d && "boolean" !== typeof d;
        const g = d ? [] : l;
        const p = e.ep;
        const v = this.debug ? n : () => {
            t.removeAttribute(C);
            --k;
            --y;
        };
        let x = t.attributes;
        let w;
        let y = x.length;
        let k = 0;
        let A;
        let C;
        let B;
        let R;
        let S;
        let I;
        let T = null;
        let P = false;
        let E;
        let L;
        let D;
        let U;
        let $;
        let q;
        let M;
        let _ = null;
        let F;
        let O;
        let V;
        let N;
        let j = true;
        let H = false;
        let W = false;
        if ("slot" === a) {
            if (null == e.root.def.shadowOptions) throw pt(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (u) {
            j = c.processContent?.call(c.Type, t, e.p);
            x = t.attributes;
            y = x.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw pt(`AUR0705`);
        for (;y > k; ++k) {
            A = x[k];
            C = A.name;
            B = A.value;
            switch (C) {
              case "as-element":
              case "containerless":
                v();
                if (!H) H = "containerless" === C;
                continue;
            }
            R = e.le.parse(C, B);
            _ = e.we(R);
            V = R.target;
            N = R.rawValue;
            if (d && (!m || m && d(V))) {
                if (null != _ && 1 & _.type) {
                    v();
                    g.push(R);
                    continue;
                }
                W = "au-slot" !== V && "slot" !== V;
                if (W) {
                    F = BindablesInfo.from(c, false);
                    if (null == F.attrs[V] && !e.be(V)?.isTemplateController) {
                        v();
                        g.push(R);
                        continue;
                    }
                }
            }
            if (null !== _ && 1 & _.type) {
                vr.node = t;
                vr.attr = R;
                vr.bindable = null;
                vr.def = null;
                (S ?? (S = [])).push(_.build(vr, e.ep, e.m));
                v();
                continue;
            }
            T = e.be(V);
            if (null !== T) {
                F = BindablesInfo.from(T, true);
                P = false === T.noMultiBindings && null === _ && dr(N);
                if (P) D = this.ye(t, N, T, e); else {
                    O = F.primary;
                    if (null === _) {
                        q = p.parse(N, 1);
                        D = [ null === q ? new SetPropertyInstruction(N, O.property) : new InterpolationInstruction(q, O.property) ];
                    } else {
                        vr.node = t;
                        vr.attr = R;
                        vr.bindable = O;
                        vr.def = T;
                        D = [ _.build(vr, e.ep, e.m) ];
                    }
                }
                v();
                if (T.isTemplateController) (U ?? (U = [])).push(new HydrateTemplateController(pr, this.resolveResources ? T : T.name, void 0, D)); else (L ?? (L = [])).push(new HydrateAttributeInstruction(this.resolveResources ? T : T.name, null != T.aliases && T.aliases.includes(V) ? V : void 0, D));
                continue;
            }
            if (null === _) {
                if (u) {
                    F = BindablesInfo.from(c, false);
                    E = F.attrs[V];
                    if (void 0 !== E) {
                        q = p.parse(N, 1);
                        (I ?? (I = [])).push(null == q ? new SetPropertyInstruction(N, E.property) : new InterpolationInstruction(q, E.property));
                        v();
                        continue;
                    }
                }
                q = p.parse(N, 1);
                if (null != q) {
                    v();
                    (S ?? (S = [])).push(new InterpolationInstruction(q, e.m.map(t, V) ?? b(V)));
                }
                continue;
            }
            v();
            if (u) {
                F = BindablesInfo.from(c, false);
                E = F.attrs[V];
                if (void 0 !== E) {
                    vr.node = t;
                    vr.attr = R;
                    vr.bindable = E;
                    vr.def = c;
                    (I ?? (I = [])).push(_.build(vr, e.ep, e.m));
                    continue;
                }
            }
            vr.node = t;
            vr.attr = R;
            vr.bindable = null;
            vr.def = null;
            (S ?? (S = [])).push(_.build(vr, e.ep, e.m));
        }
        mr();
        if (this.Re(t) && null != S && S.length > 1) this.Se(t, S);
        if (u) {
            M = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, I ?? l, null, H, g);
            if (a === Er) {
                const i = t.getAttribute("name") || Pr;
                const s = e.h("template");
                const n = e.Ie();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.pe(s.content, n);
                M.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: Vs(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Te(t, e);
            }
        }
        if (null != S || null != M || null != L) {
            w = l.concat(M ?? l, L ?? l, S ?? l);
            this.Be(t);
        }
        let z;
        if (null != U) {
            y = U.length - 1;
            k = y;
            $ = U[k];
            let n;
            this.Te(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.Ie(null == w ? [] : [ w ]);
            let l;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v;
            let x;
            let b = 0, A = 0;
            let C = t.firstChild;
            let B = false;
            if (false !== j) while (null !== C) {
                h = 1 === C.nodeType ? C.getAttribute(Er) : null;
                if (null !== h) C.removeAttribute(Er);
                if (u) {
                    l = C.nextSibling;
                    if (!f) {
                        B = 3 === C.nodeType && "" === C.textContent.trim();
                        if (!B) ((i = m ?? (m = {}))[s = h || Pr] ?? (i[s] = [])).push(C);
                        t.removeChild(C);
                    }
                    C = l;
                } else {
                    if (null !== h) {
                        h = h || Pr;
                        throw pt(`AUR0706:${a}[${h}]`);
                    }
                    C = C.nextSibling;
                }
            }
            if (null != m) {
                d = {};
                for (h in m) {
                    n = e.h("template");
                    g = m[h];
                    for (b = 0, A = g.length; A > b; ++b) {
                        p = g[b];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) n.content.appendChild(p); else n.content.appendChild(p.content); else n.content.appendChild(p);
                    }
                    x = e.Ie();
                    this.pe(n.content, x);
                    d[h] = CustomElementDefinition.create({
                        name: Vs(),
                        template: n,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                M.projections = d;
            }
            if (u && (H || c.containerless)) this.Te(t, e);
            z = !u || !c.containerless && !H && false !== j;
            if (z) if ("TEMPLATE" === t.nodeName) this.pe(t.content, o); else {
                C = t.firstChild;
                while (null !== C) C = this.pe(C, o);
            }
            $.def = CustomElementDefinition.create({
                name: Vs(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (k-- > 0) {
                $ = U[k];
                n = e.h("template");
                v = e.h("au-m");
                v.classList.add("au");
                n.content.appendChild(v);
                $.def = CustomElementDefinition.create({
                    name: Vs(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ U[k + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ $ ]);
        } else {
            if (null != w) e.rows.push(w);
            let i = t.firstChild;
            let s;
            let n;
            let l = null;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v = false;
            let x = 0, b = 0;
            if (false !== j) while (null !== i) {
                n = 1 === i.nodeType ? i.getAttribute(Er) : null;
                if (null !== n) i.removeAttribute(Er);
                if (u) {
                    s = i.nextSibling;
                    if (!f) {
                        v = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!v) ((r = h ?? (h = {}))[o = n || Pr] ?? (r[o] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || Pr;
                        throw pt(`AUR0706:${a}[${n}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != h) {
                l = {};
                for (n in h) {
                    g = e.h("template");
                    d = h[n];
                    for (x = 0, b = d.length; b > x; ++x) {
                        m = d[x];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.Ie();
                    this.pe(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: Vs(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                M.projections = l;
            }
            if (u && (H || c.containerless)) this.Te(t, e);
            z = !u || !c.containerless && !H && false !== j;
            if (z && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.pe(i, e);
            }
        }
        return h;
    }
    Ce(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.Be(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    ye(t, e, i, s) {
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
        for (let g = 0; g < r; ++g) {
            c = e.charCodeAt(g);
            if (92 === c) ++g; else if (58 === c) {
                l = e.slice(a, g);
                while (e.charCodeAt(++g) <= 32) ;
                a = g;
                for (;g < r; ++g) {
                    c = e.charCodeAt(g);
                    if (92 === c) ++g; else if (59 === c) {
                        h = e.slice(a, g);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(a);
                f = s.le.parse(l, h);
                d = s.we(f);
                m = n.attrs[f.target];
                if (null == m) throw pt(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    vr.node = t;
                    vr.attr = f;
                    vr.bindable = m;
                    vr.def = i;
                    o.push(d.build(vr, s.ep, s.m));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                a = g;
                l = void 0;
                h = void 0;
            }
        }
        mr();
        return o;
    }
    ge(t, e) {
        const i = t;
        const s = y(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw pt(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw pt(`AUR0709`);
            const s = Ar(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const a = qt.for(n);
            const c = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw pt(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw pt(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || c.has(e)) throw pt(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    c.add(e);
                }
                a.add({
                    property: e,
                    attribute: i ?? void 0,
                    mode: Cr(t)
                });
                const s = t.getAttributeNames().filter((t => !yr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Pe(js({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const a = o.length;
        for (;a > h; ++h) Gs(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    Re(t) {
        return "INPUT" === t.nodeName && 1 === wr[t.type];
    }
    Se(t, e) {
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
    Be(t) {
        t.classList.add("au");
        return t;
    }
    Te(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.Be(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.Ee = gt();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.me = o ? s.me : e.get(ur);
        this.le = o ? s.le : e.get(ee);
        this.ep = o ? s.ep : e.get(M);
        this.m = o ? s.m : e.get(hr);
        this.Le = o ? s.Le : e.get(k);
        this.p = o ? s.p : e.get(ui);
        this.localEls = o ? s.localEls : new Set;
        this.rows = r ?? [];
    }
    Pe(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    xe(t) {
        return this.c.find(Qs, t);
    }
    be(t) {
        return this.c.find(ti, t);
    }
    Ie(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    we(t) {
        if (this.root !== this) return this.root.we(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.Ee[e];
        if (void 0 === i) {
            i = this.c.create(zn, e);
            if (null === i) throw pt(`AUR0713:${e}`);
            this.Ee[e] = i;
        }
        return i;
    }
}

function dr(t) {
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

function mr() {
    vr.node = vr.attr = vr.bindable = vr.def = null;
}

const gr = {
    projections: null
};

const pr = {
    name: "unnamed"
};

const vr = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const xr = wt(gt(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const wr = {
    checkbox: 1,
    radio: 1
};

const br = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = br.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = gt();
            const r = e ? void 0 === t.defaultBindingMode ? 8 : t.defaultBindingMode : 8;
            let o;
            let l;
            let h = false;
            let a;
            let c;
            for (l in s) {
                o = s[l];
                c = o.attribute;
                if (true === o.primary) {
                    if (h) throw pt(`AUR0714:${t.name}`);
                    h = true;
                    a = o;
                } else if (!h && null == a) a = o;
                n[c] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) a = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            br.set(t, i = new BindablesInfo(n, s, a));
        }
        return i;
    }
}

const yr = xt([ "property", "attribute", "mode" ]);

const kr = "as-custom-element";

function Ar(t, e) {
    const i = t.getAttribute(kr);
    if (null === i || "" === i) throw pt(`AUR0715`);
    if (e.has(i)) throw pt(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(kr);
    }
    return i;
}

function Cr(t) {
    switch (t.getAttribute("mode")) {
      case "oneTime":
        return 1;

      case "toView":
        return 2;

      case "fromView":
        return 4;

      case "twoWay":
        return 6;

      case "default":
      default:
        return 8;
    }
}

const Br = jt("ITemplateCompilerHooks");

const Rr = new WeakMap;

const Sr = at("compiler-hooks");

const Ir = xt({
    name: Sr,
    define(t) {
        let e = Rr.get(t);
        if (void 0 === e) {
            Rr.set(t, e = new TemplateCompilerHooksDefinition(t));
            rt(Sr, e, t);
            ct(t, Sr);
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
        t.register(Ht(Br, this.Type));
    }
}

const Tr = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Ir.define(t);
    }
};

const Pr = "default";

const Er = "au-slot";

const Lr = new Map;

class BindingModeBehavior {
    bind(t, e) {
        Lr.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = Lr.get(e);
        Lr.delete(e);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    get mode() {
        return 1;
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    get mode() {
        return 2;
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    get mode() {
        return 4;
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    get mode() {
        return 6;
    }
}

ve("oneTime")(OneTimeBindingBehavior);

ve("toView")(ToViewBindingBehavior);

ve("fromView")(FromViewBindingBehavior);

ve("twoWay")(TwoWayBindingBehavior);

const Dr = new WeakMap;

const Ur = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "debounce",
            delay: i > 0 ? i : Ur,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(s);
        if (null == n) ; else Dr.set(e, n);
    }
    unbind(t, e) {
        Dr.get(e)?.dispose();
        Dr.delete(e);
    }
}

DebounceBindingBehavior.inject = [ c ];

ve("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.De = new Map;
        this.Ue = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw pt(`AUR0817`);
        if (0 === i.length) throw pt(`AUR0818`);
        this.De.set(e, i);
        let s;
        for (s of i) this.Ue.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.De.get(e);
        this.De.delete(e);
        let s;
        for (s of i) this.Ue.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ P ];

ve("signal")(SignalBindingBehavior);

const $r = new WeakMap;

const qr = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.$e = t.performanceNow;
        this.ht = t.taskQueue;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "throttle",
            delay: i > 0 ? i : qr,
            now: this.$e,
            queue: this.ht
        };
        const n = e.limit?.(s);
        if (null == n) ; else $r.set(e, n);
    }
    unbind(t, e) {
        $r.get(e)?.dispose();
        $r.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ c ];

ve("throttle")(ThrottleBindingBehavior);

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

pi(DataAttributeAccessor);

const Mr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        if (!(e instanceof PropertyBinding)) throw pt(`AURxxxx`);
        e.useTargetObserver(Mr);
    }
}

ve("attr")(AttrBindingBehavior);

class SelfBindingBehavior {
    bind(t, e) {
        if (!(e instanceof ListenerBinding)) throw pt(`AUR0801`);
        e.self = true;
    }
    unbind(t, e) {
        e.self = false;
    }
}

ve("self")(SelfBindingBehavior);

const _r = gt();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return _r[t] ?? (_r[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

pi(AttributeNSAccessor);

function Fr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.qe = void 0;
        this.Me = void 0;
        this.yt = false;
        this.bt = t;
        this.oL = s;
        this.wt = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        const e = this.v;
        if (t === e) return;
        this.v = t;
        this.ov = e;
        this._e();
        this.Fe();
        this.it();
    }
    handleCollectionChange() {
        this.Fe();
    }
    handleChange(t, e) {
        this.Fe();
    }
    Fe() {
        const t = this.v;
        const e = this.bt;
        const i = vt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Fr;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (Bt(t)) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const e = this.bt;
        const i = vt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Fr;
        if ("checkbox" === e.type) {
            if (Bt(t)) {
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
        this.it();
    }
    kt() {
        this._e();
    }
    At() {
        this.qe?.unsubscribe(this);
        this.Me?.unsubscribe(this);
        this.qe = this.Me = void 0;
    }
    it() {
        Or = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Or);
    }
    _e() {
        const t = this.bt;
        (this.Me ?? (this.Me = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.qe?.unsubscribe(this);
        this.qe = void 0;
        if ("checkbox" === t.type) (this.qe = Zr(this.v, this.oL))?.subscribe(this);
    }
}

mi(CheckedObserver);

I(CheckedObserver);

let Or;

const Vr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Nr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Z = false;
        this.Oe = void 0;
        this.Ve = void 0;
        this.iO = false;
        this.yt = false;
        this.bt = t;
        this.oL = s;
        this.wt = i;
    }
    getValue() {
        return this.iO ? this.v : this.bt.multiple ? jr(this.bt.options) : this.bt.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.Z = t !== this.ov;
        this.Ne(t instanceof Array ? t : null);
        this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        this.syncOptions();
    }
    syncOptions() {
        const t = this.v;
        const e = this.bt;
        const i = Bt(t);
        const s = e.matcher ?? Nr;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = vt.call(e, "model") ? e.model : e.value;
            if (i) {
                e.selected = -1 !== t.findIndex((t => !!s(o, t)));
                continue;
            }
            e.selected = !!s(o, t);
        }
    }
    syncValue() {
        const t = this.bt;
        const e = t.options;
        const i = e.length;
        const s = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(s instanceof Array)) return true;
            let r;
            const o = t.matcher || Nr;
            const l = [];
            while (n < i) {
                r = e[n];
                if (r.selected) l.push(vt.call(r, "model") ? r.model : r.value);
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
                r = vt.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    kt() {
        (this.Ve = new this.bt.ownerDocument.defaultView.MutationObserver(this.je.bind(this))).observe(this.bt, Vr);
        this.Ne(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    At() {
        this.Ve.disconnect();
        this.Oe?.unsubscribe(this);
        this.Ve = this.Oe = void 0;
        this.iO = false;
    }
    Ne(t) {
        this.Oe?.unsubscribe(this);
        this.Oe = void 0;
        if (null != t) {
            if (!this.bt.multiple) throw pt(`AUR0654`);
            (this.Oe = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.it();
    }
    je(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.it();
    }
    it() {
        Hr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Hr);
    }
}

mi(SelectValueObserver);

I(SelectValueObserver);

function jr(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = vt.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let Hr;

const Wr = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.v = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.Z = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t) {
        this.v = t;
        this.Z = t !== this.ov;
        this.et();
    }
    He(t) {
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
    We(t) {
        let e;
        let i;
        const n = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (St(e)) {
                if (i.startsWith(Wr)) {
                    n.push([ i, e ]);
                    continue;
                }
                n.push([ s(i), e ]);
                continue;
            }
            n.push(...this.ze(e));
        }
        return n;
    }
    Ge(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this.ze(t[s]));
            return i;
        }
        return l;
    }
    ze(t) {
        if (St(t)) return this.He(t);
        if (t instanceof Array) return this.Ge(t);
        if (t instanceof Object) return this.We(t);
        return l;
    }
    et() {
        if (this.Z) {
            this.Z = false;
            const t = this.v;
            const e = this.styles;
            const i = this.ze(t);
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
                if (!vt.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && Rt(e.indexOf) && e.includes("!important")) {
            i = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, i);
    }
    bind() {
        this.v = this.ov = this.obj.style.cssText;
    }
}

pi(StyleAttributeAccessor);

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.Z = false;
        this.yt = false;
        this.bt = t;
        this.k = e;
        this.wt = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (Pt(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.Z = true;
        if (!this.wt.readonly) this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.bt[this.k] = this.v ?? this.wt.default;
            this.it();
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.bt[this.k];
        if (this.ov !== this.v) {
            this.Z = false;
            this.it();
        }
    }
    kt() {
        this.v = this.ov = this.bt[this.k];
    }
    it() {
        zr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, zr);
    }
}

mi(ValueAttributeObserver);

I(ValueAttributeObserver);

let zr;

const Gr = "http://www.w3.org/1999/xlink";

const Xr = "http://www.w3.org/XML/1998/namespace";

const Kr = "http://www.w3.org/2000/xmlns/";

const Qr = wt(gt(), {
    "xlink:actuate": [ "actuate", Gr ],
    "xlink:arcrole": [ "arcrole", Gr ],
    "xlink:href": [ "href", Gr ],
    "xlink:role": [ "role", Gr ],
    "xlink:show": [ "show", Gr ],
    "xlink:title": [ "title", Gr ],
    "xlink:type": [ "type", Gr ],
    "xml:lang": [ "lang", Xr ],
    "xml:space": [ "space", Xr ],
    xmlns: [ "xmlns", Kr ],
    "xmlns:xlink": [ "xlink", Kr ]
});

const Yr = new j;

Yr.type = 2 | 4;

class NodeObserverLocator {
    constructor(t, e, i, s) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = i;
        this.svgAnalyzer = s;
        this.allowDirtyCheck = true;
        this.Xe = gt();
        this.Ke = gt();
        this.Qe = gt();
        this.Ye = gt();
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
        Wt(H, NodeObserverLocator).register(t);
        Ht(H, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Xe;
        let n;
        if (St(t)) {
            n = s[t] ?? (s[t] = gt());
            if (null == n[e]) n[e] = i; else Jr(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = gt());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = r[e]; else Jr(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = t[e]; else Jr("*", e); else if (null == i[t]) i[t] = e; else Jr("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.Ye || e in (this.Qe[t.tagName] ?? A)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
          case "minLength":
          case "maxLength":
          case "placeholder":
          case "size":
          case "pattern":
          case "title":
            return Mr;

          default:
            {
                const i = Qr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (At(t, e, this.svgAnalyzer)) return Mr;
                return Yr;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (St(t)) {
            n = (i = this.Qe)[t] ?? (i[t] = gt());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Qe)[e] ?? (s[e] = gt());
            n[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.Ye[e] = true;
    }
    getNodeObserverConfig(t, e) {
        return this.Xe[t.tagName]?.[e] ?? this.Ke[e];
    }
    getNodeObserver(t, e, i) {
        const s = this.Xe[t.tagName]?.[e] ?? this.Ke[e];
        let n;
        if (null != s) {
            n = new (s.type ?? ValueAttributeObserver)(t, e, s, i, this.locator);
            if (!n.doNotCache) W(t)[e] = n;
            return n;
        }
        return null;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const s = this.getNodeObserver(t, e, i);
        if (null != s) return s;
        const n = Qr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (At(t, e, this.svgAnalyzer)) return Mr;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw pt(`AUR0652:${String(e)}`);
        } else return new z(t, e);
    }
}

NodeObserverLocator.inject = [ C, ui, G, or ];

function Zr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Jr(t, e) {
    throw pt(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t, e) {
        if (!(e instanceof NodeObserverLocator)) throw pt("AURxxxx: updateTrigger binding behavior only works with the default implementation of Aurelia HTML observation. Implement your own node observation + updateTrigger");
        this.oL = t;
        this.Ze = e;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw pt(`AUR0802`);
        if (!(e instanceof PropertyBinding) || !(4 & e.mode)) throw pt(`AUR0803`);
        const s = this.Ze.getNodeObserverConfig(e.target, e.targetProperty);
        if (null == s) throw pt(`AURxxxx`);
        const n = this.Ze.getNodeObserver(e.target, e.targetProperty, this.oL);
        n.useConfig({
            readonly: s.readonly,
            default: s.default,
            events: i
        });
        e.useTargetObserver(n);
    }
}

UpdateTriggerBindingBehavior.inject = [ _, H ];

ve("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.Je = false;
        this.ti = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.ei(); else this.Je = true;
    }
    attached() {
        if (this.Je) {
            this.Je = false;
            this.ei();
        }
        this.ti.addEventListener("focus", this);
        this.ti.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ti;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.ii) this.value = false;
    }
    ei() {
        const t = this.ti;
        const e = this.ii;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get ii() {
        return this.ti === this.p.document.activeElement;
    }
}

Focus.inject = [ ps, ui ];

et([ Dt({
    mode: 6
}) ], Focus.prototype, "value", void 0);

We("focus")(Focus);

let to = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.si = false;
        this.ot = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.ot = null;
            if (Boolean(this.value) !== this.ni) if (this.ni === this.ri) {
                this.ni = !this.ri;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.ni = this.ri;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.ni = this.ri = "hide" !== i.alias;
    }
    binding() {
        this.si = true;
        this.update();
    }
    detaching() {
        this.si = false;
        this.ot?.cancel();
        this.ot = null;
    }
    valueChanged() {
        if (this.si && null === this.ot) this.ot = this.p.domWriteQueue.queueTask(this.update);
    }
};

et([ Dt ], to.prototype, "value", void 0);

to = et([ it(0, ps), it(1, ui), it(2, rn) ], to);

Kt("hide")(to);

We("show")(to);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.oi = i.document.createElement("div");
        this.view = t.create();
        ys(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.oi = this.li();
        this.view.setHost(s);
        return this.hi(t, s, i);
    }
    detaching(t, e, i) {
        return this.ai(t, this.oi, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.oi;
        const i = this.oi = this.li();
        if (e === i) return;
        this.view.setHost(i);
        const s = g(this.ai(null, i, t.flags), (() => this.hi(null, i, t.flags)));
        if (Ct(s)) s.catch((t => {
            throw t;
        }));
    }
    hi(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return g(s?.call(n, e, r), (() => this.ui(t, e, i)));
    }
    ui(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return g(n.activate(t ?? n, s, i, s.scope), (() => this.fi(e)));
        return this.fi(e);
    }
    fi(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    ai(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return g(s?.call(n, e, r), (() => this.di(t, e, i)));
    }
    di(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return g(n.deactivate(t, s, i), (() => this.mi(e)));
        return this.mi(e);
    }
    mi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    li() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw pt(`AUR0811`);
            return e.body;
        }
        if (St(i)) {
            let n = e;
            if (St(s)) s = e.querySelector(s);
            if (s instanceof t.Node) n = s;
            i = n.querySelector(i);
        }
        if (i instanceof t.Node) return i;
        if (null == i) {
            if (this.strict) throw pt(`AUR0812`);
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

Portal.inject = [ Ui, xs, ui ];

et([ Dt({
    primary: true
}) ], Portal.prototype, "target", void 0);

et([ Dt({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

et([ Dt() ], Portal.prototype, "strict", void 0);

et([ Dt() ], Portal.prototype, "deactivating", void 0);

et([ Dt() ], Portal.prototype, "activating", void 0);

et([ Dt() ], Portal.prototype, "deactivated", void 0);

et([ Dt() ], Portal.prototype, "activated", void 0);

et([ Dt() ], Portal.prototype, "callbackContext", void 0);

ze("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.gi = false;
        this.pi = 0;
        this.vi = t;
        this.l = e;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.pi++;
        const o = () => !this.gi && this.pi === r + 1;
        return g(this.pending, (() => {
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.vi.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == s) return;
            s.setLocation(this.l);
            this.pending = g(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.gi = true;
        return g(this.pending, (() => {
            this.gi = false;
            this.pending = void 0;
            void this.view?.deactivate(t, this.$controller, i);
        }));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        t = !!t;
        e = !!e;
        if (t === e) return;
        const s = this.view;
        const n = this.$controller;
        const r = this.pi++;
        const o = () => !this.gi && this.pi === r + 1;
        let l;
        return g(this.pending, (() => this.pending = g(s?.deactivate(s, n, i), (() => {
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.vi.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == l) return;
            l.setLocation(this.l);
            return g(l.activate(l, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }))));
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

If.inject = [ Ui, xs ];

et([ Dt ], If.prototype, "value", void 0);

et([ Dt({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

ze("if")(If);

class Else {
    constructor(t) {
        this.f = t;
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw pt(`AUR0810`);
    }
}

Else.inject = [ Ui ];

ze({
    name: "else"
})(Else);

function eo(t) {
    t.dispose();
}

const io = [ 18, 17 ];

class Repeat {
    constructor(t, e, i, s, n) {
        this.views = [];
        this.key = null;
        this.xi = new Map;
        this.wi = new Map;
        this.bi = void 0;
        this.yi = false;
        this.ki = false;
        this.Ai = null;
        this.Ci = void 0;
        this.Bi = false;
        const r = t.props[0].props[0];
        if (void 0 !== r) {
            const {to: t, value: i, command: s} = r;
            if ("key" === t) if (null === s) this.key = i; else if ("bind" === s) this.key = e.parse(i, 16); else throw pt(`AUR775:${s}`); else throw pt(`AUR776:${t}`);
        }
        this.l = i;
        this.Ri = s;
        this.f = n;
    }
    binding(t, e, i) {
        const s = this.Ri.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Si = r;
                let t = o.iterable;
                while (null != t && io.includes(t.$kind)) {
                    t = t.expression;
                    this.yi = true;
                }
                this.Ai = t;
                break;
            }
        }
        this.Ii();
        const h = o.declaration;
        if (!(this.Bi = 24 === h.$kind || 25 === h.$kind)) this.local = T(h, this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.Ti();
        return this.Pi(t);
    }
    detaching(t, e, i) {
        this.Ii();
        return this.Ei(t);
    }
    unbinding(t, e, i) {
        this.wi.clear();
        this.xi.clear();
    }
    itemsChanged() {
        if (!this.$controller.isActive) return;
        this.Ii();
        this.Ti();
        this.Li(this.items, void 0);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.yi) {
            if (this.ki) return;
            this.ki = true;
            this.items = T(this.forOf.iterable, i.scope, this.Si, null);
            this.ki = false;
            return;
        }
        this.Ti();
        this.Li(t, e);
    }
    Li(t, e) {
        const i = this.views;
        const s = i.length;
        const n = this.key;
        const r = null !== n;
        if (r || void 0 === e) {
            const t = this.local;
            const o = this.Ci;
            const l = o.length;
            const h = this.forOf;
            const a = h.declaration;
            const c = this.Si;
            const u = this.Bi;
            e = X(l);
            let f = 0;
            if (0 === s) for (;f < l; ++f) e[f] = -2; else if (0 === l) if (u) for (f = 0; f < s; ++f) {
                e.deletedIndices.push(f);
                e.deletedItems.push(T(a, i[f].scope, c, null));
            } else for (f = 0; f < s; ++f) {
                e.deletedIndices.push(f);
                e.deletedItems.push(i[f].scope.bindingContext[t]);
            } else {
                const d = Array(s);
                if (u) for (f = 0; f < s; ++f) d[f] = T(a, i[f].scope, c, null); else for (f = 0; f < s; ++f) d[f] = i[f].scope.bindingContext[t];
                let m;
                let g;
                let p;
                let v;
                let x = 0;
                const w = s - 1;
                const b = l - 1;
                const y = new Map;
                const k = new Map;
                const A = this.xi;
                const C = this.wi;
                const B = this.$controller.scope;
                f = 0;
                t: {
                    while (true) {
                        m = d[f];
                        g = o[f];
                        p = r ? vo(A, n, m, xo(C, d[f], h, B, c, t, u), c) : m;
                        v = r ? vo(A, n, g, xo(C, o[f], h, B, c, t, u), c) : g;
                        if (p !== v) {
                            A.set(m, p);
                            A.set(g, v);
                            break;
                        }
                        ++f;
                        if (f > w || f > b) break t;
                    }
                    if (w !== b) break t;
                    x = b;
                    while (true) {
                        m = d[x];
                        g = o[x];
                        p = r ? vo(A, n, m, xo(C, m, h, B, c, t, u), c) : m;
                        v = r ? vo(A, n, g, xo(C, g, h, B, c, t, u), c) : g;
                        if (p !== v) {
                            A.set(m, p);
                            A.set(g, v);
                            break;
                        }
                        --x;
                        if (f > x) break t;
                    }
                }
                const R = f;
                const S = f;
                for (f = S; f <= b; ++f) {
                    if (A.has(g = o[f])) v = A.get(g); else {
                        v = r ? vo(A, n, g, xo(C, g, h, B, c, t, u), c) : g;
                        A.set(g, v);
                    }
                    k.set(v, f);
                }
                for (f = R; f <= w; ++f) {
                    if (A.has(m = d[f])) p = A.get(m); else p = r ? vo(A, n, m, i[f].scope, c) : m;
                    y.set(p, f);
                    if (k.has(p)) e[k.get(p)] = f; else {
                        e.deletedIndices.push(f);
                        e.deletedItems.push(m);
                    }
                }
                for (f = S; f <= b; ++f) if (!y.has(A.get(o[f]))) e[f] = -2;
                y.clear();
                k.clear();
            }
        }
        if (void 0 === e) {
            const t = g(this.Ei(null), (() => this.Pi(null)));
            if (Ct(t)) t.catch(Tt);
        } else {
            const t = K(e);
            if (t.deletedIndices.length > 0) {
                const e = g(this.Di(t), (() => this.Ui(s, t)));
                if (Ct(e)) e.catch(Tt);
            } else this.Ui(s, t);
        }
    }
    Ii() {
        const t = this.$controller.scope;
        let e = this.$i;
        let i = this.yi;
        let s;
        if (i) {
            e = this.$i = T(this.Ai, t, this.Si, null) ?? null;
            i = this.yi = !Pt(this.items, e);
        }
        const n = this.bi;
        if (this.$controller.isActive) {
            s = this.bi = Q(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.bi = void 0;
        }
    }
    Ti() {
        const {items: t} = this;
        if (Bt(t)) {
            this.Ci = t;
            return;
        }
        const e = [];
        uo(t, ((t, i) => {
            e[i] = t;
        }));
        this.Ci = e;
    }
    Pi(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: a, wi: c, Si: u, forOf: f, Bi: d} = this;
        const m = r.scope;
        const g = co(a);
        const p = this.views = Array(g);
        uo(a, ((a, v) => {
            s = p[v] = o.create().setLocation(h);
            s.nodes.unlink();
            n = xo(c, a, f, m, u, l, d);
            ho(n.overrideContext, v, g);
            i = s.activate(t ?? s, r, 0, n);
            if (Ct(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ei(t) {
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
            if (Ct(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Di(t) {
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
            if (Ct(i)) (e ?? (e = [])).push(i);
        }
        h = 0;
        let a = 0;
        for (;l > h; ++h) {
            a = o[h] - h;
            r.splice(a, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ui(t, e) {
        let i;
        let s;
        let n;
        let r;
        let o = 0;
        const {$controller: l, f: h, local: a, Ci: c, l: u, views: f, Bi: d, Si: m, wi: g, forOf: p} = this;
        const v = e.length;
        for (;v > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== v) throw lo(f.length, v);
        const x = l.scope;
        const w = e.length;
        Y(f, e);
        const b = oo(e);
        const y = b.length;
        const k = p.declaration;
        let A;
        let C = y - 1;
        o = w - 1;
        for (;o >= 0; --o) {
            n = f[o];
            A = f[o + 1];
            n.nodes.link(A?.nodes ?? u);
            if (-2 === e[o]) {
                r = xo(g, c[o], p, x, m, a, d);
                ho(r.overrideContext, o, w);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (Ct(s)) (i ?? (i = [])).push(s);
            } else if (C < 0 || 1 === y || o !== b[C]) {
                if (d) U(k, n.scope, m, c[o]); else n.scope.bindingContext[a] = c[o];
                ho(n.scope.overrideContext, o, w);
                n.nodes.insertBefore(n.location);
            } else {
                if (d) U(k, n.scope, m, c[o]); else n.scope.bindingContext[a] = c[o];
                if (t !== w) ho(n.scope.overrideContext, o, w);
                --C;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(eo);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ rn, M, xs, Zi, Ui ];

et([ Dt ], Repeat.prototype, "items", void 0);

ze("repeat")(Repeat);

let so = 16;

let no = new Int32Array(so);

let ro = new Int32Array(so);

function oo(t) {
    const e = t.length;
    if (e > so) {
        so = e;
        no = new Int32Array(e);
        ro = new Int32Array(e);
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
            o = no[i];
            n = t[o];
            if (-2 !== n && n < s) {
                ro[r] = o;
                no[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                a = l + h >> 1;
                n = t[no[a]];
                if (-2 !== n && n < s) l = a + 1; else h = a;
            }
            n = t[no[l]];
            if (s < n || -2 === n) {
                if (l > 0) ro[r] = no[l - 1];
                no[l] = r;
            }
        }
    }
    r = ++i;
    const c = new Int32Array(r);
    s = no[i - 1];
    while (i-- > 0) {
        c[i] = s;
        s = ro[s];
    }
    while (r-- > 0) no[r] = 0;
    return c;
}

const lo = (t, e) => pt(`AUR0814:${t}!=${e}`);

const ho = (t, e, i) => {
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

const ao = mt.toString;

const co = t => {
    switch (ao.call(t)) {
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
        throw pt(`Cannot count ${ao.call(t)}`);
    }
};

const uo = (t, e) => {
    switch (ao.call(t)) {
      case "[object Array]":
        return fo(t, e);

      case "[object Map]":
        return mo(t, e);

      case "[object Set]":
        return go(t, e);

      case "[object Number]":
        return po(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw pt(`Cannot iterate over ${ao.call(t)}`);
    }
};

const fo = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const mo = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const go = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const po = (t, e) => {
    let i = 0;
    for (;i < t; ++i) e(i, i, t);
};

const vo = (t, e, i, s, n) => {
    let r = t.get(i);
    if (void 0 === r) {
        if ("string" === typeof e) r = i[e]; else r = T(e, s, n, null);
        t.set(i, r);
    }
    return r;
};

const xo = (t, e, i, s, n, r, o) => {
    let l = t.get(e);
    if (void 0 === l) {
        if (o) U(i.declaration, l = F.fromParent(s, new Z), n, e); else l = F.fromParent(s, new Z(r, e));
        t.set(e, l);
    }
    return l;
};

class With {
    constructor(t, e) {
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, i) {
        const s = this.$controller;
        const n = this.view.bindings;
        let r;
        let o = 0, l = 0;
        if (s.isActive && null != n) {
            r = F.fromParent(s.scope, void 0 === t ? {} : t);
            for (l = n.length; l > o; ++o) n[o].bind(r);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const r = F.fromParent(s.scope, void 0 === n ? {} : n);
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
        if (true === this.view?.accept(t)) return true;
    }
}

With.inject = [ Ui, xs ];

et([ Dt ], With.prototype, "value", void 0);

ze("with")(With);

let wo = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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
        this.queue((() => this.qi(t)));
    }
    qi(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.Mi(null);
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
        return g(this.Mi(null, n), (() => {
            this.activeCases = n;
            return this._i(null);
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
        return g(this.activeCases.length > 0 ? this.Mi(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this._i(t);
        }));
    }
    _i(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return m(...i.map((e => e.activate(t, 0, n))));
    }
    Mi(t, e = []) {
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
        return g(m(...i.reduce(((i, s) => {
            if (!e.includes(s)) i.push(s.deactivate(t, 0));
            return i;
        }), [])), (() => {
            i.length = 0;
        }));
    }
    queue(t) {
        const e = this.promise;
        let i;
        i = this.promise = g(g(e, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

et([ Dt ], wo.prototype, "value", void 0);

wo = et([ ze("switch"), it(0, Ui), it(1, xs) ], wo);

let bo = 0;

let yo = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Fi = e;
        this.l = i;
        this.id = ++bo;
        this.fallThrough = false;
        this.view = void 0;
        this.Oi = s.config.level <= 1;
        this.Le = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof wo) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw pt(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Le.debug("isMatch()");
        const e = this.value;
        if (Bt(e)) {
            if (void 0 === this.bi) this.bi = this.Vi(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (Bt(t)) {
            this.bi?.unsubscribe(this);
            this.bi = this.Vi(t);
        } else if (void 0 !== this.bi) this.bi.unsubscribe(this);
        this.$switch.caseChanged(this);
    }
    handleCollectionChange() {
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
        this.bi?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Vi(t) {
        const e = this.Fi.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

yo.inject = [ Ui, _, xs, k ];

et([ Dt ], yo.prototype, "value", void 0);

et([ Dt({
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
    mode: 1
}) ], yo.prototype, "fallThrough", void 0);

yo = et([ ze("case") ], yo);

let ko = class DefaultCase extends yo {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw pt(`AUR0816`);
        t.defaultCase = this;
    }
};

ko = et([ ze("default-case") ], ko);

let Ao = class PromiseTemplateController {
    constructor(t, e, i, s) {
        this.f = t;
        this.l = e;
        this.p = i;
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
        return g(s.activate(t, n, i, this.viewScope = F.fromParent(n.scope, {})), (() => this.swap(t, i)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, e) {
        const i = this.value;
        if (!Ct(i)) {
            this.logger.warn(`The value '${String(i)}' is not a promise. No change will be done.`);
            return;
        }
        const s = this.p.domWriteQueue;
        const n = this.fulfilled;
        const r = this.rejected;
        const o = this.pending;
        const l = this.viewScope;
        let h;
        const a = {
            reusable: false
        };
        const c = () => {
            void m(h = (this.preSettledTask = s.queueTask((() => m(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), a)).result.catch((t => {
                if (!(t instanceof J)) throw t;
            })), i.then((c => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => m(o?.deactivate(t, e), r?.deactivate(t, e), n?.activate(t, e, l, c))), a)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            }), (c => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => m(o?.deactivate(t, e), n?.deactivate(t, e), r?.activate(t, e, l, c))), a)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            })));
        };
        if (1 === this.postSettledTask?.status) void this.postSettlePromise.then(c); else {
            this.postSettledTask?.cancel();
            c();
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

et([ Dt ], Ao.prototype, "value", void 0);

Ao = et([ ze("promise"), it(0, Ui), it(1, xs), it(2, ui), it(3, k) ], Ao);

let Co = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        So(t).pending = this;
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

et([ Dt({
    mode: 2
}) ], Co.prototype, "value", void 0);

Co = et([ ze("pending"), it(0, Ui), it(1, xs) ], Co);

let Bo = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        So(t).fulfilled = this;
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

et([ Dt({
    mode: 4
}) ], Bo.prototype, "value", void 0);

Bo = et([ ze("then"), it(0, Ui), it(1, xs) ], Bo);

let Ro = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        So(t).rejected = this;
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

et([ Dt({
    mode: 4
}) ], Ro.prototype, "value", void 0);

Ro = et([ ze("catch"), it(0, Ui), it(1, xs) ], Ro);

function So(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof Ao) return i;
    throw pt(`AUR0813`);
}

let Io = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Io = et([ ie({
    pattern: "promise.resolve",
    symbols: ""
}) ], Io);

let To = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

To = et([ ie({
    pattern: "then",
    symbols: ""
}) ], To);

let Po = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Po = et([ ie({
    pattern: "catch",
    symbols: ""
}) ], Po);

class AuCompose {
    constructor(t, e, i, s, n, r, o) {
        this.c = t;
        this.parent = e;
        this.host = i;
        this.l = s;
        this.p = n;
        this.scopeBehavior = "auto";
        this.Ni = void 0;
        this.r = t.get($i);
        this.ji = r;
        this.Hi = o;
    }
    static get inject() {
        return [ u, Zi, ps, xs, ui, rn, B(CompositionContextFactory) ];
    }
    get pending() {
        return this.Wi;
    }
    get composition() {
        return this.Ni;
    }
    attaching(t, e, i) {
        return this.Wi = g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Hi.isCurrent(t)) this.Wi = void 0;
        }));
    }
    detaching(t) {
        const e = this.Ni;
        const i = this.Wi;
        this.Hi.invalidate();
        this.Ni = this.Wi = void 0;
        return g(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Ni) {
            this.Ni.update(this.model);
            return;
        }
        this.Wi = g(this.Wi, (() => g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Hi.isCurrent(t)) this.Wi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Hi;
        const s = this.Ni;
        return g(i.create(t), (t => {
            if (i.isCurrent(t)) return g(this.compose(t), (n => {
                if (i.isCurrent(t)) return g(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Ni = n;
                        return g(s?.deactivate(e), (() => t));
                    } else return g(n.controller.deactivate(n.controller, this.$controller, 2), (() => {
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
        const {c: l, host: h, $controller: a, l: c} = this;
        const u = this.getDef(r);
        const f = l.createChild();
        const d = null == c ? h.parentNode : c.parentNode;
        if (null !== u) {
            if (u.containerless) throw pt(`AUR0806`);
            if (null == c) {
                i = h;
                s = () => {};
            } else {
                i = d.insertBefore(this.p.document.createElement(u.name), c);
                s = () => {
                    i.remove();
                };
            }
            e = this.getVm(f, r, i);
        } else {
            i = null == c ? h : c;
            e = this.getVm(f, r, i);
        }
        const m = () => {
            if (null !== u) {
                const n = Controller.$el(f, e, i, {
                    projections: this.ji.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, a, 1, a.scope.parent)), (t => g(n.deactivate(t ?? n, a, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Qs.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, a);
                const l = "auto" === this.scopeBehavior ? F.fromParent(this.parent.scope, e) : F.create(e);
                if (As(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, a, 1, l)), (t => o.deactivate(t ?? o, a, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return g(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = As(i);
        Xt(t, s.Element, Xt(t, ps, new d("ElementResolver", n ? null : i)));
        Xt(t, xs, new d("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        Xt(t, e, new d("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = Rt(t) ? t : t?.constructor;
        return Qs.isType(e) ? Qs.getDefinition(e) : null;
    }
}

et([ Dt ], AuCompose.prototype, "view", void 0);

et([ Dt ], AuCompose.prototype, "viewModel", void 0);

et([ Dt ], AuCompose.prototype, "model", void 0);

et([ Dt({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw pt(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Ss("au-compose")(AuCompose);

class EmptyComponent {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return g(t.load(), (t => new CompositionContext(++this.id, t)));
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
        if (0 !== this.state) throw pt(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw pt(`AUR0808`);

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, i, s) {
        this.zi = null;
        this.Gi = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.Xi = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.Xi = true;
        }
        this.Ki = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ xs, rn, Ji, $i ];
    }
    binding(t, e, i) {
        this.zi = this.$controller.scope.parent;
        let s;
        if (this.Xi) {
            s = this.Ki.controller.scope.parent;
            (this.Gi = F.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.zi.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Xi ? this.Gi : this.zi);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Xi && null != this.Gi) this.Gi.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

et([ Dt ], AuSlot.prototype, "expose", void 0);

Ss({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Eo = jt("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw pt('"sanitize" method not implemented');
    }
})));

let Lo = class SanitizeValueConverter {
    constructor(t) {
        this.Qi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Qi.sanitize(t);
    }
};

Lo = et([ it(0, Eo) ], Lo);

ye("sanitize")(Lo);

const Do = DebounceBindingBehavior;

const Uo = OneTimeBindingBehavior;

const $o = ToViewBindingBehavior;

const qo = FromViewBindingBehavior;

const Mo = SignalBindingBehavior;

const _o = ThrottleBindingBehavior;

const Fo = TwoWayBindingBehavior;

const Oo = TemplateCompiler;

const Vo = NodeObserverLocator;

const No = [ Oo, Vo ];

const jo = SVGAnalyzer;

const Ho = ce;

const Wo = ae;

const zo = he;

const Go = le;

const Xo = ue;

const Ko = [ zo, Go, Xo ];

const Qo = [ Ho, Wo ];

const Yo = Yn;

const Zo = Zn;

const Jo = Kn;

const tl = Gn;

const el = Xn;

const il = Qn;

const sl = nr;

const nl = Jn;

const rl = tr;

const ol = er;

const ll = sr;

const hl = ir;

const al = rr;

const cl = [ Yo, tl, Jo, el, il, Zo, sl, nl, rl, ll, hl, ol, al ];

const ul = Lo;

const fl = If;

const dl = Else;

const ml = Repeat;

const gl = With;

const pl = wo;

const vl = yo;

const xl = ko;

const wl = Ao;

const bl = Co;

const yl = Bo;

const kl = Ro;

const Al = Io;

const Cl = To;

const Bl = Po;

const Rl = AttrBindingBehavior;

const Sl = SelfBindingBehavior;

const Il = UpdateTriggerBindingBehavior;

const Tl = AuCompose;

const Pl = Portal;

const El = Focus;

const Ll = to;

const Dl = [ Do, Uo, $o, qo, Mo, _o, Fo, ul, fl, dl, ml, gl, pl, vl, xl, wl, bl, yl, kl, Al, Cl, Bl, Rl, Sl, Il, Tl, Pl, El, Ll, AuSlot ];

const Ul = gn;

const $l = mn;

const ql = wn;

const Ml = yn;

const _l = vn;

const Fl = bn;

const Ol = xn;

const Vl = dn;

const Nl = pn;

const jl = An;

const Hl = In;

const Wl = Cn;

const zl = Bn;

const Gl = Rn;

const Xl = Sn;

const Kl = kn;

const Ql = Tn;

const Yl = [ Fl, Ml, Ol, ql, Vl, $l, Ul, Nl, _l, jl, Hl, Wl, zl, Gl, Xl, Kl, Ql ];

const Zl = Jl(n);

function Jl(t) {
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
            return e.register(zt(O, i.coercingOptions), ...No, ...Dl, ...Ko, ...cl, ...Yl);
        },
        customize(e) {
            return Jl(e ?? t);
        }
    };
}

const th = jt("IAurelia");

class Aurelia {
    constructor(t = r.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Yi = false;
        this.Zi = false;
        this.Ji = void 0;
        this.next = void 0;
        this.ts = void 0;
        this.es = void 0;
        if (t.has(th, true)) throw pt(`AUR0768`);
        Xt(t, th, new d("IAurelia", this));
        Xt(t, ds, this.ss = new d("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Yi;
    }
    get isStopping() {
        return this.Zi;
    }
    get root() {
        if (null == this.Ji) {
            if (null == this.next) throw pt(`AUR0767`);
            return this.next;
        }
        return this.Ji;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.rs(t.host), this.container, this.ss);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.rs(s);
        const r = t.component;
        let o;
        if (Rt(r)) {
            Xt(i, n.HTMLElement, Xt(i, n.Element, Xt(i, ps, new d("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        Xt(i, vs, new d("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: Vs(),
            template: s,
            enhance: true
        }));
        return g(l.activate(l, e, 1), (() => l));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    rs(t) {
        let e;
        if (!this.container.has(ui, false)) {
            if (null === t.ownerDocument.defaultView) throw pt(`AUR0769`);
            e = new tt(t.ownerDocument.defaultView);
            this.container.register(zt(ui, e));
        } else e = this.container.get(ui);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw pt(`AUR0770`);
        if (Ct(this.ts)) return this.ts;
        return this.ts = g(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ss.prepare(this.Ji = t);
            this.Yi = true;
            return g(t.activate(), (() => {
                this.ir = true;
                this.Yi = false;
                this.ts = void 0;
                this.os(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (Ct(this.es)) return this.es;
        if (true === this.ir) {
            const e = this.Ji;
            this.ir = false;
            this.Zi = true;
            return this.es = g(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.Ji = void 0;
                this.ss.dispose();
                this.Zi = false;
                this.os(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Zi) throw pt(`AUR0771`);
        this.container.dispose();
    }
    os(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var eh;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(eh || (eh = {}));

var ih;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(ih || (ih = {}));

export { AdoptedStyleSheetsStyles, AppRoot, Fe as AppTask, ce as AtPrefixedTriggerAttributePattern, Ho as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, Rl as AttrBindingBehaviorRegistration, er as AttrBindingCommand, ol as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, Hl as AttributeBindingRendererRegistration, AttributeNSAccessor, oe as AttributePattern, AuCompose, AuSlot, AuSlotsInfo, Aurelia, qt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, be as BindingBehavior, BindingBehaviorDefinition, zn as BindingCommand, BindingCommandDefinition, eh as BindingMode, BindingModeBehavior, BindingTargetSubscriber, CSSModulesProcessorRegistry, tr as CaptureBindingCommand, rl as CaptureBindingCommandRegistration, yo as Case, CheckedObserver, ni as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, sr as ClassBindingCommand, ll as ClassBindingCommandRegistration, ae as ColonPrefixedBindAttributePattern, Wo as ColonPrefixedBindAttributePatternRegistration, Vn as CommandType, ComputedWatcher, ContentBinding, Controller, ti as CustomAttribute, CustomAttributeDefinition, Ul as CustomAttributeRendererRegistration, Qs as CustomElement, CustomElementDefinition, $l as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Do as DebounceBindingBehaviorRegistration, Yn as DefaultBindingCommand, Yo as DefaultBindingCommandRegistration, cl as DefaultBindingLanguage, Ko as DefaultBindingSyntax, ko as DefaultCase, No as DefaultComponents, Yl as DefaultRenderers, Dl as DefaultResources, ih as DefinitionType, le as DotSeparatedAttributePattern, Go as DotSeparatedAttributePatternRegistration, Else, dl as ElseRegistration, ExpressionWatcher, FlushQueue, Focus, Zn as ForBindingCommand, Zo as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, qo as FromViewBindingBehaviorRegistration, Kn as FromViewBindingCommand, Jo as FromViewBindingCommandRegistration, Bo as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, ds as IAppRoot, _e as IAppTask, hr as IAttrMapper, ee as IAttributeParser, te as IAttributePattern, sn as IAuSlotsInfo, th as IAurelia, Zi as IController, vs as IEventTarget, Ie as IFlushQueue, Rs as IHistory, Ji as IHydrationContext, rn as IInstruction, Ti as ILifecycleHooks, Bs as ILocation, ps as INode, Vo as INodeObserverLocatorRegistration, ui as IPlatform, en as IProjections, xs as IRenderLocation, hn as IRenderer, $i as IRendering, or as ISVGAnalyzer, Eo as ISanitizer, Ai as IShadowDOMGlobalStyles, ki as IShadowDOMStyles, Yt as ISyntaxInterpreter, ln as ITemplateCompiler, Br as ITemplateCompilerHooks, Oo as ITemplateCompilerRegistration, ur as ITemplateElementFactory, Ui as IViewFactory, Cs as IWindow, If, fl as IfRegistration, nn as InstructionType, InterpolationBinding, ql as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Ml as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, _l as LetElementRendererRegistration, qi as LifecycleFlags, Li as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, ListenerBinding, ListenerBindingInstruction, ListenerBindingOptions, jl as ListenerBindingRendererRegistration, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, Uo as OneTimeBindingBehaviorRegistration, Gn as OneTimeBindingCommand, tl as OneTimeBindingCommandRegistration, Co as PendingTemplateController, Portal, Ao as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Fl as PropertyBindingRendererRegistration, he as RefAttributePattern, zo as RefAttributePatternRegistration, RefBinding, sl as RefBindingCommandRegistration, RefBindingInstruction, Ol as RefBindingRendererRegistration, Ro as RejectedTemplateController, Rendering, Repeat, ml as RepeatRegistration, SVGAnalyzer, jo as SVGAnalyzerRegistration, Lo as SanitizeValueConverter, ul as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Sl as SelfBindingBehaviorRegistration, SetAttributeInstruction, Wl as SetAttributeRendererRegistration, SetClassAttributeInstruction, zl as SetClassAttributeRendererRegistration, SetPropertyInstruction, Vl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, Gl as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, Qo as ShortHandBindingSyntax, SignalBindingBehavior, Mo as SignalBindingBehaviorRegistration, Zl as StandardConfiguration, Qi as State, StyleAttributeAccessor, ir as StyleBindingCommand, hl as StyleBindingCommandRegistration, Ci as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, Xl as StylePropertyBindingRendererRegistration, wo as Switch, TemplateCompiler, Ir as TemplateCompilerHooks, Nl as TemplateControllerRendererRegistration, TextBindingInstruction, Kl as TextBindingRendererRegistration, ThrottleBindingBehavior, _o as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, $o as ToViewBindingBehaviorRegistration, Xn as ToViewBindingCommand, el as ToViewBindingCommandRegistration, Jn as TriggerBindingCommand, nl as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Fo as TwoWayBindingBehaviorRegistration, Qn as TwoWayBindingCommand, il as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, Il as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, Ce as ValueConverter, ValueConverterDefinition, ViewFactory, Ki as ViewModelKind, He as Watch, With, gl as WithRegistration, Kt as alias, Nt as allResources, ie as attributePattern, Dt as bindable, ve as bindingBehavior, Nn as bindingCommand, tn as capture, ei as children, Mt as coercer, Ts as containerless, ks as convertToRenderLocation, wi as cssModules, We as customAttribute, Ss as customElement, bs as getEffectiveParentNode, ms as getRef, zi as isCustomElementController, Gi as isCustomElementViewModel, on as isInstruction, As as isRenderLocation, Di as lifecycleHooks, Re as mixinAstEvaluator, Be as mixinUseScope, Ee as mixingBindingLimited, Zs as processContent, Qt as registerAliases, an as renderer, ys as setEffectiveParentNode, gs as setRef, bi as shadowCSS, Es as strict, Tr as templateCompilerHooks, ze as templateController, Is as useShadowDOM, ye as valueConverter, Ve as watch };

