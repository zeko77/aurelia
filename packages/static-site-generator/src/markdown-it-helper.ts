import markdownIt from "markdown-it";
import matter from "gray-matter";
import { PLATFORM } from '@aurelia/kernel';

export const md = markdownIt({ html: true, linkify: true })
  .use(require("markdown-it-front-matter"), PLATFORM.noop);

function renderFrontMatter(tokens: any, idx: any, _options: any, env: any, _renderer: any) {
  const token = tokens[idx];
  env.frontMatter = matter(token.markup).data;
  return '';
}

md.renderer.rules['front_matter'] = renderFrontMatter;
