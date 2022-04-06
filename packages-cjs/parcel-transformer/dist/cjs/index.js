'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('@parcel/plugin');
var SourceMap = require('@parcel/source-map');
var pluginConventions = require('@aurelia/plugin-conventions');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SourceMap__default = /*#__PURE__*/_interopDefaultLegacy(SourceMap);

var index = new plugin.Transformer({
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
        // parcel conventions puts app's index.html inside src/ folder.
        if (asset.filePath.endsWith('src/index.html'))
            return [asset];
        const auOptions = pluginConventions.preprocessOptions(config);
        // after html template is compiled to js, parcel will apply full js transformers chain,
        // we need to skip them here, then parcel will apply the rest standard js chain.
        if (asset.type === 'js' && auOptions.templateExtensions.includes(path.extname(asset.filePath))) {
            return [asset];
        }
        const source = await asset.getCode();
        const result = pluginConventions.preprocess({
            path: path.relative(options.projectRoot, asset.filePath.slice()),
            contents: source
        }, auOptions);
        if (!result) {
            return [asset];
        }
        asset.setCode(result.code);
        const map = new SourceMap__default['default']();
        map.addVLQMap(result.map);
        asset.setMap(map);
        if (auOptions.templateExtensions.includes(`.${asset.type}`)) {
            asset.type = 'js';
        }
        // Return the asset
        return [asset];
    }
});

exports['default'] = index;
//# sourceMappingURL=index.js.map
