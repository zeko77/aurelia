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
    if (!A(e)) return false;
    const i = e.slice(0, 5);
    return w[e] = "aria-" === i || "data-" === i || s.isStandardSvgAttribute(t, e);
};

const y = t => t instanceof Promise;

const k = t => t instanceof Array;

const C = t => "function" === typeof t;

const A = t => "string" === typeof t;

const R = Object.defineProperty;

const B = t => {
    throw t;
};

const S = Reflect.defineProperty;

const E = (t, e, s) => {
    S(t, e, {
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
        m(t.constructor, $.keyFrom(e));
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

const $ = Object.freeze({
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
                if (!h(D, t, n)) m(t, $.keyFrom(n));
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
    getAll(t) {
        const s = D.length + 1;
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
    static create(t, s, i = {}) {
        return new BindableDefinition(e.firstDefined(i.attribute, e.kebabCase(t)), e.firstDefined(i.callback, `${t}Changed`), e.firstDefined(i.mode, exports.BindingMode.toView), e.firstDefined(i.primary, false), e.firstDefined(i.property, t), e.firstDefined(i.set, L(t, s, i)));
    }
}

function P(t, e, s) {
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

function L(t, s, i = {}) {
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
            r = "function" === typeof t ? t.bind(n) : O.for(n) ?? e.noop;
            break;
        }
    }
    return r === e.noop ? r : q(r, i.nullable);
}

function q(t, e) {
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
        const l = t[i];
        const h = t.propertyChanged;
        const c = this.i = C(l);
        const a = this.u = C(h);
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

t.subscriberCollection(BindableObserver);

t.withFlushQueue(BindableObserver);

let U;

const V = function(t) {
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

const _ = e.Registration.singleton;

const F = e.Registration.aliasTo;

const j = e.Registration.instance;

const M = e.Registration.callback;

const N = e.Registration.transient;

function W(...t) {
    return function(e) {
        const s = f("aliases");
        const i = l(s, e);
        if (void 0 === i) c(s, t, e); else i.push(...t);
    };
}

function H(t, s, i, n) {
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

const z = e.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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

const K = e.DI.createInterface("IAttributePattern");

const Y = e.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, s) {
        this.U = {};
        this.V = t;
        const i = this._ = {};
        const n = s.reduce(((t, e) => {
            const s = tt(e.constructor);
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

AttributeParser.inject = [ z, e.all(K) ];

function Z(...t) {
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

const J = d("attribute-pattern");

const Q = "attribute-pattern-definitions";

const tt = t => e.Protocol.annotation.get(t, Q);

const et = Object.freeze({
    name: J,
    definitionAnnotationKey: Q,
    define(t, s) {
        const i = new AttributePatternResourceDefinition(s);
        c(J, i, s);
        p(s, J);
        e.Protocol.annotation.set(s, Q, t);
        m(s, Q);
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

exports.DotSeparatedAttributePattern = r([ Z({
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

exports.RefAttributePattern = r([ Z({
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

exports.ColonPrefixedBindAttributePattern = r([ Z({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ Z({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let st = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

st = r([ Z({
    pattern: "...$attrs",
    symbols: ""
}) ], st);

const it = e.IPlatform;

const nt = e.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function rt(t) {
    const e = g();
    let s;
    for (s of t) e[s] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.F = Object.assign(g(), {
            a: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: rt([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: g(),
            altGlyphDef: rt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: g(),
            altGlyphItem: rt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: g(),
            animate: rt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: rt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: rt([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: rt([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: rt([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: rt([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": rt([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: rt([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: rt([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: rt([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: rt([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: rt([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: rt([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: rt([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: rt([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: rt([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: rt([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: rt([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: rt([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: rt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: rt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: rt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: rt([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: rt([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: rt([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: rt([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: rt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: rt([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: rt([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: rt([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: rt([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: rt([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: rt([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: rt([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: rt([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: rt([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": rt([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": rt([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": rt([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": rt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": rt([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: rt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: rt([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: rt([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: g(),
            hkern: rt([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: rt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: rt([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: rt([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: rt([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: rt([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": rt([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: rt([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: rt([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: rt([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: rt([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: rt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: rt([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: rt([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: rt([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: rt([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: rt([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: rt([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: rt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: rt([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: rt([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: rt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: rt([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: rt([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: rt([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: rt([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.j = rt([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.M = rt([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
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
        return _(nt, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.j[t.nodeName] && true === this.M[e] || true === this.F[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ it ];

const ot = e.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

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
        return [ nt ];
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
                if (void 0 !== i[r]) throw ht(r, n);
                i[r] = s[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const s in t) {
            if (void 0 !== e[s]) throw ht(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return lt(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        return this.N[t.nodeName]?.[e] ?? this.W[e] ?? (b(t, e, this.svg) ? e : null);
    }
}

function lt(t, e) {
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

function ht(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

exports.BindingBehaviorStrategy = void 0;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(exports.BindingBehaviorStrategy || (exports.BindingBehaviorStrategy = {}));

function ct(t) {
    return function(e) {
        return dt.define(t, e);
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
        if (A(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        const r = Object.getPrototypeOf(s) === BindingInterceptor;
        return new BindingBehaviorDefinition(s, e.firstDefined(ft(s, "name"), i), e.mergeArrays(ft(s, "aliases"), n.aliases, s.aliases), dt.keyFrom(i), e.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", n, s, (() => r ? 2 : 1)));
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
        H(n, dt, i, t);
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
    handleCollectionChange(t) {
        this.binding.handleCollectionChange(t);
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

const at = [ "isBound", "$scope", "obs", "ast", "locator", "oL" ];

at.forEach((t => {
    S(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const ut = d("binding-behavior");

const ft = (t, e) => l(f(e), t);

const dt = Object.freeze({
    name: ut,
    keyFrom(t) {
        return `${ut}:${t}`;
    },
    isType(t) {
        return C(t) && h(ut, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        c(ut, s, s.Type);
        c(ut, s, s);
        p(e, ut);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(ut, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: ft
});

function pt(t) {
    return function(e) {
        return gt.define(t, e);
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
        if (A(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new ValueConverterDefinition(s, e.firstDefined(xt(s, "name"), i), e.mergeArrays(xt(s, "aliases"), n.aliases, s.aliases), gt.keyFrom(i));
    }
    register(t) {
        const {Type: s, key: i, aliases: n} = this;
        e.Registration.singleton(i, s).register(t);
        e.Registration.aliasTo(i, s).register(t);
        H(n, gt, i, t);
    }
}

const mt = d("value-converter");

const xt = (t, e) => l(f(e), t);

const gt = Object.freeze({
    name: mt,
    keyFrom: t => `${mt}:${t}`,
    isType(t) {
        return C(t) && h(mt, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        c(mt, s, s.Type);
        c(mt, s, s);
        p(e, mt);
        return s.Type;
    },
    getDefinition(t) {
        const e = l(mt, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: xt
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

function vt(t, e = true) {
    return s => {
        const i = s.prototype;
        if (null != t) S(i, "strict", {
            enumerable: true,
            get: function() {
                return t;
            }
        });
        S(i, "strictFnCall", {
            enumerable: true,
            get: function() {
                return e;
            }
        });
        E(i, "get", (function(t) {
            return this.locator.get(t);
        }));
        E(i, "getConverter", (function(t) {
            return this.locator.get(gt.keyFrom(t));
        }));
        E(i, "getBehavior", (function(t) {
            return this.locator.get(dt.keyFrom(t));
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

vt(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.H = false;
        this.o = t;
        this.G = e;
        this.X = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        this.v = t;
        this.H = t !== this.ov;
        this.K();
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
                    if (A(e) && e.includes("!important")) {
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
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            wt(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) bt(this.o, this);
    }
    flush() {
        Ct = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ct);
    }
}

t.subscriberCollection(AttributeObserver);

t.withFlushQueue(AttributeObserver);

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

const {oneTime: At, toView: Rt, fromView: Bt} = exports.BindingMode;

const St = Rt | At;

const Et = {
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
        this.Y = t;
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
        const l = 1 !== this.Y.state && (4 & o.type) > 0;
        let h = false;
        let c;
        if (10082 !== n.$kind || this.obs.count > 1) {
            h = 0 === (s & At);
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
                }), Et);
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
        if (i & St) {
            r = (i & Rt) > 0;
            n.updateTarget(this.value = e.evaluate(t, this, r ? n : null));
        }
        if (i & Bt) s.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(n)));
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

t.connectable(AttributeBinding);

vt(true)(AttributeBinding);

const {toView: It} = exports.BindingMode;

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
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.Y = t;
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
        const l = 1 !== this.Y.state && (4 & o.type) > 0;
        let h;
        if (l) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                o.setValue(n, this.target, this.targetProperty);
            }), Tt);
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

vt(true)(InterpolationBinding);

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
    handleChange(t) {
        if (!this.isBound) return;
        const e = this.ast;
        const s = this.obs;
        const i = 10082 === e.$kind && 1 === s.count;
        let n = false;
        if (!i) {
            n = (this.mode & It) > 0;
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
    handleCollectionChange(t) {
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
        this.value = this.ast.evaluate(t, this, (this.mode & It) > 0 ? this.interceptor : null);
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

t.connectable(InterpolationPartBinding);

vt(true)(InterpolationPartBinding);

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
        this.Y = t;
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
        const i = 10082 === e.$kind && 1 === s.count;
        let n = false;
        if (!i) {
            n = (this.mode & It) > 0;
            if (n) s.version++;
            t = e.evaluate(this.$scope, this, n ? this.interceptor : null);
            if (n) s.clear();
        }
        if (t === this.value) {
            this.task?.cancel();
            this.task = null;
            return;
        }
        const r = 1 !== this.Y.state;
        if (r) this.queueUpdate(t); else this.updateTarget(t);
    }
    handleCollectionChange() {
        if (!this.isBound) return;
        this.obs.version++;
        const t = this.value = this.ast.evaluate(this.$scope, this, (this.mode & It) > 0 ? this.interceptor : null);
        this.obs.clear();
        if (t instanceof Array) this.observeCollection(t);
        const e = 1 !== this.Y.state;
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
        const e = this.value = this.ast.evaluate(t, this, (this.mode & It) > 0 ? this.interceptor : null);
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
        }), Tt);
        e?.cancel();
    }
}

t.connectable()(ContentBinding);

vt(void 0, false)(ContentBinding);

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
        this.Z = n;
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
        this.target = this.Z ? t.bindingContext : t.overrideContext;
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

t.connectable(LetBinding);

vt(true)(LetBinding);

const {oneTime: Dt, toView: $t, fromView: Pt} = exports.BindingMode;

const Ot = $t | Dt;

const Lt = {
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
        this.Y = t;
        this.J = i;
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
        const s = 1 !== this.Y.state && (4 & this.targetObserver.type) > 0;
        const i = this.obs;
        let n = false;
        if (10082 !== this.ast.$kind || i.count > 1) {
            n = this.mode > Dt;
            if (n) i.version++;
            t = this.ast.evaluate(this.$scope, this, this.interceptor);
            if (n) i.clear();
        }
        if (s) {
            qt = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(t);
                this.task = null;
            }), Lt);
            qt?.cancel();
            qt = null;
        } else this.interceptor.updateTarget(t);
    }
    handleCollectionChange(t) {
        if (!this.isBound) return;
        const e = 1 !== this.Y.state && (4 & this.targetObserver.type) > 0;
        this.obs.version++;
        const s = this.ast.evaluate(this.$scope, this, this.interceptor);
        this.obs.clear();
        if (e) {
            qt = this.task;
            this.task = this.J.queueTask((() => {
                this.interceptor.updateTarget(s);
                this.task = null;
            }), Lt);
            qt?.cancel();
            qt = null;
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
            if (i & Pt) n = s.getObserver(this.target, this.targetProperty); else n = s.getAccessor(this.target, this.targetProperty);
            this.targetObserver = n;
        }
        e = this.ast;
        const r = this.interceptor;
        const o = (i & $t) > 0;
        if (i & Ot) r.updateTarget(e.evaluate(t, this, o ? r : null));
        if (i & Pt) {
            n.subscribe(this.targetSubscriber ?? (this.targetSubscriber = new BindingTargetSubscriber(r)));
            if (!o) r.updateSource(n.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
        this.$scope = void 0;
        qt = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != qt) {
            qt.cancel();
            qt = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(PropertyBinding);

vt(true, false)(PropertyBinding);

let qt = null;

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

const Ut = e.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(j(Ut, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Vt = Object.freeze({
    creating: _t("creating"),
    hydrating: _t("hydrating"),
    hydrated: _t("hydrated"),
    activating: _t("activating"),
    activated: _t("activated"),
    deactivating: _t("deactivating"),
    deactivated: _t("deactivated")
});

function _t(t) {
    function e(e, s) {
        if (C(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function Ft(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        c(Mt, ChildrenDefinition.create(e, s), t.constructor, e);
        m(t.constructor, Nt.keyFrom(e));
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

function jt(t) {
    return t.startsWith(Mt);
}

const Mt = f("children-observer");

const Nt = Object.freeze({
    name: Mt,
    keyFrom: t => `${Mt}:${t}`,
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
        const s = Mt.length + 1;
        const i = [];
        const n = e.getPrototypeChain(t);
        let r = n.length;
        let o = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = x(a).filter(jt);
            c = h.length;
            for (let t = 0; t < c; ++t) i[o++] = l(Mt, a, h[t].slice(s));
        }
        return i;
    }
});

const Wt = {
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
        return new ChildrenDefinition(e.firstDefined(s.callback, `${t}Changed`), e.firstDefined(s.property, t), s.options ?? Wt, s.query, s.filter, s.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = Ht, r = zt, o = Gt, l) {
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
        this.subs.notify(this.children, void 0);
    }
    get() {
        return Kt(this.controller, this.query, this.filter, this.map);
    }
}

t.subscriberCollection()(ChildrenObserver);

function Ht(t) {
    return t.host.childNodes;
}

function zt(t, e, s) {
    return !!s;
}

function Gt(t, e, s) {
    return s;
}

const Xt = {
    optional: true
};

function Kt(t, e, s, i) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = Ee(l, Xt);
        c = h?.viewModel ?? null;
        if (s(l, h, c)) o.push(i(l, h, c));
    }
    return o;
}

function Yt(t) {
    return function(e) {
        return ie(t, e);
    };
}

function Zt(t) {
    return function(e) {
        return ie(A(t) ? {
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
        if (A(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(s, e.firstDefined(te(s, "name"), i), e.mergeArrays(te(s, "aliases"), n.aliases, s.aliases), Qt(i), e.firstDefined(te(s, "defaultBindingMode"), n.defaultBindingMode, s.defaultBindingMode, exports.BindingMode.toView), e.firstDefined(te(s, "isTemplateController"), n.isTemplateController, s.isTemplateController, false), $.from(s, ...$.getAll(s), te(s, "bindables"), s.bindables, n.bindables), e.firstDefined(te(s, "noMultiBindings"), n.noMultiBindings, s.noMultiBindings, false), e.mergeArrays(ce.getAnnotation(s), s.watches), e.mergeArrays(te(s, "dependencies"), n.dependencies, s.dependencies));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        N(s, e).register(t);
        F(s, e).register(t);
        H(i, re, s, t);
    }
}

const Jt = d("custom-attribute");

const Qt = t => `${Jt}:${t}`;

const te = (t, e) => l(f(e), t);

const ee = t => C(t) && h(Jt, t);

const se = (t, e) => Fs(t, Qt(e)) ?? void 0;

const ie = (t, e) => {
    const s = CustomAttributeDefinition.create(t, e);
    c(Jt, s, s.Type);
    c(Jt, s, s);
    p(e, Jt);
    return s.Type;
};

const ne = t => {
    const e = l(Jt, t);
    if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
    return e;
};

const re = Object.freeze({
    name: Jt,
    keyFrom: Qt,
    isType: ee,
    for: se,
    define: ie,
    getDefinition: ne,
    annotate(t, e, s) {
        c(f(e), s, t);
    },
    getAnnotation: te
});

function oe(t, e) {
    if (null == t) throw new Error(`AUR0772`);
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!C(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!C(r?.value)) throw new Error(`AUR0774:${String(n)}`);
        ce.add(l, h);
        if (ee(l)) ne(l).watches.push(h);
        if (Se(l)) Te(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const le = e.emptyArray;

const he = f("watch");

const ce = Object.freeze({
    name: he,
    add(t, e) {
        let s = l(he, t);
        if (null == s) c(he, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        return l(he, t) ?? le;
    }
});

function ae(t) {
    return function(e) {
        return Be(t, e);
    };
}

function ue(t) {
    if (void 0 === t) return function(t) {
        Re(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!C(t)) return function(e) {
        Re(e, "shadowOptions", t);
    };
    Re(t, "shadowOptions", {
        mode: "open"
    });
}

function fe(t) {
    if (void 0 === t) return function(t) {
        de(t);
    };
    de(t);
}

function de(t) {
    const e = l(ke, t);
    if (void 0 === e) {
        Re(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function pe(t) {
    if (void 0 === t) return function(t) {
        Re(t, "isStrictBinding", true);
    };
    Re(t, "isStrictBinding", true);
}

const me = new WeakMap;

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
            if (A(i)) throw new Error(`AUR0761:${t}`);
            const n = e.fromDefinitionOrDefault("name", i, Ae);
            if (C(i.Type)) s = i.Type; else s = $e(e.pascalCase(n));
            return new CustomElementDefinition(s, n, e.mergeArrays(i.aliases), e.fromDefinitionOrDefault("key", i, (() => Ce(n))), e.fromDefinitionOrDefault("cache", i, ge), e.fromDefinitionOrDefault("capture", i, we), e.fromDefinitionOrDefault("template", i, ve), e.mergeArrays(i.instructions), e.mergeArrays(i.dependencies), e.fromDefinitionOrDefault("injectable", i, ve), e.fromDefinitionOrDefault("needsCompile", i, be), e.mergeArrays(i.surrogates), $.from(s, i.bindables), Nt.from(i.childrenObservers), e.fromDefinitionOrDefault("containerless", i, we), e.fromDefinitionOrDefault("isStrictBinding", i, we), e.fromDefinitionOrDefault("shadowOptions", i, ve), e.fromDefinitionOrDefault("hasSlots", i, we), e.fromDefinitionOrDefault("enhance", i, we), e.fromDefinitionOrDefault("watches", i, ye), e.fromAnnotationOrTypeOrDefault("processContent", s, ve));
        }
        if (A(t)) return new CustomElementDefinition(s, t, e.mergeArrays(Ie(s, "aliases"), s.aliases), Ce(t), e.fromAnnotationOrTypeOrDefault("cache", s, ge), e.fromAnnotationOrTypeOrDefault("capture", s, we), e.fromAnnotationOrTypeOrDefault("template", s, ve), e.mergeArrays(Ie(s, "instructions"), s.instructions), e.mergeArrays(Ie(s, "dependencies"), s.dependencies), e.fromAnnotationOrTypeOrDefault("injectable", s, ve), e.fromAnnotationOrTypeOrDefault("needsCompile", s, be), e.mergeArrays(Ie(s, "surrogates"), s.surrogates), $.from(s, ...$.getAll(s), Ie(s, "bindables"), s.bindables), Nt.from(...Nt.getAll(s), Ie(s, "childrenObservers"), s.childrenObservers), e.fromAnnotationOrTypeOrDefault("containerless", s, we), e.fromAnnotationOrTypeOrDefault("isStrictBinding", s, we), e.fromAnnotationOrTypeOrDefault("shadowOptions", s, ve), e.fromAnnotationOrTypeOrDefault("hasSlots", s, we), e.fromAnnotationOrTypeOrDefault("enhance", s, we), e.mergeArrays(ce.getAnnotation(s), s.watches), e.fromAnnotationOrTypeOrDefault("processContent", s, ve));
        const i = e.fromDefinitionOrDefault("name", t, Ae);
        return new CustomElementDefinition(s, i, e.mergeArrays(Ie(s, "aliases"), t.aliases, s.aliases), Ce(i), e.fromAnnotationOrDefinitionOrTypeOrDefault("cache", t, s, ge), e.fromAnnotationOrDefinitionOrTypeOrDefault("capture", t, s, we), e.fromAnnotationOrDefinitionOrTypeOrDefault("template", t, s, ve), e.mergeArrays(Ie(s, "instructions"), t.instructions, s.instructions), e.mergeArrays(Ie(s, "dependencies"), t.dependencies, s.dependencies), e.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", t, s, ve), e.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", t, s, be), e.mergeArrays(Ie(s, "surrogates"), t.surrogates, s.surrogates), $.from(s, ...$.getAll(s), Ie(s, "bindables"), s.bindables, t.bindables), Nt.from(...Nt.getAll(s), Ie(s, "childrenObservers"), s.childrenObservers, t.childrenObservers), e.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", t, s, we), e.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", t, s, we), e.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", t, s, ve), e.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", t, s, we), e.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", t, s, we), e.mergeArrays(t.watches, ce.getAnnotation(s), s.watches), e.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", t, s, ve));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (me.has(t)) return me.get(t);
        const e = CustomElementDefinition.create(t);
        me.set(t, e);
        c(ke, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        if (!t.has(s, false)) {
            N(s, e).register(t);
            F(s, e).register(t);
            H(i, Pe, s, t);
        }
    }
}

const xe = {
    name: void 0,
    searchParents: false,
    optional: false
};

const ge = () => 0;

const ve = () => null;

const we = () => false;

const be = () => true;

const ye = () => e.emptyArray;

const ke = d("custom-element");

const Ce = t => `${ke}:${t}`;

const Ae = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Re = (t, e, s) => {
    c(f(e), s, t);
};

const Be = (t, e) => {
    const s = CustomElementDefinition.create(t, e);
    c(ke, s, s.Type);
    c(ke, s, s);
    p(s.Type, ke);
    return s.Type;
};

const Se = t => C(t) && h(ke, t);

const Ee = (t, e = xe) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const s = Fs(t, ke);
        if (null === s) {
            if (true === e.optional) return null;
            throw new Error(`AUR0762`);
        }
        return s;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const s = Fs(t, ke);
            if (null === s) throw new Error(`AUR0763`);
            if (s.is(e.name)) return s;
            return;
        }
        let s = t;
        let i = false;
        while (null !== s) {
            const t = Fs(s, ke);
            if (null !== t) {
                i = true;
                if (t.is(e.name)) return t;
            }
            s = zs(s);
        }
        if (i) return;
        throw new Error(`AUR0764`);
    }
    let s = t;
    while (null !== s) {
        const t = Fs(s, ke);
        if (null !== t) return t;
        s = zs(s);
    }
    throw new Error(`AUR0765`);
};

const Ie = (t, e) => l(f(e), t);

const Te = t => {
    const e = l(ke, t);
    if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
    return e;
};

const De = () => {
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

const $e = function() {
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

const Pe = Object.freeze({
    name: ke,
    keyFrom: Ce,
    isType: Se,
    for: Ee,
    define: Be,
    getDefinition: Te,
    annotate: Re,
    getAnnotation: Ie,
    generateName: Ae,
    createInjectable: De,
    generateType: $e
});

const Oe = f("processContent");

function Le(t) {
    return void 0 === t ? function(t, e, s) {
        c(Oe, qe(t, e), t);
    } : function(e) {
        t = qe(e, t);
        const s = l(ke, e);
        if (void 0 !== s) s.processContent = t; else c(Oe, t, e);
        return e;
    };
}

function qe(t, e) {
    if (A(e)) e = t[e];
    if (!C(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

function Ue(t) {
    return function(e) {
        const s = C(t) ? t : true;
        Re(e, "capture", s);
        if (Se(e)) Te(e).capture = s;
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
    setValue(t) {
        this.value = t;
        this.H = t !== this.ov;
        this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.et;
            const s = Ve(t);
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

function Ve(t) {
    if (A(t)) return _e(t);
    if ("object" !== typeof t) return e.emptyArray;
    if (t instanceof Array) {
        const s = t.length;
        if (s > 0) {
            const e = [];
            let i = 0;
            for (;s > i; ++i) e.push(...Ve(t[i]));
            return e;
        } else return e.emptyArray;
    }
    const s = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) s.push(..._e(i)); else s.push(i);
    return s;
}

function _e(t) {
    const s = t.match(/\S+/g);
    if (null === s) return e.emptyArray;
    return s;
}

function Fe(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = ie({
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
                this.element.className = Ve(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ Ms ], e));
        t.register(i);
    }
}

function je(...t) {
    return new ShadowDOMRegistry(t);
}

const Me = e.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(it))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(We);
        const s = t.get(Me);
        t.register(j(Ne, s.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ it ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ it ];

const Ne = e.DI.createInterface("IShadowDOMStyles");

const We = e.DI.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
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

const He = {
    shadowDOM(t) {
        return Vt.creating(e.IContainer, (e => {
            if (null != t.sharedStyles) {
                const s = e.get(Me);
                e.register(j(We, s.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ze, exit: Ge} = t.ConnectableSwitcher;

const {wrap: Xe, unwrap: Ke} = t.ProxyObservable;

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
            ze(this);
            return this.value = Ke(this.$get.call(void 0, this.useProxy ? Xe(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Ge(this);
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

vt(true)(ComputedWatcher);

t.connectable(ExpressionWatcher);

vt(true)(ExpressionWatcher);

const Ye = e.DI.createInterface("ILifecycleHooks");

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
        _(Ye, this.Type).register(t);
    }
}

const Ze = new WeakMap;

const Je = f("lifecycle-hooks");

const Qe = Object.freeze({
    name: Je,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        c(Je, s, e);
        p(e, Je);
        return s.Type;
    },
    resolve(t) {
        let e = Ze.get(t);
        if (void 0 === e) {
            Ze.set(t, e = new LifecycleHooksLookupImpl);
            const s = t.root;
            const i = s.id === t.id ? t.getAll(Ye) : t.has(Ye, false) ? s.getAll(Ye).concat(t.getAll(Ye)) : s.getAll(Ye);
            let n;
            let r;
            let o;
            let h;
            let c;
            for (n of i) {
                r = l(Je, n.constructor);
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

function ts() {
    return function t(e) {
        return Qe.define({}, e);
    };
}

const es = e.DI.createInterface("IViewFactory");

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

const ss = new WeakSet;

function is(t) {
    return !ss.has(t);
}

function ns(t) {
    ss.add(t);
    return CustomElementDefinition.create(t);
}

const rs = d("views");

const os = Object.freeze({
    name: rs,
    has(t) {
        return C(t) && (h(rs, t) || "$views" in t);
    },
    get(t) {
        if (C(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(is).map(ns);
            for (const e of s) os.add(t, e);
        }
        let e = l(rs, t);
        if (void 0 === e) c(rs, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = l(rs, t);
        if (void 0 === i) c(rs, i = [ s ], t); else i.push(s);
        return i;
    }
});

function ls(t) {
    return function(e) {
        os.add(e, t);
    };
}

const hs = e.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.nt = new WeakMap;
        this.rt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = os.has(t.constructor) ? os.get(t.constructor) : [];
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
            n = Be(Te(r), class extends r {
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
            r = Be(this.ct(s, i), class {
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

const cs = e.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ut = new WeakMap;
        this.ft = new WeakMap;
        this.dt = (this.xt = t.root).get(it);
        this.gt = new FragmentNodeSequence(this.dt, this.dt.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.xt.getAll(li, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), g()) : this.rs;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.ut;
            const n = e.get(oi);
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
                if (A(r)) o.innerHTML = r;
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

var as;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(as || (as = {}));

const us = {
    optional: true
};

const fs = new WeakMap;

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
        this.r = t.root.get(cs);
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
        return fs.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, s, i, n, r = void 0, o = null) {
        if (fs.has(s)) return fs.get(s);
        r = r ?? Te(s.constructor);
        const l = new Controller(t, 0, r, null, s, i, o);
        const h = t.get(e.optional(As));
        if (r.dependencies.length > 0) t.register(...r.dependencies);
        t.registerResolver(As, new e.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        fs.set(s, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, s, i) {
        if (fs.has(e)) return fs.get(e);
        i = i ?? ne(e.constructor);
        const n = new Controller(t, 1, i, null, e, s, null);
        if (i.dependencies.length > 0) t.register(...i.dependencies);
        fs.set(e, n);
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
        if (l.watches.length > 0) vs(this, n, l, o);
        ps(this, l, r, o);
        this.wt = ms(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, i, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = Qe.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new e.InstanceProvider("definition.injectable", o));
        if (null == s || false !== s.hydrate) {
            this.hS(s);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.lifecycleHooks.hydrating) this.lifecycleHooks.hydrating.forEach(Ss, this);
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = i;
        if (null !== (this.hostController = Ee(this.host, us))) {
            this.host = this.container.root.get(it).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Xs(this.host);
        }
        js(this.host, ke, this);
        js(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (null != o) throw new Error(`AUR0501`);
            js(this.shadowRoot = this.host.attachShadow(s ?? ys), ke, this);
            js(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            js(o, ke, this);
            js(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.lifecycleHooks.hydrated) this.lifecycleHooks.hydrated.forEach(Es, this);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Rt, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Bs, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    Ct() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) vs(this, this.container, t, e);
        ps(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = Qe.resolve(this.container);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Bs, this);
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
            throw new Error(`AUR0503:${this.name} ${ks(this.state)}`);
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
        this.$initiator = t;
        this.$flags = i;
        this.Bt();
        let r;
        if (2 !== this.vmKind && null != this.lifecycleHooks.binding) r = e.resolveAll(...this.lifecycleHooks.binding.map(Is, this));
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
                this.bindings[t].$bind(this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.lifecycleHooks.bound) i = e.resolveAll(...this.lifecycleHooks.bound.map(Ts, this));
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
                const e = t.has(Ne, false) ? t.get(Ne) : t.get(We);
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
        if (2 !== this.vmKind && null != this.lifecycleHooks.attaching) s = e.resolveAll(...this.lifecycleHooks.attaching.map(Ds, this));
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
            throw new Error(`AUR0505:${this.name} ${ks(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.$t();
        let n = 0;
        let r;
        if (this.wt.length) for (;n < this.wt.length; ++n) this.wt[n].stop();
        if (null !== this.children) for (n = 0; n < this.children.length; ++n) void this.children[n].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.lifecycleHooks.detaching) r = e.resolveAll(...this.lifecycleHooks.detaching.map(Ps, this));
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
            Ls = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ls();
            Ls = void 0;
        }
    }
    Et(t) {
        if (void 0 !== this.$promise) {
            qs = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            qs(t);
            qs = void 0;
        }
        if (this.$initiator !== this) this.parent.Et(t);
    }
    Bt() {
        ++this.bt;
        if (this.$initiator !== this) this.parent.Bt();
    }
    Dt() {
        if (0 === --this.bt) {
            if (2 !== this.vmKind && null != this.lifecycleHooks.attached) Us = e.resolveAll(...this.lifecycleHooks.attached.map($s, this));
            if (this.hooks.hasAttached) Us = e.resolveAll(Us, this.viewModel.attached(this.$initiator, this.$flags));
            if (y(Us)) {
                this.St();
                Us.then((() => {
                    this.state = 2;
                    this.Ot();
                    if (this.$initiator !== this) this.parent.Dt();
                })).catch((t => {
                    this.Et(t);
                }));
                Us = void 0;
                return;
            }
            Us = void 0;
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
                if (2 !== t.vmKind && null != t.lifecycleHooks.unbinding) s = e.resolveAll(...t.lifecycleHooks.unbinding.map(Os, this));
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
            return ne(this.viewModel.constructor).name === t;

          case 0:
            return Te(this.viewModel.constructor).name === t;

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
            js(t, ke, this);
            js(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            js(t, ke, this);
            js(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            js(t, ke, this);
            js(t, this.definition.key, this);
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
            this.children.forEach(Rs);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            fs.delete(this.viewModel);
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

function ds(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function ps(e, s, i, n) {
    const r = s.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let s;
        let i;
        let h = 0;
        const c = ds(n);
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

function ms(t, s, i) {
    const n = s.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const e = ds(i);
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

const xs = new Map;

const gs = e => {
    let s = xs.get(e);
    if (null == s) {
        s = new t.AccessScopeExpression(e, 0);
        xs.set(e, s);
    }
    return s;
};

function vs(e, s, i, n) {
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
        u = C(u) ? u : Reflect.get(n, u);
        if (!C(u)) throw new Error(`AUR0506:${String(u)}`);
        if (C(a)) e.addBinding(new ComputedWatcher(n, r, a, u, true)); else {
            f = A(a) ? o.parse(a, 8) : gs(a);
            e.addBinding(new ExpressionWatcher(h, s, r, f, u));
        }
    }
}

function ws(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function bs(t) {
    return s.isObject(t) && Se(t.constructor);
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

const ys = {
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

function ks(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Cs = e.DI.createInterface("IController");

const As = e.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function Rs(t) {
    t.dispose();
}

function Bs(t) {
    t.instance.created(this.viewModel, this);
}

function Ss(t) {
    t.instance.hydrating(this.viewModel, this);
}

function Es(t) {
    t.instance.hydrated(this.viewModel, this);
}

function Is(t) {
    return t.instance.binding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ts(t) {
    return t.instance.bound(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Ds(t) {
    return t.instance.attaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function $s(t) {
    return t.instance.attached(this.viewModel, this["$initiator"], this["$flags"]);
}

function Ps(t) {
    return t.instance.detaching(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

function Os(t) {
    return t.instance.unbinding(this.viewModel, this["$initiator"], this.parent, this["$flags"]);
}

let Ls;

let qs;

let Us;

const Vs = e.DI.createInterface("IAppRoot");

const _s = e.DI.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

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
        this.work = i.get(_s);
        n.prepare(this);
        i.registerResolver(s.HTMLElement, i.registerResolver(s.Element, i.registerResolver(Ms, new e.InstanceProvider("ElementResolver", t.host))));
        this.Ft = e.onResolve(this.jt("creating"), (() => {
            const s = t.component;
            const n = i.createChild();
            let r;
            if (Se(s)) r = this.container.get(s); else r = t.component;
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
        return e.onResolve(this.Ft, (() => e.onResolve(this.jt("activating"), (() => e.onResolve(this.controller.activate(this.controller, null, 1, void 0), (() => this.jt("activated")))))));
    }
    deactivate() {
        return e.onResolve(this.jt("deactivating"), (() => e.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.jt("deactivated")))));
    }
    jt(t) {
        return e.resolveAll(...this.container.getAll(Ut).reduce(((e, s) => {
            if (s.slot === t) e.push(s.run());
            return e;
        }), []));
    }
    dispose() {
        this.controller?.dispose();
    }
}

class Refs {}

function Fs(t, e) {
    return t.$au?.[e] ?? null;
}

function js(t, e, s) {
    var i;
    ((i = t).$au ?? (i.$au = new Refs))[e] = s;
}

const Ms = e.DI.createInterface("INode");

const Ns = e.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Vs, true)) return t.get(Vs).host;
    return t.get(it).document;
}))));

const Ws = e.DI.createInterface("IRenderLocation");

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

const Hs = new WeakMap;

function zs(t) {
    if (Hs.has(t)) return Hs.get(t);
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
        const e = Ee(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return zs(e.host);
    }
    return t.parentNode;
}

function Gs(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) Hs.set(s[t], e);
    } else Hs.set(t, e);
}

function Xs(t) {
    if (Ks(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function Ks(t) {
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
            if ("AU-M" === r.nodeName) o[i] = Xs(r); else o[i] = r;
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
        if (Ks(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Ys = e.DI.createInterface("IWindow", (t => t.callback((t => t.get(it).window))));

const Zs = e.DI.createInterface("ILocation", (t => t.callback((t => t.get(Ys).location))));

const Js = e.DI.createInterface("IHistory", (t => t.callback((t => t.get(Ys).history))));

const Qs = {
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
            if (!C(s)) throw new Error(`Handler of "${this.targetEvent}" event is not a function.`);
            s = s(t);
        }
        if (true !== s && this.Mt.prevent) t.preventDefault();
        return s;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind();
        }
        this.$scope = e;
        const s = this.ast;
        if (s.hasBind) s.bind(e, this.interceptor);
        if (this.Mt.strategy === t.DelegationStrategy.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Ns), this.target, this.targetEvent, this, Qs[this.Mt.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.$scope, this.interceptor);
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
    handleChange(t, e) {
        return;
    }
}

vt(true, true)(Listener);

const ti = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = ti) {
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
            if (C(n)) n(t); else n.handleEvent(t);
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

const ei = e.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

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

const si = e.DI.createInterface("IProjections");

const ii = e.DI.createInterface("IAuSlotsInfo");

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

const ni = e.DI.createInterface("Instruction");

function ri(t) {
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

const oi = e.DI.createInterface("ITemplateCompiler");

const li = e.DI.createInterface("IRenderer");

function hi(t) {
    return function e(s) {
        s.register = function(t) {
            _(li, this).register(t);
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

function ci(t, e, s) {
    if (A(e)) return t.parse(e, s);
    return e;
}

function ai(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function ui(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Ee(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return Ee(t).viewModel;

      default:
        {
            const s = se(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = Ee(t, {
                name: e
            });
            if (void 0 === i) throw new Error(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let fi = class SetPropertyRenderer {
    render(t, e, s) {
        const i = ai(e);
        if (void 0 !== i.$observers && void 0 !== i.$observers[s.to]) i.$observers[s.to].setValue(s.value); else i[s.to] = s.value;
    }
};

fi = r([ hi("re") ], fi);

let di = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ cs, it ];
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
            n = a.find(Pe, h);
            if (null == n) throw new Error(`AUR0752:${h}@${t["name"]}`);
            break;

          default:
            n = h;
        }
        const u = i.containerless || n.containerless;
        const f = u ? Xs(s) : null;
        const d = Fi(this.p, t, s, i, f, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        r = n.Type;
        o = d.invoke(r);
        d.registerResolver(r, new e.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, s, i, n, f);
        js(s, n.key, l);
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

di = r([ hi("ra") ], di);

let pi = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ cs, it ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(re, s.res);
            if (null == n) throw new Error(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = ji(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        js(e, n.key, o);
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

pi = r([ hi("rb") ], pi);

let mi = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ cs, it ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(re, s.res);
            if (null == n) throw new Error(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = this.r.getViewFactory(s.def, i);
        const o = Xs(e);
        const l = ji(this.p, n, t, e, s, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        js(o, n.key, h);
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

mi = r([ hi("rc") ], mi);

let xi = class LetElementRenderer {
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
            h = ci(this.ep, l.from, 8);
            c = new LetBinding(r, this.oL, h, l.to, n);
            t.addBinding(38963 === h.$kind ? Ai(c, h, r) : c);
            ++a;
        }
    }
};

xi.inject = [ t.IExpressionParser, t.IObserverLocator ];

xi = r([ hi("rd") ], xi);

let gi = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 8 | 4);
        const n = new CallBinding(t.container, this.oL, i, ai(e), s.to);
        t.addBinding(38963 === i.$kind ? Ai(n, i, t.container) : n);
    }
};

gi.inject = [ t.IExpressionParser, t.IObserverLocator ];

gi = r([ hi("rh") ], gi);

let vi = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 8);
        const n = new RefBinding(t.container, i, ui(e, s.to));
        t.addBinding(38963 === i.$kind ? Ai(n, i, t.container) : n);
    }
};

vi.inject = [ t.IExpressionParser ];

vi = r([ hi("rj") ], vi);

let wi = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = ci(this.ep, s.from, 1);
        const r = new InterpolationBinding(t, i, this.oL, this.p.domWriteQueue, n, ai(e), s.to, exports.BindingMode.toView);
        const o = r.partBindings;
        const l = o.length;
        let h = 0;
        let c;
        for (;l > h; ++h) {
            c = o[h];
            if (38963 === c.ast.$kind) o[h] = Ai(c, c.ast, i);
        }
        t.addBinding(r);
    }
};

wi.inject = [ t.IExpressionParser, t.IObserverLocator, it ];

wi = r([ hi("rf") ], wi);

let bi = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ai(e), s.to, s.mode);
        t.addBinding(38963 === i.$kind ? Ai(n, i, t.container) : n);
    }
};

bi.inject = [ t.IExpressionParser, t.IObserverLocator, it ];

bi = r([ hi("rg") ], bi);

let yi = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 2);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, ai(e), s.to, exports.BindingMode.toView);
        t.addBinding(38963 === i.iterable.$kind ? Ai(n, i.iterable, t.container) : n);
    }
};

yi.inject = [ t.IExpressionParser, t.IObserverLocator, it ];

yi = r([ hi("rk") ], yi);

let ki = 0;

const Ci = [];

function Ai(e, s, i) {
    while (s instanceof t.BindingBehaviorExpression) {
        Ci[ki++] = s;
        s = s.expression;
    }
    while (ki > 0) {
        const t = Ci[--ki];
        const s = i.get(dt.keyFrom(t.name));
        if (s instanceof BindingBehaviorFactory) e = s.construct(e, t);
    }
    Ci.length = 0;
    return e;
}

let Ri = class TextBindingRenderer {
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
        const l = ci(this.ep, s.from, 1);
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
            t.addBinding(38963 === p.$kind ? Ai(d, p, i) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Ri.inject = [ t.IExpressionParser, t.IObserverLocator, it ];

Ri = r([ hi("ha") ], Ri);

const Bi = e.DI.createInterface("IListenerBehaviorOptions", (t => t.singleton(ListenerBehaviorOptions)));

class ListenerBehaviorOptions {
    constructor() {
        this.expAsHandler = false;
    }
}

let Si = class ListenerBindingRenderer {
    constructor(t, e, s, i) {
        this.ep = t;
        this.te = e;
        this.p = s;
        this.ee = i;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 4);
        const n = new Listener(t.container, i, e, s.to, this.te, new ListenerOptions(s.preventDefault, s.strategy, this.ee.expAsHandler));
        t.addBinding(38963 === i.$kind ? Ai(n, i, t.container) : n);
    }
};

Si.inject = [ t.IExpressionParser, ei, it, Bi ];

Si = r([ hi("hb") ], Si);

let Ei = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

Ei = r([ hi("he") ], Ei);

let Ii = class SetClassAttributeRenderer {
    render(t, e, s) {
        Oi(e.classList, s.value);
    }
};

Ii = r([ hi("hf") ], Ii);

let Ti = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

Ti = r([ hi("hg") ], Ti);

let Di = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 8);
        const n = new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e.style, s.to, exports.BindingMode.toView);
        t.addBinding(38963 === i.$kind ? Ai(n, i, t.container) : n);
    }
};

Di.inject = [ t.IExpressionParser, t.IObserverLocator, it ];

Di = r([ hi("hd") ], Di);

let $i = class AttributeBindingRenderer {
    constructor(t, e, s) {
        this.p = t;
        this.ep = e;
        this.oL = s;
    }
    render(t, e, s) {
        const i = ci(this.ep, s.from, 8);
        const n = new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, i, e, s.attr, s.to, exports.BindingMode.toView);
        t.addBinding(38963 === i.$kind ? Ai(n, i, t.container) : n);
    }
};

$i.inject = [ it, t.IExpressionParser, t.IObserverLocator ];

$i = r([ hi("hc") ], $i);

let Pi = class SpreadRenderer {
    constructor(t, e) {
        this.se = t;
        this.r = e;
    }
    static get inject() {
        return [ oi, cs ];
    }
    render(t, s, i) {
        const n = t.container;
        const r = n.get(As);
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
            const r = Li(n);
            const c = this.se.compileSpread(n.controller.definition, n.instruction?.captures ?? e.emptyArray, n.controller.container, s);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[a.instructions.type].render(r, Ee(s), a.instructions);
                break;

              default:
                o[a.type].render(r, s, a);
            }
            t.addBinding(r);
        };
        h(0);
    }
};

Pi = r([ hi("hs") ], Pi);

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
    $bind(t) {
        if (this.isBound) return;
        this.isBound = true;
        const e = this.$scope = this.ne.controller.scope.parentScope ?? void 0;
        if (null == e) throw new Error("Invalid spreading. Context scope is null/undefined");
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
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Oi(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const Li = t => new SpreadBinding([], t);

const qi = "IController";

const Ui = "IInstruction";

const Vi = "IRenderLocation";

const _i = "IAuSlotsInfo";

function Fi(t, s, i, n, r, o) {
    const l = s.container.createChild();
    l.registerResolver(t.HTMLElement, l.registerResolver(t.Element, l.registerResolver(Ms, new e.InstanceProvider("ElementResolver", i))));
    l.registerResolver(Cs, new e.InstanceProvider(qi, s));
    l.registerResolver(ni, new e.InstanceProvider(Ui, n));
    l.registerResolver(Ws, null == r ? Mi : new RenderLocationProvider(r));
    l.registerResolver(es, Ni);
    l.registerResolver(ii, null == o ? Wi : new e.InstanceProvider(_i, o));
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

function ji(t, s, i, n, r, o, l, h) {
    const c = i.container.createChild();
    c.registerResolver(t.HTMLElement, c.registerResolver(t.Element, c.registerResolver(Ms, new e.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    c.registerResolver(Cs, new e.InstanceProvider(qi, i));
    c.registerResolver(ni, new e.InstanceProvider(Ui, r));
    c.registerResolver(Ws, null == l ? Mi : new e.InstanceProvider(Vi, l));
    c.registerResolver(es, null == o ? Ni : new ViewFactoryProvider(o));
    c.registerResolver(ii, null == h ? Wi : new e.InstanceProvider(_i, h));
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

const Mi = new RenderLocationProvider(null);

const Ni = new ViewFactoryProvider(null);

const Wi = new e.InstanceProvider(_i, new AuSlotsInfo(e.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Hi(t) {
    return function(e) {
        return Ki.define(t, e);
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
        if (A(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new BindingCommandDefinition(s, e.firstDefined(Xi(s, "name"), i), e.mergeArrays(Xi(s, "aliases"), n.aliases, s.aliases), Gi(i), e.firstDefined(Xi(s, "type"), n.type, s.type, null));
    }
    register(t) {
        const {Type: e, key: s, aliases: i} = this;
        _(s, e).register(t);
        F(s, e).register(t);
        H(i, Ki, s, t);
    }
}

const zi = d("binding-command");

const Gi = t => `${zi}:${t}`;

const Xi = (t, e) => l(f(e), t);

const Ki = Object.freeze({
    name: zi,
    keyFrom: Gi,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        c(zi, s, s.Type);
        c(zi, s, s);
        p(e, zi);
        return s.Type;
    },
    getAnnotation: Xi
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

exports.OneTimeBindingCommand.inject = [ ot, t.IExpressionParser ];

exports.OneTimeBindingCommand = r([ Hi("one-time") ], exports.OneTimeBindingCommand);

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

exports.ToViewBindingCommand.inject = [ ot, t.IExpressionParser ];

exports.ToViewBindingCommand = r([ Hi("to-view") ], exports.ToViewBindingCommand);

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

exports.FromViewBindingCommand.inject = [ ot, t.IExpressionParser ];

exports.FromViewBindingCommand = r([ Hi("from-view") ], exports.FromViewBindingCommand);

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

exports.TwoWayBindingCommand.inject = [ ot, t.IExpressionParser ];

exports.TwoWayBindingCommand = r([ Hi("two-way") ], exports.TwoWayBindingCommand);

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

exports.DefaultBindingCommand.inject = [ ot, t.IExpressionParser ];

exports.DefaultBindingCommand = r([ Hi("bind") ], exports.DefaultBindingCommand);

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

exports.CallBindingCommand = r([ Hi("call") ], exports.CallBindingCommand);

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

exports.ForBindingCommand = r([ Hi("for") ], exports.ForBindingCommand);

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

exports.TriggerBindingCommand = r([ Hi("trigger") ], exports.TriggerBindingCommand);

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

exports.DelegateBindingCommand = r([ Hi("delegate") ], exports.DelegateBindingCommand);

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

exports.CaptureBindingCommand = r([ Hi("capture") ], exports.CaptureBindingCommand);

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

exports.AttrBindingCommand = r([ Hi("attr") ], exports.AttrBindingCommand);

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

exports.StyleBindingCommand = r([ Hi("style") ], exports.StyleBindingCommand);

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

exports.ClassBindingCommand = r([ Hi("class") ], exports.ClassBindingCommand);

let Yi = class RefBindingCommand {
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

Yi.inject = [ t.IExpressionParser ];

Yi = r([ Hi("ref") ], Yi);

let Zi = class SpreadBindingCommand {
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

Zi = r([ Hi("...$attrs") ], Zi);

const Ji = e.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const Qi = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.re = t.document.createElement("template");
    }
    createTemplate(t) {
        if (A(t)) {
            let e = Qi[t];
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

TemplateElementFactory.inject = [ it ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return _(oi, this).register(t);
    }
    compile(t, s, i) {
        const n = CustomElementDefinition.getOrCreate(t);
        if (null === n.template || void 0 === n.template) return n;
        if (false === n.needsCompile) return n;
        i ?? (i = sn);
        const r = new CompilationContext(t, s, i, null, null, void 0);
        const o = A(n.template) || !t.enhance ? r.oe.createTemplate(n.template) : n.template;
        const l = "TEMPLATE" === o.nodeName && null != o.content;
        const h = l ? o.content : o;
        const c = s.get(V(pn));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(o);
            ++u;
        }
        if (o.hasAttribute(un)) throw new Error(`AUR0701`);
        this.le(h, r);
        this.he(h, r);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Ae(),
            dependencies: (t.dependencies ?? e.emptyArray).concat(r.deps ?? e.emptyArray),
            instructions: r.rows,
            surrogates: l ? this.ce(o, r) : e.emptyArray,
            template: o,
            hasSlots: r.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, s, i, n) {
        const r = new CompilationContext(t, i, sn, null, null, void 0);
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
                rn.node = n;
                rn.attr = f;
                rn.bindable = null;
                rn.def = null;
                o.push(w.build(rn));
                continue;
            }
            d = r.fe(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                x = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && tn(C);
                if (y) m = this.de(n, C, d, r); else {
                    v = x.primary;
                    if (null === w) {
                        b = c.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        rn.node = n;
                        rn.attr = f;
                        rn.bindable = v;
                        rn.def = d;
                        m = [ w.build(rn) ];
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
                        rn.node = n;
                        rn.attr = f;
                        rn.bindable = g;
                        rn.def = l;
                        o.push(new SpreadElementPropBindingInstruction(w.build(rn)));
                        continue;
                    }
                }
                rn.node = n;
                rn.attr = f;
                rn.bindable = null;
                rn.def = null;
                o.push(w.build(rn));
            }
        }
        en();
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
            if (on[b]) throw new Error(`AUR0702:${c}`);
            g = s.ue(u);
            if (null !== g && (1 & g.type) > 0) {
                rn.node = t;
                rn.attr = u;
                rn.bindable = null;
                rn.def = null;
                i.push(g.build(rn));
                continue;
            }
            f = s.fe(b);
            if (null !== f) {
                if (f.isTemplateController) throw new Error(`AUR0703:${b}`);
                m = BindablesInfo.from(f, true);
                w = false === f.noMultiBindings && null === g && tn(y);
                if (w) p = this.de(t, y, f, s); else {
                    x = m.primary;
                    if (null === g) {
                        v = r.parse(y, 1);
                        p = [ null === v ? new SetPropertyInstruction(y, x.property) : new InterpolationInstruction(v, x.property) ];
                    } else {
                        rn.node = t;
                        rn.attr = u;
                        rn.bindable = x;
                        rn.def = f;
                        p = [ g.build(rn) ];
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
                rn.node = t;
                rn.attr = u;
                rn.bindable = null;
                rn.def = null;
                i.push(g.build(rn));
            }
        }
        en();
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
                rn.node = t;
                rn.attr = A;
                rn.bindable = null;
                rn.def = null;
                (R ?? (R = [])).push(q.build(rn));
                x();
                continue;
            }
            S = s.fe(_);
            if (null !== S) {
                U = BindablesInfo.from(S, true);
                E = false === S.noMultiBindings && null === q && tn(F);
                if (E) D = this.de(t, F, S, s); else {
                    V = U.primary;
                    if (null === q) {
                        O = m.parse(F, 1);
                        D = [ null === O ? new SetPropertyInstruction(F, V.property) : new InterpolationInstruction(O, V.property) ];
                    } else {
                        rn.node = t;
                        rn.attr = A;
                        rn.bindable = V;
                        rn.def = S;
                        D = [ q.build(rn) ];
                    }
                }
                x();
                if (S.isTemplateController) ($ ?? ($ = [])).push(new HydrateTemplateController(nn, this.resolveResources ? S : S.name, void 0, D)); else (T ?? (T = [])).push(new HydrateAttributeInstruction(this.resolveResources ? S : S.name, null != S.aliases && S.aliases.includes(_) ? _ : void 0, D));
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
                    rn.node = t;
                    rn.attr = A;
                    rn.bindable = I;
                    rn.def = c;
                    (B ?? (B = [])).push(q.build(rn));
                    continue;
                }
            }
            rn.node = t;
            rn.attr = A;
            rn.bindable = null;
            rn.def = null;
            (R ?? (R = [])).push(q.build(rn));
        }
        en();
        if (this.we(t) && null != R && R.length > 1) this.be(t, R);
        if (a) {
            L = new HydrateElementInstruction(this.resolveResources ? c : c.name, void 0, B ?? e.emptyArray, null, M, p);
            if (h === bn) {
                const e = t.getAttribute("name") || wn;
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
                        name: Ae(),
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
                f = 1 === A.nodeType ? A.getAttribute(bn) : null;
                if (null !== f) A.removeAttribute(bn);
                if (a) {
                    l = A.nextSibling;
                    if (!u) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = p ?? (p = {}))[n = f || wn] ?? (i[n] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== f) {
                        f = f || wn;
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
                        name: Ae(),
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
                name: Ae(),
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
                    name: Ae(),
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
                n = 1 === e.nodeType ? e.getAttribute(bn) : null;
                if (null !== n) e.removeAttribute(bn);
                if (a) {
                    i = e.nextSibling;
                    if (!u) {
                        g = 3 === e.nodeType && "" === e.textContent.trim();
                        if (!g) ((r = f ?? (f = {}))[o = n || wn] ?? (r[o] = [])).push(e);
                        t.removeChild(e);
                    }
                    e = i;
                } else {
                    if (null !== n) {
                        n = n || wn;
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
                        name: Ae(),
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
                    rn.node = t;
                    rn.attr = f;
                    rn.bindable = p;
                    rn.def = s;
                    o.push(d.build(rn));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        en();
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
            const n = fn(t, o);
            const r = class LocalTemplate {};
            const h = t.content;
            const c = e.toArray(h.querySelectorAll("bindable"));
            const a = $.for(r);
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
                    mode: dn(t)
                });
                const i = t.getAttributeNames().filter((t => !an.includes(t)));
                if (i.length > 0) ;
                h.removeChild(t);
            }
            l.push(r);
            s.Ce(Be({
                name: n,
                template: t
            }, r));
            i.removeChild(t);
        }
        let h = 0;
        const c = l.length;
        for (;c > h; ++h) Te(l[h]).dependencies.push(...s.def.dependencies ?? e.emptyArray, ...s.deps ?? e.emptyArray);
    }
    we(t) {
        return "INPUT" === t.nodeName && 1 === ln[t.type];
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
        this.oe = h ? r.oe : i.get(Ji);
        this.pe = h ? r.pe : i.get(Y);
        this.ep = h ? r.ep : i.get(t.IExpressionParser);
        this.m = h ? r.m : i.get(ot);
        this._t = h ? r._t : i.get(e.ILogger);
        this.p = h ? r.p : i.get(it);
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
        return this.c.find(Pe, t);
    }
    fe(t) {
        return this.c.find(re, t);
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
            s = this.c.create(Ki, e);
            if (null === s) throw new Error(`AUR0713:${e}`);
            this.Ae[e] = s;
        }
        return s;
    }
}

function tn(t) {
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

function en() {
    rn.node = rn.attr = rn.bindable = rn.def = null;
}

const sn = {
    projections: null
};

const nn = {
    name: "unnamed"
};

const rn = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const on = Object.assign(g(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const ln = {
    checkbox: 1,
    radio: 1
};

const hn = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = hn.get(t);
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
            hn.set(t, s = new BindablesInfo(n, i, c));
        }
        return s;
    }
}

var cn;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(cn || (cn = {}));

const an = Object.freeze([ "property", "attribute", "mode" ]);

const un = "as-custom-element";

function fn(t, e) {
    const s = t.getAttribute(un);
    if (null === s || "" === s) throw new Error(`AUR0715`);
    if (e.has(s)) throw new Error(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(un);
    }
    return s;
}

function dn(t) {
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

const pn = e.DI.createInterface("ITemplateCompilerHooks");

const mn = new WeakMap;

const xn = d("compiler-hooks");

const gn = Object.freeze({
    name: xn,
    define(t) {
        let e = mn.get(t);
        if (void 0 === e) {
            mn.set(t, e = new TemplateCompilerHooksDefinition(t));
            c(xn, e, t);
            p(t, xn);
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
        t.register(_(pn, this.Type));
    }
}

const vn = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return gn.define(t);
    }
};

const wn = "default";

const bn = "au-slot";

const yn = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        yn.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = yn.get(e);
        yn.delete(e);
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

ct("oneTime")(OneTimeBindingBehavior);

ct("toView")(ToViewBindingBehavior);

ct("fromView")(FromViewBindingBehavior);

ct("twoWay")(TwoWayBindingBehavior);

const kn = 200;

class DebounceBindingBehavior extends BindingInterceptor {
    constructor(t, s) {
        super(t, s);
        this.opts = {
            delay: kn
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
            this.opts.delay = isNaN(e) ? kn : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        this.binding.$unbind();
    }
}

ct("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Jt = new Map;
        this.Re = t;
    }
    bind(t, e, ...s) {
        if (!("handleChange" in e)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Jt.set(e, s);
        let i;
        for (i of s) this.Re.addSignalListener(i, e);
    }
    unbind(t, e) {
        const s = this.Jt.get(e);
        this.Jt.delete(e);
        let i;
        for (i of s) this.Re.removeSignalListener(i, e);
    }
}

SignalBindingBehavior.inject = [ t.ISignaler ];

ct("signal")(SignalBindingBehavior);

const Cn = 200;

class ThrottleBindingBehavior extends BindingInterceptor {
    constructor(t, s) {
        super(t, s);
        this.opts = {
            delay: Cn
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.get(e.IPlatform);
        this.J = this.p.taskQueue;
        if (s.args.length > 0) this.firstArg = s.args[0];
    }
    callSource(t) {
        this.Be((() => this.binding.callSource(t)));
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
        this.Be((() => this.binding.updateSource(t)));
    }
    Be(t) {
        const e = this.opts;
        const s = this.p;
        const i = this.lastCall + e.delay - s.performanceNow();
        if (i > 0) {
            const n = this.task;
            e.delay = i;
            this.task = this.J.queueTask((() => {
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
            this.opts.delay = this.delay = isNaN(e) ? Cn : e;
        }
        this.binding.$bind(t);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        super.$unbind();
    }
}

ct("throttle")(ThrottleBindingBehavior);

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

const An = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = An;
    }
    unbind(t, e) {
        return;
    }
}

ct("attr")(AttrBindingBehavior);

function Rn(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw new Error(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Rn;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ct("self")(SelfBindingBehavior);

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

function Sn(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Se = void 0;
        this.Ee = void 0;
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
        this.Ie();
        this.Te();
        this.queue.add(this);
    }
    handleCollectionChange() {
        this.Te();
    }
    handleChange(t, e) {
        this.Te();
    }
    Te() {
        const t = this.v;
        const e = this.o;
        const s = v.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Sn;
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
        const n = void 0 !== e.matcher ? e.matcher : Sn;
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
        this.Ie();
    }
    stop() {
        this.handler.dispose();
        this.Se?.unsubscribe(this);
        this.Se = void 0;
        this.Ee?.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        En = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, En);
    }
    Ie() {
        const t = this.o;
        (this.Ee ?? (this.Ee = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.Se?.unsubscribe(this);
        this.Se = void 0;
        if ("checkbox" === t.type) (this.Se = Fn(this.v, this.oL))?.subscribe(this);
    }
}

t.subscriberCollection(CheckedObserver);

t.withFlushQueue(CheckedObserver);

let En;

const In = {
    childList: true,
    subtree: true,
    characterData: true
};

function Tn(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.De = void 0;
        this.$e = void 0;
        this.iO = false;
        this.o = t;
        this.oL = i;
        this.handler = s;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Dn(this.o.options) : this.o.value;
    }
    setValue(t) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Pe(t instanceof Array ? t : null);
        this.K();
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
        const s = k(t);
        const i = e.matcher ?? Tn;
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
            const o = t.matcher || Tn;
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
    Oe() {
        (this.$e = new this.o.ownerDocument.defaultView.MutationObserver(this.Le.bind(this))).observe(this.o, In);
        this.Pe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    qe() {
        this.$e.disconnect();
        this.De?.unsubscribe(this);
        this.$e = this.De = void 0;
        this.iO = false;
    }
    Pe(t) {
        this.De?.unsubscribe(this);
        this.De = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error(`AUR0654`);
            (this.De = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    Le(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Oe();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.qe();
        }
    }
    flush() {
        $n = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, $n);
    }
}

t.subscriberCollection(SelectValueObserver);

t.withFlushQueue(SelectValueObserver);

function Dn(t) {
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

let $n;

const Pn = "--";

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
    setValue(t) {
        this.value = t;
        this.H = t !== this.ov;
        this.K();
    }
    Ue(t) {
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
    Ve(t) {
        let s;
        let i;
        const n = [];
        for (i in t) {
            s = t[i];
            if (null == s) continue;
            if (A(s)) {
                if (i.startsWith(Pn)) {
                    n.push([ i, s ]);
                    continue;
                }
                n.push([ e.kebabCase(i), s ]);
                continue;
            }
            n.push(...this._e(s));
        }
        return n;
    }
    Fe(t) {
        const s = t.length;
        if (s > 0) {
            const e = [];
            let i = 0;
            for (;s > i; ++i) e.push(...this._e(t[i]));
            return e;
        }
        return e.emptyArray;
    }
    _e(t) {
        if (A(t)) return this.Ue(t);
        if (t instanceof Array) return this.Fe(t);
        if (t instanceof Object) return this.Ve(t);
        return e.emptyArray;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const s = this._e(t);
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
        this.H = false;
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
        this.H = true;
        if (!this.handler.config.readonly) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.o[this.k] = this.v ?? this.handler.config.default;
            this.queue.add(this);
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
        On = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, On);
    }
}

t.subscriberCollection(ValueAttributeObserver);

t.withFlushQueue(ValueAttributeObserver);

let On;

const Ln = "http://www.w3.org/1999/xlink";

const qn = "http://www.w3.org/XML/1998/namespace";

const Un = "http://www.w3.org/2000/xmlns/";

const Vn = Object.assign(g(), {
    "xlink:actuate": [ "actuate", Ln ],
    "xlink:arcrole": [ "arcrole", Ln ],
    "xlink:href": [ "href", Ln ],
    "xlink:role": [ "role", Ln ],
    "xlink:show": [ "show", Ln ],
    "xlink:title": [ "title", Ln ],
    "xlink:type": [ "type", Ln ],
    "xml:lang": [ "lang", qn ],
    "xml:space": [ "space", qn ],
    xmlns: [ "xmlns", Un ],
    "xmlns:xlink": [ "xlink", Un ]
});

const _n = new t.PropertyAccessor;

_n.type = 2 | 4;

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
        this.Me = g();
        this.Ne = g();
        this.We = g();
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
        F(t.INodeObserverLocator, NodeObserverLocator).register(e);
        _(t.INodeObserverLocator, NodeObserverLocator).register(e);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        const i = this.je;
        let n;
        if (A(t)) {
            n = i[t] ?? (i[t] = g());
            if (null == n[e]) n[e] = new NodeObserverConfig(s); else jn(t, e);
        } else for (const s in t) {
            n = i[s] ?? (i[s] = g());
            const r = t[s];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else jn(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Me;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else jn("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else jn("*", t);
    }
    getAccessor(t, s, i) {
        if (s in this.We || s in (this.Ne[t.tagName] ?? e.emptyObject)) return this.getObserver(t, s, i);
        switch (s) {
          case "src":
          case "href":
          case "role":
          case "minLength":
          case "maxLength":
          case "placeholder":
          case "type":
          case "size":
            return An;

          default:
            {
                const e = Vn[s];
                if (void 0 !== e) return AttributeNSAccessor.forNs(e[1]);
                if (b(t, s, this.svgAnalyzer)) return An;
                return _n;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        let n;
        if (A(t)) {
            n = (s = this.Ne)[t] ?? (s[t] = g());
            n[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            n = (i = this.Ne)[e] ?? (i[e] = g());
            n[s] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.We[e] = true;
    }
    getObserver(e, s, i) {
        switch (s) {
          case "class":
            return new ClassAttributeAccessor(e);

          case "css":
          case "style":
            return new StyleAttributeAccessor(e);
        }
        const n = this.je[e.tagName]?.[s] ?? this.Me[s];
        if (null != n) return new n.type(e, s, new EventSubscriber(n), i, this.locator);
        const r = Vn[s];
        if (void 0 !== r) return AttributeNSAccessor.forNs(r[1]);
        if (b(e, s, this.svgAnalyzer)) return An;
        if (s in e.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(e, s);
            throw new Error(`AUR0652:${String(s)}`);
        } else return new t.SetterObserver(e, s);
    }
}

NodeObserverLocator.inject = [ e.IServiceLocator, it, t.IDirtyChecker, nt ];

function Fn(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function jn(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...s) {
        if (0 === s.length) throw new Error(`AUR0802`);
        if (e.mode !== exports.BindingMode.twoWay && e.mode !== exports.BindingMode.fromView) throw new Error(`AUR0803`);
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

UpdateTriggerBindingBehavior.inject = [ t.IObserverLocator ];

ct("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.He = t;
        this.p = e;
        this.ze = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.Ge(); else this.ze = true;
    }
    attached() {
        if (this.ze) {
            this.ze = false;
            this.Ge();
        }
        this.He.addEventListener("focus", this);
        this.He.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.He;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Xe) this.value = false;
    }
    Ge() {
        const t = this.He;
        const e = this.Xe;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get Xe() {
        return this.He === this.p.document.activeElement;
    }
}

Focus.inject = [ Ms, it ];

r([ I({
    mode: exports.BindingMode.twoWay
}) ], Focus.prototype, "value", void 0);

Yt("focus")(Focus);

let Mn = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.Ke = false;
        this.Ye = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ye = null;
            if (Boolean(this.value) !== this.Ze) if (this.Ze === this.Je) {
                this.Ze = !this.Je;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Ze = this.Je;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Ze = this.Je = "hide" !== s.alias;
    }
    binding() {
        this.Ke = true;
        this.update();
    }
    detaching() {
        this.Ke = false;
        this.Ye?.cancel();
        this.Ye = null;
    }
    valueChanged() {
        if (this.Ke && null === this.Ye) this.Ye = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ I ], Mn.prototype, "value", void 0);

Mn = r([ o(0, Ms), o(1, it), o(2, ni) ], Mn);

W("hide")(Mn);

Yt("show")(Mn);

class Portal {
    constructor(t, s, i) {
        this.id = e.nextId("au$component");
        this.strict = false;
        this.p = i;
        this.Qe = i.document.createElement("div");
        this.view = t.create();
        Gs(this.view.nodes, s);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.Qe = this.ts();
        this.view.setHost(i);
        return this.es(t, i, s);
    }
    detaching(t, e, s) {
        return this.ss(t, this.Qe, s);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const s = this.Qe;
        const i = this.Qe = this.ts();
        if (s === i) return;
        this.view.setHost(i);
        const n = e.onResolve(this.ss(null, i, t.flags), (() => this.es(null, i, t.flags)));
        if (y(n)) n.catch((t => {
            throw t;
        }));
    }
    es(t, s, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(s);
        return e.onResolve(n?.call(r, s, o), (() => this.os(t, s, i)));
    }
    os(t, s, i) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.appendTo(s); else return e.onResolve(r.activate(t ?? r, n, i, n.scope), (() => this.ls(s)));
        return this.ls(s);
    }
    ls(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    ss(t, s, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return e.onResolve(n?.call(r, s, o), (() => this.cs(t, s, i)));
    }
    cs(t, s, i) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.remove(); else return e.onResolve(r.deactivate(t, n, i), (() => this.us(s)));
        return this.us(s);
    }
    us(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return e?.call(s, t, i);
    }
    ts() {
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

Portal.inject = [ es, Ws, it ];

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

Zt("portal")(Portal);

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
        this.ds = false;
        this.ps = 0;
    }
    attaching(t, s, i) {
        let n;
        const r = this.$controller;
        const o = this.ps++;
        const l = () => !this.ds && this.ps === o + 1;
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
        this.ds = true;
        return e.onResolve(this.pending, (() => {
            this.ds = false;
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
        const o = this.ps++;
        const l = () => !this.ds && this.ps === o + 1;
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

If.inject = [ es, Ws, _s ];

r([ I ], If.prototype, "value", void 0);

r([ I({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Zt("if")(If);

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

Else.inject = [ es ];

Zt({
    name: "else"
})(Else);

function Nn(t) {
    t.dispose();
}

const Wn = [ 38963, 36914 ];

class Repeat {
    constructor(t, s, i) {
        this.l = t;
        this.xs = s;
        this.f = i;
        this.id = e.nextId("au$component");
        this.views = [];
        this.key = void 0;
        this.gs = void 0;
        this.vs = false;
        this.ws = false;
        this.bs = null;
        this.ys = void 0;
        this.ks = false;
    }
    binding(t, e, s) {
        const i = this.xs.bindings;
        const n = i.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = i[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Cs = r;
                let t = o.iterable;
                while (null != t && Wn.includes(t.$kind)) {
                    t = t.expression;
                    this.vs = true;
                }
                this.bs = t;
                break;
            }
        }
        this.As();
        const h = o.declaration;
        if (!(this.ks = 90138 === h.$kind || 106523 === h.$kind)) this.local = h.evaluate(this.$controller.scope, r, null);
    }
    attaching(t, e, s) {
        this.Rs();
        return this.Bs(t);
    }
    detaching(t, e, s) {
        this.As();
        return this.Ss(t);
    }
    itemsChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        this.As();
        this.Rs();
        const s = e.onResolve(this.Ss(null), (() => this.Bs(null)));
        if (y(s)) s.catch(B);
    }
    handleCollectionChange(s) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        if (this.vs) {
            if (this.ws) return;
            this.ws = true;
            this.items = this.forOf.iterable.evaluate(i.scope, this.Cs, null);
            this.ws = false;
            return;
        }
        this.Rs();
        if (void 0 === s) {
            const t = e.onResolve(this.Ss(null), (() => this.Bs(null)));
            if (y(t)) t.catch(B);
        } else {
            const i = this.views.length;
            const n = t.applyMutationsToIndices(s);
            if (n.deletedIndices.length > 0) {
                const t = e.onResolve(this.Es(n), (() => this.Is(i, n)));
                if (y(t)) t.catch(B);
            } else this.Is(i, n);
        }
    }
    As() {
        const e = this.$controller.scope;
        let s = this.Ts;
        let i = this.vs;
        let n;
        if (i) {
            s = this.Ts = this.bs.evaluate(e, this.Cs, null) ?? null;
            i = this.vs = !Object.is(this.items, s);
        }
        const r = this.gs;
        if (this.$controller.isActive) {
            n = this.gs = t.getCollectionObserver(i ? s : this.items);
            if (r !== n) {
                r?.unsubscribe(this);
                n?.subscribe(this);
            }
        } else {
            r?.unsubscribe(this);
            this.gs = void 0;
        }
    }
    Rs() {
        const t = this.items;
        if (t instanceof Array) {
            this.ys = t;
            return;
        }
        const e = this.forOf;
        if (void 0 === e) return;
        const s = [];
        this.forOf.iterate(0, t, ((t, e, i) => {
            s[e] = i;
        }));
        this.ys = s;
    }
    Bs(e) {
        let s;
        let i;
        let n;
        let r;
        const {$controller: o, f: l, local: h, l: c, items: a} = this;
        const u = o.scope;
        const f = this.forOf;
        const d = f.count(0, a);
        const p = this.views = Array(d);
        f.iterate(0, a, ((a, m, x) => {
            n = p[m] = l.create().setLocation(c);
            n.nodes.unlink();
            if (this.ks) f.declaration.assign(r = t.Scope.fromParent(u, t.BindingContext.create()), this.Cs, x); else r = t.Scope.fromParent(u, t.BindingContext.create(h, x));
            Kn(r.overrideContext, m, d);
            i = n.activate(e ?? n, o, 0, r);
            if (y(i)) (s ?? (s = [])).push(i);
        }));
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    Ss(t) {
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
    Es(t) {
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
    Is(e, s) {
        let i;
        let n;
        let r;
        let o;
        let l = 0;
        const {$controller: h, f: c, local: a, ys: u, l: f, views: d} = this;
        const p = s.length;
        for (;p > l; ++l) if (-2 === s[l]) {
            r = c.create();
            d.splice(l, 0, r);
        }
        if (d.length !== p) throw new Error(`AUR0814:${d.length}!=${p}`);
        const m = h.scope;
        const x = s.length;
        t.synchronizeIndices(d, s);
        const g = Xn(s);
        const v = g.length;
        let w;
        let b = v - 1;
        l = x - 1;
        for (;l >= 0; --l) {
            r = d[l];
            w = d[l + 1];
            r.nodes.link(w?.nodes ?? f);
            if (-2 === s[l]) {
                if (this.ks) this.forOf.declaration.assign(o = t.Scope.fromParent(m, t.BindingContext.create()), this.Cs, u[l]); else o = t.Scope.fromParent(m, t.BindingContext.create(a, u[l]));
                Kn(o.overrideContext, l, x);
                r.setLocation(f);
                n = r.activate(r, h, 0, o);
                if (y(n)) (i ?? (i = [])).push(n);
            } else if (b < 0 || 1 === v || l !== g[b]) {
                Kn(r.scope.overrideContext, l, x);
                r.nodes.insertBefore(r.location);
            } else {
                if (e !== x) Kn(r.scope.overrideContext, l, x);
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

Repeat.inject = [ Ws, Cs, es ];

r([ I ], Repeat.prototype, "items", void 0);

Zt("repeat")(Repeat);

let Hn = 16;

let zn = new Int32Array(Hn);

let Gn = new Int32Array(Hn);

function Xn(t) {
    const e = t.length;
    if (e > Hn) {
        Hn = e;
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

function Kn(t, e, s) {
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
            for (h = r.length; h > l; ++l) r[l].$bind(o);
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

With.inject = [ es, Ws ];

r([ I ], With.prototype, "value", void 0);

Zt("with")(With);

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
        this.queue((() => this.Ds(t)));
    }
    Ds(t) {
        const s = t.isMatch(this.value);
        const i = this.activeCases;
        const n = i.length;
        if (!s) {
            if (n > 0 && i[0].id === t.id) return this.$s(null);
            return;
        }
        if (n > 0 && i[0].id < t.id) return;
        const r = [];
        let o = t.fallThrough;
        if (!o) r.push(t); else {
            const e = this.cases;
            const s = e.indexOf(t);
            for (let t = s, i = e.length; t < i && o; t++) {
                const s = e[t];
                r.push(s);
                o = s.fallThrough;
            }
        }
        return e.onResolve(this.$s(null, r), (() => {
            this.activeCases = r;
            return this.Ps(null);
        }));
    }
    swap(t, s) {
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
        return e.onResolve(this.activeCases.length > 0 ? this.$s(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Ps(t);
        }));
    }
    Ps(t) {
        const s = this.$controller;
        if (!s.isActive) return;
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        const r = s.scope;
        if (1 === n) return i[0].activate(t, 0, r);
        return e.resolveAll(...i.map((e => e.activate(t, 0, r))));
    }
    $s(t, s = []) {
        const i = this.activeCases;
        const n = i.length;
        if (0 === n) return;
        if (1 === n) {
            const e = i[0];
            if (!s.includes(e)) {
                i.length = 0;
                return e.deactivate(t, 0);
            }
            return;
        }
        return e.onResolve(e.resolveAll(...i.reduce(((e, i) => {
            if (!s.includes(i)) e.push(i.deactivate(t, 0));
            return e;
        }), [])), (() => {
            i.length = 0;
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

r([ I ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ Zt("switch"), o(0, es), o(1, Ws) ], exports.Switch);

exports.Case = class Case {
    constructor(t, s, i, n) {
        this.f = t;
        this.Os = s;
        this.l = i;
        this.id = e.nextId("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Ls = n.config.level <= 1;
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
    isMatch(t) {
        this._t.debug("isMatch()");
        const e = this.value;
        if (Array.isArray(e)) {
            if (void 0 === this.gs) this.gs = this.qs(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (Array.isArray(t)) {
            this.gs?.unsubscribe(this);
            this.gs = this.qs(t);
        } else if (void 0 !== this.gs) this.gs.unsubscribe(this);
        this.$switch.caseChanged(this);
    }
    handleCollectionChange(t) {
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
        this.gs?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    qs(t) {
        const e = this.Os.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

exports.Case.inject = [ es, t.IObserverLocator, Ws, e.ILogger ];

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
    mode: exports.BindingMode.oneTime
}) ], exports.Case.prototype, "fallThrough", void 0);

exports.Case = r([ Zt("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ Zt("default-case") ], exports.DefaultCase);

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

r([ I ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ Zt("promise"), o(0, es), o(1, Ws), o(2, it), o(3, e.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
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

r([ I({
    mode: exports.BindingMode.toView
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ Zt("pending"), o(0, es), o(1, Ws) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
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

r([ I({
    mode: exports.BindingMode.fromView
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ Zt("then"), o(0, es), o(1, Ws) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, s) {
        this.f = t;
        this.l = s;
        this.id = e.nextId("au$component");
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

r([ I({
    mode: exports.BindingMode.fromView
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ Zt("catch"), o(0, es), o(1, Ws) ], exports.RejectedTemplateController);

function Yn(t) {
    const e = t.parent;
    const s = e?.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw new Error(`AUR0813`);
}

let Zn = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

Zn = r([ Z({
    pattern: "promise.resolve",
    symbols: ""
}) ], Zn);

let Jn = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Jn = r([ Z({
    pattern: "then",
    symbols: ""
}) ], Jn);

let Qn = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Qn = r([ Z({
    pattern: "catch",
    symbols: ""
}) ], Qn);

function tr(t, e, s, i) {
    if (A(e)) return er(t, e, s, i);
    if (Se(e)) return sr(t, e, s, i);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Us = s;
        this.Vs = void 0;
    }
    get definition() {
        if (void 0 === this.Vs) this.Vs = CustomElementDefinition.create({
            name: Ae(),
            template: this.node,
            needsCompile: A(this.node),
            instructions: this.instructions,
            dependencies: this.Us
        });
        return this.Vs;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(cs).getViewFactory(this.definition, t.createChild().register(...this.Us));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Us);
    }
}

function er(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (ri(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) ir(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function sr(t, e, s, i) {
    const n = Te(e);
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
        if (ri(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) ir(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function ir(t, e, s, i, n) {
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

function nr(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, s, i, n) {
        this.p = t;
        this._s = s;
        this.Fs = i;
        this.r = n;
        this.id = e.nextId("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.js = void 0;
        this.Ms = s.props.reduce(nr, {});
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
        return this.cs(this.view, t, s);
    }
    componentChanged(t, s, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.js === t) return;
        this.js = t;
        this.composing = true;
        i |= n.flags;
        const r = e.onResolve(this.cs(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (y(r)) r.catch((t => {
            throw t;
        }));
    }
    compose(t, s, i, n) {
        return e.onResolve(void 0 === t ? e.onResolve(s, (t => this.Ns(t, n))) : t, (t => this.os(this.view = t, i, n)));
    }
    cs(t, e, s) {
        return t?.deactivate(e ?? t, this.$controller, s);
    }
    os(t, s, i) {
        const {$controller: n} = this;
        return e.onResolve(t?.activate(s ?? t, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Ns(t, e) {
        const s = this.Ws(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Ws(t, e) {
        if (null == t) return;
        const s = this.Fs.controller.container;
        if ("object" === typeof t) {
            if (rr(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (A(t)) {
            const e = s.find(Pe, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return tr(this.p, t, this.Ms, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ it, ni, As, cs ];

r([ I ], AuRender.prototype, "component", void 0);

r([ I({
    mode: exports.BindingMode.fromView
}) ], AuRender.prototype, "composing", void 0);

ae({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function rr(t) {
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
        this.Hs = void 0;
        this.r = t.get(cs);
        this._s = r;
        this.zs = o;
    }
    static get inject() {
        return [ e.IContainer, Cs, Ms, Ws, it, ni, e.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Gs;
    }
    get composition() {
        return this.Hs;
    }
    attaching(t, s, i) {
        return this.Gs = e.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.zs.isCurrent(t)) this.Gs = void 0;
        }));
    }
    detaching(t) {
        const s = this.Hs;
        const i = this.Gs;
        this.zs.invalidate();
        this.Hs = this.Gs = void 0;
        return e.onResolve(i, (() => s?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Hs) {
            this.Hs.update(this.model);
            return;
        }
        this.Gs = e.onResolve(this.Gs, (() => e.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.zs.isCurrent(t)) this.Gs = void 0;
        }))));
    }
    queue(t, s) {
        const i = this.zs;
        const n = this.Hs;
        return e.onResolve(i.create(t), (t => {
            if (i.isCurrent(t)) return e.onResolve(this.compose(t), (r => {
                if (i.isCurrent(t)) return e.onResolve(r.activate(s), (() => {
                    if (i.isCurrent(t)) {
                        this.Hs = r;
                        return e.onResolve(n?.deactivate(s), (() => t));
                    } else return e.onResolve(r.controller.deactivate(r.controller, this.$controller, 2), (() => {
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
                    projections: this._s.projections
                }, d);
                return new CompositionController(t, (e => t.activate(e ?? t, u, 1, u.scope.parentScope)), (s => e.onResolve(t.deactivate(s ?? t, u, 2), r)), (t => i.activate?.(t)), s);
            } else {
                const e = CustomElementDefinition.create({
                    name: Pe.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(e, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? t.Scope.fromParent(this.parent.scope, i) : t.Scope.create(i);
                if (Ks(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(t ?? l, u, 1, h)), (t => l.deactivate(t ?? l, u, 2)), (t => i.activate?.(t)), s);
            }
        };
        if ("activate" in i) return e.onResolve(i.activate(h), (() => x())); else return x();
    }
    getVm(t, s, i) {
        if (null == s) return new EmptyComponent$1;
        if ("object" === typeof s) return s;
        const n = this.p;
        const r = Ks(i);
        t.registerResolver(n.Element, t.registerResolver(Ms, new e.InstanceProvider("ElementResolver", r ? null : i)));
        t.registerResolver(Ws, new e.InstanceProvider("IRenderLocation", r ? i : null));
        const o = t.invoke(s);
        t.registerResolver(s, new e.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = C(t) ? t : t?.constructor;
        return Pe.isType(e) ? Pe.getDefinition(e) : null;
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

ae("au-compose")(AuCompose);

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
        this.Xs = null;
        this.Ks = null;
        let n;
        const r = e.auSlot;
        const o = s.instruction?.projections?.[r.name];
        if (null == o) {
            n = i.getViewFactory(r.fallback, s.controller.container);
            this.Ys = false;
        } else {
            n = i.getViewFactory(o, s.parent.controller.container);
            this.Ys = true;
        }
        this.Fs = s;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Ws, ni, As, cs ];
    }
    binding(e, s, i) {
        this.Xs = this.$controller.scope.parentScope;
        let n;
        if (this.Ys) {
            n = this.Fs.controller.scope.parentScope;
            (this.Ks = t.Scope.fromParent(n, n.bindingContext)).overrideContext.$host = this.expose ?? this.Xs.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.Ys ? this.Ks : this.Xs);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.Ys && null != this.Ks) this.Ks.overrideContext.$host = t;
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

ae({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const or = e.DI.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.Zs = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Zs.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, or) ], exports.SanitizeValueConverter);

pt("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.Js = t;
    }
    toView(t, e) {
        return this.Js.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, hs) ], exports.ViewValueConverter);

pt("view")(exports.ViewValueConverter);

const lr = DebounceBindingBehavior;

const hr = OneTimeBindingBehavior;

const cr = ToViewBindingBehavior;

const ar = FromViewBindingBehavior;

const ur = SignalBindingBehavior;

const fr = ThrottleBindingBehavior;

const dr = TwoWayBindingBehavior;

const pr = TemplateCompiler;

const mr = NodeObserverLocator;

const xr = [ pr, mr ];

const gr = SVGAnalyzer;

const vr = exports.AtPrefixedTriggerAttributePattern;

const wr = exports.ColonPrefixedBindAttributePattern;

const br = exports.RefAttributePattern;

const yr = exports.DotSeparatedAttributePattern;

const kr = st;

const Cr = [ br, yr, kr ];

const Ar = [ vr, wr ];

const Rr = exports.CallBindingCommand;

const Br = exports.DefaultBindingCommand;

const Sr = exports.ForBindingCommand;

const Er = exports.FromViewBindingCommand;

const Ir = exports.OneTimeBindingCommand;

const Tr = exports.ToViewBindingCommand;

const Dr = exports.TwoWayBindingCommand;

const $r = Yi;

const Pr = exports.TriggerBindingCommand;

const Or = exports.DelegateBindingCommand;

const Lr = exports.CaptureBindingCommand;

const qr = exports.AttrBindingCommand;

const Ur = exports.ClassBindingCommand;

const Vr = exports.StyleBindingCommand;

const _r = Zi;

const Fr = [ Br, Ir, Er, Tr, Dr, Rr, Sr, $r, Pr, Or, Lr, Ur, Vr, qr, _r ];

const jr = exports.SanitizeValueConverter;

const Mr = exports.ViewValueConverter;

const Nr = If;

const Wr = Else;

const Hr = Repeat;

const zr = With;

const Gr = exports.Switch;

const Xr = exports.Case;

const Kr = exports.DefaultCase;

const Yr = exports.PromiseTemplateController;

const Zr = exports.PendingTemplateController;

const Jr = exports.FulfilledTemplateController;

const Qr = exports.RejectedTemplateController;

const to = Zn;

const eo = Jn;

const so = Qn;

const io = AttrBindingBehavior;

const no = SelfBindingBehavior;

const ro = UpdateTriggerBindingBehavior;

const oo = AuRender;

const lo = AuCompose;

const ho = Portal;

const co = Focus;

const ao = Mn;

const uo = [ lr, hr, cr, ar, ur, fr, dr, jr, Mr, Nr, Wr, Hr, zr, Gr, Xr, Kr, Yr, Zr, Jr, Qr, to, eo, so, io, no, ro, oo, lo, ho, co, ao, AuSlot ];

const fo = gi;

const po = pi;

const mo = di;

const xo = wi;

const go = yi;

const vo = xi;

const wo = bi;

const bo = vi;

const yo = fi;

const ko = mi;

const Co = Si;

const Ao = $i;

const Ro = Ei;

const Bo = Ii;

const So = Ti;

const Eo = Di;

const Io = Ri;

const To = Pi;

const Do = [ wo, go, fo, bo, xo, yo, mo, po, ko, vo, Co, Ao, Ro, Bo, So, Eo, Io, To ];

const $o = Po(e.noop);

function Po(e) {
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
            return s.register(j(t.ICoercionConfiguration, i.coercingOptions), ...xr, ...uo, ...Cr, ...Fr, ...Do);
        },
        customize(t) {
            return Po(t ?? e);
        }
    };
}

const Oo = e.DI.createInterface("IAurelia");

class Aurelia {
    constructor(t = e.DI.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Qs = false;
        this.ti = false;
        this.ei = void 0;
        this.next = void 0;
        this.si = void 0;
        this.ii = void 0;
        if (t.has(Oo, true)) throw new Error(`AUR0768`);
        t.registerResolver(Oo, new e.InstanceProvider("IAurelia", this));
        t.registerResolver(Vs, this.ni = new e.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Qs;
    }
    get isStopping() {
        return this.ti;
    }
    get root() {
        if (null == this.ei) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.ei;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.ri(t.host), this.container, this.ni);
        return this;
    }
    enhance(t, s) {
        const i = t.container ?? this.container.createChild();
        const n = t.host;
        const r = this.ri(n);
        const o = t.component;
        let l;
        if (C(o)) {
            i.registerResolver(r.HTMLElement, i.registerResolver(r.Element, i.registerResolver(Ms, new e.InstanceProvider("ElementResolver", n))));
            l = i.invoke(o);
        } else l = o;
        i.registerResolver(Ns, new e.InstanceProvider("IEventTarget", n));
        s = s ?? null;
        const h = Controller.$el(i, l, n, null, CustomElementDefinition.create({
            name: Ae(),
            template: n,
            enhance: true
        }));
        return e.onResolve(h.activate(h, s, 1), (() => h));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    ri(t) {
        let e;
        if (!this.container.has(it, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            e = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(j(it, e));
        } else e = this.container.get(it);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (y(this.si)) return this.si;
        return this.si = e.onResolve(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ni.prepare(this.ei = t);
            this.Qs = true;
            return e.onResolve(t.activate(), (() => {
                this.ir = true;
                this.Qs = false;
                this.si = void 0;
                this.oi(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (y(this.ii)) return this.ii;
        if (true === this.ir) {
            const s = this.ei;
            this.ir = false;
            this.ti = true;
            return this.ii = e.onResolve(s.deactivate(), (() => {
                Reflect.deleteProperty(s.host, "$aurelia");
                if (t) s.dispose();
                this.ei = void 0;
                this.ni.dispose();
                this.ti = false;
                this.oi(s, "au-stopped", s.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.ti) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    oi(t, e, s) {
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

const Lo = e.DI.createInterface("IDialogService");

const qo = e.DI.createInterface("IDialogController");

const Uo = e.DI.createInterface("IDialogDomRenderer");

const Vo = e.DI.createInterface("IDialogDom");

const _o = e.DI.createInterface("IDialogGlobalSettings");

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
        return [ it, e.IContainer ];
    }
    activate(t) {
        const s = this.ctn.createChild();
        const {model: i, template: n, rejectOnCancel: r} = t;
        const o = s.get(Uo);
        const l = t.host ?? this.p.document.body;
        const h = this.dom = o.render(l, t);
        const c = s.has(Ns, true) ? s.get(Ns) : null;
        const a = h.contentHost;
        this.settings = t;
        if (null == c || !c.contains(l)) s.register(j(Ns, l));
        s.register(j(Ms, a), j(Vo, h));
        return new Promise((e => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(s, t, a), {
                $dialog: this
            });
            e(n.canActivate?.(i) ?? true);
        })).then((o => {
            if (true !== o) {
                h.dispose();
                if (r) throw Fo(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const l = this.cmp;
            return e.onResolve(l.activate?.(i), (() => {
                const i = this.controller = Controller.$el(s, l, a, null, CustomElementDefinition.create(this.getDefinition(l) ?? {
                    name: Pe.generateName(),
                    template: n
                }));
                return e.onResolve(i.activate(i, null, 1), (() => {
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
        if (this.li) return this.li;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(t, s);
        const a = new Promise((a => {
            a(e.onResolve(o.canDeactivate?.(c) ?? true, (a => {
                if (true !== a) {
                    i = false;
                    this.li = void 0;
                    if (h) throw Fo(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return e.onResolve(o.deactivate?.(c), (() => e.onResolve(n.deactivate(n, null, 2), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(l ?? "click", this);
                    if (!h && "error" !== t) this.Ot(c); else this.Et(Fo(s, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.li = void 0;
            throw t;
        }));
        this.li = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const s = jo(t);
        return new Promise((t => t(e.onResolve(this.cmp.deactivate?.(DialogCloseResult.create("error", s)), (() => e.onResolve(this.controller.deactivate(this.controller, null, 2), (() => {
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
        t.registerResolver(r.HTMLElement, t.registerResolver(r.Element, t.registerResolver(Ms, new e.InstanceProvider("ElementResolver", i))));
        return t.invoke(n);
    }
    getDefinition(t) {
        const e = C(t) ? t : t?.constructor;
        return Pe.isType(e) ? Pe.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Fo(t, e) {
    const s = new Error(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function jo(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.xt = t;
        this.p = e;
        this.hi = s;
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
        return [ e.IContainer, it, _o ];
    }
    static register(t) {
        t.register(_(Lo, this), Vt.deactivating(Lo, (t => e.onResolve(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return No(new Promise((s => {
            const i = DialogSettings.from(this.hi, t);
            const n = i.container ?? this.xt.createChild();
            s(e.onResolve(i.load(), (t => {
                const s = n.invoke(DialogController);
                n.register(j(qo, s));
                n.register(M(DialogController, (() => {
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
        return Object.assign(new DialogSettings, ...t).ui().ai();
    }
    load() {
        const t = this;
        const s = this.component;
        const i = this.template;
        const n = e.resolveAll(null == s ? void 0 : e.onResolve(s(), (e => {
            t.component = e;
        })), C(i) ? e.onResolve(i(), (e => {
            t.template = e;
        })) : void 0);
        return y(n) ? n.then((() => t)) : t;
    }
    ui() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    ai() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Mo(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function No(t) {
    t.whenClosed = Mo;
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
        _(_o, this).register(t);
    }
}

const Ho = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Ho} display:flex;`;
        this.overlayCss = Ho;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        _(Uo, this).register(t);
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

DefaultDialogDomRenderer.inject = [ it ];

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

function zo(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, Vt.creating((() => t(s.get(_o))))),
        customize(t, s) {
            return zo(t, s ?? e);
        }
    };
}

const Go = zo((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(_(_o, this));
    }
} ]);

const Xo = zo(e.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Ko = e.DI.createInterface((t => t.singleton(WcCustomElementRegistry)));

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
            n = Pe.isType(s) ? Pe.getDefinition(s) : CustomElementDefinition.create(Pe.generateName(), s);
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
                t.registerResolver(c.HTMLElement, t.registerResolver(c.Element, t.registerResolver(Ms, new e.InstanceProvider("ElementProvider", this))));
                const s = l.compile(n, t, {
                    projections: null
                });
                const i = t.invoke(s.Type);
                const r = this.auCtrl = Controller.$el(t, i, this, null, s);
                js(this, s.key, r);
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

WcCustomElementRegistry.inject = [ e.IContainer, it, cs ];

exports.LifecycleFlags = t.LifecycleFlags;

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = Vt;

exports.AtPrefixedTriggerAttributePatternRegistration = vr;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = io;

exports.AttrBindingCommandRegistration = qr;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Ao;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = et;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = oo;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = $;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingBehavior = dt;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingBehaviorFactory = BindingBehaviorFactory;

exports.BindingCommand = Ki;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingInterceptor = BindingInterceptor;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Rr;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = fo;

exports.CaptureBindingCommandRegistration = Lr;

exports.CheckedObserver = CheckedObserver;

exports.Children = Nt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Ur;

exports.ColonPrefixedBindAttributePatternRegistration = wr;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = re;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = po;

exports.CustomElement = Pe;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = mo;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = lr;

exports.DefaultBindingCommandRegistration = Br;

exports.DefaultBindingLanguage = Fr;

exports.DefaultBindingSyntax = Cr;

exports.DefaultComponents = xr;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = Do;

exports.DefaultResources = uo;

exports.DelegateBindingCommandRegistration = Or;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = Go;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = Xo;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = yr;

exports.Else = Else;

exports.ElseRegistration = Wr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Sr;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = ar;

exports.FromViewBindingCommandRegistration = Er;

exports.HooksDefinition = HooksDefinition;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Vs;

exports.IAppTask = Ut;

exports.IAttrMapper = ot;

exports.IAttributeParser = Y;

exports.IAttributePattern = K;

exports.IAuSlotsInfo = ii;

exports.IAurelia = Oo;

exports.IController = Cs;

exports.IDialogController = qo;

exports.IDialogDom = Vo;

exports.IDialogDomRenderer = Uo;

exports.IDialogGlobalSettings = _o;

exports.IDialogService = Lo;

exports.IEventDelegator = ei;

exports.IEventTarget = Ns;

exports.IHistory = Js;

exports.IHydrationContext = As;

exports.IInstruction = ni;

exports.ILifecycleHooks = Ye;

exports.IListenerBehaviorOptions = Bi;

exports.ILocation = Zs;

exports.INode = Ms;

exports.INodeObserverLocatorRegistration = mr;

exports.IPlatform = it;

exports.IProjections = si;

exports.IRenderLocation = Ws;

exports.IRenderer = li;

exports.IRendering = cs;

exports.ISVGAnalyzer = nt;

exports.ISanitizer = or;

exports.IShadowDOMGlobalStyles = We;

exports.IShadowDOMStyles = Ne;

exports.ISyntaxInterpreter = z;

exports.ITemplateCompiler = oi;

exports.ITemplateCompilerHooks = pn;

exports.ITemplateCompilerRegistration = pr;

exports.ITemplateElementFactory = Ji;

exports.IViewFactory = es;

exports.IViewLocator = hs;

exports.IWcElementRegistry = Ko;

exports.IWindow = Ys;

exports.IWorkTracker = _s;

exports.If = If;

exports.IfRegistration = Nr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = xo;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = go;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = vo;

exports.LifecycleHooks = Qe;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = Co;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = hr;

exports.OneTimeBindingCommandRegistration = Ir;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = wo;

exports.RefAttributePatternRegistration = br;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = $r;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = bo;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = Hr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = gr;

exports.SanitizeValueConverterRegistration = jr;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = no;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Ro;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Bo;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = yo;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = So;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Ar;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = ur;

exports.StandardConfiguration = $o;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Vr;

exports.StyleConfiguration = He;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Eo;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = gn;

exports.TemplateControllerRendererRegistration = ko;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = Io;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = fr;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = cr;

exports.ToViewBindingCommandRegistration = Tr;

exports.TriggerBindingCommandRegistration = Pr;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = dr;

exports.TwoWayBindingCommandRegistration = Dr;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = ro;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ValueConverter = gt;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Mr;

exports.Views = os;

exports.Watch = ce;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = zr;

exports.alias = W;

exports.allResources = V;

exports.applyBindingBehavior = Ai;

exports.astEvaluator = vt;

exports.attributePattern = Z;

exports.bindable = I;

exports.bindingBehavior = ct;

exports.bindingCommand = Hi;

exports.capture = Ue;

exports.children = Ft;

exports.coercer = P;

exports.containerless = fe;

exports.convertToRenderLocation = Xs;

exports.createElement = tr;

exports.cssModules = Fe;

exports.customAttribute = Yt;

exports.customElement = ae;

exports.getEffectiveParentNode = zs;

exports.getRef = Fs;

exports.isCustomElementController = ws;

exports.isCustomElementViewModel = bs;

exports.isInstruction = ri;

exports.isRenderLocation = Ks;

exports.lifecycleHooks = ts;

exports.processContent = Le;

exports.registerAliases = H;

exports.renderer = hi;

exports.setEffectiveParentNode = Gs;

exports.setRef = js;

exports.shadowCSS = je;

exports.strict = pe;

exports.templateCompilerHooks = vn;

exports.templateController = Zt;

exports.useShadowDOM = ue;

exports.valueConverter = pt;

exports.view = ls;

exports.watch = oe;
//# sourceMappingURL=index.cjs.map
