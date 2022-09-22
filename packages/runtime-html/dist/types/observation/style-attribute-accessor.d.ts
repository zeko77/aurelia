import { AccessorType } from '@aurelia/runtime';
import type { IAccessor } from '@aurelia/runtime';
export declare class StyleAttributeAccessor implements IAccessor {
    readonly obj: HTMLElement;
    type: AccessorType;
    value: unknown;
    styles: Record<string, number>;
    version: number;
    constructor(obj: HTMLElement);
    getValue(): string;
    setValue(newValue: unknown): void;
    setProperty(style: string, value: string): void;
    bind(): void;
}
//# sourceMappingURL=style-attribute-accessor.d.ts.map