import { DI as e, Registration as t } from "../../../@aurelia/kernel/dist/native-modules/index.mjs";

export { ColorOptions, ConsoleSink, DI, EventAggregator, IContainer, IEventAggregator, ILogger, IServiceLocator, InstanceProvider, LogLevel, LoggerConfiguration, Registration, all, bound, camelCase, emptyArray, emptyObject, inject, isArrayIndex, kebabCase, lazy, noop, optional, pascalCase, singleton, toArray, transient } from "../../../@aurelia/kernel/dist/native-modules/index.mjs";

import { Aurelia as o, CustomElement as r, IPlatform as a, StandardConfiguration as i } from "../../../@aurelia/runtime-html/dist/native-modules/index.mjs";

export { AppTask, AuSlotsInfo, Bindable, BindingBehavior, BindingMode, Controller, CustomAttribute, CustomElement, DefaultDialogDom, DefaultDialogDomRenderer, DefaultDialogGlobalSettings, DialogCloseResult, DialogConfiguration, DialogController, DialogDeactivationStatuses, DialogDefaultConfiguration, DialogOpenResult, DialogService, FlushQueue, IAppRoot, IAttrMapper, IAttributePattern, IAuSlotsInfo, IAurelia, IDialogController, IDialogDom, IDialogDomRenderer, IDialogGlobalSettings, IDialogService, IEventTarget, IFlushQueue, ILifecycleHooks, INode, IPlatform, IRenderLocation, ITemplateCompiler, ITemplateCompilerHooks, IWcElementRegistry, LifecycleFlags, LifecycleHooks, NodeObserverLocator, ShortHandBindingSyntax, StyleConfiguration, TemplateCompilerHooks, ValueConverter, ViewFactory, WcCustomElementRegistry, alias, attributePattern, bindable, bindingBehavior, bindingCommand, capture, children, coercer, containerless, createElement, cssModules, customAttribute, customElement, lifecycleHooks, registerAliases, renderer, shadowCSS, strict, templateCompilerHooks, templateController, useShadowDOM, valueConverter } from "../../../@aurelia/runtime-html/dist/native-modules/index.mjs";

import { BrowserPlatform as l } from "../../../@aurelia/platform-browser/dist/native-modules/index.mjs";

export { HttpClient, HttpClientConfiguration, IHttpClient, json } from "../../../@aurelia/fetch-client/dist/native-modules/index.mjs";

export { Metadata } from "../../../@aurelia/metadata/dist/native-modules/index.mjs";

export { Platform, Task, TaskAbortError, TaskQueue, TaskQueuePriority, TaskStatus } from "../../../@aurelia/platform/dist/native-modules/index.mjs";

export { IRouteContext, IRouter, IRouterEvents, Route, RouteConfig, RouteNode, Router, RouterConfiguration, RouterOptions, RouterRegistration, route } from "../../../@aurelia/router-lite/dist/native-modules/index.mjs";

export { CollectionKind, ComputedObserver, IObserverLocator, ISignaler, batch, observable, subscriberCollection } from "../../../@aurelia/runtime/dist/native-modules/index.mjs";

const n = l.getOrCreate(globalThis);

function u() {
    return e.createContainer().register(t.instance(a, n), i);
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
        if (r.isType(e)) {
            const t = r.getDefinition(e);
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

