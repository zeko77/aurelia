import { JSDOM } from "jsdom";
import * as $path from "path";

export class ParsedMarkdownInfo {
  public readonly customElementName: string;
  public readonly isHome: boolean;
  public constructor(
    public path: string,
    public template: string,
    private readonly sourceRoot: string,
    private readonly frontMatter?: Partial<FrontMatter>,
  ) {
    const isHome = this.isHome = frontMatter?.isHome === true;
    this.customElementName = isHome
      ? 'home'
      : (frontMatter?.id || $path.relative(sourceRoot, this.path))
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s+\\/]/g, '-')
        .replace('.md', '')
        .toLowerCase();
  }

  public processTemplate(ceMap: Record<string, string | undefined>) {
    const doc = new JSDOM(this.template).window.document;
    this.adjustTitle(doc);
    this.adjustUrls(doc, ceMap);
    this.template = doc.querySelector('body')!.innerHTML;
  }

  private adjustTitle(doc: Document) {
    const firstChild = doc.firstElementChild;
    const description = this.frontMatter?.description;
    if (firstChild?.tagName === 'H1' && description !== undefined) {
      const descEl = doc.createElement('small');
      descEl.textContent = description;
      doc.insertBefore(descEl, firstChild.nextElementSibling);
      doc.insertBefore(doc.createElement('hr'), descEl.nextElementSibling);
    }
  }

  private adjustUrls(doc: Document, ceMap: Record<string, string | undefined>) {
    const anchors = Array.from(doc.querySelectorAll('a'));
    for (const anchor of anchors) {
      const url = anchor.href;
      if (url.match(/^[a-z][a-z0-9+-.]*:\/\//)) { continue; } // ignore fully qualified urls

      const parsed = new URL(url, 'http://localhost');
      const ceName = ceMap[$path.join(this.sourceRoot, parsed.pathname)];
      if (ceName === undefined) { continue; }

      const href = `/${ceName}${parsed.hash ? `#${parsed.hash}` : ''}`;
      anchor.href = href;
      // anchor.setAttribute('goto', href);
      // anchor.removeAttribute('href');
    }
  }
}

export interface FrontMatter {
  id: string;
  isHome: boolean;
  description: string;
}
