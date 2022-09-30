import { Protocol as t, getPrototypeChain as e, firstDefined as i, kebabCase as s, noop as n, DI as r, Registration as o, emptyArray as l, all as h, mergeArrays as c, fromDefinitionOrDefault as a, pascalCase as u, fromAnnotationOrTypeOrDefault as f, fromAnnotationOrDefinitionOrTypeOrDefault as d, IPlatform as m, IContainer as g, optional as p, InstanceProvider as v, resolveAll as w, onResolve as b, camelCase as x, toArray as y, ILogger as k, emptyObject as C, IServiceLocator as A, transient as R } from "@aurelia/kernel";

import { Metadata as S, isObject as B } from "@aurelia/metadata";

import { subscriberCollection as I, astEvaluate as T, astBind as D, astUnbind as E, connectable as P, astAssign as L, ConnectableSwitcher as $, ProxyObservable as O, Scope as U, ICoercionConfiguration as q, IObserverLocator as j, IExpressionParser as _, AccessScopeExpression as F, PrimitiveLiteralExpression as M, ISignaler as V, PropertyAccessor as N, INodeObserverLocator as W, SetterObserver as H, IDirtyChecker as z, applyMutationsToIndices as G, getCollectionObserver as X, synchronizeIndices as K, BindingContext as Q } from "@aurelia/runtime";

import { TaskAbortError as Y } from "@aurelia/platform";

import { BrowserPlatform as Z } from "@aurelia/platform-browser";

function J(t, e, i, s) {
    var n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
    return n > 3 && r && Object.defineProperty(e, i, r), r;
}

function tt(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

const et = S.getOwn;

const it = S.hasOwn;

const st = S.define;

const {annotation: nt, resource: rt} = t;

const ot = nt.keyFor;

const lt = rt.keyFor;

const ht = rt.appendTo;

const ct = nt.appendTo;

const at = nt.getKeys;

const ut = () => Object.create(null);

const ft = t => new Error(t);

const dt = Object.prototype.hasOwnProperty;

const mt = ut();

const gt = (t, e, i) => {
    if (true === mt[e]) return true;
    if (!bt(e)) return false;
    const s = e.slice(0, 5);
    return mt[e] = "aria-" === s || "data-" === s || i.isStandardSvgAttribute(t, e);
};

const pt = t => t instanceof Promise;

const vt = t => t instanceof Array;

const wt = t => "function" === typeof t;

const bt = t => "string" === typeof t;

const xt = Object.defineProperty;

const yt = t => {
    throw t;
};

const kt = Reflect.defineProperty;

const Ct = (t, e, i) => {
    kt(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: i
    });
    return i;
};

function At(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        st(St, BindableDefinition.create(e, t, i), t.constructor, e);
        ct(t.constructor, Bt.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (bt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Rt(t) {
    return t.startsWith(St);
}

const St = ot("bindable");

const Bt = Object.freeze({
    name: St,
    keyFrom: t => `${St}:${t}`,
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
                if (bt(s)) {
                    n = s;
                    r = {
                        property: n
                    };
                } else {
                    n = s.property;
                    r = s;
                }
                e = BindableDefinition.create(n, t, r);
                if (!it(St, t, n)) ct(t, Bt.keyFrom(n));
                st(St, e, t, n);
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
        const i = St.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            c = n[r];
            l = at(c).filter(Rt);
            h = l.length;
            for (a = 0; a < h; ++a) s[o++] = et(St, c, l[a].slice(i));
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
    static create(t, e, n = {}) {
        return new BindableDefinition(i(n.attribute, s(t)), i(n.callback, `${t}Changed`), i(n.mode, 2), i(n.primary, false), i(n.property, t), i(n.set, Dt(t, e, n)));
    }
}

function It(t, e, i) {
    Tt.define(t, e);
}

const Tt = {
    key: ot("coercer"),
    define(t, e) {
        st(Tt.key, t[e].bind(t), t);
    },
    for(t) {
        return et(Tt.key, t);
    }
};

function Dt(t, e, i = {}) {
    const s = i.type ?? Reflect.getMetadata("design:type", e, t) ?? null;
    if (null == s) return n;
    let r;
    switch (s) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        r = s;
        break;

      default:
        {
            const t = s.coerce;
            r = "function" === typeof t ? t.bind(s) : Tt.for(s) ?? n;
            break;
        }
    }
    return r === n ? r : Et(r, i.nullable);
}

function Et(t, e) {
    return function(i, s) {
        if (!s?.enableCoercion) return i;
        return (e ?? (s?.coerceNullish ?? false ? false : true)) && null == i ? i : t(i, s);
    };
}

class BindableObserver {
    constructor(t, e, i, s, r, o) {
        this.set = s;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        const l = t[i];
        const h = t.propertyChanged;
        const c = this.i = wt(l);
        const a = this.u = wt(h);
        const u = this.hs = s !== n;
        let f;
        this.o = t;
        this.k = e;
        this.cb = c ? l : n;
        this.C = a ? h : n;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
            this.iO = true;
            f = t[e];
            this.v = u && void 0 !== f ? s(f, this.t) : f;
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

I(BindableObserver);

const Pt = function(t) {
    function e(t, i, s) {
        r.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.get(t);
        return i.has(t, false) ? i.get(t) : i.root.get(t);
    };
    return e;
};

const Lt = function(t) {
    function e(t, i, s) {
        r.inject(e)(t, i, s);
    }
    e.$isResolver = true;
    e.resolve = function(e, i) {
        if (i.root === i) return i.getAll(t, false);
        return i.has(t, false) ? i.getAll(t, false).concat(i.root.getAll(t, false)) : i.root.getAll(t, false);
    };
    return e;
};

const $t = r.createInterface;

const Ot = o.singleton;

const Ut = o.aliasTo;

const qt = o.instance;

const jt = o.callback;

const _t = o.transient;

const Ft = (t, e, i) => t.registerResolver(e, i);

function Mt(...t) {
    return function(e) {
        const i = ot("aliases");
        const s = et(i, e);
        if (void 0 === s) st(i, t, e); else s.push(...t);
    };
}

function Vt(t, e, i, s) {
    for (let n = 0, r = t.length; n < r; ++n) o.aliasTo(i, e.keyFrom(t[n])).register(s);
}

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
        this.parts = l;
        this.$ = "";
        this.O = {};
        this.U = {};
    }
    get pattern() {
        const t = this.$;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.$ = "";
            this.parts = l;
        } else {
            this.$ = t;
            this.parts = this.U[t];
        }
    }
    append(t, e) {
        const i = this.O;
        if (void 0 === i[t]) i[t] = e; else i[t] += e;
    }
    next(t) {
        const e = this.O;
        let i;
        if (void 0 !== e[t]) {
            i = this.U;
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

const Nt = $t("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

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
        let c = 0;
        let a;
        while (e > c) {
            i = this.rootState;
            s = t[c];
            n = s.pattern;
            r = new SegmentTypes;
            o = this.parse(s, r);
            l = o.length;
            h = t => {
                i = i.append(t, n);
            };
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            i.types = r;
            i.isEndpoint = true;
            ++c;
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
        s = s.filter(Wt);
        if (s.length > 0) {
            s.sort(Ht);
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

function Wt(t) {
    return t.isEndpoint;
}

function Ht(t, e) {
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

const zt = $t("IAttributePattern");

const Gt = $t("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.q = {};
        this.j = t;
        const i = this._ = {};
        const s = e.reduce(((t, e) => {
            const s = Yt(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), l);
        t.add(s);
    }
    parse(t, e) {
        let i = this.q[t];
        if (null == i) i = this.q[t] = this.j.interpret(t);
        const s = i.pattern;
        if (null == s) return new AttrSyntax(t, e, t, null); else return this._[s][s](t, e, i.parts);
    }
}

AttributeParser.inject = [ Nt, h(zt) ];

function Xt(...t) {
    return function e(i) {
        return Zt.define(t, i);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        Ot(zt, this.Type).register(t);
    }
}

const Kt = lt("attribute-pattern");

const Qt = "attribute-pattern-definitions";

const Yt = e => t.annotation.get(e, Qt);

const Zt = Object.freeze({
    name: Kt,
    definitionAnnotationKey: Qt,
    define(e, i) {
        const s = new AttributePatternResourceDefinition(i);
        st(Kt, s, i);
        ht(i, Kt);
        t.annotation.set(i, Qt, e);
        ct(i, Qt);
        return i;
    },
    getPatternDefinitions: Yt
});

let Jt = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[1]);
    }
    "PART.PART.PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], i[2]);
    }
};

Jt = J([ Xt({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], Jt);

let te = class RefAttributePattern {
    ref(t, e, i) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "ref");
    }
};

te = J([ Xt({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], te);

let ee = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "bind");
    }
};

ee = J([ Xt({
    pattern: ":PART",
    symbols: ":"
}) ], ee);

let ie = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, i) {
        return new AttrSyntax(t, e, i[0], "trigger");
    }
};

ie = J([ Xt({
    pattern: "@PART",
    symbols: "@"
}) ], ie);

let se = class SpreadAttributePattern {
    "...$attrs"(t, e, i) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

se = J([ Xt({
    pattern: "...$attrs",
    symbols: ""
}) ], se);

function ne(t) {
    return function(e) {
        return le.define(t, e);
    };
}

class BindingBehaviorDefinition {
    constructor(t, e, i, s) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
    }
    static create(t, e) {
        let s;
        let n;
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingBehaviorDefinition(e, i(oe(e, "name"), s), c(oe(e, "aliases"), n.aliases, e.aliases), le.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ot(i, e).register(t);
        Ut(i, e).register(t);
        Vt(s, le, i, t);
    }
}

const re = lt("binding-behavior");

const oe = (t, e) => et(ot(e), t);

const le = Object.freeze({
    name: re,
    keyFrom(t) {
        return `${re}:${t}`;
    },
    isType(t) {
        return wt(t) && it(re, t);
    },
    define(t, e) {
        const i = BindingBehaviorDefinition.create(t, e);
        st(re, i, i.Type);
        st(re, i, i);
        ht(e, re);
        return i.Type;
    },
    getDefinition(t) {
        const e = et(re, t);
        if (void 0 === e) throw ft(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        st(ot(e), i, t);
    },
    getAnnotation: oe
});

function he(t) {
    return function(e) {
        return ue.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, i, s) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
    }
    static create(t, e) {
        let s;
        let n;
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, i(ae(e, "name"), s), c(ae(e, "aliases"), n.aliases, e.aliases), ue.keyFrom(s));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        o.singleton(i, e).register(t);
        o.aliasTo(i, e).register(t);
        Vt(s, ue, i, t);
    }
}

const ce = lt("value-converter");

const ae = (t, e) => et(ot(e), t);

const ue = Object.freeze({
    name: ce,
    keyFrom: t => `${ce}:${t}`,
    isType(t) {
        return wt(t) && it(ce, t);
    },
    define(t, e) {
        const i = ValueConverterDefinition.create(t, e);
        st(ce, i, i.Type);
        st(ce, i, i);
        ht(e, ce);
        return i.Type;
    },
    getDefinition(t) {
        const e = et(ce, t);
        if (void 0 === e) throw ft(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, i) {
        st(ot(e), i, t);
    },
    getAnnotation: ae
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
        if (t !== T(i.ast, i.scope, i, null)) {
            this.v = t;
            this.F.add(this);
        }
    }
}

const fe = t => {
    Ct(t.prototype, "useScope", (function(t) {
        this.scope = t;
    }));
};

const de = (t, e = true) => i => {
    const s = i.prototype;
    if (null != t) kt(s, "strict", {
        enumerable: true,
        get: function() {
            return t;
        }
    });
    kt(s, "strictFnCall", {
        enumerable: true,
        get: function() {
            return e;
        }
    });
    Ct(s, "get", (function(t) {
        return this.locator.get(t);
    }));
    Ct(s, "getConverter", (function(t) {
        const e = ue.keyFrom(t);
        let i = me.get(this);
        if (null == i) me.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.locator.get(Pt(e)));
    }));
    Ct(s, "getBehavior", (function(t) {
        const e = le.keyFrom(t);
        let i = me.get(this);
        if (null == i) me.set(this, i = new ResourceLookup);
        return i[e] ?? (i[e] = this.locator.get(Pt(e)));
    }));
};

const me = new WeakMap;

class ResourceLookup {}

const ge = $t("IFlushQueue", (t => t.singleton(FlushQueue)));

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
            this.V.forEach(pe);
        } finally {
            this.M = false;
        }
    }
    clear() {
        this.V.clear();
        this.M = false;
    }
}

function pe(t, e, i) {
    i.delete(t);
    t.flush();
}

const ve = new WeakSet;

const we = (t, e) => {
    Ct(t.prototype, "limit", (function(t) {
        if (ve.has(this)) throw ft(`AURXXXX: a rate limit has already been applied.`);
        ve.add(this);
        const i = e(this, t);
        const s = this[i];
        const n = (...t) => s.call(this, ...t);
        const r = "debounce" === t.type ? be(t, n, this) : xe(t, n, this);
        this[i] = r;
        return {
            dispose: () => {
                ve.delete(this);
                r.dispose();
                delete this[i];
            }
        };
    }));
};

const be = (t, e, i) => {
    let s;
    let n;
    let r;
    const o = t.queue;
    const l = l => {
        r = l;
        if (i.isBound) {
            n = s;
            s = o.queueTask((() => e(r)), {
                delay: t.delay,
                reusable: false
            });
            n?.cancel();
        } else e(r);
    };
    l.dispose = () => {
        n?.cancel();
        s?.cancel();
    };
    return l;
};

const xe = (t, e, i) => {
    let s;
    let n;
    let r = 0;
    let o = 0;
    let l;
    const h = t.queue;
    const c = () => t.now();
    const a = a => {
        l = a;
        if (i.isBound) {
            o = c() - r;
            n = s;
            if (o > t.delay) {
                r = c();
                e(l);
            } else s = h.queueTask((() => {
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
        s?.cancel();
    };
    return a;
};

class CallBinding {
    constructor(t, e, i, s, n) {
        this.locator = t;
        this.ast = i;
        this.target = s;
        this.targetProperty = n;
        this.isBound = false;
        this.boundFn = false;
        this.targetObserver = e.getAccessor(s, n);
    }
    callSource(t) {
        const e = this.scope.overrideContext;
        e.$event = t;
        const i = T(this.ast, this.scope, this, null);
        Reflect.deleteProperty(e, "$event");
        return i;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        D(this.ast, t, this);
        this.targetObserver.setValue((t => this.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
        this.scope = void 0;
        this.targetObserver.setValue(null, this.target, this.targetProperty);
    }
}

fe(CallBinding);

we(CallBinding, (() => "callSource"));

de(true)(CallBinding);

class AttributeObserver {
    constructor(t, e, i) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.N = false;
        this.o = t;
        this.W = e;
        this.H = i;
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
                    if (bt(e) && e.includes("!important")) {
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
        for (let i = 0, s = t.length; s > i; ++i) {
            const s = t[i];
            if ("attributes" === s.type && s.attributeName === this.W) {
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
                throw ft(`AUR0651:${this.H}`);
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
            ye(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) ke(this.o, this);
    }
    X() {
        Re = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Re);
    }
}

I(AttributeObserver);

const ye = (t, e, i) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(Ce)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(i);
};

const ke = (t, e) => {
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

const Ce = t => {
    t[0].target.$eMObs.forEach(Ae, t);
};

function Ae(t) {
    t.handleMutation(this);
}

let Re;

const Se = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, i, s, n, r, o, l, h) {
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
        this.oL = i;
        this.Y = s;
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
        const s = T(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (s !== this.v) {
            this.v = s;
            if (t) {
                i = this.task;
                this.task = this.Y.queueTask((() => {
                    this.task = null;
                    this.updateTarget(s);
                }), Se);
                i?.cancel();
            } else this.updateTarget(s);
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
        D(this.ast, t, this);
        this.targetObserver ?? (this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute));
        if (this.mode & (2 | 1)) this.updateTarget(this.v = T(this.ast, t, this, (2 & this.mode) > 0 ? this : null));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
        this.scope = void 0;
        this.v = void 0;
        this.task?.cancel();
        this.task = null;
        this.obs.clearAll();
    }
}

fe(AttributeBinding);

we(AttributeBinding, (() => "updateTarget"));

P(AttributeBinding);

de(true)(AttributeBinding);

const Be = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.locator = e;
        this.taskQueue = s;
        this.ast = n;
        this.target = r;
        this.targetProperty = o;
        this.mode = l;
        this.isBound = false;
        this.scope = void 0;
        this.task = null;
        this.K = t;
        this.oL = i;
        this.targetObserver = i.getAccessor(r, o);
        const h = n.expressions;
        const c = this.partBindings = Array(h.length);
        const a = h.length;
        let u = 0;
        for (;a > u; ++u) c[u] = new InterpolationPartBinding(h[u], r, o, e, i, this);
    }
    Z() {
        this.updateTarget();
    }
    updateTarget() {
        const t = this.partBindings;
        const e = this.ast.parts;
        const i = t.length;
        let s = "";
        let n = 0;
        if (1 === i) s = e[0] + t[0].v + e[1]; else {
            s = e[0];
            for (;i > n; ++n) s += t[n].v + e[n + 1];
        }
        const r = this.targetObserver;
        const o = 1 !== this.K.state && (4 & r.type) > 0;
        let l;
        if (o) {
            l = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                r.setValue(s, this.target, this.targetProperty);
            }), Be);
            l?.cancel();
            l = null;
        } else r.setValue(s, this.target, this.targetProperty);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        const e = this.partBindings;
        const i = e.length;
        let s = 0;
        for (;i > s; ++s) e[s].$bind(t);
        this.updateTarget();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.scope = void 0;
        const t = this.partBindings;
        const e = t.length;
        let i = 0;
        for (;e > i; ++i) t[i].$unbind();
        this.task?.cancel();
        this.task = null;
    }
}

de(true)(InterpolationBinding);

class InterpolationPartBinding {
    constructor(t, e, i, s, n, r) {
        this.ast = t;
        this.target = e;
        this.targetProperty = i;
        this.locator = s;
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
        const i = T(this.ast, this.scope, this, e ? this : null);
        if (e) t.clear();
        if (i != this.v) {
            this.v = i;
            if (vt(i)) this.observeCollection(i);
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
        D(this.ast, t, this);
        this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (vt(this.v)) this.observeCollection(this.v);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

fe(InterpolationPartBinding);

we(InterpolationPartBinding, (() => "updateTarget"));

P(InterpolationPartBinding);

de(true)(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, i, s, n, r, o, l) {
        this.locator = e;
        this.taskQueue = s;
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
        this.oL = i;
    }
    updateTarget(t) {
        const e = this.target;
        const i = this.p.Node;
        const s = this.v;
        this.v = t;
        if (s instanceof i) s.parentNode?.removeChild(s);
        if (t instanceof i) {
            e.textContent = "";
            e.parentNode?.insertBefore(t, e);
        } else e.textContent = String(t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = (2 & this.mode) > 0;
        if (t) this.obs.version++;
        const e = T(this.ast, this.scope, this, t ? this : null);
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
        const t = this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        this.obs.clear();
        if (vt(t)) this.observeCollection(t);
        const e = 1 !== this.K.state;
        if (e) this.J(t); else this.updateTarget(t);
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        D(this.ast, t, this);
        const e = this.v = T(this.ast, this.scope, this, (2 & this.mode) > 0 ? this : null);
        if (vt(e)) this.observeCollection(e);
        this.updateTarget(e);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
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
        }), Be);
        e?.cancel();
    }
}

fe(ContentBinding);

we(ContentBinding, (() => "updateTarget"));

P()(ContentBinding);

de(void 0, false)(ContentBinding);

class LetBinding {
    constructor(t, e, i, s, n = false) {
        this.locator = t;
        this.ast = i;
        this.targetProperty = s;
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
        if ((Ie = T(this.ast, this.scope, this, this)) !== this.v) this.v = Ie;
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
        D(this.ast, t, this);
        this.v = T(this.ast, this.scope, this, this);
        this.updateTarget();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

fe(LetBinding);

we(LetBinding, (() => "updateTarget"));

P(LetBinding);

de(true)(LetBinding);

let Ie;

const Te = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, e, i, s, n, r, o, l) {
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
        this.Y = s;
        this.oL = i;
    }
    updateTarget(t) {
        this.targetObserver.setValue(t, this.target, this.targetProperty);
    }
    updateSource(t) {
        L(this.ast, this.scope, this, t);
    }
    handleChange() {
        if (!this.isBound) return;
        const t = 1 !== this.K.state && (4 & this.targetObserver.type) > 0;
        const e = this.mode > 1;
        if (e) this.obs.version++;
        const i = T(this.ast, this.scope, this, this);
        if (e) this.obs.clear();
        if (t) {
            De = this.task;
            this.task = this.Y.queueTask((() => {
                this.updateTarget(i);
                this.task = null;
            }), Te);
            De?.cancel();
            De = null;
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
        D(this.ast, t, this);
        const e = this.oL;
        const i = this.mode;
        let s = this.targetObserver;
        if (!s) {
            if (4 & i) s = e.getObserver(this.target, this.targetProperty); else s = e.getAccessor(this.target, this.targetProperty);
            this.targetObserver = s;
        }
        const n = (2 & i) > 0;
        if (i & (2 | 1)) this.updateTarget(T(this.ast, this.scope, this, n ? this : null));
        if (4 & i) {
            s.subscribe(this.et ?? (this.et = new BindingTargetSubscriber(this, this.locator.get(ge))));
            if (!n) this.updateSource(s.getValue(this.target, this.targetProperty));
        }
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
        this.scope = void 0;
        if (this.et) {
            this.targetObserver.unsubscribe(this.et);
            this.et = null;
        }
        if (null != De) {
            De.cancel();
            De = this.task = null;
        }
        this.obs.clearAll();
    }
    useTargetSubscriber(t) {
        if (null != this.et) throw ft(`AURxxxx: binding already has a target subscriber`);
        this.et = t;
    }
}

fe(PropertyBinding);

we(PropertyBinding, (t => 4 & t.mode ? "updateSource" : "updateTarget"));

P(PropertyBinding);

de(true, false)(PropertyBinding);

let De = null;

class RefBinding {
    constructor(t, e, i) {
        this.locator = t;
        this.ast = e;
        this.target = i;
        this.isBound = false;
        this.scope = void 0;
    }
    $bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.$unbind();
        }
        this.scope = t;
        D(this.ast, t, this);
        L(this.ast, this.scope, this, this.target);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        if (T(this.ast, this.scope, this, null) === this.target) L(this.ast, this.scope, this, null);
        E(this.ast, this.scope, this);
        this.scope = void 0;
    }
}

const Ee = $t("IAppTask");

class $AppTask {
    constructor(t, e, i) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = i;
    }
    register(t) {
        return this.c = t.register(qt(Ee, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const Pe = Object.freeze({
    creating: Le("creating"),
    hydrating: Le("hydrating"),
    hydrated: Le("hydrated"),
    activating: Le("activating"),
    activated: Le("activated"),
    deactivating: Le("deactivating"),
    deactivated: Le("deactivated")
});

function Le(t) {
    function e(e, i) {
        if (wt(i)) return new $AppTask(t, e, i);
        return new $AppTask(t, null, e);
    }
    return e;
}

function $e(t, e) {
    let i;
    function s(t, e) {
        if (arguments.length > 1) i.property = e;
        st(Ue, ChildrenDefinition.create(e, i), t.constructor, e);
        ct(t.constructor, qe.keyFrom(e));
    }
    if (arguments.length > 1) {
        i = {};
        s(t, e);
        return;
    } else if (bt(t)) {
        i = {};
        return s;
    }
    i = void 0 === t ? {} : t;
    return s;
}

function Oe(t) {
    return t.startsWith(Ue);
}

const Ue = ot("children-observer");

const qe = Object.freeze({
    name: Ue,
    keyFrom: t => `${Ue}:${t}`,
    from(...t) {
        const e = {};
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function s(t, i) {
            e[t] = ChildrenDefinition.create(t, i);
        }
        function n(t) {
            if (vt(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => s(e, t)));
        }
        t.forEach(n);
        return e;
    },
    getAll(t) {
        const i = Ue.length + 1;
        const s = [];
        const n = e(t);
        let r = n.length;
        let o = 0;
        let l;
        let h;
        let c;
        while (--r >= 0) {
            c = n[r];
            l = at(c).filter(Oe);
            h = l.length;
            for (let t = 0; t < h; ++t) s[o++] = et(Ue, c, l[t].slice(i));
        }
        return s;
    }
});

const je = {
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
    static create(t, e = {}) {
        return new ChildrenDefinition(i(e.callback, `${t}Changed`), i(e.property, t), e.options ?? je, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, i, s, n = _e, r = Fe, o = Me, l) {
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
        if (!this.observing) {
            this.observing = true;
            this.children = this.get();
            (this.observer ?? (this.observer = new this.controller.host.ownerDocument.defaultView.MutationObserver((() => {
                this.it();
            })))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = l;
        }
    }
    it() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0);
    }
    get() {
        return Ne(this.controller, this.query, this.filter, this.map);
    }
}

I()(ChildrenObserver);

function _e(t) {
    return t.host.childNodes;
}

function Fe(t, e, i) {
    return !!i;
}

function Me(t, e, i) {
    return i;
}

const Ve = {
    optional: true
};

function Ne(t, e, i, s) {
    const n = e(t);
    const r = n.length;
    const o = [];
    let l;
    let h;
    let c;
    let a = 0;
    for (;a < r; ++a) {
        l = n[a];
        h = ki(l, Ve);
        c = h?.viewModel ?? null;
        if (i(l, h, c)) o.push(s(l, h, c));
    }
    return o;
}

function We(t) {
    return function(e) {
        return Ye(t, e);
    };
}

function He(t) {
    return function(e) {
        return Ye(bt(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, i, s, n, r, o, l, h, c) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
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
    static create(t, e) {
        let s;
        let n;
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new CustomAttributeDefinition(e, i(Xe(e, "name"), s), c(Xe(e, "aliases"), n.aliases, e.aliases), Ge(s), i(Xe(e, "defaultBindingMode"), n.defaultBindingMode, e.defaultBindingMode, 2), i(Xe(e, "isTemplateController"), n.isTemplateController, e.isTemplateController, false), Bt.from(e, ...Bt.getAll(e), Xe(e, "bindables"), e.bindables, n.bindables), i(Xe(e, "noMultiBindings"), n.noMultiBindings, e.noMultiBindings, false), c(si.getAnnotation(e), e.watches), c(Xe(e, "dependencies"), n.dependencies, e.dependencies));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        _t(i, e).register(t);
        Ut(i, e).register(t);
        Vt(s, Je, i, t);
    }
}

const ze = lt("custom-attribute");

const Ge = t => `${ze}:${t}`;

const Xe = (t, e) => et(ot(e), t);

const Ke = t => wt(t) && it(ze, t);

const Qe = (t, e) => qs(t, Ge(e)) ?? void 0;

const Ye = (t, e) => {
    const i = CustomAttributeDefinition.create(t, e);
    st(ze, i, i.Type);
    st(ze, i, i);
    ht(e, ze);
    return i.Type;
};

const Ze = t => {
    const e = et(ze, t);
    if (void 0 === e) throw ft(`AUR0759:${t.name}`);
    return e;
};

const Je = Object.freeze({
    name: ze,
    keyFrom: Ge,
    isType: Ke,
    for: Qe,
    define: Ye,
    getDefinition: Ze,
    annotate(t, e, i) {
        st(ot(e), i, t);
    },
    getAnnotation: Xe
});

function ti(t, e) {
    if (null == t) throw ft(`AUR0772`);
    return function i(s, n, r) {
        const o = null == n;
        const l = o ? s : s.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!wt(e) && (null == e || !(e in l.prototype))) throw ft(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!wt(r?.value)) throw ft(`AUR0774:${String(n)}`);
        si.add(l, h);
        if (Ke(l)) Ze(l).watches.push(h);
        if (yi(l)) Ai(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const ei = l;

const ii = ot("watch");

const si = Object.freeze({
    name: ii,
    add(t, e) {
        let i = et(ii, t);
        if (null == i) st(ii, i = [], t);
        i.push(e);
    },
    getAnnotation(t) {
        return et(ii, t) ?? ei;
    }
});

function ni(t) {
    return function(e) {
        return xi(t, e);
    };
}

function ri(t) {
    if (void 0 === t) return function(t) {
        bi(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!wt(t)) return function(e) {
        bi(e, "shadowOptions", t);
    };
    bi(t, "shadowOptions", {
        mode: "open"
    });
}

function oi(t) {
    if (void 0 === t) return function(t) {
        li(t);
    };
    li(t);
}

function li(t) {
    const e = et(pi, t);
    if (void 0 === e) {
        bi(t, "containerless", true);
        return;
    }
    e.containerless = true;
}

function hi(t) {
    if (void 0 === t) return function(t) {
        bi(t, "isStrictBinding", true);
    };
    bi(t, "isStrictBinding", true);
}

const ci = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, i, s, n, r, o, l, h, c, a, u, f, d, m, g, p, v, w, b, x) {
        this.Type = t;
        this.name = e;
        this.aliases = i;
        this.key = s;
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
        this.containerless = m;
        this.isStrictBinding = g;
        this.shadowOptions = p;
        this.hasSlots = v;
        this.enhance = w;
        this.watches = b;
        this.processContent = x;
    }
    get type() {
        return 1;
    }
    static create(t, e = null) {
        if (null === e) {
            const i = t;
            if (bt(i)) throw ft(`AUR0761:${t}`);
            const s = a("name", i, wi);
            if (wt(i.Type)) e = i.Type; else e = Si(u(s));
            return new CustomElementDefinition(e, s, c(i.aliases), a("key", i, (() => vi(s))), a("cache", i, ui), a("capture", i, di), a("template", i, fi), c(i.instructions), c(i.dependencies), a("injectable", i, fi), a("needsCompile", i, mi), c(i.surrogates), Bt.from(e, i.bindables), qe.from(i.childrenObservers), a("containerless", i, di), a("isStrictBinding", i, di), a("shadowOptions", i, fi), a("hasSlots", i, di), a("enhance", i, di), a("watches", i, gi), f("processContent", e, fi));
        }
        if (bt(t)) return new CustomElementDefinition(e, t, c(Ci(e, "aliases"), e.aliases), vi(t), f("cache", e, ui), f("capture", e, di), f("template", e, fi), c(Ci(e, "instructions"), e.instructions), c(Ci(e, "dependencies"), e.dependencies), f("injectable", e, fi), f("needsCompile", e, mi), c(Ci(e, "surrogates"), e.surrogates), Bt.from(e, ...Bt.getAll(e), Ci(e, "bindables"), e.bindables), qe.from(...qe.getAll(e), Ci(e, "childrenObservers"), e.childrenObservers), f("containerless", e, di), f("isStrictBinding", e, di), f("shadowOptions", e, fi), f("hasSlots", e, di), f("enhance", e, di), c(si.getAnnotation(e), e.watches), f("processContent", e, fi));
        const i = a("name", t, wi);
        return new CustomElementDefinition(e, i, c(Ci(e, "aliases"), t.aliases, e.aliases), vi(i), d("cache", t, e, ui), d("capture", t, e, di), d("template", t, e, fi), c(Ci(e, "instructions"), t.instructions, e.instructions), c(Ci(e, "dependencies"), t.dependencies, e.dependencies), d("injectable", t, e, fi), d("needsCompile", t, e, mi), c(Ci(e, "surrogates"), t.surrogates, e.surrogates), Bt.from(e, ...Bt.getAll(e), Ci(e, "bindables"), e.bindables, t.bindables), qe.from(...qe.getAll(e), Ci(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), d("containerless", t, e, di), d("isStrictBinding", t, e, di), d("shadowOptions", t, e, fi), d("hasSlots", t, e, di), d("enhance", t, e, di), c(t.watches, si.getAnnotation(e), e.watches), d("processContent", t, e, fi));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (ci.has(t)) return ci.get(t);
        const e = CustomElementDefinition.create(t);
        ci.set(t, e);
        st(pi, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        if (!t.has(i, false)) {
            _t(i, e).register(t);
            Ut(i, e).register(t);
            Vt(s, Bi, i, t);
        }
    }
}

const ai = {
    name: void 0,
    searchParents: false,
    optional: false
};

const ui = () => 0;

const fi = () => null;

const di = () => false;

const mi = () => true;

const gi = () => l;

const pi = lt("custom-element");

const vi = t => `${pi}:${t}`;

const wi = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const bi = (t, e, i) => {
    st(ot(e), i, t);
};

const xi = (t, e) => {
    const i = CustomElementDefinition.create(t, e);
    st(pi, i, i.Type);
    st(pi, i, i);
    ht(i.Type, pi);
    return i.Type;
};

const yi = t => wt(t) && it(pi, t);

const ki = (t, e = ai) => {
    if (void 0 === e.name && true !== e.searchParents) {
        const i = qs(t, pi);
        if (null === i) {
            if (true === e.optional) return null;
            throw ft(`AUR0762`);
        }
        return i;
    }
    if (void 0 !== e.name) {
        if (true !== e.searchParents) {
            const i = qs(t, pi);
            if (null === i) throw ft(`AUR0763`);
            if (i.is(e.name)) return i;
            return;
        }
        let i = t;
        let s = false;
        while (null !== i) {
            const t = qs(i, pi);
            if (null !== t) {
                s = true;
                if (t.is(e.name)) return t;
            }
            i = Ns(i);
        }
        if (s) return;
        throw ft(`AUR0764`);
    }
    let i = t;
    while (null !== i) {
        const t = qs(i, pi);
        if (null !== t) return t;
        i = Ns(i);
    }
    throw ft(`AUR0765`);
};

const Ci = (t, e) => et(ot(e), t);

const Ai = t => {
    const e = et(pi, t);
    if (void 0 === e) throw ft(`AUR0760:${t.name}`);
    return e;
};

const Ri = () => {
    const t = function(e, i, s) {
        const n = r.getOrCreateAnnotationParamTypes(e);
        n[s] = t;
        return e;
    };
    t.register = function(e) {
        return {
            resolve(e, i) {
                if (i.has(t, true)) return i.get(t); else return null;
            }
        };
    };
    return t;
};

const Si = function() {
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
}();

const Bi = Object.freeze({
    name: pi,
    keyFrom: vi,
    isType: yi,
    for: ki,
    define: xi,
    getDefinition: Ai,
    annotate: bi,
    getAnnotation: Ci,
    generateName: wi,
    createInjectable: Ri,
    generateType: Si
});

const Ii = ot("processContent");

function Ti(t) {
    return void 0 === t ? function(t, e, i) {
        st(Ii, Di(t, e), t);
    } : function(e) {
        t = Di(e, t);
        const i = et(pi, e);
        if (void 0 !== i) i.processContent = t; else st(Ii, t, e);
        return e;
    };
}

function Di(t, e) {
    if (bt(e)) e = t[e];
    if (!wt(e)) throw ft(`AUR0766:${typeof e}`);
    return e;
}

function Ei(t) {
    return function(e) {
        const i = wt(t) ? t : true;
        bi(e, "capture", i);
        if (yi(e)) Ai(e).capture = i;
    };
}

const Pi = m;

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.st = {};
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
            const e = this.st;
            const i = Li(t);
            let s = this.nt;
            this.ov = t;
            if (i.length > 0) this.rt(i);
            this.nt += 1;
            if (0 === s) return;
            s -= 1;
            for (const t in e) {
                if (!dt.call(e, t) || e[t] !== s) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    rt(t) {
        const e = this.obj;
        const i = t.length;
        let s = 0;
        let n;
        for (;s < i; s++) {
            n = t[s];
            if (0 === n.length) continue;
            this.st[n] = this.nt;
            e.classList.add(n);
        }
    }
}

function Li(t) {
    if (bt(t)) return $i(t);
    if ("object" !== typeof t) return l;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...Li(t[s]));
            return i;
        } else return l;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...$i(i)); else e.push(i);
    return e;
}

function $i(t) {
    const e = t.match(/\S+/g);
    if (null === e) return l;
    return e;
}

function Oi(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const i = Object.assign({}, ...this.modules);
        const s = Ye({
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
                this.element.className = Li(this.value).map((t => i[t] || t)).join(" ");
            }
        }, e.inject = [ _s ], e));
        t.register(s);
    }
}

function Ui(...t) {
    return new ShadowDOMRegistry(t);
}

const qi = $t("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(Pi))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(_i);
        const i = t.get(qi);
        t.register(qt(ji, i.createStyles(this.css, e)));
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

AdoptedStyleSheetsStylesFactory.inject = [ Pi ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ Pi ];

const ji = $t("IShadowDOMStyles");

const _i = $t("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: n
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

const Fi = {
    shadowDOM(t) {
        return Pe.creating(g, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(qi);
                e.register(qt(_i, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: Mi, exit: Vi} = $;

const {wrap: Ni, unwrap: Wi} = O;

class ComputedWatcher {
    constructor(t, e, i, s, n) {
        this.obj = t;
        this.$get = i;
        this.cb = s;
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
        const i = this.compute();
        if (!Object.is(i, e)) this.cb.call(t, i, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            Mi(this);
            return this.value = Wi(this.$get.call(void 0, this.useProxy ? Ni(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            Vi(this);
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
        this.isBound = false;
        this.boundFn = false;
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const e = this.expression;
        const i = this.obj;
        const s = this.value;
        const n = 1 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = T(e, this.scope, this, this);
            this.obs.clear();
        }
        if (!Object.is(t, s)) {
            this.value = t;
            this.callback.call(i, t, s, i);
        }
    }
    $bind() {
        if (this.isBound) return;
        this.obs.version++;
        this.value = T(this.expression, this.scope, this, this);
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

P(ComputedWatcher);

de(true)(ComputedWatcher);

P(ExpressionWatcher);

de(true)(ExpressionWatcher);

const Hi = $t("ILifecycleHooks");

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
    register(t) {
        Ot(Hi, this.Type).register(t);
    }
}

const zi = new WeakMap;

const Gi = ot("lifecycle-hooks");

const Xi = Object.freeze({
    name: Gi,
    define(t, e) {
        const i = LifecycleHooksDefinition.create(t, e);
        st(Gi, i, e);
        ht(e, Gi);
        return i.Type;
    },
    resolve(t) {
        let e = zi.get(t);
        if (void 0 === e) {
            zi.set(t, e = new LifecycleHooksLookupImpl);
            const i = t.root;
            const s = i.id === t.id ? t.getAll(Hi) : t.has(Hi, false) ? i.getAll(Hi).concat(t.getAll(Hi)) : i.getAll(Hi);
            let n;
            let r;
            let o;
            let l;
            let h;
            for (n of s) {
                r = et(Gi, n.constructor);
                o = new LifecycleHooksEntry(r, n);
                for (l of r.propertyNames) {
                    h = e[l];
                    if (void 0 === h) e[l] = [ o ]; else h.push(o);
                }
            }
        }
        return e;
    }
});

class LifecycleHooksLookupImpl {}

function Ki() {
    return function t(e) {
        return Xi.define({}, e);
    };
}

const Qi = $t("IViewFactory");

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
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (bt(t)) t = parseInt(t, 10);
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

const Yi = new WeakSet;

function Zi(t) {
    return !Yi.has(t);
}

function Ji(t) {
    Yi.add(t);
    return CustomElementDefinition.create(t);
}

const ts = lt("views");

const es = Object.freeze({
    name: ts,
    has(t) {
        return wt(t) && (it(ts, t) || "$views" in t);
    },
    get(t) {
        if (wt(t) && "$views" in t) {
            const e = t.$views;
            const i = e.filter(Zi).map(Ji);
            for (const e of i) es.add(t, e);
        }
        let e = et(ts, t);
        if (void 0 === e) st(ts, e = [], t);
        return e;
    },
    add(t, e) {
        const i = CustomElementDefinition.create(e);
        let s = et(ts, t);
        if (void 0 === s) st(ts, s = [ i ], t); else s.push(i);
        return s;
    }
});

function is(t) {
    return function(e) {
        es.add(e, t);
    };
}

const ss = $t("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.ot = new WeakMap;
        this.lt = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const i = es.has(t.constructor) ? es.get(t.constructor) : [];
            const s = wt(e) ? e(t, i) : this.ht(i, e);
            return this.ct(t, i, s);
        }
        return null;
    }
    ct(t, e, i) {
        let s = this.ot.get(t);
        let n;
        if (void 0 === s) {
            s = {};
            this.ot.set(t, s);
        } else n = s[i];
        if (void 0 === n) {
            const r = this.ut(t, e, i);
            n = xi(Ai(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            s[i] = n;
        }
        return n;
    }
    ut(t, e, i) {
        let s = this.lt.get(t.constructor);
        let n;
        if (void 0 === s) {
            s = {};
            this.lt.set(t.constructor, s);
        } else n = s[i];
        if (void 0 === n) {
            n = xi(this.ft(e, i), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, i) {
                    const s = this.viewModel;
                    t.scope = U.fromParent(t.scope, s);
                    if (void 0 !== s.define) return s.define(t, e, i);
                }
            });
            const r = n.prototype;
            if ("hydrating" in t) r.hydrating = function t(e) {
                this.viewModel.hydrating(e);
            };
            if ("hydrated" in t) r.hydrated = function t(e) {
                this.viewModel.hydrated(e);
            };
            if ("created" in t) r.created = function t(e) {
                this.viewModel.created(e);
            };
            if ("binding" in t) r.binding = function t(e, i, s) {
                return this.viewModel.binding(e, i, s);
            };
            if ("bound" in t) r.bound = function t(e, i, s) {
                return this.viewModel.bound(e, i, s);
            };
            if ("attaching" in t) r.attaching = function t(e, i, s) {
                return this.viewModel.attaching(e, i, s);
            };
            if ("attached" in t) r.attached = function t(e, i) {
                return this.viewModel.attached(e, i);
            };
            if ("detaching" in t) r.detaching = function t(e, i, s) {
                return this.viewModel.detaching(e, i, s);
            };
            if ("unbinding" in t) r.unbinding = function t(e, i, s) {
                return this.viewModel.unbinding(e, i, s);
            };
            if ("dispose" in t) r.dispose = function t() {
                this.viewModel.dispose();
            };
            s[i] = n;
        }
        return n;
    }
    ht(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    ft(t, e) {
        const i = t.find((t => t.name === e));
        if (void 0 === i) throw ft(`Could not find view: ${e}`);
        return i;
    }
}

const ns = $t("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.dt = new WeakMap;
        this.gt = new WeakMap;
        this.p = (this.vt = t.root).get(Pi);
        this.wt = new FragmentNodeSequence(this.p, this.p.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.bt ? this.bt = this.vt.getAll(ln, false).reduce(((t, e) => {
            t[e.target] = e;
            return t;
        }), ut()) : this.bt;
    }
    compile(t, e, i) {
        if (false !== t.needsCompile) {
            const s = this.dt;
            const n = e.get(on);
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
        if (true === t.enhance) return new FragmentNodeSequence(this.p, t.template);
        let e;
        const i = this.gt;
        if (i.has(t)) e = i.get(t); else {
            const s = this.p;
            const n = s.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof s.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (bt(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            i.set(t, e);
        }
        return null == e ? this.wt : new FragmentNodeSequence(this.p, e.cloneNode(true));
    }
    render(t, e, i, s) {
        const n = i.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw ft(`AUR0757:${o}<>${n.length}`);
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
        if (null != s) {
            a = i.surrogates;
            if ((c = a.length) > 0) {
                h = 0;
                while (c > h) {
                    u = a[h];
                    r[u.type].render(t, s, u);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ g ];

var rs;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(rs || (rs = {}));

var os;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(os || (os = {}));

const ls = {
    optional: true
};

const hs = new WeakMap;

class Controller {
    constructor(t, e, i, s, n, r, o) {
        this.container = t;
        this.vmKind = e;
        this.definition = i;
        this.viewFactory = s;
        this.host = r;
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
        this.xt = null;
        this.state = 0;
        this.yt = false;
        this.kt = l;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.Ct = 0;
        this.At = 0;
        this.Rt = 0;
        this.St = n;
        this.Bt = 2 === e ? HooksDefinition.none : new HooksDefinition(n);
        this.location = o;
        this.r = t.root.get(ns);
    }
    get lifecycleHooks() {
        return this.xt;
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
        return hs.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw ft(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, s, n = void 0, r = null) {
        if (hs.has(e)) return hs.get(e);
        n = n ?? Ai(e.constructor);
        const o = new Controller(t, 0, n, null, e, i, r);
        const l = t.get(p(ks));
        if (n.dependencies.length > 0) t.register(...n.dependencies);
        Ft(t, ks, new v("IHydrationContext", new HydrationContext(o, s, l)));
        hs.set(e, o);
        if (null == s || false !== s.hydrate) o.hE(s, l);
        return o;
    }
    static $attr(t, e, i, s) {
        if (hs.has(e)) return hs.get(e);
        s = s ?? Ze(e.constructor);
        const n = new Controller(t, 1, s, null, e, i, null);
        if (s.dependencies.length > 0) t.register(...s.dependencies);
        hs.set(e, n);
        n.It();
        return n;
    }
    static $view(t, e = void 0) {
        const i = new Controller(t.container, 2, null, t, null, null, null);
        i.parent = e ?? null;
        i.Tt();
        return i;
    }
    hE(t, e) {
        const i = this.container;
        const s = this.flags;
        const n = this.St;
        let r = this.definition;
        this.scope = U.create(n, null, true);
        if (r.watches.length > 0) ms(this, i, r, n);
        as(this, r, s, n);
        this.kt = us(this, r, n);
        if (this.Bt.hasDefine) {
            const t = n.define(this, e, r);
            if (void 0 !== t && t !== r) r = CustomElementDefinition.getOrCreate(t);
        }
        this.xt = Xi.resolve(i);
        r.register(i);
        if (null !== r.injectable) Ft(i, r.injectable, new v("definition.injectable", n));
        if (null == t || false !== t.hydrate) {
            this.hS(t);
            this.hC();
        }
    }
    hS(t) {
        if (void 0 !== this.xt.hydrating) this.xt.hydrating.forEach(Rs, this);
        if (this.Bt.hasHydrating) this.St.hydrating(this);
        const e = this.Dt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: i, isStrictBinding: s, hasSlots: n, containerless: r} = e;
        let o = this.location;
        this.isStrictBinding = s;
        if (null !== (this.hostController = ki(this.host, ls))) {
            this.host = this.container.root.get(Pi).document.createElement(this.definition.name);
            if (r && null == o) o = this.location = Hs(this.host);
        }
        js(this.host, pi, this);
        js(this.host, this.definition.key, this);
        if (null !== i || n) {
            if (null != o) throw ft(`AUR0501`);
            js(this.shadowRoot = this.host.attachShadow(i ?? vs), pi, this);
            js(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (null != o) {
            js(o, pi, this);
            js(o, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.St.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (void 0 !== this.xt.hydrated) this.xt.hydrated.forEach(Ss, this);
        if (this.Bt.hasHydrated) this.St.hydrated(this);
    }
    hC() {
        this.r.render(this, this.nodes.findTargets(), this.Dt, this.host);
        if (void 0 !== this.xt.created) this.xt.created.forEach(As, this);
        if (this.Bt.hasCreated) this.St.created(this);
    }
    It() {
        const t = this.definition;
        const e = this.St;
        if (t.watches.length > 0) ms(this, this.container, t, e);
        as(this, t, this.flags, e);
        e.$controller = this;
        this.xt = Xi.resolve(this.container);
        if (void 0 !== this.xt.created) this.xt.created.forEach(As, this);
        if (this.Bt.hasCreated) this.St.created(this);
    }
    Tt() {
        this.Dt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Dt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Dt)).findTargets(), this.Dt, void 0);
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
            throw ft(`AUR0502:${this.name}`);

          default:
            throw ft(`AUR0503:${this.name} ${xs(this.state)}`);
        }
        this.parent = e;
        i |= 1;
        switch (this.vmKind) {
          case 0:
            this.scope.parent = s ?? null;
            break;

          case 1:
            this.scope = s ?? null;
            break;

          case 2:
            if (void 0 === s || null === s) throw ft(`AUR0504`);
            if (!this.hasLockedScope) this.scope = s;
            break;
        }
        if (this.isStrictBinding) ;
        this.$initiator = t;
        this.$flags = i;
        this.Et();
        let n;
        if (2 !== this.vmKind && null != this.xt.binding) n = w(...this.xt.binding.map(Bs, this));
        if (this.Bt.hasBinding) n = w(n, this.St.binding(this.$initiator, this.parent, this.$flags));
        if (pt(n)) {
            this.Pt();
            n.then((() => {
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
        let t = 0;
        let e = this.kt.length;
        let i;
        if (e > 0) while (e > t) {
            this.kt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            e = this.bindings.length;
            while (e > t) {
                this.bindings[t].$bind(this.scope);
                ++t;
            }
        }
        if (2 !== this.vmKind && null != this.xt.bound) i = w(...this.xt.bound.map(Is, this));
        if (this.Bt.hasBound) i = w(i, this.St.bound(this.$initiator, this.parent, this.$flags));
        if (pt(i)) {
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
                const e = t.has(ji, false) ? t.get(ji) : t.get(_i);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        let t = 0;
        let e;
        if (2 !== this.vmKind && null != this.xt.attaching) e = w(...this.xt.attaching.map(Ts, this));
        if (this.Bt.hasAttaching) e = w(e, this.St.attaching(this.$initiator, this.parent, this.$flags));
        if (pt(e)) {
            this.Pt();
            this.Et();
            e.then((() => {
                this.Ut();
            })).catch((t => {
                this.Lt(t);
            }));
        }
        if (null !== this.children) for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        this.Ut();
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
            throw ft(`AUR0505:${this.name} ${xs(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = i;
        if (t === this) this.qt();
        let s = 0;
        let n;
        if (this.kt.length) for (;s < this.kt.length; ++s) this.kt[s].stop();
        if (null !== this.children) for (s = 0; s < this.children.length; ++s) void this.children[s].deactivate(t, this, i);
        if (2 !== this.vmKind && null != this.xt.detaching) n = w(...this.xt.detaching.map(Es, this));
        if (this.Bt.hasDetaching) n = w(n, this.St.detaching(this.$initiator, this.parent, this.$flags));
        if (pt(n)) {
            this.Pt();
            t.qt();
            n.then((() => {
                t.jt();
            })).catch((e => {
                t.Lt(e);
            }));
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
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
            Ls = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            Ls();
            Ls = void 0;
        }
    }
    Lt(t) {
        if (void 0 !== this.$promise) {
            $s = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            $s(t);
            $s = void 0;
        }
        if (this.$initiator !== this) this.parent.Lt(t);
    }
    Et() {
        ++this.Ct;
        if (this.$initiator !== this) this.parent.Et();
    }
    Ut() {
        if (0 === --this.Ct) {
            if (2 !== this.vmKind && null != this.xt.attached) Os = w(...this.xt.attached.map(Ds, this));
            if (this.Bt.hasAttached) Os = w(Os, this.St.attached(this.$initiator, this.$flags));
            if (pt(Os)) {
                this.Pt();
                Os.then((() => {
                    this.state = 2;
                    this._t();
                    if (this.$initiator !== this) this.parent.Ut();
                })).catch((t => {
                    this.Lt(t);
                }));
                Os = void 0;
                return;
            }
            Os = void 0;
            this.state = 2;
            this._t();
        }
        if (this.$initiator !== this) this.parent.Ut();
    }
    qt() {
        ++this.At;
    }
    jt() {
        if (0 === --this.At) {
            this.Ft();
            this.removeNodes();
            let t = this.$initiator.head;
            let e;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (2 !== t.vmKind && null != t.xt.unbinding) e = w(...t.xt.unbinding.map(Ps, this));
                if (t.Bt.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    e = w(e, t.viewModel.unbinding(t.$initiator, t.parent, t.$flags));
                }
                if (pt(e)) {
                    this.Pt();
                    this.Ft();
                    e.then((() => {
                        this.Mt();
                    })).catch((t => {
                        this.Lt(t);
                    }));
                }
                e = void 0;
                t = t.next;
            }
            this.Mt();
        }
    }
    Ft() {
        ++this.Rt;
    }
    Mt() {
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
            return Ze(this.St.constructor).name === t;

          case 0:
            return Ai(this.St.constructor).name === t;

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
            js(t, pi, this);
            js(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            js(t, pi, this);
            js(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            js(t, pi, this);
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
        if (this.Bt.hasDispose) this.St.dispose();
        if (null !== this.children) {
            this.children.forEach(Cs);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.St) {
            hs.delete(this.St);
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
            for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
        }
    }
}

function cs(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function as(t, e, i, s) {
    const n = e.bindables;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        let e;
        let i;
        let l = 0;
        const h = cs(s);
        const c = t.container;
        const a = c.has(q, true) ? c.get(q) : null;
        for (;l < o; ++l) {
            e = r[l];
            if (void 0 === h[e]) {
                i = n[e];
                h[e] = new BindableObserver(s, e, i.callback, i.set, t, a);
            }
        }
    }
}

function us(t, e, i) {
    const s = e.childrenObservers;
    const n = Object.getOwnPropertyNames(s);
    const r = n.length;
    if (r > 0) {
        const e = cs(i);
        const o = [];
        let l;
        let h = 0;
        let c;
        for (;h < r; ++h) {
            l = n[h];
            if (null == e[l]) {
                c = s[l];
                o[o.length] = e[l] = new ChildrenObserver(t, i, l, c.callback, c.query, c.filter, c.map, c.options);
            }
        }
        return o;
    }
    return l;
}

const fs = new Map;

const ds = t => {
    let e = fs.get(t);
    if (null == e) {
        e = new F(t, 0);
        fs.set(t, e);
    }
    return e;
};

function ms(t, e, i, s) {
    const n = e.get(j);
    const r = e.get(_);
    const o = i.watches;
    const l = 0 === t.vmKind ? t.scope : U.create(s, null, true);
    const h = o.length;
    let c;
    let a;
    let u;
    let f = 0;
    for (;h > f; ++f) {
        ({expression: c, callback: a} = o[f]);
        a = wt(a) ? a : Reflect.get(s, a);
        if (!wt(a)) throw ft(`AUR0506:${String(a)}`);
        if (wt(c)) t.addBinding(new ComputedWatcher(s, n, c, a, true)); else {
            u = bt(c) ? r.parse(c, 8) : ds(c);
            t.addBinding(new ExpressionWatcher(l, e, n, u, a));
        }
    }
}

function gs(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function ps(t) {
    return B(t) && yi(t.constructor);
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

var ws;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(ws || (ws = {}));

var bs;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(bs || (bs = {}));

function xs(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const ys = $t("IController");

const ks = $t("IHydrationContext");

class HydrationContext {
    constructor(t, e, i) {
        this.instruction = e;
        this.parent = i;
        this.controller = t;
    }
}

function Cs(t) {
    t.dispose();
}

function As(t) {
    t.instance.created(this.St, this);
}

function Rs(t) {
    t.instance.hydrating(this.St, this);
}

function Ss(t) {
    t.instance.hydrated(this.St, this);
}

function Bs(t) {
    return t.instance.binding(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Is(t) {
    return t.instance.bound(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Ts(t) {
    return t.instance.attaching(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Ds(t) {
    return t.instance.attached(this.St, this["$initiator"], this["$flags"]);
}

function Es(t) {
    return t.instance.detaching(this.St, this["$initiator"], this.parent, this["$flags"]);
}

function Ps(t) {
    return t.instance.unbinding(this.St, this["$initiator"], this.parent, this["$flags"]);
}

let Ls;

let $s;

let Os;

const Us = $t("IAppRoot");

class AppRoot {
    constructor(t, e, i, s) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.Vt = void 0;
        this.host = t.host;
        s.prepare(this);
        Ft(i, e.HTMLElement, Ft(i, e.Element, Ft(i, _s, new v("ElementResolver", t.host))));
        this.Vt = b(this.Nt("creating"), (() => {
            const e = t.component;
            const s = i.createChild();
            let n;
            if (yi(e)) n = this.container.get(e); else n = t.component;
            const r = {
                hydrate: false,
                projections: null
            };
            const o = this.controller = Controller.$el(s, n, this.host, r);
            o.hE(r, null);
            return b(this.Nt("hydrating"), (() => {
                o.hS(null);
                return b(this.Nt("hydrated"), (() => {
                    o.hC();
                    this.Vt = void 0;
                }));
            }));
        }));
    }
    activate() {
        return b(this.Vt, (() => b(this.Nt("activating"), (() => b(this.controller.activate(this.controller, null, 1, void 0), (() => this.Nt("activated")))))));
    }
    deactivate() {
        return b(this.Nt("deactivating"), (() => b(this.controller.deactivate(this.controller, null, 0), (() => this.Nt("deactivated")))));
    }
    Nt(t) {
        return w(...this.container.getAll(Ee).reduce(((e, i) => {
            if (i.slot === t) e.push(i.run());
            return e;
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

function js(t, e, i) {
    var s;
    ((s = t).$au ?? (s.$au = new Refs))[e] = i;
}

const _s = $t("INode");

const Fs = $t("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Us, true)) return t.get(Us).host;
    return t.get(Pi).document;
}))));

const Ms = $t("IRenderLocation");

const Vs = new WeakMap;

function Ns(t) {
    if (Vs.has(t)) return Vs.get(t);
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
        const e = ki(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return Ns(e.host);
    }
    return t.parentNode;
}

function Ws(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const i = t.childNodes;
        for (let t = 0, s = i.length; t < s; ++t) Vs.set(i[t], e);
    } else Vs.set(t, e);
}

function Hs(t) {
    if (zs(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const i = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(i, e);
    }
    e.$start = i;
    return e;
}

function zs(t) {
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
            if ("AU-M" === r.nodeName) o[s] = Hs(r); else o[s] = r;
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
        if (zs(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const Gs = $t("IWindow", (t => t.callback((t => t.get(Pi).window))));

const Xs = $t("ILocation", (t => t.callback((t => t.get(Gs).location))));

const Ks = $t("IHistory", (t => t.callback((t => t.get(Gs).history))));

const Qs = {
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
    constructor(t, e, i, s, n, r) {
        this.locator = t;
        this.ast = e;
        this.target = i;
        this.targetEvent = s;
        this.eventDelegator = n;
        this.isBound = false;
        this.handler = null;
        this.boundFn = true;
        this.Wt = r;
    }
    callSource(t) {
        const e = this.scope.overrideContext;
        e.$event = t;
        let i = T(this.ast, this.scope, this, null);
        delete e.$event;
        if (wt(i)) i = i(t);
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
        D(this.ast, t, this);
        if (0 === this.Wt.strategy) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Fs), this.target, this.targetEvent, this, Qs[this.Wt.strategy]);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        E(this.ast, this.scope, this);
        this.scope = void 0;
        if (0 === this.Wt.strategy) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
    }
}

fe(Listener);

we(Listener, (() => "callSource"));

de(true, true)(Listener);

const Ys = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, i = Ys) {
        this.Ht = t;
        this.zt = e;
        this.Wt = i;
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
        let i = e.get(t);
        if (void 0 === i) e.set(t, i = ut());
        return i;
    }
    handleEvent(t) {
        const e = true === this.Wt.capture ? this.Xt : this.Kt;
        const i = t.composedPath();
        if (true === this.Wt.capture) i.reverse();
        for (const s of i) {
            const i = e.get(s);
            if (void 0 === i) continue;
            const n = i[this.zt];
            if (void 0 === n) continue;
            if (wt(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, i, s) {
        this.Jt = t;
        this.te = e;
        this.zt = i;
        t.Qt();
        e[i] = s;
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

const Zs = $t("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.ee = ut();
    }
    addEventListener(t, e, i, s, n) {
        var r;
        const o = (r = this.ee)[i] ?? (r[i] = new Map);
        let l = o.get(t);
        if (void 0 === l) o.set(t, l = new ListenerTracker(t, i, n));
        return new DelegateSubscription(l, l.Zt(e), i, s);
    }
    dispose() {
        for (const t in this.ee) {
            const e = this.ee[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const Js = $t("IProjections");

const tn = $t("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

var en;

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
})(en || (en = {}));

const sn = $t("Instruction");

function nn(t) {
    const e = t.type;
    return bt(e) && 2 === e.length;
}

class InterpolationInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
        this.type = "rf";
    }
}

class PropertyBindingInstruction {
    constructor(t, e, i) {
        this.from = t;
        this.to = e;
        this.mode = i;
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
    constructor(t, e, i, s, n, r) {
        this.res = t;
        this.alias = e;
        this.props = i;
        this.projections = s;
        this.containerless = n;
        this.captures = r;
        this.type = "ra";
        this.auSlot = null;
    }
}

class HydrateAttributeInstruction {
    constructor(t, e, i) {
        this.res = t;
        this.alias = e;
        this.props = i;
        this.type = "rb";
    }
}

class HydrateTemplateController {
    constructor(t, e, i, s) {
        this.def = t;
        this.res = e;
        this.alias = i;
        this.props = s;
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

var rn;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(rn || (rn = {}));

class ListenerBindingInstruction {
    constructor(t, e, i, s) {
        this.from = t;
        this.to = e;
        this.preventDefault = i;
        this.strategy = s;
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
    constructor(t, e, i) {
        this.attr = t;
        this.from = e;
        this.to = i;
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

const on = $t("ITemplateCompiler");

const ln = $t("IRenderer");

function hn(t) {
    return function e(i) {
        i.register = function(t) {
            Ot(ln, this).register(t);
        };
        xt(i.prototype, "target", {
            configurable: true,
            get: function() {
                return t;
            }
        });
        return i;
    };
}

function cn(t, e, i) {
    if (bt(e)) return t.parse(e, i);
    return e;
}

function an(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function un(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return ki(t);

      case "view":
        throw ft(`AUR0750`);

      case "view-model":
        return ki(t).viewModel;

      default:
        {
            const i = Qe(t, e);
            if (void 0 !== i) return i.viewModel;
            const s = ki(t, {
                name: e
            });
            if (void 0 === s) throw ft(`AUR0751:${e}`);
            return s.viewModel;
        }
    }
}

let fn = class SetPropertyRenderer {
    render(t, e, i) {
        const s = an(e);
        if (void 0 !== s.$observers?.[i.to]) s.$observers[i.to].setValue(i.value); else s[i.to] = i.value;
    }
};

fn = J([ hn("re") ], fn);

let dn = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ ns, Pi ];
    }
    render(t, e, i) {
        let s;
        let n;
        let r;
        let o;
        const l = i.res;
        const h = i.projections;
        const c = t.container;
        switch (typeof l) {
          case "string":
            s = c.find(Bi, l);
            if (null == s) throw ft(`AUR0752:${l}@${t["name"]}`);
            break;

          default:
            s = l;
        }
        const a = i.containerless || s.containerless;
        const u = a ? Hs(e) : null;
        const f = Un(this.p, t, e, i, u, null == h ? void 0 : new AuSlotsInfo(Object.keys(h)));
        n = s.Type;
        r = f.invoke(n);
        Ft(f, n, new v(s.key, r));
        o = Controller.$el(f, r, e, i, s, u);
        js(e, s.key, o);
        const d = this.r.renderers;
        const m = i.props;
        const g = m.length;
        let p = 0;
        let w;
        while (g > p) {
            w = m[p];
            d[w.type].render(t, o, w);
            ++p;
        }
        t.addChild(o);
    }
};

dn = J([ hn("ra") ], dn);

let mn = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ ns, Pi ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Je, i.res);
            if (null == n) throw ft(`AUR0753:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = qn(this.p, n, t, e, i, void 0, void 0);
        const o = Controller.$attr(r.ctn, r.vm, e, n);
        js(e, n.key, o);
        const l = this.r.renderers;
        const h = i.props;
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

mn = J([ hn("rb") ], mn);

let gn = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ ns, Pi ];
    }
    render(t, e, i) {
        let s = t.container;
        let n;
        switch (typeof i.res) {
          case "string":
            n = s.find(Je, i.res);
            if (null == n) throw ft(`AUR0754:${i.res}@${t["name"]}`);
            break;

          default:
            n = i.res;
        }
        const r = this.r.getViewFactory(i.def, s);
        const o = Hs(e);
        const l = qn(this.p, n, t, e, i, r, o);
        const h = Controller.$attr(l.ctn, l.vm, e, n);
        js(o, n.key, h);
        l.vm.link?.(t, h, e, i);
        const c = this.r.renderers;
        const a = i.props;
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

gn = J([ hn("rc") ], gn);

let pn = class LetElementRenderer {
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
        let c = 0;
        while (o > c) {
            l = s[c];
            h = cn(this.ep, l.from, 8);
            t.addBinding(new LetBinding(r, this.oL, h, l.to, n));
            ++c;
        }
    }
};

pn.inject = [ _, j ];

pn = J([ hn("rd") ], pn);

let vn = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 8 | 4);
        t.addBinding(new CallBinding(t.container, this.oL, s, an(e), i.to));
    }
};

vn.inject = [ _, j ];

vn = J([ hn("rh") ], vn);

let wn = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 8);
        t.addBinding(new RefBinding(t.container, s, un(e, i.to)));
    }
};

wn.inject = [ _ ];

wn = J([ hn("rj") ], wn);

let bn = class InterpolationBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = t.container;
        const n = cn(this.ep, i.from, 1);
        t.addBinding(new InterpolationBinding(t, s, this.oL, this.p.domWriteQueue, n, an(e), i.to, 2));
    }
};

bn.inject = [ _, j, Pi ];

bn = J([ hn("rf") ], bn);

let xn = class PropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, an(e), i.to, i.mode));
    }
};

xn.inject = [ _, j, Pi ];

xn = J([ hn("rg") ], xn);

let yn = class IteratorBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 2);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, an(e), i.to, 2));
    }
};

yn.inject = [ _, j, Pi ];

yn = J([ hn("rk") ], yn);

let kn = class TextBindingRenderer {
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
        const l = cn(this.ep, i.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            d = c[u];
            t.addBinding(new ContentBinding(t, s, this.oL, this.p.domWriteQueue, this.p, d, r.insertBefore(o.createTextNode(""), n), i.strict));
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

kn.inject = [ _, j, Pi ];

kn = J([ hn("ha") ], kn);

let Cn = class ListenerBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.ie = e;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 4);
        t.addBinding(new Listener(t.container, s, e, i.to, this.ie, new ListenerOptions(i.preventDefault, i.strategy)));
    }
};

Cn.inject = [ _, Zs ];

Cn = J([ hn("hb") ], Cn);

let An = class SetAttributeRenderer {
    render(t, e, i) {
        e.setAttribute(i.to, i.value);
    }
};

An = J([ hn("he") ], An);

let Rn = class SetClassAttributeRenderer {
    render(t, e, i) {
        Dn(e.classList, i.value);
    }
};

Rn = J([ hn("hf") ], Rn);

let Sn = class SetStyleAttributeRenderer {
    render(t, e, i) {
        e.style.cssText += i.value;
    }
};

Sn = J([ hn("hg") ], Sn);

let Bn = class StylePropertyBindingRenderer {
    constructor(t, e, i) {
        this.ep = t;
        this.oL = e;
        this.p = i;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 8);
        t.addBinding(new PropertyBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e.style, i.to, 2));
    }
};

Bn.inject = [ _, j, Pi ];

Bn = J([ hn("hd") ], Bn);

let In = class AttributeBindingRenderer {
    constructor(t, e, i) {
        this.p = t;
        this.ep = e;
        this.oL = i;
    }
    render(t, e, i) {
        const s = cn(this.ep, i.from, 8);
        t.addBinding(new AttributeBinding(t, t.container, this.oL, this.p.domWriteQueue, s, e, i.attr, i.to, 2));
    }
};

In.inject = [ Pi, _, j ];

In = J([ hn("hc") ], In);

let Tn = class SpreadRenderer {
    constructor(t, e) {
        this.se = t;
        this.r = e;
    }
    static get inject() {
        return [ on, ns ];
    }
    render(t, e, i) {
        const s = t.container;
        const n = s.get(ks);
        const r = this.r.renderers;
        const o = t => {
            let e = t;
            let i = n;
            while (null != i && e > 0) {
                i = i.parent;
                --e;
            }
            if (null == i) throw ft("No scope context for spread binding.");
            return i;
        };
        const h = i => {
            const s = o(i);
            const n = En(s);
            const c = this.se.compileSpread(s.controller.definition, s.instruction?.captures ?? l, s.controller.container, e);
            let a;
            for (a of c) switch (a.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                r[a.instructions.type].render(n, ki(e), a.instructions);
                break;

              default:
                r[a.type].render(n, e, a);
            }
            t.addBinding(n);
        };
        h(0);
    }
};

Tn = J([ hn("hs") ], Tn);

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
        if (null == e) throw ft("Invalid spreading. Context scope is null/undefined");
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
        if (1 !== t.vmKind) throw ft("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
    limit() {
        throw ft("not implemented");
    }
    useScope() {
        throw ft("not implemented");
    }
}

function Dn(t, e) {
    const i = e.length;
    let s = 0;
    for (let n = 0; n < i; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== s) t.add(e.slice(s, n));
        s = n + 1;
    } else if (n + 1 === i) t.add(e.slice(s));
}

const En = t => new SpreadBinding([], t);

const Pn = "IController";

const Ln = "IInstruction";

const $n = "IRenderLocation";

const On = "IAuSlotsInfo";

function Un(t, e, i, s, n, r) {
    const o = e.container.createChild();
    Ft(o, t.HTMLElement, Ft(o, t.Element, Ft(o, _s, new v("ElementResolver", i))));
    Ft(o, ys, new v(Pn, e));
    Ft(o, sn, new v(Ln, s));
    Ft(o, Ms, null == n ? jn : new RenderLocationProvider(n));
    Ft(o, Qi, _n);
    Ft(o, tn, null == r ? Fn : new v(On, r));
    return o;
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
        if (null === t) throw ft(`AUR7055`);
        if (!bt(t.name) || 0 === t.name.length) throw ft(`AUR0756`);
        return t;
    }
}

function qn(t, e, i, s, n, r, o, l) {
    const h = i.container.createChild();
    Ft(h, t.HTMLElement, Ft(h, t.Element, Ft(h, _s, new v("ElementResolver", s))));
    i = i instanceof Controller ? i : i.ctrl;
    Ft(h, ys, new v(Pn, i));
    Ft(h, sn, new v(Ln, n));
    Ft(h, Ms, null == o ? jn : new v($n, o));
    Ft(h, Qi, null == r ? _n : new ViewFactoryProvider(r));
    Ft(h, tn, null == l ? Fn : new v(On, l));
    return {
        vm: h.invoke(e.Type),
        ctn: h
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

const jn = new RenderLocationProvider(null);

const _n = new ViewFactoryProvider(null);

const Fn = new v(On, new AuSlotsInfo(l));

var Mn;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(Mn || (Mn = {}));

function Vn(t) {
    return function(e) {
        return zn.define(t, e);
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
    static create(t, e) {
        let s;
        let n;
        if (bt(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, i(Hn(e, "name"), s), c(Hn(e, "aliases"), n.aliases, e.aliases), Wn(s), i(Hn(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: i, aliases: s} = this;
        Ot(i, e).register(t);
        Ut(i, e).register(t);
        Vt(s, zn, i, t);
    }
}

const Nn = lt("binding-command");

const Wn = t => `${Nn}:${t}`;

const Hn = (t, e) => et(ot(e), t);

const zn = Object.freeze({
    name: Nn,
    keyFrom: Wn,
    define(t, e) {
        const i = BindingCommandDefinition.create(t, e);
        st(Nn, i, i.Type);
        st(Nn, i, i);
        ht(e, Nn);
        return i.Type;
    },
    getAnnotation: Hn
});

let Gn = class OneTimeBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 8), n, 1);
    }
};

Gn = J([ Vn("one-time") ], Gn);

let Xn = class ToViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = t.attr.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 8), n, 2);
    }
};

Xn = J([ Vn("to-view") ], Xn);

let Kn = class FromViewBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 8), n, 4);
    }
};

Kn = J([ Vn("from-view") ], Kn);

let Qn = class TwoWayBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        let n = s.target;
        let r = s.rawValue;
        if (null == t.bindable) n = i.map(t.node, n) ?? x(n); else {
            if ("" === r && 1 === t.def.type) r = x(n);
            n = t.bindable.property;
        }
        return new PropertyBindingInstruction(e.parse(r, 8), n, 6);
    }
};

Qn = J([ Vn("two-way") ], Qn);

let Yn = class DefaultBindingCommand {
    get type() {
        return 0;
    }
    build(t, e, i) {
        const s = t.attr;
        const n = t.bindable;
        let r;
        let o;
        let l = s.target;
        let h = s.rawValue;
        if (null == n) {
            o = i.isTwoWay(t.node, l) ? 6 : 2;
            l = i.map(t.node, l) ?? x(l);
        } else {
            if ("" === h && 1 === t.def.type) h = x(l);
            r = t.def.defaultBindingMode;
            o = 8 === n.mode || null == n.mode ? null == r || 8 === r ? 2 : r : n.mode;
            l = n.property;
        }
        return new PropertyBindingInstruction(e.parse(h, 8), l, o);
    }
};

Yn = J([ Vn("bind") ], Yn);

let Zn = class CallBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(e.parse(t.attr.rawValue, 8 | 4), i);
    }
};

Zn = J([ Vn("call") ], Zn);

let Jn = class ForBindingCommand {
    get type() {
        return 0;
    }
    build(t, e) {
        const i = null === t.bindable ? x(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(e.parse(t.attr.rawValue, 2), i);
    }
};

Jn = J([ Vn("for") ], Jn);

let tr = class TriggerBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, true, 0);
    }
};

tr = J([ Vn("trigger") ], tr);

let er = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 2);
    }
};

er = J([ Vn("delegate") ], er);

let ir = class CaptureBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new ListenerBindingInstruction(e.parse(t.attr.rawValue, 4), t.attr.target, false, 1);
    }
};

ir = J([ Vn("capture") ], ir);

let sr = class AttrBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction(t.attr.target, e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

sr = J([ Vn("attr") ], sr);

let nr = class StyleBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("style", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

nr = J([ Vn("style") ], nr);

let rr = class ClassBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new AttributeBindingInstruction("class", e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

rr = J([ Vn("class") ], rr);

let or = class RefBindingCommand {
    get type() {
        return 1;
    }
    build(t, e) {
        return new RefBindingInstruction(e.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

or = J([ Vn("ref") ], or);

let lr = class SpreadBindingCommand {
    get type() {
        return 1;
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

lr = J([ Vn("...$attrs") ], lr);

const hr = $t("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

const cr = t => {
    const e = ut();
    t = bt(t) ? t.split(" ") : t;
    let i;
    for (i of t) e[i] = true;
    return e;
};

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

class SVGAnalyzer {
    constructor(t) {
        this.oe = Object.assign(ut(), {
            a: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage target transform xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            altGlyph: cr("class dx dy externalResourcesRequired format glyphRef id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            altglyph: ut(),
            altGlyphDef: cr("id xml:base xml:lang xml:space"),
            altglyphdef: ut(),
            altGlyphItem: cr("id xml:base xml:lang xml:space"),
            altglyphitem: ut(),
            animate: cr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateColor: cr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateMotion: cr("accumulate additive begin by calcMode dur end externalResourcesRequired fill from id keyPoints keySplines keyTimes max min onbegin onend onload onrepeat origin path repeatCount repeatDur requiredExtensions requiredFeatures restart rotate systemLanguage to values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            animateTransform: cr("accumulate additive attributeName attributeType begin by calcMode dur end externalResourcesRequired fill from id keySplines keyTimes max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to type values xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            circle: cr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup r requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            clipPath: cr("class clipPathUnits externalResourcesRequired id requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            "color-profile": cr("id local name rendering-intent xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            cursor: cr("externalResourcesRequired id requiredExtensions requiredFeatures systemLanguage x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            defs: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            desc: cr("class id style xml:base xml:lang xml:space"),
            ellipse: cr("class cx cy externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform xml:base xml:lang xml:space"),
            feBlend: cr("class height id in in2 mode result style width x xml:base xml:lang xml:space y"),
            feColorMatrix: cr("class height id in result style type values width x xml:base xml:lang xml:space y"),
            feComponentTransfer: cr("class height id in result style width x xml:base xml:lang xml:space y"),
            feComposite: cr("class height id in in2 k1 k2 k3 k4 operator result style width x xml:base xml:lang xml:space y"),
            feConvolveMatrix: cr("bias class divisor edgeMode height id in kernelMatrix kernelUnitLength order preserveAlpha result style targetX targetY width x xml:base xml:lang xml:space y"),
            feDiffuseLighting: cr("class diffuseConstant height id in kernelUnitLength result style surfaceScale width x xml:base xml:lang xml:space y"),
            feDisplacementMap: cr("class height id in in2 result scale style width x xChannelSelector xml:base xml:lang xml:space y yChannelSelector"),
            feDistantLight: cr("azimuth elevation id xml:base xml:lang xml:space"),
            feFlood: cr("class height id result style width x xml:base xml:lang xml:space y"),
            feFuncA: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncB: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncG: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feFuncR: cr("amplitude exponent id intercept offset slope tableValues type xml:base xml:lang xml:space"),
            feGaussianBlur: cr("class height id in result stdDeviation style width x xml:base xml:lang xml:space y"),
            feImage: cr("class externalResourcesRequired height id preserveAspectRatio result style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            feMerge: cr("class height id result style width x xml:base xml:lang xml:space y"),
            feMergeNode: cr("id xml:base xml:lang xml:space"),
            feMorphology: cr("class height id in operator radius result style width x xml:base xml:lang xml:space y"),
            feOffset: cr("class dx dy height id in result style width x xml:base xml:lang xml:space y"),
            fePointLight: cr("id x xml:base xml:lang xml:space y z"),
            feSpecularLighting: cr("class height id in kernelUnitLength result specularConstant specularExponent style surfaceScale width x xml:base xml:lang xml:space y"),
            feSpotLight: cr("id limitingConeAngle pointsAtX pointsAtY pointsAtZ specularExponent x xml:base xml:lang xml:space y z"),
            feTile: cr("class height id in result style width x xml:base xml:lang xml:space y"),
            feTurbulence: cr("baseFrequency class height id numOctaves result seed stitchTiles style type width x xml:base xml:lang xml:space y"),
            filter: cr("class externalResourcesRequired filterRes filterUnits height id primitiveUnits style width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            font: cr("class externalResourcesRequired horiz-adv-x horiz-origin-x horiz-origin-y id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            "font-face": cr("accent-height alphabetic ascent bbox cap-height descent font-family font-size font-stretch font-style font-variant font-weight hanging id ideographic mathematical overline-position overline-thickness panose-1 slope stemh stemv strikethrough-position strikethrough-thickness underline-position underline-thickness unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical widths x-height xml:base xml:lang xml:space"),
            "font-face-format": cr("id string xml:base xml:lang xml:space"),
            "font-face-name": cr("id name xml:base xml:lang xml:space"),
            "font-face-src": cr("id xml:base xml:lang xml:space"),
            "font-face-uri": cr("id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            foreignObject: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xml:base xml:lang xml:space y"),
            g: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            glyph: cr("arabic-form class d glyph-name horiz-adv-x id lang orientation style unicode vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            glyphRef: cr("class dx dy format glyphRef id style x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            glyphref: ut(),
            hkern: cr("g1 g2 id k u1 u2 xml:base xml:lang xml:space"),
            image: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            line: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform x1 x2 xml:base xml:lang xml:space y1 y2"),
            linearGradient: cr("class externalResourcesRequired gradientTransform gradientUnits id spreadMethod style x1 x2 xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y1 y2"),
            marker: cr("class externalResourcesRequired id markerHeight markerUnits markerWidth orient preserveAspectRatio refX refY style viewBox xml:base xml:lang xml:space"),
            mask: cr("class externalResourcesRequired height id maskContentUnits maskUnits requiredExtensions requiredFeatures style systemLanguage width x xml:base xml:lang xml:space y"),
            metadata: cr("id xml:base xml:lang xml:space"),
            "missing-glyph": cr("class d horiz-adv-x id style vert-adv-y vert-origin-x vert-origin-y xml:base xml:lang xml:space"),
            mpath: cr("externalResourcesRequired id xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            path: cr("class d externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup pathLength requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            pattern: cr("class externalResourcesRequired height id patternContentUnits patternTransform patternUnits preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage viewBox width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            polygon: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            polyline: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup points requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            radialGradient: cr("class cx cy externalResourcesRequired fx fy gradientTransform gradientUnits id r spreadMethod style xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            rect: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rx ry style systemLanguage transform width x xml:base xml:lang xml:space y"),
            script: cr("externalResourcesRequired id type xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            set: cr("attributeName attributeType begin dur end externalResourcesRequired fill id max min onbegin onend onload onrepeat repeatCount repeatDur requiredExtensions requiredFeatures restart systemLanguage to xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space"),
            stop: cr("class id offset style xml:base xml:lang xml:space"),
            style: cr("id media title type xml:base xml:lang xml:space"),
            svg: cr("baseProfile class contentScriptType contentStyleType externalResourcesRequired height id onabort onactivate onclick onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onresize onscroll onunload onzoom preserveAspectRatio requiredExtensions requiredFeatures style systemLanguage version viewBox width x xml:base xml:lang xml:space y zoomAndPan"),
            switch: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform xml:base xml:lang xml:space"),
            symbol: cr("class externalResourcesRequired id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup preserveAspectRatio style viewBox xml:base xml:lang xml:space"),
            text: cr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength transform x xml:base xml:lang xml:space y"),
            textPath: cr("class externalResourcesRequired id lengthAdjust method onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures spacing startOffset style systemLanguage textLength xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space"),
            title: cr("class id style xml:base xml:lang xml:space"),
            tref: cr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xlink:arcrole xlink:href xlink:role xlink:title xlink:type xml:base xml:lang xml:space y"),
            tspan: cr("class dx dy externalResourcesRequired id lengthAdjust onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures rotate style systemLanguage textLength x xml:base xml:lang xml:space y"),
            use: cr("class externalResourcesRequired height id onactivate onclick onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup requiredExtensions requiredFeatures style systemLanguage transform width x xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y"),
            view: cr("externalResourcesRequired id preserveAspectRatio viewBox viewTarget xml:base xml:lang xml:space zoomAndPan"),
            vkern: cr("g1 g2 id k u1 u2 xml:base xml:lang xml:space")
        });
        this.le = cr("a altGlyph animate animateColor circle clipPath defs ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage feMerge feMorphology feOffset feSpecularLighting feTile feTurbulence filter font foreignObject g glyph glyphRef image line linearGradient marker mask missing-glyph path pattern polygon polyline radialGradient rect stop svg switch symbol text textPath tref tspan use");
        this.he = cr("alignment-baseline baseline-shift clip-path clip-rule clip color-interpolation-filters color-interpolation color-profile color-rendering color cursor direction display dominant-baseline enable-background fill-opacity fill-rule fill filter flood-color flood-opacity font-family font-size-adjust font-size font-stretch font-style font-variant font-weight glyph-orientation-horizontal glyph-orientation-vertical image-rendering kerning letter-spacing lighting-color marker-end marker-mid marker-start mask opacity overflow pointer-events shape-rendering stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width stroke text-anchor text-decoration text-rendering unicode-bidi visibility word-spacing writing-mode");
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
        return Ot(hr, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.le[t.nodeName] && true === this.he[e] || true === this.oe[t.nodeName]?.[e];
    }
}

SVGAnalyzer.inject = [ Pi ];

const ar = $t("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.ce = ut();
        this.ae = ut();
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
        return [ hr ];
    }
    useMapping(t) {
        var e;
        let i;
        let s;
        let n;
        let r;
        for (n in t) {
            i = t[n];
            s = (e = this.ce)[n] ?? (e[n] = ut());
            for (r in i) {
                if (void 0 !== s[r]) throw fr(r, n);
                s[r] = i[r];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.ae;
        for (const i in t) {
            if (void 0 !== e[i]) throw fr(i, "*");
            e[i] = t[i];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return ur(t, e) || this.fns.length > 0 && this.fns.some((i => i(t, e)));
    }
    map(t, e) {
        return this.ce[t.nodeName]?.[e] ?? this.ae[e] ?? (gt(t, e, this.svg) ? e : null);
    }
}

function ur(t, e) {
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

function fr(t, e) {
    return ft(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

const dr = $t("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const mr = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ue = t.document.createElement("template");
    }
    createTemplate(t) {
        if (bt(t)) {
            let e = mr[t];
            if (void 0 === e) {
                const i = this.ue;
                i.innerHTML = t;
                const s = i.content.firstElementChild;
                if (null == s || "TEMPLATE" !== s.nodeName || null != s.nextElementSibling) {
                    this.ue = this.p.document.createElement("template");
                    e = i;
                } else {
                    i.content.removeChild(s);
                    e = s;
                }
                mr[t] = e;
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

TemplateElementFactory.inject = [ Pi ];

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return Ot(on, this).register(t);
    }
    compile(t, e, i) {
        const s = CustomElementDefinition.getOrCreate(t);
        if (null === s.template || void 0 === s.template) return s;
        if (false === s.needsCompile) return s;
        i ?? (i = vr);
        const n = new CompilationContext(t, e, i, null, null, void 0);
        const r = bt(s.template) || !t.enhance ? n.fe.createTemplate(s.template) : s.template;
        const o = "TEMPLATE" === r.nodeName && null != r.content;
        const h = o ? r.content : r;
        const c = e.get(Lt(Br));
        const a = c.length;
        let u = 0;
        if (a > 0) while (a > u) {
            c[u].compiling?.(r);
            ++u;
        }
        if (r.hasAttribute(Ar)) throw ft(`AUR0701`);
        this.de(h, n);
        this.me(h, n);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || wi(),
            dependencies: (t.dependencies ?? l).concat(n.deps ?? l),
            instructions: n.rows,
            surrogates: o ? this.ge(r, n) : l,
            template: r,
            hasSlots: n.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, s) {
        const n = new CompilationContext(t, i, vr, null, null, void 0);
        const r = [];
        const o = n.pe(s.nodeName.toLowerCase());
        const l = null !== o;
        const h = n.ep;
        const c = e.length;
        let a = 0;
        let u;
        let f = null;
        let d;
        let m;
        let g;
        let p;
        let v;
        let w = null;
        let b;
        let y;
        let k;
        let C;
        for (;c > a; ++a) {
            u = e[a];
            k = u.target;
            C = u.rawValue;
            w = n.ve(u);
            if (null !== w && (1 & w.type) > 0) {
                br.node = s;
                br.attr = u;
                br.bindable = null;
                br.def = null;
                r.push(w.build(br, n.ep, n.m));
                continue;
            }
            f = n.we(k);
            if (null !== f) {
                if (f.isTemplateController) throw ft(`AUR0703:${k}`);
                g = BindablesInfo.from(f, true);
                y = false === f.noMultiBindings && null === w && gr(C);
                if (y) m = this.be(s, C, f, n); else {
                    v = g.primary;
                    if (null === w) {
                        b = h.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, v.property) : new InterpolationInstruction(b, v.property) ];
                    } else {
                        br.node = s;
                        br.attr = u;
                        br.bindable = v;
                        br.def = f;
                        m = [ w.build(br, n.ep, n.m) ];
                    }
                }
                (d ?? (d = [])).push(new HydrateAttributeInstruction(this.resolveResources ? f : f.name, null != f.aliases && f.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === w) {
                b = h.parse(C, 1);
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        b = h.parse(C, 1);
                        r.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(C, p.property) : new InterpolationInstruction(b, p.property)));
                        continue;
                    }
                }
                if (null != b) r.push(new InterpolationInstruction(b, n.m.map(s, k) ?? x(k))); else switch (k) {
                  case "class":
                    r.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    r.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    r.push(new SetAttributeInstruction(C, k));
                }
            } else {
                if (l) {
                    g = BindablesInfo.from(o, false);
                    p = g.attrs[k];
                    if (void 0 !== p) {
                        br.node = s;
                        br.attr = u;
                        br.bindable = p;
                        br.def = o;
                        r.push(new SpreadElementPropBindingInstruction(w.build(br, n.ep, n.m)));
                        continue;
                    }
                }
                br.node = s;
                br.attr = u;
                br.bindable = null;
                br.def = null;
                r.push(w.build(br, n.ep, n.m));
            }
        }
        pr();
        if (null != d) return d.concat(r);
        return r;
    }
    ge(t, e) {
        const i = [];
        const s = t.attributes;
        const n = e.ep;
        let r = s.length;
        let o = 0;
        let l;
        let h;
        let c;
        let a;
        let u = null;
        let f;
        let d;
        let m;
        let g;
        let p = null;
        let v;
        let w;
        let b;
        let y;
        for (;r > o; ++o) {
            l = s[o];
            h = l.name;
            c = l.value;
            a = e.xe.parse(h, c);
            b = a.target;
            y = a.rawValue;
            if (xr[b]) throw ft(`AUR0702:${h}`);
            p = e.ve(a);
            if (null !== p && (1 & p.type) > 0) {
                br.node = t;
                br.attr = a;
                br.bindable = null;
                br.def = null;
                i.push(p.build(br, e.ep, e.m));
                continue;
            }
            u = e.we(b);
            if (null !== u) {
                if (u.isTemplateController) throw ft(`AUR0703:${b}`);
                m = BindablesInfo.from(u, true);
                w = false === u.noMultiBindings && null === p && gr(y);
                if (w) d = this.be(t, y, u, e); else {
                    g = m.primary;
                    if (null === p) {
                        v = n.parse(y, 1);
                        d = [ null === v ? new SetPropertyInstruction(y, g.property) : new InterpolationInstruction(v, g.property) ];
                    } else {
                        br.node = t;
                        br.attr = a;
                        br.bindable = g;
                        br.def = u;
                        d = [ p.build(br, e.ep, e.m) ];
                    }
                }
                t.removeAttribute(h);
                --o;
                --r;
                (f ?? (f = [])).push(new HydrateAttributeInstruction(this.resolveResources ? u : u.name, null != u.aliases && u.aliases.includes(b) ? b : void 0, d));
                continue;
            }
            if (null === p) {
                v = n.parse(y, 1);
                if (null != v) {
                    t.removeAttribute(h);
                    --o;
                    --r;
                    i.push(new InterpolationInstruction(v, e.m.map(t, b) ?? x(b)));
                } else switch (h) {
                  case "class":
                    i.push(new SetClassAttributeInstruction(y));
                    break;

                  case "style":
                    i.push(new SetStyleAttributeInstruction(y));
                    break;

                  default:
                    i.push(new SetAttributeInstruction(y, h));
                }
            } else {
                br.node = t;
                br.attr = a;
                br.bindable = null;
                br.def = null;
                i.push(p.build(br, e.ep, e.m));
            }
        }
        pr();
        if (null != f) return f.concat(i);
        return i;
    }
    me(t, e) {
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
                let i = t.firstChild;
                while (null !== i) i = this.me(i, e);
                break;
            }
        }
        return t.nextSibling;
    }
    ye(t, e) {
        const i = t.attributes;
        const s = i.length;
        const n = [];
        const r = e.ep;
        let o = false;
        let l = 0;
        let h;
        let c;
        let a;
        let u;
        let f;
        let d;
        let m;
        let g;
        for (;s > l; ++l) {
            h = i[l];
            a = h.name;
            u = h.value;
            if ("to-binding-context" === a) {
                o = true;
                continue;
            }
            c = e.xe.parse(a, u);
            d = c.target;
            m = c.rawValue;
            f = e.ve(c);
            if (null !== f) {
                if ("bind" === c.command) n.push(new LetBindingInstruction(r.parse(m, 8), x(d))); else throw ft(`AUR0704:${c.command}`);
                continue;
            }
            g = r.parse(m, 1);
            n.push(new LetBindingInstruction(null === g ? new M(m) : g, x(d)));
        }
        e.rows.push([ new HydrateLetElementInstruction(n, o) ]);
        return this.Ae(t).nextSibling;
    }
    ke(t, e) {
        var i, s, r, o;
        const h = t.nextSibling;
        const c = (t.getAttribute("as-element") ?? t.nodeName).toLowerCase();
        const a = e.pe(c);
        const u = null !== a;
        const f = u && null != a.shadowOptions;
        const d = a?.capture;
        const m = null != d && "boolean" !== typeof d;
        const g = d ? [] : l;
        const p = e.ep;
        const v = this.debug ? n : () => {
            t.removeAttribute(A);
            --k;
            --y;
        };
        let w = t.attributes;
        let b;
        let y = w.length;
        let k = 0;
        let C;
        let A;
        let R;
        let S;
        let B;
        let I;
        let T = null;
        let D = false;
        let E;
        let P;
        let L;
        let $;
        let O;
        let U;
        let q;
        let j = null;
        let _;
        let F;
        let M;
        let V;
        let N = true;
        let W = false;
        let H = false;
        if ("slot" === c) {
            if (null == e.root.def.shadowOptions) throw ft(`AUR0717:${e.root.def.name}`);
            e.root.hasSlot = true;
        }
        if (u) {
            N = a.processContent?.call(a.Type, t, e.p);
            w = t.attributes;
            y = w.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw ft(`AUR0705`);
        for (;y > k; ++k) {
            C = w[k];
            A = C.name;
            R = C.value;
            switch (A) {
              case "as-element":
              case "containerless":
                v();
                if (!W) W = "containerless" === A;
                continue;
            }
            S = e.xe.parse(A, R);
            j = e.ve(S);
            M = S.target;
            V = S.rawValue;
            if (d && (!m || m && d(M))) {
                if (null != j && 1 & j.type) {
                    v();
                    g.push(S);
                    continue;
                }
                H = "au-slot" !== M && "slot" !== M;
                if (H) {
                    _ = BindablesInfo.from(a, false);
                    if (null == _.attrs[M] && !e.we(M)?.isTemplateController) {
                        v();
                        g.push(S);
                        continue;
                    }
                }
            }
            if (null !== j && 1 & j.type) {
                br.node = t;
                br.attr = S;
                br.bindable = null;
                br.def = null;
                (B ?? (B = [])).push(j.build(br, e.ep, e.m));
                v();
                continue;
            }
            T = e.we(M);
            if (null !== T) {
                _ = BindablesInfo.from(T, true);
                D = false === T.noMultiBindings && null === j && gr(V);
                if (D) L = this.be(t, V, T, e); else {
                    F = _.primary;
                    if (null === j) {
                        U = p.parse(V, 1);
                        L = [ null === U ? new SetPropertyInstruction(V, F.property) : new InterpolationInstruction(U, F.property) ];
                    } else {
                        br.node = t;
                        br.attr = S;
                        br.bindable = F;
                        br.def = T;
                        L = [ j.build(br, e.ep, e.m) ];
                    }
                }
                v();
                if (T.isTemplateController) ($ ?? ($ = [])).push(new HydrateTemplateController(wr, this.resolveResources ? T : T.name, void 0, L)); else (P ?? (P = [])).push(new HydrateAttributeInstruction(this.resolveResources ? T : T.name, null != T.aliases && T.aliases.includes(M) ? M : void 0, L));
                continue;
            }
            if (null === j) {
                if (u) {
                    _ = BindablesInfo.from(a, false);
                    E = _.attrs[M];
                    if (void 0 !== E) {
                        U = p.parse(V, 1);
                        (I ?? (I = [])).push(null == U ? new SetPropertyInstruction(V, E.property) : new InterpolationInstruction(U, E.property));
                        v();
                        continue;
                    }
                }
                U = p.parse(V, 1);
                if (null != U) {
                    v();
                    (B ?? (B = [])).push(new InterpolationInstruction(U, e.m.map(t, M) ?? x(M)));
                }
                continue;
            }
            v();
            if (u) {
                _ = BindablesInfo.from(a, false);
                E = _.attrs[M];
                if (void 0 !== E) {
                    br.node = t;
                    br.attr = S;
                    br.bindable = E;
                    br.def = a;
                    (I ?? (I = [])).push(j.build(br, e.ep, e.m));
                    continue;
                }
            }
            br.node = t;
            br.attr = S;
            br.bindable = null;
            br.def = null;
            (B ?? (B = [])).push(j.build(br, e.ep, e.m));
        }
        pr();
        if (this.Re(t) && null != B && B.length > 1) this.Se(t, B);
        if (u) {
            q = new HydrateElementInstruction(this.resolveResources ? a : a.name, void 0, I ?? l, null, W, g);
            if (c === Lr) {
                const i = t.getAttribute("name") || Pr;
                const s = e.h("template");
                const n = e.Be();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else s.content.appendChild(r);
                    r = t.firstChild;
                }
                this.me(s.content, n);
                q.auSlot = {
                    name: i,
                    fallback: CustomElementDefinition.create({
                        name: wi(),
                        template: s,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.Ie(t, e);
            }
        }
        if (null != B || null != q || null != P) {
            b = l.concat(q ?? l, P ?? l, B ?? l);
            this.Ae(t);
        }
        let z;
        if (null != $) {
            y = $.length - 1;
            k = y;
            O = $[k];
            let n;
            this.Ie(t, e);
            if ("TEMPLATE" === t.nodeName) n = t; else {
                n = e.h("template");
                n.content.appendChild(t);
            }
            const r = n;
            const o = e.Be(null == b ? [] : [ b ]);
            let l;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v;
            let w;
            let x = 0, C = 0;
            let A = t.firstChild;
            let R = false;
            if (false !== N) while (null !== A) {
                h = 1 === A.nodeType ? A.getAttribute(Lr) : null;
                if (null !== h) A.removeAttribute(Lr);
                if (u) {
                    l = A.nextSibling;
                    if (!f) {
                        R = 3 === A.nodeType && "" === A.textContent.trim();
                        if (!R) ((i = m ?? (m = {}))[s = h || Pr] ?? (i[s] = [])).push(A);
                        t.removeChild(A);
                    }
                    A = l;
                } else {
                    if (null !== h) {
                        h = h || Pr;
                        throw ft(`AUR0706:${c}[${h}]`);
                    }
                    A = A.nextSibling;
                }
            }
            if (null != m) {
                d = {};
                for (h in m) {
                    n = e.h("template");
                    g = m[h];
                    for (x = 0, C = g.length; C > x; ++x) {
                        p = g[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) n.content.appendChild(p); else n.content.appendChild(p.content); else n.content.appendChild(p);
                    }
                    w = e.Be();
                    this.me(n.content, w);
                    d[h] = CustomElementDefinition.create({
                        name: wi(),
                        template: n,
                        instructions: w.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = d;
            }
            if (u && (W || a.containerless)) this.Ie(t, e);
            z = !u || !a.containerless && !W && false !== N;
            if (z) if ("TEMPLATE" === t.nodeName) this.me(t.content, o); else {
                A = t.firstChild;
                while (null !== A) A = this.me(A, o);
            }
            O.def = CustomElementDefinition.create({
                name: wi(),
                template: r,
                instructions: o.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (k-- > 0) {
                O = $[k];
                n = e.h("template");
                v = e.h("au-m");
                v.classList.add("au");
                n.content.appendChild(v);
                O.def = CustomElementDefinition.create({
                    name: wi(),
                    template: n,
                    needsCompile: false,
                    instructions: [ [ $[k + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ O ]);
        } else {
            if (null != b) e.rows.push(b);
            let i = t.firstChild;
            let s;
            let n;
            let l = null;
            let h;
            let d;
            let m;
            let g;
            let p;
            let v = false;
            let w = 0, x = 0;
            if (false !== N) while (null !== i) {
                n = 1 === i.nodeType ? i.getAttribute(Lr) : null;
                if (null !== n) i.removeAttribute(Lr);
                if (u) {
                    s = i.nextSibling;
                    if (!f) {
                        v = 3 === i.nodeType && "" === i.textContent.trim();
                        if (!v) ((r = h ?? (h = {}))[o = n || Pr] ?? (r[o] = [])).push(i);
                        t.removeChild(i);
                    }
                    i = s;
                } else {
                    if (null !== n) {
                        n = n || Pr;
                        throw ft(`AUR0706:${c}[${n}]`);
                    }
                    i = i.nextSibling;
                }
            }
            if (null != h) {
                l = {};
                for (n in h) {
                    g = e.h("template");
                    d = h[n];
                    for (w = 0, x = d.length; x > w; ++w) {
                        m = d[w];
                        if ("TEMPLATE" === m.nodeName) if (m.attributes.length > 0) g.content.appendChild(m); else g.content.appendChild(m.content); else g.content.appendChild(m);
                    }
                    p = e.Be();
                    this.me(g.content, p);
                    l[n] = CustomElementDefinition.create({
                        name: wi(),
                        template: g,
                        instructions: p.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = l;
            }
            if (u && (W || a.containerless)) this.Ie(t, e);
            z = !u || !a.containerless && !W && false !== N;
            if (z && t.childNodes.length > 0) {
                i = t.firstChild;
                while (null !== i) i = this.me(i, e);
            }
        }
        return h;
    }
    Ce(t, e) {
        let i = "";
        let s = t;
        while (null !== s && 3 === s.nodeType) {
            i += s.textContent;
            s = s.nextSibling;
        }
        const n = e.ep.parse(i, 1);
        if (null === n) return s;
        const r = t.parentNode;
        r.insertBefore(this.Ae(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        s = t.nextSibling;
        while (null !== s && 3 === s.nodeType) {
            r.removeChild(s);
            s = t.nextSibling;
        }
        return t.nextSibling;
    }
    be(t, e, i, s) {
        const n = BindablesInfo.from(i, true);
        const r = e.length;
        const o = [];
        let l;
        let h;
        let c = 0;
        let a = 0;
        let u;
        let f;
        let d;
        let m;
        for (let g = 0; g < r; ++g) {
            a = e.charCodeAt(g);
            if (92 === a) ++g; else if (58 === a) {
                l = e.slice(c, g);
                while (e.charCodeAt(++g) <= 32) ;
                c = g;
                for (;g < r; ++g) {
                    a = e.charCodeAt(g);
                    if (92 === a) ++g; else if (59 === a) {
                        h = e.slice(c, g);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(c);
                f = s.xe.parse(l, h);
                d = s.ve(f);
                m = n.attrs[f.target];
                if (null == m) throw ft(`AUR0707:${i.name}.${f.target}`);
                if (null === d) {
                    u = s.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, m.property) : new InterpolationInstruction(u, m.property));
                } else {
                    br.node = t;
                    br.attr = f;
                    br.bindable = m;
                    br.def = i;
                    o.push(d.build(br, s.ep, s.m));
                }
                while (g < r && e.charCodeAt(++g) <= 32) ;
                c = g;
                l = void 0;
                h = void 0;
            }
        }
        pr();
        return o;
    }
    de(t, e) {
        const i = t;
        const s = y(i.querySelectorAll("template[as-custom-element]"));
        const n = s.length;
        if (0 === n) return;
        if (n === i.childElementCount) throw ft(`AUR0708`);
        const r = new Set;
        const o = [];
        for (const t of s) {
            if (t.parentNode !== i) throw ft(`AUR0709`);
            const s = Rr(t, r);
            const n = class LocalTemplate {};
            const l = t.content;
            const h = y(l.querySelectorAll("bindable"));
            const c = Bt.for(n);
            const a = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw ft(`AUR0710`);
                const e = t.getAttribute("property");
                if (null === e) throw ft(`AUR0711`);
                const i = t.getAttribute("attribute");
                if (null !== i && u.has(i) || a.has(e)) throw ft(`AUR0712:${e}+${i}`); else {
                    if (null !== i) u.add(i);
                    a.add(e);
                }
                c.add({
                    property: e,
                    attribute: i ?? void 0,
                    mode: Sr(t)
                });
                const s = t.getAttributeNames().filter((t => !Cr.includes(t)));
                if (s.length > 0) ;
                l.removeChild(t);
            }
            o.push(n);
            e.Te(xi({
                name: s,
                template: t
            }, n));
            i.removeChild(t);
        }
        let h = 0;
        const c = o.length;
        for (;c > h; ++h) Ai(o[h]).dependencies.push(...e.def.dependencies ?? l, ...e.deps ?? l);
    }
    Re(t) {
        return "INPUT" === t.nodeName && 1 === yr[t.type];
    }
    Se(t, e) {
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
    Ae(t) {
        t.classList.add("au");
        return t;
    }
    Ie(t, e) {
        const i = t.parentNode;
        const s = e.h("au-m");
        this.Ae(i.insertBefore(s, t));
        i.removeChild(t);
        return s;
    }
}

class CompilationContext {
    constructor(t, e, i, s, n, r) {
        this.hasSlot = false;
        this.De = ut();
        const o = null !== s;
        this.c = e;
        this.root = null === n ? this : n;
        this.def = t;
        this.ci = i;
        this.parent = s;
        this.fe = o ? s.fe : e.get(dr);
        this.xe = o ? s.xe : e.get(Gt);
        this.ep = o ? s.ep : e.get(_);
        this.m = o ? s.m : e.get(ar);
        this.Ee = o ? s.Ee : e.get(k);
        this.p = o ? s.p : e.get(Pi);
        this.localEls = o ? s.localEls : new Set;
        this.rows = r ?? [];
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
    pe(t) {
        return this.c.find(Bi, t);
    }
    we(t) {
        return this.c.find(Je, t);
    }
    Be(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ve(t) {
        if (this.root !== this) return this.root.ve(t);
        const e = t.command;
        if (null === e) return null;
        let i = this.De[e];
        if (void 0 === i) {
            i = this.c.create(zn, e);
            if (null === i) throw ft(`AUR0713:${e}`);
            this.De[e] = i;
        }
        return i;
    }
}

function gr(t) {
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

function pr() {
    br.node = br.attr = br.bindable = br.def = null;
}

const vr = {
    projections: null
};

const wr = {
    name: "unnamed"
};

const br = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const xr = Object.assign(ut(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const yr = {
    checkbox: 1,
    radio: 1
};

const kr = new WeakMap;

class BindablesInfo {
    constructor(t, e, i) {
        this.attrs = t;
        this.bindables = e;
        this.primary = i;
    }
    static from(t, e) {
        let i = kr.get(t);
        if (null == i) {
            const s = t.bindables;
            const n = ut();
            const r = e ? void 0 === t.defaultBindingMode ? 8 : t.defaultBindingMode : 8;
            let o;
            let l;
            let h = false;
            let c;
            let a;
            for (l in s) {
                o = s[l];
                a = o.attribute;
                if (true === o.primary) {
                    if (h) throw ft(`AUR0714:${t.name}`);
                    h = true;
                    c = o;
                } else if (!h && null == c) c = o;
                n[a] = BindableDefinition.create(l, t.Type, o);
            }
            if (null == o && e) c = n.value = BindableDefinition.create("value", t.Type, {
                mode: r
            });
            kr.set(t, i = new BindablesInfo(n, s, c));
        }
        return i;
    }
}

const Cr = Object.freeze([ "property", "attribute", "mode" ]);

const Ar = "as-custom-element";

function Rr(t, e) {
    const i = t.getAttribute(Ar);
    if (null === i || "" === i) throw ft(`AUR0715`);
    if (e.has(i)) throw ft(`AUR0716:${i}`); else {
        e.add(i);
        t.removeAttribute(Ar);
    }
    return i;
}

function Sr(t) {
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

const Br = $t("ITemplateCompilerHooks");

const Ir = new WeakMap;

const Tr = lt("compiler-hooks");

const Dr = Object.freeze({
    name: Tr,
    define(t) {
        let e = Ir.get(t);
        if (void 0 === e) {
            Ir.set(t, e = new TemplateCompilerHooksDefinition(t));
            st(Tr, e, t);
            ht(t, Tr);
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
        t.register(Ot(Br, this.Type));
    }
}

const Er = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Dr.define(t);
    }
};

const Pr = "default";

const Lr = "au-slot";

const $r = new Map;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
    }
    bind(t, e) {
        $r.set(e, e.mode);
        e.mode = this.mode;
    }
    unbind(t, e) {
        e.mode = $r.get(e);
        $r.delete(e);
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

ne("oneTime")(OneTimeBindingBehavior);

ne("toView")(ToViewBindingBehavior);

ne("fromView")(FromViewBindingBehavior);

ne("twoWay")(TwoWayBindingBehavior);

const Or = new WeakMap;

const Ur = 200;

class DebounceBindingBehavior {
    constructor(t) {
        this.p = t;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "debounce",
            delay: i > 0 ? i : Ur,
            now: this.p.performanceNow,
            queue: this.p.taskQueue
        };
        const n = e.limit?.(s);
        if (null == n) ; else Or.set(e, n);
    }
    unbind(t, e) {
        Or.get(e)?.dispose();
        Or.delete(e);
    }
}

DebounceBindingBehavior.inject = [ m ];

ne("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.te = new Map;
        this.Pe = t;
    }
    bind(t, e, ...i) {
        if (!("handleChange" in e)) throw ft(`AUR0817`);
        if (0 === i.length) throw ft(`AUR0818`);
        this.te.set(e, i);
        let s;
        for (s of i) this.Pe.addSignalListener(s, e);
    }
    unbind(t, e) {
        const i = this.te.get(e);
        this.te.delete(e);
        let s;
        for (s of i) this.Pe.removeSignalListener(s, e);
    }
}

SignalBindingBehavior.inject = [ V ];

ne("signal")(SignalBindingBehavior);

const qr = new WeakMap;

const jr = 200;

class ThrottleBindingBehavior {
    constructor(t) {
        this.Le = t.performanceNow;
        this.Y = t.taskQueue;
    }
    bind(t, e, i) {
        i = Number(i);
        const s = {
            type: "throttle",
            delay: i > 0 ? i : jr,
            now: this.Le,
            queue: this.Y
        };
        const n = e.limit?.(s);
        if (null == n) ; else qr.set(e, n);
    }
    unbind(t, e) {
        qr.get(e)?.dispose();
        qr.delete(e);
    }
}

ThrottleBindingBehavior.inject = [ m ];

ne("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttribute(i); else e.setAttribute(i, t);
    }
}

const _r = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e) {
        e.targetObserver = _r;
    }
    unbind(t, e) {
        return;
    }
}

ne("attr")(AttrBindingBehavior);

function Fr(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e) {
        if (!e.callSource || !e.targetEvent) throw ft(`AUR0801`);
        e.selfEventCallSource = e.callSource;
        e.callSource = Fr;
    }
    unbind(t, e) {
        e.callSource = e.selfEventCallSource;
        e.selfEventCallSource = null;
    }
}

ne("self")(SelfBindingBehavior);

const Mr = ut();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        return Mr[t] ?? (Mr[t] = new AttributeNSAccessor(t));
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, i) {
        if (null == t) e.removeAttributeNS(this.ns, i); else e.setAttributeNS(this.ns, i, t);
    }
}

function Vr(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, i, s) {
        this.handler = i;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.$e = void 0;
        this.Oe = void 0;
        this.o = t;
        this.oL = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        const e = this.v;
        if (t === e) return;
        this.v = t;
        this.ov = e;
        this.Ue();
        this.qe();
        this.X();
    }
    handleCollectionChange() {
        this.qe();
    }
    handleChange(t, e) {
        this.qe();
    }
    qe() {
        const t = this.v;
        const e = this.o;
        const i = dt.call(e, "model") ? e.model : e.value;
        const s = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : Vr;
        if (s) e.checked = !!n(t, i); else if (true === t) e.checked = true; else {
            let s = false;
            if (vt(t)) s = -1 !== t.findIndex((t => !!n(t, i))); else if (t instanceof Set) {
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
        const i = dt.call(e, "model") ? e.model : e.value;
        const s = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : Vr;
        if ("checkbox" === e.type) {
            if (vt(t)) {
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
        this.X();
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Ue();
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
        Nr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Nr);
    }
    Ue() {
        const t = this.o;
        (this.Oe ?? (this.Oe = t.$observers?.model ?? t.$observers?.value))?.subscribe(this);
        this.$e?.unsubscribe(this);
        this.$e = void 0;
        if ("checkbox" === t.type) (this.$e = eo(this.v, this.oL))?.subscribe(this);
    }
}

I(CheckedObserver);

let Nr;

const Wr = {
    childList: true,
    subtree: true,
    characterData: true
};

function Hr(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, i, s) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.N = false;
        this.je = void 0;
        this._e = void 0;
        this.iO = false;
        this.o = t;
        this.oL = s;
        this.handler = i;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? zr(this.o.options) : this.o.value;
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
        const i = vt(t);
        const s = e.matcher ?? Hr;
        const n = e.options;
        let r = n.length;
        while (r-- > 0) {
            const e = n[r];
            const o = dt.call(e, "model") ? e.model : e.value;
            if (i) {
                e.selected = -1 !== t.findIndex((t => !!s(o, t)));
                continue;
            }
            e.selected = !!s(o, t);
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
            const o = t.matcher || Hr;
            const l = [];
            while (n < i) {
                r = e[n];
                if (r.selected) l.push(dt.call(r, "model") ? r.model : r.value);
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
                r = dt.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Me() {
        (this._e = new this.o.ownerDocument.defaultView.MutationObserver(this.Ve.bind(this))).observe(this.o, Wr);
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
            if (!this.o.multiple) throw ft(`AUR0654`);
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
        Gr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Gr);
    }
}

I(SelectValueObserver);

function zr(t) {
    const e = [];
    if (0 === t.length) return e;
    const i = t.length;
    let s = 0;
    let n;
    while (i > s) {
        n = t[s];
        if (n.selected) e[e.length] = dt.call(n, "model") ? n.model : n.value;
        ++s;
    }
    return e;
}

let Gr;

const Xr = "--";

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
    He(t) {
        let e;
        let i;
        const n = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (bt(e)) {
                if (i.startsWith(Xr)) {
                    n.push([ i, e ]);
                    continue;
                }
                n.push([ s(i), e ]);
                continue;
            }
            n.push(...this.ze(e));
        }
        return n;
    }
    Ge(t) {
        const e = t.length;
        if (e > 0) {
            const i = [];
            let s = 0;
            for (;e > s; ++s) i.push(...this.ze(t[s]));
            return i;
        }
        return l;
    }
    ze(t) {
        if (bt(t)) return this.We(t);
        if (t instanceof Array) return this.Ge(t);
        if (t instanceof Object) return this.He(t);
        return l;
    }
    G() {
        if (this.N) {
            this.N = false;
            const t = this.value;
            const e = this.styles;
            const i = this.ze(t);
            let s;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const c = i.length;
            for (;h < c; ++h) {
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
                if (!dt.call(e, s) || e[s] !== n) continue;
                this.obj.style.removeProperty(s);
            }
        }
    }
    setProperty(t, e) {
        let i = "";
        if (null != e && wt(e.indexOf) && e.includes("!important")) {
            i = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, i);
    }
    bind() {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, e, i) {
        this.handler = i;
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
        Kr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Kr);
    }
}

I(ValueAttributeObserver);

let Kr;

const Qr = "http://www.w3.org/1999/xlink";

const Yr = "http://www.w3.org/XML/1998/namespace";

const Zr = "http://www.w3.org/2000/xmlns/";

const Jr = Object.assign(ut(), {
    "xlink:actuate": [ "actuate", Qr ],
    "xlink:arcrole": [ "arcrole", Qr ],
    "xlink:href": [ "href", Qr ],
    "xlink:role": [ "role", Qr ],
    "xlink:show": [ "show", Qr ],
    "xlink:title": [ "title", Qr ],
    "xlink:type": [ "type", Qr ],
    "xml:lang": [ "lang", Yr ],
    "xml:space": [ "space", Yr ],
    xmlns: [ "xmlns", Zr ],
    "xmlns:xlink": [ "xlink", Zr ]
});

const to = new N;

to.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        this.type = t.type ?? ValueAttributeObserver;
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
        this.Xe = ut();
        this.Ke = ut();
        this.Qe = ut();
        this.Ye = ut();
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
        Ut(W, NodeObserverLocator).register(t);
        Ot(W, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, i) {
        const s = this.Xe;
        let n;
        if (bt(t)) {
            n = s[t] ?? (s[t] = ut());
            if (null == n[e]) n[e] = new NodeObserverConfig(i); else io(t, e);
        } else for (const i in t) {
            n = s[i] ?? (s[i] = ut());
            const r = t[i];
            for (e in r) if (null == n[e]) n[e] = new NodeObserverConfig(r[e]); else io(i, e);
        }
    }
    useConfigGlobal(t, e) {
        const i = this.Ke;
        if ("object" === typeof t) for (const e in t) if (null == i[e]) i[e] = new NodeObserverConfig(t[e]); else io("*", e); else if (null == i[t]) i[t] = new NodeObserverConfig(e); else io("*", t);
    }
    getAccessor(t, e, i) {
        if (e in this.Ye || e in (this.Qe[t.tagName] ?? C)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
          case "minLength":
          case "maxLength":
          case "placeholder":
          case "size":
          case "pattern":
          case "title":
            return _r;

          default:
            {
                const i = Jr[e];
                if (void 0 !== i) return AttributeNSAccessor.forNs(i[1]);
                if (gt(t, e, this.svgAnalyzer)) return _r;
                return to;
            }
        }
    }
    overrideAccessor(t, e) {
        var i, s;
        let n;
        if (bt(t)) {
            n = (i = this.Qe)[t] ?? (i[t] = ut());
            n[e] = true;
        } else for (const e in t) for (const i of t[e]) {
            n = (s = this.Qe)[e] ?? (s[e] = ut());
            n[i] = true;
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
        const s = this.Xe[t.tagName]?.[e] ?? this.Ke[e];
        if (null != s) return new s.type(t, e, new EventSubscriber(s), i, this.locator);
        const n = Jr[e];
        if (void 0 !== n) return AttributeNSAccessor.forNs(n[1]);
        if (gt(t, e, this.svgAnalyzer)) return _r;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw ft(`AUR0652:${String(e)}`);
        } else return new H(t, e);
    }
}

NodeObserverLocator.inject = [ A, Pi, z, hr ];

function eo(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function io(t, e) {
    throw ft(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, ...i) {
        if (0 === i.length) throw ft(`AUR0802`);
        if (6 !== e.mode && 4 !== e.mode) throw ft(`AUR0803`);
        const s = this.oL.getObserver(e.target, e.targetProperty);
        if (!s.handler) throw ft(`AUR0804`);
        e.targetObserver = s;
        const n = s.handler;
        s.originalHandler = n;
        s.handler = new EventSubscriber(new NodeObserverConfig({
            default: n.config.default,
            events: i,
            readonly: n.config.readonly
        }));
    }
    unbind(t, e) {
        e.targetObserver.handler.dispose();
        e.targetObserver.handler = e.targetObserver.originalHandler;
        e.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ j ];

ne("updateTrigger")(UpdateTriggerBindingBehavior);

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
        if (this.$controller.isActive) this.ti(); else this.Ze = true;
    }
    attached() {
        if (this.Ze) {
            this.Ze = false;
            this.ti();
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
        if ("focus" === t.type) this.value = true; else if (!this.ei) this.value = false;
    }
    ti() {
        const t = this.Je;
        const e = this.ei;
        const i = this.value;
        if (i && !e) t.focus(); else if (!i && e) t.blur();
    }
    get ei() {
        return this.Je === this.p.document.activeElement;
    }
}

Focus.inject = [ _s, Pi ];

J([ At({
    mode: 6
}) ], Focus.prototype, "value", void 0);

We("focus")(Focus);

let so = class Show {
    constructor(t, e, i) {
        this.el = t;
        this.p = e;
        this.ii = false;
        this.si = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.si = null;
            if (Boolean(this.value) !== this.ni) if (this.ni === this.ri) {
                this.ni = !this.ri;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.ni = this.ri;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.ni = this.ri = "hide" !== i.alias;
    }
    binding() {
        this.ii = true;
        this.update();
    }
    detaching() {
        this.ii = false;
        this.si?.cancel();
        this.si = null;
    }
    valueChanged() {
        if (this.ii && null === this.si) this.si = this.p.domWriteQueue.queueTask(this.update);
    }
};

J([ At ], so.prototype, "value", void 0);

so = J([ tt(0, _s), tt(1, Pi), tt(2, sn) ], so);

Mt("hide")(so);

We("show")(so);

class Portal {
    constructor(t, e, i) {
        this.strict = false;
        this.p = i;
        this.oi = i.document.createElement("div");
        this.view = t.create();
        Ws(this.view.nodes, e);
    }
    attaching(t, e, i) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const s = this.oi = this.li();
        this.view.setHost(s);
        return this.hi(t, s, i);
    }
    detaching(t, e, i) {
        return this.ai(t, this.oi, i);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.oi;
        const i = this.oi = this.li();
        if (e === i) return;
        this.view.setHost(i);
        const s = b(this.ai(null, i, t.flags), (() => this.hi(null, i, t.flags)));
        if (pt(s)) s.catch((t => {
            throw t;
        }));
    }
    hi(t, e, i) {
        const {activating: s, callbackContext: n, view: r} = this;
        r.setHost(e);
        return b(s?.call(n, e, r), (() => this.ui(t, e, i)));
    }
    ui(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.appendTo(e); else return b(n.activate(t ?? n, s, i, s.scope), (() => this.fi(e)));
        return this.fi(e);
    }
    fi(t) {
        const {activated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    ai(t, e, i) {
        const {deactivating: s, callbackContext: n, view: r} = this;
        return b(s?.call(n, e, r), (() => this.di(t, e, i)));
    }
    di(t, e, i) {
        const {$controller: s, view: n} = this;
        if (null === t) n.nodes.remove(); else return b(n.deactivate(t, s, i), (() => this.mi(e)));
        return this.mi(e);
    }
    mi(t) {
        const {deactivated: e, callbackContext: i, view: s} = this;
        return e?.call(i, t, s);
    }
    li() {
        const t = this.p;
        const e = t.document;
        let i = this.target;
        let s = this.renderContext;
        if ("" === i) {
            if (this.strict) throw ft(`AUR0811`);
            return e.body;
        }
        if (bt(i)) {
            let n = e;
            if (bt(s)) s = e.querySelector(s);
            if (s instanceof t.Node) n = s;
            i = n.querySelector(i);
        }
        if (i instanceof t.Node) return i;
        if (null == i) {
            if (this.strict) throw ft(`AUR0812`);
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
        if (true === this.view?.accept(t)) return true;
    }
}

Portal.inject = [ Qi, Ms, Pi ];

J([ At({
    primary: true
}) ], Portal.prototype, "target", void 0);

J([ At({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

J([ At() ], Portal.prototype, "strict", void 0);

J([ At() ], Portal.prototype, "deactivating", void 0);

J([ At() ], Portal.prototype, "activating", void 0);

J([ At() ], Portal.prototype, "deactivated", void 0);

J([ At() ], Portal.prototype, "activated", void 0);

J([ At() ], Portal.prototype, "callbackContext", void 0);

He("portal")(Portal);

class If {
    constructor(t, e) {
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.gi = false;
        this.pi = 0;
        this.vi = t;
        this.l = e;
    }
    attaching(t, e, i) {
        let s;
        const n = this.$controller;
        const r = this.pi++;
        const o = () => !this.gi && this.pi === r + 1;
        return b(this.pending, (() => {
            if (!o()) return;
            this.pending = void 0;
            if (this.value) s = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.vi.create(); else s = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == s) return;
            s.setLocation(this.l);
            this.pending = b(s.activate(t, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.gi = true;
        return b(this.pending, (() => {
            this.gi = false;
            this.pending = void 0;
            void this.view?.deactivate(t, this.$controller, i);
        }));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        t = !!t;
        e = !!e;
        if (t === e) return;
        const s = this.view;
        const n = this.$controller;
        const r = this.pi++;
        const o = () => !this.gi && this.pi === r + 1;
        let l;
        return b(this.pending, (() => this.pending = b(s?.deactivate(s, n, i), (() => {
            if (!o()) return;
            if (t) l = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.vi.create(); else l = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : this.elseFactory?.create();
            if (null == l) return;
            l.setLocation(this.l);
            return b(l.activate(l, n, i, n.scope), (() => {
                if (o()) this.pending = void 0;
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

If.inject = [ Qi, Ms ];

J([ At ], If.prototype, "value", void 0);

J([ At({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

He("if")(If);

class Else {
    constructor(t) {
        this.f = t;
    }
    link(t, e, i, s) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.f; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.f; else throw ft(`AUR0810`);
    }
}

Else.inject = [ Qi ];

He({
    name: "else"
})(Else);

function no(t) {
    t.dispose();
}

const ro = [ 18, 17 ];

class Repeat {
    constructor(t, e, i) {
        this.views = [];
        this.key = void 0;
        this.wi = void 0;
        this.bi = false;
        this.xi = false;
        this.yi = null;
        this.ki = void 0;
        this.Ci = false;
        this.l = t;
        this.Ai = e;
        this.f = i;
    }
    binding(t, e, i) {
        const s = this.Ai.bindings;
        const n = s.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = s[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.ast;
                this.Ri = r;
                let t = o.iterable;
                while (null != t && ro.includes(t.$kind)) {
                    t = t.expression;
                    this.bi = true;
                }
                this.yi = t;
                break;
            }
        }
        this.Si();
        const h = o.declaration;
        if (!(this.Ci = 24 === h.$kind || 25 === h.$kind)) this.local = T(h, this.$controller.scope, r, null);
    }
    attaching(t, e, i) {
        this.Bi();
        return this.Ii(t);
    }
    detaching(t, e, i) {
        this.Si();
        return this.Ti(t);
    }
    itemsChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        this.Si();
        this.Bi();
        const e = b(this.Ti(null), (() => this.Ii(null)));
        if (pt(e)) e.catch(yt);
    }
    handleCollectionChange(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        if (this.bi) {
            if (this.xi) return;
            this.xi = true;
            this.items = T(this.forOf.iterable, i.scope, this.Ri, null);
            this.xi = false;
            return;
        }
        this.Bi();
        if (void 0 === e) {
            const t = b(this.Ti(null), (() => this.Ii(null)));
            if (pt(t)) t.catch(yt);
        } else {
            const t = this.views.length;
            const i = G(e);
            if (i.deletedIndices.length > 0) {
                const e = b(this.Di(i), (() => this.Ei(t, i)));
                if (pt(e)) e.catch(yt);
            } else this.Ei(t, i);
        }
    }
    Si() {
        const t = this.$controller.scope;
        let e = this.Pi;
        let i = this.bi;
        let s;
        if (i) {
            e = this.Pi = T(this.yi, t, this.Ri, null) ?? null;
            i = this.bi = !Object.is(this.items, e);
        }
        const n = this.wi;
        if (this.$controller.isActive) {
            s = this.wi = X(i ? e : this.items);
            if (n !== s) {
                n?.unsubscribe(this);
                s?.subscribe(this);
            }
        } else {
            n?.unsubscribe(this);
            this.wi = void 0;
        }
    }
    Bi() {
        const t = this.items;
        if (vt(t)) {
            this.ki = t;
            return;
        }
        const e = [];
        go(t, ((t, i) => {
            e[i] = t;
        }));
        this.ki = e;
    }
    Ii(t) {
        let e;
        let i;
        let s;
        let n;
        const {$controller: r, f: o, local: l, l: h, items: c} = this;
        const a = r.scope;
        const u = this.forOf;
        const f = mo(c);
        const d = this.views = Array(f);
        go(c, ((c, m) => {
            s = d[m] = o.create().setLocation(h);
            s.nodes.unlink();
            if (this.Ci) L(u.declaration, n = U.fromParent(a, new Q), this.Ri, c); else n = U.fromParent(a, new Q(l, c));
            uo(n.overrideContext, m, f);
            i = s.activate(t ?? s, r, 0, n);
            if (pt(i)) (e ?? (e = [])).push(i);
        }));
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ti(t) {
        let e;
        let i;
        let s;
        let n = 0;
        const {views: r, $controller: o} = this;
        const l = r.length;
        for (;l > n; ++n) {
            s = r[n];
            s.release();
            i = s.deactivate(t ?? s, o, 0);
            if (pt(i)) (e ?? (e = [])).push(i);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Di(t) {
        let e;
        let i;
        let s;
        const {$controller: n, views: r} = this;
        const o = t.deletedIndices;
        const l = o.length;
        let h = 0;
        for (;l > h; ++h) {
            s = r[o[h]];
            s.release();
            i = s.deactivate(s, n, 0);
            if (pt(i)) (e ?? (e = [])).push(i);
        }
        h = 0;
        let c = 0;
        for (;l > h; ++h) {
            c = o[h] - h;
            r.splice(c, 1);
        }
        if (void 0 !== e) return 1 === e.length ? e[0] : Promise.all(e);
    }
    Ei(t, e) {
        let i;
        let s;
        let n;
        let r;
        let o = 0;
        const {$controller: l, f: h, local: c, ki: a, l: u, views: f} = this;
        const d = e.length;
        for (;d > o; ++o) if (-2 === e[o]) {
            n = h.create();
            f.splice(o, 0, n);
        }
        if (f.length !== d) throw ao(f.length, d);
        const m = l.scope;
        const g = e.length;
        K(f, e);
        const p = co(e);
        const v = p.length;
        let w;
        let b = v - 1;
        o = g - 1;
        for (;o >= 0; --o) {
            n = f[o];
            w = f[o + 1];
            n.nodes.link(w?.nodes ?? u);
            if (-2 === e[o]) {
                if (this.Ci) L(this.forOf.declaration, r = U.fromParent(m, new Q), this.Ri, a[o]); else r = U.fromParent(m, new Q(c, a[o]));
                uo(r.overrideContext, o, g);
                n.setLocation(u);
                s = n.activate(n, l, 0, r);
                if (pt(s)) (i ?? (i = [])).push(s);
            } else if (b < 0 || 1 === v || o !== p[b]) {
                uo(n.scope.overrideContext, o, g);
                n.nodes.insertBefore(n.location);
            } else {
                if (t !== g) uo(n.scope.overrideContext, o, g);
                --b;
            }
        }
        if (void 0 !== i) return 1 === i.length ? i[0] : Promise.all(i);
    }
    dispose() {
        this.views.forEach(no);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let i = 0, s = e.length; i < s; ++i) if (true === e[i].accept(t)) return true;
    }
}

Repeat.inject = [ Ms, ys, Qi ];

J([ At ], Repeat.prototype, "items", void 0);

He("repeat")(Repeat);

let oo = 16;

let lo = new Int32Array(oo);

let ho = new Int32Array(oo);

function co(t) {
    const e = t.length;
    if (e > oo) {
        oo = e;
        lo = new Int32Array(e);
        ho = new Int32Array(e);
    }
    let i = 0;
    let s = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let c = 0;
    for (;r < e; r++) {
        s = t[r];
        if (-2 !== s) {
            o = lo[i];
            n = t[o];
            if (-2 !== n && n < s) {
                ho[r] = o;
                lo[++i] = r;
                continue;
            }
            l = 0;
            h = i;
            while (l < h) {
                c = l + h >> 1;
                n = t[lo[c]];
                if (-2 !== n && n < s) l = c + 1; else h = c;
            }
            n = t[lo[l]];
            if (s < n || -2 === n) {
                if (l > 0) ho[r] = lo[l - 1];
                lo[l] = r;
            }
        }
    }
    r = ++i;
    const a = new Int32Array(r);
    s = lo[i - 1];
    while (i-- > 0) {
        a[i] = s;
        s = ho[s];
    }
    while (r-- > 0) lo[r] = 0;
    return a;
}

const ao = (t, e) => ft(`AUR0814:${t}!=${e}`);

const uo = (t, e, i) => {
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
};

const fo = Object.prototype.toString;

const mo = t => {
    switch (fo.call(t)) {
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
        throw ft(`Cannot count ${fo.call(t)}`);
    }
};

const go = (t, e) => {
    switch (fo.call(t)) {
      case "[object Array]":
        return po(t, e);

      case "[object Map]":
        return vo(t, e);

      case "[object Set]":
        return wo(t, e);

      case "[object Number]":
        return bo(t, e);

      case "[object Null]":
        return;

      case "[object Undefined]":
        return;

      default:
        throw ft(`Cannot iterate over ${fo.call(t)}`);
    }
};

const po = (t, e) => {
    const i = t.length;
    let s = 0;
    for (;s < i; ++s) e(t[s], s, t);
};

const vo = (t, e) => {
    let i = -0;
    let s;
    for (s of t.entries()) e(s, i++, t);
};

const wo = (t, e) => {
    let i = 0;
    let s;
    for (s of t.keys()) e(s, i++, t);
};

const bo = (t, e) => {
    let i = 0;
    for (;i < t; ++i) e(i, i, t);
};

class With {
    constructor(t, e) {
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, i) {
        const s = this.$controller;
        const n = this.view.bindings;
        let r;
        let o = 0, l = 0;
        if (s.isActive && null != n) {
            r = U.fromParent(s.scope, void 0 === t ? {} : t);
            for (l = n.length; l > o; ++o) n[o].$bind(r);
        }
    }
    attaching(t, e, i) {
        const {$controller: s, value: n} = this;
        const r = U.fromParent(s.scope, void 0 === n ? {} : n);
        return this.view.activate(t, s, i, r);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

With.inject = [ Qi, Ms ];

J([ At ], With.prototype, "value", void 0);

He("with")(With);

let xo = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
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
        this.queue((() => this.swap(t, this.value)));
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
        this.view?.dispose();
        this.view = void 0;
    }
    valueChanged(t, e) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, this.value)));
    }
    caseChanged(t) {
        this.queue((() => this.Li(t)));
    }
    Li(t) {
        const e = t.isMatch(this.value);
        const i = this.activeCases;
        const s = i.length;
        if (!e) {
            if (s > 0 && i[0].id === t.id) return this.$i(null);
            return;
        }
        if (s > 0 && i[0].id < t.id) return;
        const n = [];
        let r = t.fallThrough;
        if (!r) n.push(t); else {
            const e = this.cases;
            const i = e.indexOf(t);
            for (let t = i, s = e.length; t < s && r; t++) {
                const i = e[t];
                n.push(i);
                r = i.fallThrough;
            }
        }
        return b(this.$i(null, n), (() => {
            this.activeCases = n;
            return this.Oi(null);
        }));
    }
    swap(t, e) {
        const i = [];
        let s = false;
        for (const t of this.cases) {
            if (s || t.isMatch(e)) {
                i.push(t);
                s = t.fallThrough;
            }
            if (i.length > 0 && !s) break;
        }
        const n = this.defaultCase;
        if (0 === i.length && void 0 !== n) i.push(n);
        return b(this.activeCases.length > 0 ? this.$i(t, i) : void 0, (() => {
            this.activeCases = i;
            if (0 === i.length) return;
            return this.Oi(t);
        }));
    }
    Oi(t) {
        const e = this.$controller;
        if (!e.isActive) return;
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        const n = e.scope;
        if (1 === s) return i[0].activate(t, 0, n);
        return w(...i.map((e => e.activate(t, 0, n))));
    }
    $i(t, e = []) {
        const i = this.activeCases;
        const s = i.length;
        if (0 === s) return;
        if (1 === s) {
            const s = i[0];
            if (!e.includes(s)) {
                i.length = 0;
                return s.deactivate(t, 0);
            }
            return;
        }
        return b(w(...i.reduce(((i, s) => {
            if (!e.includes(s)) i.push(s.deactivate(t, 0));
            return i;
        }), [])), (() => {
            i.length = 0;
        }));
    }
    queue(t) {
        const e = this.promise;
        let i;
        i = this.promise = b(b(e, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

J([ At ], xo.prototype, "value", void 0);

xo = J([ He("switch"), tt(0, Qi), tt(1, Ms) ], xo);

let yo = 0;

let ko = class Case {
    constructor(t, e, i, s) {
        this.f = t;
        this.Ui = e;
        this.l = i;
        this.id = ++yo;
        this.fallThrough = false;
        this.view = void 0;
        this.qi = s.config.level <= 1;
        this.Ee = s.scopeTo(`${this.constructor.name}-#${this.id}`);
    }
    link(t, e, i, s) {
        const n = t.parent;
        const r = n?.viewModel;
        if (r instanceof xo) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw ft(`AUR0815`);
    }
    detaching(t, e, i) {
        return this.deactivate(t, i);
    }
    isMatch(t) {
        this.Ee.debug("isMatch()");
        const e = this.value;
        if (vt(e)) {
            if (void 0 === this.wi) this.wi = this.ji(e);
            return e.includes(t);
        }
        return e === t;
    }
    valueChanged(t, e) {
        if (vt(t)) {
            this.wi?.unsubscribe(this);
            this.wi = this.ji(t);
        } else if (void 0 !== this.wi) this.wi.unsubscribe(this);
        this.$switch.caseChanged(this);
    }
    handleCollectionChange() {
        this.$switch.caseChanged(this);
    }
    activate(t, e, i) {
        let s = this.view;
        if (void 0 === s) s = this.view = this.f.create().setLocation(this.l);
        if (s.isActive) return;
        return s.activate(t ?? s, this.$controller, e, i);
    }
    deactivate(t, e) {
        const i = this.view;
        if (void 0 === i || !i.isActive) return;
        return i.deactivate(t ?? i, this.$controller, e);
    }
    dispose() {
        this.wi?.unsubscribe(this);
        this.view?.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    ji(t) {
        const e = this.Ui.getArrayObserver(t);
        e.subscribe(this);
        return e;
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        return this.view?.accept(t);
    }
};

ko.inject = [ Qi, j, Ms, k ];

J([ At ], ko.prototype, "value", void 0);

J([ At({
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
}) ], ko.prototype, "fallThrough", void 0);

ko = J([ He("case") ], ko);

let Co = class DefaultCase extends ko {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw ft(`AUR0816`);
        t.defaultCase = this;
    }
};

Co = J([ He("default-case") ], Co);

let Ao = class PromiseTemplateController {
    constructor(t, e, i, s) {
        this.f = t;
        this.l = e;
        this.p = i;
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = s.scopeTo("promise.resolve");
    }
    link(t, e, i, s) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, e, i) {
        const s = this.view;
        const n = this.$controller;
        return b(s.activate(t, n, i, this.viewScope = U.fromParent(n.scope, {})), (() => this.swap(t, i)));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        this.swap(null, i);
    }
    swap(t, e) {
        const i = this.value;
        if (!pt(i)) {
            this.logger.warn(`The value '${String(i)}' is not a promise. No change will be done.`);
            return;
        }
        const s = this.p.domWriteQueue;
        const n = this.fulfilled;
        const r = this.rejected;
        const o = this.pending;
        const l = this.viewScope;
        let h;
        const c = {
            reusable: false
        };
        const a = () => {
            void w(h = (this.preSettledTask = s.queueTask((() => w(n?.deactivate(t, e), r?.deactivate(t, e), o?.activate(t, e, l))), c)).result.catch((t => {
                if (!(t instanceof Y)) throw t;
            })), i.then((a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => w(o?.deactivate(t, e), r?.deactivate(t, e), n?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            }), (a => {
                if (this.value !== i) return;
                const u = () => {
                    this.postSettlePromise = (this.postSettledTask = s.queueTask((() => w(o?.deactivate(t, e), n?.deactivate(t, e), r?.activate(t, e, l, a))), c)).result;
                };
                if (1 === this.preSettledTask.status) void h.then(u); else {
                    this.preSettledTask.cancel();
                    u();
                }
            })));
        };
        if (1 === this.postSettledTask?.status) void this.postSettlePromise.then(a); else {
            this.postSettledTask?.cancel();
            a();
        }
    }
    detaching(t, e, i) {
        this.preSettledTask?.cancel();
        this.postSettledTask?.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
};

J([ At ], Ao.prototype, "value", void 0);

Ao = J([ He("promise"), tt(0, Qi), tt(1, Ms), tt(2, Pi), tt(3, k) ], Ao);

let Ro = class PendingTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Io(t).pending = this;
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
        this.view?.dispose();
        this.view = void 0;
    }
};

J([ At({
    mode: 2
}) ], Ro.prototype, "value", void 0);

Ro = J([ He("pending"), tt(0, Qi), tt(1, Ms) ], Ro);

let So = class FulfilledTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Io(t).fulfilled = this;
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
        this.view?.dispose();
        this.view = void 0;
    }
};

J([ At({
    mode: 4
}) ], So.prototype, "value", void 0);

So = J([ He("then"), tt(0, Qi), tt(1, Ms) ], So);

let Bo = class RejectedTemplateController {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.view = void 0;
    }
    link(t, e, i, s) {
        Io(t).rejected = this;
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
        this.view?.dispose();
        this.view = void 0;
    }
};

J([ At({
    mode: 4
}) ], Bo.prototype, "value", void 0);

Bo = J([ He("catch"), tt(0, Qi), tt(1, Ms) ], Bo);

function Io(t) {
    const e = t.parent;
    const i = e?.viewModel;
    if (i instanceof Ao) return i;
    throw ft(`AUR0813`);
}

let To = class PromiseAttributePattern {
    "promise.resolve"(t, e, i) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

To = J([ Xt({
    pattern: "promise.resolve",
    symbols: ""
}) ], To);

let Do = class FulfilledAttributePattern {
    then(t, e, i) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

Do = J([ Xt({
    pattern: "then",
    symbols: ""
}) ], Do);

let Eo = class RejectedAttributePattern {
    catch(t, e, i) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

Eo = J([ Xt({
    pattern: "catch",
    symbols: ""
}) ], Eo);

function Po(t, e, i, s) {
    if (bt(e)) return Lo(t, e, i, s);
    if (yi(e)) return $o(t, e, i, s);
    throw ft(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, i) {
        this.node = t;
        this.instructions = e;
        this._i = i;
        this.Fi = void 0;
    }
    get definition() {
        if (void 0 === this.Fi) this.Fi = CustomElementDefinition.create({
            name: wi(),
            template: this.node,
            needsCompile: bt(this.node),
            instructions: this.instructions,
            dependencies: this._i
        });
        return this.Fi;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(ns).getViewFactory(this.definition, t.createChild().register(...this._i));
    }
    mergeInto(t, e, i) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        i.push(...this._i);
    }
}

function Lo(t, e, i, s) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (nn(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (s) Oo(t, l, s, r, o);
    return new RenderPlan(l, r, o);
}

function $o(t, e, i, s) {
    const n = Ai(e);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const c = n.bindables;
    const a = t.document.createElement(n.name);
    a.className = "au";
    if (!l.includes(e)) l.push(e);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (i) Object.keys(i).forEach((t => {
        const e = i[t];
        if (nn(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (s) Oo(t, a, s, o, l);
    return new RenderPlan(a, o, l);
}

function Oo(t, e, i, s, n) {
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

function Uo(t, e) {
    const i = e.to;
    if (void 0 !== i && "subject" !== i && "composing" !== i) t[i] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, s) {
        this.p = t;
        this.Mi = e;
        this.Vi = i;
        this.r = s;
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.Ni = void 0;
        this.Wi = e.props.reduce(Uo, {});
    }
    attaching(t, e, i) {
        const {component: s, view: n} = this;
        if (void 0 === n || this.Ni !== s) {
            this.Ni = s;
            this.composing = true;
            return this.compose(void 0, s, t, i);
        }
        return this.compose(n, s, t, i);
    }
    detaching(t, e, i) {
        return this.di(this.view, t, i);
    }
    componentChanged(t, e, i) {
        const {$controller: s} = this;
        if (!s.isActive) return;
        if (this.Ni === t) return;
        this.Ni = t;
        this.composing = true;
        i |= s.flags;
        const n = b(this.di(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (pt(n)) n.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, s) {
        return b(void 0 === t ? b(e, (t => this.Hi(t, s))) : t, (t => this.ui(this.view = t, i, s)));
    }
    di(t, e, i) {
        return t?.deactivate(e ?? t, this.$controller, i);
    }
    ui(t, e, i) {
        const {$controller: s} = this;
        return b(t?.activate(e ?? t, s, i, s.scope), (() => {
            this.composing = false;
        }));
    }
    Hi(t, e) {
        const i = this.zi(t, e);
        if (i) {
            i.setLocation(this.$controller.location);
            i.lockScope(this.$controller.scope);
            return i;
        }
        return;
    }
    zi(t, e) {
        if (null == t) return;
        const i = this.Vi.controller.container;
        if ("object" === typeof t) {
            if (qo(t)) return t;
            if ("createView" in t) return t.createView(i);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), i).create();
        }
        if (bt(t)) {
            const e = i.find(Bi, t);
            if (null == e) throw ft(`AUR0809:${t}`);
            t = e.Type;
        }
        return Po(this.p, t, this.Wi, this.$controller.host.childNodes).createView(i);
    }
    dispose() {
        this.view?.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

AuRender.inject = [ Pi, sn, ks, ns ];

J([ At ], AuRender.prototype, "component", void 0);

J([ At({
    mode: 4
}) ], AuRender.prototype, "composing", void 0);

ni({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function qo(t) {
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
        this.Gi = void 0;
        this.r = t.get(ns);
        this.Mi = r;
        this.Xi = o;
    }
    static get inject() {
        return [ g, ys, _s, Ms, Pi, sn, R(CompositionContextFactory) ];
    }
    get pending() {
        return this.Ki;
    }
    get composition() {
        return this.Gi;
    }
    attaching(t, e, i) {
        return this.Ki = b(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Xi.isCurrent(t)) this.Ki = void 0;
        }));
    }
    detaching(t) {
        const e = this.Gi;
        const i = this.Ki;
        this.Xi.invalidate();
        this.Gi = this.Ki = void 0;
        return b(i, (() => e?.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.Gi) {
            this.Gi.update(this.model);
            return;
        }
        this.Ki = b(this.Ki, (() => b(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Xi.isCurrent(t)) this.Ki = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Xi;
        const s = this.Gi;
        return b(i.create(t), (t => {
            if (i.isCurrent(t)) return b(this.compose(t), (n => {
                if (i.isCurrent(t)) return b(n.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.Gi = n;
                        return b(s?.deactivate(e), (() => t));
                    } else return b(n.controller.deactivate(n.controller, this.$controller, 2), (() => {
                        n.controller.dispose();
                        return t;
                    }));
                }));
                n.controller.dispose();
                return t;
            }));
            return t;
        }));
    }
    compose(t) {
        let e;
        let i;
        let s;
        const {view: n, viewModel: r, model: o} = t.change;
        const {c: l, host: h, $controller: c, l: a} = this;
        const u = this.getDef(r);
        const f = l.createChild();
        const d = null == a ? h.parentNode : a.parentNode;
        if (null !== u) {
            if (u.containerless) throw ft(`AUR0806`);
            if (null == a) {
                i = h;
                s = () => {};
            } else {
                i = d.insertBefore(this.p.document.createElement(u.name), a);
                s = () => {
                    i.remove();
                };
            }
            e = this.getVm(f, r, i);
        } else {
            i = null == a ? h : a;
            e = this.getVm(f, r, i);
        }
        const m = () => {
            if (null !== u) {
                const n = Controller.$el(f, e, i, {
                    projections: this.Mi.projections
                }, u);
                return new CompositionController(n, (t => n.activate(t ?? n, c, 1, c.scope.parent)), (t => b(n.deactivate(t ?? n, c, 2), s)), (t => e.activate?.(t)), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Bi.generateName(),
                    template: n
                });
                const r = this.r.getViewFactory(s, f);
                const o = Controller.$view(r, c);
                const l = "auto" === this.scopeBehavior ? U.fromParent(this.parent.scope, e) : U.create(e);
                if (zs(i)) o.setLocation(i); else o.setHost(i);
                return new CompositionController(o, (t => o.activate(t ?? o, c, 1, l)), (t => o.deactivate(t ?? o, c, 2)), (t => e.activate?.(t)), t);
            }
        };
        if ("activate" in e) return b(e.activate(o), (() => m())); else return m();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const s = this.p;
        const n = zs(i);
        Ft(t, s.Element, Ft(t, _s, new v("ElementResolver", n ? null : i)));
        Ft(t, Ms, new v("IRenderLocation", n ? i : null));
        const r = t.invoke(e);
        Ft(t, e, new v("au-compose.viewModel", r));
        return r;
    }
    getDef(t) {
        const e = wt(t) ? t : t?.constructor;
        return Bi.isType(e) ? Bi.getDefinition(e) : null;
    }
}

J([ At ], AuCompose.prototype, "view", void 0);

J([ At ], AuCompose.prototype, "viewModel", void 0);

J([ At ], AuCompose.prototype, "model", void 0);

J([ At({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw ft(`AUR0805`);
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

ni("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return b(t.load(), (t => new CompositionContext(++this.id, t)));
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
        if (pt(this.view) || pt(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
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
        if (0 !== this.state) throw ft(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw ft(`AUR0808`);

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, i, s) {
        this.Qi = null;
        this.Yi = null;
        let n;
        const r = e.auSlot;
        const o = i.instruction?.projections?.[r.name];
        if (null == o) {
            n = s.getViewFactory(r.fallback, i.controller.container);
            this.Zi = false;
        } else {
            n = s.getViewFactory(o, i.parent.controller.container);
            this.Zi = true;
        }
        this.Vi = i;
        this.view = n.create().setLocation(t);
    }
    static get inject() {
        return [ Ms, sn, ks, ns ];
    }
    binding(t, e, i) {
        this.Qi = this.$controller.scope.parent;
        let s;
        if (this.Zi) {
            s = this.Vi.controller.scope.parent;
            (this.Yi = U.fromParent(s, s.bindingContext)).overrideContext.$host = this.expose ?? this.Qi.bindingContext;
        }
    }
    attaching(t, e, i) {
        return this.view.activate(t, this.$controller, i, this.Zi ? this.Yi : this.Qi);
    }
    detaching(t, e, i) {
        return this.view.deactivate(t, this.$controller, i);
    }
    exposeChanged(t) {
        if (this.Zi && null != this.Yi) this.Yi.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        if (true === this.view?.accept(t)) return true;
    }
}

J([ At ], AuSlot.prototype, "expose", void 0);

ni({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const jo = $t("ISanitizer", (t => t.singleton(class {
    sanitize() {
        throw ft('"sanitize" method not implemented');
    }
})));

let _o = class SanitizeValueConverter {
    constructor(t) {
        this.Ji = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Ji.sanitize(t);
    }
};

_o = J([ tt(0, jo) ], _o);

he("sanitize")(_o);

let Fo = class ViewValueConverter {
    constructor(t) {
        this.ts = t;
    }
    toView(t, e) {
        return this.ts.getViewComponentForObject(t, e);
    }
};

Fo = J([ tt(0, ss) ], Fo);

he("view")(Fo);

const Mo = DebounceBindingBehavior;

const Vo = OneTimeBindingBehavior;

const No = ToViewBindingBehavior;

const Wo = FromViewBindingBehavior;

const Ho = SignalBindingBehavior;

const zo = ThrottleBindingBehavior;

const Go = TwoWayBindingBehavior;

const Xo = TemplateCompiler;

const Ko = NodeObserverLocator;

const Qo = [ Xo, Ko ];

const Yo = SVGAnalyzer;

const Zo = ie;

const Jo = ee;

const tl = te;

const el = Jt;

const il = se;

const sl = [ tl, el, il ];

const nl = [ Zo, Jo ];

const rl = Zn;

const ol = Yn;

const ll = Jn;

const hl = Kn;

const cl = Gn;

const al = Xn;

const ul = Qn;

const fl = or;

const dl = tr;

const ml = er;

const gl = ir;

const pl = sr;

const vl = rr;

const wl = nr;

const bl = lr;

const xl = [ ol, cl, hl, al, ul, rl, ll, fl, dl, ml, gl, vl, wl, pl, bl ];

const yl = _o;

const kl = Fo;

const Cl = If;

const Al = Else;

const Rl = Repeat;

const Sl = With;

const Bl = xo;

const Il = ko;

const Tl = Co;

const Dl = Ao;

const El = Ro;

const Pl = So;

const Ll = Bo;

const $l = To;

const Ol = Do;

const Ul = Eo;

const ql = AttrBindingBehavior;

const jl = SelfBindingBehavior;

const _l = UpdateTriggerBindingBehavior;

const Fl = AuRender;

const Ml = AuCompose;

const Vl = Portal;

const Nl = Focus;

const Wl = so;

const Hl = [ Mo, Vo, No, Wo, Ho, zo, Go, yl, kl, Cl, Al, Rl, Sl, Bl, Il, Tl, Dl, El, Pl, Ll, $l, Ol, Ul, ql, jl, _l, Fl, Ml, Vl, Nl, Wl, AuSlot ];

const zl = vn;

const Gl = mn;

const Xl = dn;

const Kl = bn;

const Ql = yn;

const Yl = pn;

const Zl = xn;

const Jl = wn;

const th = fn;

const eh = gn;

const ih = Cn;

const sh = In;

const nh = An;

const rh = Rn;

const oh = Sn;

const lh = Bn;

const hh = kn;

const ch = Tn;

const ah = [ Zl, Ql, zl, Jl, Kl, th, Xl, Gl, eh, Yl, ih, sh, nh, rh, oh, lh, hh, ch ];

const uh = fh(n);

function fh(t) {
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
            return e.register(qt(q, i.coercingOptions), ...Qo, ...Hl, ...sl, ...xl, ...ah);
        },
        customize(e) {
            return fh(e ?? t);
        }
    };
}

const dh = $t("IAurelia");

class Aurelia {
    constructor(t = r.createContainer()) {
        this.container = t;
        this.ir = false;
        this.es = false;
        this.ss = false;
        this.rs = void 0;
        this.next = void 0;
        this.os = void 0;
        this.ls = void 0;
        if (t.has(dh, true)) throw ft(`AUR0768`);
        Ft(t, dh, new v("IAurelia", this));
        Ft(t, Us, this.cs = new v("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.es;
    }
    get isStopping() {
        return this.ss;
    }
    get root() {
        if (null == this.rs) {
            if (null == this.next) throw ft(`AUR0767`);
            return this.next;
        }
        return this.rs;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.us(t.host), this.container, this.cs);
        return this;
    }
    enhance(t, e) {
        const i = t.container ?? this.container.createChild();
        const s = t.host;
        const n = this.us(s);
        const r = t.component;
        let o;
        if (wt(r)) {
            Ft(i, n.HTMLElement, Ft(i, n.Element, Ft(i, _s, new v("ElementResolver", s))));
            o = i.invoke(r);
        } else o = r;
        Ft(i, Fs, new v("IEventTarget", s));
        e = e ?? null;
        const l = Controller.$el(i, o, s, null, CustomElementDefinition.create({
            name: wi(),
            template: s,
            enhance: true
        }));
        return b(l.activate(l, e, 1), (() => l));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    us(t) {
        let e;
        if (!this.container.has(Pi, false)) {
            if (null === t.ownerDocument.defaultView) throw ft(`AUR0769`);
            e = new Z(t.ownerDocument.defaultView);
            this.container.register(qt(Pi, e));
        } else e = this.container.get(Pi);
        return e;
    }
    start(t = this.next) {
        if (null == t) throw ft(`AUR0770`);
        if (pt(this.os)) return this.os;
        return this.os = b(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.cs.prepare(this.rs = t);
            this.es = true;
            return b(t.activate(), (() => {
                this.ir = true;
                this.es = false;
                this.os = void 0;
                this.ds(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (pt(this.ls)) return this.ls;
        if (true === this.ir) {
            const e = this.rs;
            this.ir = false;
            this.ss = true;
            return this.ls = b(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.rs = void 0;
                this.cs.dispose();
                this.ss = false;
                this.ds(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.ss) throw ft(`AUR0771`);
        this.container.dispose();
    }
    ds(t, e, i) {
        const s = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        i.dispatchEvent(s);
    }
}

var mh;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(mh || (mh = {}));

var gh;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(gh || (gh = {}));

const ph = $t("IDialogService");

const vh = $t("IDialogController");

const wh = $t("IDialogDomRenderer");

const bh = $t("IDialogDom");

const xh = $t("IDialogGlobalSettings");

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

var yh;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(yh || (yh = {}));

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
        return [ Pi, g ];
    }
    activate(t) {
        const e = this.ctn.createChild();
        const {model: i, template: s, rejectOnCancel: n} = t;
        const r = e.get(wh);
        const o = t.host ?? this.p.document.body;
        const l = this.dom = r.render(o, t);
        const h = e.has(Fs, true) ? e.get(Fs) : null;
        const c = l.contentHost;
        this.settings = t;
        if (null == h || !h.contains(o)) e.register(qt(Fs, o));
        e.register(qt(_s, c), qt(bh, l));
        return new Promise((s => {
            const n = Object.assign(this.cmp = this.getOrCreateVm(e, t, c), {
                $dialog: this
            });
            s(n.canActivate?.(i) ?? true);
        })).then((r => {
            if (true !== r) {
                l.dispose();
                if (n) throw kh(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const o = this.cmp;
            return b(o.activate?.(i), (() => {
                const i = this.controller = Controller.$el(e, o, c, null, CustomElementDefinition.create(this.getDefinition(o) ?? {
                    name: Bi.generateName(),
                    template: s
                }));
                return b(i.activate(i, null, 1), (() => {
                    l.overlay.addEventListener(t.mouseEvent ?? "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            l.dispose();
            throw t;
        }));
    }
    deactivate(t, e) {
        if (this.gs) return this.gs;
        let i = true;
        const {controller: s, dom: n, cmp: r, settings: {mouseEvent: o, rejectOnCancel: l}} = this;
        const h = DialogCloseResult.create(t, e);
        const c = new Promise((c => {
            c(b(r.canDeactivate?.(h) ?? true, (c => {
                if (true !== c) {
                    i = false;
                    this.gs = void 0;
                    if (l) throw kh(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return b(r.deactivate?.(h), (() => b(s.deactivate(s, null, 2), (() => {
                    n.dispose();
                    n.overlay.removeEventListener(o ?? "click", this);
                    if (!l && "error" !== t) this._t(h); else this.Lt(kh(e, "Dialog cancelled with a rejection on cancel"));
                    return h;
                }))));
            })));
        })).catch((t => {
            this.gs = void 0;
            throw t;
        }));
        this.gs = i ? c : void 0;
        return c;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = Ch(t);
        return new Promise((t => t(b(this.cmp.deactivate?.(DialogCloseResult.create("error", e)), (() => b(this.controller.deactivate(this.controller, null, 2), (() => {
            this.dom.dispose();
            this.Lt(e);
        })))))));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, e, i) {
        const s = e.component;
        if (null == s) return new EmptyComponent;
        if ("object" === typeof s) return s;
        const n = this.p;
        t.registerResolver(n.HTMLElement, t.registerResolver(n.Element, t.registerResolver(_s, new v("ElementResolver", i))));
        return t.invoke(s);
    }
    getDefinition(t) {
        const e = wt(t) ? t : t?.constructor;
        return Bi.isType(e) ? Bi.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function kh(t, e) {
    const i = ft(e);
    i.wasCancelled = true;
    i.value = t;
    return i;
}

function Ch(t) {
    const e = ft("");
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, i) {
        this.vt = t;
        this.p = e;
        this.ps = i;
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
        return [ g, Pi, xh ];
    }
    static register(t) {
        t.register(Ot(ph, this), Pe.deactivating(ph, (t => b(t.closeAll(), (t => {
            if (t.length > 0) throw ft(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Rh(new Promise((e => {
            const i = DialogSettings.from(this.ps, t);
            const s = i.container ?? this.vt.createChild();
            e(b(i.load(), (t => {
                const e = s.invoke(DialogController);
                s.register(qt(vh, e));
                s.register(jt(DialogController, (() => {
                    throw ft(`AUR0902`);
                })));
                return b(e.activate(t), (t => {
                    if (!t.wasCancelled) {
                        if (1 === this.dlgs.push(e)) this.p.window.addEventListener("keydown", this);
                        const t = () => this.remove(e);
                        e.closed.then(t, t);
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
        const i = Sh(e);
        if (null == i) return;
        const s = this.top;
        if (null === s || 0 === s.settings.keyboard.length) return;
        const n = s.settings.keyboard;
        if ("Escape" === i && n.includes(i)) void s.cancel(); else if ("Enter" === i && n.includes(i)) void s.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).ws().vs();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const s = w(null == e ? void 0 : b(e(), (e => {
            t.component = e;
        })), wt(i) ? b(i(), (e => {
            t.template = e;
        })) : void 0);
        return pt(s) ? s.then((() => t)) : t;
    }
    ws() {
        if (null == this.component && null == this.template) throw ft(`AUR0903`);
        return this;
    }
    vs() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Ah(t, e) {
    return this.then((i => i.dialog.closed.then(t, e)), e);
}

function Rh(t) {
    t.whenClosed = Ah;
    return t;
}

function Sh(t) {
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
        Ot(xh, this).register(t);
    }
}

const Bh = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${Bh} display:flex;`;
        this.overlayCss = Bh;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        Ot(wh, this).register(t);
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

DefaultDialogDomRenderer.inject = [ Pi ];

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

function Ih(t, e) {
    return {
        settingsProvider: t,
        register: i => i.register(...e, Pe.creating((() => t(i.get(xh))))),
        customize(t, i) {
            return Ih(t, i ?? e);
        }
    };
}

const Th = Ih((() => {
    throw ft(`AUR0904`);
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(Ot(xh, this));
    }
} ]);

const Dh = Ih(n, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const Eh = $t((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, i) {
        this.ctn = t;
        this.p = e;
        this.r = i;
    }
    define(t, e, i) {
        if (!t.includes("-")) throw ft('Invalid web-components custom element name. It must include a "-"');
        let s;
        if (null == e) throw ft("Invalid custom element definition");
        switch (typeof e) {
          case "function":
            s = Bi.isType(e) ? Bi.getDefinition(e) : CustomElementDefinition.create(Bi.generateName(), e);
            break;

          default:
            s = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (s.containerless) throw ft("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const n = i?.extends ? this.p.document.createElement(i.extends).constructor : this.p.HTMLElement;
        const r = this.ctn;
        const o = this.r;
        const l = s.bindables;
        const h = this.p;
        class CustomElementClass extends n {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = r.createChild();
                t.registerResolver(h.HTMLElement, t.registerResolver(h.Element, t.registerResolver(_s, new v("ElementProvider", this))));
                const e = o.compile(s, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const n = this.auCtrl = Controller.$el(t, i, this, null, e);
                js(this, e.key, n);
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
        CustomElementClass.observedAttributes = Object.keys(l);
        for (const t in l) Object.defineProperty(CustomElementClass.prototype, t, {
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

WcCustomElementRegistry.inject = [ g, Pi, ns ];

export { AdoptedStyleSheetsStyles, AppRoot, Pe as AppTask, ie as AtPrefixedTriggerAttributePattern, Zo as AtPrefixedTriggerAttributePatternRegistration, AttrBindingBehavior, ql as AttrBindingBehaviorRegistration, sr as AttrBindingCommand, pl as AttrBindingCommandRegistration, AttrSyntax, AttributeBinding, AttributeBindingInstruction, sh as AttributeBindingRendererRegistration, AttributeNSAccessor, Zt as AttributePattern, AuCompose, AuRender, Fl as AuRenderRegistration, AuSlot, AuSlotsInfo, Aurelia, Bt as Bindable, BindableDefinition, BindableObserver, BindablesInfo, le as BindingBehavior, BindingBehaviorDefinition, zn as BindingCommand, BindingCommandDefinition, mh as BindingMode, BindingModeBehavior, BindingTargetSubscriber, CSSModulesProcessorRegistry, CallBinding, Zn as CallBindingCommand, rl as CallBindingCommandRegistration, CallBindingInstruction, zl as CallBindingRendererRegistration, ir as CaptureBindingCommand, gl as CaptureBindingCommandRegistration, ko as Case, CheckedObserver, qe as Children, ChildrenDefinition, ChildrenObserver, ClassAttributeAccessor, rr as ClassBindingCommand, vl as ClassBindingCommandRegistration, ee as ColonPrefixedBindAttributePattern, Jo as ColonPrefixedBindAttributePatternRegistration, Mn as CommandType, ComputedWatcher, Controller, Je as CustomAttribute, CustomAttributeDefinition, Gl as CustomAttributeRendererRegistration, Bi as CustomElement, CustomElementDefinition, Xl as CustomElementRendererRegistration, DataAttributeAccessor, DebounceBindingBehavior, Mo as DebounceBindingBehaviorRegistration, Yn as DefaultBindingCommand, ol as DefaultBindingCommandRegistration, xl as DefaultBindingLanguage, sl as DefaultBindingSyntax, Co as DefaultCase, Qo as DefaultComponents, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, ah as DefaultRenderers, Hl as DefaultResources, gh as DefinitionType, er as DelegateBindingCommand, ml as DelegateBindingCommandRegistration, rn as DelegationStrategy, DialogCloseResult, Th as DialogConfiguration, DialogController, yh as DialogDeactivationStatuses, Dh as DialogDefaultConfiguration, DialogOpenResult, DialogService, Jt as DotSeparatedAttributePattern, el as DotSeparatedAttributePatternRegistration, Else, Al as ElseRegistration, EventDelegator, EventSubscriber, ExpressionWatcher, FlushQueue, Focus, Jn as ForBindingCommand, ll as ForBindingCommandRegistration, FragmentNodeSequence, FromViewBindingBehavior, Wo as FromViewBindingBehaviorRegistration, Kn as FromViewBindingCommand, hl as FromViewBindingCommandRegistration, So as FulfilledTemplateController, HooksDefinition, HydrateAttributeInstruction, HydrateElementInstruction, HydrateLetElementInstruction, HydrateTemplateController, Us as IAppRoot, Ee as IAppTask, ar as IAttrMapper, Gt as IAttributeParser, zt as IAttributePattern, tn as IAuSlotsInfo, dh as IAurelia, ys as IController, vh as IDialogController, bh as IDialogDom, wh as IDialogDomRenderer, xh as IDialogGlobalSettings, ph as IDialogService, Zs as IEventDelegator, Fs as IEventTarget, ge as IFlushQueue, Ks as IHistory, ks as IHydrationContext, sn as IInstruction, Hi as ILifecycleHooks, Xs as ILocation, _s as INode, Ko as INodeObserverLocatorRegistration, Pi as IPlatform, Js as IProjections, Ms as IRenderLocation, ln as IRenderer, ns as IRendering, hr as ISVGAnalyzer, jo as ISanitizer, _i as IShadowDOMGlobalStyles, ji as IShadowDOMStyles, Nt as ISyntaxInterpreter, on as ITemplateCompiler, Br as ITemplateCompilerHooks, Xo as ITemplateCompilerRegistration, dr as ITemplateElementFactory, Qi as IViewFactory, ss as IViewLocator, Eh as IWcElementRegistry, Gs as IWindow, If, Cl as IfRegistration, en as InstructionType, InterpolationBinding, Kl as InterpolationBindingRendererRegistration, InterpolationInstruction, InterpolationPartBinding, Interpretation, IteratorBindingInstruction, Ql as IteratorBindingRendererRegistration, LetBinding, LetBindingInstruction, Yl as LetElementRendererRegistration, rs as LifecycleFlags, Xi as LifecycleHooks, LifecycleHooksDefinition, LifecycleHooksEntry, Listener, ListenerBindingInstruction, ih as ListenerBindingRendererRegistration, NodeObserverConfig, NodeObserverLocator, NoopSVGAnalyzer, OneTimeBindingBehavior, Vo as OneTimeBindingBehaviorRegistration, Gn as OneTimeBindingCommand, cl as OneTimeBindingCommandRegistration, Ro as PendingTemplateController, Portal, Ao as PromiseTemplateController, PropertyBinding, PropertyBindingInstruction, Zl as PropertyBindingRendererRegistration, te as RefAttributePattern, tl as RefAttributePatternRegistration, RefBinding, fl as RefBindingCommandRegistration, RefBindingInstruction, Jl as RefBindingRendererRegistration, Bo as RejectedTemplateController, RenderPlan, Rendering, Repeat, Rl as RepeatRegistration, SVGAnalyzer, Yo as SVGAnalyzerRegistration, _o as SanitizeValueConverter, yl as SanitizeValueConverterRegistration, SelectValueObserver, SelfBindingBehavior, jl as SelfBindingBehaviorRegistration, SetAttributeInstruction, nh as SetAttributeRendererRegistration, SetClassAttributeInstruction, rh as SetClassAttributeRendererRegistration, SetPropertyInstruction, th as SetPropertyRendererRegistration, SetStyleAttributeInstruction, oh as SetStyleAttributeRendererRegistration, ShadowDOMRegistry, nl as ShortHandBindingSyntax, SignalBindingBehavior, Ho as SignalBindingBehaviorRegistration, uh as StandardConfiguration, bs as State, StyleAttributeAccessor, nr as StyleBindingCommand, wl as StyleBindingCommandRegistration, Fi as StyleConfiguration, StyleElementStyles, StylePropertyBindingInstruction, lh as StylePropertyBindingRendererRegistration, xo as Switch, TemplateCompiler, Dr as TemplateCompilerHooks, eh as TemplateControllerRendererRegistration, TextBindingInstruction, hh as TextBindingRendererRegistration, ThrottleBindingBehavior, zo as ThrottleBindingBehaviorRegistration, ToViewBindingBehavior, No as ToViewBindingBehaviorRegistration, Xn as ToViewBindingCommand, al as ToViewBindingCommandRegistration, tr as TriggerBindingCommand, dl as TriggerBindingCommandRegistration, TwoWayBindingBehavior, Go as TwoWayBindingBehaviorRegistration, Qn as TwoWayBindingCommand, ul as TwoWayBindingCommandRegistration, UpdateTriggerBindingBehavior, _l as UpdateTriggerBindingBehaviorRegistration, ValueAttributeObserver, ue as ValueConverter, ValueConverterDefinition, ViewFactory, ViewLocator, ws as ViewModelKind, Fo as ViewValueConverter, kl as ViewValueConverterRegistration, es as Views, si as Watch, WcCustomElementRegistry, With, Sl as WithRegistration, Mt as alias, Lt as allResources, Xt as attributePattern, At as bindable, ne as bindingBehavior, Vn as bindingCommand, Ei as capture, $e as children, It as coercer, oi as containerless, Hs as convertToRenderLocation, Po as createElement, Oi as cssModules, We as customAttribute, ni as customElement, Ns as getEffectiveParentNode, qs as getRef, de as implementAstEvaluator, gs as isCustomElementController, ps as isCustomElementViewModel, nn as isInstruction, zs as isRenderLocation, Ki as lifecycleHooks, fe as mixinUseScope, we as mixingBindingLimited, Ti as processContent, Vt as registerAliases, hn as renderer, Ws as setEffectiveParentNode, js as setRef, Ui as shadowCSS, hi as strict, Er as templateCompilerHooks, He as templateController, ri as useShadowDOM, he as valueConverter, is as view, ti as watch };
//# sourceMappingURL=index.mjs.map
