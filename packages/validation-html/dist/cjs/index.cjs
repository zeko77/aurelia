"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var i = require("@aurelia/validation");

var s = require("@aurelia/runtime-html");

var e = require("@aurelia/runtime");

function r(t, i, s, e) {
    var r = arguments.length, n = r < 3 ? i : null === e ? e = Object.getOwnPropertyDescriptor(i, s) : e, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) n = Reflect.decorate(t, i, s, e); else for (var a = t.length - 1; a >= 0; a--) if (o = t[a]) n = (r < 3 ? o(n) : r > 3 ? o(i, s, n) : o(i, s)) || n;
    return r > 3 && n && Object.defineProperty(i, s, n), n;
}

function n(t, i) {
    return function(s, e) {
        i(s, e, t);
    };
}

exports.ValidateEventKind = void 0;

(function(t) {
    t["validate"] = "validate";
    t["reset"] = "reset";
})(exports.ValidateEventKind || (exports.ValidateEventKind = {}));

class ControllerValidateResult {
    constructor(t, i, s) {
        this.valid = t;
        this.results = i;
        this.instruction = s;
    }
}

class ValidationResultTarget {
    constructor(t, i) {
        this.result = t;
        this.targets = i;
    }
}

class ValidationEvent {
    constructor(t, i, s) {
        this.kind = t;
        this.addedResults = i;
        this.removedResults = s;
    }
}

class BindingInfo {
    constructor(t, i, s, e = void 0) {
        this.target = t;
        this.scope = i;
        this.rules = s;
        this.propertyInfo = e;
    }
}

class PropertyInfo {
    constructor(t, i) {
        this.object = t;
        this.propertyName = i;
    }
}

function o(t, i, s = 0) {
    let e = i.propertyInfo;
    if (void 0 !== e) return e;
    const r = i.scope;
    let n = t.ast.expression;
    let o = true;
    let a = "";
    while (void 0 !== n && 10082 !== n?.$kind) {
        let i;
        switch (n.$kind) {
          case 38963:
          case 36914:
            n = n.expression;
            continue;

          case 9323:
            i = n.name;
            break;

          case 9324:
            {
                const s = n.key;
                if (o) o = 17925 === s.$kind;
                i = `[${s.evaluate(r, t, null).toString()}]`;
                break;
            }

          default:
            throw new Error(`Unknown expression of type ${n.constructor.name}`);
        }
        const s = a.startsWith("[") ? "" : ".";
        a = 0 === a.length ? i : `${i}${s}${a}`;
        n = n.object;
    }
    if (void 0 === n) throw new Error(`Unable to parse binding expression: ${t.ast.expression}`);
    let h;
    if (0 === a.length) {
        a = n.name;
        h = r.bindingContext;
    } else h = n.evaluate(r, t, null);
    if (null === h || void 0 === h) return;
    e = new PropertyInfo(h, a);
    if (o) i.propertyInfo = e;
    return e;
}

const a = t.DI.createInterface("IValidationController");

exports.ValidationController = class ValidationController {
    constructor(t, i, s, e) {
        this.validator = t;
        this.parser = i;
        this.platform = s;
        this.locator = e;
        this.bindings = new Map;
        this.subscribers = new Set;
        this.results = [];
        this.validating = false;
        this.elements = new WeakMap;
        this.objects = new Map;
    }
    addObject(t, i) {
        this.objects.set(t, i);
    }
    removeObject(t) {
        this.objects.delete(t);
        this.processResultDelta("reset", this.results.filter((i => i.object === t)), []);
    }
    addError(t, s, e) {
        let r;
        if (void 0 !== e) [r] = i.parsePropertyName(e, this.parser);
        const n = new i.ValidationResult(false, t, r, s, void 0, void 0, true);
        this.processResultDelta("validate", [], [ n ]);
        return n;
    }
    removeError(t) {
        if (this.results.includes(t)) this.processResultDelta("reset", [ t ], []);
    }
    addSubscriber(t) {
        this.subscribers.add(t);
    }
    removeSubscriber(t) {
        this.subscribers.delete(t);
    }
    registerBinding(t, i) {
        this.bindings.set(t, i);
    }
    unregisterBinding(t) {
        this.resetBinding(t);
        this.bindings.delete(t);
    }
    async validate(t) {
        const {object: s, objectTag: e, flags: r} = t ?? {};
        let n;
        if (void 0 !== s) n = [ new i.ValidateInstruction(s, t.propertyName, t.rules ?? this.objects.get(s), e, t.propertyTag) ]; else n = [ ...Array.from(this.objects.entries()).map((([t, s]) => new i.ValidateInstruction(t, void 0, s, e))), ...(!e ? Array.from(this.bindings.entries()) : []).reduce(((t, [s, e]) => {
            const n = o(s, e, r);
            if (void 0 !== n && !this.objects.has(n.object)) t.push(new i.ValidateInstruction(n.object, n.propertyName, e.rules));
            return t;
        }), []) ];
        this.validating = true;
        const a = this.platform.domReadQueue.queueTask((async () => {
            try {
                const i = await Promise.all(n.map((async t => this.validator.validate(t))));
                const s = i.reduce(((t, i) => {
                    t.push(...i);
                    return t;
                }), []);
                const e = this.getInstructionPredicate(t);
                const r = this.results.filter(e);
                this.processResultDelta("validate", r, s);
                return new ControllerValidateResult(void 0 === s.find((t => !t.valid)), s, t);
            } finally {
                this.validating = false;
            }
        }));
        return a.result;
    }
    reset(t) {
        const i = this.getInstructionPredicate(t);
        const s = this.results.filter(i);
        this.processResultDelta("reset", s, []);
    }
    async validateBinding(t) {
        if (!t.isBound) return;
        const s = this.bindings.get(t);
        if (void 0 === s) return;
        const e = o(t, s);
        const r = s.rules;
        if (void 0 === e) return;
        const {object: n, propertyName: a} = e;
        await this.validate(new i.ValidateInstruction(n, a, r));
    }
    resetBinding(t) {
        const s = this.bindings.get(t);
        if (void 0 === s) return;
        const e = o(t, s);
        if (void 0 === e) return;
        s.propertyInfo = void 0;
        const {object: r, propertyName: n} = e;
        this.reset(new i.ValidateInstruction(r, n));
    }
    async revalidateErrors() {
        const t = this.results.reduce(((t, {isManual: i, object: s, propertyRule: e, rule: r, valid: n}) => {
            if (!n && !i && void 0 !== e && void 0 !== s && void 0 !== r) {
                let i = t.get(s);
                if (void 0 === i) t.set(s, i = new Map);
                let n = i.get(e);
                if (void 0 === n) i.set(e, n = []);
                n.push(r);
            }
            return t;
        }), new Map);
        const s = [];
        for (const [e, r] of t) s.push(this.validate(new i.ValidateInstruction(e, void 0, Array.from(r).map((([{validationRules: t, messageProvider: s, property: e}, r]) => new i.PropertyRule(this.locator, t, s, e, [ r ]))))));
        await Promise.all(s);
    }
    getInstructionPredicate(t) {
        if (void 0 === t) return () => true;
        const i = t.propertyName;
        const s = t.rules;
        return e => !e.isManual && e.object === t.object && (void 0 === i || e.propertyName === i) && (void 0 === s || s.includes(e.propertyRule) || s.some((t => void 0 === e.propertyRule || t.$rules.flat().every((t => e.propertyRule.$rules.flat().includes(t))))));
    }
    getAssociatedElements({object: t, propertyName: i}) {
        const s = [];
        for (const [e, r] of this.bindings.entries()) {
            const n = o(e, r);
            if (void 0 !== n && n.object === t && n.propertyName === i) s.push(r.target);
        }
        return s;
    }
    processResultDelta(t, i, s) {
        const e = new ValidationEvent(t, [], []);
        s = s.slice(0);
        const r = this.elements;
        for (const t of i) {
            const i = r.get(t);
            r.delete(t);
            e.removedResults.push(new ValidationResultTarget(t, i));
            const n = s.findIndex((i => i.rule === t.rule && i.object === t.object && i.propertyName === t.propertyName));
            if (-1 === n) this.results.splice(this.results.indexOf(t), 1); else {
                const i = s.splice(n, 1)[0];
                const o = this.getAssociatedElements(i);
                r.set(i, o);
                e.addedResults.push(new ValidationResultTarget(i, o));
                this.results.splice(this.results.indexOf(t), 1, i);
            }
        }
        for (const t of s) {
            const i = this.getAssociatedElements(t);
            e.addedResults.push(new ValidationResultTarget(t, i));
            r.set(t, i);
            this.results.push(t);
        }
        for (const t of this.subscribers) t.handleValidationEvent(e);
    }
};

exports.ValidationController = r([ n(0, i.IValidator), n(1, e.IExpressionParser), n(2, s.IPlatform), n(3, t.IServiceLocator) ], exports.ValidationController);

class ValidationControllerFactory {
    constructor() {
        this.Type = void 0;
    }
    registerTransformer(t) {
        return false;
    }
    construct(t, i) {
        return t.invoke(exports.ValidationController, i);
    }
}

function h(t, i) {
    switch (2 & t.compareDocumentPosition(i)) {
      case 0:
        return 0;

      case 2:
        return 1;

      default:
        return -1;
    }
}

const l = `\n<slot></slot>\n<slot name='secondary'>\n  <span repeat.for="error of errors">\n    \${error.result.message}\n  </span>\n</slot>\n`;

const c = {
    name: "validation-container",
    shadowOptions: {
        mode: "open"
    },
    hasSlots: true
};

exports.ValidationContainerCustomElement = class ValidationContainerCustomElement {
    constructor(t, i) {
        this.host = t;
        this.scopedController = i;
        this.errors = [];
    }
    handleValidationEvent(t) {
        for (const {result: i} of t.removedResults) {
            const t = this.errors.findIndex((t => t.result === i));
            if (-1 !== t) this.errors.splice(t, 1);
        }
        for (const {result: i, targets: s} of t.addedResults) {
            if (i.valid) continue;
            const t = s.filter((t => this.host.contains(t)));
            if (t.length > 0) this.errors.push(new ValidationResultTarget(i, t));
        }
        this.errors.sort(((t, i) => {
            if (t.targets[0] === i.targets[0]) return 0;
            return h(t.targets[0], i.targets[0]);
        }));
    }
    binding() {
        this.controller = this.controller ?? this.scopedController;
        this.controller.addSubscriber(this);
    }
    unbinding() {
        this.controller.removeSubscriber(this);
    }
};

r([ s.bindable ], exports.ValidationContainerCustomElement.prototype, "controller", void 0);

r([ s.bindable ], exports.ValidationContainerCustomElement.prototype, "errors", void 0);

exports.ValidationContainerCustomElement = r([ n(0, s.INode), n(1, t.optional(a)) ], exports.ValidationContainerCustomElement);

exports.ValidationErrorsCustomAttribute = class ValidationErrorsCustomAttribute {
    constructor(t, i) {
        this.host = t;
        this.scopedController = i;
        this.errors = [];
        this.errorsInternal = [];
    }
    handleValidationEvent(t) {
        for (const {result: i} of t.removedResults) {
            const t = this.errorsInternal.findIndex((t => t.result === i));
            if (-1 !== t) this.errorsInternal.splice(t, 1);
        }
        for (const {result: i, targets: s} of t.addedResults) {
            if (i.valid) continue;
            const t = s.filter((t => this.host.contains(t)));
            if (t.length > 0) this.errorsInternal.push(new ValidationResultTarget(i, t));
        }
        this.errorsInternal.sort(((t, i) => {
            if (t.targets[0] === i.targets[0]) return 0;
            return h(t.targets[0], i.targets[0]);
        }));
        this.errors = this.errorsInternal;
    }
    binding() {
        this.controller = this.controller ?? this.scopedController;
        this.controller.addSubscriber(this);
    }
    unbinding() {
        this.controller.removeSubscriber(this);
    }
};

r([ s.bindable ], exports.ValidationErrorsCustomAttribute.prototype, "controller", void 0);

r([ s.bindable({
    primary: true,
    mode: s.BindingMode.twoWay
}) ], exports.ValidationErrorsCustomAttribute.prototype, "errors", void 0);

exports.ValidationErrorsCustomAttribute = r([ s.customAttribute("validation-errors"), n(0, s.INode), n(1, t.optional(a)) ], exports.ValidationErrorsCustomAttribute);

exports.ValidationTrigger = void 0;

(function(t) {
    t["manual"] = "manual";
    t["blur"] = "blur";
    t["focusout"] = "focusout";
    t["change"] = "change";
    t["changeOrBlur"] = "changeOrBlur";
    t["changeOrFocusout"] = "changeOrFocusout";
})(exports.ValidationTrigger || (exports.ValidationTrigger = {}));

const u = t.DI.createInterface("IDefaultTrigger");

exports.ValidateBindingBehavior = class ValidateBindingBehavior extends s.BindingInterceptor {
    constructor(t, i) {
        super(t, i);
        this.binding = t;
        this.propertyBinding = void 0;
        this.target = void 0;
        this.isChangeTrigger = false;
        this.triggerMediator = new BindingMediator("handleTriggerChange", this, this.oL, this.locator);
        this.controllerMediator = new BindingMediator("handleControllerChange", this, this.oL, this.locator);
        this.rulesMediator = new BindingMediator("handleRulesChange", this, this.oL, this.locator);
        this.isDirty = false;
        this.validatedOnce = false;
        this.triggerEvent = null;
        this.task = null;
        const e = this.locator;
        this.platform = e.get(s.IPlatform);
        this.defaultTrigger = e.get(u);
        if (e.has(a, true)) this.scopedController = e.get(a);
        this.t();
    }
    updateSource(t, i) {
        if (this.interceptor !== this) this.interceptor.updateSource(t, i); else this.propertyBinding.updateSource(t, i);
        this.isDirty = true;
        const s = this.triggerEvent;
        if (this.isChangeTrigger && (null === s || null !== s && this.validatedOnce)) this.validateBinding();
    }
    handleEvent(t) {
        if (!this.isChangeTrigger || this.isChangeTrigger && this.isDirty) this.validateBinding();
    }
    $bind(t, i) {
        this.scope = i;
        this.binding.$bind(t, i);
        this.i();
        const s = this.h(t);
        this.u(s);
    }
    $unbind(t) {
        this.task?.cancel();
        this.task = null;
        const i = this.triggerEvent;
        if (null !== i) this.target?.removeEventListener(i, this);
        this.controller?.removeSubscriber(this);
        this.controller?.unregisterBinding(this.propertyBinding);
        this.binding.$unbind(t);
    }
    handleTriggerChange(t, i, s) {
        this.u(new ValidateArgumentsDelta(void 0, this.V(t), void 0));
    }
    handleControllerChange(t, i, s) {
        this.u(new ValidateArgumentsDelta(this.C(t), void 0, void 0));
    }
    handleRulesChange(t, i, s) {
        this.u(new ValidateArgumentsDelta(void 0, void 0, this.R(t)));
    }
    handleValidationEvent(t) {
        if (this.validatedOnce || !this.isChangeTrigger) return;
        const i = this.triggerEvent;
        if (null === i) return;
        const s = this.bindingInfo.propertyInfo?.propertyName;
        if (void 0 === s) return;
        this.validatedOnce = void 0 !== t.addedResults.find((t => t.result.propertyName === s));
    }
    h(t) {
        const i = this.scope;
        let s;
        let e;
        let r;
        let n = this.propertyBinding.ast;
        while ("validate" !== n.name && void 0 !== n) n = n.expression;
        const o = n.args;
        for (let t = 0, n = o.length; t < n; t++) {
            const n = o[t];
            switch (t) {
              case 0:
                e = this.V(n.evaluate(i, this, this.triggerMediator));
                break;

              case 1:
                r = this.C(n.evaluate(i, this, this.controllerMediator));
                break;

              case 2:
                s = this.R(n.evaluate(i, this, this.rulesMediator));
                break;

              default:
                throw new Error(`Unconsumed argument#${t + 1} for validate binding behavior: ${n.evaluate(i, this, null)}`);
            }
        }
        return new ValidateArgumentsDelta(this.C(r), this.V(e), s);
    }
    validateBinding() {
        const t = this.task;
        this.task = this.platform.domReadQueue.queueTask((() => this.controller.validateBinding(this.propertyBinding)));
        if (t !== this.task) t?.cancel();
    }
    u(t) {
        const i = t.trigger ?? this.trigger;
        const s = t.controller ?? this.controller;
        const e = t.rules;
        if (this.trigger !== i) {
            let t = this.triggerEvent;
            if (null !== t) this.target.removeEventListener(t, this);
            this.validatedOnce = false;
            this.isDirty = false;
            this.trigger = i;
            this.isChangeTrigger = i === exports.ValidationTrigger.change || i === exports.ValidationTrigger.changeOrBlur || i === exports.ValidationTrigger.changeOrFocusout;
            t = this.setTriggerEvent(this.trigger);
            if (null !== t) this.target.addEventListener(t, this);
        }
        if (this.controller !== s || void 0 !== e) {
            this.controller?.removeSubscriber(this);
            this.controller?.unregisterBinding(this.propertyBinding);
            this.controller = s;
            s.registerBinding(this.propertyBinding, this.setBindingInfo(e));
            s.addSubscriber(this);
        }
    }
    V(t) {
        if (void 0 === t || null === t) t = this.defaultTrigger; else if (!Object.values(exports.ValidationTrigger).includes(t)) throw new Error(`${t} is not a supported validation trigger`);
        return t;
    }
    C(t) {
        if (void 0 === t || null === t) t = this.scopedController; else if (!(t instanceof exports.ValidationController)) throw new Error(`${t} is not of type ValidationController`);
        return t;
    }
    R(t) {
        if (Array.isArray(t) && t.every((t => t instanceof i.PropertyRule))) return t;
    }
    t() {
        let t = this.binding;
        while (!(t instanceof s.PropertyBinding) && void 0 !== t) t = t.binding;
        if (void 0 === t) throw new Error("Unable to set property binding");
        this.propertyBinding = t;
    }
    i() {
        const t = this.propertyBinding.target;
        if (t instanceof this.platform.Node) this.target = t; else {
            const i = t?.$controller;
            if (void 0 === i) throw new Error("Invalid binding target");
            this.target = i.host;
        }
    }
    setTriggerEvent(t) {
        let i = null;
        switch (t) {
          case exports.ValidationTrigger.blur:
          case exports.ValidationTrigger.changeOrBlur:
            i = "blur";
            break;

          case exports.ValidationTrigger.focusout:
          case exports.ValidationTrigger.changeOrFocusout:
            i = "focusout";
            break;
        }
        return this.triggerEvent = i;
    }
    setBindingInfo(t) {
        return this.bindingInfo = new BindingInfo(this.target, this.scope, t);
    }
};

exports.ValidateBindingBehavior = r([ s.bindingBehavior("validate") ], exports.ValidateBindingBehavior);

e.connectable()(exports.ValidateBindingBehavior);

s.astEvaluator(true)(exports.ValidateBindingBehavior);

class ValidateArgumentsDelta {
    constructor(t, i, s) {
        this.controller = t;
        this.trigger = i;
        this.rules = s;
    }
}

class BindingMediator {
    constructor(t, i, s, e) {
        this.key = t;
        this.binding = i;
        this.oL = s;
        this.locator = e;
        this.interceptor = this;
    }
    $bind() {
        throw new Error(`AUR0213:$bind`);
    }
    $unbind() {
        throw new Error(`AUR0214:$unbind`);
    }
    handleChange(t, i, s) {
        this.binding[this.key](t, i, s);
    }
}

e.connectable()(BindingMediator);

s.astEvaluator(true)(BindingMediator);

function d() {
    return {
        ...i.getDefaultValidationConfiguration(),
        ValidationControllerFactoryType: ValidationControllerFactory,
        DefaultTrigger: exports.ValidationTrigger.focusout,
        UseSubscriberCustomAttribute: true,
        SubscriberCustomElementTemplate: l
    };
}

function f(e) {
    return {
        optionsProvider: e,
        register(r) {
            const n = d();
            e(n);
            r.registerFactory(a, new n.ValidationControllerFactoryType);
            r.register(i.ValidationConfiguration.customize((t => {
                for (const i of Object.keys(t)) if (i in n) t[i] = n[i];
            })), t.Registration.instance(u, n.DefaultTrigger), exports.ValidateBindingBehavior);
            if (n.UseSubscriberCustomAttribute) r.register(exports.ValidationErrorsCustomAttribute);
            const o = n.SubscriberCustomElementTemplate;
            if (o) r.register(s.CustomElement.define({
                ...c,
                template: o
            }, exports.ValidationContainerCustomElement));
            return r;
        },
        customize(t) {
            return f(t ?? e);
        }
    };
}

const p = f(t.noop);

const v = "validation-result-id";

const g = "validation-result-container";

const w = t.DI.createInterface("IValidationResultPresenterService", (t => t.transient(exports.ValidationResultPresenterService)));

exports.ValidationResultPresenterService = class ValidationResultPresenterService {
    constructor(t) {
        this.platform = t;
    }
    handleValidationEvent(t) {
        for (const [i, s] of this.reverseMap(t.removedResults)) this.remove(i, s);
        for (const [i, s] of this.reverseMap(t.addedResults)) this.add(i, s);
    }
    remove(t, i) {
        const s = this.getValidationMessageContainer(t);
        if (null === s) return;
        this.removeResults(s, i);
    }
    add(t, i) {
        const s = this.getValidationMessageContainer(t);
        if (null === s) return;
        this.showResults(s, i);
    }
    getValidationMessageContainer(t) {
        const i = t.parentElement;
        if (null === i) return null;
        let s = i.querySelector(`[${g}]`);
        if (null === s) {
            s = this.platform.document.createElement("div");
            s.setAttribute(g, "");
            i.appendChild(s);
        }
        return s;
    }
    showResults(t, i) {
        t.append(...i.reduce(((t, i) => {
            if (!i.valid) {
                const s = this.platform.document.createElement("span");
                s.setAttribute(v, i.id.toString());
                s.textContent = i.message;
                t.push(s);
            }
            return t;
        }), []));
    }
    removeResults(t, i) {
        for (const s of i) if (!s.valid) t.querySelector(`[${v}="${s.id}"]`)?.remove();
    }
    reverseMap(t) {
        const i = new Map;
        for (const {result: s, targets: e} of t) for (const t of e) {
            let e = i.get(t);
            if (void 0 === e) i.set(t, e = []);
            e.push(s);
        }
        return i;
    }
};

exports.ValidationResultPresenterService = r([ n(0, s.IPlatform) ], exports.ValidationResultPresenterService);

exports.BindingInfo = BindingInfo;

exports.BindingMediator = BindingMediator;

exports.ControllerValidateResult = ControllerValidateResult;

exports.IDefaultTrigger = u;

exports.IValidationController = a;

exports.IValidationResultPresenterService = w;

exports.ValidationControllerFactory = ValidationControllerFactory;

exports.ValidationEvent = ValidationEvent;

exports.ValidationHtmlConfiguration = p;

exports.ValidationResultTarget = ValidationResultTarget;

exports.defaultContainerDefinition = c;

exports.defaultContainerTemplate = l;

exports.getDefaultValidationHtmlConfiguration = d;

exports.getPropertyInfo = o;
//# sourceMappingURL=index.cjs.map
