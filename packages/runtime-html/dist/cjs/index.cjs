"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/runtime");

var e = require("@aurelia/kernel");

var i = require("@aurelia/metadata");

var s = require("@aurelia/platform");

var n = require("@aurelia/platform-browser");

function r(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function o(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

const l = i.Metadata.getOwn;

const h = i.Metadata.hasOwn;

const a = i.Metadata.define;

const {annotation: c, resource: u} = e.Protocol;

const f = c.keyFor;

const d = u.keyFor;

const p = u.appendTo;

const v = c.appendTo;

const m = c.getKeys;

const x = () => Object.create(null);

const g = Object.prototype.hasOwnProperty;

const w = x();

const b = (t, e, i) => {
    if (true === w[e]) return true;
    if (!C(e)) return false;
    const s = e.slice(0, 5);
    return w[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const y = t => t instanceof Promise;

const k = t => "function" === typeof t;

const C = t => "string" === typeof t;

const A = Object.defineProperty;

function R(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        a(E, BindableDefinition.create(e, t, i), t.constructor, e);
        v(t.constructor, B.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (C(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function S(t) {
    return t.startsWith(E);
}

const E = f("bindable");

const B = Object.freeze({
    name: E,
    keyFrom: t => `${E}:${t}`,
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
                if (C(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!h(E, t, n)) v(t, B.keyFrom(n));
                a(E, e, t, n);
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
        const i = E.length + 1;
        const s = [];
        const n = e.getPrototypeChain(t);
        let r = n.length;
        let o = 0;
        let h;
        let a;
        let c;
        let u;
        while (--r >= 0) {
            c = n[r];
            h = m(c).filter(S);
            a = h.length;
            for (u = 0; u < a; ++u) s[o++] = l(E, c, h[u].slice(i));
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
    static create(i, s, n = {}) {
        return new BindableDefinition(e.firstDefined(n.attribute, e.kebabCase(i)), e.firstDefined(n.callback, `${i}Changed`), e.firstDefined(n.mode, t.BindingMode.toView), e.firstDefined(n.primary, false), e.firstDefined(n.property, i), e.firstDefined(n.set, D(i, s, n)));
    }
}

function I(t, e, i) {
    T.define(t, e);
}

const T = {
    key: f("coercer"),
    define(t, e) {
        a(T.key, t[e].bind(t), t);
    },
    for(t) {
        return l(T.key, t);
    }
};

function D(t, i, s = {}) {
    var n, r, o;
    const l = null !== (r = null !== (n = s.type) && void 0 !== n ? n : Reflect.getMetadata("design:type", i, t)) && void 0 !== r ? r : null;
    if (null == l) return e.noop;
    let h;
    switch (l) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        h = l;
        break;

      default:
        {
            const t = l.coerce;
            h = "function" === typeof t ? t.bind(l) : null !== (o = T.for(l)) && void 0 !== o ? o : e.noop;
            break;
        }
    }
    return h === e.noop ? h : P(h, s.nullable);
}

function P(t, e) {
    return function(i, s) {
        var n;
        if (!(null === s || void 0 === s ? void 0 : s.enableCoercion)) return i;
        return (null !== e && void 0 !== e ? e : (null !== (n = null === s || void 0 === s ? void 0 : s.coerceNullish) && void 0 !== n ? n : false) ? false : true) && null == i ? i : t(i, s);
    };
}

class BindableObserver {
    constructor(t, i, s, n, r, o) {
        this.set = n;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        const l = t[s];
        const h = t.propertyChanged;
        const a = this.i = k(l);
        const c = this.u = k(h);
        const u = this.hs = n !== e.noop;
        let f;
        this.o = t;
        this.k = i;
        this.cb = a ? l : e.noop;
        this.C = c ? h : e.noop;
        if (void 0 === this.cb && !c && !u) this.iO = false; else {
            this.iO = true;
            f = t[i];
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
        const i = this.v;
        if (this.iO) {
            if (Object.is(t, i)) return;
            this.v = t;
            this.ov = i;
            this.f = e;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, i, e);
                if (this.u) this.C.call(this.o, this.k, t, i, e);
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
        $ = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, $, this.f);
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

let $;

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
        const i = this.L;
        if (void 0 === i[t]) i[t] = e; else i[t] += e;
    }
    next(t) {
        const e = this.L;
        let i;
        if (void 0 !== e[t]) {
            i = this.q;
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

const O = e.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        let a = 0;
        let c;
        while (e > a) {
            i = this.rootState;
            s = t[a];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.parse(s, r);
            l = o.length;
            h = t => {
                i = i.append(t, n);
            };
            for (c = 0; l > c; ++c) o[c].eachChar(h);
            i.types = r;
            i.isEndpoint = true;
            ++a;
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
        s = s.filter(L);
        if (s.length > 0) {
            s.sort(q);
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

function L(t) {
    return t.isEndpoint;
}

function q(t, e) {
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

const U = e.DI.createInterface("IAttributePattern");

const _ = e.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, i) {
        this.U = {};
        this._ = t;
        const s = this.V = {};
        const n = i.reduce(((t, e) => {
            const i = j(e.constructor);
            i.forEach((t => s[t.pattern] = e));
            return t.concat(i);
        }), e.emptyArray);
        t.add(n);
    }
    parse(t, e) {
        let i = this.U[t];
        if (null == i) i = this.U[t] = this._.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this.V[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ O, e.all(U) ];

function V(...t) {
    return function e(i) {
        return N.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        e.Registration.singleton(U, this.Type).register(t);
    }
}

const F = d("attribute-pattern");

const M = "attribute-pattern-definitions";

const j = t => e.Protocol.annotation.get(t, M);

const N = Object.freeze({
    name: F,
    definitionAnnotationKey: M,
    define(t, i) {
        const s = new AttributePatternResourceDefinition(i);
        a(F, s, i);
        p(i, F);
        e.Protocol.annotation.set(i, M, t);
        v(i, M);
        return i;
    },
    getPatternDefinitions: j
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

exports.DotSeparatedAttributePattern = r([ V({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], exports.DotSeparatedAttributePattern);

exports.RefAttributePattern = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

exports.RefAttributePattern = r([ V({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], exports.RefAttributePattern);

exports.ColonPrefixedBindAttributePattern = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

exports.ColonPrefixedBindAttributePattern = r([ V({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ V({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let H = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

H = r([ V({
    pattern: "...$attrs",
    symbols: ""
}) ], H);

const W = e.IPlatform;

const z = e.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function G(t) {
    const e = x();
    let i;
    for (i of t) e[i] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.F = Object.assign(x(), {
            a: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: G([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: x(),
            altGlyphDef: G([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: x(),
            altGlyphItem: G([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: x(),
            animate: G([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: G([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: G([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: G([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: G([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: G([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": G([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: G([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: G([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: G([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: G([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: G([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: G([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: G([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: G([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: G([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: G([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: G([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: G([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: G([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: G([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: G([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: G([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: G([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: G([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: G([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: G([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: G([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: G([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: G([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: G([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: G([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: G([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: G([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: G([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: G([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": G([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": G([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": G([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": G([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": G([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: G([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: G([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: G([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: x(),
            hkern: G([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: G([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: G([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: G([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: G([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: G([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": G([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: G([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: G([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: G([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: G([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: G([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: G([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: G([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: G([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: G([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: G([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: G([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: G([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: G([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: G([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: G([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: G([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: G([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: G([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: G([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.M = G([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.j = G([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
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
        return e.Registration.singleton(z, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        var i;
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.M[t.nodeName] && true === this.j[e] || true === (null === (i = this.F[t.nodeName]) || void 0 === i ? void 0 : i[e]);
    }
}

SVGAnalyzer.inject = [ W ];

const X = e.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = x();
        this.H = x();
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
        return [ z ];
    }
    useMapping(t) {
        var e;
        var i;
        let s;
        let n;
        let r;
        let o;
        for (r in t) {
            s = t[r];
            n = null !== (e = (i = this.N)[r]) && void 0 !== e ? e : i[r] = x();
            for (o in s) {
                if (void 0 !== n[o]) throw Y(o, r);
                n[o] = s[o];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.H;
        for (const i in t) {
            if (void 0 !== e[i]) throw Y(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return K(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        var i, s, n;
        return null !== (n = null !== (s = null === (i = this.N[t.nodeName]) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : this.H[e]) && void 0 !== n ? n : b(t, e, this.svg) ? e : null;
    }
}

function K(t, e) {
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

function Y(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

class CallBinding {
    constructor(t, e, i, s, n) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = i;
        this.locator = n;
        this.interceptor = this;
        this.isBound = false;
        this.targetObserver = s.getAccessor(e, i);
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const i = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), t, this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.targetObserver.setValue(null, t, this.target, this.targetProperty);
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, i) {
        return;
    }
}

class AttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.W = false;
        this.f = 0;
        this.o = t;
        this.G = e;
        this.X = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        this.v = t;
        this.W = t !== this.ov;
        if (0 === (64 & e)) this.K();
    }
    K() {
        if (this.W) {
            this.W = false;
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
        for (let i = 0, s = t.length; s > i; ++i) {
            const s = t[i];
            if ("attributes" === s.type && s.attributeName === this.G) {
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
                this.W = false;
                this.f = 0;
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            Z(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) J(this.o, this);
    }
    flush() {
        et = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, et, this.f);
    }
}

t.subscriberCollection(AttributeObserver);

t.withFlushQueue(AttributeObserver);

const Z = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(Q)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const J = (t, e) => {
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

const Q = t => {
    t[0].target.$eMObs.forEach(tt, t);
};

function tt(t) {
    t.handleMutation(this);
}

let et;

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, i) {
        const s = this.b;
        if (t !== s.sourceExpression.evaluate(i, s.$scope, s.locator, null)) s.updateSource(t, i);
    }
}

const {oneTime: it, toView: st, fromView: nt} = t.BindingMode;

const rt = st | it;

const ot = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, i, s, n, r, o) {
        this.sourceExpression = t;
        this.targetAttribute = i;
        this.targetProperty = s;
        this.mode = n;
        this.locator = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = null;
        this.task = null;
        this.targetSubscriber = null;
        this.persistentFlags = 0;
        this.value = void 0;
        this.target = e;
        this.p = o.get(W);
        this.oL = r;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        e |= this.persistentFlags;
        this.sourceExpression.assign(e, this.$scope, this.locator, t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const s = this.mode;
        const n = this.interceptor;
        const r = this.sourceExpression;
        const o = this.$scope;
        const l = this.locator;
        const h = this.targetObserver;
        const a = 0 === (2 & i) && (4 & h.type) > 0;
        let c = false;
        let u;
        if (10082 !== r.$kind || this.obs.count > 1) {
            c = 0 === (s & it);
            if (c) this.obs.version++;
            t = r.evaluate(i, o, l, n);
            if (c) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (a) {
                u = this.task;
                this.task = this.p.domWriteQueue.queueTask((() => {
                    this.task = null;
                    n.updateTarget(t, i);
                }), ot);
                null === u || void 0 === u ? void 0 : u.cancel();
            } else n.updateTarget(t, i);
        }
    }
    $bind(t, e) {
        var i;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.persistentFlags = 97 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        let n = this.targetObserver;
        if (!n) n = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        s = this.sourceExpression;
        const r = this.mode;
        const o = this.interceptor;
        let l = false;
        if (r & rt) {
            l = (r & st) > 0;
            o.updateTarget(this.value = s.evaluate(t, e, this.locator, l ? o : null), t);
        }
        if (r & nt) n.subscribe(null !== (i = this.targetSubscriber) && void 0 !== i ? i : this.targetSubscriber = new BindingTargetSubscriber(o));
        this.isBound = true;
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(AttributeBinding);

const {toView: lt} = t.BindingMode;

const ht = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, i, s, n, r, o) {
        this.interpolation = e;
        this.target = i;
        this.targetProperty = s;
        this.mode = n;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.oL = t;
        this.targetObserver = t.getAccessor(i, s);
        const l = e.expressions;
        const h = this.partBindings = Array(l.length);
        const a = l.length;
        let c = 0;
        for (;a > c; ++c) h[c] = new InterpolationPartBinding(l[c], i, s, r, t, this);
    }
    updateTarget(t, e) {
        const i = this.partBindings;
        const s = this.interpolation.parts;
        const n = i.length;
        let r = "";
        let o = 0;
        if (1 === n) r = s[0] + i[0].value + s[1]; else {
            r = s[0];
            for (;n > o; ++o) r += i[o].value + s[o + 1];
        }
        const l = this.targetObserver;
        const h = 0 === (2 & e) && (4 & l.type) > 0;
        let a;
        if (h) {
            a = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                l.setValue(r, e, this.target, this.targetProperty);
            }), ht);
            null === a || void 0 === a ? void 0 : a.cancel();
            a = null;
        } else l.setValue(r, e, this.target, this.targetProperty);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        const i = this.partBindings;
        const s = i.length;
        let n = 0;
        for (;s > n; ++n) i[n].$bind(t, e);
        this.updateTarget(void 0, t);
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const i = this.partBindings;
        const s = i.length;
        let n = 0;
        for (;s > n; ++n) i[n].interceptor.$unbind(t);
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
    }
}

class InterpolationPartBinding {
    constructor(e, i, s, n, r, o) {
        this.sourceExpression = e;
        this.target = i;
        this.targetProperty = s;
        this.locator = n;
        this.owner = o;
        this.interceptor = this;
        this.mode = t.BindingMode.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = r;
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.sourceExpression;
        const n = this.obs;
        const r = 10082 === s.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & lt) > 0;
            if (o) n.version++;
            t = s.evaluate(i, this.$scope, this.locator, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t, i);
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
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & lt) > 0 ? this.interceptor : null);
        if (this.value instanceof Array) this.observeCollection(this.value);
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

t.connectable(InterpolationPartBinding);

class ContentBinding {
    constructor(e, i, s, n, r, o) {
        this.sourceExpression = e;
        this.target = i;
        this.locator = s;
        this.p = r;
        this.strict = o;
        this.interceptor = this;
        this.mode = t.BindingMode.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    updateTarget(t, e) {
        var i, s;
        const n = this.target;
        const r = this.p.Node;
        const o = this.value;
        this.value = t;
        if (o instanceof r) null === (i = o.parentNode) || void 0 === i ? void 0 : i.removeChild(o);
        if (t instanceof r) {
            n.textContent = "";
            null === (s = n.parentNode) || void 0 === s ? void 0 : s.insertBefore(t, n);
        } else n.textContent = String(t);
    }
    handleChange(t, e, i) {
        var s;
        if (!this.isBound) return;
        const n = this.sourceExpression;
        const r = this.obs;
        const o = 10082 === n.$kind && 1 === r.count;
        let l = false;
        if (!o) {
            l = (this.mode & lt) > 0;
            if (l) r.version++;
            i |= this.strict ? 1 : 0;
            t = n.evaluate(i, this.$scope, this.locator, l ? this.interceptor : null);
            if (l) r.clear();
        }
        if (t === this.value) {
            null === (s = this.task) || void 0 === s ? void 0 : s.cancel();
            this.task = null;
            return;
        }
        const h = 0 === (2 & i);
        if (h) this.queueUpdate(t, i); else this.updateTarget(t, i);
    }
    handleCollectionChange() {
        this.queueUpdate(this.value, 0);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        t |= this.strict ? 1 : 0;
        const i = this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & lt) > 0 ? this.interceptor : null);
        if (i instanceof Array) this.observeCollection(i);
        this.updateTarget(i, t);
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
    }
    queueUpdate(t, e) {
        const i = this.task;
        this.task = this.p.domWriteQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t, e);
        }), ht);
        null === i || void 0 === i ? void 0 : i.cancel();
    }
}

t.connectable(ContentBinding);

class LetBinding {
    constructor(t, e, i, s, n = false) {
        this.sourceExpression = t;
        this.targetProperty = e;
        this.locator = s;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.target = null;
        this.oL = i;
        this.Y = n;
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        const s = this.target;
        const n = this.targetProperty;
        const r = s[n];
        this.obs.version++;
        t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
        this.obs.clear();
        if (t !== r) s[n] = t;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        this.target = this.Y ? e.bindingContext : e.overrideContext;
        const i = this.sourceExpression;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        this.target[this.targetProperty] = this.sourceExpression.evaluate(2 | t, e, this.locator, this.interceptor);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(LetBinding);

const {oneTime: at, toView: ct, fromView: ut} = t.BindingMode;

const ft = ct | at;

const dt = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, e, i, s, n, r, o) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = i;
        this.mode = s;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.targetObserver = void 0;
        this.persistentFlags = 0;
        this.task = null;
        this.targetSubscriber = null;
        this.oL = n;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        e |= this.persistentFlags;
        this.sourceExpression.assign(e, this.$scope, this.locator, t);
    }
    handleChange(t, e, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const s = 0 === (2 & i) && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        let r = false;
        if (10082 !== this.sourceExpression.$kind || n.count > 1) {
            r = this.mode > at;
            if (r) n.version++;
            t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
            if (r) n.clear();
        }
        if (s) {
            pt = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), dt);
            null === pt || void 0 === pt ? void 0 : pt.cancel();
            pt = null;
        } else this.interceptor.updateTarget(t, i);
    }
    $bind(t, e) {
        var i;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 97 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        const n = this.oL;
        const r = this.mode;
        let o = this.targetObserver;
        if (!o) {
            if (r & ut) o = n.getObserver(this.target, this.targetProperty); else o = n.getAccessor(this.target, this.targetProperty);
            this.targetObserver = o;
        }
        s = this.sourceExpression;
        const l = this.interceptor;
        const h = (r & ct) > 0;
        if (r & ft) l.updateTarget(s.evaluate(t, e, this.locator, h ? l : null), t);
        if (r & ut) {
            o.subscribe(null !== (i = this.targetSubscriber) && void 0 !== i ? i : this.targetSubscriber = new BindingTargetSubscriber(l));
            if (!h) l.updateSource(o.getValue(this.target, this.targetProperty), t);
        }
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        pt = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != pt) {
            pt.cancel();
            pt = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

t.connectable(PropertyBinding);

let pt = null;

class RefBinding {
    constructor(t, e, i) {
        this.sourceExpression = t;
        this.target = e;
        this.locator = i;
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
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this);
        this.sourceExpression.assign(t, this.$scope, this.locator, this.target);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        let e = this.sourceExpression;
        if (e.evaluate(t, this.$scope, this.locator, null) === this.target) e.assign(t, this.$scope, this.locator, null);
        e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, i) {
        return;
    }
}

const vt = e.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(e.Registration.instance(vt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const mt = Object.freeze({
    beforeCreate: xt("beforeCreate"),
    hydrating: xt("hydrating"),
    hydrated: xt("hydrated"),
    beforeActivate: xt("beforeActivate"),
    afterActivate: xt("afterActivate"),
    beforeDeactivate: xt("beforeDeactivate"),
    afterDeactivate: xt("afterDeactivate")
});

function xt(t) {
    function e(e, i) {
        if (k(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function gt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        a(bt, ChildrenDefinition.create(e, i), t.constructor, e);
        v(t.constructor, yt.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (C(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function wt(t) {
    return t.startsWith(bt);
}

const bt = f("children-observer");

const yt = Object.freeze({
    name: bt,
    keyFrom: t => `${bt}:${t}`,
    from(...t) {
        const e = {};
        const i = Array.isArray;
        function s(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function n(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function r(t) {
            if (i(t)) t.forEach(s); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => n(e, t)));
        }
        t.forEach(r);
        return e;
    },
    getAll(t) {
        const i = bt.length + 1;
        const s = [];
        const n = e.getPrototypeChain(t);
        let r = n.length;
        let o = 0;
        let h;
        let a;
        let c;
        while (--r >= 0) {
            c = n[r];
            h = m(c).filter(wt);
            a = h.length;
            for (let t = 0; t < a; ++t) s[o++] = l(bt, c, h[t].slice(i));
        }
        return s;
    }
});

const kt = {
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
    static create(t, i = {}) {
        var s;
        return new ChildrenDefinition(e.firstDefined(i.callback, `${t}Changed`), e.firstDefined(i.property, t), null !== (s = i.options) && void 0 !== s ? s : kt, i.query, i.filter, i.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = Ct, r = At, o = Rt, l) {
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
        var t;
        if (!this.observing) {
            this.observing = true;
            this.children = this.get();
            (null !== (t = this.observer) && void 0 !== t ? t : this.observer = new this.controller.host.ownerDocument.defaultView.MutationObserver((() => {
                this.Z();
            }))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = e.emptyArray;
        }
    }
    Z() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0, 0);
    }
    get() {
        return Et(this.controller, this.query, this.filter, this.map);
    }
}

t.subscriberCollection()(ChildrenObserver);

function Ct(t) {
    return t.host.childNodes;
}

function At(t, e, i) {
    return !!i;
}

function Rt(t, e, i) {
    return i;
}

const St = {
    optional: true
};

function Et(t, e, i, s) {
    var n;
    const r = e(t);
    const o = r.length;
    const l = [];
    let h;
    let a;
    let c;
    let u = 0;
    for (;u < o; ++u) {
        h = r[u];
        a = Qt.for(h, St);
        c = null !== (n = null === a || void 0 === a ? void 0 : a.viewModel) && void 0 !== n ? n : null;
        if (i(h, a, c)) l.push(s(h, a, c));
    }
    return l;
}

function Bt(t) {
    return function(e) {
        return $t.define(t, e);
    };
}

function It(t) {
    return function(e) {
        return $t.define(C(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, i, s, n, r, o, l, h) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
        this.defaultBindingMode = n;
        this.isTemplateController = r;
        this.bindables = o;
        this.noMultiBindings = l;
        this.watches = h;
    }
    get type() {
        return 2;
    }
    static create(i, s) {
        let n;
        let r;
        if (C(i)) {
            n = i;
            r = {
                name: n
            };
        } else {
            n = i.name;
            r = i;
        }
        return new CustomAttributeDefinition(s, e.firstDefined(Pt(s, "name"), n), e.mergeArrays(Pt(s, "aliases"), r.aliases, s.aliases), $t.keyFrom(n), e.firstDefined(Pt(s, "defaultBindingMode"), r.defaultBindingMode, s.defaultBindingMode, t.BindingMode.toView), e.firstDefined(Pt(s, "isTemplateController"), r.isTemplateController, s.isTemplateController, false), B.from(s, ...B.getAll(s), Pt(s, "bindables"), s.bindables, r.bindables), e.firstDefined(Pt(s, "noMultiBindings"), r.noMultiBindings, s.noMultiBindings, false), e.mergeArrays(Ut.getAnnotation(s), s.watches));
    }
    register(i) {
        const {Type: s, key: n, aliases: r} = this;
        e.Registration.transient(n, s).register(i);
        e.Registration.aliasTo(n, s).register(i);
        t.registerAliases(r, $t, n, i);
    }
}

const Tt = d("custom-attribute");

const Dt = t => `${Tt}:${t}`;

const Pt = (t, e) => l(f(e), t);

const $t = Object.freeze({
    name: Tt,
    keyFrom: Dt,
    isType(t) {
        return k(t) && h(Tt, t);
    },
    for(t, e) {
        var i;
        return null !== (i = Qe(t, Dt(e))) && void 0 !== i ? i : void 0;
    },
    define(t, e) {
        const i = CustomAttributeDefinition.create(t, e);
        a(Tt, i, i.Type);
        a(Tt, i, i);
        p(e, Tt);
        return i.Type;
    },
    getDefinition(t) {
        const e = l(Tt, t);
        if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        a(f(e), i, t);
    },
    getAnnotation: Pt
});

function Ot(t, e) {
    if (!t) throw new Error(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!k(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!k(null === r || void 0 === r ? void 0 : r.value)) throw new Error(`AUR0774:${String(n)}`);
        Ut.add(l, h);
        if ($t.isType(l)) $t.getDefinition(l).watches.push(h);
        if (Qt.isType(l)) Qt.getDefinition(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Lt = e.emptyArray;

const qt = f("watch");

const Ut = Object.freeze({
    name: qt,
    add(t, e) {
        let i = l(qt, t);
        if (null == i) a(qt, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        var e;
        return null !== (e = l(qt, t)) && void 0 !== e ? e : Lt;
    }
});

function _t(t) {
    return function(e) {
        return Qt.define(t, e);
    };
}

function Vt(t) {
    if (void 0 === t) return function(t) {
        Zt(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!k(t)) return function(e) {
        Zt(e, "shadowOptions", t);
    };
    Zt(t, "shadowOptions", {
        mode: "open"
    });
}

function Ft(t) {
    if (void 0 === t) return function(t) {
        Zt(t, "containerless", true);
    };
    Zt(t, "containerless", true);
}

const Mt = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, a, c, u, f, d, p, v, m, x, g, w, b) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
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
        this.isStrictBinding = v;
        this.shadowOptions = m;
        this.hasSlots = x;
        this.enhance = g;
        this.watches = w;
        this.processContent = b;
    }
    get type() {
        return 1;
    }
    static create(t, i = null) {
        if (null === i) {
            const s = t;
            if (C(s)) throw new Error(`AUR0761:${t}`);
            const n = e.fromDefinitionOrDefault("name", s, Yt);
            if (k(s.Type)) i = s.Type; else i = Qt.generateType(e.pascalCase(n));
            return new CustomElementDefinition(i, n, e.mergeArrays(s.aliases), e.fromDefinitionOrDefault("key", s, (() => Qt.keyFrom(n))), e.fromDefinitionOrDefault("cache", s, Nt), e.fromDefinitionOrDefault("capture", s, Wt), e.fromDefinitionOrDefault("template", s, Ht), e.mergeArrays(s.instructions), e.mergeArrays(s.dependencies), e.fromDefinitionOrDefault("injectable", s, Ht), e.fromDefinitionOrDefault("needsCompile", s, zt), e.mergeArrays(s.surrogates), B.from(i, s.bindables), yt.from(s.childrenObservers), e.fromDefinitionOrDefault("containerless", s, Wt), e.fromDefinitionOrDefault("isStrictBinding", s, Wt), e.fromDefinitionOrDefault("shadowOptions", s, Ht), e.fromDefinitionOrDefault("hasSlots", s, Wt), e.fromDefinitionOrDefault("enhance", s, Wt), e.fromDefinitionOrDefault("watches", s, Gt), e.fromAnnotationOrTypeOrDefault("processContent", i, Ht));
        }
        if (C(t)) return new CustomElementDefinition(i, t, e.mergeArrays(Jt(i, "aliases"), i.aliases), Qt.keyFrom(t), e.fromAnnotationOrTypeOrDefault("cache", i, Nt), e.fromAnnotationOrTypeOrDefault("capture", i, Wt), e.fromAnnotationOrTypeOrDefault("template", i, Ht), e.mergeArrays(Jt(i, "instructions"), i.instructions), e.mergeArrays(Jt(i, "dependencies"), i.dependencies), e.fromAnnotationOrTypeOrDefault("injectable", i, Ht), e.fromAnnotationOrTypeOrDefault("needsCompile", i, zt), e.mergeArrays(Jt(i, "surrogates"), i.surrogates), B.from(i, ...B.getAll(i), Jt(i, "bindables"), i.bindables), yt.from(...yt.getAll(i), Jt(i, "childrenObservers"), i.childrenObservers), e.fromAnnotationOrTypeOrDefault("containerless", i, Wt), e.fromAnnotationOrTypeOrDefault("isStrictBinding", i, Wt), e.fromAnnotationOrTypeOrDefault("shadowOptions", i, Ht), e.fromAnnotationOrTypeOrDefault("hasSlots", i, Wt), e.fromAnnotationOrTypeOrDefault("enhance", i, Wt), e.mergeArrays(Ut.getAnnotation(i), i.watches), e.fromAnnotationOrTypeOrDefault("processContent", i, Ht));
        const s = e.fromDefinitionOrDefault("name", t, Yt);
        return new CustomElementDefinition(i, s, e.mergeArrays(Jt(i, "aliases"), t.aliases, i.aliases), Qt.keyFrom(s), e.fromAnnotationOrDefinitionOrTypeOrDefault("cache", t, i, Nt), e.fromAnnotationOrDefinitionOrTypeOrDefault("capture", t, i, Wt), e.fromAnnotationOrDefinitionOrTypeOrDefault("template", t, i, Ht), e.mergeArrays(Jt(i, "instructions"), t.instructions, i.instructions), e.mergeArrays(Jt(i, "dependencies"), t.dependencies, i.dependencies), e.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", t, i, Ht), e.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", t, i, zt), e.mergeArrays(Jt(i, "surrogates"), t.surrogates, i.surrogates), B.from(i, ...B.getAll(i), Jt(i, "bindables"), i.bindables, t.bindables), yt.from(...yt.getAll(i), Jt(i, "childrenObservers"), i.childrenObservers, t.childrenObservers), e.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", t, i, Wt), e.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", t, i, Wt), e.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", t, i, Ht), e.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", t, i, Wt), e.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", t, i, Wt), e.mergeArrays(t.watches, Ut.getAnnotation(i), i.watches), e.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", t, i, Ht));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Mt.has(t)) return Mt.get(t);
        const e = CustomElementDefinition.create(t);
        Mt.set(t, e);
        a(Xt, e, e.Type);
        return e;
    }
    register(i) {
        const {Type: s, key: n, aliases: r} = this;
        if (!i.has(n, false)) {
            e.Registration.transient(n, s).register(i);
            e.Registration.aliasTo(n, s).register(i);
            t.registerAliases(r, Qt, n, i);
        }
    }
}

const jt = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Nt = () => 0;

const Ht = () => null;

const Wt = () => false;

const zt = () => true;

const Gt = () => e.emptyArray;

const Xt = d("custom-element");

const Kt = t => `${Xt}:${t}`;

const Yt = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Zt = (t, e, i) => {
    a(f(e), i, t);
};

const Jt = (t, e) => l(f(e), t);

const Qt = Object.freeze({
    name: Xt,
    keyFrom: Kt,
    isType(t) {
        return k(t) && h(Xt, t);
    },
    for(t, e = jt) {
        if (void 0 === e.name && true !== e.searchParents) {
            const i = Qe(t, Xt);
            if (null === i) {
                if (true === e.optional) return null;
                throw new Error(`AUR0762`);
            }
            return i;
        }
        if (void 0 !== e.name) {
            if (true !== e.searchParents) {
                const i = Qe(t, Xt);
                if (null === i) throw new Error(`AUR0763`);
                if (i.is(e.name)) return i;
                return;
            }
            let i = t;
            let s = false;
            while (null !== i) {
                const t = Qe(i, Xt);
                if (null !== t) {
                    s = true;
                    if (t.is(e.name)) return t;
                }
                i = ri(i);
            }
            if (s) return;
            throw new Error(`AUR0764`);
        }
        let i = t;
        while (null !== i) {
            const t = Qe(i, Xt);
            if (null !== t) return t;
            i = ri(i);
        }
        throw new Error(`AUR0765`);
    },
    define(t, e) {
        const i = CustomElementDefinition.create(t, e);
        a(Xt, i, i.Type);
        a(Xt, i, i);
        p(i.Type, Xt);
        return i.Type;
    },
    getDefinition(t) {
        const e = l(Xt, t);
        if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
        return e;
    },
    annotate: Zt,
    getAnnotation: Jt,
    generateName: Yt,
    createInjectable() {
        const t = function(i, s, n) {
            const r = e.DI.getOrCreateAnnotationParamTypes(i);
            r[n] = t;
            return i;
        };
        t.register = function(e) {
            return {
                resolve(e, i) {
                    if (i.has(t, true)) return i.get(t); else return null;
                }
            };
        };
        return t;
    },
    generateType: function() {
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
    }()
});

const te = f("processContent");

function ee(t) {
    return void 0 === t ? function(t, e, i) {
        a(te, ie(t, e), t);
    } : function(e) {
        t = ie(e, t);
        const i = l(Xt, e);
        if (void 0 !== i) i.processContent = t; else a(te, t, e);
        return e;
    };
}

function ie(t, e) {
    if (C(e)) e = t[e];
    if (!k(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.J = {};
        this.tt = 0;
        this.W = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t, e) {
        this.value = t;
        this.W = t !== this.ov;
        if (0 === (64 & e)) this.K();
    }
    K() {
        if (this.W) {
            this.W = false;
            const t = this.value;
            const e = this.J;
            const i = se(t);
            let s = this.tt;
            this.ov = t;
            if (i.length > 0) this.et(i);
            this.tt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!g.call(e, t) || e[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    et(t) {
        const e = this.obj;
        const i = t.length;
        let s = 0;
        let n;
        for (;s < i; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.J[n] = this.tt;
            e.classList.add(n);
        }
    }
}

function se(t) {
    if (C(t)) return ne(t);
    if ("object" !== typeof t) return e.emptyArray;
    if (t instanceof Array) {
        const i = t.length;
        if (i > 0) {
            const e = [];
            let s = 0;
            for (;i > s; ++s) e.push(...se(t[s]));
            return e;
        } else return e.emptyArray;
    }
    const i = [];
    let s;
    for (s in t) if (Boolean(t[s])) if (s.includes(" ")) i.push(...ne(s)); else i.push(s);
    return i;
}

function ne(t) {
    const i = t.match(/\S+/g);
    if (null === i) return e.emptyArray;
    return i;
}

function re(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = $t.define({
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
                this.element.className = se(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ ei ], e));
        t.register(s);
    }
}

function oe(...t) {
    return new ShadowDOMRegistry(t);
}

const le = e.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(W))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const i = t.get(ae);
        const s = t.get(le);
        t.register(e.Registration.instance(he, s.createStyles(this.css, i)));
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

AdoptedStyleSheetsStylesFactory.inject = [ W ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ W ];

const he = e.DI.createInterface("IShadowDOMStyles");

const ae = e.DI.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: e.noop
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

const ce = {
    shadowDOM(t) {
        return mt.beforeCreate(e.IContainer, (i => {
            if (null != t.sharedStyles) {
                const s = i.get(le);
                i.register(e.Registration.instance(ae, s.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ue, exit: fe} = t.ConnectableSwitcher;

const {wrap: de, unwrap: pe} = t.ProxyObservable;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.get = i;
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
            ue(this);
            return this.value = pe(this.get.call(void 0, this.useProxy ? de(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            fe(this);
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
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const e = this.expression;
        const i = this.obj;
        const s = this.value;
        const n = 10082 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = e.evaluate(0, this.scope, this.locator, this);
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
        this.value = this.expression.evaluate(0, this.scope, this.locator, this);
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

t.connectable(ExpressionWatcher);

const ve = e.DI.createInterface("ILifecycleHooks");

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
    static fromCallback(t, e) {
        const i = class {
            constructor() {
                this[t] = e;
            }
        };
        return new LifecycleHooksDefinition(i, new Set([ t ]));
    }
    register(t) {
        e.Registration.singleton(ve, this.Type).register(t);
    }
}

const me = new WeakMap;

const xe = f("lifecycle-hooks");

const ge = `${xe}:callback`;

const we = Object.freeze({
    name: xe,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        a(xe, i, e);
        p(e, xe);
        return i.Type;
    },
    fromCallback(t, e) {
        return LifecycleHooksDefinition.fromCallback(t, e);
    },
    add(t, e, i) {
        var s;
        let n = l(t, ge);
        if (void 0 === n) a(ge, n = {}, t);
        (null !== (s = n[e]) && void 0 !== s ? s : n[e] = []).push(i);
    },
    resolve(t) {
        let e = me.get(t);
        if (void 0 === e) {
            me.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(ve) : t.has(ve, false) ? i.getAll(ve).concat(t.getAll(ve)) : i.getAll(ve);
            let n;
            let r;
            let o;
            let h;
            let a;
            for (n of s) {
                r = l(xe, n.constructor);
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

function be() {
    return function t(e) {
        return we.define({}, e);
    };
}

const ye = e.DI.createInterface("IViewFactory");

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

const ke = new WeakSet;

function Ce(t) {
    return !ke.has(t);
}

function Ae(t) {
    ke.add(t);
    return CustomElementDefinition.create(t);
}

const Re = d("views");

const Se = Object.freeze({
    name: Re,
    has(t) {
        return k(t) && (h(Re, t) || "$views" in t);
    },
    get(t) {
        if (k(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Ce).map(Ae);
            for (const e of i) Se.add(t, e);
        }
        let e = l(Re, t);
        if (void 0 === e) a(Re, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = l(Re, t);
        if (void 0 === s) a(Re, s = [ i ], t); else s.push(i);
        return s;
    }
});

function Ee(t) {
    return function(e) {
        Se.add(e, t);
    };
}

const Be = e.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.it = new WeakMap;
        this.st = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Se.has(t.constructor) ? Se.get(t.constructor) : [];
            const s = k(e) ? e(t, i) : this.nt(i, e);
            return this.rt(t, i, s);
        }
        return null;
    }
    rt(t, e, i) {
        let s = this.it.get(t);
        let n;
        if (void 0 === s) {
            s = {};
            this.it.set(t, s);
        } else n = s[i];
        if (void 0 === n) {
            const r = this.ot(t, e, i);
            n = Qt.define(Qt.getDefinition(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[i] = n;
        }
        return n;
    }
    ot(e, i, s) {
        let n = this.st.get(e.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.st.set(e.constructor, n);
        } else r = n[s];
        if (void 0 === r) {
            r = Qt.define(this.lt(i, s), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(e, i, s) {
                    const n = this.viewModel;
                    e.scope = t.Scope.fromParent(e.scope, n);
                    if (void 0 !== n.define) return n.define(e, i, s);
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
            if ("binding" in e) o.binding = function t(e, i, s) {
                return this.viewModel.binding(e, i, s);
            };
            if ("bound" in e) o.bound = function t(e, i, s) {
                return this.viewModel.bound(e, i, s);
            };
            if ("attaching" in e) o.attaching = function t(e, i, s) {
                return this.viewModel.attaching(e, i, s);
            };
            if ("attached" in e) o.attached = function t(e, i) {
                return this.viewModel.attached(e, i);
            };
            if ("detaching" in e) o.detaching = function t(e, i, s) {
                return this.viewModel.detaching(e, i, s);
            };
            if ("unbinding" in e) o.unbinding = function t(e, i, s) {
                return this.viewModel.unbinding(e, i, s);
            };
            if ("dispose" in e) o.dispose = function t() {
                this.viewModel.dispose();
            };
            n[s] = r;
        }
        return r;
    }
    nt(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    lt(t, e) {
        const i = t.find((t => t.name === e));
        if (void 0 === i) throw new Error(`Could not find view: ${e}`);
        return i;
    }
}

const Ie = e.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ht = new WeakMap;
        this.ct = new WeakMap;
        this.ut = (this.ft = t.root).get(W);
        this.dt = new FragmentNodeSequence(this.ut, this.ut.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.ft.getAll(bi, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), x()) : this.rs;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ht;
            const n = e.get(wi);
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
        if (true === t.enhance) return new FragmentNodeSequence(this.ut, t.template);
        let e;
        const i = this.ct;
        if (i.has(t)) e = i.get(t); else {
            const s = this.ut;
            const n = s.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof s.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (C(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            i.set(t, e);
        }
        return null == e ? this.dt : new FragmentNodeSequence(this.ut, e.cloneNode(true));
    }
    render(t, e, i, s) {
        const n = i.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw new Error(`AUR0757:${o}<>${n.length}`);
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
                r[u.type].render(t, f, u);
                ++h;
            }
            ++l;
        }
        if (void 0 !== s && null !== s) {
            c = i.surrogates;
            if ((a = c.length) > 0) {
                h = 0;
                while (a > h) {
                    u = c[h];
                    r[u.type].render(t, s, u);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ e.IContainer ];

var Te;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Te || (Te = {}));

const De = {
    optional: true
};

const Pe = new WeakMap;

class Controller {
    constructor(t, i, s, n, r, o, l) {
        this.container = t;
        this.vmKind = i;
        this.definition = s;
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
        this.xt = e.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.gt = 0;
        this.wt = 0;
        this.bt = 0;
        this.location = l;
        this.r = t.root.get(Ie);
        switch (i) {
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
        var t;
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
            return this.viewFactory.name === (null === (t = this.parent.definition) || void 0 === t ? void 0 : t.name) ? `${this.parent.name}[view]` : `${this.parent.name}[view:${this.viewFactory.name}]`;
        }
    }
    static getCached(t) {
        return Pe.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, i, s, n, r = void 0, o = null) {
        if (Pe.has(i)) return Pe.get(i);
        r = null !== r && void 0 !== r ? r : Qt.getDefinition(i.constructor);
        const l = new Controller(t, 0, r, null, i, s, o);
        const h = t.get(e.optional(We));
        if (r.dependencies.length > 0) t.register(...r.dependencies);
        t.registerResolver(We, new e.InstanceProvider("IHydrationContext", new HydrationContext(l, n, h)));
        Pe.set(i, l);
        if (null == n || false !== n.hydrate) l.hE(n, h);
        return l;
    }
    static $attr(t, e, i, s) {
        if (Pe.has(e)) return Pe.get(e);
        s = null !== s && void 0 !== s ? s : $t.getDefinition(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        Pe.set(e, n);
        n.yt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = null !== e && void 0 !== e ? e : null;
        i.kt();
        return i;
    }
    hE(i, s) {
        const n = this.container;
        const r = this.flags;
        const o = this.viewModel;
        let l = this.definition;
        this.scope = t.Scope.create(o, null, true);
        if (l.watches.length > 0) _e(this, n, l, o);
        Oe(this, l, r, o);
        this.xt = Le(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, s, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = we.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new e.InstanceProvider("definition.injectable", o));
        if (null == i || false !== i.hydrate) {
            this.hS(i);
            this.hC();
        }
    }
    hS(t) {
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Ct = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n} = e;
        const r = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = Qt.for(this.host, De))) this.host = this.container.root.get(W).document.createElement(this.definition.name);
        ti(this.host, Qt.name, this);
        ti(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != r) throw new Error(`AUR0501`);
            ti(this.shadowRoot = this.host.attachShadow(null !== i && void 0 !== i ? i : Me), Qt.name, this);
            ti(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != r) {
            ti(r, Qt.name, this);
            ti(r, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ct, this.host);
        if (void 0 !== this.lifecycleHooks.created) this.lifecycleHooks.created.forEach(Ge, this);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    yt() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) _e(this, this.container, t, e);
        Oe(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = we.resolve(this.container);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    kt() {
        this.Ct = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Ct.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Ct)).findTargets(), this.Ct, void 0);
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
            throw new Error(`AUR0503:${this.name} ${Ne(this.state)}`);
        }
        this.parent = e;
        i |= 2;
        switch (this.vmKind) {
          case 0:
            this.scope.parentScope = null !== s && void 0 !== s ? s : null;
            break;

          case 1:
            this.scope = null !== s && void 0 !== s ? s : null;
            break;

          case 2:
            if (void 0 === s || null === s) throw new Error(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) i |= 1;
        this.$initiator = t;
        this.$flags = i;
        this.At();
        if (this.hooks.hasBinding) {
            const t = this.viewModel.binding(this.$initiator, this.parent, this.$flags);
            if (t instanceof Promise) {
                this.Rt();
                t.then((() => {
                    this.bind();
                })).catch((t => {
                    this.St(t);
                }));
                return this.$promise;
            }
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
                this.bindings[t].$bind(this.$flags, this.scope);
                ++t;
            }
        }
        if (this.hooks.hasBound) {
            i = this.viewModel.bound(this.$initiator, this.parent, this.$flags);
            if (i instanceof Promise) {
                this.Rt();
                i.then((() => {
                    this.isBound = true;
                    this.Et();
                })).catch((t => {
                    this.St(t);
                }));
                return;
            }
        }
        this.isBound = true;
        this.Et();
    }
    Bt(...t) {
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
    Et() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Bt(this.host);
            break;

          case 3:
            this.hostController.Bt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(he, false) ? t.get(he) : t.get(ae);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        if (this.hooks.hasAttaching) {
            const t = this.viewModel.attaching(this.$initiator, this.parent, this.$flags);
            if (t instanceof Promise) {
                this.Rt();
                this.At();
                t.then((() => {
                    this.It();
                })).catch((t => {
                    this.St(t);
                }));
            }
        }
        if (null !== this.children) {
            let t = 0;
            for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        }
        this.It();
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
            throw new Error(`AUR0505:${this.name} ${Ne(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.Tt();
        let s = 0;
        if (this.xt.length) for (;s < this.xt.length; ++s) this.xt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (this.hooks.hasDetaching) {
            const e = this.viewModel.detaching(this.$initiator, this.parent, this.$flags);
            if (e instanceof Promise) {
                this.Rt();
                t.Tt();
                e.then((() => {
                    t.Dt();
                })).catch((e => {
                    t.St(e);
                }));
            }
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.Dt();
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
        this.Pt();
    }
    Rt() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Rt();
        }
    }
    Pt() {
        if (void 0 !== this.$promise) {
            Xe = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Xe();
            Xe = void 0;
        }
    }
    St(t) {
        if (void 0 !== this.$promise) {
            Ke = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ke(t);
            Ke = void 0;
        }
        if (this.$initiator !== this) this.parent.St(t);
    }
    At() {
        ++this.gt;
        if (this.$initiator !== this) this.parent.At();
    }
    It() {
        if (0 === --this.gt) {
            if (this.hooks.hasAttached) {
                Ye = this.viewModel.attached(this.$initiator, this.$flags);
                if (Ye instanceof Promise) {
                    this.Rt();
                    Ye.then((() => {
                        this.state = 2;
                        this.Pt();
                        if (this.$initiator !== this) this.parent.It();
                    })).catch((t => {
                        this.St(t);
                    }));
                    Ye = void 0;
                    return;
                }
                Ye = void 0;
            }
            this.state = 2;
            this.Pt();
        }
        if (this.$initiator !== this) this.parent.It();
    }
    Tt() {
        ++this.wt;
    }
    Dt() {
        if (0 === --this.wt) {
            this.$t();
            this.removeNodes();
            let t = this.$initiator.head;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    Ye = t.viewModel.unbinding(t.$initiator, t.parent, t.$flags);
                    if (Ye instanceof Promise) {
                        this.Rt();
                        this.$t();
                        Ye.then((() => {
                            this.Ot();
                        })).catch((t => {
                            this.St(t);
                        }));
                    }
                    Ye = void 0;
                }
                t = t.next;
            }
            this.Ot();
        }
    }
    $t() {
        ++this.bt;
    }
    Ot() {
        if (0 === --this.bt) {
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
            return $t.getDefinition(this.viewModel.constructor).name === t;

          case 0:
            return Qt.getDefinition(this.viewModel.constructor).name === t;

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
            ti(t, Qt.name, this);
            ti(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            ti(t, Qt.name, this);
            ti(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            ti(t, Qt.name, this);
            ti(t, this.definition.key, this);
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
            this.children.forEach(ze);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            Pe.delete(this.viewModel);
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

function $e(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Oe(e, i, s, n) {
    const r = i.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let i;
        let s;
        let h = 0;
        const a = $e(n);
        const c = e.container;
        const u = c.has(t.ICoercionConfiguration, true) ? c.get(t.ICoercionConfiguration) : null;
        for (;h < l; ++h) {
            i = o[h];
            if (void 0 === a[i]) {
                s = r[i];
                a[i] = new BindableObserver(n, i, s.callback, s.set, e, u);
            }
        }
    }
}

function Le(t, i, s) {
    const n = i.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const e = $e(s);
        const i = [];
        let l;
        let h = 0;
        let a;
        for (;h < o; ++h) {
            l = r[h];
            if (null == e[l]) {
                a = n[l];
                i[i.length] = e[l] = new ChildrenObserver(t, s, l, a.callback, a.query, a.filter, a.map, a.options);
            }
        }
        return i;
    }
    return e.emptyArray;
}

const qe = new Map;

const Ue = e => {
    let i = qe.get(e);
    if (null == i) {
        i = new t.AccessScopeExpression(e, 0);
        qe.set(e, i);
    }
    return i;
};

function _e(e, i, s, n) {
    const r = i.get(t.IObserverLocator);
    const o = i.get(t.IExpressionParser);
    const l = s.watches;
    const h = 0 === e.vmKind ? e.scope : t.Scope.create(n, null, true);
    const a = l.length;
    let c;
    let u;
    let f;
    let d = 0;
    for (;a > d; ++d) {
        ({expression: c, callback: u} = l[d]);
        u = k(u) ? u : Reflect.get(n, u);
        if (!k(u)) throw new Error(`AUR0506:${String(u)}`);
        if (k(c)) e.addBinding(new ComputedWatcher(n, r, c, u, true)); else {
            f = C(c) ? o.parse(c, 8) : Ue(c);
            e.addBinding(new ExpressionWatcher(h, i, r, f, u));
        }
    }
}

function Ve(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Fe(t) {
    return i.isObject(t) && Qt.isType(t.constructor);
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

const Me = {
    mode: "open"
};

exports.ViewModelKind = void 0;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(exports.ViewModelKind || (exports.ViewModelKind = {}));

var je;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(je || (je = {}));

function Ne(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const He = e.DI.createInterface("IController");

const We = e.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function ze(t) {
    t.dispose();
}

function Ge(t) {
    t.instance.created(this.viewModel, this);
}

let Xe;

let Ke;

let Ye;

const Ze = e.DI.createInterface("IAppRoot");

const Je = e.DI.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.Lt = 0;
        this.qt = null;
        this.Pt = null;
        this.Ut = t.scopeTo("WorkTracker");
    }
    start() {
        this.Ut.trace(`start(stack:${this.Lt})`);
        ++this.Lt;
    }
    finish() {
        this.Ut.trace(`finish(stack:${this.Lt})`);
        if (0 === --this.Lt) {
            const t = this.Pt;
            if (null !== t) {
                this.Pt = this.qt = null;
                t();
            }
        }
    }
    wait() {
        this.Ut.trace(`wait(stack:${this.Lt})`);
        if (null === this.qt) {
            if (0 === this.Lt) return Promise.resolve();
            this.qt = new Promise((t => {
                this.Pt = t;
            }));
        }
        return this.qt;
    }
}

WorkTracker.inject = [ e.ILogger ];

class AppRoot {
    constructor(t, i, s, n) {
        this.config = t;
        this.platform = i;
        this.container = s;
        this.controller = void 0;
        this._t = void 0;
        this.host = t.host;
        this.work = s.get(Je);
        n.prepare(this);
        s.registerResolver(i.HTMLElement, s.registerResolver(i.Element, s.registerResolver(ei, new e.InstanceProvider("ElementResolver", t.host))));
        this._t = e.onResolve(this.Vt("beforeCreate"), (() => {
            const i = t.component;
            const n = s.createChild();
            let r;
            if (Qt.isType(i)) r = this.container.get(i); else r = t.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return e.onResolve(this.Vt("hydrating"), (() => {
                l.hS(null);
                return e.onResolve(this.Vt("hydrated"), (() => {
                    l.hC();
                    this._t = void 0;
                }));
            }));
        }));
    }
    activate() {
        return e.onResolve(this._t, (() => e.onResolve(this.Vt("beforeActivate"), (() => e.onResolve(this.controller.activate(this.controller, null, 2, void 0), (() => this.Vt("afterActivate")))))));
    }
    deactivate() {
        return e.onResolve(this.Vt("beforeDeactivate"), (() => e.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.Vt("afterDeactivate")))));
    }
    Vt(t) {
        return e.resolveAll(...this.container.getAll(vt).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
        }), []));
    }
    dispose() {
        var t;
        null === (t = this.controller) || void 0 === t ? void 0 : t.dispose();
    }
}

class Refs {}

function Qe(t, e) {
    var i, s;
    return null !== (s = null === (i = t.$au) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : null;
}

function ti(t, e, i) {
    var s;
    var n;
    (null !== (s = (n = t).$au) && void 0 !== s ? s : n.$au = new Refs)[e] = i;
}

const ei = e.DI.createInterface("INode");

const ii = e.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Ze, true)) return t.get(Ze).host;
    return t.get(W).document;
}))));

const si = e.DI.createInterface("IRenderLocation");

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

const ni = new WeakMap;

function ri(t) {
    if (ni.has(t)) return ni.get(t);
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
        const e = Qt.for(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return ri(e.host);
    }
    return t.parentNode;
}

function oi(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ni.set(i[t], e);
    } else ni.set(t, e);
}

function li(t) {
    if (hi(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function hi(t) {
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
            if ("AU-M" === r.nodeName) o[s] = li(r); else o[s] = r;
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
        if (hi(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const ai = e.DI.createInterface("IWindow", (t => t.callback((t => t.get(W).window))));

const ci = e.DI.createInterface("ILocation", (t => t.callback((t => t.get(ai).location))));

const ui = e.DI.createInterface("IHistory", (t => t.callback((t => t.get(ai).history))));

const fi = {
    [t.DelegationStrategy.capturing]: {
        capture: true
    },
    [t.DelegationStrategy.bubbling]: {
        capture: false
    }
};

class ListenerOptions {
    constructor(t, e, i) {
        this.prevent = t;
        this.strategy = e;
        this.expAsHandler = i;
    }
}

class Listener {
    constructor(t, e, i, s, n, r, o) {
        this.platform = t;
        this.targetEvent = e;
        this.sourceExpression = i;
        this.target = s;
        this.eventDelegator = n;
        this.locator = r;
        this.Ft = o;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        let i = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        delete e.$event;
        if (this.Ft.expAsHandler) {
            if (!k(i)) throw new Error(`Handler of "${this.targetEvent}" event is not a function.`);
            i = i(t);
        }
        if (true !== i && this.Ft.prevent) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(e, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | e);
        }
        this.$scope = i;
        const s = this.sourceExpression;
        if (s.hasBind) s.bind(e, i, this.interceptor);
        if (this.Ft.strategy === t.DelegationStrategy.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(ii), this.target, this.targetEvent, this, fi[this.Ft.strategy]);
        this.isBound = true;
    }
    $unbind(e) {
        if (!this.isBound) return;
        const i = this.sourceExpression;
        if (i.hasUnbind) i.unbind(e, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.Ft.strategy === t.DelegationStrategy.none) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, i) {
        return;
    }
}

const di = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = di) {
        this.Mt = t;
        this.jt = e;
        this.Ft = i;
        this.Nt = 0;
        this.Ht = new Map;
        this.Wt = new Map;
    }
    zt() {
        if (1 === ++this.Nt) this.Mt.addEventListener(this.jt, this, this.Ft);
    }
    Gt() {
        if (0 === --this.Nt) this.Mt.removeEventListener(this.jt, this, this.Ft);
    }
    dispose() {
        if (this.Nt > 0) {
            this.Nt = 0;
            this.Mt.removeEventListener(this.jt, this, this.Ft);
        }
        this.Ht.clear();
        this.Wt.clear();
    }
    Xt(t) {
        const e = true === this.Ft.capture ? this.Ht : this.Wt;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = x());
        return i;
    }
    handleEvent(t) {
        const e = true === this.Ft.capture ? this.Ht : this.Wt;
        const i = t.composedPath();
        if (true === this.Ft.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.jt];
            if (void 0 === n) continue;
            if (k(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, i, s) {
        this.Kt = t;
        this.Yt = e;
        this.jt = i;
        t.zt();
        e[i] = s;
    }
    dispose() {
        this.Kt.Gt();
        this.Yt[this.jt] = void 0;
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

const pi = e.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Zt = x();
    }
    addEventListener(t, e, i, s, n) {
        var r;
        var o;
        const l = null !== (r = (o = this.Zt)[i]) && void 0 !== r ? r : o[i] = new Map;
        let h = l.get(t);
        if (void 0 === h) l.set(t, h = new ListenerTracker(t, i, n));
        return new DelegateSubscription(h, h.Xt(e), i, s);
    }
    dispose() {
        for (const t in this.Zt) {
            const e = this.Zt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const vi = e.DI.createInterface("IProjections");

const mi = e.DI.createInterface("IAuSlotsInfo");

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

const xi = e.DI.createInterface("Instruction");

function gi(t) {
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

const wi = e.DI.createInterface("ITemplateCompiler");

const bi = e.DI.createInterface("IRenderer");

function yi(t) {
    return function i(s) {
        s.register = function(t) {
            e.Registration.singleton(bi, this).register(t);
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

function ki(t, e, i) {
    if (C(e)) return t.parse(e, i);
    return e;
}

function Ci(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function Ai(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Qt.for(t);

      case "view":
        throw new Error(`AUR0750`);

      case "view-model":
        return Qt.for(t).viewModel;

      default:
        {
            const i = $t.for(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = Qt.for(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let Ri = class SetPropertyRenderer {
    render(t, e, i) {
        const s = Ci(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value, 2); else s[i.to] = i.value;
    }
};

Ri = r([ yi("re") ], Ri);

let Si = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ie, W ];
    }
    render(t, i, s) {
        let n;
        let r;
        let o;
        let l;
        const h = s.res;
        const a = s.projections;
        const c = t.container;
        switch (typeof h) {
          case "string":
            n = c.find(Qt, h);
            if (null == n) throw new Error(`AUR0752:${h}@${t["name"]}`);
            break;

          default:
            n = h;
        }
        const u = s.containerless || n.containerless;
        const f = u ? li(i) : null;
        const d = Qi(this.p, t, i, s, f, null == a ? void 0 : new AuSlotsInfo(Object.keys(a)));
        r = n.Type;
        o = d.invoke(r);
        d.registerResolver(r, new e.InstanceProvider(n.key, o));
        l = Controller.$el(d, o, i, s, n, f);
        ti(i, n.key, l);
        const p = this.r.renderers;
        const v = s.props;
        const m = v.length;
        let x = 0;
        let g;
        while (m > x) {
            g = v[x];
            p[g.type].render(t, l, g);
            ++x;
        }
        t.addChild(l);
    }
};

Si = r([ yi("ra") ], Si);

let Ei = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ie, W ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find($t, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = ts(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(t.container, r, e, n);
        ti(e, n.key, o);
        const l = this.r.renderers;
        const h = i.props;
        const a = h.length;
        let c = 0;
        let u;
        while (a > c) {
            u = h[c];
            l[u.type].render(t, o, u);
            ++c;
        }
        t.addChild(o);
    }
};

Ei = r([ yi("rb") ], Ei);

let Bi = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ie, W ];
    }
    render(t, e, i) {
        var s;
        let n = t.container;
        let r;
        switch (typeof i.res) {
          case "string":
            r = n.find($t, i.res);
            if (null == r) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            r = i.res;
        }
        const o = this.r.getViewFactory(i.def, n);
        const l = li(e);
        const h = ts(this.p, r, t, e, i, o, l);
        const a = Controller.$attr(t.container, h, e, r);
        ti(l, r.key, a);
        null === (s = h.link) || void 0 === s ? void 0 : s.call(h, t, a, e, i);
        const c = this.r.renderers;
        const u = i.props;
        const f = u.length;
        let d = 0;
        let p;
        while (f > d) {
            p = u[d];
            c[p.type].render(t, a, p);
            ++d;
        }
        t.addChild(a);
    }
};

Bi = r([ yi("rc") ], Bi);

let Ii = class LetElementRenderer {
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
        let a;
        let c = 0;
        while (o > c) {
            l = s[c];
            h = ki(this.ep, l.from, 8);
            a = new LetBinding(h, l.to, this.oL, r, n);
            t.addBinding(38962 === h.$kind ? Ui(a, h, r) : a);
            ++c;
        }
    }
};

Ii.inject = [ t.IExpressionParser, t.IObserverLocator ];

Ii = r([ yi("rd") ], Ii);

let Ti = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = ki(this.ep, i.from, 8 | 4);
        const n = new CallBinding(s, Ci(e), i.to, this.oL, t.container);
        t.addBinding(38962 === s.$kind ? Ui(n, s, t.container) : n);
    }
};

Ti.inject = [ t.IExpressionParser, t.IObserverLocator ];

Ti = r([ yi("rh") ], Ti);

let Di = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = ki(this.ep, i.from, 8);
        const n = new RefBinding(s, Ai(e, i.to), t.container);
        t.addBinding(38962 === s.$kind ? Ui(n, s, t.container) : n);
    }
};

Di.inject = [ t.IExpressionParser ];

Di = r([ yi("rj") ], Di);

let Pi = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = e.container;
        const r = ki(this.ep, s.from, 1);
        const o = new InterpolationBinding(this.oL, r, Ci(i), s.to, t.BindingMode.toView, n, this.p.domWriteQueue);
        const l = o.partBindings;
        const h = l.length;
        let a = 0;
        let c;
        for (;h > a; ++a) {
            c = l[a];
            if (38962 === c.sourceExpression.$kind) l[a] = Ui(c, c.sourceExpression, n);
        }
        e.addBinding(o);
    }
};

Pi.inject = [ t.IExpressionParser, t.IObserverLocator, W ];

Pi = r([ yi("rf") ], Pi);

let $i = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = ki(this.ep, i.from, 8);
        const n = new PropertyBinding(s, Ci(e), i.to, i.mode, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === s.$kind ? Ui(n, s, t.container) : n);
    }
};

$i.inject = [ t.IExpressionParser, t.IObserverLocator, W ];

$i = r([ yi("rg") ], $i);

let Oi = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = ki(this.ep, s.from, 2);
        const r = new PropertyBinding(n, Ci(i), s.to, t.BindingMode.toView, this.oL, e.container, this.p.domWriteQueue);
        e.addBinding(38962 === n.iterable.$kind ? Ui(r, n.iterable, e.container) : r);
    }
};

Oi.inject = [ t.IExpressionParser, t.IObserverLocator, W ];

Oi = r([ yi("rk") ], Oi);

let Li = 0;

const qi = [];

function Ui(e, i, s) {
    while (i instanceof t.BindingBehaviorExpression) {
        qi[Li++] = i;
        i = i.expression;
    }
    while (Li > 0) {
        const i = qi[--Li];
        const n = s.get(i.behaviorKey);
        if (n instanceof t.BindingBehaviorFactory) e = n.construct(e, i);
    }
    qi.length = 0;
    return e;
}

let _i = class TextBindingRenderer {
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
        const l = ki(this.ep, i.from, 1);
        const h = l.parts;
        const a = l.expressions;
        const c = a.length;
        let u = 0;
        let f = h[0];
        let d;
        let p;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;c > u; ++u) {
            p = a[u];
            d = new ContentBinding(p, r.insertBefore(o.createTextNode(""), n), s, this.oL, this.p, i.strict);
            t.addBinding(38962 === p.$kind ? Ui(d, p, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

_i.inject = [ t.IExpressionParser, t.IObserverLocator, W ];

_i = r([ yi("ha") ], _i);

const Vi = e.DI.createInterface("IListenerBehaviorOptions", (t => t.singleton(ListenerBehaviorOptions)));

class ListenerBehaviorOptions {
    constructor() {
        this.expAsHandler = false;
    }
}

let Fi = class ListenerBindingRenderer {
    constructor(t, e, i, s) {
        this.ep = t;
        this.Jt = e;
        this.p = i;
        this.Qt = s;
    }
    render(t, e, i) {
        const s = ki(this.ep, i.from, 4);
        const n = new Listener(this.p, i.to, s, e, this.Jt, t.container, new ListenerOptions(i.preventDefault, i.strategy, this.Qt.expAsHandler));
        t.addBinding(38962 === s.$kind ? Ui(n, s, t.container) : n);
    }
};

Fi.inject = [ t.IExpressionParser, pi, W, Vi ];

Fi = r([ yi("hb") ], Fi);

let Mi = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Mi = r([ yi("he") ], Mi);

let ji = class SetClassAttributeRenderer {
    render(t, e, i) {
        Gi(e.classList, i.value);
    }
};

ji = r([ yi("hf") ], ji);

let Ni = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Ni = r([ yi("hg") ], Ni);

let Hi = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(e, i, s) {
        const n = ki(this.ep, s.from, 8);
        const r = new PropertyBinding(n, i.style, s.to, t.BindingMode.toView, this.oL, e.container, this.p.domWriteQueue);
        e.addBinding(38962 === n.$kind ? Ui(r, n, e.container) : r);
    }
};

Hi.inject = [ t.IExpressionParser, t.IObserverLocator, W ];

Hi = r([ yi("hd") ], Hi);

let Wi = class AttributeBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(e, i, s) {
        const n = ki(this.ep, s.from, 8);
        const r = new AttributeBinding(n, i, s.attr, s.to, t.BindingMode.toView, this.oL, e.container);
        e.addBinding(38962 === n.$kind ? Ui(r, n, e.container) : r);
    }
};

Wi.inject = [ t.IExpressionParser, t.IObserverLocator ];

Wi = r([ yi("hc") ], Wi);

let zi = class SpreadRenderer {
    constructor(t, e) {
        this.te = t;
        this.r = e;
    }
    static get inject() {
        return [ wi, Ie ];
    }
    render(t, i, s) {
        const n = t.container;
        const r = n.get(We);
        const o = this.r.renderers;
        const l = t => {
            let e = t;
            let i = r;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw new Error("No scope context for spread binding.");
            return i;
        };
        const h = s => {
            var n, r;
            const a = l(s);
            const c = Xi(a);
            const u = this.te.compileSpread(a.controller.definition, null !== (r = null === (n = a.instruction) || void 0 === n ? void 0 : n.captures) && void 0 !== r ? r : e.emptyArray, a.controller.container, i);
            let f;
            for (f of u) switch (f.type) {
              case "hs":
                h(s + 1);
                break;

              case "hp":
                o[f.instructions.type].render(c, Qt.for(i), f.instructions);
                break;

              default:
                o[f.type].render(c, i, f);
            }
            t.addBinding(c);
        };
        h(0);
    }
};

zi = r([ yi("hs") ], zi);

class SpreadBinding {
    constructor(t, e) {
        this.ee = t;
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
    $bind(t, e) {
        var i;
        if (this.isBound) return;
        this.isBound = true;
        const s = this.$scope = null !== (i = this.ie.controller.scope.parentScope) && void 0 !== i ? i : void 0;
        if (null == s) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.ee.forEach((e => e.$bind(t, s)));
    }
    $unbind(t) {
        this.ee.forEach((e => e.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.ee.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Gi(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Xi = t => new SpreadBinding([], t);

const Ki = "IController";

const Yi = "IInstruction";

const Zi = "IRenderLocation";

const Ji = "IAuSlotsInfo";

function Qi(t, i, s, n, r, o) {
    const l = i.container.createChild();
    l.registerResolver(t.HTMLElement, l.registerResolver(t.Element, l.registerResolver(ei, new e.InstanceProvider("ElementResolver", s))));
    l.registerResolver(He, new e.InstanceProvider(Ki, i));
    l.registerResolver(xi, new e.InstanceProvider(Yi, n));
    l.registerResolver(si, null == r ? es : new RenderLocationProvider(r));
    l.registerResolver(ye, is);
    l.registerResolver(mi, null == o ? ss : new e.InstanceProvider(Ji, o));
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

function ts(t, i, s, n, r, o, l, h) {
    const a = s.container.createChild();
    a.registerResolver(t.HTMLElement, a.registerResolver(t.Element, a.registerResolver(ei, new e.InstanceProvider("ElementResolver", n))));
    s = s instanceof Controller ? s : s.ctrl;
    a.registerResolver(He, new e.InstanceProvider(Ki, s));
    a.registerResolver(xi, new e.InstanceProvider(Yi, r));
    a.registerResolver(si, null == l ? es : new e.InstanceProvider(Zi, l));
    a.registerResolver(ye, null == o ? is : new ViewFactoryProvider(o));
    a.registerResolver(mi, null == h ? ss : new e.InstanceProvider(Ji, h));
    return a.invoke(i.Type);
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

const es = new RenderLocationProvider(null);

const is = new ViewFactoryProvider(null);

const ss = new e.InstanceProvider(Ji, new AuSlotsInfo(e.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function ns(t) {
    return function(e) {
        return hs.define(t, e);
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
    static create(t, i) {
        let s;
        let n;
        if (C(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(i, e.firstDefined(ls(i, "name"), s), e.mergeArrays(ls(i, "aliases"), n.aliases, i.aliases), os(s), e.firstDefined(ls(i, "type"), n.type, i.type, null));
    }
    register(i) {
        const {Type: s, key: n, aliases: r} = this;
        e.Registration.singleton(n, s).register(i);
        e.Registration.aliasTo(n, s).register(i);
        t.registerAliases(r, hs, n, i);
    }
}

const rs = d("binding-command");

const os = t => `${rs}:${t}`;

const ls = (t, e) => l(f(e), t);

const hs = Object.freeze({
    name: rs,
    keyFrom: os,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        a(rs, i, i.Type);
        a(rs, i, i);
        p(e, rs);
        return i.Type;
    },
    getAnnotation: ls
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
    build(i) {
        var s;
        const n = i.attr;
        let r = n.target;
        let o = i.attr.rawValue;
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : e.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = e.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, t.BindingMode.oneTime);
    }
};

exports.OneTimeBindingCommand.inject = [ X, t.IExpressionParser ];

exports.OneTimeBindingCommand = r([ ns("one-time") ], exports.OneTimeBindingCommand);

exports.ToViewBindingCommand = class ToViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "to-view";
    }
    build(i) {
        var s;
        const n = i.attr;
        let r = n.target;
        let o = i.attr.rawValue;
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : e.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = e.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, t.BindingMode.toView);
    }
};

exports.ToViewBindingCommand.inject = [ X, t.IExpressionParser ];

exports.ToViewBindingCommand = r([ ns("to-view") ], exports.ToViewBindingCommand);

exports.FromViewBindingCommand = class FromViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "from-view";
    }
    build(i) {
        var s;
        const n = i.attr;
        let r = n.target;
        let o = n.rawValue;
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : e.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = e.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, t.BindingMode.fromView);
    }
};

exports.FromViewBindingCommand.inject = [ X, t.IExpressionParser ];

exports.FromViewBindingCommand = r([ ns("from-view") ], exports.FromViewBindingCommand);

exports.TwoWayBindingCommand = class TwoWayBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "two-way";
    }
    build(i) {
        var s;
        const n = i.attr;
        let r = n.target;
        let o = n.rawValue;
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : e.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = e.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, t.BindingMode.twoWay);
    }
};

exports.TwoWayBindingCommand.inject = [ X, t.IExpressionParser ];

exports.TwoWayBindingCommand = r([ ns("two-way") ], exports.TwoWayBindingCommand);

exports.DefaultBindingCommand = class DefaultBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "bind";
    }
    build(i) {
        var s;
        const n = i.attr;
        const r = i.bindable;
        let o;
        let l;
        let h = n.target;
        let a = n.rawValue;
        if (null == r) {
            l = this.m.isTwoWay(i.node, h) ? t.BindingMode.twoWay : t.BindingMode.toView;
            h = null !== (s = this.m.map(i.node, h)) && void 0 !== s ? s : e.camelCase(h);
        } else {
            if ("" === a && 1 === i.def.type) a = e.camelCase(h);
            o = i.def.defaultBindingMode;
            l = r.mode === t.BindingMode.default || null == r.mode ? null == o || o === t.BindingMode.default ? t.BindingMode.toView : o : r.mode;
            h = r.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(a, 8), h, l);
    }
};

exports.DefaultBindingCommand.inject = [ X, t.IExpressionParser ];

exports.DefaultBindingCommand = r([ ns("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(t) {
        const i = null === t.bindable ? e.camelCase(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(this.ep.parse(t.attr.rawValue, 8 | 4), i);
    }
};

exports.CallBindingCommand.inject = [ t.IExpressionParser ];

exports.CallBindingCommand = r([ ns("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(t) {
        const i = null === t.bindable ? e.camelCase(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(t.attr.rawValue, 2), i);
    }
};

exports.ForBindingCommand.inject = [ t.IExpressionParser ];

exports.ForBindingCommand = r([ ns("for") ], exports.ForBindingCommand);

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

exports.TriggerBindingCommand = r([ ns("trigger") ], exports.TriggerBindingCommand);

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

exports.DelegateBindingCommand = r([ ns("delegate") ], exports.DelegateBindingCommand);

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

exports.CaptureBindingCommand = r([ ns("capture") ], exports.CaptureBindingCommand);

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

exports.AttrBindingCommand = r([ ns("attr") ], exports.AttrBindingCommand);

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

exports.StyleBindingCommand = r([ ns("style") ], exports.StyleBindingCommand);

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

exports.ClassBindingCommand = r([ ns("class") ], exports.ClassBindingCommand);

let as = class RefBindingCommand {
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

as.inject = [ t.IExpressionParser ];

as = r([ ns("ref") ], as);

let cs = class SpreadBindingCommand {
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

cs = r([ ns("...$attrs") ], cs);

const us = e.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const fs = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.se = t.document.createElement("template");
    }
    createTemplate(t) {
        var e;
        if (C(t)) {
            let e = fs[t];
            if (void 0 === e) {
                const i = this.se;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.se = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                fs[t] = e;
            }
            return e.cloneNode(true);
        }
        if ("TEMPLATE" !== t.nodeName) {
            const e = this.p.document.createElement("template");
            e.content.appendChild(t);
            return e;
        }
        null === (e = t.parentNode) || void 0 === e ? void 0 : e.removeChild(t);
        return t.cloneNode(true);
    }
}

TemplateElementFactory.inject = [ W ];

const ds = function(t) {
    function i(t, s, n) {
        e.DI.inject(i)(t, s, n);
    }
    i.$isResolver = true;
    i.resolve = function(e, i) {
        if (i.root === i) return i.getAll(t, false);
        return i.has(t, false) ? i.getAll(t, false).concat(i.root.getAll(t, false)) : i.root.getAll(t, false);
    };
    return i;
};

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return e.Registration.singleton(wi, this).register(t);
    }
    compile(t, i, s) {
        var n, r, o, l;
        const h = CustomElementDefinition.getOrCreate(t);
        if (null === h.template || void 0 === h.template) return h;
        if (false === h.needsCompile) return h;
        null !== s && void 0 !== s ? s : s = ms;
        const a = new CompilationContext(t, i, s, null, null, void 0);
        const c = C(h.template) || !t.enhance ? a.ne.createTemplate(h.template) : h.template;
        const u = "TEMPLATE" === c.nodeName && null != c.content;
        const f = u ? c.content : c;
        const d = i.get(ds(Es));
        const p = d.length;
        let v = 0;
        if (p > 0) while (p > v) {
            null === (r = (n = d[v]).compiling) || void 0 === r ? void 0 : r.call(n, c);
            ++v;
        }
        if (c.hasAttribute(As)) throw new Error(`AUR0701`);
        this.re(f, a);
        this.oe(f, a);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Ps(),
            dependencies: (null !== (o = t.dependencies) && void 0 !== o ? o : e.emptyArray).concat(null !== (l = a.deps) && void 0 !== l ? l : e.emptyArray),
            instructions: a.rows,
            surrogates: u ? this.le(c, a) : e.emptyArray,
            template: c,
            hasSlots: a.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, i, s, n) {
        var r;
        const o = new CompilationContext(t, s, ms, null, null, void 0);
        const l = [];
        const h = o.he(n.nodeName.toLowerCase());
        const a = o.ep;
        const c = i.length;
        let u = 0;
        let f;
        let d = null;
        let p;
        let v;
        let m;
        let x;
        let g;
        let w = null;
        let b;
        let y;
        let k;
        let C;
        for (;c > u; ++u) {
            f = i[u];
            k = f.target;
            C = f.rawValue;
            w = o.ae(f);
            if (null !== w && (1 & w.type) > 0) {
                gs.node = n;
                gs.attr = f;
                gs.bindable = null;
                gs.def = null;
                l.push(w.build(gs));
                continue;
            }
            d = o.ce(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                m = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && ps(C);
                if (y) v = this.ue(n, C, d, o); else {
                    g = m.primary;
                    if (null === w) {
                        b = a.parse(C, 1);
                        v = [ null === b ? new SetPropertyInstruction(C, g.property) : new InterpolationInstruction(b, g.property) ];
                    } else {
                        gs.node = n;
                        gs.attr = f;
                        gs.bindable = g;
                        gs.def = d;
                        v = [ w.build(gs) ];
                    }
                }
                (null !== p && void 0 !== p ? p : p = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(k) ? k : void 0, v));
                continue;
            }
            if (null === w) {
                b = a.parse(C, 1);
                if (null !== h) {
                    m = BindablesInfo.from(h, false);
                    x = m.attrs[k];
                    if (void 0 !== x) {
                        b = a.parse(C, 1);
                        l.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(C, x.property) : new InterpolationInstruction(b, x.property)));
                        continue;
                    }
                }
                if (null != b) l.push(new InterpolationInstruction(b, null !== (r = o.m.map(n, k)) && void 0 !== r ? r : e.camelCase(k))); else switch (k) {
                  case "class":
                    l.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    l.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    l.push(new SetAttributeInstruction(C, k));
                }
            } else {
                if (null !== h) {
                    m = BindablesInfo.from(h, false);
                    x = m.attrs[k];
                    if (void 0 !== x) {
                        gs.node = n;
                        gs.attr = f;
                        gs.bindable = x;
                        gs.def = h;
                        l.push(new SpreadElementPropBindingInstruction(w.build(gs)));
                        continue;
                    }
                }
                gs.node = n;
                gs.attr = f;
                gs.bindable = null;
                gs.def = null;
                l.push(w.build(gs));
            }
        }
        vs();
        if (null != p) return p.concat(l);
        return l;
    }
    le(t, i) {
        var s;
        const n = [];
        const r = t.attributes;
        const o = i.ep;
        let l = r.length;
        let h = 0;
        let a;
        let c;
        let u;
        let f;
        let d = null;
        let p;
        let v;
        let m;
        let x;
        let g = null;
        let w;
        let b;
        let y;
        let k;
        for (;l > h; ++h) {
            a = r[h];
            c = a.name;
            u = a.value;
            f = i.fe.parse(c, u);
            y = f.target;
            k = f.rawValue;
            if (ws[y]) throw new Error(`AUR0702:${c}`);
            g = i.ae(f);
            if (null !== g && (1 & g.type) > 0) {
                gs.node = t;
                gs.attr = f;
                gs.bindable = null;
                gs.def = null;
                n.push(g.build(gs));
                continue;
            }
            d = i.ce(y);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${y}`);
                m = BindablesInfo.from(d, true);
                b = false === d.noMultiBindings && null === g && ps(k);
                if (b) v = this.ue(t, k, d, i); else {
                    x = m.primary;
                    if (null === g) {
                        w = o.parse(k, 1);
                        v = [ null === w ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(w, x.property) ];
                    } else {
                        gs.node = t;
                        gs.attr = f;
                        gs.bindable = x;
                        gs.def = d;
                        v = [ g.build(gs) ];
                    }
                }
                t.removeAttribute(c);
                --h;
                --l;
                (null !== p && void 0 !== p ? p : p = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(y) ? y : void 0, v));
                continue;
            }
            if (null === g) {
                w = o.parse(k, 1);
                if (null != w) {
                    t.removeAttribute(c);
                    --h;
                    --l;
                    n.push(new InterpolationInstruction(w, null !== (s = i.m.map(t, y)) && void 0 !== s ? s : e.camelCase(y)));
                } else switch (c) {
                  case "class":
                    n.push(new SetClassAttributeInstruction(k));
                    break;

                  case "style":
                    n.push(new SetStyleAttributeInstruction(k));
                    break;

                  default:
                    n.push(new SetAttributeInstruction(k, c));
                }
            } else {
                gs.node = t;
                gs.attr = f;
                gs.bindable = null;
                gs.def = null;
                n.push(g.build(gs));
            }
        }
        vs();
        if (null != p) return p.concat(n);
        return n;
    }
    oe(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.de(t, e);

              default:
                return this.pe(t, e);
            }

          case 3:
            return this.ve(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.oe(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    de(i, s) {
        const n = i.attributes;
        const r = n.length;
        const o = [];
        const l = s.ep;
        let h = false;
        let a = 0;
        let c;
        let u;
        let f;
        let d;
        let p;
        let v;
        let m;
        let x;
        for (;r > a; ++a) {
            c = n[a];
            f = c.name;
            d = c.value;
            if ("to-binding-context" === f) {
                h = true;
                continue;
            }
            u = s.fe.parse(f, d);
            v = u.target;
            m = u.rawValue;
            p = s.ae(u);
            if (null !== p) switch (p.name) {
              case "to-view":
              case "bind":
                o.push(new LetBindingInstruction(l.parse(m, 8), e.camelCase(v)));
                continue;

              default:
                throw new Error(`AUR0704:${u.command}`);
            }
            x = l.parse(m, 1);
            o.push(new LetBindingInstruction(null === x ? new t.PrimitiveLiteralExpression(m) : x, e.camelCase(v)));
        }
        s.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.me(i).nextSibling;
    }
    pe(t, i) {
        var s, n, r, o, l, h;
        var a, c;
        const u = t.nextSibling;
        const f = (null !== (s = t.getAttribute("as-element")) && void 0 !== s ? s : t.nodeName).toLowerCase();
        const d = i.he(f);
        const p = !!(null === d || void 0 === d ? void 0 : d.capture);
        const v = p ? [] : e.emptyArray;
        const m = i.ep;
        const x = this.debug ? e.noop : () => {
            t.removeAttribute(C);
            --y;
            --b;
        };
        let g = t.attributes;
        let w;
        let b = g.length;
        let y = 0;
        let k;
        let C;
        let A;
        let R;
        let S;
        let E;
        let B = null;
        let I = false;
        let T;
        let D;
        let P;
        let $;
        let O;
        let L;
        let q;
        let U = null;
        let _;
        let V;
        let F;
        let M;
        let j = true;
        let N = false;
        if ("slot" === f) i.root.hasSlot = true;
        if (null !== d) {
            j = null === (n = d.processContent) || void 0 === n ? void 0 : n.call(d.Type, t, i.p);
            g = t.attributes;
            b = g.length;
        }
        if (i.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
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
            R = i.fe.parse(C, A);
            U = i.ae(R);
            F = R.target;
            M = R.rawValue;
            if (p) {
                if (null != U && 1 & U.type) {
                    x();
                    v.push(R);
                    continue;
                }
                if ("au-slot" !== F) {
                    _ = BindablesInfo.from(d, false);
                    if (null == _.attrs[F] && !(null === (r = i.ce(F)) || void 0 === r ? void 0 : r.isTemplateController)) {
                        x();
                        v.push(R);
                        continue;
                    }
                }
            }
            if (null !== U && 1 & U.type) {
                gs.node = t;
                gs.attr = R;
                gs.bindable = null;
                gs.def = null;
                (null !== S && void 0 !== S ? S : S = []).push(U.build(gs));
                x();
                continue;
            }
            B = i.ce(F);
            if (null !== B) {
                _ = BindablesInfo.from(B, true);
                I = false === B.noMultiBindings && null === U && ps(M);
                if (I) P = this.ue(t, M, B, i); else {
                    V = _.primary;
                    if (null === U) {
                        L = m.parse(M, 1);
                        P = [ null === L ? new SetPropertyInstruction(M, V.property) : new InterpolationInstruction(L, V.property) ];
                    } else {
                        gs.node = t;
                        gs.attr = R;
                        gs.bindable = V;
                        gs.def = B;
                        P = [ U.build(gs) ];
                    }
                }
                x();
                if (B.isTemplateController) (null !== $ && void 0 !== $ ? $ : $ = []).push(new HydrateTemplateController(xs, this.resolveResources ? B : B.name, void 0, P)); else (null !== D && void 0 !== D ? D : D = []).push(new HydrateAttributeInstruction(this.resolveResources ? B : B.name, null != B.aliases && B.aliases.includes(F) ? F : void 0, P));
                continue;
            }
            if (null === U) {
                if (null !== d) {
                    _ = BindablesInfo.from(d, false);
                    T = _.attrs[F];
                    if (void 0 !== T) {
                        L = m.parse(M, 1);
                        (null !== E && void 0 !== E ? E : E = []).push(null == L ? new SetPropertyInstruction(M, T.property) : new InterpolationInstruction(L, T.property));
                        x();
                        continue;
                    }
                }
                L = m.parse(M, 1);
                if (null != L) {
                    x();
                    (null !== S && void 0 !== S ? S : S = []).push(new InterpolationInstruction(L, null !== (o = i.m.map(t, F)) && void 0 !== o ? o : e.camelCase(F)));
                }
                continue;
            }
            x();
            if (null !== d) {
                _ = BindablesInfo.from(d, false);
                T = _.attrs[F];
                if (void 0 !== T) {
                    gs.node = t;
                    gs.attr = R;
                    gs.bindable = T;
                    gs.def = d;
                    (null !== E && void 0 !== E ? E : E = []).push(U.build(gs));
                    continue;
                }
            }
            gs.node = t;
            gs.attr = R;
            gs.bindable = null;
            gs.def = null;
            (null !== S && void 0 !== S ? S : S = []).push(U.build(gs));
        }
        vs();
        if (this.xe(t) && null != S && S.length > 1) this.ge(t, S);
        if (null !== d) {
            q = new HydrateElementInstruction(this.resolveResources ? d : d.name, void 0, null !== E && void 0 !== E ? E : e.emptyArray, null, N, v);
            if ("au-slot" === f) {
                const e = t.getAttribute("name") || "default";
                const s = i.h("template");
                const n = i.we();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.oe(s.content, n);
                q.auSlot = {
                    name: e,
                    fallback: CustomElementDefinition.create({
                        name: Ps(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.be(t, i);
            }
        }
        if (null != S || null != q || null != D) {
            w = e.emptyArray.concat(null !== q && void 0 !== q ? q : e.emptyArray, null !== D && void 0 !== D ? D : e.emptyArray, null !== S && void 0 !== S ? S : e.emptyArray);
            this.me(t);
        }
        let H;
        if (null != $) {
            b = $.length - 1;
            y = b;
            O = $[y];
            let e;
            this.be(t, i);
            if ("TEMPLATE" === t.nodeName) e = t; else {
                e = i.h("template");
                e.content.appendChild(t);
            }
            const s = e;
            const n = i.we(null == w ? [] : [ w ]);
            let r;
            let o;
            let h;
            let c;
            let u;
            let p;
            let v;
            let m;
            let x = 0, g = 0;
            let k = t.firstChild;
            if (false !== j) while (null !== k) if (1 === k.nodeType) {
                r = k;
                k = k.nextSibling;
                o = r.getAttribute("au-slot");
                if (null !== o) {
                    if (null === d) throw new Error(`AUR0706:${f}[${o}]`);
                    if ("" === o) o = "default";
                    r.removeAttribute("au-slot");
                    t.removeChild(r);
                    (null !== (l = (a = null !== c && void 0 !== c ? c : c = {})[o]) && void 0 !== l ? l : a[o] = []).push(r);
                }
            } else k = k.nextSibling;
            if (null != c) {
                h = {};
                for (o in c) {
                    e = i.h("template");
                    u = c[o];
                    for (x = 0, g = u.length; g > x; ++x) {
                        p = u[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) e.content.appendChild(p); else e.content.appendChild(p.content); else e.content.appendChild(p);
                    }
                    m = i.we();
                    this.oe(e.content, m);
                    h[o] = CustomElementDefinition.create({
                        name: Ps(),
                        template: e,
                        instructions: m.rows,
                        needsCompile: false,
                        isStrictBinding: i.root.def.isStrictBinding
                    });
                }
                q.projections = h;
            }
            if (N || null !== d && d.containerless) this.be(t, i);
            H = null === d || !d.containerless && !N && false !== j;
            if (H) if ("TEMPLATE" === t.nodeName) this.oe(t.content, n); else {
                k = t.firstChild;
                while (null !== k) k = this.oe(k, n);
            }
            O.def = CustomElementDefinition.create({
                name: Ps(),
                template: s,
                instructions: n.rows,
                needsCompile: false,
                isStrictBinding: i.root.def.isStrictBinding
            });
            while (y-- > 0) {
                O = $[y];
                e = i.h("template");
                v = i.h("au-m");
                v.classList.add("au");
                e.content.appendChild(v);
                O.def = CustomElementDefinition.create({
                    name: Ps(),
                    template: e,
                    needsCompile: false,
                    instructions: [ [ $[y + 1] ] ],
                    isStrictBinding: i.root.def.isStrictBinding
                });
            }
            i.rows.push([ O ]);
        } else {
            if (null != w) i.rows.push(w);
            let e = t.firstChild;
            let s;
            let n;
            let r = null;
            let o;
            let l;
            let a;
            let u;
            let f;
            let p = 0, v = 0;
            if (false !== j) while (null !== e) if (1 === e.nodeType) {
                s = e;
                e = e.nextSibling;
                n = s.getAttribute("au-slot");
                if (null !== n) {
                    if (null === d) throw new Error(`AUR0706:${t.nodeName}[${n}]`);
                    if ("" === n) n = "default";
                    t.removeChild(s);
                    s.removeAttribute("au-slot");
                    (null !== (h = (c = null !== o && void 0 !== o ? o : o = {})[n]) && void 0 !== h ? h : c[n] = []).push(s);
                }
            } else e = e.nextSibling;
            if (null != o) {
                r = {};
                for (n in o) {
                    u = i.h("template");
                    l = o[n];
                    for (p = 0, v = l.length; v > p; ++p) {
                        a = l[p];
                        if ("TEMPLATE" === a.nodeName) if (a.attributes.length > 0) u.content.appendChild(a); else u.content.appendChild(a.content); else u.content.appendChild(a);
                    }
                    f = i.we();
                    this.oe(u.content, f);
                    r[n] = CustomElementDefinition.create({
                        name: Ps(),
                        template: u,
                        instructions: f.rows,
                        needsCompile: false,
                        isStrictBinding: i.root.def.isStrictBinding
                    });
                }
                q.projections = r;
            }
            if (N || null !== d && d.containerless) this.be(t, i);
            H = null === d || !d.containerless && !N && false !== j;
            if (H && t.childNodes.length > 0) {
                e = t.firstChild;
                while (null !== e) e = this.oe(e, i);
            }
        }
        return u;
    }
    ve(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.me(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    ue(t, e, i, s) {
        const n = BindablesInfo.from(i, true);
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
        for (let v = 0; v < r; ++v) {
            c = e.charCodeAt(v);
            if (92 === c) ++v; else if (58 === c) {
                l = e.slice(a, v);
                while (e.charCodeAt(++v) <= 32) ;
                a = v;
                for (;v < r; ++v) {
                    c = e.charCodeAt(v);
                    if (92 === c) ++v; else if (59 === c) {
                        h = e.slice(a, v);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(a);
                f = s.fe.parse(l, h);
                d = s.ae(f);
                p = n.attrs[f.target];
                if (null == p) throw new Error(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    gs.node = t;
                    gs.attr = f;
                    gs.bindable = p;
                    gs.def = i;
                    o.push(d.build(gs));
                }
                while (v < r && e.charCodeAt(++v) <= 32) ;
                a = v;
                l = void 0;
                h = void 0;
            }
        }
        vs();
        return o;
    }
    re(t, i) {
        var s, n;
        const r = t;
        const o = e.toArray(r.querySelectorAll("template[as-custom-element]"));
        const l = o.length;
        if (0 === l) return;
        if (l === r.childElementCount) throw new Error(`AUR0708`);
        const h = new Set;
        const a = [];
        for (const t of o) {
            if (t.parentNode !== r) throw new Error(`AUR0709`);
            const s = Rs(t, h);
            const n = class LocalTemplate {};
            const o = t.content;
            const l = e.toArray(o.querySelectorAll("bindable"));
            const c = B.for(n);
            const u = new Set;
            const f = new Set;
            for (const t of l) {
                if (t.parentNode !== o) throw new Error(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw new Error(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && f.has(i) || u.has(e)) throw new Error(`AUR0712:${e}+${i}`); else {
                    if (null !== i) f.add(i);
                    u.add(e);
                }
                c.add({
                    property: e,
                    attribute: null !== i && void 0 !== i ? i : void 0,
                    mode: Ss(t)
                });
                const s = t.getAttributeNames().filter((t => !Cs.includes(t)));
                if (s.length > 0) ;
                o.removeChild(t);
            }
            a.push(n);
            i.ye(Qt.define({
                name: s,
                template: t
            }, n));
            r.removeChild(t);
        }
        let c = 0;
        const u = a.length;
        for (;u > c; ++c) Qt.getDefinition(a[c]).dependencies.push(...null !== (s = i.def.dependencies) && void 0 !== s ? s : e.emptyArray, ...null !== (n = i.deps) && void 0 !== n ? n : e.emptyArray);
    }
    xe(t) {
        return "INPUT" === t.nodeName && 1 === bs[t.type];
    }
    ge(t, e) {
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
    me(t) {
        t.classList.add("au");
        return t;
    }
    be(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.me(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(i, s, n, r, o, l) {
        this.hasSlot = false;
        this.ke = x();
        const h = null !== r;
        this.c = s;
        this.root = null === o ? this : o;
        this.def = i;
        this.ci = n;
        this.parent = r;
        this.ne = h ? r.ne : s.get(us);
        this.fe = h ? r.fe : s.get(_);
        this.ep = h ? r.ep : s.get(t.IExpressionParser);
        this.m = h ? r.m : s.get(X);
        this.Ut = h ? r.Ut : s.get(e.ILogger);
        this.p = h ? r.p : s.get(W);
        this.localEls = h ? r.localEls : new Set;
        this.rows = null !== l && void 0 !== l ? l : [];
    }
    ye(t) {
        var e;
        var i;
        (null !== (e = (i = this.root).deps) && void 0 !== e ? e : i.deps = []).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    he(t) {
        return this.c.find(Qt, t);
    }
    ce(t) {
        return this.c.find($t, t);
    }
    we(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ae(t) {
        if (this.root !== this) return this.root.ae(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.ke[e];
        if (void 0 === i) {
            i = this.c.create(hs, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.ke[e] = i;
        }
        return i;
    }
}

function ps(t) {
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

function vs() {
    gs.node = gs.attr = gs.bindable = gs.def = null;
}

const ms = {
    projections: null
};

const xs = {
    name: "unnamed"
};

const gs = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const ws = Object.assign(x(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const bs = {
    checkbox: 1,
    radio: 1
};

const ys = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(e, i) {
        let s = ys.get(e);
        if (null == s) {
            const n = e.bindables;
            const r = x();
            const o = i ? void 0 === e.defaultBindingMode ? t.BindingMode.default : e.defaultBindingMode : t.BindingMode.default;
            let l;
            let h;
            let a = false;
            let c;
            let u;
            for (h in n) {
                l = n[h];
                u = l.attribute;
                if (true === l.primary) {
                    if (a) throw new Error(`AUR0714:${e.name}`);
                    a = true;
                    c = l;
                } else if (!a && null == c) c = l;
                r[u] = BindableDefinition.create(h, e.Type, l);
            }
            if (null == l && i) c = r.value = BindableDefinition.create("value", e.Type, {
                mode: o
            });
            ys.set(e, s = new BindablesInfo(r, n, c));
        }
        return s;
    }
}

var ks;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(ks || (ks = {}));

const Cs = Object.freeze([ "property", "attribute", "mode" ]);

const As = "as-custom-element";

function Rs(t, e) {
    const i = t.getAttribute(As);
    if (null === i || "" === i) throw new Error(`AUR0715`);
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(As);
    }
    return i;
}

function Ss(e) {
    switch (e.getAttribute("mode")) {
      case "oneTime":
        return t.BindingMode.oneTime;

      case "toView":
        return t.BindingMode.toView;

      case "fromView":
        return t.BindingMode.fromView;

      case "twoWay":
        return t.BindingMode.twoWay;

      case "default":
      default:
        return t.BindingMode.default;
    }
}

const Es = e.DI.createInterface("ITemplateCompilerHooks");

const Bs = new WeakMap;

const Is = d("compiler-hooks");

const Ts = Object.freeze({
    name: Is,
    define(t) {
        let e = Bs.get(t);
        if (void 0 === e) {
            Bs.set(t, e = new TemplateCompilerHooksDefinition(t));
            a(Is, e, t);
            p(t, Is);
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
        t.register(e.Registration.singleton(Es, this.Type));
    }
}

const Ds = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Ts.define(t);
    }
};

const Ps = Qt.generateName;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
        this.Ce = new Map;
    }
    bind(t, e, i) {
        this.Ce.set(i, i.mode);
        i.mode = this.mode;
    }
    unbind(t, e, i) {
        i.mode = this.Ce.get(i);
        this.Ce.delete(i);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.BindingMode.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.BindingMode.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.BindingMode.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(t.BindingMode.twoWay);
    }
}

t.bindingBehavior("oneTime")(OneTimeBindingBehavior);

t.bindingBehavior("toView")(ToViewBindingBehavior);

t.bindingBehavior("fromView")(FromViewBindingBehavior);

t.bindingBehavior("twoWay")(TwoWayBindingBehavior);

const $s = 200;

class DebounceBindingBehavior extends t.BindingInterceptor {
    constructor(t, i) {
        super(t, i);
        this.opts = {
            delay: $s
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.locator.get(e.IPlatform).taskQueue;
        if (i.args.length > 0) this.firstArg = i.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, i) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.binding.handleChange(t, e, i);
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
        null === e || void 0 === e ? void 0 : e.cancel();
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const i = Number(this.firstArg.evaluate(t, e, this.locator, null));
            this.opts.delay = isNaN(i) ? $s : i;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        var e;
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        this.binding.$unbind(t);
    }
}

t.bindingBehavior("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Yt = new Map;
        this.Ae = t;
    }
    bind(t, e, i, ...s) {
        if (!("handleChange" in i)) throw new Error(`AUR0817`);
        if (0 === s.length) throw new Error(`AUR0818`);
        this.Yt.set(i, s);
        let n;
        for (n of s) this.Ae.addSignalListener(n, i);
    }
    unbind(t, e, i) {
        const s = this.Yt.get(i);
        this.Yt.delete(i);
        let n;
        for (n of s) this.Ae.removeSignalListener(n, i);
    }
}

SignalBindingBehavior.inject = [ t.ISignaler ];

t.bindingBehavior("signal")(SignalBindingBehavior);

const Os = 200;

class ThrottleBindingBehavior extends t.BindingInterceptor {
    constructor(t, i) {
        super(t, i);
        this.opts = {
            delay: Os
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.locator.get(e.IPlatform);
        this.Re = this.p.taskQueue;
        if (i.args.length > 0) this.firstArg = i.args[0];
    }
    callSource(t) {
        this.Se((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, i) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
            this.lastCall = this.p.performanceNow();
        }
        this.binding.handleChange(t, e, i);
    }
    updateSource(t, e) {
        this.Se((() => this.binding.updateSource(t, e)));
    }
    Se(t) {
        const e = this.opts;
        const i = this.p;
        const s = this.lastCall + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.task;
            e.delay = s;
            this.task = this.Re.queueTask((() => {
                this.lastCall = i.performanceNow();
                this.task = null;
                e.delay = this.delay;
                t();
            }), e);
            null === n || void 0 === n ? void 0 : n.cancel();
        } else {
            this.lastCall = i.performanceNow();
            t();
        }
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const i = Number(this.firstArg.evaluate(t, e, this.locator, null));
            this.opts.delay = this.delay = isNaN(i) ? Os : i;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        var e;
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        super.$unbind(t);
    }
}

t.bindingBehavior("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, i, s) {
        if (null == t) i.removeAttribute(s); else i.setAttribute(s, t);
    }
}

const Ls = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, i) {
        i.targetObserver = Ls;
    }
    unbind(t, e, i) {
        return;
    }
}

t.bindingBehavior("attr")(AttrBindingBehavior);

function qs(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e, i) {
        if (!i.callSource || !i.targetEvent) throw new Error(`AUR0801`);
        i.selfEventCallSource = i.callSource;
        i.callSource = qs;
    }
    unbind(t, e, i) {
        i.callSource = i.selfEventCallSource;
        i.selfEventCallSource = null;
    }
}

t.bindingBehavior("self")(SelfBindingBehavior);

const Us = x();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        var e;
        return null !== (e = Us[t]) && void 0 !== e ? e : Us[t] = new AttributeNSAccessor(t);
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i, s) {
        if (null == t) i.removeAttributeNS(this.ns, s); else i.setAttributeNS(this.ns, s, t);
    }
}

function _s(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Ee = void 0;
        this.Be = void 0;
        this.f = 0;
        this.o = t;
        this.oL = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        const i = this.v;
        if (t === i) return;
        this.v = t;
        this.ov = i;
        this.f = e;
        this.Ie();
        this.Te();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.Te();
    }
    handleChange(t, e, i) {
        this.Te();
    }
    Te() {
        const t = this.v;
        const e = this.o;
        const i = g.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : _s;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (t instanceof Array) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const i = g.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : _s;
        if ("checkbox" === e.type) {
            if (t instanceof Array) {
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
        this.queue.add(this);
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Ie();
    }
    stop() {
        var t, e;
        this.handler.dispose();
        null === (t = this.Ee) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Ee = void 0;
        null === (e = this.Be) || void 0 === e ? void 0 : e.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        Vs = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Vs, this.f);
    }
    Ie() {
        var t, e, i, s, n, r, o;
        const l = this.o;
        null === (n = null !== (t = this.Be) && void 0 !== t ? t : this.Be = null !== (i = null === (e = l.$observers) || void 0 === e ? void 0 : e.model) && void 0 !== i ? i : null === (s = l.$observers) || void 0 === s ? void 0 : s.value) || void 0 === n ? void 0 : n.subscribe(this);
        null === (r = this.Ee) || void 0 === r ? void 0 : r.unsubscribe(this);
        this.Ee = void 0;
        if ("checkbox" === l.type) null === (o = this.Ee = Zs(this.v, this.oL)) || void 0 === o ? void 0 : o.subscribe(this);
    }
}

t.subscriberCollection(CheckedObserver);

t.withFlushQueue(CheckedObserver);

let Vs;

const Fs = {
    childList: true,
    subtree: true,
    characterData: true
};

function Ms(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.W = false;
        this.De = void 0;
        this.Pe = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? js(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.W = t !== this.ov;
        this.$e(t instanceof Array ? t : null);
        if (0 === (64 & e)) this.K();
    }
    K() {
        if (this.W) {
            this.W = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        this.syncOptions();
    }
    syncOptions() {
        var t;
        const e = this.v;
        const i = this.o;
        const s = Array.isArray(e);
        const n = null !== (t = i.matcher) && void 0 !== t ? t : Ms;
        const r = i.options;
        let o = r.length;
        while (o-- > 0) {
            const t = r[o];
            const i = g.call(t, "model") ? t.model : t.value;
            if (s) {
                t.selected = -1 !== e.findIndex((t => !!n(i, t)));
                continue;
            }
            t.selected = !!n(i, e);
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
            const o = t.matcher || Ms;
            const l = [];
            while (n < i) {
                r = e[n];
                if (r.selected) l.push(g.call(r, "model") ? r.model : r.value);
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
                r = g.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Oe() {
        (this.Pe = new this.o.ownerDocument.defaultView.MutationObserver(this.Le.bind(this))).observe(this.o, Fs);
        this.$e(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    qe() {
        var t;
        this.Pe.disconnect();
        null === (t = this.De) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Pe = this.De = void 0;
        this.iO = false;
    }
    $e(t) {
        var e;
        null === (e = this.De) || void 0 === e ? void 0 : e.unsubscribe(this);
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
        Ns = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ns, 0);
    }
}

t.subscriberCollection(SelectValueObserver);

t.withFlushQueue(SelectValueObserver);

function js(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = g.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let Ns;

const Hs = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.W = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t, e) {
        this.value = t;
        this.W = t !== this.ov;
        if (0 === (64 & e)) this.K();
    }
    Ue(t) {
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
    _e(t) {
        let i;
        let s;
        const n = [];
        for (s in t) {
            i = t[s];
            if (null == i) continue;
            if (C(i)) {
                if (s.startsWith(Hs)) {
                    n.push([ s, i ]);
                    continue;
                }
                n.push([ e.kebabCase(s), i ]);
                continue;
            }
            n.push(...this.Ve(i));
        }
        return n;
    }
    Fe(t) {
        const i = t.length;
        if (i > 0) {
            const e = [];
            let s = 0;
            for (;i > s; ++s) e.push(...this.Ve(t[s]));
            return e;
        }
        return e.emptyArray;
    }
    Ve(t) {
        if (C(t)) return this.Ue(t);
        if (t instanceof Array) return this.Fe(t);
        if (t instanceof Object) return this._e(t);
        return e.emptyArray;
    }
    K() {
        if (this.W) {
            this.W = false;
            const t = this.value;
            const e = this.styles;
            const i = this.Ve(t);
            let s;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const a = i.length;
            for (;h < a; ++h) {
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
                if (!g.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && k(e.indexOf) && e.includes("!important")) {
            i = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, i);
    }
    bind(t) {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.W = false;
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
        this.W = true;
        if (!this.handler.config.readonly && 0 === (64 & e)) this.K(e);
    }
    K(t) {
        var e;
        if (this.W) {
            this.W = false;
            this.o[this.k] = null !== (e = this.v) && void 0 !== e ? e : this.handler.config.default;
            if (0 === (2 & t)) this.queue.add(this);
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.o[this.k];
        if (this.ov !== this.v) {
            this.W = false;
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
        Ws = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ws, 0);
    }
}

t.subscriberCollection(ValueAttributeObserver);

t.withFlushQueue(ValueAttributeObserver);

let Ws;

const zs = "http://www.w3.org/1999/xlink";

const Gs = "http://www.w3.org/XML/1998/namespace";

const Xs = "http://www.w3.org/2000/xmlns/";

const Ks = Object.assign(x(), {
    "xlink:actuate": [ "actuate", zs ],
    "xlink:arcrole": [ "arcrole", zs ],
    "xlink:href": [ "href", zs ],
    "xlink:role": [ "role", zs ],
    "xlink:show": [ "show", zs ],
    "xlink:title": [ "title", zs ],
    "xlink:type": [ "type", zs ],
    "xml:lang": [ "lang", Gs ],
    "xml:space": [ "space", Gs ],
    xmlns: [ "xmlns", Xs ],
    "xmlns:xlink": [ "xlink", Xs ]
});

const Ys = new t.PropertyAccessor;

Ys.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        var e;
        this.type = null !== (e = t.type) && void 0 !== e ? e : ValueAttributeObserver;
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
        this.Me = x();
        this.je = x();
        this.Ne = x();
        this.He = x();
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
    static register(i) {
        e.Registration.aliasTo(t.INodeObserverLocator, NodeObserverLocator).register(i);
        e.Registration.singleton(t.INodeObserverLocator, NodeObserverLocator).register(i);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        var s, n;
        const r = this.Me;
        let o;
        if (C(t)) {
            o = null !== (s = r[t]) && void 0 !== s ? s : r[t] = x();
            if (null == o[e]) o[e] = new NodeObserverConfig(i); else Js(t, e);
        } else for (const i in t) {
            o = null !== (n = r[i]) && void 0 !== n ? n : r[i] = x();
            const s = t[i];
            for (e in s) if (null == o[e]) o[e] = new NodeObserverConfig(s[e]); else Js(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.je;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else Js("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else Js("*", t);
    }
    getAccessor(t, i, s) {
        var n;
        if (i in this.He || i in (null !== (n = this.Ne[t.tagName]) && void 0 !== n ? n : e.emptyObject)) return this.getObserver(t, i, s);
        switch (i) {
          case "src":
          case "href":
          case "role":
            return Ls;

          default:
            {
                const e = Ks[i];
                if (void 0 !== e) return AttributeNSAccessor.forNs(e[1]);
                if (b(t, i, this.svgAnalyzer)) return Ls;
                return Ys;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        var n, r;
        let o;
        if (C(t)) {
            o = null !== (i = (n = this.Ne)[t]) && void 0 !== i ? i : n[t] = x();
            o[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            o = null !== (s = (r = this.Ne)[e]) && void 0 !== s ? s : r[e] = x();
            o[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.He[e] = true;
    }
    getObserver(e, i, s) {
        var n, r;
        switch (i) {
          case "role":
            return Ls;

          case "class":
            return new ClassAttributeAccessor(e);

          case "css":
          case "style":
            return new StyleAttributeAccessor(e);
        }
        const o = null !== (r = null === (n = this.Me[e.tagName]) || void 0 === n ? void 0 : n[i]) && void 0 !== r ? r : this.je[i];
        if (null != o) return new o.type(e, i, new EventSubscriber(o), s, this.locator);
        const l = Ks[i];
        if (void 0 !== l) return AttributeNSAccessor.forNs(l[1]);
        if (b(e, i, this.svgAnalyzer)) return Ls;
        if (i in e.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(e, i);
            throw new Error(`AUR0652:${String(i)}`);
        } else return new t.SetterObserver(e, i);
    }
}

NodeObserverLocator.inject = [ e.IServiceLocator, W, t.IDirtyChecker, z ];

function Zs(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Js(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(e, i, s, ...n) {
        if (0 === n.length) throw new Error(`AUR0802`);
        if (s.mode !== t.BindingMode.twoWay && s.mode !== t.BindingMode.fromView) throw new Error(`AUR0803`);
        const r = this.oL.getObserver(s.target, s.targetProperty);
        if (!r.handler) throw new Error(`AUR0804`);
        s.targetObserver = r;
        const o = r.handler;
        r.originalHandler = o;
        r.handler = new EventSubscriber(new NodeObserverConfig({
            default: o.config.default,
            events: n,
            readonly: o.config.readonly
        }));
    }
    unbind(t, e, i) {
        i.targetObserver.handler.dispose();
        i.targetObserver.handler = i.targetObserver.originalHandler;
        i.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ t.IObserverLocator ];

t.bindingBehavior("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.We = t;
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
        this.We.addEventListener("focus", this);
        this.We.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.We;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Xe) this.value = false;
    }
    Ge() {
        const t = this.We;
        const e = this.Xe;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get Xe() {
        return this.We === this.p.document.activeElement;
    }
}

Focus.inject = [ ei, W ];

r([ R({
    mode: t.BindingMode.twoWay
}) ], Focus.prototype, "value", void 0);

Bt("focus")(Focus);

let Qs = class Show {
    constructor(t, e, i) {
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
        this.Ze = this.Je = "hide" !== i.alias;
    }
    binding() {
        this.Ke = true;
        this.update();
    }
    detaching() {
        var t;
        this.Ke = false;
        null === (t = this.Ye) || void 0 === t ? void 0 : t.cancel();
        this.Ye = null;
    }
    valueChanged() {
        if (this.Ke && null === this.Ye) this.Ye = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ R ], Qs.prototype, "value", void 0);

Qs = r([ o(0, ei), o(1, W), o(2, xi) ], Qs);

t.alias("hide")(Qs);

Bt("show")(Qs);

class Portal {
    constructor(t, i, s) {
        this.id = e.nextId("au$component");
        this.strict = false;
        this.p = s;
        this.Qe = s.document.createElement("div");
        this.view = t.create();
        oi(this.view.nodes, i);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.Qe = this.ti();
        this.view.setHost(s);
        return this.ei(t, s, i);
    }
    detaching(t, e, i) {
        return this.ii(t, this.Qe, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const i = this.Qe;
        const s = this.Qe = this.ti();
        if (i === s) return;
        this.view.setHost(s);
        const n = e.onResolve(this.ii(null, s, t.flags), (() => this.ei(null, s, t.flags)));
        if (n instanceof Promise) n.catch((t => {
            throw t;
        }));
    }
    ei(t, i, s) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(i);
        return e.onResolve(null === n || void 0 === n ? void 0 : n.call(r, i, o), (() => this.si(t, i, s)));
    }
    si(t, i, s) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.appendTo(i); else return e.onResolve(r.activate(null !== t && void 0 !== t ? t : r, n, s, n.scope), (() => this.ni(i)));
        return this.ni(i);
    }
    ni(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    ii(t, i, s) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return e.onResolve(null === n || void 0 === n ? void 0 : n.call(r, i, o), (() => this.ri(t, i, s)));
    }
    ri(t, i, s) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.remove(); else return e.onResolve(r.deactivate(t, n, s), (() => this.oi(i)));
        return this.oi(i);
    }
    oi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    ti() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw new Error(`AUR0811`);
            return e.body;
        }
        if (C(i)) {
            let n = e;
            if (C(s)) s = e.querySelector(s);
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
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

Portal.inject = [ ye, si, W ];

r([ R({
    primary: true
}) ], Portal.prototype, "target", void 0);

r([ R({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

r([ R() ], Portal.prototype, "strict", void 0);

r([ R() ], Portal.prototype, "deactivating", void 0);

r([ R() ], Portal.prototype, "activating", void 0);

r([ R() ], Portal.prototype, "deactivated", void 0);

r([ R() ], Portal.prototype, "activated", void 0);

r([ R() ], Portal.prototype, "callbackContext", void 0);

It("portal")(Portal);

class FlagsTemplateController {
    constructor(t, i, s) {
        this.fs = s;
        this.id = e.nextId("au$component");
        this.view = t.create().setLocation(i);
    }
    attaching(t, e, i) {
        const {$controller: s} = this;
        return this.view.activate(t, s, i | this.fs, s.scope);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

class ObserveShallow extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 32);
    }
}

ObserveShallow.inject = [ ye, si ];

It("observe-shallow")(ObserveShallow);

class If {
    constructor(t, i, s) {
        this.ifFactory = t;
        this.location = i;
        this.work = s;
        this.id = e.nextId("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.li = false;
        this.hi = 0;
    }
    attaching(t, i, s) {
        let n;
        const r = this.$controller;
        const o = this.hi++;
        const l = () => !this.li && this.hi === o + 1;
        return e.onResolve(this.pending, (() => {
            var i;
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (i = this.elseFactory) || void 0 === i ? void 0 : i.create();
            if (null == n) return;
            n.setLocation(this.location);
            this.pending = e.onResolve(n.activate(t, r, s, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, i, s) {
        this.li = true;
        return e.onResolve(this.pending, (() => {
            var e;
            this.li = false;
            this.pending = void 0;
            void (null === (e = this.view) || void 0 === e ? void 0 : e.deactivate(t, this.$controller, s));
        }));
    }
    valueChanged(t, i, s) {
        if (!this.$controller.isActive) return;
        t = !!t;
        i = !!i;
        if (t === i) return;
        this.work.start();
        const n = this.view;
        const r = this.$controller;
        const o = this.hi++;
        const l = () => !this.li && this.hi === o + 1;
        let h;
        return e.onResolve(e.onResolve(this.pending, (() => this.pending = e.onResolve(null === n || void 0 === n ? void 0 : n.deactivate(n, r, s), (() => {
            var i;
            if (!l()) return;
            if (t) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (i = this.elseFactory) || void 0 === i ? void 0 : i.create();
            if (null == h) return;
            h.setLocation(this.location);
            return e.onResolve(h.activate(h, r, s, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        })))), (() => this.work.finish()));
    }
    dispose() {
        var t, e;
        null === (t = this.ifView) || void 0 === t ? void 0 : t.dispose();
        null === (e = this.elseView) || void 0 === e ? void 0 : e.dispose();
        this.ifView = this.elseView = this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

If.inject = [ ye, si, Je ];

r([ R ], If.prototype, "value", void 0);

r([ R({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

It("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = e.nextId("au$component");
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error(`AUR0810`);
    }
}

Else.inject = [ ye ];

It({
    name: "else"
})(Else);

function tn(t) {
    t.dispose();
}

const en = [ 38962, 36913 ];

class Repeat {
    constructor(t, i, s) {
        this.l = t;
        this.ai = i;
        this.f = s;
        this.id = e.nextId("au$component");
        this.views = [];
        this.key = void 0;
        this.ui = void 0;
        this.fi = false;
        this.di = false;
        this.pi = null;
        this.vi = void 0;
        this.mi = false;
    }
    binding(t, e, i) {
        const s = this.ai.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.sourceExpression;
                this.xi = r;
                let t = o.iterable;
                while (null != t && en.includes(t.$kind)) {
                    t = t.expression;
                    this.fi = true;
                }
                this.pi = t;
                break;
            }
        }
        this.gi(i);
        const h = o.declaration;
        if (!(this.mi = 90137 === h.$kind || 106521 === h.$kind)) this.local = h.evaluate(i, this.$controller.scope, r.locator, null);
    }
    attaching(t, e, i) {
        this.wi(i);
        return this.bi(t, i);
    }
    detaching(t, e, i) {
        this.gi(i);
        return this.yi(t, i);
    }
    itemsChanged(t) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        t |= i.flags;
        this.gi(t);
        this.wi(t);
        const s = e.onResolve(this.yi(null, t), (() => this.bi(null, t)));
        if (s instanceof Promise) s.catch((t => {
            throw t;
        }));
    }
    handleCollectionChange(i, s) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.fi) {
            if (this.di) return;
            this.di = true;
            this.items = this.forOf.iterable.evaluate(s, n.scope, this.xi.locator, null);
            this.di = false;
            return;
        }
        s |= n.flags;
        this.wi(s);
        if (void 0 === i) {
            const t = e.onResolve(this.yi(null, s), (() => this.bi(null, s)));
            if (t instanceof Promise) t.catch((t => {
                throw t;
            }));
        } else {
            const n = this.views.length;
            t.applyMutationsToIndices(i);
            if (i.deletedItems.length > 0) {
                i.deletedItems.sort(e.compareNumber);
                const t = e.onResolve(this.ki(i, s), (() => this.Ci(n, i, s)));
                if (t instanceof Promise) t.catch((t => {
                    throw t;
                }));
            } else this.Ci(n, i, s);
        }
    }
    gi(e) {
        var i;
        const s = this.$controller.scope;
        let n = this.Ai;
        let r = this.fi;
        if (r) {
            n = this.Ai = null !== (i = this.pi.evaluate(e, s, this.xi.locator, null)) && void 0 !== i ? i : null;
            r = this.fi = !Object.is(this.items, n);
        }
        const o = this.ui;
        if (4 & e) {
            if (void 0 !== o) o.unsubscribe(this);
        } else if (this.$controller.isActive) {
            const e = this.ui = t.getCollectionObserver(r ? n : this.items);
            if (o !== e && o) o.unsubscribe(this);
            if (e) e.subscribe(this);
        }
    }
    wi(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.vi = e;
            return;
        }
        const i = this.forOf;
        if (void 0 === i) return;
        const s = [];
        this.forOf.iterate(t, e, ((t, e, i) => {
            s[e] = i;
        }));
        this.vi = s;
    }
    bi(e, i) {
        let s;
        let n;
        let r;
        let o;
        const {$controller: l, f: h, local: a, l: c, items: u} = this;
        const f = l.scope;
        const d = this.forOf;
        const p = d.count(i, u);
        const v = this.views = Array(p);
        d.iterate(i, u, ((u, m, x) => {
            r = v[m] = h.create().setLocation(c);
            r.nodes.unlink();
            if (this.mi) d.declaration.assign(i, o = t.Scope.fromParent(f, t.BindingContext.create()), this.xi.locator, x); else o = t.Scope.fromParent(f, t.BindingContext.create(a, x));
            ln(o.overrideContext, m, p);
            n = r.activate(null !== e && void 0 !== e ? e : r, l, i, o);
            if (n instanceof Promise) (null !== s && void 0 !== s ? s : s = []).push(n);
        }));
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    yi(t, e) {
        let i;
        let s;
        let n;
        let r = 0;
        const {views: o, $controller: l} = this;
        const h = o.length;
        for (;h > r; ++r) {
            n = o[r];
            n.release();
            s = n.deactivate(null !== t && void 0 !== t ? t : n, l, e);
            if (s instanceof Promise) (null !== i && void 0 !== i ? i : i = []).push(s);
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    ki(t, e) {
        let i;
        let s;
        let n;
        const {$controller: r, views: o} = this;
        const l = t.deletedItems;
        const h = l.length;
        let a = 0;
        for (;h > a; ++a) {
            n = o[l[a]];
            n.release();
            s = n.deactivate(n, r, e);
            if (s instanceof Promise) (null !== i && void 0 !== i ? i : i = []).push(s);
        }
        a = 0;
        let c = 0;
        for (;h > a; ++a) {
            c = l[a] - a;
            o.splice(c, 1);
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    Ci(e, i, s) {
        var n;
        let r;
        let o;
        let l;
        let h;
        let a = 0;
        const {$controller: c, f: u, local: f, vi: d, l: p, views: v} = this;
        const m = i.length;
        for (;m > a; ++a) if (-2 === i[a]) {
            l = u.create();
            v.splice(a, 0, l);
        }
        if (v.length !== m) throw new Error(`AUR0814:${v.length}!=${m}`);
        const x = c.scope;
        const g = i.length;
        t.synchronizeIndices(v, i);
        const w = on(i);
        const b = w.length;
        let y;
        let k = b - 1;
        a = g - 1;
        for (;a >= 0; --a) {
            l = v[a];
            y = v[a + 1];
            l.nodes.link(null !== (n = null === y || void 0 === y ? void 0 : y.nodes) && void 0 !== n ? n : p);
            if (-2 === i[a]) {
                if (this.mi) this.forOf.declaration.assign(s, h = t.Scope.fromParent(x, t.BindingContext.create()), this.xi.locator, d[a]); else h = t.Scope.fromParent(x, t.BindingContext.create(f, d[a]));
                ln(h.overrideContext, a, g);
                l.setLocation(p);
                o = l.activate(l, c, s, h);
                if (o instanceof Promise) (null !== r && void 0 !== r ? r : r = []).push(o);
            } else if (k < 0 || 1 === b || a !== w[k]) {
                ln(l.scope.overrideContext, a, g);
                l.nodes.insertBefore(l.location);
            } else {
                if (e !== g) ln(l.scope.overrideContext, a, g);
                --k;
            }
        }
        if (void 0 !== r) return 1 === r.length ? r[0] : Promise.all(r);
    }
    dispose() {
        this.views.forEach(tn);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ si, He, ye ];

r([ R ], Repeat.prototype, "items", void 0);

It("repeat")(Repeat);

let sn = 16;

let nn = new Int32Array(sn);

let rn = new Int32Array(sn);

function on(t) {
    const e = t.length;
    if (e > sn) {
        sn = e;
        nn = new Int32Array(e);
        rn = new Int32Array(e);
    }
    let i = 0;
    let s = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let a = 0;
    for (;r < e; r++) {
        s = t[r];
        if (-2 !== s) {
            o = nn[i];
            n = t[o];
            if (-2 !== n && n < s) {
                rn[r] = o;
                nn[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                a = l + h >> 1;
                n = t[nn[a]];
                if (-2 !== n && n < s) l = a + 1; else h = a;
            }
            n = t[nn[l]];
            if (s < n || -2 === n) {
                if (l > 0) rn[r] = nn[l - 1];
                nn[l] = r;
            }
        }
    }
    r = ++i;
    const c = new Int32Array(r);
    s = nn[i - 1];
    while (i-- > 0) {
        c[i] = s;
        s = rn[s];
    }
    while (r-- > 0) nn[r] = 0;
    return c;
}

function ln(t, e, i) {
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
}

class With {
    constructor(t, i) {
        this.id = e.nextId("au$component");
        this.id = e.nextId("au$component");
        this.view = t.create().setLocation(i);
    }
    valueChanged(e, i, s) {
        const n = this.$controller;
        const r = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (n.isActive && null != r) {
            o = t.Scope.fromParent(n.scope, void 0 === e ? {} : e);
            for (h = r.length; h > l; ++l) r[l].$bind(2, o);
        }
    }
    attaching(e, i, s) {
        const {$controller: n, value: r} = this;
        const o = t.Scope.fromParent(n.scope, void 0 === r ? {} : r);
        return this.view.activate(e, n, s, o);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

With.inject = [ ye, si ];

r([ R ], With.prototype, "value", void 0);

It("with")(With);

exports.Switch = class Switch {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = e.nextId("au$component");
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
        this.queue((() => this.swap(t, i, this.value)));
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
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, i, this.value)));
    }
    caseChanged(t, e) {
        this.queue((() => this.Ri(t, e)));
    }
    Ri(t, i) {
        const s = t.isMatch(this.value, i);
        const n = this.activeCases;
        const r = n.length;
        if (!s) {
            if (r > 0 && n[0].id === t.id) return this.Si(null, i);
            return;
        }
        if (r > 0 && n[0].id < t.id) return;
        const o = [];
        let l = t.fallThrough;
        if (!l) o.push(t); else {
            const e = this.cases;
            const i = e.indexOf(t);
            for (let t = i, s = e.length; t < s && l; t++) {
                const i = e[t];
                o.push(i);
                l = i.fallThrough;
            }
        }
        return e.onResolve(this.Si(null, i, o), (() => {
            this.activeCases = o;
            return this.Ei(null, i);
        }));
    }
    swap(t, i, s) {
        const n = [];
        let r = false;
        for (const t of this.cases) {
            if (r || t.isMatch(s, i)) {
                n.push(t);
                r = t.fallThrough;
            }
            if (n.length > 0 && !r) break;
        }
        const o = this.defaultCase;
        if (0 === n.length && void 0 !== o) n.push(o);
        return e.onResolve(this.activeCases.length > 0 ? this.Si(t, i, n) : void 0, (() => {
            this.activeCases = n;
            if (0 === n.length) return;
            return this.Ei(t, i);
        }));
    }
    Ei(t, i) {
        const s = this.$controller;
        if (!s.isActive) return;
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        const o = s.scope;
        if (1 === r) return n[0].activate(t, i, o);
        return e.resolveAll(...n.map((e => e.activate(t, i, o))));
    }
    Si(t, i, s = []) {
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        if (1 === r) {
            const e = n[0];
            if (!s.includes(e)) {
                n.length = 0;
                return e.deactivate(t, i);
            }
            return;
        }
        return e.onResolve(e.resolveAll(...n.reduce(((e, n) => {
            if (!s.includes(n)) e.push(n.deactivate(t, i));
            return e;
        }), [])), (() => {
            n.length = 0;
        }));
    }
    queue(t) {
        const i = this.promise;
        let s;
        s = this.promise = e.onResolve(e.onResolve(i, t), (() => {
            if (this.promise === s) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

r([ R ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ It("switch"), o(0, ye), o(1, si) ], exports.Switch);

exports.Case = class Case {
    constructor(t, i, s, n) {
        this.f = t;
        this.Bi = i;
        this.l = s;
        this.id = e.nextId("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Ii = n.config.level <= 1;
        this.Ut = n.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = null === n || void 0 === n ? void 0 : n.viewModel;
        if (r instanceof exports.Switch) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t, e) {
        this.Ut.debug("isMatch()");
        const i = this.value;
        if (Array.isArray(i)) {
            if (void 0 === this.ui) this.ui = this.Ti(e, i);
            return i.includes(t);
        }
        return i === t;
    }
    valueChanged(t, e, i) {
        var s;
        if (Array.isArray(t)) {
            null === (s = this.ui) || void 0 === s ? void 0 : s.unsubscribe(this);
            this.ui = this.Ti(i, t);
        } else if (void 0 !== this.ui) this.ui.unsubscribe(this);
        this.$switch.caseChanged(this, i);
    }
    handleCollectionChange(t, e) {
        this.$switch.caseChanged(this, e);
    }
    activate(t, e, i) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(null !== t && void 0 !== t ? t : s, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(null !== t && void 0 !== t ? t : i, this.$controller, e);
    }
    dispose() {
        var t, e;
        null === (t = this.ui) || void 0 === t ? void 0 : t.unsubscribe(this);
        null === (e = this.view) || void 0 === e ? void 0 : e.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ti(t, e) {
        const i = this.Bi.getArrayObserver(e);
        i.subscribe(this);
        return i;
    }
    accept(t) {
        var e;
        if (true === this.$controller.accept(t)) return true;
        return null === (e = this.view) || void 0 === e ? void 0 : e.accept(t);
    }
};

exports.Case.inject = [ ye, t.IObserverLocator, si, e.ILogger ];

r([ R ], exports.Case.prototype, "value", void 0);

r([ R({
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
    mode: t.BindingMode.oneTime
}) ], exports.Case.prototype, "fallThrough", void 0);

exports.Case = r([ It("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error(`AUR0816`);
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ It("default-case") ], exports.DefaultCase);

exports.PromiseTemplateController = class PromiseTemplateController {
    constructor(t, i, s, n) {
        this.f = t;
        this.l = i;
        this.p = s;
        this.id = e.nextId("au$component");
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = n.scopeTo("promise.resolve");
    }
    link(t, e, i, s) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(i, s, n) {
        const r = this.view;
        const o = this.$controller;
        return e.onResolve(r.activate(i, o, n, this.viewScope = t.Scope.fromParent(o.scope, {})), (() => this.swap(i, n)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, i) {
        var n, r;
        const o = this.value;
        if (!(o instanceof Promise)) {
            this.logger.warn(`The value '${String(o)}' is not a promise. No change will be done.`);
            return;
        }
        const l = this.p.domWriteQueue;
        const h = this.fulfilled;
        const a = this.rejected;
        const c = this.pending;
        const u = this.viewScope;
        let f;
        const d = {
            reusable: false
        };
        const p = () => {
            void e.resolveAll(f = (this.preSettledTask = l.queueTask((() => e.resolveAll(null === h || void 0 === h ? void 0 : h.deactivate(t, i), null === a || void 0 === a ? void 0 : a.deactivate(t, i), null === c || void 0 === c ? void 0 : c.activate(t, i, u))), d)).result.catch((t => {
                if (!(t instanceof s.TaskAbortError)) throw t;
            })), o.then((s => {
                if (this.value !== o) return;
                const n = () => {
                    this.postSettlePromise = (this.postSettledTask = l.queueTask((() => e.resolveAll(null === c || void 0 === c ? void 0 : c.deactivate(t, i), null === a || void 0 === a ? void 0 : a.deactivate(t, i), null === h || void 0 === h ? void 0 : h.activate(t, i, u, s))), d)).result;
                };
                if (1 === this.preSettledTask.status) void f.then(n); else {
                    this.preSettledTask.cancel();
                    n();
                }
            }), (s => {
                if (this.value !== o) return;
                const n = () => {
                    this.postSettlePromise = (this.postSettledTask = l.queueTask((() => e.resolveAll(null === c || void 0 === c ? void 0 : c.deactivate(t, i), null === h || void 0 === h ? void 0 : h.deactivate(t, i), null === a || void 0 === a ? void 0 : a.activate(t, i, u, s))), d)).result;
                };
                if (1 === this.preSettledTask.status) void f.then(n); else {
                    this.preSettledTask.cancel();
                    n();
                }
            })));
        };
        if (1 === (null === (n = this.postSettledTask) || void 0 === n ? void 0 : n.status)) void this.postSettlePromise.then(p); else {
            null === (r = this.postSettledTask) || void 0 === r ? void 0 : r.cancel();
            p();
        }
    }
    detaching(t, e, i) {
        var s, n;
        null === (s = this.preSettledTask) || void 0 === s ? void 0 : s.cancel();
        null === (n = this.postSettledTask) || void 0 === n ? void 0 : n.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

r([ R ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ It("promise"), o(0, ye), o(1, si), o(2, W), o(3, e.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = e.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        hn(t).pending = this;
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
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

r([ R({
    mode: t.BindingMode.toView
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ It("pending"), o(0, ye), o(1, si) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = e.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        hn(t).fulfilled = this;
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
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

r([ R({
    mode: t.BindingMode.fromView
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ It("then"), o(0, ye), o(1, si) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, i) {
        this.f = t;
        this.l = i;
        this.id = e.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        hn(t).rejected = this;
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
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

r([ R({
    mode: t.BindingMode.fromView
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ It("catch"), o(0, ye), o(1, si) ], exports.RejectedTemplateController);

function hn(t) {
    const e = t.parent;
    const i = null === e || void 0 === e ? void 0 : e.viewModel;
    if (i instanceof exports.PromiseTemplateController) return i;
    throw new Error(`AUR0813`);
}

let an = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

an = r([ V({
    pattern: "promise.resolve",
    symbols: ""
}) ], an);

let cn = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

cn = r([ V({
    pattern: "then",
    symbols: ""
}) ], cn);

let un = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

un = r([ V({
    pattern: "catch",
    symbols: ""
}) ], un);

function fn(t, e, i, s) {
    if (C(e)) return dn(t, e, i, s);
    if (Qt.isType(e)) return pn(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Di = i;
        this.Pi = void 0;
    }
    get definition() {
        if (void 0 === this.Pi) this.Pi = CustomElementDefinition.create({
            name: Qt.generateName(),
            template: this.node,
            needsCompile: C(this.node),
            instructions: this.instructions,
            dependencies: this.Di
        });
        return this.Pi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Ie).getViewFactory(this.definition, t.createChild().register(...this.Di));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Di);
    }
}

function dn(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (gi(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) vn(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function pn(t, e, i, s) {
    const n = Qt.getDefinition(e);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const a = n.bindables;
    const c = t.document.createElement(n.name);
    c.className = "au";
    if (!l.includes(e)) l.push(e);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (gi(e)) h.push(e); else if (void 0 === a[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) vn(t, c, s, o, l);
    return new RenderPlan(c, o, l);
}

function vn(t, e, i, s, n) {
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

function mn(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, i, s, n) {
        this.p = t;
        this.$i = i;
        this.Oi = s;
        this.r = n;
        this.id = e.nextId("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Li = void 0;
        this.qi = i.props.reduce(mn, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Li !== s) {
            this.Li = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.ri(this.view, t, i);
    }
    componentChanged(t, i, s) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Li === t) return;
        this.Li = t;
        this.composing = true;
        s |= n.flags;
        const r = e.onResolve(this.ri(this.view, null, s), (() => this.compose(void 0, t, null, s)));
        if (r instanceof Promise) r.catch((t => {
            throw t;
        }));
    }
    compose(t, i, s, n) {
        return e.onResolve(void 0 === t ? e.onResolve(i, (t => this.Ui(t, n))) : t, (t => this.si(this.view = t, s, n)));
    }
    ri(t, e, i) {
        return null === t || void 0 === t ? void 0 : t.deactivate(null !== e && void 0 !== e ? e : t, this.$controller, i);
    }
    si(t, i, s) {
        const {$controller: n} = this;
        return e.onResolve(null === t || void 0 === t ? void 0 : t.activate(null !== i && void 0 !== i ? i : t, n, s, n.scope), (() => {
            this.composing = false;
        }));
    }
    Ui(t, e) {
        const i = this._i(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    _i(t, e) {
        if (!t) return;
        const i = this.Oi.controller.container;
        if ("object" === typeof t) {
            if (xn(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (C(t)) {
            const e = i.find(Qt, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return fn(this.p, t, this.qi, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

AuRender.inject = [ W, xi, We, Ie ];

r([ R ], AuRender.prototype, "component", void 0);

r([ R({
    mode: t.BindingMode.fromView
}) ], AuRender.prototype, "composing", void 0);

_t({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function xn(t) {
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
        this.Vi = void 0;
        this.r = t.get(Ie);
        this.$i = r;
        this.Fi = o;
    }
    static get inject() {
        return [ e.IContainer, He, ei, si, W, xi, e.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Mi;
    }
    get composition() {
        return this.Vi;
    }
    attaching(t, i, s) {
        return this.Mi = e.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Fi.isCurrent(t)) this.Mi = void 0;
        }));
    }
    detaching(t) {
        const i = this.Vi;
        const s = this.Mi;
        this.Fi.invalidate();
        this.Vi = this.Mi = void 0;
        return e.onResolve(s, (() => null === i || void 0 === i ? void 0 : i.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Vi) {
            this.Vi.update(this.model);
            return;
        }
        this.Mi = e.onResolve(this.Mi, (() => e.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Fi.isCurrent(t)) this.Mi = void 0;
        }))));
    }
    queue(t, i) {
        const s = this.Fi;
        const n = this.Vi;
        return e.onResolve(s.create(t), (t => {
            if (s.isCurrent(t)) return e.onResolve(this.compose(t), (r => {
                if (s.isCurrent(t)) return e.onResolve(r.activate(i), (() => {
                    if (s.isCurrent(t)) {
                        this.Vi = r;
                        return e.onResolve(null === n || void 0 === n ? void 0 : n.deactivate(i), (() => t));
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
    compose(i) {
        let s;
        let n;
        let r;
        const {view: o, viewModel: l, model: h} = i.change;
        const {c: a, host: c, $controller: u, l: f} = this;
        const d = this.getDef(l);
        const p = a.createChild();
        const v = null == f ? c.parentNode : f.parentNode;
        if (null !== d) {
            if (d.containerless) throw new Error(`AUR0806`);
            if (null == f) {
                n = c;
                r = () => {};
            } else {
                n = v.insertBefore(this.p.document.createElement(d.name), f);
                r = () => {
                    n.remove();
                };
            }
            s = this.getVm(p, l, n);
        } else {
            n = null == f ? c : f;
            s = this.getVm(p, l, n);
        }
        const m = () => {
            if (null !== d) {
                const t = Controller.$el(p, s, n, {
                    projections: this.$i.projections
                }, d);
                return new CompositionController(t, (e => t.activate(null !== e && void 0 !== e ? e : t, u, 2, u.scope.parentScope)), (i => e.onResolve(t.deactivate(null !== i && void 0 !== i ? i : t, u, 4), r)), (t => {
                    var e;
                    return null === (e = s.activate) || void 0 === e ? void 0 : e.call(s, t);
                }), i);
            } else {
                const e = CustomElementDefinition.create({
                    name: Qt.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(e, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? t.Scope.fromParent(this.parent.scope, s) : t.Scope.create(s);
                if (hi(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(null !== t && void 0 !== t ? t : l, u, 2, h)), (t => l.deactivate(null !== t && void 0 !== t ? t : l, u, 4)), (t => {
                    var e;
                    return null === (e = s.activate) || void 0 === e ? void 0 : e.call(s, t);
                }), i);
            }
        };
        if ("activate" in s) return e.onResolve(s.activate(h), (() => m())); else return m();
    }
    getVm(t, i, s) {
        if (null == i) return new EmptyComponent$1;
        if ("object" === typeof i) return i;
        const n = this.p;
        const r = hi(s);
        t.registerResolver(n.Element, t.registerResolver(ei, new e.InstanceProvider("ElementResolver", r ? null : s)));
        t.registerResolver(si, new e.InstanceProvider("IRenderLocation", r ? s : null));
        const o = t.invoke(i);
        t.registerResolver(i, new e.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = k(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return Qt.isType(e) ? Qt.getDefinition(e) : null;
    }
}

r([ R ], AuCompose.prototype, "view", void 0);

r([ R ], AuCompose.prototype, "viewModel", void 0);

r([ R ], AuCompose.prototype, "model", void 0);

r([ R({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

_t("au-compose")(AuCompose);

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
    constructor(t, e, i, s) {
        this.view = t;
        this.viewModel = e;
        this.model = i;
        this.src = s;
    }
    load() {
        if (y(this.view) || y(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        var n, r;
        this.ji = null;
        this.Ni = null;
        let o;
        const l = e.auSlot;
        const h = null === (r = null === (n = i.instruction) || void 0 === n ? void 0 : n.projections) || void 0 === r ? void 0 : r[l.name];
        if (null == h) {
            o = s.getViewFactory(l.fallback, i.controller.container);
            this.Hi = false;
        } else {
            o = s.getViewFactory(h, i.parent.controller.container);
            this.Hi = true;
        }
        this.Oi = i;
        this.view = o.create().setLocation(t);
    }
    static get inject() {
        return [ si, xi, We, Ie ];
    }
    binding(e, i, s) {
        var n;
        this.ji = this.$controller.scope.parentScope;
        let r;
        if (this.Hi) {
            r = this.Oi.controller.scope.parentScope;
            (this.Ni = t.Scope.fromParent(r, r.bindingContext)).overrideContext.$host = null !== (n = this.expose) && void 0 !== n ? n : this.ji.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Hi ? this.Ni : this.ji);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Hi && null != this.Ni) this.Ni.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

r([ R ], AuSlot.prototype, "expose", void 0);

_t({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const gn = e.DI.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw new Error('"sanitize" method not implemented');
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.Wi = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Wi.sanitize(t);
    }
};

exports.SanitizeValueConverter = r([ o(0, gn) ], exports.SanitizeValueConverter);

t.valueConverter("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.zi = t;
    }
    toView(t, e) {
        return this.zi.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, Be) ], exports.ViewValueConverter);

t.valueConverter("view")(exports.ViewValueConverter);

const wn = DebounceBindingBehavior;

const bn = OneTimeBindingBehavior;

const yn = ToViewBindingBehavior;

const kn = FromViewBindingBehavior;

const Cn = SignalBindingBehavior;

const An = ThrottleBindingBehavior;

const Rn = TwoWayBindingBehavior;

const Sn = TemplateCompiler;

const En = NodeObserverLocator;

const Bn = [ Sn, En ];

const In = SVGAnalyzer;

const Tn = exports.AtPrefixedTriggerAttributePattern;

const Dn = exports.ColonPrefixedBindAttributePattern;

const Pn = exports.RefAttributePattern;

const $n = exports.DotSeparatedAttributePattern;

const On = H;

const Ln = [ Pn, $n, On ];

const qn = [ Tn, Dn ];

const Un = exports.CallBindingCommand;

const _n = exports.DefaultBindingCommand;

const Vn = exports.ForBindingCommand;

const Fn = exports.FromViewBindingCommand;

const Mn = exports.OneTimeBindingCommand;

const jn = exports.ToViewBindingCommand;

const Nn = exports.TwoWayBindingCommand;

const Hn = as;

const Wn = exports.TriggerBindingCommand;

const zn = exports.DelegateBindingCommand;

const Gn = exports.CaptureBindingCommand;

const Xn = exports.AttrBindingCommand;

const Kn = exports.ClassBindingCommand;

const Yn = exports.StyleBindingCommand;

const Zn = cs;

const Jn = [ _n, Mn, Fn, jn, Nn, Un, Vn, Hn, Wn, zn, Gn, Kn, Yn, Xn, Zn ];

const Qn = exports.SanitizeValueConverter;

const tr = exports.ViewValueConverter;

const er = ObserveShallow;

const ir = If;

const sr = Else;

const nr = Repeat;

const rr = With;

const or = exports.Switch;

const lr = exports.Case;

const hr = exports.DefaultCase;

const ar = exports.PromiseTemplateController;

const cr = exports.PendingTemplateController;

const ur = exports.FulfilledTemplateController;

const fr = exports.RejectedTemplateController;

const dr = an;

const pr = cn;

const vr = un;

const mr = AttrBindingBehavior;

const xr = SelfBindingBehavior;

const gr = UpdateTriggerBindingBehavior;

const wr = AuRender;

const br = AuCompose;

const yr = Portal;

const kr = Focus;

const Cr = Qs;

const Ar = [ wn, bn, yn, kn, Cn, An, Rn, Qn, tr, er, ir, sr, nr, rr, or, lr, hr, ar, cr, ur, fr, dr, pr, vr, mr, xr, gr, wr, br, yr, kr, Cr, AuSlot ];

const Rr = Ti;

const Sr = Ei;

const Er = Si;

const Br = Pi;

const Ir = Oi;

const Tr = Ii;

const Dr = $i;

const Pr = Di;

const $r = Ri;

const Or = Bi;

const Lr = Fi;

const qr = Wi;

const Ur = Mi;

const _r = ji;

const Vr = Ni;

const Fr = Hi;

const Mr = _i;

const jr = zi;

const Nr = [ Dr, Ir, Rr, Pr, Br, $r, Er, Sr, Or, Tr, Lr, qr, Ur, _r, Vr, Fr, Mr, jr ];

const Hr = Wr(e.noop);

function Wr(i) {
    return {
        optionsProvider: i,
        register(s) {
            const n = {
                coercingOptions: {
                    enableCoercion: false,
                    coerceNullish: false
                }
            };
            i(n);
            return s.register(e.Registration.instance(t.ICoercionConfiguration, n.coercingOptions), ...Bn, ...Ar, ...Ln, ...Jn, ...Nr);
        },
        customize(t) {
            return Wr(null !== t && void 0 !== t ? t : i);
        }
    };
}

const zr = e.DI.createInterface("IAurelia");

class Aurelia {
    constructor(t = e.DI.createContainer()) {
        this.container = t;
        this.ir = false;
        this.Gi = false;
        this.Xi = false;
        this.Ki = void 0;
        this.next = void 0;
        this.Yi = void 0;
        this.Zi = void 0;
        if (t.has(zr, true)) throw new Error(`AUR0768`);
        t.registerResolver(zr, new e.InstanceProvider("IAurelia", this));
        t.registerResolver(Ze, this.Ji = new e.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.Gi;
    }
    get isStopping() {
        return this.Xi;
    }
    get root() {
        if (null == this.Ki) {
            if (null == this.next) throw new Error(`AUR0767`);
            return this.next;
        }
        return this.Ki;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.Qi(t.host), this.container, this.Ji);
        return this;
    }
    enhance(t, i) {
        var s;
        const n = null !== (s = t.container) && void 0 !== s ? s : this.container.createChild();
        const r = t.host;
        const o = this.Qi(r);
        const l = t.component;
        let h;
        if (k(l)) {
            n.registerResolver(o.HTMLElement, n.registerResolver(o.Element, n.registerResolver(ei, new e.InstanceProvider("ElementResolver", r))));
            h = n.invoke(l);
        } else h = l;
        n.registerResolver(ii, new e.InstanceProvider("IEventTarget", r));
        i = null !== i && void 0 !== i ? i : null;
        const a = Controller.$el(n, h, r, null, CustomElementDefinition.create({
            name: Qt.generateName(),
            template: r,
            enhance: true
        }));
        return e.onResolve(a.activate(a, i, 2), (() => a));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    Qi(t) {
        let i;
        if (!this.container.has(W, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error(`AUR0769`);
            i = new n.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(e.Registration.instance(W, i));
        } else i = this.container.get(W);
        return i;
    }
    start(t = this.next) {
        if (null == t) throw new Error(`AUR0770`);
        if (this.Yi instanceof Promise) return this.Yi;
        return this.Yi = e.onResolve(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.Ji.prepare(this.Ki = t);
            this.Gi = true;
            return e.onResolve(t.activate(), (() => {
                this.ir = true;
                this.Gi = false;
                this.Yi = void 0;
                this.ts(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (this.Zi instanceof Promise) return this.Zi;
        if (true === this.ir) {
            const i = this.Ki;
            this.ir = false;
            this.Xi = true;
            return this.Zi = e.onResolve(i.deactivate(), (() => {
                Reflect.deleteProperty(i.host, "$aurelia");
                if (t) i.dispose();
                this.Ki = void 0;
                this.Ji.dispose();
                this.Xi = false;
                this.ts(i, "au-stopped", i.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Xi) throw new Error(`AUR0771`);
        this.container.dispose();
    }
    ts(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

exports.DefinitionType = void 0;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(exports.DefinitionType || (exports.DefinitionType = {}));

const Gr = e.DI.createInterface("IDialogService");

const Xr = e.DI.createInterface("IDialogController");

const Kr = e.DI.createInterface("IDialogDomRenderer");

const Yr = e.DI.createInterface("IDialogDom");

const Zr = e.DI.createInterface("IDialogGlobalSettings");

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
            this.Pt = t;
            this.St = e;
        }));
    }
    static get inject() {
        return [ W, e.IContainer ];
    }
    activate(t) {
        var i;
        const s = this.ctn.createChild();
        const {model: n, template: r, rejectOnCancel: o} = t;
        const l = s.get(Kr);
        const h = null !== (i = t.host) && void 0 !== i ? i : this.p.document.body;
        const a = this.dom = l.render(h, t);
        const c = s.has(ii, true) ? s.get(ii) : null;
        const u = a.contentHost;
        this.settings = t;
        if (null == c || !c.contains(h)) s.register(e.Registration.instance(ii, h));
        s.register(e.Registration.instance(ei, u), e.Registration.instance(Yr, a));
        return new Promise((e => {
            var i, r;
            const o = Object.assign(this.cmp = this.getOrCreateVm(s, t, u), {
                $dialog: this
            });
            e(null !== (r = null === (i = o.canActivate) || void 0 === i ? void 0 : i.call(o, n)) && void 0 !== r ? r : true);
        })).then((i => {
            var l;
            if (true !== i) {
                a.dispose();
                if (o) throw Jr(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const h = this.cmp;
            return e.onResolve(null === (l = h.activate) || void 0 === l ? void 0 : l.call(h, n), (() => {
                var i;
                const n = this.controller = Controller.$el(s, h, u, null, CustomElementDefinition.create(null !== (i = this.getDefinition(h)) && void 0 !== i ? i : {
                    name: Qt.generateName(),
                    template: r
                }));
                return e.onResolve(n.activate(n, null, 2), (() => {
                    var e;
                    a.overlay.addEventListener(null !== (e = t.mouseEvent) && void 0 !== e ? e : "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            a.dispose();
            throw t;
        }));
    }
    deactivate(t, i) {
        if (this.es) return this.es;
        let s = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const a = DialogCloseResult.create(t, i);
        const c = new Promise((c => {
            var u, f;
            c(e.onResolve(null !== (f = null === (u = o.canDeactivate) || void 0 === u ? void 0 : u.call(o, a)) && void 0 !== f ? f : true, (c => {
                var u;
                if (true !== c) {
                    s = false;
                    this.es = void 0;
                    if (h) throw Jr(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return e.onResolve(null === (u = o.deactivate) || void 0 === u ? void 0 : u.call(o, a), (() => e.onResolve(n.deactivate(n, null, 4), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(null !== l && void 0 !== l ? l : "click", this);
                    if (!h && "error" !== t) this.Pt(a); else this.St(Jr(i, "Dialog cancelled with a rejection on cancel"));
                    return a;
                }))));
            })));
        })).catch((t => {
            this.es = void 0;
            throw t;
        }));
        this.es = s ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const i = Qr(t);
        return new Promise((t => {
            var s, n;
            return t(e.onResolve(null === (n = (s = this.cmp).deactivate) || void 0 === n ? void 0 : n.call(s, DialogCloseResult.create("error", i)), (() => e.onResolve(this.controller.deactivate(this.controller, null, 4), (() => {
                this.dom.dispose();
                this.St(i);
            })))));
        }));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, i, s) {
        const n = i.component;
        if (null == n) return new EmptyComponent;
        if ("object" === typeof n) return n;
        const r = this.p;
        t.registerResolver(r.HTMLElement, t.registerResolver(r.Element, t.registerResolver(ei, new e.InstanceProvider("ElementResolver", s))));
        return t.invoke(n);
    }
    getDefinition(t) {
        const e = k(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return Qt.isType(e) ? Qt.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Jr(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function Qr(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.ft = t;
        this.p = e;
        this.ss = i;
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
        return [ e.IContainer, W, Zr ];
    }
    static register(t) {
        t.register(e.Registration.singleton(Gr, this), mt.beforeDeactivate(Gr, (t => e.onResolve(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return eo(new Promise((i => {
            var s;
            const n = DialogSettings.from(this.ss, t);
            const r = null !== (s = n.container) && void 0 !== s ? s : this.ft.createChild();
            i(e.onResolve(n.load(), (t => {
                const i = r.invoke(DialogController);
                r.register(e.Registration.instance(Xr, i));
                r.register(e.Registration.callback(DialogController, (() => {
                    throw new Error(`AUR0902`);
                })));
                return e.onResolve(i.activate(t), (t => {
                    if (!t.wasCancelled) {
                        if (1 === this.dlgs.push(i)) this.p.window.addEventListener("keydown", this);
                        const t = () => this.remove(i);
                        i.closed.then(t, t);
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
        const i = io(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).ls().os();
    }
    load() {
        const t = this;
        const i = this.component;
        const s = this.template;
        const n = e.resolveAll(null == i ? void 0 : e.onResolve(i(), (e => {
            t.component = e;
        })), k(s) ? e.onResolve(s(), (e => {
            t.template = e;
        })) : void 0);
        return n instanceof Promise ? n.then((() => t)) : t;
    }
    ls() {
        if (null == this.component && null == this.template) throw new Error(`AUR0903`);
        return this;
    }
    os() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function to(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function eo(t) {
    t.whenClosed = to;
    return t;
}

function io(t) {
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
        e.Registration.singleton(Zr, this).register(t);
    }
}

const so = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${so} display:flex;`;
        this.overlayCss = so;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        e.Registration.singleton(Kr, this).register(t);
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

DefaultDialogDomRenderer.inject = [ W ];

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

function no(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, mt.beforeCreate((() => t(i.get(Zr))))),
        customize(t, i) {
            return no(t, null !== i && void 0 !== i ? i : e);
        }
    };
}

const ro = no((() => {
    throw new Error(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(e.Registration.singleton(Zr, this));
    }
} ]);

const oo = no(e.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const lo = e.DI.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, i) {
        this.ctn = t;
        this.p = e;
        this.r = i;
    }
    define(t, i, s) {
        if (!t.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let n;
        if (null == i) throw new Error("Invalid custom element definition");
        switch (typeof i) {
          case "function":
            n = Qt.isType(i) ? Qt.getDefinition(i) : CustomElementDefinition.create(Qt.generateName(), i);
            break;

          default:
            n = CustomElementDefinition.getOrCreate(i);
            break;
        }
        if (n.containerless) throw new Error("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const r = !(null === s || void 0 === s ? void 0 : s.extends) ? HTMLElement : this.p.document.createElement(s.extends).constructor;
        const o = this.ctn;
        const l = this.r;
        const h = n.bindables;
        const a = this.p;
        class CustomElementClass extends r {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = o.createChild();
                t.registerResolver(a.HTMLElement, t.registerResolver(a.Element, t.registerResolver(ei, new e.InstanceProvider("ElementProvider", this))));
                const i = l.compile(n, t, {
                    projections: null
                });
                const s = t.invoke(i.Type);
                const r = this.auCtrl = Controller.$el(t, s, this, null, i);
                ti(this, i.key, r);
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
        this.p.customElements.define(t, CustomElementClass, s);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ e.IContainer, W, Ie ];

exports.LifecycleFlags = t.LifecycleFlags;

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = mt;

exports.AtPrefixedTriggerAttributePatternRegistration = Tn;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = mr;

exports.AttrBindingCommandRegistration = Xn;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = qr;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = N;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = wr;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = B;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingCommand = hs;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = Un;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = Rr;

exports.CaptureBindingCommandRegistration = Gn;

exports.CheckedObserver = CheckedObserver;

exports.Children = yt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Kn;

exports.ColonPrefixedBindAttributePatternRegistration = Dn;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = $t;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = Sr;

exports.CustomElement = Qt;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = Er;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = wn;

exports.DefaultBindingCommandRegistration = _n;

exports.DefaultBindingLanguage = Jn;

exports.DefaultBindingSyntax = Ln;

exports.DefaultComponents = Bn;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = Nr;

exports.DefaultResources = Ar;

exports.DelegateBindingCommandRegistration = zn;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = ro;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = oo;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = $n;

exports.Else = Else;

exports.ElseRegistration = sr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Vn;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = kn;

exports.FromViewBindingCommandRegistration = Fn;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Ze;

exports.IAppTask = vt;

exports.IAttrMapper = X;

exports.IAttributeParser = _;

exports.IAttributePattern = U;

exports.IAuSlotsInfo = mi;

exports.IAurelia = zr;

exports.IController = He;

exports.IDialogController = Xr;

exports.IDialogDom = Yr;

exports.IDialogDomRenderer = Kr;

exports.IDialogGlobalSettings = Zr;

exports.IDialogService = Gr;

exports.IEventDelegator = pi;

exports.IEventTarget = ii;

exports.IHistory = ui;

exports.IHydrationContext = We;

exports.IInstruction = xi;

exports.ILifecycleHooks = ve;

exports.IListenerBehaviorOptions = Vi;

exports.ILocation = ci;

exports.INode = ei;

exports.INodeObserverLocatorRegistration = En;

exports.IPlatform = W;

exports.IProjections = vi;

exports.IRenderLocation = si;

exports.IRenderer = bi;

exports.IRendering = Ie;

exports.ISVGAnalyzer = z;

exports.ISanitizer = gn;

exports.IShadowDOMGlobalStyles = ae;

exports.IShadowDOMStyles = he;

exports.ISyntaxInterpreter = O;

exports.ITemplateCompiler = wi;

exports.ITemplateCompilerHooks = Es;

exports.ITemplateCompilerRegistration = Sn;

exports.ITemplateElementFactory = us;

exports.IViewFactory = ye;

exports.IViewLocator = Be;

exports.IWcElementRegistry = lo;

exports.IWindow = ai;

exports.IWorkTracker = Je;

exports.If = If;

exports.IfRegistration = ir;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = Br;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = Ir;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = Tr;

exports.LifecycleHooks = we;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = Lr;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.ObserveShallow = ObserveShallow;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = bn;

exports.OneTimeBindingCommandRegistration = Mn;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = Dr;

exports.RefAttributePatternRegistration = Pn;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Hn;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = Pr;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = nr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = In;

exports.SanitizeValueConverterRegistration = Qn;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = xr;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Ur;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = _r;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = $r;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Vr;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = qn;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = Cn;

exports.StandardConfiguration = Hr;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Yn;

exports.StyleConfiguration = ce;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Fr;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = Ts;

exports.TemplateControllerRendererRegistration = Or;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = Mr;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = An;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = yn;

exports.ToViewBindingCommandRegistration = jn;

exports.TriggerBindingCommandRegistration = Wn;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = Rn;

exports.TwoWayBindingCommandRegistration = Nn;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = gr;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = tr;

exports.Views = Se;

exports.Watch = Ut;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = rr;

exports.allResources = ds;

exports.applyBindingBehavior = Ui;

exports.attributePattern = V;

exports.bindable = R;

exports.bindingCommand = ns;

exports.children = gt;

exports.coercer = I;

exports.containerless = Ft;

exports.convertToRenderLocation = li;

exports.createElement = fn;

exports.cssModules = re;

exports.customAttribute = Bt;

exports.customElement = _t;

exports.getEffectiveParentNode = ri;

exports.getRef = Qe;

exports.isCustomElementController = Ve;

exports.isCustomElementViewModel = Fe;

exports.isInstruction = gi;

exports.isRenderLocation = hi;

exports.lifecycleHooks = be;

exports.processContent = ee;

exports.renderer = yi;

exports.setEffectiveParentNode = oi;

exports.setRef = ti;

exports.shadowCSS = oe;

exports.templateCompilerHooks = Ds;

exports.templateController = It;

exports.useShadowDOM = Vt;

exports.view = Ee;

exports.watch = Ot;
//# sourceMappingURL=index.cjs.map
