import { DI as t, IServiceLocator as i, optional as s, Registration as e, noop as n } from "../../../kernel/dist/native-modules/index.mjs";

import { parsePropertyName as r, ValidationResult as o, ValidateInstruction as a, PropertyRule as h, IValidator as l, getDefaultValidationConfiguration as c, ValidationConfiguration as u } from "../../../validation/dist/native-modules/index.mjs";

import { IPlatform as d, bindable as f, INode as v, BindingMode as g, customAttribute as w, bindingBehavior as p, astEvaluator as b, BindingInterceptor as m, PropertyBinding as V, CustomElement as y } from "../../../runtime-html/dist/native-modules/index.mjs";

import { IExpressionParser as C, connectable as E } from "../../../runtime/dist/native-modules/index.mjs";

function R(t, i, s, e) {
    var n = arguments.length, r = n < 3 ? i : null === e ? e = Object.getOwnPropertyDescriptor(i, s) : e, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, i, s, e); else for (var a = t.length - 1; a >= 0; a--) if (o = t[a]) r = (n < 3 ? o(r) : n > 3 ? o(i, s, r) : o(i, s)) || r;
    return n > 3 && r && Object.defineProperty(i, s, r), r;
}

function B(t, i) {
    return function(s, e) {
        i(s, e, t);
    };
}

var $;

(function(t) {
    t["validate"] = "validate";
    t["reset"] = "reset";
})($ || ($ = {}));

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

function T(t, i, s = 0) {
    let e = i.propertyInfo;
    if (void 0 !== e) return e;
    const n = i.scope;
    let r = t.ast.expression;
    let o = true;
    let a = "";
    while (void 0 !== r && 10082 !== r?.$kind) {
        let i;
        switch (r.$kind) {
          case 38963:
          case 36914:
            r = r.expression;
            continue;

          case 9323:
            i = r.name;
            break;

          case 9324:
            {
                const s = r.key;
                if (o) o = 17925 === s.$kind;
                i = `[${s.evaluate(n, t, null).toString()}]`;
                break;
            }

          default:
            throw new Error(`Unknown expression of type ${r.constructor.name}`);
        }
        const s = a.startsWith("[") ? "" : ".";
        a = 0 === a.length ? i : `${i}${s}${a}`;
        r = r.object;
    }
    if (void 0 === r) throw new Error(`Unable to parse binding expression: ${t.ast.expression}`);
    let h;
    if (0 === a.length) {
        a = r.name;
        h = n.bindingContext;
    } else h = r.evaluate(n, t, null);
    if (null === h || void 0 === h) return;
    e = new PropertyInfo(h, a);
    if (o) i.propertyInfo = e;
    return e;
}

const M = t.createInterface("IValidationController");

let A = class ValidationController {
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
    addError(t, i, s) {
        let e;
        if (void 0 !== s) [e] = r(s, this.parser);
        const n = new o(false, t, e, i, void 0, void 0, true);
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
        const {object: i, objectTag: s, flags: e} = t ?? {};
        let n;
        if (void 0 !== i) n = [ new a(i, t.propertyName, t.rules ?? this.objects.get(i), s, t.propertyTag) ]; else n = [ ...Array.from(this.objects.entries()).map((([t, i]) => new a(t, void 0, i, s))), ...(!s ? Array.from(this.bindings.entries()) : []).reduce(((t, [i, s]) => {
            const n = T(i, s, e);
            if (void 0 !== n && !this.objects.has(n.object)) t.push(new a(n.object, n.propertyName, s.rules));
            return t;
        }), []) ];
        this.validating = true;
        const r = this.platform.domReadQueue.queueTask((async () => {
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
        return r.result;
    }
    reset(t) {
        const i = this.getInstructionPredicate(t);
        const s = this.results.filter(i);
        this.processResultDelta("reset", s, []);
    }
    async validateBinding(t) {
        if (!t.isBound) return;
        const i = this.bindings.get(t);
        if (void 0 === i) return;
        const s = T(t, i);
        const e = i.rules;
        if (void 0 === s) return;
        const {object: n, propertyName: r} = s;
        await this.validate(new a(n, r, e));
    }
    resetBinding(t) {
        const i = this.bindings.get(t);
        if (void 0 === i) return;
        const s = T(t, i);
        if (void 0 === s) return;
        i.propertyInfo = void 0;
        const {object: e, propertyName: n} = s;
        this.reset(new a(e, n));
    }
    async revalidateErrors() {
        const t = this.results.reduce(((t, {isManual: i, object: s, propertyRule: e, rule: n, valid: r}) => {
            if (!r && !i && void 0 !== e && void 0 !== s && void 0 !== n) {
                let i = t.get(s);
                if (void 0 === i) t.set(s, i = new Map);
                let r = i.get(e);
                if (void 0 === r) i.set(e, r = []);
                r.push(n);
            }
            return t;
        }), new Map);
        const i = [];
        for (const [s, e] of t) i.push(this.validate(new a(s, void 0, Array.from(e).map((([{validationRules: t, messageProvider: i, property: s}, e]) => new h(this.locator, t, i, s, [ e ]))))));
        await Promise.all(i);
    }
    getInstructionPredicate(t) {
        if (void 0 === t) return () => true;
        const i = t.propertyName;
        const s = t.rules;
        return e => !e.isManual && e.object === t.object && (void 0 === i || e.propertyName === i) && (void 0 === s || s.includes(e.propertyRule) || s.some((t => void 0 === e.propertyRule || t.$rules.flat().every((t => e.propertyRule.$rules.flat().includes(t))))));
    }
    getAssociatedElements({object: t, propertyName: i}) {
        const s = [];
        for (const [e, n] of this.bindings.entries()) {
            const r = T(e, n);
            if (void 0 !== r && r.object === t && r.propertyName === i) s.push(n.target);
        }
        return s;
    }
    processResultDelta(t, i, s) {
        const e = new ValidationEvent(t, [], []);
        s = s.slice(0);
        const n = this.elements;
        for (const t of i) {
            const i = n.get(t);
            n.delete(t);
            e.removedResults.push(new ValidationResultTarget(t, i));
            const r = s.findIndex((i => i.rule === t.rule && i.object === t.object && i.propertyName === t.propertyName));
            if (-1 === r) this.results.splice(this.results.indexOf(t), 1); else {
                const i = s.splice(r, 1)[0];
                const o = this.getAssociatedElements(i);
                n.set(i, o);
                e.addedResults.push(new ValidationResultTarget(i, o));
                this.results.splice(this.results.indexOf(t), 1, i);
            }
        }
        for (const t of s) {
            const i = this.getAssociatedElements(t);
            e.addedResults.push(new ValidationResultTarget(t, i));
            n.set(t, i);
            this.results.push(t);
        }
        for (const t of this.subscribers) t.handleValidationEvent(e);
    }
};

A = R([ B(0, l), B(1, C), B(2, d), B(3, i) ], A);

class ValidationControllerFactory {
    constructor() {
        this.Type = void 0;
    }
    registerTransformer(t) {
        return false;
    }
    construct(t, i) {
        return t.invoke(A, i);
    }
}

function j(t, i) {
    switch (2 & t.compareDocumentPosition(i)) {
      case 0:
        return 0;

      case 2:
        return 1;

      default:
        return -1;
    }
}

const I = `\n<slot></slot>\n<slot name='secondary'>\n  <span repeat.for="error of errors">\n    \${error.result.message}\n  </span>\n</slot>\n`;

const k = {
    name: "validation-container",
    shadowOptions: {
        mode: "open"
    },
    hasSlots: true
};

let P = class ValidationContainerCustomElement {
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
            return j(t.targets[0], i.targets[0]);
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

R([ f ], P.prototype, "controller", void 0);

R([ f ], P.prototype, "errors", void 0);

P = R([ B(0, v), B(1, s(M)) ], P);

let D = class ValidationErrorsCustomAttribute {
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
            return j(t.targets[0], i.targets[0]);
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

R([ f ], D.prototype, "controller", void 0);

R([ f({
    primary: true,
    mode: g.twoWay
}) ], D.prototype, "errors", void 0);

D = R([ w("validation-errors"), B(0, v), B(1, s(M)) ], D);

var O;

(function(t) {
    t["manual"] = "manual";
    t["blur"] = "blur";
    t["focusout"] = "focusout";
    t["change"] = "change";
    t["changeOrBlur"] = "changeOrBlur";
    t["changeOrFocusout"] = "changeOrFocusout";
})(O || (O = {}));

const S = t.createInterface("IDefaultTrigger");

let U = class ValidateBindingBehavior extends m {
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
        const s = this.locator;
        this.platform = s.get(d);
        this.defaultTrigger = s.get(S);
        if (s.has(M, true)) this.scopedController = s.get(M);
        this.t();
    }
    updateSource(t) {
        if (this.interceptor !== this) this.interceptor.updateSource(t); else this.propertyBinding.updateSource(t);
        this.isDirty = true;
        const i = this.triggerEvent;
        if (this.isChangeTrigger && (null === i || null !== i && this.validatedOnce)) this.validateBinding();
    }
    handleEvent(t) {
        if (!this.isChangeTrigger || this.isChangeTrigger && this.isDirty) this.validateBinding();
    }
    $bind(t) {
        this.scope = t;
        this.binding.$bind(t);
        this.i();
        const i = this.h();
        this.u(i);
    }
    $unbind() {
        this.task?.cancel();
        this.task = null;
        const t = this.triggerEvent;
        if (null !== t) this.target?.removeEventListener(t, this);
        this.controller?.removeSubscriber(this);
        this.controller?.unregisterBinding(this.propertyBinding);
        this.binding.$unbind();
    }
    handleTriggerChange(t, i) {
        this.u(new ValidateArgumentsDelta(void 0, this.V(t), void 0));
    }
    handleControllerChange(t, i) {
        this.u(new ValidateArgumentsDelta(this.C(t), void 0, void 0));
    }
    handleRulesChange(t, i) {
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
    h() {
        const t = this.scope;
        let i;
        let s;
        let e;
        let n = this.propertyBinding.ast;
        while ("validate" !== n.name && void 0 !== n) n = n.expression;
        const r = n.args;
        for (let n = 0, o = r.length; n < o; n++) {
            const o = r[n];
            switch (n) {
              case 0:
                s = this.V(o.evaluate(t, this, this.triggerMediator));
                break;

              case 1:
                e = this.C(o.evaluate(t, this, this.controllerMediator));
                break;

              case 2:
                i = this.R(o.evaluate(t, this, this.rulesMediator));
                break;

              default:
                throw new Error(`Unconsumed argument#${n + 1} for validate binding behavior: ${o.evaluate(t, this, null)}`);
            }
        }
        return new ValidateArgumentsDelta(this.C(e), this.V(s), i);
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
            this.isChangeTrigger = i === O.change || i === O.changeOrBlur || i === O.changeOrFocusout;
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
        if (void 0 === t || null === t) t = this.defaultTrigger; else if (!Object.values(O).includes(t)) throw new Error(`${t} is not a supported validation trigger`);
        return t;
    }
    C(t) {
        if (void 0 === t || null === t) t = this.scopedController; else if (!(t instanceof A)) throw new Error(`${t} is not of type ValidationController`);
        return t;
    }
    R(t) {
        if (Array.isArray(t) && t.every((t => t instanceof h))) return t;
    }
    t() {
        let t = this.binding;
        while (!(t instanceof V) && void 0 !== t) t = t.binding;
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
          case O.blur:
          case O.changeOrBlur:
            i = "blur";
            break;

          case O.focusout:
          case O.changeOrFocusout:
            i = "focusout";
            break;
        }
        return this.triggerEvent = i;
    }
    setBindingInfo(t) {
        return this.bindingInfo = new BindingInfo(this.target, this.scope, t);
    }
};

U = R([ p("validate") ], U);

E()(U);

b(true)(U);

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
    handleChange(t, i) {
        this.binding[this.key](t, i);
    }
}

E()(BindingMediator);

b(true)(BindingMediator);

function _() {
    return {
        ...c(),
        ValidationControllerFactoryType: ValidationControllerFactory,
        DefaultTrigger: O.focusout,
        UseSubscriberCustomAttribute: true,
        SubscriberCustomElementTemplate: I
    };
}

function x(t) {
    return {
        optionsProvider: t,
        register(i) {
            const s = _();
            t(s);
            i.registerFactory(M, new s.ValidationControllerFactoryType);
            i.register(u.customize((t => {
                for (const i of Object.keys(t)) if (i in s) t[i] = s[i];
            })), e.instance(S, s.DefaultTrigger), U);
            if (s.UseSubscriberCustomAttribute) i.register(D);
            const n = s.SubscriberCustomElementTemplate;
            if (n) i.register(y.define({
                ...k,
                template: n
            }, P));
            return i;
        },
        customize(i) {
            return x(i ?? t);
        }
    };
}

const F = x(n);

const N = "validation-result-id";

const z = "validation-result-container";

const W = t.createInterface("IValidationResultPresenterService", (t => t.transient(q)));

let q = class ValidationResultPresenterService {
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
        let s = i.querySelector(`[${z}]`);
        if (null === s) {
            s = this.platform.document.createElement("div");
            s.setAttribute(z, "");
            i.appendChild(s);
        }
        return s;
    }
    showResults(t, i) {
        t.append(...i.reduce(((t, i) => {
            if (!i.valid) {
                const s = this.platform.document.createElement("span");
                s.setAttribute(N, i.id.toString());
                s.textContent = i.message;
                t.push(s);
            }
            return t;
        }), []));
    }
    removeResults(t, i) {
        for (const s of i) if (!s.valid) t.querySelector(`[${N}="${s.id}"]`)?.remove();
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

q = R([ B(0, d) ], q);

export { BindingInfo, BindingMediator, ControllerValidateResult, S as IDefaultTrigger, M as IValidationController, W as IValidationResultPresenterService, U as ValidateBindingBehavior, $ as ValidateEventKind, P as ValidationContainerCustomElement, A as ValidationController, ValidationControllerFactory, D as ValidationErrorsCustomAttribute, ValidationEvent, F as ValidationHtmlConfiguration, q as ValidationResultPresenterService, ValidationResultTarget, O as ValidationTrigger, k as defaultContainerDefinition, I as defaultContainerTemplate, _ as getDefaultValidationHtmlConfiguration, T as getPropertyInfo };

