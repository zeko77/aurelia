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
        m(t.constructor, L.keyFrom(e));
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

const L = Object.freeze({
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
                if (!h(P, t, n)) m(t, L.keyFrom(n));
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

const M = t.DI.createInterface;

const F = t.Registration.singleton;

const V = t.Registration.aliasTo;

const N = t.Registration.instance;

const W = t.Registration.callback;

const H = t.Registration.transient;

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
        this.parts = t.emptyArray;
        this.$ = "";
        this.O = {};
        this.q = {};
    }
    get pattern() {
        const t = this.$;
        if ("" === t) return null; else return t;
    }
    set pattern(e) {
        if (null == e) {
            this.$ = "";
            this.parts = t.emptyArray;
        } else {
            this.$ = e;
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

const K = M("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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

const Z = M("IAttributePattern");

const J = M("IAttributeParser", (t => t.singleton(AttributeParser)));

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
        F(Z, this.Type).register(t);
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

function ot(t) {
    return function(e) {
        return ct.define(t, e);
    };
}

class BindingBehaviorDefinition {
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
        return new BindingBehaviorDefinition(s, t.firstDefined(ht(s, "name"), i), t.mergeArrays(ht(s, "aliases"), n.aliases, s.aliases), ct.keyFrom(i));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        F(s, e).register(t);
        V(s, e).register(t);
        X(i, ct, s, t);
    }
}

const lt = d("binding-behavior");

const ht = (t, e) => l(f(e), t);

const ct = Object.freeze({
    name: lt,
    keyFrom(t) {
        return `${lt}:${t}`;
    },
    isType(t) {
        return A(t) && h(lt, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(lt, s, s.Type);
        c(lt, s, s);
        p(e, lt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(lt, t);
        if (void 0 === e) throw v(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ht
});

function at(t) {
    return function(e) {
        return dt.define(t, e);
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
        return new ValueConverterDefinition(s, t.firstDefined(ft(s, "name"), i), t.mergeArrays(ft(s, "aliases"), n.aliases, s.aliases), dt.keyFrom(i));
    }
    register(e) {
        const {Type: s, key: i, aliases: n} = this;
        t.Registration.singleton(i, s).register(e);
        t.Registration.aliasTo(i, s).register(e);
        X(n, dt, i, e);
    }
}

const ut = d("value-converter");

const ft = (t, e) => l(f(e), t);

const dt = Object.freeze({
    name: ut,
    keyFrom: t => `${ut}:${t}`,
    isType(t) {
        return A(t) && h(ut, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(ut, s, s.Type);
        c(ut, s, s);
        p(e, ut);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ut, t);
        if (void 0 === e) throw v(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ft
});

class BindingTargetSubscriber {
    constructor(t, e) {
        this.v = void 0;
        this.b = t;
        this.M = e;
    }
    flush() {
        this.b.updateSource(this.v);
    }
    handleChange(t, e) {
        const i = this.b;
        if (t !== s.astEvaluate(i.ast, i.scope, i, null)) {
            this.v = t;
            this.M.add(this);
        }
    }
}

const pt = t => {
    T(t.prototype, "useScope", (function(t) {
        this.scope = t;
    }));
};

const mt = (t, e = true) => s => {
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
        const e = dt.keyFrom(t);
        let s = xt.get(this);
        if (null == s) xt.set(this, s = new ResourceLookup);
        return s[e] ?? (s[e] = this.locator.get(j(e)));
    }));
    T(i, "getBehavior", (function(t) {
        const e = ct.keyFrom(t);
        let s = xt.get(this);
        if (null == s) xt.set(this, s = new ResourceLookup);
        return s[e] ?? (s[e] = this.locator.get(j(e)));
    }));
};

const xt = new WeakMap;

class ResourceLookup {}

const gt = M("IFlushQueue", (t => t.singleton(FlushQueue)));

class FlushQueue {
    constructor() {
        this.F = false;
        this.V = new Set;
    }
    get count() {
        return this.V.size;
    }
    add(t) {
        this.V.add(t);
        if (this.F) return;
        this.F = true;
        try {
            this.V.forEach(vt);
        } finally {
            this.F = false;
        }
    }
    clear() {
        this.V.clear();
        this.F = false;
    }
}

function vt(t, e, s) {
    s.delete(t);
    t.flush();
}

const wt = new WeakSet;

const bt = (t, e) => {
    T(t.prototype, "limit", (function(t) {
        if (wt.has(this)) throw v(`AURXXXX: a rate limit has already been applied.`);
        wt.add(this);
        const s = e(this, t);
        const i = this[s];
        const n = (...t) => i.call(this, ...t);
        const r = "debounce" === t.type ? yt(t, n, this) : kt(t, n, this);
        this[s] = r;
        return {
            dispose: () => {
                wt.delete(this);
                r.dispose();
                delete this[s];
            }
        };
    }));
};

const yt = (t, e, s) => {
    let i;
    let n;
    let r;
    const o = t.queue;
    const l = l => {
        r = l;
        if (s.isBound) {
            n = i;
            i = o.queueTask((() => e(r)), {
                delay: t.delay,
                reusable: false
            });
            n?.cancel();
        } else e(r);
    };
    l.dispose = () => {
        n?.cancel();
        i?.cancel();
    };
    return l;
};

const kt = (t, e, s) => {
    let i;
    let n;
    let r = 0;
    let o = 0;
    let l;
    const h = t.queue;
    const c = () => t.now();
    const a = a => {
        l = a;
        if (s.isBound) {
            o = c() - r;
            n = i;
            if (o > t.delay) {
                r = c();
                e(l);
            } else i = h.queueTask((() => {
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
        i?.cancel();
    };
    return a;
};

class CallBinding {
    constructor(t, e, s, i, n) {
        this.locator = t;
        this.ast = s;
        this.target = i;
        this.targetProperty = n;
        this.isBound = false;
        this.boundFn = false;
        this.targetObserver = e.getAccessor(i, n);
    }
    callSource(t) {
        const e = this.scope.overrideContext;
        e.$event = t;
        const i = s.astEvaluate(this.ast, this.scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        this.targetObserver.setValue((t => this.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.targetObserver.setValue(null, this.target, this.targetProperty);
    }
}

pt(CallBinding);

bt(CallBinding, (() => "callSource"));

mt(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.N = false;
        this.o = t;
        this.W = e;
        this.H = s;
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
            switch (this.H) {
              case "class":
                this.o.classList.toggle(this.W, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let e = this.v;
                    if (R(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.W, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.H); else this.o.setAttribute(this.H, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let s = 0, i = t.length; i > s; ++s) {
            const i = t[s];
            if ("attributes" === i.type && i.attributeName === this.W) {
                e = true;
                break;
            }
        }
        if (e) {
            let t;
            switch (this.H) {
              case "class":
                t = this.o.classList.contains(this.W);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.W);
                break;

              default:
                throw v(`AUR0651:${this.H}`);
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
            this.v = this.ov = this.o.getAttribute(this.W);
            Ct(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) At(this.o, this);
    }
    X() {
        Bt = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Bt);
    }
}

s.subscriberCollection(AttributeObserver);

const Ct = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(Rt)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const At = (t, e) => {
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

const Rt = t => {
    t[0].target.$eMObs.forEach(St, t);
};

function St(t) {
    t.handleMutation(this);
}

let Bt;

const It = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, s, i, n, r, o, l, h) {
        this.locator = e;
        this.ast = n;
        this.targetAttribute = o;
        this.targetProperty = l;
        this.mode = h;
        this.isBound = false;
        this.scope = void 0;
        this.task = null;
        this.v = void 0;
        this.boundFn = false;
        this.K = t;
        this.target = r;
        this.oL = s;
        this.Y = i;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.K.state && (4 & this.targetObserver.type) > 0;
        const e = 0 === (1 & this.mode);
        let i;
        if (e) this.obs.version++;
        const n = s.astEvaluate(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (n !== this.v) {
            this.v = n;
            if (t) {
                i = this.task;
                this.task = this.Y.queueTask((() => {
                    this.task = null;
                    this.updateTarget(n);
                }), It);
                i?.cancel();
            } else this.updateTarget(n);
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        this.targetObserver ?? (this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = s.astEvaluate(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.v = void 0;
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
    }
}

pt(AttributeBinding);

bt(AttributeBinding, (() => "updateTarget"));

s.connectable(AttributeBinding);

mt(true)(AttributeBinding);

const Tt = {
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
        this.isBound = false;
        this.scope = void 0;
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
    Z() {
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
            }), Tt);
            l?.cancel();
            l = null;
        } else r.setValue(i, this.target, this.targetProperty);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        const e = this.partBindings;
        const s = e.length;
        let i = 0;
        for (;s > i; ++i) e[i].$bind(t);
        this.updateTarget();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.scope = void 0;
        const t = this.partBindings;
        const e = t.length;
        let s = 0;
        for (;e > s; ++s) t[s].$unbind();
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
        this.mode = 2;
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.oL = n;
    }
    updateTarget() {
        this.owner.Z();
    }
    handleChange() {
        if (!this.isBound) return;
        const t = this.obs;
        let e = false;
        e = (2 & this.mode) > 0;
        if (e) t.version++;
        const i = s.astEvaluate(this.ast, this.scope, this, e ? this : null);
        if (e) t.clear();
        if (i != this.v) {
            this.v = i;
            if (C(i)) this.observeCollection(i);
            this.updateTarget();
        }
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        this.v = s.astEvaluate(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (C(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

pt(InterpolationPartBinding);

bt(InterpolationPartBinding, (() => "updateTarget"));

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
        const e = s.astEvaluate(this.ast, this.scope, this, t ? this : null);
        if (t) this.obs.clear();
        if (e === this.v) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const i = 1 !== this.K.state;
        if (i) this.J(e); else this.updateTarget(e);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.v = s.astEvaluate(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (C(t)) this.observeCollection(t);
        const e = 1 !== this.K.state;
        if (e) this.J(t); else this.updateTarget(t);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        const e = this.v = s.astEvaluate(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (C(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
        this.task?.cancel();
        this.task = null;
    }
    J(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t);
        }), Tt);
        e?.cancel();
    }
}

pt(ContentBinding);

bt(ContentBinding, (() => "updateTarget"));

s.connectable()(ContentBinding);

mt(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, s, i, n = false) {
        this.locator = t;
        this.ast = s;
        this.targetProperty = i;
        this.isBound = false;
        this.scope = void 0;
        this.target = null;
        this.boundFn = false;
        this.oL = e;
        this.tt = n;
    }
    updateTarget() {
        this.target[this.targetProperty] = this.v;
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        if ((Dt = s.astEvaluate(this.ast, this.scope, this, this)) !== this.v) this.v = Dt;
        this.obs.clear();
        this.updateTarget();
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        this.target = this.tt ? t.bindingContext : t.overrideContext;
        s.astBind(this.ast, t, this);
        this.v = s.astEvaluate(this.ast, this.scope, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

pt(LetBinding);

bt(LetBinding, (() => "updateTarget"));

s.connectable(LetBinding);

mt(true)(LetBinding);

let Dt;

const Et = {
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
        this.isBound = false;
        this.scope = void 0;
        this.targetObserver = void 0;
        this.task = null;
        this.et = null;
        this.boundFn = false;
        this.K = t;
        this.Y = i;
        this.oL = s;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        s.astAssign(this.ast, this.scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.K.state && (4 & this.targetObserver.type) > 0;
        const e = this.mode > 1;
        if (e) this.obs.version++;
        const i = s.astEvaluate(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (t) {
            Pt = this.task;
            this.task = this.Y.queueTask((() => {
                this.updateTarget(i);
                this.task = null;
            }), Et);
            Pt?.cancel();
            Pt = null;
        } else this.updateTarget(i);
    }
    handleCollectionChange() {
        this.handleChange();
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        const e = this.oL;
        const i = this.mode;
        let n = this.targetObserver;
        if (!n) {
            if (4 & i) n = e.getObserver(this.target, this.targetProperty); else n = e.getAccessor(this.target, this.targetProperty);
            this.targetObserver = n;
        }
        const r = (2 & i) > 0;
        if (i & (2 | 1)) this.updateTarget(s.astEvaluate(this.ast, this.scope, this, r ? this : null));
        if (4 & i) {
            n.subscribe(this.et ?? (this.et = new BindingTargetSubscriber(this, this.locator.get(gt))));
            if (!r) this.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        if (this.et) {
            this.targetObserver.unsubscribe(this.et);
            this.et = null;
        }
        if (null != Pt) {
            Pt.cancel();
            Pt = this.task = null;
        }
        this.obs.clearAll();
    }
    useTargetSubscriber(t) {
        if (null != this.et) throw v(`AURxxxx: binding already has a target subscriber`);
        this.et = t;
    }
}

pt(PropertyBinding);

bt(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

s.connectable(PropertyBinding);

mt(true, false)(PropertyBinding);

let Pt = null;

class RefBinding {
    constructor(t, e, s) {
        this.locator = t;
        this.ast = e;
        this.target = s;
        this.isBound = false;
        this.scope = void 0;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        s.astAssign(this.ast, this.scope, this, this.target);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (s.astEvaluate(this.ast, this.scope, this, null) === this.target) s.astAssign(this.ast, this.scope, this, null);
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
    }
}

const Lt = M("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(N(Lt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const $t = Object.freeze({
    creating: Ot("creating"),
    hydrating: Ot("hydrating"),
    hydrated: Ot("hydrated"),
    activating: Ot("activating"),
    activated: Ot("activated"),
    deactivating: Ot("deactivating"),
    deactivated: Ot("deactivated")
});

function Ot(t) {
    function e(e, s) {
        if (A(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function qt(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(jt, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, _t.keyFrom(e));
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

function Ut(t) {
    return t.startsWith(jt);
}

const jt = f("children-observer");

const _t = Object.freeze({
    name: jt,
    keyFrom: t => `${jt}:${t}`,
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
        const s = jt.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(Ut);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l(jt, a, h[t].slice(s));
        }
        return i;
    }
});

const Mt = {
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
        return new ChildrenDefinition(t.firstDefined(s.callback, `${e}Changed`), t.firstDefined(s.property, e), s.options ?? Mt, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = Ft, r = Vt, o = Nt, l) {
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
                this.st();
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
    st() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return Ht(this.controller, this.query, this.filter, this.map);
    }
}

s.subscriberCollection()(ChildrenObserver);

function Ft(t) {
    return t.host.childNodes;
}

function Vt(t, e, s) {
    return !!s;
}

function Nt(t, e, s) {
    return s;
}

const Wt = {
    optional: true
};

function Ht(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Ae(l, Wt);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

function zt(t) {
    return function(e) {
        return Jt(t, e);
    };
}

function Gt(t) {
    return function(e) {
        return Jt(R(t) ? {
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
        return new CustomAttributeDefinition(s, t.firstDefined(Qt(s, "name"), i), t.mergeArrays(Qt(s, "aliases"), n.aliases, s.aliases), Kt(i), t.firstDefined(Qt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, 2), t.firstDefined(Qt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), L.from(s, ...L.getAll(s), Qt(s, "bindables"), s.bindables, n.bindables), t.firstDefined(Qt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(re.getAnnotation(s), s.watches), t.mergeArrays(Qt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        H(s, e).register(t);
        V(s, e).register(t);
        X(i, ee, s, t);
    }
}

const Xt = d("custom-attribute");

const Kt = t => `${Xt}:${t}`;

const Qt = (t, e) => l(f(e), t);

const Yt = t => A(t) && h(Xt, t);

const Zt = (t, e) => qs(t, Kt(e)) ?? void 0;

const Jt = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    c(Xt, s, s.Type);
    c(Xt, s, s);
    p(e, Xt);
    return s.Type;
};

const te = t => {
    const e = l(Xt, t);
    if (void 0 === e) throw v(`AUR0759:${t.name}`);
    return e;
};

const ee = Object.freeze({
    name: Xt,
    keyFrom: Kt,
    isType: Yt,
    for: Zt,
    define: Jt,
    getDefinition: te,
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: Qt
});

function se(t, e) {
    if (null == t) throw v(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!A(e) && (null == e || !(e in l.prototype))) throw v(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!A(r?.value)) throw v(`AUR0774:${String(n)}`);
        re.add(l, h);
        if (Yt(l)) te(l).watches.push(h);
        if (Ce(l)) Se(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const ie = t.emptyArray;

const ne = f("watch");

const re = Object.freeze({
    name: ne,
    add(t, e) {
        let s = l(ne, t);
        if (null == s) c(ne, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(ne, t) ?? ie;
    }
});

function oe(t) {
    return function(e) {
        return ke(t, e);
    };
}

function le(t) {
    if (void 0 === t) return function(t) {
        ye(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!A(t)) return function(e) {
        ye(e, "shadowOptions", t);
    };
    ye(t, "shadowOptions", {
        mode: "open"
    });
}

function he(t) {
    if (void 0 === t) return function(t) {
        ce(t);
    };
    ce(t);
}

function ce(t) {
    const e = l(ve, t);
    if (void 0 === e) {
        ye(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function ae(t) {
    if (void 0 === t) return function(t) {
        ye(t, "isStrictBinding", true);
    };
    ye(t, "isStrictBinding", true);
}

const ue = new WeakMap;

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
            const n = t.fromDefinitionOrDefault("name", i, be);
            if (A(i.Type)) s = i.Type; else s = Ie(t.pascalCase(n));
            return new CustomElementDefinition(s, n, t.mergeArrays(i.aliases), t.fromDefinitionOrDefault("key", i, (() => we(n))), t.fromDefinitionOrDefault("cache", i, de), t.fromDefinitionOrDefault("capture", i, me), t.fromDefinitionOrDefault("template", i, pe), t.mergeArrays(i.instructions), t.mergeArrays(i.dependencies), t.fromDefinitionOrDefault("injectable", i, pe), t.fromDefinitionOrDefault("needsCompile", i, xe), t.mergeArrays(i.surrogates), L.from(s, i.bindables), _t.from(i.childrenObservers), t.fromDefinitionOrDefault("containerless", i, me), t.fromDefinitionOrDefault("isStrictBinding", i, me), t.fromDefinitionOrDefault("shadowOptions", i, pe), t.fromDefinitionOrDefault("hasSlots", i, me), t.fromDefinitionOrDefault("enhance", i, me), t.fromDefinitionOrDefault("watches", i, ge), t.fromAnnotationOrTypeOrDefault("processContent", s, pe));
        }
        if (R(e)) return new CustomElementDefinition(s, e, t.mergeArrays(Re(s, "aliases"), s.aliases), we(e), t.fromAnnotationOrTypeOrDefault("cache", s, de), t.fromAnnotationOrTypeOrDefault("capture", s, me), t.fromAnnotationOrTypeOrDefault("template", s, pe), t.mergeArrays(Re(s, "instructions"), s.instructions), t.mergeArrays(Re(s, "dependencies"), s.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", s, pe), t.fromAnnotationOrTypeOrDefault("needsCompile", s, xe), t.mergeArrays(Re(s, "surrogates"), s.surrogates), L.from(s, ...L.getAll(s), Re(s, "bindables"), s.bindables), _t.from(..._t.getAll(s), Re(s, "childrenObservers"), s.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", s, me), t.fromAnnotationOrTypeOrDefault("isStrictBinding", s, me), t.fromAnnotationOrTypeOrDefault("shadowOptions", s, pe), t.fromAnnotationOrTypeOrDefault("hasSlots", s, me), t.fromAnnotationOrTypeOrDefault("enhance", s, me), t.mergeArrays(re.getAnnotation(s), s.watches), t.fromAnnotationOrTypeOrDefault("processContent", s, pe));
        const i = t.fromDefinitionOrDefault("name", e, be);
        return new CustomElementDefinition(s, i, t.mergeArrays(Re(s, "aliases"), e.aliases, s.aliases), we(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, s, de), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, s, me), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, s, pe), t.mergeArrays(Re(s, "instructions"), e.instructions, s.instructions), t.mergeArrays(Re(s, "dependencies"), e.dependencies, s.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, s, pe), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, s, xe), t.mergeArrays(Re(s, "surrogates"), e.surrogates, s.surrogates), L.from(s, ...L.getAll(s), Re(s, "bindables"), s.bindables, e.bindables), _t.from(..._t.getAll(s), Re(s, "childrenObservers"), s.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, s, me), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, s, me), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, s, pe), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, s, me), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, s, me), t.mergeArrays(e.watches, re.getAnnotation(s), s.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, s, pe));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (ue.has(t)) return ue.get(t);
        const e = CustomElementDefinition.create(t);
        ue.set(t, e);
        c(ve, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            H(s, e).register(t);
            V(s, e).register(t);
            X(i, Te, s, t);
        }
    }
}

const fe = {
    name: void 0,
    searchParents: false,
    optional: false
};

const de = () => 0;

const pe = () => null;

const me = () => false;

const xe = () => true;

const ge = () => t.emptyArray;

const ve = d("custom-element");

const we = t => `${ve}:${t}`;

const be = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const ye = (t, e, s) => {
    c(f(e), s, t);
};

const ke = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(ve, s, s.Type);
    c(ve, s, s);
    p(s.Type, ve);
    return s.Type;
};

const Ce = t => A(t) && h(ve, t);

const Ae = (t, e = fe) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = qs(t, ve);
        if (null === s) {
            if (true === e.optional) return null;
            throw v(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = qs(t, ve);
            if (null === s) throw v(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = qs(s, ve);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = Vs(s);
        }
        if (i) return;
        throw v(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = qs(s, ve);
        if (null !== t) return t;
        s = Vs(s);
    }
    throw v(`AUR0765`);
};

const Re = (t, e) => l(f(e), t);

const Se = t => {
    const e = l(ve, t);
    if (void 0 === e) throw v(`AUR0760:${t.name}`);
    return e;
};

const Be = () => {
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

const Ie = function() {
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

const Te = Object.freeze({
    name: ve,
    keyFrom: we,
    isType: Ce,
    for: Ae,
    define: ke,
    getDefinition: Se,
    annotate: ye,
    getAnnotation: Re,
    generateName: be,
    createInjectable: Be,
    generateType: Ie
});

const De = f("processContent");

function Ee(t) {
    return void 0 === t ? function(t, e, s) {
        c(De, Pe(t, e), t);
    } : function(e) {
        t = Pe(e, t);
        const s = l(ve, e);
        if (void 0 !== s) s.processContent = t; else c(De, t, e);
        return e;
    };
}

function Pe(t, e) {
    if (R(e)) e = t[e];
    if (!A(e)) throw v(`AUR0766:${typeof e}`);
    return e;
}

function Le(t) {
    return function(e) {
        const s = A(t) ? t : true;
        ye(e, "capture", s);
        if (Ce(e)) Se(e).capture = s;
    };
}

const $e = t.IPlatform;

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.it = {};
        this.nt = 0;
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
            const e = this.it;
            const s = Oe(t);
            let i = this.nt;
            this.ov = t;
            if (s.length > 0) this.rt(s);
            this.nt += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!w.call(e, t) || e[t] !== i) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    rt(t) {
        const e = this.obj;
        const s = t.length;
        let i = 0;
        let n;
        for (;i < s; i++) {
            n = t[i];
            if (0 === n.length) continue;
            this.it[n] = this.nt;
            e.classList.add(n);
        }
    }
}

function Oe(e) {
    if (R(e)) return qe(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...Oe(e[i]));
            return t;
        } else return t.emptyArray;
    }
    const s = [];
    let i;
    for (i in e) if (Boolean(e[i])) if (i.includes(" ")) s.push(...qe(i)); else s.push(i);
    return s;
}

function qe(e) {
    const s = e.match(/\S+/g);
    if (null === s) return t.emptyArray;
    return s;
}

function Ue(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = Jt({
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
                this.element.className = Oe(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ js ], e));
        t.register(i);
    }
}

function je(...t) {
    return new ShadowDOMRegistry(t);
}

const _e = M("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get($e))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Fe);
        const s = t.get(_e);
        t.register(N(Me, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ $e ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ $e ];

const Me = M("IShadowDOMStyles");

const Fe = M("IShadowDOMGlobalStyles", (e => e.instance({
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

const Ve = {
    shadowDOM(e) {
        return $t.creating(t.IContainer, (t => {
            if (null != e.sharedStyles) {
                const s = t.get(_e);
                t.register(N(Fe, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: Ne, exit: We} = s.ConnectableSwitcher;

const {wrap: He, unwrap: ze} = s.ProxyObservable;

class ComputedWatcher {
    constructor(t, e, s, i, n) {
        this.obj = t;
        this.$get = s;
        this.cb = i;
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
    $bind() {
        if (this.isBound) return;
        this.compute();
        this.isBound = true;
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
            Ne(this);
            return this.value = ze(this.$get.call(void 0, this.useProxy ? He(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            We(this);
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
        this.obs.version++;
        this.value = s.astEvaluate(this.expression, this.scope, this, this);
        this.obs.clear();
        this.isBound = true;
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

const Ge = M("ILifecycleHooks");

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
        F(Ge, this.Type).register(t);
    }
}

const Xe = new WeakMap;

const Ke = f("lifecycle-hooks");

const Qe = Object.freeze({
    name: Ke,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(Ke, s, e);
        p(e, Ke);
        return s.Type;
    },
    resolve(t) {
        let e = Xe.get(t);
        if (void 0 === e) {
            Xe.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(Ge) : t.has(Ge, false) ? s.getAll(Ge).concat(t.getAll(Ge)) : s.getAll(Ge);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(Ke, n.constructor);
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

function Ye() {
    return function t(e) {
        return Qe.define({}, e);
    };
}

const Ze = M("IViewFactory");

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

const Je = new WeakSet;

function ts(t) {
    return !Je.has(t);
}

function es(t) {
    Je.add(t);
    return CustomElementDefinition.create(t);
}

const ss = d("views");

const is = Object.freeze({
    name: ss,
    has(t) {
        return A(t) && (h(ss, t) || "$views" in t);
    },
    get(t) {
        if (A(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(ts).map(es);
            for (const e of s) is.add(t, e);
        }
        let e = l(ss, t);
        if (void 0 === e) c(ss, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(ss, t);
        if (void 0 === i) c(ss, i = [ s ], t); else i.push(s);
        return i;
    }
});

function ns(t) {
    return function(e) {
        is.add(e, t);
    };
}

const rs = M("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.ot = new WeakMap;
        this.lt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = is.has(t.constructor) ? is.get(t.constructor) : [];
            const i = A(e) ? e(t, s) : this.ht(s, e);
            return this.ct(t, s, i);
        }
        return null;
    }
    ct(t, e, s) {
        let i = this.ot.get(t);
        let n;
        if (void 0 === i) {
            i = {};
            this.ot.set(t, i);
        } else n = i[s];
        if (void 0 === n) {
            const r = this.ut(t, e, s);
            n = ke(Se(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            i[s] = n;
        }
        return n;
    }
    ut(t, e, i) {
        let n = this.lt.get(t.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.lt.set(t.constructor, n);
        } else r = n[i];
        if (void 0 === r) {
            r = ke(this.ft(e, i), class {
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
    ht(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    ft(t, e) {
        const s = t.find((t => t.name === e));
        if (void 0 === s) throw v(`Could not find view: ${e}`);
        return s;
    }
}

const os = M("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.dt = new WeakMap;
        this.xt = new WeakMap;
        this.p = (this.gt = t.root).get($e);
        this.vt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.wt ? this.wt = this.gt.getAll(ii, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.wt;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.dt;
            const n = e.get(si);
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
        const s = this.xt;
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
        return null == e ? this.vt : new FragmentNodeSequence(this.p, e.cloneNode(true));
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

var ls;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(ls || (ls = {}));

const hs = {
    optional: true
};

const cs = new WeakMap;

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
        this.bt = null;
        this.state = 0;
        this.yt = false;
        this.kt = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.Ct = 0;
        this.At = 0;
        this.Rt = 0;
        this.St = r;
        this.Bt = 2 === s ? HooksDefinition.none : new HooksDefinition(r);
        this.location = l;
        this.r = e.root.get(os);
    }
    get lifecycleHooks() {
        return this.bt;
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
        return this.Bt;
    }
    get viewModel() {
        return this.St;
    }
    set viewModel(t) {
        this.St = t;
        this.Bt = null == t || 2 === this.vmKind ? HooksDefinition.none : new HooksDefinition(t);
    }
    static getCached(t) {
        return cs.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw v(`AUR0500:${t}`);
        return e;
    }
    static $el(e, s, i, n, r = void 0, o = null) {
        if (cs.has(s)) return cs.get(s);
        r = r ?? Se(s.constructor);
        const l = new Controller(e, 0, r, null, s, i, o);
        const h = e.get(t.optional(ys));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        z(e, ys, new t.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        cs.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (cs.has(e)) return cs.get(e);
        i = i ?? te(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        cs.set(e, n);
        n.It();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.Tt();
        return s;
    }
    hE(e, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.St;
        let l = this.definition;
        this.scope = s.Scope.create(o, null, true);
        if (l.watches.length > 0) ms(this, n, l, o);
        us(this, l, r, o);
        this.kt = fs(this, l, o);
        if (this.Bt.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.bt = Qe.resolve(n);
        l.register(n);
        if (null !== l.injectable) z(n, l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == e || false !== e.hydrate) {
            this.hS(e);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.bt.hydrating) this.bt.hydrating.forEach(As, this);
        if (this.Bt.hasHydrating) this.St.hydrating(this);
        const e = this.Dt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = Ae(this.host, hs))) {
            this.host = this.container.root.get($e).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Ws(this.host);
        }
        Us(this.host, ve, this);
        Us(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw v(`AUR0501`);
            Us(this.shadowRoot = this.host.attachShadow(s ?? vs), ve, this);
            Us(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Us(o, ve, this);
            Us(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.St.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.bt.hydrated) this.bt.hydrated.forEach(Rs, this);
        if (this.Bt.hasHydrated) this.St.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Dt, this.host);
        if (void 0 !== this.bt.created) this.bt.created.forEach(Cs, this);
        if (this.Bt.hasCreated) this.St.created(this);
    }
    It() {
        const t = this.definition;
        const e = this.St;
        if (t.watches.length > 0) ms(this, this.container, t, e);
        us(this, t, this.flags, e);
        e.$controller = this;
        this.bt = Qe.resolve(this.container);
        if (void 0 !== this.bt.created) this.bt.created.forEach(Cs, this);
        if (this.Bt.hasCreated) this.St.created(this);
    }
    Tt() {
        this.Dt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Dt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Dt)).findTargets(), this.Dt, void 0);
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
            throw v(`AUR0503:${this.name} ${ws(this.state)}`);
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
        this.Et();
        let r;
        if (2 !== this.vmKind && null != this.bt.binding) r = t.resolveAll(...this.bt.binding.map(Ss, this));
        if (this.Bt.hasBinding) r = t.resolveAll(r, this.St.binding(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.Pt();
            r.then((() => {
                this.bind();
            })).catch((t => {
                this.Lt(t);
            }));
            return this.$promise;
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let e = 0;
        let s = this.kt.length;
        let i;
        if (s > 0) while (s > e) {
            this.kt[e].start();
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
        if (2 !== this.vmKind && null != this.bt.bound) i = t.resolveAll(...this.bt.bound.map(Bs, this));
        if (this.Bt.hasBound) i = t.resolveAll(i, this.St.bound(this.$initiator, this.parent, this.$flags));
        if (k(i)) {
            this.Pt();
            i.then((() => {
                this.isBound = true;
                this.$t();
            })).catch((t => {
                this.Lt(t);
            }));
            return;
        }
        this.isBound = true;
        this.$t();
    }
    Ot(...t) {
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
    $t() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Ot(this.host);
            break;

          case 3:
            this.hostController.Ot(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(Me, false) ? t.get(Me) : t.get(Fe);
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
        if (2 !== this.vmKind && null != this.bt.attaching) s = t.resolveAll(...this.bt.attaching.map(Is, this));
        if (this.Bt.hasAttaching) s = t.resolveAll(s, this.St.attaching(this.$initiator, this.parent, this.$flags));
        if (k(s)) {
            this.Pt();
            this.Et();
            s.then((() => {
                this.qt();
            })).catch((t => {
                this.Lt(t);
            }));
        }
        if (null !== this.children) for (;e < this.children.length; ++e) void this.children[e].activate(this.$initiator, this, this.$flags, this.scope);
        this.qt();
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
            throw v(`AUR0505:${this.name} ${ws(this.state)}`);
        }
        this.$initiator = e;
        this.$flags = i;
        if (e === this) this.Ut();
        let n = 0;
        let r;
        if (this.kt.length) for (;n < this.kt.length; ++n) this.kt[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(e, this, i);
        if (2 !== this.vmKind && null != this.bt.detaching) r = t.resolveAll(...this.bt.detaching.map(Ds, this));
        if (this.Bt.hasDetaching) r = t.resolveAll(r, this.St.detaching(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.Pt();
            e.Ut();
            r.then((() => {
                e.jt();
            })).catch((t => {
                e.Lt(t);
            }));
        }
        if (null === e.head) e.head = this; else e.tail.next = this;
        e.tail = this;
        if (e !== this) return;
        this.jt();
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
        this._t();
    }
    Pt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Pt();
        }
    }
    _t() {
        if (void 0 !== this.$promise) {
            Ps = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ps();
            Ps = void 0;
        }
    }
    Lt(t) {
        if (void 0 !== this.$promise) {
            Ls = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ls(t);
            Ls = void 0;
        }
        if (this.$initiator !== this) this.parent.Lt(t);
    }
    Et() {
        ++this.Ct;
        if (this.$initiator !== this) this.parent.Et();
    }
    qt() {
        if (0 === --this.Ct) {
            if (2 !== this.vmKind && null != this.bt.attached) $s = t.resolveAll(...this.bt.attached.map(Ts, this));
            if (this.Bt.hasAttached) $s = t.resolveAll($s, this.St.attached(this.$initiator, this.$flags));
            if (k($s)) {
                this.Pt();
                $s.then((() => {
                    this.state = 2;
                    this._t();
                    if (this.$initiator !== this) this.parent.qt();
                })).catch((t => {
                    this.Lt(t);
                }));
                $s = void 0;
                return;
            }
            $s = void 0;
            this.state = 2;
            this._t();
        }
        if (this.$initiator !== this) this.parent.qt();
    }
    Ut() {
        ++this.At;
    }
    jt() {
        if (0 === --this.At) {
            this.Mt();
            this.removeNodes();
            let e = this.$initiator.head;
            let s;
            while (null !== e) {
                if (e !== this) {
                    if (e.debug) e.logger.trace(`detach()`);
                    e.removeNodes();
                }
                if (2 !== e.vmKind && null != e.bt.unbinding) s = t.resolveAll(...e.bt.unbinding.map(Es, this));
                if (e.Bt.hasUnbinding) {
                    if (e.debug) e.logger.trace("unbinding()");
                    s = t.resolveAll(s, e.viewModel.unbinding(e.$initiator, e.parent, e.$flags));
                }
                if (k(s)) {
                    this.Pt();
                    this.Mt();
                    s.then((() => {
                        this.Ft();
                    })).catch((t => {
                        this.Lt(t);
                    }));
                }
                s = void 0;
                e = e.next;
            }
            this.Ft();
        }
    }
    Mt() {
        ++this.Rt;
    }
    Ft() {
        if (0 === --this.Rt) {
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
            return te(this.St.constructor).name === t;

          case 0:
            return Se(this.St.constructor).name === t;

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
            Us(t, ve, this);
            Us(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Us(t, ve, this);
            Us(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Us(t, ve, this);
            Us(t, this.definition.key, this);
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
        if (this.Bt.hasDispose) this.St.dispose();
        if (null !== this.children) {
            this.children.forEach(ks);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.St) {
            cs.delete(this.St);
            this.St = null;
        }
        this.St = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.Bt.hasAccept && true === this.St.accept(t)) return true;
        if (null !== this.children) {
            const {children: e} = this;
            for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
        }
    }
}

function as(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function us(t, e, i, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const c = as(n);
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

function fs(e, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = as(i);
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

const ds = new Map;

const ps = t => {
    let e = ds.get(t);
    if (null == e) {
        e = new s.AccessScopeExpression(t, 0);
        ds.set(t, e);
    }
    return e;
};

function ms(t, e, i, n) {
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
            f = R(a) ? o.parse(a, 8) : ps(a);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function xs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function gs(t) {
    return e.isObject(t) && Ce(t.constructor);
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

const vs = {
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

function ws(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const bs = M("IController");

const ys = M("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function ks(t) {
    t.dispose();
}

function Cs(t) {
    t.instance.created(this.St, this);
}

function As(t) {
    t.instance.hydrating(this.St, this);
}

function Rs(t) {
    t.instance.hydrated(this.St, this);
}

function Ss(t) {
    return t.instance.binding(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Bs(t) {
    return t.instance.bound(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Is(t) {
    return t.instance.attaching(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Ts(t) {
    return t.instance.attached(this.St, this["$initiator"], this["$flags"]);
}

function Ds(t) {
    return t.instance.detaching(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Es(t) {
    return t.instance.unbinding(this.St, this["$initiator"], this.parent, this["$flags"]);
}

let Ps;

let Ls;

let $s;

const Os = M("IAppRoot");

class AppRoot {
    constructor(e, s, i, n) {
        this.config = e;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.Vt = void 0;
        this.host = e.host;
        n.prepare(this);
        z(i, s.HTMLElement, z(i, s.Element, z(i, js, new t.InstanceProvider("ElementResolver", e.host))));
        this.Vt = t.onResolve(this.Nt("creating"), (() => {
            const s = e.component;
            const n = i.createChild();
            let r;
            if (Ce(s)) r = this.container.get(s); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this.Nt("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this.Nt("hydrated"), (() => {
                    l.hC();
                    this.Vt = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.Vt, (() => t.onResolve(this.Nt("activating"), (() => t.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.Nt("activated")))))));
    }
    deactivate() {
        return t.onResolve(this.Nt("deactivating"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.Nt("deactivated")))));
    }
    Nt(e) {
        return t.resolveAll(...this.container.getAll(Lt).reduce(((t, s) => {
            if (s.slot === e) t.push(s.run());
            return t;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function qs(t, e) {
    return t.$au?.[e] ?? null;
}

function Us(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const js = M("INode");

const _s = M("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Os, true)) return t.get(Os).host;
    return t.get($e).document;
}))));

const Ms = M("IRenderLocation");

const Fs = new WeakMap;

function Vs(t) {
    if (Fs.has(t)) return Fs.get(t);
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
        const e = Ae(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Vs(e.host);
    }
    return t.parentNode;
}

function Ns(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) Fs.set(s[t], e);
    } else Fs.set(t, e);
}

function Ws(t) {
    if (Hs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function Hs(t) {
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
            if ("AU-M" === r.nodeName) o[i] = Ws(r); else o[i] = r;
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
        if (Hs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const zs = M("IWindow", (t => t.callback((t => t.get($e).window))));

const Gs = M("ILocation", (t => t.callback((t => t.get(zs).location))));

const Xs = M("IHistory", (t => t.callback((t => t.get(zs).history))));

const Ks = {
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
        this.isBound = false;
        this.handler = null;
        this.boundFn = true;
        this.Wt = r;
    }
    callSource(t) {
        const e = this.scope.overrideContext;
        e.$event = t;
        let i = s.astEvaluate(this.ast, this.scope, this, null);
        delete e.$event;
        if (A(i)) i = i(t);
        if (true !== i && this.Wt.prevent) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        this.callSource(t);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        if (0 === this.Wt.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(_s), this.target, this.targetEvent, this, Ks[this.Wt.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        if (0 === this.Wt.strategy) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
    }
}

pt(Listener);

bt(Listener, (() => "callSource"));

mt(true, true)(Listener);

const Qs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = Qs) {
        this.Ht = t;
        this.zt = e;
        this.Wt = s;
        this.Gt = 0;
        this.Xt = new Map;
        this.Kt = new Map;
    }
    Qt() {
        if (1 === ++this.Gt) this.Ht.addEventListener(this.zt, this, this.Wt);
    }
    Yt() {
        if (0 === --this.Gt) this.Ht.removeEventListener(this.zt, this, this.Wt);
    }
    dispose() {
        if (this.Gt > 0) {
            this.Gt = 0;
            this.Ht.removeEventListener(this.zt, this, this.Wt);
        }
        this.Xt.clear();
        this.Kt.clear();
    }
    Zt(t) {
        const e = true === this.Wt.capture ? this.Xt : this.Kt;
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = g());
        return s;
    }
    handleEvent(t) {
        const e = true === this.Wt.capture ? this.Xt : this.Kt;
        const s = t.composedPath();
        if (true === this.Wt.capture) s.reverse();
        for (const i of s) {
            const s = e.get(i);
            if (void 0 === s) continue;
            const n = s[this.zt];
            if (void 0 === n) continue;
            if (A(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, s, i) {
        this.Jt = t;
        this.te = e;
        this.zt = s;
        t.Qt();
        e[s] = i;
    }
    dispose() {
        this.Jt.Yt();
        this.te[this.zt] = void 0;
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

const Ys = M("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.ee = g();
    }
    addEventListener(t, e, s, i, n) {
        var r;
        const o = (r = this.ee)[s] ?? (r[s] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, s, n));
        return new DelegateSubscription(l, l.Zt(e), s, i);
    }
    dispose() {
        for (const t in this.ee) {
            const e = this.ee[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Zs = M("IProjections");

const Js = M("IAuSlotsInfo");

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

const ti = M("Instruction");

function ei(t) {
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

const si = M("ITemplateCompiler");

const ii = M("IRenderer");

function ni(t) {
    return function e(s) {
        s.register = function(t) {
            F(ii, this).register(t);
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

function ri(t, e, s) {
    if (R(e)) return t.parse(e, s);
    return e;
}

function oi(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function li(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Ae(t);

      case "view":
        throw v(`AUR0750`);

      case "view-model":
        return Ae(t).viewModel;

      default:
        {
            const s = Zt(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = Ae(t, {
                name: e
            });
            if (void 0 === i) throw v(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let hi = class SetPropertyRenderer {
    render(t, e, s) {
        const i = oi(e);
        if (void 0 !== i.$observers?.[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

hi = r([ ni("re") ], hi);

let ci = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ os, $e ];
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
            n = a.find(Te, h);
            if (null == n) throw v(`AUR0752:${h}@${e["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? Ws(s) : null;
        const d = Pi(this.p, e, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        z(d, r, new t.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        Us(s, n.key, l);
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

ci = r([ ni("ra") ], ci);

let ai = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ os, $e ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(ee, s.res);
            if (null == n) throw v(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = Li(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Us(e, n.key, o);
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

ai = r([ ni("rb") ], ai);

let ui = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ os, $e ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(ee, s.res);
            if (null == n) throw v(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = this.r.getViewFactory(s.def, i);
        const o = Ws(e);
        const l = Li(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Us(o, n.key, h);
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

ui = r([ ni("rc") ], ui);

let fi = class LetElementRenderer {
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
        let c = 0;
        while (o > c) {
            l = i[c];
            h = ri(this.ep, l.from, 8);
            t.addBinding(new LetBinding(r, this.oL, h, l.to, n));
            ++c;
        }
    }
};

fi.inject = [ s.IExpressionParser, s.IObserverLocator ];

fi = r([ ni("rd") ], fi);

let di = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 8 | 4);
        t.addBinding(new CallBinding(t.container, this.oL, i, oi(e), s.to));
    }
};

di.inject = [ s.IExpressionParser, s.IObserverLocator ];

di = r([ ni("rh") ], di);

let pi = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 8);
        t.addBinding(new RefBinding(t.container, i, li(e, s.to)));
    }
};

pi.inject = [ s.IExpressionParser ];

pi = r([ ni("rj") ], pi);

let mi = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = ri(this.ep, s.from, 1);
        t.addBinding(new InterpolationBinding(t, i, this.oL, this.p.domWriteQueue, n, oi(e), s.to, 2));
    }
};

mi.inject = [ s.IExpressionParser, s.IObserverLocator, $e ];

mi = r([ ni("rf") ], mi);

let xi = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, oi(e), s.to, s.mode));
    }
};

xi.inject = [ s.IExpressionParser, s.IObserverLocator, $e ];

xi = r([ ni("rg") ], xi);

let gi = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 2);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, oi(e), s.to, 2));
    }
};

gi.inject = [ s.IExpressionParser, s.IObserverLocator, $e ];

gi = r([ ni("rk") ], gi);

let vi = class TextBindingRenderer {
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
        const l = ri(this.ep, s.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            d = c[u];
            t.addBinding(new ContentBinding(t, i, this.oL, this.p.domWriteQueue, this.p, d, r.insertBefore(o.createTextNode(""), n), s.strict));
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

vi.inject = [ s.IExpressionParser, s.IObserverLocator, $e ];

vi = r([ ni("ha") ], vi);

let wi = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.se = e;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 4);
        t.addBinding(new Listener(t.container, i, e, s.to, this.se, new ListenerOptions(s.preventDefault, s.strategy)));
    }
};

wi.inject = [ s.IExpressionParser, Ys ];

wi = r([ ni("hb") ], wi);

let bi = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

bi = r([ ni("he") ], bi);

let yi = class SetClassAttributeRenderer {
    render(t, e, s) {
        Si(e.classList, s.value);
    }
};

yi = r([ ni("hf") ], yi);

let ki = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

ki = r([ ni("hg") ], ki);

let Ci = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, 2));
    }
};

Ci.inject = [ s.IExpressionParser, s.IObserverLocator, $e ];

Ci = r([ ni("hd") ], Ci);

let Ai = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = ri(this.ep, s.from, 8);
        t.addBinding(new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, 2));
    }
};

Ai.inject = [ $e, s.IExpressionParser, s.IObserverLocator ];

Ai = r([ ni("hc") ], Ai);

let Ri = class SpreadRenderer {
    constructor(t, e) {
        this.ie = t;
        this.r = e;
    }
    static get inject() {
        return [ si, os ];
    }
    render(e, s, i) {
        const n = e.container;
        const r = n.get(ys);
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
            const r = Bi(n);
            const c = this.ie.compileSpread(n.controller.definition, n.instruction?.captures ?? t.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, Ae(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            e.addBinding(r);
        };
        h(0);
    }
};

Ri = r([ ni("hs") ], Ri);

class SpreadBinding {
    constructor(t, e) {
        this.ne = t;
        this.re = e;
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
        const e = this.scope = this.re.controller.scope.parent ?? void 0;
        if (null == e) throw v("Invalid spreading. Context scope is null/undefined");
        this.ne.forEach((t => t.$bind(e)));
    }
    $unbind() {
        this.ne.forEach((t => t.$unbind()));
        this.isBound = false;
    }
    addBinding(t) {
        this.ne.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw v("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
    limit() {
        throw v("not implemented");
    }
    useScope() {
        throw v("not implemented");
    }
}

function Si(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const Bi = t => new SpreadBinding([], t);

const Ii = "IController";

const Ti = "IInstruction";

const Di = "IRenderLocation";

const Ei = "IAuSlotsInfo";

function Pi(e, s, i, n, r, o) {
    const l = s.container.createChild();
    z(l, e.HTMLElement, z(l, e.Element, z(l, js, new t.InstanceProvider("ElementResolver", i))));
    z(l, bs, new t.InstanceProvider(Ii, s));
    z(l, ti, new t.InstanceProvider(Ti, n));
    z(l, Ms, null == r ? $i : new RenderLocationProvider(r));
    z(l, Ze, Oi);
    z(l, Js, null == o ? qi : new t.InstanceProvider(Ei, o));
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

function Li(e, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    z(c, e.HTMLElement, z(c, e.Element, z(c, js, new t.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    z(c, bs, new t.InstanceProvider(Ii, i));
    z(c, ti, new t.InstanceProvider(Ti, r));
    z(c, Ms, null == l ? $i : new t.InstanceProvider(Di, l));
    z(c, Ze, null == o ? Oi : new ViewFactoryProvider(o));
    z(c, Js, null == h ? qi : new t.InstanceProvider(Ei, h));
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

const $i = new RenderLocationProvider(null);

const Oi = new ViewFactoryProvider(null);

const qi = new t.InstanceProvider(Ei, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Ui(t) {
    return function(e) {
        return Fi.define(t, e);
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
        return new BindingCommandDefinition(s, t.firstDefined(Mi(s, "name"), i), t.mergeArrays(Mi(s, "aliases"), n.aliases, s.aliases), _i(i), t.firstDefined(Mi(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        F(s, e).register(t);
        V(s, e).register(t);
        X(i, Fi, s, t);
    }
}

const ji = d("binding-command");

const _i = t => `${ji}:${t}`;

const Mi = (t, e) => l(f(e), t);

const Fi = Object.freeze({
    name: ji,
    keyFrom: _i,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c(ji, s, s.Type);
        c(ji, s, s);
        p(e, ji);
        return s.Type;
    },
    getAnnotation: Mi
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

exports.OneTimeBindingCommand = r([ Ui("one-time") ], exports.OneTimeBindingCommand);

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

exports.ToViewBindingCommand = r([ Ui("to-view") ], exports.ToViewBindingCommand);

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

exports.FromViewBindingCommand = r([ Ui("from-view") ], exports.FromViewBindingCommand);

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

exports.TwoWayBindingCommand = r([ Ui("two-way") ], exports.TwoWayBindingCommand);

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

exports.DefaultBindingCommand = r([ Ui("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    get type() {
        return 0;
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new CallBindingInstruction(s.parse(e.attr.rawValue, 8 | 4), i);
    }
};

exports.CallBindingCommand = r([ Ui("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new IteratorBindingInstruction(s.parse(e.attr.rawValue, 2), i);
    }
};

exports.ForBindingCommand = r([ Ui("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, 0);
    }
};

exports.TriggerBindingCommand = r([ Ui("trigger") ], exports.TriggerBindingCommand);

exports.DelegateBindingCommand = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 2);
    }
};

exports.DelegateBindingCommand = r([ Ui("delegate") ], exports.DelegateBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 1);
    }
};

exports.CaptureBindingCommand = r([ Ui("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.AttrBindingCommand = r([ Ui("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.StyleBindingCommand = r([ Ui("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.ClassBindingCommand = r([ Ui("class") ], exports.ClassBindingCommand);

let Vi = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Vi = r([ Ui("ref") ], Vi);

let Ni = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Ni = r([ Ui("...$attrs") ], Ni);

const Wi = M("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const Hi = t => {
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
        this.oe = Object.assign(g(), {
            a: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: Hi("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: g(),
            altGlyphDef: Hi("id xml:base xml:lang xml:space"),
            altglyphdef: g(),
            altGlyphItem: Hi("id xml:base xml:lang xml:space"),
            altglyphitem: g(),
            animate: Hi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: Hi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: Hi("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: Hi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: Hi("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: Hi("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": Hi("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: Hi("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: Hi("class id style xml:base xml:lang xml:space"),
            ellipse: Hi("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: Hi("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: Hi("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: Hi("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: Hi("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: Hi("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: Hi("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: Hi("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: Hi("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: Hi("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: Hi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: Hi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: Hi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: Hi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: Hi("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: Hi("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: Hi("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: Hi("id xml:base xml:lang xml:space"),
            feMorphology: Hi("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: Hi("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: Hi("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: Hi("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: Hi("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: Hi("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: Hi("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: Hi("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: Hi("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": Hi("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": Hi("id string xml:base xml:lang xml:space"),
            "font-face-name": Hi("id name xml:base xml:lang xml:space"),
            "font-face-src": Hi("id xml:base xml:lang xml:space"),
            "font-face-uri": Hi("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: Hi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: Hi("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: Hi("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: g(),
            hkern: Hi("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: Hi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: Hi("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: Hi("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: Hi("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: Hi("id xml:base xml:lang xml:space"),
            "missing-glyph": Hi("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: Hi("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: Hi("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: Hi("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: Hi("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: Hi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: Hi("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: Hi("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: Hi("class id offset style xml:base xml:lang xml:space"),
            style: Hi("id media title type xml:base xml:lang xml:space"),
            svg: Hi("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: Hi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: Hi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: Hi("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: Hi("class id style xml:base xml:lang xml:space"),
            tref: Hi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: Hi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: Hi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: Hi("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: Hi("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.le = Hi("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.he = Hi("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.oe;
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
        return F(Wi, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.le[t.nodeName] && true === this.he[e] || true === this.oe[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ $e ];

const zi = M("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ce = g();
        this.ae = g();
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
        return [ Wi ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.ce)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw Xi(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.ae;
        for (const s in t) {
            if (void 0 !== e[s]) throw Xi(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return Gi(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.ce[t.nodeName]?.[e] ?? this.ae[e] ?? (y(t, e, this.svg) ? e : null);
    }
}

function Gi(t, e) {
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

function Xi(t, e) {
    return v(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const Ki = M("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Qi = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ue = t.document.createElement("template");
    }
    createTemplate(t) {
        if (R(t)) {
            let e = Qi[t];
            if (void 0 === e) {
                const s = this.ue;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.ue = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Qi[t] = e;
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

TemplateElementFactory.inject = [ $e ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return F(si, this).register(t);
    }
    compile(e, s, i) {
        const n = CustomElementDefinition.getOrCreate(e);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = Ji);
        const r = new CompilationContext(e, s, i, null, null, void 0);
        const o = R(n.template) || !e.enhance ? r.fe.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(_(an));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(ln)) throw v(`AUR0701`);
        this.de(h, r);
        this.pe(h, r);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || be(),
            dependencies: (e.dependencies ?? t.emptyArray).concat(r.deps ?? t.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.me(o, r) : t.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, s, i, n) {
        const r = new CompilationContext(e, i, Ji, null, null, void 0);
        const o = [];
        const l = r.xe(n.nodeName.toLowerCase());
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
            b = r.ge(f);
            if (null !== b && (1 & b.type) > 0) {
                en.node = n;
                en.attr = f;
                en.bindable = null;
                en.def = null;
                o.push(b.build(en, r.ep, r.m));
                continue;
            }
            d = r.ve(C);
            if (null !== d) {
                if (d.isTemplateController) throw v(`AUR0703:${C}`);
                x = BindablesInfo.from(d, true);
                k = false === d.noMultiBindings && null === b && Yi(A);
                if (k) m = this.we(n, A, d, r); else {
                    w = x.primary;
                    if (null === b) {
                        y = c.parse(A, 1);
                        m = [ null === y ? new SetPropertyInstruction(A, w.property) : new InterpolationInstruction(y, w.property) ];
                    } else {
                        en.node = n;
                        en.attr = f;
                        en.bindable = w;
                        en.def = d;
                        m = [ b.build(en, r.ep, r.m) ];
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
                        en.node = n;
                        en.attr = f;
                        en.bindable = g;
                        en.def = l;
                        o.push(new SpreadElementPropBindingInstruction(b.build(en, r.ep, r.m)));
                        continue;
                    }
                }
                en.node = n;
                en.attr = f;
                en.bindable = null;
                en.def = null;
                o.push(b.build(en, r.ep, r.m));
            }
        }
        Zi();
        if (null != p) return p.concat(o);
        return o;
    }
    me(e, s) {
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
            u = s.be.parse(c, a);
            y = u.target;
            k = u.rawValue;
            if (sn[y]) throw v(`AUR0702:${c}`);
            g = s.ge(u);
            if (null !== g && (1 & g.type) > 0) {
                en.node = e;
                en.attr = u;
                en.bindable = null;
                en.def = null;
                i.push(g.build(en, s.ep, s.m));
                continue;
            }
            f = s.ve(y);
            if (null !== f) {
                if (f.isTemplateController) throw v(`AUR0703:${y}`);
                m = BindablesInfo.from(f, true);
                b = false === f.noMultiBindings && null === g && Yi(k);
                if (b) p = this.we(e, k, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        w = r.parse(k, 1);
                        p = [ null === w ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(w, x.property) ];
                    } else {
                        en.node = e;
                        en.attr = u;
                        en.bindable = x;
                        en.def = f;
                        p = [ g.build(en, s.ep, s.m) ];
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
                en.node = e;
                en.attr = u;
                en.bindable = null;
                en.def = null;
                i.push(g.build(en, s.ep, s.m));
            }
        }
        Zi();
        if (null != d) return d.concat(i);
        return i;
    }
    pe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.ye(t, e);

              default:
                return this.ke(t, e);
            }

          case 3:
            return this.Ce(t, e);

          case 11:
            {
                let s = t.firstChild;
                while (null !== s) s = this.pe(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    ye(e, i) {
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
            u = i.be.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.ge(u);
            if (null !== p) {
                if ("bind" === u.command) o.push(new LetBindingInstruction(l.parse(x, 8), t.camelCase(m))); else throw v(`AUR0704:${u.command}`);
                continue;
            }
            g = l.parse(x, 1);
            o.push(new LetBindingInstruction(null === g ? new s.PrimitiveLiteralExpression(x) : g, t.camelCase(m)));
        }
        i.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.Ae(e).nextSibling;
    }
    ke(e, s) {
        var i, n, r, o;
        const l = e.nextSibling;
        const h = (e.getAttribute("as-element") ?? e.nodeName).toLowerCase();
        const c = s.xe(h);
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
        let L;
        let $;
        let O;
        let q;
        let U = null;
        let j;
        let _;
        let M;
        let F;
        let V = true;
        let N = false;
        let W = false;
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
            R = s.be.parse(C, A);
            U = s.ge(R);
            M = R.target;
            F = R.rawValue;
            if (f && (!d || d && f(M))) {
                if (null != U && 1 & U.type) {
                    x();
                    p.push(R);
                    continue;
                }
                W = "au-slot" !== M && "slot" !== M;
                if (W) {
                    j = BindablesInfo.from(c, false);
                    if (null == j.attrs[M] && !s.ve(M)?.isTemplateController) {
                        x();
                        p.push(R);
                        continue;
                    }
                }
            }
            if (null !== U && 1 & U.type) {
                en.node = e;
                en.attr = R;
                en.bindable = null;
                en.def = null;
                (S ?? (S = [])).push(U.build(en, s.ep, s.m));
                x();
                continue;
            }
            I = s.ve(M);
            if (null !== I) {
                j = BindablesInfo.from(I, true);
                T = false === I.noMultiBindings && null === U && Yi(F);
                if (T) P = this.we(e, F, I, s); else {
                    _ = j.primary;
                    if (null === U) {
                        O = m.parse(F, 1);
                        P = [ null === O ? new SetPropertyInstruction(F, _.property) : new InterpolationInstruction(O, _.property) ];
                    } else {
                        en.node = e;
                        en.attr = R;
                        en.bindable = _;
                        en.def = I;
                        P = [ U.build(en, s.ep, s.m) ];
                    }
                }
                x();
                if (I.isTemplateController) (L ?? (L = [])).push(new HydrateTemplateController(tn, this.resolveResources ? I : I.name, void 0, P)); else (E ?? (E = [])).push(new HydrateAttributeInstruction(this.resolveResources ? I : I.name, null != I.aliases && I.aliases.includes(M) ? M : void 0, P));
                continue;
            }
            if (null === U) {
                if (a) {
                    j = BindablesInfo.from(c, false);
                    D = j.attrs[M];
                    if (void 0 !== D) {
                        O = m.parse(F, 1);
                        (B ?? (B = [])).push(null == O ? new SetPropertyInstruction(F, D.property) : new InterpolationInstruction(O, D.property));
                        x();
                        continue;
                    }
                }
                O = m.parse(F, 1);
                if (null != O) {
                    x();
                    (S ?? (S = [])).push(new InterpolationInstruction(O, s.m.map(e, M) ?? t.camelCase(M)));
                }
                continue;
            }
            x();
            if (a) {
                j = BindablesInfo.from(c, false);
                D = j.attrs[M];
                if (void 0 !== D) {
                    en.node = e;
                    en.attr = R;
                    en.bindable = D;
                    en.def = c;
                    (B ?? (B = [])).push(U.build(en, s.ep, s.m));
                    continue;
                }
            }
            en.node = e;
            en.attr = R;
            en.bindable = null;
            en.def = null;
            (S ?? (S = [])).push(U.build(en, s.ep, s.m));
        }
        Zi();
        if (this.Re(e) && null != S && S.length > 1) this.Se(e, S);
        if (a) {
            q = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, B ?? t.emptyArray, null, N, p);
            if (h === xn) {
                const t = e.getAttribute("name") || mn;
                const i = s.h("template");
                const n = s.Be();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else i.content.appendChild(r);
                    r = e.firstChild;
                }
                this.pe(i.content, n);
                q.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: be(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.Ie(e, s);
            }
        }
        if (null != S || null != q || null != E) {
            w = t.emptyArray.concat(q ?? t.emptyArray, E ?? t.emptyArray, S ?? t.emptyArray);
            this.Ae(e);
        }
        let H;
        if (null != L) {
            b = L.length - 1;
            y = b;
            $ = L[y];
            let t;
            this.Ie(e, s);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = s.h("template");
                t.content.appendChild(e);
            }
            const r = t;
            const o = s.Be(null == w ? [] : [ w ]);
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
                f = 1 === R.nodeType ? R.getAttribute(xn) : null;
                if (null !== f) R.removeAttribute(xn);
                if (a) {
                    l = R.nextSibling;
                    if (!u) {
                        S = 3 === R.nodeType && "" === R.textContent.trim();
                        if (!S) ((i = p ?? (p = {}))[n = f || mn] ?? (i[n] = [])).push(R);
                        e.removeChild(R);
                    }
                    R = l;
                } else {
                    if (null !== f) {
                        f = f || mn;
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
                    k = s.Be();
                    this.pe(t.content, k);
                    d[f] = CustomElementDefinition.create({
                        name: be(),
                        template: t,
                        instructions: k.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (a && (N || c.containerless)) this.Ie(e, s);
            H = !a || !c.containerless && !N && false !== V;
            if (H) if ("TEMPLATE" === e.nodeName) this.pe(e.content, o); else {
                R = e.firstChild;
                while (null !== R) R = this.pe(R, o);
            }
            $.def = CustomElementDefinition.create({
                name: be(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: s.root.def.isStrictBinding
            });
            while (y-- > 0) {
                $ = L[y];
                t = s.h("template");
                g = s.h("au-m");
                g.classList.add("au");
                t.content.appendChild(g);
                $.def = CustomElementDefinition.create({
                    name: be(),
                    template: t,
                    needsCompile: false,
                    instructions: [ [ L[y + 1] ] ],
                    isStrictBinding: s.root.def.isStrictBinding
                });
            }
            s.rows.push([ $ ]);
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
                n = 1 === t.nodeType ? t.getAttribute(xn) : null;
                if (null !== n) t.removeAttribute(xn);
                if (a) {
                    i = t.nextSibling;
                    if (!u) {
                        g = 3 === t.nodeType && "" === t.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || mn] ?? (r[o] = [])).push(t);
                        e.removeChild(t);
                    }
                    t = i;
                } else {
                    if (null !== n) {
                        n = n || mn;
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
                    x = s.Be();
                    this.pe(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: be(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                q.projections = l;
            }
            if (a && (N || c.containerless)) this.Ie(e, s);
            H = !a || !c.containerless && !N && false !== V;
            if (H && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.pe(t, s);
            }
        }
        return l;
    }
    Ce(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.Ae(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    we(t, e, s, i) {
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
                f = i.be.parse(l, h);
                d = i.ge(f);
                p = n.attrs[f.target];
                if (null == p) throw v(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    en.node = t;
                    en.attr = f;
                    en.bindable = p;
                    en.def = s;
                    o.push(d.build(en, i.ep, i.m));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        Zi();
        return o;
    }
    de(e, s) {
        const i = e;
        const n = t.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw v(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const e of n) {
            if (e.parentNode !== i) throw v(`AUR0709`);
            const n = hn(e, o);
            const r = class LocalTemplate {};
            const h = e.content;
            const c = t.toArray(h.querySelectorAll("bindable"));
            const a = L.for(r);
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
                    mode: cn(t)
                });
                const i = t.getAttributeNames().filter((t => !on.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Te(ke({
                name: n,
                template: e
            }, r));
            i.removeChild(e);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) Se(l[h]).dependencies.push(...s.def.dependencies ?? t.emptyArray, ...s.deps ?? t.emptyArray);
    }
    Re(t) {
        return "INPUT" === t.nodeName && 1 === nn[t.type];
    }
    Se(t, e) {
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
    Ae(t) {
        t.classList.add("au");
        return t;
    }
    Ie(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.Ae(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(e, i, n, r, o, l) {
        this.hasSlot = false;
        this.De = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = e;
        this.ci = n;
        this.parent = r;
        this.fe = h ? r.fe : i.get(Ki);
        this.be = h ? r.be : i.get(J);
        this.ep = h ? r.ep : i.get(s.IExpressionParser);
        this.m = h ? r.m : i.get(zi);
        this.Ee = h ? r.Ee : i.get(t.ILogger);
        this.p = h ? r.p : i.get($e);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
    }
    Te(t) {
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
        return this.c.find(Te, t);
    }
    ve(t) {
        return this.c.find(ee, t);
    }
    Be(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ge(t) {
        if (this.root !== this) return this.root.ge(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.De[e];
        if (void 0 === s) {
            s = this.c.create(Fi, e);
            if (null === s) throw v(`AUR0713:${e}`);
            this.De[e] = s;
        }
        return s;
    }
}

function Yi(t) {
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

function Zi() {
    en.node = en.attr = en.bindable = en.def = null;
}

const Ji = {
    projections: null
};

const tn = {
    name: "unnamed"
};

const en = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const sn = Object.assign(g(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const nn = {
    checkbox: 1,
    radio: 1
};

const rn = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = rn.get(t);
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
            rn.set(t, s = new BindablesInfo(n, i, c));
        }
        return s;
    }
}

const on = Object.freeze([ "property", "attribute", "mode" ]);

const ln = "as-custom-element";

function hn(t, e) {
    const s = t.getAttribute(ln);
    if (null === s || "" === s) throw v(`AUR0715`);
    if (e.has(s)) throw v(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(ln);
    }
    return s;
}

function cn(t) {
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

const an = M("ITemplateCompilerHooks");

const un = new WeakMap;

const fn = d("compiler-hooks");

const dn = Object.freeze({
    name: fn,
    define(t) {
        let e = un.get(t);
        if (void 0 === e) {
            un.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(fn, e, t);
            p(t, fn);
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
        t.register(F(an, this.Type));
    }
}

const pn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return dn.define(t);
    }
};

const mn = "default";

const xn = "au-slot";

const gn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        gn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = gn.get(e);
        gn.delete(e);
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

const vn = new WeakMap;

const wn = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, s) {
        s = Number(s);
        const i = {
            type: "debounce",
            delay: s > 0 ? s : wn,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(i);
        if (null == n) ; else vn.set(e, n);
    }
    unbind(t, e) {
        vn.get(e)?.dispose();
        vn.delete(e);
    }
}

DebounceBindingBehavior.inject = [ t.IPlatform ];

ot("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.te = new Map;
        this.Pe = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw v(`AUR0817`);
        if (0 === s.length) throw v(`AUR0818`);
        this.te.set(e, s);
        let i;
        for (i of s) this.Pe.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.te.get(e);
        this.te.delete(e);
        let i;
        for (i of s) this.Pe.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ s.ISignaler ];

ot("signal")(SignalBindingBehavior);

const bn = new WeakMap;

const yn = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.Le = t.performanceNow;
        this.Y = t.taskQueue;
    }
    bind(t, e, s) {
        s = Number(s);
        const i = {
            type: "throttle",
            delay: s > 0 ? s : yn,
            now: this.Le,
            queue: this.Y
        };
        const n = e.limit?.(i);
        if (null == n) ; else bn.set(e, n);
    }
    unbind(t, e) {
        bn.get(e)?.dispose();
        bn.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ t.IPlatform ];

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

const kn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = kn;
    }
    unbind(t, e) {
        return;
    }
}

ot("attr")(AttrBindingBehavior);

function Cn(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw v(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Cn;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ot("self")(SelfBindingBehavior);

const An = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return An[t] ?? (An[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

function Rn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.$e = void 0;
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
        const s = w.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Rn;
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
        const n = void 0 !== e.matcher ? e.matcher : Rn;
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
        this.qe();
    }
    stop() {
        this.handler.dispose();
        this.$e?.unsubscribe(this);
        this.$e = void 0;
        this.Oe?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    X() {
        Sn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Sn);
    }
    qe() {
        const t = this.o;
        (this.Oe ?? (this.Oe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.$e?.unsubscribe(this);
        this.$e = void 0;
        if ("checkbox" === t.type) (this.$e = jn(this.v, this.oL))?.subscribe(this);
    }
}

s.subscriberCollection(CheckedObserver);

let Sn;

const Bn = {
    childList: true,
    subtree: true,
    characterData: true
};

function In(t, e) {
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
        return this.iO ? this.v : this.o.multiple ? Tn(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.N = t !== this.ov;
        this.Me(t instanceof Array ? t : null);
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
        const i = e.matcher ?? In;
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
            const o = t.matcher || In;
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
    Fe() {
        (this._e = new this.o.ownerDocument.defaultView.MutationObserver(this.Ve.bind(this))).observe(this.o, Bn);
        this.Me(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ne() {
        this._e.disconnect();
        this.je?.unsubscribe(this);
        this._e = this.je = void 0;
        this.iO = false;
    }
    Me(t) {
        this.je?.unsubscribe(this);
        this.je = void 0;
        if (null != t) {
            if (!this.o.multiple) throw v(`AUR0654`);
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
            this.Fe();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Ne();
        }
    }
    X() {
        Dn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Dn);
    }
}

s.subscriberCollection(SelectValueObserver);

function Tn(t) {
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

let Dn;

const En = "--";

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
    We(t) {
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
    He(e) {
        let s;
        let i;
        const n = [];
        for (i in e) {
            s = e[i];
            if (null == s) continue;
            if (R(s)) {
                if (i.startsWith(En)) {
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
        if (R(e)) return this.We(e);
        if (e instanceof Array) return this.Ge(e);
        if (e instanceof Object) return this.He(e);
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
        Pn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Pn);
    }
}

s.subscriberCollection(ValueAttributeObserver);

let Pn;

const Ln = "http://www.w3.org/1999/xlink";

const $n = "http://www.w3.org/XML/1998/namespace";

const On = "http://www.w3.org/2000/xmlns/";

const qn = Object.assign(g(), {
    "xlink:actuate": [ "actuate", Ln ],
    "xlink:arcrole": [ "arcrole", Ln ],
    "xlink:href": [ "href", Ln ],
    "xlink:role": [ "role", Ln ],
    "xlink:show": [ "show", Ln ],
    "xlink:title": [ "title", Ln ],
    "xlink:type": [ "type", Ln ],
    "xml:lang": [ "lang", $n ],
    "xml:space": [ "space", $n ],
    xmlns: [ "xmlns", On ],
    "xmlns:xlink": [ "xlink", On ]
});

const Un = new s.PropertyAccessor;

Un.type = 2 | 4;

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
        V(s.INodeObserverLocator, NodeObserverLocator).register(t);
        F(s.INodeObserverLocator, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.Xe;
        let n;
        if (R(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = new NodeObserverConfig(s); else _n(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else _n(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else _n("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else _n("*", t);
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
            return kn;

          default:
            {
                const t = qn[s];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (y(e, s, this.svgAnalyzer)) return kn;
                return Un;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (R(t)) {
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
        const r = qn[e];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (y(t, e, this.svgAnalyzer)) return kn;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw v(`AUR0652:${String(e)}`);
        } else return new s.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, $e, s.IDirtyChecker, Wi ];

function jn(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function _n(t, e) {
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

Focus.inject = [ js, $e ];

r([ D({
    mode: 6
}) ], Focus.prototype, "value", void 0);

zt("focus")(Focus);

let Mn = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.ss = false;
        this.rs = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.rs = null;
            if (Boolean(this.value) !== this.os) if (this.os === this.ls) {
                this.os = !this.ls;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.os = this.ls;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.os = this.ls = "hide" !== s.alias;
    }
    binding() {
        this.ss = true;
        this.update();
    }
    detaching() {
        this.ss = false;
        this.rs?.cancel();
        this.rs = null;
    }
    valueChanged() {
        if (this.ss && null === this.rs) this.rs = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ D ], Mn.prototype, "value", void 0);

Mn = r([ o(0, js), o(1, $e), o(2, ti) ], Mn);

G("hide")(Mn);

zt("show")(Mn);

class Portal {
    constructor(t, e, s) {
        this.strict = false;
        this.p = s;
        this.cs = s.document.createElement("div");
        this.view = t.create();
        Ns(this.view.nodes, e);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.cs = this.us();
        this.view.setHost(i);
        return this.ds(t, i, s);
    }
    detaching(t, e, s) {
        return this.ps(t, this.cs, s);
    }
    targetChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        const s = this.cs;
        const i = this.cs = this.us();
        if (s === i) return;
        this.view.setHost(i);
        const n = t.onResolve(this.ps(null, i, e.flags), (() => this.ds(null, i, e.flags)));
        if (k(n)) n.catch((t => {
            throw t;
        }));
    }
    ds(e, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return t.onResolve(n?.call(r, s, o), (() => this.xs(e, s, i)));
    }
    xs(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.appendTo(s); else return t.onResolve(r.activate(e ?? r, n, i, n.scope), (() => this.gs(s)));
        return this.gs(s);
    }
    gs(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    ps(e, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return t.onResolve(n?.call(r, s, o), (() => this.vs(e, s, i)));
    }
    vs(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, i), (() => this.ws(s)));
        return this.ws(s);
    }
    ws(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    us() {
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

Portal.inject = [ Ze, Ms, $e ];

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

Gt("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.bs = false;
        this.ys = 0;
        this.ks = t;
        this.l = e;
    }
    attaching(e, s, i) {
        let n;
        const r = this.$controller;
        const o = this.ys++;
        const l = () => !this.bs && this.ys === o + 1;
        return t.onResolve(this.pending, (() => {
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ks.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == n) return;
            n.setLocation(this.l);
            this.pending = t.onResolve(n.activate(e, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(e, s, i) {
        this.bs = true;
        return t.onResolve(this.pending, (() => {
            this.bs = false;
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
        const o = this.ys++;
        const l = () => !this.bs && this.ys === o + 1;
        let h;
        return t.onResolve(this.pending, (() => this.pending = t.onResolve(n?.deactivate(n, r, i), (() => {
            if (!l()) return;
            if (e) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ks.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
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

If.inject = [ Ze, Ms ];

r([ D ], If.prototype, "value", void 0);

r([ D({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Gt("if")(If);

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

Else.inject = [ Ze ];

Gt({
    name: "else"
})(Else);

function Fn(t) {
    t.dispose();
}

const Vn = [ 18, 17 ];

class Repeat {
    constructor(t, e, s) {
        this.views = [];
        this.key = void 0;
        this.Cs = void 0;
        this.As = false;
        this.Rs = false;
        this.Ss = null;
        this.Bs = void 0;
        this.Is = false;
        this.l = t;
        this.Ts = e;
        this.f = s;
    }
    binding(t, e, i) {
        const n = this.Ts.bindings;
        const r = n.length;
        let o;
        let l;
        let h = 0;
        for (;r > h; ++h) {
            o = n[h];
            if (o.target === this && "items" === o.targetProperty) {
                l = this.forOf = o.ast;
                this.Ds = o;
                let t = l.iterable;
                while (null != t && Vn.includes(t.$kind)) {
                    t = t.expression;
                    this.As = true;
                }
                this.Ss = t;
                break;
            }
        }
        this.Es();
        const c = l.declaration;
        if (!(this.Is = 24 === c.$kind || 25 === c.$kind)) this.local = s.astEvaluate(c, this.$controller.scope, o, null);
    }
    attaching(t, e, s) {
        this.Ps();
        return this.Ls(t);
    }
    detaching(t, e, s) {
        this.Es();
        return this.$s(t);
    }
    itemsChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        this.Es();
        this.Ps();
        const s = t.onResolve(this.$s(null), (() => this.Ls(null)));
        if (k(s)) s.catch(B);
    }
    handleCollectionChange(e, i) {
        const n = this.$controller;
        if (!n.isActive) return;
        if (this.As) {
            if (this.Rs) return;
            this.Rs = true;
            this.items = s.astEvaluate(this.forOf.iterable, n.scope, this.Ds, null);
            this.Rs = false;
            return;
        }
        this.Ps();
        if (void 0 === i) {
            const e = t.onResolve(this.$s(null), (() => this.Ls(null)));
            if (k(e)) e.catch(B);
        } else {
            const e = this.views.length;
            const n = s.applyMutationsToIndices(i);
            if (n.deletedIndices.length > 0) {
                const s = t.onResolve(this.Os(n), (() => this.qs(e, n)));
                if (k(s)) s.catch(B);
            } else this.qs(e, n);
        }
    }
    Es() {
        const t = this.$controller.scope;
        let e = this.Us;
        let i = this.As;
        let n;
        if (i) {
            e = this.Us = s.astEvaluate(this.Ss, t, this.Ds, null) ?? null;
            i = this.As = !Object.is(this.items, e);
        }
        const r = this.Cs;
        if (this.$controller.isActive) {
            n = this.Cs = s.getCollectionObserver(i ? e : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.Cs = void 0;
        }
    }
    Ps() {
        const t = this.items;
        if (C(t)) {
            this.Bs = t;
            return;
        }
        const e = [];
        Yn(t, ((t, s) => {
            e[s] = t;
        }));
        this.Bs = e;
    }
    Ls(t) {
        let e;
        let i;
        let n;
        let r;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = Qn(a);
        const p = this.views = Array(d);
        Yn(a, ((a, m) => {
            n = p[m] = l.create().setLocation(c);
            n.nodes.unlink();
            if (this.Is) s.astAssign(f.declaration, r = s.Scope.fromParent(u, new s.BindingContext), this.Ds, a); else r = s.Scope.fromParent(u, new s.BindingContext(h, a));
            Xn(r.overrideContext, m, d);
            i = n.activate(t ?? n, o, 0, r);
            if (k(i)) (e ?? (e = [])).push(i);
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
            if (k(s)) (e ?? (e = [])).push(s);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Os(t) {
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
    qs(t, e) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, Bs: u, l: f, views: d} = this;
        const p = e.length;
        for (;p > l; ++l) if (-2 === e[l]) {
            r = c.create();
            d.splice(l, 0, r);
        }
        if (d.length !== p) throw Gn(d.length, p);
        const m = h.scope;
        const x = e.length;
        s.synchronizeIndices(d, e);
        const g = zn(e);
        const v = g.length;
        let w;
        let b = v - 1;
        l = x - 1;
        for (;l >= 0; --l) {
            r = d[l];
            w = d[l + 1];
            r.nodes.link(w?.nodes ?? f);
            if (-2 === e[l]) {
                if (this.Is) s.astAssign(this.forOf.declaration, o = s.Scope.fromParent(m, new s.BindingContext), this.Ds, u[l]); else o = s.Scope.fromParent(m, new s.BindingContext(a, u[l]));
                Xn(o.overrideContext, l, x);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (k(n)) (i ?? (i = [])).push(n);
            } else if (b < 0 || 1 === v || l !== g[b]) {
                Xn(r.scope.overrideContext, l, x);
                r.nodes.insertBefore(r.location);
            } else {
                if (t !== x) Xn(r.scope.overrideContext, l, x);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(Fn);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Ms, bs, Ze ];

r([ D ], Repeat.prototype, "items", void 0);

Gt("repeat")(Repeat);

let Nn = 16;

let Wn = new Int32Array(Nn);

let Hn = new Int32Array(Nn);

function zn(t) {
    const e = t.length;
    if (e > Nn) {
        Nn = e;
        Wn = new Int32Array(e);
        Hn = new Int32Array(e);
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
            o = Wn[s];
            n = t[o];
            if (-2 !== n && n < i) {
                Hn[r] = o;
                Wn[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[Wn[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[Wn[l]];
            if (i < n || -2 === n) {
                if (l > 0) Hn[r] = Wn[l - 1];
                Wn[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = Wn[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = Hn[i];
    }
    while (r-- > 0) Wn[r] = 0;
    return a;
}

const Gn = (t, e) => v(`AUR0814:${t}!=${e}`);

const Xn = (t, e, s) => {
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

const Kn = Object.prototype.toString;

const Qn = t => {
    switch (Kn.call(t)) {
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
        throw v(`Cannot count ${Kn.call(t)}`);
    }
};

const Yn = (t, e) => {
    switch (Kn.call(t)) {
      case "[object Array]":
        return Zn(t, e);

      case "[object Map]":
        return Jn(t, e);

      case "[object Set]":
        return tr(t, e);

      case "[object Number]":
        return er(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw v(`Cannot iterate over ${Kn.call(t)}`);
    }
};

const Zn = (t, e) => {
    const s = t.length;
    let i = 0;
    for (;i < s; ++i) e(t[i], i, t);
};

const Jn = (t, e) => {
    let s = -0;
    let i;
    for (i of t.entries()) e(i, s++, t);
};

const tr = (t, e) => {
    let s = 0;
    let i;
    for (i of t.keys()) e(i, s++, t);
};

const er = (t, e) => {
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

With.inject = [ Ze, Ms ];

r([ D ], With.prototype, "value", void 0);

Gt("with")(With);

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
        this.queue((() => this.js(t)));
    }
    js(e) {
        const s = e.isMatch(this.value);
        const i = this.activeCases;
        const n = i.length;
        if (!s) {
            if (n > 0 && i[0].id === e.id) return this._s(null);
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
        return t.onResolve(this._s(null, r), (() => {
            this.activeCases = r;
            return this.Ms(null);
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
        return t.onResolve(this.activeCases.length > 0 ? this._s(e, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Ms(e);
        }));
    }
    Ms(e) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(e, 0, r);
        return t.resolveAll(...i.map((t => t.activate(e, 0, r))));
    }
    _s(e, s = []) {
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

exports.Switch = r([ Gt("switch"), o(0, Ze), o(1, Ms) ], exports.Switch);

let sr = 0;

exports.Case = class Case {
    constructor(t, e, s, i) {
        this.f = t;
        this.Fs = e;
        this.l = s;
        this.id = ++sr;
        this.fallThrough = false;
        this.view = void 0;
        this.Vs = i.config.level <= 1;
        this.Ee = i.scopeTo(`${this.constructor.name}-#${this.id}`);
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
        this.Ee.debug("isMatch()");
        const e = this.value;
        if (C(e)) {
            if (void 0 === this.Cs) this.Cs = this.Ns(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (C(t)) {
            this.Cs?.unsubscribe(this);
            this.Cs = this.Ns(t);
        } else if (void 0 !== this.Cs) this.Cs.unsubscribe(this);
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
        this.Cs?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ns(t) {
        const e = this.Fs.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ Ze, s.IObserverLocator, Ms, t.ILogger ];

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

exports.Case = r([ Gt("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw v(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ Gt("default-case") ], exports.DefaultCase);

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

exports.PromiseTemplateController = r([ Gt("promise"), o(0, Ze), o(1, Ms), o(2, $e), o(3, t.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        ir(t).pending = this;
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

exports.PendingTemplateController = r([ Gt("pending"), o(0, Ze), o(1, Ms) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        ir(t).fulfilled = this;
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

exports.FulfilledTemplateController = r([ Gt("then"), o(0, Ze), o(1, Ms) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        ir(t).rejected = this;
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

exports.RejectedTemplateController = r([ Gt("catch"), o(0, Ze), o(1, Ms) ], exports.RejectedTemplateController);

function ir(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw v(`AUR0813`);
}

let nr = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

nr = r([ tt({
    pattern: "promise.resolve",
    symbols: ""
}) ], nr);

let rr = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

rr = r([ tt({
    pattern: "then",
    symbols: ""
}) ], rr);

let or = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

or = r([ tt({
    pattern: "catch",
    symbols: ""
}) ], or);

function lr(t, e, s, i) {
    if (R(e)) return hr(t, e, s, i);
    if (Ce(e)) return cr(t, e, s, i);
    throw v(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Ws = s;
        this.Hs = void 0;
    }
    get definition() {
        if (void 0 === this.Hs) this.Hs = CustomElementDefinition.create({
            name: be(),
            template: this.node,
            needsCompile: R(this.node),
            instructions: this.instructions,
            dependencies: this.Ws
        });
        return this.Hs;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(os).getViewFactory(this.definition, t.createChild().register(...this.Ws));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Ws);
    }
}

function hr(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (ei(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) ar(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function cr(t, e, s, i) {
    const n = Se(e);
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
        if (ei(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) ar(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function ar(t, e, s, i, n) {
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

function ur(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, e, s, i) {
        this.p = t;
        this.zs = e;
        this.Gs = s;
        this.r = i;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Xs = void 0;
        this.Ks = e.props.reduce(ur, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.Xs !== i) {
            this.Xs = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.vs(this.view, t, s);
    }
    componentChanged(e, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Xs === e) return;
        this.Xs = e;
        this.composing = true;
        i |= n.flags;
        const r = t.onResolve(this.vs(this.view, null, i), (() => this.compose(void 0, e, null, i)));
        if (k(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(e, s, i, n) {
        return t.onResolve(void 0 === e ? t.onResolve(s, (t => this.Qs(t, n))) : e, (t => this.xs(this.view = t, i, n)));
    }
    vs(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    xs(e, s, i) {
        const {$controller: n} = this;
        return t.onResolve(e?.activate(s ?? e, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Qs(t, e) {
        const s = this.Ys(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Ys(t, e) {
        if (null == t) return;
        const s = this.Gs.controller.container;
        if ("object" === typeof t) {
            if (fr(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (R(t)) {
            const e = s.find(Te, t);
            if (null == e) throw v(`AUR0809:${t}`);
            t = e.Type;
        }
        return lr(this.p, t, this.Ks, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ $e, ti, ys, os ];

r([ D ], AuRender.prototype, "component", void 0);

r([ D({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

oe({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function fr(t) {
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
        this.Zs = void 0;
        this.r = t.get(os);
        this.zs = r;
        this.Js = o;
    }
    static get inject() {
        return [ t.IContainer, bs, js, Ms, $e, ti, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.ti;
    }
    get composition() {
        return this.Zs;
    }
    attaching(e, s, i) {
        return this.ti = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this.Js.isCurrent(t)) this.ti = void 0;
        }));
    }
    detaching(e) {
        const s = this.Zs;
        const i = this.ti;
        this.Js.invalidate();
        this.Zs = this.ti = void 0;
        return t.onResolve(i, (() => s?.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.Zs) {
            this.Zs.update(this.model);
            return;
        }
        this.ti = t.onResolve(this.ti, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this.Js.isCurrent(t)) this.ti = void 0;
        }))));
    }
    queue(e, s) {
        const i = this.Js;
        const n = this.Zs;
        return t.onResolve(i.create(e), (e => {
            if (i.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (i.isCurrent(e)) return t.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(e)) {
                        this.Zs = r;
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
                    projections: this.zs.projections
                }, d);
                return new CompositionController(s, (t => s.activate(t ?? s, u, 1, u.scope.parent)), (e => t.onResolve(s.deactivate(e ?? s, u, 2), r)), (t => i.activate?.(t)), e);
            } else {
                const t = CustomElementDefinition.create({
                    name: Te.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? s.Scope.fromParent(this.parent.scope, i) : s.Scope.create(i);
                if (Hs(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), e);
            }
        };
        if ("activate" in i) return t.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(e, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = Hs(i);
        z(e, n.Element, z(e, js, new t.InstanceProvider("ElementResolver", r ? null : i)));
        z(e, Ms, new t.InstanceProvider("IRenderLocation", r ? i : null));
        const o = e.invoke(s);
        z(e, s, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = A(t) ? t : t?.constructor;
        return Te.isType(e) ? Te.getDefinition(e) : null;
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

oe("au-compose")(AuCompose);

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
        this.ei = null;
        this.si = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.ii = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.ii = true;
        }
        this.Gs = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Ms, ti, ys, os ];
    }
    binding(t, e, i) {
        this.ei = this.$controller.scope.parent;
        let n;
        if (this.ii) {
            n = this.Gs.controller.scope.parent;
            (this.si = s.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.ei.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.ii ? this.si : this.ei);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.ii && null != this.si) this.si.overrideContext.$host = t;
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

oe({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const dr = M("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw v('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.ni = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.ni.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, dr) ], exports.SanitizeValueConverter);

at("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.ri = t;
    }
    toView(t, e) {
        return this.ri.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, rs) ], exports.ViewValueConverter);

at("view")(exports.ViewValueConverter);

const pr = DebounceBindingBehavior;

const mr = OneTimeBindingBehavior;

const xr = ToViewBindingBehavior;

const gr = FromViewBindingBehavior;

const vr = SignalBindingBehavior;

const wr = ThrottleBindingBehavior;

const br = TwoWayBindingBehavior;

const yr = TemplateCompiler;

const kr = NodeObserverLocator;

const Cr = [ yr, kr ];

const Ar = SVGAnalyzer;

const Rr = exports.AtPrefixedTriggerAttributePattern;

const Sr = exports.ColonPrefixedBindAttributePattern;

const Br = exports.RefAttributePattern;

const Ir = exports.DotSeparatedAttributePattern;

const Tr = rt;

const Dr = [ Br, Ir, Tr ];

const Er = [ Rr, Sr ];

const Pr = exports.CallBindingCommand;

const Lr = exports.DefaultBindingCommand;

const $r = exports.ForBindingCommand;

const Or = exports.FromViewBindingCommand;

const qr = exports.OneTimeBindingCommand;

const Ur = exports.ToViewBindingCommand;

const jr = exports.TwoWayBindingCommand;

const _r = Vi;

const Mr = exports.TriggerBindingCommand;

const Fr = exports.DelegateBindingCommand;

const Vr = exports.CaptureBindingCommand;

const Nr = exports.AttrBindingCommand;

const Wr = exports.ClassBindingCommand;

const Hr = exports.StyleBindingCommand;

const zr = Ni;

const Gr = [ Lr, qr, Or, Ur, jr, Pr, $r, _r, Mr, Fr, Vr, Wr, Hr, Nr, zr ];

const Xr = exports.SanitizeValueConverter;

const Kr = exports.ViewValueConverter;

const Qr = If;

const Yr = Else;

const Zr = Repeat;

const Jr = With;

const to = exports.Switch;

const eo = exports.Case;

const so = exports.DefaultCase;

const io = exports.PromiseTemplateController;

const no = exports.PendingTemplateController;

const ro = exports.FulfilledTemplateController;

const oo = exports.RejectedTemplateController;

const lo = nr;

const ho = rr;

const co = or;

const ao = AttrBindingBehavior;

const uo = SelfBindingBehavior;

const fo = UpdateTriggerBindingBehavior;

const po = AuRender;

const mo = AuCompose;

const xo = Portal;

const go = Focus;

const vo = Mn;

const wo = [ pr, mr, xr, gr, vr, wr, br, Xr, Kr, Qr, Yr, Zr, Jr, to, eo, so, io, no, ro, oo, lo, ho, co, ao, uo, fo, po, mo, xo, go, vo, AuSlot ];

const bo = di;

const yo = ai;

const ko = ci;

const Co = mi;

const Ao = gi;

const Ro = fi;

const So = xi;

const Bo = pi;

const Io = hi;

const To = ui;

const Do = wi;

const Eo = Ai;

const Po = bi;

const Lo = yi;

const $o = ki;

const Oo = Ci;

const qo = vi;

const Uo = Ri;

const jo = [ So, Ao, bo, Bo, Co, Io, ko, yo, To, Ro, Do, Eo, Po, Lo, $o, Oo, qo, Uo ];

const _o = Mo(t.noop);

function Mo(t) {
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
            return e.register(N(s.ICoercionConfiguration, i.coercingOptions), ...Cr, ...wo, ...Dr, ...Gr, ...jo);
        },
        customize(e) {
            return Mo(e ?? t);
        }
    };
}

const Fo = M("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.oi = false;
        this.li = false;
        this.hi = void 0;
        this.next = void 0;
        this.ai = void 0;
        this.ui = void 0;
        if (e.has(Fo, true)) throw v(`AUR0768`);
        z(e, Fo, new t.InstanceProvider("IAurelia", this));
        z(e, Os, this.fi = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.oi;
    }
    get isStopping() {
        return this.li;
    }
    get root() {
        if (null == this.hi) {
            if (null == this.next) throw v(`AUR0767`);
            return this.next;
        }
        return this.hi;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.di(t.host), this.container, this.fi);
        return this;
    }
    enhance(e, s) {
        const i = e.container ?? this.container.createChild();
        const n = e.host;
        const r = this.di(n);
        const o = e.component;
        let l;
        if (A(o)) {
            z(i, r.HTMLElement, z(i, r.Element, z(i, js, new t.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        z(i, _s, new t.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: be(),
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
    di(t) {
        let e;
        if (!this.container.has($e, false)) {
            if (null === t.ownerDocument.defaultView) throw v(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(N($e, e));
        } else e = this.container.get($e);
        return e;
    }
    start(e = this.next) {
        if (null == e) throw v(`AUR0770`);
        if (k(this.ai)) return this.ai;
        return this.ai = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.fi.prepare(this.hi = e);
            this.oi = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.oi = false;
                this.ai = void 0;
                this.pi(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (k(this.ui)) return this.ui;
        if (true === this.ir) {
            const s = this.hi;
            this.ir = false;
            this.li = true;
            return this.ui = t.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (e) s.dispose();
                this.hi = void 0;
                this.fi.dispose();
                this.li = false;
                this.pi(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.li) throw v(`AUR0771`);
        this.container.dispose();
    }
    pi(t, e, s) {
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

const Vo = M("IDialogService");

const No = M("IDialogController");

const Wo = M("IDialogDomRenderer");

const Ho = M("IDialogDom");

const zo = M("IDialogGlobalSettings");

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
            this._t = t;
            this.Lt = e;
        }));
    }
    static get inject() {
        return [ $e, t.IContainer ];
    }
    activate(e) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = e;
        const o = s.get(Wo);
        const l = e.host ?? this.p.document.body;
        const h = this.dom = o.render(l, e);
        const c = s.has(_s, true) ? s.get(_s) : null;
        const a = h.contentHost;
        this.settings = e;
        if (null == c || !c.contains(l)) s.register(N(_s, l));
        s.register(N(js, a), N(Ho, h));
        return new Promise((t => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, e, a), {
                $dialog: this
            });
            t(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw Go(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return t.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: Te.generateName(),
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
        if (this.mi) return this.mi;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(e, s);
        const a = new Promise((a => {
            a(t.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.mi = void 0;
                    if (h) throw Go(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return t.onResolve(o.deactivate?.(c), (() => t.onResolve(n.deactivate(n, null, 2), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== e) this._t(c); else this.Lt(Go(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.mi = void 0;
            throw t;
        }));
        this.mi = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(e) {
        const s = Xo(e);
        return new Promise((e => e(t.onResolve(this.cmp.deactivate?.(DialogCloseResult.create("error", s)), (() => t.onResolve(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Lt(s);
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
        e.registerResolver(r.HTMLElement, e.registerResolver(r.Element, e.registerResolver(js, new t.InstanceProvider("ElementResolver", i))));
        return e.invoke(n);
    }
    getDefinition(t) {
        const e = A(t) ? t : t?.constructor;
        return Te.isType(e) ? Te.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Go(t, e) {
    const s = v(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function Xo(t) {
    const e = v("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.gt = t;
        this.p = e;
        this.xi = s;
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
        return [ t.IContainer, $e, zo ];
    }
    static register(e) {
        e.register(F(Vo, this), $t.deactivating(Vo, (e => t.onResolve(e.closeAll(), (t => {
            if (t.length > 0) throw v(`AUR0901:${t.length}`);
        })))));
    }
    open(e) {
        return Qo(new Promise((s => {
            const i = DialogSettings.from(this.xi, e);
            const n = i.container ?? this.gt.createChild();
            s(t.onResolve(i.load(), (e => {
                const s = n.invoke(DialogController);
                n.register(N(No, s));
                n.register(W(DialogController, (() => {
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
        const s = Yo(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).vi().gi();
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
    vi() {
        if (null == this.component && null == this.template) throw v(`AUR0903`);
        return this;
    }
    gi() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Ko(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function Qo(t) {
    t.whenClosed = Ko;
    return t;
}

function Yo(t) {
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
        F(zo, this).register(t);
    }
}

const Zo = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Zo} display:flex;`;
        this.overlayCss = Zo;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        F(Wo, this).register(t);
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

DefaultDialogDomRenderer.inject = [ $e ];

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

function Jo(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, $t.creating((() => t(s.get(zo))))),
        customize(t, s) {
            return Jo(t, s ?? e);
        }
    };
}

const tl = Jo((() => {
    throw v(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(F(zo, this));
    }
} ]);

const el = Jo(t.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const sl = M((t => t.singleton(WcCustomElementRegistry)));

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
            n = Te.isType(s) ? Te.getDefinition(s) : CustomElementDefinition.create(Te.generateName(), s);
            break;

          default:
            n = CustomElementDefinition.getOrCreate(s);
            break;
        }
        if (n.containerless) throw v("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const r = i?.extends ? this.p.document.createElement(i.extends).constructor : this.p.HTMLElement;
        const o = this.ctn;
        const l = this.r;
        const h = n.bindables;
        const c = this.p;
        class CustomElementClass extends r {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const e = o.createChild();
                e.registerResolver(c.HTMLElement, e.registerResolver(c.Element, e.registerResolver(js, new t.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, e, {
                    projections: null
                });
                const i = e.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(e, i, this, null, s);
                Us(this, s.key, r);
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

WcCustomElementRegistry.inject = [ t.IContainer, $e, os ];

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = $t;

exports.AtPrefixedTriggerAttributePatternRegistration = Rr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = ao;

exports.AttrBindingCommandRegistration = Nr;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Eo;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = nt;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = po;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = L;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = ct;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingCommand = Fi;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingModeBehavior = BindingModeBehavior;

exports.BindingTargetSubscriber = BindingTargetSubscriber;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Pr;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = bo;

exports.CaptureBindingCommandRegistration = Vr;

exports.CheckedObserver = CheckedObserver;

exports.Children = _t;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Wr;

exports.ColonPrefixedBindAttributePatternRegistration = Sr;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = ee;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = yo;

exports.CustomElement = Te;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = ko;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = pr;

exports.DefaultBindingCommandRegistration = Lr;

exports.DefaultBindingLanguage = Gr;

exports.DefaultBindingSyntax = Dr;

exports.DefaultComponents = Cr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = jo;

exports.DefaultResources = wo;

exports.DelegateBindingCommandRegistration = Fr;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = tl;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = el;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = Ir;

exports.Else = Else;

exports.ElseRegistration = Yr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.FlushQueue = FlushQueue;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = $r;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = gr;

exports.FromViewBindingCommandRegistration = Or;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Os;

exports.IAppTask = Lt;

exports.IAttrMapper = zi;

exports.IAttributeParser = J;

exports.IAttributePattern = Z;

exports.IAuSlotsInfo = Js;

exports.IAurelia = Fo;

exports.IController = bs;

exports.IDialogController = No;

exports.IDialogDom = Ho;

exports.IDialogDomRenderer = Wo;

exports.IDialogGlobalSettings = zo;

exports.IDialogService = Vo;

exports.IEventDelegator = Ys;

exports.IEventTarget = _s;

exports.IFlushQueue = gt;

exports.IHistory = Xs;

exports.IHydrationContext = ys;

exports.IInstruction = ti;

exports.ILifecycleHooks = Ge;

exports.ILocation = Gs;

exports.INode = js;

exports.INodeObserverLocatorRegistration = kr;

exports.IPlatform = $e;

exports.IProjections = Zs;

exports.IRenderLocation = Ms;

exports.IRenderer = ii;

exports.IRendering = os;

exports.ISVGAnalyzer = Wi;

exports.ISanitizer = dr;

exports.IShadowDOMGlobalStyles = Fe;

exports.IShadowDOMStyles = Me;

exports.ISyntaxInterpreter = K;

exports.ITemplateCompiler = si;

exports.ITemplateCompilerHooks = an;

exports.ITemplateCompilerRegistration = yr;

exports.ITemplateElementFactory = Ki;

exports.IViewFactory = Ze;

exports.IViewLocator = rs;

exports.IWcElementRegistry = sl;

exports.IWindow = zs;

exports.If = If;

exports.IfRegistration = Qr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = Co;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = Ao;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = Ro;

exports.LifecycleHooks = Qe;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = Do;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = mr;

exports.OneTimeBindingCommandRegistration = qr;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = So;

exports.RefAttributePatternRegistration = Br;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = _r;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = Bo;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = Zr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = Ar;

exports.SanitizeValueConverterRegistration = Xr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = uo;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Po;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Lo;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = Io;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = $o;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Er;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = vr;

exports.StandardConfiguration = _o;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Hr;

exports.StyleConfiguration = Ve;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Oo;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = dn;

exports.TemplateControllerRendererRegistration = To;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = qo;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = wr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = xr;

exports.ToViewBindingCommandRegistration = Ur;

exports.TriggerBindingCommandRegistration = Mr;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = br;

exports.TwoWayBindingCommandRegistration = jr;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = fo;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = dt;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Kr;

exports.Views = is;

exports.Watch = re;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = Jr;

exports.alias = G;

exports.allResources = _;

exports.attributePattern = tt;

exports.bindable = D;

exports.bindingBehavior = ot;

exports.bindingCommand = Ui;

exports.capture = Le;

exports.children = qt;

exports.coercer = $;

exports.containerless = he;

exports.convertToRenderLocation = Ws;

exports.createElement = lr;

exports.cssModules = Ue;

exports.customAttribute = zt;

exports.customElement = oe;

exports.getEffectiveParentNode = Vs;

exports.getRef = qs;

exports.implementAstEvaluator = mt;

exports.isCustomElementController = xs;

exports.isCustomElementViewModel = gs;

exports.isInstruction = ei;

exports.isRenderLocation = Hs;

exports.lifecycleHooks = Ye;

exports.mixinUseScope = pt;

exports.mixingBindingLimited = bt;

exports.processContent = Ee;

exports.registerAliases = X;

exports.renderer = ni;

exports.setEffectiveParentNode = Ns;

exports.setRef = Us;

exports.shadowCSS = je;

exports.strict = ae;

exports.templateCompilerHooks = pn;

exports.templateController = Gt;

exports.useShadowDOM = le;

exports.valueConverter = at;

exports.view = ns;

exports.watch = se;
//# sourceMappingURL=index.cjs.map
