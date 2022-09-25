import { DI as t, IEventAggregator as n, toArray as i, camelCase as s, Registration as e } from "@aurelia/kernel";

import { bindingBehavior as r, valueConverter as o, astEvaluator as a, CustomElement as h, attributePattern as l, bindingCommand as c, renderer as u, AttrSyntax as f, IPlatform as d, AttributePattern as m, BindingCommand as g, AppTask as p } from "@aurelia/runtime-html";

import { ValueConverterExpression as b, ISignaler as T, connectable as B, CustomExpression as v, Interpolation as w, astEvaluate as y, astUnbind as C, astBind as I, IExpressionParser as P, IObserverLocator as x } from "@aurelia/runtime";

import M from "i18next";

function A(t, n, i, s) {
    var e = arguments.length, r = e < 3 ? n : null === s ? s = Object.getOwnPropertyDescriptor(n, i) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, n, i, s); else for (var a = t.length - 1; a >= 0; a--) if (o = t[a]) r = (e < 3 ? o(r) : e > 3 ? o(n, i, r) : o(n, i)) || r;
    return e > 3 && r && Object.defineProperty(n, i, r), r;
}

function L(t, n) {
    return function(i, s) {
        n(i, s, t);
    };
}

var R;

(function(t) {
    t["I18N_EA_CHANNEL"] = "i18n:locale:changed";
    t["I18N_SIGNAL"] = "aurelia-translation-signal";
    t["RT_SIGNAL"] = "aurelia-relativetime-signal";
})(R || (R = {}));

var k;

(function(t) {
    t["translationValueConverterName"] = "t";
    t["dateFormatValueConverterName"] = "df";
    t["numberFormatValueConverterName"] = "nf";
    t["relativeTimeValueConverterName"] = "rt";
})(k || (k = {}));

function E(t, n) {
    const i = n.ast.expression;
    if (!(i instanceof b)) {
        const s = new b(i, t, n.ast.args);
        n.ast.expression = s;
    }
}

let N = class DateFormatBindingBehavior {
    bind(t, n) {
        E("df", n);
    }
};

N = A([ r("df") ], N);

const $ = t.createInterface("I18nInitOptions");

const O = t.createInterface("I18nextWrapper");

class I18nextWrapper {
    constructor() {
        this.i18next = M;
    }
}

var V;

(function(t) {
    t[t["Second"] = 1e3] = "Second";
    t[t["Minute"] = 6e4] = "Minute";
    t[t["Hour"] = 36e5] = "Hour";
    t[t["Day"] = 864e5] = "Day";
    t[t["Week"] = 6048e5] = "Week";
    t[t["Month"] = 2592e6] = "Month";
    t[t["Year"] = 31536e6] = "Year";
})(V || (V = {}));

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

const _ = t.createInterface("I18N");

let D = class I18nService {
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

D = A([ L(0, O), L(1, $), L(2, n), L(3, T) ], D);

let F = class DateFormatValueConverter {
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

F = A([ o("df"), L(0, _) ], F);

let j = class NumberFormatBindingBehavior {
    bind(t, n) {
        E("nf", n);
    }
};

j = A([ r("nf") ], j);

let K = class NumberFormatValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n, i) {
        if ("number" !== typeof t) return t;
        return this.i18n.nf(t, n, i);
    }
};

K = A([ o("nf"), L(0, _) ], K);

let S = class RelativeTimeBindingBehavior {
    bind(t, n) {
        E("rt", n);
    }
};

S = A([ r("rt") ], S);

let W = class RelativeTimeValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal", "aurelia-relativetime-signal" ];
    }
    toView(t, n, i) {
        if (!(t instanceof Date)) return t;
        return this.i18n.rt(t, n, i);
    }
};

W = A([ o("rt"), L(0, _) ], W);

let z = class TranslationBindingBehavior {
    bind(t, n) {
        const i = n.ast.expression;
        if (!(i instanceof b)) {
            const t = new b(i, "t", n.ast.args);
            n.ast.expression = t;
        }
    }
};

z = A([ r("t") ], z);

const H = [ "textContent", "innerHTML", "prepend", "append" ];

const U = new Map([ [ "text", "textContent" ], [ "html", "innerHTML" ] ]);

const G = {
    optional: true
};

const Y = {
    reusable: false,
    preempt: true
};

class TranslationBinding {
    constructor(t, n, i, s, e) {
        this.locator = n;
        this.interceptor = this;
        this.isBound = false;
        this.T = H;
        this.task = null;
        this.parameter = null;
        this.boundFn = false;
        this.B = t;
        this.target = e;
        this.i18n = this.locator.get(_);
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
            const n = l instanceof v ? t.parse(l.value, 1) : void 0;
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
        this.I = this.ast instanceof w;
        this.P = y(this.ast, t, this, this);
        this.M();
        this.parameter?.$bind(t);
        this.A();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        C(this.ast, this.scope, this);
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
        this.P = this.I ? y(this.ast, this.scope, this, this) : t;
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
                const n = h.for(this.target, G);
                const e = n?.viewModel ? this.oL.getAccessor(n.viewModel, s) : this.oL.getAccessor(this.target, s);
                const r = 1 !== this.B.state && (4 & e.type) > 0;
                if (r) i.push(new AccessorUpdateTask(e, t, this.target, s)); else e.setValue(t, this.target, s);
                this.C.add(e);
            }
        }
        let e = false;
        if (Object.keys(n).length > 0) {
            e = 1 !== this.B.state;
            if (!e) this.N(n);
        }
        if (i.length > 0 || e) this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            for (const t of i) t.run();
            if (e) this.N(n);
        }), Y);
        s?.cancel();
    }
    L(t) {
        if (0 === t.length) t = "IMG" === this.target.tagName ? [ "src" ] : [ "textContent" ];
        for (const [n, i] of U) {
            const s = t.findIndex((t => t === n));
            if (s > -1) t.splice(s, 1, i);
        }
        return t;
    }
    R(t) {
        return this.T.includes(t);
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
        this.boundFn = false;
        this.oL = t.oL;
        this.locator = t.locator;
    }
    handleChange(t, n) {
        if (!this.isBound) return;
        this.obs.version++;
        this.value = y(this.ast, this.scope, this, this);
        this.obs.clear();
        this.updater();
    }
    $bind(t) {
        if (this.isBound) return;
        this.scope = t;
        I(this.ast, t, this);
        this.value = y(this.ast, t, this, this);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        C(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

B(TranslationBinding);

a(true)(TranslationBinding);

B(ParameterBinding);

a(true)(ParameterBinding);

const q = "tpt";

const J = "t-params.bind";

let Q = class TranslationParametersAttributePattern {
    [J](t, n, i) {
        return new f(t, n, "", J);
    }
};

Q = A([ l({
    pattern: J,
    symbols: ""
}) ], Q);

class TranslationParametersBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = q;
        this.mode = 2;
    }
}

let X = class TranslationParametersBindingCommand {
    constructor() {
        this.type = 0;
    }
    get name() {
        return J;
    }
    build(t, n, i) {
        const e = t.attr;
        let r = e.target;
        if (null == t.bindable) r = i.map(t.node, r) ?? s(r); else r = t.bindable.property;
        return new TranslationParametersBindingInstruction(n.parse(e.rawValue, 8), r);
    }
};

X = A([ c(J) ], X);

let Z = class TranslationParametersBindingRenderer {
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

Z.inject = [ P, x, d ];

Z = A([ u(q) ], Z);

const tt = "tt";

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
        this.type = tt;
        this.mode = 2;
    }
}

class TranslationBindingCommand {
    constructor() {
        this.type = 0;
    }
    get name() {
        return "t";
    }
    build(t, n, i) {
        let e;
        if (null == t.bindable) e = i.map(t.node, t.attr.target) ?? s(t.attr.target); else e = t.bindable.property;
        return new TranslationBindingInstruction(new v(t.attr.rawValue), e);
    }
}

let nt = class TranslationBindingRenderer {
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

nt.inject = [ P, x, d ];

nt = A([ u(tt) ], nt);

const it = "tbt";

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
        this.type = it;
        this.mode = 2;
    }
}

class TranslationBindBindingCommand {
    constructor() {
        this.type = 0;
    }
    get name() {
        return "t-bind";
    }
    build(t, n, i) {
        let e;
        if (null == t.bindable) e = i.map(t.node, t.attr.target) ?? s(t.attr.target); else e = t.bindable.property;
        return new TranslationBindBindingInstruction(n.parse(t.attr.rawValue, 8), e);
    }
}

let st = class TranslationBindBindingRenderer {
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

st = A([ u(it), L(0, P), L(1, x), L(2, d) ], st);

let et = class TranslationValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n) {
        return this.i18n.tr(t, n);
    }
};

et = A([ o("t"), L(0, _) ], et);

const rt = [ et, z ];

function ot(t) {
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
    const h = [ m.define(s, TranslationAttributePattern), g.define({
        name: "t",
        aliases: o
    }, TranslationBindingCommand), nt, m.define(r, TranslationBindAttributePattern), g.define({
        name: "t.bind",
        aliases: a
    }, TranslationBindBindingCommand), st, Q, X, Z ];
    return {
        register(n) {
            return n.register(e.callback($, (() => t.initOptions)), p.activating(_, (t => t.initPromise)), e.singleton(O, I18nextWrapper), e.singleton(_, D), ...h, ...rt);
        }
    };
}

const at = [ F, N ];

const ht = [ K, j ];

const lt = [ W, S ];

function ct(t) {
    return {
        optionsProvider: t,
        register(n) {
            const i = {
                initOptions: Object.create(null)
            };
            t(i);
            return n.register(ot(i), ...at, ...ht, ...lt);
        },
        customize(n) {
            return ct(n || t);
        }
    };
}

const ut = ct((() => {}));

export { N as DateFormatBindingBehavior, F as DateFormatValueConverter, _ as I18N, ut as I18nConfiguration, $ as I18nInitOptions, I18nKeyEvaluationResult, D as I18nService, j as NumberFormatBindingBehavior, K as NumberFormatValueConverter, S as RelativeTimeBindingBehavior, W as RelativeTimeValueConverter, R as Signals, TranslationAttributePattern, TranslationBindAttributePattern, TranslationBindBindingCommand, TranslationBindBindingInstruction, st as TranslationBindBindingRenderer, it as TranslationBindInstructionType, TranslationBinding, z as TranslationBindingBehavior, TranslationBindingCommand, TranslationBindingInstruction, nt as TranslationBindingRenderer, tt as TranslationInstructionType, Q as TranslationParametersAttributePattern, X as TranslationParametersBindingCommand, TranslationParametersBindingInstruction, Z as TranslationParametersBindingRenderer, q as TranslationParametersInstructionType, et as TranslationValueConverter };
//# sourceMappingURL=index.mjs.map
