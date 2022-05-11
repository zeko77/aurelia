import { IRegistry } from '@aurelia/kernel';
export declare type IReducerAction<T> = (state: T | Promise<T>, ...params: any) => T | Promise<T>;
export declare const IReducerAction: import("@aurelia/kernel").InterfaceSymbol<IReducerAction<object>>;
export declare type IRegistrableReducer = IReducerAction<any> & IRegistry;
export declare const Action: Readonly<{
    define<T extends IReducerAction<object>>(action: T): T & IRegistry;
    define<T_1 extends IReducerAction<object>>(name: string, action: T_1): T_1 & IRegistry;
    isType: <T_2 extends object>(r: unknown) => r is IReducerAction<T_2>;
}>;
//# sourceMappingURL=reducer.d.ts.map