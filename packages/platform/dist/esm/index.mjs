const s = new Map;

const t = s => () => {
    throw p(`AUR1005:${s}`);
};

class Platform {
    constructor(s, i = {}) {
        this.macroTaskRequested = false;
        this.macroTaskHandle = -1;
        this.globalThis = s;
        "decodeURI decodeURIComponent encodeURI encodeURIComponent Date Reflect console".split(" ").forEach((t => {
            this[t] = t in i ? i[t] : s[t];
        }));
        "clearInterval clearTimeout queueMicrotask setInterval setTimeout".split(" ").forEach((e => {
            this[e] = e in i ? i[e] : s[e]?.bind(s) ?? t(e);
        }));
        this.performanceNow = "performanceNow" in i ? i.performanceNow : s.performance?.now?.bind(s.performance) ?? t("performance.now");
        this.flushMacroTask = this.flushMacroTask.bind(this);
        this.taskQueue = new TaskQueue(this, this.requestMacroTask.bind(this), this.cancelMacroTask.bind(this));
    }
    static getOrCreate(t, i = {}) {
        let e = s.get(t);
        if (void 0 === e) s.set(t, e = new Platform(t, i));
        return e;
    }
    static set(t, i) {
        s.set(t, i);
    }
    requestMacroTask() {
        this.macroTaskRequested = true;
        if (-1 === this.macroTaskHandle) this.macroTaskHandle = this.setTimeout(this.flushMacroTask, 0);
    }
    cancelMacroTask() {
        this.macroTaskRequested = false;
        if (this.macroTaskHandle > -1) {
            this.clearTimeout(this.macroTaskHandle);
            this.macroTaskHandle = -1;
        }
    }
    flushMacroTask() {
        this.macroTaskHandle = -1;
        if (true === this.macroTaskRequested) {
            this.macroTaskRequested = false;
            this.taskQueue.flush();
        }
    }
}

class TaskQueue {
    constructor(s, t, i) {
        this.platform = s;
        this.$request = t;
        this.$cancel = i;
        this.t = void 0;
        this.i = 0;
        this.h = [];
        this.u = [];
        this.T = [];
        this.flushRequested = false;
        this.$ = void 0;
        this.R = [];
        this.A = 0;
        this.P = 0;
        this.M = 0;
        this.U = () => {
            if (!this.flushRequested) {
                this.flushRequested = true;
                this.P = this.platform.performanceNow();
                this.$request();
            }
        };
        this.I = new Tracer(s.console);
    }
    get processing() {
        return this.h;
    }
    get pending() {
        return this.u;
    }
    get delayed() {
        return this.T;
    }
    get isEmpty() {
        return 0 === this.i && 0 === this.h.length && 0 === this.u.length && 0 === this.T.length;
    }
    get _() {
        return 0 === this.i && this.h.every(f) && this.u.every(f) && this.T.every(f);
    }
    flush(s = this.platform.performanceNow()) {
        this.flushRequested = false;
        this.M = s;
        if (void 0 === this.t) {
            if (this.u.length > 0) {
                this.h.push(...this.u);
                this.u.length = 0;
            }
            if (this.T.length > 0) {
                let t = -1;
                while (++t < this.T.length && this.T[t].queueTime <= s) ;
                this.h.push(...this.T.splice(0, t));
            }
            let t;
            while (this.h.length > 0) {
                (t = this.h.shift()).run();
                if (1 === t.status) if (true === t.suspend) {
                    this.t = t;
                    this.U();
                    return;
                } else ++this.i;
            }
            if (this.u.length > 0) {
                this.h.push(...this.u);
                this.u.length = 0;
            }
            if (this.T.length > 0) {
                let t = -1;
                while (++t < this.T.length && this.T[t].queueTime <= s) ;
                this.h.push(...this.T.splice(0, t));
            }
            if (this.h.length > 0 || this.T.length > 0 || this.i > 0) this.U();
            if (void 0 !== this.$ && this._) {
                const s = this.$;
                this.$ = void 0;
                s.resolve();
            }
        } else this.U();
    }
    cancel() {
        if (this.flushRequested) {
            this.$cancel();
            this.flushRequested = false;
        }
    }
    async yield() {
        if (this.isEmpty) ; else {
            if (void 0 === this.$) this.$ = l();
            await this.$;
        }
    }
    queueTask(s, t) {
        const {delay: i, preempt: e, persistent: h, reusable: r, suspend: n} = {
            ...o,
            ...t
        };
        if (e) {
            if (i > 0) throw u();
            if (h) throw d();
        }
        if (0 === this.h.length) this.U();
        const a = this.platform.performanceNow();
        let c;
        if (r) {
            const t = this.R;
            const o = this.A - 1;
            if (o >= 0) {
                c = t[o];
                t[o] = void 0;
                this.A = o;
                c.reuse(a, i, e, h, n, s);
            } else c = new Task(this.I, this, a, a + i, e, h, n, r, s);
        } else c = new Task(this.I, this, a, a + i, e, h, n, r, s);
        if (e) this.h[this.h.length] = c; else if (0 === i) this.u[this.u.length] = c; else this.T[this.T.length] = c;
        return c;
    }
    remove(s) {
        let t = this.h.indexOf(s);
        if (t > -1) {
            this.h.splice(t, 1);
            return;
        }
        t = this.u.indexOf(s);
        if (t > -1) {
            this.u.splice(t, 1);
            return;
        }
        t = this.T.indexOf(s);
        if (t > -1) {
            this.T.splice(t, 1);
            return;
        }
        throw p(`Task #${s.id} could not be found`);
    }
    q(s) {
        this.R[this.A++] = s;
    }
    C(s) {
        s.reset(this.platform.performanceNow());
        if (s.createdTime === s.queueTime) this.u[this.u.length] = s; else this.T[this.T.length] = s;
    }
    N(s) {
        if (true === s.suspend) {
            if (this.t !== s) throw p(`Async task completion mismatch: suspenderTask=${this.t?.id}, task=${s.id}`);
            this.t = void 0;
        } else --this.i;
        if (void 0 !== this.$ && this._) {
            const s = this.$;
            this.$ = void 0;
            s.resolve();
        }
        if (this.isEmpty) this.cancel();
    }
}

class TaskAbortError extends Error {
    constructor(s) {
        super("Task was canceled.");
        this.task = s;
    }
}

let i = 0;

var e;

(function(s) {
    s[s["pending"] = 0] = "pending";
    s[s["running"] = 1] = "running";
    s[s["completed"] = 2] = "completed";
    s[s["canceled"] = 3] = "canceled";
})(e || (e = {}));

class Task {
    constructor(s, t, e, h, r, o, n, a, c) {
        this.taskQueue = t;
        this.createdTime = e;
        this.queueTime = h;
        this.preempt = r;
        this.persistent = o;
        this.suspend = n;
        this.reusable = a;
        this.callback = c;
        this.id = ++i;
        this.j = void 0;
        this.F = void 0;
        this.O = void 0;
        this.W = 0;
        this.I = s;
    }
    get result() {
        const s = this.O;
        if (void 0 === s) switch (this.W) {
          case 0:
            {
                const s = this.O = l();
                this.j = s.resolve;
                this.F = s.reject;
                return s;
            }

          case 1:
            throw p("Trying to await task from within task will cause a deadlock.");

          case 2:
            return this.O = Promise.resolve();

          case 3:
            return this.O = Promise.reject(new TaskAbortError(this));
        }
        return s;
    }
    get status() {
        return this.W;
    }
    run(s = this.taskQueue.platform.performanceNow()) {
        if (0 !== this.W) throw p(`Cannot run task in ${this.W} state`);
        const {persistent: t, reusable: i, taskQueue: e, callback: h, j: r, F: o, createdTime: n} = this;
        let a;
        this.W = 1;
        try {
            a = h(s - n);
            if (a instanceof Promise) a.then((s => {
                if (this.persistent) e.C(this); else {
                    if (t) this.W = 3; else this.W = 2;
                    this.dispose();
                }
                e.N(this);
                if (false && this.I.enabled) ;
                if (void 0 !== r) r(s);
                if (!this.persistent && i) e.q(this);
            })).catch((s => {
                if (!this.persistent) this.dispose();
                e.N(this);
                if (false && this.I.enabled) ;
                if (void 0 !== o) o(s); else throw s;
            })); else {
                if (this.persistent) e.C(this); else {
                    if (t) this.W = 3; else this.W = 2;
                    this.dispose();
                }
                if (false && this.I.enabled) ;
                if (void 0 !== r) r(a);
                if (!this.persistent && i) e.q(this);
            }
        } catch (s) {
            if (!this.persistent) this.dispose();
            if (void 0 !== o) o(s); else throw s;
        }
    }
    cancel() {
        if (0 === this.W) {
            const s = this.taskQueue;
            const t = this.reusable;
            const i = this.F;
            s.remove(this);
            if (s.isEmpty) s.cancel();
            this.W = 3;
            this.dispose();
            if (t) s.q(this);
            if (void 0 !== i) i(new TaskAbortError(this));
            return true;
        } else if (1 === this.W && this.persistent) {
            this.persistent = false;
            return true;
        }
        return false;
    }
    reset(s) {
        const t = this.queueTime - this.createdTime;
        this.createdTime = s;
        this.queueTime = s + t;
        this.W = 0;
        this.j = void 0;
        this.F = void 0;
        this.O = void 0;
    }
    reuse(s, t, i, e, h, r) {
        this.createdTime = s;
        this.queueTime = s + t;
        this.preempt = i;
        this.persistent = e;
        this.suspend = h;
        this.callback = r;
        this.W = 0;
    }
    dispose() {
        this.callback = void 0;
        this.j = void 0;
        this.F = void 0;
        this.O = void 0;
    }
}

var h;

(function(s) {
    s[s["render"] = 0] = "render";
    s[s["macroTask"] = 1] = "macroTask";
    s[s["postRender"] = 2] = "postRender";
})(h || (h = {}));

class Tracer {
    constructor(s) {
        this.console = s;
        this.enabled = false;
        this.depth = 0;
    }
    enter(s, t) {
        this.log(`${"  ".repeat(this.depth++)}> `, s, t);
    }
    leave(s, t) {
        this.log(`${"  ".repeat(--this.depth)}< `, s, t);
    }
    trace(s, t) {
        this.log(`${"  ".repeat(this.depth)}- `, s, t);
    }
    log(s, t, i) {
        if (t instanceof TaskQueue) {
            const e = t["processing"].length;
            const h = t["pending"].length;
            const r = t["delayed"].length;
            const o = t["flushRequested"];
            const n = !!t.t;
            const a = `processing=${e} pending=${h} delayed=${r} flushReq=${o} susTask=${n}`;
            this.console.log(`${s}[Q.${i}] ${a}`);
        } else {
            const e = t["id"];
            const h = Math.round(10 * t["createdTime"]) / 10;
            const o = Math.round(10 * t["queueTime"]) / 10;
            const n = t["preempt"];
            const a = t["reusable"];
            const c = t["persistent"];
            const l = t["suspend"];
            const f = r(t["W"]);
            const u = `id=${e} created=${h} queue=${o} preempt=${n} persistent=${c} reusable=${a} status=${f} suspend=${l}`;
            this.console.log(`${s}[T.${i}] ${u}`);
        }
    }
}

const r = s => {
    switch (s) {
      case 0:
        return "pending";

      case 1:
        return "running";

      case 3:
        return "canceled";

      case 2:
        return "completed";
    }
};

const o = {
    delay: 0,
    preempt: false,
    persistent: false,
    reusable: true,
    suspend: false
};

let n;

let a;

const c = (s, t) => {
    n = s;
    a = t;
};

const l = () => {
    const s = new Promise(c);
    s.resolve = n;
    s.reject = a;
    return s;
};

const f = s => s.persistent;

const u = () => p(`AUR1006`);

const d = () => p(`AUR1007`);

const p = s => new Error(s);

export { Platform, Task, TaskAbortError, TaskQueue, h as TaskQueuePriority, e as TaskStatus };
//# sourceMappingURL=index.mjs.map
