import { Protocol, Registration, DI, firstDefined, mergeArrays, fromAnnotationOrDefinitionOrTypeOrDefault, isNumberOrBigInt, isStringOrDate, emptyArray, isArrayIndex, IPlatform, ILogger } from '@aurelia/kernel';
import { Metadata } from '@aurelia/metadata';

const hasOwnProp = Object.prototype.hasOwnProperty;
const def = Reflect.defineProperty;
const isFunction = (v) => typeof v === 'function';
const isString = (v) => typeof v === 'string';
function defineHiddenProp(obj, key, value) {
    def(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value
    });
    return value;
}
function ensureProto(proto, key, defaultValue, force = false) {
    if (force || !hasOwnProp.call(proto, key)) {
        defineHiddenProp(proto, key, defaultValue);
    }
}
const createLookup = () => Object.create(null);
const getOwnMetadata = Metadata.getOwn;
const hasOwnMetadata = Metadata.hasOwn;
const defineMetadata = Metadata.define;
const getAnnotationKeyFor = Protocol.annotation.keyFor;
const getResourceKeyFor = Protocol.resource.keyFor;
const appendResourceKey = Protocol.resource.appendTo;

function alias(...aliases) {
    return function (target) {
        const key = getAnnotationKeyFor('aliases');
        const existing = getOwnMetadata(key, target);
        if (existing === void 0) {
            defineMetadata(key, aliases, target);
        }
        else {
            existing.push(...aliases);
        }
    };
}
function registerAliases(aliases, resource, key, container) {
    for (let i = 0, ii = aliases.length; i < ii; ++i) {
        Registration.aliasTo(key, resource.keyFrom(aliases[i])).register(container);
    }
}

const marker = Object.freeze({});
class BindingContext {
    constructor(keyOrObj, value) {
        if (keyOrObj !== void 0) {
            if (value !== void 0) {
                this[keyOrObj] = value;
            }
            else {
                for (const prop in keyOrObj) {
                    if (hasOwnProp.call(keyOrObj, prop)) {
                        this[prop] = keyOrObj[prop];
                    }
                }
            }
        }
    }
    static create(keyOrObj, value) {
        return new BindingContext(keyOrObj, value);
    }
    static get(scope, name, ancestor, flags) {
        var _a, _b;
        if (scope == null) {
            throw new Error(`AUR0203: Scope is ${scope}.`);
        }
        let overrideContext = scope.overrideContext;
        let currentScope = scope;
        if (ancestor > 0) {
            while (ancestor > 0) {
                ancestor--;
                currentScope = currentScope.parentScope;
                if ((currentScope === null || currentScope === void 0 ? void 0 : currentScope.overrideContext) == null) {
                    return void 0;
                }
            }
            overrideContext = currentScope.overrideContext;
            return name in overrideContext ? overrideContext : overrideContext.bindingContext;
        }
        while (!(currentScope === null || currentScope === void 0 ? void 0 : currentScope.isBoundary)
            && overrideContext != null
            && !(name in overrideContext)
            && !(overrideContext.bindingContext
                && name in overrideContext.bindingContext)) {
            currentScope = (_a = currentScope.parentScope) !== null && _a !== void 0 ? _a : null;
            overrideContext = (_b = currentScope === null || currentScope === void 0 ? void 0 : currentScope.overrideContext) !== null && _b !== void 0 ? _b : null;
        }
        if (overrideContext) {
            return name in overrideContext ? overrideContext : overrideContext.bindingContext;
        }
        if (flags & 16) {
            return marker;
        }
        return scope.bindingContext || scope.overrideContext;
    }
}
class Scope {
    constructor(parentScope, bindingContext, overrideContext, isBoundary) {
        this.parentScope = parentScope;
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.isBoundary = isBoundary;
    }
    static create(bc, oc, isBoundary) {
        return new Scope(null, bc, oc == null ? OverrideContext.create(bc) : oc, isBoundary !== null && isBoundary !== void 0 ? isBoundary : false);
    }
    static fromOverride(oc) {
        if (oc == null) {
            throw new Error(`AUR0204: OverrideContext is ${oc}`);
        }
        return new Scope(null, oc.bindingContext, oc, false);
    }
    static fromParent(ps, bc) {
        if (ps == null) {
            throw new Error(`AUR0205: ParentScope is ${ps}`);
        }
        return new Scope(ps, bc, OverrideContext.create(bc), false);
    }
}
class OverrideContext {
    constructor(bindingContext) {
        this.bindingContext = bindingContext;
    }
    static create(bc) {
        return new OverrideContext(bc);
    }
}

const ISignaler = DI.createInterface('ISignaler', x => x.singleton(Signaler));
class Signaler {
    constructor() {
        this.signals = createLookup();
    }
    dispatchSignal(name, flags) {
        const listeners = this.signals[name];
        if (listeners === undefined) {
            return;
        }
        let listener;
        for (listener of listeners.keys()) {
            listener.handleChange(undefined, undefined, flags);
        }
    }
    addSignalListener(name, listener) {
        const signals = this.signals;
        const listeners = signals[name];
        if (listeners === undefined) {
            signals[name] = new Set([listener]);
        }
        else {
            listeners.add(listener);
        }
    }
    removeSignalListener(name, listener) {
        const listeners = this.signals[name];
        if (listeners) {
            listeners.delete(listener);
        }
    }
}

var BindingBehaviorStrategy;
(function (BindingBehaviorStrategy) {
    BindingBehaviorStrategy[BindingBehaviorStrategy["singleton"] = 1] = "singleton";
    BindingBehaviorStrategy[BindingBehaviorStrategy["interceptor"] = 2] = "interceptor";
})(BindingBehaviorStrategy || (BindingBehaviorStrategy = {}));
function bindingBehavior(nameOrDef) {
    return function (target) {
        return BindingBehavior.define(nameOrDef, target);
    };
}
class BindingBehaviorDefinition {
    constructor(Type, name, aliases, key, strategy) {
        this.Type = Type;
        this.name = name;
        this.aliases = aliases;
        this.key = key;
        this.strategy = strategy;
    }
    static create(nameOrDef, Type) {
        let name;
        let def;
        if (isString(nameOrDef)) {
            name = nameOrDef;
            def = { name };
        }
        else {
            name = nameOrDef.name;
            def = nameOrDef;
        }
        const inheritsFromInterceptor = Object.getPrototypeOf(Type) === BindingInterceptor;
        return new BindingBehaviorDefinition(Type, firstDefined(getBehaviorAnnotation(Type, 'name'), name), mergeArrays(getBehaviorAnnotation(Type, 'aliases'), def.aliases, Type.aliases), BindingBehavior.keyFrom(name), fromAnnotationOrDefinitionOrTypeOrDefault('strategy', def, Type, () => inheritsFromInterceptor ? 2 : 1));
    }
    register(container) {
        const { Type, key, aliases, strategy } = this;
        switch (strategy) {
            case 1:
                Registration.singleton(key, Type).register(container);
                break;
            case 2:
                Registration.instance(key, new BindingBehaviorFactory(container, Type)).register(container);
                break;
        }
        Registration.aliasTo(key, Type).register(container);
        registerAliases(aliases, BindingBehavior, key, container);
    }
}
class BindingBehaviorFactory {
    constructor(ctn, Type) {
        this.ctn = ctn;
        this.Type = Type;
        this.deps = DI.getDependencies(Type);
    }
    construct(binding, expr) {
        const container = this.ctn;
        const deps = this.deps;
        switch (deps.length) {
            case 0:
                return new this.Type(binding, expr);
            case 1:
                return new this.Type(container.get(deps[0]), binding, expr);
            case 2:
                return new this.Type(container.get(deps[0]), container.get(deps[1]), binding, expr);
            default:
                return new this.Type(...deps.map(d => container.get(d)), binding, expr);
        }
    }
}
class BindingInterceptor {
    constructor(binding, expr) {
        this.binding = binding;
        this.expr = expr;
        this.interceptor = this;
        let interceptor;
        while (binding.interceptor !== this) {
            interceptor = binding.interceptor;
            binding.interceptor = this;
            binding = interceptor;
        }
    }
    get oL() {
        return this.binding.oL;
    }
    get locator() {
        return this.binding.locator;
    }
    get $scope() {
        return this.binding.$scope;
    }
    get isBound() {
        return this.binding.isBound;
    }
    get obs() {
        return this.binding.obs;
    }
    get sourceExpression() {
        return this.binding.sourceExpression;
    }
    updateTarget(value, flags) {
        this.binding.updateTarget(value, flags);
    }
    updateSource(value, flags) {
        this.binding.updateSource(value, flags);
    }
    callSource(args) {
        return this.binding.callSource(args);
    }
    handleChange(newValue, previousValue, flags) {
        this.binding.handleChange(newValue, previousValue, flags);
    }
    handleCollectionChange(indexMap, flags) {
        this.binding.handleCollectionChange(indexMap, flags);
    }
    observe(obj, key) {
        this.binding.observe(obj, key);
    }
    observeCollection(observer) {
        this.binding.observeCollection(observer);
    }
    $bind(flags, scope) {
        this.binding.$bind(flags, scope);
    }
    $unbind(flags) {
        this.binding.$unbind(flags);
    }
}
const bbBaseName = getResourceKeyFor('binding-behavior');
const getBehaviorAnnotation = (Type, prop) => getOwnMetadata(getAnnotationKeyFor(prop), Type);
const BindingBehavior = Object.freeze({
    name: bbBaseName,
    keyFrom(name) {
        return `${bbBaseName}:${name}`;
    },
    isType(value) {
        return isFunction(value) && hasOwnMetadata(bbBaseName, value);
    },
    define(nameOrDef, Type) {
        const definition = BindingBehaviorDefinition.create(nameOrDef, Type);
        defineMetadata(bbBaseName, definition, definition.Type);
        defineMetadata(bbBaseName, definition, definition);
        appendResourceKey(Type, bbBaseName);
        return definition.Type;
    },
    getDefinition(Type) {
        const def = getOwnMetadata(bbBaseName, Type);
        if (def === void 0) {
            throw new Error(`AUR0151: No definition found for type ${Type.name}`);
        }
        return def;
    },
    annotate(Type, prop, value) {
        defineMetadata(getAnnotationKeyFor(prop), value, Type);
    },
    getAnnotation: getBehaviorAnnotation,
});

function valueConverter(nameOrDef) {
    return function (target) {
        return ValueConverter.define(nameOrDef, target);
    };
}
class ValueConverterDefinition {
    constructor(Type, name, aliases, key) {
        this.Type = Type;
        this.name = name;
        this.aliases = aliases;
        this.key = key;
    }
    static create(nameOrDef, Type) {
        let name;
        let def;
        if (isString(nameOrDef)) {
            name = nameOrDef;
            def = { name };
        }
        else {
            name = nameOrDef.name;
            def = nameOrDef;
        }
        return new ValueConverterDefinition(Type, firstDefined(getConverterAnnotation(Type, 'name'), name), mergeArrays(getConverterAnnotation(Type, 'aliases'), def.aliases, Type.aliases), ValueConverter.keyFrom(name));
    }
    register(container) {
        const { Type, key, aliases } = this;
        Registration.singleton(key, Type).register(container);
        Registration.aliasTo(key, Type).register(container);
        registerAliases(aliases, ValueConverter, key, container);
    }
}
const vcBaseName = getResourceKeyFor('value-converter');
const getConverterAnnotation = (Type, prop) => getOwnMetadata(getAnnotationKeyFor(prop), Type);
const ValueConverter = Object.freeze({
    name: vcBaseName,
    keyFrom: (name) => `${vcBaseName}:${name}`,
    isType(value) {
        return isFunction(value) && hasOwnMetadata(vcBaseName, value);
    },
    define(nameOrDef, Type) {
        const definition = ValueConverterDefinition.create(nameOrDef, Type);
        defineMetadata(vcBaseName, definition, definition.Type);
        defineMetadata(vcBaseName, definition, definition);
        appendResourceKey(Type, vcBaseName);
        return definition.Type;
    },
    getDefinition(Type) {
        const def = getOwnMetadata(vcBaseName, Type);
        if (def === void 0) {
            throw new Error(`AUR0152: No definition found for type ${Type.name}`);
        }
        return def;
    },
    annotate(Type, prop, value) {
        defineMetadata(getAnnotationKeyFor(prop), value, Type);
    },
    getAnnotation: getConverterAnnotation,
});

var ExpressionKind;
(function (ExpressionKind) {
    ExpressionKind[ExpressionKind["CallsFunction"] = 128] = "CallsFunction";
    ExpressionKind[ExpressionKind["HasAncestor"] = 256] = "HasAncestor";
    ExpressionKind[ExpressionKind["IsPrimary"] = 512] = "IsPrimary";
    ExpressionKind[ExpressionKind["IsLeftHandSide"] = 1024] = "IsLeftHandSide";
    ExpressionKind[ExpressionKind["HasBind"] = 2048] = "HasBind";
    ExpressionKind[ExpressionKind["HasUnbind"] = 4096] = "HasUnbind";
    ExpressionKind[ExpressionKind["IsAssignable"] = 8192] = "IsAssignable";
    ExpressionKind[ExpressionKind["IsLiteral"] = 16384] = "IsLiteral";
    ExpressionKind[ExpressionKind["IsResource"] = 32768] = "IsResource";
    ExpressionKind[ExpressionKind["IsForDeclaration"] = 65536] = "IsForDeclaration";
    ExpressionKind[ExpressionKind["Type"] = 31] = "Type";
    ExpressionKind[ExpressionKind["AccessThis"] = 1793] = "AccessThis";
    ExpressionKind[ExpressionKind["AccessScope"] = 10082] = "AccessScope";
    ExpressionKind[ExpressionKind["ArrayLiteral"] = 17955] = "ArrayLiteral";
    ExpressionKind[ExpressionKind["ObjectLiteral"] = 17956] = "ObjectLiteral";
    ExpressionKind[ExpressionKind["PrimitiveLiteral"] = 17925] = "PrimitiveLiteral";
    ExpressionKind[ExpressionKind["Template"] = 17958] = "Template";
    ExpressionKind[ExpressionKind["Unary"] = 39] = "Unary";
    ExpressionKind[ExpressionKind["CallScope"] = 1448] = "CallScope";
    ExpressionKind[ExpressionKind["CallMember"] = 1161] = "CallMember";
    ExpressionKind[ExpressionKind["CallFunction"] = 1162] = "CallFunction";
    ExpressionKind[ExpressionKind["AccessMember"] = 9323] = "AccessMember";
    ExpressionKind[ExpressionKind["AccessKeyed"] = 9324] = "AccessKeyed";
    ExpressionKind[ExpressionKind["TaggedTemplate"] = 1197] = "TaggedTemplate";
    ExpressionKind[ExpressionKind["Binary"] = 46] = "Binary";
    ExpressionKind[ExpressionKind["Conditional"] = 63] = "Conditional";
    ExpressionKind[ExpressionKind["Assign"] = 8208] = "Assign";
    ExpressionKind[ExpressionKind["ValueConverter"] = 36913] = "ValueConverter";
    ExpressionKind[ExpressionKind["BindingBehavior"] = 38962] = "BindingBehavior";
    ExpressionKind[ExpressionKind["HtmlLiteral"] = 51] = "HtmlLiteral";
    ExpressionKind[ExpressionKind["ArrayBindingPattern"] = 65556] = "ArrayBindingPattern";
    ExpressionKind[ExpressionKind["ObjectBindingPattern"] = 65557] = "ObjectBindingPattern";
    ExpressionKind[ExpressionKind["BindingIdentifier"] = 65558] = "BindingIdentifier";
    ExpressionKind[ExpressionKind["ForOfStatement"] = 6199] = "ForOfStatement";
    ExpressionKind[ExpressionKind["Interpolation"] = 24] = "Interpolation";
    ExpressionKind[ExpressionKind["ArrayDestructuring"] = 90137] = "ArrayDestructuring";
    ExpressionKind[ExpressionKind["ObjectDestructuring"] = 106521] = "ObjectDestructuring";
    ExpressionKind[ExpressionKind["DestructuringAssignmentLeaf"] = 139289] = "DestructuringAssignmentLeaf";
})(ExpressionKind || (ExpressionKind = {}));
class Unparser {
    constructor() {
        this.text = '';
    }
    static unparse(expr) {
        const visitor = new Unparser();
        expr.accept(visitor);
        return visitor.text;
    }
    visitAccessMember(expr) {
        expr.object.accept(this);
        this.text += `.${expr.name}`;
    }
    visitAccessKeyed(expr) {
        expr.object.accept(this);
        this.text += '[';
        expr.key.accept(this);
        this.text += ']';
    }
    visitAccessThis(expr) {
        if (expr.ancestor === 0) {
            this.text += '$this';
            return;
        }
        this.text += '$parent';
        let i = expr.ancestor - 1;
        while (i--) {
            this.text += '.$parent';
        }
    }
    visitAccessScope(expr) {
        let i = expr.ancestor;
        while (i--) {
            this.text += '$parent.';
        }
        this.text += expr.name;
    }
    visitArrayLiteral(expr) {
        const elements = expr.elements;
        this.text += '[';
        for (let i = 0, length = elements.length; i < length; ++i) {
            if (i !== 0) {
                this.text += ',';
            }
            elements[i].accept(this);
        }
        this.text += ']';
    }
    visitObjectLiteral(expr) {
        const keys = expr.keys;
        const values = expr.values;
        this.text += '{';
        for (let i = 0, length = keys.length; i < length; ++i) {
            if (i !== 0) {
                this.text += ',';
            }
            this.text += `'${keys[i]}':`;
            values[i].accept(this);
        }
        this.text += '}';
    }
    visitPrimitiveLiteral(expr) {
        this.text += '(';
        if (isString(expr.value)) {
            const escaped = expr.value.replace(/'/g, '\\\'');
            this.text += `'${escaped}'`;
        }
        else {
            this.text += `${expr.value}`;
        }
        this.text += ')';
    }
    visitCallFunction(expr) {
        this.text += '(';
        expr.func.accept(this);
        this.writeArgs(expr.args);
        this.text += ')';
    }
    visitCallMember(expr) {
        this.text += '(';
        expr.object.accept(this);
        this.text += `.${expr.name}`;
        this.writeArgs(expr.args);
        this.text += ')';
    }
    visitCallScope(expr) {
        this.text += '(';
        let i = expr.ancestor;
        while (i--) {
            this.text += '$parent.';
        }
        this.text += expr.name;
        this.writeArgs(expr.args);
        this.text += ')';
    }
    visitTemplate(expr) {
        const { cooked, expressions } = expr;
        const length = expressions.length;
        this.text += '`';
        this.text += cooked[0];
        for (let i = 0; i < length; i++) {
            expressions[i].accept(this);
            this.text += cooked[i + 1];
        }
        this.text += '`';
    }
    visitTaggedTemplate(expr) {
        const { cooked, expressions } = expr;
        const length = expressions.length;
        expr.func.accept(this);
        this.text += '`';
        this.text += cooked[0];
        for (let i = 0; i < length; i++) {
            expressions[i].accept(this);
            this.text += cooked[i + 1];
        }
        this.text += '`';
    }
    visitUnary(expr) {
        this.text += `(${expr.operation}`;
        if (expr.operation.charCodeAt(0) >= 97) {
            this.text += ' ';
        }
        expr.expression.accept(this);
        this.text += ')';
    }
    visitBinary(expr) {
        this.text += '(';
        expr.left.accept(this);
        if (expr.operation.charCodeAt(0) === 105) {
            this.text += ` ${expr.operation} `;
        }
        else {
            this.text += expr.operation;
        }
        expr.right.accept(this);
        this.text += ')';
    }
    visitConditional(expr) {
        this.text += '(';
        expr.condition.accept(this);
        this.text += '?';
        expr.yes.accept(this);
        this.text += ':';
        expr.no.accept(this);
        this.text += ')';
    }
    visitAssign(expr) {
        this.text += '(';
        expr.target.accept(this);
        this.text += '=';
        expr.value.accept(this);
        this.text += ')';
    }
    visitValueConverter(expr) {
        const args = expr.args;
        expr.expression.accept(this);
        this.text += `|${expr.name}`;
        for (let i = 0, length = args.length; i < length; ++i) {
            this.text += ':';
            args[i].accept(this);
        }
    }
    visitBindingBehavior(expr) {
        const args = expr.args;
        expr.expression.accept(this);
        this.text += `&${expr.name}`;
        for (let i = 0, length = args.length; i < length; ++i) {
            this.text += ':';
            args[i].accept(this);
        }
    }
    visitArrayBindingPattern(expr) {
        const elements = expr.elements;
        this.text += '[';
        for (let i = 0, length = elements.length; i < length; ++i) {
            if (i !== 0) {
                this.text += ',';
            }
            elements[i].accept(this);
        }
        this.text += ']';
    }
    visitObjectBindingPattern(expr) {
        const keys = expr.keys;
        const values = expr.values;
        this.text += '{';
        for (let i = 0, length = keys.length; i < length; ++i) {
            if (i !== 0) {
                this.text += ',';
            }
            this.text += `'${keys[i]}':`;
            values[i].accept(this);
        }
        this.text += '}';
    }
    visitBindingIdentifier(expr) {
        this.text += expr.name;
    }
    visitHtmlLiteral(_expr) { throw new Error('visitHtmlLiteral'); }
    visitForOfStatement(expr) {
        expr.declaration.accept(this);
        this.text += ' of ';
        expr.iterable.accept(this);
    }
    visitInterpolation(expr) {
        const { parts, expressions } = expr;
        const length = expressions.length;
        this.text += '${';
        this.text += parts[0];
        for (let i = 0; i < length; i++) {
            expressions[i].accept(this);
            this.text += parts[i + 1];
        }
        this.text += '}';
    }
    visitDestructuringAssignmentExpression(expr) {
        const $kind = expr.$kind;
        const isObjDes = $kind === 106521;
        this.text += isObjDes ? '{' : '[';
        const list = expr.list;
        const len = list.length;
        let i;
        let item;
        for (i = 0; i < len; i++) {
            item = list[i];
            switch (item.$kind) {
                case 139289:
                    item.accept(this);
                    break;
                case 90137:
                case 106521: {
                    const source = item.source;
                    if (source) {
                        source.accept(this);
                        this.text += ':';
                    }
                    item.accept(this);
                    break;
                }
            }
        }
        this.text += isObjDes ? '}' : ']';
    }
    visitDestructuringAssignmentSingleExpression(expr) {
        expr.source.accept(this);
        this.text += ':';
        expr.target.accept(this);
        const initializer = expr.initializer;
        if (initializer !== void 0) {
            this.text += '=';
            initializer.accept(this);
        }
    }
    visitDestructuringAssignmentRestExpression(expr) {
        this.text += '...';
        expr.accept(this);
    }
    writeArgs(args) {
        this.text += '(';
        for (let i = 0, length = args.length; i < length; ++i) {
            if (i !== 0) {
                this.text += ',';
            }
            args[i].accept(this);
        }
        this.text += ')';
    }
}
class CustomExpression {
    constructor(value) {
        this.value = value;
    }
    evaluate(_f, _s, _l, _c) {
        return this.value;
    }
}
class BindingBehaviorExpression {
    constructor(expression, name, args) {
        this.expression = expression;
        this.name = name;
        this.args = args;
        this.behaviorKey = BindingBehavior.keyFrom(name);
    }
    get $kind() { return 38962; }
    get hasBind() { return true; }
    get hasUnbind() { return true; }
    evaluate(f, s, l, c) {
        return this.expression.evaluate(f, s, l, c);
    }
    assign(f, s, l, val) {
        return this.expression.assign(f, s, l, val);
    }
    bind(f, s, b) {
        if (this.expression.hasBind) {
            this.expression.bind(f, s, b);
        }
        const behavior = b.locator.get(this.behaviorKey);
        if (behavior == null) {
            throw new Error(`AUR0101: BindingBehavior named '${this.name}' could not be found. Did you forget to register it as a dependency?`);
        }
        if (!(behavior instanceof BindingBehaviorFactory)) {
            if (b[this.behaviorKey] === void 0) {
                b[this.behaviorKey] = behavior;
                behavior.bind.call(behavior, f, s, b, ...this.args.map(a => a.evaluate(f, s, b.locator, null)));
            }
            else {
                throw new Error(`AUR0102: BindingBehavior named '${this.name}' already applied.`);
            }
        }
    }
    unbind(f, s, b) {
        const key = this.behaviorKey;
        const $b = b;
        if ($b[key] !== void 0) {
            if (isFunction($b[key].unbind)) {
                $b[key].unbind(f, s, b);
            }
            $b[key] = void 0;
        }
        if (this.expression.hasUnbind) {
            this.expression.unbind(f, s, b);
        }
    }
    accept(visitor) {
        return visitor.visitBindingBehavior(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class ValueConverterExpression {
    constructor(expression, name, args) {
        this.expression = expression;
        this.name = name;
        this.args = args;
        this.converterKey = ValueConverter.keyFrom(name);
    }
    get $kind() { return 36913; }
    get hasBind() { return false; }
    get hasUnbind() { return true; }
    evaluate(f, s, l, c) {
        const vc = l.get(this.converterKey);
        if (vc == null) {
            throw new Error(`AUR0103: ValueConverter named '${this.name}' could not be found. Did you forget to register it as a dependency?`);
        }
        if (c !== null && ('handleChange' in c)) {
            const signals = vc.signals;
            if (signals != null) {
                const signaler = l.get(ISignaler);
                for (let i = 0, ii = signals.length; i < ii; ++i) {
                    signaler.addSignalListener(signals[i], c);
                }
            }
        }
        if ('toView' in vc) {
            return vc.toView(this.expression.evaluate(f, s, l, c), ...this.args.map(a => a.evaluate(f, s, l, c)));
        }
        return this.expression.evaluate(f, s, l, c);
    }
    assign(f, s, l, val) {
        const vc = l.get(this.converterKey);
        if (vc == null) {
            throw new Error(`AUR0104: ValueConverter named '${this.name}' could not be found. Did you forget to register it as a dependency?`);
        }
        if ('fromView' in vc) {
            val = vc.fromView(val, ...this.args.map(a => a.evaluate(f, s, l, null)));
        }
        return this.expression.assign(f, s, l, val);
    }
    unbind(_f, _s, b) {
        const vc = b.locator.get(this.converterKey);
        if (vc.signals === void 0) {
            return;
        }
        const signaler = b.locator.get(ISignaler);
        for (let i = 0; i < vc.signals.length; ++i) {
            signaler.removeSignalListener(vc.signals[i], b);
        }
    }
    accept(visitor) {
        return visitor.visitValueConverter(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class AssignExpression {
    constructor(target, value) {
        this.target = target;
        this.value = value;
    }
    get $kind() { return 8208; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        return this.target.assign(f, s, l, this.value.evaluate(f, s, l, c));
    }
    assign(f, s, l, val) {
        this.value.assign(f, s, l, val);
        return this.target.assign(f, s, l, val);
    }
    accept(visitor) {
        return visitor.visitAssign(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class ConditionalExpression {
    constructor(condition, yes, no) {
        this.condition = condition;
        this.yes = yes;
        this.no = no;
    }
    get $kind() { return 63; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        return this.condition.evaluate(f, s, l, c) ? this.yes.evaluate(f, s, l, c) : this.no.evaluate(f, s, l, c);
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitConditional(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class AccessThisExpression {
    constructor(ancestor = 0) {
        this.ancestor = ancestor;
    }
    get $kind() { return 1793; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(_f, s, _l, _c) {
        var _a;
        let oc = s.overrideContext;
        let currentScope = s;
        let i = this.ancestor;
        while (i-- && oc) {
            currentScope = currentScope.parentScope;
            oc = (_a = currentScope === null || currentScope === void 0 ? void 0 : currentScope.overrideContext) !== null && _a !== void 0 ? _a : null;
        }
        return i < 1 && oc ? oc.bindingContext : void 0;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitAccessThis(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
AccessThisExpression.$this = new AccessThisExpression(0);
AccessThisExpression.$parent = new AccessThisExpression(1);
class AccessScopeExpression {
    constructor(name, ancestor = 0) {
        this.name = name;
        this.ancestor = ancestor;
    }
    get $kind() { return 10082; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, _l, c) {
        const obj = BindingContext.get(s, this.name, this.ancestor, f);
        if (c !== null) {
            c.observe(obj, this.name);
        }
        const evaluatedValue = obj[this.name];
        if (evaluatedValue == null && this.name === '$host') {
            throw new Error(`AUR0105: Unable to find $host context. Did you forget [au-slot] attribute?`);
        }
        if (f & 1) {
            return evaluatedValue;
        }
        return evaluatedValue == null ? '' : evaluatedValue;
    }
    assign(f, s, _l, val) {
        var _a;
        if (this.name === '$host') {
            throw new Error(`AUR0106: Invalid assignment. $host is a reserved keyword.`);
        }
        const obj = BindingContext.get(s, this.name, this.ancestor, f);
        if (obj instanceof Object) {
            if (((_a = obj.$observers) === null || _a === void 0 ? void 0 : _a[this.name]) !== void 0) {
                obj.$observers[this.name].setValue(val, f);
                return val;
            }
            else {
                return obj[this.name] = val;
            }
        }
        return void 0;
    }
    accept(visitor) {
        return visitor.visitAccessScope(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class AccessMemberExpression {
    constructor(object, name) {
        this.object = object;
        this.name = name;
    }
    get $kind() { return 9323; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const instance = this.object.evaluate(f, s, l, (f & 128) > 0 ? null : c);
        if (f & 1) {
            if (instance == null) {
                return instance;
            }
            if (c !== null) {
                c.observe(instance, this.name);
            }
            return instance[this.name];
        }
        if (c !== null && instance instanceof Object) {
            c.observe(instance, this.name);
        }
        return instance ? instance[this.name] : '';
    }
    assign(f, s, l, val) {
        const obj = this.object.evaluate(f, s, l, null);
        if (obj instanceof Object) {
            if (obj.$observers !== void 0 && obj.$observers[this.name] !== void 0) {
                obj.$observers[this.name].setValue(val, f);
            }
            else {
                obj[this.name] = val;
            }
        }
        else {
            this.object.assign(f, s, l, { [this.name]: val });
        }
        return val;
    }
    accept(visitor) {
        return visitor.visitAccessMember(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class AccessKeyedExpression {
    constructor(object, key) {
        this.object = object;
        this.key = key;
    }
    get $kind() { return 9324; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const instance = this.object.evaluate(f, s, l, (f & 128) > 0 ? null : c);
        if (instance instanceof Object) {
            const key = this.key.evaluate(f, s, l, (f & 128) > 0 ? null : c);
            if (c !== null) {
                c.observe(instance, key);
            }
            return instance[key];
        }
        return void 0;
    }
    assign(f, s, l, val) {
        const instance = this.object.evaluate(f, s, l, null);
        const key = this.key.evaluate(f, s, l, null);
        return instance[key] = val;
    }
    accept(visitor) {
        return visitor.visitAccessKeyed(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class CallScopeExpression {
    constructor(name, args, ancestor = 0) {
        this.name = name;
        this.args = args;
        this.ancestor = ancestor;
    }
    get $kind() { return 1448; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const args = this.args.map(a => a.evaluate(f, s, l, c));
        const context = BindingContext.get(s, this.name, this.ancestor, f);
        const func = getFunction(f, context, this.name);
        if (func) {
            return func.apply(context, args);
        }
        return void 0;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitCallScope(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class CallMemberExpression {
    constructor(object, name, args) {
        this.object = object;
        this.name = name;
        this.args = args;
    }
    get $kind() { return 1161; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const instance = this.object.evaluate(f, s, l, (f & 128) > 0 ? null : c);
        const args = this.args.map(a => a.evaluate(f, s, l, c));
        const func = getFunction(f, instance, this.name);
        if (func) {
            return func.apply(instance, args);
        }
        return void 0;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitCallMember(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class CallFunctionExpression {
    constructor(func, args) {
        this.func = func;
        this.args = args;
    }
    get $kind() { return 1162; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const func = this.func.evaluate(f, s, l, c);
        if (isFunction(func)) {
            return func(...this.args.map(a => a.evaluate(f, s, l, c)));
        }
        if (!(f & 8) && (func == null)) {
            return void 0;
        }
        throw new Error(`AUR0107: Expression is not a function.`);
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitCallFunction(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class BinaryExpression {
    constructor(operation, left, right) {
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    get $kind() { return 46; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        switch (this.operation) {
            case '&&':
                return this.left.evaluate(f, s, l, c) && this.right.evaluate(f, s, l, c);
            case '||':
                return this.left.evaluate(f, s, l, c) || this.right.evaluate(f, s, l, c);
            case '==':
                return this.left.evaluate(f, s, l, c) == this.right.evaluate(f, s, l, c);
            case '===':
                return this.left.evaluate(f, s, l, c) === this.right.evaluate(f, s, l, c);
            case '!=':
                return this.left.evaluate(f, s, l, c) != this.right.evaluate(f, s, l, c);
            case '!==':
                return this.left.evaluate(f, s, l, c) !== this.right.evaluate(f, s, l, c);
            case 'instanceof': {
                const right = this.right.evaluate(f, s, l, c);
                if (isFunction(right)) {
                    return this.left.evaluate(f, s, l, c) instanceof right;
                }
                return false;
            }
            case 'in': {
                const right = this.right.evaluate(f, s, l, c);
                if (right instanceof Object) {
                    return this.left.evaluate(f, s, l, c) in right;
                }
                return false;
            }
            case '+': {
                const left = this.left.evaluate(f, s, l, c);
                const right = this.right.evaluate(f, s, l, c);
                if ((f & 1) > 0) {
                    return left + right;
                }
                if (!left || !right) {
                    if (isNumberOrBigInt(left) || isNumberOrBigInt(right)) {
                        return (left || 0) + (right || 0);
                    }
                    if (isStringOrDate(left) || isStringOrDate(right)) {
                        return (left || '') + (right || '');
                    }
                }
                return left + right;
            }
            case '-':
                return this.left.evaluate(f, s, l, c) - this.right.evaluate(f, s, l, c);
            case '*':
                return this.left.evaluate(f, s, l, c) * this.right.evaluate(f, s, l, c);
            case '/':
                return this.left.evaluate(f, s, l, c) / this.right.evaluate(f, s, l, c);
            case '%':
                return this.left.evaluate(f, s, l, c) % this.right.evaluate(f, s, l, c);
            case '<':
                return this.left.evaluate(f, s, l, c) < this.right.evaluate(f, s, l, c);
            case '>':
                return this.left.evaluate(f, s, l, c) > this.right.evaluate(f, s, l, c);
            case '<=':
                return this.left.evaluate(f, s, l, c) <= this.right.evaluate(f, s, l, c);
            case '>=':
                return this.left.evaluate(f, s, l, c) >= this.right.evaluate(f, s, l, c);
            default:
                throw new Error(`AUR0108: Unknown binary operator: '${this.operation}'`);
        }
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitBinary(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class UnaryExpression {
    constructor(operation, expression) {
        this.operation = operation;
        this.expression = expression;
    }
    get $kind() { return 39; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        switch (this.operation) {
            case 'void':
                return void this.expression.evaluate(f, s, l, c);
            case 'typeof':
                return typeof this.expression.evaluate(f | 1, s, l, c);
            case '!':
                return !this.expression.evaluate(f, s, l, c);
            case '-':
                return -this.expression.evaluate(f, s, l, c);
            case '+':
                return +this.expression.evaluate(f, s, l, c);
            default:
                throw new Error(`AUR0109: Unknown unary operator: '${this.operation}'`);
        }
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitUnary(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class PrimitiveLiteralExpression {
    constructor(value) {
        this.value = value;
    }
    get $kind() { return 17925; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(_f, _s, _l, _c) {
        return this.value;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitPrimitiveLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
PrimitiveLiteralExpression.$undefined = new PrimitiveLiteralExpression(void 0);
PrimitiveLiteralExpression.$null = new PrimitiveLiteralExpression(null);
PrimitiveLiteralExpression.$true = new PrimitiveLiteralExpression(true);
PrimitiveLiteralExpression.$false = new PrimitiveLiteralExpression(false);
PrimitiveLiteralExpression.$empty = new PrimitiveLiteralExpression('');
class HtmlLiteralExpression {
    constructor(parts) {
        this.parts = parts;
    }
    get $kind() { return 51; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        let result = '';
        for (let i = 0; i < this.parts.length; ++i) {
            const v = this.parts[i].evaluate(f, s, l, c);
            if (v == null) {
                continue;
            }
            result += v;
        }
        return result;
    }
    assign(_f, _s, _l, _obj, _projection) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitHtmlLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class ArrayLiteralExpression {
    constructor(elements) {
        this.elements = elements;
    }
    get $kind() { return 17955; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        return this.elements.map(e => e.evaluate(f, s, l, c));
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitArrayLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
ArrayLiteralExpression.$empty = new ArrayLiteralExpression(emptyArray);
class ObjectLiteralExpression {
    constructor(keys, values) {
        this.keys = keys;
        this.values = values;
    }
    get $kind() { return 17956; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const instance = {};
        for (let i = 0; i < this.keys.length; ++i) {
            instance[this.keys[i]] = this.values[i].evaluate(f, s, l, c);
        }
        return instance;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitObjectLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
ObjectLiteralExpression.$empty = new ObjectLiteralExpression(emptyArray, emptyArray);
class TemplateExpression {
    constructor(cooked, expressions = emptyArray) {
        this.cooked = cooked;
        this.expressions = expressions;
    }
    get $kind() { return 17958; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        let result = this.cooked[0];
        for (let i = 0; i < this.expressions.length; ++i) {
            result += String(this.expressions[i].evaluate(f, s, l, c));
            result += this.cooked[i + 1];
        }
        return result;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitTemplate(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
TemplateExpression.$empty = new TemplateExpression(['']);
class TaggedTemplateExpression {
    constructor(cooked, raw, func, expressions = emptyArray) {
        this.cooked = cooked;
        this.func = func;
        this.expressions = expressions;
        cooked.raw = raw;
    }
    get $kind() { return 1197; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        const results = this.expressions.map(e => e.evaluate(f, s, l, c));
        const func = this.func.evaluate(f, s, l, c);
        if (!isFunction(func)) {
            throw new Error(`AUR0110: Left-hand side of tagged template expression is not a function.`);
        }
        return func(this.cooked, ...results);
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitTaggedTemplate(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class ArrayBindingPattern {
    constructor(elements) {
        this.elements = elements;
    }
    get $kind() { return 65556; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(_f, _s, _l, _c) {
        return void 0;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitArrayBindingPattern(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class ObjectBindingPattern {
    constructor(keys, values) {
        this.keys = keys;
        this.values = values;
    }
    get $kind() { return 65557; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(_f, _s, _l, _c) {
        return void 0;
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitObjectBindingPattern(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class BindingIdentifier {
    constructor(name) {
        this.name = name;
    }
    get $kind() { return 65558; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(_f, _s, _l, _c) {
        return this.name;
    }
    accept(visitor) {
        return visitor.visitBindingIdentifier(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
const toStringTag$1 = Object.prototype.toString;
class ForOfStatement {
    constructor(declaration, iterable) {
        this.declaration = declaration;
        this.iterable = iterable;
    }
    get $kind() { return 6199; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        return this.iterable.evaluate(f, s, l, c);
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    count(_f, result) {
        switch (toStringTag$1.call(result)) {
            case '[object Array]': return result.length;
            case '[object Map]': return result.size;
            case '[object Set]': return result.size;
            case '[object Number]': return result;
            case '[object Null]': return 0;
            case '[object Undefined]': return 0;
            default: throw new Error(`Cannot count ${toStringTag$1.call(result)}`);
        }
    }
    iterate(f, result, func) {
        switch (toStringTag$1.call(result)) {
            case '[object Array]': return $array(result, func);
            case '[object Map]': return $map(result, func);
            case '[object Set]': return $set$1(result, func);
            case '[object Number]': return $number(result, func);
            case '[object Null]': return;
            case '[object Undefined]': return;
            default: throw new Error(`Cannot iterate over ${toStringTag$1.call(result)}`);
        }
    }
    bind(f, s, b) {
        if (this.iterable.hasBind) {
            this.iterable.bind(f, s, b);
        }
    }
    unbind(f, s, b) {
        if (this.iterable.hasUnbind) {
            this.iterable.unbind(f, s, b);
        }
    }
    accept(visitor) {
        return visitor.visitForOfStatement(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class Interpolation {
    constructor(parts, expressions = emptyArray) {
        this.parts = parts;
        this.expressions = expressions;
        this.isMulti = expressions.length > 1;
        this.firstExpression = expressions[0];
    }
    get $kind() { return 24; }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(f, s, l, c) {
        if (this.isMulti) {
            let result = this.parts[0];
            for (let i = 0; i < this.expressions.length; ++i) {
                result += String(this.expressions[i].evaluate(f, s, l, c));
                result += this.parts[i + 1];
            }
            return result;
        }
        else {
            return `${this.parts[0]}${this.firstExpression.evaluate(f, s, l, c)}${this.parts[1]}`;
        }
    }
    assign(_f, _s, _l, _obj) {
        return void 0;
    }
    accept(visitor) {
        return visitor.visitInterpolation(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class DestructuringAssignmentExpression {
    constructor($kind, list, source, initializer) {
        this.$kind = $kind;
        this.list = list;
        this.source = source;
        this.initializer = initializer;
    }
    get hasBind() { return false; }
    get hasUnbind() { return false; }
    evaluate(_f, _s, _l, _c) {
        return void 0;
    }
    assign(f, s, l, value) {
        var _a;
        const list = this.list;
        const len = list.length;
        let i;
        let item;
        for (i = 0; i < len; i++) {
            item = list[i];
            switch (item.$kind) {
                case 139289:
                    item.assign(f, s, l, value);
                    break;
                case 90137:
                case 106521: {
                    if (typeof value !== 'object' || value === null) {
                        {
                            throw new Error(`AUR0112: Cannot use non-object value for destructuring assignment.`);
                        }
                    }
                    let source = item.source.evaluate(f, Scope.create(value), l, null);
                    if (source === void 0) {
                        source = (_a = item.initializer) === null || _a === void 0 ? void 0 : _a.evaluate(f, s, l, null);
                    }
                    item.assign(f, s, l, source);
                    break;
                }
            }
        }
    }
    accept(visitor) {
        return visitor.visitDestructuringAssignmentExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class DestructuringAssignmentSingleExpression {
    constructor(target, source, initializer) {
        this.target = target;
        this.source = source;
        this.initializer = initializer;
    }
    get $kind() { return 139289; }
    evaluate(_f, _s, _l, _c) {
        return void 0;
    }
    assign(f, s, l, value) {
        var _a;
        if (value == null) {
            return;
        }
        if (typeof value !== 'object') {
            {
                throw new Error(`AUR0112: Cannot use non-object value for destructuring assignment.`);
            }
        }
        let source = this.source.evaluate(f, Scope.create(value), l, null);
        if (source === void 0) {
            source = (_a = this.initializer) === null || _a === void 0 ? void 0 : _a.evaluate(f, s, l, null);
        }
        this.target.assign(f, s, l, source);
    }
    accept(visitor) {
        return visitor.visitDestructuringAssignmentSingleExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
class DestructuringAssignmentRestExpression {
    constructor(target, indexOrProperties) {
        this.target = target;
        this.indexOrProperties = indexOrProperties;
    }
    get $kind() { return 139289; }
    evaluate(_f, _s, _l, _c) {
        return void 0;
    }
    assign(f, s, l, value) {
        if (value == null) {
            return;
        }
        if (typeof value !== 'object') {
            {
                throw new Error(`AUR0112: Cannot use non-object value for destructuring assignment.`);
            }
        }
        const indexOrProperties = this.indexOrProperties;
        let restValue;
        if (isArrayIndex(indexOrProperties)) {
            if (!Array.isArray(value)) {
                {
                    throw new Error(`AUR0112: Cannot use non-array value for array-destructuring assignment.`);
                }
            }
            restValue = value.slice(indexOrProperties);
        }
        else {
            restValue = Object
                .entries(value)
                .reduce((acc, [k, v]) => {
                if (!indexOrProperties.includes(k)) {
                    acc[k] = v;
                }
                return acc;
            }, {});
        }
        this.target.assign(f, s, l, restValue);
    }
    accept(_visitor) {
        return _visitor.visitDestructuringAssignmentRestExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}
function getFunction(f, obj, name) {
    const func = obj == null ? null : obj[name];
    if (isFunction(func)) {
        return func;
    }
    if (!(f & 8) && func == null) {
        return null;
    }
    throw new Error(`AUR0111: Expected '${name}' to be a function`);
}
function $array(result, func) {
    for (let i = 0, ii = result.length; i < ii; ++i) {
        func(result, i, result[i]);
    }
}
function $map(result, func) {
    const arr = Array(result.size);
    let i = -1;
    for (const entry of result.entries()) {
        arr[++i] = entry;
    }
    $array(arr, func);
}
function $set$1(result, func) {
    const arr = Array(result.size);
    let i = -1;
    for (const key of result.keys()) {
        arr[++i] = key;
    }
    $array(arr, func);
}
function $number(result, func) {
    const arr = Array(result);
    for (let i = 0; i < result; ++i) {
        arr[i] = i;
    }
    $array(arr, func);
}

const ICoercionConfiguration = DI.createInterface('ICoercionConfiguration');
var BindingMode;
(function (BindingMode) {
    BindingMode[BindingMode["oneTime"] = 1] = "oneTime";
    BindingMode[BindingMode["toView"] = 2] = "toView";
    BindingMode[BindingMode["fromView"] = 4] = "fromView";
    BindingMode[BindingMode["twoWay"] = 6] = "twoWay";
    BindingMode[BindingMode["default"] = 8] = "default";
})(BindingMode || (BindingMode = {}));
var LifecycleFlags;
(function (LifecycleFlags) {
    LifecycleFlags[LifecycleFlags["none"] = 0] = "none";
    LifecycleFlags[LifecycleFlags["persistentBindingFlags"] = 961] = "persistentBindingFlags";
    LifecycleFlags[LifecycleFlags["allowParentScopeTraversal"] = 64] = "allowParentScopeTraversal";
    LifecycleFlags[LifecycleFlags["observeLeafPropertiesOnly"] = 128] = "observeLeafPropertiesOnly";
    LifecycleFlags[LifecycleFlags["targetObserverFlags"] = 769] = "targetObserverFlags";
    LifecycleFlags[LifecycleFlags["noFlush"] = 256] = "noFlush";
    LifecycleFlags[LifecycleFlags["persistentTargetObserverQueue"] = 512] = "persistentTargetObserverQueue";
    LifecycleFlags[LifecycleFlags["bindingStrategy"] = 1] = "bindingStrategy";
    LifecycleFlags[LifecycleFlags["isStrictBindingStrategy"] = 1] = "isStrictBindingStrategy";
    LifecycleFlags[LifecycleFlags["fromBind"] = 2] = "fromBind";
    LifecycleFlags[LifecycleFlags["fromUnbind"] = 4] = "fromUnbind";
    LifecycleFlags[LifecycleFlags["mustEvaluate"] = 8] = "mustEvaluate";
    LifecycleFlags[LifecycleFlags["isTraversingParentScope"] = 16] = "isTraversingParentScope";
    LifecycleFlags[LifecycleFlags["dispose"] = 32] = "dispose";
})(LifecycleFlags || (LifecycleFlags = {}));
var SubscriberFlags;
(function (SubscriberFlags) {
    SubscriberFlags[SubscriberFlags["None"] = 0] = "None";
    SubscriberFlags[SubscriberFlags["Subscriber0"] = 1] = "Subscriber0";
    SubscriberFlags[SubscriberFlags["Subscriber1"] = 2] = "Subscriber1";
    SubscriberFlags[SubscriberFlags["Subscriber2"] = 4] = "Subscriber2";
    SubscriberFlags[SubscriberFlags["SubscribersRest"] = 8] = "SubscribersRest";
    SubscriberFlags[SubscriberFlags["Any"] = 15] = "Any";
})(SubscriberFlags || (SubscriberFlags = {}));
var DelegationStrategy;
(function (DelegationStrategy) {
    DelegationStrategy[DelegationStrategy["none"] = 0] = "none";
    DelegationStrategy[DelegationStrategy["capturing"] = 1] = "capturing";
    DelegationStrategy[DelegationStrategy["bubbling"] = 2] = "bubbling";
})(DelegationStrategy || (DelegationStrategy = {}));
var CollectionKind;
(function (CollectionKind) {
    CollectionKind[CollectionKind["indexed"] = 8] = "indexed";
    CollectionKind[CollectionKind["keyed"] = 4] = "keyed";
    CollectionKind[CollectionKind["array"] = 9] = "array";
    CollectionKind[CollectionKind["map"] = 6] = "map";
    CollectionKind[CollectionKind["set"] = 7] = "set";
})(CollectionKind || (CollectionKind = {}));
var AccessorType;
(function (AccessorType) {
    AccessorType[AccessorType["None"] = 0] = "None";
    AccessorType[AccessorType["Observer"] = 1] = "Observer";
    AccessorType[AccessorType["Node"] = 2] = "Node";
    AccessorType[AccessorType["Layout"] = 4] = "Layout";
    AccessorType[AccessorType["Primtive"] = 8] = "Primtive";
    AccessorType[AccessorType["Array"] = 18] = "Array";
    AccessorType[AccessorType["Set"] = 34] = "Set";
    AccessorType[AccessorType["Map"] = 66] = "Map";
})(AccessorType || (AccessorType = {}));
function copyIndexMap(existing, deletedItems) {
    const { length } = existing;
    const arr = Array(length);
    let i = 0;
    while (i < length) {
        arr[i] = existing[i];
        ++i;
    }
    if (deletedItems !== void 0) {
        arr.deletedItems = deletedItems.slice(0);
    }
    else if (existing.deletedItems !== void 0) {
        arr.deletedItems = existing.deletedItems.slice(0);
    }
    else {
        arr.deletedItems = [];
    }
    arr.isIndexMap = true;
    return arr;
}
function createIndexMap(length = 0) {
    const arr = Array(length);
    let i = 0;
    while (i < length) {
        arr[i] = i++;
    }
    arr.deletedItems = [];
    arr.isIndexMap = true;
    return arr;
}
function cloneIndexMap(indexMap) {
    const clone = indexMap.slice();
    clone.deletedItems = indexMap.deletedItems.slice();
    clone.isIndexMap = true;
    return clone;
}
function isIndexMap(value) {
    return value instanceof Array && value.isIndexMap === true;
}

function subscriberCollection(target) {
    return target == null ? subscriberCollectionDeco : subscriberCollectionDeco(target);
}
function subscriberCollectionDeco(target) {
    const proto = target.prototype;
    def(proto, 'subs', { get: getSubscriberRecord });
    ensureProto(proto, 'subscribe', addSubscriber);
    ensureProto(proto, 'unsubscribe', removeSubscriber);
}
class SubscriberRecord {
    constructor() {
        this.sf = 0;
        this.count = 0;
    }
    add(subscriber) {
        if (this.has(subscriber)) {
            return false;
        }
        const subscriberFlags = this.sf;
        if ((subscriberFlags & 1) === 0) {
            this.s0 = subscriber;
            this.sf |= 1;
        }
        else if ((subscriberFlags & 2) === 0) {
            this.s1 = subscriber;
            this.sf |= 2;
        }
        else if ((subscriberFlags & 4) === 0) {
            this.s2 = subscriber;
            this.sf |= 4;
        }
        else if ((subscriberFlags & 8) === 0) {
            this.sr = [subscriber];
            this.sf |= 8;
        }
        else {
            this.sr.push(subscriber);
        }
        ++this.count;
        return true;
    }
    has(subscriber) {
        const subscriberFlags = this.sf;
        if ((subscriberFlags & 1) > 0 && this.s0 === subscriber) {
            return true;
        }
        if ((subscriberFlags & 2) > 0 && this.s1 === subscriber) {
            return true;
        }
        if ((subscriberFlags & 4) > 0 && this.s2 === subscriber) {
            return true;
        }
        if ((subscriberFlags & 8) > 0) {
            const subscribers = this.sr;
            const ii = subscribers.length;
            let i = 0;
            for (; i < ii; ++i) {
                if (subscribers[i] === subscriber) {
                    return true;
                }
            }
        }
        return false;
    }
    any() {
        return this.sf !== 0;
    }
    remove(subscriber) {
        const subscriberFlags = this.sf;
        if ((subscriberFlags & 1) > 0 && this.s0 === subscriber) {
            this.s0 = void 0;
            this.sf = (this.sf | 1) ^ 1;
            --this.count;
            return true;
        }
        else if ((subscriberFlags & 2) > 0 && this.s1 === subscriber) {
            this.s1 = void 0;
            this.sf = (this.sf | 2) ^ 2;
            --this.count;
            return true;
        }
        else if ((subscriberFlags & 4) > 0 && this.s2 === subscriber) {
            this.s2 = void 0;
            this.sf = (this.sf | 4) ^ 4;
            --this.count;
            return true;
        }
        else if ((subscriberFlags & 8) > 0) {
            const subscribers = this.sr;
            const ii = subscribers.length;
            let i = 0;
            for (; i < ii; ++i) {
                if (subscribers[i] === subscriber) {
                    subscribers.splice(i, 1);
                    if (ii === 1) {
                        this.sf = (this.sf | 8) ^ 8;
                    }
                    --this.count;
                    return true;
                }
            }
        }
        return false;
    }
    notify(val, oldVal, flags) {
        const sub0 = this.s0;
        const sub1 = this.s1;
        const sub2 = this.s2;
        let subs = this.sr;
        if (subs !== void 0) {
            subs = subs.slice();
        }
        if (sub0 !== void 0) {
            sub0.handleChange(val, oldVal, flags);
        }
        if (sub1 !== void 0) {
            sub1.handleChange(val, oldVal, flags);
        }
        if (sub2 !== void 0) {
            sub2.handleChange(val, oldVal, flags);
        }
        if (subs !== void 0) {
            const ii = subs.length;
            let sub;
            let i = 0;
            for (; i < ii; ++i) {
                sub = subs[i];
                if (sub !== void 0) {
                    sub.handleChange(val, oldVal, flags);
                }
            }
        }
    }
    notifyCollection(indexMap, flags) {
        const sub0 = this.s0;
        const sub1 = this.s1;
        const sub2 = this.s2;
        let subs = this.sr;
        if (subs !== void 0) {
            subs = subs.slice();
        }
        if (sub0 !== void 0) {
            sub0.handleCollectionChange(indexMap, flags);
        }
        if (sub1 !== void 0) {
            sub1.handleCollectionChange(indexMap, flags);
        }
        if (sub2 !== void 0) {
            sub2.handleCollectionChange(indexMap, flags);
        }
        if (subs !== void 0) {
            const ii = subs.length;
            let sub;
            let i = 0;
            for (; i < ii; ++i) {
                sub = subs[i];
                if (sub !== void 0) {
                    sub.handleCollectionChange(indexMap, flags);
                }
            }
        }
    }
}
function getSubscriberRecord() {
    return defineHiddenProp(this, 'subs', new SubscriberRecord());
}
function addSubscriber(subscriber) {
    return this.subs.add(subscriber);
}
function removeSubscriber(subscriber) {
    return this.subs.remove(subscriber);
}

function withFlushQueue(target) {
    return target == null ? queueableDeco : queueableDeco(target);
}
function queueableDeco(target) {
    const proto = target.prototype;
    def(proto, 'queue', { get: getFlushQueue });
}
class FlushQueue {
    constructor() {
        this._flushing = false;
        this._items = new Set();
    }
    get count() {
        return this._items.size;
    }
    add(callable) {
        this._items.add(callable);
        if (this._flushing) {
            return;
        }
        this._flushing = true;
        try {
            this._items.forEach(flushItem);
        }
        finally {
            this._flushing = false;
        }
    }
    clear() {
        this._items.clear();
        this._flushing = false;
    }
}
FlushQueue.instance = new FlushQueue();
function getFlushQueue() {
    return FlushQueue.instance;
}
function flushItem(item, _, items) {
    items.delete(item);
    item.flush();
}

class CollectionLengthObserver {
    constructor(owner) {
        this.owner = owner;
        this.type = 18;
        this.f = 0;
        this._value = this._oldvalue = (this._obj = owner.collection).length;
    }
    getValue() {
        return this._obj.length;
    }
    setValue(newValue, flags) {
        const currentValue = this._value;
        if (newValue !== currentValue && isArrayIndex(newValue)) {
            if ((flags & 256) === 0) {
                this._obj.length = newValue;
            }
            this._value = newValue;
            this._oldvalue = currentValue;
            this.f = flags;
            this.queue.add(this);
        }
    }
    handleCollectionChange(_, flags) {
        const oldValue = this._value;
        const value = this._obj.length;
        if ((this._value = value) !== oldValue) {
            this._oldvalue = oldValue;
            this.f = flags;
            this.queue.add(this);
        }
    }
    flush() {
        oV$2 = this._oldvalue;
        this._oldvalue = this._value;
        this.subs.notify(this._value, oV$2, this.f);
    }
}
class CollectionSizeObserver {
    constructor(owner) {
        this.owner = owner;
        this.f = 0;
        this._value = this._oldvalue = (this._obj = owner.collection).size;
        this.type = this._obj instanceof Map ? 66 : 34;
    }
    getValue() {
        return this._obj.size;
    }
    setValue() {
        throw new Error(`AUR02: Map/Set "size" is a readonly property`);
    }
    handleCollectionChange(_, flags) {
        const oldValue = this._value;
        const value = this._obj.size;
        if ((this._value = value) !== oldValue) {
            this._oldvalue = oldValue;
            this.f = flags;
            this.queue.add(this);
        }
    }
    flush() {
        oV$2 = this._oldvalue;
        this._oldvalue = this._value;
        this.subs.notify(this._value, oV$2, this.f);
    }
}
function implementLengthObserver(klass) {
    const proto = klass.prototype;
    ensureProto(proto, 'subscribe', subscribe, true);
    ensureProto(proto, 'unsubscribe', unsubscribe, true);
    withFlushQueue(klass);
    subscriberCollection(klass);
}
function subscribe(subscriber) {
    if (this.subs.add(subscriber) && this.subs.count === 1) {
        this.owner.subscribe(this);
    }
}
function unsubscribe(subscriber) {
    if (this.subs.remove(subscriber) && this.subs.count === 0) {
        this.owner.subscribe(this);
    }
}
implementLengthObserver(CollectionLengthObserver);
implementLengthObserver(CollectionSizeObserver);
let oV$2 = void 0;

const observerLookup$2 = new WeakMap();
function sortCompare(x, y) {
    if (x === y) {
        return 0;
    }
    x = x === null ? 'null' : x.toString();
    y = y === null ? 'null' : y.toString();
    return x < y ? -1 : 1;
}
function preSortCompare(x, y) {
    if (x === void 0) {
        if (y === void 0) {
            return 0;
        }
        else {
            return 1;
        }
    }
    if (y === void 0) {
        return -1;
    }
    return 0;
}
function insertionSort(arr, indexMap, from, to, compareFn) {
    let velement, ielement, vtmp, itmp, order;
    let i, j;
    for (i = from + 1; i < to; i++) {
        velement = arr[i];
        ielement = indexMap[i];
        for (j = i - 1; j >= from; j--) {
            vtmp = arr[j];
            itmp = indexMap[j];
            order = compareFn(vtmp, velement);
            if (order > 0) {
                arr[j + 1] = vtmp;
                indexMap[j + 1] = itmp;
            }
            else {
                break;
            }
        }
        arr[j + 1] = velement;
        indexMap[j + 1] = ielement;
    }
}
function quickSort(arr, indexMap, from, to, compareFn) {
    let thirdIndex = 0, i = 0;
    let v0, v1, v2;
    let i0, i1, i2;
    let c01, c02, c12;
    let vtmp, itmp;
    let vpivot, ipivot, lowEnd, highStart;
    let velement, ielement, order, vtopElement;
    while (true) {
        if (to - from <= 10) {
            insertionSort(arr, indexMap, from, to, compareFn);
            return;
        }
        thirdIndex = from + ((to - from) >> 1);
        v0 = arr[from];
        i0 = indexMap[from];
        v1 = arr[to - 1];
        i1 = indexMap[to - 1];
        v2 = arr[thirdIndex];
        i2 = indexMap[thirdIndex];
        c01 = compareFn(v0, v1);
        if (c01 > 0) {
            vtmp = v0;
            itmp = i0;
            v0 = v1;
            i0 = i1;
            v1 = vtmp;
            i1 = itmp;
        }
        c02 = compareFn(v0, v2);
        if (c02 >= 0) {
            vtmp = v0;
            itmp = i0;
            v0 = v2;
            i0 = i2;
            v2 = v1;
            i2 = i1;
            v1 = vtmp;
            i1 = itmp;
        }
        else {
            c12 = compareFn(v1, v2);
            if (c12 > 0) {
                vtmp = v1;
                itmp = i1;
                v1 = v2;
                i1 = i2;
                v2 = vtmp;
                i2 = itmp;
            }
        }
        arr[from] = v0;
        indexMap[from] = i0;
        arr[to - 1] = v2;
        indexMap[to - 1] = i2;
        vpivot = v1;
        ipivot = i1;
        lowEnd = from + 1;
        highStart = to - 1;
        arr[thirdIndex] = arr[lowEnd];
        indexMap[thirdIndex] = indexMap[lowEnd];
        arr[lowEnd] = vpivot;
        indexMap[lowEnd] = ipivot;
        partition: for (i = lowEnd + 1; i < highStart; i++) {
            velement = arr[i];
            ielement = indexMap[i];
            order = compareFn(velement, vpivot);
            if (order < 0) {
                arr[i] = arr[lowEnd];
                indexMap[i] = indexMap[lowEnd];
                arr[lowEnd] = velement;
                indexMap[lowEnd] = ielement;
                lowEnd++;
            }
            else if (order > 0) {
                do {
                    highStart--;
                    if (highStart == i) {
                        break partition;
                    }
                    vtopElement = arr[highStart];
                    order = compareFn(vtopElement, vpivot);
                } while (order > 0);
                arr[i] = arr[highStart];
                indexMap[i] = indexMap[highStart];
                arr[highStart] = velement;
                indexMap[highStart] = ielement;
                if (order < 0) {
                    velement = arr[i];
                    ielement = indexMap[i];
                    arr[i] = arr[lowEnd];
                    indexMap[i] = indexMap[lowEnd];
                    arr[lowEnd] = velement;
                    indexMap[lowEnd] = ielement;
                    lowEnd++;
                }
            }
        }
        if (to - highStart < lowEnd - from) {
            quickSort(arr, indexMap, highStart, to, compareFn);
            to = lowEnd;
        }
        else {
            quickSort(arr, indexMap, from, lowEnd, compareFn);
            from = highStart;
        }
    }
}
const proto$2 = Array.prototype;
const $push = proto$2.push;
const $unshift = proto$2.unshift;
const $pop = proto$2.pop;
const $shift = proto$2.shift;
const $splice = proto$2.splice;
const $reverse = proto$2.reverse;
const $sort = proto$2.sort;
const native$2 = { push: $push, unshift: $unshift, pop: $pop, shift: $shift, splice: $splice, reverse: $reverse, sort: $sort };
const methods$2 = ['push', 'unshift', 'pop', 'shift', 'splice', 'reverse', 'sort'];
const observe$3 = {
    push: function (...args) {
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            return $push.apply(this, args);
        }
        const len = this.length;
        const argCount = args.length;
        if (argCount === 0) {
            return len;
        }
        this.length = o.indexMap.length = len + argCount;
        let i = len;
        while (i < this.length) {
            this[i] = args[i - len];
            o.indexMap[i] = -2;
            i++;
        }
        o.notify();
        return this.length;
    },
    unshift: function (...args) {
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            return $unshift.apply(this, args);
        }
        const argCount = args.length;
        const inserts = new Array(argCount);
        let i = 0;
        while (i < argCount) {
            inserts[i++] = -2;
        }
        $unshift.apply(o.indexMap, inserts);
        const len = $unshift.apply(this, args);
        o.notify();
        return len;
    },
    pop: function () {
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            return $pop.call(this);
        }
        const indexMap = o.indexMap;
        const element = $pop.call(this);
        const index = indexMap.length - 1;
        if (indexMap[index] > -1) {
            indexMap.deletedItems.push(indexMap[index]);
        }
        $pop.call(indexMap);
        o.notify();
        return element;
    },
    shift: function () {
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            return $shift.call(this);
        }
        const indexMap = o.indexMap;
        const element = $shift.call(this);
        if (indexMap[0] > -1) {
            indexMap.deletedItems.push(indexMap[0]);
        }
        $shift.call(indexMap);
        o.notify();
        return element;
    },
    splice: function (...args) {
        const start = args[0];
        const deleteCount = args[1];
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            return $splice.apply(this, args);
        }
        const len = this.length;
        const relativeStart = start | 0;
        const actualStart = relativeStart < 0 ? Math.max((len + relativeStart), 0) : Math.min(relativeStart, len);
        const indexMap = o.indexMap;
        const argCount = args.length;
        const actualDeleteCount = argCount === 0 ? 0 : argCount === 1 ? len - actualStart : deleteCount;
        if (actualDeleteCount > 0) {
            let i = actualStart;
            const to = i + actualDeleteCount;
            while (i < to) {
                if (indexMap[i] > -1) {
                    indexMap.deletedItems.push(indexMap[i]);
                }
                i++;
            }
        }
        if (argCount > 2) {
            const itemCount = argCount - 2;
            const inserts = new Array(itemCount);
            let i = 0;
            while (i < itemCount) {
                inserts[i++] = -2;
            }
            $splice.call(indexMap, start, deleteCount, ...inserts);
        }
        else {
            $splice.apply(indexMap, args);
        }
        const deleted = $splice.apply(this, args);
        o.notify();
        return deleted;
    },
    reverse: function () {
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            $reverse.call(this);
            return this;
        }
        const len = this.length;
        const middle = (len / 2) | 0;
        let lower = 0;
        while (lower !== middle) {
            const upper = len - lower - 1;
            const lowerValue = this[lower];
            const lowerIndex = o.indexMap[lower];
            const upperValue = this[upper];
            const upperIndex = o.indexMap[upper];
            this[lower] = upperValue;
            o.indexMap[lower] = upperIndex;
            this[upper] = lowerValue;
            o.indexMap[upper] = lowerIndex;
            lower++;
        }
        o.notify();
        return this;
    },
    sort: function (compareFn) {
        const o = observerLookup$2.get(this);
        if (o === void 0) {
            $sort.call(this, compareFn);
            return this;
        }
        const len = this.length;
        if (len < 2) {
            return this;
        }
        quickSort(this, o.indexMap, 0, len, preSortCompare);
        let i = 0;
        while (i < len) {
            if (this[i] === void 0) {
                break;
            }
            i++;
        }
        if (compareFn === void 0 || !isFunction(compareFn)) {
            compareFn = sortCompare;
        }
        quickSort(this, o.indexMap, 0, i, compareFn);
        o.notify();
        return this;
    }
};
for (const method of methods$2) {
    def(observe$3[method], 'observing', { value: true, writable: false, configurable: false, enumerable: false });
}
let enableArrayObservationCalled = false;
function enableArrayObservation() {
    for (const method of methods$2) {
        if (proto$2[method].observing !== true) {
            defineHiddenProp(proto$2, method, observe$3[method]);
        }
    }
}
function disableArrayObservation() {
    for (const method of methods$2) {
        if (proto$2[method].observing === true) {
            defineHiddenProp(proto$2, method, native$2[method]);
        }
    }
}
class ArrayObserver {
    constructor(array) {
        this.type = 18;
        if (!enableArrayObservationCalled) {
            enableArrayObservationCalled = true;
            enableArrayObservation();
        }
        this.indexObservers = {};
        this.collection = array;
        this.indexMap = createIndexMap(array.length);
        this.lenObs = void 0;
        observerLookup$2.set(array, this);
    }
    notify() {
        const indexMap = this.indexMap;
        const length = this.collection.length;
        this.indexMap = createIndexMap(length);
        this.subs.notifyCollection(indexMap, 0);
    }
    getLengthObserver() {
        var _a;
        return (_a = this.lenObs) !== null && _a !== void 0 ? _a : (this.lenObs = new CollectionLengthObserver(this));
    }
    getIndexObserver(index) {
        var _a;
        var _b;
        return (_a = (_b = this.indexObservers)[index]) !== null && _a !== void 0 ? _a : (_b[index] = new ArrayIndexObserver(this, index));
    }
}
class ArrayIndexObserver {
    constructor(owner, index) {
        this.owner = owner;
        this.index = index;
        this.doNotCache = true;
        this.value = this.getValue();
    }
    getValue() {
        return this.owner.collection[this.index];
    }
    setValue(newValue, flag) {
        if (newValue === this.getValue()) {
            return;
        }
        const arrayObserver = this.owner;
        const index = this.index;
        const indexMap = arrayObserver.indexMap;
        if (indexMap[index] > -1) {
            indexMap.deletedItems.push(indexMap[index]);
        }
        indexMap[index] = -2;
        arrayObserver.collection[index] = newValue;
        arrayObserver.notify();
    }
    handleCollectionChange(indexMap, flags) {
        const index = this.index;
        const noChange = indexMap[index] === index;
        if (noChange) {
            return;
        }
        const prevValue = this.value;
        const currValue = this.value = this.getValue();
        if (prevValue !== currValue) {
            this.subs.notify(currValue, prevValue, flags);
        }
    }
    subscribe(subscriber) {
        if (this.subs.add(subscriber) && this.subs.count === 1) {
            this.owner.subscribe(this);
        }
    }
    unsubscribe(subscriber) {
        if (this.subs.remove(subscriber) && this.subs.count === 0) {
            this.owner.unsubscribe(this);
        }
    }
}
subscriberCollection(ArrayObserver);
subscriberCollection(ArrayIndexObserver);
function getArrayObserver(array) {
    let observer = observerLookup$2.get(array);
    if (observer === void 0) {
        observer = new ArrayObserver(array);
    }
    return observer;
}
function applyMutationsToIndices(indexMap) {
    let offset = 0;
    let j = 0;
    const len = indexMap.length;
    for (let i = 0; i < len; ++i) {
        while (indexMap.deletedItems[j] <= i - offset) {
            ++j;
            --offset;
        }
        if (indexMap[i] === -2) {
            ++offset;
        }
        else {
            indexMap[i] += offset;
        }
    }
}
function synchronizeIndices(items, indexMap) {
    const copy = items.slice();
    const len = indexMap.length;
    let to = 0;
    let from = 0;
    while (to < len) {
        from = indexMap[to];
        if (from !== -2) {
            items[to] = copy[from];
        }
        ++to;
    }
}

const observerLookup$1 = new WeakMap();
const proto$1 = Set.prototype;
const $add = proto$1.add;
const $clear$1 = proto$1.clear;
const $delete$1 = proto$1.delete;
const native$1 = { add: $add, clear: $clear$1, delete: $delete$1 };
const methods$1 = ['add', 'clear', 'delete'];
const observe$2 = {
    add: function (value) {
        const o = observerLookup$1.get(this);
        if (o === undefined) {
            $add.call(this, value);
            return this;
        }
        const oldSize = this.size;
        $add.call(this, value);
        const newSize = this.size;
        if (newSize === oldSize) {
            return this;
        }
        o.indexMap[oldSize] = -2;
        o.notify();
        return this;
    },
    clear: function () {
        const o = observerLookup$1.get(this);
        if (o === undefined) {
            return $clear$1.call(this);
        }
        const size = this.size;
        if (size > 0) {
            const indexMap = o.indexMap;
            let i = 0;
            for (const _ of this.keys()) {
                if (indexMap[i] > -1) {
                    indexMap.deletedItems.push(indexMap[i]);
                }
                i++;
            }
            $clear$1.call(this);
            indexMap.length = 0;
            o.notify();
        }
        return undefined;
    },
    delete: function (value) {
        const o = observerLookup$1.get(this);
        if (o === undefined) {
            return $delete$1.call(this, value);
        }
        const size = this.size;
        if (size === 0) {
            return false;
        }
        let i = 0;
        const indexMap = o.indexMap;
        for (const entry of this.keys()) {
            if (entry === value) {
                if (indexMap[i] > -1) {
                    indexMap.deletedItems.push(indexMap[i]);
                }
                indexMap.splice(i, 1);
                const deleteResult = $delete$1.call(this, value);
                if (deleteResult === true) {
                    o.notify();
                }
                return deleteResult;
            }
            i++;
        }
        return false;
    }
};
const descriptorProps$1 = {
    writable: true,
    enumerable: false,
    configurable: true
};
for (const method of methods$1) {
    def(observe$2[method], 'observing', { value: true, writable: false, configurable: false, enumerable: false });
}
let enableSetObservationCalled = false;
function enableSetObservation() {
    for (const method of methods$1) {
        if (proto$1[method].observing !== true) {
            def(proto$1, method, { ...descriptorProps$1, value: observe$2[method] });
        }
    }
}
function disableSetObservation() {
    for (const method of methods$1) {
        if (proto$1[method].observing === true) {
            def(proto$1, method, { ...descriptorProps$1, value: native$1[method] });
        }
    }
}
class SetObserver {
    constructor(observedSet) {
        this.type = 34;
        if (!enableSetObservationCalled) {
            enableSetObservationCalled = true;
            enableSetObservation();
        }
        this.collection = observedSet;
        this.indexMap = createIndexMap(observedSet.size);
        this.lenObs = void 0;
        observerLookup$1.set(observedSet, this);
    }
    notify() {
        const indexMap = this.indexMap;
        const size = this.collection.size;
        this.indexMap = createIndexMap(size);
        this.subs.notifyCollection(indexMap, 0);
    }
    getLengthObserver() {
        var _a;
        return (_a = this.lenObs) !== null && _a !== void 0 ? _a : (this.lenObs = new CollectionSizeObserver(this));
    }
}
subscriberCollection(SetObserver);
function getSetObserver(observedSet) {
    let observer = observerLookup$1.get(observedSet);
    if (observer === void 0) {
        observer = new SetObserver(observedSet);
    }
    return observer;
}

const observerLookup = new WeakMap();
const proto = Map.prototype;
const $set = proto.set;
const $clear = proto.clear;
const $delete = proto.delete;
const native = { set: $set, clear: $clear, delete: $delete };
const methods = ['set', 'clear', 'delete'];
const observe$1 = {
    set: function (key, value) {
        const o = observerLookup.get(this);
        if (o === undefined) {
            $set.call(this, key, value);
            return this;
        }
        const oldValue = this.get(key);
        const oldSize = this.size;
        $set.call(this, key, value);
        const newSize = this.size;
        if (newSize === oldSize) {
            let i = 0;
            for (const entry of this.entries()) {
                if (entry[0] === key) {
                    if (entry[1] !== oldValue) {
                        o.indexMap.deletedItems.push(o.indexMap[i]);
                        o.indexMap[i] = -2;
                        o.notify();
                    }
                    return this;
                }
                i++;
            }
            return this;
        }
        o.indexMap[oldSize] = -2;
        o.notify();
        return this;
    },
    clear: function () {
        const o = observerLookup.get(this);
        if (o === undefined) {
            return $clear.call(this);
        }
        const size = this.size;
        if (size > 0) {
            const indexMap = o.indexMap;
            let i = 0;
            for (const _ of this.keys()) {
                if (indexMap[i] > -1) {
                    indexMap.deletedItems.push(indexMap[i]);
                }
                i++;
            }
            $clear.call(this);
            indexMap.length = 0;
            o.notify();
        }
        return undefined;
    },
    delete: function (value) {
        const o = observerLookup.get(this);
        if (o === undefined) {
            return $delete.call(this, value);
        }
        const size = this.size;
        if (size === 0) {
            return false;
        }
        let i = 0;
        const indexMap = o.indexMap;
        for (const entry of this.keys()) {
            if (entry === value) {
                if (indexMap[i] > -1) {
                    indexMap.deletedItems.push(indexMap[i]);
                }
                indexMap.splice(i, 1);
                const deleteResult = $delete.call(this, value);
                if (deleteResult === true) {
                    o.notify();
                }
                return deleteResult;
            }
            ++i;
        }
        return false;
    }
};
const descriptorProps = {
    writable: true,
    enumerable: false,
    configurable: true
};
for (const method of methods) {
    def(observe$1[method], 'observing', { value: true, writable: false, configurable: false, enumerable: false });
}
let enableMapObservationCalled = false;
function enableMapObservation() {
    for (const method of methods) {
        if (proto[method].observing !== true) {
            def(proto, method, { ...descriptorProps, value: observe$1[method] });
        }
    }
}
function disableMapObservation() {
    for (const method of methods) {
        if (proto[method].observing === true) {
            def(proto, method, { ...descriptorProps, value: native[method] });
        }
    }
}
class MapObserver {
    constructor(map) {
        this.type = 66;
        if (!enableMapObservationCalled) {
            enableMapObservationCalled = true;
            enableMapObservation();
        }
        this.collection = map;
        this.indexMap = createIndexMap(map.size);
        this.lenObs = void 0;
        observerLookup.set(map, this);
    }
    notify() {
        const indexMap = this.indexMap;
        const size = this.collection.size;
        this.indexMap = createIndexMap(size);
        this.subs.notifyCollection(indexMap, 0);
    }
    getLengthObserver() {
        var _a;
        return (_a = this.lenObs) !== null && _a !== void 0 ? _a : (this.lenObs = new CollectionSizeObserver(this));
    }
}
subscriberCollection(MapObserver);
function getMapObserver(map) {
    let observer = observerLookup.get(map);
    if (observer === void 0) {
        observer = new MapObserver(map);
    }
    return observer;
}

function observe(obj, key) {
    const observer = this.oL.getObserver(obj, key);
    this.obs.add(observer);
}
function getObserverRecord() {
    return defineHiddenProp(this, 'obs', new BindingObserverRecord(this));
}
function observeCollection(collection) {
    let obs;
    if (collection instanceof Array) {
        obs = getArrayObserver(collection);
    }
    else if (collection instanceof Set) {
        obs = getSetObserver(collection);
    }
    else if (collection instanceof Map) {
        obs = getMapObserver(collection);
    }
    else {
        throw new Error(`AUR0210: Unrecognised collection type.`);
    }
    this.obs.add(obs);
}
function subscribeTo(subscribable) {
    this.obs.add(subscribable);
}
function noopHandleChange() {
    throw new Error(`AUR2011: method "handleChange" not implemented`);
}
function noopHandleCollectionChange() {
    throw new Error(`AUR2012: method "handleCollectionChange" not implemented`);
}
class BindingObserverRecord {
    constructor(b) {
        this.version = 0;
        this.count = 0;
        this.o = new Map();
        this.b = b;
    }
    handleChange(value, oldValue, flags) {
        return this.b.interceptor.handleChange(value, oldValue, flags);
    }
    handleCollectionChange(indexMap, flags) {
        this.b.interceptor.handleCollectionChange(indexMap, flags);
    }
    add(observer) {
        if (!this.o.has(observer)) {
            observer.subscribe(this);
            ++this.count;
        }
        this.o.set(observer, this.version);
    }
    clear() {
        this.o.forEach(unsubscribeStale, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(unsubscribeAll, this);
        this.o.clear();
        this.count = 0;
    }
}
function unsubscribeAll(version, subscribable) {
    subscribable.unsubscribe(this);
}
function unsubscribeStale(version, subscribable) {
    if (this.version !== version) {
        subscribable.unsubscribe(this);
        this.o.delete(subscribable);
    }
}
function connectableDecorator(target) {
    const proto = target.prototype;
    ensureProto(proto, 'observe', observe, true);
    ensureProto(proto, 'observeCollection', observeCollection, true);
    ensureProto(proto, 'subscribeTo', subscribeTo, true);
    def(proto, 'obs', { get: getObserverRecord });
    ensureProto(proto, 'handleChange', noopHandleChange);
    ensureProto(proto, 'handleCollectionChange', noopHandleCollectionChange);
    return target;
}
function connectable(target) {
    return target == null ? connectableDecorator : connectableDecorator(target);
}
class BindingMediator {
    constructor(key, binding, oL, locator) {
        this.key = key;
        this.binding = binding;
        this.oL = oL;
        this.locator = locator;
        this.interceptor = this;
    }
    $bind() {
        throw new Error(`AUR0213: Method not implemented.`);
    }
    $unbind() {
        throw new Error(`AUR0214: Method not implemented.`);
    }
    handleChange(newValue, previousValue, flags) {
        this.binding[this.key](newValue, previousValue, flags);
    }
}
connectableDecorator(BindingMediator);

const IExpressionParser = DI.createInterface('IExpressionParser', x => x.singleton(ExpressionParser));
class ExpressionParser {
    constructor() {
        this._expressionLookup = createLookup();
        this._forOfLookup = createLookup();
        this._interpolationLookup = createLookup();
    }
    parse(expression, expressionType) {
        let found;
        switch (expressionType) {
            case 16:
                return new CustomExpression(expression);
            case 1:
                found = this._interpolationLookup[expression];
                if (found === void 0) {
                    found = this._interpolationLookup[expression] = this.$parse(expression, expressionType);
                }
                return found;
            case 2:
                found = this._forOfLookup[expression];
                if (found === void 0) {
                    found = this._forOfLookup[expression] = this.$parse(expression, expressionType);
                }
                return found;
            default: {
                if (expression.length === 0) {
                    if ((expressionType & (4 | 8)) > 0) {
                        return PrimitiveLiteralExpression.$empty;
                    }
                    throw new Error(`AUR0169: Invalid expression. Empty expression is only valid in event bindings (trigger, delegate, capture etc...)`);
                }
                found = this._expressionLookup[expression];
                if (found === void 0) {
                    found = this._expressionLookup[expression] = this.$parse(expression, expressionType);
                }
                return found;
            }
        }
    }
    $parse(expression, expressionType) {
        $state.ip = expression;
        $state.length = expression.length;
        $state.index = 0;
        $state._currentChar = expression.charCodeAt(0);
        return parse($state, 0, 61, expressionType === void 0 ? 8 : expressionType);
    }
}
var Char;
(function (Char) {
    Char[Char["Null"] = 0] = "Null";
    Char[Char["Backspace"] = 8] = "Backspace";
    Char[Char["Tab"] = 9] = "Tab";
    Char[Char["LineFeed"] = 10] = "LineFeed";
    Char[Char["VerticalTab"] = 11] = "VerticalTab";
    Char[Char["FormFeed"] = 12] = "FormFeed";
    Char[Char["CarriageReturn"] = 13] = "CarriageReturn";
    Char[Char["Space"] = 32] = "Space";
    Char[Char["Exclamation"] = 33] = "Exclamation";
    Char[Char["DoubleQuote"] = 34] = "DoubleQuote";
    Char[Char["Dollar"] = 36] = "Dollar";
    Char[Char["Percent"] = 37] = "Percent";
    Char[Char["Ampersand"] = 38] = "Ampersand";
    Char[Char["SingleQuote"] = 39] = "SingleQuote";
    Char[Char["OpenParen"] = 40] = "OpenParen";
    Char[Char["CloseParen"] = 41] = "CloseParen";
    Char[Char["Asterisk"] = 42] = "Asterisk";
    Char[Char["Plus"] = 43] = "Plus";
    Char[Char["Comma"] = 44] = "Comma";
    Char[Char["Minus"] = 45] = "Minus";
    Char[Char["Dot"] = 46] = "Dot";
    Char[Char["Slash"] = 47] = "Slash";
    Char[Char["Semicolon"] = 59] = "Semicolon";
    Char[Char["Backtick"] = 96] = "Backtick";
    Char[Char["OpenBracket"] = 91] = "OpenBracket";
    Char[Char["Backslash"] = 92] = "Backslash";
    Char[Char["CloseBracket"] = 93] = "CloseBracket";
    Char[Char["Caret"] = 94] = "Caret";
    Char[Char["Underscore"] = 95] = "Underscore";
    Char[Char["OpenBrace"] = 123] = "OpenBrace";
    Char[Char["Bar"] = 124] = "Bar";
    Char[Char["CloseBrace"] = 125] = "CloseBrace";
    Char[Char["Colon"] = 58] = "Colon";
    Char[Char["LessThan"] = 60] = "LessThan";
    Char[Char["Equals"] = 61] = "Equals";
    Char[Char["GreaterThan"] = 62] = "GreaterThan";
    Char[Char["Question"] = 63] = "Question";
    Char[Char["Zero"] = 48] = "Zero";
    Char[Char["One"] = 49] = "One";
    Char[Char["Two"] = 50] = "Two";
    Char[Char["Three"] = 51] = "Three";
    Char[Char["Four"] = 52] = "Four";
    Char[Char["Five"] = 53] = "Five";
    Char[Char["Six"] = 54] = "Six";
    Char[Char["Seven"] = 55] = "Seven";
    Char[Char["Eight"] = 56] = "Eight";
    Char[Char["Nine"] = 57] = "Nine";
    Char[Char["UpperA"] = 65] = "UpperA";
    Char[Char["UpperB"] = 66] = "UpperB";
    Char[Char["UpperC"] = 67] = "UpperC";
    Char[Char["UpperD"] = 68] = "UpperD";
    Char[Char["UpperE"] = 69] = "UpperE";
    Char[Char["UpperF"] = 70] = "UpperF";
    Char[Char["UpperG"] = 71] = "UpperG";
    Char[Char["UpperH"] = 72] = "UpperH";
    Char[Char["UpperI"] = 73] = "UpperI";
    Char[Char["UpperJ"] = 74] = "UpperJ";
    Char[Char["UpperK"] = 75] = "UpperK";
    Char[Char["UpperL"] = 76] = "UpperL";
    Char[Char["UpperM"] = 77] = "UpperM";
    Char[Char["UpperN"] = 78] = "UpperN";
    Char[Char["UpperO"] = 79] = "UpperO";
    Char[Char["UpperP"] = 80] = "UpperP";
    Char[Char["UpperQ"] = 81] = "UpperQ";
    Char[Char["UpperR"] = 82] = "UpperR";
    Char[Char["UpperS"] = 83] = "UpperS";
    Char[Char["UpperT"] = 84] = "UpperT";
    Char[Char["UpperU"] = 85] = "UpperU";
    Char[Char["UpperV"] = 86] = "UpperV";
    Char[Char["UpperW"] = 87] = "UpperW";
    Char[Char["UpperX"] = 88] = "UpperX";
    Char[Char["UpperY"] = 89] = "UpperY";
    Char[Char["UpperZ"] = 90] = "UpperZ";
    Char[Char["LowerA"] = 97] = "LowerA";
    Char[Char["LowerB"] = 98] = "LowerB";
    Char[Char["LowerC"] = 99] = "LowerC";
    Char[Char["LowerD"] = 100] = "LowerD";
    Char[Char["LowerE"] = 101] = "LowerE";
    Char[Char["LowerF"] = 102] = "LowerF";
    Char[Char["LowerG"] = 103] = "LowerG";
    Char[Char["LowerH"] = 104] = "LowerH";
    Char[Char["LowerI"] = 105] = "LowerI";
    Char[Char["LowerJ"] = 106] = "LowerJ";
    Char[Char["LowerK"] = 107] = "LowerK";
    Char[Char["LowerL"] = 108] = "LowerL";
    Char[Char["LowerM"] = 109] = "LowerM";
    Char[Char["LowerN"] = 110] = "LowerN";
    Char[Char["LowerO"] = 111] = "LowerO";
    Char[Char["LowerP"] = 112] = "LowerP";
    Char[Char["LowerQ"] = 113] = "LowerQ";
    Char[Char["LowerR"] = 114] = "LowerR";
    Char[Char["LowerS"] = 115] = "LowerS";
    Char[Char["LowerT"] = 116] = "LowerT";
    Char[Char["LowerU"] = 117] = "LowerU";
    Char[Char["LowerV"] = 118] = "LowerV";
    Char[Char["LowerW"] = 119] = "LowerW";
    Char[Char["LowerX"] = 120] = "LowerX";
    Char[Char["LowerY"] = 121] = "LowerY";
    Char[Char["LowerZ"] = 122] = "LowerZ";
})(Char || (Char = {}));
function unescapeCode(code) {
    switch (code) {
        case 98: return 8;
        case 116: return 9;
        case 110: return 10;
        case 118: return 11;
        case 102: return 12;
        case 114: return 13;
        case 34: return 34;
        case 39: return 39;
        case 92: return 92;
        default: return code;
    }
}
var Access;
(function (Access) {
    Access[Access["Reset"] = 0] = "Reset";
    Access[Access["Ancestor"] = 511] = "Ancestor";
    Access[Access["This"] = 512] = "This";
    Access[Access["Scope"] = 1024] = "Scope";
    Access[Access["Member"] = 2048] = "Member";
    Access[Access["Keyed"] = 4096] = "Keyed";
})(Access || (Access = {}));
var Precedence;
(function (Precedence) {
    Precedence[Precedence["Variadic"] = 61] = "Variadic";
    Precedence[Precedence["Assign"] = 62] = "Assign";
    Precedence[Precedence["Conditional"] = 63] = "Conditional";
    Precedence[Precedence["LogicalOR"] = 64] = "LogicalOR";
    Precedence[Precedence["LogicalAND"] = 128] = "LogicalAND";
    Precedence[Precedence["Equality"] = 192] = "Equality";
    Precedence[Precedence["Relational"] = 256] = "Relational";
    Precedence[Precedence["Additive"] = 320] = "Additive";
    Precedence[Precedence["Multiplicative"] = 384] = "Multiplicative";
    Precedence[Precedence["Binary"] = 448] = "Binary";
    Precedence[Precedence["LeftHandSide"] = 449] = "LeftHandSide";
    Precedence[Precedence["Primary"] = 450] = "Primary";
    Precedence[Precedence["Unary"] = 451] = "Unary";
})(Precedence || (Precedence = {}));
var Token;
(function (Token) {
    Token[Token["EOF"] = 1572864] = "EOF";
    Token[Token["ExpressionTerminal"] = 1048576] = "ExpressionTerminal";
    Token[Token["AccessScopeTerminal"] = 524288] = "AccessScopeTerminal";
    Token[Token["ClosingToken"] = 262144] = "ClosingToken";
    Token[Token["OpeningToken"] = 131072] = "OpeningToken";
    Token[Token["BinaryOp"] = 65536] = "BinaryOp";
    Token[Token["UnaryOp"] = 32768] = "UnaryOp";
    Token[Token["LeftHandSide"] = 16384] = "LeftHandSide";
    Token[Token["StringOrNumericLiteral"] = 12288] = "StringOrNumericLiteral";
    Token[Token["NumericLiteral"] = 8192] = "NumericLiteral";
    Token[Token["StringLiteral"] = 4096] = "StringLiteral";
    Token[Token["IdentifierName"] = 3072] = "IdentifierName";
    Token[Token["Keyword"] = 2048] = "Keyword";
    Token[Token["Identifier"] = 1024] = "Identifier";
    Token[Token["Contextual"] = 512] = "Contextual";
    Token[Token["Precedence"] = 448] = "Precedence";
    Token[Token["Type"] = 63] = "Type";
    Token[Token["FalseKeyword"] = 2048] = "FalseKeyword";
    Token[Token["TrueKeyword"] = 2049] = "TrueKeyword";
    Token[Token["NullKeyword"] = 2050] = "NullKeyword";
    Token[Token["UndefinedKeyword"] = 2051] = "UndefinedKeyword";
    Token[Token["ThisScope"] = 3076] = "ThisScope";
    Token[Token["ParentScope"] = 3078] = "ParentScope";
    Token[Token["OpenParen"] = 671751] = "OpenParen";
    Token[Token["OpenBrace"] = 131080] = "OpenBrace";
    Token[Token["Dot"] = 16393] = "Dot";
    Token[Token["CloseBrace"] = 1835018] = "CloseBrace";
    Token[Token["CloseParen"] = 1835019] = "CloseParen";
    Token[Token["Comma"] = 1572876] = "Comma";
    Token[Token["OpenBracket"] = 671757] = "OpenBracket";
    Token[Token["CloseBracket"] = 1835022] = "CloseBracket";
    Token[Token["Colon"] = 1572879] = "Colon";
    Token[Token["Question"] = 1572880] = "Question";
    Token[Token["Ampersand"] = 1572883] = "Ampersand";
    Token[Token["Bar"] = 1572884] = "Bar";
    Token[Token["BarBar"] = 1638549] = "BarBar";
    Token[Token["AmpersandAmpersand"] = 1638614] = "AmpersandAmpersand";
    Token[Token["EqualsEquals"] = 1638679] = "EqualsEquals";
    Token[Token["ExclamationEquals"] = 1638680] = "ExclamationEquals";
    Token[Token["EqualsEqualsEquals"] = 1638681] = "EqualsEqualsEquals";
    Token[Token["ExclamationEqualsEquals"] = 1638682] = "ExclamationEqualsEquals";
    Token[Token["LessThan"] = 1638747] = "LessThan";
    Token[Token["GreaterThan"] = 1638748] = "GreaterThan";
    Token[Token["LessThanEquals"] = 1638749] = "LessThanEquals";
    Token[Token["GreaterThanEquals"] = 1638750] = "GreaterThanEquals";
    Token[Token["InKeyword"] = 1640799] = "InKeyword";
    Token[Token["InstanceOfKeyword"] = 1640800] = "InstanceOfKeyword";
    Token[Token["Plus"] = 623009] = "Plus";
    Token[Token["Minus"] = 623010] = "Minus";
    Token[Token["TypeofKeyword"] = 34851] = "TypeofKeyword";
    Token[Token["VoidKeyword"] = 34852] = "VoidKeyword";
    Token[Token["Asterisk"] = 1638885] = "Asterisk";
    Token[Token["Percent"] = 1638886] = "Percent";
    Token[Token["Slash"] = 1638887] = "Slash";
    Token[Token["Equals"] = 1048616] = "Equals";
    Token[Token["Exclamation"] = 32809] = "Exclamation";
    Token[Token["TemplateTail"] = 540714] = "TemplateTail";
    Token[Token["TemplateContinuation"] = 540715] = "TemplateContinuation";
    Token[Token["OfKeyword"] = 1051180] = "OfKeyword";
})(Token || (Token = {}));
const $false = PrimitiveLiteralExpression.$false;
const $true = PrimitiveLiteralExpression.$true;
const $null = PrimitiveLiteralExpression.$null;
const $undefined = PrimitiveLiteralExpression.$undefined;
const $this = AccessThisExpression.$this;
const $parent = AccessThisExpression.$parent;
var ExpressionType;
(function (ExpressionType) {
    ExpressionType[ExpressionType["None"] = 0] = "None";
    ExpressionType[ExpressionType["Interpolation"] = 1] = "Interpolation";
    ExpressionType[ExpressionType["IsIterator"] = 2] = "IsIterator";
    ExpressionType[ExpressionType["IsFunction"] = 4] = "IsFunction";
    ExpressionType[ExpressionType["IsProperty"] = 8] = "IsProperty";
    ExpressionType[ExpressionType["IsCustom"] = 16] = "IsCustom";
})(ExpressionType || (ExpressionType = {}));
class ParserState {
    constructor(ip) {
        this.ip = ip;
        this.index = 0;
        this._startIndex = 0;
        this._lastIndex = 0;
        this._currentToken = 1572864;
        this._tokenValue = '';
        this._assignable = true;
        this.length = ip.length;
        this._currentChar = ip.charCodeAt(0);
    }
    get _tokenRaw() {
        return this.ip.slice(this._startIndex, this.index);
    }
}
const $state = new ParserState('');
function parseExpression(input, expressionType) {
    $state.ip = input;
    $state.length = input.length;
    $state.index = 0;
    $state._currentChar = input.charCodeAt(0);
    return parse($state, 0, 61, expressionType === void 0 ? 8 : expressionType);
}
function parse(state, access, minPrecedence, expressionType) {
    if (expressionType === 16) {
        return new CustomExpression(state.ip);
    }
    if (state.index === 0) {
        if (expressionType & 1) {
            return parseInterpolation(state);
        }
        nextToken(state);
        if (state._currentToken & 1048576) {
            throw new Error(`AUR0151: Invalid start of expression: '${state.ip}'`);
        }
    }
    state._assignable = 448 > minPrecedence;
    let result = void 0;
    if (state._currentToken & 32768) {
        const op = TokenValues[state._currentToken & 63];
        nextToken(state);
        result = new UnaryExpression(op, parse(state, access, 449, expressionType));
        state._assignable = false;
    }
    else {
        primary: switch (state._currentToken) {
            case 3078:
                state._assignable = false;
                do {
                    nextToken(state);
                    access++;
                    if (consumeOpt(state, 16393)) {
                        if (state._currentToken === 16393) {
                            throw new Error(`AUR0152: Double dot and spread operators are not supported: '${state.ip}'`);
                        }
                        else if (state._currentToken === 1572864) {
                            throw new Error(`AUR0153: Expected identifier: '${state.ip}'`);
                        }
                    }
                    else if (state._currentToken & 524288) {
                        const ancestor = access & 511;
                        result = ancestor === 0 ? $this : ancestor === 1 ? $parent : new AccessThisExpression(ancestor);
                        access = 512;
                        break primary;
                    }
                    else {
                        throw new Error(`AUR0154: Invalid member expression: '${state.ip}'`);
                    }
                } while (state._currentToken === 3078);
            case 1024:
                if (expressionType & 2) {
                    result = new BindingIdentifier(state._tokenValue);
                }
                else {
                    result = new AccessScopeExpression(state._tokenValue, access & 511);
                    access = 1024;
                }
                state._assignable = true;
                nextToken(state);
                break;
            case 3076:
                state._assignable = false;
                nextToken(state);
                result = $this;
                access = 512;
                break;
            case 671751:
                nextToken(state);
                result = parse(state, 0, 62, expressionType);
                consume(state, 1835019);
                access = 0;
                break;
            case 671757:
                result = state.ip.search(/\s+of\s+/) > state.index ? parseArrayDestructuring(state) : parseArrayLiteralExpression(state, access, expressionType);
                access = 0;
                break;
            case 131080:
                result = parseObjectLiteralExpression(state, expressionType);
                access = 0;
                break;
            case 540714:
                result = new TemplateExpression([state._tokenValue]);
                state._assignable = false;
                nextToken(state);
                access = 0;
                break;
            case 540715:
                result = parseTemplate(state, access, expressionType, result, false);
                access = 0;
                break;
            case 4096:
            case 8192:
                result = new PrimitiveLiteralExpression(state._tokenValue);
                state._assignable = false;
                nextToken(state);
                access = 0;
                break;
            case 2050:
            case 2051:
            case 2049:
            case 2048:
                result = TokenValues[state._currentToken & 63];
                state._assignable = false;
                nextToken(state);
                access = 0;
                break;
            default:
                if (state.index >= state.length) {
                    throw new Error(`AUR0155: Unexpected end of expression: '${state.ip}'`);
                }
                else {
                    throw new Error(`AUR0156: Unconsumed token: '${state.ip}'`);
                }
        }
        if (expressionType & 2) {
            return parseForOfStatement(state, result);
        }
        if (449 < minPrecedence) {
            return result;
        }
        let name = state._tokenValue;
        while ((state._currentToken & 16384) > 0) {
            const args = [];
            let strings;
            switch (state._currentToken) {
                case 16393:
                    state._assignable = true;
                    nextToken(state);
                    if ((state._currentToken & 3072) === 0) {
                        throw new Error(`AUR0153: Expected identifier: '${state.ip}'`);
                    }
                    name = state._tokenValue;
                    nextToken(state);
                    access = ((access & (512 | 1024)) << 1) | (access & 2048) | ((access & 4096) >> 1);
                    if (state._currentToken === 671751) {
                        if (access === 0) {
                            access = 2048;
                        }
                        continue;
                    }
                    if (access & 1024) {
                        result = new AccessScopeExpression(name, result.ancestor);
                    }
                    else {
                        result = new AccessMemberExpression(result, name);
                    }
                    continue;
                case 671757:
                    state._assignable = true;
                    nextToken(state);
                    access = 4096;
                    result = new AccessKeyedExpression(result, parse(state, 0, 62, expressionType));
                    consume(state, 1835022);
                    break;
                case 671751:
                    state._assignable = false;
                    nextToken(state);
                    while (state._currentToken !== 1835019) {
                        args.push(parse(state, 0, 62, expressionType));
                        if (!consumeOpt(state, 1572876)) {
                            break;
                        }
                    }
                    consume(state, 1835019);
                    if (access & 1024) {
                        result = new CallScopeExpression(name, args, result.ancestor);
                    }
                    else if (access & 2048) {
                        result = new CallMemberExpression(result, name, args);
                    }
                    else {
                        result = new CallFunctionExpression(result, args);
                    }
                    access = 0;
                    break;
                case 540714:
                    state._assignable = false;
                    strings = [state._tokenValue];
                    result = new TaggedTemplateExpression(strings, strings, result);
                    nextToken(state);
                    break;
                case 540715:
                    result = parseTemplate(state, access, expressionType, result, true);
            }
        }
    }
    if (448 < minPrecedence) {
        return result;
    }
    while ((state._currentToken & 65536) > 0) {
        const opToken = state._currentToken;
        if ((opToken & 448) <= minPrecedence) {
            break;
        }
        nextToken(state);
        result = new BinaryExpression(TokenValues[opToken & 63], result, parse(state, access, opToken & 448, expressionType));
        state._assignable = false;
    }
    if (63 < minPrecedence) {
        return result;
    }
    if (consumeOpt(state, 1572880)) {
        const yes = parse(state, access, 62, expressionType);
        consume(state, 1572879);
        result = new ConditionalExpression(result, yes, parse(state, access, 62, expressionType));
        state._assignable = false;
    }
    if (62 < minPrecedence) {
        return result;
    }
    if (consumeOpt(state, 1048616)) {
        if (!state._assignable) {
            throw new Error(`AUR0158: Left hand side of expression is not assignable: '${state.ip}'`);
        }
        result = new AssignExpression(result, parse(state, access, 62, expressionType));
    }
    if (61 < minPrecedence) {
        return result;
    }
    while (consumeOpt(state, 1572884)) {
        if (state._currentToken === 1572864) {
            throw new Error(`AUR0159: Expected identifier to come after ValueConverter operator: '${state.ip}'`);
        }
        const name = state._tokenValue;
        nextToken(state);
        const args = new Array();
        while (consumeOpt(state, 1572879)) {
            args.push(parse(state, access, 62, expressionType));
        }
        result = new ValueConverterExpression(result, name, args);
    }
    while (consumeOpt(state, 1572883)) {
        if (state._currentToken === 1572864) {
            throw new Error(`AUR0160: Expected identifier to come after BindingBehavior operator: '${state.ip}'`);
        }
        const name = state._tokenValue;
        nextToken(state);
        const args = new Array();
        while (consumeOpt(state, 1572879)) {
            args.push(parse(state, access, 62, expressionType));
        }
        result = new BindingBehaviorExpression(result, name, args);
    }
    if (state._currentToken !== 1572864) {
        if (expressionType & 1) {
            return result;
        }
        if (state._tokenRaw === 'of') {
            throw new Error(`AUR0161: Unexpected keyword "of": '${state.ip}'`);
        }
        throw new Error(`AUR0162: Unconsumed token: '${state.ip}'`);
    }
    return result;
}
function parseArrayDestructuring(state) {
    const items = [];
    const dae = new DestructuringAssignmentExpression(90137, items, void 0, void 0);
    let target = '';
    let $continue = true;
    let index = 0;
    while ($continue) {
        nextToken(state);
        switch (state._currentToken) {
            case 1835022:
                $continue = false;
                addItem();
                break;
            case 1572876:
                addItem();
                break;
            case 1024:
                target = state._tokenRaw;
                break;
            default:
                {
                    throw new Error(`AUR0170: Unexpected '${state._tokenRaw}' at position ${state.index - 1} for destructuring assignment in ${state.ip}`);
                }
        }
    }
    consume(state, 1835022);
    return dae;
    function addItem() {
        if (target !== '') {
            items.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression($this, target), new AccessKeyedExpression($this, new PrimitiveLiteralExpression(index++)), void 0));
            target = '';
        }
        else {
            index++;
        }
    }
}
function parseArrayLiteralExpression(state, access, expressionType) {
    nextToken(state);
    const elements = new Array();
    while (state._currentToken !== 1835022) {
        if (consumeOpt(state, 1572876)) {
            elements.push($undefined);
            if (state._currentToken === 1835022) {
                break;
            }
        }
        else {
            elements.push(parse(state, access, 62, expressionType & ~2));
            if (consumeOpt(state, 1572876)) {
                if (state._currentToken === 1835022) {
                    break;
                }
            }
            else {
                break;
            }
        }
    }
    consume(state, 1835022);
    if (expressionType & 2) {
        return new ArrayBindingPattern(elements);
    }
    else {
        state._assignable = false;
        return new ArrayLiteralExpression(elements);
    }
}
function parseForOfStatement(state, result) {
    if ((result.$kind & 65536) === 0) {
        throw new Error(`AUR0163: Invalid BindingIdentifier at left hand side of "of": '${state.ip}'`);
    }
    if (state._currentToken !== 1051180) {
        throw new Error(`AUR0163: Invalid BindingIdentifier at left hand side of "of": '${state.ip}'`);
    }
    nextToken(state);
    const declaration = result;
    const statement = parse(state, 0, 61, 0);
    return new ForOfStatement(declaration, statement);
}
function parseObjectLiteralExpression(state, expressionType) {
    const keys = new Array();
    const values = new Array();
    nextToken(state);
    while (state._currentToken !== 1835018) {
        keys.push(state._tokenValue);
        if (state._currentToken & 12288) {
            nextToken(state);
            consume(state, 1572879);
            values.push(parse(state, 0, 62, expressionType & ~2));
        }
        else if (state._currentToken & 3072) {
            const { _currentChar: currentChar, _currentToken: currentToken, index: index } = state;
            nextToken(state);
            if (consumeOpt(state, 1572879)) {
                values.push(parse(state, 0, 62, expressionType & ~2));
            }
            else {
                state._currentChar = currentChar;
                state._currentToken = currentToken;
                state.index = index;
                values.push(parse(state, 0, 450, expressionType & ~2));
            }
        }
        else {
            throw new Error(`AUR0164: Invalid or unsupported property definition in object literal: '${state.ip}'`);
        }
        if (state._currentToken !== 1835018) {
            consume(state, 1572876);
        }
    }
    consume(state, 1835018);
    if (expressionType & 2) {
        return new ObjectBindingPattern(keys, values);
    }
    else {
        state._assignable = false;
        return new ObjectLiteralExpression(keys, values);
    }
}
function parseInterpolation(state) {
    const parts = [];
    const expressions = [];
    const length = state.length;
    let result = '';
    while (state.index < length) {
        switch (state._currentChar) {
            case 36:
                if (state.ip.charCodeAt(state.index + 1) === 123) {
                    parts.push(result);
                    result = '';
                    state.index += 2;
                    state._currentChar = state.ip.charCodeAt(state.index);
                    nextToken(state);
                    const expression = parse(state, 0, 61, 1);
                    expressions.push(expression);
                    continue;
                }
                else {
                    result += '$';
                }
                break;
            case 92:
                result += String.fromCharCode(unescapeCode(nextChar(state)));
                break;
            default:
                result += String.fromCharCode(state._currentChar);
        }
        nextChar(state);
    }
    if (expressions.length) {
        parts.push(result);
        return new Interpolation(parts, expressions);
    }
    return null;
}
function parseTemplate(state, access, expressionType, result, tagged) {
    const cooked = [state._tokenValue];
    consume(state, 540715);
    const expressions = [parse(state, access, 62, expressionType)];
    while ((state._currentToken = scanTemplateTail(state)) !== 540714) {
        cooked.push(state._tokenValue);
        consume(state, 540715);
        expressions.push(parse(state, access, 62, expressionType));
    }
    cooked.push(state._tokenValue);
    state._assignable = false;
    if (tagged) {
        nextToken(state);
        return new TaggedTemplateExpression(cooked, cooked, result, expressions);
    }
    else {
        nextToken(state);
        return new TemplateExpression(cooked, expressions);
    }
}
function nextToken(state) {
    while (state.index < state.length) {
        state._startIndex = state.index;
        if ((state._currentToken = (CharScanners[state._currentChar](state))) != null) {
            return;
        }
    }
    state._currentToken = 1572864;
}
function nextChar(state) {
    return state._currentChar = state.ip.charCodeAt(++state.index);
}
function scanIdentifier(state) {
    while (IdParts[nextChar(state)])
        ;
    const token = KeywordLookup[state._tokenValue = state._tokenRaw];
    return token === undefined ? 1024 : token;
}
function scanNumber(state, isFloat) {
    let char = state._currentChar;
    if (isFloat === false) {
        do {
            char = nextChar(state);
        } while (char <= 57 && char >= 48);
        if (char !== 46) {
            state._tokenValue = parseInt(state._tokenRaw, 10);
            return 8192;
        }
        char = nextChar(state);
        if (state.index >= state.length) {
            state._tokenValue = parseInt(state._tokenRaw.slice(0, -1), 10);
            return 8192;
        }
    }
    if (char <= 57 && char >= 48) {
        do {
            char = nextChar(state);
        } while (char <= 57 && char >= 48);
    }
    else {
        state._currentChar = state.ip.charCodeAt(--state.index);
    }
    state._tokenValue = parseFloat(state._tokenRaw);
    return 8192;
}
function scanString(state) {
    const quote = state._currentChar;
    nextChar(state);
    let unescaped = 0;
    const buffer = new Array();
    let marker = state.index;
    while (state._currentChar !== quote) {
        if (state._currentChar === 92) {
            buffer.push(state.ip.slice(marker, state.index));
            nextChar(state);
            unescaped = unescapeCode(state._currentChar);
            nextChar(state);
            buffer.push(String.fromCharCode(unescaped));
            marker = state.index;
        }
        else if (state.index >= state.length) {
            throw new Error(`AUR0165: Unterminated quote in string literal: '${state.ip}'`);
        }
        else {
            nextChar(state);
        }
    }
    const last = state.ip.slice(marker, state.index);
    nextChar(state);
    buffer.push(last);
    const unescapedStr = buffer.join('');
    state._tokenValue = unescapedStr;
    return 4096;
}
function scanTemplate(state) {
    let tail = true;
    let result = '';
    while (nextChar(state) !== 96) {
        if (state._currentChar === 36) {
            if ((state.index + 1) < state.length && state.ip.charCodeAt(state.index + 1) === 123) {
                state.index++;
                tail = false;
                break;
            }
            else {
                result += '$';
            }
        }
        else if (state._currentChar === 92) {
            result += String.fromCharCode(unescapeCode(nextChar(state)));
        }
        else {
            if (state.index >= state.length) {
                throw new Error(`AUR0166: Unterminated template string: '${state.ip}'`);
            }
            result += String.fromCharCode(state._currentChar);
        }
    }
    nextChar(state);
    state._tokenValue = result;
    if (tail) {
        return 540714;
    }
    return 540715;
}
function scanTemplateTail(state) {
    if (state.index >= state.length) {
        throw new Error(`AUR0166: Unterminated template string: '${state.ip}'`);
    }
    state.index--;
    return scanTemplate(state);
}
function consumeOpt(state, token) {
    if (state._currentToken === token) {
        nextToken(state);
        return true;
    }
    return false;
}
function consume(state, token) {
    if (state._currentToken === token) {
        nextToken(state);
    }
    else {
        throw new Error(`AUR0167: Missing expected token: '${state.ip}'`);
    }
}
const TokenValues = [
    $false, $true, $null, $undefined, '$this', null, '$parent',
    '(', '{', '.', '}', ')', ',', '[', ']', ':', '?', '\'', '"',
    '&', '|', '||', '&&', '==', '!=', '===', '!==', '<', '>',
    '<=', '>=', 'in', 'instanceof', '+', '-', 'typeof', 'void', '*', '%', '/', '=', '!',
    540714, 540715,
    'of'
];
const KeywordLookup = createLookup();
KeywordLookup.true = 2049;
KeywordLookup.null = 2050;
KeywordLookup.false = 2048;
KeywordLookup.undefined = 2051;
KeywordLookup.$this = 3076;
KeywordLookup.$parent = 3078;
KeywordLookup.in = 1640799;
KeywordLookup.instanceof = 1640800;
KeywordLookup.typeof = 34851;
KeywordLookup.void = 34852;
KeywordLookup.of = 1051180;
const codes = {
    AsciiIdPart: [0x24, 0, 0x30, 0x3A, 0x41, 0x5B, 0x5F, 0, 0x61, 0x7B],
    IdStart: [0x24, 0, 0x41, 0x5B, 0x5F, 0, 0x61, 0x7B, 0xAA, 0, 0xBA, 0, 0xC0, 0xD7, 0xD8, 0xF7, 0xF8, 0x2B9, 0x2E0, 0x2E5, 0x1D00, 0x1D26, 0x1D2C, 0x1D5D, 0x1D62, 0x1D66, 0x1D6B, 0x1D78, 0x1D79, 0x1DBF, 0x1E00, 0x1F00, 0x2071, 0, 0x207F, 0, 0x2090, 0x209D, 0x212A, 0x212C, 0x2132, 0, 0x214E, 0, 0x2160, 0x2189, 0x2C60, 0x2C80, 0xA722, 0xA788, 0xA78B, 0xA7AF, 0xA7B0, 0xA7B8, 0xA7F7, 0xA800, 0xAB30, 0xAB5B, 0xAB5C, 0xAB65, 0xFB00, 0xFB07, 0xFF21, 0xFF3B, 0xFF41, 0xFF5B],
    Digit: [0x30, 0x3A],
    Skip: [0, 0x21, 0x7F, 0xA1]
};
function decompress(lookup, $set, compressed, value) {
    const rangeCount = compressed.length;
    for (let i = 0; i < rangeCount; i += 2) {
        const start = compressed[i];
        let end = compressed[i + 1];
        end = end > 0 ? end : start + 1;
        if (lookup) {
            lookup.fill(value, start, end);
        }
        if ($set) {
            for (let ch = start; ch < end; ch++) {
                $set.add(ch);
            }
        }
    }
}
function returnToken(token) {
    return s => {
        nextChar(s);
        return token;
    };
}
const unexpectedCharacter = s => {
    throw new Error(`AUR0168: Unexpected character: '${s.ip}'`);
};
unexpectedCharacter.notMapped = true;
const AsciiIdParts = new Set();
decompress(null, AsciiIdParts, codes.AsciiIdPart, true);
const IdParts = new Uint8Array(0xFFFF);
decompress(IdParts, null, codes.IdStart, 1);
decompress(IdParts, null, codes.Digit, 1);
const CharScanners = new Array(0xFFFF);
CharScanners.fill(unexpectedCharacter, 0, 0xFFFF);
decompress(CharScanners, null, codes.Skip, s => {
    nextChar(s);
    return null;
});
decompress(CharScanners, null, codes.IdStart, scanIdentifier);
decompress(CharScanners, null, codes.Digit, s => scanNumber(s, false));
CharScanners[34] =
    CharScanners[39] = s => {
        return scanString(s);
    };
CharScanners[96] = s => {
    return scanTemplate(s);
};
CharScanners[33] = s => {
    if (nextChar(s) !== 61) {
        return 32809;
    }
    if (nextChar(s) !== 61) {
        return 1638680;
    }
    nextChar(s);
    return 1638682;
};
CharScanners[61] = s => {
    if (nextChar(s) !== 61) {
        return 1048616;
    }
    if (nextChar(s) !== 61) {
        return 1638679;
    }
    nextChar(s);
    return 1638681;
};
CharScanners[38] = s => {
    if (nextChar(s) !== 38) {
        return 1572883;
    }
    nextChar(s);
    return 1638614;
};
CharScanners[124] = s => {
    if (nextChar(s) !== 124) {
        return 1572884;
    }
    nextChar(s);
    return 1638549;
};
CharScanners[46] = s => {
    if (nextChar(s) <= 57 && s._currentChar >= 48) {
        return scanNumber(s, true);
    }
    return 16393;
};
CharScanners[60] = s => {
    if (nextChar(s) !== 61) {
        return 1638747;
    }
    nextChar(s);
    return 1638749;
};
CharScanners[62] = s => {
    if (nextChar(s) !== 61) {
        return 1638748;
    }
    nextChar(s);
    return 1638750;
};
CharScanners[37] = returnToken(1638886);
CharScanners[40] = returnToken(671751);
CharScanners[41] = returnToken(1835019);
CharScanners[42] = returnToken(1638885);
CharScanners[43] = returnToken(623009);
CharScanners[44] = returnToken(1572876);
CharScanners[45] = returnToken(623010);
CharScanners[47] = returnToken(1638887);
CharScanners[58] = returnToken(1572879);
CharScanners[63] = returnToken(1572880);
CharScanners[91] = returnToken(671757);
CharScanners[93] = returnToken(1835022);
CharScanners[123] = returnToken(131080);
CharScanners[125] = returnToken(1835018);

let _connectable = null;
const connectables = [];
let connecting = false;
function pauseConnecting() {
    connecting = false;
}
function resumeConnecting() {
    connecting = true;
}
function currentConnectable() {
    return _connectable;
}
function enterConnectable(connectable) {
    if (connectable == null) {
        throw new Error(`AUR0206: Connectable cannot be null/undefined`);
    }
    if (_connectable == null) {
        _connectable = connectable;
        connectables[0] = _connectable;
        connecting = true;
        return;
    }
    if (_connectable === connectable) {
        throw new Error(`AUR0207: Trying to enter an active connectable`);
    }
    connectables.push(connectable);
    _connectable = connectable;
    connecting = true;
}
function exitConnectable(connectable) {
    if (connectable == null) {
        throw new Error(`AUR0208: Connectable cannot be null/undefined`);
    }
    if (_connectable !== connectable) {
        throw new Error(`AUR0209: Trying to exit an unactive connectable`);
    }
    connectables.pop();
    _connectable = connectables.length > 0 ? connectables[connectables.length - 1] : null;
    connecting = _connectable != null;
}
const ConnectableSwitcher = Object.freeze({
    get current() {
        return _connectable;
    },
    get connecting() {
        return connecting;
    },
    enter: enterConnectable,
    exit: exitConnectable,
    pause: pauseConnecting,
    resume: resumeConnecting,
});

const R$get = Reflect.get;
const toStringTag = Object.prototype.toString;
const proxyMap = new WeakMap();
function canWrap(obj) {
    switch (toStringTag.call(obj)) {
        case '[object Object]':
        case '[object Array]':
        case '[object Map]':
        case '[object Set]':
            return true;
        default:
            return false;
    }
}
const rawKey = '__raw__';
function wrap(v) {
    return canWrap(v) ? getProxy(v) : v;
}
function getProxy(obj) {
    var _a;
    return (_a = proxyMap.get(obj)) !== null && _a !== void 0 ? _a : createProxy(obj);
}
function getRaw(obj) {
    var _a;
    return (_a = obj[rawKey]) !== null && _a !== void 0 ? _a : obj;
}
function unwrap(v) {
    return canWrap(v) && v[rawKey] || v;
}
function doNotCollect(key) {
    return key === 'constructor'
        || key === '__proto__'
        || key === '$observers'
        || key === Symbol.toPrimitive
        || key === Symbol.toStringTag;
}
function createProxy(obj) {
    const handler = obj instanceof Array
        ? arrayHandler
        : obj instanceof Map || obj instanceof Set
            ? collectionHandler
            : objectHandler;
    const proxiedObj = new Proxy(obj, handler);
    proxyMap.set(obj, proxiedObj);
    return proxiedObj;
}
const objectHandler = {
    get(target, key, receiver) {
        if (key === rawKey) {
            return target;
        }
        const connectable = currentConnectable();
        if (!connecting || doNotCollect(key) || connectable == null) {
            return R$get(target, key, receiver);
        }
        connectable.observe(target, key);
        return wrap(R$get(target, key, receiver));
    },
};
const arrayHandler = {
    get(target, key, receiver) {
        if (key === rawKey) {
            return target;
        }
        const connectable = currentConnectable();
        if (!connecting || doNotCollect(key) || connectable == null) {
            return R$get(target, key, receiver);
        }
        switch (key) {
            case 'length':
                connectable.observe(target, 'length');
                return target.length;
            case 'map':
                return wrappedArrayMap;
            case 'includes':
                return wrappedArrayIncludes;
            case 'indexOf':
                return wrappedArrayIndexOf;
            case 'lastIndexOf':
                return wrappedArrayLastIndexOf;
            case 'every':
                return wrappedArrayEvery;
            case 'filter':
                return wrappedArrayFilter;
            case 'find':
                return wrappedArrayFind;
            case 'findIndex':
                return wrappedArrayFindIndex;
            case 'flat':
                return wrappedArrayFlat;
            case 'flatMap':
                return wrappedArrayFlatMap;
            case 'join':
                return wrappedArrayJoin;
            case 'push':
                return wrappedArrayPush;
            case 'pop':
                return wrappedArrayPop;
            case 'reduce':
                return wrappedReduce;
            case 'reduceRight':
                return wrappedReduceRight;
            case 'reverse':
                return wrappedArrayReverse;
            case 'shift':
                return wrappedArrayShift;
            case 'unshift':
                return wrappedArrayUnshift;
            case 'slice':
                return wrappedArraySlice;
            case 'splice':
                return wrappedArraySplice;
            case 'some':
                return wrappedArraySome;
            case 'sort':
                return wrappedArraySort;
            case 'keys':
                return wrappedKeys;
            case 'values':
            case Symbol.iterator:
                return wrappedValues;
            case 'entries':
                return wrappedEntries;
        }
        connectable.observe(target, key);
        return wrap(R$get(target, key, receiver));
    },
    ownKeys(target) {
        var _a;
        (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observe(target, 'length');
        return Reflect.ownKeys(target);
    },
};
function wrappedArrayMap(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    const res = raw.map((v, i) => unwrap(cb.call(thisArg, wrap(v), i, this)));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
function wrappedArrayEvery(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    const res = raw.every((v, i) => cb.call(thisArg, wrap(v), i, this));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return res;
}
function wrappedArrayFilter(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    const res = raw.filter((v, i) => unwrap(cb.call(thisArg, wrap(v), i, this)));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
function wrappedArrayIncludes(v) {
    var _a;
    const raw = getRaw(this);
    const res = raw.includes(unwrap(v));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return res;
}
function wrappedArrayIndexOf(v) {
    var _a;
    const raw = getRaw(this);
    const res = raw.indexOf(unwrap(v));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return res;
}
function wrappedArrayLastIndexOf(v) {
    var _a;
    const raw = getRaw(this);
    const res = raw.lastIndexOf(unwrap(v));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return res;
}
function wrappedArrayFindIndex(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    const res = raw.findIndex((v, i) => unwrap(cb.call(thisArg, wrap(v), i, this)));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return res;
}
function wrappedArrayFind(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    const res = raw.find((v, i) => cb(wrap(v), i, this), thisArg);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
function wrappedArrayFlat() {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(raw.flat());
}
function wrappedArrayFlatMap(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return getProxy(raw.flatMap((v, i) => wrap(cb.call(thisArg, wrap(v), i, this))));
}
function wrappedArrayJoin(separator) {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return raw.join(separator);
}
function wrappedArrayPop() {
    return wrap(getRaw(this).pop());
}
function wrappedArrayPush(...args) {
    return getRaw(this).push(...args);
}
function wrappedArrayShift() {
    return wrap(getRaw(this).shift());
}
function wrappedArrayUnshift(...args) {
    return getRaw(this).unshift(...args);
}
function wrappedArraySplice(...args) {
    return wrap(getRaw(this).splice(...args));
}
function wrappedArrayReverse(..._args) {
    var _a;
    const raw = getRaw(this);
    const res = raw.reverse();
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
function wrappedArraySome(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    const res = raw.some((v, i) => unwrap(cb.call(thisArg, wrap(v), i, this)));
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return res;
}
function wrappedArraySort(cb) {
    var _a;
    const raw = getRaw(this);
    const res = raw.sort(cb);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
function wrappedArraySlice(start, end) {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return getProxy(raw.slice(start, end));
}
function wrappedReduce(cb, initValue) {
    var _a;
    const raw = getRaw(this);
    const res = raw.reduce((curr, v, i) => cb(curr, wrap(v), i, this), initValue);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
function wrappedReduceRight(cb, initValue) {
    var _a;
    const raw = getRaw(this);
    const res = raw.reduceRight((curr, v, i) => cb(curr, wrap(v), i, this), initValue);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(res);
}
const collectionHandler = {
    get(target, key, receiver) {
        if (key === rawKey) {
            return target;
        }
        const connectable = currentConnectable();
        if (!connecting || doNotCollect(key) || connectable == null) {
            return R$get(target, key, receiver);
        }
        switch (key) {
            case 'size':
                connectable.observe(target, 'size');
                return target.size;
            case 'clear':
                return wrappedClear;
            case 'delete':
                return wrappedDelete;
            case 'forEach':
                return wrappedForEach;
            case 'add':
                if (target instanceof Set) {
                    return wrappedAdd;
                }
                break;
            case 'get':
                if (target instanceof Map) {
                    return wrappedGet;
                }
                break;
            case 'set':
                if (target instanceof Map) {
                    return wrappedSet;
                }
                break;
            case 'has':
                return wrappedHas;
            case 'keys':
                return wrappedKeys;
            case 'values':
                return wrappedValues;
            case 'entries':
                return wrappedEntries;
            case Symbol.iterator:
                return target instanceof Map ? wrappedEntries : wrappedValues;
        }
        return wrap(R$get(target, key, receiver));
    },
};
function wrappedForEach(cb, thisArg) {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return raw.forEach((v, key) => {
        cb.call(thisArg, wrap(v), wrap(key), this);
    });
}
function wrappedHas(v) {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return raw.has(unwrap(v));
}
function wrappedGet(k) {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    return wrap(raw.get(unwrap(k)));
}
function wrappedSet(k, v) {
    return wrap(getRaw(this).set(unwrap(k), unwrap(v)));
}
function wrappedAdd(v) {
    return wrap(getRaw(this).add(unwrap(v)));
}
function wrappedClear() {
    return wrap(getRaw(this).clear());
}
function wrappedDelete(k) {
    return wrap(getRaw(this).delete(unwrap(k)));
}
function wrappedKeys() {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    const iterator = raw.keys();
    return {
        next() {
            const next = iterator.next();
            const value = next.value;
            const done = next.done;
            return done
                ? { value: void 0, done }
                : { value: wrap(value), done };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
}
function wrappedValues() {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    const iterator = raw.values();
    return {
        next() {
            const next = iterator.next();
            const value = next.value;
            const done = next.done;
            return done
                ? { value: void 0, done }
                : { value: wrap(value), done };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
}
function wrappedEntries() {
    var _a;
    const raw = getRaw(this);
    (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.observeCollection(raw);
    const iterator = raw.entries();
    return {
        next() {
            const next = iterator.next();
            const value = next.value;
            const done = next.done;
            return done
                ? { value: void 0, done }
                : { value: [wrap(value[0]), wrap(value[1])], done };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
}
const ProxyObservable = Object.freeze({
    getProxy,
    getRaw,
    wrap,
    unwrap,
    rawKey,
});

class ComputedObserver {
    constructor(obj, get, set, useProxy, observerLocator) {
        this.interceptor = this;
        this.type = 1;
        this._value = void 0;
        this._oldValue = void 0;
        this._isRunning = false;
        this._isDirty = false;
        this._obj = obj;
        this.get = get;
        this.set = set;
        this._useProxy = useProxy;
        this.oL = observerLocator;
    }
    static create(obj, key, descriptor, observerLocator, useProxy) {
        const getter = descriptor.get;
        const setter = descriptor.set;
        const observer = new ComputedObserver(obj, getter, setter, useProxy, observerLocator);
        const $get = (() => observer.getValue());
        $get.getObserver = () => observer;
        def(obj, key, {
            enumerable: descriptor.enumerable,
            configurable: true,
            get: $get,
            set: (v) => {
                observer.setValue(v, 0);
            },
        });
        return observer;
    }
    getValue() {
        if (this.subs.count === 0) {
            return this.get.call(this._obj, this);
        }
        if (this._isDirty) {
            this.compute();
            this._isDirty = false;
        }
        return this._value;
    }
    setValue(v, _flags) {
        if (isFunction(this.set)) {
            if (v !== this._value) {
                this._isRunning = true;
                this.set.call(this._obj, v);
                this._isRunning = false;
                this.run();
            }
        }
        else {
            throw new Error(`AUR0221: Property is readonly`);
        }
    }
    handleChange() {
        this._isDirty = true;
        if (this.subs.count > 0) {
            this.run();
        }
    }
    handleCollectionChange() {
        this._isDirty = true;
        if (this.subs.count > 0) {
            this.run();
        }
    }
    subscribe(subscriber) {
        if (this.subs.add(subscriber) && this.subs.count === 1) {
            this.compute();
            this._isDirty = false;
        }
    }
    unsubscribe(subscriber) {
        if (this.subs.remove(subscriber) && this.subs.count === 0) {
            this._isDirty = true;
            this.obs.clearAll();
        }
    }
    flush() {
        oV$1 = this._oldValue;
        this._oldValue = this._value;
        this.subs.notify(this._value, oV$1, 0);
    }
    run() {
        if (this._isRunning) {
            return;
        }
        const oldValue = this._value;
        const newValue = this.compute();
        this._isDirty = false;
        if (!Object.is(newValue, oldValue)) {
            this._oldValue = oldValue;
            this.queue.add(this);
        }
    }
    compute() {
        this._isRunning = true;
        this.obs.version++;
        try {
            enterConnectable(this);
            return this._value = unwrap(this.get.call(this._useProxy ? wrap(this._obj) : this._obj, this));
        }
        finally {
            this.obs.clear();
            this._isRunning = false;
            exitConnectable(this);
        }
    }
}
connectable(ComputedObserver);
subscriberCollection(ComputedObserver);
withFlushQueue(ComputedObserver);
let oV$1 = void 0;

const IDirtyChecker = DI.createInterface('IDirtyChecker', x => x.singleton(DirtyChecker));
const DirtyCheckSettings = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};
const queueTaskOpts = {
    persistent: true,
};
class DirtyChecker {
    constructor(p) {
        this.p = p;
        this.tracked = [];
        this._task = null;
        this._elapsedFrames = 0;
        this.check = () => {
            if (DirtyCheckSettings.disabled) {
                return;
            }
            if (++this._elapsedFrames < DirtyCheckSettings.timeoutsPerCheck) {
                return;
            }
            this._elapsedFrames = 0;
            const tracked = this.tracked;
            const len = tracked.length;
            let current;
            let i = 0;
            for (; i < len; ++i) {
                current = tracked[i];
                if (current.isDirty()) {
                    this.queue.add(current);
                }
            }
        };
    }
    createProperty(obj, key) {
        if (DirtyCheckSettings.throw) {
            throw new Error(`AUR0222: Property '${key}' is being dirty-checked.`);
        }
        return new DirtyCheckProperty(this, obj, key);
    }
    addProperty(property) {
        this.tracked.push(property);
        if (this.tracked.length === 1) {
            this._task = this.p.taskQueue.queueTask(this.check, queueTaskOpts);
        }
    }
    removeProperty(property) {
        this.tracked.splice(this.tracked.indexOf(property), 1);
        if (this.tracked.length === 0) {
            this._task.cancel();
            this._task = null;
        }
    }
}
DirtyChecker.inject = [IPlatform];
withFlushQueue(DirtyChecker);
class DirtyCheckProperty {
    constructor(dirtyChecker, obj, key) {
        this.obj = obj;
        this.key = key;
        this.type = 0;
        this._oldValue = void 0;
        this._dirtyChecker = dirtyChecker;
    }
    getValue() {
        return this.obj[this.key];
    }
    setValue(v, f) {
        throw new Error(`Trying to set value for property ${this.key} in dirty checker`);
    }
    isDirty() {
        return this._oldValue !== this.obj[this.key];
    }
    flush() {
        const oldValue = this._oldValue;
        const newValue = this.getValue();
        this._oldValue = newValue;
        this.subs.notify(newValue, oldValue, 0);
    }
    subscribe(subscriber) {
        if (this.subs.add(subscriber) && this.subs.count === 1) {
            this._oldValue = this.obj[this.key];
            this._dirtyChecker.addProperty(this);
        }
    }
    unsubscribe(subscriber) {
        if (this.subs.remove(subscriber) && this.subs.count === 0) {
            this._dirtyChecker.removeProperty(this);
        }
    }
}
subscriberCollection(DirtyCheckProperty);

class PrimitiveObserver {
    constructor(obj, key) {
        this.type = 0;
        this._obj = obj;
        this._key = key;
    }
    get doNotCache() { return true; }
    getValue() {
        return this._obj[this._key];
    }
    setValue() { }
    subscribe() { }
    unsubscribe() { }
}

class PropertyAccessor {
    constructor() {
        this.type = 0;
    }
    getValue(obj, key) {
        return obj[key];
    }
    setValue(value, flags, obj, key) {
        obj[key] = value;
    }
}

let oV = void 0;
class SetterObserver {
    constructor(obj, key) {
        this.type = 1;
        this._value = void 0;
        this._oldValue = void 0;
        this._observing = false;
        this.f = 0;
        this._obj = obj;
        this._key = key;
    }
    getValue() {
        return this._value;
    }
    setValue(newValue, flags) {
        if (this._observing) {
            if (Object.is(newValue, this._value)) {
                return;
            }
            this._oldValue = this._value;
            this._value = newValue;
            this.f = flags;
            this.queue.add(this);
        }
        else {
            this._obj[this._key] = newValue;
        }
    }
    subscribe(subscriber) {
        if (this._observing === false) {
            this.start();
        }
        this.subs.add(subscriber);
    }
    flush() {
        oV = this._oldValue;
        this._oldValue = this._value;
        this.subs.notify(this._value, oV, this.f);
    }
    start() {
        if (this._observing === false) {
            this._observing = true;
            this._value = this._obj[this._key];
            def(this._obj, this._key, {
                enumerable: true,
                configurable: true,
                get: () => this.getValue(),
                set: (value) => {
                    this.setValue(value, 0);
                },
            });
        }
        return this;
    }
    stop() {
        if (this._observing) {
            def(this._obj, this._key, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: this._value,
            });
            this._observing = false;
        }
        return this;
    }
}
class SetterNotifier {
    constructor(obj, callbackKey, set, initialValue) {
        this.type = 1;
        this._value = void 0;
        this._oldValue = void 0;
        this.f = 0;
        this._obj = obj;
        this._setter = set;
        this._hasSetter = isFunction(set);
        const callback = obj[callbackKey];
        this.cb = isFunction(callback) ? callback : void 0;
        this._value = initialValue;
    }
    getValue() {
        return this._value;
    }
    setValue(value, flags) {
        var _a;
        if (this._hasSetter) {
            value = this._setter(value, null);
        }
        if (!Object.is(value, this._value)) {
            this._oldValue = this._value;
            this._value = value;
            this.f = flags;
            (_a = this.cb) === null || _a === void 0 ? void 0 : _a.call(this._obj, this._value, this._oldValue, flags);
            this.queue.add(this);
        }
    }
    flush() {
        oV = this._oldValue;
        this._oldValue = this._value;
        this.subs.notify(this._value, oV, this.f);
    }
}
subscriberCollection(SetterObserver);
subscriberCollection(SetterNotifier);
withFlushQueue(SetterObserver);
withFlushQueue(SetterNotifier);

const propertyAccessor = new PropertyAccessor();
const IObserverLocator = DI.createInterface('IObserverLocator', x => x.singleton(ObserverLocator));
const INodeObserverLocator = DI
    .createInterface('INodeObserverLocator', x => x.cachedCallback(handler => {
    handler.getAll(ILogger).forEach(logger => {
        logger.error('Using default INodeObserverLocator implementation. Will not be able to observe nodes (HTML etc...).');
    });
    return new DefaultNodeObserverLocator();
}));
class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return propertyAccessor;
    }
    getAccessor() {
        return propertyAccessor;
    }
}
class ObserverLocator {
    constructor(_dirtyChecker, _nodeObserverLocator) {
        this._dirtyChecker = _dirtyChecker;
        this._nodeObserverLocator = _nodeObserverLocator;
        this._adapters = [];
    }
    addAdapter(adapter) {
        this._adapters.push(adapter);
    }
    getObserver(obj, key) {
        var _a, _b;
        return (_b = (_a = obj.$observers) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : this._cache(obj, key, this.createObserver(obj, key));
    }
    getAccessor(obj, key) {
        var _a;
        const cached = (_a = obj.$observers) === null || _a === void 0 ? void 0 : _a[key];
        if (cached !== void 0) {
            return cached;
        }
        if (this._nodeObserverLocator.handles(obj, key, this)) {
            return this._nodeObserverLocator.getAccessor(obj, key, this);
        }
        return propertyAccessor;
    }
    getArrayObserver(observedArray) {
        return getArrayObserver(observedArray);
    }
    getMapObserver(observedMap) {
        return getMapObserver(observedMap);
    }
    getSetObserver(observedSet) {
        return getSetObserver(observedSet);
    }
    createObserver(obj, key) {
        var _a, _b, _c, _d;
        if (!(obj instanceof Object)) {
            return new PrimitiveObserver(obj, key);
        }
        if (this._nodeObserverLocator.handles(obj, key, this)) {
            return this._nodeObserverLocator.getObserver(obj, key, this);
        }
        switch (key) {
            case 'length':
                if (obj instanceof Array) {
                    return getArrayObserver(obj).getLengthObserver();
                }
                break;
            case 'size':
                if (obj instanceof Map) {
                    return getMapObserver(obj).getLengthObserver();
                }
                else if (obj instanceof Set) {
                    return getSetObserver(obj).getLengthObserver();
                }
                break;
            default:
                if (obj instanceof Array && isArrayIndex(key)) {
                    return getArrayObserver(obj).getIndexObserver(Number(key));
                }
                break;
        }
        let pd = getOwnPropDesc(obj, key);
        if (pd === void 0) {
            let proto = getProto(obj);
            while (proto !== null) {
                pd = getOwnPropDesc(proto, key);
                if (pd === void 0) {
                    proto = getProto(proto);
                }
                else {
                    break;
                }
            }
        }
        if (pd !== void 0 && !hasOwnProp.call(pd, 'value')) {
            let obs = this._getAdapterObserver(obj, key, pd);
            if (obs == null) {
                obs = (_d = ((_b = (_a = pd.get) === null || _a === void 0 ? void 0 : _a.getObserver) !== null && _b !== void 0 ? _b : (_c = pd.set) === null || _c === void 0 ? void 0 : _c.getObserver)) === null || _d === void 0 ? void 0 : _d(obj, this);
            }
            return obs == null
                ? pd.configurable
                    ? ComputedObserver.create(obj, key, pd, this, true)
                    : this._dirtyChecker.createProperty(obj, key)
                : obs;
        }
        return new SetterObserver(obj, key);
    }
    _getAdapterObserver(obj, propertyName, pd) {
        if (this._adapters.length > 0) {
            for (const adapter of this._adapters) {
                const observer = adapter.getObserver(obj, propertyName, pd, this);
                if (observer != null) {
                    return observer;
                }
            }
        }
        return null;
    }
    _cache(obj, key, observer) {
        if (observer.doNotCache === true) {
            return observer;
        }
        if (obj.$observers === void 0) {
            def(obj, '$observers', { value: { [key]: observer } });
            return observer;
        }
        return obj.$observers[key] = observer;
    }
}
ObserverLocator.inject = [IDirtyChecker, INodeObserverLocator];
function getCollectionObserver(collection) {
    let obs;
    if (collection instanceof Array) {
        obs = getArrayObserver(collection);
    }
    else if (collection instanceof Map) {
        obs = getMapObserver(collection);
    }
    else if (collection instanceof Set) {
        obs = getSetObserver(collection);
    }
    return obs;
}
const getProto = Object.getPrototypeOf;
const getOwnPropDesc = Object.getOwnPropertyDescriptor;

const IObservation = DI.createInterface('IObservation', x => x.singleton(Observation));
class Observation {
    constructor(oL) {
        this.oL = oL;
    }
    static get inject() { return [IObserverLocator]; }
    run(fn) {
        const effect = new Effect(this.oL, fn);
        effect.run();
        return effect;
    }
}
class Effect {
    constructor(oL, fn) {
        this.oL = oL;
        this.fn = fn;
        this.interceptor = this;
        this.maxRunCount = 10;
        this.queued = false;
        this.running = false;
        this.runCount = 0;
        this.stopped = false;
    }
    handleChange() {
        this.queued = true;
        this.run();
    }
    handleCollectionChange() {
        this.queued = true;
        this.run();
    }
    run() {
        if (this.stopped) {
            throw new Error(`AUR0225: Effect has already been stopped`);
        }
        if (this.running) {
            return;
        }
        ++this.runCount;
        this.running = true;
        this.queued = false;
        ++this.obs.version;
        try {
            enterConnectable(this);
            this.fn(this);
        }
        finally {
            this.obs.clear();
            this.running = false;
            exitConnectable(this);
        }
        if (this.queued) {
            if (this.runCount > this.maxRunCount) {
                this.runCount = 0;
                throw new Error(`AUR0226: Maximum number of recursive effect run reached. Consider handle effect dependencies differently.`);
            }
            this.run();
        }
        else {
            this.runCount = 0;
        }
    }
    stop() {
        this.stopped = true;
        this.obs.clearAll();
    }
}
connectable(Effect);

function getObserversLookup(obj) {
    if (obj.$observers === void 0) {
        def(obj, '$observers', { value: {} });
    }
    return obj.$observers;
}
const noValue = {};
function observable(targetOrConfig, key, descriptor) {
    if (key == null) {
        return ((t, k, d) => deco(t, k, d, targetOrConfig));
    }
    return deco(targetOrConfig, key, descriptor);
    function deco(target, key, descriptor, config) {
        var _a;
        const isClassDecorator = key === void 0;
        config = typeof config !== 'object'
            ? { name: config }
            : (config || {});
        if (isClassDecorator) {
            key = config.name;
        }
        if (key == null || key === '') {
            throw new Error(`AUR0224: Invalid usage, cannot determine property name for @observable`);
        }
        const callback = config.callback || `${String(key)}Changed`;
        let initialValue = noValue;
        if (descriptor) {
            delete descriptor.value;
            delete descriptor.writable;
            initialValue = (_a = descriptor.initializer) === null || _a === void 0 ? void 0 : _a.call(descriptor);
            delete descriptor.initializer;
        }
        else {
            descriptor = { configurable: true };
        }
        if (!('enumerable' in descriptor)) {
            descriptor.enumerable = true;
        }
        const $set = config.set;
        descriptor.get = function g() {
            var _a;
            const notifier = getNotifier(this, key, callback, initialValue, $set);
            (_a = currentConnectable()) === null || _a === void 0 ? void 0 : _a.subscribeTo(notifier);
            return notifier.getValue();
        };
        descriptor.set = function s(newValue) {
            getNotifier(this, key, callback, initialValue, $set).setValue(newValue, 0);
        };
        descriptor.get.getObserver = function gO(obj) {
            return getNotifier(obj, key, callback, initialValue, $set);
        };
        if (isClassDecorator) {
            def(target.prototype, key, descriptor);
        }
        else {
            return descriptor;
        }
    }
}
function getNotifier(obj, key, callbackKey, initialValue, set) {
    const lookup = getObserversLookup(obj);
    let notifier = lookup[key];
    if (notifier == null) {
        notifier = new SetterNotifier(obj, callbackKey, set, initialValue === noValue ? void 0 : initialValue);
        lookup[key] = notifier;
    }
    return notifier;
}

export { Access, AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, AssignExpression, BinaryExpression, BindingBehavior, BindingBehaviorDefinition, BindingBehaviorExpression, BindingBehaviorFactory, BindingBehaviorStrategy, BindingContext, BindingIdentifier, BindingInterceptor, BindingMediator, BindingMode, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, Char, CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, ConnectableSwitcher, CustomExpression, DelegationStrategy, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, DirtyCheckSettings, ExpressionKind, ExpressionType, FlushQueue, ForOfStatement, HtmlLiteralExpression, ICoercionConfiguration, IDirtyChecker, IExpressionParser, INodeObserverLocator, IObservation, IObserverLocator, ISignaler, Interpolation, LifecycleFlags, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, OverrideContext, ParserState, Precedence, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, ValueConverter, ValueConverterDefinition, ValueConverterExpression, alias, applyMutationsToIndices, bindingBehavior, cloneIndexMap, connectable, copyIndexMap, createIndexMap, disableArrayObservation, disableMapObservation, disableSetObservation, enableArrayObservation, enableMapObservation, enableSetObservation, getCollectionObserver, isIndexMap, observable, parse, parseExpression, registerAliases, subscriberCollection, synchronizeIndices, valueConverter, withFlushQueue };
//# sourceMappingURL=index.dev.mjs.map
