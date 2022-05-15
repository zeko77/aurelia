"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var s = require("@aurelia/runtime");

var i = require("@aurelia/runtime-html");

const e = t.DI.createInterface("IReducerAction");

const n = "__reducer__";

const r = Object.freeze(new class {
    constructor() {
        this.isType = t => "function" === typeof t && n in t;
    }
    define(s, i) {
        const r = "string" === typeof s ? [ s, i ] : [ s, s ];
        const o = r[1];
        function h(t, ...s) {
            return o(t, ...s);
        }
        h[n] = true;
        h.register = function(s) {
            t.Registration.instance(e, r).register(s);
        };
        return h;
    }
});

const o = t.DI.createInterface("IStateContainer");

const h = t.DI.createInterface("IState");

class StateContainer {
    constructor(t, s, i) {
        this.t = new Set;
        this.i = 0;
        this.h = [];
        this._state = null !== t && void 0 !== t ? t : new State;
        this.u = new Map(s);
        this.B = i;
    }
    static register(s) {
        t.Registration.singleton(o, this).register(s);
    }
    subscribe(t) {
        this.t.add(t);
    }
    unsubscribe(t) {
        this.t.delete(t);
    }
    I(t) {
        const s = this._state;
        this._state = t;
        this.t.forEach((i => i.handleStateChange(t, s)));
    }
    getState() {
        return this._state;
    }
    C(t) {
        return this.u.get(t);
    }
    dispatch(t, ...s) {
        if (this.i > 0) {
            this.h.push({
                action: t,
                params: s
            });
            return;
        }
        this.i++;
        const i = (s, i) => {
            if (null == s) return;
            s = this.C(s);
            if (null == s) {
                if ("string" === typeof t) return;
                s = t;
            }
            let n;
            try {
                n = s(this._state, ...i);
            } catch (t) {
                this.i--;
                throw t;
            }
            if (n instanceof Promise) return n.then((t => {
                this.I(t);
                return e();
            })).then((() => {
                this.i--;
            }), (t => {
                this.i--;
                throw t;
            })); else {
                this.I(n);
                const t = e();
                if (t instanceof Promise) return t.then((() => {
                    this.i--;
                }), (t => {
                    this.i--;
                    throw t;
                })); else this.i--;
            }
        };
        const e = () => {
            if (this.h.length > 0) {
                const t = this.h.shift();
                return i(t.action, t.params);
            }
        };
        return i(t, s);
    }
}

StateContainer.inject = [ t.optional(h), t.all(e), t.ILogger ];

class State {}

function c(t, s, i, e) {
    var n = arguments.length, r = n < 3 ? s : null === e ? e = Object.getOwnPropertyDescriptor(s, i) : e, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, s, i, e); else for (var h = t.length - 1; h >= 0; h--) if (o = t[h]) r = (n < 3 ? o(r) : n > 3 ? o(s, i, r) : o(s, i)) || r;
    return n > 3 && r && Object.defineProperty(s, i, r), r;
}

exports.StateBinding = class StateBinding {
    constructor(t, s, i, e, n, r) {
        this.interceptor = this;
        this.isBound = false;
        this.v = void 0;
        this.R = void 0;
        this.A = 0;
        this.locator = t;
        this.P = s;
        this.oL = i;
        this.expr = e;
        this.target = n;
        this.prop = r;
    }
    updateTarget(t) {
        const s = this._;
        const i = this.target;
        const e = this.prop;
        const n = this.A++;
        this.$();
        if (a(t)) {
            this.R = t.subscribe((t => {
                if (n === this.A - 1) s.setValue(t, 0, i, e);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (n === this.A - 1) s.setValue(t, 0, i, e);
            }), (() => {}));
            return;
        }
        s.setValue(t, 0, i, e);
    }
    $bind(t, i) {
        if (this.isBound) return;
        this.isBound = true;
        this._ = this.oL.getAccessor(this.target, this.prop);
        const e = this.P.getState();
        const n = {
            bindingContext: e,
            $state: e,
            $store: this.P
        };
        (this.$scope = s.Scope.fromOverride(n)).parentScope = i;
        this.P.subscribe(this);
        this.updateTarget(this.v = this.expr.evaluate(1, this.$scope, this.locator, null));
    }
    $unbind() {
        if (!this.isBound) return;
        this.$();
        this.A++;
        this.isBound = false;
        this.$scope = void 0;
        this.P.unsubscribe(this);
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const e = this.expr.evaluate(1, s, this.locator, null);
        if (e !== this.v) {
            this.v = e;
            this.updateTarget(e);
        }
    }
    $() {
        if ("function" === typeof this.R) this.R(); else if (void 0 !== this.R) this.R.dispose();
        this.R = void 0;
    }
};

exports.StateBinding = c([ s.connectable() ], exports.StateBinding);

function a(t) {
    return t instanceof Object && "subscribe" in t;
}

exports.StateDispatchActionBinding = class StateDispatchActionBinding {
    constructor(t, s, i, e, n) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = t;
        this.P = s;
        this.expr = i;
        this.target = e;
        this.prop = n;
    }
    callSource(t) {
        const s = this.$scope;
        s.overrideContext.$event = t;
        const i = this.expr.evaluate(1, s, this.locator, null);
        delete s.overrideContext.$event;
        void this.P.dispatch("event", {
            target: this.target,
            event: this.prop,
            value: i
        });
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, i) {
        if (this.isBound) return;
        this.isBound = true;
        const e = this.P.getState();
        const n = {
            bindingContext: e,
            $state: e,
            $store: this.P
        };
        (this.$scope = s.Scope.fromOverride(n)).parentScope = i;
        this.target.addEventListener(this.prop, this);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        this.target.removeEventListener(this.prop, this);
    }
};

exports.StateDispatchActionBinding = c([ s.connectable() ], exports.StateDispatchActionBinding);

exports.StateAttributePattern = class StateAttributePattern {
    "PART.state"(t, s, e) {
        return new i.AttrSyntax(t, s, e[0], "state");
    }
};

exports.StateAttributePattern = c([ i.attributePattern({
    pattern: "PART.state",
    symbols: "."
}) ], exports.StateAttributePattern);

exports.DispatchAttributePattern = class DispatchAttributePattern {
    "PART.dispatch"(t, s, e) {
        return new i.AttrSyntax(t, s, e[0], "dispatch");
    }
};

exports.DispatchAttributePattern = c([ i.attributePattern({
    pattern: "PART.dispatch",
    symbols: "."
}) ], exports.DispatchAttributePattern);

exports.StateBindingCommand = class StateBindingCommand {
    constructor(t) {
        this.m = t;
        this.type = 0;
    }
    get name() {
        return "state";
    }
    build(s) {
        var i;
        const e = s.attr;
        let n = e.target;
        let r = e.rawValue;
        if (null == s.bindable) n = null !== (i = this.m.map(s.node, n)) && void 0 !== i ? i : t.camelCase(n); else {
            if ("" === r && 1 === s.def.type) r = t.camelCase(n);
            n = s.bindable.property;
        }
        return new StateBindingInstruction(r, n);
    }
};

exports.StateBindingCommand.inject = [ i.IAttrMapper ];

exports.StateBindingCommand = c([ i.bindingCommand("state") ], exports.StateBindingCommand);

exports.DispatchBindingCommand = class DispatchBindingCommand {
    constructor(t) {
        this.m = t;
        this.type = 1;
    }
    get name() {
        return "dispatch";
    }
    build(t) {
        const s = t.attr;
        return new DispatchBindingInstruction(s.target, s.rawValue);
    }
};

exports.DispatchBindingCommand.inject = [ i.IAttrMapper ];

exports.DispatchBindingCommand = c([ i.bindingCommand("dispatch") ], exports.DispatchBindingCommand);

class StateBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.to = s;
        this.type = "sb";
    }
}

class DispatchBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.expr = s;
        this.type = "sd";
    }
}

exports.StateBindingInstructionRenderer = class StateBindingInstructionRenderer {
    constructor(t, s, i) {
        this.ep = t;
        this.oL = s;
        this.P = i;
    }
    render(t, s, i) {
        const e = new exports.StateBinding(t.container, this.P, this.oL, u(this.ep, i.from, 4), s, i.to);
        t.addBinding(e);
    }
};

exports.StateBindingInstructionRenderer.inject = [ s.IExpressionParser, s.IObserverLocator, o ];

exports.StateBindingInstructionRenderer = c([ i.renderer("sb") ], exports.StateBindingInstructionRenderer);

exports.DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(t, s, i) {
        this.ep = t;
        this.oL = s;
        this.P = i;
    }
    render(t, s, e) {
        const n = u(this.ep, e.expr, 8);
        const r = new exports.StateDispatchActionBinding(t.container, this.P, n, s, e.from);
        t.addBinding(38962 === n.$kind ? i.applyBindingBehavior(r, n, t.container) : r);
    }
};

exports.DispatchBindingInstructionRenderer.inject = [ s.IExpressionParser, s.IObserverLocator, o ];

exports.DispatchBindingInstructionRenderer = c([ i.renderer("sd") ], exports.DispatchBindingInstructionRenderer);

function u(t, s, i) {
    if ("string" === typeof s) return t.parse(s, i);
    return s;
}

const p = [ exports.StateAttributePattern, exports.StateBindingCommand, exports.StateBindingInstructionRenderer, exports.DispatchAttributePattern, exports.DispatchBindingCommand, exports.DispatchBindingInstructionRenderer, StateContainer ];

const l = (s, i) => ({
    register: e => e.register(...p, t.Registration.instance(h, s), ...i.map((t => r.isType(t) ? t : r.define(t.target, t.action)))),
    init: (t, ...s) => l(t, s)
});

const d = l({}, []);

exports.Action = r;

exports.DispatchBindingInstruction = DispatchBindingInstruction;

exports.IReducerAction = e;

exports.IState = h;

exports.IStateContainer = o;

exports.StandardStateConfiguration = d;

exports.StateBindingInstruction = StateBindingInstruction;

exports.StateContainer = StateContainer;
//# sourceMappingURL=index.cjs.map
