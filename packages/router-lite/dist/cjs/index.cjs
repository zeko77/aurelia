"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/metadata");

var i = require("@aurelia/kernel");

var e = require("@aurelia/runtime-html");

var s = require("@aurelia/route-recognizer");

var n = require("@aurelia/runtime");

class Batch {
    constructor(t, i, e) {
        this.stack = t;
        this.cb = i;
        this.done = false;
        this.next = null;
        this.head = null !== e && void 0 !== e ? e : this;
    }
    static start(t) {
        return new Batch(0, t, null);
    }
    push() {
        let t = this;
        do {
            ++t.stack;
            t = t.next;
        } while (null !== t);
    }
    pop() {
        let t = this;
        do {
            if (0 === --t.stack) t.invoke();
            t = t.next;
        } while (null !== t);
    }
    invoke() {
        const t = this.cb;
        if (null !== t) {
            this.cb = null;
            t(this);
            this.done = true;
        }
    }
    continueWith(t) {
        if (null === this.next) return this.next = new Batch(this.stack, t, this.head); else return this.next.continueWith(t);
    }
    start() {
        this.head.push();
        this.head.pop();
        return this;
    }
}

function o(t, i) {
    t = t.slice();
    i = i.slice();
    const e = [];
    while (t.length > 0) {
        const s = t.shift();
        if (e.every((t => t.context.vpa !== s.context.vpa))) {
            const t = i.findIndex((t => t.context.vpa === s.context.vpa));
            if (t >= 0) e.push(...i.splice(0, t + 1)); else e.push(s);
        }
    }
    e.push(...i);
    return e;
}

function r(t) {
    try {
        return JSON.stringify(t);
    } catch (i) {
        return Object.prototype.toString.call(t);
    }
}

function h(t) {
    return "string" === typeof t ? [ t ] : t;
}

function a(t) {
    return "string" === typeof t ? t : t[0];
}

function u(t) {
    return "object" === typeof t && null !== t && !e.isCustomElementViewModel(t);
}

function c(t) {
    return u(t) && true === Object.prototype.hasOwnProperty.call(t, "name");
}

function l(t) {
    return u(t) && true === Object.prototype.hasOwnProperty.call(t, "component");
}

function d(t) {
    return u(t) && true === Object.prototype.hasOwnProperty.call(t, "redirectTo");
}

function f(t) {
    return u(t) && true === Object.prototype.hasOwnProperty.call(t, "component");
}

function p(t, i, e) {
    throw new Error(`Invalid route config property: "${i}". Expected ${t}, but got ${r(e)}.`);
}

function v(t, i) {
    if (null === t || void 0 === t) throw new Error(`Invalid route config: expected an object or string, but got: ${String(t)}.`);
    const e = Object.keys(t);
    for (const s of e) {
        const e = t[s];
        const n = [ i, s ].join(".");
        switch (s) {
          case "id":
          case "viewport":
          case "redirectTo":
          case "fallback":
            if ("string" !== typeof e) p("string", n, e);
            break;

          case "caseSensitive":
          case "nav":
            if ("boolean" !== typeof e) p("boolean", n, e);
            break;

          case "data":
            if ("object" !== typeof e || null === e) p("object", n, e);
            break;

          case "title":
            switch (typeof e) {
              case "string":
              case "function":
                break;

              default:
                p("string or function", n, e);
            }
            break;

          case "path":
            if (e instanceof Array) {
                for (let t = 0; t < e.length; ++t) if ("string" !== typeof e[t]) p("string", `${n}[${t}]`, e[t]);
            } else if ("string" !== typeof e) p("string or Array of strings", n, e);
            break;

          case "component":
            w(e, n);
            break;

          case "routes":
            if (!(e instanceof Array)) p("Array", n, e);
            for (const t of e) {
                const i = `${n}[${e.indexOf(t)}]`;
                w(t, i);
            }
            break;

          case "transitionPlan":
            switch (typeof e) {
              case "string":
                switch (e) {
                  case "none":
                  case "replace":
                  case "invoke-lifecycles":
                    break;

                  default:
                    p("string('none'|'replace'|'invoke-lifecycles') or function", n, e);
                }
                break;

              case "function":
                break;

              default:
                p("string('none'|'replace'|'invoke-lifecycles') or function", n, e);
            }
            break;

          default:
            throw new Error(`Unknown route config property: "${i}.${s}". Please specify known properties only.`);
        }
    }
}

function g(t, i) {
    if (null === t || void 0 === t) throw new Error(`Invalid route config: expected an object or string, but got: ${String(t)}.`);
    const e = Object.keys(t);
    for (const s of e) {
        const e = t[s];
        const n = [ i, s ].join(".");
        switch (s) {
          case "path":
          case "redirectTo":
            if ("string" !== typeof e) p("string", n, e);
            break;

          default:
            throw new Error(`Unknown redirect config property: "${i}.${s}". Only 'path' and 'redirectTo' should be specified for redirects.`);
        }
    }
}

function w(t, i) {
    switch (typeof t) {
      case "function":
        break;

      case "object":
        if (t instanceof Promise) break;
        if (d(t)) {
            g(t, i);
            break;
        }
        if (l(t)) {
            v(t, i);
            break;
        }
        if (!e.isCustomElementViewModel(t) && !c(t)) p(`an object with at least a 'component' property (see Routeable)`, i, t);
        break;

      case "string":
        break;

      default:
        p("function, object or string (see Routeable)", i, t);
    }
}

function m(t, i) {
    if (t === i) return true;
    if (typeof t !== typeof i) return false;
    if (null === t || null === i) return false;
    if (Object.getPrototypeOf(t) !== Object.getPrototypeOf(i)) return false;
    const e = Object.keys(t);
    const s = Object.keys(i);
    if (e.length !== s.length) return false;
    for (let n = 0, o = e.length; n < o; ++n) {
        const o = e[n];
        if (o !== s[n]) return false;
        if (t[o] !== i[o]) return false;
    }
    return true;
}

function x(t, i, e, s) {
    var n = arguments.length, o = n < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) o = Reflect.decorate(t, i, e, s); else for (var h = t.length - 1; h >= 0; h--) if (r = t[h]) o = (n < 3 ? r(o) : n > 3 ? r(i, e, o) : r(i, e)) || o;
    return n > 3 && o && Object.defineProperty(i, e, o), o;
}

function $(t, i) {
    return function(e, s) {
        i(e, s, t);
    };
}

class Subscription {
    constructor(t, i, e) {
        this.events = t;
        this.serial = i;
        this.inner = e;
        this.disposed = false;
    }
    dispose() {
        if (!this.disposed) {
            this.disposed = true;
            this.inner.dispose();
            const t = this.events["subscriptions"];
            t.splice(t.indexOf(this), 1);
        }
    }
}

const E = i.DI.createInterface("IRouterEvents", (t => t.singleton(y)));

let y = class RouterEvents {
    constructor(t, i) {
        this.ea = t;
        this.logger = i;
        this.subscriptionSerial = 0;
        this.subscriptions = [];
        this.logger = i.scopeTo("RouterEvents");
    }
    publish(t) {
        this.logger.trace(`publishing %s`, t);
        this.ea.publish(t.name, t);
    }
    subscribe(t, i) {
        const e = new Subscription(this, ++this.subscriptionSerial, this.ea.subscribe(t, (s => {
            this.logger.trace(`handling %s for subscription #${e.serial}`, t);
            i(s);
        })));
        this.subscriptions.push(e);
        return e;
    }
};

y = x([ $(0, i.IEventAggregator), $(1, i.ILogger) ], y);

class LocationChangeEvent {
    constructor(t, i, e, s) {
        this.id = t;
        this.url = i;
        this.trigger = e;
        this.state = s;
    }
    get name() {
        return "au:router:location-change";
    }
    toString() {
        return `LocationChangeEvent(id:${this.id},url:'${this.url}',trigger:'${this.trigger}')`;
    }
}

class NavigationStartEvent {
    constructor(t, i, e, s) {
        this.id = t;
        this.instructions = i;
        this.trigger = e;
        this.managedState = s;
    }
    get name() {
        return "au:router:navigation-start";
    }
    toString() {
        return `NavigationStartEvent(id:${this.id},instructions:'${this.instructions}',trigger:'${this.trigger}')`;
    }
}

class NavigationEndEvent {
    constructor(t, i, e) {
        this.id = t;
        this.instructions = i;
        this.finalInstructions = e;
    }
    get name() {
        return "au:router:navigation-end";
    }
    toString() {
        return `NavigationEndEvent(id:${this.id},instructions:'${this.instructions}',finalInstructions:'${this.finalInstructions}')`;
    }
}

class NavigationCancelEvent {
    constructor(t, i, e) {
        this.id = t;
        this.instructions = i;
        this.reason = e;
    }
    get name() {
        return "au:router:navigation-cancel";
    }
    toString() {
        return `NavigationCancelEvent(id:${this.id},instructions:'${this.instructions}',reason:${String(this.reason)})`;
    }
}

class NavigationErrorEvent {
    constructor(t, i, e) {
        this.id = t;
        this.instructions = i;
        this.error = e;
    }
    get name() {
        return "au:router:navigation-error";
    }
    toString() {
        return `NavigationErrorEvent(id:${this.id},instructions:'${this.instructions}',error:${String(this.error)})`;
    }
}

const R = i.DI.createInterface("IBaseHref");

const b = i.DI.createInterface("ILocationManager", (t => t.singleton(S)));

let S = class BrowserLocationManager {
    constructor(t, i, e, s, n, o) {
        this.logger = t;
        this.events = i;
        this.history = e;
        this.location = s;
        this.window = n;
        this.baseHref = o;
        this.eventId = 0;
        t = this.logger = t.root.scopeTo("LocationManager");
        t.debug(`baseHref set to path: ${o.href}`);
    }
    startListening() {
        this.logger.trace(`startListening()`);
        this.window.addEventListener("popstate", this.onPopState, false);
        this.window.addEventListener("hashchange", this.onHashChange, false);
    }
    stopListening() {
        this.logger.trace(`stopListening()`);
        this.window.removeEventListener("popstate", this.onPopState, false);
        this.window.removeEventListener("hashchange", this.onHashChange, false);
    }
    onPopState(t) {
        this.logger.trace(`onPopState()`);
        this.events.publish(new LocationChangeEvent(++this.eventId, this.getPath(), "popstate", t.state));
    }
    onHashChange(t) {
        this.logger.trace(`onHashChange()`);
        this.events.publish(new LocationChangeEvent(++this.eventId, this.getPath(), "hashchange", null));
    }
    pushState(t, i, e) {
        e = this.addBaseHref(e);
        try {
            const s = JSON.stringify(t);
            this.logger.trace(`pushState(state:${s},title:'${i}',url:'${e}')`);
        } catch (t) {
            this.logger.warn(`pushState(state:NOT_SERIALIZABLE,title:'${i}',url:'${e}')`);
        }
        this.history.pushState(t, i, e);
    }
    replaceState(t, i, e) {
        e = this.addBaseHref(e);
        try {
            const s = JSON.stringify(t);
            this.logger.trace(`replaceState(state:${s},title:'${i}',url:'${e}')`);
        } catch (t) {
            this.logger.warn(`replaceState(state:NOT_SERIALIZABLE,title:'${i}',url:'${e}')`);
        }
        this.history.replaceState(t, i, e);
    }
    getPath() {
        const {pathname: t, search: i, hash: e} = this.location;
        const s = this.removeBaseHref(`${t}${C(i)}${e}`);
        this.logger.trace(`getPath() -> '${s}'`);
        return s;
    }
    currentPathEquals(t) {
        const i = this.getPath() === this.removeBaseHref(t);
        this.logger.trace(`currentPathEquals(path:'${t}') -> ${i}`);
        return i;
    }
    addBaseHref(t) {
        const i = t;
        let e;
        let s = this.baseHref.href;
        if (s.endsWith("/")) s = s.slice(0, -1);
        if (0 === s.length) e = t; else {
            if (t.startsWith("/")) t = t.slice(1);
            e = `${s}/${t}`;
        }
        this.logger.trace(`addBaseHref(path:'${i}') -> '${e}'`);
        return e;
    }
    removeBaseHref(t) {
        const i = t;
        const e = this.baseHref.pathname;
        if (t.startsWith(e)) t = t.slice(e.length);
        t = k(t);
        this.logger.trace(`removeBaseHref(path:'${i}') -> '${t}'`);
        return t;
    }
};

x([ i.bound ], S.prototype, "onPopState", null);

x([ i.bound ], S.prototype, "onHashChange", null);

S = x([ $(0, i.ILogger), $(1, E), $(2, e.IHistory), $(3, e.ILocation), $(4, e.IWindow), $(5, R) ], S);

function k(t) {
    let i;
    let e;
    let s;
    if ((s = t.indexOf("?")) >= 0 || (s = t.indexOf("#")) >= 0) {
        i = t.slice(0, s);
        e = t.slice(s);
    } else {
        i = t;
        e = "";
    }
    if (i.endsWith("/")) i = i.slice(0, -1); else if (i.endsWith("/index.html")) i = i.slice(0, -11);
    return `${i}${e}`;
}

function C(t) {
    return t.length > 0 && !t.startsWith("?") ? `?${t}` : t;
}

const I = [ "?", "#", "/", "+", "(", ")", ".", "@", "!", "=", ",", "&", "'", "~", ";" ];

class ParserState {
    constructor(t) {
        this.input = t;
        this.buffers = [];
        this.bufferIndex = 0;
        this.index = 0;
        this.rest = t;
    }
    get done() {
        return 0 === this.rest.length;
    }
    startsWith(...t) {
        const i = this.rest;
        return t.some((function(t) {
            return i.startsWith(t);
        }));
    }
    consumeOptional(t) {
        if (this.startsWith(t)) {
            this.rest = this.rest.slice(t.length);
            this.index += t.length;
            this.append(t);
            return true;
        }
        return false;
    }
    consume(t) {
        if (!this.consumeOptional(t)) this.expect(`'${t}'`);
    }
    expect(t) {
        throw new Error(`Expected ${t} at index ${this.index} of '${this.input}', but got: '${this.rest}' (rest='${this.rest}')`);
    }
    ensureDone() {
        if (!this.done) throw new Error(`Unexpected '${this.rest}' at index ${this.index} of '${this.input}'`);
    }
    advance() {
        const t = this.rest[0];
        this.rest = this.rest.slice(1);
        ++this.index;
        this.append(t);
    }
    record() {
        this.buffers[this.bufferIndex++] = "";
    }
    playback() {
        const t = --this.bufferIndex;
        const i = this.buffers;
        const e = i[t];
        i[t] = "";
        return e;
    }
    discard() {
        this.buffers[--this.bufferIndex] = "";
    }
    append(t) {
        const i = this.bufferIndex;
        const e = this.buffers;
        for (let s = 0; s < i; ++s) e[s] += t;
    }
}

exports.ExpressionKind = void 0;

(function(t) {
    t[t["Route"] = 0] = "Route";
    t[t["CompositeSegment"] = 1] = "CompositeSegment";
    t[t["ScopedSegment"] = 2] = "ScopedSegment";
    t[t["SegmentGroup"] = 3] = "SegmentGroup";
    t[t["Segment"] = 4] = "Segment";
    t[t["Component"] = 5] = "Component";
    t[t["Action"] = 6] = "Action";
    t[t["Viewport"] = 7] = "Viewport";
    t[t["ParameterList"] = 8] = "ParameterList";
    t[t["Parameter"] = 9] = "Parameter";
})(exports.ExpressionKind || (exports.ExpressionKind = {}));

const N = new Map;

const A = new Map;

class RouteExpression {
    constructor(t, i, e, s, n, o) {
        this.raw = t;
        this.isAbsolute = i;
        this.root = e;
        this.queryParams = s;
        this.fragment = n;
        this.fragmentIsRoute = o;
    }
    get kind() {
        return 0;
    }
    static parse(t, i) {
        const e = i ? N : A;
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = RouteExpression.$parse(t, i));
        return s;
    }
    static $parse(t, i) {
        let e;
        const s = t.indexOf("#");
        if (s >= 0) {
            const n = t.slice(s + 1);
            e = decodeURIComponent(n);
            if (i) t = e; else t = t.slice(0, s);
        } else {
            if (i) t = "";
            e = null;
        }
        let n = null;
        const o = t.indexOf("?");
        if (o >= 0) {
            const i = t.slice(o + 1);
            t = t.slice(0, o);
            n = new URLSearchParams(i);
        }
        if ("" === t) return new RouteExpression("", false, SegmentExpression.EMPTY, null != n ? Object.freeze(n) : J, e, i);
        const r = new ParserState(t);
        r.record();
        const h = r.consumeOptional("/");
        const a = CompositeSegmentExpression.parse(r);
        r.ensureDone();
        const u = r.playback();
        return new RouteExpression(u, h, a, null != n ? Object.freeze(n) : J, e, i);
    }
    toInstructionTree(t) {
        let i = this.queryParams;
        const e = t.queryParams;
        if (null != e) i = new URLSearchParams({
            ...Object.fromEntries(i.entries()),
            ...e
        });
        return new ViewportInstructionTree(t, this.isAbsolute, this.root.toInstructions(t.append, 0, 0), i, this.fragment);
    }
    toString() {
        return this.raw;
    }
}

class CompositeSegmentExpression {
    constructor(t, i, e) {
        this.raw = t;
        this.siblings = i;
        this.append = e;
    }
    get kind() {
        return 1;
    }
    static parse(t) {
        t.record();
        const i = t.consumeOptional("+");
        const e = [];
        do {
            e.push(ScopedSegmentExpression.parse(t));
        } while (t.consumeOptional("+"));
        if (!i && 1 === e.length) {
            t.discard();
            return e[0];
        }
        const s = t.playback();
        return new CompositeSegmentExpression(s, e, i);
    }
    toInstructions(t, i, e) {
        switch (this.siblings.length) {
          case 0:
            return [];

          case 1:
            return this.siblings[0].toInstructions(t, i, e);

          case 2:
            return [ ...this.siblings[0].toInstructions(t, i, 0), ...this.siblings[1].toInstructions(t, 0, e) ];

          default:
            return [ ...this.siblings[0].toInstructions(t, i, 0), ...this.siblings.slice(1, -1).flatMap((function(i) {
                return i.toInstructions(t, 0, 0);
            })), ...this.siblings[this.siblings.length - 1].toInstructions(t, 0, e) ];
        }
    }
    toString() {
        return this.raw;
    }
}

class ScopedSegmentExpression {
    constructor(t, i, e) {
        this.raw = t;
        this.left = i;
        this.right = e;
    }
    get kind() {
        return 2;
    }
    static parse(t) {
        t.record();
        const i = SegmentGroupExpression.parse(t);
        if (t.consumeOptional("/")) {
            const e = ScopedSegmentExpression.parse(t);
            const s = t.playback();
            return new ScopedSegmentExpression(s, i, e);
        }
        t.discard();
        return i;
    }
    toInstructions(t, i, e) {
        const s = this.left.toInstructions(t, i, 0);
        const n = this.right.toInstructions(false, 0, e);
        let o = s[s.length - 1];
        while (o.children.length > 0) o = o.children[o.children.length - 1];
        o.children.push(...n);
        return s;
    }
    toString() {
        return this.raw;
    }
}

class SegmentGroupExpression {
    constructor(t, i) {
        this.raw = t;
        this.expression = i;
    }
    get kind() {
        return 3;
    }
    static parse(t) {
        t.record();
        if (t.consumeOptional("(")) {
            const i = CompositeSegmentExpression.parse(t);
            t.consume(")");
            const e = t.playback();
            return new SegmentGroupExpression(e, i);
        }
        t.discard();
        return SegmentExpression.parse(t);
    }
    toInstructions(t, i, e) {
        return this.expression.toInstructions(t, i + 1, e + 1);
    }
    toString() {
        return this.raw;
    }
}

class SegmentExpression {
    constructor(t, i, e, s, n) {
        this.raw = t;
        this.component = i;
        this.action = e;
        this.viewport = s;
        this.scoped = n;
    }
    get kind() {
        return 4;
    }
    static get EMPTY() {
        return new SegmentExpression("", ComponentExpression.EMPTY, ActionExpression.EMPTY, ViewportExpression.EMPTY, true);
    }
    static parse(t) {
        t.record();
        const i = ComponentExpression.parse(t);
        const e = ActionExpression.parse(t);
        const s = ViewportExpression.parse(t);
        const n = !t.consumeOptional("!");
        const o = t.playback();
        return new SegmentExpression(o, i, e, s, n);
    }
    toInstructions(t, i, e) {
        return [ ViewportInstruction.create({
            component: this.component.name,
            params: this.component.parameterList.toObject(),
            viewport: this.viewport.name,
            append: t,
            open: i,
            close: e
        }) ];
    }
    toString() {
        return this.raw;
    }
}

class ComponentExpression {
    constructor(t, i, e) {
        this.raw = t;
        this.name = i;
        this.parameterList = e;
        switch (i.charAt(0)) {
          case ":":
            this.isParameter = true;
            this.isStar = false;
            this.isDynamic = true;
            this.parameterName = i.slice(1);
            break;

          case "*":
            this.isParameter = false;
            this.isStar = true;
            this.isDynamic = true;
            this.parameterName = i.slice(1);
            break;

          default:
            this.isParameter = false;
            this.isStar = false;
            this.isDynamic = false;
            this.parameterName = i;
            break;
        }
    }
    get kind() {
        return 5;
    }
    static get EMPTY() {
        return new ComponentExpression("", "", ParameterListExpression.EMPTY);
    }
    static parse(t) {
        t.record();
        t.record();
        if (!t.done) if (t.startsWith("./")) t.advance(); else if (t.startsWith("../")) {
            t.advance();
            t.advance();
        } else while (!t.done && !t.startsWith(...I)) t.advance();
        const i = decodeURIComponent(t.playback());
        if (0 === i.length) t.expect("component name");
        const e = ParameterListExpression.parse(t);
        const s = t.playback();
        return new ComponentExpression(s, i, e);
    }
    toString() {
        return this.raw;
    }
}

class ActionExpression {
    constructor(t, i, e) {
        this.raw = t;
        this.name = i;
        this.parameterList = e;
    }
    get kind() {
        return 6;
    }
    static get EMPTY() {
        return new ActionExpression("", "", ParameterListExpression.EMPTY);
    }
    static parse(t) {
        t.record();
        let i = "";
        if (t.consumeOptional(".")) {
            t.record();
            while (!t.done && !t.startsWith(...I)) t.advance();
            i = decodeURIComponent(t.playback());
            if (0 === i.length) t.expect("method name");
        }
        const e = ParameterListExpression.parse(t);
        const s = t.playback();
        return new ActionExpression(s, i, e);
    }
    toString() {
        return this.raw;
    }
}

class ViewportExpression {
    constructor(t, i) {
        this.raw = t;
        this.name = i;
    }
    get kind() {
        return 7;
    }
    static get EMPTY() {
        return new ViewportExpression("", "");
    }
    static parse(t) {
        t.record();
        let i = "";
        if (t.consumeOptional("@")) {
            t.record();
            while (!t.done && !t.startsWith(...I)) t.advance();
            i = decodeURIComponent(t.playback());
            if (0 === i.length) t.expect("viewport name");
        }
        const e = t.playback();
        return new ViewportExpression(e, i);
    }
    toString() {
        return this.raw;
    }
}

class ParameterListExpression {
    constructor(t, i) {
        this.raw = t;
        this.expressions = i;
    }
    get kind() {
        return 8;
    }
    static get EMPTY() {
        return new ParameterListExpression("", []);
    }
    static parse(t) {
        t.record();
        const i = [];
        if (t.consumeOptional("(")) {
            do {
                i.push(ParameterExpression.parse(t, i.length));
                if (!t.consumeOptional(",")) break;
            } while (!t.done && !t.startsWith(")"));
            t.consume(")");
        }
        const e = t.playback();
        return new ParameterListExpression(e, i);
    }
    toObject() {
        const t = {};
        for (const i of this.expressions) t[i.key] = i.value;
        return t;
    }
    toString() {
        return this.raw;
    }
}

class ParameterExpression {
    constructor(t, i, e) {
        this.raw = t;
        this.key = i;
        this.value = e;
    }
    get kind() {
        return 9;
    }
    static get EMPTY() {
        return new ParameterExpression("", "", "");
    }
    static parse(t, i) {
        t.record();
        t.record();
        while (!t.done && !t.startsWith(...I)) t.advance();
        let e = decodeURIComponent(t.playback());
        if (0 === e.length) t.expect("parameter key");
        let s;
        if (t.consumeOptional("=")) {
            t.record();
            while (!t.done && !t.startsWith(...I)) t.advance();
            s = decodeURIComponent(t.playback());
            if (0 === s.length) t.expect("parameter value");
        } else {
            s = e;
            e = i.toString();
        }
        const n = t.playback();
        return new ParameterExpression(n, e, s);
    }
    toString() {
        return this.raw;
    }
}

const T = Object.freeze({
    RouteExpression: RouteExpression,
    CompositeSegmentExpression: CompositeSegmentExpression,
    ScopedSegmentExpression: ScopedSegmentExpression,
    SegmentGroupExpression: SegmentGroupExpression,
    SegmentExpression: SegmentExpression,
    ComponentExpression: ComponentExpression,
    ActionExpression: ActionExpression,
    ViewportExpression: ViewportExpression,
    ParameterListExpression: ParameterListExpression,
    ParameterExpression: ParameterExpression
});

class ViewportRequest {
    constructor(t, i, e, s) {
        this.viewportName = t;
        this.componentName = i;
        this.resolution = e;
        this.append = s;
    }
    toString() {
        return `VR(viewport:'${this.viewportName}',component:'${this.componentName}',resolution:'${this.resolution}',append:${this.append})`;
    }
}

const V = new WeakMap;

class ViewportAgent {
    constructor(t, e, s) {
        this.viewport = t;
        this.hostController = e;
        this.ctx = s;
        this.isActive = false;
        this.curCA = null;
        this.nextCA = null;
        this.state = 8256;
        this.$resolution = "dynamic";
        this.$plan = "replace";
        this.currNode = null;
        this.nextNode = null;
        this.currTransition = null;
        this.prevTransition = null;
        this.logger = s.container.get(i.ILogger).scopeTo(`ViewportAgent<${s.friendlyPath}>`);
        this.logger.trace(`constructor()`);
    }
    get $state() {
        return j(this.state);
    }
    get currState() {
        return 16256 & this.state;
    }
    set currState(t) {
        this.state = 127 & this.state | t;
    }
    get nextState() {
        return 127 & this.state;
    }
    set nextState(t) {
        this.state = 16256 & this.state | t;
    }
    static for(t, i) {
        let s = V.get(t);
        if (void 0 === s) {
            const n = e.Controller.getCachedOrThrow(t);
            V.set(t, s = new ViewportAgent(t, n, i));
        }
        return s;
    }
    activateFromViewport(t, i, e) {
        const s = this.currTransition;
        if (null !== s) L(s);
        this.isActive = true;
        switch (this.nextState) {
          case 64:
            switch (this.currState) {
              case 8192:
                this.logger.trace(`activateFromViewport() - nothing to activate at %s`, this);
                return;

              case 4096:
                this.logger.trace(`activateFromViewport() - activating existing componentAgent at %s`, this);
                return this.curCA.activate(t, i, e);

              default:
                this.unexpectedState("activateFromViewport 1");
            }

          case 2:
            {
                if (null === this.currTransition) throw new Error(`Unexpected viewport activation outside of a transition context at ${this}`);
                if ("static" !== this.$resolution) throw new Error(`Unexpected viewport activation at ${this}`);
                this.logger.trace(`activateFromViewport() - running ordinary activate at %s`, this);
                const i = Batch.start((i => {
                    this.activate(t, this.currTransition, i);
                }));
                const e = new Promise((t => {
                    i.continueWith((() => {
                        t();
                    }));
                }));
                return i.start().done ? void 0 : e;
            }

          default:
            this.unexpectedState("activateFromViewport 2");
        }
    }
    deactivateFromViewport(t, i, e) {
        const s = this.currTransition;
        if (null !== s) L(s);
        this.isActive = false;
        switch (this.currState) {
          case 8192:
            this.logger.trace(`deactivateFromViewport() - nothing to deactivate at %s`, this);
            return;

          case 4096:
            this.logger.trace(`deactivateFromViewport() - deactivating existing componentAgent at %s`, this);
            return this.curCA.deactivate(t, i, e);

          case 128:
            this.logger.trace(`deactivateFromViewport() - already deactivating at %s`, this);
            return;

          default:
            {
                if (null === this.currTransition) throw new Error(`Unexpected viewport deactivation outside of a transition context at ${this}`);
                this.logger.trace(`deactivateFromViewport() - running ordinary deactivate at %s`, this);
                const i = Batch.start((i => {
                    this.deactivate(t, this.currTransition, i);
                }));
                const e = new Promise((t => {
                    i.continueWith((() => {
                        t();
                    }));
                }));
                return i.start().done ? void 0 : e;
            }
        }
    }
    handles(t) {
        if (!this.isAvailable(t.resolution)) return false;
        if (t.append && 4096 === this.currState) {
            this.logger.trace(`handles(req:%s) -> false (append mode, viewport already has content %s)`, t, this.curCA);
            return false;
        }
        const i = t.viewportName;
        const e = this.viewport.name;
        if (i !== ut && e !== ut && e !== i) {
            this.logger.trace(`handles(req:%s) -> false (viewport names don't match '%s')`, t, e);
            return false;
        }
        if (this.viewport.usedBy.length > 0 && !this.viewport.usedBy.split(",").includes(t.componentName)) {
            this.logger.trace(`handles(req:%s) -> false (componentName not included in usedBy)`, t);
            return false;
        }
        this.logger.trace(`viewport '%s' handles(req:%s) -> true`, e, t);
        return true;
    }
    isAvailable(t) {
        if ("dynamic" === t && !this.isActive) {
            this.logger.trace(`isAvailable(resolution:%s) -> false (viewport is not active and we're in dynamic resolution resolution)`, t);
            return false;
        }
        if (64 !== this.nextState) {
            this.logger.trace(`isAvailable(resolution:%s) -> false (update already scheduled for %s)`, t, this.nextNode);
            return false;
        }
        return true;
    }
    canUnload(t, i) {
        if (null === this.currTransition) this.currTransition = t;
        L(t);
        if (true !== t.guardsResult) return;
        i.push();
        Batch.start((i => {
            this.logger.trace(`canUnload() - invoking on children at %s`, this);
            for (const e of this.currNode.children) e.context.vpa.canUnload(t, i);
        })).continueWith((i => {
            switch (this.currState) {
              case 4096:
                this.logger.trace(`canUnload() - invoking on existing component at %s`, this);
                switch (this.$plan) {
                  case "none":
                    this.currState = 1024;
                    return;

                  case "invoke-lifecycles":
                  case "replace":
                    this.currState = 2048;
                    i.push();
                    Batch.start((i => {
                        this.logger.trace(`canUnload() - finished invoking on children, now invoking on own component at %s`, this);
                        this.curCA.canUnload(t, this.nextNode, i);
                    })).continueWith((() => {
                        this.logger.trace(`canUnload() - finished at %s`, this);
                        this.currState = 1024;
                        i.pop();
                    })).start();
                    return;
                }

              case 8192:
                this.logger.trace(`canUnload() - nothing to unload at %s`, this);
                return;

              default:
                t.handleError(new Error(`Unexpected state at canUnload of ${this}`));
            }
        })).continueWith((() => {
            i.pop();
        })).start();
    }
    canLoad(t, e) {
        if (null === this.currTransition) this.currTransition = t;
        L(t);
        if (true !== t.guardsResult) return;
        e.push();
        Batch.start((i => {
            switch (this.nextState) {
              case 32:
                this.logger.trace(`canLoad() - invoking on new component at %s`, this);
                this.nextState = 16;
                switch (this.$plan) {
                  case "none":
                    return;

                  case "invoke-lifecycles":
                    return this.curCA.canLoad(t, this.nextNode, i);

                  case "replace":
                    this.nextCA = this.nextNode.context.createComponentAgent(this.hostController, this.nextNode);
                    return this.nextCA.canLoad(t, this.nextNode, i);
                }

              case 64:
                this.logger.trace(`canLoad() - nothing to load at %s`, this);
                return;

              default:
                this.unexpectedState("canLoad");
            }
        })).continueWith((t => {
            const e = this.nextNode;
            switch (this.$plan) {
              case "none":
              case "invoke-lifecycles":
                this.logger.trace(`canLoad(next:%s) - plan set to '%s', compiling residue`, e, this.$plan);
                t.push();
                void i.onResolve(z(e), (() => {
                    t.pop();
                }));
                return;

              case "replace":
                switch (this.$resolution) {
                  case "dynamic":
                    this.logger.trace(`canLoad(next:%s) - (resolution: 'dynamic'), delaying residue compilation until activate`, e, this.$plan);
                    return;

                  case "static":
                    this.logger.trace(`canLoad(next:%s) - (resolution: '${this.$resolution}'), creating nextCA and compiling residue`, e, this.$plan);
                    t.push();
                    void i.onResolve(z(e), (() => {
                        t.pop();
                    }));
                    return;
                }
            }
        })).continueWith((i => {
            switch (this.nextState) {
              case 16:
                this.logger.trace(`canLoad() - finished own component, now invoking on children at %s`, this);
                this.nextState = 8;
                for (const e of this.nextNode.children) e.context.vpa.canLoad(t, i);
                return;

              case 64:
                return;

              default:
                this.unexpectedState("canLoad");
            }
        })).continueWith((() => {
            this.logger.trace(`canLoad() - finished at %s`, this);
            e.pop();
        })).start();
    }
    unload(t, i) {
        L(t);
        P(this, t);
        i.push();
        Batch.start((i => {
            this.logger.trace(`unload() - invoking on children at %s`, this);
            for (const e of this.currNode.children) e.context.vpa.unload(t, i);
        })).continueWith((e => {
            switch (this.currState) {
              case 1024:
                this.logger.trace(`unload() - invoking on existing component at %s`, this);
                switch (this.$plan) {
                  case "none":
                    this.currState = 256;
                    return;

                  case "invoke-lifecycles":
                  case "replace":
                    this.currState = 512;
                    e.push();
                    Batch.start((i => {
                        this.logger.trace(`unload() - finished invoking on children, now invoking on own component at %s`, this);
                        this.curCA.unload(t, this.nextNode, i);
                    })).continueWith((() => {
                        this.logger.trace(`unload() - finished at %s`, this);
                        this.currState = 256;
                        e.pop();
                    })).start();
                    return;
                }

              case 8192:
                this.logger.trace(`unload() - nothing to unload at %s`, this);
                for (const e of this.currNode.children) e.context.vpa.unload(t, i);
                return;

              default:
                this.unexpectedState("unload");
            }
        })).continueWith((() => {
            i.pop();
        })).start();
    }
    load(t, i) {
        L(t);
        P(this, t);
        i.push();
        Batch.start((i => {
            switch (this.nextState) {
              case 8:
                this.logger.trace(`load() - invoking on new component at %s`, this);
                this.nextState = 4;
                switch (this.$plan) {
                  case "none":
                    return;

                  case "invoke-lifecycles":
                    return this.curCA.load(t, this.nextNode, i);

                  case "replace":
                    return this.nextCA.load(t, this.nextNode, i);
                }

              case 64:
                this.logger.trace(`load() - nothing to load at %s`, this);
                return;

              default:
                this.unexpectedState("load");
            }
        })).continueWith((i => {
            switch (this.nextState) {
              case 4:
                this.logger.trace(`load() - finished own component, now invoking on children at %s`, this);
                this.nextState = 2;
                for (const e of this.nextNode.children) e.context.vpa.load(t, i);
                return;

              case 64:
                return;

              default:
                this.unexpectedState("load");
            }
        })).continueWith((() => {
            this.logger.trace(`load() - finished at %s`, this);
            i.pop();
        })).start();
    }
    deactivate(t, i, e) {
        L(i);
        P(this, i);
        e.push();
        switch (this.currState) {
          case 256:
            this.logger.trace(`deactivate() - invoking on existing component at %s`, this);
            this.currState = 128;
            switch (this.$plan) {
              case "none":
              case "invoke-lifecycles":
                e.pop();
                return;

              case "replace":
                {
                    const s = this.hostController;
                    const n = this.viewport.stateful ? 0 : 16;
                    i.run((() => this.curCA.deactivate(t, s, n)), (() => {
                        e.pop();
                    }));
                }
            }
            return;

          case 8192:
            this.logger.trace(`deactivate() - nothing to deactivate at %s`, this);
            e.pop();
            return;

          case 128:
            this.logger.trace(`deactivate() - already deactivating at %s`, this);
            e.pop();
            return;

          default:
            this.unexpectedState("deactivate");
        }
    }
    activate(t, i, e) {
        L(i);
        P(this, i);
        e.push();
        if (32 === this.nextState && "dynamic" === this.$resolution) {
            this.logger.trace(`activate() - invoking canLoad(), load() and activate() on new component due to resolution 'dynamic' at %s`, this);
            Batch.start((t => {
                this.canLoad(i, t);
            })).continueWith((t => {
                this.load(i, t);
            })).continueWith((e => {
                this.activate(t, i, e);
            })).continueWith((() => {
                e.pop();
            })).start();
            return;
        }
        switch (this.nextState) {
          case 2:
            this.logger.trace(`activate() - invoking on existing component at %s`, this);
            this.nextState = 1;
            Batch.start((e => {
                switch (this.$plan) {
                  case "none":
                  case "invoke-lifecycles":
                    return;

                  case "replace":
                    {
                        const s = this.hostController;
                        const n = 0;
                        i.run((() => {
                            e.push();
                            return this.nextCA.activate(t, s, n);
                        }), (() => {
                            e.pop();
                        }));
                    }
                }
            })).continueWith((t => {
                this.processDynamicChildren(i, t);
            })).continueWith((() => {
                e.pop();
            })).start();
            return;

          case 64:
            this.logger.trace(`activate() - nothing to activate at %s`, this);
            e.pop();
            return;

          default:
            this.unexpectedState("activate");
        }
    }
    swap(t, i) {
        if (8192 === this.currState) {
            this.logger.trace(`swap() - running activate on next instead, because there is nothing to deactivate at %s`, this);
            this.activate(null, t, i);
            return;
        }
        if (64 === this.nextState) {
            this.logger.trace(`swap() - running deactivate on current instead, because there is nothing to activate at %s`, this);
            this.deactivate(null, t, i);
            return;
        }
        L(t);
        P(this, t);
        if (!(256 === this.currState && 2 === this.nextState)) this.unexpectedState("swap");
        this.currState = 128;
        this.nextState = 1;
        switch (this.$plan) {
          case "none":
          case "invoke-lifecycles":
            {
                this.logger.trace(`swap() - skipping this level and swapping children instead at %s`, this);
                const e = o(this.nextNode.children, this.currNode.children);
                for (const s of e) s.context.vpa.swap(t, i);
                return;
            }

          case "replace":
            {
                this.logger.trace(`swap() - running normally at %s`, this);
                const e = this.hostController;
                const s = this.curCA;
                const n = this.nextCA;
                const o = this.viewport.stateful ? 0 : 16;
                const r = 0;
                i.push();
                Batch.start((i => {
                    t.run((() => {
                        i.push();
                        return s.deactivate(null, e, o);
                    }), (() => {
                        i.pop();
                    }));
                })).continueWith((i => {
                    t.run((() => {
                        i.push();
                        return n.activate(null, e, r);
                    }), (() => {
                        i.pop();
                    }));
                })).continueWith((i => {
                    this.processDynamicChildren(t, i);
                })).continueWith((() => {
                    i.pop();
                })).start();
                return;
            }
        }
    }
    processDynamicChildren(t, i) {
        this.logger.trace(`processDynamicChildren() - %s`, this);
        const e = this.nextNode;
        t.run((() => {
            i.push();
            return F(e);
        }), (e => {
            Batch.start((i => {
                for (const s of e) t.run((() => {
                    i.push();
                    return s.context.vpa.canLoad(t, i);
                }), (() => {
                    i.pop();
                }));
            })).continueWith((i => {
                for (const s of e) t.run((() => {
                    i.push();
                    return s.context.vpa.load(t, i);
                }), (() => {
                    i.pop();
                }));
            })).continueWith((i => {
                for (const s of e) t.run((() => {
                    i.push();
                    return s.context.vpa.activate(null, t, i);
                }), (() => {
                    i.pop();
                }));
            })).continueWith((() => {
                i.pop();
            })).start();
        }));
    }
    scheduleUpdate(t, i) {
        var e, s;
        switch (this.nextState) {
          case 64:
            this.nextNode = i;
            this.nextState = 32;
            this.$resolution = t.resolutionMode;
            break;

          default:
            this.unexpectedState("scheduleUpdate 1");
        }
        switch (this.currState) {
          case 8192:
          case 4096:
          case 1024:
            break;

          default:
            this.unexpectedState("scheduleUpdate 2");
        }
        const n = null !== (s = null === (e = this.curCA) || void 0 === e ? void 0 : e.routeNode) && void 0 !== s ? s : null;
        if (null === n || n.component !== i.component) this.$plan = "replace"; else {
            const t = i.context.definition.config.transitionPlan;
            if ("function" === typeof t) this.$plan = t(n, i); else this.$plan = t;
        }
        this.logger.trace(`scheduleUpdate(next:%s) - plan set to '%s'`, i, this.$plan);
    }
    cancelUpdate() {
        if (null !== this.currNode) this.currNode.children.forEach((function(t) {
            t.context.vpa.cancelUpdate();
        }));
        if (null !== this.nextNode) this.nextNode.children.forEach((function(t) {
            t.context.vpa.cancelUpdate();
        }));
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
        if (null !== this.currNode) this.currNode.children.forEach((function(t) {
            t.context.vpa.endTransition();
        }));
        if (null !== this.nextNode) this.nextNode.children.forEach((function(t) {
            t.context.vpa.endTransition();
        }));
        if (null !== this.currTransition) {
            L(this.currTransition);
            switch (this.nextState) {
              case 64:
                switch (this.currState) {
                  case 128:
                    this.logger.trace(`endTransition() - setting currState to State.nextIsEmpty at %s`, this);
                    this.currState = 8192;
                    this.curCA = null;
                    break;

                  default:
                    this.unexpectedState("endTransition 1");
                }
                break;

              case 1:
                switch (this.currState) {
                  case 8192:
                  case 128:
                    switch (this.$plan) {
                      case "none":
                      case "invoke-lifecycles":
                        this.logger.trace(`endTransition() - setting currState to State.currIsActive at %s`, this);
                        this.currState = 4096;
                        break;

                      case "replace":
                        this.logger.trace(`endTransition() - setting currState to State.currIsActive and reassigning curCA at %s`, this);
                        this.currState = 4096;
                        this.curCA = this.nextCA;
                        break;
                    }
                    this.currNode = this.nextNode;
                    break;

                  default:
                    this.unexpectedState("endTransition 2");
                }
                break;

              default:
                this.unexpectedState("endTransition 3");
            }
            this.$plan = "replace";
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
        var t;
        if (this.viewport.stateful) this.logger.trace(`dispose() - not disposing stateful viewport at %s`, this); else {
            this.logger.trace(`dispose() - disposing %s`, this);
            null === (t = this.curCA) || void 0 === t ? void 0 : t.dispose();
        }
    }
    unexpectedState(t) {
        throw new Error(`Unexpected state at ${t} of ${this}`);
    }
}

function P(t, i) {
    if (true !== i.guardsResult) throw new Error(`Unexpected guardsResult ${i.guardsResult} at ${t}`);
}

function L(t) {
    if (void 0 !== t.error) throw t.error;
}

var U;

(function(t) {
    t[t["curr"] = 16256] = "curr";
    t[t["currIsEmpty"] = 8192] = "currIsEmpty";
    t[t["currIsActive"] = 4096] = "currIsActive";
    t[t["currCanUnload"] = 2048] = "currCanUnload";
    t[t["currCanUnloadDone"] = 1024] = "currCanUnloadDone";
    t[t["currUnload"] = 512] = "currUnload";
    t[t["currUnloadDone"] = 256] = "currUnloadDone";
    t[t["currDeactivate"] = 128] = "currDeactivate";
    t[t["next"] = 127] = "next";
    t[t["nextIsEmpty"] = 64] = "nextIsEmpty";
    t[t["nextIsScheduled"] = 32] = "nextIsScheduled";
    t[t["nextCanLoad"] = 16] = "nextCanLoad";
    t[t["nextCanLoadDone"] = 8] = "nextCanLoadDone";
    t[t["nextLoad"] = 4] = "nextLoad";
    t[t["nextLoadDone"] = 2] = "nextLoadDone";
    t[t["nextActivate"] = 1] = "nextActivate";
    t[t["bothAreEmpty"] = 8256] = "bothAreEmpty";
})(U || (U = {}));

const O = new Map;

function j(t) {
    let i = O.get(t);
    if (void 0 === i) O.set(t, i = D(t));
    return i;
}

function D(t) {
    const i = [];
    if (8192 === (8192 & t)) i.push("currIsEmpty");
    if (4096 === (4096 & t)) i.push("currIsActive");
    if (2048 === (2048 & t)) i.push("currCanUnload");
    if (1024 === (1024 & t)) i.push("currCanUnloadDone");
    if (512 === (512 & t)) i.push("currUnload");
    if (256 === (256 & t)) i.push("currUnloadDone");
    if (128 === (128 & t)) i.push("currDeactivate");
    if (64 === (64 & t)) i.push("nextIsEmpty");
    if (32 === (32 & t)) i.push("nextIsScheduled");
    if (16 === (16 & t)) i.push("nextCanLoad");
    if (8 === (8 & t)) i.push("nextCanLoadDone");
    if (4 === (4 & t)) i.push("nextLoad");
    if (2 === (2 & t)) i.push("nextLoadDone");
    if (1 === (1 & t)) i.push("nextActivate");
    return i.join("|");
}

let M = 0;

class RouteNode {
    constructor(t, i, e, s, n, o, r, h, a, u, c, l, d, f, p, v) {
        var g;
        this.id = t;
        this.path = i;
        this.finalPath = e;
        this.context = s;
        this.originalInstruction = n;
        this.instruction = o;
        this.params = r;
        this.queryParams = h;
        this.fragment = a;
        this.data = u;
        this.viewport = c;
        this.title = l;
        this.component = d;
        this.append = f;
        this.children = p;
        this.residue = v;
        this.version = 1;
        null !== (g = this.originalInstruction) && void 0 !== g ? g : this.originalInstruction = o;
    }
    get root() {
        return this.tree.root;
    }
    static create(t) {
        var i, e, s, n, o, r, h, a, u;
        const {[ft]: c, ...l} = null !== (i = t.params) && void 0 !== i ? i : {};
        return new RouteNode(++M, t.path, t.finalPath, t.context, null !== (e = t.originalInstruction) && void 0 !== e ? e : t.instruction, t.instruction, l, null !== (s = t.queryParams) && void 0 !== s ? s : J, null !== (n = t.fragment) && void 0 !== n ? n : null, null !== (o = t.data) && void 0 !== o ? o : {}, null !== (r = t.viewport) && void 0 !== r ? r : null, null !== (h = t.title) && void 0 !== h ? h : null, t.component, t.append, null !== (a = t.children) && void 0 !== a ? a : [], null !== (u = t.residue) && void 0 !== u ? u : []);
    }
    contains(t) {
        var i, e;
        if (this.context === t.options.context) {
            const s = this.children;
            const n = t.children;
            for (let t = 0, o = s.length; t < o; ++t) for (let r = 0, h = n.length; r < h; ++r) if (t + r < o && (null !== (e = null === (i = s[t + r].originalInstruction) || void 0 === i ? void 0 : i.contains(n[r])) && void 0 !== e ? e : false)) {
                if (r + 1 === h) return true;
            } else break;
        }
        return this.children.some((function(i) {
            return i.contains(t);
        }));
    }
    appendChild(t) {
        this.children.push(t);
        t.setTree(this.tree);
    }
    clearChildren() {
        for (const t of this.children) {
            t.clearChildren();
            t.context.vpa.cancelUpdate();
        }
        this.children.length = 0;
    }
    getTitle(t) {
        const i = [ ...this.children.map((i => i.getTitle(t))), this.getTitlePart() ].filter((t => null !== t));
        if (0 === i.length) return null;
        return i.join(t);
    }
    getTitlePart() {
        if ("function" === typeof this.title) return this.title.call(void 0, this);
        return this.title;
    }
    computeAbsolutePath() {
        if (this.context.isRoot) return "";
        const t = this.context.parent.node.computeAbsolutePath();
        const i = this.instruction.toUrlComponent(false);
        if (t.length > 0) {
            if (i.length > 0) return [ t, i ].join("/");
            return t;
        }
        return i;
    }
    setTree(t) {
        this.tree = t;
        for (const i of this.children) i.setTree(t);
    }
    finalizeInstruction() {
        const t = this.children.map((t => t.finalizeInstruction()));
        const i = this.instruction.clone();
        i.children.splice(0, i.children.length, ...t);
        return this.instruction = i;
    }
    clone() {
        const t = new RouteNode(this.id, this.path, this.finalPath, this.context, this.originalInstruction, this.instruction, {
            ...this.params
        }, {
            ...this.queryParams
        }, this.fragment, {
            ...this.data
        }, this.viewport, this.title, this.component, this.append, this.children.map((t => t.clone())), [ ...this.residue ]);
        t.version = this.version + 1;
        if (t.context.node === this) t.context.node = t;
        return t;
    }
    toString() {
        var t, i, e, s, n, o;
        const r = [];
        const h = null !== (e = null === (i = null === (t = this.context) || void 0 === t ? void 0 : t.definition.component) || void 0 === i ? void 0 : i.name) && void 0 !== e ? e : "";
        if (h.length > 0) r.push(`c:'${h}'`);
        const a = null !== (n = null === (s = this.context) || void 0 === s ? void 0 : s.definition.config.path) && void 0 !== n ? n : "";
        if (a.length > 0) r.push(`path:'${a}'`);
        if (this.children.length > 0) r.push(`children:[${this.children.map(String).join(",")}]`);
        if (this.residue.length > 0) r.push(`residue:${this.residue.map((function(t) {
            if ("string" === typeof t) return `'${t}'`;
            return String(t);
        })).join(",")}`);
        return `RN(ctx:'${null === (o = this.context) || void 0 === o ? void 0 : o.friendlyPath}',${r.join(",")})`;
    }
}

class RouteTree {
    constructor(t, i, e, s) {
        this.options = t;
        this.queryParams = i;
        this.fragment = e;
        this.root = s;
    }
    contains(t) {
        return this.root.contains(t);
    }
    clone() {
        const t = new RouteTree(this.options.clone(), {
            ...this.queryParams
        }, this.fragment, this.root.clone());
        t.root.setTree(this);
        return t;
    }
    finalizeInstructions() {
        return new ViewportInstructionTree(this.options, true, this.root.children.map((t => t.finalizeInstruction())), this.queryParams, this.fragment);
    }
    toString() {
        return this.root.toString();
    }
}

function B(t, e, s) {
    const n = s.container.get(i.ILogger).scopeTo("RouteTree");
    const o = s.root;
    t.options = e.options;
    t.queryParams = e.queryParams;
    t.fragment = e.fragment;
    if (e.isAbsolute) s = o;
    if (s === o) {
        t.root.setTree(t);
        o.node = t.root;
    }
    const r = s.resolved instanceof Promise ? " - awaiting promise" : "";
    n.trace(`updateRouteTree(rootCtx:%s,rt:%s,vit:%s)${r}`, o, t, e);
    return i.onResolve(s.resolved, (() => q(n, e, s, o.node)));
}

function q(t, e, s, n) {
    t.trace(`updateNode(ctx:%s,node:%s)`, s, n);
    n.queryParams = e.queryParams;
    n.fragment = e.fragment;
    let o;
    if (!n.context.isRoot) o = n.context.vpa.scheduleUpdate(n.tree.options, n); else o = void 0;
    return i.onResolve(o, (() => {
        if (n.context === s) {
            n.clearChildren();
            return i.onResolve(i.resolveAll(...e.children.map((i => H(t, n, i, n.tree.options.append || i.append)))), (() => i.resolveAll(...s.getAvailableViewportAgents("dynamic").map((i => {
                const e = ViewportInstruction.create({
                    component: i.viewport.default,
                    viewport: i.viewport.name
                });
                return H(t, n, e, n.append);
            })))));
        }
        return i.resolveAll(...n.children.map((i => q(t, e, s, i))));
    }));
}

function z(t) {
    const e = t.context;
    const s = e.container.get(i.ILogger).scopeTo("RouteTree");
    const n = e.resolved instanceof Promise ? " - awaiting promise" : "";
    s.trace(`processResidue(node:%s)${n}`, t);
    return i.onResolve(e.resolved, (() => i.resolveAll(...t.residue.splice(0).map((i => H(s, t, i, t.append))), ...e.getAvailableViewportAgents("static").map((i => {
        const e = ViewportInstruction.create({
            component: i.viewport.default,
            viewport: i.viewport.name
        });
        return H(s, t, e, t.append);
    })))));
}

function F(t) {
    const e = t.context;
    const s = e.container.get(i.ILogger).scopeTo("RouteTree");
    const n = e.resolved instanceof Promise ? " - awaiting promise" : "";
    s.trace(`getDynamicChildren(node:%s)${n}`, t);
    return i.onResolve(e.resolved, (() => {
        const n = t.children.slice();
        return i.onResolve(i.resolveAll(...t.residue.splice(0).map((i => H(s, t, i, t.append)))), (() => i.onResolve(i.resolveAll(...e.getAvailableViewportAgents("dynamic").map((i => {
            const e = ViewportInstruction.create({
                component: i.viewport.default,
                viewport: i.viewport.name
            });
            return H(s, t, e, t.append);
        }))), (() => t.children.filter((t => !n.includes(t)))))));
    }));
}

function H(t, e, n, o) {
    var r, h, a;
    t.trace(`createAndAppendNodes(node:%s,vi:%s,append:${o})`, e, n);
    switch (n.component.type) {
      case 0:
        switch (n.component.value) {
          case "..":
            e.clearChildren();
            e = null !== (h = null === (r = e.context.parent) || void 0 === r ? void 0 : r.node) && void 0 !== h ? h : e;

          case ".":
            return i.resolveAll(...n.children.map((i => H(t, e, i, i.append))));

          default:
            {
                t.trace(`createAndAppendNodes invoking createNode`);
                const i = W(t, e, n, o);
                if (null === i) return;
                return Y(t, e, i);
            }
        }

      case 4:
      case 2:
        {
            const r = RouteDefinition.resolve(n.component.value, e.context.definition, null);
            const h = null !== (a = n.params) && void 0 !== a ? a : i.emptyObject;
            const u = new $RecognizedRoute(new s.RecognizedRoute(new s.Endpoint(new s.ConfigurableRoute(r.path[0], r.caseSensitive, r), i.toArray(Object.values(h))), h), null);
            const c = G(t, e, n, o, u, null);
            return Y(t, e, c);
        }
    }
}

function W(t, i, e, s) {
    var n, o;
    const r = i.context;
    let h = 0;
    const a = e.clone();
    let u = e.component.value;
    let c = e;
    while (1 === c.children.length) {
        c = c.children[0];
        if (0 === c.component.type) {
            ++h;
            u = `${u}/${c.component.value}`;
        } else break;
    }
    const l = r.recognize(u);
    t.trace("createNode recognized route: %s", l);
    const d = null !== (n = null === l || void 0 === l ? void 0 : l.residue) && void 0 !== n ? n : null;
    t.trace("createNode residue:", d);
    const f = null === d;
    if (null === l || d === u) {
        const n = e.component.value;
        if ("" === n) return null;
        let o = e.viewport;
        if (null === o || 0 === o.length) o = ut;
        const h = r.getFallbackViewportAgent("dynamic", o);
        const a = null !== h ? h.viewport.fallback : r.definition.fallback;
        if (null === a) throw new Error(`Neither the route '${n}' matched any configured route at '${r.friendlyPath}' nor a fallback is configured for the viewport '${o}' - did you forget to add '${n}' to the routes list of the route decorator of '${r.component.name}'?`);
        t.trace(`Fallback is set to '${a}'. Looking for a recognized route.`);
        const u = r.childRoutes.find((t => t.id === a));
        if (void 0 !== u) return _(t, u, i, e, s);
        t.trace(`No route definition for the fallback '${a}' is found; trying to recognize the route.`);
        const c = r.recognize(a, true);
        if (null !== c) return G(t, i, e, s, c, null);
        t.trace(`The fallback '${a}' is not recognized as a route; treating as custom element name.`);
        return _(t, RouteDefinition.resolve(a, r.definition, null, r), i, e, s);
    }
    l.residue = null;
    e.component.value = f ? u : u.slice(0, -(d.length + 1));
    for (let t = 0; t < h; ++t) {
        const t = e.children[0];
        if (null !== (o = null === d || void 0 === d ? void 0 : d.startsWith(t.component.value)) && void 0 !== o ? o : false) break;
        e.children = t.children;
    }
    t.trace("createNode after adjustment vi:%s", e);
    return G(t, i, e, s, l, a);
}

function G(t, e, s, n, o, r, h = o.route.endpoint.route) {
    const a = e.context;
    const u = e.tree;
    return i.onResolve(h.handler, (i => {
        var c, l, d;
        h.handler = i;
        t.trace(`creatingConfiguredNode(rd:%s, vi:%s)`, i, s);
        if (null === i.redirectTo) {
            const d = (null !== (l = null === (c = s.viewport) || void 0 === c ? void 0 : c.length) && void 0 !== l ? l : 0) > 0 ? s.viewport : i.viewport;
            const f = i.component;
            const p = a.resolveViewportAgent(new ViewportRequest(d, f.name, u.options.resolutionMode, n));
            const v = a.container.get(tt);
            const g = v.getRouteContext(p, f, null, p.hostController.container, a.definition);
            t.trace("createConfiguredNode setting the context node");
            g.node = RouteNode.create({
                path: o.route.endpoint.route.path,
                finalPath: h.path,
                context: g,
                instruction: s,
                originalInstruction: r,
                params: {
                    ...e.params,
                    ...o.route.params
                },
                queryParams: u.queryParams,
                fragment: u.fragment,
                data: i.data,
                viewport: d,
                component: f,
                append: n,
                title: i.config.title,
                residue: [ ...null === o.residue ? [] : [ ViewportInstruction.create(o.residue) ], ...s.children ]
            });
            g.node.setTree(e.tree);
            t.trace(`createConfiguredNode(vi:%s) -> %s`, s, g.node);
            return g.node;
        }
        const f = RouteExpression.parse(h.path, false);
        const p = RouteExpression.parse(i.redirectTo, false);
        let v;
        let g;
        const w = [];
        switch (f.root.kind) {
          case 2:
          case 4:
            v = f.root;
            break;

          default:
            throw new Error(`Unexpected expression kind ${f.root.kind}`);
        }
        switch (p.root.kind) {
          case 2:
          case 4:
            g = p.root;
            break;

          default:
            throw new Error(`Unexpected expression kind ${p.root.kind}`);
        }
        let m;
        let x;
        let $ = false;
        let E = false;
        while (!($ && E)) {
            if ($) m = null; else if (4 === v.kind) {
                m = v;
                $ = true;
            } else if (4 === v.left.kind) {
                m = v.left;
                switch (v.right.kind) {
                  case 2:
                  case 4:
                    v = v.right;
                    break;

                  default:
                    throw new Error(`Unexpected expression kind ${v.right.kind}`);
                }
            } else throw new Error(`Unexpected expression kind ${v.left.kind}`);
            if (E) x = null; else if (4 === g.kind) {
                x = g;
                E = true;
            } else if (4 === g.left.kind) {
                x = g.left;
                switch (g.right.kind) {
                  case 2:
                  case 4:
                    g = g.right;
                    break;

                  default:
                    throw new Error(`Unexpected expression kind ${g.right.kind}`);
                }
            } else throw new Error(`Unexpected expression kind ${g.left.kind}`);
            if (null !== x) if (x.component.isDynamic && (null !== (d = null === m || void 0 === m ? void 0 : m.component.isDynamic) && void 0 !== d ? d : false)) w.push(o.route.params[m.component.name]); else w.push(x.raw);
        }
        const y = w.filter(Boolean).join("/");
        const R = a.recognize(y);
        if (null === R) throw new Error(`'${y}' did not match any configured route or registered component name at '${a.friendlyPath}' - did you forget to add '${y}' to the routes list of the route decorator of '${a.component.name}'?`);
        return G(t, e, s, n, o, r, R.route.endpoint.route);
    }));
}

function Y(t, e, s) {
    return i.onResolve(s, (i => {
        t.trace(`appendNode($childNode:%s)`, i);
        e.appendChild(i);
        return i.context.vpa.scheduleUpdate(e.tree.options, i);
    }));
}

function _(t, e, n, o, r) {
    const h = new $RecognizedRoute(new s.RecognizedRoute(new s.Endpoint(new s.ConfigurableRoute(e.path[0], e.caseSensitive, e), []), i.emptyObject), null);
    o.children.length = 0;
    return G(t, n, o, r, h, null);
}

const J = Object.freeze(new URLSearchParams);

const Z = "au-nav-id";

function K(i) {
    return t.isObject(i) && true === Object.prototype.hasOwnProperty.call(i, Z);
}

function Q(t, i) {
    return {
        ...t,
        [Z]: i
    };
}

function X(t, i) {
    if ("function" === typeof i) return i(t);
    return i;
}

class RouterOptions {
    constructor(t, i, e, s, n, o) {
        this.useUrlFragmentHash = t;
        this.useHref = i;
        this.resolutionMode = e;
        this.historyStrategy = s;
        this.sameUrlStrategy = n;
        this.buildTitle = o;
    }
    static get DEFAULT() {
        return RouterOptions.create({});
    }
    static create(t) {
        var i, e, s, n, o, r;
        return new RouterOptions(null !== (i = t.useUrlFragmentHash) && void 0 !== i ? i : false, null !== (e = t.useHref) && void 0 !== e ? e : true, null !== (s = t.resolutionMode) && void 0 !== s ? s : "dynamic", null !== (n = t.historyStrategy) && void 0 !== n ? n : "push", null !== (o = t.sameUrlStrategy) && void 0 !== o ? o : "ignore", null !== (r = t.buildTitle) && void 0 !== r ? r : null);
    }
    getHistoryStrategy(t) {
        return X(t, this.historyStrategy);
    }
    getSameUrlStrategy(t) {
        return X(t, this.sameUrlStrategy);
    }
    stringifyProperties() {
        return [ [ "resolutionMode", "resolution" ], [ "historyStrategy", "history" ], [ "sameUrlStrategy", "sameUrl" ] ].map((([t, i]) => {
            const e = this[t];
            return `${i}:${"function" === typeof e ? e : `'${e}'`}`;
        })).join(",");
    }
    clone() {
        return new RouterOptions(this.useUrlFragmentHash, this.useHref, this.resolutionMode, this.historyStrategy, this.sameUrlStrategy, this.buildTitle);
    }
    toString() {
        return `RO(${this.stringifyProperties()})`;
    }
}

class NavigationOptions extends RouterOptions {
    constructor(t, i, e, s, n, o, r, h) {
        super(t.useUrlFragmentHash, t.useHref, t.resolutionMode, t.historyStrategy, t.sameUrlStrategy, t.buildTitle);
        this.title = i;
        this.titleSeparator = e;
        this.append = s;
        this.context = n;
        this.queryParams = o;
        this.fragment = r;
        this.state = h;
    }
    static get DEFAULT() {
        return NavigationOptions.create({});
    }
    static create(t) {
        var i, e, s, n, o, r, h;
        return new NavigationOptions(RouterOptions.create(t), null !== (i = t.title) && void 0 !== i ? i : null, null !== (e = t.titleSeparator) && void 0 !== e ? e : " | ", null !== (s = t.append) && void 0 !== s ? s : false, null !== (n = t.context) && void 0 !== n ? n : null, null !== (o = t.queryParams) && void 0 !== o ? o : null, null !== (r = t.fragment) && void 0 !== r ? r : "", null !== (h = t.state) && void 0 !== h ? h : null);
    }
    clone() {
        return new NavigationOptions(super.clone(), this.title, this.titleSeparator, this.append, this.context, {
            ...this.queryParams
        }, this.fragment, null === this.state ? null : {
            ...this.state
        });
    }
    toString() {
        return `NO(${super.stringifyProperties()})`;
    }
}

class Navigation {
    constructor(t, i, e, s, n, o) {
        this.id = t;
        this.instructions = i;
        this.trigger = e;
        this.options = s;
        this.prevNavigation = n;
        this.finalInstructions = o;
    }
    static create(t) {
        return new Navigation(t.id, t.instructions, t.trigger, t.options, t.prevNavigation, t.finalInstructions);
    }
    toString() {
        return `N(id:${this.id},instructions:${this.instructions},trigger:'${this.trigger}')`;
    }
}

class Transition {
    constructor(t, i, e, s, n, o, r, h, a, u, c, l, d, f, p) {
        this.id = t;
        this.prevInstructions = i;
        this.instructions = e;
        this.finalInstructions = s;
        this.instructionsChanged = n;
        this.trigger = o;
        this.options = r;
        this.managedState = h;
        this.previousRouteTree = a;
        this.routeTree = u;
        this.promise = c;
        this.resolve = l;
        this.reject = d;
        this.guardsResult = f;
        this.error = p;
    }
    static create(t) {
        return new Transition(t.id, t.prevInstructions, t.instructions, t.finalInstructions, t.instructionsChanged, t.trigger, t.options, t.managedState, t.previousRouteTree, t.routeTree, t.promise, t.resolve, t.reject, t.guardsResult, void 0);
    }
    run(t, i) {
        if (true !== this.guardsResult) return;
        try {
            const e = t();
            if (e instanceof Promise) e.then(i).catch((t => {
                this.handleError(t);
            })); else i(e);
        } catch (t) {
            this.handleError(t);
        }
    }
    handleError(t) {
        this.reject(this.error = t);
    }
    toString() {
        return `T(id:${this.id},trigger:'${this.trigger}',instructions:${this.instructions},options:${this.options})`;
    }
}

const tt = i.DI.createInterface("IRouter", (t => t.singleton(exports.Router)));

exports.Router = class Router {
    constructor(t, i, e, s, n) {
        this.container = t;
        this.p = i;
        this.logger = e;
        this.events = s;
        this.locationMgr = n;
        this.t = null;
        this.i = null;
        this.h = null;
        this.options = RouterOptions.DEFAULT;
        this.navigated = false;
        this.navigationId = 0;
        this.lastSuccessfulNavigation = null;
        this.activeNavigation = null;
        this.instructions = ViewportInstructionTree.create("");
        this.nextTr = null;
        this.locationChangeSubscription = null;
        this.u = false;
        this.$ = false;
        this.vpaLookup = new Map;
        this.logger = e.root.scopeTo("Router");
    }
    get ctx() {
        let t = this.t;
        if (null === t) {
            if (!this.container.has(dt, true)) throw new Error(`Root RouteContext is not set. Did you forget to register RouteConfiguration, or try to navigate before calling Aurelia.start()?`);
            t = this.t = this.container.get(dt);
        }
        return t;
    }
    get routeTree() {
        let t = this.i;
        if (null === t) {
            const i = this.ctx;
            t = this.i = new RouteTree(NavigationOptions.create({
                ...this.options
            }), J, null, RouteNode.create({
                path: "",
                finalPath: "",
                context: i,
                instruction: null,
                component: i.definition.component,
                append: false,
                title: i.definition.config.title
            }));
        }
        return t;
    }
    get currentTr() {
        let t = this.h;
        if (null === t) t = this.h = Transition.create({
            id: 0,
            prevInstructions: this.instructions,
            instructions: this.instructions,
            finalInstructions: this.instructions,
            instructionsChanged: true,
            trigger: "api",
            options: NavigationOptions.DEFAULT,
            managedState: null,
            previousRouteTree: this.routeTree.clone(),
            routeTree: this.routeTree,
            resolve: null,
            reject: null,
            promise: null,
            guardsResult: true,
            error: void 0
        });
        return t;
    }
    set currentTr(t) {
        this.h = t;
    }
    get isNavigating() {
        return this.$;
    }
    resolveContext(t) {
        return RouteContext.resolve(this.ctx, t);
    }
    start(t, i) {
        this.options = RouterOptions.create(t);
        this.u = "function" === typeof this.options.buildTitle;
        this.locationMgr.startListening();
        this.locationChangeSubscription = this.events.subscribe("au:router:location-change", (t => {
            this.p.taskQueue.queueTask((() => {
                const i = K(t.state) ? t.state : null;
                const e = NavigationOptions.create({
                    ...this.options,
                    historyStrategy: "replace"
                });
                const s = ViewportInstructionTree.create(t.url, e);
                this.enqueue(s, t.trigger, i, null);
            }));
        }));
        if (!this.navigated && i) return this.load(this.locationMgr.getPath(), {
            historyStrategy: "replace"
        });
    }
    stop() {
        var t;
        this.locationMgr.stopListening();
        null === (t = this.locationChangeSubscription) || void 0 === t ? void 0 : t.dispose();
    }
    load(t, i) {
        const e = this.createViewportInstructions(t, i);
        this.logger.trace("load(instructions:%s)", e);
        return this.enqueue(e, "api", null, null);
    }
    isActive(t, i) {
        const e = this.resolveContext(i);
        const s = this.createViewportInstructions(t, {
            context: e
        });
        this.logger.trace("isActive(instructions:%s,ctx:%s)", s, e);
        return this.routeTree.contains(s);
    }
    getRouteContext(t, e, s, n, o) {
        const r = n.get(i.ILogger).scopeTo("RouteContext");
        const h = RouteDefinition.resolve("function" === typeof (null === s || void 0 === s ? void 0 : s.getRouteConfig) ? s : e.Type, o, null);
        let a = this.vpaLookup.get(t);
        if (void 0 === a) this.vpaLookup.set(t, a = new WeakMap);
        let u = a.get(h);
        if (void 0 === u) {
            r.trace(`creating new RouteContext for %s`, h);
            const i = n.has(dt, true) ? n.get(dt) : null;
            a.set(h, u = new RouteContext(t, i, e, h, n, this));
        } else {
            r.trace(`returning existing RouteContext for %s`, h);
            if (null !== t) u.vpa = t;
        }
        return u;
    }
    createViewportInstructions(t, i) {
        if ("string" === typeof t) t = this.locationMgr.removeBaseHref(t);
        return ViewportInstructionTree.create(t, this.getNavigationOptions(i));
    }
    enqueue(t, i, e, s) {
        const n = this.currentTr;
        const o = this.logger;
        if ("api" !== i && "api" === n.trigger && n.instructions.equals(t)) {
            o.debug(`Ignoring navigation triggered by '%s' because it is the same URL as the previous navigation which was triggered by 'api'.`, i);
            return true;
        }
        let r;
        let h;
        let a;
        if (null === s) a = new Promise((function(t, i) {
            r = t;
            h = i;
        })); else {
            o.debug(`Reusing promise/resolve/reject from the previously failed transition %s`, s);
            a = s.promise;
            r = s.resolve;
            h = s.reject;
        }
        const u = this.nextTr = Transition.create({
            id: ++this.navigationId,
            trigger: i,
            managedState: e,
            prevInstructions: n.finalInstructions,
            finalInstructions: t,
            instructionsChanged: !n.finalInstructions.equals(t),
            instructions: t,
            options: t.options,
            promise: a,
            resolve: r,
            reject: h,
            previousRouteTree: this.routeTree,
            routeTree: this.i = this.routeTree.clone(),
            guardsResult: true,
            error: void 0
        });
        o.debug(`Scheduling transition: %s`, u);
        if (null === this.activeNavigation) try {
            this.run(u);
        } catch (t) {
            u.handleError(t);
        }
        return u.promise.then((t => {
            o.debug(`Transition succeeded: %s`, u);
            return t;
        })).catch((t => {
            o.error(`Navigation failed: %s`, u, t);
            this.activeNavigation = null;
            const i = this.nextTr;
            if (null !== i) i.previousRouteTree = u.previousRouteTree; else this.i = u.previousRouteTree;
            throw t;
        }));
    }
    run(t) {
        this.currentTr = t;
        this.nextTr = null;
        const i = null === this.lastSuccessfulNavigation ? null : Navigation.create({
            ...this.lastSuccessfulNavigation,
            prevNavigation: null
        });
        this.activeNavigation = Navigation.create({
            id: t.id,
            instructions: t.instructions,
            trigger: t.trigger,
            options: t.options,
            prevNavigation: i,
            finalInstructions: t.finalInstructions
        });
        const e = this.resolveContext(t.options.context);
        const s = !this.navigated || t.instructions.children.length !== e.node.children.length || t.instructions.children.some(((t, i) => {
            var s, n;
            return !(null !== (n = null === (s = e.node.children[i]) || void 0 === s ? void 0 : s.originalInstruction.equals(t)) && void 0 !== n ? n : false);
        }));
        const n = s || "reload" === t.options.getSameUrlStrategy(this.instructions);
        if (!n) {
            this.logger.trace(`run(tr:%s) - NOT processing route`, t);
            this.navigated = true;
            this.activeNavigation = null;
            t.resolve(false);
            this.runNextTransition(t);
            return;
        }
        this.logger.trace(`run(tr:%s) - processing route`, t);
        this.$ = true;
        this.events.publish(new NavigationStartEvent(t.id, t.instructions, t.trigger, t.managedState));
        if (null !== this.nextTr) {
            this.logger.debug(`run(tr:%s) - aborting because a new transition was queued in response to the NavigationStartEvent`, t);
            return this.run(this.nextTr);
        }
        this.activeNavigation = Navigation.create({
            ...this.activeNavigation,
            finalInstructions: t.finalInstructions
        });
        t.run((() => {
            this.logger.trace(`run() - compiling route tree: %s`, t.finalInstructions);
            return B(t.routeTree, t.finalInstructions, e);
        }), (() => {
            const i = t.previousRouteTree.root.children;
            const e = t.routeTree.root.children;
            const s = o(i, e);
            Batch.start((e => {
                this.logger.trace(`run() - invoking canUnload on ${i.length} nodes`);
                for (const s of i) s.context.vpa.canUnload(t, e);
            })).continueWith((i => {
                if (true !== t.guardsResult) {
                    i.push();
                    this.cancelNavigation(t);
                }
            })).continueWith((i => {
                this.logger.trace(`run() - invoking canLoad on ${e.length} nodes`);
                for (const s of e) s.context.vpa.canLoad(t, i);
            })).continueWith((i => {
                if (true !== t.guardsResult) {
                    i.push();
                    this.cancelNavigation(t);
                }
            })).continueWith((e => {
                this.logger.trace(`run() - invoking unload on ${i.length} nodes`);
                for (const s of i) s.context.vpa.unload(t, e);
            })).continueWith((i => {
                this.logger.trace(`run() - invoking load on ${e.length} nodes`);
                for (const s of e) s.context.vpa.load(t, i);
            })).continueWith((i => {
                this.logger.trace(`run() - invoking swap on ${s.length} nodes`);
                for (const e of s) e.context.vpa.swap(t, i);
            })).continueWith((() => {
                this.logger.trace(`run() - finalizing transition`);
                s.forEach((function(t) {
                    t.context.vpa.endTransition();
                }));
                this.navigated = true;
                this.instructions = t.finalInstructions = t.routeTree.finalizeInstructions();
                this.$ = false;
                this.events.publish(new NavigationEndEvent(t.id, t.instructions, this.instructions));
                this.lastSuccessfulNavigation = this.activeNavigation;
                this.activeNavigation = null;
                this.applyHistoryState(t);
                t.resolve(true);
                this.runNextTransition(t);
            })).start();
        }));
    }
    applyHistoryState(t) {
        const i = t.finalInstructions.toUrl(this.options.useUrlFragmentHash);
        switch (t.options.getHistoryStrategy(this.instructions)) {
          case "none":
            break;

          case "push":
            this.locationMgr.pushState(Q(t.options.state, t.id), this.updateTitle(t), i);
            break;

          case "replace":
            this.locationMgr.replaceState(Q(t.options.state, t.id), this.updateTitle(t), i);
            break;
        }
    }
    getTitle(t) {
        var i, e;
        switch (typeof t.options.title) {
          case "function":
            return null !== (i = t.options.title.call(void 0, t.routeTree.root)) && void 0 !== i ? i : "";

          case "string":
            return t.options.title;

          default:
            return null !== (e = t.routeTree.root.getTitle(t.options.titleSeparator)) && void 0 !== e ? e : "";
        }
    }
    updateTitle(t = this.currentTr) {
        var i;
        const e = this.u ? null !== (i = this.options.buildTitle(t)) && void 0 !== i ? i : "" : this.getTitle(t);
        if (e.length > 0) this.p.document.title = e;
        return this.p.document.title;
    }
    cancelNavigation(t) {
        this.logger.trace(`cancelNavigation(tr:%s)`, t);
        const e = t.previousRouteTree.root.children;
        const s = t.routeTree.root.children;
        const n = o(e, s);
        n.forEach((function(t) {
            t.context.vpa.cancelUpdate();
        }));
        this.activeNavigation = null;
        this.instructions = t.prevInstructions;
        this.i = t.previousRouteTree;
        this.$ = false;
        this.events.publish(new NavigationCancelEvent(t.id, t.instructions, `guardsResult is ${t.guardsResult}`));
        if (false === t.guardsResult) {
            t.resolve(false);
            this.runNextTransition(t);
        } else void i.onResolve(this.enqueue(t.guardsResult, "api", t.managedState, t), (() => {
            this.logger.trace(`cancelNavigation(tr:%s) - finished redirect`, t);
        }));
    }
    runNextTransition(t) {
        if (null !== this.nextTr) {
            this.logger.trace(`runNextTransition(tr:%s) -> scheduling nextTransition: %s`, t, this.nextTr);
            this.p.taskQueue.queueTask((() => {
                const t = this.nextTr;
                if (null !== t) try {
                    this.run(t);
                } catch (i) {
                    t.handleError(i);
                }
            }));
        }
    }
    getNavigationOptions(t) {
        return NavigationOptions.create({
            ...this.options,
            ...t
        });
    }
};

exports.Router = x([ $(0, i.IContainer), $(1, e.IPlatform), $(2, i.ILogger), $(3, E), $(4, b) ], exports.Router);

const it = i.DI.createInterface("IViewportInstruction");

class ViewportInstruction {
    constructor(t, i, e, s, n, o, r, h) {
        this.context = t;
        this.append = i;
        this.open = e;
        this.close = s;
        this.component = n;
        this.viewport = o;
        this.params = r;
        this.children = h;
    }
    static create(t, i) {
        var e, s, n, o, r, h, a, u, c;
        if (t instanceof ViewportInstruction) return t;
        if (f(t)) {
            const l = TypedNavigationInstruction.create(t.component);
            const d = null !== (s = null === (e = t.children) || void 0 === e ? void 0 : e.map(ViewportInstruction.create)) && void 0 !== s ? s : [];
            return new ViewportInstruction(null !== (o = null !== (n = t.context) && void 0 !== n ? n : i) && void 0 !== o ? o : null, null !== (r = t.append) && void 0 !== r ? r : false, null !== (h = t.open) && void 0 !== h ? h : 0, null !== (a = t.close) && void 0 !== a ? a : 0, l, null !== (u = t.viewport) && void 0 !== u ? u : null, null !== (c = t.params) && void 0 !== c ? c : null, d);
        }
        const l = TypedNavigationInstruction.create(t);
        return new ViewportInstruction(null !== i && void 0 !== i ? i : null, false, 0, 0, l, null, null, []);
    }
    contains(t) {
        const i = this.children;
        const e = t.children;
        if (i.length < e.length) return false;
        if (!this.component.equals(t.component)) return false;
        for (let t = 0, s = e.length; t < s; ++t) if (!i[t].contains(e[t])) return false;
        return true;
    }
    equals(t) {
        const i = this.children;
        const e = t.children;
        if (i.length !== e.length) return false;
        if (!this.component.equals(t.component) || this.viewport !== t.viewport || !m(this.params, t.params)) return false;
        for (let t = 0, s = i.length; t < s; ++t) if (!i[t].equals(e[t])) return false;
        return true;
    }
    clone() {
        return new ViewportInstruction(this.context, this.append, this.open, this.close, this.component.clone(), this.viewport, null === this.params ? null : {
            ...this.params
        }, [ ...this.children ]);
    }
    toUrlComponent(t = true) {
        const i = this.component.toUrlComponent();
        const e = null === this.params || 0 === Object.keys(this.params).length ? "" : `(${et(this.params)})`;
        const s = 0 === i.length || null === this.viewport || 0 === this.viewport.length ? "" : `@${this.viewport}`;
        const n = `${"(".repeat(this.open)}${i}${e}${s}${")".repeat(this.close)}`;
        const o = t ? this.children.map((t => t.toUrlComponent())).join("+") : "";
        if (n.length > 0) {
            if (o.length > 0) return [ n, o ].join("/");
            return n;
        }
        return o;
    }
    toString() {
        const t = `c:${this.component}`;
        const i = null === this.viewport || 0 === this.viewport.length ? "" : `viewport:${this.viewport}`;
        const e = 0 === this.children.length ? "" : `children:[${this.children.map(String).join(",")}]`;
        const s = [ t, i, e ].filter(Boolean).join(",");
        return `VPI(${s})`;
    }
}

function et(t) {
    const e = Object.keys(t);
    const s = Array(e.length);
    const n = [];
    const o = [];
    for (const t of e) if (i.isArrayIndex(t)) n.push(Number(t)); else o.push(t);
    for (let i = 0; i < e.length; ++i) {
        const e = n.indexOf(i);
        if (e > -1) {
            s[i] = t[i];
            n.splice(e, 1);
        } else {
            const e = o.shift();
            s[i] = `${e}=${t[e]}`;
        }
    }
    return s.join(",");
}

const st = function() {
    let t = 0;
    const i = new Map;
    return function(e) {
        let s = i.get(e);
        if (void 0 === s) i.set(e, s = ++t);
        return s;
    };
}();

class ViewportInstructionTree {
    constructor(t, i, e, s, n) {
        this.options = t;
        this.isAbsolute = i;
        this.children = e;
        this.queryParams = s;
        this.fragment = n;
    }
    static create(t, i) {
        const e = NavigationOptions.create({
            ...i
        });
        if (t instanceof ViewportInstructionTree) return new ViewportInstructionTree(e, t.isAbsolute, t.children.map((t => ViewportInstruction.create(t, e.context))), t.queryParams, t.fragment);
        if (t instanceof Array) return new ViewportInstructionTree(e, false, t.map((t => ViewportInstruction.create(t, e.context))), J, null);
        if ("string" === typeof t) {
            const i = RouteExpression.parse(t, e.useUrlFragmentHash);
            return i.toInstructionTree(e);
        }
        return new ViewportInstructionTree(e, false, [ ViewportInstruction.create(t, e.context) ], J, null);
    }
    equals(t) {
        const i = this.children;
        const e = t.children;
        if (i.length !== e.length) return false;
        for (let t = 0, s = i.length; t < s; ++t) if (!i[t].equals(e[t])) return false;
        return true;
    }
    toUrl(t = false) {
        var i;
        let e;
        let s;
        if (t) {
            e = "";
            s = `#${this.toPath()}`;
        } else {
            e = this.toPath();
            s = null !== (i = this.fragment) && void 0 !== i ? i : "";
        }
        let n = this.queryParams.toString();
        n = "" === n ? "" : `?${n}`;
        const o = `${e}${s}${n}`;
        return o;
    }
    toPath() {
        const t = this.children.map((t => t.toUrlComponent())).join("+");
        return t;
    }
    toString() {
        return `[${this.children.map(String).join(",")}]`;
    }
}

var nt;

(function(t) {
    t[t["string"] = 0] = "string";
    t[t["ViewportInstruction"] = 1] = "ViewportInstruction";
    t[t["CustomElementDefinition"] = 2] = "CustomElementDefinition";
    t[t["Promise"] = 3] = "Promise";
    t[t["IRouteViewModel"] = 4] = "IRouteViewModel";
})(nt || (nt = {}));

class TypedNavigationInstruction {
    constructor(t, i) {
        this.type = t;
        this.value = i;
    }
    static create(i) {
        if (i instanceof TypedNavigationInstruction) return i;
        if ("string" === typeof i) return new TypedNavigationInstruction(0, i);
        if (!t.isObject(i)) p("function/class or object", "", i);
        if ("function" === typeof i) if (e.CustomElement.isType(i)) {
            const t = e.CustomElement.getDefinition(i);
            return new TypedNavigationInstruction(2, t);
        } else return TypedNavigationInstruction.create(i());
        if (i instanceof Promise) return new TypedNavigationInstruction(3, i);
        if (f(i)) {
            const t = ViewportInstruction.create(i);
            return new TypedNavigationInstruction(1, t);
        }
        if (e.isCustomElementViewModel(i)) return new TypedNavigationInstruction(4, i);
        if (i instanceof e.CustomElementDefinition) return new TypedNavigationInstruction(2, i);
        if (c(i)) {
            const t = e.CustomElement.define(i);
            const s = e.CustomElement.getDefinition(t);
            return new TypedNavigationInstruction(2, s);
        }
        throw new Error(`Invalid component ${r(i)}: must be either a class, a custom element ViewModel, or a (partial) custom element definition`);
    }
    equals(t) {
        switch (this.type) {
          case 2:
          case 4:
          case 3:
          case 0:
            return this.type === t.type && this.value === t.value;

          case 1:
            return this.type === t.type && this.value.equals(t.value);
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
            return `au$obj${st(this.value)}`;

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
            return `VM(name:'${e.CustomElement.getDefinition(this.value.constructor).name}')`;

          case 1:
            return this.value.toString();

          case 0:
            return `'${this.value}'`;
        }
    }
}

const ot = i.emptyArray;

function rt(t, i) {
    if (!m(t.params, i.params)) return "replace";
    return "none";
}

class RouteConfig {
    constructor(t, i, e, s, n, o, r, h, a, u, c, l) {
        this.id = t;
        this.path = i;
        this.title = e;
        this.redirectTo = s;
        this.caseSensitive = n;
        this.transitionPlan = o;
        this.viewport = r;
        this.data = h;
        this.routes = a;
        this.fallback = u;
        this.component = c;
        this.nav = l;
    }
    static create(t, i) {
        var e, s, n, o, r, h, a, u, c, l, d, f, g, w, m, x, $, E, y, R, b, S, k, C, I, N, A, T, V, P;
        if ("string" === typeof t || t instanceof Array) {
            const d = t;
            const f = null !== (e = null === i || void 0 === i ? void 0 : i.redirectTo) && void 0 !== e ? e : null;
            const p = null !== (s = null === i || void 0 === i ? void 0 : i.caseSensitive) && void 0 !== s ? s : false;
            const v = null !== (n = null === i || void 0 === i ? void 0 : i.id) && void 0 !== n ? n : d instanceof Array ? d[0] : d;
            const g = null !== (o = null === i || void 0 === i ? void 0 : i.title) && void 0 !== o ? o : null;
            const w = null !== (r = null === i || void 0 === i ? void 0 : i.transitionPlan) && void 0 !== r ? r : rt;
            const m = null !== (h = null === i || void 0 === i ? void 0 : i.viewport) && void 0 !== h ? h : null;
            const x = null !== (a = null === i || void 0 === i ? void 0 : i.data) && void 0 !== a ? a : {};
            const $ = null !== (u = null === i || void 0 === i ? void 0 : i.routes) && void 0 !== u ? u : ot;
            return new RouteConfig(v, d, g, f, p, w, m, x, $, null !== (c = null === i || void 0 === i ? void 0 : i.fallback) && void 0 !== c ? c : null, null, null !== (l = null === i || void 0 === i ? void 0 : i.nav) && void 0 !== l ? l : true);
        } else if ("object" === typeof t) {
            const e = t;
            v(e, "");
            const s = null !== (f = null !== (d = e.path) && void 0 !== d ? d : null === i || void 0 === i ? void 0 : i.path) && void 0 !== f ? f : null;
            const n = null !== (w = null !== (g = e.title) && void 0 !== g ? g : null === i || void 0 === i ? void 0 : i.title) && void 0 !== w ? w : null;
            const o = null !== (x = null !== (m = e.redirectTo) && void 0 !== m ? m : null === i || void 0 === i ? void 0 : i.redirectTo) && void 0 !== x ? x : null;
            const r = null !== (E = null !== ($ = e.caseSensitive) && void 0 !== $ ? $ : null === i || void 0 === i ? void 0 : i.caseSensitive) && void 0 !== E ? E : false;
            const h = null !== (R = null !== (y = e.id) && void 0 !== y ? y : null === i || void 0 === i ? void 0 : i.id) && void 0 !== R ? R : s instanceof Array ? s[0] : s;
            const a = null !== (S = null !== (b = e.transitionPlan) && void 0 !== b ? b : null === i || void 0 === i ? void 0 : i.transitionPlan) && void 0 !== S ? S : rt;
            const u = null !== (C = null !== (k = e.viewport) && void 0 !== k ? k : null === i || void 0 === i ? void 0 : i.viewport) && void 0 !== C ? C : null;
            const c = {
                ...null === i || void 0 === i ? void 0 : i.data,
                ...e.data
            };
            const l = [ ...null !== (I = e.routes) && void 0 !== I ? I : ot, ...null !== (N = null === i || void 0 === i ? void 0 : i.routes) && void 0 !== N ? N : ot ];
            return new RouteConfig(h, s, n, o, r, a, u, c, l, null !== (T = null !== (A = e.fallback) && void 0 !== A ? A : null === i || void 0 === i ? void 0 : i.fallback) && void 0 !== T ? T : null, null !== (V = e.component) && void 0 !== V ? V : null, null !== (P = e.nav) && void 0 !== P ? P : true);
        } else p("string, function/class or object", "", t);
    }
    applyChildRouteConfig(t) {
        var i, e, s, n, o, r, h, a, u, c, l, d, f;
        let p = null !== (i = this.path) && void 0 !== i ? i : "";
        if ("string" !== typeof p) p = p[0];
        v(t, p);
        return new RouteConfig(null !== (e = t.id) && void 0 !== e ? e : this.id, null !== (s = t.path) && void 0 !== s ? s : this.path, null !== (n = t.title) && void 0 !== n ? n : this.title, null !== (o = t.redirectTo) && void 0 !== o ? o : this.redirectTo, null !== (r = t.caseSensitive) && void 0 !== r ? r : this.caseSensitive, null !== (h = t.transitionPlan) && void 0 !== h ? h : this.transitionPlan, null !== (a = t.viewport) && void 0 !== a ? a : this.viewport, null !== (u = t.data) && void 0 !== u ? u : this.data, null !== (c = t.routes) && void 0 !== c ? c : this.routes, null !== (l = t.fallback) && void 0 !== l ? l : this.fallback, null !== (d = t.component) && void 0 !== d ? d : this.component, null !== (f = t.nav) && void 0 !== f ? f : this.nav);
    }
}

const ht = {
    name: i.Protocol.resource.keyFor("route-configuration"),
    isConfigured(i) {
        return t.Metadata.hasOwn(ht.name, i);
    },
    configure(i, e) {
        const s = RouteConfig.create(i, e);
        t.Metadata.define(ht.name, s, e);
        return e;
    },
    getConfig(i) {
        if (!ht.isConfigured(i)) ht.configure({}, i);
        return t.Metadata.getOwn(ht.name, i);
    }
};

function at(t) {
    return function(i) {
        return ht.configure(t, i);
    };
}

const ut = "default";

class RouteDefinition {
    constructor(t, i, e) {
        var s, n, o, r, u, c, l;
        this.config = t;
        this.component = i;
        this.hasExplicitPath = null !== t.path;
        this.caseSensitive = t.caseSensitive;
        this.path = h(null !== (s = t.path) && void 0 !== s ? s : i.name);
        this.redirectTo = null !== (n = t.redirectTo) && void 0 !== n ? n : null;
        this.viewport = null !== (o = t.viewport) && void 0 !== o ? o : ut;
        this.id = a(null !== (r = t.id) && void 0 !== r ? r : this.path);
        this.data = null !== (u = t.data) && void 0 !== u ? u : {};
        this.fallback = null !== (l = null !== (c = t.fallback) && void 0 !== c ? c : null === e || void 0 === e ? void 0 : e.fallback) && void 0 !== l ? l : null;
    }
    static resolve(t, s, n, o) {
        if (d(t)) return new RouteDefinition(RouteConfig.create(t, null), null, s);
        const r = this.createNavigationInstruction(t);
        let h;
        switch (r.type) {
          case 0:
            {
                if (void 0 === o) throw new Error(`When retrieving the RouteDefinition for a component name, a RouteContext (that can resolve it) must be provided`);
                const t = o.container.find(e.CustomElement, r.value);
                if (null === t) throw new Error(`Could not find a CustomElement named '${r.value}' in the current container scope of ${o}. This means the component is neither registered at Aurelia startup nor via the 'dependencies' decorator or static property.`);
                h = t;
                break;
            }

          case 2:
            h = r.value;
            break;

          case 4:
            h = e.CustomElement.getDefinition(r.value.constructor);
            break;

          case 3:
            if (void 0 === o) throw new Error(`RouteContext must be provided when resolving an imported module`);
            h = o.resolveLazy(r.value);
            break;
        }
        return i.onResolve(h, (e => {
            var o, h, a, u;
            let c = ct.get(e);
            const d = 4 === r.type && "function" === typeof t.getRouteConfig;
            if (null === c) {
                const r = e.Type;
                let h = null;
                if (d) h = RouteConfig.create(null !== (o = t.getRouteConfig(s, n)) && void 0 !== o ? o : i.emptyObject, r); else h = l(t) ? ht.isConfigured(r) ? ht.getConfig(r).applyChildRouteConfig(t) : RouteConfig.create(t, r) : ht.getConfig(e.Type);
                c = new RouteDefinition(h, e, s);
                ct.define(c, e);
            } else if (0 === c.config.routes.length && d) c.applyChildRouteConfig(null !== (u = null === (a = (h = t).getRouteConfig) || void 0 === a ? void 0 : a.call(h, s, n)) && void 0 !== u ? u : i.emptyObject);
            return c;
        }));
    }
    static createNavigationInstruction(t) {
        return l(t) ? this.createNavigationInstruction(t.component) : TypedNavigationInstruction.create(t);
    }
    applyChildRouteConfig(t) {
        var i, e, s, n, o, r, u;
        this.config = t = this.config.applyChildRouteConfig(t);
        this.hasExplicitPath = null !== t.path;
        this.caseSensitive = null !== (i = t.caseSensitive) && void 0 !== i ? i : this.caseSensitive;
        this.path = h(null !== (e = t.path) && void 0 !== e ? e : this.path);
        this.redirectTo = null !== (s = t.redirectTo) && void 0 !== s ? s : null;
        this.viewport = null !== (n = t.viewport) && void 0 !== n ? n : ut;
        this.id = a(null !== (o = t.id) && void 0 !== o ? o : this.path);
        this.data = null !== (r = t.data) && void 0 !== r ? r : {};
        this.fallback = null !== (u = t.fallback) && void 0 !== u ? u : this.fallback;
    }
    register(t) {
        var i;
        null === (i = this.component) || void 0 === i ? void 0 : i.register(t);
    }
    toUrlComponent() {
        return "not-implemented";
    }
    toString() {
        const t = null === this.config.path ? "null" : `'${this.config.path}'`;
        if (null !== this.component) return `RD(config.path:${t},c.name:'${this.component.name}',vp:'${this.viewport}')`; else return `RD(config.path:${t},redirectTo:'${this.redirectTo}')`;
    }
}

const ct = {
    name: i.Protocol.resource.keyFor("route-definition"),
    isDefined(i) {
        return t.Metadata.hasOwn(ct.name, i);
    },
    define(i, e) {
        t.Metadata.define(ct.name, i, e);
    },
    get(i) {
        return ct.isDefined(i) ? t.Metadata.getOwn(ct.name, i) : null;
    }
};

const lt = new WeakMap;

class ComponentAgent {
    constructor(t, e, s, n, o) {
        var r, h, a, u;
        this.instance = t;
        this.controller = e;
        this.definition = s;
        this.routeNode = n;
        this.ctx = o;
        this.R = o.container.get(i.ILogger).scopeTo(`ComponentAgent<${o.friendlyPath}>`);
        this.R.trace(`constructor()`);
        const c = e.lifecycleHooks;
        this.canLoadHooks = (null !== (r = c.canLoad) && void 0 !== r ? r : []).map((t => t.instance));
        this.loadHooks = (null !== (h = c.load) && void 0 !== h ? h : []).map((t => t.instance));
        this.canUnloadHooks = (null !== (a = c.canUnload) && void 0 !== a ? a : []).map((t => t.instance));
        this.unloadHooks = (null !== (u = c.unload) && void 0 !== u ? u : []).map((t => t.instance));
        this.C = "canLoad" in t;
        this.I = "load" in t;
        this.N = "canUnload" in t;
        this.A = "unload" in t;
    }
    static for(t, i, s, n) {
        let o = lt.get(t);
        if (void 0 === o) {
            const r = n.container;
            const h = RouteDefinition.resolve(t.constructor, n.definition, null);
            const a = e.Controller.$el(r, t, i.host, null);
            lt.set(t, o = new ComponentAgent(t, a, h, s, n));
        }
        return o;
    }
    activate(t, i, e) {
        if (null === t) {
            this.R.trace(`activate() - initial`);
            return this.controller.activate(this.controller, i, e);
        }
        this.R.trace(`activate()`);
        void this.controller.activate(t, i, e);
    }
    deactivate(t, i, e) {
        if (null === t) {
            this.R.trace(`deactivate() - initial`);
            return this.controller.deactivate(this.controller, i, e);
        }
        this.R.trace(`deactivate()`);
        void this.controller.deactivate(t, i, e);
    }
    dispose() {
        this.R.trace(`dispose()`);
        this.controller.dispose();
    }
    canUnload(t, i, e) {
        this.R.trace(`canUnload(next:%s) - invoking ${this.canUnloadHooks.length} hooks`, i);
        e.push();
        for (const s of this.canUnloadHooks) t.run((() => {
            e.push();
            return s.canUnload(this.instance, i, this.routeNode);
        }), (i => {
            if (true === t.guardsResult && true !== i) t.guardsResult = false;
            e.pop();
        }));
        if (this.N) t.run((() => {
            e.push();
            return this.instance.canUnload(i, this.routeNode);
        }), (i => {
            if (true === t.guardsResult && true !== i) t.guardsResult = false;
            e.pop();
        }));
        e.pop();
    }
    canLoad(t, i, e) {
        this.R.trace(`canLoad(next:%s) - invoking ${this.canLoadHooks.length} hooks`, i);
        e.push();
        for (const s of this.canLoadHooks) t.run((() => {
            e.push();
            return s.canLoad(this.instance, i.params, i, this.routeNode);
        }), (i => {
            if (true === t.guardsResult && true !== i) t.guardsResult = false === i ? false : ViewportInstructionTree.create(i);
            e.pop();
        }));
        if (this.C) t.run((() => {
            e.push();
            return this.instance.canLoad(i.params, i, this.routeNode);
        }), (i => {
            if (true === t.guardsResult && true !== i) t.guardsResult = false === i ? false : ViewportInstructionTree.create(i);
            e.pop();
        }));
        e.pop();
    }
    unload(t, i, e) {
        this.R.trace(`unload(next:%s) - invoking ${this.unloadHooks.length} hooks`, i);
        e.push();
        for (const s of this.unloadHooks) t.run((() => {
            e.push();
            return s.unload(this.instance, i, this.routeNode);
        }), (() => {
            e.pop();
        }));
        if (this.A) t.run((() => {
            e.push();
            return this.instance.unload(i, this.routeNode);
        }), (() => {
            e.pop();
        }));
        e.pop();
    }
    load(t, i, e) {
        this.R.trace(`load(next:%s) - invoking ${this.loadHooks.length} hooks`, i);
        e.push();
        for (const s of this.loadHooks) t.run((() => {
            e.push();
            return s.load(this.instance, i.params, i, this.routeNode);
        }), (() => {
            e.pop();
        }));
        if (this.I) t.run((() => {
            e.push();
            return this.instance.load(i.params, i, this.routeNode);
        }), (() => {
            e.pop();
        }));
        e.pop();
    }
    toString() {
        return `CA(ctx:'${this.ctx.friendlyPath}',c:'${this.definition.component.name}')`;
    }
}

const dt = i.DI.createInterface("IRouteContext");

const ft = "au$residue";

class RouteContext {
    constructor(t, n, o, r, h, a) {
        this.parent = n;
        this.component = o;
        this.definition = r;
        this.parentContainer = h;
        this.childViewportAgents = [];
        this.childRoutes = [];
        this.T = null;
        this.V = null;
        this.prevNode = null;
        this.P = null;
        this.L = null;
        this.U = false;
        this.L = t;
        if (null === n) {
            this.root = this;
            this.path = [ this ];
            this.friendlyPath = o.name;
        } else {
            this.root = n.root;
            this.path = [ ...n.path, this ];
            this.friendlyPath = `${n.friendlyPath}/${o.name}`;
        }
        this.logger = h.get(i.ILogger).scopeTo(`RouteContext<${this.friendlyPath}>`);
        this.logger.trace("constructor()");
        this.moduleLoader = h.get(i.IModuleLoader);
        const u = this.container = h.createChild();
        u.registerResolver(e.IController, this.hostControllerProvider = new i.InstanceProvider, true);
        u.registerResolver(dt, new i.InstanceProvider("IRouteContext", this));
        u.register(r);
        u.register(...o.dependencies);
        this.recognizer = new s.RouteRecognizer;
        const c = this.O = new NavigationModel([]);
        u.get(E).subscribe("au:router:navigation-end", (() => c.setIsActive(a, this)));
        this.processDefinition(r);
    }
    get isRoot() {
        return null === this.parent;
    }
    get depth() {
        return this.path.length - 1;
    }
    get resolved() {
        return this.T;
    }
    get allResolved() {
        return this.V;
    }
    get node() {
        const t = this.P;
        if (null === t) throw new Error(`Invariant violation: RouteNode should be set immediately after the RouteContext is created. Context: ${this}`);
        return t;
    }
    set node(t) {
        const i = this.prevNode = this.P;
        if (i !== t) {
            this.P = t;
            this.logger.trace(`Node changed from %s to %s`, this.prevNode, t);
        }
    }
    get vpa() {
        const t = this.L;
        if (null === t) throw new Error(`RouteContext has no ViewportAgent: ${this}`);
        return t;
    }
    set vpa(t) {
        if (null === t || void 0 === t) throw new Error(`Cannot set ViewportAgent to ${t} for RouteContext: ${this}`);
        const i = this.L;
        if (i !== t) {
            this.L = t;
            this.logger.trace(`ViewportAgent changed from %s to %s`, i, t);
        }
    }
    get navigationModel() {
        return this.O;
    }
    processDefinition(t) {
        var e, s, n;
        const o = [];
        const r = [];
        const a = t.config.routes;
        const u = a.length;
        if (0 === u) {
            const i = null === (s = null === (e = t.component) || void 0 === e ? void 0 : e.Type.prototype) || void 0 === s ? void 0 : s.getRouteConfig;
            this.U = null == i ? true : "function" !== typeof i;
            return;
        }
        const c = this.O;
        let d = 0;
        for (;d < u; d++) {
            const e = a[d];
            if (e instanceof Promise) {
                const t = this.addRoute(e);
                o.push(t);
                r.push(t);
            } else {
                const s = RouteDefinition.resolve(e, t, null, this);
                if (s instanceof Promise) if (l(e) && null != e.path) {
                    for (const t of h(e.path)) this.$addRoute(t, null !== (n = e.caseSensitive) && void 0 !== n ? n : false, s);
                    const t = this.childRoutes.length;
                    const o = s.then((i => this.childRoutes[t] = i));
                    this.childRoutes.push(o);
                    c.addRoute(o);
                    r.push(o.then(i.noop));
                } else throw new Error(`Invalid route config. When the component property is a lazy import, the path must be specified.`); else {
                    for (const t of s.path) this.$addRoute(t, s.caseSensitive, s);
                    this.childRoutes.push(s);
                    c.addRoute(s);
                }
            }
        }
        this.U = true;
        if (o.length > 0) this.T = Promise.all(o).then((() => {
            this.T = null;
        }));
        if (r.length > 0) this.V = Promise.all(r).then((() => {
            this.V = null;
        }));
    }
    static setRoot(t) {
        const s = t.get(i.ILogger).scopeTo("RouteContext");
        if (!t.has(e.IAppRoot, true)) vt(new Error(`The provided container has no registered IAppRoot. RouteContext.setRoot can only be used after Aurelia.app was called, on a container that is within that app's component tree.`), s);
        if (t.has(dt, true)) vt(new Error(`A root RouteContext is already registered. A possible cause is the RouterConfiguration being registered more than once in the same container tree. If you have a multi-rooted app, make sure you register RouterConfiguration only in the "forked" containers and not in the common root.`), s);
        const {controller: n} = t.get(e.IAppRoot);
        if (void 0 === n) vt(new Error(`The provided IAppRoot does not (yet) have a controller. A possible cause is calling this API manually before Aurelia.start() is called`), s);
        const o = t.get(tt);
        const r = o.getRouteContext(null, n.definition, n.viewModel, n.container, null);
        t.register(i.Registration.instance(dt, r));
        r.node = o.routeTree.root;
    }
    static resolve(t, s) {
        const n = t.container;
        const o = n.get(i.ILogger).scopeTo("RouteContext");
        if (null === s || void 0 === s) {
            o.trace(`resolve(context:%s) - returning root RouteContext`, s);
            return t;
        }
        if (pt(s)) {
            o.trace(`resolve(context:%s) - returning provided RouteContext`, s);
            return s;
        }
        if (s instanceof n.get(e.IPlatform).Node) try {
            const t = e.CustomElement.for(s, {
                searchParents: true
            });
            o.trace(`resolve(context:Node(nodeName:'${s.nodeName}'),controller:'${t.definition.name}') - resolving RouteContext from controller's RenderContext`);
            return t.container.get(dt);
        } catch (t) {
            o.error(`Failed to resolve RouteContext from Node(nodeName:'${s.nodeName}')`, t);
            throw t;
        }
        if (e.isCustomElementViewModel(s)) {
            const t = s.$controller;
            o.trace(`resolve(context:CustomElementViewModel(name:'${t.definition.name}')) - resolving RouteContext from controller's RenderContext`);
            return t.container.get(dt);
        }
        if (e.isCustomElementController(s)) {
            const t = s;
            o.trace(`resolve(context:CustomElementController(name:'${t.definition.name}')) - resolving RouteContext from controller's RenderContext`);
            return t.container.get(dt);
        }
        vt(new Error(`Invalid context type: ${Object.prototype.toString.call(s)}`), o);
    }
    dispose() {
        this.container.dispose();
    }
    resolveViewportAgent(t) {
        this.logger.trace(`resolveViewportAgent(req:%s)`, t);
        const i = this.childViewportAgents.find((i => i.handles(t)));
        if (void 0 === i) throw new Error(`Failed to resolve ${t} at:\n${this.printTree()}`);
        return i;
    }
    getAvailableViewportAgents(t) {
        return this.childViewportAgents.filter((i => i.isAvailable(t)));
    }
    getFallbackViewportAgent(t, i) {
        var e;
        return null !== (e = this.childViewportAgents.find((e => e.isAvailable(t) && e.viewport.name === i && e.viewport.fallback.length > 0))) && void 0 !== e ? e : null;
    }
    createComponentAgent(t, i) {
        this.logger.trace(`createComponentAgent(routeNode:%s)`, i);
        this.hostControllerProvider.prepare(t);
        const e = this.container.get(i.component.key);
        if (!this.U) {
            const t = RouteDefinition.resolve(e, this.definition, i);
            this.processDefinition(t);
        }
        const s = ComponentAgent.for(e, t, i, this);
        this.hostControllerProvider.dispose();
        return s;
    }
    registerViewport(t) {
        const i = ViewportAgent.for(t, this);
        if (this.childViewportAgents.includes(i)) this.logger.trace(`registerViewport(agent:%s) -> already registered, so skipping`, i); else {
            this.logger.trace(`registerViewport(agent:%s) -> adding`, i);
            this.childViewportAgents.push(i);
        }
        return i;
    }
    unregisterViewport(t) {
        const i = ViewportAgent.for(t, this);
        if (this.childViewportAgents.includes(i)) {
            this.logger.trace(`unregisterViewport(agent:%s) -> unregistering`, i);
            this.childViewportAgents.splice(this.childViewportAgents.indexOf(i), 1);
        } else this.logger.trace(`unregisterViewport(agent:%s) -> not registered, so skipping`, i);
    }
    recognize(t, i = false) {
        var e;
        this.logger.trace(`recognize(path:'${t}')`);
        let s = this;
        let n = true;
        let o = null;
        while (n) {
            o = s.recognizer.recognize(t);
            if (null === o) {
                if (!i || s.isRoot) return null;
                s = s.parent;
            } else n = false;
        }
        let r;
        if (Reflect.has(o.params, ft)) r = null !== (e = o.params[ft]) && void 0 !== e ? e : null; else r = null;
        return new $RecognizedRoute(o, r);
    }
    addRoute(t) {
        this.logger.trace(`addRoute(routeable:'${t}')`);
        return i.onResolve(RouteDefinition.resolve(t, this.definition, null, this), (t => {
            for (const i of t.path) this.$addRoute(i, t.caseSensitive, t);
            this.O.addRoute(t);
            this.childRoutes.push(t);
        }));
    }
    $addRoute(t, i, e) {
        this.recognizer.add({
            path: t,
            caseSensitive: i,
            handler: e
        });
        this.recognizer.add({
            path: `${t}/*${ft}`,
            caseSensitive: i,
            handler: e
        });
    }
    resolveLazy(t) {
        return this.moduleLoader.load(t, (i => {
            let e;
            let s;
            for (const t of i.items) if (t.isConstructable) {
                const i = t.definitions.find(gt);
                if (void 0 !== i) if ("default" === t.key) e = i; else if (void 0 === s) s = i;
            }
            if (void 0 === e) {
                if (void 0 === s) throw new Error(`${t} does not appear to be a component or CustomElement recognizable by Aurelia`);
                return s;
            }
            return e;
        }));
    }
    toString() {
        const t = this.childViewportAgents;
        const i = t.map(String).join(",");
        return `RC(path:'${this.friendlyPath}',viewports:[${i}])`;
    }
    printTree() {
        const t = [];
        for (let i = 0; i < this.path.length; ++i) t.push(`${" ".repeat(i)}${this.path[i]}`);
        return t.join("\n");
    }
}

function pt(t) {
    return t instanceof RouteContext;
}

function vt(t, i) {
    i.error(t);
    throw t;
}

function gt(t) {
    return e.CustomElement.isType(t.Type);
}

class $RecognizedRoute {
    constructor(t, i) {
        this.route = t;
        this.residue = i;
    }
    toString() {
        const t = this.route;
        const i = t.endpoint.route;
        return `RR(route:(endpoint:(route:(path:${i.path},handler:${i.handler})),params:${JSON.stringify(t.params)}),residue:${this.residue})`;
    }
}

i.DI.createInterface("INavigationModel");

class NavigationModel {
    constructor(t) {
        this.routes = t;
        this.j = void 0;
    }
    resolve() {
        return i.onResolve(this.j, i.noop);
    }
    setIsActive(t, i) {
        for (const e of this.routes) e.setIsActive(t, i);
    }
    addRoute(t) {
        const e = this.routes;
        if (!(t instanceof Promise)) {
            if (t.config.nav) e.push(NavigationRoute.create(t));
            return;
        }
        const s = e.length;
        e.push(void 0);
        let n;
        n = this.j = i.onResolve(this.j, (() => i.onResolve(t, (t => {
            if (t.config.nav) e[s] = NavigationRoute.create(t); else e.splice(s, 1);
            if (this.j === n) this.j = void 0;
        }))));
    }
}

class NavigationRoute {
    constructor(t, i, e, s) {
        this.id = t;
        this.path = i;
        this.title = e;
        this.data = s;
    }
    static create(t) {
        return new NavigationRoute(t.id, t.path, t.config.title, t.data);
    }
    get isActive() {
        return this.M;
    }
    setIsActive(t, i) {
        this.M = this.path.some((e => t.isActive(e, i)));
    }
}

exports.ViewportCustomElement = class ViewportCustomElement {
    constructor(t, i) {
        this.logger = t;
        this.ctx = i;
        this.name = ut;
        this.usedBy = "";
        this.default = "";
        this.fallback = "";
        this.stateful = false;
        this.agent = void 0;
        this.controller = void 0;
        this.logger = t.scopeTo(`au-viewport<${i.friendlyPath}>`);
        this.logger.trace("constructor()");
    }
    hydrated(t) {
        this.logger.trace("hydrated()");
        this.controller = t;
        this.agent = this.ctx.registerViewport(this);
    }
    attaching(t, i, e) {
        this.logger.trace("attaching()");
        return this.agent.activateFromViewport(t, this.controller, e);
    }
    detaching(t, i, e) {
        this.logger.trace("detaching()");
        return this.agent.deactivateFromViewport(t, this.controller, e);
    }
    dispose() {
        this.logger.trace("dispose()");
        this.ctx.unregisterViewport(this);
        this.agent.dispose();
        this.agent = void 0;
    }
    toString() {
        const t = [];
        for (const i of wt) {
            const e = this[i];
            switch (typeof e) {
              case "string":
                if ("" !== e) t.push(`${i}:'${e}'`);
                break;

              case "boolean":
                if (e) t.push(`${i}:${e}`);
                break;

              default:
                t.push(`${i}:${String(e)}`);
            }
        }
        return `VP(ctx:'${this.ctx.friendlyPath}',${t.join(",")})`;
    }
};

x([ e.bindable ], exports.ViewportCustomElement.prototype, "name", void 0);

x([ e.bindable ], exports.ViewportCustomElement.prototype, "usedBy", void 0);

x([ e.bindable ], exports.ViewportCustomElement.prototype, "default", void 0);

x([ e.bindable ], exports.ViewportCustomElement.prototype, "fallback", void 0);

x([ e.bindable ], exports.ViewportCustomElement.prototype, "stateful", void 0);

exports.ViewportCustomElement = x([ e.customElement({
    name: "au-viewport"
}), $(0, i.ILogger), $(1, dt) ], exports.ViewportCustomElement);

const wt = [ "name", "usedBy", "default", "fallback", "stateful" ];

exports.LoadCustomAttribute = class LoadCustomAttribute {
    constructor(t, i, e, s, n, o, r) {
        this.target = t;
        this.el = i;
        this.router = e;
        this.events = s;
        this.delegator = n;
        this.ctx = o;
        this.locationMgr = r;
        this.attribute = "href";
        this.active = false;
        this.href = null;
        this.instructions = null;
        this.eventListener = null;
        this.navigationEndListener = null;
        this.onClick = t => {
            if (null === this.instructions) return;
            if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey || 0 !== t.button) return;
            t.preventDefault();
            void this.router.load(this.instructions, {
                context: this.ctx
            });
        };
        this.isEnabled = !i.hasAttribute("external") && !i.hasAttribute("data-external");
    }
    binding() {
        if (this.isEnabled) this.eventListener = this.delegator.addEventListener(this.target, this.el, "click", this.onClick);
        this.valueChanged();
        this.navigationEndListener = this.events.subscribe("au:router:navigation-end", (t => {
            this.valueChanged();
            this.active = null !== this.instructions && this.router.isActive(this.instructions, this.ctx);
        }));
    }
    attaching() {
        if (null !== this.ctx.allResolved) return this.ctx.allResolved.then((() => {
            this.valueChanged();
        }));
    }
    unbinding() {
        if (this.isEnabled) this.eventListener.dispose();
        this.navigationEndListener.dispose();
    }
    valueChanged() {
        const t = this.router.options.useUrlFragmentHash;
        if (null !== this.route && void 0 !== this.route && null === this.ctx.allResolved) {
            const i = this.ctx.childRoutes.find((t => t.id === this.route));
            if (void 0 !== i) {
                const e = this.ctx.node.computeAbsolutePath();
                let s = i.path[0];
                if ("object" === typeof this.params && null !== this.params) {
                    const t = Object.keys(this.params);
                    for (const i of t) {
                        const t = this.params[i];
                        if (null != t && String(t).length > 0) s = s.replace(new RegExp(`[*:]${i}[?]?`), t);
                    }
                }
                s = s.replace(/\/[*:][^/]+[?]/g, "").replace(/[*:][^/]+[?]\//g, "");
                if (e) if (s) this.href = `${t ? "#" : ""}${[ e, s ].join("/")}`; else this.href = `${t ? "#" : ""}${e}`; else this.href = `${t ? "#" : ""}${s}`;
                this.instructions = this.router.createViewportInstructions(`${t ? "#" : ""}${s}`, {
                    context: this.ctx
                });
            } else {
                if ("object" === typeof this.params && null !== this.params) this.instructions = this.router.createViewportInstructions({
                    component: this.route,
                    params: this.params
                }, {
                    context: this.ctx
                }); else this.instructions = this.router.createViewportInstructions(this.route, {
                    context: this.ctx
                });
                this.href = this.instructions.toUrl(this.router.options.useUrlFragmentHash);
            }
        } else {
            this.instructions = null;
            this.href = null;
        }
        const i = e.CustomElement.for(this.el, {
            optional: true
        });
        if (null !== i) i.viewModel[this.attribute] = this.instructions; else if (null === this.href) this.el.removeAttribute(this.attribute); else {
            const i = t ? this.href : this.locationMgr.addBaseHref(this.href);
            this.el.setAttribute(this.attribute, i);
        }
    }
};

x([ e.bindable({
    mode: n.BindingMode.toView,
    primary: true,
    callback: "valueChanged"
}) ], exports.LoadCustomAttribute.prototype, "route", void 0);

x([ e.bindable({
    mode: n.BindingMode.toView,
    callback: "valueChanged"
}) ], exports.LoadCustomAttribute.prototype, "params", void 0);

x([ e.bindable({
    mode: n.BindingMode.toView
}) ], exports.LoadCustomAttribute.prototype, "attribute", void 0);

x([ e.bindable({
    mode: n.BindingMode.fromView
}) ], exports.LoadCustomAttribute.prototype, "active", void 0);

exports.LoadCustomAttribute = x([ e.customAttribute("load"), $(0, e.IEventTarget), $(1, e.INode), $(2, tt), $(3, E), $(4, e.IEventDelegator), $(5, dt), $(6, b) ], exports.LoadCustomAttribute);

exports.HrefCustomAttribute = class HrefCustomAttribute {
    constructor(t, i, e, s, n, o) {
        this.target = t;
        this.el = i;
        this.router = e;
        this.delegator = s;
        this.ctx = n;
        this.isInitialized = false;
        if (e.options.useHref && "A" === i.nodeName) switch (i.getAttribute("target")) {
          case null:
          case o.name:
          case "_self":
            this.isEnabled = true;
            break;

          default:
            this.isEnabled = false;
            break;
        } else this.isEnabled = false;
    }
    get isExternal() {
        return this.el.hasAttribute("external") || this.el.hasAttribute("data-external");
    }
    binding() {
        if (!this.isInitialized) {
            this.isInitialized = true;
            this.isEnabled = this.isEnabled && null === e.getRef(this.el, e.CustomAttribute.getDefinition(exports.LoadCustomAttribute).key);
        }
        if (null == this.value) this.el.removeAttribute("href"); else this.el.setAttribute("href", this.value);
        this.eventListener = this.delegator.addEventListener(this.target, this.el, "click", this);
    }
    unbinding() {
        this.eventListener.dispose();
    }
    valueChanged(t) {
        if (null == t) this.el.removeAttribute("href"); else this.el.setAttribute("href", t);
    }
    handleEvent(t) {
        this.B(t);
    }
    B(t) {
        if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey || 0 !== t.button || this.isExternal || !this.isEnabled) return;
        const i = this.el.getAttribute("href");
        if (null !== i) {
            t.preventDefault();
            void this.router.load(i, {
                context: this.ctx
            });
        }
    }
};

x([ e.bindable({
    mode: n.BindingMode.toView
}) ], exports.HrefCustomAttribute.prototype, "value", void 0);

exports.HrefCustomAttribute = x([ e.customAttribute({
    name: "href",
    noMultiBindings: true
}), $(0, e.IEventTarget), $(1, e.INode), $(2, tt), $(3, e.IEventDelegator), $(4, dt), $(5, e.IWindow) ], exports.HrefCustomAttribute);

const mt = tt;

const xt = [ mt ];

const $t = exports.ViewportCustomElement;

const Et = exports.LoadCustomAttribute;

const yt = exports.HrefCustomAttribute;

const Rt = [ exports.ViewportCustomElement, exports.LoadCustomAttribute, exports.HrefCustomAttribute ];

function bt(s, n) {
    var o;
    let r;
    let h = null;
    if (t.isObject(n)) if ("function" === typeof n) r = t => n(t); else {
        h = null !== (o = n.basePath) && void 0 !== o ? o : null;
        r = t => t.start(n, true);
    } else r = t => t.start({}, true);
    return s.register(i.Registration.cachedCallback(R, ((t, i, s) => {
        const n = t.get(e.IWindow);
        const o = new URL(n.document.baseURI);
        o.pathname = k(null !== h && void 0 !== h ? h : o.pathname);
        return o;
    })), e.AppTask.hydrated(i.IContainer, RouteContext.setRoot), e.AppTask.afterActivate(tt, r), e.AppTask.afterDeactivate(tt, (t => {
        t.stop();
    })), ...xt, ...Rt);
}

const St = {
    register(t) {
        return bt(t);
    },
    customize(t) {
        return {
            register(i) {
                return bt(i, t);
            }
        };
    }
};

class ScrollState {
    constructor(t) {
        this.el = t;
        this.top = t.scrollTop;
        this.left = t.scrollLeft;
    }
    static has(t) {
        return t.scrollTop > 0 || t.scrollLeft > 0;
    }
    restore() {
        this.el.scrollTo(this.left, this.top);
        this.el = null;
    }
}

function kt(t) {
    t.restore();
}

class HostElementState {
    constructor(t) {
        this.scrollStates = [];
        this.save(t.children);
    }
    save(t) {
        let i;
        for (let e = 0, s = t.length; e < s; ++e) {
            i = t[e];
            if (ScrollState.has(i)) this.scrollStates.push(new ScrollState(i));
            this.save(i.children);
        }
    }
    restore() {
        this.scrollStates.forEach(kt);
        this.scrollStates = null;
    }
}

const Ct = i.DI.createInterface("IStateManager", (t => t.singleton(ScrollStateManager)));

class ScrollStateManager {
    constructor() {
        this.cache = new WeakMap;
    }
    saveState(t) {
        this.cache.set(t.host, new HostElementState(t.host));
    }
    restoreState(t) {
        const i = this.cache.get(t.host);
        if (void 0 !== i) {
            i.restore();
            this.cache.delete(t.host);
        }
    }
}

exports.AST = T;

exports.ActionExpression = ActionExpression;

exports.AuNavId = Z;

exports.ComponentAgent = ComponentAgent;

exports.ComponentExpression = ComponentExpression;

exports.CompositeSegmentExpression = CompositeSegmentExpression;

exports.DefaultComponents = xt;

exports.DefaultResources = Rt;

exports.HrefCustomAttributeRegistration = yt;

exports.ILocationManager = b;

exports.IRouteContext = dt;

exports.IRouter = tt;

exports.IRouterEvents = E;

exports.IStateManager = Ct;

exports.IViewportInstruction = it;

exports.LoadCustomAttributeRegistration = Et;

exports.LocationChangeEvent = LocationChangeEvent;

exports.Navigation = Navigation;

exports.NavigationCancelEvent = NavigationCancelEvent;

exports.NavigationEndEvent = NavigationEndEvent;

exports.NavigationErrorEvent = NavigationErrorEvent;

exports.NavigationOptions = NavigationOptions;

exports.NavigationStartEvent = NavigationStartEvent;

exports.ParameterExpression = ParameterExpression;

exports.ParameterListExpression = ParameterListExpression;

exports.Route = ht;

exports.RouteConfig = RouteConfig;

exports.RouteContext = RouteContext;

exports.RouteDefinition = RouteDefinition;

exports.RouteExpression = RouteExpression;

exports.RouteNode = RouteNode;

exports.RouteTree = RouteTree;

exports.RouterConfiguration = St;

exports.RouterOptions = RouterOptions;

exports.RouterRegistration = mt;

exports.ScopedSegmentExpression = ScopedSegmentExpression;

exports.SegmentExpression = SegmentExpression;

exports.SegmentGroupExpression = SegmentGroupExpression;

exports.Transition = Transition;

exports.ViewportAgent = ViewportAgent;

exports.ViewportCustomElementRegistration = $t;

exports.ViewportExpression = ViewportExpression;

exports.isManagedState = K;

exports.route = at;

exports.toManagedState = Q;
//# sourceMappingURL=index.cjs.map
