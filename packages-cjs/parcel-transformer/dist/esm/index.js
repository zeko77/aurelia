import { Transformer } from '@parcel/plugin';
import SourceMap from '@parcel/source-map';
import { preprocess } from '@aurelia/plugin-conventions';
import { relative } from 'path';

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
        // parcel conventions puts app's index.html inside src/ folder.
        if (asset.filePath.endsWith('src/index.html'))
            return [asset];
        const source = await asset.getCode();
        const result = preprocess({
            path: relative(options.projectRoot, asset.filePath.slice()),
            contents: source
        }, config);
        if (!result) {
            return [asset];
        }
        asset.setCode(result.code);
        const map = new SourceMap();
        map.addVLQMap(result.map);
        asset.setMap(map);
        if (asset.type === 'html') {
            asset.type = 'js';
        }
        // Return the asset
        return [asset];
    }
});

export { index as default };
//# sourceMappingURL=index.js.map
