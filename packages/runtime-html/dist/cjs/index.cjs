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

const a = e.Metadata.define;

const {annotation: c, resource: u} = t.Protocol;

const f = c.keyFor;

const d = u.keyFor;

const p = u.appendTo;

const m = c.appendTo;

const x = c.getKeys;

const g = () => Object.create(null);

const v = t => new Error(t);

const b = Object.prototype.hasOwnProperty;

const w = g();

const y = (t, e, s) => {
    if (true === w[e]) return true;
    if (!B(e)) return false;
    const i = e.slice(0, 5);
    return w[e] = "aria-" === i || "data-" === i || s.isStandardSvgAttribute(t, e);
};

const k = t => t instanceof Promise;

const A = t => t instanceof Array;

const C = t => "function" === typeof t;

const B = t => "string" === typeof t;

const R = Object.defineProperty;

const S = t => {
    throw t;
};

const I = Object.is;

const T = Reflect.defineProperty;

const P = (t, e, s) => {
    T(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
};

function E(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        a(O, BindableDefinition.create(e, t, s), t.constructor, e);
        m(t.constructor, D.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (B(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function L(t) {
    return t.startsWith(O);
}

const O = f("bindable");

const D = Object.freeze({
    name: O,
    keyFrom: t => `${O}:${t}`,
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
                if (B(i)) {
                    n = i;
                    r = {
                        property: n
                    };
                } else {
                    n = i.property;
                    r = i;
                }
                e = BindableDefinition.create(n, t, r);
                if (!h(O, t, n)) m(t, D.keyFrom(n));
                a(O, e, t, n);
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
        const s = O.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let a;
        let c;
        let u;
        while (--r >= 0) {
            c = n[r];
            h = x(c).filter(L);
            a = h.length;
            for (u = 0; u < a; ++u) i[o++] = l(O, c, h[u].slice(s));
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
        return new BindableDefinition(t.firstDefined(i.attribute, t.kebabCase(e)), t.firstDefined(i.callback, `${e}Changed`), t.firstDefined(i.mode, 2), t.firstDefined(i.primary, false), t.firstDefined(i.property, e), t.firstDefined(i.set, $(e, s, i)));
    }
}

function q(t, e, s) {
    U.define(t, e);
}

const U = {
    key: f("coercer"),
    define(t, e) {
        a(U.key, t[e].bind(t), t);
    },
    for(t) {
        return l(U.key, t);
    }
};

function $(e, s, i = {}) {
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
            r = "function" === typeof e ? e.bind(n) : U.for(n) ?? t.noop;
            break;
        }
    }
    return r === t.noop ? r : _(r, i.nullable);
}

function _(t, e) {
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
        const a = this.i = C(l);
        const c = this.u = C(h);
        const u = this.hs = n !== t.noop;
        let f;
        this.o = e;
        this.k = s;
        this.A = c ? h : t.noop;
        this.cb = a ? l : t.noop;
        if (void 0 === this.cb && !c && !u) this.iO = false; else {
            this.iO = true;
            f = e[s];
            this.v = u && void 0 !== f ? n(f, this.t) : f;
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
            if (I(t, e)) return;
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

s.subscriberCollection(BindableObserver);

const M = function(e) {
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

const F = function(e) {
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

const j = t.DI.createInterface;

const V = t.Registration.singleton;

const N = t.Registration.aliasTo;

const H = t.Registration.instance;

t.Registration.callback;

const W = t.Registration.transient;

const z = (t, e, s) => t.registerResolver(e, s);

function G(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) a(s, t, e); else i.push(...t);
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
        this.parts = t.emptyArray;
        this.O = "";
        this.q = {};
        this.U = {};
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
            this.parts = this.U[e];
        }
    }
    append(t, e) {
        const s = this.q;
        if (void 0 === s[t]) s[t] = e; else s[t] += e;
    }
    next(t) {
        const e = this.q;
        let s;
        if (void 0 !== e[t]) {
            s = this.U;
            if (void 0 === s[t]) s[t] = [ e[t] ]; else s[t].push(e[t]);
            e[t] = void 0;
        }
    }
}

class AttrParsingState {
    constructor(t, ...e) {
        this.charSpec = t;
        this.$ = [];
        this._ = null;
        this.M = false;
        this.F = e;
    }
    get O() {
        return this.M ? this.F[0] : null;
    }
    findChild(t) {
        const e = this.$;
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
        const s = this.F;
        if (!s.includes(e)) s.push(e);
        let i = this.findChild(t);
        if (null == i) {
            i = new AttrParsingState(t, e);
            this.$.push(i);
            if (t.repeat) i.$.push(i);
        }
        return i;
    }
    findMatches(t, e) {
        const s = [];
        const i = this.$;
        const n = i.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = i[l];
            if (o.charSpec.has(t)) {
                s.push(o);
                r = o.F.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.F[h]); else for (;h < r; ++h) e.append(o.F[h], t);
            }
        }
        return s;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.j = t.length;
        const s = this.V = [];
        let i = 0;
        for (;e > i; ++i) s.push(new CharSpec(t[i], false, false, false));
    }
    eachChar(t) {
        const e = this.j;
        const s = this.V;
        let i = 0;
        for (;e > i; ++i) t(s[i]);
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

const K = j("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

class SyntaxInterpreter {
    constructor() {
        this.H = new AttrParsingState(null);
        this.W = [ this.H ];
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
        let a = 0;
        let c;
        while (e > a) {
            s = this.H;
            i = t[a];
            n = i.pattern;
            r = new SegmentTypes;
            o = this.G(i, r);
            l = o.length;
            h = t => s = s.append(t, n);
            for (c = 0; l > c; ++c) o[c].eachChar(h);
            s._ = r;
            s.M = true;
            ++a;
        }
    }
    interpret(t) {
        const e = new Interpretation;
        const s = t.length;
        let i = this.W;
        let n = 0;
        let r;
        for (;n < s; ++n) {
            i = this.X(i, t.charAt(n), e);
            if (0 === i.length) break;
        }
        i = i.filter(Q);
        if (i.length > 0) {
            i.sort(Y);
            r = i[0];
            if (!r.charSpec.isSymbol) e.next(r.O);
            e.pattern = r.O;
        }
        return e;
    }
    X(t, e, s) {
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
    G(t, e) {
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
    return t.M;
}

function Y(t, e) {
    const s = t._;
    const i = e._;
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

const Z = j("IAttributePattern");

const J = j("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(e, s) {
        this.K = {};
        this.Y = e;
        const i = this.F = {};
        const n = s.reduce(((t, e) => {
            const s = it(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), t.emptyArray);
        e.add(n);
    }
    parse(t, e) {
        let s = this.K[t];
        if (null == s) s = this.K[t] = this.Y.interpret(t);
        const i = s.pattern;
        if (null == i) return new AttrSyntax(t, e, t, null); else return this.F[i][i](t, e, s.parts);
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
        V(Z, this.Type).register(t);
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
        a(et, i, s);
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
        return new AttrSyntax(t, e, `${s[0]}.${s[1]}`, s[2]);
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

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.Z = false;
        this.o = t;
        this.J = e;
        this.tt = s;
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
                    if (B(e) && e.includes("!important")) {
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
        for (let s = 0, i = t.length; i > s; ++s) {
            const i = t[s];
            if ("attributes" === i.type && i.attributeName === this.J) {
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
                throw v(`AUR0651:${this.tt}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.Z = false;
                this.st();
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.J);
            ot(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) lt(this.o, this);
    }
    st() {
        ct = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ct);
    }
}

s.subscriberCollection(AttributeObserver);

const ot = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(ht)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const lt = (t, e) => {
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

const ht = t => {
    t[0].target.$eMObs.forEach(at, t);
};

function at(t) {
    t.handleMutation(this);
}

let ct;

function ut(t) {
    return function(e) {
        return pt.define(t, e);
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
        if (B(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new BindingBehaviorDefinition(s, t.firstDefined(dt(s, "name"), i), t.mergeArrays(dt(s, "aliases"), n.aliases, s.aliases), pt.keyFrom(i));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        V(s, e).register(t);
        N(s, e).register(t);
        X(i, pt, s, t);
    }
}

const ft = d("binding-behavior");

const dt = (t, e) => l(f(e), t);

const pt = Object.freeze({
    name: ft,
    keyFrom(t) {
        return `${ft}:${t}`;
    },
    isType(t) {
        return C(t) && h(ft, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        a(ft, s, s.Type);
        a(ft, s, s);
        p(e, ft);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ft, t);
        if (void 0 === e) throw v(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        a(f(e), s, t);
    },
    getAnnotation: dt
});

function mt(t) {
    return function(e) {
        return vt.define(t, e);
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
        if (B(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new ValueConverterDefinition(s, t.firstDefined(gt(s, "name"), i), t.mergeArrays(gt(s, "aliases"), n.aliases, s.aliases), vt.keyFrom(i));
    }
    register(e) {
        const {Type: s, key: i, aliases: n} = this;
        t.Registration.singleton(i, s).register(e);
        t.Registration.aliasTo(i, s).register(e);
        X(n, vt, i, e);
    }
}

const xt = d("value-converter");

const gt = (t, e) => l(f(e), t);

const vt = Object.freeze({
    name: xt,
    keyFrom: t => `${xt}:${t}`,
    isType(t) {
        return C(t) && h(xt, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        a(xt, s, s.Type);
        a(xt, s, s);
        p(e, xt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(xt, t);
        if (void 0 === e) throw v(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        a(f(e), s, t);
    },
    getAnnotation: gt
});

class BindingTargetSubscriber {
    constructor(t, e) {
        this.v = void 0;
        this.b = t;
        this.it = e;
    }
    flush() {
        this.b.updateSource(this.v);
    }
    handleChange(t, e) {
        const i = this.b;
        if (t !== s.astEvaluate(i.ast, i.s, i, null)) {
            this.v = t;
            this.it.add(this);
        }
    }
}

const bt = t => {
    P(t.prototype, "useScope", (function(t) {
        this.s = t;
    }));
};

const wt = (t, e = true) => i => {
    const n = i.prototype;
    if (null != t) T(n, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    T(n, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    P(n, "get", (function(t) {
        return this.l.get(t);
    }));
    P(n, "getSignaler", (function() {
        return this.l.root.get(s.ISignaler);
    }));
    P(n, "getConverter", (function(t) {
        const e = vt.keyFrom(t);
        let s = yt.get(this);
        if (null == s) yt.set(this, s = new ResourceLookup);
        return s[e] ?? (s[e] = this.l.get(M(e)));
    }));
    P(n, "getBehavior", (function(t) {
        const e = pt.keyFrom(t);
        let s = yt.get(this);
        if (null == s) yt.set(this, s = new ResourceLookup);
        return s[e] ?? (s[e] = this.l.get(M(e)));
    }));
};

const yt = new WeakMap;

class ResourceLookup {}

const kt = j("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.rt.forEach(At);
        } finally {
            this.nt = false;
        }
    }
    clear() {
        this.rt.clear();
        this.nt = false;
    }
}

function At(t, e, s) {
    s.delete(t);
    t.flush();
}

const Ct = new WeakSet;

const Bt = (t, e) => {
    P(t.prototype, "limit", (function(t) {
        if (Ct.has(this)) throw v(`AURXXXX: a rate limit has already been applied.`);
        Ct.add(this);
        const s = e(this, t);
        const i = this[s];
        const n = (...t) => i.call(this, ...t);
        const r = "debounce" === t.type ? Rt(t, n, this) : St(t, n, this);
        this[s] = r;
        return {
            dispose: () => {
                Ct.delete(this);
                r.dispose();
                delete this[s];
            }
        };
    }));
};

const Rt = (t, e, s) => {
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

const St = (t, e, s) => {
    let i;
    let n;
    let r = 0;
    let o = 0;
    let l;
    const h = t.queue;
    const a = () => t.now();
    const c = c => {
        l = c;
        if (s.isBound) {
            o = a() - r;
            n = i;
            if (o > t.delay) {
                r = a();
                e(l);
            } else i = h.queueTask((() => {
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
        i?.cancel();
    };
    return c;
};

const It = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, s, i, n, r, o, l, h) {
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
        this.oL = s;
        this.ht = i;
    }
    updateTarget(t) {
        this.ct.setValue(t, this.target, this.targetProperty);
    }
    handleChange() {
        if (!this.isBound) return;
        let t;
        this.obs.version++;
        const e = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (e !== this.v) {
            this.v = e;
            const s = 1 !== this.lt.state && (4 & this.ct.type) > 0;
            if (s) {
                t = this.ot;
                this.ot = this.ht.queueTask((() => {
                    this.ot = null;
                    this.updateTarget(e);
                }), It);
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
        s.astBind(this.ast, t, this);
        this.ct ?? (this.ct = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = s.astEvaluate(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.s, this);
        this.s = void 0;
        this.v = void 0;
        this.ot?.cancel();
        this.ot = null;
        this.obs.clearAll();
    }
}

bt(AttributeBinding);

Bt(AttributeBinding, (() => "updateTarget"));

s.connectable(AttributeBinding);

wt(true)(AttributeBinding);

const Tt = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.s = void 0;
        this.ot = null;
        this.lt = t;
        this.oL = s;
        this.ht = i;
        this.ct = s.getAccessor(r, o);
        const h = n.expressions;
        const a = this.partBindings = Array(h.length);
        const c = h.length;
        let u = 0;
        for (;c > u; ++u) a[u] = new InterpolationPartBinding(h[u], r, o, e, s, this);
    }
    ut() {
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
        const r = this.ct;
        const o = 1 !== this.lt.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.ot;
            this.ot = this.ht.queueTask((() => {
                this.ot = null;
                r.setValue(i, this.target, this.targetProperty);
            }), Tt);
            l?.cancel();
            l = null;
        } else r.setValue(i, this.target, this.targetProperty);
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        const e = this.partBindings;
        const s = e.length;
        let i = 0;
        for (;s > i; ++i) e[i].bind(t);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.s = void 0;
        const t = this.partBindings;
        const e = t.length;
        let s = 0;
        for (;e > s; ++s) t[s].unbind();
        this.ot?.cancel();
        this.ot = null;
    }
}

class InterpolationPartBinding {
    constructor(t, e, s, i, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = s;
        this.owner = r;
        this.mode = 2;
        this.task = null;
        this.isBound = false;
        this.v = "";
        this.boundFn = false;
        this.l = i;
        this.oL = n;
    }
    updateTarget() {
        this.owner.ut();
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (t != this.v) {
            this.v = t;
            if (A(t)) this.observeCollection(t);
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
        s.astBind(this.ast, t, this);
        this.v = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        if (A(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
    }
}

bt(InterpolationPartBinding);

Bt(InterpolationPartBinding, (() => "updateTarget"));

s.connectable(InterpolationPartBinding);

wt(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, s, i, n, r, o, l) {
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
        this.oL = s;
        this.ht = i;
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
        this.obs.version++;
        const t = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
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
        const t = this.v = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (A(t)) this.observeCollection(t);
        const e = 1 !== this.lt.state;
        if (e) this.ft(t); else this.updateTarget(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.s === t) return;
            this.unbind();
        }
        this.s = t;
        s.astBind(this.ast, t, this);
        const e = this.v = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        if (A(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.s, this);
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
        }), Tt);
        e?.cancel();
    }
}

bt(ContentBinding);

Bt(ContentBinding, (() => "updateTarget"));

s.connectable()(ContentBinding);

wt(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, s, i, n = false) {
        this.ast = s;
        this.targetProperty = i;
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
        this.v = s.astEvaluate(this.ast, this.s, this, this);
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
        s.astBind(this.ast, t, this);
        this.v = s.astEvaluate(this.ast, this.s, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.s, this);
        this.s = void 0;
        this.obs.clearAll();
    }
}

bt(LetBinding);

Bt(LetBinding, (() => "updateTarget"));

s.connectable(LetBinding);

wt(true)(LetBinding);

class PropertyBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.s = void 0;
        this.ct = void 0;
        this.ot = null;
        this.xt = null;
        this.boundFn = false;
        this.l = e;
        this.lt = t;
        this.ht = i;
        this.oL = s;
    }
    updateTarget(t) {
        this.ct.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        s.astAssign(this.ast, this.s, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = s.astEvaluate(this.ast, this.s, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        const e = 1 !== this.lt.state && (4 & this.ct.type) > 0;
        if (e) {
            Pt = this.ot;
            this.ot = this.ht.queueTask((() => {
                this.updateTarget(t);
                this.ot = null;
            }), Et);
            Pt?.cancel();
            Pt = null;
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
        s.astBind(this.ast, t, this);
        const e = this.oL;
        const i = this.mode;
        let n = this.ct;
        if (!n) {
            if (4 & i) n = e.getObserver(this.target, this.targetProperty); else n = e.getAccessor(this.target, this.targetProperty);
            this.ct = n;
        }
        const r = (2 & i) > 0;
        if (i & (2 | 1)) this.updateTarget(s.astEvaluate(this.ast, this.s, this, r ? this : null));
        if (4 & i) {
            n.subscribe(this.xt ?? (this.xt = new BindingTargetSubscriber(this, this.l.get(kt))));
            if (!r) this.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.s, this);
        this.s = void 0;
        if (this.xt) {
            this.ct.unsubscribe(this.xt);
            this.xt = null;
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
        if (null != this.xt) throw v(`AURxxxx: binding already has a target subscriber`);
        this.xt = t;
    }
}

bt(PropertyBinding);

Bt(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

s.connectable(PropertyBinding);

wt(true, false)(PropertyBinding);

let Pt = null;

const Et = {
    reusable: false,
    preempt: true
};

class RefBinding {
    constructor(t, e, s) {
        this.ast = e;
        this.target = s;
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
        s.astBind(this.ast, t, this);
        s.astAssign(this.ast, this.s, this, this.target);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (s.astEvaluate(this.ast, this.s, this, null) === this.target) s.astAssign(this.ast, this.s, this, null);
        s.astUnbind(this.ast, this.s, this);
        this.s = void 0;
    }
}

wt(false)(RefBinding);

class ListenerBindingOptions {
    constructor(t, e = false) {
        this.prevent = t;
        this.capture = e;
    }
}

class ListenerBinding {
    constructor(t, e, s, i, n) {
        this.ast = e;
        this.target = s;
        this.targetEvent = i;
        this.isBound = false;
        this.self = false;
        this.boundFn = true;
        this.l = t;
        this.gt = n;
    }
    callSource(t) {
        const e = this.s.overrideContext;
        e.$event = t;
        let i = s.astEvaluate(this.ast, this.s, this, null);
        delete e.$event;
        if (C(i)) i = i(t);
        if (true !== i && this.gt.prevent) t.preventDefault();
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
        s.astBind(this.ast, t, this);
        this.target.addEventListener(this.targetEvent, this, this.gt);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.s, this);
        this.s = void 0;
        this.target.removeEventListener(this.targetEvent, this, this.gt);
    }
}

bt(ListenerBinding);

Bt(ListenerBinding, (() => "callSource"));

wt(true, true)(ListenerBinding);

const Lt = j("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(H(Lt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Ot = Object.freeze({
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
        if (C(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function qt(t, e) {
    if (null == t) throw v(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!C(e) && (null == e || !(e in l.prototype))) throw v(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!C(r?.value)) throw v(`AUR0774:${String(n)}`);
        _t.add(l, h);
        if (Ht(l)) Gt(l).watches.push(h);
        if (qs(l)) _s(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Ut = t.emptyArray;

const $t = f("watch");

const _t = Object.freeze({
    name: $t,
    add(t, e) {
        let s = l($t, t);
        if (null == s) a($t, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l($t, t) ?? Ut;
    }
});

function Mt(t) {
    return function(e) {
        return zt(t, e);
    };
}

function Ft(t) {
    return function(e) {
        return zt(B(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, s, i, n, r, o, l, h, a) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
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
    static create(e, s) {
        let i;
        let n;
        if (B(e)) {
            i = e;
            n = {
                name: i
            };
        } else {
            i = e.name;
            n = e;
        }
        return new CustomAttributeDefinition(s, t.firstDefined(Nt(s, "name"), i), t.mergeArrays(Nt(s, "aliases"), n.aliases, s.aliases), Vt(i), t.firstDefined(Nt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, 2), t.firstDefined(Nt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), D.from(s, ...D.getAll(s), Nt(s, "bindables"), s.bindables, n.bindables), t.firstDefined(Nt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(_t.getAnnotation(s), s.watches), t.mergeArrays(Nt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        W(s, e).register(t);
        N(s, e).register(t);
        X(i, Xt, s, t);
    }
}

const jt = d("custom-attribute");

const Vt = t => `${jt}:${t}`;

const Nt = (t, e) => l(f(e), t);

const Ht = t => C(t) && h(jt, t);

const Wt = (t, e) => rs(t, Vt(e)) ?? void 0;

const zt = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    a(jt, s, s.Type);
    a(jt, s, s);
    p(e, jt);
    return s.Type;
};

const Gt = t => {
    const e = l(jt, t);
    if (void 0 === e) throw v(`AUR0759:${t.name}`);
    return e;
};

const Xt = Object.freeze({
    name: jt,
    keyFrom: Vt,
    isType: Ht,
    for: Wt,
    define: zt,
    getDefinition: Gt,
    annotate(t, e, s) {
        a(f(e), s, t);
    },
    getAnnotation: Nt
});

function Kt(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        a(Yt, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, Zt.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (B(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function Qt(t) {
    return t.startsWith(Yt);
}

const Yt = f("children-observer");

const Zt = Object.freeze({
    name: Yt,
    keyFrom: t => `${Yt}:${t}`,
    from(...t) {
        const e = {};
        function s(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function i(t, s) {
            e[t] = ChildrenDefinition.create(t, s);
        }
        function n(t) {
            if (A(t)) t.forEach(s); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => i(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(e) {
        const s = Yt.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let a;
        let c;
        while (--r >= 0) {
            c = n[r];
            h = x(c).filter(Qt);
            a = h.length;
            for (let t = 0; t < a; ++t) i[o++] = l(Yt, c, h[t].slice(s));
        }
        return i;
    }
});

const Jt = {
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
        return new ChildrenDefinition(t.firstDefined(s.callback, `${e}Changed`), t.firstDefined(s.property, e), s.options ?? Jt, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = te, r = ee, o = se, l) {
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
                this.vt();
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
    vt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return ne(this.controller, this.query, this.filter, this.map);
    }
}

s.subscriberCollection()(ChildrenObserver);

function te(t) {
    return t.host.childNodes;
}

function ee(t, e, s) {
    return !!s;
}

function se(t, e, s) {
    return s;
}

const ie = {
    optional: true
};

function ne(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let a;
    let c = 0;
    for (;c < r; ++c) {
        l = n[c];
        h = Us(l, ie);
        a = h?.viewModel ?? null;
        if (s(l, h, a)) o.push(i(l, h, a));
    }
    return o;
}

const re = t.IPlatform;

const oe = (t, e, s, i) => {
    t.addEventListener(e, s, i);
};

const le = (t, e, s, i) => {
    t.removeEventListener(e, s, i);
};

const he = t => {
    const e = t.prototype;
    P(e, "subscribe", (function(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            for (ae of this.bt.events) oe(this.wt, ae, this);
            this.yt = true;
            this.kt?.();
        }
    }));
    P(e, "unsubscribe", (function(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            for (ae of this.bt.events) le(this.wt, ae, this);
            this.yt = false;
            this.At?.();
        }
    }));
    P(e, "useConfig", (function(t) {
        this.bt = t;
        if (this.yt) {
            for (ae of this.bt.events) le(this.wt, ae, this);
            for (ae of this.bt.events) oe(this.wt, ae, this);
        }
    }));
};

let ae;

const ce = e => {
    P(e.prototype, "subscribe", t.noop);
    P(e.prototype, "unsubscribe", t.noop);
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
            const s = ue(t);
            let i = this.Bt;
            this.ov = t;
            if (s.length > 0) this.Rt(s);
            this.Bt += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!b.call(e, t) || e[t] !== i) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    Rt(t) {
        const e = this.obj;
        const s = t.length;
        let i = 0;
        let n;
        for (;i < s; i++) {
            n = t[i];
            if (0 === n.length) continue;
            this.Ct[n] = this.Bt;
            e.classList.add(n);
        }
    }
}

function ue(e) {
    if (B(e)) return fe(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...ue(e[i]));
            return t;
        } else return t.emptyArray;
    }
    const s = [];
    let i;
    for (i in e) if (Boolean(e[i])) if (i.includes(" ")) s.push(...fe(i)); else s.push(i);
    return s;
}

function fe(e) {
    const s = e.match(/\S+/g);
    if (null === s) return t.emptyArray;
    return s;
}

ce(ClassAttributeAccessor);

function de(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = zt({
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
                this.element.className = ue(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ ls ], e));
        t.register(i);
    }
}

function pe(...t) {
    return new ShadowDOMRegistry(t);
}

const me = j("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(re))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(ge);
        const s = t.get(me);
        t.register(H(xe, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ re ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ re ];

const xe = j("IShadowDOMStyles");

const ge = j("IShadowDOMGlobalStyles", (e => e.instance({
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

const ve = {
    shadowDOM(e) {
        return Ot.creating(t.IContainer, (t => {
            if (null != e.sharedStyles) {
                const s = t.get(me);
                t.register(H(ge, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: be, exit: we} = s.ConnectableSwitcher;

const {wrap: ye, unwrap: ke} = s.ProxyObservable;

class ComputedWatcher {
    constructor(t, e, s, i, n) {
        this.obj = t;
        this.$get = s;
        this.useProxy = n;
        this.isBound = false;
        this.running = false;
        this.v = void 0;
        this.cb = i;
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
        const s = this.compute();
        if (!I(s, e)) this.cb.call(t, s, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            be(this);
            return this.v = ke(this.$get.call(void 0, this.useProxy ? ye(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            we(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, s, i, n) {
        this.scope = t;
        this.l = e;
        this.oL = s;
        this.isBound = false;
        this.boundFn = false;
        this.obj = t.bindingContext;
        this.St = i;
        this.cb = n;
    }
    get value() {
        return this.v;
    }
    handleChange(t) {
        const e = this.St;
        const i = this.obj;
        const n = this.v;
        const r = 1 === e.$kind && 1 === this.obs.count;
        if (!r) {
            this.obs.version++;
            t = s.astEvaluate(e, this.scope, this, this);
            this.obs.clear();
        }
        if (!I(t, n)) {
            this.v = t;
            this.cb.call(i, t, n, i);
        }
    }
    bind() {
        if (this.isBound) return;
        this.obs.version++;
        this.v = s.astEvaluate(this.St, this.scope, this, this);
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

s.connectable(ComputedWatcher);

s.connectable(ExpressionWatcher);

wt(true)(ExpressionWatcher);

const Ae = j("ILifecycleHooks");

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
        V(Ae, this.Type).register(t);
    }
}

const Ce = new WeakMap;

const Be = f("lifecycle-hooks");

const Re = Object.freeze({
    name: Be,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        a(Be, s, e);
        p(e, Be);
        return s.Type;
    },
    resolve(t) {
        let e = Ce.get(t);
        if (void 0 === e) {
            Ce.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(Ae) : t.has(Ae, false) ? s.getAll(Ae).concat(t.getAll(Ae)) : s.getAll(Ae);
            let n;
            let r;
            let o;
            let h;
            let a;
            for (n of i) {
                r = l(Be, n.constructor);
                o = new LifecycleHooksEntry(r, n);
                for (h of r.propertyNames) {
                    a = e[h];
                    if (void 0 === a) e[h] = [ o ]; else a.push(o);
                }
            }
        }
        return e;
    }
});

class LifecycleHooksLookupImpl {}

function Se() {
    return function t(e) {
        return Re.define({}, e);
    };
}

const Ie = j("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (B(t)) t = parseInt(t, 10);
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

const Te = j("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.Tt = new WeakMap;
        this.Pt = new WeakMap;
        const e = t.root;
        this.p = (this.Et = e).get(re);
        this.ep = e.get(s.IExpressionParser);
        this.oL = e.get(s.IObserverLocator);
        this.Lt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return this.Ot ?? (this.Ot = this.Et.getAll(Ys, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()));
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.Tt;
            const n = e.get(Qs);
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
        const s = this.Pt;
        if (s.has(t)) e = s.get(t); else {
            const i = this.p;
            const n = i.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof i.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (B(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            s.set(t, e);
        }
        return null == e ? this.Lt : new FragmentNodeSequence(this.p, e.cloneNode(true));
    }
    render(t, e, s, i) {
        const n = s.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw v(`AUR0757:${o}<>${n.length}`);
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
        if (null != i) {
            c = s.surrogates;
            if ((a = c.length) > 0) {
                h = 0;
                while (a > h) {
                    u = c[h];
                    r[u.type].render(t, i, u, this.p, this.ep, this.oL);
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

var Pe;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Pe || (Pe = {}));

const Ee = {
    optional: true
};

const Le = new WeakMap;

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
        this.Dt = null;
        this.state = 0;
        this.qt = false;
        this.Ut = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.$t = 0;
        this._t = 0;
        this.Mt = 0;
        this.Ft = r;
        this.jt = 2 === s ? HooksDefinition.none : new HooksDefinition(r);
        this.location = l;
        this.r = e.root.get(Te);
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
        return Le.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw v(`AUR0500:${t}`);
        return e;
    }
    static $el(e, s, i, n, r = void 0, o = null) {
        if (Le.has(s)) return Le.get(s);
        r = r ?? _s(s.constructor);
        const l = new Controller(e, 0, r, null, s, i, o);
        const h = e.get(t.optional(He));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        z(e, He, new t.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        Le.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (Le.has(e)) return Le.get(e);
        i = i ?? Gt(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        Le.set(e, n);
        n.Vt();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.Nt();
        return s;
    }
    hE(e, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.Ft;
        let l = this.definition;
        this.scope = s.Scope.create(o, null, true);
        if (l.watches.length > 0) _e(this, n, l, o);
        De(this, l, r, o);
        this.Ut = qe(this, l, o);
        if (this.jt.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.Dt = Re.resolve(n);
        l.register(n);
        if (null !== l.injectable) z(n, l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == e || false !== e.hydrate) {
            this.hS(e);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.Dt.hydrating) this.Dt.hydrating.forEach(Ge, this);
        if (this.jt.hasHydrating) this.Ft.hydrating(this);
        const e = this.Ht = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = Us(this.host, Ee))) {
            this.host = this.container.root.get(re).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = ds(this.host);
        }
        os(this.host, Ps, this);
        os(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw v(`AUR0501`);
            os(this.shadowRoot = this.host.attachShadow(s ?? je), Ps, this);
            os(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            os(o, Ps, this);
            os(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.Ft.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.Dt.hydrated) this.Dt.hydrated.forEach(Xe, this);
        if (this.jt.hasHydrated) this.Ft.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ht, this.host);
        if (void 0 !== this.Dt.created) this.Dt.created.forEach(ze, this);
        if (this.jt.hasCreated) this.Ft.created(this);
    }
    Vt() {
        const t = this.definition;
        const e = this.Ft;
        if (t.watches.length > 0) _e(this, this.container, t, e);
        De(this, t, this.flags, e);
        e.$controller = this;
        this.Dt = Re.resolve(this.container);
        if (void 0 !== this.Dt.created) this.Dt.created.forEach(ze, this);
        if (this.jt.hasCreated) this.Ft.created(this);
    }
    Nt() {
        this.Ht = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Ht.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Ht)).findTargets(), this.Ht, void 0);
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
            throw v(`AUR0503:${this.name} ${Ve(this.state)}`);
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
        this.Wt();
        let r;
        if (2 !== this.vmKind && null != this.Dt.binding) r = t.resolveAll(...this.Dt.binding.map(Ke, this));
        if (this.jt.hasBinding) r = t.resolveAll(r, this.Ft.binding(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.zt();
            r.then((() => {
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
        let e = 0;
        let s = this.Ut.length;
        let i;
        if (s > 0) while (s > e) {
            this.Ut[e].start();
            ++e;
        }
        if (null !== this.bindings) {
            e = 0;
            s = this.bindings.length;
            while (s > e) {
                this.bindings[e].bind(this.scope);
                ++e;
            }
        }
        if (2 !== this.vmKind && null != this.Dt.bound) i = t.resolveAll(...this.Dt.bound.map(Qe, this));
        if (this.jt.hasBound) i = t.resolveAll(i, this.Ft.bound(this.$initiator, this.parent, this.$flags));
        if (k(i)) {
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
                const e = t.has(xe, false) ? t.get(xe) : t.get(ge);
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
        if (2 !== this.vmKind && null != this.Dt.attaching) s = t.resolveAll(...this.Dt.attaching.map(Ye, this));
        if (this.jt.hasAttaching) s = t.resolveAll(s, this.Ft.attaching(this.$initiator, this.parent, this.$flags));
        if (k(s)) {
            this.zt();
            this.Wt();
            s.then((() => {
                this.Qt();
            })).catch((t => {
                this.Gt(t);
            }));
        }
        if (null !== this.children) for (;e < this.children.length; ++e) void this.children[e].activate(this.$initiator, this, this.$flags, this.scope);
        this.Qt();
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
            throw v(`AUR0505:${this.name} ${Ve(this.state)}`);
        }
        this.$initiator = e;
        this.$flags = i;
        if (e === this) this.Yt();
        let n = 0;
        let r;
        if (this.Ut.length) for (;n < this.Ut.length; ++n) this.Ut[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(e, this, i);
        if (2 !== this.vmKind && null != this.Dt.detaching) r = t.resolveAll(...this.Dt.detaching.map(Je, this));
        if (this.jt.hasDetaching) r = t.resolveAll(r, this.Ft.detaching(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.zt();
            e.Yt();
            r.then((() => {
                e.Zt();
            })).catch((t => {
                e.Gt(t);
            }));
        }
        if (null === e.head) e.head = this; else e.tail.next = this;
        e.tail = this;
        if (e !== this) return;
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
            es = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            es();
            es = void 0;
        }
    }
    Gt(t) {
        if (void 0 !== this.$promise) {
            ss = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            ss(t);
            ss = void 0;
        }
        if (this.$initiator !== this) this.parent.Gt(t);
    }
    Wt() {
        ++this.$t;
        if (this.$initiator !== this) this.parent.Wt();
    }
    Qt() {
        if (0 === --this.$t) {
            if (2 !== this.vmKind && null != this.Dt.attached) is = t.resolveAll(...this.Dt.attached.map(Ze, this));
            if (this.jt.hasAttached) is = t.resolveAll(is, this.Ft.attached(this.$initiator, this.$flags));
            if (k(is)) {
                this.zt();
                is.then((() => {
                    this.state = 2;
                    this.Jt();
                    if (this.$initiator !== this) this.parent.Qt();
                })).catch((t => {
                    this.Gt(t);
                }));
                is = void 0;
                return;
            }
            is = void 0;
            this.state = 2;
            this.Jt();
        }
        if (this.$initiator !== this) this.parent.Qt();
    }
    Yt() {
        ++this._t;
    }
    Zt() {
        if (0 === --this._t) {
            this.te();
            this.removeNodes();
            let e = this.$initiator.head;
            let s;
            while (null !== e) {
                if (e !== this) {
                    if (e.debug) e.logger.trace(`detach()`);
                    e.removeNodes();
                }
                if (2 !== e.vmKind && null != e.Dt.unbinding) s = t.resolveAll(...e.Dt.unbinding.map(ts, this));
                if (e.jt.hasUnbinding) {
                    if (e.debug) e.logger.trace("unbinding()");
                    s = t.resolveAll(s, e.viewModel.unbinding(e.$initiator, e.parent, e.$flags));
                }
                if (k(s)) {
                    this.zt();
                    this.te();
                    s.then((() => {
                        this.ee();
                    })).catch((t => {
                        this.Gt(t);
                    }));
                }
                s = void 0;
                e = e.next;
            }
            this.ee();
        }
    }
    te() {
        ++this.Mt;
    }
    ee() {
        if (0 === --this.Mt) {
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
            return Gt(this.Ft.constructor).name === t;

          case 0:
            return _s(this.Ft.constructor).name === t;

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
            os(t, Ps, this);
            os(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            os(t, Ps, this);
            os(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            os(t, Ps, this);
            os(t, this.definition.key, this);
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
            this.children.forEach(We);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.Ft) {
            Le.delete(this.Ft);
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
            for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
        }
    }
}

function Oe(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function De(t, e, i, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const a = Oe(n);
        const c = t.container;
        const u = c.has(s.ICoercionConfiguration, true) ? c.get(s.ICoercionConfiguration) : null;
        for (;h < l; ++h) {
            e = o[h];
            if (void 0 === a[e]) {
                i = r[e];
                a[e] = new BindableObserver(n, e, i.callback, i.set, t, u);
            }
        }
    }
}

function qe(e, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = Oe(i);
        const s = [];
        let l;
        let h = 0;
        let a;
        for (;h < o; ++h) {
            l = r[h];
            if (null == t[l]) {
                a = n[l];
                s[s.length] = t[l] = new ChildrenObserver(e, i, l, a.callback, a.query, a.filter, a.map, a.options);
            }
        }
        return s;
    }
    return t.emptyArray;
}

const Ue = new Map;

const $e = t => {
    let e = Ue.get(t);
    if (null == e) {
        e = new s.AccessScopeExpression(t, 0);
        Ue.set(t, e);
    }
    return e;
};

function _e(t, e, i, n) {
    const r = e.get(s.IObserverLocator);
    const o = e.get(s.IExpressionParser);
    const l = i.watches;
    const h = 0 === t.vmKind ? t.scope : s.Scope.create(n, null, true);
    const a = l.length;
    let c;
    let u;
    let f;
    let d = 0;
    for (;a > d; ++d) {
        ({expression: c, callback: u} = l[d]);
        u = C(u) ? u : Reflect.get(n, u);
        if (!C(u)) throw v(`AUR0506:${String(u)}`);
        if (C(c)) t.addBinding(new ComputedWatcher(n, r, c, u, true)); else {
            f = B(c) ? o.parse(c, 16) : $e(c);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function Me(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Fe(t) {
    return e.isObject(t) && qs(t.constructor);
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

const je = {
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

function Ve(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Ne = j("IController");

const He = j("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function We(t) {
    t.dispose();
}

function ze(t) {
    t.instance.created(this.Ft, this);
}

function Ge(t) {
    t.instance.hydrating(this.Ft, this);
}

function Xe(t) {
    t.instance.hydrated(this.Ft, this);
}

function Ke(t) {
    return t.instance.binding(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function Qe(t) {
    return t.instance.bound(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function Ye(t) {
    return t.instance.attaching(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function Ze(t) {
    return t.instance.attached(this.Ft, this["$initiator"], this["$flags"]);
}

function Je(t) {
    return t.instance.detaching(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

function ts(t) {
    return t.instance.unbinding(this.Ft, this["$initiator"], this.parent, this["$flags"]);
}

let es;

let ss;

let is;

const ns = j("IAppRoot");

class AppRoot {
    constructor(e, s, i, n) {
        this.config = e;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.se = void 0;
        this.host = e.host;
        n.prepare(this);
        z(i, s.HTMLElement, z(i, s.Element, z(i, ls, new t.InstanceProvider("ElementResolver", e.host))));
        this.se = t.onResolve(this.ie("creating"), (() => {
            const s = e.component;
            const n = i.createChild();
            let r;
            if (qs(s)) r = this.container.get(s); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this.ie("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this.ie("hydrated"), (() => {
                    l.hC();
                    this.se = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.se, (() => t.onResolve(this.ie("activating"), (() => t.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.ie("activated")))))));
    }
    deactivate() {
        return t.onResolve(this.ie("deactivating"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.ie("deactivated")))));
    }
    ie(e) {
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

function rs(t, e) {
    return t.$au?.[e] ?? null;
}

function os(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const ls = j("INode");

const hs = j("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(ns, true)) return t.get(ns).host;
    return t.get(re).document;
}))));

const as = j("IRenderLocation");

const cs = new WeakMap;

function us(t) {
    if (cs.has(t)) return cs.get(t);
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
        const e = Us(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return us(e.host);
    }
    return t.parentNode;
}

function fs(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) cs.set(s[t], e);
    } else cs.set(t, e);
}

function ds(t) {
    if (ps(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function ps(t) {
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
            if ("AU-M" === r.nodeName) o[i] = ds(r); else o[i] = r;
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
        if (ps(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const ms = j("IWindow", (t => t.callback((t => t.get(re).window))));

const xs = j("ILocation", (t => t.callback((t => t.get(ms).location))));

const gs = j("IHistory", (t => t.callback((t => t.get(ms).history))));

function vs(t) {
    return function(e) {
        return Ds(t, e);
    };
}

function bs(t) {
    if (void 0 === t) return function(t) {
        Os(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!C(t)) return function(e) {
        Os(e, "shadowOptions", t);
    };
    Os(t, "shadowOptions", {
        mode: "open"
    });
}

function ws(t) {
    if (void 0 === t) return function(t) {
        ys(t);
    };
    ys(t);
}

function ys(t) {
    const e = l(Ps, t);
    if (void 0 === e) {
        Os(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function ks(t) {
    if (void 0 === t) return function(t) {
        Os(t, "isStrictBinding", true);
    };
    Os(t, "isStrictBinding", true);
}

const As = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, s, i, n, r, o, l, h, a, c, u, f, d, p, m, x, g, v, b, w) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
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
        this.containerless = p;
        this.isStrictBinding = m;
        this.shadowOptions = x;
        this.hasSlots = g;
        this.enhance = v;
        this.watches = b;
        this.processContent = w;
    }
    get type() {
        return 1;
    }
    static create(e, s = null) {
        if (null === s) {
            const i = e;
            if (B(i)) throw v(`AUR0761:${e}`);
            const n = t.fromDefinitionOrDefault("name", i, Ls);
            if (C(i.Type)) s = i.Type; else s = Fs(t.pascalCase(n));
            return new CustomElementDefinition(s, n, t.mergeArrays(i.aliases), t.fromDefinitionOrDefault("key", i, (() => Es(n))), t.fromDefinitionOrDefault("cache", i, Bs), t.fromDefinitionOrDefault("capture", i, Ss), t.fromDefinitionOrDefault("template", i, Rs), t.mergeArrays(i.instructions), t.mergeArrays(i.dependencies), t.fromDefinitionOrDefault("injectable", i, Rs), t.fromDefinitionOrDefault("needsCompile", i, Is), t.mergeArrays(i.surrogates), D.from(s, i.bindables), Zt.from(i.childrenObservers), t.fromDefinitionOrDefault("containerless", i, Ss), t.fromDefinitionOrDefault("isStrictBinding", i, Ss), t.fromDefinitionOrDefault("shadowOptions", i, Rs), t.fromDefinitionOrDefault("hasSlots", i, Ss), t.fromDefinitionOrDefault("enhance", i, Ss), t.fromDefinitionOrDefault("watches", i, Ts), t.fromAnnotationOrTypeOrDefault("processContent", s, Rs));
        }
        if (B(e)) return new CustomElementDefinition(s, e, t.mergeArrays($s(s, "aliases"), s.aliases), Es(e), t.fromAnnotationOrTypeOrDefault("cache", s, Bs), t.fromAnnotationOrTypeOrDefault("capture", s, Ss), t.fromAnnotationOrTypeOrDefault("template", s, Rs), t.mergeArrays($s(s, "instructions"), s.instructions), t.mergeArrays($s(s, "dependencies"), s.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", s, Rs), t.fromAnnotationOrTypeOrDefault("needsCompile", s, Is), t.mergeArrays($s(s, "surrogates"), s.surrogates), D.from(s, ...D.getAll(s), $s(s, "bindables"), s.bindables), Zt.from(...Zt.getAll(s), $s(s, "childrenObservers"), s.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", s, Ss), t.fromAnnotationOrTypeOrDefault("isStrictBinding", s, Ss), t.fromAnnotationOrTypeOrDefault("shadowOptions", s, Rs), t.fromAnnotationOrTypeOrDefault("hasSlots", s, Ss), t.fromAnnotationOrTypeOrDefault("enhance", s, Ss), t.mergeArrays(_t.getAnnotation(s), s.watches), t.fromAnnotationOrTypeOrDefault("processContent", s, Rs));
        const i = t.fromDefinitionOrDefault("name", e, Ls);
        return new CustomElementDefinition(s, i, t.mergeArrays($s(s, "aliases"), e.aliases, s.aliases), Es(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, s, Bs), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, s, Ss), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, s, Rs), t.mergeArrays($s(s, "instructions"), e.instructions, s.instructions), t.mergeArrays($s(s, "dependencies"), e.dependencies, s.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, s, Rs), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, s, Is), t.mergeArrays($s(s, "surrogates"), e.surrogates, s.surrogates), D.from(s, ...D.getAll(s), $s(s, "bindables"), s.bindables, e.bindables), Zt.from(...Zt.getAll(s), $s(s, "childrenObservers"), s.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, s, Ss), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, s, Ss), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, s, Rs), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, s, Ss), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, s, Ss), t.mergeArrays(e.watches, _t.getAnnotation(s), s.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, s, Rs));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (As.has(t)) return As.get(t);
        const e = CustomElementDefinition.create(t);
        As.set(t, e);
        a(Ps, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            W(s, e).register(t);
            N(s, e).register(t);
            X(i, js, s, t);
        }
    }
}

const Cs = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Bs = () => 0;

const Rs = () => null;

const Ss = () => false;

const Is = () => true;

const Ts = () => t.emptyArray;

const Ps = d("custom-element");

const Es = t => `${Ps}:${t}`;

const Ls = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Os = (t, e, s) => {
    a(f(e), s, t);
};

const Ds = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    a(Ps, s, s.Type);
    a(Ps, s, s);
    p(s.Type, Ps);
    return s.Type;
};

const qs = t => C(t) && h(Ps, t);

const Us = (t, e = Cs) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = rs(t, Ps);
        if (null === s) {
            if (true === e.optional) return null;
            throw v(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = rs(t, Ps);
            if (null === s) throw v(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = rs(s, Ps);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = us(s);
        }
        if (i) return;
        throw v(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = rs(s, Ps);
        if (null !== t) return t;
        s = us(s);
    }
    throw v(`AUR0765`);
};

const $s = (t, e) => l(f(e), t);

const _s = t => {
    const e = l(Ps, t);
    if (void 0 === e) throw v(`AUR0760:${t.name}`);
    return e;
};

const Ms = () => {
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

const Fs = function() {
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

const js = Object.freeze({
    name: Ps,
    keyFrom: Es,
    isType: qs,
    for: Us,
    define: Ds,
    getDefinition: _s,
    annotate: Os,
    getAnnotation: $s,
    generateName: Ls,
    createInjectable: Ms,
    generateType: Fs
});

const Vs = f("processContent");

function Ns(t) {
    return void 0 === t ? function(t, e, s) {
        a(Vs, Hs(t, e), t);
    } : function(e) {
        t = Hs(e, t);
        const s = l(Ps, e);
        if (void 0 !== s) s.processContent = t; else a(Vs, t, e);
        return e;
    };
}

function Hs(t, e) {
    if (B(e)) e = t[e];
    if (!C(e)) throw v(`AUR0766:${typeof e}`);
    return e;
}

function Ws(t) {
    return function(e) {
        const s = C(t) ? t : true;
        Os(e, "capture", s);
        if (qs(e)) _s(e).capture = s;
    };
}

const zs = j("IProjections");

const Gs = j("IAuSlotsInfo");

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
})(exports.InstructionType || (exports.InstructionType = {}));

const Xs = j("Instruction");

function Ks(t) {
    const e = t.type;
    return B(e) && 2 === e.length;
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
    constructor(t, e, s) {
        this.forOf = t;
        this.to = e;
        this.props = s;
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
    constructor(t, e, s) {
        this.value = t;
        this.to = e;
        this.command = s;
        this.type = "rl";
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

class ListenerBindingInstruction {
    constructor(t, e, s, i) {
        this.from = t;
        this.to = e;
        this.preventDefault = s;
        this.capture = i;
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

const Qs = j("ITemplateCompiler");

const Ys = j("IRenderer");

function Zs(t) {
    return function e(s) {
        s.register = function(t) {
            V(Ys, this).register(t);
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

function Js(t, e, s) {
    if (B(e)) return t.parse(e, s);
    return e;
}

function ti(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function ei(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Us(t);

      case "view":
        throw v(`AUR0750`);

      case "view-model":
        return Us(t).viewModel;

      default:
        {
            const s = Wt(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = Us(t, {
                name: e
            });
            if (void 0 === i) throw v(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let si = class SetPropertyRenderer {
    render(t, e, s) {
        const i = ti(e);
        if (void 0 !== i.$observers?.[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

si = r([ Zs("re") ], si);

let ii = class CustomElementRenderer {
    constructor(t) {
        this.r = t;
    }
    static get inject() {
        return [ Te ];
    }
    render(e, s, i, n, r, o) {
        let l;
        let h;
        let a;
        let c;
        const u = i.res;
        const f = i.projections;
        const d = e.container;
        switch (typeof u) {
          case "string":
            l = d.find(js, u);
            if (null == l) throw v(`AUR0752:${u}@${e["name"]}`);
            break;

          default:
            l = u;
        }
        const p = i.containerless || l.containerless;
        const m = p ? ds(s) : null;
        const x = Bi(n, e, s, i, m, null == f ? void 0 : new AuSlotsInfo(Object.keys(f)));
        h = l.Type;
        a = x.invoke(h);
        z(x, h, new t.InstanceProvider(l.key, a));
        c = Controller.$el(x, a, s, i, l, m);
        os(s, l.key, c);
        const g = this.r.renderers;
        const b = i.props;
        const w = b.length;
        let y = 0;
        let k;
        while (w > y) {
            k = b[y];
            g[k.type].render(e, c, k, n, r, o);
            ++y;
        }
        e.addChild(c);
    }
};

ii = r([ Zs("ra") ], ii);

let ni = class CustomAttributeRenderer {
    constructor(t) {
        this.r = t;
    }
    static get inject() {
        return [ Te ];
    }
    render(t, e, s, i, n, r) {
        let o = t.container;
        let l;
        switch (typeof s.res) {
          case "string":
            l = o.find(Xt, s.res);
            if (null == l) throw v(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            l = s.res;
        }
        const h = Ri(i, l, t, e, s, void 0, void 0);
        const a = Controller.$attr(h.ctn, h.vm, e, l);
        os(e, l.key, a);
        const c = this.r.renderers;
        const u = s.props;
        const f = u.length;
        let d = 0;
        let p;
        while (f > d) {
            p = u[d];
            c[p.type].render(t, a, p, i, n, r);
            ++d;
        }
        t.addChild(a);
    }
};

ni = r([ Zs("rb") ], ni);

let ri = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Te, re ];
    }
    render(t, e, s, i, n, r) {
        let o = t.container;
        let l;
        switch (typeof s.res) {
          case "string":
            l = o.find(Xt, s.res);
            if (null == l) throw v(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            l = s.res;
        }
        const h = this.r.getViewFactory(s.def, o);
        const a = ds(e);
        const c = Ri(this.p, l, t, e, s, h, a);
        const u = Controller.$attr(c.ctn, c.vm, e, l);
        os(a, l.key, u);
        c.vm.link?.(t, u, e, s);
        const f = this.r.renderers;
        const d = s.props;
        const p = d.length;
        let m = 0;
        let x;
        while (p > m) {
            x = d[m];
            f[x.type].render(t, u, x, i, n, r);
            ++m;
        }
        t.addChild(u);
    }
};

ri = r([ Zs("rc") ], ri);

let oi = class LetElementRenderer {
    render(t, e, s, i, n, r) {
        e.remove();
        const o = s.instructions;
        const l = s.toBindingContext;
        const h = t.container;
        const a = o.length;
        let c;
        let u;
        let f = 0;
        while (a > f) {
            c = o[f];
            u = Js(n, c.from, 16);
            t.addBinding(new LetBinding(h, r, u, c.to, l));
            ++f;
        }
    }
};

oi = r([ Zs("rd") ], oi);

let li = class RefBindingRenderer {
    render(t, e, s, i, n) {
        t.addBinding(new RefBinding(t.container, Js(n, s.from, 16), ei(e, s.to)));
    }
};

li = r([ Zs("rj") ], li);

let hi = class InterpolationBindingRenderer {
    render(t, e, s, i, n, r) {
        t.addBinding(new InterpolationBinding(t, t.container, r, i.domWriteQueue, Js(n, s.from, 1), ti(e), s.to, 2));
    }
};

hi = r([ Zs("rf") ], hi);

let ai = class PropertyBindingRenderer {
    render(t, e, s, i, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, i.domWriteQueue, Js(n, s.from, 16), ti(e), s.to, s.mode));
    }
};

ai = r([ Zs("rg") ], ai);

let ci = class IteratorBindingRenderer {
    render(t, e, s, i, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, i.domWriteQueue, Js(n, s.forOf, 2), ti(e), s.to, 2));
    }
};

ci = r([ Zs("rk") ], ci);

let ui = class TextBindingRenderer {
    render(t, e, s, i, n, r) {
        const o = t.container;
        const l = e.nextSibling;
        const h = e.parentNode;
        const a = i.document;
        const c = Js(n, s.from, 1);
        const u = c.parts;
        const f = c.expressions;
        const d = f.length;
        let p = 0;
        let m = u[0];
        let x;
        if ("" !== m) h.insertBefore(a.createTextNode(m), l);
        for (;d > p; ++p) {
            x = f[p];
            t.addBinding(new ContentBinding(t, o, r, i.domWriteQueue, i, x, h.insertBefore(a.createTextNode(""), l), s.strict));
            m = u[p + 1];
            if ("" !== m) h.insertBefore(a.createTextNode(m), l);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

ui = r([ Zs("ha") ], ui);

let fi = class ListenerBindingRenderer {
    render(t, e, s, i, n) {
        t.addBinding(new ListenerBinding(t.container, Js(n, s.from, 8), e, s.to, new ListenerBindingOptions(s.preventDefault, s.capture)));
    }
};

fi = r([ Zs("hb") ], fi);

let di = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

di = r([ Zs("he") ], di);

let pi = class SetClassAttributeRenderer {
    render(t, e, s) {
        bi(e.classList, s.value);
    }
};

pi = r([ Zs("hf") ], pi);

let mi = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

mi = r([ Zs("hg") ], mi);

let xi = class StylePropertyBindingRenderer {
    render(t, e, s, i, n, r) {
        t.addBinding(new PropertyBinding(t, t.container, r, i.domWriteQueue, Js(n, s.from, 16), e.style, s.to, 2));
    }
};

xi = r([ Zs("hd") ], xi);

let gi = class AttributeBindingRenderer {
    render(t, e, s, i, n, r) {
        t.addBinding(new AttributeBinding(t, t.container, r, i.domWriteQueue, Js(n, s.from, 16), e, s.attr, s.to, 2));
    }
};

gi = r([ Zs("hc") ], gi);

let vi = class SpreadRenderer {
    constructor(t, e) {
        this.ne = t;
        this.r = e;
    }
    static get inject() {
        return [ Qs, Te ];
    }
    render(e, s, i, n, r, o) {
        const l = e.container;
        const h = l.get(He);
        const a = this.r.renderers;
        const c = t => {
            let e = t;
            let s = h;
            while (null != s && e > 0) {
                s = s.parent;
                --e;
            }
            if (null == s) throw v("No scope context for spread binding.");
            return s;
        };
        const u = i => {
            const l = c(i);
            const h = wi(l);
            const f = this.ne.compileSpread(l.controller.definition, l.instruction?.captures ?? t.emptyArray, l.controller.container, s);
            let d;
            for (d of f) switch (d.type) {
              case "hs":
                u(i + 1);
                break;

              case "hp":
                a[d.instructions.type].render(h, Us(s), d.instructions, n, r, o);
                break;

              default:
                a[d.type].render(h, s, d, n, r, o);
            }
            e.addBinding(h);
        };
        u(0);
    }
};

vi = r([ Zs("hs") ], vi);

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
        if (null == e) throw v("Invalid spreading. Context scope is null/undefined");
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

function bi(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const wi = t => new SpreadBinding([], t);

const yi = "IController";

const ki = "IInstruction";

const Ai = "IRenderLocation";

const Ci = "IAuSlotsInfo";

function Bi(e, s, i, n, r, o) {
    const l = s.container.createChild();
    z(l, e.HTMLElement, z(l, e.Element, z(l, ls, new t.InstanceProvider("ElementResolver", i))));
    z(l, Ne, new t.InstanceProvider(yi, s));
    z(l, Xs, new t.InstanceProvider(ki, n));
    z(l, as, null == r ? Si : new RenderLocationProvider(r));
    z(l, Ie, Ii);
    z(l, Gs, null == o ? Ti : new t.InstanceProvider(Ci, o));
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
        if (!B(t.name) || 0 === t.name.length) throw v(`AUR0756`);
        return t;
    }
}

function Ri(e, s, i, n, r, o, l, h) {
    const a = i.container.createChild();
    z(a, e.HTMLElement, z(a, e.Element, z(a, ls, new t.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    z(a, Ne, new t.InstanceProvider(yi, i));
    z(a, Xs, new t.InstanceProvider(ki, r));
    z(a, as, null == l ? Si : new t.InstanceProvider(Ai, l));
    z(a, Ie, null == o ? Ii : new ViewFactoryProvider(o));
    z(a, Gs, null == h ? Ti : new t.InstanceProvider(Ci, h));
    return {
        vm: a.invoke(s.Type),
        ctn: a
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

const Si = new RenderLocationProvider(null);

const Ii = new ViewFactoryProvider(null);

const Ti = new t.InstanceProvider(Ci, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Pi(t) {
    return function(e) {
        return Di.define(t, e);
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
        if (B(e)) {
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
        V(s, e).register(t);
        N(s, e).register(t);
        X(i, Di, s, t);
    }
}

const Ei = d("binding-command");

const Li = t => `${Ei}:${t}`;

const Oi = (t, e) => l(f(e), t);

const Di = Object.freeze({
    name: Ei,
    keyFrom: Li,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        a(Ei, s, s.Type);
        a(Ei, s, s);
        p(e, Ei);
        return s.Type;
    },
    getAnnotation: Oi
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
        return new PropertyBindingInstruction(s.parse(o, 16), r, 1);
    }
};

exports.OneTimeBindingCommand = r([ Pi("one-time") ], exports.OneTimeBindingCommand);

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
        return new PropertyBindingInstruction(s.parse(o, 16), r, 2);
    }
};

exports.ToViewBindingCommand = r([ Pi("to-view") ], exports.ToViewBindingCommand);

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
        return new PropertyBindingInstruction(s.parse(o, 16), r, 4);
    }
};

exports.FromViewBindingCommand = r([ Pi("from-view") ], exports.FromViewBindingCommand);

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
        return new PropertyBindingInstruction(s.parse(o, 16), r, 6);
    }
};

exports.TwoWayBindingCommand = r([ Pi("two-way") ], exports.TwoWayBindingCommand);

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
        let a = n.rawValue;
        if (null == r) {
            l = i.isTwoWay(e.node, h) ? 6 : 2;
            h = i.map(e.node, h) ?? t.camelCase(h);
        } else {
            if ("" === a && 1 === e.def.type) a = t.camelCase(h);
            o = e.def.defaultBindingMode;
            l = 8 === r.mode || null == r.mode ? null == o || 8 === o ? 2 : o : r.mode;
            h = r.property;
        }
        return new PropertyBindingInstruction(s.parse(a, 16), h, l);
    }
};

exports.DefaultBindingCommand = r([ Pi("bind") ], exports.DefaultBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    constructor(t) {
        this.le = t;
    }
    get type() {
        return 0;
    }
    static get inject() {
        return [ J ];
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        const n = s.parse(e.attr.rawValue, 2);
        let r = t.emptyArray;
        if (n.semiIdx > -1) {
            const t = e.attr.rawValue.slice(n.semiIdx + 1);
            const s = t.indexOf(":");
            if (s > -1) {
                const e = t.slice(0, s).trim();
                const i = t.slice(s + 1).trim();
                const n = this.le.parse(e, i);
                r = [ new MultiAttrInstruction(i, n.target, n.command) ];
            }
        }
        return new IteratorBindingInstruction(n, i, r);
    }
};

exports.ForBindingCommand = r([ Pi("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, true, false);
    }
};

exports.TriggerBindingCommand = r([ Pi("trigger") ], exports.TriggerBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target, false, true);
    }
};

exports.CaptureBindingCommand = r([ Pi("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

exports.AttrBindingCommand = r([ Pi("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

exports.StyleBindingCommand = r([ Pi("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

exports.ClassBindingCommand = r([ Pi("class") ], exports.ClassBindingCommand);

let qi = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 16), t.attr.target);
    }
};

qi = r([ Pi("ref") ], qi);

let Ui = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Ui = r([ Pi("...$attrs") ], Ui);

const $i = j("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const _i = t => {
    const e = g();
    t = B(t) ? t.split(" ") : t;
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
        this.he = Object.assign(g(), {
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
        this.ae = _i("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.ce = _i("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return V($i, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.ae[t.nodeName] && true === this.ce[e] || true === this.he[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ re ];

const Mi = j("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ue = g();
        this.fe = g();
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
        return [ $i ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.ue)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw ji(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.fe;
        for (const s in t) {
            if (void 0 !== e[s]) throw ji(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return Fi(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.ue[t.nodeName]?.[e] ?? this.fe[e] ?? (y(t, e, this.svg) ? e : null);
    }
}

function Fi(t, e) {
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

function ji(t, e) {
    return v(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const Vi = j("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Ni = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.de = t.document.createElement("template");
    }
    createTemplate(t) {
        if (B(t)) {
            let e = Ni[t];
            if (void 0 === e) {
                const s = this.de;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.de = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Ni[t] = e;
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

TemplateElementFactory.inject = [ re ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return V(Qs, this).register(t);
    }
    compile(e, s, i) {
        const n = CustomElementDefinition.getOrCreate(e);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = zi);
        const r = new CompilationContext(e, s, i, null, null, void 0);
        const o = B(n.template) || !e.enhance ? r.pe.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const a = s.get(F(sn));
        const c = a.length;
        let u = 0;
        if (c > 0) while (c > u) {
            a[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(Ji)) throw v(`AUR0701`);
        this.me(h, r);
        this.xe(h, r);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || Ls(),
            dependencies: (e.dependencies ?? t.emptyArray).concat(r.deps ?? t.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.ge(o, r) : t.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, s, i, n) {
        const r = new CompilationContext(e, i, zi, null, null, void 0);
        const o = [];
        const l = r.ve(n.nodeName.toLowerCase());
        const h = null !== l;
        const a = r.ep;
        const c = s.length;
        let u = 0;
        let f;
        let d = null;
        let p;
        let m;
        let x;
        let g;
        let b;
        let w = null;
        let y;
        let k;
        let A;
        let C;
        for (;c > u; ++u) {
            f = s[u];
            A = f.target;
            C = f.rawValue;
            w = r.be(f);
            if (null !== w && (1 & w.type) > 0) {
                Xi.node = n;
                Xi.attr = f;
                Xi.bindable = null;
                Xi.def = null;
                o.push(w.build(Xi, r.ep, r.m));
                continue;
            }
            d = r.we(A);
            if (null !== d) {
                if (d.isTemplateController) throw v(`AUR0703:${A}`);
                x = BindablesInfo.from(d, true);
                k = false === d.noMultiBindings && null === w && Hi(C);
                if (k) m = this.ye(n, C, d, r); else {
                    b = x.primary;
                    if (null === w) {
                        y = a.parse(C, 1);
                        m = [ null === y ? new SetPropertyInstruction(C, b.property) : new InterpolationInstruction(y, b.property) ];
                    } else {
                        Xi.node = n;
                        Xi.attr = f;
                        Xi.bindable = b;
                        Xi.def = d;
                        m = [ w.build(Xi, r.ep, r.m) ];
                    }
                }
                (p ?? (p = [])).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(A) ? A : void 0, m));
                continue;
            }
            if (null === w) {
                y = a.parse(C, 1);
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[A];
                    if (void 0 !== g) {
                        y = a.parse(C, 1);
                        o.push(new SpreadElementPropBindingInstruction(null == y ? new SetPropertyInstruction(C, g.property) : new InterpolationInstruction(y, g.property)));
                        continue;
                    }
                }
                if (null != y) o.push(new InterpolationInstruction(y, r.m.map(n, A) ?? t.camelCase(A))); else switch (A) {
                  case "class":
                    o.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    o.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    o.push(new SetAttributeInstruction(C, A));
                }
            } else {
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[A];
                    if (void 0 !== g) {
                        Xi.node = n;
                        Xi.attr = f;
                        Xi.bindable = g;
                        Xi.def = l;
                        o.push(new SpreadElementPropBindingInstruction(w.build(Xi, r.ep, r.m)));
                        continue;
                    }
                }
                Xi.node = n;
                Xi.attr = f;
                Xi.bindable = null;
                Xi.def = null;
                o.push(w.build(Xi, r.ep, r.m));
            }
        }
        Wi();
        if (null != p) return p.concat(o);
        return o;
    }
    ge(e, s) {
        const i = [];
        const n = e.attributes;
        const r = s.ep;
        let o = n.length;
        let l = 0;
        let h;
        let a;
        let c;
        let u;
        let f = null;
        let d;
        let p;
        let m;
        let x;
        let g = null;
        let b;
        let w;
        let y;
        let k;
        for (;o > l; ++l) {
            h = n[l];
            a = h.name;
            c = h.value;
            u = s.le.parse(a, c);
            y = u.target;
            k = u.rawValue;
            if (Ki[y]) throw v(`AUR0702:${a}`);
            g = s.be(u);
            if (null !== g && (1 & g.type) > 0) {
                Xi.node = e;
                Xi.attr = u;
                Xi.bindable = null;
                Xi.def = null;
                i.push(g.build(Xi, s.ep, s.m));
                continue;
            }
            f = s.we(y);
            if (null !== f) {
                if (f.isTemplateController) throw v(`AUR0703:${y}`);
                m = BindablesInfo.from(f, true);
                w = false === f.noMultiBindings && null === g && Hi(k);
                if (w) p = this.ye(e, k, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        b = r.parse(k, 1);
                        p = [ null === b ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(b, x.property) ];
                    } else {
                        Xi.node = e;
                        Xi.attr = u;
                        Xi.bindable = x;
                        Xi.def = f;
                        p = [ g.build(Xi, s.ep, s.m) ];
                    }
                }
                e.removeAttribute(a);
                --l;
                --o;
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(y) ? y : void 0, p));
                continue;
            }
            if (null === g) {
                b = r.parse(k, 1);
                if (null != b) {
                    e.removeAttribute(a);
                    --l;
                    --o;
                    i.push(new InterpolationInstruction(b, s.m.map(e, y) ?? t.camelCase(y)));
                } else switch (a) {
                  case "class":
                    i.push(new SetClassAttributeInstruction(k));
                    break;

                  case "style":
                    i.push(new SetStyleAttributeInstruction(k));
                    break;

                  default:
                    i.push(new SetAttributeInstruction(k, a));
                }
            } else {
                Xi.node = e;
                Xi.attr = u;
                Xi.bindable = null;
                Xi.def = null;
                i.push(g.build(Xi, s.ep, s.m));
            }
        }
        Wi();
        if (null != d) return d.concat(i);
        return i;
    }
    xe(t, e) {
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
                let s = t.firstChild;
                while (null !== s) s = this.xe(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    ke(e, i) {
        const n = e.attributes;
        const r = n.length;
        const o = [];
        const l = i.ep;
        let h = false;
        let a = 0;
        let c;
        let u;
        let f;
        let d;
        let p;
        let m;
        let x;
        let g;
        for (;r > a; ++a) {
            c = n[a];
            f = c.name;
            d = c.value;
            if ("to-binding-context" === f) {
                h = true;
                continue;
            }
            u = i.le.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.be(u);
            if (null !== p) {
                if ("bind" === u.command) o.push(new LetBindingInstruction(l.parse(x, 16), t.camelCase(m))); else throw v(`AUR0704:${u.command}`);
                continue;
            }
            g = l.parse(x, 1);
            o.push(new LetBindingInstruction(null === g ? new s.PrimitiveLiteralExpression(x) : g, t.camelCase(m)));
        }
        i.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.Be(e).nextSibling;
    }
    Ae(e, s) {
        var i, n, r, o;
        const l = e.nextSibling;
        const h = (e.getAttribute("as-element") ?? e.nodeName).toLowerCase();
        const a = s.ve(h);
        const c = null !== a;
        const u = c && null != a.shadowOptions;
        const f = a?.capture;
        const d = null != f && "boolean" !== typeof f;
        const p = f ? [] : t.emptyArray;
        const m = s.ep;
        const x = this.debug ? t.noop : () => {
            e.removeAttribute(A);
            --y;
            --w;
        };
        let g = e.attributes;
        let b;
        let w = g.length;
        let y = 0;
        let k;
        let A;
        let C;
        let B;
        let R;
        let S;
        let I = null;
        let T = false;
        let P;
        let E;
        let L;
        let O;
        let D;
        let q;
        let U;
        let $ = null;
        let _;
        let M;
        let F;
        let j;
        let V = true;
        let N = false;
        let H = false;
        if ("slot" === h) {
            if (null == s.root.def.shadowOptions) throw v(`AUR0717:${s.root.def.name}`);
            s.root.hasSlot = true;
        }
        if (c) {
            V = a.processContent?.call(a.Type, e, s.p);
            g = e.attributes;
            w = g.length;
        }
        if (s.root.def.enhance && e.classList.contains("au")) throw v(`AUR0705`);
        for (;w > y; ++y) {
            k = g[y];
            A = k.name;
            C = k.value;
            switch (A) {
              case "as-element":
              case "containerless":
                x();
                if (!N) N = "containerless" === A;
                continue;
            }
            B = s.le.parse(A, C);
            $ = s.be(B);
            F = B.target;
            j = B.rawValue;
            if (f && (!d || d && f(F))) {
                if (null != $ && 1 & $.type) {
                    x();
                    p.push(B);
                    continue;
                }
                H = "au-slot" !== F && "slot" !== F;
                if (H) {
                    _ = BindablesInfo.from(a, false);
                    if (null == _.attrs[F] && !s.we(F)?.isTemplateController) {
                        x();
                        p.push(B);
                        continue;
                    }
                }
            }
            if (null !== $ && 1 & $.type) {
                Xi.node = e;
                Xi.attr = B;
                Xi.bindable = null;
                Xi.def = null;
                (R ?? (R = [])).push($.build(Xi, s.ep, s.m));
                x();
                continue;
            }
            I = s.we(F);
            if (null !== I) {
                _ = BindablesInfo.from(I, true);
                T = false === I.noMultiBindings && null === $ && Hi(j);
                if (T) L = this.ye(e, j, I, s); else {
                    M = _.primary;
                    if (null === $) {
                        q = m.parse(j, 1);
                        L = [ null === q ? new SetPropertyInstruction(j, M.property) : new InterpolationInstruction(q, M.property) ];
                    } else {
                        Xi.node = e;
                        Xi.attr = B;
                        Xi.bindable = M;
                        Xi.def = I;
                        L = [ $.build(Xi, s.ep, s.m) ];
                    }
                }
                x();
                if (I.isTemplateController) (O ?? (O = [])).push(new HydrateTemplateController(Gi, this.resolveResources ? I : I.name, void 0, L)); else (E ?? (E = [])).push(new HydrateAttributeInstruction(this.resolveResources ? I : I.name, null != I.aliases && I.aliases.includes(F) ? F : void 0, L));
                continue;
            }
            if (null === $) {
                if (c) {
                    _ = BindablesInfo.from(a, false);
                    P = _.attrs[F];
                    if (void 0 !== P) {
                        q = m.parse(j, 1);
                        (S ?? (S = [])).push(null == q ? new SetPropertyInstruction(j, P.property) : new InterpolationInstruction(q, P.property));
                        x();
                        continue;
                    }
                }
                q = m.parse(j, 1);
                if (null != q) {
                    x();
                    (R ?? (R = [])).push(new InterpolationInstruction(q, s.m.map(e, F) ?? t.camelCase(F)));
                }
                continue;
            }
            x();
            if (c) {
                _ = BindablesInfo.from(a, false);
                P = _.attrs[F];
                if (void 0 !== P) {
                    Xi.node = e;
                    Xi.attr = B;
                    Xi.bindable = P;
                    Xi.def = a;
                    (S ?? (S = [])).push($.build(Xi, s.ep, s.m));
                    continue;
                }
            }
            Xi.node = e;
            Xi.attr = B;
            Xi.bindable = null;
            Xi.def = null;
            (R ?? (R = [])).push($.build(Xi, s.ep, s.m));
        }
        Wi();
        if (this.Re(e) && null != R && R.length > 1) this.Se(e, R);
        if (c) {
            U = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, S ?? t.emptyArray, null, N, p);
            if (h === an) {
                const t = e.getAttribute("name") || hn;
                const i = s.h("template");
                const n = s.Ie();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else i.content.appendChild(r);
                    r = e.firstChild;
                }
                this.xe(i.content, n);
                U.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: Ls(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.Te(e, s);
            }
        }
        if (null != R || null != U || null != E) {
            b = t.emptyArray.concat(U ?? t.emptyArray, E ?? t.emptyArray, R ?? t.emptyArray);
            this.Be(e);
        }
        let W;
        if (null != O) {
            w = O.length - 1;
            y = w;
            D = O[y];
            let t;
            this.Te(e, s);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = s.h("template");
                t.content.appendChild(e);
            }
            const r = t;
            const o = s.Ie(null == b ? [] : [ b ]);
            let l;
            let f;
            let d;
            let p;
            let m;
            let x;
            let g;
            let k;
            let A = 0, C = 0;
            let B = e.firstChild;
            let R = false;
            if (false !== V) while (null !== B) {
                f = 1 === B.nodeType ? B.getAttribute(an) : null;
                if (null !== f) B.removeAttribute(an);
                if (c) {
                    l = B.nextSibling;
                    if (!u) {
                        R = 3 === B.nodeType && "" === B.textContent.trim();
                        if (!R) ((i = p ?? (p = {}))[n = f || hn] ?? (i[n] = [])).push(B);
                        e.removeChild(B);
                    }
                    B = l;
                } else {
                    if (null !== f) {
                        f = f || hn;
                        throw v(`AUR0706:${h}[${f}]`);
                    }
                    B = B.nextSibling;
                }
            }
            if (null != p) {
                d = {};
                for (f in p) {
                    t = s.h("template");
                    m = p[f];
                    for (A = 0, C = m.length; C > A; ++A) {
                        x = m[A];
                        if ("TEMPLATE" === x.nodeName) if (x.attributes.length > 0) t.content.appendChild(x); else t.content.appendChild(x.content); else t.content.appendChild(x);
                    }
                    k = s.Ie();
                    this.xe(t.content, k);
                    d[f] = CustomElementDefinition.create({
                        name: Ls(),
                        template: t,
                        instructions: k.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                U.projections = d;
            }
            if (c && (N || a.containerless)) this.Te(e, s);
            W = !c || !a.containerless && !N && false !== V;
            if (W) if ("TEMPLATE" === e.nodeName) this.xe(e.content, o); else {
                B = e.firstChild;
                while (null !== B) B = this.xe(B, o);
            }
            D.def = CustomElementDefinition.create({
                name: Ls(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: s.root.def.isStrictBinding
            });
            while (y-- > 0) {
                D = O[y];
                t = s.h("template");
                g = s.h("au-m");
                g.classList.add("au");
                t.content.appendChild(g);
                D.def = CustomElementDefinition.create({
                    name: Ls(),
                    template: t,
                    needsCompile: false,
                    instructions: [ [ O[y + 1] ] ],
                    isStrictBinding: s.root.def.isStrictBinding
                });
            }
            s.rows.push([ D ]);
        } else {
            if (null != b) s.rows.push(b);
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
            let w = 0, y = 0;
            if (false !== V) while (null !== t) {
                n = 1 === t.nodeType ? t.getAttribute(an) : null;
                if (null !== n) t.removeAttribute(an);
                if (c) {
                    i = t.nextSibling;
                    if (!u) {
                        g = 3 === t.nodeType && "" === t.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || hn] ?? (r[o] = [])).push(t);
                        e.removeChild(t);
                    }
                    t = i;
                } else {
                    if (null !== n) {
                        n = n || hn;
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
                    for (w = 0, y = d.length; y > w; ++w) {
                        p = d[w];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) m.content.appendChild(p); else m.content.appendChild(p.content); else m.content.appendChild(p);
                    }
                    x = s.Ie();
                    this.xe(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: Ls(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                U.projections = l;
            }
            if (c && (N || a.containerless)) this.Te(e, s);
            W = !c || !a.containerless && !N && false !== V;
            if (W && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.xe(t, s);
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
        r.insertBefore(this.Be(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    ye(t, e, s, i) {
        const n = BindablesInfo.from(s, true);
        const r = e.length;
        const o = [];
        let l;
        let h;
        let a = 0;
        let c = 0;
        let u;
        let f;
        let d;
        let p;
        for (let m = 0; m < r; ++m) {
            c = e.charCodeAt(m);
            if (92 === c) ++m; else if (58 === c) {
                l = e.slice(a, m);
                while (e.charCodeAt(++m) <= 32) ;
                a = m;
                for (;m < r; ++m) {
                    c = e.charCodeAt(m);
                    if (92 === c) ++m; else if (59 === c) {
                        h = e.slice(a, m);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(a);
                f = i.le.parse(l, h);
                d = i.be(f);
                p = n.attrs[f.target];
                if (null == p) throw v(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    Xi.node = t;
                    Xi.attr = f;
                    Xi.bindable = p;
                    Xi.def = s;
                    o.push(d.build(Xi, i.ep, i.m));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                a = m;
                l = void 0;
                h = void 0;
            }
        }
        Wi();
        return o;
    }
    me(e, s) {
        const i = e;
        const n = t.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw v(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const e of n) {
            if (e.parentNode !== i) throw v(`AUR0709`);
            const n = tn(e, o);
            const r = class LocalTemplate {};
            const h = e.content;
            const a = t.toArray(h.querySelectorAll("bindable"));
            const c = D.for(r);
            const u = new Set;
            const f = new Set;
            for (const t of a) {
                if (t.parentNode !== h) throw v(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw v(`AUR0711`);
                const s = t.getAttribute("attribute");
                if (null !== s && f.has(s) || u.has(e)) throw v(`AUR0712:${e}+${s}`); else {
                    if (null !== s) f.add(s);
                    u.add(e);
                }
                c.add({
                    property: e,
                    attribute: s ?? void 0,
                    mode: en(t)
                });
                const i = t.getAttributeNames().filter((t => !Zi.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Pe(Ds({
                name: n,
                template: e
            }, r));
            i.removeChild(e);
        }
        let h = 0;
        const a = l.length;
        for (;a > h; ++h) _s(l[h]).dependencies.push(...s.def.dependencies ?? t.emptyArray, ...s.deps ?? t.emptyArray);
    }
    Re(t) {
        return "INPUT" === t.nodeName && 1 === Qi[t.type];
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
    Be(t) {
        t.classList.add("au");
        return t;
    }
    Te(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.Be(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(e, i, n, r, o, l) {
        this.hasSlot = false;
        this.Ee = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = e;
        this.ci = n;
        this.parent = r;
        this.pe = h ? r.pe : i.get(Vi);
        this.le = h ? r.le : i.get(J);
        this.ep = h ? r.ep : i.get(s.IExpressionParser);
        this.m = h ? r.m : i.get(Mi);
        this.Le = h ? r.Le : i.get(t.ILogger);
        this.p = h ? r.p : i.get(re);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
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
    ve(t) {
        return this.c.find(js, t);
    }
    we(t) {
        return this.c.find(Xt, t);
    }
    Ie(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    be(t) {
        if (this.root !== this) return this.root.be(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.Ee[e];
        if (void 0 === s) {
            s = this.c.create(Di, e);
            if (null === s) throw v(`AUR0713:${e}`);
            this.Ee[e] = s;
        }
        return s;
    }
}

function Hi(t) {
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

function Wi() {
    Xi.node = Xi.attr = Xi.bindable = Xi.def = null;
}

const zi = {
    projections: null
};

const Gi = {
    name: "unnamed"
};

const Xi = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const Ki = Object.assign(g(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const Qi = {
    checkbox: 1,
    radio: 1
};

const Yi = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = Yi.get(t);
        if (null == s) {
            const i = t.bindables;
            const n = g();
            const r = e ? void 0 === t.defaultBindingMode ? 8 : t.defaultBindingMode : 8;
            let o;
            let l;
            let h = false;
            let a;
            let c;
            for (l in i) {
                o = i[l];
                c = o.attribute;
                if (true === o.primary) {
                    if (h) throw v(`AUR0714:${t.name}`);
                    h = true;
                    a = o;
                } else if (!h && null == a) a = o;
                n[c] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) a = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            Yi.set(t, s = new BindablesInfo(n, i, a));
        }
        return s;
    }
}

const Zi = Object.freeze([ "property", "attribute", "mode" ]);

const Ji = "as-custom-element";

function tn(t, e) {
    const s = t.getAttribute(Ji);
    if (null === s || "" === s) throw v(`AUR0715`);
    if (e.has(s)) throw v(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(Ji);
    }
    return s;
}

function en(t) {
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

const sn = j("ITemplateCompilerHooks");

const nn = new WeakMap;

const rn = d("compiler-hooks");

const on = Object.freeze({
    name: rn,
    define(t) {
        let e = nn.get(t);
        if (void 0 === e) {
            nn.set(t, e = new TemplateCompilerHooksDefinition(t));
            a(rn, e, t);
            p(t, rn);
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
        t.register(V(sn, this.Type));
    }
}

const ln = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return on.define(t);
    }
};

const hn = "default";

const an = "au-slot";

const cn = new Map;

class BindingModeBehavior {
    bind(t, e) {
        cn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = cn.get(e);
        cn.delete(e);
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

ut("oneTime")(OneTimeBindingBehavior);

ut("toView")(ToViewBindingBehavior);

ut("fromView")(FromViewBindingBehavior);

ut("twoWay")(TwoWayBindingBehavior);

const un = new WeakMap;

const fn = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, s) {
        s = Number(s);
        const i = {
            type: "debounce",
            delay: s > 0 ? s : fn,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(i);
        if (null == n) ; else un.set(e, n);
    }
    unbind(t, e) {
        un.get(e)?.dispose();
        un.delete(e);
    }
}

DebounceBindingBehavior.inject = [ t.IPlatform ];

ut("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Oe = new Map;
        this.De = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw v(`AUR0817`);
        if (0 === s.length) throw v(`AUR0818`);
        this.Oe.set(e, s);
        let i;
        for (i of s) this.De.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.Oe.get(e);
        this.Oe.delete(e);
        let i;
        for (i of s) this.De.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ s.ISignaler ];

ut("signal")(SignalBindingBehavior);

const dn = new WeakMap;

const pn = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.qe = t.performanceNow;
        this.ht = t.taskQueue;
    }
    bind(t, e, s) {
        s = Number(s);
        const i = {
            type: "throttle",
            delay: s > 0 ? s : pn,
            now: this.qe,
            queue: this.ht
        };
        const n = e.limit?.(i);
        if (null == n) ; else dn.set(e, n);
    }
    unbind(t, e) {
        dn.get(e)?.dispose();
        dn.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ t.IPlatform ];

ut("throttle")(ThrottleBindingBehavior);

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

ce(DataAttributeAccessor);

const mn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        if (!(e instanceof PropertyBinding)) throw v(`AURxxxx`);
        e.useTargetObserver(mn);
    }
}

ut("attr")(AttrBindingBehavior);

class SelfBindingBehavior {
    bind(t, e) {
        if (!(e instanceof ListenerBinding)) throw v(`AUR0801`);
        e.self = true;
    }
    unbind(t, e) {
        e.self = false;
    }
}

ut("self")(SelfBindingBehavior);

const xn = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return xn[t] ?? (xn[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

ce(AttributeNSAccessor);

function gn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Ue = void 0;
        this.$e = void 0;
        this.yt = false;
        this.wt = t;
        this.oL = i;
        this.bt = s;
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
        this.Me();
        this.st();
    }
    handleCollectionChange() {
        this.Me();
    }
    handleChange(t, e) {
        this.Me();
    }
    Me() {
        const t = this.v;
        const e = this.wt;
        const s = b.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : gn;
        if (i) e.checked = !!n(t, s); else if (true === t) e.checked = true; else {
            let i = false;
            if (A(t)) i = -1 !== t.findIndex((t => !!n(t, s))); else if (t instanceof Set) {
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
        const e = this.wt;
        const s = b.call(e, "model") ? e.model : e.value;
        const i = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : gn;
        if ("checkbox" === e.type) {
            if (A(t)) {
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
        this.st();
    }
    kt() {
        this._e();
    }
    At() {
        this.Ue?.unsubscribe(this);
        this.$e?.unsubscribe(this);
        this.Ue = this.$e = void 0;
    }
    st() {
        vn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, vn);
    }
    _e() {
        const t = this.wt;
        (this.$e ?? (this.$e = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Ue?.unsubscribe(this);
        this.Ue = void 0;
        if ("checkbox" === t.type) (this.Ue = Pn(this.v, this.oL))?.subscribe(this);
    }
}

he(CheckedObserver);

s.subscriberCollection(CheckedObserver);

let vn;

const bn = {
    childList: true,
    subtree: true,
    characterData: true
};

function wn(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Z = false;
        this.Fe = void 0;
        this.je = void 0;
        this.iO = false;
        this.yt = false;
        this.wt = t;
        this.oL = i;
        this.bt = s;
    }
    getValue() {
        return this.iO ? this.v : this.wt.multiple ? yn(this.wt.options) : this.wt.value;
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
        const s = A(t);
        const i = e.matcher ?? wn;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = b.call(e, "model") ? e.model : e.value;
            if (s) {
                e.selected = -1 !== t.findIndex((t => !!i(o, t)));
                continue;
            }
            e.selected = !!i(o, t);
        }
    }
    syncValue() {
        const t = this.wt;
        const e = t.options;
        const s = e.length;
        const i = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(i instanceof Array)) return true;
            let r;
            const o = t.matcher || wn;
            const l = [];
            while (n < s) {
                r = e[n];
                if (r.selected) l.push(b.call(r, "model") ? r.model : r.value);
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
                r = b.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    kt() {
        (this.je = new this.wt.ownerDocument.defaultView.MutationObserver(this.Ne.bind(this))).observe(this.wt, bn);
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
            if (!this.wt.multiple) throw v(`AUR0654`);
            (this.Fe = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.st();
    }
    Ne(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.st();
    }
    st() {
        kn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, kn);
    }
}

he(SelectValueObserver);

s.subscriberCollection(SelectValueObserver);

function yn(t) {
    const e = [];
    if (0 === t.length) return e;
    const s = t.length;
    let i = 0;
    let n;
    while (s > i) {
        n = t[i];
        if (n.selected) e[e.length] = b.call(n, "model") ? n.model : n.value;
        ++i;
    }
    return e;
}

let kn;

const An = "--";

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
            if (B(s)) {
                if (i.startsWith(An)) {
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
        if (B(e)) return this.He(e);
        if (e instanceof Array) return this.Ge(e);
        if (e instanceof Object) return this.We(e);
        return t.emptyArray;
    }
    et() {
        if (this.Z) {
            this.Z = false;
            const t = this.v;
            const e = this.styles;
            const s = this.ze(t);
            let i;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const a = s.length;
            for (;h < a; ++h) {
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
                if (!b.call(e, i) || e[i] !== n) continue;
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
        this.v = this.ov = this.obj.style.cssText;
    }
}

ce(StyleAttributeAccessor);

class ValueAttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.Z = false;
        this.yt = false;
        this.wt = t;
        this.k = e;
        this.bt = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (I(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.Z = true;
        if (!this.bt.readonly) this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.wt[this.k] = this.v ?? this.bt.default;
            this.st();
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.wt[this.k];
        if (this.ov !== this.v) {
            this.Z = false;
            this.st();
        }
    }
    kt() {
        this.v = this.ov = this.wt[this.k];
    }
    st() {
        Cn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Cn);
    }
}

he(ValueAttributeObserver);

s.subscriberCollection(ValueAttributeObserver);

let Cn;

const Bn = "http://www.w3.org/1999/xlink";

const Rn = "http://www.w3.org/XML/1998/namespace";

const Sn = "http://www.w3.org/2000/xmlns/";

const In = Object.assign(g(), {
    "xlink:actuate": [ "actuate", Bn ],
    "xlink:arcrole": [ "arcrole", Bn ],
    "xlink:href": [ "href", Bn ],
    "xlink:role": [ "role", Bn ],
    "xlink:show": [ "show", Bn ],
    "xlink:title": [ "title", Bn ],
    "xlink:type": [ "type", Bn ],
    "xml:lang": [ "lang", Rn ],
    "xml:space": [ "space", Rn ],
    xmlns: [ "xmlns", Sn ],
    "xmlns:xlink": [ "xlink", Sn ]
});

const Tn = new s.PropertyAccessor;

Tn.type = 2 | 4;

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
        N(s.INodeObserverLocator, NodeObserverLocator).register(t);
        V(s.INodeObserverLocator, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.Xe;
        let n;
        if (B(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = s; else En(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = r[e]; else En(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = t[e]; else En("*", e); else if (null == s[t]) s[t] = e; else En("*", t);
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
            return mn;

          default:
            {
                const t = In[s];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (y(e, s, this.svgAnalyzer)) return mn;
                return Tn;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (B(t)) {
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
    getNodeObserverConfig(t, e) {
        return this.Xe[t.tagName]?.[e] ?? this.Ke[e];
    }
    getNodeObserver(t, e, i) {
        const n = this.Xe[t.tagName]?.[e] ?? this.Ke[e];
        let r;
        if (null != n) {
            r = new (n.type ?? ValueAttributeObserver)(t, e, n, i, this.locator);
            if (!r.doNotCache) s.getObserverLookup(t)[e] = r;
            return r;
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
        const n = this.getNodeObserver(t, e, i);
        if (null != n) return n;
        const r = In[e];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (y(t, e, this.svgAnalyzer)) return mn;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw v(`AUR0652:${String(e)}`);
        } else return new s.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, re, s.IDirtyChecker, $i ];

function Pn(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function En(t, e) {
    throw v(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t, e) {
        if (!(e instanceof NodeObserverLocator)) throw v("AURxxxx: updateTrigger binding behavior only works with the default implementation of Aurelia HTML observation. Implement your own node observation + updateTrigger");
        this.oL = t;
        this.Ze = e;
    }
    bind(t, e, ...s) {
        if (0 === s.length) throw v(`AUR0802`);
        if (!(e instanceof PropertyBinding) || !(4 & e.mode)) throw v(`AUR0803`);
        const i = this.Ze.getNodeObserverConfig(e.target, e.targetProperty);
        if (null == i) throw v(`AURxxxx`);
        const n = this.Ze.getNodeObserver(e.target, e.targetProperty, this.oL);
        n.useConfig({
            readonly: i.readonly,
            default: i.default,
            events: s
        });
        e.useTargetObserver(n);
    }
}

UpdateTriggerBindingBehavior.inject = [ s.IObserverLocator, s.INodeObserverLocator ];

ut("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.Je = false;
        this.ts = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.es(); else this.Je = true;
    }
    attached() {
        if (this.Je) {
            this.Je = false;
            this.es();
        }
        this.ts.addEventListener("focus", this);
        this.ts.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ts;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.ss) this.value = false;
    }
    es() {
        const t = this.ts;
        const e = this.ss;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get ss() {
        return this.ts === this.p.document.activeElement;
    }
}

Focus.inject = [ ls, re ];

r([ E({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Mt("focus")(Focus);

let Ln = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.rs = false;
        this.ot = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.ot = null;
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
        this.rs = true;
        this.update();
    }
    detaching() {
        this.rs = false;
        this.ot?.cancel();
        this.ot = null;
    }
    valueChanged() {
        if (this.rs && null === this.ot) this.ot = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ E ], Ln.prototype, "value", void 0);

Ln = r([ o(0, ls), o(1, re), o(2, Xs) ], Ln);

G("hide")(Ln);

Mt("show")(Ln);

class Portal {
    constructor(t, e, s) {
        this.strict = false;
        this.p = s;
        this.cs = s.document.createElement("div");
        this.view = t.create();
        fs(this.view.nodes, e);
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
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, i), (() => this.bs(s)));
        return this.bs(s);
    }
    bs(t) {
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
        if (B(s)) {
            let n = e;
            if (B(i)) i = e.querySelector(i);
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

Portal.inject = [ Ie, as, re ];

r([ E({
    primary: true
}) ], Portal.prototype, "target", void 0);

r([ E({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

r([ E() ], Portal.prototype, "strict", void 0);

r([ E() ], Portal.prototype, "deactivating", void 0);

r([ E() ], Portal.prototype, "activating", void 0);

r([ E() ], Portal.prototype, "deactivated", void 0);

r([ E() ], Portal.prototype, "activated", void 0);

r([ E() ], Portal.prototype, "callbackContext", void 0);

Ft("portal")(Portal);

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
        this.ys = 0;
        this.ks = t;
        this.l = e;
    }
    attaching(e, s, i) {
        let n;
        const r = this.$controller;
        const o = this.ys++;
        const l = () => !this.ws && this.ys === o + 1;
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
        const o = this.ys++;
        const l = () => !this.ws && this.ys === o + 1;
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

If.inject = [ Ie, as ];

r([ E ], If.prototype, "value", void 0);

r([ E({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Ft("if")(If);

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

Else.inject = [ Ie ];

Ft({
    name: "else"
})(Else);

function On(t) {
    t.dispose();
}

const Dn = [ 18, 17 ];

class Repeat {
    constructor(t, e, s, i, n) {
        this.views = [];
        this.key = null;
        this.As = new Map;
        this.Cs = new Map;
        this.Bs = void 0;
        this.Rs = false;
        this.Ss = false;
        this.Is = null;
        this.Ts = void 0;
        this.Ps = false;
        const r = t.props[0].props[0];
        if (void 0 !== r) {
            const {to: t, value: s, command: i} = r;
            if ("key" === t) if (null === i) this.key = s; else if ("bind" === i) this.key = e.parse(s, 16); else throw v(`AUR775:${i}`); else throw v(`AUR776:${t}`);
        }
        this.l = s;
        this.Es = i;
        this.f = n;
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
                this.Ls = o;
                let t = l.iterable;
                while (null != t && Dn.includes(t.$kind)) {
                    t = t.expression;
                    this.Rs = true;
                }
                this.Is = t;
                break;
            }
        }
        this.Os();
        const a = l.declaration;
        if (!(this.Ps = 24 === a.$kind || 25 === a.$kind)) this.local = s.astEvaluate(a, this.$controller.scope, o, null);
    }
    attaching(t, e, s) {
        this.Ds();
        return this.qs(t);
    }
    detaching(t, e, s) {
        this.Os();
        return this.Us(t);
    }
    unbinding(t, e, s) {
        this.Cs.clear();
        this.As.clear();
    }
    itemsChanged() {
        if (!this.$controller.isActive) return;
        this.Os();
        this.Ds();
        this.$s(this.items, void 0);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.Rs) {
            if (this.Ss) return;
            this.Ss = true;
            this.items = s.astEvaluate(this.forOf.iterable, i.scope, this.Ls, null);
            this.Ss = false;
            return;
        }
        this.Ds();
        this.$s(t, e);
    }
    $s(e, i) {
        const n = this.views;
        const r = n.length;
        const o = this.key;
        const l = null !== o;
        if (l || void 0 === i) {
            const t = this.local;
            const e = this.Ts;
            const h = e.length;
            const a = this.forOf;
            const c = a.declaration;
            const u = this.Ls;
            const f = this.Ps;
            i = s.createIndexMap(h);
            let d = 0;
            if (0 === r) for (;d < h; ++d) i[d] = -2; else if (0 === h) if (f) for (d = 0; d < r; ++d) {
                i.deletedIndices.push(d);
                i.deletedItems.push(s.astEvaluate(c, n[d].scope, u, null));
            } else for (d = 0; d < r; ++d) {
                i.deletedIndices.push(d);
                i.deletedItems.push(n[d].scope.bindingContext[t]);
            } else {
                const p = Array(r);
                if (f) for (d = 0; d < r; ++d) p[d] = s.astEvaluate(c, n[d].scope, u, null); else for (d = 0; d < r; ++d) p[d] = n[d].scope.bindingContext[t];
                let m;
                let x;
                let g;
                let v;
                let b = 0;
                const w = r - 1;
                const y = h - 1;
                const k = new Map;
                const A = new Map;
                const C = this.As;
                const B = this.Cs;
                const R = this.$controller.scope;
                d = 0;
                t: {
                    while (true) {
                        m = p[d];
                        x = e[d];
                        g = l ? Xn(C, o, m, Kn(B, p[d], a, R, u, t, f), u) : m;
                        v = l ? Xn(C, o, x, Kn(B, e[d], a, R, u, t, f), u) : x;
                        if (g !== v) {
                            C.set(m, g);
                            C.set(x, v);
                            break;
                        }
                        ++d;
                        if (d > w || d > y) break t;
                    }
                    if (w !== y) break t;
                    b = y;
                    while (true) {
                        m = p[b];
                        x = e[b];
                        g = l ? Xn(C, o, m, Kn(B, m, a, R, u, t, f), u) : m;
                        v = l ? Xn(C, o, x, Kn(B, x, a, R, u, t, f), u) : x;
                        if (g !== v) {
                            C.set(m, g);
                            C.set(x, v);
                            break;
                        }
                        --b;
                        if (d > b) break t;
                    }
                }
                const S = d;
                const I = d;
                for (d = I; d <= y; ++d) {
                    if (C.has(x = e[d])) v = C.get(x); else {
                        v = l ? Xn(C, o, x, Kn(B, x, a, R, u, t, f), u) : x;
                        C.set(x, v);
                    }
                    A.set(v, d);
                }
                for (d = S; d <= w; ++d) {
                    if (C.has(m = p[d])) g = C.get(m); else g = l ? Xn(C, o, m, n[d].scope, u) : m;
                    k.set(g, d);
                    if (A.has(g)) i[A.get(g)] = d; else {
                        i.deletedIndices.push(d);
                        i.deletedItems.push(m);
                    }
                }
                for (d = I; d <= y; ++d) if (!k.has(C.get(e[d]))) i[d] = -2;
                k.clear();
                A.clear();
            }
        }
        if (void 0 === i) {
            const e = t.onResolve(this.Us(null), (() => this.qs(null)));
            if (k(e)) e.catch(S);
        } else {
            const e = s.applyMutationsToIndices(i);
            if (e.deletedIndices.length > 0) {
                const s = t.onResolve(this._s(e), (() => this.Ms(r, e)));
                if (k(s)) s.catch(S);
            } else this.Ms(r, e);
        }
    }
    Os() {
        const t = this.$controller.scope;
        let e = this.Fs;
        let i = this.Rs;
        let n;
        if (i) {
            e = this.Fs = s.astEvaluate(this.Is, t, this.Ls, null) ?? null;
            i = this.Rs = !Object.is(this.items, e);
        }
        const r = this.Bs;
        if (this.$controller.isActive) {
            n = this.Bs = s.getCollectionObserver(i ? e : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.Bs = void 0;
        }
    }
    Ds() {
        const {items: t} = this;
        if (A(t)) {
            this.Ts = t;
            return;
        }
        const e = [];
        Nn(t, ((t, s) => {
            e[s] = t;
        }));
        this.Ts = e;
    }
    qs(t) {
        let e;
        let s;
        let i;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: a, Cs: c, Ls: u, forOf: f, Ps: d} = this;
        const p = r.scope;
        const m = Vn(a);
        const x = this.views = Array(m);
        Nn(a, ((a, g) => {
            i = x[g] = o.create().setLocation(h);
            i.nodes.unlink();
            n = Kn(c, a, f, p, u, l, d);
            Fn(n.overrideContext, g, m);
            s = i.activate(t ?? i, r, 0, n);
            if (k(s)) (e ?? (e = [])).push(s);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Us(t) {
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
    _s(t) {
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
        let a = 0;
        for (;l > h; ++h) {
            a = o[h] - h;
            r.splice(a, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ms(t, e) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: a, local: c, Ts: u, l: f, views: d, Ps: p, Ls: m, Cs: x, forOf: g} = this;
        const v = e.length;
        for (;v > l; ++l) if (-2 === e[l]) {
            r = a.create();
            d.splice(l, 0, r);
        }
        if (d.length !== v) throw Mn(d.length, v);
        const b = h.scope;
        const w = e.length;
        s.synchronizeIndices(d, e);
        const y = _n(e);
        const A = y.length;
        const C = g.declaration;
        let B;
        let R = A - 1;
        l = w - 1;
        for (;l >= 0; --l) {
            r = d[l];
            B = d[l + 1];
            r.nodes.link(B?.nodes ?? f);
            if (-2 === e[l]) {
                o = Kn(x, u[l], g, b, m, c, p);
                Fn(o.overrideContext, l, w);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (k(n)) (i ?? (i = [])).push(n);
            } else if (R < 0 || 1 === A || l !== y[R]) {
                if (p) s.astAssign(C, r.scope, m, u[l]); else r.scope.bindingContext[c] = u[l];
                Fn(r.scope.overrideContext, l, w);
                r.nodes.insertBefore(r.location);
            } else {
                if (p) s.astAssign(C, r.scope, m, u[l]); else r.scope.bindingContext[c] = u[l];
                if (t !== w) Fn(r.scope.overrideContext, l, w);
                --R;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(On);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Xs, s.IExpressionParser, as, Ne, Ie ];

r([ E ], Repeat.prototype, "items", void 0);

Ft("repeat")(Repeat);

let qn = 16;

let Un = new Int32Array(qn);

let $n = new Int32Array(qn);

function _n(t) {
    const e = t.length;
    if (e > qn) {
        qn = e;
        Un = new Int32Array(e);
        $n = new Int32Array(e);
    }
    let s = 0;
    let i = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let a = 0;
    for (;r < e; r++) {
        i = t[r];
        if (-2 !== i) {
            o = Un[s];
            n = t[o];
            if (-2 !== n && n < i) {
                $n[r] = o;
                Un[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                a = l + h >> 1;
                n = t[Un[a]];
                if (-2 !== n && n < i) l = a + 1; else h = a;
            }
            n = t[Un[l]];
            if (i < n || -2 === n) {
                if (l > 0) $n[r] = Un[l - 1];
                Un[l] = r;
            }
        }
    }
    r = ++s;
    const c = new Int32Array(r);
    i = Un[s - 1];
    while (s-- > 0) {
        c[s] = i;
        i = $n[i];
    }
    while (r-- > 0) Un[r] = 0;
    return c;
}

const Mn = (t, e) => v(`AUR0814:${t}!=${e}`);

const Fn = (t, e, s) => {
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

const jn = Object.prototype.toString;

const Vn = t => {
    switch (jn.call(t)) {
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
        throw v(`Cannot count ${jn.call(t)}`);
    }
};

const Nn = (t, e) => {
    switch (jn.call(t)) {
      case "[object Array]":
        return Hn(t, e);

      case "[object Map]":
        return Wn(t, e);

      case "[object Set]":
        return zn(t, e);

      case "[object Number]":
        return Gn(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw v(`Cannot iterate over ${jn.call(t)}`);
    }
};

const Hn = (t, e) => {
    const s = t.length;
    let i = 0;
    for (;i < s; ++i) e(t[i], i, t);
};

const Wn = (t, e) => {
    let s = -0;
    let i;
    for (i of t.entries()) e(i, s++, t);
};

const zn = (t, e) => {
    let s = 0;
    let i;
    for (i of t.keys()) e(i, s++, t);
};

const Gn = (t, e) => {
    let s = 0;
    for (;s < t; ++s) e(s, s, t);
};

const Xn = (t, e, i, n, r) => {
    let o = t.get(i);
    if (void 0 === o) {
        if ("string" === typeof e) o = i[e]; else o = s.astEvaluate(e, n, r, null);
        t.set(i, o);
    }
    return o;
};

const Kn = (t, e, i, n, r, o, l) => {
    let h = t.get(e);
    if (void 0 === h) {
        if (l) s.astAssign(i.declaration, h = s.Scope.fromParent(n, new s.BindingContext), r, e); else h = s.Scope.fromParent(n, new s.BindingContext(o, e));
        t.set(e, h);
    }
    return h;
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
            for (h = r.length; h > l; ++l) r[l].bind(o);
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

With.inject = [ Ie, as ];

r([ E ], With.prototype, "value", void 0);

Ft("with")(With);

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
            if (n > 0 && i[0].id === e.id) return this.Vs(null);
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
        return t.onResolve(this.Vs(null, r), (() => {
            this.activeCases = r;
            return this.Ns(null);
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
        return t.onResolve(this.activeCases.length > 0 ? this.Vs(e, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Ns(e);
        }));
    }
    Ns(e) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(e, 0, r);
        return t.resolveAll(...i.map((t => t.activate(e, 0, r))));
    }
    Vs(e, s = []) {
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

r([ E ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ Ft("switch"), o(0, Ie), o(1, as) ], exports.Switch);

let Qn = 0;

exports.Case = class Case {
    constructor(t, e, s, i) {
        this.f = t;
        this.Hs = e;
        this.l = s;
        this.id = ++Qn;
        this.fallThrough = false;
        this.view = void 0;
        this.Ws = i.config.level <= 1;
        this.Le = i.scopeTo(`${this.constructor.name}-#${this.id}`);
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
        this.Le.debug("isMatch()");
        const e = this.value;
        if (A(e)) {
            if (void 0 === this.Bs) this.Bs = this.zs(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (A(t)) {
            this.Bs?.unsubscribe(this);
            this.Bs = this.zs(t);
        } else if (void 0 !== this.Bs) this.Bs.unsubscribe(this);
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
        this.Bs?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    zs(t) {
        const e = this.Hs.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ Ie, s.IObserverLocator, as, t.ILogger ];

r([ E ], exports.Case.prototype, "value", void 0);

r([ E({
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

exports.Case = r([ Ft("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw v(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ Ft("default-case") ], exports.DefaultCase);

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
        const a = this.viewScope;
        let c;
        const u = {
            reusable: false
        };
        const f = () => {
            void t.resolveAll(c = (this.preSettledTask = r.queueTask((() => t.resolveAll(o?.deactivate(e, s), l?.deactivate(e, s), h?.activate(e, s, a))), u)).result.catch((t => {
                if (!(t instanceof i.TaskAbortError)) throw t;
            })), n.then((i => {
                if (this.value !== n) return;
                const f = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => t.resolveAll(h?.deactivate(e, s), l?.deactivate(e, s), o?.activate(e, s, a, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void c.then(f); else {
                    this.preSettledTask.cancel();
                    f();
                }
            }), (i => {
                if (this.value !== n) return;
                const f = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => t.resolveAll(h?.deactivate(e, s), o?.deactivate(e, s), l?.activate(e, s, a, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void c.then(f); else {
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

r([ E ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ Ft("promise"), o(0, Ie), o(1, as), o(2, re), o(3, t.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Yn(t).pending = this;
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

r([ E({
    mode: 2
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ Ft("pending"), o(0, Ie), o(1, as) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Yn(t).fulfilled = this;
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

r([ E({
    mode: 4
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ Ft("then"), o(0, Ie), o(1, as) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        Yn(t).rejected = this;
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

r([ E({
    mode: 4
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ Ft("catch"), o(0, Ie), o(1, as) ], exports.RejectedTemplateController);

function Yn(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw v(`AUR0813`);
}

let Zn = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Zn = r([ tt({
    pattern: "promise.resolve",
    symbols: ""
}) ], Zn);

let Jn = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Jn = r([ tt({
    pattern: "then",
    symbols: ""
}) ], Jn);

let tr = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

tr = r([ tt({
    pattern: "catch",
    symbols: ""
}) ], tr);

class AuCompose {
    constructor(t, e, s, i, n, r, o) {
        this.c = t;
        this.parent = e;
        this.host = s;
        this.l = i;
        this.p = n;
        this.scopeBehavior = "auto";
        this.Gs = void 0;
        this.r = t.get(Te);
        this.Xs = r;
        this.Ks = o;
    }
    static get inject() {
        return [ t.IContainer, Ne, ls, as, re, Xs, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Qs;
    }
    get composition() {
        return this.Gs;
    }
    attaching(e, s, i) {
        return this.Qs = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this.Ks.isCurrent(t)) this.Qs = void 0;
        }));
    }
    detaching(e) {
        const s = this.Gs;
        const i = this.Qs;
        this.Ks.invalidate();
        this.Gs = this.Qs = void 0;
        return t.onResolve(i, (() => s?.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.Gs) {
            this.Gs.update(this.model);
            return;
        }
        this.Qs = t.onResolve(this.Qs, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this.Ks.isCurrent(t)) this.Qs = void 0;
        }))));
    }
    queue(e, s) {
        const i = this.Ks;
        const n = this.Gs;
        return t.onResolve(i.create(e), (e => {
            if (i.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (i.isCurrent(e)) return t.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(e)) {
                        this.Gs = r;
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
        const {c: a, host: c, $controller: u, l: f} = this;
        const d = this.getDef(l);
        const p = a.createChild();
        const m = null == f ? c.parentNode : f.parentNode;
        if (null !== d) {
            if (d.containerless) throw v(`AUR0806`);
            if (null == f) {
                n = c;
                r = () => {};
            } else {
                n = m.insertBefore(this.p.document.createElement(d.name), f);
                r = () => {
                    n.remove();
                };
            }
            i = this.getVm(p, l, n);
        } else {
            n = null == f ? c : f;
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
                    name: js.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? s.Scope.fromParent(this.parent.scope, i) : s.Scope.create(i);
                if (ps(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), e);
            }
        };
        if ("activate" in i) return t.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(e, s, i) {
        if (null == s) return new EmptyComponent;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = ps(i);
        z(e, n.Element, z(e, ls, new t.InstanceProvider("ElementResolver", r ? null : i)));
        z(e, as, new t.InstanceProvider("IRenderLocation", r ? i : null));
        const o = e.invoke(s);
        z(e, s, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = C(t) ? t : t?.constructor;
        return js.isType(e) ? js.getDefinition(e) : null;
    }
}

r([ E ], AuCompose.prototype, "view", void 0);

r([ E ], AuCompose.prototype, "viewModel", void 0);

r([ E ], AuCompose.prototype, "model", void 0);

r([ E({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw v(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

vs("au-compose")(AuCompose);

class EmptyComponent {}

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
        this.Ys = null;
        this.Zs = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.Js = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.Js = true;
        }
        this.ti = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ as, Xs, He, Te ];
    }
    binding(t, e, i) {
        this.Ys = this.$controller.scope.parent;
        let n;
        if (this.Js) {
            n = this.ti.controller.scope.parent;
            (this.Zs = s.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.Ys.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.Js ? this.Zs : this.Ys);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.Js && null != this.Zs) this.Zs.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

r([ E ], AuSlot.prototype, "expose", void 0);

vs({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const er = j("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw v('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.ei = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.ei.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, er) ], exports.SanitizeValueConverter);

mt("sanitize")(exports.SanitizeValueConverter);

const sr = DebounceBindingBehavior;

const ir = OneTimeBindingBehavior;

const nr = ToViewBindingBehavior;

const rr = FromViewBindingBehavior;

const or = SignalBindingBehavior;

const lr = ThrottleBindingBehavior;

const hr = TwoWayBindingBehavior;

const ar = TemplateCompiler;

const cr = NodeObserverLocator;

const ur = [ ar, cr ];

const fr = SVGAnalyzer;

const dr = exports.AtPrefixedTriggerAttributePattern;

const pr = exports.ColonPrefixedBindAttributePattern;

const mr = exports.RefAttributePattern;

const xr = exports.DotSeparatedAttributePattern;

const gr = rt;

const vr = [ mr, xr, gr ];

const br = [ dr, pr ];

const wr = exports.DefaultBindingCommand;

const yr = exports.ForBindingCommand;

const kr = exports.FromViewBindingCommand;

const Ar = exports.OneTimeBindingCommand;

const Cr = exports.ToViewBindingCommand;

const Br = exports.TwoWayBindingCommand;

const Rr = qi;

const Sr = exports.TriggerBindingCommand;

const Ir = exports.CaptureBindingCommand;

const Tr = exports.AttrBindingCommand;

const Pr = exports.ClassBindingCommand;

const Er = exports.StyleBindingCommand;

const Lr = Ui;

const Or = [ wr, Ar, kr, Cr, Br, yr, Rr, Sr, Ir, Pr, Er, Tr, Lr ];

const Dr = exports.SanitizeValueConverter;

const qr = If;

const Ur = Else;

const $r = Repeat;

const _r = With;

const Mr = exports.Switch;

const Fr = exports.Case;

const jr = exports.DefaultCase;

const Vr = exports.PromiseTemplateController;

const Nr = exports.PendingTemplateController;

const Hr = exports.FulfilledTemplateController;

const Wr = exports.RejectedTemplateController;

const zr = Zn;

const Gr = Jn;

const Xr = tr;

const Kr = AttrBindingBehavior;

const Qr = SelfBindingBehavior;

const Yr = UpdateTriggerBindingBehavior;

const Zr = AuCompose;

const Jr = Portal;

const to = Focus;

const eo = Ln;

const so = [ sr, ir, nr, rr, or, lr, hr, Dr, qr, Ur, $r, _r, Mr, Fr, jr, Vr, Nr, Hr, Wr, zr, Gr, Xr, Kr, Qr, Yr, Zr, Jr, to, eo, AuSlot ];

const io = ni;

const no = ii;

const ro = hi;

const oo = ci;

const lo = oi;

const ho = ai;

const ao = li;

const co = si;

const uo = ri;

const fo = fi;

const po = gi;

const mo = di;

const xo = pi;

const go = mi;

const vo = xi;

const bo = ui;

const wo = vi;

const yo = [ ho, oo, ao, ro, co, no, io, uo, lo, fo, po, mo, xo, go, vo, bo, wo ];

const ko = Ao(t.noop);

function Ao(t) {
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
            return e.register(H(s.ICoercionConfiguration, i.coercingOptions), ...ur, ...so, ...vr, ...Or, ...yo);
        },
        customize(e) {
            return Ao(e ?? t);
        }
    };
}

const Co = j("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.si = false;
        this.ii = false;
        this.ni = void 0;
        this.next = void 0;
        this.ri = void 0;
        this.oi = void 0;
        if (e.has(Co, true)) throw v(`AUR0768`);
        z(e, Co, new t.InstanceProvider("IAurelia", this));
        z(e, ns, this.li = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.si;
    }
    get isStopping() {
        return this.ii;
    }
    get root() {
        if (null == this.ni) {
            if (null == this.next) throw v(`AUR0767`);
            return this.next;
        }
        return this.ni;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.hi(t.host), this.container, this.li);
        return this;
    }
    enhance(e, s) {
        const i = e.container ?? this.container.createChild();
        const n = e.host;
        const r = this.hi(n);
        const o = e.component;
        let l;
        if (C(o)) {
            z(i, r.HTMLElement, z(i, r.Element, z(i, ls, new t.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        z(i, hs, new t.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: Ls(),
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
    hi(t) {
        let e;
        if (!this.container.has(re, false)) {
            if (null === t.ownerDocument.defaultView) throw v(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(H(re, e));
        } else e = this.container.get(re);
        return e;
    }
    start(e = this.next) {
        if (null == e) throw v(`AUR0770`);
        if (k(this.ri)) return this.ri;
        return this.ri = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.li.prepare(this.ni = e);
            this.si = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.si = false;
                this.ri = void 0;
                this.ai(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (k(this.oi)) return this.oi;
        if (true === this.ir) {
            const s = this.ni;
            this.ir = false;
            this.ii = true;
            return this.oi = t.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (e) s.dispose();
                this.ni = void 0;
                this.li.dispose();
                this.ii = false;
                this.ai(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.ii) throw v(`AUR0771`);
        this.container.dispose();
    }
    ai(t, e, s) {
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

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = Ot;

exports.AtPrefixedTriggerAttributePatternRegistration = dr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = Kr;

exports.AttrBindingCommandRegistration = Tr;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = po;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = nt;

exports.AuCompose = AuCompose;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = D;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = pt;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingCommand = Di;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingModeBehavior = BindingModeBehavior;

exports.BindingTargetSubscriber = BindingTargetSubscriber;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CaptureBindingCommandRegistration = Ir;

exports.CheckedObserver = CheckedObserver;

exports.Children = Zt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Pr;

exports.ColonPrefixedBindAttributePatternRegistration = pr;

exports.ComputedWatcher = ComputedWatcher;

exports.ContentBinding = ContentBinding;

exports.Controller = Controller;

exports.CustomAttribute = Xt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = io;

exports.CustomElement = js;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = no;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = sr;

exports.DefaultBindingCommandRegistration = wr;

exports.DefaultBindingLanguage = Or;

exports.DefaultBindingSyntax = vr;

exports.DefaultComponents = ur;

exports.DefaultRenderers = yo;

exports.DefaultResources = so;

exports.DotSeparatedAttributePatternRegistration = xr;

exports.Else = Else;

exports.ElseRegistration = Ur;

exports.ExpressionWatcher = ExpressionWatcher;

exports.FlushQueue = FlushQueue;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = yr;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = rr;

exports.FromViewBindingCommandRegistration = kr;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = ns;

exports.IAppTask = Lt;

exports.IAttrMapper = Mi;

exports.IAttributeParser = J;

exports.IAttributePattern = Z;

exports.IAuSlotsInfo = Gs;

exports.IAurelia = Co;

exports.IController = Ne;

exports.IEventTarget = hs;

exports.IFlushQueue = kt;

exports.IHistory = gs;

exports.IHydrationContext = He;

exports.IInstruction = Xs;

exports.ILifecycleHooks = Ae;

exports.ILocation = xs;

exports.INode = ls;

exports.INodeObserverLocatorRegistration = cr;

exports.IPlatform = re;

exports.IProjections = zs;

exports.IRenderLocation = as;

exports.IRenderer = Ys;

exports.IRendering = Te;

exports.ISVGAnalyzer = $i;

exports.ISanitizer = er;

exports.IShadowDOMGlobalStyles = ge;

exports.IShadowDOMStyles = xe;

exports.ISyntaxInterpreter = K;

exports.ITemplateCompiler = Qs;

exports.ITemplateCompilerHooks = sn;

exports.ITemplateCompilerRegistration = ar;

exports.ITemplateElementFactory = Vi;

exports.IViewFactory = Ie;

exports.IWindow = ms;

exports.If = If;

exports.IfRegistration = qr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = ro;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = oo;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = lo;

exports.LifecycleHooks = Re;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.ListenerBinding = ListenerBinding;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingOptions = ListenerBindingOptions;

exports.ListenerBindingRendererRegistration = fo;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = ir;

exports.OneTimeBindingCommandRegistration = Ar;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = ho;

exports.RefAttributePatternRegistration = mr;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Rr;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = ao;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = $r;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = fr;

exports.SanitizeValueConverterRegistration = Dr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = Qr;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = mo;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = xo;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = co;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = go;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = br;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = or;

exports.StandardConfiguration = ko;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Er;

exports.StyleConfiguration = ve;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = vo;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = on;

exports.TemplateControllerRendererRegistration = uo;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = bo;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = lr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = nr;

exports.ToViewBindingCommandRegistration = Cr;

exports.TriggerBindingCommandRegistration = Sr;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = hr;

exports.TwoWayBindingCommandRegistration = Br;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = Yr;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = vt;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.Watch = _t;

exports.With = With;

exports.WithRegistration = _r;

exports.alias = G;

exports.allResources = F;

exports.attributePattern = tt;

exports.bindable = E;

exports.bindingBehavior = ut;

exports.bindingCommand = Pi;

exports.capture = Ws;

exports.children = Kt;

exports.coercer = q;

exports.containerless = ws;

exports.convertToRenderLocation = ds;

exports.cssModules = de;

exports.customAttribute = Mt;

exports.customElement = vs;

exports.getEffectiveParentNode = us;

exports.getRef = rs;

exports.isCustomElementController = Me;

exports.isCustomElementViewModel = Fe;

exports.isInstruction = Ks;

exports.isRenderLocation = ps;

exports.lifecycleHooks = Se;

exports.mixinAstEvaluator = wt;

exports.mixinUseScope = bt;

exports.mixingBindingLimited = Bt;

exports.processContent = Ns;

exports.registerAliases = X;

exports.renderer = Zs;

exports.setEffectiveParentNode = fs;

exports.setRef = os;

exports.shadowCSS = pe;

exports.strict = ks;

exports.templateCompilerHooks = ln;

exports.templateController = Ft;

exports.useShadowDOM = bs;

exports.valueConverter = mt;

exports.watch = qt;
//# sourceMappingURL=index.cjs.map
