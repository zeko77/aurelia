import * as path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { getWebpackConfig } from './getWebpackConfig';

export function dev(cwd: string, sourceRoot: string, outRoot: string) {
  const config = getWebpackConfig(cwd, sourceRoot, outRoot);
  const compiler = webpack(config as webpack.Configuration);
  const devServerOptions: WebpackDevServer.Configuration = {
    contentBase: path.resolve(cwd, outRoot),
    historyApiFallback: true,
    lazy: false,
    open: true
  };

  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(8080, '127.0.0.1', (error) => {
    if (error) {
      console.error(error);
    }
  });
}
