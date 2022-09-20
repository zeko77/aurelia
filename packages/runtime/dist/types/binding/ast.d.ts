import { type IBinding } from '../observation';
import { Scope } from '../observation/binding-context';
import { type IConnectableBinding } from './connectable';
import type { IServiceLocator } from '@aurelia/kernel';
import type { IBindingContext, IOverrideContext, IConnectable } from '../observation';
export declare const enum ExpressionKind {
    AccessThis = 0,
    AccessScope = 1,
    ArrayLiteral = 2,
    ObjectLiteral = 3,
    PrimitiveLiteral = 4,
    Template = 5,
    Unary = 6,
    CallScope = 7,
    CallMember = 8,
    CallFunction = 9,
    AccessMember = 10,
    AccessKeyed = 11,
    TaggedTemplate = 12,
    Binary = 13,
    Conditional = 14,
    Assign = 15,
    ArrowFunction = 16,
    ValueConverter = 17,
    BindingBehavior = 18,
    ArrayBindingPattern = 19,
    ObjectBindingPattern = 20,
    BindingIdentifier = 21,
    ForOfStatement = 22,
    Interpolation = 23,
    ArrayDestructuring = 24,
    ObjectDestructuring = 25,
    DestructuringAssignmentLeaf = 26
}
export declare type UnaryOperator = 'void' | 'typeof' | '!' | '-' | '+';
export declare type BinaryOperator = '??' | '&&' | '||' | '==' | '===' | '!=' | '!==' | 'instanceof' | 'in' | '+' | '-' | '*' | '/' | '%' | '<' | '>' | '<=' | '>=';
export declare type IsPrimary = AccessThisExpression | AccessScopeExpression | ArrayLiteralExpression | ObjectLiteralExpression | PrimitiveLiteralExpression | TemplateExpression;
export declare type IsLiteral = ArrayLiteralExpression | ObjectLiteralExpression | PrimitiveLiteralExpression | TemplateExpression;
export declare type IsLeftHandSide = IsPrimary | CallFunctionExpression | CallMemberExpression | CallScopeExpression | AccessMemberExpression | AccessKeyedExpression | TaggedTemplateExpression;
export declare type IsUnary = IsLeftHandSide | UnaryExpression;
export declare type IsBinary = IsUnary | BinaryExpression;
export declare type IsConditional = IsBinary | ConditionalExpression;
export declare type IsAssign = IsConditional | AssignExpression | ArrowFunction;
export declare type IsValueConverter = IsAssign | ValueConverterExpression;
export declare type IsBindingBehavior = IsValueConverter | BindingBehaviorExpression;
export declare type IsAssignable = AccessScopeExpression | AccessKeyedExpression | AccessMemberExpression | AssignExpression;
export declare type IsExpression = IsBindingBehavior | Interpolation;
export declare type BindingIdentifierOrPattern = BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern;
export declare type IsExpressionOrStatement = IsExpression | ForOfStatement | BindingIdentifierOrPattern | DestructuringAssignmentExpression | DestructuringAssignmentSingleExpression | DestructuringAssignmentRestExpression;
export declare type AnyBindingExpression = Interpolation | ForOfStatement | IsBindingBehavior;
export interface IExpressionHydrator {
    hydrate(jsonExpr: any): any;
}
export interface IVisitor<T = unknown> {
    visitAccessKeyed(expr: AccessKeyedExpression): T;
    visitAccessMember(expr: AccessMemberExpression): T;
    visitAccessScope(expr: AccessScopeExpression): T;
    visitAccessThis(expr: AccessThisExpression): T;
    visitArrayBindingPattern(expr: ArrayBindingPattern): T;
    visitArrayLiteral(expr: ArrayLiteralExpression): T;
    visitArrowFunction(expr: ArrowFunction): T;
    visitAssign(expr: AssignExpression): T;
    visitBinary(expr: BinaryExpression): T;
    visitBindingBehavior(expr: BindingBehaviorExpression): T;
    visitBindingIdentifier(expr: BindingIdentifier): T;
    visitCallFunction(expr: CallFunctionExpression): T;
    visitCallMember(expr: CallMemberExpression): T;
    visitCallScope(expr: CallScopeExpression): T;
    visitConditional(expr: ConditionalExpression): T;
    visitForOfStatement(expr: ForOfStatement): T;
    visitInterpolation(expr: Interpolation): T;
    visitObjectBindingPattern(expr: ObjectBindingPattern): T;
    visitObjectLiteral(expr: ObjectLiteralExpression): T;
    visitPrimitiveLiteral(expr: PrimitiveLiteralExpression): T;
    visitTaggedTemplate(expr: TaggedTemplateExpression): T;
    visitTemplate(expr: TemplateExpression): T;
    visitUnary(expr: UnaryExpression): T;
    visitValueConverter(expr: ValueConverterExpression): T;
    visitDestructuringAssignmentExpression(expr: DestructuringAssignmentExpression): T;
    visitDestructuringAssignmentSingleExpression(expr: DestructuringAssignmentSingleExpression): T;
    visitDestructuringAssignmentRestExpression(expr: DestructuringAssignmentRestExpression): T;
}
export declare class Unparser implements IVisitor<void> {
    text: string;
    static unparse(expr: IsExpressionOrStatement): string;
    visitAccessMember(expr: AccessMemberExpression): void;
    visitAccessKeyed(expr: AccessKeyedExpression): void;
    visitAccessThis(expr: AccessThisExpression): void;
    visitAccessScope(expr: AccessScopeExpression): void;
    visitArrayLiteral(expr: ArrayLiteralExpression): void;
    visitArrowFunction(expr: ArrowFunction): void;
    visitObjectLiteral(expr: ObjectLiteralExpression): void;
    visitPrimitiveLiteral(expr: PrimitiveLiteralExpression): void;
    visitCallFunction(expr: CallFunctionExpression): void;
    visitCallMember(expr: CallMemberExpression): void;
    visitCallScope(expr: CallScopeExpression): void;
    visitTemplate(expr: TemplateExpression): void;
    visitTaggedTemplate(expr: TaggedTemplateExpression): void;
    visitUnary(expr: UnaryExpression): void;
    visitBinary(expr: BinaryExpression): void;
    visitConditional(expr: ConditionalExpression): void;
    visitAssign(expr: AssignExpression): void;
    visitValueConverter(expr: ValueConverterExpression): void;
    visitBindingBehavior(expr: BindingBehaviorExpression): void;
    visitArrayBindingPattern(expr: ArrayBindingPattern): void;
    visitObjectBindingPattern(expr: ObjectBindingPattern): void;
    visitBindingIdentifier(expr: BindingIdentifier): void;
    visitForOfStatement(expr: ForOfStatement): void;
    visitInterpolation(expr: Interpolation): void;
    visitDestructuringAssignmentExpression(expr: DestructuringAssignmentExpression): void;
    visitDestructuringAssignmentSingleExpression(expr: DestructuringAssignmentSingleExpression): void;
    visitDestructuringAssignmentRestExpression(expr: DestructuringAssignmentRestExpression): void;
    private writeArgs;
}
/**
 * An interface describing the object that can evaluate Aurelia AST
 */
export interface IAstEvaluator {
    /** describe whether the evaluator wants to evaluate in strict mode */
    strict?: boolean;
    /** describe whether the evaluator wants to evaluate the function call in strict mode */
    strictFnCall?: boolean;
    /** Allow an AST to retrieve a service that it needs */
    get?: IServiceLocator['get'];
    /** Allow an AST to retrieve a value converter that it needs */
    getConverter?<T>(name: string): ValueConverterInstance<T> | undefined;
    /** Allow an AST to retrieve a binding behavior that it needs */
    getBehavior?<T>(name: string): BindingBehaviorInstance<T> | undefined;
}
export declare class CustomExpression {
    readonly value: string;
    constructor(value: string);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): string;
}
export declare type BindingBehaviorInstance<T extends {} = {}> = {
    type?: 'instance' | 'factory';
    bind?(scope: Scope, binding: IBinding, ...args: T[]): void;
    unbind?(scope: Scope, binding: IBinding, ...args: T[]): void;
} & T;
export declare class BindingBehaviorExpression {
    readonly expression: IsBindingBehavior;
    readonly name: string;
    readonly args: readonly IsAssign[];
    get $kind(): ExpressionKind.BindingBehavior;
    get hasBind(): true;
    get hasUnbind(): true;
    constructor(expression: IsBindingBehavior, name: string, args: readonly IsAssign[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(s: Scope, e: IAstEvaluator | null, val: unknown): unknown;
    bind(s: Scope, b: IAstEvaluator & IConnectableBinding): void;
    unbind(s: Scope, b: IAstEvaluator & IConnectableBinding): void;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare type ValueConverterInstance<T extends {} = {}> = {
    signals?: string[];
    toView(input: unknown, ...args: unknown[]): unknown;
    fromView?(input: unknown, ...args: unknown[]): unknown;
} & T;
export declare class ValueConverterExpression {
    readonly expression: IsValueConverter;
    readonly name: string;
    readonly args: readonly IsAssign[];
    get $kind(): ExpressionKind.ValueConverter;
    get hasBind(): true;
    get hasUnbind(): true;
    constructor(expression: IsValueConverter, name: string, args: readonly IsAssign[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(s: Scope, e: IAstEvaluator | null, val: unknown): unknown;
    bind(s: Scope, b: IAstEvaluator & IConnectableBinding): void;
    unbind(_s: Scope, b: IAstEvaluator & IConnectableBinding): void;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class AssignExpression {
    readonly target: IsAssignable;
    readonly value: IsAssign;
    get $kind(): ExpressionKind.Assign;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(target: IsAssignable, value: IsAssign);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(s: Scope, e: IAstEvaluator | null, val: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ConditionalExpression {
    readonly condition: IsBinary;
    readonly yes: IsAssign;
    readonly no: IsAssign;
    get $kind(): ExpressionKind.Conditional;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(condition: IsBinary, yes: IsAssign, no: IsAssign);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class AccessThisExpression {
    readonly ancestor: number;
    static readonly $this: AccessThisExpression;
    static readonly $parent: AccessThisExpression;
    get $kind(): ExpressionKind.AccessThis;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(ancestor?: number);
    evaluate(s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): IBindingContext | undefined;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class AccessScopeExpression {
    readonly name: string;
    readonly ancestor: number;
    get $kind(): ExpressionKind.AccessScope;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(name: string, ancestor?: number);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): IBindingContext | IOverrideContext;
    assign(s: Scope, _e: IAstEvaluator | null, val: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class AccessMemberExpression {
    readonly object: IsLeftHandSide;
    readonly name: string;
    readonly optional: boolean;
    get $kind(): ExpressionKind.AccessMember;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(object: IsLeftHandSide, name: string, optional?: boolean);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(s: Scope, e: IAstEvaluator | null, val: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class AccessKeyedExpression {
    readonly object: IsLeftHandSide;
    readonly key: IsAssign;
    readonly optional: boolean;
    get $kind(): ExpressionKind.AccessKeyed;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(object: IsLeftHandSide, key: IsAssign, optional?: boolean);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(s: Scope, e: IAstEvaluator | null, val: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class CallScopeExpression {
    readonly name: string;
    readonly args: readonly IsAssign[];
    readonly ancestor: number;
    readonly optional: boolean;
    get $kind(): ExpressionKind.CallScope;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(name: string, args: readonly IsAssign[], ancestor?: number, optional?: boolean);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class CallMemberExpression {
    readonly object: IsLeftHandSide;
    readonly name: string;
    readonly args: readonly IsAssign[];
    readonly optionalMember: boolean;
    readonly optionalCall: boolean;
    get $kind(): ExpressionKind.CallMember;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(object: IsLeftHandSide, name: string, args: readonly IsAssign[], optionalMember?: boolean, optionalCall?: boolean);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class CallFunctionExpression {
    readonly func: IsLeftHandSide;
    readonly args: readonly IsAssign[];
    readonly optional: boolean;
    get $kind(): ExpressionKind.CallFunction;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(func: IsLeftHandSide, args: readonly IsAssign[], optional?: boolean);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class BinaryExpression {
    readonly operation: BinaryOperator;
    readonly left: IsBinary;
    readonly right: IsBinary;
    get $kind(): ExpressionKind.Binary;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(operation: BinaryOperator, left: IsBinary, right: IsBinary);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class UnaryExpression {
    readonly operation: UnaryOperator;
    readonly expression: IsLeftHandSide;
    get $kind(): ExpressionKind.Unary;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(operation: UnaryOperator, expression: IsLeftHandSide);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class PrimitiveLiteralExpression<TValue extends null | undefined | number | boolean | string = null | undefined | number | boolean | string> {
    readonly value: TValue;
    static readonly $undefined: PrimitiveLiteralExpression<undefined>;
    static readonly $null: PrimitiveLiteralExpression<null>;
    static readonly $true: PrimitiveLiteralExpression<true>;
    static readonly $false: PrimitiveLiteralExpression<false>;
    static readonly $empty: PrimitiveLiteralExpression<string>;
    get $kind(): ExpressionKind.PrimitiveLiteral;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(value: TValue);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): TValue;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ArrayLiteralExpression {
    readonly elements: readonly IsAssign[];
    static readonly $empty: ArrayLiteralExpression;
    get $kind(): ExpressionKind.ArrayLiteral;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(elements: readonly IsAssign[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): readonly unknown[];
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ObjectLiteralExpression {
    readonly keys: readonly (number | string)[];
    readonly values: readonly IsAssign[];
    static readonly $empty: ObjectLiteralExpression;
    get $kind(): ExpressionKind.ObjectLiteral;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(keys: readonly (number | string)[], values: readonly IsAssign[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): Record<string, unknown>;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class TemplateExpression {
    readonly cooked: readonly string[];
    readonly expressions: readonly IsAssign[];
    static readonly $empty: TemplateExpression;
    get $kind(): ExpressionKind.Template;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(cooked: readonly string[], expressions?: readonly IsAssign[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): string;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class TaggedTemplateExpression {
    readonly cooked: readonly string[] & {
        raw?: readonly string[];
    };
    readonly func: IsLeftHandSide;
    readonly expressions: readonly IsAssign[];
    get $kind(): ExpressionKind.TaggedTemplate;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(cooked: readonly string[] & {
        raw?: readonly string[];
    }, raw: readonly string[], func: IsLeftHandSide, expressions?: readonly IsAssign[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): string;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ArrayBindingPattern {
    readonly elements: readonly IsAssign[];
    get $kind(): ExpressionKind.ArrayBindingPattern;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(elements: readonly IsAssign[]);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ObjectBindingPattern {
    readonly keys: readonly (string | number)[];
    readonly values: readonly IsAssign[];
    get $kind(): ExpressionKind.ObjectBindingPattern;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(keys: readonly (string | number)[], values: readonly IsAssign[]);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class BindingIdentifier {
    readonly name: string;
    get $kind(): ExpressionKind.BindingIdentifier;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(name: string);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): string;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ForOfStatement {
    readonly declaration: BindingIdentifierOrPattern | DestructuringAssignmentExpression;
    readonly iterable: IsBindingBehavior;
    get $kind(): ExpressionKind.ForOfStatement;
    get hasBind(): true;
    get hasUnbind(): true;
    constructor(declaration: BindingIdentifierOrPattern | DestructuringAssignmentExpression, iterable: IsBindingBehavior);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    bind(s: Scope, b: IConnectableBinding): void;
    unbind(s: Scope, b: IConnectableBinding): void;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class Interpolation {
    readonly parts: readonly string[];
    readonly expressions: readonly IsBindingBehavior[];
    get $kind(): ExpressionKind.Interpolation;
    readonly isMulti: boolean;
    readonly firstExpression: IsBindingBehavior;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(parts: readonly string[], expressions?: readonly IsBindingBehavior[]);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): string;
    assign(_s: Scope, _e: IAstEvaluator | null, _obj: unknown): unknown;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
/** This is an internal API */
export declare class DestructuringAssignmentExpression {
    readonly $kind: ExpressionKind.ArrayDestructuring | ExpressionKind.ObjectDestructuring;
    readonly list: readonly (DestructuringAssignmentExpression | DestructuringAssignmentSingleExpression | DestructuringAssignmentRestExpression)[];
    readonly source: AccessMemberExpression | AccessKeyedExpression | undefined;
    readonly initializer: IsBindingBehavior | undefined;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor($kind: ExpressionKind.ArrayDestructuring | ExpressionKind.ObjectDestructuring, list: readonly (DestructuringAssignmentExpression | DestructuringAssignmentSingleExpression | DestructuringAssignmentRestExpression)[], source: AccessMemberExpression | AccessKeyedExpression | undefined, initializer: IsBindingBehavior | undefined);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): undefined;
    assign(s: Scope, l: IAstEvaluator, value: unknown): void;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
/** This is an internal API */
export declare class DestructuringAssignmentSingleExpression {
    readonly target: AccessMemberExpression;
    readonly source: AccessMemberExpression | AccessKeyedExpression;
    readonly initializer: IsBindingBehavior | undefined;
    get $kind(): ExpressionKind.DestructuringAssignmentLeaf;
    constructor(target: AccessMemberExpression, source: AccessMemberExpression | AccessKeyedExpression, initializer: IsBindingBehavior | undefined);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): undefined;
    assign(s: Scope, l: IAstEvaluator, value: unknown): void;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
/** This is an internal API */
export declare class DestructuringAssignmentRestExpression {
    readonly target: AccessMemberExpression;
    readonly indexOrProperties: string[] | number;
    get $kind(): ExpressionKind.DestructuringAssignmentLeaf;
    constructor(target: AccessMemberExpression, indexOrProperties: string[] | number);
    evaluate(_s: Scope, _e: IAstEvaluator | null, _c: IConnectable | null): undefined;
    assign(s: Scope, l: IAstEvaluator, value: unknown): void;
    accept<T>(_visitor: IVisitor<T>): T;
    toString(): string;
}
export declare class ArrowFunction {
    args: BindingIdentifier[];
    body: IsAssign;
    rest: boolean;
    get $kind(): ExpressionKind.ArrowFunction;
    get hasBind(): false;
    get hasUnbind(): false;
    constructor(args: BindingIdentifier[], body: IsAssign, rest?: boolean);
    evaluate(s: Scope, e: IAstEvaluator | null, c: IConnectable | null): unknown;
    assign(_s: Scope, _e: IAstEvaluator | null, _value: unknown): void;
    accept<T>(visitor: IVisitor<T>): T;
    toString(): string;
}
//# sourceMappingURL=ast.d.ts.map