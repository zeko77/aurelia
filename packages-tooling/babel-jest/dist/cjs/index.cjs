'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pluginConventions = require('@aurelia/plugin-conventions');
var babelTransformer = require('babel-jest');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

var babelTransformer__default = /*#__PURE__*/_interopDefaultLegacy(babelTransformer);

function _createTransformer(conventionsOptions = {}, _preprocess = pluginConventions.preprocess, _babelProcess = babelTransformer__default.process.bind(babelTransformer__default)) {
    const au2Options = pluginConventions.preprocessOptions(conventionsOptions);
    function getCacheKey(fileData, filePath, options) {
        const babelKey = babelTransformer__default.getCacheKey(fileData, filePath, options);
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
        canInstrument: babelTransformer__default.canInstrument,
        getCacheKey,
        process
    };
}
function createTransformer(conventionsOptions = {}) {
    return _createTransformer(conventionsOptions);
}
const { canInstrument, getCacheKey, process } = createTransformer();
var index = { canInstrument, getCacheKey, process, createTransformer, _createTransformer };

exports["default"] = index;
//# sourceMappingURL=index.cjs.map
