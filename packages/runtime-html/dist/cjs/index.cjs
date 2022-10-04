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

const A = t => t instanceof Array;

const C = t => "function" === typeof t;

const R = t => "string" === typeof t;

const B = Object.defineProperty;

const S = t => {
    throw t;
};

const I = Object.is;

const T = Reflect.defineProperty;

const D = (t, e, s) => {
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
        c(L, BindableDefinition.create(e, t, s), t.constructor, e);
        m(t.constructor, O.keyFrom(e));
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

function P(t) {
    return t.startsWith(L);
}

const L = f("bindable");

const O = Object.freeze({
    name: L,
    keyFrom: t => `${L}:${t}`,
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
                if (!h(L, t, n)) m(t, O.keyFrom(n));
                c(L, e, t, n);
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
        const s = L.length + 1;
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
            h = x(a).filter(P);
            c = h.length;
            for (u = 0; u < c; ++u) i[o++] = l(L, a, h[u].slice(s));
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
    U.define(t, e);
}

const U = {
    key: f("coercer"),
    define(t, e) {
        c(U.key, t[e].bind(t), t);
    },
    for(t) {
        return l(U.key, t);
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
        const c = this.i = C(l);
        const a = this.u = C(h);
        const u = this.hs = n !== t.noop;
        let f;
        this.o = e;
        this.k = s;
        this.A = a ? h : t.noop;
        this.cb = c ? l : t.noop;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
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

const M = t.DI.createInterface;

const V = t.Registration.singleton;

const N = t.Registration.aliasTo;

const H = t.Registration.instance;

const W = t.Registration.callback;

const z = t.Registration.transient;

const G = (t, e, s) => t.registerResolver(e, s);

function X(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) c(s, t, e); else i.push(...t);
    };
}

function K(e, s, i, n) {
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
        this.O = "";
        this.$ = {};
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
        const s = this.$;
        if (void 0 === s[t]) s[t] = e; else s[t] += e;
    }
    next(t) {
        const e = this.$;
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
            this.q.push(i);
            if (t.repeat) i.q.push(i);
        }
        return i;
    }
    findMatches(t, e) {
        const s = [];
        const i = this.q;
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
        const e = this.M = t.length;
        const s = this.V = [];
        let i = 0;
        for (;e > i; ++i) s.push(new CharSpec(t[i], false, false, false));
    }
    eachChar(t) {
        const e = this.M;
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

const Q = M("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        let c = 0;
        let a;
        while (e > c) {
            s = this.H;
            i = t[c];
            n = i.pattern;
            r = new SegmentTypes;
            o = this.G(i, r);
            l = o.length;
            h = t => s = s.append(t, n);
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            s._ = r;
            s.j = true;
            ++c;
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
        i = i.filter(Y);
        if (i.length > 0) {
            i.sort(Z);
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

function Y(t) {
    return t.j;
}

function Z(t, e) {
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

const J = M("IAttributePattern");

const tt = M("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(e, s) {
        this.K = {};
        this.Y = e;
        const i = this.F = {};
        const n = s.reduce(((t, e) => {
            const s = nt(e.constructor);
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

AttributeParser.inject = [ Q, t.all(J) ];

function et(...t) {
    return function e(s) {
        return rt.define(t, s);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        V(J, this.Type).register(t);
    }
}

const st = d("attribute-pattern");

const it = "attribute-pattern-definitions";

const nt = e => t.Protocol.annotation.get(e, it);

const rt = Object.freeze({
    name: st,
    definitionAnnotationKey: it,
    define(e, s) {
        const i = new AttributePatternResourceDefinition(s);
        c(st, i, s);
        p(s, st);
        t.Protocol.annotation.set(s, it, e);
        m(s, it);
        return s;
    },
    getPatternDefinitions: nt
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[1]);
    }
    "PART.PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, `${s[0]}.${s[1]}`, s[2]);
    }
};

exports.DotSeparatedAttributePattern = r([ et({
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

exports.RefAttributePattern = r([ et({
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

exports.ColonPrefixedBindAttributePattern = r([ et({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ et({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let ot = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

ot = r([ et({
    pattern: "...$attrs",
    symbols: ""
}) ], ot);

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
                    if (R(e) && e.includes("!important")) {
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
            lt(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) ht(this.o, this);
    }
    st() {
        ut = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ut);
    }
}

s.subscriberCollection(AttributeObserver);

const lt = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(ct)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const ht = (t, e) => {
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

const ct = t => {
    t[0].target.$eMObs.forEach(at, t);
};

function at(t) {
    t.handleMutation(this);
}

let ut;

function ft(t) {
    return function(e) {
        return mt.define(t, e);
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
        return new BindingBehaviorDefinition(s, t.firstDefined(pt(s, "name"), i), t.mergeArrays(pt(s, "aliases"), n.aliases, s.aliases), mt.keyFrom(i));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        V(s, e).register(t);
        N(s, e).register(t);
        K(i, mt, s, t);
    }
}

const dt = d("binding-behavior");

const pt = (t, e) => l(f(e), t);

const mt = Object.freeze({
    name: dt,
    keyFrom(t) {
        return `${dt}:${t}`;
    },
    isType(t) {
        return C(t) && h(dt, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(dt, s, s.Type);
        c(dt, s, s);
        p(e, dt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(dt, t);
        if (void 0 === e) throw v(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: pt
});

function xt(t) {
    return function(e) {
        return wt.define(t, e);
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
        return new ValueConverterDefinition(s, t.firstDefined(vt(s, "name"), i), t.mergeArrays(vt(s, "aliases"), n.aliases, s.aliases), wt.keyFrom(i));
    }
    register(e) {
        const {Type: s, key: i, aliases: n} = this;
        t.Registration.singleton(i, s).register(e);
        t.Registration.aliasTo(i, s).register(e);
        K(n, wt, i, e);
    }
}

const gt = d("value-converter");

const vt = (t, e) => l(f(e), t);

const wt = Object.freeze({
    name: gt,
    keyFrom: t => `${gt}:${t}`,
    isType(t) {
        return C(t) && h(gt, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(gt, s, s.Type);
        c(gt, s, s);
        p(e, gt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(gt, t);
        if (void 0 === e) throw v(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: vt
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
        if (t !== s.astEvaluate(i.ast, i.scope, i, null)) {
            this.v = t;
            this.it.add(this);
        }
    }
}

const bt = t => {
    D(t.prototype, "useScope", (function(t) {
        this.scope = t;
    }));
};

const yt = (t, e = true) => s => {
    const i = s.prototype;
    if (null != t) T(i, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    T(i, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    D(i, "get", (function(t) {
        return this.l.get(t);
    }));
    D(i, "getConverter", (function(t) {
        const e = wt.keyFrom(t);
        let s = kt.get(this);
        if (null == s) kt.set(this, s = new ResourceLookup);
        return s[e] ?? (s[e] = this.l.get(j(e)));
    }));
    D(i, "getBehavior", (function(t) {
        const e = mt.keyFrom(t);
        let s = kt.get(this);
        if (null == s) kt.set(this, s = new ResourceLookup);
        return s[e] ?? (s[e] = this.l.get(j(e)));
    }));
};

const kt = new WeakMap;

class ResourceLookup {}

const At = M("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.rt.forEach(Ct);
        } finally {
            this.nt = false;
        }
    }
    clear() {
        this.rt.clear();
        this.nt = false;
    }
}

function Ct(t, e, s) {
    s.delete(t);
    t.flush();
}

const Rt = new WeakSet;

const Bt = (t, e) => {
    D(t.prototype, "limit", (function(t) {
        if (Rt.has(this)) throw v(`AURXXXX: a rate limit has already been applied.`);
        Rt.add(this);
        const s = e(this, t);
        const i = this[s];
        const n = (...t) => i.call(this, ...t);
        const r = "debounce" === t.type ? St(t, n, this) : It(t, n, this);
        this[s] = r;
        return {
            dispose: () => {
                Rt.delete(this);
                r.dispose();
                delete this[s];
            }
        };
    }));
};

const St = (t, e, s) => {
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

const It = (t, e, s) => {
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

const Tt = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, s, i, n, r, o, l, h) {
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
        this.oL = s;
        this.lt = i;
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
        const n = s.astEvaluate(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (n !== this.v) {
            this.v = n;
            if (t) {
                i = this.task;
                this.task = this.lt.queueTask((() => {
                    this.task = null;
                    this.updateTarget(n);
                }), Tt);
                i?.cancel();
            } else this.updateTarget(n);
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
        s.astBind(this.ast, t, this);
        this.targetObserver ?? (this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = s.astEvaluate(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    unbind() {
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

bt(AttributeBinding);

Bt(AttributeBinding, (() => "updateTarget"));

s.connectable(AttributeBinding);

yt(true)(AttributeBinding);

const Dt = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.taskQueue = i;
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.scope = void 0;
        this.task = null;
        this.ot = t;
        this.oL = s;
        this.targetObserver = s.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, s, this);
    }
    ht() {
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
        const o = 1 !== this.ot.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(i, this.target, this.targetProperty);
            }), Dt);
            l?.cancel();
            l = null;
        } else r.setValue(i, this.target, this.targetProperty);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
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
        this.scope = void 0;
        const t = this.partBindings;
        const e = t.length;
        let s = 0;
        for (;e > s; ++s) t[s].unbind();
        this.task?.cancel();
        this.task = null;
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
        this.owner.ht();
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
            if (A(i)) this.observeCollection(i);
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
        s.astBind(this.ast, t, this);
        this.v = s.astEvaluate(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (A(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

bt(InterpolationPartBinding);

Bt(InterpolationPartBinding, (() => "updateTarget"));

s.connectable(InterpolationPartBinding);

yt(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, s, i, n, r, o, l) {
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
        this.l = e;
        this.ot = t;
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
        const i = 1 !== this.ot.state;
        if (i) this.ct(e); else this.updateTarget(e);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.v = s.astEvaluate(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (A(t)) this.observeCollection(t);
        const e = 1 !== this.ot.state;
        if (e) this.ct(t); else this.updateTarget(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        s.astBind(this.ast, t, this);
        const e = this.v = s.astEvaluate(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (A(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
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
        }), Dt);
        e?.cancel();
    }
}

bt(ContentBinding);

Bt(ContentBinding, (() => "updateTarget"));

s.connectable()(ContentBinding);

yt(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, s, i, n = false) {
        this.ast = s;
        this.targetProperty = i;
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
        if ((Et = s.astEvaluate(this.ast, this.scope, this, this)) !== this.v) this.v = Et;
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
        s.astBind(this.ast, t, this);
        this.v = s.astEvaluate(this.ast, this.scope, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

bt(LetBinding);

Bt(LetBinding, (() => "updateTarget"));

s.connectable(LetBinding);

yt(true)(LetBinding);

let Et;

class PropertyBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.scope = void 0;
        this.ft = void 0;
        this.dt = null;
        this.xt = null;
        this.boundFn = false;
        this.l = e;
        this.ot = t;
        this.lt = i;
        this.oL = s;
    }
    updateTarget(t) {
        this.ft.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        s.astAssign(this.ast, this.scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.ot.state && (4 & this.ft.type) > 0;
        const e = this.mode > 1;
        if (e) this.obs.version++;
        const i = s.astEvaluate(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (t) {
            Pt = this.dt;
            this.dt = this.lt.queueTask((() => {
                this.updateTarget(i);
                this.dt = null;
            }), Lt);
            Pt?.cancel();
            Pt = null;
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
        s.astBind(this.ast, t, this);
        const e = this.oL;
        const i = this.mode;
        let n = this.ft;
        if (!n) {
            if (4 & i) n = e.getObserver(this.target, this.targetProperty); else n = e.getAccessor(this.target, this.targetProperty);
            this.ft = n;
        }
        const r = (2 & i) > 0;
        if (i & (2 | 1)) this.updateTarget(s.astEvaluate(this.ast, this.scope, this, r ? this : null));
        if (4 & i) {
            n.subscribe(this.xt ?? (this.xt = new BindingTargetSubscriber(this, this.l.get(At))));
            if (!r) this.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        if (this.xt) {
            this.ft.unsubscribe(this.xt);
            this.xt = null;
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
        if (null != this.xt) throw v(`AURxxxx: binding already has a target subscriber`);
        this.xt = t;
    }
}

bt(PropertyBinding);

Bt(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

s.connectable(PropertyBinding);

yt(true, false)(PropertyBinding);

let Pt = null;

const Lt = {
    reusable: false,
    preempt: true
};

class RefBinding {
    constructor(t, e, s) {
        this.ast = e;
        this.target = s;
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
        s.astBind(this.ast, t, this);
        s.astAssign(this.ast, this.scope, this, this.target);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (s.astEvaluate(this.ast, this.scope, this, null) === this.target) s.astAssign(this.ast, this.scope, this, null);
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
    }
}

yt(false)(RefBinding);

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
        this.boundFn = true;
        this.l = t;
        this.gt = n;
    }
    callSource(t) {
        const e = this.scope.overrideContext;
        e.$event = t;
        let i = s.astEvaluate(this.ast, this.scope, this, null);
        delete e.$event;
        if (C(i)) i = i(t);
        if (true !== i && this.gt.prevent) t.preventDefault();
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
        s.astBind(this.ast, t, this);
        this.target.addEventListener(this.targetEvent, this, this.gt);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        s.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.target.removeEventListener(this.targetEvent, this, this.gt);
    }
}

bt(ListenerBinding);

Bt(ListenerBinding, (() => "callSource"));

yt(true, true)(ListenerBinding);

const Ot = M("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(H(Ot, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const $t = Object.freeze({
    creating: Ut("creating"),
    hydrating: Ut("hydrating"),
    hydrated: Ut("hydrated"),
    activating: Ut("activating"),
    activated: Ut("activated"),
    deactivating: Ut("deactivating"),
    deactivated: Ut("deactivated")
});

function Ut(t) {
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
        Ft.add(l, h);
        if (zt(l)) Kt(l).watches.push(h);
        if (Hs(l)) Gs(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const _t = t.emptyArray;

const jt = f("watch");

const Ft = Object.freeze({
    name: jt,
    add(t, e) {
        let s = l(jt, t);
        if (null == s) c(jt, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(jt, t) ?? _t;
    }
});

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
        return new CustomAttributeDefinition(s, t.firstDefined(Wt(s, "name"), i), t.mergeArrays(Wt(s, "aliases"), n.aliases, s.aliases), Ht(i), t.firstDefined(Wt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, 2), t.firstDefined(Wt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), O.from(s, ...O.getAll(s), Wt(s, "bindables"), s.bindables, n.bindables), t.firstDefined(Wt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(Ft.getAnnotation(s), s.watches), t.mergeArrays(Wt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        z(s, e).register(t);
        N(s, e).register(t);
        K(i, Qt, s, t);
    }
}

const Nt = d("custom-attribute");

const Ht = t => `${Nt}:${t}`;

const Wt = (t, e) => l(f(e), t);

const zt = t => C(t) && h(Nt, t);

const Gt = (t, e) => ps(t, Ht(e)) ?? void 0;

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
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(Jt, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, te.keyFrom(e));
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

function Zt(t) {
    return t.startsWith(Jt);
}

const Jt = f("children-observer");

const te = Object.freeze({
    name: Jt,
    keyFrom: t => `${Jt}:${t}`,
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
        const s = Jt.length + 1;
        const i = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(Zt);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l(Jt, a, h[t].slice(s));
        }
        return i;
    }
});

const ee = {
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
        return new ChildrenDefinition(t.firstDefined(s.callback, `${e}Changed`), t.firstDefined(s.property, e), s.options ?? ee, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = se, r = ie, o = ne, l) {
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
        return oe(this.controller, this.query, this.filter, this.map);
    }
}

s.subscriberCollection()(ChildrenObserver);

function se(t) {
    return t.host.childNodes;
}

function ie(t, e, s) {
    return !!s;
}

function ne(t, e, s) {
    return s;
}

const re = {
    optional: true
};

function oe(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Ws(l, re);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

const le = t.IPlatform;

const he = (t, e, s, i) => {
    t.addEventListener(e, s, i);
};

const ce = (t, e, s, i) => {
    t.removeEventListener(e, s, i);
};

const ae = t => {
    const e = t.prototype;
    D(e, "subscribe", (function(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            for (ue of this.wt.events) he(this.bt, ue, this);
            this.yt = true;
            this.kt?.();
        }
    }));
    D(e, "unsubscribe", (function(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            for (ue of this.wt.events) ce(this.bt, ue, this);
            this.yt = false;
            this.At?.();
        }
    }));
    D(e, "useConfig", (function(t) {
        this.wt = t;
        if (this.yt) {
            for (ue of this.wt.events) ce(this.bt, ue, this);
            for (ue of this.wt.events) he(this.bt, ue, this);
        }
    }));
};

let ue;

const fe = e => {
    D(e.prototype, "subscribe", t.noop);
    D(e.prototype, "unsubscribe", t.noop);
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
            const s = de(t);
            let i = this.Rt;
            this.ov = t;
            if (s.length > 0) this.Bt(s);
            this.Rt += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!w.call(e, t) || e[t] !== i) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    Bt(t) {
        const e = this.obj;
        const s = t.length;
        let i = 0;
        let n;
        for (;i < s; i++) {
            n = t[i];
            if (0 === n.length) continue;
            this.Ct[n] = this.Rt;
            e.classList.add(n);
        }
    }
}

function de(e) {
    if (R(e)) return pe(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...de(e[i]));
            return t;
        } else return t.emptyArray;
    }
    const s = [];
    let i;
    for (i in e) if (Boolean(e[i])) if (i.includes(" ")) s.push(...pe(i)); else s.push(i);
    return s;
}

function pe(e) {
    const s = e.match(/\S+/g);
    if (null === s) return t.emptyArray;
    return s;
}

fe(ClassAttributeAccessor);

function me(...t) {
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
                this.element.className = de(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ xs ], e));
        t.register(i);
    }
}

function xe(...t) {
    return new ShadowDOMRegistry(t);
}

const ge = M("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(le))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(we);
        const s = t.get(ge);
        t.register(H(ve, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ le ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ le ];

const ve = M("IShadowDOMStyles");

const we = M("IShadowDOMGlobalStyles", (e => e.instance({
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

const be = {
    shadowDOM(e) {
        return $t.creating(t.IContainer, (t => {
            if (null != e.sharedStyles) {
                const s = t.get(ge);
                t.register(H(we, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ye, exit: ke} = s.ConnectableSwitcher;

const {wrap: Ae, unwrap: Ce} = s.ProxyObservable;

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
        const s = this.compute();
        if (!Object.is(s, e)) this.cb.call(t, s, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            ye(this);
            return this.value = Ce(this.$get.call(void 0, this.useProxy ? Ae(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ke(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, s, i, n) {
        this.scope = t;
        this.l = e;
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
    bind() {
        if (this.isBound) return;
        this.obs.version++;
        this.value = s.astEvaluate(this.expression, this.scope, this, this);
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

s.connectable(ComputedWatcher);

s.connectable(ExpressionWatcher);

yt(true)(ExpressionWatcher);

const Re = M("ILifecycleHooks");

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
        V(Re, this.Type).register(t);
    }
}

const Be = new WeakMap;

const Se = f("lifecycle-hooks");

const Ie = Object.freeze({
    name: Se,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(Se, s, e);
        p(e, Se);
        return s.Type;
    },
    resolve(t) {
        let e = Be.get(t);
        if (void 0 === e) {
            Be.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(Re) : t.has(Re, false) ? s.getAll(Re).concat(t.getAll(Re)) : s.getAll(Re);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(Se, n.constructor);
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

function Te() {
    return function t(e) {
        return Ie.define({}, e);
    };
}

const De = M("IViewFactory");

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

const Ee = new WeakSet;

function Pe(t) {
    return !Ee.has(t);
}

function Le(t) {
    Ee.add(t);
    return CustomElementDefinition.create(t);
}

const Oe = d("views");

const $e = Object.freeze({
    name: Oe,
    has(t) {
        return C(t) && (h(Oe, t) || "$views" in t);
    },
    get(t) {
        if (C(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(Pe).map(Le);
            for (const e of s) $e.add(t, e);
        }
        let e = l(Oe, t);
        if (void 0 === e) c(Oe, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(Oe, t);
        if (void 0 === i) c(Oe, i = [ s ], t); else i.push(s);
        return i;
    }
});

function Ue(t) {
    return function(e) {
        $e.add(e, t);
    };
}

const qe = M("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.St = new WeakMap;
        this.It = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = $e.has(t.constructor) ? $e.get(t.constructor) : [];
            const i = C(e) ? e(t, s) : this.Tt(s, e);
            return this.Dt(t, s, i);
        }
        return null;
    }
    Dt(t, e, s) {
        let i = this.St.get(t);
        let n;
        if (void 0 === i) {
            i = {};
            this.St.set(t, i);
        } else n = i[s];
        if (void 0 === n) {
            const r = this.Et(t, e, s);
            n = Ns(Gs(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            i[s] = n;
        }
        return n;
    }
    Et(t, e, i) {
        let n = this.It.get(t.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.It.set(t.constructor, n);
        } else r = n[i];
        if (void 0 === r) {
            r = Ns(this.Pt(e, i), class {
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
    Tt(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    Pt(t, e) {
        const s = t.find((t => t.name === e));
        if (void 0 === s) throw v(`Could not find view: ${e}`);
        return s;
    }
}

const _e = M("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.Lt = new WeakMap;
        this.Ot = new WeakMap;
        this.p = (this.$t = t.root).get(le);
        this.Ut = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.qt ? this.qt = this.$t.getAll(oi, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.qt;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.Lt;
            const n = e.get(ri);
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
        const s = this.Ot;
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
        return null == e ? this.Ut : new FragmentNodeSequence(this.p, e.cloneNode(true));
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

var je;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(je || (je = {}));

const Fe = {
    optional: true
};

const Me = new WeakMap;

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
        this._t = null;
        this.state = 0;
        this.jt = false;
        this.Ft = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.Mt = 0;
        this.Vt = 0;
        this.Nt = 0;
        this.Ht = r;
        this.Wt = 2 === s ? HooksDefinition.none : new HooksDefinition(r);
        this.location = l;
        this.r = e.root.get(_e);
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
        return Me.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw v(`AUR0500:${t}`);
        return e;
    }
    static $el(e, s, i, n, r = void 0, o = null) {
        if (Me.has(s)) return Me.get(s);
        r = r ?? Gs(s.constructor);
        const l = new Controller(e, 0, r, null, s, i, o);
        const h = e.get(t.optional(Je));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        G(e, Je, new t.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        Me.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (Me.has(e)) return Me.get(e);
        i = i ?? Kt(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        Me.set(e, n);
        n.zt();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.Gt();
        return s;
    }
    hE(e, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.Ht;
        let l = this.definition;
        this.scope = s.Scope.create(o, null, true);
        if (l.watches.length > 0) Ge(this, n, l, o);
        Ne(this, l, r, o);
        this.Ft = He(this, l, o);
        if (this.Wt.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this._t = Ie.resolve(n);
        l.register(n);
        if (null !== l.injectable) G(n, l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == e || false !== e.hydrate) {
            this.hS(e);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this._t.hydrating) this._t.hydrating.forEach(ss, this);
        if (this.Wt.hasHydrating) this.Ht.hydrating(this);
        const e = this.Xt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = Ws(this.host, Fe))) {
            this.host = this.container.root.get(le).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = ks(this.host);
        }
        ms(this.host, js, this);
        ms(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw v(`AUR0501`);
            ms(this.shadowRoot = this.host.attachShadow(s ?? Qe), js, this);
            ms(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            ms(o, js, this);
            ms(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.Ht.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this._t.hydrated) this._t.hydrated.forEach(is, this);
        if (this.Wt.hasHydrated) this.Ht.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Xt, this.host);
        if (void 0 !== this._t.created) this._t.created.forEach(es, this);
        if (this.Wt.hasCreated) this.Ht.created(this);
    }
    zt() {
        const t = this.definition;
        const e = this.Ht;
        if (t.watches.length > 0) Ge(this, this.container, t, e);
        Ne(this, t, this.flags, e);
        e.$controller = this;
        this._t = Ie.resolve(this.container);
        if (void 0 !== this._t.created) this._t.created.forEach(es, this);
        if (this.Wt.hasCreated) this.Ht.created(this);
    }
    Gt() {
        this.Xt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Xt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Xt)).findTargets(), this.Xt, void 0);
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
            throw v(`AUR0503:${this.name} ${Ye(this.state)}`);
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
        this.Kt();
        let r;
        if (2 !== this.vmKind && null != this._t.binding) r = t.resolveAll(...this._t.binding.map(ns, this));
        if (this.Wt.hasBinding) r = t.resolveAll(r, this.Ht.binding(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.Qt();
            r.then((() => {
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
        let e = 0;
        let s = this.Ft.length;
        let i;
        if (s > 0) while (s > e) {
            this.Ft[e].start();
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
        if (2 !== this.vmKind && null != this._t.bound) i = t.resolveAll(...this._t.bound.map(rs, this));
        if (this.Wt.hasBound) i = t.resolveAll(i, this.Ht.bound(this.$initiator, this.parent, this.$flags));
        if (k(i)) {
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
                const e = t.has(ve, false) ? t.get(ve) : t.get(we);
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
        if (2 !== this.vmKind && null != this._t.attaching) s = t.resolveAll(...this._t.attaching.map(os, this));
        if (this.Wt.hasAttaching) s = t.resolveAll(s, this.Ht.attaching(this.$initiator, this.parent, this.$flags));
        if (k(s)) {
            this.Qt();
            this.Kt();
            s.then((() => {
                this.te();
            })).catch((t => {
                this.Yt(t);
            }));
        }
        if (null !== this.children) for (;e < this.children.length; ++e) void this.children[e].activate(this.$initiator, this, this.$flags, this.scope);
        this.te();
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
            throw v(`AUR0505:${this.name} ${Ye(this.state)}`);
        }
        this.$initiator = e;
        this.$flags = i;
        if (e === this) this.ee();
        let n = 0;
        let r;
        if (this.Ft.length) for (;n < this.Ft.length; ++n) this.Ft[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(e, this, i);
        if (2 !== this.vmKind && null != this._t.detaching) r = t.resolveAll(...this._t.detaching.map(hs, this));
        if (this.Wt.hasDetaching) r = t.resolveAll(r, this.Ht.detaching(this.$initiator, this.parent, this.$flags));
        if (k(r)) {
            this.Qt();
            e.ee();
            r.then((() => {
                e.se();
            })).catch((t => {
                e.Yt(t);
            }));
        }
        if (null === e.head) e.head = this; else e.tail.next = this;
        e.tail = this;
        if (e !== this) return;
        this.se();
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
        this.ie();
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
    ie() {
        if (void 0 !== this.$promise) {
            as = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            as();
            as = void 0;
        }
    }
    Yt(t) {
        if (void 0 !== this.$promise) {
            us = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            us(t);
            us = void 0;
        }
        if (this.$initiator !== this) this.parent.Yt(t);
    }
    Kt() {
        ++this.Mt;
        if (this.$initiator !== this) this.parent.Kt();
    }
    te() {
        if (0 === --this.Mt) {
            if (2 !== this.vmKind && null != this._t.attached) fs = t.resolveAll(...this._t.attached.map(ls, this));
            if (this.Wt.hasAttached) fs = t.resolveAll(fs, this.Ht.attached(this.$initiator, this.$flags));
            if (k(fs)) {
                this.Qt();
                fs.then((() => {
                    this.state = 2;
                    this.ie();
                    if (this.$initiator !== this) this.parent.te();
                })).catch((t => {
                    this.Yt(t);
                }));
                fs = void 0;
                return;
            }
            fs = void 0;
            this.state = 2;
            this.ie();
        }
        if (this.$initiator !== this) this.parent.te();
    }
    ee() {
        ++this.Vt;
    }
    se() {
        if (0 === --this.Vt) {
            this.ne();
            this.removeNodes();
            let e = this.$initiator.head;
            let s;
            while (null !== e) {
                if (e !== this) {
                    if (e.debug) e.logger.trace(`detach()`);
                    e.removeNodes();
                }
                if (2 !== e.vmKind && null != e._t.unbinding) s = t.resolveAll(...e._t.unbinding.map(cs, this));
                if (e.Wt.hasUnbinding) {
                    if (e.debug) e.logger.trace("unbinding()");
                    s = t.resolveAll(s, e.viewModel.unbinding(e.$initiator, e.parent, e.$flags));
                }
                if (k(s)) {
                    this.Qt();
                    this.ne();
                    s.then((() => {
                        this.re();
                    })).catch((t => {
                        this.Yt(t);
                    }));
                }
                s = void 0;
                e = e.next;
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
            return Kt(this.Ht.constructor).name === t;

          case 0:
            return Gs(this.Ht.constructor).name === t;

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
            ms(t, js, this);
            ms(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            ms(t, js, this);
            ms(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            ms(t, js, this);
            ms(t, this.definition.key, this);
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
            this.children.forEach(ts);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.Ht) {
            Me.delete(this.Ht);
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
            for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
        }
    }
}

function Ve(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Ne(t, e, i, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let i;
        let h = 0;
        const c = Ve(n);
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

function He(e, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = Ve(i);
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

const We = new Map;

const ze = t => {
    let e = We.get(t);
    if (null == e) {
        e = new s.AccessScopeExpression(t, 0);
        We.set(t, e);
    }
    return e;
};

function Ge(t, e, i, n) {
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
        if (!C(u)) throw v(`AUR0506:${String(u)}`);
        if (C(a)) t.addBinding(new ComputedWatcher(n, r, a, u, true)); else {
            f = R(a) ? o.parse(a, 8) : ze(a);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function Xe(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Ke(t) {
    return e.isObject(t) && Hs(t.constructor);
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

const Qe = {
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

function Ye(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Ze = M("IController");

const Je = M("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function ts(t) {
    t.dispose();
}

function es(t) {
    t.instance.created(this.Ht, this);
}

function ss(t) {
    t.instance.hydrating(this.Ht, this);
}

function is(t) {
    t.instance.hydrated(this.Ht, this);
}

function ns(t) {
    return t.instance.binding(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function rs(t) {
    return t.instance.bound(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function os(t) {
    return t.instance.attaching(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function ls(t) {
    return t.instance.attached(this.Ht, this["$initiator"], this["$flags"]);
}

function hs(t) {
    return t.instance.detaching(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

function cs(t) {
    return t.instance.unbinding(this.Ht, this["$initiator"], this.parent, this["$flags"]);
}

let as;

let us;

let fs;

const ds = M("IAppRoot");

class AppRoot {
    constructor(e, s, i, n) {
        this.config = e;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.oe = void 0;
        this.host = e.host;
        n.prepare(this);
        G(i, s.HTMLElement, G(i, s.Element, G(i, xs, new t.InstanceProvider("ElementResolver", e.host))));
        this.oe = t.onResolve(this.le("creating"), (() => {
            const s = e.component;
            const n = i.createChild();
            let r;
            if (Hs(s)) r = this.container.get(s); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this.le("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this.le("hydrated"), (() => {
                    l.hC();
                    this.oe = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.oe, (() => t.onResolve(this.le("activating"), (() => t.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.le("activated")))))));
    }
    deactivate() {
        return t.onResolve(this.le("deactivating"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.le("deactivated")))));
    }
    le(e) {
        return t.resolveAll(...this.container.getAll(Ot).reduce(((t, s) => {
            if (s.slot === e) t.push(s.run());
            return t;
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

function ms(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const xs = M("INode");

const gs = M("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(ds, true)) return t.get(ds).host;
    return t.get(le).document;
}))));

const vs = M("IRenderLocation");

const ws = new WeakMap;

function bs(t) {
    if (ws.has(t)) return ws.get(t);
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
        const e = Ws(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return bs(e.host);
    }
    return t.parentNode;
}

function ys(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) ws.set(s[t], e);
    } else ws.set(t, e);
}

function ks(t) {
    if (As(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function As(t) {
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
            if ("AU-M" === r.nodeName) o[i] = ks(r); else o[i] = r;
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
        if (As(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Cs = M("IWindow", (t => t.callback((t => t.get(le).window))));

const Rs = M("ILocation", (t => t.callback((t => t.get(Cs).location))));

const Bs = M("IHistory", (t => t.callback((t => t.get(Cs).history))));

function Ss(t) {
    return function(e) {
        return Ns(t, e);
    };
}

function Is(t) {
    if (void 0 === t) return function(t) {
        Vs(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!C(t)) return function(e) {
        Vs(e, "shadowOptions", t);
    };
    Vs(t, "shadowOptions", {
        mode: "open"
    });
}

function Ts(t) {
    if (void 0 === t) return function(t) {
        Ds(t);
    };
    Ds(t);
}

function Ds(t) {
    const e = l(js, t);
    if (void 0 === e) {
        Vs(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function Es(t) {
    if (void 0 === t) return function(t) {
        Vs(t, "isStrictBinding", true);
    };
    Vs(t, "isStrictBinding", true);
}

const Ps = new WeakMap;

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
            const n = t.fromDefinitionOrDefault("name", i, Ms);
            if (C(i.Type)) s = i.Type; else s = Ks(t.pascalCase(n));
            return new CustomElementDefinition(s, n, t.mergeArrays(i.aliases), t.fromDefinitionOrDefault("key", i, (() => Fs(n))), t.fromDefinitionOrDefault("cache", i, Os), t.fromDefinitionOrDefault("capture", i, Us), t.fromDefinitionOrDefault("template", i, $s), t.mergeArrays(i.instructions), t.mergeArrays(i.dependencies), t.fromDefinitionOrDefault("injectable", i, $s), t.fromDefinitionOrDefault("needsCompile", i, qs), t.mergeArrays(i.surrogates), O.from(s, i.bindables), te.from(i.childrenObservers), t.fromDefinitionOrDefault("containerless", i, Us), t.fromDefinitionOrDefault("isStrictBinding", i, Us), t.fromDefinitionOrDefault("shadowOptions", i, $s), t.fromDefinitionOrDefault("hasSlots", i, Us), t.fromDefinitionOrDefault("enhance", i, Us), t.fromDefinitionOrDefault("watches", i, _s), t.fromAnnotationOrTypeOrDefault("processContent", s, $s));
        }
        if (R(e)) return new CustomElementDefinition(s, e, t.mergeArrays(zs(s, "aliases"), s.aliases), Fs(e), t.fromAnnotationOrTypeOrDefault("cache", s, Os), t.fromAnnotationOrTypeOrDefault("capture", s, Us), t.fromAnnotationOrTypeOrDefault("template", s, $s), t.mergeArrays(zs(s, "instructions"), s.instructions), t.mergeArrays(zs(s, "dependencies"), s.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", s, $s), t.fromAnnotationOrTypeOrDefault("needsCompile", s, qs), t.mergeArrays(zs(s, "surrogates"), s.surrogates), O.from(s, ...O.getAll(s), zs(s, "bindables"), s.bindables), te.from(...te.getAll(s), zs(s, "childrenObservers"), s.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", s, Us), t.fromAnnotationOrTypeOrDefault("isStrictBinding", s, Us), t.fromAnnotationOrTypeOrDefault("shadowOptions", s, $s), t.fromAnnotationOrTypeOrDefault("hasSlots", s, Us), t.fromAnnotationOrTypeOrDefault("enhance", s, Us), t.mergeArrays(Ft.getAnnotation(s), s.watches), t.fromAnnotationOrTypeOrDefault("processContent", s, $s));
        const i = t.fromDefinitionOrDefault("name", e, Ms);
        return new CustomElementDefinition(s, i, t.mergeArrays(zs(s, "aliases"), e.aliases, s.aliases), Fs(i), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, s, Os), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, s, Us), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, s, $s), t.mergeArrays(zs(s, "instructions"), e.instructions, s.instructions), t.mergeArrays(zs(s, "dependencies"), e.dependencies, s.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, s, $s), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, s, qs), t.mergeArrays(zs(s, "surrogates"), e.surrogates, s.surrogates), O.from(s, ...O.getAll(s), zs(s, "bindables"), s.bindables, e.bindables), te.from(...te.getAll(s), zs(s, "childrenObservers"), s.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, s, Us), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, s, Us), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, s, $s), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, s, Us), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, s, Us), t.mergeArrays(e.watches, Ft.getAnnotation(s), s.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, s, $s));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Ps.has(t)) return Ps.get(t);
        const e = CustomElementDefinition.create(t);
        Ps.set(t, e);
        c(js, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            z(s, e).register(t);
            N(s, e).register(t);
            K(i, Qs, s, t);
        }
    }
}

const Ls = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Os = () => 0;

const $s = () => null;

const Us = () => false;

const qs = () => true;

const _s = () => t.emptyArray;

const js = d("custom-element");

const Fs = t => `${js}:${t}`;

const Ms = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Vs = (t, e, s) => {
    c(f(e), s, t);
};

const Ns = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(js, s, s.Type);
    c(js, s, s);
    p(s.Type, js);
    return s.Type;
};

const Hs = t => C(t) && h(js, t);

const Ws = (t, e = Ls) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = ps(t, js);
        if (null === s) {
            if (true === e.optional) return null;
            throw v(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = ps(t, js);
            if (null === s) throw v(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = ps(s, js);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = bs(s);
        }
        if (i) return;
        throw v(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = ps(s, js);
        if (null !== t) return t;
        s = bs(s);
    }
    throw v(`AUR0765`);
};

const zs = (t, e) => l(f(e), t);

const Gs = t => {
    const e = l(js, t);
    if (void 0 === e) throw v(`AUR0760:${t.name}`);
    return e;
};

const Xs = () => {
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

const Ks = function() {
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

const Qs = Object.freeze({
    name: js,
    keyFrom: Fs,
    isType: Hs,
    for: Ws,
    define: Ns,
    getDefinition: Gs,
    annotate: Vs,
    getAnnotation: zs,
    generateName: Ms,
    createInjectable: Xs,
    generateType: Ks
});

const Ys = f("processContent");

function Zs(t) {
    return void 0 === t ? function(t, e, s) {
        c(Ys, Js(t, e), t);
    } : function(e) {
        t = Js(e, t);
        const s = l(js, e);
        if (void 0 !== s) s.processContent = t; else c(Ys, t, e);
        return e;
    };
}

function Js(t, e) {
    if (R(e)) e = t[e];
    if (!C(e)) throw v(`AUR0766:${typeof e}`);
    return e;
}

function ti(t) {
    return function(e) {
        const s = C(t) ? t : true;
        Vs(e, "capture", s);
        if (Hs(e)) Gs(e).capture = s;
    };
}

const ei = M("IProjections");

const si = M("IAuSlotsInfo");

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

const ii = M("Instruction");

function ni(t) {
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

const ri = M("ITemplateCompiler");

const oi = M("IRenderer");

function li(t) {
    return function e(s) {
        s.register = function(t) {
            V(oi, this).register(t);
        };
        B(s.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return s;
    };
}

function hi(t, e, s) {
    if (R(e)) return t.parse(e, s);
    return e;
}

function ci(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function ai(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Ws(t);

      case "view":
        throw v(`AUR0750`);

      case "view-model":
        return Ws(t).viewModel;

      default:
        {
            const s = Gt(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = Ws(t, {
                name: e
            });
            if (void 0 === i) throw v(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let ui = class SetPropertyRenderer {
    render(t, e, s) {
        const i = ci(e);
        if (void 0 !== i.$observers?.[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

ui = r([ li("re") ], ui);

let fi = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ _e, le ];
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
            n = a.find(Qs, h);
            if (null == n) throw v(`AUR0752:${h}@${e["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? ks(s) : null;
        const d = Oi(this.p, e, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        G(d, r, new t.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        ms(s, n.key, l);
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

fi = r([ li("ra") ], fi);

let di = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ _e, le ];
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
        const r = $i(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        ms(e, n.key, o);
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

di = r([ li("rb") ], di);

let pi = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ _e, le ];
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
        const o = ks(e);
        const l = $i(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        ms(o, n.key, h);
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

pi = r([ li("rc") ], pi);

let mi = class LetElementRenderer {
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
            h = hi(this.ep, l.from, 8);
            t.addBinding(new LetBinding(r, this.oL, h, l.to, n));
            ++c;
        }
    }
};

mi.inject = [ s.IExpressionParser, s.IObserverLocator ];

mi = r([ li("rd") ], mi);

let xi = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        t.addBinding(new RefBinding(t.container, i, ai(e, s.to)));
    }
};

xi.inject = [ s.IExpressionParser ];

xi = r([ li("rj") ], xi);

let gi = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = hi(this.ep, s.from, 1);
        t.addBinding(new InterpolationBinding(t, i, this.oL, this.p.domWriteQueue, n, ci(e), s.to, 2));
    }
};

gi.inject = [ s.IExpressionParser, s.IObserverLocator, le ];

gi = r([ li("rf") ], gi);

let vi = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ci(e), s.to, s.mode));
    }
};

vi.inject = [ s.IExpressionParser, s.IObserverLocator, le ];

vi = r([ li("rg") ], vi);

let wi = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 2);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ci(e), s.to, 2));
    }
};

wi.inject = [ s.IExpressionParser, s.IObserverLocator, le ];

wi = r([ li("rk") ], wi);

let bi = class TextBindingRenderer {
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
        const l = hi(this.ep, s.from, 1);
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

bi.inject = [ s.IExpressionParser, s.IObserverLocator, le ];

bi = r([ li("ha") ], bi);

let yi = class ListenerBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 4);
        t.addBinding(new ListenerBinding(t.container, i, e, s.to, new ListenerBindingOptions(s.preventDefault, s.capture)));
    }
};

yi.inject = [ s.IExpressionParser ];

yi = r([ li("hb") ], yi);

let ki = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

ki = r([ li("he") ], ki);

let Ai = class SetClassAttributeRenderer {
    render(t, e, s) {
        Ii(e.classList, s.value);
    }
};

Ai = r([ li("hf") ], Ai);

let Ci = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

Ci = r([ li("hg") ], Ci);

let Ri = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, 2));
    }
};

Ri.inject = [ s.IExpressionParser, s.IObserverLocator, le ];

Ri = r([ li("hd") ], Ri);

let Bi = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        t.addBinding(new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, 2));
    }
};

Bi.inject = [ le, s.IExpressionParser, s.IObserverLocator ];

Bi = r([ li("hc") ], Bi);

let Si = class SpreadRenderer {
    constructor(t, e) {
        this.he = t;
        this.r = e;
    }
    static get inject() {
        return [ ri, _e ];
    }
    render(e, s, i) {
        const n = e.container;
        const r = n.get(Je);
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
            const r = Ti(n);
            const c = this.he.compileSpread(n.controller.definition, n.instruction?.captures ?? t.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, Ws(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            e.addBinding(r);
        };
        h(0);
    }
};

Si = r([ li("hs") ], Si);

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
        if (null == e) throw v("Invalid spreading. Context scope is null/undefined");
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

function Ii(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const Ti = t => new SpreadBinding([], t);

const Di = "IController";

const Ei = "IInstruction";

const Pi = "IRenderLocation";

const Li = "IAuSlotsInfo";

function Oi(e, s, i, n, r, o) {
    const l = s.container.createChild();
    G(l, e.HTMLElement, G(l, e.Element, G(l, xs, new t.InstanceProvider("ElementResolver", i))));
    G(l, Ze, new t.InstanceProvider(Di, s));
    G(l, ii, new t.InstanceProvider(Ei, n));
    G(l, vs, null == r ? Ui : new RenderLocationProvider(r));
    G(l, De, qi);
    G(l, si, null == o ? _i : new t.InstanceProvider(Li, o));
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

function $i(e, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    G(c, e.HTMLElement, G(c, e.Element, G(c, xs, new t.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    G(c, Ze, new t.InstanceProvider(Di, i));
    G(c, ii, new t.InstanceProvider(Ei, r));
    G(c, vs, null == l ? Ui : new t.InstanceProvider(Pi, l));
    G(c, De, null == o ? qi : new ViewFactoryProvider(o));
    G(c, si, null == h ? _i : new t.InstanceProvider(Li, h));
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

const Ui = new RenderLocationProvider(null);

const qi = new ViewFactoryProvider(null);

const _i = new t.InstanceProvider(Li, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function ji(t) {
    return function(e) {
        return Ni.define(t, e);
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
        return new BindingCommandDefinition(s, t.firstDefined(Vi(s, "name"), i), t.mergeArrays(Vi(s, "aliases"), n.aliases, s.aliases), Mi(i), t.firstDefined(Vi(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        V(s, e).register(t);
        N(s, e).register(t);
        K(i, Ni, s, t);
    }
}

const Fi = d("binding-command");

const Mi = t => `${Fi}:${t}`;

const Vi = (t, e) => l(f(e), t);

const Ni = Object.freeze({
    name: Fi,
    keyFrom: Mi,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c(Fi, s, s.Type);
        c(Fi, s, s);
        p(e, Fi);
        return s.Type;
    },
    getAnnotation: Vi
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

exports.OneTimeBindingCommand = r([ ji("one-time") ], exports.OneTimeBindingCommand);

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

exports.ToViewBindingCommand = r([ ji("to-view") ], exports.ToViewBindingCommand);

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

exports.FromViewBindingCommand = r([ ji("from-view") ], exports.FromViewBindingCommand);

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

exports.TwoWayBindingCommand = r([ ji("two-way") ], exports.TwoWayBindingCommand);

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

exports.DefaultBindingCommand = r([ ji("bind") ], exports.DefaultBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(e, s) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new IteratorBindingInstruction(s.parse(e.attr.rawValue, 2), i);
    }
};

exports.ForBindingCommand = r([ ji("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, false);
    }
};

exports.TriggerBindingCommand = r([ ji("trigger") ], exports.TriggerBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, true);
    }
};

exports.CaptureBindingCommand = r([ ji("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.AttrBindingCommand = r([ ji("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.StyleBindingCommand = r([ ji("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.ClassBindingCommand = r([ ji("class") ], exports.ClassBindingCommand);

let Hi = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Hi = r([ ji("ref") ], Hi);

let Wi = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Wi = r([ ji("...$attrs") ], Wi);

const zi = M("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const Gi = t => {
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
        this.ue = Object.assign(g(), {
            a: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: Gi("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: g(),
            altGlyphDef: Gi("id xml:base xml:lang xml:space"),
            altglyphdef: g(),
            altGlyphItem: Gi("id xml:base xml:lang xml:space"),
            altglyphitem: g(),
            animate: Gi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: Gi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: Gi("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: Gi("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: Gi("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: Gi("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": Gi("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: Gi("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: Gi("class id style xml:base xml:lang xml:space"),
            ellipse: Gi("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: Gi("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: Gi("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: Gi("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: Gi("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: Gi("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: Gi("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: Gi("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: Gi("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: Gi("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: Gi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: Gi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: Gi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: Gi("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: Gi("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: Gi("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: Gi("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: Gi("id xml:base xml:lang xml:space"),
            feMorphology: Gi("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: Gi("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: Gi("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: Gi("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: Gi("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: Gi("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: Gi("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: Gi("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: Gi("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": Gi("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": Gi("id string xml:base xml:lang xml:space"),
            "font-face-name": Gi("id name xml:base xml:lang xml:space"),
            "font-face-src": Gi("id xml:base xml:lang xml:space"),
            "font-face-uri": Gi("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: Gi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: Gi("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: Gi("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: g(),
            hkern: Gi("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: Gi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: Gi("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: Gi("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: Gi("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: Gi("id xml:base xml:lang xml:space"),
            "missing-glyph": Gi("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: Gi("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: Gi("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: Gi("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: Gi("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: Gi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: Gi("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: Gi("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: Gi("class id offset style xml:base xml:lang xml:space"),
            style: Gi("id media title type xml:base xml:lang xml:space"),
            svg: Gi("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: Gi("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: Gi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: Gi("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: Gi("class id style xml:base xml:lang xml:space"),
            tref: Gi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: Gi("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: Gi("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: Gi("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: Gi("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.fe = Gi("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.de = Gi("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return V(zi, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.fe[t.nodeName] && true === this.de[e] || true === this.ue[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ le ];

const Xi = M("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.pe = g();
        this.me = g();
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
        return [ zi ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.pe)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw Qi(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.me;
        for (const s in t) {
            if (void 0 !== e[s]) throw Qi(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return Ki(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.pe[t.nodeName]?.[e] ?? this.me[e] ?? (y(t, e, this.svg) ? e : null);
    }
}

function Ki(t, e) {
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

function Qi(t, e) {
    return v(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const Yi = M("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Zi = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.xe = t.document.createElement("template");
    }
    createTemplate(t) {
        if (R(t)) {
            let e = Zi[t];
            if (void 0 === e) {
                const s = this.xe;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.xe = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Zi[t] = e;
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

TemplateElementFactory.inject = [ le ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return V(ri, this).register(t);
    }
    compile(e, s, i) {
        const n = CustomElementDefinition.getOrCreate(e);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = en);
        const r = new CompilationContext(e, s, i, null, null, void 0);
        const o = R(n.template) || !e.enhance ? r.ge.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(F(fn));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(cn)) throw v(`AUR0701`);
        this.ve(h, r);
        this.we(h, r);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || Ms(),
            dependencies: (e.dependencies ?? t.emptyArray).concat(r.deps ?? t.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.be(o, r) : t.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, s, i, n) {
        const r = new CompilationContext(e, i, en, null, null, void 0);
        const o = [];
        const l = r.ye(n.nodeName.toLowerCase());
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
        let A;
        let C;
        for (;a > u; ++u) {
            f = s[u];
            A = f.target;
            C = f.rawValue;
            b = r.ke(f);
            if (null !== b && (1 & b.type) > 0) {
                nn.node = n;
                nn.attr = f;
                nn.bindable = null;
                nn.def = null;
                o.push(b.build(nn, r.ep, r.m));
                continue;
            }
            d = r.Ae(A);
            if (null !== d) {
                if (d.isTemplateController) throw v(`AUR0703:${A}`);
                x = BindablesInfo.from(d, true);
                k = false === d.noMultiBindings && null === b && Ji(C);
                if (k) m = this.Ce(n, C, d, r); else {
                    w = x.primary;
                    if (null === b) {
                        y = c.parse(C, 1);
                        m = [ null === y ? new SetPropertyInstruction(C, w.property) : new InterpolationInstruction(y, w.property) ];
                    } else {
                        nn.node = n;
                        nn.attr = f;
                        nn.bindable = w;
                        nn.def = d;
                        m = [ b.build(nn, r.ep, r.m) ];
                    }
                }
                (p ?? (p = [])).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(A) ? A : void 0, m));
                continue;
            }
            if (null === b) {
                y = c.parse(C, 1);
                if (h) {
                    x = BindablesInfo.from(l, false);
                    g = x.attrs[A];
                    if (void 0 !== g) {
                        y = c.parse(C, 1);
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
                        nn.node = n;
                        nn.attr = f;
                        nn.bindable = g;
                        nn.def = l;
                        o.push(new SpreadElementPropBindingInstruction(b.build(nn, r.ep, r.m)));
                        continue;
                    }
                }
                nn.node = n;
                nn.attr = f;
                nn.bindable = null;
                nn.def = null;
                o.push(b.build(nn, r.ep, r.m));
            }
        }
        tn();
        if (null != p) return p.concat(o);
        return o;
    }
    be(e, s) {
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
            u = s.Re.parse(c, a);
            y = u.target;
            k = u.rawValue;
            if (rn[y]) throw v(`AUR0702:${c}`);
            g = s.ke(u);
            if (null !== g && (1 & g.type) > 0) {
                nn.node = e;
                nn.attr = u;
                nn.bindable = null;
                nn.def = null;
                i.push(g.build(nn, s.ep, s.m));
                continue;
            }
            f = s.Ae(y);
            if (null !== f) {
                if (f.isTemplateController) throw v(`AUR0703:${y}`);
                m = BindablesInfo.from(f, true);
                b = false === f.noMultiBindings && null === g && Ji(k);
                if (b) p = this.Ce(e, k, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        w = r.parse(k, 1);
                        p = [ null === w ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(w, x.property) ];
                    } else {
                        nn.node = e;
                        nn.attr = u;
                        nn.bindable = x;
                        nn.def = f;
                        p = [ g.build(nn, s.ep, s.m) ];
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
                nn.node = e;
                nn.attr = u;
                nn.bindable = null;
                nn.def = null;
                i.push(g.build(nn, s.ep, s.m));
            }
        }
        tn();
        if (null != d) return d.concat(i);
        return i;
    }
    we(t, e) {
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
                let s = t.firstChild;
                while (null !== s) s = this.we(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    Be(e, i) {
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
            u = i.Re.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.ke(u);
            if (null !== p) {
                if ("bind" === u.command) o.push(new LetBindingInstruction(l.parse(x, 8), t.camelCase(m))); else throw v(`AUR0704:${u.command}`);
                continue;
            }
            g = l.parse(x, 1);
            o.push(new LetBindingInstruction(null === g ? new s.PrimitiveLiteralExpression(x) : g, t.camelCase(m)));
        }
        i.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.Te(e).nextSibling;
    }
    Se(e, s) {
        var i, n, r, o;
        const l = e.nextSibling;
        const h = (e.getAttribute("as-element") ?? e.nodeName).toLowerCase();
        const c = s.ye(h);
        const a = null !== c;
        const u = a && null != c.shadowOptions;
        const f = c?.capture;
        const d = null != f && "boolean" !== typeof f;
        const p = f ? [] : t.emptyArray;
        const m = s.ep;
        const x = this.debug ? t.noop : () => {
            e.removeAttribute(A);
            --y;
            --b;
        };
        let g = e.attributes;
        let w;
        let b = g.length;
        let y = 0;
        let k;
        let A;
        let C;
        let R;
        let B;
        let S;
        let I = null;
        let T = false;
        let D;
        let E;
        let P;
        let L;
        let O;
        let $;
        let U;
        let q = null;
        let _;
        let j;
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
            A = k.name;
            C = k.value;
            switch (A) {
              case "as-element":
              case "containerless":
                x();
                if (!N) N = "containerless" === A;
                continue;
            }
            R = s.Re.parse(A, C);
            q = s.ke(R);
            F = R.target;
            M = R.rawValue;
            if (f && (!d || d && f(F))) {
                if (null != q && 1 & q.type) {
                    x();
                    p.push(R);
                    continue;
                }
                H = "au-slot" !== F && "slot" !== F;
                if (H) {
                    _ = BindablesInfo.from(c, false);
                    if (null == _.attrs[F] && !s.Ae(F)?.isTemplateController) {
                        x();
                        p.push(R);
                        continue;
                    }
                }
            }
            if (null !== q && 1 & q.type) {
                nn.node = e;
                nn.attr = R;
                nn.bindable = null;
                nn.def = null;
                (B ?? (B = [])).push(q.build(nn, s.ep, s.m));
                x();
                continue;
            }
            I = s.Ae(F);
            if (null !== I) {
                _ = BindablesInfo.from(I, true);
                T = false === I.noMultiBindings && null === q && Ji(M);
                if (T) P = this.Ce(e, M, I, s); else {
                    j = _.primary;
                    if (null === q) {
                        $ = m.parse(M, 1);
                        P = [ null === $ ? new SetPropertyInstruction(M, j.property) : new InterpolationInstruction($, j.property) ];
                    } else {
                        nn.node = e;
                        nn.attr = R;
                        nn.bindable = j;
                        nn.def = I;
                        P = [ q.build(nn, s.ep, s.m) ];
                    }
                }
                x();
                if (I.isTemplateController) (L ?? (L = [])).push(new HydrateTemplateController(sn, this.resolveResources ? I : I.name, void 0, P)); else (E ?? (E = [])).push(new HydrateAttributeInstruction(this.resolveResources ? I : I.name, null != I.aliases && I.aliases.includes(F) ? F : void 0, P));
                continue;
            }
            if (null === q) {
                if (a) {
                    _ = BindablesInfo.from(c, false);
                    D = _.attrs[F];
                    if (void 0 !== D) {
                        $ = m.parse(M, 1);
                        (S ?? (S = [])).push(null == $ ? new SetPropertyInstruction(M, D.property) : new InterpolationInstruction($, D.property));
                        x();
                        continue;
                    }
                }
                $ = m.parse(M, 1);
                if (null != $) {
                    x();
                    (B ?? (B = [])).push(new InterpolationInstruction($, s.m.map(e, F) ?? t.camelCase(F)));
                }
                continue;
            }
            x();
            if (a) {
                _ = BindablesInfo.from(c, false);
                D = _.attrs[F];
                if (void 0 !== D) {
                    nn.node = e;
                    nn.attr = R;
                    nn.bindable = D;
                    nn.def = c;
                    (S ?? (S = [])).push(q.build(nn, s.ep, s.m));
                    continue;
                }
            }
            nn.node = e;
            nn.attr = R;
            nn.bindable = null;
            nn.def = null;
            (B ?? (B = [])).push(q.build(nn, s.ep, s.m));
        }
        tn();
        if (this.De(e) && null != B && B.length > 1) this.Ee(e, B);
        if (a) {
            U = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, S ?? t.emptyArray, null, N, p);
            if (h === vn) {
                const t = e.getAttribute("name") || gn;
                const i = s.h("template");
                const n = s.Pe();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else i.content.appendChild(r);
                    r = e.firstChild;
                }
                this.we(i.content, n);
                U.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: Ms(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.Le(e, s);
            }
        }
        if (null != B || null != U || null != E) {
            w = t.emptyArray.concat(U ?? t.emptyArray, E ?? t.emptyArray, B ?? t.emptyArray);
            this.Te(e);
        }
        let W;
        if (null != L) {
            b = L.length - 1;
            y = b;
            O = L[y];
            let t;
            this.Le(e, s);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = s.h("template");
                t.content.appendChild(e);
            }
            const r = t;
            const o = s.Pe(null == w ? [] : [ w ]);
            let l;
            let f;
            let d;
            let p;
            let m;
            let x;
            let g;
            let k;
            let A = 0, C = 0;
            let R = e.firstChild;
            let B = false;
            if (false !== V) while (null !== R) {
                f = 1 === R.nodeType ? R.getAttribute(vn) : null;
                if (null !== f) R.removeAttribute(vn);
                if (a) {
                    l = R.nextSibling;
                    if (!u) {
                        B = 3 === R.nodeType && "" === R.textContent.trim();
                        if (!B) ((i = p ?? (p = {}))[n = f || gn] ?? (i[n] = [])).push(R);
                        e.removeChild(R);
                    }
                    R = l;
                } else {
                    if (null !== f) {
                        f = f || gn;
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
                    for (A = 0, C = m.length; C > A; ++A) {
                        x = m[A];
                        if ("TEMPLATE" === x.nodeName) if (x.attributes.length > 0) t.content.appendChild(x); else t.content.appendChild(x.content); else t.content.appendChild(x);
                    }
                    k = s.Pe();
                    this.we(t.content, k);
                    d[f] = CustomElementDefinition.create({
                        name: Ms(),
                        template: t,
                        instructions: k.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                U.projections = d;
            }
            if (a && (N || c.containerless)) this.Le(e, s);
            W = !a || !c.containerless && !N && false !== V;
            if (W) if ("TEMPLATE" === e.nodeName) this.we(e.content, o); else {
                R = e.firstChild;
                while (null !== R) R = this.we(R, o);
            }
            O.def = CustomElementDefinition.create({
                name: Ms(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: s.root.def.isStrictBinding
            });
            while (y-- > 0) {
                O = L[y];
                t = s.h("template");
                g = s.h("au-m");
                g.classList.add("au");
                t.content.appendChild(g);
                O.def = CustomElementDefinition.create({
                    name: Ms(),
                    template: t,
                    needsCompile: false,
                    instructions: [ [ L[y + 1] ] ],
                    isStrictBinding: s.root.def.isStrictBinding
                });
            }
            s.rows.push([ O ]);
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
                n = 1 === t.nodeType ? t.getAttribute(vn) : null;
                if (null !== n) t.removeAttribute(vn);
                if (a) {
                    i = t.nextSibling;
                    if (!u) {
                        g = 3 === t.nodeType && "" === t.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || gn] ?? (r[o] = [])).push(t);
                        e.removeChild(t);
                    }
                    t = i;
                } else {
                    if (null !== n) {
                        n = n || gn;
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
                    x = s.Pe();
                    this.we(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: Ms(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                U.projections = l;
            }
            if (a && (N || c.containerless)) this.Le(e, s);
            W = !a || !c.containerless && !N && false !== V;
            if (W && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.we(t, s);
            }
        }
        return l;
    }
    Ie(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.Te(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    Ce(t, e, s, i) {
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
                f = i.Re.parse(l, h);
                d = i.ke(f);
                p = n.attrs[f.target];
                if (null == p) throw v(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    nn.node = t;
                    nn.attr = f;
                    nn.bindable = p;
                    nn.def = s;
                    o.push(d.build(nn, i.ep, i.m));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        tn();
        return o;
    }
    ve(e, s) {
        const i = e;
        const n = t.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw v(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const e of n) {
            if (e.parentNode !== i) throw v(`AUR0709`);
            const n = an(e, o);
            const r = class LocalTemplate {};
            const h = e.content;
            const c = t.toArray(h.querySelectorAll("bindable"));
            const a = O.for(r);
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
                    mode: un(t)
                });
                const i = t.getAttributeNames().filter((t => !hn.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Oe(Ns({
                name: n,
                template: e
            }, r));
            i.removeChild(e);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) Gs(l[h]).dependencies.push(...s.def.dependencies ?? t.emptyArray, ...s.deps ?? t.emptyArray);
    }
    De(t) {
        return "INPUT" === t.nodeName && 1 === on[t.type];
    }
    Ee(t, e) {
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
    Te(t) {
        t.classList.add("au");
        return t;
    }
    Le(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.Te(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(e, i, n, r, o, l) {
        this.hasSlot = false;
        this.$e = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = e;
        this.ci = n;
        this.parent = r;
        this.ge = h ? r.ge : i.get(Yi);
        this.Re = h ? r.Re : i.get(tt);
        this.ep = h ? r.ep : i.get(s.IExpressionParser);
        this.m = h ? r.m : i.get(Xi);
        this.Ue = h ? r.Ue : i.get(t.ILogger);
        this.p = h ? r.p : i.get(le);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
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
        return this.c.find(Qs, t);
    }
    Ae(t) {
        return this.c.find(Qt, t);
    }
    Pe(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ke(t) {
        if (this.root !== this) return this.root.ke(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.$e[e];
        if (void 0 === s) {
            s = this.c.create(Ni, e);
            if (null === s) throw v(`AUR0713:${e}`);
            this.$e[e] = s;
        }
        return s;
    }
}

function Ji(t) {
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

function tn() {
    nn.node = nn.attr = nn.bindable = nn.def = null;
}

const en = {
    projections: null
};

const sn = {
    name: "unnamed"
};

const nn = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const rn = Object.assign(g(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const on = {
    checkbox: 1,
    radio: 1
};

const ln = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = ln.get(t);
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
            ln.set(t, s = new BindablesInfo(n, i, c));
        }
        return s;
    }
}

const hn = Object.freeze([ "property", "attribute", "mode" ]);

const cn = "as-custom-element";

function an(t, e) {
    const s = t.getAttribute(cn);
    if (null === s || "" === s) throw v(`AUR0715`);
    if (e.has(s)) throw v(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(cn);
    }
    return s;
}

function un(t) {
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

const fn = M("ITemplateCompilerHooks");

const dn = new WeakMap;

const pn = d("compiler-hooks");

const mn = Object.freeze({
    name: pn,
    define(t) {
        let e = dn.get(t);
        if (void 0 === e) {
            dn.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(pn, e, t);
            p(t, pn);
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
        t.register(V(fn, this.Type));
    }
}

const xn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return mn.define(t);
    }
};

const gn = "default";

const vn = "au-slot";

const wn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        wn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = wn.get(e);
        wn.delete(e);
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

ft("oneTime")(OneTimeBindingBehavior);

ft("toView")(ToViewBindingBehavior);

ft("fromView")(FromViewBindingBehavior);

ft("twoWay")(TwoWayBindingBehavior);

const bn = new WeakMap;

const yn = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, s) {
        s = Number(s);
        const i = {
            type: "debounce",
            delay: s > 0 ? s : yn,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(i);
        if (null == n) ; else bn.set(e, n);
    }
    unbind(t, e) {
        bn.get(e)?.dispose();
        bn.delete(e);
    }
}

DebounceBindingBehavior.inject = [ t.IPlatform ];

ft("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.qe = new Map;
        this._e = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw v(`AUR0817`);
        if (0 === s.length) throw v(`AUR0818`);
        this.qe.set(e, s);
        let i;
        for (i of s) this._e.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.qe.get(e);
        this.qe.delete(e);
        let i;
        for (i of s) this._e.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ s.ISignaler ];

ft("signal")(SignalBindingBehavior);

const kn = new WeakMap;

const An = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.je = t.performanceNow;
        this.lt = t.taskQueue;
    }
    bind(t, e, s) {
        s = Number(s);
        const i = {
            type: "throttle",
            delay: s > 0 ? s : An,
            now: this.je,
            queue: this.lt
        };
        const n = e.limit?.(i);
        if (null == n) ; else kn.set(e, n);
    }
    unbind(t, e) {
        kn.get(e)?.dispose();
        kn.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ t.IPlatform ];

ft("throttle")(ThrottleBindingBehavior);

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

fe(DataAttributeAccessor);

const Cn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        if (!(e instanceof PropertyBinding)) throw v(`AURxxxx`);
        e.useTargetObserver(Cn);
    }
}

ft("attr")(AttrBindingBehavior);

function Rn(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw v(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Rn;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ft("self")(SelfBindingBehavior);

const Bn = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Bn[t] ?? (Bn[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s) {
        if (null == t) e.removeAttributeNS(this.ns, s); else e.setAttributeNS(this.ns, s, t);
    }
}

fe(AttributeNSAccessor);

function Sn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Fe = void 0;
        this.Me = void 0;
        this.yt = false;
        this.bt = t;
        this.oL = i;
        this.wt = s;
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
        this.st();
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
        const s = w.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Sn;
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
        const e = this.bt;
        const s = w.call(e, "model") ? e.model : e.value;
        const i = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Sn;
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
        this.Ve();
    }
    At() {
        this.Fe?.unsubscribe(this);
        this.Me?.unsubscribe(this);
        this.Fe = this.Me = void 0;
    }
    st() {
        In = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, In);
    }
    Ve() {
        const t = this.bt;
        (this.Me ?? (this.Me = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Fe?.unsubscribe(this);
        this.Fe = void 0;
        if ("checkbox" === t.type) (this.Fe = Fn(this.v, this.oL))?.subscribe(this);
    }
}

ae(CheckedObserver);

s.subscriberCollection(CheckedObserver);

let In;

const Tn = {
    childList: true,
    subtree: true,
    characterData: true
};

function Dn(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Z = false;
        this.He = void 0;
        this.We = void 0;
        this.iO = false;
        this.yt = false;
        this.bt = t;
        this.oL = i;
        this.wt = s;
    }
    getValue() {
        return this.iO ? this.v : this.bt.multiple ? En(this.bt.options) : this.bt.value;
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
        const s = A(t);
        const i = e.matcher ?? Dn;
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
        const t = this.bt;
        const e = t.options;
        const s = e.length;
        const i = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(i instanceof Array)) return true;
            let r;
            const o = t.matcher || Dn;
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
    kt() {
        (this.We = new this.bt.ownerDocument.defaultView.MutationObserver(this.Ge.bind(this))).observe(this.bt, Tn);
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
            if (!this.bt.multiple) throw v(`AUR0654`);
            (this.He = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.st();
    }
    Ge(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.st();
    }
    st() {
        Pn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Pn);
    }
}

ae(SelectValueObserver);

s.subscriberCollection(SelectValueObserver);

function En(t) {
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

let Pn;

const Ln = "--";

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
    Ke(e) {
        let s;
        let i;
        const n = [];
        for (i in e) {
            s = e[i];
            if (null == s) continue;
            if (R(s)) {
                if (i.startsWith(Ln)) {
                    n.push([ i, s ]);
                    continue;
                }
                n.push([ t.kebabCase(i), s ]);
                continue;
            }
            n.push(...this.Qe(s));
        }
        return n;
    }
    Ye(e) {
        const s = e.length;
        if (s > 0) {
            const t = [];
            let i = 0;
            for (;s > i; ++i) t.push(...this.Qe(e[i]));
            return t;
        }
        return t.emptyArray;
    }
    Qe(e) {
        if (R(e)) return this.Xe(e);
        if (e instanceof Array) return this.Ye(e);
        if (e instanceof Object) return this.Ke(e);
        return t.emptyArray;
    }
    et() {
        if (this.Z) {
            this.Z = false;
            const t = this.v;
            const e = this.styles;
            const s = this.Qe(t);
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

fe(StyleAttributeAccessor);

class ValueAttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.Z = false;
        this.yt = false;
        this.bt = t;
        this.k = e;
        this.wt = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (I(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.Z = true;
        if (!this.wt.readonly) this.et();
    }
    et() {
        if (this.Z) {
            this.Z = false;
            this.bt[this.k] = this.v ?? this.wt.default;
            this.st();
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.bt[this.k];
        if (this.ov !== this.v) {
            this.Z = false;
            this.st();
        }
    }
    kt() {
        this.v = this.ov = this.bt[this.k];
    }
    st() {
        On = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, On);
    }
}

ae(ValueAttributeObserver);

s.subscriberCollection(ValueAttributeObserver);

let On;

const $n = "http://www.w3.org/1999/xlink";

const Un = "http://www.w3.org/XML/1998/namespace";

const qn = "http://www.w3.org/2000/xmlns/";

const _n = Object.assign(g(), {
    "xlink:actuate": [ "actuate", $n ],
    "xlink:arcrole": [ "arcrole", $n ],
    "xlink:href": [ "href", $n ],
    "xlink:role": [ "role", $n ],
    "xlink:show": [ "show", $n ],
    "xlink:title": [ "title", $n ],
    "xlink:type": [ "type", $n ],
    "xml:lang": [ "lang", Un ],
    "xml:space": [ "space", Un ],
    xmlns: [ "xmlns", qn ],
    "xmlns:xlink": [ "xlink", qn ]
});

const jn = new s.PropertyAccessor;

jn.type = 2 | 4;

class NodeObserverLocator {
    constructor(t, e, s, i) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = s;
        this.svgAnalyzer = i;
        this.allowDirtyCheck = true;
        this.Ze = g();
        this.Je = g();
        this.ts = g();
        this.es = g();
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
        const i = this.Ze;
        let n;
        if (R(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = s; else Mn(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = r[e]; else Mn(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Je;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = t[e]; else Mn("*", e); else if (null == s[t]) s[t] = e; else Mn("*", t);
    }
    getAccessor(e, s, i) {
        if (s in this.es || s in (this.ts[e.tagName] ?? t.emptyObject)) return this.getObserver(e, s, i);
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
            return Cn;

          default:
            {
                const t = _n[s];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (y(e, s, this.svgAnalyzer)) return Cn;
                return jn;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (R(t)) {
            n = (s = this.ts)[t] ?? (s[t] = g());
            n[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            n = (i = this.ts)[e] ?? (i[e] = g());
            n[s] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.es[e] = true;
    }
    getNodeObserverConfig(t, e) {
        return this.Ze[t.tagName]?.[e] ?? this.Je[e];
    }
    getNodeObserver(t, e, i) {
        const n = this.Ze[t.tagName]?.[e] ?? this.Je[e];
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
        const r = _n[e];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (y(t, e, this.svgAnalyzer)) return Cn;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw v(`AUR0652:${String(e)}`);
        } else return new s.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, le, s.IDirtyChecker, zi ];

function Fn(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Mn(t, e) {
    throw v(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t, e) {
        if (!(e instanceof NodeObserverLocator)) throw v("AURxxxx: updateTrigger binding behavior only works with the default implementation of Aurelia HTML observation. Implement your own node observation + updateTrigger");
        this.oL = t;
        this.ss = e;
    }
    bind(t, e, ...s) {
        if (0 === s.length) throw v(`AUR0802`);
        if (!(e instanceof PropertyBinding) || !(4 & e.mode)) throw v(`AUR0803`);
        const i = this.ss.getNodeObserverConfig(e.target, e.targetProperty);
        if (null == i) throw v(`AURxxxx`);
        const n = this.ss.getNodeObserver(e.target, e.targetProperty, this.oL);
        n.useConfig({
            readonly: i.readonly,
            default: i.default,
            events: s
        });
        e.useTargetObserver(n);
    }
}

UpdateTriggerBindingBehavior.inject = [ s.IObserverLocator, s.INodeObserverLocator ];

ft("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.rs = false;
        this.os = t;
        this.p = e;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.ls(); else this.rs = true;
    }
    attached() {
        if (this.rs) {
            this.rs = false;
            this.ls();
        }
        this.os.addEventListener("focus", this);
        this.os.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.os;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.cs) this.value = false;
    }
    ls() {
        const t = this.os;
        const e = this.cs;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get cs() {
        return this.os === this.p.document.activeElement;
    }
}

Focus.inject = [ xs, le ];

r([ E({
    mode: 6
}) ], Focus.prototype, "value", void 0);

Mt("focus")(Focus);

let Vn = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.us = false;
        this.dt = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.dt = null;
            if (Boolean(this.value) !== this.ds) if (this.ds === this.ps) {
                this.ds = !this.ps;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.ds = this.ps;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.ds = this.ps = "hide" !== s.alias;
    }
    binding() {
        this.us = true;
        this.update();
    }
    detaching() {
        this.us = false;
        this.dt?.cancel();
        this.dt = null;
    }
    valueChanged() {
        if (this.us && null === this.dt) this.dt = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ E ], Vn.prototype, "value", void 0);

Vn = r([ o(0, xs), o(1, le), o(2, ii) ], Vn);

X("hide")(Vn);

Mt("show")(Vn);

class Portal {
    constructor(t, e, s) {
        this.strict = false;
        this.p = s;
        this.xs = s.document.createElement("div");
        this.view = t.create();
        ys(this.view.nodes, e);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.xs = this.gs();
        this.view.setHost(i);
        return this.vs(t, i, s);
    }
    detaching(t, e, s) {
        return this.ws(t, this.xs, s);
    }
    targetChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        const s = this.xs;
        const i = this.xs = this.gs();
        if (s === i) return;
        this.view.setHost(i);
        const n = t.onResolve(this.ws(null, i, e.flags), (() => this.vs(null, i, e.flags)));
        if (k(n)) n.catch((t => {
            throw t;
        }));
    }
    vs(e, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return t.onResolve(n?.call(r, s, o), (() => this.bs(e, s, i)));
    }
    bs(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.appendTo(s); else return t.onResolve(r.activate(e ?? r, n, i, n.scope), (() => this.ys(s)));
        return this.ys(s);
    }
    ys(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    ws(e, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return t.onResolve(n?.call(r, s, o), (() => this.ks(e, s, i)));
    }
    ks(e, s, i) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, i), (() => this.As(s)));
        return this.As(s);
    }
    As(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    gs() {
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

Portal.inject = [ De, vs, le ];

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
        this.Cs = false;
        this.Rs = 0;
        this.Bs = t;
        this.l = e;
    }
    attaching(e, s, i) {
        let n;
        const r = this.$controller;
        const o = this.Rs++;
        const l = () => !this.Cs && this.Rs === o + 1;
        return t.onResolve(this.pending, (() => {
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.Bs.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == n) return;
            n.setLocation(this.l);
            this.pending = t.onResolve(n.activate(e, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(e, s, i) {
        this.Cs = true;
        return t.onResolve(this.pending, (() => {
            this.Cs = false;
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
        const o = this.Rs++;
        const l = () => !this.Cs && this.Rs === o + 1;
        let h;
        return t.onResolve(this.pending, (() => this.pending = t.onResolve(n?.deactivate(n, r, i), (() => {
            if (!l()) return;
            if (e) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.Bs.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
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

If.inject = [ De, vs ];

r([ E ], If.prototype, "value", void 0);

r([ E({
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

Else.inject = [ De ];

Vt({
    name: "else"
})(Else);

function Nn(t) {
    t.dispose();
}

const Hn = [ 18, 17 ];

class Repeat {
    constructor(t, e, s) {
        this.views = [];
        this.key = void 0;
        this.Ss = void 0;
        this.Is = false;
        this.Ts = false;
        this.Ds = null;
        this.Es = void 0;
        this.Ps = false;
        this.l = t;
        this.Ls = e;
        this.f = s;
    }
    binding(t, e, i) {
        const n = this.Ls.bindings;
        const r = n.length;
        let o;
        let l;
        let h = 0;
        for (;r > h; ++h) {
            o = n[h];
            if (o.target === this && "items" === o.targetProperty) {
                l = this.forOf = o.ast;
                this.Os = o;
                let t = l.iterable;
                while (null != t && Hn.includes(t.$kind)) {
                    t = t.expression;
                    this.Is = true;
                }
                this.Ds = t;
                break;
            }
        }
        this.$s();
        const c = l.declaration;
        if (!(this.Ps = 24 === c.$kind || 25 === c.$kind)) this.local = s.astEvaluate(c, this.$controller.scope, o, null);
    }
    attaching(t, e, s) {
        this.Us();
        return this.qs(t);
    }
    detaching(t, e, s) {
        this.$s();
        return this._s(t);
    }
    itemsChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        this.$s();
        this.Us();
        const s = t.onResolve(this._s(null), (() => this.qs(null)));
        if (k(s)) s.catch(S);
    }
    handleCollectionChange(e, i) {
        const n = this.$controller;
        if (!n.isActive) return;
        if (this.Is) {
            if (this.Ts) return;
            this.Ts = true;
            this.items = s.astEvaluate(this.forOf.iterable, n.scope, this.Os, null);
            this.Ts = false;
            return;
        }
        this.Us();
        if (void 0 === i) {
            const e = t.onResolve(this._s(null), (() => this.qs(null)));
            if (k(e)) e.catch(S);
        } else {
            const e = this.views.length;
            const n = s.applyMutationsToIndices(i);
            if (n.deletedIndices.length > 0) {
                const s = t.onResolve(this.js(n), (() => this.Fs(e, n)));
                if (k(s)) s.catch(S);
            } else this.Fs(e, n);
        }
    }
    $s() {
        const t = this.$controller.scope;
        let e = this.Ms;
        let i = this.Is;
        let n;
        if (i) {
            e = this.Ms = s.astEvaluate(this.Ds, t, this.Os, null) ?? null;
            i = this.Is = !Object.is(this.items, e);
        }
        const r = this.Ss;
        if (this.$controller.isActive) {
            n = this.Ss = s.getCollectionObserver(i ? e : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.Ss = void 0;
        }
    }
    Us() {
        const t = this.items;
        if (A(t)) {
            this.Es = t;
            return;
        }
        const e = [];
        Jn(t, ((t, s) => {
            e[s] = t;
        }));
        this.Es = e;
    }
    qs(t) {
        let e;
        let i;
        let n;
        let r;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = Zn(a);
        const p = this.views = Array(d);
        Jn(a, ((a, m) => {
            n = p[m] = l.create().setLocation(c);
            n.nodes.unlink();
            if (this.Ps) s.astAssign(f.declaration, r = s.Scope.fromParent(u, new s.BindingContext), this.Os, a); else r = s.Scope.fromParent(u, new s.BindingContext(h, a));
            Qn(r.overrideContext, m, d);
            i = n.activate(t ?? n, o, 0, r);
            if (k(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    _s(t) {
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
    js(t) {
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
    Fs(t, e) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, Es: u, l: f, views: d} = this;
        const p = e.length;
        for (;p > l; ++l) if (-2 === e[l]) {
            r = c.create();
            d.splice(l, 0, r);
        }
        if (d.length !== p) throw Kn(d.length, p);
        const m = h.scope;
        const x = e.length;
        s.synchronizeIndices(d, e);
        const g = Xn(e);
        const v = g.length;
        let w;
        let b = v - 1;
        l = x - 1;
        for (;l >= 0; --l) {
            r = d[l];
            w = d[l + 1];
            r.nodes.link(w?.nodes ?? f);
            if (-2 === e[l]) {
                if (this.Ps) s.astAssign(this.forOf.declaration, o = s.Scope.fromParent(m, new s.BindingContext), this.Os, u[l]); else o = s.Scope.fromParent(m, new s.BindingContext(a, u[l]));
                Qn(o.overrideContext, l, x);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (k(n)) (i ?? (i = [])).push(n);
            } else if (b < 0 || 1 === v || l !== g[b]) {
                Qn(r.scope.overrideContext, l, x);
                r.nodes.insertBefore(r.location);
            } else {
                if (t !== x) Qn(r.scope.overrideContext, l, x);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(Nn);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ vs, Ze, De ];

r([ E ], Repeat.prototype, "items", void 0);

Vt("repeat")(Repeat);

let Wn = 16;

let zn = new Int32Array(Wn);

let Gn = new Int32Array(Wn);

function Xn(t) {
    const e = t.length;
    if (e > Wn) {
        Wn = e;
        zn = new Int32Array(e);
        Gn = new Int32Array(e);
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
            o = zn[s];
            n = t[o];
            if (-2 !== n && n < i) {
                Gn[r] = o;
                zn[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[zn[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[zn[l]];
            if (i < n || -2 === n) {
                if (l > 0) Gn[r] = zn[l - 1];
                zn[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = zn[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = Gn[i];
    }
    while (r-- > 0) zn[r] = 0;
    return a;
}

const Kn = (t, e) => v(`AUR0814:${t}!=${e}`);

const Qn = (t, e, s) => {
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

const Yn = Object.prototype.toString;

const Zn = t => {
    switch (Yn.call(t)) {
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
        throw v(`Cannot count ${Yn.call(t)}`);
    }
};

const Jn = (t, e) => {
    switch (Yn.call(t)) {
      case "[object Array]":
        return tr(t, e);

      case "[object Map]":
        return er(t, e);

      case "[object Set]":
        return sr(t, e);

      case "[object Number]":
        return ir(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw v(`Cannot iterate over ${Yn.call(t)}`);
    }
};

const tr = (t, e) => {
    const s = t.length;
    let i = 0;
    for (;i < s; ++i) e(t[i], i, t);
};

const er = (t, e) => {
    let s = -0;
    let i;
    for (i of t.entries()) e(i, s++, t);
};

const sr = (t, e) => {
    let s = 0;
    let i;
    for (i of t.keys()) e(i, s++, t);
};

const ir = (t, e) => {
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

With.inject = [ De, vs ];

r([ E ], With.prototype, "value", void 0);

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
        this.queue((() => this.Vs(t)));
    }
    Vs(e) {
        const s = e.isMatch(this.value);
        const i = this.activeCases;
        const n = i.length;
        if (!s) {
            if (n > 0 && i[0].id === e.id) return this.Ns(null);
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
        return t.onResolve(this.Ns(null, r), (() => {
            this.activeCases = r;
            return this.Hs(null);
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
        return t.onResolve(this.activeCases.length > 0 ? this.Ns(e, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Hs(e);
        }));
    }
    Hs(e) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(e, 0, r);
        return t.resolveAll(...i.map((t => t.activate(e, 0, r))));
    }
    Ns(e, s = []) {
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

exports.Switch = r([ Vt("switch"), o(0, De), o(1, vs) ], exports.Switch);

let nr = 0;

exports.Case = class Case {
    constructor(t, e, s, i) {
        this.f = t;
        this.Ws = e;
        this.l = s;
        this.id = ++nr;
        this.fallThrough = false;
        this.view = void 0;
        this.zs = i.config.level <= 1;
        this.Ue = i.scopeTo(`${this.constructor.name}-#${this.id}`);
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
        this.Ue.debug("isMatch()");
        const e = this.value;
        if (A(e)) {
            if (void 0 === this.Ss) this.Ss = this.Gs(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (A(t)) {
            this.Ss?.unsubscribe(this);
            this.Ss = this.Gs(t);
        } else if (void 0 !== this.Ss) this.Ss.unsubscribe(this);
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
        this.Ss?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Gs(t) {
        const e = this.Ws.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ De, s.IObserverLocator, vs, t.ILogger ];

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

r([ E ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ Vt("promise"), o(0, De), o(1, vs), o(2, le), o(3, t.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        rr(t).pending = this;
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

exports.PendingTemplateController = r([ Vt("pending"), o(0, De), o(1, vs) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        rr(t).fulfilled = this;
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

exports.FulfilledTemplateController = r([ Vt("then"), o(0, De), o(1, vs) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, s, i) {
        rr(t).rejected = this;
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

exports.RejectedTemplateController = r([ Vt("catch"), o(0, De), o(1, vs) ], exports.RejectedTemplateController);

function rr(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw v(`AUR0813`);
}

let or = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

or = r([ et({
    pattern: "promise.resolve",
    symbols: ""
}) ], or);

let lr = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

lr = r([ et({
    pattern: "then",
    symbols: ""
}) ], lr);

let hr = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

hr = r([ et({
    pattern: "catch",
    symbols: ""
}) ], hr);

function cr(t, e, s, i) {
    if (R(e)) return ar(t, e, s, i);
    if (Hs(e)) return ur(t, e, s, i);
    throw v(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Xs = s;
        this.Ks = void 0;
    }
    get definition() {
        if (void 0 === this.Ks) this.Ks = CustomElementDefinition.create({
            name: Ms(),
            template: this.node,
            needsCompile: R(this.node),
            instructions: this.instructions,
            dependencies: this.Xs
        });
        return this.Ks;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(_e).getViewFactory(this.definition, t.createChild().register(...this.Xs));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Xs);
    }
}

function ar(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (ni(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) fr(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function ur(t, e, s, i) {
    const n = Gs(e);
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
        if (ni(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) fr(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function fr(t, e, s, i, n) {
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

function dr(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, e, s, i) {
        this.p = t;
        this.Qs = e;
        this.Ys = s;
        this.r = i;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Zs = void 0;
        this.Js = e.props.reduce(dr, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.Zs !== i) {
            this.Zs = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.ks(this.view, t, s);
    }
    componentChanged(e, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Zs === e) return;
        this.Zs = e;
        this.composing = true;
        i |= n.flags;
        const r = t.onResolve(this.ks(this.view, null, i), (() => this.compose(void 0, e, null, i)));
        if (k(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(e, s, i, n) {
        return t.onResolve(void 0 === e ? t.onResolve(s, (t => this.ti(t, n))) : e, (t => this.bs(this.view = t, i, n)));
    }
    ks(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    bs(e, s, i) {
        const {$controller: n} = this;
        return t.onResolve(e?.activate(s ?? e, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    ti(t, e) {
        const s = this.ei(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    ei(t, e) {
        if (null == t) return;
        const s = this.Ys.controller.container;
        if ("object" === typeof t) {
            if (pr(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (R(t)) {
            const e = s.find(Qs, t);
            if (null == e) throw v(`AUR0809:${t}`);
            t = e.Type;
        }
        return cr(this.p, t, this.Js, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ le, ii, Je, _e ];

r([ E ], AuRender.prototype, "component", void 0);

r([ E({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

Ss({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function pr(t) {
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
        this.si = void 0;
        this.r = t.get(_e);
        this.Qs = r;
        this.ii = o;
    }
    static get inject() {
        return [ t.IContainer, Ze, xs, vs, le, ii, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.ni;
    }
    get composition() {
        return this.si;
    }
    attaching(e, s, i) {
        return this.ni = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this.ii.isCurrent(t)) this.ni = void 0;
        }));
    }
    detaching(e) {
        const s = this.si;
        const i = this.ni;
        this.ii.invalidate();
        this.si = this.ni = void 0;
        return t.onResolve(i, (() => s?.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.si) {
            this.si.update(this.model);
            return;
        }
        this.ni = t.onResolve(this.ni, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this.ii.isCurrent(t)) this.ni = void 0;
        }))));
    }
    queue(e, s) {
        const i = this.ii;
        const n = this.si;
        return t.onResolve(i.create(e), (e => {
            if (i.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (i.isCurrent(e)) return t.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(e)) {
                        this.si = r;
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
                    projections: this.Qs.projections
                }, d);
                return new CompositionController(s, (t => s.activate(t ?? s, u, 1, u.scope.parent)), (e => t.onResolve(s.deactivate(e ?? s, u, 2), r)), (t => i.activate?.(t)), e);
            } else {
                const t = CustomElementDefinition.create({
                    name: Qs.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? s.Scope.fromParent(this.parent.scope, i) : s.Scope.create(i);
                if (As(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), e);
            }
        };
        if ("activate" in i) return t.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(e, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = As(i);
        G(e, n.Element, G(e, xs, new t.InstanceProvider("ElementResolver", r ? null : i)));
        G(e, vs, new t.InstanceProvider("IRenderLocation", r ? i : null));
        const o = e.invoke(s);
        G(e, s, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = C(t) ? t : t?.constructor;
        return Qs.isType(e) ? Qs.getDefinition(e) : null;
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

Ss("au-compose")(AuCompose);

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
        this.ri = null;
        this.oi = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.li = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.li = true;
        }
        this.Ys = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ vs, ii, Je, _e ];
    }
    binding(t, e, i) {
        this.ri = this.$controller.scope.parent;
        let n;
        if (this.li) {
            n = this.Ys.controller.scope.parent;
            (this.oi = s.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.ri.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.li ? this.oi : this.ri);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.li && null != this.oi) this.oi.overrideContext.$host = t;
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

Ss({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const mr = M("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw v('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.hi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.hi.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, mr) ], exports.SanitizeValueConverter);

xt("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.ai = t;
    }
    toView(t, e) {
        return this.ai.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, qe) ], exports.ViewValueConverter);

xt("view")(exports.ViewValueConverter);

const xr = DebounceBindingBehavior;

const gr = OneTimeBindingBehavior;

const vr = ToViewBindingBehavior;

const wr = FromViewBindingBehavior;

const br = SignalBindingBehavior;

const yr = ThrottleBindingBehavior;

const kr = TwoWayBindingBehavior;

const Ar = TemplateCompiler;

const Cr = NodeObserverLocator;

const Rr = [ Ar, Cr ];

const Br = SVGAnalyzer;

const Sr = exports.AtPrefixedTriggerAttributePattern;

const Ir = exports.ColonPrefixedBindAttributePattern;

const Tr = exports.RefAttributePattern;

const Dr = exports.DotSeparatedAttributePattern;

const Er = ot;

const Pr = [ Tr, Dr, Er ];

const Lr = [ Sr, Ir ];

const Or = exports.DefaultBindingCommand;

const $r = exports.ForBindingCommand;

const Ur = exports.FromViewBindingCommand;

const qr = exports.OneTimeBindingCommand;

const _r = exports.ToViewBindingCommand;

const jr = exports.TwoWayBindingCommand;

const Fr = Hi;

const Mr = exports.TriggerBindingCommand;

const Vr = exports.CaptureBindingCommand;

const Nr = exports.AttrBindingCommand;

const Hr = exports.ClassBindingCommand;

const Wr = exports.StyleBindingCommand;

const zr = Wi;

const Gr = [ Or, qr, Ur, _r, jr, $r, Fr, Mr, Vr, Hr, Wr, Nr, zr ];

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

const lo = or;

const ho = lr;

const co = hr;

const ao = AttrBindingBehavior;

const uo = SelfBindingBehavior;

const fo = UpdateTriggerBindingBehavior;

const po = AuRender;

const mo = AuCompose;

const xo = Portal;

const go = Focus;

const vo = Vn;

const wo = [ xr, gr, vr, wr, br, yr, kr, Xr, Kr, Qr, Yr, Zr, Jr, to, eo, so, io, no, ro, oo, lo, ho, co, ao, uo, fo, po, mo, xo, go, vo, AuSlot ];

const bo = di;

const yo = fi;

const ko = gi;

const Ao = wi;

const Co = mi;

const Ro = vi;

const Bo = xi;

const So = ui;

const Io = pi;

const To = yi;

const Do = Bi;

const Eo = ki;

const Po = Ai;

const Lo = Ci;

const Oo = Ri;

const $o = bi;

const Uo = Si;

const qo = [ Ro, Ao, Bo, ko, So, yo, bo, Io, Co, To, Do, Eo, Po, Lo, Oo, $o, Uo ];

const _o = jo(t.noop);

function jo(t) {
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
            return e.register(H(s.ICoercionConfiguration, i.coercingOptions), ...Rr, ...wo, ...Pr, ...Gr, ...qo);
        },
        customize(e) {
            return jo(e ?? t);
        }
    };
}

const Fo = M("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.ui = false;
        this.fi = false;
        this.di = void 0;
        this.next = void 0;
        this.pi = void 0;
        this.mi = void 0;
        if (e.has(Fo, true)) throw v(`AUR0768`);
        G(e, Fo, new t.InstanceProvider("IAurelia", this));
        G(e, ds, this.xi = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ui;
    }
    get isStopping() {
        return this.fi;
    }
    get root() {
        if (null == this.di) {
            if (null == this.next) throw v(`AUR0767`);
            return this.next;
        }
        return this.di;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.gi(t.host), this.container, this.xi);
        return this;
    }
    enhance(e, s) {
        const i = e.container ?? this.container.createChild();
        const n = e.host;
        const r = this.gi(n);
        const o = e.component;
        let l;
        if (C(o)) {
            G(i, r.HTMLElement, G(i, r.Element, G(i, xs, new t.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        G(i, gs, new t.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: Ms(),
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
    gi(t) {
        let e;
        if (!this.container.has(le, false)) {
            if (null === t.ownerDocument.defaultView) throw v(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(H(le, e));
        } else e = this.container.get(le);
        return e;
    }
    start(e = this.next) {
        if (null == e) throw v(`AUR0770`);
        if (k(this.pi)) return this.pi;
        return this.pi = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.xi.prepare(this.di = e);
            this.ui = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.ui = false;
                this.pi = void 0;
                this.vi(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (k(this.mi)) return this.mi;
        if (true === this.ir) {
            const s = this.di;
            this.ir = false;
            this.fi = true;
            return this.mi = t.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (e) s.dispose();
                this.di = void 0;
                this.xi.dispose();
                this.fi = false;
                this.vi(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.fi) throw v(`AUR0771`);
        this.container.dispose();
    }
    vi(t, e, s) {
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

const Mo = M("IDialogService");

const Vo = M("IDialogController");

const No = M("IDialogDomRenderer");

const Ho = M("IDialogDom");

const Wo = M("IDialogGlobalSettings");

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
            this.ie = t;
            this.Yt = e;
        }));
    }
    static get inject() {
        return [ le, t.IContainer ];
    }
    activate(e) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = e;
        const o = s.get(No);
        const l = e.host ?? this.p.document.body;
        const h = this.dom = o.render(l, e);
        const c = s.has(gs, true) ? s.get(gs) : null;
        const a = h.contentHost;
        this.settings = e;
        if (null == c || !c.contains(l)) s.register(H(gs, l));
        s.register(H(xs, a), H(Ho, h));
        return new Promise((t => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, e, a), {
                $dialog: this
            });
            t(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw zo(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return t.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: Qs.generateName(),
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
        if (this.wi) return this.wi;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(e, s);
        const a = new Promise((a => {
            a(t.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.wi = void 0;
                    if (h) throw zo(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return t.onResolve(o.deactivate?.(c), (() => t.onResolve(n.deactivate(n, null, 2), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== e) this.ie(c); else this.Yt(zo(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.wi = void 0;
            throw t;
        }));
        this.wi = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(e) {
        const s = Go(e);
        return new Promise((e => e(t.onResolve(this.cmp.deactivate?.(DialogCloseResult.create("error", s)), (() => t.onResolve(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Yt(s);
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
        e.registerResolver(r.HTMLElement, e.registerResolver(r.Element, e.registerResolver(xs, new t.InstanceProvider("ElementResolver", i))));
        return e.invoke(n);
    }
    getDefinition(t) {
        const e = C(t) ? t : t?.constructor;
        return Qs.isType(e) ? Qs.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function zo(t, e) {
    const s = v(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function Go(t) {
    const e = v("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.$t = t;
        this.p = e;
        this.bi = s;
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
        return [ t.IContainer, le, Wo ];
    }
    static register(e) {
        e.register(V(Mo, this), $t.deactivating(Mo, (e => t.onResolve(e.closeAll(), (t => {
            if (t.length > 0) throw v(`AUR0901:${t.length}`);
        })))));
    }
    open(e) {
        return Ko(new Promise((s => {
            const i = DialogSettings.from(this.bi, e);
            const n = i.container ?? this.$t.createChild();
            s(t.onResolve(i.load(), (e => {
                const s = n.invoke(DialogController);
                n.register(H(Vo, s));
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
        const s = Qo(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).ki().yi();
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
        return k(n) ? n.then((() => e)) : e;
    }
    ki() {
        if (null == this.component && null == this.template) throw v(`AUR0903`);
        return this;
    }
    yi() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Xo(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function Ko(t) {
    t.whenClosed = Xo;
    return t;
}

function Qo(t) {
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
        V(Wo, this).register(t);
    }
}

const Yo = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Yo} display:flex;`;
        this.overlayCss = Yo;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        V(No, this).register(t);
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

DefaultDialogDomRenderer.inject = [ le ];

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

function Zo(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, $t.creating((() => t(s.get(Wo))))),
        customize(t, s) {
            return Zo(t, s ?? e);
        }
    };
}

const Jo = Zo((() => {
    throw v(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(V(Wo, this));
    }
} ]);

const tl = Zo(t.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const el = M((t => t.singleton(WcCustomElementRegistry)));

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
            n = Qs.isType(s) ? Qs.getDefinition(s) : CustomElementDefinition.create(Qs.generateName(), s);
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
                e.registerResolver(c.HTMLElement, e.registerResolver(c.Element, e.registerResolver(xs, new t.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, e, {
                    projections: null
                });
                const i = e.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(e, i, this, null, s);
                ms(this, s.key, r);
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

WcCustomElementRegistry.inject = [ t.IContainer, le, _e ];

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = $t;

exports.AtPrefixedTriggerAttributePatternRegistration = Sr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = ao;

exports.AttrBindingCommandRegistration = Nr;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Do;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = rt;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = po;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = O;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = mt;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingCommand = Ni;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingModeBehavior = BindingModeBehavior;

exports.BindingTargetSubscriber = BindingTargetSubscriber;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CaptureBindingCommandRegistration = Vr;

exports.CheckedObserver = CheckedObserver;

exports.Children = te;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Hr;

exports.ColonPrefixedBindAttributePatternRegistration = Ir;

exports.ComputedWatcher = ComputedWatcher;

exports.ContentBinding = ContentBinding;

exports.Controller = Controller;

exports.CustomAttribute = Qt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = bo;

exports.CustomElement = Qs;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = yo;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = xr;

exports.DefaultBindingCommandRegistration = Or;

exports.DefaultBindingLanguage = Gr;

exports.DefaultBindingSyntax = Pr;

exports.DefaultComponents = Rr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = qo;

exports.DefaultResources = wo;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = Jo;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = tl;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = Dr;

exports.Else = Else;

exports.ElseRegistration = Yr;

exports.ExpressionWatcher = ExpressionWatcher;

exports.FlushQueue = FlushQueue;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = $r;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = wr;

exports.FromViewBindingCommandRegistration = Ur;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = ds;

exports.IAppTask = Ot;

exports.IAttrMapper = Xi;

exports.IAttributeParser = tt;

exports.IAttributePattern = J;

exports.IAuSlotsInfo = si;

exports.IAurelia = Fo;

exports.IController = Ze;

exports.IDialogController = Vo;

exports.IDialogDom = Ho;

exports.IDialogDomRenderer = No;

exports.IDialogGlobalSettings = Wo;

exports.IDialogService = Mo;

exports.IEventTarget = gs;

exports.IFlushQueue = At;

exports.IHistory = Bs;

exports.IHydrationContext = Je;

exports.IInstruction = ii;

exports.ILifecycleHooks = Re;

exports.ILocation = Rs;

exports.INode = xs;

exports.INodeObserverLocatorRegistration = Cr;

exports.IPlatform = le;

exports.IProjections = ei;

exports.IRenderLocation = vs;

exports.IRenderer = oi;

exports.IRendering = _e;

exports.ISVGAnalyzer = zi;

exports.ISanitizer = mr;

exports.IShadowDOMGlobalStyles = we;

exports.IShadowDOMStyles = ve;

exports.ISyntaxInterpreter = Q;

exports.ITemplateCompiler = ri;

exports.ITemplateCompilerHooks = fn;

exports.ITemplateCompilerRegistration = Ar;

exports.ITemplateElementFactory = Yi;

exports.IViewFactory = De;

exports.IViewLocator = qe;

exports.IWcElementRegistry = el;

exports.IWindow = Cs;

exports.If = If;

exports.IfRegistration = Qr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = ko;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = Ao;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = Co;

exports.LifecycleHooks = Ie;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.ListenerBinding = ListenerBinding;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingOptions = ListenerBindingOptions;

exports.ListenerBindingRendererRegistration = To;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = gr;

exports.OneTimeBindingCommandRegistration = qr;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = Ro;

exports.RefAttributePatternRegistration = Tr;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Fr;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = Bo;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = Zr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = Br;

exports.SanitizeValueConverterRegistration = Xr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = uo;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Eo;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Po;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = So;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Lo;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Lr;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = br;

exports.StandardConfiguration = _o;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Wr;

exports.StyleConfiguration = be;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Oo;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = mn;

exports.TemplateControllerRendererRegistration = Io;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = $o;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = yr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = vr;

exports.ToViewBindingCommandRegistration = _r;

exports.TriggerBindingCommandRegistration = Mr;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = kr;

exports.TwoWayBindingCommandRegistration = jr;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = fo;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = wt;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Kr;

exports.Views = $e;

exports.Watch = Ft;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = Jr;

exports.alias = X;

exports.allResources = F;

exports.attributePattern = et;

exports.bindable = E;

exports.bindingBehavior = ft;

exports.bindingCommand = ji;

exports.capture = ti;

exports.children = Yt;

exports.coercer = $;

exports.containerless = Ts;

exports.convertToRenderLocation = ks;

exports.createElement = cr;

exports.cssModules = me;

exports.customAttribute = Mt;

exports.customElement = Ss;

exports.getEffectiveParentNode = bs;

exports.getRef = ps;

exports.isCustomElementController = Xe;

exports.isCustomElementViewModel = Ke;

exports.isInstruction = ni;

exports.isRenderLocation = As;

exports.lifecycleHooks = Te;

exports.mixinAstEvaluator = yt;

exports.mixinBindingUseScope = bt;

exports.mixingBindingLimited = Bt;

exports.processContent = Zs;

exports.registerAliases = K;

exports.renderer = li;

exports.setEffectiveParentNode = ys;

exports.setRef = ms;

exports.shadowCSS = xe;

exports.strict = Es;

exports.templateCompilerHooks = xn;

exports.templateController = Vt;

exports.useShadowDOM = Is;

exports.valueConverter = xt;

exports.view = Ue;

exports.watch = qt;
//# sourceMappingURL=index.cjs.map
