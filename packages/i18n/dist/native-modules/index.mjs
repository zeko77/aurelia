import { DI as t, IEventAggregator as n, toArray as i, camelCase as s, Registration as e } from "../../../kernel/dist/native-modules/index.mjs";

import { bindingBehavior as r, valueConverter as o, astEvaluator as a, CustomElement as h, attributePattern as l, bindingCommand as c, renderer as u, AttrSyntax as f, BindingMode as d, IAttrMapper as m, IPlatform as g, AttributePattern as p, BindingCommand as b, AppTask as B } from "../../../runtime-html/dist/native-modules/index.mjs";

import { ValueConverterExpression as T, ISignaler as v, connectable as w, CustomExpression as y, Interpolation as C, IExpressionParser as I, IObserverLocator as P } from "../../../runtime/dist/native-modules/index.mjs";

import x from "i18next";

function M(t, n, i, s) {
    var e = arguments.length, r = e < 3 ? n : null === s ? s = Object.getOwnPropertyDescriptor(n, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, n, i, s); else for (var a = t.length - 1; a >= 0; a--) if (o = t[a]) r = (e < 3 ? o(r) : e > 3 ? o(n, i, r) : o(n, i)) || r;
    return e > 3 && r && Object.defineProperty(n, i, r), r;
}

function A(t, n) {
    return function(i, s) {
        n(i, s, t);
    };
}

var L;

(function(t) {
    t["I18N_EA_CHANNEL"] = "i18n:locale:changed";
    t["I18N_SIGNAL"] = "aurelia-translation-signal";
    t["RT_SIGNAL"] = "aurelia-relativetime-signal";
})(L || (L = {}));

var R;

(function(t) {
    t["translationValueConverterName"] = "t";
    t["dateFormatValueConverterName"] = "df";
    t["numberFormatValueConverterName"] = "nf";
    t["relativeTimeValueConverterName"] = "rt";
})(R || (R = {}));

function k(t, n) {
    const i = n.ast.expression;
    if (!(i instanceof T)) {
        const s = new T(i, t, n.ast.args);
        n.ast.expression = s;
    }
}

let E = class DateFormatBindingBehavior {
    bind(t, n) {
        k("df", n);
    }
};

E = M([ r("df") ], E);

const N = t.createInterface("I18nInitOptions");

const $ = t.createInterface("I18nextWrapper");

class I18nextWrapper {
    constructor() {
        this.i18next = x;
    }
}

var O;

(function(t) {
    t[t["Second"] = 1e3] = "Second";
    t[t["Minute"] = 6e4] = "Minute";
    t[t["Hour"] = 36e5] = "Hour";
    t[t["Day"] = 864e5] = "Day";
    t[t["Week"] = 6048e5] = "Week";
    t[t["Month"] = 2592e6] = "Month";
    t[t["Year"] = 31536e6] = "Year";
})(O || (O = {}));

class I18nKeyEvaluationResult {
    constructor(t) {
        this.value = void 0;
        const n = /\[([a-z\-, ]*)\]/gi;
        this.attributes = [];
        const i = n.exec(t);
        if (i) {
            t = t.replace(i[0], "");
            this.attributes = i[1].split(",");
        }
        this.key = t;
    }
}

const V = t.createInterface("I18N");

let _ = class I18nService {
    constructor(t, n, i, s) {
        this.ea = i;
        this.i = new Set;
        this.i18next = t.i18next;
        this.initPromise = this.h(n);
        this.u = s;
    }
    evaluate(t, n) {
        const i = t.split(";");
        const s = [];
        for (const t of i) {
            const i = new I18nKeyEvaluationResult(t);
            const e = i.key;
            const r = this.tr(e, n);
            if (this.options.skipTranslationOnMissingKey && r === e) console.warn(`Couldn't find translation for key: ${e}`); else {
                i.value = r;
                s.push(i);
            }
        }
        return s;
    }
    tr(t, n) {
        return this.i18next.t(t, n);
    }
    getLocale() {
        return this.i18next.language;
    }
    async setLocale(t) {
        const n = this.getLocale();
        const i = {
            oldLocale: n,
            newLocale: t
        };
        await this.i18next.changeLanguage(t);
        this.ea.publish("i18n:locale:changed", i);
        this.i.forEach((t => t.handleLocaleChange(i)));
        this.u.dispatchSignal("aurelia-translation-signal");
    }
    createNumberFormat(t, n) {
        return Intl.NumberFormat(n || this.getLocale(), t);
    }
    nf(t, n, i) {
        return this.createNumberFormat(n, i).format(t);
    }
    createDateTimeFormat(t, n) {
        return Intl.DateTimeFormat(n || this.getLocale(), t);
    }
    df(t, n, i) {
        return this.createDateTimeFormat(n, i).format(t);
    }
    uf(t, n) {
        const i = this.nf(1e4 / 3, void 0, n);
        let s = i[1];
        const e = i[5];
        if ("." === s) s = "\\.";
        const r = t.replace(new RegExp(s, "g"), "").replace(/[^\d.,-]/g, "").replace(e, ".");
        return Number(r);
    }
    createRelativeTimeFormat(t, n) {
        return new Intl.RelativeTimeFormat(n || this.getLocale(), t);
    }
    rt(t, n, i) {
        let s = t.getTime() - this.now();
        const e = this.options.rtEpsilon * (s > 0 ? 1 : 0);
        const r = this.createRelativeTimeFormat(n, i);
        let o = s / 31536e6;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "year");
        o = s / 2592e6;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "month");
        o = s / 6048e5;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "week");
        o = s / 864e5;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "day");
        o = s / 36e5;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "hour");
        o = s / 6e4;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "minute");
        s = Math.abs(s) < 1e3 ? 1e3 : s;
        o = s / 1e3;
        return r.format(Math.round(o), "second");
    }
    subscribeLocaleChange(t) {
        this.i.add(t);
    }
    now() {
        return (new Date).getTime();
    }
    async h(t) {
        const n = {
            lng: "en",
            fallbackLng: [ "en" ],
            debug: false,
            plugins: [],
            rtEpsilon: .01,
            skipTranslationOnMissingKey: false
        };
        this.options = {
            ...n,
            ...t
        };
        for (const t of this.options.plugins) this.i18next.use(t);
        await this.i18next.init(this.options);
    }
};

_ = M([ A(0, $), A(1, N), A(2, n), A(3, v) ], _);

let D = class DateFormatValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n, i) {
        if (!t && 0 !== t || "string" === typeof t && "" === t.trim()) return t;
        if ("string" === typeof t) {
            const n = Number(t);
            const i = new Date(Number.isInteger(n) ? n : t);
            if (isNaN(i.getTime())) return t;
            t = i;
        }
        return this.i18n.df(t, n, i);
    }
};

D = M([ o("df"), A(0, V) ], D);

let F = class NumberFormatBindingBehavior {
    bind(t, n) {
        k("nf", n);
    }
};

F = M([ r("nf") ], F);

let j = class NumberFormatValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n, i) {
        if ("number" !== typeof t) return t;
        return this.i18n.nf(t, n, i);
    }
};

j = M([ o("nf"), A(0, V) ], j);

let K = class RelativeTimeBindingBehavior {
    bind(t, n) {
        k("rt", n);
    }
};

K = M([ r("rt") ], K);

let S = class RelativeTimeValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal", "aurelia-relativetime-signal" ];
    }
    toView(t, n, i) {
        if (!(t instanceof Date)) return t;
        return this.i18n.rt(t, n, i);
    }
};

S = M([ o("rt"), A(0, V) ], S);

let W = class TranslationBindingBehavior {
    bind(t, n) {
        const i = n.ast.expression;
        if (!(i instanceof T)) {
            const t = new T(i, "t", n.ast.args);
            n.ast.expression = t;
        }
    }
};

W = M([ r("t") ], W);

const z = [ "textContent", "innerHTML", "prepend", "append" ];

const H = new Map([ [ "text", "textContent" ], [ "html", "innerHTML" ] ]);

const U = {
    optional: true
};

const G = {
    reusable: false,
    preempt: true
};

class TranslationBinding {
    constructor(t, n, i, s, e) {
        this.locator = n;
        this.interceptor = this;
        this.isBound = false;
        this.B = z;
        this.task = null;
        this.parameter = null;
        this.T = t;
        this.target = e;
        this.i18n = this.locator.get(V);
        this.platform = s;
        this.C = new Set;
        this.oL = i;
        this.i18n.subscribeLocaleChange(this);
        this.taskQueue = s.domWriteQueue;
    }
    static create({parser: t, observerLocator: n, context: i, controller: s, target: e, instruction: r, platform: o, isParameterContext: a}) {
        const h = this.getBinding({
            observerLocator: n,
            context: i,
            controller: s,
            target: e,
            platform: o
        });
        const l = "string" === typeof r.from ? t.parse(r.from, 8) : r.from;
        if (a) h.useParameter(l); else {
            const n = l instanceof y ? t.parse(l.value, 1) : void 0;
            h.ast = n || l;
        }
    }
    static getBinding({observerLocator: t, context: n, controller: i, target: s, platform: e}) {
        let r = i.bindings && i.bindings.find((t => t instanceof TranslationBinding && t.target === s));
        if (!r) {
            r = new TranslationBinding(i, n, t, e, s);
            i.addBinding(r);
        }
        return r;
    }
    $bind(t) {
        if (this.isBound) return;
        if (!this.ast) throw new Error("key expression is missing");
        this.scope = t;
        this.I = this.ast instanceof C;
        this.P = this.ast.evaluate(t, this, this);
        this.M();
        this.parameter?.$bind(t);
        this.A();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.scope, this);
        this.parameter?.$unbind();
        this.C.clear();
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.scope = void 0;
        this.obs.clearAll();
    }
    handleChange(t, n) {
        this.obs.version++;
        this.P = this.I ? this.ast.evaluate(this.scope, this, this) : t;
        this.obs.clear();
        this.M();
        this.A();
    }
    handleLocaleChange() {
        this.A();
    }
    useParameter(t) {
        if (null != this.parameter) throw new Error("This translation parameter has already been specified.");
        this.parameter = new ParameterBinding(this, t, (() => this.A()));
    }
    A() {
        const t = this.i18n.evaluate(this.P, this.parameter?.value);
        const n = Object.create(null);
        const i = [];
        const s = this.task;
        this.C.clear();
        for (const s of t) {
            const t = s.value;
            const e = this.L(s.attributes);
            for (const s of e) if (this.R(s)) n[s] = t; else {
                const n = h.for(this.target, U);
                const e = n?.viewModel ? this.oL.getAccessor(n.viewModel, s) : this.oL.getAccessor(this.target, s);
                const r = 1 !== this.T.state && (4 & e.type) > 0;
                if (r) i.push(new AccessorUpdateTask(e, t, this.target, s)); else e.setValue(t, this.target, s);
                this.C.add(e);
            }
        }
        let e = false;
        if (Object.keys(n).length > 0) {
            e = 1 !== this.T.state;
            if (!e) this.N(n);
        }
        if (i.length > 0 || e) this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            for (const t of i) t.run();
            if (e) this.N(n);
        }), G);
        s?.cancel();
    }
    L(t) {
        if (0 === t.length) t = "IMG" === this.target.tagName ? [ "src" ] : [ "textContent" ];
        for (const [n, i] of H) {
            const s = t.findIndex((t => t === n));
            if (s > -1) t.splice(s, 1, i);
        }
        return t;
    }
    R(t) {
        return this.B.includes(t);
    }
    N(t) {
        const n = i(this.target.childNodes);
        const s = [];
        const e = "au-i18n";
        for (const t of n) if (!Reflect.get(t, e)) s.push(t);
        const r = this.$(t, e, s);
        this.target.innerHTML = "";
        for (const t of i(r.content.childNodes)) this.target.appendChild(t);
    }
    $(t, n, i) {
        const s = this.platform.document.createElement("template");
        this.O(s, t.prepend, n);
        if (!this.O(s, t.innerHTML ?? t.textContent, n)) for (const t of i) s.content.append(t);
        this.O(s, t.append, n);
        return s;
    }
    O(t, n, s) {
        if (void 0 !== n && null !== n) {
            const e = this.platform.document.createElement("div");
            e.innerHTML = n;
            for (const n of i(e.childNodes)) {
                Reflect.set(n, s, true);
                t.content.append(n);
            }
            return true;
        }
        return false;
    }
    M() {
        const t = this.P ?? (this.P = "");
        const n = typeof t;
        if ("string" !== n) throw new Error(`Expected the i18n key to be a string, but got ${t} of type ${n}`);
    }
}

class AccessorUpdateTask {
    constructor(t, n, i, s) {
        this.accessor = t;
        this.v = n;
        this.el = i;
        this.attr = s;
    }
    run() {
        this.accessor.setValue(this.v, this.el, this.attr);
    }
}

class ParameterBinding {
    constructor(t, n, i) {
        this.owner = t;
        this.ast = n;
        this.updater = i;
        this.interceptor = this;
        this.isBound = false;
        this.oL = t.oL;
        this.locator = t.locator;
    }
    handleChange(t, n) {
        if (!this.isBound) return;
        this.obs.version++;
        this.value = this.ast.evaluate(this.scope, this, this);
        this.obs.clear();
        this.updater();
    }
    $bind(t) {
        if (this.isBound) return;
        this.scope = t;
        if (this.ast.hasBind) this.ast.bind(t, this);
        this.value = this.ast.evaluate(t, this, this);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        if (this.ast.hasUnbind) this.ast.unbind(this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

w(TranslationBinding);

a(true)(TranslationBinding);

w(ParameterBinding);

a(true)(ParameterBinding);

const Y = "tpt";

const q = "t-params.bind";

let J = class TranslationParametersAttributePattern {
    [q](t, n, i) {
        return new f(t, n, "", q);
    }
};

J = M([ l({
    pattern: q,
    symbols: ""
}) ], J);

class TranslationParametersBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = Y;
        this.mode = d.toView;
    }
}

let Q = class TranslationParametersBindingCommand {
    constructor(t, n) {
        this.type = 0;
        this.m = t;
        this.ep = n;
    }
    get name() {
        return q;
    }
    build(t) {
        const n = t.attr;
        let i = n.target;
        if (null == t.bindable) i = this.m.map(t.node, i) ?? s(i); else i = t.bindable.property;
        return new TranslationParametersBindingInstruction(this.ep.parse(n.rawValue, 8), i);
    }
};

Q.inject = [ m, I ];

Q = M([ c(q) ], Q);

let X = class TranslationParametersBindingRenderer {
    constructor(t, n, i) {
        this.ep = t;
        this.oL = n;
        this.p = i;
    }
    render(t, n, i) {
        TranslationBinding.create({
            parser: this.ep,
            observerLocator: this.oL,
            context: t.container,
            controller: t,
            target: n,
            instruction: i,
            isParameterContext: true,
            platform: this.p
        });
    }
};

X.inject = [ I, P, g ];

X = M([ u(Y) ], X);

const Z = "tt";

class TranslationAttributePattern {
    static registerAlias(t) {
        this.prototype[t] = function(n, i, s) {
            return new f(n, i, "", t);
        };
    }
}

class TranslationBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = Z;
        this.mode = d.toView;
    }
}

class TranslationBindingCommand {
    constructor(t) {
        this.type = 0;
        this.m = t;
    }
    get name() {
        return "t";
    }
    build(t) {
        let n;
        if (null == t.bindable) n = this.m.map(t.node, t.attr.target) ?? s(t.attr.target); else n = t.bindable.property;
        return new TranslationBindingInstruction(new y(t.attr.rawValue), n);
    }
}

TranslationBindingCommand.inject = [ m ];

let tt = class TranslationBindingRenderer {
    constructor(t, n, i) {
        this.ep = t;
        this.oL = n;
        this.p = i;
    }
    render(t, n, i) {
        TranslationBinding.create({
            parser: this.ep,
            observerLocator: this.oL,
            context: t.container,
            controller: t,
            target: n,
            instruction: i,
            platform: this.p
        });
    }
};

tt.inject = [ I, P, g ];

tt = M([ u(Z) ], tt);

const nt = "tbt";

class TranslationBindAttributePattern {
    static registerAlias(t) {
        const n = `${t}.bind`;
        this.prototype[n] = function(t, i, s) {
            return new f(t, i, s[1], n);
        };
    }
}

class TranslationBindBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = nt;
        this.mode = d.toView;
    }
}

class TranslationBindBindingCommand {
    constructor(t, n) {
        this.type = 0;
        this.m = t;
        this.ep = n;
    }
    get name() {
        return "t-bind";
    }
    build(t) {
        let n;
        if (null == t.bindable) n = this.m.map(t.node, t.attr.target) ?? s(t.attr.target); else n = t.bindable.property;
        return new TranslationBindBindingInstruction(this.ep.parse(t.attr.rawValue, 8), n);
    }
}

TranslationBindBindingCommand.inject = [ m, I ];

let it = class TranslationBindBindingRenderer {
    constructor(t, n, i) {
        this.parser = t;
        this.oL = n;
        this.p = i;
    }
    render(t, n, i) {
        TranslationBinding.create({
            parser: this.parser,
            observerLocator: this.oL,
            context: t.container,
            controller: t,
            target: n,
            instruction: i,
            platform: this.p
        });
    }
};

it = M([ u(nt), A(0, I), A(1, P), A(2, g) ], it);

let st = class TranslationValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n) {
        return this.i18n.tr(t, n);
    }
};

st = M([ o("t"), A(0, V) ], st);

const et = [ st, W ];

function rt(t) {
    const n = t.translationAttributeAliases;
    const i = Array.isArray(n) ? n : [ "t" ];
    const s = [];
    const r = [];
    const o = [];
    const a = [];
    for (const t of i) {
        const n = `${t}.bind`;
        s.push({
            pattern: t,
            symbols: ""
        });
        TranslationAttributePattern.registerAlias(t);
        r.push({
            pattern: n,
            symbols: "."
        });
        TranslationBindAttributePattern.registerAlias(t);
        if ("t" !== t) {
            o.push(t);
            a.push(n);
        }
    }
    const h = [ p.define(s, TranslationAttributePattern), b.define({
        name: "t",
        aliases: o
    }, TranslationBindingCommand), tt, p.define(r, TranslationBindAttributePattern), b.define({
        name: "t.bind",
        aliases: a
    }, TranslationBindBindingCommand), it, J, Q, X ];
    return {
        register(n) {
            return n.register(e.callback(N, (() => t.initOptions)), B.activating(V, (t => t.initPromise)), e.singleton($, I18nextWrapper), e.singleton(V, _), ...h, ...et);
        }
    };
}

const ot = [ D, E ];

const at = [ j, F ];

const ht = [ S, K ];

function lt(t) {
    return {
        optionsProvider: t,
        register(n) {
            const i = {
                initOptions: Object.create(null)
            };
            t(i);
            return n.register(rt(i), ...ot, ...at, ...ht);
        },
        customize(n) {
            return lt(n || t);
        }
    };
}

const ct = lt((() => {}));

export { E as DateFormatBindingBehavior, D as DateFormatValueConverter, V as I18N, ct as I18nConfiguration, N as I18nInitOptions, I18nKeyEvaluationResult, _ as I18nService, F as NumberFormatBindingBehavior, j as NumberFormatValueConverter, K as RelativeTimeBindingBehavior, S as RelativeTimeValueConverter, L as Signals, TranslationAttributePattern, TranslationBindAttributePattern, TranslationBindBindingCommand, TranslationBindBindingInstruction, it as TranslationBindBindingRenderer, nt as TranslationBindInstructionType, TranslationBinding, W as TranslationBindingBehavior, TranslationBindingCommand, TranslationBindingInstruction, tt as TranslationBindingRenderer, Z as TranslationInstructionType, J as TranslationParametersAttributePattern, Q as TranslationParametersBindingCommand, TranslationParametersBindingInstruction, X as TranslationParametersBindingRenderer, Y as TranslationParametersInstructionType, st as TranslationValueConverter };

