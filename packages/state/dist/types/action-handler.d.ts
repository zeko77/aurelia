import { IActionHandler, IRegistrableReducer } from './interfaces';
export declare const ActionHandler: Readonly<{
    define<T extends IActionHandler<any>>(reducer: T): IRegistrableReducer;
    isType: <T_1>(r: unknown) => r is IActionHandler<T_1>;
}>;
//# sourceMappingURL=action-handler.d.ts.map