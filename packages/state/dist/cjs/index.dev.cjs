'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var kernel = require('@aurelia/kernel');
var runtimeHtml = require('@aurelia/runtime-html');
var runtime = require('@aurelia/runtime');

const IActionHandler = kernel.DI.createInterface('IActionHandler');
const IStore = kernel.DI.createInterface('IStore');
const IState = kernel.DI.createInterface('IState');

const reducerSymbol = '__reducer__';
const ActionHandler = Object.freeze({
    define(reducer) {
        function registry(state, action, ...params) {
            return reducer(state, action, ...params);
        }
        registry[reducerSymbol] = true;
        registry.register = function (c) {
            kernel.Registration.instance(IActionHandler, reducer).register(c);
        };
        return registry;
    },
    isType: (r) => typeof r === 'function' && reducerSymbol in r,
});

class Store {
    constructor(initialState, reducers, logger) {
        this._subs = new Set();
        this._dispatching = 0;
        this._dispatchQueues = [];
        this._state = initialState ?? new State();
        this._handlers = reducers;
        this._logger = logger;
    }
    static register(c) {
        kernel.Registration.singleton(IStore, this).register(c);
    }
    subscribe(subscriber) {
        {
            if (this._subs.has(subscriber)) {
                this._logger.warn('A subscriber is trying to subscribe to state change again.');
                return;
            }
        }
        this._subs.add(subscriber);
    }
    unsubscribe(subscriber) {
        {
            if (!this._subs.has(subscriber)) {
                this._logger.warn('Unsubscribing a non-listening subscriber');
                return;
            }
        }
        this._subs.delete(subscriber);
    }
    _setState(state) {
        const prevState = this._state;
        this._state = state;
        this._subs.forEach(sub => sub.handleStateChange(state, prevState));
    }
    getState() {
        {
            return new Proxy(this._state, new StateProxyHandler(this, this._logger));
        }
    }
    dispatch(type, ...params) {
        if (this._dispatching > 0) {
            this._dispatchQueues.push({ type, params });
            return;
        }
        this._dispatching++;
        let $$action;
        const reduce = ($state, $action, params) => this._handlers.reduce(($state, handler) => {
            if ($state instanceof Promise) {
                return $state.then($ => handler($, $action, ...params ?? []));
            }
            return handler($state, $action, ...params ?? []);
        }, $state);
        const afterDispatch = ($state) => {
            if (this._dispatchQueues.length > 0) {
                $$action = this._dispatchQueues.shift();
                const newState = reduce($state, $$action.type, $$action.params);
                if (newState instanceof Promise) {
                    return newState.then($ => afterDispatch($));
                }
                else {
                    return afterDispatch(newState);
                }
            }
        };
        const newState = reduce(this._state, type, params);
        if (newState instanceof Promise) {
            return newState.then($state => {
                this._setState($state);
                this._dispatching--;
                return afterDispatch(this._state);
            }, ex => {
                this._dispatching--;
                throw ex;
            });
        }
        else {
            this._setState(newState);
            this._dispatching--;
            return afterDispatch(this._state);
        }
    }
}
Store.inject = [kernel.optional(IState), kernel.all(IActionHandler), kernel.ILogger];
class State {
}
class StateProxyHandler {
    constructor(_owner, _logger) {
        this._owner = _owner;
        this._logger = _logger;
    }
    set(target, prop, value, receiver) {
        this._logger.warn(`Setting State is immutable. Dispatch an action to create a new state`);
        return true;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function createStateBindingScope(state, scope) {
    const overrideContext = { bindingContext: state };
    const stateScope = runtime.Scope.create(state, overrideContext, true);
    stateScope.parentScope = scope;
    return stateScope;
}
const defProto = (klass, prop, desc) => Reflect.defineProperty(klass.prototype, prop, desc);
function isSubscribable$1(v) {
    return v instanceof Object && 'subscribe' in v;
}

const { toView, oneTime } = runtimeHtml.BindingMode;
class StateBinding {
    constructor(controller, locator, observerLocator, taskQueue, ast, target, prop, store) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this._value = void 0;
        this._sub = void 0;
        this._updateCount = 0;
        this.persistentFlags = 0;
        this.mode = toView;
        this._controller = controller;
        this.locator = locator;
        this.taskQueue = taskQueue;
        this._store = store;
        this.oL = observerLocator;
        this.ast = ast;
        this.target = target;
        this.targetProperty = prop;
    }
    updateTarget(value, flags) {
        const targetAccessor = this.targetObserver;
        const target = this.target;
        const prop = this.targetProperty;
        const updateCount = this._updateCount++;
        const isCurrentValue = () => updateCount === this._updateCount - 1;
        this._unsub();
        if (isSubscribable(value)) {
            this._sub = value.subscribe($value => {
                if (isCurrentValue()) {
                    targetAccessor.setValue($value, flags, target, prop);
                }
            });
            return;
        }
        if (value instanceof Promise) {
            void value.then($value => {
                if (isCurrentValue()) {
                    targetAccessor.setValue($value, flags, target, prop);
                }
            }, () => { });
            return;
        }
        targetAccessor.setValue(value, flags, target, prop);
    }
    $bind(flags, scope) {
        if (this.isBound) {
            return;
        }
        this.isBound = true;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.$scope = createStateBindingScope(this._store.getState(), scope);
        this._store.subscribe(this);
        this.updateTarget(this._value = this.ast.evaluate(this.$scope, this, this.mode > oneTime ? this : null), 0);
    }
    $unbind() {
        if (!this.isBound) {
            return;
        }
        this._unsub();
        this._updateCount++;
        this.isBound = false;
        this.$scope = void 0;
        this.task?.cancel();
        this.task = null;
        this._store.unsubscribe(this);
    }
    handleChange(newValue, previousValue, flags) {
        if (!this.isBound) {
            return;
        }
        flags |= this.persistentFlags;
        const shouldQueueFlush = this._controller.state !== 1 && (this.targetObserver.type & 4) > 0;
        const obsRecord = this.obs;
        obsRecord.version++;
        newValue = this.ast.evaluate(this.$scope, this, this.interceptor);
        obsRecord.clear();
        let task;
        if (shouldQueueFlush) {
            task = this.task;
            this.task = this.taskQueue.queueTask(() => {
                this.interceptor.updateTarget(newValue, flags);
                this.task = null;
            }, updateTaskOpts);
            task?.cancel();
            task = null;
        }
        else {
            this.interceptor.updateTarget(newValue, flags);
        }
    }
    handleStateChange(state) {
        const $scope = this.$scope;
        const overrideContext = $scope.overrideContext;
        $scope.bindingContext = overrideContext.bindingContext = overrideContext.$state = state;
        const value = this.ast.evaluate($scope, this, this.mode > oneTime ? this : null);
        const shouldQueueFlush = this._controller.state !== 1 && (this.targetObserver.type & 4) > 0;
        if (value === this._value) {
            return;
        }
        this._value = value;
        let task = null;
        if (shouldQueueFlush) {
            task = this.task;
            this.task = this.taskQueue.queueTask(() => {
                this.interceptor.updateTarget(value, 1);
                this.task = null;
            }, updateTaskOpts);
            task?.cancel();
        }
        else {
            this.interceptor.updateTarget(this._value, 0);
        }
    }
    _unsub() {
        if (typeof this._sub === 'function') {
            this._sub();
        }
        else if (this._sub !== void 0) {
            this._sub.dispose?.();
            this._sub.unsubscribe?.();
        }
        this._sub = void 0;
    }
}
function isSubscribable(v) {
    return v instanceof Object && 'subscribe' in v;
}
const updateTaskOpts = {
    reusable: false,
    preempt: true,
};
runtime.connectable(StateBinding);
runtimeHtml.astEvaluator(true)(StateBinding);

exports.StateBindingBehavior = class StateBindingBehavior extends runtimeHtml.BindingInterceptor {
    constructor(store, binding, expr) {
        super(binding, expr);
        this._store = store;
        this._isStateBinding = binding instanceof StateBinding;
    }
    $bind(flags, scope) {
        const binding = this.binding;
        const $scope = this._isStateBinding ? scope : createStateBindingScope(this._store.getState(), scope);
        if (!this._isStateBinding) {
            this._store.subscribe(this);
        }
        binding.$bind(flags, $scope);
    }
    $unbind(flags) {
        if (!this._isStateBinding) {
            this._store.unsubscribe(this);
        }
        this.binding.$unbind(flags);
    }
    handleStateChange(state) {
        const $scope = this.$scope;
        const overrideContext = $scope.overrideContext;
        $scope.bindingContext = overrideContext.bindingContext = overrideContext.$state = state;
        this.binding.handleChange(undefined, undefined, 0);
    }
};
exports.StateBindingBehavior.inject = [IStore];
exports.StateBindingBehavior = __decorate([
    runtimeHtml.bindingBehavior('state')
], exports.StateBindingBehavior);
['target', 'targetProperty'].forEach(p => {
    defProto(exports.StateBindingBehavior, p, {
        enumerable: false,
        configurable: true,
        get() {
            return this.binding[p];
        },
        set(v) {
            this.binding[p] = v;
        }
    });
});

class StateDispatchBinding {
    constructor(locator, expr, target, prop, store) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = locator;
        this._store = store;
        this.ast = expr;
        this.target = target;
        this.targetProperty = prop;
    }
    callSource(e) {
        const $scope = this.$scope;
        $scope.overrideContext.$event = e;
        const value = this.ast.evaluate($scope, this, null);
        delete $scope.overrideContext.$event;
        if (!this.isAction(value)) {
            throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${e.type}"`);
        }
        void this._store.dispatch(value.type, ...(value.params instanceof Array ? value.params : []));
    }
    handleEvent(e) {
        this.interceptor.callSource(e);
    }
    $bind(flags, scope) {
        if (this.isBound) {
            return;
        }
        this.isBound = true;
        this.$scope = createStateBindingScope(this._store.getState(), scope);
        this.target.addEventListener(this.targetProperty, this);
        this._store.subscribe(this);
    }
    $unbind() {
        if (!this.isBound) {
            return;
        }
        this.isBound = false;
        this.$scope = void 0;
        this.target.removeEventListener(this.targetProperty, this);
        this._store.unsubscribe(this);
    }
    handleStateChange(state) {
        const $scope = this.$scope;
        const overrideContext = $scope.overrideContext;
        $scope.bindingContext = overrideContext.bindingContext = state;
    }
    isAction(value) {
        return value != null
            && typeof value === 'object'
            && 'type' in value;
    }
}
runtime.connectable(StateDispatchBinding);
runtimeHtml.astEvaluator(true)(StateDispatchBinding);

exports.StateAttributePattern = class StateAttributePattern {
    'PART.state'(rawName, rawValue, parts) {
        return new runtimeHtml.AttrSyntax(rawName, rawValue, parts[0], 'state');
    }
};
exports.StateAttributePattern = __decorate([
    runtimeHtml.attributePattern({ pattern: 'PART.state', symbols: '.' })
], exports.StateAttributePattern);
exports.DispatchAttributePattern = class DispatchAttributePattern {
    'PART.dispatch'(rawName, rawValue, parts) {
        return new runtimeHtml.AttrSyntax(rawName, rawValue, parts[0], 'dispatch');
    }
};
exports.DispatchAttributePattern = __decorate([
    runtimeHtml.attributePattern({ pattern: 'PART.dispatch', symbols: '.' })
], exports.DispatchAttributePattern);
exports.StateBindingCommand = class StateBindingCommand {
    constructor(_attrMapper) {
        this._attrMapper = _attrMapper;
        this.type = 0;
    }
    get name() { return 'state'; }
    build(info) {
        const attr = info.attr;
        let target = attr.target;
        let value = attr.rawValue;
        if (info.bindable == null) {
            target = this._attrMapper.map(info.node, target)
                ?? kernel.camelCase(target);
        }
        else {
            if (value === '' && info.def.type === 1) {
                value = kernel.camelCase(target);
            }
            target = info.bindable.property;
        }
        return new StateBindingInstruction(value, target);
    }
};
exports.StateBindingCommand.inject = [runtimeHtml.IAttrMapper];
exports.StateBindingCommand = __decorate([
    runtimeHtml.bindingCommand('state')
], exports.StateBindingCommand);
exports.DispatchBindingCommand = class DispatchBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() { return 'dispatch'; }
    build(info) {
        const attr = info.attr;
        return new DispatchBindingInstruction(attr.target, attr.rawValue);
    }
};
exports.DispatchBindingCommand = __decorate([
    runtimeHtml.bindingCommand('dispatch')
], exports.DispatchBindingCommand);
class StateBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = 'sb';
    }
}
class DispatchBindingInstruction {
    constructor(from, expr) {
        this.from = from;
        this.expr = expr;
        this.type = 'sd';
    }
}
exports.StateBindingInstructionRenderer = class StateBindingInstructionRenderer {
    constructor(_exprParser, _observerLocator, _stateContainer, p) {
        this._exprParser = _exprParser;
        this._observerLocator = _observerLocator;
        this._stateContainer = _stateContainer;
        this.p = p;
    }
    render(renderingCtrl, target, instruction) {
        const binding = new StateBinding(renderingCtrl, renderingCtrl.container, this._observerLocator, this.p.domWriteQueue, ensureExpression(this._exprParser, instruction.from, 4), target, instruction.to, this._stateContainer);
        renderingCtrl.addBinding(binding);
    }
};
exports.StateBindingInstructionRenderer.inject = [runtime.IExpressionParser, runtime.IObserverLocator, IStore, runtimeHtml.IPlatform];
exports.StateBindingInstructionRenderer = __decorate([
    runtimeHtml.renderer('sb')
], exports.StateBindingInstructionRenderer);
exports.DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(_exprParser, _stateContainer) {
        this._exprParser = _exprParser;
        this._stateContainer = _stateContainer;
    }
    render(renderingCtrl, target, instruction) {
        const expr = ensureExpression(this._exprParser, instruction.expr, 8);
        const binding = new StateDispatchBinding(renderingCtrl.container, expr, target, instruction.from, this._stateContainer);
        renderingCtrl.addBinding(expr.$kind === 38963
            ? runtimeHtml.applyBindingBehavior(binding, expr, renderingCtrl.container)
            : binding);
    }
};
exports.DispatchBindingInstructionRenderer.inject = [runtime.IExpressionParser, IStore];
exports.DispatchBindingInstructionRenderer = __decorate([
    runtimeHtml.renderer('sd')
], exports.DispatchBindingInstructionRenderer);
function ensureExpression(parser, srcOrExpr, expressionType) {
    if (typeof srcOrExpr === 'string') {
        return parser.parse(srcOrExpr, expressionType);
    }
    return srcOrExpr;
}

const standardRegistrations = [
    exports.StateAttributePattern,
    exports.StateBindingCommand,
    exports.StateBindingInstructionRenderer,
    exports.DispatchAttributePattern,
    exports.DispatchBindingCommand,
    exports.DispatchBindingInstructionRenderer,
    exports.StateBindingBehavior,
    Store,
];
const createConfiguration = (initialState, reducers) => {
    return {
        register: (c) => {
            c.register(kernel.Registration.instance(IState, initialState), ...standardRegistrations, ...reducers.map(ActionHandler.define));
        },
        init: (state, ...reducers) => createConfiguration(state, reducers),
    };
};
const StateDefaultConfiguration = createConfiguration({}, []);

let StateGetterBinding = class StateGetterBinding {
    constructor(locator, target, prop, store, getValue) {
        this.interceptor = this;
        this.isBound = false;
        this._value = void 0;
        this._sub = void 0;
        this._updateCount = 0;
        this.locator = locator;
        this._store = store;
        this.$get = getValue;
        this.target = target;
        this.key = prop;
    }
    updateTarget(value) {
        const target = this.target;
        const prop = this.key;
        const updateCount = this._updateCount++;
        const isCurrentValue = () => updateCount === this._updateCount - 1;
        this._unsub();
        if (isSubscribable$1(value)) {
            this._sub = value.subscribe($value => {
                if (isCurrentValue()) {
                    target[prop] = $value;
                }
            });
            return;
        }
        if (value instanceof Promise) {
            void value.then($value => {
                if (isCurrentValue()) {
                    target[prop] = $value;
                }
            }, () => { });
            return;
        }
        target[prop] = value;
    }
    $bind(flags, scope) {
        if (this.isBound) {
            return;
        }
        const state = this._store.getState();
        this.isBound = true;
        this.$scope = createStateBindingScope(state, scope);
        this._store.subscribe(this);
        this.updateTarget(this._value = this.$get(state));
    }
    $unbind() {
        if (!this.isBound) {
            return;
        }
        this._unsub();
        this._updateCount++;
        this.isBound = false;
        this.$scope = void 0;
        this._store.unsubscribe(this);
    }
    handleStateChange(state) {
        const $scope = this.$scope;
        const overrideContext = $scope.overrideContext;
        $scope.bindingContext = overrideContext.bindingContext = overrideContext.$state = state;
        const value = this.$get(this._store.getState());
        if (value === this._value) {
            return;
        }
        this._value = value;
        this.updateTarget(value);
    }
    _unsub() {
        if (typeof this._sub === 'function') {
            this._sub();
        }
        else if (this._sub !== void 0) {
            this._sub.dispose?.();
            this._sub.unsubscribe?.();
        }
        this._sub = void 0;
    }
};
StateGetterBinding = __decorate([
    runtime.connectable()
], StateGetterBinding);

function fromState(getValue) {
    return function (target, key, desc) {
        if (typeof target === 'function') {
            throw new Error(`Invalid usage. @state can only be used on a field`);
        }
        if (typeof desc?.value !== 'undefined') {
            throw new Error(`Invalid usage. @state can only be used on a field`);
        }
        target = target.constructor;
        let dependencies = runtimeHtml.CustomElement.getAnnotation(target, dependenciesKey);
        if (dependencies == null) {
            runtimeHtml.CustomElement.annotate(target, dependenciesKey, dependencies = []);
        }
        dependencies.push(new HydratingLifecycleHooks(getValue, key));
        dependencies = runtimeHtml.CustomAttribute.getAnnotation(target, dependenciesKey);
        if (dependencies == null) {
            runtimeHtml.CustomElement.annotate(target, dependenciesKey, dependencies = []);
        }
        dependencies.push(new CreatedLifecycleHooks(getValue, key));
    };
}
const dependenciesKey = 'dependencies';
let HydratingLifecycleHooks = class HydratingLifecycleHooks {
    constructor($get, key) {
        this.$get = $get;
        this.key = key;
    }
    register(c) {
        kernel.Registration.instance(runtimeHtml.ILifecycleHooks, this).register(c);
    }
    hydrating(vm, controller) {
        const container = controller.container;
        controller.addBinding(new StateGetterBinding(container, vm, this.key, container.get(IStore), this.$get));
    }
};
HydratingLifecycleHooks = __decorate([
    runtimeHtml.lifecycleHooks()
], HydratingLifecycleHooks);
let CreatedLifecycleHooks = class CreatedLifecycleHooks {
    constructor($get, key) {
        this.$get = $get;
        this.key = key;
    }
    register(c) {
        kernel.Registration.instance(runtimeHtml.ILifecycleHooks, this).register(c);
    }
    created(vm, controller) {
        const container = controller.container;
        controller.addBinding(new StateGetterBinding(container, vm, this.key, container.get(IStore), this.$get));
    }
};
CreatedLifecycleHooks = __decorate([
    runtimeHtml.lifecycleHooks()
], CreatedLifecycleHooks);

exports.ActionHandler = ActionHandler;
exports.DispatchBindingInstruction = DispatchBindingInstruction;
exports.IActionHandler = IActionHandler;
exports.IState = IState;
exports.IStore = IStore;
exports.StateBinding = StateBinding;
exports.StateBindingInstruction = StateBindingInstruction;
exports.StateDefaultConfiguration = StateDefaultConfiguration;
exports.StateDispatchBinding = StateDispatchBinding;
exports.fromState = fromState;
//# sourceMappingURL=index.dev.cjs.map
