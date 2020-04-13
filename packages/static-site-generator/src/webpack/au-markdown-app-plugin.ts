import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import validateOptions from "schema-utils";
import { Compiler } from 'webpack';
import { md } from '../markdown-it-helper';
import { ParsedMarkdownInfo } from '../ParsedMarkdownInfo';

export const entryFileName = '.tmp/index.ts';
const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, '..', '..', 'templates', 'setup.ts.ejs'), 'utf8'));

const schema = {
  type: 'object',
  properties: {
    source: { type: 'string' },
    out: { type: 'string' }
  },
  additionalProperties: false,
};

export interface PluginOptions {
  source: string;
  out: string;
}
const pluginName = "AureliaMarkdownAppPlugin";
export class AureliaMarkdownAppPlugin {
  private readonly parsed: ParsedMarkdownInfo[] = [];
  private readonly home!: ParsedMarkdownInfo;
  private readonly sourceRoot: string;
  private readonly outRoot: string;
  public constructor(
    options: PluginOptions
  ) {
    validateOptions(schema, options, pluginName);
    const root = this.sourceRoot = options.source;
    this.outRoot = options.out;

    this.parse(root, root);
    this.processTemplates();
    const entryFilePath = path.resolve(process.cwd(), this.sourceRoot, entryFileName);
    fs.mkdirSync(path.dirname(entryFilePath), { recursive: true });

    fs.writeFileSync(
      entryFilePath,
      template({ root, customElements: this.parsed })
    );
  }

  public apply(compiler: Compiler) {

    compiler.hooks.emit.tap(pluginName, (...params) => {
      // emit the entry htmls for every MD
    });

  }

  private parse(root: string, sourceRoot: string) {
    for (const item of fs.readdirSync(root)) {
      const qualifiedPath = path.join(root, item);

      if (!fs.statSync(qualifiedPath).isDirectory()) {

        const extName = path.extname(qualifiedPath);
        const fileName = path.basename(qualifiedPath, extName);
        if (extName !== ".md") {
          console.log(`skipping ${qualifiedPath}`);
          continue;
        }

        const relativeSrcPath = path.relative(this.sourceRoot, root);
        const outputDir = path.resolve(this.outRoot, relativeSrcPath);
        fs.mkdirSync(outputDir, { recursive: true });

        const env = { frontMatter: undefined };
        const html = md.render(fs.readFileSync(qualifiedPath, "utf8"), env);
        this.parsed.push(
          new ParsedMarkdownInfo(qualifiedPath, html, sourceRoot, env.frontMatter)
        );
      } else {
        this.parse(qualifiedPath, sourceRoot);
      }
    }
  }

  private processTemplates() {
    const customElements = this.parsed;

    if (customElements.find((i) => i.isHome) === void 0) { throw new Error('No home configured'); }

    const ceMap = customElements
      .reduce((acc: Record<string, string>, item) => {
        acc[item.path] = item.customElementName;
        return acc;
      }, {});

    for (const ce of customElements) {
      ce.processTemplate(ceMap);
    }
  }
}
