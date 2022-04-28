"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceName = void 0;
const path = require("path");
const kernel_1 = require("@aurelia/kernel");
// a/foo-bar.xxx -> "foo-bar"
// a/fooBar.xxx -> "foo-bar"
// a/foo-bar/index.xxx -> "foo-bar"
// a/fooBar/index.xxx -> "foo-bar"
function resourceName(filePath) {
    const parsed = path.parse(filePath);
    const name = parsed.name === 'index' ? path.basename(parsed.dir) : parsed.name;
    return (0, kernel_1.kebabCase)(name);
}
exports.resourceName = resourceName;
//# sourceMappingURL=resource-name.js.map