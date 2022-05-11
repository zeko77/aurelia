import { IContainer } from '@aurelia/kernel';
import { type IReducerAction } from './reducer';
export declare type INamedReducerActionRegistration<T> = {
    target: string;
    action: IReducerAction<T>;
};
export declare const StandardStateConfiguration: {
    register: (c: IContainer) => IContainer;
    init: <T1 extends object>(state: T1, ...reducers: INamedReducerActionRegistration<T1>[]) => {
        register: (c: IContainer) => IContainer;
        init: <T1_1 extends object>(state: T1_1, ...reducers: INamedReducerActionRegistration<T1_1>[]) => {
            register: (c: IContainer) => IContainer;
            init: <T1_2 extends object>(state: T1_2, ...reducers: INamedReducerActionRegistration<T1_2>[]) => {
                register: (c: IContainer) => IContainer;
                init: <T1_3 extends object>(state: T1_3, ...reducers: INamedReducerActionRegistration<T1_3>[]) => {
                    register: (c: IContainer) => IContainer;
                    init: <T1_4 extends object>(state: T1_4, ...reducers: INamedReducerActionRegistration<T1_4>[]) => {
                        register: (c: IContainer) => IContainer;
                        init: <T1_5 extends object>(state: T1_5, ...reducers: INamedReducerActionRegistration<T1_5>[]) => {
                            register: (c: IContainer) => IContainer;
                            init: <T1_6 extends object>(state: T1_6, ...reducers: INamedReducerActionRegistration<T1_6>[]) => {
                                register: (c: IContainer) => IContainer;
                                init: <T1_7 extends object>(state: T1_7, ...reducers: INamedReducerActionRegistration<T1_7>[]) => {
                                    register: (c: IContainer) => IContainer;
                                    init: <T1_8 extends object>(state: T1_8, ...reducers: INamedReducerActionRegistration<T1_8>[]) => {
                                        register: (c: IContainer) => IContainer;
                                        init: <T1_9 extends object>(state: T1_9, ...reducers: INamedReducerActionRegistration<T1_9>[]) => {
                                            register: (c: IContainer) => IContainer;
                                            init: <T1_10 extends object>(state: T1_10, ...reducers: INamedReducerActionRegistration<T1_10>[]) => any;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=configuration.d.ts.map