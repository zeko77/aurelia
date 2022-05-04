export declare type AnyFunction = (...args: any) => any;
export declare type FunctionPropNames<T> = {
    [K in keyof T]: K extends 'constructor' ? never : NonNullable<T[K]> extends AnyFunction ? K : never;
}[keyof T];
//# sourceMappingURL=utilities.d.ts.map