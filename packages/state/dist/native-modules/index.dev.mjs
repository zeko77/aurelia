import { DI, Registration, optional, all, ILogger, camelCase } from '../../../kernel/dist/native-modules/index.mjs';
import { Scope, connectable, BindingMode, bindingBehavior, BindingInterceptor, IExpressionParser, IObserverLocator } from '../../../runtime/dist/native-modules/index.mjs';
import { attributePattern, bindingCommand, renderer, AttrSyntax, IAttrMapper, IPlatform, applyBindingBehavior, lifecycleHooks, CustomElement, ILifecycleHooks } from '../../../runtime-html/dist/native-modules/index.mjs';

const IActionHandler = DI.createInterface('IActionHandler');
const IStore = DI.createInterface('IStore');
const IState = DI.createInterface('IState');

const reducerSymbol = '__reducer__';
const ActionHandler = Object.freeze({
    define(reducer) {
        function registry(state, action, ...params) {
            return reducer(state, action, ...params);
        }
        registry[reducerSymbol] = true;
        registry.register = function (c) {
            Registration.instance(IActionHandler, reducer).register(c);
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
        this._state = initialState !== null && initialState !== void 0 ? initialState : new State();
        this._handlers = reducers;
        this._logger = logger;
    }
    static register(c) {
        Registration.singleton(IStore, this).register(c);
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
                return $state.then($ => handler($, $action, ...params !== null && params !== void 0 ? params : []));
            }
            return handler($state, $action, ...params !== null && params !== void 0 ? params : []);
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
Store.inject = [optional(IState), all(IActionHandler), ILogger];
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
    const stateScope = Scope.create(state, overrideContext, true);
    stateScope.parentScope = scope;
    return stateScope;
}
const defProto = (klass, prop, desc) => Reflect.defineProperty(klass.prototype, prop, desc);
function isSubscribable$1(v) {
    return v instanceof Object && 'subscribe' in v;
}

const { toView, oneTime } = BindingMode;
let StateBinding = class StateBinding {
    constructor(locator, taskQueue, store, observerLocator, expr, target, prop) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this._value = void 0;
        this._sub = void 0;
        this._updateCount = 0;
        this.persistentFlags = 0;
        this.mode = toView;
        this.locator = locator;
        this.taskQueue = taskQueue;
        this._store = store;
        this.oL = observerLocator;
        this.sourceExpression = expr;
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
        this.updateTarget(this._value = this.sourceExpression.evaluate(1, this.$scope, this.locator, this.mode > oneTime ? this : null), 0);
    }
    $unbind() {
        var _a;
        if (!this.isBound) {
            return;
        }
        this._unsub();
        this._updateCount++;
        this.isBound = false;
        this.$scope = void 0;
        (_a = this.task) === null || _a === void 0 ? void 0 : _a.cancel();
        this.task = null;
        this._store.unsubscribe(this);
    }
    handleChange(newValue, previousValue, flags) {
        if (!this.isBound) {
            return;
        }
        flags |= this.persistentFlags;
        const shouldQueueFlush = (flags & 2) === 0 && (this.targetObserver.type & 4) > 0;
        const obsRecord = this.obs;
        obsRecord.version++;
        newValue = this.sourceExpression.evaluate(flags, this.$scope, this.locator, this.interceptor);
        obsRecord.clear();
        let task;
        if (shouldQueueFlush) {
            task = this.task;
            this.task = this.taskQueue.queueTask(() => {
                this.interceptor.updateTarget(newValue, flags);
                this.task = null;
            }, updateTaskOpts);
            task === null || task === void 0 ? void 0 : task.cancel();
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
        const value = this.sourceExpression.evaluate(1, $scope, this.locator, this.mode > oneTime ? this : null);
        const shouldQueueFlush = (this.targetObserver.type & 4) > 0;
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
            task === null || task === void 0 ? void 0 : task.cancel();
        }
        else {
            this.interceptor.updateTarget(this._value, 0);
        }
    }
    _unsub() {
        var _a, _b, _c, _d;
        if (typeof this._sub === 'function') {
            this._sub();
        }
        else if (this._sub !== void 0) {
            (_b = (_a = this._sub).dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this._sub).unsubscribe) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
        this._sub = void 0;
    }
};
StateBinding = __decorate([
    connectable()
], StateBinding);
function isSubscribable(v) {
    return v instanceof Object && 'subscribe' in v;
}
const updateTaskOpts = {
    reusable: false,
    preempt: true,
};

let StateBindingBehavior = class StateBindingBehavior extends BindingInterceptor {
    constructor(store, binding, expr) {
        super(binding, expr);
        this._store = store;
    }
    $bind(flags, scope) {
        const binding = this.binding;
        const $scope = binding instanceof StateBinding ? scope : createStateBindingScope(this._store.getState(), scope);
        binding.$bind(flags, $scope);
    }
};
StateBindingBehavior.inject = [IStore];
StateBindingBehavior = __decorate([
    bindingBehavior('state')
], StateBindingBehavior);
['target', 'targetProperty'].forEach(p => {
    defProto(StateBindingBehavior, p, {
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

let StateDispatchBinding = class StateDispatchBinding {
    constructor(locator, store, expr, target, prop) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = locator;
        this._store = store;
        this.expr = expr;
        this.target = target;
        this.targetProperty = prop;
    }
    callSource(e) {
        const $scope = this.$scope;
        $scope.overrideContext.$event = e;
        const value = this.expr.evaluate(1, $scope, this.locator, null);
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
};
StateDispatchBinding = __decorate([
    connectable()
], StateDispatchBinding);

let StateAttributePattern = class StateAttributePattern {
    'PART.state'(rawName, rawValue, parts) {
        return new AttrSyntax(rawName, rawValue, parts[0], 'state');
    }
};
StateAttributePattern = __decorate([
    attributePattern({ pattern: 'PART.state', symbols: '.' })
], StateAttributePattern);
let DispatchAttributePattern = class DispatchAttributePattern {
    'PART.dispatch'(rawName, rawValue, parts) {
        return new AttrSyntax(rawName, rawValue, parts[0], 'dispatch');
    }
};
DispatchAttributePattern = __decorate([
    attributePattern({ pattern: 'PART.dispatch', symbols: '.' })
], DispatchAttributePattern);
let StateBindingCommand = class StateBindingCommand {
    constructor(_attrMapper) {
        this._attrMapper = _attrMapper;
        this.type = 0;
    }
    get name() { return 'state'; }
    build(info) {
        var _a;
        const attr = info.attr;
        let target = attr.target;
        let value = attr.rawValue;
        if (info.bindable == null) {
            target = (_a = this._attrMapper.map(info.node, target)) !== null && _a !== void 0 ? _a : camelCase(target);
        }
        else {
            if (value === '' && info.def.type === 1) {
                value = camelCase(target);
            }
            target = info.bindable.property;
        }
        return new StateBindingInstruction(value, target);
    }
};
StateBindingCommand.inject = [IAttrMapper];
StateBindingCommand = __decorate([
    bindingCommand('state')
], StateBindingCommand);
let DispatchBindingCommand = class DispatchBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() { return 'dispatch'; }
    build(info) {
        const attr = info.attr;
        return new DispatchBindingInstruction(attr.target, attr.rawValue);
    }
};
DispatchBindingCommand = __decorate([
    bindingCommand('dispatch')
], DispatchBindingCommand);
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
let StateBindingInstructionRenderer = class StateBindingInstructionRenderer {
    constructor(_exprParser, _observerLocator, _stateContainer, p) {
        this._exprParser = _exprParser;
        this._observerLocator = _observerLocator;
        this._stateContainer = _stateContainer;
        this.p = p;
    }
    render(renderingCtrl, target, instruction) {
        const binding = new StateBinding(renderingCtrl.container, this.p.domWriteQueue, this._stateContainer, this._observerLocator, ensureExpression(this._exprParser, instruction.from, 4), target, instruction.to);
        renderingCtrl.addBinding(binding);
    }
};
StateBindingInstructionRenderer.inject = [IExpressionParser, IObserverLocator, IStore, IPlatform];
StateBindingInstructionRenderer = __decorate([
    renderer('sb')
], StateBindingInstructionRenderer);
let DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(_exprParser, _stateContainer) {
        this._exprParser = _exprParser;
        this._stateContainer = _stateContainer;
    }
    render(renderingCtrl, target, instruction) {
        const expr = ensureExpression(this._exprParser, instruction.expr, 8);
        const binding = new StateDispatchBinding(renderingCtrl.container, this._stateContainer, expr, target, instruction.from);
        renderingCtrl.addBinding(expr.$kind === 38962
            ? applyBindingBehavior(binding, expr, renderingCtrl.container)
            : binding);
    }
};
DispatchBindingInstructionRenderer.inject = [IExpressionParser, IStore];
DispatchBindingInstructionRenderer = __decorate([
    renderer('sd')
], DispatchBindingInstructionRenderer);
function ensureExpression(parser, srcOrExpr, expressionType) {
    if (typeof srcOrExpr === 'string') {
        return parser.parse(srcOrExpr, expressionType);
    }
    return srcOrExpr;
}

const standardRegistrations = [
    StateAttributePattern,
    StateBindingCommand,
    StateBindingInstructionRenderer,
    DispatchAttributePattern,
    DispatchBindingCommand,
    DispatchBindingInstructionRenderer,
    StateBindingBehavior,
    Store,
];
const createConfiguration = (initialState, reducers) => {
    return {
        register: (c) => {
            c.register(Registration.instance(IState, initialState), ...standardRegistrations, ...reducers.map(ActionHandler.define));
        },
        init: (state, ...reducers) => createConfiguration(state, reducers),
    };
};
const StateDefaultConfiguration = createConfiguration({}, []);

let StateGetterBinding = class StateGetterBinding {
    constructor(locator, store, getValue, target, prop) {
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
        var _a, _b, _c, _d;
        if (typeof this._sub === 'function') {
            this._sub();
        }
        else if (this._sub !== void 0) {
            (_b = (_a = this._sub).dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this._sub).unsubscribe) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
        this._sub = void 0;
    }
};
StateGetterBinding = __decorate([
    connectable()
], StateGetterBinding);

function fromStore(getValue) {
    return function (target, key, desc) {
        if (typeof target === 'function') {
            throw new Error(`Invalid usage. @state can only be used on a field`);
        }
        if (typeof (desc === null || desc === void 0 ? void 0 : desc.value) !== 'undefined') {
            throw new Error(`Invalid usage. @state can only be used on a field`);
        }
        target = target.constructor;
        let dependencies = CustomElement.getAnnotation(target, dependenciesKey);
        if (dependencies == null) {
            CustomElement.annotate(target, dependenciesKey, dependencies = []);
        }
        dependencies.push(new HydratingLifecycleHooks(getValue, key));
    };
}
const dependenciesKey = 'dependencies';
let HydratingLifecycleHooks = class HydratingLifecycleHooks {
    constructor($get, key) {
        this.$get = $get;
        this.key = key;
    }
    register(c) {
        Registration.instance(ILifecycleHooks, this).register(c);
    }
    hydrating(vm, controller) {
        const container = controller.container;
        controller.addBinding(new StateGetterBinding(container, container.get(IStore), this.$get, vm, this.key));
    }
};
HydratingLifecycleHooks = __decorate([
    lifecycleHooks()
], HydratingLifecycleHooks);

export { ActionHandler, DispatchAttributePattern, DispatchBindingCommand, DispatchBindingInstruction, DispatchBindingInstructionRenderer, IActionHandler, IState, IStore, StateAttributePattern, StateBinding, StateBindingBehavior, StateBindingCommand, StateBindingInstruction, StateBindingInstructionRenderer, StateDefaultConfiguration, StateDispatchBinding, fromStore };
//# sourceMappingURL=index.dev.mjs.map
