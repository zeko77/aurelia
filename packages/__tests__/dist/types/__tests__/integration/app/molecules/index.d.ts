import { IContainer } from '@aurelia/kernel';
export interface MolecularConfiguration {
    useCSSModule: boolean;
}
declare type MolecularConfigCustomizer = (config: MolecularConfiguration) => void;
export declare const molecules: {
    customizeConfiguration: MolecularConfigCustomizer;
    register(container: IContainer): IContainer;
    customize(cb?: MolecularConfigCustomizer): any;
};
export {};
//# sourceMappingURL=index.d.ts.map