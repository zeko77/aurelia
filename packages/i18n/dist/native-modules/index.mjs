import { DI as t, IEventAggregator as n, toArray as i, camelCase as s, Registration as e } from "../../../kernel/dist/native-modules/index.mjs";

import { bindingBehavior as r, valueConverter as a, implementAstEvaluator as o, mixingBindingLimited as h, CustomElement as l, attributePattern as c, bindingCommand as u, renderer as f, AttrSyntax as d, IPlatform as g, AttributePattern as m, BindingCommand as p, AppTask as b } from "../../../runtime-html/dist/native-modules/index.mjs";

import { ValueConverterExpression as T, ISignaler as B, connectable as v, CustomExpression as w, Interpolation as y, astEvaluate as C, astUnbind as I, astBind as P, IExpressionParser as x, IObserverLocator as M } from "../../../runtime/dist/native-modules/index.mjs";

import A from "i18next";

function L(t, n, i, s) {
    var e = arguments.length, r = e < 3 ? n : null === s ? s = Object.getOwnPropertyDescriptor(n, i) : s, a;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, n, i, s); else for (var o = t.length - 1; o >= 0; o--) if (a = t[o]) r = (e < 3 ? a(r) : e > 3 ? a(n, i, r) : a(n, i)) || r;
    return e > 3 && r && Object.defineProperty(n, i, r), r;
}

function R(t, n) {
    return function(i, s) {
        n(i, s, t);
    };
}

var k;

(function(t) {
    t["I18N_EA_CHANNEL"] = "i18n:locale:changed";
    t["I18N_SIGNAL"] = "aurelia-translation-signal";
    t["RT_SIGNAL"] = "aurelia-relativetime-signal";
})(k || (k = {}));

var E;

(function(t) {
    t["translationValueConverterName"] = "t";
    t["dateFormatValueConverterName"] = "df";
    t["numberFormatValueConverterName"] = "nf";
    t["relativeTimeValueConverterName"] = "rt";
})(E || (E = {}));

function N(t, n) {
    const i = n.ast.expression;
    if (!(i instanceof T)) {
        const s = new T(i, t, n.ast.args);
        n.ast.expression = s;
    }
}

let $ = class DateFormatBindingBehavior {
    bind(t, n) {
        N("df", n);
    }
};

$ = L([ r("df") ], $);

const O = t.createInterface("I18nInitOptions");

const V = t.createInterface("I18nextWrapper");

class I18nextWrapper {
    constructor() {
        this.i18next = A;
    }
}

var _;

(function(t) {
    t[t["Second"] = 1e3] = "Second";
    t[t["Minute"] = 6e4] = "Minute";
    t[t["Hour"] = 36e5] = "Hour";
    t[t["Day"] = 864e5] = "Day";
    t[t["Week"] = 6048e5] = "Week";
    t[t["Month"] = 2592e6] = "Month";
    t[t["Year"] = 31536e6] = "Year";
})(_ || (_ = {}));

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

const D = t.createInterface("I18N");

let F = class I18nService {
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
        let a = s / 31536e6;
        if (Math.abs(a + e) >= 1) return r.format(Math.round(a), "year");
        a = s / 2592e6;
        if (Math.abs(a + e) >= 1) return r.format(Math.round(a), "month");
        a = s / 6048e5;
        if (Math.abs(a + e) >= 1) return r.format(Math.round(a), "week");
        a = s / 864e5;
        if (Math.abs(a + e) >= 1) return r.format(Math.round(a), "day");
        a = s / 36e5;
        if (Math.abs(a + e) >= 1) return r.format(Math.round(a), "hour");
        a = s / 6e4;
        if (Math.abs(a + e) >= 1) return r.format(Math.round(a), "minute");
        s = Math.abs(s) < 1e3 ? 1e3 : s;
        a = s / 1e3;
        return r.format(Math.round(a), "second");
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

F = L([ R(0, V), R(1, O), R(2, n), R(3, B) ], F);

let j = class DateFormatValueConverter {
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

j = L([ a("df"), R(0, D) ], j);

let K = class NumberFormatBindingBehavior {
    bind(t, n) {
        N("nf", n);
    }
};

K = L([ r("nf") ], K);

let S = class NumberFormatValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n, i) {
        if ("number" !== typeof t) return t;
        return this.i18n.nf(t, n, i);
    }
};

S = L([ a("nf"), R(0, D) ], S);

let W = class RelativeTimeBindingBehavior {
    bind(t, n) {
        N("rt", n);
    }
};

W = L([ r("rt") ], W);

let z = class RelativeTimeValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal", "aurelia-relativetime-signal" ];
    }
    toView(t, n, i) {
        if (!(t instanceof Date)) return t;
        return this.i18n.rt(t, n, i);
    }
};

z = L([ a("rt"), R(0, D) ], z);

let H = class TranslationBindingBehavior {
    bind(t, n) {
        const i = n.ast.expression;
        if (!(i instanceof T)) {
            const t = new T(i, "t", n.ast.args);
            n.ast.expression = t;
        }
    }
};

H = L([ r("t") ], H);

const U = [ "textContent", "innerHTML", "prepend", "append" ];

const G = new Map([ [ "text", "textContent" ], [ "html", "innerHTML" ] ]);

const Y = {
    optional: true
};

const q = {
    reusable: false,
    preempt: true
};

class TranslationBinding {
    constructor(t, n, i, s, e) {
        this.locator = n;
        this.isBound = false;
        this.T = U;
        this.task = null;
        this.parameter = null;
        this.boundFn = false;
        this.B = t;
        this.target = e;
        this.i18n = this.locator.get(D);
        this.platform = s;
        this.C = new Set;
        this.oL = i;
        this.i18n.subscribeLocaleChange(this);
        this.taskQueue = s.domWriteQueue;
    }
    static create({parser: t, observerLocator: n, context: i, controller: s, target: e, instruction: r, platform: a, isParameterContext: o}) {
        const h = this.I({
            observerLocator: n,
            context: i,
            controller: s,
            target: e,
            platform: a
        });
        const l = "string" === typeof r.from ? t.parse(r.from, 8) : r.from;
        if (o) h.useParameter(l); else {
            const n = l instanceof w ? t.parse(l.value, 1) : void 0;
            h.ast = n || l;
        }
    }
    static I({observerLocator: t, context: n, controller: i, target: s, platform: e}) {
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
        this.P = this.ast instanceof y;
        this.M = C(this.ast, t, this, this);
        this.A();
        this.parameter?.$bind(t);
        this.updateTranslations();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        I(this.ast, this.scope, this);
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
        this.M = this.P ? C(this.ast, this.scope, this, this) : t;
        this.obs.clear();
        this.A();
        this.updateTranslations();
    }
    handleLocaleChange() {
        this.updateTranslations();
    }
    useParameter(t) {
        if (null != this.parameter) throw new Error("This translation parameter has already been specified.");
        this.parameter = new ParameterBinding(this, t, (() => this.updateTranslations()));
    }
    updateTranslations() {
        const t = this.i18n.evaluate(this.M, this.parameter?.value);
        const n = Object.create(null);
        const i = [];
        const s = this.task;
        this.C.clear();
        for (const s of t) {
            const t = s.value;
            const e = this.L(s.attributes);
            for (const s of e) if (this.R(s)) n[s] = t; else {
                const n = l.for(this.target, Y);
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
        }), q);
        s?.cancel();
    }
    L(t) {
        if (0 === t.length) t = "IMG" === this.target.tagName ? [ "src" ] : [ "textContent" ];
        for (const [n, i] of G) {
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
    A() {
        const t = this.M ?? (this.M = "");
        const n = typeof t;
        if ("string" !== n) throw new Error(`Expected the i18n key to be a string, but got ${t} of type ${n}`);
    }
}

v(TranslationBinding);

o(true)(TranslationBinding);

h(TranslationBinding, (() => "updateTranslations"));

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
        this.isBound = false;
        this.boundFn = false;
        this.oL = t.oL;
        this.locator = t.locator;
    }
    handleChange(t, n) {
        if (!this.isBound) return;
        this.obs.version++;
        this.value = C(this.ast, this.scope, this, this);
        this.obs.clear();
        this.updater();
    }
    $bind(t) {
        if (this.isBound) return;
        this.scope = t;
        P(this.ast, t, this);
        this.value = C(this.ast, t, this, this);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        I(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

v(ParameterBinding);

o(true)(ParameterBinding);

const J = "tpt";

const Q = "t-params.bind";

let X = class TranslationParametersAttributePattern {
    [Q](t, n, i) {
        return new d(t, n, "", Q);
    }
};

X = L([ c({
    pattern: Q,
    symbols: ""
}) ], X);

class TranslationParametersBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = J;
        this.mode = 2;
    }
}

let Z = class TranslationParametersBindingCommand {
    constructor() {
        this.type = 0;
    }
    get name() {
        return Q;
    }
    build(t, n, i) {
        const e = t.attr;
        let r = e.target;
        if (null == t.bindable) r = i.map(t.node, r) ?? s(r); else r = t.bindable.property;
        return new TranslationParametersBindingInstruction(n.parse(e.rawValue, 8), r);
    }
};

Z = L([ u(Q) ], Z);

let tt = class TranslationParametersBindingRenderer {
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

tt.inject = [ x, M, g ];

tt = L([ f(J) ], tt);

const nt = "tt";

class TranslationAttributePattern {
    static registerAlias(t) {
        this.prototype[t] = function(n, i, s) {
            return new d(n, i, "", t);
        };
    }
}

class TranslationBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = nt;
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
        return new TranslationBindingInstruction(new w(t.attr.rawValue), e);
    }
}

let it = class TranslationBindingRenderer {
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

it.inject = [ x, M, g ];

it = L([ f(nt) ], it);

const st = "tbt";

class TranslationBindAttributePattern {
    static registerAlias(t) {
        const n = `${t}.bind`;
        this.prototype[n] = function(t, i, s) {
            return new d(t, i, s[1], n);
        };
    }
}

class TranslationBindBindingInstruction {
    constructor(t, n) {
        this.from = t;
        this.to = n;
        this.type = st;
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

let et = class TranslationBindBindingRenderer {
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

et = L([ f(st), R(0, x), R(1, M), R(2, g) ], et);

let rt = class TranslationValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, n) {
        return this.i18n.tr(t, n);
    }
};

rt = L([ a("t"), R(0, D) ], rt);

const at = [ rt, H ];

function ot(t) {
    const n = t.translationAttributeAliases;
    const i = Array.isArray(n) ? n : [ "t" ];
    const s = [];
    const r = [];
    const a = [];
    const o = [];
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
            a.push(t);
            o.push(n);
        }
    }
    const h = [ m.define(s, TranslationAttributePattern), p.define({
        name: "t",
        aliases: a
    }, TranslationBindingCommand), it, m.define(r, TranslationBindAttributePattern), p.define({
        name: "t.bind",
        aliases: o
    }, TranslationBindBindingCommand), et, X, Z, tt ];
    return {
        register(n) {
            return n.register(e.callback(O, (() => t.initOptions)), b.activating(D, (t => t.initPromise)), e.singleton(V, I18nextWrapper), e.singleton(D, F), ...h, ...at);
        }
    };
}

const ht = [ j, $ ];

const lt = [ S, K ];

const ct = [ z, W ];

function ut(t) {
    return {
        optionsProvider: t,
        register(n) {
            const i = {
                initOptions: Object.create(null)
            };
            t(i);
            return n.register(ot(i), ...ht, ...lt, ...ct);
        },
        customize(n) {
            return ut(n || t);
        }
    };
}

const ft = ut((() => {}));

export { $ as DateFormatBindingBehavior, j as DateFormatValueConverter, D as I18N, ft as I18nConfiguration, O as I18nInitOptions, I18nKeyEvaluationResult, F as I18nService, K as NumberFormatBindingBehavior, S as NumberFormatValueConverter, W as RelativeTimeBindingBehavior, z as RelativeTimeValueConverter, k as Signals, TranslationAttributePattern, TranslationBindAttributePattern, TranslationBindBindingCommand, TranslationBindBindingInstruction, et as TranslationBindBindingRenderer, st as TranslationBindInstructionType, TranslationBinding, H as TranslationBindingBehavior, TranslationBindingCommand, TranslationBindingInstruction, it as TranslationBindingRenderer, nt as TranslationInstructionType, X as TranslationParametersAttributePattern, Z as TranslationParametersBindingCommand, TranslationParametersBindingInstruction, tt as TranslationParametersBindingRenderer, J as TranslationParametersInstructionType, rt as TranslationValueConverter };

