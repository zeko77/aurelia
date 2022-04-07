import { Transformer } from '@parcel/plugin';
import SourceMap from '@parcel/source-map';
import { preprocessOptions, preprocess } from '@aurelia/plugin-conventions';
import { extname, relative } from 'path';

var index = new Transformer({
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
        const auOptions = preprocessOptions({
            ...config,
            stringModuleWrap: (id) => `bundle-text:${id}`
        });
        // after html template is compiled to js, parcel will apply full js transformers chain,
        // we need to skip them here, then parcel will apply the rest standard js chain.
        if (asset.type === 'js' && auOptions.templateExtensions.includes(extname(asset.filePath))) {
            return [asset];
        }
        const result = preprocess({
            path: relative(options.projectRoot, asset.filePath.slice()),
            contents: source
        }, auOptions);
        if (!result) {
            return [asset];
        }
        asset.setCode(result.code);
        const map = new SourceMap();
        map.addVLQMap(result.map);
        asset.setMap(map);
        if (auOptions.templateExtensions.includes(`.${asset.type}`)) {
            asset.type = 'js';
        }
        // Return the asset
        return [asset];
    }
});

export { index as default };
//# sourceMappingURL=index.js.map
