import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as c, IPlatform as a, IContainer as u, optional as f, InstanceProvider as d, resolveAll as m, onResolve as g, fromDefinitionOrDefault as p, pascalCase as v, fromAnnotationOrTypeOrDefault as w, fromAnnotationOrDefinitionOrTypeOrDefault as x, camelCase as b, toArray as y, ILogger as k, emptyObject as A, IServiceLocator as C, transient as R } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as B, isObject as S } from "../../../metadata/dist/native-modules/index.mjs";

import { subscriberCollection as I, astEvaluate as T, connectable as D, astBind as E, astUnbind as P, astAssign as L, ConnectableSwitcher as O, ProxyObservable as $, Scope as U, ICoercionConfiguration as q, IObserverLocator as _, IExpressionParser as j, AccessScopeExpression as F, PrimitiveLiteralExpression as M, ISignaler as V, PropertyAccessor as N, INodeObserverLocator as H, getObserverLookup as W, SetterObserver as z, IDirtyChecker as G, applyMutationsToIndices as X, getCollectionObserver as K, synchronizeIndices as Q, BindingContext as Y } from "../../../runtime/dist/native-modules/index.mjs";

import { TaskAbortError as Z } from "../../../platform/dist/native-modules/index.mjs";

import { BrowserPlatform as J } from "../../../platform-browser/dist/native-modules/index.mjs";

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

const it = B.getOwn;

const st = B.hasOwn;

const nt = B.define;

const {annotation: rt, resource: ot} = t;

const lt = rt.keyFor;

const ht = ot.keyFor;

const ct = ot.appendTo;

const at = rt.appendTo;

const ut = rt.getKeys;

const ft = () => Object.create(null);

const dt = t => new Error(t);

const mt = Object.prototype.hasOwnProperty;

const gt = ft();

const pt = (t, e, i) => {
    if (true === gt[e]) return true;
    if (!bt(e)) return false;
    const s = e.slice(0, 5);
    return gt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const vt = t => t instanceof Promise;

const wt = t => t instanceof Array;

const xt = t => "function" === typeof t;

const bt = t => "string" === typeof t;

const yt = Object.defineProperty;

const kt = t => {
    throw t;
};

const At = Object.is;

const Ct = Reflect.defineProperty;

const Rt = (t, e, i) => {
    Ct(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function Bt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt(It, BindableDefinition.create(e, t, i), t.constructor, e);
        at(t.constructor, Tt.keyFrom(e));
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

function St(t) {
    return t.startsWith(It);
}

const It = lt("bindable");

const Tt = Object.freeze({
    name: It,
    keyFrom: t => `${It}:${t}`,
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
                if (!st(It, t, n)) at(t, Tt.keyFrom(n));
                nt(It, e, t, n);
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
        const i = It.length + 1;
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
            l = ut(c).filter(St);
            h = l.length;
            for (a = 0; a < h; ++a) s[o++] = it(It, c, l[a].slice(i));
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
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Pt(t, e, n)));
    }
}

function Dt(t, e, i) {
    Et.define(t, e);
}

const Et = {
    key: lt("coercer"),
    define(t, e) {
        nt(Et.key, t[e].bind(t), t);
    },
    for(t) {
        return it(Et.key, t);
    }
};

function Pt(t, e, i = {}) {
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
            r = "function" === typeof t ? t.bind(s) : Et.for(s) ?? n;
            break;
        }
    }
    return r === n ? r : Lt(r, i.nullable);
}

function Lt(t, e) {
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
            if (At(t, e)) return;
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

const Ot = function(t) {
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

const Ut = r.createInterface;

const qt = o.singleton;

const _t = o.aliasTo;

const jt = o.instance;

const Ft = o.callback;

const Mt = o.transient;

const Vt = (t, e, i) => t.registerResolver(e, i);

function Nt(...t) {
    return function(e) {
        const i = lt("aliases");
        const s = it(i, e);
        if (void 0 === s) nt(i, t, e); else s.push(...t);
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
        this.q = [];
        this._ = null;
        this.j = false;
        this.F = e;
    }
    get O() {
        return this.j ? this.F[0] : null;
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
        const e = this.M = t.length;
        const i = this.V = [];
        let s = 0;
        for (;e > s; ++s) i.push(new CharSpec(t[s], false, false, false));
    }
    eachChar(t) {
        const e = this.M;
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

const Wt = Ut("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
            i._ = r;
            i.j = true;
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
    return t.j;
}

function Gt(t, e) {
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

const Xt = Ut("IAttributePattern");

const Kt = Ut("IAttributeParser", (t => t.singleton(AttributeParser)));

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
        qt(Xt, this.Type).register(t);
    }
}

const Yt = ht("attribute-pattern");

const Zt = "attribute-pattern-definitions";

const Jt = e => t.annotation.get(e, Zt);

const te = Object.freeze({
    name: Yt,
    definitionAnnotationKey: Zt,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        nt(Yt, s, i);
        ct(i, Yt);
        t.annotation.set(i, Zt, e);
        at(i, Zt);
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

ee = tt([ Qt({
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

ie = tt([ Qt({
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

se = tt([ Qt({
    pattern: ":PART",
    symbols: ":"
}) ], se);

let ne = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

ne = tt([ Qt({
    pattern: "@PART",
    symbols: "@"
}) ], ne);

let re = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

re = tt([ Qt({
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
                    if (bt(e) && e.includes("!important")) {
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
                throw dt(`AUR0651:${this.tt}`);
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
        ae = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ae);
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
    t[0].target.$eMObs.forEach(ce, t);
};

function ce(t) {
    t.handleMutation(this);
}

let ae;

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
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingBehaviorDefinition(e, i(de(e, "name"), s), c(de(e, "aliases"), n.aliases, e.aliases), me.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        qt(i, e).register(t);
        _t(i, e).register(t);
        Ht(s, me, i, t);
    }
}

const fe = ht("binding-behavior");

const de = (t, e) => it(lt(e), t);

const me = Object.freeze({
    name: fe,
    keyFrom(t) {
        return `${fe}:${t}`;
    },
    isType(t) {
        return xt(t) && st(fe, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        nt(fe, i, i.Type);
        nt(fe, i, i);
        ct(e, fe);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(fe, t);
        if (void 0 === e) throw dt(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: de
});

function ge(t) {
    return function(e) {
        return we.define(t, e);
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
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, i(ve(e, "name"), s), c(ve(e, "aliases"), n.aliases, e.aliases), we.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Ht(s, we, i, t);
    }
}

const pe = ht("value-converter");

const ve = (t, e) => it(lt(e), t);

const we = Object.freeze({
    name: pe,
    keyFrom: t => `${pe}:${t}`,
    isType(t) {
        return xt(t) && st(pe, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        nt(pe, i, i.Type);
        nt(pe, i, i);
        ct(e, pe);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(pe, t);
        if (void 0 === e) throw dt(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
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
        if (t !== T(i.ast, i.scope, i, null)) {
            this.v = t;
            this.st.add(this);
        }
    }
}

const xe = t => {
    Rt(t.prototype, "useScope", (function(t) {
        this.scope = t;
    }));
};

const be = (t, e = true) => i => {
    const s = i.prototype;
    if (null != t) Ct(s, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    Ct(s, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    Rt(s, "get", (function(t) {
        return this.l.get(t);
    }));
    Rt(s, "getConverter", (function(t) {
        const e = we.keyFrom(t);
        let i = ye.get(this);
        if (null == i) ye.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get(Ot(e)));
    }));
    Rt(s, "getBehavior", (function(t) {
        const e = me.keyFrom(t);
        let i = ye.get(this);
        if (null == i) ye.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.l.get(Ot(e)));
    }));
};

const ye = new WeakMap;

class ResourceLookup {}

const ke = Ut("IFlushQueue", (t => t.singleton(FlushQueue)));

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

const Re = (t, e) => {
    Rt(t.prototype, "limit", (function(t) {
        if (Ce.has(this)) throw dt(`AURXXXX: a rate limit has already been applied.`);
        Ce.add(this);
        const i = e(this, t);
        const s = this[i];
        const n = (...t) => s.call(this, ...t);
        const r = "debounce" === t.type ? Be(t, n, this) : Se(t, n, this);
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

const Be = (t, e, i) => {
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
        const e = 0 === (1 & this.mode);
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
                }), Ie);
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
        E(this.ast, t, this);
        this.targetObserver ?? (this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = T(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        P(this.ast, this.scope, this);
        this.scope = void 0;
        this.v = void 0;
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
    }
}

xe(AttributeBinding);

Re(AttributeBinding, (() => "updateTarget"));

D(AttributeBinding);

be(true)(AttributeBinding);

const Te = {
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
            }), Te);
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
            if (wt(i)) this.observeCollection(i);
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
        E(this.ast, t, this);
        this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (wt(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        P(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

xe(InterpolationPartBinding);

Re(InterpolationPartBinding, (() => "updateTarget"));

D(InterpolationPartBinding);

be(true)(InterpolationPartBinding);

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
        if (wt(t)) this.observeCollection(t);
        const e = 1 !== this.ot.state;
        if (e) this.ct(t); else this.updateTarget(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        E(this.ast, t, this);
        const e = this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (wt(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        P(this.ast, this.scope, this);
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
        }), Te);
        e?.cancel();
    }
}

xe(ContentBinding);

Re(ContentBinding, (() => "updateTarget"));

D()(ContentBinding);

be(void 0, false)(ContentBinding);

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
        if ((De = T(this.ast, this.scope, this, this)) !== this.v) this.v = De;
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
        E(this.ast, t, this);
        this.v = T(this.ast, this.scope, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        P(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

xe(LetBinding);

Re(LetBinding, (() => "updateTarget"));

D(LetBinding);

be(true)(LetBinding);

let De;

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
        L(this.ast, this.scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.ot.state && (4 & this.ft.type) > 0;
        const e = this.mode > 1;
        if (e) this.obs.version++;
        const i = T(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (t) {
            Ee = this.dt;
            this.dt = this.lt.queueTask((() => {
                this.updateTarget(i);
                this.dt = null;
            }), Pe);
            Ee?.cancel();
            Ee = null;
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
        E(this.ast, t, this);
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
            s.subscribe(this.gt ?? (this.gt = new BindingTargetSubscriber(this, this.l.get(ke))));
            if (!n) this.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        P(this.ast, this.scope, this);
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
        if (null != this.gt) throw dt(`AURxxxx: binding already has a target subscriber`);
        this.gt = t;
    }
}

xe(PropertyBinding);

Re(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

D(PropertyBinding);

be(true, false)(PropertyBinding);

let Ee = null;

const Pe = {
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
        E(this.ast, t, this);
        L(this.ast, this.scope, this, this.target);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (T(this.ast, this.scope, this, null) === this.target) L(this.ast, this.scope, this, null);
        P(this.ast, this.scope, this);
        this.scope = void 0;
    }
}

be(false)(RefBinding);

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
        E(this.ast, t, this);
        this.target.addEventListener(this.targetEvent, this, this.vt);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        P(this.ast, this.scope, this);
        this.scope = void 0;
        this.target.removeEventListener(this.targetEvent, this, this.vt);
    }
}

xe(ListenerBinding);

Re(ListenerBinding, (() => "callSource"));

be(true, true)(ListenerBinding);

const Le = Ut("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(jt(Le, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Oe = Object.freeze({
    creating: $e("creating"),
    hydrating: $e("hydrating"),
    hydrated: $e("hydrated"),
    activating: $e("activating"),
    activated: $e("activated"),
    deactivating: $e("deactivating"),
    deactivated: $e("deactivated")
});

function $e(t) {
    function e(e, i) {
        if (xt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ue(t, e) {
    if (null == t) throw dt(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!xt(e) && (null == e || !(e in l.prototype))) throw dt(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!xt(r?.value)) throw dt(`AUR0774:${String(n)}`);
        je.add(l, h);
        if (We(l)) Xe(l).watches.push(h);
        if (zs(l)) Ks(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const qe = l;

const _e = lt("watch");

const je = Object.freeze({
    name: _e,
    add(t, e) {
        let i = it(_e, t);
        if (null == i) nt(_e, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return it(_e, t) ?? qe;
    }
});

function Fe(t) {
    return function(e) {
        return Ge(t, e);
    };
}

function Me(t) {
    return function(e) {
        return Ge(bt(t) ? {
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
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(e, i(He(e, "name"), s), c(He(e, "aliases"), n.aliases, e.aliases), Ne(s), i(He(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(He(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Tt.from(e, ...Tt.getAll(e), He(e, "bindables"), e.bindables, n.bindables), i(He(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), c(je.getAnnotation(e), e.watches), c(He(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Mt(i, e).register(t);
        _t(i, e).register(t);
        Ht(s, Ke, i, t);
    }
}

const Ve = ht("custom-attribute");

const Ne = t => `${Ve}:${t}`;

const He = (t, e) => it(lt(e), t);

const We = t => xt(t) && st(Ve, t);

const ze = (t, e) => ps(t, Ne(e)) ?? void 0;

const Ge = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    nt(Ve, i, i.Type);
    nt(Ve, i, i);
    ct(e, Ve);
    return i.Type;
};

const Xe = t => {
    const e = it(Ve, t);
    if (void 0 === e) throw dt(`AUR0759:${t.name}`);
    return e;
};

const Ke = Object.freeze({
    name: Ve,
    keyFrom: Ne,
    isType: We,
    for: ze,
    define: Ge,
    getDefinition: Xe,
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: He
});

function Qe(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt(Ze, ChildrenDefinition.create(e, i), t.constructor, e);
        at(t.constructor, Je.keyFrom(e));
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

function Ye(t) {
    return t.startsWith(Ze);
}

const Ze = lt("children-observer");

const Je = Object.freeze({
    name: Ze,
    keyFrom: t => `${Ze}:${t}`,
    from(...t) {
        const e = {};
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function s(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function n(t) {
            if (wt(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => s(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(t) {
        const i = Ze.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        while (--r >= 0) {
            c = n[r];
            l = ut(c).filter(Ye);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = it(Ze, c, l[t].slice(i));
        }
        return s;
    }
});

const ti = {
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? ti, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = ei, r = ii, o = si, l) {
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
        return ri(this.controller, this.query, this.filter, this.map);
    }
}

I()(ChildrenObserver);

function ei(t) {
    return t.host.childNodes;
}

function ii(t, e, i) {
    return !!i;
}

function si(t, e, i) {
    return i;
}

const ni = {
    optional: true
};

function ri(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Gs(l, ni);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

const oi = a;

const li = (t, e, i, s) => {
    t.addEventListener(e, i, s);
};

const hi = (t, e, i, s) => {
    t.removeEventListener(e, i, s);
};

const ci = t => {
    const e = t.prototype;
    Rt(e, "subscribe", (function(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            for (ai of this.xt.events) li(this.bt, ai, this);
            this.yt = true;
            this.kt?.();
        }
    }));
    Rt(e, "unsubscribe", (function(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            for (ai of this.xt.events) hi(this.bt, ai, this);
            this.yt = false;
            this.At?.();
        }
    }));
    Rt(e, "useConfig", (function(t) {
        this.xt = t;
        if (this.yt) {
            for (ai of this.xt.events) hi(this.bt, ai, this);
            for (ai of this.xt.events) li(this.bt, ai, this);
        }
    }));
};

let ai;

const ui = t => {
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
            const i = fi(t);
            let s = this.Rt;
            this.ov = t;
            if (i.length > 0) this.Bt(i);
            this.Rt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!mt.call(e, t) || e[t] !== s) continue;
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

function fi(t) {
    if (bt(t)) return di(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...fi(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...di(i)); else e.push(i);
    return e;
}

function di(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

ui(ClassAttributeAccessor);

function mi(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Ge({
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
                this.element.className = fi(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ ws ], e));
        t.register(s);
    }
}

function gi(...t) {
    return new ShadowDOMRegistry(t);
}

const pi = Ut("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(oi))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(wi);
        const i = t.get(pi);
        t.register(jt(vi, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ oi ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ oi ];

const vi = Ut("IShadowDOMStyles");

const wi = Ut("IShadowDOMGlobalStyles", (t => t.instance({
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
                const i = e.get(pi);
                e.register(jt(wi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: bi, exit: yi} = O;

const {wrap: ki, unwrap: Ai} = $;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.$get = i;
        this.cb = s;
        this.useProxy = n;
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
        if (!Object.is(i, e)) this.cb.call(t, i, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            bi(this);
            return this.value = Ai(this.$get.call(void 0, this.useProxy ? ki(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            yi(this);
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
        if (!Object.is(t, s)) {
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

D(ComputedWatcher);

D(ExpressionWatcher);

be(true)(ExpressionWatcher);

const Ci = Ut("ILifecycleHooks");

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
        qt(Ci, this.Type).register(t);
    }
}

const Ri = new WeakMap;

const Bi = lt("lifecycle-hooks");

const Si = Object.freeze({
    name: Bi,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        nt(Bi, i, e);
        ct(e, Bi);
        return i.Type;
    },
    resolve(t) {
        let e = Ri.get(t);
        if (void 0 === e) {
            Ri.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Ci) : t.has(Ci, false) ? i.getAll(Ci).concat(t.getAll(Ci)) : i.getAll(Ci);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = it(Bi, n.constructor);
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

function Ii() {
    return function t(e) {
        return Si.define({}, e);
    };
}

const Ti = Ut("IViewFactory");

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

const Di = new WeakSet;

function Ei(t) {
    return !Di.has(t);
}

function Pi(t) {
    Di.add(t);
    return CustomElementDefinition.create(t);
}

const Li = ht("views");

const Oi = Object.freeze({
    name: Li,
    has(t) {
        return xt(t) && (st(Li, t) || "$views" in t);
    },
    get(t) {
        if (xt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Ei).map(Pi);
            for (const e of i) Oi.add(t, e);
        }
        let e = it(Li, t);
        if (void 0 === e) nt(Li, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = it(Li, t);
        if (void 0 === s) nt(Li, s = [ i ], t); else s.push(i);
        return s;
    }
});

function $i(t) {
    return function(e) {
        Oi.add(e, t);
    };
}

const Ui = Ut("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.St = new WeakMap;
        this.It = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Oi.has(t.constructor) ? Oi.get(t.constructor) : [];
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
            n = Ws(Ks(r), class extends r {
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
            n = Ws(this.Pt(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const s = this.viewModel;
                    t.scope = U.fromParent(t.scope, s);
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
        if (void 0 === i) throw dt(`Could not find view: ${e}`);
        return i;
    }
}

const qi = Ut("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.Lt = new WeakMap;
        this.Ot = new WeakMap;
        this.p = (this.$t = t.root).get(oi);
        this.Ut = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.qt ? this.qt = this.$t.getAll(an, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), ft()) : this.qt;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.Lt;
            const n = e.get(cn);
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
                if (bt(r)) o.innerHTML = r;
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
        if (e.length !== n.length) throw dt(`AUR0757:${o}<>${n.length}`);
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

var _i;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(_i || (_i = {}));

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

const Mi = new WeakMap;

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
        this._t = null;
        this.state = 0;
        this.jt = false;
        this.Ft = l;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.Mt = 0;
        this.Vt = 0;
        this.Nt = 0;
        this.Ht = n;
        this.Wt = 2 === e ? HooksDefinition.none : new HooksDefinition(n);
        this.location = o;
        this.r = t.root.get(qi);
    }
    get lifecycleHooks() {
        return this._t;
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
        return Mi.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw dt(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (Mi.has(e)) return Mi.get(e);
        n = n ?? Ks(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(f(es));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        Vt(t, es, new d("IHydrationContext", new HydrationContext(o, s, l)));
        Mi.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (Mi.has(e)) return Mi.get(e);
        s = s ?? Xe(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        Mi.set(e, n);
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
        this.scope = U.create(n, null, true);
        if (r.watches.length > 0) Gi(this, i, r, n);
        Ni(this, r, s, n);
        this.Ft = Hi(this, r, n);
        if (this.Wt.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this._t = Si.resolve(i);
        r.register(i);
        if (null !== r.injectable) Vt(i, r.injectable, new d("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this._t.hydrating) this._t.hydrating.forEach(ns, this);
        if (this.Wt.hasHydrating) this.Ht.hydrating(this);
        const e = this.Xt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = Gs(this.host, Fi))) {
            this.host = this.container.root.get(oi).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Cs(this.host);
        }
        vs(this.host, Ms, this);
        vs(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw dt(`AUR0501`);
            vs(this.shadowRoot = this.host.attachShadow(i ?? Qi), Ms, this);
            vs(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            vs(o, Ms, this);
            vs(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.Ht.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this._t.hydrated) this._t.hydrated.forEach(rs, this);
        if (this.Wt.hasHydrated) this.Ht.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Xt, this.host);
        if (void 0 !== this._t.created) this._t.created.forEach(ss, this);
        if (this.Wt.hasCreated) this.Ht.created(this);
    }
    zt() {
        const t = this.definition;
        const e = this.Ht;
        if (t.watches.length > 0) Gi(this, this.container, t, e);
        Ni(this, t, this.flags, e);
        e.$controller = this;
        this._t = Si.resolve(this.container);
        if (void 0 !== this._t.created) this._t.created.forEach(ss, this);
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
            throw dt(`AUR0502:${this.name}`);

          default:
            throw dt(`AUR0503:${this.name} ${Ji(this.state)}`);
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
            if (void 0 === s || null === s) throw dt(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = t;
        this.$flags = i;
        this.Kt();
        let n;
        if (2 !== this.vmKind && null != this._t.binding) n = m(...this._t.binding.map(os, this));
        if (this.Wt.hasBinding) n = m(n, this.Ht.binding(this.$initiator, this.parent, this.$flags));
        if (vt(n)) {
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
        let e = this.Ft.length;
        let i;
        if (e > 0) while (e > t) {
            this.Ft[t].start();
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
        if (2 !== this.vmKind && null != this._t.bound) i = m(...this._t.bound.map(ls, this));
        if (this.Wt.hasBound) i = m(i, this.Ht.bound(this.$initiator, this.parent, this.$flags));
        if (vt(i)) {
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
                const e = t.has(vi, false) ? t.get(vi) : t.get(wi);
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
        if (2 !== this.vmKind && null != this._t.attaching) e = m(...this._t.attaching.map(hs, this));
        if (this.Wt.hasAttaching) e = m(e, this.Ht.attaching(this.$initiator, this.parent, this.$flags));
        if (vt(e)) {
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
            throw dt(`AUR0505:${this.name} ${Ji(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.ee();
        let s = 0;
        let n;
        if (this.Ft.length) for (;s < this.Ft.length; ++s) this.Ft[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this._t.detaching) n = m(...this._t.detaching.map(as, this));
        if (this.Wt.hasDetaching) n = m(n, this.Ht.detaching(this.$initiator, this.parent, this.$flags));
        if (vt(n)) {
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
            fs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            fs();
            fs = void 0;
        }
    }
    Yt(t) {
        if (void 0 !== this.$promise) {
            ds = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            ds(t);
            ds = void 0;
        }
        if (this.$initiator !== this) this.parent.Yt(t);
    }
    Kt() {
        ++this.Mt;
        if (this.$initiator !== this) this.parent.Kt();
    }
    te() {
        if (0 === --this.Mt) {
            if (2 !== this.vmKind && null != this._t.attached) ms = m(...this._t.attached.map(cs, this));
            if (this.Wt.hasAttached) ms = m(ms, this.Ht.attached(this.$initiator, this.$flags));
            if (vt(ms)) {
                this.Qt();
                ms.then((() => {
                    this.state = 2;
                    this.se();
                    if (this.$initiator !== this) this.parent.te();
                })).catch((t => {
                    this.Yt(t);
                }));
                ms = void 0;
                return;
            }
            ms = void 0;
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
                if (2 !== t.vmKind && null != t._t.unbinding) e = m(...t._t.unbinding.map(us, this));
                if (t.Wt.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = m(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (vt(e)) {
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
            return Xe(this.Ht.constructor).name === t;

          case 0:
            return Ks(this.Ht.constructor).name === t;

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
            vs(t, Ms, this);
            vs(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            vs(t, Ms, this);
            vs(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            vs(t, Ms, this);
            vs(t, this.definition.key, this);
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
            this.children.forEach(is);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.Ht) {
            Mi.delete(this.Ht);
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

function Vi(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Ni(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = Vi(s);
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

function Hi(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = Vi(i);
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

const Wi = new Map;

const zi = t => {
    let e = Wi.get(t);
    if (null == e) {
        e = new F(t, 0);
        Wi.set(t, e);
    }
    return e;
};

function Gi(t, e, i, s) {
    const n = e.get(_);
    const r = e.get(j);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : U.create(s, null, true);
    const h = o.length;
    let c;
    let a;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: c, callback: a} = o[f]);
        a = xt(a) ? a : Reflect.get(s, a);
        if (!xt(a)) throw dt(`AUR0506:${String(a)}`);
        if (xt(c)) t.addBinding(new ComputedWatcher(s, n, c, a, true)); else {
            u = bt(c) ? r.parse(c, 8) : zi(c);
            t.addBinding(new ExpressionWatcher(l, e, n, u, a));
        }
    }
}

function Xi(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Ki(t) {
    return S(t) && zs(t.constructor);
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

const Qi = {
    mode: "open"
};

var Yi;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(Yi || (Yi = {}));

var Zi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Zi || (Zi = {}));

function Ji(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const ts = Ut("IController");

const es = Ut("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function is(t) {
    t.dispose();
}

function ss(t) {
    t.instance.created(this.Ht, this);
}

function ns(t) {
    t.instance.hydrating(this.Ht, this);
}

function rs(t) {
    t.instance.hydrated(this.Ht, this);
}

function os(t) {
    return t.instance.binding(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function ls(t) {
    return t.instance.bound(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function hs(t) {
    return t.instance.attaching(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function cs(t) {
    return t.instance.attached(this.Ht, this["$initiator"], this["$flags"]);
}

function as(t) {
    return t.instance.detaching(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function us(t) {
    return t.instance.unbinding(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

let fs;

let ds;

let ms;

const gs = Ut("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.oe = void 0;
        this.host = t.host;
        s.prepare(this);
        Vt(i, e.HTMLElement, Vt(i, e.Element, Vt(i, ws, new d("ElementResolver", t.host))));
        this.oe = g(this.le("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (zs(e)) n = this.container.get(e); else n = t.component;
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

function ps(t, e) {
    return t.$au?.[e] ?? null;
}

function vs(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const ws = Ut("INode");

const xs = Ut("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(gs, true)) return t.get(gs).host;
    return t.get(oi).document;
}))));

const bs = Ut("IRenderLocation");

const ys = new WeakMap;

function ks(t) {
    if (ys.has(t)) return ys.get(t);
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
        const e = Gs(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return ks(e.host);
    }
    return t.parentNode;
}

function As(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ys.set(i[t], e);
    } else ys.set(t, e);
}

function Cs(t) {
    if (Rs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function Rs(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Cs(r); else o[s] = r;
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
        if (Rs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Bs = Ut("IWindow", (t => t.callback((t => t.get(oi).window))));

const Ss = Ut("ILocation", (t => t.callback((t => t.get(Bs).location))));

const Is = Ut("IHistory", (t => t.callback((t => t.get(Bs).history))));

function Ts(t) {
    return function(e) {
        return Ws(t, e);
    };
}

function Ds(t) {
    if (void 0 === t) return function(t) {
        Hs(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!xt(t)) return function(e) {
        Hs(e, "shadowOptions", t);
    };
    Hs(t, "shadowOptions", {
        mode: "open"
    });
}

function Es(t) {
    if (void 0 === t) return function(t) {
        Ps(t);
    };
    Ps(t);
}

function Ps(t) {
    const e = it(Ms, t);
    if (void 0 === e) {
        Hs(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function Ls(t) {
    if (void 0 === t) return function(t) {
        Hs(t, "isStrictBinding", true);
    };
    Hs(t, "isStrictBinding", true);
}

const Os = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, c, a, u, f, d, m, g, p, v, w, x, b) {
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
        this.watches = x;
        this.processContent = b;
    }
    get type() {
        return 1;
    }
    static create(t, e = null) {
        if (null === e) {
            const i = t;
            if (bt(i)) throw dt(`AUR0761:${t}`);
            const s = p("name", i, Ns);
            if (xt(i.Type)) e = i.Type; else e = Ys(v(s));
            return new CustomElementDefinition(e, s, c(i.aliases), p("key", i, (() => Vs(s))), p("cache", i, Us), p("capture", i, _s), p("template", i, qs), c(i.instructions), c(i.dependencies), p("injectable", i, qs), p("needsCompile", i, js), c(i.surrogates), Tt.from(e, i.bindables), Je.from(i.childrenObservers), p("containerless", i, _s), p("isStrictBinding", i, _s), p("shadowOptions", i, qs), p("hasSlots", i, _s), p("enhance", i, _s), p("watches", i, Fs), w("processContent", e, qs));
        }
        if (bt(t)) return new CustomElementDefinition(e, t, c(Xs(e, "aliases"), e.aliases), Vs(t), w("cache", e, Us), w("capture", e, _s), w("template", e, qs), c(Xs(e, "instructions"), e.instructions), c(Xs(e, "dependencies"), e.dependencies), w("injectable", e, qs), w("needsCompile", e, js), c(Xs(e, "surrogates"), e.surrogates), Tt.from(e, ...Tt.getAll(e), Xs(e, "bindables"), e.bindables), Je.from(...Je.getAll(e), Xs(e, "childrenObservers"), e.childrenObservers), w("containerless", e, _s), w("isStrictBinding", e, _s), w("shadowOptions", e, qs), w("hasSlots", e, _s), w("enhance", e, _s), c(je.getAnnotation(e), e.watches), w("processContent", e, qs));
        const i = p("name", t, Ns);
        return new CustomElementDefinition(e, i, c(Xs(e, "aliases"), t.aliases, e.aliases), Vs(i), x("cache", t, e, Us), x("capture", t, e, _s), x("template", t, e, qs), c(Xs(e, "instructions"), t.instructions, e.instructions), c(Xs(e, "dependencies"), t.dependencies, e.dependencies), x("injectable", t, e, qs), x("needsCompile", t, e, js), c(Xs(e, "surrogates"), t.surrogates, e.surrogates), Tt.from(e, ...Tt.getAll(e), Xs(e, "bindables"), e.bindables, t.bindables), Je.from(...Je.getAll(e), Xs(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), x("containerless", t, e, _s), x("isStrictBinding", t, e, _s), x("shadowOptions", t, e, qs), x("hasSlots", t, e, _s), x("enhance", t, e, _s), c(t.watches, je.getAnnotation(e), e.watches), x("processContent", t, e, qs));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Os.has(t)) return Os.get(t);
        const e = CustomElementDefinition.create(t);
        Os.set(t, e);
        nt(Ms, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            Mt(i, e).register(t);
            _t(i, e).register(t);
            Ht(s, Zs, i, t);
        }
    }
}

const $s = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Us = () => 0;

const qs = () => null;

const _s = () => false;

const js = () => true;

const Fs = () => l;

const Ms = ht("custom-element");

const Vs = t => `${Ms}:${t}`;

const Ns = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Hs = (t, e, i) => {
    nt(lt(e), i, t);
};

const Ws = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    nt(Ms, i, i.Type);
    nt(Ms, i, i);
    ct(i.Type, Ms);
    return i.Type;
};

const zs = t => xt(t) && st(Ms, t);

const Gs = (t, e = $s) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = ps(t, Ms);
        if (null === i) {
            if (true === e.optional) return null;
            throw dt(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = ps(t, Ms);
            if (null === i) throw dt(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = ps(i, Ms);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = ks(i);
        }
        if (s) return;
        throw dt(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = ps(i, Ms);
        if (null !== t) return t;
        i = ks(i);
    }
    throw dt(`AUR0765`);
};

const Xs = (t, e) => it(lt(e), t);

const Ks = t => {
    const e = it(Ms, t);
    if (void 0 === e) throw dt(`AUR0760:${t.name}`);
    return e;
};

const Qs = () => {
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

const Ys = function() {
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

const Zs = Object.freeze({
    name: Ms,
    keyFrom: Vs,
    isType: zs,
    for: Gs,
    define: Ws,
    getDefinition: Ks,
    annotate: Hs,
    getAnnotation: Xs,
    generateName: Ns,
    createInjectable: Qs,
    generateType: Ys
});

const Js = lt("processContent");

function tn(t) {
    return void 0 === t ? function(t, e, i) {
        nt(Js, en(t, e), t);
    } : function(e) {
        t = en(e, t);
        const i = it(Ms, e);
        if (void 0 !== i) i.processContent = t; else nt(Js, t, e);
        return e;
    };
}

function en(t, e) {
    if (bt(e)) e = t[e];
    if (!xt(e)) throw dt(`AUR0766:${typeof e}`);
    return e;
}

function sn(t) {
    return function(e) {
        const i = xt(t) ? t : true;
        Hs(e, "capture", i);
        if (zs(e)) Ks(e).capture = i;
    };
}

const nn = Ut("IProjections");

const rn = Ut("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var on;

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
    t["textBinding"] = "ha";
    t["listenerBinding"] = "hb";
    t["attributeBinding"] = "hc";
    t["stylePropertyBinding"] = "hd";
    t["setAttribute"] = "he";
    t["setClassAttribute"] = "hf";
    t["setStyleAttribute"] = "hg";
    t["spreadBinding"] = "hs";
    t["spreadElementProp"] = "hp";
})(on || (on = {}));

const ln = Ut("Instruction");

function hn(t) {
    const e = t.type;
    return bt(e) && 2 === e.length;
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
    constructor(t, e) {
        this.from = t;
        this.to = e;
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

const cn = Ut("ITemplateCompiler");

const an = Ut("IRenderer");

function un(t) {
    return function e(i) {
        i.register = function(t) {
            qt(an, this).register(t);
        };
        yt(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function fn(t, e, i) {
    if (bt(e)) return t.parse(e, i);
    return e;
}

function dn(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function mn(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Gs(t);

      case "view":
        throw dt(`AUR0750`);

      case "view-model":
        return Gs(t).viewModel;

      default:
        {
            const i = ze(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = Gs(t, {
                name: e
            });
            if (void 0 === s) throw dt(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let gn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = dn(e);
        if (void 0 !== s.$observers?.[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

gn = tt([ un("re") ], gn);

let pn = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ qi, oi ];
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
            s = c.find(Zs, l);
            if (null == s) throw dt(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Cs(e) : null;
        const f = _n(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        Vt(f, n, new d(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        vs(e, s.key, o);
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

pn = tt([ un("ra") ], pn);

let vn = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ qi, oi ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ke, i.res);
            if (null == n) throw dt(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = jn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        vs(e, n.key, o);
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

vn = tt([ un("rb") ], vn);

let wn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ qi, oi ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ke, i.res);
            if (null == n) throw dt(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Cs(e);
        const l = jn(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        vs(o, n.key, h);
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

wn = tt([ un("rc") ], wn);

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
            h = fn(this.ep, l.from, 8);
            t.addBinding(new LetBinding(r, this.oL, h, l.to, n));
            ++c;
        }
    }
};

xn.inject = [ j, _ ];

xn = tt([ un("rd") ], xn);

let bn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = fn(this.ep, i.from, 8);
        t.addBinding(new RefBinding(t.container, s, mn(e, i.to)));
    }
};

bn.inject = [ j ];

bn = tt([ un("rj") ], bn);

let yn = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = fn(this.ep, i.from, 1);
        t.addBinding(new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, dn(e), i.to, 2));
    }
};

yn.inject = [ j, _, oi ];

yn = tt([ un("rf") ], yn);

let kn = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = fn(this.ep, i.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, dn(e), i.to, i.mode));
    }
};

kn.inject = [ j, _, oi ];

kn = tt([ un("rg") ], kn);

let An = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = fn(this.ep, i.from, 2);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, dn(e), i.to, 2));
    }
};

An.inject = [ j, _, oi ];

An = tt([ un("rk") ], An);

let Cn = class TextBindingRenderer {
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
        const l = fn(this.ep, i.from, 1);
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

Cn.inject = [ j, _, oi ];

Cn = tt([ un("ha") ], Cn);

let Rn = class ListenerBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = fn(this.ep, i.from, 4);
        t.addBinding(new ListenerBinding(t.container, s, e, i.to, new ListenerBindingOptions(i.preventDefault, i.capture)));
    }
};

Rn.inject = [ j ];

Rn = tt([ un("hb") ], Rn);

let Bn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Bn = tt([ un("he") ], Bn);

let Sn = class SetClassAttributeRenderer {
    render(t, e, i) {
        Pn(e.classList, i.value);
    }
};

Sn = tt([ un("hf") ], Sn);

let In = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

In = tt([ un("hg") ], In);

let Tn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = fn(this.ep, i.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, 2));
    }
};

Tn.inject = [ j, _, oi ];

Tn = tt([ un("hd") ], Tn);

let Dn = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = fn(this.ep, i.from, 8);
        t.addBinding(new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, 2));
    }
};

Dn.inject = [ oi, j, _ ];

Dn = tt([ un("hc") ], Dn);

let En = class SpreadRenderer {
    constructor(t, e) {
        this.he = t;
        this.r = e;
    }
    static get inject() {
        return [ cn, qi ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(es);
        const r = this.r.renderers;
        const o = t => {
            let e = t;
            let i = n;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw dt("No scope context for spread binding.");
            return i;
        };
        const h = i => {
            const s = o(i);
            const n = Ln(s);
            const c = this.he.compileSpread(s.controller.definition, s.instruction?.captures ?? l, s.controller.container, e);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                r[a.instructions.type].render(n, Gs(e), a.instructions);
                break;

              default:
                r[a.type].render(n, e, a);
            }
            t.addBinding(n);
        };
        h(0);
    }
};

En = tt([ un("hs") ], En);

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
        if (null == e) throw dt("Invalid spreading. Context scope is null/undefined");
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
        if (1 !== t.vmKind) throw dt("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
    limit() {
        throw dt("not implemented");
    }
    useScope() {
        throw dt("not implemented");
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

const Ln = t => new SpreadBinding([], t);

const On = "IController";

const $n = "IInstruction";

const Un = "IRenderLocation";

const qn = "IAuSlotsInfo";

function _n(t, e, i, s, n, r) {
    const o = e.container.createChild();
    Vt(o, t.HTMLElement, Vt(o, t.Element, Vt(o, ws, new d("ElementResolver", i))));
    Vt(o, ts, new d(On, e));
    Vt(o, ln, new d($n, s));
    Vt(o, bs, null == n ? Fn : new RenderLocationProvider(n));
    Vt(o, Ti, Mn);
    Vt(o, rn, null == r ? Vn : new d(qn, r));
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
        if (null === t) throw dt(`AUR7055`);
        if (!bt(t.name) || 0 === t.name.length) throw dt(`AUR0756`);
        return t;
    }
}

function jn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    Vt(h, t.HTMLElement, Vt(h, t.Element, Vt(h, ws, new d("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    Vt(h, ts, new d(On, i));
    Vt(h, ln, new d($n, n));
    Vt(h, bs, null == o ? Fn : new d(Un, o));
    Vt(h, Ti, null == r ? Mn : new ViewFactoryProvider(r));
    Vt(h, rn, null == l ? Vn : new d(qn, l));
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

const Mn = new ViewFactoryProvider(null);

const Vn = new d(qn, new AuSlotsInfo(l));

var Nn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Nn || (Nn = {}));

function Hn(t) {
    return function(e) {
        return Xn.define(t, e);
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
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, i(Gn(e, "name"), s), c(Gn(e, "aliases"), n.aliases, e.aliases), zn(s), i(Gn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        qt(i, e).register(t);
        _t(i, e).register(t);
        Ht(s, Xn, i, t);
    }
}

const Wn = ht("binding-command");

const zn = t => `${Wn}:${t}`;

const Gn = (t, e) => it(lt(e), t);

const Xn = Object.freeze({
    name: Wn,
    keyFrom: zn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        nt(Wn, i, i.Type);
        nt(Wn, i, i);
        ct(e, Wn);
        return i.Type;
    },
    getAnnotation: Gn
});

let Kn = class OneTimeBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 1);
    }
};

Kn = tt([ Hn("one-time") ], Kn);

let Qn = class ToViewBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 2);
    }
};

Qn = tt([ Hn("to-view") ], Qn);

let Yn = class FromViewBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 4);
    }
};

Yn = tt([ Hn("from-view") ], Yn);

let Zn = class TwoWayBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 6);
    }
};

Zn = tt([ Hn("two-way") ], Zn);

let Jn = class DefaultBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(h, 8), l, o);
    }
};

Jn = tt([ Hn("bind") ], Jn);

let tr = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? b(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(e.parse(t.attr.rawValue, 2), i);
    }
};

tr = tt([ Hn("for") ], tr);

let er = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, false);
    }
};

er = tt([ Hn("trigger") ], er);

let ir = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, true);
    }
};

ir = tt([ Hn("capture") ], ir);

let sr = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

sr = tt([ Hn("attr") ], sr);

let nr = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

nr = tt([ Hn("style") ], nr);

let rr = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

rr = tt([ Hn("class") ], rr);

let or = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

or = tt([ Hn("ref") ], or);

let lr = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

lr = tt([ Hn("...$attrs") ], lr);

const hr = Ut("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const cr = t => {
    const e = ft();
    t = bt(t) ? t.split(" ") : t;
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
        this.ue = Object.assign(ft(), {
            a: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: cr("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: ft(),
            altGlyphDef: cr("id xml:base xml:lang xml:space"),
            altglyphdef: ft(),
            altGlyphItem: cr("id xml:base xml:lang xml:space"),
            altglyphitem: ft(),
            animate: cr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: cr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: cr("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: cr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: cr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: cr("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": cr("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: cr("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: cr("class id style xml:base xml:lang xml:space"),
            ellipse: cr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: cr("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: cr("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: cr("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: cr("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: cr("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: cr("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: cr("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: cr("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: cr("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: cr("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: cr("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: cr("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: cr("id xml:base xml:lang xml:space"),
            feMorphology: cr("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: cr("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: cr("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: cr("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: cr("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: cr("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: cr("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: cr("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: cr("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": cr("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": cr("id string xml:base xml:lang xml:space"),
            "font-face-name": cr("id name xml:base xml:lang xml:space"),
            "font-face-src": cr("id xml:base xml:lang xml:space"),
            "font-face-uri": cr("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: cr("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: cr("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: ft(),
            hkern: cr("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: cr("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: cr("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: cr("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: cr("id xml:base xml:lang xml:space"),
            "missing-glyph": cr("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: cr("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: cr("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: cr("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: cr("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: cr("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: cr("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: cr("class id offset style xml:base xml:lang xml:space"),
            style: cr("id media title type xml:base xml:lang xml:space"),
            svg: cr("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: cr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: cr("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: cr("class id style xml:base xml:lang xml:space"),
            tref: cr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: cr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: cr("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: cr("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.fe = cr("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.de = cr("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.ue;
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
        return qt(hr, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.fe[t.nodeName] && true === this.de[e] || true === this.ue[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ oi ];

const ar = Ut("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.me = ft();
        this.ge = ft();
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
        return [ hr ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.me)[n] ?? (e[n] = ft());
            for (r in i) {
                if (void 0 !== s[r]) throw fr(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.ge;
        for (const i in t) {
            if (void 0 !== e[i]) throw fr(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return ur(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.me[t.nodeName]?.[e] ?? this.ge[e] ?? (pt(t, e, this.svg) ? e : null);
    }
}

function ur(t, e) {
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

function fr(t, e) {
    return dt(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const dr = Ut("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const mr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.pe = t.document.createElement("template");
    }
    createTemplate(t) {
        if (bt(t)) {
            let e = mr[t];
            if (void 0 === e) {
                const i = this.pe;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.pe = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                mr[t] = e;
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

TemplateElementFactory.inject = [ oi ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return qt(cn, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = vr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = bt(s.template) || !t.enhance ? n.ve.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const c = e.get($t(Sr));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(Cr)) throw dt(`AUR0701`);
        this.we(h, n);
        this.xe(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Ns(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.be(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, vr, null, null, void 0);
        const r = [];
        const o = n.ye(s.nodeName.toLowerCase());
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
        let x;
        let y;
        let k;
        let A;
        for (;c > a; ++a) {
            u = e[a];
            k = u.target;
            A = u.rawValue;
            w = n.ke(u);
            if (null !== w && (1 & w.type) > 0) {
                xr.node = s;
                xr.attr = u;
                xr.bindable = null;
                xr.def = null;
                r.push(w.build(xr, n.ep, n.m));
                continue;
            }
            f = n.Ae(k);
            if (null !== f) {
                if (f.isTemplateController) throw dt(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === w && gr(A);
                if (y) m = this.Ce(s, A, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        x = h.parse(A, 1);
                        m = [ null === x ? new SetPropertyInstruction(A, v.property) : new InterpolationInstruction(x, v.property) ];
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
                x = h.parse(A, 1);
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        x = h.parse(A, 1);
                        r.push(new SpreadElementPropBindingInstruction(null == x ? new SetPropertyInstruction(A, p.property) : new InterpolationInstruction(x, p.property)));
                        continue;
                    }
                }
                if (null != x) r.push(new InterpolationInstruction(x, n.m.map(s, k) ?? b(k))); else switch (k) {
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
        pr();
        if (null != d) return d.concat(r);
        return r;
    }
    be(t, e) {
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
        let x;
        let y;
        for (;r > o; ++o) {
            l = s[o];
            h = l.name;
            c = l.value;
            a = e.Re.parse(h, c);
            x = a.target;
            y = a.rawValue;
            if (br[x]) throw dt(`AUR0702:${h}`);
            p = e.ke(a);
            if (null !== p && (1 & p.type) > 0) {
                xr.node = t;
                xr.attr = a;
                xr.bindable = null;
                xr.def = null;
                i.push(p.build(xr, e.ep, e.m));
                continue;
            }
            u = e.Ae(x);
            if (null !== u) {
                if (u.isTemplateController) throw dt(`AUR0703:${x}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && gr(y);
                if (w) d = this.Ce(t, y, u, e); else {
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
                (f ?? (f = [])).push(new HydrateAttributeInstruction(this.resolveResources ? u : u.name, null != u.aliases && u.aliases.includes(x) ? x : void 0, d));
                continue;
            }
            if (null === p) {
                v = n.parse(y, 1);
                if (null != v) {
                    t.removeAttribute(h);
                    --o;
                    --r;
                    i.push(new InterpolationInstruction(v, e.m.map(t, x) ?? b(x)));
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
        pr();
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
            c = e.Re.parse(a, u);
            d = c.target;
            m = c.rawValue;
            f = e.ke(c);
            if (null !== f) {
                if ("bind" === c.command) n.push(new LetBindingInstruction(r.parse(m, 8), b(d))); else throw dt(`AUR0704:${c.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new M(m) : g, b(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.Te(t).nextSibling;
    }
    Se(t, e) {
        var i, s, r, o;
        const h = t.nextSibling;
        const c = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const a = e.ye(c);
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
        let x;
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
        let q;
        let _ = null;
        let j;
        let F;
        let M;
        let V;
        let N = true;
        let H = false;
        let W = false;
        if ("slot" === c) {
            if (null == e.root.def.shadowOptions) throw dt(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (u) {
            N = a.processContent?.call(a.Type, t, e.p);
            w = t.attributes;
            y = w.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw dt(`AUR0705`);
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
            B = e.Re.parse(C, R);
            _ = e.ke(B);
            M = B.target;
            V = B.rawValue;
            if (d && (!m || m && d(M))) {
                if (null != _ && 1 & _.type) {
                    v();
                    g.push(B);
                    continue;
                }
                W = "au-slot" !== M && "slot" !== M;
                if (W) {
                    j = BindablesInfo.from(a, false);
                    if (null == j.attrs[M] && !e.Ae(M)?.isTemplateController) {
                        v();
                        g.push(B);
                        continue;
                    }
                }
            }
            if (null !== _ && 1 & _.type) {
                xr.node = t;
                xr.attr = B;
                xr.bindable = null;
                xr.def = null;
                (S ?? (S = [])).push(_.build(xr, e.ep, e.m));
                v();
                continue;
            }
            T = e.Ae(M);
            if (null !== T) {
                j = BindablesInfo.from(T, true);
                D = false === T.noMultiBindings && null === _ && gr(V);
                if (D) L = this.Ce(t, V, T, e); else {
                    F = j.primary;
                    if (null === _) {
                        U = p.parse(V, 1);
                        L = [ null === U ? new SetPropertyInstruction(V, F.property) : new InterpolationInstruction(U, F.property) ];
                    } else {
                        xr.node = t;
                        xr.attr = B;
                        xr.bindable = F;
                        xr.def = T;
                        L = [ _.build(xr, e.ep, e.m) ];
                    }
                }
                v();
                if (T.isTemplateController) (O ?? (O = [])).push(new HydrateTemplateController(wr, this.resolveResources ? T : T.name, void 0, L)); else (P ?? (P = [])).push(new HydrateAttributeInstruction(this.resolveResources ? T : T.name, null != T.aliases && T.aliases.includes(M) ? M : void 0, L));
                continue;
            }
            if (null === _) {
                if (u) {
                    j = BindablesInfo.from(a, false);
                    E = j.attrs[M];
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
                    (S ?? (S = [])).push(new InterpolationInstruction(U, e.m.map(t, M) ?? b(M)));
                }
                continue;
            }
            v();
            if (u) {
                j = BindablesInfo.from(a, false);
                E = j.attrs[M];
                if (void 0 !== E) {
                    xr.node = t;
                    xr.attr = B;
                    xr.bindable = E;
                    xr.def = a;
                    (I ?? (I = [])).push(_.build(xr, e.ep, e.m));
                    continue;
                }
            }
            xr.node = t;
            xr.attr = B;
            xr.bindable = null;
            xr.def = null;
            (S ?? (S = [])).push(_.build(xr, e.ep, e.m));
        }
        pr();
        if (this.De(t) && null != S && S.length > 1) this.Ee(t, S);
        if (u) {
            q = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, I ?? l, null, H, g);
            if (c === Lr) {
                const i = t.getAttribute("name") || Pr;
                const s = e.h("template");
                const n = e.Pe();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.xe(s.content, n);
                q.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: Ns(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Le(t, e);
            }
        }
        if (null != S || null != q || null != P) {
            x = l.concat(q ?? l, P ?? l, S ?? l);
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
            const o = e.Pe(null == x ? [] : [ x ]);
            let l;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v;
            let w;
            let b = 0, A = 0;
            let C = t.firstChild;
            let R = false;
            if (false !== N) while (null !== C) {
                h = 1 === C.nodeType ? C.getAttribute(Lr) : null;
                if (null !== h) C.removeAttribute(Lr);
                if (u) {
                    l = C.nextSibling;
                    if (!f) {
                        R = 3 === C.nodeType && "" === C.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = h || Pr] ?? (i[s] = [])).push(C);
                        t.removeChild(C);
                    }
                    C = l;
                } else {
                    if (null !== h) {
                        h = h || Pr;
                        throw dt(`AUR0706:${c}[${h}]`);
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
                    w = e.Pe();
                    this.xe(n.content, w);
                    d[h] = CustomElementDefinition.create({
                        name: Ns(),
                        template: n,
                        instructions: w.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (u && (H || a.containerless)) this.Le(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z) if ("TEMPLATE" === t.nodeName) this.xe(t.content, o); else {
                C = t.firstChild;
                while (null !== C) C = this.xe(C, o);
            }
            $.def = CustomElementDefinition.create({
                name: Ns(),
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
                    name: Ns(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ O[k + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ $ ]);
        } else {
            if (null != x) e.rows.push(x);
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
            let w = 0, b = 0;
            if (false !== N) while (null !== i) {
                n = 1 === i.nodeType ? i.getAttribute(Lr) : null;
                if (null !== n) i.removeAttribute(Lr);
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
                        throw dt(`AUR0706:${c}[${n}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != h) {
                l = {};
                for (n in h) {
                    g = e.h("template");
                    d = h[n];
                    for (w = 0, b = d.length; b > w; ++w) {
                        m = d[w];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.Pe();
                    this.xe(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: Ns(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = l;
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
    Ce(t, e, i, s) {
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
                f = s.Re.parse(l, h);
                d = s.ke(f);
                m = n.attrs[f.target];
                if (null == m) throw dt(`AUR0707:${i.name}.${f.target}`);
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
        pr();
        return o;
    }
    we(t, e) {
        const i = t;
        const s = y(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw dt(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw dt(`AUR0709`);
            const s = Rr(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const c = Tt.for(n);
            const a = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw dt(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw dt(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || a.has(e)) throw dt(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    a.add(e);
                }
                c.add({
                    property: e,
                    attribute: i ?? void 0,
                    mode: Br(t)
                });
                const s = t.getAttributeNames().filter((t => !Ar.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Oe(Ws({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const c = o.length;
        for (;c > h; ++h) Ks(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    De(t) {
        return "INPUT" === t.nodeName && 1 === yr[t.type];
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
        this.$e = ft();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.ve = o ? s.ve : e.get(dr);
        this.Re = o ? s.Re : e.get(Kt);
        this.ep = o ? s.ep : e.get(j);
        this.m = o ? s.m : e.get(ar);
        this.Ue = o ? s.Ue : e.get(k);
        this.p = o ? s.p : e.get(oi);
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
    ye(t) {
        return this.c.find(Zs, t);
    }
    Ae(t) {
        return this.c.find(Ke, t);
    }
    Pe(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ke(t) {
        if (this.root !== this) return this.root.ke(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.$e[e];
        if (void 0 === i) {
            i = this.c.create(Xn, e);
            if (null === i) throw dt(`AUR0713:${e}`);
            this.$e[e] = i;
        }
        return i;
    }
}

function gr(t) {
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

function pr() {
    xr.node = xr.attr = xr.bindable = xr.def = null;
}

const vr = {
    projections: null
};

const wr = {
    name: "unnamed"
};

const xr = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const br = Object.assign(ft(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const yr = {
    checkbox: 1,
    radio: 1
};

const kr = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = kr.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = ft();
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
                    if (h) throw dt(`AUR0714:${t.name}`);
                    h = true;
                    c = o;
                } else if (!h && null == c) c = o;
                n[a] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) c = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            kr.set(t, i = new BindablesInfo(n, s, c));
        }
        return i;
    }
}

const Ar = Object.freeze([ "property", "attribute", "mode" ]);

const Cr = "as-custom-element";

function Rr(t, e) {
    const i = t.getAttribute(Cr);
    if (null === i || "" === i) throw dt(`AUR0715`);
    if (e.has(i)) throw dt(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Cr);
    }
    return i;
}

function Br(t) {
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

const Sr = Ut("ITemplateCompilerHooks");

const Ir = new WeakMap;

const Tr = ht("compiler-hooks");

const Dr = Object.freeze({
    name: Tr,
    define(t) {
        let e = Ir.get(t);
        if (void 0 === e) {
            Ir.set(t, e = new TemplateCompilerHooksDefinition(t));
            nt(Tr, e, t);
            ct(t, Tr);
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
        t.register(qt(Sr, this.Type));
    }
}

const Er = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Dr.define(t);
    }
};

const Pr = "default";

const Lr = "au-slot";

const Or = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        Or.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = Or.get(e);
        Or.delete(e);
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

ue("oneTime")(OneTimeBindingBehavior);

ue("toView")(ToViewBindingBehavior);

ue("fromView")(FromViewBindingBehavior);

ue("twoWay")(TwoWayBindingBehavior);

const $r = new WeakMap;

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
        if (null == n) ; else $r.set(e, n);
    }
    unbind(t, e) {
        $r.get(e)?.dispose();
        $r.delete(e);
    }
}

DebounceBindingBehavior.inject = [ a ];

ue("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.qe = new Map;
        this._e = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw dt(`AUR0817`);
        if (0 === i.length) throw dt(`AUR0818`);
        this.qe.set(e, i);
        let s;
        for (s of i) this._e.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.qe.get(e);
        this.qe.delete(e);
        let s;
        for (s of i) this._e.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ V ];

ue("signal")(SignalBindingBehavior);

const qr = new WeakMap;

const _r = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.je = t.performanceNow;
        this.lt = t.taskQueue;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "throttle",
            delay: i > 0 ? i : _r,
            now: this.je,
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

ui(DataAttributeAccessor);

const jr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        if (!(e instanceof PropertyBinding)) throw dt(`AURxxxx`);
        e.useTargetObserver(jr);
    }
}

ue("attr")(AttrBindingBehavior);

function Fr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw dt(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Fr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ue("self")(SelfBindingBehavior);

const Mr = ft();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Mr[t] ?? (Mr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

ui(AttributeNSAccessor);

function Vr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Fe = void 0;
        this.Me = void 0;
        this.yt = false;
        this.bt = t;
        this.oL = s;
        this.xt = i;
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
        const e = this.bt;
        const i = mt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Vr;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (wt(t)) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const i = mt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Vr;
        if ("checkbox" === e.type) {
            if (wt(t)) {
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
        this.Fe?.unsubscribe(this);
        this.Me?.unsubscribe(this);
        this.Fe = this.Me = void 0;
    }
    it() {
        Nr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Nr);
    }
    Ve() {
        const t = this.bt;
        (this.Me ?? (this.Me = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Fe?.unsubscribe(this);
        this.Fe = void 0;
        if ("checkbox" === t.type) (this.Fe = eo(this.v, this.oL))?.subscribe(this);
    }
}

ci(CheckedObserver);

I(CheckedObserver);

let Nr;

const Hr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Wr(t, e) {
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
        this.bt = t;
        this.oL = s;
        this.xt = i;
    }
    getValue() {
        return this.iO ? this.v : this.bt.multiple ? zr(this.bt.options) : this.bt.value;
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
        const e = this.bt;
        const i = wt(t);
        const s = e.matcher ?? Wr;
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
        const t = this.bt;
        const e = t.options;
        const i = e.length;
        const s = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(s instanceof Array)) return true;
            let r;
            const o = t.matcher || Wr;
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
    kt() {
        (this.We = new this.bt.ownerDocument.defaultView.MutationObserver(this.Ge.bind(this))).observe(this.bt, Hr);
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
            if (!this.bt.multiple) throw dt(`AUR0654`);
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
        Gr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Gr);
    }
}

ci(SelectValueObserver);

I(SelectValueObserver);

function zr(t) {
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

let Gr;

const Xr = "--";

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
            if (bt(e)) {
                if (i.startsWith(Xr)) {
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
        if (bt(t)) return this.Xe(t);
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
                if (!mt.call(e, s) || e[s] !== n) continue;
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

ui(StyleAttributeAccessor);

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.Z = false;
        this.yt = false;
        this.bt = t;
        this.k = e;
        this.xt = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (At(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.Z = true;
        if (!this.xt.readonly) this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.bt[this.k] = this.v ?? this.xt.default;
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
        Kr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Kr);
    }
}

ci(ValueAttributeObserver);

I(ValueAttributeObserver);

let Kr;

const Qr = "http://www.w3.org/1999/xlink";

const Yr = "http://www.w3.org/XML/1998/namespace";

const Zr = "http://www.w3.org/2000/xmlns/";

const Jr = Object.assign(ft(), {
    "xlink:actuate": [ "actuate", Qr ],
    "xlink:arcrole": [ "arcrole", Qr ],
    "xlink:href": [ "href", Qr ],
    "xlink:role": [ "role", Qr ],
    "xlink:show": [ "show", Qr ],
    "xlink:title": [ "title", Qr ],
    "xlink:type": [ "type", Qr ],
    "xml:lang": [ "lang", Yr ],
    "xml:space": [ "space", Yr ],
    xmlns: [ "xmlns", Zr ],
    "xmlns:xlink": [ "xlink", Zr ]
});

const to = new N;

to.type = 2 | 4;

class NodeObserverLocator {
    constructor(t, e, i, s) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = i;
        this.svgAnalyzer = s;
        this.allowDirtyCheck = true;
        this.Ze = ft();
        this.Je = ft();
        this.ti = ft();
        this.ei = ft();
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
        qt(H, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Ze;
        let n;
        if (bt(t)) {
            n = s[t] ?? (s[t] = ft());
            if (null == n[e]) n[e] = i; else io(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = ft());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = r[e]; else io(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Je;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = t[e]; else io("*", e); else if (null == i[t]) i[t] = e; else io("*", t);
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
                const i = Jr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (pt(t, e, this.svgAnalyzer)) return jr;
                return to;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (bt(t)) {
            n = (i = this.ti)[t] ?? (i[t] = ft());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.ti)[e] ?? (s[e] = ft());
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
        const n = Jr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (pt(t, e, this.svgAnalyzer)) return jr;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw dt(`AUR0652:${String(e)}`);
        } else return new z(t, e);
    }
}

NodeObserverLocator.inject = [ C, oi, G, hr ];

function eo(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function io(t, e) {
    throw dt(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t, e) {
        if (!(e instanceof NodeObserverLocator)) throw dt("AURxxxx: updateTrigger binding behavior only works with the default implementation of Aurelia HTML observation. Implement your own node observation + updateTrigger");
        this.oL = t;
        this.ii = e;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw dt(`AUR0802`);
        if (!(e instanceof PropertyBinding) || !(4 & e.mode)) throw dt(`AUR0803`);
        const s = this.ii.getNodeObserverConfig(e.target, e.targetProperty);
        if (null == s) throw dt(`AURxxxx`);
        const n = this.ii.getNodeObserver(e.target, e.targetProperty, this.oL);
        n.useConfig({
            readonly: s.readonly,
            default: s.default,
            events: i
        });
        e.useTargetObserver(n);
    }
}

UpdateTriggerBindingBehavior.inject = [ _, H ];

ue("updateTrigger")(UpdateTriggerBindingBehavior);

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

Focus.inject = [ ws, oi ];

tt([ Bt({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Fe("focus")(Focus);

let so = class Show {
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

tt([ Bt ], so.prototype, "value", void 0);

so = tt([ et(0, ws), et(1, oi), et(2, ln) ], so);

Nt("hide")(so);

Fe("show")(so);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.ui = i.document.createElement("div");
        this.view = t.create();
        As(this.view.nodes, e);
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
        if (vt(s)) s.catch((t => {
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
            if (this.strict) throw dt(`AUR0811`);
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
            if (this.strict) throw dt(`AUR0812`);
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

Portal.inject = [ Ti, bs, oi ];

tt([ Bt({
    primary: true
}) ], Portal.prototype, "target", void 0);

tt([ Bt({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

tt([ Bt() ], Portal.prototype, "strict", void 0);

tt([ Bt() ], Portal.prototype, "deactivating", void 0);

tt([ Bt() ], Portal.prototype, "activating", void 0);

tt([ Bt() ], Portal.prototype, "deactivated", void 0);

tt([ Bt() ], Portal.prototype, "activated", void 0);

tt([ Bt() ], Portal.prototype, "callbackContext", void 0);

Me("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.xi = false;
        this.bi = 0;
        this.yi = t;
        this.l = e;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.bi++;
        const o = () => !this.xi && this.bi === r + 1;
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
        this.xi = true;
        return g(this.pending, (() => {
            this.xi = false;
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
        const r = this.bi++;
        const o = () => !this.xi && this.bi === r + 1;
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

If.inject = [ Ti, bs ];

tt([ Bt ], If.prototype, "value", void 0);

tt([ Bt({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Me("if")(If);

class Else {
    constructor(t) {
        this.f = t;
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw dt(`AUR0810`);
    }
}

Else.inject = [ Ti ];

Me({
    name: "else"
})(Else);

function no(t) {
    t.dispose();
}

const ro = [ 18, 17 ];

class Repeat {
    constructor(t, e, i) {
        this.views = [];
        this.key = void 0;
        this.ki = void 0;
        this.Ai = false;
        this.Ci = false;
        this.Ri = null;
        this.Bi = void 0;
        this.Si = false;
        this.l = t;
        this.Ii = e;
        this.f = i;
    }
    binding(t, e, i) {
        const s = this.Ii.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Ti = r;
                let t = o.iterable;
                while (null != t && ro.includes(t.$kind)) {
                    t = t.expression;
                    this.Ai = true;
                }
                this.Ri = t;
                break;
            }
        }
        this.Di();
        const h = o.declaration;
        if (!(this.Si = 24 === h.$kind || 25 === h.$kind)) this.local = T(h, this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.Ei();
        return this.Pi(t);
    }
    detaching(t, e, i) {
        this.Di();
        return this.Li(t);
    }
    itemsChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        this.Di();
        this.Ei();
        const e = g(this.Li(null), (() => this.Pi(null)));
        if (vt(e)) e.catch(kt);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.Ai) {
            if (this.Ci) return;
            this.Ci = true;
            this.items = T(this.forOf.iterable, i.scope, this.Ti, null);
            this.Ci = false;
            return;
        }
        this.Ei();
        if (void 0 === e) {
            const t = g(this.Li(null), (() => this.Pi(null)));
            if (vt(t)) t.catch(kt);
        } else {
            const t = this.views.length;
            const i = X(e);
            if (i.deletedIndices.length > 0) {
                const e = g(this.Oi(i), (() => this.$i(t, i)));
                if (vt(e)) e.catch(kt);
            } else this.$i(t, i);
        }
    }
    Di() {
        const t = this.$controller.scope;
        let e = this.Ui;
        let i = this.Ai;
        let s;
        if (i) {
            e = this.Ui = T(this.Ri, t, this.Ti, null) ?? null;
            i = this.Ai = !Object.is(this.items, e);
        }
        const n = this.ki;
        if (this.$controller.isActive) {
            s = this.ki = K(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.ki = void 0;
        }
    }
    Ei() {
        const t = this.items;
        if (wt(t)) {
            this.Bi = t;
            return;
        }
        const e = [];
        go(t, ((t, i) => {
            e[i] = t;
        }));
        this.Bi = e;
    }
    Pi(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: c} = this;
        const a = r.scope;
        const u = this.forOf;
        const f = mo(c);
        const d = this.views = Array(f);
        go(c, ((c, m) => {
            s = d[m] = o.create().setLocation(h);
            s.nodes.unlink();
            if (this.Si) L(u.declaration, n = U.fromParent(a, new Y), this.Ti, c); else n = U.fromParent(a, new Y(l, c));
            uo(n.overrideContext, m, f);
            i = s.activate(t ?? s, r, 0, n);
            if (vt(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Li(t) {
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
            if (vt(i)) (e ?? (e = [])).push(i);
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
            if (vt(i)) (e ?? (e = [])).push(i);
        }
        h = 0;
        let c = 0;
        for (;l > h; ++h) {
            c = o[h] - h;
            r.splice(c, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    $i(t, e) {
        let i;
        let s;
        let n;
        let r;
        let o = 0;
        const {$controller: l, f: h, local: c, Bi: a, l: u, views: f} = this;
        const d = e.length;
        for (;d > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== d) throw ao(f.length, d);
        const m = l.scope;
        const g = e.length;
        Q(f, e);
        const p = co(e);
        const v = p.length;
        let w;
        let x = v - 1;
        o = g - 1;
        for (;o >= 0; --o) {
            n = f[o];
            w = f[o + 1];
            n.nodes.link(w?.nodes ?? u);
            if (-2 === e[o]) {
                if (this.Si) L(this.forOf.declaration, r = U.fromParent(m, new Y), this.Ti, a[o]); else r = U.fromParent(m, new Y(c, a[o]));
                uo(r.overrideContext, o, g);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (vt(s)) (i ?? (i = [])).push(s);
            } else if (x < 0 || 1 === v || o !== p[x]) {
                uo(n.scope.overrideContext, o, g);
                n.nodes.insertBefore(n.location);
            } else {
                if (t !== g) uo(n.scope.overrideContext, o, g);
                --x;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(no);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ bs, ts, Ti ];

tt([ Bt ], Repeat.prototype, "items", void 0);

Me("repeat")(Repeat);

let oo = 16;

let lo = new Int32Array(oo);

let ho = new Int32Array(oo);

function co(t) {
    const e = t.length;
    if (e > oo) {
        oo = e;
        lo = new Int32Array(e);
        ho = new Int32Array(e);
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
            o = lo[i];
            n = t[o];
            if (-2 !== n && n < s) {
                ho[r] = o;
                lo[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                c = l + h >> 1;
                n = t[lo[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[lo[l]];
            if (s < n || -2 === n) {
                if (l > 0) ho[r] = lo[l - 1];
                lo[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = lo[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = ho[s];
    }
    while (r-- > 0) lo[r] = 0;
    return a;
}

const ao = (t, e) => dt(`AUR0814:${t}!=${e}`);

const uo = (t, e, i) => {
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

const fo = Object.prototype.toString;

const mo = t => {
    switch (fo.call(t)) {
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
        throw dt(`Cannot count ${fo.call(t)}`);
    }
};

const go = (t, e) => {
    switch (fo.call(t)) {
      case "[object Array]":
        return po(t, e);

      case "[object Map]":
        return vo(t, e);

      case "[object Set]":
        return wo(t, e);

      case "[object Number]":
        return xo(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw dt(`Cannot iterate over ${fo.call(t)}`);
    }
};

const po = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const vo = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const wo = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const xo = (t, e) => {
    let i = 0;
    for (;i < t; ++i) e(i, i, t);
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
            r = U.fromParent(s.scope, void 0 === t ? {} : t);
            for (l = n.length; l > o; ++o) n[o].bind(r);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const r = U.fromParent(s.scope, void 0 === n ? {} : n);
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

With.inject = [ Ti, bs ];

tt([ Bt ], With.prototype, "value", void 0);

Me("with")(With);

let bo = class Switch {
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
            if (s > 0 && i[0].id === t.id) return this._i(null);
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
        return g(this._i(null, n), (() => {
            this.activeCases = n;
            return this.ji(null);
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
        return g(this.activeCases.length > 0 ? this._i(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.ji(t);
        }));
    }
    ji(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return m(...i.map((e => e.activate(t, 0, n))));
    }
    _i(t, e = []) {
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

tt([ Bt ], bo.prototype, "value", void 0);

bo = tt([ Me("switch"), et(0, Ti), et(1, bs) ], bo);

let yo = 0;

let ko = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Fi = e;
        this.l = i;
        this.id = ++yo;
        this.fallThrough = false;
        this.view = void 0;
        this.Mi = s.config.level <= 1;
        this.Ue = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof bo) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw dt(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Ue.debug("isMatch()");
        const e = this.value;
        if (wt(e)) {
            if (void 0 === this.ki) this.ki = this.Vi(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (wt(t)) {
            this.ki?.unsubscribe(this);
            this.ki = this.Vi(t);
        } else if (void 0 !== this.ki) this.ki.unsubscribe(this);
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
        this.ki?.unsubscribe(this);
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

ko.inject = [ Ti, _, bs, k ];

tt([ Bt ], ko.prototype, "value", void 0);

tt([ Bt({
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
}) ], ko.prototype, "fallThrough", void 0);

ko = tt([ Me("case") ], ko);

let Ao = class DefaultCase extends ko {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw dt(`AUR0816`);
        t.defaultCase = this;
    }
};

Ao = tt([ Me("default-case") ], Ao);

let Co = class PromiseTemplateController {
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
        return g(s.activate(t, n, i, this.viewScope = U.fromParent(n.scope, {})), (() => this.swap(t, i)));
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
            void m(h = (this.preSettledTask = s.queueTask((() => m(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), c)).result.catch((t => {
                if (!(t instanceof Z)) throw t;
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

tt([ Bt ], Co.prototype, "value", void 0);

Co = tt([ Me("promise"), et(0, Ti), et(1, bs), et(2, oi), et(3, k) ], Co);

let Ro = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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

tt([ Bt({
    mode: 2
}) ], Ro.prototype, "value", void 0);

Ro = tt([ Me("pending"), et(0, Ti), et(1, bs) ], Ro);

let Bo = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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

tt([ Bt({
    mode: 4
}) ], Bo.prototype, "value", void 0);

Bo = tt([ Me("then"), et(0, Ti), et(1, bs) ], Bo);

let So = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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

tt([ Bt({
    mode: 4
}) ], So.prototype, "value", void 0);

So = tt([ Me("catch"), et(0, Ti), et(1, bs) ], So);

function Io(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof Co) return i;
    throw dt(`AUR0813`);
}

let To = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

To = tt([ Qt({
    pattern: "promise.resolve",
    symbols: ""
}) ], To);

let Do = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Do = tt([ Qt({
    pattern: "then",
    symbols: ""
}) ], Do);

let Eo = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Eo = tt([ Qt({
    pattern: "catch",
    symbols: ""
}) ], Eo);

function Po(t, e, i, s) {
    if (bt(e)) return Lo(t, e, i, s);
    if (zs(e)) return Oo(t, e, i, s);
    throw dt(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Ni = i;
        this.Hi = void 0;
    }
    get definition() {
        if (void 0 === this.Hi) this.Hi = CustomElementDefinition.create({
            name: Ns(),
            template: this.node,
            needsCompile: bt(this.node),
            instructions: this.instructions,
            dependencies: this.Ni
        });
        return this.Hi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(qi).getViewFactory(this.definition, t.createChild().register(...this.Ni));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Ni);
    }
}

function Lo(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (hn(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) $o(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function Oo(t, e, i, s) {
    const n = Ks(e);
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
        if (hn(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) $o(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function $o(t, e, i, s, n) {
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

function Uo(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Wi = e;
        this.zi = i;
        this.r = s;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Gi = void 0;
        this.Xi = e.props.reduce(Uo, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Gi !== s) {
            this.Gi = s;
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
        if (this.Gi === t) return;
        this.Gi = t;
        this.composing = true;
        i |= s.flags;
        const n = g(this.vi(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (vt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return g(void 0 === t ? g(e, (t => this.Ki(t, s))) : t, (t => this.gi(this.view = t, i, s)));
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
    Ki(t, e) {
        const i = this.Qi(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Qi(t, e) {
        if (null == t) return;
        const i = this.zi.controller.container;
        if ("object" === typeof t) {
            if (qo(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (bt(t)) {
            const e = i.find(Zs, t);
            if (null == e) throw dt(`AUR0809:${t}`);
            t = e.Type;
        }
        return Po(this.p, t, this.Xi, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ oi, ln, es, qi ];

tt([ Bt ], AuRender.prototype, "component", void 0);

tt([ Bt({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

Ts({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function qo(t) {
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
        this.Yi = void 0;
        this.r = t.get(qi);
        this.Wi = r;
        this.Zi = o;
    }
    static get inject() {
        return [ u, ts, ws, bs, oi, ln, R(CompositionContextFactory) ];
    }
    get pending() {
        return this.Ji;
    }
    get composition() {
        return this.Yi;
    }
    attaching(t, e, i) {
        return this.Ji = g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Zi.isCurrent(t)) this.Ji = void 0;
        }));
    }
    detaching(t) {
        const e = this.Yi;
        const i = this.Ji;
        this.Zi.invalidate();
        this.Yi = this.Ji = void 0;
        return g(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Yi) {
            this.Yi.update(this.model);
            return;
        }
        this.Ji = g(this.Ji, (() => g(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Zi.isCurrent(t)) this.Ji = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Zi;
        const s = this.Yi;
        return g(i.create(t), (t => {
            if (i.isCurrent(t)) return g(this.compose(t), (n => {
                if (i.isCurrent(t)) return g(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Yi = n;
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
            if (u.containerless) throw dt(`AUR0806`);
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
                    projections: this.Wi.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, c, 1, c.scope.parent)), (t => g(n.deactivate(t ?? n, c, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Zs.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, c);
                const l = "auto" === this.scopeBehavior ? U.fromParent(this.parent.scope, e) : U.create(e);
                if (Rs(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, c, 1, l)), (t => o.deactivate(t ?? o, c, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return g(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = Rs(i);
        Vt(t, s.Element, Vt(t, ws, new d("ElementResolver", n ? null : i)));
        Vt(t, bs, new d("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        Vt(t, e, new d("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = xt(t) ? t : t?.constructor;
        return Zs.isType(e) ? Zs.getDefinition(e) : null;
    }
}

tt([ Bt ], AuCompose.prototype, "view", void 0);

tt([ Bt ], AuCompose.prototype, "viewModel", void 0);

tt([ Bt ], AuCompose.prototype, "model", void 0);

tt([ Bt({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw dt(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Ts("au-compose")(AuCompose);

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
        if (0 !== this.state) throw dt(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw dt(`AUR0808`);

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, i, s) {
        this.ts = null;
        this.es = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.ss = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.ss = true;
        }
        this.zi = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ bs, ln, es, qi ];
    }
    binding(t, e, i) {
        this.ts = this.$controller.scope.parent;
        let s;
        if (this.ss) {
            s = this.zi.controller.scope.parent;
            (this.es = U.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.ts.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.ss ? this.es : this.ts);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.ss && null != this.es) this.es.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

tt([ Bt ], AuSlot.prototype, "expose", void 0);

Ts({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const _o = Ut("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw dt('"sanitize" method not implemented');
    }
})));

let jo = class SanitizeValueConverter {
    constructor(t) {
        this.rs = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.rs.sanitize(t);
    }
};

jo = tt([ et(0, _o) ], jo);

ge("sanitize")(jo);

let Fo = class ViewValueConverter {
    constructor(t) {
        this.os = t;
    }
    toView(t, e) {
        return this.os.getViewComponentForObject(t, e);
    }
};

Fo = tt([ et(0, Ui) ], Fo);

ge("view")(Fo);

const Mo = DebounceBindingBehavior;

const Vo = OneTimeBindingBehavior;

const No = ToViewBindingBehavior;

const Ho = FromViewBindingBehavior;

const Wo = SignalBindingBehavior;

const zo = ThrottleBindingBehavior;

const Go = TwoWayBindingBehavior;

const Xo = TemplateCompiler;

const Ko = NodeObserverLocator;

const Qo = [ Xo, Ko ];

const Yo = SVGAnalyzer;

const Zo = ne;

const Jo = se;

const tl = ie;

const el = ee;

const il = re;

const sl = [ tl, el, il ];

const nl = [ Zo, Jo ];

const rl = Jn;

const ol = tr;

const ll = Yn;

const hl = Kn;

const cl = Qn;

const al = Zn;

const ul = or;

const fl = er;

const dl = ir;

const ml = sr;

const gl = rr;

const pl = nr;

const vl = lr;

const wl = [ rl, hl, ll, cl, al, ol, ul, fl, dl, gl, pl, ml, vl ];

const xl = jo;

const bl = Fo;

const yl = If;

const kl = Else;

const Al = Repeat;

const Cl = With;

const Rl = bo;

const Bl = ko;

const Sl = Ao;

const Il = Co;

const Tl = Ro;

const Dl = Bo;

const El = So;

const Pl = To;

const Ll = Do;

const Ol = Eo;

const $l = AttrBindingBehavior;

const Ul = SelfBindingBehavior;

const ql = UpdateTriggerBindingBehavior;

const _l = AuRender;

const jl = AuCompose;

const Fl = Portal;

const Ml = Focus;

const Vl = so;

const Nl = [ Mo, Vo, No, Ho, Wo, zo, Go, xl, bl, yl, kl, Al, Cl, Rl, Bl, Sl, Il, Tl, Dl, El, Pl, Ll, Ol, $l, Ul, ql, _l, jl, Fl, Ml, Vl, AuSlot ];

const Hl = vn;

const Wl = pn;

const zl = yn;

const Gl = An;

const Xl = xn;

const Kl = kn;

const Ql = bn;

const Yl = gn;

const Zl = wn;

const Jl = Rn;

const th = Dn;

const eh = Bn;

const ih = Sn;

const sh = In;

const nh = Tn;

const rh = Cn;

const oh = En;

const lh = [ Kl, Gl, Ql, zl, Yl, Wl, Hl, Zl, Xl, Jl, th, eh, ih, sh, nh, rh, oh ];

const hh = ch(n);

function ch(t) {
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
            return e.register(jt(q, i.coercingOptions), ...Qo, ...Nl, ...sl, ...wl, ...lh);
        },
        customize(e) {
            return ch(e ?? t);
        }
    };
}

const ah = Ut("IAurelia");

class Aurelia {
    constructor(t = r.createContainer()) {
        this.container = t;
        this.ir = false;
        this.ls = false;
        this.cs = false;
        this.us = void 0;
        this.next = void 0;
        this.ds = void 0;
        this.gs = void 0;
        if (t.has(ah, true)) throw dt(`AUR0768`);
        Vt(t, ah, new d("IAurelia", this));
        Vt(t, gs, this.ps = new d("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ls;
    }
    get isStopping() {
        return this.cs;
    }
    get root() {
        if (null == this.us) {
            if (null == this.next) throw dt(`AUR0767`);
            return this.next;
        }
        return this.us;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.vs(t.host), this.container, this.ps);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.vs(s);
        const r = t.component;
        let o;
        if (xt(r)) {
            Vt(i, n.HTMLElement, Vt(i, n.Element, Vt(i, ws, new d("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        Vt(i, xs, new d("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: Ns(),
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
    vs(t) {
        let e;
        if (!this.container.has(oi, false)) {
            if (null === t.ownerDocument.defaultView) throw dt(`AUR0769`);
            e = new J(t.ownerDocument.defaultView);
            this.container.register(jt(oi, e));
        } else e = this.container.get(oi);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw dt(`AUR0770`);
        if (vt(this.ds)) return this.ds;
        return this.ds = g(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ps.prepare(this.us = t);
            this.ls = true;
            return g(t.activate(), (() => {
                this.ir = true;
                this.ls = false;
                this.ds = void 0;
                this.ws(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (vt(this.gs)) return this.gs;
        if (true === this.ir) {
            const e = this.us;
            this.ir = false;
            this.cs = true;
            return this.gs = g(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.us = void 0;
                this.ps.dispose();
                this.cs = false;
                this.ws(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.cs) throw dt(`AUR0771`);
        this.container.dispose();
    }
    ws(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var uh;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(uh || (uh = {}));

var fh;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(fh || (fh = {}));

const dh = Ut("IDialogService");

const mh = Ut("IDialogController");

const gh = Ut("IDialogDomRenderer");

const ph = Ut("IDialogDom");

const vh = Ut("IDialogGlobalSettings");

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

var wh;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(wh || (wh = {}));

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
        return [ oi, u ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(gh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(xs, true) ? e.get(xs) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(jt(xs, o));
        e.register(jt(ws, c), jt(ph, l));
        return new Promise((s => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(e, t, c), {
                $dialog: this
            });
            s(n.canActivate?.(i) ?? true);
        })).then((r => {
            if (true !== r) {
                l.dispose();
                if (n) throw xh(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const o = this.cmp;
            return g(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Zs.generateName(),
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
        if (this.xs) return this.xs;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(g(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.xs = void 0;
                    if (l) throw xh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return g(r.deactivate?.(h), (() => g(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.se(h); else this.Yt(xh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.xs = void 0;
            throw t;
        }));
        this.xs = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = bh(t);
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(ws, new d("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = xt(t) ? t : t?.constructor;
        return Zs.isType(e) ? Zs.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function xh(t, e) {
    const i = dt(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function bh(t) {
    const e = dt("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.$t = t;
        this.p = e;
        this.bs = i;
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
        return [ u, oi, vh ];
    }
    static register(t) {
        t.register(qt(dh, this), Oe.deactivating(dh, (t => g(t.closeAll(), (t => {
            if (t.length > 0) throw dt(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return kh(new Promise((e => {
            const i = DialogSettings.from(this.bs, t);
            const s = i.container ?? this.$t.createChild();
            e(g(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(jt(mh, e));
                s.register(Ft(DialogController, (() => {
                    throw dt(`AUR0902`);
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
        const i = Ah(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).ks().ys();
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
        return vt(s) ? s.then((() => t)) : t;
    }
    ks() {
        if (null == this.component && null == this.template) throw dt(`AUR0903`);
        return this;
    }
    ys() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function yh(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function kh(t) {
    t.whenClosed = yh;
    return t;
}

function Ah(t) {
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
        qt(vh, this).register(t);
    }
}

const Ch = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Ch} display:flex;`;
        this.overlayCss = Ch;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        qt(gh, this).register(t);
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

DefaultDialogDomRenderer.inject = [ oi ];

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

function Rh(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, Oe.creating((() => t(i.get(vh))))),
        customize(t, i) {
            return Rh(t, i ?? e);
        }
    };
}

const Bh = Rh((() => {
    throw dt(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(qt(vh, this));
    }
} ]);

const Sh = Rh(n, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Ih = Ut((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, i) {
        this.ctn = t;
        this.p = e;
        this.r = i;
    }
    define(t, e, i) {
        if (!t.includes("-")) throw dt('Invalid web-components custom element name. It must include a "-"');
        let s;
        if (null == e) throw dt("Invalid custom element definition");
        switch (typeof e) {
          case "function":
            s = Zs.isType(e) ? Zs.getDefinition(e) : CustomElementDefinition.create(Zs.generateName(), e);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (s.containerless) throw dt("Containerless custom element is not supported. Consider using buitl-in extends instead");
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
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(ws, new d("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                vs(this, e.key, n);
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

WcCustomElementRegistry.inject = [ u, oi, qi ];

export { AdoptedStyleSheetsStyles, AppRoot, Oe as AppTask, ne as AtPrefixedTriggerAttributePattern, Zo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, $l as AttrBindingBehaviorRegistration, sr as AttrBindingCommand, ml as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, th as AttributeBindingRendererRegistration, AttributeNSAccessor, te as AttributePattern, AuCompose, AuRender, _l as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Tt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, me as BindingBehavior, BindingBehaviorDefinition, Xn as BindingCommand, BindingCommandDefinition, uh as BindingMode, BindingModeBehavior, BindingTargetSubscriber, CSSModulesProcessorRegistry, ir as CaptureBindingCommand, dl as CaptureBindingCommandRegistration, ko as Case, CheckedObserver, Je as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, rr as ClassBindingCommand, gl as ClassBindingCommandRegistration, se as ColonPrefixedBindAttributePattern, Jo as ColonPrefixedBindAttributePatternRegistration, Nn as CommandType, ComputedWatcher, ContentBinding, Controller, Ke as CustomAttribute, CustomAttributeDefinition, Hl as CustomAttributeRendererRegistration, Zs as CustomElement, CustomElementDefinition, Wl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Mo as DebounceBindingBehaviorRegistration, Jn as DefaultBindingCommand, rl as DefaultBindingCommandRegistration, wl as DefaultBindingLanguage, sl as DefaultBindingSyntax, Ao as DefaultCase, Qo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, lh as DefaultRenderers, Nl as DefaultResources, fh as DefinitionType, DialogCloseResult, Bh as DialogConfiguration, DialogController, wh as DialogDeactivationStatuses, Sh as DialogDefaultConfiguration, DialogOpenResult, DialogService, ee as DotSeparatedAttributePattern, el as DotSeparatedAttributePatternRegistration, Else, kl as ElseRegistration, ExpressionWatcher, FlushQueue, Focus, tr as ForBindingCommand, ol as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Ho as FromViewBindingBehaviorRegistration, Yn as FromViewBindingCommand, ll as FromViewBindingCommandRegistration, Bo as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, gs as IAppRoot, Le as IAppTask, ar as IAttrMapper, Kt as IAttributeParser, Xt as IAttributePattern, rn as IAuSlotsInfo, ah as IAurelia, ts as IController, mh as IDialogController, ph as IDialogDom, gh as IDialogDomRenderer, vh as IDialogGlobalSettings, dh as IDialogService, xs as IEventTarget, ke as IFlushQueue, Is as IHistory, es as IHydrationContext, ln as IInstruction, Ci as ILifecycleHooks, Ss as ILocation, ws as INode, Ko as INodeObserverLocatorRegistration, oi as IPlatform, nn as IProjections, bs as IRenderLocation, an as IRenderer, qi as IRendering, hr as ISVGAnalyzer, _o as ISanitizer, wi as IShadowDOMGlobalStyles, vi as IShadowDOMStyles, Wt as ISyntaxInterpreter, cn as ITemplateCompiler, Sr as ITemplateCompilerHooks, Xo as ITemplateCompilerRegistration, dr as ITemplateElementFactory, Ti as IViewFactory, Ui as IViewLocator, Ih as IWcElementRegistry, Bs as IWindow, If, yl as IfRegistration, on as InstructionType, InterpolationBinding, zl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Gl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Xl as LetElementRendererRegistration, _i as LifecycleFlags, Si as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, ListenerBinding, ListenerBindingInstruction, ListenerBindingOptions, Jl as ListenerBindingRendererRegistration, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, Vo as OneTimeBindingBehaviorRegistration, Kn as OneTimeBindingCommand, hl as OneTimeBindingCommandRegistration, Ro as PendingTemplateController, Portal, Co as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Kl as PropertyBindingRendererRegistration, ie as RefAttributePattern, tl as RefAttributePatternRegistration, RefBinding, ul as RefBindingCommandRegistration, RefBindingInstruction, Ql as RefBindingRendererRegistration, So as RejectedTemplateController, RenderPlan, Rendering, Repeat, Al as RepeatRegistration, SVGAnalyzer, Yo as SVGAnalyzerRegistration, jo as SanitizeValueConverter, xl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Ul as SelfBindingBehaviorRegistration, SetAttributeInstruction, eh as SetAttributeRendererRegistration, SetClassAttributeInstruction, ih as SetClassAttributeRendererRegistration, SetPropertyInstruction, Yl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, sh as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, nl as ShortHandBindingSyntax, SignalBindingBehavior, Wo as SignalBindingBehaviorRegistration, hh as StandardConfiguration, Zi as State, StyleAttributeAccessor, nr as StyleBindingCommand, pl as StyleBindingCommandRegistration, xi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, nh as StylePropertyBindingRendererRegistration, bo as Switch, TemplateCompiler, Dr as TemplateCompilerHooks, Zl as TemplateControllerRendererRegistration, TextBindingInstruction, rh as TextBindingRendererRegistration, ThrottleBindingBehavior, zo as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, No as ToViewBindingBehaviorRegistration, Qn as ToViewBindingCommand, cl as ToViewBindingCommandRegistration, er as TriggerBindingCommand, fl as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Go as TwoWayBindingBehaviorRegistration, Zn as TwoWayBindingCommand, al as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, ql as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, we as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, Yi as ViewModelKind, Fo as ViewValueConverter, bl as ViewValueConverterRegistration, Oi as Views, je as Watch, WcCustomElementRegistry, With, Cl as WithRegistration, Nt as alias, $t as allResources, Qt as attributePattern, Bt as bindable, ue as bindingBehavior, Hn as bindingCommand, sn as capture, Qe as children, Dt as coercer, Es as containerless, Cs as convertToRenderLocation, Po as createElement, mi as cssModules, Fe as customAttribute, Ts as customElement, ks as getEffectiveParentNode, ps as getRef, Xi as isCustomElementController, Ki as isCustomElementViewModel, hn as isInstruction, Rs as isRenderLocation, Ii as lifecycleHooks, be as mixinAstEvaluator, xe as mixinBindingUseScope, Re as mixingBindingLimited, tn as processContent, Ht as registerAliases, un as renderer, As as setEffectiveParentNode, vs as setRef, gi as shadowCSS, Ls as strict, Er as templateCompilerHooks, Me as templateController, Ds as useShadowDOM, ge as valueConverter, $i as view, Ue as watch };

