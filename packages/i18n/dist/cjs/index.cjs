"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var s = require("@aurelia/runtime-html");

var n = require("@aurelia/runtime");

var i = require("i18next");

function e(t) {
    return t && "object" === typeof t && "default" in t ? t["default"] : t;
}

var r = e(i);

function o(t, s, n, i) {
    var e = arguments.length, r = e < 3 ? s : null === i ? i = Object.getOwnPropertyDescriptor(s, n) : i, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, s, n, i); else for (var a = t.length - 1; a >= 0; a--) if (o = t[a]) r = (e < 3 ? o(r) : e > 3 ? o(s, n, r) : o(s, n)) || r;
    return e > 3 && r && Object.defineProperty(s, n, r), r;
}

function a(t, s) {
    return function(n, i) {
        s(n, i, t);
    };
}

exports.Signals = void 0;

(function(t) {
    t["I18N_EA_CHANNEL"] = "i18n:locale:changed";
    t["I18N_SIGNAL"] = "aurelia-translation-signal";
    t["RT_SIGNAL"] = "aurelia-relativetime-signal";
})(exports.Signals || (exports.Signals = {}));

var h;

(function(t) {
    t["translationValueConverterName"] = "t";
    t["dateFormatValueConverterName"] = "df";
    t["numberFormatValueConverterName"] = "nf";
    t["relativeTimeValueConverterName"] = "rt";
})(h || (h = {}));

function c(t, s) {
    const i = s.ast.expression;
    if (!(i instanceof n.ValueConverterExpression)) {
        const e = new n.ValueConverterExpression(i, t, s.ast.args);
        s.ast.expression = e;
    }
}

exports.DateFormatBindingBehavior = class DateFormatBindingBehavior {
    bind(t, s) {
        c("df", s);
    }
};

exports.DateFormatBindingBehavior = o([ s.bindingBehavior("df") ], exports.DateFormatBindingBehavior);

const l = t.DI.createInterface("I18nInitOptions");

const u = t.DI.createInterface("I18nextWrapper");

class I18nextWrapper {
    constructor() {
        this.i18next = r;
    }
}

var p;

(function(t) {
    t[t["Second"] = 1e3] = "Second";
    t[t["Minute"] = 6e4] = "Minute";
    t[t["Hour"] = 36e5] = "Hour";
    t[t["Day"] = 864e5] = "Day";
    t[t["Week"] = 6048e5] = "Week";
    t[t["Month"] = 2592e6] = "Month";
    t[t["Year"] = 31536e6] = "Year";
})(p || (p = {}));

class I18nKeyEvaluationResult {
    constructor(t) {
        this.value = void 0;
        const s = /\[([a-z\-, ]*)\]/gi;
        this.attributes = [];
        const n = s.exec(t);
        if (n) {
            t = t.replace(n[0], "");
            this.attributes = n[1].split(",");
        }
        this.key = t;
    }
}

const f = t.DI.createInterface("I18N");

exports.I18nService = class I18nService {
    constructor(t, s, n, i) {
        this.ea = n;
        this.i = new Set;
        this.i18next = t.i18next;
        this.initPromise = this.h(s);
        this.u = i;
    }
    evaluate(t, s) {
        const n = t.split(";");
        const i = [];
        for (const t of n) {
            const n = new I18nKeyEvaluationResult(t);
            const e = n.key;
            const r = this.tr(e, s);
            if (this.options.skipTranslationOnMissingKey && r === e) console.warn(`Couldn't find translation for key: ${e}`); else {
                n.value = r;
                i.push(n);
            }
        }
        return i;
    }
    tr(t, s) {
        return this.i18next.t(t, s);
    }
    getLocale() {
        return this.i18next.language;
    }
    async setLocale(t) {
        const s = this.getLocale();
        const n = {
            oldLocale: s,
            newLocale: t
        };
        await this.i18next.changeLanguage(t);
        this.ea.publish("i18n:locale:changed", n);
        this.i.forEach((t => t.handleLocaleChange(n)));
        this.u.dispatchSignal("aurelia-translation-signal");
    }
    createNumberFormat(t, s) {
        return Intl.NumberFormat(s || this.getLocale(), t);
    }
    nf(t, s, n) {
        return this.createNumberFormat(s, n).format(t);
    }
    createDateTimeFormat(t, s) {
        return Intl.DateTimeFormat(s || this.getLocale(), t);
    }
    df(t, s, n) {
        return this.createDateTimeFormat(s, n).format(t);
    }
    uf(t, s) {
        const n = this.nf(1e4 / 3, void 0, s);
        let i = n[1];
        const e = n[5];
        if ("." === i) i = "\\.";
        const r = t.replace(new RegExp(i, "g"), "").replace(/[^\d.,-]/g, "").replace(e, ".");
        return Number(r);
    }
    createRelativeTimeFormat(t, s) {
        return new Intl.RelativeTimeFormat(s || this.getLocale(), t);
    }
    rt(t, s, n) {
        let i = t.getTime() - this.now();
        const e = this.options.rtEpsilon * (i > 0 ? 1 : 0);
        const r = this.createRelativeTimeFormat(s, n);
        let o = i / 31536e6;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "year");
        o = i / 2592e6;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "month");
        o = i / 6048e5;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "week");
        o = i / 864e5;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "day");
        o = i / 36e5;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "hour");
        o = i / 6e4;
        if (Math.abs(o + e) >= 1) return r.format(Math.round(o), "minute");
        i = Math.abs(i) < 1e3 ? 1e3 : i;
        o = i / 1e3;
        return r.format(Math.round(o), "second");
    }
    subscribeLocaleChange(t) {
        this.i.add(t);
    }
    now() {
        return (new Date).getTime();
    }
    async h(t) {
        const s = {
            lng: "en",
            fallbackLng: [ "en" ],
            debug: false,
            plugins: [],
            rtEpsilon: .01,
            skipTranslationOnMissingKey: false
        };
        this.options = {
            ...s,
            ...t
        };
        for (const t of this.options.plugins) this.i18next.use(t);
        await this.i18next.init(this.options);
    }
};

exports.I18nService = o([ a(0, u), a(1, l), a(2, t.IEventAggregator), a(3, n.ISignaler) ], exports.I18nService);

exports.DateFormatValueConverter = class DateFormatValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, s, n) {
        if (!t && 0 !== t || "string" === typeof t && "" === t.trim()) return t;
        if ("string" === typeof t) {
            const s = Number(t);
            const n = new Date(Number.isInteger(s) ? s : t);
            if (isNaN(n.getTime())) return t;
            t = n;
        }
        return this.i18n.df(t, s, n);
    }
};

exports.DateFormatValueConverter = o([ s.valueConverter("df"), a(0, f) ], exports.DateFormatValueConverter);

exports.NumberFormatBindingBehavior = class NumberFormatBindingBehavior {
    bind(t, s) {
        c("nf", s);
    }
};

exports.NumberFormatBindingBehavior = o([ s.bindingBehavior("nf") ], exports.NumberFormatBindingBehavior);

exports.NumberFormatValueConverter = class NumberFormatValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, s, n) {
        if ("number" !== typeof t) return t;
        return this.i18n.nf(t, s, n);
    }
};

exports.NumberFormatValueConverter = o([ s.valueConverter("nf"), a(0, f) ], exports.NumberFormatValueConverter);

exports.RelativeTimeBindingBehavior = class RelativeTimeBindingBehavior {
    bind(t, s) {
        c("rt", s);
    }
};

exports.RelativeTimeBindingBehavior = o([ s.bindingBehavior("rt") ], exports.RelativeTimeBindingBehavior);

exports.RelativeTimeValueConverter = class RelativeTimeValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal", "aurelia-relativetime-signal" ];
    }
    toView(t, s, n) {
        if (!(t instanceof Date)) return t;
        return this.i18n.rt(t, s, n);
    }
};

exports.RelativeTimeValueConverter = o([ s.valueConverter("rt"), a(0, f) ], exports.RelativeTimeValueConverter);

exports.TranslationBindingBehavior = class TranslationBindingBehavior {
    bind(t, s) {
        const i = s.ast.expression;
        if (!(i instanceof n.ValueConverterExpression)) {
            const t = new n.ValueConverterExpression(i, "t", s.ast.args);
            s.ast.expression = t;
        }
    }
};

exports.TranslationBindingBehavior = o([ s.bindingBehavior("t") ], exports.TranslationBindingBehavior);

const d = [ "textContent", "innerHTML", "prepend", "append" ];

const x = new Map([ [ "text", "textContent" ], [ "html", "innerHTML" ] ]);

const g = {
    optional: true
};

const m = {
    reusable: false,
    preempt: true
};

class TranslationBinding {
    constructor(t, s, n, i, e) {
        this.locator = s;
        this.isBound = false;
        this.T = d;
        this.task = null;
        this.parameter = null;
        this.boundFn = false;
        this.B = t;
        this.target = e;
        this.i18n = this.locator.get(f);
        this.platform = i;
        this.C = new Set;
        this.oL = n;
        this.i18n.subscribeLocaleChange(this);
        this.taskQueue = i.domWriteQueue;
    }
    static create({parser: t, observerLocator: s, context: i, controller: e, target: r, instruction: o, platform: a, isParameterContext: h}) {
        const c = this.I({
            observerLocator: s,
            context: i,
            controller: e,
            target: r,
            platform: a
        });
        const l = "string" === typeof o.from ? t.parse(o.from, 8) : o.from;
        if (h) c.useParameter(l); else {
            const s = l instanceof n.CustomExpression ? t.parse(l.value, 1) : void 0;
            c.ast = s || l;
        }
    }
    static I({observerLocator: t, context: s, controller: n, target: i, platform: e}) {
        let r = n.bindings && n.bindings.find((t => t instanceof TranslationBinding && t.target === i));
        if (!r) {
            r = new TranslationBinding(n, s, t, e, i);
            n.addBinding(r);
        }
        return r;
    }
    $bind(t) {
        if (this.isBound) return;
        if (!this.ast) throw new Error("key expression is missing");
        this.scope = t;
        this.P = this.ast instanceof n.Interpolation;
        this.M = n.astEvaluate(this.ast, t, this, this);
        this.A();
        this.parameter?.$bind(t);
        this.updateTranslations();
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        n.astUnbind(this.ast, this.scope, this);
        this.parameter?.$unbind();
        this.C.clear();
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.scope = void 0;
        this.obs.clearAll();
    }
    handleChange(t, s) {
        this.obs.version++;
        this.M = this.P ? n.astEvaluate(this.ast, this.scope, this, this) : t;
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
        const e = this.task;
        this.C.clear();
        for (const e of t) {
            const t = e.value;
            const r = this.L(e.attributes);
            for (const e of r) if (this.R(e)) n[e] = t; else {
                const n = s.CustomElement.for(this.target, g);
                const r = n?.viewModel ? this.oL.getAccessor(n.viewModel, e) : this.oL.getAccessor(this.target, e);
                const o = 1 !== this.B.state && (4 & r.type) > 0;
                if (o) i.push(new AccessorUpdateTask(r, t, this.target, e)); else r.setValue(t, this.target, e);
                this.C.add(r);
            }
        }
        let r = false;
        if (Object.keys(n).length > 0) {
            r = 1 !== this.B.state;
            if (!r) this._(n);
        }
        if (i.length > 0 || r) this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            for (const t of i) t.run();
            if (r) this._(n);
        }), m);
        e?.cancel();
    }
    L(t) {
        if (0 === t.length) t = "IMG" === this.target.tagName ? [ "src" ] : [ "textContent" ];
        for (const [s, n] of x) {
            const i = t.findIndex((t => t === s));
            if (i > -1) t.splice(i, 1, n);
        }
        return t;
    }
    R(t) {
        return this.T.includes(t);
    }
    _(s) {
        const n = t.toArray(this.target.childNodes);
        const i = [];
        const e = "au-i18n";
        for (const t of n) if (!Reflect.get(t, e)) i.push(t);
        const r = this.N(s, e, i);
        this.target.innerHTML = "";
        for (const s of t.toArray(r.content.childNodes)) this.target.appendChild(s);
    }
    N(t, s, n) {
        const i = this.platform.document.createElement("template");
        this.O(i, t.prepend, s);
        if (!this.O(i, t.innerHTML ?? t.textContent, s)) for (const t of n) i.content.append(t);
        this.O(i, t.append, s);
        return i;
    }
    O(s, n, i) {
        if (void 0 !== n && null !== n) {
            const e = this.platform.document.createElement("div");
            e.innerHTML = n;
            for (const n of t.toArray(e.childNodes)) {
                Reflect.set(n, i, true);
                s.content.append(n);
            }
            return true;
        }
        return false;
    }
    A() {
        const t = this.M ?? (this.M = "");
        const s = typeof t;
        if ("string" !== s) throw new Error(`Expected the i18n key to be a string, but got ${t} of type ${s}`);
    }
}

n.connectable(TranslationBinding);

s.implementAstEvaluator(true)(TranslationBinding);

s.mixingBindingLimited(TranslationBinding, (() => "updateTranslations"));

class AccessorUpdateTask {
    constructor(t, s, n, i) {
        this.accessor = t;
        this.v = s;
        this.el = n;
        this.attr = i;
    }
    run() {
        this.accessor.setValue(this.v, this.el, this.attr);
    }
}

class ParameterBinding {
    constructor(t, s, n) {
        this.owner = t;
        this.ast = s;
        this.updater = n;
        this.isBound = false;
        this.boundFn = false;
        this.oL = t.oL;
        this.locator = t.locator;
    }
    handleChange(t, s) {
        if (!this.isBound) return;
        this.obs.version++;
        this.value = n.astEvaluate(this.ast, this.scope, this, this);
        this.obs.clear();
        this.updater();
    }
    $bind(t) {
        if (this.isBound) return;
        this.scope = t;
        n.astBind(this.ast, t, this);
        this.value = n.astEvaluate(this.ast, t, this, this);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        n.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.obs.clearAll();
    }
}

n.connectable(ParameterBinding);

s.implementAstEvaluator(true)(ParameterBinding);

const b = "tpt";

const T = "t-params.bind";

exports.TranslationParametersAttributePattern = class TranslationParametersAttributePattern {
    [T](t, n, i) {
        return new s.AttrSyntax(t, n, "", T);
    }
};

exports.TranslationParametersAttributePattern = o([ s.attributePattern({
    pattern: T,
    symbols: ""
}) ], exports.TranslationParametersAttributePattern);

class TranslationParametersBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.to = s;
        this.type = b;
        this.mode = 2;
    }
}

exports.TranslationParametersBindingCommand = class TranslationParametersBindingCommand {
    constructor() {
        this.type = 0;
    }
    get name() {
        return T;
    }
    build(s, n, i) {
        const e = s.attr;
        let r = e.target;
        if (null == s.bindable) r = i.map(s.node, r) ?? t.camelCase(r); else r = s.bindable.property;
        return new TranslationParametersBindingInstruction(n.parse(e.rawValue, 8), r);
    }
};

exports.TranslationParametersBindingCommand = o([ s.bindingCommand(T) ], exports.TranslationParametersBindingCommand);

exports.TranslationParametersBindingRenderer = class TranslationParametersBindingRenderer {
    constructor(t, s, n) {
        this.ep = t;
        this.oL = s;
        this.p = n;
    }
    render(t, s, n) {
        TranslationBinding.create({
            parser: this.ep,
            observerLocator: this.oL,
            context: t.container,
            controller: t,
            target: s,
            instruction: n,
            isParameterContext: true,
            platform: this.p
        });
    }
};

exports.TranslationParametersBindingRenderer.inject = [ n.IExpressionParser, n.IObserverLocator, s.IPlatform ];

exports.TranslationParametersBindingRenderer = o([ s.renderer(b) ], exports.TranslationParametersBindingRenderer);

const B = "tt";

class TranslationAttributePattern {
    static registerAlias(t) {
        this.prototype[t] = function(n, i, e) {
            return new s.AttrSyntax(n, i, "", t);
        };
    }
}

class TranslationBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.to = s;
        this.type = B;
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
    build(s, i, e) {
        let r;
        if (null == s.bindable) r = e.map(s.node, s.attr.target) ?? t.camelCase(s.attr.target); else r = s.bindable.property;
        return new TranslationBindingInstruction(new n.CustomExpression(s.attr.rawValue), r);
    }
}

exports.TranslationBindingRenderer = class TranslationBindingRenderer {
    constructor(t, s, n) {
        this.ep = t;
        this.oL = s;
        this.p = n;
    }
    render(t, s, n) {
        TranslationBinding.create({
            parser: this.ep,
            observerLocator: this.oL,
            context: t.container,
            controller: t,
            target: s,
            instruction: n,
            platform: this.p
        });
    }
};

exports.TranslationBindingRenderer.inject = [ n.IExpressionParser, n.IObserverLocator, s.IPlatform ];

exports.TranslationBindingRenderer = o([ s.renderer(B) ], exports.TranslationBindingRenderer);

const v = "tbt";

class TranslationBindAttributePattern {
    static registerAlias(t) {
        const n = `${t}.bind`;
        this.prototype[n] = function(t, i, e) {
            return new s.AttrSyntax(t, i, e[1], n);
        };
    }
}

class TranslationBindBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.to = s;
        this.type = v;
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
    build(s, n, i) {
        let e;
        if (null == s.bindable) e = i.map(s.node, s.attr.target) ?? t.camelCase(s.attr.target); else e = s.bindable.property;
        return new TranslationBindBindingInstruction(n.parse(s.attr.rawValue, 8), e);
    }
}

exports.TranslationBindBindingRenderer = class TranslationBindBindingRenderer {
    constructor(t, s, n) {
        this.parser = t;
        this.oL = s;
        this.p = n;
    }
    render(t, s, n) {
        TranslationBinding.create({
            parser: this.parser,
            observerLocator: this.oL,
            context: t.container,
            controller: t,
            target: s,
            instruction: n,
            platform: this.p
        });
    }
};

exports.TranslationBindBindingRenderer = o([ s.renderer(v), a(0, n.IExpressionParser), a(1, n.IObserverLocator), a(2, s.IPlatform) ], exports.TranslationBindBindingRenderer);

exports.TranslationValueConverter = class TranslationValueConverter {
    constructor(t) {
        this.i18n = t;
        this.signals = [ "aurelia-translation-signal" ];
    }
    toView(t, s) {
        return this.i18n.tr(t, s);
    }
};

exports.TranslationValueConverter = o([ s.valueConverter("t"), a(0, f) ], exports.TranslationValueConverter);

const w = [ exports.TranslationValueConverter, exports.TranslationBindingBehavior ];

function y(n) {
    const i = n.translationAttributeAliases;
    const e = Array.isArray(i) ? i : [ "t" ];
    const r = [];
    const o = [];
    const a = [];
    const h = [];
    for (const t of e) {
        const s = `${t}.bind`;
        r.push({
            pattern: t,
            symbols: ""
        });
        TranslationAttributePattern.registerAlias(t);
        o.push({
            pattern: s,
            symbols: "."
        });
        TranslationBindAttributePattern.registerAlias(t);
        if ("t" !== t) {
            a.push(t);
            h.push(s);
        }
    }
    const c = [ s.AttributePattern.define(r, TranslationAttributePattern), s.BindingCommand.define({
        name: "t",
        aliases: a
    }, TranslationBindingCommand), exports.TranslationBindingRenderer, s.AttributePattern.define(o, TranslationBindAttributePattern), s.BindingCommand.define({
        name: "t.bind",
        aliases: h
    }, TranslationBindBindingCommand), exports.TranslationBindBindingRenderer, exports.TranslationParametersAttributePattern, exports.TranslationParametersBindingCommand, exports.TranslationParametersBindingRenderer ];
    return {
        register(i) {
            return i.register(t.Registration.callback(l, (() => n.initOptions)), s.AppTask.activating(f, (t => t.initPromise)), t.Registration.singleton(u, I18nextWrapper), t.Registration.singleton(f, exports.I18nService), ...c, ...w);
        }
    };
}

const C = [ exports.DateFormatValueConverter, exports.DateFormatBindingBehavior ];

const I = [ exports.NumberFormatValueConverter, exports.NumberFormatBindingBehavior ];

const P = [ exports.RelativeTimeValueConverter, exports.RelativeTimeBindingBehavior ];

function M(t) {
    return {
        optionsProvider: t,
        register(s) {
            const n = {
                initOptions: Object.create(null)
            };
            t(n);
            return s.register(y(n), ...C, ...I, ...P);
        },
        customize(s) {
            return M(s || t);
        }
    };
}

const A = M((() => {}));

exports.I18N = f;

exports.I18nConfiguration = A;

exports.I18nInitOptions = l;

exports.I18nKeyEvaluationResult = I18nKeyEvaluationResult;

exports.TranslationAttributePattern = TranslationAttributePattern;

exports.TranslationBindAttributePattern = TranslationBindAttributePattern;

exports.TranslationBindBindingCommand = TranslationBindBindingCommand;

exports.TranslationBindBindingInstruction = TranslationBindBindingInstruction;

exports.TranslationBindInstructionType = v;

exports.TranslationBinding = TranslationBinding;

exports.TranslationBindingCommand = TranslationBindingCommand;

exports.TranslationBindingInstruction = TranslationBindingInstruction;

exports.TranslationInstructionType = B;

exports.TranslationParametersBindingInstruction = TranslationParametersBindingInstruction;

exports.TranslationParametersInstructionType = b;
//# sourceMappingURL=index.cjs.map
