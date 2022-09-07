import { ForOfStatement, Interpolation, AnyBindingExpression, IsBindingBehavior } from './ast';
export interface IExpressionParser extends ExpressionParser {
}
export declare const IExpressionParser: import("@aurelia/kernel").InterfaceSymbol<IExpressionParser>;
export declare class ExpressionParser {
    parse(expression: string, expressionType: ExpressionType.IsIterator): ForOfStatement;
    parse(expression: string, expressionType: ExpressionType.Interpolation): Interpolation;
    parse(expression: string, expressionType: Exclude<ExpressionType, ExpressionType.IsIterator | ExpressionType.Interpolation>): IsBindingBehavior;
    parse(expression: string, expressionType: ExpressionType): AnyBindingExpression;
    private $parse;
}
export declare const enum Char {
    Null = 0,
    Backspace = 8,
    Tab = 9,
    LineFeed = 10,
    VerticalTab = 11,
    FormFeed = 12,
    CarriageReturn = 13,
    Space = 32,
    Exclamation = 33,
    DoubleQuote = 34,
    Dollar = 36,
    Percent = 37,
    Ampersand = 38,
    SingleQuote = 39,
    OpenParen = 40,
    CloseParen = 41,
    Asterisk = 42,
    Plus = 43,
    Comma = 44,
    Minus = 45,
    Dot = 46,
    Slash = 47,
    Semicolon = 59,
    Backtick = 96,
    OpenBracket = 91,
    Backslash = 92,
    CloseBracket = 93,
    Caret = 94,
    Underscore = 95,
    OpenBrace = 123,
    Bar = 124,
    CloseBrace = 125,
    Colon = 58,
    LessThan = 60,
    Equals = 61,
    GreaterThan = 62,
    Question = 63,
    Zero = 48,
    One = 49,
    Two = 50,
    Three = 51,
    Four = 52,
    Five = 53,
    Six = 54,
    Seven = 55,
    Eight = 56,
    Nine = 57,
    UpperA = 65,
    UpperB = 66,
    UpperC = 67,
    UpperD = 68,
    UpperE = 69,
    UpperF = 70,
    UpperG = 71,
    UpperH = 72,
    UpperI = 73,
    UpperJ = 74,
    UpperK = 75,
    UpperL = 76,
    UpperM = 77,
    UpperN = 78,
    UpperO = 79,
    UpperP = 80,
    UpperQ = 81,
    UpperR = 82,
    UpperS = 83,
    UpperT = 84,
    UpperU = 85,
    UpperV = 86,
    UpperW = 87,
    UpperX = 88,
    UpperY = 89,
    UpperZ = 90,
    LowerA = 97,
    LowerB = 98,
    LowerC = 99,
    LowerD = 100,
    LowerE = 101,
    LowerF = 102,
    LowerG = 103,
    LowerH = 104,
    LowerI = 105,
    LowerJ = 106,
    LowerK = 107,
    LowerL = 108,
    LowerM = 109,
    LowerN = 110,
    LowerO = 111,
    LowerP = 112,
    LowerQ = 113,
    LowerR = 114,
    LowerS = 115,
    LowerT = 116,
    LowerU = 117,
    LowerV = 118,
    LowerW = 119,
    LowerX = 120,
    LowerY = 121,
    LowerZ = 122
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