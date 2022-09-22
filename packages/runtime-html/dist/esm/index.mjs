import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, Registration as r, DI as o, emptyArray as l, all as h, mergeArrays as c, fromAnnotationOrDefinitionOrTypeOrDefault as a, fromDefinitionOrDefault as u, pascalCase as f, fromAnnotationOrTypeOrDefault as d, IPlatform as m, IContainer as g, optional as p, InstanceProvider as v, resolveAll as w, onResolve as b, camelCase as x, toArray as y, ILogger as k, emptyObject as C, IServiceLocator as A, transient as R } from "@aurelia/kernel";

import { Metadata as S, isObject as B } from "@aurelia/metadata";

import { subscriberCollection as E, connectable as I, ConnectableSwitcher as T, ProxyObservable as D, Scope as P, ICoercionConfiguration as $, IObserverLocator as L, IExpressionParser as O, AccessScopeExpression as U, BindingBehaviorExpression as q, PrimitiveLiteralExpression as j, ISignaler as F, PropertyAccessor as _, INodeObserverLocator as M, SetterObserver as V, IDirtyChecker as N, applyMutationsToIndices as H, getCollectionObserver as W, synchronizeIndices as z, BindingContext as G } from "@aurelia/runtime";

import { TaskAbortError as X } from "@aurelia/platform";

import { BrowserPlatform as K } from "@aurelia/platform-browser";

function Q(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function Y(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

const Z = S.getOwn;

const J = S.hasOwn;

const tt = S.define;

const {annotation: et, resource: it} = t;

const st = et.keyFor;

const nt = it.keyFor;

const rt = it.appendTo;

const ot = et.appendTo;

const lt = et.getKeys;

const ht = () => Object.create(null);

const ct = Object.prototype.hasOwnProperty;

const at = ht();

const ut = (t, e, i) => {
    if (true === at[e]) return true;
    if (!gt(e)) return false;
    const s = e.slice(0, 5);
    return at[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const ft = t => t instanceof Promise;

const dt = t => t instanceof Array;

const mt = t => "function" === typeof t;

const gt = t => "string" === typeof t;

const pt = Object.defineProperty;

const vt = t => {
    throw t;
};

const wt = Reflect.defineProperty;

const bt = (t, e, i) => {
    wt(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function xt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        tt(kt, BindableDefinition.create(e, t, i), t.constructor, e);
        ot(t.constructor, Ct.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (gt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function yt(t) {
    return t.startsWith(kt);
}

const kt = st("bindable");

const Ct = Object.freeze({
    name: kt,
    keyFrom: t => `${kt}:${t}`,
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
                if (gt(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!J(kt, t, n)) ot(t, Ct.keyFrom(n));
                tt(kt, e, t, n);
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
        const i = kt.length + 1;
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
            l = lt(c).filter(yt);
            h = l.length;
            for (a = 0; a < h; ++a) s[o++] = Z(kt, c, l[a].slice(i));
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
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, St(t, e, n)));
    }
}

function At(t, e, i) {
    Rt.define(t, e);
}

const Rt = {
    key: st("coercer"),
    define(t, e) {
        tt(Rt.key, t[e].bind(t), t);
    },
    for(t) {
        return Z(Rt.key, t);
    }
};

function St(t, e, i = {}) {
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
            r = "function" === typeof t ? t.bind(s) : Rt.for(s) ?? n;
            break;
        }
    }
    return r === n ? r : Bt(r, i.nullable);
}

function Bt(t, e) {
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
        const c = this.i = mt(l);
        const a = this.u = mt(h);
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

const Et = function(t) {
    function e(t, i, s) {
        o.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.get(t);
        return i.has(t, false) ? i.get(t) : i.root.get(t);
    };
    return e;
};

const It = function(t) {
    function e(t, i, s) {
        o.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.getAll(t, false);
        return i.has(t, false) ? i.getAll(t, false).concat(i.root.getAll(t, false)) : i.root.getAll(t, false);
    };
    return e;
};

const Tt = r.singleton;

const Dt = r.aliasTo;

const Pt = r.instance;

const $t = r.callback;

const Lt = r.transient;

function Ot(...t) {
    return function(e) {
        const i = st("aliases");
        const s = Z(i, e);
        if (void 0 === s) tt(i, t, e); else s.push(...t);
    };
}

function Ut(t, e, i, s) {
    for (let n = 0, o = t.length; n < o; ++n) r.aliasTo(i, e.keyFrom(t[n])).register(s);
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

const qt = o.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        s = s.filter(jt);
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

function jt(t) {
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

const _t = o.createInterface("IAttributePattern");

const Mt = o.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.q = {};
        this.j = t;
        const i = this.F = {};
        const s = e.reduce(((t, e) => {
            const s = Wt(e.constructor);
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

AttributeParser.inject = [ qt, h(_t) ];

function Vt(...t) {
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
        Tt(_t, this.Type).register(t);
    }
}

const Nt = nt("attribute-pattern");

const Ht = "attribute-pattern-definitions";

const Wt = e => t.annotation.get(e, Ht);

const zt = Object.freeze({
    name: Nt,
    definitionAnnotationKey: Ht,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        tt(Nt, s, i);
        rt(i, Nt);
        t.annotation.set(i, Ht, e);
        ot(i, Ht);
        return i;
    },
    getPatternDefinitions: Wt
});

let Gt = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

Gt = Q([ Vt({
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

Xt = Q([ Vt({
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

Kt = Q([ Vt({
    pattern: ":PART",
    symbols: ":"
}) ], Kt);

let Qt = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

Qt = Q([ Vt({
    pattern: "@PART",
    symbols: "@"
}) ], Qt);

let Yt = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

Yt = Q([ Vt({
    pattern: "...$attrs",
    symbols: ""
}) ], Yt);

var Zt;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(Zt || (Zt = {}));

function Jt(t) {
    return function(e) {
        return se.define(t, e);
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
        if (gt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        const r = Object.getPrototypeOf(e) === BindingInterceptor;
        return new BindingBehaviorDefinition(e, i(ie(e, "name"), s), c(ie(e, "aliases"), n.aliases, e.aliases), se.keyFrom(s), a("strategy", n, e, (() => r ? 2 : 1)));
    }
    register(t) {
        const {Type: e, key: i, aliases: s, strategy: n} = this;
        switch (n) {
          case 1:
            r.singleton(i, e).register(t);
            break;

          case 2:
            r.instance(i, new BindingBehaviorFactory(t, e)).register(t);
            break;
        }
        r.aliasTo(i, e).register(t);
        Ut(s, se, i, t);
    }
}

class BindingBehaviorFactory {
    constructor(t, e) {
        this.ctn = t;
        this.Type = e;
        this.deps = o.getDependencies(e);
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

const te = [ "isBound", "$scope", "obs", "ast", "locator", "oL", "boundFn" ];

te.forEach((t => {
    wt(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const ee = nt("binding-behavior");

const ie = (t, e) => Z(st(e), t);

const se = Object.freeze({
    name: ee,
    keyFrom(t) {
        return `${ee}:${t}`;
    },
    isType(t) {
        return mt(t) && J(ee, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        tt(ee, i, i.Type);
        tt(ee, i, i);
        rt(e, ee);
        return i.Type;
    },
    getDefinition(t) {
        const e = Z(ee, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        tt(st(e), i, t);
    },
    getAnnotation: ie
});

function ne(t) {
    return function(e) {
        return le.define(t, e);
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
        if (gt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, i(oe(e, "name"), s), c(oe(e, "aliases"), n.aliases, e.aliases), le.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        r.singleton(i, e).register(t);
        r.aliasTo(i, e).register(t);
        Ut(s, le, i, t);
    }
}

const re = nt("value-converter");

const oe = (t, e) => Z(st(e), t);

const le = Object.freeze({
    name: re,
    keyFrom: t => `${re}:${t}`,
    isType(t) {
        return mt(t) && J(re, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        tt(re, i, i.Type);
        tt(re, i, i);
        rt(e, re);
        return i.Type;
    },
    getDefinition(t) {
        const e = Z(re, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        tt(st(e), i, t);
    },
    getAnnotation: oe
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
        if (t !== i.ast.evaluate(i.$scope, i, null)) {
            this.v = t;
            this._.add(this);
        }
    }
}

function he(t, e = true) {
    return i => {
        const s = i.prototype;
        if (null != t) wt(s, "strict", {
            enumerable: true,
            get: function() {
                return t;
            }
        });
        wt(s, "strictFnCall", {
            enumerable: true,
            get: function() {
                return e;
            }
        });
        bt(s, "get", (function(t) {
            return this.locator.get(t);
        }));
        bt(s, "getConverter", (function(t) {
            const e = le.keyFrom(t);
            let i = ce.get(this);
            if (null == i) ce.set(this, i = new ResourceLookup);
            return i[e] ?? (i[e] = this.locator.get(Et(e)));
        }));
        bt(s, "getBehavior", (function(t) {
            const e = se.keyFrom(t);
            let i = ce.get(this);
            if (null == i) ce.set(this, i = new ResourceLookup);
            return i[e] ?? (i[e] = this.locator.get(Et(e)));
        }));
    };
}

const ce = new WeakMap;

class ResourceLookup {}

const ae = o.createInterface("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.V.forEach(ue);
        } finally {
            this.M = false;
        }
    }
    clear() {
        this.V.clear();
        this.M = false;
    }
}

function ue(t, e, i) {
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

he(true)(CallBinding);

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
                    if (gt(e) && e.includes("!important")) {
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
            fe(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) de(this.o, this);
    }
    X() {
        pe = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, pe);
    }
}

E(AttributeObserver);

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

const ve = {
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
        this.ast.assign(this.$scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.mode;
        const e = this.interceptor;
        const i = this.ast;
        const s = this.$scope;
        const n = this.targetObserver;
        const r = 1 !== this.K.state && (4 & n.type) > 0;
        let o = false;
        let l;
        o = 0 === (1 & t);
        if (o) this.obs.version++;
        const h = i.evaluate(s, this, e);
        if (o) this.obs.clear();
        if (h !== this.value) {
            this.value = h;
            if (r) {
                l = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    e.updateTarget(h);
                }), ve);
                l?.cancel();
            } else e.updateTarget(h);
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
        let e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        let i = this.targetObserver;
        if (!i) i = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        e = this.ast;
        const s = this.mode;
        const n = this.interceptor;
        let r = false;
        if (s & (2 | 1)) {
            r = (2 & s) > 0;
            n.updateTarget(this.value = e.evaluate(t, this, r ? n : null));
        }
        if (4 & s) i.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n, this.locator.get(ae))));
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

I(AttributeBinding);

he(true)(AttributeBinding);

const we = {
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
        if (1 === i) s = e[0] + t[0].value + e[1]; else {
            s = e[0];
            for (;i > n; ++n) s += t[n].value + e[n + 1];
        }
        const r = this.targetObserver;
        const o = 1 !== this.K.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(s, this.target, this.targetProperty);
            }), we);
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

he(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, i, s, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = i;
        this.locator = s;
        this.owner = r;
        this.interceptor = this;
        this.mode = 2;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.boundFn = false;
        this.oL = n;
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.ast;
        const e = this.obs;
        let i = false;
        i = (2 & this.mode) > 0;
        if (i) e.version++;
        const s = t.evaluate(this.$scope, this, i ? this.interceptor : null);
        if (i) e.clear();
        if (s != this.value) {
            this.value = s;
            if (s instanceof Array) this.observeCollection(s);
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
        if (this.ast.hasBind) this.ast.bind(t, this.interceptor);
        this.value = this.ast.evaluate(t, this, (2 & this.mode) > 0 ? this.interceptor : null);
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

I(InterpolationPartBinding);

he(true)(InterpolationPartBinding);

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
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.boundFn = false;
        this.K = t;
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
    handleChange() {
        if (!this.isBound) return;
        const t = (2 & this.mode) > 0;
        if (t) this.obs.version++;
        const e = this.ast.evaluate(this.$scope, this, t ? this.interceptor : null);
        if (t) this.obs.clear();
        if (e === this.value) {
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
        const t = this.value = this.ast.evaluate(this.$scope, this, (2 & this.mode) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (dt(t)) this.observeCollection(t);
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
        if (this.ast.hasBind) this.ast.bind(t, this.interceptor);
        const e = this.value = this.ast.evaluate(t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (dt(e)) this.observeCollection(e);
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
        }), we);
        e?.cancel();
    }
}

I()(ContentBinding);

he(void 0, false)(ContentBinding);

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
        const s = this.ast.evaluate(this.$scope, this, this.interceptor);
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
        if (this.ast.hasBind) this.ast.bind(t, this.interceptor);
        this.target[this.targetProperty] = this.ast.evaluate(t, this, this.interceptor);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

I(LetBinding);

he(true)(LetBinding);

const be = {
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
        this.ast.assign(this.$scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.K.state && (4 & this.targetObserver.type) > 0;
        const e = this.obs;
        let i = false;
        i = this.mode > 1;
        if (i) e.version++;
        const s = this.ast.evaluate(this.$scope, this, this.interceptor);
        if (i) e.clear();
        if (t) {
            xe = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(s);
                this.task = null;
            }), be);
            xe?.cancel();
            xe = null;
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
        let e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        const i = this.oL;
        const s = this.mode;
        let n = this.targetObserver;
        if (!n) {
            if (4 & s) n = i.getObserver(this.target, this.targetProperty); else n = i.getAccessor(this.target, this.targetProperty);
            this.targetObserver = n;
        }
        e = this.ast;
        const r = this.interceptor;
        const o = (2 & s) > 0;
        if (s & (2 | 1)) r.updateTarget(e.evaluate(t, this, o ? r : null));
        if (4 & s) {
            n.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r, this.locator.get(ae))));
            if (!o) r.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        xe = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != xe) {
            xe.cancel();
            xe = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

I(PropertyBinding);

he(true, false)(PropertyBinding);

let xe = null;

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

const ye = o.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(Pt(ye, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const ke = Object.freeze({
    creating: Ce("creating"),
    hydrating: Ce("hydrating"),
    hydrated: Ce("hydrated"),
    activating: Ce("activating"),
    activated: Ce("activated"),
    deactivating: Ce("deactivating"),
    deactivated: Ce("deactivated")
});

function Ce(t) {
    function e(e, i) {
        if (mt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ae(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        tt(Se, ChildrenDefinition.create(e, i), t.constructor, e);
        ot(t.constructor, Be.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (gt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Re(t) {
    return t.startsWith(Se);
}

const Se = st("children-observer");

const Be = Object.freeze({
    name: Se,
    keyFrom: t => `${Se}:${t}`,
    from(...t) {
        const e = {};
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function s(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function n(t) {
            if (dt(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => s(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(t) {
        const i = Se.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        while (--r >= 0) {
            c = n[r];
            l = lt(c).filter(Re);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = Z(Se, c, l[t].slice(i));
        }
        return s;
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
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? Ee, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = Ie, r = Te, o = De, l) {
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
        return $e(this.controller, this.query, this.filter, this.map);
    }
}

E()(ChildrenObserver);

function Ie(t) {
    return t.host.childNodes;
}

function Te(t, e, i) {
    return !!i;
}

function De(t, e, i) {
    return i;
}

const Pe = {
    optional: true
};

function $e(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = fi(l, Pe);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

function Le(t) {
    return function(e) {
        return Me(t, e);
    };
}

function Oe(t) {
    return function(e) {
        return Me(gt(t) ? {
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
        if (gt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(e, i(je(e, "name"), s), c(je(e, "aliases"), n.aliases, e.aliases), qe(s), i(je(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(je(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Ct.from(e, ...Ct.getAll(e), je(e, "bindables"), e.bindables, n.bindables), i(je(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), c(Ge.getAnnotation(e), e.watches), c(je(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Lt(i, e).register(t);
        Dt(i, e).register(t);
        Ut(s, Ne, i, t);
    }
}

const Ue = nt("custom-attribute");

const qe = t => `${Ue}:${t}`;

const je = (t, e) => Z(st(e), t);

const Fe = t => mt(t) && J(Ue, t);

const _e = (t, e) => Bs(t, qe(e)) ?? void 0;

const Me = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    tt(Ue, i, i.Type);
    tt(Ue, i, i);
    rt(e, Ue);
    return i.Type;
};

const Ve = t => {
    const e = Z(Ue, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
    return e;
};

const Ne = Object.freeze({
    name: Ue,
    keyFrom: qe,
    isType: Fe,
    for: _e,
    define: Me,
    getDefinition: Ve,
    annotate(t, e, i) {
        tt(st(e), i, t);
    },
    getAnnotation: je
});

function He(t, e) {
    if (null == t) throw new Error(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!mt(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!mt(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        Ge.add(l, h);
        if (Fe(l)) Ve(l).watches.push(h);
        if (ui(l)) mi(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const We = l;

const ze = st("watch");

const Ge = Object.freeze({
    name: ze,
    add(t, e) {
        let i = Z(ze, t);
        if (null == i) tt(ze, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return Z(ze, t) ?? We;
    }
});

function Xe(t) {
    return function(e) {
        return ai(t, e);
    };
}

function Ke(t) {
    if (void 0 === t) return function(t) {
        ci(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!mt(t)) return function(e) {
        ci(e, "shadowOptions", t);
    };
    ci(t, "shadowOptions", {
        mode: "open"
    });
}

function Qe(t) {
    if (void 0 === t) return function(t) {
        Ye(t);
    };
    Ye(t);
}

function Ye(t) {
    const e = Z(oi, t);
    if (void 0 === e) {
        ci(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function Ze(t) {
    if (void 0 === t) return function(t) {
        ci(t, "isStrictBinding", true);
    };
    ci(t, "isStrictBinding", true);
}

const Je = new WeakMap;

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
            if (gt(i)) throw new Error(`AUR0761:${t}`);
            const s = u("name", i, hi);
            if (mt(i.Type)) e = i.Type; else e = pi(f(s));
            return new CustomElementDefinition(e, s, c(i.aliases), u("key", i, (() => li(s))), u("cache", i, ei), u("capture", i, si), u("template", i, ii), c(i.instructions), c(i.dependencies), u("injectable", i, ii), u("needsCompile", i, ni), c(i.surrogates), Ct.from(e, i.bindables), Be.from(i.childrenObservers), u("containerless", i, si), u("isStrictBinding", i, si), u("shadowOptions", i, ii), u("hasSlots", i, si), u("enhance", i, si), u("watches", i, ri), d("processContent", e, ii));
        }
        if (gt(t)) return new CustomElementDefinition(e, t, c(di(e, "aliases"), e.aliases), li(t), d("cache", e, ei), d("capture", e, si), d("template", e, ii), c(di(e, "instructions"), e.instructions), c(di(e, "dependencies"), e.dependencies), d("injectable", e, ii), d("needsCompile", e, ni), c(di(e, "surrogates"), e.surrogates), Ct.from(e, ...Ct.getAll(e), di(e, "bindables"), e.bindables), Be.from(...Be.getAll(e), di(e, "childrenObservers"), e.childrenObservers), d("containerless", e, si), d("isStrictBinding", e, si), d("shadowOptions", e, ii), d("hasSlots", e, si), d("enhance", e, si), c(Ge.getAnnotation(e), e.watches), d("processContent", e, ii));
        const i = u("name", t, hi);
        return new CustomElementDefinition(e, i, c(di(e, "aliases"), t.aliases, e.aliases), li(i), a("cache", t, e, ei), a("capture", t, e, si), a("template", t, e, ii), c(di(e, "instructions"), t.instructions, e.instructions), c(di(e, "dependencies"), t.dependencies, e.dependencies), a("injectable", t, e, ii), a("needsCompile", t, e, ni), c(di(e, "surrogates"), t.surrogates, e.surrogates), Ct.from(e, ...Ct.getAll(e), di(e, "bindables"), e.bindables, t.bindables), Be.from(...Be.getAll(e), di(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), a("containerless", t, e, si), a("isStrictBinding", t, e, si), a("shadowOptions", t, e, ii), a("hasSlots", t, e, si), a("enhance", t, e, si), c(t.watches, Ge.getAnnotation(e), e.watches), a("processContent", t, e, ii));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Je.has(t)) return Je.get(t);
        const e = CustomElementDefinition.create(t);
        Je.set(t, e);
        tt(oi, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            Lt(i, e).register(t);
            Dt(i, e).register(t);
            Ut(s, vi, i, t);
        }
    }
}

const ti = {
    name: void 0,
    searchParents: false,
    optional: false
};

const ei = () => 0;

const ii = () => null;

const si = () => false;

const ni = () => true;

const ri = () => l;

const oi = nt("custom-element");

const li = t => `${oi}:${t}`;

const hi = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const ci = (t, e, i) => {
    tt(st(e), i, t);
};

const ai = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    tt(oi, i, i.Type);
    tt(oi, i, i);
    rt(i.Type, oi);
    return i.Type;
};

const ui = t => mt(t) && J(oi, t);

const fi = (t, e = ti) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = Bs(t, oi);
        if (null === i) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = Bs(t, oi);
            if (null === i) throw new Error(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = Bs(i, oi);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = Ls(i);
        }
        if (s) return;
        throw new Error(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = Bs(i, oi);
        if (null !== t) return t;
        i = Ls(i);
    }
    throw new Error(`AUR0765`);
};

const di = (t, e) => Z(st(e), t);

const mi = t => {
    const e = Z(oi, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const gi = () => {
    const t = function(e, i, s) {
        const n = o.getOrCreateAnnotationParamTypes(e);
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

const pi = function() {
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

const vi = Object.freeze({
    name: oi,
    keyFrom: li,
    isType: ui,
    for: fi,
    define: ai,
    getDefinition: mi,
    annotate: ci,
    getAnnotation: di,
    generateName: hi,
    createInjectable: gi,
    generateType: pi
});

const wi = st("processContent");

function bi(t) {
    return void 0 === t ? function(t, e, i) {
        tt(wi, xi(t, e), t);
    } : function(e) {
        t = xi(e, t);
        const i = Z(oi, e);
        if (void 0 !== i) i.processContent = t; else tt(wi, t, e);
        return e;
    };
}

function xi(t, e) {
    if (gt(e)) e = t[e];
    if (!mt(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function yi(t) {
    return function(e) {
        const i = mt(t) ? t : true;
        ci(e, "capture", i);
        if (ui(e)) mi(e).capture = i;
    };
}

const ki = m;

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
            const i = Ci(t);
            let s = this.it;
            this.ov = t;
            if (i.length > 0) this.st(i);
            this.it += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!ct.call(e, t) || e[t] !== s) continue;
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

function Ci(t) {
    if (gt(t)) return Ai(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...Ci(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...Ai(i)); else e.push(i);
    return e;
}

function Ai(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

function Ri(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Me({
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
                this.element.className = Ci(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ Is ], e));
        t.register(s);
    }
}

function Si(...t) {
    return new ShadowDOMRegistry(t);
}

const Bi = o.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(ki))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Ii);
        const i = t.get(Bi);
        t.register(Pt(Ei, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ ki ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ ki ];

const Ei = o.createInterface("IShadowDOMStyles");

const Ii = o.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
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

const Ti = {
    shadowDOM(t) {
        return ke.creating(g, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(Bi);
                e.register(Pt(Ii, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: Di, exit: Pi} = T;

const {wrap: $i, unwrap: Li} = D;

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
            Di(this);
            return this.value = Li(this.$get.call(void 0, this.useProxy ? $i(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Pi(this);
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

I(ComputedWatcher);

he(true)(ComputedWatcher);

I(ExpressionWatcher);

he(true)(ExpressionWatcher);

const Oi = o.createInterface("ILifecycleHooks");

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
        Tt(Oi, this.Type).register(t);
    }
}

const Ui = new WeakMap;

const qi = st("lifecycle-hooks");

const ji = Object.freeze({
    name: qi,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        tt(qi, i, e);
        rt(e, qi);
        return i.Type;
    },
    resolve(t) {
        let e = Ui.get(t);
        if (void 0 === e) {
            Ui.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Oi) : t.has(Oi, false) ? i.getAll(Oi).concat(t.getAll(Oi)) : i.getAll(Oi);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = Z(qi, n.constructor);
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

function Fi() {
    return function t(e) {
        return ji.define({}, e);
    };
}

const _i = o.createInterface("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (gt(t)) t = parseInt(t, 10);
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

const Mi = new WeakSet;

function Vi(t) {
    return !Mi.has(t);
}

function Ni(t) {
    Mi.add(t);
    return CustomElementDefinition.create(t);
}

const Hi = nt("views");

const Wi = Object.freeze({
    name: Hi,
    has(t) {
        return mt(t) && (J(Hi, t) || "$views" in t);
    },
    get(t) {
        if (mt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Vi).map(Ni);
            for (const e of i) Wi.add(t, e);
        }
        let e = Z(Hi, t);
        if (void 0 === e) tt(Hi, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = Z(Hi, t);
        if (void 0 === s) tt(Hi, s = [ i ], t); else s.push(i);
        return s;
    }
});

function zi(t) {
    return function(e) {
        Wi.add(e, t);
    };
}

const Gi = o.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Wi.has(t.constructor) ? Wi.get(t.constructor) : [];
            const s = mt(e) ? e(t, i) : this.ot(i, e);
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
            n = ai(mi(r), class extends r {
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
            n = ai(this.ct(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const s = this.viewModel;
                    t.scope = P.fromParent(t.scope, s);
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

const Xi = o.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.p = (this.dt = t.root).get(ki);
        this.gt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.vt ? this.vt = this.dt.getAll(Ys, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), ht()) : this.vt;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ut;
            const n = e.get(Qs);
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
                if (gt(r)) o.innerHTML = r;
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

var Ki;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(Ki || (Ki = {}));

var Qi;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Qi || (Qi = {}));

const Yi = {
    optional: true
};

const Zi = new WeakMap;

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
        this.r = t.root.get(Xi);
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
        return Zi.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (Zi.has(e)) return Zi.get(e);
        n = n ?? mi(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(p(fs));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        t.registerResolver(fs, new v("IHydrationContext", new HydrationContext(o, s, l)));
        Zi.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (Zi.has(e)) return Zi.get(e);
        s = s ?? Ve(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        Zi.set(e, n);
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
        this.scope = P.create(n, null, true);
        if (r.watches.length > 0) ns(this, i, r, n);
        ts(this, r, s, n);
        this.bt = es(this, r, n);
        if (this.hooks.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = ji.resolve(i);
        r.register(i);
        if (null !== r.injectable) i.registerResolver(r.injectable, new v("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(gs, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = fi(this.host, Yi))) {
            this.host = this.container.root.get(ki).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Us(this.host);
        }
        Es(this.host, oi, this);
        Es(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw new Error(`AUR0501`);
            Es(this.shadowRoot = this.host.attachShadow(i ?? ls), oi, this);
            Es(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Es(o, oi, this);
            Es(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(ps, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Rt, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ms, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    Ct() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) ns(this, this.container, t, e);
        ts(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = ji.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ms, this);
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
            throw new Error(`AUR0503:${this.name} ${as(this.state)}`);
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
        this.St();
        let n;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) n = w(...this.lifecycleHooks.binding.map(vs, this));
        if (this.hooks.hasBinding) n = w(n, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (ft(n)) {
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = w(...this.lifecycleHooks.bound.map(ws, this));
        if (this.hooks.hasBound) i = w(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (ft(i)) {
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
                const e = t.has(Ei, false) ? t.get(Ei) : t.get(Ii);
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) e = w(...this.lifecycleHooks.attaching.map(bs, this));
        if (this.hooks.hasAttaching) e = w(e, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (ft(e)) {
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
            throw new Error(`AUR0505:${this.name} ${as(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Pt();
        let s = 0;
        let n;
        if (this.bt.length) for (;s < this.bt.length; ++s) this.bt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) n = w(...this.lifecycleHooks.detaching.map(ys, this));
        if (this.hooks.hasDetaching) n = w(n, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (ft(n)) {
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
            this.scope.parentScope = null;
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
            Cs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Cs();
            Cs = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            As = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            As(t);
            As = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    St() {
        ++this.xt;
        if (this.$initiator !== this) this.parent.St();
    }
    Dt() {
        if (0 === --this.xt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Rs = w(...this.lifecycleHooks.attached.map(xs, this));
            if (this.hooks.hasAttached) Rs = w(Rs, this.viewModel.attached(this.$initiator, this.$flags));
            if (ft(Rs)) {
                this.Bt();
                Rs.then((() => {
                    this.state = 2;
                    this.Lt();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                Rs = void 0;
                return;
            }
            Rs = void 0;
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
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) e = w(...t.lifecycleHooks.unbinding.map(ks, this));
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = w(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (ft(e)) {
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
            return Ve(this.viewModel.constructor).name === t;

          case 0:
            return mi(this.viewModel.constructor).name === t;

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
            Es(t, oi, this);
            Es(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Es(t, oi, this);
            Es(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Es(t, oi, this);
            Es(t, this.definition.key, this);
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
            this.children.forEach(ds);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            Zi.delete(this.viewModel);
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

function Ji(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function ts(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = Ji(s);
        const c = t.container;
        const a = c.has($, true) ? c.get($) : null;
        for (;l < o; ++l) {
            e = r[l];
            if (void 0 === h[e]) {
                i = n[e];
                h[e] = new BindableObserver(s, e, i.callback, i.set, t, a);
            }
        }
    }
}

function es(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = Ji(i);
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

const is = new Map;

const ss = t => {
    let e = is.get(t);
    if (null == e) {
        e = new U(t, 0);
        is.set(t, e);
    }
    return e;
};

function ns(t, e, i, s) {
    const n = e.get(L);
    const r = e.get(O);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : P.create(s, null, true);
    const h = o.length;
    let c;
    let a;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: c, callback: a} = o[f]);
        a = mt(a) ? a : Reflect.get(s, a);
        if (!mt(a)) throw new Error(`AUR0506:${String(a)}`);
        if (mt(c)) t.addBinding(new ComputedWatcher(s, n, c, a, true)); else {
            u = gt(c) ? r.parse(c, 8) : ss(c);
            t.addBinding(new ExpressionWatcher(l, e, n, u, a));
        }
    }
}

function rs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function os(t) {
    return B(t) && ui(t.constructor);
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

const ls = {
    mode: "open"
};

var hs;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(hs || (hs = {}));

var cs;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(cs || (cs = {}));

function as(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const us = o.createInterface("IController");

const fs = o.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function ds(t) {
    t.dispose();
}

function ms(t) {
    t.instance.created(this.viewModel, this);
}

function gs(t) {
    t.instance.hydrating(this.viewModel, this);
}

function ps(t) {
    t.instance.hydrated(this.viewModel, this);
}

function vs(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function ws(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function bs(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function xs(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function ys(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function ks(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let Cs;

let As;

let Rs;

const Ss = o.createInterface("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.qt = void 0;
        this.host = t.host;
        s.prepare(this);
        i.registerResolver(e.HTMLElement, i.registerResolver(e.Element, i.registerResolver(Is, new v("ElementResolver", t.host))));
        this.qt = b(this.jt("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (ui(e)) n = this.container.get(e); else n = t.component;
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
        return w(...this.container.getAll(ye).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function Bs(t, e) {
    return t.$au?.[e] ?? null;
}

function Es(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const Is = o.createInterface("INode");

const Ts = o.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Ss, true)) return t.get(Ss).host;
    return t.get(ki).document;
}))));

const Ds = o.createInterface("IRenderLocation");

var Ps;

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
})(Ps || (Ps = {}));

const $s = new WeakMap;

function Ls(t) {
    if ($s.has(t)) return $s.get(t);
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
        const e = fi(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Ls(e.host);
    }
    return t.parentNode;
}

function Os(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) $s.set(i[t], e);
    } else $s.set(t, e);
}

function Us(t) {
    if (qs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function qs(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Us(r); else o[s] = r;
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
        if (qs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const js = o.createInterface("IWindow", (t => t.callback((t => t.get(ki).window))));

const Fs = o.createInterface("ILocation", (t => t.callback((t => t.get(js).location))));

const _s = o.createInterface("IHistory", (t => t.callback((t => t.get(js).history))));

const Ms = {
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
        let i = this.ast.evaluate(this.$scope, this, null);
        delete e.$event;
        if (mt(i)) i = i(t);
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
        const e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        if (0 === this.Ft.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Ts), this.target, this.targetEvent, this, Ms[this.Ft.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
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

he(true, true)(Listener);

const Vs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = Vs) {
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
        if (void 0 === i) e.set(t, i = ht());
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
            if (mt(n)) n(t); else n.handleEvent(t);
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

const Ns = o.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Qt = ht();
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

const Hs = o.createInterface("IProjections");

const Ws = o.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var zs;

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
})(zs || (zs = {}));

const Gs = o.createInterface("Instruction");

function Xs(t) {
    const e = t.type;
    return gt(e) && 2 === e.length;
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

var Ks;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(Ks || (Ks = {}));

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

const Qs = o.createInterface("ITemplateCompiler");

const Ys = o.createInterface("IRenderer");

function Zs(t) {
    return function e(i) {
        i.register = function(t) {
            Tt(Ys, this).register(t);
        };
        pt(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function Js(t, e, i) {
    if (gt(e)) return t.parse(e, i);
    return e;
}

function tn(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function en(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return fi(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return fi(t).viewModel;

      default:
        {
            const i = _e(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = fi(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let sn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = tn(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

sn = Q([ Zs("re") ], sn);

let nn = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Xi, ki ];
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
            s = c.find(vi, l);
            if (null == s) throw new Error(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Us(e) : null;
        const f = Tn(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        f.registerResolver(n, new v(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        Es(e, s.key, o);
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

nn = Q([ Zs("ra") ], nn);

let rn = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Xi, ki ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ne, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = Dn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Es(e, n.key, o);
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

rn = Q([ Zs("rb") ], rn);

let on = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Xi, ki ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Ne, i.res);
            if (null == n) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Us(e);
        const l = Dn(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Es(o, n.key, h);
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

on = Q([ Zs("rc") ], on);

let ln = class LetElementRenderer {
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
            h = Js(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(18 === h.$kind ? gn(c, h, r) : c);
            ++a;
        }
    }
};

ln.inject = [ O, L ];

ln = Q([ Zs("rd") ], ln);

let hn = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, s, tn(e), i.to);
        t.addBinding(18 === s.$kind ? gn(n, s, t.container) : n);
    }
};

hn.inject = [ O, L ];

hn = Q([ Zs("rh") ], hn);

let cn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 8);
        const n = new RefBinding(t.container, s, en(e, i.to));
        t.addBinding(18 === s.$kind ? gn(n, s, t.container) : n);
    }
};

cn.inject = [ O ];

cn = Q([ Zs("rj") ], cn);

let an = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = Js(this.ep, i.from, 1);
        const r = new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, tn(e), i.to, 2);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (18 === c.ast.$kind) o[h] = gn(c, c.ast, s);
        }
        t.addBinding(r);
    }
};

an.inject = [ O, L, ki ];

an = Q([ Zs("rf") ], an);

let un = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, tn(e), i.to, i.mode);
        t.addBinding(18 === s.$kind ? gn(n, s, t.container) : n);
    }
};

un.inject = [ O, L, ki ];

un = Q([ Zs("rg") ], un);

let fn = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, tn(e), i.to, 2);
        t.addBinding(18 === s.iterable.$kind ? gn(n, s.iterable, t.container) : n);
    }
};

fn.inject = [ O, L, ki ];

fn = Q([ Zs("rk") ], fn);

let dn = 0;

const mn = [];

function gn(t, e, i) {
    while (e instanceof q) {
        mn[dn++] = e;
        e = e.expression;
    }
    while (dn > 0) {
        const e = mn[--dn];
        const s = i.get(se.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    mn.length = 0;
    return t;
}

let pn = class TextBindingRenderer {
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
        const l = Js(this.ep, i.from, 1);
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
            t.addBinding(18 === m.$kind ? gn(d, m, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

pn.inject = [ O, L, ki ];

pn = Q([ Zs("ha") ], pn);

let vn = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.Yt = e;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 4);
        const n = new Listener(t.container, s, e, i.to, this.Yt, new ListenerOptions(i.preventDefault, i.strategy));
        t.addBinding(18 === s.$kind ? gn(n, s, t.container) : n);
    }
};

vn.inject = [ O, Ns ];

vn = Q([ Zs("hb") ], vn);

let wn = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

wn = Q([ Zs("he") ], wn);

let bn = class SetClassAttributeRenderer {
    render(t, e, i) {
        An(e.classList, i.value);
    }
};

bn = Q([ Zs("hf") ], bn);

let xn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

xn = Q([ Zs("hg") ], xn);

let yn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, 2);
        t.addBinding(18 === s.$kind ? gn(n, s, t.container) : n);
    }
};

yn.inject = [ O, L, ki ];

yn = Q([ Zs("hd") ], yn);

let kn = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = Js(this.ep, i.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, 2);
        t.addBinding(18 === s.$kind ? gn(n, s, t.container) : n);
    }
};

kn.inject = [ ki, O, L ];

kn = Q([ Zs("hc") ], kn);

let Cn = class SpreadRenderer {
    constructor(t, e) {
        this.Zt = t;
        this.r = e;
    }
    static get inject() {
        return [ Qs, Xi ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(fs);
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
            const n = Rn(s);
            const c = this.Zt.compileSpread(s.controller.definition, s.instruction?.captures ?? l, s.controller.container, e);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                r[a.instructions.type].render(n, fi(e), a.instructions);
                break;

              default:
                r[a.type].render(n, e, a);
            }
            t.addBinding(n);
        };
        h(0);
    }
};

Cn = Q([ Zs("hs") ], Cn);

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
        const e = this.$scope = this.te.controller.scope.parentScope ?? void 0;
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

function An(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Rn = t => new SpreadBinding([], t);

const Sn = "IController";

const Bn = "IInstruction";

const En = "IRenderLocation";

const In = "IAuSlotsInfo";

function Tn(t, e, i, s, n, r) {
    const o = e.container.createChild();
    o.registerResolver(t.HTMLElement, o.registerResolver(t.Element, o.registerResolver(Is, new v("ElementResolver", i))));
    o.registerResolver(us, new v(Sn, e));
    o.registerResolver(Gs, new v(Bn, s));
    o.registerResolver(Ds, null == n ? Pn : new RenderLocationProvider(n));
    o.registerResolver(_i, $n);
    o.registerResolver(Ws, null == r ? Ln : new v(In, r));
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
        if (!gt(t.name) || 0 === t.name.length) throw new Error(`AUR0756`);
        return t;
    }
}

function Dn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    h.registerResolver(t.HTMLElement, h.registerResolver(t.Element, h.registerResolver(Is, new v("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    h.registerResolver(us, new v(Sn, i));
    h.registerResolver(Gs, new v(Bn, n));
    h.registerResolver(Ds, null == o ? Pn : new v(En, o));
    h.registerResolver(_i, null == r ? $n : new ViewFactoryProvider(r));
    h.registerResolver(Ws, null == l ? Ln : new v(In, l));
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

const Pn = new RenderLocationProvider(null);

const $n = new ViewFactoryProvider(null);

const Ln = new v(In, new AuSlotsInfo(l));

var On;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(On || (On = {}));

function Un(t) {
    return function(e) {
        return _n.define(t, e);
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
        if (gt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, i(Fn(e, "name"), s), c(Fn(e, "aliases"), n.aliases, e.aliases), jn(s), i(Fn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Tt(i, e).register(t);
        Dt(i, e).register(t);
        Ut(s, _n, i, t);
    }
}

const qn = nt("binding-command");

const jn = t => `${qn}:${t}`;

const Fn = (t, e) => Z(st(e), t);

const _n = Object.freeze({
    name: qn,
    keyFrom: jn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        tt(qn, i, i.Type);
        tt(qn, i, i);
        rt(e, qn);
        return i.Type;
    },
    getAnnotation: Fn
});

let Mn = class OneTimeBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "one-time";
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

Mn = Q([ Un("one-time") ], Mn);

let Vn = class ToViewBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "to-view";
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

Vn = Q([ Un("to-view") ], Vn);

let Nn = class FromViewBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "from-view";
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

Nn = Q([ Un("from-view") ], Nn);

let Hn = class TwoWayBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "two-way";
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

Hn = Q([ Un("two-way") ], Hn);

let Wn = class DefaultBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "bind";
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

Wn = Q([ Un("bind") ], Wn);

let zn = class CallBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "call";
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(e.parse(t.attr.rawValue, 8 | 4), i);
    }
};

zn = Q([ Un("call") ], zn);

let Gn = class ForBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "for";
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(e.parse(t.attr.rawValue, 2), i);
    }
};

Gn = Q([ Un("for") ], Gn);

let Xn = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "trigger";
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, 0);
    }
};

Xn = Q([ Un("trigger") ], Xn);

let Kn = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "delegate";
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 2);
    }
};

Kn = Q([ Un("delegate") ], Kn);

let Qn = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "capture";
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 1);
    }
};

Qn = Q([ Un("capture") ], Qn);

let Yn = class AttrBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "attr";
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Yn = Q([ Un("attr") ], Yn);

let Zn = class StyleBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "style";
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Zn = Q([ Un("style") ], Zn);

let Jn = class ClassBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "class";
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Jn = Q([ Un("class") ], Jn);

let tr = class RefBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "ref";
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

tr = Q([ Un("ref") ], tr);

let er = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "...$attrs";
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

er = Q([ Un("...$attrs") ], er);

const ir = o.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const sr = t => {
    const e = ht();
    t = gt(t) ? t.split(" ") : t;
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
        this.ee = Object.assign(ht(), {
            a: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: sr("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: ht(),
            altGlyphDef: sr("id xml:base xml:lang xml:space"),
            altglyphdef: ht(),
            altGlyphItem: sr("id xml:base xml:lang xml:space"),
            altglyphitem: ht(),
            animate: sr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: sr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: sr("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: sr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: sr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: sr("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": sr("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: sr("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: sr("class id style xml:base xml:lang xml:space"),
            ellipse: sr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: sr("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: sr("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: sr("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: sr("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: sr("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: sr("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: sr("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: sr("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: sr("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: sr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: sr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: sr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: sr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: sr("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: sr("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: sr("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: sr("id xml:base xml:lang xml:space"),
            feMorphology: sr("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: sr("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: sr("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: sr("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: sr("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: sr("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: sr("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: sr("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: sr("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": sr("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": sr("id string xml:base xml:lang xml:space"),
            "font-face-name": sr("id name xml:base xml:lang xml:space"),
            "font-face-src": sr("id xml:base xml:lang xml:space"),
            "font-face-uri": sr("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: sr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: sr("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: sr("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: ht(),
            hkern: sr("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: sr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: sr("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: sr("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: sr("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: sr("id xml:base xml:lang xml:space"),
            "missing-glyph": sr("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: sr("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: sr("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: sr("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: sr("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: sr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: sr("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: sr("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: sr("class id offset style xml:base xml:lang xml:space"),
            style: sr("id media title type xml:base xml:lang xml:space"),
            svg: sr("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: sr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: sr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: sr("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: sr("class id style xml:base xml:lang xml:space"),
            tref: sr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: sr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: sr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: sr("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: sr("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.ie = sr("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.se = sr("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return Tt(ir, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.ie[t.nodeName] && true === this.se[e] || true === this.ee[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ ki ];

const nr = o.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ne = ht();
        this.re = ht();
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
        return [ ir ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.ne)[n] ?? (e[n] = ht());
            for (r in i) {
                if (void 0 !== s[r]) throw or(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.re;
        for (const i in t) {
            if (void 0 !== e[i]) throw or(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return rr(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.ne[t.nodeName]?.[e] ?? this.re[e] ?? (ut(t, e, this.svg) ? e : null);
    }
}

function rr(t, e) {
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

function or(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const lr = o.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const hr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.oe = t.document.createElement("template");
    }
    createTemplate(t) {
        if (gt(t)) {
            let e = hr[t];
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
                hr[t] = e;
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

TemplateElementFactory.inject = [ ki ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Tt(Qs, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = ur);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = gt(s.template) || !t.enhance ? n.le.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const c = e.get(It(kr));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(br)) throw new Error(`AUR0701`);
        this.he(h, n);
        this.ce(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || hi(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.ae(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, ur, null, null, void 0);
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
                dr.node = s;
                dr.attr = u;
                dr.bindable = null;
                dr.def = null;
                r.push(w.build(dr, n.ep, n.m));
                continue;
            }
            f = n.de(k);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === w && cr(C);
                if (y) m = this.me(s, C, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        b = h.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        dr.node = s;
                        dr.attr = u;
                        dr.bindable = v;
                        dr.def = f;
                        m = [ w.build(dr, n.ep, n.m) ];
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
                        dr.node = s;
                        dr.attr = u;
                        dr.bindable = p;
                        dr.def = o;
                        r.push(new SpreadElementPropBindingInstruction(w.build(dr, n.ep, n.m)));
                        continue;
                    }
                }
                dr.node = s;
                dr.attr = u;
                dr.bindable = null;
                dr.def = null;
                r.push(w.build(dr, n.ep, n.m));
            }
        }
        ar();
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
            if (mr[b]) throw new Error(`AUR0702:${h}`);
            p = e.fe(a);
            if (null !== p && (1 & p.type) > 0) {
                dr.node = t;
                dr.attr = a;
                dr.bindable = null;
                dr.def = null;
                i.push(p.build(dr, e.ep, e.m));
                continue;
            }
            u = e.de(b);
            if (null !== u) {
                if (u.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && cr(y);
                if (w) d = this.me(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        dr.node = t;
                        dr.attr = a;
                        dr.bindable = g;
                        dr.def = u;
                        d = [ p.build(dr, e.ep, e.m) ];
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
                dr.node = t;
                dr.attr = a;
                dr.bindable = null;
                dr.def = null;
                i.push(p.build(dr, e.ep, e.m));
            }
        }
        ar();
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
            if (null !== f) switch (f.name) {
              case "to-view":
              case "bind":
                n.push(new LetBindingInstruction(r.parse(m, 8), x(d)));
                continue;

              default:
                throw new Error(`AUR0704:${c.command}`);
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new j(m) : g, x(d)));
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
                dr.node = t;
                dr.attr = S;
                dr.bindable = null;
                dr.def = null;
                (B ?? (B = [])).push(j.build(dr, e.ep, e.m));
                v();
                continue;
            }
            I = e.de(M);
            if (null !== I) {
                F = BindablesInfo.from(I, true);
                T = false === I.noMultiBindings && null === j && cr(V);
                if (T) $ = this.me(t, V, I, e); else {
                    _ = F.primary;
                    if (null === j) {
                        U = p.parse(V, 1);
                        $ = [ null === U ? new SetPropertyInstruction(V, _.property) : new InterpolationInstruction(U, _.property) ];
                    } else {
                        dr.node = t;
                        dr.attr = S;
                        dr.bindable = _;
                        dr.def = I;
                        $ = [ j.build(dr, e.ep, e.m) ];
                    }
                }
                v();
                if (I.isTemplateController) (L ?? (L = [])).push(new HydrateTemplateController(fr, this.resolveResources ? I : I.name, void 0, $)); else (P ?? (P = [])).push(new HydrateAttributeInstruction(this.resolveResources ? I : I.name, null != I.aliases && I.aliases.includes(M) ? M : void 0, $));
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
                    dr.node = t;
                    dr.attr = S;
                    dr.bindable = D;
                    dr.def = a;
                    (E ?? (E = [])).push(j.build(dr, e.ep, e.m));
                    continue;
                }
            }
            dr.node = t;
            dr.attr = S;
            dr.bindable = null;
            dr.def = null;
            (B ?? (B = [])).push(j.build(dr, e.ep, e.m));
        }
        ar();
        if (this.xe(t) && null != B && B.length > 1) this.ye(t, B);
        if (u) {
            q = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, E ?? l, null, H, g);
            if (c === Er) {
                const i = t.getAttribute("name") || Br;
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
                        name: hi(),
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
                h = 1 === A.nodeType ? A.getAttribute(Er) : null;
                if (null !== h) A.removeAttribute(Er);
                if (u) {
                    l = A.nextSibling;
                    if (!f) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = h || Br] ?? (i[s] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== h) {
                        h = h || Br;
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
                        name: hi(),
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
                name: hi(),
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
                    name: hi(),
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
                n = 1 === i.nodeType ? i.getAttribute(Er) : null;
                if (null !== n) i.removeAttribute(Er);
                if (u) {
                    s = i.nextSibling;
                    if (!f) {
                        v = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!v) ((r = h ?? (h = {}))[o = n || Br] ?? (r[o] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || Br;
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
                        name: hi(),
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
                    dr.node = t;
                    dr.attr = f;
                    dr.bindable = m;
                    dr.def = i;
                    o.push(d.build(dr, s.ep, s.m));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                c = g;
                l = void 0;
                h = void 0;
            }
        }
        ar();
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
            const s = xr(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const c = Ct.for(n);
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
                    mode: yr(t)
                });
                const s = t.getAttributeNames().filter((t => !wr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Ae(ai({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const c = o.length;
        for (;c > h; ++h) mi(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    xe(t) {
        return "INPUT" === t.nodeName && 1 === gr[t.type];
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
        this.Re = ht();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.le = o ? s.le : e.get(lr);
        this.ge = o ? s.ge : e.get(Mt);
        this.ep = o ? s.ep : e.get(O);
        this.m = o ? s.m : e.get(nr);
        this.Se = o ? s.Se : e.get(k);
        this.p = o ? s.p : e.get(ki);
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
        return this.c.find(vi, t);
    }
    de(t) {
        return this.c.find(Ne, t);
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
            i = this.c.create(_n, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.Re[e] = i;
        }
        return i;
    }
}

function cr(t) {
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

function ar() {
    dr.node = dr.attr = dr.bindable = dr.def = null;
}

const ur = {
    projections: null
};

const fr = {
    name: "unnamed"
};

const dr = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const mr = Object.assign(ht(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const gr = {
    checkbox: 1,
    radio: 1
};

const pr = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = pr.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = ht();
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
            pr.set(t, i = new BindablesInfo(n, s, c));
        }
        return i;
    }
}

var vr;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(vr || (vr = {}));

const wr = Object.freeze([ "property", "attribute", "mode" ]);

const br = "as-custom-element";

function xr(t, e) {
    const i = t.getAttribute(br);
    if (null === i || "" === i) throw new Error(`AUR0715`);
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(br);
    }
    return i;
}

function yr(t) {
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

const kr = o.createInterface("ITemplateCompilerHooks");

const Cr = new WeakMap;

const Ar = nt("compiler-hooks");

const Rr = Object.freeze({
    name: Ar,
    define(t) {
        let e = Cr.get(t);
        if (void 0 === e) {
            Cr.set(t, e = new TemplateCompilerHooksDefinition(t));
            tt(Ar, e, t);
            rt(t, Ar);
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
        t.register(Tt(kr, this.Type));
    }
}

const Sr = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Rr.define(t);
    }
};

const Br = "default";

const Er = "au-slot";

var Ir;

(function(t) {
    t[t["Space"] = 32] = "Space";
    t[t["Dollar"] = 36] = "Dollar";
    t[t["Semicolon"] = 59] = "Semicolon";
    t[t["Backslash"] = 92] = "Backslash";
    t[t["OpenBrace"] = 123] = "OpenBrace";
    t[t["Colon"] = 58] = "Colon";
})(Ir || (Ir = {}));

const Tr = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        Tr.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = Tr.get(e);
        Tr.delete(e);
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

Jt("oneTime")(OneTimeBindingBehavior);

Jt("toView")(ToViewBindingBehavior);

Jt("fromView")(FromViewBindingBehavior);

Jt("twoWay")(TwoWayBindingBehavior);

const Dr = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.Be = {
            delay: Dr
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
            const e = Number(this.Ee.evaluate(t, this, null));
            this.Be.delay = isNaN(e) ? Dr : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.Ie?.cancel();
        this.Ie = null;
        this.binding.$unbind();
    }
}

Jt("debounce")(DebounceBindingBehavior);

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

SignalBindingBehavior.inject = [ F ];

Jt("signal")(SignalBindingBehavior);

const Pr = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.Be = {
            delay: Pr
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
            const e = Number(this.Ee.evaluate(t, this, null));
            this.Be.delay = this.Pe = isNaN(e) ? Pr : e;
        }
        super.$bind(t);
    }
    $unbind() {
        this.Ie?.cancel();
        this.Ie = null;
        super.$unbind();
    }
}

Jt("throttle")(ThrottleBindingBehavior);

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

const $r = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = $r;
    }
    unbind(t, e) {
        return;
    }
}

Jt("attr")(AttrBindingBehavior);

function Lr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Lr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

Jt("self")(SelfBindingBehavior);

const Or = ht();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Or[t] ?? (Or[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

function Ur(t, e) {
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
        const i = ct.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Ur;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (dt(t)) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const i = ct.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Ur;
        if ("checkbox" === e.type) {
            if (dt(t)) {
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
        qr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, qr);
    }
    Ue() {
        const t = this.o;
        (this.Oe ?? (this.Oe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Le?.unsubscribe(this);
        this.Le = void 0;
        if ("checkbox" === t.type) (this.Le = Kr(this.v, this.oL))?.subscribe(this);
    }
}

E(CheckedObserver);

let qr;

const jr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Fr(t, e) {
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
        return this.iO ? this.v : this.o.multiple ? _r(this.o.options) : this.o.value;
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
        const i = dt(t);
        const s = e.matcher ?? Fr;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = ct.call(e, "model") ? e.model : e.value;
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
            const o = t.matcher || Fr;
            const l = [];
            while (n < i) {
                r = e[n];
                if (r.selected) l.push(ct.call(r, "model") ? r.model : r.value);
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
                r = ct.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Me() {
        (this.Fe = new this.o.ownerDocument.defaultView.MutationObserver(this.Ve.bind(this))).observe(this.o, jr);
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
        Mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Mr);
    }
}

E(SelectValueObserver);

function _r(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = ct.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let Mr;

const Vr = "--";

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
            if (gt(e)) {
                if (i.startsWith(Vr)) {
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
        if (gt(t)) return this.He(t);
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
                if (!ct.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && mt(e.indexOf) && e.includes("!important")) {
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
        Nr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Nr);
    }
}

E(ValueAttributeObserver);

let Nr;

const Hr = "http://www.w3.org/1999/xlink";

const Wr = "http://www.w3.org/XML/1998/namespace";

const zr = "http://www.w3.org/2000/xmlns/";

const Gr = Object.assign(ht(), {
    "xlink:actuate": [ "actuate", Hr ],
    "xlink:arcrole": [ "arcrole", Hr ],
    "xlink:href": [ "href", Hr ],
    "xlink:role": [ "role", Hr ],
    "xlink:show": [ "show", Hr ],
    "xlink:title": [ "title", Hr ],
    "xlink:type": [ "type", Hr ],
    "xml:lang": [ "lang", Wr ],
    "xml:space": [ "space", Wr ],
    xmlns: [ "xmlns", zr ],
    "xmlns:xlink": [ "xlink", zr ]
});

const Xr = new _;

Xr.type = 2 | 4;

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
        this.Xe = ht();
        this.Ke = ht();
        this.Qe = ht();
        this.Ye = ht();
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
        Dt(M, NodeObserverLocator).register(t);
        Tt(M, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Xe;
        let n;
        if (gt(t)) {
            n = s[t] ?? (s[t] = ht());
            if (null == n[e]) n[e] = new NodeObserverConfig(i); else Qr(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = ht());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else Qr(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else Qr("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else Qr("*", t);
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
            return $r;

          default:
            {
                const i = Gr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (ut(t, e, this.svgAnalyzer)) return $r;
                return Xr;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (gt(t)) {
            n = (i = this.Qe)[t] ?? (i[t] = ht());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Qe)[e] ?? (s[e] = ht());
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
        const n = Gr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (ut(t, e, this.svgAnalyzer)) return $r;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new V(t, e);
    }
}

NodeObserverLocator.inject = [ A, ki, N, ir ];

function Kr(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Qr(t, e) {
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

UpdateTriggerBindingBehavior.inject = [ L ];

Jt("updateTrigger")(UpdateTriggerBindingBehavior);

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

Focus.inject = [ Is, ki ];

Q([ xt({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Le("focus")(Focus);

let Yr = class Show {
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

Q([ xt ], Yr.prototype, "value", void 0);

Yr = Q([ Y(0, Is), Y(1, ki), Y(2, Gs) ], Yr);

Ot("hide")(Yr);

Le("show")(Yr);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.ri = i.document.createElement("div");
        this.view = t.create();
        Os(this.view.nodes, e);
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
        if (ft(s)) s.catch((t => {
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
        if (gt(i)) {
            let n = e;
            if (gt(s)) s = e.querySelector(s);
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

Portal.inject = [ _i, Ds, ki ];

Q([ xt({
    primary: true
}) ], Portal.prototype, "target", void 0);

Q([ xt({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

Q([ xt() ], Portal.prototype, "strict", void 0);

Q([ xt() ], Portal.prototype, "deactivating", void 0);

Q([ xt() ], Portal.prototype, "activating", void 0);

Q([ xt() ], Portal.prototype, "deactivated", void 0);

Q([ xt() ], Portal.prototype, "activated", void 0);

Q([ xt() ], Portal.prototype, "callbackContext", void 0);

Oe("portal")(Portal);

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

If.inject = [ _i, Ds ];

Q([ xt ], If.prototype, "value", void 0);

Q([ xt({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Oe("if")(If);

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

Else.inject = [ _i ];

Oe({
    name: "else"
})(Else);

function Zr(t) {
    t.dispose();
}

const Jr = [ 18, 17 ];

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
                while (null != t && Jr.includes(t.$kind)) {
                    t = t.expression;
                    this.wi = true;
                }
                this.xi = t;
                break;
            }
        }
        this.Ri();
        const h = o.declaration;
        if (!(this.ki = 24 === h.$kind || 25 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
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
        if (ft(e)) e.catch(vt);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.wi) {
            if (this.bi) return;
            this.bi = true;
            this.items = this.forOf.iterable.evaluate(i.scope, this.Ai, null);
            this.bi = false;
            return;
        }
        this.Si();
        if (void 0 === e) {
            const t = b(this.Ei(null), (() => this.Bi(null)));
            if (ft(t)) t.catch(vt);
        } else {
            const t = this.views.length;
            const i = H(e);
            if (i.deletedIndices.length > 0) {
                const e = b(this.Ii(i), (() => this.Ti(t, i)));
                if (ft(e)) e.catch(vt);
            } else this.Ti(t, i);
        }
    }
    Ri() {
        const t = this.$controller.scope;
        let e = this.Di;
        let i = this.wi;
        let s;
        if (i) {
            e = this.Di = this.xi.evaluate(t, this.Ai, null) ?? null;
            i = this.wi = !Object.is(this.items, e);
        }
        const n = this.vi;
        if (this.$controller.isActive) {
            s = this.vi = W(i ? e : this.items);
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
        if (dt(t)) {
            this.yi = t;
            return;
        }
        const e = [];
        ho(t, ((t, i) => {
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
        const f = lo(c);
        const d = this.views = Array(f);
        ho(c, ((c, m) => {
            s = d[m] = o.create().setLocation(h);
            s.nodes.unlink();
            if (this.ki) u.declaration.assign(n = P.fromParent(a, new G), this.Ai, c); else n = P.fromParent(a, new G(l, c));
            ro(n.overrideContext, m, f);
            i = s.activate(t ?? s, r, 0, n);
            if (ft(i)) (e ?? (e = [])).push(i);
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
            if (ft(i)) (e ?? (e = [])).push(i);
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
            if (ft(i)) (e ?? (e = [])).push(i);
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
        if (f.length !== d) throw no(f.length, d);
        const m = l.scope;
        const g = e.length;
        z(f, e);
        const p = so(e);
        const v = p.length;
        let w;
        let b = v - 1;
        o = g - 1;
        for (;o >= 0; --o) {
            n = f[o];
            w = f[o + 1];
            n.nodes.link(w?.nodes ?? u);
            if (-2 === e[o]) {
                if (this.ki) this.forOf.declaration.assign(r = P.fromParent(m, new G), this.Ai, a[o]); else r = P.fromParent(m, new G(c, a[o]));
                ro(r.overrideContext, o, g);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (ft(s)) (i ?? (i = [])).push(s);
            } else if (b < 0 || 1 === v || o !== p[b]) {
                ro(n.scope.overrideContext, o, g);
                n.nodes.insertBefore(n.location);
            } else {
                if (t !== g) ro(n.scope.overrideContext, o, g);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(Zr);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ Ds, us, _i ];

Q([ xt ], Repeat.prototype, "items", void 0);

Oe("repeat")(Repeat);

let to = 16;

let eo = new Int32Array(to);

let io = new Int32Array(to);

function so(t) {
    const e = t.length;
    if (e > to) {
        to = e;
        eo = new Int32Array(e);
        io = new Int32Array(e);
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
            o = eo[i];
            n = t[o];
            if (-2 !== n && n < s) {
                io[r] = o;
                eo[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                c = l + h >> 1;
                n = t[eo[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[eo[l]];
            if (s < n || -2 === n) {
                if (l > 0) io[r] = eo[l - 1];
                eo[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = eo[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = io[s];
    }
    while (r-- > 0) eo[r] = 0;
    return a;
}

const no = (t, e) => new Error(`AUR0814:${t}!=${e}`);

const ro = (t, e, i) => {
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

const oo = Object.prototype.toString;

const lo = t => {
    switch (oo.call(t)) {
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
        throw new Error(`Cannot count ${oo.call(t)}`);
    }
};

const ho = (t, e) => {
    switch (oo.call(t)) {
      case "[object Array]":
        return co(t, e);

      case "[object Map]":
        return ao(t, e);

      case "[object Set]":
        return uo(t, e);

      case "[object Number]":
        return fo(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw new Error(`Cannot iterate over ${oo.call(t)}`);
    }
};

const co = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const ao = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const uo = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const fo = (t, e) => {
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
            r = P.fromParent(s.scope, void 0 === t ? {} : t);
            for (l = n.length; l > o; ++o) n[o].$bind(r);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const r = P.fromParent(s.scope, void 0 === n ? {} : n);
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

With.inject = [ _i, Ds ];

Q([ xt ], With.prototype, "value", void 0);

Oe("with")(With);

let mo = class Switch {
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

Q([ xt ], mo.prototype, "value", void 0);

mo = Q([ Oe("switch"), Y(0, _i), Y(1, Ds) ], mo);

let go = 0;

let po = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Oi = e;
        this.l = i;
        this.id = ++go;
        this.fallThrough = false;
        this.view = void 0;
        this.Ui = s.config.level <= 1;
        this.Se = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof mo) {
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
        if (dt(e)) {
            if (void 0 === this.vi) this.vi = this.qi(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (dt(t)) {
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

po.inject = [ _i, L, Ds, k ];

Q([ xt ], po.prototype, "value", void 0);

Q([ xt({
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
}) ], po.prototype, "fallThrough", void 0);

po = Q([ Oe("case") ], po);

let vo = class DefaultCase extends po {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

vo = Q([ Oe("default-case") ], vo);

let wo = class PromiseTemplateController {
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
        return b(s.activate(t, n, i, this.viewScope = P.fromParent(n.scope, {})), (() => this.swap(t, i)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, e) {
        const i = this.value;
        if (!ft(i)) {
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
                if (!(t instanceof X)) throw t;
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

Q([ xt ], wo.prototype, "value", void 0);

wo = Q([ Oe("promise"), Y(0, _i), Y(1, Ds), Y(2, ki), Y(3, k) ], wo);

let bo = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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

Q([ xt({
    mode: 2
}) ], bo.prototype, "value", void 0);

bo = Q([ Oe("pending"), Y(0, _i), Y(1, Ds) ], bo);

let xo = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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

Q([ xt({
    mode: 4
}) ], xo.prototype, "value", void 0);

xo = Q([ Oe("then"), Y(0, _i), Y(1, Ds) ], xo);

let yo = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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

Q([ xt({
    mode: 4
}) ], yo.prototype, "value", void 0);

yo = Q([ Oe("catch"), Y(0, _i), Y(1, Ds) ], yo);

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

Co = Q([ Vt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Co);

let Ao = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Ao = Q([ Vt({
    pattern: "then",
    symbols: ""
}) ], Ao);

let Ro = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Ro = Q([ Vt({
    pattern: "catch",
    symbols: ""
}) ], Ro);

function So(t, e, i, s) {
    if (gt(e)) return Bo(t, e, i, s);
    if (ui(e)) return Eo(t, e, i, s);
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
            name: hi(),
            template: this.node,
            needsCompile: gt(this.node),
            instructions: this.instructions,
            dependencies: this.ji
        });
        return this.Fi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Xi).getViewFactory(this.definition, t.createChild().register(...this.ji));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.ji);
    }
}

function Bo(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (Xs(e)) {
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
    const n = mi(e);
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
        if (Xs(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
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
        this._i = e;
        this.Mi = i;
        this.r = s;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Vi = void 0;
        this.Ni = e.props.reduce(To, {});
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
        if (ft(n)) n.catch((t => {
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
            if (Do(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (gt(t)) {
            const e = i.find(vi, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return So(this.p, t, this.Ni, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ ki, Gs, fs, Xi ];

Q([ xt ], AuRender.prototype, "component", void 0);

Q([ xt({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

Xe({
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
        this.zi = void 0;
        this.r = t.get(Xi);
        this._i = r;
        this.Gi = o;
    }
    static get inject() {
        return [ g, us, Is, Ds, ki, Gs, R(CompositionContextFactory) ];
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
                return new CompositionController(n, (t => n.activate(t ?? n, c, 1, c.scope.parentScope)), (t => b(n.deactivate(t ?? n, c, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: vi.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, c);
                const l = "auto" === this.scopeBehavior ? P.fromParent(this.parent.scope, e) : P.create(e);
                if (qs(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, c, 1, l)), (t => o.deactivate(t ?? o, c, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return b(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = qs(i);
        t.registerResolver(s.Element, t.registerResolver(Is, new v("ElementResolver", n ? null : i)));
        t.registerResolver(Ds, new v("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        t.registerResolver(e, new v("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = mt(t) ? t : t?.constructor;
        return vi.isType(e) ? vi.getDefinition(e) : null;
    }
}

Q([ xt ], AuCompose.prototype, "view", void 0);

Q([ xt ], AuCompose.prototype, "viewModel", void 0);

Q([ xt ], AuCompose.prototype, "model", void 0);

Q([ xt({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Xe("au-compose")(AuCompose);

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
        if (ft(this.view) || ft(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        return [ Ds, Gs, fs, Xi ];
    }
    binding(t, e, i) {
        this.Ki = this.$controller.scope.parentScope;
        let s;
        if (this.Yi) {
            s = this.Mi.controller.scope.parentScope;
            (this.Qi = P.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.Ki.bindingContext;
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

Q([ xt ], AuSlot.prototype, "expose", void 0);

Xe({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const Po = o.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

let $o = class SanitizeValueConverter {
    constructor(t) {
        this.Zi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Zi.sanitize(t);
    }
};

$o = Q([ Y(0, Po) ], $o);

ne("sanitize")($o);

let Lo = class ViewValueConverter {
    constructor(t) {
        this.Ji = t;
    }
    toView(t, e) {
        return this.Ji.getViewComponentForObject(t, e);
    }
};

Lo = Q([ Y(0, Gi) ], Lo);

ne("view")(Lo);

const Oo = DebounceBindingBehavior;

const Uo = OneTimeBindingBehavior;

const qo = ToViewBindingBehavior;

const jo = FromViewBindingBehavior;

const Fo = SignalBindingBehavior;

const _o = ThrottleBindingBehavior;

const Mo = TwoWayBindingBehavior;

const Vo = TemplateCompiler;

const No = NodeObserverLocator;

const Ho = [ Vo, No ];

const Wo = SVGAnalyzer;

const zo = Qt;

const Go = Kt;

const Xo = Xt;

const Ko = Gt;

const Qo = Yt;

const Yo = [ Xo, Ko, Qo ];

const Zo = [ zo, Go ];

const Jo = zn;

const tl = Wn;

const el = Gn;

const il = Nn;

const sl = Mn;

const nl = Vn;

const rl = Hn;

const ol = tr;

const ll = Xn;

const hl = Kn;

const cl = Qn;

const al = Yn;

const ul = Jn;

const fl = Zn;

const dl = er;

const ml = [ tl, sl, il, nl, rl, Jo, el, ol, ll, hl, cl, ul, fl, al, dl ];

const gl = $o;

const pl = Lo;

const vl = If;

const wl = Else;

const bl = Repeat;

const xl = With;

const yl = mo;

const kl = po;

const Cl = vo;

const Al = wo;

const Rl = bo;

const Sl = xo;

const Bl = yo;

const El = Co;

const Il = Ao;

const Tl = Ro;

const Dl = AttrBindingBehavior;

const Pl = SelfBindingBehavior;

const $l = UpdateTriggerBindingBehavior;

const Ll = AuRender;

const Ol = AuCompose;

const Ul = Portal;

const ql = Focus;

const jl = Yr;

const Fl = [ Oo, Uo, qo, jo, Fo, _o, Mo, gl, pl, vl, wl, bl, xl, yl, kl, Cl, Al, Rl, Sl, Bl, El, Il, Tl, Dl, Pl, $l, Ll, Ol, Ul, ql, jl, AuSlot ];

const _l = hn;

const Ml = rn;

const Vl = nn;

const Nl = an;

const Hl = fn;

const Wl = ln;

const zl = un;

const Gl = cn;

const Xl = sn;

const Kl = on;

const Ql = vn;

const Yl = kn;

const Zl = wn;

const Jl = bn;

const th = xn;

const eh = yn;

const ih = pn;

const sh = Cn;

const nh = [ zl, Hl, _l, Gl, Nl, Xl, Vl, Ml, Kl, Wl, Ql, Yl, Zl, Jl, th, eh, ih, sh ];

const rh = oh(n);

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
            return e.register(Pt($, i.coercingOptions), ...Ho, ...Fl, ...Yo, ...ml, ...nh);
        },
        customize(e) {
            return oh(e ?? t);
        }
    };
}

const lh = o.createInterface("IAurelia");

class Aurelia {
    constructor(t = o.createContainer()) {
        this.container = t;
        this.ir = false;
        this.ts = false;
        this.es = false;
        this.ss = void 0;
        this.next = void 0;
        this.rs = void 0;
        this.os = void 0;
        if (t.has(lh, true)) throw new Error(`AUR0768`);
        t.registerResolver(lh, new v("IAurelia", this));
        t.registerResolver(Ss, this.ls = new v("IAppRoot"));
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
        if (mt(r)) {
            i.registerResolver(n.HTMLElement, i.registerResolver(n.Element, i.registerResolver(Is, new v("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        i.registerResolver(Ts, new v("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: hi(),
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
        if (!this.container.has(ki, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new K(t.ownerDocument.defaultView);
            this.container.register(Pt(ki, e));
        } else e = this.container.get(ki);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (ft(this.rs)) return this.rs;
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
        if (ft(this.os)) return this.os;
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

var hh;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(hh || (hh = {}));

var ch;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(ch || (ch = {}));

const ah = o.createInterface("IDialogService");

const uh = o.createInterface("IDialogController");

const fh = o.createInterface("IDialogDomRenderer");

const dh = o.createInterface("IDialogDom");

const mh = o.createInterface("IDialogGlobalSettings");

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

var gh;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(gh || (gh = {}));

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
        return [ ki, g ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(fh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(Ts, true) ? e.get(Ts) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(Pt(Ts, o));
        e.register(Pt(Is, c), Pt(dh, l));
        return new Promise((s => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(e, t, c), {
                $dialog: this
            });
            s(n.canActivate?.(i) ?? true);
        })).then((r => {
            if (true !== r) {
                l.dispose();
                if (n) throw ph(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const o = this.cmp;
            return b(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: vi.generateName(),
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
                    if (l) throw ph(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return b(r.deactivate?.(h), (() => b(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this.Lt(h); else this.Et(ph(e, "Dialog cancelled with a rejection on cancel"));
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
        const e = vh(t);
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
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(Is, new v("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = mt(t) ? t : t?.constructor;
        return vi.isType(e) ? vi.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function ph(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function vh(t) {
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
        return [ g, ki, mh ];
    }
    static register(t) {
        t.register(Tt(ah, this), ke.deactivating(ah, (t => b(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return bh(new Promise((e => {
            const i = DialogSettings.from(this.gs, t);
            const s = i.container ?? this.dt.createChild();
            e(b(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(Pt(uh, e));
                s.register($t(DialogController, (() => {
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
        const i = xh(e);
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
        })), mt(i) ? b(i(), (e => {
            t.template = e;
        })) : void 0);
        return ft(s) ? s.then((() => t)) : t;
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

function wh(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function bh(t) {
    t.whenClosed = wh;
    return t;
}

function xh(t) {
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
        Tt(mh, this).register(t);
    }
}

const yh = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${yh} display:flex;`;
        this.overlayCss = yh;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        Tt(fh, this).register(t);
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

DefaultDialogDomRenderer.inject = [ ki ];

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

function kh(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, ke.creating((() => t(i.get(mh))))),
        customize(t, i) {
            return kh(t, i ?? e);
        }
    };
}

const Ch = kh((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(Tt(mh, this));
    }
} ]);

const Ah = kh(n, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Rh = o.createInterface((t => t.singleton(WcCustomElementRegistry)));

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
            s = vi.isType(e) ? vi.getDefinition(e) : CustomElementDefinition.create(vi.generateName(), e);
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
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(Is, new v("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                Es(this, e.key, n);
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

WcCustomElementRegistry.inject = [ g, ki, Xi ];

export { AdoptedStyleSheetsStyles, AppRoot, ke as AppTask, Qt as AtPrefixedTriggerAttributePattern, zo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, Dl as AttrBindingBehaviorRegistration, Yn as AttrBindingCommand, al as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, Yl as AttributeBindingRendererRegistration, AttributeNSAccessor, zt as AttributePattern, AuCompose, AuRender, Ll as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Ct as Bindable, BindableDefinition, BindableObserver, BindablesInfo, se as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorFactory, Zt as BindingBehaviorStrategy, _n as BindingCommand, BindingCommandDefinition, BindingInterceptor, hh as BindingMode, BindingModeBehavior, CSSModulesProcessorRegistry, CallBinding, zn as CallBindingCommand, Jo as CallBindingCommandRegistration, CallBindingInstruction, _l as CallBindingRendererRegistration, Qn as CaptureBindingCommand, cl as CaptureBindingCommandRegistration, po as Case, CheckedObserver, Be as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, Jn as ClassBindingCommand, ul as ClassBindingCommandRegistration, Kt as ColonPrefixedBindAttributePattern, Go as ColonPrefixedBindAttributePatternRegistration, On as CommandType, ComputedWatcher, Controller, Ne as CustomAttribute, CustomAttributeDefinition, Ml as CustomAttributeRendererRegistration, vi as CustomElement, CustomElementDefinition, Vl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Oo as DebounceBindingBehaviorRegistration, Wn as DefaultBindingCommand, tl as DefaultBindingCommandRegistration, ml as DefaultBindingLanguage, Yo as DefaultBindingSyntax, vo as DefaultCase, Ho as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, nh as DefaultRenderers, Fl as DefaultResources, ch as DefinitionType, Kn as DelegateBindingCommand, hl as DelegateBindingCommandRegistration, Ks as DelegationStrategy, DialogCloseResult, Ch as DialogConfiguration, DialogController, gh as DialogDeactivationStatuses, Ah as DialogDefaultConfiguration, DialogOpenResult, DialogService, Gt as DotSeparatedAttributePattern, Ko as DotSeparatedAttributePatternRegistration, Else, wl as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, FlushQueue, Focus, Gn as ForBindingCommand, el as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, jo as FromViewBindingBehaviorRegistration, Nn as FromViewBindingCommand, il as FromViewBindingCommandRegistration, xo as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, Ss as IAppRoot, ye as IAppTask, nr as IAttrMapper, Mt as IAttributeParser, _t as IAttributePattern, Ws as IAuSlotsInfo, lh as IAurelia, us as IController, uh as IDialogController, dh as IDialogDom, fh as IDialogDomRenderer, mh as IDialogGlobalSettings, ah as IDialogService, Ns as IEventDelegator, Ts as IEventTarget, ae as IFlushQueue, _s as IHistory, fs as IHydrationContext, Gs as IInstruction, Oi as ILifecycleHooks, Fs as ILocation, Is as INode, No as INodeObserverLocatorRegistration, ki as IPlatform, Hs as IProjections, Ds as IRenderLocation, Ys as IRenderer, Xi as IRendering, ir as ISVGAnalyzer, Po as ISanitizer, Ii as IShadowDOMGlobalStyles, Ei as IShadowDOMStyles, qt as ISyntaxInterpreter, Qs as ITemplateCompiler, kr as ITemplateCompilerHooks, Vo as ITemplateCompilerRegistration, lr as ITemplateElementFactory, _i as IViewFactory, Gi as IViewLocator, Rh as IWcElementRegistry, js as IWindow, If, vl as IfRegistration, zs as InstructionType, InterpolationBinding, Nl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Hl as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Wl as LetElementRendererRegistration, Ki as LifecycleFlags, ji as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, Ql as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, Ps as NodeType, NoopSVGAnalyzer, OneTimeBindingBehavior, Uo as OneTimeBindingBehaviorRegistration, Mn as OneTimeBindingCommand, sl as OneTimeBindingCommandRegistration, bo as PendingTemplateController, Portal, wo as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, zl as PropertyBindingRendererRegistration, Xt as RefAttributePattern, Xo as RefAttributePatternRegistration, RefBinding, ol as RefBindingCommandRegistration, RefBindingInstruction, Gl as RefBindingRendererRegistration, yo as RejectedTemplateController, RenderPlan, Rendering, Repeat, bl as RepeatRegistration, SVGAnalyzer, Wo as SVGAnalyzerRegistration, $o as SanitizeValueConverter, gl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, Pl as SelfBindingBehaviorRegistration, SetAttributeInstruction, Zl as SetAttributeRendererRegistration, SetClassAttributeInstruction, Jl as SetClassAttributeRendererRegistration, SetPropertyInstruction, Xl as SetPropertyRendererRegistration, SetStyleAttributeInstruction, th as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, Zo as ShortHandBindingSyntax, SignalBindingBehavior, Fo as SignalBindingBehaviorRegistration, rh as StandardConfiguration, cs as State, StyleAttributeAccessor, Zn as StyleBindingCommand, fl as StyleBindingCommandRegistration, Ti as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, eh as StylePropertyBindingRendererRegistration, mo as Switch, TemplateCompiler, Rr as TemplateCompilerHooks, Kl as TemplateControllerRendererRegistration, TextBindingInstruction, ih as TextBindingRendererRegistration, ThrottleBindingBehavior, _o as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, qo as ToViewBindingBehaviorRegistration, Vn as ToViewBindingCommand, nl as ToViewBindingCommandRegistration, Xn as TriggerBindingCommand, ll as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Mo as TwoWayBindingBehaviorRegistration, Hn as TwoWayBindingCommand, rl as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, $l as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, le as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, hs as ViewModelKind, Lo as ViewValueConverter, pl as ViewValueConverterRegistration, Wi as Views, Ge as Watch, WcCustomElementRegistry, With, xl as WithRegistration, Ot as alias, It as allResources, gn as applyBindingBehavior, he as astEvaluator, Vt as attributePattern, xt as bindable, Jt as bindingBehavior, Un as bindingCommand, yi as capture, Ae as children, At as coercer, Qe as containerless, Us as convertToRenderLocation, So as createElement, Ri as cssModules, Le as customAttribute, Xe as customElement, Ls as getEffectiveParentNode, Bs as getRef, rs as isCustomElementController, os as isCustomElementViewModel, Xs as isInstruction, qs as isRenderLocation, Fi as lifecycleHooks, bi as processContent, Ut as registerAliases, Zs as renderer, Os as setEffectiveParentNode, Es as setRef, Si as shadowCSS, Ze as strict, Sr as templateCompilerHooks, Oe as templateController, Ke as useShadowDOM, ne as valueConverter, zi as view, He as watch };
//# sourceMappingURL=index.mjs.map
