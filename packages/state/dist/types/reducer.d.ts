import { IReducer, IRegistrableReducer } from './interfaces';
export declare const Reducer: Readonly<{
    define<T extends IReducer<any>>(reducer: T): IRegistrableReducer;
    isType: <T_1>(r: unknown) => r is IReducer<T_1>;
}>;
//# sourceMappingURL=reducer.d.ts.map