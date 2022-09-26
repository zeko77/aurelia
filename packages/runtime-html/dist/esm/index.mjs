import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as c, fromAnnotationOrDefinitionOrTypeOrDefault as a, fromDefinitionOrDefault as u, pascalCase as f, fromAnnotationOrTypeOrDefault as d, IPlatform as m, IContainer as g, optional as p, InstanceProvider as v, resolveAll as w, onResolve as b, camelCase as x, toArray as y, ILogger as k, emptyObject as C, IServiceLocator as A, transient as R } from "@aurelia/kernel";

import { Metadata as S, isObject as B } from "@aurelia/metadata";

import { subscriberCollection as I, astEvaluate as T, astBind as D, astUnbind as E, connectable as P, astAssign as $, ConnectableSwitcher as L, ProxyObservable as O, Scope as U, ICoercionConfiguration as q, IObserverLocator as j, IExpressionParser as F, AccessScopeExpression as _, BindingBehaviorExpression as M, PrimitiveLiteralExpression as V, ISignaler as N, PropertyAccessor as H, INodeObserverLocator as W, SetterObserver as z, IDirtyChecker as G, applyMutationsToIndices as X, getCollectionObserver as K, synchronizeIndices as Q, BindingContext as Y } from "@aurelia/runtime";

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

const dt = t => new Error(t);

const mt = Object.prototype.hasOwnProperty;

const gt = ft();

const pt = (t, e, i) => {
    if (true === gt[e]) return true;
    if (!xt(e)) return false;
    const s = e.slice(0, 5);
    return gt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const vt = t => t instanceof Promise;

const wt = t => t instanceof Array;

const bt = t => "function" === typeof t;

const xt = t => "string" === typeof t;

const yt = Object.defineProperty;

const kt = t => {
    throw t;
};

const Ct = Reflect.defineProperty;

const At = (t, e, i) => {
    Ct(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function Rt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt(Bt, BindableDefinition.create(e, t, i), t.constructor, e);
        at(t.constructor, It.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (xt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function St(t) {
    return t.startsWith(Bt);
}

const Bt = lt("bindable");

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
                if (xt(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!st(Bt, t, n)) at(t, It.keyFrom(n));
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
        const i = Bt.length + 1;
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
            for (a = 0; a < h; ++a) s[o++] = it(Bt, c, l[a].slice(i));
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
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Et(t, e, n)));
    }
}

function Tt(t, e, i) {
    Dt.define(t, e);
}

const Dt = {
    key: lt("coercer"),
    define(t, e) {
        nt(Dt.key, t[e].bind(t), t);
    },
    for(t) {
        return it(Dt.key, t);
    }
};

function Et(t, e, i = {}) {
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
            r = "function" === typeof t ? t.bind(s) : Dt.for(s) ?? n;
            break;
        }
    }
    return r === n ? r : Pt(r, i.nullable);
}

function Pt(t, e) {
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
        const c = this.i = bt(l);
        const a = this.u = bt(h);
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

const Lt = function(t) {
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

const Ot = r.createInterface;

const Ut = o.singleton;

const qt = o.aliasTo;

const jt = o.instance;

const Ft = o.callback;

const _t = o.transient;

const Mt = (t, e, i) => t.registerResolver(e, i);

function Vt(...t) {
    return function(e) {
        const i = lt("aliases");
        const s = it(i, e);
        if (void 0 === s) nt(i, t, e); else s.push(...t);
    };
}

function Nt(t, e, i, s) {
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

const Ht = Ot("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        s = s.filter(Wt);
        if (s.length > 0) {
            s.sort(zt);
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

function Wt(t) {
    return t.isEndpoint;
}

function zt(t, e) {
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

const Gt = Ot("IAttributePattern");

const Xt = Ot("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.q = {};
        this.j = t;
        const i = this.F = {};
        const s = e.reduce(((t, e) => {
            const s = Zt(e.constructor);
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

AttributeParser.inject = [ Ht, h(Gt) ];

function Kt(...t) {
    return function e(i) {
        return Jt.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        Ut(Gt, this.Type).register(t);
    }
}

const Qt = ht("attribute-pattern");

const Yt = "attribute-pattern-definitions";

const Zt = e => t.annotation.get(e, Yt);

const Jt = Object.freeze({
    name: Qt,
    definitionAnnotationKey: Yt,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        nt(Qt, s, i);
        ct(i, Qt);
        t.annotation.set(i, Yt, e);
        at(i, Yt);
        return i;
    },
    getPatternDefinitions: Zt
});

let te = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

te = tt([ Kt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], te);

let ee = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

ee = tt([ Kt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], ee);

let ie = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

ie = tt([ Kt({
    pattern: ":PART",
    symbols: ":"
}) ], ie);

let se = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

se = tt([ Kt({
    pattern: "@PART",
    symbols: "@"
}) ], se);

let ne = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

ne = tt([ Kt({
    pattern: "...$attrs",
    symbols: ""
}) ], ne);

var re;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(re || (re = {}));

function oe(t) {
    return function(e) {
        return ae.define(t, e);
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
        if (xt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        const r = Object.getPrototypeOf(e) === BindingInterceptor;
        return new BindingBehaviorDefinition(e, i(ce(e, "name"), s), c(ce(e, "aliases"), n.aliases, e.aliases), ae.keyFrom(s), a("strategy", n, e, (() => r ? 2 : 1)));
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
        Nt(s, ae, i, t);
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

const le = [ "isBound", "$scope", "obs", "ast", "locator", "oL", "boundFn" ];

le.forEach((t => {
    Ct(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const he = ht("binding-behavior");

const ce = (t, e) => it(lt(e), t);

const ae = Object.freeze({
    name: he,
    keyFrom(t) {
        return `${he}:${t}`;
    },
    isType(t) {
        return bt(t) && st(he, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        nt(he, i, i.Type);
        nt(he, i, i);
        ct(e, he);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(he, t);
        if (void 0 === e) throw dt(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: ce
});

function ue(t) {
    return function(e) {
        return me.define(t, e);
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
        if (xt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, i(de(e, "name"), s), c(de(e, "aliases"), n.aliases, e.aliases), me.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Nt(s, me, i, t);
    }
}

const fe = ht("value-converter");

const de = (t, e) => it(lt(e), t);

const me = Object.freeze({
    name: fe,
    keyFrom: t => `${fe}:${t}`,
    isType(t) {
        return bt(t) && st(fe, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        nt(fe, i, i.Type);
        nt(fe, i, i);
        ct(e, fe);
        return i.Type;
    },
    getDefinition(t) {
        const e = it(fe, t);
        if (void 0 === e) throw dt(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        nt(lt(e), i, t);
    },
    getAnnotation: de
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
        if (t !== T(i.ast, i.$scope, i, null)) {
            this.v = t;
            this._.add(this);
        }
    }
}

function ge(t, e = true) {
    return i => {
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
        At(s, "get", (function(t) {
            return this.locator.get(t);
        }));
        At(s, "getConverter", (function(t) {
            const e = me.keyFrom(t);
            let i = pe.get(this);
            if (null == i) pe.set(this, i = new ResourceLookup);
            return i[e] ?? (i[e] = this.locator.get($t(e)));
        }));
        At(s, "getBehavior", (function(t) {
            const e = ae.keyFrom(t);
            let i = pe.get(this);
            if (null == i) pe.set(this, i = new ResourceLookup);
            return i[e] ?? (i[e] = this.locator.get($t(e)));
        }));
    };
}

const pe = new WeakMap;

class ResourceLookup {}

const ve = Ot("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.V.forEach(we);
        } finally {
            this.M = false;
        }
    }
    clear() {
        this.V.clear();
        this.M = false;
    }
}

function we(t, e, i) {
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
        const i = T(this.ast, this.$scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        D(this.ast, t, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        E(this.ast, this.$scope, this.interceptor);
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

ge(true)(CallBinding);

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
                    if (xt(e) && e.includes("!important")) {
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
                throw dt(`AUR0651:${this.W}`);
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
            be(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) xe(this.o, this);
    }
    X() {
        Ce = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ce);
    }
}

I(AttributeObserver);

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

const Ae = {
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
        const l = T(this.ast, i, this, e);
        if (r) this.obs.clear();
        if (l !== this.value) {
            this.value = l;
            if (n) {
                o = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    e.updateTarget(l);
                }), Ae);
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
        D(this.ast, t, this.interceptor);
        let e = this.targetObserver;
        if (!e) e = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        const i = this.mode;
        const s = this.interceptor;
        let n = false;
        if (i & (2 | 1)) {
            n = (2 & i) > 0;
            s.updateTarget(this.value = T(this.ast, t, this, n ? s : null));
        }
        if (4 & i) e.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(s, this.locator.get(ve))));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        E(this.ast, this.$scope, this.interceptor);
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

ge(true)(AttributeBinding);

const Re = {
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
            }), Re);
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

ge(true)(InterpolationBinding);

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
        const i = T(this.ast, this.$scope, this, e ? this.interceptor : null);
        if (e) t.clear();
        if (i != this.v) {
            this.v = i;
            if (wt(i)) this.observeCollection(i);
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
        D(this.ast, t, this.interceptor);
        this.v = T(this.ast, t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (wt(this.v)) this.observeCollection(this.v);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

P(InterpolationPartBinding);

ge(true)(InterpolationPartBinding);

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
        const e = T(this.ast, this.$scope, this, t ? this.interceptor : null);
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
        const t = this.v = T(this.ast, this.$scope, this, (2 & this.mode) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (wt(t)) this.observeCollection(t);
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
        D(this.ast, t, this.interceptor);
        const e = this.v = T(this.ast, t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (wt(e)) this.observeCollection(e);
        this.updateTarget(e);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.$scope, this.interceptor);
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
        }), Re);
        e?.cancel();
    }
}

P()(ContentBinding);

ge(void 0, false)(ContentBinding);

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
        const s = T(this.ast, this.$scope, this, this.interceptor);
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
        D(this.ast, t, this.interceptor);
        this.target[this.targetProperty] = T(this.ast, t, this, this.interceptor);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        E(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

P(LetBinding);

ge(true)(LetBinding);

const Se = {
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
        const s = T(this.ast, this.$scope, this, this.interceptor);
        if (i) e.clear();
        if (t) {
            Be = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(s);
                this.task = null;
            }), Se);
            Be?.cancel();
            Be = null;
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
        D(this.ast, t, this.interceptor);
        const e = this.oL;
        const i = this.mode;
        let s = this.targetObserver;
        if (!s) {
            if (4 & i) s = e.getObserver(this.target, this.targetProperty); else s = e.getAccessor(this.target, this.targetProperty);
            this.targetObserver = s;
        }
        const n = this.interceptor;
        const r = (2 & i) > 0;
        if (i & (2 | 1)) n.updateTarget(T(this.ast, t, this, r ? n : null));
        if (4 & i) {
            s.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n, this.locator.get(ve))));
            if (!r) n.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        E(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        Be = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != Be) {
            Be.cancel();
            Be = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

P(PropertyBinding);

ge(true, false)(PropertyBinding);

let Be = null;

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
        D(this.ast, t, this);
        $(this.ast, this.$scope, this, this.target);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (T(this.ast, this.$scope, this, null) === this.target) $(this.ast, this.$scope, this, null);
        E(this.ast, this.$scope, this.interceptor);
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

const Ie = Ot("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(jt(Ie, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Te = Object.freeze({
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
        if (bt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ee(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        nt($e, ChildrenDefinition.create(e, i), t.constructor, e);
        at(t.constructor, Le.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (xt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Pe(t) {
    return t.startsWith($e);
}

const $e = lt("children-observer");

const Le = Object.freeze({
    name: $e,
    keyFrom: t => `${$e}:${t}`,
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
        const i = $e.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        while (--r >= 0) {
            c = n[r];
            l = ut(c).filter(Pe);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = it($e, c, l[t].slice(i));
        }
        return s;
    }
});

const Oe = {
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? Oe, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = Ue, r = qe, o = je, l) {
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
        return _e(this.controller, this.query, this.filter, this.map);
    }
}

I()(ChildrenObserver);

function Ue(t) {
    return t.host.childNodes;
}

function qe(t, e, i) {
    return !!i;
}

function je(t, e, i) {
    return i;
}

const Fe = {
    optional: true
};

function _e(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = bi(l, Fe);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

function Me(t) {
    return function(e) {
        return Xe(t, e);
    };
}

function Ve(t) {
    return function(e) {
        return Xe(xt(t) ? {
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
        if (xt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(e, i(We(e, "name"), s), c(We(e, "aliases"), n.aliases, e.aliases), He(s), i(We(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(We(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), It.from(e, ...It.getAll(e), We(e, "bindables"), e.bindables, n.bindables), i(We(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), c(ti.getAnnotation(e), e.watches), c(We(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        _t(i, e).register(t);
        qt(i, e).register(t);
        Nt(s, Qe, i, t);
    }
}

const Ne = ht("custom-attribute");

const He = t => `${Ne}:${t}`;

const We = (t, e) => it(lt(e), t);

const ze = t => bt(t) && st(Ne, t);

const Ge = (t, e) => Ls(t, He(e)) ?? void 0;

const Xe = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    nt(Ne, i, i.Type);
    nt(Ne, i, i);
    ct(e, Ne);
    return i.Type;
};

const Ke = t => {
    const e = it(Ne, t);
    if (void 0 === e) throw dt(`AUR0759:${t.name}`);
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
        nt(lt(e), i, t);
    },
    getAnnotation: We
});

function Ye(t, e) {
    if (null == t) throw dt(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!bt(e) && (null == e || !(e in l.prototype))) throw dt(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!bt(r?.value)) throw dt(`AUR0774:${String(n)}`);
        ti.add(l, h);
        if (ze(l)) Ke(l).watches.push(h);
        if (wi(l)) yi(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Ze = l;

const Je = lt("watch");

const ti = Object.freeze({
    name: Je,
    add(t, e) {
        let i = it(Je, t);
        if (null == i) nt(Je, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return it(Je, t) ?? Ze;
    }
});

function ei(t) {
    return function(e) {
        return vi(t, e);
    };
}

function ii(t) {
    if (void 0 === t) return function(t) {
        pi(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!bt(t)) return function(e) {
        pi(e, "shadowOptions", t);
    };
    pi(t, "shadowOptions", {
        mode: "open"
    });
}

function si(t) {
    if (void 0 === t) return function(t) {
        ni(t);
    };
    ni(t);
}

function ni(t) {
    const e = it(di, t);
    if (void 0 === e) {
        pi(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function ri(t) {
    if (void 0 === t) return function(t) {
        pi(t, "isStrictBinding", true);
    };
    pi(t, "isStrictBinding", true);
}

const oi = new WeakMap;

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
            if (xt(i)) throw dt(`AUR0761:${t}`);
            const s = u("name", i, gi);
            if (bt(i.Type)) e = i.Type; else e = Ci(f(s));
            return new CustomElementDefinition(e, s, c(i.aliases), u("key", i, (() => mi(s))), u("cache", i, hi), u("capture", i, ai), u("template", i, ci), c(i.instructions), c(i.dependencies), u("injectable", i, ci), u("needsCompile", i, ui), c(i.surrogates), It.from(e, i.bindables), Le.from(i.childrenObservers), u("containerless", i, ai), u("isStrictBinding", i, ai), u("shadowOptions", i, ci), u("hasSlots", i, ai), u("enhance", i, ai), u("watches", i, fi), d("processContent", e, ci));
        }
        if (xt(t)) return new CustomElementDefinition(e, t, c(xi(e, "aliases"), e.aliases), mi(t), d("cache", e, hi), d("capture", e, ai), d("template", e, ci), c(xi(e, "instructions"), e.instructions), c(xi(e, "dependencies"), e.dependencies), d("injectable", e, ci), d("needsCompile", e, ui), c(xi(e, "surrogates"), e.surrogates), It.from(e, ...It.getAll(e), xi(e, "bindables"), e.bindables), Le.from(...Le.getAll(e), xi(e, "childrenObservers"), e.childrenObservers), d("containerless", e, ai), d("isStrictBinding", e, ai), d("shadowOptions", e, ci), d("hasSlots", e, ai), d("enhance", e, ai), c(ti.getAnnotation(e), e.watches), d("processContent", e, ci));
        const i = u("name", t, gi);
        return new CustomElementDefinition(e, i, c(xi(e, "aliases"), t.aliases, e.aliases), mi(i), a("cache", t, e, hi), a("capture", t, e, ai), a("template", t, e, ci), c(xi(e, "instructions"), t.instructions, e.instructions), c(xi(e, "dependencies"), t.dependencies, e.dependencies), a("injectable", t, e, ci), a("needsCompile", t, e, ui), c(xi(e, "surrogates"), t.surrogates, e.surrogates), It.from(e, ...It.getAll(e), xi(e, "bindables"), e.bindables, t.bindables), Le.from(...Le.getAll(e), xi(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), a("containerless", t, e, ai), a("isStrictBinding", t, e, ai), a("shadowOptions", t, e, ci), a("hasSlots", t, e, ai), a("enhance", t, e, ai), c(t.watches, ti.getAnnotation(e), e.watches), a("processContent", t, e, ci));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (oi.has(t)) return oi.get(t);
        const e = CustomElementDefinition.create(t);
        oi.set(t, e);
        nt(di, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            _t(i, e).register(t);
            qt(i, e).register(t);
            Nt(s, Ai, i, t);
        }
    }
}

const li = {
    name: void 0,
    searchParents: false,
    optional: false
};

const hi = () => 0;

const ci = () => null;

const ai = () => false;

const ui = () => true;

const fi = () => l;

const di = ht("custom-element");

const mi = t => `${di}:${t}`;

const gi = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const pi = (t, e, i) => {
    nt(lt(e), i, t);
};

const vi = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    nt(di, i, i.Type);
    nt(di, i, i);
    ct(i.Type, di);
    return i.Type;
};

const wi = t => bt(t) && st(di, t);

const bi = (t, e = li) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = Ls(t, di);
        if (null === i) {
            if (true === e.optional) return null;
            throw dt(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = Ls(t, di);
            if (null === i) throw dt(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = Ls(i, di);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = _s(i);
        }
        if (s) return;
        throw dt(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = Ls(i, di);
        if (null !== t) return t;
        i = _s(i);
    }
    throw dt(`AUR0765`);
};

const xi = (t, e) => it(lt(e), t);

const yi = t => {
    const e = it(di, t);
    if (void 0 === e) throw dt(`AUR0760:${t.name}`);
    return e;
};

const ki = () => {
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

const Ci = function() {
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

const Ai = Object.freeze({
    name: di,
    keyFrom: mi,
    isType: wi,
    for: bi,
    define: vi,
    getDefinition: yi,
    annotate: pi,
    getAnnotation: xi,
    generateName: gi,
    createInjectable: ki,
    generateType: Ci
});

const Ri = lt("processContent");

function Si(t) {
    return void 0 === t ? function(t, e, i) {
        nt(Ri, Bi(t, e), t);
    } : function(e) {
        t = Bi(e, t);
        const i = it(di, e);
        if (void 0 !== i) i.processContent = t; else nt(Ri, t, e);
        return e;
    };
}

function Bi(t, e) {
    if (xt(e)) e = t[e];
    if (!bt(e)) throw dt(`AUR0766:${typeof e}`);
    return e;
}

function Ii(t) {
    return function(e) {
        const i = bt(t) ? t : true;
        pi(e, "capture", i);
        if (wi(e)) yi(e).capture = i;
    };
}

const Ti = m;

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
            const i = Di(t);
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

function Di(t) {
    if (xt(t)) return Ei(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...Di(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...Ei(i)); else e.push(i);
    return e;
}

function Ei(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

function Pi(...t) {
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
                this.element.className = Di(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ Us ], e));
        t.register(s);
    }
}

function $i(...t) {
    return new ShadowDOMRegistry(t);
}

const Li = Ot("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Ti))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Ui);
        const i = t.get(Li);
        t.register(jt(Oi, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Ti ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Ti ];

const Oi = Ot("IShadowDOMStyles");

const Ui = Ot("IShadowDOMGlobalStyles", (t => t.instance({
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

const qi = {
    shadowDOM(t) {
        return Te.creating(g, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(Li);
                e.register(jt(Ui, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ji, exit: Fi} = L;

const {wrap: _i, unwrap: Mi} = O;

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
            ji(this);
            return this.value = Mi(this.$get.call(void 0, this.useProxy ? _i(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Fi(this);
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
            t = T(e, this.scope, this, this);
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
        this.value = T(this.expression, this.scope, this, this);
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

ge(true)(ComputedWatcher);

P(ExpressionWatcher);

ge(true)(ExpressionWatcher);

const Vi = Ot("ILifecycleHooks");

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
        Ut(Vi, this.Type).register(t);
    }
}

const Ni = new WeakMap;

const Hi = lt("lifecycle-hooks");

const Wi = Object.freeze({
    name: Hi,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        nt(Hi, i, e);
        ct(e, Hi);
        return i.Type;
    },
    resolve(t) {
        let e = Ni.get(t);
        if (void 0 === e) {
            Ni.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Vi) : t.has(Vi, false) ? i.getAll(Vi).concat(t.getAll(Vi)) : i.getAll(Vi);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = it(Hi, n.constructor);
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

function zi() {
    return function t(e) {
        return Wi.define({}, e);
    };
}

const Gi = Ot("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (xt(t)) t = parseInt(t, 10);
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

const Xi = new WeakSet;

function Ki(t) {
    return !Xi.has(t);
}

function Qi(t) {
    Xi.add(t);
    return CustomElementDefinition.create(t);
}

const Yi = ht("views");

const Zi = Object.freeze({
    name: Yi,
    has(t) {
        return bt(t) && (st(Yi, t) || "$views" in t);
    },
    get(t) {
        if (bt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Ki).map(Qi);
            for (const e of i) Zi.add(t, e);
        }
        let e = it(Yi, t);
        if (void 0 === e) nt(Yi, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = it(Yi, t);
        if (void 0 === s) nt(Yi, s = [ i ], t); else s.push(i);
        return s;
    }
});

function Ji(t) {
    return function(e) {
        Zi.add(e, t);
    };
}

const ts = Ot("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Zi.has(t.constructor) ? Zi.get(t.constructor) : [];
            const s = bt(e) ? e(t, i) : this.ot(i, e);
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
            n = vi(yi(r), class extends r {
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
            n = vi(this.ct(e, i), class {
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
        if (void 0 === i) throw dt(`Could not find view: ${e}`);
        return i;
    }
}

const es = Ot("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.p = (this.dt = t.root).get(Ti);
        this.gt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.vt ? this.vt = this.dt.getAll(nn, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), ft()) : this.vt;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ut;
            const n = e.get(sn);
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
                if (xt(r)) o.innerHTML = r;
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

Rendering.inject = [ g ];

var is;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(is || (is = {}));

var ss;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(ss || (ss = {}));

const ns = {
    optional: true
};

const rs = new WeakMap;

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
        this.wt = null;
        this.state = 0;
        this.bt = false;
        this.xt = l;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.yt = 0;
        this.kt = 0;
        this.Ct = 0;
        this.At = n;
        this.Rt = 2 === e ? HooksDefinition.none : new HooksDefinition(n);
        this.location = o;
        this.r = t.root.get(es);
    }
    get lifecycleHooks() {
        return this.wt;
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
        return this.Rt;
    }
    get viewModel() {
        return this.At;
    }
    set viewModel(t) {
        this.At = t;
        this.Rt = null == t || 2 === this.vmKind ? HooksDefinition.none : new HooksDefinition(t);
    }
    static getCached(t) {
        return rs.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw dt(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (rs.has(e)) return rs.get(e);
        n = n ?? yi(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(p(bs));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        Mt(t, bs, new v("IHydrationContext", new HydrationContext(o, s, l)));
        rs.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (rs.has(e)) return rs.get(e);
        s = s ?? Ke(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        rs.set(e, n);
        n.St();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = e ?? null;
        i.Bt();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.At;
        let r = this.definition;
        this.scope = U.create(n, null, true);
        if (r.watches.length > 0) us(this, i, r, n);
        ls(this, r, s, n);
        this.xt = hs(this, r, n);
        if (this.Rt.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.wt = Wi.resolve(i);
        r.register(i);
        if (null !== r.injectable) Mt(i, r.injectable, new v("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.wt.hydrating) this.wt.hydrating.forEach(ks, this);
        if (this.Rt.hasHydrating) this.At.hydrating(this);
        const e = this.It = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = bi(this.host, ns))) {
            this.host = this.container.root.get(Ti).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Vs(this.host);
        }
        Os(this.host, di, this);
        Os(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw dt(`AUR0501`);
            Os(this.shadowRoot = this.host.attachShadow(i ?? ms), di, this);
            Os(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Os(o, di, this);
            Os(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.At.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.wt.hydrated) this.wt.hydrated.forEach(Cs, this);
        if (this.Rt.hasHydrated) this.At.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.It, this.host);
        if (void 0 !== this.wt.created) this.wt.created.forEach(ys, this);
        if (this.Rt.hasCreated) this.At.created(this);
    }
    St() {
        const t = this.definition;
        const e = this.At;
        if (t.watches.length > 0) us(this, this.container, t, e);
        ls(this, t, this.flags, e);
        e.$controller = this;
        this.wt = Wi.resolve(this.container);
        if (void 0 !== this.wt.created) this.wt.created.forEach(ys, this);
        if (this.Rt.hasCreated) this.At.created(this);
    }
    Bt() {
        this.It = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.It.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.It)).findTargets(), this.It, void 0);
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
            throw dt(`AUR0503:${this.name} ${vs(this.state)}`);
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
        this.Tt();
        let n;
        if (2 !== this.vmKind && null != this.wt.binding) n = w(...this.wt.binding.map(As, this));
        if (this.Rt.hasBinding) n = w(n, this.At.binding(this.$initiator, this.parent, this.$flags));
        if (vt(n)) {
            this.Dt();
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
        let e = this.xt.length;
        let i;
        if (e > 0) while (e > t) {
            this.xt[t].start();
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
        if (2 !== this.vmKind && null != this.wt.bound) i = w(...this.wt.bound.map(Rs, this));
        if (this.Rt.hasBound) i = w(i, this.At.bound(this.$initiator, this.parent, this.$flags));
        if (vt(i)) {
            this.Dt();
            i.then((() => {
                this.isBound = true;
                this.Pt();
            })).catch((t => {
                this.Et(t);
            }));
            return;
        }
        this.isBound = true;
        this.Pt();
    }
    $t(...t) {
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
    Pt() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.$t(this.host);
            break;

          case 3:
            this.hostController.$t(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(Oi, false) ? t.get(Oi) : t.get(Ui);
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
        if (2 !== this.vmKind && null != this.wt.attaching) e = w(...this.wt.attaching.map(Ss, this));
        if (this.Rt.hasAttaching) e = w(e, this.At.attaching(this.$initiator, this.parent, this.$flags));
        if (vt(e)) {
            this.Dt();
            this.Tt();
            e.then((() => {
                this.Lt();
            })).catch((t => {
                this.Et(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.Lt();
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
            throw dt(`AUR0505:${this.name} ${vs(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Ot();
        let s = 0;
        let n;
        if (this.xt.length) for (;s < this.xt.length; ++s) this.xt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.wt.detaching) n = w(...this.wt.detaching.map(Is, this));
        if (this.Rt.hasDetaching) n = w(n, this.At.detaching(this.$initiator, this.parent, this.$flags));
        if (vt(n)) {
            this.Dt();
            t.Ot();
            n.then((() => {
                t.Ut();
            })).catch((e => {
                t.Et(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.Ut();
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
        this.qt();
    }
    Dt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Dt();
        }
    }
    qt() {
        if (void 0 !== this.$promise) {
            Ds = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ds();
            Ds = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            Es = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Es(t);
            Es = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    Tt() {
        ++this.yt;
        if (this.$initiator !== this) this.parent.Tt();
    }
    Lt() {
        if (0 === --this.yt) {
            if (2 !== this.vmKind && null != this.wt.attached) Ps = w(...this.wt.attached.map(Bs, this));
            if (this.Rt.hasAttached) Ps = w(Ps, this.At.attached(this.$initiator, this.$flags));
            if (vt(Ps)) {
                this.Dt();
                Ps.then((() => {
                    this.state = 2;
                    this.qt();
                    if (this.$initiator !== this) this.parent.Lt();
                })).catch((t => {
                    this.Et(t);
                }));
                Ps = void 0;
                return;
            }
            Ps = void 0;
            this.state = 2;
            this.qt();
        }
        if (this.$initiator !== this) this.parent.Lt();
    }
    Ot() {
        ++this.kt;
    }
    Ut() {
        if (0 === --this.kt) {
            this.jt();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.wt.unbinding) e = w(...t.wt.unbinding.map(Ts, this));
                if (t.Rt.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = w(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (vt(e)) {
                    this.Dt();
                    this.jt();
                    e.then((() => {
                        this.Ft();
                    })).catch((t => {
                        this.Et(t);
                    }));
                }
                e = void 0;
                t = t.next;
            }
            this.Ft();
        }
    }
    jt() {
        ++this.Ct;
    }
    Ft() {
        if (0 === --this.Ct) {
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
            return Ke(this.At.constructor).name === t;

          case 0:
            return yi(this.At.constructor).name === t;

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
            Os(t, di, this);
            Os(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Os(t, di, this);
            Os(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Os(t, di, this);
            Os(t, this.definition.key, this);
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
        if (this.Rt.hasDispose) this.At.dispose();
        if (null !== this.children) {
            this.children.forEach(xs);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.At) {
            rs.delete(this.At);
            this.At = null;
        }
        this.At = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.Rt.hasAccept && true === this.At.accept(t)) return true;
        if (null !== this.children) {
            const {children: e} = this;
            for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
        }
    }
}

function os(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function ls(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = os(s);
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

function hs(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = os(i);
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

const cs = new Map;

const as = t => {
    let e = cs.get(t);
    if (null == e) {
        e = new _(t, 0);
        cs.set(t, e);
    }
    return e;
};

function us(t, e, i, s) {
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
        a = bt(a) ? a : Reflect.get(s, a);
        if (!bt(a)) throw dt(`AUR0506:${String(a)}`);
        if (bt(c)) t.addBinding(new ComputedWatcher(s, n, c, a, true)); else {
            u = xt(c) ? r.parse(c, 8) : as(c);
            t.addBinding(new ExpressionWatcher(l, e, n, u, a));
        }
    }
}

function fs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function ds(t) {
    return B(t) && wi(t.constructor);
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

const ms = {
    mode: "open"
};

var gs;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(gs || (gs = {}));

var ps;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(ps || (ps = {}));

function vs(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const ws = Ot("IController");

const bs = Ot("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function xs(t) {
    t.dispose();
}

function ys(t) {
    t.instance.created(this.At, this);
}

function ks(t) {
    t.instance.hydrating(this.At, this);
}

function Cs(t) {
    t.instance.hydrated(this.At, this);
}

function As(t) {
    return t.instance.binding(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function Rs(t) {
    return t.instance.bound(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function Ss(t) {
    return t.instance.attaching(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function Bs(t) {
    return t.instance.attached(this.At, this["$initiator"], this["$flags"]);
}

function Is(t) {
    return t.instance.detaching(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function Ts(t) {
    return t.instance.unbinding(this.At, this["$initiator"], this.parent, this["$flags"]);
}

let Ds;

let Es;

let Ps;

const $s = Ot("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this._t = void 0;
        this.host = t.host;
        s.prepare(this);
        Mt(i, e.HTMLElement, Mt(i, e.Element, Mt(i, Us, new v("ElementResolver", t.host))));
        this._t = b(this.Mt("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (wi(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return b(this.Mt("hydrating"), (() => {
                o.hS(null);
                return b(this.Mt("hydrated"), (() => {
                    o.hC();
                    this._t = void 0;
                }));
            }));
        }));
    }
    activate() {
        return b(this._t, (() => b(this.Mt("activating"), (() => b(this.controller.activate(this.controller, null, 1, void 0), (() => this.Mt("activated")))))));
    }
    deactivate() {
        return b(this.Mt("deactivating"), (() => b(this.controller.deactivate(this.controller, null, 0), (() => this.Mt("deactivated")))));
    }
    Mt(t) {
        return w(...this.container.getAll(Ie).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function Ls(t, e) {
    return t.$au?.[e] ?? null;
}

function Os(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const Us = Ot("INode");

const qs = Ot("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has($s, true)) return t.get($s).host;
    return t.get(Ti).document;
}))));

const js = Ot("IRenderLocation");

const Fs = new WeakMap;

function _s(t) {
    if (Fs.has(t)) return Fs.get(t);
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
        const e = bi(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return _s(e.host);
    }
    return t.parentNode;
}

function Ms(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) Fs.set(i[t], e);
    } else Fs.set(t, e);
}

function Vs(t) {
    if (Ns(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function Ns(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Vs(r); else o[s] = r;
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
        if (Ns(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Hs = Ot("IWindow", (t => t.callback((t => t.get(Ti).window))));

const Ws = Ot("ILocation", (t => t.callback((t => t.get(Hs).location))));

const zs = Ot("IHistory", (t => t.callback((t => t.get(Hs).history))));

const Gs = {
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
        this.Vt = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let i = T(this.ast, this.$scope, this, null);
        delete e.$event;
        if (bt(i)) i = i(t);
        if (true !== i && this.Vt.prevent) t.preventDefault();
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
        D(this.ast, t, this.interceptor);
        if (0 === this.Vt.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(qs), this.target, this.targetEvent, this, Gs[this.Vt.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        E(this.ast, this.$scope, this.interceptor);
        this.$scope = null;
        if (0 === this.Vt.strategy) this.target.removeEventListener(this.targetEvent, this); else {
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

ge(true, true)(Listener);

const Xs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = Xs) {
        this.Nt = t;
        this.Ht = e;
        this.Vt = i;
        this.Wt = 0;
        this.zt = new Map;
        this.Gt = new Map;
    }
    Xt() {
        if (1 === ++this.Wt) this.Nt.addEventListener(this.Ht, this, this.Vt);
    }
    Kt() {
        if (0 === --this.Wt) this.Nt.removeEventListener(this.Ht, this, this.Vt);
    }
    dispose() {
        if (this.Wt > 0) {
            this.Wt = 0;
            this.Nt.removeEventListener(this.Ht, this, this.Vt);
        }
        this.zt.clear();
        this.Gt.clear();
    }
    Qt(t) {
        const e = true === this.Vt.capture ? this.zt : this.Gt;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = ft());
        return i;
    }
    handleEvent(t) {
        const e = true === this.Vt.capture ? this.zt : this.Gt;
        const i = t.composedPath();
        if (true === this.Vt.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.Ht];
            if (void 0 === n) continue;
            if (bt(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, i, s) {
        this.Yt = t;
        this.Zt = e;
        this.Ht = i;
        t.Xt();
        e[i] = s;
    }
    dispose() {
        this.Yt.Kt();
        this.Zt[this.Ht] = void 0;
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

const Ks = Ot("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Jt = ft();
    }
    addEventListener(t, e, i, s, n) {
        var r;
        const o = (r = this.Jt)[i] ?? (r[i] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, i, n));
        return new DelegateSubscription(l, l.Qt(e), i, s);
    }
    dispose() {
        for (const t in this.Jt) {
            const e = this.Jt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Qs = Ot("IProjections");

const Ys = Ot("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var Zs;

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
})(Zs || (Zs = {}));

const Js = Ot("Instruction");

function tn(t) {
    const e = t.type;
    return xt(e) && 2 === e.length;
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

var en;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(en || (en = {}));

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

const sn = Ot("ITemplateCompiler");

const nn = Ot("IRenderer");

function rn(t) {
    return function e(i) {
        i.register = function(t) {
            Ut(nn, this).register(t);
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

function on(t, e, i) {
    if (xt(e)) return t.parse(e, i);
    return e;
}

function ln(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function hn(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return bi(t);

      case "view":
        throw dt(`AUR0750`);

      case "view-model":
        return bi(t).viewModel;

      default:
        {
            const i = Ge(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = bi(t, {
                name: e
            });
            if (void 0 === s) throw dt(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let cn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = ln(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

cn = tt([ rn("re") ], cn);

let an = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ es, Ti ];
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
            s = c.find(Ai, l);
            if (null == s) throw dt(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Vs(e) : null;
        const f = Un(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        Mt(f, n, new v(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        Os(e, s.key, o);
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

an = tt([ rn("ra") ], an);

let un = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ es, Ti ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Qe, i.res);
            if (null == n) throw dt(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = qn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Os(e, n.key, o);
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

un = tt([ rn("rb") ], un);

let fn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ es, Ti ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Qe, i.res);
            if (null == n) throw dt(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Vs(e);
        const l = qn(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Os(o, n.key, h);
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

fn = tt([ rn("rc") ], fn);

let dn = class LetElementRenderer {
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
            h = on(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(18 === h.$kind ? yn(c, h, r) : c);
            ++a;
        }
    }
};

dn.inject = [ F, j ];

dn = tt([ rn("rd") ], dn);

let mn = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, s, ln(e), i.to);
        t.addBinding(18 === s.$kind ? yn(n, s, t.container) : n);
    }
};

mn.inject = [ F, j ];

mn = tt([ rn("rh") ], mn);

let gn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 8);
        const n = new RefBinding(t.container, s, hn(e, i.to));
        t.addBinding(18 === s.$kind ? yn(n, s, t.container) : n);
    }
};

gn.inject = [ F ];

gn = tt([ rn("rj") ], gn);

let pn = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = on(this.ep, i.from, 1);
        const r = new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, ln(e), i.to, 2);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (18 === c.ast.$kind) o[h] = yn(c, c.ast, s);
        }
        t.addBinding(r);
    }
};

pn.inject = [ F, j, Ti ];

pn = tt([ rn("rf") ], pn);

let vn = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, ln(e), i.to, i.mode);
        t.addBinding(18 === s.$kind ? yn(n, s, t.container) : n);
    }
};

vn.inject = [ F, j, Ti ];

vn = tt([ rn("rg") ], vn);

let wn = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, ln(e), i.to, 2);
        t.addBinding(18 === s.iterable.$kind ? yn(n, s.iterable, t.container) : n);
    }
};

wn.inject = [ F, j, Ti ];

wn = tt([ rn("rk") ], wn);

let bn = 0;

const xn = [];

function yn(t, e, i) {
    while (e instanceof M) {
        xn[bn++] = e;
        e = e.expression;
    }
    while (bn > 0) {
        const e = xn[--bn];
        const s = i.get(ae.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    xn.length = 0;
    return t;
}

let kn = class TextBindingRenderer {
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
        const l = on(this.ep, i.from, 1);
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
            t.addBinding(18 === m.$kind ? yn(d, m, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

kn.inject = [ F, j, Ti ];

kn = tt([ rn("ha") ], kn);

let Cn = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.te = e;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 4);
        const n = new Listener(t.container, s, e, i.to, this.te, new ListenerOptions(i.preventDefault, i.strategy));
        t.addBinding(18 === s.$kind ? yn(n, s, t.container) : n);
    }
};

Cn.inject = [ F, Ks ];

Cn = tt([ rn("hb") ], Cn);

let An = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

An = tt([ rn("he") ], An);

let Rn = class SetClassAttributeRenderer {
    render(t, e, i) {
        Dn(e.classList, i.value);
    }
};

Rn = tt([ rn("hf") ], Rn);

let Sn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Sn = tt([ rn("hg") ], Sn);

let Bn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, 2);
        t.addBinding(18 === s.$kind ? yn(n, s, t.container) : n);
    }
};

Bn.inject = [ F, j, Ti ];

Bn = tt([ rn("hd") ], Bn);

let In = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = on(this.ep, i.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, 2);
        t.addBinding(18 === s.$kind ? yn(n, s, t.container) : n);
    }
};

In.inject = [ Ti, F, j ];

In = tt([ rn("hc") ], In);

let Tn = class SpreadRenderer {
    constructor(t, e) {
        this.ee = t;
        this.r = e;
    }
    static get inject() {
        return [ sn, es ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(bs);
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
            const n = En(s);
            const c = this.ee.compileSpread(s.controller.definition, s.instruction?.captures ?? l, s.controller.container, e);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                r[a.instructions.type].render(n, bi(e), a.instructions);
                break;

              default:
                r[a.type].render(n, e, a);
            }
            t.addBinding(n);
        };
        h(0);
    }
};

Tn = tt([ rn("hs") ], Tn);

class SpreadBinding {
    constructor(t, e) {
        this.ie = t;
        this.se = e;
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
        const e = this.$scope = this.se.controller.scope.parent ?? void 0;
        if (null == e) throw dt("Invalid spreading. Context scope is null/undefined");
        this.ie.forEach((t => t.$bind(e)));
    }
    $unbind() {
        this.ie.forEach((t => t.$unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.ie.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw dt("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Dn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const En = t => new SpreadBinding([], t);

const Pn = "IController";

const $n = "IInstruction";

const Ln = "IRenderLocation";

const On = "IAuSlotsInfo";

function Un(t, e, i, s, n, r) {
    const o = e.container.createChild();
    Mt(o, t.HTMLElement, Mt(o, t.Element, Mt(o, Us, new v("ElementResolver", i))));
    Mt(o, ws, new v(Pn, e));
    Mt(o, Js, new v($n, s));
    Mt(o, js, null == n ? jn : new RenderLocationProvider(n));
    Mt(o, Gi, Fn);
    Mt(o, Ys, null == r ? _n : new v(On, r));
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
        if (!xt(t.name) || 0 === t.name.length) throw dt(`AUR0756`);
        return t;
    }
}

function qn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    Mt(h, t.HTMLElement, Mt(h, t.Element, Mt(h, Us, new v("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    Mt(h, ws, new v(Pn, i));
    Mt(h, Js, new v($n, n));
    Mt(h, js, null == o ? jn : new v(Ln, o));
    Mt(h, Gi, null == r ? Fn : new ViewFactoryProvider(r));
    Mt(h, Ys, null == l ? _n : new v(On, l));
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

const jn = new RenderLocationProvider(null);

const Fn = new ViewFactoryProvider(null);

const _n = new v(On, new AuSlotsInfo(l));

var Mn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Mn || (Mn = {}));

function Vn(t) {
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
        if (xt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, i(Wn(e, "name"), s), c(Wn(e, "aliases"), n.aliases, e.aliases), Hn(s), i(Wn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ut(i, e).register(t);
        qt(i, e).register(t);
        Nt(s, zn, i, t);
    }
}

const Nn = ht("binding-command");

const Hn = t => `${Nn}:${t}`;

const Wn = (t, e) => it(lt(e), t);

const zn = Object.freeze({
    name: Nn,
    keyFrom: Hn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        nt(Nn, i, i.Type);
        nt(Nn, i, i);
        ct(e, Nn);
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
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 8), n, 1);
    }
};

Gn = tt([ Vn("one-time") ], Gn);

let Xn = class ToViewBindingCommand {
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

Xn = tt([ Vn("to-view") ], Xn);

let Kn = class FromViewBindingCommand {
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

Kn = tt([ Vn("from-view") ], Kn);

let Qn = class TwoWayBindingCommand {
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

Qn = tt([ Vn("two-way") ], Qn);

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

Yn = tt([ Vn("bind") ], Yn);

let Zn = class CallBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(e.parse(t.attr.rawValue, 8 | 4), i);
    }
};

Zn = tt([ Vn("call") ], Zn);

let Jn = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(e.parse(t.attr.rawValue, 2), i);
    }
};

Jn = tt([ Vn("for") ], Jn);

let tr = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, 0);
    }
};

tr = tt([ Vn("trigger") ], tr);

let er = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 2);
    }
};

er = tt([ Vn("delegate") ], er);

let ir = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 1);
    }
};

ir = tt([ Vn("capture") ], ir);

let sr = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

sr = tt([ Vn("attr") ], sr);

let nr = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

nr = tt([ Vn("style") ], nr);

let rr = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

rr = tt([ Vn("class") ], rr);

let or = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

or = tt([ Vn("ref") ], or);

let lr = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

lr = tt([ Vn("...$attrs") ], lr);

const hr = Ot("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const cr = t => {
    const e = ft();
    t = xt(t) ? t.split(" ") : t;
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
        this.ne = Object.assign(ft(), {
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
        this.re = cr("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.oe = cr("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.ne;
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
        return Ut(hr, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.re[t.nodeName] && true === this.oe[e] || true === this.ne[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ Ti ];

const ar = Ot("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.le = ft();
        this.he = ft();
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
            s = (e = this.le)[n] ?? (e[n] = ft());
            for (r in i) {
                if (void 0 !== s[r]) throw fr(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.he;
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
        return this.le[t.nodeName]?.[e] ?? this.he[e] ?? (pt(t, e, this.svg) ? e : null);
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

const dr = Ot("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const mr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ce = t.document.createElement("template");
    }
    createTemplate(t) {
        if (xt(t)) {
            let e = mr[t];
            if (void 0 === e) {
                const i = this.ce;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.ce = this.p.document.createElement("template");
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

TemplateElementFactory.inject = [ Ti ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Ut(sn, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = vr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = xt(s.template) || !t.enhance ? n.ae.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const c = e.get(Lt(Br));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(Ar)) throw dt(`AUR0701`);
        this.ue(h, n);
        this.fe(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || gi(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.de(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, vr, null, null, void 0);
        const r = [];
        const o = n.me(s.nodeName.toLowerCase());
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
            w = n.ge(u);
            if (null !== w && (1 & w.type) > 0) {
                br.node = s;
                br.attr = u;
                br.bindable = null;
                br.def = null;
                r.push(w.build(br, n.ep, n.m));
                continue;
            }
            f = n.pe(k);
            if (null !== f) {
                if (f.isTemplateController) throw dt(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === w && gr(C);
                if (y) m = this.ve(s, C, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        b = h.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        br.node = s;
                        br.attr = u;
                        br.bindable = v;
                        br.def = f;
                        m = [ w.build(br, n.ep, n.m) ];
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
                        br.node = s;
                        br.attr = u;
                        br.bindable = p;
                        br.def = o;
                        r.push(new SpreadElementPropBindingInstruction(w.build(br, n.ep, n.m)));
                        continue;
                    }
                }
                br.node = s;
                br.attr = u;
                br.bindable = null;
                br.def = null;
                r.push(w.build(br, n.ep, n.m));
            }
        }
        pr();
        if (null != d) return d.concat(r);
        return r;
    }
    de(t, e) {
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
            a = e.we.parse(h, c);
            b = a.target;
            y = a.rawValue;
            if (xr[b]) throw dt(`AUR0702:${h}`);
            p = e.ge(a);
            if (null !== p && (1 & p.type) > 0) {
                br.node = t;
                br.attr = a;
                br.bindable = null;
                br.def = null;
                i.push(p.build(br, e.ep, e.m));
                continue;
            }
            u = e.pe(b);
            if (null !== u) {
                if (u.isTemplateController) throw dt(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && gr(y);
                if (w) d = this.ve(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        br.node = t;
                        br.attr = a;
                        br.bindable = g;
                        br.def = u;
                        d = [ p.build(br, e.ep, e.m) ];
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
                br.node = t;
                br.attr = a;
                br.bindable = null;
                br.def = null;
                i.push(p.build(br, e.ep, e.m));
            }
        }
        pr();
        if (null != f) return f.concat(i);
        return i;
    }
    fe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.be(t, e);

              default:
                return this.xe(t, e);
            }

          case 3:
            return this.ye(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.fe(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    be(t, e) {
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
            c = e.we.parse(a, u);
            d = c.target;
            m = c.rawValue;
            f = e.ge(c);
            if (null !== f) {
                if ("bind" === c.command) n.push(new LetBindingInstruction(r.parse(m, 8), x(d))); else throw dt(`AUR0704:${c.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new V(m) : g, x(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.ke(t).nextSibling;
    }
    xe(t, e) {
        var i, s, r, o;
        const h = t.nextSibling;
        const c = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const a = e.me(c);
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
        let I;
        let T = null;
        let D = false;
        let E;
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
            S = e.we.parse(A, R);
            j = e.ge(S);
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
                    if (null == F.attrs[M] && !e.pe(M)?.isTemplateController) {
                        v();
                        g.push(S);
                        continue;
                    }
                }
            }
            if (null !== j && 1 & j.type) {
                br.node = t;
                br.attr = S;
                br.bindable = null;
                br.def = null;
                (B ?? (B = [])).push(j.build(br, e.ep, e.m));
                v();
                continue;
            }
            T = e.pe(M);
            if (null !== T) {
                F = BindablesInfo.from(T, true);
                D = false === T.noMultiBindings && null === j && gr(V);
                if (D) $ = this.ve(t, V, T, e); else {
                    _ = F.primary;
                    if (null === j) {
                        U = p.parse(V, 1);
                        $ = [ null === U ? new SetPropertyInstruction(V, _.property) : new InterpolationInstruction(U, _.property) ];
                    } else {
                        br.node = t;
                        br.attr = S;
                        br.bindable = _;
                        br.def = T;
                        $ = [ j.build(br, e.ep, e.m) ];
                    }
                }
                v();
                if (T.isTemplateController) (L ?? (L = [])).push(new HydrateTemplateController(wr, this.resolveResources ? T : T.name, void 0, $)); else (P ?? (P = [])).push(new HydrateAttributeInstruction(this.resolveResources ? T : T.name, null != T.aliases && T.aliases.includes(M) ? M : void 0, $));
                continue;
            }
            if (null === j) {
                if (u) {
                    F = BindablesInfo.from(a, false);
                    E = F.attrs[M];
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
                    (B ?? (B = [])).push(new InterpolationInstruction(U, e.m.map(t, M) ?? x(M)));
                }
                continue;
            }
            v();
            if (u) {
                F = BindablesInfo.from(a, false);
                E = F.attrs[M];
                if (void 0 !== E) {
                    br.node = t;
                    br.attr = S;
                    br.bindable = E;
                    br.def = a;
                    (I ?? (I = [])).push(j.build(br, e.ep, e.m));
                    continue;
                }
            }
            br.node = t;
            br.attr = S;
            br.bindable = null;
            br.def = null;
            (B ?? (B = [])).push(j.build(br, e.ep, e.m));
        }
        pr();
        if (this.Ce(t) && null != B && B.length > 1) this.Ae(t, B);
        if (u) {
            q = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, I ?? l, null, H, g);
            if (c === $r) {
                const i = t.getAttribute("name") || Pr;
                const s = e.h("template");
                const n = e.Re();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.fe(s.content, n);
                q.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: gi(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Se(t, e);
            }
        }
        if (null != B || null != q || null != P) {
            b = l.concat(q ?? l, P ?? l, B ?? l);
            this.ke(t);
        }
        let z;
        if (null != L) {
            y = L.length - 1;
            k = y;
            O = L[k];
            let n;
            this.Se(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.Re(null == b ? [] : [ b ]);
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
                h = 1 === A.nodeType ? A.getAttribute($r) : null;
                if (null !== h) A.removeAttribute($r);
                if (u) {
                    l = A.nextSibling;
                    if (!f) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = h || Pr] ?? (i[s] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== h) {
                        h = h || Pr;
                        throw dt(`AUR0706:${c}[${h}]`);
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
                    w = e.Re();
                    this.fe(n.content, w);
                    d[h] = CustomElementDefinition.create({
                        name: gi(),
                        template: n,
                        instructions: w.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (u && (H || a.containerless)) this.Se(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z) if ("TEMPLATE" === t.nodeName) this.fe(t.content, o); else {
                A = t.firstChild;
                while (null !== A) A = this.fe(A, o);
            }
            O.def = CustomElementDefinition.create({
                name: gi(),
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
                    name: gi(),
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
                n = 1 === i.nodeType ? i.getAttribute($r) : null;
                if (null !== n) i.removeAttribute($r);
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
                    for (w = 0, x = d.length; x > w; ++w) {
                        m = d[w];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.Re();
                    this.fe(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: gi(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = l;
            }
            if (u && (H || a.containerless)) this.Se(t, e);
            z = !u || !a.containerless && !H && false !== N;
            if (z && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.fe(i, e);
            }
        }
        return h;
    }
    ye(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.ke(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    ve(t, e, i, s) {
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
                f = s.we.parse(l, h);
                d = s.ge(f);
                m = n.attrs[f.target];
                if (null == m) throw dt(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    br.node = t;
                    br.attr = f;
                    br.bindable = m;
                    br.def = i;
                    o.push(d.build(br, s.ep, s.m));
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
    ue(t, e) {
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
            const c = It.for(n);
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
                    mode: Sr(t)
                });
                const s = t.getAttributeNames().filter((t => !Cr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Be(vi({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const c = o.length;
        for (;c > h; ++h) yi(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    Ce(t) {
        return "INPUT" === t.nodeName && 1 === yr[t.type];
    }
    Ae(t, e) {
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
    ke(t) {
        t.classList.add("au");
        return t;
    }
    Se(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.ke(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.Ie = ft();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.ae = o ? s.ae : e.get(dr);
        this.we = o ? s.we : e.get(Xt);
        this.ep = o ? s.ep : e.get(F);
        this.m = o ? s.m : e.get(ar);
        this.Te = o ? s.Te : e.get(k);
        this.p = o ? s.p : e.get(Ti);
        this.localEls = o ? s.localEls : new Set;
        this.rows = r ?? [];
    }
    Be(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    me(t) {
        return this.c.find(Ai, t);
    }
    pe(t) {
        return this.c.find(Qe, t);
    }
    Re(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ge(t) {
        if (this.root !== this) return this.root.ge(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.Ie[e];
        if (void 0 === i) {
            i = this.c.create(zn, e);
            if (null === i) throw dt(`AUR0713:${e}`);
            this.Ie[e] = i;
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
    br.node = br.attr = br.bindable = br.def = null;
}

const vr = {
    projections: null
};

const wr = {
    name: "unnamed"
};

const br = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const xr = Object.assign(ft(), {
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

const Cr = Object.freeze([ "property", "attribute", "mode" ]);

const Ar = "as-custom-element";

function Rr(t, e) {
    const i = t.getAttribute(Ar);
    if (null === i || "" === i) throw dt(`AUR0715`);
    if (e.has(i)) throw dt(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Ar);
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

const Br = Ot("ITemplateCompilerHooks");

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
        t.register(Ut(Br, this.Type));
    }
}

const Er = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Dr.define(t);
    }
};

const Pr = "default";

const $r = "au-slot";

const Lr = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
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

oe("oneTime")(OneTimeBindingBehavior);

oe("toView")(ToViewBindingBehavior);

oe("fromView")(FromViewBindingBehavior);

oe("twoWay")(TwoWayBindingBehavior);

const Or = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.De = {
            delay: Or
        };
        this.Ee = null;
        this.Pe = null;
        this.J = t.get(m).taskQueue;
        if (e.args.length > 0) this.Ee = e.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e) {
        if (null !== this.Pe) {
            this.Pe.cancel();
            this.Pe = null;
        }
        this.binding.handleChange(t, e);
    }
    updateSource(t) {
        this.queueTask((() => this.binding.updateSource(t)));
    }
    queueTask(t) {
        const e = this.Pe;
        this.Pe = this.J.queueTask((() => {
            this.Pe = null;
            return t();
        }), this.De);
        e?.cancel();
    }
    $bind(t) {
        if (null !== this.Ee) {
            const e = Number(T(this.Ee, t, this, null));
            this.De.delay = isNaN(e) ? Or : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.Pe?.cancel();
        this.Pe = null;
        this.binding.$unbind();
    }
}

oe("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Zt = new Map;
        this.$e = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw dt(`AUR0817`);
        if (0 === i.length) throw dt(`AUR0818`);
        this.Zt.set(e, i);
        let s;
        for (s of i) this.$e.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.Zt.get(e);
        this.Zt.delete(e);
        let s;
        for (s of i) this.$e.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ N ];

oe("signal")(SignalBindingBehavior);

const Ur = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.De = {
            delay: Ur
        };
        this.Ee = null;
        this.Pe = null;
        this.Le = 0;
        this.Oe = 0;
        this.p = t.get(m);
        this.J = this.p.taskQueue;
        if (e.args.length > 0) this.Ee = e.args[0];
    }
    callSource(t) {
        this.Ue((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e) {
        if (null !== this.Pe) {
            this.Pe.cancel();
            this.Pe = null;
            this.Le = this.p.performanceNow();
        }
        this.binding.handleChange(t, e);
    }
    updateSource(t) {
        this.Ue((() => this.binding.updateSource(t)));
    }
    Ue(t) {
        const e = this.De;
        const i = this.p;
        const s = this.Le + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.Pe;
            e.delay = s;
            this.Pe = this.J.queueTask((() => {
                this.Le = i.performanceNow();
                this.Pe = null;
                e.delay = this.Oe;
                t();
            }), e);
            n?.cancel();
        } else {
            this.Le = i.performanceNow();
            t();
        }
    }
    $bind(t) {
        if (null !== this.Ee) {
            const e = Number(T(this.Ee, t, this, null));
            this.De.delay = this.Oe = isNaN(e) ? Ur : e;
        }
        super.$bind(t);
    }
    $unbind() {
        this.Pe?.cancel();
        this.Pe = null;
        super.$unbind();
    }
}

oe("throttle")(ThrottleBindingBehavior);

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

const qr = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = qr;
    }
    unbind(t, e) {
        return;
    }
}

oe("attr")(AttrBindingBehavior);

function jr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw dt(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = jr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

oe("self")(SelfBindingBehavior);

const Fr = ft();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Fr[t] ?? (Fr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

function _r(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.qe = void 0;
        this.je = void 0;
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
        this.Fe();
        this._e();
        this.X();
    }
    handleCollectionChange() {
        this._e();
    }
    handleChange(t, e) {
        this._e();
    }
    _e() {
        const t = this.v;
        const e = this.o;
        const i = mt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : _r;
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
        const e = this.o;
        const i = mt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : _r;
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
        this.X();
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Fe();
    }
    stop() {
        this.handler.dispose();
        this.qe?.unsubscribe(this);
        this.qe = void 0;
        this.je?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    X() {
        Mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Mr);
    }
    Fe() {
        const t = this.o;
        (this.je ?? (this.je = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.qe?.unsubscribe(this);
        this.qe = void 0;
        if ("checkbox" === t.type) (this.qe = Jr(this.v, this.oL))?.subscribe(this);
    }
}

I(CheckedObserver);

let Mr;

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
        this.N = false;
        this.Me = void 0;
        this.Ve = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Hr(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.N = t !== this.ov;
        this.Ne(t instanceof Array ? t : null);
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
        const i = wt(t);
        const s = e.matcher ?? Nr;
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
            const o = t.matcher || Nr;
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
    He() {
        (this.Ve = new this.o.ownerDocument.defaultView.MutationObserver(this.We.bind(this))).observe(this.o, Vr);
        this.Ne(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    ze() {
        this.Ve.disconnect();
        this.Me?.unsubscribe(this);
        this.Ve = this.Me = void 0;
        this.iO = false;
    }
    Ne(t) {
        this.Me?.unsubscribe(this);
        this.Me = void 0;
        if (null != t) {
            if (!this.o.multiple) throw dt(`AUR0654`);
            (this.Me = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.X();
    }
    We(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.X();
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.He();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.ze();
        }
    }
    X() {
        Wr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Wr);
    }
}

I(SelectValueObserver);

function Hr(t) {
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

let Wr;

const zr = "--";

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
    Ge(t) {
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
    Xe(t) {
        let e;
        let i;
        const n = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (xt(e)) {
                if (i.startsWith(zr)) {
                    n.push([ i, e ]);
                    continue;
                }
                n.push([ s(i), e ]);
                continue;
            }
            n.push(...this.Ke(e));
        }
        return n;
    }
    Qe(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this.Ke(t[s]));
            return i;
        }
        return l;
    }
    Ke(t) {
        if (xt(t)) return this.Ge(t);
        if (t instanceof Array) return this.Qe(t);
        if (t instanceof Object) return this.Xe(t);
        return l;
    }
    G() {
        if (this.N) {
            this.N = false;
            const t = this.value;
            const e = this.styles;
            const i = this.Ke(t);
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
        if (null != e && bt(e.indexOf) && e.includes("!important")) {
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
        Gr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Gr);
    }
}

I(ValueAttributeObserver);

let Gr;

const Xr = "http://www.w3.org/1999/xlink";

const Kr = "http://www.w3.org/XML/1998/namespace";

const Qr = "http://www.w3.org/2000/xmlns/";

const Yr = Object.assign(ft(), {
    "xlink:actuate": [ "actuate", Xr ],
    "xlink:arcrole": [ "arcrole", Xr ],
    "xlink:href": [ "href", Xr ],
    "xlink:role": [ "role", Xr ],
    "xlink:show": [ "show", Xr ],
    "xlink:title": [ "title", Xr ],
    "xlink:type": [ "type", Xr ],
    "xml:lang": [ "lang", Kr ],
    "xml:space": [ "space", Kr ],
    xmlns: [ "xmlns", Qr ],
    "xmlns:xlink": [ "xlink", Qr ]
});

const Zr = new H;

Zr.type = 2 | 4;

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
        this.Ye = ft();
        this.Ze = ft();
        this.Je = ft();
        this.ti = ft();
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
        qt(W, NodeObserverLocator).register(t);
        Ut(W, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Ye;
        let n;
        if (xt(t)) {
            n = s[t] ?? (s[t] = ft());
            if (null == n[e]) n[e] = new NodeObserverConfig(i); else to(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = ft());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else to(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ze;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else to("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else to("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.ti || e in (this.Je[t.tagName] ?? C)) return this.getObserver(t, e, i);
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
            return qr;

          default:
            {
                const i = Yr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (pt(t, e, this.svgAnalyzer)) return qr;
                return Zr;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (xt(t)) {
            n = (i = this.Je)[t] ?? (i[t] = ft());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Je)[e] ?? (s[e] = ft());
            n[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.ti[e] = true;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const s = this.Ye[t.tagName]?.[e] ?? this.Ze[e];
        if (null != s) return new s.type(t, e, new EventSubscriber(s), i, this.locator);
        const n = Yr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (pt(t, e, this.svgAnalyzer)) return qr;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw dt(`AUR0652:${String(e)}`);
        } else return new z(t, e);
    }
}

NodeObserverLocator.inject = [ A, Ti, G, hr ];

function Jr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function to(t, e) {
    throw dt(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw dt(`AUR0802`);
        if (6 !== e.mode && 4 !== e.mode) throw dt(`AUR0803`);
        const s = this.oL.getObserver(e.target, e.targetProperty);
        if (!s.handler) throw dt(`AUR0804`);
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

oe("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.ei = false;
        this.ii = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.si(); else this.ei = true;
    }
    attached() {
        if (this.ei) {
            this.ei = false;
            this.si();
        }
        this.ii.addEventListener("focus", this);
        this.ii.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ii;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.ni) this.value = false;
    }
    si() {
        const t = this.ii;
        const e = this.ni;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get ni() {
        return this.ii === this.p.document.activeElement;
    }
}

Focus.inject = [ Us, Ti ];

tt([ Rt({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Me("focus")(Focus);

let eo = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.ri = false;
        this.Pe = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Pe = null;
            if (Boolean(this.value) !== this.oi) if (this.oi === this.li) {
                this.oi = !this.li;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.oi = this.li;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.oi = this.li = "hide" !== i.alias;
    }
    binding() {
        this.ri = true;
        this.update();
    }
    detaching() {
        this.ri = false;
        this.Pe?.cancel();
        this.Pe = null;
    }
    valueChanged() {
        if (this.ri && null === this.Pe) this.Pe = this.p.domWriteQueue.queueTask(this.update);
    }
};

tt([ Rt ], eo.prototype, "value", void 0);

eo = tt([ et(0, Us), et(1, Ti), et(2, Js) ], eo);

Vt("hide")(eo);

Me("show")(eo);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.hi = i.document.createElement("div");
        this.view = t.create();
        Ms(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.hi = this.ai();
        this.view.setHost(s);
        return this.ui(t, s, i);
    }
    detaching(t, e, i) {
        return this.fi(t, this.hi, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.hi;
        const i = this.hi = this.ai();
        if (e === i) return;
        this.view.setHost(i);
        const s = b(this.fi(null, i, t.flags), (() => this.ui(null, i, t.flags)));
        if (vt(s)) s.catch((t => {
            throw t;
        }));
    }
    ui(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return b(s?.call(n, e, r), (() => this.di(t, e, i)));
    }
    di(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return b(n.activate(t ?? n, s, i, s.scope), (() => this.mi(e)));
        return this.mi(e);
    }
    mi(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    fi(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return b(s?.call(n, e, r), (() => this.gi(t, e, i)));
    }
    gi(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return b(n.deactivate(t, s, i), (() => this.pi(e)));
        return this.pi(e);
    }
    pi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    ai() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw dt(`AUR0811`);
            return e.body;
        }
        if (xt(i)) {
            let n = e;
            if (xt(s)) s = e.querySelector(s);
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

Portal.inject = [ Gi, js, Ti ];

tt([ Rt({
    primary: true
}) ], Portal.prototype, "target", void 0);

tt([ Rt({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

tt([ Rt() ], Portal.prototype, "strict", void 0);

tt([ Rt() ], Portal.prototype, "deactivating", void 0);

tt([ Rt() ], Portal.prototype, "activating", void 0);

tt([ Rt() ], Portal.prototype, "deactivated", void 0);

tt([ Rt() ], Portal.prototype, "activated", void 0);

tt([ Rt() ], Portal.prototype, "callbackContext", void 0);

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
        this.vi = false;
        this.wi = 0;
        this.bi = t;
        this.l = e;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.wi++;
        const o = () => !this.vi && this.wi === r + 1;
        return b(this.pending, (() => {
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.bi.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == s) return;
            s.setLocation(this.l);
            this.pending = b(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.vi = true;
        return b(this.pending, (() => {
            this.vi = false;
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
        const r = this.wi++;
        const o = () => !this.vi && this.wi === r + 1;
        let l;
        return b(this.pending, (() => this.pending = b(s?.deactivate(s, n, i), (() => {
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.bi.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
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

If.inject = [ Gi, js ];

tt([ Rt ], If.prototype, "value", void 0);

tt([ Rt({
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
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw dt(`AUR0810`);
    }
}

Else.inject = [ Gi ];

Ve({
    name: "else"
})(Else);

function io(t) {
    t.dispose();
}

const so = [ 18, 17 ];

class Repeat {
    constructor(t, e, i) {
        this.views = [];
        this.key = void 0;
        this.xi = void 0;
        this.yi = false;
        this.ki = false;
        this.Ci = null;
        this.Ai = void 0;
        this.Ri = false;
        this.l = t;
        this.Si = e;
        this.f = i;
    }
    binding(t, e, i) {
        const s = this.Si.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Bi = r;
                let t = o.iterable;
                while (null != t && so.includes(t.$kind)) {
                    t = t.expression;
                    this.yi = true;
                }
                this.Ci = t;
                break;
            }
        }
        this.Ii();
        const h = o.declaration;
        if (!(this.Ri = 24 === h.$kind || 25 === h.$kind)) this.local = T(h, this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.Ti();
        return this.Di(t);
    }
    detaching(t, e, i) {
        this.Ii();
        return this.Ei(t);
    }
    itemsChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        this.Ii();
        this.Ti();
        const e = b(this.Ei(null), (() => this.Di(null)));
        if (vt(e)) e.catch(kt);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.yi) {
            if (this.ki) return;
            this.ki = true;
            this.items = T(this.forOf.iterable, i.scope, this.Bi, null);
            this.ki = false;
            return;
        }
        this.Ti();
        if (void 0 === e) {
            const t = b(this.Ei(null), (() => this.Di(null)));
            if (vt(t)) t.catch(kt);
        } else {
            const t = this.views.length;
            const i = X(e);
            if (i.deletedIndices.length > 0) {
                const e = b(this.Pi(i), (() => this.$i(t, i)));
                if (vt(e)) e.catch(kt);
            } else this.$i(t, i);
        }
    }
    Ii() {
        const t = this.$controller.scope;
        let e = this.Li;
        let i = this.yi;
        let s;
        if (i) {
            e = this.Li = T(this.Ci, t, this.Bi, null) ?? null;
            i = this.yi = !Object.is(this.items, e);
        }
        const n = this.xi;
        if (this.$controller.isActive) {
            s = this.xi = K(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.xi = void 0;
        }
    }
    Ti() {
        const t = this.items;
        if (wt(t)) {
            this.Ai = t;
            return;
        }
        const e = [];
        fo(t, ((t, i) => {
            e[i] = t;
        }));
        this.Ai = e;
    }
    Di(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: c} = this;
        const a = r.scope;
        const u = this.forOf;
        const f = uo(c);
        const d = this.views = Array(f);
        fo(c, ((c, m) => {
            s = d[m] = o.create().setLocation(h);
            s.nodes.unlink();
            if (this.Ri) $(u.declaration, n = U.fromParent(a, new Y), this.Bi, c); else n = U.fromParent(a, new Y(l, c));
            co(n.overrideContext, m, f);
            i = s.activate(t ?? s, r, 0, n);
            if (vt(i)) (e ?? (e = [])).push(i);
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
            if (vt(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Pi(t) {
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
        const {$controller: l, f: h, local: c, Ai: a, l: u, views: f} = this;
        const d = e.length;
        for (;d > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== d) throw ho(f.length, d);
        const m = l.scope;
        const g = e.length;
        Q(f, e);
        const p = lo(e);
        const v = p.length;
        let w;
        let b = v - 1;
        o = g - 1;
        for (;o >= 0; --o) {
            n = f[o];
            w = f[o + 1];
            n.nodes.link(w?.nodes ?? u);
            if (-2 === e[o]) {
                if (this.Ri) $(this.forOf.declaration, r = U.fromParent(m, new Y), this.Bi, a[o]); else r = U.fromParent(m, new Y(c, a[o]));
                co(r.overrideContext, o, g);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (vt(s)) (i ?? (i = [])).push(s);
            } else if (b < 0 || 1 === v || o !== p[b]) {
                co(n.scope.overrideContext, o, g);
                n.nodes.insertBefore(n.location);
            } else {
                if (t !== g) co(n.scope.overrideContext, o, g);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(io);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ js, ws, Gi ];

tt([ Rt ], Repeat.prototype, "items", void 0);

Ve("repeat")(Repeat);

let no = 16;

let ro = new Int32Array(no);

let oo = new Int32Array(no);

function lo(t) {
    const e = t.length;
    if (e > no) {
        no = e;
        ro = new Int32Array(e);
        oo = new Int32Array(e);
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
            o = ro[i];
            n = t[o];
            if (-2 !== n && n < s) {
                oo[r] = o;
                ro[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                c = l + h >> 1;
                n = t[ro[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[ro[l]];
            if (s < n || -2 === n) {
                if (l > 0) oo[r] = ro[l - 1];
                ro[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = ro[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = oo[s];
    }
    while (r-- > 0) ro[r] = 0;
    return a;
}

const ho = (t, e) => dt(`AUR0814:${t}!=${e}`);

const co = (t, e, i) => {
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

const ao = Object.prototype.toString;

const uo = t => {
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
        throw dt(`Cannot count ${ao.call(t)}`);
    }
};

const fo = (t, e) => {
    switch (ao.call(t)) {
      case "[object Array]":
        return mo(t, e);

      case "[object Map]":
        return go(t, e);

      case "[object Set]":
        return po(t, e);

      case "[object Number]":
        return vo(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw dt(`Cannot iterate over ${ao.call(t)}`);
    }
};

const mo = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const go = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const po = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const vo = (t, e) => {
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

With.inject = [ Gi, js ];

tt([ Rt ], With.prototype, "value", void 0);

Ve("with")(With);

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
        this.queue((() => this.Oi(t)));
    }
    Oi(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.Ui(null);
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
        return b(this.Ui(null, n), (() => {
            this.activeCases = n;
            return this.qi(null);
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
        return b(this.activeCases.length > 0 ? this.Ui(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.qi(t);
        }));
    }
    qi(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return w(...i.map((e => e.activate(t, 0, n))));
    }
    Ui(t, e = []) {
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

tt([ Rt ], wo.prototype, "value", void 0);

wo = tt([ Ve("switch"), et(0, Gi), et(1, js) ], wo);

let bo = 0;

let xo = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.ji = e;
        this.l = i;
        this.id = ++bo;
        this.fallThrough = false;
        this.view = void 0;
        this.Fi = s.config.level <= 1;
        this.Te = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof wo) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw dt(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Te.debug("isMatch()");
        const e = this.value;
        if (wt(e)) {
            if (void 0 === this.xi) this.xi = this._i(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (wt(t)) {
            this.xi?.unsubscribe(this);
            this.xi = this._i(t);
        } else if (void 0 !== this.xi) this.xi.unsubscribe(this);
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
        this.xi?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    _i(t) {
        const e = this.ji.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

xo.inject = [ Gi, j, js, k ];

tt([ Rt ], xo.prototype, "value", void 0);

tt([ Rt({
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
}) ], xo.prototype, "fallThrough", void 0);

xo = tt([ Ve("case") ], xo);

let yo = class DefaultCase extends xo {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw dt(`AUR0816`);
        t.defaultCase = this;
    }
};

yo = tt([ Ve("default-case") ], yo);

let ko = class PromiseTemplateController {
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

tt([ Rt ], ko.prototype, "value", void 0);

ko = tt([ Ve("promise"), et(0, Gi), et(1, js), et(2, Ti), et(3, k) ], ko);

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

tt([ Rt({
    mode: 2
}) ], Co.prototype, "value", void 0);

Co = tt([ Ve("pending"), et(0, Gi), et(1, js) ], Co);

let Ao = class FulfilledTemplateController {
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

tt([ Rt({
    mode: 4
}) ], Ao.prototype, "value", void 0);

Ao = tt([ Ve("then"), et(0, Gi), et(1, js) ], Ao);

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

tt([ Rt({
    mode: 4
}) ], Ro.prototype, "value", void 0);

Ro = tt([ Ve("catch"), et(0, Gi), et(1, js) ], Ro);

function So(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof ko) return i;
    throw dt(`AUR0813`);
}

let Bo = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Bo = tt([ Kt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Bo);

let Io = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Io = tt([ Kt({
    pattern: "then",
    symbols: ""
}) ], Io);

let To = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

To = tt([ Kt({
    pattern: "catch",
    symbols: ""
}) ], To);

function Do(t, e, i, s) {
    if (xt(e)) return Eo(t, e, i, s);
    if (wi(e)) return Po(t, e, i, s);
    throw dt(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Mi = i;
        this.Vi = void 0;
    }
    get definition() {
        if (void 0 === this.Vi) this.Vi = CustomElementDefinition.create({
            name: gi(),
            template: this.node,
            needsCompile: xt(this.node),
            instructions: this.instructions,
            dependencies: this.Mi
        });
        return this.Vi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(es).getViewFactory(this.definition, t.createChild().register(...this.Mi));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Mi);
    }
}

function Eo(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (tn(e)) {
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

function Po(t, e, i, s) {
    const n = yi(e);
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
        if (tn(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
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

function Lo(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Ni = e;
        this.Hi = i;
        this.r = s;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Wi = void 0;
        this.zi = e.props.reduce(Lo, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Wi !== s) {
            this.Wi = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.gi(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Wi === t) return;
        this.Wi = t;
        this.composing = true;
        i |= s.flags;
        const n = b(this.gi(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (vt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return b(void 0 === t ? b(e, (t => this.Gi(t, s))) : t, (t => this.di(this.view = t, i, s)));
    }
    gi(t, e, i) {
        return t?.deactivate(e ?? t, this.$controller, i);
    }
    di(t, e, i) {
        const {$controller: s} = this;
        return b(t?.activate(e ?? t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    Gi(t, e) {
        const i = this.Xi(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Xi(t, e) {
        if (null == t) return;
        const i = this.Hi.controller.container;
        if ("object" === typeof t) {
            if (Oo(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (xt(t)) {
            const e = i.find(Ai, t);
            if (null == e) throw dt(`AUR0809:${t}`);
            t = e.Type;
        }
        return Do(this.p, t, this.zi, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ Ti, Js, bs, es ];

tt([ Rt ], AuRender.prototype, "component", void 0);

tt([ Rt({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

ei({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function Oo(t) {
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
        this.Ki = void 0;
        this.r = t.get(es);
        this.Ni = r;
        this.Qi = o;
    }
    static get inject() {
        return [ g, ws, Us, js, Ti, Js, R(CompositionContextFactory) ];
    }
    get pending() {
        return this.Yi;
    }
    get composition() {
        return this.Ki;
    }
    attaching(t, e, i) {
        return this.Yi = b(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Qi.isCurrent(t)) this.Yi = void 0;
        }));
    }
    detaching(t) {
        const e = this.Ki;
        const i = this.Yi;
        this.Qi.invalidate();
        this.Ki = this.Yi = void 0;
        return b(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Ki) {
            this.Ki.update(this.model);
            return;
        }
        this.Yi = b(this.Yi, (() => b(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Qi.isCurrent(t)) this.Yi = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Qi;
        const s = this.Ki;
        return b(i.create(t), (t => {
            if (i.isCurrent(t)) return b(this.compose(t), (n => {
                if (i.isCurrent(t)) return b(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Ki = n;
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
                    projections: this.Ni.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, c, 1, c.scope.parent)), (t => b(n.deactivate(t ?? n, c, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Ai.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, c);
                const l = "auto" === this.scopeBehavior ? U.fromParent(this.parent.scope, e) : U.create(e);
                if (Ns(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, c, 1, l)), (t => o.deactivate(t ?? o, c, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return b(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = Ns(i);
        Mt(t, s.Element, Mt(t, Us, new v("ElementResolver", n ? null : i)));
        Mt(t, js, new v("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        Mt(t, e, new v("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = bt(t) ? t : t?.constructor;
        return Ai.isType(e) ? Ai.getDefinition(e) : null;
    }
}

tt([ Rt ], AuCompose.prototype, "view", void 0);

tt([ Rt ], AuCompose.prototype, "viewModel", void 0);

tt([ Rt ], AuCompose.prototype, "model", void 0);

tt([ Rt({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw dt(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

ei("au-compose")(AuCompose);

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
        this.Zi = null;
        this.Ji = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.ts = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.ts = true;
        }
        this.Hi = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ js, Js, bs, es ];
    }
    binding(t, e, i) {
        this.Zi = this.$controller.scope.parent;
        let s;
        if (this.ts) {
            s = this.Hi.controller.scope.parent;
            (this.Ji = U.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.Zi.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.ts ? this.Ji : this.Zi);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.ts && null != this.Ji) this.Ji.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

tt([ Rt ], AuSlot.prototype, "expose", void 0);

ei({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Uo = Ot("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw dt('"sanitize" method not implemented');
    }
})));

let qo = class SanitizeValueConverter {
    constructor(t) {
        this.es = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.es.sanitize(t);
    }
};

qo = tt([ et(0, Uo) ], qo);

ue("sanitize")(qo);

let jo = class ViewValueConverter {
    constructor(t) {
        this.ss = t;
    }
    toView(t, e) {
        return this.ss.getViewComponentForObject(t, e);
    }
};

jo = tt([ et(0, ts) ], jo);

ue("view")(jo);

const Fo = DebounceBindingBehavior;

const _o = OneTimeBindingBehavior;

const Mo = ToViewBindingBehavior;

const Vo = FromViewBindingBehavior;

const No = SignalBindingBehavior;

const Ho = ThrottleBindingBehavior;

const Wo = TwoWayBindingBehavior;

const zo = TemplateCompiler;

const Go = NodeObserverLocator;

const Xo = [ zo, Go ];

const Ko = SVGAnalyzer;

const Qo = se;

const Yo = ie;

const Zo = ee;

const Jo = te;

const tl = ne;

const el = [ Zo, Jo, tl ];

const il = [ Qo, Yo ];

const sl = Zn;

const nl = Yn;

const rl = Jn;

const ol = Kn;

const ll = Gn;

const hl = Xn;

const cl = Qn;

const al = or;

const ul = tr;

const fl = er;

const dl = ir;

const ml = sr;

const gl = rr;

const pl = nr;

const vl = lr;

const wl = [ nl, ll, ol, hl, cl, sl, rl, al, ul, fl, dl, gl, pl, ml, vl ];

const bl = qo;

const xl = jo;

const yl = If;

const kl = Else;

const Cl = Repeat;

const Al = With;

const Rl = wo;

const Sl = xo;

const Bl = yo;

const Il = ko;

const Tl = Co;

const Dl = Ao;

const El = Ro;

const Pl = Bo;

const $l = Io;

const Ll = To;

const Ol = AttrBindingBehavior;

const Ul = SelfBindingBehavior;

const ql = UpdateTriggerBindingBehavior;

const jl = AuRender;

const Fl = AuCompose;

const _l = Portal;

const Ml = Focus;

const Vl = eo;

const Nl = [ Fo, _o, Mo, Vo, No, Ho, Wo, bl, xl, yl, kl, Cl, Al, Rl, Sl, Bl, Il, Tl, Dl, El, Pl, $l, Ll, Ol, Ul, ql, jl, Fl, _l, Ml, Vl, AuSlot ];

const Hl = mn;

const Wl = un;

const zl = an;

const Gl = pn;

const Xl = wn;

const Kl = dn;

const Ql = vn;

const Yl = gn;

const Zl = cn;

const Jl = fn;

const th = Cn;

const eh = In;

const ih = An;

const sh = Rn;

const nh = Sn;

const rh = Bn;

const oh = kn;

const lh = Tn;

const hh = [ Ql, Xl, Hl, Yl, Gl, Zl, zl, Wl, Jl, Kl, th, eh, ih, sh, nh, rh, oh, lh ];

const ch = ah(n);

function ah(t) {
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
            return e.register(jt(q, i.coercingOptions), ...Xo, ...Nl, ...el, ...wl, ...hh);
        },
        customize(e) {
            return ah(e ?? t);
        }
    };
}

const uh = Ot("IAurelia");

class Aurelia {
    constructor(t = r.createContainer()) {
        this.container = t;
        this.ir = false;
        this.rs = false;
        this.os = false;
        this.ls = void 0;
        this.next = void 0;
        this.cs = void 0;
        this.us = void 0;
        if (t.has(uh, true)) throw dt(`AUR0768`);
        Mt(t, uh, new v("IAurelia", this));
        Mt(t, $s, this.ds = new v("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.rs;
    }
    get isStopping() {
        return this.os;
    }
    get root() {
        if (null == this.ls) {
            if (null == this.next) throw dt(`AUR0767`);
            return this.next;
        }
        return this.ls;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.gs(t.host), this.container, this.ds);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.gs(s);
        const r = t.component;
        let o;
        if (bt(r)) {
            Mt(i, n.HTMLElement, Mt(i, n.Element, Mt(i, Us, new v("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        Mt(i, qs, new v("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: gi(),
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
    gs(t) {
        let e;
        if (!this.container.has(Ti, false)) {
            if (null === t.ownerDocument.defaultView) throw dt(`AUR0769`);
            e = new J(t.ownerDocument.defaultView);
            this.container.register(jt(Ti, e));
        } else e = this.container.get(Ti);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw dt(`AUR0770`);
        if (vt(this.cs)) return this.cs;
        return this.cs = b(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ds.prepare(this.ls = t);
            this.rs = true;
            return b(t.activate(), (() => {
                this.ir = true;
                this.rs = false;
                this.cs = void 0;
                this.ps(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (vt(this.us)) return this.us;
        if (true === this.ir) {
            const e = this.ls;
            this.ir = false;
            this.os = true;
            return this.us = b(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.ls = void 0;
                this.ds.dispose();
                this.os = false;
                this.ps(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.os) throw dt(`AUR0771`);
        this.container.dispose();
    }
    ps(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var fh;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(fh || (fh = {}));

var dh;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(dh || (dh = {}));

const mh = Ot("IDialogService");

const gh = Ot("IDialogController");

const ph = Ot("IDialogDomRenderer");

const vh = Ot("IDialogDom");

const wh = Ot("IDialogGlobalSettings");

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

var bh;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(bh || (bh = {}));

class DialogController {
    constructor(t, e) {
        this.p = t;
        this.ctn = e;
        this.closed = new Promise(((t, e) => {
            this.qt = t;
            this.Et = e;
        }));
    }
    static get inject() {
        return [ Ti, g ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(ph);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(qs, true) ? e.get(qs) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(jt(qs, o));
        e.register(jt(Us, c), jt(vh, l));
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
            return b(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Ai.generateName(),
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
        if (this.vs) return this.vs;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(b(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.vs = void 0;
                    if (l) throw xh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return b(r.deactivate?.(h), (() => b(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.qt(h); else this.Et(xh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.vs = void 0;
            throw t;
        }));
        this.vs = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = yh(t);
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(Us, new v("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = bt(t) ? t : t?.constructor;
        return Ai.isType(e) ? Ai.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function xh(t, e) {
    const i = dt(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function yh(t) {
    const e = dt("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.dt = t;
        this.p = e;
        this.ws = i;
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
        return [ g, Ti, wh ];
    }
    static register(t) {
        t.register(Ut(mh, this), Te.deactivating(mh, (t => b(t.closeAll(), (t => {
            if (t.length > 0) throw dt(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Ch(new Promise((e => {
            const i = DialogSettings.from(this.ws, t);
            const s = i.container ?? this.dt.createChild();
            e(b(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(jt(gh, e));
                s.register(Ft(DialogController, (() => {
                    throw dt(`AUR0902`);
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
        return Object.assign(new DialogSettings, ...t).xs().bs();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const s = w(null == e ? void 0 : b(e(), (e => {
            t.component = e;
        })), bt(i) ? b(i(), (e => {
            t.template = e;
        })) : void 0);
        return vt(s) ? s.then((() => t)) : t;
    }
    xs() {
        if (null == this.component && null == this.template) throw dt(`AUR0903`);
        return this;
    }
    bs() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function kh(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function Ch(t) {
    t.whenClosed = kh;
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
        Ut(wh, this).register(t);
    }
}

const Rh = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Rh} display:flex;`;
        this.overlayCss = Rh;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        Ut(ph, this).register(t);
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

DefaultDialogDomRenderer.inject = [ Ti ];

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

function Sh(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, Te.creating((() => t(i.get(wh))))),
        customize(t, i) {
            return Sh(t, i ?? e);
        }
    };
}

const Bh = Sh((() => {
    throw dt(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(Ut(wh, this));
    }
} ]);

const Ih = Sh(n, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Th = Ot((t => t.singleton(WcCustomElementRegistry)));

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
            s = Ai.isType(e) ? Ai.getDefinition(e) : CustomElementDefinition.create(Ai.generateName(), e);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (s.containerless) throw dt("Containerless custom element is not supported. Consider using buitl-in extends instead");
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
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(Us, new v("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                Os(this, e.key, n);
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

WcCustomElementRegistry.inject = [ g, Ti, es ];

export { AdoptedStyleSheetsStyles, AppRoot, Te as AppTask, se as AtPrefixedTriggerAttributePattern, Qo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, Ol as AttrBindingBehaviorRegistration, sr as AttrBindingCommand, ml as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, eh as AttributeBindingRendererRegistration, AttributeNSAccessor, Jt as AttributePattern, AuCompose, AuRender, jl as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, It as Bindable, BindableDefinition, BindableObserver, BindablesInfo, ae as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorFactory, re as BindingBehaviorStrategy, zn as BindingCommand, BindingCommandDefinition, BindingInterceptor, fh as BindingMode, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, Zn as CallBindingCommand, sl as CallBindingCommandRegistration, CallBindingInstruction, Hl as CallBindingRendererRegistration, ir as CaptureBindingCommand, dl as CaptureBindingCommandRegistration, xo as Case, CheckedObserver, Le as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, rr as ClassBindingCommand, gl as ClassBindingCommandRegistration, ie as ColonPrefixedBindAttributePattern, Yo as ColonPrefixedBindAttributePatternRegistration, Mn as CommandType, ComputedWatcher, Controller, Qe as CustomAttribute, CustomAttributeDefinition, Wl as CustomAttributeRendererRegistration, Ai as CustomElement, CustomElementDefinition, zl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Fo as DebounceBindingBehaviorRegistration, Yn as DefaultBindingCommand, nl as DefaultBindingCommandRegistration, wl as DefaultBindingLanguage, el as DefaultBindingSyntax, yo as DefaultCase, Xo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, hh as DefaultRenderers, Nl as DefaultResources, dh as DefinitionType, er as DelegateBindingCommand, fl as DelegateBindingCommandRegistration, en as DelegationStrategy, DialogCloseResult, Bh as DialogConfiguration, DialogController, bh as DialogDeactivationStatuses, Ih as DialogDefaultConfiguration, DialogOpenResult, DialogService, te as DotSeparatedAttributePattern, Jo as DotSeparatedAttributePatternRegistration, Else, kl as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, FlushQueue, Focus, Jn as ForBindingCommand, rl as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Vo as FromViewBindingBehaviorRegistration, Kn as FromViewBindingCommand, ol as FromViewBindingCommandRegistration, Ao as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, $s as IAppRoot, Ie as IAppTask, ar as IAttrMapper, Xt as IAttributeParser, Gt as IAttributePattern, Ys as IAuSlotsInfo, uh as IAurelia, ws as IController, gh as IDialogController, vh as IDialogDom, ph as IDialogDomRenderer, wh as IDialogGlobalSettings, mh as IDialogService, Ks as IEventDelegator, qs as IEventTarget, ve as IFlushQueue, zs as IHistory, bs as IHydrationContext, Js as IInstruction, Vi as ILifecycleHooks, Ws as ILocation, Us as INode, Go as INodeObserverLocatorRegistration, Ti as IPlatform, Qs as IProjections, js as IRenderLocation, nn as IRenderer, es as IRendering, hr as ISVGAnalyzer, Uo as ISanitizer, Ui as IShadowDOMGlobalStyles, Oi as IShadowDOMStyles, Ht as ISyntaxInterpreter, sn as ITemplateCompiler, Br as ITemplateCompilerHooks, zo as ITemplateCompilerRegistration, dr as ITemplateElementFactory, Gi as IViewFactory, ts as IViewLocator, Th as IWcElementRegistry, Hs as IWindow, If, yl as IfRegistration, Zs as InstructionType, InterpolationBinding, Gl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Xl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Kl as LetElementRendererRegistration, is as LifecycleFlags, Wi as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, th as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, _o as OneTimeBindingBehaviorRegistration, Gn as OneTimeBindingCommand, ll as OneTimeBindingCommandRegistration, Co as PendingTemplateController, Portal, ko as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Ql as PropertyBindingRendererRegistration, ee as RefAttributePattern, Zo as RefAttributePatternRegistration, RefBinding, al as RefBindingCommandRegistration, RefBindingInstruction, Yl as RefBindingRendererRegistration, Ro as RejectedTemplateController, RenderPlan, Rendering, Repeat, Cl as RepeatRegistration, SVGAnalyzer, Ko as SVGAnalyzerRegistration, qo as SanitizeValueConverter, bl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Ul as SelfBindingBehaviorRegistration, SetAttributeInstruction, ih as SetAttributeRendererRegistration, SetClassAttributeInstruction, sh as SetClassAttributeRendererRegistration, SetPropertyInstruction, Zl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, nh as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, il as ShortHandBindingSyntax, SignalBindingBehavior, No as SignalBindingBehaviorRegistration, ch as StandardConfiguration, ps as State, StyleAttributeAccessor, nr as StyleBindingCommand, pl as StyleBindingCommandRegistration, qi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, rh as StylePropertyBindingRendererRegistration, wo as Switch, TemplateCompiler, Dr as TemplateCompilerHooks, Jl as TemplateControllerRendererRegistration, TextBindingInstruction, oh as TextBindingRendererRegistration, ThrottleBindingBehavior, Ho as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, Mo as ToViewBindingBehaviorRegistration, Xn as ToViewBindingCommand, hl as ToViewBindingCommandRegistration, tr as TriggerBindingCommand, ul as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Wo as TwoWayBindingBehaviorRegistration, Qn as TwoWayBindingCommand, cl as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, ql as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, me as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, gs as ViewModelKind, jo as ViewValueConverter, xl as ViewValueConverterRegistration, Zi as Views, ti as Watch, WcCustomElementRegistry, With, Al as WithRegistration, Vt as alias, Lt as allResources, yn as applyBindingBehavior, ge as astEvaluator, Kt as attributePattern, Rt as bindable, oe as bindingBehavior, Vn as bindingCommand, Ii as capture, Ee as children, Tt as coercer, si as containerless, Vs as convertToRenderLocation, Do as createElement, Pi as cssModules, Me as customAttribute, ei as customElement, _s as getEffectiveParentNode, Ls as getRef, fs as isCustomElementController, ds as isCustomElementViewModel, tn as isInstruction, Ns as isRenderLocation, zi as lifecycleHooks, Si as processContent, Nt as registerAliases, rn as renderer, Ms as setEffectiveParentNode, Os as setRef, $i as shadowCSS, ri as strict, Er as templateCompilerHooks, Ve as templateController, ii as useShadowDOM, ue as valueConverter, Ji as view, Ye as watch };
//# sourceMappingURL=index.mjs.map
