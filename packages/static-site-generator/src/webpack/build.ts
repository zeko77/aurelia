import webpack from "webpack";
import { getWebpackConfig } from './getWebpackConfig';

export function build(cwd: string, sourceRoot: string, outRoot: string) {
  webpack(
    getWebpackConfig(cwd, sourceRoot, outRoot),
    (err, stats) => {
      if (err || stats.hasErrors()) {
        throw new Error(err?.message ?? stats.toString("errors-warnings"))
      }
    }
  );
}
