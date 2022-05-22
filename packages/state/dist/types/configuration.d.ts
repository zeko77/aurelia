import { IContainer } from '@aurelia/kernel';
import { IReducer } from './interfaces';
export declare type INamedReducerActionRegistration<T> = [target: string, action: IReducer<T>];
export declare const StateDefaultConfiguration: {
    register: (c: IContainer) => void;
    init: <T1>(state: T1, ...reducers: IReducer<T1>[]) => {
        register: (c: IContainer) => void;
        init: <T1_1>(state: T1_1, ...reducers: IReducer<T1_1>[]) => {
            register: (c: IContainer) => void;
            init: <T1_2>(state: T1_2, ...reducers: IReducer<T1_2>[]) => {
                register: (c: IContainer) => void;
                init: <T1_3>(state: T1_3, ...reducers: IReducer<T1_3>[]) => {
                    register: (c: IContainer) => void;
                    init: <T1_4>(state: T1_4, ...reducers: IReducer<T1_4>[]) => {
                        register: (c: IContainer) => void;
                        init: <T1_5>(state: T1_5, ...reducers: IReducer<T1_5>[]) => {
                            register: (c: IContainer) => void;
                            init: <T1_6>(state: T1_6, ...reducers: IReducer<T1_6>[]) => {
                                register: (c: IContainer) => void;
                                init: <T1_7>(state: T1_7, ...reducers: IReducer<T1_7>[]) => {
                                    register: (c: IContainer) => void;
                                    init: <T1_8>(state: T1_8, ...reducers: IReducer<T1_8>[]) => {
                                        register: (c: IContainer) => void;
                                        init: <T1_9>(state: T1_9, ...reducers: IReducer<T1_9>[]) => {
                                            register: (c: IContainer) => void;
                                            init: <T1_10>(state: T1_10, ...reducers: IReducer<T1_10>[]) => any;
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