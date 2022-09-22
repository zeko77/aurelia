import { InstanceProvider } from '@aurelia/kernel';
import type { IContainer, IDisposable } from '@aurelia/kernel';
import type { ICustomElementController } from './templating/controller';
import type { IPlatform } from './platform';
export interface ISinglePageApp {
    host: HTMLElement;
    component: unknown;
}
export interface IAppRoot extends AppRoot {
}
export declare const IAppRoot: import("@aurelia/kernel").InterfaceSymbol<IAppRoot>;
export declare class AppRoot implements IDisposable {
    readonly config: ISinglePageApp;
    readonly platform: IPlatform;
    readonly container: IContainer;
    readonly host: HTMLElement;
    controller: ICustomElementController;
    constructor(config: ISinglePageApp, platform: IPlatform, container: IContainer, rootProvider: InstanceProvider<IAppRoot>);
    activate(): void | Promise<void>;
    deactivate(): void | Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=app-root.d.ts.map