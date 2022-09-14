import { IEventAggregator } from '@aurelia/kernel';
import { INode, ICustomAttributeViewModel } from '@aurelia/runtime-html';
import { ILinkHandler } from './link-handler';
import { IRouter } from '../router';
import { Parameters } from '../instructions/instruction-parameters';
export declare class LoadCustomAttribute implements ICustomAttributeViewModel {
    private readonly element;
    private readonly router;
    private readonly linkHandler;
    private readonly ea;
    value: unknown;
    component?: string;
    parameters?: Parameters;
    viewport?: string;
    id?: string;
    private separateProperties;
    private hasHref;
    private routerNavigationSubscription;
    private readonly activeClass;
    constructor(element: INode<Element>, router: IRouter, linkHandler: ILinkHandler, ea: IEventAggregator);
    binding(): void;
    unbinding(): void;
    valueChanged(_newValue: unknown): void;
    private updateValue;
    private readonly navigationEndHandler;
    private updateActive;
    private findRoute;
}
//# sourceMappingURL=load.d.ts.map