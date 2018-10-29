import { writeFileSync } from 'fs';
import {
  createCall,
  createIdentifier,
  createLiteral,
  Node,
  SourceFile,
  Printer,
  createSourceFile,
  createPrinter,
  EmitHint,
  ScriptTarget,
  createArrowFunction,
  createToken,
  SyntaxKind,
  createBlock,
  createFunctionExpression,
  StringLiteral,
  Block,
  createNew,
  createExpressionStatement,
  Statement,
  createVariableDeclaration,
  createVariableStatement,
  ModifierFlags,
  createModifier,
  createKeywordTypeNode,
  createVariableDeclarationList,
  NodeFlags,
  createPropertyAccess,
  Expression,
  createImportDeclaration,
  createImportClause,
  createNamedImports,
  createImportSpecifier,
  createClassDeclaration,
  createDecorator,
  createObjectLiteral,
  createPropertyAssignment,
  ClassElement,
  createPropertySignature,
  createLiteralTypeNode,
  createProperty,
  createAssignment,
  createShorthandPropertyAssignment,
  createFunctionDeclaration,
  createObjectBindingPattern,
  createBindingElement,
  createReturn,
  createClassExpression,
  createBinary,
  Decorator,
  Identifier,
  ParameterDeclaration,
  createParameter,
  ObjectLiteralExpression,
  PropertyAssignment,
  ArrayLiteralExpression,
  createArrayLiteral,
  createNoSubstitutionTemplateLiteral,
  VariableStatement,
  VariableDeclaration,
  ObjectLiteralElementLike,
  PropertyAccessExpression,
  ReturnStatement
} from 'typescript';

export function emit(path: string, ...nodes: Node[]): void {
  const emptyFile: SourceFile = createSourceFile('', '', ScriptTarget.Latest);
  const printer: Printer = createPrinter({ removeComments: false });
  let content = '';
  for (const node of nodes) {
    if (node === null) {
      content += '\n';
    } else {
      content += printer.printNode(EmitHint.Unspecified, node, emptyFile) + '\n';
    }
  }
  writeFileSync(path, content.slice(0, -1), { encoding: 'utf8' });
}

export function addRange(start: number, end: number, ...records: Record<string, boolean>[]) {
  for (let i = start; i <= end; ++i) {
    records.forEach(r => r[String.fromCharCode(i)] = true);
  }
}
let identPart = {};
let identStart = {};
addRange('a'.charCodeAt(0), 'z'.charCodeAt(0), identPart, identStart);
addRange('A'.charCodeAt(0), 'Z'.charCodeAt(0), identPart, identStart);
addRange('$'.charCodeAt(0), '$'.charCodeAt(0), identPart, identStart);
addRange('_'.charCodeAt(0), '_'.charCodeAt(0), identPart, identStart);
addRange('0'.charCodeAt(0), '9'.charCodeAt(0), identPart);

export function $name(input: string) {
  let value = '';
  let first = true;
  let char: string;
  for (let i = 0, ii = input.length; i < ii; ++i) {
    char = input.charAt(i);
    if (first) {
      value = value + (identStart[char] ? char : '_');
    } else {
      value = value + (identPart[char] ? char : '_');
    }
    first = false;
  }
  return value;
}

export function $id(name: string): Identifier;
export function $id(id: Identifier): Identifier;
export function $id(nameOrId: string | Identifier): Identifier;
export function $id(expr: Expression): Expression;
export function $id(nameOrExpr: string | Expression): Identifier | Expression;
export function $id(idOrExpr: Identifier | Expression): Identifier | Expression;
export function $id(nameOrExprOrId: string | Expression | Identifier): Expression | Identifier;
export function $id(nameOrExprOrId: string | Expression | Identifier): Expression | Identifier {
  return typeof nameOrExprOrId === 'string' ? createIdentifier(nameOrExprOrId) : nameOrExprOrId;
}

export function $access(name: string): Identifier;
export function $access(path: [string | Expression | Identifier, ...(string | Identifier)[]]): PropertyAccessExpression;
export function $access(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]]): PropertyAccessExpression | Identifier;
export function $access(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]]): PropertyAccessExpression | Identifier {
  if (Array.isArray(nameOrPath)) {
    let left = $id(nameOrPath[0]);
    const rest = <(string | Identifier)[]>nameOrPath.slice(1);
    rest.forEach(name => {
      left = createPropertyAccess(left, $id(name));
    });
    return left as PropertyAccessExpression;
  } else {
    return createIdentifier(nameOrPath);
  }
}

export function $call(name: string, variablesOrExpressions?: (string | Expression | Identifier)[]): Expression;
export function $call(path: [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Expression;
export function $call(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Expression;
export function $call(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions: (string | Expression | Identifier)[] = []): Expression {
  const left = $access(nameOrPath);
  const args: Expression[] = [];

  variablesOrExpressions.forEach(varOrExpr => {
    if (typeof varOrExpr === 'string') {
      args.push(createIdentifier(varOrExpr));
    } else {
      args.push(varOrExpr);
    }
  });
  return createCall(left, [], args);
}

export function $$call(name: string, variablesOrExpressions?: (string | Expression | Identifier)[]): Statement;
export function $$call(path: [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Statement;
export function $$call(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Statement;
export function $$call(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions: (string | Expression | Identifier)[] = []): Statement {
  return createExpressionStatement($call(nameOrPath, variablesOrExpressions));
}

export function $new(name: string, variablesOrExpressions?: (string | Expression | Identifier)[]): Expression;
export function $new(path: [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Expression;
export function $new(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Expression;
export function $new(nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions: (string | Expression | Identifier)[] = []): Expression {
  const left = $access(nameOrPath);
  const args: Expression[] = [];

  variablesOrExpressions.forEach(varOrExpr => {
    if (typeof varOrExpr === 'string') {
      args.push(createIdentifier(varOrExpr));
    } else {
      args.push(varOrExpr);
    }
  });
  return createNew(left, [], args);
}

export function $$new(variable: string, name: string, variablesOrExpressions?: (string | Expression | Identifier)[]): Statement;
export function $$new(variable: string, path: [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Statement;
export function $$new(variable: string, nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions?: (string | Expression | Identifier)[]): Statement;
export function $$new(variable: string, nameOrPath: string | [string | Expression | Identifier, ...(string | Identifier)[]], variablesOrExpressions: (string | Expression | Identifier)[] = []): Statement {
  return $$const(variable, $new(nameOrPath, variablesOrExpressions));
}

export function $$const(name: string, initializer: Expression): VariableStatement;
export function $$const(names: string[], initializer: Expression): VariableStatement;
export function $$const(nameOrNames: string | string[], initializer: Expression): VariableStatement {
  let declaration: VariableDeclaration;
  if (Array.isArray(nameOrNames)) {
    const elements = nameOrNames.map(n => createBindingElement(undefined, undefined, n));
    declaration = createVariableDeclaration(createObjectBindingPattern(elements), undefined, initializer)
  } else {
    declaration = createVariableDeclaration(createIdentifier(nameOrNames), undefined, initializer);
  }
  return createVariableStatement([], createVariableDeclarationList([declaration], NodeFlags.Const));
}

export function $expression(value: any, multiline: number = 0, level: number = 0): Expression {

  function $objectLiteral(obj: any, $multiline: number, $level: number): ObjectLiteralExpression {
    const properties: ObjectLiteralElementLike[] = [];
    Object.keys(obj).forEach(key => {
      const identifier = createIdentifier(key);
      const value = obj[key];
      if (key === value) {
        properties.push(createShorthandPropertyAssignment(identifier))
      } else {
        const initializer = $expression(obj[key], $multiline, $level + 1);
        properties.push(createPropertyAssignment(identifier, initializer));
      }
    });
    return createObjectLiteral(properties, $multiline > $level);
  }

  function $arrayLiteral(arr: any[], $multiline: number, $level: number): ArrayLiteralExpression {
    const expressions: Expression[] = [];
    arr.forEach(value => {
      expressions.push($expression(value, $multiline, $level + 1));
    });
    return createArrayLiteral(expressions, $multiline > $level);
  }

  switch (Object.prototype.toString.call(value)) {
    case '[object Undefined]':
      return createIdentifier('undefined');
    case '[object Null]':
      return createIdentifier('null');
    case '[object Number]':
    case '[object Boolean]':
    case '[object String]':
      return createLiteral(value)
    case '[object Array]':
      return $arrayLiteral(value, multiline, level);
    case '[object Object]':
    default:
      return $objectLiteral(value, multiline, level);
  }
}

export function $$return(value: any): ReturnStatement {
  return createReturn($expression(value))
}

export function $property(name: string, value?: any, isStatic?: boolean) {
  const modifiers = [];
  if (isStatic === true) {
    modifiers.push(createModifier(SyntaxKind.StaticKeyword));
  }
  if (arguments.length === 1) {
    return createProperty([], modifiers, $id(name), undefined, undefined, undefined);
  } else {
    return createProperty([], modifiers, $id(name), undefined, undefined, $expression(value));
  }
}
export function $class(elements: ReadonlyArray<ClassElement>) {
  return createClassExpression([], undefined, [], [], elements)
}
export function $functionExpr(statements: Statement[]): Expression {
  return createFunctionExpression(
    [],
    undefined,
    undefined,
    [],
    [],
    undefined,
    createBlock(statements, true)
  )
}
export function $$functionExpr(name: string, args: Expression[]): Statement {
  return createExpressionStatement($call(name, args));
}
export function $$functionDecl(name: string, statements: Statement[], parameters: ParameterDeclaration[]): Statement {
  return createFunctionDeclaration([], [], undefined, createIdentifier(name), [], parameters, undefined, createBlock(statements, true));
}
export function $param(name: string) {
  return createParameter(
    [],
    [],
    undefined,
    createIdentifier(name),
    undefined,
    undefined,
    undefined
  )
}
export function $$import(path: string, ...names: string[]) {
  return createImportDeclaration(
    [],
    [],
    createImportClause(
      undefined,
      createNamedImports(names.map(name => createImportSpecifier(undefined, createIdentifier(name))))),
      createLiteral(path)
  );
}
export function $element(name: string, inner: string, ...attributes: string[]) {
  return attributes.length
    ? `<${name} ${attributes.join(' ')}>${inner}</${name}>`
    : `<${name}>${inner}</${name}>`;
}
export function $div(inner: string, ...attributes: string[]) {
  return $element('div', inner, ...attributes);
}
$div.$name = 'div';
export function $tpl(inner: string, ...attributes: string[]) {
  return $element('template', inner, ...attributes);
}
$tpl.$name = 'tpl';
type CreateElement = { $name: string } & ((inner: string, ...attributes: string[]) => string);

export function $attr(create: CreateElement, ...attributes: string[]): CreateElement {
  const createWrapped = (inner: string) => {
    return create(inner, ...attributes);
  };
  createWrapped.$name = this.$name;
  return createWrapped;
}

