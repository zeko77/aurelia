import * as path from "path";
import webpack from "webpack";
import { AureliaMarkdownAppPlugin, entryFileName } from './au-markdown-app-plugin';
import HTMLWebpackPlugin from "html-webpack-plugin";

export function getWebpackConfig(cwd: string, sourceRoot: string, outRoot: string): webpack.Configuration | webpack.ConfigurationFactory {
  return {
    mode: 'production',
    entry: path.resolve(cwd, sourceRoot, entryFileName),
    output: {
      path: path.resolve(cwd, outRoot),
      publicPath: '/',
      filename: "[name].[chunkhash].js",
      sourceMapFilename: "[name].[chunkhash].bundle.map",
      chunkFilename: "[name].[chunkhash].js",
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        { test: /\.ts$/i, loader: 'ts-loader' },
        { test: /\.html$/i, loader: 'html-loader' }
      ]
    },
    plugins: [
      new AureliaMarkdownAppPlugin({ source: sourceRoot, out: outRoot }),
      new HTMLWebpackPlugin({ template: path.resolve(__dirname, '..', '..', 'templates', 'index.html.ejs') }) as any,
    ]
  };
}
