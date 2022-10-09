import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as c, IPlatform as a, IContainer as u, optional as f, InstanceProvider as d, resolveAll as m, onResolve as g, fromDefinitionOrDefault as p, pascalCase as v, fromAnnotationOrTypeOrDefault as w, fromAnnotationOrDefinitionOrTypeOrDefault as b, camelCase as x, toArray as y, ILogger as k, emptyObject as A, IServiceLocator as C, transient as R } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as B, isObject as S } from "../../../metadata/dist/native-modules/index.mjs";

import { subscriberCollection as I, astEvaluate as T, ISignaler as D, connectable as E, astBind as P, astUnbind as L, astAssign as O, ConnectableSwitcher as $, ProxyObservable as U, Scope as _, ICoercionConfiguration as q, IObserverLocator as M, IExpressionParser as j, AccessScopeExpression as F, PrimitiveLiteralExpression as V, PropertyAccessor as N, INodeObserverLocator as H, getObserverLookup as W, SetterObserver as z, IDirtyChecker as G, createIndexMap as X, applyMutationsToIndices as K, getCollectionObserver as Q, synchronizeIndices as Y, BindingContext as Z } from "../../../runtime/dist/native-modules/index.mjs";

import { TaskAbortError as J } from "../../../platform/dist/native-modules/index.mjs";

import { BrowserPlatform as tt } from "../../../platform-browser/dist/native-modules/index.mjs";

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

const st = B.getOwn;

const nt = B.hasOwn;

const rt = B.define;

const {annotation: ot, resource: lt} = t;

const ht = ot.keyFor;

const ct = lt.keyFor;

const at = lt.appendTo;

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

const wt = t => t instanceof Promise;

const bt = t => t instanceof Array;

const xt = t => "function" === typeof t;

const yt = t => "string" === typeof t;

const kt = Object.defineProperty;

const At = t => {
    throw t;
};

const Ct = Object.is;

const Rt = Reflect.defineProperty;

const Bt = (t, e, i) => {
    Rt(t, e, {
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
        ut(t.constructor, Dt.keyFrom(e));
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
                if (!nt(Tt, t, n)) ut(t, Dt.keyFrom(n));
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
        let c;
        let a;
        while (--r >= 0) {
            c = n[r];
            l = ft(c).filter(It);
            h = l.length;
            for (a = 0; a < h; ++a) s[o++] = st(Tt, c, l[a].slice(i));
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
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Lt(t, e, n)));
    }
}

function Et(t, e, i) {
    Pt.define(t, e);
}

const Pt = {
    key: ht("coercer"),
    define(t, e) {
        rt(Pt.key, t[e].bind(t), t);
    },
    for(t) {
        return st(Pt.key, t);
    }
};

function Lt(t, e, i = {}) {
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
            r = "function" === typeof t ? t.bind(s) : Pt.for(s) ?? n;
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
        const c = this.i = xt(l);
        const a = this.u = xt(h);
        const u = this.hs = s !== n;
        let f;
        this.o = t;
        this.k = e;
        this.A = a ? h : n;
        this.cb = c ? l : n;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
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

const $t = function(t) {
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

const Ut = function(t) {
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

const _t = r.createInterface;

const qt = o.singleton;

const Mt = o.aliasTo;

const jt = o.instance;

const Ft = o.callback;

const Vt = o.transient;

const Nt = (t, e, i) => t.registerResolver(e, i);

function Ht(...t) {
    return function(e) {
        const i = ht("aliases");
        const s = st(i, e);
        if (void 0 === s) rt(i, t, e); else s.push(...t);
    };
}

function Wt(t, e, i, s) {
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
    B(t) {
        return this.chars !== t;
    }
    R(t) {
        return true;
    }
}

class Interpretation {
    constructor() {
        this.parts = l;
        this.O = "";
        this.$ = {};
        this.U = {};
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
            this.parts = this.U[t];
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
            i = this.U;
            if (void 0 === i[t]) i[t] = [ e[t] ]; else i[t].push(e[t]);
            e[t] = void 0;
        }
    }
}

class AttrParsingState {
    constructor(t, ...e) {
        this.charSpec = t;
        this._ = [];
        this.q = null;
        this.M = false;
        this.j = e;
    }
    get O() {
        return this.M ? this.j[0] : null;
    }
    findChild(t) {
        const e = this._;
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
        const i = this.j;
        if (!i.includes(e)) i.push(e);
        let s = this.findChild(t);
        if (null == s) {
            s = new AttrParsingState(t, e);
            this._.push(s);
            if (t.repeat) s._.push(s);
        }
        return s;
    }
    findMatches(t, e) {
        const i = [];
        const s = this._;
        const n = s.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = s[l];
            if (o.charSpec.has(t)) {
                i.push(o);
                r = o.j.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.j[h]); else for (;h < r; ++h) e.append(o.j[h], t);
            }
        }
        return i;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.F = t.length;
        const i = this.V = [];
        let s = 0;
        for (;e > s; ++s) i.push(new CharSpec(t[s], false, false, false));
    }
    eachChar(t) {
        const e = this.F;
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

const zt = _t("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        let c = 0;
        let a;
        while (e > c) {
            i = this.H;
            s = t[c];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.G(s, r);
            l = o.length;
            h = t => i = i.append(t, n);
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            i.q = r;
            i.M = true;
            ++c;
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
        s = s.filter(Gt);
        if (s.length > 0) {
            s.sort(Xt);
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

function Gt(t) {
    return t.M;
}

function Xt(t, e) {
    const i = t.q;
    const s = e.q;
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

const Kt = _t("IAttributePattern");

const Qt = _t("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.K = {};
        this.Y = t;
        const i = this.j = {};
        const s = e.reduce(((t, e) => {
            const s = te(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), l);
        t.add(s);
    }
    parse(t, e) {
        let i = this.K[t];
        if (null == i) i = this.K[t] = this.Y.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.j[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ zt, h(Kt) ];

function Yt(...t) {
    return function e(i) {
        return ee.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        qt(Kt, this.Type).register(t);
    }
}

const Zt = ct("attribute-pattern");

const Jt = "attribute-pattern-definitions";

const te = e => t.annotation.get(e, Jt);

const ee = Object.freeze({
    name: Zt,
    definitionAnnotationKey: Jt,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        rt(Zt, s, i);
        at(i, Zt);
        t.annotation.set(i, Jt, e);
        ut(i, Jt);
        return i;
    },
    getPatternDefinitions: te
});

let ie = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, `${i[0]}.${i[1]}`, i[2]);
    }
};

ie = et([ Yt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], ie);

let se = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

se = et([ Yt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], se);

let ne = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

ne = et([ Yt({
    pattern: ":PART",
    symbols: ":"
}) ], ne);

let re = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

re = et([ Yt({
    pattern: "@PART",
    symbols: "@"
}) ], re);

let oe = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

oe = et([ Yt({
    pattern: "...$attrs",
    symbols: ""
}) ], oe);

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
            le(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) he(this.o, this);
    }
    it() {
        ue = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ue);
    }
}

I(AttributeObserver);

const le = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(ce)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const he = (t, e) => {
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

const ce = t => {
    t[0].target.$eMObs.forEach(ae, t);
};

function ae(t) {
    t.handleMutation(this);
}

let ue;

function fe(t) {
    return function(e) {
        return ge.define(t, e);
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
        return new BindingBehaviorDefinition(e, i(me(e, "name"), s), c(me(e, "aliases"), n.aliases, e.aliases), ge.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        qt(i, e).register(t);
        Mt(i, e).register(t);
        Wt(s, ge, i, t);
    }
}

const de = ct("binding-behavior");

const me = (t, e) => st(ht(e), t);

const ge = Object.freeze({
    name: de,
    keyFrom(t) {
        return `${de}:${t}`;
    },
    isType(t) {
        return xt(t) && nt(de, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        rt(de, i, i.Type);
        rt(de, i, i);
        at(e, de);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(de, t);
        if (void 0 === e) throw mt(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: me
});

function pe(t) {
    return function(e) {
        return be.define(t, e);
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
        return new ValueConverterDefinition(e, i(we(e, "name"), s), c(we(e, "aliases"), n.aliases, e.aliases), be.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Wt(s, be, i, t);
    }
}

const ve = ct("value-converter");

const we = (t, e) => st(ht(e), t);

const be = Object.freeze({
    name: ve,
    keyFrom: t => `${ve}:${t}`,
    isType(t) {
        return xt(t) && nt(ve, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        rt(ve, i, i.Type);
        rt(ve, i, i);
        at(e, ve);
        return i.Type;
    },
    getDefinition(t) {
        const e = st(ve, t);
        if (void 0 === e) throw mt(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: we
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
        if (t !== T(i.ast, i.scope, i, null)) {
            this.v = t;
            this.st.add(this);
        }
    }
}

const xe = t => {
    Bt(t.prototype, "useScope", (function(t) {
        this.scope = t;
    }));
};

const ye = (t, e = true) => i => {
    const s = i.prototype;
    if (null != t) Rt(s, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    Rt(s, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    Bt(s, "get", (function(t) {
        return this.l.get(t);
    }));
    Bt(s, "getSignaler", (function() {
        return this.l.root.get(D);
    }));
    Bt(s, "getConverter", (function(t) {
        const e = be.keyFrom(t);
        let i = ke.get(this);
        if (null == i) ke.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get($t(e)));
    }));
    Bt(s, "getBehavior", (function(t) {
        const e = ge.keyFrom(t);
        let i = ke.get(this);
        if (null == i) ke.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get($t(e)));
    }));
};

const ke = new WeakMap;

class ResourceLookup {}

const Ae = _t("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.rt.forEach(Ce);
        } finally {
            this.nt = false;
        }
    }
    clear() {
        this.rt.clear();
        this.nt = false;
    }
}

function Ce(t, e, i) {
    i.delete(t);
    t.flush();
}

const Re = new WeakSet;

const Be = (t, e) => {
    Bt(t.prototype, "limit", (function(t) {
        if (Re.has(this)) throw mt(`AURXXXX: a rate limit has already been applied.`);
        Re.add(this);
        const i = e(this, t);
        const s = this[i];
        const n = (...t) => s.call(this, ...t);
        const r = "debounce" === t.type ? Se(t, n, this) : Ie(t, n, this);
        this[i] = r;
        return {
            dispose: () => {
                Re.delete(this);
                r.dispose();
                delete this[i];
            }
        };
    }));
};

const Se = (t, e, i) => {
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

const Ie = (t, e, i) => {
    let s;
    let n;
    let r = 0;
    let o = 0;
    let l;
    const h = t.queue;
    const c = () => t.now();
    const a = a => {
        l = a;
        if (i.isBound) {
            o = c() - r;
            n = s;
            if (o > t.delay) {
                r = c();
                e(l);
            } else s = h.queueTask((() => {
                r = c();
                e(l);
            }), {
                delay: t.delay - o,
                reusable: false
            });
            n?.cancel();
        } else e(l);
    };
    a.dispose = () => {
        n?.cancel();
        s?.cancel();
    };
    return a;
};

const Te = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, i, s, n, r, o, l, h) {
        this.targetAttribute = o;
        this.targetProperty = l;
        this.mode = h;
        this.isBound = false;
        this.scope = void 0;
        this.task = null;
        this.v = void 0;
        this.boundFn = false;
        this.l = e;
        this.ast = n;
        this.ot = t;
        this.target = r;
        this.oL = i;
        this.lt = s;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.ot.state && (4 & this.targetObserver.type) > 0;
        const e = (2 & this.mode) > 0;
        let i;
        if (e) this.obs.version++;
        const s = T(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (s !== this.v) {
            this.v = s;
            if (t) {
                i = this.task;
                this.task = this.lt.queueTask((() => {
                    this.task = null;
                    this.updateTarget(s);
                }), Te);
                i?.cancel();
            } else this.updateTarget(s);
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        P(this.ast, t, this);
        this.targetObserver ?? (this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = T(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        L(this.ast, this.scope, this);
        this.scope = void 0;
        this.v = void 0;
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
    }
}

xe(AttributeBinding);

Be(AttributeBinding, (() => "updateTarget"));

E(AttributeBinding);

ye(true)(AttributeBinding);

const De = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.taskQueue = s;
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.scope = void 0;
        this.task = null;
        this.ot = t;
        this.oL = i;
        this.targetObserver = i.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, i, this);
    }
    ht() {
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
        const r = this.targetObserver;
        const o = 1 !== this.ot.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(s, this.target, this.targetProperty);
            }), De);
            l?.cancel();
            l = null;
        } else r.setValue(s, this.target, this.targetProperty);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
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
        this.scope = void 0;
        const t = this.partBindings;
        const e = t.length;
        let i = 0;
        for (;e > i; ++i) t[i].unbind();
        this.task?.cancel();
        this.task = null;
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
        this.owner.ht();
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.obs;
        let e = false;
        e = (2 & this.mode) > 0;
        if (e) t.version++;
        const i = T(this.ast, this.scope, this, e ? this : null);
        if (e) t.clear();
        if (i != this.v) {
            this.v = i;
            if (bt(i)) this.observeCollection(i);
            this.updateTarget();
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        P(this.ast, t, this);
        this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (bt(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        L(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

xe(InterpolationPartBinding);

Be(InterpolationPartBinding, (() => "updateTarget"));

E(InterpolationPartBinding);

ye(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.taskQueue = s;
        this.p = n;
        this.ast = r;
        this.target = o;
        this.strict = l;
        this.mode = 2;
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.l = e;
        this.ot = t;
        this.oL = i;
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
        const t = (2 & this.mode) > 0;
        if (t) this.obs.version++;
        const e = T(this.ast, this.scope, this, t ? this : null);
        if (t) this.obs.clear();
        if (e === this.v) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const i = 1 !== this.ot.state;
        if (i) this.ct(e); else this.updateTarget(e);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (bt(t)) this.observeCollection(t);
        const e = 1 !== this.ot.state;
        if (e) this.ct(t); else this.updateTarget(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        P(this.ast, t, this);
        const e = this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (bt(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        L(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
        this.task?.cancel();
        this.task = null;
    }
    ct(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t);
        }), De);
        e?.cancel();
    }
}

xe(ContentBinding);

Be(ContentBinding, (() => "updateTarget"));

E()(ContentBinding);

ye(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, i, s, n = false) {
        this.ast = i;
        this.targetProperty = s;
        this.isBound = false;
        this.scope = void 0;
        this.target = null;
        this.boundFn = false;
        this.l = t;
        this.oL = e;
        this.ut = n;
    }
    updateTarget() {
        this.target[this.targetProperty] = this.v;
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        if ((Ee = T(this.ast, this.scope, this, this)) !== this.v) this.v = Ee;
        this.obs.clear();
        this.updateTarget();
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        this.target = this.ut ? t.bindingContext : t.overrideContext;
        P(this.ast, t, this);
        this.v = T(this.ast, this.scope, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        L(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

xe(LetBinding);

Be(LetBinding, (() => "updateTarget"));

E(LetBinding);

ye(true)(LetBinding);

let Ee;

class PropertyBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.scope = void 0;
        this.ft = void 0;
        this.dt = null;
        this.gt = null;
        this.boundFn = false;
        this.l = e;
        this.ot = t;
        this.lt = s;
        this.oL = i;
    }
    updateTarget(t) {
        this.ft.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        O(this.ast, this.scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.ot.state && (4 & this.ft.type) > 0;
        const e = (2 & this.mode) > 0;
        if (e) this.obs.version++;
        const i = T(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (t) {
            Pe = this.dt;
            this.dt = this.lt.queueTask((() => {
                this.updateTarget(i);
                this.dt = null;
            }), Le);
            Pe?.cancel();
            Pe = null;
        } else this.updateTarget(i);
    }
    handleCollectionChange() {
        this.handleChange();
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        P(this.ast, t, this);
        const e = this.oL;
        const i = this.mode;
        let s = this.ft;
        if (!s) {
            if (4 & i) s = e.getObserver(this.target, this.targetProperty); else s = e.getAccessor(this.target, this.targetProperty);
            this.ft = s;
        }
        const n = (2 & i) > 0;
        if (i & (2 | 1)) this.updateTarget(T(this.ast, this.scope, this, n ? this : null));
        if (4 & i) {
            s.subscribe(this.gt ?? (this.gt = new BindingTargetSubscriber(this, this.l.get(Ae))));
            if (!n) this.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        L(this.ast, this.scope, this);
        this.scope = void 0;
        if (this.gt) {
            this.ft.unsubscribe(this.gt);
            this.gt = null;
        }
        this.dt?.cancel();
        this.dt = null;
        this.obs.clearAll();
    }
    useTargetObserver(t) {
        this.ft?.unsubscribe(this);
        (this.ft = t).subscribe(this);
    }
    useTargetSubscriber(t) {
        if (null != this.gt) throw mt(`AURxxxx: binding already has a target subscriber`);
        this.gt = t;
    }
}

xe(PropertyBinding);

Be(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

E(PropertyBinding);

ye(true, false)(PropertyBinding);

let Pe = null;

const Le = {
    reusable: false,
    preempt: true
};

class RefBinding {
    constructor(t, e, i) {
        this.ast = e;
        this.target = i;
        this.isBound = false;
        this.scope = void 0;
        this.l = t;
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        P(this.ast, t, this);
        O(this.ast, this.scope, this, this.target);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (T(this.ast, this.scope, this, null) === this.target) O(this.ast, this.scope, this, null);
        L(this.ast, this.scope, this);
        this.scope = void 0;
    }
}

ye(false)(RefBinding);

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
        this.boundFn = true;
        this.l = t;
        this.vt = n;
    }
    callSource(t) {
        const e = this.scope.overrideContext;
        e.$event = t;
        let i = T(this.ast, this.scope, this, null);
        delete e.$event;
        if (xt(i)) i = i(t);
        if (true !== i && this.vt.prevent) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        this.callSource(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        P(this.ast, t, this);
        this.target.addEventListener(this.targetEvent, this, this.vt);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        L(this.ast, this.scope, this);
        this.scope = void 0;
        this.target.removeEventListener(this.targetEvent, this, this.vt);
    }
}

xe(ListenerBinding);

Be(ListenerBinding, (() => "callSource"));

ye(true, true)(ListenerBinding);

const Oe = _t("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(jt(Oe, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const $e = Object.freeze({
    creating: Ue("creating"),
    hydrating: Ue("hydrating"),
    hydrated: Ue("hydrated"),
    activating: Ue("activating"),
    activated: Ue("activated"),
    deactivating: Ue("deactivating"),
    deactivated: Ue("deactivated")
});

function Ue(t) {
    function e(e, i) {
        if (xt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function _e(t, e) {
    if (null == t) throw mt(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!xt(e) && (null == e || !(e in l.prototype))) throw mt(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!xt(r?.value)) throw mt(`AUR0774:${String(n)}`);
        je.add(l, h);
        if (ze(l)) Ke(l).watches.push(h);
        if (Gs(l)) Qs(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const qe = l;

const Me = ht("watch");

const je = Object.freeze({
    name: Me,
    add(t, e) {
        let i = st(Me, t);
        if (null == i) rt(Me, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return st(Me, t) ?? qe;
    }
});

function Fe(t) {
    return function(e) {
        return Xe(t, e);
    };
}

function Ve(t) {
    return function(e) {
        return Xe(yt(t) ? {
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
        return new CustomAttributeDefinition(e, i(We(e, "name"), s), c(We(e, "aliases"), n.aliases, e.aliases), He(s), i(We(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(We(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Dt.from(e, ...Dt.getAll(e), We(e, "bindables"), e.bindables, n.bindables), i(We(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), c(je.getAnnotation(e), e.watches), c(We(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Vt(i, e).register(t);
        Mt(i, e).register(t);
        Wt(s, Qe, i, t);
    }
}

const Ne = ct("custom-attribute");

const He = t => `${Ne}:${t}`;

const We = (t, e) => st(ht(e), t);

const ze = t => xt(t) && nt(Ne, t);

const Ge = (t, e) => vs(t, He(e)) ?? void 0;

const Xe = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    rt(Ne, i, i.Type);
    rt(Ne, i, i);
    at(e, Ne);
    return i.Type;
};

const Ke = t => {
    const e = st(Ne, t);
    if (void 0 === e) throw mt(`AUR0759:${t.name}`);
    return e;
};

const Qe = Object.freeze({
    name: Ne,
    keyFrom: He,
    isType: ze,
    for: Ge,
    define: Xe,
    getDefinition: Ke,
    annotate(t, e, i) {
        rt(ht(e), i, t);
    },
    getAnnotation: We
});

function Ye(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        rt(Je, ChildrenDefinition.create(e, i), t.constructor, e);
        ut(t.constructor, ti.keyFrom(e));
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

function Ze(t) {
    return t.startsWith(Je);
}

const Je = ht("children-observer");

const ti = Object.freeze({
    name: Je,
    keyFrom: t => `${Je}:${t}`,
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
        const i = Je.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        while (--r >= 0) {
            c = n[r];
            l = ft(c).filter(Ze);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = st(Je, c, l[t].slice(i));
        }
        return s;
    }
});

const ei = {
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? ei, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = ii, r = si, o = ni, l) {
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
                this.wt();
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
    wt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return oi(this.controller, this.query, this.filter, this.map);
    }
}

I()(ChildrenObserver);

function ii(t) {
    return t.host.childNodes;
}

function si(t, e, i) {
    return !!i;
}

function ni(t, e, i) {
    return i;
}

const ri = {
    optional: true
};

function oi(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Xs(l, ri);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

const li = a;

const hi = (t, e, i, s) => {
    t.addEventListener(e, i, s);
};

const ci = (t, e, i, s) => {
    t.removeEventListener(e, i, s);
};

const ai = t => {
    const e = t.prototype;
    Bt(e, "subscribe", (function(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            for (ui of this.bt.events) hi(this.xt, ui, this);
            this.yt = true;
            this.kt?.();
        }
    }));
    Bt(e, "unsubscribe", (function(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            for (ui of this.bt.events) ci(this.xt, ui, this);
            this.yt = false;
            this.At?.();
        }
    }));
    Bt(e, "useConfig", (function(t) {
        this.bt = t;
        if (this.yt) {
            for (ui of this.bt.events) ci(this.xt, ui, this);
            for (ui of this.bt.events) hi(this.xt, ui, this);
        }
    }));
};

let ui;

const fi = t => {
    Bt(t.prototype, "subscribe", n);
    Bt(t.prototype, "unsubscribe", n);
};

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.Ct = {};
        this.Rt = 0;
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
            const i = di(t);
            let s = this.Rt;
            this.ov = t;
            if (i.length > 0) this.Bt(i);
            this.Rt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!gt.call(e, t) || e[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    Bt(t) {
        const e = this.obj;
        const i = t.length;
        let s = 0;
        let n;
        for (;s < i; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.Ct[n] = this.Rt;
            e.classList.add(n);
        }
    }
}

function di(t) {
    if (yt(t)) return mi(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...di(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...mi(i)); else e.push(i);
    return e;
}

function mi(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

fi(ClassAttributeAccessor);

function gi(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Xe({
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
                this.element.className = di(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ bs ], e));
        t.register(s);
    }
}

function pi(...t) {
    return new ShadowDOMRegistry(t);
}

const vi = _t("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(li))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(bi);
        const i = t.get(vi);
        t.register(jt(wi, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ li ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ li ];

const wi = _t("IShadowDOMStyles");

const bi = _t("IShadowDOMGlobalStyles", (t => t.instance({
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
        return $e.creating(u, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(vi);
                e.register(jt(bi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: yi, exit: ki} = $;

const {wrap: Ai, unwrap: Ci} = U;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.$get = i;
        this.useProxy = n;
        this.value = void 0;
        this.isBound = false;
        this.running = false;
        this.cb = s;
        this.oL = e;
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
        const e = this.value;
        const i = this.compute();
        if (!Ct(i, e)) this.cb.call(t, i, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            yi(this);
            return this.value = Ci(this.$get.call(void 0, this.useProxy ? Ai(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ki(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, i, s, n) {
        this.scope = t;
        this.l = e;
        this.oL = i;
        this.expression = s;
        this.callback = n;
        this.isBound = false;
        this.boundFn = false;
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const e = this.expression;
        const i = this.obj;
        const s = this.value;
        const n = 1 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = T(e, this.scope, this, this);
            this.obs.clear();
        }
        if (!Ct(t, s)) {
            this.value = t;
            this.callback.call(i, t, s, i);
        }
    }
    bind() {
        if (this.isBound) return;
        this.obs.version++;
        this.value = T(this.expression, this.scope, this, this);
        this.obs.clear();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
        this.value = void 0;
    }
}

E(ComputedWatcher);

E(ExpressionWatcher);

ye(true)(ExpressionWatcher);

const Ri = _t("ILifecycleHooks");

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
        qt(Ri, this.Type).register(t);
    }
}

const Bi = new WeakMap;

const Si = ht("lifecycle-hooks");

const Ii = Object.freeze({
    name: Si,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        rt(Si, i, e);
        at(e, Si);
        return i.Type;
    },
    resolve(t) {
        let e = Bi.get(t);
        if (void 0 === e) {
            Bi.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Ri) : t.has(Ri, false) ? i.getAll(Ri).concat(t.getAll(Ri)) : i.getAll(Ri);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = st(Si, n.constructor);
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

function Ti() {
    return function t(e) {
        return Ii.define({}, e);
    };
}

const Di = _t("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (yt(t)) t = parseInt(t, 10);
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

const Ei = new WeakSet;

function Pi(t) {
    return !Ei.has(t);
}

function Li(t) {
    Ei.add(t);
    return CustomElementDefinition.create(t);
}

const Oi = ct("views");

const $i = Object.freeze({
    name: Oi,
    has(t) {
        return xt(t) && (nt(Oi, t) || "$views" in t);
    },
    get(t) {
        if (xt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Pi).map(Li);
            for (const e of i) $i.add(t, e);
        }
        let e = st(Oi, t);
        if (void 0 === e) rt(Oi, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = st(Oi, t);
        if (void 0 === s) rt(Oi, s = [ i ], t); else s.push(i);
        return s;
    }
});

function Ui(t) {
    return function(e) {
        $i.add(e, t);
    };
}

const _i = _t("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.St = new WeakMap;
        this.It = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = $i.has(t.constructor) ? $i.get(t.constructor) : [];
            const s = xt(e) ? e(t, i) : this.Tt(i, e);
            return this.Dt(t, i, s);
        }
        return null;
    }
    Dt(t, e, i) {
        let s = this.St.get(t);
        let n;
        if (void 0 === s) {
            s = {};
            this.St.set(t, s);
        } else n = s[i];
        if (void 0 === n) {
            const r = this.Et(t, e, i);
            n = zs(Qs(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[i] = n;
        }
        return n;
    }
    Et(t, e, i) {
        let s = this.It.get(t.constructor);
        let n;
        if (void 0 === s) {
            s = {};
            this.It.set(t.constructor, s);
        } else n = s[i];
        if (void 0 === n) {
            n = zs(this.Pt(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const s = this.viewModel;
                    t.scope = _.fromParent(t.scope, s);
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
    Tt(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    Pt(t, e) {
        const i = t.find((t => t.name === e));
        if (void 0 === i) throw mt(`Could not find view: ${e}`);
        return i;
    }
}

const qi = _t("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.Lt = new WeakMap;
        this.Ot = new WeakMap;
        this.p = (this.$t = t.root).get(li);
        this.Ut = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this._t ? this._t = this.$t.getAll(un, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), dt()) : this._t;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.Lt;
            const n = e.get(an);
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
        const i = this.Ot;
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
        return null == e ? this.Ut : new FragmentNodeSequence(this.p, e.cloneNode(true));
    }
    render(t, e, i, s) {
        const n = i.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw mt(`AUR0757:${o}<>${n.length}`);
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
        if (null != s) {
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

Rendering.inject = [ u ];

var Mi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(Mi || (Mi = {}));

var ji;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(ji || (ji = {}));

const Fi = {
    optional: true
};

const Vi = new WeakMap;

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
        this.qt = null;
        this.state = 0;
        this.Mt = false;
        this.jt = l;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.Ft = 0;
        this.Vt = 0;
        this.Nt = 0;
        this.Ht = n;
        this.Wt = 2 === e ? HooksDefinition.none : new HooksDefinition(n);
        this.location = o;
        this.r = t.root.get(qi);
    }
    get lifecycleHooks() {
        return this.qt;
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
        return this.Wt;
    }
    get viewModel() {
        return this.Ht;
    }
    set viewModel(t) {
        this.Ht = t;
        this.Wt = null == t || 2 === this.vmKind ? HooksDefinition.none : new HooksDefinition(t);
    }
    static getCached(t) {
        return Vi.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw mt(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (Vi.has(e)) return Vi.get(e);
        n = n ?? Qs(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(f(is));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        Nt(t, is, new d("IHydrationContext", new HydrationContext(o, s, l)));
        Vi.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (Vi.has(e)) return Vi.get(e);
        s = s ?? Ke(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        Vi.set(e, n);
        n.zt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = e ?? null;
        i.Gt();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.Ht;
        let r = this.definition;
        this.scope = _.create(n, null, true);
        if (r.watches.length > 0) Xi(this, i, r, n);
        Hi(this, r, s, n);
        this.jt = Wi(this, r, n);
        if (this.Wt.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.qt = Ii.resolve(i);
        r.register(i);
        if (null !== r.injectable) Nt(i, r.injectable, new d("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.qt.hydrating) this.qt.hydrating.forEach(rs, this);
        if (this.Wt.hasHydrating) this.Ht.hydrating(this);
        const e = this.Xt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = Xs(this.host, Fi))) {
            this.host = this.container.root.get(li).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Rs(this.host);
        }
        ws(this.host, Vs, this);
        ws(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw mt(`AUR0501`);
            ws(this.shadowRoot = this.host.attachShadow(i ?? Yi), Vs, this);
            ws(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            ws(o, Vs, this);
            ws(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.Ht.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.qt.hydrated) this.qt.hydrated.forEach(os, this);
        if (this.Wt.hasHydrated) this.Ht.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Xt, this.host);
        if (void 0 !== this.qt.created) this.qt.created.forEach(ns, this);
        if (this.Wt.hasCreated) this.Ht.created(this);
    }
    zt() {
        const t = this.definition;
        const e = this.Ht;
        if (t.watches.length > 0) Xi(this, this.container, t, e);
        Hi(this, t, this.flags, e);
        e.$controller = this;
        this.qt = Ii.resolve(this.container);
        if (void 0 !== this.qt.created) this.qt.created.forEach(ns, this);
        if (this.Wt.hasCreated) this.Ht.created(this);
    }
    Gt() {
        this.Xt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Xt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Xt)).findTargets(), this.Xt, void 0);
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
            throw mt(`AUR0503:${this.name} ${ts(this.state)}`);
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
        this.Kt();
        let n;
        if (2 !== this.vmKind && null != this.qt.binding) n = m(...this.qt.binding.map(ls, this));
        if (this.Wt.hasBinding) n = m(n, this.Ht.binding(this.$initiator, this.parent, this.$flags));
        if (wt(n)) {
            this.Qt();
            n.then((() => {
                this.bind();
            })).catch((t => {
                this.Yt(t);
            }));
            return this.$promise;
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let t = 0;
        let e = this.jt.length;
        let i;
        if (e > 0) while (e > t) {
            this.jt[t].start();
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
        if (2 !== this.vmKind && null != this.qt.bound) i = m(...this.qt.bound.map(hs, this));
        if (this.Wt.hasBound) i = m(i, this.Ht.bound(this.$initiator, this.parent, this.$flags));
        if (wt(i)) {
            this.Qt();
            i.then((() => {
                this.isBound = true;
                this.Zt();
            })).catch((t => {
                this.Yt(t);
            }));
            return;
        }
        this.isBound = true;
        this.Zt();
    }
    Jt(...t) {
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
    Zt() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Jt(this.host);
            break;

          case 3:
            this.hostController.Jt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(wi, false) ? t.get(wi) : t.get(bi);
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
        if (2 !== this.vmKind && null != this.qt.attaching) e = m(...this.qt.attaching.map(cs, this));
        if (this.Wt.hasAttaching) e = m(e, this.Ht.attaching(this.$initiator, this.parent, this.$flags));
        if (wt(e)) {
            this.Qt();
            this.Kt();
            e.then((() => {
                this.te();
            })).catch((t => {
                this.Yt(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.te();
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
            throw mt(`AUR0505:${this.name} ${ts(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.ee();
        let s = 0;
        let n;
        if (this.jt.length) for (;s < this.jt.length; ++s) this.jt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.qt.detaching) n = m(...this.qt.detaching.map(us, this));
        if (this.Wt.hasDetaching) n = m(n, this.Ht.detaching(this.$initiator, this.parent, this.$flags));
        if (wt(n)) {
            this.Qt();
            t.ee();
            n.then((() => {
                t.ie();
            })).catch((e => {
                t.Yt(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.ie();
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
        this.se();
    }
    Qt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Qt();
        }
    }
    se() {
        if (void 0 !== this.$promise) {
            ds = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            ds();
            ds = void 0;
        }
    }
    Yt(t) {
        if (void 0 !== this.$promise) {
            ms = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            ms(t);
            ms = void 0;
        }
        if (this.$initiator !== this) this.parent.Yt(t);
    }
    Kt() {
        ++this.Ft;
        if (this.$initiator !== this) this.parent.Kt();
    }
    te() {
        if (0 === --this.Ft) {
            if (2 !== this.vmKind && null != this.qt.attached) gs = m(...this.qt.attached.map(as, this));
            if (this.Wt.hasAttached) gs = m(gs, this.Ht.attached(this.$initiator, this.$flags));
            if (wt(gs)) {
                this.Qt();
                gs.then((() => {
                    this.state = 2;
                    this.se();
                    if (this.$initiator !== this) this.parent.te();
                })).catch((t => {
                    this.Yt(t);
                }));
                gs = void 0;
                return;
            }
            gs = void 0;
            this.state = 2;
            this.se();
        }
        if (this.$initiator !== this) this.parent.te();
    }
    ee() {
        ++this.Vt;
    }
    ie() {
        if (0 === --this.Vt) {
            this.ne();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.qt.unbinding) e = m(...t.qt.unbinding.map(fs, this));
                if (t.Wt.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = m(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (wt(e)) {
                    this.Qt();
                    this.ne();
                    e.then((() => {
                        this.re();
                    })).catch((t => {
                        this.Yt(t);
                    }));
                }
                e = void 0;
                t = t.next;
            }
            this.re();
        }
    }
    ne() {
        ++this.Nt;
    }
    re() {
        if (0 === --this.Nt) {
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
            return Ke(this.Ht.constructor).name === t;

          case 0:
            return Qs(this.Ht.constructor).name === t;

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
            ws(t, Vs, this);
            ws(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            ws(t, Vs, this);
            ws(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            ws(t, Vs, this);
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
        if (this.Wt.hasDispose) this.Ht.dispose();
        if (null !== this.children) {
            this.children.forEach(ss);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.Ht) {
            Vi.delete(this.Ht);
            this.Ht = null;
        }
        this.Ht = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.Wt.hasAccept && true === this.Ht.accept(t)) return true;
        if (null !== this.children) {
            const {children: e} = this;
            for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
        }
    }
}

function Ni(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Hi(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = Ni(s);
        const c = t.container;
        const a = c.has(q, true) ? c.get(q) : null;
        for (;l < o; ++l) {
            e = r[l];
            if (void 0 === h[e]) {
                i = n[e];
                h[e] = new BindableObserver(s, e, i.callback, i.set, t, a);
            }
        }
    }
}

function Wi(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = Ni(i);
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
    return l;
}

const zi = new Map;

const Gi = t => {
    let e = zi.get(t);
    if (null == e) {
        e = new F(t, 0);
        zi.set(t, e);
    }
    return e;
};

function Xi(t, e, i, s) {
    const n = e.get(M);
    const r = e.get(j);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : _.create(s, null, true);
    const h = o.length;
    let c;
    let a;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: c, callback: a} = o[f]);
        a = xt(a) ? a : Reflect.get(s, a);
        if (!xt(a)) throw mt(`AUR0506:${String(a)}`);
        if (xt(c)) t.addBinding(new ComputedWatcher(s, n, c, a, true)); else {
            u = yt(c) ? r.parse(c, 16) : Gi(c);
            t.addBinding(new ExpressionWatcher(l, e, n, u, a));
        }
    }
}

function Ki(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Qi(t) {
    return S(t) && Gs(t.constructor);
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

const Yi = {
    mode: "open"
};

var Zi;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(Zi || (Zi = {}));

var Ji;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Ji || (Ji = {}));

function ts(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const es = _t("IController");

const is = _t("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function ss(t) {
    t.dispose();
}

function ns(t) {
    t.instance.created(this.Ht, this);
}

function rs(t) {
    t.instance.hydrating(this.Ht, this);
}

function os(t) {
    t.instance.hydrated(this.Ht, this);
}

function ls(t) {
    return t.instance.binding(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function hs(t) {
    return t.instance.bound(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function cs(t) {
    return t.instance.attaching(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function as(t) {
    return t.instance.attached(this.Ht, this["$initiator"], this["$flags"]);
}

function us(t) {
    return t.instance.detaching(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function fs(t) {
    return t.instance.unbinding(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

let ds;

let ms;

let gs;

const ps = _t("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.oe = void 0;
        this.host = t.host;
        s.prepare(this);
        Nt(i, e.HTMLElement, Nt(i, e.Element, Nt(i, bs, new d("ElementResolver", t.host))));
        this.oe = g(this.le("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (Gs(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return g(this.le("hydrating"), (() => {
                o.hS(null);
                return g(this.le("hydrated"), (() => {
                    o.hC();
                    this.oe = void 0;
                }));
            }));
        }));
    }
    activate() {
        return g(this.oe, (() => g(this.le("activating"), (() => g(this.controller.activate(this.controller, null, 1, void 0), (() => this.le("activated")))))));
    }
    deactivate() {
        return g(this.le("deactivating"), (() => g(this.controller.deactivate(this.controller, null, 0), (() => this.le("deactivated")))));
    }
    le(t) {
        return m(...this.container.getAll(Oe).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function vs(t, e) {
    return t.$au?.[e] ?? null;
}

function ws(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const bs = _t("INode");

const xs = _t("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(ps, true)) return t.get(ps).host;
    return t.get(li).document;
}))));

const ys = _t("IRenderLocation");

const ks = new WeakMap;

function As(t) {
    if (ks.has(t)) return ks.get(t);
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
        const e = Xs(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return As(e.host);
    }
    return t.parentNode;
}

function Cs(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ks.set(i[t], e);
    } else ks.set(t, e);
}

function Rs(t) {
    if (Bs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function Bs(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Rs(r); else o[s] = r;
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
        if (Bs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Ss = _t("IWindow", (t => t.callback((t => t.get(li).window))));

const Is = _t("ILocation", (t => t.callback((t => t.get(Ss).location))));

const Ts = _t("IHistory", (t => t.callback((t => t.get(Ss).history))));

function Ds(t) {
    return function(e) {
        return zs(t, e);
    };
}

function Es(t) {
    if (void 0 === t) return function(t) {
        Ws(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!xt(t)) return function(e) {
        Ws(e, "shadowOptions", t);
    };
    Ws(t, "shadowOptions", {
        mode: "open"
    });
}

function Ps(t) {
    if (void 0 === t) return function(t) {
        Ls(t);
    };
    Ls(t);
}

function Ls(t) {
    const e = st(Vs, t);
    if (void 0 === e) {
        Ws(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function Os(t) {
    if (void 0 === t) return function(t) {
        Ws(t, "isStrictBinding", true);
    };
    Ws(t, "isStrictBinding", true);
}

const $s = new WeakMap;

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
            if (yt(i)) throw mt(`AUR0761:${t}`);
            const s = p("name", i, Hs);
            if (xt(i.Type)) e = i.Type; else e = Zs(v(s));
            return new CustomElementDefinition(e, s, c(i.aliases), p("key", i, (() => Ns(s))), p("cache", i, _s), p("capture", i, Ms), p("template", i, qs), c(i.instructions), c(i.dependencies), p("injectable", i, qs), p("needsCompile", i, js), c(i.surrogates), Dt.from(e, i.bindables), ti.from(i.childrenObservers), p("containerless", i, Ms), p("isStrictBinding", i, Ms), p("shadowOptions", i, qs), p("hasSlots", i, Ms), p("enhance", i, Ms), p("watches", i, Fs), w("processContent", e, qs));
        }
        if (yt(t)) return new CustomElementDefinition(e, t, c(Ks(e, "aliases"), e.aliases), Ns(t), w("cache", e, _s), w("capture", e, Ms), w("template", e, qs), c(Ks(e, "instructions"), e.instructions), c(Ks(e, "dependencies"), e.dependencies), w("injectable", e, qs), w("needsCompile", e, js), c(Ks(e, "surrogates"), e.surrogates), Dt.from(e, ...Dt.getAll(e), Ks(e, "bindables"), e.bindables), ti.from(...ti.getAll(e), Ks(e, "childrenObservers"), e.childrenObservers), w("containerless", e, Ms), w("isStrictBinding", e, Ms), w("shadowOptions", e, qs), w("hasSlots", e, Ms), w("enhance", e, Ms), c(je.getAnnotation(e), e.watches), w("processContent", e, qs));
        const i = p("name", t, Hs);
        return new CustomElementDefinition(e, i, c(Ks(e, "aliases"), t.aliases, e.aliases), Ns(i), b("cache", t, e, _s), b("capture", t, e, Ms), b("template", t, e, qs), c(Ks(e, "instructions"), t.instructions, e.instructions), c(Ks(e, "dependencies"), t.dependencies, e.dependencies), b("injectable", t, e, qs), b("needsCompile", t, e, js), c(Ks(e, "surrogates"), t.surrogates, e.surrogates), Dt.from(e, ...Dt.getAll(e), Ks(e, "bindables"), e.bindables, t.bindables), ti.from(...ti.getAll(e), Ks(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), b("containerless", t, e, Ms), b("isStrictBinding", t, e, Ms), b("shadowOptions", t, e, qs), b("hasSlots", t, e, Ms), b("enhance", t, e, Ms), c(t.watches, je.getAnnotation(e), e.watches), b("processContent", t, e, qs));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if ($s.has(t)) return $s.get(t);
        const e = CustomElementDefinition.create(t);
        $s.set(t, e);
        rt(Vs, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            Vt(i, e).register(t);
            Mt(i, e).register(t);
            Wt(s, Js, i, t);
        }
    }
}

const Us = {
    name: void 0,
    searchParents: false,
    optional: false
};

const _s = () => 0;

const qs = () => null;

const Ms = () => false;

const js = () => true;

const Fs = () => l;

const Vs = ct("custom-element");

const Ns = t => `${Vs}:${t}`;

const Hs = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Ws = (t, e, i) => {
    rt(ht(e), i, t);
};

const zs = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    rt(Vs, i, i.Type);
    rt(Vs, i, i);
    at(i.Type, Vs);
    return i.Type;
};

const Gs = t => xt(t) && nt(Vs, t);

const Xs = (t, e = Us) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = vs(t, Vs);
        if (null === i) {
            if (true === e.optional) return null;
            throw mt(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = vs(t, Vs);
            if (null === i) throw mt(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = vs(i, Vs);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = As(i);
        }
        if (s) return;
        throw mt(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = vs(i, Vs);
        if (null !== t) return t;
        i = As(i);
    }
    throw mt(`AUR0765`);
};

const Ks = (t, e) => st(ht(e), t);

const Qs = t => {
    const e = st(Vs, t);
    if (void 0 === e) throw mt(`AUR0760:${t.name}`);
    return e;
};

const Ys = () => {
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

const Zs = function() {
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

const Js = Object.freeze({
    name: Vs,
    keyFrom: Ns,
    isType: Gs,
    for: Xs,
    define: zs,
    getDefinition: Qs,
    annotate: Ws,
    getAnnotation: Ks,
    generateName: Hs,
    createInjectable: Ys,
    generateType: Zs
});

const tn = ht("processContent");

function en(t) {
    return void 0 === t ? function(t, e, i) {
        rt(tn, sn(t, e), t);
    } : function(e) {
        t = sn(e, t);
        const i = st(Vs, e);
        if (void 0 !== i) i.processContent = t; else rt(tn, t, e);
        return e;
    };
}

function sn(t, e) {
    if (yt(e)) e = t[e];
    if (!xt(e)) throw mt(`AUR0766:${typeof e}`);
    return e;
}

function nn(t) {
    return function(e) {
        const i = xt(t) ? t : true;
        Ws(e, "capture", i);
        if (Gs(e)) Qs(e).capture = i;
    };
}

const rn = _t("IProjections");

const on = _t("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var ln;

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
})(ln || (ln = {}));

const hn = _t("Instruction");

function cn(t) {
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

const an = _t("ITemplateCompiler");

const un = _t("IRenderer");

function fn(t) {
    return function e(i) {
        i.register = function(t) {
            qt(un, this).register(t);
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

function dn(t, e, i) {
    if (yt(e)) return t.parse(e, i);
    return e;
}

function mn(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function gn(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Xs(t);

      case "view":
        throw mt(`AUR0750`);

      case "view-model":
        return Xs(t).viewModel;

      default:
        {
            const i = Ge(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = Xs(t, {
                name: e
            });
            if (void 0 === s) throw mt(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let pn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = mn(e);
        if (void 0 !== s.$observers?.[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

pn = et([ fn("re") ], pn);

let vn = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ qi, li ];
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
            s = c.find(Js, l);
            if (null == s) throw mt(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Rs(e) : null;
        const f = Mn(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        Nt(f, n, new d(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        ws(e, s.key, o);
        const m = this.r.renderers;
        const g = i.props;
        const p = g.length;
        let v = 0;
        let w;
        while (p > v) {
            w = g[v];
            m[w.type].render(t, o, w);
            ++v;
        }
        t.addChild(o);
    }
};

vn = et([ fn("ra") ], vn);

let wn = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ qi, li ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Qe, i.res);
            if (null == n) throw mt(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = jn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        ws(e, n.key, o);
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

wn = et([ fn("rb") ], wn);

let bn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ qi, li ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Qe, i.res);
            if (null == n) throw mt(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Rs(e);
        const l = jn(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        ws(o, n.key, h);
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

bn = et([ fn("rc") ], bn);

let xn = class LetElementRenderer {
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
        let c = 0;
        while (o > c) {
            l = s[c];
            h = dn(this.ep, l.from, 16);
            t.addBinding(new LetBinding(r, this.oL, h, l.to, n));
            ++c;
        }
    }
};

xn.inject = [ j, M ];

xn = et([ fn("rd") ], xn);

let yn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = dn(this.ep, i.from, 16);
        t.addBinding(new RefBinding(t.container, s, gn(e, i.to)));
    }
};

yn.inject = [ j ];

yn = et([ fn("rj") ], yn);

let kn = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = dn(this.ep, i.from, 1);
        t.addBinding(new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, mn(e), i.to, 2));
    }
};

kn.inject = [ j, M, li ];

kn = et([ fn("rf") ], kn);

let An = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = dn(this.ep, i.from, 16);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, mn(e), i.to, i.mode));
    }
};

An.inject = [ j, M, li ];

An = et([ fn("rg") ], An);

let Cn = class IteratorBindingRenderer {
    constructor(t, e, i, s) {
        this.r = t;
        this.ep = e;
        this.oL = i;
        this.p = s;
    }
    static get inject() {
        return [ qi, j, M, li ];
    }
    render(t, e, i) {
        const s = dn(this.ep, i.forOf, 2);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, mn(e), i.to, 2));
    }
};

Cn = et([ fn("rk") ], Cn);

let Rn = class TextBindingRenderer {
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
        const l = dn(this.ep, i.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            d = c[u];
            t.addBinding(new ContentBinding(t, s, this.oL, this.p.domWriteQueue, this.p, d, r.insertBefore(o.createTextNode(""), n), i.strict));
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Rn.inject = [ j, M, li ];

Rn = et([ fn("ha") ], Rn);

let Bn = class ListenerBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = dn(this.ep, i.from, 8);
        t.addBinding(new ListenerBinding(t.container, s, e, i.to, new ListenerBindingOptions(i.preventDefault, i.capture)));
    }
};

Bn.inject = [ j ];

Bn = et([ fn("hb") ], Bn);

let Sn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Sn = et([ fn("he") ], Sn);

let In = class SetClassAttributeRenderer {
    render(t, e, i) {
        Ln(e.classList, i.value);
    }
};

In = et([ fn("hf") ], In);

let Tn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Tn = et([ fn("hg") ], Tn);

let Dn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = dn(this.ep, i.from, 16);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, 2));
    }
};

Dn.inject = [ j, M, li ];

Dn = et([ fn("hd") ], Dn);

let En = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = dn(this.ep, i.from, 16);
        t.addBinding(new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, 2));
    }
};

En.inject = [ li, j, M ];

En = et([ fn("hc") ], En);

let Pn = class SpreadRenderer {
    constructor(t, e) {
        this.he = t;
        this.r = e;
    }
    static get inject() {
        return [ an, qi ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(is);
        const r = this.r.renderers;
        const o = t => {
            let e = t;
            let i = n;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw mt("No scope context for spread binding.");
            return i;
        };
        const h = i => {
            const s = o(i);
            const n = On(s);
            const c = this.he.compileSpread(s.controller.definition, s.instruction?.captures ?? l, s.controller.container, e);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                r[a.instructions.type].render(n, Xs(e), a.instructions);
                break;

              default:
                r[a.type].render(n, e, a);
            }
            t.addBinding(n);
        };
        h(0);
    }
};

Pn = et([ fn("hs") ], Pn);

class SpreadBinding {
    constructor(t, e) {
        this.ce = t;
        this.ae = e;
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
        const e = this.scope = this.ae.controller.scope.parent ?? void 0;
        if (null == e) throw mt("Invalid spreading. Context scope is null/undefined");
        this.ce.forEach((t => t.bind(e)));
    }
    unbind() {
        this.ce.forEach((t => t.unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.ce.push(t);
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

function Ln(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const On = t => new SpreadBinding([], t);

const $n = "IController";

const Un = "IInstruction";

const _n = "IRenderLocation";

const qn = "IAuSlotsInfo";

function Mn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    Nt(o, t.HTMLElement, Nt(o, t.Element, Nt(o, bs, new d("ElementResolver", i))));
    Nt(o, es, new d($n, e));
    Nt(o, hn, new d(Un, s));
    Nt(o, ys, null == n ? Fn : new RenderLocationProvider(n));
    Nt(o, Di, Vn);
    Nt(o, on, null == r ? Nn : new d(qn, r));
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

function jn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    Nt(h, t.HTMLElement, Nt(h, t.Element, Nt(h, bs, new d("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    Nt(h, es, new d($n, i));
    Nt(h, hn, new d(Un, n));
    Nt(h, ys, null == o ? Fn : new d(_n, o));
    Nt(h, Di, null == r ? Vn : new ViewFactoryProvider(r));
    Nt(h, on, null == l ? Nn : new d(qn, l));
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

const Fn = new RenderLocationProvider(null);

const Vn = new ViewFactoryProvider(null);

const Nn = new d(qn, new AuSlotsInfo(l));

var Hn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Hn || (Hn = {}));

function Wn(t) {
    return function(e) {
        return Kn.define(t, e);
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
        return new BindingCommandDefinition(e, i(Xn(e, "name"), s), c(Xn(e, "aliases"), n.aliases, e.aliases), Gn(s), i(Xn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        qt(i, e).register(t);
        Mt(i, e).register(t);
        Wt(s, Kn, i, t);
    }
}

const zn = ct("binding-command");

const Gn = t => `${zn}:${t}`;

const Xn = (t, e) => st(ht(e), t);

const Kn = Object.freeze({
    name: zn,
    keyFrom: Gn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        rt(zn, i, i.Type);
        rt(zn, i, i);
        at(e, zn);
        return i.Type;
    },
    getAnnotation: Xn
});

let Qn = class OneTimeBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 1);
    }
};

Qn = et([ Wn("one-time") ], Qn);

let Yn = class ToViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 2);
    }
};

Yn = et([ Wn("to-view") ], Yn);

let Zn = class FromViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 4);
    }
};

Zn = et([ Wn("from-view") ], Zn);

let Jn = class TwoWayBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 16), n, 6);
    }
};

Jn = et([ Wn("two-way") ], Jn);

let tr = class DefaultBindingCommand {
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
            l = i.map(t.node, l) ?? x(l);
        } else {
            if ("" === h && 1 === t.def.type) h = x(l);
            r = t.def.defaultBindingMode;
            o = 8 === n.mode || null == n.mode ? null == r || 8 === r ? 2 : r : n.mode;
            l = n.property;
        }
        return new PropertyBindingInstruction(e.parse(h, 16), l, o);
    }
};

tr = et([ Wn("bind") ], tr);

let er = class ForBindingCommand {
    constructor(t) {
        this.ue = t;
    }
    get type() {
        return 0;
    }
    static get inject() {
        return [ Qt ];
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        const s = e.parse(t.attr.rawValue, 2);
        let n = l;
        if (s.semiIdx > -1) {
            const e = t.attr.rawValue.slice(s.semiIdx + 1);
            const i = e.indexOf(":");
            if (i > -1) {
                const t = e.slice(0, i).trim();
                const s = e.slice(i + 1).trim();
                const r = this.ue.parse(t, s);
                n = [ new MultiAttrInstruction(s, r.target, r.command) ];
            }
        }
        return new IteratorBindingInstruction(s, i, n);
    }
};

er = et([ Wn("for") ], er);

let ir = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, true, false);
    }
};

ir = et([ Wn("trigger") ], ir);

let sr = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, false, true);
    }
};

sr = et([ Wn("capture") ], sr);

let nr = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

nr = et([ Wn("attr") ], nr);

let rr = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

rr = et([ Wn("style") ], rr);

let or = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

or = et([ Wn("class") ], or);

let lr = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

lr = et([ Wn("ref") ], lr);

let hr = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

hr = et([ Wn("...$attrs") ], hr);

const cr = _t("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const ar = t => {
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
        this.fe = Object.assign(dt(), {
            a: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: ar("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: dt(),
            altGlyphDef: ar("id xml:base xml:lang xml:space"),
            altglyphdef: dt(),
            altGlyphItem: ar("id xml:base xml:lang xml:space"),
            altglyphitem: dt(),
            animate: ar("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: ar("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: ar("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: ar("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: ar("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: ar("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": ar("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: ar("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: ar("class id style xml:base xml:lang xml:space"),
            ellipse: ar("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: ar("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: ar("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: ar("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: ar("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: ar("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: ar("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: ar("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: ar("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: ar("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: ar("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: ar("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: ar("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: ar("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: ar("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: ar("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: ar("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: ar("id xml:base xml:lang xml:space"),
            feMorphology: ar("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: ar("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: ar("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: ar("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: ar("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: ar("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: ar("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: ar("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: ar("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": ar("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": ar("id string xml:base xml:lang xml:space"),
            "font-face-name": ar("id name xml:base xml:lang xml:space"),
            "font-face-src": ar("id xml:base xml:lang xml:space"),
            "font-face-uri": ar("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: ar("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: ar("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: ar("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: dt(),
            hkern: ar("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: ar("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: ar("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: ar("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: ar("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: ar("id xml:base xml:lang xml:space"),
            "missing-glyph": ar("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: ar("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: ar("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: ar("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: ar("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: ar("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: ar("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: ar("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: ar("class id offset style xml:base xml:lang xml:space"),
            style: ar("id media title type xml:base xml:lang xml:space"),
            svg: ar("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: ar("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: ar("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: ar("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: ar("class id style xml:base xml:lang xml:space"),
            tref: ar("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: ar("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: ar("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: ar("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: ar("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.de = ar("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.me = ar("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.fe;
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
        return qt(cr, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.de[t.nodeName] && true === this.me[e] || true === this.fe[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ li ];

const ur = _t("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ge = dt();
        this.pe = dt();
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
        return [ cr ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.ge)[n] ?? (e[n] = dt());
            for (r in i) {
                if (void 0 !== s[r]) throw dr(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.pe;
        for (const i in t) {
            if (void 0 !== e[i]) throw dr(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return fr(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.ge[t.nodeName]?.[e] ?? this.pe[e] ?? (vt(t, e, this.svg) ? e : null);
    }
}

function fr(t, e) {
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

function dr(t, e) {
    return mt(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const mr = _t("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const gr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ve = t.document.createElement("template");
    }
    createTemplate(t) {
        if (yt(t)) {
            let e = gr[t];
            if (void 0 === e) {
                const i = this.ve;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.ve = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                gr[t] = e;
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

TemplateElementFactory.inject = [ li ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return qt(an, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = wr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = yt(s.template) || !t.enhance ? n.we.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const c = e.get(Ut(Ir));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(Rr)) throw mt(`AUR0701`);
        this.be(h, n);
        this.xe(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Hs(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.ye(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, wr, null, null, void 0);
        const r = [];
        const o = n.ke(s.nodeName.toLowerCase());
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
        let y;
        let k;
        let A;
        for (;c > a; ++a) {
            u = e[a];
            k = u.target;
            A = u.rawValue;
            w = n.Ae(u);
            if (null !== w && (1 & w.type) > 0) {
                xr.node = s;
                xr.attr = u;
                xr.bindable = null;
                xr.def = null;
                r.push(w.build(xr, n.ep, n.m));
                continue;
            }
            f = n.Ce(k);
            if (null !== f) {
                if (f.isTemplateController) throw mt(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === w && pr(A);
                if (y) m = this.Re(s, A, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        b = h.parse(A, 1);
                        m = [ null === b ? new SetPropertyInstruction(A, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        xr.node = s;
                        xr.attr = u;
                        xr.bindable = v;
                        xr.def = f;
                        m = [ w.build(xr, n.ep, n.m) ];
                    }
                }
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === w) {
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
                if (null != b) r.push(new InterpolationInstruction(b, n.m.map(s, k) ?? x(k))); else switch (k) {
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
                        xr.node = s;
                        xr.attr = u;
                        xr.bindable = p;
                        xr.def = o;
                        r.push(new SpreadElementPropBindingInstruction(w.build(xr, n.ep, n.m)));
                        continue;
                    }
                }
                xr.node = s;
                xr.attr = u;
                xr.bindable = null;
                xr.def = null;
                r.push(w.build(xr, n.ep, n.m));
            }
        }
        vr();
        if (null != d) return d.concat(r);
        return r;
    }
    ye(t, e) {
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
        let y;
        for (;r > o; ++o) {
            l = s[o];
            h = l.name;
            c = l.value;
            a = e.ue.parse(h, c);
            b = a.target;
            y = a.rawValue;
            if (yr[b]) throw mt(`AUR0702:${h}`);
            p = e.Ae(a);
            if (null !== p && (1 & p.type) > 0) {
                xr.node = t;
                xr.attr = a;
                xr.bindable = null;
                xr.def = null;
                i.push(p.build(xr, e.ep, e.m));
                continue;
            }
            u = e.Ce(b);
            if (null !== u) {
                if (u.isTemplateController) throw mt(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && pr(y);
                if (w) d = this.Re(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        xr.node = t;
                        xr.attr = a;
                        xr.bindable = g;
                        xr.def = u;
                        d = [ p.build(xr, e.ep, e.m) ];
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
                    i.push(new InterpolationInstruction(v, e.m.map(t, b) ?? x(b)));
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
                xr.node = t;
                xr.attr = a;
                xr.bindable = null;
                xr.def = null;
                i.push(p.build(xr, e.ep, e.m));
            }
        }
        vr();
        if (null != f) return f.concat(i);
        return i;
    }
    xe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.Be(t, e);

              default:
                return this.Se(t, e);
            }

          case 3:
            return this.Ie(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.xe(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    Be(t, e) {
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
        let f;
        let d;
        let m;
        let g;
        for (;s > l; ++l) {
            h = i[l];
            a = h.name;
            u = h.value;
            if ("to-binding-context" === a) {
                o = true;
                continue;
            }
            c = e.ue.parse(a, u);
            d = c.target;
            m = c.rawValue;
            f = e.Ae(c);
            if (null !== f) {
                if ("bind" === c.command) n.push(new LetBindingInstruction(r.parse(m, 16), x(d))); else throw mt(`AUR0704:${c.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new V(m) : g, x(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.Te(t).nextSibling;
    }
    Se(t, e) {
        var i, s, r, o;
        const h = t.nextSibling;
        const c = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const a = e.ke(c);
        const u = null !== a;
        const f = u && null != a.shadowOptions;
        const d = a?.capture;
        const m = null != d && "boolean" !== typeof d;
        const g = d ? [] : l;
        const p = e.ep;
        const v = this.debug ? n : () => {
            t.removeAttribute(C);
            --k;
            --y;
        };
        let w = t.attributes;
        let b;
        let y = w.length;
        let k = 0;
        let A;
        let C;
        let R;
        let B;
        let S;
        let I;
        let T = null;
        let D = false;
        let E;
        let P;
        let L;
        let O;
        let $;
        let U;
        let _;
        let q = null;
        let M;
        let j;
        let F;
        let V;
        let N = true;
        let H = false;
        let W = false;
        if ("slot" === c) {
            if (null == e.root.def.shadowOptions) throw mt(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (u) {
            N = a.processContent?.call(a.Type, t, e.p);
            w = t.attributes;
            y = w.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw mt(`AUR0705`);
        for (;y > k; ++k) {
            A = w[k];
            C = A.name;
            R = A.value;
            switch (C) {
              case "as-element":
              case "containerless":
                v();
                if (!H) H = "containerless" === C;
                continue;
            }
            B = e.ue.parse(C, R);
            q = e.Ae(B);
            F = B.target;
            V = B.rawValue;
            if (d && (!m || m && d(F))) {
                if (null != q && 1 & q.type) {
                    v();
                    g.push(B);
                    continue;
                }
                W = "au-slot" !== F && "slot" !== F;
                if (W) {
                    M = BindablesInfo.from(a, false);
                    if (null == M.attrs[F] && !e.Ce(F)?.isTemplateController) {
                        v();
                        g.push(B);
                        continue;
                    }
                }
            }
            if (null !== q && 1 & q.type) {
                xr.node = t;
                xr.attr = B;
                xr.bindable = null;
                xr.def = null;
                (S ?? (S = [])).push(q.build(xr, e.ep, e.m));
                v();
                continue;
            }
            T = e.Ce(F);
            if (null !== T) {
                M = BindablesInfo.from(T, true);
                D = false === T.noMultiBindings && null === q && pr(V);
                if (D) L = this.Re(t, V, T, e); else {
                    j = M.primary;
                    if (null === q) {
                        U = p.parse(V, 1);
                        L = [ null === U ? new SetPropertyInstruction(V, j.property) : new InterpolationInstruction(U, j.property) ];
                    } else {
                        xr.node = t;
                        xr.attr = B;
                        xr.bindable = j;
                        xr.def = T;
                        L = [ q.build(xr, e.ep, e.m) ];
                    }
                }
                v();
                if (T.isTemplateController) (O ?? (O = [])).push(new HydrateTemplateController(br, this.resolveResources ? T : T.name, void 0, L)); else (P ?? (P = [])).push(new HydrateAttributeInstruction(this.resolveResources ? T : T.name, null != T.aliases && T.aliases.includes(F) ? F : void 0, L));
                continue;
            }
            if (null === q) {
                if (u) {
                    M = BindablesInfo.from(a, false);
                    E = M.attrs[F];
                    if (void 0 !== E) {
                        U = p.parse(V, 1);
                        (I ?? (I = [])).push(null == U ? new SetPropertyInstruction(V, E.property) : new InterpolationInstruction(U, E.property));
                        v();
                        continue;
                    }
                }
                U = p.parse(V, 1);
                if (null != U) {
                    v();
                    (S ?? (S = [])).push(new InterpolationInstruction(U, e.m.map(t, F) ?? x(F)));
                }
                continue;
            }
            v();
            if (u) {
                M = BindablesInfo.from(a, false);
                E = M.attrs[F];
                if (void 0 !== E) {
                    xr.node = t;
                    xr.attr = B;
                    xr.bindable = E;
                    xr.def = a;
                    (I ?? (I = [])).push(q.build(xr, e.ep, e.m));
                    continue;
                }
            }
            xr.node = t;
            xr.attr = B;
            xr.bindable = null;
            xr.def = null;
            (S ?? (S = [])).push(q.build(xr, e.ep, e.m));
        }
        vr();
        if (this.De(t) && null != S && S.length > 1) this.Ee(t, S);
        if (u) {
            _ = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, I ?? l, null, H, g);
            if (c === Or) {
                const i = t.getAttribute("name") || Lr;
                const s = e.h("template");
                const n = e.Pe();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.xe(s.content, n);
                _.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: Hs(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Le(t, e);
            }
        }
        if (null != S || null != _ || null != P) {
            b = l.concat(_ ?? l, P ?? l, S ?? l);
            this.Te(t);
        }
        let z;
        if (null != O) {
            y = O.length - 1;
            k = y;
            $ = O[k];
            let n;
            this.Le(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.Pe(null == b ? [] : [ b ]);
            let l;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v;
            let w;
            let x = 0, A = 0;
            let C = t.firstChild;
            let R = false;
            if (false !== N) while (null !== C) {
                h = 1 === C.nodeType ? C.getAttribute(Or) : null;
                if (null !== h) C.removeAttribute(Or);
                if (u) {
                    l = C.nextSibling;
                    if (!f) {
                        R = 3 === C.nodeType && "" === C.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = h || Lr] ?? (i[s] = [])).push(C);
                        t.removeChild(C);
                    }
                    C = l;
                } else {
                    if (null !== h) {
                        h = h || Lr;
                        throw mt(`AUR0706:${c}[${h}]`);
                    }
                    C = C.nextSibling;
                }
            }
            if (null != m) {
                d = {};
                for (h in m) {
                    n = e.h("template");
                    g = m[h];
                    for (x = 0, A = g.length; A > x; ++x) {
                        p = g[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) n.content.appendChild(p); else n.content.appendChild(p.content); else n.content.appendChild(p);
                    }
                    w = e.Pe();
                    this.xe(n.content, w);
                    d[h] = CustomElementDefinition.create({
                        name: Hs(),
                        template: n,
                        instructions: w.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                _.projections = d;
            }
            if (u && (H || a.containerless)) this.Le(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z) if ("TEMPLATE" === t.nodeName) this.xe(t.content, o); else {
                C = t.firstChild;
                while (null !== C) C = this.xe(C, o);
            }
            $.def = CustomElementDefinition.create({
                name: Hs(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (k-- > 0) {
                $ = O[k];
                n = e.h("template");
                v = e.h("au-m");
                v.classList.add("au");
                n.content.appendChild(v);
                $.def = CustomElementDefinition.create({
                    name: Hs(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ O[k + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ $ ]);
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
            let w = 0, x = 0;
            if (false !== N) while (null !== i) {
                n = 1 === i.nodeType ? i.getAttribute(Or) : null;
                if (null !== n) i.removeAttribute(Or);
                if (u) {
                    s = i.nextSibling;
                    if (!f) {
                        v = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!v) ((r = h ?? (h = {}))[o = n || Lr] ?? (r[o] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || Lr;
                        throw mt(`AUR0706:${c}[${n}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != h) {
                l = {};
                for (n in h) {
                    g = e.h("template");
                    d = h[n];
                    for (w = 0, x = d.length; x > w; ++w) {
                        m = d[w];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.Pe();
                    this.xe(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: Hs(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                _.projections = l;
            }
            if (u && (H || a.containerless)) this.Le(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.xe(i, e);
            }
        }
        return h;
    }
    Ie(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.Te(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    Re(t, e, i, s) {
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
                f = s.ue.parse(l, h);
                d = s.Ae(f);
                m = n.attrs[f.target];
                if (null == m) throw mt(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    xr.node = t;
                    xr.attr = f;
                    xr.bindable = m;
                    xr.def = i;
                    o.push(d.build(xr, s.ep, s.m));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                c = g;
                l = void 0;
                h = void 0;
            }
        }
        vr();
        return o;
    }
    be(t, e) {
        const i = t;
        const s = y(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw mt(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw mt(`AUR0709`);
            const s = Br(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const c = Dt.for(n);
            const a = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw mt(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw mt(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || a.has(e)) throw mt(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    a.add(e);
                }
                c.add({
                    property: e,
                    attribute: i ?? void 0,
                    mode: Sr(t)
                });
                const s = t.getAttributeNames().filter((t => !Cr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Oe(zs({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const c = o.length;
        for (;c > h; ++h) Qs(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    De(t) {
        return "INPUT" === t.nodeName && 1 === kr[t.type];
    }
    Ee(t, e) {
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
    Te(t) {
        t.classList.add("au");
        return t;
    }
    Le(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.Te(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.$e = dt();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.we = o ? s.we : e.get(mr);
        this.ue = o ? s.ue : e.get(Qt);
        this.ep = o ? s.ep : e.get(j);
        this.m = o ? s.m : e.get(ur);
        this.Ue = o ? s.Ue : e.get(k);
        this.p = o ? s.p : e.get(li);
        this.localEls = o ? s.localEls : new Set;
        this.rows = r ?? [];
    }
    Oe(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    ke(t) {
        return this.c.find(Js, t);
    }
    Ce(t) {
        return this.c.find(Qe, t);
    }
    Pe(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    Ae(t) {
        if (this.root !== this) return this.root.Ae(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.$e[e];
        if (void 0 === i) {
            i = this.c.create(Kn, e);
            if (null === i) throw mt(`AUR0713:${e}`);
            this.$e[e] = i;
        }
        return i;
    }
}

function pr(t) {
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

function vr() {
    xr.node = xr.attr = xr.bindable = xr.def = null;
}

const wr = {
    projections: null
};

const br = {
    name: "unnamed"
};

const xr = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const yr = Object.assign(dt(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const kr = {
    checkbox: 1,
    radio: 1
};

const Ar = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = Ar.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = dt();
            const r = e ? void 0 === t.defaultBindingMode ? 8 : t.defaultBindingMode : 8;
            let o;
            let l;
            let h = false;
            let c;
            let a;
            for (l in s) {
                o = s[l];
                a = o.attribute;
                if (true === o.primary) {
                    if (h) throw mt(`AUR0714:${t.name}`);
                    h = true;
                    c = o;
                } else if (!h && null == c) c = o;
                n[a] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) c = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            Ar.set(t, i = new BindablesInfo(n, s, c));
        }
        return i;
    }
}

const Cr = Object.freeze([ "property", "attribute", "mode" ]);

const Rr = "as-custom-element";

function Br(t, e) {
    const i = t.getAttribute(Rr);
    if (null === i || "" === i) throw mt(`AUR0715`);
    if (e.has(i)) throw mt(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Rr);
    }
    return i;
}

function Sr(t) {
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

const Ir = _t("ITemplateCompilerHooks");

const Tr = new WeakMap;

const Dr = ct("compiler-hooks");

const Er = Object.freeze({
    name: Dr,
    define(t) {
        let e = Tr.get(t);
        if (void 0 === e) {
            Tr.set(t, e = new TemplateCompilerHooksDefinition(t));
            rt(Dr, e, t);
            at(t, Dr);
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
        t.register(qt(Ir, this.Type));
    }
}

const Pr = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Er.define(t);
    }
};

const Lr = "default";

const Or = "au-slot";

const $r = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        $r.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = $r.get(e);
        $r.delete(e);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(1);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(2);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(4);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(6);
    }
}

fe("oneTime")(OneTimeBindingBehavior);

fe("toView")(ToViewBindingBehavior);

fe("fromView")(FromViewBindingBehavior);

fe("twoWay")(TwoWayBindingBehavior);

const Ur = new WeakMap;

const _r = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "debounce",
            delay: i > 0 ? i : _r,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(s);
        if (null == n) ; else Ur.set(e, n);
    }
    unbind(t, e) {
        Ur.get(e)?.dispose();
        Ur.delete(e);
    }
}

DebounceBindingBehavior.inject = [ a ];

fe("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this._e = new Map;
        this.qe = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw mt(`AUR0817`);
        if (0 === i.length) throw mt(`AUR0818`);
        this._e.set(e, i);
        let s;
        for (s of i) this.qe.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this._e.get(e);
        this._e.delete(e);
        let s;
        for (s of i) this.qe.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ D ];

fe("signal")(SignalBindingBehavior);

const qr = new WeakMap;

const Mr = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.Me = t.performanceNow;
        this.lt = t.taskQueue;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "throttle",
            delay: i > 0 ? i : Mr,
            now: this.Me,
            queue: this.lt
        };
        const n = e.limit?.(s);
        if (null == n) ; else qr.set(e, n);
    }
    unbind(t, e) {
        qr.get(e)?.dispose();
        qr.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ a ];

fe("throttle")(ThrottleBindingBehavior);

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

fi(DataAttributeAccessor);

const jr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        if (!(e instanceof PropertyBinding)) throw mt(`AURxxxx`);
        e.useTargetObserver(jr);
    }
}

fe("attr")(AttrBindingBehavior);

function Fr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw mt(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Fr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

fe("self")(SelfBindingBehavior);

const Vr = dt();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Vr[t] ?? (Vr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

fi(AttributeNSAccessor);

function Nr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.je = void 0;
        this.Fe = void 0;
        this.yt = false;
        this.xt = t;
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
        this.Ve();
        this.Ne();
        this.it();
    }
    handleCollectionChange() {
        this.Ne();
    }
    handleChange(t, e) {
        this.Ne();
    }
    Ne() {
        const t = this.v;
        const e = this.xt;
        const i = gt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Nr;
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
        const e = this.xt;
        const i = gt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Nr;
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
        this.Ve();
    }
    At() {
        this.je?.unsubscribe(this);
        this.Fe?.unsubscribe(this);
        this.je = this.Fe = void 0;
    }
    it() {
        Hr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Hr);
    }
    Ve() {
        const t = this.xt;
        (this.Fe ?? (this.Fe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.je?.unsubscribe(this);
        this.je = void 0;
        if ("checkbox" === t.type) (this.je = io(this.v, this.oL))?.subscribe(this);
    }
}

ai(CheckedObserver);

I(CheckedObserver);

let Hr;

const Wr = {
    childList: true,
    subtree: true,
    characterData: true
};

function zr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Z = false;
        this.He = void 0;
        this.We = void 0;
        this.iO = false;
        this.yt = false;
        this.xt = t;
        this.oL = s;
        this.bt = i;
    }
    getValue() {
        return this.iO ? this.v : this.xt.multiple ? Gr(this.xt.options) : this.xt.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.Z = t !== this.ov;
        this.ze(t instanceof Array ? t : null);
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
        const e = this.xt;
        const i = bt(t);
        const s = e.matcher ?? zr;
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
        const t = this.xt;
        const e = t.options;
        const i = e.length;
        const s = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(s instanceof Array)) return true;
            let r;
            const o = t.matcher || zr;
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
        (this.We = new this.xt.ownerDocument.defaultView.MutationObserver(this.Ge.bind(this))).observe(this.xt, Wr);
        this.ze(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    At() {
        this.We.disconnect();
        this.He?.unsubscribe(this);
        this.We = this.He = void 0;
        this.iO = false;
    }
    ze(t) {
        this.He?.unsubscribe(this);
        this.He = void 0;
        if (null != t) {
            if (!this.xt.multiple) throw mt(`AUR0654`);
            (this.He = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.it();
    }
    Ge(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.it();
    }
    it() {
        Xr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Xr);
    }
}

ai(SelectValueObserver);

I(SelectValueObserver);

function Gr(t) {
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

let Xr;

const Kr = "--";

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
    Xe(t) {
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
    Ke(t) {
        let e;
        let i;
        const n = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (yt(e)) {
                if (i.startsWith(Kr)) {
                    n.push([ i, e ]);
                    continue;
                }
                n.push([ s(i), e ]);
                continue;
            }
            n.push(...this.Qe(e));
        }
        return n;
    }
    Ye(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this.Qe(t[s]));
            return i;
        }
        return l;
    }
    Qe(t) {
        if (yt(t)) return this.Xe(t);
        if (t instanceof Array) return this.Ye(t);
        if (t instanceof Object) return this.Ke(t);
        return l;
    }
    et() {
        if (this.Z) {
            this.Z = false;
            const t = this.v;
            const e = this.styles;
            const i = this.Qe(t);
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
                if (!gt.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && xt(e.indexOf) && e.includes("!important")) {
            i = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, i);
    }
    bind() {
        this.v = this.ov = this.obj.style.cssText;
    }
}

fi(StyleAttributeAccessor);

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.Z = false;
        this.yt = false;
        this.xt = t;
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
            this.xt[this.k] = this.v ?? this.bt.default;
            this.it();
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.xt[this.k];
        if (this.ov !== this.v) {
            this.Z = false;
            this.it();
        }
    }
    kt() {
        this.v = this.ov = this.xt[this.k];
    }
    it() {
        Qr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Qr);
    }
}

ai(ValueAttributeObserver);

I(ValueAttributeObserver);

let Qr;

const Yr = "http://www.w3.org/1999/xlink";

const Zr = "http://www.w3.org/XML/1998/namespace";

const Jr = "http://www.w3.org/2000/xmlns/";

const to = Object.assign(dt(), {
    "xlink:actuate": [ "actuate", Yr ],
    "xlink:arcrole": [ "arcrole", Yr ],
    "xlink:href": [ "href", Yr ],
    "xlink:role": [ "role", Yr ],
    "xlink:show": [ "show", Yr ],
    "xlink:title": [ "title", Yr ],
    "xlink:type": [ "type", Yr ],
    "xml:lang": [ "lang", Zr ],
    "xml:space": [ "space", Zr ],
    xmlns: [ "xmlns", Jr ],
    "xmlns:xlink": [ "xlink", Jr ]
});

const eo = new N;

eo.type = 2 | 4;

class NodeObserverLocator {
    constructor(t, e, i, s) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = i;
        this.svgAnalyzer = s;
        this.allowDirtyCheck = true;
        this.Ze = dt();
        this.Je = dt();
        this.ti = dt();
        this.ei = dt();
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
        Mt(H, NodeObserverLocator).register(t);
        qt(H, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Ze;
        let n;
        if (yt(t)) {
            n = s[t] ?? (s[t] = dt());
            if (null == n[e]) n[e] = i; else so(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = dt());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = r[e]; else so(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Je;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = t[e]; else so("*", e); else if (null == i[t]) i[t] = e; else so("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.ei || e in (this.ti[t.tagName] ?? A)) return this.getObserver(t, e, i);
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
            return jr;

          default:
            {
                const i = to[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (vt(t, e, this.svgAnalyzer)) return jr;
                return eo;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (yt(t)) {
            n = (i = this.ti)[t] ?? (i[t] = dt());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.ti)[e] ?? (s[e] = dt());
            n[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.ei[e] = true;
    }
    getNodeObserverConfig(t, e) {
        return this.Ze[t.tagName]?.[e] ?? this.Je[e];
    }
    getNodeObserver(t, e, i) {
        const s = this.Ze[t.tagName]?.[e] ?? this.Je[e];
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
        const n = to[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (vt(t, e, this.svgAnalyzer)) return jr;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw mt(`AUR0652:${String(e)}`);
        } else return new z(t, e);
    }
}

NodeObserverLocator.inject = [ C, li, G, cr ];

function io(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function so(t, e) {
    throw mt(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t, e) {
        if (!(e instanceof NodeObserverLocator)) throw mt("AURxxxx: updateTrigger binding behavior only works with the default implementation of Aurelia HTML observation. Implement your own node observation + updateTrigger");
        this.oL = t;
        this.ii = e;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw mt(`AUR0802`);
        if (!(e instanceof PropertyBinding) || !(4 & e.mode)) throw mt(`AUR0803`);
        const s = this.ii.getNodeObserverConfig(e.target, e.targetProperty);
        if (null == s) throw mt(`AURxxxx`);
        const n = this.ii.getNodeObserver(e.target, e.targetProperty, this.oL);
        n.useConfig({
            readonly: s.readonly,
            default: s.default,
            events: i
        });
        e.useTargetObserver(n);
    }
}

UpdateTriggerBindingBehavior.inject = [ M, H ];

fe("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.si = false;
        this.ni = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.ri(); else this.si = true;
    }
    attached() {
        if (this.si) {
            this.si = false;
            this.ri();
        }
        this.ni.addEventListener("focus", this);
        this.ni.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ni;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.oi) this.value = false;
    }
    ri() {
        const t = this.ni;
        const e = this.oi;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get oi() {
        return this.ni === this.p.document.activeElement;
    }
}

Focus.inject = [ bs, li ];

et([ St({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Fe("focus")(Focus);

let no = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.li = false;
        this.dt = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.dt = null;
            if (Boolean(this.value) !== this.hi) if (this.hi === this.ai) {
                this.hi = !this.ai;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.hi = this.ai;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.hi = this.ai = "hide" !== i.alias;
    }
    binding() {
        this.li = true;
        this.update();
    }
    detaching() {
        this.li = false;
        this.dt?.cancel();
        this.dt = null;
    }
    valueChanged() {
        if (this.li && null === this.dt) this.dt = this.p.domWriteQueue.queueTask(this.update);
    }
};

et([ St ], no.prototype, "value", void 0);

no = et([ it(0, bs), it(1, li), it(2, hn) ], no);

Ht("hide")(no);

Fe("show")(no);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.ui = i.document.createElement("div");
        this.view = t.create();
        Cs(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.ui = this.fi();
        this.view.setHost(s);
        return this.di(t, s, i);
    }
    detaching(t, e, i) {
        return this.mi(t, this.ui, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.ui;
        const i = this.ui = this.fi();
        if (e === i) return;
        this.view.setHost(i);
        const s = g(this.mi(null, i, t.flags), (() => this.di(null, i, t.flags)));
        if (wt(s)) s.catch((t => {
            throw t;
        }));
    }
    di(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return g(s?.call(n, e, r), (() => this.gi(t, e, i)));
    }
    gi(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return g(n.activate(t ?? n, s, i, s.scope), (() => this.pi(e)));
        return this.pi(e);
    }
    pi(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    mi(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return g(s?.call(n, e, r), (() => this.vi(t, e, i)));
    }
    vi(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return g(n.deactivate(t, s, i), (() => this.wi(e)));
        return this.wi(e);
    }
    wi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    fi() {
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

Portal.inject = [ Di, ys, li ];

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

Ve("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.bi = false;
        this.xi = 0;
        this.yi = t;
        this.l = e;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.xi++;
        const o = () => !this.bi && this.xi === r + 1;
        return g(this.pending, (() => {
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.yi.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == s) return;
            s.setLocation(this.l);
            this.pending = g(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.bi = true;
        return g(this.pending, (() => {
            this.bi = false;
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
        const r = this.xi++;
        const o = () => !this.bi && this.xi === r + 1;
        let l;
        return g(this.pending, (() => this.pending = g(s?.deactivate(s, n, i), (() => {
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.yi.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
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

If.inject = [ Di, ys ];

et([ St ], If.prototype, "value", void 0);

et([ St({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Ve("if")(If);

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

Else.inject = [ Di ];

Ve({
    name: "else"
})(Else);

function ro(t) {
    t.dispose();
}

const oo = [ 18, 17 ];

class Repeat {
    constructor(t, e, i, s, n) {
        this.views = [];
        this.key = null;
        this.ki = new Map;
        this.Ai = new Map;
        this.Ci = void 0;
        this.Ri = false;
        this.Bi = false;
        this.Si = null;
        this.Ii = void 0;
        this.Ti = false;
        const r = t.props[0].props[0];
        if (void 0 !== r) {
            const {to: t, value: i, command: s} = r;
            if ("key" === t) if (null === s) this.key = i; else if ("bind" === s) this.key = e.parse(i, 16); else throw mt(`AUR775:${s}`); else throw mt(`AUR776:${t}`);
        }
        this.l = i;
        this.Di = s;
        this.f = n;
    }
    binding(t, e, i) {
        const s = this.Di.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Ei = r;
                let t = o.iterable;
                while (null != t && oo.includes(t.$kind)) {
                    t = t.expression;
                    this.Ri = true;
                }
                this.Si = t;
                break;
            }
        }
        this.Pi();
        const h = o.declaration;
        if (!(this.Ti = 24 === h.$kind || 25 === h.$kind)) this.local = T(h, this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.Li();
        return this.Oi(t);
    }
    detaching(t, e, i) {
        this.Pi();
        return this.$i(t);
    }
    unbinding(t, e, i) {
        this.Ai.clear();
        this.ki.clear();
    }
    itemsChanged() {
        if (!this.$controller.isActive) return;
        this.Pi();
        this.Li();
        this.Ui(this.items, void 0);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.Ri) {
            if (this.Bi) return;
            this.Bi = true;
            this.items = T(this.forOf.iterable, i.scope, this.Ei, null);
            this.Bi = false;
            return;
        }
        this.Li();
        this.Ui(t, e);
    }
    Ui(t, e) {
        const i = this.views;
        const s = i.length;
        const n = this.key;
        const r = null !== n;
        if (r || void 0 === e) {
            const t = this.local;
            const o = this.Ii;
            const l = o.length;
            const h = this.forOf;
            const c = h.declaration;
            const a = this.Ei;
            const u = this.Ti;
            e = X(l);
            let f = 0;
            if (0 === s) for (;f < l; ++f) e[f] = -2; else if (0 === l) if (u) for (f = 0; f < s; ++f) {
                e.deletedIndices.push(f);
                e.deletedItems.push(T(c, i[f].scope, a, null));
            } else for (f = 0; f < s; ++f) {
                e.deletedIndices.push(f);
                e.deletedItems.push(i[f].scope.bindingContext[t]);
            } else {
                const d = Array(s);
                if (u) for (f = 0; f < s; ++f) d[f] = T(c, i[f].scope, a, null); else for (f = 0; f < s; ++f) d[f] = i[f].scope.bindingContext[t];
                let m;
                let g;
                let p;
                let v;
                let w = 0;
                const b = s - 1;
                const x = l - 1;
                const y = new Map;
                const k = new Map;
                const A = this.ki;
                const C = this.Ai;
                const R = this.$controller.scope;
                f = 0;
                t: {
                    while (true) {
                        m = d[f];
                        g = o[f];
                        p = r ? yo(A, n, m, ko(C, d[f], h, R, a, t, u), a) : m;
                        v = r ? yo(A, n, g, ko(C, o[f], h, R, a, t, u), a) : g;
                        if (p !== v) {
                            A.set(m, p);
                            A.set(g, v);
                            break;
                        }
                        ++f;
                        if (f > b || f > x) break t;
                    }
                    if (b !== x) break t;
                    w = x;
                    while (true) {
                        m = d[w];
                        g = o[w];
                        p = r ? yo(A, n, m, ko(C, m, h, R, a, t, u), a) : m;
                        v = r ? yo(A, n, g, ko(C, g, h, R, a, t, u), a) : g;
                        if (p !== v) {
                            A.set(m, p);
                            A.set(g, v);
                            break;
                        }
                        --w;
                        if (f > w) break t;
                    }
                }
                const B = f;
                const S = f;
                for (f = S; f <= x; ++f) {
                    if (A.has(g = o[f])) v = A.get(g); else {
                        v = r ? yo(A, n, g, ko(C, g, h, R, a, t, u), a) : g;
                        A.set(g, v);
                    }
                    k.set(v, f);
                }
                for (f = B; f <= b; ++f) {
                    if (A.has(m = d[f])) p = A.get(m); else p = r ? yo(A, n, m, i[f].scope, a) : m;
                    y.set(p, f);
                    if (k.has(p)) e[k.get(p)] = f; else {
                        e.deletedIndices.push(f);
                        e.deletedItems.push(m);
                    }
                }
                for (f = S; f <= x; ++f) if (!y.has(A.get(o[f]))) e[f] = -2;
                y.clear();
                k.clear();
            }
        }
        if (void 0 === e) {
            const t = g(this.$i(null), (() => this.Oi(null)));
            if (wt(t)) t.catch(At);
        } else {
            const t = K(e);
            if (t.deletedIndices.length > 0) {
                const e = g(this._i(t), (() => this.qi(s, t)));
                if (wt(e)) e.catch(At);
            } else this.qi(s, t);
        }
    }
    Pi() {
        const t = this.$controller.scope;
        let e = this.Mi;
        let i = this.Ri;
        let s;
        if (i) {
            e = this.Mi = T(this.Si, t, this.Ei, null) ?? null;
            i = this.Ri = !Object.is(this.items, e);
        }
        const n = this.Ci;
        if (this.$controller.isActive) {
            s = this.Ci = Q(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.Ci = void 0;
        }
    }
    Li() {
        const {items: t} = this;
        if (bt(t)) {
            this.Ii = t;
            return;
        }
        const e = [];
        po(t, ((t, i) => {
            e[i] = t;
        }));
        this.Ii = e;
    }
    Oi(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: c, Ai: a, Ei: u, forOf: f, Ti: d} = this;
        const m = r.scope;
        const g = go(c);
        const p = this.views = Array(g);
        po(c, ((c, v) => {
            s = p[v] = o.create().setLocation(h);
            s.nodes.unlink();
            n = ko(a, c, f, m, u, l, d);
            fo(n.overrideContext, v, g);
            i = s.activate(t ?? s, r, 0, n);
            if (wt(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    $i(t) {
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
            if (wt(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    _i(t) {
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
            if (wt(i)) (e ?? (e = [])).push(i);
        }
        h = 0;
        let c = 0;
        for (;l > h; ++h) {
            c = o[h] - h;
            r.splice(c, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    qi(t, e) {
        let i;
        let s;
        let n;
        let r;
        let o = 0;
        const {$controller: l, f: h, local: c, Ii: a, l: u, views: f, Ti: d, Ei: m, Ai: g, forOf: p} = this;
        const v = e.length;
        for (;v > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== v) throw uo(f.length, v);
        const w = l.scope;
        const b = e.length;
        Y(f, e);
        const x = ao(e);
        const y = x.length;
        const k = p.declaration;
        let A;
        let C = y - 1;
        o = b - 1;
        for (;o >= 0; --o) {
            n = f[o];
            A = f[o + 1];
            n.nodes.link(A?.nodes ?? u);
            if (-2 === e[o]) {
                r = ko(g, a[o], p, w, m, c, d);
                fo(r.overrideContext, o, b);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (wt(s)) (i ?? (i = [])).push(s);
            } else if (C < 0 || 1 === y || o !== x[C]) {
                if (d) O(k, n.scope, m, a[o]); else n.scope.bindingContext[c] = a[o];
                fo(n.scope.overrideContext, o, b);
                n.nodes.insertBefore(n.location);
            } else {
                if (d) O(k, n.scope, m, a[o]); else n.scope.bindingContext[c] = a[o];
                if (t !== b) fo(n.scope.overrideContext, o, b);
                --C;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(ro);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ hn, j, ys, es, Di ];

et([ St ], Repeat.prototype, "items", void 0);

Ve("repeat")(Repeat);

let lo = 16;

let ho = new Int32Array(lo);

let co = new Int32Array(lo);

function ao(t) {
    const e = t.length;
    if (e > lo) {
        lo = e;
        ho = new Int32Array(e);
        co = new Int32Array(e);
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
            o = ho[i];
            n = t[o];
            if (-2 !== n && n < s) {
                co[r] = o;
                ho[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                c = l + h >> 1;
                n = t[ho[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[ho[l]];
            if (s < n || -2 === n) {
                if (l > 0) co[r] = ho[l - 1];
                ho[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = ho[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = co[s];
    }
    while (r-- > 0) ho[r] = 0;
    return a;
}

const uo = (t, e) => mt(`AUR0814:${t}!=${e}`);

const fo = (t, e, i) => {
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

const mo = Object.prototype.toString;

const go = t => {
    switch (mo.call(t)) {
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
        throw mt(`Cannot count ${mo.call(t)}`);
    }
};

const po = (t, e) => {
    switch (mo.call(t)) {
      case "[object Array]":
        return vo(t, e);

      case "[object Map]":
        return wo(t, e);

      case "[object Set]":
        return bo(t, e);

      case "[object Number]":
        return xo(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw mt(`Cannot iterate over ${mo.call(t)}`);
    }
};

const vo = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const wo = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const bo = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const xo = (t, e) => {
    let i = 0;
    for (;i < t; ++i) e(i, i, t);
};

const yo = (t, e, i, s, n) => {
    let r = t.get(i);
    if (void 0 === r) {
        if ("string" === typeof e) r = i[e]; else r = T(e, s, n, null);
        t.set(i, r);
    }
    return r;
};

const ko = (t, e, i, s, n, r, o) => {
    let l = t.get(e);
    if (void 0 === l) {
        if (o) O(i.declaration, l = _.fromParent(s, new Z), n, e); else l = _.fromParent(s, new Z(r, e));
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

With.inject = [ Di, ys ];

et([ St ], With.prototype, "value", void 0);

Ve("with")(With);

let Ao = class Switch {
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
        this.queue((() => this.ji(t)));
    }
    ji(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.Fi(null);
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
        return g(this.Fi(null, n), (() => {
            this.activeCases = n;
            return this.Vi(null);
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
        return g(this.activeCases.length > 0 ? this.Fi(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Vi(t);
        }));
    }
    Vi(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return m(...i.map((e => e.activate(t, 0, n))));
    }
    Fi(t, e = []) {
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

et([ St ], Ao.prototype, "value", void 0);

Ao = et([ Ve("switch"), it(0, Di), it(1, ys) ], Ao);

let Co = 0;

let Ro = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Ni = e;
        this.l = i;
        this.id = ++Co;
        this.fallThrough = false;
        this.view = void 0;
        this.Hi = s.config.level <= 1;
        this.Ue = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof Ao) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw mt(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Ue.debug("isMatch()");
        const e = this.value;
        if (bt(e)) {
            if (void 0 === this.Ci) this.Ci = this.Wi(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (bt(t)) {
            this.Ci?.unsubscribe(this);
            this.Ci = this.Wi(t);
        } else if (void 0 !== this.Ci) this.Ci.unsubscribe(this);
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
        this.Ci?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Wi(t) {
        const e = this.Ni.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

Ro.inject = [ Di, M, ys, k ];

et([ St ], Ro.prototype, "value", void 0);

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
}) ], Ro.prototype, "fallThrough", void 0);

Ro = et([ Ve("case") ], Ro);

let Bo = class DefaultCase extends Ro {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw mt(`AUR0816`);
        t.defaultCase = this;
    }
};

Bo = et([ Ve("default-case") ], Bo);

let So = class PromiseTemplateController {
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
        if (!wt(i)) {
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
            void m(h = (this.preSettledTask = s.queueTask((() => m(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), c)).result.catch((t => {
                if (!(t instanceof J)) throw t;
            })), i.then((a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => m(o?.deactivate(t, e), r?.deactivate(t, e), n?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            }), (a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => m(o?.deactivate(t, e), n?.deactivate(t, e), r?.activate(t, e, l, a))), c)).result;
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

et([ St ], So.prototype, "value", void 0);

So = et([ Ve("promise"), it(0, Di), it(1, ys), it(2, li), it(3, k) ], So);

let Io = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Eo(t).pending = this;
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
}) ], Io.prototype, "value", void 0);

Io = et([ Ve("pending"), it(0, Di), it(1, ys) ], Io);

let To = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Eo(t).fulfilled = this;
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
}) ], To.prototype, "value", void 0);

To = et([ Ve("then"), it(0, Di), it(1, ys) ], To);

let Do = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Eo(t).rejected = this;
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
}) ], Do.prototype, "value", void 0);

Do = et([ Ve("catch"), it(0, Di), it(1, ys) ], Do);

function Eo(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof So) return i;
    throw mt(`AUR0813`);
}

let Po = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Po = et([ Yt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Po);

let Lo = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Lo = et([ Yt({
    pattern: "then",
    symbols: ""
}) ], Lo);

let Oo = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Oo = et([ Yt({
    pattern: "catch",
    symbols: ""
}) ], Oo);

function $o(t, e, i, s) {
    if (yt(e)) return Uo(t, e, i, s);
    if (Gs(e)) return _o(t, e, i, s);
    throw mt(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.zi = i;
        this.Gi = void 0;
    }
    get definition() {
        if (void 0 === this.Gi) this.Gi = CustomElementDefinition.create({
            name: Hs(),
            template: this.node,
            needsCompile: yt(this.node),
            instructions: this.instructions,
            dependencies: this.zi
        });
        return this.Gi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(qi).getViewFactory(this.definition, t.createChild().register(...this.zi));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.zi);
    }
}

function Uo(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (cn(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) qo(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function _o(t, e, i, s) {
    const n = Qs(e);
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
        if (cn(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) qo(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function qo(t, e, i, s, n) {
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

function Mo(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Xi = e;
        this.Ki = i;
        this.r = s;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Qi = void 0;
        this.Yi = e.props.reduce(Mo, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Qi !== s) {
            this.Qi = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.vi(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Qi === t) return;
        this.Qi = t;
        this.composing = true;
        i |= s.flags;
        const n = g(this.vi(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (wt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return g(void 0 === t ? g(e, (t => this.Zi(t, s))) : t, (t => this.gi(this.view = t, i, s)));
    }
    vi(t, e, i) {
        return t?.deactivate(e ?? t, this.$controller, i);
    }
    gi(t, e, i) {
        const {$controller: s} = this;
        return g(t?.activate(e ?? t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    Zi(t, e) {
        const i = this.Ji(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Ji(t, e) {
        if (null == t) return;
        const i = this.Ki.controller.container;
        if ("object" === typeof t) {
            if (jo(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (yt(t)) {
            const e = i.find(Js, t);
            if (null == e) throw mt(`AUR0809:${t}`);
            t = e.Type;
        }
        return $o(this.p, t, this.Yi, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ li, hn, is, qi ];

et([ St ], AuRender.prototype, "component", void 0);

et([ St({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

Ds({
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
        this.ts = void 0;
        this.r = t.get(qi);
        this.Xi = r;
        this.es = o;
    }
    static get inject() {
        return [ u, es, bs, ys, li, hn, R(CompositionContextFactory) ];
    }
    get pending() {
        return this.ss;
    }
    get composition() {
        return this.ts;
    }
    attaching(t, e, i) {
        return this.ss = g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.es.isCurrent(t)) this.ss = void 0;
        }));
    }
    detaching(t) {
        const e = this.ts;
        const i = this.ss;
        this.es.invalidate();
        this.ts = this.ss = void 0;
        return g(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.ts) {
            this.ts.update(this.model);
            return;
        }
        this.ss = g(this.ss, (() => g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.es.isCurrent(t)) this.ss = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.es;
        const s = this.ts;
        return g(i.create(t), (t => {
            if (i.isCurrent(t)) return g(this.compose(t), (n => {
                if (i.isCurrent(t)) return g(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.ts = n;
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
        const {c: l, host: h, $controller: c, l: a} = this;
        const u = this.getDef(r);
        const f = l.createChild();
        const d = null == a ? h.parentNode : a.parentNode;
        if (null !== u) {
            if (u.containerless) throw mt(`AUR0806`);
            if (null == a) {
                i = h;
                s = () => {};
            } else {
                i = d.insertBefore(this.p.document.createElement(u.name), a);
                s = () => {
                    i.remove();
                };
            }
            e = this.getVm(f, r, i);
        } else {
            i = null == a ? h : a;
            e = this.getVm(f, r, i);
        }
        const m = () => {
            if (null !== u) {
                const n = Controller.$el(f, e, i, {
                    projections: this.Xi.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, c, 1, c.scope.parent)), (t => g(n.deactivate(t ?? n, c, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Js.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, c);
                const l = "auto" === this.scopeBehavior ? _.fromParent(this.parent.scope, e) : _.create(e);
                if (Bs(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, c, 1, l)), (t => o.deactivate(t ?? o, c, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return g(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = Bs(i);
        Nt(t, s.Element, Nt(t, bs, new d("ElementResolver", n ? null : i)));
        Nt(t, ys, new d("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        Nt(t, e, new d("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = xt(t) ? t : t?.constructor;
        return Js.isType(e) ? Js.getDefinition(e) : null;
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

Ds("au-compose")(AuCompose);

class EmptyComponent$1 {}

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
        if (wt(this.view) || wt(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        this.rs = null;
        this.os = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.ls = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.ls = true;
        }
        this.Ki = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ ys, hn, is, qi ];
    }
    binding(t, e, i) {
        this.rs = this.$controller.scope.parent;
        let s;
        if (this.ls) {
            s = this.Ki.controller.scope.parent;
            (this.os = _.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.rs.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.ls ? this.os : this.rs);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.ls && null != this.os) this.os.overrideContext.$host = t;
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

Ds({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Fo = _t("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw mt('"sanitize" method not implemented');
    }
})));

let Vo = class SanitizeValueConverter {
    constructor(t) {
        this.cs = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.cs.sanitize(t);
    }
};

Vo = et([ it(0, Fo) ], Vo);

pe("sanitize")(Vo);

let No = class ViewValueConverter {
    constructor(t) {
        this.us = t;
    }
    toView(t, e) {
        return this.us.getViewComponentForObject(t, e);
    }
};

No = et([ it(0, _i) ], No);

pe("view")(No);

const Ho = DebounceBindingBehavior;

const Wo = OneTimeBindingBehavior;

const zo = ToViewBindingBehavior;

const Go = FromViewBindingBehavior;

const Xo = SignalBindingBehavior;

const Ko = ThrottleBindingBehavior;

const Qo = TwoWayBindingBehavior;

const Yo = TemplateCompiler;

const Zo = NodeObserverLocator;

const Jo = [ Yo, Zo ];

const tl = SVGAnalyzer;

const el = re;

const il = ne;

const sl = se;

const nl = ie;

const rl = oe;

const ol = [ sl, nl, rl ];

const ll = [ el, il ];

const hl = tr;

const cl = er;

const al = Zn;

const ul = Qn;

const fl = Yn;

const dl = Jn;

const ml = lr;

const gl = ir;

const pl = sr;

const vl = nr;

const wl = or;

const bl = rr;

const xl = hr;

const yl = [ hl, ul, al, fl, dl, cl, ml, gl, pl, wl, bl, vl, xl ];

const kl = Vo;

const Al = No;

const Cl = If;

const Rl = Else;

const Bl = Repeat;

const Sl = With;

const Il = Ao;

const Tl = Ro;

const Dl = Bo;

const El = So;

const Pl = Io;

const Ll = To;

const Ol = Do;

const $l = Po;

const Ul = Lo;

const _l = Oo;

const ql = AttrBindingBehavior;

const Ml = SelfBindingBehavior;

const jl = UpdateTriggerBindingBehavior;

const Fl = AuRender;

const Vl = AuCompose;

const Nl = Portal;

const Hl = Focus;

const Wl = no;

const zl = [ Ho, Wo, zo, Go, Xo, Ko, Qo, kl, Al, Cl, Rl, Bl, Sl, Il, Tl, Dl, El, Pl, Ll, Ol, $l, Ul, _l, ql, Ml, jl, Fl, Vl, Nl, Hl, Wl, AuSlot ];

const Gl = wn;

const Xl = vn;

const Kl = kn;

const Ql = Cn;

const Yl = xn;

const Zl = An;

const Jl = yn;

const th = pn;

const eh = bn;

const ih = Bn;

const sh = En;

const nh = Sn;

const rh = In;

const oh = Tn;

const lh = Dn;

const hh = Rn;

const ch = Pn;

const ah = [ Zl, Ql, Jl, Kl, th, Xl, Gl, eh, Yl, ih, sh, nh, rh, oh, lh, hh, ch ];

const uh = fh(n);

function fh(t) {
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
            return e.register(jt(q, i.coercingOptions), ...Jo, ...zl, ...ol, ...yl, ...ah);
        },
        customize(e) {
            return fh(e ?? t);
        }
    };
}

const dh = _t("IAurelia");

class Aurelia {
    constructor(t = r.createContainer()) {
        this.container = t;
        this.ir = false;
        this.ds = false;
        this.gs = false;
        this.ps = void 0;
        this.next = void 0;
        this.vs = void 0;
        this.ws = void 0;
        if (t.has(dh, true)) throw mt(`AUR0768`);
        Nt(t, dh, new d("IAurelia", this));
        Nt(t, ps, this.bs = new d("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ds;
    }
    get isStopping() {
        return this.gs;
    }
    get root() {
        if (null == this.ps) {
            if (null == this.next) throw mt(`AUR0767`);
            return this.next;
        }
        return this.ps;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.xs(t.host), this.container, this.bs);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.xs(s);
        const r = t.component;
        let o;
        if (xt(r)) {
            Nt(i, n.HTMLElement, Nt(i, n.Element, Nt(i, bs, new d("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        Nt(i, xs, new d("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: Hs(),
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
    xs(t) {
        let e;
        if (!this.container.has(li, false)) {
            if (null === t.ownerDocument.defaultView) throw mt(`AUR0769`);
            e = new tt(t.ownerDocument.defaultView);
            this.container.register(jt(li, e));
        } else e = this.container.get(li);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw mt(`AUR0770`);
        if (wt(this.vs)) return this.vs;
        return this.vs = g(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.bs.prepare(this.ps = t);
            this.ds = true;
            return g(t.activate(), (() => {
                this.ir = true;
                this.ds = false;
                this.vs = void 0;
                this.ys(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (wt(this.ws)) return this.ws;
        if (true === this.ir) {
            const e = this.ps;
            this.ir = false;
            this.gs = true;
            return this.ws = g(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.ps = void 0;
                this.bs.dispose();
                this.gs = false;
                this.ys(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.gs) throw mt(`AUR0771`);
        this.container.dispose();
    }
    ys(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var mh;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(mh || (mh = {}));

var gh;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(gh || (gh = {}));

const ph = _t("IDialogService");

const vh = _t("IDialogController");

const wh = _t("IDialogDomRenderer");

const bh = _t("IDialogDom");

const xh = _t("IDialogGlobalSettings");

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
            this.se = t;
            this.Yt = e;
        }));
    }
    static get inject() {
        return [ li, u ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(wh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(xs, true) ? e.get(xs) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(jt(xs, o));
        e.register(jt(bs, c), jt(bh, l));
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
            return g(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Js.generateName(),
                    template: s
                }));
                return g(i.activate(i, null, 1), (() => {
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
        if (this.ks) return this.ks;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(g(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.ks = void 0;
                    if (l) throw kh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return g(r.deactivate?.(h), (() => g(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.se(h); else this.Yt(kh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.ks = void 0;
            throw t;
        }));
        this.ks = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = Ah(t);
        return new Promise((t => t(g(this.cmp.deactivate?.(DialogCloseResult.create("error", e)), (() => g(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Yt(e);
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(bs, new d("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = xt(t) ? t : t?.constructor;
        return Js.isType(e) ? Js.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function kh(t, e) {
    const i = mt(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function Ah(t) {
    const e = mt("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.$t = t;
        this.p = e;
        this.As = i;
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
        return [ u, li, xh ];
    }
    static register(t) {
        t.register(qt(ph, this), $e.deactivating(ph, (t => g(t.closeAll(), (t => {
            if (t.length > 0) throw mt(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Rh(new Promise((e => {
            const i = DialogSettings.from(this.As, t);
            const s = i.container ?? this.$t.createChild();
            e(g(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(jt(vh, e));
                s.register(Ft(DialogController, (() => {
                    throw mt(`AUR0902`);
                })));
                return g(e.activate(t), (t => {
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
        return Object.assign(new DialogSettings, ...t).Rs().Cs();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const s = m(null == e ? void 0 : g(e(), (e => {
            t.component = e;
        })), xt(i) ? g(i(), (e => {
            t.template = e;
        })) : void 0);
        return wt(s) ? s.then((() => t)) : t;
    }
    Rs() {
        if (null == this.component && null == this.template) throw mt(`AUR0903`);
        return this;
    }
    Cs() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Ch(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function Rh(t) {
    t.whenClosed = Ch;
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
        qt(xh, this).register(t);
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
        qt(wh, this).register(t);
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

DefaultDialogDomRenderer.inject = [ li ];

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

function Ih(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, $e.creating((() => t(i.get(xh))))),
        customize(t, i) {
            return Ih(t, i ?? e);
        }
    };
}

const Th = Ih((() => {
    throw mt(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(qt(xh, this));
    }
} ]);

const Dh = Ih(n, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Eh = _t((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, i) {
        this.ctn = t;
        this.p = e;
        this.r = i;
    }
    define(t, e, i) {
        if (!t.includes("-")) throw mt('Invalid web-components custom element name. It must include a "-"');
        let s;
        if (null == e) throw mt("Invalid custom element definition");
        switch (typeof e) {
          case "function":
            s = Js.isType(e) ? Js.getDefinition(e) : CustomElementDefinition.create(Js.generateName(), e);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (s.containerless) throw mt("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const n = i?.extends ? this.p.document.createElement(i.extends).constructor : this.p.HTMLElement;
        const r = this.ctn;
        const o = this.r;
        const l = s.bindables;
        const h = this.p;
        class CustomElementClass extends n {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = r.createChild();
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(bs, new d("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                ws(this, e.key, n);
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

WcCustomElementRegistry.inject = [ u, li, qi ];

export { AdoptedStyleSheetsStyles, AppRoot, $e as AppTask, re as AtPrefixedTriggerAttributePattern, el as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, ql as AttrBindingBehaviorRegistration, nr as AttrBindingCommand, vl as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, sh as AttributeBindingRendererRegistration, AttributeNSAccessor, ee as AttributePattern, AuCompose, AuRender, Fl as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Dt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, ge as BindingBehavior, BindingBehaviorDefinition, Kn as BindingCommand, BindingCommandDefinition, mh as BindingMode, BindingModeBehavior, BindingTargetSubscriber, CSSModulesProcessorRegistry, sr as CaptureBindingCommand, pl as CaptureBindingCommandRegistration, Ro as Case, CheckedObserver, ti as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, or as ClassBindingCommand, wl as ClassBindingCommandRegistration, ne as ColonPrefixedBindAttributePattern, il as ColonPrefixedBindAttributePatternRegistration, Hn as CommandType, ComputedWatcher, ContentBinding, Controller, Qe as CustomAttribute, CustomAttributeDefinition, Gl as CustomAttributeRendererRegistration, Js as CustomElement, CustomElementDefinition, Xl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Ho as DebounceBindingBehaviorRegistration, tr as DefaultBindingCommand, hl as DefaultBindingCommandRegistration, yl as DefaultBindingLanguage, ol as DefaultBindingSyntax, Bo as DefaultCase, Jo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, ah as DefaultRenderers, zl as DefaultResources, gh as DefinitionType, DialogCloseResult, Th as DialogConfiguration, DialogController, yh as DialogDeactivationStatuses, Dh as DialogDefaultConfiguration, DialogOpenResult, DialogService, ie as DotSeparatedAttributePattern, nl as DotSeparatedAttributePatternRegistration, Else, Rl as ElseRegistration, ExpressionWatcher, FlushQueue, Focus, er as ForBindingCommand, cl as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Go as FromViewBindingBehaviorRegistration, Zn as FromViewBindingCommand, al as FromViewBindingCommandRegistration, To as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, ps as IAppRoot, Oe as IAppTask, ur as IAttrMapper, Qt as IAttributeParser, Kt as IAttributePattern, on as IAuSlotsInfo, dh as IAurelia, es as IController, vh as IDialogController, bh as IDialogDom, wh as IDialogDomRenderer, xh as IDialogGlobalSettings, ph as IDialogService, xs as IEventTarget, Ae as IFlushQueue, Ts as IHistory, is as IHydrationContext, hn as IInstruction, Ri as ILifecycleHooks, Is as ILocation, bs as INode, Zo as INodeObserverLocatorRegistration, li as IPlatform, rn as IProjections, ys as IRenderLocation, un as IRenderer, qi as IRendering, cr as ISVGAnalyzer, Fo as ISanitizer, bi as IShadowDOMGlobalStyles, wi as IShadowDOMStyles, zt as ISyntaxInterpreter, an as ITemplateCompiler, Ir as ITemplateCompilerHooks, Yo as ITemplateCompilerRegistration, mr as ITemplateElementFactory, Di as IViewFactory, _i as IViewLocator, Eh as IWcElementRegistry, Ss as IWindow, If, Cl as IfRegistration, ln as InstructionType, InterpolationBinding, Kl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Ql as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Yl as LetElementRendererRegistration, Mi as LifecycleFlags, Ii as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, ListenerBinding, ListenerBindingInstruction, ListenerBindingOptions, ih as ListenerBindingRendererRegistration, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, Wo as OneTimeBindingBehaviorRegistration, Qn as OneTimeBindingCommand, ul as OneTimeBindingCommandRegistration, Io as PendingTemplateController, Portal, So as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Zl as PropertyBindingRendererRegistration, se as RefAttributePattern, sl as RefAttributePatternRegistration, RefBinding, ml as RefBindingCommandRegistration, RefBindingInstruction, Jl as RefBindingRendererRegistration, Do as RejectedTemplateController, RenderPlan, Rendering, Repeat, Bl as RepeatRegistration, SVGAnalyzer, tl as SVGAnalyzerRegistration, Vo as SanitizeValueConverter, kl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Ml as SelfBindingBehaviorRegistration, SetAttributeInstruction, nh as SetAttributeRendererRegistration, SetClassAttributeInstruction, rh as SetClassAttributeRendererRegistration, SetPropertyInstruction, th as SetPropertyRendererRegistration, SetStyleAttributeInstruction, oh as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, ll as ShortHandBindingSyntax, SignalBindingBehavior, Xo as SignalBindingBehaviorRegistration, uh as StandardConfiguration, Ji as State, StyleAttributeAccessor, rr as StyleBindingCommand, bl as StyleBindingCommandRegistration, xi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, lh as StylePropertyBindingRendererRegistration, Ao as Switch, TemplateCompiler, Er as TemplateCompilerHooks, eh as TemplateControllerRendererRegistration, TextBindingInstruction, hh as TextBindingRendererRegistration, ThrottleBindingBehavior, Ko as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, zo as ToViewBindingBehaviorRegistration, Yn as ToViewBindingCommand, fl as ToViewBindingCommandRegistration, ir as TriggerBindingCommand, gl as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Qo as TwoWayBindingBehaviorRegistration, Jn as TwoWayBindingCommand, dl as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, jl as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, be as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, Zi as ViewModelKind, No as ViewValueConverter, Al as ViewValueConverterRegistration, $i as Views, je as Watch, WcCustomElementRegistry, With, Sl as WithRegistration, Ht as alias, Ut as allResources, Yt as attributePattern, St as bindable, fe as bindingBehavior, Wn as bindingCommand, nn as capture, Ye as children, Et as coercer, Ps as containerless, Rs as convertToRenderLocation, $o as createElement, gi as cssModules, Fe as customAttribute, Ds as customElement, As as getEffectiveParentNode, vs as getRef, Ki as isCustomElementController, Qi as isCustomElementViewModel, cn as isInstruction, Bs as isRenderLocation, Ti as lifecycleHooks, ye as mixinAstEvaluator, xe as mixinBindingUseScope, Be as mixingBindingLimited, en as processContent, Wt as registerAliases, fn as renderer, Cs as setEffectiveParentNode, ws as setRef, pi as shadowCSS, Os as strict, Pr as templateCompilerHooks, Ve as templateController, Es as useShadowDOM, pe as valueConverter, Ui as view, _e as watch };

