"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/metadata");

var s = require("@aurelia/runtime");

var i = require("@aurelia/platform");

var n = require("@aurelia/platform-browser");

function r(t, e, s, i) {
    var n = arguments.length, r = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, s) : i, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, s, i); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, s, r) : o(e, s)) || r;
    return n > 3 && r && Object.defineProperty(e, s, r), r;
}

function o(t, e) {
    return function(s, i) {
        e(s, i, t);
    };
}

const l = e.Metadata.getOwn;

const h = e.Metadata.hasOwn;

const c = e.Metadata.define;

const {annotation: a, resource: u} = t.Protocol;

const f = a.keyFor;

const d = u.keyFor;

const p = u.appendTo;

const m = a.appendTo;

const x = a.getKeys;

const g = () => Object.create(null);

const v = Object.prototype.hasOwnProperty;

const w = g();

const b = (t, e, s) => {
    if (true === w[e]) return true;
    if (!A(e)) return false;
    const i = e.slice(0, 5);
    return w[e] = "aria-" === i || "data-" === i || s.isStandardSvgAttribute(t, e);
};

const y = t => t instanceof Promise;

const k = t => t instanceof Array;

const C = t => "function" === typeof t;

const A = t => "string" === typeof t;

const R = Object.defineProperty;

const S = t => {
    throw t;
};

const B = Reflect.defineProperty;

const E = (t, e, s) => {
    B(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
};

function I(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(D, BindableDefinition.create(e, t, s), t.constructor, e);
        m(t.constructor, P.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (A(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function T(t) {
    return t.startsWith(D);
}

const D = f("bindable");

const P = Object.freeze({
    name: D,
    keyFrom: t => `${D}:${t}`,
    from(t, ...e) {
        const s = {};
        const i = Array.isArray;
        function n(e) {
            s[e] = BindableDefinition.create(e, t);
        }
        function r(e, i) {
            s[e] = i instanceof BindableDefinition ? i : BindableDefinition.create(e, t, i);
        }
        function o(t) {
            if (i(t)) t.forEach(n); else if (t instanceof BindableDefinition) s[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => r(e, t[e])));
        }
        e.forEach(o);
        return s;
    },
    for(t) {
        let e;
        const s = {
            add(i) {
                let n;
                let r;
                if (A(i)) {
                    n = i;
                    r = {
                        property: n
                    };
                } else {
                    n = i.property;
                    r = i;
                }
                e = BindableDefinition.create(n, t, r);
                if (!h(D, t, n)) m(t, P.keyFrom(n));
                c(D, e, t, n);
                return s;
            },
            mode(t) {
                e.mode = t;
                return s;
            },
            callback(t) {
                e.callback = t;
                return s;
            },
            attribute(t) {
                e.attribute = t;
                return s;
            },
            primary() {
                e.primary = true;
                return s;
            },
            set(t) {
                e.set = t;
                return s;
            }
        };
        return s;
    },
    getAll(e) {
        const s = D.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        let u;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(T);
            c = h.length;
            for (u = 0; u < c; ++u) i[o++] = l(D, a, h[u].slice(s));
        }
        return i;
    }
});

class BindableDefinition {
    constructor(t, e, s, i, n, r) {
        this.attribute = t;
        this.callback = e;
        this.mode = s;
        this.primary = i;
        this.property = n;
        this.set = r;
    }
    static create(e, s, i = {}) {
        return new BindableDefinition(t.firstDefined(i.attribute, t.kebabCase(e)), t.firstDefined(i.callback, `${e}Changed`), t.firstDefined(i.mode, 2), t.firstDefined(i.primary, false), t.firstDefined(i.property, e), t.firstDefined(i.set, L(e, s, i)));
    }
}

function $(t, e, s) {
    O.define(t, e);
}

const O = {
    key: f("coercer"),
    define(t, e) {
        c(O.key, t[e].bind(t), t);
    },
    for(t) {
        return l(O.key, t);
    }
};

function L(e, s, i = {}) {
    const n = i.type ?? Reflect.getMetadata("design:type", s, e) ?? null;
    if (null == n) return t.noop;
    let r;
    switch (n) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        r = n;
        break;

      default:
        {
            const e = n.coerce;
            r = "function" === typeof e ? e.bind(n) : O.for(n) ?? t.noop;
            break;
        }
    }
    return r === t.noop ? r : q(r, i.nullable);
}

function q(t, e) {
    return function(s, i) {
        if (!i?.enableCoercion) return s;
        return (e ?? (i?.coerceNullish ?? false ? false : true)) && null == s ? s : t(s, i);
    };
}

class BindableObserver {
    constructor(e, s, i, n, r, o) {
        this.set = n;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        const l = e[i];
        const h = e.propertyChanged;
        const c = this.i = C(l);
        const a = this.u = C(h);
        const u = this.hs = n !== t.noop;
        let f;
        this.o = e;
        this.k = s;
        this.cb = c ? l : t.noop;
        this.C = a ? h : t.noop;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
            this.iO = true;
            f = e[s];
            this.v = u && void 0 !== f ? n(f, this.t) : f;
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
        U = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, U);
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

s.subscriberCollection(BindableObserver);

s.withFlushQueue(BindableObserver);

let U;

const j = function(e) {
    function s(e, i, n) {
        t.DI.inject(s)(e, i, n);
    }
    s.$isResolver = true;
    s.resolve = function(t, s) {
        if (s.root === s) return s.get(e);
        return s.has(e, false) ? s.get(e) : s.root.get(e);
    };
    return s;
};

const _ = function(e) {
    function s(e, i, n) {
        t.DI.inject(s)(e, i, n);
    }
    s.$isResolver = true;
    s.resolve = function(t, s) {
        if (s.root === s) return s.getAll(e, false);
        return s.has(e, false) ? s.getAll(e, false).concat(s.root.getAll(e, false)) : s.root.getAll(e, false);
    };
    return s;
};

const F = t.Registration.singleton;

const M = t.Registration.aliasTo;

const V = t.Registration.instance;

const N = t.Registration.callback;

const H = t.Registration.transient;

function W(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) c(s, t, e); else i.push(...t);
    };
}

function z(e, s, i, n) {
    for (let r = 0, o = e.length; r < o; ++r) t.Registration.aliasTo(i, s.keyFrom(e[r])).register(n);
}

class CharSpec {
    constructor(t, e, s, i) {
        this.chars = t;
        this.repeat = e;
        this.isSymbol = s;
        this.isInverted = i;
        if (i) switch (t.length) {
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
        this.parts = t.emptyArray;
        this.O = "";
        this.L = {};
        this.q = {};
    }
    get pattern() {
        const t = this.O;
        if ("" === t) return null; else return t;
    }
    set pattern(e) {
        if (null == e) {
            this.O = "";
            this.parts = t.emptyArray;
        } else {
            this.O = e;
            this.parts = this.q[e];
        }
    }
    append(t, e) {
        const s = this.L;
        if (void 0 === s[t]) s[t] = e; else s[t] += e;
    }
    next(t) {
        const e = this.L;
        let s;
        if (void 0 !== e[t]) {
            s = this.q;
            if (void 0 === s[t]) s[t] = [ e[t] ]; else s[t].push(e[t]);
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
        const s = e.length;
        let i = null;
        let n = 0;
        for (;n < s; ++n) {
            i = e[n];
            if (t.equals(i.charSpec)) return i;
        }
        return null;
    }
    append(t, e) {
        const s = this.patterns;
        if (!s.includes(e)) s.push(e);
        let i = this.findChild(t);
        if (null == i) {
            i = new AttrParsingState(t, e);
            this.nextStates.push(i);
            if (t.repeat) i.nextStates.push(i);
        }
        return i;
    }
    findMatches(t, e) {
        const s = [];
        const i = this.nextStates;
        const n = i.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = i[l];
            if (o.charSpec.has(t)) {
                s.push(o);
                r = o.patterns.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.patterns[h]); else for (;h < r; ++h) e.append(o.patterns[h], t);
            }
        }
        return s;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.len = t.length;
        const s = this.specs = [];
        let i = 0;
        for (;e > i; ++i) s.push(new CharSpec(t[i], false, false, false));
    }
    eachChar(t) {
        const e = this.len;
        const s = this.specs;
        let i = 0;
        for (;e > i; ++i) t(s[i]);
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

const G = t.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

class SyntaxInterpreter {
    constructor() {
        this.rootState = new AttrParsingState(null);
        this.initialStates = [ this.rootState ];
    }
    add(t) {
        t = t.slice(0).sort(((t, e) => t.pattern > e.pattern ? 1 : -1));
        const e = t.length;
        let s;
        let i;
        let n;
        let r;
        let o;
        let l;
        let h;
        let c = 0;
        let a;
        while (e > c) {
            s = this.rootState;
            i = t[c];
            n = i.pattern;
            r = new SegmentTypes;
            o = this.parse(i, r);
            l = o.length;
            h = t => {
                s = s.append(t, n);
            };
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            s.types = r;
            s.isEndpoint = true;
            ++c;
        }
    }
    interpret(t) {
        const e = new Interpretation;
        const s = t.length;
        let i = this.initialStates;
        let n = 0;
        let r;
        for (;n < s; ++n) {
            i = this.getNextStates(i, t.charAt(n), e);
            if (0 === i.length) break;
        }
        i = i.filter(X);
        if (i.length > 0) {
            i.sort(K);
            r = i[0];
            if (!r.charSpec.isSymbol) e.next(r.pattern);
            e.pattern = r.pattern;
        }
        return e;
    }
    getNextStates(t, e, s) {
        const i = [];
        let n = null;
        const r = t.length;
        let o = 0;
        for (;o < r; ++o) {
            n = t[o];
            i.push(...n.findMatches(e, s));
        }
        return i;
    }
    parse(t, e) {
        const s = [];
        const i = t.pattern;
        const n = i.length;
        const r = t.symbols;
        let o = 0;
        let l = 0;
        let h = "";
        while (o < n) {
            h = i.charAt(o);
            if (0 === r.length || !r.includes(h)) if (o === l) if ("P" === h && "PART" === i.slice(o, o + 4)) {
                l = o += 4;
                s.push(new DynamicSegment(r));
                ++e.dynamics;
            } else ++o; else ++o; else if (o !== l) {
                s.push(new StaticSegment(i.slice(l, o)));
                ++e.statics;
                l = o;
            } else {
                s.push(new SymbolSegment(i.slice(l, o + 1)));
                ++e.symbols;
                l = ++o;
            }
        }
        if (l !== o) {
            s.push(new StaticSegment(i.slice(l, o)));
            ++e.statics;
        }
        return s;
    }
}

function X(t) {
    return t.isEndpoint;
}

function K(t, e) {
    const s = t.types;
    const i = e.types;
    if (s.statics !== i.statics) return i.statics - s.statics;
    if (s.dynamics !== i.dynamics) return i.dynamics - s.dynamics;
    if (s.symbols !== i.symbols) return i.symbols - s.symbols;
    return 0;
}

class AttrSyntax {
    constructor(t, e, s, i) {
        this.rawName = t;
        this.rawValue = e;
        this.target = s;
        this.command = i;
    }
}

const Y = t.DI.createInterface("IAttributePattern");

const Z = t.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(e, s) {
        this.U = {};
        this.j = e;
        const i = this._ = {};
        const n = s.reduce(((t, e) => {
            const s = et(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), t.emptyArray);
        e.add(n);
    }
    parse(t, e) {
        let s = this.U[t];
        if (null == s) s = this.U[t] = this.j.interpret(t);
        const i = s.pattern;
        if (null == i) return new AttrSyntax(t, e, t, null); else return this._[i][i](t, e, s.parts);
    }
}

AttributeParser.inject = [ G, t.all(Y) ];

function J(...t) {
    return function e(s) {
        return st.define(t, s);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        F(Y, this.Type).register(t);
    }
}

const Q = d("attribute-pattern");

const tt = "attribute-pattern-definitions";

const et = e => t.Protocol.annotation.get(e, tt);

const st = Object.freeze({
    name: Q,
    definitionAnnotationKey: tt,
    define(e, s) {
        const i = new AttributePatternResourceDefinition(s);
        c(Q, i, s);
        p(s, Q);
        t.Protocol.annotation.set(s, tt, e);
        m(s, tt);
        return s;
    },
    getPatternDefinitions: et
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[1]);
    }
    "PART.PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[2]);
    }
};

exports.DotSeparatedAttributePattern = r([ J({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], exports.DotSeparatedAttributePattern);

exports.RefAttributePattern = class RefAttributePattern {
    ref(t, e, s) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "ref");
    }
};

exports.RefAttributePattern = r([ J({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], exports.RefAttributePattern);

exports.ColonPrefixedBindAttributePattern = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "bind");
    }
};

exports.ColonPrefixedBindAttributePattern = r([ J({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ J({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let it = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

it = r([ J({
    pattern: "...$attrs",
    symbols: ""
}) ], it);

exports.BindingBehaviorStrategy = void 0;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(exports.BindingBehaviorStrategy || (exports.BindingBehaviorStrategy = {}));

function nt(t) {
    return function(e) {
        return ht.define(t, e);
    };
}

class BindingBehaviorDefinition {
    constructor(t, e, s, i, n) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
        this.strategy = n;
    }
    static create(e, s) {
        let i;
        let n;
        if (A(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        const r = Object.getPrototypeOf(s) === BindingInterceptor;
        return new BindingBehaviorDefinition(s, t.firstDefined(lt(s, "name"), i), t.mergeArrays(lt(s, "aliases"), n.aliases, s.aliases), ht.keyFrom(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", n, s, (() => r ? 2 : 1)));
    }
    register(e) {
        const {Type: s, key: i, aliases: n, strategy: r} = this;
        switch (r) {
          case 1:
            t.Registration.singleton(i, s).register(e);
            break;

          case 2:
            t.Registration.instance(i, new BindingBehaviorFactory(e, s)).register(e);
            break;
        }
        t.Registration.aliasTo(i, s).register(e);
        z(n, ht, i, e);
    }
}

class BindingBehaviorFactory {
    constructor(e, s) {
        this.ctn = e;
        this.Type = s;
        this.deps = t.DI.getDependencies(s);
    }
    construct(t, e) {
        const s = this.ctn;
        const i = this.deps;
        switch (i.length) {
          case 0:
            return new this.Type(t, e);

          case 1:
            return new this.Type(s.get(i[0]), t, e);

          case 2:
            return new this.Type(s.get(i[0]), s.get(i[1]), t, e);

          default:
            return new this.Type(...i.map((t => s.get(t))), t, e);
        }
    }
}

class BindingInterceptor {
    constructor(t, e) {
        this.binding = t;
        this.expr = e;
        this.type = "instance";
        this.interceptor = this;
        let s;
        while (t.interceptor !== this) {
            s = t.interceptor;
            t.interceptor = this;
            t = s;
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

const rt = [ "isBound", "$scope", "obs", "ast", "locator", "oL" ];

rt.forEach((t => {
    B(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const ot = d("binding-behavior");

const lt = (t, e) => l(f(e), t);

const ht = Object.freeze({
    name: ot,
    keyFrom(t) {
        return `${ot}:${t}`;
    },
    isType(t) {
        return C(t) && h(ot, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(ot, s, s.Type);
        c(ot, s, s);
        p(e, ot);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ot, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: lt
});

function ct(t) {
    return function(e) {
        return ft.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, s, i) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
    }
    static create(e, s) {
        let i;
        let n;
        if (A(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new ValueConverterDefinition(s, t.firstDefined(ut(s, "name"), i), t.mergeArrays(ut(s, "aliases"), n.aliases, s.aliases), ft.keyFrom(i));
    }
    register(e) {
        const {Type: s, key: i, aliases: n} = this;
        t.Registration.singleton(i, s).register(e);
        t.Registration.aliasTo(i, s).register(e);
        z(n, ft, i, e);
    }
}

const at = d("value-converter");

const ut = (t, e) => l(f(e), t);

const ft = Object.freeze({
    name: at,
    keyFrom: t => `${at}:${t}`,
    isType(t) {
        return C(t) && h(at, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(at, s, s.Type);
        c(at, s, s);
        p(e, at);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(at, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ut
});

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e) {
        const s = this.b;
        if (t !== s.ast.evaluate(s.$scope, s, null)) s.updateSource(t);
    }
}

function dt(t, e = true) {
    return s => {
        const i = s.prototype;
        if (null != t) B(i, "strict", {
            enumerable: true,
            get: function() {
                return t;
            }
        });
        B(i, "strictFnCall", {
            enumerable: true,
            get: function() {
                return e;
            }
        });
        E(i, "get", (function(t) {
            return this.locator.get(t);
        }));
        E(i, "getConverter", (function(t) {
            const e = ft.keyFrom(t);
            let s = pt.get(this);
            if (null == s) pt.set(this, s = new ResourceLookup);
            return s[e] ?? (s[e] = this.locator.get(j(e)));
        }));
        E(i, "getBehavior", (function(t) {
            const e = ht.keyFrom(t);
            let s = pt.get(this);
            if (null == s) pt.set(this, s = new ResourceLookup);
            return s[e] ?? (s[e] = this.locator.get(j(e)));
        }));
    };
}

const pt = new WeakMap;

class ResourceLookup {}

class CallBinding {
    constructor(t, e, s, i, n) {
        this.locator = t;
        this.ast = s;
        this.target = i;
        this.targetProperty = n;
        this.interceptor = this;
        this.isBound = false;
        this.targetObserver = e.getAccessor(i, n);
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const s = this.ast.evaluate(this.$scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return s;
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

dt(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.F = false;
        this.o = t;
        this.M = e;
        this.V = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        this.v = t;
        this.F = t !== this.ov;
        this.N();
    }
    N() {
        if (this.F) {
            this.F = false;
            this.ov = this.v;
            switch (this.V) {
              case "class":
                this.o.classList.toggle(this.M, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let e = this.v;
                    if (A(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.M, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.V); else this.o.setAttribute(this.V, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let s = 0, i = t.length; i > s; ++s) {
            const i = t[s];
            if ("attributes" === i.type && i.attributeName === this.M) {
                e = true;
                break;
            }
        }
        if (e) {
            let t;
            switch (this.V) {
              case "class":
                t = this.o.classList.contains(this.M);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.M);
                break;

              default:
                throw new Error(`AUR0651:${this.V}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.F = false;
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.M);
            mt(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) xt(this.o, this);
    }
    flush() {
        wt = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, wt);
    }
}

s.subscriberCollection(AttributeObserver);

s.withFlushQueue(AttributeObserver);

const mt = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(gt)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const xt = (t, e) => {
    const s = t.$eMObs;
    if (s && s.delete(e)) {
        if (0 === s.size) {
            t.$mObs.disconnect();
            t.$mObs = void 0;
        }
        return true;
    }
    return false;
};

const gt = t => {
    t[0].target.$eMObs.forEach(vt, t);
};

function vt(t) {
    t.handleMutation(this);
}

let wt;

const bt = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, s, i, n, r, o, l, h) {
        this.locator = e;
        this.taskQueue = i;
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
        this.H = t;
        this.target = r;
        this.oL = s;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e) {
        if (!this.isBound) return;
        const s = this.mode;
        const i = this.interceptor;
        const n = this.ast;
        const r = this.$scope;
        const o = this.targetObserver;
        const l = 1 !== this.H.state && (4 & o.type) > 0;
        let h = false;
        let c;
        if (1 !== n.$kind || this.obs.count > 1) {
            h = 0 === (1 & s);
            if (h) this.obs.version++;
            t = n.evaluate(r, this, i);
            if (h) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (l) {
                c = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    i.updateTarget(t);
                }), bt);
                c?.cancel();
            } else i.updateTarget(t);
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
        let s = this.targetObserver;
        if (!s) s = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        e = this.ast;
        const i = this.mode;
        const n = this.interceptor;
        let r = false;
        if (i & (2 | 1)) {
            r = (2 & i) > 0;
            n.updateTarget(this.value = e.evaluate(t, this, r ? n : null));
        }
        if (4 & i) s.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n)));
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

s.connectable(AttributeBinding);

dt(true)(AttributeBinding);

const yt = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.locator = e;
        this.taskQueue = i;
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.H = t;
        this.oL = s;
        this.targetObserver = s.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, s, this);
    }
    updateTarget(t) {
        const e = this.partBindings;
        const s = this.ast.parts;
        const i = e.length;
        let n = "";
        let r = 0;
        if (1 === i) n = s[0] + e[0].value + s[1]; else {
            n = s[0];
            for (;i > r; ++r) n += e[r].value + s[r + 1];
        }
        const o = this.targetObserver;
        const l = 1 !== this.H.state && (4 & o.type) > 0;
        let h;
        if (l) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                o.setValue(n, this.target, this.targetProperty);
            }), yt);
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
        const s = e.length;
        let i = 0;
        for (;s > i; ++i) e[i].$bind(t);
        this.updateTarget(void 0);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const t = this.partBindings;
        const e = t.length;
        let s = 0;
        for (;e > s; ++s) t[s].interceptor.$unbind();
        this.task?.cancel();
        this.task = null;
    }
}

dt(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, s, i, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = s;
        this.locator = i;
        this.owner = r;
        this.interceptor = this;
        this.mode = 2;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.ast;
        const s = this.obs;
        const i = 1 === e.$kind && 1 === s.count;
        let n = false;
        if (!i) {
            n = (2 & this.mode) > 0;
            if (n) s.version++;
            t = e.evaluate(this.$scope, this, n ? this.interceptor : null);
            if (n) s.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t);
        }
    }
    handleCollectionChange() {
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

s.connectable(InterpolationPartBinding);

dt(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.locator = e;
        this.taskQueue = i;
        this.p = n;
        this.ast = r;
        this.target = o;
        this.strict = l;
        this.interceptor = this;
        this.mode = 2;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.H = t;
        this.oL = s;
    }
    updateTarget(t) {
        const e = this.target;
        const s = this.p.Node;
        const i = this.value;
        this.value = t;
        if (i instanceof s) i.parentNode?.removeChild(i);
        if (t instanceof s) {
            e.textContent = "";
            e.parentNode?.insertBefore(t, e);
        } else e.textContent = String(t);
    }
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.ast;
        const s = this.obs;
        const i = 1 === e.$kind && 1 === s.count;
        let n = false;
        if (!i) {
            n = (2 & this.mode) > 0;
            if (n) s.version++;
            t = e.evaluate(this.$scope, this, n ? this.interceptor : null);
            if (n) s.clear();
        }
        if (t === this.value) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const r = 1 !== this.H.state;
        if (r) this.queueUpdate(t); else this.updateTarget(t);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.value = this.ast.evaluate(this.$scope, this, (2 & this.mode) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (t instanceof Array) this.observeCollection(t);
        const e = 1 !== this.H.state;
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
        }), yt);
        e?.cancel();
    }
}

s.connectable()(ContentBinding);

dt(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, s, i, n = false) {
        this.locator = t;
        this.ast = s;
        this.targetProperty = i;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.target = null;
        this.oL = e;
        this.W = n;
    }
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.target;
        const s = this.targetProperty;
        const i = e[s];
        this.obs.version++;
        t = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (t !== i) e[s] = t;
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        const t = this.target;
        const e = this.targetProperty;
        const s = t[e];
        this.obs.version++;
        const i = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (i !== s) t[e] = i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        this.target = this.W ? t.bindingContext : t.overrideContext;
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

s.connectable(LetBinding);

dt(true)(LetBinding);

const kt = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, e, s, i, n, r, o, l) {
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
        this.H = t;
        this.G = i;
        this.oL = s;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e) {
        if (!this.isBound) return;
        const s = 1 !== this.H.state && (4 & this.targetObserver.type) > 0;
        const i = this.obs;
        let n = false;
        if (1 !== this.ast.$kind || i.count > 1) {
            n = this.mode > 1;
            if (n) i.version++;
            t = this.ast.evaluate(this.$scope, this, this.interceptor);
            if (n) i.clear();
        }
        if (s) {
            Ct = this.task;
            this.task = this.G.queueTask((() => {
                this.interceptor.updateTarget(t);
                this.task = null;
            }), kt);
            Ct?.cancel();
            Ct = null;
        } else this.interceptor.updateTarget(t);
    }
    handleCollectionChange(t) {
        if (!this.isBound) return;
        const e = 1 !== this.H.state && (4 & this.targetObserver.type) > 0;
        this.obs.version++;
        const s = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (e) {
            Ct = this.task;
            this.task = this.G.queueTask((() => {
                this.interceptor.updateTarget(s);
                this.task = null;
            }), kt);
            Ct?.cancel();
            Ct = null;
        } else this.interceptor.updateTarget(s);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        let e = this.ast;
        if (e.hasBind) e.bind(t, this.interceptor);
        const s = this.oL;
        const i = this.mode;
        let n = this.targetObserver;
        if (!n) {
            if (4 & i) n = s.getObserver(this.target, this.targetProperty); else n = s.getAccessor(this.target, this.targetProperty);
            this.targetObserver = n;
        }
        e = this.ast;
        const r = this.interceptor;
        const o = (2 & i) > 0;
        if (i & (2 | 1)) r.updateTarget(e.evaluate(t, this, o ? r : null));
        if (4 & i) {
            n.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r)));
            if (!o) r.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        Ct = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != Ct) {
            Ct.cancel();
            Ct = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

s.connectable(PropertyBinding);

dt(true, false)(PropertyBinding);

let Ct = null;

class RefBinding {
    constructor(t, e, s) {
        this.locator = t;
        this.ast = e;
        this.target = s;
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

const At = t.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(V(At, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Rt = Object.freeze({
    creating: St("creating"),
    hydrating: St("hydrating"),
    hydrated: St("hydrated"),
    activating: St("activating"),
    activated: St("activated"),
    deactivating: St("deactivating"),
    deactivated: St("deactivated")
});

function St(t) {
    function e(e, s) {
        if (C(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Bt(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(It, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, Tt.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (A(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function Et(t) {
    return t.startsWith(It);
}

const It = f("children-observer");

const Tt = Object.freeze({
    name: It,
    keyFrom: t => `${It}:${t}`,
    from(...t) {
        const e = {};
        function s(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function i(t, s) {
            e[t] = ChildrenDefinition.create(t, s);
        }
        function n(t) {
            if (k(t)) t.forEach(s); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => i(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(e) {
        const s = It.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(Et);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l(It, a, h[t].slice(s));
        }
        return i;
    }
});

const Dt = {
    childList: true
};

class ChildrenDefinition {
    constructor(t, e, s, i, n, r) {
        this.callback = t;
        this.property = e;
        this.options = s;
        this.query = i;
        this.filter = n;
        this.map = r;
    }
    static create(e, s = {}) {
        return new ChildrenDefinition(t.firstDefined(s.callback, `${e}Changed`), t.firstDefined(s.property, e), s.options ?? Dt, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = Pt, r = $t, o = Ot, l) {
        this.controller = t;
        this.obj = e;
        this.propertyKey = s;
        this.query = n;
        this.filter = r;
        this.map = o;
        this.options = l;
        this.observing = false;
        this.children = void 0;
        this.observer = void 0;
        this.callback = e[i];
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
                this.X();
            })))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = t.emptyArray;
        }
    }
    X() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return qt(this.controller, this.query, this.filter, this.map);
    }
}

s.subscriberCollection()(ChildrenObserver);

function Pt(t) {
    return t.host.childNodes;
}

function $t(t, e, s) {
    return !!s;
}

function Ot(t, e, s) {
    return s;
}

const Lt = {
    optional: true
};

function qt(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = me(l, Lt);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

function Ut(t) {
    return function(e) {
        return Ht(t, e);
    };
}

function jt(t) {
    return function(e) {
        return Ht(A(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, s, i, n, r, o, l, h, c) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
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
    static create(e, s) {
        let i;
        let n;
        if (A(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new CustomAttributeDefinition(s, t.firstDefined(Mt(s, "name"), i), t.mergeArrays(Mt(s, "aliases"), n.aliases, s.aliases), Ft(i), t.firstDefined(Mt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, 2), t.firstDefined(Mt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), P.from(s, ...P.getAll(s), Mt(s, "bindables"), s.bindables, n.bindables), t.firstDefined(Mt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(Yt.getAnnotation(s), s.watches), t.mergeArrays(Mt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        H(s, e).register(t);
        M(s, e).register(t);
        z(i, zt, s, t);
    }
}

const _t = d("custom-attribute");

const Ft = t => `${_t}:${t}`;

const Mt = (t, e) => l(f(e), t);

const Vt = t => C(t) && h(_t, t);

const Nt = (t, e) => Bs(t, Ft(e)) ?? void 0;

const Ht = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    c(_t, s, s.Type);
    c(_t, s, s);
    p(e, _t);
    return s.Type;
};

const Wt = t => {
    const e = l(_t, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
    return e;
};

const zt = Object.freeze({
    name: _t,
    keyFrom: Ft,
    isType: Vt,
    for: Nt,
    define: Ht,
    getDefinition: Wt,
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: Mt
});

function Gt(t, e) {
    if (null == t) throw new Error(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!C(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!C(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        Yt.add(l, h);
        if (Vt(l)) Wt(l).watches.push(h);
        if (pe(l)) ge(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Xt = t.emptyArray;

const Kt = f("watch");

const Yt = Object.freeze({
    name: Kt,
    add(t, e) {
        let s = l(Kt, t);
        if (null == s) c(Kt, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(Kt, t) ?? Xt;
    }
});

function Zt(t) {
    return function(e) {
        return de(t, e);
    };
}

function Jt(t) {
    if (void 0 === t) return function(t) {
        fe(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!C(t)) return function(e) {
        fe(e, "shadowOptions", t);
    };
    fe(t, "shadowOptions", {
        mode: "open"
    });
}

function Qt(t) {
    if (void 0 === t) return function(t) {
        te(t);
    };
    te(t);
}

function te(t) {
    const e = l(ce, t);
    if (void 0 === e) {
        fe(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function ee(t) {
    if (void 0 === t) return function(t) {
        fe(t, "isStrictBinding", true);
    };
    fe(t, "isStrictBinding", true);
}

const se = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, s, i, n, r, o, l, h, c, a, u, f, d, p, m, x, g, v, w, b) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
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
        this.containerless = p;
        this.isStrictBinding = m;
        this.shadowOptions = x;
        this.hasSlots = g;
        this.enhance = v;
        this.watches = w;
        this.processContent = b;
    }
    get type() {
        return 1;
    }
    static create(e, s = null) {
        if (null === s) {
            const i = e;
            if (A(i)) throw new Error(`AUR0761:${e}`);
            const n = t.fromDefinitionOrDefault("name", i, ue);
            if (C(i.Type)) s = i.Type; else s = we(t.pascalCase(n));
            return new CustomElementDefinition(s, n, t.mergeArrays(i.aliases), t.fromDefinitionOrDefault("key", i, (() => ae(n))), t.fromDefinitionOrDefault("cache", i, ne), t.fromDefinitionOrDefault("capture", i, oe), t.fromDefinitionOrDefault("template", i, re), t.mergeArrays(i.instructions), t.mergeArrays(i.dependencies), t.fromDefinitionOrDefault("injectable", i, re), t.fromDefinitionOrDefault("needsCompile", i, le), t.mergeArrays(i.surrogates), P.from(s, i.bindables), Tt.from(i.childrenObservers), t.fromDefinitionOrDefault("containerless", i, oe), t.fromDefinitionOrDefault("isStrictBinding", i, oe), t.fromDefinitionOrDefault("shadowOptions", i, re), t.fromDefinitionOrDefault("hasSlots", i, oe), t.fromDefinitionOrDefault("enhance", i, oe), t.fromDefinitionOrDefault("watches", i, he), t.fromAnnotationOrTypeOrDefault("processContent", s, re));
        }
        if (A(e)) return new CustomElementDefinition(s, e, t.mergeArrays(xe(s, "aliases"), s.aliases), ae(e), t.fromAnnotationOrTypeOrDefault("cache", s, ne), t.fromAnnotationOrTypeOrDefault("capture", s, oe), t.fromAnnotationOrTypeOrDefault("template", s, re), t.mergeArrays(xe(s, "instructions"), s.instructions), t.mergeArrays(xe(s, "dependencies"), s.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", s, re), t.fromAnnotationOrTypeOrDefault("needsCompile", s, le), t.mergeArrays(xe(s, "surrogates"), s.surrogates), P.from(s, ...P.getAll(s), xe(s, "bindables"), s.bindables), Tt.from(...Tt.getAll(s), xe(s, "childrenObservers"), s.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", s, oe), t.fromAnnotationOrTypeOrDefault("isStrictBinding", s, oe), t.fromAnnotationOrTypeOrDefault("shadowOptions", s, re), t.fromAnnotationOrTypeOrDefault("hasSlots", s, oe), t.fromAnnotationOrTypeOrDefault("enhance", s, oe), t.mergeArrays(Yt.getAnnotation(s), s.watches), t.fromAnnotationOrTypeOrDefault("processContent", s, re));
        const i = t.fromDefinitionOrDefault("name", e, ue);
        return new CustomElementDefinition(s, i, t.mergeArrays(xe(s, "aliases"), e.aliases, s.aliases), ae(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, s, ne), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, s, oe), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, s, re), t.mergeArrays(xe(s, "instructions"), e.instructions, s.instructions), t.mergeArrays(xe(s, "dependencies"), e.dependencies, s.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, s, re), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, s, le), t.mergeArrays(xe(s, "surrogates"), e.surrogates, s.surrogates), P.from(s, ...P.getAll(s), xe(s, "bindables"), s.bindables, e.bindables), Tt.from(...Tt.getAll(s), xe(s, "childrenObservers"), s.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, s, oe), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, s, oe), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, s, re), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, s, oe), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, s, oe), t.mergeArrays(e.watches, Yt.getAnnotation(s), s.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, s, re));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (se.has(t)) return se.get(t);
        const e = CustomElementDefinition.create(t);
        se.set(t, e);
        c(ce, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            H(s, e).register(t);
            M(s, e).register(t);
            z(i, be, s, t);
        }
    }
}

const ie = {
    name: void 0,
    searchParents: false,
    optional: false
};

const ne = () => 0;

const re = () => null;

const oe = () => false;

const le = () => true;

const he = () => t.emptyArray;

const ce = d("custom-element");

const ae = t => `${ce}:${t}`;

const ue = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const fe = (t, e, s) => {
    c(f(e), s, t);
};

const de = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(ce, s, s.Type);
    c(ce, s, s);
    p(s.Type, ce);
    return s.Type;
};

const pe = t => C(t) && h(ce, t);

const me = (t, e = ie) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = Bs(t, ce);
        if (null === s) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = Bs(t, ce);
            if (null === s) throw new Error(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = Bs(s, ce);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = $s(s);
        }
        if (i) return;
        throw new Error(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = Bs(s, ce);
        if (null !== t) return t;
        s = $s(s);
    }
    throw new Error(`AUR0765`);
};

const xe = (t, e) => l(f(e), t);

const ge = t => {
    const e = l(ce, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const ve = () => {
    const e = function(s, i, n) {
        const r = t.DI.getOrCreateAnnotationParamTypes(s);
        r[n] = e;
        return s;
    };
    e.register = function(t) {
        return {
            resolve(t, s) {
                if (s.has(e, true)) return s.get(e); else return null;
            }
        };
    };
    return e;
};

const we = function() {
    const t = {
        value: "",
        writable: false,
        enumerable: false,
        configurable: true
    };
    const e = {};
    return function(s, i = e) {
        const n = class {};
        t.value = s;
        Reflect.defineProperty(n, "name", t);
        if (i !== e) Object.assign(n.prototype, i);
        return n;
    };
}();

const be = Object.freeze({
    name: ce,
    keyFrom: ae,
    isType: pe,
    for: me,
    define: de,
    getDefinition: ge,
    annotate: fe,
    getAnnotation: xe,
    generateName: ue,
    createInjectable: ve,
    generateType: we
});

const ye = f("processContent");

function ke(t) {
    return void 0 === t ? function(t, e, s) {
        c(ye, Ce(t, e), t);
    } : function(e) {
        t = Ce(e, t);
        const s = l(ce, e);
        if (void 0 !== s) s.processContent = t; else c(ye, t, e);
        return e;
    };
}

function Ce(t, e) {
    if (A(e)) e = t[e];
    if (!C(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function Ae(t) {
    return function(e) {
        const s = C(t) ? t : true;
        fe(e, "capture", s);
        if (pe(e)) ge(e).capture = s;
    };
}

const Re = t.IPlatform;

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.K = {};
        this.Y = 0;
        this.F = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t) {
        this.value = t;
        this.F = t !== this.ov;
        this.N();
    }
    N() {
        if (this.F) {
            this.F = false;
            const t = this.value;
            const e = this.K;
            const s = Se(t);
            let i = this.Y;
            this.ov = t;
            if (s.length > 0) this.Z(s);
            this.Y += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!v.call(e, t) || e[t] !== i) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    Z(t) {
        const e = this.obj;
        const s = t.length;
        let i = 0;
        let n;
        for (;i < s; i++) {
            n = t[i];
            if (0 === n.length) continue;
            this.K[n] = this.Y;
            e.classList.add(n);
        }
    }
}

function Se(e) {
    if (A(e)) return Be(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...Se(e[i]));
            return t;
        } else return t.emptyArray;
    }
    const s = [];
    let i;
    for (i in e) if (Boolean(e[i])) if (i.includes(" ")) s.push(...Be(i)); else s.push(i);
    return s;
}

function Be(e) {
    const s = e.match(/\S+/g);
    if (null === s) return t.emptyArray;
    return s;
}

function Ee(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = Ht({
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
                this.element.className = Se(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ Is ], e));
        t.register(i);
    }
}

function Ie(...t) {
    return new ShadowDOMRegistry(t);
}

const Te = t.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Re))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Pe);
        const s = t.get(Te);
        t.register(V(De, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Re ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Re ];

const De = t.DI.createInterface("IShadowDOMStyles");

const Pe = t.DI.createInterface("IShadowDOMGlobalStyles", (e => e.instance({
    applyTo: t.noop
})));

class AdoptedStyleSheetsStyles {
    constructor(t, e, s, i = null) {
        this.sharedStyles = i;
        this.styleSheets = e.map((e => {
            let i;
            if (e instanceof t.CSSStyleSheet) i = e; else {
                i = s.get(e);
                if (void 0 === i) {
                    i = new t.CSSStyleSheet;
                    i.replaceSync(e);
                    s.set(e, i);
                }
            }
            return i;
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
    constructor(t, e, s = null) {
        this.p = t;
        this.localStyles = e;
        this.sharedStyles = s;
    }
    applyTo(t) {
        const e = this.localStyles;
        const s = this.p;
        for (let i = e.length - 1; i > -1; --i) {
            const n = s.document.createElement("style");
            n.innerHTML = e[i];
            t.prepend(n);
        }
        if (null !== this.sharedStyles) this.sharedStyles.applyTo(t);
    }
}

const $e = {
    shadowDOM(e) {
        return Rt.creating(t.IContainer, (t => {
            if (null != e.sharedStyles) {
                const s = t.get(Te);
                t.register(V(Pe, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: Oe, exit: Le} = s.ConnectableSwitcher;

const {wrap: qe, unwrap: Ue} = s.ProxyObservable;

class ComputedWatcher {
    constructor(t, e, s, i, n) {
        this.obj = t;
        this.$get = s;
        this.cb = i;
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
        const s = this.compute();
        if (!Object.is(s, e)) this.cb.call(t, s, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            Oe(this);
            return this.value = Ue(this.$get.call(void 0, this.useProxy ? qe(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Le(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, s, i, n) {
        this.scope = t;
        this.locator = e;
        this.oL = s;
        this.expression = i;
        this.callback = n;
        this.interceptor = this;
        this.isBound = false;
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const e = this.expression;
        const s = this.obj;
        const i = this.value;
        const n = 1 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = e.evaluate(this.scope, this, this);
            this.obs.clear();
        }
        if (!Object.is(t, i)) {
            this.value = t;
            this.callback.call(s, t, i, s);
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

s.connectable(ComputedWatcher);

dt(true)(ComputedWatcher);

s.connectable(ExpressionWatcher);

dt(true)(ExpressionWatcher);

const je = t.DI.createInterface("ILifecycleHooks");

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
        const s = new Set;
        let i = e.prototype;
        while (i !== Object.prototype) {
            for (const t of Object.getOwnPropertyNames(i)) if ("constructor" !== t) s.add(t);
            i = Object.getPrototypeOf(i);
        }
        return new LifecycleHooksDefinition(e, s);
    }
    register(t) {
        F(je, this.Type).register(t);
    }
}

const _e = new WeakMap;

const Fe = f("lifecycle-hooks");

const Me = Object.freeze({
    name: Fe,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(Fe, s, e);
        p(e, Fe);
        return s.Type;
    },
    resolve(t) {
        let e = _e.get(t);
        if (void 0 === e) {
            _e.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(je) : t.has(je, false) ? s.getAll(je).concat(t.getAll(je)) : s.getAll(je);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(Fe, n.constructor);
                o = new LifecycleHooksEntry(r, n);
                for (h of r.propertyNames) {
                    c = e[h];
                    if (void 0 === c) e[h] = [ o ]; else c.push(o);
                }
            }
        }
        return e;
    }
});

class LifecycleHooksLookupImpl {}

function Ve() {
    return function t(e) {
        return Me.define({}, e);
    };
}

const Ne = t.DI.createInterface("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (A(t)) t = parseInt(t, 10);
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
        let s;
        if (null != e && e.length > 0) {
            s = e.pop();
            return s;
        }
        s = Controller.$view(this, t);
        return s;
    }
}

ViewFactory.maxCacheSize = 65535;

const He = new WeakSet;

function We(t) {
    return !He.has(t);
}

function ze(t) {
    He.add(t);
    return CustomElementDefinition.create(t);
}

const Ge = d("views");

const Xe = Object.freeze({
    name: Ge,
    has(t) {
        return C(t) && (h(Ge, t) || "$views" in t);
    },
    get(t) {
        if (C(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(We).map(ze);
            for (const e of s) Xe.add(t, e);
        }
        let e = l(Ge, t);
        if (void 0 === e) c(Ge, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(Ge, t);
        if (void 0 === i) c(Ge, i = [ s ], t); else i.push(s);
        return i;
    }
});

function Ke(t) {
    return function(e) {
        Xe.add(e, t);
    };
}

const Ye = t.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.J = new WeakMap;
        this.tt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = Xe.has(t.constructor) ? Xe.get(t.constructor) : [];
            const i = C(e) ? e(t, s) : this.et(s, e);
            return this.st(t, s, i);
        }
        return null;
    }
    st(t, e, s) {
        let i = this.J.get(t);
        let n;
        if (void 0 === i) {
            i = {};
            this.J.set(t, i);
        } else n = i[s];
        if (void 0 === n) {
            const r = this.it(t, e, s);
            n = de(ge(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            i[s] = n;
        }
        return n;
    }
    it(t, e, i) {
        let n = this.tt.get(t.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.tt.set(t.constructor, n);
        } else r = n[i];
        if (void 0 === r) {
            r = de(this.nt(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const n = this.viewModel;
                    t.scope = s.Scope.fromParent(t.scope, n);
                    if (void 0 !== n.define) return n.define(t, e, i);
                }
            });
            const o = r.prototype;
            if ("hydrating" in t) o.hydrating = function t(e) {
                this.viewModel.hydrating(e);
            };
            if ("hydrated" in t) o.hydrated = function t(e) {
                this.viewModel.hydrated(e);
            };
            if ("created" in t) o.created = function t(e) {
                this.viewModel.created(e);
            };
            if ("binding" in t) o.binding = function t(e, s, i) {
                return this.viewModel.binding(e, s, i);
            };
            if ("bound" in t) o.bound = function t(e, s, i) {
                return this.viewModel.bound(e, s, i);
            };
            if ("attaching" in t) o.attaching = function t(e, s, i) {
                return this.viewModel.attaching(e, s, i);
            };
            if ("attached" in t) o.attached = function t(e, s) {
                return this.viewModel.attached(e, s);
            };
            if ("detaching" in t) o.detaching = function t(e, s, i) {
                return this.viewModel.detaching(e, s, i);
            };
            if ("unbinding" in t) o.unbinding = function t(e, s, i) {
                return this.viewModel.unbinding(e, s, i);
            };
            if ("dispose" in t) o.dispose = function t() {
                this.viewModel.dispose();
            };
            n[i] = r;
        }
        return r;
    }
    et(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    nt(t, e) {
        const s = t.find((t => t.name === e));
        if (void 0 === s) throw new Error(`Could not find view: ${e}`);
        return s;
    }
}

const Ze = t.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.rt = new WeakMap;
        this.ot = new WeakMap;
        this.p = (this.lt = t.root).get(Re);
        this.ht = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.ct ? this.ct = this.lt.getAll(Xs, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.ct;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.rt;
            const n = e.get(Gs);
            let r = i.get(t);
            if (null == r) i.set(t, r = n.compile(t, e, s)); else e.register(...r.dependencies);
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
        const s = this.ot;
        if (s.has(t)) e = s.get(t); else {
            const i = this.p;
            const n = i.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof i.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (A(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            s.set(t, e);
        }
        return null == e ? this.ht : new FragmentNodeSequence(this.p, e.cloneNode(true));
    }
    render(t, e, s, i) {
        const n = s.instructions;
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
        if (null != i) {
            a = s.surrogates;
            if ((c = a.length) > 0) {
                h = 0;
                while (c > h) {
                    u = a[h];
                    r[u.type].render(t, i, u);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ t.IContainer ];

exports.LifecycleFlags = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(exports.LifecycleFlags || (exports.LifecycleFlags = {}));

var Je;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Je || (Je = {}));

const Qe = {
    optional: true
};

const ts = new WeakMap;

class Controller {
    constructor(e, s, i, n, r, o, l) {
        this.container = e;
        this.vmKind = s;
        this.definition = i;
        this.viewFactory = n;
        this.viewModel = r;
        this.host = o;
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
        this.ut = false;
        this.ft = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.dt = 0;
        this.xt = 0;
        this.gt = 0;
        this.location = l;
        this.r = e.root.get(Ze);
        switch (s) {
          case 1:
          case 0:
            this.hooks = new HooksDefinition(r);
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
        return ts.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(e, s, i, n, r = void 0, o = null) {
        if (ts.has(s)) return ts.get(s);
        r = r ?? ge(s.constructor);
        const l = new Controller(e, 0, r, null, s, i, o);
        const h = e.get(t.optional(fs));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        e.registerResolver(fs, new t.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        ts.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (ts.has(e)) return ts.get(e);
        i = i ?? Wt(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        ts.set(e, n);
        n.vt();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.wt();
        return s;
    }
    hE(e, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.viewModel;
        let l = this.definition;
        this.scope = s.Scope.create(o, null, true);
        if (l.watches.length > 0) os(this, n, l, o);
        ss(this, l, r, o);
        this.ft = is(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Me.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == e || false !== e.hydrate) {
            this.hS(e);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(ms, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.bt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = me(this.host, Qe))) {
            this.host = this.container.root.get(Re).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Ls(this.host);
        }
        Es(this.host, ce, this);
        Es(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw new Error(`AUR0501`);
            Es(this.shadowRoot = this.host.attachShadow(s ?? cs), ce, this);
            Es(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Es(o, ce, this);
            Es(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(xs, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.bt, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ps, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    vt() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) os(this, this.container, t, e);
        ss(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Me.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ps, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    wt() {
        this.bt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.bt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.bt)).findTargets(), this.bt, void 0);
    }
    activate(e, s, i, n) {
        switch (this.state) {
          case 0:
          case 8:
            if (!(null === s || s.isActive)) return;
            this.state = 1;
            break;

          case 2:
            return;

          case 32:
            throw new Error(`AUR0502:${this.name}`);

          default:
            throw new Error(`AUR0503:${this.name} ${as(this.state)}`);
        }
        this.parent = s;
        i |= 1;
        switch (this.vmKind) {
          case 0:
            this.scope.parentScope = n ?? null;
            break;

          case 1:
            this.scope = n ?? null;
            break;

          case 2:
            if (void 0 === n || null === n) throw new Error(`AUR0504`);
            if (!this.hasLockedScope) this.scope = n;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = e;
        this.$flags = i;
        this.yt();
        let r;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) r = t.resolveAll(...this.lifecycleHooks.binding.map(gs, this));
        if (this.hooks.hasBinding) r = t.resolveAll(r, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (y(r)) {
            this.kt();
            r.then((() => {
                this.bind();
            })).catch((t => {
                this.Ct(t);
            }));
            return this.$promise;
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let e = 0;
        let s = this.ft.length;
        let i;
        if (s > 0) while (s > e) {
            this.ft[e].start();
            ++e;
        }
        if (null !== this.bindings) {
            e = 0;
            s = this.bindings.length;
            while (s > e) {
                this.bindings[e].$bind(this.scope);
                ++e;
            }
        }
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = t.resolveAll(...this.lifecycleHooks.bound.map(vs, this));
        if (this.hooks.hasBound) i = t.resolveAll(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (y(i)) {
            this.kt();
            i.then((() => {
                this.isBound = true;
                this.At();
            })).catch((t => {
                this.Ct(t);
            }));
            return;
        }
        this.isBound = true;
        this.At();
    }
    Rt(...t) {
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
    At() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Rt(this.host);
            break;

          case 3:
            this.hostController.Rt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(De, false) ? t.get(De) : t.get(Pe);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        let e = 0;
        let s;
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) s = t.resolveAll(...this.lifecycleHooks.attaching.map(ws, this));
        if (this.hooks.hasAttaching) s = t.resolveAll(s, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (y(s)) {
            this.kt();
            this.yt();
            s.then((() => {
                this.St();
            })).catch((t => {
                this.Ct(t);
            }));
        }
        if (null !== this.children) for (;e < this.children.length; ++e) void this.children[e].activate(this.$initiator, this, this.$flags, this.scope);
        this.St();
    }
    deactivate(e, s, i) {
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
        this.$initiator = e;
        this.$flags = i;
        if (e === this) this.Bt();
        let n = 0;
        let r;
        if (this.ft.length) for (;n < this.ft.length; ++n) this.ft[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(e, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) r = t.resolveAll(...this.lifecycleHooks.detaching.map(ys, this));
        if (this.hooks.hasDetaching) r = t.resolveAll(r, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (y(r)) {
            this.kt();
            e.Bt();
            r.then((() => {
                e.Et();
            })).catch((t => {
                e.Ct(t);
            }));
        }
        if (null === e.head) e.head = this; else e.tail.next = this;
        e.tail = this;
        if (e !== this) return;
        this.Et();
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
        this.It();
    }
    kt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.kt();
        }
    }
    It() {
        if (void 0 !== this.$promise) {
            Cs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Cs();
            Cs = void 0;
        }
    }
    Ct(t) {
        if (void 0 !== this.$promise) {
            As = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            As(t);
            As = void 0;
        }
        if (this.$initiator !== this) this.parent.Ct(t);
    }
    yt() {
        ++this.dt;
        if (this.$initiator !== this) this.parent.yt();
    }
    St() {
        if (0 === --this.dt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Rs = t.resolveAll(...this.lifecycleHooks.attached.map(bs, this));
            if (this.hooks.hasAttached) Rs = t.resolveAll(Rs, this.viewModel.attached(this.$initiator, this.$flags));
            if (y(Rs)) {
                this.kt();
                Rs.then((() => {
                    this.state = 2;
                    this.It();
                    if (this.$initiator !== this) this.parent.St();
                })).catch((t => {
                    this.Ct(t);
                }));
                Rs = void 0;
                return;
            }
            Rs = void 0;
            this.state = 2;
            this.It();
        }
        if (this.$initiator !== this) this.parent.St();
    }
    Bt() {
        ++this.xt;
    }
    Et() {
        if (0 === --this.xt) {
            this.Tt();
            this.removeNodes();
            let e = this.$initiator.head;
            let s;
            while (null !== e) {
                if (e !== this) {
                    if (e.debug) e.logger.trace(`detach()`);
                    e.removeNodes();
                }
                if (2 !== e.vmKind && null != e.lifecycleHooks.unbinding) s = t.resolveAll(...e.lifecycleHooks.unbinding.map(ks, this));
                if (e.hooks.hasUnbinding) {
                    if (e.debug) e.logger.trace("unbinding()");
                    s = t.resolveAll(s, e.viewModel.unbinding(e.$initiator, e.parent, e.$flags));
                }
                if (y(s)) {
                    this.kt();
                    this.Tt();
                    s.then((() => {
                        this.Dt();
                    })).catch((t => {
                        this.Ct(t);
                    }));
                }
                s = void 0;
                e = e.next;
            }
            this.Dt();
        }
    }
    Tt() {
        ++this.gt;
    }
    Dt() {
        if (0 === --this.gt) {
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
            return Wt(this.viewModel.constructor).name === t;

          case 0:
            return ge(this.viewModel.constructor).name === t;

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
            Es(t, ce, this);
            Es(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Es(t, ce, this);
            Es(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Es(t, ce, this);
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
            ts.delete(this.viewModel);
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
            for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
        }
    }
}

function es(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function ss(t, e, i, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const c = es(n);
        const a = t.container;
        const u = a.has(s.ICoercionConfiguration, true) ? a.get(s.ICoercionConfiguration) : null;
        for (;h < l; ++h) {
            e = o[h];
            if (void 0 === c[e]) {
                i = r[e];
                c[e] = new BindableObserver(n, e, i.callback, i.set, t, u);
            }
        }
    }
}

function is(e, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = es(i);
        const s = [];
        let l;
        let h = 0;
        let c;
        for (;h < o; ++h) {
            l = r[h];
            if (null == t[l]) {
                c = n[l];
                s[s.length] = t[l] = new ChildrenObserver(e, i, l, c.callback, c.query, c.filter, c.map, c.options);
            }
        }
        return s;
    }
    return t.emptyArray;
}

const ns = new Map;

const rs = t => {
    let e = ns.get(t);
    if (null == e) {
        e = new s.AccessScopeExpression(t, 0);
        ns.set(t, e);
    }
    return e;
};

function os(t, e, i, n) {
    const r = e.get(s.IObserverLocator);
    const o = e.get(s.IExpressionParser);
    const l = i.watches;
    const h = 0 === t.vmKind ? t.scope : s.Scope.create(n, null, true);
    const c = l.length;
    let a;
    let u;
    let f;
    let d = 0;
    for (;c > d; ++d) {
        ({expression: a, callback: u} = l[d]);
        u = C(u) ? u : Reflect.get(n, u);
        if (!C(u)) throw new Error(`AUR0506:${String(u)}`);
        if (C(a)) t.addBinding(new ComputedWatcher(n, r, a, u, true)); else {
            f = A(a) ? o.parse(a, 8) : rs(a);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function ls(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function hs(t) {
    return e.isObject(t) && pe(t.constructor);
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

const cs = {
    mode: "open"
};

exports.ViewModelKind = void 0;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(exports.ViewModelKind || (exports.ViewModelKind = {}));

exports.State = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(exports.State || (exports.State = {}));

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

const us = t.DI.createInterface("IController");

const fs = t.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function ds(t) {
    t.dispose();
}

function ps(t) {
    t.instance.created(this.viewModel, this);
}

function ms(t) {
    t.instance.hydrating(this.viewModel, this);
}

function xs(t) {
    t.instance.hydrated(this.viewModel, this);
}

function gs(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function vs(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function ws(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function bs(t) {
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

const Ss = t.DI.createInterface("IAppRoot");

class AppRoot {
    constructor(e, s, i, n) {
        this.config = e;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.Pt = void 0;
        this.host = e.host;
        n.prepare(this);
        i.registerResolver(s.HTMLElement, i.registerResolver(s.Element, i.registerResolver(Is, new t.InstanceProvider("ElementResolver", e.host))));
        this.Pt = t.onResolve(this.$t("creating"), (() => {
            const s = e.component;
            const n = i.createChild();
            let r;
            if (pe(s)) r = this.container.get(s); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this.$t("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this.$t("hydrated"), (() => {
                    l.hC();
                    this.Pt = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.Pt, (() => t.onResolve(this.$t("activating"), (() => t.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.$t("activated")))))));
    }
    deactivate() {
        return t.onResolve(this.$t("deactivating"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.$t("deactivated")))));
    }
    $t(e) {
        return t.resolveAll(...this.container.getAll(At).reduce(((t, s) => {
            if (s.slot === e) t.push(s.run());
            return t;
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

function Es(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const Is = t.DI.createInterface("INode");

const Ts = t.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Ss, true)) return t.get(Ss).host;
    return t.get(Re).document;
}))));

const Ds = t.DI.createInterface("IRenderLocation");

exports.NodeType = void 0;

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
})(exports.NodeType || (exports.NodeType = {}));

const Ps = new WeakMap;

function $s(t) {
    if (Ps.has(t)) return Ps.get(t);
    let e = 0;
    let s = t.nextSibling;
    while (null !== s) {
        if (8 === s.nodeType) switch (s.textContent) {
          case "au-start":
            ++e;
            break;

          case "au-end":
            if (0 === e--) return s;
        }
        s = s.nextSibling;
    }
    if (null === t.parentNode && 11 === t.nodeType) {
        const e = me(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return $s(e.host);
    }
    return t.parentNode;
}

function Os(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) Ps.set(s[t], e);
    } else Ps.set(t, e);
}

function Ls(t) {
    if (qs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
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
        const s = e.querySelectorAll(".au");
        let i = 0;
        let n = s.length;
        let r;
        let o = this.targets = Array(n);
        while (n > i) {
            r = s[i];
            if ("AU-M" === r.nodeName) o[i] = Ls(r); else o[i] = r;
            ++i;
        }
        const l = e.childNodes;
        const h = this.childNodes = Array(n = l.length);
        i = 0;
        while (n > i) {
            h[i] = l[i];
            ++i;
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
                let s = this.firstChild;
                let i;
                const n = this.lastChild;
                while (null != s) {
                    i = s.nextSibling;
                    e.insertBefore(s, t);
                    if (s === n) break;
                    s = i;
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
            let s;
            const i = this.lastChild;
            while (null != e) {
                s = e.nextSibling;
                t.appendChild(e);
                if (e === i) break;
                e = s;
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
            let s;
            let i = this.firstChild;
            while (null !== i) {
                s = i.nextSibling;
                t.appendChild(i);
                if (i === e) break;
                i = s;
            }
        }
    }
    addToLinked() {
        const t = this.refNode;
        const e = t.parentNode;
        if (this.isMounted) {
            let s = this.firstChild;
            let i;
            const n = this.lastChild;
            while (null != s) {
                i = s.nextSibling;
                e.insertBefore(s, t);
                if (s === n) break;
                s = i;
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

const Us = t.DI.createInterface("IWindow", (t => t.callback((t => t.get(Re).window))));

const js = t.DI.createInterface("ILocation", (t => t.callback((t => t.get(Us).location))));

const _s = t.DI.createInterface("IHistory", (t => t.callback((t => t.get(Us).history))));

const Fs = {
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
    constructor(t, e, s, i, n, r) {
        this.locator = t;
        this.ast = e;
        this.target = s;
        this.targetEvent = i;
        this.eventDelegator = n;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
        this.Ot = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let s = this.ast.evaluate(this.$scope, this, null);
        delete e.$event;
        if (C(s)) s = s(t);
        if (true !== s && this.Ot.prevent) t.preventDefault();
        return s;
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
        if (0 === this.Ot.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Ts), this.target, this.targetEvent, this, Fs[this.Ot.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = null;
        if (0 === this.Ot.strategy) this.target.removeEventListener(this.targetEvent, this); else {
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

dt(true, true)(Listener);

const Ms = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = Ms) {
        this.Lt = t;
        this.qt = e;
        this.Ot = s;
        this.Ut = 0;
        this.jt = new Map;
        this._t = new Map;
    }
    Ft() {
        if (1 === ++this.Ut) this.Lt.addEventListener(this.qt, this, this.Ot);
    }
    Mt() {
        if (0 === --this.Ut) this.Lt.removeEventListener(this.qt, this, this.Ot);
    }
    dispose() {
        if (this.Ut > 0) {
            this.Ut = 0;
            this.Lt.removeEventListener(this.qt, this, this.Ot);
        }
        this.jt.clear();
        this._t.clear();
    }
    Vt(t) {
        const e = true === this.Ot.capture ? this.jt : this._t;
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = g());
        return s;
    }
    handleEvent(t) {
        const e = true === this.Ot.capture ? this.jt : this._t;
        const s = t.composedPath();
        if (true === this.Ot.capture) s.reverse();
        for (const i of s) {
            const s = e.get(i);
            if (void 0 === s) continue;
            const n = s[this.qt];
            if (void 0 === n) continue;
            if (C(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, s, i) {
        this.Nt = t;
        this.Ht = e;
        this.qt = s;
        t.Ft();
        e[s] = i;
    }
    dispose() {
        this.Nt.Mt();
        this.Ht[this.qt] = void 0;
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
        let s;
        for (s of this.config.events) t.addEventListener(s, e);
    }
    dispose() {
        const {target: t, handler: e} = this;
        let s;
        if (null !== t && null !== e) for (s of this.config.events) t.removeEventListener(s, e);
        this.target = this.handler = null;
    }
}

const Vs = t.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Wt = g();
    }
    addEventListener(t, e, s, i, n) {
        var r;
        const o = (r = this.Wt)[s] ?? (r[s] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, s, n));
        return new DelegateSubscription(l, l.Vt(e), s, i);
    }
    dispose() {
        for (const t in this.Wt) {
            const e = this.Wt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Ns = t.DI.createInterface("IProjections");

const Hs = t.DI.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

exports.InstructionType = void 0;

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
})(exports.InstructionType || (exports.InstructionType = {}));

const Ws = t.DI.createInterface("Instruction");

function zs(t) {
    const e = t.type;
    return A(e) && 2 === e.length;
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
    constructor(t, e, s) {
        this.from = t;
        this.to = e;
        this.mode = s;
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
    constructor(t, e, s, i, n, r) {
        this.res = t;
        this.alias = e;
        this.props = s;
        this.projections = i;
        this.containerless = n;
        this.captures = r;
        this.auSlot = null;
    }
    get type() {
        return "ra";
    }
}

class HydrateAttributeInstruction {
    constructor(t, e, s) {
        this.res = t;
        this.alias = e;
        this.props = s;
    }
    get type() {
        return "rb";
    }
}

class HydrateTemplateController {
    constructor(t, e, s, i) {
        this.def = t;
        this.res = e;
        this.alias = s;
        this.props = i;
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

exports.DelegationStrategy = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(exports.DelegationStrategy || (exports.DelegationStrategy = {}));

class ListenerBindingInstruction {
    constructor(t, e, s, i) {
        this.from = t;
        this.to = e;
        this.preventDefault = s;
        this.strategy = i;
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
    constructor(t, e, s) {
        this.attr = t;
        this.from = e;
        this.to = s;
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

const Gs = t.DI.createInterface("ITemplateCompiler");

const Xs = t.DI.createInterface("IRenderer");

function Ks(t) {
    return function e(s) {
        s.register = function(t) {
            F(Xs, this).register(t);
        };
        R(s.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return s;
    };
}

function Ys(t, e, s) {
    if (A(e)) return t.parse(e, s);
    return e;
}

function Zs(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function Js(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return me(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return me(t).viewModel;

      default:
        {
            const s = Nt(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = me(t, {
                name: e
            });
            if (void 0 === i) throw new Error(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let Qs = class SetPropertyRenderer {
    render(t, e, s) {
        const i = Zs(e);
        if (void 0 !== i.$observers && void 0 !== i.$observers[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

Qs = r([ Ks("re") ], Qs);

let ti = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ze, Re ];
    }
    render(e, s, i) {
        let n;
        let r;
        let o;
        let l;
        const h = i.res;
        const c = i.projections;
        const a = e.container;
        switch (typeof h) {
          case "string":
            n = a.find(be, h);
            if (null == n) throw new Error(`AUR0752:${h}@${e["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? Ls(s) : null;
        const d = Si(this.p, e, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        d.registerResolver(r, new t.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        Es(s, n.key, l);
        const p = this.r.renderers;
        const m = i.props;
        const x = m.length;
        let g = 0;
        let v;
        while (x > g) {
            v = m[g];
            p[v.type].render(e, l, v);
            ++g;
        }
        e.addChild(l);
    }
};

ti = r([ Ks("ra") ], ti);

let ei = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ze, Re ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(zt, s.res);
            if (null == n) throw new Error(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = Bi(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Es(e, n.key, o);
        const l = this.r.renderers;
        const h = s.props;
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

ei = r([ Ks("rb") ], ei);

let si = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ze, Re ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(zt, s.res);
            if (null == n) throw new Error(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = this.r.getViewFactory(s.def, i);
        const o = Ls(e);
        const l = Bi(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Es(o, n.key, h);
        l.vm.link?.(t, h, e, s);
        const c = this.r.renderers;
        const a = s.props;
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

si = r([ Ks("rc") ], si);

let ii = class LetElementRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        e.remove();
        const i = s.instructions;
        const n = s.toBindingContext;
        const r = t.container;
        const o = i.length;
        let l;
        let h;
        let c;
        let a = 0;
        while (o > a) {
            l = i[a];
            h = Ys(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(18 === h.$kind ? ui(c, h, r) : c);
            ++a;
        }
    }
};

ii.inject = [ s.IExpressionParser, s.IObserverLocator ];

ii = r([ Ks("rd") ], ii);

let ni = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, i, Zs(e), s.to);
        t.addBinding(18 === i.$kind ? ui(n, i, t.container) : n);
    }
};

ni.inject = [ s.IExpressionParser, s.IObserverLocator ];

ni = r([ Ks("rh") ], ni);

let ri = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new RefBinding(t.container, i, Js(e, s.to));
        t.addBinding(18 === i.$kind ? ui(n, i, t.container) : n);
    }
};

ri.inject = [ s.IExpressionParser ];

ri = r([ Ks("rj") ], ri);

let oi = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = Ys(this.ep, s.from, 1);
        const r = new InterpolationBinding(t, i, this.oL, this.p.domWriteQueue, n, Zs(e), s.to, 2);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (18 === c.ast.$kind) o[h] = ui(c, c.ast, i);
        }
        t.addBinding(r);
    }
};

oi.inject = [ s.IExpressionParser, s.IObserverLocator, Re ];

oi = r([ Ks("rf") ], oi);

let li = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, Zs(e), s.to, s.mode);
        t.addBinding(18 === i.$kind ? ui(n, i, t.container) : n);
    }
};

li.inject = [ s.IExpressionParser, s.IObserverLocator, Re ];

li = r([ Ks("rg") ], li);

let hi = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, Zs(e), s.to, 2);
        t.addBinding(18 === i.iterable.$kind ? ui(n, i.iterable, t.container) : n);
    }
};

hi.inject = [ s.IExpressionParser, s.IObserverLocator, Re ];

hi = r([ Ks("rk") ], hi);

let ci = 0;

const ai = [];

function ui(t, e, i) {
    while (e instanceof s.BindingBehaviorExpression) {
        ai[ci++] = e;
        e = e.expression;
    }
    while (ci > 0) {
        const e = ai[--ci];
        const s = i.get(ht.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    ai.length = 0;
    return t;
}

let fi = class TextBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = e.nextSibling;
        const r = e.parentNode;
        const o = this.p.document;
        const l = Ys(this.ep, s.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        let p;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            p = c[u];
            d = new ContentBinding(t, i, this.oL, this.p.domWriteQueue, this.p, p, r.insertBefore(o.createTextNode(""), n), s.strict);
            t.addBinding(18 === p.$kind ? ui(d, p, i) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

fi.inject = [ s.IExpressionParser, s.IObserverLocator, Re ];

fi = r([ Ks("ha") ], fi);

let di = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.zt = e;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 4);
        const n = new Listener(t.container, i, e, s.to, this.zt, new ListenerOptions(s.preventDefault, s.strategy));
        t.addBinding(18 === i.$kind ? ui(n, i, t.container) : n);
    }
};

di.inject = [ s.IExpressionParser, Vs ];

di = r([ Ks("hb") ], di);

let pi = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

pi = r([ Ks("he") ], pi);

let mi = class SetClassAttributeRenderer {
    render(t, e, s) {
        bi(e.classList, s.value);
    }
};

mi = r([ Ks("hf") ], mi);

let xi = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

xi = r([ Ks("hg") ], xi);

let gi = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, 2);
        t.addBinding(18 === i.$kind ? ui(n, i, t.container) : n);
    }
};

gi.inject = [ s.IExpressionParser, s.IObserverLocator, Re ];

gi = r([ Ks("hd") ], gi);

let vi = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, 2);
        t.addBinding(18 === i.$kind ? ui(n, i, t.container) : n);
    }
};

vi.inject = [ Re, s.IExpressionParser, s.IObserverLocator ];

vi = r([ Ks("hc") ], vi);

let wi = class SpreadRenderer {
    constructor(t, e) {
        this.Gt = t;
        this.r = e;
    }
    static get inject() {
        return [ Gs, Ze ];
    }
    render(e, s, i) {
        const n = e.container;
        const r = n.get(fs);
        const o = this.r.renderers;
        const l = t => {
            let e = t;
            let s = r;
            while (null != s && e > 0) {
                s = s.parent;
                --e;
            }
            if (null == s) throw new Error("No scope context for spread binding.");
            return s;
        };
        const h = i => {
            const n = l(i);
            const r = yi(n);
            const c = this.Gt.compileSpread(n.controller.definition, n.instruction?.captures ?? t.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, me(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            e.addBinding(r);
        };
        h(0);
    }
};

wi = r([ Ks("hs") ], wi);

class SpreadBinding {
    constructor(t, e) {
        this.Xt = t;
        this.Kt = e;
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
        const e = this.$scope = this.Kt.controller.scope.parentScope ?? void 0;
        if (null == e) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.Xt.forEach((t => t.$bind(e)));
    }
    $unbind() {
        this.Xt.forEach((t => t.$unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.Xt.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function bi(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const yi = t => new SpreadBinding([], t);

const ki = "IController";

const Ci = "IInstruction";

const Ai = "IRenderLocation";

const Ri = "IAuSlotsInfo";

function Si(e, s, i, n, r, o) {
    const l = s.container.createChild();
    l.registerResolver(e.HTMLElement, l.registerResolver(e.Element, l.registerResolver(Is, new t.InstanceProvider("ElementResolver", i))));
    l.registerResolver(us, new t.InstanceProvider(ki, s));
    l.registerResolver(Ws, new t.InstanceProvider(Ci, n));
    l.registerResolver(Ds, null == r ? Ei : new RenderLocationProvider(r));
    l.registerResolver(Ne, Ii);
    l.registerResolver(Hs, null == o ? Ti : new t.InstanceProvider(Ri, o));
    return l;
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
        if (!A(t.name) || 0 === t.name.length) throw new Error(`AUR0756`);
        return t;
    }
}

function Bi(e, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    c.registerResolver(e.HTMLElement, c.registerResolver(e.Element, c.registerResolver(Is, new t.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    c.registerResolver(us, new t.InstanceProvider(ki, i));
    c.registerResolver(Ws, new t.InstanceProvider(Ci, r));
    c.registerResolver(Ds, null == l ? Ei : new t.InstanceProvider(Ai, l));
    c.registerResolver(Ne, null == o ? Ii : new ViewFactoryProvider(o));
    c.registerResolver(Hs, null == h ? Ti : new t.InstanceProvider(Ri, h));
    return {
        vm: c.invoke(s.Type),
        ctn: c
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

const Ei = new RenderLocationProvider(null);

const Ii = new ViewFactoryProvider(null);

const Ti = new t.InstanceProvider(Ri, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Di(t) {
    return function(e) {
        return Li.define(t, e);
    };
}

class BindingCommandDefinition {
    constructor(t, e, s, i, n) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
        this.type = n;
    }
    static create(e, s) {
        let i;
        let n;
        if (A(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new BindingCommandDefinition(s, t.firstDefined(Oi(s, "name"), i), t.mergeArrays(Oi(s, "aliases"), n.aliases, s.aliases), $i(i), t.firstDefined(Oi(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        F(s, e).register(t);
        M(s, e).register(t);
        z(i, Li, s, t);
    }
}

const Pi = d("binding-command");

const $i = t => `${Pi}:${t}`;

const Oi = (t, e) => l(f(e), t);

const Li = Object.freeze({
    name: Pi,
    keyFrom: $i,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c(Pi, s, s.Type);
        c(Pi, s, s);
        p(e, Pi);
        return s.Type;
    },
    getAnnotation: Oi
});

exports.OneTimeBindingCommand = class OneTimeBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "one-time";
    }
    build(e, s, i) {
        const n = e.attr;
        let r = n.target;
        let o = e.attr.rawValue;
        if (null == e.bindable) r = i.map(e.node, r) ?? t.camelCase(r); else {
            if ("" === o && 1 === e.def.type) o = t.camelCase(r);
            r = e.bindable.property;
        }
        return new PropertyBindingInstruction(s.parse(o, 8), r, 1);
    }
};

exports.OneTimeBindingCommand = r([ Di("one-time") ], exports.OneTimeBindingCommand);

exports.ToViewBindingCommand = class ToViewBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "to-view";
    }
    build(e, s, i) {
        const n = e.attr;
        let r = n.target;
        let o = e.attr.rawValue;
        if (null == e.bindable) r = i.map(e.node, r) ?? t.camelCase(r); else {
            if ("" === o && 1 === e.def.type) o = t.camelCase(r);
            r = e.bindable.property;
        }
        return new PropertyBindingInstruction(s.parse(o, 8), r, 2);
    }
};

exports.ToViewBindingCommand = r([ Di("to-view") ], exports.ToViewBindingCommand);

exports.FromViewBindingCommand = class FromViewBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "from-view";
    }
    build(e, s, i) {
        const n = e.attr;
        let r = n.target;
        let o = n.rawValue;
        if (null == e.bindable) r = i.map(e.node, r) ?? t.camelCase(r); else {
            if ("" === o && 1 === e.def.type) o = t.camelCase(r);
            r = e.bindable.property;
        }
        return new PropertyBindingInstruction(s.parse(o, 8), r, 4);
    }
};

exports.FromViewBindingCommand = r([ Di("from-view") ], exports.FromViewBindingCommand);

exports.TwoWayBindingCommand = class TwoWayBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "two-way";
    }
    build(e, s, i) {
        const n = e.attr;
        let r = n.target;
        let o = n.rawValue;
        if (null == e.bindable) r = i.map(e.node, r) ?? t.camelCase(r); else {
            if ("" === o && 1 === e.def.type) o = t.camelCase(r);
            r = e.bindable.property;
        }
        return new PropertyBindingInstruction(s.parse(o, 8), r, 6);
    }
};

exports.TwoWayBindingCommand = r([ Di("two-way") ], exports.TwoWayBindingCommand);

exports.DefaultBindingCommand = class DefaultBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "bind";
    }
    build(e, s, i) {
        const n = e.attr;
        const r = e.bindable;
        let o;
        let l;
        let h = n.target;
        let c = n.rawValue;
        if (null == r) {
            l = i.isTwoWay(e.node, h) ? 6 : 2;
            h = i.map(e.node, h) ?? t.camelCase(h);
        } else {
            if ("" === c && 1 === e.def.type) c = t.camelCase(h);
            o = e.def.defaultBindingMode;
            l = 8 === r.mode || null == r.mode ? null == o || 8 === o ? 2 : o : r.mode;
            h = r.property;
        }
        return new PropertyBindingInstruction(s.parse(c, 8), h, l);
    }
};

exports.DefaultBindingCommand = r([ Di("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "call";
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new CallBindingInstruction(s.parse(e.attr.rawValue, 8 | 4), i);
    }
};

exports.CallBindingCommand = r([ Di("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "for";
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new IteratorBindingInstruction(s.parse(e.attr.rawValue, 2), i);
    }
};

exports.ForBindingCommand = r([ Di("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
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

exports.TriggerBindingCommand = r([ Di("trigger") ], exports.TriggerBindingCommand);

exports.DelegateBindingCommand = class DelegateBindingCommand {
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

exports.DelegateBindingCommand = r([ Di("delegate") ], exports.DelegateBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
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

exports.CaptureBindingCommand = r([ Di("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
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

exports.AttrBindingCommand = r([ Di("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
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

exports.StyleBindingCommand = r([ Di("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
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

exports.ClassBindingCommand = r([ Di("class") ], exports.ClassBindingCommand);

let qi = class RefBindingCommand {
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

qi = r([ Di("ref") ], qi);

let Ui = class SpreadBindingCommand {
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

Ui = r([ Di("...$attrs") ], Ui);

const ji = t.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const _i = t => {
    const e = g();
    t = A(t) ? t.split(" ") : t;
    let s;
    for (s of t) e[s] = true;
    return e;
};

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

class SVGAnalyzer {
    constructor(t) {
        this.Yt = Object.assign(g(), {
            a: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: _i("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: g(),
            altGlyphDef: _i("id xml:base xml:lang xml:space"),
            altglyphdef: g(),
            altGlyphItem: _i("id xml:base xml:lang xml:space"),
            altglyphitem: g(),
            animate: _i("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: _i("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: _i("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: _i("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: _i("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: _i("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": _i("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: _i("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: _i("class id style xml:base xml:lang xml:space"),
            ellipse: _i("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: _i("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: _i("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: _i("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: _i("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: _i("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: _i("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: _i("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: _i("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: _i("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: _i("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: _i("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: _i("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: _i("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: _i("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: _i("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: _i("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: _i("id xml:base xml:lang xml:space"),
            feMorphology: _i("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: _i("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: _i("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: _i("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: _i("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: _i("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: _i("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: _i("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: _i("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": _i("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": _i("id string xml:base xml:lang xml:space"),
            "font-face-name": _i("id name xml:base xml:lang xml:space"),
            "font-face-src": _i("id xml:base xml:lang xml:space"),
            "font-face-uri": _i("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: _i("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: _i("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: _i("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: g(),
            hkern: _i("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: _i("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: _i("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: _i("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: _i("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: _i("id xml:base xml:lang xml:space"),
            "missing-glyph": _i("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: _i("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: _i("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: _i("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: _i("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: _i("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: _i("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: _i("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: _i("class id offset style xml:base xml:lang xml:space"),
            style: _i("id media title type xml:base xml:lang xml:space"),
            svg: _i("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: _i("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: _i("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: _i("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: _i("class id style xml:base xml:lang xml:space"),
            tref: _i("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: _i("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: _i("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: _i("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: _i("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.Zt = _i("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.Jt = _i("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.Yt;
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
        return F(ji, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.Zt[t.nodeName] && true === this.Jt[e] || true === this.Yt[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ Re ];

const Fi = t.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.Qt = g();
        this.te = g();
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
        return [ ji ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.Qt)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw Vi(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.te;
        for (const s in t) {
            if (void 0 !== e[s]) throw Vi(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return Mi(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.Qt[t.nodeName]?.[e] ?? this.te[e] ?? (b(t, e, this.svg) ? e : null);
    }
}

function Mi(t, e) {
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

function Vi(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const Ni = t.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Hi = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ee = t.document.createElement("template");
    }
    createTemplate(t) {
        if (A(t)) {
            let e = Hi[t];
            if (void 0 === e) {
                const s = this.ee;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.ee = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Hi[t] = e;
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

TemplateElementFactory.inject = [ Re ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return F(Gs, this).register(t);
    }
    compile(e, s, i) {
        const n = CustomElementDefinition.getOrCreate(e);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = Gi);
        const r = new CompilationContext(e, s, i, null, null, void 0);
        const o = A(n.template) || !e.enhance ? r.se.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(_(rn));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(en)) throw new Error(`AUR0701`);
        this.ie(h, r);
        this.ne(h, r);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || ue(),
            dependencies: (e.dependencies ?? t.emptyArray).concat(r.deps ?? t.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.re(o, r) : t.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, s, i, n) {
        const r = new CompilationContext(e, i, Gi, null, null, void 0);
        const o = [];
        const l = r.oe(n.nodeName.toLowerCase());
        const h = null !== l;
        const c = r.ep;
        const a = s.length;
        let u = 0;
        let f;
        let d = null;
        let p;
        let m;
        let x;
        let g;
        let v;
        let w = null;
        let b;
        let y;
        let k;
        let C;
        for (;a > u; ++u) {
            f = s[u];
            k = f.target;
            C = f.rawValue;
            w = r.le(f);
            if (null !== w && (1 & w.type) > 0) {
                Ki.node = n;
                Ki.attr = f;
                Ki.bindable = null;
                Ki.def = null;
                o.push(w.build(Ki, r.ep, r.m));
                continue;
            }
            d = r.he(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                x = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && Wi(C);
                if (y) m = this.ce(n, C, d, r); else {
                    v = x.primary;
                    if (null === w) {
                        b = c.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        Ki.node = n;
                        Ki.attr = f;
                        Ki.bindable = v;
                        Ki.def = d;
                        m = [ w.build(Ki, r.ep, r.m) ];
                    }
                }
                (p ?? (p = [])).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === w) {
                b = c.parse(C, 1);
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[k];
                    if (void 0 !== g) {
                        b = c.parse(C, 1);
                        o.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(C, g.property) : new InterpolationInstruction(b, g.property)));
                        continue;
                    }
                }
                if (null != b) o.push(new InterpolationInstruction(b, r.m.map(n, k) ?? t.camelCase(k))); else switch (k) {
                  case "class":
                    o.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    o.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    o.push(new SetAttributeInstruction(C, k));
                }
            } else {
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[k];
                    if (void 0 !== g) {
                        Ki.node = n;
                        Ki.attr = f;
                        Ki.bindable = g;
                        Ki.def = l;
                        o.push(new SpreadElementPropBindingInstruction(w.build(Ki, r.ep, r.m)));
                        continue;
                    }
                }
                Ki.node = n;
                Ki.attr = f;
                Ki.bindable = null;
                Ki.def = null;
                o.push(w.build(Ki, r.ep, r.m));
            }
        }
        zi();
        if (null != p) return p.concat(o);
        return o;
    }
    re(e, s) {
        const i = [];
        const n = e.attributes;
        const r = s.ep;
        let o = n.length;
        let l = 0;
        let h;
        let c;
        let a;
        let u;
        let f = null;
        let d;
        let p;
        let m;
        let x;
        let g = null;
        let v;
        let w;
        let b;
        let y;
        for (;o > l; ++l) {
            h = n[l];
            c = h.name;
            a = h.value;
            u = s.ae.parse(c, a);
            b = u.target;
            y = u.rawValue;
            if (Yi[b]) throw new Error(`AUR0702:${c}`);
            g = s.le(u);
            if (null !== g && (1 & g.type) > 0) {
                Ki.node = e;
                Ki.attr = u;
                Ki.bindable = null;
                Ki.def = null;
                i.push(g.build(Ki, s.ep, s.m));
                continue;
            }
            f = s.he(b);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(f, true);
                w = false === f.noMultiBindings && null === g && Wi(y);
                if (w) p = this.ce(e, y, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        v = r.parse(y, 1);
                        p = [ null === v ? new SetPropertyInstruction(y, x.property) : new InterpolationInstruction(v, x.property) ];
                    } else {
                        Ki.node = e;
                        Ki.attr = u;
                        Ki.bindable = x;
                        Ki.def = f;
                        p = [ g.build(Ki, s.ep, s.m) ];
                    }
                }
                e.removeAttribute(c);
                --l;
                --o;
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(b) ? b : void 0, p));
                continue;
            }
            if (null === g) {
                v = r.parse(y, 1);
                if (null != v) {
                    e.removeAttribute(c);
                    --l;
                    --o;
                    i.push(new InterpolationInstruction(v, s.m.map(e, b) ?? t.camelCase(b)));
                } else switch (c) {
                  case "class":
                    i.push(new SetClassAttributeInstruction(y));
                    break;

                  case "style":
                    i.push(new SetStyleAttributeInstruction(y));
                    break;

                  default:
                    i.push(new SetAttributeInstruction(y, c));
                }
            } else {
                Ki.node = e;
                Ki.attr = u;
                Ki.bindable = null;
                Ki.def = null;
                i.push(g.build(Ki, s.ep, s.m));
            }
        }
        zi();
        if (null != d) return d.concat(i);
        return i;
    }
    ne(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.ue(t, e);

              default:
                return this.fe(t, e);
            }

          case 3:
            return this.de(t, e);

          case 11:
            {
                let s = t.firstChild;
                while (null !== s) s = this.ne(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    ue(e, i) {
        const n = e.attributes;
        const r = n.length;
        const o = [];
        const l = i.ep;
        let h = false;
        let c = 0;
        let a;
        let u;
        let f;
        let d;
        let p;
        let m;
        let x;
        let g;
        for (;r > c; ++c) {
            a = n[c];
            f = a.name;
            d = a.value;
            if ("to-binding-context" === f) {
                h = true;
                continue;
            }
            u = i.ae.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.le(u);
            if (null !== p) switch (p.name) {
              case "to-view":
              case "bind":
                o.push(new LetBindingInstruction(l.parse(x, 8), t.camelCase(m)));
                continue;

              default:
                throw new Error(`AUR0704:${u.command}`);
            }
            g = l.parse(x, 1);
            o.push(new LetBindingInstruction(null === g ? new s.PrimitiveLiteralExpression(x) : g, t.camelCase(m)));
        }
        i.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.pe(e).nextSibling;
    }
    fe(e, s) {
        var i, n, r, o;
        const l = e.nextSibling;
        const h = (e.getAttribute("as-element") ?? e.nodeName).toLowerCase();
        const c = s.oe(h);
        const a = null !== c;
        const u = a && null != c.shadowOptions;
        const f = c?.capture;
        const d = null != f && "boolean" !== typeof f;
        const p = f ? [] : t.emptyArray;
        const m = s.ep;
        const x = this.debug ? t.noop : () => {
            e.removeAttribute(k);
            --b;
            --w;
        };
        let g = e.attributes;
        let v;
        let w = g.length;
        let b = 0;
        let y;
        let k;
        let C;
        let A;
        let R;
        let S;
        let B = null;
        let E = false;
        let I;
        let T;
        let D;
        let P;
        let $;
        let O;
        let L;
        let q = null;
        let U;
        let j;
        let _;
        let F;
        let M = true;
        let V = false;
        let N = false;
        if ("slot" === h) {
            if (null == s.root.def.shadowOptions) throw new Error(`AUR0717:${s.root.def.name}`);
            s.root.hasSlot = true;
        }
        if (a) {
            M = c.processContent?.call(c.Type, e, s.p);
            g = e.attributes;
            w = g.length;
        }
        if (s.root.def.enhance && e.classList.contains("au")) throw new Error(`AUR0705`);
        for (;w > b; ++b) {
            y = g[b];
            k = y.name;
            C = y.value;
            switch (k) {
              case "as-element":
              case "containerless":
                x();
                if (!V) V = "containerless" === k;
                continue;
            }
            A = s.ae.parse(k, C);
            q = s.le(A);
            _ = A.target;
            F = A.rawValue;
            if (f && (!d || d && f(_))) {
                if (null != q && 1 & q.type) {
                    x();
                    p.push(A);
                    continue;
                }
                N = "au-slot" !== _ && "slot" !== _;
                if (N) {
                    U = BindablesInfo.from(c, false);
                    if (null == U.attrs[_] && !s.he(_)?.isTemplateController) {
                        x();
                        p.push(A);
                        continue;
                    }
                }
            }
            if (null !== q && 1 & q.type) {
                Ki.node = e;
                Ki.attr = A;
                Ki.bindable = null;
                Ki.def = null;
                (R ?? (R = [])).push(q.build(Ki, s.ep, s.m));
                x();
                continue;
            }
            B = s.he(_);
            if (null !== B) {
                U = BindablesInfo.from(B, true);
                E = false === B.noMultiBindings && null === q && Wi(F);
                if (E) D = this.ce(e, F, B, s); else {
                    j = U.primary;
                    if (null === q) {
                        O = m.parse(F, 1);
                        D = [ null === O ? new SetPropertyInstruction(F, j.property) : new InterpolationInstruction(O, j.property) ];
                    } else {
                        Ki.node = e;
                        Ki.attr = A;
                        Ki.bindable = j;
                        Ki.def = B;
                        D = [ q.build(Ki, s.ep, s.m) ];
                    }
                }
                x();
                if (B.isTemplateController) (P ?? (P = [])).push(new HydrateTemplateController(Xi, this.resolveResources ? B : B.name, void 0, D)); else (T ?? (T = [])).push(new HydrateAttributeInstruction(this.resolveResources ? B : B.name, null != B.aliases && B.aliases.includes(_) ? _ : void 0, D));
                continue;
            }
            if (null === q) {
                if (a) {
                    U = BindablesInfo.from(c, false);
                    I = U.attrs[_];
                    if (void 0 !== I) {
                        O = m.parse(F, 1);
                        (S ?? (S = [])).push(null == O ? new SetPropertyInstruction(F, I.property) : new InterpolationInstruction(O, I.property));
                        x();
                        continue;
                    }
                }
                O = m.parse(F, 1);
                if (null != O) {
                    x();
                    (R ?? (R = [])).push(new InterpolationInstruction(O, s.m.map(e, _) ?? t.camelCase(_)));
                }
                continue;
            }
            x();
            if (a) {
                U = BindablesInfo.from(c, false);
                I = U.attrs[_];
                if (void 0 !== I) {
                    Ki.node = e;
                    Ki.attr = A;
                    Ki.bindable = I;
                    Ki.def = c;
                    (S ?? (S = [])).push(q.build(Ki, s.ep, s.m));
                    continue;
                }
            }
            Ki.node = e;
            Ki.attr = A;
            Ki.bindable = null;
            Ki.def = null;
            (R ?? (R = [])).push(q.build(Ki, s.ep, s.m));
        }
        zi();
        if (this.me(e) && null != R && R.length > 1) this.xe(e, R);
        if (a) {
            L = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, S ?? t.emptyArray, null, V, p);
            if (h === un) {
                const t = e.getAttribute("name") || an;
                const i = s.h("template");
                const n = s.ge();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else i.content.appendChild(r);
                    r = e.firstChild;
                }
                this.ne(i.content, n);
                L.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: ue(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.ve(e, s);
            }
        }
        if (null != R || null != L || null != T) {
            v = t.emptyArray.concat(L ?? t.emptyArray, T ?? t.emptyArray, R ?? t.emptyArray);
            this.pe(e);
        }
        let H;
        if (null != P) {
            w = P.length - 1;
            b = w;
            $ = P[b];
            let t;
            this.ve(e, s);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = s.h("template");
                t.content.appendChild(e);
            }
            const r = t;
            const o = s.ge(null == v ? [] : [ v ]);
            let l;
            let f;
            let d;
            let p;
            let m;
            let x;
            let g;
            let y;
            let k = 0, C = 0;
            let A = e.firstChild;
            let R = false;
            if (false !== M) while (null !== A) {
                f = 1 === A.nodeType ? A.getAttribute(un) : null;
                if (null !== f) A.removeAttribute(un);
                if (a) {
                    l = A.nextSibling;
                    if (!u) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = p ?? (p = {}))[n = f || an] ?? (i[n] = [])).push(A);
                        e.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== f) {
                        f = f || an;
                        throw new Error(`AUR0706:${h}[${f}]`);
                    }
                    A = A.nextSibling;
                }
            }
            if (null != p) {
                d = {};
                for (f in p) {
                    t = s.h("template");
                    m = p[f];
                    for (k = 0, C = m.length; C > k; ++k) {
                        x = m[k];
                        if ("TEMPLATE" === x.nodeName) if (x.attributes.length > 0) t.content.appendChild(x); else t.content.appendChild(x.content); else t.content.appendChild(x);
                    }
                    y = s.ge();
                    this.ne(t.content, y);
                    d[f] = CustomElementDefinition.create({
                        name: ue(),
                        template: t,
                        instructions: y.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                L.projections = d;
            }
            if (a && (V || c.containerless)) this.ve(e, s);
            H = !a || !c.containerless && !V && false !== M;
            if (H) if ("TEMPLATE" === e.nodeName) this.ne(e.content, o); else {
                A = e.firstChild;
                while (null !== A) A = this.ne(A, o);
            }
            $.def = CustomElementDefinition.create({
                name: ue(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: s.root.def.isStrictBinding
            });
            while (b-- > 0) {
                $ = P[b];
                t = s.h("template");
                g = s.h("au-m");
                g.classList.add("au");
                t.content.appendChild(g);
                $.def = CustomElementDefinition.create({
                    name: ue(),
                    template: t,
                    needsCompile: false,
                    instructions: [ [ P[b + 1] ] ],
                    isStrictBinding: s.root.def.isStrictBinding
                });
            }
            s.rows.push([ $ ]);
        } else {
            if (null != v) s.rows.push(v);
            let t = e.firstChild;
            let i;
            let n;
            let l = null;
            let f;
            let d;
            let p;
            let m;
            let x;
            let g = false;
            let w = 0, b = 0;
            if (false !== M) while (null !== t) {
                n = 1 === t.nodeType ? t.getAttribute(un) : null;
                if (null !== n) t.removeAttribute(un);
                if (a) {
                    i = t.nextSibling;
                    if (!u) {
                        g = 3 === t.nodeType && "" === t.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || an] ?? (r[o] = [])).push(t);
                        e.removeChild(t);
                    }
                    t = i;
                } else {
                    if (null !== n) {
                        n = n || an;
                        throw new Error(`AUR0706:${h}[${n}]`);
                    }
                    t = t.nextSibling;
                }
            }
            if (null != f) {
                l = {};
                for (n in f) {
                    m = s.h("template");
                    d = f[n];
                    for (w = 0, b = d.length; b > w; ++w) {
                        p = d[w];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) m.content.appendChild(p); else m.content.appendChild(p.content); else m.content.appendChild(p);
                    }
                    x = s.ge();
                    this.ne(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: ue(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                L.projections = l;
            }
            if (a && (V || c.containerless)) this.ve(e, s);
            H = !a || !c.containerless && !V && false !== M;
            if (H && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.ne(t, s);
            }
        }
        return l;
    }
    de(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.pe(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    ce(t, e, s, i) {
        const n = BindablesInfo.from(s, true);
        const r = e.length;
        const o = [];
        let l;
        let h;
        let c = 0;
        let a = 0;
        let u;
        let f;
        let d;
        let p;
        for (let m = 0; m < r; ++m) {
            a = e.charCodeAt(m);
            if (92 === a) ++m; else if (58 === a) {
                l = e.slice(c, m);
                while (e.charCodeAt(++m) <= 32) ;
                c = m;
                for (;m < r; ++m) {
                    a = e.charCodeAt(m);
                    if (92 === a) ++m; else if (59 === a) {
                        h = e.slice(c, m);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(c);
                f = i.ae.parse(l, h);
                d = i.le(f);
                p = n.attrs[f.target];
                if (null == p) throw new Error(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    Ki.node = t;
                    Ki.attr = f;
                    Ki.bindable = p;
                    Ki.def = s;
                    o.push(d.build(Ki, i.ep, i.m));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        zi();
        return o;
    }
    ie(e, s) {
        const i = e;
        const n = t.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw new Error(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const e of n) {
            if (e.parentNode !== i) throw new Error(`AUR0709`);
            const n = sn(e, o);
            const r = class LocalTemplate {};
            const h = e.content;
            const c = t.toArray(h.querySelectorAll("bindable"));
            const a = P.for(r);
            const u = new Set;
            const f = new Set;
            for (const t of c) {
                if (t.parentNode !== h) throw new Error(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw new Error(`AUR0711`);
                const s = t.getAttribute("attribute");
                if (null !== s && f.has(s) || u.has(e)) throw new Error(`AUR0712:${e}+${s}`); else {
                    if (null !== s) f.add(s);
                    u.add(e);
                }
                a.add({
                    property: e,
                    attribute: s ?? void 0,
                    mode: nn(t)
                });
                const i = t.getAttributeNames().filter((t => !tn.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.we(de({
                name: n,
                template: e
            }, r));
            i.removeChild(e);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) ge(l[h]).dependencies.push(...s.def.dependencies ?? t.emptyArray, ...s.deps ?? t.emptyArray);
    }
    me(t) {
        return "INPUT" === t.nodeName && 1 === Zi[t.type];
    }
    xe(t, e) {
        switch (t.nodeName) {
          case "INPUT":
            {
                const t = e;
                let s;
                let i;
                let n = 0;
                let r;
                for (let e = 0; e < t.length && n < 3; e++) {
                    r = t[e];
                    switch (r.to) {
                      case "model":
                      case "value":
                      case "matcher":
                        s = e;
                        n++;
                        break;

                      case "checked":
                        i = e;
                        n++;
                        break;
                    }
                }
                if (void 0 !== i && void 0 !== s && i < s) [t[s], t[i]] = [ t[i], t[s] ];
            }
        }
    }
    pe(t) {
        t.classList.add("au");
        return t;
    }
    ve(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.pe(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(e, i, n, r, o, l) {
        this.hasSlot = false;
        this.be = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = e;
        this.ci = n;
        this.parent = r;
        this.se = h ? r.se : i.get(Ni);
        this.ae = h ? r.ae : i.get(Z);
        this.ep = h ? r.ep : i.get(s.IExpressionParser);
        this.m = h ? r.m : i.get(Fi);
        this.ye = h ? r.ye : i.get(t.ILogger);
        this.p = h ? r.p : i.get(Re);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
    }
    we(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    oe(t) {
        return this.c.find(be, t);
    }
    he(t) {
        return this.c.find(zt, t);
    }
    ge(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    le(t) {
        if (this.root !== this) return this.root.le(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.be[e];
        if (void 0 === s) {
            s = this.c.create(Li, e);
            if (null === s) throw new Error(`AUR0713:${e}`);
            this.be[e] = s;
        }
        return s;
    }
}

function Wi(t) {
    const e = t.length;
    let s = 0;
    let i = 0;
    while (e > i) {
        s = t.charCodeAt(i);
        if (92 === s) ++i; else if (58 === s) return true; else if (36 === s && 123 === t.charCodeAt(i + 1)) return false;
        ++i;
    }
    return false;
}

function zi() {
    Ki.node = Ki.attr = Ki.bindable = Ki.def = null;
}

const Gi = {
    projections: null
};

const Xi = {
    name: "unnamed"
};

const Ki = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const Yi = Object.assign(g(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const Zi = {
    checkbox: 1,
    radio: 1
};

const Ji = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = Ji.get(t);
        if (null == s) {
            const i = t.bindables;
            const n = g();
            const r = e ? void 0 === t.defaultBindingMode ? 8 : t.defaultBindingMode : 8;
            let o;
            let l;
            let h = false;
            let c;
            let a;
            for (l in i) {
                o = i[l];
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
            Ji.set(t, s = new BindablesInfo(n, i, c));
        }
        return s;
    }
}

var Qi;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(Qi || (Qi = {}));

const tn = Object.freeze([ "property", "attribute", "mode" ]);

const en = "as-custom-element";

function sn(t, e) {
    const s = t.getAttribute(en);
    if (null === s || "" === s) throw new Error(`AUR0715`);
    if (e.has(s)) throw new Error(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(en);
    }
    return s;
}

function nn(t) {
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

const rn = t.DI.createInterface("ITemplateCompilerHooks");

const on = new WeakMap;

const ln = d("compiler-hooks");

const hn = Object.freeze({
    name: ln,
    define(t) {
        let e = on.get(t);
        if (void 0 === e) {
            on.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(ln, e, t);
            p(t, ln);
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
        t.register(F(rn, this.Type));
    }
}

const cn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return hn.define(t);
    }
};

const an = "default";

const un = "au-slot";

var fn;

(function(t) {
    t[t["Space"] = 32] = "Space";
    t[t["Dollar"] = 36] = "Dollar";
    t[t["Semicolon"] = 59] = "Semicolon";
    t[t["Backslash"] = 92] = "Backslash";
    t[t["OpenBrace"] = 123] = "OpenBrace";
    t[t["Colon"] = 58] = "Colon";
})(fn || (fn = {}));

const dn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        dn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = dn.get(e);
        dn.delete(e);
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

nt("oneTime")(OneTimeBindingBehavior);

nt("toView")(ToViewBindingBehavior);

nt("fromView")(FromViewBindingBehavior);

nt("twoWay")(TwoWayBindingBehavior);

const pn = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(e, s) {
        super(e, s);
        this.opts = {
            delay: pn
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = e.get(t.IPlatform).taskQueue;
        if (s.args.length > 0) this.firstArg = s.args[0];
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
            this.opts.delay = isNaN(e) ? pn : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        this.binding.$unbind();
    }
}

nt("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Ht = new Map;
        this.ke = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Ht.set(e, s);
        let i;
        for (i of s) this.ke.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.Ht.get(e);
        this.Ht.delete(e);
        let i;
        for (i of s) this.ke.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ s.ISignaler ];

nt("signal")(SignalBindingBehavior);

const mn = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(e, s) {
        super(e, s);
        this.opts = {
            delay: mn
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = e.get(t.IPlatform);
        this.G = this.p.taskQueue;
        if (s.args.length > 0) this.firstArg = s.args[0];
    }
    callSource(t) {
        this.Ce((() => this.binding.callSource(t)));
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
        this.Ce((() => this.binding.updateSource(t)));
    }
    Ce(t) {
        const e = this.opts;
        const s = this.p;
        const i = this.lastCall + e.delay - s.performanceNow();
        if (i > 0) {
            const n = this.task;
            e.delay = i;
            this.task = this.G.queueTask((() => {
                this.lastCall = s.performanceNow();
                this.task = null;
                e.delay = this.delay;
                t();
            }), e);
            n?.cancel();
        } else {
            this.lastCall = s.performanceNow();
            t();
        }
    }
    $bind(t) {
        if (null !== this.firstArg) {
            const e = Number(this.firstArg.evaluate(t, this, null));
            this.opts.delay = this.delay = isNaN(e) ? mn : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        super.$unbind();
    }
}

nt("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttribute(s); else e.setAttribute(s, t);
    }
}

const xn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = xn;
    }
    unbind(t, e) {
        return;
    }
}

nt("attr")(AttrBindingBehavior);

function gn(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = gn;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

nt("self")(SelfBindingBehavior);

const vn = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return vn[t] ?? (vn[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

function wn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Ae = void 0;
        this.Re = void 0;
        this.o = t;
        this.oL = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        const e = this.v;
        if (t === e) return;
        this.v = t;
        this.ov = e;
        this.Se();
        this.Be();
        this.queue.add(this);
    }
    handleCollectionChange() {
        this.Be();
    }
    handleChange(t, e) {
        this.Be();
    }
    Be() {
        const t = this.v;
        const e = this.o;
        const s = v.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : wn;
        if (i) e.checked = !!n(t, s); else if (true === t) e.checked = true; else {
            let i = false;
            if (k(t)) i = -1 !== t.findIndex((t => !!n(t, s))); else if (t instanceof Set) {
                for (const e of t) if (n(e, s)) {
                    i = true;
                    break;
                }
            } else if (t instanceof Map) for (const e of t) {
                const t = e[0];
                const r = e[1];
                if (n(t, s) && true === r) {
                    i = true;
                    break;
                }
            }
            e.checked = i;
        }
    }
    handleEvent() {
        let t = this.ov = this.v;
        const e = this.o;
        const s = v.call(e, "model") ? e.model : e.value;
        const i = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : wn;
        if ("checkbox" === e.type) {
            if (k(t)) {
                const e = t.findIndex((t => !!n(t, s)));
                if (i && -1 === e) t.push(s); else if (!i && -1 !== e) t.splice(e, 1);
                return;
            } else if (t instanceof Set) {
                const e = {};
                let r = e;
                for (const e of t) if (true === n(e, s)) {
                    r = e;
                    break;
                }
                if (i && r === e) t.add(s); else if (!i && r !== e) t.delete(r);
                return;
            } else if (t instanceof Map) {
                let e;
                for (const i of t) {
                    const t = i[0];
                    if (true === n(t, s)) {
                        e = t;
                        break;
                    }
                }
                t.set(e, i);
                return;
            }
            t = i;
        } else if (i) t = s; else return;
        this.v = t;
        this.queue.add(this);
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Se();
    }
    stop() {
        this.handler.dispose();
        this.Ae?.unsubscribe(this);
        this.Ae = void 0;
        this.Re?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        bn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, bn);
    }
    Se() {
        const t = this.o;
        (this.Re ?? (this.Re = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Ae?.unsubscribe(this);
        this.Ae = void 0;
        if ("checkbox" === t.type) (this.Ae = Pn(this.v, this.oL))?.subscribe(this);
    }
}

s.subscriberCollection(CheckedObserver);

s.withFlushQueue(CheckedObserver);

let bn;

const yn = {
    childList: true,
    subtree: true,
    characterData: true
};

function kn(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.F = false;
        this.Ee = void 0;
        this.Ie = void 0;
        this.iO = false;
        this.o = t;
        this.oL = i;
        this.handler = s;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Cn(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.F = t !== this.ov;
        this.Te(t instanceof Array ? t : null);
        this.N();
    }
    N() {
        if (this.F) {
            this.F = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        this.syncOptions();
    }
    syncOptions() {
        const t = this.v;
        const e = this.o;
        const s = k(t);
        const i = e.matcher ?? kn;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = v.call(e, "model") ? e.model : e.value;
            if (s) {
                e.selected = -1 !== t.findIndex((t => !!i(o, t)));
                continue;
            }
            e.selected = !!i(o, t);
        }
    }
    syncValue() {
        const t = this.o;
        const e = t.options;
        const s = e.length;
        const i = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(i instanceof Array)) return true;
            let r;
            const o = t.matcher || kn;
            const l = [];
            while (n < s) {
                r = e[n];
                if (r.selected) l.push(v.call(r, "model") ? r.model : r.value);
                ++n;
            }
            let h;
            n = 0;
            while (n < i.length) {
                h = i[n];
                if (-1 === l.findIndex((t => !!o(h, t)))) i.splice(n, 1); else ++n;
            }
            n = 0;
            while (n < l.length) {
                h = l[n];
                if (-1 === i.findIndex((t => !!o(h, t)))) i.push(h);
                ++n;
            }
            return false;
        }
        let r = null;
        let o;
        while (n < s) {
            o = e[n];
            if (o.selected) {
                r = v.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    De() {
        (this.Ie = new this.o.ownerDocument.defaultView.MutationObserver(this.Pe.bind(this))).observe(this.o, yn);
        this.Te(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    $e() {
        this.Ie.disconnect();
        this.Ee?.unsubscribe(this);
        this.Ie = this.Ee = void 0;
        this.iO = false;
    }
    Te(t) {
        this.Ee?.unsubscribe(this);
        this.Ee = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.Ee = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    Pe(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.De();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.$e();
        }
    }
    flush() {
        An = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, An);
    }
}

s.subscriberCollection(SelectValueObserver);

s.withFlushQueue(SelectValueObserver);

function Cn(t) {
    const e = [];
    if (0 === t.length) return e;
    const s = t.length;
    let i = 0;
    let n;
    while (s > i) {
        n = t[i];
        if (n.selected) e[e.length] = v.call(n, "model") ? n.model : n.value;
        ++i;
    }
    return e;
}

let An;

const Rn = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.F = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t) {
        this.value = t;
        this.F = t !== this.ov;
        this.N();
    }
    Oe(t) {
        const e = [];
        const s = /url\([^)]+$/;
        let i = 0;
        let n = "";
        let r;
        let o;
        let l;
        let h;
        while (i < t.length) {
            r = t.indexOf(";", i);
            if (-1 === r) r = t.length;
            n += t.substring(i, r);
            i = r + 1;
            if (s.test(n)) {
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
    Le(e) {
        let s;
        let i;
        const n = [];
        for (i in e) {
            s = e[i];
            if (null == s) continue;
            if (A(s)) {
                if (i.startsWith(Rn)) {
                    n.push([ i, s ]);
                    continue;
                }
                n.push([ t.kebabCase(i), s ]);
                continue;
            }
            n.push(...this.qe(s));
        }
        return n;
    }
    Ue(e) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...this.qe(e[i]));
            return t;
        }
        return t.emptyArray;
    }
    qe(e) {
        if (A(e)) return this.Oe(e);
        if (e instanceof Array) return this.Ue(e);
        if (e instanceof Object) return this.Le(e);
        return t.emptyArray;
    }
    N() {
        if (this.F) {
            this.F = false;
            const t = this.value;
            const e = this.styles;
            const s = this.qe(t);
            let i;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const c = s.length;
            for (;h < c; ++h) {
                r = s[h];
                o = r[0];
                l = r[1];
                this.setProperty(o, l);
                e[o] = n;
            }
            this.styles = e;
            this.version += 1;
            if (0 === n) return;
            n -= 1;
            for (i in e) {
                if (!v.call(e, i) || e[i] !== n) continue;
                this.obj.style.removeProperty(i);
            }
        }
    }
    setProperty(t, e) {
        let s = "";
        if (null != e && C(e.indexOf) && e.includes("!important")) {
            s = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, s);
    }
    bind() {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, e, s) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.F = false;
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
        this.F = true;
        if (!this.handler.config.readonly) this.N();
    }
    N() {
        if (this.F) {
            this.F = false;
            this.o[this.k] = this.v ?? this.handler.config.default;
            this.queue.add(this);
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.o[this.k];
        if (this.ov !== this.v) {
            this.F = false;
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
        Sn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Sn);
    }
}

s.subscriberCollection(ValueAttributeObserver);

s.withFlushQueue(ValueAttributeObserver);

let Sn;

const Bn = "http://www.w3.org/1999/xlink";

const En = "http://www.w3.org/XML/1998/namespace";

const In = "http://www.w3.org/2000/xmlns/";

const Tn = Object.assign(g(), {
    "xlink:actuate": [ "actuate", Bn ],
    "xlink:arcrole": [ "arcrole", Bn ],
    "xlink:href": [ "href", Bn ],
    "xlink:role": [ "role", Bn ],
    "xlink:show": [ "show", Bn ],
    "xlink:title": [ "title", Bn ],
    "xlink:type": [ "type", Bn ],
    "xml:lang": [ "lang", En ],
    "xml:space": [ "space", En ],
    xmlns: [ "xmlns", In ],
    "xmlns:xlink": [ "xlink", In ]
});

const Dn = new s.PropertyAccessor;

Dn.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        this.type = t.type ?? ValueAttributeObserver;
        this.events = t.events;
        this.readonly = t.readonly;
        this.default = t.default;
    }
}

class NodeObserverLocator {
    constructor(t, e, s, i) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = s;
        this.svgAnalyzer = i;
        this.allowDirtyCheck = true;
        this.je = g();
        this._e = g();
        this.Fe = g();
        this.Me = g();
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
        M(s.INodeObserverLocator, NodeObserverLocator).register(t);
        F(s.INodeObserverLocator, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.je;
        let n;
        if (A(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = new NodeObserverConfig(s); else $n(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else $n(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this._e;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else $n("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else $n("*", t);
    }
    getAccessor(e, s, i) {
        if (s in this.Me || s in (this.Fe[e.tagName] ?? t.emptyObject)) return this.getObserver(e, s, i);
        switch (s) {
          case "src":
          case "href":
          case "role":
          case "minLength":
          case "maxLength":
          case "placeholder":
          case "type":
          case "size":
            return xn;

          default:
            {
                const t = Tn[s];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (b(e, s, this.svgAnalyzer)) return xn;
                return Dn;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (A(t)) {
            n = (s = this.Fe)[t] ?? (s[t] = g());
            n[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            n = (i = this.Fe)[e] ?? (i[e] = g());
            n[s] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.Me[e] = true;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const n = this.je[t.tagName]?.[e] ?? this._e[e];
        if (null != n) return new n.type(t, e, new EventSubscriber(n), i, this.locator);
        const r = Tn[e];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (b(t, e, this.svgAnalyzer)) return xn;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new s.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, Re, s.IDirtyChecker, ji ];

function Pn(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function $n(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...s) {
        if (0 === s.length) throw new Error(`AUR0802`);
        if (6 !== e.mode && 4 !== e.mode) throw new Error(`AUR0803`);
        const i = this.oL.getObserver(e.target, e.targetProperty);
        if (!i.handler) throw new Error(`AUR0804`);
        e.targetObserver = i;
        const n = i.handler;
        i.originalHandler = n;
        i.handler = new EventSubscriber(new NodeObserverConfig({
            default: n.config.default,
            events: s,
            readonly: n.config.readonly
        }));
    }
    unbind(t, e) {
        e.targetObserver.handler.dispose();
        e.targetObserver.handler = e.targetObserver.originalHandler;
        e.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ s.IObserverLocator ];

nt("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.Ve = false;
        this.Ne = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.He(); else this.Ve = true;
    }
    attached() {
        if (this.Ve) {
            this.Ve = false;
            this.He();
        }
        this.Ne.addEventListener("focus", this);
        this.Ne.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.Ne;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.We) this.value = false;
    }
    He() {
        const t = this.Ne;
        const e = this.We;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get We() {
        return this.Ne === this.p.document.activeElement;
    }
}

Focus.inject = [ Is, Re ];

r([ I({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Ut("focus")(Focus);

let On = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.ze = false;
        this.Ge = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ge = null;
            if (Boolean(this.value) !== this.Xe) if (this.Xe === this.Ke) {
                this.Xe = !this.Ke;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Xe = this.Ke;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Xe = this.Ke = "hide" !== s.alias;
    }
    binding() {
        this.ze = true;
        this.update();
    }
    detaching() {
        this.ze = false;
        this.Ge?.cancel();
        this.Ge = null;
    }
    valueChanged() {
        if (this.ze && null === this.Ge) this.Ge = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ I ], On.prototype, "value", void 0);

On = r([ o(0, Is), o(1, Re), o(2, Ws) ], On);

W("hide")(On);

Ut("show")(On);

class Portal {
    constructor(t, e, s) {
        this.strict = false;
        this.p = s;
        this.Ye = s.document.createElement("div");
        this.view = t.create();
        Os(this.view.nodes, e);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.Ye = this.Ze();
        this.view.setHost(i);
        return this.Je(t, i, s);
    }
    detaching(t, e, s) {
        return this.Qe(t, this.Ye, s);
    }
    targetChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        const s = this.Ye;
        const i = this.Ye = this.Ze();
        if (s === i) return;
        this.view.setHost(i);
        const n = t.onResolve(this.Qe(null, i, e.flags), (() => this.Je(null, i, e.flags)));
        if (y(n)) n.catch((t => {
            throw t;
        }));
    }
    Je(e, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return t.onResolve(n?.call(r, s, o), (() => this.ts(e, s, i)));
    }
    ts(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.appendTo(s); else return t.onResolve(r.activate(e ?? r, n, i, n.scope), (() => this.es(s)));
        return this.es(s);
    }
    es(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    Qe(e, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return t.onResolve(n?.call(r, s, o), (() => this.ss(e, s, i)));
    }
    ss(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, i), (() => this.rs(s)));
        return this.rs(s);
    }
    rs(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    Ze() {
        const t = this.p;
        const e = t.document;
        let s = this.target;
        let i = this.renderContext;
        if ("" === s) {
            if (this.strict) throw new Error(`AUR0811`);
            return e.body;
        }
        if (A(s)) {
            let n = e;
            if (A(i)) i = e.querySelector(i);
            if (i instanceof t.Node) n = i;
            s = n.querySelector(s);
        }
        if (s instanceof t.Node) return s;
        if (null == s) {
            if (this.strict) throw new Error(`AUR0812`);
            return e.body;
        }
        return s;
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

Portal.inject = [ Ne, Ds, Re ];

r([ I({
    primary: true
}) ], Portal.prototype, "target", void 0);

r([ I({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

r([ I() ], Portal.prototype, "strict", void 0);

r([ I() ], Portal.prototype, "deactivating", void 0);

r([ I() ], Portal.prototype, "activating", void 0);

r([ I() ], Portal.prototype, "deactivated", void 0);

r([ I() ], Portal.prototype, "activated", void 0);

r([ I() ], Portal.prototype, "callbackContext", void 0);

jt("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.os = false;
        this.ls = 0;
        this.cs = t;
        this.l = e;
    }
    attaching(e, s, i) {
        let n;
        const r = this.$controller;
        const o = this.ls++;
        const l = () => !this.os && this.ls === o + 1;
        return t.onResolve(this.pending, (() => {
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.cs.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == n) return;
            n.setLocation(this.l);
            this.pending = t.onResolve(n.activate(e, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(e, s, i) {
        this.os = true;
        return t.onResolve(this.pending, (() => {
            this.os = false;
            this.pending = void 0;
            void this.view?.deactivate(e, this.$controller, i);
        }));
    }
    valueChanged(e, s, i) {
        if (!this.$controller.isActive) return;
        e = !!e;
        s = !!s;
        if (e === s) return;
        const n = this.view;
        const r = this.$controller;
        const o = this.ls++;
        const l = () => !this.os && this.ls === o + 1;
        let h;
        return t.onResolve(this.pending, (() => this.pending = t.onResolve(n?.deactivate(n, r, i), (() => {
            if (!l()) return;
            if (e) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.cs.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == h) return;
            h.setLocation(this.l);
            return t.onResolve(h.activate(h, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
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

If.inject = [ Ne, Ds ];

r([ I ], If.prototype, "value", void 0);

r([ I({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

jt("if")(If);

class Else {
    constructor(t) {
        this.f = t;
    }
    link(t, e, s, i) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ Ne ];

jt({
    name: "else"
})(Else);

function Ln(t) {
    t.dispose();
}

const qn = [ 18, 17 ];

class Repeat {
    constructor(t, e, s) {
        this.views = [];
        this.key = void 0;
        this.us = void 0;
        this.ds = false;
        this.ps = false;
        this.xs = null;
        this.gs = void 0;
        this.vs = false;
        this.l = t;
        this.ws = e;
        this.f = s;
    }
    binding(t, e, s) {
        const i = this.ws.bindings;
        const n = i.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = i[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.bs = r;
                let t = o.iterable;
                while (null != t && qn.includes(t.$kind)) {
                    t = t.expression;
                    this.ds = true;
                }
                this.xs = t;
                break;
            }
        }
        this.ys();
        const h = o.declaration;
        if (!(this.vs = 24 === h.$kind || 25 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
    }
    attaching(t, e, s) {
        this.ks();
        return this.Cs(t);
    }
    detaching(t, e, s) {
        this.ys();
        return this.As(t);
    }
    itemsChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        this.ys();
        this.ks();
        const s = t.onResolve(this.As(null), (() => this.Cs(null)));
        if (y(s)) s.catch(S);
    }
    handleCollectionChange(e, i) {
        const n = this.$controller;
        if (!n.isActive) return;
        if (this.ds) {
            if (this.ps) return;
            this.ps = true;
            this.items = this.forOf.iterable.evaluate(n.scope, this.bs, null);
            this.ps = false;
            return;
        }
        this.ks();
        if (void 0 === i) {
            const e = t.onResolve(this.As(null), (() => this.Cs(null)));
            if (y(e)) e.catch(S);
        } else {
            const e = this.views.length;
            const n = s.applyMutationsToIndices(i);
            if (n.deletedIndices.length > 0) {
                const s = t.onResolve(this.Rs(n), (() => this.Ss(e, n)));
                if (y(s)) s.catch(S);
            } else this.Ss(e, n);
        }
    }
    ys() {
        const t = this.$controller.scope;
        let e = this.Bs;
        let i = this.ds;
        let n;
        if (i) {
            e = this.Bs = this.xs.evaluate(t, this.bs, null) ?? null;
            i = this.ds = !Object.is(this.items, e);
        }
        const r = this.us;
        if (this.$controller.isActive) {
            n = this.us = s.getCollectionObserver(i ? e : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.us = void 0;
        }
    }
    ks() {
        const t = this.items;
        if (k(t)) {
            this.gs = t;
            return;
        }
        const e = [];
        Wn(t, ((t, s) => {
            e[s] = t;
        }));
        this.gs = e;
    }
    Cs(t) {
        let e;
        let i;
        let n;
        let r;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = Hn(a);
        const p = this.views = Array(d);
        Wn(a, ((a, m) => {
            n = p[m] = l.create().setLocation(c);
            n.nodes.unlink();
            if (this.vs) f.declaration.assign(r = s.Scope.fromParent(u, new s.BindingContext), this.bs, a); else r = s.Scope.fromParent(u, new s.BindingContext(h, a));
            Vn(r.overrideContext, m, d);
            i = n.activate(t ?? n, o, 0, r);
            if (y(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    As(t) {
        let e;
        let s;
        let i;
        let n = 0;
        const {views: r, $controller: o} = this;
        const l = r.length;
        for (;l > n; ++n) {
            i = r[n];
            i.release();
            s = i.deactivate(t ?? i, o, 0);
            if (y(s)) (e ?? (e = [])).push(s);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Rs(t) {
        let e;
        let s;
        let i;
        const {$controller: n, views: r} = this;
        const o = t.deletedIndices;
        const l = o.length;
        let h = 0;
        for (;l > h; ++h) {
            i = r[o[h]];
            i.release();
            s = i.deactivate(i, n, 0);
            if (y(s)) (e ?? (e = [])).push(s);
        }
        h = 0;
        let c = 0;
        for (;l > h; ++h) {
            c = o[h] - h;
            r.splice(c, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ss(t, e) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, gs: u, l: f, views: d} = this;
        const p = e.length;
        for (;p > l; ++l) if (-2 === e[l]) {
            r = c.create();
            d.splice(l, 0, r);
        }
        if (d.length !== p) throw Mn(d.length, p);
        const m = h.scope;
        const x = e.length;
        s.synchronizeIndices(d, e);
        const g = Fn(e);
        const v = g.length;
        let w;
        let b = v - 1;
        l = x - 1;
        for (;l >= 0; --l) {
            r = d[l];
            w = d[l + 1];
            r.nodes.link(w?.nodes ?? f);
            if (-2 === e[l]) {
                if (this.vs) this.forOf.declaration.assign(o = s.Scope.fromParent(m, new s.BindingContext), this.bs, u[l]); else o = s.Scope.fromParent(m, new s.BindingContext(a, u[l]));
                Vn(o.overrideContext, l, x);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (y(n)) (i ?? (i = [])).push(n);
            } else if (b < 0 || 1 === v || l !== g[b]) {
                Vn(r.scope.overrideContext, l, x);
                r.nodes.insertBefore(r.location);
            } else {
                if (t !== x) Vn(r.scope.overrideContext, l, x);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(Ln);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Ds, us, Ne ];

r([ I ], Repeat.prototype, "items", void 0);

jt("repeat")(Repeat);

let Un = 16;

let jn = new Int32Array(Un);

let _n = new Int32Array(Un);

function Fn(t) {
    const e = t.length;
    if (e > Un) {
        Un = e;
        jn = new Int32Array(e);
        _n = new Int32Array(e);
    }
    let s = 0;
    let i = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let c = 0;
    for (;r < e; r++) {
        i = t[r];
        if (-2 !== i) {
            o = jn[s];
            n = t[o];
            if (-2 !== n && n < i) {
                _n[r] = o;
                jn[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[jn[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[jn[l]];
            if (i < n || -2 === n) {
                if (l > 0) _n[r] = jn[l - 1];
                jn[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = jn[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = _n[i];
    }
    while (r-- > 0) jn[r] = 0;
    return a;
}

const Mn = (t, e) => new Error(`AUR0814:${t}!=${e}`);

const Vn = (t, e, s) => {
    const i = 0 === e;
    const n = e === s - 1;
    const r = e % 2 === 0;
    t.$index = e;
    t.$first = i;
    t.$last = n;
    t.$middle = !i && !n;
    t.$even = r;
    t.$odd = !r;
    t.$length = s;
};

const Nn = Object.prototype.toString;

const Hn = t => {
    switch (Nn.call(t)) {
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
        throw new Error(`Cannot count ${Nn.call(t)}`);
    }
};

const Wn = (t, e) => {
    switch (Nn.call(t)) {
      case "[object Array]":
        return zn(t, e);

      case "[object Map]":
        return Gn(t, e);

      case "[object Set]":
        return Xn(t, e);

      case "[object Number]":
        return Kn(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw new Error(`Cannot iterate over ${Nn.call(t)}`);
    }
};

const zn = (t, e) => {
    const s = t.length;
    let i = 0;
    for (;i < s; ++i) e(t[i], i, t);
};

const Gn = (t, e) => {
    let s = -0;
    let i;
    for (i of t.entries()) e(i, s++, t);
};

const Xn = (t, e) => {
    let s = 0;
    let i;
    for (i of t.keys()) e(i, s++, t);
};

const Kn = (t, e) => {
    let s = 0;
    for (;s < t; ++s) e(s, s, t);
};

class With {
    constructor(t, e) {
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, i) {
        const n = this.$controller;
        const r = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (n.isActive && null != r) {
            o = s.Scope.fromParent(n.scope, void 0 === t ? {} : t);
            for (h = r.length; h > l; ++l) r[l].$bind(o);
        }
    }
    attaching(t, e, i) {
        const {$controller: n, value: r} = this;
        const o = s.Scope.fromParent(n.scope, void 0 === r ? {} : r);
        return this.view.activate(t, n, i, o);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

With.inject = [ Ne, Ds ];

r([ I ], With.prototype, "value", void 0);

jt("with")(With);

exports.Switch = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.cases = [];
        this.activeCases = [];
        this.promise = void 0;
    }
    link(t, e, s, i) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, e, s) {
        const i = this.view;
        const n = this.$controller;
        this.queue((() => i.activate(t, n, s, n.scope)));
        this.queue((() => this.swap(t, this.value)));
        return this.promise;
    }
    detaching(t, e, s) {
        this.queue((() => {
            const e = this.view;
            return e.deactivate(t, this.$controller, s);
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
        this.queue((() => this.Es(t)));
    }
    Es(e) {
        const s = e.isMatch(this.value);
        const i = this.activeCases;
        const n = i.length;
        if (!s) {
            if (n > 0 && i[0].id === e.id) return this.Is(null);
            return;
        }
        if (n > 0 && i[0].id < e.id) return;
        const r = [];
        let o = e.fallThrough;
        if (!o) r.push(e); else {
            const t = this.cases;
            const s = t.indexOf(e);
            for (let e = s, i = t.length; e < i && o; e++) {
                const s = t[e];
                r.push(s);
                o = s.fallThrough;
            }
        }
        return t.onResolve(this.Is(null, r), (() => {
            this.activeCases = r;
            return this.Ts(null);
        }));
    }
    swap(e, s) {
        const i = [];
        let n = false;
        for (const t of this.cases) {
            if (n || t.isMatch(s)) {
                i.push(t);
                n = t.fallThrough;
            }
            if (i.length > 0 && !n) break;
        }
        const r = this.defaultCase;
        if (0 === i.length && void 0 !== r) i.push(r);
        return t.onResolve(this.activeCases.length > 0 ? this.Is(e, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Ts(e);
        }));
    }
    Ts(e) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(e, 0, r);
        return t.resolveAll(...i.map((t => t.activate(e, 0, r))));
    }
    Is(e, s = []) {
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        if (1 === n) {
            const t = i[0];
            if (!s.includes(t)) {
                i.length = 0;
                return t.deactivate(e, 0);
            }
            return;
        }
        return t.onResolve(t.resolveAll(...i.reduce(((t, i) => {
            if (!s.includes(i)) t.push(i.deactivate(e, 0));
            return t;
        }), [])), (() => {
            i.length = 0;
        }));
    }
    queue(e) {
        const s = this.promise;
        let i;
        i = this.promise = t.onResolve(t.onResolve(s, e), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

r([ I ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ jt("switch"), o(0, Ne), o(1, Ds) ], exports.Switch);

let Yn = 0;

exports.Case = class Case {
    constructor(t, e, s, i) {
        this.f = t;
        this.Ds = e;
        this.l = s;
        this.id = ++Yn;
        this.fallThrough = false;
        this.view = void 0;
        this.Ps = i.config.level <= 1;
        this.ye = i.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, s, i) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof exports.Switch) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    isMatch(t) {
        this.ye.debug("isMatch()");
        const e = this.value;
        if (k(e)) {
            if (void 0 === this.us) this.us = this.$s(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (k(t)) {
            this.us?.unsubscribe(this);
            this.us = this.$s(t);
        } else if (void 0 !== this.us) this.us.unsubscribe(this);
        this.$switch.caseChanged(this);
    }
    handleCollectionChange() {
        this.$switch.caseChanged(this);
    }
    activate(t, e, s) {
        let i = this.view;
        if (void 0 === i) i = this.view = this.f.create().setLocation(this.l);
        if (i.isActive) return;
        return i.activate(t ?? i, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (void 0 === s || !s.isActive) return;
        return s.deactivate(t ?? s, this.$controller, e);
    }
    dispose() {
        this.us?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    $s(t) {
        const e = this.Ds.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ Ne, s.IObserverLocator, Ds, t.ILogger ];

r([ I ], exports.Case.prototype, "value", void 0);

r([ I({
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
}) ], exports.Case.prototype, "fallThrough", void 0);

exports.Case = r([ jt("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ jt("default-case") ], exports.DefaultCase);

exports.PromiseTemplateController = class PromiseTemplateController {
    constructor(t, e, s, i) {
        this.f = t;
        this.l = e;
        this.p = s;
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = i.scopeTo("promise.resolve");
    }
    link(t, e, s, i) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(e, i, n) {
        const r = this.view;
        const o = this.$controller;
        return t.onResolve(r.activate(e, o, n, this.viewScope = s.Scope.fromParent(o.scope, {})), (() => this.swap(e, n)));
    }
    valueChanged(t, e, s) {
        if (!this.$controller.isActive) return;
        this.swap(null, s);
    }
    swap(e, s) {
        const n = this.value;
        if (!y(n)) {
            this.logger.warn(`The value '${String(n)}' is not a promise. No change will be done.`);
            return;
        }
        const r = this.p.domWriteQueue;
        const o = this.fulfilled;
        const l = this.rejected;
        const h = this.pending;
        const c = this.viewScope;
        let a;
        const u = {
            reusable: false
        };
        const f = () => {
            void t.resolveAll(a = (this.preSettledTask = r.queueTask((() => t.resolveAll(o?.deactivate(e, s), l?.deactivate(e, s), h?.activate(e, s, c))), u)).result.catch((t => {
                if (!(t instanceof i.TaskAbortError)) throw t;
            })), n.then((i => {
                if (this.value !== n) return;
                const f = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => t.resolveAll(h?.deactivate(e, s), l?.deactivate(e, s), o?.activate(e, s, c, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void a.then(f); else {
                    this.preSettledTask.cancel();
                    f();
                }
            }), (i => {
                if (this.value !== n) return;
                const f = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => t.resolveAll(h?.deactivate(e, s), o?.deactivate(e, s), l?.activate(e, s, c, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void a.then(f); else {
                    this.preSettledTask.cancel();
                    f();
                }
            })));
        };
        if (1 === this.postSettledTask?.status) void this.postSettlePromise.then(f); else {
            this.postSettledTask?.cancel();
            f();
        }
    }
    detaching(t, e, s) {
        this.preSettledTask?.cancel();
        this.postSettledTask?.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
};

r([ I ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ jt("promise"), o(0, Ne), o(1, Ds), o(2, Re), o(3, t.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Zn(t).pending = this;
    }
    activate(t, e, s) {
        let i = this.view;
        if (void 0 === i) i = this.view = this.f.create().setLocation(this.l);
        if (i.isActive) return;
        return i.activate(i, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (void 0 === s || !s.isActive) return;
        return s.deactivate(s, this.$controller, e);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
};

r([ I({
    mode: 2
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ jt("pending"), o(0, Ne), o(1, Ds) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Zn(t).fulfilled = this;
    }
    activate(t, e, s, i) {
        this.value = i;
        let n = this.view;
        if (void 0 === n) n = this.view = this.f.create().setLocation(this.l);
        if (n.isActive) return;
        return n.activate(n, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (void 0 === s || !s.isActive) return;
        return s.deactivate(s, this.$controller, e);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
};

r([ I({
    mode: 4
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ jt("then"), o(0, Ne), o(1, Ds) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Zn(t).rejected = this;
    }
    activate(t, e, s, i) {
        this.value = i;
        let n = this.view;
        if (void 0 === n) n = this.view = this.f.create().setLocation(this.l);
        if (n.isActive) return;
        return n.activate(n, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (void 0 === s || !s.isActive) return;
        return s.deactivate(s, this.$controller, e);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
};

r([ I({
    mode: 4
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ jt("catch"), o(0, Ne), o(1, Ds) ], exports.RejectedTemplateController);

function Zn(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw new Error(`AUR0813`);
}

let Jn = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Jn = r([ J({
    pattern: "promise.resolve",
    symbols: ""
}) ], Jn);

let Qn = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Qn = r([ J({
    pattern: "then",
    symbols: ""
}) ], Qn);

let tr = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

tr = r([ J({
    pattern: "catch",
    symbols: ""
}) ], tr);

function er(t, e, s, i) {
    if (A(e)) return sr(t, e, s, i);
    if (pe(e)) return ir(t, e, s, i);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Os = s;
        this.Ls = void 0;
    }
    get definition() {
        if (void 0 === this.Ls) this.Ls = CustomElementDefinition.create({
            name: ue(),
            template: this.node,
            needsCompile: A(this.node),
            instructions: this.instructions,
            dependencies: this.Os
        });
        return this.Ls;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Ze).getViewFactory(this.definition, t.createChild().register(...this.Os));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Os);
    }
}

function sr(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (zs(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) nr(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function ir(t, e, s, i) {
    const n = ge(e);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const c = n.bindables;
    const a = t.document.createElement(n.name);
    a.className = "au";
    if (!l.includes(e)) l.push(e);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (zs(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) nr(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function nr(t, e, s, i, n) {
    for (let r = 0, o = s.length; r < o; ++r) {
        const o = s[r];
        switch (typeof o) {
          case "string":
            e.appendChild(t.document.createTextNode(o));
            break;

          case "object":
            if (o instanceof t.Node) e.appendChild(o); else if ("mergeInto" in o) o.mergeInto(e, i, n);
        }
    }
}

function rr(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, e, s, i) {
        this.p = t;
        this.qs = e;
        this.Us = s;
        this.r = i;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.js = void 0;
        this._s = e.props.reduce(rr, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.js !== i) {
            this.js = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.ss(this.view, t, s);
    }
    componentChanged(e, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.js === e) return;
        this.js = e;
        this.composing = true;
        i |= n.flags;
        const r = t.onResolve(this.ss(this.view, null, i), (() => this.compose(void 0, e, null, i)));
        if (y(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(e, s, i, n) {
        return t.onResolve(void 0 === e ? t.onResolve(s, (t => this.Fs(t, n))) : e, (t => this.ts(this.view = t, i, n)));
    }
    ss(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    ts(e, s, i) {
        const {$controller: n} = this;
        return t.onResolve(e?.activate(s ?? e, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Fs(t, e) {
        const s = this.Ms(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Ms(t, e) {
        if (null == t) return;
        const s = this.Us.controller.container;
        if ("object" === typeof t) {
            if (or(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (A(t)) {
            const e = s.find(be, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return er(this.p, t, this._s, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ Re, Ws, fs, Ze ];

r([ I ], AuRender.prototype, "component", void 0);

r([ I({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

Zt({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function or(t) {
    return "lockScope" in t;
}

class AuCompose {
    constructor(t, e, s, i, n, r, o) {
        this.c = t;
        this.parent = e;
        this.host = s;
        this.l = i;
        this.p = n;
        this.scopeBehavior = "auto";
        this.Vs = void 0;
        this.r = t.get(Ze);
        this.qs = r;
        this.Ns = o;
    }
    static get inject() {
        return [ t.IContainer, us, Is, Ds, Re, Ws, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Hs;
    }
    get composition() {
        return this.Vs;
    }
    attaching(e, s, i) {
        return this.Hs = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this.Ns.isCurrent(t)) this.Hs = void 0;
        }));
    }
    detaching(e) {
        const s = this.Vs;
        const i = this.Hs;
        this.Ns.invalidate();
        this.Vs = this.Hs = void 0;
        return t.onResolve(i, (() => s?.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.Vs) {
            this.Vs.update(this.model);
            return;
        }
        this.Hs = t.onResolve(this.Hs, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this.Ns.isCurrent(t)) this.Hs = void 0;
        }))));
    }
    queue(e, s) {
        const i = this.Ns;
        const n = this.Vs;
        return t.onResolve(i.create(e), (e => {
            if (i.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (i.isCurrent(e)) return t.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(e)) {
                        this.Vs = r;
                        return t.onResolve(n?.deactivate(s), (() => e));
                    } else return t.onResolve(r.controller.deactivate(r.controller, this.$controller, 2), (() => {
                        r.controller.dispose();
                        return e;
                    }));
                }));
                r.controller.dispose();
                return e;
            }));
            return e;
        }));
    }
    compose(e) {
        let i;
        let n;
        let r;
        const {view: o, viewModel: l, model: h} = e.change;
        const {c: c, host: a, $controller: u, l: f} = this;
        const d = this.getDef(l);
        const p = c.createChild();
        const m = null == f ? a.parentNode : f.parentNode;
        if (null !== d) {
            if (d.containerless) throw new Error(`AUR0806`);
            if (null == f) {
                n = a;
                r = () => {};
            } else {
                n = m.insertBefore(this.p.document.createElement(d.name), f);
                r = () => {
                    n.remove();
                };
            }
            i = this.getVm(p, l, n);
        } else {
            n = null == f ? a : f;
            i = this.getVm(p, l, n);
        }
        const x = () => {
            if (null !== d) {
                const s = Controller.$el(p, i, n, {
                    projections: this.qs.projections
                }, d);
                return new CompositionController(s, (t => s.activate(t ?? s, u, 1, u.scope.parentScope)), (e => t.onResolve(s.deactivate(e ?? s, u, 2), r)), (t => i.activate?.(t)), e);
            } else {
                const t = CustomElementDefinition.create({
                    name: be.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? s.Scope.fromParent(this.parent.scope, i) : s.Scope.create(i);
                if (qs(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), e);
            }
        };
        if ("activate" in i) return t.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(e, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = qs(i);
        e.registerResolver(n.Element, e.registerResolver(Is, new t.InstanceProvider("ElementResolver", r ? null : i)));
        e.registerResolver(Ds, new t.InstanceProvider("IRenderLocation", r ? i : null));
        const o = e.invoke(s);
        e.registerResolver(s, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = C(t) ? t : t?.constructor;
        return be.isType(e) ? be.getDefinition(e) : null;
    }
}

r([ I ], AuCompose.prototype, "view", void 0);

r([ I ], AuCompose.prototype, "viewModel", void 0);

r([ I ], AuCompose.prototype, "model", void 0);

r([ I({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Zt("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(e) {
        return t.onResolve(e.load(), (t => new CompositionContext(++this.id, t)));
    }
    invalidate() {
        this.id++;
    }
}

class ChangeInfo {
    constructor(t, e, s, i) {
        this.view = t;
        this.viewModel = e;
        this.model = s;
        this.src = i;
    }
    load() {
        if (y(this.view) || y(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
    }
}

class LoadedChangeInfo {
    constructor(t, e, s, i) {
        this.view = t;
        this.viewModel = e;
        this.model = s;
        this.src = i;
    }
}

class CompositionContext {
    constructor(t, e) {
        this.id = t;
        this.change = e;
    }
}

class CompositionController {
    constructor(t, e, s, i, n) {
        this.controller = t;
        this.start = e;
        this.stop = s;
        this.update = i;
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
    constructor(t, e, s, i) {
        this.Ws = null;
        this.zs = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.Gs = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.Gs = true;
        }
        this.Us = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Ds, Ws, fs, Ze ];
    }
    binding(t, e, i) {
        this.Ws = this.$controller.scope.parentScope;
        let n;
        if (this.Gs) {
            n = this.Us.controller.scope.parentScope;
            (this.zs = s.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.Ws.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.Gs ? this.zs : this.Ws);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.Gs && null != this.zs) this.zs.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

r([ I ], AuSlot.prototype, "expose", void 0);

Zt({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const lr = t.DI.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.Xs = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Xs.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, lr) ], exports.SanitizeValueConverter);

ct("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.Ks = t;
    }
    toView(t, e) {
        return this.Ks.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, Ye) ], exports.ViewValueConverter);

ct("view")(exports.ViewValueConverter);

const hr = DebounceBindingBehavior;

const cr = OneTimeBindingBehavior;

const ar = ToViewBindingBehavior;

const ur = FromViewBindingBehavior;

const fr = SignalBindingBehavior;

const dr = ThrottleBindingBehavior;

const pr = TwoWayBindingBehavior;

const mr = TemplateCompiler;

const xr = NodeObserverLocator;

const gr = [ mr, xr ];

const vr = SVGAnalyzer;

const wr = exports.AtPrefixedTriggerAttributePattern;

const br = exports.ColonPrefixedBindAttributePattern;

const yr = exports.RefAttributePattern;

const kr = exports.DotSeparatedAttributePattern;

const Cr = it;

const Ar = [ yr, kr, Cr ];

const Rr = [ wr, br ];

const Sr = exports.CallBindingCommand;

const Br = exports.DefaultBindingCommand;

const Er = exports.ForBindingCommand;

const Ir = exports.FromViewBindingCommand;

const Tr = exports.OneTimeBindingCommand;

const Dr = exports.ToViewBindingCommand;

const Pr = exports.TwoWayBindingCommand;

const $r = qi;

const Or = exports.TriggerBindingCommand;

const Lr = exports.DelegateBindingCommand;

const qr = exports.CaptureBindingCommand;

const Ur = exports.AttrBindingCommand;

const jr = exports.ClassBindingCommand;

const _r = exports.StyleBindingCommand;

const Fr = Ui;

const Mr = [ Br, Tr, Ir, Dr, Pr, Sr, Er, $r, Or, Lr, qr, jr, _r, Ur, Fr ];

const Vr = exports.SanitizeValueConverter;

const Nr = exports.ViewValueConverter;

const Hr = If;

const Wr = Else;

const zr = Repeat;

const Gr = With;

const Xr = exports.Switch;

const Kr = exports.Case;

const Yr = exports.DefaultCase;

const Zr = exports.PromiseTemplateController;

const Jr = exports.PendingTemplateController;

const Qr = exports.FulfilledTemplateController;

const to = exports.RejectedTemplateController;

const eo = Jn;

const so = Qn;

const io = tr;

const no = AttrBindingBehavior;

const ro = SelfBindingBehavior;

const oo = UpdateTriggerBindingBehavior;

const lo = AuRender;

const ho = AuCompose;

const co = Portal;

const ao = Focus;

const uo = On;

const fo = [ hr, cr, ar, ur, fr, dr, pr, Vr, Nr, Hr, Wr, zr, Gr, Xr, Kr, Yr, Zr, Jr, Qr, to, eo, so, io, no, ro, oo, lo, ho, co, ao, uo, AuSlot ];

const po = ni;

const mo = ei;

const xo = ti;

const go = oi;

const vo = hi;

const wo = ii;

const bo = li;

const yo = ri;

const ko = Qs;

const Co = si;

const Ao = di;

const Ro = vi;

const So = pi;

const Bo = mi;

const Eo = xi;

const Io = gi;

const To = fi;

const Do = wi;

const Po = [ bo, vo, po, yo, go, ko, xo, mo, Co, wo, Ao, Ro, So, Bo, Eo, Io, To, Do ];

const $o = Oo(t.noop);

function Oo(t) {
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
            return e.register(V(s.ICoercionConfiguration, i.coercingOptions), ...gr, ...fo, ...Ar, ...Mr, ...Po);
        },
        customize(e) {
            return Oo(e ?? t);
        }
    };
}

const Lo = t.DI.createInterface("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.Ys = false;
        this.Zs = false;
        this.Js = void 0;
        this.next = void 0;
        this.Qs = void 0;
        this.ti = void 0;
        if (e.has(Lo, true)) throw new Error(`AUR0768`);
        e.registerResolver(Lo, new t.InstanceProvider("IAurelia", this));
        e.registerResolver(Ss, this.ei = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Ys;
    }
    get isStopping() {
        return this.Zs;
    }
    get root() {
        if (null == this.Js) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.Js;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.si(t.host), this.container, this.ei);
        return this;
    }
    enhance(e, s) {
        const i = e.container ?? this.container.createChild();
        const n = e.host;
        const r = this.si(n);
        const o = e.component;
        let l;
        if (C(o)) {
            i.registerResolver(r.HTMLElement, i.registerResolver(r.Element, i.registerResolver(Is, new t.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        i.registerResolver(Ts, new t.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: ue(),
            template: n,
            enhance: true
        }));
        return t.onResolve(h.activate(h, s, 1), (() => h));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    si(t) {
        let e;
        if (!this.container.has(Re, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(V(Re, e));
        } else e = this.container.get(Re);
        return e;
    }
    start(e = this.next) {
        if (null == e) throw new Error(`AUR0770`);
        if (y(this.Qs)) return this.Qs;
        return this.Qs = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.ei.prepare(this.Js = e);
            this.Ys = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.Ys = false;
                this.Qs = void 0;
                this.ii(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (y(this.ti)) return this.ti;
        if (true === this.ir) {
            const s = this.Js;
            this.ir = false;
            this.Zs = true;
            return this.ti = t.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (e) s.dispose();
                this.Js = void 0;
                this.ei.dispose();
                this.Zs = false;
                this.ii(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Zs) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    ii(t, e, s) {
        const i = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        s.dispatchEvent(i);
    }
}

exports.BindingMode = void 0;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(exports.BindingMode || (exports.BindingMode = {}));

exports.DefinitionType = void 0;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(exports.DefinitionType || (exports.DefinitionType = {}));

const qo = t.DI.createInterface("IDialogService");

const Uo = t.DI.createInterface("IDialogController");

const jo = t.DI.createInterface("IDialogDomRenderer");

const _o = t.DI.createInterface("IDialogDom");

const Fo = t.DI.createInterface("IDialogGlobalSettings");

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

exports.DialogDeactivationStatuses = void 0;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(exports.DialogDeactivationStatuses || (exports.DialogDeactivationStatuses = {}));

class DialogController {
    constructor(t, e) {
        this.p = t;
        this.ctn = e;
        this.closed = new Promise(((t, e) => {
            this.It = t;
            this.Ct = e;
        }));
    }
    static get inject() {
        return [ Re, t.IContainer ];
    }
    activate(e) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = e;
        const o = s.get(jo);
        const l = e.host ?? this.p.document.body;
        const h = this.dom = o.render(l, e);
        const c = s.has(Ts, true) ? s.get(Ts) : null;
        const a = h.contentHost;
        this.settings = e;
        if (null == c || !c.contains(l)) s.register(V(Ts, l));
        s.register(V(Is, a), V(_o, h));
        return new Promise((t => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, e, a), {
                $dialog: this
            });
            t(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw Mo(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return t.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: be.generateName(),
                    template: n
                }));
                return t.onResolve(i.activate(i, null, 1), (() => {
                    h.overlay.addEventListener(e.mouseEvent ?? "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            h.dispose();
            throw t;
        }));
    }
    deactivate(e, s) {
        if (this.ni) return this.ni;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(e, s);
        const a = new Promise((a => {
            a(t.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.ni = void 0;
                    if (h) throw Mo(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return t.onResolve(o.deactivate?.(c), (() => t.onResolve(n.deactivate(n, null, 2), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== e) this.It(c); else this.Ct(Mo(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.ni = void 0;
            throw t;
        }));
        this.ni = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(e) {
        const s = Vo(e);
        return new Promise((e => e(t.onResolve(this.cmp.deactivate?.(DialogCloseResult.create("error", s)), (() => t.onResolve(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Ct(s);
        })))))));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(e, s, i) {
        const n = s.component;
        if (null == n) return new EmptyComponent;
        if ("object" === typeof n) return n;
        const r = this.p;
        e.registerResolver(r.HTMLElement, e.registerResolver(r.Element, e.registerResolver(Is, new t.InstanceProvider("ElementResolver", i))));
        return e.invoke(n);
    }
    getDefinition(t) {
        const e = C(t) ? t : t?.constructor;
        return be.isType(e) ? be.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Mo(t, e) {
    const s = new Error(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function Vo(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.lt = t;
        this.p = e;
        this.ri = s;
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
        return [ t.IContainer, Re, Fo ];
    }
    static register(e) {
        e.register(F(qo, this), Rt.deactivating(qo, (e => t.onResolve(e.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(e) {
        return Ho(new Promise((s => {
            const i = DialogSettings.from(this.ri, e);
            const n = i.container ?? this.lt.createChild();
            s(t.onResolve(i.load(), (e => {
                const s = n.invoke(DialogController);
                n.register(V(Uo, s));
                n.register(N(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return t.onResolve(s.activate(e), (t => {
                    if (!t.wasCancelled) {
                        if (1 === this.dlgs.push(s)) this.p.window.addEventListener("keydown", this);
                        const t = () => this.remove(s);
                        s.closed.then(t, t);
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
        const s = e.indexOf(t);
        if (s > -1) this.dlgs.splice(s, 1);
        if (0 === e.length) this.p.window.removeEventListener("keydown", this);
    }
    handleEvent(t) {
        const e = t;
        const s = Wo(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).li().oi();
    }
    load() {
        const e = this;
        const s = this.component;
        const i = this.template;
        const n = t.resolveAll(null == s ? void 0 : t.onResolve(s(), (t => {
            e.component = t;
        })), C(i) ? t.onResolve(i(), (t => {
            e.template = t;
        })) : void 0);
        return y(n) ? n.then((() => e)) : e;
    }
    li() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    oi() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function No(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function Ho(t) {
    t.whenClosed = No;
    return t;
}

function Wo(t) {
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
        F(Fo, this).register(t);
    }
}

const zo = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${zo} display:flex;`;
        this.overlayCss = zo;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        F(jo, this).register(t);
    }
    render(t) {
        const e = this.p.document;
        const s = (t, s) => {
            const i = e.createElement(t);
            i.style.cssText = s;
            return i;
        };
        const i = t.appendChild(s("au-dialog-container", this.wrapperCss));
        const n = i.appendChild(s("au-dialog-overlay", this.overlayCss));
        const r = i.appendChild(s("div", this.hostCss));
        return new DefaultDialogDom(i, n, r);
    }
}

DefaultDialogDomRenderer.inject = [ Re ];

class DefaultDialogDom {
    constructor(t, e, s) {
        this.wrapper = t;
        this.overlay = e;
        this.contentHost = s;
    }
    dispose() {
        this.wrapper.remove();
    }
}

function Go(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, Rt.creating((() => t(s.get(Fo))))),
        customize(t, s) {
            return Go(t, s ?? e);
        }
    };
}

const Xo = Go((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(F(Fo, this));
    }
} ]);

const Ko = Go(t.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Yo = t.DI.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, s) {
        this.ctn = t;
        this.p = e;
        this.r = s;
    }
    define(e, s, i) {
        if (!e.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let n;
        if (null == s) throw new Error("Invalid custom element definition");
        switch (typeof s) {
          case "function":
            n = be.isType(s) ? be.getDefinition(s) : CustomElementDefinition.create(be.generateName(), s);
            break;

          default:
            n = CustomElementDefinition.getOrCreate(s);
            break;
        }
        if (n.containerless) throw new Error("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const r = !i?.extends ? HTMLElement : this.p.document.createElement(i.extends).constructor;
        const o = this.ctn;
        const l = this.r;
        const h = n.bindables;
        const c = this.p;
        class CustomElementClass extends r {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const e = o.createChild();
                e.registerResolver(c.HTMLElement, e.registerResolver(c.Element, e.registerResolver(Is, new t.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, e, {
                    projections: null
                });
                const i = e.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(e, i, this, null, s);
                Es(this, s.key, r);
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
            attributeChangedCallback(t, e, s) {
                this.auInit();
                this.auCtrl.viewModel[t] = s;
            }
        }
        CustomElementClass.observedAttributes = Object.keys(h);
        for (const t in h) Object.defineProperty(CustomElementClass.prototype, t, {
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
        this.p.customElements.define(e, CustomElementClass, i);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ t.IContainer, Re, Ze ];

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = Rt;

exports.AtPrefixedTriggerAttributePatternRegistration = wr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = no;

exports.AttrBindingCommandRegistration = Ur;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Ro;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = st;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = lo;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = P;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = ht;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingBehaviorFactory = BindingBehaviorFactory;

exports.BindingCommand = Li;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingInterceptor = BindingInterceptor;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Sr;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = po;

exports.CaptureBindingCommandRegistration = qr;

exports.CheckedObserver = CheckedObserver;

exports.Children = Tt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = jr;

exports.ColonPrefixedBindAttributePatternRegistration = br;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = zt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = mo;

exports.CustomElement = be;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = xo;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = hr;

exports.DefaultBindingCommandRegistration = Br;

exports.DefaultBindingLanguage = Mr;

exports.DefaultBindingSyntax = Ar;

exports.DefaultComponents = gr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = Po;

exports.DefaultResources = fo;

exports.DelegateBindingCommandRegistration = Lr;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = Xo;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = Ko;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = kr;

exports.Else = Else;

exports.ElseRegistration = Wr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Er;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = ur;

exports.FromViewBindingCommandRegistration = Ir;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Ss;

exports.IAppTask = At;

exports.IAttrMapper = Fi;

exports.IAttributeParser = Z;

exports.IAttributePattern = Y;

exports.IAuSlotsInfo = Hs;

exports.IAurelia = Lo;

exports.IController = us;

exports.IDialogController = Uo;

exports.IDialogDom = _o;

exports.IDialogDomRenderer = jo;

exports.IDialogGlobalSettings = Fo;

exports.IDialogService = qo;

exports.IEventDelegator = Vs;

exports.IEventTarget = Ts;

exports.IHistory = _s;

exports.IHydrationContext = fs;

exports.IInstruction = Ws;

exports.ILifecycleHooks = je;

exports.ILocation = js;

exports.INode = Is;

exports.INodeObserverLocatorRegistration = xr;

exports.IPlatform = Re;

exports.IProjections = Ns;

exports.IRenderLocation = Ds;

exports.IRenderer = Xs;

exports.IRendering = Ze;

exports.ISVGAnalyzer = ji;

exports.ISanitizer = lr;

exports.IShadowDOMGlobalStyles = Pe;

exports.IShadowDOMStyles = De;

exports.ISyntaxInterpreter = G;

exports.ITemplateCompiler = Gs;

exports.ITemplateCompilerHooks = rn;

exports.ITemplateCompilerRegistration = mr;

exports.ITemplateElementFactory = Ni;

exports.IViewFactory = Ne;

exports.IViewLocator = Ye;

exports.IWcElementRegistry = Yo;

exports.IWindow = Us;

exports.If = If;

exports.IfRegistration = Hr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = go;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = vo;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = wo;

exports.LifecycleHooks = Me;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = Ao;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = cr;

exports.OneTimeBindingCommandRegistration = Tr;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = bo;

exports.RefAttributePatternRegistration = yr;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = $r;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = yo;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = zr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = vr;

exports.SanitizeValueConverterRegistration = Vr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = ro;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = So;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Bo;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = ko;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Eo;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Rr;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = fr;

exports.StandardConfiguration = $o;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = _r;

exports.StyleConfiguration = $e;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Io;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = hn;

exports.TemplateControllerRendererRegistration = Co;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = To;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = dr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = ar;

exports.ToViewBindingCommandRegistration = Dr;

exports.TriggerBindingCommandRegistration = Or;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = pr;

exports.TwoWayBindingCommandRegistration = Pr;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = oo;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = ft;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Nr;

exports.Views = Xe;

exports.Watch = Yt;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = Gr;

exports.alias = W;

exports.allResources = _;

exports.applyBindingBehavior = ui;

exports.astEvaluator = dt;

exports.attributePattern = J;

exports.bindable = I;

exports.bindingBehavior = nt;

exports.bindingCommand = Di;

exports.capture = Ae;

exports.children = Bt;

exports.coercer = $;

exports.containerless = Qt;

exports.convertToRenderLocation = Ls;

exports.createElement = er;

exports.cssModules = Ee;

exports.customAttribute = Ut;

exports.customElement = Zt;

exports.getEffectiveParentNode = $s;

exports.getRef = Bs;

exports.isCustomElementController = ls;

exports.isCustomElementViewModel = hs;

exports.isInstruction = zs;

exports.isRenderLocation = qs;

exports.lifecycleHooks = Ve;

exports.processContent = ke;

exports.registerAliases = z;

exports.renderer = Ks;

exports.setEffectiveParentNode = Os;

exports.setRef = Es;

exports.shadowCSS = Ie;

exports.strict = ee;

exports.templateCompilerHooks = cn;

exports.templateController = jt;

exports.useShadowDOM = Jt;

exports.valueConverter = ct;

exports.view = Ke;

exports.watch = Gt;
//# sourceMappingURL=index.cjs.map
