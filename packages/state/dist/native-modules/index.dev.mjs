import { DI, Registration, optional, all, ILogger, camelCase } from '../../../kernel/dist/native-modules/index.mjs';
import { connectable, Scope, IExpressionParser, IObserverLocator } from '../../../runtime/dist/native-modules/index.mjs';
import { attributePattern, bindingCommand, renderer, AttrSyntax, IAttrMapper, applyBindingBehavior } from '../../../runtime-html/dist/native-modules/index.mjs';

const IReducerAction = DI.createInterface('IReducerAction');
const reducerActionName = '__reducer__';
const Action = Object.freeze(new class {
    constructor() {
        this.isType = (r) => typeof r === 'function' && reducerActionName in r;
    }
    define(actionOrName, action) {
        const reg = typeof actionOrName === 'string'
            ? [actionOrName, action]
            : [actionOrName, actionOrName];
        const $action = reg[1];
        function registry(state, ...params) {
            return $action(state, ...params);
        }
        registry[reducerActionName] = true;
        registry.register = function (c) {
            Registration.instance(IReducerAction, reg).register(c);
        };
        return registry;
    }
}());

const IStateContainer = DI.createInterface('IStateContainer');
const IState = DI.createInterface('IState');
class StateContainer {
    constructor(initialState, actions, logger) {
        this._subs = new Set();
        this._publishing = 0;
        this._dispatchQueues = [];
        this._state = initialState !== null && initialState !== void 0 ? initialState : new State();
        this._reducers = new Map(actions);
        this._logger = logger;
    }
    static register(c) {
        Registration.singleton(IStateContainer, this).register(c);
    }
    subscribe(subscriber) {
        {
            if (this._subs.has(subscriber)) {
                this._logger.warn('A subscriber is trying to subscribe to state change again.');
            }
        }
        this._subs.add(subscriber);
    }
    unsubscribe(subscriber) {
        {
            if (!this._subs.has(subscriber)) {
                this._logger.warn('Unsubscribing a non-listening subscriber');
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
    _getAction(action) {
        return this._reducers.get(action);
    }
    dispatch(action, ...params) {
        if (this._publishing > 0) {
            this._dispatchQueues.push({ action: action, params });
            return;
        }
        this._publishing++;
        const dispatch = ($action, $params) => {
            if ($action == null) {
                {
                    this._logger.warn('Dispatching an invalid action: undefined');
                }
                return;
            }
            $action = this._getAction($action);
            if ($action == null) {
                if (typeof action === 'string') {
                    {
                        this._logger.warn(`Unrecognized action type "${action}"`);
                    }
                    return;
                }
                $action = action;
            }
            let newState = void 0;
            try {
                newState = $action(this._state, ...$params);
            }
            catch (ex) {
                this._publishing--;
                throw ex;
            }
            if (newState instanceof Promise) {
                return newState.then(s => {
                    this._setState(s);
                    return afterDispatch();
                }).then(() => {
                    this._publishing--;
                }, ex => {
                    this._publishing--;
                    throw ex;
                });
            }
            else {
                this._setState(newState);
                const res = afterDispatch();
                if (res instanceof Promise) {
                    return res.then(() => {
                        this._publishing--;
                    }, ex => {
                        this._publishing--;
                        throw ex;
                    });
                }
                else {
                    this._publishing--;
                }
            }
        };
        const afterDispatch = () => {
            if (this._dispatchQueues.length > 0) {
                const queuedItem = this._dispatchQueues.shift();
                return dispatch(queuedItem.action, queuedItem.params);
            }
        };
        return dispatch(action, params);
    }
}
StateContainer.inject = [optional(IState), all(IReducerAction), ILogger];
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

let StateBinding = class StateBinding {
    constructor(locator, stateContainer, observerLocator, expr, target, prop) {
        this.interceptor = this;
        this.isBound = false;
        this._value = void 0;
        this._sub = void 0;
        this._updateCount = 0;
        this.locator = locator;
        this._stateContainer = stateContainer;
        this._observerLocator = observerLocator;
        this.expr = expr;
        this.target = target;
        this.prop = prop;
    }
    updateTarget(value) {
        const targetAccessor = this._targetAccessor;
        const target = this.target;
        const prop = this.prop;
        const updateCount = this._updateCount++;
        this._unsub();
        if (isSubscribable(value)) {
            this._sub = value.subscribe($value => {
                if (updateCount === this._updateCount - 1) {
                    targetAccessor.setValue($value, 0, target, prop);
                }
            });
            return;
        }
        if (value instanceof Promise) {
            void value.then($value => {
                if (updateCount === this._updateCount - 1) {
                    targetAccessor.setValue($value, 0, target, prop);
                }
            }, () => { });
            return;
        }
        targetAccessor.setValue(value, 0, target, prop);
    }
    $bind(flags, scope) {
        if (this.isBound) {
            return;
        }
        this.isBound = true;
        this._targetAccessor = this._observerLocator.getAccessor(this.target, this.prop);
        const state = this._stateContainer.getState();
        const overrideContext = { bindingContext: state, $state: state, $store: this._stateContainer };
        (this.$scope = Scope.fromOverride(overrideContext)).parentScope = scope;
        this._stateContainer.subscribe(this);
        this.updateTarget(this._value = this.expr.evaluate(1, this.$scope, this.locator, null));
    }
    $unbind() {
        if (!this.isBound) {
            return;
        }
        this._unsub();
        this._updateCount++;
        this.isBound = false;
        this.$scope = void 0;
        this._stateContainer.unsubscribe(this);
    }
    handleStateChange(state) {
        const $scope = this.$scope;
        const overrideContext = $scope.overrideContext;
        $scope.bindingContext = overrideContext.bindingContext = overrideContext.$state = state;
        const value = this.expr.evaluate(1, $scope, this.locator, null);
        if (value !== this._value) {
            this._value = value;
            this.updateTarget(value);
        }
    }
    _unsub() {
        if (typeof this._sub === 'function') {
            this._sub();
        }
        else if (this._sub !== void 0) {
            this._sub.dispose();
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

let StateDispatchActionBinding = class StateDispatchActionBinding {
    constructor(locator, stateContainer, expr, target, prop) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = locator;
        this._stateContainer = stateContainer;
        this.expr = expr;
        this.target = target;
        this.prop = prop;
    }
    callSource(e) {
        const $scope = this.$scope;
        $scope.overrideContext.$event = e;
        const value = this.expr.evaluate(1, $scope, this.locator, null);
        delete $scope.overrideContext.$event;
        void this._stateContainer.dispatch('event', { target: this.target, event: this.prop, value });
    }
    handleEvent(e) {
        this.interceptor.callSource(e);
    }
    $bind(flags, scope) {
        if (this.isBound) {
            return;
        }
        this.isBound = true;
        const state = this._stateContainer.getState();
        const overrideContext = { bindingContext: state, $state: state, $store: this._stateContainer };
        (this.$scope = Scope.fromOverride(overrideContext)).parentScope = scope;
        this.target.addEventListener(this.prop, this);
    }
    $unbind() {
        if (!this.isBound) {
            return;
        }
        this.isBound = false;
        this.$scope = void 0;
        this.target.removeEventListener(this.prop, this);
    }
};
StateDispatchActionBinding = __decorate([
    connectable()
], StateDispatchActionBinding);

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
    constructor(_attrMapper) {
        this._attrMapper = _attrMapper;
        this.type = 1;
    }
    get name() { return 'dispatch'; }
    build(info) {
        const attr = info.attr;
        return new DispatchBindingInstruction(attr.target, attr.rawValue);
    }
};
DispatchBindingCommand.inject = [IAttrMapper];
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
    constructor(_exprParser, _observerLocator, _stateContainer) {
        this._exprParser = _exprParser;
        this._observerLocator = _observerLocator;
        this._stateContainer = _stateContainer;
    }
    render(renderingCtrl, target, instruction) {
        const binding = new StateBinding(renderingCtrl.container, this._stateContainer, this._observerLocator, ensureExpression(this._exprParser, instruction.from, 4), target, instruction.to);
        renderingCtrl.addBinding(binding);
    }
};
StateBindingInstructionRenderer.inject = [IExpressionParser, IObserverLocator, IStateContainer];
StateBindingInstructionRenderer = __decorate([
    renderer('sb')
], StateBindingInstructionRenderer);
let DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(_exprParser, _observerLocator, _stateContainer) {
        this._exprParser = _exprParser;
        this._observerLocator = _observerLocator;
        this._stateContainer = _stateContainer;
    }
    render(renderingCtrl, target, instruction) {
        const expr = ensureExpression(this._exprParser, instruction.expr, 8);
        const binding = new StateDispatchActionBinding(renderingCtrl.container, this._stateContainer, expr, target, instruction.from);
        renderingCtrl.addBinding(expr.$kind === 38962
            ? applyBindingBehavior(binding, expr, renderingCtrl.container)
            : binding);
    }
};
DispatchBindingInstructionRenderer.inject = [IExpressionParser, IObserverLocator, IStateContainer];
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
    StateContainer,
];
const createConfiguration = (initialState, reducers) => {
    return {
        register: (c) => c.register(...standardRegistrations, Registration.instance(IState, initialState), ...reducers.map(r => Action.isType(r) ? r : Action.define(r.target, r.action))),
        init: (state, ...reducers) => createConfiguration(state, reducers),
    };
};
const StandardStateConfiguration = createConfiguration({}, []);

export { Action, DispatchAttributePattern, DispatchBindingCommand, DispatchBindingInstruction, DispatchBindingInstructionRenderer, IReducerAction, IState, IStateContainer, StandardStateConfiguration, StateAttributePattern, StateBinding, StateBindingCommand, StateBindingInstruction, StateBindingInstructionRenderer, StateContainer, StateDispatchActionBinding };
//# sourceMappingURL=index.dev.mjs.map
