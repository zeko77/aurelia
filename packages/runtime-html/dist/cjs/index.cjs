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
        return new BindableDefinition(t.firstDefined(i.attribute, t.kebabCase(e)), t.firstDefined(i.callback, `${e}Changed`), t.firstDefined(i.mode, 2), t.firstDefined(i.primary, false), t.firstDefined(i.property, e), t.firstDefined(i.set, O(e, s, i)));
    }
}

function $(t, e, s) {
    L.define(t, e);
}

const L = {
    key: f("coercer"),
    define(t, e) {
        c(L.key, t[e].bind(t), t);
    },
    for(t) {
        return l(L.key, t);
    }
};

function O(e, s, i = {}) {
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
            r = "function" === typeof e ? e.bind(n) : L.for(n) ?? t.noop;
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

s.subscriberCollection(BindableObserver);

const U = function(e) {
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

const j = function(e) {
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

const _ = t.Registration.singleton;

const F = t.Registration.aliasTo;

const M = t.Registration.instance;

const V = t.Registration.callback;

const N = t.Registration.transient;

function H(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) c(s, t, e); else i.push(...t);
    };
}

function W(e, s, i, n) {
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
        this.L = "";
        this.O = {};
        this.q = {};
    }
    get pattern() {
        const t = this.L;
        if ("" === t) return null; else return t;
    }
    set pattern(e) {
        if (null == e) {
            this.L = "";
            this.parts = t.emptyArray;
        } else {
            this.L = e;
            this.parts = this.q[e];
        }
    }
    append(t, e) {
        const s = this.O;
        if (void 0 === s[t]) s[t] = e; else s[t] += e;
    }
    next(t) {
        const e = this.O;
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

const z = t.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        i = i.filter(G);
        if (i.length > 0) {
            i.sort(X);
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

function G(t) {
    return t.isEndpoint;
}

function X(t, e) {
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

const K = t.DI.createInterface("IAttributePattern");

const Q = t.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(e, s) {
        this.U = {};
        this.j = e;
        const i = this._ = {};
        const n = s.reduce(((t, e) => {
            const s = tt(e.constructor);
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

AttributeParser.inject = [ z, t.all(K) ];

function Y(...t) {
    return function e(s) {
        return et.define(t, s);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        _(K, this.Type).register(t);
    }
}

const Z = d("attribute-pattern");

const J = "attribute-pattern-definitions";

const tt = e => t.Protocol.annotation.get(e, J);

const et = Object.freeze({
    name: Z,
    definitionAnnotationKey: J,
    define(e, s) {
        const i = new AttributePatternResourceDefinition(s);
        c(Z, i, s);
        p(s, Z);
        t.Protocol.annotation.set(s, J, e);
        m(s, J);
        return s;
    },
    getPatternDefinitions: tt
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[1]);
    }
    "PART.PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[2]);
    }
};

exports.DotSeparatedAttributePattern = r([ Y({
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

exports.RefAttributePattern = r([ Y({
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

exports.ColonPrefixedBindAttributePattern = r([ Y({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ Y({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let st = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

st = r([ Y({
    pattern: "...$attrs",
    symbols: ""
}) ], st);

exports.BindingBehaviorStrategy = void 0;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(exports.BindingBehaviorStrategy || (exports.BindingBehaviorStrategy = {}));

function it(t) {
    return function(e) {
        return lt.define(t, e);
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
        return new BindingBehaviorDefinition(s, t.firstDefined(ot(s, "name"), i), t.mergeArrays(ot(s, "aliases"), n.aliases, s.aliases), lt.keyFrom(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", n, s, (() => r ? 2 : 1)));
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
        W(n, lt, i, e);
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

const nt = [ "isBound", "$scope", "obs", "ast", "locator", "oL", "boundFn" ];

nt.forEach((t => {
    B(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const rt = d("binding-behavior");

const ot = (t, e) => l(f(e), t);

const lt = Object.freeze({
    name: rt,
    keyFrom(t) {
        return `${rt}:${t}`;
    },
    isType(t) {
        return C(t) && h(rt, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(rt, s, s.Type);
        c(rt, s, s);
        p(e, rt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(rt, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ot
});

function ht(t) {
    return function(e) {
        return ut.define(t, e);
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
        return new ValueConverterDefinition(s, t.firstDefined(at(s, "name"), i), t.mergeArrays(at(s, "aliases"), n.aliases, s.aliases), ut.keyFrom(i));
    }
    register(e) {
        const {Type: s, key: i, aliases: n} = this;
        t.Registration.singleton(i, s).register(e);
        t.Registration.aliasTo(i, s).register(e);
        W(n, ut, i, e);
    }
}

const ct = d("value-converter");

const at = (t, e) => l(f(e), t);

const ut = Object.freeze({
    name: ct,
    keyFrom: t => `${ct}:${t}`,
    isType(t) {
        return C(t) && h(ct, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(ct, s, s.Type);
        c(ct, s, s);
        p(e, ct);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ct, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: at
});

class BindingTargetSubscriber {
    constructor(t, e) {
        this.v = void 0;
        this.b = t;
        this.F = e;
    }
    flush() {
        this.b.updateSource(this.v);
    }
    handleChange(t, e) {
        const s = this.b;
        if (t !== s.ast.evaluate(s.$scope, s, null)) {
            this.v = t;
            this.F.add(this);
        }
    }
}

function ft(t, e = true) {
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
            const e = ut.keyFrom(t);
            let s = dt.get(this);
            if (null == s) dt.set(this, s = new ResourceLookup);
            return s[e] ?? (s[e] = this.locator.get(U(e)));
        }));
        E(i, "getBehavior", (function(t) {
            const e = lt.keyFrom(t);
            let s = dt.get(this);
            if (null == s) dt.set(this, s = new ResourceLookup);
            return s[e] ?? (s[e] = this.locator.get(U(e)));
        }));
    };
}

const dt = new WeakMap;

class ResourceLookup {}

const pt = t.DI.createInterface("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.V.forEach(mt);
        } finally {
            this.M = false;
        }
    }
    clear() {
        this.V.clear();
        this.M = false;
    }
}

function mt(t, e, s) {
    s.delete(t);
    t.flush();
}

class CallBinding {
    constructor(t, e, s, i, n) {
        this.locator = t;
        this.ast = s;
        this.target = i;
        this.targetProperty = n;
        this.interceptor = this;
        this.isBound = false;
        this.boundFn = false;
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

ft(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.N = false;
        this.o = t;
        this.H = e;
        this.W = s;
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
                    if (A(e) && e.includes("!important")) {
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
        for (let s = 0, i = t.length; i > s; ++s) {
            const i = t[s];
            if ("attributes" === i.type && i.attributeName === this.H) {
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
            xt(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) gt(this.o, this);
    }
    X() {
        bt = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, bt);
    }
}

s.subscriberCollection(AttributeObserver);

const xt = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(vt)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const gt = (t, e) => {
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

const vt = t => {
    t[0].target.$eMObs.forEach(wt, t);
};

function wt(t) {
    t.handleMutation(this);
}

let bt;

const yt = {
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
        this.boundFn = false;
        this.K = t;
        this.target = r;
        this.oL = s;
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
        const s = this.ast;
        const i = this.$scope;
        const n = this.targetObserver;
        const r = 1 !== this.K.state && (4 & n.type) > 0;
        let o = false;
        let l;
        o = 0 === (1 & t);
        if (o) this.obs.version++;
        const h = s.evaluate(i, this, e);
        if (o) this.obs.clear();
        if (h !== this.value) {
            this.value = h;
            if (r) {
                l = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    e.updateTarget(h);
                }), yt);
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
        if (4 & i) s.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n, this.locator.get(pt))));
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

ft(true)(AttributeBinding);

const kt = {
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
        this.K = t;
        this.oL = s;
        this.targetObserver = s.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, s, this);
    }
    Y() {
        this.updateTarget();
    }
    updateTarget() {
        const t = this.partBindings;
        const e = this.ast.parts;
        const s = t.length;
        let i = "";
        let n = 0;
        if (1 === s) i = e[0] + t[0].value + e[1]; else {
            i = e[0];
            for (;s > n; ++n) i += t[n].value + e[n + 1];
        }
        const r = this.targetObserver;
        const o = 1 !== this.K.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(i, this.target, this.targetProperty);
            }), kt);
            l?.cancel();
            l = null;
        } else r.setValue(i, this.target, this.targetProperty);
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
        this.updateTarget();
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

ft(true)(InterpolationBinding);

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
        this.boundFn = false;
        this.oL = n;
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.ast;
        const e = this.obs;
        let s = false;
        s = (2 & this.mode) > 0;
        if (s) e.version++;
        const i = t.evaluate(this.$scope, this, s ? this.interceptor : null);
        if (s) e.clear();
        if (i != this.value) {
            this.value = i;
            if (i instanceof Array) this.observeCollection(i);
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

s.connectable(InterpolationPartBinding);

ft(true)(InterpolationPartBinding);

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
        this.boundFn = false;
        this.K = t;
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
        const s = 1 !== this.K.state;
        if (s) this.queueUpdate(e); else this.updateTarget(e);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.value = this.ast.evaluate(this.$scope, this, (2 & this.mode) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (k(t)) this.observeCollection(t);
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
        if (k(e)) this.observeCollection(e);
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
        }), kt);
        e?.cancel();
    }
}

s.connectable()(ContentBinding);

ft(void 0, false)(ContentBinding);

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
        this.boundFn = false;
        this.oL = e;
        this.Z = n;
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.target;
        const e = this.targetProperty;
        const s = t[e];
        this.obs.version++;
        const i = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (i !== s) t[e] = i;
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

s.connectable(LetBinding);

ft(true)(LetBinding);

const Ct = {
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
        this.boundFn = false;
        this.K = t;
        this.J = i;
        this.oL = s;
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
        let s = false;
        s = this.mode > 1;
        if (s) e.version++;
        const i = this.ast.evaluate(this.$scope, this, this.interceptor);
        if (s) e.clear();
        if (t) {
            At = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(i);
                this.task = null;
            }), Ct);
            At?.cancel();
            At = null;
        } else this.interceptor.updateTarget(i);
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
            n.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r, this.locator.get(pt))));
            if (!o) r.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        At = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != At) {
            At.cancel();
            At = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

s.connectable(PropertyBinding);

ft(true, false)(PropertyBinding);

let At = null;

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

const Rt = t.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(M(Rt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const St = Object.freeze({
    creating: Bt("creating"),
    hydrating: Bt("hydrating"),
    hydrated: Bt("hydrated"),
    activating: Bt("activating"),
    activated: Bt("activated"),
    deactivating: Bt("deactivating"),
    deactivated: Bt("deactivated")
});

function Bt(t) {
    function e(e, s) {
        if (C(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Et(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(Tt, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, Dt.keyFrom(e));
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

function It(t) {
    return t.startsWith(Tt);
}

const Tt = f("children-observer");

const Dt = Object.freeze({
    name: Tt,
    keyFrom: t => `${Tt}:${t}`,
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
        const s = Tt.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(It);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l(Tt, a, h[t].slice(s));
        }
        return i;
    }
});

const Pt = {
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
        return new ChildrenDefinition(t.firstDefined(s.callback, `${e}Changed`), t.firstDefined(s.property, e), s.options ?? Pt, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = $t, r = Lt, o = Ot, l) {
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
                this.tt();
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
    tt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return Ut(this.controller, this.query, this.filter, this.map);
    }
}

s.subscriberCollection()(ChildrenObserver);

function $t(t) {
    return t.host.childNodes;
}

function Lt(t, e, s) {
    return !!s;
}

function Ot(t, e, s) {
    return s;
}

const qt = {
    optional: true
};

function Ut(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = xe(l, qt);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

function jt(t) {
    return function(e) {
        return Wt(t, e);
    };
}

function _t(t) {
    return function(e) {
        return Wt(A(t) ? {
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
        return new CustomAttributeDefinition(s, t.firstDefined(Vt(s, "name"), i), t.mergeArrays(Vt(s, "aliases"), n.aliases, s.aliases), Mt(i), t.firstDefined(Vt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, 2), t.firstDefined(Vt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), P.from(s, ...P.getAll(s), Vt(s, "bindables"), s.bindables, n.bindables), t.firstDefined(Vt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(Yt.getAnnotation(s), s.watches), t.mergeArrays(Vt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        N(s, e).register(t);
        F(s, e).register(t);
        W(i, Gt, s, t);
    }
}

const Ft = d("custom-attribute");

const Mt = t => `${Ft}:${t}`;

const Vt = (t, e) => l(f(e), t);

const Nt = t => C(t) && h(Ft, t);

const Ht = (t, e) => Es(t, Mt(e)) ?? void 0;

const Wt = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    c(Ft, s, s.Type);
    c(Ft, s, s);
    p(e, Ft);
    return s.Type;
};

const zt = t => {
    const e = l(Ft, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
    return e;
};

const Gt = Object.freeze({
    name: Ft,
    keyFrom: Mt,
    isType: Nt,
    for: Ht,
    define: Wt,
    getDefinition: zt,
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: Vt
});

function Xt(t, e) {
    if (null == t) throw new Error(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!C(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!C(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        Yt.add(l, h);
        if (Nt(l)) zt(l).watches.push(h);
        if (me(l)) ve(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Kt = t.emptyArray;

const Qt = f("watch");

const Yt = Object.freeze({
    name: Qt,
    add(t, e) {
        let s = l(Qt, t);
        if (null == s) c(Qt, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(Qt, t) ?? Kt;
    }
});

function Zt(t) {
    return function(e) {
        return pe(t, e);
    };
}

function Jt(t) {
    if (void 0 === t) return function(t) {
        de(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!C(t)) return function(e) {
        de(e, "shadowOptions", t);
    };
    de(t, "shadowOptions", {
        mode: "open"
    });
}

function te(t) {
    if (void 0 === t) return function(t) {
        ee(t);
    };
    ee(t);
}

function ee(t) {
    const e = l(ae, t);
    if (void 0 === e) {
        de(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function se(t) {
    if (void 0 === t) return function(t) {
        de(t, "isStrictBinding", true);
    };
    de(t, "isStrictBinding", true);
}

const ie = new WeakMap;

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
            const n = t.fromDefinitionOrDefault("name", i, fe);
            if (C(i.Type)) s = i.Type; else s = be(t.pascalCase(n));
            return new CustomElementDefinition(s, n, t.mergeArrays(i.aliases), t.fromDefinitionOrDefault("key", i, (() => ue(n))), t.fromDefinitionOrDefault("cache", i, re), t.fromDefinitionOrDefault("capture", i, le), t.fromDefinitionOrDefault("template", i, oe), t.mergeArrays(i.instructions), t.mergeArrays(i.dependencies), t.fromDefinitionOrDefault("injectable", i, oe), t.fromDefinitionOrDefault("needsCompile", i, he), t.mergeArrays(i.surrogates), P.from(s, i.bindables), Dt.from(i.childrenObservers), t.fromDefinitionOrDefault("containerless", i, le), t.fromDefinitionOrDefault("isStrictBinding", i, le), t.fromDefinitionOrDefault("shadowOptions", i, oe), t.fromDefinitionOrDefault("hasSlots", i, le), t.fromDefinitionOrDefault("enhance", i, le), t.fromDefinitionOrDefault("watches", i, ce), t.fromAnnotationOrTypeOrDefault("processContent", s, oe));
        }
        if (A(e)) return new CustomElementDefinition(s, e, t.mergeArrays(ge(s, "aliases"), s.aliases), ue(e), t.fromAnnotationOrTypeOrDefault("cache", s, re), t.fromAnnotationOrTypeOrDefault("capture", s, le), t.fromAnnotationOrTypeOrDefault("template", s, oe), t.mergeArrays(ge(s, "instructions"), s.instructions), t.mergeArrays(ge(s, "dependencies"), s.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", s, oe), t.fromAnnotationOrTypeOrDefault("needsCompile", s, he), t.mergeArrays(ge(s, "surrogates"), s.surrogates), P.from(s, ...P.getAll(s), ge(s, "bindables"), s.bindables), Dt.from(...Dt.getAll(s), ge(s, "childrenObservers"), s.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", s, le), t.fromAnnotationOrTypeOrDefault("isStrictBinding", s, le), t.fromAnnotationOrTypeOrDefault("shadowOptions", s, oe), t.fromAnnotationOrTypeOrDefault("hasSlots", s, le), t.fromAnnotationOrTypeOrDefault("enhance", s, le), t.mergeArrays(Yt.getAnnotation(s), s.watches), t.fromAnnotationOrTypeOrDefault("processContent", s, oe));
        const i = t.fromDefinitionOrDefault("name", e, fe);
        return new CustomElementDefinition(s, i, t.mergeArrays(ge(s, "aliases"), e.aliases, s.aliases), ue(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, s, re), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, s, le), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, s, oe), t.mergeArrays(ge(s, "instructions"), e.instructions, s.instructions), t.mergeArrays(ge(s, "dependencies"), e.dependencies, s.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, s, oe), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, s, he), t.mergeArrays(ge(s, "surrogates"), e.surrogates, s.surrogates), P.from(s, ...P.getAll(s), ge(s, "bindables"), s.bindables, e.bindables), Dt.from(...Dt.getAll(s), ge(s, "childrenObservers"), s.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, s, le), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, s, le), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, s, oe), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, s, le), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, s, le), t.mergeArrays(e.watches, Yt.getAnnotation(s), s.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, s, oe));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (ie.has(t)) return ie.get(t);
        const e = CustomElementDefinition.create(t);
        ie.set(t, e);
        c(ae, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            N(s, e).register(t);
            F(s, e).register(t);
            W(i, ye, s, t);
        }
    }
}

const ne = {
    name: void 0,
    searchParents: false,
    optional: false
};

const re = () => 0;

const oe = () => null;

const le = () => false;

const he = () => true;

const ce = () => t.emptyArray;

const ae = d("custom-element");

const ue = t => `${ae}:${t}`;

const fe = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const de = (t, e, s) => {
    c(f(e), s, t);
};

const pe = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(ae, s, s.Type);
    c(ae, s, s);
    p(s.Type, ae);
    return s.Type;
};

const me = t => C(t) && h(ae, t);

const xe = (t, e = ne) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = Es(t, ae);
        if (null === s) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = Es(t, ae);
            if (null === s) throw new Error(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = Es(s, ae);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = Ls(s);
        }
        if (i) return;
        throw new Error(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = Es(s, ae);
        if (null !== t) return t;
        s = Ls(s);
    }
    throw new Error(`AUR0765`);
};

const ge = (t, e) => l(f(e), t);

const ve = t => {
    const e = l(ae, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const we = () => {
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

const be = function() {
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

const ye = Object.freeze({
    name: ae,
    keyFrom: ue,
    isType: me,
    for: xe,
    define: pe,
    getDefinition: ve,
    annotate: de,
    getAnnotation: ge,
    generateName: fe,
    createInjectable: we,
    generateType: be
});

const ke = f("processContent");

function Ce(t) {
    return void 0 === t ? function(t, e, s) {
        c(ke, Ae(t, e), t);
    } : function(e) {
        t = Ae(e, t);
        const s = l(ae, e);
        if (void 0 !== s) s.processContent = t; else c(ke, t, e);
        return e;
    };
}

function Ae(t, e) {
    if (A(e)) e = t[e];
    if (!C(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function Re(t) {
    return function(e) {
        const s = C(t) ? t : true;
        de(e, "capture", s);
        if (me(e)) ve(e).capture = s;
    };
}

const Se = t.IPlatform;

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.et = {};
        this.st = 0;
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
            const s = Be(t);
            let i = this.st;
            this.ov = t;
            if (s.length > 0) this.it(s);
            this.st += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!v.call(e, t) || e[t] !== i) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    it(t) {
        const e = this.obj;
        const s = t.length;
        let i = 0;
        let n;
        for (;i < s; i++) {
            n = t[i];
            if (0 === n.length) continue;
            this.et[n] = this.st;
            e.classList.add(n);
        }
    }
}

function Be(e) {
    if (A(e)) return Ee(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...Be(e[i]));
            return t;
        } else return t.emptyArray;
    }
    const s = [];
    let i;
    for (i in e) if (Boolean(e[i])) if (i.includes(" ")) s.push(...Ee(i)); else s.push(i);
    return s;
}

function Ee(e) {
    const s = e.match(/\S+/g);
    if (null === s) return t.emptyArray;
    return s;
}

function Ie(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = Wt({
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
                this.element.className = Be(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ Ts ], e));
        t.register(i);
    }
}

function Te(...t) {
    return new ShadowDOMRegistry(t);
}

const De = t.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Se))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get($e);
        const s = t.get(De);
        t.register(M(Pe, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Se ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Se ];

const Pe = t.DI.createInterface("IShadowDOMStyles");

const $e = t.DI.createInterface("IShadowDOMGlobalStyles", (e => e.instance({
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

const Le = {
    shadowDOM(e) {
        return St.creating(t.IContainer, (t => {
            if (null != e.sharedStyles) {
                const s = t.get(De);
                t.register(M($e, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: Oe, exit: qe} = s.ConnectableSwitcher;

const {wrap: Ue, unwrap: je} = s.ProxyObservable;

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
            return this.value = je(this.$get.call(void 0, this.useProxy ? Ue(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            qe(this);
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
        this.boundFn = false;
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

ft(true)(ComputedWatcher);

s.connectable(ExpressionWatcher);

ft(true)(ExpressionWatcher);

const _e = t.DI.createInterface("ILifecycleHooks");

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
        _(_e, this.Type).register(t);
    }
}

const Fe = new WeakMap;

const Me = f("lifecycle-hooks");

const Ve = Object.freeze({
    name: Me,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(Me, s, e);
        p(e, Me);
        return s.Type;
    },
    resolve(t) {
        let e = Fe.get(t);
        if (void 0 === e) {
            Fe.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(_e) : t.has(_e, false) ? s.getAll(_e).concat(t.getAll(_e)) : s.getAll(_e);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(Me, n.constructor);
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

function Ne() {
    return function t(e) {
        return Ve.define({}, e);
    };
}

const He = t.DI.createInterface("IViewFactory");

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

const We = new WeakSet;

function ze(t) {
    return !We.has(t);
}

function Ge(t) {
    We.add(t);
    return CustomElementDefinition.create(t);
}

const Xe = d("views");

const Ke = Object.freeze({
    name: Xe,
    has(t) {
        return C(t) && (h(Xe, t) || "$views" in t);
    },
    get(t) {
        if (C(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(ze).map(Ge);
            for (const e of s) Ke.add(t, e);
        }
        let e = l(Xe, t);
        if (void 0 === e) c(Xe, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(Xe, t);
        if (void 0 === i) c(Xe, i = [ s ], t); else i.push(s);
        return i;
    }
});

function Qe(t) {
    return function(e) {
        Ke.add(e, t);
    };
}

const Ye = t.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = Ke.has(t.constructor) ? Ke.get(t.constructor) : [];
            const i = C(e) ? e(t, s) : this.ot(s, e);
            return this.lt(t, s, i);
        }
        return null;
    }
    lt(t, e, s) {
        let i = this.nt.get(t);
        let n;
        if (void 0 === i) {
            i = {};
            this.nt.set(t, i);
        } else n = i[s];
        if (void 0 === n) {
            const r = this.ht(t, e, s);
            n = pe(ve(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            i[s] = n;
        }
        return n;
    }
    ht(t, e, i) {
        let n = this.rt.get(t.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.rt.set(t.constructor, n);
        } else r = n[i];
        if (void 0 === r) {
            r = pe(this.ct(e, i), class {
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
    ot(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    ct(t, e) {
        const s = t.find((t => t.name === e));
        if (void 0 === s) throw new Error(`Could not find view: ${e}`);
        return s;
    }
}

const Ze = t.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.p = (this.dt = t.root).get(Se);
        this.xt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.gt ? this.gt = this.dt.getAll(Ks, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.gt;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.ut;
            const n = e.get(Xs);
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
        const s = this.ft;
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
        return null == e ? this.xt : new FragmentNodeSequence(this.p, e.cloneNode(true));
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

const ts = {
    optional: true
};

const es = new WeakMap;

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
        this.vt = false;
        this.wt = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.bt = 0;
        this.yt = 0;
        this.kt = 0;
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
        return es.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(e, s, i, n, r = void 0, o = null) {
        if (es.has(s)) return es.get(s);
        r = r ?? ve(s.constructor);
        const l = new Controller(e, 0, r, null, s, i, o);
        const h = e.get(t.optional(ds));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        e.registerResolver(ds, new t.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        es.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (es.has(e)) return es.get(e);
        i = i ?? zt(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        es.set(e, n);
        n.Ct();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.At();
        return s;
    }
    hE(e, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.viewModel;
        let l = this.definition;
        this.scope = s.Scope.create(o, null, true);
        if (l.watches.length > 0) ls(this, n, l, o);
        is(this, l, r, o);
        this.wt = ns(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Ve.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == e || false !== e.hydrate) {
            this.hS(e);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(xs, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = xe(this.host, ts))) {
            this.host = this.container.root.get(Se).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = qs(this.host);
        }
        Is(this.host, ae, this);
        Is(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw new Error(`AUR0501`);
            Is(this.shadowRoot = this.host.attachShadow(s ?? as), ae, this);
            Is(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Is(o, ae, this);
            Is(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(gs, this);
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
        if (t.watches.length > 0) ls(this, this.container, t, e);
        is(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Ve.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(ms, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    At() {
        this.Rt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Rt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Rt)).findTargets(), this.Rt, void 0);
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
            throw new Error(`AUR0503:${this.name} ${us(this.state)}`);
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
        this.St();
        let r;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) r = t.resolveAll(...this.lifecycleHooks.binding.map(vs, this));
        if (this.hooks.hasBinding) r = t.resolveAll(r, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (y(r)) {
            this.Bt();
            r.then((() => {
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
        let e = 0;
        let s = this.wt.length;
        let i;
        if (s > 0) while (s > e) {
            this.wt[e].start();
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = t.resolveAll(...this.lifecycleHooks.bound.map(ws, this));
        if (this.hooks.hasBound) i = t.resolveAll(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (y(i)) {
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
                const e = t.has(Pe, false) ? t.get(Pe) : t.get($e);
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) s = t.resolveAll(...this.lifecycleHooks.attaching.map(bs, this));
        if (this.hooks.hasAttaching) s = t.resolveAll(s, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (y(s)) {
            this.Bt();
            this.St();
            s.then((() => {
                this.Dt();
            })).catch((t => {
                this.Et(t);
            }));
        }
        if (null !== this.children) for (;e < this.children.length; ++e) void this.children[e].activate(this.$initiator, this, this.$flags, this.scope);
        this.Dt();
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
            throw new Error(`AUR0505:${this.name} ${us(this.state)}`);
        }
        this.$initiator = e;
        this.$flags = i;
        if (e === this) this.Pt();
        let n = 0;
        let r;
        if (this.wt.length) for (;n < this.wt.length; ++n) this.wt[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(e, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) r = t.resolveAll(...this.lifecycleHooks.detaching.map(ks, this));
        if (this.hooks.hasDetaching) r = t.resolveAll(r, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (y(r)) {
            this.Bt();
            e.Pt();
            r.then((() => {
                e.$t();
            })).catch((t => {
                e.Et(t);
            }));
        }
        if (null === e.head) e.head = this; else e.tail.next = this;
        e.tail = this;
        if (e !== this) return;
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
            As = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            As();
            As = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            Rs = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Rs(t);
            Rs = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    St() {
        ++this.bt;
        if (this.$initiator !== this) this.parent.St();
    }
    Dt() {
        if (0 === --this.bt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Ss = t.resolveAll(...this.lifecycleHooks.attached.map(ys, this));
            if (this.hooks.hasAttached) Ss = t.resolveAll(Ss, this.viewModel.attached(this.$initiator, this.$flags));
            if (y(Ss)) {
                this.Bt();
                Ss.then((() => {
                    this.state = 2;
                    this.Lt();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                Ss = void 0;
                return;
            }
            Ss = void 0;
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
            let e = this.$initiator.head;
            let s;
            while (null !== e) {
                if (e !== this) {
                    if (e.debug) e.logger.trace(`detach()`);
                    e.removeNodes();
                }
                if (2 !== e.vmKind && null != e.lifecycleHooks.unbinding) s = t.resolveAll(...e.lifecycleHooks.unbinding.map(Cs, this));
                if (e.hooks.hasUnbinding) {
                    if (e.debug) e.logger.trace("unbinding()");
                    s = t.resolveAll(s, e.viewModel.unbinding(e.$initiator, e.parent, e.$flags));
                }
                if (y(s)) {
                    this.Bt();
                    this.Ot();
                    s.then((() => {
                        this.qt();
                    })).catch((t => {
                        this.Et(t);
                    }));
                }
                s = void 0;
                e = e.next;
            }
            this.qt();
        }
    }
    Ot() {
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
            return zt(this.viewModel.constructor).name === t;

          case 0:
            return ve(this.viewModel.constructor).name === t;

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
            Is(t, ae, this);
            Is(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Is(t, ae, this);
            Is(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Is(t, ae, this);
            Is(t, this.definition.key, this);
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
            this.children.forEach(ps);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            es.delete(this.viewModel);
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

function ss(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function is(t, e, i, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const c = ss(n);
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

function ns(e, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = ss(i);
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

const rs = new Map;

const os = t => {
    let e = rs.get(t);
    if (null == e) {
        e = new s.AccessScopeExpression(t, 0);
        rs.set(t, e);
    }
    return e;
};

function ls(t, e, i, n) {
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
            f = A(a) ? o.parse(a, 8) : os(a);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function hs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function cs(t) {
    return e.isObject(t) && me(t.constructor);
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

const as = {
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

function us(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const fs = t.DI.createInterface("IController");

const ds = t.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function ps(t) {
    t.dispose();
}

function ms(t) {
    t.instance.created(this.viewModel, this);
}

function xs(t) {
    t.instance.hydrating(this.viewModel, this);
}

function gs(t) {
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

function ys(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function ks(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Cs(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let As;

let Rs;

let Ss;

const Bs = t.DI.createInterface("IAppRoot");

class AppRoot {
    constructor(e, s, i, n) {
        this.config = e;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.Ut = void 0;
        this.host = e.host;
        n.prepare(this);
        i.registerResolver(s.HTMLElement, i.registerResolver(s.Element, i.registerResolver(Ts, new t.InstanceProvider("ElementResolver", e.host))));
        this.Ut = t.onResolve(this.jt("creating"), (() => {
            const s = e.component;
            const n = i.createChild();
            let r;
            if (me(s)) r = this.container.get(s); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this.jt("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this.jt("hydrated"), (() => {
                    l.hC();
                    this.Ut = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.Ut, (() => t.onResolve(this.jt("activating"), (() => t.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.jt("activated")))))));
    }
    deactivate() {
        return t.onResolve(this.jt("deactivating"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.jt("deactivated")))));
    }
    jt(e) {
        return t.resolveAll(...this.container.getAll(Rt).reduce(((t, s) => {
            if (s.slot === e) t.push(s.run());
            return t;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function Es(t, e) {
    return t.$au?.[e] ?? null;
}

function Is(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const Ts = t.DI.createInterface("INode");

const Ds = t.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Bs, true)) return t.get(Bs).host;
    return t.get(Se).document;
}))));

const Ps = t.DI.createInterface("IRenderLocation");

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

const $s = new WeakMap;

function Ls(t) {
    if ($s.has(t)) return $s.get(t);
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
        const e = xe(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Ls(e.host);
    }
    return t.parentNode;
}

function Os(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) $s.set(s[t], e);
    } else $s.set(t, e);
}

function qs(t) {
    if (Us(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function Us(t) {
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
            if ("AU-M" === r.nodeName) o[i] = qs(r); else o[i] = r;
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
        if (Us(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const js = t.DI.createInterface("IWindow", (t => t.callback((t => t.get(Se).window))));

const _s = t.DI.createInterface("ILocation", (t => t.callback((t => t.get(js).location))));

const Fs = t.DI.createInterface("IHistory", (t => t.callback((t => t.get(js).history))));

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
    constructor(t, e, s, i, n, r) {
        this.locator = t;
        this.ast = e;
        this.target = s;
        this.targetEvent = i;
        this.eventDelegator = n;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
        this.boundFn = true;
        this._t = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let s = this.ast.evaluate(this.$scope, this, null);
        delete e.$event;
        if (C(s)) s = s(t);
        if (true !== s && this._t.prevent) t.preventDefault();
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
        if (0 === this._t.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Ds), this.target, this.targetEvent, this, Ms[this._t.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = null;
        if (0 === this._t.strategy) this.target.removeEventListener(this.targetEvent, this); else {
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

ft(true, true)(Listener);

const Vs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = Vs) {
        this.Ft = t;
        this.Mt = e;
        this._t = s;
        this.Vt = 0;
        this.Nt = new Map;
        this.Ht = new Map;
    }
    Wt() {
        if (1 === ++this.Vt) this.Ft.addEventListener(this.Mt, this, this._t);
    }
    zt() {
        if (0 === --this.Vt) this.Ft.removeEventListener(this.Mt, this, this._t);
    }
    dispose() {
        if (this.Vt > 0) {
            this.Vt = 0;
            this.Ft.removeEventListener(this.Mt, this, this._t);
        }
        this.Nt.clear();
        this.Ht.clear();
    }
    Gt(t) {
        const e = true === this._t.capture ? this.Nt : this.Ht;
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = g());
        return s;
    }
    handleEvent(t) {
        const e = true === this._t.capture ? this.Nt : this.Ht;
        const s = t.composedPath();
        if (true === this._t.capture) s.reverse();
        for (const i of s) {
            const s = e.get(i);
            if (void 0 === s) continue;
            const n = s[this.Mt];
            if (void 0 === n) continue;
            if (C(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, s, i) {
        this.Xt = t;
        this.Kt = e;
        this.Mt = s;
        t.Wt();
        e[s] = i;
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

const Ns = t.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Qt = g();
    }
    addEventListener(t, e, s, i, n) {
        var r;
        const o = (r = this.Qt)[s] ?? (r[s] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, s, n));
        return new DelegateSubscription(l, l.Gt(e), s, i);
    }
    dispose() {
        for (const t in this.Qt) {
            const e = this.Qt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Hs = t.DI.createInterface("IProjections");

const Ws = t.DI.createInterface("IAuSlotsInfo");

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

const zs = t.DI.createInterface("Instruction");

function Gs(t) {
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

const Xs = t.DI.createInterface("ITemplateCompiler");

const Ks = t.DI.createInterface("IRenderer");

function Qs(t) {
    return function e(s) {
        s.register = function(t) {
            _(Ks, this).register(t);
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
        return xe(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return xe(t).viewModel;

      default:
        {
            const s = Ht(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = xe(t, {
                name: e
            });
            if (void 0 === i) throw new Error(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let ti = class SetPropertyRenderer {
    render(t, e, s) {
        const i = Zs(e);
        if (void 0 !== i.$observers && void 0 !== i.$observers[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

ti = r([ Qs("re") ], ti);

let ei = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ze, Se ];
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
            n = a.find(ye, h);
            if (null == n) throw new Error(`AUR0752:${h}@${e["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? qs(s) : null;
        const d = Bi(this.p, e, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        d.registerResolver(r, new t.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        Is(s, n.key, l);
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

ei = r([ Qs("ra") ], ei);

let si = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ze, Se ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(Gt, s.res);
            if (null == n) throw new Error(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = Ei(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Is(e, n.key, o);
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

si = r([ Qs("rb") ], si);

let ii = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ze, Se ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(Gt, s.res);
            if (null == n) throw new Error(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = this.r.getViewFactory(s.def, i);
        const o = qs(e);
        const l = Ei(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Is(o, n.key, h);
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

ii = r([ Qs("rc") ], ii);

let ni = class LetElementRenderer {
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
            t.addBinding(18 === h.$kind ? fi(c, h, r) : c);
            ++a;
        }
    }
};

ni.inject = [ s.IExpressionParser, s.IObserverLocator ];

ni = r([ Qs("rd") ], ni);

let ri = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, i, Zs(e), s.to);
        t.addBinding(18 === i.$kind ? fi(n, i, t.container) : n);
    }
};

ri.inject = [ s.IExpressionParser, s.IObserverLocator ];

ri = r([ Qs("rh") ], ri);

let oi = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new RefBinding(t.container, i, Js(e, s.to));
        t.addBinding(18 === i.$kind ? fi(n, i, t.container) : n);
    }
};

oi.inject = [ s.IExpressionParser ];

oi = r([ Qs("rj") ], oi);

let li = class InterpolationBindingRenderer {
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
            if (18 === c.ast.$kind) o[h] = fi(c, c.ast, i);
        }
        t.addBinding(r);
    }
};

li.inject = [ s.IExpressionParser, s.IObserverLocator, Se ];

li = r([ Qs("rf") ], li);

let hi = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, Zs(e), s.to, s.mode);
        t.addBinding(18 === i.$kind ? fi(n, i, t.container) : n);
    }
};

hi.inject = [ s.IExpressionParser, s.IObserverLocator, Se ];

hi = r([ Qs("rg") ], hi);

let ci = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, Zs(e), s.to, 2);
        t.addBinding(18 === i.iterable.$kind ? fi(n, i.iterable, t.container) : n);
    }
};

ci.inject = [ s.IExpressionParser, s.IObserverLocator, Se ];

ci = r([ Qs("rk") ], ci);

let ai = 0;

const ui = [];

function fi(t, e, i) {
    while (e instanceof s.BindingBehaviorExpression) {
        ui[ai++] = e;
        e = e.expression;
    }
    while (ai > 0) {
        const e = ui[--ai];
        const s = i.get(lt.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    ui.length = 0;
    return t;
}

let di = class TextBindingRenderer {
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
            t.addBinding(18 === p.$kind ? fi(d, p, i) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

di.inject = [ s.IExpressionParser, s.IObserverLocator, Se ];

di = r([ Qs("ha") ], di);

let pi = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.Yt = e;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 4);
        const n = new Listener(t.container, i, e, s.to, this.Yt, new ListenerOptions(s.preventDefault, s.strategy));
        t.addBinding(18 === i.$kind ? fi(n, i, t.container) : n);
    }
};

pi.inject = [ s.IExpressionParser, Ns ];

pi = r([ Qs("hb") ], pi);

let mi = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

mi = r([ Qs("he") ], mi);

let xi = class SetClassAttributeRenderer {
    render(t, e, s) {
        yi(e.classList, s.value);
    }
};

xi = r([ Qs("hf") ], xi);

let gi = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

gi = r([ Qs("hg") ], gi);

let vi = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, 2);
        t.addBinding(18 === i.$kind ? fi(n, i, t.container) : n);
    }
};

vi.inject = [ s.IExpressionParser, s.IObserverLocator, Se ];

vi = r([ Qs("hd") ], vi);

let wi = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = Ys(this.ep, s.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, 2);
        t.addBinding(18 === i.$kind ? fi(n, i, t.container) : n);
    }
};

wi.inject = [ Se, s.IExpressionParser, s.IObserverLocator ];

wi = r([ Qs("hc") ], wi);

let bi = class SpreadRenderer {
    constructor(t, e) {
        this.Zt = t;
        this.r = e;
    }
    static get inject() {
        return [ Xs, Ze ];
    }
    render(e, s, i) {
        const n = e.container;
        const r = n.get(ds);
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
            const r = ki(n);
            const c = this.Zt.compileSpread(n.controller.definition, n.instruction?.captures ?? t.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, xe(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            e.addBinding(r);
        };
        h(0);
    }
};

bi = r([ Qs("hs") ], bi);

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

function yi(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const ki = t => new SpreadBinding([], t);

const Ci = "IController";

const Ai = "IInstruction";

const Ri = "IRenderLocation";

const Si = "IAuSlotsInfo";

function Bi(e, s, i, n, r, o) {
    const l = s.container.createChild();
    l.registerResolver(e.HTMLElement, l.registerResolver(e.Element, l.registerResolver(Ts, new t.InstanceProvider("ElementResolver", i))));
    l.registerResolver(fs, new t.InstanceProvider(Ci, s));
    l.registerResolver(zs, new t.InstanceProvider(Ai, n));
    l.registerResolver(Ps, null == r ? Ii : new RenderLocationProvider(r));
    l.registerResolver(He, Ti);
    l.registerResolver(Ws, null == o ? Di : new t.InstanceProvider(Si, o));
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

function Ei(e, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    c.registerResolver(e.HTMLElement, c.registerResolver(e.Element, c.registerResolver(Ts, new t.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    c.registerResolver(fs, new t.InstanceProvider(Ci, i));
    c.registerResolver(zs, new t.InstanceProvider(Ai, r));
    c.registerResolver(Ps, null == l ? Ii : new t.InstanceProvider(Ri, l));
    c.registerResolver(He, null == o ? Ti : new ViewFactoryProvider(o));
    c.registerResolver(Ws, null == h ? Di : new t.InstanceProvider(Si, h));
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

const Ii = new RenderLocationProvider(null);

const Ti = new ViewFactoryProvider(null);

const Di = new t.InstanceProvider(Si, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Pi(t) {
    return function(e) {
        return qi.define(t, e);
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
        return new BindingCommandDefinition(s, t.firstDefined(Oi(s, "name"), i), t.mergeArrays(Oi(s, "aliases"), n.aliases, s.aliases), Li(i), t.firstDefined(Oi(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        _(s, e).register(t);
        F(s, e).register(t);
        W(i, qi, s, t);
    }
}

const $i = d("binding-command");

const Li = t => `${$i}:${t}`;

const Oi = (t, e) => l(f(e), t);

const qi = Object.freeze({
    name: $i,
    keyFrom: Li,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c($i, s, s.Type);
        c($i, s, s);
        p(e, $i);
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

exports.OneTimeBindingCommand = r([ Pi("one-time") ], exports.OneTimeBindingCommand);

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

exports.ToViewBindingCommand = r([ Pi("to-view") ], exports.ToViewBindingCommand);

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

exports.FromViewBindingCommand = r([ Pi("from-view") ], exports.FromViewBindingCommand);

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

exports.TwoWayBindingCommand = r([ Pi("two-way") ], exports.TwoWayBindingCommand);

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

exports.DefaultBindingCommand = r([ Pi("bind") ], exports.DefaultBindingCommand);

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

exports.CallBindingCommand = r([ Pi("call") ], exports.CallBindingCommand);

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

exports.ForBindingCommand = r([ Pi("for") ], exports.ForBindingCommand);

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

exports.TriggerBindingCommand = r([ Pi("trigger") ], exports.TriggerBindingCommand);

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

exports.DelegateBindingCommand = r([ Pi("delegate") ], exports.DelegateBindingCommand);

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

exports.CaptureBindingCommand = r([ Pi("capture") ], exports.CaptureBindingCommand);

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

exports.AttrBindingCommand = r([ Pi("attr") ], exports.AttrBindingCommand);

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

exports.StyleBindingCommand = r([ Pi("style") ], exports.StyleBindingCommand);

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

exports.ClassBindingCommand = r([ Pi("class") ], exports.ClassBindingCommand);

let Ui = class RefBindingCommand {
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

Ui = r([ Pi("ref") ], Ui);

let ji = class SpreadBindingCommand {
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

ji = r([ Pi("...$attrs") ], ji);

const _i = t.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const Fi = t => {
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
        this.ee = Object.assign(g(), {
            a: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: Fi("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: g(),
            altGlyphDef: Fi("id xml:base xml:lang xml:space"),
            altglyphdef: g(),
            altGlyphItem: Fi("id xml:base xml:lang xml:space"),
            altglyphitem: g(),
            animate: Fi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: Fi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: Fi("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: Fi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: Fi("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: Fi("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": Fi("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: Fi("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: Fi("class id style xml:base xml:lang xml:space"),
            ellipse: Fi("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: Fi("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: Fi("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: Fi("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: Fi("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: Fi("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: Fi("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: Fi("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: Fi("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: Fi("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: Fi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: Fi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: Fi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: Fi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: Fi("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: Fi("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: Fi("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: Fi("id xml:base xml:lang xml:space"),
            feMorphology: Fi("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: Fi("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: Fi("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: Fi("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: Fi("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: Fi("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: Fi("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: Fi("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: Fi("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": Fi("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": Fi("id string xml:base xml:lang xml:space"),
            "font-face-name": Fi("id name xml:base xml:lang xml:space"),
            "font-face-src": Fi("id xml:base xml:lang xml:space"),
            "font-face-uri": Fi("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: Fi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: Fi("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: Fi("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: g(),
            hkern: Fi("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: Fi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: Fi("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: Fi("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: Fi("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: Fi("id xml:base xml:lang xml:space"),
            "missing-glyph": Fi("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: Fi("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: Fi("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: Fi("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: Fi("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: Fi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: Fi("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: Fi("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: Fi("class id offset style xml:base xml:lang xml:space"),
            style: Fi("id media title type xml:base xml:lang xml:space"),
            svg: Fi("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: Fi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: Fi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: Fi("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: Fi("class id style xml:base xml:lang xml:space"),
            tref: Fi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: Fi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: Fi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: Fi("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: Fi("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.se = Fi("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.ie = Fi("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return _(_i, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.se[t.nodeName] && true === this.ie[e] || true === this.ee[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ Se ];

const Mi = t.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ne = g();
        this.re = g();
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
        return [ _i ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.ne)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw Ni(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.re;
        for (const s in t) {
            if (void 0 !== e[s]) throw Ni(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return Vi(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.ne[t.nodeName]?.[e] ?? this.re[e] ?? (b(t, e, this.svg) ? e : null);
    }
}

function Vi(t, e) {
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

function Ni(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const Hi = t.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Wi = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.oe = t.document.createElement("template");
    }
    createTemplate(t) {
        if (A(t)) {
            let e = Wi[t];
            if (void 0 === e) {
                const s = this.oe;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.oe = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Wi[t] = e;
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

TemplateElementFactory.inject = [ Se ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return _(Xs, this).register(t);
    }
    compile(e, s, i) {
        const n = CustomElementDefinition.getOrCreate(e);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = Xi);
        const r = new CompilationContext(e, s, i, null, null, void 0);
        const o = A(n.template) || !e.enhance ? r.le.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(j(on));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(sn)) throw new Error(`AUR0701`);
        this.he(h, r);
        this.ce(h, r);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || fe(),
            dependencies: (e.dependencies ?? t.emptyArray).concat(r.deps ?? t.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.ae(o, r) : t.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, s, i, n) {
        const r = new CompilationContext(e, i, Xi, null, null, void 0);
        const o = [];
        const l = r.ue(n.nodeName.toLowerCase());
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
            w = r.fe(f);
            if (null !== w && (1 & w.type) > 0) {
                Qi.node = n;
                Qi.attr = f;
                Qi.bindable = null;
                Qi.def = null;
                o.push(w.build(Qi, r.ep, r.m));
                continue;
            }
            d = r.de(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                x = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && zi(C);
                if (y) m = this.pe(n, C, d, r); else {
                    v = x.primary;
                    if (null === w) {
                        b = c.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        Qi.node = n;
                        Qi.attr = f;
                        Qi.bindable = v;
                        Qi.def = d;
                        m = [ w.build(Qi, r.ep, r.m) ];
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
                        Qi.node = n;
                        Qi.attr = f;
                        Qi.bindable = g;
                        Qi.def = l;
                        o.push(new SpreadElementPropBindingInstruction(w.build(Qi, r.ep, r.m)));
                        continue;
                    }
                }
                Qi.node = n;
                Qi.attr = f;
                Qi.bindable = null;
                Qi.def = null;
                o.push(w.build(Qi, r.ep, r.m));
            }
        }
        Gi();
        if (null != p) return p.concat(o);
        return o;
    }
    ae(e, s) {
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
            u = s.me.parse(c, a);
            b = u.target;
            y = u.rawValue;
            if (Yi[b]) throw new Error(`AUR0702:${c}`);
            g = s.fe(u);
            if (null !== g && (1 & g.type) > 0) {
                Qi.node = e;
                Qi.attr = u;
                Qi.bindable = null;
                Qi.def = null;
                i.push(g.build(Qi, s.ep, s.m));
                continue;
            }
            f = s.de(b);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(f, true);
                w = false === f.noMultiBindings && null === g && zi(y);
                if (w) p = this.pe(e, y, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        v = r.parse(y, 1);
                        p = [ null === v ? new SetPropertyInstruction(y, x.property) : new InterpolationInstruction(v, x.property) ];
                    } else {
                        Qi.node = e;
                        Qi.attr = u;
                        Qi.bindable = x;
                        Qi.def = f;
                        p = [ g.build(Qi, s.ep, s.m) ];
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
                Qi.node = e;
                Qi.attr = u;
                Qi.bindable = null;
                Qi.def = null;
                i.push(g.build(Qi, s.ep, s.m));
            }
        }
        Gi();
        if (null != d) return d.concat(i);
        return i;
    }
    ce(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.xe(t, e);

              default:
                return this.ge(t, e);
            }

          case 3:
            return this.ve(t, e);

          case 11:
            {
                let s = t.firstChild;
                while (null !== s) s = this.ce(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    xe(e, i) {
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
            u = i.me.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.fe(u);
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
        return this.we(e).nextSibling;
    }
    ge(e, s) {
        var i, n, r, o;
        const l = e.nextSibling;
        const h = (e.getAttribute("as-element") ?? e.nodeName).toLowerCase();
        const c = s.ue(h);
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
        let L;
        let O;
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
            A = s.me.parse(k, C);
            q = s.fe(A);
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
                    if (null == U.attrs[_] && !s.de(_)?.isTemplateController) {
                        x();
                        p.push(A);
                        continue;
                    }
                }
            }
            if (null !== q && 1 & q.type) {
                Qi.node = e;
                Qi.attr = A;
                Qi.bindable = null;
                Qi.def = null;
                (R ?? (R = [])).push(q.build(Qi, s.ep, s.m));
                x();
                continue;
            }
            B = s.de(_);
            if (null !== B) {
                U = BindablesInfo.from(B, true);
                E = false === B.noMultiBindings && null === q && zi(F);
                if (E) D = this.pe(e, F, B, s); else {
                    j = U.primary;
                    if (null === q) {
                        L = m.parse(F, 1);
                        D = [ null === L ? new SetPropertyInstruction(F, j.property) : new InterpolationInstruction(L, j.property) ];
                    } else {
                        Qi.node = e;
                        Qi.attr = A;
                        Qi.bindable = j;
                        Qi.def = B;
                        D = [ q.build(Qi, s.ep, s.m) ];
                    }
                }
                x();
                if (B.isTemplateController) (P ?? (P = [])).push(new HydrateTemplateController(Ki, this.resolveResources ? B : B.name, void 0, D)); else (T ?? (T = [])).push(new HydrateAttributeInstruction(this.resolveResources ? B : B.name, null != B.aliases && B.aliases.includes(_) ? _ : void 0, D));
                continue;
            }
            if (null === q) {
                if (a) {
                    U = BindablesInfo.from(c, false);
                    I = U.attrs[_];
                    if (void 0 !== I) {
                        L = m.parse(F, 1);
                        (S ?? (S = [])).push(null == L ? new SetPropertyInstruction(F, I.property) : new InterpolationInstruction(L, I.property));
                        x();
                        continue;
                    }
                }
                L = m.parse(F, 1);
                if (null != L) {
                    x();
                    (R ?? (R = [])).push(new InterpolationInstruction(L, s.m.map(e, _) ?? t.camelCase(_)));
                }
                continue;
            }
            x();
            if (a) {
                U = BindablesInfo.from(c, false);
                I = U.attrs[_];
                if (void 0 !== I) {
                    Qi.node = e;
                    Qi.attr = A;
                    Qi.bindable = I;
                    Qi.def = c;
                    (S ?? (S = [])).push(q.build(Qi, s.ep, s.m));
                    continue;
                }
            }
            Qi.node = e;
            Qi.attr = A;
            Qi.bindable = null;
            Qi.def = null;
            (R ?? (R = [])).push(q.build(Qi, s.ep, s.m));
        }
        Gi();
        if (this.be(e) && null != R && R.length > 1) this.ye(e, R);
        if (a) {
            O = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, S ?? t.emptyArray, null, V, p);
            if (h === fn) {
                const t = e.getAttribute("name") || un;
                const i = s.h("template");
                const n = s.ke();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else i.content.appendChild(r);
                    r = e.firstChild;
                }
                this.ce(i.content, n);
                O.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: fe(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.Ce(e, s);
            }
        }
        if (null != R || null != O || null != T) {
            v = t.emptyArray.concat(O ?? t.emptyArray, T ?? t.emptyArray, R ?? t.emptyArray);
            this.we(e);
        }
        let H;
        if (null != P) {
            w = P.length - 1;
            b = w;
            $ = P[b];
            let t;
            this.Ce(e, s);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = s.h("template");
                t.content.appendChild(e);
            }
            const r = t;
            const o = s.ke(null == v ? [] : [ v ]);
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
                f = 1 === A.nodeType ? A.getAttribute(fn) : null;
                if (null !== f) A.removeAttribute(fn);
                if (a) {
                    l = A.nextSibling;
                    if (!u) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = p ?? (p = {}))[n = f || un] ?? (i[n] = [])).push(A);
                        e.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== f) {
                        f = f || un;
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
                    y = s.ke();
                    this.ce(t.content, y);
                    d[f] = CustomElementDefinition.create({
                        name: fe(),
                        template: t,
                        instructions: y.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                O.projections = d;
            }
            if (a && (V || c.containerless)) this.Ce(e, s);
            H = !a || !c.containerless && !V && false !== M;
            if (H) if ("TEMPLATE" === e.nodeName) this.ce(e.content, o); else {
                A = e.firstChild;
                while (null !== A) A = this.ce(A, o);
            }
            $.def = CustomElementDefinition.create({
                name: fe(),
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
                    name: fe(),
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
                n = 1 === t.nodeType ? t.getAttribute(fn) : null;
                if (null !== n) t.removeAttribute(fn);
                if (a) {
                    i = t.nextSibling;
                    if (!u) {
                        g = 3 === t.nodeType && "" === t.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || un] ?? (r[o] = [])).push(t);
                        e.removeChild(t);
                    }
                    t = i;
                } else {
                    if (null !== n) {
                        n = n || un;
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
                    x = s.ke();
                    this.ce(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: fe(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                O.projections = l;
            }
            if (a && (V || c.containerless)) this.Ce(e, s);
            H = !a || !c.containerless && !V && false !== M;
            if (H && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.ce(t, s);
            }
        }
        return l;
    }
    ve(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.we(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    pe(t, e, s, i) {
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
                f = i.me.parse(l, h);
                d = i.fe(f);
                p = n.attrs[f.target];
                if (null == p) throw new Error(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    Qi.node = t;
                    Qi.attr = f;
                    Qi.bindable = p;
                    Qi.def = s;
                    o.push(d.build(Qi, i.ep, i.m));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        Gi();
        return o;
    }
    he(e, s) {
        const i = e;
        const n = t.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw new Error(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const e of n) {
            if (e.parentNode !== i) throw new Error(`AUR0709`);
            const n = nn(e, o);
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
                    mode: rn(t)
                });
                const i = t.getAttributeNames().filter((t => !en.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Ae(pe({
                name: n,
                template: e
            }, r));
            i.removeChild(e);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) ve(l[h]).dependencies.push(...s.def.dependencies ?? t.emptyArray, ...s.deps ?? t.emptyArray);
    }
    be(t) {
        return "INPUT" === t.nodeName && 1 === Zi[t.type];
    }
    ye(t, e) {
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
    we(t) {
        t.classList.add("au");
        return t;
    }
    Ce(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.we(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(e, i, n, r, o, l) {
        this.hasSlot = false;
        this.Re = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = e;
        this.ci = n;
        this.parent = r;
        this.le = h ? r.le : i.get(Hi);
        this.me = h ? r.me : i.get(Q);
        this.ep = h ? r.ep : i.get(s.IExpressionParser);
        this.m = h ? r.m : i.get(Mi);
        this.Se = h ? r.Se : i.get(t.ILogger);
        this.p = h ? r.p : i.get(Se);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
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
        return this.c.find(ye, t);
    }
    de(t) {
        return this.c.find(Gt, t);
    }
    ke(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    fe(t) {
        if (this.root !== this) return this.root.fe(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.Re[e];
        if (void 0 === s) {
            s = this.c.create(qi, e);
            if (null === s) throw new Error(`AUR0713:${e}`);
            this.Re[e] = s;
        }
        return s;
    }
}

function zi(t) {
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

function Gi() {
    Qi.node = Qi.attr = Qi.bindable = Qi.def = null;
}

const Xi = {
    projections: null
};

const Ki = {
    name: "unnamed"
};

const Qi = {
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

var tn;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(tn || (tn = {}));

const en = Object.freeze([ "property", "attribute", "mode" ]);

const sn = "as-custom-element";

function nn(t, e) {
    const s = t.getAttribute(sn);
    if (null === s || "" === s) throw new Error(`AUR0715`);
    if (e.has(s)) throw new Error(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(sn);
    }
    return s;
}

function rn(t) {
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

const on = t.DI.createInterface("ITemplateCompilerHooks");

const ln = new WeakMap;

const hn = d("compiler-hooks");

const cn = Object.freeze({
    name: hn,
    define(t) {
        let e = ln.get(t);
        if (void 0 === e) {
            ln.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(hn, e, t);
            p(t, hn);
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
        t.register(_(on, this.Type));
    }
}

const an = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return cn.define(t);
    }
};

const un = "default";

const fn = "au-slot";

var dn;

(function(t) {
    t[t["Space"] = 32] = "Space";
    t[t["Dollar"] = 36] = "Dollar";
    t[t["Semicolon"] = 59] = "Semicolon";
    t[t["Backslash"] = 92] = "Backslash";
    t[t["OpenBrace"] = 123] = "OpenBrace";
    t[t["Colon"] = 58] = "Colon";
})(dn || (dn = {}));

const pn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        pn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = pn.get(e);
        pn.delete(e);
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

it("oneTime")(OneTimeBindingBehavior);

it("toView")(ToViewBindingBehavior);

it("fromView")(FromViewBindingBehavior);

it("twoWay")(TwoWayBindingBehavior);

const mn = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(e, s) {
        super(e, s);
        this.Be = {
            delay: mn
        };
        this.Ee = null;
        this.Ie = null;
        this.J = e.get(t.IPlatform).taskQueue;
        if (s.args.length > 0) this.Ee = s.args[0];
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
            this.Be.delay = isNaN(e) ? mn : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.Ie?.cancel();
        this.Ie = null;
        this.binding.$unbind();
    }
}

it("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Kt = new Map;
        this.Te = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Kt.set(e, s);
        let i;
        for (i of s) this.Te.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.Kt.get(e);
        this.Kt.delete(e);
        let i;
        for (i of s) this.Te.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ s.ISignaler ];

it("signal")(SignalBindingBehavior);

const xn = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(e, s) {
        super(e, s);
        this.Be = {
            delay: xn
        };
        this.Ee = null;
        this.Ie = null;
        this.De = 0;
        this.Pe = 0;
        this.p = e.get(t.IPlatform);
        this.J = this.p.taskQueue;
        if (s.args.length > 0) this.Ee = s.args[0];
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
        const s = this.p;
        const i = this.De + e.delay - s.performanceNow();
        if (i > 0) {
            const n = this.Ie;
            e.delay = i;
            this.Ie = this.J.queueTask((() => {
                this.De = s.performanceNow();
                this.Ie = null;
                e.delay = this.Pe;
                t();
            }), e);
            n?.cancel();
        } else {
            this.De = s.performanceNow();
            t();
        }
    }
    $bind(t) {
        if (null !== this.Ee) {
            const e = Number(this.Ee.evaluate(t, this, null));
            this.Be.delay = this.Pe = isNaN(e) ? xn : e;
        }
        super.$bind(t);
    }
    $unbind() {
        this.Ie?.cancel();
        this.Ie = null;
        super.$unbind();
    }
}

it("throttle")(ThrottleBindingBehavior);

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

const gn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = gn;
    }
    unbind(t, e) {
        return;
    }
}

it("attr")(AttrBindingBehavior);

function vn(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = vn;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

it("self")(SelfBindingBehavior);

const wn = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return wn[t] ?? (wn[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

function bn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Le = void 0;
        this.Oe = void 0;
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
        this.qe();
        this.Ue();
        this.X();
    }
    handleCollectionChange() {
        this.Ue();
    }
    handleChange(t, e) {
        this.Ue();
    }
    Ue() {
        const t = this.v;
        const e = this.o;
        const s = v.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : bn;
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
        const n = void 0 !== e.matcher ? e.matcher : bn;
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
        this.X();
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.qe();
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
        yn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, yn);
    }
    qe() {
        const t = this.o;
        (this.Oe ?? (this.Oe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Le?.unsubscribe(this);
        this.Le = void 0;
        if ("checkbox" === t.type) (this.Le = $n(this.v, this.oL))?.subscribe(this);
    }
}

s.subscriberCollection(CheckedObserver);

let yn;

const kn = {
    childList: true,
    subtree: true,
    characterData: true
};

function Cn(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.N = false;
        this.je = void 0;
        this._e = void 0;
        this.iO = false;
        this.o = t;
        this.oL = i;
        this.handler = s;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? An(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.N = t !== this.ov;
        this.Fe(t instanceof Array ? t : null);
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
        const s = k(t);
        const i = e.matcher ?? Cn;
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
            const o = t.matcher || Cn;
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
    Me() {
        (this._e = new this.o.ownerDocument.defaultView.MutationObserver(this.Ve.bind(this))).observe(this.o, kn);
        this.Fe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ne() {
        this._e.disconnect();
        this.je?.unsubscribe(this);
        this._e = this.je = void 0;
        this.iO = false;
    }
    Fe(t) {
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
        Rn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Rn);
    }
}

s.subscriberCollection(SelectValueObserver);

function An(t) {
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

let Rn;

const Sn = "--";

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
    We(e) {
        let s;
        let i;
        const n = [];
        for (i in e) {
            s = e[i];
            if (null == s) continue;
            if (A(s)) {
                if (i.startsWith(Sn)) {
                    n.push([ i, s ]);
                    continue;
                }
                n.push([ t.kebabCase(i), s ]);
                continue;
            }
            n.push(...this.ze(s));
        }
        return n;
    }
    Ge(e) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...this.ze(e[i]));
            return t;
        }
        return t.emptyArray;
    }
    ze(e) {
        if (A(e)) return this.He(e);
        if (e instanceof Array) return this.Ge(e);
        if (e instanceof Object) return this.We(e);
        return t.emptyArray;
    }
    G() {
        if (this.N) {
            this.N = false;
            const t = this.value;
            const e = this.styles;
            const s = this.ze(t);
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
        Bn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Bn);
    }
}

s.subscriberCollection(ValueAttributeObserver);

let Bn;

const En = "http://www.w3.org/1999/xlink";

const In = "http://www.w3.org/XML/1998/namespace";

const Tn = "http://www.w3.org/2000/xmlns/";

const Dn = Object.assign(g(), {
    "xlink:actuate": [ "actuate", En ],
    "xlink:arcrole": [ "arcrole", En ],
    "xlink:href": [ "href", En ],
    "xlink:role": [ "role", En ],
    "xlink:show": [ "show", En ],
    "xlink:title": [ "title", En ],
    "xlink:type": [ "type", En ],
    "xml:lang": [ "lang", In ],
    "xml:space": [ "space", In ],
    xmlns: [ "xmlns", Tn ],
    "xmlns:xlink": [ "xlink", Tn ]
});

const Pn = new s.PropertyAccessor;

Pn.type = 2 | 4;

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
        this.Xe = g();
        this.Ke = g();
        this.Qe = g();
        this.Ye = g();
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
        F(s.INodeObserverLocator, NodeObserverLocator).register(t);
        _(s.INodeObserverLocator, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.Xe;
        let n;
        if (A(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = new NodeObserverConfig(s); else Ln(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else Ln(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else Ln("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else Ln("*", t);
    }
    getAccessor(e, s, i) {
        if (s in this.Ye || s in (this.Qe[e.tagName] ?? t.emptyObject)) return this.getObserver(e, s, i);
        switch (s) {
          case "src":
          case "href":
          case "role":
          case "minLength":
          case "maxLength":
          case "placeholder":
          case "size":
          case "pattern":
          case "title":
            return gn;

          default:
            {
                const t = Dn[s];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (b(e, s, this.svgAnalyzer)) return gn;
                return Pn;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (A(t)) {
            n = (s = this.Qe)[t] ?? (s[t] = g());
            n[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            n = (i = this.Qe)[e] ?? (i[e] = g());
            n[s] = true;
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
        const n = this.Xe[t.tagName]?.[e] ?? this.Ke[e];
        if (null != n) return new n.type(t, e, new EventSubscriber(n), i, this.locator);
        const r = Dn[e];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (b(t, e, this.svgAnalyzer)) return gn;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new s.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, Se, s.IDirtyChecker, _i ];

function $n(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Ln(t, e) {
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

it("updateTrigger")(UpdateTriggerBindingBehavior);

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
        if (this.$controller.isActive) this.ts(); else this.Ze = true;
    }
    attached() {
        if (this.Ze) {
            this.Ze = false;
            this.ts();
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
        if ("focus" === t.type) this.value = true; else if (!this.es) this.value = false;
    }
    ts() {
        const t = this.Je;
        const e = this.es;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get es() {
        return this.Je === this.p.document.activeElement;
    }
}

Focus.inject = [ Ts, Se ];

r([ I({
    mode: 6
}) ], Focus.prototype, "value", void 0);

jt("focus")(Focus);

let On = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.ss = false;
        this.Ie = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ie = null;
            if (Boolean(this.value) !== this.rs) if (this.rs === this.os) {
                this.rs = !this.os;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.rs = this.os;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.rs = this.os = "hide" !== s.alias;
    }
    binding() {
        this.ss = true;
        this.update();
    }
    detaching() {
        this.ss = false;
        this.Ie?.cancel();
        this.Ie = null;
    }
    valueChanged() {
        if (this.ss && null === this.Ie) this.Ie = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ I ], On.prototype, "value", void 0);

On = r([ o(0, Ts), o(1, Se), o(2, zs) ], On);

H("hide")(On);

jt("show")(On);

class Portal {
    constructor(t, e, s) {
        this.strict = false;
        this.p = s;
        this.ls = s.document.createElement("div");
        this.view = t.create();
        Os(this.view.nodes, e);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.ls = this.cs();
        this.view.setHost(i);
        return this.us(t, i, s);
    }
    detaching(t, e, s) {
        return this.ds(t, this.ls, s);
    }
    targetChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        const s = this.ls;
        const i = this.ls = this.cs();
        if (s === i) return;
        this.view.setHost(i);
        const n = t.onResolve(this.ds(null, i, e.flags), (() => this.us(null, i, e.flags)));
        if (y(n)) n.catch((t => {
            throw t;
        }));
    }
    us(e, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return t.onResolve(n?.call(r, s, o), (() => this.ps(e, s, i)));
    }
    ps(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.appendTo(s); else return t.onResolve(r.activate(e ?? r, n, i, n.scope), (() => this.xs(s)));
        return this.xs(s);
    }
    xs(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    ds(e, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return t.onResolve(n?.call(r, s, o), (() => this.gs(e, s, i)));
    }
    gs(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, i), (() => this.vs(s)));
        return this.vs(s);
    }
    vs(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    cs() {
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

Portal.inject = [ He, Ps, Se ];

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

_t("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.ws = false;
        this.bs = 0;
        this.ys = t;
        this.l = e;
    }
    attaching(e, s, i) {
        let n;
        const r = this.$controller;
        const o = this.bs++;
        const l = () => !this.ws && this.bs === o + 1;
        return t.onResolve(this.pending, (() => {
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ys.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == n) return;
            n.setLocation(this.l);
            this.pending = t.onResolve(n.activate(e, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(e, s, i) {
        this.ws = true;
        return t.onResolve(this.pending, (() => {
            this.ws = false;
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
        const o = this.bs++;
        const l = () => !this.ws && this.bs === o + 1;
        let h;
        return t.onResolve(this.pending, (() => this.pending = t.onResolve(n?.deactivate(n, r, i), (() => {
            if (!l()) return;
            if (e) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ys.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
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

If.inject = [ He, Ps ];

r([ I ], If.prototype, "value", void 0);

r([ I({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

_t("if")(If);

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

Else.inject = [ He ];

_t({
    name: "else"
})(Else);

function qn(t) {
    t.dispose();
}

const Un = [ 18, 17 ];

class Repeat {
    constructor(t, e, s) {
        this.views = [];
        this.key = void 0;
        this.ks = void 0;
        this.Cs = false;
        this.As = false;
        this.Rs = null;
        this.Ss = void 0;
        this.Bs = false;
        this.l = t;
        this.Es = e;
        this.f = s;
    }
    binding(t, e, s) {
        const i = this.Es.bindings;
        const n = i.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = i[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Is = r;
                let t = o.iterable;
                while (null != t && Un.includes(t.$kind)) {
                    t = t.expression;
                    this.Cs = true;
                }
                this.Rs = t;
                break;
            }
        }
        this.Ts();
        const h = o.declaration;
        if (!(this.Bs = 24 === h.$kind || 25 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
    }
    attaching(t, e, s) {
        this.Ds();
        return this.Ps(t);
    }
    detaching(t, e, s) {
        this.Ts();
        return this.$s(t);
    }
    itemsChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        this.Ts();
        this.Ds();
        const s = t.onResolve(this.$s(null), (() => this.Ps(null)));
        if (y(s)) s.catch(S);
    }
    handleCollectionChange(e, i) {
        const n = this.$controller;
        if (!n.isActive) return;
        if (this.Cs) {
            if (this.As) return;
            this.As = true;
            this.items = this.forOf.iterable.evaluate(n.scope, this.Is, null);
            this.As = false;
            return;
        }
        this.Ds();
        if (void 0 === i) {
            const e = t.onResolve(this.$s(null), (() => this.Ps(null)));
            if (y(e)) e.catch(S);
        } else {
            const e = this.views.length;
            const n = s.applyMutationsToIndices(i);
            if (n.deletedIndices.length > 0) {
                const s = t.onResolve(this.Ls(n), (() => this.Os(e, n)));
                if (y(s)) s.catch(S);
            } else this.Os(e, n);
        }
    }
    Ts() {
        const t = this.$controller.scope;
        let e = this.qs;
        let i = this.Cs;
        let n;
        if (i) {
            e = this.qs = this.Rs.evaluate(t, this.Is, null) ?? null;
            i = this.Cs = !Object.is(this.items, e);
        }
        const r = this.ks;
        if (this.$controller.isActive) {
            n = this.ks = s.getCollectionObserver(i ? e : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.ks = void 0;
        }
    }
    Ds() {
        const t = this.items;
        if (k(t)) {
            this.Ss = t;
            return;
        }
        const e = [];
        zn(t, ((t, s) => {
            e[s] = t;
        }));
        this.Ss = e;
    }
    Ps(t) {
        let e;
        let i;
        let n;
        let r;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = Wn(a);
        const p = this.views = Array(d);
        zn(a, ((a, m) => {
            n = p[m] = l.create().setLocation(c);
            n.nodes.unlink();
            if (this.Bs) f.declaration.assign(r = s.Scope.fromParent(u, new s.BindingContext), this.Is, a); else r = s.Scope.fromParent(u, new s.BindingContext(h, a));
            Nn(r.overrideContext, m, d);
            i = n.activate(t ?? n, o, 0, r);
            if (y(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    $s(t) {
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
    Ls(t) {
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
    Os(t, e) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, Ss: u, l: f, views: d} = this;
        const p = e.length;
        for (;p > l; ++l) if (-2 === e[l]) {
            r = c.create();
            d.splice(l, 0, r);
        }
        if (d.length !== p) throw Vn(d.length, p);
        const m = h.scope;
        const x = e.length;
        s.synchronizeIndices(d, e);
        const g = Mn(e);
        const v = g.length;
        let w;
        let b = v - 1;
        l = x - 1;
        for (;l >= 0; --l) {
            r = d[l];
            w = d[l + 1];
            r.nodes.link(w?.nodes ?? f);
            if (-2 === e[l]) {
                if (this.Bs) this.forOf.declaration.assign(o = s.Scope.fromParent(m, new s.BindingContext), this.Is, u[l]); else o = s.Scope.fromParent(m, new s.BindingContext(a, u[l]));
                Nn(o.overrideContext, l, x);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (y(n)) (i ?? (i = [])).push(n);
            } else if (b < 0 || 1 === v || l !== g[b]) {
                Nn(r.scope.overrideContext, l, x);
                r.nodes.insertBefore(r.location);
            } else {
                if (t !== x) Nn(r.scope.overrideContext, l, x);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(qn);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Ps, fs, He ];

r([ I ], Repeat.prototype, "items", void 0);

_t("repeat")(Repeat);

let jn = 16;

let _n = new Int32Array(jn);

let Fn = new Int32Array(jn);

function Mn(t) {
    const e = t.length;
    if (e > jn) {
        jn = e;
        _n = new Int32Array(e);
        Fn = new Int32Array(e);
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
            o = _n[s];
            n = t[o];
            if (-2 !== n && n < i) {
                Fn[r] = o;
                _n[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[_n[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[_n[l]];
            if (i < n || -2 === n) {
                if (l > 0) Fn[r] = _n[l - 1];
                _n[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = _n[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = Fn[i];
    }
    while (r-- > 0) _n[r] = 0;
    return a;
}

const Vn = (t, e) => new Error(`AUR0814:${t}!=${e}`);

const Nn = (t, e, s) => {
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

const Hn = Object.prototype.toString;

const Wn = t => {
    switch (Hn.call(t)) {
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
        throw new Error(`Cannot count ${Hn.call(t)}`);
    }
};

const zn = (t, e) => {
    switch (Hn.call(t)) {
      case "[object Array]":
        return Gn(t, e);

      case "[object Map]":
        return Xn(t, e);

      case "[object Set]":
        return Kn(t, e);

      case "[object Number]":
        return Qn(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw new Error(`Cannot iterate over ${Hn.call(t)}`);
    }
};

const Gn = (t, e) => {
    const s = t.length;
    let i = 0;
    for (;i < s; ++i) e(t[i], i, t);
};

const Xn = (t, e) => {
    let s = -0;
    let i;
    for (i of t.entries()) e(i, s++, t);
};

const Kn = (t, e) => {
    let s = 0;
    let i;
    for (i of t.keys()) e(i, s++, t);
};

const Qn = (t, e) => {
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

With.inject = [ He, Ps ];

r([ I ], With.prototype, "value", void 0);

_t("with")(With);

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
        this.queue((() => this.Us(t)));
    }
    Us(e) {
        const s = e.isMatch(this.value);
        const i = this.activeCases;
        const n = i.length;
        if (!s) {
            if (n > 0 && i[0].id === e.id) return this.js(null);
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
        return t.onResolve(this.js(null, r), (() => {
            this.activeCases = r;
            return this._s(null);
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
        return t.onResolve(this.activeCases.length > 0 ? this.js(e, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this._s(e);
        }));
    }
    _s(e) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(e, 0, r);
        return t.resolveAll(...i.map((t => t.activate(e, 0, r))));
    }
    js(e, s = []) {
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

exports.Switch = r([ _t("switch"), o(0, He), o(1, Ps) ], exports.Switch);

let Yn = 0;

exports.Case = class Case {
    constructor(t, e, s, i) {
        this.f = t;
        this.Fs = e;
        this.l = s;
        this.id = ++Yn;
        this.fallThrough = false;
        this.view = void 0;
        this.Ms = i.config.level <= 1;
        this.Se = i.scopeTo(`${this.constructor.name}-#${this.id}`);
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
        this.Se.debug("isMatch()");
        const e = this.value;
        if (k(e)) {
            if (void 0 === this.ks) this.ks = this.Vs(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (k(t)) {
            this.ks?.unsubscribe(this);
            this.ks = this.Vs(t);
        } else if (void 0 !== this.ks) this.ks.unsubscribe(this);
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
        this.ks?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Vs(t) {
        const e = this.Fs.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ He, s.IObserverLocator, Ps, t.ILogger ];

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

exports.Case = r([ _t("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ _t("default-case") ], exports.DefaultCase);

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

exports.PromiseTemplateController = r([ _t("promise"), o(0, He), o(1, Ps), o(2, Se), o(3, t.ILogger) ], exports.PromiseTemplateController);

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

exports.PendingTemplateController = r([ _t("pending"), o(0, He), o(1, Ps) ], exports.PendingTemplateController);

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

exports.FulfilledTemplateController = r([ _t("then"), o(0, He), o(1, Ps) ], exports.FulfilledTemplateController);

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

exports.RejectedTemplateController = r([ _t("catch"), o(0, He), o(1, Ps) ], exports.RejectedTemplateController);

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

Jn = r([ Y({
    pattern: "promise.resolve",
    symbols: ""
}) ], Jn);

let tr = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

tr = r([ Y({
    pattern: "then",
    symbols: ""
}) ], tr);

let er = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

er = r([ Y({
    pattern: "catch",
    symbols: ""
}) ], er);

function sr(t, e, s, i) {
    if (A(e)) return ir(t, e, s, i);
    if (me(e)) return nr(t, e, s, i);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Ns = s;
        this.Hs = void 0;
    }
    get definition() {
        if (void 0 === this.Hs) this.Hs = CustomElementDefinition.create({
            name: fe(),
            template: this.node,
            needsCompile: A(this.node),
            instructions: this.instructions,
            dependencies: this.Ns
        });
        return this.Hs;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Ze).getViewFactory(this.definition, t.createChild().register(...this.Ns));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Ns);
    }
}

function ir(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (Gs(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) rr(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function nr(t, e, s, i) {
    const n = ve(e);
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
        if (Gs(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) rr(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function rr(t, e, s, i, n) {
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

function or(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, e, s, i) {
        this.p = t;
        this.Ws = e;
        this.zs = s;
        this.r = i;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Gs = void 0;
        this.Xs = e.props.reduce(or, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.Gs !== i) {
            this.Gs = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.gs(this.view, t, s);
    }
    componentChanged(e, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Gs === e) return;
        this.Gs = e;
        this.composing = true;
        i |= n.flags;
        const r = t.onResolve(this.gs(this.view, null, i), (() => this.compose(void 0, e, null, i)));
        if (y(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(e, s, i, n) {
        return t.onResolve(void 0 === e ? t.onResolve(s, (t => this.Ks(t, n))) : e, (t => this.ps(this.view = t, i, n)));
    }
    gs(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    ps(e, s, i) {
        const {$controller: n} = this;
        return t.onResolve(e?.activate(s ?? e, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Ks(t, e) {
        const s = this.Qs(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Qs(t, e) {
        if (null == t) return;
        const s = this.zs.controller.container;
        if ("object" === typeof t) {
            if (lr(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (A(t)) {
            const e = s.find(ye, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return sr(this.p, t, this.Xs, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ Se, zs, ds, Ze ];

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

function lr(t) {
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
        this.Ys = void 0;
        this.r = t.get(Ze);
        this.Ws = r;
        this.Zs = o;
    }
    static get inject() {
        return [ t.IContainer, fs, Ts, Ps, Se, zs, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Js;
    }
    get composition() {
        return this.Ys;
    }
    attaching(e, s, i) {
        return this.Js = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this.Zs.isCurrent(t)) this.Js = void 0;
        }));
    }
    detaching(e) {
        const s = this.Ys;
        const i = this.Js;
        this.Zs.invalidate();
        this.Ys = this.Js = void 0;
        return t.onResolve(i, (() => s?.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.Ys) {
            this.Ys.update(this.model);
            return;
        }
        this.Js = t.onResolve(this.Js, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this.Zs.isCurrent(t)) this.Js = void 0;
        }))));
    }
    queue(e, s) {
        const i = this.Zs;
        const n = this.Ys;
        return t.onResolve(i.create(e), (e => {
            if (i.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (i.isCurrent(e)) return t.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(e)) {
                        this.Ys = r;
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
                    projections: this.Ws.projections
                }, d);
                return new CompositionController(s, (t => s.activate(t ?? s, u, 1, u.scope.parentScope)), (e => t.onResolve(s.deactivate(e ?? s, u, 2), r)), (t => i.activate?.(t)), e);
            } else {
                const t = CustomElementDefinition.create({
                    name: ye.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? s.Scope.fromParent(this.parent.scope, i) : s.Scope.create(i);
                if (Us(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), e);
            }
        };
        if ("activate" in i) return t.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(e, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = Us(i);
        e.registerResolver(n.Element, e.registerResolver(Ts, new t.InstanceProvider("ElementResolver", r ? null : i)));
        e.registerResolver(Ps, new t.InstanceProvider("IRenderLocation", r ? i : null));
        const o = e.invoke(s);
        e.registerResolver(s, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = C(t) ? t : t?.constructor;
        return ye.isType(e) ? ye.getDefinition(e) : null;
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
        this.ti = null;
        this.ei = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.si = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.si = true;
        }
        this.zs = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Ps, zs, ds, Ze ];
    }
    binding(t, e, i) {
        this.ti = this.$controller.scope.parentScope;
        let n;
        if (this.si) {
            n = this.zs.controller.scope.parentScope;
            (this.ei = s.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.ti.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.si ? this.ei : this.ti);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.si && null != this.ei) this.ei.overrideContext.$host = t;
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

const hr = t.DI.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.ii = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.ii.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, hr) ], exports.SanitizeValueConverter);

ht("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.ni = t;
    }
    toView(t, e) {
        return this.ni.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, Ye) ], exports.ViewValueConverter);

ht("view")(exports.ViewValueConverter);

const cr = DebounceBindingBehavior;

const ar = OneTimeBindingBehavior;

const ur = ToViewBindingBehavior;

const fr = FromViewBindingBehavior;

const dr = SignalBindingBehavior;

const pr = ThrottleBindingBehavior;

const mr = TwoWayBindingBehavior;

const xr = TemplateCompiler;

const gr = NodeObserverLocator;

const vr = [ xr, gr ];

const wr = SVGAnalyzer;

const br = exports.AtPrefixedTriggerAttributePattern;

const yr = exports.ColonPrefixedBindAttributePattern;

const kr = exports.RefAttributePattern;

const Cr = exports.DotSeparatedAttributePattern;

const Ar = st;

const Rr = [ kr, Cr, Ar ];

const Sr = [ br, yr ];

const Br = exports.CallBindingCommand;

const Er = exports.DefaultBindingCommand;

const Ir = exports.ForBindingCommand;

const Tr = exports.FromViewBindingCommand;

const Dr = exports.OneTimeBindingCommand;

const Pr = exports.ToViewBindingCommand;

const $r = exports.TwoWayBindingCommand;

const Lr = Ui;

const Or = exports.TriggerBindingCommand;

const qr = exports.DelegateBindingCommand;

const Ur = exports.CaptureBindingCommand;

const jr = exports.AttrBindingCommand;

const _r = exports.ClassBindingCommand;

const Fr = exports.StyleBindingCommand;

const Mr = ji;

const Vr = [ Er, Dr, Tr, Pr, $r, Br, Ir, Lr, Or, qr, Ur, _r, Fr, jr, Mr ];

const Nr = exports.SanitizeValueConverter;

const Hr = exports.ViewValueConverter;

const Wr = If;

const zr = Else;

const Gr = Repeat;

const Xr = With;

const Kr = exports.Switch;

const Qr = exports.Case;

const Yr = exports.DefaultCase;

const Zr = exports.PromiseTemplateController;

const Jr = exports.PendingTemplateController;

const to = exports.FulfilledTemplateController;

const eo = exports.RejectedTemplateController;

const so = Jn;

const io = tr;

const no = er;

const ro = AttrBindingBehavior;

const oo = SelfBindingBehavior;

const lo = UpdateTriggerBindingBehavior;

const ho = AuRender;

const co = AuCompose;

const ao = Portal;

const uo = Focus;

const fo = On;

const po = [ cr, ar, ur, fr, dr, pr, mr, Nr, Hr, Wr, zr, Gr, Xr, Kr, Qr, Yr, Zr, Jr, to, eo, so, io, no, ro, oo, lo, ho, co, ao, uo, fo, AuSlot ];

const mo = ri;

const xo = si;

const go = ei;

const vo = li;

const wo = ci;

const bo = ni;

const yo = hi;

const ko = oi;

const Co = ti;

const Ao = ii;

const Ro = pi;

const So = wi;

const Bo = mi;

const Eo = xi;

const Io = gi;

const To = vi;

const Do = di;

const Po = bi;

const $o = [ yo, wo, mo, ko, vo, Co, go, xo, Ao, bo, Ro, So, Bo, Eo, Io, To, Do, Po ];

const Lo = Oo(t.noop);

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
            return e.register(M(s.ICoercionConfiguration, i.coercingOptions), ...vr, ...po, ...Rr, ...Vr, ...$o);
        },
        customize(e) {
            return Oo(e ?? t);
        }
    };
}

const qo = t.DI.createInterface("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.ri = false;
        this.oi = false;
        this.li = void 0;
        this.next = void 0;
        this.hi = void 0;
        this.ai = void 0;
        if (e.has(qo, true)) throw new Error(`AUR0768`);
        e.registerResolver(qo, new t.InstanceProvider("IAurelia", this));
        e.registerResolver(Bs, this.ui = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ri;
    }
    get isStopping() {
        return this.oi;
    }
    get root() {
        if (null == this.li) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.li;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.fi(t.host), this.container, this.ui);
        return this;
    }
    enhance(e, s) {
        const i = e.container ?? this.container.createChild();
        const n = e.host;
        const r = this.fi(n);
        const o = e.component;
        let l;
        if (C(o)) {
            i.registerResolver(r.HTMLElement, i.registerResolver(r.Element, i.registerResolver(Ts, new t.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        i.registerResolver(Ds, new t.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: fe(),
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
    fi(t) {
        let e;
        if (!this.container.has(Se, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(M(Se, e));
        } else e = this.container.get(Se);
        return e;
    }
    start(e = this.next) {
        if (null == e) throw new Error(`AUR0770`);
        if (y(this.hi)) return this.hi;
        return this.hi = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.ui.prepare(this.li = e);
            this.ri = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.ri = false;
                this.hi = void 0;
                this.di(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (y(this.ai)) return this.ai;
        if (true === this.ir) {
            const s = this.li;
            this.ir = false;
            this.oi = true;
            return this.ai = t.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (e) s.dispose();
                this.li = void 0;
                this.ui.dispose();
                this.oi = false;
                this.di(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.oi) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    di(t, e, s) {
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

const Uo = t.DI.createInterface("IDialogService");

const jo = t.DI.createInterface("IDialogController");

const _o = t.DI.createInterface("IDialogDomRenderer");

const Fo = t.DI.createInterface("IDialogDom");

const Mo = t.DI.createInterface("IDialogGlobalSettings");

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
            this.Lt = t;
            this.Et = e;
        }));
    }
    static get inject() {
        return [ Se, t.IContainer ];
    }
    activate(e) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = e;
        const o = s.get(_o);
        const l = e.host ?? this.p.document.body;
        const h = this.dom = o.render(l, e);
        const c = s.has(Ds, true) ? s.get(Ds) : null;
        const a = h.contentHost;
        this.settings = e;
        if (null == c || !c.contains(l)) s.register(M(Ds, l));
        s.register(M(Ts, a), M(Fo, h));
        return new Promise((t => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, e, a), {
                $dialog: this
            });
            t(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw Vo(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return t.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: ye.generateName(),
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
        if (this.pi) return this.pi;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(e, s);
        const a = new Promise((a => {
            a(t.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.pi = void 0;
                    if (h) throw Vo(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return t.onResolve(o.deactivate?.(c), (() => t.onResolve(n.deactivate(n, null, 2), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== e) this.Lt(c); else this.Et(Vo(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.pi = void 0;
            throw t;
        }));
        this.pi = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(e) {
        const s = No(e);
        return new Promise((e => e(t.onResolve(this.cmp.deactivate?.(DialogCloseResult.create("error", s)), (() => t.onResolve(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Et(s);
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
        e.registerResolver(r.HTMLElement, e.registerResolver(r.Element, e.registerResolver(Ts, new t.InstanceProvider("ElementResolver", i))));
        return e.invoke(n);
    }
    getDefinition(t) {
        const e = C(t) ? t : t?.constructor;
        return ye.isType(e) ? ye.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Vo(t, e) {
    const s = new Error(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function No(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.dt = t;
        this.p = e;
        this.mi = s;
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
        return [ t.IContainer, Se, Mo ];
    }
    static register(e) {
        e.register(_(Uo, this), St.deactivating(Uo, (e => t.onResolve(e.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(e) {
        return Wo(new Promise((s => {
            const i = DialogSettings.from(this.mi, e);
            const n = i.container ?? this.dt.createChild();
            s(t.onResolve(i.load(), (e => {
                const s = n.invoke(DialogController);
                n.register(M(jo, s));
                n.register(V(DialogController, (() => {
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
        const s = zo(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).gi().xi();
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
    gi() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    xi() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Ho(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function Wo(t) {
    t.whenClosed = Ho;
    return t;
}

function zo(t) {
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
        _(Mo, this).register(t);
    }
}

const Go = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Go} display:flex;`;
        this.overlayCss = Go;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        _(_o, this).register(t);
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

DefaultDialogDomRenderer.inject = [ Se ];

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

function Xo(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, St.creating((() => t(s.get(Mo))))),
        customize(t, s) {
            return Xo(t, s ?? e);
        }
    };
}

const Ko = Xo((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(_(Mo, this));
    }
} ]);

const Qo = Xo(t.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

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
            n = ye.isType(s) ? ye.getDefinition(s) : CustomElementDefinition.create(ye.generateName(), s);
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
                e.registerResolver(c.HTMLElement, e.registerResolver(c.Element, e.registerResolver(Ts, new t.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, e, {
                    projections: null
                });
                const i = e.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(e, i, this, null, s);
                Is(this, s.key, r);
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

WcCustomElementRegistry.inject = [ t.IContainer, Se, Ze ];

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = St;

exports.AtPrefixedTriggerAttributePatternRegistration = br;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = ro;

exports.AttrBindingCommandRegistration = jr;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = So;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = et;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = ho;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = P;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = lt;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingBehaviorFactory = BindingBehaviorFactory;

exports.BindingCommand = qi;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingInterceptor = BindingInterceptor;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Br;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = mo;

exports.CaptureBindingCommandRegistration = Ur;

exports.CheckedObserver = CheckedObserver;

exports.Children = Dt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = _r;

exports.ColonPrefixedBindAttributePatternRegistration = yr;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = Gt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = xo;

exports.CustomElement = ye;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = go;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = cr;

exports.DefaultBindingCommandRegistration = Er;

exports.DefaultBindingLanguage = Vr;

exports.DefaultBindingSyntax = Rr;

exports.DefaultComponents = vr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = $o;

exports.DefaultResources = po;

exports.DelegateBindingCommandRegistration = qr;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = Ko;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = Qo;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = Cr;

exports.Else = Else;

exports.ElseRegistration = zr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.FlushQueue = FlushQueue;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Ir;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = fr;

exports.FromViewBindingCommandRegistration = Tr;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Bs;

exports.IAppTask = Rt;

exports.IAttrMapper = Mi;

exports.IAttributeParser = Q;

exports.IAttributePattern = K;

exports.IAuSlotsInfo = Ws;

exports.IAurelia = qo;

exports.IController = fs;

exports.IDialogController = jo;

exports.IDialogDom = Fo;

exports.IDialogDomRenderer = _o;

exports.IDialogGlobalSettings = Mo;

exports.IDialogService = Uo;

exports.IEventDelegator = Ns;

exports.IEventTarget = Ds;

exports.IFlushQueue = pt;

exports.IHistory = Fs;

exports.IHydrationContext = ds;

exports.IInstruction = zs;

exports.ILifecycleHooks = _e;

exports.ILocation = _s;

exports.INode = Ts;

exports.INodeObserverLocatorRegistration = gr;

exports.IPlatform = Se;

exports.IProjections = Hs;

exports.IRenderLocation = Ps;

exports.IRenderer = Ks;

exports.IRendering = Ze;

exports.ISVGAnalyzer = _i;

exports.ISanitizer = hr;

exports.IShadowDOMGlobalStyles = $e;

exports.IShadowDOMStyles = Pe;

exports.ISyntaxInterpreter = z;

exports.ITemplateCompiler = Xs;

exports.ITemplateCompilerHooks = on;

exports.ITemplateCompilerRegistration = xr;

exports.ITemplateElementFactory = Hi;

exports.IViewFactory = He;

exports.IViewLocator = Ye;

exports.IWcElementRegistry = Yo;

exports.IWindow = js;

exports.If = If;

exports.IfRegistration = Wr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = vo;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = wo;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = bo;

exports.LifecycleHooks = Ve;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = Ro;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = ar;

exports.OneTimeBindingCommandRegistration = Dr;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = yo;

exports.RefAttributePatternRegistration = kr;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Lr;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = ko;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = Gr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = wr;

exports.SanitizeValueConverterRegistration = Nr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = oo;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Bo;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Eo;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = Co;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Io;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Sr;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = dr;

exports.StandardConfiguration = Lo;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Fr;

exports.StyleConfiguration = Le;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = To;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = cn;

exports.TemplateControllerRendererRegistration = Ao;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = Do;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = pr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = ur;

exports.ToViewBindingCommandRegistration = Pr;

exports.TriggerBindingCommandRegistration = Or;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = mr;

exports.TwoWayBindingCommandRegistration = $r;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = lo;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = ut;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Hr;

exports.Views = Ke;

exports.Watch = Yt;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = Xr;

exports.alias = H;

exports.allResources = j;

exports.applyBindingBehavior = fi;

exports.astEvaluator = ft;

exports.attributePattern = Y;

exports.bindable = I;

exports.bindingBehavior = it;

exports.bindingCommand = Pi;

exports.capture = Re;

exports.children = Et;

exports.coercer = $;

exports.containerless = te;

exports.convertToRenderLocation = qs;

exports.createElement = sr;

exports.cssModules = Ie;

exports.customAttribute = jt;

exports.customElement = Zt;

exports.getEffectiveParentNode = Ls;

exports.getRef = Es;

exports.isCustomElementController = hs;

exports.isCustomElementViewModel = cs;

exports.isInstruction = Gs;

exports.isRenderLocation = Us;

exports.lifecycleHooks = Ne;

exports.processContent = Ce;

exports.registerAliases = W;

exports.renderer = Qs;

exports.setEffectiveParentNode = Os;

exports.setRef = Is;

exports.shadowCSS = Te;

exports.strict = se;

exports.templateCompilerHooks = an;

exports.templateController = _t;

exports.useShadowDOM = Jt;

exports.valueConverter = ht;

exports.view = Qe;

exports.watch = Xt;
//# sourceMappingURL=index.cjs.map
