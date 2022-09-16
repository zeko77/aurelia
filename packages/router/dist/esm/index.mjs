import { Protocol as t, IEventAggregator as i, IContainer as n, DI as s, Registration as e } from "@aurelia/kernel";

import { CustomElement as r, isCustomElementViewModel as o, Controller as h, IPlatform as u, IWindow as l, IHistory as a, ILocation as c, IAppRoot as f, CustomAttribute as d, customElement as p, bindable as g, INode as v, IInstruction as w, IController as m, BindingMode as R, customAttribute as I, AppTask as E } from "@aurelia/runtime-html";

import { Metadata as y } from "@aurelia/metadata";

import { RouteRecognizer as C, ConfigurableRoute as S, RecognizedRoute as N, Endpoint as b } from "@aurelia/route-recognizer";

class Endpoint$1 {
    constructor(t, i, n, s = {}) {
        this.router = t;
        this.name = i;
        this.connectedCE = n;
        this.options = s;
        this.contents = [];
        this.transitionAction = "";
        this.path = null;
    }
    getContent() {
        return this.contents[0];
    }
    getNextContent() {
        return this.contents.length > 1 ? this.contents[this.contents.length - 1] : null;
    }
    getTimeContent(t = 1 / 0) {
        return this.getContent();
    }
    getNavigationContent(t) {
        if (t instanceof NavigationCoordinator) t = t.navigation;
        if (t instanceof Navigation) return this.contents.find((i => i.navigation === t)) ?? null;
        return null;
    }
    get activeContent() {
        return this.getNextContent() ?? this.getContent();
    }
    get connectedScope() {
        return this.activeContent?.connectedScope;
    }
    get scope() {
        return this.connectedScope.scope;
    }
    get owningScope() {
        return this.connectedScope.owningScope;
    }
    get connectedController() {
        return this.connectedCE?.$controller ?? null;
    }
    get isViewport() {
        return this instanceof Viewport;
    }
    get isViewportScope() {
        return this instanceof ViewportScope;
    }
    get isEmpty() {
        return false;
    }
    get pathname() {
        return this.connectedScope.pathname;
    }
    toString() {
        throw new Error(`Method 'toString' needs to be implemented in all endpoints!`);
    }
    setNextContent(t, i) {
        throw new Error(`Method 'setNextContent' needs to be implemented in all endpoints!`);
    }
    setConnectedCE(t, i) {
        throw new Error(`Method 'setConnectedCE' needs to be implemented in all endpoints!`);
    }
    transition(t) {
        throw new Error(`Method 'transition' needs to be implemented in all endpoints!`);
    }
    finalizeContentChange(t, i) {
        throw new Error(`Method 'finalizeContentChange' needs to be implemented in all endpoints!`);
    }
    cancelContentChange(t, i = null) {
        throw new Error(`Method 'cancelContentChange' needs to be implemented in all endpoints!`);
    }
    getRoutes() {
        throw new Error(`Method 'getRoutes' needs to be implemented in all endpoints!`);
    }
    getTitle(t) {
        throw new Error(`Method 'getTitle' needs to be implemented in all endpoints!`);
    }
    removeEndpoint(t, i) {
        this.contents.forEach((t => t.delete()));
        return true;
    }
    canUnload(t, i) {
        return true;
    }
    canLoad(t, i) {
        return true;
    }
    unload(t, i) {
        return;
    }
    load(t, i) {
        return;
    }
}

class EndpointContent {
    constructor(t, i, n, s, e = RoutingInstruction.create(""), r = Navigation.create({
        instruction: "",
        fullStateInstruction: ""
    })) {
        this.router = t;
        this.endpoint = i;
        this.instruction = e;
        this.navigation = r;
        this.completed = false;
        this.connectedScope = new RoutingScope(t, s, n, this);
        if (null !== this.router.rootScope) (this.endpoint.connectedScope?.parent ?? this.router.rootScope.scope).addChild(this.connectedScope);
    }
    get isActive() {
        return this.endpoint.activeContent === this;
    }
    delete() {
        this.connectedScope.parent?.removeChild(this.connectedScope);
    }
}

class FoundRoute {
    constructor(t = null, i = "", n = [], s = "", e = {}) {
        this.match = t;
        this.matching = i;
        this.instructions = n;
        this.remaining = s;
        this.params = e;
    }
    get foundConfiguration() {
        return null !== this.match;
    }
    get foundInstructions() {
        return this.instructions.some((t => !t.component.none));
    }
    get hasRemaining() {
        return this.instructions.some((t => t.hasNextScopeInstructions));
    }
}

function k(t, i, n, s) {
    var e = arguments.length, r = e < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, n) : s, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, i, n, s); else for (var h = t.length - 1; h >= 0; h--) if (o = t[h]) r = (e < 3 ? o(r) : e > 3 ? o(i, n, r) : o(i, n)) || r;
    return e > 3 && r && Object.defineProperty(i, n, r), r;
}

function $(t, i) {
    return function(n, s) {
        i(n, s, t);
    };
}

class InstructionParser {
    static parse(t, i, n, s) {
        if (!i) return {
            instructions: [],
            remaining: ""
        };
        if (i.startsWith(t.sibling) && !InstructionParser.isAdd(t, i)) throw new Error(`Instruction parser error: Unnecessary siblings separator ${t.sibling} in beginning of instruction part "${i}".`);
        const e = [];
        let r = 1e3;
        while (i.length && r) {
            r--;
            if (i.startsWith(t.scope)) {
                if (0 === e.length) throw new Error(`Instruction parser error: Children without parent in instruction part "(${i}" is not allowed.`);
                s = false;
                i = i.slice(t.scope.length);
                const r = i.startsWith(t.groupStart);
                if (r) {
                    i = i.slice(t.groupStart.length);
                    n = true;
                }
                const {instructions: o, remaining: h} = InstructionParser.parse(t, i, r, false);
                e[e.length - 1].nextScopeInstructions = o;
                i = h;
            } else if (i.startsWith(t.groupStart)) {
                i = i.slice(t.groupStart.length);
                const {instructions: n, remaining: r} = InstructionParser.parse(t, i, true, s);
                e.push(...n);
                i = r;
            } else if (i.startsWith(t.groupEnd)) {
                if (n) i = i.slice(t.groupEnd.length);
                let s = 0;
                const r = i.length;
                for (;s < r; s++) {
                    if (i.slice(s, s + t.sibling.length) === t.sibling) return {
                        instructions: e,
                        remaining: i
                    };
                    if (i.slice(s, s + t.groupEnd.length) !== t.groupEnd) if (e.length > 1) throw new Error(`Instruction parser error: Children below scope ${t.groupStart}${t.groupEnd} in instruction part "(${i}" is not allowed.`); else {
                        i = i.slice(s);
                        break;
                    }
                }
                if (s >= r) return {
                    instructions: e,
                    remaining: i
                };
            } else if (i.startsWith(t.sibling) && !InstructionParser.isAdd(t, i)) {
                if (!n) return {
                    instructions: e,
                    remaining: i
                };
                i = i.slice(t.sibling.length);
            } else {
                const {instruction: n, remaining: s} = InstructionParser.parseOne(t, i);
                e.push(n);
                i = s;
            }
        }
        return {
            instructions: e,
            remaining: i
        };
    }
    static isAdd(t, i) {
        return i === t.add || i.startsWith(`${t.add}${t.viewport}`);
    }
    static parseOne(t, i) {
        const n = [ t.parameters, t.viewport, t.noScope, t.groupEnd, t.scope, t.sibling ];
        let s;
        let e;
        let r;
        let o = true;
        let h;
        let u;
        const l = i;
        const a = [ t.add, t.clear ];
        for (const e of a) if (i === e) {
            s = i;
            i = "";
            n.shift();
            n.shift();
            h = t.viewport;
            break;
        }
        if (void 0 === s) for (const e of a) if (i.startsWith(`${e}${t.viewport}`)) {
            s = e;
            i = i.slice(`${e}${t.viewport}`.length);
            n.shift();
            n.shift();
            h = t.viewport;
            break;
        }
        if (void 0 === s) {
            ({token: h, pos: u} = InstructionParser.findNextToken(i, n));
            s = -1 !== u ? i.slice(0, u) : i;
            i = -1 !== u ? i.slice(u + h.length) : "";
            n.shift();
            if (h === t.parameters) {
                ({token: h, pos: u} = InstructionParser.findNextToken(i, [ t.parametersEnd ]));
                e = i.slice(0, u);
                i = i.slice(u + h.length);
                ({token: h} = InstructionParser.findNextToken(i, n));
                i = i.slice(h.length);
            }
            n.shift();
        }
        if (h === t.viewport) {
            ({token: h, pos: u} = InstructionParser.findNextToken(i, n));
            r = -1 !== u ? i.slice(0, u) : i;
            i = -1 !== u ? i.slice(u + h.length) : "";
        }
        n.shift();
        if (h === t.noScope) o = false;
        if (h === t.groupEnd || h === t.scope || h === t.sibling) i = `${h}${i}`;
        if ("" === (s ?? "")) throw new Error(`Instruction parser error: No component specified in instruction part "${i}".`);
        const c = RoutingInstruction.create(s, r, e, o);
        c.unparsed = l;
        return {
            instruction: c,
            remaining: i
        };
    }
    static findNextToken(t, i) {
        const n = {};
        for (const s of i) {
            const i = t.indexOf(s);
            if (i > -1) n[s] = t.indexOf(s);
        }
        const s = Math.min(...Object.values(n));
        for (const t in n) if (n[t] === s) return {
            token: t,
            pos: s
        };
        return {
            token: "",
            pos: -1
        };
    }
}

class TitleOptions {
    constructor(t = "${componentTitles}${appTitleSeparator}Aurelia", i = " | ", n = "top-down", s = " > ", e = true, r = "app-", o) {
        this.appTitle = t;
        this.appTitleSeparator = i;
        this.componentTitleOrder = n;
        this.componentTitleSeparator = s;
        this.useComponentNames = e;
        this.componentPrefix = r;
        this.transformTitle = o;
    }
    static create(t = {}) {
        t = "string" === typeof t ? {
            appTitle: t
        } : t;
        return new TitleOptions(t.appTitle, t.appTitleSeparator, t.componentTitleOrder, t.componentTitleSeparator, t.useComponentNames, t.componentPrefix, t.transformTitle);
    }
    static for(t) {
        return RouterOptions.for(t).title;
    }
    apply(t = {}) {
        t = "string" === typeof t ? {
            appTitle: t
        } : t;
        this.appTitle = t.appTitle ?? this.appTitle;
        this.appTitleSeparator = t.appTitleSeparator ?? this.appTitleSeparator;
        this.componentTitleOrder = t.componentTitleOrder ?? this.componentTitleOrder;
        this.componentTitleSeparator = t.componentTitleSeparator ?? this.componentTitleSeparator;
        this.useComponentNames = t.useComponentNames ?? this.useComponentNames;
        this.componentPrefix = t.componentPrefix ?? this.componentPrefix;
        this.transformTitle = "transformTitle" in t ? t.transformTitle : this.transformTitle;
    }
}

class Separators {
    constructor(t = "@", i = "+", n = "/", s = "(", e = ")", r = "!", o = "(", h = ")", u = ",", l = "=", a = "+", c = "-", f = ".") {
        this.viewport = t;
        this.sibling = i;
        this.scope = n;
        this.groupStart = s;
        this.groupEnd = e;
        this.noScope = r;
        this.parameters = o;
        this.parametersEnd = h;
        this.parameterSeparator = u;
        this.parameterKeySeparator = l;
        this.add = a;
        this.clear = c;
        this.action = f;
    }
    static create(t = {}) {
        return new Separators(t.viewport, t.sibling, t.scope, t.groupStart, t.groupEnd, t.noScope, t.parameters, t.parametersEnd, t.parameterSeparator, t.parameterKeySeparator, t.add, t.clear, t.action);
    }
    static for(t) {
        return RouterOptions.for(t).separators;
    }
    apply(t = {}) {
        this.viewport = t.viewport ?? this.viewport;
        this.sibling = t.sibling ?? this.sibling;
        this.scope = t.scope ?? this.scope;
        this.groupStart = t.groupStart ?? this.groupStart;
        this.groupEnd = t.groupEnd ?? this.groupEnd;
        this.noScope = t.noScope ?? this.noScope;
        this.parameters = t.parameters ?? this.parameters;
        this.parametersEnd = t.parametersEnd ?? this.parametersEnd;
        this.parameterSeparator = t.parameterSeparator ?? this.parameterSeparator;
        this.parameterKeySeparator = t.parameterKeySeparator ?? this.parameterKeySeparator;
        this.add = t.add ?? this.add;
        this.clear = t.clear ?? this.clear;
        this.action = t.action ?? this.action;
    }
}

class Indicators {
    constructor(t = "active", i = "navigating") {
        this.loadActive = t;
        this.viewportNavigating = i;
    }
    static create(t = {}) {
        return new Indicators(t.loadActive, t.viewportNavigating);
    }
    static for(t) {
        return RouterOptions.for(t).indicators;
    }
    apply(t = {}) {
        this.loadActive = t.loadActive ?? this.loadActive;
        this.viewportNavigating = t.viewportNavigating ?? this.viewportNavigating;
    }
}

class RouterOptions {
    constructor(t = Separators.create(), i = Indicators.create(), n = true, s = null, e = true, r = 0, o = true, h = true, u = true, l = TitleOptions.create(), a = [ "guardedUnload", "swapped", "completed" ], c = "attach-next-detach-current", f = "", d = "abort") {
        this.separators = t;
        this.indicators = i;
        this.useUrlFragmentHash = n;
        this.basePath = s;
        this.useHref = e;
        this.statefulHistoryLength = r;
        this.useDirectRouting = o;
        this.useConfiguredRoutes = h;
        this.additiveInstructionDefault = u;
        this.title = l;
        this.navigationSyncStates = a;
        this.swapOrder = c;
        this.fallback = f;
        this.fallbackAction = d;
        this.registrationHooks = [];
    }
    static create(t = {}) {
        return new RouterOptions(Separators.create(t.separators), Indicators.create(t.indicators), t.useUrlFragmentHash, t.basePath, t.useHref, t.statefulHistoryLength, t.useDirectRouting, t.useConfiguredRoutes, t.additiveInstructionDefault, TitleOptions.create(t.title), t.navigationSyncStates, t.swapOrder, t.fallback, t.fallbackAction);
    }
    static for(t) {
        if (t instanceof RouterConfiguration) return t.options;
        if (t instanceof Router) t = t.configuration; else t = t.get(st);
        return t.options;
    }
    apply(t) {
        t = t ?? {};
        this.separators.apply(t.separators);
        this.indicators.apply(t.indicators);
        this.useUrlFragmentHash = t.useUrlFragmentHash ?? this.useUrlFragmentHash;
        this.basePath = t.basePath ?? this.basePath;
        this.useHref = t.useHref ?? this.useHref;
        this.statefulHistoryLength = t.statefulHistoryLength ?? this.statefulHistoryLength;
        this.useDirectRouting = t.useDirectRouting ?? this.useDirectRouting;
        this.useConfiguredRoutes = t.useConfiguredRoutes ?? this.useConfiguredRoutes;
        this.additiveInstructionDefault = t.additiveInstructionDefault ?? this.additiveInstructionDefault;
        this.title.apply(t.title);
        this.navigationSyncStates = t.navigationSyncStates ?? this.navigationSyncStates;
        this.swapOrder = t.swapOrder ?? this.swapOrder;
        this.fallback = t.fallback ?? this.fallback;
        this.fallbackAction = t.fallbackAction ?? this.fallbackAction;
        if (Array.isArray(t.hooks)) if (void 0 !== this.routerConfiguration) t.hooks.forEach((t => this.routerConfiguration.addHook(t.hook, t.options))); else this.registrationHooks = t.hooks;
    }
    setRouterConfiguration(t) {
        this.routerConfiguration = t;
        this.registrationHooks.forEach((t => this.routerConfiguration.addHook(t.hook, t.options)));
        this.registrationHooks.length = 0;
    }
}

var P;

(function(t) {
    t["none"] = "none";
    t["string"] = "string";
    t["array"] = "array";
    t["object"] = "object";
})(P || (P = {}));

class InstructionParameters {
    constructor() {
        this.parametersString = null;
        this.parametersRecord = null;
        this.parametersList = null;
        this.parametersType = "none";
    }
    get none() {
        return "none" === this.parametersType;
    }
    static create(t) {
        const i = new InstructionParameters;
        i.set(t);
        return i;
    }
    static parse(t, i, n = false) {
        if (null == i || 0 === i.length) return [];
        const s = Separators.for(t);
        const e = s.parameterSeparator;
        const r = s.parameterKeySeparator;
        if ("string" === typeof i) {
            const t = [];
            const s = i.split(e);
            for (const i of s) {
                let s;
                let e;
                [s, e] = i.split(r);
                if (void 0 === e) {
                    e = n ? decodeURIComponent(s) : s;
                    s = void 0;
                } else if (n) {
                    s = decodeURIComponent(s);
                    e = decodeURIComponent(e);
                }
                t.push({
                    key: s,
                    value: e
                });
            }
            return t;
        }
        if (Array.isArray(i)) return i.map((t => ({
            key: void 0,
            value: t
        })));
        const o = Object.keys(i);
        o.sort();
        return o.map((t => ({
            key: t,
            value: i[t]
        })));
    }
    get typedParameters() {
        switch (this.parametersType) {
          case "string":
            return this.parametersString;

          case "array":
            return this.parametersList;

          case "object":
            return this.parametersRecord;

          default:
            return null;
        }
    }
    static stringify(t, i, n = false) {
        if (!Array.isArray(i) || 0 === i.length) return "";
        const s = Separators.for(t);
        return i.map((t => {
            const i = void 0 !== t.key && n ? encodeURIComponent(t.key) : t.key;
            const e = n ? encodeURIComponent(t.value) : t.value;
            return void 0 !== i && i !== e ? i + s.parameterKeySeparator + e : e;
        })).join(s.parameterSeparator);
    }
    static contains(t, i) {
        return Object.keys(i).every((n => i[n] === t[n]));
    }
    parameters(t) {
        return InstructionParameters.parse(t, this.typedParameters);
    }
    set(t) {
        this.parametersString = null;
        this.parametersList = null;
        this.parametersRecord = null;
        if (null == t || "" === t) {
            this.parametersType = "none";
            t = null;
        } else if ("string" === typeof t) {
            this.parametersType = "string";
            this.parametersString = t;
        } else if (Array.isArray(t)) {
            this.parametersType = "array";
            this.parametersList = t;
        } else {
            this.parametersType = "object";
            this.parametersRecord = t;
        }
    }
    get(t, i) {
        if (void 0 === i) return this.parameters(t);
        const n = this.parameters(t).filter((t => t.key === i)).map((t => t.value));
        if (0 === n.length) return;
        return 1 === n.length ? n[0] : n;
    }
    addParameters(t) {
        if ("none" === this.parametersType) return this.set(t);
        if ("object" !== this.parametersType) throw new Error("Can't add object parameters to existing non-object parameters!");
        this.set({
            ...this.parametersRecord,
            ...t
        });
    }
    toSpecifiedParameters(t, i) {
        i = i ?? [];
        const n = this.parameters(t);
        const s = {};
        for (const t of i) {
            let i = n.findIndex((i => i.key === t));
            if (i >= 0) {
                const [e] = n.splice(i, 1);
                s[t] = e.value;
            } else {
                i = n.findIndex((t => void 0 === t.key));
                if (i >= 0) {
                    const [e] = n.splice(i, 1);
                    s[t] = e.value;
                }
            }
        }
        for (const t of n.filter((t => void 0 !== t.key))) s[t.key] = t.value;
        let e = i.length;
        for (const t of n.filter((t => void 0 === t.key))) s[e++] = t.value;
        return s;
    }
    toSortedParameters(t, i) {
        i = i || [];
        const n = this.parameters(t);
        const s = [];
        for (const t of i) {
            let i = n.findIndex((i => i.key === t));
            if (i >= 0) {
                const t = {
                    ...n.splice(i, 1)[0]
                };
                t.key = void 0;
                s.push(t);
            } else {
                i = n.findIndex((t => void 0 === t.key));
                if (i >= 0) {
                    const t = {
                        ...n.splice(i, 1)[0]
                    };
                    s.push(t);
                } else s.push({
                    value: void 0
                });
            }
        }
        const e = n.filter((t => void 0 !== t.key));
        e.sort(((t, i) => (t.key || "") < (i.key || "") ? 1 : (i.key || "") < (t.key || "") ? -1 : 0));
        s.push(...e);
        s.push(...n.filter((t => void 0 === t.key)));
        return s;
    }
    same(t, i, n) {
        const s = null !== n ? n.parameters : [];
        const e = this.toSpecifiedParameters(t, s);
        const r = i.toSpecifiedParameters(t, s);
        return Object.keys(e).every((t => e[t] === r[t])) && Object.keys(r).every((t => r[t] === e[t]));
    }
}

class InstructionComponent {
    constructor() {
        this.name = null;
        this.type = null;
        this.instance = null;
        this.promise = null;
        this.func = null;
    }
    static create(t) {
        const i = new InstructionComponent;
        i.set(t);
        return i;
    }
    static isName(t) {
        return "string" === typeof t;
    }
    static isDefinition(t) {
        return r.isType(t.Type);
    }
    static isType(t) {
        return r.isType(t);
    }
    static isInstance(t) {
        return o(t);
    }
    static isAppelation(t) {
        return InstructionComponent.isName(t) || InstructionComponent.isType(t) || InstructionComponent.isInstance(t);
    }
    static getName(t) {
        if (InstructionComponent.isName(t)) return t; else if (InstructionComponent.isType(t)) return r.getDefinition(t).name; else return InstructionComponent.getName(t.constructor);
    }
    static getType(t) {
        if (InstructionComponent.isName(t)) return null; else if (InstructionComponent.isType(t)) return t; else return t.constructor;
    }
    static getInstance(t) {
        if (InstructionComponent.isName(t) || InstructionComponent.isType(t)) return null; else return t;
    }
    set(t) {
        let i = null;
        let n = null;
        let s = null;
        let e = null;
        let r = null;
        if (t instanceof Promise) e = t; else if (InstructionComponent.isName(t)) i = InstructionComponent.getName(t); else if (InstructionComponent.isType(t)) {
            i = this.getNewName(t);
            n = InstructionComponent.getType(t);
        } else if (InstructionComponent.isInstance(t)) {
            i = this.getNewName(InstructionComponent.getType(t));
            n = InstructionComponent.getType(t);
            s = InstructionComponent.getInstance(t);
        } else if ("function" === typeof t) r = t;
        this.name = i;
        this.type = n;
        this.instance = s;
        this.promise = e;
        this.func = r;
    }
    resolve(t) {
        if (null !== this.func) this.set(this.func(t));
        if (!(this.promise instanceof Promise)) return;
        return this.promise.then((t => {
            if (InstructionComponent.isAppelation(t)) {
                this.set(t);
                return;
            }
            if (null != t.default) {
                this.set(t.default);
                return;
            }
            const i = Object.keys(t).filter((t => !t.startsWith("__")));
            if (0 === i.length) throw new Error(`Failed to load component Type from resolved Promise since no export was specified.`);
            if (i.length > 1) throw new Error(`Failed to load component Type from resolved Promise since no 'default' export was specified when having multiple exports.`);
            const n = i[0];
            this.set(t[n]);
        }));
    }
    get none() {
        return !this.isName() && !this.isType() && !this.isInstance() && !this.isFunction() && !this.isPromise();
    }
    isName() {
        return !!this.name && !this.isType() && !this.isInstance();
    }
    isType() {
        return null !== this.type && !this.isInstance();
    }
    isInstance() {
        return null !== this.instance;
    }
    isPromise() {
        return null !== this.promise;
    }
    isFunction() {
        return null !== this.func;
    }
    toType(t, i) {
        void this.resolve(i);
        if (null !== this.type) return this.type;
        if (null !== this.name && "string" === typeof this.name) {
            if (null === t) throw new Error(`No container available when trying to resolve component '${this.name}'!`);
            if (t.has(r.keyFrom(this.name), true)) {
                const i = t.getResolver(r.keyFrom(this.name));
                if (null !== i && void 0 !== i.getFactory) {
                    const n = i.getFactory(t);
                    if (n) return n.Type;
                }
            }
        }
        return null;
    }
    toInstance(t, i, n, s) {
        void this.resolve(s);
        if (null !== this.instance) return this.instance;
        if (null == t) return null;
        const e = t.createChild();
        const o = this.isType() ? e.get(this.type) : e.get(r.keyFrom(this.name));
        if (null == o) {
            console.warn("Failed to create instance when trying to resolve component", this.name, this.type, "=>", o);
            throw new Error(`Failed to create instance when trying to resolve component '${this.name}'!`);
        }
        const u = h.$el(e, o, n, null);
        u.parent = i;
        return o;
    }
    same(t, i = false) {
        return i ? this.type === t.type : this.name === t.name;
    }
    getNewName(t) {
        if (null === this.name) return InstructionComponent.getName(t);
        return this.name;
    }
}

function T(t, i) {
    const n = [];
    let s = t.findIndex(i);
    while (s >= 0) {
        n.push(t.splice(s, 1)[0]);
        s = t.findIndex(i);
    }
    return n;
}

function V(t, i = false) {
    return t.filter(((t, n, s) => (i || null != t) && s.indexOf(t) === n));
}

class OpenPromise {
    constructor() {
        this.isPending = true;
        this.promise = new Promise(((t, i) => {
            this.t = t;
            this.i = i;
        }));
    }
    resolve(t) {
        this.t(t);
        this.isPending = false;
    }
    reject(t) {
        this.i(t);
        this.isPending = false;
    }
}

class Runner {
    constructor() {
        this.isDone = false;
        this.isCancelled = false;
        this.isResolved = false;
        this.isRejected = false;
        this.isAsync = false;
    }
    static run(t, ...i) {
        if (0 === (i?.length ?? 0)) return i?.[0];
        let n = false;
        if (null === t) {
            t = new Step;
            n = true;
        }
        const s = new Step(i.shift());
        Runner.connect(t, s, (t?.runParallel ?? false) || n);
        if (i.length > 0) Runner.add(s, false, ...i);
        if (n) {
            Runner.process(t);
            if (t.result instanceof Promise) this.runners.set(t.result, t);
            return t.result;
        }
        return s;
    }
    static runParallel(t, ...i) {
        if (0 === (i?.length ?? 0)) return [];
        let n = false;
        if (null === t) {
            t = new Step;
            n = true;
        } else t = Runner.connect(t, new Step, true);
        Runner.add(t, true, ...i);
        if (n) Runner.process(t);
        if (t.result instanceof Promise) this.runners.set(t.result, t);
        return n ? t.result ?? [] : t;
    }
    static step(t) {
        if (t instanceof Promise) return Runner.runners.get(t);
    }
    static cancel(t) {
        const i = Runner.step(t);
        if (void 0 !== i) i.cancel();
    }
    static add(t, i, ...n) {
        let s = new Step(n.shift(), i);
        if (null !== t) s = Runner.connect(t, s, i);
        const e = s;
        while (n.length > 0) s = Runner.connect(s, new Step(n.shift(), i), false);
        return e;
    }
    static connect(t, i, n) {
        if (!n) {
            const n = t.next;
            t.next = i;
            i.previous = t;
            i.next = n;
            if (null !== n) {
                n.previous = i;
                n.parent = null;
            }
        } else {
            const n = t.child;
            t.child = i;
            i.parent = t;
            i.next = n;
            if (null !== n) {
                n.parent = null;
                n.previous = i;
            }
        }
        return i;
    }
    static process(t) {
        const i = t.root;
        while (null !== t && !t.isDoing && !t.isDone) {
            i.current = t;
            if (t.isParallelParent) {
                t.isDone = true;
                let i = t.child;
                while (null !== i) {
                    Runner.process(i);
                    i = i.next;
                }
            } else {
                t.isDoing = true;
                t.value = t.step;
                while (t.value instanceof Function && !t.isCancelled && !t.isExited && !t.isDone) t.value = t.value(t);
                if (!t.isCancelled) if (t.value instanceof Promise) {
                    const n = t.value;
                    Runner.ensurePromise(i);
                    ((t, i) => {
                        i.then((i => {
                            t.value = i;
                            Runner.settlePromise(t);
                            t.isDone = true;
                            t.isDoing = false;
                            const n = t.nextToDo();
                            if (null !== n && !t.isExited) Runner.process(n); else if (t.root.doneAll || t.isExited) Runner.settlePromise(t.root);
                        })).catch((t => {
                            throw t;
                        }));
                    })(t, n);
                } else {
                    t.isDone = true;
                    t.isDoing = false;
                    if (!t.isExited) t = t.nextToDo(); else t = null;
                }
            }
        }
        if (i.isCancelled) Runner.settlePromise(i, "reject"); else if (i.doneAll || i.isExited) Runner.settlePromise(i);
    }
    static ensurePromise(t) {
        if (null === t.finally) {
            t.finally = new OpenPromise;
            t.promise = t.finally.promise;
            return true;
        }
        return false;
    }
    static settlePromise(t, i = "resolve") {
        if (t.finally?.isPending ?? false) {
            t.promise = null;
            switch (i) {
              case "resolve":
                t.finally?.resolve(t.result);
                break;

              case "reject":
                t.finally?.reject(t.result);
                break;
            }
        }
    }
}

Runner.runners = new WeakMap;

Runner.roots = {};

class Step {
    constructor(t = void 0, i = false) {
        this.step = t;
        this.runParallel = i;
        this.promise = null;
        this.previous = null;
        this.next = null;
        this.parent = null;
        this.child = null;
        this.current = null;
        this.finally = null;
        this.isDoing = false;
        this.isDone = false;
        this.isCancelled = false;
        this.isExited = false;
        this.exited = null;
        this.id = "-1";
        this.id = `${Step.id++}`;
    }
    get isParallelParent() {
        return this.child?.runParallel ?? false;
    }
    get result() {
        if (null !== this.promise) return this.promise;
        if (null !== this.child) if (this.isParallelParent) {
            const t = [];
            let i = this.child;
            while (null !== i) {
                t.push(i.result);
                i = i.next;
            }
            return t;
        } else return this === this.root && null !== this.exited ? this.exited.result : this.child?.tail?.result;
        let t = this.value;
        while (t instanceof Step) t = t.result;
        return t;
    }
    get asValue() {
        return this.result;
    }
    get previousValue() {
        return this.runParallel ? this.head.parent?.parent?.previous?.result : this.previous?.result;
    }
    get name() {
        let t = `${this.id}`;
        if (this.runParallel) t = `:${t}`;
        if (this.value instanceof Promise || this.promise instanceof Promise) t = `${t}*`;
        if (null !== this.finally) t = `${t}*`;
        if (null !== this.child) t = `${t}>`;
        if (this.isDone) t = `(${t})`;
        return t;
    }
    get root() {
        let t = this.head;
        while (null !== t.parent) t = t.parent.head;
        return t;
    }
    get head() {
        let t = this;
        while (null !== t.previous) t = t.previous;
        return t;
    }
    get tail() {
        let t = this;
        while (null !== t.next) t = t.next;
        return t;
    }
    get done() {
        if (!this.isDone) return false;
        let t = this.child;
        while (null !== t) {
            if (!t.done) return false;
            t = t.next;
        }
        return true;
    }
    get doneAll() {
        if (!this.isDone || null !== this.child && !this.child.doneAll || null !== this.next && !this.next.doneAll) return false;
        return true;
    }
    cancel(t = true) {
        if (t) return this.root.cancel(false);
        if (this.isCancelled) return false;
        this.isCancelled = true;
        this.child?.cancel(false);
        this.next?.cancel(false);
        return true;
    }
    exit(t = true) {
        if (t) {
            this.root.exited = this;
            return this.root.exit(false);
        }
        if (this.isExited) return false;
        this.isExited = true;
        this.child?.exit(false);
        this.next?.exit(false);
        return true;
    }
    nextToDo() {
        if (null !== this.child && !this.child.isDoing && !this.child.isDone) return this.child;
        if (this.runParallel && !this.head.parent.done) return null;
        return this.nextOrUp();
    }
    nextOrUp() {
        let t = this.next;
        while (null !== t) {
            if (!t.isDoing && !t.isDone) return t;
            t = t.next;
        }
        const i = this.head.parent ?? null;
        if (null === i || !i.done) return null;
        return i.nextOrUp();
    }
    get path() {
        return `${this.head.parent?.path ?? ""}/${this.name}`;
    }
    get tree() {
        let t = "";
        let i = this.head;
        let n = i.parent;
        let s = "";
        while (null !== n) {
            s = `${n.path}${s}`;
            n = n.head.parent;
        }
        do {
            t += `${s}/${i.name}\n`;
            if (i === this) break;
            i = i.next;
        } while (null !== i);
        return t;
    }
    get report() {
        let t = `${this.path}\n`;
        t += this.child?.report ?? "";
        t += this.next?.report ?? "";
        return t;
    }
}

Step.id = 0;

class Route {
    constructor(t, i, n, s, e, r, o, h) {
        this.path = t;
        this.id = i;
        this.redirectTo = n;
        this.instructions = s;
        this.caseSensitive = e;
        this.title = r;
        this.reloadBehavior = o;
        this.data = h;
    }
    static isConfigured(t) {
        return y.hasOwn(Route.resourceKey, t) || "parameters" in t || "title" in t;
    }
    static configure(t, i) {
        const n = Route.create(t, i);
        y.define(Route.resourceKey, n, i);
        return i;
    }
    static getConfiguration(t) {
        const i = y.getOwn(Route.resourceKey, t) ?? {};
        if (Array.isArray(t.parameters)) i.parameters = t.parameters;
        if ("title" in t) i.title = t.title;
        return i instanceof Route ? i : Route.create(i, t);
    }
    static create(t, i = null) {
        if (null !== i) t = Route.transferTypeToComponent(t, i);
        if (r.isType(t)) t = Route.getConfiguration(t); else if (null === i) t = {
            ...t
        };
        const n = Route.transferIndividualIntoInstructions(t);
        Route.validateRouteConfiguration(n);
        let s = n.path;
        if (Array.isArray(s)) s = s.join(",");
        return new Route(n.path ?? "", n.id ?? s ?? null, n.redirectTo ?? null, n.instructions ?? null, n.caseSensitive ?? false, n.title ?? null, n.reloadBehavior ?? null, n.data ?? null);
    }
    static transferTypeToComponent(t, i) {
        if (r.isType(t)) throw new Error(`Invalid route configuration: A component ` + `can't be specified in a component route configuration.`);
        const n = {
            ...t
        } ?? {};
        if ("component" in n || "instructions" in n) throw new Error(`Invalid route configuration: The 'component' and 'instructions' properties ` + `can't be specified in a component route configuration.`);
        if (!("redirectTo" in n)) n.component = i;
        if (!("path" in n) && !("redirectTo" in n)) n.path = r.getDefinition(i).name;
        return n;
    }
    static transferIndividualIntoInstructions(t) {
        if (null === t || void 0 === t) throw new Error(`Invalid route configuration: expected an object.`);
        if (null !== (t.component ?? null) || null !== (t.viewport ?? null) || null !== (t.parameters ?? null) || null !== (t.children ?? null)) {
            if (null != t.instructions) throw new Error(`Invalid route configuration: The 'instructions' property can't be used together with ` + `the 'component', 'viewport', 'parameters' or 'children' properties.`);
            t.instructions = [ {
                component: t.component,
                viewport: t.viewport,
                parameters: t.parameters,
                children: t.children
            } ];
        }
        return t;
    }
    static validateRouteConfiguration(t) {
        if (null === t.redirectTo && null === t.instructions) throw new Error(`Invalid route configuration: either 'redirectTo' or 'instructions' ` + `need to be specified.`);
    }
}

Route.resourceKey = t.resource.keyFor("route");

const A = {
    name: t.resource.keyFor("routes"),
    isConfigured(t) {
        return y.hasOwn(A.name, t) || "routes" in t;
    },
    configure(t, i) {
        const n = t.map((t => Route.create(t)));
        y.define(A.name, n, i);
        return i;
    },
    getConfiguration(t) {
        const i = t;
        const n = [];
        const s = y.getOwn(A.name, t);
        if (Array.isArray(s)) n.push(...s);
        if (Array.isArray(i.routes)) n.push(...i.routes);
        return n.map((t => t instanceof Route ? t : Route.create(t)));
    }
};

function O(t) {
    return function(i) {
        return A.configure(t, i);
    };
}

class ViewportScopeContent extends EndpointContent {}

class ViewportScope extends Endpoint$1 {
    constructor(t, i, n, s, e, r = null, o = {
        catches: [],
        source: null
    }) {
        super(t, i, n);
        this.rootComponentType = r;
        this.options = o;
        this.instruction = null;
        this.available = true;
        this.sourceItem = null;
        this.sourceItemIndex = -1;
        this.remove = false;
        this.add = false;
        this.contents.push(new ViewportScopeContent(t, this, s, e));
        if (this.catches.length > 0) this.instruction = RoutingInstruction.create(this.catches[0], this.name);
    }
    get isEmpty() {
        return null === this.instruction;
    }
    get passThroughScope() {
        return null === this.rootComponentType && 0 === this.catches.length;
    }
    get siblings() {
        const t = this.connectedScope.parent;
        if (null === t) return [ this ];
        return t.enabledChildren.filter((t => t.isViewportScope && t.endpoint.name === this.name)).map((t => t.endpoint));
    }
    get source() {
        return this.options.source ?? null;
    }
    get catches() {
        let t = this.options.catches ?? [];
        if ("string" === typeof t) t = t.split(",");
        return t;
    }
    get default() {
        if (this.catches.length > 0) return this.catches[0];
    }
    toString() {
        const t = this.instruction?.component.name ?? "";
        const i = this.getNextContent()?.instruction.component.name ?? "";
        return `vs:${this.name}[${t}->${i}]`;
    }
    setNextContent(t, i) {
        t.endpoint.set(this);
        this.remove = t.isClear(this.router) || t.isClearAll(this.router);
        this.add = t.isAdd(this.router) && Array.isArray(this.source);
        if (this.add) t.component.name = null;
        if (void 0 !== this.default && null === t.component.name) t.component.name = this.default;
        this.contents.push(new ViewportScopeContent(this.router, this, this.owningScope, this.scope.hasScope, t, i));
        return "swap";
    }
    transition(t) {
        Runner.run(null, (i => t.setEndpointStep(this, i.root)), (() => t.addEndpointState(this, "guardedUnload")), (() => t.addEndpointState(this, "guardedLoad")), (() => t.addEndpointState(this, "guarded")), (() => t.addEndpointState(this, "loaded")), (() => t.addEndpointState(this, "unloaded")), (() => t.addEndpointState(this, "routed")), (() => t.addEndpointState(this, "swapped")), (() => t.addEndpointState(this, "completed")));
    }
    finalizeContentChange(t, i) {
        const n = this.contents.findIndex((i => i.navigation === t.navigation));
        let s = this.contents[n];
        if (this.remove) {
            const t = new ViewportScopeContent(this.router, this, this.owningScope, this.scope.hasScope);
            this.contents.splice(n, 1, t);
            s.delete();
            s = t;
        }
        s.completed = true;
        let e = 0;
        for (let t = 0, i = n; t < i; t++) {
            if (!(this.contents[0].navigation.completed ?? false)) break;
            e++;
        }
        this.contents.splice(0, e);
        if (this.remove && Array.isArray(this.source)) this.removeSourceItem();
    }
    cancelContentChange(t, i = null) {
        [ ...new Set(this.scope.children.map((t => t.endpoint))) ].forEach((n => n.cancelContentChange(t, i)));
        const n = this.contents.findIndex((i => i.navigation === t.navigation));
        if (n < 0) return;
        this.contents.splice(n, 1);
        if (this.add) {
            const t = this.source.indexOf(this.sourceItem);
            this.source.splice(t, 1);
            this.sourceItem = null;
        }
    }
    acceptSegment(t) {
        if (null === t && void 0 === t || 0 === t.length) return true;
        if (t === RoutingInstruction.clear(this.router) || t === RoutingInstruction.add(this.router) || t === this.name) return true;
        if (0 === this.catches.length) return true;
        if (this.catches.includes(t)) return true;
        if (this.catches.filter((t => t.includes("*"))).length) return true;
        return false;
    }
    binding() {
        const t = this.source || [];
        if (t.length > 0 && null === this.sourceItem) this.sourceItem = this.getAvailableSourceItem();
    }
    unbinding() {
        if (null !== this.sourceItem && null !== this.source) T(this.source, (t => t === this.sourceItem));
        this.sourceItem = null;
    }
    getAvailableSourceItem() {
        if (null === this.source) return null;
        const t = this.siblings;
        for (const i of this.source) if (t.every((t => t.sourceItem !== i))) return i;
        return null;
    }
    addSourceItem() {
        const t = {};
        this.source.push(t);
        return t;
    }
    removeSourceItem() {
        this.sourceItemIndex = this.source.indexOf(this.sourceItem);
        if (this.sourceItemIndex >= 0) this.source.splice(this.sourceItemIndex, 1);
    }
    getRoutes() {
        const t = [];
        if (null !== this.rootComponentType) {
            const i = this.rootComponentType.constructor === this.rootComponentType.constructor.constructor ? this.rootComponentType : this.rootComponentType.constructor;
            t.push(...A.getConfiguration(i) ?? []);
        }
        return t;
    }
}

class StoredNavigation {
    constructor(t = {
        instruction: "",
        fullStateInstruction: ""
    }) {
        this.instruction = t.instruction;
        this.fullStateInstruction = t.fullStateInstruction;
        this.scope = t.scope;
        this.index = t.index;
        this.firstEntry = t.firstEntry;
        this.path = t.path;
        this.title = t.title;
        this.query = t.query;
        this.fragment = t.fragment;
        this.parameters = t.parameters;
        this.data = t.data;
    }
    toStoredNavigation() {
        return {
            instruction: this.instruction,
            fullStateInstruction: this.fullStateInstruction,
            scope: this.scope,
            index: this.index,
            firstEntry: this.firstEntry,
            path: this.path,
            title: this.title,
            query: this.query,
            fragment: this.fragment,
            parameters: this.parameters,
            data: this.data
        };
    }
}

class NavigationFlags {
    constructor() {
        this.first = false;
        this.new = false;
        this.refresh = false;
        this.forward = false;
        this.back = false;
        this.replace = false;
    }
}

class Navigation extends StoredNavigation {
    constructor(t = {
        instruction: "",
        fullStateInstruction: ""
    }) {
        super(t);
        this.navigation = new NavigationFlags;
        this.repeating = false;
        this.previous = null;
        this.fromBrowser = false;
        this.origin = null;
        this.replacing = false;
        this.refreshing = false;
        this.untracked = false;
        this.process = null;
        this.completed = true;
        this.fromBrowser = t.fromBrowser ?? this.fromBrowser;
        this.origin = t.origin ?? this.origin;
        this.replacing = t.replacing ?? this.replacing;
        this.refreshing = t.refreshing ?? this.refreshing;
        this.untracked = t.untracked ?? this.untracked;
        this.historyMovement = t.historyMovement ?? this.historyMovement;
        this.process = null;
        this.timestamp = Date.now();
    }
    get useFullStateInstruction() {
        return (this.navigation.back ?? false) || (this.navigation.forward ?? false) || (this.navigation.refresh ?? false);
    }
    static create(t = {
        instruction: "",
        fullStateInstruction: ""
    }) {
        return new Navigation(t);
    }
}

class AwaitableMap {
    constructor() {
        this.map = new Map;
    }
    set(t, i) {
        const n = this.map.get(t);
        if (n instanceof OpenPromise) n.resolve(i);
        this.map.set(t, i);
    }
    delete(t) {
        const i = this.map.get(t);
        if (i instanceof OpenPromise) i.reject();
        this.map.delete(t);
    }
    await(t) {
        if (!this.map.has(t)) {
            const i = new OpenPromise;
            this.map.set(t, i);
            return i.promise;
        }
        const i = this.map.get(t);
        if (i instanceof OpenPromise) return i.promise;
        return i;
    }
    has(t) {
        return this.map.has(t) && !(this.map.get(t) instanceof OpenPromise);
    }
    clone() {
        const t = new AwaitableMap;
        t.map = new Map(this.map);
        return t;
    }
}

class ViewportContent extends EndpointContent {
    constructor(t, i, n, s, e = RoutingInstruction.create(""), r = Navigation.create({
        instruction: "",
        fullStateInstruction: ""
    }), o = null) {
        super(t, i, n, s, e, r);
        this.router = t;
        this.instruction = e;
        this.navigation = r;
        this.contentStates = new AwaitableMap;
        this.fromCache = false;
        this.fromHistory = false;
        this.reload = false;
        this.activatedResolve = null;
        if (!this.instruction.component.isType() && null != o?.container) this.instruction.component.type = this.toComponentType(o.container);
    }
    get componentInstance() {
        return this.instruction.component.instance;
    }
    get reloadBehavior() {
        if (this.instruction.route instanceof FoundRoute && null !== this.instruction.route.match?.reloadBehavior) return this.instruction.route.match?.reloadBehavior;
        return null !== this.instruction.component.instance && "reloadBehavior" in this.instruction.component.instance && void 0 !== this.instruction.component.instance.reloadBehavior ? this.instruction.component.instance.reloadBehavior : "default";
    }
    get controller() {
        return this.instruction.component.instance?.$controller;
    }
    equalComponent(t) {
        return this.instruction.sameComponent(this.router, t.instruction);
    }
    equalParameters(t) {
        return this.instruction.sameComponent(this.router, t.instruction, true) && (this.navigation.query ?? "") === (t.navigation.query ?? "");
    }
    isCacheEqual(t) {
        return this.instruction.sameComponent(this.router, t.instruction, true);
    }
    contentController(t) {
        return h.$el(t.container.createChild(), this.instruction.component.instance, t.element, null);
    }
    createComponent(t, i, n) {
        if (this.contentStates.has("created")) return;
        if (!this.fromCache && !this.fromHistory) try {
            this.instruction.component.set(this.toComponentInstance(t.container, t.controller, t.element));
        } catch (s) {
            if ("" !== (i ?? "")) {
                if ("process-children" === n) this.instruction.parameters.set([ this.instruction.component.name ]); else {
                    this.instruction.parameters.set([ this.instruction.unparsed ?? this.instruction.component.name ]);
                    this.instruction.nextScopeInstructions = null;
                }
                this.instruction.component.set(i);
                try {
                    this.instruction.component.set(this.toComponentInstance(t.container, t.controller, t.element));
                } catch (t) {
                    throw new Error(`'${this.instruction.component.name}' did not match any configured route or registered component name - did you forget to add the component '${this.instruction.component.name}' to the dependencies or to register it as a global dependency?`);
                }
            } else throw new Error(`'${this.instruction.component.name}' did not match any configured route or registered component name - did you forget to add the component '${this.instruction.component.name}' to the dependencies or to register it as a global dependency?`);
        }
        this.contentStates.set("created", void 0);
    }
    canLoad() {
        if (!this.contentStates.has("created") || this.contentStates.has("checkedLoad") && !this.reload) return true;
        const t = this.instruction.component.instance;
        if (null == t) return true;
        this.contentStates.set("checkedLoad", void 0);
        const i = this.endpoint.parentViewport?.getTimeContent(this.navigation.timestamp)?.instruction?.typeParameters(this.router);
        const n = this.instruction.typeParameters(this.router);
        const s = {
            ...this.navigation.parameters,
            ...i,
            ...n
        };
        const e = this.getLifecycleHooks(t, "canLoad").map((i => n => {
            const e = i(t, s, this.instruction, this.navigation);
            if ("boolean" === typeof e) {
                if (false === e) n.exit();
                return e;
            }
            if ("string" === typeof e) {
                n.exit();
                return e;
            }
            return e;
        }));
        if (0 !== e.length) {
            const t = Runner.run(null, ...e);
            if (true !== t) {
                if (false === t) return false;
                if ("string" === typeof t) return t;
                return t;
            }
        }
        if (null == t.canLoad) return true;
        const r = t.canLoad(s, this.instruction, this.navigation);
        if ("boolean" === typeof r || "string" === typeof r) return r;
        return r;
    }
    canUnload(t) {
        if (this.contentStates.has("checkedUnload") && !this.reload) return true;
        this.contentStates.set("checkedUnload", void 0);
        if (!this.contentStates.has("loaded")) return true;
        const i = this.instruction.component.instance;
        if (null === t) t = Navigation.create({
            instruction: "",
            fullStateInstruction: "",
            previous: this.navigation
        });
        const n = this.getLifecycleHooks(i, "canUnload").map((n => s => {
            const e = n(i, this.instruction, t);
            if ("boolean" === typeof e) {
                if (false === e) s.exit();
                return e;
            }
            return e;
        }));
        if (0 !== n.length) {
            const t = Runner.run(null, ...n);
            if (true !== t) {
                if (false === t) return false;
                return t;
            }
        }
        if (!i.canUnload) return true;
        const s = i.canUnload(this.instruction, t);
        if ("boolean" !== typeof s && !(s instanceof Promise)) throw new Error(`Method 'canUnload' in component "${this.instruction.component.name}" needs to return true or false or a Promise resolving to true or false.`);
        return s;
    }
    load(t) {
        return Runner.run(t, (() => this.contentStates.await("checkedLoad")), (() => {
            if (!this.contentStates.has("created") || this.contentStates.has("loaded") && !this.reload) return;
            this.reload = false;
            this.contentStates.set("loaded", void 0);
            const t = this.instruction.component.instance;
            const i = this.endpoint.parentViewport?.getTimeContent(this.navigation.timestamp)?.instruction?.typeParameters(this.router);
            const n = this.instruction.typeParameters(this.router);
            const s = {
                ...this.navigation.parameters,
                ...i,
                ...n
            };
            const e = this.getLifecycleHooks(t, "loading").map((i => () => i(t, s, this.instruction, this.navigation)));
            e.push(...this.getLifecycleHooks(t, "load").map((i => () => {
                console.warn(`[Deprecated] Found deprecated hook name "load" in ${this.instruction.component.name}. Please use the new name "loading" instead.`);
                return i(t, s, this.instruction, this.navigation);
            })));
            if (0 !== e.length) {
                if (null != t.loading) e.push((() => t.loading(s, this.instruction, this.navigation)));
                if (null != t.load) {
                    console.warn(`[Deprecated] Found deprecated hook name "load" in ${this.instruction.component.name}. Please use the new name "loading" instead.`);
                    e.push((() => t.load(s, this.instruction, this.navigation)));
                }
                return Runner.run(null, ...e);
            }
            if (null != t.loading) return t.loading(s, this.instruction, this.navigation);
            if (null != t.load) {
                console.warn(`[Deprecated] Found deprecated hook name "load" in ${this.instruction.component.name}. Please use the new name "loading" instead.`);
                return t.load(s, this.instruction, this.navigation);
            }
        }));
    }
    unload(t) {
        if (!this.contentStates.has("loaded")) return;
        this.contentStates.delete("loaded");
        const i = this.instruction.component.instance;
        if (null === t) t = Navigation.create({
            instruction: "",
            fullStateInstruction: "",
            previous: this.navigation
        });
        const n = this.getLifecycleHooks(i, "unloading").map((n => () => n(i, this.instruction, t)));
        n.push(...this.getLifecycleHooks(i, "unload").map((n => () => {
            console.warn(`[Deprecated] Found deprecated hook name "unload" in ${this.instruction.component.name}. Please use the new name "unloading" instead.`);
            return n(i, this.instruction, t);
        })));
        if (0 !== n.length) {
            if (null != i.unloading) n.push((() => i.unloading(this.instruction, t)));
            if (null != i.unload) {
                console.warn(`[Deprecated] Found deprecated hook name "unload" in ${this.instruction.component.name}. Please use the new name "unloading" instead.`);
                n.push((() => i.unload(this.instruction, t)));
            }
            return Runner.run(null, ...n);
        }
        if (null != i.unloading) return i.unloading(this.instruction, t);
        if (null != i.unload) {
            console.warn(`[Deprecated] Found deprecated hook name "unload" in ${this.instruction.component.name}. Please use the new name "unloading" instead.`);
            return i.unload(this.instruction, t);
        }
    }
    activateComponent(t, i, n, s, e, r, o) {
        return Runner.run(t, (() => this.contentStates.await("loaded")), (() => this.waitForParent(n)), (() => {
            if (this.contentStates.has("activating") || this.contentStates.has("activated")) return;
            this.contentStates.set("activating", void 0);
            return this.controller?.activate(i ?? this.controller, n, s, void 0);
        }), (() => {
            this.contentStates.set("activated", void 0);
        }));
    }
    deactivateComponent(t, i, n, s, e, r = false) {
        if (!this.contentStates.has("activated") && !this.contentStates.has("activating")) return;
        return Runner.run(t, (() => {
            if (r && null !== e.element) {
                const t = Array.from(e.element.getElementsByTagName("*"));
                for (const i of t) if (i.scrollTop > 0 || i.scrollLeft) i.setAttribute("au-element-scroll", `${i.scrollTop},${i.scrollLeft}`);
            }
            this.contentStates.delete("activated");
            this.contentStates.delete("activating");
            return this.controller?.deactivate(i ?? this.controller, n, s);
        }));
    }
    disposeComponent(t, i, n = false) {
        if (!this.contentStates.has("created") || null == this.instruction.component.instance) return;
        if (!n) {
            this.contentStates.delete("created");
            return this.controller?.dispose();
        } else i.push(this);
    }
    freeContent(t, i, n, s, e = false) {
        return Runner.run(t, (() => this.unload(n)), (t => this.deactivateComponent(t, null, i.controller, 0, i, e)), (() => this.disposeComponent(i, s, e)));
    }
    toComponentName() {
        return this.instruction.component.name;
    }
    toComponentType(t) {
        if (this.instruction.component.none) return null;
        return this.instruction.component.toType(t, this.instruction);
    }
    toComponentInstance(t, i, n) {
        if (this.instruction.component.none) return null;
        return this.instruction.component.toInstance(t, i, n, this.instruction);
    }
    waitForParent(t) {
        if (null === t) return;
        if (!t.isActive) return new Promise((t => {
            this.endpoint.activeResolve = t;
        }));
    }
    getLifecycleHooks(t, i) {
        const n = t.$controller.lifecycleHooks[i] ?? [];
        return n.map((t => t.instance[i].bind(t.instance)));
    }
}

class ViewportOptions {
    constructor(t = true, i = [], n = "", s = "", e = "", r = false, o = false, h = false, u = false, l = false) {
        this.scope = t;
        this.usedBy = i;
        this.fallback = s;
        this.fallbackAction = e;
        this.noLink = r;
        this.noTitle = o;
        this.stateful = h;
        this.forceDescription = u;
        this.noHistory = l;
        this.default = void 0;
        this.default = n;
    }
    static create(t) {
        const i = new ViewportOptions;
        if (void 0 !== t) i.apply(t);
        return i;
    }
    apply(t) {
        this.scope = t.scope ?? this.scope;
        this.usedBy = ("string" === typeof t.usedBy ? t.usedBy.split(",").filter((t => t.length > 0)) : t.usedBy) ?? this.usedBy;
        this.default = t.default ?? this.default;
        this.fallback = t.fallback ?? this.fallback;
        this.fallbackAction = t.fallbackAction ?? this.fallbackAction;
        this.noLink = t.noLink ?? this.noLink;
        this.noTitle = t.noTitle ?? this.noTitle;
        this.stateful = t.stateful ?? this.stateful;
        this.forceDescription = t.forceDescription ?? this.forceDescription;
        this.noHistory = t.noHistory ?? this.noHistory;
    }
}

class Viewport extends Endpoint$1 {
    constructor(t, i, n, s, e, r) {
        super(t, i, n);
        this.contents = [];
        this.forceRemove = false;
        this.options = new ViewportOptions;
        this.activeResolve = null;
        this.connectionResolve = null;
        this.clear = false;
        this.coordinators = [];
        this.previousViewportState = null;
        this.cache = [];
        this.historyCache = [];
        this.contents.push(new ViewportContent(t, this, s, e));
        this.contents[0].completed = true;
        if (void 0 !== r) this.options.apply(r);
    }
    getContent() {
        if (1 === this.contents.length) return this.contents[0];
        let t;
        for (let i = 0, n = this.contents.length; i < n; i++) if (this.contents[i].completed ?? false) t = this.contents[i]; else break;
        return t;
    }
    getNextContent() {
        if (1 === this.contents.length) return null;
        const t = this.contents.indexOf(this.getContent());
        return this.contents.length > t ? this.contents[t + 1] : null;
    }
    getTimeContent(t) {
        let i = null;
        for (let n = 0, s = this.contents.length; n < s; n++) {
            if (this.contents[n].navigation.timestamp > t) break;
            i = this.contents[n];
        }
        return i;
    }
    getNavigationContent(t) {
        return super.getNavigationContent(t);
    }
    get parentViewport() {
        let t = this.connectedScope;
        while (null != t?.parent) {
            t = t.parent;
            if (t.endpoint.isViewport) return t.endpoint;
        }
        return null;
    }
    get isEmpty() {
        return null === this.getContent().componentInstance;
    }
    get doForceRemove() {
        let t = this.connectedScope;
        while (null !== t) {
            if (t.isViewport && t.endpoint.forceRemove) return true;
            t = t.parent;
        }
        return false;
    }
    isActiveNavigation(t) {
        return this.coordinators[this.coordinators.length - 1] === t;
    }
    toString() {
        const t = this.getContent()?.instruction.component.name ?? "";
        const i = this.getNextContent()?.instruction.component.name ?? "";
        return `v:${this.name}[${t}->${i}]`;
    }
    setNextContent(t, i) {
        t.endpoint.set(this);
        this.clear = t.isClear(this.router);
        const n = this.getContent();
        const s = new ViewportContent(this.router, this, this.owningScope, this.scope.hasScope, !this.clear ? t : void 0, i, this.connectedCE ?? null);
        this.contents.push(s);
        s.fromHistory = null !== s.componentInstance && i.navigation ? !!i.navigation.back || !!i.navigation.forward : false;
        if (this.options.stateful) {
            const t = this.cache.find((t => s.isCacheEqual(t)));
            if (void 0 !== t) {
                this.contents.splice(this.contents.indexOf(s), 1, t);
                s.fromCache = true;
            } else this.cache.push(s);
        }
        if (null !== s.componentInstance && n.componentInstance === s.componentInstance) {
            s.delete();
            this.contents.splice(this.contents.indexOf(s), 1);
            return this.transitionAction = "skip";
        }
        if (!n.equalComponent(s) || i.navigation.refresh || "refresh" === n.reloadBehavior) return this.transitionAction = "swap";
        if ("disallow" === n.reloadBehavior) {
            s.delete();
            this.contents.splice(this.contents.indexOf(s), 1);
            return this.transitionAction = "skip";
        }
        if ("reload" === n.reloadBehavior) {
            n.reload = true;
            s.instruction.component.set(n.componentInstance);
            s.contentStates = n.contentStates.clone();
            s.reload = n.reload;
            return this.transitionAction = "reload";
        }
        if (this.options.stateful && n.equalParameters(s)) {
            s.delete();
            this.contents.splice(this.contents.indexOf(s), 1);
            return this.transitionAction = "skip";
        }
        if (!n.equalParameters(s)) return this.transitionAction = "swap";
        s.delete();
        this.contents.splice(this.contents.indexOf(s), 1);
        return this.transitionAction = "skip";
    }
    setConnectedCE(t, i) {
        i = i ?? {};
        if (this.connectedCE !== t) {
            this.previousViewportState = {
                ...this
            };
            this.clearState();
            this.connectedCE = t;
            this.options.apply(i);
            if (null != this.connectionResolve) this.connectionResolve();
        }
        const n = (this.scope.parent?.endpoint.getRoutes() ?? []).filter((t => (Array.isArray(t.path) ? t.path : [ t.path ]).includes(""))).length > 0;
        if (null === this.getContent().componentInstance && null == this.getNextContent()?.componentInstance && (this.options.default || n)) {
            const t = RoutingInstruction.parse(this.router, this.options.default ?? "");
            if (0 === t.length && n) {
                const i = this.scope.parent?.findInstructions([ RoutingInstruction.create("") ], false, this.router.configuration.options.useConfiguredRoutes);
                if (i?.foundConfiguration) t.push(...i.instructions);
            }
            for (const i of t) {
                i.endpoint.set(this);
                i.scope = this.owningScope;
                i.default = true;
            }
            this.router.load(t, {
                append: true
            }).catch((t => {
                throw t;
            }));
        }
    }
    remove(t, i) {
        if (this.connectedCE === i) return Runner.run(t, (t => {
            if (null !== this.getContent().componentInstance) return this.getContent().freeContent(t, this.connectedCE, this.getNextContent()?.navigation ?? null, this.historyCache, this.doForceRemove ? false : this.router.statefulHistory || this.options.stateful);
        }), (t => {
            if (this.doForceRemove) {
                const i = [];
                for (const t of this.historyCache) i.push((i => t.freeContent(i, null, null, this.historyCache, false)));
                i.push((() => {
                    this.historyCache = [];
                }));
                return Runner.run(t, ...i);
            }
            return true;
        }));
        return false;
    }
    async transition(t) {
        const i = this.router.configuration.options.indicators.viewportNavigating;
        this.coordinators.push(t);
        while (this.coordinators[0] !== t) await this.coordinators[0].waitForSyncState("completed");
        let n = this.parentViewport;
        if (null !== n && "reload" !== n.transitionAction && "swap" !== n.transitionAction) n = null;
        const s = [ i => {
            if (this.isActiveNavigation(t)) return this.canUnload(t, i);
        }, i => {
            if (this.isActiveNavigation(t)) if (!i.previousValue) t.cancel(); else if (this.router.isRestrictedNavigation) {
                const i = this.router.configuration.options;
                this.getNavigationContent(t).createComponent(this.connectedCE, this.options.fallback || i.fallback, this.options.fallbackAction || i.fallbackAction);
            }
            t.addEndpointState(this, "guardedUnload");
        }, () => t.waitForSyncState("guardedUnload", this), () => null !== n ? t.waitForEndpointState(n, "guardedLoad") : void 0, i => {
            if (this.isActiveNavigation(t)) return this.canLoad(t, i);
        }, i => {
            if (this.isActiveNavigation(t)) {
                let n = i.previousValue;
                if ("boolean" === typeof n) {
                    if (!n) {
                        i.cancel();
                        t.cancel();
                        this.getNavigationContent(t).instruction.nextScopeInstructions = null;
                        return;
                    }
                } else {
                    this.getNavigationContent(t).instruction.nextScopeInstructions = null;
                    if ("string" === typeof n) {
                        const t = this.scope;
                        const i = this.router.configuration.options;
                        let s = RoutingInstruction.parse(this.router, n);
                        const e = t.parent?.findInstructions(s, i.useDirectRouting, i.useConfiguredRoutes);
                        if (e?.foundConfiguration || e?.foundInstructions) s = e.instructions;
                        for (const i of s) {
                            i.endpoint.set(this);
                            i.scope = t.owningScope;
                        }
                        n = s;
                    }
                    return Runner.run(i, (i => this.cancelContentChange(t, i)), (t => {
                        void this.router.load(n, {
                            append: true
                        });
                        return t.exit();
                    }));
                }
            }
            t.addEndpointState(this, "guardedLoad");
            t.addEndpointState(this, "guarded");
        } ];
        const e = [ () => t.waitForSyncState("guarded", this), i => {
            if (this.isActiveNavigation(t)) return this.unload(t, i);
        }, () => t.addEndpointState(this, "unloaded"), () => t.waitForSyncState("unloaded", this), () => null !== n ? t.waitForEndpointState(n, "loaded") : void 0, i => {
            if (this.isActiveNavigation(t)) return this.load(t, i);
        }, () => t.addEndpointState(this, "loaded"), () => t.addEndpointState(this, "routed") ];
        const r = [ () => t.waitForSyncState("routed", this), () => t.waitForEndpointState(this, "routed") ];
        const o = this.router.configuration.options.swapOrder;
        switch (o) {
          case "detach-current-attach-next":
            r.push((i => {
                if (this.isActiveNavigation(t)) return this.removeContent(i, t);
            }), (i => {
                if (this.isActiveNavigation(t)) return this.addContent(i, t);
            }));
            break;

          case "attach-next-detach-current":
            r.push((i => {
                if (this.isActiveNavigation(t)) return this.addContent(i, t);
            }), (i => {
                if (this.isActiveNavigation(t)) return this.removeContent(i, t);
            }));
            break;

          case "detach-attach-simultaneously":
            r.push((i => Runner.runParallel(i, (i => {
                if (this.isActiveNavigation(t)) return this.removeContent(i, t);
            }), (i => {
                if (this.isActiveNavigation(t)) return this.addContent(i, t);
            }))));
            break;

          case "attach-detach-simultaneously":
            r.push((i => Runner.runParallel(i, (i => {
                if (this.isActiveNavigation(t)) return this.addContent(i, t);
            }), (i => {
                if (this.isActiveNavigation(t)) return this.removeContent(i, t);
            }))));
            break;
        }
        r.push((() => t.addEndpointState(this, "swapped")));
        this.connectedCE?.setActivity?.(i, true);
        this.connectedCE?.setActivity?.(t.navigation.navigation, true);
        const h = Runner.run(null, (i => t.setEndpointStep(this, i.root)), ...s, ...e, ...r, (() => t.addEndpointState(this, "completed")), (() => t.waitForSyncState("bound")), (() => {
            this.connectedCE?.setActivity?.(i, false);
            this.connectedCE?.setActivity?.(t.navigation.navigation, false);
        }));
        if (h instanceof Promise) h.catch((t => {}));
    }
    canUnload(t, i) {
        return Runner.run(i, (i => this.getContent().connectedScope.canUnload(t, i)), (i => {
            if (!i.previousValue) return false;
            return this.getContent().canUnload(t.navigation);
        }));
    }
    canLoad(t, i) {
        if (this.clear) return true;
        return Runner.run(i, (() => this.waitForConnected()), (() => {
            const i = this.router.configuration.options;
            const n = this.getNavigationContent(t);
            n.createComponent(this.connectedCE, this.options.fallback || i.fallback, this.options.fallbackAction || i.fallbackAction);
            return n.canLoad();
        }));
    }
    load(t, i) {
        if (this.clear) return;
        return this.getNavigationContent(t).load(i);
    }
    addContent(t, i) {
        return this.activate(t, null, this.connectedController, 0, i);
    }
    removeContent(t, i) {
        if (this.isEmpty) return;
        const n = this.router.statefulHistory || (this.options.stateful ?? false);
        return Runner.run(t, (() => i.addEndpointState(this, "bound")), (() => i.waitForSyncState("bound")), (t => this.deactivate(t, null, this.connectedController, n ? 0 : 4)), (() => n ? this.dispose() : void 0));
    }
    activate(t, i, n, s, e) {
        if (null !== this.activeContent.componentInstance) return Runner.run(t, (() => this.activeContent.canLoad()), (t => this.activeContent.load(t)), (t => this.activeContent.activateComponent(t, i, n, s, this.connectedCE, (() => e?.addEndpointState(this, "bound")), e?.waitForSyncState("bound"))));
    }
    deactivate(t, i, n, s) {
        const e = this.getContent();
        if (null != e?.componentInstance && !e.reload && e.componentInstance !== this.getNextContent()?.componentInstance) return e.deactivateComponent(t, i, n, s, this.connectedCE, this.router.statefulHistory || this.options.stateful);
    }
    unload(t, i) {
        return Runner.run(i, (i => this.getContent().connectedScope.unload(t, i)), (() => null != this.getContent().componentInstance ? this.getContent().unload(t.navigation ?? null) : void 0));
    }
    dispose() {
        if (null !== this.getContent().componentInstance && !this.getContent().reload && this.getContent().componentInstance !== this.getNextContent()?.componentInstance) this.getContent().disposeComponent(this.connectedCE, this.historyCache, this.router.statefulHistory || this.options.stateful);
    }
    finalizeContentChange(t, i) {
        const n = this.contents.findIndex((i => i.navigation === t.navigation));
        let s = this.contents[n];
        const e = this.contents[n - 1];
        if (this.clear) {
            const t = new ViewportContent(this.router, this, this.owningScope, this.scope.hasScope, void 0, s.navigation);
            this.contents.splice(n, 1, t);
            s.delete();
            s = t;
        } else s.reload = false;
        e.delete();
        s.completed = true;
        this.transitionAction = "";
        s.contentStates.delete("checkedUnload");
        s.contentStates.delete("checkedLoad");
        this.previousViewportState = null;
        const r = this.router.configuration.options.indicators.viewportNavigating;
        this.connectedCE?.setActivity?.(r, false);
        this.connectedCE?.setActivity?.(t.navigation.navigation, false);
        let o = 0;
        for (let t = 0, i = n; t < i; t++) {
            if (!(this.contents[0].navigation.completed ?? false)) break;
            o++;
        }
        this.contents.splice(0, o);
        T(this.coordinators, (i => i === t));
    }
    cancelContentChange(t, i = null) {
        [ ...new Set(this.scope.children.map((t => t.endpoint))) ].forEach((n => n.cancelContentChange(t, i)));
        const n = this.contents.findIndex((i => i.navigation === t.navigation));
        if (n < 0) return;
        const s = t.getEndpointStep(this)?.current ?? null;
        const e = this.contents[n];
        const r = this.contents[n - 1];
        e.instruction.cancelled = true;
        return Runner.run(s, (t => e.freeContent(t, this.connectedCE, e.navigation, this.historyCache, this.router.statefulHistory || this.options.stateful)), (() => {
            if (this.previousViewportState) Object.assign(this, this.previousViewportState);
            e?.delete();
            if (null !== e) this.contents.splice(this.contents.indexOf(e), 1);
            this.transitionAction = "";
            r?.contentStates.delete("checkedUnload");
            r?.contentStates.delete("checkedLoad");
            const i = this.router.configuration.options.indicators.viewportNavigating;
            this.connectedCE?.setActivity?.(i, false);
            this.connectedCE?.setActivity?.(t.navigation.navigation, false);
            t.removeEndpoint(this);
            T(this.coordinators, (i => i === t));
        }), (() => {
            if (s !== i) return s?.exit();
        }));
    }
    wantComponent(t) {
        return this.options.usedBy.includes(t);
    }
    acceptComponent(t) {
        if ("-" === t || null === t) return true;
        const i = this.options.usedBy;
        if (0 === i.length) return true;
        if (i.includes(t)) return true;
        if (i.filter((t => t.includes("*"))).length) return true;
        return false;
    }
    freeContent(t, i) {
        const n = this.historyCache.find((t => t.componentInstance === i));
        if (void 0 !== n) return Runner.run(t, (t => {
            this.forceRemove = true;
            return n.freeContent(t, null, null, this.historyCache, false);
        }), (() => {
            this.forceRemove = false;
            T(this.historyCache, (t => t === n));
        }));
    }
    getRoutes() {
        const t = [];
        let i = this.getComponentType();
        if (null != i) {
            i = i.constructor === i.constructor.constructor ? i : i.constructor;
            t.push(...A.getConfiguration(i) ?? []);
        }
        return t;
    }
    getTitle(t) {
        if (this.options.noTitle) return "";
        const i = this.getComponentType();
        if (null === i) return "";
        let n = "";
        const s = i.title;
        if (void 0 !== s) if ("string" === typeof s) n = s; else {
            const i = this.getComponentInstance();
            n = s.call(i, i, t);
        } else if (this.router.configuration.options.title.useComponentNames) {
            let t = this.getContentInstruction().component.name ?? "";
            const i = this.router.configuration.options.title.componentPrefix ?? "";
            if (t.startsWith(i)) t = t.slice(i.length);
            t = t.replace("-", " ");
            n = t.slice(0, 1).toLocaleUpperCase() + t.slice(1);
        }
        return n;
    }
    getComponentType() {
        let t = this.getContentInstruction().component.type ?? null;
        if (null === t) {
            const i = r.for(this.connectedCE.element);
            t = i.container.componentType;
        }
        return t ?? null;
    }
    getComponentInstance() {
        return this.getContentInstruction().component.instance ?? null;
    }
    getContentInstruction() {
        return this.getNextContent()?.instruction ?? this.getContent().instruction ?? null;
    }
    clearState() {
        this.options = ViewportOptions.create();
        const t = this.owningScope;
        const i = this.scope.hasScope;
        this.getContent().delete();
        this.contents.shift();
        if (this.contents.length < 1) throw new Error("no content!");
        this.contents.push(new ViewportContent(this.router, this, t, i));
        this.cache = [];
    }
    waitForConnected() {
        if (null === this.connectedCE) return new Promise((t => {
            this.connectionResolve = t;
        }));
    }
}

class InstructionEndpoint {
    constructor() {
        this.name = null;
        this.instance = null;
        this.scope = null;
    }
    get none() {
        return null === this.name && null === this.instance;
    }
    get endpointType() {
        if (this.instance instanceof Viewport) return "Viewport";
        if (this.instance instanceof ViewportScope) return "ViewportScope";
        return null;
    }
    static create(t) {
        const i = new InstructionEndpoint;
        i.set(t);
        return i;
    }
    static isName(t) {
        return "string" === typeof t;
    }
    static isInstance(t) {
        return t instanceof Endpoint$1;
    }
    static getName(t) {
        if (InstructionEndpoint.isName(t)) return t; else return t ? t.name : null;
    }
    static getInstance(t) {
        if (InstructionEndpoint.isName(t)) return null; else return t;
    }
    set(t) {
        if (void 0 === t || "" === t) t = null;
        if ("string" === typeof t) {
            this.name = t;
            this.instance = null;
        } else {
            this.instance = t;
            if (null !== t) {
                this.name = t.name;
                this.scope = t.owningScope;
            }
        }
    }
    toInstance(t) {
        if (null !== this.instance) return this.instance;
        return t.getEndpoint(this.endpointType, this.name);
    }
    same(t, i) {
        if (null !== this.instance && null !== t.instance) return this.instance === t.instance;
        return (null === this.endpointType || null === t.endpointType || this.endpointType === t.endpointType) && (!i || this.scope === t.scope) && (null !== this.instance ? this.instance.name : this.name) === (null !== t.instance ? t.instance.name : t.name);
    }
}

class RoutingInstruction {
    constructor(t, i, n) {
        this.ownsScope = true;
        this.nextScopeInstructions = null;
        this.scope = null;
        this.scopeModifier = "";
        this.needsEndpointDescribed = false;
        this.route = null;
        this.routeStart = false;
        this.default = false;
        this.topInstruction = false;
        this.unparsed = null;
        this.cancelled = false;
        this.component = InstructionComponent.create(t);
        this.endpoint = InstructionEndpoint.create(i);
        this.parameters = InstructionParameters.create(n);
    }
    static create(t, i, n, s = true, e = null) {
        const r = new RoutingInstruction(t, i, n);
        r.ownsScope = s;
        r.nextScopeInstructions = e;
        return r;
    }
    static createClear(t, i) {
        return RoutingInstruction.create(RoutingInstruction.clear(t), i);
    }
    static from(t, i) {
        if (!Array.isArray(i)) i = [ i ];
        const n = [];
        for (const s of i) if ("string" === typeof s) n.push(...RoutingInstruction.parse(t, s)); else if (s instanceof RoutingInstruction) n.push(s); else if (s instanceof Promise) n.push(RoutingInstruction.create(s)); else if (InstructionComponent.isAppelation(s)) n.push(RoutingInstruction.create(s)); else if (InstructionComponent.isDefinition(s)) n.push(RoutingInstruction.create(s.Type)); else if ("component" in s || "id" in s) {
            const i = s;
            const e = RoutingInstruction.create(i.component, i.viewport, i.parameters);
            e.route = s.id ?? null;
            if (void 0 !== i.children && null !== i.children) e.nextScopeInstructions = RoutingInstruction.from(t, i.children);
            n.push(e);
        } else if ("object" === typeof s && null !== s) {
            const t = r.define(s);
            n.push(RoutingInstruction.create(t));
        } else n.push(RoutingInstruction.create(s));
        return n;
    }
    static clear(t) {
        return Separators.for(t).clear;
    }
    static add(t) {
        return Separators.for(t).add;
    }
    static parse(t, i) {
        const n = Separators.for(t);
        let s = "";
        const e = /^[./]+/.exec(i);
        if (Array.isArray(e) && e.length > 0) {
            s = e[0];
            i = i.slice(s.length);
        }
        const r = InstructionParser.parse(n, i, true, true).instructions;
        for (const t of r) t.scopeModifier = s;
        return r;
    }
    static stringify(t, i, n = false, s = false) {
        return "string" === typeof i ? i : i.map((i => i.stringify(t, n, s))).filter((t => t.length > 0)).join(Separators.for(t).sibling);
    }
    static resolve(t) {
        const i = t.filter((t => t.isUnresolved)).map((t => t.resolve())).filter((t => t instanceof Promise));
        if (i.length > 0) return Promise.all(i);
    }
    static containsSiblings(t, i) {
        if (null === i) return false;
        if (i.filter((i => !i.isClear(t) && !i.isClearAll(t))).length > 1) return true;
        return i.some((i => RoutingInstruction.containsSiblings(t, i.nextScopeInstructions)));
    }
    static flat(t) {
        const i = [];
        for (const n of t) {
            i.push(n);
            if (n.hasNextScopeInstructions) i.push(...RoutingInstruction.flat(n.nextScopeInstructions));
        }
        return i;
    }
    static clone(t, i = false, n = false) {
        return t.map((t => t.clone(i, n)));
    }
    static contains(t, i, n, s) {
        return n.every((n => n.isIn(t, i, s)));
    }
    get viewport() {
        return this.endpoint.instance instanceof Viewport || null === this.endpoint.endpointType ? this.endpoint : null;
    }
    get viewportScope() {
        return this.endpoint.instance instanceof ViewportScope || null === this.endpoint.endpointType ? this.endpoint : null;
    }
    get previous() {
        return this.endpoint.instance?.getContent()?.instruction;
    }
    isAdd(t) {
        return this.component.name === Separators.for(t).add;
    }
    isClear(t) {
        return this.component.name === Separators.for(t).clear;
    }
    isAddAll(t) {
        return this.isAdd(t) && 0 === (this.endpoint.name?.length ?? 0);
    }
    isClearAll(t) {
        return this.isClear(t) && 0 === (this.endpoint.name?.length ?? 0);
    }
    get hasNextScopeInstructions() {
        return (this.nextScopeInstructions?.length ?? 0) > 0;
    }
    get isUnresolved() {
        return this.component.isFunction() || this.component.isPromise();
    }
    resolve() {
        return this.component.resolve(this);
    }
    typeParameters(t) {
        return this.parameters.toSpecifiedParameters(t, this.component.type?.parameters ?? []);
    }
    sameRoute(t) {
        const i = this.route?.match;
        const n = t.route?.match;
        if (null == i || null == n) return false;
        if ("string" === typeof i || "string" === typeof n) return i === n;
        return i.id === n.id;
    }
    sameComponent(t, i, n = false, s = false) {
        if (n && !this.sameParameters(t, i, s)) return false;
        return this.component.same(i.component, s);
    }
    sameEndpoint(t, i) {
        return this.endpoint.same(t.endpoint, i);
    }
    sameParameters(t, i, n = false) {
        if (!this.component.same(i.component, n)) return false;
        return this.parameters.same(t, i.parameters, this.component.type);
    }
    stringify(t, i = false, n = false) {
        const s = Separators.for(t);
        let e = i;
        let r = false;
        if (n) {
            const t = this.viewport?.instance ?? null;
            if (t?.options.noLink ?? false) return "";
            if (!this.needsEndpointDescribed && (!(t?.options.forceDescription ?? false) || null != this.viewportScope?.instance)) e = true;
            if (t?.options.fallback === this.component.name) r = true;
            if (t?.options.default === this.component.name) r = true;
        }
        const o = this.nextScopeInstructions;
        let h = this.scopeModifier;
        if (this.route instanceof FoundRoute && !this.routeStart) return Array.isArray(o) ? RoutingInstruction.stringify(t, o, i, n) : "";
        const u = this.stringifyShallow(t, e, r);
        h += u.endsWith(s.scope) ? u.slice(0, -s.scope.length) : u;
        if (Array.isArray(o) && o.length > 0) {
            const e = RoutingInstruction.stringify(t, o, i, n);
            if (e.length > 0) {
                h += s.scope;
                h += 1 === o.length ? e : `${s.groupStart}${e}${s.groupEnd}`;
            }
        }
        return h;
    }
    clone(t = false, i = false, n = false) {
        const s = RoutingInstruction.create(this.component.func ?? this.component.promise ?? this.component.type ?? this.component.name, this.endpoint.name, null !== this.parameters.typedParameters ? this.parameters.typedParameters : void 0);
        if (t) {
            s.component.set(this.component.instance ?? this.component.type ?? this.component.name);
            s.endpoint.set(this.endpoint.instance ?? this.endpoint.name);
        }
        s.component.name = this.component.name;
        s.needsEndpointDescribed = this.needsEndpointDescribed;
        s.route = this.route;
        s.routeStart = this.routeStart;
        s.default = this.default;
        if (i) s.scopeModifier = this.scopeModifier;
        s.scope = t ? this.scope : null;
        if (this.hasNextScopeInstructions && !n) s.nextScopeInstructions = RoutingInstruction.clone(this.nextScopeInstructions, t, i);
        return s;
    }
    isIn(t, i, n) {
        const s = i.filter((i => {
            if (null != this.route || null != i.route) {
                if (!i.sameRoute(this)) return false;
            } else if (!i.sameComponent(t, this)) return false;
            const n = i.component.type ?? this.component.type;
            const s = this.component.type ?? i.component.type;
            const e = i.parameters.toSpecifiedParameters(t, n?.parameters);
            const r = this.parameters.toSpecifiedParameters(t, s?.parameters);
            if (!InstructionParameters.contains(e, r)) return false;
            return this.endpoint.none || i.sameEndpoint(this, false);
        }));
        if (0 === s.length) return false;
        if (!n || !this.hasNextScopeInstructions) return true;
        if (s.some((i => RoutingInstruction.contains(t, i.nextScopeInstructions ?? [], this.nextScopeInstructions, n)))) return true;
        return false;
    }
    getTitle(t) {
        if (this.route instanceof FoundRoute) {
            const i = this.route.match?.title;
            if (null != i) if (this.routeStart) return "string" === typeof i ? i : i(this, t); else return "";
        }
        return this.endpoint.instance.getTitle(t);
    }
    toJSON() {
        return {
            component: this.component.name ?? void 0,
            viewport: this.endpoint.name ?? void 0,
            parameters: this.parameters.parametersRecord ?? void 0,
            children: this.hasNextScopeInstructions ? this.nextScopeInstructions : void 0
        };
    }
    stringifyShallow(t, i = false, n = false) {
        if (null != this.route) {
            const i = this.route instanceof FoundRoute ? this.route.matching : this.route;
            return i.split("/").map((i => i.startsWith(":") ? this.parameters.get(t, i.slice(1)) : i)).join("/");
        }
        const s = Separators.for(t);
        let e = !n ? this.component.name ?? "" : "";
        const r = this.component.type ? this.component.type.parameters : null;
        const o = InstructionParameters.stringify(t, this.parameters.toSortedParameters(t, r));
        if (o.length > 0) e += !n ? `${s.parameters}${o}${s.parametersEnd}` : o;
        if (null != this.endpoint.name && !i) e += `${s.viewport}${this.endpoint.name}`;
        if (!this.ownsScope) e += s.noScope;
        return e || "";
    }
}

class NavigatorNavigateEvent {
    constructor(t, i) {
        this.eventName = t;
        this.navigation = i;
    }
    static create(t) {
        return new NavigatorNavigateEvent(NavigatorNavigateEvent.eventName, t);
    }
}

NavigatorNavigateEvent.eventName = "au:router:navigation-navigate";

let x = class Navigator {
    constructor(t, i) {
        this.ea = t;
        this.container = i;
        this.lastNavigationIndex = -1;
        this.navigations = [];
        this.options = {
            statefulHistoryLength: 0
        };
        this.isActive = false;
        this.uninitializedNavigation = Navigation.create({
            instruction: "NAVIGATOR UNINITIALIZED",
            fullStateInstruction: "",
            index: 0,
            completed: true
        });
        this.lastNavigationIndex = -1;
    }
    start(t) {
        if (this.isActive) throw new Error("Navigator has already been started");
        this.isActive = true;
        this.options = {
            ...t
        };
    }
    stop() {
        if (!this.isActive) throw new Error("Navigator has not been started");
        this.isActive = false;
    }
    navigate(t) {
        if (!(t instanceof Navigation)) t = Navigation.create(t);
        const i = new NavigationFlags;
        if (-1 === this.lastNavigationIndex) {
            this.loadState();
            if (-1 !== this.lastNavigationIndex) i.refresh = true; else {
                i.first = true;
                i.new = true;
                this.lastNavigationIndex = 0;
                this.navigations = [ Navigation.create({
                    index: 0,
                    instruction: "",
                    fullStateInstruction: ""
                }) ];
            }
        }
        if (void 0 !== t.index && !(t.replacing ?? false) && !(t.refreshing ?? false)) {
            t.historyMovement = t.index - Math.max(this.lastNavigationIndex, 0);
            t.instruction = null != this.navigations[t.index] ? this.navigations[t.index].fullStateInstruction : t.fullStateInstruction;
            t.replacing = true;
            if (t.historyMovement > 0) i.forward = true; else if (t.historyMovement < 0) i.back = true;
        } else if ((t.refreshing ?? false) || i.refresh) {
            t = this.navigations[this.lastNavigationIndex];
            t.replacing = true;
            t.refreshing = true;
        } else if (t.replacing ?? false) {
            i.replace = true;
            i.new = true;
            t.index = this.lastNavigationIndex;
        } else {
            i.new = true;
            t.index = this.lastNavigationIndex + 1;
            this.navigations[t.index] = t;
        }
        t.navigation = i;
        t.previous = this.navigations[Math.max(this.lastNavigationIndex, 0)];
        t.process = new OpenPromise;
        this.lastNavigationIndex = t.index;
        this.notifySubscribers(t);
        return t.process.promise;
    }
    async finalize(t, i) {
        if (t.untracked ?? false) {
            if ((t.fromBrowser ?? false) && null != this.options.store) await this.options.store.popNavigatorState();
        } else if (t.replacing ?? false) {
            if (0 === (t.historyMovement ?? 0)) this.navigations[t.previous.index] = t;
            await this.saveState(t.index, false);
        } else {
            const n = t.index;
            if (i) this.navigations = this.navigations.slice(0, n);
            this.navigations[n] = t;
            if ((this.options.statefulHistoryLength ?? 0) > 0) {
                const t = this.navigations.length - (this.options.statefulHistoryLength ?? 0);
                for (const i of this.navigations.slice(n)) if ("string" !== typeof i.instruction || "string" !== typeof i.fullStateInstruction) await this.serializeNavigation(i, this.navigations.slice(t, n));
            }
            await this.saveState(t.index, !(t.fromBrowser ?? false));
        }
    }
    async cancel(t) {
        if (null != this.options.store) if (t.navigation?.new) {
            if (t.fromBrowser ?? false) await this.options.store.popNavigatorState();
        } else if (0 !== (t.historyMovement ?? 0)) await this.options.store.go(-t.historyMovement, true);
    }
    async go(t) {
        let i = this.lastNavigationIndex + t;
        i = Math.min(i, this.navigations.length - 1);
        await this.options.store.go(t, true);
        const n = this.navigations[i];
        return this.navigate(n);
    }
    getState() {
        const t = null != this.options.store ? {
            ...this.options.store.state
        } : {};
        const i = t?.navigations ?? [];
        const n = t?.navigationIndex ?? -1;
        return {
            navigations: i,
            navigationIndex: n
        };
    }
    loadState() {
        const {navigations: t, navigationIndex: i} = this.getState();
        this.navigations = t.map((t => Navigation.create(t)));
        this.lastNavigationIndex = i;
    }
    async saveState(t, i) {
        for (let t = 0; t < this.navigations.length; t++) this.navigations[t] = Navigation.create(this.navigations[t].toStoredNavigation());
        if ((this.options.statefulHistoryLength ?? 0) > 0) {
            const t = this.navigations.length - (this.options.statefulHistoryLength ?? 0);
            for (let i = 0; i < t; i++) {
                const n = this.navigations[i];
                if ("string" !== typeof n.instruction || "string" !== typeof n.fullStateInstruction) await this.serializeNavigation(n, this.navigations.slice(t));
            }
        }
        if (null == this.options.store) return Promise.resolve();
        const n = {
            navigations: (this.navigations ?? []).map((t => this.toStoreableNavigation(t))),
            navigationIndex: t
        };
        if (i) return this.options?.store?.pushNavigatorState(n); else return this.options.store.replaceNavigatorState(n);
    }
    async refresh() {
        if (-1 === this.lastNavigationIndex) return Promise.reject();
        const t = this.navigations[this.lastNavigationIndex];
        t.replacing = true;
        t.refreshing = true;
        return this.navigate(t);
    }
    notifySubscribers(t) {
        this.ea.publish(NavigatorNavigateEvent.eventName, NavigatorNavigateEvent.create(t));
    }
    toStoreableNavigation(t) {
        const i = t instanceof Navigation ? t.toStoredNavigation() : t;
        i.instruction = RoutingInstruction.stringify(this.container, i.instruction);
        i.fullStateInstruction = RoutingInstruction.stringify(this.container, i.fullStateInstruction, false, true);
        if ("string" !== typeof i.scope) i.scope = null;
        return i;
    }
    async serializeNavigation(t, i) {
        let n = [];
        for (const t of i) {
            if ("string" !== typeof t.instruction) n.push(...RoutingInstruction.flat(t.instruction).filter((t => null !== t.endpoint.instance)).map((t => t.component.instance)));
            if ("string" !== typeof t.fullStateInstruction) n.push(...RoutingInstruction.flat(t.fullStateInstruction).filter((t => null !== t.endpoint.instance)).map((t => t.component.instance)));
        }
        n = V(n);
        let s = [];
        if ("string" !== typeof t.fullStateInstruction) {
            s.push(...t.fullStateInstruction);
            t.fullStateInstruction = RoutingInstruction.stringify(this.container, t.fullStateInstruction, false, true);
        }
        if ("string" !== typeof t.instruction) {
            s.push(...t.instruction);
            t.instruction = RoutingInstruction.stringify(this.container, t.instruction);
        }
        s = s.filter(((t, i, n) => null != t.component.instance && n.indexOf(t) === i));
        const e = [];
        for (const t of s) await this.freeInstructionComponents(t, n, e);
    }
    freeInstructionComponents(t, i, n) {
        const s = t.component.instance;
        const e = t.viewport?.instance ?? null;
        if (null === s || null === e || n.some((t => t === s))) return;
        if (!i.some((t => t === s))) return Runner.run(null, (t => e.freeContent(t, s)), (() => {
            n.push(s);
        }));
        if (t.hasNextScopeInstructions) for (const s of t.nextScopeInstructions) return this.freeInstructionComponents(s, i, n);
    }
};

x = k([ $(0, i), $(1, n) ], x);

const F = C;

const U = S;

const M = N;

const j = b;

class Collection extends Array {
    constructor() {
        super(...arguments);
        this.currentIndex = -1;
    }
    next() {
        if (this.length > this.currentIndex + 1) return this[++this.currentIndex]; else {
            this.currentIndex = -1;
            return null;
        }
    }
    removeCurrent() {
        this.splice(this.currentIndex--, 1);
    }
    remove(t) {
        T(this, (i => i === t));
    }
}

class EndpointMatcher {
    static matchEndpoints(t, i, n, s = false) {
        const e = [];
        const r = t.getOwnedRoutingScopes(1 / 0);
        const o = r.map((t => t.endpoint));
        const h = o.filter((t => null !== t && !n.some((i => t === i.endpoint.instance && !i.cancelled))));
        const u = new Collection(...i.slice());
        let l = null;
        EndpointMatcher.matchKnownEndpoints(t.router, "ViewportScope", u, h, e, false);
        if (!s) EndpointMatcher.matchKnownEndpoints(t.router, "Viewport", u, h, e, false);
        EndpointMatcher.matchViewportScopeSegment(t.router, t, u, h, e);
        while (null !== (l = u.next())) l.needsEndpointDescribed = true;
        EndpointMatcher.matchViewportConfiguration(u, h, e);
        if (!s) EndpointMatcher.matchSpecifiedViewport(u, h, e, false);
        EndpointMatcher.matchLastViewport(u, h, e);
        if (s) EndpointMatcher.matchSpecifiedViewport(u, h, e, false);
        return {
            matchedInstructions: e,
            remainingInstructions: [ ...u ]
        };
    }
    static matchKnownEndpoints(t, i, n, s, e, r = false) {
        let o;
        while (null !== (o = n.next())) if (null !== o.endpoint.instance && !o.isAdd(t) && o.endpoint.endpointType === i) {
            EndpointMatcher.matchEndpoint(o, o.endpoint.instance, r);
            e.push(o);
            T(s, (t => t === o.endpoint.instance));
            n.removeCurrent();
        }
    }
    static matchViewportScopeSegment(t, i, n, s, e) {
        let r;
        while (null !== (r = n.next())) for (let o of s) {
            if (!(o instanceof ViewportScope)) continue;
            if (o.acceptSegment(r.component.name)) {
                if (Array.isArray(o.source)) {
                    let n = s.find((t => t instanceof ViewportScope && t.name === o.name));
                    if (void 0 === n || r.isAdd(t)) {
                        const t = o.addSourceItem();
                        n = i.getOwnedScopes().filter((t => t.isViewportScope)).map((t => t.endpoint)).find((i => i.sourceItem === t));
                    }
                    o = n;
                }
                EndpointMatcher.matchEndpoint(r, o, false);
                e.push(r);
                T(s, (t => t === r.endpoint.instance));
                n.removeCurrent();
                break;
            }
        }
    }
    static matchViewportConfiguration(t, i, n) {
        let s;
        while (null !== (s = t.next())) for (const e of i) {
            if (!(e instanceof Viewport)) continue;
            if (e?.wantComponent(s.component.name)) {
                EndpointMatcher.matchEndpoint(s, e, true);
                n.push(s);
                T(i, (t => t === s.endpoint.instance));
                t.removeCurrent();
                break;
            }
        }
    }
    static matchSpecifiedViewport(t, i, n, s) {
        let e;
        while (null !== (e = t.next())) {
            let r = e.endpoint.instance;
            if (null == r) {
                const t = e.endpoint.name;
                if (0 === (t?.length ?? 0)) continue;
                for (const n of i) {
                    if (!(n instanceof Viewport)) continue;
                    if (t === n.name) {
                        r = n;
                        break;
                    }
                }
            }
            if (r?.acceptComponent(e.component.name)) {
                EndpointMatcher.matchEndpoint(e, r, s);
                n.push(e);
                T(i, (t => t === e.endpoint.instance));
                t.removeCurrent();
            }
        }
    }
    static matchLastViewport(t, i, n) {
        let s;
        while (null !== (s = t.next())) {
            const e = [];
            for (const t of i) {
                if (!(t instanceof Viewport)) continue;
                if (t.acceptComponent(s.component.name)) e.push(t);
            }
            if (1 === e.length) {
                const r = e[0];
                EndpointMatcher.matchEndpoint(s, r, true);
                n.push(s);
                T(i, (t => t === s.endpoint.instance));
                t.removeCurrent();
            }
        }
    }
    static matchEndpoint(t, i, n) {
        t.endpoint.set(i);
        if (n) t.needsEndpointDescribed = false;
        if (t.hasNextScopeInstructions) t.nextScopeInstructions.forEach((t => {
            if (null === t.scope) t.scope = i instanceof Viewport ? i.scope : i.scope.scope;
        }));
    }
}

class RoutingScope {
    constructor(t, i, n, s) {
        this.router = t;
        this.hasScope = i;
        this.owningScope = n;
        this.endpointContent = s;
        this.id = -1;
        this.parent = null;
        this.children = [];
        this.path = null;
        this.id = ++RoutingScope.lastId;
        this.owningScope = n ?? this;
    }
    static for(t) {
        if (null == t) return null;
        if (t instanceof RoutingScope || t instanceof Viewport || t instanceof ViewportScope) return t.scope;
        let i;
        if ("res" in t) i = t; else if ("container" in t) i = t.container; else if ("$controller" in t) i = t.$controller.container; else {
            const n = r.for(t, {
                searchParents: true
            });
            i = n?.container;
        }
        if (null == i) return null;
        const n = i.has(Router.closestEndpointKey, true) ? i.get(Router.closestEndpointKey) : null;
        return n?.scope ?? null;
    }
    get scope() {
        return this.hasScope ? this : this.owningScope.scope;
    }
    get endpoint() {
        return this.endpointContent.endpoint;
    }
    get isViewport() {
        return this.endpoint instanceof Viewport;
    }
    get isViewportScope() {
        return this.endpoint instanceof ViewportScope;
    }
    get type() {
        return this.isViewport ? "Viewport" : "ViewportScope";
    }
    get enabled() {
        return this.endpointContent.isActive;
    }
    get passThroughScope() {
        return this.isViewportScope && this.endpoint.passThroughScope;
    }
    get pathname() {
        return `${this.owningScope !== this ? this.owningScope.pathname : ""}/${this.endpoint.name}`;
    }
    toString(t = false) {
        return `${this.owningScope !== this ? this.owningScope.toString() : ""}/${!this.enabled ? "(" : ""}${this.endpoint.toString()}#${this.id}${!this.enabled ? ")" : ""}` + `${t ? `\n` + this.children.map((t => t.toString(true))).join("") : ""}`;
    }
    toStringOwning(t = false) {
        return `${this.owningScope !== this ? this.owningScope.toString() : ""}/${!this.enabled ? "(" : ""}${this.endpoint.toString()}#${this.id}${!this.enabled ? ")" : ""}` + `${t ? `\n` + this.ownedScopes.map((t => t.toStringOwning(true))).join("") : ""}`;
    }
    get enabledChildren() {
        return this.children.filter((t => t.enabled));
    }
    get hoistedChildren() {
        const t = this.enabledChildren;
        while (t.some((t => t.passThroughScope))) for (const i of t.slice()) if (i.passThroughScope) {
            const n = t.indexOf(i);
            t.splice(n, 1, ...i.enabledChildren);
        }
        return t;
    }
    get ownedScopes() {
        return this.getOwnedScopes();
    }
    get routingInstruction() {
        if (this.endpoint.isViewportScope) return this.endpoint.instruction;
        if (this.isViewport) return this.endpoint.activeContent.instruction;
        return null;
    }
    getOwnedScopes(t = false) {
        const i = this.allScopes(t).filter((t => t.owningScope === this));
        for (const t of i.slice()) if (t.passThroughScope) {
            const n = i.indexOf(t);
            i.splice(n, 1, ...t.getOwnedScopes());
        }
        return i;
    }
    async processInstructions(t, i, n, s, e = "") {
        const r = this.router;
        const o = r.configuration.options;
        const h = t.filter((t => !(t.route instanceof Route)));
        if (h.length > 0) {
            const i = this.findInstructions(h, o.useDirectRouting, o.useConfiguredRoutes);
            if (h.some((t => !t.component.none || null != t.route)) && !i.foundConfiguration && !i.foundInstructions) this.unknownRoute(h);
            t = [ ...t.filter((t => t.route instanceof Route)), ...i.instructions ];
            if (t.some((t => t.scope !== this))) console.warn("Not the current scope for instruction(s)!", this, t);
            if (i.foundConfiguration) e = (e ?? "") + i.matching;
        }
        const u = RoutingInstruction.resolve(t);
        if (u instanceof Promise) await u;
        if (!o.additiveInstructionDefault) t = this.ensureClearStateInstruction(t);
        let l = [];
        ({clearEndpoints: l, instructions: t} = this.getClearAllEndpoints(t));
        for (const i of t.filter((t => t.isAddAll(r)))) {
            i.endpoint.set(i.scope.endpoint.name);
            i.scope = i.scope.owningScope;
        }
        let a = [];
        let {matchedInstructions: c, remainingInstructions: f} = this.matchEndpoints(t, i);
        let d = 100;
        do {
            if (!d--) r.unresolvedInstructionsError(n, f);
            const o = [];
            const h = c.map((t => t.endpoint.instance));
            c.push(...l.filter((t => !h.includes(t))).map((t => RoutingInstruction.createClear(r, t))));
            const u = await RoutingHook.invokeBeforeNavigation(c, n);
            if (false === u) {
                r.cancelNavigation(n, s);
                return [];
            } else if (true !== u && u !== c) {
                const t = RoutingInstruction.flat(c);
                f = f.filter((i => !t.includes(i)));
                c = u;
            }
            for (const t of c) {
                const h = t.endpoint.instance;
                if (null !== h) {
                    const u = h.setNextContent(t, n);
                    if ("skip" !== u) {
                        o.push(h);
                        s.addEndpoint(h);
                    }
                    const f = [ h ];
                    if ("swap" === u) f.push(...h.getContent().connectedScope.allScopes(true).map((t => t.endpoint)));
                    T(l, (t => f.includes(t)));
                    T(c, (i => i !== t && i.isClear(r) && f.includes(i.endpoint.instance)));
                    if (!t.isClear(r) && t.scope?.parent?.isViewportScope) {
                        T(l, (i => i === t.scope.parent.endpoint));
                        T(c, (i => i !== t && i.isClear(r) && i.endpoint.instance === t.scope.parent.endpoint));
                    }
                    if ("skip" !== u && t.hasNextScopeInstructions) for (const i of t.nextScopeInstructions) {
                        i.scope = h.scope;
                        i.endpoint.instance = null;
                    }
                    if ("skip" === u && !t.hasNextScopeInstructions) a.push(...await h.scope.processInstructions([], i, n, s, e));
                }
            }
            const p = c.filter((t => "skip" === t.endpoint.instance?.transitionAction));
            const g = p.filter((t => t.hasNextScopeInstructions));
            if (0 === p.length || 0 === g.length) {
                if (!r.isRestrictedNavigation) s.finalEndpoint();
                s.run();
                if (s.hasAllEndpoints) {
                    const t = s.waitForSyncState("guardedUnload");
                    if (t instanceof Promise) await t;
                }
            }
            if (s.cancelled) {
                r.cancelNavigation(n, s);
                return [];
            }
            for (const t of o) if (a.every((i => i !== t))) a.push(t);
            i.push(...c.splice(0));
            if (f.length > 0) ({matchedInstructions: c, remainingInstructions: f} = this.matchEndpoints(f, i));
            if (!r.isRestrictedNavigation && (c.length > 0 || f.length > 0) && s.running) {
                const t = s.waitForSyncState("swapped");
                if (t instanceof Promise) await t;
            }
            if (0 === c.length && 0 === f.length) {
                const r = [];
                for (const o of t) {
                    if (!o.hasNextScopeInstructions) continue;
                    const t = o.endpoint.instance?.scope ?? o.endpoint.scope;
                    r.push(t.processInstructions(o.nextScopeInstructions, i, n, s, e));
                }
                a.push(...(await Promise.all(r)).flat());
            }
            ({matchedInstructions: c, remainingInstructions: f} = s.dequeueAppendedInstructions(c, i, f));
            if (0 === c.length && 0 === f.length) {
                const t = i.map((t => t.endpoint.instance?.connectedCE.pendingPromise?.promise)).filter((t => null != t));
                if (t.length > 0) {
                    await Promise.any(t);
                    ({matchedInstructions: c, remainingInstructions: f} = s.dequeueAppendedInstructions(c, i, f));
                } else c = l.map((t => RoutingInstruction.createClear(r, t)));
            }
            const v = RoutingInstruction.resolve(c);
            if (v instanceof Promise) await v;
            i.filter((t => t.cancelled)).forEach((t => {
                const n = i.lastIndexOf(t);
                const s = i[n];
                if (s.cancelled) a = a.filter((t => t !== s.endpoint.instance));
            }));
        } while (c.length > 0 || f.length > 0);
        return a;
    }
    unknownRoute(t) {
        const i = this.router.configuration.options;
        const n = RoutingInstruction.stringify(this.router, t);
        if (null != t[0].route) if (!i.useConfiguredRoutes) throw new Error("Can not match '" + n + "' since the router is configured to not use configured routes."); else throw new Error("No matching configured route found for '" + n + "'."); else if (i.useConfiguredRoutes && i.useDirectRouting) throw new Error("No matching configured route or component found for '" + n + "'."); else if (i.useConfiguredRoutes) throw new Error("No matching configured route found for '" + n + "'."); else throw new Error("No matching route/component found for '" + n + "'.");
    }
    ensureClearStateInstruction(t) {
        const i = this.router;
        if (!t.some((t => t.isClearAll(i)))) {
            const n = RoutingInstruction.create(RoutingInstruction.clear(i));
            n.scope = this;
            return [ n, ...t ];
        }
        return t;
    }
    getClearAllEndpoints(t) {
        const i = this.router;
        let n = [];
        if (t.some((t => (t.scope ?? this) === this && t.isClearAll(i)))) {
            n = this.enabledChildren.filter((t => !t.endpoint.isEmpty)).map((t => t.endpoint));
            t = t.filter((t => !((t.scope ?? this) === this && t.isClearAll(i))));
        }
        return {
            clearEndpoints: n,
            instructions: t
        };
    }
    findInstructions(t, i, n) {
        const s = this.router;
        let e = new FoundRoute;
        if (n && !RoutingInstruction.containsSiblings(s, t)) {
            let n = t.filter((t => t.isClear(s) || t.isClearAll(s)));
            const r = t.filter((t => !t.isClear(s) && !t.isClearAll(s)));
            if (r.length > 0) for (const o of r) {
                const r = "string" === typeof o.route ? o.route : o.unparsed ?? RoutingInstruction.stringify(s, [ o ]);
                const h = this.findMatchingRoute(r, o.parameters.parametersRecord ?? {});
                if (h.foundConfiguration) {
                    e = h;
                    e.instructions = [ ...n, ...e.instructions ];
                    n = [];
                } else if (i) {
                    e.instructions = [ ...n, ...e.instructions, o ];
                    n = [];
                    e.remaining = RoutingInstruction.stringify(s, o.nextScopeInstructions ?? []);
                } else throw new Error(`No route found for: ${RoutingInstruction.stringify(s, t)}!`);
            } else e.instructions = [ ...n ];
        } else if (i) e.instructions.push(...t); else throw new Error(`No way to process sibling viewport routes with direct routing disabled: ${RoutingInstruction.stringify(s, t)}!`);
        e.instructions = e.instructions.filter((t => "" !== t.component.name));
        for (const t of e.instructions) if (null === t.scope) t.scope = this;
        return e;
    }
    matchEndpoints(t, i, n = false) {
        const s = [];
        const e = t.filter((t => (t.scope ?? this) === this));
        const r = t.filter((t => (t.scope ?? this) !== this));
        const {matchedInstructions: o, remainingInstructions: h} = EndpointMatcher.matchEndpoints(this, e, i, n);
        s.push(...o);
        r.push(...h);
        return {
            matchedInstructions: s,
            remainingInstructions: r
        };
    }
    addEndpoint(t, i, n, s = {}) {
        let e = this.getOwnedScopes().find((n => n.type === t && n.endpoint.name === i))?.endpoint ?? null;
        if (null != n && null != e?.connectedCE && e.connectedCE !== n) e = this.getOwnedScopes(true).find((s => s.type === t && s.endpoint.name === i && s.endpoint.connectedCE === n))?.endpoint ?? null;
        if (null == e) {
            e = "Viewport" === t ? new Viewport(this.router, i, n, this.scope, !!s.scope, s) : new ViewportScope(this.router, i, n, this.scope, true, null, s);
            this.addChild(e.connectedScope);
        }
        if (null != n) e.setConnectedCE(n, s);
        return e;
    }
    removeEndpoint(t, i, n) {
        if (null !== (n ?? null) || i.removeEndpoint(t, n)) {
            this.removeChild(i.connectedScope);
            return true;
        }
        return false;
    }
    addChild(t) {
        if (!this.children.some((i => i === t))) {
            if (null !== t.parent) t.parent.removeChild(t);
            this.children.push(t);
            t.parent = this;
        }
    }
    removeChild(t) {
        const i = this.children.indexOf(t);
        if (i >= 0) {
            this.children.splice(i, 1);
            t.parent = null;
        }
    }
    allScopes(t = false) {
        const i = t ? this.children.slice() : this.enabledChildren;
        for (const n of i.slice()) i.push(...n.allScopes(t));
        return i;
    }
    reparentRoutingInstructions() {
        const t = this.hoistedChildren.filter((t => null !== t.routingInstruction && t.routingInstruction.component.name));
        if (!t.length) return null;
        for (const i of t) {
            const t = i.reparentRoutingInstructions();
            i.routingInstruction.nextScopeInstructions = null !== t && t.length > 0 ? t : null;
        }
        return t.map((t => t.routingInstruction));
    }
    getChildren(t) {
        const i = this.children.map((i => i.endpoint.getTimeContent(t))).filter((t => null !== t));
        return i.map((t => t.connectedScope));
    }
    getAllRoutingScopes(t) {
        const i = this.getChildren(t);
        for (const n of i.slice()) i.push(...n.getAllRoutingScopes(t));
        return i;
    }
    getOwnedRoutingScopes(t) {
        const i = this.getAllRoutingScopes(t).filter((t => t.owningScope === this));
        for (const n of i.slice()) if (n.passThroughScope) {
            const s = i.indexOf(n);
            i.splice(s, 1, ...n.getOwnedRoutingScopes(t));
        }
        return V(i);
    }
    getRoutingInstructions(t) {
        const i = V(this.getOwnedRoutingScopes(t).map((t => t.endpoint))).map((i => i.getTimeContent(t))).filter((t => null !== t));
        const n = [];
        for (const s of i) {
            const i = s.instruction.clone(true, false, false);
            if ("" !== (i.component.name ?? "")) {
                i.nextScopeInstructions = s.connectedScope.getRoutingInstructions(t);
                n.push(i);
            }
        }
        return n;
    }
    canUnload(t, i) {
        return Runner.run(i, (i => Runner.runParallel(i, ...this.children.map((i => null !== i.endpoint ? n => i.endpoint.canUnload(t, n) : n => i.canUnload(t, n))))), (t => t.previousValue.every((t => t))));
    }
    unload(t, i) {
        return Runner.runParallel(i, ...this.children.map((i => null !== i.endpoint ? n => i.endpoint.unload(t, n) : n => i.unload(t, n))));
    }
    matchScope(t, i = false) {
        const n = [];
        for (const s of t) if (s.scope === this) n.push(s); else if (i && s.hasNextScopeInstructions) n.push(...this.matchScope(s.nextScopeInstructions, i));
        return n;
    }
    findMatchingRoute(t, i) {
        let n = new FoundRoute;
        if (this.isViewportScope && !this.passThroughScope) n = this.findMatchingRouteInRoutes(t, this.endpoint.getRoutes(), i); else if (this.isViewport) n = this.findMatchingRouteInRoutes(t, this.endpoint.getRoutes(), i); else for (const s of this.enabledChildren) {
            n = s.findMatchingRoute(t, i);
            if (n.foundConfiguration) break;
        }
        if (n.foundConfiguration) return n;
        if (null != this.parent) return this.parent.findMatchingRoute(t, i);
        return n;
    }
    findMatchingRouteInRoutes(t, i, n) {
        const s = new FoundRoute;
        if (0 === i.length) return s;
        i = i.map((t => this.ensureProperRoute(t)));
        const e = [];
        for (const t of i) {
            const i = Array.isArray(t.path) ? t.path : [ t.path ];
            for (const n of i) {
                e.push({
                    ...t,
                    path: n,
                    handler: t
                });
                if ("" !== n) e.push({
                    ...t,
                    path: `${n}/*remainingPath`,
                    handler: t
                });
            }
        }
        if (t.startsWith("/") || t.startsWith("+")) t = t.slice(1);
        const r = i.find((i => i.id === t));
        let o = {
            params: {},
            endpoint: {}
        };
        if (null != r) {
            o.endpoint = {
                route: {
                    handler: r
                }
            };
            t = Array.isArray(r.path) ? r.path[0] : r.path;
            const i = t.split("/").map((t => {
                if (t.startsWith(":")) {
                    const i = t.slice(1).replace(/\?$/, "");
                    const s = n[i];
                    o.params[i] = s;
                    return s;
                } else return t;
            }));
            t = i.join("/");
        } else {
            const i = new F;
            i.add(e);
            o = i.recognize(t);
        }
        if (null != o) {
            s.match = o.endpoint.route.handler;
            s.matching = t;
            const e = {
                ...o.params
            };
            if (null != e.remainingPath) {
                s.remaining = e.remainingPath;
                Reflect.deleteProperty(e, "remainingPath");
                s.matching = s.matching.slice(0, s.matching.indexOf(s.remaining));
            }
            s.params = e;
            if (null != s.match?.redirectTo) {
                let t = s.match?.redirectTo;
                if ((s.remaining ?? "").length > 0) t += `/${s.remaining}`;
                return this.findMatchingRouteInRoutes(t, i, n);
            }
        }
        if (s.foundConfiguration) {
            s.instructions = RoutingInstruction.clone(s.match.instructions, false, true);
            const t = s.instructions.slice();
            while (t.length > 0) {
                const i = t.shift();
                i.parameters.addParameters(s.params);
                i.route = s;
                if (i.hasNextScopeInstructions) t.unshift(...i.nextScopeInstructions);
            }
            if (s.instructions.length > 0) s.instructions[0].routeStart = true;
            const i = RoutingInstruction.parse(this.router, s.remaining);
            if (i.length > 0) {
                let t = s.instructions[0];
                while (t.hasNextScopeInstructions) t = t.nextScopeInstructions[0];
                t.nextScopeInstructions = i;
            }
        }
        return s;
    }
    ensureProperRoute(t) {
        if (void 0 === t.id) t.id = Array.isArray(t.path) ? t.path.join(",") : t.path;
        if (void 0 === t.instructions) t.instructions = [ {
            component: t.component,
            viewport: t.viewport,
            parameters: t.parameters,
            children: t.children
        } ];
        if (null === t.redirectTo) t.instructions = RoutingInstruction.from(this.router, t.instructions);
        return t;
    }
}

RoutingScope.lastId = 0;

class QueueTask {
    constructor(t, i, n = 0) {
        this.taskQueue = t;
        this.item = i;
        this.cost = n;
        this.done = false;
        this.promise = new Promise(((t, i) => {
            this.resolve = () => {
                this.taskQueue.resolve(this, t);
            };
            this.reject = t => {
                this.taskQueue.reject(this, i, t);
            };
        }));
    }
    async execute() {
        if ("execute" in this.item) await this.item.execute(this); else await this.item(this);
    }
    wait() {
        return this.promise;
    }
}

class TaskQueue {
    constructor(t) {
        this.callback = t;
        this.pending = [];
        this.processing = null;
        this.allowedExecutionCostWithinTick = null;
        this.currentExecutionCostInCurrentTick = 0;
        this.platform = null;
        this.task = null;
        this.dequeue = t => {
            if (null !== this.processing) return;
            if (void 0 !== t) this.currentExecutionCostInCurrentTick = 0;
            if (0 === this.pending.length) return;
            if (null !== this.allowedExecutionCostWithinTick && void 0 === t && this.currentExecutionCostInCurrentTick + (this.pending[0].cost || 0) > this.allowedExecutionCostWithinTick) return;
            this.processing = this.pending.shift() || null;
            if (this.processing) {
                this.currentExecutionCostInCurrentTick += this.processing.cost ?? 0;
                if (void 0 !== this.callback) this.callback(this.processing); else this.processing.execute().catch((t => {
                    throw t;
                }));
            }
        };
    }
    get isActive() {
        return null !== this.task;
    }
    get length() {
        return this.pending.length;
    }
    start(t) {
        this.platform = t.platform;
        this.allowedExecutionCostWithinTick = t.allowedExecutionCostWithinTick;
        this.task = this.platform.domWriteQueue.queueTask(this.dequeue, {
            persistent: true
        });
    }
    stop() {
        this.task.cancel();
        this.task = null;
        this.allowedExecutionCostWithinTick = null;
        this.clear();
    }
    enqueue(t, i) {
        const n = Array.isArray(t);
        const s = n ? t : [ t ];
        const e = s.map(((t, n) => !Array.isArray(i) ? i : i[n])).map((t => void 0 !== t ? t : 1));
        const r = [];
        for (const t of s) r.push(t instanceof QueueTask ? t : this.createQueueTask(t, e.shift()));
        this.pending.push(...r);
        this.dequeue();
        return n ? r : r[0];
    }
    createQueueTask(t, i) {
        return new QueueTask(this, t, i);
    }
    clear() {
        this.pending.length = 0;
    }
    resolve(t, i) {
        i();
        this.processing = null;
        this.dequeue();
    }
    reject(t, i, n) {
        i(n);
        this.processing = null;
        this.dequeue();
    }
}

let H = class BrowserViewerStore {
    constructor(t, i, n, s, e) {
        this.platform = t;
        this.window = i;
        this.history = n;
        this.location = s;
        this.ea = e;
        this.allowedExecutionCostWithinTick = 2;
        this.isActive = false;
        this.options = {
            useUrlFragmentHash: true
        };
        this.forwardedState = {
            eventTask: null,
            suppressPopstate: false
        };
        this.pendingCalls = new TaskQueue;
    }
    start(t) {
        if (this.isActive) throw new Error("Browser navigation has already been started");
        this.isActive = true;
        if (void 0 != t.useUrlFragmentHash) this.options.useUrlFragmentHash = t.useUrlFragmentHash;
        this.pendingCalls.start({
            platform: this.platform,
            allowedExecutionCostWithinTick: this.allowedExecutionCostWithinTick
        });
        this.window.addEventListener("popstate", this);
    }
    stop() {
        if (!this.isActive) throw new Error("Browser navigation has not been started");
        this.window.removeEventListener("popstate", this);
        this.pendingCalls.stop();
        this.options = {
            useUrlFragmentHash: true
        };
        this.isActive = false;
    }
    get length() {
        return this.history.length;
    }
    get state() {
        return this.history.state;
    }
    get viewerState() {
        const {pathname: t, search: i, hash: n} = this.location;
        const s = this.options.useUrlFragmentHash ?? false ? n.slice(1) : `${t}${i}`;
        const e = this.options.useUrlFragmentHash ?? false ? n.slice(1).includes("#") ? n.slice(n.slice(1).indexOf("#", 1)) : "" : n.slice(1);
        return new NavigatorViewerState(t, i.slice(1), e, s);
    }
    async go(t, i = false) {
        const n = this.pendingCalls.createQueueTask((t => t.resolve()), 1);
        this.pendingCalls.enqueue([ t => {
            const s = n;
            const e = i;
            this.forwardState({
                eventTask: s,
                suppressPopstate: e
            });
            t.resolve();
        }, i => {
            const n = this.history;
            const s = t;
            n.go(s);
            i.resolve();
        } ], [ 0, 1 ]);
        return n.wait();
    }
    async pushNavigatorState(t) {
        const {title: i, path: n} = t.navigations[t.navigationIndex];
        const s = this.options.useUrlFragmentHash ? "#/" : "";
        return this.pendingCalls.enqueue((e => {
            const r = this.history;
            const o = t;
            const h = i || "";
            const u = `${s}${n}`;
            try {
                r.pushState(o, h, u);
                this.setTitle(h);
            } catch (t) {
                const i = this.tryCleanState(o, "push", t);
                r.pushState(i, h, u);
                this.setTitle(h);
            }
            e.resolve();
        }), 1).wait();
    }
    async replaceNavigatorState(t, i, n) {
        const s = t.navigations[t.navigationIndex];
        i ?? (i = s.title);
        n ?? (n = s.path);
        const e = this.options.useUrlFragmentHash ? "#/" : "";
        return this.pendingCalls.enqueue((s => {
            const r = this.history;
            const o = t;
            const h = i || "";
            const u = `${e}${n}`;
            try {
                r.replaceState(o, h, u);
                this.setTitle(h);
            } catch (t) {
                const i = this.tryCleanState(o, "replace", t);
                r.replaceState(i, h, u);
                this.setTitle(h);
            }
            s.resolve();
        }), 1).wait();
    }
    async popNavigatorState() {
        const t = this.pendingCalls.createQueueTask((t => t.resolve()), 1);
        this.pendingCalls.enqueue((async i => {
            const n = t;
            await this.popState(n);
            i.resolve();
        }), 1);
        return t.wait();
    }
    setTitle(t) {
        this.window.document.title = t;
    }
    handleEvent(t) {
        this.handlePopStateEvent(t);
    }
    handlePopStateEvent(t) {
        const {eventTask: i, suppressPopstate: n} = this.forwardedState;
        this.forwardedState = {
            eventTask: null,
            suppressPopstate: false
        };
        this.pendingCalls.enqueue((async s => {
            if (!n) this.notifySubscribers(t);
            if (null !== i) await i.execute();
            s.resolve();
        }), 1);
    }
    notifySubscribers(t) {
        this.ea.publish(NavigatorStateChangeEvent.eventName, NavigatorStateChangeEvent.create(this.viewerState, t, this.history.state));
    }
    async popState(t) {
        await this.go(-1, true);
        const i = this.history.state;
        const n = i?.navigations?.[i?.navigationIndex ?? 0];
        if (null != n && !n.firstEntry) {
            await this.go(-1, true);
            await this.pushNavigatorState(i);
        }
        await t.execute();
    }
    forwardState(t) {
        this.forwardedState = t;
    }
    tryCleanState(t, i, n) {
        try {
            return JSON.parse(JSON.stringify(t));
        } catch (t) {
            throw new Error(`Failed to ${i} state, probably due to unserializable data and/or parameters: ${t}${n}`);
        }
    }
};

H = k([ $(0, u), $(1, l), $(2, a), $(3, c), $(4, i) ], H);

class NavigatorViewerState {
    constructor(t, i, n, s) {
        this.path = t;
        this.query = i;
        this.hash = n;
        this.instruction = s;
    }
}

class NavigatorStateChangeEvent {
    constructor(t, i, n, s) {
        this.eventName = t;
        this.viewerState = i;
        this.event = n;
        this.state = s;
    }
    static create(t, i, n) {
        return new NavigatorStateChangeEvent(NavigatorStateChangeEvent.eventName, t, i, n);
    }
}

NavigatorStateChangeEvent.eventName = "au:router:navigation-state-change";

class Entity {
    constructor(t) {
        this.endpoint = t;
        this.running = false;
        this.states = new Map;
        this.checkedStates = [];
        this.syncingState = null;
        this.syncPromise = null;
        this.step = null;
    }
    hasReachedState(t) {
        return this.states.has(t) && null === this.states.get(t);
    }
}

class NavigationCoordinator {
    constructor(t, i) {
        this.router = t;
        this.navigation = i;
        this.running = false;
        this.completed = false;
        this.cancelled = false;
        this.hasAllEndpoints = false;
        this.appendedInstructions = [];
        this.entities = [];
        this.syncStates = new Map;
        this.checkedSyncStates = new Set;
    }
    static create(t, i, n) {
        const s = new NavigationCoordinator(t, i);
        n.syncStates.forEach((t => s.addSyncState(t)));
        return s;
    }
    run() {
        if (!this.running) {
            this.running = true;
            for (const t of this.entities) if (!t.running) {
                t.running = true;
                t.endpoint.transition(this);
            }
        }
    }
    addSyncState(t) {
        const i = new OpenPromise;
        this.syncStates.set(t, i);
    }
    addEndpoint(t) {
        const i = new Entity(t);
        this.entities.push(i);
        this.recheckSyncStates();
        if (this.running) i.endpoint.transition(this);
        return i;
    }
    removeEndpoint(t) {
        const i = this.entities.find((i => i.endpoint === t));
        if (void 0 !== i) T(this.entities, (t => t === i));
    }
    setEndpointStep(t, i) {
        let n = this.entities.find((i => i.endpoint === t));
        if (void 0 === n) n = this.addEndpoint(t);
        n.step = i;
    }
    getEndpointStep(t) {
        const i = this.entities.find((i => i.endpoint === t));
        return i?.step ?? null;
    }
    addEndpointState(t, i) {
        let n = this.entities.find((i => i.endpoint === t));
        if (void 0 === n) n = this.addEndpoint(t);
        const s = n.states.get(i);
        if (s instanceof OpenPromise) s.resolve();
        n.states.set(i, null);
        this.checkSyncState(i);
    }
    waitForSyncState(t, i = null) {
        if (0 === this.entities.length) return;
        const n = this.syncStates.get(t);
        if (void 0 === n) return;
        if (null !== i) {
            const s = this.entities.find((t => t.endpoint === i));
            if (null === s?.syncPromise && n.isPending) {
                s.syncingState = t;
                s.syncPromise = new OpenPromise;
                s.checkedStates.push(t);
                this.checkedSyncStates.add(t);
                Promise.resolve().then((() => {
                    this.checkSyncState(t);
                })).catch((t => {
                    throw t;
                }));
                return s.syncPromise.promise;
            }
        }
        return n.isPending ? n.promise : void 0;
    }
    waitForEndpointState(t, i) {
        if (!this.syncStates.has(i)) return;
        let n = this.entities.find((i => i.endpoint === t));
        if (null == n) n = this.addEndpoint(t);
        if (n.hasReachedState(i)) return;
        let s = n.states.get(i);
        if (null == s) {
            s = new OpenPromise;
            n.states.set(i, s);
        }
        return s.promise;
    }
    finalEndpoint() {
        this.hasAllEndpoints = true;
        this.syncStates.forEach(((t, i) => this.checkSyncState(i)));
    }
    finalize() {
        this.entities.forEach((t => t.endpoint.finalizeContentChange(this, null)));
        this.completed = true;
        this.navigation.completed = true;
    }
    cancel() {
        this.cancelled = true;
        this.entities.forEach((t => {
            const i = t.endpoint.cancelContentChange(this);
            if (i instanceof Promise) i.catch((t => {
                throw t;
            }));
        }));
        this.router.navigator.cancel(this.navigation).then((() => {
            this.navigation.process?.resolve(false);
        })).catch((t => {
            throw t;
        }));
        this.completed = true;
        this.navigation.completed = true;
    }
    enqueueAppendedInstructions(t) {
        this.appendedInstructions.push(...t);
    }
    dequeueAppendedInstructions(t, i, n) {
        let s = [ ...this.appendedInstructions ];
        t = [ ...t ];
        n = [ ...n ];
        const e = s.filter((t => !t.default));
        const r = s.filter((t => t.default));
        s = e.length > 0 ? [ ...e ] : [ ...r ];
        while (s.length > 0) {
            const e = s.shift();
            T(this.appendedInstructions, (t => t === e));
            const r = i.some((t => !t.cancelled && t.sameEndpoint(e, true)));
            const o = t.find((t => t.sameEndpoint(e, true)));
            const h = n.find((t => t.sameEndpoint(e, true)));
            if (e.default && (r || void 0 !== o && !o.default || void 0 !== h && !h.default)) continue;
            if (void 0 !== o) T(t, (t => t === o));
            if (void 0 !== h) T(n, (t => t === h));
            if (null !== e.endpoint.instance) t.push(e); else n.push(e);
        }
        return {
            matchedInstructions: t,
            remainingInstructions: n
        };
    }
    checkSyncState(t) {
        const i = this.syncStates.get(t);
        if (void 0 === i) return;
        if (this.hasAllEndpoints && i.isPending && this.entities.every((i => i.hasReachedState(t))) && (!this.checkedSyncStates.has(t) || this.entities.every((i => i.checkedStates.includes(t))))) {
            for (const i of this.entities) if (i.syncingState === t) {
                i.syncPromise?.resolve();
                i.syncPromise = null;
                i.syncingState = null;
            }
            i.resolve();
        }
    }
    recheckSyncStates() {
        this.syncStates.forEach(((t, i) => {
            if (!t.isPending && !this.entities.every((t => t.hasReachedState(i)))) this.addSyncState(i);
        }));
    }
}

class RoutingHook {
    constructor(t, i, n) {
        this.hook = t;
        this.id = n;
        this.type = "beforeNavigation";
        this.includeTargets = [];
        this.excludeTargets = [];
        if (void 0 !== i.type) this.type = i.type;
        for (const t of i.include ?? []) this.includeTargets.push(new Target(t));
        for (const t of i.exclude ?? []) this.excludeTargets.push(new Target(t));
    }
    static add(t, i) {
        const n = new RoutingHook(t, i ?? {}, ++this.lastIdentity);
        this.hooks[n.type].push(n);
        return this.lastIdentity;
    }
    static remove(t) {
        for (const i in this.hooks) if (Object.prototype.hasOwnProperty.call(this.hooks, i)) {
            const n = this.hooks[i].findIndex((i => i.id === t));
            if (n >= 0) this.hooks[i].splice(n, 1);
        }
    }
    static removeAll() {
        for (const t in this.hooks) this.hooks[t] = [];
    }
    static async invokeBeforeNavigation(t, i) {
        return this.invoke("beforeNavigation", i, t);
    }
    static async invokeTransformFromUrl(t, i) {
        return this.invoke("transformFromUrl", i, t);
    }
    static async invokeTransformToUrl(t, i) {
        return this.invoke("transformToUrl", i, t);
    }
    static async invokeTransformTitle(t, i) {
        return this.invoke("transformTitle", i, t);
    }
    static async invoke(t, i, n) {
        let s = n;
        for (const e of this.hooks[t]) if (!e.wantsMatch || e.matches(n)) {
            s = await e.invoke(i, n);
            if ("boolean" === typeof s) {
                if (!s) return false;
            } else n = s;
        }
        return s;
    }
    get wantsMatch() {
        return this.includeTargets.length > 0 || this.excludeTargets.length > 0;
    }
    matches(t) {
        if (this.includeTargets.length && !this.includeTargets.some((i => i.matches(t)))) return false;
        if (this.excludeTargets.length && this.excludeTargets.some((i => i.matches(t)))) return false;
        return true;
    }
    invoke(t, i) {
        return this.hook(i, t);
    }
}

RoutingHook.hooks = {
    beforeNavigation: [],
    transformFromUrl: [],
    transformToUrl: [],
    transformTitle: []
};

RoutingHook.lastIdentity = 0;

class Target {
    constructor(t) {
        this.componentType = null;
        this.componentName = null;
        this.viewport = null;
        this.viewportName = null;
        if ("string" === typeof t) this.componentName = t; else if (InstructionComponent.isType(t)) {
            this.componentType = t;
            this.componentName = InstructionComponent.getName(t);
        } else {
            const i = t;
            if (null != i.component) {
                this.componentType = InstructionComponent.isType(i.component) ? InstructionComponent.getType(i.component) : null;
                this.componentName = InstructionComponent.getName(i.component);
            }
            if (null != i.viewport) {
                this.viewport = InstructionEndpoint.isInstance(i.viewport) ? i.viewport : null;
                this.viewportName = InstructionEndpoint.getName(i.viewport);
            }
        }
    }
    matches(t) {
        const i = t.slice();
        if (!i.length) i.push(RoutingInstruction.create(""));
        for (const t of i) if (null !== this.componentName && this.componentName === t.component.name || null !== this.componentType && this.componentType === t.component.type || null !== this.viewportName && this.viewportName === t.endpoint.name || null !== this.viewport && this.viewport === t.endpoint.instance) return true;
        return false;
    }
}

class Title {
    static async getTitle(t, i, n) {
        let s = await RoutingHook.invokeTransformTitle(t, i);
        if ("string" !== typeof s) {
            const t = Title.stringifyTitles(s, i, n);
            s = n.appTitle;
            s = s.replace(/\${componentTitles}/g, t);
            s = s.replace(/\${appTitleSeparator}/g, "" !== t ? n.appTitleSeparator : "");
        }
        s = await RoutingHook.invokeTransformTitle(s, i);
        return s;
    }
    static stringifyTitles(t, i, n) {
        const s = t.map((t => Title.stringifyTitle(t, i, n))).filter((t => (t?.length ?? 0) > 0));
        return s.join(" + ");
    }
    static stringifyTitle(t, i, n) {
        const s = t.nextScopeInstructions;
        let e = Title.resolveTitle(t, i, n);
        if (Array.isArray(s) && s.length > 0) {
            let t = Title.stringifyTitles(s, i, n);
            if (t.length > 0) {
                if (1 !== s.length) t = `[ ${t} ]`;
                if (e.length > 0) e = "top-down" === n.componentTitleOrder ? e + n.componentTitleSeparator + t : t + n.componentTitleSeparator + e; else e = t;
            }
        }
        return e;
    }
    static resolveTitle(t, i, n) {
        let s = t.getTitle(i);
        if (null != n.transformTitle) s = n.transformTitle(s, t, i);
        return s;
    }
}

const L = s.createInterface("IRouter", (t => t.singleton(Router)));

class Router {
    constructor(t, i, n, s, e, r) {
        this.container = t;
        this.ea = i;
        this.navigator = n;
        this.viewer = s;
        this.store = e;
        this.configuration = r;
        this.rootScope = null;
        this.activeComponents = [];
        this.appendedInstructions = [];
        this.isActive = false;
        this.coordinators = [];
        this.loadedFirst = false;
        this.handleNavigatorNavigateEvent = t => {
            this.processNavigation(t.navigation).catch((t => {
                throw t;
            }));
        };
        this.handleNavigatorStateChangeEvent = t => {
            if (null != t.state?.navigationIndex) {
                const i = Navigation.create(t.state.navigations[t.state.navigationIndex]);
                i.instruction = t.viewerState.instruction;
                i.fromBrowser = true;
                this.navigator.navigate(i).catch((t => {
                    throw t;
                }));
            } else this.load(t.viewerState.instruction, {
                fromBrowser: true
            }).catch((t => {
                throw t;
            }));
        };
        this.processNavigation = async t => {
            this.loadedFirst = true;
            const i = this.configuration.options;
            const n = NavigationCoordinator.create(this, t, {
                syncStates: this.configuration.options.navigationSyncStates
            });
            this.coordinators.push(n);
            n.appendedInstructions.push(...this.appendedInstructions.splice(0));
            this.ea.publish(RouterNavigationStartEvent.eventName, RouterNavigationStartEvent.create(t));
            let s = "string" === typeof t.instruction && !t.useFullStateInstruction ? await RoutingHook.invokeTransformFromUrl(t.instruction, n.navigation) : t.useFullStateInstruction ? t.fullStateInstruction : t.instruction;
            const e = i.basePath;
            if (null !== e && "string" === typeof s && s.startsWith(e) && !i.useUrlFragmentHash) s = s.slice(e.length);
            if ("/" === s) s = "";
            if ("string" === typeof s) s = "" === s ? [ new RoutingInstruction("") ] : RoutingInstruction.parse(this, s);
            t.scope ?? (t.scope = this.rootScope.scope);
            const r = await t.scope.processInstructions(s, [], t, n);
            return Runner.run(null, (() => {
                n.finalEndpoint();
                return n.waitForSyncState("completed");
            }), (() => {
                n.finalize();
                return this.updateNavigation(t);
            }), (() => {
                if (t.navigation.new && !t.navigation.first && !t.repeating && r.every((t => t.options.noHistory))) t.untracked = true;
            }), (async () => {
                while (this.coordinators.length > 0 && this.coordinators[0].completed) {
                    const t = this.coordinators.shift();
                    await this.navigator.finalize(t.navigation, false);
                    this.ea.publish(RouterNavigationCompleteEvent.eventName, RouterNavigationCompleteEvent.create(t.navigation));
                    this.ea.publish(RouterNavigationEndEvent.eventName, RouterNavigationEndEvent.create(t.navigation));
                    t.navigation.process?.resolve(true);
                }
            }));
        };
    }
    static get inject() {
        return [ n, i, x, H, H, st ];
    }
    get isNavigating() {
        return this.coordinators.length > 0;
    }
    get isRestrictedNavigation() {
        const t = this.configuration.options.navigationSyncStates;
        return t.includes("guardedLoad") || t.includes("unloaded") || t.includes("loaded") || t.includes("guarded") || t.includes("routed");
    }
    get statefulHistory() {
        return void 0 !== this.configuration.options.statefulHistoryLength && this.configuration.options.statefulHistoryLength > 0;
    }
    start() {
        if (this.isActive) throw new Error("Router has already been started");
        this.isActive = true;
        const t = this.container.get(f);
        this.rootScope = new ViewportScope(this, "rootScope", t.controller.viewModel, null, true, t.config.component);
        const i = this.configuration.options;
        if (null === i.basePath) {
            const n = new URL(t.host.baseURI);
            i.basePath = n.pathname;
        }
        if (i.basePath.endsWith("/")) i.basePath = i.basePath.slice(0, -1);
        this.navigator.start({
            store: this.store,
            viewer: this.viewer,
            statefulHistoryLength: this.configuration.options.statefulHistoryLength
        });
        this.navigatorStateChangeEventSubscription = this.ea.subscribe(NavigatorStateChangeEvent.eventName, this.handleNavigatorStateChangeEvent);
        this.navigatorNavigateEventSubscription = this.ea.subscribe(NavigatorNavigateEvent.eventName, this.handleNavigatorNavigateEvent);
        this.viewer.start({
            useUrlFragmentHash: this.configuration.options.useUrlFragmentHash
        });
        this.ea.publish(RouterStartEvent.eventName, RouterStartEvent.create());
    }
    stop() {
        if (!this.isActive) throw new Error("Router has not been started");
        this.ea.publish(RouterStopEvent.eventName, RouterStopEvent.create());
        this.navigator.stop();
        this.viewer.stop();
        this.navigatorStateChangeEventSubscription.dispose();
        this.navigatorNavigateEventSubscription.dispose();
    }
    async initialLoad() {
        const {instruction: t, hash: i} = this.viewer.viewerState;
        const n = this.load(t, {
            fragment: i,
            replacing: true,
            fromBrowser: false
        });
        this.loadedFirst = true;
        return n;
    }
    getEndpoint(t, i) {
        return this.allEndpoints(t).find((t => t.name === i)) ?? null;
    }
    allEndpoints(t, i = false) {
        return this.rootScope.scope.allScopes(i).filter((i => null === t || i.type === t)).map((t => t.endpoint));
    }
    addEndpoint(t, ...i) {
        throw new Error("Not implemented");
    }
    connectEndpoint(t, i, n, s, r) {
        const o = n.container;
        const h = o.has(Router.closestEndpointKey, true) ? o.get(Router.closestEndpointKey) : this.rootScope;
        const u = h.connectedScope;
        if (null === t) {
            t = u.addEndpoint(i, s, n, r);
            e.instance(Router.closestEndpointKey, t).register(o);
        }
        return t;
    }
    disconnectEndpoint(t, i, n) {
        if (!i.connectedScope.parent.removeEndpoint(t, i, n)) throw new Error("Failed to remove endpoint: " + i.name);
    }
    async load(t, i) {
        i = i ?? {};
        t = this.extractFragment(t, i);
        t = this.extractQuery(t, i);
        let n = null;
        ({instructions: t, scope: n} = this.applyLoadOptions(t, i));
        if ((i.append ?? false) && (!this.loadedFirst || this.isNavigating)) {
            t = RoutingInstruction.from(this, t);
            this.appendInstructions(t, n);
            return Promise.resolve();
        }
        const s = Navigation.create({
            instruction: t,
            fullStateInstruction: "",
            scope: n,
            title: i.title,
            data: i.data,
            query: i.query,
            fragment: i.fragment,
            parameters: i.parameters,
            replacing: (i.replacing ?? false) || i.replace,
            repeating: i.append,
            fromBrowser: i.fromBrowser ?? false,
            origin: i.origin,
            completed: false
        });
        return this.navigator.navigate(s);
    }
    applyLoadOptions(t, i, n = true) {
        i = i ?? {};
        if ("origin" in i && !("context" in i)) i.context = i.origin;
        let s = RoutingScope.for(i.context ?? null) ?? null;
        if ("string" === typeof t) {
            if (!t.startsWith("/")) {
                if (t.startsWith(".")) {
                    if (t.startsWith("./")) t = t.slice(2);
                    while (t.startsWith("../")) {
                        s = s?.parent ?? s;
                        t = t.slice(3);
                    }
                }
                if (null != s?.path) {
                    t = `${s.path}/${t}`;
                    s = null;
                }
            } else s = null;
            if (!n) {
                t = RoutingInstruction.from(this, t);
                for (const i of t) if (null === i.scope) i.scope = s;
            }
        } else {
            t = RoutingInstruction.from(this, t);
            for (const i of t) if (null === i.scope) i.scope = s;
        }
        return {
            instructions: t,
            scope: s
        };
    }
    refresh() {
        return this.navigator.refresh();
    }
    back() {
        return this.navigator.go(-1);
    }
    forward() {
        return this.navigator.go(1);
    }
    go(t) {
        return this.navigator.go(t);
    }
    checkActive(t, i) {
        if ("string" === typeof t) throw new Error(`Parameter instructions to checkActivate can not be a string ('${t}')!`);
        i = i ?? {};
        ({instructions: t} = this.applyLoadOptions(t, i));
        t.forEach((t => t.scope ?? (t.scope = this.rootScope.scope)));
        const n = V(t.map((t => t.scope)));
        for (const i of n) {
            const n = i.matchScope(t, false);
            const s = i.matchScope(this.activeComponents, true);
            if (!RoutingInstruction.contains(this, s, n, true)) return false;
        }
        return true;
    }
    unresolvedInstructionsError(t, i) {
        this.ea.publish(RouterNavigationErrorEvent.eventName, RouterNavigationErrorEvent.create(t));
        this.ea.publish(RouterNavigationEndEvent.eventName, RouterNavigationEndEvent.create(t));
        throw z(i);
    }
    cancelNavigation(t, i) {
        i.cancel();
        this.ea.publish(RouterNavigationCancelEvent.eventName, RouterNavigationCancelEvent.create(t));
        this.ea.publish(RouterNavigationEndEvent.eventName, RouterNavigationEndEvent.create(t));
    }
    appendInstructions(t, i = null) {
        if (null === i) i = this.rootScope.scope;
        for (const n of t) if (null === n.scope) n.scope = i;
        let n = null;
        for (let t = this.coordinators.length - 1; t >= 0; t--) if (!this.coordinators[t].completed) {
            n = this.coordinators[t];
            break;
        }
        if (null === n) if (!this.loadedFirst) this.appendedInstructions.push(...t); else throw Error("Failed to append routing instructions to coordinator");
        n?.enqueueAppendedInstructions(t);
    }
    async updateNavigation(t) {
        this.rootScope.scope.reparentRoutingInstructions();
        const i = this.rootScope.scope.getRoutingInstructions(t.timestamp);
        let {matchedInstructions: n} = this.rootScope.scope.matchEndpoints(i, [], true);
        let s = 100;
        while (n.length > 0) {
            if (0 === s--) throw new Error("Failed to find viewport when updating viewer paths.");
            n = n.map((t => {
                const {matchedInstructions: i} = t.endpoint.instance.scope.matchEndpoints(t.nextScopeInstructions ?? [], [], true);
                return i;
            })).flat();
        }
        if (t.timestamp >= (this.activeNavigation?.timestamp ?? 0)) {
            this.activeNavigation = t;
            this.activeComponents = i;
        }
        let e = await RoutingHook.invokeTransformToUrl(i, t);
        if ("string" !== typeof e) e = RoutingInstruction.stringify(this, e, false, true);
        e = await RoutingHook.invokeTransformToUrl(e, t);
        if (null == t.query && null != t.parameters) {
            const i = new URLSearchParams;
            for (let [n, s] of Object.entries(t.parameters)) {
                n = encodeURIComponent(n);
                if (!Array.isArray(s)) s = [ s ];
                for (const t of s) i.append(n, encodeURIComponent(t));
            }
            t.query = i.toString();
        }
        let r = `${this.configuration.options.basePath}/`;
        if (null === r || "" !== e && "/" === e[0] || this.configuration.options.useUrlFragmentHash) r = "";
        const o = (t.query?.length ?? 0) > 0 ? "?" + t.query : "";
        const h = (t.fragment?.length ?? 0) > 0 ? "#" + t.fragment : "";
        t.path = r + e + o + h;
        const u = [ RoutingInstruction.create(RoutingInstruction.clear(this)) ];
        u.push(...RoutingInstruction.clone(i, this.statefulHistory));
        t.fullStateInstruction = u;
        if (null === (t.title ?? null)) {
            const n = await Title.getTitle(i, t, this.configuration.options.title);
            if (null !== n) t.title = n;
        }
        return Promise.resolve();
    }
    extractFragment(t, i) {
        if ("string" === typeof t && null == i.fragment) {
            const [n, s] = t.split("#");
            t = n;
            i.fragment = s;
        }
        return t;
    }
    extractQuery(t, i) {
        if ("string" === typeof t && null == i.query) {
            const [n, s] = t.split("?");
            t = n;
            i.query = s;
        }
        if ("string" === typeof i.parameters && null == i.query) {
            i.query = i.parameters;
            i.parameters = void 0;
        }
        if ("string" === typeof i.query && i.query.length > 0) {
            i.parameters ?? (i.parameters = {});
            const t = new URLSearchParams(i.query);
            t.forEach(((t, n) => {
                n = decodeURIComponent(n);
                t = decodeURIComponent(t);
                if (n in i.parameters) {
                    if (!Array.isArray(i.parameters[n])) i.parameters[n] = [ i.parameters[n] ];
                    i.parameters[n].push(t);
                } else i.parameters[n] = t;
            }));
        }
        return t;
    }
}

Router.closestEndpointKey = t.annotation.keyFor("closest-endpoint");

function z(t) {
    const i = new Error(`${t.length} remaining instructions after 100 iterations; there is likely an infinite loop.`);
    i.remainingInstructions = t;
    console.log(i, i.remainingInstructions);
    return i;
}

class RouterEvent {
    constructor(t) {
        this.eventName = t;
    }
}

class RouterStartEvent extends RouterEvent {
    static create() {
        return new RouterStartEvent(this.eventName);
    }
}

RouterStartEvent.eventName = "au:router:router-start";

class RouterStopEvent extends RouterEvent {
    static create() {
        return new RouterStopEvent(this.eventName);
    }
}

RouterStopEvent.eventName = "au:router:router-stop";

class RouterNavigationEvent {
    constructor(t, i) {
        this.eventName = t;
        this.navigation = i;
    }
}

class RouterNavigationStartEvent extends RouterNavigationEvent {
    static create(t) {
        return new RouterNavigationStartEvent(this.eventName, t);
    }
}

RouterNavigationStartEvent.eventName = "au:router:navigation-start";

class RouterNavigationEndEvent extends RouterNavigationEvent {
    static create(t) {
        return new RouterNavigationEndEvent(this.eventName, t);
    }
}

RouterNavigationEndEvent.eventName = "au:router:navigation-end";

class RouterNavigationCancelEvent extends RouterNavigationEvent {
    static create(t) {
        return new RouterNavigationCancelEvent(this.eventName, t);
    }
}

RouterNavigationCancelEvent.eventName = "au:router:navigation-cancel";

class RouterNavigationCompleteEvent extends RouterNavigationEvent {
    static create(t) {
        return new RouterNavigationCompleteEvent(this.eventName, t);
    }
}

RouterNavigationCompleteEvent.eventName = "au:router:navigation-complete";

class RouterNavigationErrorEvent extends RouterNavigationEvent {
    static create(t) {
        return new RouterNavigationErrorEvent(this.eventName, t);
    }
}

RouterNavigationErrorEvent.eventName = "au:router:navigation-error";

const B = s.createInterface("ILinkHandler", (t => t.singleton(D)));

let D = class LinkHandler {
    constructor(t, i) {
        this.window = t;
        this.router = i;
    }
    handleEvent(t) {
        this.handleClick(t);
    }
    handleClick(t) {
        if (0 !== t.button || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey) return;
        const i = t.currentTarget;
        if (i.hasAttribute("external")) return;
        const n = i.getAttribute("target") ?? "";
        if (n.length > 0 && n !== this.window.name && "_self" !== n) return;
        const s = d.for(i, "load");
        const e = void 0 !== s ? s.viewModel.value : null;
        const r = this.router.configuration.options.useHref && i.hasAttribute("href") ? i.getAttribute("href") : null;
        if ((null === e || 0 === e.length) && (null === r || 0 === r.length)) return;
        t.preventDefault();
        let o = e ?? r ?? "";
        if ("string" === typeof o && o.startsWith("#")) {
            o = o.slice(1);
            if (!o.startsWith("/")) o = `/${o}`;
        }
        this.router.load(o, {
            origin: i
        }).catch((t => {
            throw t;
        }));
    }
};

D = k([ $(0, l), $(1, L) ], D);

var q;

(function(t) {
    t["default"] = "default";
    t["disallow"] = "disallow";
    t["reload"] = "reload";
    t["refresh"] = "refresh";
})(q || (q = {}));

function Q(t) {
    return function(i) {
        return Route.configure(t, i);
    };
}

function _(t, i, n, s, e = false) {
    if (e) return "" === i;
    if (n) return i;
    const r = s.getAttribute(t) ?? "";
    return r.length > 0 ? r : i;
}

function J(t, i) {
    if (t.isActive) return;
    return new Promise((t => {
        const n = i.subscribe(RouterStartEvent.eventName, (() => {
            t();
            n.dispose();
        }));
    }));
}

function W(t, i, n, s) {
    let e = d.for(n, "considered-active")?.viewModel?.value;
    if (void 0 === e) e = s;
    const r = t.applyLoadOptions(e, {
        context: i
    });
    const o = RoutingInstruction.from(t, r.instructions);
    for (const t of o) if (null === t.scope) t.scope = r.scope;
    return o;
}

function G(t) {
    let i = t.parentElement;
    while (null != i) {
        if ("AU-VIEWPORT" === i.tagName) {
            i = null;
            break;
        }
        if (i.hasAttribute("load-active")) break;
        i = i.parentElement;
    }
    i ?? (i = t);
    return i;
}

const K = r.createInjectable();

let Z = class ViewportCustomElement {
    constructor(t, i, n, s, e, r) {
        this.router = t;
        this.element = i;
        this.container = n;
        this.ea = s;
        this.parentViewport = e;
        this.instruction = r;
        this.name = "default";
        this.usedBy = "";
        this.default = "";
        this.fallback = "";
        this.fallbackAction = "";
        this.noScope = false;
        this.noLink = false;
        this.noTitle = false;
        this.noHistory = false;
        this.stateful = false;
        this.endpoint = null;
        this.pendingChildren = [];
        this.pendingPromise = null;
        this.isBound = false;
    }
    hydrated(t) {
        this.controller = t;
        this.container = t.container;
        const i = this.instruction.props.filter((t => "default" === t.to)).length > 0;
        if (i && null != this.parentViewport) {
            this.parentViewport.pendingChildren.push(this);
            if (null === this.parentViewport.pendingPromise) this.parentViewport.pendingPromise = new OpenPromise;
        }
        return Runner.run(null, (() => J(this.router, this.ea)), (() => {
            if (this.router.isRestrictedNavigation) this.connect();
        }));
    }
    binding(t, i, n) {
        this.isBound = true;
        return Runner.run(null, (() => J(this.router, this.ea)), (() => {
            if (!this.router.isRestrictedNavigation) this.connect();
        }), (() => {
            if (null != this.endpoint?.activeResolve) {
                this.endpoint.activeResolve();
                this.endpoint.activeResolve = null;
            }
        }), (() => {
            if (null !== this.endpoint && null === this.endpoint.getNextContent()) return this.endpoint.activate(null, t, this.controller, n, void 0)?.asValue;
        }));
    }
    detaching(t, i, n) {
        if (null !== this.endpoint) {
            this.isBound = false;
            return this.endpoint.deactivate(null, t, i, n);
        }
    }
    unbinding(t, i, n) {
        if (null !== this.endpoint) return this.disconnect(null);
    }
    dispose() {
        this.endpoint?.dispose();
        this.endpoint = null;
    }
    connect() {
        const {isBound: t, element: i} = this;
        const n = _("name", this.name, t, i);
        const s = {};
        s.scope = !_("no-scope", this.noScope, false, i, true);
        s.usedBy = _("used-by", this.usedBy, t, i);
        s.default = _("default", this.default, t, i);
        s.fallback = _("fallback", this.fallback, t, i);
        s.fallbackAction = _("fallback-action", this.fallbackAction, t, i);
        s.noLink = _("no-link", this.noLink, t, i, true);
        s.noTitle = _("no-title", this.noTitle, t, i, true);
        s.noHistory = _("no-history", this.noHistory, t, i, true);
        s.stateful = _("stateful", this.stateful, t, i, true);
        Object.keys(s).forEach((t => {
            if (void 0 === s[t]) delete s[t];
        }));
        this.endpoint = this.router.connectEndpoint(this.endpoint, "Viewport", this, n, s);
        const e = this.parentViewport;
        if (null != e) {
            T(e.pendingChildren, (t => t === this));
            if (0 === e.pendingChildren.length && null !== e.pendingPromise) {
                e.pendingPromise.resolve();
                e.pendingPromise = null;
            }
        }
    }
    disconnect(t) {
        if (null !== this.endpoint) this.router.disconnectEndpoint(t, this.endpoint, this);
    }
    setActivity(t, i) {
        const n = this.router.configuration.options.indicators.viewportNavigating;
        if ("string" === typeof t) this.element.classList.toggle(t, i); else for (const s in t) this.element.classList.toggle(`${n}-${s}`, i && t[s]);
    }
};

k([ g ], Z.prototype, "name", void 0);

k([ g ], Z.prototype, "usedBy", void 0);

k([ g ], Z.prototype, "default", void 0);

k([ g ], Z.prototype, "fallback", void 0);

k([ g ], Z.prototype, "fallbackAction", void 0);

k([ g ], Z.prototype, "noScope", void 0);

k([ g ], Z.prototype, "noLink", void 0);

k([ g ], Z.prototype, "noTitle", void 0);

k([ g ], Z.prototype, "noHistory", void 0);

k([ g ], Z.prototype, "stateful", void 0);

Z = k([ p({
    name: "au-viewport",
    injectable: K
}), $(0, L), $(1, v), $(2, n), $(3, i), $(4, K), $(5, w) ], Z);

const X = r.createInjectable();

let Y = class ViewportScopeCustomElement {
    constructor(t, i, n, s, e) {
        this.router = t;
        this.element = i;
        this.container = n;
        this.parent = s;
        this.parentController = e;
        this.name = "default";
        this.catches = "";
        this.collection = false;
        this.source = null;
        this.viewportScope = null;
        this.isBound = false;
    }
    hydrated(t) {
        this.controller = t;
    }
    bound(t, i, n) {
        this.isBound = true;
        this.$controller.scope = this.parentController.scope;
        this.connect();
        if (null !== this.viewportScope) this.viewportScope.binding();
    }
    unbinding(t, i, n) {
        if (null !== this.viewportScope) this.viewportScope.unbinding();
        return Promise.resolve();
    }
    connect() {
        if (null === this.router.rootScope) return;
        const t = this.getAttribute("name", this.name);
        const i = {};
        let n = this.getAttribute("catches", this.catches);
        if (void 0 !== n) i.catches = n;
        n = this.getAttribute("collection", this.collection, true);
        if (void 0 !== n) i.collection = n;
        i.source = this.source || null;
        this.viewportScope = this.router.connectEndpoint(this.viewportScope, "ViewportScope", this, t, i);
    }
    disconnect() {
        if (this.viewportScope) this.router.disconnectEndpoint(null, this.viewportScope, this);
        this.viewportScope = null;
    }
    getAttribute(t, i, n = false) {
        if (this.isBound) return i; else if (this.element.hasAttribute(t)) if (n) return true; else {
            i = this.element.getAttribute(t);
            if (i.length > 0) return i;
        }
        return;
    }
};

k([ g ], Y.prototype, "name", void 0);

k([ g ], Y.prototype, "catches", void 0);

k([ g ], Y.prototype, "collection", void 0);

k([ g ], Y.prototype, "source", void 0);

Y = k([ p({
    name: "au-viewport-scope",
    template: "<template></template>",
    containerless: false,
    injectable: X
}), $(0, L), $(1, v), $(2, n), $(3, X), $(4, m) ], Y);

let tt = class LoadCustomAttribute {
    constructor(t, i, n, s) {
        this.element = t;
        this.router = i;
        this.linkHandler = n;
        this.ea = s;
        this.h = false;
        this.hasHref = null;
        this.navigationEndHandler = t => {
            void this.updateActive();
        };
        this.activeClass = this.router.configuration.options.indicators.loadActive;
    }
    binding() {
        if (null == this.value) this.h = true;
        this.element.addEventListener("click", this.linkHandler);
        this.updateValue();
        void this.updateActive();
        this.routerNavigationSubscription = this.ea.subscribe(RouterNavigationEndEvent.eventName, this.navigationEndHandler);
    }
    unbinding() {
        this.element.removeEventListener("click", this.linkHandler);
        this.routerNavigationSubscription.dispose();
    }
    valueChanged(t) {
        this.updateValue();
        void this.updateActive();
    }
    updateValue() {
        if (this.h) this.value = {
            component: this.component,
            parameters: this.parameters,
            viewport: this.viewport,
            id: this.id
        };
        if (null === this.hasHref) this.hasHref = this.element.hasAttribute("href");
        if (!this.hasHref) {
            let t = this.value;
            if ("string" !== typeof t) {
                const i = RoutingInstruction.from(this.router, t).shift();
                const n = this.u(t);
                if (n.foundConfiguration) i.route = n.matching;
                t = RoutingInstruction.stringify(this.router, [ i ]);
            }
            if (this.router.configuration.options.useUrlFragmentHash && !t.startsWith("#")) t = `#${t}`;
            this.element.setAttribute("href", t);
        }
    }
    async updateActive() {
        const t = d.for(this.element, "load").parent;
        const i = "string" === typeof this.value ? {
            id: this.value,
            path: this.value
        } : this.value;
        const n = this.u(i);
        const s = n.foundConfiguration ? n.instructions : W(this.router, t, this.element, this.value);
        const e = G(this.element);
        e.classList.toggle(this.activeClass, this.router.checkActive(s, {
            context: t
        }));
    }
    u(t) {
        if ("string" === typeof t) return new FoundRoute;
        const i = RoutingScope.for(this.element) ?? this.router.rootScope.scope;
        if (null != t.id) return i.findMatchingRoute(t.id, t.parameters ?? {});
        const n = t.path;
        if (null != n) return i.findMatchingRoute(n, t.parameters ?? {});
        return new FoundRoute;
    }
};

k([ g({
    mode: R.toView
}) ], tt.prototype, "value", void 0);

k([ g ], tt.prototype, "component", void 0);

k([ g ], tt.prototype, "parameters", void 0);

k([ g ], tt.prototype, "viewport", void 0);

k([ g ], tt.prototype, "id", void 0);

tt = k([ I("load"), $(0, v), $(1, L), $(2, B), $(3, i) ], tt);

let it = class HrefCustomAttribute {
    constructor(t, i, n, s) {
        this.element = t;
        this.router = i;
        this.linkHandler = n;
        this.ea = s;
        this.navigationEndHandler = t => {
            this.updateActive();
        };
        this.activeClass = this.router.configuration.options.indicators.loadActive;
    }
    binding() {
        if (this.router.configuration.options.useHref && !this.hasLoad() && !this.element.hasAttribute("external")) {
            this.element.addEventListener("click", this.linkHandler);
            this.routerNavigationSubscription = this.ea.subscribe(RouterNavigationEndEvent.eventName, this.navigationEndHandler);
        }
        this.updateValue();
        this.updateActive();
    }
    unbinding() {
        this.element.removeEventListener("click", this.linkHandler);
        this.routerNavigationSubscription?.dispose();
    }
    valueChanged() {
        this.updateValue();
        this.updateActive();
    }
    updateValue() {
        this.element.setAttribute("href", this.value);
    }
    updateActive() {
        if (this.router.configuration.options.useHref && !this.hasLoad() && !this.element.hasAttribute("external")) {
            const t = d.for(this.element, "href").parent;
            const i = W(this.router, t, this.element, this.value);
            const n = G(this.element);
            n.classList.toggle(this.activeClass, this.router.checkActive(i, {
                context: t
            }));
        }
    }
    hasLoad() {
        const t = this.$controller.parent;
        const i = t.children;
        return i?.some((t => 1 === t.vmKind && t.viewModel instanceof tt)) ?? false;
    }
};

k([ g({
    mode: R.toView
}) ], it.prototype, "value", void 0);

it = k([ I({
    name: "href",
    noMultiBindings: true
}), $(0, v), $(1, L), $(2, B), $(3, i) ], it);

let nt = class ConsideredActiveCustomAttribute {};

k([ g({
    mode: R.toView
}) ], nt.prototype, "value", void 0);

nt = k([ I("considered-active") ], nt);

const st = s.createInterface("IRouterConfiguration", (t => t.singleton(RouterConfiguration)));

const et = L;

const rt = [ et ];

const ot = Z;

const ht = Y;

const ut = tt;

const lt = it;

const at = [ Z, Y, tt, it, nt ];

class RouterConfiguration {
    static register(t) {
        const i = t.get(st);
        i.options = RouterConfiguration.options;
        i.options.setRouterConfiguration(i);
        RouterConfiguration.options = RouterOptions.create();
        return t.register(...rt, ...at, E.activating(L, RouterConfiguration.configurationCall), E.activated(L, (t => t.initialLoad())), E.deactivated(L, (t => t.stop())));
    }
    static customize(t) {
        if (void 0 === t) {
            RouterConfiguration.options = RouterOptions.create();
            RouterConfiguration.configurationCall = t => {
                t.start();
            };
        } else if (t instanceof Function) RouterConfiguration.configurationCall = t; else {
            RouterConfiguration.options = RouterOptions.create();
            RouterConfiguration.options.apply(t);
        }
        return RouterConfiguration;
    }
    static createContainer() {
        return this.register(s.createContainer());
    }
    static for(t) {
        if (t instanceof Router) return t.configuration;
        return t.get(st);
    }
    apply(t, i = false) {
        if (i) this.options = RouterOptions.create();
        this.options.apply(t);
    }
    addHook(t, i) {
        return RoutingHook.add(t, i);
    }
    removeHook(t) {
        return RoutingHook.remove(t);
    }
    removeAllHooks() {
        return RoutingHook.removeAll();
    }
}

RouterConfiguration.options = RouterOptions.create();

RouterConfiguration.configurationCall = t => {
    t.start();
};

export { U as ConfigurableRoute, nt as ConsideredActiveCustomAttribute, rt as DefaultComponents, at as DefaultResources, Endpoint$1 as Endpoint, EndpointContent, FoundRoute, it as HrefCustomAttribute, lt as HrefCustomAttributeRegistration, B as ILinkHandler, L as IRouter, st as IRouterConfiguration, InstructionParameters, D as LinkHandler, tt as LoadCustomAttribute, ut as LoadCustomAttributeRegistration, Navigation, NavigationCoordinator, NavigationFlags, x as Navigator, M as RecognizedRoute, j as RecognizerEndpoint, q as ReloadBehavior, Route, F as RouteRecognizer, Router, RouterConfiguration, RouterNavigationCancelEvent, RouterNavigationCompleteEvent, RouterNavigationEndEvent, RouterNavigationErrorEvent, RouterNavigationStartEvent, RouterOptions, et as RouterRegistration, RouterStartEvent, RouterStopEvent, A as Routes, RoutingHook, RoutingInstruction, RoutingScope, Runner, Step, Viewport, ViewportContent, Z as ViewportCustomElement, ot as ViewportCustomElementRegistration, ViewportOptions, ViewportScope, ViewportScopeContent, Y as ViewportScopeCustomElement, ht as ViewportScopeCustomElementRegistration, Q as route, O as routes };
//# sourceMappingURL=index.mjs.map
