"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/runtime");

var e = require("@aurelia/kernel");

var s = require("@aurelia/metadata");

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

exports.BindingMode = void 0;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(exports.BindingMode || (exports.BindingMode = {}));

const l = s.Metadata.getOwn;

const h = s.Metadata.hasOwn;

const c = s.Metadata.define;

const {annotation: a, resource: u} = e.Protocol;

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
    if (!C(e)) return false;
    const i = e.slice(0, 5);
    return w[e] = "aria-" === i || "data-" === i || s.isStandardSvgAttribute(t, e);
};

const y = t => t instanceof Promise;

const k = t => "function" === typeof t;

const C = t => "string" === typeof t;

const A = Object.defineProperty;

const R = t => {
    throw t;
};

const B = Reflect.defineProperty;

const S = (t, e, s) => {
    B(t, e, {
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
        c(T, BindableDefinition.create(e, t, s), t.constructor, e);
        m(t.constructor, D.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (C(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function I(t) {
    return t.startsWith(T);
}

const T = f("bindable");

const D = Object.freeze({
    name: T,
    keyFrom: t => `${T}:${t}`,
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
                if (C(i)) {
                    n = i;
                    r = {
                        property: n
                    };
                } else {
                    n = i.property;
                    r = i;
                }
                e = BindableDefinition.create(n, t, r);
                if (!h(T, t, n)) m(t, D.keyFrom(n));
                c(T, e, t, n);
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
    getAll(t) {
        const s = T.length + 1;
        const i = [];
        const n = e.getPrototypeChain(t);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        let u;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(I);
            c = h.length;
            for (u = 0; u < c; ++u) i[o++] = l(T, a, h[u].slice(s));
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
    static create(t, s, i = {}) {
        return new BindableDefinition(e.firstDefined(i.attribute, e.kebabCase(t)), e.firstDefined(i.callback, `${t}Changed`), e.firstDefined(i.mode, exports.BindingMode.toView), e.firstDefined(i.primary, false), e.firstDefined(i.property, t), e.firstDefined(i.set, O(t, s, i)));
    }
}

function $(t, e, s) {
    P.define(t, e);
}

const P = {
    key: f("coercer"),
    define(t, e) {
        c(P.key, t[e].bind(t), t);
    },
    for(t) {
        return l(P.key, t);
    }
};

function O(t, s, i = {}) {
    const n = i.type ?? Reflect.getMetadata("design:type", s, t) ?? null;
    if (null == n) return e.noop;
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
            const t = n.coerce;
            r = "function" === typeof t ? t.bind(n) : P.for(n) ?? e.noop;
            break;
        }
    }
    return r === e.noop ? r : L(r, i.nullable);
}

function L(t, e) {
    return function(s, i) {
        if (!i?.enableCoercion) return s;
        return (e ?? (i?.coerceNullish ?? false ? false : true)) && null == s ? s : t(s, i);
    };
}

class BindableObserver {
    constructor(t, s, i, n, r, o) {
        this.set = n;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        const l = t[i];
        const h = t.propertyChanged;
        const c = this.i = k(l);
        const a = this.u = k(h);
        const u = this.hs = n !== e.noop;
        let f;
        this.o = t;
        this.k = s;
        this.cb = c ? l : e.noop;
        this.C = a ? h : e.noop;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
            this.iO = true;
            f = t[s];
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
    setValue(t, e) {
        if (this.hs) t = this.set(t, this.t);
        const s = this.v;
        if (this.iO) {
            if (Object.is(t, s)) return;
            this.v = t;
            this.ov = s;
            this.f = e;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, s, e);
                if (this.u) this.C.call(this.o, this.k, t, s, e);
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
        q = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, q, this.f);
    }
    A() {
        Reflect.defineProperty(this.o, this.k, {
            enumerable: true,
            configurable: true,
            get: () => this.v,
            set: t => {
                this.setValue(t, 0);
            }
        });
    }
}

t.subscriberCollection(BindableObserver);

t.withFlushQueue(BindableObserver);

let q;

const U = function(t) {
    function s(t, i, n) {
        e.DI.inject(s)(t, i, n);
    }
    s.$isResolver = true;
    s.resolve = function(e, s) {
        if (s.root === s) return s.getAll(t, false);
        return s.has(t, false) ? s.getAll(t, false).concat(s.root.getAll(t, false)) : s.root.getAll(t, false);
    };
    return s;
};

const V = e.Registration.singleton;

const _ = e.Registration.aliasTo;

const F = e.Registration.instance;

const j = e.Registration.callback;

const M = e.Registration.transient;

function N(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) c(s, t, e); else i.push(...t);
    };
}

function W(t, s, i, n) {
    for (let r = 0, o = t.length; r < o; ++r) e.Registration.aliasTo(i, s.keyFrom(t[r])).register(n);
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
            this.has = this.$;
            break;

          default:
            this.has = this.P;
        }
    }
    equals(t) {
        return this.chars === t.chars && this.repeat === t.repeat && this.isSymbol === t.isSymbol && this.isInverted === t.isInverted;
    }
    P(t) {
        return this.chars.includes(t);
    }
    $(t) {
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
        this.parts = e.emptyArray;
        this.O = "";
        this.L = {};
        this.q = {};
    }
    get pattern() {
        const t = this.O;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.O = "";
            this.parts = e.emptyArray;
        } else {
            this.O = t;
            this.parts = this.q[t];
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

const H = e.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        i = i.filter(z);
        if (i.length > 0) {
            i.sort(G);
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

function z(t) {
    return t.isEndpoint;
}

function G(t, e) {
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

const X = e.DI.createInterface("IAttributePattern");

const K = e.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, s) {
        this.U = {};
        this.V = t;
        const i = this._ = {};
        const n = s.reduce(((t, e) => {
            const s = Q(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), e.emptyArray);
        t.add(n);
    }
    parse(t, e) {
        let s = this.U[t];
        if (null == s) s = this.U[t] = this.V.interpret(t);
        const i = s.pattern;
        if (null == i) return new AttrSyntax(t, e, t, null); else return this._[i][i](t, e, s.parts);
    }
}

AttributeParser.inject = [ H, e.all(X) ];

function Y(...t) {
    return function e(s) {
        return tt.define(t, s);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        V(X, this.Type).register(t);
    }
}

const Z = d("attribute-pattern");

const J = "attribute-pattern-definitions";

const Q = t => e.Protocol.annotation.get(t, J);

const tt = Object.freeze({
    name: Z,
    definitionAnnotationKey: J,
    define(t, s) {
        const i = new AttributePatternResourceDefinition(s);
        c(Z, i, s);
        p(s, Z);
        e.Protocol.annotation.set(s, J, t);
        m(s, J);
        return s;
    },
    getPatternDefinitions: Q
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

let et = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

et = r([ Y({
    pattern: "...$attrs",
    symbols: ""
}) ], et);

const st = e.IPlatform;

const it = e.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function nt(t) {
    const e = g();
    let s;
    for (s of t) e[s] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.F = Object.assign(g(), {
            a: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: nt([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: g(),
            altGlyphDef: nt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: g(),
            altGlyphItem: nt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: g(),
            animate: nt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: nt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: nt([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: nt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: nt([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: nt([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": nt([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: nt([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: nt([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: nt([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: nt([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: nt([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: nt([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: nt([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: nt([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: nt([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: nt([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: nt([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: nt([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: nt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: nt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: nt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: nt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: nt([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: nt([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: nt([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: nt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: nt([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: nt([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: nt([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: nt([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: nt([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: nt([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: nt([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: nt([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: nt([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": nt([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": nt([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": nt([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": nt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": nt([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: nt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: nt([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: nt([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: g(),
            hkern: nt([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: nt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: nt([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: nt([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: nt([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: nt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": nt([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: nt([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: nt([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: nt([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: nt([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: nt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: nt([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: nt([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: nt([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: nt([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: nt([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: nt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: nt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: nt([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: nt([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: nt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: nt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: nt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: nt([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: nt([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.j = nt([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.M = nt([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.F;
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
        return V(it, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.j[t.nodeName] && true === this.M[e] || true === this.F[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ st ];

const rt = e.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = g();
        this.W = g();
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
        return [ it ];
    }
    useMapping(t) {
        var e;
        let s;
        let i;
        let n;
        let r;
        for (n in t) {
            s = t[n];
            i = (e = this.N)[n] ?? (e[n] = g());
            for (r in s) {
                if (void 0 !== i[r]) throw lt(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const s in t) {
            if (void 0 !== e[s]) throw lt(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return ot(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.N[t.nodeName]?.[e] ?? this.W[e] ?? (b(t, e, this.svg) ? e : null);
    }
}

function ot(t, e) {
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

function lt(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

exports.BindingBehaviorStrategy = void 0;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(exports.BindingBehaviorStrategy || (exports.BindingBehaviorStrategy = {}));

function ht(t) {
    return function(e) {
        return ft.define(t, e);
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
    static create(t, s) {
        let i;
        let n;
        if (C(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        const r = Object.getPrototypeOf(s) === BindingInterceptor;
        return new BindingBehaviorDefinition(s, e.firstDefined(ut(s, "name"), i), e.mergeArrays(ut(s, "aliases"), n.aliases, s.aliases), ft.keyFrom(i), e.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", n, s, (() => r ? 2 : 1)));
    }
    register(t) {
        const {Type: s, key: i, aliases: n, strategy: r} = this;
        switch (r) {
          case 1:
            e.Registration.singleton(i, s).register(t);
            break;

          case 2:
            e.Registration.instance(i, new BindingBehaviorFactory(t, s)).register(t);
            break;
        }
        e.Registration.aliasTo(i, s).register(t);
        W(n, ft, i, t);
    }
}

class BindingBehaviorFactory {
    constructor(t, s) {
        this.ctn = t;
        this.Type = s;
        this.deps = e.DI.getDependencies(s);
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
    updateTarget(t, e) {
        this.binding.updateTarget(t, e);
    }
    updateSource(t, e) {
        this.binding.updateSource(t, e);
    }
    callSource(t) {
        return this.binding.callSource(t);
    }
    handleChange(t, e, s) {
        this.binding.handleChange(t, e, s);
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
    $bind(t, e) {
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.binding.$unbind(t);
    }
}

const ct = [ "isBound", "$scope", "obs", "ast", "locator", "oL" ];

ct.forEach((t => {
    B(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const at = d("binding-behavior");

const ut = (t, e) => l(f(e), t);

const ft = Object.freeze({
    name: at,
    keyFrom(t) {
        return `${at}:${t}`;
    },
    isType(t) {
        return k(t) && h(at, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(at, s, s.Type);
        c(at, s, s);
        p(e, at);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(at, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ut
});

function dt(t) {
    return function(e) {
        return xt.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, s, i) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
    }
    static create(t, s) {
        let i;
        let n;
        if (C(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new ValueConverterDefinition(s, e.firstDefined(mt(s, "name"), i), e.mergeArrays(mt(s, "aliases"), n.aliases, s.aliases), xt.keyFrom(i));
    }
    register(t) {
        const {Type: s, key: i, aliases: n} = this;
        e.Registration.singleton(i, s).register(t);
        e.Registration.aliasTo(i, s).register(t);
        W(n, xt, i, t);
    }
}

const pt = d("value-converter");

const mt = (t, e) => l(f(e), t);

const xt = Object.freeze({
    name: pt,
    keyFrom: t => `${pt}:${t}`,
    isType(t) {
        return k(t) && h(pt, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(pt, s, s.Type);
        c(pt, s, s);
        p(e, pt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(pt, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: mt
});

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, s) {
        const i = this.b;
        if (t !== i.ast.evaluate(i.$scope, i, null)) i.updateSource(t, s);
    }
}

function gt(t, e = true) {
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
        S(i, "get", (function(t) {
            return this.locator.get(t);
        }));
        S(i, "getConverter", (function(t) {
            return this.locator.get(xt.keyFrom(t));
        }));
        S(i, "getBehavior", (function(t) {
            return this.locator.get(ft.keyFrom(t));
        }));
    };
}

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
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.ast.hasBind) this.ast.bind(t, e, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), t, this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.targetObserver.setValue(null, t, this.target, this.targetProperty);
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, s) {
        return;
    }
}

gt(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.H = false;
        this.f = 0;
        this.o = t;
        this.G = e;
        this.X = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        this.v = t;
        this.H = t !== this.ov;
        if (0 === (32 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.ov = this.v;
            switch (this.X) {
              case "class":
                this.o.classList.toggle(this.G, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let e = this.v;
                    if (C(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.G, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.X); else this.o.setAttribute(this.X, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let s = 0, i = t.length; i > s; ++s) {
            const i = t[s];
            if ("attributes" === i.type && i.attributeName === this.G) {
                e = true;
                break;
            }
        }
        if (e) {
            let t;
            switch (this.X) {
              case "class":
                t = this.o.classList.contains(this.G);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.G);
                break;

              default:
                throw new Error(`AUR0651:${this.X}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.H = false;
                this.f = 0;
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            vt(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) wt(this.o, this);
    }
    flush() {
        kt = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, kt, this.f);
    }
}

t.subscriberCollection(AttributeObserver);

t.withFlushQueue(AttributeObserver);

const vt = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(bt)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const wt = (t, e) => {
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

const bt = t => {
    t[0].target.$eMObs.forEach(yt, t);
};

function yt(t) {
    t.handleMutation(this);
}

let kt;

const {oneTime: Ct, toView: At, fromView: Rt} = exports.BindingMode;

const Bt = At | Ct;

const St = {
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
        this.persistentFlags = 0;
        this.value = void 0;
        this.Y = 0;
        this.Z = t;
        this.target = r;
        this.oL = s;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        s |= this.persistentFlags;
        const i = this.mode;
        const n = this.interceptor;
        const r = this.ast;
        const o = this.$scope;
        const l = this.targetObserver;
        const h = 1 !== this.Z.state && (4 & l.type) > 0;
        let c = false;
        let a;
        if (10082 !== r.$kind || this.obs.count > 1) {
            c = 0 === (i & Ct);
            if (c) this.obs.version++;
            t = r.evaluate(o, this, n);
            if (c) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (h) {
                a = this.task;
                this.task = this.taskQueue.queueTask((() => {
                    this.task = null;
                    n.updateTarget(t, s);
                }), St);
                a?.cancel();
            } else n.updateTarget(t, s);
        }
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.persistentFlags = 33 & t;
        this.$scope = e;
        this.Y++;
        let s = this.ast;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        let i = this.targetObserver;
        if (!i) i = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        s = this.ast;
        const n = this.mode;
        const r = this.interceptor;
        let o = false;
        if (n & Bt) {
            o = (n & At) > 0;
            r.updateTarget(this.value = s.evaluate(e, this, o ? r : null), t);
        }
        if (n & Rt) i.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r)));
        this.Y++;
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(AttributeBinding);

gt(true)(AttributeBinding);

const {toView: Et} = exports.BindingMode;

const It = {
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
        this.Z = t;
        this.oL = s;
        this.targetObserver = s.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, s, this);
    }
    updateTarget(t, e) {
        const s = this.partBindings;
        const i = this.ast.parts;
        const n = s.length;
        let r = "";
        let o = 0;
        if (1 === n) r = i[0] + s[0].value + i[1]; else {
            r = i[0];
            for (;n > o; ++o) r += s[o].value + i[o + 1];
        }
        const l = this.targetObserver;
        const h = 1 !== this.Z.state && (4 & l.type) > 0;
        let c;
        if (h) {
            c = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                l.setValue(r, e, this.target, this.targetProperty);
            }), It);
            c?.cancel();
            c = null;
        } else l.setValue(r, e, this.target, this.targetProperty);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        const s = this.partBindings;
        const i = s.length;
        let n = 0;
        for (;i > n; ++n) s[n].$bind(t, e);
        this.updateTarget(void 0, t);
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const e = this.partBindings;
        const s = e.length;
        let i = 0;
        for (;s > i; ++i) e[i].interceptor.$unbind(t);
        this.task?.cancel();
        this.task = null;
    }
}

gt(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, s, i, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = s;
        this.locator = i;
        this.owner = r;
        this.interceptor = this;
        this.mode = exports.BindingMode.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        const i = this.ast;
        const n = this.obs;
        const r = 10082 === i.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & Et) > 0;
            if (o) n.version++;
            t = i.evaluate(this.$scope, this, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t, s);
        }
    }
    handleCollectionChange(t, e) {
        this.owner.updateTarget(void 0, e);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        if (this.ast.hasBind) this.ast.bind(t, e, this.interceptor);
        this.value = this.ast.evaluate(e, this, (this.mode & Et) > 0 ? this.interceptor : null);
        if (this.value instanceof Array) this.observeCollection(this.value);
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

t.connectable(InterpolationPartBinding);

gt(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, s, i, n, r, o, l) {
        this.locator = e;
        this.taskQueue = i;
        this.p = n;
        this.ast = r;
        this.target = o;
        this.strict = l;
        this.interceptor = this;
        this.mode = exports.BindingMode.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.Y = 0;
        this.Z = t;
        this.oL = s;
    }
    updateTarget(t, e) {
        const s = this.target;
        const i = this.p.Node;
        const n = this.value;
        this.value = t;
        if (n instanceof i) n.parentNode?.removeChild(n);
        if (t instanceof i) {
            s.textContent = "";
            s.parentNode?.insertBefore(t, s);
        } else s.textContent = String(t);
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        const i = this.ast;
        const n = this.obs;
        const r = 10082 === i.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & Et) > 0;
            if (o) n.version++;
            s |= this.strict ? 1 : 0;
            t = i.evaluate(this.$scope, this, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t === this.value) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const l = 1 !== this.Z.state;
        if (l) this.queueUpdate(t, s); else this.updateTarget(t, s);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.value = this.ast.evaluate(this.$scope, this, (this.mode & Et) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (t instanceof Array) this.observeCollection(t);
        const e = 0 === this.Y;
        if (e) this.queueUpdate(t, 0); else this.updateTarget(t, 0);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        this.Y++;
        if (this.ast.hasBind) this.ast.bind(t, e, this.interceptor);
        t |= this.strict ? 1 : 0;
        const s = this.value = this.ast.evaluate(e, this, (this.mode & Et) > 0 ? this.interceptor : null);
        if (s instanceof Array) this.observeCollection(s);
        this.updateTarget(s, t);
        this.Y--;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.task?.cancel();
        this.task = null;
    }
    queueUpdate(t, e) {
        const s = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t, e);
        }), It);
        s?.cancel();
    }
}

t.connectable()(ContentBinding);

gt(void 0, false)(ContentBinding);

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
        this.J = n;
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        const i = this.target;
        const n = this.targetProperty;
        const r = i[n];
        this.obs.version++;
        t = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (t !== r) i[n] = t;
    }
    handleCollectionChange(t, e) {
        if (!this.isBound) return;
        const s = this.target;
        const i = this.targetProperty;
        const n = s[i];
        this.obs.version++;
        const r = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (r !== n) s[i] = r;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        this.target = this.J ? e.bindingContext : e.overrideContext;
        const s = this.ast;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        this.target[this.targetProperty] = this.ast.evaluate(e, this, this.interceptor);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.ast;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(LetBinding);

gt(true)(LetBinding);

const {oneTime: Tt, toView: Dt, fromView: $t} = exports.BindingMode;

const Pt = Dt | Tt;

const Ot = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
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
        this.targetObserver = void 0;
        this.persistentFlags = 0;
        this.task = null;
        this.targetSubscriber = null;
        this.Z = t;
        this.oL = s;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        this.ast.assign(this.$scope, this, t);
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        s |= this.persistentFlags;
        const i = 1 !== this.Z.state && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        let r = false;
        if (10082 !== this.ast.$kind || n.count > 1) {
            r = this.mode > Tt;
            if (r) n.version++;
            t = this.ast.evaluate(this.$scope, this, this.interceptor);
            if (r) n.clear();
        }
        if (i) {
            Lt = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, s);
                this.task = null;
            }), Ot);
            Lt?.cancel();
            Lt = null;
        } else this.interceptor.updateTarget(t, s);
    }
    handleCollectionChange(t, e) {
        if (!this.isBound) return;
        const s = 1 !== this.Z.state && (4 & this.targetObserver.type) > 0;
        this.obs.version++;
        const i = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (s) {
            Lt = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(i, e);
                this.task = null;
            }), Ot);
            Lt?.cancel();
            Lt = null;
        } else this.interceptor.updateTarget(i, e);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 33 & t;
        this.$scope = e;
        let s = this.ast;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        const i = this.oL;
        const n = this.mode;
        let r = this.targetObserver;
        if (!r) {
            if (n & $t) r = i.getObserver(this.target, this.targetProperty); else r = i.getAccessor(this.target, this.targetProperty);
            this.targetObserver = r;
        }
        s = this.ast;
        const o = this.interceptor;
        const l = (n & Dt) > 0;
        if (n & Pt) o.updateTarget(s.evaluate(e, this, l ? o : null), t);
        if (n & $t) {
            r.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(o)));
            if (!l) o.updateSource(r.getValue(this.target, this.targetProperty), t);
        }
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.ast.hasUnbind) this.ast.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        Lt = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != Lt) {
            Lt.cancel();
            Lt = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(PropertyBinding);

gt(true, false)(PropertyBinding);

let Lt = null;

class RefBinding {
    constructor(t, e, s) {
        this.locator = t;
        this.ast = e;
        this.target = s;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.ast.hasBind) this.ast.bind(t, e, this);
        this.ast.assign(this.$scope, this, this.target);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        let e = this.ast;
        if (e.evaluate(this.$scope, this, null) === this.target) e.assign(this.$scope, this, null);
        e = this.ast;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, s) {
        return;
    }
}

const qt = e.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(F(qt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Ut = Object.freeze({
    creating: Vt("creating"),
    hydrating: Vt("hydrating"),
    hydrated: Vt("hydrated"),
    activating: Vt("activating"),
    activated: Vt("activated"),
    deactivating: Vt("deactivating"),
    deactivated: Vt("deactivated")
});

function Vt(t) {
    function e(e, s) {
        if (k(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function _t(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(jt, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, Mt.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (C(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function Ft(t) {
    return t.startsWith(jt);
}

const jt = f("children-observer");

const Mt = Object.freeze({
    name: jt,
    keyFrom: t => `${jt}:${t}`,
    from(...t) {
        const e = {};
        const s = Array.isArray;
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function n(t, s) {
            e[t] = ChildrenDefinition.create(t, s);
        }
        function r(t) {
            if (s(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => n(e, t)));
        }
        t.forEach(r);
        return e;
    },
    getAll(t) {
        const s = jt.length + 1;
        const i = [];
        const n = e.getPrototypeChain(t);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(Ft);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l(jt, a, h[t].slice(s));
        }
        return i;
    }
});

const Nt = {
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
    static create(t, s = {}) {
        return new ChildrenDefinition(e.firstDefined(s.callback, `${t}Changed`), e.firstDefined(s.property, t), s.options ?? Nt, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = Wt, r = Ht, o = zt, l) {
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
            this.children = e.emptyArray;
        }
    }
    tt() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0, 0);
    }
    get() {
        return Xt(this.controller, this.query, this.filter, this.map);
    }
}

t.subscriberCollection()(ChildrenObserver);

function Wt(t) {
    return t.host.childNodes;
}

function Ht(t, e, s) {
    return !!s;
}

function zt(t, e, s) {
    return s;
}

const Gt = {
    optional: true
};

function Xt(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Se(l, Gt);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

function Kt(t) {
    return function(e) {
        return se(t, e);
    };
}

function Yt(t) {
    return function(e) {
        return se(C(t) ? {
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
    static create(t, s) {
        let i;
        let n;
        if (C(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(s, e.firstDefined(Qt(s, "name"), i), e.mergeArrays(Qt(s, "aliases"), n.aliases, s.aliases), Jt(i), e.firstDefined(Qt(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, exports.BindingMode.toView), e.firstDefined(Qt(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), D.from(s, ...D.getAll(s), Qt(s, "bindables"), s.bindables, n.bindables), e.firstDefined(Qt(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), e.mergeArrays(he.getAnnotation(s), s.watches), e.mergeArrays(Qt(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        M(s, e).register(t);
        _(s, e).register(t);
        W(i, ne, s, t);
    }
}

const Zt = d("custom-attribute");

const Jt = t => `${Zt}:${t}`;

const Qt = (t, e) => l(f(e), t);

const te = t => k(t) && h(Zt, t);

const ee = (t, e) => _s(t, Jt(e)) ?? void 0;

const se = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    c(Zt, s, s.Type);
    c(Zt, s, s);
    p(e, Zt);
    return s.Type;
};

const ie = t => {
    const e = l(Zt, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
    return e;
};

const ne = Object.freeze({
    name: Zt,
    keyFrom: Jt,
    isType: te,
    for: ee,
    define: se,
    getDefinition: ie,
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: Qt
});

function re(t, e) {
    if (null == t) throw new Error(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!k(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!k(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        he.add(l, h);
        if (te(l)) ie(l).watches.push(h);
        if (Be(l)) Ie(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const oe = e.emptyArray;

const le = f("watch");

const he = Object.freeze({
    name: le,
    add(t, e) {
        let s = l(le, t);
        if (null == s) c(le, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(le, t) ?? oe;
    }
});

function ce(t) {
    return function(e) {
        return Re(t, e);
    };
}

function ae(t) {
    if (void 0 === t) return function(t) {
        Ae(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!k(t)) return function(e) {
        Ae(e, "shadowOptions", t);
    };
    Ae(t, "shadowOptions", {
        mode: "open"
    });
}

function ue(t) {
    if (void 0 === t) return function(t) {
        fe(t);
    };
    fe(t);
}

function fe(t) {
    const e = l(ye, t);
    if (void 0 === e) {
        Ae(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function de(t) {
    if (void 0 === t) return function(t) {
        Ae(t, "isStrictBinding", true);
    };
    Ae(t, "isStrictBinding", true);
}

const pe = new WeakMap;

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
    static create(t, s = null) {
        if (null === s) {
            const i = t;
            if (C(i)) throw new Error(`AUR0761:${t}`);
            const n = e.fromDefinitionOrDefault("name", i, Ce);
            if (k(i.Type)) s = i.Type; else s = De(e.pascalCase(n));
            return new CustomElementDefinition(s, n, e.mergeArrays(i.aliases), e.fromDefinitionOrDefault("key", i, (() => ke(n))), e.fromDefinitionOrDefault("cache", i, xe), e.fromDefinitionOrDefault("capture", i, ve), e.fromDefinitionOrDefault("template", i, ge), e.mergeArrays(i.instructions), e.mergeArrays(i.dependencies), e.fromDefinitionOrDefault("injectable", i, ge), e.fromDefinitionOrDefault("needsCompile", i, we), e.mergeArrays(i.surrogates), D.from(s, i.bindables), Mt.from(i.childrenObservers), e.fromDefinitionOrDefault("containerless", i, ve), e.fromDefinitionOrDefault("isStrictBinding", i, ve), e.fromDefinitionOrDefault("shadowOptions", i, ge), e.fromDefinitionOrDefault("hasSlots", i, ve), e.fromDefinitionOrDefault("enhance", i, ve), e.fromDefinitionOrDefault("watches", i, be), e.fromAnnotationOrTypeOrDefault("processContent", s, ge));
        }
        if (C(t)) return new CustomElementDefinition(s, t, e.mergeArrays(Ee(s, "aliases"), s.aliases), ke(t), e.fromAnnotationOrTypeOrDefault("cache", s, xe), e.fromAnnotationOrTypeOrDefault("capture", s, ve), e.fromAnnotationOrTypeOrDefault("template", s, ge), e.mergeArrays(Ee(s, "instructions"), s.instructions), e.mergeArrays(Ee(s, "dependencies"), s.dependencies), e.fromAnnotationOrTypeOrDefault("injectable", s, ge), e.fromAnnotationOrTypeOrDefault("needsCompile", s, we), e.mergeArrays(Ee(s, "surrogates"), s.surrogates), D.from(s, ...D.getAll(s), Ee(s, "bindables"), s.bindables), Mt.from(...Mt.getAll(s), Ee(s, "childrenObservers"), s.childrenObservers), e.fromAnnotationOrTypeOrDefault("containerless", s, ve), e.fromAnnotationOrTypeOrDefault("isStrictBinding", s, ve), e.fromAnnotationOrTypeOrDefault("shadowOptions", s, ge), e.fromAnnotationOrTypeOrDefault("hasSlots", s, ve), e.fromAnnotationOrTypeOrDefault("enhance", s, ve), e.mergeArrays(he.getAnnotation(s), s.watches), e.fromAnnotationOrTypeOrDefault("processContent", s, ge));
        const i = e.fromDefinitionOrDefault("name", t, Ce);
        return new CustomElementDefinition(s, i, e.mergeArrays(Ee(s, "aliases"), t.aliases, s.aliases), ke(i), e.fromAnnotationOrDefinitionOrTypeOrDefault("cache", t, s, xe), e.fromAnnotationOrDefinitionOrTypeOrDefault("capture", t, s, ve), e.fromAnnotationOrDefinitionOrTypeOrDefault("template", t, s, ge), e.mergeArrays(Ee(s, "instructions"), t.instructions, s.instructions), e.mergeArrays(Ee(s, "dependencies"), t.dependencies, s.dependencies), e.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", t, s, ge), e.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", t, s, we), e.mergeArrays(Ee(s, "surrogates"), t.surrogates, s.surrogates), D.from(s, ...D.getAll(s), Ee(s, "bindables"), s.bindables, t.bindables), Mt.from(...Mt.getAll(s), Ee(s, "childrenObservers"), s.childrenObservers, t.childrenObservers), e.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", t, s, ve), e.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", t, s, ve), e.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", t, s, ge), e.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", t, s, ve), e.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", t, s, ve), e.mergeArrays(t.watches, he.getAnnotation(s), s.watches), e.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", t, s, ge));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (pe.has(t)) return pe.get(t);
        const e = CustomElementDefinition.create(t);
        pe.set(t, e);
        c(ye, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            M(s, e).register(t);
            _(s, e).register(t);
            W(i, $e, s, t);
        }
    }
}

const me = {
    name: void 0,
    searchParents: false,
    optional: false
};

const xe = () => 0;

const ge = () => null;

const ve = () => false;

const we = () => true;

const be = () => e.emptyArray;

const ye = d("custom-element");

const ke = t => `${ye}:${t}`;

const Ce = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Ae = (t, e, s) => {
    c(f(e), s, t);
};

const Re = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(ye, s, s.Type);
    c(ye, s, s);
    p(s.Type, ye);
    return s.Type;
};

const Be = t => k(t) && h(ye, t);

const Se = (t, e = me) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = _s(t, ye);
        if (null === s) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = _s(t, ye);
            if (null === s) throw new Error(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = _s(s, ye);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = Hs(s);
        }
        if (i) return;
        throw new Error(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = _s(s, ye);
        if (null !== t) return t;
        s = Hs(s);
    }
    throw new Error(`AUR0765`);
};

const Ee = (t, e) => l(f(e), t);

const Ie = t => {
    const e = l(ye, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const Te = () => {
    const t = function(s, i, n) {
        const r = e.DI.getOrCreateAnnotationParamTypes(s);
        r[n] = t;
        return s;
    };
    t.register = function(e) {
        return {
            resolve(e, s) {
                if (s.has(t, true)) return s.get(t); else return null;
            }
        };
    };
    return t;
};

const De = function() {
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

const $e = Object.freeze({
    name: ye,
    keyFrom: ke,
    isType: Be,
    for: Se,
    define: Re,
    getDefinition: Ie,
    annotate: Ae,
    getAnnotation: Ee,
    generateName: Ce,
    createInjectable: Te,
    generateType: De
});

const Pe = f("processContent");

function Oe(t) {
    return void 0 === t ? function(t, e, s) {
        c(Pe, Le(t, e), t);
    } : function(e) {
        t = Le(e, t);
        const s = l(ye, e);
        if (void 0 !== s) s.processContent = t; else c(Pe, t, e);
        return e;
    };
}

function Le(t, e) {
    if (C(e)) e = t[e];
    if (!k(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function qe(t) {
    return function(e) {
        const s = k(t) ? t : true;
        Ae(e, "capture", s);
        if (Be(e)) Ie(e).capture = s;
    };
}

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.et = {};
        this.st = 0;
        this.H = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (32 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.et;
            const s = Ue(t);
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

function Ue(t) {
    if (C(t)) return Ve(t);
    if ("object" !== typeof t) return e.emptyArray;
    if (t instanceof Array) {
        const s = t.length;
        if (s > 0) {
            const e = [];
            let i = 0;
            for (;s > i; ++i) e.push(...Ue(t[i]));
            return e;
        } else return e.emptyArray;
    }
    const s = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) s.push(...Ve(i)); else s.push(i);
    return s;
}

function Ve(t) {
    const s = t.match(/\S+/g);
    if (null === s) return e.emptyArray;
    return s;
}

function _e(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = se({
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
                this.element.className = Ue(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ js ], e));
        t.register(i);
    }
}

function Fe(...t) {
    return new ShadowDOMRegistry(t);
}

const je = e.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(st))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(Ne);
        const s = t.get(je);
        t.register(F(Me, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ st ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ st ];

const Me = e.DI.createInterface("IShadowDOMStyles");

const Ne = e.DI.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: e.noop
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

const We = {
    shadowDOM(t) {
        return Ut.creating(e.IContainer, (e => {
            if (null != t.sharedStyles) {
                const s = e.get(je);
                e.register(F(Ne, s.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: He, exit: ze} = t.ConnectableSwitcher;

const {wrap: Ge, unwrap: Xe} = t.ProxyObservable;

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
            He(this);
            return this.value = Xe(this.$get.call(void 0, this.useProxy ? Ge(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ze(this);
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
        const n = 10082 === e.$kind && 1 === this.obs.count;
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

t.connectable(ComputedWatcher);

gt(true)(ComputedWatcher);

t.connectable(ExpressionWatcher);

gt(true)(ExpressionWatcher);

const Ke = e.DI.createInterface("ILifecycleHooks");

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
        V(Ke, this.Type).register(t);
    }
}

const Ye = new WeakMap;

const Ze = f("lifecycle-hooks");

const Je = Object.freeze({
    name: Ze,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(Ze, s, e);
        p(e, Ze);
        return s.Type;
    },
    resolve(t) {
        let e = Ye.get(t);
        if (void 0 === e) {
            Ye.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(Ke) : t.has(Ke, false) ? s.getAll(Ke).concat(t.getAll(Ke)) : s.getAll(Ke);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(Ze, n.constructor);
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

function Qe() {
    return function t(e) {
        return Je.define({}, e);
    };
}

const ts = e.DI.createInterface("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (C(t)) t = parseInt(t, 10);
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

const es = new WeakSet;

function ss(t) {
    return !es.has(t);
}

function is(t) {
    es.add(t);
    return CustomElementDefinition.create(t);
}

const ns = d("views");

const rs = Object.freeze({
    name: ns,
    has(t) {
        return k(t) && (h(ns, t) || "$views" in t);
    },
    get(t) {
        if (k(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(ss).map(is);
            for (const e of s) rs.add(t, e);
        }
        let e = l(ns, t);
        if (void 0 === e) c(ns, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(ns, t);
        if (void 0 === i) c(ns, i = [ s ], t); else i.push(s);
        return i;
    }
});

function os(t) {
    return function(e) {
        rs.add(e, t);
    };
}

const ls = e.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = rs.has(t.constructor) ? rs.get(t.constructor) : [];
            const i = k(e) ? e(t, s) : this.ot(s, e);
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
            n = Re(Ie(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            i[s] = n;
        }
        return n;
    }
    ht(e, s, i) {
        let n = this.rt.get(e.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.rt.set(e.constructor, n);
        } else r = n[i];
        if (void 0 === r) {
            r = Re(this.ct(s, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(e, s, i) {
                    const n = this.viewModel;
                    e.scope = t.Scope.fromParent(e.scope, n);
                    if (void 0 !== n.define) return n.define(e, s, i);
                }
            });
            const o = r.prototype;
            if ("hydrating" in e) o.hydrating = function t(e) {
                this.viewModel.hydrating(e);
            };
            if ("hydrated" in e) o.hydrated = function t(e) {
                this.viewModel.hydrated(e);
            };
            if ("created" in e) o.created = function t(e) {
                this.viewModel.created(e);
            };
            if ("binding" in e) o.binding = function t(e, s, i) {
                return this.viewModel.binding(e, s, i);
            };
            if ("bound" in e) o.bound = function t(e, s, i) {
                return this.viewModel.bound(e, s, i);
            };
            if ("attaching" in e) o.attaching = function t(e, s, i) {
                return this.viewModel.attaching(e, s, i);
            };
            if ("attached" in e) o.attached = function t(e, s) {
                return this.viewModel.attached(e, s);
            };
            if ("detaching" in e) o.detaching = function t(e, s, i) {
                return this.viewModel.detaching(e, s, i);
            };
            if ("unbinding" in e) o.unbinding = function t(e, s, i) {
                return this.viewModel.unbinding(e, s, i);
            };
            if ("dispose" in e) o.dispose = function t() {
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

const hs = e.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.dt = (this.xt = t.root).get(st);
        this.gt = new FragmentNodeSequence(this.dt, this.dt.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.xt.getAll(oi, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.rs;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.ut;
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
        if (true === t.enhance) return new FragmentNodeSequence(this.dt, t.template);
        let e;
        const s = this.ft;
        if (s.has(t)) e = s.get(t); else {
            const i = this.dt;
            const n = i.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof i.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (C(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            s.set(t, e);
        }
        return null == e ? this.gt : new FragmentNodeSequence(this.dt, e.cloneNode(true));
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
        if (void 0 !== i && null !== i) {
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

Rendering.inject = [ e.IContainer ];

var cs;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(cs || (cs = {}));

const as = {
    optional: true
};

const us = new WeakMap;

class Controller {
    constructor(t, s, i, n, r, o, l) {
        this.container = t;
        this.vmKind = s;
        this.definition = i;
        this.viewFactory = n;
        this.viewModel = r;
        this.host = o;
        this.id = e.nextId("au$component");
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
        this.wt = e.emptyArray;
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
        this.r = t.root.get(hs);
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
        return us.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, s, i, n, r = void 0, o = null) {
        if (us.has(s)) return us.get(s);
        r = r ?? Ie(s.constructor);
        const l = new Controller(t, 0, r, null, s, i, o);
        const h = t.get(e.optional(Cs));
        if (r.dependencies.length > 0) t.register(...r.dependencies);
        t.registerResolver(Cs, new e.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        us.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (us.has(e)) return us.get(e);
        i = i ?? ie(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        us.set(e, n);
        n.Ct();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null, null);
        s.parent = e ?? null;
        s.At();
        return s;
    }
    hE(s, i) {
        const n = this.container;
        const r = this.flags;
        const o = this.viewModel;
        let l = this.definition;
        this.scope = t.Scope.create(o, null, true);
        if (l.watches.length > 0) gs(this, n, l, o);
        ds(this, l, r, o);
        this.wt = ps(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Je.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new e.InstanceProvider("definition.injectable", o));
        if (null == s || false !== s.hydrate) {
            this.hS(s);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(Bs, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = Se(this.host, as))) {
            this.host = this.container.root.get(st).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Gs(this.host);
        }
        Fs(this.host, ye, this);
        Fs(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw new Error(`AUR0501`);
            Fs(this.shadowRoot = this.host.attachShadow(s ?? bs), ye, this);
            Fs(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            Fs(o, ye, this);
            Fs(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(Ss, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Rt, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Rs, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    Ct() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) gs(this, this.container, t, e);
        ds(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Je.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Rs, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    At() {
        this.Rt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Rt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Rt)).findTargets(), this.Rt, void 0);
    }
    activate(t, s, i, n) {
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
            throw new Error(`AUR0503:${this.name} ${ys(this.state)}`);
        }
        this.parent = s;
        i |= 2;
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
        if (this.isStrictBinding) i |= 1;
        this.$initiator = t;
        this.$flags = i;
        this.Bt();
        let r;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) r = e.resolveAll(...this.lifecycleHooks.binding.map(Es, this));
        if (this.hooks.hasBinding) r = e.resolveAll(r, this.viewModel.binding(this.$initiator, this.parent, this.$flags));
        if (y(r)) {
            this.St();
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
        let t = 0;
        let s = this.wt.length;
        let i;
        if (s > 0) while (s > t) {
            this.wt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            s = this.bindings.length;
            while (s > t) {
                this.bindings[t].$bind(this.$flags, this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = e.resolveAll(...this.lifecycleHooks.bound.map(Is, this));
        if (this.hooks.hasBound) i = e.resolveAll(i, this.viewModel.bound(this.$initiator, this.parent, this.$flags));
        if (y(i)) {
            this.St();
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
                const e = t.has(Me, false) ? t.get(Me) : t.get(Ne);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        let t = 0;
        let s;
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) s = e.resolveAll(...this.lifecycleHooks.attaching.map(Ts, this));
        if (this.hooks.hasAttaching) s = e.resolveAll(s, this.viewModel.attaching(this.$initiator, this.parent, this.$flags));
        if (y(s)) {
            this.St();
            this.Bt();
            s.then((() => {
                this.Dt();
            })).catch((t => {
                this.Et(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.Dt();
    }
    deactivate(t, s, i) {
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
            throw new Error(`AUR0505:${this.name} ${ys(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.$t();
        let n = 0;
        let r;
        if (this.wt.length) for (;n < this.wt.length; ++n) this.wt[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) r = e.resolveAll(...this.lifecycleHooks.detaching.map($s, this));
        if (this.hooks.hasDetaching) r = e.resolveAll(r, this.viewModel.detaching(this.$initiator, this.parent, this.$flags));
        if (y(r)) {
            this.St();
            t.$t();
            r.then((() => {
                t.Pt();
            })).catch((e => {
                t.Et(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.Pt();
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
        const t = 4 | this.$flags;
        let e = 0;
        if (null !== this.bindings) for (;e < this.bindings.length; ++e) this.bindings[e].$unbind(t);
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
        if (16 === (16 & t) && this.$initiator === this) this.dispose();
        this.state = 32 & this.state | 8;
        this.$initiator = null;
        this.Ot();
    }
    St() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.St();
        }
    }
    Ot() {
        if (void 0 !== this.$promise) {
            Os = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Os();
            Os = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            Ls = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ls(t);
            Ls = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    Bt() {
        ++this.bt;
        if (this.$initiator !== this) this.parent.Bt();
    }
    Dt() {
        if (0 === --this.bt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) qs = e.resolveAll(...this.lifecycleHooks.attached.map(Ds, this));
            if (this.hooks.hasAttached) qs = e.resolveAll(qs, this.viewModel.attached(this.$initiator, this.$flags));
            if (y(qs)) {
                this.St();
                qs.then((() => {
                    this.state = 2;
                    this.Ot();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                qs = void 0;
                return;
            }
            qs = void 0;
            this.state = 2;
            this.Ot();
        }
        if (this.$initiator !== this) this.parent.Dt();
    }
    $t() {
        ++this.yt;
    }
    Pt() {
        if (0 === --this.yt) {
            this.Lt();
            this.removeNodes();
            let t = this.$initiator.head;
            let s;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) s = e.resolveAll(...t.lifecycleHooks.unbinding.map(Ps, this));
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    s = e.resolveAll(s, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (y(s)) {
                    this.St();
                    this.Lt();
                    s.then((() => {
                        this.qt();
                    })).catch((t => {
                        this.Et(t);
                    }));
                }
                s = void 0;
                t = t.next;
            }
            this.qt();
        }
    }
    Lt() {
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
            return ie(this.viewModel.constructor).name === t;

          case 0:
            return Ie(this.viewModel.constructor).name === t;

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
            Fs(t, ye, this);
            Fs(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Fs(t, ye, this);
            Fs(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Fs(t, ye, this);
            Fs(t, this.definition.key, this);
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
            this.children.forEach(As);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            us.delete(this.viewModel);
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

function fs(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function ds(e, s, i, n) {
    const r = s.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let s;
        let i;
        let h = 0;
        const c = fs(n);
        const a = e.container;
        const u = a.has(t.ICoercionConfiguration, true) ? a.get(t.ICoercionConfiguration) : null;
        for (;h < l; ++h) {
            s = o[h];
            if (void 0 === c[s]) {
                i = r[s];
                c[s] = new BindableObserver(n, s, i.callback, i.set, e, u);
            }
        }
    }
}

function ps(t, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const e = fs(i);
        const s = [];
        let l;
        let h = 0;
        let c;
        for (;h < o; ++h) {
            l = r[h];
            if (null == e[l]) {
                c = n[l];
                s[s.length] = e[l] = new ChildrenObserver(t, i, l, c.callback, c.query, c.filter, c.map, c.options);
            }
        }
        return s;
    }
    return e.emptyArray;
}

const ms = new Map;

const xs = e => {
    let s = ms.get(e);
    if (null == s) {
        s = new t.AccessScopeExpression(e, 0);
        ms.set(e, s);
    }
    return s;
};

function gs(e, s, i, n) {
    const r = s.get(t.IObserverLocator);
    const o = s.get(t.IExpressionParser);
    const l = i.watches;
    const h = 0 === e.vmKind ? e.scope : t.Scope.create(n, null, true);
    const c = l.length;
    let a;
    let u;
    let f;
    let d = 0;
    for (;c > d; ++d) {
        ({expression: a, callback: u} = l[d]);
        u = k(u) ? u : Reflect.get(n, u);
        if (!k(u)) throw new Error(`AUR0506:${String(u)}`);
        if (k(a)) e.addBinding(new ComputedWatcher(n, r, a, u, true)); else {
            f = C(a) ? o.parse(a, 8) : xs(a);
            e.addBinding(new ExpressionWatcher(h, s, r, f, u));
        }
    }
}

function vs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function ws(t) {
    return s.isObject(t) && Be(t.constructor);
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

const bs = {
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

function ys(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const ks = e.DI.createInterface("IController");

const Cs = e.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function As(t) {
    t.dispose();
}

function Rs(t) {
    t.instance.created(this.viewModel, this);
}

function Bs(t) {
    t.instance.hydrating(this.viewModel, this);
}

function Ss(t) {
    t.instance.hydrated(this.viewModel, this);
}

function Es(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Is(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ts(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ds(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function $s(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ps(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let Os;

let Ls;

let qs;

const Us = e.DI.createInterface("IAppRoot");

const Vs = e.DI.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.Ut = 0;
        this.Vt = null;
        this.Ot = null;
        this._t = t.scopeTo("WorkTracker");
    }
    start() {
        this._t.trace(`start(stack:${this.Ut})`);
        ++this.Ut;
    }
    finish() {
        this._t.trace(`finish(stack:${this.Ut})`);
        if (0 === --this.Ut) {
            const t = this.Ot;
            if (null !== t) {
                this.Ot = this.Vt = null;
                t();
            }
        }
    }
    wait() {
        this._t.trace(`wait(stack:${this.Ut})`);
        if (null === this.Vt) {
            if (0 === this.Ut) return Promise.resolve();
            this.Vt = new Promise((t => {
                this.Ot = t;
            }));
        }
        return this.Vt;
    }
}

WorkTracker.inject = [ e.ILogger ];

class AppRoot {
    constructor(t, s, i, n) {
        this.config = t;
        this.platform = s;
        this.container = i;
        this.controller = void 0;
        this.Ft = void 0;
        this.host = t.host;
        this.work = i.get(Vs);
        n.prepare(this);
        i.registerResolver(s.HTMLElement, i.registerResolver(s.Element, i.registerResolver(js, new e.InstanceProvider("ElementResolver", t.host))));
        this.Ft = e.onResolve(this.jt("creating"), (() => {
            const s = t.component;
            const n = i.createChild();
            let r;
            if (Be(s)) r = this.container.get(s); else r = t.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return e.onResolve(this.jt("hydrating"), (() => {
                l.hS(null);
                return e.onResolve(this.jt("hydrated"), (() => {
                    l.hC();
                    this.Ft = void 0;
                }));
            }));
        }));
    }
    activate() {
        return e.onResolve(this.Ft, (() => e.onResolve(this.jt("activating"), (() => e.onResolve(this.controller.activate(this.controller, null, 2, void 0), (() => this.jt("activated")))))));
    }
    deactivate() {
        return e.onResolve(this.jt("deactivating"), (() => e.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.jt("deactivated")))));
    }
    jt(t) {
        return e.resolveAll(...this.container.getAll(qt).reduce(((e, s) => {
            if (s.slot === t) e.push(s.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function _s(t, e) {
    return t.$au?.[e] ?? null;
}

function Fs(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const js = e.DI.createInterface("INode");

const Ms = e.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Us, true)) return t.get(Us).host;
    return t.get(st).document;
}))));

const Ns = e.DI.createInterface("IRenderLocation");

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

const Ws = new WeakMap;

function Hs(t) {
    if (Ws.has(t)) return Ws.get(t);
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
        const e = Se(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Hs(e.host);
    }
    return t.parentNode;
}

function zs(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) Ws.set(s[t], e);
    } else Ws.set(t, e);
}

function Gs(t) {
    if (Xs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function Xs(t) {
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
            if ("AU-M" === r.nodeName) o[i] = Gs(r); else o[i] = r;
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
        if (Xs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Ks = e.DI.createInterface("IWindow", (t => t.callback((t => t.get(st).window))));

const Ys = e.DI.createInterface("ILocation", (t => t.callback((t => t.get(Ks).location))));

const Zs = e.DI.createInterface("IHistory", (t => t.callback((t => t.get(Ks).history))));

const Js = {
    [t.DelegationStrategy.capturing]: {
        capture: true
    },
    [t.DelegationStrategy.bubbling]: {
        capture: false
    }
};

class ListenerOptions {
    constructor(t, e, s) {
        this.prevent = t;
        this.strategy = e;
        this.expAsHandler = s;
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
        this.Mt = r;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let s = this.ast.evaluate(this.$scope, this, null);
        delete e.$event;
        if (this.Mt.expAsHandler) {
            if (!k(s)) throw new Error(`Handler of "${this.targetEvent}" event is not a function.`);
            s = s(t);
        }
        if (true !== s && this.Mt.prevent) t.preventDefault();
        return s;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(e, s) {
        if (this.isBound) {
            if (this.$scope === s) return;
            this.interceptor.$unbind(2 | e);
        }
        this.$scope = s;
        const i = this.ast;
        if (i.hasBind) i.bind(e, s, this.interceptor);
        if (this.Mt.strategy === t.DelegationStrategy.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Ms), this.target, this.targetEvent, this, Js[this.Mt.strategy]);
        this.isBound = true;
    }
    $unbind(e) {
        if (!this.isBound) return;
        const s = this.ast;
        if (s.hasUnbind) s.unbind(e, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.Mt.strategy === t.DelegationStrategy.none) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, s) {
        return;
    }
}

gt(true, true)(Listener);

const Qs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = Qs) {
        this.Nt = t;
        this.Wt = e;
        this.Mt = s;
        this.Ht = 0;
        this.zt = new Map;
        this.Gt = new Map;
    }
    Xt() {
        if (1 === ++this.Ht) this.Nt.addEventListener(this.Wt, this, this.Mt);
    }
    Kt() {
        if (0 === --this.Ht) this.Nt.removeEventListener(this.Wt, this, this.Mt);
    }
    dispose() {
        if (this.Ht > 0) {
            this.Ht = 0;
            this.Nt.removeEventListener(this.Wt, this, this.Mt);
        }
        this.zt.clear();
        this.Gt.clear();
    }
    Yt(t) {
        const e = true === this.Mt.capture ? this.zt : this.Gt;
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = g());
        return s;
    }
    handleEvent(t) {
        const e = true === this.Mt.capture ? this.zt : this.Gt;
        const s = t.composedPath();
        if (true === this.Mt.capture) s.reverse();
        for (const i of s) {
            const s = e.get(i);
            if (void 0 === s) continue;
            const n = s[this.Wt];
            if (void 0 === n) continue;
            if (k(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, s, i) {
        this.Zt = t;
        this.Jt = e;
        this.Wt = s;
        t.Xt();
        e[s] = i;
    }
    dispose() {
        this.Zt.Kt();
        this.Jt[this.Wt] = void 0;
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

const ti = e.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Qt = g();
    }
    addEventListener(t, e, s, i, n) {
        var r;
        const o = (r = this.Qt)[s] ?? (r[s] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, s, n));
        return new DelegateSubscription(l, l.Yt(e), s, i);
    }
    dispose() {
        for (const t in this.Qt) {
            const e = this.Qt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const ei = e.DI.createInterface("IProjections");

const si = e.DI.createInterface("IAuSlotsInfo");

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

const ii = e.DI.createInterface("Instruction");

function ni(t) {
    const e = t.type;
    return C(e) && 2 === e.length;
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

const ri = e.DI.createInterface("ITemplateCompiler");

const oi = e.DI.createInterface("IRenderer");

function li(t) {
    return function e(s) {
        s.register = function(t) {
            V(oi, this).register(t);
        };
        A(s.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return s;
    };
}

function hi(t, e, s) {
    if (C(e)) return t.parse(e, s);
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
        return Se(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return Se(t).viewModel;

      default:
        {
            const s = ee(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = Se(t, {
                name: e
            });
            if (void 0 === i) throw new Error(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let ui = class SetPropertyRenderer {
    render(t, e, s) {
        const i = ci(e);
        if (void 0 !== i.$observers && void 0 !== i.$observers[s.to]) i.$observers[s.to].setValue(s.value, 2); else i[s.to] = s.value;
    }
};

ui = r([ li("re") ], ui);

let fi = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ hs, st ];
    }
    render(t, s, i) {
        let n;
        let r;
        let o;
        let l;
        const h = i.res;
        const c = i.projections;
        const a = t.container;
        switch (typeof h) {
          case "string":
            n = a.find($e, h);
            if (null == n) throw new Error(`AUR0752:${h}@${t["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? Gs(s) : null;
        const d = _i(this.p, t, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        d.registerResolver(r, new e.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        Fs(s, n.key, l);
        const p = this.r.renderers;
        const m = i.props;
        const x = m.length;
        let g = 0;
        let v;
        while (x > g) {
            v = m[g];
            p[v.type].render(t, l, v);
            ++g;
        }
        t.addChild(l);
    }
};

fi = r([ li("ra") ], fi);

let di = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ hs, st ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(ne, s.res);
            if (null == n) throw new Error(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = Fi(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        Fs(e, n.key, o);
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
        return [ hs, st ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(ne, s.res);
            if (null == n) throw new Error(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = this.r.getViewFactory(s.def, i);
        const o = Gs(e);
        const l = Fi(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        Fs(o, n.key, h);
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
        let c;
        let a = 0;
        while (o > a) {
            l = i[a];
            h = hi(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(38963 === h.$kind ? Ci(c, h, r) : c);
            ++a;
        }
    }
};

mi.inject = [ t.IExpressionParser, t.IObserverLocator ];

mi = r([ li("rd") ], mi);

let xi = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, i, ci(e), s.to);
        t.addBinding(38963 === i.$kind ? Ci(n, i, t.container) : n);
    }
};

xi.inject = [ t.IExpressionParser, t.IObserverLocator ];

xi = r([ li("rh") ], xi);

let gi = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        const n = new RefBinding(t.container, i, ai(e, s.to));
        t.addBinding(38963 === i.$kind ? Ci(n, i, t.container) : n);
    }
};

gi.inject = [ t.IExpressionParser ];

gi = r([ li("rj") ], gi);

let vi = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = hi(this.ep, s.from, 1);
        const r = new InterpolationBinding(t, i, this.oL, this.p.domWriteQueue, n, ci(e), s.to, exports.BindingMode.toView);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (38963 === c.ast.$kind) o[h] = Ci(c, c.ast, i);
        }
        t.addBinding(r);
    }
};

vi.inject = [ t.IExpressionParser, t.IObserverLocator, st ];

vi = r([ li("rf") ], vi);

let wi = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ci(e), s.to, s.mode);
        t.addBinding(38963 === i.$kind ? Ci(n, i, t.container) : n);
    }
};

wi.inject = [ t.IExpressionParser, t.IObserverLocator, st ];

wi = r([ li("rg") ], wi);

let bi = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ci(e), s.to, exports.BindingMode.toView);
        t.addBinding(38963 === i.iterable.$kind ? Ci(n, i.iterable, t.container) : n);
    }
};

bi.inject = [ t.IExpressionParser, t.IObserverLocator, st ];

bi = r([ li("rk") ], bi);

let yi = 0;

const ki = [];

function Ci(e, s, i) {
    while (s instanceof t.BindingBehaviorExpression) {
        ki[yi++] = s;
        s = s.expression;
    }
    while (yi > 0) {
        const t = ki[--yi];
        const s = i.get(ft.keyFrom(t.name));
        if (s instanceof BindingBehaviorFactory) e = s.construct(e, t);
    }
    ki.length = 0;
    return e;
}

let Ai = class TextBindingRenderer {
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
        let p;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            p = c[u];
            d = new ContentBinding(t, i, this.oL, this.p.domWriteQueue, this.p, p, r.insertBefore(o.createTextNode(""), n), s.strict);
            t.addBinding(38963 === p.$kind ? Ci(d, p, i) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Ai.inject = [ t.IExpressionParser, t.IObserverLocator, st ];

Ai = r([ li("ha") ], Ai);

const Ri = e.DI.createInterface("IListenerBehaviorOptions", (t => t.singleton(ListenerBehaviorOptions)));

class ListenerBehaviorOptions {
    constructor() {
        this.expAsHandler = false;
    }
}

let Bi = class ListenerBindingRenderer {
    constructor(t, e, s, i) {
        this.ep = t;
        this.te = e;
        this.p = s;
        this.ee = i;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 4);
        const n = new Listener(t.container, i, e, s.to, this.te, new ListenerOptions(s.preventDefault, s.strategy, this.ee.expAsHandler));
        t.addBinding(38963 === i.$kind ? Ci(n, i, t.container) : n);
    }
};

Bi.inject = [ t.IExpressionParser, ti, st, Ri ];

Bi = r([ li("hb") ], Bi);

let Si = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

Si = r([ li("he") ], Si);

let Ei = class SetClassAttributeRenderer {
    render(t, e, s) {
        Pi(e.classList, s.value);
    }
};

Ei = r([ li("hf") ], Ei);

let Ii = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

Ii = r([ li("hg") ], Ii);

let Ti = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, exports.BindingMode.toView);
        t.addBinding(38963 === i.$kind ? Ci(n, i, t.container) : n);
    }
};

Ti.inject = [ t.IExpressionParser, t.IObserverLocator, st ];

Ti = r([ li("hd") ], Ti);

let Di = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = hi(this.ep, s.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, exports.BindingMode.toView);
        t.addBinding(38963 === i.$kind ? Ci(n, i, t.container) : n);
    }
};

Di.inject = [ st, t.IExpressionParser, t.IObserverLocator ];

Di = r([ li("hc") ], Di);

let $i = class SpreadRenderer {
    constructor(t, e) {
        this.se = t;
        this.r = e;
    }
    static get inject() {
        return [ ri, hs ];
    }
    render(t, s, i) {
        const n = t.container;
        const r = n.get(Cs);
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
            const r = Oi(n);
            const c = this.se.compileSpread(n.controller.definition, n.instruction?.captures ?? e.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, Se(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            t.addBinding(r);
        };
        h(0);
    }
};

$i = r([ li("hs") ], $i);

class SpreadBinding {
    constructor(t, e) {
        this.ie = t;
        this.ne = e;
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
    $bind(t, e) {
        if (this.isBound) return;
        this.isBound = true;
        const s = this.$scope = this.ne.controller.scope.parentScope ?? void 0;
        if (null == s) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.ie.forEach((e => e.$bind(t, s)));
    }
    $unbind(t) {
        this.ie.forEach((e => e.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.ie.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Pi(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const Oi = t => new SpreadBinding([], t);

const Li = "IController";

const qi = "IInstruction";

const Ui = "IRenderLocation";

const Vi = "IAuSlotsInfo";

function _i(t, s, i, n, r, o) {
    const l = s.container.createChild();
    l.registerResolver(t.HTMLElement, l.registerResolver(t.Element, l.registerResolver(js, new e.InstanceProvider("ElementResolver", i))));
    l.registerResolver(ks, new e.InstanceProvider(Li, s));
    l.registerResolver(ii, new e.InstanceProvider(qi, n));
    l.registerResolver(Ns, null == r ? ji : new RenderLocationProvider(r));
    l.registerResolver(ts, Mi);
    l.registerResolver(si, null == o ? Ni : new e.InstanceProvider(Vi, o));
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
        if (!C(t.name) || 0 === t.name.length) throw new Error(`AUR0756`);
        return t;
    }
}

function Fi(t, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    c.registerResolver(t.HTMLElement, c.registerResolver(t.Element, c.registerResolver(js, new e.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    c.registerResolver(ks, new e.InstanceProvider(Li, i));
    c.registerResolver(ii, new e.InstanceProvider(qi, r));
    c.registerResolver(Ns, null == l ? ji : new e.InstanceProvider(Ui, l));
    c.registerResolver(ts, null == o ? Mi : new ViewFactoryProvider(o));
    c.registerResolver(si, null == h ? Ni : new e.InstanceProvider(Vi, h));
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

const ji = new RenderLocationProvider(null);

const Mi = new ViewFactoryProvider(null);

const Ni = new e.InstanceProvider(Vi, new AuSlotsInfo(e.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Wi(t) {
    return function(e) {
        return Xi.define(t, e);
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
    static create(t, s) {
        let i;
        let n;
        if (C(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new BindingCommandDefinition(s, e.firstDefined(Gi(s, "name"), i), e.mergeArrays(Gi(s, "aliases"), n.aliases, s.aliases), zi(i), e.firstDefined(Gi(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        V(s, e).register(t);
        _(s, e).register(t);
        W(i, Xi, s, t);
    }
}

const Hi = d("binding-command");

const zi = t => `${Hi}:${t}`;

const Gi = (t, e) => l(f(e), t);

const Xi = Object.freeze({
    name: Hi,
    keyFrom: zi,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c(Hi, s, s.Type);
        c(Hi, s, s);
        p(e, Hi);
        return s.Type;
    },
    getAnnotation: Gi
});

exports.OneTimeBindingCommand = class OneTimeBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "one-time";
    }
    build(t) {
        const s = t.attr;
        let i = s.target;
        let n = t.attr.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? e.camelCase(i); else {
            if ("" === n && 1 === t.def.type) n = e.camelCase(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(n, 8), i, exports.BindingMode.oneTime);
    }
};

exports.OneTimeBindingCommand.inject = [ rt, t.IExpressionParser ];

exports.OneTimeBindingCommand = r([ Wi("one-time") ], exports.OneTimeBindingCommand);

exports.ToViewBindingCommand = class ToViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "to-view";
    }
    build(t) {
        const s = t.attr;
        let i = s.target;
        let n = t.attr.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? e.camelCase(i); else {
            if ("" === n && 1 === t.def.type) n = e.camelCase(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(n, 8), i, exports.BindingMode.toView);
    }
};

exports.ToViewBindingCommand.inject = [ rt, t.IExpressionParser ];

exports.ToViewBindingCommand = r([ Wi("to-view") ], exports.ToViewBindingCommand);

exports.FromViewBindingCommand = class FromViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "from-view";
    }
    build(t) {
        const s = t.attr;
        let i = s.target;
        let n = s.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? e.camelCase(i); else {
            if ("" === n && 1 === t.def.type) n = e.camelCase(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(n, 8), i, exports.BindingMode.fromView);
    }
};

exports.FromViewBindingCommand.inject = [ rt, t.IExpressionParser ];

exports.FromViewBindingCommand = r([ Wi("from-view") ], exports.FromViewBindingCommand);

exports.TwoWayBindingCommand = class TwoWayBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "two-way";
    }
    build(t) {
        const s = t.attr;
        let i = s.target;
        let n = s.rawValue;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? e.camelCase(i); else {
            if ("" === n && 1 === t.def.type) n = e.camelCase(i);
            i = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(n, 8), i, exports.BindingMode.twoWay);
    }
};

exports.TwoWayBindingCommand.inject = [ rt, t.IExpressionParser ];

exports.TwoWayBindingCommand = r([ Wi("two-way") ], exports.TwoWayBindingCommand);

exports.DefaultBindingCommand = class DefaultBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "bind";
    }
    build(t) {
        const s = t.attr;
        const i = t.bindable;
        let n;
        let r;
        let o = s.target;
        let l = s.rawValue;
        if (null == i) {
            r = this.m.isTwoWay(t.node, o) ? exports.BindingMode.twoWay : exports.BindingMode.toView;
            o = this.m.map(t.node, o) ?? e.camelCase(o);
        } else {
            if ("" === l && 1 === t.def.type) l = e.camelCase(o);
            n = t.def.defaultBindingMode;
            r = i.mode === exports.BindingMode.default || null == i.mode ? null == n || n === exports.BindingMode.default ? exports.BindingMode.toView : n : i.mode;
            o = i.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(l, 8), o, r);
    }
};

exports.DefaultBindingCommand.inject = [ rt, t.IExpressionParser ];

exports.DefaultBindingCommand = r([ Wi("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(t) {
        const s = null === t.bindable ? e.camelCase(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(this.ep.parse(t.attr.rawValue, 8 | 4), s);
    }
};

exports.CallBindingCommand.inject = [ t.IExpressionParser ];

exports.CallBindingCommand = r([ Wi("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(t) {
        const s = null === t.bindable ? e.camelCase(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(t.attr.rawValue, 2), s);
    }
};

exports.ForBindingCommand.inject = [ t.IExpressionParser ];

exports.ForBindingCommand = r([ Wi("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "trigger";
    }
    build(e) {
        return new ListenerBindingInstruction(this.ep.parse(e.attr.rawValue, 4), e.attr.target, true, t.DelegationStrategy.none);
    }
};

exports.TriggerBindingCommand.inject = [ t.IExpressionParser ];

exports.TriggerBindingCommand = r([ Wi("trigger") ], exports.TriggerBindingCommand);

exports.DelegateBindingCommand = class DelegateBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "delegate";
    }
    build(e) {
        return new ListenerBindingInstruction(this.ep.parse(e.attr.rawValue, 4), e.attr.target, false, t.DelegationStrategy.bubbling);
    }
};

exports.DelegateBindingCommand.inject = [ t.IExpressionParser ];

exports.DelegateBindingCommand = r([ Wi("delegate") ], exports.DelegateBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "capture";
    }
    build(e) {
        return new ListenerBindingInstruction(this.ep.parse(e.attr.rawValue, 4), e.attr.target, false, t.DelegationStrategy.capturing);
    }
};

exports.CaptureBindingCommand.inject = [ t.IExpressionParser ];

exports.CaptureBindingCommand = r([ Wi("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "attr";
    }
    build(t) {
        return new AttributeBindingInstruction(t.attr.target, this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.AttrBindingCommand.inject = [ t.IExpressionParser ];

exports.AttrBindingCommand = r([ Wi("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "style";
    }
    build(t) {
        return new AttributeBindingInstruction("style", this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.StyleBindingCommand.inject = [ t.IExpressionParser ];

exports.StyleBindingCommand = r([ Wi("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "class";
    }
    build(t) {
        return new AttributeBindingInstruction("class", this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.ClassBindingCommand.inject = [ t.IExpressionParser ];

exports.ClassBindingCommand = r([ Wi("class") ], exports.ClassBindingCommand);

let Ki = class RefBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "ref";
    }
    build(t) {
        return new RefBindingInstruction(this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

Ki.inject = [ t.IExpressionParser ];

Ki = r([ Wi("ref") ], Ki);

let Yi = class SpreadBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() {
        return "...$attrs";
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

Yi = r([ Wi("...$attrs") ], Yi);

const Zi = e.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Ji = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.re = t.document.createElement("template");
    }
    createTemplate(t) {
        if (C(t)) {
            let e = Ji[t];
            if (void 0 === e) {
                const s = this.re;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.re = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                Ji[t] = e;
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

TemplateElementFactory.inject = [ st ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return V(ri, this).register(t);
    }
    compile(t, s, i) {
        const n = CustomElementDefinition.getOrCreate(t);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = en);
        const r = new CompilationContext(t, s, i, null, null, void 0);
        const o = C(n.template) || !t.enhance ? r.oe.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(U(dn));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(an)) throw new Error(`AUR0701`);
        this.le(h, r);
        this.he(h, r);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Ce(),
            dependencies: (t.dependencies ?? e.emptyArray).concat(r.deps ?? e.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.ce(o, r) : e.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, s, i, n) {
        const r = new CompilationContext(t, i, en, null, null, void 0);
        const o = [];
        const l = r.ae(n.nodeName.toLowerCase());
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
            w = r.ue(f);
            if (null !== w && (1 & w.type) > 0) {
                nn.node = n;
                nn.attr = f;
                nn.bindable = null;
                nn.def = null;
                o.push(w.build(nn));
                continue;
            }
            d = r.fe(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                x = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && Qi(C);
                if (y) m = this.de(n, C, d, r); else {
                    v = x.primary;
                    if (null === w) {
                        b = c.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        nn.node = n;
                        nn.attr = f;
                        nn.bindable = v;
                        nn.def = d;
                        m = [ w.build(nn) ];
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
                if (null != b) o.push(new InterpolationInstruction(b, r.m.map(n, k) ?? e.camelCase(k))); else switch (k) {
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
                        nn.node = n;
                        nn.attr = f;
                        nn.bindable = g;
                        nn.def = l;
                        o.push(new SpreadElementPropBindingInstruction(w.build(nn)));
                        continue;
                    }
                }
                nn.node = n;
                nn.attr = f;
                nn.bindable = null;
                nn.def = null;
                o.push(w.build(nn));
            }
        }
        tn();
        if (null != p) return p.concat(o);
        return o;
    }
    ce(t, s) {
        const i = [];
        const n = t.attributes;
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
            u = s.pe.parse(c, a);
            b = u.target;
            y = u.rawValue;
            if (rn[b]) throw new Error(`AUR0702:${c}`);
            g = s.ue(u);
            if (null !== g && (1 & g.type) > 0) {
                nn.node = t;
                nn.attr = u;
                nn.bindable = null;
                nn.def = null;
                i.push(g.build(nn));
                continue;
            }
            f = s.fe(b);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(f, true);
                w = false === f.noMultiBindings && null === g && Qi(y);
                if (w) p = this.de(t, y, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        v = r.parse(y, 1);
                        p = [ null === v ? new SetPropertyInstruction(y, x.property) : new InterpolationInstruction(v, x.property) ];
                    } else {
                        nn.node = t;
                        nn.attr = u;
                        nn.bindable = x;
                        nn.def = f;
                        p = [ g.build(nn) ];
                    }
                }
                t.removeAttribute(c);
                --l;
                --o;
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(b) ? b : void 0, p));
                continue;
            }
            if (null === g) {
                v = r.parse(y, 1);
                if (null != v) {
                    t.removeAttribute(c);
                    --l;
                    --o;
                    i.push(new InterpolationInstruction(v, s.m.map(t, b) ?? e.camelCase(b)));
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
                nn.node = t;
                nn.attr = u;
                nn.bindable = null;
                nn.def = null;
                i.push(g.build(nn));
            }
        }
        tn();
        if (null != d) return d.concat(i);
        return i;
    }
    he(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.me(t, e);

              default:
                return this.xe(t, e);
            }

          case 3:
            return this.ge(t, e);

          case 11:
            {
                let s = t.firstChild;
                while (null !== s) s = this.he(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    me(s, i) {
        const n = s.attributes;
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
            u = i.pe.parse(f, d);
            m = u.target;
            x = u.rawValue;
            p = i.ue(u);
            if (null !== p) switch (p.name) {
              case "to-view":
              case "bind":
                o.push(new LetBindingInstruction(l.parse(x, 8), e.camelCase(m)));
                continue;

              default:
                throw new Error(`AUR0704:${u.command}`);
            }
            g = l.parse(x, 1);
            o.push(new LetBindingInstruction(null === g ? new t.PrimitiveLiteralExpression(x) : g, e.camelCase(m)));
        }
        i.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.ve(s).nextSibling;
    }
    xe(t, s) {
        var i, n, r, o;
        const l = t.nextSibling;
        const h = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const c = s.ae(h);
        const a = null !== c;
        const u = a && null != c.shadowOptions;
        const f = c?.capture;
        const d = null != f && "boolean" !== typeof f;
        const p = f ? [] : e.emptyArray;
        const m = s.ep;
        const x = this.debug ? e.noop : () => {
            t.removeAttribute(k);
            --b;
            --w;
        };
        let g = t.attributes;
        let v;
        let w = g.length;
        let b = 0;
        let y;
        let k;
        let C;
        let A;
        let R;
        let B;
        let S = null;
        let E = false;
        let I;
        let T;
        let D;
        let $;
        let P;
        let O;
        let L;
        let q = null;
        let U;
        let V;
        let _;
        let F;
        let j = true;
        let M = false;
        let N = false;
        if ("slot" === h) {
            if (null == s.root.def.shadowOptions) throw new Error(`AUR0717:${s.root.def.name}`);
            s.root.hasSlot = true;
        }
        if (a) {
            j = c.processContent?.call(c.Type, t, s.p);
            g = t.attributes;
            w = g.length;
        }
        if (s.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;w > b; ++b) {
            y = g[b];
            k = y.name;
            C = y.value;
            switch (k) {
              case "as-element":
              case "containerless":
                x();
                if (!M) M = "containerless" === k;
                continue;
            }
            A = s.pe.parse(k, C);
            q = s.ue(A);
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
                    if (null == U.attrs[_] && !s.fe(_)?.isTemplateController) {
                        x();
                        p.push(A);
                        continue;
                    }
                }
            }
            if (null !== q && 1 & q.type) {
                nn.node = t;
                nn.attr = A;
                nn.bindable = null;
                nn.def = null;
                (R ?? (R = [])).push(q.build(nn));
                x();
                continue;
            }
            S = s.fe(_);
            if (null !== S) {
                U = BindablesInfo.from(S, true);
                E = false === S.noMultiBindings && null === q && Qi(F);
                if (E) D = this.de(t, F, S, s); else {
                    V = U.primary;
                    if (null === q) {
                        O = m.parse(F, 1);
                        D = [ null === O ? new SetPropertyInstruction(F, V.property) : new InterpolationInstruction(O, V.property) ];
                    } else {
                        nn.node = t;
                        nn.attr = A;
                        nn.bindable = V;
                        nn.def = S;
                        D = [ q.build(nn) ];
                    }
                }
                x();
                if (S.isTemplateController) ($ ?? ($ = [])).push(new HydrateTemplateController(sn, this.resolveResources ? S : S.name, void 0, D)); else (T ?? (T = [])).push(new HydrateAttributeInstruction(this.resolveResources ? S : S.name, null != S.aliases && S.aliases.includes(_) ? _ : void 0, D));
                continue;
            }
            if (null === q) {
                if (a) {
                    U = BindablesInfo.from(c, false);
                    I = U.attrs[_];
                    if (void 0 !== I) {
                        O = m.parse(F, 1);
                        (B ?? (B = [])).push(null == O ? new SetPropertyInstruction(F, I.property) : new InterpolationInstruction(O, I.property));
                        x();
                        continue;
                    }
                }
                O = m.parse(F, 1);
                if (null != O) {
                    x();
                    (R ?? (R = [])).push(new InterpolationInstruction(O, s.m.map(t, _) ?? e.camelCase(_)));
                }
                continue;
            }
            x();
            if (a) {
                U = BindablesInfo.from(c, false);
                I = U.attrs[_];
                if (void 0 !== I) {
                    nn.node = t;
                    nn.attr = A;
                    nn.bindable = I;
                    nn.def = c;
                    (B ?? (B = [])).push(q.build(nn));
                    continue;
                }
            }
            nn.node = t;
            nn.attr = A;
            nn.bindable = null;
            nn.def = null;
            (R ?? (R = [])).push(q.build(nn));
        }
        tn();
        if (this.we(t) && null != R && R.length > 1) this.be(t, R);
        if (a) {
            L = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, B ?? e.emptyArray, null, M, p);
            if (h === wn) {
                const e = t.getAttribute("name") || vn;
                const i = s.h("template");
                const n = s.ye();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else i.content.appendChild(r);
                    r = t.firstChild;
                }
                this.he(i.content, n);
                L.auSlot = {
                    name: e,
                    fallback: CustomElementDefinition.create({
                        name: Ce(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.ke(t, s);
            }
        }
        if (null != R || null != L || null != T) {
            v = e.emptyArray.concat(L ?? e.emptyArray, T ?? e.emptyArray, R ?? e.emptyArray);
            this.ve(t);
        }
        let W;
        if (null != $) {
            w = $.length - 1;
            b = w;
            P = $[b];
            let e;
            this.ke(t, s);
            if ("TEMPLATE" === t.nodeName) e = t; else {
                e = s.h("template");
                e.content.appendChild(t);
            }
            const r = e;
            const o = s.ye(null == v ? [] : [ v ]);
            let l;
            let f;
            let d;
            let p;
            let m;
            let x;
            let g;
            let y;
            let k = 0, C = 0;
            let A = t.firstChild;
            let R = false;
            if (false !== j) while (null !== A) {
                f = 1 === A.nodeType ? A.getAttribute(wn) : null;
                if (null !== f) A.removeAttribute(wn);
                if (a) {
                    l = A.nextSibling;
                    if (!u) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = p ?? (p = {}))[n = f || vn] ?? (i[n] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== f) {
                        f = f || vn;
                        throw new Error(`AUR0706:${h}[${f}]`);
                    }
                    A = A.nextSibling;
                }
            }
            if (null != p) {
                d = {};
                for (f in p) {
                    e = s.h("template");
                    m = p[f];
                    for (k = 0, C = m.length; C > k; ++k) {
                        x = m[k];
                        if ("TEMPLATE" === x.nodeName) if (x.attributes.length > 0) e.content.appendChild(x); else e.content.appendChild(x.content); else e.content.appendChild(x);
                    }
                    y = s.ye();
                    this.he(e.content, y);
                    d[f] = CustomElementDefinition.create({
                        name: Ce(),
                        template: e,
                        instructions: y.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                L.projections = d;
            }
            if (a && (M || c.containerless)) this.ke(t, s);
            W = !a || !c.containerless && !M && false !== j;
            if (W) if ("TEMPLATE" === t.nodeName) this.he(t.content, o); else {
                A = t.firstChild;
                while (null !== A) A = this.he(A, o);
            }
            P.def = CustomElementDefinition.create({
                name: Ce(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: s.root.def.isStrictBinding
            });
            while (b-- > 0) {
                P = $[b];
                e = s.h("template");
                g = s.h("au-m");
                g.classList.add("au");
                e.content.appendChild(g);
                P.def = CustomElementDefinition.create({
                    name: Ce(),
                    template: e,
                    needsCompile: false,
                    instructions: [ [ $[b + 1] ] ],
                    isStrictBinding: s.root.def.isStrictBinding
                });
            }
            s.rows.push([ P ]);
        } else {
            if (null != v) s.rows.push(v);
            let e = t.firstChild;
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
            if (false !== j) while (null !== e) {
                n = 1 === e.nodeType ? e.getAttribute(wn) : null;
                if (null !== n) e.removeAttribute(wn);
                if (a) {
                    i = e.nextSibling;
                    if (!u) {
                        g = 3 === e.nodeType && "" === e.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || vn] ?? (r[o] = [])).push(e);
                        t.removeChild(e);
                    }
                    e = i;
                } else {
                    if (null !== n) {
                        n = n || vn;
                        throw new Error(`AUR0706:${h}[${n}]`);
                    }
                    e = e.nextSibling;
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
                    x = s.ye();
                    this.he(m.content, x);
                    l[n] = CustomElementDefinition.create({
                        name: Ce(),
                        template: m,
                        instructions: x.rows,
                        needsCompile: false,
                        isStrictBinding: s.root.def.isStrictBinding
                    });
                }
                L.projections = l;
            }
            if (a && (M || c.containerless)) this.ke(t, s);
            W = !a || !c.containerless && !M && false !== j;
            if (W && t.childNodes.length > 0) {
                e = t.firstChild;
                while (null !== e) e = this.he(e, s);
            }
        }
        return l;
    }
    ge(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.ve(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    de(t, e, s, i) {
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
                f = i.pe.parse(l, h);
                d = i.ue(f);
                p = n.attrs[f.target];
                if (null == p) throw new Error(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    nn.node = t;
                    nn.attr = f;
                    nn.bindable = p;
                    nn.def = s;
                    o.push(d.build(nn));
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
    le(t, s) {
        const i = t;
        const n = e.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw new Error(`AUR0708`);
        const o = new Set;
        const l = [];
        for (const t of n) {
            if (t.parentNode !== i) throw new Error(`AUR0709`);
            const n = un(t, o);
            const r = class LocalTemplate {};
            const h = t.content;
            const c = e.toArray(h.querySelectorAll("bindable"));
            const a = D.for(r);
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
                    mode: fn(t)
                });
                const i = t.getAttributeNames().filter((t => !cn.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Ce(Re({
                name: n,
                template: t
            }, r));
            i.removeChild(t);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) Ie(l[h]).dependencies.push(...s.def.dependencies ?? e.emptyArray, ...s.deps ?? e.emptyArray);
    }
    we(t) {
        return "INPUT" === t.nodeName && 1 === on[t.type];
    }
    be(t, e) {
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
    ve(t) {
        t.classList.add("au");
        return t;
    }
    ke(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.ve(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(s, i, n, r, o, l) {
        this.hasSlot = false;
        this.Ae = g();
        const h = null !== r;
        this.c = i;
        this.root = null === o ? this : o;
        this.def = s;
        this.ci = n;
        this.parent = r;
        this.oe = h ? r.oe : i.get(Zi);
        this.pe = h ? r.pe : i.get(K);
        this.ep = h ? r.ep : i.get(t.IExpressionParser);
        this.m = h ? r.m : i.get(rt);
        this._t = h ? r._t : i.get(e.ILogger);
        this.p = h ? r.p : i.get(st);
        this.localEls = h ? r.localEls : new Set;
        this.rows = l ?? [];
    }
    Ce(t) {
        var e;
        ((e = this.root).deps ?? (e.deps = [])).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    ae(t) {
        return this.c.find($e, t);
    }
    fe(t) {
        return this.c.find(ne, t);
    }
    ye(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ue(t) {
        if (this.root !== this) return this.root.ue(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.Ae[e];
        if (void 0 === s) {
            s = this.c.create(Xi, e);
            if (null === s) throw new Error(`AUR0713:${e}`);
            this.Ae[e] = s;
        }
        return s;
    }
}

function Qi(t) {
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
            const r = e ? void 0 === t.defaultBindingMode ? exports.BindingMode.default : t.defaultBindingMode : exports.BindingMode.default;
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
            ln.set(t, s = new BindablesInfo(n, i, c));
        }
        return s;
    }
}

var hn;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(hn || (hn = {}));

const cn = Object.freeze([ "property", "attribute", "mode" ]);

const an = "as-custom-element";

function un(t, e) {
    const s = t.getAttribute(an);
    if (null === s || "" === s) throw new Error(`AUR0715`);
    if (e.has(s)) throw new Error(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(an);
    }
    return s;
}

function fn(t) {
    switch (t.getAttribute("mode")) {
      case "oneTime":
        return exports.BindingMode.oneTime;

      case "toView":
        return exports.BindingMode.toView;

      case "fromView":
        return exports.BindingMode.fromView;

      case "twoWay":
        return exports.BindingMode.twoWay;

      case "default":
      default:
        return exports.BindingMode.default;
    }
}

const dn = e.DI.createInterface("ITemplateCompilerHooks");

const pn = new WeakMap;

const mn = d("compiler-hooks");

const xn = Object.freeze({
    name: mn,
    define(t) {
        let e = pn.get(t);
        if (void 0 === e) {
            pn.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(mn, e, t);
            p(t, mn);
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
        t.register(V(dn, this.Type));
    }
}

const gn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return xn.define(t);
    }
};

const vn = "default";

const wn = "au-slot";

const bn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e, s) {
        bn.set(s, s.mode);
        s.mode = this.mode;
    }
    unbind(t, e, s) {
        s.mode = bn.get(s);
        bn.delete(s);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(exports.BindingMode.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(exports.BindingMode.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(exports.BindingMode.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(exports.BindingMode.twoWay);
    }
}

ht("oneTime")(OneTimeBindingBehavior);

ht("toView")(ToViewBindingBehavior);

ht("fromView")(FromViewBindingBehavior);

ht("twoWay")(TwoWayBindingBehavior);

const yn = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, s) {
        super(t, s);
        this.opts = {
            delay: yn
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.get(e.IPlatform).taskQueue;
        if (s.args.length > 0) this.firstArg = s.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, s) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.binding.handleChange(t, e, s);
    }
    updateSource(t, e) {
        this.queueTask((() => this.binding.updateSource(t, e)));
    }
    queueTask(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            return t();
        }), this.opts);
        e?.cancel();
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const t = Number(this.firstArg.evaluate(e, this, null));
            this.opts.delay = isNaN(t) ? yn : t;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.task?.cancel();
        this.task = null;
        this.binding.$unbind(t);
    }
}

ht("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Jt = new Map;
        this.Re = t;
    }
    bind(t, e, s, ...i) {
        if (!("handleChange" in s)) throw new Error(`AUR0817`);
        if (0 === i.length) throw new Error(`AUR0818`);
        this.Jt.set(s, i);
        let n;
        for (n of i) this.Re.addSignalListener(n, s);
    }
    unbind(t, e, s) {
        const i = this.Jt.get(s);
        this.Jt.delete(s);
        let n;
        for (n of i) this.Re.removeSignalListener(n, s);
    }
}

SignalBindingBehavior.inject = [ t.ISignaler ];

ht("signal")(SignalBindingBehavior);

const kn = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, s) {
        super(t, s);
        this.opts = {
            delay: kn
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.get(e.IPlatform);
        this.Be = this.p.taskQueue;
        if (s.args.length > 0) this.firstArg = s.args[0];
    }
    callSource(t) {
        this.Se((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, s) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
            this.lastCall = this.p.performanceNow();
        }
        this.binding.handleChange(t, e, s);
    }
    updateSource(t, e) {
        this.Se((() => this.binding.updateSource(t, e)));
    }
    Se(t) {
        const e = this.opts;
        const s = this.p;
        const i = this.lastCall + e.delay - s.performanceNow();
        if (i > 0) {
            const n = this.task;
            e.delay = i;
            this.task = this.Be.queueTask((() => {
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
    $bind(t, e) {
        if (null !== this.firstArg) {
            const t = Number(this.firstArg.evaluate(e, this, null));
            this.opts.delay = this.delay = isNaN(t) ? kn : t;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.task?.cancel();
        this.task = null;
        super.$unbind(t);
    }
}

ht("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, s, i) {
        if (null == t) s.removeAttribute(i); else s.setAttribute(i, t);
    }
}

const Cn = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, s) {
        s.targetObserver = Cn;
    }
    unbind(t, e, s) {
        return;
    }
}

ht("attr")(AttrBindingBehavior);

function An(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e, s) {
        if (!s.callSource || !s.targetEvent) throw new Error(`AUR0801`);
        s.selfEventCallSource = s.callSource;
        s.callSource = An;
    }
    unbind(t, e, s) {
        s.callSource = s.selfEventCallSource;
        s.selfEventCallSource = null;
    }
}

ht("self")(SelfBindingBehavior);

const Rn = g();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Rn[t] ?? (Rn[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s, i) {
        if (null == t) s.removeAttributeNS(this.ns, i); else s.setAttributeNS(this.ns, i, t);
    }
}

function Bn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Ee = void 0;
        this.Ie = void 0;
        this.f = 0;
        this.o = t;
        this.oL = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        const s = this.v;
        if (t === s) return;
        this.v = t;
        this.ov = s;
        this.f = e;
        this.Te();
        this.De();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.De();
    }
    handleChange(t, e, s) {
        this.De();
    }
    De() {
        const t = this.v;
        const e = this.o;
        const s = v.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Bn;
        if (i) e.checked = !!n(t, s); else if (true === t) e.checked = true; else {
            let i = false;
            if (t instanceof Array) i = -1 !== t.findIndex((t => !!n(t, s))); else if (t instanceof Set) {
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
        const n = void 0 !== e.matcher ? e.matcher : Bn;
        if ("checkbox" === e.type) {
            if (t instanceof Array) {
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
        this.Te();
    }
    stop() {
        this.handler.dispose();
        this.Ee?.unsubscribe(this);
        this.Ee = void 0;
        this.Ie?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        Sn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Sn, this.f);
    }
    Te() {
        const t = this.o;
        (this.Ie ?? (this.Ie = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Ee?.unsubscribe(this);
        this.Ee = void 0;
        if ("checkbox" === t.type) (this.Ee = _n(this.v, this.oL))?.subscribe(this);
    }
}

t.subscriberCollection(CheckedObserver);

t.withFlushQueue(CheckedObserver);

let Sn;

const En = {
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
        this.H = false;
        this.$e = void 0;
        this.Pe = void 0;
        this.iO = false;
        this.o = t;
        this.oL = i;
        this.handler = s;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Tn(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Oe(t instanceof Array ? t : null);
        if (0 === (32 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        this.syncOptions();
    }
    syncOptions() {
        const t = this.v;
        const e = this.o;
        const s = Array.isArray(t);
        const i = e.matcher ?? In;
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
            const o = t.matcher || In;
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
    Le() {
        (this.Pe = new this.o.ownerDocument.defaultView.MutationObserver(this.qe.bind(this))).observe(this.o, En);
        this.Oe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ue() {
        this.Pe.disconnect();
        this.$e?.unsubscribe(this);
        this.Pe = this.$e = void 0;
        this.iO = false;
    }
    Oe(t) {
        this.$e?.unsubscribe(this);
        this.$e = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.$e = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    qe(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Le();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Ue();
        }
    }
    flush() {
        Dn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Dn, 0);
    }
}

t.subscriberCollection(SelectValueObserver);

t.withFlushQueue(SelectValueObserver);

function Tn(t) {
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

let Dn;

const $n = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.H = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (32 & e)) this.K();
    }
    Ve(t) {
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
    _e(t) {
        let s;
        let i;
        const n = [];
        for (i in t) {
            s = t[i];
            if (null == s) continue;
            if (C(s)) {
                if (i.startsWith($n)) {
                    n.push([ i, s ]);
                    continue;
                }
                n.push([ e.kebabCase(i), s ]);
                continue;
            }
            n.push(...this.Fe(s));
        }
        return n;
    }
    je(t) {
        const s = t.length;
        if (s > 0) {
            const e = [];
            let i = 0;
            for (;s > i; ++i) e.push(...this.Fe(t[i]));
            return e;
        }
        return e.emptyArray;
    }
    Fe(t) {
        if (C(t)) return this.Ve(t);
        if (t instanceof Array) return this.je(t);
        if (t instanceof Object) return this._e(t);
        return e.emptyArray;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const s = this.Fe(t);
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
        if (null != e && k(e.indexOf) && e.includes("!important")) {
            s = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, s);
    }
    bind(t) {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, e, s) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.H = false;
        this.o = t;
        this.k = e;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        if (Object.is(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.H = true;
        if (!this.handler.config.readonly && 0 === (32 & e)) this.K(e);
    }
    K(t) {
        if (this.H) {
            this.H = false;
            this.o[this.k] = this.v ?? this.handler.config.default;
            if (0 === (2 & t)) this.queue.add(this);
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.o[this.k];
        if (this.ov !== this.v) {
            this.H = false;
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
        Pn = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Pn, 0);
    }
}

t.subscriberCollection(ValueAttributeObserver);

t.withFlushQueue(ValueAttributeObserver);

let Pn;

const On = "http://www.w3.org/1999/xlink";

const Ln = "http://www.w3.org/XML/1998/namespace";

const qn = "http://www.w3.org/2000/xmlns/";

const Un = Object.assign(g(), {
    "xlink:actuate": [ "actuate", On ],
    "xlink:arcrole": [ "arcrole", On ],
    "xlink:href": [ "href", On ],
    "xlink:role": [ "role", On ],
    "xlink:show": [ "show", On ],
    "xlink:title": [ "title", On ],
    "xlink:type": [ "type", On ],
    "xml:lang": [ "lang", Ln ],
    "xml:space": [ "space", Ln ],
    xmlns: [ "xmlns", qn ],
    "xmlns:xlink": [ "xlink", qn ]
});

const Vn = new t.PropertyAccessor;

Vn.type = 2 | 4;

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
        this.Me = g();
        this.Ne = g();
        this.We = g();
        this.He = g();
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
    static register(e) {
        _(t.INodeObserverLocator, NodeObserverLocator).register(e);
        V(t.INodeObserverLocator, NodeObserverLocator).register(e);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.Me;
        let n;
        if (C(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = new NodeObserverConfig(s); else Fn(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else Fn(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Ne;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else Fn("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else Fn("*", t);
    }
    getAccessor(t, s, i) {
        if (s in this.He || s in (this.We[t.tagName] ?? e.emptyObject)) return this.getObserver(t, s, i);
        switch (s) {
          case "src":
          case "href":
          case "role":
            return Cn;

          default:
            {
                const e = Un[s];
                if (void 0 !== e) return AttributeNSAccessor.forNs(e[1]);
                if (b(t, s, this.svgAnalyzer)) return Cn;
                return Vn;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (C(t)) {
            n = (s = this.We)[t] ?? (s[t] = g());
            n[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            n = (i = this.We)[e] ?? (i[e] = g());
            n[s] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.He[e] = true;
    }
    getObserver(e, s, i) {
        switch (s) {
          case "class":
            return new ClassAttributeAccessor(e);

          case "css":
          case "style":
            return new StyleAttributeAccessor(e);
        }
        const n = this.Me[e.tagName]?.[s] ?? this.Ne[s];
        if (null != n) return new n.type(e, s, new EventSubscriber(n), i, this.locator);
        const r = Un[s];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (b(e, s, this.svgAnalyzer)) return Cn;
        if (s in e.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(e, s);
            throw new Error(`AUR0652:${String(s)}`);
        } else return new t.SetterObserver(e, s);
    }
}

NodeObserverLocator.inject = [ e.IServiceLocator, st, t.IDirtyChecker, it ];

function _n(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Fn(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, s, ...i) {
        if (0 === i.length) throw new Error(`AUR0802`);
        if (s.mode !== exports.BindingMode.twoWay && s.mode !== exports.BindingMode.fromView) throw new Error(`AUR0803`);
        const n = this.oL.getObserver(s.target, s.targetProperty);
        if (!n.handler) throw new Error(`AUR0804`);
        s.targetObserver = n;
        const r = n.handler;
        n.originalHandler = r;
        n.handler = new EventSubscriber(new NodeObserverConfig({
            default: r.config.default,
            events: i,
            readonly: r.config.readonly
        }));
    }
    unbind(t, e, s) {
        s.targetObserver.handler.dispose();
        s.targetObserver.handler = s.targetObserver.originalHandler;
        s.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ t.IObserverLocator ];

ht("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.ze = t;
        this.p = e;
        this.Ge = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.Xe(); else this.Ge = true;
    }
    attached() {
        if (this.Ge) {
            this.Ge = false;
            this.Xe();
        }
        this.ze.addEventListener("focus", this);
        this.ze.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ze;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Ke) this.value = false;
    }
    Xe() {
        const t = this.ze;
        const e = this.Ke;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get Ke() {
        return this.ze === this.p.document.activeElement;
    }
}

Focus.inject = [ js, st ];

r([ E({
    mode: exports.BindingMode.twoWay
}) ], Focus.prototype, "value", void 0);

Kt("focus")(Focus);

let jn = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.Ye = false;
        this.Ze = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ze = null;
            if (Boolean(this.value) !== this.Je) if (this.Je === this.Qe) {
                this.Je = !this.Qe;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Je = this.Qe;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Je = this.Qe = "hide" !== s.alias;
    }
    binding() {
        this.Ye = true;
        this.update();
    }
    detaching() {
        this.Ye = false;
        this.Ze?.cancel();
        this.Ze = null;
    }
    valueChanged() {
        if (this.Ye && null === this.Ze) this.Ze = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ E ], jn.prototype, "value", void 0);

jn = r([ o(0, js), o(1, st), o(2, ii) ], jn);

N("hide")(jn);

Kt("show")(jn);

class Portal {
    constructor(t, s, i) {
        this.id = e.nextId("au$component");
        this.strict = false;
        this.p = i;
        this.ts = i.document.createElement("div");
        this.view = t.create();
        zs(this.view.nodes, s);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.ts = this.es();
        this.view.setHost(i);
        return this.ss(t, i, s);
    }
    detaching(t, e, s) {
        return this.os(t, this.ts, s);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const s = this.ts;
        const i = this.ts = this.es();
        if (s === i) return;
        this.view.setHost(i);
        const n = e.onResolve(this.os(null, i, t.flags), (() => this.ss(null, i, t.flags)));
        if (y(n)) n.catch((t => {
            throw t;
        }));
    }
    ss(t, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return e.onResolve(n?.call(r, s, o), (() => this.ls(t, s, i)));
    }
    ls(t, s, i) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.appendTo(s); else return e.onResolve(r.activate(t ?? r, n, i, n.scope), (() => this.cs(s)));
        return this.cs(s);
    }
    cs(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    os(t, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return e.onResolve(n?.call(r, s, o), (() => this.us(t, s, i)));
    }
    us(t, s, i) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.remove(); else return e.onResolve(r.deactivate(t, n, i), (() => this.ds(s)));
        return this.ds(s);
    }
    ds(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    es() {
        const t = this.p;
        const e = t.document;
        let s = this.target;
        let i = this.renderContext;
        if ("" === s) {
            if (this.strict) throw new Error(`AUR0811`);
            return e.body;
        }
        if (C(s)) {
            let n = e;
            if (C(i)) i = e.querySelector(i);
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

Portal.inject = [ ts, Ns, st ];

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

Yt("portal")(Portal);

class If {
    constructor(t, s, i) {
        this.ifFactory = t;
        this.location = s;
        this.work = i;
        this.id = e.nextId("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.ps = false;
        this.xs = 0;
    }
    attaching(t, s, i) {
        let n;
        const r = this.$controller;
        const o = this.xs++;
        const l = () => !this.ps && this.xs === o + 1;
        return e.onResolve(this.pending, (() => {
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == n) return;
            n.setLocation(this.location);
            this.pending = e.onResolve(n.activate(t, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, s, i) {
        this.ps = true;
        return e.onResolve(this.pending, (() => {
            this.ps = false;
            this.pending = void 0;
            void this.view?.deactivate(t, this.$controller, i);
        }));
    }
    valueChanged(t, s, i) {
        if (!this.$controller.isActive) return;
        t = !!t;
        s = !!s;
        if (t === s) return;
        this.work.start();
        const n = this.view;
        const r = this.$controller;
        const o = this.xs++;
        const l = () => !this.ps && this.xs === o + 1;
        let h;
        return e.onResolve(e.onResolve(this.pending, (() => this.pending = e.onResolve(n?.deactivate(n, r, i), (() => {
            if (!l()) return;
            if (t) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == h) return;
            h.setLocation(this.location);
            return e.onResolve(h.activate(h, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        })))), (() => this.work.finish()));
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

If.inject = [ ts, Ns, Vs ];

r([ E ], If.prototype, "value", void 0);

r([ E({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Yt("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = e.nextId("au$component");
    }
    link(t, e, s, i) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ ts ];

Yt({
    name: "else"
})(Else);

function Mn(t) {
    t.dispose();
}

const Nn = [ 38963, 36914 ];

class Repeat {
    constructor(t, s, i) {
        this.l = t;
        this.gs = s;
        this.f = i;
        this.id = e.nextId("au$component");
        this.views = [];
        this.key = void 0;
        this.vs = void 0;
        this.ws = false;
        this.bs = false;
        this.ys = null;
        this.ks = void 0;
        this.Cs = false;
    }
    binding(t, e, s) {
        const i = this.gs.bindings;
        const n = i.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = i[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.As = r;
                let t = o.iterable;
                while (null != t && Nn.includes(t.$kind)) {
                    t = t.expression;
                    this.ws = true;
                }
                this.ys = t;
                break;
            }
        }
        this.Rs(s);
        const h = o.declaration;
        if (!(this.Cs = 90138 === h.$kind || 106523 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
    }
    attaching(t, e, s) {
        this.Bs(s);
        return this.Ss(t, s);
    }
    detaching(t, e, s) {
        this.Rs(s);
        return this.Es(t, s);
    }
    itemsChanged(t) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        t |= s.flags;
        this.Rs(t);
        this.Bs(t);
        const i = e.onResolve(this.Es(null, t), (() => this.Ss(null, t)));
        if (y(i)) i.catch(R);
    }
    handleCollectionChange(s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.ws) {
            if (this.bs) return;
            this.bs = true;
            this.items = this.forOf.iterable.evaluate(n.scope, this.As, null);
            this.bs = false;
            return;
        }
        i |= n.flags;
        this.Bs(i);
        if (void 0 === s) {
            const t = e.onResolve(this.Es(null, i), (() => this.Ss(null, i)));
            if (y(t)) t.catch(R);
        } else {
            const n = this.views.length;
            const r = t.applyMutationsToIndices(s);
            if (r.deletedItems.length > 0) {
                r.deletedItems.sort(e.compareNumber);
                const t = e.onResolve(this.Is(r, i), (() => this.Ts(n, r, i)));
                if (y(t)) t.catch(R);
            } else this.Ts(n, r, i);
        }
    }
    Rs(e) {
        const s = this.$controller.scope;
        let i = this.Ds;
        let n = this.ws;
        let r;
        if (n) {
            i = this.Ds = this.ys.evaluate(s, this.As, null) ?? null;
            n = this.ws = !Object.is(this.items, i);
        }
        const o = this.vs;
        if (this.$controller.isActive) {
            r = this.vs = t.getCollectionObserver(n ? i : this.items);
            if (o !== r) {
                o?.unsubscribe(this);
                r?.subscribe(this);
            }
        } else {
            o?.unsubscribe(this);
            this.vs = void 0;
        }
    }
    Bs(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.ks = e;
            return;
        }
        const s = this.forOf;
        if (void 0 === s) return;
        const i = [];
        this.forOf.iterate(t, e, ((t, e, s) => {
            i[e] = s;
        }));
        this.ks = i;
    }
    Ss(e, s) {
        let i;
        let n;
        let r;
        let o;
        const {$controller: l, f: h, local: c, l: a, items: u} = this;
        const f = l.scope;
        const d = this.forOf;
        const p = d.count(s, u);
        const m = this.views = Array(p);
        d.iterate(s, u, ((u, x, g) => {
            r = m[x] = h.create().setLocation(a);
            r.nodes.unlink();
            if (this.Cs) d.declaration.assign(o = t.Scope.fromParent(f, t.BindingContext.create()), this.As, g); else o = t.Scope.fromParent(f, t.BindingContext.create(c, g));
            Xn(o.overrideContext, x, p);
            n = r.activate(e ?? r, l, s, o);
            if (y(n)) (i ?? (i = [])).push(n);
        }));
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    Es(t, e) {
        let s;
        let i;
        let n;
        let r = 0;
        const {views: o, $controller: l} = this;
        const h = o.length;
        for (;h > r; ++r) {
            n = o[r];
            n.release();
            i = n.deactivate(t ?? n, l, e);
            if (y(i)) (s ?? (s = [])).push(i);
        }
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    Is(t, e) {
        let s;
        let i;
        let n;
        const {$controller: r, views: o} = this;
        const l = t.deletedItems;
        const h = l.length;
        let c = 0;
        for (;h > c; ++c) {
            n = o[l[c]];
            n.release();
            i = n.deactivate(n, r, e);
            if (y(i)) (s ?? (s = [])).push(i);
        }
        c = 0;
        let a = 0;
        for (;h > c; ++c) {
            a = l[c] - c;
            o.splice(a, 1);
        }
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    Ts(e, s, i) {
        let n;
        let r;
        let o;
        let l;
        let h = 0;
        const {$controller: c, f: a, local: u, ks: f, l: d, views: p} = this;
        const m = s.length;
        for (;m > h; ++h) if (-2 === s[h]) {
            o = a.create();
            p.splice(h, 0, o);
        }
        if (p.length !== m) throw new Error(`AUR0814:${p.length}!=${m}`);
        const x = c.scope;
        const g = s.length;
        t.synchronizeIndices(p, s);
        const v = Gn(s);
        const w = v.length;
        let b;
        let k = w - 1;
        h = g - 1;
        for (;h >= 0; --h) {
            o = p[h];
            b = p[h + 1];
            o.nodes.link(b?.nodes ?? d);
            if (-2 === s[h]) {
                if (this.Cs) this.forOf.declaration.assign(l = t.Scope.fromParent(x, t.BindingContext.create()), this.As, f[h]); else l = t.Scope.fromParent(x, t.BindingContext.create(u, f[h]));
                Xn(l.overrideContext, h, g);
                o.setLocation(d);
                r = o.activate(o, c, i, l);
                if (y(r)) (n ?? (n = [])).push(r);
            } else if (k < 0 || 1 === w || h !== v[k]) {
                Xn(o.scope.overrideContext, h, g);
                o.nodes.insertBefore(o.location);
            } else {
                if (e !== g) Xn(o.scope.overrideContext, h, g);
                --k;
            }
        }
        if (void 0 !== n) return 1 === n.length ? n[0] : Promise.all(n);
    }
    dispose() {
        this.views.forEach(Mn);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Ns, ks, ts ];

r([ E ], Repeat.prototype, "items", void 0);

Yt("repeat")(Repeat);

let Wn = 16;

let Hn = new Int32Array(Wn);

let zn = new Int32Array(Wn);

function Gn(t) {
    const e = t.length;
    if (e > Wn) {
        Wn = e;
        Hn = new Int32Array(e);
        zn = new Int32Array(e);
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
            o = Hn[s];
            n = t[o];
            if (-2 !== n && n < i) {
                zn[r] = o;
                Hn[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[Hn[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[Hn[l]];
            if (i < n || -2 === n) {
                if (l > 0) zn[r] = Hn[l - 1];
                Hn[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = Hn[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = zn[i];
    }
    while (r-- > 0) Hn[r] = 0;
    return a;
}

function Xn(t, e, s) {
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
}

class With {
    constructor(t, s) {
        this.id = e.nextId("au$component");
        this.id = e.nextId("au$component");
        this.view = t.create().setLocation(s);
    }
    valueChanged(e, s, i) {
        const n = this.$controller;
        const r = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (n.isActive && null != r) {
            o = t.Scope.fromParent(n.scope, void 0 === e ? {} : e);
            for (h = r.length; h > l; ++l) r[l].$bind(2, o);
        }
    }
    attaching(e, s, i) {
        const {$controller: n, value: r} = this;
        const o = t.Scope.fromParent(n.scope, void 0 === r ? {} : r);
        return this.view.activate(e, n, i, o);
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

With.inject = [ ts, Ns ];

r([ E ], With.prototype, "value", void 0);

Yt("with")(With);

exports.Switch = class Switch {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
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
        this.queue((() => this.swap(t, s, this.value)));
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
    valueChanged(t, e, s) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, s, this.value)));
    }
    caseChanged(t, e) {
        this.queue((() => this.$s(t, e)));
    }
    $s(t, s) {
        const i = t.isMatch(this.value, s);
        const n = this.activeCases;
        const r = n.length;
        if (!i) {
            if (r > 0 && n[0].id === t.id) return this.Ps(null, s);
            return;
        }
        if (r > 0 && n[0].id < t.id) return;
        const o = [];
        let l = t.fallThrough;
        if (!l) o.push(t); else {
            const e = this.cases;
            const s = e.indexOf(t);
            for (let t = s, i = e.length; t < i && l; t++) {
                const s = e[t];
                o.push(s);
                l = s.fallThrough;
            }
        }
        return e.onResolve(this.Ps(null, s, o), (() => {
            this.activeCases = o;
            return this.Os(null, s);
        }));
    }
    swap(t, s, i) {
        const n = [];
        let r = false;
        for (const t of this.cases) {
            if (r || t.isMatch(i, s)) {
                n.push(t);
                r = t.fallThrough;
            }
            if (n.length > 0 && !r) break;
        }
        const o = this.defaultCase;
        if (0 === n.length && void 0 !== o) n.push(o);
        return e.onResolve(this.activeCases.length > 0 ? this.Ps(t, s, n) : void 0, (() => {
            this.activeCases = n;
            if (0 === n.length) return;
            return this.Os(t, s);
        }));
    }
    Os(t, s) {
        const i = this.$controller;
        if (!i.isActive) return;
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        const o = i.scope;
        if (1 === r) return n[0].activate(t, s, o);
        return e.resolveAll(...n.map((e => e.activate(t, s, o))));
    }
    Ps(t, s, i = []) {
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        if (1 === r) {
            const e = n[0];
            if (!i.includes(e)) {
                n.length = 0;
                return e.deactivate(t, s);
            }
            return;
        }
        return e.onResolve(e.resolveAll(...n.reduce(((e, n) => {
            if (!i.includes(n)) e.push(n.deactivate(t, s));
            return e;
        }), [])), (() => {
            n.length = 0;
        }));
    }
    queue(t) {
        const s = this.promise;
        let i;
        i = this.promise = e.onResolve(e.onResolve(s, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

r([ E ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ Yt("switch"), o(0, ts), o(1, Ns) ], exports.Switch);

exports.Case = class Case {
    constructor(t, s, i, n) {
        this.f = t;
        this.Ls = s;
        this.l = i;
        this.id = e.nextId("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.qs = n.config.level <= 1;
        this._t = n.scopeTo(`${this.constructor.name}-#${this.id}`);
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
    isMatch(t, e) {
        this._t.debug("isMatch()");
        const s = this.value;
        if (Array.isArray(s)) {
            if (void 0 === this.vs) this.vs = this.Us(e, s);
            return s.includes(t);
        }
        return s === t;
    }
    valueChanged(t, e, s) {
        if (Array.isArray(t)) {
            this.vs?.unsubscribe(this);
            this.vs = this.Us(s, t);
        } else if (void 0 !== this.vs) this.vs.unsubscribe(this);
        this.$switch.caseChanged(this, s);
    }
    handleCollectionChange(t, e) {
        this.$switch.caseChanged(this, e);
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
        this.vs?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Us(t, e) {
        const s = this.Ls.getArrayObserver(e);
        s.subscribe(this);
        return s;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ ts, t.IObserverLocator, Ns, e.ILogger ];

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
    mode: exports.BindingMode.oneTime
}) ], exports.Case.prototype, "fallThrough", void 0);

exports.Case = r([ Yt("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ Yt("default-case") ], exports.DefaultCase);

exports.PromiseTemplateController = class PromiseTemplateController {
    constructor(t, s, i, n) {
        this.f = t;
        this.l = s;
        this.p = i;
        this.id = e.nextId("au$component");
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = n.scopeTo("promise.resolve");
    }
    link(t, e, s, i) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(s, i, n) {
        const r = this.view;
        const o = this.$controller;
        return e.onResolve(r.activate(s, o, n, this.viewScope = t.Scope.fromParent(o.scope, {})), (() => this.swap(s, n)));
    }
    valueChanged(t, e, s) {
        if (!this.$controller.isActive) return;
        this.swap(null, s);
    }
    swap(t, s) {
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
            void e.resolveAll(a = (this.preSettledTask = r.queueTask((() => e.resolveAll(o?.deactivate(t, s), l?.deactivate(t, s), h?.activate(t, s, c))), u)).result.catch((t => {
                if (!(t instanceof i.TaskAbortError)) throw t;
            })), n.then((i => {
                if (this.value !== n) return;
                const f = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => e.resolveAll(h?.deactivate(t, s), l?.deactivate(t, s), o?.activate(t, s, c, i))), u)).result;
                };
                if (1 === this.preSettledTask.status) void a.then(f); else {
                    this.preSettledTask.cancel();
                    f();
                }
            }), (i => {
                if (this.value !== n) return;
                const f = () => {
                    this.postSettlePromise = (this.postSettledTask = r.queueTask((() => e.resolveAll(h?.deactivate(t, s), o?.deactivate(t, s), l?.activate(t, s, c, i))), u)).result;
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

exports.PromiseTemplateController = r([ Yt("promise"), o(0, ts), o(1, Ns), o(2, st), o(3, e.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, s, i) {
        Kn(t).pending = this;
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
    mode: exports.BindingMode.toView
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ Yt("pending"), o(0, ts), o(1, Ns) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, s, i) {
        Kn(t).fulfilled = this;
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
    mode: exports.BindingMode.fromView
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ Yt("then"), o(0, ts), o(1, Ns) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, s, i) {
        Kn(t).rejected = this;
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
    mode: exports.BindingMode.fromView
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ Yt("catch"), o(0, ts), o(1, Ns) ], exports.RejectedTemplateController);

function Kn(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw new Error(`AUR0813`);
}

let Yn = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Yn = r([ Y({
    pattern: "promise.resolve",
    symbols: ""
}) ], Yn);

let Zn = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Zn = r([ Y({
    pattern: "then",
    symbols: ""
}) ], Zn);

let Jn = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Jn = r([ Y({
    pattern: "catch",
    symbols: ""
}) ], Jn);

function Qn(t, e, s, i) {
    if (C(e)) return tr(t, e, s, i);
    if (Be(e)) return er(t, e, s, i);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Vs = s;
        this._s = void 0;
    }
    get definition() {
        if (void 0 === this._s) this._s = CustomElementDefinition.create({
            name: Ce(),
            template: this.node,
            needsCompile: C(this.node),
            instructions: this.instructions,
            dependencies: this.Vs
        });
        return this._s;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(hs).getViewFactory(this.definition, t.createChild().register(...this.Vs));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Vs);
    }
}

function tr(t, e, s, i) {
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
    if (i) sr(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function er(t, e, s, i) {
    const n = Ie(e);
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
    if (i) sr(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function sr(t, e, s, i, n) {
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

function ir(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, s, i, n) {
        this.p = t;
        this.Fs = s;
        this.js = i;
        this.r = n;
        this.id = e.nextId("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Ms = void 0;
        this.Ns = s.props.reduce(ir, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.Ms !== i) {
            this.Ms = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.us(this.view, t, s);
    }
    componentChanged(t, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Ms === t) return;
        this.Ms = t;
        this.composing = true;
        i |= n.flags;
        const r = e.onResolve(this.us(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (y(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(t, s, i, n) {
        return e.onResolve(void 0 === t ? e.onResolve(s, (t => this.Ws(t, n))) : t, (t => this.ls(this.view = t, i, n)));
    }
    us(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    ls(t, s, i) {
        const {$controller: n} = this;
        return e.onResolve(t?.activate(s ?? t, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Ws(t, e) {
        const s = this.Hs(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Hs(t, e) {
        if (null == t) return;
        const s = this.js.controller.container;
        if ("object" === typeof t) {
            if (nr(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (C(t)) {
            const e = s.find($e, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return Qn(this.p, t, this.Ns, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ st, ii, Cs, hs ];

r([ E ], AuRender.prototype, "component", void 0);

r([ E({
    mode: exports.BindingMode.fromView
}) ], AuRender.prototype, "composing", void 0);

ce({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function nr(t) {
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
        this.zs = void 0;
        this.r = t.get(hs);
        this.Fs = r;
        this.Gs = o;
    }
    static get inject() {
        return [ e.IContainer, ks, js, Ns, st, ii, e.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Xs;
    }
    get composition() {
        return this.zs;
    }
    attaching(t, s, i) {
        return this.Xs = e.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Gs.isCurrent(t)) this.Xs = void 0;
        }));
    }
    detaching(t) {
        const s = this.zs;
        const i = this.Xs;
        this.Gs.invalidate();
        this.zs = this.Xs = void 0;
        return e.onResolve(i, (() => s?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.zs) {
            this.zs.update(this.model);
            return;
        }
        this.Xs = e.onResolve(this.Xs, (() => e.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Gs.isCurrent(t)) this.Xs = void 0;
        }))));
    }
    queue(t, s) {
        const i = this.Gs;
        const n = this.zs;
        return e.onResolve(i.create(t), (t => {
            if (i.isCurrent(t)) return e.onResolve(this.compose(t), (r => {
                if (i.isCurrent(t)) return e.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(t)) {
                        this.zs = r;
                        return e.onResolve(n?.deactivate(s), (() => t));
                    } else return e.onResolve(r.controller.deactivate(r.controller, this.$controller, 4), (() => {
                        r.controller.dispose();
                        return t;
                    }));
                }));
                r.controller.dispose();
                return t;
            }));
            return t;
        }));
    }
    compose(s) {
        let i;
        let n;
        let r;
        const {view: o, viewModel: l, model: h} = s.change;
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
                const t = Controller.$el(p, i, n, {
                    projections: this.Fs.projections
                }, d);
                return new CompositionController(t, (e => t.activate(e ?? t, u, 2, u.scope.parentScope)), (s => e.onResolve(t.deactivate(s ?? t, u, 4), r)), (t => i.activate?.(t)), s);
            } else {
                const e = CustomElementDefinition.create({
                    name: $e.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(e, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? t.Scope.fromParent(this.parent.scope, i) : t.Scope.create(i);
                if (Xs(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 2, h)), (t => l.deactivate(t ?? l, u, 4)), (t => i.activate?.(t)), s);
            }
        };
        if ("activate" in i) return e.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(t, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = Xs(i);
        t.registerResolver(n.Element, t.registerResolver(js, new e.InstanceProvider("ElementResolver", r ? null : i)));
        t.registerResolver(Ns, new e.InstanceProvider("IRenderLocation", r ? i : null));
        const o = t.invoke(s);
        t.registerResolver(s, new e.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = k(t) ? t : t?.constructor;
        return $e.isType(e) ? $e.getDefinition(e) : null;
    }
}

r([ E ], AuCompose.prototype, "view", void 0);

r([ E ], AuCompose.prototype, "viewModel", void 0);

r([ E ], AuCompose.prototype, "model", void 0);

r([ E({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

ce("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return e.onResolve(t.load(), (t => new CompositionContext(++this.id, t)));
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
        this.Ks = null;
        this.Ys = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.Zs = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.Zs = true;
        }
        this.js = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Ns, ii, Cs, hs ];
    }
    binding(e, s, i) {
        this.Ks = this.$controller.scope.parentScope;
        let n;
        if (this.Zs) {
            n = this.js.controller.scope.parentScope;
            (this.Ys = t.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.Ks.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.Zs ? this.Ys : this.Ks);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.Zs && null != this.Ys) this.Ys.overrideContext.$host = t;
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

ce({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const rr = e.DI.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.Js = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Js.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, rr) ], exports.SanitizeValueConverter);

dt("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.Qs = t;
    }
    toView(t, e) {
        return this.Qs.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, ls) ], exports.ViewValueConverter);

dt("view")(exports.ViewValueConverter);

const or = DebounceBindingBehavior;

const lr = OneTimeBindingBehavior;

const hr = ToViewBindingBehavior;

const cr = FromViewBindingBehavior;

const ar = SignalBindingBehavior;

const ur = ThrottleBindingBehavior;

const fr = TwoWayBindingBehavior;

const dr = TemplateCompiler;

const pr = NodeObserverLocator;

const mr = [ dr, pr ];

const xr = SVGAnalyzer;

const gr = exports.AtPrefixedTriggerAttributePattern;

const vr = exports.ColonPrefixedBindAttributePattern;

const wr = exports.RefAttributePattern;

const br = exports.DotSeparatedAttributePattern;

const yr = et;

const kr = [ wr, br, yr ];

const Cr = [ gr, vr ];

const Ar = exports.CallBindingCommand;

const Rr = exports.DefaultBindingCommand;

const Br = exports.ForBindingCommand;

const Sr = exports.FromViewBindingCommand;

const Er = exports.OneTimeBindingCommand;

const Ir = exports.ToViewBindingCommand;

const Tr = exports.TwoWayBindingCommand;

const Dr = Ki;

const $r = exports.TriggerBindingCommand;

const Pr = exports.DelegateBindingCommand;

const Or = exports.CaptureBindingCommand;

const Lr = exports.AttrBindingCommand;

const qr = exports.ClassBindingCommand;

const Ur = exports.StyleBindingCommand;

const Vr = Yi;

const _r = [ Rr, Er, Sr, Ir, Tr, Ar, Br, Dr, $r, Pr, Or, qr, Ur, Lr, Vr ];

const Fr = exports.SanitizeValueConverter;

const jr = exports.ViewValueConverter;

const Mr = If;

const Nr = Else;

const Wr = Repeat;

const Hr = With;

const zr = exports.Switch;

const Gr = exports.Case;

const Xr = exports.DefaultCase;

const Kr = exports.PromiseTemplateController;

const Yr = exports.PendingTemplateController;

const Zr = exports.FulfilledTemplateController;

const Jr = exports.RejectedTemplateController;

const Qr = Yn;

const to = Zn;

const eo = Jn;

const so = AttrBindingBehavior;

const io = SelfBindingBehavior;

const no = UpdateTriggerBindingBehavior;

const ro = AuRender;

const oo = AuCompose;

const lo = Portal;

const ho = Focus;

const co = jn;

const ao = [ or, lr, hr, cr, ar, ur, fr, Fr, jr, Mr, Nr, Wr, Hr, zr, Gr, Xr, Kr, Yr, Zr, Jr, Qr, to, eo, so, io, no, ro, oo, lo, ho, co, AuSlot ];

const uo = xi;

const fo = di;

const po = fi;

const mo = vi;

const xo = bi;

const go = mi;

const vo = wi;

const wo = gi;

const bo = ui;

const yo = pi;

const ko = Bi;

const Co = Di;

const Ao = Si;

const Ro = Ei;

const Bo = Ii;

const So = Ti;

const Eo = Ai;

const Io = $i;

const To = [ vo, xo, uo, wo, mo, bo, po, fo, yo, go, ko, Co, Ao, Ro, Bo, So, Eo, Io ];

const Do = $o(e.noop);

function $o(e) {
    return {
        optionsProvider: e,
        register(s) {
            const i = {
                coercingOptions: {
                    enableCoercion: false,
                    coerceNullish: false
                }
            };
            e(i);
            return s.register(F(t.ICoercionConfiguration, i.coercingOptions), ...mr, ...ao, ...kr, ..._r, ...To);
        },
        customize(t) {
            return $o(t ?? e);
        }
    };
}

const Po = e.DI.createInterface("IAurelia");

class Aurelia {
    constructor(t = e.DI.createContainer()) {
        this.container = t;
        this.ir = false;
        this.ti = false;
        this.ei = false;
        this.si = void 0;
        this.next = void 0;
        this.ii = void 0;
        this.ni = void 0;
        if (t.has(Po, true)) throw new Error(`AUR0768`);
        t.registerResolver(Po, new e.InstanceProvider("IAurelia", this));
        t.registerResolver(Us, this.ri = new e.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ti;
    }
    get isStopping() {
        return this.ei;
    }
    get root() {
        if (null == this.si) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.si;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.oi(t.host), this.container, this.ri);
        return this;
    }
    enhance(t, s) {
        const i = t.container ?? this.container.createChild();
        const n = t.host;
        const r = this.oi(n);
        const o = t.component;
        let l;
        if (k(o)) {
            i.registerResolver(r.HTMLElement, i.registerResolver(r.Element, i.registerResolver(js, new e.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        i.registerResolver(Ms, new e.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: Ce(),
            template: n,
            enhance: true
        }));
        return e.onResolve(h.activate(h, s, 2), (() => h));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    oi(t) {
        let e;
        if (!this.container.has(st, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(F(st, e));
        } else e = this.container.get(st);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (y(this.ii)) return this.ii;
        return this.ii = e.onResolve(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ri.prepare(this.si = t);
            this.ti = true;
            return e.onResolve(t.activate(), (() => {
                this.ir = true;
                this.ti = false;
                this.ii = void 0;
                this.li(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (y(this.ni)) return this.ni;
        if (true === this.ir) {
            const s = this.si;
            this.ir = false;
            this.ei = true;
            return this.ni = e.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (t) s.dispose();
                this.si = void 0;
                this.ri.dispose();
                this.ei = false;
                this.li(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.ei) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    li(t, e, s) {
        const i = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        s.dispatchEvent(i);
    }
}

exports.DefinitionType = void 0;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(exports.DefinitionType || (exports.DefinitionType = {}));

const Oo = e.DI.createInterface("IDialogService");

const Lo = e.DI.createInterface("IDialogController");

const qo = e.DI.createInterface("IDialogDomRenderer");

const Uo = e.DI.createInterface("IDialogDom");

const Vo = e.DI.createInterface("IDialogGlobalSettings");

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
            this.Ot = t;
            this.Et = e;
        }));
    }
    static get inject() {
        return [ st, e.IContainer ];
    }
    activate(t) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = t;
        const o = s.get(qo);
        const l = t.host ?? this.p.document.body;
        const h = this.dom = o.render(l, t);
        const c = s.has(Ms, true) ? s.get(Ms) : null;
        const a = h.contentHost;
        this.settings = t;
        if (null == c || !c.contains(l)) s.register(F(Ms, l));
        s.register(F(js, a), F(Uo, h));
        return new Promise((e => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, t, a), {
                $dialog: this
            });
            e(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw _o(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return e.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: $e.generateName(),
                    template: n
                }));
                return e.onResolve(i.activate(i, null, 2), (() => {
                    h.overlay.addEventListener(t.mouseEvent ?? "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            h.dispose();
            throw t;
        }));
    }
    deactivate(t, s) {
        if (this.hi) return this.hi;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(t, s);
        const a = new Promise((a => {
            a(e.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.hi = void 0;
                    if (h) throw _o(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return e.onResolve(o.deactivate?.(c), (() => e.onResolve(n.deactivate(n, null, 4), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== t) this.Ot(c); else this.Et(_o(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.hi = void 0;
            throw t;
        }));
        this.hi = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const s = Fo(t);
        return new Promise((t => t(e.onResolve(this.cmp.deactivate?.(DialogCloseResult.create("error", s)), (() => e.onResolve(this.controller.deactivate(this.controller, null, 4), (() => {
            this.dom.dispose();
            this.Et(s);
        })))))));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, s, i) {
        const n = s.component;
        if (null == n) return new EmptyComponent;
        if ("object" === typeof n) return n;
        const r = this.p;
        t.registerResolver(r.HTMLElement, t.registerResolver(r.Element, t.registerResolver(js, new e.InstanceProvider("ElementResolver", i))));
        return t.invoke(n);
    }
    getDefinition(t) {
        const e = k(t) ? t : t?.constructor;
        return $e.isType(e) ? $e.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function _o(t, e) {
    const s = new Error(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function Fo(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.xt = t;
        this.p = e;
        this.ai = s;
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
        return [ e.IContainer, st, Vo ];
    }
    static register(t) {
        t.register(V(Oo, this), Ut.deactivating(Oo, (t => e.onResolve(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Mo(new Promise((s => {
            const i = DialogSettings.from(this.ai, t);
            const n = i.container ?? this.xt.createChild();
            s(e.onResolve(i.load(), (t => {
                const s = n.invoke(DialogController);
                n.register(F(Lo, s));
                n.register(j(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return e.onResolve(s.activate(t), (t => {
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
        const s = No(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).fi().ui();
    }
    load() {
        const t = this;
        const s = this.component;
        const i = this.template;
        const n = e.resolveAll(null == s ? void 0 : e.onResolve(s(), (e => {
            t.component = e;
        })), k(i) ? e.onResolve(i(), (e => {
            t.template = e;
        })) : void 0);
        return y(n) ? n.then((() => t)) : t;
    }
    fi() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    ui() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function jo(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function Mo(t) {
    t.whenClosed = jo;
    return t;
}

function No(t) {
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
        V(Vo, this).register(t);
    }
}

const Wo = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Wo} display:flex;`;
        this.overlayCss = Wo;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        V(qo, this).register(t);
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

DefaultDialogDomRenderer.inject = [ st ];

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

function Ho(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, Ut.creating((() => t(s.get(Vo))))),
        customize(t, s) {
            return Ho(t, s ?? e);
        }
    };
}

const zo = Ho((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(V(Vo, this));
    }
} ]);

const Go = Ho(e.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Xo = e.DI.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, s) {
        this.ctn = t;
        this.p = e;
        this.r = s;
    }
    define(t, s, i) {
        if (!t.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let n;
        if (null == s) throw new Error("Invalid custom element definition");
        switch (typeof s) {
          case "function":
            n = $e.isType(s) ? $e.getDefinition(s) : CustomElementDefinition.create($e.generateName(), s);
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
                const t = o.createChild();
                t.registerResolver(c.HTMLElement, t.registerResolver(c.Element, t.registerResolver(js, new e.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, t, {
                    projections: null
                });
                const i = t.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(t, i, this, null, s);
                Fs(this, s.key, r);
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
        this.p.customElements.define(t, CustomElementClass, i);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ e.IContainer, st, hs ];

exports.LifecycleFlags = t.LifecycleFlags;

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = Ut;

exports.AtPrefixedTriggerAttributePatternRegistration = gr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = so;

exports.AttrBindingCommandRegistration = Lr;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Co;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = tt;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = ro;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = D;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = ft;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingBehaviorFactory = BindingBehaviorFactory;

exports.BindingCommand = Xi;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingInterceptor = BindingInterceptor;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Ar;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = uo;

exports.CaptureBindingCommandRegistration = Or;

exports.CheckedObserver = CheckedObserver;

exports.Children = Mt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = qr;

exports.ColonPrefixedBindAttributePatternRegistration = vr;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = ne;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = fo;

exports.CustomElement = $e;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = po;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = or;

exports.DefaultBindingCommandRegistration = Rr;

exports.DefaultBindingLanguage = _r;

exports.DefaultBindingSyntax = kr;

exports.DefaultComponents = mr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = To;

exports.DefaultResources = ao;

exports.DelegateBindingCommandRegistration = Pr;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = zo;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = Go;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = br;

exports.Else = Else;

exports.ElseRegistration = Nr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Br;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = cr;

exports.FromViewBindingCommandRegistration = Sr;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Us;

exports.IAppTask = qt;

exports.IAttrMapper = rt;

exports.IAttributeParser = K;

exports.IAttributePattern = X;

exports.IAuSlotsInfo = si;

exports.IAurelia = Po;

exports.IController = ks;

exports.IDialogController = Lo;

exports.IDialogDom = Uo;

exports.IDialogDomRenderer = qo;

exports.IDialogGlobalSettings = Vo;

exports.IDialogService = Oo;

exports.IEventDelegator = ti;

exports.IEventTarget = Ms;

exports.IHistory = Zs;

exports.IHydrationContext = Cs;

exports.IInstruction = ii;

exports.ILifecycleHooks = Ke;

exports.IListenerBehaviorOptions = Ri;

exports.ILocation = Ys;

exports.INode = js;

exports.INodeObserverLocatorRegistration = pr;

exports.IPlatform = st;

exports.IProjections = ei;

exports.IRenderLocation = Ns;

exports.IRenderer = oi;

exports.IRendering = hs;

exports.ISVGAnalyzer = it;

exports.ISanitizer = rr;

exports.IShadowDOMGlobalStyles = Ne;

exports.IShadowDOMStyles = Me;

exports.ISyntaxInterpreter = H;

exports.ITemplateCompiler = ri;

exports.ITemplateCompilerHooks = dn;

exports.ITemplateCompilerRegistration = dr;

exports.ITemplateElementFactory = Zi;

exports.IViewFactory = ts;

exports.IViewLocator = ls;

exports.IWcElementRegistry = Xo;

exports.IWindow = Ks;

exports.IWorkTracker = Vs;

exports.If = If;

exports.IfRegistration = Mr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = mo;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = xo;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = go;

exports.LifecycleHooks = Je;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = ko;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = lr;

exports.OneTimeBindingCommandRegistration = Er;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = vo;

exports.RefAttributePatternRegistration = wr;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Dr;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = wo;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = Wr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = xr;

exports.SanitizeValueConverterRegistration = Fr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = io;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Ao;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Ro;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = bo;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Bo;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Cr;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = ar;

exports.StandardConfiguration = Do;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Ur;

exports.StyleConfiguration = We;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = So;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = xn;

exports.TemplateControllerRendererRegistration = yo;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = Eo;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = ur;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = hr;

exports.ToViewBindingCommandRegistration = Ir;

exports.TriggerBindingCommandRegistration = $r;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = fr;

exports.TwoWayBindingCommandRegistration = Tr;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = no;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = xt;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = jr;

exports.Views = rs;

exports.Watch = he;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = Hr;

exports.alias = N;

exports.allResources = U;

exports.applyBindingBehavior = Ci;

exports.astEvaluator = gt;

exports.attributePattern = Y;

exports.bindable = E;

exports.bindingBehavior = ht;

exports.bindingCommand = Wi;

exports.capture = qe;

exports.children = _t;

exports.coercer = $;

exports.containerless = ue;

exports.convertToRenderLocation = Gs;

exports.createElement = Qn;

exports.cssModules = _e;

exports.customAttribute = Kt;

exports.customElement = ce;

exports.getEffectiveParentNode = Hs;

exports.getRef = _s;

exports.isCustomElementController = vs;

exports.isCustomElementViewModel = ws;

exports.isInstruction = ni;

exports.isRenderLocation = Xs;

exports.lifecycleHooks = Qe;

exports.processContent = Oe;

exports.registerAliases = W;

exports.renderer = li;

exports.setEffectiveParentNode = zs;

exports.setRef = Fs;

exports.shadowCSS = Fe;

exports.strict = de;

exports.templateCompilerHooks = gn;

exports.templateController = Yt;

exports.useShadowDOM = ae;

exports.valueConverter = dt;

exports.view = os;

exports.watch = re;
//# sourceMappingURL=index.cjs.map
