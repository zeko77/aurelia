import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as a, IPlatform as c, IContainer as u, optional as f, InstanceProvider as d, resolveAll as m, onResolve as g, fromDefinitionOrDefault as p, pascalCase as v, fromAnnotationOrTypeOrDefault as x, fromAnnotationOrDefinitionOrTypeOrDefault as b, camelCase as w, toArray as y, ILogger as k, emptyObject as A, IServiceLocator as C, transient as B } from "@aurelia/kernel";

import { Metadata as R, isObject as S } from "@aurelia/metadata";

import { subscriberCollection as I, astEvaluate as T, ISignaler as P, connectable as E, astBind as L, astUnbind as O, astAssign as D, ConnectableSwitcher as U, ProxyObservable as $, IExpressionParser as q, IObserverLocator as M, Scope as _, ICoercionConfiguration as F, AccessScopeExpression as j, PrimitiveLiteralExpression as V, PropertyAccessor as N, INodeObserverLocator as H, getObserverLookup as W, SetterObserver as z, IDirtyChecker as G, createIndexMap as X, applyMutationsToIndices as K, getCollectionObserver as Q, synchronizeIndices as Y, BindingContext as Z } from "@aurelia/runtime";

import { TaskAbortError as J } from "@aurelia/platform";

import { BrowserPlatform as tt } from "@aurelia/platform-browser";

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

const dt = () => Object.create(null);

const mt = t => new Error(t);

const gt = Object.prototype.hasOwnProperty;

const pt = dt();

const vt = (t, e, i) => {
    if (true === pt[e]) return true;
    if (!yt(e)) return false;
    const s = e.slice(0, 5);
    return pt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const xt = t => t instanceof Promise;

const bt = t => t instanceof Array;

const wt = t => "function" === typeof t;

const yt = t => "string" === typeof t;

const kt = Object.defineProperty;

const At = t => {
    throw t;
};

const Ct = Object.is;

const Bt = Reflect.defineProperty;

const Rt = (t, e, i) => {
    Bt(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function St(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        rt(Tt, BindableDefinition.create(e, t, i), t.constructor, e);
        ut(t.constructor, Pt.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (yt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function It(t) {
    return t.startsWith(Tt);
}

const Tt = ht("bindable");

const Pt = Object.freeze({
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
                if (yt(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!nt(Tt, t, n)) ut(t, Pt.keyFrom(n));
                rt(Tt, e, t, n);
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
        const i = Tt.length + 1;
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
            l = ft(a).filter(It);
            h = l.length;
            for (c = 0; c < h; ++c) s[o++] = st(Tt, a, l[c].slice(i));
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
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Ot(t, e, n)));
    }
}

function Et(t, e, i) {
    Lt.define(t, e);
}

const Lt = {
    key: ht("coercer"),
    define(t, e) {
        rt(Lt.key, t[e].bind(t), t);
    },
    for(t) {
        return st(Lt.key, t);
    }
};

function Ot(t, e, i = {}) {
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
            r = "function" === typeof t ? t.bind(s) : Lt.for(s) ?? n;
            break;
        }
    }
    return r === n ? r : Dt(r, i.nullable);
}

function Dt(t, e) {
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
        const a = this.i = wt(l);
        const c = this.u = wt(h);
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
            if (Ct(t, e)) return;
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

const Ut = function(t) {
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

const $t = function(t) {
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

const qt = r.createInterface;

const Mt = o.singleton;

const _t = o.aliasTo;

const Ft = o.instance;

o.callback;

const jt = o.transient;

const Vt = (t, e, i) => t.registerResolver(e, i);

function Nt(...t) {
    return function(e) {
        const i = ht("aliases");
        const s = st(i, e);
        if (void 0 === s) rt(i, t, e); else s.push(...t);
    };
}

function Ht(t, e, i, s) {
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
        this.O = "";
        this.U = {};
        this.$ = {};
    }
    get pattern() {
        const t = this.O;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.O = "";
            this.parts = l;
        } else {
            this.O = t;
            this.parts = this.$[t];
        }
    }
    append(t, e) {
        const i = this.U;
        if (void 0 === i[t]) i[t] = e; else i[t] += e;
    }
    next(t) {
        const e = this.U;
        let i;
        if (void 0 !== e[t]) {
            i = this.$;
            if (void 0 === i[t]) i[t] = [ e[t] ]; else i[t].push(e[t]);
            e[t] = void 0;
        }
    }
}

class AttrParsingState {
    constructor(t, ...e) {
        this.charSpec = t;
        this.q = [];
        this.M = null;
        this._ = false;
        this.F = e;
    }
    get O() {
        return this._ ? this.F[0] : null;
    }
    findChild(t) {
        const e = this.q;
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
        const i = this.F;
        if (!i.includes(e)) i.push(e);
        let s = this.findChild(t);
        if (null == s) {
            s = new AttrParsingState(t, e);
            this.q.push(s);
            if (t.repeat) s.q.push(s);
        }
        return s;
    }
    findMatches(t, e) {
        const i = [];
        const s = this.q;
        const n = s.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = s[l];
            if (o.charSpec.has(t)) {
                i.push(o);
                r = o.F.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.F[h]); else for (;h < r; ++h) e.append(o.F[h], t);
            }
        }
        return i;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.j = t.length;
        const i = this.V = [];
        let s = 0;
        for (;e > s; ++s) i.push(new CharSpec(t[s], false, false, false));
    }
    eachChar(t) {
        const e = this.j;
        const i = this.V;
        let s = 0;
        for (;e > s; ++s) t(i[s]);
    }
}

class DynamicSegment {
    constructor(t) {
        this.text = "PART";
        this.N = new CharSpec(t, true, false, true);
    }
    eachChar(t) {
        t(this.N);
    }
}

class SymbolSegment {
    constructor(t) {
        this.text = t;
        this.N = new CharSpec(t, false, true, false);
    }
    eachChar(t) {
        t(this.N);
    }
}

class SegmentTypes {
    constructor() {
        this.statics = 0;
        this.dynamics = 0;
        this.symbols = 0;
    }
}

const Wt = qt("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
            i.M = r;
            i._ = true;
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
        s = s.filter(zt);
        if (s.length > 0) {
            s.sort(Gt);
            r = s[0];
            if (!r.charSpec.isSymbol) e.next(r.O);
            e.pattern = r.O;
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

function zt(t) {
    return t._;
}

function Gt(t, e) {
    const i = t.M;
    const s = e.M;
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

const Xt = qt("IAttributePattern");

const Kt = qt("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.K = {};
        this.Y = t;
        const i = this.F = {};
        const s = e.reduce(((t, e) => {
            const s = Jt(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), l);
        t.add(s);
    }
    parse(t, e) {
        let i = this.K[t];
        if (null == i) i = this.K[t] = this.Y.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.F[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ Wt, h(Xt) ];

function Qt(...t) {
    return function e(i) {
        return te.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        Mt(Xt, this.Type).register(t);
    }
}

const Yt = at("attribute-pattern");

const Zt = "attribute-pattern-definitions";

const Jt = e => t.annotation.get(e, Zt);

const te = Object.freeze({
    name: Yt,
    definitionAnnotationKey: Zt,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        rt(Yt, s, i);
        ct(i, Yt);
        t.annotation.set(i, Zt, e);
        ut(i, Zt);
        return i;
    },
    getPatternDefinitions: Jt
});

let ee = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, `${i[0]}.${i[1]}`, i[2]);
    }
};

ee = et([ Qt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], ee);

let ie = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

ie = et([ Qt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], ie);

let se = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

se = et([ Qt({
    pattern: ":PART",
    symbols: ":"
}) ], se);

let ne = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

ne = et([ Qt({
    pattern: "@PART",
    symbols: "@"
}) ], ne);

let re = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

re = et([ Qt({
    pattern: "...$attrs",
    symbols: ""
}) ], re);

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
                    if (yt(e) && e.includes("!important")) {
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
                throw mt(`AUR0651:${this.tt}`);
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
            oe(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) le(this.o, this);
    }
    it() {
        ce = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ce);
    }
}

I(AttributeObserver);

const oe = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(he)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const le = (t, e) => {
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

const he = t => {
    t[0].target.$eMObs.forEach(ae, t);
};

function ae(t) {
    t.handleMutation(this);
}

let ce;

function ue(t) {
    return function(e) {
        return me.define(t, e);
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
        if (yt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingBehaviorDefinition(e, i(de(e, "name"), s), a(de(e, "aliases"), n.aliases, e.aliases), me.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Mt(i, e).register(t);
        _t(i, e).register(t);
        Ht(s, me, i, t);
    }
}

const fe = at("binding-behavior");

const de = (t, e) => st(ht(e), t);

const me = Object.freeze({
    name: fe,
    keyFrom(t) {
        return `${fe}:${t}`;
    },
    isType(t) {
        return wt(t) && nt(fe, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        rt(fe, i, i.Type);
        rt(fe, i, i);
        ct(e, fe);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(fe, t);
        if (void 0 === e) throw mt(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: de
});

function ge(t) {
    return function(e) {
        return xe.define(t, e);
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
        if (yt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, i(ve(e, "name"), s), a(ve(e, "aliases"), n.aliases, e.aliases), xe.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Ht(s, xe, i, t);
    }
}

const pe = at("value-converter");

const ve = (t, e) => st(ht(e), t);

const xe = Object.freeze({
    name: pe,
    keyFrom: t => `${pe}:${t}`,
    isType(t) {
        return wt(t) && nt(pe, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        rt(pe, i, i.Type);
        rt(pe, i, i);
        ct(e, pe);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(pe, t);
        if (void 0 === e) throw mt(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: ve
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

const be = t => {
    Rt(t.prototype, "useScope", (function(t) {
        this.s = t;
    }));
};

const we = (t, e = true) => i => {
    const s = i.prototype;
    if (null != t) Bt(s, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    Bt(s, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    Rt(s, "get", (function(t) {
        return this.l.get(t);
    }));
    Rt(s, "getSignaler", (function() {
        return this.l.root.get(P);
    }));
    Rt(s, "getConverter", (function(t) {
        const e = xe.keyFrom(t);
        let i = ye.get(this);
        if (null == i) ye.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get(Ut(e)));
    }));
    Rt(s, "getBehavior", (function(t) {
        const e = me.keyFrom(t);
        let i = ye.get(this);
        if (null == i) ye.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get(Ut(e)));
    }));
};

const ye = new WeakMap;

class ResourceLookup {}

const ke = qt("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.rt.forEach(Ae);
        } finally {
            this.nt = false;
        }
    }
    clear() {
        this.rt.clear();
        this.nt = false;
    }
}

function Ae(t, e, i) {
    i.delete(t);
    t.flush();
}

const Ce = new WeakSet;

const Be = (t, e) => {
    Rt(t.prototype, "limit", (function(t) {
        if (Ce.has(this)) throw mt(`AURXXXX: a rate limit has already been applied.`);
        Ce.add(this);
        const i = e(this, t);
        const s = this[i];
        const n = (...t) => s.call(this, ...t);
        const r = "debounce" === t.type ? Re(t, n, this) : Se(t, n, this);
        this[i] = r;
        return {
            dispose: () => {
                Ce.delete(this);
                r.dispose();
                delete this[i];
            }
        };
    }));
};

const Re = (t, e, i) => {
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

const Se = (t, e, i) => {
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

const Ie = {
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
                }), Ie);
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
        O(this.ast, this.s, this);
        this.s = void 0;
        this.v = void 0;
        this.ot?.cancel();
        this.ot = null;
        this.obs.clearAll();
    }
}

be(AttributeBinding);

Be(AttributeBinding, (() => "updateTarget"));

E(AttributeBinding);

we(true)(AttributeBinding);

const Te = {
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
            }), Te);
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
            if (bt(t)) this.observeCollection(t);
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
        if (bt(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        O(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
    }
}

be(InterpolationPartBinding);

Be(InterpolationPartBinding, (() => "updateTarget"));

E(InterpolationPartBinding);

we(true)(InterpolationPartBinding);

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
        if (bt(t)) this.observeCollection(t);
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
        if (bt(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        O(this.ast, this.s, this);
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
        }), Te);
        e?.cancel();
    }
}

be(ContentBinding);

Be(ContentBinding, (() => "updateTarget"));

E()(ContentBinding);

we(void 0, false)(ContentBinding);

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
        O(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
    }
}

be(LetBinding);

Be(LetBinding, (() => "updateTarget"));

E(LetBinding);

we(true)(LetBinding);

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
        D(this.ast, this.s, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = T(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        const e = 1 !== this.lt.state && (4 & this.ct.type) > 0;
        if (e) {
            Pe = this.ot;
            this.ot = this.ht.queueTask((() => {
                this.updateTarget(t);
                this.ot = null;
            }), Ee);
            Pe?.cancel();
            Pe = null;
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
            s.subscribe(this.gt ?? (this.gt = new BindingTargetSubscriber(this, this.l.get(ke))));
            if (!n) this.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        O(this.ast, this.s, this);
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
        if (null != this.gt) throw mt(`AURxxxx: binding already has a target subscriber`);
        this.gt = t;
    }
}

be(PropertyBinding);

Be(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

E(PropertyBinding);

we(true, false)(PropertyBinding);

let Pe = null;

const Ee = {
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
        D(this.ast, this.s, this, this.target);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (T(this.ast, this.s, this, null) === this.target) D(this.ast, this.s, this, null);
        O(this.ast, this.s, this);
        this.s = void 0;
    }
}

we(false)(RefBinding);

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
        if (wt(i)) i = i(t);
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
        O(this.ast, this.s, this);
        this.s = void 0;
        this.target.removeEventListener(this.targetEvent, this, this.vt);
    }
}

be(ListenerBinding);

Be(ListenerBinding, (() => "callSource"));

we(true, true)(ListenerBinding);

const Le = qt("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(Ft(Le, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Oe = Object.freeze({
    creating: De("creating"),
    hydrating: De("hydrating"),
    hydrated: De("hydrated"),
    activating: De("activating"),
    activated: De("activated"),
    deactivating: De("deactivating"),
    deactivated: De("deactivated")
});

function De(t) {
    function e(e, i) {
        if (wt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ue(t, e) {
    if (null == t) throw mt(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!wt(e) && (null == e || !(e in l.prototype))) throw mt(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!wt(r?.value)) throw mt(`AUR0774:${String(n)}`);
        Me.add(l, h);
        if (He(l)) Ge(l).watches.push(h);
        if (Ms(l)) js(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const $e = l;

const qe = ht("watch");

const Me = Object.freeze({
    name: qe,
    add(t, e) {
        let i = st(qe, t);
        if (null == i) rt(qe, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return st(qe, t) ?? $e;
    }
});

function _e(t) {
    return function(e) {
        return ze(t, e);
    };
}

function Fe(t) {
    return function(e) {
        return ze(yt(t) ? {
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
        if (yt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(e, i(Ne(e, "name"), s), a(Ne(e, "aliases"), n.aliases, e.aliases), Ve(s), i(Ne(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(Ne(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Pt.from(e, ...Pt.getAll(e), Ne(e, "bindables"), e.bindables, n.bindables), i(Ne(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), a(Me.getAnnotation(e), e.watches), a(Ne(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        jt(i, e).register(t);
        _t(i, e).register(t);
        Ht(s, Xe, i, t);
    }
}

const je = at("custom-attribute");

const Ve = t => `${je}:${t}`;

const Ne = (t, e) => st(ht(e), t);

const He = t => wt(t) && nt(je, t);

const We = (t, e) => hs(t, Ve(e)) ?? void 0;

const ze = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    rt(je, i, i.Type);
    rt(je, i, i);
    ct(e, je);
    return i.Type;
};

const Ge = t => {
    const e = st(je, t);
    if (void 0 === e) throw mt(`AUR0759:${t.name}`);
    return e;
};

const Xe = Object.freeze({
    name: je,
    keyFrom: Ve,
    isType: He,
    for: We,
    define: ze,
    getDefinition: Ge,
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: Ne
});

function Ke(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        rt(Ye, ChildrenDefinition.create(e, i), t.constructor, e);
        ut(t.constructor, Ze.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (yt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Qe(t) {
    return t.startsWith(Ye);
}

const Ye = ht("children-observer");

const Ze = Object.freeze({
    name: Ye,
    keyFrom: t => `${Ye}:${t}`,
    from(...t) {
        const e = {};
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function s(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function n(t) {
            if (bt(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => s(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(t) {
        const i = Ye.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let a;
        while (--r >= 0) {
            a = n[r];
            l = ft(a).filter(Qe);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = st(Ye, a, l[t].slice(i));
        }
        return s;
    }
});

const Je = {
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? Je, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = ti, r = ei, o = ii, l) {
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
        return ni(this.controller, this.query, this.filter, this.map);
    }
}

I()(ChildrenObserver);

function ti(t) {
    return t.host.childNodes;
}

function ei(t, e, i) {
    return !!i;
}

function ii(t, e, i) {
    return i;
}

const si = {
    optional: true
};

function ni(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let a;
    let c = 0;
    for (;c < r; ++c) {
        l = n[c];
        h = _s(l, si);
        a = h?.viewModel ?? null;
        if (i(l, h, a)) o.push(s(l, h, a));
    }
    return o;
}

const ri = c;

const oi = (t, e, i, s) => {
    t.addEventListener(e, i, s);
};

const li = (t, e, i, s) => {
    t.removeEventListener(e, i, s);
};

const hi = t => {
    const e = t.prototype;
    Rt(e, "subscribe", (function(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            for (ai of this.bt.events) oi(this.wt, ai, this);
            this.yt = true;
            this.kt?.();
        }
    }));
    Rt(e, "unsubscribe", (function(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            for (ai of this.bt.events) li(this.wt, ai, this);
            this.yt = false;
            this.At?.();
        }
    }));
    Rt(e, "useConfig", (function(t) {
        this.bt = t;
        if (this.yt) {
            for (ai of this.bt.events) li(this.wt, ai, this);
            for (ai of this.bt.events) oi(this.wt, ai, this);
        }
    }));
};

let ai;

const ci = t => {
    Rt(t.prototype, "subscribe", n);
    Rt(t.prototype, "unsubscribe", n);
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
            const i = ui(t);
            let s = this.Bt;
            this.ov = t;
            if (i.length > 0) this.Rt(i);
            this.Bt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!gt.call(e, t) || e[t] !== s) continue;
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

function ui(t) {
    if (yt(t)) return fi(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...ui(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...fi(i)); else e.push(i);
    return e;
}

function fi(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

ci(ClassAttributeAccessor);

function di(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = ze({
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
                this.element.className = ui(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ cs ], e));
        t.register(s);
    }
}

function mi(...t) {
    return new ShadowDOMRegistry(t);
}

const gi = qt("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(ri))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(vi);
        const i = t.get(gi);
        t.register(Ft(pi, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ ri ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ ri ];

const pi = qt("IShadowDOMStyles");

const vi = qt("IShadowDOMGlobalStyles", (t => t.instance({
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

const xi = {
    shadowDOM(t) {
        return Oe.creating(u, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(gi);
                e.register(Ft(vi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: bi, exit: wi} = U;

const {wrap: yi, unwrap: ki} = $;

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
        if (!Ct(i, e)) this.cb.call(t, i, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            bi(this);
            return this.v = ki(this.$get.call(void 0, this.useProxy ? yi(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            wi(this);
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
        if (!Ct(t, s)) {
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

we(true)(ExpressionWatcher);

const Ai = qt("ILifecycleHooks");

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
        Mt(Ai, this.Type).register(t);
    }
}

const Ci = new WeakMap;

const Bi = ht("lifecycle-hooks");

const Ri = Object.freeze({
    name: Bi,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        rt(Bi, i, e);
        ct(e, Bi);
        return i.Type;
    },
    resolve(t) {
        let e = Ci.get(t);
        if (void 0 === e) {
            Ci.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Ai) : t.has(Ai, false) ? i.getAll(Ai).concat(t.getAll(Ai)) : i.getAll(Ai);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = st(Bi, n.constructor);
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

const Ii = qt("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (yt(t)) t = parseInt(t, 10);
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

const Ti = qt("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.Tt = new WeakMap;
        this.Pt = new WeakMap;
        const e = t.root;
        this.p = (this.Et = e).get(ri);
        this.ep = e.get(q);
        this.oL = e.get(M);
        this.Lt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return this.Ot ?? (this.Ot = this.Et.getAll(en, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), dt()));
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.Tt;
            const n = e.get(tn);
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
                if (yt(r)) o.innerHTML = r;
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
        if (e.length !== n.length) throw mt(`AUR0757:${o}<>${n.length}`);
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

var Pi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(Pi || (Pi = {}));

var Ei;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Ei || (Ei = {}));

const Li = {
    optional: true
};

const Oi = new WeakMap;

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
        this.Dt = null;
        this.state = 0;
        this.Ut = false;
        this.$t = l;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.qt = 0;
        this.Mt = 0;
        this._t = 0;
        this.Ft = n;
        this.jt = 2 === e ? HooksDefinition.none : new HooksDefinition(n);
        this.location = o;
        this.r = t.root.get(Ti);
    }
    get lifecycleHooks() {
        return this.Dt;
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
        return this.jt;
    }
    get viewModel() {
        return this.Ft;
    }
    set viewModel(t) {
        this.Ft = t;
        this.jt = null == t || 2 === this.vmKind ? HooksDefinition.none : new HooksDefinition(t);
    }
    static getCached(t) {
        return Oi.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw mt(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (Oi.has(e)) return Oi.get(e);
        n = n ?? js(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(f(Gi));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        Vt(t, Gi, new d("IHydrationContext", new HydrationContext(o, s, l)));
        Oi.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (Oi.has(e)) return Oi.get(e);
        s = s ?? Ge(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        Oi.set(e, n);
        n.Vt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = e ?? null;
        i.Nt();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.Ft;
        let r = this.definition;
        this.scope = _.create(n, null, true);
        if (r.watches.length > 0) _i(this, i, r, n);
        Ui(this, r, s, n);
        this.$t = $i(this, r, n);
        if (this.jt.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.Dt = Ri.resolve(i);
        r.register(i);
        if (null !== r.injectable) Vt(i, r.injectable, new d("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.Dt.hydrating) this.Dt.hydrating.forEach(Qi, this);
        if (this.jt.hasHydrating) this.Ft.hydrating(this);
        const e = this.Ht = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = _s(this.host, Li))) {
            this.host = this.container.root.get(ri).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = ps(this.host);
        }
        as(this.host, Os, this);
        as(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw mt(`AUR0501`);
            as(this.shadowRoot = this.host.attachShadow(i ?? Vi), Os, this);
            as(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            as(o, Os, this);
            as(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.Ft.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.Dt.hydrated) this.Dt.hydrated.forEach(Yi, this);
        if (this.jt.hasHydrated) this.Ft.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ht, this.host);
        if (void 0 !== this.Dt.created) this.Dt.created.forEach(Ki, this);
        if (this.jt.hasCreated) this.Ft.created(this);
    }
    Vt() {
        const t = this.definition;
        const e = this.Ft;
        if (t.watches.length > 0) _i(this, this.container, t, e);
        Ui(this, t, this.flags, e);
        e.$controller = this;
        this.Dt = Ri.resolve(this.container);
        if (void 0 !== this.Dt.created) this.Dt.created.forEach(Ki, this);
        if (this.jt.hasCreated) this.Ft.created(this);
    }
    Nt() {
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
            throw mt(`AUR0502:${this.name}`);

          default:
            throw mt(`AUR0503:${this.name} ${Wi(this.state)}`);
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
            if (void 0 === s || null === s) throw mt(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = t;
        this.$flags = i;
        this.Wt();
        let n;
        if (2 !== this.vmKind && null != this.Dt.binding) n = m(...this.Dt.binding.map(Zi, this));
        if (this.jt.hasBinding) n = m(n, this.Ft.binding(this.$initiator, this.parent, this.$flags));
        if (xt(n)) {
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
        let e = this.$t.length;
        let i;
        if (e > 0) while (e > t) {
            this.$t[t].start();
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
        if (2 !== this.vmKind && null != this.Dt.bound) i = m(...this.Dt.bound.map(Ji, this));
        if (this.jt.hasBound) i = m(i, this.Ft.bound(this.$initiator, this.parent, this.$flags));
        if (xt(i)) {
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
                const e = t.has(pi, false) ? t.get(pi) : t.get(vi);
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
        if (2 !== this.vmKind && null != this.Dt.attaching) e = m(...this.Dt.attaching.map(ts, this));
        if (this.jt.hasAttaching) e = m(e, this.Ft.attaching(this.$initiator, this.parent, this.$flags));
        if (xt(e)) {
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
            throw mt(`AUR0505:${this.name} ${Wi(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Yt();
        let s = 0;
        let n;
        if (this.$t.length) for (;s < this.$t.length; ++s) this.$t[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.Dt.detaching) n = m(...this.Dt.detaching.map(is, this));
        if (this.jt.hasDetaching) n = m(n, this.Ft.detaching(this.$initiator, this.parent, this.$flags));
        if (xt(n)) {
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
            ns = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            ns();
            ns = void 0;
        }
    }
    Gt(t) {
        if (void 0 !== this.$promise) {
            rs = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            rs(t);
            rs = void 0;
        }
        if (this.$initiator !== this) this.parent.Gt(t);
    }
    Wt() {
        ++this.qt;
        if (this.$initiator !== this) this.parent.Wt();
    }
    Qt() {
        if (0 === --this.qt) {
            if (2 !== this.vmKind && null != this.Dt.attached) os = m(...this.Dt.attached.map(es, this));
            if (this.jt.hasAttached) os = m(os, this.Ft.attached(this.$initiator, this.$flags));
            if (xt(os)) {
                this.zt();
                os.then((() => {
                    this.state = 2;
                    this.Jt();
                    if (this.$initiator !== this) this.parent.Qt();
                })).catch((t => {
                    this.Gt(t);
                }));
                os = void 0;
                return;
            }
            os = void 0;
            this.state = 2;
            this.Jt();
        }
        if (this.$initiator !== this) this.parent.Qt();
    }
    Yt() {
        ++this.Mt;
    }
    Zt() {
        if (0 === --this.Mt) {
            this.te();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.Dt.unbinding) e = m(...t.Dt.unbinding.map(ss, this));
                if (t.jt.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = m(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (xt(e)) {
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
        ++this._t;
    }
    ee() {
        if (0 === --this._t) {
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
            return Ge(this.Ft.constructor).name === t;

          case 0:
            return js(this.Ft.constructor).name === t;

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
            as(t, Os, this);
            as(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            as(t, Os, this);
            as(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            as(t, Os, this);
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
        if (this.jt.hasDispose) this.Ft.dispose();
        if (null !== this.children) {
            this.children.forEach(Xi);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.Ft) {
            Oi.delete(this.Ft);
            this.Ft = null;
        }
        this.Ft = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.jt.hasAccept && true === this.Ft.accept(t)) return true;
        if (null !== this.children) {
            const {children: e} = this;
            for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
        }
    }
}

function Di(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Ui(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = Di(s);
        const a = t.container;
        const c = a.has(F, true) ? a.get(F) : null;
        for (;l < o; ++l) {
            e = r[l];
            if (void 0 === h[e]) {
                i = n[e];
                h[e] = new BindableObserver(s, e, i.callback, i.set, t, c);
            }
        }
    }
}

function $i(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = Di(i);
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

const qi = new Map;

const Mi = t => {
    let e = qi.get(t);
    if (null == e) {
        e = new j(t, 0);
        qi.set(t, e);
    }
    return e;
};

function _i(t, e, i, s) {
    const n = e.get(M);
    const r = e.get(q);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : _.create(s, null, true);
    const h = o.length;
    let a;
    let c;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: a, callback: c} = o[f]);
        c = wt(c) ? c : Reflect.get(s, c);
        if (!wt(c)) throw mt(`AUR0506:${String(c)}`);
        if (wt(a)) t.addBinding(new ComputedWatcher(s, n, a, c, true)); else {
            u = yt(a) ? r.parse(a, 16) : Mi(a);
            t.addBinding(new ExpressionWatcher(l, e, n, u, c));
        }
    }
}

function Fi(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function ji(t) {
    return S(t) && Ms(t.constructor);
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

const Vi = {
    mode: "open"
};

var Ni;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(Ni || (Ni = {}));

var Hi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Hi || (Hi = {}));

function Wi(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const zi = qt("IController");

const Gi = qt("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function Xi(t) {
    t.dispose();
}

function Ki(t) {
    t.instance.created(this.Ft, this);
}

function Qi(t) {
    t.instance.hydrating(this.Ft, this);
}

function Yi(t) {
    t.instance.hydrated(this.Ft, this);
}

function Zi(t) {
    return t.instance.binding(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function Ji(t) {
    return t.instance.bound(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function ts(t) {
    return t.instance.attaching(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function es(t) {
    return t.instance.attached(this.Ft, this["$initiator"], this["$flags"]);
}

function is(t) {
    return t.instance.detaching(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function ss(t) {
    return t.instance.unbinding(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

let ns;

let rs;

let os;

const ls = qt("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.ie = void 0;
        this.host = t.host;
        s.prepare(this);
        Vt(i, e.HTMLElement, Vt(i, e.Element, Vt(i, cs, new d("ElementResolver", t.host))));
        this.ie = g(this.se("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (Ms(e)) n = this.container.get(e); else n = t.component;
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
        return m(...this.container.getAll(Le).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function hs(t, e) {
    return t.$au?.[e] ?? null;
}

function as(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const cs = qt("INode");

const us = qt("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(ls, true)) return t.get(ls).host;
    return t.get(ri).document;
}))));

const fs = qt("IRenderLocation");

const ds = new WeakMap;

function ms(t) {
    if (ds.has(t)) return ds.get(t);
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
        const e = _s(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return ms(e.host);
    }
    return t.parentNode;
}

function gs(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ds.set(i[t], e);
    } else ds.set(t, e);
}

function ps(t) {
    if (vs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function vs(t) {
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
        if (vs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const xs = qt("IWindow", (t => t.callback((t => t.get(ri).window))));

const bs = qt("ILocation", (t => t.callback((t => t.get(xs).location))));

const ws = qt("IHistory", (t => t.callback((t => t.get(xs).history))));

function ys(t) {
    return function(e) {
        return qs(t, e);
    };
}

function ks(t) {
    if (void 0 === t) return function(t) {
        $s(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!wt(t)) return function(e) {
        $s(e, "shadowOptions", t);
    };
    $s(t, "shadowOptions", {
        mode: "open"
    });
}

function As(t) {
    if (void 0 === t) return function(t) {
        Cs(t);
    };
    Cs(t);
}

function Cs(t) {
    const e = st(Os, t);
    if (void 0 === e) {
        $s(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function Bs(t) {
    if (void 0 === t) return function(t) {
        $s(t, "isStrictBinding", true);
    };
    $s(t, "isStrictBinding", true);
}

const Rs = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, a, c, u, f, d, m, g, p, v, x, b, w) {
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
        this.watches = b;
        this.processContent = w;
    }
    get type() {
        return 1;
    }
    static create(t, e = null) {
        if (null === e) {
            const i = t;
            if (yt(i)) throw mt(`AUR0761:${t}`);
            const s = p("name", i, Us);
            if (wt(i.Type)) e = i.Type; else e = Ns(v(s));
            return new CustomElementDefinition(e, s, a(i.aliases), p("key", i, (() => Ds(s))), p("cache", i, Is), p("capture", i, Ps), p("template", i, Ts), a(i.instructions), a(i.dependencies), p("injectable", i, Ts), p("needsCompile", i, Es), a(i.surrogates), Pt.from(e, i.bindables), Ze.from(i.childrenObservers), p("containerless", i, Ps), p("isStrictBinding", i, Ps), p("shadowOptions", i, Ts), p("hasSlots", i, Ps), p("enhance", i, Ps), p("watches", i, Ls), x("processContent", e, Ts));
        }
        if (yt(t)) return new CustomElementDefinition(e, t, a(Fs(e, "aliases"), e.aliases), Ds(t), x("cache", e, Is), x("capture", e, Ps), x("template", e, Ts), a(Fs(e, "instructions"), e.instructions), a(Fs(e, "dependencies"), e.dependencies), x("injectable", e, Ts), x("needsCompile", e, Es), a(Fs(e, "surrogates"), e.surrogates), Pt.from(e, ...Pt.getAll(e), Fs(e, "bindables"), e.bindables), Ze.from(...Ze.getAll(e), Fs(e, "childrenObservers"), e.childrenObservers), x("containerless", e, Ps), x("isStrictBinding", e, Ps), x("shadowOptions", e, Ts), x("hasSlots", e, Ps), x("enhance", e, Ps), a(Me.getAnnotation(e), e.watches), x("processContent", e, Ts));
        const i = p("name", t, Us);
        return new CustomElementDefinition(e, i, a(Fs(e, "aliases"), t.aliases, e.aliases), Ds(i), b("cache", t, e, Is), b("capture", t, e, Ps), b("template", t, e, Ts), a(Fs(e, "instructions"), t.instructions, e.instructions), a(Fs(e, "dependencies"), t.dependencies, e.dependencies), b("injectable", t, e, Ts), b("needsCompile", t, e, Es), a(Fs(e, "surrogates"), t.surrogates, e.surrogates), Pt.from(e, ...Pt.getAll(e), Fs(e, "bindables"), e.bindables, t.bindables), Ze.from(...Ze.getAll(e), Fs(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), b("containerless", t, e, Ps), b("isStrictBinding", t, e, Ps), b("shadowOptions", t, e, Ts), b("hasSlots", t, e, Ps), b("enhance", t, e, Ps), a(t.watches, Me.getAnnotation(e), e.watches), b("processContent", t, e, Ts));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Rs.has(t)) return Rs.get(t);
        const e = CustomElementDefinition.create(t);
        Rs.set(t, e);
        rt(Os, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            jt(i, e).register(t);
            _t(i, e).register(t);
            Ht(s, Hs, i, t);
        }
    }
}

const Ss = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Is = () => 0;

const Ts = () => null;

const Ps = () => false;

const Es = () => true;

const Ls = () => l;

const Os = at("custom-element");

const Ds = t => `${Os}:${t}`;

const Us = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const $s = (t, e, i) => {
    rt(ht(e), i, t);
};

const qs = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    rt(Os, i, i.Type);
    rt(Os, i, i);
    ct(i.Type, Os);
    return i.Type;
};

const Ms = t => wt(t) && nt(Os, t);

const _s = (t, e = Ss) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = hs(t, Os);
        if (null === i) {
            if (true === e.optional) return null;
            throw mt(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = hs(t, Os);
            if (null === i) throw mt(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = hs(i, Os);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = ms(i);
        }
        if (s) return;
        throw mt(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = hs(i, Os);
        if (null !== t) return t;
        i = ms(i);
    }
    throw mt(`AUR0765`);
};

const Fs = (t, e) => st(ht(e), t);

const js = t => {
    const e = st(Os, t);
    if (void 0 === e) throw mt(`AUR0760:${t.name}`);
    return e;
};

const Vs = () => {
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

const Ns = function() {
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

const Hs = Object.freeze({
    name: Os,
    keyFrom: Ds,
    isType: Ms,
    for: _s,
    define: qs,
    getDefinition: js,
    annotate: $s,
    getAnnotation: Fs,
    generateName: Us,
    createInjectable: Vs,
    generateType: Ns
});

const Ws = ht("processContent");

function zs(t) {
    return void 0 === t ? function(t, e, i) {
        rt(Ws, Gs(t, e), t);
    } : function(e) {
        t = Gs(e, t);
        const i = st(Os, e);
        if (void 0 !== i) i.processContent = t; else rt(Ws, t, e);
        return e;
    };
}

function Gs(t, e) {
    if (yt(e)) e = t[e];
    if (!wt(e)) throw mt(`AUR0766:${typeof e}`);
    return e;
}

function Xs(t) {
    return function(e) {
        const i = wt(t) ? t : true;
        $s(e, "capture", i);
        if (Ms(e)) js(e).capture = i;
    };
}

const Ks = qt("IProjections");

const Qs = qt("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var Ys;

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
})(Ys || (Ys = {}));

const Zs = qt("Instruction");

function Js(t) {
    const e = t.type;
    return yt(e) && 2 === e.length;
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

const tn = qt("ITemplateCompiler");

const en = qt("IRenderer");

function sn(t) {
    return function e(i) {
        i.register = function(t) {
            Mt(en, this).register(t);
        };
        kt(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function nn(t, e, i) {
    if (yt(e)) return t.parse(e, i);
    return e;
}

function rn(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function on(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return _s(t);

      case "view":
        throw mt(`AUR0750`);

      case "view-model":
        return _s(t).viewModel;

      default:
        {
            const i = We(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = _s(t, {
                name: e
            });
            if (void 0 === s) throw mt(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let ln = class SetPropertyRenderer {
    render(t, e, i) {
        const s = rn(e);
        if (void 0 !== s.$observers?.[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

ln = et([ sn("re") ], ln);

let hn = class CustomElementRenderer {
    constructor(t) {
        this.r = t;
    }
    static get inject() {
        return [ Ti ];
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
            o = f.find(Hs, c);
            if (null == o) throw mt(`AUR0752:${c}@${t["name"]}`);
            break;

          default:
            o = c;
        }
        const m = i.containerless || o.containerless;
        const g = m ? ps(e) : null;
        const p = Pn(s, t, e, i, g, null == u ? void 0 : new AuSlotsInfo(Object.keys(u)));
        l = o.Type;
        h = p.invoke(l);
        Vt(p, l, new d(o.key, h));
        a = Controller.$el(p, h, e, i, o, g);
        as(e, o.key, a);
        const v = this.r.renderers;
        const x = i.props;
        const b = x.length;
        let w = 0;
        let y;
        while (b > w) {
            y = x[w];
            v[y.type].render(t, a, y, s, n, r);
            ++w;
        }
        t.addChild(a);
    }
};

hn = et([ sn("ra") ], hn);

let an = class CustomAttributeRenderer {
    constructor(t) {
        this.r = t;
    }
    static get inject() {
        return [ Ti ];
    }
    render(t, e, i, s, n, r) {
        let o = t.container;
        let l;
        switch (typeof i.res) {
          case "string":
            l = o.find(Xe, i.res);
            if (null == l) throw mt(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            l = i.res;
        }
        const h = En(s, l, t, e, i, void 0, void 0);
        const a = Controller.$attr(h.ctn, h.vm, e, l);
        as(e, l.key, a);
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

an = et([ sn("rb") ], an);

let cn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ti, ri ];
    }
    render(t, e, i, s, n, r) {
        let o = t.container;
        let l;
        switch (typeof i.res) {
          case "string":
            l = o.find(Xe, i.res);
            if (null == l) throw mt(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            l = i.res;
        }
        const h = this.r.getViewFactory(i.def, o);
        const a = ps(e);
        const c = En(this.p, l, t, e, i, h, a);
        const u = Controller.$attr(c.ctn, c.vm, e, l);
        as(a, l.key, u);
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

cn = et([ sn("rc") ], cn);

let un = class LetElementRenderer {
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
            u = nn(n, c.from, 16);
            t.addBinding(new LetBinding(h, r, u, c.to, l));
            ++f;
        }
    }
};

un = et([ sn("rd") ], un);

let fn = class RefBindingRenderer {
    render(t, e, i, s, n) {
        t.addBinding(new RefBinding(t.container, nn(n, i.from, 16), on(e, i.to)));
    }
};

fn = et([ sn("rj") ], fn);

let dn = class InterpolationBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new InterpolationBinding(t, t.container, r, s.domWriteQueue, nn(n, i.from, 1), rn(e), i.to, 2));
    }
};

dn = et([ sn("rf") ], dn);

let mn = class PropertyBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, s.domWriteQueue, nn(n, i.from, 16), rn(e), i.to, i.mode));
    }
};

mn = et([ sn("rg") ], mn);

let gn = class IteratorBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, s.domWriteQueue, nn(n, i.forOf, 2), rn(e), i.to, 2));
    }
};

gn = et([ sn("rk") ], gn);

let pn = class TextBindingRenderer {
    render(t, e, i, s, n, r) {
        const o = t.container;
        const l = e.nextSibling;
        const h = e.parentNode;
        const a = s.document;
        const c = nn(n, i.from, 1);
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

pn = et([ sn("ha") ], pn);

let vn = class ListenerBindingRenderer {
    render(t, e, i, s, n) {
        t.addBinding(new ListenerBinding(t.container, nn(n, i.from, 8), e, i.to, new ListenerBindingOptions(i.preventDefault, i.capture)));
    }
};

vn = et([ sn("hb") ], vn);

let xn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

xn = et([ sn("he") ], xn);

let bn = class SetClassAttributeRenderer {
    render(t, e, i) {
        Cn(e.classList, i.value);
    }
};

bn = et([ sn("hf") ], bn);

let wn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

wn = et([ sn("hg") ], wn);

let yn = class StylePropertyBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, s.domWriteQueue, nn(n, i.from, 16), e.style, i.to, 2));
    }
};

yn = et([ sn("hd") ], yn);

let kn = class AttributeBindingRenderer {
    render(t, e, i, s, n, r) {
        t.addBinding(new AttributeBinding(t, t.container, r, s.domWriteQueue, nn(n, i.from, 16), e, i.attr, i.to, 2));
    }
};

kn = et([ sn("hc") ], kn);

let An = class SpreadRenderer {
    constructor(t, e) {
        this.ne = t;
        this.r = e;
    }
    static get inject() {
        return [ tn, Ti ];
    }
    render(t, e, i, s, n, r) {
        const o = t.container;
        const h = o.get(Gi);
        const a = this.r.renderers;
        const c = t => {
            let e = t;
            let i = h;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw mt("No scope context for spread binding.");
            return i;
        };
        const u = i => {
            const o = c(i);
            const h = Bn(o);
            const f = this.ne.compileSpread(o.controller.definition, o.instruction?.captures ?? l, o.controller.container, e);
            let d;
            for (d of f) switch (d.type) {
              case "hs":
                u(i + 1);
                break;

              case "hp":
                a[d.instructions.type].render(h, _s(e), d.instructions, s, n, r);
                break;

              default:
                a[d.type].render(h, e, d, s, n, r);
            }
            t.addBinding(h);
        };
        u(0);
    }
};

An = et([ sn("hs") ], An);

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
        if (null == e) throw mt("Invalid spreading. Context scope is null/undefined");
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
        if (1 !== t.vmKind) throw mt("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
    limit() {
        throw mt("not implemented");
    }
    useScope() {
        throw mt("not implemented");
    }
}

function Cn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Bn = t => new SpreadBinding([], t);

const Rn = "IController";

const Sn = "IInstruction";

const In = "IRenderLocation";

const Tn = "IAuSlotsInfo";

function Pn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    Vt(o, t.HTMLElement, Vt(o, t.Element, Vt(o, cs, new d("ElementResolver", i))));
    Vt(o, zi, new d(Rn, e));
    Vt(o, Zs, new d(Sn, s));
    Vt(o, fs, null == n ? Ln : new RenderLocationProvider(n));
    Vt(o, Ii, On);
    Vt(o, Qs, null == r ? Dn : new d(Tn, r));
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
        if (null === t) throw mt(`AUR7055`);
        if (!yt(t.name) || 0 === t.name.length) throw mt(`AUR0756`);
        return t;
    }
}

function En(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    Vt(h, t.HTMLElement, Vt(h, t.Element, Vt(h, cs, new d("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    Vt(h, zi, new d(Rn, i));
    Vt(h, Zs, new d(Sn, n));
    Vt(h, fs, null == o ? Ln : new d(In, o));
    Vt(h, Ii, null == r ? On : new ViewFactoryProvider(r));
    Vt(h, Qs, null == l ? Dn : new d(Tn, l));
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

const Ln = new RenderLocationProvider(null);

const On = new ViewFactoryProvider(null);

const Dn = new d(Tn, new AuSlotsInfo(l));

var Un;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Un || (Un = {}));

function $n(t) {
    return function(e) {
        return Fn.define(t, e);
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
        if (yt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, i(_n(e, "name"), s), a(_n(e, "aliases"), n.aliases, e.aliases), Mn(s), i(_n(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Mt(i, e).register(t);
        _t(i, e).register(t);
        Ht(s, Fn, i, t);
    }
}

const qn = at("binding-command");

const Mn = t => `${qn}:${t}`;

const _n = (t, e) => st(ht(e), t);

const Fn = Object.freeze({
    name: qn,
    keyFrom: Mn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        rt(qn, i, i.Type);
        rt(qn, i, i);
        ct(e, qn);
        return i.Type;
    },
    getAnnotation: _n
});

let jn = class OneTimeBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? w(n); else {
            if ("" === r && 1 === t.def.type) r = w(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 1);
    }
};

jn = et([ $n("one-time") ], jn);

let Vn = class ToViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? w(n); else {
            if ("" === r && 1 === t.def.type) r = w(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 2);
    }
};

Vn = et([ $n("to-view") ], Vn);

let Nn = class FromViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? w(n); else {
            if ("" === r && 1 === t.def.type) r = w(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 4);
    }
};

Nn = et([ $n("from-view") ], Nn);

let Hn = class TwoWayBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? w(n); else {
            if ("" === r && 1 === t.def.type) r = w(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 6);
    }
};

Hn = et([ $n("two-way") ], Hn);

let Wn = class DefaultBindingCommand {
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
            l = i.map(t.node, l) ?? w(l);
        } else {
            if ("" === h && 1 === t.def.type) h = w(l);
            r = t.def.defaultBindingMode;
            o = 8 === n.mode || null == n.mode ? null == r || 8 === r ? 2 : r : n.mode;
            l = n.property;
        }
        return new PropertyBindingInstruction(e.parse(h, 16), l, o);
    }
};

Wn = et([ $n("bind") ], Wn);

let zn = class ForBindingCommand {
    constructor(t) {
        this.le = t;
    }
    get type() {
        return 0;
    }
    static get inject() {
        return [ Kt ];
    }
    build(t, e) {
        const i = null === t.bindable ? w(t.attr.target) : t.bindable.property;
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

zn = et([ $n("for") ], zn);

let Gn = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, true, false);
    }
};

Gn = et([ $n("trigger") ], Gn);

let Xn = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, false, true);
    }
};

Xn = et([ $n("capture") ], Xn);

let Kn = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

Kn = et([ $n("attr") ], Kn);

let Qn = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

Qn = et([ $n("style") ], Qn);

let Yn = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

Yn = et([ $n("class") ], Yn);

let Zn = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

Zn = et([ $n("ref") ], Zn);

let Jn = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Jn = et([ $n("...$attrs") ], Jn);

const tr = qt("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const er = t => {
    const e = dt();
    t = yt(t) ? t.split(" ") : t;
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
        this.he = Object.assign(dt(), {
            a: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: er("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: dt(),
            altGlyphDef: er("id xml:base xml:lang xml:space"),
            altglyphdef: dt(),
            altGlyphItem: er("id xml:base xml:lang xml:space"),
            altglyphitem: dt(),
            animate: er("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: er("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: er("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: er("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: er("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: er("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": er("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: er("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: er("class id style xml:base xml:lang xml:space"),
            ellipse: er("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: er("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: er("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: er("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: er("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: er("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: er("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: er("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: er("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: er("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: er("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: er("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: er("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: er("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: er("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: er("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: er("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: er("id xml:base xml:lang xml:space"),
            feMorphology: er("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: er("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: er("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: er("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: er("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: er("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: er("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: er("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: er("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": er("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": er("id string xml:base xml:lang xml:space"),
            "font-face-name": er("id name xml:base xml:lang xml:space"),
            "font-face-src": er("id xml:base xml:lang xml:space"),
            "font-face-uri": er("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: er("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: er("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: er("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: dt(),
            hkern: er("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: er("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: er("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: er("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: er("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: er("id xml:base xml:lang xml:space"),
            "missing-glyph": er("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: er("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: er("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: er("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: er("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: er("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: er("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: er("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: er("class id offset style xml:base xml:lang xml:space"),
            style: er("id media title type xml:base xml:lang xml:space"),
            svg: er("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: er("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: er("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: er("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: er("class id style xml:base xml:lang xml:space"),
            tref: er("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: er("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: er("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: er("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: er("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.ae = er("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.ce = er("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return Mt(tr, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.ae[t.nodeName] && true === this.ce[e] || true === this.he[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ ri ];

const ir = qt("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ue = dt();
        this.fe = dt();
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
        return [ tr ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.ue)[n] ?? (e[n] = dt());
            for (r in i) {
                if (void 0 !== s[r]) throw nr(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.fe;
        for (const i in t) {
            if (void 0 !== e[i]) throw nr(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return sr(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.ue[t.nodeName]?.[e] ?? this.fe[e] ?? (vt(t, e, this.svg) ? e : null);
    }
}

function sr(t, e) {
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

function nr(t, e) {
    return mt(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const rr = qt("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const or = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.de = t.document.createElement("template");
    }
    createTemplate(t) {
        if (yt(t)) {
            let e = or[t];
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
                or[t] = e;
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

TemplateElementFactory.inject = [ ri ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Mt(tn, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = ar);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = yt(s.template) || !t.enhance ? n.me.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const a = e.get($t(br));
        const c = a.length;
        let u = 0;
        if (c > 0) while (c > u) {
            a[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(pr)) throw mt(`AUR0701`);
        this.ge(h, n);
        this.pe(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Us(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.ve(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, ar, null, null, void 0);
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
        let b;
        let y;
        let k;
        let A;
        for (;a > c; ++c) {
            u = e[c];
            k = u.target;
            A = u.rawValue;
            x = n.be(u);
            if (null !== x && (1 & x.type) > 0) {
                ur.node = s;
                ur.attr = u;
                ur.bindable = null;
                ur.def = null;
                r.push(x.build(ur, n.ep, n.m));
                continue;
            }
            f = n.we(k);
            if (null !== f) {
                if (f.isTemplateController) throw mt(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === x && lr(A);
                if (y) m = this.ye(s, A, f, n); else {
                    v = g.primary;
                    if (null === x) {
                        b = h.parse(A, 1);
                        m = [ null === b ? new SetPropertyInstruction(A, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        ur.node = s;
                        ur.attr = u;
                        ur.bindable = v;
                        ur.def = f;
                        m = [ x.build(ur, n.ep, n.m) ];
                    }
                }
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === x) {
                b = h.parse(A, 1);
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        b = h.parse(A, 1);
                        r.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(A, p.property) : new InterpolationInstruction(b, p.property)));
                        continue;
                    }
                }
                if (null != b) r.push(new InterpolationInstruction(b, n.m.map(s, k) ?? w(k))); else switch (k) {
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
                        ur.node = s;
                        ur.attr = u;
                        ur.bindable = p;
                        ur.def = o;
                        r.push(new SpreadElementPropBindingInstruction(x.build(ur, n.ep, n.m)));
                        continue;
                    }
                }
                ur.node = s;
                ur.attr = u;
                ur.bindable = null;
                ur.def = null;
                r.push(x.build(ur, n.ep, n.m));
            }
        }
        hr();
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
        let b;
        let y;
        for (;r > o; ++o) {
            l = s[o];
            h = l.name;
            a = l.value;
            c = e.le.parse(h, a);
            b = c.target;
            y = c.rawValue;
            if (fr[b]) throw mt(`AUR0702:${h}`);
            p = e.be(c);
            if (null !== p && (1 & p.type) > 0) {
                ur.node = t;
                ur.attr = c;
                ur.bindable = null;
                ur.def = null;
                i.push(p.build(ur, e.ep, e.m));
                continue;
            }
            u = e.we(b);
            if (null !== u) {
                if (u.isTemplateController) throw mt(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                x = false === u.noMultiBindings && null === p && lr(y);
                if (x) d = this.ye(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        ur.node = t;
                        ur.attr = c;
                        ur.bindable = g;
                        ur.def = u;
                        d = [ p.build(ur, e.ep, e.m) ];
                    }
                }
                t.removeAttribute(h);
                --o;
                --r;
                (f ?? (f = [])).push(new HydrateAttributeInstruction(this.resolveResources ? u : u.name, null != u.aliases && u.aliases.includes(b) ? b : void 0, d));
                continue;
            }
            if (null === p) {
                v = n.parse(y, 1);
                if (null != v) {
                    t.removeAttribute(h);
                    --o;
                    --r;
                    i.push(new InterpolationInstruction(v, e.m.map(t, b) ?? w(b)));
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
                ur.node = t;
                ur.attr = c;
                ur.bindable = null;
                ur.def = null;
                i.push(p.build(ur, e.ep, e.m));
            }
        }
        hr();
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
            f = e.be(a);
            if (null !== f) {
                if ("bind" === a.command) n.push(new LetBindingInstruction(r.parse(m, 16), w(d))); else throw mt(`AUR0704:${a.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new V(m) : g, w(d)));
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
        let b;
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
        let O;
        let D;
        let U;
        let $;
        let q;
        let M = null;
        let _;
        let F;
        let j;
        let V;
        let N = true;
        let H = false;
        let W = false;
        if ("slot" === a) {
            if (null == e.root.def.shadowOptions) throw mt(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (u) {
            N = c.processContent?.call(c.Type, t, e.p);
            x = t.attributes;
            y = x.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw mt(`AUR0705`);
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
            M = e.be(R);
            j = R.target;
            V = R.rawValue;
            if (d && (!m || m && d(j))) {
                if (null != M && 1 & M.type) {
                    v();
                    g.push(R);
                    continue;
                }
                W = "au-slot" !== j && "slot" !== j;
                if (W) {
                    _ = BindablesInfo.from(c, false);
                    if (null == _.attrs[j] && !e.we(j)?.isTemplateController) {
                        v();
                        g.push(R);
                        continue;
                    }
                }
            }
            if (null !== M && 1 & M.type) {
                ur.node = t;
                ur.attr = R;
                ur.bindable = null;
                ur.def = null;
                (S ?? (S = [])).push(M.build(ur, e.ep, e.m));
                v();
                continue;
            }
            T = e.we(j);
            if (null !== T) {
                _ = BindablesInfo.from(T, true);
                P = false === T.noMultiBindings && null === M && lr(V);
                if (P) O = this.ye(t, V, T, e); else {
                    F = _.primary;
                    if (null === M) {
                        $ = p.parse(V, 1);
                        O = [ null === $ ? new SetPropertyInstruction(V, F.property) : new InterpolationInstruction($, F.property) ];
                    } else {
                        ur.node = t;
                        ur.attr = R;
                        ur.bindable = F;
                        ur.def = T;
                        O = [ M.build(ur, e.ep, e.m) ];
                    }
                }
                v();
                if (T.isTemplateController) (D ?? (D = [])).push(new HydrateTemplateController(cr, this.resolveResources ? T : T.name, void 0, O)); else (L ?? (L = [])).push(new HydrateAttributeInstruction(this.resolveResources ? T : T.name, null != T.aliases && T.aliases.includes(j) ? j : void 0, O));
                continue;
            }
            if (null === M) {
                if (u) {
                    _ = BindablesInfo.from(c, false);
                    E = _.attrs[j];
                    if (void 0 !== E) {
                        $ = p.parse(V, 1);
                        (I ?? (I = [])).push(null == $ ? new SetPropertyInstruction(V, E.property) : new InterpolationInstruction($, E.property));
                        v();
                        continue;
                    }
                }
                $ = p.parse(V, 1);
                if (null != $) {
                    v();
                    (S ?? (S = [])).push(new InterpolationInstruction($, e.m.map(t, j) ?? w(j)));
                }
                continue;
            }
            v();
            if (u) {
                _ = BindablesInfo.from(c, false);
                E = _.attrs[j];
                if (void 0 !== E) {
                    ur.node = t;
                    ur.attr = R;
                    ur.bindable = E;
                    ur.def = c;
                    (I ?? (I = [])).push(M.build(ur, e.ep, e.m));
                    continue;
                }
            }
            ur.node = t;
            ur.attr = R;
            ur.bindable = null;
            ur.def = null;
            (S ?? (S = [])).push(M.build(ur, e.ep, e.m));
        }
        hr();
        if (this.Re(t) && null != S && S.length > 1) this.Se(t, S);
        if (u) {
            q = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, I ?? l, null, H, g);
            if (a === Br) {
                const i = t.getAttribute("name") || Cr;
                const s = e.h("template");
                const n = e.Ie();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.pe(s.content, n);
                q.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: Us(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Te(t, e);
            }
        }
        if (null != S || null != q || null != L) {
            b = l.concat(q ?? l, L ?? l, S ?? l);
            this.Be(t);
        }
        let z;
        if (null != D) {
            y = D.length - 1;
            k = y;
            U = D[k];
            let n;
            this.Te(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.Ie(null == b ? [] : [ b ]);
            let l;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v;
            let x;
            let w = 0, A = 0;
            let C = t.firstChild;
            let B = false;
            if (false !== N) while (null !== C) {
                h = 1 === C.nodeType ? C.getAttribute(Br) : null;
                if (null !== h) C.removeAttribute(Br);
                if (u) {
                    l = C.nextSibling;
                    if (!f) {
                        B = 3 === C.nodeType && "" === C.textContent.trim();
                        if (!B) ((i = m ?? (m = {}))[s = h || Cr] ?? (i[s] = [])).push(C);
                        t.removeChild(C);
                    }
                    C = l;
                } else {
                    if (null !== h) {
                        h = h || Cr;
                        throw mt(`AUR0706:${a}[${h}]`);
                    }
                    C = C.nextSibling;
                }
            }
            if (null != m) {
                d = {};
                for (h in m) {
                    n = e.h("template");
                    g = m[h];
                    for (w = 0, A = g.length; A > w; ++w) {
                        p = g[w];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) n.content.appendChild(p); else n.content.appendChild(p.content); else n.content.appendChild(p);
                    }
                    x = e.Ie();
                    this.pe(n.content, x);
                    d[h] = CustomElementDefinition.create({
                        name: Us(),
                        template: n,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (u && (H || c.containerless)) this.Te(t, e);
            z = !u || !c.containerless && !H && false !== N;
            if (z) if ("TEMPLATE" === t.nodeName) this.pe(t.content, o); else {
                C = t.firstChild;
                while (null !== C) C = this.pe(C, o);
            }
            U.def = CustomElementDefinition.create({
                name: Us(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (k-- > 0) {
                U = D[k];
                n = e.h("template");
                v = e.h("au-m");
                v.classList.add("au");
                n.content.appendChild(v);
                U.def = CustomElementDefinition.create({
                    name: Us(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ D[k + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ U ]);
        } else {
            if (null != b) e.rows.push(b);
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
            let x = 0, w = 0;
            if (false !== N) while (null !== i) {
                n = 1 === i.nodeType ? i.getAttribute(Br) : null;
                if (null !== n) i.removeAttribute(Br);
                if (u) {
                    s = i.nextSibling;
                    if (!f) {
                        v = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!v) ((r = h ?? (h = {}))[o = n || Cr] ?? (r[o] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || Cr;
                        throw mt(`AUR0706:${a}[${n}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != h) {
                l = {};
                for (n in h) {
                    g = e.h("template");
                    d = h[n];
                    for (x = 0, w = d.length; w > x; ++x) {
                        m = d[x];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.Ie();
                    this.pe(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: Us(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = l;
            }
            if (u && (H || c.containerless)) this.Te(t, e);
            z = !u || !c.containerless && !H && false !== N;
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
                d = s.be(f);
                m = n.attrs[f.target];
                if (null == m) throw mt(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    ur.node = t;
                    ur.attr = f;
                    ur.bindable = m;
                    ur.def = i;
                    o.push(d.build(ur, s.ep, s.m));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                a = g;
                l = void 0;
                h = void 0;
            }
        }
        hr();
        return o;
    }
    ge(t, e) {
        const i = t;
        const s = y(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw mt(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw mt(`AUR0709`);
            const s = vr(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const a = Pt.for(n);
            const c = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw mt(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw mt(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || c.has(e)) throw mt(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    c.add(e);
                }
                a.add({
                    property: e,
                    attribute: i ?? void 0,
                    mode: xr(t)
                });
                const s = t.getAttributeNames().filter((t => !gr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Pe(qs({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const a = o.length;
        for (;a > h; ++h) js(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    Re(t) {
        return "INPUT" === t.nodeName && 1 === dr[t.type];
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
        this.Ee = dt();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.me = o ? s.me : e.get(rr);
        this.le = o ? s.le : e.get(Kt);
        this.ep = o ? s.ep : e.get(q);
        this.m = o ? s.m : e.get(ir);
        this.Le = o ? s.Le : e.get(k);
        this.p = o ? s.p : e.get(ri);
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
        return this.c.find(Hs, t);
    }
    we(t) {
        return this.c.find(Xe, t);
    }
    Ie(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    be(t) {
        if (this.root !== this) return this.root.be(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.Ee[e];
        if (void 0 === i) {
            i = this.c.create(Fn, e);
            if (null === i) throw mt(`AUR0713:${e}`);
            this.Ee[e] = i;
        }
        return i;
    }
}

function lr(t) {
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

function hr() {
    ur.node = ur.attr = ur.bindable = ur.def = null;
}

const ar = {
    projections: null
};

const cr = {
    name: "unnamed"
};

const ur = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const fr = Object.assign(dt(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const dr = {
    checkbox: 1,
    radio: 1
};

const mr = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = mr.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = dt();
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
                    if (h) throw mt(`AUR0714:${t.name}`);
                    h = true;
                    a = o;
                } else if (!h && null == a) a = o;
                n[c] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) a = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            mr.set(t, i = new BindablesInfo(n, s, a));
        }
        return i;
    }
}

const gr = Object.freeze([ "property", "attribute", "mode" ]);

const pr = "as-custom-element";

function vr(t, e) {
    const i = t.getAttribute(pr);
    if (null === i || "" === i) throw mt(`AUR0715`);
    if (e.has(i)) throw mt(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(pr);
    }
    return i;
}

function xr(t) {
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

const br = qt("ITemplateCompilerHooks");

const wr = new WeakMap;

const yr = at("compiler-hooks");

const kr = Object.freeze({
    name: yr,
    define(t) {
        let e = wr.get(t);
        if (void 0 === e) {
            wr.set(t, e = new TemplateCompilerHooksDefinition(t));
            rt(yr, e, t);
            ct(t, yr);
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
        t.register(Mt(br, this.Type));
    }
}

const Ar = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return kr.define(t);
    }
};

const Cr = "default";

const Br = "au-slot";

const Rr = new Map;

class BindingModeBehavior {
    bind(t, e) {
        Rr.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = Rr.get(e);
        Rr.delete(e);
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

ue("oneTime")(OneTimeBindingBehavior);

ue("toView")(ToViewBindingBehavior);

ue("fromView")(FromViewBindingBehavior);

ue("twoWay")(TwoWayBindingBehavior);

const Sr = new WeakMap;

const Ir = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "debounce",
            delay: i > 0 ? i : Ir,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(s);
        if (null == n) ; else Sr.set(e, n);
    }
    unbind(t, e) {
        Sr.get(e)?.dispose();
        Sr.delete(e);
    }
}

DebounceBindingBehavior.inject = [ c ];

ue("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Oe = new Map;
        this.De = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw mt(`AUR0817`);
        if (0 === i.length) throw mt(`AUR0818`);
        this.Oe.set(e, i);
        let s;
        for (s of i) this.De.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.Oe.get(e);
        this.Oe.delete(e);
        let s;
        for (s of i) this.De.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ P ];

ue("signal")(SignalBindingBehavior);

const Tr = new WeakMap;

const Pr = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.Ue = t.performanceNow;
        this.ht = t.taskQueue;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "throttle",
            delay: i > 0 ? i : Pr,
            now: this.Ue,
            queue: this.ht
        };
        const n = e.limit?.(s);
        if (null == n) ; else Tr.set(e, n);
    }
    unbind(t, e) {
        Tr.get(e)?.dispose();
        Tr.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ c ];

ue("throttle")(ThrottleBindingBehavior);

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

ci(DataAttributeAccessor);

const Er = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        if (!(e instanceof PropertyBinding)) throw mt(`AURxxxx`);
        e.useTargetObserver(Er);
    }
}

ue("attr")(AttrBindingBehavior);

class SelfBindingBehavior {
    bind(t, e) {
        if (!(e instanceof ListenerBinding)) throw mt(`AUR0801`);
        e.self = true;
    }
    unbind(t, e) {
        e.self = false;
    }
}

ue("self")(SelfBindingBehavior);

const Lr = dt();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Lr[t] ?? (Lr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

ci(AttributeNSAccessor);

function Or(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.$e = void 0;
        this.qe = void 0;
        this.yt = false;
        this.wt = t;
        this.oL = s;
        this.bt = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        const e = this.v;
        if (t === e) return;
        this.v = t;
        this.ov = e;
        this.Me();
        this._e();
        this.it();
    }
    handleCollectionChange() {
        this._e();
    }
    handleChange(t, e) {
        this._e();
    }
    _e() {
        const t = this.v;
        const e = this.wt;
        const i = gt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Or;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (bt(t)) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const e = this.wt;
        const i = gt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Or;
        if ("checkbox" === e.type) {
            if (bt(t)) {
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
        this.Me();
    }
    At() {
        this.$e?.unsubscribe(this);
        this.qe?.unsubscribe(this);
        this.$e = this.qe = void 0;
    }
    it() {
        Dr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Dr);
    }
    Me() {
        const t = this.wt;
        (this.qe ?? (this.qe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.$e?.unsubscribe(this);
        this.$e = void 0;
        if ("checkbox" === t.type) (this.$e = zr(this.v, this.oL))?.subscribe(this);
    }
}

hi(CheckedObserver);

I(CheckedObserver);

let Dr;

const Ur = {
    childList: true,
    subtree: true,
    characterData: true
};

function $r(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Z = false;
        this.Fe = void 0;
        this.je = void 0;
        this.iO = false;
        this.yt = false;
        this.wt = t;
        this.oL = s;
        this.bt = i;
    }
    getValue() {
        return this.iO ? this.v : this.wt.multiple ? qr(this.wt.options) : this.wt.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.Z = t !== this.ov;
        this.Ve(t instanceof Array ? t : null);
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
        const e = this.wt;
        const i = bt(t);
        const s = e.matcher ?? $r;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = gt.call(e, "model") ? e.model : e.value;
            if (i) {
                e.selected = -1 !== t.findIndex((t => !!s(o, t)));
                continue;
            }
            e.selected = !!s(o, t);
        }
    }
    syncValue() {
        const t = this.wt;
        const e = t.options;
        const i = e.length;
        const s = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(s instanceof Array)) return true;
            let r;
            const o = t.matcher || $r;
            const l = [];
            while (n < i) {
                r = e[n];
                if (r.selected) l.push(gt.call(r, "model") ? r.model : r.value);
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
                r = gt.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    kt() {
        (this.je = new this.wt.ownerDocument.defaultView.MutationObserver(this.Ne.bind(this))).observe(this.wt, Ur);
        this.Ve(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    At() {
        this.je.disconnect();
        this.Fe?.unsubscribe(this);
        this.je = this.Fe = void 0;
        this.iO = false;
    }
    Ve(t) {
        this.Fe?.unsubscribe(this);
        this.Fe = void 0;
        if (null != t) {
            if (!this.wt.multiple) throw mt(`AUR0654`);
            (this.Fe = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.it();
    }
    Ne(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.it();
    }
    it() {
        Mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Mr);
    }
}

hi(SelectValueObserver);

I(SelectValueObserver);

function qr(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = gt.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let Mr;

const _r = "--";

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
            if (yt(e)) {
                if (i.startsWith(_r)) {
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
        if (yt(t)) return this.He(t);
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
                if (!gt.call(e, s) || e[s] !== n) continue;
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
        this.v = this.ov = this.obj.style.cssText;
    }
}

ci(StyleAttributeAccessor);

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.Z = false;
        this.yt = false;
        this.wt = t;
        this.k = e;
        this.bt = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (Ct(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.Z = true;
        if (!this.bt.readonly) this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.wt[this.k] = this.v ?? this.bt.default;
            this.it();
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.wt[this.k];
        if (this.ov !== this.v) {
            this.Z = false;
            this.it();
        }
    }
    kt() {
        this.v = this.ov = this.wt[this.k];
    }
    it() {
        Fr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Fr);
    }
}

hi(ValueAttributeObserver);

I(ValueAttributeObserver);

let Fr;

const jr = "http://www.w3.org/1999/xlink";

const Vr = "http://www.w3.org/XML/1998/namespace";

const Nr = "http://www.w3.org/2000/xmlns/";

const Hr = Object.assign(dt(), {
    "xlink:actuate": [ "actuate", jr ],
    "xlink:arcrole": [ "arcrole", jr ],
    "xlink:href": [ "href", jr ],
    "xlink:role": [ "role", jr ],
    "xlink:show": [ "show", jr ],
    "xlink:title": [ "title", jr ],
    "xlink:type": [ "type", jr ],
    "xml:lang": [ "lang", Vr ],
    "xml:space": [ "space", Vr ],
    xmlns: [ "xmlns", Nr ],
    "xmlns:xlink": [ "xlink", Nr ]
});

const Wr = new N;

Wr.type = 2 | 4;

class NodeObserverLocator {
    constructor(t, e, i, s) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = i;
        this.svgAnalyzer = s;
        this.allowDirtyCheck = true;
        this.Xe = dt();
        this.Ke = dt();
        this.Qe = dt();
        this.Ye = dt();
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
        _t(H, NodeObserverLocator).register(t);
        Mt(H, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Xe;
        let n;
        if (yt(t)) {
            n = s[t] ?? (s[t] = dt());
            if (null == n[e]) n[e] = i; else Gr(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = dt());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = r[e]; else Gr(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = t[e]; else Gr("*", e); else if (null == i[t]) i[t] = e; else Gr("*", t);
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
            return Er;

          default:
            {
                const i = Hr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (vt(t, e, this.svgAnalyzer)) return Er;
                return Wr;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (yt(t)) {
            n = (i = this.Qe)[t] ?? (i[t] = dt());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Qe)[e] ?? (s[e] = dt());
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
        const n = Hr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (vt(t, e, this.svgAnalyzer)) return Er;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw mt(`AUR0652:${String(e)}`);
        } else return new z(t, e);
    }
}

NodeObserverLocator.inject = [ C, ri, G, tr ];

function zr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Gr(t, e) {
    throw mt(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t, e) {
        if (!(e instanceof NodeObserverLocator)) throw mt("AURxxxx: updateTrigger binding behavior only works with the default implementation of Aurelia HTML observation. Implement your own node observation + updateTrigger");
        this.oL = t;
        this.Ze = e;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw mt(`AUR0802`);
        if (!(e instanceof PropertyBinding) || !(4 & e.mode)) throw mt(`AUR0803`);
        const s = this.Ze.getNodeObserverConfig(e.target, e.targetProperty);
        if (null == s) throw mt(`AURxxxx`);
        const n = this.Ze.getNodeObserver(e.target, e.targetProperty, this.oL);
        n.useConfig({
            readonly: s.readonly,
            default: s.default,
            events: i
        });
        e.useTargetObserver(n);
    }
}

UpdateTriggerBindingBehavior.inject = [ M, H ];

ue("updateTrigger")(UpdateTriggerBindingBehavior);

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

Focus.inject = [ cs, ri ];

et([ St({
    mode: 6
}) ], Focus.prototype, "value", void 0);

_e("focus")(Focus);

let Xr = class Show {
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

et([ St ], Xr.prototype, "value", void 0);

Xr = et([ it(0, cs), it(1, ri), it(2, Zs) ], Xr);

Nt("hide")(Xr);

_e("show")(Xr);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.oi = i.document.createElement("div");
        this.view = t.create();
        gs(this.view.nodes, e);
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
        if (xt(s)) s.catch((t => {
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
            if (this.strict) throw mt(`AUR0811`);
            return e.body;
        }
        if (yt(i)) {
            let n = e;
            if (yt(s)) s = e.querySelector(s);
            if (s instanceof t.Node) n = s;
            i = n.querySelector(i);
        }
        if (i instanceof t.Node) return i;
        if (null == i) {
            if (this.strict) throw mt(`AUR0812`);
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

Portal.inject = [ Ii, fs, ri ];

et([ St({
    primary: true
}) ], Portal.prototype, "target", void 0);

et([ St({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

et([ St() ], Portal.prototype, "strict", void 0);

et([ St() ], Portal.prototype, "deactivating", void 0);

et([ St() ], Portal.prototype, "activating", void 0);

et([ St() ], Portal.prototype, "deactivated", void 0);

et([ St() ], Portal.prototype, "activated", void 0);

et([ St() ], Portal.prototype, "callbackContext", void 0);

Fe("portal")(Portal);

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

If.inject = [ Ii, fs ];

et([ St ], If.prototype, "value", void 0);

et([ St({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Fe("if")(If);

class Else {
    constructor(t) {
        this.f = t;
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw mt(`AUR0810`);
    }
}

Else.inject = [ Ii ];

Fe({
    name: "else"
})(Else);

function Kr(t) {
    t.dispose();
}

const Qr = [ 18, 17 ];

class Repeat {
    constructor(t, e, i, s, n) {
        this.views = [];
        this.key = null;
        this.xi = new Map;
        this.bi = new Map;
        this.wi = void 0;
        this.yi = false;
        this.ki = false;
        this.Ai = null;
        this.Ci = void 0;
        this.Bi = false;
        const r = t.props[0].props[0];
        if (void 0 !== r) {
            const {to: t, value: i, command: s} = r;
            if ("key" === t) if (null === s) this.key = i; else if ("bind" === s) this.key = e.parse(i, 16); else throw mt(`AUR775:${s}`); else throw mt(`AUR776:${t}`);
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
                while (null != t && Qr.includes(t.$kind)) {
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
        this.bi.clear();
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
                const b = s - 1;
                const w = l - 1;
                const y = new Map;
                const k = new Map;
                const A = this.xi;
                const C = this.bi;
                const B = this.$controller.scope;
                f = 0;
                t: {
                    while (true) {
                        m = d[f];
                        g = o[f];
                        p = r ? co(A, n, m, uo(C, d[f], h, B, c, t, u), c) : m;
                        v = r ? co(A, n, g, uo(C, o[f], h, B, c, t, u), c) : g;
                        if (p !== v) {
                            A.set(m, p);
                            A.set(g, v);
                            break;
                        }
                        ++f;
                        if (f > b || f > w) break t;
                    }
                    if (b !== w) break t;
                    x = w;
                    while (true) {
                        m = d[x];
                        g = o[x];
                        p = r ? co(A, n, m, uo(C, m, h, B, c, t, u), c) : m;
                        v = r ? co(A, n, g, uo(C, g, h, B, c, t, u), c) : g;
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
                for (f = S; f <= w; ++f) {
                    if (A.has(g = o[f])) v = A.get(g); else {
                        v = r ? co(A, n, g, uo(C, g, h, B, c, t, u), c) : g;
                        A.set(g, v);
                    }
                    k.set(v, f);
                }
                for (f = R; f <= b; ++f) {
                    if (A.has(m = d[f])) p = A.get(m); else p = r ? co(A, n, m, i[f].scope, c) : m;
                    y.set(p, f);
                    if (k.has(p)) e[k.get(p)] = f; else {
                        e.deletedIndices.push(f);
                        e.deletedItems.push(m);
                    }
                }
                for (f = S; f <= w; ++f) if (!y.has(A.get(o[f]))) e[f] = -2;
                y.clear();
                k.clear();
            }
        }
        if (void 0 === e) {
            const t = g(this.Ei(null), (() => this.Pi(null)));
            if (xt(t)) t.catch(At);
        } else {
            const t = K(e);
            if (t.deletedIndices.length > 0) {
                const e = g(this.Oi(t), (() => this.Di(s, t)));
                if (xt(e)) e.catch(At);
            } else this.Di(s, t);
        }
    }
    Ii() {
        const t = this.$controller.scope;
        let e = this.Ui;
        let i = this.yi;
        let s;
        if (i) {
            e = this.Ui = T(this.Ai, t, this.Si, null) ?? null;
            i = this.yi = !Object.is(this.items, e);
        }
        const n = this.wi;
        if (this.$controller.isActive) {
            s = this.wi = Q(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.wi = void 0;
        }
    }
    Ti() {
        const {items: t} = this;
        if (bt(t)) {
            this.Ci = t;
            return;
        }
        const e = [];
        ro(t, ((t, i) => {
            e[i] = t;
        }));
        this.Ci = e;
    }
    Pi(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: a, bi: c, Si: u, forOf: f, Bi: d} = this;
        const m = r.scope;
        const g = no(a);
        const p = this.views = Array(g);
        ro(a, ((a, v) => {
            s = p[v] = o.create().setLocation(h);
            s.nodes.unlink();
            n = uo(c, a, f, m, u, l, d);
            io(n.overrideContext, v, g);
            i = s.activate(t ?? s, r, 0, n);
            if (xt(i)) (e ?? (e = [])).push(i);
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
            if (xt(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Oi(t) {
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
            if (xt(i)) (e ?? (e = [])).push(i);
        }
        h = 0;
        let a = 0;
        for (;l > h; ++h) {
            a = o[h] - h;
            r.splice(a, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Di(t, e) {
        let i;
        let s;
        let n;
        let r;
        let o = 0;
        const {$controller: l, f: h, local: a, Ci: c, l: u, views: f, Bi: d, Si: m, bi: g, forOf: p} = this;
        const v = e.length;
        for (;v > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== v) throw eo(f.length, v);
        const x = l.scope;
        const b = e.length;
        Y(f, e);
        const w = to(e);
        const y = w.length;
        const k = p.declaration;
        let A;
        let C = y - 1;
        o = b - 1;
        for (;o >= 0; --o) {
            n = f[o];
            A = f[o + 1];
            n.nodes.link(A?.nodes ?? u);
            if (-2 === e[o]) {
                r = uo(g, c[o], p, x, m, a, d);
                io(r.overrideContext, o, b);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (xt(s)) (i ?? (i = [])).push(s);
            } else if (C < 0 || 1 === y || o !== w[C]) {
                if (d) D(k, n.scope, m, c[o]); else n.scope.bindingContext[a] = c[o];
                io(n.scope.overrideContext, o, b);
                n.nodes.insertBefore(n.location);
            } else {
                if (d) D(k, n.scope, m, c[o]); else n.scope.bindingContext[a] = c[o];
                if (t !== b) io(n.scope.overrideContext, o, b);
                --C;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(Kr);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ Zs, q, fs, zi, Ii ];

et([ St ], Repeat.prototype, "items", void 0);

Fe("repeat")(Repeat);

let Yr = 16;

let Zr = new Int32Array(Yr);

let Jr = new Int32Array(Yr);

function to(t) {
    const e = t.length;
    if (e > Yr) {
        Yr = e;
        Zr = new Int32Array(e);
        Jr = new Int32Array(e);
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
            o = Zr[i];
            n = t[o];
            if (-2 !== n && n < s) {
                Jr[r] = o;
                Zr[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                a = l + h >> 1;
                n = t[Zr[a]];
                if (-2 !== n && n < s) l = a + 1; else h = a;
            }
            n = t[Zr[l]];
            if (s < n || -2 === n) {
                if (l > 0) Jr[r] = Zr[l - 1];
                Zr[l] = r;
            }
        }
    }
    r = ++i;
    const c = new Int32Array(r);
    s = Zr[i - 1];
    while (i-- > 0) {
        c[i] = s;
        s = Jr[s];
    }
    while (r-- > 0) Zr[r] = 0;
    return c;
}

const eo = (t, e) => mt(`AUR0814:${t}!=${e}`);

const io = (t, e, i) => {
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

const so = Object.prototype.toString;

const no = t => {
    switch (so.call(t)) {
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
        throw mt(`Cannot count ${so.call(t)}`);
    }
};

const ro = (t, e) => {
    switch (so.call(t)) {
      case "[object Array]":
        return oo(t, e);

      case "[object Map]":
        return lo(t, e);

      case "[object Set]":
        return ho(t, e);

      case "[object Number]":
        return ao(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw mt(`Cannot iterate over ${so.call(t)}`);
    }
};

const oo = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const lo = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const ho = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const ao = (t, e) => {
    let i = 0;
    for (;i < t; ++i) e(i, i, t);
};

const co = (t, e, i, s, n) => {
    let r = t.get(i);
    if (void 0 === r) {
        if ("string" === typeof e) r = i[e]; else r = T(e, s, n, null);
        t.set(i, r);
    }
    return r;
};

const uo = (t, e, i, s, n, r, o) => {
    let l = t.get(e);
    if (void 0 === l) {
        if (o) D(i.declaration, l = _.fromParent(s, new Z), n, e); else l = _.fromParent(s, new Z(r, e));
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
            r = _.fromParent(s.scope, void 0 === t ? {} : t);
            for (l = n.length; l > o; ++o) n[o].bind(r);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const r = _.fromParent(s.scope, void 0 === n ? {} : n);
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

With.inject = [ Ii, fs ];

et([ St ], With.prototype, "value", void 0);

Fe("with")(With);

let fo = class Switch {
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
        this.queue((() => this.$i(t)));
    }
    $i(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.qi(null);
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
        return g(this.qi(null, n), (() => {
            this.activeCases = n;
            return this.Mi(null);
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
        return g(this.activeCases.length > 0 ? this.qi(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Mi(t);
        }));
    }
    Mi(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return m(...i.map((e => e.activate(t, 0, n))));
    }
    qi(t, e = []) {
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

et([ St ], fo.prototype, "value", void 0);

fo = et([ Fe("switch"), it(0, Ii), it(1, fs) ], fo);

let mo = 0;

let go = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this._i = e;
        this.l = i;
        this.id = ++mo;
        this.fallThrough = false;
        this.view = void 0;
        this.Fi = s.config.level <= 1;
        this.Le = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof fo) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw mt(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Le.debug("isMatch()");
        const e = this.value;
        if (bt(e)) {
            if (void 0 === this.wi) this.wi = this.ji(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (bt(t)) {
            this.wi?.unsubscribe(this);
            this.wi = this.ji(t);
        } else if (void 0 !== this.wi) this.wi.unsubscribe(this);
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
        this.wi?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    ji(t) {
        const e = this._i.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

go.inject = [ Ii, M, fs, k ];

et([ St ], go.prototype, "value", void 0);

et([ St({
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
}) ], go.prototype, "fallThrough", void 0);

go = et([ Fe("case") ], go);

let po = class DefaultCase extends go {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw mt(`AUR0816`);
        t.defaultCase = this;
    }
};

po = et([ Fe("default-case") ], po);

let vo = class PromiseTemplateController {
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
        return g(s.activate(t, n, i, this.viewScope = _.fromParent(n.scope, {})), (() => this.swap(t, i)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, e) {
        const i = this.value;
        if (!xt(i)) {
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

et([ St ], vo.prototype, "value", void 0);

vo = et([ Fe("promise"), it(0, Ii), it(1, fs), it(2, ri), it(3, k) ], vo);

let xo = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        yo(t).pending = this;
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

et([ St({
    mode: 2
}) ], xo.prototype, "value", void 0);

xo = et([ Fe("pending"), it(0, Ii), it(1, fs) ], xo);

let bo = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        yo(t).fulfilled = this;
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

et([ St({
    mode: 4
}) ], bo.prototype, "value", void 0);

bo = et([ Fe("then"), it(0, Ii), it(1, fs) ], bo);

let wo = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        yo(t).rejected = this;
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

et([ St({
    mode: 4
}) ], wo.prototype, "value", void 0);

wo = et([ Fe("catch"), it(0, Ii), it(1, fs) ], wo);

function yo(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof vo) return i;
    throw mt(`AUR0813`);
}

let ko = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

ko = et([ Qt({
    pattern: "promise.resolve",
    symbols: ""
}) ], ko);

let Ao = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Ao = et([ Qt({
    pattern: "then",
    symbols: ""
}) ], Ao);

let Co = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Co = et([ Qt({
    pattern: "catch",
    symbols: ""
}) ], Co);

class AuCompose {
    constructor(t, e, i, s, n, r, o) {
        this.c = t;
        this.parent = e;
        this.host = i;
        this.l = s;
        this.p = n;
        this.scopeBehavior = "auto";
        this.Vi = void 0;
        this.r = t.get(Ti);
        this.Ni = r;
        this.Hi = o;
    }
    static get inject() {
        return [ u, zi, cs, fs, ri, Zs, B(CompositionContextFactory) ];
    }
    get pending() {
        return this.Wi;
    }
    get composition() {
        return this.Vi;
    }
    attaching(t, e, i) {
        return this.Wi = g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Hi.isCurrent(t)) this.Wi = void 0;
        }));
    }
    detaching(t) {
        const e = this.Vi;
        const i = this.Wi;
        this.Hi.invalidate();
        this.Vi = this.Wi = void 0;
        return g(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Vi) {
            this.Vi.update(this.model);
            return;
        }
        this.Wi = g(this.Wi, (() => g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Hi.isCurrent(t)) this.Wi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Hi;
        const s = this.Vi;
        return g(i.create(t), (t => {
            if (i.isCurrent(t)) return g(this.compose(t), (n => {
                if (i.isCurrent(t)) return g(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Vi = n;
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
            if (u.containerless) throw mt(`AUR0806`);
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
                    projections: this.Ni.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, a, 1, a.scope.parent)), (t => g(n.deactivate(t ?? n, a, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Hs.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, a);
                const l = "auto" === this.scopeBehavior ? _.fromParent(this.parent.scope, e) : _.create(e);
                if (vs(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, a, 1, l)), (t => o.deactivate(t ?? o, a, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return g(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = vs(i);
        Vt(t, s.Element, Vt(t, cs, new d("ElementResolver", n ? null : i)));
        Vt(t, fs, new d("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        Vt(t, e, new d("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = wt(t) ? t : t?.constructor;
        return Hs.isType(e) ? Hs.getDefinition(e) : null;
    }
}

et([ St ], AuCompose.prototype, "view", void 0);

et([ St ], AuCompose.prototype, "viewModel", void 0);

et([ St ], AuCompose.prototype, "model", void 0);

et([ St({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw mt(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

ys("au-compose")(AuCompose);

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
        if (xt(this.view) || xt(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        if (0 !== this.state) throw mt(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw mt(`AUR0808`);

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
        return [ fs, Zs, Gi, Ti ];
    }
    binding(t, e, i) {
        this.zi = this.$controller.scope.parent;
        let s;
        if (this.Xi) {
            s = this.Ki.controller.scope.parent;
            (this.Gi = _.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.zi.bindingContext;
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

et([ St ], AuSlot.prototype, "expose", void 0);

ys({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Bo = qt("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw mt('"sanitize" method not implemented');
    }
})));

let Ro = class SanitizeValueConverter {
    constructor(t) {
        this.Qi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Qi.sanitize(t);
    }
};

Ro = et([ it(0, Bo) ], Ro);

ge("sanitize")(Ro);

const So = DebounceBindingBehavior;

const Io = OneTimeBindingBehavior;

const To = ToViewBindingBehavior;

const Po = FromViewBindingBehavior;

const Eo = SignalBindingBehavior;

const Lo = ThrottleBindingBehavior;

const Oo = TwoWayBindingBehavior;

const Do = TemplateCompiler;

const Uo = NodeObserverLocator;

const $o = [ Do, Uo ];

const qo = SVGAnalyzer;

const Mo = ne;

const _o = se;

const Fo = ie;

const jo = ee;

const Vo = re;

const No = [ Fo, jo, Vo ];

const Ho = [ Mo, _o ];

const Wo = Wn;

const zo = zn;

const Go = Nn;

const Xo = jn;

const Ko = Vn;

const Qo = Hn;

const Yo = Zn;

const Zo = Gn;

const Jo = Xn;

const tl = Kn;

const el = Yn;

const il = Qn;

const sl = Jn;

const nl = [ Wo, Xo, Go, Ko, Qo, zo, Yo, Zo, Jo, el, il, tl, sl ];

const rl = Ro;

const ol = If;

const ll = Else;

const hl = Repeat;

const al = With;

const cl = fo;

const ul = go;

const fl = po;

const dl = vo;

const ml = xo;

const gl = bo;

const pl = wo;

const vl = ko;

const xl = Ao;

const bl = Co;

const wl = AttrBindingBehavior;

const yl = SelfBindingBehavior;

const kl = UpdateTriggerBindingBehavior;

const Al = AuCompose;

const Cl = Portal;

const Bl = Focus;

const Rl = Xr;

const Sl = [ So, Io, To, Po, Eo, Lo, Oo, rl, ol, ll, hl, al, cl, ul, fl, dl, ml, gl, pl, vl, xl, bl, wl, yl, kl, Al, Cl, Bl, Rl, AuSlot ];

const Il = an;

const Tl = hn;

const Pl = dn;

const El = gn;

const Ll = un;

const Ol = mn;

const Dl = fn;

const Ul = ln;

const $l = cn;

const ql = vn;

const Ml = kn;

const _l = xn;

const Fl = bn;

const jl = wn;

const Vl = yn;

const Nl = pn;

const Hl = An;

const Wl = [ Ol, El, Dl, Pl, Ul, Tl, Il, $l, Ll, ql, Ml, _l, Fl, jl, Vl, Nl, Hl ];

const zl = Gl(n);

function Gl(t) {
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
            return e.register(Ft(F, i.coercingOptions), ...$o, ...Sl, ...No, ...nl, ...Wl);
        },
        customize(e) {
            return Gl(e ?? t);
        }
    };
}

const Xl = qt("IAurelia");

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
        if (t.has(Xl, true)) throw mt(`AUR0768`);
        Vt(t, Xl, new d("IAurelia", this));
        Vt(t, ls, this.ss = new d("IAppRoot"));
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
            if (null == this.next) throw mt(`AUR0767`);
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
        if (wt(r)) {
            Vt(i, n.HTMLElement, Vt(i, n.Element, Vt(i, cs, new d("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        Vt(i, us, new d("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: Us(),
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
        if (!this.container.has(ri, false)) {
            if (null === t.ownerDocument.defaultView) throw mt(`AUR0769`);
            e = new tt(t.ownerDocument.defaultView);
            this.container.register(Ft(ri, e));
        } else e = this.container.get(ri);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw mt(`AUR0770`);
        if (xt(this.ts)) return this.ts;
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
        if (xt(this.es)) return this.es;
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
        if (this.ir || this.Zi) throw mt(`AUR0771`);
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

var Kl;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(Kl || (Kl = {}));

var Ql;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(Ql || (Ql = {}));

export { AdoptedStyleSheetsStyles, AppRoot, Oe as AppTask, ne as AtPrefixedTriggerAttributePattern, Mo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, wl as AttrBindingBehaviorRegistration, Kn as AttrBindingCommand, tl as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, Ml as AttributeBindingRendererRegistration, AttributeNSAccessor, te as AttributePattern, AuCompose, AuSlot, AuSlotsInfo, Aurelia, Pt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, me as BindingBehavior, BindingBehaviorDefinition, Fn as BindingCommand, BindingCommandDefinition, Kl as BindingMode, BindingModeBehavior, BindingTargetSubscriber, CSSModulesProcessorRegistry, Xn as CaptureBindingCommand, Jo as CaptureBindingCommandRegistration, go as Case, CheckedObserver, Ze as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, Yn as ClassBindingCommand, el as ClassBindingCommandRegistration, se as ColonPrefixedBindAttributePattern, _o as ColonPrefixedBindAttributePatternRegistration, Un as CommandType, ComputedWatcher, ContentBinding, Controller, Xe as CustomAttribute, CustomAttributeDefinition, Il as CustomAttributeRendererRegistration, Hs as CustomElement, CustomElementDefinition, Tl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, So as DebounceBindingBehaviorRegistration, Wn as DefaultBindingCommand, Wo as DefaultBindingCommandRegistration, nl as DefaultBindingLanguage, No as DefaultBindingSyntax, po as DefaultCase, $o as DefaultComponents, Wl as DefaultRenderers, Sl as DefaultResources, Ql as DefinitionType, ee as DotSeparatedAttributePattern, jo as DotSeparatedAttributePatternRegistration, Else, ll as ElseRegistration, ExpressionWatcher, FlushQueue, Focus, zn as ForBindingCommand, zo as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Po as FromViewBindingBehaviorRegistration, Nn as FromViewBindingCommand, Go as FromViewBindingCommandRegistration, bo as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, ls as IAppRoot, Le as IAppTask, ir as IAttrMapper, Kt as IAttributeParser, Xt as IAttributePattern, Qs as IAuSlotsInfo, Xl as IAurelia, zi as IController, us as IEventTarget, ke as IFlushQueue, ws as IHistory, Gi as IHydrationContext, Zs as IInstruction, Ai as ILifecycleHooks, bs as ILocation, cs as INode, Uo as INodeObserverLocatorRegistration, ri as IPlatform, Ks as IProjections, fs as IRenderLocation, en as IRenderer, Ti as IRendering, tr as ISVGAnalyzer, Bo as ISanitizer, vi as IShadowDOMGlobalStyles, pi as IShadowDOMStyles, Wt as ISyntaxInterpreter, tn as ITemplateCompiler, br as ITemplateCompilerHooks, Do as ITemplateCompilerRegistration, rr as ITemplateElementFactory, Ii as IViewFactory, xs as IWindow, If, ol as IfRegistration, Ys as InstructionType, InterpolationBinding, Pl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, El as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Ll as LetElementRendererRegistration, Pi as LifecycleFlags, Ri as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, ListenerBinding, ListenerBindingInstruction, ListenerBindingOptions, ql as ListenerBindingRendererRegistration, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, Io as OneTimeBindingBehaviorRegistration, jn as OneTimeBindingCommand, Xo as OneTimeBindingCommandRegistration, xo as PendingTemplateController, Portal, vo as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Ol as PropertyBindingRendererRegistration, ie as RefAttributePattern, Fo as RefAttributePatternRegistration, RefBinding, Yo as RefBindingCommandRegistration, RefBindingInstruction, Dl as RefBindingRendererRegistration, wo as RejectedTemplateController, Rendering, Repeat, hl as RepeatRegistration, SVGAnalyzer, qo as SVGAnalyzerRegistration, Ro as SanitizeValueConverter, rl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, yl as SelfBindingBehaviorRegistration, SetAttributeInstruction, _l as SetAttributeRendererRegistration, SetClassAttributeInstruction, Fl as SetClassAttributeRendererRegistration, SetPropertyInstruction, Ul as SetPropertyRendererRegistration, SetStyleAttributeInstruction, jl as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, Ho as ShortHandBindingSyntax, SignalBindingBehavior, Eo as SignalBindingBehaviorRegistration, zl as StandardConfiguration, Hi as State, StyleAttributeAccessor, Qn as StyleBindingCommand, il as StyleBindingCommandRegistration, xi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, Vl as StylePropertyBindingRendererRegistration, fo as Switch, TemplateCompiler, kr as TemplateCompilerHooks, $l as TemplateControllerRendererRegistration, TextBindingInstruction, Nl as TextBindingRendererRegistration, ThrottleBindingBehavior, Lo as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, To as ToViewBindingBehaviorRegistration, Vn as ToViewBindingCommand, Ko as ToViewBindingCommandRegistration, Gn as TriggerBindingCommand, Zo as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Oo as TwoWayBindingBehaviorRegistration, Hn as TwoWayBindingCommand, Qo as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, kl as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, xe as ValueConverter, ValueConverterDefinition, ViewFactory, Ni as ViewModelKind, Me as Watch, With, al as WithRegistration, Nt as alias, $t as allResources, Qt as attributePattern, St as bindable, ue as bindingBehavior, $n as bindingCommand, Xs as capture, Ke as children, Et as coercer, As as containerless, ps as convertToRenderLocation, di as cssModules, _e as customAttribute, ys as customElement, ms as getEffectiveParentNode, hs as getRef, Fi as isCustomElementController, ji as isCustomElementViewModel, Js as isInstruction, vs as isRenderLocation, Si as lifecycleHooks, we as mixinAstEvaluator, be as mixinUseScope, Be as mixingBindingLimited, zs as processContent, Ht as registerAliases, sn as renderer, gs as setEffectiveParentNode, as as setRef, mi as shadowCSS, Bs as strict, Ar as templateCompilerHooks, Fe as templateController, ks as useShadowDOM, ge as valueConverter, Ue as watch };
//# sourceMappingURL=index.mjs.map
