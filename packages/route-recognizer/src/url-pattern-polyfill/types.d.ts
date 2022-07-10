export type URLPatternInput = Exclude<URLPatternInit, 'caseSensitivePath'>;

export declare class URLPattern {
  public constructor(init?: URLPatternInit, baseURL?: string);

  public test(input: URLPatternInput | string, baseURL?: string): boolean;

  public exec(input: URLPatternInput | string, baseURL?: string): URLPatternResult | null;

  public readonly protocol: string;
  public readonly username: string;
  public readonly password: string;
  public readonly hostname: string;
  public readonly port: string;
  public readonly pathname: string;
  public readonly search: string;
  public readonly hash: string;
}

interface URLPatternInit {
  baseURL?: string;
  username?: string;
  password?: string;
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  caseSensitivePath?: boolean;
}

export interface URLPatternResult {
  inputs: [URLPatternInit] | [string, string];
  protocol: URLPatternComponentResult;
  username: URLPatternComponentResult;
  password: URLPatternComponentResult;
  hostname: URLPatternComponentResult;
  port: URLPatternComponentResult;
  pathname: URLPatternComponentResult;
  search: URLPatternComponentResult;
  hash: URLPatternComponentResult;
}

export interface URLPatternComponentResult {
  input: string;
  groups: {
    [key: string]: string | undefined;
  };
}
