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

const v = t => new Error(t);

const w = Object.prototype.hasOwnProperty;

const b = g();

const y = (t, e, s) => {
    if (true === b[e]) return true;
    if (!R(e)) return false;
    const i = e.slice(0, 5);
    return b[e] = "aria-" === i || "data-" === i || s.isStandardSvgAttribute(t, e);
};

const k = t => t instanceof Promise;

const C = t => t instanceof Array;

const A = t => "function" === typeof t;

const R = t => "string" === typeof t;

const S = Object.defineProperty;

const B = t => {
    throw t;
};

const I = Reflect.defineProperty;

const T = (t, e, s) => {
    I(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
};

function D(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(P, BindableDefinition.create(e, t, s), t.constructor, e);
        m(t.constructor, $.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (R(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function E(t) {
    return t.startsWith(P);
}

const P = f("bindable");

const $ = Object.freeze({
    name: P,
    keyFrom: t => `${P}:${t}`,
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
                if (R(i)) {
                    n = i;
                    r = {
                        property: n
                    };
                } else {
                    n = i.property;
                    r = i;
                }
                e = BindableDefinition.create(n, t, r);
                if (!h(P, t, n)) m(t, $.keyFrom(n));
                c(P, e, t, n);
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
        const s = P.length + 1;
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
            h = x(a).filter(E);
            c = h.length;
            for (u = 0; u < c; ++u) i[o++] = l(P, a, h[u].slice(s));
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
        return new BindableDefinition(t.firstDefined(i.attribute, t.kebabCase(e)), t.firstDefined(i.callback, `${e}Changed`), t.firstDefined(i.mode, 2), t.firstDefined(i.primary, false), t.firstDefined(i.property, e), t.firstDefined(i.set, q(e, s, i)));
    }
}

function L(t, e, s) {
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

function q(e, s, i = {}) {
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
    return r === t.noop ? r : U(r, i.nullable);
}

function U(t, e) {
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
        const c = this.i = A(l);
        const a = this.u = A(h);
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

const F = t.DI.createInterface;

const M = t.Registration.singleton;

const V = t.Registration.aliasTo;

const N = t.Registration.instance;

const H = t.Registration.callback;

const W = t.Registration.transient;

const z = (t, e, s) => t.registerResolver(e, s);

function G(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) c(s, t, e); else i.push(...t);
    };
}

function X(e, s, i, n) {
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

const K = F("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        i = i.filter(Q);
        if (i.length > 0) {
            i.sort(Y);
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

function Q(t) {
    return t.isEndpoint;
}

function Y(t, e) {
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

const Z = F("IAttributePattern");

const J = F("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(e, s) {
        this.U = {};
        this.j = e;
        const i = this._ = {};
        const n = s.reduce(((t, e) => {
            const s = it(e.constructor);
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

AttributeParser.inject = [ K, t.all(Z) ];

function tt(...t) {
    return function e(s) {
        return nt.define(t, s);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        M(Z, this.Type).register(t);
    }
}

const et = d("attribute-pattern");

const st = "attribute-pattern-definitions";

const it = e => t.Protocol.annotation.get(e, st);

const nt = Object.freeze({
    name: et,
    definitionAnnotationKey: st,
    define(e, s) {
        const i = new AttributePatternResourceDefinition(s);
        c(et, i, s);
        p(s, et);
        t.Protocol.annotation.set(s, st, e);
        m(s, st);
        return s;
    },
    getPatternDefinitions: it
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[1]);
    }
    "PART.PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[2]);
    }
};

exports.DotSeparatedAttributePattern = r([ tt({
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

exports.RefAttributePattern = r([ tt({
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

exports.ColonPrefixedBindAttributePattern = r([ tt({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ tt({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let rt = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

rt = r([ tt({
    pattern: "...$attrs",
    symbols: ""
}) ], rt);

exports.BindingBehaviorStrategy = void 0;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(exports.BindingBehaviorStrategy || (exports.BindingBehaviorStrategy = {}));

function ot(t) {
    return function(e) {
        return at.define(t, e);
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
        if (R(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        const r = Object.getPrototypeOf(s) === BindingInterceptor;
        return new BindingBehaviorDefinition(s, t.firstDefined(ct(s, "name"), i), t.mergeArrays(ct(s, "aliases"), n.aliases, s.aliases), at.keyFrom(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", n, s, (() => r ? 2 : 1)));
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
        X(n, at, i, e);
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

const lt = [ "isBound", "$scope", "obs", "ast", "locator", "oL", "boundFn" ];

lt.forEach((t => {
    I(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const ht = d("binding-behavior");

const ct = (t, e) => l(f(e), t);

const at = Object.freeze({
    name: ht,
    keyFrom(t) {
        return `${ht}:${t}`;
    },
    isType(t) {
        return A(t) && h(ht, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(ht, s, s.Type);
        c(ht, s, s);
        p(e, ht);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ht, t);
        if (void 0 === e) throw v(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ct
});

function ut(t) {
    return function(e) {
        return pt.define(t, e);
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
        if (R(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new ValueConverterDefinition(s, t.firstDefined(dt(s, "name"), i), t.mergeArrays(dt(s, "aliases"), n.aliases, s.aliases), pt.keyFrom(i));
    }
    register(e) {
        const {Type: s, key: i, aliases: n} = this;
        t.Registration.singleton(i, s).register(e);
        t.Registration.aliasTo(i, s).register(e);
        X(n, pt, i, e);
    }
}

const ft = d("value-converter");

const dt = (t, e) => l(f(e), t);

const pt = Object.freeze({
    name: ft,
    keyFrom: t => `${ft}:${t}`,
    isType(t) {
        return A(t) && h(ft, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(ft, s, s.Type);
        c(ft, s, s);
        p(e, ft);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ft, t);
        if (void 0 === e) throw v(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: dt
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
        const i = this.b;
        if (t !== s.astEvaluate(i.ast, i.$scope, i, null)) {
            this.v = t;
            this.F.add(this);
        }
    }
}

function mt(t, e = true) {
    return s => {
        const i = s.prototype;
        if (null != t) I(i, "strict", {
            enumerable: true,
            get: function() {
                return t;
            }
        });
        I(i, "strictFnCall", {
            enumerable: true,
            get: function() {
                return e;
            }
        });
        T(i, "get", (function(t) {
            return this.locator.get(t);
        }));
        T(i, "getConverter", (function(t) {
            const e = pt.keyFrom(t);
            let s = xt.get(this);
            if (null == s) xt.set(this, s = new ResourceLookup);
            return s[e] ?? (s[e] = this.locator.get(j(e)));
        }));
        T(i, "getBehavior", (function(t) {
            const e = at.keyFrom(t);
            let s = xt.get(this);
            if (null == s) xt.set(this, s = new ResourceLookup);
            return s[e] ?? (s[e] = this.locator.get(j(e)));
        }));
    };
}

const xt = new WeakMap;

class ResourceLookup {}

const gt = F("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.V.forEach(vt);
        } finally {
            this.M = false;
        }
    }
    clear() {
        this.V.clear();
        this.M = false;
    }
}

function vt(t, e, s) {
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
        const i = s.astEvaluate(this.ast, this.$scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.$scope === t) return;
            this.interceptor.$unbind();
        }
        this.$scope = t;
        s.astBind(this.ast, t, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
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

mt(true)(CallBinding);

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
                    if (R(e) && e.includes("!important")) {
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
                throw v(`AUR0651:${this.W}`);
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
            wt(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) bt(this.o, this);
    }
    X() {
        Ct = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ct);
    }
}

s.subscriberCollection(AttributeObserver);

const wt = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(yt)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const bt = (t, e) => {
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

const yt = t => {
    t[0].target.$eMObs.forEach(kt, t);
};

function kt(t) {
    t.handleMutation(this);
}

let Ct;

const At = {
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
        s.astAssign(this.ast, this.$scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.mode;
        const e = this.interceptor;
        const i = this.$scope;
        const n = this.targetObserver;
        const r = 1 !== this.K.state && (4 & n.type) > 0;
        let o = false;
        let l;
        o = 0 === (1 & t);
        if (o) this.obs.version++;
        const h = s.astEvaluate(this.ast, i, this, e);
        if (o) this.obs.clear();
        if (h !== this.value) {
            this.value = h;
            if (r) {
                l = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    e.updateTarget(h);
                }), At);
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
        s.astBind(this.ast, t, this.interceptor);
        let e = this.targetObserver;
        if (!e) e = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        const i = this.mode;
        const n = this.interceptor;
        let r = false;
        if (i & (2 | 1)) {
            r = (2 & i) > 0;
            n.updateTarget(this.value = s.astEvaluate(this.ast, t, this, r ? n : null));
        }
        if (4 & i) e.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n, this.locator.get(gt))));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
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

mt(true)(AttributeBinding);

const Rt = {
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
        if (1 === s) i = e[0] + t[0].v + e[1]; else {
            i = e[0];
            for (;s > n; ++n) i += t[n].v + e[n + 1];
        }
        const r = this.targetObserver;
        const o = 1 !== this.K.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(i, this.target, this.targetProperty);
            }), Rt);
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

mt(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, s, i, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = s;
        this.locator = i;
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
        const i = s.astEvaluate(this.ast, this.$scope, this, e ? this.interceptor : null);
        if (e) t.clear();
        if (i != this.v) {
            this.v = i;
            if (C(i)) this.observeCollection(i);
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
        s.astBind(this.ast, t, this.interceptor);
        this.v = s.astEvaluate(this.ast, t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (C(this.v)) this.observeCollection(this.v);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

s.connectable(InterpolationPartBinding);

mt(true)(InterpolationPartBinding);

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
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.K = t;
        this.oL = s;
    }
    updateTarget(t) {
        const e = this.target;
        const s = this.p.Node;
        const i = this.v;
        this.v = t;
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
        const e = s.astEvaluate(this.ast, this.$scope, this, t ? this.interceptor : null);
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
        const t = this.v = s.astEvaluate(this.ast, this.$scope, this, (2 & this.mode) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (C(t)) this.observeCollection(t);
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
        s.astBind(this.ast, t, this.interceptor);
        const e = this.v = s.astEvaluate(this.ast, t, this, (2 & this.mode) > 0 ? this.interceptor : null);
        if (C(e)) this.observeCollection(e);
        this.updateTarget(e);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
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
        }), Rt);
        e?.cancel();
    }
}

s.connectable()(ContentBinding);

mt(void 0, false)(ContentBinding);

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
        const i = t[e];
        this.obs.version++;
        const n = s.astEvaluate(this.ast, this.$scope, this, this.interceptor);
        this.obs.clear();
        if (n !== i) t[e] = n;
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
        s.astBind(this.ast, t, this.interceptor);
        this.target[this.targetProperty] = s.astEvaluate(this.ast, t, this, this.interceptor);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

s.connectable(LetBinding);

mt(true)(LetBinding);

const St = {
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
        s.astAssign(this.ast, this.$scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.K.state && (4 & this.targetObserver.type) > 0;
        const e = this.obs;
        let i = false;
        i = this.mode > 1;
        if (i) e.version++;
        const n = s.astEvaluate(this.ast, this.$scope, this, this.interceptor);
        if (i) e.clear();
        if (t) {
            Bt = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(n);
                this.task = null;
            }), St);
            Bt?.cancel();
            Bt = null;
        } else this.interceptor.updateTarget(n);
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
        s.astBind(this.ast, t, this.interceptor);
        const e = this.oL;
        const i = this.mode;
        let n = this.targetObserver;
        if (!n) {
            if (4 & i) n = e.getObserver(this.target, this.targetProperty); else n = e.getAccessor(this.target, this.targetProperty);
            this.targetObserver = n;
        }
        const r = this.interceptor;
        const o = (2 & i) > 0;
        if (i & (2 | 1)) r.updateTarget(s.astEvaluate(this.ast, t, this, o ? r : null));
        if (4 & i) {
            n.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r, this.locator.get(gt))));
            if (!o) r.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
        this.$scope = void 0;
        Bt = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != Bt) {
            Bt.cancel();
            Bt = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

s.connectable(PropertyBinding);

mt(true, false)(PropertyBinding);

let Bt = null;

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
        s.astBind(this.ast, t, this);
        s.astAssign(this.ast, this.$scope, this, this.target);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (s.astEvaluate(this.ast, this.$scope, this, null) === this.target) s.astAssign(this.ast, this.$scope, this, null);
        s.astUnbind(this.ast, this.$scope, this.interceptor);
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

const It = F("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(N(It, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Tt = Object.freeze({
    creating: Dt("creating"),
    hydrating: Dt("hydrating"),
    hydrated: Dt("hydrated"),
    activating: Dt("activating"),
    activated: Dt("activated"),
    deactivating: Dt("deactivating"),
    deactivated: Dt("deactivated")
});

function Dt(t) {
    function e(e, s) {
        if (A(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Et(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c($t, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, Lt.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (R(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function Pt(t) {
    return t.startsWith($t);
}

const $t = f("children-observer");

const Lt = Object.freeze({
    name: $t,
    keyFrom: t => `${$t}:${t}`,
    from(...t) {
        const e = {};
        function s(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function i(t, s) {
            e[t] = ChildrenDefinition.create(t, s);
        }
        function n(t) {
            if (C(t)) t.forEach(s); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => i(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(e) {
        const s = $t.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(Pt);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l($t, a, h[t].slice(s));
        }
        return i;
    }
});

const Ot = {
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
        return new ChildrenDefinition(t.firstDefined(s.callback, `${e}Changed`), t.firstDefined(s.property, e), s.options ?? Ot, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = qt, r = Ut, o = jt, l) {
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
        return Ft(this.controller, this.query, this.filter, this.map);
    }
}

s.subscriberCollection()(ChildrenObserver);

function qt(t) {
    return t.host.childNodes;
}

function Ut(t, e, s) {
    return !!s;
}

function jt(t, e, s) {
    return s;
}

const _t = {
    optional: true
};

function Ft(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = we(l, _t);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

function Mt(t) {
    return function(e) {
        return Xt(t, e);
    };
}

function Vt(t) {
    return function(e) {
        return Xt(R(t) ? {
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
        if (R(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new CustomAttributeDefinition(s, t.firstDefined(Wt(s, "name"), i), t.mergeArrays(Wt(s, "aliases"), n.aliases, s.aliases), Ht(i), t.firstDefined(Wt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, 2), t.firstDefined(Wt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), $.from(s, ...$.getAll(s), Wt(s, "bindables"), s.bindables, n.bindables), t.firstDefined(Wt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(te.getAnnotation(s), s.watches), t.mergeArrays(Wt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        W(s, e).register(t);
        V(s, e).register(t);
        X(i, Qt, s, t);
    }
}

const Nt = d("custom-attribute");

const Ht = t => `${Nt}:${t}`;

const Wt = (t, e) => l(f(e), t);

const zt = t => A(t) && h(Nt, t);

const Gt = (t, e) => Es(t, Ht(e)) ?? void 0;

const Xt = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    c(Nt, s, s.Type);
    c(Nt, s, s);
    p(e, Nt);
    return s.Type;
};

const Kt = t => {
    const e = l(Nt, t);
    if (void 0 === e) throw v(`AUR0759:${t.name}`);
    return e;
};

const Qt = Object.freeze({
    name: Nt,
    keyFrom: Ht,
    isType: zt,
    for: Gt,
    define: Xt,
    getDefinition: Kt,
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: Wt
});

function Yt(t, e) {
    if (null == t) throw v(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!A(e) && (null == e || !(e in l.prototype))) throw v(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!A(r?.value)) throw v(`AUR0774:${String(n)}`);
        te.add(l, h);
        if (zt(l)) Kt(l).watches.push(h);
        if (ve(l)) ye(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Zt = t.emptyArray;

const Jt = f("watch");

const te = Object.freeze({
    name: Jt,
    add(t, e) {
        let s = l(Jt, t);
        if (null == s) c(Jt, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(Jt, t) ?? Zt;
    }
});

function ee(t) {
    return function(e) {
        return ge(t, e);
    };
}

function se(t) {
    if (void 0 === t) return function(t) {
        xe(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!A(t)) return function(e) {
        xe(e, "shadowOptions", t);
    };
    xe(t, "shadowOptions", {
        mode: "open"
    });
}

function ie(t) {
    if (void 0 === t) return function(t) {
        ne(t);
    };
    ne(t);
}

function ne(t) {
    const e = l(de, t);
    if (void 0 === e) {
        xe(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function re(t) {
    if (void 0 === t) return function(t) {
        xe(t, "isStrictBinding", true);
    };
    xe(t, "isStrictBinding", true);
}

const oe = new WeakMap;

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
            if (R(i)) throw v(`AUR0761:${e}`);
            const n = t.fromDefinitionOrDefault("name", i, me);
            if (A(i.Type)) s = i.Type; else s = Ce(t.pascalCase(n));
            return new CustomElementDefinition(s, n, t.mergeArrays(i.aliases), t.fromDefinitionOrDefault("key", i, (() => pe(n))), t.fromDefinitionOrDefault("cache", i, he), t.fromDefinitionOrDefault("capture", i, ae), t.fromDefinitionOrDefault("template", i, ce), t.mergeArrays(i.instructions), t.mergeArrays(i.dependencies), t.fromDefinitionOrDefault("injectable", i, ce), t.fromDefinitionOrDefault("needsCompile", i, ue), t.mergeArrays(i.surrogates), $.from(s, i.bindables), Lt.from(i.childrenObservers), t.fromDefinitionOrDefault("containerless", i, ae), t.fromDefinitionOrDefault("isStrictBinding", i, ae), t.fromDefinitionOrDefault("shadowOptions", i, ce), t.fromDefinitionOrDefault("hasSlots", i, ae), t.fromDefinitionOrDefault("enhance", i, ae), t.fromDefinitionOrDefault("watches", i, fe), t.fromAnnotationOrTypeOrDefault("processContent", s, ce));
        }
        if (R(e)) return new CustomElementDefinition(s, e, t.mergeArrays(be(s, "aliases"), s.aliases), pe(e), t.fromAnnotationOrTypeOrDefault("cache", s, he), t.fromAnnotationOrTypeOrDefault("capture", s, ae), t.fromAnnotationOrTypeOrDefault("template", s, ce), t.mergeArrays(be(s, "instructions"), s.instructions), t.mergeArrays(be(s, "dependencies"), s.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", s, ce), t.fromAnnotationOrTypeOrDefault("needsCompile", s, ue), t.mergeArrays(be(s, "surrogates"), s.surrogates), $.from(s, ...$.getAll(s), be(s, "bindables"), s.bindables), Lt.from(...Lt.getAll(s), be(s, "childrenObservers"), s.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", s, ae), t.fromAnnotationOrTypeOrDefault("isStrictBinding", s, ae), t.fromAnnotationOrTypeOrDefault("shadowOptions", s, ce), t.fromAnnotationOrTypeOrDefault("hasSlots", s, ae), t.fromAnnotationOrTypeOrDefault("enhance", s, ae), t.mergeArrays(te.getAnnotation(s), s.watches), t.fromAnnotationOrTypeOrDefault("processContent", s, ce));
        const i = t.fromDefinitionOrDefault("name", e, me);
        return new CustomElementDefinition(s, i, t.mergeArrays(be(s, "aliases"), e.aliases, s.aliases), pe(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, s, he), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, s, ae), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, s, ce), t.mergeArrays(be(s, "instructions"), e.instructions, s.instructions), t.mergeArrays(be(s, "dependencies"), e.dependencies, s.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, s, ce), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, s, ue), t.mergeArrays(be(s, "surrogates"), e.surrogates, s.surrogates), $.from(s, ...$.getAll(s), be(s, "bindables"), s.bindables, e.bindables), Lt.from(...Lt.getAll(s), be(s, "childrenObservers"), s.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, s, ae), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, s, ae), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, s, ce), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, s, ae), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, s, ae), t.mergeArrays(e.watches, te.getAnnotation(s), s.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, s, ce));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (oe.has(t)) return oe.get(t);
        const e = CustomElementDefinition.create(t);
        oe.set(t, e);
        c(de, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            W(s, e).register(t);
            V(s, e).register(t);
            X(i, Ae, s, t);
        }
    }
}

const le = {
    name: void 0,
    searchParents: false,
    optional: false
};

const he = () => 0;

const ce = () => null;

const ae = () => false;

const ue = () => true;

const fe = () => t.emptyArray;

const de = d("custom-element");

const pe = t => `${de}:${t}`;

const me = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const xe = (t, e, s) => {
    c(f(e), s, t);
};

const ge = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(de, s, s.Type);
    c(de, s, s);
    p(s.Type, de);
    return s.Type;
};

const ve = t => A(t) && h(de, t);

const we = (t, e = le) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = Es(t, de);
        if (null === s) {
            if (true === e.optional) return null;
            throw v(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = Es(t, de);
            if (null === s) throw v(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = Es(s, de);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = Us(s);
        }
        if (i) return;
        throw v(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = Es(s, de);
        if (null !== t) return t;
        s = Us(s);
    }
    throw v(`AUR0765`);
};

const be = (t, e) => l(f(e), t);

const ye = t => {
    const e = l(de, t);
    if (void 0 === e) throw v(`AUR0760:${t.name}`);
    return e;
};

const ke = () => {
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

const Ce = function() {
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

const Ae = Object.freeze({
    name: de,
    keyFrom: pe,
    isType: ve,
    for: we,
    define: ge,
    getDefinition: ye,
    annotate: xe,
    getAnnotation: be,
    generateName: me,
    createInjectable: ke,
    generateType: Ce
});

const Re = f("processContent");

function Se(t) {
    return void 0 === t ? function(t, e, s) {
        c(Re, Be(t, e), t);
    } : function(e) {
        t = Be(e, t);
        const s = l(de, e);
        if (void 0 !== s) s.processContent = t; else c(Re, t, e);
        return e;
    };
}

function Be(t, e) {
    if (R(e)) e = t[e];
    if (!A(e)) throw v(`AUR0766:${typeof e}`);
    return e;
}

function Ie(t) {
    return function(e) {
        const s = A(t) ? t : true;
        xe(e, "capture", s);
        if (ve(e)) ye(e).capture = s;
    };
}

const Te = t.IPlatform;

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
            const s = De(t);
            let i = this.st;
            this.ov = t;
            if (s.length > 0) this.it(s);
            this.st += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!w.call(e, t) || e[t] !== i) continue;
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

function De(e) {
    if (R(e)) return Ee(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...De(e[i]));
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

function Pe(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = Xt({
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
                this.element.className = De(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ $s ], e));
        t.register(i);
    }
}

function $e(...t) {
    return new ShadowDOMRegistry(t);
}

const Le = F("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Te))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(qe);
        const s = t.get(Le);
        t.register(N(Oe, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Te ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Te ];

const Oe = F("IShadowDOMStyles");

const qe = F("IShadowDOMGlobalStyles", (e => e.instance({
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

const Ue = {
    shadowDOM(e) {
        return Tt.creating(t.IContainer, (t => {
            if (null != e.sharedStyles) {
                const s = t.get(Le);
                t.register(N(qe, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: je, exit: _e} = s.ConnectableSwitcher;

const {wrap: Fe, unwrap: Me} = s.ProxyObservable;

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
            je(this);
            return this.value = Me(this.$get.call(void 0, this.useProxy ? Fe(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            _e(this);
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
        const i = this.obj;
        const n = this.value;
        const r = 1 === e.$kind && 1 === this.obs.count;
        if (!r) {
            this.obs.version++;
            t = s.astEvaluate(e, this.scope, this, this);
            this.obs.clear();
        }
        if (!Object.is(t, n)) {
            this.value = t;
            this.callback.call(i, t, n, i);
        }
    }
    $bind() {
        if (this.isBound) return;
        this.isBound = true;
        this.obs.version++;
        this.value = s.astEvaluate(this.expression, this.scope, this, this);
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

mt(true)(ComputedWatcher);

s.connectable(ExpressionWatcher);

mt(true)(ExpressionWatcher);

const Ve = F("ILifecycleHooks");

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
        M(Ve, this.Type).register(t);
    }
}

const Ne = new WeakMap;

const He = f("lifecycle-hooks");

const We = Object.freeze({
    name: He,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(He, s, e);
        p(e, He);
        return s.Type;
    },
    resolve(t) {
        let e = Ne.get(t);
        if (void 0 === e) {
            Ne.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(Ve) : t.has(Ve, false) ? s.getAll(Ve).concat(t.getAll(Ve)) : s.getAll(Ve);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(He, n.constructor);
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

function ze() {
    return function t(e) {
        return We.define({}, e);
    };
}

const Ge = F("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (R(t)) t = parseInt(t, 10);
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

const Xe = new WeakSet;

function Ke(t) {
    return !Xe.has(t);
}

function Qe(t) {
    Xe.add(t);
    return CustomElementDefinition.create(t);
}

const Ye = d("views");

const Ze = Object.freeze({
    name: Ye,
    has(t) {
        return A(t) && (h(Ye, t) || "$views" in t);
    },
    get(t) {
        if (A(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(Ke).map(Qe);
            for (const e of s) Ze.add(t, e);
        }
        let e = l(Ye, t);
        if (void 0 === e) c(Ye, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(Ye, t);
        if (void 0 === i) c(Ye, i = [ s ], t); else i.push(s);
        return i;
    }
});

function Je(t) {
    return function(e) {
        Ze.add(e, t);
    };
}

const ts = F("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = Ze.has(t.constructor) ? Ze.get(t.constructor) : [];
            const i = A(e) ? e(t, s) : this.ot(s, e);
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
            n = ge(ye(r), class extends r {
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
            r = ge(this.ct(e, i), class {
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
        if (void 0 === s) throw v(`Could not find view: ${e}`);
        return s;
    }
}

const es = F("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.p = (this.dt = t.root).get(Te);
        this.xt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.gt ? this.gt = this.dt.getAll(Zs, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.gt;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.ut;
            const n = e.get(Ys);
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
                if (R(r)) o.innerHTML = r;
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
        if (e.length !== n.length) throw v(`AUR0757:${o}<>${n.length}`);
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

var ss;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(ss || (ss = {}));

const is = {
    optional: true
};

const ns = new WeakMap;

class Controller {
    constructor(e, s, i, n, r, o, l) {
        this.container = e;
        this.vmKind = s;
        this.definition = i;
        this.viewFactory = n;
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
        this.vt = null;
        this.state = 0;
        this.wt = false;
        this.bt = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.yt = 0;
        this.kt = 0;
        this.Ct = 0;
        this.At = r;
        this.Rt = 2 === s ? HooksDefinition.none : new HooksDefinition(r);
        this.location = l;
        this.r = e.root.get(es);
    }
    get lifecycleHooks() {
        return this.vt;
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
        return ns.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw v(`AUR0500:${t}`);
        return e;
    }
    static $el(e, s, i, n, r = void 0, o = null) {
        if (ns.has(s)) return ns.get(s);
        r = r ?? ye(s.constructor);
        const l = new Controller(e, 0, r, null, s, i, o);
        const h = e.get(t.optional(xs));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        z(e, xs, new t.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        ns.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (ns.has(e)) return ns.get(e);
        i = i ?? Kt(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        ns.set(e, n);
        n.St();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.Bt();
        return s;
    }
    hE(e, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.At;
        let l = this.definition;
        this.scope = s.Scope.create(o, null, true);
        if (l.watches.length > 0) as(this, n, l, o);
        os(this, l, r, o);
        this.bt = ls(this, l, o);
        if (this.Rt.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.vt = We.resolve(n);
        l.register(n);
        if (null !== l.injectable) z(n, l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == e || false !== e.hydrate) {
            this.hS(e);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.vt.hydrating) this.vt.hydrating.forEach(ws, this);
        if (this.Rt.hasHydrating) this.At.hydrating(this);
        const e = this.It = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = we(this.host, is))) {
            this.host = this.container.root.get(Te).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = _s(this.host);
        }
        Ps(this.host, de, this);
        Ps(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw v(`AUR0501`);
            Ps(this.shadowRoot = this.host.attachShadow(s ?? ds), de, this);
            Ps(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Ps(o, de, this);
            Ps(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.At.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.vt.hydrated) this.vt.hydrated.forEach(bs, this);
        if (this.Rt.hasHydrated) this.At.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.It, this.host);
        if (void 0 !== this.vt.created) this.vt.created.forEach(vs, this);
        if (this.Rt.hasCreated) this.At.created(this);
    }
    St() {
        const t = this.definition;
        const e = this.At;
        if (t.watches.length > 0) as(this, this.container, t, e);
        os(this, t, this.flags, e);
        e.$controller = this;
        this.vt = We.resolve(this.container);
        if (void 0 !== this.vt.created) this.vt.created.forEach(vs, this);
        if (this.Rt.hasCreated) this.At.created(this);
    }
    Bt() {
        this.It = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.It.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.It)).findTargets(), this.It, void 0);
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
            throw v(`AUR0502:${this.name}`);

          default:
            throw v(`AUR0503:${this.name} ${ps(this.state)}`);
        }
        this.parent = s;
        i |= 1;
        switch (this.vmKind) {
          case 0:
            this.scope.parent = n ?? null;
            break;

          case 1:
            this.scope = n ?? null;
            break;

          case 2:
            if (void 0 === n || null === n) throw v(`AUR0504`);
            if (!this.hasLockedScope) this.scope = n;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = e;
        this.$flags = i;
        this.Tt();
        let r;
        if (2 !== this.vmKind && null != this.vt.binding) r = t.resolveAll(...this.vt.binding.map(ys, this));
        if (this.Rt.hasBinding) r = t.resolveAll(r, this.At.binding(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.Dt();
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
        let s = this.bt.length;
        let i;
        if (s > 0) while (s > e) {
            this.bt[e].start();
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
        if (2 !== this.vmKind && null != this.vt.bound) i = t.resolveAll(...this.vt.bound.map(ks, this));
        if (this.Rt.hasBound) i = t.resolveAll(i, this.At.bound(this.$initiator, this.parent, this.$flags));
        if (k(i)) {
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
                const e = t.has(Oe, false) ? t.get(Oe) : t.get(qe);
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
        if (2 !== this.vmKind && null != this.vt.attaching) s = t.resolveAll(...this.vt.attaching.map(Cs, this));
        if (this.Rt.hasAttaching) s = t.resolveAll(s, this.At.attaching(this.$initiator, this.parent, this.$flags));
        if (k(s)) {
            this.Dt();
            this.Tt();
            s.then((() => {
                this.Lt();
            })).catch((t => {
                this.Et(t);
            }));
        }
        if (null !== this.children) for (;e < this.children.length; ++e) void this.children[e].activate(this.$initiator, this, this.$flags, this.scope);
        this.Lt();
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
            throw v(`AUR0505:${this.name} ${ps(this.state)}`);
        }
        this.$initiator = e;
        this.$flags = i;
        if (e === this) this.Ot();
        let n = 0;
        let r;
        if (this.bt.length) for (;n < this.bt.length; ++n) this.bt[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(e, this, i);
        if (2 !== this.vmKind && null != this.vt.detaching) r = t.resolveAll(...this.vt.detaching.map(Rs, this));
        if (this.Rt.hasDetaching) r = t.resolveAll(r, this.At.detaching(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.Dt();
            e.Ot();
            r.then((() => {
                e.qt();
            })).catch((t => {
                e.Et(t);
            }));
        }
        if (null === e.head) e.head = this; else e.tail.next = this;
        e.tail = this;
        if (e !== this) return;
        this.qt();
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
        this.Ut();
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
    Ut() {
        if (void 0 !== this.$promise) {
            Bs = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Bs();
            Bs = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            Is = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Is(t);
            Is = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    Tt() {
        ++this.yt;
        if (this.$initiator !== this) this.parent.Tt();
    }
    Lt() {
        if (0 === --this.yt) {
            if (2 !== this.vmKind && null != this.vt.attached) Ts = t.resolveAll(...this.vt.attached.map(As, this));
            if (this.Rt.hasAttached) Ts = t.resolveAll(Ts, this.At.attached(this.$initiator, this.$flags));
            if (k(Ts)) {
                this.Dt();
                Ts.then((() => {
                    this.state = 2;
                    this.Ut();
                    if (this.$initiator !== this) this.parent.Lt();
                })).catch((t => {
                    this.Et(t);
                }));
                Ts = void 0;
                return;
            }
            Ts = void 0;
            this.state = 2;
            this.Ut();
        }
        if (this.$initiator !== this) this.parent.Lt();
    }
    Ot() {
        ++this.kt;
    }
    qt() {
        if (0 === --this.kt) {
            this.jt();
            this.removeNodes();
            let e = this.$initiator.head;
            let s;
            while (null !== e) {
                if (e !== this) {
                    if (e.debug) e.logger.trace(`detach()`);
                    e.removeNodes();
                }
                if (2 !== e.vmKind && null != e.vt.unbinding) s = t.resolveAll(...e.vt.unbinding.map(Ss, this));
                if (e.Rt.hasUnbinding) {
                    if (e.debug) e.logger.trace("unbinding()");
                    s = t.resolveAll(s, e.viewModel.unbinding(e.$initiator, e.parent, e.$flags));
                }
                if (k(s)) {
                    this.Dt();
                    this.jt();
                    s.then((() => {
                        this._t();
                    })).catch((t => {
                        this.Et(t);
                    }));
                }
                s = void 0;
                e = e.next;
            }
            this._t();
        }
    }
    jt() {
        ++this.Ct;
    }
    _t() {
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
            return Kt(this.At.constructor).name === t;

          case 0:
            return ye(this.At.constructor).name === t;

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
            Ps(t, de, this);
            Ps(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Ps(t, de, this);
            Ps(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Ps(t, de, this);
            Ps(t, this.definition.key, this);
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
            this.children.forEach(gs);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.At) {
            ns.delete(this.At);
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
            for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
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

function os(t, e, i, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const c = rs(n);
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

function ls(e, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = rs(i);
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

const hs = new Map;

const cs = t => {
    let e = hs.get(t);
    if (null == e) {
        e = new s.AccessScopeExpression(t, 0);
        hs.set(t, e);
    }
    return e;
};

function as(t, e, i, n) {
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
        u = A(u) ? u : Reflect.get(n, u);
        if (!A(u)) throw v(`AUR0506:${String(u)}`);
        if (A(a)) t.addBinding(new ComputedWatcher(n, r, a, u, true)); else {
            f = R(a) ? o.parse(a, 8) : cs(a);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function us(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function fs(t) {
    return e.isObject(t) && ve(t.constructor);
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

const ms = F("IController");

const xs = F("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function gs(t) {
    t.dispose();
}

function vs(t) {
    t.instance.created(this.At, this);
}

function ws(t) {
    t.instance.hydrating(this.At, this);
}

function bs(t) {
    t.instance.hydrated(this.At, this);
}

function ys(t) {
    return t.instance.binding(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function ks(t) {
    return t.instance.bound(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function Cs(t) {
    return t.instance.attaching(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function As(t) {
    return t.instance.attached(this.At, this["$initiator"], this["$flags"]);
}

function Rs(t) {
    return t.instance.detaching(this.At, this["$initiator"], this.parent, this["$flags"]);
}

function Ss(t) {
    return t.instance.unbinding(this.At, this["$initiator"], this.parent, this["$flags"]);
}

let Bs;

let Is;

let Ts;

const Ds = F("IAppRoot");

class AppRoot {
    constructor(e, s, i, n) {
        this.config = e;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.Ft = void 0;
        this.host = e.host;
        n.prepare(this);
        z(i, s.HTMLElement, z(i, s.Element, z(i, $s, new t.InstanceProvider("ElementResolver", e.host))));
        this.Ft = t.onResolve(this.Mt("creating"), (() => {
            const s = e.component;
            const n = i.createChild();
            let r;
            if (ve(s)) r = this.container.get(s); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this.Mt("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this.Mt("hydrated"), (() => {
                    l.hC();
                    this.Ft = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.Ft, (() => t.onResolve(this.Mt("activating"), (() => t.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.Mt("activated")))))));
    }
    deactivate() {
        return t.onResolve(this.Mt("deactivating"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.Mt("deactivated")))));
    }
    Mt(e) {
        return t.resolveAll(...this.container.getAll(It).reduce(((t, s) => {
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

function Ps(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const $s = F("INode");

const Ls = F("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Ds, true)) return t.get(Ds).host;
    return t.get(Te).document;
}))));

const Os = F("IRenderLocation");

const qs = new WeakMap;

function Us(t) {
    if (qs.has(t)) return qs.get(t);
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
        const e = we(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Us(e.host);
    }
    return t.parentNode;
}

function js(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) qs.set(s[t], e);
    } else qs.set(t, e);
}

function _s(t) {
    if (Fs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function Fs(t) {
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
            if ("AU-M" === r.nodeName) o[i] = _s(r); else o[i] = r;
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
        if (Fs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Ms = F("IWindow", (t => t.callback((t => t.get(Te).window))));

const Vs = F("ILocation", (t => t.callback((t => t.get(Ms).location))));

const Ns = F("IHistory", (t => t.callback((t => t.get(Ms).history))));

const Hs = {
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
        this.Vt = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let i = s.astEvaluate(this.ast, this.$scope, this, null);
        delete e.$event;
        if (A(i)) i = i(t);
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
        s.astBind(this.ast, t, this.interceptor);
        if (0 === this.Vt.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Ls), this.target, this.targetEvent, this, Hs[this.Vt.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        s.astUnbind(this.ast, this.$scope, this.interceptor);
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

mt(true, true)(Listener);

const Ws = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = Ws) {
        this.Nt = t;
        this.Ht = e;
        this.Vt = s;
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
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = g());
        return s;
    }
    handleEvent(t) {
        const e = true === this.Vt.capture ? this.zt : this.Gt;
        const s = t.composedPath();
        if (true === this.Vt.capture) s.reverse();
        for (const i of s) {
            const s = e.get(i);
            if (void 0 === s) continue;
            const n = s[this.Ht];
            if (void 0 === n) continue;
            if (A(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, s, i) {
        this.Yt = t;
        this.Zt = e;
        this.Ht = s;
        t.Xt();
        e[s] = i;
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

const zs = F("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Jt = g();
    }
    addEventListener(t, e, s, i, n) {
        var r;
        const o = (r = this.Jt)[s] ?? (r[s] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, s, n));
        return new DelegateSubscription(l, l.Qt(e), s, i);
    }
    dispose() {
        for (const t in this.Jt) {
            const e = this.Jt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Gs = F("IProjections");

const Xs = F("IAuSlotsInfo");

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

const Ks = F("Instruction");

function Qs(t) {
    const e = t.type;
    return R(e) && 2 === e.length;
}

class InterpolationInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "rf";
    }
}

class PropertyBindingInstruction {
    constructor(t, e, s) {
        this.from = t;
        this.to = e;
        this.mode = s;
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
    constructor(t, e, s, i, n, r) {
        this.res = t;
        this.alias = e;
        this.props = s;
        this.projections = i;
        this.containerless = n;
        this.captures = r;
        this.type = "ra";
        this.auSlot = null;
    }
}

class HydrateAttributeInstruction {
    constructor(t, e, s) {
        this.res = t;
        this.alias = e;
        this.props = s;
        this.type = "rb";
    }
}

class HydrateTemplateController {
    constructor(t, e, s, i) {
        this.def = t;
        this.res = e;
        this.alias = s;
        this.props = i;
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
    constructor(t, e, s) {
        this.attr = t;
        this.from = e;
        this.to = s;
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

const Ys = F("ITemplateCompiler");

const Zs = F("IRenderer");

function Js(t) {
    return function e(s) {
        s.register = function(t) {
            M(Zs, this).register(t);
        };
        S(s.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return s;
    };
}

function ti(t, e, s) {
    if (R(e)) return t.parse(e, s);
    return e;
}

function ei(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function si(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return we(t);

      case "view":
        throw v(`AUR0750`);

      case "view-model":
        return we(t).viewModel;

      default:
        {
            const s = Gt(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = we(t, {
                name: e
            });
            if (void 0 === i) throw v(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let ii = class SetPropertyRenderer {
    render(t, e, s) {
        const i = ei(e);
        if (void 0 !== i.$observers && void 0 !== i.$observers[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

ii = r([ Js("re") ], ii);

let ni = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ es, Te ];
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
            n = a.find(Ae, h);
            if (null == n) throw v(`AUR0752:${h}@${e["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? _s(s) : null;
        const d = Di(this.p, e, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        z(d, r, new t.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        Ps(s, n.key, l);
        const p = this.r.renderers;
        const m = i.props;
        const x = m.length;
        let g = 0;
        let w;
        while (x > g) {
            w = m[g];
            p[w.type].render(e, l, w);
            ++g;
        }
        e.addChild(l);
    }
};

ni = r([ Js("ra") ], ni);

let ri = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ es, Te ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(Qt, s.res);
            if (null == n) throw v(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = Ei(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Ps(e, n.key, o);
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

ri = r([ Js("rb") ], ri);

let oi = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ es, Te ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(Qt, s.res);
            if (null == n) throw v(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = this.r.getViewFactory(s.def, i);
        const o = _s(e);
        const l = Ei(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Ps(o, n.key, h);
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

oi = r([ Js("rc") ], oi);

let li = class LetElementRenderer {
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
            h = ti(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(18 === h.$kind ? mi(c, h, r) : c);
            ++a;
        }
    }
};

li.inject = [ s.IExpressionParser, s.IObserverLocator ];

li = r([ Js("rd") ], li);

let hi = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, i, ei(e), s.to);
        t.addBinding(18 === i.$kind ? mi(n, i, t.container) : n);
    }
};

hi.inject = [ s.IExpressionParser, s.IObserverLocator ];

hi = r([ Js("rh") ], hi);

let ci = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 8);
        const n = new RefBinding(t.container, i, si(e, s.to));
        t.addBinding(18 === i.$kind ? mi(n, i, t.container) : n);
    }
};

ci.inject = [ s.IExpressionParser ];

ci = r([ Js("rj") ], ci);

let ai = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = ti(this.ep, s.from, 1);
        const r = new InterpolationBinding(t, i, this.oL, this.p.domWriteQueue, n, ei(e), s.to, 2);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (18 === c.ast.$kind) o[h] = mi(c, c.ast, i);
        }
        t.addBinding(r);
    }
};

ai.inject = [ s.IExpressionParser, s.IObserverLocator, Te ];

ai = r([ Js("rf") ], ai);

let ui = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ei(e), s.to, s.mode);
        t.addBinding(18 === i.$kind ? mi(n, i, t.container) : n);
    }
};

ui.inject = [ s.IExpressionParser, s.IObserverLocator, Te ];

ui = r([ Js("rg") ], ui);

let fi = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ei(e), s.to, 2);
        t.addBinding(18 === i.iterable.$kind ? mi(n, i.iterable, t.container) : n);
    }
};

fi.inject = [ s.IExpressionParser, s.IObserverLocator, Te ];

fi = r([ Js("rk") ], fi);

let di = 0;

const pi = [];

function mi(t, e, i) {
    while (e instanceof s.BindingBehaviorExpression) {
        pi[di++] = e;
        e = e.expression;
    }
    while (di > 0) {
        const e = pi[--di];
        const s = i.get(at.keyFrom(e.name));
        if (s instanceof BindingBehaviorFactory) t = s.construct(t, e);
    }
    pi.length = 0;
    return t;
}

let xi = class TextBindingRenderer {
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
        const l = ti(this.ep, s.from, 1);
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
            t.addBinding(18 === p.$kind ? mi(d, p, i) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

xi.inject = [ s.IExpressionParser, s.IObserverLocator, Te ];

xi = r([ Js("ha") ], xi);

let gi = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.te = e;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 4);
        const n = new Listener(t.container, i, e, s.to, this.te, new ListenerOptions(s.preventDefault, s.strategy));
        t.addBinding(18 === i.$kind ? mi(n, i, t.container) : n);
    }
};

gi.inject = [ s.IExpressionParser, zs ];

gi = r([ Js("hb") ], gi);

let vi = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

vi = r([ Js("he") ], vi);

let wi = class SetClassAttributeRenderer {
    render(t, e, s) {
        Ai(e.classList, s.value);
    }
};

wi = r([ Js("hf") ], wi);

let bi = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

bi = r([ Js("hg") ], bi);

let yi = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, 2);
        t.addBinding(18 === i.$kind ? mi(n, i, t.container) : n);
    }
};

yi.inject = [ s.IExpressionParser, s.IObserverLocator, Te ];

yi = r([ Js("hd") ], yi);

let ki = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = ti(this.ep, s.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, 2);
        t.addBinding(18 === i.$kind ? mi(n, i, t.container) : n);
    }
};

ki.inject = [ Te, s.IExpressionParser, s.IObserverLocator ];

ki = r([ Js("hc") ], ki);

let Ci = class SpreadRenderer {
    constructor(t, e) {
        this.ee = t;
        this.r = e;
    }
    static get inject() {
        return [ Ys, es ];
    }
    render(e, s, i) {
        const n = e.container;
        const r = n.get(xs);
        const o = this.r.renderers;
        const l = t => {
            let e = t;
            let s = r;
            while (null != s && e > 0) {
                s = s.parent;
                --e;
            }
            if (null == s) throw v("No scope context for spread binding.");
            return s;
        };
        const h = i => {
            const n = l(i);
            const r = Ri(n);
            const c = this.ee.compileSpread(n.controller.definition, n.instruction?.captures ?? t.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, we(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            e.addBinding(r);
        };
        h(0);
    }
};

Ci = r([ Js("hs") ], Ci);

class SpreadBinding {
    constructor(t, e) {
        this.se = t;
        this.ie = e;
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
        const e = this.$scope = this.ie.controller.scope.parent ?? void 0;
        if (null == e) throw v("Invalid spreading. Context scope is null/undefined");
        this.se.forEach((t => t.$bind(e)));
    }
    $unbind() {
        this.se.forEach((t => t.$unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.se.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw v("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Ai(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const Ri = t => new SpreadBinding([], t);

const Si = "IController";

const Bi = "IInstruction";

const Ii = "IRenderLocation";

const Ti = "IAuSlotsInfo";

function Di(e, s, i, n, r, o) {
    const l = s.container.createChild();
    z(l, e.HTMLElement, z(l, e.Element, z(l, $s, new t.InstanceProvider("ElementResolver", i))));
    z(l, ms, new t.InstanceProvider(Si, s));
    z(l, Ks, new t.InstanceProvider(Bi, n));
    z(l, Os, null == r ? Pi : new RenderLocationProvider(r));
    z(l, Ge, $i);
    z(l, Xs, null == o ? Li : new t.InstanceProvider(Ti, o));
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
        if (null === t) throw v(`AUR7055`);
        if (!R(t.name) || 0 === t.name.length) throw v(`AUR0756`);
        return t;
    }
}

function Ei(e, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    z(c, e.HTMLElement, z(c, e.Element, z(c, $s, new t.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    z(c, ms, new t.InstanceProvider(Si, i));
    z(c, Ks, new t.InstanceProvider(Bi, r));
    z(c, Os, null == l ? Pi : new t.InstanceProvider(Ii, l));
    z(c, Ge, null == o ? $i : new ViewFactoryProvider(o));
    z(c, Xs, null == h ? Li : new t.InstanceProvider(Ti, h));
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

const Pi = new RenderLocationProvider(null);

const $i = new ViewFactoryProvider(null);

const Li = new t.InstanceProvider(Ti, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Oi(t) {
    return function(e) {
        return _i.define(t, e);
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
        if (R(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new BindingCommandDefinition(s, t.firstDefined(ji(s, "name"), i), t.mergeArrays(ji(s, "aliases"), n.aliases, s.aliases), Ui(i), t.firstDefined(ji(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        M(s, e).register(t);
        V(s, e).register(t);
        X(i, _i, s, t);
    }
}

const qi = d("binding-command");

const Ui = t => `${qi}:${t}`;

const ji = (t, e) => l(f(e), t);

const _i = Object.freeze({
    name: qi,
    keyFrom: Ui,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c(qi, s, s.Type);
        c(qi, s, s);
        p(e, qi);
        return s.Type;
    },
    getAnnotation: ji
});

exports.OneTimeBindingCommand = class OneTimeBindingCommand {
    get type() {
        return 0;
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

exports.OneTimeBindingCommand = r([ Oi("one-time") ], exports.OneTimeBindingCommand);

exports.ToViewBindingCommand = class ToViewBindingCommand {
    get type() {
        return 0;
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

exports.ToViewBindingCommand = r([ Oi("to-view") ], exports.ToViewBindingCommand);

exports.FromViewBindingCommand = class FromViewBindingCommand {
    get type() {
        return 0;
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

exports.FromViewBindingCommand = r([ Oi("from-view") ], exports.FromViewBindingCommand);

exports.TwoWayBindingCommand = class TwoWayBindingCommand {
    get type() {
        return 0;
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

exports.TwoWayBindingCommand = r([ Oi("two-way") ], exports.TwoWayBindingCommand);

exports.DefaultBindingCommand = class DefaultBindingCommand {
    get type() {
        return 0;
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

exports.DefaultBindingCommand = r([ Oi("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    get type() {
        return 0;
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new CallBindingInstruction(s.parse(e.attr.rawValue, 8 | 4), i);
    }
};

exports.CallBindingCommand = r([ Oi("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new IteratorBindingInstruction(s.parse(e.attr.rawValue, 2), i);
    }
};

exports.ForBindingCommand = r([ Oi("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, 0);
    }
};

exports.TriggerBindingCommand = r([ Oi("trigger") ], exports.TriggerBindingCommand);

exports.DelegateBindingCommand = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 2);
    }
};

exports.DelegateBindingCommand = r([ Oi("delegate") ], exports.DelegateBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 1);
    }
};

exports.CaptureBindingCommand = r([ Oi("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.AttrBindingCommand = r([ Oi("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.StyleBindingCommand = r([ Oi("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.ClassBindingCommand = r([ Oi("class") ], exports.ClassBindingCommand);

let Fi = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Fi = r([ Oi("ref") ], Fi);

let Mi = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Mi = r([ Oi("...$attrs") ], Mi);

const Vi = F("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const Ni = t => {
    const e = g();
    t = R(t) ? t.split(" ") : t;
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
        this.ne = Object.assign(g(), {
            a: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: Ni("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: g(),
            altGlyphDef: Ni("id xml:base xml:lang xml:space"),
            altglyphdef: g(),
            altGlyphItem: Ni("id xml:base xml:lang xml:space"),
            altglyphitem: g(),
            animate: Ni("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: Ni("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: Ni("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: Ni("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: Ni("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: Ni("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": Ni("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: Ni("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: Ni("class id style xml:base xml:lang xml:space"),
            ellipse: Ni("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: Ni("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: Ni("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: Ni("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: Ni("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: Ni("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: Ni("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: Ni("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: Ni("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: Ni("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: Ni("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: Ni("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: Ni("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: Ni("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: Ni("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: Ni("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: Ni("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: Ni("id xml:base xml:lang xml:space"),
            feMorphology: Ni("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: Ni("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: Ni("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: Ni("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: Ni("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: Ni("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: Ni("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: Ni("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: Ni("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": Ni("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": Ni("id string xml:base xml:lang xml:space"),
            "font-face-name": Ni("id name xml:base xml:lang xml:space"),
            "font-face-src": Ni("id xml:base xml:lang xml:space"),
            "font-face-uri": Ni("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: Ni("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: Ni("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: Ni("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: g(),
            hkern: Ni("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: Ni("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: Ni("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: Ni("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: Ni("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: Ni("id xml:base xml:lang xml:space"),
            "missing-glyph": Ni("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: Ni("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: Ni("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: Ni("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: Ni("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: Ni("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: Ni("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: Ni("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: Ni("class id offset style xml:base xml:lang xml:space"),
            style: Ni("id media title type xml:base xml:lang xml:space"),
            svg: Ni("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: Ni("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: Ni("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: Ni("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: Ni("class id style xml:base xml:lang xml:space"),
            tref: Ni("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: Ni("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: Ni("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: Ni("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: Ni("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.re = Ni("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.oe = Ni("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return M(Vi, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.re[t.nodeName] && true === this.oe[e] || true === this.ne[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ Te ];

const Hi = F("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.le = g();
        this.he = g();
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
        return [ Vi ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.le)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw zi(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.he;
        for (const s in t) {
            if (void 0 !== e[s]) throw zi(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return Wi(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.le[t.nodeName]?.[e] ?? this.he[e] ?? (y(t, e, this.svg) ? e : null);
    }
}

function Wi(t, e) {
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

function zi(t, e) {
    return v(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const Gi = F("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Xi = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ce = t.document.createElement("template");
    }
    createTemplate(t) {
        if (R(t)) {
            let e = Xi[t];
            if (void 0 === e) {
                const s = this.ce;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.ce = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Xi[t] = e;
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

TemplateElementFactory.inject = [ Te ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return M(Ys, this).register(t);
    }
    compile(e, s, i) {
        const n = CustomElementDefinition.getOrCreate(e);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = Yi);
        const r = new CompilationContext(e, s, i, null, null, void 0);
        const o = R(n.template) || !e.enhance ? r.ae.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(_(hn));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(rn)) throw v(`AUR0701`);
        this.ue(h, r);
        this.fe(h, r);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || me(),
            dependencies: (e.dependencies ?? t.emptyArray).concat(r.deps ?? t.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.de(o, r) : t.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, s, i, n) {
        const r = new CompilationContext(e, i, Yi, null, null, void 0);
        const o = [];
        const l = r.pe(n.nodeName.toLowerCase());
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
        let w;
        let b = null;
        let y;
        let k;
        let C;
        let A;
        for (;a > u; ++u) {
            f = s[u];
            C = f.target;
            A = f.rawValue;
            b = r.me(f);
            if (null !== b && (1 & b.type) > 0) {
                Ji.node = n;
                Ji.attr = f;
                Ji.bindable = null;
                Ji.def = null;
                o.push(b.build(Ji, r.ep, r.m));
                continue;
            }
            d = r.xe(C);
            if (null !== d) {
                if (d.isTemplateController) throw v(`AUR0703:${C}`);
                x = BindablesInfo.from(d, true);
                k = false === d.noMultiBindings && null === b && Ki(A);
                if (k) m = this.ge(n, A, d, r); else {
                    w = x.primary;
                    if (null === b) {
                        y = c.parse(A, 1);
                        m = [ null === y ? new SetPropertyInstruction(A, w.property) : new InterpolationInstruction(y, w.property) ];
                    } else {
                        Ji.node = n;
                        Ji.attr = f;
                        Ji.bindable = w;
                        Ji.def = d;
                        m = [ b.build(Ji, r.ep, r.m) ];
                    }
                }
                (p ?? (p = [])).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(C) ? C : void 0, m));
                continue;
            }
            if (null === b) {
                y = c.parse(A, 1);
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[C];
                    if (void 0 !== g) {
                        y = c.parse(A, 1);
                        o.push(new SpreadElementPropBindingInstruction(null == y ? new SetPropertyInstruction(A, g.property) : new InterpolationInstruction(y, g.property)));
                        continue;
                    }
                }
                if (null != y) o.push(new InterpolationInstruction(y, r.m.map(n, C) ?? t.camelCase(C))); else switch (C) {
                  case "class":
                    o.push(new SetClassAttributeInstruction(A));
                    break;

                  case "style":
                    o.push(new SetStyleAttributeInstruction(A));
                    break;

                  default:
                    o.push(new SetAttributeInstruction(A, C));
                }
            } else {
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[C];
                    if (void 0 !== g) {
                        Ji.node = n;
                        Ji.attr = f;
                        Ji.bindable = g;
                        Ji.def = l;
                        o.push(new SpreadElementPropBindingInstruction(b.build(Ji, r.ep, r.m)));
                        continue;
                    }
                }
                Ji.node = n;
                Ji.attr = f;
                Ji.bindable = null;
                Ji.def = null;
                o.push(b.build(Ji, r.ep, r.m));
            }
        }
        Qi();
        if (null != p) return p.concat(o);
        return o;
    }
    de(e, s) {
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
        let w;
        let b;
        let y;
        let k;
        for (;o > l; ++l) {
            h = n[l];
            c = h.name;
            a = h.value;
            u = s.ve.parse(c, a);
            y = u.target;
            k = u.rawValue;
            if (tn[y]) throw v(`AUR0702:${c}`);
            g = s.me(u);
            if (null !== g && (1 & g.type) > 0) {
                Ji.node = e;
                Ji.attr = u;
                Ji.bindable = null;
                Ji.def = null;
                i.push(g.build(Ji, s.ep, s.m));
                continue;
            }
            f = s.xe(y);
            if (null !== f) {
                if (f.isTemplateController) throw v(`AUR0703:${y}`);
                m = BindablesInfo.from(f, true);
                b = false === f.noMultiBindings && null === g && Ki(k);
                if (b) p = this.ge(e, k, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        w = r.parse(k, 1);
                        p = [ null === w ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(w, x.property) ];
                    } else {
                        Ji.node = e;
                        Ji.attr = u;
                        Ji.bindable = x;
                        Ji.def = f;
                        p = [ g.build(Ji, s.ep, s.m) ];
                    }
                }
                e.removeAttribute(c);
                --l;
                --o;
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(y) ? y : void 0, p));
                continue;
            }
            if (null === g) {
                w = r.parse(k, 1);
                if (null != w) {
                    e.removeAttribute(c);
                    --l;
                    --o;
                    i.push(new InterpolationInstruction(w, s.m.map(e, y) ?? t.camelCase(y)));
                } else switch (c) {
                  case "class":
                    i.push(new SetClassAttributeInstruction(k));
                    break;

                  case "style":
                    i.push(new SetStyleAttributeInstruction(k));
                    break;

                  default:
                    i.push(new SetAttributeInstruction(k, c));
                }
            } else {
                Ji.node = e;
                Ji.attr = u;
                Ji.bindable = null;
                Ji.def = null;
                i.push(g.build(Ji, s.ep, s.m));
            }
        }
        Qi();
        if (null != d) return d.concat(i);
        return i;
    }
    fe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.we(t, e);

              default:
                return this.be(t, e);
            }

          case 3:
            return this.ye(t, e);

          case 11:
            {
                let s = t.firstChild;
                while (null !== s) s = this.fe(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    we(e, i) {
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
            u = i.ve.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.me(u);
            if (null !== p) {
                if ("bind" === u.command) o.push(new LetBindingInstruction(l.parse(x, 8), t.camelCase(m))); else throw v(`AUR0704:${u.command}`);
                continue;
            }
            g = l.parse(x, 1);
            o.push(new LetBindingInstruction(null === g ? new s.PrimitiveLiteralExpression(x) : g, t.camelCase(m)));
        }
        i.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.ke(e).nextSibling;
    }
    be(e, s) {
        var i, n, r, o;
        const l = e.nextSibling;
        const h = (e.getAttribute("as-element") ?? e.nodeName).toLowerCase();
        const c = s.pe(h);
        const a = null !== c;
        const u = a && null != c.shadowOptions;
        const f = c?.capture;
        const d = null != f && "boolean" !== typeof f;
        const p = f ? [] : t.emptyArray;
        const m = s.ep;
        const x = this.debug ? t.noop : () => {
            e.removeAttribute(C);
            --y;
            --b;
        };
        let g = e.attributes;
        let w;
        let b = g.length;
        let y = 0;
        let k;
        let C;
        let A;
        let R;
        let S;
        let B;
        let I = null;
        let T = false;
        let D;
        let E;
        let P;
        let $;
        let L;
        let O;
        let q;
        let U = null;
        let j;
        let _;
        let F;
        let M;
        let V = true;
        let N = false;
        let H = false;
        if ("slot" === h) {
            if (null == s.root.def.shadowOptions) throw v(`AUR0717:${s.root.def.name}`);
            s.root.hasSlot = true;
        }
        if (a) {
            V = c.processContent?.call(c.Type, e, s.p);
            g = e.attributes;
            b = g.length;
        }
        if (s.root.def.enhance && e.classList.contains("au")) throw v(`AUR0705`);
        for (;b > y; ++y) {
            k = g[y];
            C = k.name;
            A = k.value;
            switch (C) {
              case "as-element":
              case "containerless":
                x();
                if (!N) N = "containerless" === C;
                continue;
            }
            R = s.ve.parse(C, A);
            U = s.me(R);
            F = R.target;
            M = R.rawValue;
            if (f && (!d || d && f(F))) {
                if (null != U && 1 & U.type) {
                    x();
                    p.push(R);
                    continue;
                }
                H = "au-slot" !== F && "slot" !== F;
                if (H) {
                    j = BindablesInfo.from(c, false);
                    if (null == j.attrs[F] && !s.xe(F)?.isTemplateController) {
                        x();
                        p.push(R);
                        continue;
                    }
                }
            }
            if (null !== U && 1 & U.type) {
                Ji.node = e;
                Ji.attr = R;
                Ji.bindable = null;
                Ji.def = null;
                (S ?? (S = [])).push(U.build(Ji, s.ep, s.m));
                x();
                continue;
            }
            I = s.xe(F);
            if (null !== I) {
                j = BindablesInfo.from(I, true);
                T = false === I.noMultiBindings && null === U && Ki(M);
                if (T) P = this.ge(e, M, I, s); else {
                    _ = j.primary;
                    if (null === U) {
                        O = m.parse(M, 1);
                        P = [ null === O ? new SetPropertyInstruction(M, _.property) : new InterpolationInstruction(O, _.property) ];
                    } else {
                        Ji.node = e;
                        Ji.attr = R;
                        Ji.bindable = _;
                        Ji.def = I;
                        P = [ U.build(Ji, s.ep, s.m) ];
                    }
                }
                x();
                if (I.isTemplateController) ($ ?? ($ = [])).push(new HydrateTemplateController(Zi, this.resolveResources ? I : I.name, void 0, P)); else (E ?? (E = [])).push(new HydrateAttributeInstruction(this.resolveResources ? I : I.name, null != I.aliases && I.aliases.includes(F) ? F : void 0, P));
                continue;
            }
            if (null === U) {
                if (a) {
                    j = BindablesInfo.from(c, false);
                    D = j.attrs[F];
                    if (void 0 !== D) {
                        O = m.parse(M, 1);
                        (B ?? (B = [])).push(null == O ? new SetPropertyInstruction(M, D.property) : new InterpolationInstruction(O, D.property));
                        x();
                        continue;
                    }
                }
                O = m.parse(M, 1);
                if (null != O) {
                    x();
                    (S ?? (S = [])).push(new InterpolationInstruction(O, s.m.map(e, F) ?? t.camelCase(F)));
                }
                continue;
            }
            x();
            if (a) {
                j = BindablesInfo.from(c, false);
                D = j.attrs[F];
                if (void 0 !== D) {
                    Ji.node = e;
                    Ji.attr = R;
                    Ji.bindable = D;
                    Ji.def = c;
                    (B ?? (B = [])).push(U.build(Ji, s.ep, s.m));
                    continue;
                }
            }
            Ji.node = e;
            Ji.attr = R;
            Ji.bindable = null;
            Ji.def = null;
            (S ?? (S = [])).push(U.build(Ji, s.ep, s.m));
        }
        Qi();
        if (this.Ce(e) && null != S && S.length > 1) this.Ae(e, S);
        if (a) {
            q = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, B ?? t.emptyArray, null, N, p);
            if (h === pn) {
                const t = e.getAttribute("name") || dn;
                const i = s.h("template");
                const n = s.Re();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else i.content.appendChild(r);
                    r = e.firstChild;
                }
                this.fe(i.content, n);
                q.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: me(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.Se(e, s);
            }
        }
        if (null != S || null != q || null != E) {
            w = t.emptyArray.concat(q ?? t.emptyArray, E ?? t.emptyArray, S ?? t.emptyArray);
            this.ke(e);
        }
        let W;
        if (null != $) {
            b = $.length - 1;
            y = b;
            L = $[y];
            let t;
            this.Se(e, s);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = s.h("template");
                t.content.appendChild(e);
            }
            const r = t;
            const o = s.Re(null == w ? [] : [ w ]);
            let l;
            let f;
            let d;
            let p;
            let m;
            let x;
            let g;
            let k;
            let C = 0, A = 0;
            let R = e.firstChild;
            let S = false;
            if (false !== V) while (null !== R) {
                f = 1 === R.nodeType ? R.getAttribute(pn) : null;
                if (null !== f) R.removeAttribute(pn);
                if (a) {
                    l = R.nextSibling;
                    if (!u) {
                        S = 3 === R.nodeType && "" === R.textContent.trim();
                        if (!S) ((i = p ?? (p = {}))[n = f || dn] ?? (i[n] = [])).push(R);
                        e.removeChild(R);
                    }
                    R = l;
                } else {
                    if (null !== f) {
                        f = f || dn;
                        throw v(`AUR0706:${h}[${f}]`);
                    }
                    R = R.nextSibling;
                }
            }
            if (null != p) {
                d = {};
                for (f in p) {
                    t = s.h("template");
                    m = p[f];
                    for (C = 0, A = m.length; A > C; ++C) {
                        x = m[C];
                        if ("TEMPLATE" === x.nodeName) if (x.attributes.length > 0) t.content.appendChild(x); else t.content.appendChild(x.content); else t.content.appendChild(x);
                    }
                    k = s.Re();
                    this.fe(t.content, k);
                    d[f] = CustomElementDefinition.create({
                        name: me(),
                        template: t,
                        instructions: k.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (a && (N || c.containerless)) this.Se(e, s);
            W = !a || !c.containerless && !N && false !== V;
            if (W) if ("TEMPLATE" === e.nodeName) this.fe(e.content, o); else {
                R = e.firstChild;
                while (null !== R) R = this.fe(R, o);
            }
            L.def = CustomElementDefinition.create({
                name: me(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: s.root.def.isStrictBinding
            });
            while (y-- > 0) {
                L = $[y];
                t = s.h("template");
                g = s.h("au-m");
                g.classList.add("au");
                t.content.appendChild(g);
                L.def = CustomElementDefinition.create({
                    name: me(),
                    template: t,
                    needsCompile: false,
                    instructions: [ [ $[y + 1] ] ],
                    isStrictBinding: s.root.def.isStrictBinding
                });
            }
            s.rows.push([ L ]);
        } else {
            if (null != w) s.rows.push(w);
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
            let b = 0, y = 0;
            if (false !== V) while (null !== t) {
                n = 1 === t.nodeType ? t.getAttribute(pn) : null;
                if (null !== n) t.removeAttribute(pn);
                if (a) {
                    i = t.nextSibling;
                    if (!u) {
                        g = 3 === t.nodeType && "" === t.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || dn] ?? (r[o] = [])).push(t);
                        e.removeChild(t);
                    }
                    t = i;
                } else {
                    if (null !== n) {
                        n = n || dn;
                        throw v(`AUR0706:${h}[${n}]`);
                    }
                    t = t.nextSibling;
                }
            }
            if (null != f) {
                l = {};
                for (n in f) {
                    m = s.h("template");
                    d = f[n];
                    for (b = 0, y = d.length; y > b; ++b) {
                        p = d[b];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) m.content.appendChild(p); else m.content.appendChild(p.content); else m.content.appendChild(p);
                    }
                    x = s.Re();
                    this.fe(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: me(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                q.projections = l;
            }
            if (a && (N || c.containerless)) this.Se(e, s);
            W = !a || !c.containerless && !N && false !== V;
            if (W && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.fe(t, s);
            }
        }
        return l;
    }
    ye(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.ke(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    ge(t, e, s, i) {
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
                f = i.ve.parse(l, h);
                d = i.me(f);
                p = n.attrs[f.target];
                if (null == p) throw v(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    Ji.node = t;
                    Ji.attr = f;
                    Ji.bindable = p;
                    Ji.def = s;
                    o.push(d.build(Ji, i.ep, i.m));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        Qi();
        return o;
    }
    ue(e, s) {
        const i = e;
        const n = t.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw v(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const e of n) {
            if (e.parentNode !== i) throw v(`AUR0709`);
            const n = on(e, o);
            const r = class LocalTemplate {};
            const h = e.content;
            const c = t.toArray(h.querySelectorAll("bindable"));
            const a = $.for(r);
            const u = new Set;
            const f = new Set;
            for (const t of c) {
                if (t.parentNode !== h) throw v(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw v(`AUR0711`);
                const s = t.getAttribute("attribute");
                if (null !== s && f.has(s) || u.has(e)) throw v(`AUR0712:${e}+${s}`); else {
                    if (null !== s) f.add(s);
                    u.add(e);
                }
                a.add({
                    property: e,
                    attribute: s ?? void 0,
                    mode: ln(t)
                });
                const i = t.getAttributeNames().filter((t => !nn.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Be(ge({
                name: n,
                template: e
            }, r));
            i.removeChild(e);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) ye(l[h]).dependencies.push(...s.def.dependencies ?? t.emptyArray, ...s.deps ?? t.emptyArray);
    }
    Ce(t) {
        return "INPUT" === t.nodeName && 1 === en[t.type];
    }
    Ae(t, e) {
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
    ke(t) {
        t.classList.add("au");
        return t;
    }
    Se(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.ke(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(e, i, n, r, o, l) {
        this.hasSlot = false;
        this.Ie = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = e;
        this.ci = n;
        this.parent = r;
        this.ae = h ? r.ae : i.get(Gi);
        this.ve = h ? r.ve : i.get(J);
        this.ep = h ? r.ep : i.get(s.IExpressionParser);
        this.m = h ? r.m : i.get(Hi);
        this.Te = h ? r.Te : i.get(t.ILogger);
        this.p = h ? r.p : i.get(Te);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
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
    pe(t) {
        return this.c.find(Ae, t);
    }
    xe(t) {
        return this.c.find(Qt, t);
    }
    Re(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    me(t) {
        if (this.root !== this) return this.root.me(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.Ie[e];
        if (void 0 === s) {
            s = this.c.create(_i, e);
            if (null === s) throw v(`AUR0713:${e}`);
            this.Ie[e] = s;
        }
        return s;
    }
}

function Ki(t) {
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

function Qi() {
    Ji.node = Ji.attr = Ji.bindable = Ji.def = null;
}

const Yi = {
    projections: null
};

const Zi = {
    name: "unnamed"
};

const Ji = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const tn = Object.assign(g(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const en = {
    checkbox: 1,
    radio: 1
};

const sn = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = sn.get(t);
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
                    if (h) throw v(`AUR0714:${t.name}`);
                    h = true;
                    c = o;
                } else if (!h && null == c) c = o;
                n[a] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) c = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            sn.set(t, s = new BindablesInfo(n, i, c));
        }
        return s;
    }
}

const nn = Object.freeze([ "property", "attribute", "mode" ]);

const rn = "as-custom-element";

function on(t, e) {
    const s = t.getAttribute(rn);
    if (null === s || "" === s) throw v(`AUR0715`);
    if (e.has(s)) throw v(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(rn);
    }
    return s;
}

function ln(t) {
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

const hn = F("ITemplateCompilerHooks");

const cn = new WeakMap;

const an = d("compiler-hooks");

const un = Object.freeze({
    name: an,
    define(t) {
        let e = cn.get(t);
        if (void 0 === e) {
            cn.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(an, e, t);
            p(t, an);
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
        t.register(M(hn, this.Type));
    }
}

const fn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return un.define(t);
    }
};

const dn = "default";

const pn = "au-slot";

const mn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        mn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = mn.get(e);
        mn.delete(e);
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

ot("oneTime")(OneTimeBindingBehavior);

ot("toView")(ToViewBindingBehavior);

ot("fromView")(FromViewBindingBehavior);

ot("twoWay")(TwoWayBindingBehavior);

const xn = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(e, s) {
        super(e, s);
        this.De = {
            delay: xn
        };
        this.Ee = null;
        this.Pe = null;
        this.J = e.get(t.IPlatform).taskQueue;
        if (s.args.length > 0) this.Ee = s.args[0];
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
            const e = Number(s.astEvaluate(this.Ee, t, this, null));
            this.De.delay = isNaN(e) ? xn : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.Pe?.cancel();
        this.Pe = null;
        this.binding.$unbind();
    }
}

ot("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Zt = new Map;
        this.$e = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw v(`AUR0817`);
        if (0 === s.length) throw v(`AUR0818`);
        this.Zt.set(e, s);
        let i;
        for (i of s) this.$e.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.Zt.get(e);
        this.Zt.delete(e);
        let i;
        for (i of s) this.$e.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ s.ISignaler ];

ot("signal")(SignalBindingBehavior);

const gn = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(e, s) {
        super(e, s);
        this.De = {
            delay: gn
        };
        this.Ee = null;
        this.Pe = null;
        this.Le = 0;
        this.Oe = 0;
        this.p = e.get(t.IPlatform);
        this.J = this.p.taskQueue;
        if (s.args.length > 0) this.Ee = s.args[0];
    }
    callSource(t) {
        this.qe((() => this.binding.callSource(t)));
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
        this.qe((() => this.binding.updateSource(t)));
    }
    qe(t) {
        const e = this.De;
        const s = this.p;
        const i = this.Le + e.delay - s.performanceNow();
        if (i > 0) {
            const n = this.Pe;
            e.delay = i;
            this.Pe = this.J.queueTask((() => {
                this.Le = s.performanceNow();
                this.Pe = null;
                e.delay = this.Oe;
                t();
            }), e);
            n?.cancel();
        } else {
            this.Le = s.performanceNow();
            t();
        }
    }
    $bind(t) {
        if (null !== this.Ee) {
            const e = Number(s.astEvaluate(this.Ee, t, this, null));
            this.De.delay = this.Oe = isNaN(e) ? gn : e;
        }
        super.$bind(t);
    }
    $unbind() {
        this.Pe?.cancel();
        this.Pe = null;
        super.$unbind();
    }
}

ot("throttle")(ThrottleBindingBehavior);

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

const vn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = vn;
    }
    unbind(t, e) {
        return;
    }
}

ot("attr")(AttrBindingBehavior);

function wn(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw v(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = wn;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ot("self")(SelfBindingBehavior);

const bn = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return bn[t] ?? (bn[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

function yn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Ue = void 0;
        this.je = void 0;
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
        this._e();
        this.Fe();
        this.X();
    }
    handleCollectionChange() {
        this.Fe();
    }
    handleChange(t, e) {
        this.Fe();
    }
    Fe() {
        const t = this.v;
        const e = this.o;
        const s = w.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : yn;
        if (i) e.checked = !!n(t, s); else if (true === t) e.checked = true; else {
            let i = false;
            if (C(t)) i = -1 !== t.findIndex((t => !!n(t, s))); else if (t instanceof Set) {
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
        const s = w.call(e, "model") ? e.model : e.value;
        const i = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : yn;
        if ("checkbox" === e.type) {
            if (C(t)) {
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
        this._e();
    }
    stop() {
        this.handler.dispose();
        this.Ue?.unsubscribe(this);
        this.Ue = void 0;
        this.je?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    X() {
        kn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, kn);
    }
    _e() {
        const t = this.o;
        (this.je ?? (this.je = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Ue?.unsubscribe(this);
        this.Ue = void 0;
        if ("checkbox" === t.type) (this.Ue = Ln(this.v, this.oL))?.subscribe(this);
    }
}

s.subscriberCollection(CheckedObserver);

let kn;

const Cn = {
    childList: true,
    subtree: true,
    characterData: true
};

function An(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.N = false;
        this.Me = void 0;
        this.Ve = void 0;
        this.iO = false;
        this.o = t;
        this.oL = i;
        this.handler = s;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Rn(this.o.options) : this.o.value;
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
        const s = C(t);
        const i = e.matcher ?? An;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = w.call(e, "model") ? e.model : e.value;
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
            const o = t.matcher || An;
            const l = [];
            while (n < s) {
                r = e[n];
                if (r.selected) l.push(w.call(r, "model") ? r.model : r.value);
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
                r = w.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    He() {
        (this.Ve = new this.o.ownerDocument.defaultView.MutationObserver(this.We.bind(this))).observe(this.o, Cn);
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
            if (!this.o.multiple) throw v(`AUR0654`);
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
        Sn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Sn);
    }
}

s.subscriberCollection(SelectValueObserver);

function Rn(t) {
    const e = [];
    if (0 === t.length) return e;
    const s = t.length;
    let i = 0;
    let n;
    while (s > i) {
        n = t[i];
        if (n.selected) e[e.length] = w.call(n, "model") ? n.model : n.value;
        ++i;
    }
    return e;
}

let Sn;

const Bn = "--";

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
    Xe(e) {
        let s;
        let i;
        const n = [];
        for (i in e) {
            s = e[i];
            if (null == s) continue;
            if (R(s)) {
                if (i.startsWith(Bn)) {
                    n.push([ i, s ]);
                    continue;
                }
                n.push([ t.kebabCase(i), s ]);
                continue;
            }
            n.push(...this.Ke(s));
        }
        return n;
    }
    Qe(e) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...this.Ke(e[i]));
            return t;
        }
        return t.emptyArray;
    }
    Ke(e) {
        if (R(e)) return this.Ge(e);
        if (e instanceof Array) return this.Qe(e);
        if (e instanceof Object) return this.Xe(e);
        return t.emptyArray;
    }
    G() {
        if (this.N) {
            this.N = false;
            const t = this.value;
            const e = this.styles;
            const s = this.Ke(t);
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
                if (!w.call(e, i) || e[i] !== n) continue;
                this.obj.style.removeProperty(i);
            }
        }
    }
    setProperty(t, e) {
        let s = "";
        if (null != e && A(e.indexOf) && e.includes("!important")) {
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
        In = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, In);
    }
}

s.subscriberCollection(ValueAttributeObserver);

let In;

const Tn = "http://www.w3.org/1999/xlink";

const Dn = "http://www.w3.org/XML/1998/namespace";

const En = "http://www.w3.org/2000/xmlns/";

const Pn = Object.assign(g(), {
    "xlink:actuate": [ "actuate", Tn ],
    "xlink:arcrole": [ "arcrole", Tn ],
    "xlink:href": [ "href", Tn ],
    "xlink:role": [ "role", Tn ],
    "xlink:show": [ "show", Tn ],
    "xlink:title": [ "title", Tn ],
    "xlink:type": [ "type", Tn ],
    "xml:lang": [ "lang", Dn ],
    "xml:space": [ "space", Dn ],
    xmlns: [ "xmlns", En ],
    "xmlns:xlink": [ "xlink", En ]
});

const $n = new s.PropertyAccessor;

$n.type = 2 | 4;

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
        this.Ye = g();
        this.Ze = g();
        this.Je = g();
        this.ts = g();
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
        V(s.INodeObserverLocator, NodeObserverLocator).register(t);
        M(s.INodeObserverLocator, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.Ye;
        let n;
        if (R(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = new NodeObserverConfig(s); else On(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else On(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Ze;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else On("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else On("*", t);
    }
    getAccessor(e, s, i) {
        if (s in this.ts || s in (this.Je[e.tagName] ?? t.emptyObject)) return this.getObserver(e, s, i);
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
            return vn;

          default:
            {
                const t = Pn[s];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (y(e, s, this.svgAnalyzer)) return vn;
                return $n;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (R(t)) {
            n = (s = this.Je)[t] ?? (s[t] = g());
            n[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            n = (i = this.Je)[e] ?? (i[e] = g());
            n[s] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.ts[e] = true;
    }
    getObserver(t, e, i) {
        switch (e) {
          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const n = this.Ye[t.tagName]?.[e] ?? this.Ze[e];
        if (null != n) return new n.type(t, e, new EventSubscriber(n), i, this.locator);
        const r = Pn[e];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (y(t, e, this.svgAnalyzer)) return vn;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw v(`AUR0652:${String(e)}`);
        } else return new s.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, Te, s.IDirtyChecker, Vi ];

function Ln(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function On(t, e) {
    throw v(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...s) {
        if (0 === s.length) throw v(`AUR0802`);
        if (6 !== e.mode && 4 !== e.mode) throw v(`AUR0803`);
        const i = this.oL.getObserver(e.target, e.targetProperty);
        if (!i.handler) throw v(`AUR0804`);
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

ot("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.es = false;
        this.ss = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.rs(); else this.es = true;
    }
    attached() {
        if (this.es) {
            this.es = false;
            this.rs();
        }
        this.ss.addEventListener("focus", this);
        this.ss.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ss;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.os) this.value = false;
    }
    rs() {
        const t = this.ss;
        const e = this.os;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get os() {
        return this.ss === this.p.document.activeElement;
    }
}

Focus.inject = [ $s, Te ];

r([ D({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Mt("focus")(Focus);

let qn = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.ls = false;
        this.Pe = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Pe = null;
            if (Boolean(this.value) !== this.cs) if (this.cs === this.us) {
                this.cs = !this.us;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.cs = this.us;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.cs = this.us = "hide" !== s.alias;
    }
    binding() {
        this.ls = true;
        this.update();
    }
    detaching() {
        this.ls = false;
        this.Pe?.cancel();
        this.Pe = null;
    }
    valueChanged() {
        if (this.ls && null === this.Pe) this.Pe = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ D ], qn.prototype, "value", void 0);

qn = r([ o(0, $s), o(1, Te), o(2, Ks) ], qn);

G("hide")(qn);

Mt("show")(qn);

class Portal {
    constructor(t, e, s) {
        this.strict = false;
        this.p = s;
        this.ds = s.document.createElement("div");
        this.view = t.create();
        js(this.view.nodes, e);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.ds = this.ps();
        this.view.setHost(i);
        return this.xs(t, i, s);
    }
    detaching(t, e, s) {
        return this.gs(t, this.ds, s);
    }
    targetChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        const s = this.ds;
        const i = this.ds = this.ps();
        if (s === i) return;
        this.view.setHost(i);
        const n = t.onResolve(this.gs(null, i, e.flags), (() => this.xs(null, i, e.flags)));
        if (k(n)) n.catch((t => {
            throw t;
        }));
    }
    xs(e, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return t.onResolve(n?.call(r, s, o), (() => this.vs(e, s, i)));
    }
    vs(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.appendTo(s); else return t.onResolve(r.activate(e ?? r, n, i, n.scope), (() => this.ws(s)));
        return this.ws(s);
    }
    ws(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    gs(e, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return t.onResolve(n?.call(r, s, o), (() => this.bs(e, s, i)));
    }
    bs(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, i), (() => this.ys(s)));
        return this.ys(s);
    }
    ys(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    ps() {
        const t = this.p;
        const e = t.document;
        let s = this.target;
        let i = this.renderContext;
        if ("" === s) {
            if (this.strict) throw v(`AUR0811`);
            return e.body;
        }
        if (R(s)) {
            let n = e;
            if (R(i)) i = e.querySelector(i);
            if (i instanceof t.Node) n = i;
            s = n.querySelector(s);
        }
        if (s instanceof t.Node) return s;
        if (null == s) {
            if (this.strict) throw v(`AUR0812`);
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

Portal.inject = [ Ge, Os, Te ];

r([ D({
    primary: true
}) ], Portal.prototype, "target", void 0);

r([ D({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

r([ D() ], Portal.prototype, "strict", void 0);

r([ D() ], Portal.prototype, "deactivating", void 0);

r([ D() ], Portal.prototype, "activating", void 0);

r([ D() ], Portal.prototype, "deactivated", void 0);

r([ D() ], Portal.prototype, "activated", void 0);

r([ D() ], Portal.prototype, "callbackContext", void 0);

Vt("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.ks = false;
        this.Cs = 0;
        this.As = t;
        this.l = e;
    }
    attaching(e, s, i) {
        let n;
        const r = this.$controller;
        const o = this.Cs++;
        const l = () => !this.ks && this.Cs === o + 1;
        return t.onResolve(this.pending, (() => {
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.As.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == n) return;
            n.setLocation(this.l);
            this.pending = t.onResolve(n.activate(e, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(e, s, i) {
        this.ks = true;
        return t.onResolve(this.pending, (() => {
            this.ks = false;
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
        const o = this.Cs++;
        const l = () => !this.ks && this.Cs === o + 1;
        let h;
        return t.onResolve(this.pending, (() => this.pending = t.onResolve(n?.deactivate(n, r, i), (() => {
            if (!l()) return;
            if (e) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.As.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
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

If.inject = [ Ge, Os ];

r([ D ], If.prototype, "value", void 0);

r([ D({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Vt("if")(If);

class Else {
    constructor(t) {
        this.f = t;
    }
    link(t, e, s, i) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw v(`AUR0810`);
    }
}

Else.inject = [ Ge ];

Vt({
    name: "else"
})(Else);

function Un(t) {
    t.dispose();
}

const jn = [ 18, 17 ];

class Repeat {
    constructor(t, e, s) {
        this.views = [];
        this.key = void 0;
        this.Rs = void 0;
        this.Ss = false;
        this.Bs = false;
        this.Is = null;
        this.Ts = void 0;
        this.Ds = false;
        this.l = t;
        this.Es = e;
        this.f = s;
    }
    binding(t, e, i) {
        const n = this.Es.bindings;
        const r = n.length;
        let o;
        let l;
        let h = 0;
        for (;r > h; ++h) {
            o = n[h];
            if (o.target === this && "items" === o.targetProperty) {
                l = this.forOf = o.ast;
                this.Ps = o;
                let t = l.iterable;
                while (null != t && jn.includes(t.$kind)) {
                    t = t.expression;
                    this.Ss = true;
                }
                this.Is = t;
                break;
            }
        }
        this.$s();
        const c = l.declaration;
        if (!(this.Ds = 24 === c.$kind || 25 === c.$kind)) this.local = s.astEvaluate(c, this.$controller.scope, o, null);
    }
    attaching(t, e, s) {
        this.Ls();
        return this.Os(t);
    }
    detaching(t, e, s) {
        this.$s();
        return this.qs(t);
    }
    itemsChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        this.$s();
        this.Ls();
        const s = t.onResolve(this.qs(null), (() => this.Os(null)));
        if (k(s)) s.catch(B);
    }
    handleCollectionChange(e, i) {
        const n = this.$controller;
        if (!n.isActive) return;
        if (this.Ss) {
            if (this.Bs) return;
            this.Bs = true;
            this.items = s.astEvaluate(this.forOf.iterable, n.scope, this.Ps, null);
            this.Bs = false;
            return;
        }
        this.Ls();
        if (void 0 === i) {
            const e = t.onResolve(this.qs(null), (() => this.Os(null)));
            if (k(e)) e.catch(B);
        } else {
            const e = this.views.length;
            const n = s.applyMutationsToIndices(i);
            if (n.deletedIndices.length > 0) {
                const s = t.onResolve(this.Us(n), (() => this.js(e, n)));
                if (k(s)) s.catch(B);
            } else this.js(e, n);
        }
    }
    $s() {
        const t = this.$controller.scope;
        let e = this._s;
        let i = this.Ss;
        let n;
        if (i) {
            e = this._s = s.astEvaluate(this.Is, t, this.Ps, null) ?? null;
            i = this.Ss = !Object.is(this.items, e);
        }
        const r = this.Rs;
        if (this.$controller.isActive) {
            n = this.Rs = s.getCollectionObserver(i ? e : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.Rs = void 0;
        }
    }
    Ls() {
        const t = this.items;
        if (C(t)) {
            this.Ts = t;
            return;
        }
        const e = [];
        Gn(t, ((t, s) => {
            e[s] = t;
        }));
        this.Ts = e;
    }
    Os(t) {
        let e;
        let i;
        let n;
        let r;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = zn(a);
        const p = this.views = Array(d);
        Gn(a, ((a, m) => {
            n = p[m] = l.create().setLocation(c);
            n.nodes.unlink();
            if (this.Ds) s.astAssign(f.declaration, r = s.Scope.fromParent(u, new s.BindingContext), this.Ps, a); else r = s.Scope.fromParent(u, new s.BindingContext(h, a));
            Hn(r.overrideContext, m, d);
            i = n.activate(t ?? n, o, 0, r);
            if (k(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    qs(t) {
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
            if (k(s)) (e ?? (e = [])).push(s);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Us(t) {
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
            if (k(s)) (e ?? (e = [])).push(s);
        }
        h = 0;
        let c = 0;
        for (;l > h; ++h) {
            c = o[h] - h;
            r.splice(c, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    js(t, e) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, Ts: u, l: f, views: d} = this;
        const p = e.length;
        for (;p > l; ++l) if (-2 === e[l]) {
            r = c.create();
            d.splice(l, 0, r);
        }
        if (d.length !== p) throw Nn(d.length, p);
        const m = h.scope;
        const x = e.length;
        s.synchronizeIndices(d, e);
        const g = Vn(e);
        const v = g.length;
        let w;
        let b = v - 1;
        l = x - 1;
        for (;l >= 0; --l) {
            r = d[l];
            w = d[l + 1];
            r.nodes.link(w?.nodes ?? f);
            if (-2 === e[l]) {
                if (this.Ds) s.astAssign(this.forOf.declaration, o = s.Scope.fromParent(m, new s.BindingContext), this.Ps, u[l]); else o = s.Scope.fromParent(m, new s.BindingContext(a, u[l]));
                Hn(o.overrideContext, l, x);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (k(n)) (i ?? (i = [])).push(n);
            } else if (b < 0 || 1 === v || l !== g[b]) {
                Hn(r.scope.overrideContext, l, x);
                r.nodes.insertBefore(r.location);
            } else {
                if (t !== x) Hn(r.scope.overrideContext, l, x);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(Un);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Os, ms, Ge ];

r([ D ], Repeat.prototype, "items", void 0);

Vt("repeat")(Repeat);

let _n = 16;

let Fn = new Int32Array(_n);

let Mn = new Int32Array(_n);

function Vn(t) {
    const e = t.length;
    if (e > _n) {
        _n = e;
        Fn = new Int32Array(e);
        Mn = new Int32Array(e);
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
            o = Fn[s];
            n = t[o];
            if (-2 !== n && n < i) {
                Mn[r] = o;
                Fn[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[Fn[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[Fn[l]];
            if (i < n || -2 === n) {
                if (l > 0) Mn[r] = Fn[l - 1];
                Fn[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = Fn[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = Mn[i];
    }
    while (r-- > 0) Fn[r] = 0;
    return a;
}

const Nn = (t, e) => v(`AUR0814:${t}!=${e}`);

const Hn = (t, e, s) => {
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

const Wn = Object.prototype.toString;

const zn = t => {
    switch (Wn.call(t)) {
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
        throw v(`Cannot count ${Wn.call(t)}`);
    }
};

const Gn = (t, e) => {
    switch (Wn.call(t)) {
      case "[object Array]":
        return Xn(t, e);

      case "[object Map]":
        return Kn(t, e);

      case "[object Set]":
        return Qn(t, e);

      case "[object Number]":
        return Yn(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw v(`Cannot iterate over ${Wn.call(t)}`);
    }
};

const Xn = (t, e) => {
    const s = t.length;
    let i = 0;
    for (;i < s; ++i) e(t[i], i, t);
};

const Kn = (t, e) => {
    let s = -0;
    let i;
    for (i of t.entries()) e(i, s++, t);
};

const Qn = (t, e) => {
    let s = 0;
    let i;
    for (i of t.keys()) e(i, s++, t);
};

const Yn = (t, e) => {
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

With.inject = [ Ge, Os ];

r([ D ], With.prototype, "value", void 0);

Vt("with")(With);

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
        this.queue((() => this.Fs(t)));
    }
    Fs(e) {
        const s = e.isMatch(this.value);
        const i = this.activeCases;
        const n = i.length;
        if (!s) {
            if (n > 0 && i[0].id === e.id) return this.Ms(null);
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
        return t.onResolve(this.Ms(null, r), (() => {
            this.activeCases = r;
            return this.Vs(null);
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
        return t.onResolve(this.activeCases.length > 0 ? this.Ms(e, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Vs(e);
        }));
    }
    Vs(e) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(e, 0, r);
        return t.resolveAll(...i.map((t => t.activate(e, 0, r))));
    }
    Ms(e, s = []) {
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

r([ D ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ Vt("switch"), o(0, Ge), o(1, Os) ], exports.Switch);

let Zn = 0;

exports.Case = class Case {
    constructor(t, e, s, i) {
        this.f = t;
        this.Ns = e;
        this.l = s;
        this.id = ++Zn;
        this.fallThrough = false;
        this.view = void 0;
        this.Hs = i.config.level <= 1;
        this.Te = i.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, s, i) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof exports.Switch) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw v(`AUR0815`);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    isMatch(t) {
        this.Te.debug("isMatch()");
        const e = this.value;
        if (C(e)) {
            if (void 0 === this.Rs) this.Rs = this.Ws(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (C(t)) {
            this.Rs?.unsubscribe(this);
            this.Rs = this.Ws(t);
        } else if (void 0 !== this.Rs) this.Rs.unsubscribe(this);
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
        this.Rs?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ws(t) {
        const e = this.Ns.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ Ge, s.IObserverLocator, Os, t.ILogger ];

r([ D ], exports.Case.prototype, "value", void 0);

r([ D({
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

exports.Case = r([ Vt("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw v(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ Vt("default-case") ], exports.DefaultCase);

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
        if (!k(n)) {
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

r([ D ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ Vt("promise"), o(0, Ge), o(1, Os), o(2, Te), o(3, t.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Jn(t).pending = this;
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

r([ D({
    mode: 2
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ Vt("pending"), o(0, Ge), o(1, Os) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Jn(t).fulfilled = this;
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

r([ D({
    mode: 4
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ Vt("then"), o(0, Ge), o(1, Os) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Jn(t).rejected = this;
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

r([ D({
    mode: 4
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ Vt("catch"), o(0, Ge), o(1, Os) ], exports.RejectedTemplateController);

function Jn(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw v(`AUR0813`);
}

let tr = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

tr = r([ tt({
    pattern: "promise.resolve",
    symbols: ""
}) ], tr);

let er = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

er = r([ tt({
    pattern: "then",
    symbols: ""
}) ], er);

let sr = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

sr = r([ tt({
    pattern: "catch",
    symbols: ""
}) ], sr);

function ir(t, e, s, i) {
    if (R(e)) return nr(t, e, s, i);
    if (ve(e)) return rr(t, e, s, i);
    throw v(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.zs = s;
        this.Gs = void 0;
    }
    get definition() {
        if (void 0 === this.Gs) this.Gs = CustomElementDefinition.create({
            name: me(),
            template: this.node,
            needsCompile: R(this.node),
            instructions: this.instructions,
            dependencies: this.zs
        });
        return this.Gs;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(es).getViewFactory(this.definition, t.createChild().register(...this.zs));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.zs);
    }
}

function nr(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (Qs(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) or(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function rr(t, e, s, i) {
    const n = ye(e);
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
        if (Qs(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) or(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function or(t, e, s, i, n) {
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

function lr(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, e, s, i) {
        this.p = t;
        this.Xs = e;
        this.Ks = s;
        this.r = i;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Qs = void 0;
        this.Ys = e.props.reduce(lr, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.Qs !== i) {
            this.Qs = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.bs(this.view, t, s);
    }
    componentChanged(e, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Qs === e) return;
        this.Qs = e;
        this.composing = true;
        i |= n.flags;
        const r = t.onResolve(this.bs(this.view, null, i), (() => this.compose(void 0, e, null, i)));
        if (k(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(e, s, i, n) {
        return t.onResolve(void 0 === e ? t.onResolve(s, (t => this.Zs(t, n))) : e, (t => this.vs(this.view = t, i, n)));
    }
    bs(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    vs(e, s, i) {
        const {$controller: n} = this;
        return t.onResolve(e?.activate(s ?? e, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Zs(t, e) {
        const s = this.Js(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Js(t, e) {
        if (null == t) return;
        const s = this.Ks.controller.container;
        if ("object" === typeof t) {
            if (hr(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (R(t)) {
            const e = s.find(Ae, t);
            if (null == e) throw v(`AUR0809:${t}`);
            t = e.Type;
        }
        return ir(this.p, t, this.Ys, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ Te, Ks, xs, es ];

r([ D ], AuRender.prototype, "component", void 0);

r([ D({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

ee({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function hr(t) {
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
        this.ti = void 0;
        this.r = t.get(es);
        this.Xs = r;
        this.ei = o;
    }
    static get inject() {
        return [ t.IContainer, ms, $s, Os, Te, Ks, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.si;
    }
    get composition() {
        return this.ti;
    }
    attaching(e, s, i) {
        return this.si = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this.ei.isCurrent(t)) this.si = void 0;
        }));
    }
    detaching(e) {
        const s = this.ti;
        const i = this.si;
        this.ei.invalidate();
        this.ti = this.si = void 0;
        return t.onResolve(i, (() => s?.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.ti) {
            this.ti.update(this.model);
            return;
        }
        this.si = t.onResolve(this.si, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this.ei.isCurrent(t)) this.si = void 0;
        }))));
    }
    queue(e, s) {
        const i = this.ei;
        const n = this.ti;
        return t.onResolve(i.create(e), (e => {
            if (i.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (i.isCurrent(e)) return t.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(e)) {
                        this.ti = r;
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
            if (d.containerless) throw v(`AUR0806`);
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
                    projections: this.Xs.projections
                }, d);
                return new CompositionController(s, (t => s.activate(t ?? s, u, 1, u.scope.parent)), (e => t.onResolve(s.deactivate(e ?? s, u, 2), r)), (t => i.activate?.(t)), e);
            } else {
                const t = CustomElementDefinition.create({
                    name: Ae.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? s.Scope.fromParent(this.parent.scope, i) : s.Scope.create(i);
                if (Fs(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), e);
            }
        };
        if ("activate" in i) return t.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(e, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = Fs(i);
        z(e, n.Element, z(e, $s, new t.InstanceProvider("ElementResolver", r ? null : i)));
        z(e, Os, new t.InstanceProvider("IRenderLocation", r ? i : null));
        const o = e.invoke(s);
        z(e, s, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = A(t) ? t : t?.constructor;
        return Ae.isType(e) ? Ae.getDefinition(e) : null;
    }
}

r([ D ], AuCompose.prototype, "view", void 0);

r([ D ], AuCompose.prototype, "viewModel", void 0);

r([ D ], AuCompose.prototype, "model", void 0);

r([ D({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw v(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

ee("au-compose")(AuCompose);

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
        if (k(this.view) || k(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        if (0 !== this.state) throw v(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw v(`AUR0808`);

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, s, i) {
        this.ii = null;
        this.ni = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.ri = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.ri = true;
        }
        this.Ks = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Os, Ks, xs, es ];
    }
    binding(t, e, i) {
        this.ii = this.$controller.scope.parent;
        let n;
        if (this.ri) {
            n = this.Ks.controller.scope.parent;
            (this.ni = s.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.ii.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.ri ? this.ni : this.ii);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.ri && null != this.ni) this.ni.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

r([ D ], AuSlot.prototype, "expose", void 0);

ee({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const cr = F("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw v('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.oi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.oi.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, cr) ], exports.SanitizeValueConverter);

ut("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.li = t;
    }
    toView(t, e) {
        return this.li.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, ts) ], exports.ViewValueConverter);

ut("view")(exports.ViewValueConverter);

const ar = DebounceBindingBehavior;

const ur = OneTimeBindingBehavior;

const fr = ToViewBindingBehavior;

const dr = FromViewBindingBehavior;

const pr = SignalBindingBehavior;

const mr = ThrottleBindingBehavior;

const xr = TwoWayBindingBehavior;

const gr = TemplateCompiler;

const vr = NodeObserverLocator;

const wr = [ gr, vr ];

const br = SVGAnalyzer;

const yr = exports.AtPrefixedTriggerAttributePattern;

const kr = exports.ColonPrefixedBindAttributePattern;

const Cr = exports.RefAttributePattern;

const Ar = exports.DotSeparatedAttributePattern;

const Rr = rt;

const Sr = [ Cr, Ar, Rr ];

const Br = [ yr, kr ];

const Ir = exports.CallBindingCommand;

const Tr = exports.DefaultBindingCommand;

const Dr = exports.ForBindingCommand;

const Er = exports.FromViewBindingCommand;

const Pr = exports.OneTimeBindingCommand;

const $r = exports.ToViewBindingCommand;

const Lr = exports.TwoWayBindingCommand;

const Or = Fi;

const qr = exports.TriggerBindingCommand;

const Ur = exports.DelegateBindingCommand;

const jr = exports.CaptureBindingCommand;

const _r = exports.AttrBindingCommand;

const Fr = exports.ClassBindingCommand;

const Mr = exports.StyleBindingCommand;

const Vr = Mi;

const Nr = [ Tr, Pr, Er, $r, Lr, Ir, Dr, Or, qr, Ur, jr, Fr, Mr, _r, Vr ];

const Hr = exports.SanitizeValueConverter;

const Wr = exports.ViewValueConverter;

const zr = If;

const Gr = Else;

const Xr = Repeat;

const Kr = With;

const Qr = exports.Switch;

const Yr = exports.Case;

const Zr = exports.DefaultCase;

const Jr = exports.PromiseTemplateController;

const to = exports.PendingTemplateController;

const eo = exports.FulfilledTemplateController;

const so = exports.RejectedTemplateController;

const io = tr;

const no = er;

const ro = sr;

const oo = AttrBindingBehavior;

const lo = SelfBindingBehavior;

const ho = UpdateTriggerBindingBehavior;

const co = AuRender;

const ao = AuCompose;

const uo = Portal;

const fo = Focus;

const po = qn;

const mo = [ ar, ur, fr, dr, pr, mr, xr, Hr, Wr, zr, Gr, Xr, Kr, Qr, Yr, Zr, Jr, to, eo, so, io, no, ro, oo, lo, ho, co, ao, uo, fo, po, AuSlot ];

const xo = hi;

const go = ri;

const vo = ni;

const wo = ai;

const bo = fi;

const yo = li;

const ko = ui;

const Co = ci;

const Ao = ii;

const Ro = oi;

const So = gi;

const Bo = ki;

const Io = vi;

const To = wi;

const Do = bi;

const Eo = yi;

const Po = xi;

const $o = Ci;

const Lo = [ ko, bo, xo, Co, wo, Ao, vo, go, Ro, yo, So, Bo, Io, To, Do, Eo, Po, $o ];

const Oo = qo(t.noop);

function qo(t) {
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
            return e.register(N(s.ICoercionConfiguration, i.coercingOptions), ...wr, ...mo, ...Sr, ...Nr, ...Lo);
        },
        customize(e) {
            return qo(e ?? t);
        }
    };
}

const Uo = F("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.hi = false;
        this.ai = false;
        this.ui = void 0;
        this.next = void 0;
        this.fi = void 0;
        this.di = void 0;
        if (e.has(Uo, true)) throw v(`AUR0768`);
        z(e, Uo, new t.InstanceProvider("IAurelia", this));
        z(e, Ds, this.pi = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.hi;
    }
    get isStopping() {
        return this.ai;
    }
    get root() {
        if (null == this.ui) {
            if (null == this.next) throw v(`AUR0767`);
            return this.next;
        }
        return this.ui;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.mi(t.host), this.container, this.pi);
        return this;
    }
    enhance(e, s) {
        const i = e.container ?? this.container.createChild();
        const n = e.host;
        const r = this.mi(n);
        const o = e.component;
        let l;
        if (A(o)) {
            z(i, r.HTMLElement, z(i, r.Element, z(i, $s, new t.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        z(i, Ls, new t.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: me(),
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
    mi(t) {
        let e;
        if (!this.container.has(Te, false)) {
            if (null === t.ownerDocument.defaultView) throw v(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(N(Te, e));
        } else e = this.container.get(Te);
        return e;
    }
    start(e = this.next) {
        if (null == e) throw v(`AUR0770`);
        if (k(this.fi)) return this.fi;
        return this.fi = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.pi.prepare(this.ui = e);
            this.hi = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.hi = false;
                this.fi = void 0;
                this.xi(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (k(this.di)) return this.di;
        if (true === this.ir) {
            const s = this.ui;
            this.ir = false;
            this.ai = true;
            return this.di = t.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (e) s.dispose();
                this.ui = void 0;
                this.pi.dispose();
                this.ai = false;
                this.xi(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.ai) throw v(`AUR0771`);
        this.container.dispose();
    }
    xi(t, e, s) {
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

const jo = F("IDialogService");

const _o = F("IDialogController");

const Fo = F("IDialogDomRenderer");

const Mo = F("IDialogDom");

const Vo = F("IDialogGlobalSettings");

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
            this.Ut = t;
            this.Et = e;
        }));
    }
    static get inject() {
        return [ Te, t.IContainer ];
    }
    activate(e) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = e;
        const o = s.get(Fo);
        const l = e.host ?? this.p.document.body;
        const h = this.dom = o.render(l, e);
        const c = s.has(Ls, true) ? s.get(Ls) : null;
        const a = h.contentHost;
        this.settings = e;
        if (null == c || !c.contains(l)) s.register(N(Ls, l));
        s.register(N($s, a), N(Mo, h));
        return new Promise((t => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, e, a), {
                $dialog: this
            });
            t(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw No(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return t.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: Ae.generateName(),
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
        if (this.gi) return this.gi;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(e, s);
        const a = new Promise((a => {
            a(t.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.gi = void 0;
                    if (h) throw No(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return t.onResolve(o.deactivate?.(c), (() => t.onResolve(n.deactivate(n, null, 2), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== e) this.Ut(c); else this.Et(No(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.gi = void 0;
            throw t;
        }));
        this.gi = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(e) {
        const s = Ho(e);
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
        e.registerResolver(r.HTMLElement, e.registerResolver(r.Element, e.registerResolver($s, new t.InstanceProvider("ElementResolver", i))));
        return e.invoke(n);
    }
    getDefinition(t) {
        const e = A(t) ? t : t?.constructor;
        return Ae.isType(e) ? Ae.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function No(t, e) {
    const s = v(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function Ho(t) {
    const e = v("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.dt = t;
        this.p = e;
        this.vi = s;
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
        return [ t.IContainer, Te, Vo ];
    }
    static register(e) {
        e.register(M(jo, this), Tt.deactivating(jo, (e => t.onResolve(e.closeAll(), (t => {
            if (t.length > 0) throw v(`AUR0901:${t.length}`);
        })))));
    }
    open(e) {
        return zo(new Promise((s => {
            const i = DialogSettings.from(this.vi, e);
            const n = i.container ?? this.dt.createChild();
            s(t.onResolve(i.load(), (e => {
                const s = n.invoke(DialogController);
                n.register(N(_o, s));
                n.register(H(DialogController, (() => {
                    throw v(`AUR0902`);
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
        const s = Go(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).bi().wi();
    }
    load() {
        const e = this;
        const s = this.component;
        const i = this.template;
        const n = t.resolveAll(null == s ? void 0 : t.onResolve(s(), (t => {
            e.component = t;
        })), A(i) ? t.onResolve(i(), (t => {
            e.template = t;
        })) : void 0);
        return k(n) ? n.then((() => e)) : e;
    }
    bi() {
        if (null == this.component && null == this.template) throw v(`AUR0903`);
        return this;
    }
    wi() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Wo(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function zo(t) {
    t.whenClosed = Wo;
    return t;
}

function Go(t) {
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
        M(Vo, this).register(t);
    }
}

const Xo = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Xo} display:flex;`;
        this.overlayCss = Xo;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        M(Fo, this).register(t);
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

DefaultDialogDomRenderer.inject = [ Te ];

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

function Ko(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, Tt.creating((() => t(s.get(Vo))))),
        customize(t, s) {
            return Ko(t, s ?? e);
        }
    };
}

const Qo = Ko((() => {
    throw v(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(M(Vo, this));
    }
} ]);

const Yo = Ko(t.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Zo = F((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, s) {
        this.ctn = t;
        this.p = e;
        this.r = s;
    }
    define(e, s, i) {
        if (!e.includes("-")) throw v('Invalid web-components custom element name. It must include a "-"');
        let n;
        if (null == s) throw v("Invalid custom element definition");
        switch (typeof s) {
          case "function":
            n = Ae.isType(s) ? Ae.getDefinition(s) : CustomElementDefinition.create(Ae.generateName(), s);
            break;

          default:
            n = CustomElementDefinition.getOrCreate(s);
            break;
        }
        if (n.containerless) throw v("Containerless custom element is not supported. Consider using buitl-in extends instead");
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
                e.registerResolver(c.HTMLElement, e.registerResolver(c.Element, e.registerResolver($s, new t.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, e, {
                    projections: null
                });
                const i = e.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(e, i, this, null, s);
                Ps(this, s.key, r);
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

WcCustomElementRegistry.inject = [ t.IContainer, Te, es ];

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = Tt;

exports.AtPrefixedTriggerAttributePatternRegistration = yr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = oo;

exports.AttrBindingCommandRegistration = _r;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Bo;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = nt;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = co;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = $;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = at;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingBehaviorFactory = BindingBehaviorFactory;

exports.BindingCommand = _i;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingInterceptor = BindingInterceptor;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Ir;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = xo;

exports.CaptureBindingCommandRegistration = jr;

exports.CheckedObserver = CheckedObserver;

exports.Children = Lt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Fr;

exports.ColonPrefixedBindAttributePatternRegistration = kr;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = Qt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = go;

exports.CustomElement = Ae;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = vo;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = ar;

exports.DefaultBindingCommandRegistration = Tr;

exports.DefaultBindingLanguage = Nr;

exports.DefaultBindingSyntax = Sr;

exports.DefaultComponents = wr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = Lo;

exports.DefaultResources = mo;

exports.DelegateBindingCommandRegistration = Ur;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = Qo;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = Yo;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = Ar;

exports.Else = Else;

exports.ElseRegistration = Gr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.FlushQueue = FlushQueue;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Dr;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = dr;

exports.FromViewBindingCommandRegistration = Er;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Ds;

exports.IAppTask = It;

exports.IAttrMapper = Hi;

exports.IAttributeParser = J;

exports.IAttributePattern = Z;

exports.IAuSlotsInfo = Xs;

exports.IAurelia = Uo;

exports.IController = ms;

exports.IDialogController = _o;

exports.IDialogDom = Mo;

exports.IDialogDomRenderer = Fo;

exports.IDialogGlobalSettings = Vo;

exports.IDialogService = jo;

exports.IEventDelegator = zs;

exports.IEventTarget = Ls;

exports.IFlushQueue = gt;

exports.IHistory = Ns;

exports.IHydrationContext = xs;

exports.IInstruction = Ks;

exports.ILifecycleHooks = Ve;

exports.ILocation = Vs;

exports.INode = $s;

exports.INodeObserverLocatorRegistration = vr;

exports.IPlatform = Te;

exports.IProjections = Gs;

exports.IRenderLocation = Os;

exports.IRenderer = Zs;

exports.IRendering = es;

exports.ISVGAnalyzer = Vi;

exports.ISanitizer = cr;

exports.IShadowDOMGlobalStyles = qe;

exports.IShadowDOMStyles = Oe;

exports.ISyntaxInterpreter = K;

exports.ITemplateCompiler = Ys;

exports.ITemplateCompilerHooks = hn;

exports.ITemplateCompilerRegistration = gr;

exports.ITemplateElementFactory = Gi;

exports.IViewFactory = Ge;

exports.IViewLocator = ts;

exports.IWcElementRegistry = Zo;

exports.IWindow = Ms;

exports.If = If;

exports.IfRegistration = zr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = wo;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = bo;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = yo;

exports.LifecycleHooks = We;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = So;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = ur;

exports.OneTimeBindingCommandRegistration = Pr;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = ko;

exports.RefAttributePatternRegistration = Cr;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Or;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = Co;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = Xr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = br;

exports.SanitizeValueConverterRegistration = Hr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = lo;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Io;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = To;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = Ao;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Do;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Br;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = pr;

exports.StandardConfiguration = Oo;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Mr;

exports.StyleConfiguration = Ue;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Eo;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = un;

exports.TemplateControllerRendererRegistration = Ro;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = Po;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = mr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = fr;

exports.ToViewBindingCommandRegistration = $r;

exports.TriggerBindingCommandRegistration = qr;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = xr;

exports.TwoWayBindingCommandRegistration = Lr;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = ho;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = pt;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Wr;

exports.Views = Ze;

exports.Watch = te;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = Kr;

exports.alias = G;

exports.allResources = _;

exports.applyBindingBehavior = mi;

exports.astEvaluator = mt;

exports.attributePattern = tt;

exports.bindable = D;

exports.bindingBehavior = ot;

exports.bindingCommand = Oi;

exports.capture = Ie;

exports.children = Et;

exports.coercer = L;

exports.containerless = ie;

exports.convertToRenderLocation = _s;

exports.createElement = ir;

exports.cssModules = Pe;

exports.customAttribute = Mt;

exports.customElement = ee;

exports.getEffectiveParentNode = Us;

exports.getRef = Es;

exports.isCustomElementController = us;

exports.isCustomElementViewModel = fs;

exports.isInstruction = Qs;

exports.isRenderLocation = Fs;

exports.lifecycleHooks = ze;

exports.processContent = Se;

exports.registerAliases = X;

exports.renderer = Js;

exports.setEffectiveParentNode = js;

exports.setRef = Ps;

exports.shadowCSS = $e;

exports.strict = re;

exports.templateCompilerHooks = fn;

exports.templateController = Vt;

exports.useShadowDOM = se;

exports.valueConverter = ut;

exports.view = Je;

exports.watch = Yt;
//# sourceMappingURL=index.cjs.map
