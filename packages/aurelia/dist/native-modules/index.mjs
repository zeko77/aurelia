import { DI as e, Registration as t } from "../kernel/dist/native-modules/index.mjs";

export { ColorOptions, ConsoleSink, DI, EventAggregator, IContainer, IEventAggregator, ILogger, IServiceLocator, InstanceProvider, LogLevel, LoggerConfiguration, Registration, all, bound, camelCase, emptyArray, emptyObject, inject, isArrayIndex, kebabCase, lazy, noop, optional, pascalCase, singleton, toArray, transient } from "../kernel/dist/native-modules/index.mjs";

import { Aurelia as r, CustomElement as o, IPlatform as a, StandardConfiguration as i } from "../runtime-html/dist/native-modules/index.mjs";

export { AppTask, AuSlotsInfo, Bindable, BindingBehavior, BindingMode, Controller, CustomAttribute, CustomElement, FlushQueue, IAppRoot, IAttrMapper, IAttributePattern, IAuSlotsInfo, IAurelia, IEventTarget, IFlushQueue, ILifecycleHooks, INode, IPlatform, IRenderLocation, ITemplateCompiler, ITemplateCompilerHooks, LifecycleFlags, LifecycleHooks, NodeObserverLocator, ShortHandBindingSyntax, StyleConfiguration, TemplateCompilerHooks, ValueConverter, ViewFactory, alias, attributePattern, bindable, bindingBehavior, bindingCommand, capture, children, coercer, containerless, cssModules, customAttribute, customElement, lifecycleHooks, registerAliases, renderer, shadowCSS, strict, templateCompilerHooks, templateController, useShadowDOM, valueConverter } from "../runtime-html/dist/native-modules/index.mjs";

import { BrowserPlatform as n } from "../platform-browser/dist/native-modules/index.mjs";

export { HttpClient, HttpClientConfiguration, IHttpClient, json } from "../fetch-client/dist/native-modules/index.mjs";

export { Metadata } from "../metadata/dist/native-modules/index.mjs";

export { Platform, Task, TaskAbortError, TaskQueue, TaskQueuePriority, TaskStatus } from "../platform/dist/native-modules/index.mjs";

export { IRouteContext, IRouter, IRouterEvents, Route, RouteConfig, RouteNode, Router, RouterConfiguration, RouterOptions, RouterRegistration, route } from "../router-lite/dist/native-modules/index.mjs";

export { CollectionKind, ComputedObserver, IObserverLocator, ISignaler, batch, observable, subscriberCollection } from "../runtime/dist/native-modules/index.mjs";

const l = n.getOrCreate(globalThis);

function u() {
    return e.createContainer().register(t.instance(a, l), i);
}

class Aurelia extends r {
    constructor(e = u()) {
        super(e);
    }
    static start(e) {
        return (new Aurelia).start(e);
    }
    static app(e) {
        return (new Aurelia).app(e);
    }
    static enhance(e, t) {
        return (new Aurelia).enhance(e, t);
    }
    static register(...e) {
        return (new Aurelia).register(...e);
    }
    app(e) {
        if (o.isType(e)) {
            const t = o.getDefinition(e);
            let r = document.querySelector(t.name);
            if (null === r) r = document.body;
            return super.app({
                host: r,
                component: e
            });
        }
        return super.app(e);
    }
}

export { Aurelia, l as PLATFORM, Aurelia as default };

