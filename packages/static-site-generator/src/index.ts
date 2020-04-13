#!/usr/bin/env node

import yargs from "yargs";
import { build } from './webpack/build';
import { dev } from './webpack/dev';

const cwd = process.cwd();
const options: Record<string, yargs.Options> = {
  source: { alias: 's', describe: 'docs source root' },
  out: { alias: 'o', describe: 'docs output root' }
};

yargs
  .scriptName('au2-md-app')
  .command(
    'build',
    'builds the doc',
    options,
    function (argv) {
      build(cwd, argv.source as string, argv.out as string);
    })
  .command(
    'dev',
    'runs server to host the doc',
    options,
    function (argv) {
      dev(cwd, argv.source as string, argv.out as string);
    })
  .help()
  .argv;
