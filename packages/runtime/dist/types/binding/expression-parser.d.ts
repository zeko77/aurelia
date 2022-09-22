import { ForOfStatement, Interpolation, AnyBindingExpression, IsBindingBehavior } from './ast';
export interface IExpressionParser extends ExpressionParser {
}
export declare const IExpressionParser: import("@aurelia/kernel").InterfaceSymbol<IExpressionParser>;
export declare class ExpressionParser {
    parse(expression: string, expressionType: ExpressionType.IsIterator): ForOfStatement;
    parse(expression: string, expressionType: ExpressionType.Interpolation): Interpolation;
    parse(expression: string, expressionType: Exclude<ExpressionType, ExpressionType.IsIterator | ExpressionType.Interpolation>): IsBindingBehavior;
    parse(expression: string, expressionType: ExpressionType): AnyBindingExpression;
}
export declare const enum Precedence {
    Variadic = 61,
    Assign = 62,
    Conditional = 63,
    NullishCoalescing = 128,
    LogicalOR = 192,
    LogicalAND = 256,
    Equality = 320,
    Relational = 384,
    Additive = 448,
    Multiplicative = 512,
    Binary = 513,
    LeftHandSide = 514,
    Primary = 515,
    Unary = 516
}
export declare const enum ExpressionType {
    None = 0,
    Interpolation = 1,
    IsIterator = 2,
    IsFunction = 4,
    IsProperty = 8,
    IsCustom = 16
}
export declare function parseExpression(input: string, expressionType?: ExpressionType): AnyBindingExpression;
export declare function parse(minPrecedence: Precedence, expressionType: ExpressionType): AnyBindingExpression;
//# sourceMappingURL=expression-parser.d.ts.map