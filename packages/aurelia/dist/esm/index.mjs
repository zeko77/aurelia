import { DI as e, Registration as t } from "@aurelia/kernel";

export { ColorOptions, ConsoleSink, DI, EventAggregator, IContainer, IEventAggregator, ILogger, IServiceLocator, InstanceProvider, LogLevel, LoggerConfiguration, Registration, all, bound, camelCase, emptyArray, emptyObject, inject, isArrayIndex, kebabCase, lazy, noop, optional, pascalCase, singleton, toArray, transient } from "@aurelia/kernel";

import { Aurelia as o, IPlatform as r, StandardConfiguration as a, CustomElement as i } from "@aurelia/runtime-html";

export { AppTask, AuSlotsInfo, Bindable, Controller, CustomAttribute, CustomElement, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, DialogCloseResult, DialogConfiguration, DialogController, DialogDeactivationStatuses, DialogDefaultConfiguration, DialogOpenResult, DialogService, IAppRoot, IAttrMapper, IAttributePattern, IAuSlotsInfo, IAurelia, IDialogController, IDialogDom, IDialogDomRenderer, IDialogGlobalSettings, IDialogService, IEventTarget, ILifecycleHooks, INode, IPlatform, IRenderLocation, ITemplateCompiler, ITemplateCompilerHooks, IWcElementRegistry, IWorkTracker, LifecycleHooks, NodeObserverLocator, ShortHandBindingSyntax, StyleConfiguration, TemplateCompilerHooks, ViewFactory, WcCustomElementRegistry, attributePattern, bindable, bindingCommand, children, coercer, containerless, createElement, cssModules, customAttribute, customElement, lifecycleHooks, renderer, shadowCSS, templateCompilerHooks, templateController, useShadowDOM } from "@aurelia/runtime-html";

import { BrowserPlatform as l } from "@aurelia/platform-browser";

export { HttpClient, HttpClientConfiguration, IHttpClient, json } from "@aurelia/fetch-client";

export { Metadata } from "@aurelia/metadata";

export { Platform, Task, TaskAbortError, TaskQueue, TaskQueuePriority, TaskStatus } from "@aurelia/platform";

export { IRouteContext, IRouter, IRouterEvents, Route, RouteConfig, RouteNode, Router, RouterConfiguration, RouterOptions, RouterRegistration, route } from "@aurelia/router-lite";

export { BindingBehavior, BindingMode, CollectionKind, ComputedObserver, IObserverLocator, ISignaler, LifecycleFlags, ValueConverter, alias, bindingBehavior, observable, registerAliases, subscriberCollection, valueConverter } from "@aurelia/runtime";

const n = l.getOrCreate(globalThis);

function u() {
    return e.createContainer().register(t.instance(r, n), a);
}

class Aurelia extends o {
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
        if (i.isType(e)) {
            const t = i.getDefinition(e);
            let o = document.querySelector(t.name);
            if (null === o) o = document.body;
            return super.app({
                host: o,
                component: e
            });
        }
        return super.app(e);
    }
}

export { Aurelia, n as PLATFORM, Aurelia as default };
//# sourceMappingURL=index.mjs.map
