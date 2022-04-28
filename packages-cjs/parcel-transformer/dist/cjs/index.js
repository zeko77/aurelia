"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("@parcel/plugin");
const source_map_1 = require("@parcel/source-map");
const plugin_conventions_1 = require("@aurelia/plugin-conventions");
// eslint-disable-next-line import/no-nodejs-modules
const path_1 = require("path");
exports.default = new plugin_1.Transformer({
    async loadConfig({ config }) {
        try {
            const conf = await config.getConfig([], { packageKey: 'aurelia' });
            return conf ? conf.contents : {};
        }
        catch (e) {
            return {};
        }
    },
    async transform({ asset, config, options }) {
        const source = await asset.getCode();
        // leave the initial index.html for parcel.
        if (asset.type === 'html' && (/^\s*<!DOCTYPE/i).exec(source))
            return [asset];
        const auOptions = (0, plugin_conventions_1.preprocessOptions)({
            ...config,
            stringModuleWrap: (id) => `bundle-text:${id}`
        });
        // after html template is compiled to js, parcel will apply full js transformers chain,
        // we need to skip them here, then parcel will apply the rest standard js chain.
        if (asset.type === 'js' && auOptions.templateExtensions.includes((0, path_1.extname)(asset.filePath))) {
            return [asset];
        }
        const result = (0, plugin_conventions_1.preprocess)({
            path: (0, path_1.relative)(options.projectRoot, asset.filePath.slice()),
            contents: source
        }, auOptions);
        if (!result) {
            return [asset];
        }
        asset.setCode(result.code);
        const map = new source_map_1.default();
        map.addVLQMap(result.map);
        asset.setMap(map);
        if (auOptions.templateExtensions.includes(`.${asset.type}`)) {
            asset.type = 'js';
        }
        // Return the asset
        return [asset];
    }
});
//# sourceMappingURL=index.js.map