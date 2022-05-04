"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/runtime");

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

const {annotation: c, resource: u} = t.Protocol;

const f = c.keyFor;

const d = u.keyFor;

const p = u.appendTo;

const m = c.appendTo;

const v = c.getKeys;

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

function A(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        a(S, BindableDefinition.create(e, t, i), t.constructor, e);
        m(t.constructor, E.keyFrom(e));
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

function R(t) {
    return t.startsWith(S);
}

const S = f("bindable");

const E = Object.freeze({
    name: S,
    keyFrom: t => `${S}:${t}`,
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
                if (!h(S, t, n)) m(t, E.keyFrom(n));
                a(S, e, t, n);
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
    getAll(e) {
        const i = S.length + 1;
        const s = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let a;
        let c;
        let u;
        while (--r >= 0) {
            c = n[r];
            h = v(c).filter(R);
            a = h.length;
            for (u = 0; u < a; ++u) s[o++] = l(S, c, h[u].slice(i));
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
        return new BindableDefinition(t.firstDefined(n.attribute, t.kebabCase(i)), t.firstDefined(n.callback, `${i}Changed`), t.firstDefined(n.mode, e.BindingMode.toView), t.firstDefined(n.primary, false), t.firstDefined(n.property, i), t.firstDefined(n.set, T(i, s, n)));
    }
}

function B(t, e, i) {
    I.define(t, e);
}

const I = {
    key: f("coercer"),
    define(t, e) {
        a(I.key, t[e].bind(t), t);
    },
    for(t) {
        return l(I.key, t);
    }
};

function T(e, i, s = {}) {
    var n, r, o;
    const l = null !== (r = null !== (n = s.type) && void 0 !== n ? n : Reflect.getMetadata("design:type", i, e)) && void 0 !== r ? r : null;
    if (null == l) return t.noop;
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
            const e = l.coerce;
            h = "function" === typeof e ? e.bind(l) : null !== (o = I.for(l)) && void 0 !== o ? o : t.noop;
            break;
        }
    }
    return h === t.noop ? h : D(h, s.nullable);
}

function D(t, e) {
    return function(i, s) {
        var n;
        if (!(null === s || void 0 === s ? void 0 : s.enableCoercion)) return i;
        return (null !== e && void 0 !== e ? e : (null !== (n = null === s || void 0 === s ? void 0 : s.coerceNullish) && void 0 !== n ? n : false) ? false : true) && null == i ? i : t(i, s);
    };
}

class BindableObserver {
    constructor(e, i, s, n, r, o) {
        this.set = n;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        const l = e[s];
        const h = e.propertyChanged;
        const a = this.i = k(l);
        const c = this.u = k(h);
        const u = this.hs = n !== t.noop;
        let f;
        this.o = e;
        this.k = i;
        this.cb = a ? l : t.noop;
        this.C = c ? h : t.noop;
        if (void 0 === this.cb && !c && !u) this.iO = false; else {
            this.iO = true;
            f = e[i];
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
        P = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, P, this.f);
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

e.subscriberCollection(BindableObserver);

e.withFlushQueue(BindableObserver);

let P;

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

const $ = t.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        s = s.filter(O);
        if (s.length > 0) {
            s.sort(L);
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

function O(t) {
    return t.isEndpoint;
}

function L(t, e) {
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

const q = t.DI.createInterface("IAttributePattern");

const U = t.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(e, i) {
        this.U = {};
        this.F = e;
        const s = this._ = {};
        const n = i.reduce(((t, e) => {
            const i = V(e.constructor);
            i.forEach((t => s[t.pattern] = e));
            return t.concat(i);
        }), t.emptyArray);
        e.add(n);
    }
    parse(t, e) {
        let i = this.U[t];
        if (null == i) i = this.U[t] = this.F.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this._[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ $, t.all(q) ];

function F(...t) {
    return function e(i) {
        return j.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(e) {
        t.Registration.singleton(q, this.Type).register(e);
    }
}

const _ = d("attribute-pattern");

const M = "attribute-pattern-definitions";

const V = e => t.Protocol.annotation.get(e, M);

const j = Object.freeze({
    name: _,
    definitionAnnotationKey: M,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        a(_, s, i);
        p(i, _);
        t.Protocol.annotation.set(i, M, e);
        m(i, M);
        return i;
    },
    getPatternDefinitions: V
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

exports.DotSeparatedAttributePattern = r([ F({
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

exports.RefAttributePattern = r([ F({
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

exports.ColonPrefixedBindAttributePattern = r([ F({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = r([ F({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let N = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

N = r([ F({
    pattern: "...$attrs",
    symbols: ""
}) ], N);

const W = t.IPlatform;

const H = t.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function z(t) {
    const e = x();
    let i;
    for (i of t) e[i] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.M = Object.assign(x(), {
            a: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: z([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: x(),
            altGlyphDef: z([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: x(),
            altGlyphItem: z([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: x(),
            animate: z([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: z([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: z([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: z([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: z([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: z([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": z([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: z([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: z([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: z([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: z([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: z([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: z([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: z([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: z([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: z([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: z([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: z([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: z([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: z([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: z([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: z([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: z([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: z([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: z([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: z([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: z([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: z([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: z([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: z([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: z([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: z([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: z([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: z([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: z([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: z([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": z([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": z([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": z([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": z([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": z([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: z([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: z([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: z([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: x(),
            hkern: z([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: z([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: z([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: z([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: z([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: z([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": z([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: z([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: z([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: z([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: z([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: z([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: z([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: z([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: z([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: z([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: z([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: z([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: z([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: z([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: z([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: z([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: z([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: z([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: z([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: z([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.V = z([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.j = z([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.M;
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
    static register(e) {
        return t.Registration.singleton(H, this).register(e);
    }
    isStandardSvgAttribute(t, e) {
        var i;
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.V[t.nodeName] && true === this.j[e] || true === (null === (i = this.M[t.nodeName]) || void 0 === i ? void 0 : i[e]);
    }
}

SVGAnalyzer.inject = [ W ];

const G = t.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = x();
        this.W = x();
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
        return [ H ];
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
                if (void 0 !== n[o]) throw K(o, r);
                n[o] = s[o];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const i in t) {
            if (void 0 !== e[i]) throw K(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return X(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        var i, s, n;
        return null !== (n = null !== (s = null === (i = this.N[t.nodeName]) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : this.W[e]) && void 0 !== n ? n : b(t, e, this.svg) ? e : null;
    }
}

function X(t, e) {
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

function K(t, e) {
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
        this.H = false;
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
        this.H = t !== this.ov;
        if (0 === (256 & e)) this.K();
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
                this.H = false;
                this.f = 0;
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            Y(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) Z(this.o, this);
    }
    flush() {
        tt = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, tt, this.f);
    }
}

e.subscriberCollection(AttributeObserver);

e.withFlushQueue(AttributeObserver);

const Y = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(J)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const Z = (t, e) => {
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

const J = t => {
    t[0].target.$eMObs.forEach(Q, t);
};

function Q(t) {
    t.handleMutation(this);
}

let tt;

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, i) {
        const s = this.b;
        if (t !== s.sourceExpression.evaluate(i, s.$scope, s.locator, null)) s.updateSource(t, i);
    }
}

const {oneTime: et, toView: it, fromView: st} = e.BindingMode;

const nt = it | et;

const rt = {
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
            c = 0 === (s & et);
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
                }), rt);
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
        this.persistentFlags = 961 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        let n = this.targetObserver;
        if (!n) n = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        s = this.sourceExpression;
        const r = this.mode;
        const o = this.interceptor;
        let l = false;
        if (r & nt) {
            l = (r & it) > 0;
            o.updateTarget(this.value = s.evaluate(t, e, this.locator, l ? o : null), t);
        }
        if (r & st) n.subscribe(null !== (i = this.targetSubscriber) && void 0 !== i ? i : this.targetSubscriber = new BindingTargetSubscriber(o));
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

e.connectable(AttributeBinding);

const {toView: ot} = e.BindingMode;

const lt = {
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
            }), lt);
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
    constructor(t, i, s, n, r, o) {
        this.sourceExpression = t;
        this.target = i;
        this.targetProperty = s;
        this.locator = n;
        this.owner = o;
        this.interceptor = this;
        this.mode = e.BindingMode.toView;
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
            o = (this.mode & ot) > 0;
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
        this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & ot) > 0 ? this.interceptor : null);
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

e.connectable(InterpolationPartBinding);

class ContentBinding {
    constructor(t, i, s, n, r, o) {
        this.sourceExpression = t;
        this.target = i;
        this.locator = s;
        this.p = r;
        this.strict = o;
        this.interceptor = this;
        this.mode = e.BindingMode.toView;
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
            l = (this.mode & ot) > 0;
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
        const i = this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & ot) > 0 ? this.interceptor : null);
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
        }), lt);
        null === i || void 0 === i ? void 0 : i.cancel();
    }
}

e.connectable(ContentBinding);

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

e.connectable(LetBinding);

const {oneTime: ht, toView: at, fromView: ct} = e.BindingMode;

const ut = at | ht;

const ft = {
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
            r = this.mode > ht;
            if (r) n.version++;
            t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
            if (r) n.clear();
        }
        if (s) {
            dt = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), ft);
            null === dt || void 0 === dt ? void 0 : dt.cancel();
            dt = null;
        } else this.interceptor.updateTarget(t, i);
    }
    $bind(t, e) {
        var i;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 961 & t;
        this.$scope = e;
        let s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        const n = this.oL;
        const r = this.mode;
        let o = this.targetObserver;
        if (!o) {
            if (r & ct) o = n.getObserver(this.target, this.targetProperty); else o = n.getAccessor(this.target, this.targetProperty);
            this.targetObserver = o;
        }
        s = this.sourceExpression;
        const l = this.interceptor;
        const h = (r & at) > 0;
        if (r & ut) l.updateTarget(s.evaluate(t, e, this.locator, h ? l : null), t);
        if (r & ct) {
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
        dt = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != dt) {
            dt.cancel();
            dt = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

e.connectable(PropertyBinding);

let dt = null;

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

const pt = t.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(e) {
        return this.c = e.register(t.Registration.instance(pt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const mt = Object.freeze({
    beforeCreate: vt("beforeCreate"),
    hydrating: vt("hydrating"),
    hydrated: vt("hydrated"),
    beforeActivate: vt("beforeActivate"),
    afterActivate: vt("afterActivate"),
    beforeDeactivate: vt("beforeDeactivate"),
    afterDeactivate: vt("afterDeactivate")
});

function vt(t) {
    function e(e, i) {
        if (k(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function xt(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        a(wt, ChildrenDefinition.create(e, i), t.constructor, e);
        m(t.constructor, bt.keyFrom(e));
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

function gt(t) {
    return t.startsWith(wt);
}

const wt = f("children-observer");

const bt = Object.freeze({
    name: wt,
    keyFrom: t => `${wt}:${t}`,
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
    getAll(e) {
        const i = wt.length + 1;
        const s = [];
        const n = t.getPrototypeChain(e);
        let r = n.length;
        let o = 0;
        let h;
        let a;
        let c;
        while (--r >= 0) {
            c = n[r];
            h = v(c).filter(gt);
            a = h.length;
            for (let t = 0; t < a; ++t) s[o++] = l(wt, c, h[t].slice(i));
        }
        return s;
    }
});

const yt = {
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
    static create(e, i = {}) {
        var s;
        return new ChildrenDefinition(t.firstDefined(i.callback, `${e}Changed`), t.firstDefined(i.property, e), null !== (s = i.options) && void 0 !== s ? s : yt, i.query, i.filter, i.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = kt, r = Ct, o = At, l) {
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
            this.children = t.emptyArray;
        }
    }
    Z() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0, 0);
    }
    get() {
        return St(this.controller, this.query, this.filter, this.map);
    }
}

e.subscriberCollection()(ChildrenObserver);

function kt(t) {
    return t.host.childNodes;
}

function Ct(t, e, i) {
    return !!i;
}

function At(t, e, i) {
    return i;
}

const Rt = {
    optional: true
};

function St(t, e, i, s) {
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
        a = Jt.for(h, Rt);
        c = null !== (n = null === a || void 0 === a ? void 0 : a.viewModel) && void 0 !== n ? n : null;
        if (i(h, a, c)) l.push(s(h, a, c));
    }
    return l;
}

function Et(t) {
    return function(e) {
        return Pt.define(t, e);
    };
}

function Bt(t) {
    return function(e) {
        return Pt.define(C(t) ? {
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
        return new CustomAttributeDefinition(s, t.firstDefined(Dt(s, "name"), n), t.mergeArrays(Dt(s, "aliases"), r.aliases, s.aliases), Pt.keyFrom(n), t.firstDefined(Dt(s, "defaultBindingMode"), r.defaultBindingMode, s.defaultBindingMode, e.BindingMode.toView), t.firstDefined(Dt(s, "isTemplateController"), r.isTemplateController, s.isTemplateController, false), E.from(s, ...E.getAll(s), Dt(s, "bindables"), s.bindables, r.bindables), t.firstDefined(Dt(s, "noMultiBindings"), r.noMultiBindings, s.noMultiBindings, false), t.mergeArrays(qt.getAnnotation(s), s.watches));
    }
    register(i) {
        const {Type: s, key: n, aliases: r} = this;
        t.Registration.transient(n, s).register(i);
        t.Registration.aliasTo(n, s).register(i);
        e.registerAliases(r, Pt, n, i);
    }
}

const It = d("custom-attribute");

const Tt = t => `${It}:${t}`;

const Dt = (t, e) => l(f(e), t);

const Pt = Object.freeze({
    name: It,
    keyFrom: Tt,
    isType(t) {
        return k(t) && h(It, t);
    },
    for(t, e) {
        var i;
        return null !== (i = Ye(t, Tt(e))) && void 0 !== i ? i : void 0;
    },
    define(t, e) {
        const i = CustomAttributeDefinition.create(t, e);
        a(It, i, i.Type);
        a(It, i, i);
        p(e, It);
        return i.Type;
    },
    getDefinition(t) {
        const e = l(It, t);
        if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        a(f(e), i, t);
    },
    getAnnotation: Dt
});

function $t(t, e) {
    if (!t) throw new Error("AUR0772");
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!k(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!k(null === r || void 0 === r ? void 0 : r.value)) throw new Error(`AUR0774:${String(n)}`);
        qt.add(l, h);
        if (Pt.isType(l)) Pt.getDefinition(l).watches.push(h);
        if (Jt.isType(l)) Jt.getDefinition(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const Ot = t.emptyArray;

const Lt = f("watch");

const qt = Object.freeze({
    name: Lt,
    add(t, e) {
        let i = l(Lt, t);
        if (null == i) a(Lt, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        var e;
        return null !== (e = l(Lt, t)) && void 0 !== e ? e : Ot;
    }
});

function Ut(t) {
    return function(e) {
        return Jt.define(t, e);
    };
}

function Ft(t) {
    if (void 0 === t) return function(t) {
        Yt(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!k(t)) return function(e) {
        Yt(e, "shadowOptions", t);
    };
    Yt(t, "shadowOptions", {
        mode: "open"
    });
}

function _t(t) {
    if (void 0 === t) return function(t) {
        Yt(t, "containerless", true);
    };
    Yt(t, "containerless", true);
}

const Mt = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, a, c, u, f, d, p, m, v, x, g, w, b) {
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
        this.isStrictBinding = m;
        this.shadowOptions = v;
        this.hasSlots = x;
        this.enhance = g;
        this.watches = w;
        this.processContent = b;
    }
    get type() {
        return 1;
    }
    static create(e, i = null) {
        if (null === i) {
            const s = e;
            if (C(s)) throw new Error(`AUR0761:${e}`);
            const n = t.fromDefinitionOrDefault("name", s, Kt);
            if (k(s.Type)) i = s.Type; else i = Jt.generateType(t.pascalCase(n));
            return new CustomElementDefinition(i, n, t.mergeArrays(s.aliases), t.fromDefinitionOrDefault("key", s, (() => Jt.keyFrom(n))), t.fromDefinitionOrDefault("cache", s, jt), t.fromDefinitionOrDefault("capture", s, Wt), t.fromDefinitionOrDefault("template", s, Nt), t.mergeArrays(s.instructions), t.mergeArrays(s.dependencies), t.fromDefinitionOrDefault("injectable", s, Nt), t.fromDefinitionOrDefault("needsCompile", s, Ht), t.mergeArrays(s.surrogates), E.from(i, s.bindables), bt.from(s.childrenObservers), t.fromDefinitionOrDefault("containerless", s, Wt), t.fromDefinitionOrDefault("isStrictBinding", s, Wt), t.fromDefinitionOrDefault("shadowOptions", s, Nt), t.fromDefinitionOrDefault("hasSlots", s, Wt), t.fromDefinitionOrDefault("enhance", s, Wt), t.fromDefinitionOrDefault("watches", s, zt), t.fromAnnotationOrTypeOrDefault("processContent", i, Nt));
        }
        if (C(e)) return new CustomElementDefinition(i, e, t.mergeArrays(Zt(i, "aliases"), i.aliases), Jt.keyFrom(e), t.fromAnnotationOrTypeOrDefault("cache", i, jt), t.fromAnnotationOrTypeOrDefault("capture", i, Wt), t.fromAnnotationOrTypeOrDefault("template", i, Nt), t.mergeArrays(Zt(i, "instructions"), i.instructions), t.mergeArrays(Zt(i, "dependencies"), i.dependencies), t.fromAnnotationOrTypeOrDefault("injectable", i, Nt), t.fromAnnotationOrTypeOrDefault("needsCompile", i, Ht), t.mergeArrays(Zt(i, "surrogates"), i.surrogates), E.from(i, ...E.getAll(i), Zt(i, "bindables"), i.bindables), bt.from(...bt.getAll(i), Zt(i, "childrenObservers"), i.childrenObservers), t.fromAnnotationOrTypeOrDefault("containerless", i, Wt), t.fromAnnotationOrTypeOrDefault("isStrictBinding", i, Wt), t.fromAnnotationOrTypeOrDefault("shadowOptions", i, Nt), t.fromAnnotationOrTypeOrDefault("hasSlots", i, Wt), t.fromAnnotationOrTypeOrDefault("enhance", i, Wt), t.mergeArrays(qt.getAnnotation(i), i.watches), t.fromAnnotationOrTypeOrDefault("processContent", i, Nt));
        const s = t.fromDefinitionOrDefault("name", e, Kt);
        return new CustomElementDefinition(i, s, t.mergeArrays(Zt(i, "aliases"), e.aliases, i.aliases), Jt.keyFrom(s), t.fromAnnotationOrDefinitionOrTypeOrDefault("cache", e, i, jt), t.fromAnnotationOrDefinitionOrTypeOrDefault("capture", e, i, Wt), t.fromAnnotationOrDefinitionOrTypeOrDefault("template", e, i, Nt), t.mergeArrays(Zt(i, "instructions"), e.instructions, i.instructions), t.mergeArrays(Zt(i, "dependencies"), e.dependencies, i.dependencies), t.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", e, i, Nt), t.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", e, i, Ht), t.mergeArrays(Zt(i, "surrogates"), e.surrogates, i.surrogates), E.from(i, ...E.getAll(i), Zt(i, "bindables"), i.bindables, e.bindables), bt.from(...bt.getAll(i), Zt(i, "childrenObservers"), i.childrenObservers, e.childrenObservers), t.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", e, i, Wt), t.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", e, i, Wt), t.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", e, i, Nt), t.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", e, i, Wt), t.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", e, i, Wt), t.mergeArrays(e.watches, qt.getAnnotation(i), i.watches), t.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", e, i, Nt));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (Mt.has(t)) return Mt.get(t);
        const e = CustomElementDefinition.create(t);
        Mt.set(t, e);
        a(Gt, e, e.Type);
        return e;
    }
    register(i) {
        const {Type: s, key: n, aliases: r} = this;
        if (!i.has(n, false)) {
            t.Registration.transient(n, s).register(i);
            t.Registration.aliasTo(n, s).register(i);
            e.registerAliases(r, Jt, n, i);
        }
    }
}

const Vt = {
    name: void 0,
    searchParents: false,
    optional: false
};

const jt = () => 0;

const Nt = () => null;

const Wt = () => false;

const Ht = () => true;

const zt = () => t.emptyArray;

const Gt = d("custom-element");

const Xt = t => `${Gt}:${t}`;

const Kt = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Yt = (t, e, i) => {
    a(f(e), i, t);
};

const Zt = (t, e) => l(f(e), t);

const Jt = Object.freeze({
    name: Gt,
    keyFrom: Xt,
    isType(t) {
        return k(t) && h(Gt, t);
    },
    for(t, e = Vt) {
        if (void 0 === e.name && true !== e.searchParents) {
            const i = Ye(t, Gt);
            if (null === i) {
                if (true === e.optional) return null;
                throw new Error("AUR0762");
            }
            return i;
        }
        if (void 0 !== e.name) {
            if (true !== e.searchParents) {
                const i = Ye(t, Gt);
                if (null === i) throw new Error("AUR0763");
                if (i.is(e.name)) return i;
                return;
            }
            let i = t;
            let s = false;
            while (null !== i) {
                const t = Ye(i, Gt);
                if (null !== t) {
                    s = true;
                    if (t.is(e.name)) return t;
                }
                i = ii(i);
            }
            if (s) return;
            throw new Error("AUR0764");
        }
        let i = t;
        while (null !== i) {
            const t = Ye(i, Gt);
            if (null !== t) return t;
            i = ii(i);
        }
        throw new Error("AUR0765");
    },
    define(t, e) {
        const i = CustomElementDefinition.create(t, e);
        a(Gt, i, i.Type);
        a(Gt, i, i);
        p(i.Type, Gt);
        return i.Type;
    },
    getDefinition(t) {
        const e = l(Gt, t);
        if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
        return e;
    },
    annotate: Yt,
    getAnnotation: Zt,
    generateName: Kt,
    createInjectable() {
        const e = function(i, s, n) {
            const r = t.DI.getOrCreateAnnotationParamTypes(i);
            r[n] = e;
            return i;
        };
        e.register = function(t) {
            return {
                resolve(t, i) {
                    if (i.has(e, true)) return i.get(e); else return null;
                }
            };
        };
        return e;
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

const Qt = f("processContent");

function te(t) {
    return void 0 === t ? function(t, e, i) {
        a(Qt, ee(t, e), t);
    } : function(e) {
        t = ee(e, t);
        const i = l(Gt, e);
        if (void 0 !== i) i.processContent = t; else a(Qt, t, e);
        return e;
    };
}

function ee(t, e) {
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
        if (0 === (256 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.J;
            const i = ie(t);
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

function ie(e) {
    if (C(e)) return se(e);
    if ("object" !== typeof e) return t.emptyArray;
    if (e instanceof Array) {
        const i = e.length;
        if (i > 0) {
            const t = [];
            let s = 0;
            for (;i > s; ++s) t.push(...ie(e[s]));
            return t;
        } else return t.emptyArray;
    }
    const i = [];
    let s;
    for (s in e) if (Boolean(e[s])) if (s.includes(" ")) i.push(...se(s)); else i.push(s);
    return i;
}

function se(e) {
    const i = e.match(/\S+/g);
    if (null === i) return t.emptyArray;
    return i;
}

function ne(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Pt.define({
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
                this.element.className = ie(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ Je ], e));
        t.register(s);
    }
}

function re(...t) {
    return new ShadowDOMRegistry(t);
}

const oe = t.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(W))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(e) {
        const i = e.get(he);
        const s = e.get(oe);
        e.register(t.Registration.instance(le, s.createStyles(this.css, i)));
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

const le = t.DI.createInterface("IShadowDOMStyles");

const he = t.DI.createInterface("IShadowDOMGlobalStyles", (e => e.instance({
    applyTo: t.noop
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

const ae = {
    shadowDOM(e) {
        return mt.beforeCreate(t.IContainer, (i => {
            if (null != e.sharedStyles) {
                const s = i.get(oe);
                i.register(t.Registration.instance(he, s.createStyles(e.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ce, exit: ue} = e.ConnectableSwitcher;

const {wrap: fe, unwrap: de} = e.ProxyObservable;

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
            ce(this);
            return this.value = de(this.get.call(void 0, this.useProxy ? fe(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ue(this);
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

e.connectable(ComputedWatcher);

e.connectable(ExpressionWatcher);

const pe = t.DI.createInterface("ILifecycleHooks");

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
    register(e) {
        t.Registration.singleton(pe, this.Type).register(e);
    }
}

const me = new WeakMap;

const ve = f("lifecycle-hooks");

const xe = Object.freeze({
    name: ve,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        a(ve, i, e);
        p(e, ve);
        return i.Type;
    },
    resolve(t) {
        let e = me.get(t);
        if (void 0 === e) {
            e = new LifecycleHooksLookupImpl;
            const i = t.root;
            const s = i.id === t.id ? t.getAll(pe) : t.has(pe, false) ? [ ...i.getAll(pe), ...t.getAll(pe) ] : i.getAll(pe);
            let n;
            let r;
            let o;
            let h;
            let a;
            for (n of s) {
                r = l(ve, n.constructor);
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

function ge() {
    return function t(e) {
        return xe.define({}, e);
    };
}

const we = t.DI.createInterface("IViewFactory");

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

const be = new WeakSet;

function ye(t) {
    return !be.has(t);
}

function ke(t) {
    be.add(t);
    return CustomElementDefinition.create(t);
}

const Ce = d("views");

const Ae = Object.freeze({
    name: Ce,
    has(t) {
        return k(t) && (h(Ce, t) || "$views" in t);
    },
    get(t) {
        if (k(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(ye).map(ke);
            for (const e of i) Ae.add(t, e);
        }
        let e = l(Ce, t);
        if (void 0 === e) a(Ce, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = l(Ce, t);
        if (void 0 === s) a(Ce, s = [ i ], t); else s.push(i);
        return s;
    }
});

function Re(t) {
    return function(e) {
        Ae.add(e, t);
    };
}

const Se = t.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.it = new WeakMap;
        this.st = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = Ae.has(t.constructor) ? Ae.get(t.constructor) : [];
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
            n = Jt.define(Jt.getDefinition(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[i] = n;
        }
        return n;
    }
    ot(t, i, s) {
        let n = this.st.get(t.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.st.set(t.constructor, n);
        } else r = n[s];
        if (void 0 === r) {
            r = Jt.define(this.lt(i, s), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, i, s) {
                    const n = this.viewModel;
                    t.scope = e.Scope.fromParent(t.scope, n);
                    if (void 0 !== n.define) return n.define(t, i, s);
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
            if ("binding" in t) o.binding = function t(e, i, s) {
                return this.viewModel.binding(e, i, s);
            };
            if ("bound" in t) o.bound = function t(e, i, s) {
                return this.viewModel.bound(e, i, s);
            };
            if ("attaching" in t) o.attaching = function t(e, i, s) {
                return this.viewModel.attaching(e, i, s);
            };
            if ("attached" in t) o.attached = function t(e, i) {
                return this.viewModel.attached(e, i);
            };
            if ("detaching" in t) o.detaching = function t(e, i, s) {
                return this.viewModel.detaching(e, i, s);
            };
            if ("unbinding" in t) o.unbinding = function t(e, i, s) {
                return this.viewModel.unbinding(e, i, s);
            };
            if ("dispose" in t) o.dispose = function t() {
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

const Ee = t.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ht = new WeakMap;
        this.ct = new WeakMap;
        this.ut = (this.ft = t.root).get(W);
        this.dt = new FragmentNodeSequence(this.ut, this.ut.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.ft.getAll(xi, false).reduce(((t, e) => {
            t[e.instructionType] = e;
            return t;
        }), x()) : this.rs;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.ht;
            const n = e.get(vi);
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

Rendering.inject = [ t.IContainer ];

var Be;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Be || (Be = {}));

const Ie = {
    optional: true
};

const Te = new WeakMap;

class Controller {
    constructor(e, i, s, n, r, o) {
        this.container = e;
        this.vmKind = i;
        this.definition = s;
        this.viewFactory = n;
        this.viewModel = r;
        this.host = o;
        this.id = t.nextId("au$component");
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
        this.xt = t.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.gt = 0;
        this.wt = 0;
        this.bt = 0;
        this.r = e.root.get(Ee);
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
        return Te.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(e, i, s, n, r = void 0) {
        if (Te.has(i)) return Te.get(i);
        r = null !== r && void 0 !== r ? r : Jt.getDefinition(i.constructor);
        const o = new Controller(e, 0, r, null, i, s);
        const l = e.get(t.optional(Ne));
        if (r.dependencies.length > 0) e.register(...r.dependencies);
        e.registerResolver(Ne, new t.InstanceProvider("IHydrationContext", new HydrationContext(o, n, l)));
        Te.set(i, o);
        if (null == n || false !== n.hydrate) o.hE(n, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (Te.has(e)) return Te.get(e);
        s = null !== s && void 0 !== s ? s : Pt.getDefinition(e.constructor);
        const n = new Controller(t, 1, s, null, e, i);
        Te.set(e, n);
        n.yt();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null);
        i.parent = null !== e && void 0 !== e ? e : null;
        i.kt();
        return i;
    }
    hE(i, s) {
        const n = this.container;
        const r = this.flags;
        const o = this.viewModel;
        let l = this.definition;
        this.scope = e.Scope.create(o, null, true);
        if (l.watches.length > 0) qe(this, n, l, o);
        Pe(this, l, r, o);
        this.xt = $e(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, s, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = xe.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new t.InstanceProvider("definition.injectable", o));
        if (null == i || false !== i.hydrate) {
            this.hS(i);
            this.hC();
        }
    }
    hS(t) {
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Ct = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        this.isStrictBinding = s;
        if (null !== (this.hostController = Jt.for(this.host, Ie))) this.host = this.container.root.get(W).document.createElement(this.definition.name);
        Ze(this.host, Jt.name, this);
        Ze(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (r) throw new Error("AUR0501");
            Ze(this.shadowRoot = this.host.attachShadow(null !== i && void 0 !== i ? i : _e), Jt.name, this);
            Ze(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (r) {
            Ze(this.location = ni(this.host), Jt.name, this);
            Ze(this.location, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Ct, this.host);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    yt() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) qe(this, this.container, t, e);
        Pe(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = xe.resolve(this.container);
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
            throw new Error(`AUR0503:${this.name} ${Ve(this.state)}`);
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
            if (void 0 === s || null === s) throw new Error("AUR0504");
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
                const e = t.has(le, false) ? t.get(le) : t.get(he);
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
            throw new Error(`AUR0505:${this.name} ${Ve(this.state)}`);
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
        if (32 === (32 & t) && this.$initiator === this) this.dispose();
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
            He = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            He();
            He = void 0;
        }
    }
    St(t) {
        if (void 0 !== this.$promise) {
            ze = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            ze(t);
            ze = void 0;
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
                Ge = this.viewModel.attached(this.$initiator, this.$flags);
                if (Ge instanceof Promise) {
                    this.Rt();
                    Ge.then((() => {
                        this.state = 2;
                        this.Pt();
                        if (this.$initiator !== this) this.parent.It();
                    })).catch((t => {
                        this.St(t);
                    }));
                    Ge = void 0;
                    return;
                }
                Ge = void 0;
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
                    Ge = t.viewModel.unbinding(t.$initiator, t.parent, t.$flags);
                    if (Ge instanceof Promise) {
                        this.Rt();
                        this.$t();
                        Ge.then((() => {
                            this.Ot();
                        })).catch((t => {
                            this.St(t);
                        }));
                    }
                    Ge = void 0;
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
            return Pt.getDefinition(this.viewModel.constructor).name === t;

          case 0:
            return Jt.getDefinition(this.viewModel.constructor).name === t;

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
            Ze(t, Jt.name, this);
            Ze(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Ze(t, Jt.name, this);
            Ze(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Ze(t, Jt.name, this);
            Ze(t, this.definition.key, this);
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
            this.children.forEach(We);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            Te.delete(this.viewModel);
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

function De(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function Pe(t, i, s, n) {
    const r = i.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let i;
        let s;
        let h = 0;
        const a = De(n);
        const c = t.container;
        const u = c.has(e.ICoercionConfiguration, true) ? c.get(e.ICoercionConfiguration) : null;
        for (;h < l; ++h) {
            i = o[h];
            if (void 0 === a[i]) {
                s = r[i];
                a[i] = new BindableObserver(n, i, s.callback, s.set, t, u);
            }
        }
    }
}

function $e(e, i, s) {
    const n = i.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const t = De(s);
        const i = [];
        let l;
        let h = 0;
        let a;
        for (;h < o; ++h) {
            l = r[h];
            if (null == t[l]) {
                a = n[l];
                i[i.length] = t[l] = new ChildrenObserver(e, s, l, a.callback, a.query, a.filter, a.map, a.options);
            }
        }
        return i;
    }
    return t.emptyArray;
}

const Oe = new Map;

const Le = t => {
    let i = Oe.get(t);
    if (null == i) {
        i = new e.AccessScopeExpression(t, 0);
        Oe.set(t, i);
    }
    return i;
};

function qe(t, i, s, n) {
    const r = i.get(e.IObserverLocator);
    const o = i.get(e.IExpressionParser);
    const l = s.watches;
    const h = 0 === t.vmKind ? t.scope : e.Scope.create(n, null, true);
    const a = l.length;
    let c;
    let u;
    let f;
    let d = 0;
    for (;a > d; ++d) {
        ({expression: c, callback: u} = l[d]);
        u = k(u) ? u : Reflect.get(n, u);
        if (!k(u)) throw new Error(`AUR0506:${String(u)}`);
        if (k(c)) t.addBinding(new ComputedWatcher(n, r, c, u, true)); else {
            f = C(c) ? o.parse(c, 8) : Le(c);
            t.addBinding(new ExpressionWatcher(h, i, r, f, u));
        }
    }
}

function Ue(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Fe(t) {
    return i.isObject(t) && Jt.isType(t.constructor);
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

const _e = {
    mode: "open"
};

exports.ViewModelKind = void 0;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(exports.ViewModelKind || (exports.ViewModelKind = {}));

var Me;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(Me || (Me = {}));

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

const je = t.DI.createInterface("IController");

const Ne = t.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function We(t) {
    t.dispose();
}

let He;

let ze;

let Ge;

const Xe = t.DI.createInterface("IAppRoot");

const Ke = t.DI.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

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

WorkTracker.inject = [ t.ILogger ];

class AppRoot {
    constructor(e, i, s, n) {
        this.config = e;
        this.platform = i;
        this.container = s;
        this.controller = void 0;
        this.Ft = void 0;
        this.host = e.host;
        this.work = s.get(Ke);
        n.prepare(this);
        s.registerResolver(i.HTMLElement, s.registerResolver(i.Element, s.registerResolver(Je, new t.InstanceProvider("ElementResolver", e.host))));
        this.Ft = t.onResolve(this._t("beforeCreate"), (() => {
            const i = e.component;
            const n = s.createChild();
            let r;
            if (Jt.isType(i)) r = this.container.get(i); else r = e.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.hE(o, null);
            return t.onResolve(this._t("hydrating"), (() => {
                l.hS(null);
                return t.onResolve(this._t("hydrated"), (() => {
                    l.hC();
                    this.Ft = void 0;
                }));
            }));
        }));
    }
    activate() {
        return t.onResolve(this.Ft, (() => t.onResolve(this._t("beforeActivate"), (() => t.onResolve(this.controller.activate(this.controller, null, 2, void 0), (() => this._t("afterActivate")))))));
    }
    deactivate() {
        return t.onResolve(this._t("beforeDeactivate"), (() => t.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this._t("afterDeactivate")))));
    }
    _t(e) {
        return t.resolveAll(...this.container.getAll(pt).reduce(((t, i) => {
            if (i.slot === e) t.push(i.run());
            return t;
        }), []));
    }
    dispose() {
        var t;
        null === (t = this.controller) || void 0 === t ? void 0 : t.dispose();
    }
}

class Refs {}

function Ye(t, e) {
    var i, s;
    return null !== (s = null === (i = t.$au) || void 0 === i ? void 0 : i[e]) && void 0 !== s ? s : null;
}

function Ze(t, e, i) {
    var s;
    var n;
    (null !== (s = (n = t).$au) && void 0 !== s ? s : n.$au = new Refs)[e] = i;
}

const Je = t.DI.createInterface("INode");

const Qe = t.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Xe, true)) return t.get(Xe).host;
    return t.get(W).document;
}))));

const ti = t.DI.createInterface("IRenderLocation");

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

const ei = new WeakMap;

function ii(t) {
    if (ei.has(t)) return ei.get(t);
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
        const e = Jt.for(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return ii(e.host);
    }
    return t.parentNode;
}

function si(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) ei.set(i[t], e);
    } else ei.set(t, e);
}

function ni(t) {
    if (ri(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function ri(t) {
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
            if ("AU-M" === r.nodeName) o[s] = ni(r); else o[s] = r;
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
        if (ri(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const oi = t.DI.createInterface("IWindow", (t => t.callback((t => t.get(W).window))));

const li = t.DI.createInterface("ILocation", (t => t.callback((t => t.get(oi).location))));

const hi = t.DI.createInterface("IHistory", (t => t.callback((t => t.get(oi).history))));

const ai = {
    [e.DelegationStrategy.capturing]: {
        capture: true
    },
    [e.DelegationStrategy.bubbling]: {
        capture: false
    }
};

class Listener {
    constructor(t, e, i, s, n, r, o, l) {
        this.platform = t;
        this.targetEvent = e;
        this.delegationStrategy = i;
        this.sourceExpression = s;
        this.target = n;
        this.preventDefault = r;
        this.eventDelegator = o;
        this.locator = l;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const i = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(e, "$event");
        if (true !== i && this.preventDefault) t.preventDefault();
        return i;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, i) {
        if (this.isBound) {
            if (this.$scope === i) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = i;
        const s = this.sourceExpression;
        if (s.hasBind) s.bind(t, i, this.interceptor);
        if (this.delegationStrategy === e.DelegationStrategy.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Qe), this.target, this.targetEvent, this, ai[this.delegationStrategy]);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const i = this.sourceExpression;
        if (i.hasUnbind) i.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.delegationStrategy === e.DelegationStrategy.none) this.target.removeEventListener(this.targetEvent, this); else {
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

const ci = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = ci) {
        this.Mt = t;
        this.Vt = e;
        this.jt = i;
        this.Nt = 0;
        this.Wt = new Map;
        this.Ht = new Map;
    }
    zt() {
        if (1 === ++this.Nt) this.Mt.addEventListener(this.Vt, this, this.jt);
    }
    Gt() {
        if (0 === --this.Nt) this.Mt.removeEventListener(this.Vt, this, this.jt);
    }
    dispose() {
        if (this.Nt > 0) {
            this.Nt = 0;
            this.Mt.removeEventListener(this.Vt, this, this.jt);
        }
        this.Wt.clear();
        this.Ht.clear();
    }
    Xt(t) {
        const e = true === this.jt.capture ? this.Wt : this.Ht;
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = x());
        return i;
    }
    handleEvent(t) {
        const e = true === this.jt.capture ? this.Wt : this.Ht;
        const i = t.composedPath();
        if (true === this.jt.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.Vt];
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
        this.Vt = i;
        t.zt();
        e[i] = s;
    }
    dispose() {
        this.Kt.Gt();
        this.Yt[this.Vt] = void 0;
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

const ui = t.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

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

const fi = t.DI.createInterface("IProjections");

const di = t.DI.createInterface("IAuSlotsInfo");

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

const pi = t.DI.createInterface("Instruction");

function mi(t) {
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

const vi = t.DI.createInterface("ITemplateCompiler");

const xi = t.DI.createInterface("IRenderer");

function gi(e) {
    return function s(n) {
        const r = function(...t) {
            const i = new n(...t);
            i.instructionType = e;
            return i;
        };
        r.register = function e(i) {
            t.Registration.singleton(xi, r).register(i);
        };
        const o = i.Metadata.getOwnKeys(n);
        for (const t of o) a(t, l(t, n), r);
        const h = Object.getOwnPropertyDescriptors(n);
        Object.keys(h).filter((t => "prototype" !== t)).forEach((t => {
            Reflect.defineProperty(r, t, h[t]);
        }));
        return r;
    };
}

function wi(t, e, i) {
    if (C(e)) return t.parse(e, i);
    return e;
}

function bi(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function yi(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Jt.for(t);

      case "view":
        throw new Error("AUR0750");

      case "view-model":
        return Jt.for(t).viewModel;

      default:
        {
            const i = Pt.for(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = Jt.for(t, {
                name: e
            });
            if (void 0 === s) throw new Error(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let ki = class SetPropertyRenderer {
    render(t, e, i) {
        const s = bi(e);
        if (void 0 !== s.$observers && void 0 !== s.$observers[i.to]) s.$observers[i.to].setValue(i.value, 2); else s[i.to] = i.value;
    }
};

ki = r([ gi("re") ], ki);

let Ci = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ee, W ];
    }
    render(e, i, s) {
        let n;
        let r;
        let o;
        let l;
        const h = s.res;
        const a = s.projections;
        const c = e.container;
        const u = Ki(this.p, e, i, s, i, null == a ? void 0 : new AuSlotsInfo(Object.keys(a)));
        switch (typeof h) {
          case "string":
            n = c.find(Jt, h);
            if (null == n) throw new Error(`AUR0752:${h}@${e["name"]}`);
            break;

          default:
            n = h;
        }
        r = n.Type;
        o = u.invoke(r);
        u.registerResolver(r, new t.InstanceProvider(n.key, o));
        l = Controller.$el(u, o, i, s, n);
        Ze(i, n.key, l);
        const f = this.r.renderers;
        const d = s.props;
        const p = d.length;
        let m = 0;
        let v;
        while (p > m) {
            v = d[m];
            f[v.type].render(e, l, v);
            ++m;
        }
        e.addChild(l);
    }
};

Ci = r([ gi("ra") ], Ci);

let Ai = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ee, W ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Pt, i.res);
            if (null == n) throw new Error(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = Yi(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(t.container, r, e, n);
        Ze(e, n.key, o);
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

Ai = r([ gi("rb") ], Ai);

let Ri = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Ee, W ];
    }
    render(t, e, i) {
        var s;
        let n = t.container;
        let r;
        switch (typeof i.res) {
          case "string":
            r = n.find(Pt, i.res);
            if (null == r) throw new Error(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            r = i.res;
        }
        const o = this.r.getViewFactory(i.def, n);
        const l = ni(e);
        const h = Yi(this.p, r, t, e, i, o, l);
        const a = Controller.$attr(t.container, h, e, r);
        Ze(l, r.key, a);
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

Ri = r([ gi("rc") ], Ri);

let Si = class LetElementRenderer {
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
            h = wi(this.ep, l.from, 8);
            a = new LetBinding(h, l.to, this.oL, r, n);
            t.addBinding(38962 === h.$kind ? Oi(a, h, r) : a);
            ++c;
        }
    }
};

Si.inject = [ e.IExpressionParser, e.IObserverLocator ];

Si = r([ gi("rd") ], Si);

let Ei = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = wi(this.ep, i.from, 8 | 4);
        const n = new CallBinding(s, bi(e), i.to, this.oL, t.container);
        t.addBinding(38962 === s.$kind ? Oi(n, s, t.container) : n);
    }
};

Ei.inject = [ e.IExpressionParser, e.IObserverLocator ];

Ei = r([ gi("rh") ], Ei);

let Bi = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = wi(this.ep, i.from, 8);
        const n = new RefBinding(s, yi(e, i.to), t.container);
        t.addBinding(38962 === s.$kind ? Oi(n, s, t.container) : n);
    }
};

Bi.inject = [ e.IExpressionParser ];

Bi = r([ gi("rj") ], Bi);

let Ii = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, i, s) {
        const n = t.container;
        const r = wi(this.ep, s.from, 1);
        const o = new InterpolationBinding(this.oL, r, bi(i), s.to, e.BindingMode.toView, n, this.p.domWriteQueue);
        const l = o.partBindings;
        const h = l.length;
        let a = 0;
        let c;
        for (;h > a; ++a) {
            c = l[a];
            if (38962 === c.sourceExpression.$kind) l[a] = Oi(c, c.sourceExpression, n);
        }
        t.addBinding(o);
    }
};

Ii.inject = [ e.IExpressionParser, e.IObserverLocator, W ];

Ii = r([ gi("rf") ], Ii);

let Ti = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = wi(this.ep, i.from, 8);
        const n = new PropertyBinding(s, bi(e), i.to, i.mode, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === s.$kind ? Oi(n, s, t.container) : n);
    }
};

Ti.inject = [ e.IExpressionParser, e.IObserverLocator, W ];

Ti = r([ gi("rg") ], Ti);

let Di = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, i, s) {
        const n = wi(this.ep, s.from, 2);
        const r = new PropertyBinding(n, bi(i), s.to, e.BindingMode.toView, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === n.iterable.$kind ? Oi(r, n.iterable, t.container) : r);
    }
};

Di.inject = [ e.IExpressionParser, e.IObserverLocator, W ];

Di = r([ gi("rk") ], Di);

let Pi = 0;

const $i = [];

function Oi(t, i, s) {
    while (i instanceof e.BindingBehaviorExpression) {
        $i[Pi++] = i;
        i = i.expression;
    }
    while (Pi > 0) {
        const i = $i[--Pi];
        const n = s.get(i.behaviorKey);
        if (n instanceof e.BindingBehaviorFactory) t = n.construct(t, i);
    }
    $i.length = 0;
    return t;
}

let Li = class TextBindingRenderer {
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
        const l = wi(this.ep, i.from, 1);
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
            t.addBinding(38962 === p.$kind ? Oi(d, p, s) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Li.inject = [ e.IExpressionParser, e.IObserverLocator, W ];

Li = r([ gi("ha") ], Li);

let qi = class ListenerBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.Jt = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = wi(this.ep, i.from, 4);
        const n = new Listener(this.p, i.to, i.strategy, s, e, i.preventDefault, this.Jt, t.container);
        t.addBinding(38962 === s.$kind ? Oi(n, s, t.container) : n);
    }
};

qi.inject = [ e.IExpressionParser, ui, W ];

qi = r([ gi("hb") ], qi);

let Ui = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

Ui = r([ gi("he") ], Ui);

let Fi = class SetClassAttributeRenderer {
    render(t, e, i) {
        Ni(e.classList, i.value);
    }
};

Fi = r([ gi("hf") ], Fi);

let _i = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

_i = r([ gi("hg") ], _i);

let Mi = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, i, s) {
        const n = wi(this.ep, s.from, 8);
        const r = new PropertyBinding(n, i.style, s.to, e.BindingMode.toView, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === n.$kind ? Oi(r, n, t.container) : r);
    }
};

Mi.inject = [ e.IExpressionParser, e.IObserverLocator, W ];

Mi = r([ gi("hd") ], Mi);

let Vi = class AttributeBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, i, s) {
        const n = wi(this.ep, s.from, 8);
        const r = new AttributeBinding(n, i, s.attr, s.to, e.BindingMode.toView, this.oL, t.container);
        t.addBinding(38962 === n.$kind ? Oi(r, n, t.container) : r);
    }
};

Vi.inject = [ e.IExpressionParser, e.IObserverLocator ];

Vi = r([ gi("hc") ], Vi);

let ji = class SpreadRenderer {
    constructor(t, e) {
        this.Qt = t;
        this.r = e;
    }
    static get inject() {
        return [ vi, Ee ];
    }
    render(e, i, s) {
        const n = e.container;
        const r = n.get(Ne);
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
            const c = Wi(a);
            const u = this.Qt.compileSpread(a.controller.definition, null !== (r = null === (n = a.instruction) || void 0 === n ? void 0 : n.captures) && void 0 !== r ? r : t.emptyArray, a.controller.container, i);
            let f;
            for (f of u) switch (f.type) {
              case "hs":
                h(s + 1);
                break;

              case "hp":
                o[f.instructions.type].render(c, Jt.for(i), f.instructions);
                break;

              default:
                o[f.type].render(c, i, f);
            }
            e.addBinding(c);
        };
        h(0);
    }
};

ji = r([ gi("hs") ], ji);

class SpreadBinding {
    constructor(t, e) {
        this.te = t;
        this.ee = e;
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
        const s = this.$scope = null !== (i = this.ee.controller.scope.parentScope) && void 0 !== i ? i : void 0;
        if (null == s) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.te.forEach((e => e.$bind(t, s)));
    }
    $unbind(t) {
        this.te.forEach((e => e.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.te.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function Ni(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const Wi = t => new SpreadBinding([], t);

const Hi = "IController";

const zi = "IInstruction";

const Gi = "IRenderLocation";

const Xi = "IAuSlotsInfo";

function Ki(e, i, s, n, r, o) {
    const l = i.container.createChild();
    l.registerResolver(e.HTMLElement, l.registerResolver(e.Element, l.registerResolver(Je, new t.InstanceProvider("ElementResolver", s))));
    l.registerResolver(je, new t.InstanceProvider(Hi, i));
    l.registerResolver(pi, new t.InstanceProvider(zi, n));
    l.registerResolver(ti, null == r ? Zi : new t.InstanceProvider(Gi, r));
    l.registerResolver(we, Ji);
    l.registerResolver(di, null == o ? Qi : new t.InstanceProvider(Xi, o));
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
        if (null === t) throw new Error("AUR7055");
        if (!C(t.name) || 0 === t.name.length) throw new Error("AUR0756");
        return t;
    }
}

function Yi(e, i, s, n, r, o, l, h) {
    const a = s.container.createChild();
    a.registerResolver(e.HTMLElement, a.registerResolver(e.Element, a.registerResolver(Je, new t.InstanceProvider("ElementResolver", n))));
    s = s instanceof Controller ? s : s.ctrl;
    a.registerResolver(je, new t.InstanceProvider(Hi, s));
    a.registerResolver(pi, new t.InstanceProvider(zi, r));
    a.registerResolver(ti, null == l ? Zi : new t.InstanceProvider(Gi, l));
    a.registerResolver(we, null == o ? Ji : new ViewFactoryProvider(o));
    a.registerResolver(di, null == h ? Qi : new t.InstanceProvider(Xi, h));
    return a.invoke(i.Type);
}

const Zi = new t.InstanceProvider(Gi);

const Ji = new ViewFactoryProvider(null);

const Qi = new t.InstanceProvider(Xi, new AuSlotsInfo(t.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function ts(t) {
    return function(e) {
        return ns.define(t, e);
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
    static create(e, i) {
        let s;
        let n;
        if (C(e)) {
            s = e;
            n = {
                name: s
            };
        } else {
            s = e.name;
            n = e;
        }
        return new BindingCommandDefinition(i, t.firstDefined(ss(i, "name"), s), t.mergeArrays(ss(i, "aliases"), n.aliases, i.aliases), is(s), t.firstDefined(ss(i, "type"), n.type, i.type, null));
    }
    register(i) {
        const {Type: s, key: n, aliases: r} = this;
        t.Registration.singleton(n, s).register(i);
        t.Registration.aliasTo(n, s).register(i);
        e.registerAliases(r, ns, n, i);
    }
}

const es = d("binding-command");

const is = t => `${es}:${t}`;

const ss = (t, e) => l(f(e), t);

const ns = Object.freeze({
    name: es,
    keyFrom: is,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        a(es, i, i.Type);
        a(es, i, i);
        p(e, es);
        return i.Type;
    },
    getAnnotation: ss
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
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : t.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = t.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, e.BindingMode.oneTime);
    }
};

exports.OneTimeBindingCommand.inject = [ G, e.IExpressionParser ];

exports.OneTimeBindingCommand = r([ ts("one-time") ], exports.OneTimeBindingCommand);

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
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : t.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = t.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, e.BindingMode.toView);
    }
};

exports.ToViewBindingCommand.inject = [ G, e.IExpressionParser ];

exports.ToViewBindingCommand = r([ ts("to-view") ], exports.ToViewBindingCommand);

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
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : t.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = t.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, e.BindingMode.fromView);
    }
};

exports.FromViewBindingCommand.inject = [ G, e.IExpressionParser ];

exports.FromViewBindingCommand = r([ ts("from-view") ], exports.FromViewBindingCommand);

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
        if (null == i.bindable) r = null !== (s = this.m.map(i.node, r)) && void 0 !== s ? s : t.camelCase(r); else {
            if ("" === o && 1 === i.def.type) o = t.camelCase(r);
            r = i.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, e.BindingMode.twoWay);
    }
};

exports.TwoWayBindingCommand.inject = [ G, e.IExpressionParser ];

exports.TwoWayBindingCommand = r([ ts("two-way") ], exports.TwoWayBindingCommand);

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
            l = this.m.isTwoWay(i.node, h) ? e.BindingMode.twoWay : e.BindingMode.toView;
            h = null !== (s = this.m.map(i.node, h)) && void 0 !== s ? s : t.camelCase(h);
        } else {
            if ("" === a && 1 === i.def.type) a = t.camelCase(h);
            o = i.def.defaultBindingMode;
            l = r.mode === e.BindingMode.default || null == r.mode ? null == o || o === e.BindingMode.default ? e.BindingMode.toView : o : r.mode;
            h = r.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(a, 8), h, l);
    }
};

exports.DefaultBindingCommand.inject = [ G, e.IExpressionParser ];

exports.DefaultBindingCommand = r([ ts("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(e) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new CallBindingInstruction(this.ep.parse(e.attr.rawValue, 8 | 4), i);
    }
};

exports.CallBindingCommand.inject = [ e.IExpressionParser ];

exports.CallBindingCommand = r([ ts("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(e) {
        const i = null === e.bindable ? t.camelCase(e.attr.target) : e.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(e.attr.rawValue, 2), i);
    }
};

exports.ForBindingCommand.inject = [ e.IExpressionParser ];

exports.ForBindingCommand = r([ ts("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "trigger";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, true, e.DelegationStrategy.none);
    }
};

exports.TriggerBindingCommand.inject = [ e.IExpressionParser ];

exports.TriggerBindingCommand = r([ ts("trigger") ], exports.TriggerBindingCommand);

exports.DelegateBindingCommand = class DelegateBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "delegate";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, e.DelegationStrategy.bubbling);
    }
};

exports.DelegateBindingCommand.inject = [ e.IExpressionParser ];

exports.DelegateBindingCommand = r([ ts("delegate") ], exports.DelegateBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "capture";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, e.DelegationStrategy.capturing);
    }
};

exports.CaptureBindingCommand.inject = [ e.IExpressionParser ];

exports.CaptureBindingCommand = r([ ts("capture") ], exports.CaptureBindingCommand);

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

exports.AttrBindingCommand.inject = [ e.IExpressionParser ];

exports.AttrBindingCommand = r([ ts("attr") ], exports.AttrBindingCommand);

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

exports.StyleBindingCommand.inject = [ e.IExpressionParser ];

exports.StyleBindingCommand = r([ ts("style") ], exports.StyleBindingCommand);

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

exports.ClassBindingCommand.inject = [ e.IExpressionParser ];

exports.ClassBindingCommand = r([ ts("class") ], exports.ClassBindingCommand);

let rs = class RefBindingCommand {
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

rs.inject = [ e.IExpressionParser ];

rs = r([ ts("ref") ], rs);

let os = class SpreadBindingCommand {
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

os = r([ ts("...$attrs") ], os);

const ls = t.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const hs = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ie = t.document.createElement("template");
    }
    createTemplate(t) {
        var e;
        if (C(t)) {
            let e = hs[t];
            if (void 0 === e) {
                const i = this.ie;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.ie = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                hs[t] = e;
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

const as = function(e) {
    function i(e, s, n) {
        t.DI.inject(i)(e, s, n);
    }
    i.$isResolver = true;
    i.resolve = function(t, i) {
        if (i.root === i) return i.getAll(e, false);
        return i.has(e, false) ? i.getAll(e, false).concat(i.root.getAll(e, false)) : i.root.getAll(e, false);
    };
    return i;
};

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(e) {
        return t.Registration.singleton(vi, this).register(e);
    }
    compile(e, i, s) {
        var n, r, o, l;
        const h = CustomElementDefinition.getOrCreate(e);
        if (null === h.template || void 0 === h.template) return h;
        if (false === h.needsCompile) return h;
        null !== s && void 0 !== s ? s : s = fs;
        const a = new CompilationContext(e, i, s, null, null, void 0);
        const c = C(h.template) || !e.enhance ? a.se.createTemplate(h.template) : h.template;
        const u = "TEMPLATE" === c.nodeName && null != c.content;
        const f = u ? c.content : c;
        const d = i.get(as(Cs));
        const p = d.length;
        let m = 0;
        if (p > 0) while (p > m) {
            null === (r = (n = d[m]).compiling) || void 0 === r ? void 0 : r.call(n, c);
            ++m;
        }
        if (c.hasAttribute(bs)) throw new Error("AUR0701");
        this.ne(f, a);
        this.re(f, a);
        return CustomElementDefinition.create({
            ...e,
            name: e.name || Bs(),
            dependencies: (null !== (o = e.dependencies) && void 0 !== o ? o : t.emptyArray).concat(null !== (l = a.deps) && void 0 !== l ? l : t.emptyArray),
            instructions: a.rows,
            surrogates: u ? this.oe(c, a) : t.emptyArray,
            template: c,
            hasSlots: a.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(e, i, s, n) {
        var r;
        const o = new CompilationContext(e, s, fs, null, null, void 0);
        const l = [];
        const h = o.le(n.nodeName.toLowerCase());
        const a = o.ep;
        const c = i.length;
        let u = 0;
        let f;
        let d = null;
        let p;
        let m;
        let v;
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
            w = o.he(f);
            if (null !== w && (1 & w.type) > 0) {
                ps.node = n;
                ps.attr = f;
                ps.bindable = null;
                ps.def = null;
                l.push(w.build(ps));
                continue;
            }
            d = o.ae(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                v = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && cs(C);
                if (y) m = this.ce(n, C, d, o); else {
                    g = v.primary;
                    if (null === w) {
                        b = a.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, g.property) : new InterpolationInstruction(b, g.property) ];
                    } else {
                        ps.node = n;
                        ps.attr = f;
                        ps.bindable = g;
                        ps.def = d;
                        m = [ w.build(ps) ];
                    }
                }
                (null !== p && void 0 !== p ? p : p = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === w) {
                b = a.parse(C, 1);
                if (null !== h) {
                    v = BindablesInfo.from(h, false);
                    x = v.attrs[k];
                    if (void 0 !== x) {
                        b = a.parse(C, 1);
                        l.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(C, x.property) : new InterpolationInstruction(b, x.property)));
                        continue;
                    }
                }
                if (null != b) l.push(new InterpolationInstruction(b, null !== (r = o.m.map(n, k)) && void 0 !== r ? r : t.camelCase(k))); else switch (k) {
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
                    v = BindablesInfo.from(h, false);
                    x = v.attrs[k];
                    if (void 0 !== x) {
                        ps.node = n;
                        ps.attr = f;
                        ps.bindable = x;
                        ps.def = h;
                        l.push(new SpreadElementPropBindingInstruction(w.build(ps)));
                        continue;
                    }
                }
                ps.node = n;
                ps.attr = f;
                ps.bindable = null;
                ps.def = null;
                l.push(w.build(ps));
            }
        }
        us();
        if (null != p) return p.concat(l);
        return l;
    }
    oe(e, i) {
        var s;
        const n = [];
        const r = e.attributes;
        const o = i.ep;
        let l = r.length;
        let h = 0;
        let a;
        let c;
        let u;
        let f;
        let d = null;
        let p;
        let m;
        let v;
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
            f = i.ue.parse(c, u);
            y = f.target;
            k = f.rawValue;
            if (ms[y]) throw new Error(`AUR0702:${c}`);
            g = i.he(f);
            if (null !== g && (1 & g.type) > 0) {
                ps.node = e;
                ps.attr = f;
                ps.bindable = null;
                ps.def = null;
                n.push(g.build(ps));
                continue;
            }
            d = i.ae(y);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${y}`);
                v = BindablesInfo.from(d, true);
                b = false === d.noMultiBindings && null === g && cs(k);
                if (b) m = this.ce(e, k, d, i); else {
                    x = v.primary;
                    if (null === g) {
                        w = o.parse(k, 1);
                        m = [ null === w ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(w, x.property) ];
                    } else {
                        ps.node = e;
                        ps.attr = f;
                        ps.bindable = x;
                        ps.def = d;
                        m = [ g.build(ps) ];
                    }
                }
                e.removeAttribute(c);
                --h;
                --l;
                (null !== p && void 0 !== p ? p : p = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(y) ? y : void 0, m));
                continue;
            }
            if (null === g) {
                w = o.parse(k, 1);
                if (null != w) {
                    e.removeAttribute(c);
                    --h;
                    --l;
                    n.push(new InterpolationInstruction(w, null !== (s = i.m.map(e, y)) && void 0 !== s ? s : t.camelCase(y)));
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
                ps.node = e;
                ps.attr = f;
                ps.bindable = null;
                ps.def = null;
                n.push(g.build(ps));
            }
        }
        us();
        if (null != p) return p.concat(n);
        return n;
    }
    re(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.fe(t, e);

              default:
                return this.de(t, e);
            }

          case 3:
            return this.pe(t, e);

          case 11:
            {
                let i = t.firstChild;
                while (null !== i) i = this.re(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    fe(i, s) {
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
        let m;
        let v;
        let x;
        for (;r > a; ++a) {
            c = n[a];
            f = c.name;
            d = c.value;
            if ("to-binding-context" === f) {
                h = true;
                continue;
            }
            u = s.ue.parse(f, d);
            m = u.target;
            v = u.rawValue;
            p = s.he(u);
            if (null !== p) switch (p.name) {
              case "to-view":
              case "bind":
                o.push(new LetBindingInstruction(l.parse(v, 8), t.camelCase(m)));
                continue;

              default:
                throw new Error(`AUR0704:${u.command}`);
            }
            x = l.parse(v, 1);
            o.push(new LetBindingInstruction(null === x ? new e.PrimitiveLiteralExpression(v) : x, t.camelCase(m)));
        }
        s.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.me(i).nextSibling;
    }
    de(e, i) {
        var s, n, r, o, l, h;
        var a, c;
        const u = e.nextSibling;
        const f = (null !== (s = e.getAttribute("as-element")) && void 0 !== s ? s : e.nodeName).toLowerCase();
        const d = i.le(f);
        const p = !!(null === d || void 0 === d ? void 0 : d.capture);
        const m = p ? [] : t.emptyArray;
        const v = i.ep;
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
        let F;
        let _;
        let M;
        let V;
        let j = true;
        let N = false;
        if ("slot" === f) i.root.hasSlot = true;
        if (null !== d) {
            j = null === (n = d.processContent) || void 0 === n ? void 0 : n.call(d.Type, e, i.p);
            g = e.attributes;
            b = g.length;
        }
        if (i.root.def.enhance && e.classList.contains("au")) throw new Error(`AUR0705`);
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
            R = i.ue.parse(C, A);
            U = i.he(R);
            M = R.target;
            V = R.rawValue;
            if (p) {
                if (null != U && 1 & U.type) {
                    x();
                    m.push(R);
                    continue;
                }
                if ("au-slot" !== M) {
                    F = BindablesInfo.from(d, false);
                    if (null == F.attrs[M] && !(null === (r = i.ae(M)) || void 0 === r ? void 0 : r.isTemplateController)) {
                        x();
                        m.push(R);
                        continue;
                    }
                }
            }
            if (null !== U && 1 & U.type) {
                ps.node = e;
                ps.attr = R;
                ps.bindable = null;
                ps.def = null;
                (null !== S && void 0 !== S ? S : S = []).push(U.build(ps));
                x();
                continue;
            }
            B = i.ae(M);
            if (null !== B) {
                F = BindablesInfo.from(B, true);
                I = false === B.noMultiBindings && null === U && cs(V);
                if (I) P = this.ce(e, V, B, i); else {
                    _ = F.primary;
                    if (null === U) {
                        L = v.parse(V, 1);
                        P = [ null === L ? new SetPropertyInstruction(V, _.property) : new InterpolationInstruction(L, _.property) ];
                    } else {
                        ps.node = e;
                        ps.attr = R;
                        ps.bindable = _;
                        ps.def = B;
                        P = [ U.build(ps) ];
                    }
                }
                x();
                if (B.isTemplateController) (null !== $ && void 0 !== $ ? $ : $ = []).push(new HydrateTemplateController(ds, this.resolveResources ? B : B.name, void 0, P)); else (null !== D && void 0 !== D ? D : D = []).push(new HydrateAttributeInstruction(this.resolveResources ? B : B.name, null != B.aliases && B.aliases.includes(M) ? M : void 0, P));
                continue;
            }
            if (null === U) {
                if (null !== d) {
                    F = BindablesInfo.from(d, false);
                    T = F.attrs[M];
                    if (void 0 !== T) {
                        L = v.parse(V, 1);
                        (null !== E && void 0 !== E ? E : E = []).push(null == L ? new SetPropertyInstruction(V, T.property) : new InterpolationInstruction(L, T.property));
                        x();
                        continue;
                    }
                }
                L = v.parse(V, 1);
                if (null != L) {
                    x();
                    (null !== S && void 0 !== S ? S : S = []).push(new InterpolationInstruction(L, null !== (o = i.m.map(e, M)) && void 0 !== o ? o : t.camelCase(M)));
                }
                continue;
            }
            x();
            if (null !== d) {
                F = BindablesInfo.from(d, false);
                T = F.attrs[M];
                if (void 0 !== T) {
                    ps.node = e;
                    ps.attr = R;
                    ps.bindable = T;
                    ps.def = d;
                    (null !== E && void 0 !== E ? E : E = []).push(U.build(ps));
                    continue;
                }
            }
            ps.node = e;
            ps.attr = R;
            ps.bindable = null;
            ps.def = null;
            (null !== S && void 0 !== S ? S : S = []).push(U.build(ps));
        }
        us();
        if (this.ve(e) && null != S && S.length > 1) this.xe(e, S);
        if (null !== d) {
            q = new HydrateElementInstruction(this.resolveResources ? d : d.name, void 0, null !== E && void 0 !== E ? E : t.emptyArray, null, N, m);
            if ("au-slot" === f) {
                const t = e.getAttribute("name") || "default";
                const s = i.h("template");
                const n = i.ge();
                let r = e.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) e.removeChild(r); else s.content.appendChild(r);
                    r = e.firstChild;
                }
                this.re(s.content, n);
                q.auSlot = {
                    name: t,
                    fallback: CustomElementDefinition.create({
                        name: Bs(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                e = this.we(e, i);
            }
        }
        if (null != S || null != q || null != D) {
            w = t.emptyArray.concat(null !== q && void 0 !== q ? q : t.emptyArray, null !== D && void 0 !== D ? D : t.emptyArray, null !== S && void 0 !== S ? S : t.emptyArray);
            this.me(e);
        }
        let W;
        if (null != $) {
            b = $.length - 1;
            y = b;
            O = $[y];
            let t;
            this.we(e, i);
            if ("TEMPLATE" === e.nodeName) t = e; else {
                t = i.h("template");
                t.content.appendChild(e);
            }
            const s = t;
            const n = i.ge(null == w ? [] : [ w ]);
            let r;
            let o;
            let h;
            let c;
            let u;
            let p;
            let m;
            let v;
            let x = 0, g = 0;
            let k = e.firstChild;
            if (false !== j) while (null !== k) if (1 === k.nodeType) {
                r = k;
                k = k.nextSibling;
                o = r.getAttribute("au-slot");
                if (null !== o) {
                    if (null === d) throw new Error(`AUR0706:${f}[${o}]`);
                    if ("" === o) o = "default";
                    r.removeAttribute("au-slot");
                    e.removeChild(r);
                    (null !== (l = (a = null !== c && void 0 !== c ? c : c = {})[o]) && void 0 !== l ? l : a[o] = []).push(r);
                }
            } else k = k.nextSibling;
            if (null != c) {
                h = {};
                for (o in c) {
                    t = i.h("template");
                    u = c[o];
                    for (x = 0, g = u.length; g > x; ++x) {
                        p = u[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) t.content.appendChild(p); else t.content.appendChild(p.content); else t.content.appendChild(p);
                    }
                    v = i.ge();
                    this.re(t.content, v);
                    h[o] = CustomElementDefinition.create({
                        name: Bs(),
                        template: t,
                        instructions: v.rows,
                        needsCompile: false,
                        isStrictBinding: i.root.def.isStrictBinding
                    });
                }
                q.projections = h;
            }
            if (null !== d && d.containerless) this.we(e, i);
            W = null === d || !d.containerless && !N && false !== j;
            if (W) if ("TEMPLATE" === e.nodeName) this.re(e.content, n); else {
                k = e.firstChild;
                while (null !== k) k = this.re(k, n);
            }
            O.def = CustomElementDefinition.create({
                name: Bs(),
                template: s,
                instructions: n.rows,
                needsCompile: false,
                isStrictBinding: i.root.def.isStrictBinding
            });
            while (y-- > 0) {
                O = $[y];
                t = i.h("template");
                m = i.h("au-m");
                m.classList.add("au");
                t.content.appendChild(m);
                O.def = CustomElementDefinition.create({
                    name: Bs(),
                    template: t,
                    needsCompile: false,
                    instructions: [ [ $[y + 1] ] ],
                    isStrictBinding: i.root.def.isStrictBinding
                });
            }
            i.rows.push([ O ]);
        } else {
            if (null != w) i.rows.push(w);
            let t = e.firstChild;
            let s;
            let n;
            let r = null;
            let o;
            let l;
            let a;
            let u;
            let f;
            let p = 0, m = 0;
            if (false !== j) while (null !== t) if (1 === t.nodeType) {
                s = t;
                t = t.nextSibling;
                n = s.getAttribute("au-slot");
                if (null !== n) {
                    if (null === d) throw new Error(`AUR0706:${e.nodeName}[${n}]`);
                    if ("" === n) n = "default";
                    e.removeChild(s);
                    s.removeAttribute("au-slot");
                    (null !== (h = (c = null !== o && void 0 !== o ? o : o = {})[n]) && void 0 !== h ? h : c[n] = []).push(s);
                }
            } else t = t.nextSibling;
            if (null != o) {
                r = {};
                for (n in o) {
                    u = i.h("template");
                    l = o[n];
                    for (p = 0, m = l.length; m > p; ++p) {
                        a = l[p];
                        if ("TEMPLATE" === a.nodeName) if (a.attributes.length > 0) u.content.appendChild(a); else u.content.appendChild(a.content); else u.content.appendChild(a);
                    }
                    f = i.ge();
                    this.re(u.content, f);
                    r[n] = CustomElementDefinition.create({
                        name: Bs(),
                        template: u,
                        instructions: f.rows,
                        needsCompile: false,
                        isStrictBinding: i.root.def.isStrictBinding
                    });
                }
                q.projections = r;
            }
            if (null !== d && d.containerless) this.we(e, i);
            W = null === d || !d.containerless && !N && false !== j;
            if (W && e.childNodes.length > 0) {
                t = e.firstChild;
                while (null !== t) t = this.re(t, i);
            }
        }
        return u;
    }
    pe(t, e) {
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
    ce(t, e, i, s) {
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
                f = s.ue.parse(l, h);
                d = s.he(f);
                p = n.attrs[f.target];
                if (null == p) throw new Error(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    ps.node = t;
                    ps.attr = f;
                    ps.bindable = p;
                    ps.def = i;
                    o.push(d.build(ps));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                a = m;
                l = void 0;
                h = void 0;
            }
        }
        us();
        return o;
    }
    ne(e, i) {
        var s, n;
        const r = e;
        const o = t.toArray(r.querySelectorAll("template[as-custom-element]"));
        const l = o.length;
        if (0 === l) return;
        if (l === r.childElementCount) throw new Error("AUR0708");
        const h = new Set;
        const a = [];
        for (const e of o) {
            if (e.parentNode !== r) throw new Error("AUR0709");
            const s = ys(e, h);
            const n = class LocalTemplate {};
            const o = e.content;
            const l = t.toArray(o.querySelectorAll("bindable"));
            const c = E.for(n);
            const u = new Set;
            const f = new Set;
            for (const t of l) {
                if (t.parentNode !== o) throw new Error("AUR0710");
                const e = t.getAttribute("property");
                if (null === e) throw new Error("AUR0711");
                const i = t.getAttribute("attribute");
                if (null !== i && f.has(i) || u.has(e)) throw new Error(`AUR0712:${e}+${i}`); else {
                    if (null !== i) f.add(i);
                    u.add(e);
                }
                c.add({
                    property: e,
                    attribute: null !== i && void 0 !== i ? i : void 0,
                    mode: ks(t)
                });
                const s = t.getAttributeNames().filter((t => !ws.includes(t)));
                if (s.length > 0) ;
                o.removeChild(t);
            }
            a.push(n);
            i.be(Jt.define({
                name: s,
                template: e
            }, n));
            r.removeChild(e);
        }
        let c = 0;
        const u = a.length;
        for (;u > c; ++c) Jt.getDefinition(a[c]).dependencies.push(...null !== (s = i.def.dependencies) && void 0 !== s ? s : t.emptyArray, ...null !== (n = i.deps) && void 0 !== n ? n : t.emptyArray);
    }
    ve(t) {
        return "INPUT" === t.nodeName && 1 === vs[t.type];
    }
    xe(t, e) {
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
    we(t, e) {
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
        this.ye = x();
        const h = null !== r;
        this.c = s;
        this.root = null === o ? this : o;
        this.def = i;
        this.ci = n;
        this.parent = r;
        this.se = h ? r.se : s.get(ls);
        this.ue = h ? r.ue : s.get(U);
        this.ep = h ? r.ep : s.get(e.IExpressionParser);
        this.m = h ? r.m : s.get(G);
        this.Ut = h ? r.Ut : s.get(t.ILogger);
        this.p = h ? r.p : s.get(W);
        this.localEls = h ? r.localEls : new Set;
        this.rows = null !== l && void 0 !== l ? l : [];
    }
    be(t) {
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
    le(t) {
        return this.c.find(Jt, t);
    }
    ae(t) {
        return this.c.find(Pt, t);
    }
    ge(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    he(t) {
        if (this.root !== this) return this.root.he(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.ye[e];
        if (void 0 === i) {
            i = this.c.create(ns, e);
            if (null === i) throw new Error(`AUR0713:${e}`);
            this.ye[e] = i;
        }
        return i;
    }
}

function cs(t) {
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

function us() {
    ps.node = ps.attr = ps.bindable = ps.def = null;
}

const fs = {
    projections: null
};

const ds = {
    name: "unnamed"
};

const ps = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const ms = Object.assign(x(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const vs = {
    checkbox: 1,
    radio: 1
};

const xs = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, i) {
        let s = xs.get(t);
        if (null == s) {
            const n = t.bindables;
            const r = x();
            const o = i ? void 0 === t.defaultBindingMode ? e.BindingMode.default : t.defaultBindingMode : e.BindingMode.default;
            let l;
            let h;
            let a = false;
            let c;
            let u;
            for (h in n) {
                l = n[h];
                u = l.attribute;
                if (true === l.primary) {
                    if (a) throw new Error(`AUR0714:${t.name}`);
                    a = true;
                    c = l;
                } else if (!a && null == c) c = l;
                r[u] = BindableDefinition.create(h, t.Type, l);
            }
            if (null == l && i) c = r.value = BindableDefinition.create("value", t.Type, {
                mode: o
            });
            xs.set(t, s = new BindablesInfo(r, n, c));
        }
        return s;
    }
}

var gs;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(gs || (gs = {}));

const ws = Object.freeze([ "property", "attribute", "mode" ]);

const bs = "as-custom-element";

function ys(t, e) {
    const i = t.getAttribute(bs);
    if (null === i || "" === i) throw new Error("AUR0715");
    if (e.has(i)) throw new Error(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(bs);
    }
    return i;
}

function ks(t) {
    switch (t.getAttribute("mode")) {
      case "oneTime":
        return e.BindingMode.oneTime;

      case "toView":
        return e.BindingMode.toView;

      case "fromView":
        return e.BindingMode.fromView;

      case "twoWay":
        return e.BindingMode.twoWay;

      case "default":
      default:
        return e.BindingMode.default;
    }
}

const Cs = t.DI.createInterface("ITemplateCompilerHooks");

const As = new WeakMap;

const Rs = d("compiler-hooks");

const Ss = Object.freeze({
    name: Rs,
    define(t) {
        let e = As.get(t);
        if (void 0 === e) {
            As.set(t, e = new TemplateCompilerHooksDefinition(t));
            a(Rs, e, t);
            p(t, Rs);
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
    register(e) {
        e.register(t.Registration.singleton(Cs, this.Type));
    }
}

const Es = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Ss.define(t);
    }
};

const Bs = Jt.generateName;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
        this.ke = new Map;
    }
    bind(t, e, i) {
        this.ke.set(i, i.mode);
        i.mode = this.mode;
    }
    unbind(t, e, i) {
        i.mode = this.ke.get(i);
        this.ke.delete(i);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(e.BindingMode.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(e.BindingMode.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(e.BindingMode.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(e.BindingMode.twoWay);
    }
}

e.bindingBehavior("oneTime")(OneTimeBindingBehavior);

e.bindingBehavior("toView")(ToViewBindingBehavior);

e.bindingBehavior("fromView")(FromViewBindingBehavior);

e.bindingBehavior("twoWay")(TwoWayBindingBehavior);

const Is = 200;

class DebounceBindingBehavior extends e.BindingInterceptor {
    constructor(e, i) {
        super(e, i);
        this.opts = {
            delay: Is
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = e.locator.get(t.IPlatform).taskQueue;
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
            this.opts.delay = isNaN(i) ? Is : i;
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

e.bindingBehavior("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Yt = new Map;
        this.Ce = t;
    }
    bind(t, e, i, ...s) {
        if (!("handleChange" in i)) throw new Error("AUR0817");
        if (0 === s.length) throw new Error("AUR0818");
        this.Yt.set(i, s);
        let n;
        for (n of s) this.Ce.addSignalListener(n, i);
    }
    unbind(t, e, i) {
        const s = this.Yt.get(i);
        this.Yt.delete(i);
        let n;
        for (n of s) this.Ce.removeSignalListener(n, i);
    }
}

SignalBindingBehavior.inject = [ e.ISignaler ];

e.bindingBehavior("signal")(SignalBindingBehavior);

const Ts = 200;

class ThrottleBindingBehavior extends e.BindingInterceptor {
    constructor(e, i) {
        super(e, i);
        this.opts = {
            delay: Ts
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = e.locator.get(t.IPlatform);
        this.Ae = this.p.taskQueue;
        if (i.args.length > 0) this.firstArg = i.args[0];
    }
    callSource(t) {
        this.Re((() => this.binding.callSource(t)));
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
        this.Re((() => this.binding.updateSource(t, e)));
    }
    Re(t) {
        const e = this.opts;
        const i = this.p;
        const s = this.lastCall + e.delay - i.performanceNow();
        if (s > 0) {
            const n = this.task;
            e.delay = s;
            this.task = this.Ae.queueTask((() => {
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
            this.opts.delay = this.delay = isNaN(i) ? Ts : i;
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

e.bindingBehavior("throttle")(ThrottleBindingBehavior);

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

const Ds = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, i) {
        i.targetObserver = Ds;
    }
    unbind(t, e, i) {
        return;
    }
}

e.bindingBehavior("attr")(AttrBindingBehavior);

function Ps(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e, i) {
        if (!i.callSource || !i.targetEvent) throw new Error("AUR0801");
        i.selfEventCallSource = i.callSource;
        i.callSource = Ps;
    }
    unbind(t, e, i) {
        i.callSource = i.selfEventCallSource;
        i.selfEventCallSource = null;
    }
}

e.bindingBehavior("self")(SelfBindingBehavior);

const $s = x();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        var e;
        return null !== (e = $s[t]) && void 0 !== e ? e : $s[t] = new AttributeNSAccessor(t);
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i, s) {
        if (null == t) i.removeAttributeNS(this.ns, s); else i.setAttributeNS(this.ns, s, t);
    }
}

function Os(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Se = void 0;
        this.Ee = void 0;
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
        this.Be();
        this.Ie();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.Ie();
    }
    handleChange(t, e, i) {
        this.Ie();
    }
    Ie() {
        const t = this.v;
        const e = this.o;
        const i = g.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Os;
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
        const n = void 0 !== e.matcher ? e.matcher : Os;
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
        this.Be();
    }
    stop() {
        var t, e;
        this.handler.dispose();
        null === (t = this.Se) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Se = void 0;
        null === (e = this.Ee) || void 0 === e ? void 0 : e.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        Ls = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ls, this.f);
    }
    Be() {
        var t, e, i, s, n, r, o;
        const l = this.o;
        null === (n = null !== (t = this.Ee) && void 0 !== t ? t : this.Ee = null !== (i = null === (e = l.$observers) || void 0 === e ? void 0 : e.model) && void 0 !== i ? i : null === (s = l.$observers) || void 0 === s ? void 0 : s.value) || void 0 === n ? void 0 : n.subscribe(this);
        null === (r = this.Se) || void 0 === r ? void 0 : r.unsubscribe(this);
        this.Se = void 0;
        if ("checkbox" === l.type) null === (o = this.Se = Gs(this.v, this.oL)) || void 0 === o ? void 0 : o.subscribe(this);
    }
}

e.subscriberCollection(CheckedObserver);

e.withFlushQueue(CheckedObserver);

let Ls;

const qs = {
    childList: true,
    subtree: true,
    characterData: true
};

function Us(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.Te = void 0;
        this.De = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Fs(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Pe(t instanceof Array ? t : null);
        if (0 === (256 & e)) this.K();
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
        var t;
        const e = this.v;
        const i = this.o;
        const s = Array.isArray(e);
        const n = null !== (t = i.matcher) && void 0 !== t ? t : Us;
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
            const o = t.matcher || Us;
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
    $e() {
        (this.De = new this.o.ownerDocument.defaultView.MutationObserver(this.Oe.bind(this))).observe(this.o, qs);
        this.Pe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Le() {
        var t;
        this.De.disconnect();
        null === (t = this.Te) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.De = this.Te = void 0;
        this.iO = false;
    }
    Pe(t) {
        var e;
        null === (e = this.Te) || void 0 === e ? void 0 : e.unsubscribe(this);
        this.Te = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error("AUR0654");
            (this.Te = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    Oe(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.$e();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Le();
        }
    }
    flush() {
        _s = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, _s, 0);
    }
}

e.subscriberCollection(SelectValueObserver);

e.withFlushQueue(SelectValueObserver);

function Fs(t) {
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

let _s;

const Ms = "--";

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
        if (0 === (256 & e)) this.K();
    }
    qe(t) {
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
    Ue(e) {
        let i;
        let s;
        const n = [];
        for (s in e) {
            i = e[s];
            if (null == i) continue;
            if (C(i)) {
                if (s.startsWith(Ms)) {
                    n.push([ s, i ]);
                    continue;
                }
                n.push([ t.kebabCase(s), i ]);
                continue;
            }
            n.push(...this.Fe(i));
        }
        return n;
    }
    _e(e) {
        const i = e.length;
        if (i > 0) {
            const t = [];
            let s = 0;
            for (;i > s; ++s) t.push(...this.Fe(e[s]));
            return t;
        }
        return t.emptyArray;
    }
    Fe(e) {
        if (C(e)) return this.qe(e);
        if (e instanceof Array) return this._e(e);
        if (e instanceof Object) return this.Ue(e);
        return t.emptyArray;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const i = this.Fe(t);
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
        if (!this.handler.config.readonly && 0 === (256 & e)) this.K(e);
    }
    K(t) {
        var e;
        if (this.H) {
            this.H = false;
            this.o[this.k] = null !== (e = this.v) && void 0 !== e ? e : this.handler.config.default;
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
        Vs = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Vs, 0);
    }
}

e.subscriberCollection(ValueAttributeObserver);

e.withFlushQueue(ValueAttributeObserver);

let Vs;

const js = "http://www.w3.org/1999/xlink";

const Ns = "http://www.w3.org/XML/1998/namespace";

const Ws = "http://www.w3.org/2000/xmlns/";

const Hs = Object.assign(x(), {
    "xlink:actuate": [ "actuate", js ],
    "xlink:arcrole": [ "arcrole", js ],
    "xlink:href": [ "href", js ],
    "xlink:role": [ "role", js ],
    "xlink:show": [ "show", js ],
    "xlink:title": [ "title", js ],
    "xlink:type": [ "type", js ],
    "xml:lang": [ "lang", Ns ],
    "xml:space": [ "space", Ns ],
    xmlns: [ "xmlns", Ws ],
    "xmlns:xlink": [ "xlink", Ws ]
});

const zs = new e.PropertyAccessor;

zs.type = 2 | 4;

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
        this.Ve = x();
        this.je = x();
        this.Ne = x();
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
        t.Registration.aliasTo(e.INodeObserverLocator, NodeObserverLocator).register(i);
        t.Registration.singleton(e.INodeObserverLocator, NodeObserverLocator).register(i);
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
            if (null == o[e]) o[e] = new NodeObserverConfig(i); else Xs(t, e);
        } else for (const i in t) {
            o = null !== (n = r[i]) && void 0 !== n ? n : r[i] = x();
            const s = t[i];
            for (e in s) if (null == o[e]) o[e] = new NodeObserverConfig(s[e]); else Xs(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ve;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else Xs("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else Xs("*", t);
    }
    getAccessor(e, i, s) {
        var n;
        if (i in this.Ne || i in (null !== (n = this.je[e.tagName]) && void 0 !== n ? n : t.emptyObject)) return this.getObserver(e, i, s);
        switch (i) {
          case "src":
          case "href":
          case "role":
            return Ds;

          default:
            {
                const t = Hs[i];
                if (void 0 !== t) return AttributeNSAccessor.forNs(t[1]);
                if (b(e, i, this.svgAnalyzer)) return Ds;
                return zs;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        var n, r;
        let o;
        if (C(t)) {
            o = null !== (i = (n = this.je)[t]) && void 0 !== i ? i : n[t] = x();
            o[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            o = null !== (s = (r = this.je)[e]) && void 0 !== s ? s : r[e] = x();
            o[i] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.Ne[e] = true;
    }
    getObserver(t, i, s) {
        var n, r;
        switch (i) {
          case "role":
            return Ds;

          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const o = null !== (r = null === (n = this.Me[t.tagName]) || void 0 === n ? void 0 : n[i]) && void 0 !== r ? r : this.Ve[i];
        if (null != o) return new o.type(t, i, new EventSubscriber(o), s, this.locator);
        const l = Hs[i];
        if (void 0 !== l) return AttributeNSAccessor.forNs(l[1]);
        if (b(t, i, this.svgAnalyzer)) return Ds;
        if (i in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, i);
            throw new Error(`AUR0652:${String(i)}`);
        } else return new e.SetterObserver(t, i);
    }
}

NodeObserverLocator.inject = [ t.IServiceLocator, W, e.IDirtyChecker, H ];

function Gs(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Xs(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, i, s, ...n) {
        if (0 === n.length) throw new Error(`AUR0802`);
        if (s.mode !== e.BindingMode.twoWay && s.mode !== e.BindingMode.fromView) throw new Error("AUR0803");
        const r = this.oL.getObserver(s.target, s.targetProperty);
        if (!r.handler) throw new Error("AUR0804");
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

UpdateTriggerBindingBehavior.inject = [ e.IObserverLocator ];

e.bindingBehavior("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.We = t;
        this.p = e;
        this.He = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.ze(); else this.He = true;
    }
    attached() {
        if (this.He) {
            this.He = false;
            this.ze();
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
        if ("focus" === t.type) this.value = true; else if (!this.Ge) this.value = false;
    }
    ze() {
        const t = this.We;
        const e = this.Ge;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get Ge() {
        return this.We === this.p.document.activeElement;
    }
}

Focus.inject = [ Je, W ];

r([ A({
    mode: e.BindingMode.twoWay
}) ], Focus.prototype, "value", void 0);

Et("focus")(Focus);

let Ks = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.Xe = false;
        this.Ke = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ke = null;
            if (Boolean(this.value) !== this.Ye) if (this.Ye === this.Ze) {
                this.Ye = !this.Ze;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Ye = this.Ze;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Ye = this.Ze = "hide" !== i.alias;
    }
    binding() {
        this.Xe = true;
        this.update();
    }
    detaching() {
        var t;
        this.Xe = false;
        null === (t = this.Ke) || void 0 === t ? void 0 : t.cancel();
        this.Ke = null;
    }
    valueChanged() {
        if (this.Xe && null === this.Ke) this.Ke = this.p.domWriteQueue.queueTask(this.update);
    }
};

r([ A ], Ks.prototype, "value", void 0);

Ks = r([ o(0, Je), o(1, W), o(2, pi) ], Ks);

e.alias("hide")(Ks);

Et("show")(Ks);

class Portal {
    constructor(e, i, s) {
        this.id = t.nextId("au$component");
        this.strict = false;
        this.p = s;
        this.Je = s.document.createElement("div");
        this.view = e.create();
        si(this.view.nodes, i);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.Je = this.Qe();
        this.view.setHost(s);
        return this.ti(t, s, i);
    }
    detaching(t, e, i) {
        return this.ei(t, this.Je, i);
    }
    targetChanged() {
        const {$controller: e} = this;
        if (!e.isActive) return;
        const i = this.Je;
        const s = this.Je = this.Qe();
        if (i === s) return;
        this.view.setHost(s);
        const n = t.onResolve(this.ei(null, s, e.flags), (() => this.ti(null, s, e.flags)));
        if (n instanceof Promise) n.catch((t => {
            throw t;
        }));
    }
    ti(e, i, s) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(i);
        return t.onResolve(null === n || void 0 === n ? void 0 : n.call(r, i, o), (() => this.ii(e, i, s)));
    }
    ii(e, i, s) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.appendTo(i); else return t.onResolve(r.activate(null !== e && void 0 !== e ? e : r, n, s, n.scope), (() => this.si(i)));
        return this.si(i);
    }
    si(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    ei(e, i, s) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return t.onResolve(null === n || void 0 === n ? void 0 : n.call(r, i, o), (() => this.ni(e, i, s)));
    }
    ni(e, i, s) {
        const {$controller: n, view: r} = this;
        if (null === e) r.nodes.remove(); else return t.onResolve(r.deactivate(e, n, s), (() => this.ri(i)));
        return this.ri(i);
    }
    ri(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return null === e || void 0 === e ? void 0 : e.call(i, t, s);
    }
    Qe() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw new Error("AUR0811");
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
            if (this.strict) throw new Error("AUR0812");
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

Portal.inject = [ we, ti, W ];

r([ A({
    primary: true
}) ], Portal.prototype, "target", void 0);

r([ A({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

r([ A() ], Portal.prototype, "strict", void 0);

r([ A() ], Portal.prototype, "deactivating", void 0);

r([ A() ], Portal.prototype, "activating", void 0);

r([ A() ], Portal.prototype, "deactivated", void 0);

r([ A() ], Portal.prototype, "activated", void 0);

r([ A() ], Portal.prototype, "callbackContext", void 0);

Bt("portal")(Portal);

class FlagsTemplateController {
    constructor(e, i, s) {
        this.fs = s;
        this.id = t.nextId("au$component");
        this.view = e.create().setLocation(i);
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

class FrequentMutations extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 512);
    }
}

FrequentMutations.inject = [ we, ti ];

class ObserveShallow extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 128);
    }
}

ObserveShallow.inject = [ we, ti ];

Bt("frequent-mutations")(FrequentMutations);

Bt("observe-shallow")(ObserveShallow);

class If {
    constructor(e, i, s) {
        this.ifFactory = e;
        this.location = i;
        this.work = s;
        this.id = t.nextId("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.oi = false;
        this.li = 0;
    }
    attaching(e, i, s) {
        let n;
        const r = this.$controller;
        const o = this.li++;
        const l = () => !this.oi && this.li === o + 1;
        return t.onResolve(this.pending, (() => {
            var i;
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (i = this.elseFactory) || void 0 === i ? void 0 : i.create();
            if (null == n) return;
            n.setLocation(this.location);
            this.pending = t.onResolve(n.activate(e, r, s, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(e, i, s) {
        this.oi = true;
        return t.onResolve(this.pending, (() => {
            var t;
            this.oi = false;
            this.pending = void 0;
            void (null === (t = this.view) || void 0 === t ? void 0 : t.deactivate(e, this.$controller, s));
        }));
    }
    valueChanged(e, i, s) {
        if (!this.$controller.isActive) return;
        e = !!e;
        i = !!i;
        if (e === i) return;
        this.work.start();
        const n = this.view;
        const r = this.$controller;
        const o = this.li++;
        const l = () => !this.oi && this.li === o + 1;
        let h;
        return t.onResolve(t.onResolve(this.pending, (() => this.pending = t.onResolve(null === n || void 0 === n ? void 0 : n.deactivate(n, r, s), (() => {
            var i;
            if (!l()) return;
            if (e) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (i = this.elseFactory) || void 0 === i ? void 0 : i.create();
            if (null == h) return;
            h.setLocation(this.location);
            return t.onResolve(h.activate(h, r, s, r.scope), (() => {
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

If.inject = [ we, ti, Ke ];

r([ A ], If.prototype, "value", void 0);

r([ A({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Bt("if")(If);

class Else {
    constructor(e) {
        this.factory = e;
        this.id = t.nextId("au$component");
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error("AUR0810");
    }
}

Else.inject = [ we ];

Bt({
    name: "else"
})(Else);

function Ys(t) {
    t.dispose();
}

const Zs = [ 38962, 36913 ];

class Repeat {
    constructor(e, i, s) {
        this.l = e;
        this.hi = i;
        this.f = s;
        this.id = t.nextId("au$component");
        this.views = [];
        this.key = void 0;
        this.ai = void 0;
        this.ui = false;
        this.fi = false;
        this.di = null;
        this.pi = void 0;
        this.mi = false;
    }
    binding(t, e, i) {
        const s = this.hi.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.sourceExpression;
                this.vi = r;
                let t = o.iterable;
                while (null != t && Zs.includes(t.$kind)) {
                    t = t.expression;
                    this.ui = true;
                }
                this.di = t;
                break;
            }
        }
        this.xi(i);
        const h = o.declaration;
        if (!(this.mi = 90137 === h.$kind || 106521 === h.$kind)) this.local = h.evaluate(i, this.$controller.scope, r.locator, null);
    }
    attaching(t, e, i) {
        this.gi(i);
        return this.wi(t, i);
    }
    detaching(t, e, i) {
        this.xi(i);
        return this.bi(t, i);
    }
    itemsChanged(e) {
        const {$controller: i} = this;
        if (!i.isActive) return;
        e |= i.flags;
        this.xi(e);
        this.gi(e);
        const s = t.onResolve(this.bi(null, e), (() => this.wi(null, e)));
        if (s instanceof Promise) s.catch((t => {
            throw t;
        }));
    }
    handleCollectionChange(i, s) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.ui) {
            if (this.fi) return;
            this.fi = true;
            this.items = this.forOf.iterable.evaluate(s, n.scope, this.vi.locator, null);
            this.fi = false;
            return;
        }
        s |= n.flags;
        this.gi(s);
        if (void 0 === i) {
            const e = t.onResolve(this.bi(null, s), (() => this.wi(null, s)));
            if (e instanceof Promise) e.catch((t => {
                throw t;
            }));
        } else {
            const n = this.views.length;
            e.applyMutationsToIndices(i);
            if (i.deletedItems.length > 0) {
                i.deletedItems.sort(t.compareNumber);
                const e = t.onResolve(this.yi(i, s), (() => this.ki(n, i, s)));
                if (e instanceof Promise) e.catch((t => {
                    throw t;
                }));
            } else this.ki(n, i, s);
        }
    }
    xi(t) {
        var i;
        const s = this.$controller.scope;
        let n = this.Ci;
        let r = this.ui;
        if (r) {
            n = this.Ci = null !== (i = this.di.evaluate(t, s, this.vi.locator, null)) && void 0 !== i ? i : null;
            r = this.ui = !Object.is(this.items, n);
        }
        const o = this.ai;
        if (4 & t) {
            if (void 0 !== o) o.unsubscribe(this);
        } else if (this.$controller.isActive) {
            const t = this.ai = e.getCollectionObserver(r ? n : this.items);
            if (o !== t && o) o.unsubscribe(this);
            if (t) t.subscribe(this);
        }
    }
    gi(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.pi = e;
            return;
        }
        const i = this.forOf;
        if (void 0 === i) return;
        const s = [];
        this.forOf.iterate(t, e, ((t, e, i) => {
            s[e] = i;
        }));
        this.pi = s;
    }
    wi(t, i) {
        let s;
        let n;
        let r;
        let o;
        const {$controller: l, f: h, local: a, l: c, items: u} = this;
        const f = l.scope;
        const d = this.forOf;
        const p = d.count(i, u);
        const m = this.views = Array(p);
        d.iterate(i, u, ((u, v, x) => {
            r = m[v] = h.create().setLocation(c);
            r.nodes.unlink();
            if (this.mi) d.declaration.assign(i, o = e.Scope.fromParent(f, e.BindingContext.create()), this.vi.locator, x); else o = e.Scope.fromParent(f, e.BindingContext.create(a, x));
            sn(o.overrideContext, v, p);
            n = r.activate(null !== t && void 0 !== t ? t : r, l, i, o);
            if (n instanceof Promise) (null !== s && void 0 !== s ? s : s = []).push(n);
        }));
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    bi(t, e) {
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
    yi(t, e) {
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
    ki(t, i, s) {
        var n;
        let r;
        let o;
        let l;
        let h;
        let a = 0;
        const {$controller: c, f: u, local: f, pi: d, l: p, views: m} = this;
        const v = i.length;
        for (;v > a; ++a) if (-2 === i[a]) {
            l = u.create();
            m.splice(a, 0, l);
        }
        if (m.length !== v) throw new Error(`AUR0814:${m.length}!=${v}`);
        const x = c.scope;
        const g = i.length;
        e.synchronizeIndices(m, i);
        const w = en(i);
        const b = w.length;
        let y;
        let k = b - 1;
        a = g - 1;
        for (;a >= 0; --a) {
            l = m[a];
            y = m[a + 1];
            l.nodes.link(null !== (n = null === y || void 0 === y ? void 0 : y.nodes) && void 0 !== n ? n : p);
            if (-2 === i[a]) {
                if (this.mi) this.forOf.declaration.assign(s, h = e.Scope.fromParent(x, e.BindingContext.create()), this.vi.locator, d[a]); else h = e.Scope.fromParent(x, e.BindingContext.create(f, d[a]));
                sn(h.overrideContext, a, g);
                l.setLocation(p);
                o = l.activate(l, c, s, h);
                if (o instanceof Promise) (null !== r && void 0 !== r ? r : r = []).push(o);
            } else if (k < 0 || 1 === b || a !== w[k]) {
                sn(l.scope.overrideContext, a, g);
                l.nodes.insertBefore(l.location);
            } else {
                if (t !== g) sn(l.scope.overrideContext, a, g);
                --k;
            }
        }
        if (void 0 !== r) return 1 === r.length ? r[0] : Promise.all(r);
    }
    dispose() {
        this.views.forEach(Ys);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ ti, je, we ];

r([ A ], Repeat.prototype, "items", void 0);

Bt("repeat")(Repeat);

let Js = 16;

let Qs = new Int32Array(Js);

let tn = new Int32Array(Js);

function en(t) {
    const e = t.length;
    if (e > Js) {
        Js = e;
        Qs = new Int32Array(e);
        tn = new Int32Array(e);
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
            o = Qs[i];
            n = t[o];
            if (-2 !== n && n < s) {
                tn[r] = o;
                Qs[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                a = l + h >> 1;
                n = t[Qs[a]];
                if (-2 !== n && n < s) l = a + 1; else h = a;
            }
            n = t[Qs[l]];
            if (s < n || -2 === n) {
                if (l > 0) tn[r] = Qs[l - 1];
                Qs[l] = r;
            }
        }
    }
    r = ++i;
    const c = new Int32Array(r);
    s = Qs[i - 1];
    while (i-- > 0) {
        c[i] = s;
        s = tn[s];
    }
    while (r-- > 0) Qs[r] = 0;
    return c;
}

function sn(t, e, i) {
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
    constructor(e, i) {
        this.id = t.nextId("au$component");
        this.id = t.nextId("au$component");
        this.view = e.create().setLocation(i);
    }
    valueChanged(t, i, s) {
        const n = this.$controller;
        const r = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (n.isActive && null != r) {
            o = e.Scope.fromParent(n.scope, void 0 === t ? {} : t);
            for (h = r.length; h > l; ++l) r[l].$bind(2, o);
        }
    }
    attaching(t, i, s) {
        const {$controller: n, value: r} = this;
        const o = e.Scope.fromParent(n.scope, void 0 === r ? {} : r);
        return this.view.activate(t, n, s, o);
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

With.inject = [ we, ti ];

r([ A ], With.prototype, "value", void 0);

Bt("with")(With);

exports.Switch = class Switch {
    constructor(e, i) {
        this.f = e;
        this.l = i;
        this.id = t.nextId("au$component");
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
        this.queue((() => this.Ai(t, e)));
    }
    Ai(e, i) {
        const s = e.isMatch(this.value, i);
        const n = this.activeCases;
        const r = n.length;
        if (!s) {
            if (r > 0 && n[0].id === e.id) return this.Ri(null, i);
            return;
        }
        if (r > 0 && n[0].id < e.id) return;
        const o = [];
        let l = e.fallThrough;
        if (!l) o.push(e); else {
            const t = this.cases;
            const i = t.indexOf(e);
            for (let e = i, s = t.length; e < s && l; e++) {
                const i = t[e];
                o.push(i);
                l = i.fallThrough;
            }
        }
        return t.onResolve(this.Ri(null, i, o), (() => {
            this.activeCases = o;
            return this.Si(null, i);
        }));
    }
    swap(e, i, s) {
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
        return t.onResolve(this.activeCases.length > 0 ? this.Ri(e, i, n) : void 0, (() => {
            this.activeCases = n;
            if (0 === n.length) return;
            return this.Si(e, i);
        }));
    }
    Si(e, i) {
        const s = this.$controller;
        if (!s.isActive) return;
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        const o = s.scope;
        if (1 === r) return n[0].activate(e, i, o);
        return t.resolveAll(...n.map((t => t.activate(e, i, o))));
    }
    Ri(e, i, s = []) {
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        if (1 === r) {
            const t = n[0];
            if (!s.includes(t)) {
                n.length = 0;
                return t.deactivate(e, i);
            }
            return;
        }
        return t.onResolve(t.resolveAll(...n.reduce(((t, n) => {
            if (!s.includes(n)) t.push(n.deactivate(e, i));
            return t;
        }), [])), (() => {
            n.length = 0;
        }));
    }
    queue(e) {
        const i = this.promise;
        let s;
        s = this.promise = t.onResolve(t.onResolve(i, e), (() => {
            if (this.promise === s) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

r([ A ], exports.Switch.prototype, "value", void 0);

exports.Switch = r([ Bt("switch"), o(0, we), o(1, ti) ], exports.Switch);

exports.Case = class Case {
    constructor(e, i, s, n) {
        this.f = e;
        this.Ei = i;
        this.l = s;
        this.id = t.nextId("au$component");
        this.fallThrough = false;
        this.view = void 0;
        this.Bi = n.config.level <= 1;
        this.Ut = n.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = null === n || void 0 === n ? void 0 : n.viewModel;
        if (r instanceof exports.Switch) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error("AUR0815");
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t, e) {
        this.Ut.debug("isMatch()");
        const i = this.value;
        if (Array.isArray(i)) {
            if (void 0 === this.ai) this.ai = this.Ii(e, i);
            return i.includes(t);
        }
        return i === t;
    }
    valueChanged(t, e, i) {
        var s;
        if (Array.isArray(t)) {
            null === (s = this.ai) || void 0 === s ? void 0 : s.unsubscribe(this);
            this.ai = this.Ii(i, t);
        } else if (void 0 !== this.ai) this.ai.unsubscribe(this);
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
        null === (t = this.ai) || void 0 === t ? void 0 : t.unsubscribe(this);
        null === (e = this.view) || void 0 === e ? void 0 : e.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Ii(t, e) {
        const i = this.Ei.getArrayObserver(e);
        i.subscribe(this);
        return i;
    }
    accept(t) {
        var e;
        if (true === this.$controller.accept(t)) return true;
        return null === (e = this.view) || void 0 === e ? void 0 : e.accept(t);
    }
};

exports.Case.inject = [ we, e.IObserverLocator, ti, t.ILogger ];

r([ A ], exports.Case.prototype, "value", void 0);

r([ A({
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
    mode: e.BindingMode.oneTime
}) ], exports.Case.prototype, "fallThrough", void 0);

exports.Case = r([ Bt("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error("AUR0816");
        t.defaultCase = this;
    }
};

exports.DefaultCase = r([ Bt("default-case") ], exports.DefaultCase);

exports.PromiseTemplateController = class PromiseTemplateController {
    constructor(e, i, s, n) {
        this.f = e;
        this.l = i;
        this.p = s;
        this.id = t.nextId("au$component");
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
        return t.onResolve(r.activate(i, o, n, this.viewScope = e.Scope.fromParent(o.scope, {})), (() => this.swap(i, n)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(e, i) {
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
            void t.resolveAll(f = (this.preSettledTask = l.queueTask((() => t.resolveAll(null === h || void 0 === h ? void 0 : h.deactivate(e, i), null === a || void 0 === a ? void 0 : a.deactivate(e, i), null === c || void 0 === c ? void 0 : c.activate(e, i, u))), d)).result.catch((t => {
                if (!(t instanceof s.TaskAbortError)) throw t;
            })), o.then((s => {
                if (this.value !== o) return;
                const n = () => {
                    this.postSettlePromise = (this.postSettledTask = l.queueTask((() => t.resolveAll(null === c || void 0 === c ? void 0 : c.deactivate(e, i), null === a || void 0 === a ? void 0 : a.deactivate(e, i), null === h || void 0 === h ? void 0 : h.activate(e, i, u, s))), d)).result;
                };
                if (1 === this.preSettledTask.status) void f.then(n); else {
                    this.preSettledTask.cancel();
                    n();
                }
            }), (s => {
                if (this.value !== o) return;
                const n = () => {
                    this.postSettlePromise = (this.postSettledTask = l.queueTask((() => t.resolveAll(null === c || void 0 === c ? void 0 : c.deactivate(e, i), null === h || void 0 === h ? void 0 : h.deactivate(e, i), null === a || void 0 === a ? void 0 : a.activate(e, i, u, s))), d)).result;
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

r([ A ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = r([ Bt("promise"), o(0, we), o(1, ti), o(2, W), o(3, t.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(e, i) {
        this.f = e;
        this.l = i;
        this.id = t.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        nn(t).pending = this;
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

r([ A({
    mode: e.BindingMode.toView
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = r([ Bt("pending"), o(0, we), o(1, ti) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(e, i) {
        this.f = e;
        this.l = i;
        this.id = t.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        nn(t).fulfilled = this;
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

r([ A({
    mode: e.BindingMode.fromView
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = r([ Bt("then"), o(0, we), o(1, ti) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(e, i) {
        this.f = e;
        this.l = i;
        this.id = t.nextId("au$component");
        this.view = void 0;
    }
    link(t, e, i, s) {
        nn(t).rejected = this;
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

r([ A({
    mode: e.BindingMode.fromView
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = r([ Bt("catch"), o(0, we), o(1, ti) ], exports.RejectedTemplateController);

function nn(t) {
    const e = t.parent;
    const i = null === e || void 0 === e ? void 0 : e.viewModel;
    if (i instanceof exports.PromiseTemplateController) return i;
    throw new Error("AUR0813");
}

let rn = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

rn = r([ F({
    pattern: "promise.resolve",
    symbols: ""
}) ], rn);

let on = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

on = r([ F({
    pattern: "then",
    symbols: ""
}) ], on);

let ln = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

ln = r([ F({
    pattern: "catch",
    symbols: ""
}) ], ln);

function hn(t, e, i, s) {
    if (C(e)) return an(t, e, i, s);
    if (Jt.isType(e)) return cn(t, e, i, s);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this.Ti = i;
        this.Di = void 0;
    }
    get definition() {
        if (void 0 === this.Di) this.Di = CustomElementDefinition.create({
            name: Jt.generateName(),
            template: this.node,
            needsCompile: C(this.node),
            instructions: this.instructions,
            dependencies: this.Ti
        });
        return this.Di;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Ee).getViewFactory(this.definition, t.createChild().register(...this.Ti));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this.Ti);
    }
}

function an(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (mi(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) un(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function cn(t, e, i, s) {
    const n = Jt.getDefinition(e);
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
        if (mi(e)) h.push(e); else if (void 0 === a[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) un(t, c, s, o, l);
    return new RenderPlan(c, o, l);
}

function un(t, e, i, s, n) {
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

function fn(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(e, i, s, n) {
        this.p = e;
        this.Pi = i;
        this.$i = s;
        this.r = n;
        this.id = t.nextId("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Oi = void 0;
        this.Li = i.props.reduce(fn, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Oi !== s) {
            this.Oi = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.ni(this.view, t, i);
    }
    componentChanged(e, i, s) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.Oi === e) return;
        this.Oi = e;
        this.composing = true;
        s |= n.flags;
        const r = t.onResolve(this.ni(this.view, null, s), (() => this.compose(void 0, e, null, s)));
        if (r instanceof Promise) r.catch((t => {
            throw t;
        }));
    }
    compose(e, i, s, n) {
        return t.onResolve(void 0 === e ? t.onResolve(i, (t => this.qi(t, n))) : e, (t => this.ii(this.view = t, s, n)));
    }
    ni(t, e, i) {
        return null === t || void 0 === t ? void 0 : t.deactivate(null !== e && void 0 !== e ? e : t, this.$controller, i);
    }
    ii(e, i, s) {
        const {$controller: n} = this;
        return t.onResolve(null === e || void 0 === e ? void 0 : e.activate(null !== i && void 0 !== i ? i : e, n, s, n.scope), (() => {
            this.composing = false;
        }));
    }
    qi(t, e) {
        const i = this.Ui(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    Ui(t, e) {
        if (!t) return;
        const i = this.$i.controller.container;
        if ("object" === typeof t) {
            if (dn(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (C(t)) {
            const e = i.find(Jt, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return hn(this.p, t, this.Li, this.$controller.host.childNodes).createView(i);
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

AuRender.inject = [ W, pi, Ne, Ee ];

r([ A ], AuRender.prototype, "component", void 0);

r([ A({
    mode: e.BindingMode.fromView
}) ], AuRender.prototype, "composing", void 0);

Ut({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function dn(t) {
    return "lockScope" in t;
}

class AuCompose {
    constructor(t, e, i, s, n, r) {
        this.c = t;
        this.parent = e;
        this.host = i;
        this.p = s;
        this.scopeBehavior = "auto";
        this.Fi = void 0;
        this.l = n.containerless ? ni(this.host) : void 0;
        this.r = t.get(Ee);
        this.Pi = n;
        this._i = r;
    }
    static get inject() {
        return [ t.IContainer, je, Je, W, pi, t.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Mi;
    }
    get composition() {
        return this.Fi;
    }
    attaching(e, i, s) {
        return this.Mi = t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), e), (t => {
            if (this._i.isCurrent(t)) this.Mi = void 0;
        }));
    }
    detaching(e) {
        const i = this.Fi;
        const s = this.Mi;
        this._i.invalidate();
        this.Fi = this.Mi = void 0;
        return t.onResolve(s, (() => null === i || void 0 === i ? void 0 : i.deactivate(e)));
    }
    propertyChanged(e) {
        if ("model" === e && null != this.Fi) {
            this.Fi.update(this.model);
            return;
        }
        this.Mi = t.onResolve(this.Mi, (() => t.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, e), void 0), (t => {
            if (this._i.isCurrent(t)) this.Mi = void 0;
        }))));
    }
    queue(e, i) {
        const s = this._i;
        const n = this.Fi;
        return t.onResolve(s.create(e), (e => {
            if (s.isCurrent(e)) return t.onResolve(this.compose(e), (r => {
                if (s.isCurrent(e)) return t.onResolve(r.activate(i), (() => {
                    if (s.isCurrent(e)) {
                        this.Fi = r;
                        return t.onResolve(null === n || void 0 === n ? void 0 : n.deactivate(i), (() => e));
                    } else return t.onResolve(r.controller.deactivate(r.controller, this.$controller, 4), (() => {
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
    compose(i) {
        let s;
        let n;
        let r;
        const {view: o, viewModel: l, model: h} = i.change;
        const {c: a, host: c, $controller: u, l: f} = this;
        const d = this.getDef(l);
        const p = a.createChild();
        const m = null == f ? c.parentNode : f.parentNode;
        if (null !== d) {
            if (d.containerless) throw new Error("AUR0806");
            if (null == f) {
                n = c;
                r = () => {};
            } else {
                n = m.insertBefore(this.p.document.createElement(d.name), f);
                r = () => {
                    n.remove();
                };
            }
            s = this.getVm(p, l, n);
        } else {
            n = null == f ? c : f;
            s = this.getVm(p, l, n);
        }
        const v = () => {
            if (null !== d) {
                const e = Controller.$el(p, s, n, {
                    projections: this.Pi.projections
                }, d);
                return new CompositionController(e, (t => e.activate(null !== t && void 0 !== t ? t : e, u, 2, u.scope.parentScope)), (i => t.onResolve(e.deactivate(null !== i && void 0 !== i ? i : e, u, 4), r)), (t => {
                    var e;
                    return null === (e = s.activate) || void 0 === e ? void 0 : e.call(s, t);
                }), i);
            } else {
                const t = CustomElementDefinition.create({
                    name: Jt.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(t, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? e.Scope.fromParent(this.parent.scope, s) : e.Scope.create(s);
                if (ri(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(null !== t && void 0 !== t ? t : l, u, 2, h)), (t => l.deactivate(null !== t && void 0 !== t ? t : l, u, 4)), (t => {
                    var e;
                    return null === (e = s.activate) || void 0 === e ? void 0 : e.call(s, t);
                }), i);
            }
        };
        if ("activate" in s) return t.onResolve(s.activate(h), (() => v())); else return v();
    }
    getVm(e, i, s) {
        if (null == i) return new EmptyComponent$1;
        if ("object" === typeof i) return i;
        const n = this.p;
        const r = ri(s);
        e.registerResolver(n.Element, e.registerResolver(Je, new t.InstanceProvider("ElementResolver", r ? null : s)));
        e.registerResolver(ti, new t.InstanceProvider("IRenderLocation", r ? s : null));
        const o = e.invoke(i);
        e.registerResolver(i, new t.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = k(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return Jt.isType(e) ? Jt.getDefinition(e) : null;
    }
}

r([ A ], AuCompose.prototype, "view", void 0);

r([ A ], AuCompose.prototype, "viewModel", void 0);

r([ A ], AuCompose.prototype, "model", void 0);

r([ A({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error("AUR0805");
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

Ut("au-compose")(AuCompose);

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
            throw new Error("AUR0808");

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, i, s) {
        var n, r;
        this.Vi = null;
        this.ji = null;
        let o;
        const l = e.auSlot;
        const h = null === (r = null === (n = i.instruction) || void 0 === n ? void 0 : n.projections) || void 0 === r ? void 0 : r[l.name];
        if (null == h) {
            o = s.getViewFactory(l.fallback, i.controller.container);
            this.Ni = false;
        } else {
            o = s.getViewFactory(h, i.parent.controller.container);
            this.Ni = true;
        }
        this.$i = i;
        this.view = o.create().setLocation(t);
    }
    static get inject() {
        return [ ti, pi, Ne, Ee ];
    }
    binding(t, i, s) {
        var n;
        this.Vi = this.$controller.scope.parentScope;
        let r;
        if (this.Ni) {
            r = this.$i.controller.scope.parentScope;
            (this.ji = e.Scope.fromParent(r, r.bindingContext)).overrideContext.$host = null !== (n = this.expose) && void 0 !== n ? n : this.Vi.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Ni ? this.ji : this.Vi);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Ni && null != this.ji) this.ji.overrideContext.$host = t;
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

r([ A ], AuSlot.prototype, "expose", void 0);

Ut({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const pn = t.DI.createInterface("ISanitizer", (t => t.singleton(class {
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

exports.SanitizeValueConverter = r([ o(0, pn) ], exports.SanitizeValueConverter);

e.valueConverter("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.Hi = t;
    }
    toView(t, e) {
        return this.Hi.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = r([ o(0, Se) ], exports.ViewValueConverter);

e.valueConverter("view")(exports.ViewValueConverter);

const mn = DebounceBindingBehavior;

const vn = OneTimeBindingBehavior;

const xn = ToViewBindingBehavior;

const gn = FromViewBindingBehavior;

const wn = SignalBindingBehavior;

const bn = ThrottleBindingBehavior;

const yn = TwoWayBindingBehavior;

const kn = TemplateCompiler;

const Cn = NodeObserverLocator;

const An = [ kn, Cn ];

const Rn = SVGAnalyzer;

const Sn = exports.AtPrefixedTriggerAttributePattern;

const En = exports.ColonPrefixedBindAttributePattern;

const Bn = exports.RefAttributePattern;

const In = exports.DotSeparatedAttributePattern;

const Tn = N;

const Dn = [ Bn, In, Tn ];

const Pn = [ Sn, En ];

const $n = exports.CallBindingCommand;

const On = exports.DefaultBindingCommand;

const Ln = exports.ForBindingCommand;

const qn = exports.FromViewBindingCommand;

const Un = exports.OneTimeBindingCommand;

const Fn = exports.ToViewBindingCommand;

const _n = exports.TwoWayBindingCommand;

const Mn = rs;

const Vn = exports.TriggerBindingCommand;

const jn = exports.DelegateBindingCommand;

const Nn = exports.CaptureBindingCommand;

const Wn = exports.AttrBindingCommand;

const Hn = exports.ClassBindingCommand;

const zn = exports.StyleBindingCommand;

const Gn = os;

const Xn = [ On, Un, qn, Fn, _n, $n, Ln, Mn, Vn, jn, Nn, Hn, zn, Wn, Gn ];

const Kn = exports.SanitizeValueConverter;

const Yn = exports.ViewValueConverter;

const Zn = FrequentMutations;

const Jn = ObserveShallow;

const Qn = If;

const tr = Else;

const er = Repeat;

const ir = With;

const sr = exports.Switch;

const nr = exports.Case;

const rr = exports.DefaultCase;

const or = exports.PromiseTemplateController;

const lr = exports.PendingTemplateController;

const hr = exports.FulfilledTemplateController;

const ar = exports.RejectedTemplateController;

const cr = rn;

const ur = on;

const fr = ln;

const dr = AttrBindingBehavior;

const pr = SelfBindingBehavior;

const mr = UpdateTriggerBindingBehavior;

const vr = AuRender;

const xr = AuCompose;

const gr = Portal;

const wr = Focus;

const br = Ks;

const yr = [ mn, vn, xn, gn, wn, bn, yn, Kn, Yn, Zn, Jn, Qn, tr, er, ir, sr, nr, rr, or, lr, hr, ar, cr, ur, fr, dr, pr, mr, vr, xr, gr, wr, br, AuSlot ];

const kr = Ei;

const Cr = Ai;

const Ar = Ci;

const Rr = Ii;

const Sr = Di;

const Er = Si;

const Br = Ti;

const Ir = Bi;

const Tr = ki;

const Dr = Ri;

const Pr = qi;

const $r = Vi;

const Or = Ui;

const Lr = Fi;

const qr = _i;

const Ur = Mi;

const Fr = Li;

const _r = ji;

const Mr = [ Br, Sr, kr, Ir, Rr, Tr, Ar, Cr, Dr, Er, Pr, $r, Or, Lr, qr, Ur, Fr, _r ];

const Vr = jr(t.noop);

function jr(i) {
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
            return s.register(t.Registration.instance(e.ICoercionConfiguration, n.coercingOptions), ...An, ...yr, ...Dn, ...Xn, ...Mr);
        },
        customize(t) {
            return jr(null !== t && void 0 !== t ? t : i);
        }
    };
}

const Nr = t.DI.createInterface("IAurelia");

class Aurelia {
    constructor(e = t.DI.createContainer()) {
        this.container = e;
        this.ir = false;
        this.zi = false;
        this.Gi = false;
        this.Xi = void 0;
        this.next = void 0;
        this.Ki = void 0;
        this.Yi = void 0;
        if (e.has(Nr, true)) throw new Error("AUR0768");
        e.registerResolver(Nr, new t.InstanceProvider("IAurelia", this));
        e.registerResolver(Xe, this.Zi = new t.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.zi;
    }
    get isStopping() {
        return this.Gi;
    }
    get root() {
        if (null == this.Xi) {
            if (null == this.next) throw new Error("AUR0767");
            return this.next;
        }
        return this.Xi;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.Ji(t.host), this.container, this.Zi);
        return this;
    }
    enhance(e, i) {
        var s;
        const n = null !== (s = e.container) && void 0 !== s ? s : this.container.createChild();
        const r = e.host;
        const o = this.Ji(r);
        const l = e.component;
        let h;
        if (k(l)) {
            n.registerResolver(o.HTMLElement, n.registerResolver(o.Element, n.registerResolver(Je, new t.InstanceProvider("ElementResolver", r))));
            h = n.invoke(l);
        } else h = l;
        n.registerResolver(Qe, new t.InstanceProvider("IEventTarget", r));
        i = null !== i && void 0 !== i ? i : null;
        const a = Controller.$el(n, h, r, null, CustomElementDefinition.create({
            name: Jt.generateName(),
            template: r,
            enhance: true
        }));
        return t.onResolve(a.activate(a, i, 2), (() => a));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    Ji(e) {
        let i;
        if (!this.container.has(W, false)) {
            if (null === e.ownerDocument.defaultView) throw new Error("AUR0769");
            i = new n.BrowserPlatform(e.ownerDocument.defaultView);
            this.container.register(t.Registration.instance(W, i));
        } else i = this.container.get(W);
        return i;
    }
    start(e = this.next) {
        if (null == e) throw new Error("AUR0770");
        if (this.Ki instanceof Promise) return this.Ki;
        return this.Ki = t.onResolve(this.stop(), (() => {
            Reflect.set(e.host, "$aurelia", this);
            this.Zi.prepare(this.Xi = e);
            this.zi = true;
            return t.onResolve(e.activate(), (() => {
                this.ir = true;
                this.zi = false;
                this.Ki = void 0;
                this.Qi(e, "au-started", e.host);
            }));
        }));
    }
    stop(e = false) {
        if (this.Yi instanceof Promise) return this.Yi;
        if (true === this.ir) {
            const i = this.Xi;
            this.ir = false;
            this.Gi = true;
            return this.Yi = t.onResolve(i.deactivate(), (() => {
                Reflect.deleteProperty(i.host, "$aurelia");
                if (e) i.dispose();
                this.Xi = void 0;
                this.Zi.dispose();
                this.Gi = false;
                this.Qi(i, "au-stopped", i.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.Gi) throw new Error("AUR0771");
        this.container.dispose();
    }
    Qi(t, e, i) {
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

const Wr = t.DI.createInterface("IDialogService");

const Hr = t.DI.createInterface("IDialogController");

const zr = t.DI.createInterface("IDialogDomRenderer");

const Gr = t.DI.createInterface("IDialogDom");

const Xr = t.DI.createInterface("IDialogGlobalSettings");

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
        return [ W, t.IContainer ];
    }
    activate(e) {
        var i;
        const s = this.ctn.createChild();
        const {model: n, template: r, rejectOnCancel: o} = e;
        const l = s.get(zr);
        const h = null !== (i = e.host) && void 0 !== i ? i : this.p.document.body;
        const a = this.dom = l.render(h, e);
        const c = s.has(Qe, true) ? s.get(Qe) : null;
        const u = a.contentHost;
        this.settings = e;
        if (null == c || !c.contains(h)) s.register(t.Registration.instance(Qe, h));
        s.register(t.Registration.instance(Je, u), t.Registration.instance(Gr, a));
        return new Promise((t => {
            var i, r;
            const o = Object.assign(this.cmp = this.getOrCreateVm(s, e, u), {
                $dialog: this
            });
            t(null !== (r = null === (i = o.canActivate) || void 0 === i ? void 0 : i.call(o, n)) && void 0 !== r ? r : true);
        })).then((i => {
            var l;
            if (true !== i) {
                a.dispose();
                if (o) throw Kr(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const h = this.cmp;
            return t.onResolve(null === (l = h.activate) || void 0 === l ? void 0 : l.call(h, n), (() => {
                var i;
                const n = this.controller = Controller.$el(s, h, u, null, CustomElementDefinition.create(null !== (i = this.getDefinition(h)) && void 0 !== i ? i : {
                    name: Jt.generateName(),
                    template: r
                }));
                return t.onResolve(n.activate(n, null, 2), (() => {
                    var t;
                    a.overlay.addEventListener(null !== (t = e.mouseEvent) && void 0 !== t ? t : "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            a.dispose();
            throw t;
        }));
    }
    deactivate(e, i) {
        if (this.ts) return this.ts;
        let s = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const a = DialogCloseResult.create(e, i);
        const c = new Promise((c => {
            var u, f;
            c(t.onResolve(null !== (f = null === (u = o.canDeactivate) || void 0 === u ? void 0 : u.call(o, a)) && void 0 !== f ? f : true, (c => {
                var u;
                if (true !== c) {
                    s = false;
                    this.ts = void 0;
                    if (h) throw Kr(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return t.onResolve(null === (u = o.deactivate) || void 0 === u ? void 0 : u.call(o, a), (() => t.onResolve(n.deactivate(n, null, 4), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(null !== l && void 0 !== l ? l : "click", this);
                    if (!h && "error" !== e) this.Pt(a); else this.St(Kr(i, "Dialog cancelled with a rejection on cancel"));
                    return a;
                }))));
            })));
        })).catch((t => {
            this.ts = void 0;
            throw t;
        }));
        this.ts = s ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(e) {
        const i = Yr(e);
        return new Promise((e => {
            var s, n;
            return e(t.onResolve(null === (n = (s = this.cmp).deactivate) || void 0 === n ? void 0 : n.call(s, DialogCloseResult.create("error", i)), (() => t.onResolve(this.controller.deactivate(this.controller, null, 4), (() => {
                this.dom.dispose();
                this.St(i);
            })))));
        }));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(e, i, s) {
        const n = i.component;
        if (null == n) return new EmptyComponent;
        if ("object" === typeof n) return n;
        const r = this.p;
        e.registerResolver(r.HTMLElement, e.registerResolver(r.Element, e.registerResolver(Je, new t.InstanceProvider("ElementResolver", s))));
        return e.invoke(n);
    }
    getDefinition(t) {
        const e = k(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return Jt.isType(e) ? Jt.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Kr(t, e) {
    const i = new Error(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function Yr(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.ft = t;
        this.p = e;
        this.es = i;
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
        return [ t.IContainer, W, Xr ];
    }
    static register(e) {
        e.register(t.Registration.singleton(Wr, this), mt.beforeDeactivate(Wr, (e => t.onResolve(e.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(e) {
        return Jr(new Promise((i => {
            var s;
            const n = DialogSettings.from(this.es, e);
            const r = null !== (s = n.container) && void 0 !== s ? s : this.ft.createChild();
            i(t.onResolve(n.load(), (e => {
                const i = r.invoke(DialogController);
                r.register(t.Registration.instance(Hr, i));
                r.register(t.Registration.callback(DialogController, (() => {
                    throw new Error("AUR0902");
                })));
                return t.onResolve(i.activate(e), (t => {
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
        const i = Qr(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).os().ss();
    }
    load() {
        const e = this;
        const i = this.component;
        const s = this.template;
        const n = t.resolveAll(null == i ? void 0 : t.onResolve(i(), (t => {
            e.component = t;
        })), k(s) ? t.onResolve(s(), (t => {
            e.template = t;
        })) : void 0);
        return n instanceof Promise ? n.then((() => e)) : e;
    }
    os() {
        if (null == this.component && null == this.template) throw new Error("AUR0903");
        return this;
    }
    ss() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Zr(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function Jr(t) {
    t.whenClosed = Zr;
    return t;
}

function Qr(t) {
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
    static register(e) {
        t.Registration.singleton(Xr, this).register(e);
    }
}

const to = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${to} display:flex;`;
        this.overlayCss = to;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(e) {
        t.Registration.singleton(zr, this).register(e);
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

function eo(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, mt.beforeCreate((() => t(i.get(Xr))))),
        customize(t, i) {
            return eo(t, null !== i && void 0 !== i ? i : e);
        }
    };
}

const io = eo((() => {
    throw new Error("AUR0904");
}), [ class NoopDialogGlobalSettings {
    static register(e) {
        e.register(t.Registration.singleton(Xr, this));
    }
} ]);

const so = eo(t.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const no = t.DI.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, i) {
        this.ctn = t;
        this.p = e;
        this.r = i;
    }
    define(e, i, s) {
        if (!e.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let n;
        if (null == i) throw new Error("Invalid custom element definition");
        switch (typeof i) {
          case "function":
            n = Jt.isType(i) ? Jt.getDefinition(i) : CustomElementDefinition.create(Jt.generateName(), i);
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
                const e = o.createChild();
                e.registerResolver(a.HTMLElement, e.registerResolver(a.Element, e.registerResolver(Je, new t.InstanceProvider("ElementProvider", this))));
                const i = l.compile(n, e, {
                    projections: null
                });
                const s = e.invoke(i.Type);
                const r = this.auCtrl = Controller.$el(e, s, this, null, i);
                Ze(this, i.key, r);
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
        this.p.customElements.define(e, CustomElementClass, s);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ t.IContainer, W, Ee ];

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = mt;

exports.AtPrefixedTriggerAttributePatternRegistration = Sn;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = dr;

exports.AttrBindingCommandRegistration = Wn;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = $r;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = j;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = vr;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = E;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingCommand = ns;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = $n;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = kr;

exports.CaptureBindingCommandRegistration = Nn;

exports.CheckedObserver = CheckedObserver;

exports.Children = bt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = Hn;

exports.ColonPrefixedBindAttributePatternRegistration = En;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = Pt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = Cr;

exports.CustomElement = Jt;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = Ar;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = mn;

exports.DefaultBindingCommandRegistration = On;

exports.DefaultBindingLanguage = Xn;

exports.DefaultBindingSyntax = Dn;

exports.DefaultComponents = An;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = Mr;

exports.DefaultResources = yr;

exports.DelegateBindingCommandRegistration = jn;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = io;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = so;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = In;

exports.Else = Else;

exports.ElseRegistration = tr;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = Ln;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FrequentMutations = FrequentMutations;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = gn;

exports.FromViewBindingCommandRegistration = qn;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Xe;

exports.IAppTask = pt;

exports.IAttrMapper = G;

exports.IAttributeParser = U;

exports.IAttributePattern = q;

exports.IAuSlotsInfo = di;

exports.IAurelia = Nr;

exports.IController = je;

exports.IDialogController = Hr;

exports.IDialogDom = Gr;

exports.IDialogDomRenderer = zr;

exports.IDialogGlobalSettings = Xr;

exports.IDialogService = Wr;

exports.IEventDelegator = ui;

exports.IEventTarget = Qe;

exports.IHistory = hi;

exports.IHydrationContext = Ne;

exports.IInstruction = pi;

exports.ILifecycleHooks = pe;

exports.ILocation = li;

exports.INode = Je;

exports.INodeObserverLocatorRegistration = Cn;

exports.IPlatform = W;

exports.IProjections = fi;

exports.IRenderLocation = ti;

exports.IRenderer = xi;

exports.IRendering = Ee;

exports.ISVGAnalyzer = H;

exports.ISanitizer = pn;

exports.IShadowDOMGlobalStyles = he;

exports.IShadowDOMStyles = le;

exports.ISyntaxInterpreter = $;

exports.ITemplateCompiler = vi;

exports.ITemplateCompilerHooks = Cs;

exports.ITemplateCompilerRegistration = kn;

exports.ITemplateElementFactory = ls;

exports.IViewFactory = we;

exports.IViewLocator = Se;

exports.IWcElementRegistry = no;

exports.IWindow = oi;

exports.IWorkTracker = Ke;

exports.If = If;

exports.IfRegistration = Qn;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = Rr;

exports.InterpolationInstruction = InterpolationInstruction;

exports.InterpolationPartBinding = InterpolationPartBinding;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = Sr;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = Er;

exports.LifecycleHooks = xe;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = Pr;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.ObserveShallow = ObserveShallow;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = vn;

exports.OneTimeBindingCommandRegistration = Un;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = Br;

exports.RefAttributePatternRegistration = Bn;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Mn;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = Ir;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = er;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = Rn;

exports.SanitizeValueConverterRegistration = Kn;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = pr;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Or;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = Lr;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = Tr;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = qr;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = Pn;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = wn;

exports.StandardConfiguration = Vr;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = zn;

exports.StyleConfiguration = ae;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Ur;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = Ss;

exports.TemplateControllerRendererRegistration = Dr;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = Fr;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = bn;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = xn;

exports.ToViewBindingCommandRegistration = Fn;

exports.TriggerBindingCommandRegistration = Vn;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = yn;

exports.TwoWayBindingCommandRegistration = _n;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = mr;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Yn;

exports.Views = Ae;

exports.Watch = qt;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = ir;

exports.allResources = as;

exports.attributePattern = F;

exports.bindable = A;

exports.bindingCommand = ts;

exports.children = xt;

exports.coercer = B;

exports.containerless = _t;

exports.convertToRenderLocation = ni;

exports.createElement = hn;

exports.cssModules = ne;

exports.customAttribute = Et;

exports.customElement = Ut;

exports.getEffectiveParentNode = ii;

exports.getRef = Ye;

exports.isCustomElementController = Ue;

exports.isCustomElementViewModel = Fe;

exports.isInstruction = mi;

exports.isRenderLocation = ri;

exports.lifecycleHooks = ge;

exports.processContent = te;

exports.renderer = gi;

exports.setEffectiveParentNode = si;

exports.setRef = Ze;

exports.shadowCSS = re;

exports.templateCompilerHooks = Es;

exports.templateController = Bt;

exports.useShadowDOM = Ft;

exports.view = Re;

exports.watch = $t;
//# sourceMappingURL=index.cjs.map
