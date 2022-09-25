"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/metadata");

const e = String;

const r = t.Metadata.getOwn;

const n = t.Metadata.hasOwn;

const s = t.Metadata.define;

const i = t => "function" === typeof t;

const o = t => "string" === typeof t;

const u = () => Object.create(null);

const l = {};

function c(t) {
    switch (typeof t) {
      case "number":
        return t >= 0 && (0 | t) === t;

      case "string":
        {
            const e = l[t];
            if (void 0 !== e) return e;
            const r = t.length;
            if (0 === r) return l[t] = false;
            let n = 0;
            let s = 0;
            for (;s < r; ++s) {
                n = t.charCodeAt(s);
                if (0 === s && 48 === n && r > 1 || n < 48 || n > 57) return l[t] = false;
            }
            return l[t] = true;
        }

      default:
        return false;
    }
}

const f = function() {
    const t = Object.assign(u(), {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true
    });
    function e(e) {
        if ("" === e) return 0;
        if (e !== e.toUpperCase()) return 3;
        if (e !== e.toLowerCase()) return 2;
        if (true === t[e]) return 1;
        return 0;
    }
    return function(t, r) {
        const n = t.length;
        if (0 === n) return t;
        let s = false;
        let i = "";
        let o;
        let u = "";
        let l = 0;
        let c = t.charAt(0);
        let f = e(c);
        let a = 0;
        for (;a < n; ++a) {
            o = l;
            u = c;
            l = f;
            c = t.charAt(a + 1);
            f = e(c);
            if (0 === l) {
                if (i.length > 0) s = true;
            } else {
                if (!s && i.length > 0 && 2 === l) s = 3 === o || 3 === f;
                i += r(u, s);
                s = false;
            }
        }
        return i;
    };
}();

const a = function() {
    const t = u();
    function e(t, e) {
        return e ? t.toUpperCase() : t.toLowerCase();
    }
    return function(r) {
        let n = t[r];
        if (void 0 === n) n = t[r] = f(r, e);
        return n;
    };
}();

const h = function() {
    const t = u();
    return function(e) {
        let r = t[e];
        if (void 0 === r) {
            r = a(e);
            if (r.length > 0) r = r[0].toUpperCase() + r.slice(1);
            t[e] = r;
        }
        return r;
    };
}();

const d = function() {
    const t = u();
    function e(t, e) {
        return e ? `-${t.toLowerCase()}` : t.toLowerCase();
    }
    return function(r) {
        let n = t[r];
        if (void 0 === n) n = t[r] = f(r, e);
        return n;
    };
}();

function p(t) {
    const e = t.length;
    const r = Array(e);
    let n = 0;
    for (;n < e; ++n) r[n] = t[n];
    return r;
}

function v(t, e, r) {
    return {
        configurable: true,
        enumerable: r.enumerable,
        get() {
            const t = r.value.bind(this);
            Reflect.defineProperty(this, e, {
                value: t,
                writable: true,
                configurable: true,
                enumerable: r.enumerable
            });
            return t;
        }
    };
}

function w(...t) {
    const e = [];
    let r = 0;
    const n = t.length;
    let s = 0;
    let i;
    let o = 0;
    for (;o < n; ++o) {
        i = t[o];
        if (void 0 !== i) {
            s = i.length;
            let t = 0;
            for (;t < s; ++t) e[r++] = i[t];
        }
    }
    return e;
}

function g(...t) {
    const e = t.length;
    let r;
    let n = 0;
    for (;e > n; ++n) {
        r = t[n];
        if (void 0 !== r) return r;
    }
    throw new Error(`No default value found`);
}

const x = function() {
    const t = Function.prototype;
    const e = Object.getPrototypeOf;
    const r = new WeakMap;
    let n = t;
    let s = 0;
    let i;
    return function(o) {
        i = r.get(o);
        if (void 0 === i) {
            r.set(o, i = [ n = o ]);
            s = 0;
            while ((n = e(n)) !== t) i[++s] = n;
        }
        return i;
    };
}();

function R(...t) {
    return Object.assign(u(), ...t);
}

const m = function() {
    const t = new WeakMap;
    let e = false;
    let r = "";
    let n = 0;
    return function(s) {
        e = t.get(s);
        if (void 0 === e) {
            r = s.toString();
            n = r.length;
            e = n >= 29 && n <= 100 && 125 === r.charCodeAt(n - 1) && r.charCodeAt(n - 2) <= 32 && 93 === r.charCodeAt(n - 3) && 101 === r.charCodeAt(n - 4) && 100 === r.charCodeAt(n - 5) && 111 === r.charCodeAt(n - 6) && 99 === r.charCodeAt(n - 7) && 32 === r.charCodeAt(n - 8) && 101 === r.charCodeAt(n - 9) && 118 === r.charCodeAt(n - 10) && 105 === r.charCodeAt(n - 11) && 116 === r.charCodeAt(n - 12) && 97 === r.charCodeAt(n - 13) && 110 === r.charCodeAt(n - 14) && 88 === r.charCodeAt(n - 15);
            t.set(s, e);
        }
        return e;
    };
}();

function y(t, e) {
    if (t instanceof Promise) return t.then(e);
    return e(t);
}

function b(...t) {
    let e;
    let r;
    let n;
    let s = 0;
    let i = t.length;
    for (;s < i; ++s) {
        e = t[s];
        if ((e = t[s]) instanceof Promise) if (void 0 === r) r = e; else if (void 0 === n) n = [ r, e ]; else n.push(e);
    }
    if (void 0 === n) return r;
    return Promise.all(n);
}

const $ = "au:annotation";

const C = (t, e) => {
    if (void 0 === e) return `${$}:${t}`;
    return `${$}:${t}:${e}`;
};

const E = (t, e) => {
    const n = r($, t);
    if (void 0 === n) s($, [ e ], t); else n.push(e);
};

const A = Object.freeze({
    name: "au:annotation",
    appendTo: E,
    set(t, e, r) {
        s(C(e), r, t);
    },
    get: (t, e) => r(C(e), t),
    getKeys(t) {
        let e = r($, t);
        if (void 0 === e) s($, e = [], t);
        return e;
    },
    isKey: t => t.startsWith($),
    keyFor: C
});

const j = "au:resource";

const I = Object.freeze({
    name: j,
    appendTo(t, e) {
        const n = r(j, t);
        if (void 0 === n) s(j, [ e ], t); else n.push(e);
    },
    has: t => n(j, t),
    getAll(t) {
        const e = r(j, t);
        if (void 0 === e) return Mt; else return e.map((e => r(e, t)));
    },
    getKeys(t) {
        let e = r(j, t);
        if (void 0 === e) s(j, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(j),
    keyFor(t, e) {
        if (void 0 === e) return `${j}:${t}`;
        return `${j}:${t}:${e}`;
    }
});

const O = {
    annotation: A,
    resource: I
};

const M = Object.prototype.hasOwnProperty;

function k(t, e, n, s) {
    let i = r(C(t), n);
    if (void 0 === i) {
        i = e[t];
        if (void 0 === i) {
            i = n[t];
            if (void 0 === i || !M.call(n, t)) return s();
            return i;
        }
        return i;
    }
    return i;
}

function F(t, e, n) {
    let s = r(C(t), e);
    if (void 0 === s) {
        s = e[t];
        if (void 0 === s || !M.call(e, t)) return n();
        return s;
    }
    return s;
}

function L(t, e, r) {
    const n = e[t];
    if (void 0 === n) return r();
    return n;
}

t.applyMetadataPolyfill(Reflect, false, false);

class ResolverBuilder {
    constructor(t, e) {
        this.c = t;
        this.k = e;
    }
    instance(t) {
        return this.t(0, t);
    }
    singleton(t) {
        return this.t(1, t);
    }
    transient(t) {
        return this.t(2, t);
    }
    callback(t) {
        return this.t(3, t);
    }
    cachedCallback(t) {
        return this.t(3, Ct(t));
    }
    aliasTo(t) {
        return this.t(5, t);
    }
    t(t, e) {
        const {c: r, k: n} = this;
        this.c = this.k = void 0;
        return r.registerResolver(n, new Resolver(n, t, e));
    }
}

function U(t) {
    const e = t.slice();
    const r = Object.keys(t);
    const n = r.length;
    let s;
    for (let i = 0; i < n; ++i) {
        s = r[i];
        if (!c(s)) e[s] = t[s];
    }
    return e;
}

const T = {
    none(t) {
        throw P(t);
    },
    singleton(t) {
        return new Resolver(t, 1, t);
    },
    transient(t) {
        return new Resolver(t, 2, t);
    }
};

const P = t => new Error(`AUR0002:${e(t)}`);

class ContainerConfiguration {
    constructor(t, e) {
        this.inheritParentResources = t;
        this.defaultResolver = e;
    }
    static from(t) {
        if (void 0 === t || t === ContainerConfiguration.DEFAULT) return ContainerConfiguration.DEFAULT;
        return new ContainerConfiguration(t.inheritParentResources ?? false, t.defaultResolver ?? T.singleton);
    }
}

ContainerConfiguration.DEFAULT = ContainerConfiguration.from({});

const D = {
    createContainer(t) {
        return new Container(null, ContainerConfiguration.from(t));
    },
    getDesignParamtypes(t) {
        return r("design:paramtypes", t);
    },
    getAnnotationParamtypes(t) {
        const e = C("di:paramtypes");
        return r(e, t);
    },
    getOrCreateAnnotationParamTypes: N,
    getDependencies: S,
    createInterface(t, e) {
        const r = i(t) ? t : e;
        const n = o(t) ? t : void 0;
        const s = function(t, e, r) {
            if (null == t || void 0 !== new.target) throw new Error(`AUR0001:${s.friendlyName}`);
            const n = N(t);
            n[r] = s;
        };
        s.$isInterface = true;
        s.friendlyName = null == n ? "(anonymous)" : n;
        if (null != r) s.register = (t, e) => r(new ResolverBuilder(t, e ?? s));
        s.toString = () => `InterfaceSymbol<${s.friendlyName}>`;
        return s;
    },
    inject(...t) {
        return function(e, r, n) {
            if ("number" === typeof n) {
                const r = N(e);
                const s = t[0];
                if (void 0 !== s) r[n] = s;
            } else if (r) {
                const n = N(e.constructor);
                const s = t[0];
                if (void 0 !== s) n[r] = s;
            } else if (n) {
                const e = n.value;
                const r = N(e);
                let s;
                let i = 0;
                for (;i < t.length; ++i) {
                    s = t[i];
                    if (void 0 !== s) r[i] = s;
                }
            } else {
                const r = N(e);
                let n;
                let s = 0;
                for (;s < t.length; ++s) {
                    n = t[s];
                    if (void 0 !== n) r[s] = n;
                }
            }
        };
    },
    transient(t) {
        t.register = function(e) {
            const r = Et.transient(t, t);
            return r.register(e, t);
        };
        t.registerInRequestor = false;
        return t;
    },
    singleton(t, e = K) {
        t.register = function(e) {
            const r = Et.singleton(t, t);
            return r.register(e, t);
        };
        t.registerInRequestor = e.scoped;
        return t;
    }
};

function S(t) {
    const e = C("di:dependencies");
    let n = r(e, t);
    if (void 0 === n) {
        const r = t.inject;
        if (void 0 === r) {
            const e = D.getDesignParamtypes(t);
            const r = D.getAnnotationParamtypes(t);
            if (void 0 === e) if (void 0 === r) {
                const e = Object.getPrototypeOf(t);
                if (i(e) && e !== Function.prototype) n = U(S(e)); else n = [];
            } else n = U(r); else if (void 0 === r) n = U(e); else {
                n = U(e);
                let t = r.length;
                let s;
                let i = 0;
                for (;i < t; ++i) {
                    s = r[i];
                    if (void 0 !== s) n[i] = s;
                }
                const o = Object.keys(r);
                let u;
                i = 0;
                t = o.length;
                for (i = 0; i < t; ++i) {
                    u = o[i];
                    if (!c(u)) n[u] = r[u];
                }
            }
        } else n = U(r);
        s(e, n, t);
        E(t, e);
    }
    return n;
}

function N(t) {
    const e = C("di:paramtypes");
    let n = r(e, t);
    if (void 0 === n) {
        s(e, n = [], t);
        E(t, e);
    }
    return n;
}

const W = D.createInterface("IContainer");

const B = W;

function _(t) {
    return function(e) {
        const r = function(t, e, n) {
            D.inject(r)(t, e, n);
        };
        r.$isResolver = true;
        r.resolve = function(r, n) {
            return t(e, r, n);
        };
        return r;
    };
}

const z = D.inject;

function Q(t) {
    return D.transient(t);
}

function G(t) {
    return null == t ? Q : Q(t);
}

const K = {
    scoped: false
};

function H(t) {
    if (i(t)) return D.singleton(t);
    return function(e) {
        return D.singleton(e, t);
    };
}

function q(t) {
    return function(e, r) {
        r = !!r;
        const n = function(t, e, r) {
            D.inject(n)(t, e, r);
        };
        n.$isResolver = true;
        n.resolve = function(n, s) {
            return t(e, n, s, r);
        };
        return n;
    };
}

const V = q(((t, e, r, n) => r.getAll(t, n)));

const J = _(((t, e, r) => () => r.get(t)));

const X = _(((t, e, r) => {
    if (r.has(t, true)) return r.get(t); else return;
}));

function Y(t, e, r) {
    D.inject(Y)(t, e, r);
}

Y.$isResolver = true;

Y.resolve = () => {};

const Z = _(((t, e, r) => (...n) => e.getFactory(t).construct(r, n)));

const tt = _(((t, r, n) => {
    const s = rt(t, r, n);
    const i = new InstanceProvider(e(t), s);
    n.registerResolver(t, i, true);
    return s;
}));

const et = _(((t, e, r) => rt(t, e, r)));

function rt(t, e, r) {
    return e.getFactory(t).construct(r);
}

class Resolver {
    constructor(t, e, r) {
        this.k = t;
        this.i = e;
        this._state = r;
        this.resolving = false;
    }
    get $isResolver() {
        return true;
    }
    register(t, e) {
        return t.registerResolver(e || this.k, this);
    }
    resolve(t, e) {
        switch (this.i) {
          case 0:
            return this._state;

          case 1:
            if (this.resolving) throw nt(this._state.name);
            this.resolving = true;
            this._state = t.getFactory(this._state).construct(e);
            this.i = 0;
            this.resolving = false;
            return this._state;

          case 2:
            {
                const r = t.getFactory(this._state);
                if (null === r) throw st(this.k);
                return r.construct(e);
            }

          case 3:
            return this._state(t, e, this);

          case 4:
            return this._state[0].resolve(t, e);

          case 5:
            return e.get(this._state);

          default:
            throw it(this.i);
        }
    }
    getFactory(t) {
        switch (this.i) {
          case 1:
          case 2:
            return t.getFactory(this._state);

          case 5:
            return t.getResolver(this._state)?.getFactory?.(t) ?? null;

          default:
            return null;
        }
    }
}

const nt = t => new Error(`AUR0003:${t}`);

const st = t => new Error(`AUR0004:${e(t)}`);

const it = t => new Error(`AUR0005:${t}`);

function ot(t) {
    return this.get(t);
}

function ut(t, e) {
    return e(t);
}

class Factory {
    constructor(t, e) {
        this.Type = t;
        this.dependencies = e;
        this.transformers = null;
    }
    construct(t, e) {
        let r;
        if (void 0 === e) r = new this.Type(...this.dependencies.map(ot, t)); else r = new this.Type(...this.dependencies.map(ot, t), ...e);
        if (null == this.transformers) return r;
        return this.transformers.reduce(ut, r);
    }
    registerTransformer(t) {
        (this.transformers ?? (this.transformers = [])).push(t);
    }
}

const lt = {
    $isResolver: true,
    resolve(t, e) {
        return e;
    }
};

function ct(t) {
    return i(t.register);
}

function ft(t) {
    return ct(t) && "boolean" === typeof t.registerInRequestor;
}

function at(t) {
    return ft(t) && t.registerInRequestor;
}

function ht(t) {
    return void 0 !== t.prototype;
}

function dt(t) {
    return o(t) && t.indexOf(":") > 0;
}

const pt = new Set([ "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Number", "Object", "Promise", "RangeError", "ReferenceError", "RegExp", "Set", "SharedArrayBuffer", "String", "SyntaxError", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URIError", "WeakMap", "WeakSet" ]);

let vt = 0;

class Container {
    constructor(t, e) {
        this.parent = t;
        this.config = e;
        this.id = ++vt;
        this.u = 0;
        this.h = new Map;
        if (null === t) {
            this.root = this;
            this.R = new Map;
            this.$ = new Map;
            this.res = u();
        } else {
            this.root = t.root;
            this.R = new Map;
            this.$ = t.$;
            if (e.inheritParentResources) this.res = Object.assign(u(), t.res, this.root.res); else this.res = u();
        }
        this.R.set(W, lt);
    }
    get depth() {
        return null === this.parent ? 0 : this.parent.depth + 1;
    }
    register(...e) {
        if (100 === ++this.u) throw wt(e);
        let r;
        let n;
        let s;
        let i;
        let o;
        let u = 0;
        let l = e.length;
        for (;u < l; ++u) {
            r = e[u];
            if (!t.isObject(r)) continue;
            if (ct(r)) r.register(this); else if (O.resource.has(r)) {
                const t = O.resource.getAll(r);
                if (1 === t.length) t[0].register(this); else {
                    i = 0;
                    o = t.length;
                    while (o > i) {
                        t[i].register(this);
                        ++i;
                    }
                }
            } else if (ht(r)) Et.singleton(r, r).register(this); else {
                n = Object.keys(r);
                i = 0;
                o = n.length;
                for (;i < o; ++i) {
                    s = r[n[i]];
                    if (!t.isObject(s)) continue;
                    if (ct(s)) s.register(this); else this.register(s);
                }
            }
        }
        --this.u;
        return this;
    }
    registerResolver(t, e, r = false) {
        At(t);
        const n = this.R;
        const s = n.get(t);
        if (null == s) {
            n.set(t, e);
            if (dt(t)) {
                if (void 0 !== this.res[t]) throw gt(t);
                this.res[t] = e;
            }
        } else if (s instanceof Resolver && 4 === s.i) s._state.push(e); else n.set(t, new Resolver(t, 4, [ s, e ]));
        if (r) this.h.set(t, e);
        return e;
    }
    registerTransformer(t, e) {
        const r = this.getResolver(t);
        if (null == r) return false;
        if (r.getFactory) {
            const t = r.getFactory(this);
            if (null == t) return false;
            t.registerTransformer(e);
            return true;
        }
        return false;
    }
    getResolver(t, e = true) {
        At(t);
        if (void 0 !== t.resolve) return t;
        let r = this;
        let n;
        let s;
        while (null != r) {
            n = r.R.get(t);
            if (null == n) {
                if (null == r.parent) {
                    s = at(t) ? this : r;
                    return e ? this.C(t, s) : null;
                }
                r = r.parent;
            } else return n;
        }
        return null;
    }
    has(t, e = false) {
        return this.R.has(t) ? true : e && null != this.parent ? this.parent.has(t, true) : false;
    }
    get(t) {
        At(t);
        if (t.$isResolver) return t.resolve(this, this);
        let e = this;
        let r;
        let n;
        while (null != e) {
            r = e.R.get(t);
            if (null == r) {
                if (null == e.parent) {
                    n = at(t) ? this : e;
                    r = this.C(t, n);
                    return r.resolve(e, this);
                }
                e = e.parent;
            } else return r.resolve(e, this);
        }
        throw xt(t);
    }
    getAll(t, e = false) {
        At(t);
        const r = this;
        let n = r;
        let s;
        if (e) {
            let e = Mt;
            while (null != n) {
                s = n.R.get(t);
                if (null != s) e = e.concat(jt(s, n, r));
                n = n.parent;
            }
            return e;
        } else while (null != n) {
            s = n.R.get(t);
            if (null == s) {
                n = n.parent;
                if (null == n) return Mt;
            } else return jt(s, n, r);
        }
        return Mt;
    }
    invoke(t, e) {
        if (m(t)) throw Ot(t);
        if (void 0 === e) return new t(...S(t).map(ot, this)); else return new t(...S(t).map(ot, this), ...e);
    }
    getFactory(t) {
        let e = this.$.get(t);
        if (void 0 === e) {
            if (m(t)) throw Ot(t);
            this.$.set(t, e = new Factory(t, S(t)));
        }
        return e;
    }
    registerFactory(t, e) {
        this.$.set(t, e);
    }
    createChild(t) {
        if (void 0 === t && this.config.inheritParentResources) {
            if (this.config === ContainerConfiguration.DEFAULT) return new Container(this, this.config);
            return new Container(this, ContainerConfiguration.from({
                ...this.config,
                inheritParentResources: false
            }));
        }
        return new Container(this, ContainerConfiguration.from(t ?? this.config));
    }
    disposeResolvers() {
        const t = this.R;
        const e = this.h;
        let r;
        let n;
        for ([n, r] of e.entries()) {
            r.dispose();
            t.delete(n);
        }
        e.clear();
    }
    find(t, e) {
        const n = t.keyFrom(e);
        let s = this.res[n];
        if (void 0 === s) {
            s = this.root.res[n];
            if (void 0 === s) return null;
        }
        if (null === s) return null;
        if (i(s.getFactory)) {
            const e = s.getFactory(this);
            if (null === e || void 0 === e) return null;
            const n = r(t.name, e.Type);
            if (void 0 === n) return null;
            return n;
        }
        return null;
    }
    create(t, e) {
        const r = t.keyFrom(e);
        let n = this.res[r];
        if (void 0 === n) {
            n = this.root.res[r];
            if (void 0 === n) return null;
            return n.resolve(this.root, this) ?? null;
        }
        return n.resolve(this, this) ?? null;
    }
    dispose() {
        if (this.h.size > 0) this.disposeResolvers();
        this.R.clear();
    }
    C(t, e) {
        if (!i(t)) throw Rt(t);
        if (pt.has(t.name)) throw mt(t);
        if (ct(t)) {
            const r = t.register(e, t);
            if (!(r instanceof Object) || null == r.resolve) {
                const r = e.R.get(t);
                if (null != r) return r;
                throw yt();
            }
            return r;
        } else if (O.resource.has(t)) {
            const r = O.resource.getAll(t);
            if (1 === r.length) r[0].register(e); else {
                const t = r.length;
                for (let n = 0; n < t; ++n) r[n].register(e);
            }
            const n = e.R.get(t);
            if (null != n) return n;
            throw yt();
        } else if (t.$isInterface) throw bt(t.friendlyName); else {
            const r = this.config.defaultResolver(t, e);
            e.R.set(t, r);
            return r;
        }
    }
}

const wt = t => new Error(`AUR0006:${t.map(e)}`);

const gt = t => new Error(`AUR0007:${e(t)}`);

const xt = t => new Error(`AUR0008:${e(t)}`);

const Rt = t => new Error(`AUR0009:${e(t)}`);

const mt = t => new Error(`AUR0010:${t.name}`);

const yt = () => new Error(`AUR0011`);

const bt = t => new Error(`AUR0012:${t}`);

class ParameterizedRegistry {
    constructor(t, e) {
        this.key = t;
        this.params = e;
    }
    register(t) {
        if (t.has(this.key, true)) {
            const e = t.get(this.key);
            e.register(t, ...this.params);
        } else t.register(...this.params.filter((t => "object" === typeof t)));
    }
}

const $t = new WeakMap;

function Ct(t) {
    return function(e, r, n) {
        let s = $t.get(e);
        if (void 0 === s) $t.set(e, s = new WeakMap);
        if (s.has(n)) return s.get(n);
        const i = t(e, r, n);
        s.set(n, i);
        return i;
    };
}

const Et = {
    instance(t, e) {
        return new Resolver(t, 0, e);
    },
    singleton(t, e) {
        return new Resolver(t, 1, e);
    },
    transient(t, e) {
        return new Resolver(t, 2, e);
    },
    callback(t, e) {
        return new Resolver(t, 3, e);
    },
    cachedCallback(t, e) {
        return new Resolver(t, 3, Ct(e));
    },
    aliasTo(t, e) {
        return new Resolver(e, 5, t);
    },
    defer(t, ...e) {
        return new ParameterizedRegistry(t, e);
    }
};

class InstanceProvider {
    constructor(t, e) {
        this.A = null;
        this.j = t;
        if (void 0 !== e) this.A = e;
    }
    get friendlyName() {
        return this.j;
    }
    prepare(t) {
        this.A = t;
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        if (null == this.A) throw It(this.j);
        return this.A;
    }
    dispose() {
        this.A = null;
    }
}

function At(t) {
    if (null === t || void 0 === t) throw new Error(`AUR0014`);
}

function jt(t, e, r) {
    if (t instanceof Resolver && 4 === t.i) {
        const n = t._state;
        let s = n.length;
        const i = new Array(s);
        while (s--) i[s] = n[s].resolve(e, r);
        return i;
    }
    return [ t.resolve(e, r) ];
}

function It(t) {
    return new Error(`AUR0013:${t}`);
}

function Ot(t) {
    return new Error(`AUR0015:${t.name}`);
}

const Mt = Object.freeze([]);

const kt = Object.freeze({});

function Ft() {}

const Lt = D.createInterface("IPlatform");

function Ut(t, e, r, n) {
    var s = arguments.length, i = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) i = Reflect.decorate(t, e, r, n); else for (var u = t.length - 1; u >= 0; u--) if (o = t[u]) i = (s < 3 ? o(i) : s > 3 ? o(e, r, i) : o(e, r)) || i;
    return s > 3 && i && Object.defineProperty(e, r, i), i;
}

function Tt(t, e) {
    return function(r, n) {
        e(r, n, t);
    };
}

exports.LogLevel = void 0;

(function(t) {
    t[t["trace"] = 0] = "trace";
    t[t["debug"] = 1] = "debug";
    t[t["info"] = 2] = "info";
    t[t["warn"] = 3] = "warn";
    t[t["error"] = 4] = "error";
    t[t["fatal"] = 5] = "fatal";
    t[t["none"] = 6] = "none";
})(exports.LogLevel || (exports.LogLevel = {}));

exports.ColorOptions = void 0;

(function(t) {
    t[t["noColors"] = 0] = "noColors";
    t[t["colors"] = 1] = "colors";
})(exports.ColorOptions || (exports.ColorOptions = {}));

const Pt = D.createInterface("ILogConfig", (t => t.instance(new LogConfig(0, 3))));

const Dt = D.createInterface("ISink");

const St = D.createInterface("ILogEventFactory", (t => t.singleton(exports.DefaultLogEventFactory)));

const Nt = D.createInterface("ILogger", (t => t.singleton(exports.DefaultLogger)));

const Wt = D.createInterface("ILogScope");

const Bt = Object.freeze({
    key: C("logger-sink-handles"),
    define(t, e) {
        s(this.key, e.handles, t.prototype);
        return t;
    },
    getHandles(e) {
        return t.Metadata.get(this.key, e);
    }
});

function _t(t) {
    return function(e) {
        return Bt.define(e, t);
    };
}

const zt = R({
    red(t) {
        return `[31m${t}[39m`;
    },
    green(t) {
        return `[32m${t}[39m`;
    },
    yellow(t) {
        return `[33m${t}[39m`;
    },
    blue(t) {
        return `[34m${t}[39m`;
    },
    magenta(t) {
        return `[35m${t}[39m`;
    },
    cyan(t) {
        return `[36m${t}[39m`;
    },
    white(t) {
        return `[37m${t}[39m`;
    },
    grey(t) {
        return `[90m${t}[39m`;
    }
});

class LogConfig {
    constructor(t, e) {
        this.colorOptions = t;
        this.level = e;
    }
}

const Qt = function() {
    const t = [ R({
        TRC: "TRC",
        DBG: "DBG",
        INF: "INF",
        WRN: "WRN",
        ERR: "ERR",
        FTL: "FTL",
        QQQ: "???"
    }), R({
        TRC: zt.grey("TRC"),
        DBG: zt.grey("DBG"),
        INF: zt.white("INF"),
        WRN: zt.yellow("WRN"),
        ERR: zt.red("ERR"),
        FTL: zt.red("FTL"),
        QQQ: zt.grey("???")
    }) ];
    return function(e, r) {
        if (e <= 0) return t[r].TRC;
        if (e <= 1) return t[r].DBG;
        if (e <= 2) return t[r].INF;
        if (e <= 3) return t[r].WRN;
        if (e <= 4) return t[r].ERR;
        if (e <= 5) return t[r].FTL;
        return t[r].QQQ;
    };
}();

function Gt(t, e) {
    if (0 === e) return t.join(".");
    return t.map(zt.cyan).join(".");
}

function Kt(t, e) {
    if (0 === e) return new Date(t).toISOString();
    return zt.grey(new Date(t).toISOString());
}

class DefaultLogEvent {
    constructor(t, e, r, n, s, i) {
        this.severity = t;
        this.message = e;
        this.optionalParams = r;
        this.scope = n;
        this.colorOptions = s;
        this.timestamp = i;
    }
    toString() {
        const {severity: t, message: e, scope: r, colorOptions: n, timestamp: s} = this;
        if (0 === r.length) return `${Kt(s, n)} [${Qt(t, n)}] ${e}`;
        return `${Kt(s, n)} [${Qt(t, n)} ${Gt(r, n)}] ${e}`;
    }
}

exports.DefaultLogEventFactory = class DefaultLogEventFactory {
    constructor(t) {
        this.config = t;
    }
    createLogEvent(t, e, r, n) {
        return new DefaultLogEvent(e, r, n, t.scope, this.config.colorOptions, Date.now());
    }
};

exports.DefaultLogEventFactory = Ut([ Tt(0, Pt) ], exports.DefaultLogEventFactory);

exports.ConsoleSink = class ConsoleSink {
    constructor(t) {
        const e = t.console;
        this.handleEvent = function t(r) {
            const n = r.optionalParams;
            if (void 0 === n || 0 === n.length) {
                const t = r.toString();
                switch (r.severity) {
                  case 0:
                  case 1:
                    return e.debug(t);

                  case 2:
                    return e.info(t);

                  case 3:
                    return e.warn(t);

                  case 4:
                  case 5:
                    return e.error(t);
                }
            } else {
                let t = r.toString();
                let s = 0;
                while (t.includes("%s")) t = t.replace("%s", String(n[s++]));
                switch (r.severity) {
                  case 0:
                  case 1:
                    return e.debug(t, ...n.slice(s));

                  case 2:
                    return e.info(t, ...n.slice(s));

                  case 3:
                    return e.warn(t, ...n.slice(s));

                  case 4:
                  case 5:
                    return e.error(t, ...n.slice(s));
                }
            }
        };
    }
    static register(t) {
        Et.singleton(Dt, ConsoleSink).register(t);
    }
};

exports.ConsoleSink = Ut([ Tt(0, Lt) ], exports.ConsoleSink);

exports.DefaultLogger = class DefaultLogger {
    constructor(t, e, r, n = [], s = null) {
        this.config = t;
        this.factory = e;
        this.scope = n;
        this.scopedLoggers = u();
        let i;
        let o;
        let l;
        let c;
        let f;
        let a;
        if (null === s) {
            this.root = this;
            this.parent = this;
            i = this.traceSinks = [];
            o = this.debugSinks = [];
            l = this.infoSinks = [];
            c = this.warnSinks = [];
            f = this.errorSinks = [];
            a = this.fatalSinks = [];
            for (const t of r) {
                const e = Bt.getHandles(t);
                if (e?.includes(0) ?? true) i.push(t);
                if (e?.includes(1) ?? true) o.push(t);
                if (e?.includes(2) ?? true) l.push(t);
                if (e?.includes(3) ?? true) c.push(t);
                if (e?.includes(4) ?? true) f.push(t);
                if (e?.includes(5) ?? true) a.push(t);
            }
        } else {
            this.root = s.root;
            this.parent = s;
            i = this.traceSinks = s.traceSinks;
            o = this.debugSinks = s.debugSinks;
            l = this.infoSinks = s.infoSinks;
            c = this.warnSinks = s.warnSinks;
            f = this.errorSinks = s.errorSinks;
            a = this.fatalSinks = s.fatalSinks;
        }
    }
    trace(t, ...e) {
        if (this.config.level <= 0) this.emit(this.traceSinks, 0, t, e);
    }
    debug(t, ...e) {
        if (this.config.level <= 1) this.emit(this.debugSinks, 1, t, e);
    }
    info(t, ...e) {
        if (this.config.level <= 2) this.emit(this.infoSinks, 2, t, e);
    }
    warn(t, ...e) {
        if (this.config.level <= 3) this.emit(this.warnSinks, 3, t, e);
    }
    error(t, ...e) {
        if (this.config.level <= 4) this.emit(this.errorSinks, 4, t, e);
    }
    fatal(t, ...e) {
        if (this.config.level <= 5) this.emit(this.fatalSinks, 5, t, e);
    }
    scopeTo(t) {
        const e = this.scopedLoggers;
        let r = e[t];
        if (void 0 === r) r = e[t] = new DefaultLogger(this.config, this.factory, void 0, this.scope.concat(t), this);
        return r;
    }
    emit(t, e, r, n) {
        const s = i(r) ? r() : r;
        const o = this.factory.createLogEvent(this, e, s, n);
        for (let e = 0, r = t.length; e < r; ++e) t[e].handleEvent(o);
    }
};

Ut([ v ], exports.DefaultLogger.prototype, "trace", null);

Ut([ v ], exports.DefaultLogger.prototype, "debug", null);

Ut([ v ], exports.DefaultLogger.prototype, "info", null);

Ut([ v ], exports.DefaultLogger.prototype, "warn", null);

Ut([ v ], exports.DefaultLogger.prototype, "error", null);

Ut([ v ], exports.DefaultLogger.prototype, "fatal", null);

exports.DefaultLogger = Ut([ Tt(0, Pt), Tt(1, St), Tt(2, V(Dt)), Tt(3, X(Wt)), Tt(4, Y) ], exports.DefaultLogger);

const Ht = R({
    create({level: t = 3, colorOptions: e = 0, sinks: r = []} = {}) {
        return R({
            register(n) {
                n.register(Et.instance(Pt, new LogConfig(e, t)));
                for (const t of r) if (i(t)) n.register(Et.singleton(Dt, t)); else n.register(t);
                return n;
            }
        });
    }
});

const qt = D.createInterface((t => t.singleton(ModuleLoader)));

function Vt(t) {
    return t;
}

class ModuleTransformer {
    constructor(t) {
        this.$transform = t;
        this.I = new Map;
        this.O = new Map;
    }
    transform(t) {
        if (t instanceof Promise) return this.M(t); else if ("object" === typeof t && null !== t) return this.F(t); else throw new Error(`Invalid input: ${String(t)}. Expected Promise or Object.`);
    }
    M(t) {
        if (this.I.has(t)) return this.I.get(t);
        const e = t.then((t => this.F(t)));
        this.I.set(t, e);
        void e.then((e => {
            this.I.set(t, e);
        }));
        return e;
    }
    F(t) {
        if (this.O.has(t)) return this.O.get(t);
        const e = this.$transform(this.L(t));
        this.O.set(t, e);
        if (e instanceof Promise) void e.then((e => {
            this.O.set(t, e);
        }));
        return e;
    }
    L(t) {
        if (null == t) throw new Error(`Invalid input: ${String(t)}. Expected Object.`);
        if ("object" !== typeof t) return new AnalyzedModule(t, []);
        let e;
        let r;
        let n;
        let s;
        const o = [];
        for (const u in t) {
            switch (typeof (e = t[u])) {
              case "object":
                if (null === e) continue;
                r = i(e.register);
                n = false;
                s = Mt;
                break;

              case "function":
                r = i(e.register);
                n = void 0 !== e.prototype;
                s = O.resource.getAll(e);
                break;

              default:
                continue;
            }
            o.push(new ModuleItem(u, e, r, n, s));
        }
        return new AnalyzedModule(t, o);
    }
}

class ModuleLoader {
    constructor() {
        this.transformers = new Map;
    }
    load(t, e = Vt) {
        const r = this.transformers;
        let n = r.get(e);
        if (void 0 === n) r.set(e, n = new ModuleTransformer(e));
        return n.transform(t);
    }
    dispose() {
        this.transformers.clear();
    }
}

class AnalyzedModule {
    constructor(t, e) {
        this.raw = t;
        this.items = e;
    }
}

class ModuleItem {
    constructor(t, e, r, n, s) {
        this.key = t;
        this.value = e;
        this.isRegistry = r;
        this.isConstructable = n;
        this.definitions = s;
    }
}

class Handler {
    constructor(t, e) {
        this.messageType = t;
        this.callback = e;
    }
    handle(t) {
        if (t instanceof this.messageType) this.callback.call(null, t);
    }
}

const Jt = D.createInterface("IEventAggregator", (t => t.singleton(EventAggregator)));

class EventAggregator {
    constructor() {
        this.eventLookup = {};
        this.messageHandlers = [];
    }
    publish(t, e) {
        if (!t) throw new Error(`Invalid channel name or instance: ${t}.`);
        if (o(t)) {
            let r = this.eventLookup[t];
            if (void 0 !== r) {
                r = r.slice();
                let n = r.length;
                while (n-- > 0) r[n](e, t);
            }
        } else {
            const e = this.messageHandlers.slice();
            let r = e.length;
            while (r-- > 0) e[r].handle(t);
        }
    }
    subscribe(t, e) {
        if (!t) throw new Error(`Invalid channel name or type: ${t}.`);
        let r;
        let n;
        if (o(t)) {
            if (void 0 === this.eventLookup[t]) this.eventLookup[t] = [];
            r = e;
            n = this.eventLookup[t];
        } else {
            r = new Handler(t, e);
            n = this.messageHandlers;
        }
        n.push(r);
        return {
            dispose() {
                const t = n.indexOf(r);
                if (-1 !== t) n.splice(t, 1);
            }
        };
    }
    subscribeOnce(t, e) {
        const r = this.subscribe(t, (function(t, n) {
            r.dispose();
            e(t, n);
        }));
        return r;
    }
}

exports.AnalyzedModule = AnalyzedModule;

exports.ContainerConfiguration = ContainerConfiguration;

exports.DI = D;

exports.DefaultLogEvent = DefaultLogEvent;

exports.DefaultResolver = T;

exports.EventAggregator = EventAggregator;

exports.IContainer = W;

exports.IEventAggregator = Jt;

exports.ILogConfig = Pt;

exports.ILogEventFactory = St;

exports.ILogger = Nt;

exports.IModuleLoader = qt;

exports.IPlatform = Lt;

exports.IServiceLocator = B;

exports.ISink = Dt;

exports.InstanceProvider = InstanceProvider;

exports.LogConfig = LogConfig;

exports.LoggerConfiguration = Ht;

exports.ModuleItem = ModuleItem;

exports.Protocol = O;

exports.Registration = Et;

exports.all = V;

exports.bound = v;

exports.camelCase = a;

exports.emptyArray = Mt;

exports.emptyObject = kt;

exports.factory = Z;

exports.firstDefined = g;

exports.format = zt;

exports.fromAnnotationOrDefinitionOrTypeOrDefault = k;

exports.fromAnnotationOrTypeOrDefault = F;

exports.fromDefinitionOrDefault = L;

exports.getPrototypeChain = x;

exports.ignore = Y;

exports.inject = z;

exports.isArrayIndex = c;

exports.isNativeFunction = m;

exports.kebabCase = d;

exports.lazy = J;

exports.mergeArrays = w;

exports.newInstanceForScope = tt;

exports.newInstanceOf = et;

exports.noop = Ft;

exports.onResolve = y;

exports.optional = X;

exports.pascalCase = h;

exports.resolveAll = b;

exports.singleton = H;

exports.sink = _t;

exports.toArray = p;

exports.transient = G;
//# sourceMappingURL=index.cjs.map
