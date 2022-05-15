'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var metadata = require('@aurelia/metadata');
var kernel = require('@aurelia/kernel');
var runtimeHtml = require('@aurelia/runtime-html');
var routeRecognizer = require('@aurelia/route-recognizer');
var runtime = require('@aurelia/runtime');

class Batch {
    constructor(stack, cb, head) {
        this.stack = stack;
        this.cb = cb;
        this.done = false;
        this.next = null;
        this.head = head !== null && head !== void 0 ? head : this;
    }
    static start(cb) {
        return new Batch(0, cb, null);
    }
    push() {
        let cur = this;
        do {
            ++cur.stack;
            cur = cur.next;
        } while (cur !== null);
    }
    pop() {
        let cur = this;
        do {
            if (--cur.stack === 0) {
                cur.invoke();
            }
            cur = cur.next;
        } while (cur !== null);
    }
    invoke() {
        const cb = this.cb;
        if (cb !== null) {
            this.cb = null;
            cb(this);
            this.done = true;
        }
    }
    continueWith(cb) {
        if (this.next === null) {
            return this.next = new Batch(this.stack, cb, this.head);
        }
        else {
            return this.next.continueWith(cb);
        }
    }
    start() {
        this.head.push();
        this.head.pop();
        return this;
    }
}
function mergeDistinct(prev, next) {
    prev = prev.slice();
    next = next.slice();
    const merged = [];
    while (prev.length > 0) {
        const p = prev.shift();
        if (merged.every(m => m.context.vpa !== p.context.vpa)) {
            const i = next.findIndex(n => n.context.vpa === p.context.vpa);
            if (i >= 0) {
                merged.push(...next.splice(0, i + 1));
            }
            else {
                merged.push(p);
            }
        }
    }
    merged.push(...next);
    return merged;
}
function tryStringify(value) {
    try {
        return JSON.stringify(value);
    }
    catch (_a) {
        return Object.prototype.toString.call(value);
    }
}
function ensureArrayOfStrings(value) {
    return typeof value === 'string' ? [value] : value;
}
function ensureString(value) {
    return typeof value === 'string' ? value : value[0];
}

function isNotNullishOrTypeOrViewModel(value) {
    return (typeof value === 'object' &&
        value !== null &&
        !runtimeHtml.isCustomElementViewModel(value));
}
function isPartialCustomElementDefinition(value) {
    return (isNotNullishOrTypeOrViewModel(value) &&
        Object.prototype.hasOwnProperty.call(value, 'name') === true);
}
function isPartialChildRouteConfig(value) {
    return (isNotNullishOrTypeOrViewModel(value) &&
        Object.prototype.hasOwnProperty.call(value, 'component') === true);
}
function isPartialRedirectRouteConfig(value) {
    return (isNotNullishOrTypeOrViewModel(value) &&
        Object.prototype.hasOwnProperty.call(value, 'redirectTo') === true);
}
function isPartialViewportInstruction(value) {
    return (isNotNullishOrTypeOrViewModel(value) &&
        Object.prototype.hasOwnProperty.call(value, 'component') === true);
}
function expectType(expected, prop, value) {
    throw new Error(`Invalid route config property: "${prop}". Expected ${expected}, but got ${tryStringify(value)}.`);
}
function validateRouteConfig(config, parentPath) {
    if (config === null || config === void 0) {
        throw new Error(`Invalid route config: expected an object or string, but got: ${String(config)}.`);
    }
    const keys = Object.keys(config);
    for (const key of keys) {
        const value = config[key];
        const path = [parentPath, key].join('.');
        switch (key) {
            case 'id':
            case 'viewport':
            case 'redirectTo':
            case 'fallback':
                if (typeof value !== 'string') {
                    expectType('string', path, value);
                }
                break;
            case 'caseSensitive':
                if (typeof value !== 'boolean') {
                    expectType('boolean', path, value);
                }
                break;
            case 'data':
                if (typeof value !== 'object' || value === null) {
                    expectType('object', path, value);
                }
                break;
            case 'title':
                switch (typeof value) {
                    case 'string':
                    case 'function':
                        break;
                    default:
                        expectType('string or function', path, value);
                }
                break;
            case 'path':
                if (value instanceof Array) {
                    for (let i = 0; i < value.length; ++i) {
                        if (typeof value[i] !== 'string') {
                            expectType('string', `${path}[${i}]`, value[i]);
                        }
                    }
                }
                else if (typeof value !== 'string') {
                    expectType('string or Array of strings', path, value);
                }
                break;
            case 'component':
                validateComponent(value, path);
                break;
            case 'routes': {
                if (!(value instanceof Array)) {
                    expectType('Array', path, value);
                }
                for (const route of value) {
                    const childPath = `${path}[${value.indexOf(route)}]`;
                    validateComponent(route, childPath);
                }
                break;
            }
            case 'transitionPlan':
                switch (typeof value) {
                    case 'string':
                        switch (value) {
                            case 'none':
                            case 'replace':
                            case 'invoke-lifecycles':
                                break;
                            default:
                                expectType('string(\'none\'|\'replace\'|\'invoke-lifecycles\') or function', path, value);
                        }
                        break;
                    case 'function':
                        break;
                    default:
                        expectType('string(\'none\'|\'replace\'|\'invoke-lifecycles\') or function', path, value);
                }
                break;
            default:
                throw new Error(`Unknown route config property: "${parentPath}.${key}". Please specify known properties only.`);
        }
    }
}
function validateRedirectRouteConfig(config, parentPath) {
    if (config === null || config === void 0) {
        throw new Error(`Invalid route config: expected an object or string, but got: ${String(config)}.`);
    }
    const keys = Object.keys(config);
    for (const key of keys) {
        const value = config[key];
        const path = [parentPath, key].join('.');
        switch (key) {
            case 'path':
            case 'redirectTo':
                if (typeof value !== 'string') {
                    expectType('string', path, value);
                }
                break;
            default:
                throw new Error(`Unknown redirect config property: "${parentPath}.${key}". Only 'path' and 'redirectTo' should be specified for redirects.`);
        }
    }
}
function validateComponent(component, parentPath) {
    switch (typeof component) {
        case 'function':
            break;
        case 'object':
            if (component instanceof Promise) {
                break;
            }
            if (isPartialRedirectRouteConfig(component)) {
                validateRedirectRouteConfig(component, parentPath);
                break;
            }
            if (isPartialChildRouteConfig(component)) {
                validateRouteConfig(component, parentPath);
                break;
            }
            if (!runtimeHtml.isCustomElementViewModel(component) &&
                !isPartialCustomElementDefinition(component)) {
                expectType(`an object with at least a 'component' property (see Routeable)`, parentPath, component);
            }
            break;
        case 'string':
            break;
        default:
            expectType('function, object or string (see Routeable)', parentPath, component);
    }
}
function shallowEquals(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a !== typeof b) {
        return false;
    }
    if (a === null || b === null) {
        return false;
    }
    if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
        return false;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    for (let i = 0, ii = aKeys.length; i < ii; ++i) {
        const key = aKeys[i];
        if (key !== bKeys[i]) {
            return false;
        }
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
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

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

class Subscription {
    constructor(events, serial, inner) {
        this.events = events;
        this.serial = serial;
        this.inner = inner;
        this.disposed = false;
    }
    dispose() {
        if (!this.disposed) {
            this.disposed = true;
            this.inner.dispose();
            const subscriptions = this.events['subscriptions'];
            subscriptions.splice(subscriptions.indexOf(this), 1);
        }
    }
}
const IRouterEvents = kernel.DI.createInterface('IRouterEvents', x => x.singleton(RouterEvents));
let RouterEvents = class RouterEvents {
    constructor(ea, logger) {
        this.ea = ea;
        this.logger = logger;
        this.subscriptionSerial = 0;
        this.subscriptions = [];
        this.logger = logger.scopeTo('RouterEvents');
    }
    publish(event) {
        this.logger.trace(`publishing %s`, event);
        this.ea.publish(event.name, event);
    }
    subscribe(event, callback) {
        const subscription = new Subscription(this, ++this.subscriptionSerial, this.ea.subscribe(event, (message) => {
            this.logger.trace(`handling %s for subscription #${subscription.serial}`, event);
            callback(message);
        }));
        this.subscriptions.push(subscription);
        return subscription;
    }
};
RouterEvents = __decorate([
    __param(0, kernel.IEventAggregator),
    __param(1, kernel.ILogger)
], RouterEvents);
class LocationChangeEvent {
    constructor(id, url, trigger, state) {
        this.id = id;
        this.url = url;
        this.trigger = trigger;
        this.state = state;
    }
    get name() { return 'au:router:location-change'; }
    toString() {
        return `LocationChangeEvent(id:${this.id},url:'${this.url}',trigger:'${this.trigger}')`;
    }
}
class NavigationStartEvent {
    constructor(id, instructions, trigger, managedState) {
        this.id = id;
        this.instructions = instructions;
        this.trigger = trigger;
        this.managedState = managedState;
    }
    get name() { return 'au:router:navigation-start'; }
    toString() {
        return `NavigationStartEvent(id:${this.id},instructions:'${this.instructions}',trigger:'${this.trigger}')`;
    }
}
class NavigationEndEvent {
    constructor(id, instructions, finalInstructions) {
        this.id = id;
        this.instructions = instructions;
        this.finalInstructions = finalInstructions;
    }
    get name() { return 'au:router:navigation-end'; }
    toString() {
        return `NavigationEndEvent(id:${this.id},instructions:'${this.instructions}',finalInstructions:'${this.finalInstructions}')`;
    }
}
class NavigationCancelEvent {
    constructor(id, instructions, reason) {
        this.id = id;
        this.instructions = instructions;
        this.reason = reason;
    }
    get name() { return 'au:router:navigation-cancel'; }
    toString() {
        return `NavigationCancelEvent(id:${this.id},instructions:'${this.instructions}',reason:${String(this.reason)})`;
    }
}
class NavigationErrorEvent {
    constructor(id, instructions, error) {
        this.id = id;
        this.instructions = instructions;
        this.error = error;
    }
    get name() { return 'au:router:navigation-error'; }
    toString() {
        return `NavigationErrorEvent(id:${this.id},instructions:'${this.instructions}',error:${String(this.error)})`;
    }
}

const IBaseHrefProvider = kernel.DI.createInterface('IBaseHrefProvider', x => x.singleton(BrowserBaseHrefProvider));
class BaseHref {
    constructor(path, rootedPath) {
        this.path = path;
        this.rootedPath = rootedPath;
    }
}
let BrowserBaseHrefProvider = class BrowserBaseHrefProvider {
    constructor(window) {
        this.window = window;
    }
    getBaseHref() {
        var _a;
        const base = this.window.document.head.querySelector('base');
        if (base === null) {
            return null;
        }
        const rootedPath = normalizePath(base.href);
        const path = normalizePath((_a = base.getAttribute('href')) !== null && _a !== void 0 ? _a : '');
        return new BaseHref(path, rootedPath);
    }
};
BrowserBaseHrefProvider = __decorate([
    __param(0, runtimeHtml.IWindow)
], BrowserBaseHrefProvider);
const ILocationManager = kernel.DI.createInterface('ILocationManager', x => x.singleton(BrowserLocationManager));
let BrowserLocationManager = class BrowserLocationManager {
    constructor(logger, events, history, location, window, baseHrefProvider) {
        var _a;
        this.logger = logger;
        this.events = events;
        this.history = history;
        this.location = location;
        this.window = window;
        this.baseHrefProvider = baseHrefProvider;
        this.eventId = 0;
        this.logger = logger.root.scopeTo('LocationManager');
        const baseHref = baseHrefProvider.getBaseHref();
        if (baseHref === null) {
            const origin = (_a = location.origin) !== null && _a !== void 0 ? _a : '';
            const baseHref = this.baseHref = new BaseHref('', normalizePath(origin));
            this.logger.warn(`no baseHref provided, defaulting to origin '${baseHref.rootedPath}' (normalized from '${origin}')`);
        }
        else {
            this.baseHref = baseHref;
            this.logger.debug(`baseHref set to path: '${baseHref.path}', rootedPath: '${baseHref.rootedPath}'`);
        }
    }
    startListening() {
        this.logger.trace(`startListening()`);
        this.window.addEventListener('popstate', this.onPopState, false);
        this.window.addEventListener('hashchange', this.onHashChange, false);
    }
    stopListening() {
        this.logger.trace(`stopListening()`);
        this.window.removeEventListener('popstate', this.onPopState, false);
        this.window.removeEventListener('hashchange', this.onHashChange, false);
    }
    onPopState(event) {
        this.logger.trace(`onPopState()`);
        this.events.publish(new LocationChangeEvent(++this.eventId, this.getPath(), 'popstate', event.state));
    }
    onHashChange(_event) {
        this.logger.trace(`onHashChange()`);
        this.events.publish(new LocationChangeEvent(++this.eventId, this.getPath(), 'hashchange', null));
    }
    pushState(state, title, url) {
        url = this.addBaseHref(url);
        try {
            const stateString = JSON.stringify(state);
            this.logger.trace(`pushState(state:${stateString},title:'${title}',url:'${url}')`);
        }
        catch (err) {
            this.logger.warn(`pushState(state:NOT_SERIALIZABLE,title:'${title}',url:'${url}')`);
        }
        this.history.pushState(state, title, url);
    }
    replaceState(state, title, url) {
        url = this.addBaseHref(url);
        try {
            const stateString = JSON.stringify(state);
            this.logger.trace(`replaceState(state:${stateString},title:'${title}',url:'${url}')`);
        }
        catch (err) {
            this.logger.warn(`replaceState(state:NOT_SERIALIZABLE,title:'${title}',url:'${url}')`);
        }
        this.history.replaceState(state, title, url);
    }
    getPath() {
        const { pathname, search, hash } = this.location;
        const path = this.removeBaseHref(`${pathname}${normalizeQuery(search)}${hash}`);
        this.logger.trace(`getPath() -> '${path}'`);
        return path;
    }
    currentPathEquals(path) {
        const equals = this.getPath() === this.removeBaseHref(path);
        this.logger.trace(`currentPathEquals(path:'${path}') -> ${equals}`);
        return equals;
    }
    addBaseHref(path) {
        const initialPath = path;
        let fullPath;
        let base = this.baseHref.rootedPath;
        if (base.endsWith('/')) {
            base = base.slice(0, -1);
        }
        if (base.length === 0) {
            fullPath = path;
        }
        else {
            if (path.startsWith('/')) {
                path = path.slice(1);
            }
            fullPath = `${base}/${path}`;
        }
        this.logger.trace(`addBaseHref(path:'${initialPath}') -> '${fullPath}'`);
        return fullPath;
    }
    removeBaseHref(path) {
        const $path = path;
        if (path.startsWith(this.baseHref.path)) {
            path = path.slice(this.baseHref.path.length);
        }
        path = normalizePath(path);
        this.logger.trace(`removeBaseHref(path:'${$path}') -> '${path}'`);
        return path;
    }
};
__decorate([
    kernel.bound
], BrowserLocationManager.prototype, "onPopState", null);
__decorate([
    kernel.bound
], BrowserLocationManager.prototype, "onHashChange", null);
BrowserLocationManager = __decorate([
    __param(0, kernel.ILogger),
    __param(1, IRouterEvents),
    __param(2, runtimeHtml.IHistory),
    __param(3, runtimeHtml.ILocation),
    __param(4, runtimeHtml.IWindow),
    __param(5, IBaseHrefProvider)
], BrowserLocationManager);
function normalizePath(path) {
    let start;
    let end;
    let index;
    if ((index = path.indexOf('?')) >= 0 || (index = path.indexOf('#')) >= 0) {
        start = path.slice(0, index);
        end = path.slice(index);
    }
    else {
        start = path;
        end = '';
    }
    if (start.endsWith('/')) {
        start = start.slice(0, -1);
    }
    else if (start.endsWith('/index.html')) {
        start = start.slice(0, -11);
    }
    return `${start}${end}`;
}
function normalizeQuery(query) {
    return query.length > 0 && !query.startsWith('?') ? `?${query}` : query;
}

const terminal = ['?', '#', '/', '+', '(', ')', '.', '@', '!', '=', ',', '&', '\'', '~', ';'];
class ParserState {
    constructor(input) {
        this.input = input;
        this.buffers = [];
        this.bufferIndex = 0;
        this.index = 0;
        this.rest = input;
    }
    get done() {
        return this.rest.length === 0;
    }
    startsWith(...values) {
        const rest = this.rest;
        return values.some(function (value) {
            return rest.startsWith(value);
        });
    }
    consumeOptional(str) {
        if (this.startsWith(str)) {
            this.rest = this.rest.slice(str.length);
            this.index += str.length;
            this.append(str);
            return true;
        }
        return false;
    }
    consume(str) {
        if (!this.consumeOptional(str)) {
            this.expect(`'${str}'`);
        }
    }
    expect(msg) {
        throw new Error(`Expected ${msg} at index ${this.index} of '${this.input}', but got: '${this.rest}' (rest='${this.rest}')`);
    }
    ensureDone() {
        if (!this.done) {
            throw new Error(`Unexpected '${this.rest}' at index ${this.index} of '${this.input}'`);
        }
    }
    advance() {
        const char = this.rest[0];
        this.rest = this.rest.slice(1);
        ++this.index;
        this.append(char);
    }
    record() {
        this.buffers[this.bufferIndex++] = '';
    }
    playback() {
        const bufferIndex = --this.bufferIndex;
        const buffers = this.buffers;
        const buffer = buffers[bufferIndex];
        buffers[bufferIndex] = '';
        return buffer;
    }
    discard() {
        this.buffers[--this.bufferIndex] = '';
    }
    append(str) {
        const bufferIndex = this.bufferIndex;
        const buffers = this.buffers;
        for (let i = 0; i < bufferIndex; ++i) {
            buffers[i] += str;
        }
    }
}
exports.ExpressionKind = void 0;
(function (ExpressionKind) {
    ExpressionKind[ExpressionKind["Route"] = 0] = "Route";
    ExpressionKind[ExpressionKind["CompositeSegment"] = 1] = "CompositeSegment";
    ExpressionKind[ExpressionKind["ScopedSegment"] = 2] = "ScopedSegment";
    ExpressionKind[ExpressionKind["SegmentGroup"] = 3] = "SegmentGroup";
    ExpressionKind[ExpressionKind["Segment"] = 4] = "Segment";
    ExpressionKind[ExpressionKind["Component"] = 5] = "Component";
    ExpressionKind[ExpressionKind["Action"] = 6] = "Action";
    ExpressionKind[ExpressionKind["Viewport"] = 7] = "Viewport";
    ExpressionKind[ExpressionKind["ParameterList"] = 8] = "ParameterList";
    ExpressionKind[ExpressionKind["Parameter"] = 9] = "Parameter";
})(exports.ExpressionKind || (exports.ExpressionKind = {}));
const fragmentRouteExpressionCache = new Map();
const routeExpressionCache = new Map();
class RouteExpression {
    constructor(raw, isAbsolute, root, queryParams, fragment, fragmentIsRoute) {
        this.raw = raw;
        this.isAbsolute = isAbsolute;
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.fragmentIsRoute = fragmentIsRoute;
    }
    get kind() { return 0; }
    static parse(path, fragmentIsRoute) {
        const cache = fragmentIsRoute ? fragmentRouteExpressionCache : routeExpressionCache;
        let result = cache.get(path);
        if (result === void 0) {
            cache.set(path, result = RouteExpression.$parse(path, fragmentIsRoute));
        }
        return result;
    }
    static $parse(path, fragmentIsRoute) {
        let fragment;
        const fragmentStart = path.indexOf('#');
        if (fragmentStart >= 0) {
            const rawFragment = path.slice(fragmentStart + 1);
            fragment = decodeURIComponent(rawFragment);
            if (fragmentIsRoute) {
                path = fragment;
            }
            else {
                path = path.slice(0, fragmentStart);
            }
        }
        else {
            if (fragmentIsRoute) {
                path = '';
            }
            fragment = null;
        }
        let queryParams = null;
        const queryStart = path.indexOf('?');
        if (queryStart >= 0) {
            const queryString = path.slice(queryStart + 1);
            path = path.slice(0, queryStart);
            queryParams = new URLSearchParams(queryString);
        }
        if (path === '') {
            return new RouteExpression('', false, SegmentExpression.EMPTY, queryParams != null ? Object.freeze(queryParams) : emptyQuery, fragment, fragmentIsRoute);
        }
        const state = new ParserState(path);
        state.record();
        const isAbsolute = state.consumeOptional('/');
        const root = CompositeSegmentExpression.parse(state);
        state.ensureDone();
        const raw = state.playback();
        return new RouteExpression(raw, isAbsolute, root, queryParams != null ? Object.freeze(queryParams) : emptyQuery, fragment, fragmentIsRoute);
    }
    toInstructionTree(options) {
        let query = this.queryParams;
        const optQuery = options.queryParams;
        if (optQuery != null) {
            query = new URLSearchParams({ ...Object.fromEntries(query.entries()), ...optQuery });
        }
        return new ViewportInstructionTree(options, this.isAbsolute, this.root.toInstructions(options.append, 0, 0), query, this.fragment);
    }
    toString() {
        return this.raw;
    }
}
class CompositeSegmentExpression {
    constructor(raw, siblings, append) {
        this.raw = raw;
        this.siblings = siblings;
        this.append = append;
    }
    get kind() { return 1; }
    static parse(state) {
        state.record();
        const append = state.consumeOptional('+');
        const siblings = [];
        do {
            siblings.push(ScopedSegmentExpression.parse(state));
        } while (state.consumeOptional('+'));
        if (!append && siblings.length === 1) {
            state.discard();
            return siblings[0];
        }
        const raw = state.playback();
        return new CompositeSegmentExpression(raw, siblings, append);
    }
    toInstructions(append, open, close) {
        switch (this.siblings.length) {
            case 0:
                return [];
            case 1:
                return this.siblings[0].toInstructions(append, open, close);
            case 2:
                return [
                    ...this.siblings[0].toInstructions(append, open, 0),
                    ...this.siblings[1].toInstructions(append, 0, close),
                ];
            default:
                return [
                    ...this.siblings[0].toInstructions(append, open, 0),
                    ...this.siblings.slice(1, -1).flatMap(function (x) {
                        return x.toInstructions(append, 0, 0);
                    }),
                    ...this.siblings[this.siblings.length - 1].toInstructions(append, 0, close),
                ];
        }
    }
    toString() {
        return this.raw;
    }
}
class ScopedSegmentExpression {
    constructor(raw, left, right) {
        this.raw = raw;
        this.left = left;
        this.right = right;
    }
    get kind() { return 2; }
    static parse(state) {
        state.record();
        const left = SegmentGroupExpression.parse(state);
        if (state.consumeOptional('/')) {
            const right = ScopedSegmentExpression.parse(state);
            const raw = state.playback();
            return new ScopedSegmentExpression(raw, left, right);
        }
        state.discard();
        return left;
    }
    toInstructions(append, open, close) {
        const leftInstructions = this.left.toInstructions(append, open, 0);
        const rightInstructions = this.right.toInstructions(false, 0, close);
        let cur = leftInstructions[leftInstructions.length - 1];
        while (cur.children.length > 0) {
            cur = cur.children[cur.children.length - 1];
        }
        cur.children.push(...rightInstructions);
        return leftInstructions;
    }
    toString() {
        return this.raw;
    }
}
class SegmentGroupExpression {
    constructor(raw, expression) {
        this.raw = raw;
        this.expression = expression;
    }
    get kind() { return 3; }
    static parse(state) {
        state.record();
        if (state.consumeOptional('(')) {
            const expression = CompositeSegmentExpression.parse(state);
            state.consume(')');
            const raw = state.playback();
            return new SegmentGroupExpression(raw, expression);
        }
        state.discard();
        return SegmentExpression.parse(state);
    }
    toInstructions(append, open, close) {
        return this.expression.toInstructions(append, open + 1, close + 1);
    }
    toString() {
        return this.raw;
    }
}
class SegmentExpression {
    constructor(raw, component, action, viewport, scoped) {
        this.raw = raw;
        this.component = component;
        this.action = action;
        this.viewport = viewport;
        this.scoped = scoped;
    }
    get kind() { return 4; }
    static get EMPTY() { return new SegmentExpression('', ComponentExpression.EMPTY, ActionExpression.EMPTY, ViewportExpression.EMPTY, true); }
    static parse(state) {
        state.record();
        const component = ComponentExpression.parse(state);
        const action = ActionExpression.parse(state);
        const viewport = ViewportExpression.parse(state);
        const scoped = !state.consumeOptional('!');
        const raw = state.playback();
        return new SegmentExpression(raw, component, action, viewport, scoped);
    }
    toInstructions(append, open, close) {
        return [
            ViewportInstruction.create({
                component: this.component.name,
                params: this.component.parameterList.toObject(),
                viewport: this.viewport.name,
                append,
                open,
                close,
            }),
        ];
    }
    toString() {
        return this.raw;
    }
}
class ComponentExpression {
    constructor(raw, name, parameterList) {
        this.raw = raw;
        this.name = name;
        this.parameterList = parameterList;
        switch (name.charAt(0)) {
            case ':':
                this.isParameter = true;
                this.isStar = false;
                this.isDynamic = true;
                this.parameterName = name.slice(1);
                break;
            case '*':
                this.isParameter = false;
                this.isStar = true;
                this.isDynamic = true;
                this.parameterName = name.slice(1);
                break;
            default:
                this.isParameter = false;
                this.isStar = false;
                this.isDynamic = false;
                this.parameterName = name;
                break;
        }
    }
    get kind() { return 5; }
    static get EMPTY() { return new ComponentExpression('', '', ParameterListExpression.EMPTY); }
    static parse(state) {
        state.record();
        state.record();
        if (!state.done) {
            if (state.startsWith('./')) {
                state.advance();
            }
            else if (state.startsWith('../')) {
                state.advance();
                state.advance();
            }
            else {
                while (!state.done && !state.startsWith(...terminal)) {
                    state.advance();
                }
            }
        }
        const name = decodeURIComponent(state.playback());
        if (name.length === 0) {
            state.expect('component name');
        }
        const parameterList = ParameterListExpression.parse(state);
        const raw = state.playback();
        return new ComponentExpression(raw, name, parameterList);
    }
    toString() {
        return this.raw;
    }
}
class ActionExpression {
    constructor(raw, name, parameterList) {
        this.raw = raw;
        this.name = name;
        this.parameterList = parameterList;
    }
    get kind() { return 6; }
    static get EMPTY() { return new ActionExpression('', '', ParameterListExpression.EMPTY); }
    static parse(state) {
        state.record();
        let name = '';
        if (state.consumeOptional('.')) {
            state.record();
            while (!state.done && !state.startsWith(...terminal)) {
                state.advance();
            }
            name = decodeURIComponent(state.playback());
            if (name.length === 0) {
                state.expect('method name');
            }
        }
        const parameterList = ParameterListExpression.parse(state);
        const raw = state.playback();
        return new ActionExpression(raw, name, parameterList);
    }
    toString() {
        return this.raw;
    }
}
class ViewportExpression {
    constructor(raw, name) {
        this.raw = raw;
        this.name = name;
    }
    get kind() { return 7; }
    static get EMPTY() { return new ViewportExpression('', ''); }
    static parse(state) {
        state.record();
        let name = '';
        if (state.consumeOptional('@')) {
            state.record();
            while (!state.done && !state.startsWith(...terminal)) {
                state.advance();
            }
            name = decodeURIComponent(state.playback());
            if (name.length === 0) {
                state.expect('viewport name');
            }
        }
        const raw = state.playback();
        return new ViewportExpression(raw, name);
    }
    toString() {
        return this.raw;
    }
}
class ParameterListExpression {
    constructor(raw, expressions) {
        this.raw = raw;
        this.expressions = expressions;
    }
    get kind() { return 8; }
    static get EMPTY() { return new ParameterListExpression('', []); }
    static parse(state) {
        state.record();
        const expressions = [];
        if (state.consumeOptional('(')) {
            do {
                expressions.push(ParameterExpression.parse(state, expressions.length));
                if (!state.consumeOptional(',')) {
                    break;
                }
            } while (!state.done && !state.startsWith(')'));
            state.consume(')');
        }
        const raw = state.playback();
        return new ParameterListExpression(raw, expressions);
    }
    toObject() {
        const params = {};
        for (const expr of this.expressions) {
            params[expr.key] = expr.value;
        }
        return params;
    }
    toString() {
        return this.raw;
    }
}
class ParameterExpression {
    constructor(raw, key, value) {
        this.raw = raw;
        this.key = key;
        this.value = value;
    }
    get kind() { return 9; }
    static get EMPTY() { return new ParameterExpression('', '', ''); }
    static parse(state, index) {
        state.record();
        state.record();
        while (!state.done && !state.startsWith(...terminal)) {
            state.advance();
        }
        let key = decodeURIComponent(state.playback());
        if (key.length === 0) {
            state.expect('parameter key');
        }
        let value;
        if (state.consumeOptional('=')) {
            state.record();
            while (!state.done && !state.startsWith(...terminal)) {
                state.advance();
            }
            value = decodeURIComponent(state.playback());
            if (value.length === 0) {
                state.expect('parameter value');
            }
        }
        else {
            value = key;
            key = index.toString();
        }
        const raw = state.playback();
        return new ParameterExpression(raw, key, value);
    }
    toString() {
        return this.raw;
    }
}
const AST = Object.freeze({
    RouteExpression,
    CompositeSegmentExpression,
    ScopedSegmentExpression,
    SegmentGroupExpression,
    SegmentExpression,
    ComponentExpression,
    ActionExpression,
    ViewportExpression,
    ParameterListExpression,
    ParameterExpression,
});

class ViewportRequest {
    constructor(viewportName, componentName, resolution, append) {
        this.viewportName = viewportName;
        this.componentName = componentName;
        this.resolution = resolution;
        this.append = append;
    }
    toString() {
        return `VR(viewport:'${this.viewportName}',component:'${this.componentName}',resolution:'${this.resolution}',append:${this.append})`;
    }
}
const viewportAgentLookup = new WeakMap();
class ViewportAgent {
    constructor(viewport, hostController, ctx) {
        this.viewport = viewport;
        this.hostController = hostController;
        this.ctx = ctx;
        this.isActive = false;
        this.curCA = null;
        this.nextCA = null;
        this.state = 8256;
        this.$resolution = 'dynamic';
        this.$plan = 'replace';
        this.currNode = null;
        this.nextNode = null;
        this.currTransition = null;
        this.prevTransition = null;
        this.logger = ctx.container.get(kernel.ILogger).scopeTo(`ViewportAgent<${ctx.friendlyPath}>`);
        this.logger.trace(`constructor()`);
    }
    get $state() { return $state(this.state); }
    get currState() { return this.state & 16256; }
    set currState(state) { this.state = (this.state & 127) | state; }
    get nextState() { return this.state & 127; }
    set nextState(state) { this.state = (this.state & 16256) | state; }
    static for(viewport, ctx) {
        let viewportAgent = viewportAgentLookup.get(viewport);
        if (viewportAgent === void 0) {
            const controller = runtimeHtml.Controller.getCachedOrThrow(viewport);
            viewportAgentLookup.set(viewport, viewportAgent = new ViewportAgent(viewport, controller, ctx));
        }
        return viewportAgent;
    }
    activateFromViewport(initiator, parent, flags) {
        const tr = this.currTransition;
        if (tr !== null) {
            ensureTransitionHasNotErrored(tr);
        }
        this.isActive = true;
        switch (this.nextState) {
            case 64:
                switch (this.currState) {
                    case 8192:
                        this.logger.trace(`activateFromViewport() - nothing to activate at %s`, this);
                        return;
                    case 4096:
                        this.logger.trace(`activateFromViewport() - activating existing componentAgent at %s`, this);
                        return this.curCA.activate(initiator, parent, flags);
                    default:
                        this.unexpectedState('activateFromViewport 1');
                }
            case 2: {
                if (this.currTransition === null) {
                    throw new Error(`Unexpected viewport activation outside of a transition context at ${this}`);
                }
                if (this.$resolution !== 'static') {
                    throw new Error(`Unexpected viewport activation at ${this}`);
                }
                this.logger.trace(`activateFromViewport() - running ordinary activate at %s`, this);
                const b = Batch.start(b1 => { this.activate(initiator, this.currTransition, b1); });
                const p = new Promise(resolve => { b.continueWith(() => { resolve(); }); });
                return b.start().done ? void 0 : p;
            }
            default:
                this.unexpectedState('activateFromViewport 2');
        }
    }
    deactivateFromViewport(initiator, parent, flags) {
        const tr = this.currTransition;
        if (tr !== null) {
            ensureTransitionHasNotErrored(tr);
        }
        this.isActive = false;
        switch (this.currState) {
            case 8192:
                this.logger.trace(`deactivateFromViewport() - nothing to deactivate at %s`, this);
                return;
            case 4096:
                this.logger.trace(`deactivateFromViewport() - deactivating existing componentAgent at %s`, this);
                return this.curCA.deactivate(initiator, parent, flags);
            case 128:
                this.logger.trace(`deactivateFromViewport() - already deactivating at %s`, this);
                return;
            default: {
                if (this.currTransition === null) {
                    throw new Error(`Unexpected viewport deactivation outside of a transition context at ${this}`);
                }
                this.logger.trace(`deactivateFromViewport() - running ordinary deactivate at %s`, this);
                const b = Batch.start(b1 => { this.deactivate(initiator, this.currTransition, b1); });
                const p = new Promise(resolve => { b.continueWith(() => { resolve(); }); });
                return b.start().done ? void 0 : p;
            }
        }
    }
    handles(req) {
        if (!this.isAvailable(req.resolution)) {
            return false;
        }
        if (req.append && this.currState === 4096) {
            this.logger.trace(`handles(req:%s) -> false (append mode, viewport already has content %s)`, req, this.curCA);
            return false;
        }
        const reqVp = req.viewportName;
        const vp = this.viewport.name;
        if (reqVp !== defaultViewportName && vp !== defaultViewportName && vp !== reqVp) {
            this.logger.trace(`handles(req:%s) -> false (viewport names don't match '%s')`, req, vp);
            return false;
        }
        if (this.viewport.usedBy.length > 0 && !this.viewport.usedBy.split(',').includes(req.componentName)) {
            this.logger.trace(`handles(req:%s) -> false (componentName not included in usedBy)`, req);
            return false;
        }
        this.logger.trace(`viewport '%s' handles(req:%s) -> true`, vp, req);
        return true;
    }
    isAvailable(resolution) {
        if (resolution === 'dynamic' && !this.isActive) {
            this.logger.trace(`isAvailable(resolution:%s) -> false (viewport is not active and we're in dynamic resolution resolution)`, resolution);
            return false;
        }
        if (this.nextState !== 64) {
            this.logger.trace(`isAvailable(resolution:%s) -> false (update already scheduled for %s)`, resolution, this.nextNode);
            return false;
        }
        return true;
    }
    canUnload(tr, b) {
        if (this.currTransition === null) {
            this.currTransition = tr;
        }
        ensureTransitionHasNotErrored(tr);
        if (tr.guardsResult !== true) {
            return;
        }
        b.push();
        Batch.start(b1 => {
            this.logger.trace(`canUnload() - invoking on children at %s`, this);
            for (const node of this.currNode.children) {
                node.context.vpa.canUnload(tr, b1);
            }
        }).continueWith(b1 => {
            switch (this.currState) {
                case 4096:
                    this.logger.trace(`canUnload() - invoking on existing component at %s`, this);
                    switch (this.$plan) {
                        case 'none':
                            this.currState = 1024;
                            return;
                        case 'invoke-lifecycles':
                        case 'replace':
                            this.currState = 2048;
                            b1.push();
                            Batch.start(b2 => {
                                this.logger.trace(`canUnload() - finished invoking on children, now invoking on own component at %s`, this);
                                this.curCA.canUnload(tr, this.nextNode, b2);
                            }).continueWith(() => {
                                this.logger.trace(`canUnload() - finished at %s`, this);
                                this.currState = 1024;
                                b1.pop();
                            }).start();
                            return;
                    }
                case 8192:
                    this.logger.trace(`canUnload() - nothing to unload at %s`, this);
                    return;
                default:
                    tr.handleError(new Error(`Unexpected state at canUnload of ${this}`));
            }
        }).continueWith(() => {
            b.pop();
        }).start();
    }
    canLoad(tr, b) {
        if (this.currTransition === null) {
            this.currTransition = tr;
        }
        ensureTransitionHasNotErrored(tr);
        if (tr.guardsResult !== true) {
            return;
        }
        b.push();
        Batch.start(b1 => {
            switch (this.nextState) {
                case 32:
                    this.logger.trace(`canLoad() - invoking on new component at %s`, this);
                    this.nextState = 16;
                    switch (this.$plan) {
                        case 'none':
                            return;
                        case 'invoke-lifecycles':
                            return this.curCA.canLoad(tr, this.nextNode, b1);
                        case 'replace':
                            this.nextCA = this.nextNode.context.createComponentAgent(this.hostController, this.nextNode);
                            return this.nextCA.canLoad(tr, this.nextNode, b1);
                    }
                case 64:
                    this.logger.trace(`canLoad() - nothing to load at %s`, this);
                    return;
                default:
                    this.unexpectedState('canLoad');
            }
        }).continueWith(b1 => {
            const next = this.nextNode;
            switch (this.$plan) {
                case 'none':
                case 'invoke-lifecycles':
                    this.logger.trace(`canLoad(next:%s) - plan set to '%s', compiling residue`, next, this.$plan);
                    b1.push();
                    void kernel.onResolve(processResidue(next), () => {
                        b1.pop();
                    });
                    return;
                case 'replace':
                    switch (this.$resolution) {
                        case 'dynamic':
                            this.logger.trace(`canLoad(next:%s) - (resolution: 'dynamic'), delaying residue compilation until activate`, next, this.$plan);
                            return;
                        case 'static':
                            this.logger.trace(`canLoad(next:%s) - (resolution: '${this.$resolution}'), creating nextCA and compiling residue`, next, this.$plan);
                            b1.push();
                            void kernel.onResolve(processResidue(next), () => {
                                b1.pop();
                            });
                            return;
                    }
            }
        }).continueWith(b1 => {
            switch (this.nextState) {
                case 16:
                    this.logger.trace(`canLoad() - finished own component, now invoking on children at %s`, this);
                    this.nextState = 8;
                    for (const node of this.nextNode.children) {
                        node.context.vpa.canLoad(tr, b1);
                    }
                    return;
                case 64:
                    return;
                default:
                    this.unexpectedState('canLoad');
            }
        }).continueWith(() => {
            this.logger.trace(`canLoad() - finished at %s`, this);
            b.pop();
        }).start();
    }
    unload(tr, b) {
        ensureTransitionHasNotErrored(tr);
        ensureGuardsResultIsTrue(this, tr);
        b.push();
        Batch.start(b1 => {
            this.logger.trace(`unload() - invoking on children at %s`, this);
            for (const node of this.currNode.children) {
                node.context.vpa.unload(tr, b1);
            }
        }).continueWith(b1 => {
            switch (this.currState) {
                case 1024:
                    this.logger.trace(`unload() - invoking on existing component at %s`, this);
                    switch (this.$plan) {
                        case 'none':
                            this.currState = 256;
                            return;
                        case 'invoke-lifecycles':
                        case 'replace':
                            this.currState = 512;
                            b1.push();
                            Batch.start(b2 => {
                                this.logger.trace(`unload() - finished invoking on children, now invoking on own component at %s`, this);
                                this.curCA.unload(tr, this.nextNode, b2);
                            }).continueWith(() => {
                                this.logger.trace(`unload() - finished at %s`, this);
                                this.currState = 256;
                                b1.pop();
                            }).start();
                            return;
                    }
                case 8192:
                    this.logger.trace(`unload() - nothing to unload at %s`, this);
                    for (const node of this.currNode.children) {
                        node.context.vpa.unload(tr, b);
                    }
                    return;
                default:
                    this.unexpectedState('unload');
            }
        }).continueWith(() => {
            b.pop();
        }).start();
    }
    load(tr, b) {
        ensureTransitionHasNotErrored(tr);
        ensureGuardsResultIsTrue(this, tr);
        b.push();
        Batch.start(b1 => {
            switch (this.nextState) {
                case 8: {
                    this.logger.trace(`load() - invoking on new component at %s`, this);
                    this.nextState = 4;
                    switch (this.$plan) {
                        case 'none':
                            return;
                        case 'invoke-lifecycles':
                            return this.curCA.load(tr, this.nextNode, b1);
                        case 'replace':
                            return this.nextCA.load(tr, this.nextNode, b1);
                    }
                }
                case 64:
                    this.logger.trace(`load() - nothing to load at %s`, this);
                    return;
                default:
                    this.unexpectedState('load');
            }
        }).continueWith(b1 => {
            switch (this.nextState) {
                case 4:
                    this.logger.trace(`load() - finished own component, now invoking on children at %s`, this);
                    this.nextState = 2;
                    for (const node of this.nextNode.children) {
                        node.context.vpa.load(tr, b1);
                    }
                    return;
                case 64:
                    return;
                default:
                    this.unexpectedState('load');
            }
        }).continueWith(() => {
            this.logger.trace(`load() - finished at %s`, this);
            b.pop();
        }).start();
    }
    deactivate(initiator, tr, b) {
        ensureTransitionHasNotErrored(tr);
        ensureGuardsResultIsTrue(this, tr);
        b.push();
        switch (this.currState) {
            case 256:
                this.logger.trace(`deactivate() - invoking on existing component at %s`, this);
                this.currState = 128;
                switch (this.$plan) {
                    case 'none':
                    case 'invoke-lifecycles':
                        b.pop();
                        return;
                    case 'replace': {
                        const controller = this.hostController;
                        const deactivateFlags = this.viewport.stateful ? 0 : 16;
                        tr.run(() => {
                            return this.curCA.deactivate(initiator, controller, deactivateFlags);
                        }, () => {
                            b.pop();
                        });
                    }
                }
                return;
            case 8192:
                this.logger.trace(`deactivate() - nothing to deactivate at %s`, this);
                b.pop();
                return;
            case 128:
                this.logger.trace(`deactivate() - already deactivating at %s`, this);
                b.pop();
                return;
            default:
                this.unexpectedState('deactivate');
        }
    }
    activate(initiator, tr, b) {
        ensureTransitionHasNotErrored(tr);
        ensureGuardsResultIsTrue(this, tr);
        b.push();
        if (this.nextState === 32 &&
            this.$resolution === 'dynamic') {
            this.logger.trace(`activate() - invoking canLoad(), load() and activate() on new component due to resolution 'dynamic' at %s`, this);
            Batch.start(b1 => {
                this.canLoad(tr, b1);
            }).continueWith(b1 => {
                this.load(tr, b1);
            }).continueWith(b1 => {
                this.activate(initiator, tr, b1);
            }).continueWith(() => {
                b.pop();
            }).start();
            return;
        }
        switch (this.nextState) {
            case 2:
                this.logger.trace(`activate() - invoking on existing component at %s`, this);
                this.nextState = 1;
                Batch.start(b1 => {
                    switch (this.$plan) {
                        case 'none':
                        case 'invoke-lifecycles':
                            return;
                        case 'replace': {
                            const controller = this.hostController;
                            const activateFlags = 0;
                            tr.run(() => {
                                b1.push();
                                return this.nextCA.activate(initiator, controller, activateFlags);
                            }, () => {
                                b1.pop();
                            });
                        }
                    }
                }).continueWith(b1 => {
                    this.processDynamicChildren(tr, b1);
                }).continueWith(() => {
                    b.pop();
                }).start();
                return;
            case 64:
                this.logger.trace(`activate() - nothing to activate at %s`, this);
                b.pop();
                return;
            default:
                this.unexpectedState('activate');
        }
    }
    swap(tr, b) {
        if (this.currState === 8192) {
            this.logger.trace(`swap() - running activate on next instead, because there is nothing to deactivate at %s`, this);
            this.activate(null, tr, b);
            return;
        }
        if (this.nextState === 64) {
            this.logger.trace(`swap() - running deactivate on current instead, because there is nothing to activate at %s`, this);
            this.deactivate(null, tr, b);
            return;
        }
        ensureTransitionHasNotErrored(tr);
        ensureGuardsResultIsTrue(this, tr);
        if (!(this.currState === 256 &&
            this.nextState === 2)) {
            this.unexpectedState('swap');
        }
        this.currState = 128;
        this.nextState = 1;
        switch (this.$plan) {
            case 'none':
            case 'invoke-lifecycles': {
                this.logger.trace(`swap() - skipping this level and swapping children instead at %s`, this);
                const nodes = mergeDistinct(this.nextNode.children, this.currNode.children);
                for (const node of nodes) {
                    node.context.vpa.swap(tr, b);
                }
                return;
            }
            case 'replace': {
                this.logger.trace(`swap() - running normally at %s`, this);
                const controller = this.hostController;
                const curCA = this.curCA;
                const nextCA = this.nextCA;
                const deactivateFlags = this.viewport.stateful ? 0 : 16;
                const activateFlags = 0;
                b.push();
                Batch.start(b1 => {
                    tr.run(() => {
                        b1.push();
                        return curCA.deactivate(null, controller, deactivateFlags);
                    }, () => {
                        b1.pop();
                    });
                }).continueWith(b1 => {
                    tr.run(() => {
                        b1.push();
                        return nextCA.activate(null, controller, activateFlags);
                    }, () => {
                        b1.pop();
                    });
                }).continueWith(b1 => {
                    this.processDynamicChildren(tr, b1);
                }).continueWith(() => {
                    b.pop();
                }).start();
                return;
            }
        }
    }
    processDynamicChildren(tr, b) {
        this.logger.trace(`processDynamicChildren() - %s`, this);
        const next = this.nextNode;
        tr.run(() => {
            b.push();
            return getDynamicChildren(next);
        }, newChildren => {
            Batch.start(b1 => {
                for (const node of newChildren) {
                    tr.run(() => {
                        b1.push();
                        return node.context.vpa.canLoad(tr, b1);
                    }, () => {
                        b1.pop();
                    });
                }
            }).continueWith(b1 => {
                for (const node of newChildren) {
                    tr.run(() => {
                        b1.push();
                        return node.context.vpa.load(tr, b1);
                    }, () => {
                        b1.pop();
                    });
                }
            }).continueWith(b1 => {
                for (const node of newChildren) {
                    tr.run(() => {
                        b1.push();
                        return node.context.vpa.activate(null, tr, b1);
                    }, () => {
                        b1.pop();
                    });
                }
            }).continueWith(() => {
                b.pop();
            }).start();
        });
    }
    scheduleUpdate(options, next) {
        var _a, _b;
        switch (this.nextState) {
            case 64:
                this.nextNode = next;
                this.nextState = 32;
                this.$resolution = options.resolutionMode;
                break;
            default:
                this.unexpectedState('scheduleUpdate 1');
        }
        switch (this.currState) {
            case 8192:
            case 4096:
            case 1024:
                break;
            default:
                this.unexpectedState('scheduleUpdate 2');
        }
        const cur = (_b = (_a = this.curCA) === null || _a === void 0 ? void 0 : _a.routeNode) !== null && _b !== void 0 ? _b : null;
        if (cur === null || cur.component !== next.component) {
            this.$plan = 'replace';
        }
        else {
            const plan = next.context.definition.config.transitionPlan;
            if (typeof plan === 'function') {
                this.$plan = plan(cur, next);
            }
            else {
                this.$plan = plan;
            }
        }
        this.logger.trace(`scheduleUpdate(next:%s) - plan set to '%s'`, next, this.$plan);
    }
    cancelUpdate() {
        if (this.currNode !== null) {
            this.currNode.children.forEach(function (node) {
                node.context.vpa.cancelUpdate();
            });
        }
        if (this.nextNode !== null) {
            this.nextNode.children.forEach(function (node) {
                node.context.vpa.cancelUpdate();
            });
        }
        this.logger.trace(`cancelUpdate(nextNode:%s)`, this.nextNode);
        switch (this.currState) {
            case 8192:
            case 4096:
                break;
            case 2048:
            case 1024:
                this.currState = 4096;
                break;
        }
        switch (this.nextState) {
            case 64:
            case 32:
            case 16:
            case 8:
                this.nextNode = null;
                this.nextState = 64;
                break;
        }
    }
    endTransition() {
        if (this.currNode !== null) {
            this.currNode.children.forEach(function (node) {
                node.context.vpa.endTransition();
            });
        }
        if (this.nextNode !== null) {
            this.nextNode.children.forEach(function (node) {
                node.context.vpa.endTransition();
            });
        }
        if (this.currTransition !== null) {
            ensureTransitionHasNotErrored(this.currTransition);
            switch (this.nextState) {
                case 64:
                    switch (this.currState) {
                        case 128:
                            this.logger.trace(`endTransition() - setting currState to State.nextIsEmpty at %s`, this);
                            this.currState = 8192;
                            this.curCA = null;
                            break;
                        default:
                            this.unexpectedState('endTransition 1');
                    }
                    break;
                case 1:
                    switch (this.currState) {
                        case 8192:
                        case 128:
                            switch (this.$plan) {
                                case 'none':
                                case 'invoke-lifecycles':
                                    this.logger.trace(`endTransition() - setting currState to State.currIsActive at %s`, this);
                                    this.currState = 4096;
                                    break;
                                case 'replace':
                                    this.logger.trace(`endTransition() - setting currState to State.currIsActive and reassigning curCA at %s`, this);
                                    this.currState = 4096;
                                    this.curCA = this.nextCA;
                                    break;
                            }
                            this.currNode = this.nextNode;
                            break;
                        default:
                            this.unexpectedState('endTransition 2');
                    }
                    break;
                default:
                    this.unexpectedState('endTransition 3');
            }
            this.$plan = 'replace';
            this.nextState = 64;
            this.nextNode = null;
            this.nextCA = null;
            this.prevTransition = this.currTransition;
            this.currTransition = null;
        }
    }
    toString() {
        return `VPA(state:${this.$state},plan:'${this.$plan}',resolution:'${this.$resolution}',n:${this.nextNode},c:${this.currNode},viewport:${this.viewport})`;
    }
    dispose() {
        var _a;
        if (this.viewport.stateful) {
            this.logger.trace(`dispose() - not disposing stateful viewport at %s`, this);
        }
        else {
            this.logger.trace(`dispose() - disposing %s`, this);
            (_a = this.curCA) === null || _a === void 0 ? void 0 : _a.dispose();
        }
    }
    unexpectedState(label) {
        throw new Error(`Unexpected state at ${label} of ${this}`);
    }
}
function ensureGuardsResultIsTrue(vpa, tr) {
    if (tr.guardsResult !== true) {
        throw new Error(`Unexpected guardsResult ${tr.guardsResult} at ${vpa}`);
    }
}
function ensureTransitionHasNotErrored(tr) {
    if (tr.error !== void 0) {
        throw tr.error;
    }
}
var State;
(function (State) {
    State[State["curr"] = 16256] = "curr";
    State[State["currIsEmpty"] = 8192] = "currIsEmpty";
    State[State["currIsActive"] = 4096] = "currIsActive";
    State[State["currCanUnload"] = 2048] = "currCanUnload";
    State[State["currCanUnloadDone"] = 1024] = "currCanUnloadDone";
    State[State["currUnload"] = 512] = "currUnload";
    State[State["currUnloadDone"] = 256] = "currUnloadDone";
    State[State["currDeactivate"] = 128] = "currDeactivate";
    State[State["next"] = 127] = "next";
    State[State["nextIsEmpty"] = 64] = "nextIsEmpty";
    State[State["nextIsScheduled"] = 32] = "nextIsScheduled";
    State[State["nextCanLoad"] = 16] = "nextCanLoad";
    State[State["nextCanLoadDone"] = 8] = "nextCanLoadDone";
    State[State["nextLoad"] = 4] = "nextLoad";
    State[State["nextLoadDone"] = 2] = "nextLoadDone";
    State[State["nextActivate"] = 1] = "nextActivate";
    State[State["bothAreEmpty"] = 8256] = "bothAreEmpty";
})(State || (State = {}));
const $stateCache = new Map();
function $state(state) {
    let str = $stateCache.get(state);
    if (str === void 0) {
        $stateCache.set(state, str = stringifyState(state));
    }
    return str;
}
function stringifyState(state) {
    const flags = [];
    if ((state & 8192) === 8192) {
        flags.push('currIsEmpty');
    }
    if ((state & 4096) === 4096) {
        flags.push('currIsActive');
    }
    if ((state & 2048) === 2048) {
        flags.push('currCanUnload');
    }
    if ((state & 1024) === 1024) {
        flags.push('currCanUnloadDone');
    }
    if ((state & 512) === 512) {
        flags.push('currUnload');
    }
    if ((state & 256) === 256) {
        flags.push('currUnloadDone');
    }
    if ((state & 128) === 128) {
        flags.push('currDeactivate');
    }
    if ((state & 64) === 64) {
        flags.push('nextIsEmpty');
    }
    if ((state & 32) === 32) {
        flags.push('nextIsScheduled');
    }
    if ((state & 16) === 16) {
        flags.push('nextCanLoad');
    }
    if ((state & 8) === 8) {
        flags.push('nextCanLoadDone');
    }
    if ((state & 4) === 4) {
        flags.push('nextLoad');
    }
    if ((state & 2) === 2) {
        flags.push('nextLoadDone');
    }
    if ((state & 1) === 1) {
        flags.push('nextActivate');
    }
    return flags.join('|');
}

let nodeId = 0;
class RouteNode {
    constructor(id, path, finalPath, context, originalInstruction, instruction, params, queryParams, fragment, data, viewport, title, component, append, children, residue) {
        this.id = id;
        this.path = path;
        this.finalPath = finalPath;
        this.context = context;
        this.originalInstruction = originalInstruction;
        this.instruction = instruction;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.viewport = viewport;
        this.title = title;
        this.component = component;
        this.append = append;
        this.children = children;
        this.residue = residue;
        this.version = 1;
        this.originalInstruction = instruction;
    }
    get root() {
        return this.tree.root;
    }
    static create(input) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { [RESIDUE]: _, ...params } = (_a = input.params) !== null && _a !== void 0 ? _a : {};
        return new RouteNode(++nodeId, input.path, input.finalPath, input.context, input.instruction, input.instruction, params, (_b = input.queryParams) !== null && _b !== void 0 ? _b : emptyQuery, (_c = input.fragment) !== null && _c !== void 0 ? _c : null, (_d = input.data) !== null && _d !== void 0 ? _d : {}, (_e = input.viewport) !== null && _e !== void 0 ? _e : null, (_f = input.title) !== null && _f !== void 0 ? _f : null, input.component, input.append, (_g = input.children) !== null && _g !== void 0 ? _g : [], (_h = input.residue) !== null && _h !== void 0 ? _h : []);
    }
    contains(instructions) {
        var _a, _b;
        if (this.context === instructions.options.context) {
            const nodeChildren = this.children;
            const instructionChildren = instructions.children;
            for (let i = 0, ii = nodeChildren.length; i < ii; ++i) {
                for (let j = 0, jj = instructionChildren.length; j < jj; ++j) {
                    if (i + j < ii && ((_b = (_a = nodeChildren[i + j].instruction) === null || _a === void 0 ? void 0 : _a.contains(instructionChildren[j])) !== null && _b !== void 0 ? _b : false)) {
                        if (j + 1 === jj) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return this.children.some(function (x) {
            return x.contains(instructions);
        });
    }
    appendChild(child) {
        this.children.push(child);
        child.setTree(this.tree);
    }
    clearChildren() {
        for (const c of this.children) {
            c.clearChildren();
            c.context.vpa.cancelUpdate();
        }
        this.children.length = 0;
    }
    getTitle(separator) {
        const titleParts = [
            ...this.children.map(x => x.getTitle(separator)),
            this.getTitlePart(),
        ].filter(x => x !== null);
        if (titleParts.length === 0) {
            return null;
        }
        return titleParts.join(separator);
    }
    getTitlePart() {
        if (typeof this.title === 'function') {
            return this.title.call(void 0, this);
        }
        return this.title;
    }
    computeAbsolutePath() {
        if (this.context.isRoot) {
            return '';
        }
        const parentPath = this.context.parent.node.computeAbsolutePath();
        const thisPath = this.instruction.toUrlComponent(false);
        if (parentPath.length > 0) {
            if (thisPath.length > 0) {
                return [parentPath, thisPath].join('/');
            }
            return parentPath;
        }
        return thisPath;
    }
    setTree(tree) {
        this.tree = tree;
        for (const child of this.children) {
            child.setTree(tree);
        }
    }
    finalizeInstruction() {
        const children = this.children.map(x => x.finalizeInstruction());
        const instruction = this.instruction.clone();
        instruction.children.splice(0, instruction.children.length, ...children);
        return this.instruction = instruction;
    }
    clone() {
        const clone = new RouteNode(this.id, this.path, this.finalPath, this.context, this.originalInstruction, this.instruction, { ...this.params }, { ...this.queryParams }, this.fragment, { ...this.data }, this.viewport, this.title, this.component, this.append, this.children.map(x => x.clone()), [...this.residue]);
        clone.version = this.version + 1;
        if (clone.context.node === this) {
            clone.context.node = clone;
        }
        return clone;
    }
    toString() {
        var _a, _b, _c, _d, _e, _f;
        const props = [];
        const component = (_c = (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.definition.component) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '';
        if (component.length > 0) {
            props.push(`c:'${component}'`);
        }
        const path = (_e = (_d = this.context) === null || _d === void 0 ? void 0 : _d.definition.config.path) !== null && _e !== void 0 ? _e : '';
        if (path.length > 0) {
            props.push(`path:'${path}'`);
        }
        if (this.children.length > 0) {
            props.push(`children:[${this.children.map(String).join(',')}]`);
        }
        if (this.residue.length > 0) {
            props.push(`residue:${this.residue.map(function (r) {
                if (typeof r === 'string') {
                    return `'${r}'`;
                }
                return String(r);
            }).join(',')}`);
        }
        return `RN(ctx:'${(_f = this.context) === null || _f === void 0 ? void 0 : _f.friendlyPath}',${props.join(',')})`;
    }
}
class RouteTree {
    constructor(options, queryParams, fragment, root) {
        this.options = options;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.root = root;
    }
    contains(instructions) {
        return this.root.contains(instructions);
    }
    clone() {
        const clone = new RouteTree(this.options.clone(), { ...this.queryParams }, this.fragment, this.root.clone());
        clone.root.setTree(this);
        return clone;
    }
    finalizeInstructions() {
        return new ViewportInstructionTree(this.options, true, this.root.children.map(x => x.finalizeInstruction()), this.queryParams, this.fragment);
    }
    toString() {
        return this.root.toString();
    }
}
function updateRouteTree(rt, vit, ctx) {
    const log = ctx.container.get(kernel.ILogger).scopeTo('RouteTree');
    const rootCtx = ctx.root;
    rt.options = vit.options;
    rt.queryParams = vit.queryParams;
    rt.fragment = vit.fragment;
    if (vit.isAbsolute) {
        ctx = rootCtx;
    }
    if (ctx === rootCtx) {
        rt.root.setTree(rt);
        rootCtx.node = rt.root;
    }
    const suffix = ctx.resolved instanceof Promise ? ' - awaiting promise' : '';
    log.trace(`updateRouteTree(rootCtx:%s,rt:%s,vit:%s)${suffix}`, rootCtx, rt, vit);
    return kernel.onResolve(ctx.resolved, () => {
        return updateNode(log, vit, ctx, rootCtx.node);
    });
}
function updateNode(log, vit, ctx, node) {
    log.trace(`updateNode(ctx:%s,node:%s)`, ctx, node);
    node.queryParams = vit.queryParams;
    node.fragment = vit.fragment;
    let maybePromise;
    if (!node.context.isRoot) {
        maybePromise = node.context.vpa.scheduleUpdate(node.tree.options, node);
    }
    else {
        maybePromise = void 0;
    }
    return kernel.onResolve(maybePromise, () => {
        if (node.context === ctx) {
            node.clearChildren();
            return kernel.onResolve(kernel.resolveAll(...vit.children.map(vi => {
                return createAndAppendNodes(log, node, vi, node.tree.options.append || vi.append);
            })), () => {
                return kernel.resolveAll(...ctx.getAvailableViewportAgents('dynamic').map(vpa => {
                    const defaultInstruction = ViewportInstruction.create({
                        component: vpa.viewport.default,
                        viewport: vpa.viewport.name,
                    });
                    return createAndAppendNodes(log, node, defaultInstruction, node.append);
                }));
            });
        }
        return kernel.resolveAll(...node.children.map(child => {
            return updateNode(log, vit, ctx, child);
        }));
    });
}
function processResidue(node) {
    const ctx = node.context;
    const log = ctx.container.get(kernel.ILogger).scopeTo('RouteTree');
    const suffix = ctx.resolved instanceof Promise ? ' - awaiting promise' : '';
    log.trace(`processResidue(node:%s)${suffix}`, node);
    return kernel.onResolve(ctx.resolved, () => {
        return kernel.resolveAll(...node.residue.splice(0).map(vi => {
            return createAndAppendNodes(log, node, vi, node.append);
        }), ...ctx.getAvailableViewportAgents('static').map(vpa => {
            const defaultInstruction = ViewportInstruction.create({
                component: vpa.viewport.default,
                viewport: vpa.viewport.name,
            });
            return createAndAppendNodes(log, node, defaultInstruction, node.append);
        }));
    });
}
function getDynamicChildren(node) {
    const ctx = node.context;
    const log = ctx.container.get(kernel.ILogger).scopeTo('RouteTree');
    const suffix = ctx.resolved instanceof Promise ? ' - awaiting promise' : '';
    log.trace(`getDynamicChildren(node:%s)${suffix}`, node);
    return kernel.onResolve(ctx.resolved, () => {
        const existingChildren = node.children.slice();
        return kernel.onResolve(kernel.resolveAll(...node.residue.splice(0).map(vi => {
            return createAndAppendNodes(log, node, vi, node.append);
        }), ...ctx.getAvailableViewportAgents('dynamic').map(vpa => {
            const defaultInstruction = ViewportInstruction.create({
                component: vpa.viewport.default,
                viewport: vpa.viewport.name,
            });
            return createAndAppendNodes(log, node, defaultInstruction, node.append);
        })), () => {
            return node.children.filter(x => !existingChildren.includes(x));
        });
    });
}
function createAndAppendNodes(log, node, vi, append) {
    var _a, _b, _c;
    log.trace(`createAndAppendNodes(node:%s,vi:%s,append:${append})`, node, vi);
    switch (vi.component.type) {
        case 0:
            switch (vi.component.value) {
                case '..':
                    node.clearChildren();
                    node = (_b = (_a = node.context.parent) === null || _a === void 0 ? void 0 : _a.node) !== null && _b !== void 0 ? _b : node;
                case '.':
                    return kernel.resolveAll(...vi.children.map(childVI => {
                        return createAndAppendNodes(log, node, childVI, childVI.append);
                    }));
                default: {
                    log.trace(`createAndAppendNodes invoking createNode`);
                    const childNode = createNode(log, node, vi, append);
                    if (childNode === null) {
                        return;
                    }
                    return appendNode(log, node, childNode);
                }
            }
        case 4:
        case 2: {
            const rd = RouteDefinition.resolve(vi.component.value, node.context.definition);
            const params = (_c = vi.params) !== null && _c !== void 0 ? _c : kernel.emptyObject;
            const rr = new $RecognizedRoute(new routeRecognizer.RecognizedRoute(new routeRecognizer.Endpoint(new routeRecognizer.ConfigurableRoute(rd.path[0], rd.caseSensitive, rd), kernel.toArray(Object.values(params))), params), null);
            const childNode = createConfiguredNode(log, node, vi, append, rr);
            return appendNode(log, node, childNode);
        }
    }
}
function createNode(log, node, vi, append) {
    var _a, _b;
    const ctx = node.context;
    let collapse = 0;
    let path = vi.component.value;
    let cur = vi;
    while (cur.children.length === 1) {
        cur = cur.children[0];
        if (cur.component.type === 0) {
            ++collapse;
            path = `${path}/${cur.component.value}`;
        }
        else {
            break;
        }
    }
    const rr = ctx.recognize(path);
    log.trace('createNode recognized route: %s', rr);
    const residue = (_a = rr === null || rr === void 0 ? void 0 : rr.residue) !== null && _a !== void 0 ? _a : null;
    log.trace('createNode residue:', residue);
    const noResidue = residue === null;
    if (rr === null || residue === path) {
        const name = vi.component.value;
        if (name === '') {
            return null;
        }
        let vp = vi.viewport;
        if (vp === null || vp.length === 0)
            vp = defaultViewportName;
        const vpa = ctx.getFallbackViewportAgent('dynamic', vp);
        const fallback = vpa !== null ? vpa.viewport.fallback : ctx.definition.fallback;
        if (fallback === null)
            throw new Error(`Neither the route '${name}' matched any configured route at '${ctx.friendlyPath}' nor a fallback is configured for the viewport '${vp}' - did you forget to add '${name}' to the routes list of the route decorator of '${ctx.component.name}'?`);
        log.trace(`Fallback is set to '${fallback}'. Looking for a recognized route.`);
        const rd = ctx.childRoutes.find(x => x.id === fallback);
        if (rd !== void 0)
            return createFallbackNode(log, rd, node, vi, append);
        log.trace(`No route definition for the fallback '${fallback}' is found; trying to recognize the route.`);
        const rr = ctx.recognize(fallback, true);
        if (rr !== null)
            return createConfiguredNode(log, node, vi, append, rr);
        log.trace(`The fallback '${fallback}' is not recognized as a route; treating as custom element name.`);
        return createFallbackNode(log, RouteDefinition.resolve(fallback, ctx.definition, ctx), node, vi, append);
    }
    rr.residue = null;
    vi.component.value = noResidue
        ? path
        : path.slice(0, -(residue.length + 1));
    for (let i = 0; i < collapse; ++i) {
        const child = vi.children[0];
        if ((_b = residue === null || residue === void 0 ? void 0 : residue.startsWith(child.component.value)) !== null && _b !== void 0 ? _b : false)
            break;
        vi.children = child.children;
    }
    log.trace('createNode after adjustment vi:%s', vi);
    return createConfiguredNode(log, node, vi, append, rr);
}
function createConfiguredNode(log, node, vi, append, rr, route = rr.route.endpoint.route) {
    const ctx = node.context;
    const rt = node.tree;
    return kernel.onResolve(route.handler, $handler => {
        var _a, _b, _c;
        route.handler = $handler;
        log.trace(`creatingConfiguredNode(rd:%s, vi:%s)`, $handler, vi);
        if ($handler.redirectTo === null) {
            const vpName = (((_b = (_a = vi.viewport) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0 ? vi.viewport : $handler.viewport);
            const ced = $handler.component;
            const vpa = ctx.resolveViewportAgent(new ViewportRequest(vpName, ced.name, rt.options.resolutionMode, append));
            const router = ctx.container.get(IRouter);
            const childCtx = router.getRouteContext(vpa, ced, vpa.hostController.container, ctx.definition);
            log.trace('createConfiguredNode setting the context node');
            childCtx.node = RouteNode.create({
                path: rr.route.endpoint.route.path,
                finalPath: route.path,
                context: childCtx,
                instruction: vi,
                params: {
                    ...node.params,
                    ...rr.route.params
                },
                queryParams: rt.queryParams,
                fragment: rt.fragment,
                data: $handler.data,
                viewport: vpName,
                component: ced,
                append,
                title: $handler.config.title,
                residue: [
                    ...(rr.residue === null ? [] : [ViewportInstruction.create(rr.residue)]),
                    ...vi.children,
                ],
            });
            childCtx.node.setTree(node.tree);
            log.trace(`createConfiguredNode(vi:%s) -> %s`, vi, childCtx.node);
            return childCtx.node;
        }
        const origPath = RouteExpression.parse(route.path, false);
        const redirPath = RouteExpression.parse($handler.redirectTo, false);
        let origCur;
        let redirCur;
        const newSegs = [];
        switch (origPath.root.kind) {
            case 2:
            case 4:
                origCur = origPath.root;
                break;
            default:
                throw new Error(`Unexpected expression kind ${origPath.root.kind}`);
        }
        switch (redirPath.root.kind) {
            case 2:
            case 4:
                redirCur = redirPath.root;
                break;
            default:
                throw new Error(`Unexpected expression kind ${redirPath.root.kind}`);
        }
        let origSeg;
        let redirSeg;
        let origDone = false;
        let redirDone = false;
        while (!(origDone && redirDone)) {
            if (origDone) {
                origSeg = null;
            }
            else if (origCur.kind === 4) {
                origSeg = origCur;
                origDone = true;
            }
            else if (origCur.left.kind === 4) {
                origSeg = origCur.left;
                switch (origCur.right.kind) {
                    case 2:
                    case 4:
                        origCur = origCur.right;
                        break;
                    default:
                        throw new Error(`Unexpected expression kind ${origCur.right.kind}`);
                }
            }
            else {
                throw new Error(`Unexpected expression kind ${origCur.left.kind}`);
            }
            if (redirDone) {
                redirSeg = null;
            }
            else if (redirCur.kind === 4) {
                redirSeg = redirCur;
                redirDone = true;
            }
            else if (redirCur.left.kind === 4) {
                redirSeg = redirCur.left;
                switch (redirCur.right.kind) {
                    case 2:
                    case 4:
                        redirCur = redirCur.right;
                        break;
                    default:
                        throw new Error(`Unexpected expression kind ${redirCur.right.kind}`);
                }
            }
            else {
                throw new Error(`Unexpected expression kind ${redirCur.left.kind}`);
            }
            if (redirSeg !== null) {
                if (redirSeg.component.isDynamic && ((_c = origSeg === null || origSeg === void 0 ? void 0 : origSeg.component.isDynamic) !== null && _c !== void 0 ? _c : false)) {
                    newSegs.push(rr.route.params[origSeg.component.name]);
                }
                else {
                    newSegs.push(redirSeg.raw);
                }
            }
        }
        const newPath = newSegs.filter(Boolean).join('/');
        const redirRR = ctx.recognize(newPath);
        if (redirRR === null)
            throw new Error(`'${newPath}' did not match any configured route or registered component name at '${ctx.friendlyPath}' - did you forget to add '${newPath}' to the routes list of the route decorator of '${ctx.component.name}'?`);
        return createConfiguredNode(log, node, vi, append, rr, redirRR.route.endpoint.route);
    });
}
function appendNode(log, node, childNode) {
    return kernel.onResolve(childNode, $childNode => {
        log.trace(`appendNode($childNode:%s)`, $childNode);
        node.appendChild($childNode);
        return $childNode.context.vpa.scheduleUpdate(node.tree.options, $childNode);
    });
}
function createFallbackNode(log, rd, node, vi, append) {
    const rr = new $RecognizedRoute(new routeRecognizer.RecognizedRoute(new routeRecognizer.Endpoint(new routeRecognizer.ConfigurableRoute(rd.path[0], rd.caseSensitive, rd), []), kernel.emptyObject), null);
    vi.children.length = 0;
    return createConfiguredNode(log, node, vi, append, rr);
}

const emptyQuery = Object.freeze(new URLSearchParams());
const AuNavId = 'au-nav-id';
function isManagedState(state) {
    return metadata.isObject(state) && Object.prototype.hasOwnProperty.call(state, AuNavId) === true;
}
function toManagedState(state, navId) {
    return { ...state, [AuNavId]: navId };
}
function valueOrFuncToValue(instructions, valueOrFunc) {
    if (typeof valueOrFunc === 'function') {
        return valueOrFunc(instructions);
    }
    return valueOrFunc;
}
class RouterOptions {
    constructor(useUrlFragmentHash, useHref, resolutionMode, historyStrategy, sameUrlStrategy, buildTitle) {
        this.useUrlFragmentHash = useUrlFragmentHash;
        this.useHref = useHref;
        this.resolutionMode = resolutionMode;
        this.historyStrategy = historyStrategy;
        this.sameUrlStrategy = sameUrlStrategy;
        this.buildTitle = buildTitle;
    }
    static get DEFAULT() { return RouterOptions.create({}); }
    static create(input) {
        var _a, _b, _c, _d, _e, _f;
        return new RouterOptions((_a = input.useUrlFragmentHash) !== null && _a !== void 0 ? _a : false, (_b = input.useHref) !== null && _b !== void 0 ? _b : true, (_c = input.resolutionMode) !== null && _c !== void 0 ? _c : 'dynamic', (_d = input.historyStrategy) !== null && _d !== void 0 ? _d : 'push', (_e = input.sameUrlStrategy) !== null && _e !== void 0 ? _e : 'ignore', (_f = input.buildTitle) !== null && _f !== void 0 ? _f : null);
    }
    getHistoryStrategy(instructions) {
        return valueOrFuncToValue(instructions, this.historyStrategy);
    }
    getSameUrlStrategy(instructions) {
        return valueOrFuncToValue(instructions, this.sameUrlStrategy);
    }
    stringifyProperties() {
        return [
            ['resolutionMode', 'resolution'],
            ['historyStrategy', 'history'],
            ['sameUrlStrategy', 'sameUrl'],
        ].map(([key, name]) => {
            const value = this[key];
            return `${name}:${typeof value === 'function' ? value : `'${value}'`}`;
        }).join(',');
    }
    clone() {
        return new RouterOptions(this.useUrlFragmentHash, this.useHref, this.resolutionMode, this.historyStrategy, this.sameUrlStrategy, this.buildTitle);
    }
    toString() {
        return `RO(${this.stringifyProperties()})`;
    }
}
class NavigationOptions extends RouterOptions {
    constructor(routerOptions, title, titleSeparator, append, context, queryParams, fragment, state) {
        super(routerOptions.useUrlFragmentHash, routerOptions.useHref, routerOptions.resolutionMode, routerOptions.historyStrategy, routerOptions.sameUrlStrategy, routerOptions.buildTitle);
        this.title = title;
        this.titleSeparator = titleSeparator;
        this.append = append;
        this.context = context;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.state = state;
    }
    static get DEFAULT() { return NavigationOptions.create({}); }
    static create(input) {
        var _a, _b, _c, _d, _e, _f, _g;
        return new NavigationOptions(RouterOptions.create(input), (_a = input.title) !== null && _a !== void 0 ? _a : null, (_b = input.titleSeparator) !== null && _b !== void 0 ? _b : ' | ', (_c = input.append) !== null && _c !== void 0 ? _c : false, (_d = input.context) !== null && _d !== void 0 ? _d : null, (_e = input.queryParams) !== null && _e !== void 0 ? _e : null, (_f = input.fragment) !== null && _f !== void 0 ? _f : '', (_g = input.state) !== null && _g !== void 0 ? _g : null);
    }
    clone() {
        return new NavigationOptions(super.clone(), this.title, this.titleSeparator, this.append, this.context, { ...this.queryParams }, this.fragment, this.state === null ? null : { ...this.state });
    }
    toString() {
        return `NO(${super.stringifyProperties()})`;
    }
}
class Navigation {
    constructor(id, instructions, trigger, options, prevNavigation, finalInstructions) {
        this.id = id;
        this.instructions = instructions;
        this.trigger = trigger;
        this.options = options;
        this.prevNavigation = prevNavigation;
        this.finalInstructions = finalInstructions;
    }
    static create(input) {
        return new Navigation(input.id, input.instructions, input.trigger, input.options, input.prevNavigation, input.finalInstructions);
    }
    toString() {
        return `N(id:${this.id},instructions:${this.instructions},trigger:'${this.trigger}')`;
    }
}
class Transition {
    constructor(id, prevInstructions, instructions, finalInstructions, instructionsChanged, trigger, options, managedState, previousRouteTree, routeTree, promise, resolve, reject, guardsResult, error) {
        this.id = id;
        this.prevInstructions = prevInstructions;
        this.instructions = instructions;
        this.finalInstructions = finalInstructions;
        this.instructionsChanged = instructionsChanged;
        this.trigger = trigger;
        this.options = options;
        this.managedState = managedState;
        this.previousRouteTree = previousRouteTree;
        this.routeTree = routeTree;
        this.promise = promise;
        this.resolve = resolve;
        this.reject = reject;
        this.guardsResult = guardsResult;
        this.error = error;
    }
    static create(input) {
        return new Transition(input.id, input.prevInstructions, input.instructions, input.finalInstructions, input.instructionsChanged, input.trigger, input.options, input.managedState, input.previousRouteTree, input.routeTree, input.promise, input.resolve, input.reject, input.guardsResult, void 0);
    }
    run(cb, next) {
        if (this.guardsResult !== true) {
            return;
        }
        try {
            const ret = cb();
            if (ret instanceof Promise) {
                ret.then(next).catch(err => {
                    this.handleError(err);
                });
            }
            else {
                next(ret);
            }
        }
        catch (err) {
            this.handleError(err);
        }
    }
    handleError(err) {
        this.reject(this.error = err);
    }
    toString() {
        return `T(id:${this.id},trigger:'${this.trigger}',instructions:${this.instructions},options:${this.options})`;
    }
}
const IRouter = kernel.DI.createInterface('IRouter', x => x.singleton(exports.Router));
exports.Router = class Router {
    constructor(container, p, logger, events, locationMgr) {
        this.container = container;
        this.p = p;
        this.logger = logger;
        this.events = events;
        this.locationMgr = locationMgr;
        this._ctx = null;
        this._routeTree = null;
        this._currentTr = null;
        this.options = RouterOptions.DEFAULT;
        this.navigated = false;
        this.navigationId = 0;
        this.lastSuccessfulNavigation = null;
        this.activeNavigation = null;
        this.instructions = ViewportInstructionTree.create('');
        this.nextTr = null;
        this.locationChangeSubscription = null;
        this._hasTitleBuilder = false;
        this.vpaLookup = new Map();
        this.logger = logger.root.scopeTo('Router');
    }
    get ctx() {
        let ctx = this._ctx;
        if (ctx === null) {
            if (!this.container.has(IRouteContext, true)) {
                throw new Error(`Root RouteContext is not set. Did you forget to register RouteConfiguration, or try to navigate before calling Aurelia.start()?`);
            }
            ctx = this._ctx = this.container.get(IRouteContext);
        }
        return ctx;
    }
    get routeTree() {
        let routeTree = this._routeTree;
        if (routeTree === null) {
            const ctx = this.ctx;
            routeTree = this._routeTree = new RouteTree(NavigationOptions.create({ ...this.options }), emptyQuery, null, RouteNode.create({
                path: '',
                finalPath: '',
                context: ctx,
                instruction: null,
                component: ctx.definition.component,
                append: false,
                title: ctx.definition.config.title,
            }));
        }
        return routeTree;
    }
    get currentTr() {
        let currentTr = this._currentTr;
        if (currentTr === null) {
            currentTr = this._currentTr = Transition.create({
                id: 0,
                prevInstructions: this.instructions,
                instructions: this.instructions,
                finalInstructions: this.instructions,
                instructionsChanged: true,
                trigger: 'api',
                options: NavigationOptions.DEFAULT,
                managedState: null,
                previousRouteTree: this.routeTree.clone(),
                routeTree: this.routeTree,
                resolve: null,
                reject: null,
                promise: null,
                guardsResult: true,
                error: void 0,
            });
        }
        return currentTr;
    }
    set currentTr(value) {
        this._currentTr = value;
    }
    resolveContext(context) {
        return RouteContext.resolve(this.ctx, context);
    }
    start(routerOptions, performInitialNavigation) {
        this.options = RouterOptions.create(routerOptions);
        this._hasTitleBuilder = typeof this.options.buildTitle === 'function';
        this.locationMgr.startListening();
        this.locationChangeSubscription = this.events.subscribe('au:router:location-change', e => {
            this.p.taskQueue.queueTask(() => {
                const state = isManagedState(e.state) ? e.state : null;
                const options = NavigationOptions.create({
                    ...this.options,
                    historyStrategy: 'replace',
                });
                const instructions = ViewportInstructionTree.create(e.url, options);
                this.enqueue(instructions, e.trigger, state, null);
            });
        });
        if (!this.navigated && performInitialNavigation) {
            return this.load(this.locationMgr.getPath(), { historyStrategy: 'replace' });
        }
    }
    stop() {
        var _a;
        this.locationMgr.stopListening();
        (_a = this.locationChangeSubscription) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    load(instructionOrInstructions, options) {
        const instructions = this.createViewportInstructions(instructionOrInstructions, options);
        this.logger.trace('load(instructions:%s)', instructions);
        return this.enqueue(instructions, 'api', null, null);
    }
    isActive(instructionOrInstructions, context) {
        const ctx = this.resolveContext(context);
        const instructions = this.createViewportInstructions(instructionOrInstructions, { context: ctx });
        this.logger.trace('isActive(instructions:%s,ctx:%s)', instructions, ctx);
        return this.routeTree.contains(instructions);
    }
    getRouteContext(viewportAgent, component, container, parentDefinition) {
        const logger = container.get(kernel.ILogger).scopeTo('RouteContext');
        const routeDefinition = RouteDefinition.resolve(component.Type, parentDefinition);
        let routeDefinitionLookup = this.vpaLookup.get(viewportAgent);
        if (routeDefinitionLookup === void 0) {
            this.vpaLookup.set(viewportAgent, routeDefinitionLookup = new WeakMap());
        }
        let routeContext = routeDefinitionLookup.get(routeDefinition);
        if (routeContext === void 0) {
            logger.trace(`creating new RouteContext for %s`, routeDefinition);
            const parent = container.has(IRouteContext, true) ? container.get(IRouteContext) : null;
            routeDefinitionLookup.set(routeDefinition, routeContext = new RouteContext(viewportAgent, parent, component, routeDefinition, container));
        }
        else {
            logger.trace(`returning existing RouteContext for %s`, routeDefinition);
            if (viewportAgent !== null) {
                routeContext.vpa = viewportAgent;
            }
        }
        return routeContext;
    }
    createViewportInstructions(instructionOrInstructions, options) {
        if (typeof instructionOrInstructions === 'string') {
            instructionOrInstructions = this.locationMgr.removeBaseHref(instructionOrInstructions);
        }
        return ViewportInstructionTree.create(instructionOrInstructions, this.getNavigationOptions(options));
    }
    enqueue(instructions, trigger, state, failedTr) {
        const lastTr = this.currentTr;
        const logger = this.logger;
        if (trigger !== 'api' && lastTr.trigger === 'api' && lastTr.instructions.equals(instructions)) {
            logger.debug(`Ignoring navigation triggered by '%s' because it is the same URL as the previous navigation which was triggered by 'api'.`, trigger);
            return true;
        }
        let resolve = (void 0);
        let reject = (void 0);
        let promise;
        if (failedTr === null) {
            promise = new Promise(function ($resolve, $reject) { resolve = $resolve; reject = $reject; });
        }
        else {
            logger.debug(`Reusing promise/resolve/reject from the previously failed transition %s`, failedTr);
            promise = failedTr.promise;
            resolve = failedTr.resolve;
            reject = failedTr.reject;
        }
        const nextTr = this.nextTr = Transition.create({
            id: ++this.navigationId,
            trigger,
            managedState: state,
            prevInstructions: lastTr.finalInstructions,
            finalInstructions: instructions,
            instructionsChanged: !lastTr.finalInstructions.equals(instructions),
            instructions,
            options: instructions.options,
            promise,
            resolve,
            reject,
            previousRouteTree: this.routeTree,
            routeTree: this._routeTree = this.routeTree.clone(),
            guardsResult: true,
            error: void 0,
        });
        logger.debug(`Scheduling transition: %s`, nextTr);
        if (this.activeNavigation === null) {
            try {
                this.run(nextTr);
            }
            catch (err) {
                nextTr.handleError(err);
            }
        }
        return nextTr.promise.then(ret => {
            logger.debug(`Transition succeeded: %s`, nextTr);
            return ret;
        }).catch(err => {
            logger.error(`Navigation failed: %s`, nextTr, err);
            this.activeNavigation = null;
            const $nextTr = this.nextTr;
            if ($nextTr !== null) {
                $nextTr.previousRouteTree = nextTr.previousRouteTree;
            }
            else {
                this._routeTree = nextTr.previousRouteTree;
            }
            throw err;
        });
    }
    run(tr) {
        this.currentTr = tr;
        this.nextTr = null;
        const prevNavigation = this.lastSuccessfulNavigation === null ? null : Navigation.create({
            ...this.lastSuccessfulNavigation,
            prevNavigation: null,
        });
        this.activeNavigation = Navigation.create({
            id: tr.id,
            instructions: tr.instructions,
            trigger: tr.trigger,
            options: tr.options,
            prevNavigation,
            finalInstructions: tr.finalInstructions,
        });
        const navigationContext = this.resolveContext(tr.options.context);
        const routeChanged = (!this.navigated ||
            tr.instructions.children.length !== navigationContext.node.children.length ||
            tr.instructions.children.some((x, i) => { var _a, _b; return !((_b = (_a = navigationContext.node.children[i]) === null || _a === void 0 ? void 0 : _a.originalInstruction.equals(x)) !== null && _b !== void 0 ? _b : false); }));
        const shouldProcessRoute = routeChanged || tr.options.getSameUrlStrategy(this.instructions) === 'reload';
        if (!shouldProcessRoute) {
            this.logger.trace(`run(tr:%s) - NOT processing route`, tr);
            this.navigated = true;
            this.activeNavigation = null;
            tr.resolve(false);
            this.runNextTransition(tr);
            return;
        }
        this.logger.trace(`run(tr:%s) - processing route`, tr);
        this.events.publish(new NavigationStartEvent(tr.id, tr.instructions, tr.trigger, tr.managedState));
        if (this.nextTr !== null) {
            this.logger.debug(`run(tr:%s) - aborting because a new transition was queued in response to the NavigationStartEvent`, tr);
            return this.run(this.nextTr);
        }
        this.activeNavigation = Navigation.create({
            ...this.activeNavigation,
            finalInstructions: tr.finalInstructions,
        });
        tr.run(() => {
            this.logger.trace(`run() - compiling route tree: %s`, tr.finalInstructions);
            return updateRouteTree(tr.routeTree, tr.finalInstructions, navigationContext);
        }, () => {
            const prev = tr.previousRouteTree.root.children;
            const next = tr.routeTree.root.children;
            const all = mergeDistinct(prev, next);
            Batch.start(b => {
                this.logger.trace(`run() - invoking canUnload on ${prev.length} nodes`);
                for (const node of prev) {
                    node.context.vpa.canUnload(tr, b);
                }
            }).continueWith(b => {
                if (tr.guardsResult !== true) {
                    b.push();
                    this.cancelNavigation(tr);
                }
            }).continueWith(b => {
                this.logger.trace(`run() - invoking canLoad on ${next.length} nodes`);
                for (const node of next) {
                    node.context.vpa.canLoad(tr, b);
                }
            }).continueWith(b => {
                if (tr.guardsResult !== true) {
                    b.push();
                    this.cancelNavigation(tr);
                }
            }).continueWith(b => {
                this.logger.trace(`run() - invoking unload on ${prev.length} nodes`);
                for (const node of prev) {
                    node.context.vpa.unload(tr, b);
                }
            }).continueWith(b => {
                this.logger.trace(`run() - invoking load on ${next.length} nodes`);
                for (const node of next) {
                    node.context.vpa.load(tr, b);
                }
            }).continueWith(b => {
                this.logger.trace(`run() - invoking swap on ${all.length} nodes`);
                for (const node of all) {
                    node.context.vpa.swap(tr, b);
                }
            }).continueWith(() => {
                this.logger.trace(`run() - finalizing transition`);
                all.forEach(function (node) {
                    node.context.vpa.endTransition();
                });
                this.navigated = true;
                this.instructions = tr.finalInstructions = tr.routeTree.finalizeInstructions();
                this.events.publish(new NavigationEndEvent(tr.id, tr.instructions, this.instructions));
                this.lastSuccessfulNavigation = this.activeNavigation;
                this.activeNavigation = null;
                this.applyHistoryState(tr);
                tr.resolve(true);
                this.runNextTransition(tr);
            }).start();
        });
    }
    applyHistoryState(tr) {
        const newUrl = tr.finalInstructions.toUrl(this.options.useUrlFragmentHash);
        switch (tr.options.getHistoryStrategy(this.instructions)) {
            case 'none':
                break;
            case 'push':
                this.locationMgr.pushState(toManagedState(tr.options.state, tr.id), this.updateTitle(tr), newUrl);
                break;
            case 'replace':
                this.locationMgr.replaceState(toManagedState(tr.options.state, tr.id), this.updateTitle(tr), newUrl);
                break;
        }
    }
    getTitle(tr) {
        var _a, _b;
        switch (typeof tr.options.title) {
            case 'function':
                return (_a = tr.options.title.call(void 0, tr.routeTree.root)) !== null && _a !== void 0 ? _a : '';
            case 'string':
                return tr.options.title;
            default:
                return (_b = tr.routeTree.root.getTitle(tr.options.titleSeparator)) !== null && _b !== void 0 ? _b : '';
        }
    }
    updateTitle(tr = this.currentTr) {
        var _a;
        const title = this._hasTitleBuilder ? ((_a = this.options.buildTitle(tr)) !== null && _a !== void 0 ? _a : '') : this.getTitle(tr);
        if (title.length > 0) {
            this.p.document.title = title;
        }
        return this.p.document.title;
    }
    cancelNavigation(tr) {
        this.logger.trace(`cancelNavigation(tr:%s)`, tr);
        const prev = tr.previousRouteTree.root.children;
        const next = tr.routeTree.root.children;
        const all = mergeDistinct(prev, next);
        all.forEach(function (node) {
            node.context.vpa.cancelUpdate();
        });
        this.activeNavigation = null;
        this.instructions = tr.prevInstructions;
        this._routeTree = tr.previousRouteTree;
        this.events.publish(new NavigationCancelEvent(tr.id, tr.instructions, `guardsResult is ${tr.guardsResult}`));
        if (tr.guardsResult === false) {
            tr.resolve(false);
            this.runNextTransition(tr);
        }
        else {
            void kernel.onResolve(this.enqueue(tr.guardsResult, 'api', tr.managedState, tr), () => {
                this.logger.trace(`cancelNavigation(tr:%s) - finished redirect`, tr);
            });
        }
    }
    runNextTransition(tr) {
        if (this.nextTr !== null) {
            this.logger.trace(`runNextTransition(tr:%s) -> scheduling nextTransition: %s`, tr, this.nextTr);
            this.p.taskQueue.queueTask(() => {
                const nextTr = this.nextTr;
                if (nextTr !== null) {
                    try {
                        this.run(nextTr);
                    }
                    catch (err) {
                        nextTr.handleError(err);
                    }
                }
            });
        }
    }
    getNavigationOptions(options) {
        return NavigationOptions.create({ ...this.options, ...options });
    }
};
exports.Router = __decorate([
    __param(0, kernel.IContainer),
    __param(1, runtimeHtml.IPlatform),
    __param(2, kernel.ILogger),
    __param(3, IRouterEvents),
    __param(4, ILocationManager)
], exports.Router);

const IViewportInstruction = kernel.DI.createInterface('IViewportInstruction');
class ViewportInstruction {
    constructor(context, append, open, close, component, viewport, params, children) {
        this.context = context;
        this.append = append;
        this.open = open;
        this.close = close;
        this.component = component;
        this.viewport = viewport;
        this.params = params;
        this.children = children;
    }
    static create(instruction, context) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (instruction instanceof ViewportInstruction) {
            return instruction;
        }
        if (isPartialViewportInstruction(instruction)) {
            const component = TypedNavigationInstruction.create(instruction.component);
            const children = (_b = (_a = instruction.children) === null || _a === void 0 ? void 0 : _a.map(ViewportInstruction.create)) !== null && _b !== void 0 ? _b : [];
            return new ViewportInstruction((_d = (_c = instruction.context) !== null && _c !== void 0 ? _c : context) !== null && _d !== void 0 ? _d : null, (_e = instruction.append) !== null && _e !== void 0 ? _e : false, (_f = instruction.open) !== null && _f !== void 0 ? _f : 0, (_g = instruction.close) !== null && _g !== void 0 ? _g : 0, component, (_h = instruction.viewport) !== null && _h !== void 0 ? _h : null, (_j = instruction.params) !== null && _j !== void 0 ? _j : null, children);
        }
        const typedInstruction = TypedNavigationInstruction.create(instruction);
        return new ViewportInstruction(context !== null && context !== void 0 ? context : null, false, 0, 0, typedInstruction, null, null, []);
    }
    contains(other) {
        const thisChildren = this.children;
        const otherChildren = other.children;
        if (thisChildren.length < otherChildren.length) {
            return false;
        }
        if (!this.component.equals(other.component)) {
            return false;
        }
        for (let i = 0, ii = otherChildren.length; i < ii; ++i) {
            if (!thisChildren[i].contains(otherChildren[i])) {
                return false;
            }
        }
        return true;
    }
    equals(other) {
        const thisChildren = this.children;
        const otherChildren = other.children;
        if (thisChildren.length !== otherChildren.length) {
            return false;
        }
        if (!this.component.equals(other.component) ||
            this.viewport !== other.viewport ||
            !shallowEquals(this.params, other.params)) {
            return false;
        }
        for (let i = 0, ii = thisChildren.length; i < ii; ++i) {
            if (!thisChildren[i].equals(otherChildren[i])) {
                return false;
            }
        }
        return true;
    }
    clone() {
        return new ViewportInstruction(this.context, this.append, this.open, this.close, this.component.clone(), this.viewport, this.params === null ? null : { ...this.params }, [...this.children]);
    }
    toUrlComponent(recursive = true) {
        const component = this.component.toUrlComponent();
        const params = this.params === null || Object.keys(this.params).length === 0 ? '' : `(${stringifyParams(this.params)})`;
        const viewport = component.length === 0 || this.viewport === null || this.viewport.length === 0 ? '' : `@${this.viewport}`;
        const thisPart = `${'('.repeat(this.open)}${component}${params}${viewport}${')'.repeat(this.close)}`;
        const childPart = recursive ? this.children.map(x => x.toUrlComponent()).join('+') : '';
        if (thisPart.length > 0) {
            if (childPart.length > 0) {
                return [thisPart, childPart].join('/');
            }
            return thisPart;
        }
        return childPart;
    }
    toString() {
        const component = `c:${this.component}`;
        const viewport = this.viewport === null || this.viewport.length === 0 ? '' : `viewport:${this.viewport}`;
        const children = this.children.length === 0 ? '' : `children:[${this.children.map(String).join(',')}]`;
        const props = [component, viewport, children].filter(Boolean).join(',');
        return `VPI(${props})`;
    }
}
function stringifyParams(params) {
    const keys = Object.keys(params);
    const values = Array(keys.length);
    const indexKeys = [];
    const namedKeys = [];
    for (const key of keys) {
        if (kernel.isArrayIndex(key)) {
            indexKeys.push(Number(key));
        }
        else {
            namedKeys.push(key);
        }
    }
    for (let i = 0; i < keys.length; ++i) {
        const indexKeyIdx = indexKeys.indexOf(i);
        if (indexKeyIdx > -1) {
            values[i] = params[i];
            indexKeys.splice(indexKeyIdx, 1);
        }
        else {
            const namedKey = namedKeys.shift();
            values[i] = `${namedKey}=${params[namedKey]}`;
        }
    }
    return values.join(',');
}
const getObjectId = (function () {
    let lastId = 0;
    const objectIdMap = new Map();
    return function (obj) {
        let id = objectIdMap.get(obj);
        if (id === void 0) {
            objectIdMap.set(obj, id = ++lastId);
        }
        return id;
    };
})();
class ViewportInstructionTree {
    constructor(options, isAbsolute, children, queryParams, fragment) {
        this.options = options;
        this.isAbsolute = isAbsolute;
        this.children = children;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    static create(instructionOrInstructions, options) {
        const $options = NavigationOptions.create({ ...options });
        if (instructionOrInstructions instanceof ViewportInstructionTree) {
            return new ViewportInstructionTree($options, instructionOrInstructions.isAbsolute, instructionOrInstructions.children.map(x => ViewportInstruction.create(x, $options.context)), instructionOrInstructions.queryParams, instructionOrInstructions.fragment);
        }
        if (instructionOrInstructions instanceof Array) {
            return new ViewportInstructionTree($options, false, instructionOrInstructions.map(x => ViewportInstruction.create(x, $options.context)), emptyQuery, null);
        }
        if (typeof instructionOrInstructions === 'string') {
            const expr = RouteExpression.parse(instructionOrInstructions, $options.useUrlFragmentHash);
            return expr.toInstructionTree($options);
        }
        return new ViewportInstructionTree($options, false, [ViewportInstruction.create(instructionOrInstructions, $options.context)], emptyQuery, null);
    }
    equals(other) {
        const thisChildren = this.children;
        const otherChildren = other.children;
        if (thisChildren.length !== otherChildren.length) {
            return false;
        }
        for (let i = 0, ii = thisChildren.length; i < ii; ++i) {
            if (!thisChildren[i].equals(otherChildren[i])) {
                return false;
            }
        }
        return true;
    }
    toUrl(useUrlFragmentHash = false) {
        var _a;
        let pathname;
        let hash;
        if (useUrlFragmentHash) {
            pathname = '';
            hash = `#${this.toPath()}`;
        }
        else {
            pathname = this.toPath();
            hash = (_a = this.fragment) !== null && _a !== void 0 ? _a : '';
        }
        let search = this.queryParams.toString();
        search = search === '' ? '' : `?${search}`;
        const url = `${pathname}${hash}${search}`;
        return url;
    }
    toPath() {
        const path = this.children.map(x => x.toUrlComponent()).join('+');
        return path;
    }
    toString() {
        return `[${this.children.map(String).join(',')}]`;
    }
}
var NavigationInstructionType;
(function (NavigationInstructionType) {
    NavigationInstructionType[NavigationInstructionType["string"] = 0] = "string";
    NavigationInstructionType[NavigationInstructionType["ViewportInstruction"] = 1] = "ViewportInstruction";
    NavigationInstructionType[NavigationInstructionType["CustomElementDefinition"] = 2] = "CustomElementDefinition";
    NavigationInstructionType[NavigationInstructionType["Promise"] = 3] = "Promise";
    NavigationInstructionType[NavigationInstructionType["IRouteViewModel"] = 4] = "IRouteViewModel";
})(NavigationInstructionType || (NavigationInstructionType = {}));
class TypedNavigationInstruction {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    static create(instruction) {
        if (instruction instanceof TypedNavigationInstruction) {
            return instruction;
        }
        if (typeof instruction === 'string')
            return new TypedNavigationInstruction(0, instruction);
        if (!metadata.isObject(instruction))
            expectType('function/class or object', '', instruction);
        if (typeof instruction === 'function') {
            if (runtimeHtml.CustomElement.isType(instruction)) {
                const definition = runtimeHtml.CustomElement.getDefinition(instruction);
                return new TypedNavigationInstruction(2, definition);
            }
            else {
                return TypedNavigationInstruction.create(instruction());
            }
        }
        if (instruction instanceof Promise)
            return new TypedNavigationInstruction(3, instruction);
        if (isPartialViewportInstruction(instruction)) {
            const viewportInstruction = ViewportInstruction.create(instruction);
            return new TypedNavigationInstruction(1, viewportInstruction);
        }
        if (runtimeHtml.isCustomElementViewModel(instruction))
            return new TypedNavigationInstruction(4, instruction);
        if (instruction instanceof runtimeHtml.CustomElementDefinition)
            return new TypedNavigationInstruction(2, instruction);
        if (isPartialCustomElementDefinition(instruction)) {
            const Type = runtimeHtml.CustomElement.define(instruction);
            const definition = runtimeHtml.CustomElement.getDefinition(Type);
            return new TypedNavigationInstruction(2, definition);
        }
        throw new Error(`Invalid component ${tryStringify(instruction)}: must be either a class, a custom element ViewModel, or a (partial) custom element definition`);
    }
    equals(other) {
        switch (this.type) {
            case 2:
            case 4:
            case 3:
            case 0:
                return this.type === other.type && this.value === other.value;
            case 1:
                return this.type === other.type && this.value.equals(other.value);
        }
    }
    clone() {
        return new TypedNavigationInstruction(this.type, this.value);
    }
    toUrlComponent() {
        switch (this.type) {
            case 2:
                return this.value.name;
            case 4:
            case 3:
                return `au$obj${getObjectId(this.value)}`;
            case 1:
                return this.value.toUrlComponent();
            case 0:
                return this.value;
        }
    }
    toString() {
        switch (this.type) {
            case 2:
                return `CEDef(name:'${this.value.name}')`;
            case 3:
                return `Promise`;
            case 4:
                return `VM(name:'${runtimeHtml.CustomElement.getDefinition(this.value.constructor).name}')`;
            case 1:
                return this.value.toString();
            case 0:
                return `'${this.value}'`;
        }
    }
}

const noRoutes = kernel.emptyArray;
function defaultReentryBehavior(current, next) {
    if (!shallowEquals(current.params, next.params)) {
        return 'invoke-lifecycles';
    }
    return 'none';
}
class RouteConfig {
    constructor(id, path, title, redirectTo, caseSensitive, transitionPlan, viewport, data, routes, fallback, component) {
        this.id = id;
        this.path = path;
        this.title = title;
        this.redirectTo = redirectTo;
        this.caseSensitive = caseSensitive;
        this.transitionPlan = transitionPlan;
        this.viewport = viewport;
        this.data = data;
        this.routes = routes;
        this.fallback = fallback;
        this.component = component;
    }
    static create(configOrPath, Type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
        if (typeof configOrPath === 'string' || configOrPath instanceof Array) {
            const path = configOrPath;
            const redirectTo = (_a = Type === null || Type === void 0 ? void 0 : Type.redirectTo) !== null && _a !== void 0 ? _a : null;
            const caseSensitive = (_b = Type === null || Type === void 0 ? void 0 : Type.caseSensitive) !== null && _b !== void 0 ? _b : false;
            const id = (_c = Type === null || Type === void 0 ? void 0 : Type.id) !== null && _c !== void 0 ? _c : (path instanceof Array ? path[0] : path);
            const title = (_d = Type === null || Type === void 0 ? void 0 : Type.title) !== null && _d !== void 0 ? _d : null;
            const reentryBehavior = (_e = Type === null || Type === void 0 ? void 0 : Type.transitionPlan) !== null && _e !== void 0 ? _e : defaultReentryBehavior;
            const viewport = (_f = Type === null || Type === void 0 ? void 0 : Type.viewport) !== null && _f !== void 0 ? _f : null;
            const data = (_g = Type === null || Type === void 0 ? void 0 : Type.data) !== null && _g !== void 0 ? _g : {};
            const children = (_h = Type === null || Type === void 0 ? void 0 : Type.routes) !== null && _h !== void 0 ? _h : noRoutes;
            return new RouteConfig(id, path, title, redirectTo, caseSensitive, reentryBehavior, viewport, data, children, (_j = Type === null || Type === void 0 ? void 0 : Type.fallback) !== null && _j !== void 0 ? _j : null, null);
        }
        else if (typeof configOrPath === 'object') {
            const config = configOrPath;
            validateRouteConfig(config, '');
            const path = (_l = (_k = config.path) !== null && _k !== void 0 ? _k : Type === null || Type === void 0 ? void 0 : Type.path) !== null && _l !== void 0 ? _l : null;
            const title = (_o = (_m = config.title) !== null && _m !== void 0 ? _m : Type === null || Type === void 0 ? void 0 : Type.title) !== null && _o !== void 0 ? _o : null;
            const redirectTo = (_q = (_p = config.redirectTo) !== null && _p !== void 0 ? _p : Type === null || Type === void 0 ? void 0 : Type.redirectTo) !== null && _q !== void 0 ? _q : null;
            const caseSensitive = (_s = (_r = config.caseSensitive) !== null && _r !== void 0 ? _r : Type === null || Type === void 0 ? void 0 : Type.caseSensitive) !== null && _s !== void 0 ? _s : false;
            const id = (_u = (_t = config.id) !== null && _t !== void 0 ? _t : Type === null || Type === void 0 ? void 0 : Type.id) !== null && _u !== void 0 ? _u : (path instanceof Array ? path[0] : path);
            const reentryBehavior = (_w = (_v = config.transitionPlan) !== null && _v !== void 0 ? _v : Type === null || Type === void 0 ? void 0 : Type.transitionPlan) !== null && _w !== void 0 ? _w : defaultReentryBehavior;
            const viewport = (_y = (_x = config.viewport) !== null && _x !== void 0 ? _x : Type === null || Type === void 0 ? void 0 : Type.viewport) !== null && _y !== void 0 ? _y : null;
            const data = {
                ...Type === null || Type === void 0 ? void 0 : Type.data,
                ...config.data,
            };
            const children = [
                ...((_z = config.routes) !== null && _z !== void 0 ? _z : noRoutes),
                ...((_0 = Type === null || Type === void 0 ? void 0 : Type.routes) !== null && _0 !== void 0 ? _0 : noRoutes),
            ];
            return new RouteConfig(id, path, title, redirectTo, caseSensitive, reentryBehavior, viewport, data, children, (_2 = (_1 = config.fallback) !== null && _1 !== void 0 ? _1 : Type === null || Type === void 0 ? void 0 : Type.fallback) !== null && _2 !== void 0 ? _2 : null, (_3 = config.component) !== null && _3 !== void 0 ? _3 : null);
        }
        else {
            expectType('string, function/class or object', '', configOrPath);
        }
    }
    applyChildRouteConfig(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let parentPath = (_a = this.path) !== null && _a !== void 0 ? _a : '';
        if (typeof parentPath !== 'string') {
            parentPath = parentPath[0];
        }
        validateRouteConfig(config, parentPath);
        return new RouteConfig((_b = config.id) !== null && _b !== void 0 ? _b : this.id, (_c = config.path) !== null && _c !== void 0 ? _c : this.path, (_d = config.title) !== null && _d !== void 0 ? _d : this.title, (_e = config.redirectTo) !== null && _e !== void 0 ? _e : this.redirectTo, (_f = config.caseSensitive) !== null && _f !== void 0 ? _f : this.caseSensitive, (_g = config.transitionPlan) !== null && _g !== void 0 ? _g : this.transitionPlan, (_h = config.viewport) !== null && _h !== void 0 ? _h : this.viewport, (_j = config.data) !== null && _j !== void 0 ? _j : this.data, (_k = config.routes) !== null && _k !== void 0 ? _k : this.routes, (_l = config.fallback) !== null && _l !== void 0 ? _l : this.fallback, (_m = config.component) !== null && _m !== void 0 ? _m : this.component);
    }
}
const Route = {
    name: kernel.Protocol.resource.keyFor('route-configuration'),
    isConfigured(Type) {
        return metadata.Metadata.hasOwn(Route.name, Type);
    },
    configure(configOrPath, Type) {
        const config = RouteConfig.create(configOrPath, Type);
        metadata.Metadata.define(Route.name, config, Type);
        return Type;
    },
    getConfig(Type) {
        if (!Route.isConfigured(Type)) {
            Route.configure({}, Type);
        }
        return metadata.Metadata.getOwn(Route.name, Type);
    },
};
function route(configOrPath) {
    return function (target) {
        return Route.configure(configOrPath, target);
    };
}

const defaultViewportName = 'default';
class RouteDefinition {
    constructor(config, component, parentDefinition) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.config = config;
        this.component = component;
        this.hasExplicitPath = config.path !== null;
        this.caseSensitive = config.caseSensitive;
        this.path = ensureArrayOfStrings((_a = config.path) !== null && _a !== void 0 ? _a : component.name);
        this.redirectTo = (_b = config.redirectTo) !== null && _b !== void 0 ? _b : null;
        this.viewport = (_c = config.viewport) !== null && _c !== void 0 ? _c : defaultViewportName;
        this.id = ensureString((_d = config.id) !== null && _d !== void 0 ? _d : this.path);
        this.data = (_e = config.data) !== null && _e !== void 0 ? _e : {};
        this.fallback = (_g = (_f = config.fallback) !== null && _f !== void 0 ? _f : parentDefinition === null || parentDefinition === void 0 ? void 0 : parentDefinition.fallback) !== null && _g !== void 0 ? _g : null;
    }
    static resolve(routeable, parentDefinition, context) {
        if (isPartialRedirectRouteConfig(routeable)) {
            return new RouteDefinition(RouteConfig.create(routeable, null), null, parentDefinition);
        }
        return kernel.onResolve(this.resolveCustomElementDefinition(routeable, context), def => {
            let routeDefinition = $RouteDefinition.get(def);
            if (routeDefinition === null) {
                const type = def.Type;
                const config = isPartialChildRouteConfig(routeable)
                    ? Route.isConfigured(type)
                        ? Route.getConfig(type).applyChildRouteConfig(routeable)
                        : RouteConfig.create(routeable, type)
                    : Route.getConfig(def.Type);
                routeDefinition = new RouteDefinition(config, def, parentDefinition);
                $RouteDefinition.define(routeDefinition, def);
            }
            return routeDefinition;
        });
    }
    static resolveCustomElementDefinition(routeable, context) {
        if (isPartialChildRouteConfig(routeable)) {
            return this.resolveCustomElementDefinition(routeable.component, context);
        }
        const typedInstruction = TypedNavigationInstruction.create(routeable);
        switch (typedInstruction.type) {
            case 0: {
                if (context === void 0) {
                    throw new Error(`When retrieving the RouteDefinition for a component name, a RouteContext (that can resolve it) must be provided`);
                }
                const component = context.container.find(runtimeHtml.CustomElement, typedInstruction.value);
                if (component === null) {
                    throw new Error(`Could not find a CustomElement named '${typedInstruction.value}' in the current container scope of ${context}. This means the component is neither registered at Aurelia startup nor via the 'dependencies' decorator or static property.`);
                }
                return component;
            }
            case 2:
                return typedInstruction.value;
            case 4:
                return runtimeHtml.CustomElement.getDefinition(typedInstruction.value.constructor);
            case 3:
                if (context === void 0) {
                    throw new Error(`RouteContext must be provided when resolving an imported module`);
                }
                return context.resolveLazy(typedInstruction.value);
        }
    }
    register(container) {
        var _a;
        (_a = this.component) === null || _a === void 0 ? void 0 : _a.register(container);
    }
    toUrlComponent() {
        return 'not-implemented';
    }
    toString() {
        const path = this.config.path === null ? 'null' : `'${this.config.path}'`;
        if (this.component !== null) {
            return `RD(config.path:${path},c.name:'${this.component.name}',vp:'${this.viewport}')`;
        }
        else {
            return `RD(config.path:${path},redirectTo:'${this.redirectTo}')`;
        }
    }
}
const $RouteDefinition = {
    name: kernel.Protocol.resource.keyFor('route-definition'),
    isDefined(def) {
        return metadata.Metadata.hasOwn($RouteDefinition.name, def);
    },
    define(routeDefinition, customElementDefinition) {
        metadata.Metadata.define($RouteDefinition.name, routeDefinition, customElementDefinition);
    },
    get(customElementDefinition) {
        return $RouteDefinition.isDefined(customElementDefinition)
            ? metadata.Metadata.getOwn($RouteDefinition.name, customElementDefinition)
            : null;
    },
};

const componentAgentLookup = new WeakMap();
class ComponentAgent {
    constructor(instance, controller, definition, routeNode, ctx) {
        var _a, _b, _c, _d;
        this.instance = instance;
        this.controller = controller;
        this.definition = definition;
        this.routeNode = routeNode;
        this.ctx = ctx;
        this._logger = ctx.container.get(kernel.ILogger).scopeTo(`ComponentAgent<${ctx.friendlyPath}>`);
        this._logger.trace(`constructor()`);
        const lifecycleHooks = controller.lifecycleHooks;
        this.canLoadHooks = ((_a = lifecycleHooks.canLoad) !== null && _a !== void 0 ? _a : []).map(x => x.instance);
        this.loadHooks = ((_b = lifecycleHooks.load) !== null && _b !== void 0 ? _b : []).map(x => x.instance);
        this.canUnloadHooks = ((_c = lifecycleHooks.canUnload) !== null && _c !== void 0 ? _c : []).map(x => x.instance);
        this.unloadHooks = ((_d = lifecycleHooks.unload) !== null && _d !== void 0 ? _d : []).map(x => x.instance);
        this._hasCanLoad = 'canLoad' in instance;
        this._hasLoad = 'load' in instance;
        this._hasCanUnload = 'canUnload' in instance;
        this._hasUnload = 'unload' in instance;
    }
    static for(componentInstance, hostController, routeNode, ctx) {
        let componentAgent = componentAgentLookup.get(componentInstance);
        if (componentAgent === void 0) {
            const container = ctx.container;
            const definition = RouteDefinition.resolve(componentInstance.constructor, ctx.definition);
            const controller = runtimeHtml.Controller.$el(container, componentInstance, hostController.host, null);
            componentAgentLookup.set(componentInstance, componentAgent = new ComponentAgent(componentInstance, controller, definition, routeNode, ctx));
        }
        return componentAgent;
    }
    activate(initiator, parent, flags) {
        if (initiator === null) {
            this._logger.trace(`activate() - initial`);
            return this.controller.activate(this.controller, parent, flags);
        }
        this._logger.trace(`activate()`);
        void this.controller.activate(initiator, parent, flags);
    }
    deactivate(initiator, parent, flags) {
        if (initiator === null) {
            this._logger.trace(`deactivate() - initial`);
            return this.controller.deactivate(this.controller, parent, flags);
        }
        this._logger.trace(`deactivate()`);
        void this.controller.deactivate(initiator, parent, flags);
    }
    dispose() {
        this._logger.trace(`dispose()`);
        this.controller.dispose();
    }
    canUnload(tr, next, b) {
        this._logger.trace(`canUnload(next:%s) - invoking ${this.canUnloadHooks.length} hooks`, next);
        b.push();
        for (const hook of this.canUnloadHooks) {
            tr.run(() => {
                b.push();
                return hook.canUnload(this.instance, next, this.routeNode);
            }, ret => {
                if (tr.guardsResult === true && ret !== true) {
                    tr.guardsResult = false;
                }
                b.pop();
            });
        }
        if (this._hasCanUnload) {
            tr.run(() => {
                b.push();
                return this.instance.canUnload(next, this.routeNode);
            }, ret => {
                if (tr.guardsResult === true && ret !== true) {
                    tr.guardsResult = false;
                }
                b.pop();
            });
        }
        b.pop();
    }
    canLoad(tr, next, b) {
        this._logger.trace(`canLoad(next:%s) - invoking ${this.canLoadHooks.length} hooks`, next);
        b.push();
        for (const hook of this.canLoadHooks) {
            tr.run(() => {
                b.push();
                return hook.canLoad(this.instance, next.params, next, this.routeNode);
            }, ret => {
                if (tr.guardsResult === true && ret !== true) {
                    tr.guardsResult = ret === false ? false : ViewportInstructionTree.create(ret);
                }
                b.pop();
            });
        }
        if (this._hasCanLoad) {
            tr.run(() => {
                b.push();
                return this.instance.canLoad(next.params, next, this.routeNode);
            }, ret => {
                if (tr.guardsResult === true && ret !== true) {
                    tr.guardsResult = ret === false ? false : ViewportInstructionTree.create(ret);
                }
                b.pop();
            });
        }
        b.pop();
    }
    unload(tr, next, b) {
        this._logger.trace(`unload(next:%s) - invoking ${this.unloadHooks.length} hooks`, next);
        b.push();
        for (const hook of this.unloadHooks) {
            tr.run(() => {
                b.push();
                return hook.unload(this.instance, next, this.routeNode);
            }, () => {
                b.pop();
            });
        }
        if (this._hasUnload) {
            tr.run(() => {
                b.push();
                return this.instance.unload(next, this.routeNode);
            }, () => {
                b.pop();
            });
        }
        b.pop();
    }
    load(tr, next, b) {
        this._logger.trace(`load(next:%s) - invoking ${this.loadHooks.length} hooks`, next);
        b.push();
        for (const hook of this.loadHooks) {
            tr.run(() => {
                b.push();
                return hook.load(this.instance, next.params, next, this.routeNode);
            }, () => {
                b.pop();
            });
        }
        if (this._hasLoad) {
            tr.run(() => {
                b.push();
                return this.instance.load(next.params, next, this.routeNode);
            }, () => {
                b.pop();
            });
        }
        b.pop();
    }
    toString() {
        return `CA(ctx:'${this.ctx.friendlyPath}',c:'${this.definition.component.name}')`;
    }
}

const IRouteContext = kernel.DI.createInterface('IRouteContext');
const RESIDUE = 'au$residue';
class RouteContext {
    constructor(viewportAgent, parent, component, definition, parentContainer) {
        var _a;
        this.parent = parent;
        this.component = component;
        this.definition = definition;
        this.parentContainer = parentContainer;
        this.childViewportAgents = [];
        this.childRoutes = [];
        this._resolved = null;
        this._allResolved = null;
        this.prevNode = null;
        this._node = null;
        this._vpa = null;
        this._vpa = viewportAgent;
        if (parent === null) {
            this.root = this;
            this.path = [this];
            this.friendlyPath = component.name;
        }
        else {
            this.root = parent.root;
            this.path = [...parent.path, this];
            this.friendlyPath = `${parent.friendlyPath}/${component.name}`;
        }
        this.logger = parentContainer.get(kernel.ILogger).scopeTo(`RouteContext<${this.friendlyPath}>`);
        this.logger.trace('constructor()');
        this.moduleLoader = parentContainer.get(kernel.IModuleLoader);
        const container = this.container = parentContainer.createChild();
        container.registerResolver(runtimeHtml.IController, this.hostControllerProvider = new kernel.InstanceProvider(), true);
        container.registerResolver(IRouteContext, new kernel.InstanceProvider('IRouteContext', this));
        container.register(definition);
        container.register(...component.dependencies);
        this.recognizer = new routeRecognizer.RouteRecognizer();
        const promises = [];
        const allPromises = [];
        for (const child of definition.config.routes) {
            if (child instanceof Promise) {
                const p = this.addRoute(child);
                promises.push(p);
                allPromises.push(p);
            }
            else {
                const routeDef = RouteDefinition.resolve(child, definition, this);
                if (routeDef instanceof Promise) {
                    if (isPartialChildRouteConfig(child) && child.path != null) {
                        for (const path of ensureArrayOfStrings(child.path)) {
                            this.$addRoute(path, (_a = child.caseSensitive) !== null && _a !== void 0 ? _a : false, routeDef);
                        }
                        const idx = this.childRoutes.length;
                        const p = routeDef.then(resolvedRouteDef => {
                            return this.childRoutes[idx] = resolvedRouteDef;
                        });
                        this.childRoutes.push(p);
                        allPromises.push(p.then(kernel.noop));
                    }
                    else {
                        throw new Error(`Invalid route config. When the component property is a lazy import, the path must be specified.`);
                    }
                }
                else {
                    for (const path of routeDef.path) {
                        this.$addRoute(path, routeDef.caseSensitive, routeDef);
                    }
                    this.childRoutes.push(routeDef);
                }
            }
        }
        if (promises.length > 0) {
            this._resolved = Promise.all(promises).then(() => {
                this._resolved = null;
            });
        }
        if (allPromises.length > 0) {
            this._allResolved = Promise.all(allPromises).then(() => {
                this._allResolved = null;
            });
        }
    }
    get id() {
        return this.container.id;
    }
    get isRoot() {
        return this.parent === null;
    }
    get depth() {
        return this.path.length - 1;
    }
    get resolved() {
        return this._resolved;
    }
    get allResolved() {
        return this._allResolved;
    }
    get node() {
        const node = this._node;
        if (node === null) {
            throw new Error(`Invariant violation: RouteNode should be set immediately after the RouteContext is created. Context: ${this}`);
        }
        return node;
    }
    set node(value) {
        const prev = this.prevNode = this._node;
        if (prev !== value) {
            this._node = value;
            this.logger.trace(`Node changed from %s to %s`, this.prevNode, value);
        }
    }
    get vpa() {
        const vpa = this._vpa;
        if (vpa === null) {
            throw new Error(`RouteContext has no ViewportAgent: ${this}`);
        }
        return vpa;
    }
    set vpa(value) {
        if (value === null || value === void 0) {
            throw new Error(`Cannot set ViewportAgent to ${value} for RouteContext: ${this}`);
        }
        const prev = this._vpa;
        if (prev !== value) {
            this._vpa = value;
            this.logger.trace(`ViewportAgent changed from %s to %s`, prev, value);
        }
    }
    static setRoot(container) {
        const logger = container.get(kernel.ILogger).scopeTo('RouteContext');
        if (!container.has(runtimeHtml.IAppRoot, true)) {
            logAndThrow(new Error(`The provided container has no registered IAppRoot. RouteContext.setRoot can only be used after Aurelia.app was called, on a container that is within that app's component tree.`), logger);
        }
        if (container.has(IRouteContext, true)) {
            logAndThrow(new Error(`A root RouteContext is already registered. A possible cause is the RouterConfiguration being registered more than once in the same container tree. If you have a multi-rooted app, make sure you register RouterConfiguration only in the "forked" containers and not in the common root.`), logger);
        }
        const { controller } = container.get(runtimeHtml.IAppRoot);
        if (controller === void 0) {
            logAndThrow(new Error(`The provided IAppRoot does not (yet) have a controller. A possible cause is calling this API manually before Aurelia.start() is called`), logger);
        }
        const router = container.get(IRouter);
        const routeContext = router.getRouteContext(null, controller.definition, controller.container, null);
        container.register(kernel.Registration.instance(IRouteContext, routeContext));
        routeContext.node = router.routeTree.root;
    }
    static resolve(root, context) {
        const rootContainer = root.container;
        const logger = rootContainer.get(kernel.ILogger).scopeTo('RouteContext');
        if (context === null || context === void 0) {
            logger.trace(`resolve(context:%s) - returning root RouteContext`, context);
            return root;
        }
        if (isRouteContext(context)) {
            logger.trace(`resolve(context:%s) - returning provided RouteContext`, context);
            return context;
        }
        if (context instanceof rootContainer.get(runtimeHtml.IPlatform).Node) {
            try {
                const controller = runtimeHtml.CustomElement.for(context, { searchParents: true });
                logger.trace(`resolve(context:Node(nodeName:'${context.nodeName}'),controller:'${controller.definition.name}') - resolving RouteContext from controller's RenderContext`);
                return controller.container.get(IRouteContext);
            }
            catch (err) {
                logger.error(`Failed to resolve RouteContext from Node(nodeName:'${context.nodeName}')`, err);
                throw err;
            }
        }
        if (runtimeHtml.isCustomElementViewModel(context)) {
            const controller = context.$controller;
            logger.trace(`resolve(context:CustomElementViewModel(name:'${controller.definition.name}')) - resolving RouteContext from controller's RenderContext`);
            return controller.container.get(IRouteContext);
        }
        if (runtimeHtml.isCustomElementController(context)) {
            const controller = context;
            logger.trace(`resolve(context:CustomElementController(name:'${controller.definition.name}')) - resolving RouteContext from controller's RenderContext`);
            return controller.container.get(IRouteContext);
        }
        logAndThrow(new Error(`Invalid context type: ${Object.prototype.toString.call(context)}`), logger);
    }
    dispose() {
        this.container.dispose();
    }
    resolveViewportAgent(req) {
        this.logger.trace(`resolveViewportAgent(req:%s)`, req);
        const agent = this.childViewportAgents.find(x => { return x.handles(req); });
        if (agent === void 0) {
            throw new Error(`Failed to resolve ${req} at:\n${this.printTree()}`);
        }
        return agent;
    }
    getAvailableViewportAgents(resolution) {
        return this.childViewportAgents.filter(x => x.isAvailable(resolution));
    }
    getFallbackViewportAgent(resolution, name) {
        var _a;
        return (_a = this.childViewportAgents.find(x => x.isAvailable(resolution) && x.viewport.name === name && x.viewport.fallback.length > 0)) !== null && _a !== void 0 ? _a : null;
    }
    createComponentAgent(hostController, routeNode) {
        this.logger.trace(`createComponentAgent(routeNode:%s)`, routeNode);
        this.hostControllerProvider.prepare(hostController);
        const routeDefinition = RouteDefinition.resolve(routeNode.component, this.definition);
        const componentInstance = this.container.get(routeDefinition.component.key);
        const componentAgent = ComponentAgent.for(componentInstance, hostController, routeNode, this);
        this.hostControllerProvider.dispose();
        return componentAgent;
    }
    registerViewport(viewport) {
        const agent = ViewportAgent.for(viewport, this);
        if (this.childViewportAgents.includes(agent)) {
            this.logger.trace(`registerViewport(agent:%s) -> already registered, so skipping`, agent);
        }
        else {
            this.logger.trace(`registerViewport(agent:%s) -> adding`, agent);
            this.childViewportAgents.push(agent);
        }
        return agent;
    }
    unregisterViewport(viewport) {
        const agent = ViewportAgent.for(viewport, this);
        if (this.childViewportAgents.includes(agent)) {
            this.logger.trace(`unregisterViewport(agent:%s) -> unregistering`, agent);
            this.childViewportAgents.splice(this.childViewportAgents.indexOf(agent), 1);
        }
        else {
            this.logger.trace(`unregisterViewport(agent:%s) -> not registered, so skipping`, agent);
        }
    }
    recognize(path, searchAncestor = false) {
        var _a;
        this.logger.trace(`recognize(path:'${path}')`);
        let _current = this;
        let _continue = true;
        let result = null;
        while (_continue) {
            result = _current.recognizer.recognize(path);
            if (result === null) {
                if (!searchAncestor || _current.isRoot)
                    return null;
                _current = _current.parent;
            }
            else {
                _continue = false;
            }
        }
        let residue;
        if (Reflect.has(result.params, RESIDUE)) {
            residue = (_a = result.params[RESIDUE]) !== null && _a !== void 0 ? _a : null;
        }
        else {
            residue = null;
        }
        return new $RecognizedRoute(result, residue);
    }
    addRoute(routeable) {
        this.logger.trace(`addRoute(routeable:'${routeable}')`);
        return kernel.onResolve(RouteDefinition.resolve(routeable, this.definition, this), routeDef => {
            for (const path of routeDef.path) {
                this.$addRoute(path, routeDef.caseSensitive, routeDef);
            }
            this.childRoutes.push(routeDef);
        });
    }
    $addRoute(path, caseSensitive, handler) {
        this.recognizer.add({
            path,
            caseSensitive,
            handler,
        });
        this.recognizer.add({
            path: `${path}/*${RESIDUE}`,
            caseSensitive,
            handler,
        });
    }
    resolveLazy(promise) {
        return this.moduleLoader.load(promise, m => {
            let defaultExport = void 0;
            let firstNonDefaultExport = void 0;
            for (const item of m.items) {
                if (item.isConstructable) {
                    const def = item.definitions.find(isCustomElementDefinition);
                    if (def !== void 0) {
                        if (item.key === 'default') {
                            defaultExport = def;
                        }
                        else if (firstNonDefaultExport === void 0) {
                            firstNonDefaultExport = def;
                        }
                    }
                }
            }
            if (defaultExport === void 0) {
                if (firstNonDefaultExport === void 0) {
                    throw new Error(`${promise} does not appear to be a component or CustomElement recognizable by Aurelia`);
                }
                return firstNonDefaultExport;
            }
            return defaultExport;
        });
    }
    toString() {
        const vpAgents = this.childViewportAgents;
        const viewports = vpAgents.map(String).join(',');
        return `RC(path:'${this.friendlyPath}',viewports:[${viewports}])`;
    }
    printTree() {
        const tree = [];
        for (let i = 0; i < this.path.length; ++i) {
            tree.push(`${' '.repeat(i)}${this.path[i]}`);
        }
        return tree.join('\n');
    }
}
function isRouteContext(value) {
    return value instanceof RouteContext;
}
function logAndThrow(err, logger) {
    logger.error(err);
    throw err;
}
function isCustomElementDefinition(value) {
    return runtimeHtml.CustomElement.isType(value.Type);
}
class $RecognizedRoute {
    constructor(route, residue) {
        this.route = route;
        this.residue = residue;
    }
    toString() {
        const route = this.route;
        const cr = route.endpoint.route;
        return `RR(route:(endpoint:(route:(path:${cr.path},handler:${cr.handler})),params:${JSON.stringify(route.params)}),residue:${this.residue})`;
    }
}

exports.ViewportCustomElement = class ViewportCustomElement {
    constructor(logger, ctx) {
        this.logger = logger;
        this.ctx = ctx;
        this.name = defaultViewportName;
        this.usedBy = '';
        this.default = '';
        this.fallback = '';
        this.stateful = false;
        this.agent = (void 0);
        this.controller = (void 0);
        this.logger = logger.scopeTo(`au-viewport<${ctx.friendlyPath}>`);
        this.logger.trace('constructor()');
    }
    hydrated(controller) {
        this.logger.trace('hydrated()');
        this.controller = controller;
        this.agent = this.ctx.registerViewport(this);
    }
    attaching(initiator, parent, flags) {
        this.logger.trace('attaching()');
        return this.agent.activateFromViewport(initiator, this.controller, flags);
    }
    detaching(initiator, parent, flags) {
        this.logger.trace('detaching()');
        return this.agent.deactivateFromViewport(initiator, this.controller, flags);
    }
    dispose() {
        this.logger.trace('dispose()');
        this.ctx.unregisterViewport(this);
        this.agent.dispose();
        this.agent = (void 0);
    }
    toString() {
        const propStrings = [];
        for (const prop of props) {
            const value = this[prop];
            switch (typeof value) {
                case 'string':
                    if (value !== '') {
                        propStrings.push(`${prop}:'${value}'`);
                    }
                    break;
                case 'boolean':
                    if (value) {
                        propStrings.push(`${prop}:${value}`);
                    }
                    break;
                default: {
                    propStrings.push(`${prop}:${String(value)}`);
                }
            }
        }
        return `VP(ctx:'${this.ctx.friendlyPath}',${propStrings.join(',')})`;
    }
};
__decorate([
    runtimeHtml.bindable
], exports.ViewportCustomElement.prototype, "name", void 0);
__decorate([
    runtimeHtml.bindable
], exports.ViewportCustomElement.prototype, "usedBy", void 0);
__decorate([
    runtimeHtml.bindable
], exports.ViewportCustomElement.prototype, "default", void 0);
__decorate([
    runtimeHtml.bindable
], exports.ViewportCustomElement.prototype, "fallback", void 0);
__decorate([
    runtimeHtml.bindable
], exports.ViewportCustomElement.prototype, "stateful", void 0);
exports.ViewportCustomElement = __decorate([
    runtimeHtml.customElement({ name: 'au-viewport' }),
    __param(0, kernel.ILogger),
    __param(1, IRouteContext)
], exports.ViewportCustomElement);
const props = [
    'name',
    'usedBy',
    'default',
    'fallback',
    'stateful',
];

exports.LoadCustomAttribute = class LoadCustomAttribute {
    constructor(target, el, router, events, delegator, ctx, locationMgr) {
        this.target = target;
        this.el = el;
        this.router = router;
        this.events = events;
        this.delegator = delegator;
        this.ctx = ctx;
        this.locationMgr = locationMgr;
        this.attribute = 'href';
        this.active = false;
        this.href = null;
        this.instructions = null;
        this.eventListener = null;
        this.navigationEndListener = null;
        this.onClick = (e) => {
            if (this.instructions === null) {
                return;
            }
            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) {
                return;
            }
            e.preventDefault();
            void this.router.load(this.instructions, { context: this.ctx });
        };
        this.isEnabled = !el.hasAttribute('external') && !el.hasAttribute('data-external');
    }
    binding() {
        if (this.isEnabled) {
            this.eventListener = this.delegator.addEventListener(this.target, this.el, 'click', this.onClick);
        }
        this.valueChanged();
        this.navigationEndListener = this.events.subscribe('au:router:navigation-end', _e => {
            this.valueChanged();
            this.active = this.instructions !== null && this.router.isActive(this.instructions, this.ctx);
        });
    }
    attaching() {
        if (this.ctx.allResolved !== null) {
            return this.ctx.allResolved.then(() => {
                this.valueChanged();
            });
        }
    }
    unbinding() {
        if (this.isEnabled) {
            this.eventListener.dispose();
        }
        this.navigationEndListener.dispose();
    }
    valueChanged() {
        const useHash = this.router.options.useUrlFragmentHash;
        if (this.route !== null && this.route !== void 0 && this.ctx.allResolved === null) {
            const def = this.ctx.childRoutes.find(x => x.id === this.route);
            if (def !== void 0) {
                const parentPath = this.ctx.node.computeAbsolutePath();
                let path = def.path[0];
                if (typeof this.params === 'object' && this.params !== null) {
                    const keys = Object.keys(this.params);
                    for (const key of keys) {
                        const value = this.params[key];
                        if (value != null && String(value).length > 0) {
                            path = path.replace(new RegExp(`[*:]${key}[?]?`), value);
                        }
                    }
                }
                path = path.replace(/\/[*:][^/]+[?]/g, '').replace(/[*:][^/]+[?]\//g, '');
                if (parentPath) {
                    if (path) {
                        this.href = `${useHash ? '#' : ''}${[parentPath, path].join('/')}`;
                    }
                    else {
                        this.href = `${useHash ? '#' : ''}${parentPath}`;
                    }
                }
                else {
                    this.href = `${useHash ? '#' : ''}${path}`;
                }
                this.instructions = this.router.createViewportInstructions(`${useHash ? '#' : ''}${path}`, { context: this.ctx });
            }
            else {
                if (typeof this.params === 'object' && this.params !== null) {
                    this.instructions = this.router.createViewportInstructions({ component: this.route, params: this.params }, { context: this.ctx });
                }
                else {
                    this.instructions = this.router.createViewportInstructions(this.route, { context: this.ctx });
                }
                this.href = this.instructions.toUrl(this.router.options.useUrlFragmentHash);
            }
        }
        else {
            this.instructions = null;
            this.href = null;
        }
        const controller = runtimeHtml.CustomElement.for(this.el, { optional: true });
        if (controller !== null) {
            controller.viewModel[this.attribute] = this.instructions;
        }
        else {
            if (this.href === null) {
                this.el.removeAttribute(this.attribute);
            }
            else {
                const value = useHash ? this.href : this.locationMgr.addBaseHref(this.href);
                this.el.setAttribute(this.attribute, value);
            }
        }
    }
};
__decorate([
    runtimeHtml.bindable({ mode: runtime.BindingMode.toView, primary: true, callback: 'valueChanged' })
], exports.LoadCustomAttribute.prototype, "route", void 0);
__decorate([
    runtimeHtml.bindable({ mode: runtime.BindingMode.toView, callback: 'valueChanged' })
], exports.LoadCustomAttribute.prototype, "params", void 0);
__decorate([
    runtimeHtml.bindable({ mode: runtime.BindingMode.toView })
], exports.LoadCustomAttribute.prototype, "attribute", void 0);
__decorate([
    runtimeHtml.bindable({ mode: runtime.BindingMode.fromView })
], exports.LoadCustomAttribute.prototype, "active", void 0);
exports.LoadCustomAttribute = __decorate([
    runtimeHtml.customAttribute('load'),
    __param(0, runtimeHtml.IEventTarget),
    __param(1, runtimeHtml.INode),
    __param(2, IRouter),
    __param(3, IRouterEvents),
    __param(4, runtimeHtml.IEventDelegator),
    __param(5, IRouteContext),
    __param(6, ILocationManager)
], exports.LoadCustomAttribute);

exports.HrefCustomAttribute = class HrefCustomAttribute {
    constructor(target, el, router, delegator, ctx, w) {
        this.target = target;
        this.el = el;
        this.router = router;
        this.delegator = delegator;
        this.ctx = ctx;
        this.isInitialized = false;
        if (router.options.useHref &&
            el.nodeName === 'A') {
            switch (el.getAttribute('target')) {
                case null:
                case w.name:
                case '_self':
                    this.isEnabled = true;
                    break;
                default:
                    this.isEnabled = false;
                    break;
            }
        }
        else {
            this.isEnabled = false;
        }
    }
    get isExternal() {
        return this.el.hasAttribute('external') || this.el.hasAttribute('data-external');
    }
    binding() {
        if (!this.isInitialized) {
            this.isInitialized = true;
            this.isEnabled = this.isEnabled && runtimeHtml.getRef(this.el, runtimeHtml.CustomAttribute.getDefinition(exports.LoadCustomAttribute).key) === null;
        }
        if (this.value == null) {
            this.el.removeAttribute('href');
        }
        else {
            this.el.setAttribute('href', this.value);
        }
        this.eventListener = this.delegator.addEventListener(this.target, this.el, 'click', this);
    }
    unbinding() {
        this.eventListener.dispose();
    }
    valueChanged(newValue) {
        if (newValue == null) {
            this.el.removeAttribute('href');
        }
        else {
            this.el.setAttribute('href', newValue);
        }
    }
    handleEvent(e) {
        this._onClick(e);
    }
    _onClick(e) {
        if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0
            || this.isExternal
            || !this.isEnabled) {
            return;
        }
        const href = this.el.getAttribute('href');
        if (href !== null) {
            e.preventDefault();
            void this.router.load(href, { context: this.ctx });
        }
    }
};
__decorate([
    runtimeHtml.bindable({ mode: runtime.BindingMode.toView })
], exports.HrefCustomAttribute.prototype, "value", void 0);
exports.HrefCustomAttribute = __decorate([
    runtimeHtml.customAttribute({ name: 'href', noMultiBindings: true }),
    __param(0, runtimeHtml.IEventTarget),
    __param(1, runtimeHtml.INode),
    __param(2, IRouter),
    __param(3, runtimeHtml.IEventDelegator),
    __param(4, IRouteContext),
    __param(5, runtimeHtml.IWindow)
], exports.HrefCustomAttribute);

const RouterRegistration = IRouter;
const DefaultComponents = [
    RouterRegistration,
];
const ViewportCustomElementRegistration = exports.ViewportCustomElement;
const LoadCustomAttributeRegistration = exports.LoadCustomAttribute;
const HrefCustomAttributeRegistration = exports.HrefCustomAttribute;
const DefaultResources = [
    exports.ViewportCustomElement,
    exports.LoadCustomAttribute,
    exports.HrefCustomAttribute,
];
function configure(container, config) {
    return container.register(runtimeHtml.AppTask.hydrated(kernel.IContainer, RouteContext.setRoot), runtimeHtml.AppTask.afterActivate(IRouter, router => {
        if (metadata.isObject(config)) {
            if (typeof config === 'function') {
                return config(router);
            }
            else {
                return router.start(config, true);
            }
        }
        return router.start({}, true);
    }), runtimeHtml.AppTask.afterDeactivate(IRouter, router => {
        router.stop();
    }), ...DefaultComponents, ...DefaultResources);
}
const RouterConfiguration = {
    register(container) {
        return configure(container);
    },
    customize(config) {
        return {
            register(container) {
                return configure(container, config);
            },
        };
    },
};

class ScrollState {
    constructor(el) {
        this.el = el;
        this.top = el.scrollTop;
        this.left = el.scrollLeft;
    }
    static has(el) {
        return el.scrollTop > 0 || el.scrollLeft > 0;
    }
    restore() {
        this.el.scrollTo(this.left, this.top);
        this.el = null;
    }
}
function restoreState(state) {
    state.restore();
}
class HostElementState {
    constructor(host) {
        this.scrollStates = [];
        this.save(host.children);
    }
    save(elements) {
        let el;
        for (let i = 0, ii = elements.length; i < ii; ++i) {
            el = elements[i];
            if (ScrollState.has(el)) {
                this.scrollStates.push(new ScrollState(el));
            }
            this.save(el.children);
        }
    }
    restore() {
        this.scrollStates.forEach(restoreState);
        this.scrollStates = null;
    }
}
const IStateManager = kernel.DI.createInterface('IStateManager', x => x.singleton(ScrollStateManager));
class ScrollStateManager {
    constructor() {
        this.cache = new WeakMap();
    }
    saveState(controller) {
        this.cache.set(controller.host, new HostElementState(controller.host));
    }
    restoreState(controller) {
        const state = this.cache.get(controller.host);
        if (state !== void 0) {
            state.restore();
            this.cache.delete(controller.host);
        }
    }
}

exports.AST = AST;
exports.ActionExpression = ActionExpression;
exports.AuNavId = AuNavId;
exports.ComponentAgent = ComponentAgent;
exports.ComponentExpression = ComponentExpression;
exports.CompositeSegmentExpression = CompositeSegmentExpression;
exports.DefaultComponents = DefaultComponents;
exports.DefaultResources = DefaultResources;
exports.HrefCustomAttributeRegistration = HrefCustomAttributeRegistration;
exports.IBaseHrefProvider = IBaseHrefProvider;
exports.ILocationManager = ILocationManager;
exports.IRouteContext = IRouteContext;
exports.IRouter = IRouter;
exports.IRouterEvents = IRouterEvents;
exports.IStateManager = IStateManager;
exports.IViewportInstruction = IViewportInstruction;
exports.LoadCustomAttributeRegistration = LoadCustomAttributeRegistration;
exports.LocationChangeEvent = LocationChangeEvent;
exports.Navigation = Navigation;
exports.NavigationCancelEvent = NavigationCancelEvent;
exports.NavigationEndEvent = NavigationEndEvent;
exports.NavigationErrorEvent = NavigationErrorEvent;
exports.NavigationOptions = NavigationOptions;
exports.NavigationStartEvent = NavigationStartEvent;
exports.ParameterExpression = ParameterExpression;
exports.ParameterListExpression = ParameterListExpression;
exports.Route = Route;
exports.RouteConfig = RouteConfig;
exports.RouteContext = RouteContext;
exports.RouteDefinition = RouteDefinition;
exports.RouteExpression = RouteExpression;
exports.RouteNode = RouteNode;
exports.RouteTree = RouteTree;
exports.RouterConfiguration = RouterConfiguration;
exports.RouterOptions = RouterOptions;
exports.RouterRegistration = RouterRegistration;
exports.ScopedSegmentExpression = ScopedSegmentExpression;
exports.SegmentExpression = SegmentExpression;
exports.SegmentGroupExpression = SegmentGroupExpression;
exports.Transition = Transition;
exports.ViewportAgent = ViewportAgent;
exports.ViewportCustomElementRegistration = ViewportCustomElementRegistration;
exports.ViewportExpression = ViewportExpression;
exports.isManagedState = isManagedState;
exports.route = route;
exports.toManagedState = toManagedState;
//# sourceMappingURL=index.dev.cjs.map
