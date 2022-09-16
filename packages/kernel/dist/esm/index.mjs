import { Metadata as t, applyMetadataPolyfill as e, isObject as n } from "@aurelia/metadata";

const r = t.getOwn;

const i = t.hasOwn;

const s = t.define;

const o = t => "function" === typeof t;

const u = t => "string" === typeof t;

const l = () => Object.create(null);

const c = {};

function f(t) {
    switch (typeof t) {
      case "number":
        return t >= 0 && (0 | t) === t;

      case "string":
        {
            const e = c[t];
            if (void 0 !== e) return e;
            const n = t.length;
            if (0 === n) return c[t] = false;
            let r = 0;
            let i = 0;
            for (;i < n; ++i) {
                r = t.charCodeAt(i);
                if (0 === i && 48 === r && n > 1 || r < 48 || r > 57) return c[t] = false;
            }
            return c[t] = true;
        }

      default:
        return false;
    }
}

function a(t) {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
}

function h(t) {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
}

const d = function() {
    let t;
    (function(t) {
        t[t["none"] = 0] = "none";
        t[t["digit"] = 1] = "digit";
        t[t["upper"] = 2] = "upper";
        t[t["lower"] = 3] = "lower";
    })(t || (t = {}));
    const e = Object.assign(l(), {
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
    function n(t) {
        if ("" === t) return 0;
        if (t !== t.toUpperCase()) return 3;
        if (t !== t.toLowerCase()) return 2;
        if (true === e[t]) return 1;
        return 0;
    }
    return function(t, e) {
        const r = t.length;
        if (0 === r) return t;
        let i = false;
        let s = "";
        let o;
        let u = "";
        let l = 0;
        let c = t.charAt(0);
        let f = n(c);
        let a = 0;
        for (;a < r; ++a) {
            o = l;
            u = c;
            l = f;
            c = t.charAt(a + 1);
            f = n(c);
            if (0 === l) {
                if (s.length > 0) i = true;
            } else {
                if (!i && s.length > 0 && 2 === l) i = 3 === o || 3 === f;
                s += e(u, i);
                i = false;
            }
        }
        return s;
    };
}();

const v = function() {
    const t = l();
    function e(t, e) {
        return e ? t.toUpperCase() : t.toLowerCase();
    }
    return function(n) {
        let r = t[n];
        if (void 0 === r) r = t[n] = d(n, e);
        return r;
    };
}();

const w = function() {
    const t = l();
    return function(e) {
        let n = t[e];
        if (void 0 === n) {
            n = v(e);
            if (n.length > 0) n = n[0].toUpperCase() + n.slice(1);
            t[e] = n;
        }
        return n;
    };
}();

const g = function() {
    const t = l();
    function e(t, e) {
        return e ? `-${t.toLowerCase()}` : t.toLowerCase();
    }
    return function(n) {
        let r = t[n];
        if (void 0 === r) r = t[n] = d(n, e);
        return r;
    };
}();

function p(t) {
    const {length: e} = t;
    const n = Array(e);
    let r = 0;
    for (;r < e; ++r) n[r] = t[r];
    return n;
}

const R = {};

function m(t) {
    if (void 0 === R[t]) R[t] = 0;
    return ++R[t];
}

function y(t) {
    R[t] = 0;
}

function b(t, e, n) {
    if (void 0 === t || null === t || t === It) if (void 0 === e || null === e || e === It) return It; else return n ? e.slice(0) : e; else if (void 0 === e || null === e || e === It) return n ? t.slice(0) : t;
    const r = {};
    const i = n ? t.slice(0) : t;
    let s = t.length;
    let o = e.length;
    while (s-- > 0) r[t[s]] = true;
    let u;
    while (o-- > 0) {
        u = e[o];
        if (void 0 === r[u]) {
            i.push(u);
            r[u] = true;
        }
    }
    return i;
}

function $(t, e, n) {
    return {
        configurable: true,
        enumerable: n.enumerable,
        get() {
            const t = n.value.bind(this);
            Reflect.defineProperty(this, e, {
                value: t,
                writable: true,
                configurable: true,
                enumerable: n.enumerable
            });
            return t;
        }
    };
}

function C(...t) {
    const e = [];
    let n = 0;
    const r = t.length;
    let i = 0;
    let s;
    let o = 0;
    for (;o < r; ++o) {
        s = t[o];
        if (void 0 !== s) {
            i = s.length;
            let t = 0;
            for (;t < i; ++t) e[n++] = s[t];
        }
    }
    return e;
}

function E(...t) {
    const e = {};
    const n = t.length;
    let r;
    let i;
    let s = 0;
    for (;n > s; ++s) {
        r = t[s];
        if (void 0 !== r) for (i in r) e[i] = r[i];
    }
    return e;
}

function A(...t) {
    const e = t.length;
    let n;
    let r = 0;
    for (;e > r; ++r) {
        n = t[r];
        if (void 0 !== n) return n;
    }
    throw new Error(`No default value found`);
}

const j = function() {
    const t = Function.prototype;
    const e = Object.getPrototypeOf;
    const n = new WeakMap;
    let r = t;
    let i = 0;
    let s;
    return function(o) {
        s = n.get(o);
        if (void 0 === s) {
            n.set(o, s = [ r = o ]);
            i = 0;
            while ((r = e(r)) !== t) s[++i] = r;
        }
        return s;
    };
}();

function I(...t) {
    return Object.assign(l(), ...t);
}

const O = function() {
    const t = new WeakMap;
    let e = false;
    let n = "";
    let r = 0;
    return function(i) {
        e = t.get(i);
        if (void 0 === e) {
            n = i.toString();
            r = n.length;
            e = r >= 29 && r <= 100 && 125 === n.charCodeAt(r - 1) && n.charCodeAt(r - 2) <= 32 && 93 === n.charCodeAt(r - 3) && 101 === n.charCodeAt(r - 4) && 100 === n.charCodeAt(r - 5) && 111 === n.charCodeAt(r - 6) && 99 === n.charCodeAt(r - 7) && 32 === n.charCodeAt(r - 8) && 101 === n.charCodeAt(r - 9) && 118 === n.charCodeAt(r - 10) && 105 === n.charCodeAt(r - 11) && 116 === n.charCodeAt(r - 12) && 97 === n.charCodeAt(r - 13) && 110 === n.charCodeAt(r - 14) && 88 === n.charCodeAt(r - 15);
            t.set(i, e);
        }
        return e;
    };
}();

function M(t, e) {
    if (t instanceof Promise) return t.then(e);
    return e(t);
}

function k(...t) {
    let e;
    let n;
    let r;
    let i = 0;
    let s = t.length;
    for (;i < s; ++i) {
        e = t[i];
        if ((e = t[i]) instanceof Promise) if (void 0 === n) n = e; else if (void 0 === r) r = [ n, e ]; else r.push(e);
    }
    if (void 0 === r) return n;
    return Promise.all(r);
}

const F = "au:annotation";

const L = (t, e) => {
    if (void 0 === e) return `${F}:${t}`;
    return `${F}:${t}:${e}`;
};

const U = (t, e) => {
    const n = r(F, t);
    if (void 0 === n) s(F, [ e ], t); else n.push(e);
};

const S = Object.freeze({
    name: "au:annotation",
    appendTo: U,
    set(t, e, n) {
        s(L(e), n, t);
    },
    get: (t, e) => r(L(e), t),
    getKeys(t) {
        let e = r(F, t);
        if (void 0 === e) s(F, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(F),
    keyFor: L
});

const T = "au:resource";

const D = Object.freeze({
    name: T,
    appendTo(t, e) {
        const n = r(T, t);
        if (void 0 === n) s(T, [ e ], t); else n.push(e);
    },
    has: t => i(T, t),
    getAll(t) {
        const e = r(T, t);
        if (void 0 === e) return It; else return e.map((e => r(e, t)));
    },
    getKeys(t) {
        let e = r(T, t);
        if (void 0 === e) s(T, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(T),
    keyFor(t, e) {
        if (void 0 === e) return `${T}:${t}`;
        return `${T}:${t}:${e}`;
    }
});

const P = {
    annotation: S,
    resource: D
};

const N = Object.prototype.hasOwnProperty;

function W(t, e, n, i) {
    let s = r(L(t), n);
    if (void 0 === s) {
        s = e[t];
        if (void 0 === s) {
            s = n[t];
            if (void 0 === s || !N.call(n, t)) return i();
            return s;
        }
        return s;
    }
    return s;
}

function B(t, e, n) {
    let i = r(L(t), e);
    if (void 0 === i) {
        i = e[t];
        if (void 0 === i || !N.call(e, t)) return n();
        return i;
    }
    return i;
}

function z(t, e, n) {
    const r = e[t];
    if (void 0 === r) return n();
    return r;
}

e(Reflect, false, false);

class ResolverBuilder {
    constructor(t, e) {
        this.container = t;
        this.key = e;
    }
    instance(t) {
        return this.registerResolver(0, t);
    }
    singleton(t) {
        return this.registerResolver(1, t);
    }
    transient(t) {
        return this.registerResolver(2, t);
    }
    callback(t) {
        return this.registerResolver(3, t);
    }
    cachedCallback(t) {
        return this.registerResolver(3, $t(t));
    }
    aliasTo(t) {
        return this.registerResolver(5, t);
    }
    registerResolver(t, e) {
        const {container: n, key: r} = this;
        this.container = this.key = void 0;
        return n.registerResolver(r, new Resolver(r, t, e));
    }
}

function Q(t) {
    const e = t.slice();
    const n = Object.keys(t);
    const r = n.length;
    let i;
    for (let s = 0; s < r; ++s) {
        i = n[s];
        if (!f(i)) e[i] = t[i];
    }
    return e;
}

const x = {
    none(t) {
        throw Error(`AUR0002:${t.toString()}`);
    },
    singleton(t) {
        return new Resolver(t, 1, t);
    },
    transient(t) {
        return new Resolver(t, 2, t);
    }
};

class ContainerConfiguration {
    constructor(t, e) {
        this.inheritParentResources = t;
        this.defaultResolver = e;
    }
    static from(t) {
        if (void 0 === t || t === ContainerConfiguration.DEFAULT) return ContainerConfiguration.DEFAULT;
        return new ContainerConfiguration(t.inheritParentResources ?? false, t.defaultResolver ?? x.singleton);
    }
}

ContainerConfiguration.DEFAULT = ContainerConfiguration.from({});

const G = {
    createContainer(t) {
        return new Container(null, ContainerConfiguration.from(t));
    },
    getDesignParamtypes(t) {
        return r("design:paramtypes", t);
    },
    getAnnotationParamtypes(t) {
        const e = L("di:paramtypes");
        return r(e, t);
    },
    getOrCreateAnnotationParamTypes: _,
    getDependencies: K,
    createInterface(t, e) {
        const n = o(t) ? t : e;
        const r = u(t) ? t : void 0;
        const i = function(t, e, n) {
            if (null == t || void 0 !== new.target) throw new Error(`AUR0001:${i.friendlyName}`);
            const r = _(t);
            r[n] = i;
        };
        i.$isInterface = true;
        i.friendlyName = null == r ? "(anonymous)" : r;
        if (null != n) i.register = function(t, e) {
            return n(new ResolverBuilder(t, e ?? i));
        };
        i.toString = function t() {
            return `InterfaceSymbol<${i.friendlyName}>`;
        };
        return i;
    },
    inject(...t) {
        return function(e, n, r) {
            if ("number" === typeof r) {
                const n = _(e);
                const i = t[0];
                if (void 0 !== i) n[r] = i;
            } else if (n) {
                const r = _(e.constructor);
                const i = t[0];
                if (void 0 !== i) r[n] = i;
            } else if (r) {
                const e = r.value;
                const n = _(e);
                let i;
                for (let e = 0; e < t.length; ++e) {
                    i = t[e];
                    if (void 0 !== i) n[e] = i;
                }
            } else {
                const n = _(e);
                let r;
                for (let e = 0; e < t.length; ++e) {
                    r = t[e];
                    if (void 0 !== r) n[e] = r;
                }
            }
        };
    },
    transient(t) {
        t.register = function(e) {
            const n = Ct.transient(t, t);
            return n.register(e, t);
        };
        t.registerInRequestor = false;
        return t;
    },
    singleton(t, e = Z) {
        t.register = function(e) {
            const n = Ct.singleton(t, t);
            return n.register(e, t);
        };
        t.registerInRequestor = e.scoped;
        return t;
    }
};

function K(t) {
    const e = L("di:dependencies");
    let n = r(e, t);
    if (void 0 === n) {
        const r = t.inject;
        if (void 0 === r) {
            const e = G.getDesignParamtypes(t);
            const r = G.getAnnotationParamtypes(t);
            if (void 0 === e) if (void 0 === r) {
                const e = Object.getPrototypeOf(t);
                if (o(e) && e !== Function.prototype) n = Q(K(e)); else n = [];
            } else n = Q(r); else if (void 0 === r) n = Q(e); else {
                n = Q(e);
                let t = r.length;
                let i;
                let s = 0;
                for (;s < t; ++s) {
                    i = r[s];
                    if (void 0 !== i) n[s] = i;
                }
                const o = Object.keys(r);
                let u;
                s = 0;
                t = o.length;
                for (s = 0; s < t; ++s) {
                    u = o[s];
                    if (!f(u)) n[u] = r[u];
                }
            }
        } else n = Q(r);
        s(e, n, t);
        U(t, e);
    }
    return n;
}

function _(t) {
    const e = L("di:paramtypes");
    let n = r(e, t);
    if (void 0 === n) {
        s(e, n = [], t);
        U(t, e);
    }
    return n;
}

const H = G.createInterface("IContainer");

const V = H;

function q(t) {
    return function(e) {
        const n = function(t, e, r) {
            G.inject(n)(t, e, r);
        };
        n.$isResolver = true;
        n.resolve = function(n, r) {
            return t(e, n, r);
        };
        return n;
    };
}

const J = G.inject;

function X(t) {
    return G.transient(t);
}

function Y(t) {
    return null == t ? X : X(t);
}

const Z = {
    scoped: false
};

function tt(t) {
    if (o(t)) return G.singleton(t);
    return function(e) {
        return G.singleton(e, t);
    };
}

function et(t) {
    return function(e, n) {
        n = !!n;
        const r = function(t, e, n) {
            G.inject(r)(t, e, n);
        };
        r.$isResolver = true;
        r.resolve = function(r, i) {
            return t(e, r, i, n);
        };
        return r;
    };
}

const nt = et(((t, e, n, r) => n.getAll(t, r)));

const rt = q(((t, e, n) => () => n.get(t)));

const it = q(((t, e, n) => {
    if (n.has(t, true)) return n.get(t); else return;
}));

function st(t, e, n) {
    G.inject(st)(t, e, n);
}

st.$isResolver = true;

st.resolve = () => {};

const ot = q(((t, e, n) => (...r) => e.getFactory(t).construct(n, r)));

const ut = q(((t, e, n) => {
    const r = ct(t, e, n);
    const i = new InstanceProvider(String(t), r);
    n.registerResolver(t, i, true);
    return r;
}));

const lt = q(((t, e, n) => ct(t, e, n)));

function ct(t, e, n) {
    return e.getFactory(t).construct(n);
}

var ft;

(function(t) {
    t[t["instance"] = 0] = "instance";
    t[t["singleton"] = 1] = "singleton";
    t[t["transient"] = 2] = "transient";
    t[t["callback"] = 3] = "callback";
    t[t["array"] = 4] = "array";
    t[t["alias"] = 5] = "alias";
})(ft || (ft = {}));

class Resolver {
    constructor(t, e, n) {
        this.key = t;
        this.strategy = e;
        this.state = n;
        this.resolving = false;
    }
    get $isResolver() {
        return true;
    }
    register(t, e) {
        return t.registerResolver(e || this.key, this);
    }
    resolve(t, e) {
        switch (this.strategy) {
          case 0:
            return this.state;

          case 1:
            if (this.resolving) throw new Error(`AUR0003:${this.state.name}`);
            this.resolving = true;
            this.state = t.getFactory(this.state).construct(e);
            this.strategy = 0;
            this.resolving = false;
            return this.state;

          case 2:
            {
                const n = t.getFactory(this.state);
                if (null === n) throw new Error(`AUR0004:${String(this.key)}`);
                return n.construct(e);
            }

          case 3:
            return this.state(t, e, this);

          case 4:
            return this.state[0].resolve(t, e);

          case 5:
            return e.get(this.state);

          default:
            throw new Error(`AUR0005:${this.strategy}`);
        }
    }
    getFactory(t) {
        switch (this.strategy) {
          case 1:
          case 2:
            return t.getFactory(this.state);

          case 5:
            return t.getResolver(this.state)?.getFactory?.(t) ?? null;

          default:
            return null;
        }
    }
}

function at(t) {
    return this.get(t);
}

function ht(t, e) {
    return e(t);
}

class Factory {
    constructor(t, e) {
        this.Type = t;
        this.dependencies = e;
        this.transformers = null;
    }
    construct(t, e) {
        let n;
        if (void 0 === e) n = new this.Type(...this.dependencies.map(at, t)); else n = new this.Type(...this.dependencies.map(at, t), ...e);
        if (null == this.transformers) return n;
        return this.transformers.reduce(ht, n);
    }
    registerTransformer(t) {
        (this.transformers ?? (this.transformers = [])).push(t);
    }
}

const dt = {
    $isResolver: true,
    resolve(t, e) {
        return e;
    }
};

function vt(t) {
    return o(t.register);
}

function wt(t) {
    return vt(t) && "boolean" === typeof t.registerInRequestor;
}

function gt(t) {
    return wt(t) && t.registerInRequestor;
}

function pt(t) {
    return void 0 !== t.prototype;
}

function Rt(t) {
    return u(t) && t.indexOf(":") > 0;
}

const mt = new Set([ "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Number", "Object", "Promise", "RangeError", "ReferenceError", "RegExp", "Set", "SharedArrayBuffer", "String", "SyntaxError", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URIError", "WeakMap", "WeakSet" ]);

let yt = 0;

class Container {
    constructor(t, e) {
        this.parent = t;
        this.config = e;
        this.id = ++yt;
        this.t = 0;
        this.i = new Map;
        if (null === t) {
            this.root = this;
            this.u = new Map;
            this.h = new Map;
            this.res = l();
        } else {
            this.root = t.root;
            this.u = new Map;
            this.h = t.h;
            if (e.inheritParentResources) this.res = Object.assign(l(), t.res, this.root.res); else this.res = l();
        }
        this.u.set(H, dt);
    }
    get depth() {
        return null === this.parent ? 0 : this.parent.depth + 1;
    }
    register(...t) {
        if (100 === ++this.t) throw new Error(`AUR0006:${t.map(String)}`);
        let e;
        let r;
        let i;
        let s;
        let o;
        let u = 0;
        let l = t.length;
        for (;u < l; ++u) {
            e = t[u];
            if (!n(e)) continue;
            if (vt(e)) e.register(this); else if (P.resource.has(e)) {
                const t = P.resource.getAll(e);
                if (1 === t.length) t[0].register(this); else {
                    s = 0;
                    o = t.length;
                    while (o > s) {
                        t[s].register(this);
                        ++s;
                    }
                }
            } else if (pt(e)) Ct.singleton(e, e).register(this); else {
                r = Object.keys(e);
                s = 0;
                o = r.length;
                for (;s < o; ++s) {
                    i = e[r[s]];
                    if (!n(i)) continue;
                    if (vt(i)) i.register(this); else this.register(i);
                }
            }
        }
        --this.t;
        return this;
    }
    registerResolver(t, e, n = false) {
        Et(t);
        const r = this.u;
        const i = r.get(t);
        if (null == i) {
            r.set(t, e);
            if (Rt(t)) {
                if (void 0 !== this.res[t]) throw new Error(`AUR0007:${t}`);
                this.res[t] = e;
            }
        } else if (i instanceof Resolver && 4 === i.strategy) i.state.push(e); else r.set(t, new Resolver(t, 4, [ i, e ]));
        if (n) this.i.set(t, e);
        return e;
    }
    registerTransformer(t, e) {
        const n = this.getResolver(t);
        if (null == n) return false;
        if (n.getFactory) {
            const t = n.getFactory(this);
            if (null == t) return false;
            t.registerTransformer(e);
            return true;
        }
        return false;
    }
    getResolver(t, e = true) {
        Et(t);
        if (void 0 !== t.resolve) return t;
        let n = this;
        let r;
        while (null != n) {
            r = n.u.get(t);
            if (null == r) {
                if (null == n.parent) {
                    const r = gt(t) ? this : n;
                    return e ? this.R(t, r) : null;
                }
                n = n.parent;
            } else return r;
        }
        return null;
    }
    has(t, e = false) {
        return this.u.has(t) ? true : e && null != this.parent ? this.parent.has(t, true) : false;
    }
    get(t) {
        Et(t);
        if (t.$isResolver) return t.resolve(this, this);
        let e = this;
        let n;
        while (null != e) {
            n = e.u.get(t);
            if (null == n) {
                if (null == e.parent) {
                    const r = gt(t) ? this : e;
                    n = this.R(t, r);
                    return n.resolve(e, this);
                }
                e = e.parent;
            } else return n.resolve(e, this);
        }
        throw new Error(`AUR0008:${String(t)}`);
    }
    getAll(t, e = false) {
        Et(t);
        const n = this;
        let r = n;
        let i;
        if (e) {
            let e = It;
            while (null != r) {
                i = r.u.get(t);
                if (null != i) e = e.concat(At(i, r, n));
                r = r.parent;
            }
            return e;
        } else while (null != r) {
            i = r.u.get(t);
            if (null == i) {
                r = r.parent;
                if (null == r) return It;
            } else return At(i, r, n);
        }
        return It;
    }
    invoke(t, e) {
        if (O(t)) throw jt(t);
        if (void 0 === e) return new t(...K(t).map(at, this)); else return new t(...K(t).map(at, this), ...e);
    }
    getFactory(t) {
        let e = this.h.get(t);
        if (void 0 === e) {
            if (O(t)) throw jt(t);
            this.h.set(t, e = new Factory(t, K(t)));
        }
        return e;
    }
    registerFactory(t, e) {
        this.h.set(t, e);
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
        const t = this.u;
        const e = this.i;
        let n;
        let r;
        for ([r, n] of e.entries()) {
            n.dispose();
            t.delete(r);
        }
        e.clear();
    }
    find(t, e) {
        const n = t.keyFrom(e);
        let i = this.res[n];
        if (void 0 === i) {
            i = this.root.res[n];
            if (void 0 === i) return null;
        }
        if (null === i) return null;
        if (o(i.getFactory)) {
            const e = i.getFactory(this);
            if (null === e || void 0 === e) return null;
            const n = r(t.name, e.Type);
            if (void 0 === n) return null;
            return n;
        }
        return null;
    }
    create(t, e) {
        const n = t.keyFrom(e);
        let r = this.res[n];
        if (void 0 === r) {
            r = this.root.res[n];
            if (void 0 === r) return null;
            return r.resolve(this.root, this) ?? null;
        }
        return r.resolve(this, this) ?? null;
    }
    dispose() {
        if (this.i.size > 0) this.disposeResolvers();
        this.u.clear();
    }
    R(t, e) {
        if (!o(t)) throw new Error(`AUR0009:${t}`);
        if (mt.has(t.name)) throw new Error(`AUR0010:${t.name}`);
        if (vt(t)) {
            const n = t.register(e, t);
            if (!(n instanceof Object) || null == n.resolve) {
                const n = e.u.get(t);
                if (null != n) return n;
                throw new Error(`AUR0011`);
            }
            return n;
        } else if (P.resource.has(t)) {
            const n = P.resource.getAll(t);
            if (1 === n.length) n[0].register(e); else {
                const t = n.length;
                for (let r = 0; r < t; ++r) n[r].register(e);
            }
            const r = e.u.get(t);
            if (null != r) return r;
            throw new Error(`AUR0011`);
        } else if (t.$isInterface) throw new Error(`AUR0012:${t.friendlyName}`); else {
            const n = this.config.defaultResolver(t, e);
            e.u.set(t, n);
            return n;
        }
    }
}

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

const bt = new WeakMap;

function $t(t) {
    return function(e, n, r) {
        let i = bt.get(e);
        if (void 0 === i) bt.set(e, i = new WeakMap);
        if (i.has(r)) return i.get(r);
        const s = t(e, n, r);
        i.set(r, s);
        return s;
    };
}

const Ct = {
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
        return new Resolver(t, 3, $t(e));
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
        this.$ = null;
        this.C = t;
        if (void 0 !== e) this.$ = e;
    }
    get friendlyName() {
        return this.C;
    }
    prepare(t) {
        this.$ = t;
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        if (null == this.$) throw new Error(`AUR0013:${this.C}`);
        return this.$;
    }
    dispose() {
        this.$ = null;
    }
}

function Et(t) {
    if (null === t || void 0 === t) throw new Error(`AUR0014`);
}

function At(t, e, n) {
    if (t instanceof Resolver && 4 === t.strategy) {
        const r = t.state;
        let i = r.length;
        const s = new Array(i);
        while (i--) s[i] = r[i].resolve(e, n);
        return s;
    }
    return [ t.resolve(e, n) ];
}

function jt(t) {
    return new Error(`AUR0015:${t.name}`);
}

const It = Object.freeze([]);

const Ot = Object.freeze({});

function Mt() {}

const kt = G.createInterface("IPlatform");

function Ft(t, e, n, r) {
    var i = arguments.length, s = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var u = t.length - 1; u >= 0; u--) if (o = t[u]) s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s;
    return i > 3 && s && Object.defineProperty(e, n, s), s;
}

function Lt(t, e) {
    return function(n, r) {
        e(n, r, t);
    };
}

var Ut;

(function(t) {
    t[t["trace"] = 0] = "trace";
    t[t["debug"] = 1] = "debug";
    t[t["info"] = 2] = "info";
    t[t["warn"] = 3] = "warn";
    t[t["error"] = 4] = "error";
    t[t["fatal"] = 5] = "fatal";
    t[t["none"] = 6] = "none";
})(Ut || (Ut = {}));

var St;

(function(t) {
    t[t["noColors"] = 0] = "noColors";
    t[t["colors"] = 1] = "colors";
})(St || (St = {}));

const Tt = G.createInterface("ILogConfig", (t => t.instance(new LogConfig(0, 3))));

const Dt = G.createInterface("ISink");

const Pt = G.createInterface("ILogEventFactory", (t => t.singleton(_t)));

const Nt = G.createInterface("ILogger", (t => t.singleton(Vt)));

const Wt = G.createInterface("ILogScope");

const Bt = Object.freeze({
    key: L("logger-sink-handles"),
    define(t, e) {
        s(this.key, e.handles, t.prototype);
        return t;
    },
    getHandles(e) {
        return t.get(this.key, e);
    }
});

function zt(t) {
    return function(e) {
        return Bt.define(e, t);
    };
}

const Qt = I({
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

const xt = function() {
    const t = [ I({
        TRC: "TRC",
        DBG: "DBG",
        INF: "INF",
        WRN: "WRN",
        ERR: "ERR",
        FTL: "FTL",
        QQQ: "???"
    }), I({
        TRC: Qt.grey("TRC"),
        DBG: Qt.grey("DBG"),
        INF: Qt.white("INF"),
        WRN: Qt.yellow("WRN"),
        ERR: Qt.red("ERR"),
        FTL: Qt.red("FTL"),
        QQQ: Qt.grey("???")
    }) ];
    return function(e, n) {
        if (e <= 0) return t[n].TRC;
        if (e <= 1) return t[n].DBG;
        if (e <= 2) return t[n].INF;
        if (e <= 3) return t[n].WRN;
        if (e <= 4) return t[n].ERR;
        if (e <= 5) return t[n].FTL;
        return t[n].QQQ;
    };
}();

function Gt(t, e) {
    if (0 === e) return t.join(".");
    return t.map(Qt.cyan).join(".");
}

function Kt(t, e) {
    if (0 === e) return new Date(t).toISOString();
    return Qt.grey(new Date(t).toISOString());
}

class DefaultLogEvent {
    constructor(t, e, n, r, i, s) {
        this.severity = t;
        this.message = e;
        this.optionalParams = n;
        this.scope = r;
        this.colorOptions = i;
        this.timestamp = s;
    }
    toString() {
        const {severity: t, message: e, scope: n, colorOptions: r, timestamp: i} = this;
        if (0 === n.length) return `${Kt(i, r)} [${xt(t, r)}] ${e}`;
        return `${Kt(i, r)} [${xt(t, r)} ${Gt(n, r)}] ${e}`;
    }
}

let _t = class DefaultLogEventFactory {
    constructor(t) {
        this.config = t;
    }
    createLogEvent(t, e, n, r) {
        return new DefaultLogEvent(e, n, r, t.scope, this.config.colorOptions, Date.now());
    }
};

_t = Ft([ Lt(0, Tt) ], _t);

let Ht = class ConsoleSink {
    constructor(t) {
        const e = t.console;
        this.handleEvent = function t(n) {
            const r = n.optionalParams;
            if (void 0 === r || 0 === r.length) {
                const t = n.toString();
                switch (n.severity) {
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
                let t = n.toString();
                let i = 0;
                while (t.includes("%s")) t = t.replace("%s", String(r[i++]));
                switch (n.severity) {
                  case 0:
                  case 1:
                    return e.debug(t, ...r.slice(i));

                  case 2:
                    return e.info(t, ...r.slice(i));

                  case 3:
                    return e.warn(t, ...r.slice(i));

                  case 4:
                  case 5:
                    return e.error(t, ...r.slice(i));
                }
            }
        };
    }
    static register(t) {
        Ct.singleton(Dt, ConsoleSink).register(t);
    }
};

Ht = Ft([ Lt(0, kt) ], Ht);

let Vt = class DefaultLogger {
    constructor(t, e, n, r = [], i = null) {
        this.config = t;
        this.factory = e;
        this.scope = r;
        this.scopedLoggers = l();
        let s;
        let o;
        let u;
        let c;
        let f;
        let a;
        if (null === i) {
            this.root = this;
            this.parent = this;
            s = this.traceSinks = [];
            o = this.debugSinks = [];
            u = this.infoSinks = [];
            c = this.warnSinks = [];
            f = this.errorSinks = [];
            a = this.fatalSinks = [];
            for (const t of n) {
                const e = Bt.getHandles(t);
                if (e?.includes(0) ?? true) s.push(t);
                if (e?.includes(1) ?? true) o.push(t);
                if (e?.includes(2) ?? true) u.push(t);
                if (e?.includes(3) ?? true) c.push(t);
                if (e?.includes(4) ?? true) f.push(t);
                if (e?.includes(5) ?? true) a.push(t);
            }
        } else {
            this.root = i.root;
            this.parent = i;
            s = this.traceSinks = i.traceSinks;
            o = this.debugSinks = i.debugSinks;
            u = this.infoSinks = i.infoSinks;
            c = this.warnSinks = i.warnSinks;
            f = this.errorSinks = i.errorSinks;
            a = this.fatalSinks = i.fatalSinks;
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
        let n = e[t];
        if (void 0 === n) n = e[t] = new DefaultLogger(this.config, this.factory, void 0, this.scope.concat(t), this);
        return n;
    }
    emit(t, e, n, r) {
        const i = o(n) ? n() : n;
        const s = this.factory.createLogEvent(this, e, i, r);
        for (let e = 0, n = t.length; e < n; ++e) t[e].handleEvent(s);
    }
};

Ft([ $ ], Vt.prototype, "trace", null);

Ft([ $ ], Vt.prototype, "debug", null);

Ft([ $ ], Vt.prototype, "info", null);

Ft([ $ ], Vt.prototype, "warn", null);

Ft([ $ ], Vt.prototype, "error", null);

Ft([ $ ], Vt.prototype, "fatal", null);

Vt = Ft([ Lt(0, Tt), Lt(1, Pt), Lt(2, nt(Dt)), Lt(3, it(Wt)), Lt(4, st) ], Vt);

const qt = I({
    create({level: t = 3, colorOptions: e = 0, sinks: n = []} = {}) {
        return I({
            register(r) {
                r.register(Ct.instance(Tt, new LogConfig(e, t)));
                for (const t of n) if (o(t)) r.register(Ct.singleton(Dt, t)); else r.register(t);
                return r;
            }
        });
    }
});

const Jt = G.createInterface((t => t.singleton(ModuleLoader)));

function Xt(t) {
    return t;
}

class ModuleTransformer {
    constructor(t) {
        this.$transform = t;
        this.A = new Map;
        this.j = new Map;
    }
    transform(t) {
        if (t instanceof Promise) return this.I(t); else if ("object" === typeof t && null !== t) return this.O(t); else throw new Error(`Invalid input: ${String(t)}. Expected Promise or Object.`);
    }
    I(t) {
        if (this.A.has(t)) return this.A.get(t);
        const e = t.then((t => this.O(t)));
        this.A.set(t, e);
        void e.then((e => {
            this.A.set(t, e);
        }));
        return e;
    }
    O(t) {
        if (this.j.has(t)) return this.j.get(t);
        const e = this.$transform(this.M(t));
        this.j.set(t, e);
        if (e instanceof Promise) void e.then((e => {
            this.j.set(t, e);
        }));
        return e;
    }
    M(t) {
        if (null == t) throw new Error(`Invalid input: ${String(t)}. Expected Object.`);
        if ("object" !== typeof t) return new AnalyzedModule(t, []);
        let e;
        let n;
        let r;
        let i;
        const s = [];
        for (const u in t) {
            switch (typeof (e = t[u])) {
              case "object":
                if (null === e) continue;
                n = o(e.register);
                r = false;
                i = It;
                break;

              case "function":
                n = o(e.register);
                r = void 0 !== e.prototype;
                i = P.resource.getAll(e);
                break;

              default:
                continue;
            }
            s.push(new ModuleItem(u, e, n, r, i));
        }
        return new AnalyzedModule(t, s);
    }
}

class ModuleLoader {
    constructor() {
        this.transformers = new Map;
    }
    load(t, e = Xt) {
        const n = this.transformers;
        let r = n.get(e);
        if (void 0 === r) n.set(e, r = new ModuleTransformer(e));
        return r.transform(t);
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
    constructor(t, e, n, r, i) {
        this.key = t;
        this.value = e;
        this.isRegistry = n;
        this.isConstructable = r;
        this.definitions = i;
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

const Yt = G.createInterface("IEventAggregator", (t => t.singleton(EventAggregator)));

class EventAggregator {
    constructor() {
        this.eventLookup = {};
        this.messageHandlers = [];
    }
    publish(t, e) {
        if (!t) throw new Error(`Invalid channel name or instance: ${t}.`);
        if (u(t)) {
            let n = this.eventLookup[t];
            if (void 0 !== n) {
                n = n.slice();
                let r = n.length;
                while (r-- > 0) n[r](e, t);
            }
        } else {
            const e = this.messageHandlers.slice();
            let n = e.length;
            while (n-- > 0) e[n].handle(t);
        }
    }
    subscribe(t, e) {
        if (!t) throw new Error(`Invalid channel name or type: ${t}.`);
        let n;
        let r;
        if (u(t)) {
            if (void 0 === this.eventLookup[t]) this.eventLookup[t] = [];
            n = e;
            r = this.eventLookup[t];
        } else {
            n = new Handler(t, e);
            r = this.messageHandlers;
        }
        r.push(n);
        return {
            dispose() {
                const t = r.indexOf(n);
                if (-1 !== t) r.splice(t, 1);
            }
        };
    }
    subscribeOnce(t, e) {
        const n = this.subscribe(t, (function(t, r) {
            n.dispose();
            e(t, r);
        }));
        return n;
    }
}

export { AnalyzedModule, St as ColorOptions, Ht as ConsoleSink, ContainerConfiguration, G as DI, DefaultLogEvent, _t as DefaultLogEventFactory, Vt as DefaultLogger, x as DefaultResolver, EventAggregator, H as IContainer, Yt as IEventAggregator, Tt as ILogConfig, Pt as ILogEventFactory, Nt as ILogger, Jt as IModuleLoader, kt as IPlatform, V as IServiceLocator, Dt as ISink, InstanceProvider, LogConfig, Ut as LogLevel, qt as LoggerConfiguration, ModuleItem, P as Protocol, Ct as Registration, nt as all, $ as bound, v as camelCase, It as emptyArray, Ot as emptyObject, ot as factory, A as firstDefined, Qt as format, W as fromAnnotationOrDefinitionOrTypeOrDefault, B as fromAnnotationOrTypeOrDefault, z as fromDefinitionOrDefault, j as getPrototypeChain, st as ignore, J as inject, f as isArrayIndex, O as isNativeFunction, a as isNumberOrBigInt, h as isStringOrDate, g as kebabCase, rt as lazy, C as mergeArrays, b as mergeDistinct, E as mergeObjects, ut as newInstanceForScope, lt as newInstanceOf, m as nextId, Mt as noop, M as onResolve, it as optional, w as pascalCase, y as resetId, k as resolveAll, tt as singleton, zt as sink, p as toArray, Y as transient };
//# sourceMappingURL=index.mjs.map
