import { DI as t, IContainer as s, Registration as e } from "@aurelia/kernel";

import { BindingBehaviorExpression as i, ValueConverterExpression as r, Scope as n, BindingContext as o, getCollectionObserver as l } from "@aurelia/runtime";

import { customAttribute as c, IRenderLocation as h, IInstruction as a, IController as u, IViewFactory as f, IPlatform as d } from "@aurelia/runtime-html";

const v = t.createInterface("IDomRenderer");

const g = t.createInterface("IScrollerObsererLocator");

const m = t.createInterface("ICollectionStrategyLocator");

function C(t) {
    let s = false;
    while (t instanceof i) t = t.expression;
    while (t instanceof r) {
        t = t.expression;
        s = true;
    }
    return s ? t : null;
}

const w = t => {
    let s = t.parentNode;
    while (null !== s && s !== document.body) {
        if (p(s)) return s;
        s = s.parentNode;
    }
    throw new Error("Unable to find a scroller");
};

const p = t => {
    const s = window.getComputedStyle(t);
    return s && ("scroll" === s.overflowY || "scroll" === s.overflow || "auto" === s.overflowY || "auto" === s.overflow);
};

const b = (t, ...s) => {
    const e = window.getComputedStyle(t);
    let i = 0;
    let r = 0;
    for (let t = 0, n = s.length; n > t; ++t) {
        r = parseFloat(e[s[t]]);
        i += isNaN(r) ? 0 : r;
    }
    return i;
};

const y = t => {
    let s = t.getBoundingClientRect().height;
    s += b(t, "marginTop", "marginBottom");
    return s;
};

const S = (t, s) => {
    const e = t.offsetParent;
    const i = t.offsetTop;
    if (null === e || e === s) return i;
    if (e.contains(s)) return i - s.offsetTop;
    return i + S(e, s);
};

const D = {
    height: 0,
    scrollTop: 0,
    scroller: null,
    width: 0
};

class VirtualRepeat {
    constructor(t, s, e, i, r, n) {
        var o;
        this.location = t;
        this.instruction = s;
        this.parent = e;
        this.f = i;
        this.c = r;
        this.items = void 0;
        this.views = [];
        this.task = null;
        this.i = D;
        this.itemHeight = 0;
        this.minViewsRequired = 0;
        this.dom = null;
        this.scrollerObserver = null;
        const l = s.props[0];
        const c = l.from;
        const h = this.iterable = null !== (o = C(c.iterable)) && void 0 !== o ? o : c.iterable;
        const a = this.u = c.iterable !== h;
        this.C = new CollectionObservationMediator(this, a ? "handleInnerCollectionChange" : "handleCollectionChange");
        this.local = c.declaration.name;
        this.taskQueue = n.domWriteQueue;
    }
    static get inject() {
        return [ h, a, u, f, s, d ];
    }
    attaching() {
        const t = this.c;
        const s = t.get(m);
        const e = this.collectionStrategy = s.getStrategy(this.items);
        const i = e.count();
        if (0 === i) return;
        const r = this.dom = t.get(v).render(this.location);
        const n = this.O();
        (this.scrollerObserver = t.get(g).getObserver(r.scroller)).subscribe(this);
        this.L(n);
        this.itemsChanged(this.items);
    }
    detaching() {
        var t;
        null === (t = this.task) || void 0 === t ? void 0 : t.cancel();
        this.T();
        this.dom.dispose();
        this.scrollerObserver.unsubscribe(this);
        this.dom = this.scrollerObserver = this.task = null;
    }
    L(t) {
        const s = y(t.nodes.firstChild);
        const e = this.scrollerObserver.getValue();
        const i = this.I(e, this.collectionStrategy.count(), s);
        if (1 & i.signals) this.T();
        if (0 === (2 & i.signals)) return;
        this.itemHeight = s;
        this.minViewsRequired = i.minViews;
    }
    I(t, s, e) {
        if (0 === s) return Calculation.reset;
        if (0 === e) return Calculation.none;
        const i = Math.floor(t.height / e);
        return Calculation.from(2, i);
    }
    T() {
        this.minViewsRequired = 0;
        this.itemHeight = 0;
    }
    itemsChanged(t) {
        const s = this.$controller;
        const e = this.collectionStrategy = this.c.get(m).getStrategy(t);
        const i = e.count();
        const r = this.views;
        const l = 2 * this.minViewsRequired;
        let c = 0;
        let h = r.length;
        let a = null;
        if (0 === i) {
            for (c = 0; h > c; ++c) {
                a = r[c];
                void a.deactivate(s, s, 4);
                a.nodes.remove();
            }
            r.length = 0;
            this.T();
            return;
        }
        if (h > l) {
            while (h > l) {
                a = r[h - 1];
                void a.deactivate(s, s, 4);
                a.nodes.remove();
                --h;
            }
            r.length = h;
        }
        if (h > i) {
            while (h > i) {
                a = r[h - 1];
                void a.deactivate(s, s, 4);
                a.nodes.remove();
                --h;
            }
            r.length = i;
        }
        h = r.length;
        const u = Math.min(l, i);
        for (c = h; c < u; c++) r.push(this.f.create());
        const f = this.itemHeight;
        const d = this.local;
        const {firstIndex: v, topCount: g, botCount: C} = this.measureBuffer(this.scrollerObserver.getValue(), r.length, i, f);
        let w = 0;
        let p;
        let b;
        let y;
        for (c = 0; u > c; ++c) {
            w = v + c;
            p = e.item(w);
            a = r[c];
            b = r[c - 1];
            if (a.isActive) {
                y = a.scope;
                y.bindingContext[d] = p;
                y.overrideContext.$index = w;
                y.overrideContext.$length = i;
            } else {
                a.nodes.insertBefore(b.nodes.firstChild.nextSibling);
                y = n.fromParent(s.scope, o.create(d, e.item(w)));
                y.overrideContext.$index = w;
                y.overrideContext.$length = i;
                T(y.overrideContext);
                void a.activate(s, s, 2, y);
            }
        }
        this.C.start(t);
        this.dom.update(g * f, C * f);
    }
    calcRealScrollTop(t) {
        const s = t.scrollTop;
        const e = S(this.dom.top, t.scroller);
        const i = Math.max(0, 0 === s ? 0 : s - e);
        return i;
    }
    measureBuffer(t, s, e, i) {
        const r = this.calcRealScrollTop(t);
        let n = 0 === r ? 0 : Math.floor(r / i);
        if (n + s >= e) n = Math.max(0, e - s);
        const o = n;
        const l = Math.max(0, e - o - s);
        return {
            firstIndex: n,
            topCount: o,
            botCount: l
        };
    }
    handleScrollerChange(t) {
        const s = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.handleScroll(t);
        }));
        null === s || void 0 === s ? void 0 : s.cancel();
    }
    handleScroll(t) {
        if (0 === this.itemHeight) return;
        const s = this.i;
        const e = this.local;
        const i = this.itemHeight;
        const r = this.dom;
        const n = this.views;
        const o = this.collectionStrategy;
        const l = n.length;
        const c = o.count();
        const h = n[0].scope.overrideContext.$index;
        const {firstIndex: a, topCount: u, botCount: f} = this.measureBuffer(t, l, c, i);
        const d = t.scrollTop > s.scrollTop;
        const v = d ? a >= h + l : a + l <= h;
        this.i = t;
        if (a === h) return;
        let g = null;
        let m = null;
        let C = 0;
        let w = 0;
        let p = 0;
        let b = 0;
        if (v) for (b = 0; l > b; ++b) {
            C = a + b;
            m = n[b].scope;
            m.bindingContext[e] = o.item(C);
            m.overrideContext.$index = C;
            m.overrideContext.$length = c;
        } else if (d) {
            w = a - h;
            while (w > 0) {
                g = n.shift();
                C = n[n.length - 1].scope.overrideContext["$index"] + 1;
                n.push(g);
                m = g.scope;
                m.bindingContext[e] = o.item(C);
                m.overrideContext.$index = C;
                m.overrideContext.$length = c;
                g.nodes.insertBefore(r.bottom);
                ++p;
                --w;
            }
        } else {
            w = h - a;
            while (w > 0) {
                C = h - (p + 1);
                g = n.pop();
                m = g.scope;
                m.bindingContext[e] = o.item(C);
                m.overrideContext.$index = C;
                m.overrideContext.$length = c;
                g.nodes.insertBefore(n[0].nodes.firstChild);
                n.unshift(g);
                ++p;
                --w;
            }
        }
        if (d) {
            if (o.isNearBottom(a + (l - 1))) ;
        } else if (o.isNearTop(n[0].scope.overrideContext["$index"])) ;
        r.update(u * i, f * i);
    }
    getDistances() {
        var t, s;
        return null !== (s = null === (t = this.dom) || void 0 === t ? void 0 : t.distances) && void 0 !== s ? s : [ 0, 0 ];
    }
    getViews() {
        return this.views.slice(0);
    }
    handleCollectionChange(t, s) {
        this.itemsChanged(this.items);
    }
    handleInnerCollectionChange() {
        const t = this.iterable.evaluate(0, this.parent.scope, this.c, null);
        const s = this.items;
        this.items = t;
        if (t === s) this.itemsChanged(t);
    }
    O() {
        const t = this.getOrCreateFirstView();
        const s = this.$controller;
        const e = this.collectionStrategy;
        const i = s.scope;
        const r = n.fromParent(i, o.create(this.local, e.first()));
        r.overrideContext.$index = 0;
        r.overrideContext.$length = e.count();
        T(r.overrideContext);
        t.nodes.insertBefore(this.dom.bottom);
        void t.activate(s, s, 0, r);
        return t;
    }
    getOrCreateFirstView() {
        const t = this.views;
        if (t.length > 0) return t[0];
        const s = this.f.create();
        t.push(s);
        return s;
    }
}

c({
    isTemplateController: true,
    name: "virtual-repeat",
    bindables: {
        local: {
            property: "local"
        },
        items: {
            property: "items",
            primary: true
        }
    }
})(VirtualRepeat);

class CollectionObservationMediator {
    constructor(t, s) {
        this.repeat = t;
        this.key = s;
    }
    handleCollectionChange(t, s) {
        this.repeat[this.key](t, s);
    }
    start(t) {
        var s;
        if (this.M === t) return;
        this.stop();
        if (null != t) null === (s = l(this.M = t)) || void 0 === s ? void 0 : s.subscribe(this);
    }
    stop() {
        var t;
        null === (t = l(this.M)) || void 0 === t ? void 0 : t.unsubscribe(this);
    }
}

var O;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["reset"] = 1] = "reset";
    t[t["has_sizing"] = 2] = "has_sizing";
})(O || (O = {}));

class Calculation {
    constructor(t, s) {
        this.signals = t;
        this.minViews = s;
    }
    static from(t, s) {
        return new Calculation(t, s);
    }
}

Calculation.reset = new Calculation(1, 0);

Calculation.none = new Calculation(0, 0);

const L = new WeakSet;

function T(t) {
    const s = t;
    if (L.has(s)) return;
    Object.defineProperties(s, {
        $first: I(R),
        $last: I(V),
        $middle: I(x),
        $even: I(E),
        $odd: I(M)
    });
}

function I(t) {
    return {
        configurable: true,
        enumerable: true,
        get: t
    };
}

function E() {
    return this.$index % 2 === 0;
}

function M() {
    return this.$index % 2 !== 0;
}

function R() {
    return 0 === this.$index;
}

function V() {
    return this.$index === this.$length - 1;
}

function x() {
    return this.$index > 0 && this.$index < this.$length - 1;
}

class CollectionStrategyLocator {
    static register(t) {
        return e.singleton(m, this).register(t);
    }
    getStrategy(t) {
        if (null == t) return new NullCollectionStrategy;
        if (t instanceof Array) return new ArrayCollectionStrategy(t);
        throw new Error(`Unable to find a strategy for collection type: ${typeof t}`);
    }
}

class ArrayCollectionStrategy {
    constructor(t) {
        this.val = t;
    }
    count() {
        return this.val.length;
    }
    first() {
        return this.val.length > 0 ? this.val[0] : null;
    }
    last() {
        return this.val.length > 0 ? this.val[this.val.length - 1] : null;
    }
    item(t) {
        var s;
        return null !== (s = this.val[t]) && void 0 !== s ? s : null;
    }
    range(t, s) {
        const e = this.val;
        const i = e.length;
        if (i > t && s > t) return e.slice(t, s);
        return [];
    }
    isNearTop(t) {
        return t < 5;
    }
    isNearBottom(t) {
        return t > this.val.length - 5;
    }
}

class NullCollectionStrategy {
    get val() {
        return null;
    }
    count() {
        return 0;
    }
    isNearTop() {
        return false;
    }
    isNearBottom() {
        return false;
    }
    first() {
        return null;
    }
    last() {
        return null;
    }
    item() {
        return null;
    }
    range() {
        return [];
    }
}

class ScrollerObserverLocator {
    constructor(t) {
        this.cache = new WeakMap;
        this.p = t;
    }
    static get inject() {
        return [ d ];
    }
    static register(t) {
        return e.singleton(g, this).register(t);
    }
    getObserver(t) {
        const s = this.cache;
        let e = s.get(t);
        if (!s.has(t)) s.set(t, e = new ScrollerObserver(this.p, t));
        return e;
    }
}

class ScrollerObserver {
    constructor(t, s) {
        this.p = t;
        this.scroller = s;
        this.subs = new Set;
        this.geo = null;
    }
    start() {
        this.scroller.addEventListener("scroll", this);
        const t = $(this.p);
        if ("function" === typeof t) (this.sizeObs = new t((t => {
            const s = this.geo;
            const e = new ElementGeometry(t[0].contentRect);
            if (!e.equals(s)) {
                this.geo = e;
                this.notify();
            }
        }))).observe(this.scroller);
    }
    stop() {
        var t;
        this.scroller.removeEventListener("scroll", this);
        null === (t = this.sizeObs) || void 0 === t ? void 0 : t.disconnect();
        this.sizeObs = void 0;
    }
    notify() {
        this.subs.forEach(N, this.getValue());
    }
    setValue() {
        throw new Error("scroller info is readonly");
    }
    getValue() {
        const t = this.scroller;
        const s = t.getBoundingClientRect();
        return new ScrollerInfo(t, t.scrollTop, s.width, s.height);
    }
    handleEvent(t) {
        this.notify();
    }
    subscribe(t) {
        if (0 === this.subs.size) this.start();
        this.subs.add(t);
    }
    unsubscribe(t) {
        const s = this.subs;
        if (s.has(t) && 1 === s.size) this.stop();
        s.delete(t);
    }
}

function N(t) {
    t.handleScrollerChange(this);
}

class ElementGeometry {
    constructor(t) {
        this.t = t.top;
        this.l = t.left;
        this.w = t.width;
        this.h = t.height;
    }
    equals(t) {
        if (null == t) return false;
        return this.t === t.t && this.l === t.l && this.w === t.w && this.h === t.h;
    }
}

class ScrollerInfo {
    constructor(t, s, e, i) {
        this.scroller = t;
        this.scrollTop = s;
        this.width = e;
        this.height = i;
    }
}

const $ = t => t.window.ResizeObserver;

class DefaultDomRenderer {
    constructor(t) {
        this.p = t;
    }
    static get inject() {
        return [ d ];
    }
    static register(t) {
        return e.singleton(v, this).register(t);
    }
    render(t) {
        const s = this.p.document;
        const e = t.parentNode;
        if (null === e) throw new Error("Invalid render target");
        let i;
        switch (e.tagName) {
          case "TBODY":
          case "THEAD":
          case "TFOOT":
          case "TABLE":
            i = A(s, "tr", t);
            return new TableDom(e.closest("table"), t, i[0], i[1]);

          case "UL":
          case "OL":
            i = A(s, "div", t);
            return new ListDom(e, t, i[0], i[1]);

          default:
            i = A(s, "div", t);
            return new DefaultDom(t, i[0], i[1]);
        }
    }
}

class DefaultDom {
    constructor(t, s, e) {
        this.anchor = t;
        this.top = s;
        this.bottom = e;
        this.tH = 0;
        this.bH = 0;
    }
    get scroller() {
        return w(this.anchor);
    }
    get distances() {
        return [ this.tH, this.bH ];
    }
    update(t, s) {
        this.top.style.height = `${this.tH = t}px`;
        this.bottom.style.height = `${this.bH = s}px`;
    }
    dispose() {
        this.top.remove();
        this.bottom.remove();
    }
}

class ListDom extends DefaultDom {
    constructor(t, s, e, i) {
        super(s, e, i);
        this.list = t;
    }
    get scroller() {
        return w(this.list);
    }
}

class TableDom extends DefaultDom {
    constructor(t, s, e, i) {
        super(s, e, i);
        this.table = t;
    }
    get scroller() {
        return w(this.table);
    }
}

function A(t, s, e) {
    const i = e.parentNode;
    return [ i.insertBefore(t.createElement(s), e), i.insertBefore(t.createElement(s), e) ];
}

const B = {
    register(t) {
        return t.register(ScrollerObserverLocator, CollectionStrategyLocator, DefaultDomRenderer, VirtualRepeat);
    }
};

export { CollectionStrategyLocator, DefaultDomRenderer, B as DefaultVirtualRepeatConfiguration, m as ICollectionStrategyLocator, v as IDomRenderer, g as IScrollerObsererLocator, ScrollerObserver, ScrollerObserverLocator, VirtualRepeat };
//# sourceMappingURL=index.mjs.map
