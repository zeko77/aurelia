var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { valueConverter } from '@aurelia/runtime-html';
export function createSpecFunction(wrap) {
    function $it(title, testFunction, setupContext) {
        it(title, async function () {
            if ((setupContext === null || setupContext === void 0 ? void 0 : setupContext.timeout) !== void 0) {
                this.timeout(setupContext.timeout);
            }
            await wrap.bind(this)(testFunction.bind(this), setupContext);
        });
    }
    $it.only = function (title, testFunction, setupContext) {
        // eslint-disable-next-line mocha/no-exclusive-tests
        it.only(title, async function () { await wrap.bind(this)(testFunction.bind(this), setupContext); });
    };
    $it.skip = function (title, testFunction, setupContext) {
        // eslint-disable-next-line mocha/no-skipped-tests
        return it.skip(title, async function () { await wrap.bind(this)(testFunction.bind(this), setupContext); });
    };
    return $it;
}
let ToNumberValueConverter = class ToNumberValueConverter {
    fromView(value) { return Number(value) || void 0; }
};
ToNumberValueConverter = __decorate([
    valueConverter('toNumber')
], ToNumberValueConverter);
export { ToNumberValueConverter };
export class TickLogger {
    constructor() {
        this.ticks = 0;
        this.running = false;
        this.cb = null;
    }
    start() {
        this.running = true;
        const next = () => {
            var _a;
            ++this.ticks;
            (_a = this.cb) === null || _a === void 0 ? void 0 : _a.call(void 0);
            if (this.running) {
                void Promise.resolve().then(next);
            }
        };
        void Promise.resolve().then(next);
    }
    stop() {
        this.running = false;
    }
    onTick(cb) {
        this.cb = cb;
    }
}
//# sourceMappingURL=util.js.map