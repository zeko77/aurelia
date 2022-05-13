import { Transform } from 'stream';
import { preprocess, preprocessOptions } from '@aurelia/plugin-conventions';

function index (options = {}) {
    return plugin({
        ...options,
        useProcessedFilePairFilename: true,
        stringModuleWrap
    });
}
function plugin(options, _preprocess = preprocess) {
    const allOptions = preprocessOptions(options);
    return new Transform({
        objectMode: true,
        transform: function (file, enc, cb) {
            if (file.isStream()) {
                this.emit('error', new Error('@aurelia/plugin-gulp: Streaming is not supported'));
            }
            else if (file.isBuffer()) {
                const result = _preprocess({
                    path: file.relative,
                    contents: file.contents.toString(),
                    base: file.base
                }, allOptions);
                if (result) {
                    if (allOptions.templateExtensions.includes(file.extname)) {
                        file.basename += '.js';
                    }
                    file.contents = Buffer.from(result.code);
                    if (file.sourceMap) {
                        file.sourceMap = result.map;
                    }
                }
            }
            cb(undefined, file);
        }
    });
}
function stringModuleWrap(id) {
    return `text!${id}`;
}

export { index as default, plugin };
//# sourceMappingURL=index.mjs.map
