import { DI as e, Protocol as t, toArray as s, IServiceLocator as i, ILogger as r, Registration as n, noop as a } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as o } from "../../../metadata/dist/native-modules/index.mjs";

import * as u from "../../../runtime/dist/native-modules/index.mjs";

import { Scope as l, PrimitiveLiteralExpression as c, IExpressionParser as h } from "../../../runtime/dist/native-modules/index.mjs";

import { astEvaluator as $ } from "../../../runtime-html/dist/native-modules/index.mjs";

const d = e.createInterface("IValidationExpressionHydrator");

function m(e, t, s, i) {
    var r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i, a;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) n = Reflect.decorate(e, t, s, i); else for (var o = e.length - 1; o >= 0; o--) if (a = e[o]) n = (r < 3 ? a(n) : r > 3 ? a(t, s, n) : a(t, s)) || n;
    return r > 3 && n && Object.defineProperty(t, s, n), n;
}

function f(e, t) {
    return function(s, i) {
        t(s, i, e);
    };
}

const p = e.createInterface("IValidationMessageProvider");

const g = Object.freeze({
    aliasKey: t.annotation.keyFor("validation-rule-alias-message"),
    define(e, t) {
        g.setDefaultMessage(e, t);
        return e;
    },
    setDefaultMessage(e, {aliases: t}, i = true) {
        const r = i ? o.getOwn(this.aliasKey, e.prototype) : void 0;
        if (void 0 !== r) {
            const e = {
                ...Object.fromEntries(r.map((({name: e, defaultMessage: t}) => [ e, t ]))),
                ...Object.fromEntries(t.map((({name: e, defaultMessage: t}) => [ e, t ])))
            };
            t = s(Object.entries(e)).map((([e, t]) => ({
                name: e,
                defaultMessage: t
            })));
        }
        o.define(g.aliasKey, t, e instanceof Function ? e.prototype : e);
    },
    getDefaultMessages(e) {
        return o.get(this.aliasKey, e instanceof Function ? e.prototype : e);
    }
});

function w(e) {
    return function(t) {
        return g.define(t, e);
    };
}

let y = class BaseValidationRule {
    constructor(e = void 0) {
        this.messageKey = e;
        this.tag = void 0;
    }
    canExecute(e) {
        return true;
    }
    execute(e, t) {
        throw new Error("No base implementation of execute. Did you forget to implement the execute method?");
    }
    accept(e) {
        throw new Error("No base implementation of accept. Did you forget to implement the accept method?");
    }
};

y.$TYPE = "";

y = m([ w({
    aliases: [ {
        name: void 0,
        defaultMessage: `\${$displayName} is invalid.`
    } ]
}) ], y);

let v = class RequiredRule extends y {
    constructor() {
        super("required");
    }
    execute(e) {
        return null !== e && void 0 !== e && !("string" === typeof e && !/\S/.test(e));
    }
    accept(e) {
        return e.visitRequiredRule(this);
    }
};

v.$TYPE = "RequiredRule";

v = m([ w({
    aliases: [ {
        name: "required",
        defaultMessage: `\${$displayName} is required.`
    } ]
}) ], v);

let x = class RegexRule extends y {
    constructor(e, t = "matches") {
        super(t);
        this.pattern = e;
    }
    execute(e) {
        return null === e || void 0 === e || 0 === e.length || this.pattern.test(e);
    }
    accept(e) {
        return e.visitRegexRule(this);
    }
};

x.$TYPE = "RegexRule";

x = m([ w({
    aliases: [ {
        name: "matches",
        defaultMessage: `\${$displayName} is not correctly formatted.`
    }, {
        name: "email",
        defaultMessage: `\${$displayName} is not a valid email.`
    } ]
}) ], x);

let R = class LengthRule extends y {
    constructor(e, t) {
        super(t ? "maxLength" : "minLength");
        this.length = e;
        this.isMax = t;
    }
    execute(e) {
        return null === e || void 0 === e || 0 === e.length || (this.isMax ? e.length <= this.length : e.length >= this.length);
    }
    accept(e) {
        return e.visitLengthRule(this);
    }
};

R.$TYPE = "LengthRule";

R = m([ w({
    aliases: [ {
        name: "minLength",
        defaultMessage: `\${$displayName} must be at least \${$rule.length} character\${$rule.length === 1 ? '' : 's'}.`
    }, {
        name: "maxLength",
        defaultMessage: `\${$displayName} cannot be longer than \${$rule.length} character\${$rule.length === 1 ? '' : 's'}.`
    } ]
}) ], R);

let E = class SizeRule extends y {
    constructor(e, t) {
        super(t ? "maxItems" : "minItems");
        this.count = e;
        this.isMax = t;
    }
    execute(e) {
        return null === e || void 0 === e || (this.isMax ? e.length <= this.count : e.length >= this.count);
    }
    accept(e) {
        return e.visitSizeRule(this);
    }
};

E.$TYPE = "SizeRule";

E = m([ w({
    aliases: [ {
        name: "minItems",
        defaultMessage: `\${$displayName} must contain at least \${$rule.count} item\${$rule.count === 1 ? '' : 's'}.`
    }, {
        name: "maxItems",
        defaultMessage: `\${$displayName} cannot contain more than \${$rule.count} item\${$rule.count === 1 ? '' : 's'}.`
    } ]
}) ], E);

let P = class RangeRule extends y {
    constructor(e, {min: t, max: s}) {
        super(void 0 !== t && void 0 !== s ? e ? "range" : "between" : void 0 !== t ? "min" : "max");
        this.isInclusive = e;
        this.min = Number.NEGATIVE_INFINITY;
        this.max = Number.POSITIVE_INFINITY;
        this.min = t ?? this.min;
        this.max = s ?? this.max;
    }
    execute(e, t) {
        return null === e || void 0 === e || (this.isInclusive ? e >= this.min && e <= this.max : e > this.min && e < this.max);
    }
    accept(e) {
        return e.visitRangeRule(this);
    }
};

P.$TYPE = "RangeRule";

P = m([ w({
    aliases: [ {
        name: "min",
        defaultMessage: `\${$displayName} must be at least \${$rule.min}.`
    }, {
        name: "max",
        defaultMessage: `\${$displayName} must be at most \${$rule.max}.`
    }, {
        name: "range",
        defaultMessage: `\${$displayName} must be between or equal to \${$rule.min} and \${$rule.max}.`
    }, {
        name: "between",
        defaultMessage: `\${$displayName} must be between but not equal to \${$rule.min} and \${$rule.max}.`
    } ]
}) ], P);

let b = class EqualsRule extends y {
    constructor(e) {
        super("equals");
        this.expectedValue = e;
    }
    execute(e) {
        return null === e || void 0 === e || "" === e || e === this.expectedValue;
    }
    accept(e) {
        return e.visitEqualsRule(this);
    }
};

b.$TYPE = "EqualsRule";

b = m([ w({
    aliases: [ {
        name: "equals",
        defaultMessage: `\${$displayName} must be \${$rule.expectedValue}.`
    } ]
}) ], b);

const M = e.createInterface("ICustomMessages");

class RuleProperty {
    constructor(e, t = void 0, s = void 0) {
        this.expression = e;
        this.name = t;
        this.displayName = s;
    }
    accept(e) {
        return e.visitRuleProperty(this);
    }
}

RuleProperty.$TYPE = "RuleProperty";

const T = Object.freeze({
    name: "validation-rules",
    defaultRuleSetName: "__default",
    set(e, s, i) {
        const r = `${T.name}:${i ?? T.defaultRuleSetName}`;
        o.define(t.annotation.keyFor(r), s, e);
        const n = o.getOwn(t.annotation.name, e);
        if (void 0 === n) o.define(t.annotation.name, [ r ], e); else n.push(r);
    },
    get(e, s) {
        const i = t.annotation.keyFor(T.name, s ?? T.defaultRuleSetName);
        return o.get(i, e) ?? o.getOwn(i, e.constructor);
    },
    unset(e, s) {
        const i = o.getOwn(t.annotation.name, e);
        for (const r of i.slice(0)) if (r.startsWith(T.name) && (void 0 === s || r.endsWith(s))) {
            o.delete(t.annotation.keyFor(r), e);
            const s = i.indexOf(r);
            if (s > -1) i.splice(s, 1);
        }
    },
    isValidationRulesSet(e) {
        const s = o.getOwn(t.annotation.name, e);
        return void 0 !== s && s.some((e => e.startsWith(T.name)));
    }
});

class ValidationMessageEvaluationContext {
    constructor(e, t, s, i, r, n) {
        this.messageProvider = e;
        this.$displayName = t;
        this.$propertyName = s;
        this.$value = i;
        this.$rule = r;
        this.$object = n;
    }
    $getDisplayName(e, t) {
        return this.messageProvider.getDisplayName(e, t);
    }
}

class PropertyRule {
    constructor(e, t, s, i, r = [ [] ]) {
        this.locator = e;
        this.validationRules = t;
        this.messageProvider = s;
        this.property = i;
        this.$rules = r;
    }
    accept(e) {
        return e.visitPropertyRule(this);
    }
    addRule(e) {
        const t = this.getLeafRules();
        t.push(this.latestRule = e);
        return this;
    }
    getLeafRules() {
        const e = this.$rules.length - 1;
        return this.$rules[e];
    }
    async validate(e, t, s, i) {
        if (void 0 === i) i = l.create({
            [S]: e
        });
        const r = this.property.expression;
        let n;
        if (void 0 === r) n = e; else n = r.evaluate(i, this, null);
        let a = true;
        const o = async s => {
            const i = async t => {
                let s = t.execute(n, e);
                if (s instanceof Promise) s = await s;
                a = a && s;
                const {displayName: i, name: r} = this.property;
                let o;
                if (!s) {
                    const s = l.create(new ValidationMessageEvaluationContext(this.messageProvider, this.messageProvider.getDisplayName(r, i), r, n, t, e));
                    o = this.messageProvider.getMessage(t).evaluate(s, this, null);
                }
                return new ValidationResult(s, o, r, e, t, this);
            };
            const r = [];
            for (const n of s) if (n.canExecute(e) && (void 0 === t || n.tag === t)) r.push(i(n));
            return Promise.all(r);
        };
        const u = async (e, t) => {
            const s = await o(t);
            e.push(...s);
            return e;
        };
        return this.$rules.reduce((async (e, t) => e.then((async e => a ? u(e, t) : Promise.resolve(e)))), Promise.resolve([]));
    }
    then() {
        this.$rules.push([]);
        return this;
    }
    withMessageKey(e) {
        this.assertLatestRule(this.latestRule);
        this.latestRule.messageKey = e;
        return this;
    }
    withMessage(e) {
        const t = this.latestRule;
        this.assertLatestRule(t);
        this.messageProvider.setMessage(t, e);
        return this;
    }
    when(e) {
        this.assertLatestRule(this.latestRule);
        this.latestRule.canExecute = e;
        return this;
    }
    tag(e) {
        this.assertLatestRule(this.latestRule);
        this.latestRule.tag = e;
        return this;
    }
    assertLatestRule(e) {
        if (void 0 === e) throw new Error("No rule has been added");
    }
    displayName(e) {
        this.property.displayName = e;
        return this;
    }
    satisfies(e) {
        const t = new class extends y {
            constructor() {
                super(...arguments);
                this.execute = e;
            }
        };
        return this.addRule(t);
    }
    satisfiesRule(e) {
        return this.addRule(e);
    }
    required() {
        return this.addRule(new v);
    }
    matches(e) {
        return this.addRule(new x(e));
    }
    email() {
        const e = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return this.addRule(new x(e, "email"));
    }
    minLength(e) {
        return this.addRule(new R(e, false));
    }
    maxLength(e) {
        return this.addRule(new R(e, true));
    }
    minItems(e) {
        return this.addRule(new E(e, false));
    }
    maxItems(e) {
        return this.addRule(new E(e, true));
    }
    min(e) {
        return this.addRule(new P(true, {
            min: e
        }));
    }
    max(e) {
        return this.addRule(new P(true, {
            max: e
        }));
    }
    range(e, t) {
        return this.addRule(new P(true, {
            min: e,
            max: t
        }));
    }
    between(e, t) {
        return this.addRule(new P(false, {
            min: e,
            max: t
        }));
    }
    equals(e) {
        return this.addRule(new b(e));
    }
    ensure(e) {
        this.latestRule = void 0;
        return this.validationRules.ensure(e);
    }
    ensureObject() {
        this.latestRule = void 0;
        return this.validationRules.ensureObject();
    }
    get rules() {
        return this.validationRules.rules;
    }
    on(e, t) {
        return this.validationRules.on(e, t);
    }
}

PropertyRule.$TYPE = "PropertyRule";

$()(PropertyRule);

class ModelBasedRule {
    constructor(e, t = T.defaultRuleSetName) {
        this.ruleset = e;
        this.tag = t;
    }
}

const z = e.createInterface("IValidationRules");

let N = class ValidationRules {
    constructor(e, t, s, i) {
        this.locator = e;
        this.parser = t;
        this.messageProvider = s;
        this.deserializer = i;
        this.rules = [];
        this.targets = new Set;
    }
    ensure(e) {
        const [t, s] = V(e, this.parser);
        let i = this.rules.find((e => e.property.name == t));
        if (void 0 === i) {
            i = new PropertyRule(this.locator, this, this.messageProvider, new RuleProperty(s, t));
            this.rules.push(i);
        }
        return i;
    }
    ensureObject() {
        const e = new PropertyRule(this.locator, this, this.messageProvider, new RuleProperty);
        this.rules.push(e);
        return e;
    }
    on(e, t) {
        const s = T.get(e, t);
        if (Object.is(s, this.rules)) return this;
        this.rules = s ?? [];
        T.set(e, this.rules, t);
        this.targets.add(e);
        return this;
    }
    off(e, t) {
        const s = void 0 !== e ? [ e ] : Array.from(this.targets);
        for (const e of s) {
            T.unset(e, t);
            if (!T.isValidationRulesSet(e)) this.targets.delete(e);
        }
    }
    applyModelBasedRules(e, t) {
        const s = new Set;
        for (const i of t) {
            const t = i.tag;
            if (s.has(t)) console.warn(`A ruleset for tag ${t} is already defined which will be overwritten`);
            const r = this.deserializer.hydrateRuleset(i.ruleset, this);
            T.set(e, r, t);
            s.add(t);
        }
    }
};

N = m([ f(0, i), f(1, h), f(2, p), f(3, d) ], N);

const A = /^function\s*\([$_\w\d]+\)\s*\{(?:\s*["']{1}use strict["']{1};)?(?:[$_\s\w\d\/\*.['"\]+;]+)?\s*return\s+[$_\w\d]+((\.[$_\w\d]+|\[['"$_\w\d]+\])+)\s*;?\s*\}$/;

const Y = /^\(?[$_\w\d]+\)?\s*=>\s*[$_\w\d]+((\.[$_\w\d]+|\[['"$_\w\d]+\])+)$/;

const S = "$root";

function V(e, t) {
    switch (typeof e) {
      case "string":
        break;

      case "function":
        {
            const t = e.toString();
            const s = Y.exec(t) ?? A.exec(t);
            if (null === s) throw new Error(`Unable to parse accessor function:\n${t}`);
            e = s[1].substring(1);
            break;
        }

      default:
        throw new Error(`Unable to parse accessor function:\n${e}`);
    }
    return [ e, t.parse(`${S}.${e}`, 8) ];
}

class ValidationResult {
    constructor(e, t, s, i, r, n, a = false) {
        this.valid = e;
        this.message = t;
        this.propertyName = s;
        this.object = i;
        this.rule = r;
        this.propertyRule = n;
        this.isManual = a;
        this.id = ValidationResult.nextId++;
    }
    toString() {
        return this.valid ? "Valid." : this.message;
    }
}

ValidationResult.nextId = 0;

const j = new Set([ "displayName", "propertyName", "value", "object", "config", "getDisplayName" ]);

let O = class ValidationMessageProvider {
    constructor(e, t, s) {
        this.parser = e;
        this.registeredMessages = new WeakMap;
        this.logger = t.scopeTo(ValidationMessageProvider.name);
        for (const {rule: e, aliases: t} of s) g.setDefaultMessage(e, {
            aliases: t
        });
    }
    getMessage(e) {
        const t = this.registeredMessages.get(e);
        if (void 0 !== t) return t;
        const s = g.getDefaultMessages(e);
        const i = e.messageKey;
        let r;
        const n = s.length;
        if (1 === n && void 0 === i) r = s[0].defaultMessage; else r = s.find((e => e.name === i))?.defaultMessage;
        if (!r) r = g.getDefaultMessages(y)[0].defaultMessage;
        return this.setMessage(e, r);
    }
    setMessage(e, t) {
        const s = this.parseMessage(t);
        this.registeredMessages.set(e, s);
        return s;
    }
    parseMessage(e) {
        const t = this.parser.parse(e, 1);
        if (25 === t?.$kind) {
            for (const s of t.expressions) {
                const t = s.name;
                if (j.has(t)) this.logger.warn(`Did you mean to use "$${t}" instead of "${t}" in this validation message template: "${e}"?`);
                if (1793 === s.$kind || s.ancestor > 0) throw new Error("$parent is not permitted in validation message expressions.");
            }
            return t;
        }
        return new c(e);
    }
    getDisplayName(e, t) {
        if (null !== t && void 0 !== t) return t instanceof Function ? t() : t;
        if (void 0 === e) return;
        const s = e.toString().split(/(?=[A-Z])/).join(" ");
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
};

O = m([ f(0, h), f(1, r), f(2, M) ], O);

var I;

(function(e) {
    e["BindingBehaviorExpression"] = "BindingBehaviorExpression";
    e["ValueConverterExpression"] = "ValueConverterExpression";
    e["AssignExpression"] = "AssignExpression";
    e["ConditionalExpression"] = "ConditionalExpression";
    e["AccessThisExpression"] = "AccessThisExpression";
    e["AccessScopeExpression"] = "AccessScopeExpression";
    e["AccessMemberExpression"] = "AccessMemberExpression";
    e["AccessKeyedExpression"] = "AccessKeyedExpression";
    e["CallScopeExpression"] = "CallScopeExpression";
    e["CallMemberExpression"] = "CallMemberExpression";
    e["CallFunctionExpression"] = "CallFunctionExpression";
    e["BinaryExpression"] = "BinaryExpression";
    e["UnaryExpression"] = "UnaryExpression";
    e["PrimitiveLiteralExpression"] = "PrimitiveLiteralExpression";
    e["ArrayLiteralExpression"] = "ArrayLiteralExpression";
    e["ObjectLiteralExpression"] = "ObjectLiteralExpression";
    e["TemplateExpression"] = "TemplateExpression";
    e["TaggedTemplateExpression"] = "TaggedTemplateExpression";
    e["ArrayBindingPattern"] = "ArrayBindingPattern";
    e["ObjectBindingPattern"] = "ObjectBindingPattern";
    e["BindingIdentifier"] = "BindingIdentifier";
    e["ForOfStatement"] = "ForOfStatement";
    e["Interpolation"] = "Interpolation";
    e["DestructuringAssignment"] = "DestructuringAssignment";
    e["DestructuringSingleAssignment"] = "DestructuringSingleAssignment";
    e["DestructuringRestAssignment"] = "DestructuringRestAssignment";
    e["ArrowFunction"] = "ArrowFunction";
})(I || (I = {}));

class Deserializer {
    static deserialize(e) {
        const t = new Deserializer;
        const s = JSON.parse(e);
        return t.hydrate(s);
    }
    hydrate(e) {
        switch (e.$TYPE) {
          case I.AccessMemberExpression:
            {
                const t = e;
                return new u.AccessMemberExpression(this.hydrate(t.object), t.name);
            }

          case I.AccessKeyedExpression:
            {
                const t = e;
                return new u.AccessKeyedExpression(this.hydrate(t.object), this.hydrate(t.key));
            }

          case I.AccessThisExpression:
            {
                const t = e;
                return new u.AccessThisExpression(t.ancestor);
            }

          case I.AccessScopeExpression:
            {
                const t = e;
                return new u.AccessScopeExpression(t.name, t.ancestor);
            }

          case I.ArrayLiteralExpression:
            {
                const t = e;
                return new u.ArrayLiteralExpression(this.hydrate(t.elements));
            }

          case I.ObjectLiteralExpression:
            {
                const t = e;
                return new u.ObjectLiteralExpression(this.hydrate(t.keys), this.hydrate(t.values));
            }

          case I.PrimitiveLiteralExpression:
            {
                const t = e;
                return new u.PrimitiveLiteralExpression(this.hydrate(t.value));
            }

          case I.CallFunctionExpression:
            {
                const t = e;
                return new u.CallFunctionExpression(this.hydrate(t.func), this.hydrate(t.args));
            }

          case I.CallMemberExpression:
            {
                const t = e;
                return new u.CallMemberExpression(this.hydrate(t.object), t.name, this.hydrate(t.args));
            }

          case I.CallScopeExpression:
            {
                const t = e;
                return new u.CallScopeExpression(t.name, this.hydrate(t.args), t.ancestor);
            }

          case I.TemplateExpression:
            {
                const t = e;
                return new u.TemplateExpression(this.hydrate(t.cooked), this.hydrate(t.expressions));
            }

          case I.TaggedTemplateExpression:
            {
                const t = e;
                return new u.TaggedTemplateExpression(this.hydrate(t.cooked), this.hydrate(t.raw), this.hydrate(t.func), this.hydrate(t.expressions));
            }

          case I.UnaryExpression:
            {
                const t = e;
                return new u.UnaryExpression(t.operation, this.hydrate(t.expression));
            }

          case I.BinaryExpression:
            {
                const t = e;
                return new u.BinaryExpression(t.operation, this.hydrate(t.left), this.hydrate(t.right));
            }

          case I.ConditionalExpression:
            {
                const t = e;
                return new u.ConditionalExpression(this.hydrate(t.condition), this.hydrate(t.yes), this.hydrate(t.no));
            }

          case I.AssignExpression:
            {
                const t = e;
                return new u.AssignExpression(this.hydrate(t.target), this.hydrate(t.value));
            }

          case I.ValueConverterExpression:
            {
                const t = e;
                return new u.ValueConverterExpression(this.hydrate(t.expression), t.name, this.hydrate(t.args));
            }

          case I.BindingBehaviorExpression:
            {
                const t = e;
                return new u.BindingBehaviorExpression(this.hydrate(t.expression), t.name, this.hydrate(t.args));
            }

          case I.ArrayBindingPattern:
            {
                const t = e;
                return new u.ArrayBindingPattern(this.hydrate(t.elements));
            }

          case I.ObjectBindingPattern:
            {
                const t = e;
                return new u.ObjectBindingPattern(this.hydrate(t.keys), this.hydrate(t.values));
            }

          case I.BindingIdentifier:
            {
                const t = e;
                return new u.BindingIdentifier(t.name);
            }

          case I.ForOfStatement:
            {
                const t = e;
                return new u.ForOfStatement(this.hydrate(t.declaration), this.hydrate(t.iterable));
            }

          case I.Interpolation:
            {
                const t = e;
                return new u.Interpolation(this.hydrate(t.cooked), this.hydrate(t.expressions));
            }

          case I.DestructuringAssignment:
            return new u.DestructuringAssignmentExpression(this.hydrate(e.$kind), this.hydrate(e.list), this.hydrate(e.source), this.hydrate(e.initializer));

          case I.DestructuringSingleAssignment:
            return new u.DestructuringAssignmentSingleExpression(this.hydrate(e.target), this.hydrate(e.source), this.hydrate(e.initializer));

          case I.DestructuringRestAssignment:
            return new u.DestructuringAssignmentRestExpression(this.hydrate(e.target), this.hydrate(e.indexOrProperties));

          case I.ArrowFunction:
            return new u.ArrowFunction(this.hydrate(e.parameters), this.hydrate(e.body), this.hydrate(e.rest));

          default:
            if (Array.isArray(e)) if ("object" === typeof e[0]) return this.deserializeExpressions(e); else return e.map(C); else if ("object" !== typeof e) return C(e);
            throw new Error(`unable to deserialize the expression: ${e}`);
        }
    }
    deserializeExpressions(e) {
        const t = [];
        for (const s of e) t.push(this.hydrate(s));
        return t;
    }
}

class Serializer {
    static serialize(e) {
        const t = new Serializer;
        if (null == e || "function" !== typeof e.accept) return `${e}`;
        return e.accept(t);
    }
    visitAccessMember(e) {
        return `{"$TYPE":"${I.AccessMemberExpression}","name":"${e.name}","object":${e.object.accept(this)}}`;
    }
    visitAccessKeyed(e) {
        return `{"$TYPE":"${I.AccessKeyedExpression}","object":${e.object.accept(this)},"key":${e.key.accept(this)}}`;
    }
    visitAccessThis(e) {
        return `{"$TYPE":"${I.AccessThisExpression}","ancestor":${e.ancestor}}`;
    }
    visitAccessScope(e) {
        return `{"$TYPE":"${I.AccessScopeExpression}","name":"${e.name}","ancestor":${e.ancestor}}`;
    }
    visitArrayLiteral(e) {
        return `{"$TYPE":"${I.ArrayLiteralExpression}","elements":${this.serializeExpressions(e.elements)}}`;
    }
    visitObjectLiteral(e) {
        return `{"$TYPE":"${I.ObjectLiteralExpression}","keys":${L(e.keys)},"values":${this.serializeExpressions(e.values)}}`;
    }
    visitPrimitiveLiteral(e) {
        return `{"$TYPE":"${I.PrimitiveLiteralExpression}","value":${D(e.value)}}`;
    }
    visitCallFunction(e) {
        return `{"$TYPE":"${I.CallFunctionExpression}","func":${e.func.accept(this)},"args":${this.serializeExpressions(e.args)}}`;
    }
    visitCallMember(e) {
        return `{"$TYPE":"${I.CallMemberExpression}","name":"${e.name}","object":${e.object.accept(this)},"args":${this.serializeExpressions(e.args)}}`;
    }
    visitCallScope(e) {
        return `{"$TYPE":"${I.CallScopeExpression}","name":"${e.name}","ancestor":${e.ancestor},"args":${this.serializeExpressions(e.args)}}`;
    }
    visitTemplate(e) {
        return `{"$TYPE":"${I.TemplateExpression}","cooked":${L(e.cooked)},"expressions":${this.serializeExpressions(e.expressions)}}`;
    }
    visitTaggedTemplate(e) {
        return `{"$TYPE":"${I.TaggedTemplateExpression}","cooked":${L(e.cooked)},"raw":${L(e.cooked.raw)},"func":${e.func.accept(this)},"expressions":${this.serializeExpressions(e.expressions)}}`;
    }
    visitUnary(e) {
        return `{"$TYPE":"${I.UnaryExpression}","operation":"${e.operation}","expression":${e.expression.accept(this)}}`;
    }
    visitBinary(e) {
        return `{"$TYPE":"${I.BinaryExpression}","operation":"${e.operation}","left":${e.left.accept(this)},"right":${e.right.accept(this)}}`;
    }
    visitConditional(e) {
        return `{"$TYPE":"${I.ConditionalExpression}","condition":${e.condition.accept(this)},"yes":${e.yes.accept(this)},"no":${e.no.accept(this)}}`;
    }
    visitAssign(e) {
        return `{"$TYPE":"${I.AssignExpression}","target":${e.target.accept(this)},"value":${e.value.accept(this)}}`;
    }
    visitValueConverter(e) {
        return `{"$TYPE":"${I.ValueConverterExpression}","name":"${e.name}","expression":${e.expression.accept(this)},"args":${this.serializeExpressions(e.args)}}`;
    }
    visitBindingBehavior(e) {
        return `{"$TYPE":"${I.BindingBehaviorExpression}","name":"${e.name}","expression":${e.expression.accept(this)},"args":${this.serializeExpressions(e.args)}}`;
    }
    visitArrayBindingPattern(e) {
        return `{"$TYPE":"${I.ArrayBindingPattern}","elements":${this.serializeExpressions(e.elements)}}`;
    }
    visitObjectBindingPattern(e) {
        return `{"$TYPE":"${I.ObjectBindingPattern}","keys":${L(e.keys)},"values":${this.serializeExpressions(e.values)}}`;
    }
    visitBindingIdentifier(e) {
        return `{"$TYPE":"${I.BindingIdentifier}","name":"${e.name}"}`;
    }
    visitHtmlLiteral(e) {
        throw new Error("visitHtmlLiteral");
    }
    visitForOfStatement(e) {
        return `{"$TYPE":"${I.ForOfStatement}","declaration":${e.declaration.accept(this)},"iterable":${e.iterable.accept(this)}}`;
    }
    visitInterpolation(e) {
        return `{"$TYPE":"${I.Interpolation}","cooked":${L(e.parts)},"expressions":${this.serializeExpressions(e.expressions)}}`;
    }
    visitDestructuringAssignmentExpression(e) {
        return `{"$TYPE":"${I.DestructuringAssignment}","$kind":${D(e.$kind)},"list":${this.serializeExpressions(e.list)},"source":${void 0 === e.source ? D(e.source) : e.source.accept(this)},"initializer":${void 0 === e.initializer ? D(e.initializer) : e.initializer.accept(this)}}`;
    }
    visitDestructuringAssignmentSingleExpression(e) {
        return `{"$TYPE":"${I.DestructuringSingleAssignment}","source":${e.source.accept(this)},"target":${e.target.accept(this)},"initializer":${void 0 === e.initializer ? D(e.initializer) : e.initializer.accept(this)}}`;
    }
    visitDestructuringAssignmentRestExpression(e) {
        return `{"$TYPE":"${I.DestructuringRestAssignment}","target":${e.target.accept(this)},"indexOrProperties":${Array.isArray(e.indexOrProperties) ? L(e.indexOrProperties) : D(e.indexOrProperties)}}`;
    }
    visitArrowFunction(e) {
        return `{"$TYPE":"${I.ArrowFunction}","parameters":${this.serializeExpressions(e.args)},"body":${e.body.accept(this)},"rest":${D(e.rest)}}`;
    }
    serializeExpressions(e) {
        let t = "[";
        for (let s = 0, i = e.length; s < i; ++s) {
            if (0 !== s) t += ",";
            t += e[s].accept(this);
        }
        t += "]";
        return t;
    }
}

function L(e) {
    let t = "[";
    for (let s = 0, i = e.length; s < i; ++s) {
        if (0 !== s) t += ",";
        t += D(e[s]);
    }
    t += "]";
    return t;
}

function D(e) {
    if ("string" === typeof e) return `"\\"${q(e)}\\""`; else if (null == e) return `"${e}"`; else return `${e}`;
}

function q(e) {
    let t = "";
    for (let s = 0, i = e.length; s < i; ++s) t += B(e.charAt(s));
    return t;
}

function B(e) {
    switch (e) {
      case "\b":
        return "\\b";

      case "\t":
        return "\\t";

      case "\n":
        return "\\n";

      case "\v":
        return "\\v";

      case "\f":
        return "\\f";

      case "\r":
        return "\\r";

      case '"':
        return '\\"';

      case "\\":
        return "\\\\";

      default:
        return e;
    }
}

function C(e) {
    if ("string" === typeof e) {
        if ("null" === e) return null;
        if ("undefined" === e) return;
        return e.substring(1, e.length - 1);
    } else return e;
}

class ValidationSerializer {
    static serialize(e) {
        if (null == e || "function" !== typeof e.accept) return `${e}`;
        const t = new ValidationSerializer;
        return e.accept(t);
    }
    visitRequiredRule(e) {
        return `{"$TYPE":"${v.$TYPE}","messageKey":"${e.messageKey}","tag":${D(e.tag)}}`;
    }
    visitRegexRule(e) {
        const t = e.pattern;
        return `{"$TYPE":"${x.$TYPE}","messageKey":"${e.messageKey}","tag":${D(e.tag)},"pattern":{"source":${D(t.source)},"flags":"${t.flags}"}}`;
    }
    visitLengthRule(e) {
        return `{"$TYPE":"${R.$TYPE}","messageKey":"${e.messageKey}","tag":${D(e.tag)},"length":${D(e.length)},"isMax":${D(e.isMax)}}`;
    }
    visitSizeRule(e) {
        return `{"$TYPE":"${E.$TYPE}","messageKey":"${e.messageKey}","tag":${D(e.tag)},"count":${D(e.count)},"isMax":${D(e.isMax)}}`;
    }
    visitRangeRule(e) {
        return `{"$TYPE":"${P.$TYPE}","messageKey":"${e.messageKey}","tag":${D(e.tag)},"isInclusive":${e.isInclusive},"min":${this.serializeNumber(e.min)},"max":${this.serializeNumber(e.max)}}`;
    }
    visitEqualsRule(e) {
        const t = e.expectedValue;
        let s;
        if ("object" !== typeof t || null === t) s = D(t); else s = JSON.stringify(t);
        return `{"$TYPE":"${b.$TYPE}","messageKey":"${e.messageKey}","tag":${D(e.tag)},"expectedValue":${s}}`;
    }
    visitRuleProperty(e) {
        const t = e.displayName;
        if (void 0 !== t && "string" !== typeof t) throw new Error("Serializing a non-string displayName for rule property is not supported.");
        const s = e.expression;
        return `{"$TYPE":"${RuleProperty.$TYPE}","name":${D(e.name)},"expression":${s ? Serializer.serialize(s) : null},"displayName":${D(t)}}`;
    }
    visitPropertyRule(e) {
        return `{"$TYPE":"${PropertyRule.$TYPE}","property":${e.property.accept(this)},"$rules":${this.serializeRules(e.$rules)}}`;
    }
    serializeNumber(e) {
        return e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY ? null : e.toString();
    }
    serializeRules(e) {
        return `[${e.map((e => `[${e.map((e => e.accept(this))).join(",")}]`)).join(",")}]`;
    }
}

let _ = class ValidationDeserializer {
    constructor(e, t, s) {
        this.locator = e;
        this.messageProvider = t;
        this.parser = s;
        this.astDeserializer = new Deserializer;
    }
    static register(e) {
        this.container = e;
    }
    static deserialize(e, t) {
        const s = this.container.get(p);
        const i = this.container.get(h);
        const r = new ValidationDeserializer(this.container, s, i);
        const n = JSON.parse(e);
        return r.hydrate(n, t);
    }
    hydrate(e, t) {
        switch (e.$TYPE) {
          case v.$TYPE:
            {
                const t = e;
                const s = new v;
                s.messageKey = t.messageKey;
                s.tag = this.astDeserializer.hydrate(t.tag);
                return s;
            }

          case x.$TYPE:
            {
                const t = e;
                const s = t.pattern;
                const i = this.astDeserializer;
                const r = new x(new RegExp(i.hydrate(s.source), s.flags), t.messageKey);
                r.tag = i.hydrate(t.tag);
                return r;
            }

          case R.$TYPE:
            {
                const t = e;
                const s = new R(t.length, t.isMax);
                s.messageKey = t.messageKey;
                s.tag = this.astDeserializer.hydrate(t.tag);
                return s;
            }

          case E.$TYPE:
            {
                const t = e;
                const s = new E(t.count, t.isMax);
                s.messageKey = t.messageKey;
                s.tag = this.astDeserializer.hydrate(t.tag);
                return s;
            }

          case P.$TYPE:
            {
                const t = e;
                const s = new P(t.isInclusive, {
                    min: t.min ?? Number.NEGATIVE_INFINITY,
                    max: t.max ?? Number.POSITIVE_INFINITY
                });
                s.messageKey = t.messageKey;
                s.tag = this.astDeserializer.hydrate(t.tag);
                return s;
            }

          case b.$TYPE:
            {
                const t = e;
                const s = this.astDeserializer;
                const i = new b("object" !== typeof t.expectedValue ? s.hydrate(t.expectedValue) : t.expectedValue);
                i.messageKey = t.messageKey;
                i.tag = s.hydrate(t.tag);
                return i;
            }

          case RuleProperty.$TYPE:
            {
                const t = e;
                const s = this.astDeserializer;
                let i = t.name;
                i = "undefined" === i ? void 0 : s.hydrate(i);
                let r = t.expression;
                if (null !== r && void 0 !== r) r = s.hydrate(r); else if (void 0 !== i) [, r] = V(i, this.parser); else r = void 0;
                let n = t.displayName;
                n = "undefined" === n ? void 0 : s.hydrate(n);
                return new RuleProperty(r, i, n);
            }

          case PropertyRule.$TYPE:
            {
                const s = e;
                return new PropertyRule(this.locator, t, this.messageProvider, this.hydrate(s.property, t), s.$rules.map((e => e.map((e => this.hydrate(e, t))))));
            }
        }
    }
    hydrateRuleset(e, t) {
        if (!Array.isArray(e)) throw new Error("The ruleset has to be an array of serialized property rule objects");
        return e.map((e => this.hydrate(e, t)));
    }
};

_ = m([ f(0, i), f(1, p), f(2, h) ], _);

let k = class ModelValidationExpressionHydrator {
    constructor(e, t, s) {
        this.locator = e;
        this.messageProvider = t;
        this.parser = s;
        this.astDeserializer = new Deserializer;
    }
    hydrate(e, t) {
        throw new Error("Method not implemented.");
    }
    hydrateRuleset(e, t) {
        const s = [];
        const i = (e, r = []) => {
            for (const [n, a] of e) if (this.isModelPropertyRule(a)) {
                const e = a.rules.map((e => Object.entries(e).map((([e, t]) => this.hydrateRule(e, t)))));
                const i = r.join(".");
                const o = this.hydrateRuleProperty({
                    name: "" !== i ? `${i}.${n}` : n,
                    displayName: a.displayName
                });
                s.push(new PropertyRule(this.locator, t, this.messageProvider, o, e));
            } else i(Object.entries(a), [ ...r, n ]);
        };
        i(Object.entries(e));
        return s;
    }
    hydrateRule(e, t) {
        switch (e) {
          case "required":
            return this.hydrateRequiredRule(t);

          case "regex":
            return this.hydrateRegexRule(t);

          case "maxLength":
            return this.hydrateLengthRule({
                ...t,
                isMax: true
            });

          case "minLength":
            return this.hydrateLengthRule({
                ...t,
                isMax: false
            });

          case "maxItems":
            return this.hydrateSizeRule({
                ...t,
                isMax: true
            });

          case "minItems":
            return this.hydrateSizeRule({
                ...t,
                isMax: false
            });

          case "range":
            return this.hydrateRangeRule({
                ...t,
                isInclusive: true
            });

          case "between":
            return this.hydrateRangeRule({
                ...t,
                isInclusive: false
            });

          case "equals":
            return this.hydrateEqualsRule(t);

          default:
            throw new Error(`Unsupported rule ${e}`);
        }
    }
    setCommonRuleProperties(e, t) {
        const s = e.messageKey;
        if (void 0 !== s && null !== s) t.messageKey = s;
        t.tag = e.tag;
        const i = e.when;
        if (i) if ("string" === typeof i) {
            const e = this.parser.parse(i, 0);
            t.canExecute = t => e.evaluate(l.create({
                $object: t
            }), this, null);
        } else if ("function" === typeof i) t.canExecute = i;
    }
    isModelPropertyRule(e) {
        return "object" === typeof e && "rules" in e;
    }
    hydrateRequiredRule(e) {
        const t = new v;
        this.setCommonRuleProperties(e, t);
        return t;
    }
    hydrateRegexRule(e) {
        const t = e.pattern;
        const s = new x(new RegExp(t.source, t.flags), e.messageKey);
        s.tag = e.tag;
        return s;
    }
    hydrateLengthRule(e) {
        const t = new R(e.length, e.isMax);
        this.setCommonRuleProperties(e, t);
        return t;
    }
    hydrateSizeRule(e) {
        const t = new E(e.count, e.isMax);
        this.setCommonRuleProperties(e, t);
        return t;
    }
    hydrateRangeRule(e) {
        const t = new P(e.isInclusive, {
            min: e.min,
            max: e.max
        });
        this.setCommonRuleProperties(e, t);
        return t;
    }
    hydrateEqualsRule(e) {
        const t = new b(e.expectedValue);
        this.setCommonRuleProperties(e, t);
        return t;
    }
    hydrateRuleProperty(e) {
        const t = e.name;
        if (!t || "string" !== typeof t) throw new Error("The property name needs to be a non-empty string");
        const [s, i] = V(t, this.parser);
        return new RuleProperty(i, s, e.displayName);
    }
};

k = m([ f(0, i), f(1, p), f(2, h) ], k);

$()(k);

class ValidateInstruction {
    constructor(e = void 0, t = void 0, s = void 0, i = void 0, r = void 0, n = 0) {
        this.object = e;
        this.propertyName = t;
        this.rules = s;
        this.objectTag = i;
        this.propertyTag = r;
        this.flags = n;
    }
}

const K = e.createInterface("IValidator");

class StandardValidator {
    async validate(e) {
        const t = e.object;
        const s = e.propertyName;
        const i = e.propertyTag;
        const r = e.flags;
        const n = e.rules ?? T.get(t, e.objectTag) ?? [];
        const a = l.create({
            [S]: t
        });
        if (void 0 !== s) return await (n.find((e => e.property.name === s))?.validate(t, i, r, a)) ?? [];
        return (await Promise.all(n.map((async e => e.validate(t, i, r, a))))).flat();
    }
}

function F() {
    return {
        ValidatorType: StandardValidator,
        MessageProviderType: O,
        CustomMessages: [],
        HydratorType: k
    };
}

function Z(e) {
    return {
        optionsProvider: e,
        register(t) {
            const s = F();
            e(s);
            t.register(n.instance(M, s.CustomMessages), n.singleton(K, s.ValidatorType), n.singleton(p, s.MessageProviderType), n.singleton(d, s.HydratorType), n.transient(z, N), _);
            return t;
        },
        customize(t) {
            return Z(t ?? e);
        }
    };
}

const H = Z(a);

export { y as BaseValidationRule, Deserializer, b as EqualsRule, M as ICustomMessages, d as IValidationExpressionHydrator, p as IValidationMessageProvider, z as IValidationRules, K as IValidator, R as LengthRule, ModelBasedRule, k as ModelValidationExpressionHydrator, PropertyRule, P as RangeRule, x as RegexRule, v as RequiredRule, RuleProperty, Serializer, E as SizeRule, StandardValidator, ValidateInstruction, H as ValidationConfiguration, _ as ValidationDeserializer, O as ValidationMessageProvider, ValidationResult, g as ValidationRuleAliasMessage, N as ValidationRules, ValidationSerializer, C as deserializePrimitive, F as getDefaultValidationConfiguration, V as parsePropertyName, S as rootObjectSymbol, D as serializePrimitive, L as serializePrimitives, w as validationRule, T as validationRulesRegistrar };

