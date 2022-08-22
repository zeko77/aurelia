import { preprocessOptions, preprocess } from '@aurelia/plugin-conventions';
import * as babelJest from 'babel-jest';

const babelTransformer = babelJest.createTransformer();
function _createTransformer(conventionsOptions = {}, _preprocess = preprocess, _babelProcess = babelTransformer.process.bind(babelTransformer)) {
    const au2Options = preprocessOptions(conventionsOptions);
    function getCacheKey(fileData, filePath, options) {
        const babelKey = babelTransformer.getCacheKey(fileData, filePath, options);
        return `${babelKey}:${JSON.stringify(au2Options)}`;
    }
    function process(sourceText, sourcePath, transformOptions) {
        const result = _preprocess({ path: sourcePath, contents: sourceText }, au2Options);
        if (result !== undefined) {
            return _babelProcess(result.code, sourcePath, transformOptions);
        }
        return _babelProcess(sourceText, sourcePath, transformOptions);
    }
    return {
        canInstrument: babelTransformer.canInstrument,
        getCacheKey,
        process
    };
}
function createTransformer(conventionsOptions = {}) {
    return _createTransformer(conventionsOptions);
}
const { canInstrument, getCacheKey, process } = createTransformer();
var index = { canInstrument, getCacheKey, process, createTransformer, _createTransformer };

export { index as default };
//# sourceMappingURL=index.mjs.map
