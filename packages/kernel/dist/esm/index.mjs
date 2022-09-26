import { Metadata as t, applyMetadataPolyfill as e, isObject as n } from "@aurelia/metadata";

const r = String;

const i = t.getOwn;

const s = t.hasOwn;

const o = t.define;

const u = t => "function" === typeof t;

const l = t => "string" === typeof t;

const c = () => Object.create(null);

const f = t => new Error(t);

const a = {};

const h = t => {
    switch (typeof t) {
      case "number":
        return t >= 0 && (0 | t) === t;

      case "string":
        {
            const e = a[t];
            if (void 0 !== e) return e;
            const n = t.length;
            if (0 === n) return a[t] = false;
            let r = 0;
            let i = 0;
            for (;i < n; ++i) {
                r = I(t, i);
                if (0 === i && 48 === r && n > 1 || r < 48 || r > 57) return a[t] = false;
            }
            return a[t] = true;
        }

      default:
        return false;
    }
};

const d = function() {
    const t = Object.assign(c(), {
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
    const e = e => {
        if ("" === e) return 0;
        if (e !== e.toUpperCase()) return 3;
        if (e !== e.toLowerCase()) return 2;
        if (true === t[e]) return 1;
        return 0;
    };
    return (t, n) => {
        const r = t.length;
        if (0 === r) return t;
        let i = false;
        let s = "";
        let o;
        let u = "";
        let l = 0;
        let c = t.charAt(0);
        let f = e(c);
        let a = 0;
        for (;a < r; ++a) {
            o = l;
            u = c;
            l = f;
            c = t.charAt(a + 1);
            f = e(c);
            if (0 === l) {
                if (s.length > 0) i = true;
            } else {
                if (!i && s.length > 0 && 2 === l) i = 3 === o || 3 === f;
                s += n(u, i);
                i = false;
            }
        }
        return s;
    };
}();

const v = function() {
    const t = c();
    const e = (t, e) => e ? t.toUpperCase() : t.toLowerCase();
    return n => {
        let r = t[n];
        if (void 0 === r) r = t[n] = d(n, e);
        return r;
    };
}();

const g = function() {
    const t = c();
    return e => {
        let n = t[e];
        if (void 0 === n) {
            n = v(e);
            if (n.length > 0) n = n[0].toUpperCase() + n.slice(1);
            t[e] = n;
        }
        return n;
    };
}();

const w = function() {
    const t = c();
    const e = (t, e) => e ? `-${t.toLowerCase()}` : t.toLowerCase();
    return n => {
        let r = t[n];
        if (void 0 === r) r = t[n] = d(n, e);
        return r;
    };
}();

const R = t => {
    const e = t.length;
    const n = Array(e);
    let r = 0;
    for (;r < e; ++r) n[r] = t[r];
    return n;
};

const m = (t, e, n) => ({
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
});

const p = (...t) => {
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
};

const y = (...t) => {
    const e = t.length;
    let n;
    let r = 0;
    for (;e > r; ++r) {
        n = t[r];
        if (void 0 !== n) return n;
    }
    throw f(`No default value found`);
};

const b = function() {
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

function $(...t) {
    return Object.assign(c(), ...t);
}

const C = function() {
    const t = new WeakMap;
    let e = false;
    let n = "";
    let r = 0;
    return function(i) {
        e = t.get(i);
        if (void 0 === e) {
            n = i.toString();
            r = n.length;
            e = r >= 29 && r <= 100 && 125 === I(n, r - 1) && I(n, r - 2) <= 32 && 93 === I(n, r - 3) && 101 === I(n, r - 4) && 100 === I(n, r - 5) && 111 === I(n, r - 6) && 99 === I(n, r - 7) && 32 === I(n, r - 8) && 101 === I(n, r - 9) && 118 === I(n, r - 10) && 105 === I(n, r - 11) && 116 === I(n, r - 12) && 97 === I(n, r - 13) && 110 === I(n, r - 14) && 88 === I(n, r - 15);
            t.set(i, e);
        }
        return e;
    };
}();

const A = (t, e) => {
    if (t instanceof Promise) return t.then(e);
    return e(t);
};

const j = (...t) => {
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
};

const I = (t, e) => t.charCodeAt(e);

const E = "au:annotation";

const O = (t, e) => {
    if (void 0 === e) return `${E}:${t}`;
    return `${E}:${t}:${e}`;
};

const M = (t, e) => {
    const n = i(E, t);
    if (void 0 === n) o(E, [ e ], t); else n.push(e);
};

const k = Object.freeze({
    name: "au:annotation",
    appendTo: M,
    set(t, e, n) {
        o(O(e), n, t);
    },
    get: (t, e) => i(O(e), t),
    getKeys(t) {
        let e = i(E, t);
        if (void 0 === e) o(E, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(E),
    keyFor: O
});

const F = "au:resource";

const L = Object.freeze({
    name: F,
    appendTo(t, e) {
        const n = i(F, t);
        if (void 0 === n) o(F, [ e ], t); else n.push(e);
    },
    has: t => s(F, t),
    getAll(t) {
        const e = i(F, t);
        if (void 0 === e) return Tt; else return e.map((e => i(e, t)));
    },
    getKeys(t) {
        let e = i(F, t);
        if (void 0 === e) o(F, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(F),
    keyFor(t, e) {
        if (void 0 === e) return `${F}:${t}`;
        return `${F}:${t}:${e}`;
    }
});

const U = {
    annotation: k,
    resource: L
};

const T = Object.prototype.hasOwnProperty;

function P(t, e, n, r) {
    let s = i(O(t), n);
    if (void 0 === s) {
        s = e[t];
        if (void 0 === s) {
            s = n[t];
            if (void 0 === s || !T.call(n, t)) return r();
            return s;
        }
        return s;
    }
    return s;
}

function D(t, e, n) {
    let r = i(O(t), e);
    if (void 0 === r) {
        r = e[t];
        if (void 0 === r || !T.call(e, t)) return n();
        return r;
    }
    return r;
}

function S(t, e, n) {
    const r = e[t];
    if (void 0 === r) return n();
    return r;
}

e(Reflect, false, false);

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
        return this.t(3, Ot(t));
    }
    aliasTo(t) {
        return this.t(5, t);
    }
    t(t, e) {
        const {c: n, k: r} = this;
        this.c = this.k = void 0;
        return n.registerResolver(r, new Resolver(r, t, e));
    }
}

function N(t) {
    const e = t.slice();
    const n = Object.keys(t);
    const r = n.length;
    let i;
    for (let s = 0; s < r; ++s) {
        i = n[s];
        if (!h(i)) e[i] = t[i];
    }
    return e;
}

const W = {
    none(t) {
        throw B(t);
    },
    singleton(t) {
        return new Resolver(t, 1, t);
    },
    transient(t) {
        return new Resolver(t, 2, t);
    }
};

const B = t => f(`AUR0002:${r(t)}`);

class ContainerConfiguration {
    constructor(t, e) {
        this.inheritParentResources = t;
        this.defaultResolver = e;
    }
    static from(t) {
        if (void 0 === t || t === ContainerConfiguration.DEFAULT) return ContainerConfiguration.DEFAULT;
        return new ContainerConfiguration(t.inheritParentResources ?? false, t.defaultResolver ?? W.singleton);
    }
}

ContainerConfiguration.DEFAULT = ContainerConfiguration.from({});

const z = {
    createContainer(t) {
        return new Container(null, ContainerConfiguration.from(t));
    },
    getDesignParamtypes(t) {
        return i("design:paramtypes", t);
    },
    getAnnotationParamtypes(t) {
        const e = O("di:paramtypes");
        return i(e, t);
    },
    getOrCreateAnnotationParamTypes: Q,
    getDependencies: _,
    createInterface(t, e) {
        const n = u(t) ? t : e;
        const r = l(t) ? t : void 0;
        const i = function(t, e, n) {
            if (null == t || void 0 !== new.target) throw f(`AUR0001:${i.friendlyName}`);
            const r = Q(t);
            r[n] = i;
        };
        i.$isInterface = true;
        i.friendlyName = null == r ? "(anonymous)" : r;
        if (null != n) i.register = (t, e) => n(new ResolverBuilder(t, e ?? i));
        i.toString = () => `InterfaceSymbol<${i.friendlyName}>`;
        return i;
    },
    inject(...t) {
        return function(e, n, r) {
            if ("number" === typeof r) {
                const n = Q(e);
                const i = t[0];
                if (void 0 !== i) n[r] = i;
            } else if (n) {
                const r = Q(e.constructor);
                const i = t[0];
                if (void 0 !== i) r[n] = i;
            } else if (r) {
                const e = r.value;
                const n = Q(e);
                let i;
                let s = 0;
                for (;s < t.length; ++s) {
                    i = t[s];
                    if (void 0 !== i) n[s] = i;
                }
            } else {
                const n = Q(e);
                let r;
                let i = 0;
                for (;i < t.length; ++i) {
                    r = t[i];
                    if (void 0 !== r) n[i] = r;
                }
            }
        };
    },
    transient(t) {
        t.register = function(e) {
            const n = Mt.transient(t, t);
            return n.register(e, t);
        };
        t.registerInRequestor = false;
        return t;
    },
    singleton(t, e = J) {
        t.register = function(e) {
            const n = Mt.singleton(t, t);
            return n.register(e, t);
        };
        t.registerInRequestor = e.scoped;
        return t;
    }
};

function _(t) {
    const e = O("di:dependencies");
    let n = i(e, t);
    if (void 0 === n) {
        const r = t.inject;
        if (void 0 === r) {
            const e = z.getDesignParamtypes(t);
            const r = z.getAnnotationParamtypes(t);
            if (void 0 === e) if (void 0 === r) {
                const e = Object.getPrototypeOf(t);
                if (u(e) && e !== Function.prototype) n = N(_(e)); else n = [];
            } else n = N(r); else if (void 0 === r) n = N(e); else {
                n = N(e);
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
                    if (!h(u)) n[u] = r[u];
                }
            }
        } else n = N(r);
        o(e, n, t);
        M(t, e);
    }
    return n;
}

function Q(t) {
    const e = O("di:paramtypes");
    let n = i(e, t);
    if (void 0 === n) {
        o(e, n = [], t);
        M(t, e);
    }
    return n;
}

const x = z.createInterface("IContainer");

const G = x;

function K(t) {
    return function(e) {
        const n = function(t, e, r) {
            z.inject(n)(t, e, r);
        };
        n.$isResolver = true;
        n.resolve = function(n, r) {
            return t(e, n, r);
        };
        return n;
    };
}

const H = z.inject;

function V(t) {
    return z.transient(t);
}

function q(t) {
    return null == t ? V : V(t);
}

const J = {
    scoped: false
};

function X(t) {
    if (u(t)) return z.singleton(t);
    return function(e) {
        return z.singleton(e, t);
    };
}

function Y(t) {
    return function(e, n) {
        n = !!n;
        const r = function(t, e, n) {
            z.inject(r)(t, e, n);
        };
        r.$isResolver = true;
        r.resolve = function(r, i) {
            return t(e, r, i, n);
        };
        return r;
    };
}

const Z = Y(((t, e, n, r) => n.getAll(t, r)));

const tt = K(((t, e, n) => () => n.get(t)));

const et = K(((t, e, n) => {
    if (n.has(t, true)) return n.get(t); else return;
}));

function nt(t, e, n) {
    z.inject(nt)(t, e, n);
}

nt.$isResolver = true;

nt.resolve = () => {};

const rt = K(((t, e, n) => (...r) => e.getFactory(t).construct(n, r)));

const it = K(((t, e, n) => {
    const i = ot(t, e, n);
    const s = new InstanceProvider(r(t), i);
    n.registerResolver(t, s, true);
    return i;
}));

const st = K(((t, e, n) => ot(t, e, n)));

function ot(t, e, n) {
    return e.getFactory(t).construct(n);
}

class Resolver {
    constructor(t, e, n) {
        this.k = t;
        this.i = e;
        this._state = n;
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
            if (this.resolving) throw ut(this._state.name);
            this.resolving = true;
            this._state = t.getFactory(this._state).construct(e);
            this.i = 0;
            this.resolving = false;
            return this._state;

          case 2:
            {
                const n = t.getFactory(this._state);
                if (null === n) throw lt(this.k);
                return n.construct(e);
            }

          case 3:
            return this._state(t, e, this);

          case 4:
            return this._state[0].resolve(t, e);

          case 5:
            return e.get(this._state);

          default:
            throw ct(this.i);
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

const ut = t => f(`AUR0003:${t}`);

const lt = t => f(`AUR0004:${r(t)}`);

const ct = t => f(`AUR0005:${t}`);

function ft(t) {
    return this.get(t);
}

function at(t, e) {
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
        if (void 0 === e) n = new this.Type(...this.dependencies.map(ft, t)); else n = new this.Type(...this.dependencies.map(ft, t), ...e);
        if (null == this.transformers) return n;
        return this.transformers.reduce(at, n);
    }
    registerTransformer(t) {
        (this.transformers ?? (this.transformers = [])).push(t);
    }
}

const ht = {
    $isResolver: true,
    resolve(t, e) {
        return e;
    }
};

function dt(t) {
    return u(t.register);
}

function vt(t) {
    return dt(t) && "boolean" === typeof t.registerInRequestor;
}

function gt(t) {
    return vt(t) && t.registerInRequestor;
}

function wt(t) {
    return void 0 !== t.prototype;
}

function Rt(t) {
    return l(t) && t.indexOf(":") > 0;
}

const mt = new Set("Array ArrayBuffer Boolean DataView Date Error EvalError Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Number Object Promise RangeError ReferenceError RegExp Set SharedArrayBuffer String SyntaxError TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array URIError WeakMap WeakSet".split(" "));

let pt = 0;

class Container {
    constructor(t, e) {
        this.parent = t;
        this.config = e;
        this.id = ++pt;
        this.u = 0;
        this.h = new Map;
        if (null === t) {
            this.root = this;
            this.R = new Map;
            this.$ = new Map;
            this.res = c();
        } else {
            this.root = t.root;
            this.R = new Map;
            this.$ = t.$;
            if (e.inheritParentResources) this.res = Object.assign(c(), t.res, this.root.res); else this.res = c();
        }
        this.R.set(x, ht);
    }
    get depth() {
        return null === this.parent ? 0 : this.parent.depth + 1;
    }
    register(...t) {
        if (100 === ++this.u) throw yt(t);
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
            if (dt(e)) e.register(this); else if (U.resource.has(e)) {
                const t = U.resource.getAll(e);
                if (1 === t.length) t[0].register(this); else {
                    s = 0;
                    o = t.length;
                    while (o > s) {
                        t[s].register(this);
                        ++s;
                    }
                }
            } else if (wt(e)) Mt.singleton(e, e).register(this); else {
                r = Object.keys(e);
                s = 0;
                o = r.length;
                for (;s < o; ++s) {
                    i = e[r[s]];
                    if (!n(i)) continue;
                    if (dt(i)) i.register(this); else this.register(i);
                }
            }
        }
        --this.u;
        return this;
    }
    registerResolver(t, e, n = false) {
        kt(t);
        const r = this.R;
        const i = r.get(t);
        if (null == i) {
            r.set(t, e);
            if (Rt(t)) {
                if (void 0 !== this.res[t]) throw bt(t);
                this.res[t] = e;
            }
        } else if (i instanceof Resolver && 4 === i.i) i._state.push(e); else r.set(t, new Resolver(t, 4, [ i, e ]));
        if (n) this.h.set(t, e);
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
        kt(t);
        if (void 0 !== t.resolve) return t;
        let n = this;
        let r;
        let i;
        while (null != n) {
            r = n.R.get(t);
            if (null == r) {
                if (null == n.parent) {
                    i = gt(t) ? this : n;
                    return e ? this.C(t, i) : null;
                }
                n = n.parent;
            } else return r;
        }
        return null;
    }
    has(t, e = false) {
        return this.R.has(t) ? true : e && null != this.parent ? this.parent.has(t, true) : false;
    }
    get(t) {
        kt(t);
        if (t.$isResolver) return t.resolve(this, this);
        let e = this;
        let n;
        let r;
        while (null != e) {
            n = e.R.get(t);
            if (null == n) {
                if (null == e.parent) {
                    r = gt(t) ? this : e;
                    n = this.C(t, r);
                    return n.resolve(e, this);
                }
                e = e.parent;
            } else return n.resolve(e, this);
        }
        throw $t(t);
    }
    getAll(t, e = false) {
        kt(t);
        const n = this;
        let r = n;
        let i;
        if (e) {
            let e = Tt;
            while (null != r) {
                i = r.R.get(t);
                if (null != i) e = e.concat(Ft(i, r, n));
                r = r.parent;
            }
            return e;
        } else while (null != r) {
            i = r.R.get(t);
            if (null == i) {
                r = r.parent;
                if (null == r) return Tt;
            } else return Ft(i, r, n);
        }
        return Tt;
    }
    invoke(t, e) {
        if (C(t)) throw Ut(t);
        if (void 0 === e) return new t(..._(t).map(ft, this)); else return new t(..._(t).map(ft, this), ...e);
    }
    getFactory(t) {
        let e = this.$.get(t);
        if (void 0 === e) {
            if (C(t)) throw Ut(t);
            this.$.set(t, e = new Factory(t, _(t)));
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
        let r = this.res[n];
        if (void 0 === r) {
            r = this.root.res[n];
            if (void 0 === r) return null;
        }
        if (null === r) return null;
        if (u(r.getFactory)) {
            const e = r.getFactory(this);
            if (null === e || void 0 === e) return null;
            const n = i(t.name, e.Type);
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
        if (this.h.size > 0) this.disposeResolvers();
        this.R.clear();
    }
    C(t, e) {
        if (!u(t)) throw Ct(t);
        if (mt.has(t.name)) throw At(t);
        if (dt(t)) {
            const n = t.register(e, t);
            if (!(n instanceof Object) || null == n.resolve) {
                const n = e.R.get(t);
                if (null != n) return n;
                throw jt();
            }
            return n;
        } else if (U.resource.has(t)) {
            const n = U.resource.getAll(t);
            if (1 === n.length) n[0].register(e); else {
                const t = n.length;
                for (let r = 0; r < t; ++r) n[r].register(e);
            }
            const r = e.R.get(t);
            if (null != r) return r;
            throw jt();
        } else if (t.$isInterface) throw It(t.friendlyName); else {
            const n = this.config.defaultResolver(t, e);
            e.R.set(t, n);
            return n;
        }
    }
}

const yt = t => f(`AUR0006:${t.map(r)}`);

const bt = t => f(`AUR0007:${r(t)}`);

const $t = t => f(`AUR0008:${r(t)}`);

const Ct = t => f(`AUR0009:${r(t)}`);

const At = t => f(`AUR0010:${t.name}`);

const jt = () => f(`AUR0011`);

const It = t => f(`AUR0012:${t}`);

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

const Et = new WeakMap;

function Ot(t) {
    return function(e, n, r) {
        let i = Et.get(e);
        if (void 0 === i) Et.set(e, i = new WeakMap);
        if (i.has(r)) return i.get(r);
        const s = t(e, n, r);
        i.set(r, s);
        return s;
    };
}

const Mt = {
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
        return new Resolver(t, 3, Ot(e));
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
        if (null == this.A) throw Lt(this.j);
        return this.A;
    }
    dispose() {
        this.A = null;
    }
}

function kt(t) {
    if (null === t || void 0 === t) throw f(`AUR0014`);
}

function Ft(t, e, n) {
    if (t instanceof Resolver && 4 === t.i) {
        const r = t._state;
        let i = r.length;
        const s = new Array(i);
        while (i--) s[i] = r[i].resolve(e, n);
        return s;
    }
    return [ t.resolve(e, n) ];
}

const Lt = t => f(`AUR0013:${t}`);

const Ut = t => f(`AUR0015:${t.name}`);

const Tt = Object.freeze([]);

const Pt = Object.freeze({});

function Dt() {}

const St = z.createInterface("IPlatform");

function Nt(t, e, n, r) {
    var i = arguments.length, s = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var u = t.length - 1; u >= 0; u--) if (o = t[u]) s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s;
    return i > 3 && s && Object.defineProperty(e, n, s), s;
}

function Wt(t, e) {
    return function(n, r) {
        e(n, r, t);
    };
}

var Bt;

(function(t) {
    t[t["trace"] = 0] = "trace";
    t[t["debug"] = 1] = "debug";
    t[t["info"] = 2] = "info";
    t[t["warn"] = 3] = "warn";
    t[t["error"] = 4] = "error";
    t[t["fatal"] = 5] = "fatal";
    t[t["none"] = 6] = "none";
})(Bt || (Bt = {}));

var zt;

(function(t) {
    t[t["noColors"] = 0] = "noColors";
    t[t["colors"] = 1] = "colors";
})(zt || (zt = {}));

const _t = z.createInterface("ILogConfig", (t => t.instance(new LogConfig(0, 3))));

const Qt = z.createInterface("ISink");

const xt = z.createInterface("ILogEventFactory", (t => t.singleton(Zt)));

const Gt = z.createInterface("ILogger", (t => t.singleton(ee)));

const Kt = z.createInterface("ILogScope");

const Ht = Object.freeze({
    key: O("logger-sink-handles"),
    define(t, e) {
        o(this.key, e.handles, t.prototype);
        return t;
    },
    getHandles(e) {
        return t.get(this.key, e);
    }
});

function Vt(t) {
    return function(e) {
        return Ht.define(e, t);
    };
}

const qt = $({
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

const Jt = function() {
    const t = [ $({
        TRC: "TRC",
        DBG: "DBG",
        INF: "INF",
        WRN: "WRN",
        ERR: "ERR",
        FTL: "FTL",
        QQQ: "???"
    }), $({
        TRC: qt.grey("TRC"),
        DBG: qt.grey("DBG"),
        INF: qt.white("INF"),
        WRN: qt.yellow("WRN"),
        ERR: qt.red("ERR"),
        FTL: qt.red("FTL"),
        QQQ: qt.grey("???")
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

const Xt = (t, e) => {
    if (0 === e) return t.join(".");
    return t.map(qt.cyan).join(".");
};

const Yt = (t, e) => {
    if (0 === e) return new Date(t).toISOString();
    return qt.grey(new Date(t).toISOString());
};

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
        if (0 === n.length) return `${Yt(i, r)} [${Jt(t, r)}] ${e}`;
        return `${Yt(i, r)} [${Jt(t, r)} ${Xt(n, r)}] ${e}`;
    }
}

let Zt = class DefaultLogEventFactory {
    constructor(t) {
        this.config = t;
    }
    createLogEvent(t, e, n, r) {
        return new DefaultLogEvent(e, n, r, t.scope, this.config.colorOptions, Date.now());
    }
};

Zt = Nt([ Wt(0, _t) ], Zt);

let te = class ConsoleSink {
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
        Mt.singleton(Qt, ConsoleSink).register(t);
    }
};

te = Nt([ Wt(0, St) ], te);

let ee = class DefaultLogger {
    constructor(t, e, n, r = [], i = null) {
        this.scope = r;
        this.I = c();
        let s;
        let o;
        let u;
        let l;
        let f;
        let a;
        this.config = t;
        this.f = e;
        this.sinks = n;
        if (null === i) {
            this.root = this;
            this.parent = this;
            s = this.O = [];
            o = this.M = [];
            u = this.F = [];
            l = this.L = [];
            f = this.U = [];
            a = this.T = [];
            for (const t of n) {
                const e = Ht.getHandles(t);
                if (e?.includes(0) ?? true) s.push(t);
                if (e?.includes(1) ?? true) o.push(t);
                if (e?.includes(2) ?? true) u.push(t);
                if (e?.includes(3) ?? true) l.push(t);
                if (e?.includes(4) ?? true) f.push(t);
                if (e?.includes(5) ?? true) a.push(t);
            }
        } else {
            this.root = i.root;
            this.parent = i;
            s = this.O = i.O;
            o = this.M = i.M;
            u = this.F = i.F;
            l = this.L = i.L;
            f = this.U = i.U;
            a = this.T = i.T;
        }
    }
    trace(t, ...e) {
        if (this.config.level <= 0) this.emit(this.O, 0, t, e);
    }
    debug(t, ...e) {
        if (this.config.level <= 1) this.emit(this.M, 1, t, e);
    }
    info(t, ...e) {
        if (this.config.level <= 2) this.emit(this.F, 2, t, e);
    }
    warn(t, ...e) {
        if (this.config.level <= 3) this.emit(this.L, 3, t, e);
    }
    error(t, ...e) {
        if (this.config.level <= 4) this.emit(this.U, 4, t, e);
    }
    fatal(t, ...e) {
        if (this.config.level <= 5) this.emit(this.T, 5, t, e);
    }
    scopeTo(t) {
        const e = this.I;
        let n = e[t];
        if (void 0 === n) n = e[t] = new DefaultLogger(this.config, this.f, void 0, this.scope.concat(t), this);
        return n;
    }
    emit(t, e, n, r) {
        const i = u(n) ? n() : n;
        const s = this.f.createLogEvent(this, e, i, r);
        for (let e = 0, n = t.length; e < n; ++e) t[e].handleEvent(s);
    }
};

Nt([ m ], ee.prototype, "trace", null);

Nt([ m ], ee.prototype, "debug", null);

Nt([ m ], ee.prototype, "info", null);

Nt([ m ], ee.prototype, "warn", null);

Nt([ m ], ee.prototype, "error", null);

Nt([ m ], ee.prototype, "fatal", null);

ee = Nt([ Wt(0, _t), Wt(1, xt), Wt(2, Z(Qt)), Wt(3, et(Kt)), Wt(4, nt) ], ee);

const ne = $({
    create({level: t = 3, colorOptions: e = 0, sinks: n = []} = {}) {
        return $({
            register(r) {
                r.register(Mt.instance(_t, new LogConfig(e, t)));
                for (const t of n) if (u(t)) r.register(Mt.singleton(Qt, t)); else r.register(t);
                return r;
            }
        });
    }
});

const re = z.createInterface((t => t.singleton(ModuleLoader)));

const ie = t => t;

class ModuleTransformer {
    constructor(t) {
        this.P = new Map;
        this.N = new Map;
        this.W = t;
    }
    transform(t) {
        if (t instanceof Promise) return this.B(t); else if ("object" === typeof t && null !== t) return this._(t); else throw f(`Invalid input: ${String(t)}. Expected Promise or Object.`);
    }
    B(t) {
        if (this.P.has(t)) return this.P.get(t);
        const e = t.then((t => this._(t)));
        this.P.set(t, e);
        void e.then((e => {
            this.P.set(t, e);
        }));
        return e;
    }
    _(t) {
        if (this.N.has(t)) return this.N.get(t);
        const e = this.W(this.G(t));
        this.N.set(t, e);
        if (e instanceof Promise) void e.then((e => {
            this.N.set(t, e);
        }));
        return e;
    }
    G(t) {
        if (null == t) throw new Error(`Invalid input: ${String(t)}. Expected Object.`);
        if ("object" !== typeof t) return new AnalyzedModule(t, []);
        let e;
        let n;
        let r;
        let i;
        const s = [];
        for (const o in t) {
            switch (typeof (e = t[o])) {
              case "object":
                if (null === e) continue;
                n = u(e.register);
                r = false;
                i = Tt;
                break;

              case "function":
                n = u(e.register);
                r = void 0 !== e.prototype;
                i = U.resource.getAll(e);
                break;

              default:
                continue;
            }
            s.push(new ModuleItem(o, e, n, r, i));
        }
        return new AnalyzedModule(t, s);
    }
}

class ModuleLoader {
    constructor() {
        this.transformers = new Map;
    }
    load(t, e = ie) {
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

const se = z.createInterface("IEventAggregator", (t => t.singleton(EventAggregator)));

class EventAggregator {
    constructor() {
        this.eventLookup = {};
        this.messageHandlers = [];
    }
    publish(t, e) {
        if (!t) throw f(`Invalid channel name or instance: ${t}.`);
        if (l(t)) {
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
        if (!t) throw f(`Invalid channel name or type: ${t}.`);
        let n;
        let r;
        if (l(t)) {
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

export { AnalyzedModule, zt as ColorOptions, te as ConsoleSink, ContainerConfiguration, z as DI, DefaultLogEvent, Zt as DefaultLogEventFactory, ee as DefaultLogger, W as DefaultResolver, EventAggregator, x as IContainer, se as IEventAggregator, _t as ILogConfig, xt as ILogEventFactory, Gt as ILogger, re as IModuleLoader, St as IPlatform, G as IServiceLocator, Qt as ISink, InstanceProvider, LogConfig, Bt as LogLevel, ne as LoggerConfiguration, ModuleItem, U as Protocol, Mt as Registration, Z as all, m as bound, v as camelCase, Tt as emptyArray, Pt as emptyObject, rt as factory, y as firstDefined, qt as format, P as fromAnnotationOrDefinitionOrTypeOrDefault, D as fromAnnotationOrTypeOrDefault, S as fromDefinitionOrDefault, b as getPrototypeChain, nt as ignore, H as inject, h as isArrayIndex, C as isNativeFunction, w as kebabCase, tt as lazy, p as mergeArrays, it as newInstanceForScope, st as newInstanceOf, Dt as noop, A as onResolve, et as optional, g as pascalCase, j as resolveAll, X as singleton, Vt as sink, R as toArray, q as transient };
//# sourceMappingURL=index.mjs.map
