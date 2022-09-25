import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as c, fromAnnotationOrDefinitionOrTypeOrDefault as a, fromDefinitionOrDefault as u, pascalCase as f, fromAnnotationOrTypeOrDefault as d, IPlatform as m, IContainer as g, optional as p, InstanceProvider as v, resolveAll as w, onResolve as b, camelCase as x, toArray as y, ILogger as k, emptyObject as C, IServiceLocator as A, transient as R } from "@aurelia/kernel";

import { Metadata as S, isObject as B } from "@aurelia/metadata";

import { subscriberCollection as E, astEvaluate as I, astBind as T, astUnbind as D, connectable as P, astAssign as $, ConnectableSwitcher as L, ProxyObservable as O, Scope as U, ICoercionConfiguration as q, IObserverLocator as j, IExpressionParser as F, AccessScopeExpression as _, BindingBehaviorExpression as M, PrimitiveLiteralExpression as V, ISignaler as N, PropertyAccessor as H, INodeObserverLocator as W, SetterObserver as z, IDirtyChecker as G, applyMutationsToIndices as X, getCollectionObserver as K, synchronizeIndices as Q, BindingContext as Y } from "@aurelia/runtime";

import { TaskAbortError as Z } from "@aurelia/platform";

import { BrowserPlatform as J } from "@aurelia/platform-browser";

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

const it = S.getOwn;

const st = S.hasOwn;

const nt = S.define;

const {annotation: rt, resource: ot} = t;

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
        nt(St, BindableDefinition.create(e, t, i), t.constructor, e);
        at(t.constructor, Bt.keyFrom(e));
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
    return t.startsWith(St);
}

const St = lt("bindable");

const Bt = Object.freeze({
    name: St,
    keyFrom: t => `${St}:${t}`,
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
                if (!st(St, t, n)) at(t, Bt.keyFrom(n));
                nt(St, e, t, n);
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
        const i = St.length + 1;
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
            l = ut(c).filter(Rt);
            h = l.length;
            for (a = 0; a < h; ++a) s[o++] = it(St, c, l[a].slice(i));
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
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Tt(t, e, n)));
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
            r = "function" === typeof t ? t.bind(s) : It.for(s) ?? n;
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
        const c = this.i = wt(l);
        const a = this.u = wt(h);
        const u = this.hs = s !== n;
        let f;
        this.o = t;
        this.k = e;
        this.cb = c ? l : n;
        this.C = a ? h : n;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
            this.iO = true;
            f = t[e];
            this.v = u && void 0 !== f ? s(f, this.t) : f;
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
            this.subs.notify(this.v, this.ov);
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

E(BindableObserver);

const Pt = function(t) {
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

const Lt = r.createInterface;

const Ot = o.singleton;

const Ut = o.aliasTo;

const qt = o.instance;

const jt = o.callback;

const Ft = o.transient;

const _t = (t, e, i) => t.registerResolver(e, i);

function Mt(...t) {
    return function(e) {
        const i = lt("aliases");
        const s = it(i, e);
        if (void 0 === s) nt(i, t, e); else s.push(...t);
    };
}

function Vt(t, e, i, s) {
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
        this.parts = l;
        this.L = "";
        this.O = {};
        this.U = {};
    }
    get pattern() {
        const t = this.L;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.L = "";
            this.parts = l;
        } else {
            this.L = t;
            this.parts = this.U[t];
        }
    }
    append(t, e) {
        const i = this.O;
        if (void 0 === i[t]) i[t] = e; else i[t] += e;
    }
    next(t) {
        const e = this.O;
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

const Nt = Lt("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        s = s.filter(Ht);
        if (s.length > 0) {
            s.sort(Wt);
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

function Ht(t) {
    return t.isEndpoint;
}

function Wt(t, e) {
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

const zt = Lt("IAttributePattern");

const Gt = Lt("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.q = {};
        this.j = t;
        const i = this.F = {};
        const s = e.reduce(((t, e) => {
            const s = Yt(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), l);
        t.add(s);
    }
    parse(t, e) {
        let i = this.q[t];
        if (null == i) i = this.q[t] = this.j.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.F[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ Nt, h(zt) ];

function Xt(...t) {
    return function e(i) {
        return Zt.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        Ot(zt, this.Type).register(t);
    }
}

const Kt = ht("attribute-pattern");

const Qt = "attribute-pattern-definitions";

const Yt = e => t.annotation.get(e, Qt);

const Zt = Object.freeze({
    name: Kt,
    definitionAnnotationKey: Qt,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        nt(Kt, s, i);
        ct(i, Kt);
        t.annotation.set(i, Qt, e);
        at(i, Qt);
        return i;
    },
    getPatternDefinitions: Yt
});

let Jt = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

Jt = tt([ Xt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], Jt);

let te = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

te = tt([ Xt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], te);

let ee = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

ee = tt([ Xt({
    pattern: ":PART",
    symbols: ":"
}) ], ee);

let ie = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

ie = tt([ Xt({
    pattern: "@PART",
    symbols: "@"
}) ], ie);

let se = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

se = tt([ Xt({
    pattern: "...$attrs",
    symbols: ""
}) ], se);

var ne;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(ne || (ne = {}));

function re(t) {
    return function(e) {
        return ce.define(t, e);
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
        const r = Object.getPrototypeOf(e) === BindingInterceptor;
        return new BindingBehaviorDefinition(e, i(he(e, "name"), s), c(he(e, "aliases"), n.aliases, e.aliases), ce.keyFrom(s), a("strategy", n, e, (() => r ? 2 : 1)));
    }
    register(t) {
        const {Type: e, key: i, aliases: s, strategy: n} = this;
        switch (n) {
          case 1:
            o.singleton(i, e).register(t);
            break;

          case 2:
            o.instance(i, new BindingBehaviorFactory(t, e)).register(t);
            break;
        }
        o.aliasTo(i, e).register(t);
        Vt(s, ce, i, t);
    }
}

class BindingBehaviorFactory {
    constructor(t, e) {
        this.ctn = t;
        this.Type = e;
        this.deps = r.getDependencies(e);
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
    handleCollectionChange(t, e) {
        this.binding.handleCollectionChange(t, e);
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

const oe = [ "isBound", "$scope", "obs", "ast", "locator", "oL", "boundFn" ];

oe.forEach((t => {
    kt(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const le = ht("binding-behavior");

const he = (t, e) => it(lt(e), t);

const ce = Object.freeze({
    name: le,
    keyFrom(t) {
        return `${le}:${t}`;
    },
    isType(t) {
        return wt(t) && st(le, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        nt(le, i, i.Type);
        nt(le, i, i);
        ct(e, le);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(le, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: he
});

function ae(t) {
    return function(e) {
        return de.define(t, e);
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
        return new ValueConverterDefinition(e, i(fe(e, "name"), s), c(fe(e, "aliases"), n.aliases, e.aliases), de.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Vt(s, de, i, t);
    }
}

const ue = ht("value-converter");

const fe = (t, e) => it(lt(e), t);

const de = Object.freeze({
    name: ue,
    keyFrom: t => `${ue}:${t}`,
    isType(t) {
        return wt(t) && st(ue, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        nt(ue, i, i.Type);
        nt(ue, i, i);
        ct(e, ue);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(ue, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: fe
});

class BindingTargetSubscriber {
    constructor(t, e) {
        this.v = void 0;
        this.b = t;
        this._ = e;
    }
    flush() {
        this.b.updateSource(this.v);
    }
    handleChange(t, e) {
        const i = this.b;
        if (t !== I(i.ast, i.$scope, i, null)) {
            this.v = t;
            this._.add(this);
        }
    }
}

function me(t, e = true) {
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
            const e = de.keyFrom(t);
            let i = ge.get(this);
            if (null == i) ge.set(this, i = new ResourceLookup);
            return i[e] ?? (i[e] = this.locator.get(Pt(e)));
        }));
        Ct(s, "getBehavior", (function(t) {
            const e = ce.keyFrom(t);
            let i = ge.get(this);
            if (null == i) ge.set(this, i = new ResourceLookup);
            return i[e] ?? (i[e] = this.locator.get(Pt(e)));
        }));
    };
}

const ge = new WeakMap;

class ResourceLookup {}

const pe = Lt("IFlushQueue", (t => t.singleton(FlushQueue)));

class FlushQueue {
    constructor() {
        this.M = false;
        this.V = new Set;
    }
    get count() {
        return this.V.size;
    }
    add(t) {
        this.V.add(t);
        if (this.M) return;
        this.M = true;
        try {
            this.V.forEach(ve);
        } finally {
            this.M = false;
        }
    }
    clear() {
        this.V.clear();
        this.M = false;
    }
}

function ve(t, e, i) {
    i.delete(t);
    t.flush();
}

class CallBinding {
    constructor(t, e, i, s, n) {
        this.locator = t;
        this.ast = i;
        this.target = s;
        this.targetProperty = n;
        this.interceptor = this;
        this.isBound = false;
        this.boundFn = false;
        this.targetObserver = e.getAccessor(s, n);
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const i = I(this.ast, this.$scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        T(this.ast, t, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        D(this.ast, this.$scope, this.interceptor);
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

me(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.N = false;
        this.o = t;
        this.H = e;
        this.W = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        this.v = t;
        this.N = t !== this.ov;
        this.G();
    }
    G() {
        if (this.N) {
            this.N = false;
            this.ov = this.v;
            switch (this.W) {
              case "class":
                this.o.classList.toggle(this.H, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let e = this.v;
                    if (bt(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.H, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.W); else this.o.setAttribute(this.W, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let i = 0, s = t.length; s > i; ++i) {
            const s = t[i];
            if ("attributes" === s.type && s.attributeName === this.H) {
                e = true;
                break;
            }
        }
        if (e) {
            let t;
            switch (this.W) {
              case "class":
                t = this.o.classList.contains(this.H);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.H);
                break;

              default:
                throw new Error(`AUR0651:${this.W}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.N = false;
                this.X();
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.H);
            we(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) be(this.o, this);
    }
    X() {
        ke = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ke);
    }
}

E(AttributeObserver);

const we = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(xe)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const be = (t, e) => {
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

const xe = t => {
    t[0].target.$eMObs.forEach(ye, t);
};

function ye(t) {
    t.handleMutation(this);
}

let ke;

const Ce = {
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
        this.boundFn = false;
        this.K = t;
        this.target = r;
        this.oL = i;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        $(this.ast, this.$scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.mode;
        const e = this.interceptor;
        const i = this.$scope;
        const s = this.targetObserver;
        const n = 1 !== this.K.state && (4 & s.type) > 0;
        let r = false;
        let o;
        r = 0 === (1 & t);
        if (r) this.obs.version++;
        const l = I(this.ast, i, this, e);
        if (r) this.obs.clear();
        if (l !== this.value) {
            this.value = l;
            if (n) {
                o = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    e.updateTarget(l);
                }), Ce);
                o?.cancel();
            } else e.updateTarget(l);
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        T(this.ast, t, this.interceptor);
        let e = this.targetObserver;
        if (!e) e = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        const i = this.mode;
        const s = this.interceptor;
        let n = false;
        if (i & (2 | 1)) {
            n = (2 & i) > 0;
            s.updateTarget(this.value = I(this.ast, t, this, n ? s : null));
        }
        if (4 & i) e.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(s, this.locator.get(pe))));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        D(this.ast, this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

P(AttributeBinding);

me(true)(AttributeBinding);

const Ae = {
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
        this.K = t;
        this.oL = i;
        this.targetObserver = i.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, i, this);
    }
    Y() {
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
        const o = 1 !== this.K.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(s, this.target, this.targetProperty);
            }), Ae);
            l?.cancel();
            l = null;
        } else r.setValue(s, this.target, this.targetProperty);
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
        this.updateTarget();
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

me(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, i, s, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = i;
        this.locator = s;
        this.owner = r;
        this.interceptor = this;
        this.mode = 2;
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.oL = n;
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.obs;
        let e = false;
        e = (2 & this.mode) > 0;
        if (e) t.version++;
        const i = I(this.ast, this.$scope, this, e ? this.interceptor : null);
        if (e) t.clear();
        if (i != this.v) {
            this.v = i;
            if (vt(i)) this.observeCollection(i);
            this.owner.Y();
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.isBound = true;
        this.$scope = t;
        T(this.ast, t, this.interceptor);
        this.v = I(this.ast, t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (vt(this.v)) this.observeCollection(this.v);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

P(InterpolationPartBinding);

me(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.locator = e;
        this.taskQueue = s;
        this.p = n;
        this.ast = r;
        this.target = o;
        this.strict = l;
        this.interceptor = this;
        this.mode = 2;
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.K = t;
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
        const e = I(this.ast, this.$scope, this, t ? this.interceptor : null);
        if (t) this.obs.clear();
        if (e === this.v) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const i = 1 !== this.K.state;
        if (i) this.queueUpdate(e); else this.updateTarget(e);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.v = I(this.ast, this.$scope, this, (2 & this.mode) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (vt(t)) this.observeCollection(t);
        const e = 1 !== this.K.state;
        if (e) this.queueUpdate(t); else this.updateTarget(t);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.isBound = true;
        this.$scope = t;
        T(this.ast, t, this.interceptor);
        const e = this.v = I(this.ast, t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (vt(e)) this.observeCollection(e);
        this.updateTarget(e);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        D(this.ast, this.$scope, this.interceptor);
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
        }), Ae);
        e?.cancel();
    }
}

P()(ContentBinding);

me(void 0, false)(ContentBinding);

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
        this.boundFn = false;
        this.oL = e;
        this.Z = n;
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.target;
        const e = this.targetProperty;
        const i = t[e];
        this.obs.version++;
        const s = I(this.ast, this.$scope, this, this.interceptor);
        this.obs.clear();
        if (s !== i) t[e] = s;
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        this.target = this.Z ? t.bindingContext : t.overrideContext;
        T(this.ast, t, this.interceptor);
        this.target[this.targetProperty] = I(this.ast, t, this, this.interceptor);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        D(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

P(LetBinding);

me(true)(LetBinding);

const Re = {
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
        this.boundFn = false;
        this.K = t;
        this.J = s;
        this.oL = i;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        $(this.ast, this.$scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.K.state && (4 & this.targetObserver.type) > 0;
        const e = this.obs;
        let i = false;
        i = this.mode > 1;
        if (i) e.version++;
        const s = I(this.ast, this.$scope, this, this.interceptor);
        if (i) e.clear();
        if (t) {
            Se = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(s);
                this.task = null;
            }), Re);
            Se?.cancel();
            Se = null;
        } else this.interceptor.updateTarget(s);
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        T(this.ast, t, this.interceptor);
        const e = this.oL;
        const i = this.mode;
        let s = this.targetObserver;
        if (!s) {
            if (4 & i) s = e.getObserver(this.target, this.targetProperty); else s = e.getAccessor(this.target, this.targetProperty);
            this.targetObserver = s;
        }
        const n = this.interceptor;
        const r = (2 & i) > 0;
        if (i & (2 | 1)) n.updateTarget(I(this.ast, t, this, r ? n : null));
        if (4 & i) {
            s.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n, this.locator.get(pe))));
            if (!r) n.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        D(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        Se = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != Se) {
            Se.cancel();
            Se = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

P(PropertyBinding);

me(true, false)(PropertyBinding);

let Se = null;

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
        T(this.ast, t, this);
        $(this.ast, this.$scope, this, this.target);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (I(this.ast, this.$scope, this, null) === this.target) $(this.ast, this.$scope, this, null);
        D(this.ast, this.$scope, this.interceptor);
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

const Be = Lt("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(qt(Be, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Ee = Object.freeze({
    creating: Ie("creating"),
    hydrating: Ie("hydrating"),
    hydrated: Ie("hydrated"),
    activating: Ie("activating"),
    activated: Ie("activated"),
    deactivating: Ie("deactivating"),
    deactivated: Ie("deactivated")
});

function Ie(t) {
    function e(e, i) {
        if (wt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Te(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt(Pe, ChildrenDefinition.create(e, i), t.constructor, e);
        at(t.constructor, $e.keyFrom(e));
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

function De(t) {
    return t.startsWith(Pe);
}

const Pe = lt("children-observer");

const $e = Object.freeze({
    name: Pe,
    keyFrom: t => `${Pe}:${t}`,
    from(...t) {
        const e = {};
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function s(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function n(t) {
            if (vt(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => s(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(t) {
        const i = Pe.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        while (--r >= 0) {
            c = n[r];
            l = ut(c).filter(De);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = it(Pe, c, l[t].slice(i));
        }
        return s;
    }
});

const Le = {
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? Le, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = Oe, r = Ue, o = qe, l) {
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
            this.children = l;
        }
    }
    tt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return Fe(this.controller, this.query, this.filter, this.map);
    }
}

E()(ChildrenObserver);

function Oe(t) {
    return t.host.childNodes;
}

function Ue(t, e, i) {
    return !!i;
}

function qe(t, e, i) {
    return i;
}

const je = {
    optional: true
};

function Fe(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = wi(l, je);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

function _e(t) {
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
        return new CustomAttributeDefinition(e, i(He(e, "name"), s), c(He(e, "aliases"), n.aliases, e.aliases), Ne(s), i(He(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(He(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Bt.from(e, ...Bt.getAll(e), He(e, "bindables"), e.bindables, n.bindables), i(He(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), c(Je.getAnnotation(e), e.watches), c(He(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ft(i, e).register(t);
        Ut(i, e).register(t);
        Vt(s, Ke, i, t);
    }
}

const Ve = ht("custom-attribute");

const Ne = t => `${Ve}:${t}`;

const He = (t, e) => it(lt(e), t);

const We = t => wt(t) && st(Ve, t);

const ze = (t, e) => $s(t, Ne(e)) ?? void 0;

const Ge = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    nt(Ve, i, i.Type);
    nt(Ve, i, i);
    ct(e, Ve);
    return i.Type;
};

const Xe = t => {
    const e = it(Ve, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
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
    if (null == t) throw new Error(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!wt(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!wt(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        Je.add(l, h);
        if (We(l)) Xe(l).watches.push(h);
        if (vi(l)) xi(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Ye = l;

const Ze = lt("watch");

const Je = Object.freeze({
    name: Ze,
    add(t, e) {
        let i = it(Ze, t);
        if (null == i) nt(Ze, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return it(Ze, t) ?? Ye;
    }
});

function ti(t) {
    return function(e) {
        return pi(t, e);
    };
}

function ei(t) {
    if (void 0 === t) return function(t) {
        gi(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!wt(t)) return function(e) {
        gi(e, "shadowOptions", t);
    };
    gi(t, "shadowOptions", {
        mode: "open"
    });
}

function ii(t) {
    if (void 0 === t) return function(t) {
        si(t);
    };
    si(t);
}

function si(t) {
    const e = it(fi, t);
    if (void 0 === e) {
        gi(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function ni(t) {
    if (void 0 === t) return function(t) {
        gi(t, "isStrictBinding", true);
    };
    gi(t, "isStrictBinding", true);
}

const ri = new WeakMap;

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
            const s = u("name", i, mi);
            if (wt(i.Type)) e = i.Type; else e = ki(f(s));
            return new CustomElementDefinition(e, s, c(i.aliases), u("key", i, (() => di(s))), u("cache", i, li), u("capture", i, ci), u("template", i, hi), c(i.instructions), c(i.dependencies), u("injectable", i, hi), u("needsCompile", i, ai), c(i.surrogates), Bt.from(e, i.bindables), $e.from(i.childrenObservers), u("containerless", i, ci), u("isStrictBinding", i, ci), u("shadowOptions", i, hi), u("hasSlots", i, ci), u("enhance", i, ci), u("watches", i, ui), d("processContent", e, hi));
        }
        if (bt(t)) return new CustomElementDefinition(e, t, c(bi(e, "aliases"), e.aliases), di(t), d("cache", e, li), d("capture", e, ci), d("template", e, hi), c(bi(e, "instructions"), e.instructions), c(bi(e, "dependencies"), e.dependencies), d("injectable", e, hi), d("needsCompile", e, ai), c(bi(e, "surrogates"), e.surrogates), Bt.from(e, ...Bt.getAll(e), bi(e, "bindables"), e.bindables), $e.from(...$e.getAll(e), bi(e, "childrenObservers"), e.childrenObservers), d("containerless", e, ci), d("isStrictBinding", e, ci), d("shadowOptions", e, hi), d("hasSlots", e, ci), d("enhance", e, ci), c(Je.getAnnotation(e), e.watches), d("processContent", e, hi));
        const i = u("name", t, mi);
        return new CustomElementDefinition(e, i, c(bi(e, "aliases"), t.aliases, e.aliases), di(i), a("cache", t, e, li), a("capture", t, e, ci), a("template", t, e, hi), c(bi(e, "instructions"), t.instructions, e.instructions), c(bi(e, "dependencies"), t.dependencies, e.dependencies), a("injectable", t, e, hi), a("needsCompile", t, e, ai), c(bi(e, "surrogates"), t.surrogates, e.surrogates), Bt.from(e, ...Bt.getAll(e), bi(e, "bindables"), e.bindables, t.bindables), $e.from(...$e.getAll(e), bi(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), a("containerless", t, e, ci), a("isStrictBinding", t, e, ci), a("shadowOptions", t, e, hi), a("hasSlots", t, e, ci), a("enhance", t, e, ci), c(t.watches, Je.getAnnotation(e), e.watches), a("processContent", t, e, hi));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (ri.has(t)) return ri.get(t);
        const e = CustomElementDefinition.create(t);
        ri.set(t, e);
        nt(fi, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            Ft(i, e).register(t);
            Ut(i, e).register(t);
            Vt(s, Ci, i, t);
        }
    }
}

const oi = {
    name: void 0,
    searchParents: false,
    optional: false
};

const li = () => 0;

const hi = () => null;

const ci = () => false;

const ai = () => true;

const ui = () => l;

const fi = ht("custom-element");

const di = t => `${fi}:${t}`;

const mi = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const gi = (t, e, i) => {
    nt(lt(e), i, t);
};

const pi = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    nt(fi, i, i.Type);
    nt(fi, i, i);
    ct(i.Type, fi);
    return i.Type;
};

const vi = t => wt(t) && st(fi, t);

const wi = (t, e = oi) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = $s(t, fi);
        if (null === i) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = $s(t, fi);
            if (null === i) throw new Error(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = $s(i, fi);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = Fs(i);
        }
        if (s) return;
        throw new Error(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = $s(i, fi);
        if (null !== t) return t;
        i = Fs(i);
    }
    throw new Error(`AUR0765`);
};

const bi = (t, e) => it(lt(e), t);

const xi = t => {
    const e = it(fi, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const yi = () => {
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

const ki = function() {
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

const Ci = Object.freeze({
    name: fi,
    keyFrom: di,
    isType: vi,
    for: wi,
    define: pi,
    getDefinition: xi,
    annotate: gi,
    getAnnotation: bi,
    generateName: mi,
    createInjectable: yi,
    generateType: ki
});

const Ai = lt("processContent");

function Ri(t) {
    return void 0 === t ? function(t, e, i) {
        nt(Ai, Si(t, e), t);
    } : function(e) {
        t = Si(e, t);
        const i = it(fi, e);
        if (void 0 !== i) i.processContent = t; else nt(Ai, t, e);
        return e;
    };
}

function Si(t, e) {
    if (bt(e)) e = t[e];
    if (!wt(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function Bi(t) {
    return function(e) {
        const i = wt(t) ? t : true;
        gi(e, "capture", i);
        if (vi(e)) xi(e).capture = i;
    };
}

const Ei = m;

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.et = {};
        this.it = 0;
        this.N = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t) {
        this.value = t;
        this.N = t !== this.ov;
        this.G();
    }
    G() {
        if (this.N) {
            this.N = false;
            const t = this.value;
            const e = this.et;
            const i = Ii(t);
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

function Ii(t) {
    if (bt(t)) return Ti(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...Ii(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...Ti(i)); else e.push(i);
    return e;
}

function Ti(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

function Di(...t) {
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
                this.element.className = Ii(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ Os ], e));
        t.register(s);
    }
}

function Pi(...t) {
    return new ShadowDOMRegistry(t);
}

const $i = Lt("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Ei))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Oi);
        const i = t.get($i);
        t.register(qt(Li, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Ei ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Ei ];

const Li = Lt("IShadowDOMStyles");

const Oi = Lt("IShadowDOMGlobalStyles", (t => t.instance({
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

const Ui = {
    shadowDOM(t) {
        return Ee.creating(g, (e => {
            if (null != t.sharedStyles) {
                const i = e.get($i);
                e.register(qt(Oi, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: qi, exit: ji} = L;

const {wrap: Fi, unwrap: _i} = O;

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
            qi(this);
            return this.value = _i(this.$get.call(void 0, this.useProxy ? Fi(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ji(this);
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
            t = I(e, this.scope, this, this);
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
        this.value = I(this.expression, this.scope, this, this);
        this.obs.clear();
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
        this.value = void 0;
    }
}

P(ComputedWatcher);

me(true)(ComputedWatcher);

P(ExpressionWatcher);

me(true)(ExpressionWatcher);

const Mi = Lt("ILifecycleHooks");

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
        Ot(Mi, this.Type).register(t);
    }
}

const Vi = new WeakMap;

const Ni = lt("lifecycle-hooks");

const Hi = Object.freeze({
    name: Ni,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        nt(Ni, i, e);
        ct(e, Ni);
        return i.Type;
    },
    resolve(t) {
        let e = Vi.get(t);
        if (void 0 === e) {
            Vi.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Mi) : t.has(Mi, false) ? i.getAll(Mi).concat(t.getAll(Mi)) : i.getAll(Mi);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = it(Ni, n.constructor);
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

function Wi() {
    return function t(e) {
        return Hi.define({}, e);
    };
}

const zi = Lt("IViewFactory");

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

const Gi = new WeakSet;

function Xi(t) {
    return !Gi.has(t);
}

function Ki(t) {
    Gi.add(t);
    return CustomElementDefinition.create(t);
}

const Qi = ht("views");

const Yi = Object.freeze({
    name: Qi,
    has(t) {
        return wt(t) && (st(Qi, t) || "$views" in t);
    },
    get(t) {
        if (wt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Xi).map(Ki);
            for (const e of i) Yi.add(t, e);
        }
        let e = it(Qi, t);
        if (void 0 === e) nt(Qi, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = it(Qi, t);
        if (void 0 === s) nt(Qi, s = [ i ], t); else s.push(i);
        return s;
    }
});

function Zi(t) {
    return function(e) {
        Yi.add(e, t);
    };
}

const Ji = Lt("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Yi.has(t.constructor) ? Yi.get(t.constructor) : [];
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
            n = pi(xi(r), class extends r {
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
            n = pi(this.ct(e, i), class {
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

const ts = Lt("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.p = (this.dt = t.root).get(Ei);
        this.gt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.vt ? this.vt = this.dt.getAll(sn, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), ft()) : this.vt;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ut;
            const n = e.get(en);
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
        const i = this.ft;
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
        return null == e ? this.gt : new FragmentNodeSequence(this.p, e.cloneNode(true));
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

Rendering.inject = [ g ];

var es;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(es || (es = {}));

var is;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(is || (is = {}));

const ss = {
    optional: true
};

const ns = new WeakMap;

class Controller {
    constructor(t, e, i, s, n, r, o) {
        this.container = t;
        this.vmKind = e;
        this.definition = i;
        this.viewFactory = s;
        this.viewModel = n;
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
        this.lifecycleHooks = null;
        this.state = 0;
        this.wt = false;
        this.bt = l;
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
        this.r = t.root.get(ts);
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
        return ns.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (ns.has(e)) return ns.get(e);
        n = n ?? xi(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(p(ws));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        _t(t, ws, new v("IHydrationContext", new HydrationContext(o, s, l)));
        ns.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (ns.has(e)) return ns.get(e);
        s = s ?? Xe(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        ns.set(e, n);
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
        let r = this.definition;
        this.scope = U.create(n, null, true);
        if (r.watches.length > 0) as(this, i, r, n);
        os(this, r, s, n);
        this.bt = ls(this, r, n);
        if (this.hooks.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Hi.resolve(i);
        r.register(i);
        if (null !== r.injectable) _t(i, r.injectable, new v("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(ys, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = wi(this.host, ss))) {
            this.host = this.container.root.get(Ei).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Ms(this.host);
        }
        Ls(this.host, fi, this);
        Ls(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw new Error(`AUR0501`);
            Ls(this.shadowRoot = this.host.attachShadow(i ?? ds), fi, this);
            Ls(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Ls(o, fi, this);
            Ls(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(ks, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Rt, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(xs, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    Ct() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) as(this, this.container, t, e);
        os(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Hi.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(xs, this);
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
            throw new Error(`AUR0503:${this.name} ${ps(this.state)}`);
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
            if (void 0 === s || null === s) throw new Error(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = t;
        this.$flags = i;
        this.St();
        let n;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) n = w(...this.lifecycleHooks.binding.map(Cs, this));
        if (this.hooks.hasBinding) n = w(n, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (pt(n)) {
            this.Bt();
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = w(...this.lifecycleHooks.bound.map(As, this));
        if (this.hooks.hasBound) i = w(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (pt(i)) {
            this.Bt();
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
                const e = t.has(Li, false) ? t.get(Li) : t.get(Oi);
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) e = w(...this.lifecycleHooks.attaching.map(Rs, this));
        if (this.hooks.hasAttaching) e = w(e, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (pt(e)) {
            this.Bt();
            this.St();
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
            throw new Error(`AUR0505:${this.name} ${ps(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Pt();
        let s = 0;
        let n;
        if (this.bt.length) for (;s < this.bt.length; ++s) this.bt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) n = w(...this.lifecycleHooks.detaching.map(Bs, this));
        if (this.hooks.hasDetaching) n = w(n, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (pt(n)) {
            this.Bt();
            t.Pt();
            n.then((() => {
                t.$t();
            })).catch((e => {
                t.Et(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.$t();
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
            this.scope.parent = null;
            break;
        }
        if (4 === (4 & t) && this.$initiator === this) this.dispose();
        this.state = 32 & this.state | 8;
        this.$initiator = null;
        this.Lt();
    }
    Bt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Bt();
        }
    }
    Lt() {
        if (void 0 !== this.$promise) {
            Is = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Is();
            Is = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            Ts = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ts(t);
            Ts = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    St() {
        ++this.xt;
        if (this.$initiator !== this) this.parent.St();
    }
    Dt() {
        if (0 === --this.xt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Ds = w(...this.lifecycleHooks.attached.map(Ss, this));
            if (this.hooks.hasAttached) Ds = w(Ds, this.viewModel.attached(this.$initiator, this.$flags));
            if (pt(Ds)) {
                this.Bt();
                Ds.then((() => {
                    this.state = 2;
                    this.Lt();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                Ds = void 0;
                return;
            }
            Ds = void 0;
            this.state = 2;
            this.Lt();
        }
        if (this.$initiator !== this) this.parent.Dt();
    }
    Pt() {
        ++this.yt;
    }
    $t() {
        if (0 === --this.yt) {
            this.Ot();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) e = w(...t.lifecycleHooks.unbinding.map(Es, this));
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = w(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (pt(e)) {
                    this.Bt();
                    this.Ot();
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
    Ot() {
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
            return Xe(this.viewModel.constructor).name === t;

          case 0:
            return xi(this.viewModel.constructor).name === t;

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
            Ls(t, fi, this);
            Ls(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Ls(t, fi, this);
            Ls(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Ls(t, fi, this);
            Ls(t, this.definition.key, this);
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
            this.children.forEach(bs);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            ns.delete(this.viewModel);
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

function rs(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function os(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = rs(s);
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

function ls(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = rs(i);
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

const hs = new Map;

const cs = t => {
    let e = hs.get(t);
    if (null == e) {
        e = new _(t, 0);
        hs.set(t, e);
    }
    return e;
};

function as(t, e, i, s) {
    const n = e.get(j);
    const r = e.get(F);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : U.create(s, null, true);
    const h = o.length;
    let c;
    let a;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: c, callback: a} = o[f]);
        a = wt(a) ? a : Reflect.get(s, a);
        if (!wt(a)) throw new Error(`AUR0506:${String(a)}`);
        if (wt(c)) t.addBinding(new ComputedWatcher(s, n, c, a, true)); else {
            u = bt(c) ? r.parse(c, 8) : cs(c);
            t.addBinding(new ExpressionWatcher(l, e, n, u, a));
        }
    }
}

function us(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function fs(t) {
    return B(t) && vi(t.constructor);
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

const ds = {
    mode: "open"
};

var ms;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(ms || (ms = {}));

var gs;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(gs || (gs = {}));

function ps(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const vs = Lt("IController");

const ws = Lt("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function bs(t) {
    t.dispose();
}

function xs(t) {
    t.instance.created(this.viewModel, this);
}

function ys(t) {
    t.instance.hydrating(this.viewModel, this);
}

function ks(t) {
    t.instance.hydrated(this.viewModel, this);
}

function Cs(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function As(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Rs(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ss(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function Bs(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Es(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let Is;

let Ts;

let Ds;

const Ps = Lt("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.qt = void 0;
        this.host = t.host;
        s.prepare(this);
        _t(i, e.HTMLElement, _t(i, e.Element, _t(i, Os, new v("ElementResolver", t.host))));
        this.qt = b(this.jt("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (vi(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return b(this.jt("hydrating"), (() => {
                o.hS(null);
                return b(this.jt("hydrated"), (() => {
                    o.hC();
                    this.qt = void 0;
                }));
            }));
        }));
    }
    activate() {
        return b(this.qt, (() => b(this.jt("activating"), (() => b(this.controller.activate(this.controller, null, 1, void 0), (() => this.jt("activated")))))));
    }
    deactivate() {
        return b(this.jt("deactivating"), (() => b(this.controller.deactivate(this.controller, null, 0), (() => this.jt("deactivated")))));
    }
    jt(t) {
        return w(...this.container.getAll(Be).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function $s(t, e) {
    return t.$au?.[e] ?? null;
}

function Ls(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const Os = Lt("INode");

const Us = Lt("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Ps, true)) return t.get(Ps).host;
    return t.get(Ei).document;
}))));

const qs = Lt("IRenderLocation");

const js = new WeakMap;

function Fs(t) {
    if (js.has(t)) return js.get(t);
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
        const e = wi(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Fs(e.host);
    }
    return t.parentNode;
}

function _s(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) js.set(i[t], e);
    } else js.set(t, e);
}

function Ms(t) {
    if (Vs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function Vs(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Ms(r); else o[s] = r;
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
        if (Vs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Ns = Lt("IWindow", (t => t.callback((t => t.get(Ei).window))));

const Hs = Lt("ILocation", (t => t.callback((t => t.get(Ns).location))));

const Ws = Lt("IHistory", (t => t.callback((t => t.get(Ns).history))));

const zs = {
    [1]: {
        capture: true
    },
    [2]: {
        capture: false
    }
};

class ListenerOptions {
    constructor(t, e) {
        this.prevent = t;
        this.strategy = e;
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
        this.boundFn = true;
        this.Ft = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let i = I(this.ast, this.$scope, this, null);
        delete e.$event;
        if (wt(i)) i = i(t);
        if (true !== i && this.Ft.prevent) t.preventDefault();
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
        T(this.ast, t, this.interceptor);
        if (0 === this.Ft.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Us), this.target, this.targetEvent, this, zs[this.Ft.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        D(this.ast, this.$scope, this.interceptor);
        this.$scope = null;
        if (0 === this.Ft.strategy) this.target.removeEventListener(this.targetEvent, this); else {
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

me(true, true)(Listener);

const Gs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = Gs) {
        this._t = t;
        this.Mt = e;
        this.Ft = i;
        this.Vt = 0;
        this.Nt = new Map;
        this.Ht = new Map;
    }
    Wt() {
        if (1 === ++this.Vt) this._t.addEventListener(this.Mt, this, this.Ft);
    }
    zt() {
        if (0 === --this.Vt) this._t.removeEventListener(this.Mt, this, this.Ft);
    }
    dispose() {
        if (this.Vt > 0) {
            this.Vt = 0;
            this._t.removeEventListener(this.Mt, this, this.Ft);
        }
        this.Nt.clear();
        this.Ht.clear();
    }
    Gt(t) {
        const e = true === this.Ft.capture ? this.Nt : this.Ht;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = ft());
        return i;
    }
    handleEvent(t) {
        const e = true === this.Ft.capture ? this.Nt : this.Ht;
        const i = t.composedPath();
        if (true === this.Ft.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.Mt];
            if (void 0 === n) continue;
            if (wt(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, i, s) {
        this.Xt = t;
        this.Kt = e;
        this.Mt = i;
        t.Wt();
        e[i] = s;
    }
    dispose() {
        this.Xt.zt();
        this.Kt[this.Mt] = void 0;
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

const Xs = Lt("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Qt = ft();
    }
    addEventListener(t, e, i, s, n) {
        var r;
        const o = (r = this.Qt)[i] ?? (r[i] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, i, n));
        return new DelegateSubscription(l, l.Gt(e), i, s);
    }
    dispose() {
        for (const t in this.Qt) {
            const e = this.Qt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Ks = Lt("IProjections");

const Qs = Lt("IAuSlotsInfo");

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
})(Ys || (Ys = {}));

const Zs = Lt("Instruction");

function Js(t) {
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

class CallBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "rh";
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

var tn;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(tn || (tn = {}));

class ListenerBindingInstruction {
    constructor(t, e, i, s) {
        this.from = t;
        this.to = e;
        this.preventDefault = i;
        this.strategy = s;
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

const en = Lt("ITemplateCompiler");

const sn = Lt("IRenderer");

function nn(t) {
    return function e(i) {
        i.register = function(t) {
            Ot(sn, this).register(t);
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

function rn(t, e, i) {
    if (bt(e)) return t.parse(e, i);
    return e;
}

function on(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function ln(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return wi(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return wi(t).viewModel;

      default:
        {
            const i = ze(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = wi(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let hn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = on(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

hn = tt([ nn("re") ], hn);

let cn = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ ts, Ei ];
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
            s = c.find(Ci, l);
            if (null == s) throw new Error(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Ms(e) : null;
        const f = On(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        _t(f, n, new v(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        Ls(e, s.key, o);
        const d = this.r.renderers;
        const m = i.props;
        const g = m.length;
        let p = 0;
        let w;
        while (g > p) {
            w = m[p];
            d[w.type].render(t, o, w);
            ++p;
        }
        t.addChild(o);
    }
};

cn = tt([ nn("ra") ], cn);

let an = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ ts, Ei ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ke, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = Un(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Ls(e, n.key, o);
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

an = tt([ nn("rb") ], an);

let un = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ ts, Ei ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ke, i.res);
            if (null == n) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Ms(e);
        const l = Un(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Ls(o, n.key, h);
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

un = tt([ nn("rc") ], un);

let fn = class LetElementRenderer {
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
            h = rn(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(18 === h.$kind ? xn(c, h, r) : c);
            ++a;
        }
    }
};

fn.inject = [ F, j ];

fn = tt([ nn("rd") ], fn);

let dn = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, s, on(e), i.to);
        t.addBinding(18 === s.$kind ? xn(n, s, t.container) : n);
    }
};

dn.inject = [ F, j ];

dn = tt([ nn("rh") ], dn);

let mn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 8);
        const n = new RefBinding(t.container, s, ln(e, i.to));
        t.addBinding(18 === s.$kind ? xn(n, s, t.container) : n);
    }
};

mn.inject = [ F ];

mn = tt([ nn("rj") ], mn);

let gn = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = rn(this.ep, i.from, 1);
        const r = new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, on(e), i.to, 2);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (18 === c.ast.$kind) o[h] = xn(c, c.ast, s);
        }
        t.addBinding(r);
    }
};

gn.inject = [ F, j, Ei ];

gn = tt([ nn("rf") ], gn);

let pn = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, on(e), i.to, i.mode);
        t.addBinding(18 === s.$kind ? xn(n, s, t.container) : n);
    }
};

pn.inject = [ F, j, Ei ];

pn = tt([ nn("rg") ], pn);

let vn = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, on(e), i.to, 2);
        t.addBinding(18 === s.iterable.$kind ? xn(n, s.iterable, t.container) : n);
    }
};

vn.inject = [ F, j, Ei ];

vn = tt([ nn("rk") ], vn);

let wn = 0;

const bn = [];

function xn(t, e, i) {
    while (e instanceof M) {
        bn[wn++] = e;
        e = e.expression;
    }
    while (wn > 0) {
        const e = bn[--wn];
        const s = i.get(ce.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    bn.length = 0;
    return t;
}

let yn = class TextBindingRenderer {
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
        const l = rn(this.ep, i.from, 1);
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
            t.addBinding(18 === m.$kind ? xn(d, m, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

yn.inject = [ F, j, Ei ];

yn = tt([ nn("ha") ], yn);

let kn = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.Yt = e;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 4);
        const n = new Listener(t.container, s, e, i.to, this.Yt, new ListenerOptions(i.preventDefault, i.strategy));
        t.addBinding(18 === s.$kind ? xn(n, s, t.container) : n);
    }
};

kn.inject = [ F, Xs ];

kn = tt([ nn("hb") ], kn);

let Cn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Cn = tt([ nn("he") ], Cn);

let An = class SetClassAttributeRenderer {
    render(t, e, i) {
        In(e.classList, i.value);
    }
};

An = tt([ nn("hf") ], An);

let Rn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Rn = tt([ nn("hg") ], Rn);

let Sn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, 2);
        t.addBinding(18 === s.$kind ? xn(n, s, t.container) : n);
    }
};

Sn.inject = [ F, j, Ei ];

Sn = tt([ nn("hd") ], Sn);

let Bn = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = rn(this.ep, i.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, 2);
        t.addBinding(18 === s.$kind ? xn(n, s, t.container) : n);
    }
};

Bn.inject = [ Ei, F, j ];

Bn = tt([ nn("hc") ], Bn);

let En = class SpreadRenderer {
    constructor(t, e) {
        this.Zt = t;
        this.r = e;
    }
    static get inject() {
        return [ en, ts ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(ws);
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
        const h = i => {
            const s = o(i);
            const n = Tn(s);
            const c = this.Zt.compileSpread(s.controller.definition, s.instruction?.captures ?? l, s.controller.container, e);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                r[a.instructions.type].render(n, wi(e), a.instructions);
                break;

              default:
                r[a.type].render(n, e, a);
            }
            t.addBinding(n);
        };
        h(0);
    }
};

En = tt([ nn("hs") ], En);

class SpreadBinding {
    constructor(t, e) {
        this.Jt = t;
        this.te = e;
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
        const e = this.$scope = this.te.controller.scope.parent ?? void 0;
        if (null == e) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.Jt.forEach((t => t.$bind(e)));
    }
    $unbind() {
        this.Jt.forEach((t => t.$unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.Jt.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function In(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Tn = t => new SpreadBinding([], t);

const Dn = "IController";

const Pn = "IInstruction";

const $n = "IRenderLocation";

const Ln = "IAuSlotsInfo";

function On(t, e, i, s, n, r) {
    const o = e.container.createChild();
    _t(o, t.HTMLElement, _t(o, t.Element, _t(o, Os, new v("ElementResolver", i))));
    _t(o, vs, new v(Dn, e));
    _t(o, Zs, new v(Pn, s));
    _t(o, qs, null == n ? qn : new RenderLocationProvider(n));
    _t(o, zi, jn);
    _t(o, Qs, null == r ? Fn : new v(Ln, r));
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

function Un(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    _t(h, t.HTMLElement, _t(h, t.Element, _t(h, Os, new v("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    _t(h, vs, new v(Dn, i));
    _t(h, Zs, new v(Pn, n));
    _t(h, qs, null == o ? qn : new v($n, o));
    _t(h, zi, null == r ? jn : new ViewFactoryProvider(r));
    _t(h, Qs, null == l ? Fn : new v(Ln, l));
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

const qn = new RenderLocationProvider(null);

const jn = new ViewFactoryProvider(null);

const Fn = new v(Ln, new AuSlotsInfo(l));

var _n;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(_n || (_n = {}));

function Mn(t) {
    return function(e) {
        return Wn.define(t, e);
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
        return new BindingCommandDefinition(e, i(Hn(e, "name"), s), c(Hn(e, "aliases"), n.aliases, e.aliases), Nn(s), i(Hn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ot(i, e).register(t);
        Ut(i, e).register(t);
        Vt(s, Wn, i, t);
    }
}

const Vn = ht("binding-command");

const Nn = t => `${Vn}:${t}`;

const Hn = (t, e) => it(lt(e), t);

const Wn = Object.freeze({
    name: Vn,
    keyFrom: Nn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        nt(Vn, i, i.Type);
        nt(Vn, i, i);
        ct(e, Vn);
        return i.Type;
    },
    getAnnotation: Hn
});

let zn = class OneTimeBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 1);
    }
};

zn = tt([ Mn("one-time") ], zn);

let Gn = class ToViewBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 2);
    }
};

Gn = tt([ Mn("to-view") ], Gn);

let Xn = class FromViewBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 4);
    }
};

Xn = tt([ Mn("from-view") ], Xn);

let Kn = class TwoWayBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(r, 8), n, 6);
    }
};

Kn = tt([ Mn("two-way") ], Kn);

let Qn = class DefaultBindingCommand {
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
        return new PropertyBindingInstruction(e.parse(h, 8), l, o);
    }
};

Qn = tt([ Mn("bind") ], Qn);

let Yn = class CallBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(e.parse(t.attr.rawValue, 8 | 4), i);
    }
};

Yn = tt([ Mn("call") ], Yn);

let Zn = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(e.parse(t.attr.rawValue, 2), i);
    }
};

Zn = tt([ Mn("for") ], Zn);

let Jn = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, 0);
    }
};

Jn = tt([ Mn("trigger") ], Jn);

let tr = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 2);
    }
};

tr = tt([ Mn("delegate") ], tr);

let er = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 1);
    }
};

er = tt([ Mn("capture") ], er);

let ir = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

ir = tt([ Mn("attr") ], ir);

let sr = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

sr = tt([ Mn("style") ], sr);

let nr = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

nr = tt([ Mn("class") ], nr);

let rr = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

rr = tt([ Mn("ref") ], rr);

let or = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

or = tt([ Mn("...$attrs") ], or);

const lr = Lt("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const hr = t => {
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
        this.ee = Object.assign(ft(), {
            a: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: hr("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: ft(),
            altGlyphDef: hr("id xml:base xml:lang xml:space"),
            altglyphdef: ft(),
            altGlyphItem: hr("id xml:base xml:lang xml:space"),
            altglyphitem: ft(),
            animate: hr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: hr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: hr("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: hr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: hr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: hr("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": hr("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: hr("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: hr("class id style xml:base xml:lang xml:space"),
            ellipse: hr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: hr("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: hr("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: hr("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: hr("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: hr("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: hr("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: hr("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: hr("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: hr("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: hr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: hr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: hr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: hr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: hr("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: hr("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: hr("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: hr("id xml:base xml:lang xml:space"),
            feMorphology: hr("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: hr("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: hr("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: hr("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: hr("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: hr("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: hr("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: hr("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: hr("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": hr("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": hr("id string xml:base xml:lang xml:space"),
            "font-face-name": hr("id name xml:base xml:lang xml:space"),
            "font-face-src": hr("id xml:base xml:lang xml:space"),
            "font-face-uri": hr("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: hr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: hr("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: hr("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: ft(),
            hkern: hr("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: hr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: hr("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: hr("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: hr("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: hr("id xml:base xml:lang xml:space"),
            "missing-glyph": hr("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: hr("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: hr("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: hr("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: hr("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: hr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: hr("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: hr("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: hr("class id offset style xml:base xml:lang xml:space"),
            style: hr("id media title type xml:base xml:lang xml:space"),
            svg: hr("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: hr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: hr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: hr("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: hr("class id style xml:base xml:lang xml:space"),
            tref: hr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: hr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: hr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: hr("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: hr("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.ie = hr("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.se = hr("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.ee;
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
        return Ot(lr, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.ie[t.nodeName] && true === this.se[e] || true === this.ee[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ Ei ];

const cr = Lt("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ne = ft();
        this.re = ft();
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
        return [ lr ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.ne)[n] ?? (e[n] = ft());
            for (r in i) {
                if (void 0 !== s[r]) throw ur(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.re;
        for (const i in t) {
            if (void 0 !== e[i]) throw ur(i, "*");
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
        return this.ne[t.nodeName]?.[e] ?? this.re[e] ?? (gt(t, e, this.svg) ? e : null);
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

function ur(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const fr = Lt("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const dr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.oe = t.document.createElement("template");
    }
    createTemplate(t) {
        if (bt(t)) {
            let e = dr[t];
            if (void 0 === e) {
                const i = this.oe;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.oe = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                dr[t] = e;
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

TemplateElementFactory.inject = [ Ei ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Ot(en, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = pr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = bt(s.template) || !t.enhance ? n.le.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const c = e.get($t(Sr));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(Cr)) throw new Error(`AUR0701`);
        this.he(h, n);
        this.ce(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || mi(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.ae(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, pr, null, null, void 0);
        const r = [];
        const o = n.ue(s.nodeName.toLowerCase());
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
        let C;
        for (;c > a; ++a) {
            u = e[a];
            k = u.target;
            C = u.rawValue;
            w = n.fe(u);
            if (null !== w && (1 & w.type) > 0) {
                wr.node = s;
                wr.attr = u;
                wr.bindable = null;
                wr.def = null;
                r.push(w.build(wr, n.ep, n.m));
                continue;
            }
            f = n.de(k);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === w && mr(C);
                if (y) m = this.me(s, C, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        b = h.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        wr.node = s;
                        wr.attr = u;
                        wr.bindable = v;
                        wr.def = f;
                        m = [ w.build(wr, n.ep, n.m) ];
                    }
                }
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === w) {
                b = h.parse(C, 1);
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        b = h.parse(C, 1);
                        r.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(C, p.property) : new InterpolationInstruction(b, p.property)));
                        continue;
                    }
                }
                if (null != b) r.push(new InterpolationInstruction(b, n.m.map(s, k) ?? x(k))); else switch (k) {
                  case "class":
                    r.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    r.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    r.push(new SetAttributeInstruction(C, k));
                }
            } else {
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        wr.node = s;
                        wr.attr = u;
                        wr.bindable = p;
                        wr.def = o;
                        r.push(new SpreadElementPropBindingInstruction(w.build(wr, n.ep, n.m)));
                        continue;
                    }
                }
                wr.node = s;
                wr.attr = u;
                wr.bindable = null;
                wr.def = null;
                r.push(w.build(wr, n.ep, n.m));
            }
        }
        gr();
        if (null != d) return d.concat(r);
        return r;
    }
    ae(t, e) {
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
            a = e.ge.parse(h, c);
            b = a.target;
            y = a.rawValue;
            if (br[b]) throw new Error(`AUR0702:${h}`);
            p = e.fe(a);
            if (null !== p && (1 & p.type) > 0) {
                wr.node = t;
                wr.attr = a;
                wr.bindable = null;
                wr.def = null;
                i.push(p.build(wr, e.ep, e.m));
                continue;
            }
            u = e.de(b);
            if (null !== u) {
                if (u.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && mr(y);
                if (w) d = this.me(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        wr.node = t;
                        wr.attr = a;
                        wr.bindable = g;
                        wr.def = u;
                        d = [ p.build(wr, e.ep, e.m) ];
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
                wr.node = t;
                wr.attr = a;
                wr.bindable = null;
                wr.def = null;
                i.push(p.build(wr, e.ep, e.m));
            }
        }
        gr();
        if (null != f) return f.concat(i);
        return i;
    }
    ce(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.pe(t, e);

              default:
                return this.ve(t, e);
            }

          case 3:
            return this.we(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.ce(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    pe(t, e) {
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
            c = e.ge.parse(a, u);
            d = c.target;
            m = c.rawValue;
            f = e.fe(c);
            if (null !== f) {
                if ("bind" === c.command) n.push(new LetBindingInstruction(r.parse(m, 8), x(d))); else throw new Error(`AUR0704:${c.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new V(m) : g, x(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.be(t).nextSibling;
    }
    ve(t, e) {
        var i, s, r, o;
        const h = t.nextSibling;
        const c = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const a = e.ue(c);
        const u = null !== a;
        const f = u && null != a.shadowOptions;
        const d = a?.capture;
        const m = null != d && "boolean" !== typeof d;
        const g = d ? [] : l;
        const p = e.ep;
        const v = this.debug ? n : () => {
            t.removeAttribute(A);
            --k;
            --y;
        };
        let w = t.attributes;
        let b;
        let y = w.length;
        let k = 0;
        let C;
        let A;
        let R;
        let S;
        let B;
        let E;
        let I = null;
        let T = false;
        let D;
        let P;
        let $;
        let L;
        let O;
        let U;
        let q;
        let j = null;
        let F;
        let _;
        let M;
        let V;
        let N = true;
        let H = false;
        let W = false;
        if ("slot" === c) {
            if (null == e.root.def.shadowOptions) throw new Error(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (u) {
            N = a.processContent?.call(a.Type, t, e.p);
            w = t.attributes;
            y = w.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;y > k; ++k) {
            C = w[k];
            A = C.name;
            R = C.value;
            switch (A) {
              case "as-element":
              case "containerless":
                v();
                if (!H) H = "containerless" === A;
                continue;
            }
            S = e.ge.parse(A, R);
            j = e.fe(S);
            M = S.target;
            V = S.rawValue;
            if (d && (!m || m && d(M))) {
                if (null != j && 1 & j.type) {
                    v();
                    g.push(S);
                    continue;
                }
                W = "au-slot" !== M && "slot" !== M;
                if (W) {
                    F = BindablesInfo.from(a, false);
                    if (null == F.attrs[M] && !e.de(M)?.isTemplateController) {
                        v();
                        g.push(S);
                        continue;
                    }
                }
            }
            if (null !== j && 1 & j.type) {
                wr.node = t;
                wr.attr = S;
                wr.bindable = null;
                wr.def = null;
                (B ?? (B = [])).push(j.build(wr, e.ep, e.m));
                v();
                continue;
            }
            I = e.de(M);
            if (null !== I) {
                F = BindablesInfo.from(I, true);
                T = false === I.noMultiBindings && null === j && mr(V);
                if (T) $ = this.me(t, V, I, e); else {
                    _ = F.primary;
                    if (null === j) {
                        U = p.parse(V, 1);
                        $ = [ null === U ? new SetPropertyInstruction(V, _.property) : new InterpolationInstruction(U, _.property) ];
                    } else {
                        wr.node = t;
                        wr.attr = S;
                        wr.bindable = _;
                        wr.def = I;
                        $ = [ j.build(wr, e.ep, e.m) ];
                    }
                }
                v();
                if (I.isTemplateController) (L ?? (L = [])).push(new HydrateTemplateController(vr, this.resolveResources ? I : I.name, void 0, $)); else (P ?? (P = [])).push(new HydrateAttributeInstruction(this.resolveResources ? I : I.name, null != I.aliases && I.aliases.includes(M) ? M : void 0, $));
                continue;
            }
            if (null === j) {
                if (u) {
                    F = BindablesInfo.from(a, false);
                    D = F.attrs[M];
                    if (void 0 !== D) {
                        U = p.parse(V, 1);
                        (E ?? (E = [])).push(null == U ? new SetPropertyInstruction(V, D.property) : new InterpolationInstruction(U, D.property));
                        v();
                        continue;
                    }
                }
                U = p.parse(V, 1);
                if (null != U) {
                    v();
                    (B ?? (B = [])).push(new InterpolationInstruction(U, e.m.map(t, M) ?? x(M)));
                }
                continue;
            }
            v();
            if (u) {
                F = BindablesInfo.from(a, false);
                D = F.attrs[M];
                if (void 0 !== D) {
                    wr.node = t;
                    wr.attr = S;
                    wr.bindable = D;
                    wr.def = a;
                    (E ?? (E = [])).push(j.build(wr, e.ep, e.m));
                    continue;
                }
            }
            wr.node = t;
            wr.attr = S;
            wr.bindable = null;
            wr.def = null;
            (B ?? (B = [])).push(j.build(wr, e.ep, e.m));
        }
        gr();
        if (this.xe(t) && null != B && B.length > 1) this.ye(t, B);
        if (u) {
            q = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, E ?? l, null, H, g);
            if (c === Pr) {
                const i = t.getAttribute("name") || Dr;
                const s = e.h("template");
                const n = e.ke();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.ce(s.content, n);
                q.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: mi(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Ce(t, e);
            }
        }
        if (null != B || null != q || null != P) {
            b = l.concat(q ?? l, P ?? l, B ?? l);
            this.be(t);
        }
        let z;
        if (null != L) {
            y = L.length - 1;
            k = y;
            O = L[k];
            let n;
            this.Ce(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.ke(null == b ? [] : [ b ]);
            let l;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v;
            let w;
            let x = 0, C = 0;
            let A = t.firstChild;
            let R = false;
            if (false !== N) while (null !== A) {
                h = 1 === A.nodeType ? A.getAttribute(Pr) : null;
                if (null !== h) A.removeAttribute(Pr);
                if (u) {
                    l = A.nextSibling;
                    if (!f) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = h || Dr] ?? (i[s] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== h) {
                        h = h || Dr;
                        throw new Error(`AUR0706:${c}[${h}]`);
                    }
                    A = A.nextSibling;
                }
            }
            if (null != m) {
                d = {};
                for (h in m) {
                    n = e.h("template");
                    g = m[h];
                    for (x = 0, C = g.length; C > x; ++x) {
                        p = g[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) n.content.appendChild(p); else n.content.appendChild(p.content); else n.content.appendChild(p);
                    }
                    w = e.ke();
                    this.ce(n.content, w);
                    d[h] = CustomElementDefinition.create({
                        name: mi(),
                        template: n,
                        instructions: w.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (u && (H || a.containerless)) this.Ce(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z) if ("TEMPLATE" === t.nodeName) this.ce(t.content, o); else {
                A = t.firstChild;
                while (null !== A) A = this.ce(A, o);
            }
            O.def = CustomElementDefinition.create({
                name: mi(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (k-- > 0) {
                O = L[k];
                n = e.h("template");
                v = e.h("au-m");
                v.classList.add("au");
                n.content.appendChild(v);
                O.def = CustomElementDefinition.create({
                    name: mi(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ L[k + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ O ]);
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
                n = 1 === i.nodeType ? i.getAttribute(Pr) : null;
                if (null !== n) i.removeAttribute(Pr);
                if (u) {
                    s = i.nextSibling;
                    if (!f) {
                        v = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!v) ((r = h ?? (h = {}))[o = n || Dr] ?? (r[o] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || Dr;
                        throw new Error(`AUR0706:${c}[${n}]`);
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
                    p = e.ke();
                    this.ce(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: mi(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = l;
            }
            if (u && (H || a.containerless)) this.Ce(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.ce(i, e);
            }
        }
        return h;
    }
    we(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.be(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    me(t, e, i, s) {
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
                f = s.ge.parse(l, h);
                d = s.fe(f);
                m = n.attrs[f.target];
                if (null == m) throw new Error(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    wr.node = t;
                    wr.attr = f;
                    wr.bindable = m;
                    wr.def = i;
                    o.push(d.build(wr, s.ep, s.m));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                c = g;
                l = void 0;
                h = void 0;
            }
        }
        gr();
        return o;
    }
    he(t, e) {
        const i = t;
        const s = y(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw new Error(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw new Error(`AUR0709`);
            const s = Ar(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const c = Bt.for(n);
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
                    mode: Rr(t)
                });
                const s = t.getAttributeNames().filter((t => !kr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Ae(pi({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const c = o.length;
        for (;c > h; ++h) xi(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    xe(t) {
        return "INPUT" === t.nodeName && 1 === xr[t.type];
    }
    ye(t, e) {
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
    be(t) {
        t.classList.add("au");
        return t;
    }
    Ce(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.be(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.Re = ft();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.le = o ? s.le : e.get(fr);
        this.ge = o ? s.ge : e.get(Gt);
        this.ep = o ? s.ep : e.get(F);
        this.m = o ? s.m : e.get(cr);
        this.Se = o ? s.Se : e.get(k);
        this.p = o ? s.p : e.get(Ei);
        this.localEls = o ? s.localEls : new Set;
        this.rows = r ?? [];
    }
    Ae(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    ue(t) {
        return this.c.find(Ci, t);
    }
    de(t) {
        return this.c.find(Ke, t);
    }
    ke(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    fe(t) {
        if (this.root !== this) return this.root.fe(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.Re[e];
        if (void 0 === i) {
            i = this.c.create(Wn, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.Re[e] = i;
        }
        return i;
    }
}

function mr(t) {
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

function gr() {
    wr.node = wr.attr = wr.bindable = wr.def = null;
}

const pr = {
    projections: null
};

const vr = {
    name: "unnamed"
};

const wr = {
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

const xr = {
    checkbox: 1,
    radio: 1
};

const yr = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = yr.get(t);
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
                    if (h) throw new Error(`AUR0714:${t.name}`);
                    h = true;
                    c = o;
                } else if (!h && null == c) c = o;
                n[a] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) c = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            yr.set(t, i = new BindablesInfo(n, s, c));
        }
        return i;
    }
}

const kr = Object.freeze([ "property", "attribute", "mode" ]);

const Cr = "as-custom-element";

function Ar(t, e) {
    const i = t.getAttribute(Cr);
    if (null === i || "" === i) throw new Error(`AUR0715`);
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Cr);
    }
    return i;
}

function Rr(t) {
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

const Sr = Lt("ITemplateCompilerHooks");

const Br = new WeakMap;

const Er = ht("compiler-hooks");

const Ir = Object.freeze({
    name: Er,
    define(t) {
        let e = Br.get(t);
        if (void 0 === e) {
            Br.set(t, e = new TemplateCompilerHooksDefinition(t));
            nt(Er, e, t);
            ct(t, Er);
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
        t.register(Ot(Sr, this.Type));
    }
}

const Tr = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Ir.define(t);
    }
};

const Dr = "default";

const Pr = "au-slot";

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

re("oneTime")(OneTimeBindingBehavior);

re("toView")(ToViewBindingBehavior);

re("fromView")(FromViewBindingBehavior);

re("twoWay")(TwoWayBindingBehavior);

const Lr = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.Be = {
            delay: Lr
        };
        this.Ee = null;
        this.Ie = null;
        this.J = t.get(m).taskQueue;
        if (e.args.length > 0) this.Ee = e.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e) {
        if (null !== this.Ie) {
            this.Ie.cancel();
            this.Ie = null;
        }
        this.binding.handleChange(t, e);
    }
    updateSource(t) {
        this.queueTask((() => this.binding.updateSource(t)));
    }
    queueTask(t) {
        const e = this.Ie;
        this.Ie = this.J.queueTask((() => {
            this.Ie = null;
            return t();
        }), this.Be);
        e?.cancel();
    }
    $bind(t) {
        if (null !== this.Ee) {
            const e = Number(I(this.Ee, t, this, null));
            this.Be.delay = isNaN(e) ? Lr : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.Ie?.cancel();
        this.Ie = null;
        this.binding.$unbind();
    }
}

re("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Kt = new Map;
        this.Te = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw new Error(`AUR0817`);
        if (0 === i.length) throw new Error(`AUR0818`);
        this.Kt.set(e, i);
        let s;
        for (s of i) this.Te.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.Kt.get(e);
        this.Kt.delete(e);
        let s;
        for (s of i) this.Te.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ N ];

re("signal")(SignalBindingBehavior);

const Or = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.Be = {
            delay: Or
        };
        this.Ee = null;
        this.Ie = null;
        this.De = 0;
        this.Pe = 0;
        this.p = t.get(m);
        this.J = this.p.taskQueue;
        if (e.args.length > 0) this.Ee = e.args[0];
    }
    callSource(t) {
        this.$e((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e) {
        if (null !== this.Ie) {
            this.Ie.cancel();
            this.Ie = null;
            this.De = this.p.performanceNow();
        }
        this.binding.handleChange(t, e);
    }
    updateSource(t) {
        this.$e((() => this.binding.updateSource(t)));
    }
    $e(t) {
        const e = this.Be;
        const i = this.p;
        const s = this.De + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.Ie;
            e.delay = s;
            this.Ie = this.J.queueTask((() => {
                this.De = i.performanceNow();
                this.Ie = null;
                e.delay = this.Pe;
                t();
            }), e);
            n?.cancel();
        } else {
            this.De = i.performanceNow();
            t();
        }
    }
    $bind(t) {
        if (null !== this.Ee) {
            const e = Number(I(this.Ee, t, this, null));
            this.Be.delay = this.Pe = isNaN(e) ? Or : e;
        }
        super.$bind(t);
    }
    $unbind() {
        this.Ie?.cancel();
        this.Ie = null;
        super.$unbind();
    }
}

re("throttle")(ThrottleBindingBehavior);

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

const Ur = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = Ur;
    }
    unbind(t, e) {
        return;
    }
}

re("attr")(AttrBindingBehavior);

function qr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = qr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

re("self")(SelfBindingBehavior);

const jr = ft();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return jr[t] ?? (jr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

function Fr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Le = void 0;
        this.Oe = void 0;
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
        this.Ue();
        this.qe();
        this.X();
    }
    handleCollectionChange() {
        this.qe();
    }
    handleChange(t, e) {
        this.qe();
    }
    qe() {
        const t = this.v;
        const e = this.o;
        const i = dt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Fr;
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
        const n = void 0 !== e.matcher ? e.matcher : Fr;
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
        this.X();
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Ue();
    }
    stop() {
        this.handler.dispose();
        this.Le?.unsubscribe(this);
        this.Le = void 0;
        this.Oe?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    X() {
        _r = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, _r);
    }
    Ue() {
        const t = this.o;
        (this.Oe ?? (this.Oe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Le?.unsubscribe(this);
        this.Le = void 0;
        if ("checkbox" === t.type) (this.Le = Zr(this.v, this.oL))?.subscribe(this);
    }
}

E(CheckedObserver);

let _r;

const Mr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Vr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.N = false;
        this.je = void 0;
        this.Fe = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Nr(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.N = t !== this.ov;
        this._e(t instanceof Array ? t : null);
        this.G();
    }
    G() {
        if (this.N) {
            this.N = false;
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
        const s = e.matcher ?? Vr;
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
            const o = t.matcher || Vr;
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
    Me() {
        (this.Fe = new this.o.ownerDocument.defaultView.MutationObserver(this.Ve.bind(this))).observe(this.o, Mr);
        this._e(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ne() {
        this.Fe.disconnect();
        this.je?.unsubscribe(this);
        this.Fe = this.je = void 0;
        this.iO = false;
    }
    _e(t) {
        this.je?.unsubscribe(this);
        this.je = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.je = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.X();
    }
    Ve(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.X();
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Me();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Ne();
        }
    }
    X() {
        Hr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Hr);
    }
}

E(SelectValueObserver);

function Nr(t) {
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

let Hr;

const Wr = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.N = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t) {
        this.value = t;
        this.N = t !== this.ov;
        this.G();
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
            if (bt(e)) {
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
        if (bt(t)) return this.He(t);
        if (t instanceof Array) return this.Ge(t);
        if (t instanceof Object) return this.We(t);
        return l;
    }
    G() {
        if (this.N) {
            this.N = false;
            const t = this.value;
            const e = this.styles;
            const i = this.ze(t);
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
        this.N = false;
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
        this.N = true;
        if (!this.handler.config.readonly) this.G();
    }
    G() {
        if (this.N) {
            this.N = false;
            this.o[this.k] = this.v ?? this.handler.config.default;
            this.X();
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.o[this.k];
        if (this.ov !== this.v) {
            this.N = false;
            this.X();
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
    X() {
        zr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, zr);
    }
}

E(ValueAttributeObserver);

let zr;

const Gr = "http://www.w3.org/1999/xlink";

const Xr = "http://www.w3.org/XML/1998/namespace";

const Kr = "http://www.w3.org/2000/xmlns/";

const Qr = Object.assign(ft(), {
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

const Yr = new H;

Yr.type = 2 | 4;

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
        this.Xe = ft();
        this.Ke = ft();
        this.Qe = ft();
        this.Ye = ft();
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
        Ut(W, NodeObserverLocator).register(t);
        Ot(W, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Xe;
        let n;
        if (bt(t)) {
            n = s[t] ?? (s[t] = ft());
            if (null == n[e]) n[e] = new NodeObserverConfig(i); else Jr(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = ft());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else Jr(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else Jr("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else Jr("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.Ye || e in (this.Qe[t.tagName] ?? C)) return this.getObserver(t, e, i);
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
            return Ur;

          default:
            {
                const i = Qr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (gt(t, e, this.svgAnalyzer)) return Ur;
                return Yr;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (bt(t)) {
            n = (i = this.Qe)[t] ?? (i[t] = ft());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Qe)[e] ?? (s[e] = ft());
            n[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.Ye[e] = true;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const s = this.Xe[t.tagName]?.[e] ?? this.Ke[e];
        if (null != s) return new s.type(t, e, new EventSubscriber(s), i, this.locator);
        const n = Qr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (gt(t, e, this.svgAnalyzer)) return Ur;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new z(t, e);
    }
}

NodeObserverLocator.inject = [ A, Ei, G, lr ];

function Zr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Jr(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw new Error(`AUR0802`);
        if (6 !== e.mode && 4 !== e.mode) throw new Error(`AUR0803`);
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

UpdateTriggerBindingBehavior.inject = [ j ];

re("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.Ze = false;
        this.Je = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.ti(); else this.Ze = true;
    }
    attached() {
        if (this.Ze) {
            this.Ze = false;
            this.ti();
        }
        this.Je.addEventListener("focus", this);
        this.Je.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.Je;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.ei) this.value = false;
    }
    ti() {
        const t = this.Je;
        const e = this.ei;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get ei() {
        return this.Je === this.p.document.activeElement;
    }
}

Focus.inject = [ Os, Ei ];

tt([ At({
    mode: 6
}) ], Focus.prototype, "value", void 0);

_e("focus")(Focus);

let to = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.ii = false;
        this.Ie = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ie = null;
            if (Boolean(this.value) !== this.si) if (this.si === this.ni) {
                this.si = !this.ni;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.si = this.ni;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.si = this.ni = "hide" !== i.alias;
    }
    binding() {
        this.ii = true;
        this.update();
    }
    detaching() {
        this.ii = false;
        this.Ie?.cancel();
        this.Ie = null;
    }
    valueChanged() {
        if (this.ii && null === this.Ie) this.Ie = this.p.domWriteQueue.queueTask(this.update);
    }
};

tt([ At ], to.prototype, "value", void 0);

to = tt([ et(0, Os), et(1, Ei), et(2, Zs) ], to);

Mt("hide")(to);

_e("show")(to);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.ri = i.document.createElement("div");
        this.view = t.create();
        _s(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.ri = this.oi();
        this.view.setHost(s);
        return this.li(t, s, i);
    }
    detaching(t, e, i) {
        return this.hi(t, this.ri, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.ri;
        const i = this.ri = this.oi();
        if (e === i) return;
        this.view.setHost(i);
        const s = b(this.hi(null, i, t.flags), (() => this.li(null, i, t.flags)));
        if (pt(s)) s.catch((t => {
            throw t;
        }));
    }
    li(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return b(s?.call(n, e, r), (() => this.ai(t, e, i)));
    }
    ai(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return b(n.activate(t ?? n, s, i, s.scope), (() => this.ui(e)));
        return this.ui(e);
    }
    ui(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    hi(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return b(s?.call(n, e, r), (() => this.fi(t, e, i)));
    }
    fi(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return b(n.deactivate(t, s, i), (() => this.di(e)));
        return this.di(e);
    }
    di(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    oi() {
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

Portal.inject = [ zi, qs, Ei ];

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
        this.mi = false;
        this.gi = 0;
        this.pi = t;
        this.l = e;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.gi++;
        const o = () => !this.mi && this.gi === r + 1;
        return b(this.pending, (() => {
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.pi.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == s) return;
            s.setLocation(this.l);
            this.pending = b(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.mi = true;
        return b(this.pending, (() => {
            this.mi = false;
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
        const r = this.gi++;
        const o = () => !this.mi && this.gi === r + 1;
        let l;
        return b(this.pending, (() => this.pending = b(s?.deactivate(s, n, i), (() => {
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.pi.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == l) return;
            l.setLocation(this.l);
            return b(l.activate(l, n, i, n.scope), (() => {
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

If.inject = [ zi, qs ];

tt([ At ], If.prototype, "value", void 0);

tt([ At({
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
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ zi ];

Me({
    name: "else"
})(Else);

function eo(t) {
    t.dispose();
}

const io = [ 18, 17 ];

class Repeat {
    constructor(t, e, i) {
        this.views = [];
        this.key = void 0;
        this.vi = void 0;
        this.wi = false;
        this.bi = false;
        this.xi = null;
        this.yi = void 0;
        this.ki = false;
        this.l = t;
        this.Ci = e;
        this.f = i;
    }
    binding(t, e, i) {
        const s = this.Ci.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Ai = r;
                let t = o.iterable;
                while (null != t && io.includes(t.$kind)) {
                    t = t.expression;
                    this.wi = true;
                }
                this.xi = t;
                break;
            }
        }
        this.Ri();
        const h = o.declaration;
        if (!(this.ki = 24 === h.$kind || 25 === h.$kind)) this.local = I(h, this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.Si();
        return this.Bi(t);
    }
    detaching(t, e, i) {
        this.Ri();
        return this.Ei(t);
    }
    itemsChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        this.Ri();
        this.Si();
        const e = b(this.Ei(null), (() => this.Bi(null)));
        if (pt(e)) e.catch(yt);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.wi) {
            if (this.bi) return;
            this.bi = true;
            this.items = I(this.forOf.iterable, i.scope, this.Ai, null);
            this.bi = false;
            return;
        }
        this.Si();
        if (void 0 === e) {
            const t = b(this.Ei(null), (() => this.Bi(null)));
            if (pt(t)) t.catch(yt);
        } else {
            const t = this.views.length;
            const i = X(e);
            if (i.deletedIndices.length > 0) {
                const e = b(this.Ii(i), (() => this.Ti(t, i)));
                if (pt(e)) e.catch(yt);
            } else this.Ti(t, i);
        }
    }
    Ri() {
        const t = this.$controller.scope;
        let e = this.Di;
        let i = this.wi;
        let s;
        if (i) {
            e = this.Di = I(this.xi, t, this.Ai, null) ?? null;
            i = this.wi = !Object.is(this.items, e);
        }
        const n = this.vi;
        if (this.$controller.isActive) {
            s = this.vi = K(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.vi = void 0;
        }
    }
    Si() {
        const t = this.items;
        if (vt(t)) {
            this.yi = t;
            return;
        }
        const e = [];
        uo(t, ((t, i) => {
            e[i] = t;
        }));
        this.yi = e;
    }
    Bi(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: c} = this;
        const a = r.scope;
        const u = this.forOf;
        const f = ao(c);
        const d = this.views = Array(f);
        uo(c, ((c, m) => {
            s = d[m] = o.create().setLocation(h);
            s.nodes.unlink();
            if (this.ki) $(u.declaration, n = U.fromParent(a, new Y), this.Ai, c); else n = U.fromParent(a, new Y(l, c));
            ho(n.overrideContext, m, f);
            i = s.activate(t ?? s, r, 0, n);
            if (pt(i)) (e ?? (e = [])).push(i);
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
            if (pt(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ii(t) {
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
    Ti(t, e) {
        let i;
        let s;
        let n;
        let r;
        let o = 0;
        const {$controller: l, f: h, local: c, yi: a, l: u, views: f} = this;
        const d = e.length;
        for (;d > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== d) throw lo(f.length, d);
        const m = l.scope;
        const g = e.length;
        Q(f, e);
        const p = oo(e);
        const v = p.length;
        let w;
        let b = v - 1;
        o = g - 1;
        for (;o >= 0; --o) {
            n = f[o];
            w = f[o + 1];
            n.nodes.link(w?.nodes ?? u);
            if (-2 === e[o]) {
                if (this.ki) $(this.forOf.declaration, r = U.fromParent(m, new Y), this.Ai, a[o]); else r = U.fromParent(m, new Y(c, a[o]));
                ho(r.overrideContext, o, g);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (pt(s)) (i ?? (i = [])).push(s);
            } else if (b < 0 || 1 === v || o !== p[b]) {
                ho(n.scope.overrideContext, o, g);
                n.nodes.insertBefore(n.location);
            } else {
                if (t !== g) ho(n.scope.overrideContext, o, g);
                --b;
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

Repeat.inject = [ qs, vs, zi ];

tt([ At ], Repeat.prototype, "items", void 0);

Me("repeat")(Repeat);

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
    let c = 0;
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
                c = l + h >> 1;
                n = t[no[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[no[l]];
            if (s < n || -2 === n) {
                if (l > 0) ro[r] = no[l - 1];
                no[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = no[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = ro[s];
    }
    while (r-- > 0) no[r] = 0;
    return a;
}

const lo = (t, e) => new Error(`AUR0814:${t}!=${e}`);

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

const co = Object.prototype.toString;

const ao = t => {
    switch (co.call(t)) {
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
        throw new Error(`Cannot count ${co.call(t)}`);
    }
};

const uo = (t, e) => {
    switch (co.call(t)) {
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
        throw new Error(`Cannot iterate over ${co.call(t)}`);
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
            for (l = n.length; l > o; ++o) n[o].$bind(r);
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

With.inject = [ zi, qs ];

tt([ At ], With.prototype, "value", void 0);

Me("with")(With);

let vo = class Switch {
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
        this.queue((() => this.Pi(t)));
    }
    Pi(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.$i(null);
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
        return b(this.$i(null, n), (() => {
            this.activeCases = n;
            return this.Li(null);
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
        return b(this.activeCases.length > 0 ? this.$i(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Li(t);
        }));
    }
    Li(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return w(...i.map((e => e.activate(t, 0, n))));
    }
    $i(t, e = []) {
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
        return b(w(...i.reduce(((i, s) => {
            if (!e.includes(s)) i.push(s.deactivate(t, 0));
            return i;
        }), [])), (() => {
            i.length = 0;
        }));
    }
    queue(t) {
        const e = this.promise;
        let i;
        i = this.promise = b(b(e, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

tt([ At ], vo.prototype, "value", void 0);

vo = tt([ Me("switch"), et(0, zi), et(1, qs) ], vo);

let wo = 0;

let bo = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Oi = e;
        this.l = i;
        this.id = ++wo;
        this.fallThrough = false;
        this.view = void 0;
        this.Ui = s.config.level <= 1;
        this.Se = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof vo) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Se.debug("isMatch()");
        const e = this.value;
        if (vt(e)) {
            if (void 0 === this.vi) this.vi = this.qi(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (vt(t)) {
            this.vi?.unsubscribe(this);
            this.vi = this.qi(t);
        } else if (void 0 !== this.vi) this.vi.unsubscribe(this);
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
        this.vi?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    qi(t) {
        const e = this.Oi.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

bo.inject = [ zi, j, qs, k ];

tt([ At ], bo.prototype, "value", void 0);

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
    mode: 1
}) ], bo.prototype, "fallThrough", void 0);

bo = tt([ Me("case") ], bo);

let xo = class DefaultCase extends bo {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

xo = tt([ Me("default-case") ], xo);

let yo = class PromiseTemplateController {
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
        return b(s.activate(t, n, i, this.viewScope = U.fromParent(n.scope, {})), (() => this.swap(t, i)));
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
            void w(h = (this.preSettledTask = s.queueTask((() => w(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), c)).result.catch((t => {
                if (!(t instanceof Z)) throw t;
            })), i.then((a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => w(o?.deactivate(t, e), r?.deactivate(t, e), n?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            }), (a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => w(o?.deactivate(t, e), n?.deactivate(t, e), r?.activate(t, e, l, a))), c)).result;
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

tt([ At ], yo.prototype, "value", void 0);

yo = tt([ Me("promise"), et(0, zi), et(1, qs), et(2, Ei), et(3, k) ], yo);

let ko = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Ro(t).pending = this;
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
    mode: 2
}) ], ko.prototype, "value", void 0);

ko = tt([ Me("pending"), et(0, zi), et(1, qs) ], ko);

let Co = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Ro(t).fulfilled = this;
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
    mode: 4
}) ], Co.prototype, "value", void 0);

Co = tt([ Me("then"), et(0, zi), et(1, qs) ], Co);

let Ao = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Ro(t).rejected = this;
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
    mode: 4
}) ], Ao.prototype, "value", void 0);

Ao = tt([ Me("catch"), et(0, zi), et(1, qs) ], Ao);

function Ro(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof yo) return i;
    throw new Error(`AUR0813`);
}

let So = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

So = tt([ Xt({
    pattern: "promise.resolve",
    symbols: ""
}) ], So);

let Bo = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Bo = tt([ Xt({
    pattern: "then",
    symbols: ""
}) ], Bo);

let Eo = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Eo = tt([ Xt({
    pattern: "catch",
    symbols: ""
}) ], Eo);

function Io(t, e, i, s) {
    if (bt(e)) return To(t, e, i, s);
    if (vi(e)) return Do(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.ji = i;
        this.Fi = void 0;
    }
    get definition() {
        if (void 0 === this.Fi) this.Fi = CustomElementDefinition.create({
            name: mi(),
            template: this.node,
            needsCompile: bt(this.node),
            instructions: this.instructions,
            dependencies: this.ji
        });
        return this.Fi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(ts).getViewFactory(this.definition, t.createChild().register(...this.ji));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.ji);
    }
}

function To(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (Js(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) Po(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function Do(t, e, i, s) {
    const n = xi(e);
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
        if (Js(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) Po(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function Po(t, e, i, s, n) {
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

function $o(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this._i = e;
        this.Mi = i;
        this.r = s;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Vi = void 0;
        this.Ni = e.props.reduce($o, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Vi !== s) {
            this.Vi = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.fi(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Vi === t) return;
        this.Vi = t;
        this.composing = true;
        i |= s.flags;
        const n = b(this.fi(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (pt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return b(void 0 === t ? b(e, (t => this.Hi(t, s))) : t, (t => this.ai(this.view = t, i, s)));
    }
    fi(t, e, i) {
        return t?.deactivate(e ?? t, this.$controller, i);
    }
    ai(t, e, i) {
        const {$controller: s} = this;
        return b(t?.activate(e ?? t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    Hi(t, e) {
        const i = this.Wi(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Wi(t, e) {
        if (null == t) return;
        const i = this.Mi.controller.container;
        if ("object" === typeof t) {
            if (Lo(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (bt(t)) {
            const e = i.find(Ci, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return Io(this.p, t, this.Ni, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ Ei, Zs, ws, ts ];

tt([ At ], AuRender.prototype, "component", void 0);

tt([ At({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

ti({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function Lo(t) {
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
        this.zi = void 0;
        this.r = t.get(ts);
        this._i = r;
        this.Gi = o;
    }
    static get inject() {
        return [ g, vs, Os, qs, Ei, Zs, R(CompositionContextFactory) ];
    }
    get pending() {
        return this.Xi;
    }
    get composition() {
        return this.zi;
    }
    attaching(t, e, i) {
        return this.Xi = b(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Gi.isCurrent(t)) this.Xi = void 0;
        }));
    }
    detaching(t) {
        const e = this.zi;
        const i = this.Xi;
        this.Gi.invalidate();
        this.zi = this.Xi = void 0;
        return b(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.zi) {
            this.zi.update(this.model);
            return;
        }
        this.Xi = b(this.Xi, (() => b(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Gi.isCurrent(t)) this.Xi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Gi;
        const s = this.zi;
        return b(i.create(t), (t => {
            if (i.isCurrent(t)) return b(this.compose(t), (n => {
                if (i.isCurrent(t)) return b(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.zi = n;
                        return b(s?.deactivate(e), (() => t));
                    } else return b(n.controller.deactivate(n.controller, this.$controller, 2), (() => {
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
            if (u.containerless) throw new Error(`AUR0806`);
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
                    projections: this._i.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, c, 1, c.scope.parent)), (t => b(n.deactivate(t ?? n, c, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Ci.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, c);
                const l = "auto" === this.scopeBehavior ? U.fromParent(this.parent.scope, e) : U.create(e);
                if (Vs(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, c, 1, l)), (t => o.deactivate(t ?? o, c, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return b(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = Vs(i);
        _t(t, s.Element, _t(t, Os, new v("ElementResolver", n ? null : i)));
        _t(t, qs, new v("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        _t(t, e, new v("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = wt(t) ? t : t?.constructor;
        return Ci.isType(e) ? Ci.getDefinition(e) : null;
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

ti("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return b(t.load(), (t => new CompositionContext(++this.id, t)));
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
        this.Ki = null;
        this.Qi = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.Yi = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.Yi = true;
        }
        this.Mi = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ qs, Zs, ws, ts ];
    }
    binding(t, e, i) {
        this.Ki = this.$controller.scope.parent;
        let s;
        if (this.Yi) {
            s = this.Mi.controller.scope.parent;
            (this.Qi = U.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.Ki.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Yi ? this.Qi : this.Ki);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Yi && null != this.Qi) this.Qi.overrideContext.$host = t;
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

ti({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Oo = Lt("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let Uo = class SanitizeValueConverter {
    constructor(t) {
        this.Zi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Zi.sanitize(t);
    }
};

Uo = tt([ et(0, Oo) ], Uo);

ae("sanitize")(Uo);

let qo = class ViewValueConverter {
    constructor(t) {
        this.Ji = t;
    }
    toView(t, e) {
        return this.Ji.getViewComponentForObject(t, e);
    }
};

qo = tt([ et(0, Ji) ], qo);

ae("view")(qo);

const jo = DebounceBindingBehavior;

const Fo = OneTimeBindingBehavior;

const _o = ToViewBindingBehavior;

const Mo = FromViewBindingBehavior;

const Vo = SignalBindingBehavior;

const No = ThrottleBindingBehavior;

const Ho = TwoWayBindingBehavior;

const Wo = TemplateCompiler;

const zo = NodeObserverLocator;

const Go = [ Wo, zo ];

const Xo = SVGAnalyzer;

const Ko = ie;

const Qo = ee;

const Yo = te;

const Zo = Jt;

const Jo = se;

const tl = [ Yo, Zo, Jo ];

const el = [ Ko, Qo ];

const il = Yn;

const sl = Qn;

const nl = Zn;

const rl = Xn;

const ol = zn;

const ll = Gn;

const hl = Kn;

const cl = rr;

const al = Jn;

const ul = tr;

const fl = er;

const dl = ir;

const ml = nr;

const gl = sr;

const pl = or;

const vl = [ sl, ol, rl, ll, hl, il, nl, cl, al, ul, fl, ml, gl, dl, pl ];

const wl = Uo;

const bl = qo;

const xl = If;

const yl = Else;

const kl = Repeat;

const Cl = With;

const Al = vo;

const Rl = bo;

const Sl = xo;

const Bl = yo;

const El = ko;

const Il = Co;

const Tl = Ao;

const Dl = So;

const Pl = Bo;

const $l = Eo;

const Ll = AttrBindingBehavior;

const Ol = SelfBindingBehavior;

const Ul = UpdateTriggerBindingBehavior;

const ql = AuRender;

const jl = AuCompose;

const Fl = Portal;

const _l = Focus;

const Ml = to;

const Vl = [ jo, Fo, _o, Mo, Vo, No, Ho, wl, bl, xl, yl, kl, Cl, Al, Rl, Sl, Bl, El, Il, Tl, Dl, Pl, $l, Ll, Ol, Ul, ql, jl, Fl, _l, Ml, AuSlot ];

const Nl = dn;

const Hl = an;

const Wl = cn;

const zl = gn;

const Gl = vn;

const Xl = fn;

const Kl = pn;

const Ql = mn;

const Yl = hn;

const Zl = un;

const Jl = kn;

const th = Bn;

const eh = Cn;

const ih = An;

const sh = Rn;

const nh = Sn;

const rh = yn;

const oh = En;

const lh = [ Kl, Gl, Nl, Ql, zl, Yl, Wl, Hl, Zl, Xl, Jl, th, eh, ih, sh, nh, rh, oh ];

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
            return e.register(qt(q, i.coercingOptions), ...Go, ...Vl, ...tl, ...vl, ...lh);
        },
        customize(e) {
            return ch(e ?? t);
        }
    };
}

const ah = Lt("IAurelia");

class Aurelia {
    constructor(t = r.createContainer()) {
        this.container = t;
        this.ir = false;
        this.ts = false;
        this.es = false;
        this.ss = void 0;
        this.next = void 0;
        this.rs = void 0;
        this.os = void 0;
        if (t.has(ah, true)) throw new Error(`AUR0768`);
        _t(t, ah, new v("IAurelia", this));
        _t(t, Ps, this.ls = new v("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ts;
    }
    get isStopping() {
        return this.es;
    }
    get root() {
        if (null == this.ss) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.ss;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.cs(t.host), this.container, this.ls);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.cs(s);
        const r = t.component;
        let o;
        if (wt(r)) {
            _t(i, n.HTMLElement, _t(i, n.Element, _t(i, Os, new v("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        _t(i, Us, new v("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: mi(),
            template: s,
            enhance: true
        }));
        return b(l.activate(l, e, 1), (() => l));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    cs(t) {
        let e;
        if (!this.container.has(Ei, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new J(t.ownerDocument.defaultView);
            this.container.register(qt(Ei, e));
        } else e = this.container.get(Ei);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (pt(this.rs)) return this.rs;
        return this.rs = b(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ls.prepare(this.ss = t);
            this.ts = true;
            return b(t.activate(), (() => {
                this.ir = true;
                this.ts = false;
                this.rs = void 0;
                this.us(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (pt(this.os)) return this.os;
        if (true === this.ir) {
            const e = this.ss;
            this.ir = false;
            this.es = true;
            return this.os = b(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.ss = void 0;
                this.ls.dispose();
                this.es = false;
                this.us(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.es) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    us(t, e, i) {
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

const dh = Lt("IDialogService");

const mh = Lt("IDialogController");

const gh = Lt("IDialogDomRenderer");

const ph = Lt("IDialogDom");

const vh = Lt("IDialogGlobalSettings");

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
            this.Lt = t;
            this.Et = e;
        }));
    }
    static get inject() {
        return [ Ei, g ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(gh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(Us, true) ? e.get(Us) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(qt(Us, o));
        e.register(qt(Os, c), qt(ph, l));
        return new Promise((s => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(e, t, c), {
                $dialog: this
            });
            s(n.canActivate?.(i) ?? true);
        })).then((r => {
            if (true !== r) {
                l.dispose();
                if (n) throw bh(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const o = this.cmp;
            return b(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Ci.generateName(),
                    template: s
                }));
                return b(i.activate(i, null, 1), (() => {
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
        if (this.ds) return this.ds;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(b(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.ds = void 0;
                    if (l) throw bh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return b(r.deactivate?.(h), (() => b(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.Lt(h); else this.Et(bh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.ds = void 0;
            throw t;
        }));
        this.ds = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = xh(t);
        return new Promise((t => t(b(this.cmp.deactivate?.(DialogCloseResult.create("error", e)), (() => b(this.controller.deactivate(this.controller, null, 2), (() => {
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(Os, new v("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = wt(t) ? t : t?.constructor;
        return Ci.isType(e) ? Ci.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function bh(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function xh(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.dt = t;
        this.p = e;
        this.gs = i;
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
        return [ g, Ei, vh ];
    }
    static register(t) {
        t.register(Ot(dh, this), Ee.deactivating(dh, (t => b(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return kh(new Promise((e => {
            const i = DialogSettings.from(this.gs, t);
            const s = i.container ?? this.dt.createChild();
            e(b(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(qt(mh, e));
                s.register(jt(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return b(e.activate(t), (t => {
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
        const i = Ch(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).vs().ps();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const s = w(null == e ? void 0 : b(e(), (e => {
            t.component = e;
        })), wt(i) ? b(i(), (e => {
            t.template = e;
        })) : void 0);
        return pt(s) ? s.then((() => t)) : t;
    }
    vs() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    ps() {
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

function Ch(t) {
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
        Ot(vh, this).register(t);
    }
}

const Ah = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Ah} display:flex;`;
        this.overlayCss = Ah;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        Ot(gh, this).register(t);
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

DefaultDialogDomRenderer.inject = [ Ei ];

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
        register: i => i.register(...e, Ee.creating((() => t(i.get(vh))))),
        customize(t, i) {
            return Rh(t, i ?? e);
        }
    };
}

const Sh = Rh((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(Ot(vh, this));
    }
} ]);

const Bh = Rh(n, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Eh = Lt((t => t.singleton(WcCustomElementRegistry)));

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
            s = Ci.isType(e) ? Ci.getDefinition(e) : CustomElementDefinition.create(Ci.generateName(), e);
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
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(Os, new v("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                Ls(this, e.key, n);
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

WcCustomElementRegistry.inject = [ g, Ei, ts ];

export { AdoptedStyleSheetsStyles, AppRoot, Ee as AppTask, ie as AtPrefixedTriggerAttributePattern, Ko as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, Ll as AttrBindingBehaviorRegistration, ir as AttrBindingCommand, dl as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, th as AttributeBindingRendererRegistration, AttributeNSAccessor, Zt as AttributePattern, AuCompose, AuRender, ql as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Bt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, ce as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorFactory, ne as BindingBehaviorStrategy, Wn as BindingCommand, BindingCommandDefinition, BindingInterceptor, uh as BindingMode, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, Yn as CallBindingCommand, il as CallBindingCommandRegistration, CallBindingInstruction, Nl as CallBindingRendererRegistration, er as CaptureBindingCommand, fl as CaptureBindingCommandRegistration, bo as Case, CheckedObserver, $e as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, nr as ClassBindingCommand, ml as ClassBindingCommandRegistration, ee as ColonPrefixedBindAttributePattern, Qo as ColonPrefixedBindAttributePatternRegistration, _n as CommandType, ComputedWatcher, Controller, Ke as CustomAttribute, CustomAttributeDefinition, Hl as CustomAttributeRendererRegistration, Ci as CustomElement, CustomElementDefinition, Wl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, jo as DebounceBindingBehaviorRegistration, Qn as DefaultBindingCommand, sl as DefaultBindingCommandRegistration, vl as DefaultBindingLanguage, tl as DefaultBindingSyntax, xo as DefaultCase, Go as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, lh as DefaultRenderers, Vl as DefaultResources, fh as DefinitionType, tr as DelegateBindingCommand, ul as DelegateBindingCommandRegistration, tn as DelegationStrategy, DialogCloseResult, Sh as DialogConfiguration, DialogController, wh as DialogDeactivationStatuses, Bh as DialogDefaultConfiguration, DialogOpenResult, DialogService, Jt as DotSeparatedAttributePattern, Zo as DotSeparatedAttributePatternRegistration, Else, yl as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, FlushQueue, Focus, Zn as ForBindingCommand, nl as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Mo as FromViewBindingBehaviorRegistration, Xn as FromViewBindingCommand, rl as FromViewBindingCommandRegistration, Co as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, Ps as IAppRoot, Be as IAppTask, cr as IAttrMapper, Gt as IAttributeParser, zt as IAttributePattern, Qs as IAuSlotsInfo, ah as IAurelia, vs as IController, mh as IDialogController, ph as IDialogDom, gh as IDialogDomRenderer, vh as IDialogGlobalSettings, dh as IDialogService, Xs as IEventDelegator, Us as IEventTarget, pe as IFlushQueue, Ws as IHistory, ws as IHydrationContext, Zs as IInstruction, Mi as ILifecycleHooks, Hs as ILocation, Os as INode, zo as INodeObserverLocatorRegistration, Ei as IPlatform, Ks as IProjections, qs as IRenderLocation, sn as IRenderer, ts as IRendering, lr as ISVGAnalyzer, Oo as ISanitizer, Oi as IShadowDOMGlobalStyles, Li as IShadowDOMStyles, Nt as ISyntaxInterpreter, en as ITemplateCompiler, Sr as ITemplateCompilerHooks, Wo as ITemplateCompilerRegistration, fr as ITemplateElementFactory, zi as IViewFactory, Ji as IViewLocator, Eh as IWcElementRegistry, Ns as IWindow, If, xl as IfRegistration, Ys as InstructionType, InterpolationBinding, zl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Gl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Xl as LetElementRendererRegistration, es as LifecycleFlags, Hi as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, Jl as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, Fo as OneTimeBindingBehaviorRegistration, zn as OneTimeBindingCommand, ol as OneTimeBindingCommandRegistration, ko as PendingTemplateController, Portal, yo as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Kl as PropertyBindingRendererRegistration, te as RefAttributePattern, Yo as RefAttributePatternRegistration, RefBinding, cl as RefBindingCommandRegistration, RefBindingInstruction, Ql as RefBindingRendererRegistration, Ao as RejectedTemplateController, RenderPlan, Rendering, Repeat, kl as RepeatRegistration, SVGAnalyzer, Xo as SVGAnalyzerRegistration, Uo as SanitizeValueConverter, wl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Ol as SelfBindingBehaviorRegistration, SetAttributeInstruction, eh as SetAttributeRendererRegistration, SetClassAttributeInstruction, ih as SetClassAttributeRendererRegistration, SetPropertyInstruction, Yl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, sh as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, el as ShortHandBindingSyntax, SignalBindingBehavior, Vo as SignalBindingBehaviorRegistration, hh as StandardConfiguration, gs as State, StyleAttributeAccessor, sr as StyleBindingCommand, gl as StyleBindingCommandRegistration, Ui as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, nh as StylePropertyBindingRendererRegistration, vo as Switch, TemplateCompiler, Ir as TemplateCompilerHooks, Zl as TemplateControllerRendererRegistration, TextBindingInstruction, rh as TextBindingRendererRegistration, ThrottleBindingBehavior, No as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, _o as ToViewBindingBehaviorRegistration, Gn as ToViewBindingCommand, ll as ToViewBindingCommandRegistration, Jn as TriggerBindingCommand, al as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Ho as TwoWayBindingBehaviorRegistration, Kn as TwoWayBindingCommand, hl as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, Ul as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, de as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, ms as ViewModelKind, qo as ViewValueConverter, bl as ViewValueConverterRegistration, Yi as Views, Je as Watch, WcCustomElementRegistry, With, Cl as WithRegistration, Mt as alias, $t as allResources, xn as applyBindingBehavior, me as astEvaluator, Xt as attributePattern, At as bindable, re as bindingBehavior, Mn as bindingCommand, Bi as capture, Te as children, Et as coercer, ii as containerless, Ms as convertToRenderLocation, Io as createElement, Di as cssModules, _e as customAttribute, ti as customElement, Fs as getEffectiveParentNode, $s as getRef, us as isCustomElementController, fs as isCustomElementViewModel, Js as isInstruction, Vs as isRenderLocation, Wi as lifecycleHooks, Ri as processContent, Vt as registerAliases, nn as renderer, _s as setEffectiveParentNode, Ls as setRef, Pi as shadowCSS, ni as strict, Tr as templateCompilerHooks, Me as templateController, ei as useShadowDOM, ae as valueConverter, Zi as view, Qe as watch };
//# sourceMappingURL=index.mjs.map
