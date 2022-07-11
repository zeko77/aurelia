// The tests are migrated from the OG polyfill repo: https://github.com/kenchris/urlpattern-polyfill

import { assert } from '@aurelia/testing';
import { URLPattern, URLPatternInit, URLPatternInput, URLPatternResult } from '@aurelia/route-recognizer';

describe('URLPattern', function () {
  class URLPatternTestData {
    public constructor(
      public readonly pattern: [] | [URLPatternInit] | [string, string?] | [URLPatternInit, string],
      public readonly inputs: [] | [URLPatternInput] | [string, string?] | [URLPatternInit, string] | undefined,
      public readonly expected_match: Partial<URLPatternResult> | null | 'error',
      public readonly expected_obj: Partial<Exclude<URLPatternInit, 'caseSensitivePath'>> | 'error' = {},
      public readonly exactly_empty_components?: string[],
    ) {
      if (expected_match != null && expected_match !== 'error' && !expected_match.inputs) {
        expected_match.inputs = inputs as [URLPatternInit];
      }
    }
  }

  /**
   * Note that the original data json is kept around to migrate new tests easily,
   * just in case we need to support this polyfill for a longer time.
   */

  function* getData(): Generator<URLPatternTestData> {
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/ba' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/bar/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      ['https://example.com/foo/bar'],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: { '0': 'https' } },
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      ['https://example.com/foo/bar/baz'],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ hostname: 'example.com', pathname: '/foo/bar' }],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo/bar', groups: {} },
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ hostname: 'example.com', pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/bar', baseURL: 'https://example.com' }],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: { '0': 'https' } },
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{
        pathname: '/foo/bar/baz',
        baseURL: 'https://example.com'
      }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{ pathname: '/foo/bar' }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{ hostname: 'example.com', pathname: '/foo/bar' }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar'
      }],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar'
      }],
      {
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: {} }
      },
      undefined,
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar/baz'
      }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar', search: 'otherquery',
        hash: 'otherhash'
      }],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar', search: 'otherquery',
        hash: 'otherhash'
      }],
      null,
      undefined,
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?otherquery#otherhash'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar', search: 'otherquery',
        hash: 'otherhash'
      }],
      {
        hash: { input: 'otherhash', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: {} },
        search: { input: 'otherquery', groups: {} }
      },
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      ['https://example.com/foo/bar'],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      ['https://example.com/foo/bar?otherquery#otherhash'],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      ['https://example.com/foo/bar?query#hash'],
      {
        hash: { input: 'hash', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: {} },
        search: { input: 'query', groups: {} }
      },
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      ['https://example.com/foo/bar/baz'],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      ['https://other.com/foo/bar'],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      ['http://other.com/foo/bar'],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{ pathname: '/foo/bar', baseURL: 'https://example.com' }],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      {
        hash: { input: 'hash', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: {} },
        search: { input: 'query', groups: {} }
      },
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{
        pathname: '/foo/bar/baz',
        baseURL: 'https://example.com'
      }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{ pathname: '/foo/bar', baseURL: 'https://other.com' }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      [{ pathname: '/foo/bar', baseURL: 'http://example.com' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { 'bar': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/([^\\/]+?)' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar' }],
      [{ pathname: '/foo/index.html' }],
      {
        pathname: { input: '/foo/index.html', groups: { 'bar': 'index.html' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar' }],
      [{ pathname: '/foo/bar/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar' }],
      [{ pathname: '/foo/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      },
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      },
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      },
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)' }],
      [{ pathname: '/foo' }],
      null,
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*' }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { 'bar': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { 'bar': 'bar/baz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { 'bar': '' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)' }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { 'bar': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?' }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { 'bar': null } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?' }],
      [{ pathname: '/foo/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?' }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?' }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { 'bar': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { 'bar': 'bar/baz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+' }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+' }],
      [{ pathname: '/foo/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+' }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { 'bar': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { 'bar': 'bar/baz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*' }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { 'bar': null } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*' }],
      [{ pathname: '/foo/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*' }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      },
      {
        pathname: '/foo/*?'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      },
      {
        pathname: '/foo/*?'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?' }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { '0': null } }
      },
      {
        pathname: '/foo/*?'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?' }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { '0': null } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      },
      {
        pathname: '/foo/*?'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?' }],
      [{ pathname: '/foobar' }],
      null,
      {
        pathname: '/foo/*?'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?' }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?' }],
      [{ pathname: '/fo' }],
      null,
      {
        pathname: '/foo/*?'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?' }],
      [{ pathname: '/fo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      },
      {
        pathname: '/foo/*+'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      },
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+' }],
      [{ pathname: '/foo' }],
      null,
      {
        pathname: '/foo/*+'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+' }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      },
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+' }],
      [{ pathname: '/foobar' }],
      null,
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+' }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+' }],
      [{ pathname: '/fo' }],
      null,
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+' }],
      [{ pathname: '/fo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      },
      { pathname: '/foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*' }],
      [{ pathname: '/foo/bar/baz' }],
      { pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } } },
      { pathname: '/foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**' }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*' }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { '0': null } }
      },
      {
        pathname: '/foo/**'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**' }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { '0': null } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      },
      {
        pathname: '/foo/**'
      },

    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**' }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*' }],
      [{ pathname: '/foobar' }],
      null,
      { pathname: '/foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**' }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*' }],
      [{ pathname: '/fo' }],
      null,
      { pathname: '/foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**' }],
      [{ pathname: '/fo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}' }],
      [{ pathname: '/foo/bar' }],
      { pathname: { input: '/foo/bar', groups: {} } },
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}' }],
      [{ pathname: '/foo/bar/baz' }],
      null,
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}' }],
      [{ pathname: '/foo' }],
      null,
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}' }],
      [{ pathname: '/foo/' }],
      null,
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?' }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?' }],
      [{ pathname: '/foo' }],
      {
        pathname: { input: '/foo', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?' }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+' }],
      [{ pathname: '/foo/bar/bar' }],
      {
        pathname: { input: '/foo/bar/bar', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+' }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+' }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+' }],
      [{ pathname: '/foo/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*' }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*' }],
      [{ pathname: '/foo/bar/bar' }],
      {
        pathname: { input: '/foo/bar/bar', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*' }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*' }],
      [{ pathname: '/foo' }],
      {
        pathname: { input: '/foo', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*' }],
      [{ pathname: '/foo/' }],
      null,
    );

    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR' }],
      {
        pathname: { input: '/fOo/baR', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ pathname: '/foo/ba' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      ['https://example.com/fOo/baR'],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/fOo/baR', groups: {} },
        protocol: { input: 'https', groups: { '0': 'https' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      ['https://example.com/foo/bar/baz'],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ hostname: 'example.com', pathname: '/fOo/baR' }],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/fOo/baR', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ hostname: 'example.com', pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR', baseURL: 'https://example.com' }],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/fOo/baR', groups: {} },
        protocol: { input: 'https', groups: { '0': 'https' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar', caseSensitivePath: false }],
      [{
        pathname: '/foo/bar/baz',
        baseURL: 'https://example.com'
      }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{ pathname: '/foo/bar' }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{ hostname: 'example.com', pathname: '/foo/bar' }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar'
      }],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com',
        caseSensitivePath: false
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/fOo/baR'
      }],
      {
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/fOo/baR', groups: {} },
        protocol: { input: 'https', groups: {} }
      },
      undefined,
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com',
        caseSensitivePath: false
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar/baz'
      }],
      null
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar', search: 'otherquery',
        hash: 'otherhash'
      }],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com',
        caseSensitivePath: false
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar', search: 'otherquery',
        hash: 'otherhash'
      }],
      null,
      undefined,
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?otherquery#otherhash'
      }],
      [{
        protocol: 'https', hostname: 'example.com',
        pathname: '/foo/bar', search: 'otherquery',
        hash: 'otherhash'
      }],
      {
        hash: { input: 'otherhash', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: {} },
        search: { input: 'otherquery', groups: {} }
      },
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      ['https://example.com/foo/bar'],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      ['https://example.com/foo/bar?otherquery#otherhash'],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      ['https://example.com/fOo/baR?query#hash'],
      {
        hash: { input: 'hash', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/fOo/baR', groups: {} },
        protocol: { input: 'https', groups: {} },
        search: { input: 'query', groups: {} }
      },
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      ['https://example.com/foo/bar/baz'],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      ['https://other.com/foo/bar'],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      ['http://other.com/foo/bar'],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{ pathname: '/foo/bar', baseURL: 'https://example.com' }],
      null,
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash'
      }],
      {
        hash: { input: 'hash', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: {} },
        search: { input: 'query', groups: {} }
      },
      undefined,
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{
        pathname: '/foo/bar/baz',
        baseURL: 'https://example.com'
      }],
      null,
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{ pathname: '/foo/bar', baseURL: 'https://other.com' }],
      null
    );
    yield new URLPatternTestData(
      [{
        pathname: '/foo/bar',
        baseURL: 'https://example.com?query#hash',
        caseSensitivePath: false
      }],
      [{ pathname: '/foo/bar', baseURL: 'http://example.com' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR' }],
      {
        pathname: { input: '/fOo/baR', groups: { 'bar': 'baR' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/([^\\/]+?)', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR' }],
      {
        pathname: { input: '/fOo/baR', groups: { '0': 'baR' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:baR', caseSensitivePath: false }],
      [{ pathname: '/fOo/index.html' }],
      {
        pathname: { input: '/fOo/index.html', groups: { 'baR': 'index.html' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR' }],
      {
        pathname: { input: '/fOo/baR', groups: { '0': 'baR' } }
      },
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR' }],
      {
        pathname: { input: '/fOo/baR', groups: { '0': 'baR' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)', caseSensitivePath: false }],
      [{ pathname: '/fOo/baR/Baz' }],
      {
        pathname: { input: '/fOo/baR/Baz', groups: { '0': 'baR/Baz' } }
      },
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*', caseSensitivePath: false }],
      [{ pathname: '/Foo/bar/baz' }],
      {
        pathname: { input: '/Foo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)', caseSensitivePath: false }],
      [{ pathname: '/Foo/' }],
      {
        pathname: { input: '/Foo/', groups: { '0': '' } }
      },
      {
        pathname: '/foo/*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*', caseSensitivePath: false }],
      [{ pathname: '/FOO/' }],
      {
        pathname: { input: '/FOO/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null,
      { pathname: '/foo/*' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar' }],
      {
        pathname: { input: '/fOo/bar', groups: { 'bar': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)', caseSensitivePath: false }],
      [{ pathname: '/foO/bar/baz' }],
      {
        pathname: { input: '/foO/bar/baz', groups: { 'bar': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)', caseSensitivePath: false }],
      [{ pathname: '/fOo/' }],
      {
        pathname: { input: '/fOo/', groups: { 'bar': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar(.*)', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?', caseSensitivePath: false }],
      [{ pathname: '/Foo/bar' }],
      {
        pathname: { input: '/Foo/bar', groups: { 'bar': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?', caseSensitivePath: false }],
      [{ pathname: '/Foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/Foo', groups: { 'bar': null } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar?', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/:bar+', caseSensitivePath: false }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { 'bar': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/:bar+', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { 'bar': 'bar/baz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar+', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/:bar*', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar' }],
      {
        pathname: { input: '/fOo/bar', groups: { 'bar': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/FoO/:bar*', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { 'bar': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/:bar*', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { 'bar': null } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/:bar*', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar' }],
      {
        pathname: { input: '/fOo/bar', groups: { '0': 'bar' } }
      },
      { pathname: '/foo/*?' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar' }],
      {
        pathname: { input: '/fOo/bar', groups: { '0': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar/baz' }],
      {
        pathname: { input: '/fOo/bar/baz', groups: { '0': 'bar/baz' } }
      },
      { pathname: '/foo/*?' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/*?', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/(.*)?', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { '0': null } }
      },
      { pathname: '/Foo/*?' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?', caseSensitivePath: false }],
      [{ pathname: '/fOo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/fOo', groups: { '0': null } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?', caseSensitivePath: false }],
      [{ pathname: '/fOo/' }],
      {
        pathname: { input: '/fOo/', groups: { '0': '' } }
      },
      { pathname: '/foo/*?' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?', caseSensitivePath: false }],
      [{ pathname: '/fOo/' }],
      {
        pathname: { input: '/fOo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null,
      { pathname: '/foo/*?' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)?', caseSensitivePath: false }],
      [{ pathname: '/fo' }],
      null,
      { pathname: '/foo/*?' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*?', caseSensitivePath: false }],
      [{ pathname: '/fo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar' }],
      {
        pathname: { input: '/fOo/bar', groups: { '0': 'bar' } }
      },
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar' }],
      {
        pathname: { input: '/fOo/bar', groups: { '0': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/(.*)+', caseSensitivePath: false }],
      [{ pathname: '/Foo/bar/baz' }],
      {
        pathname: { input: '/Foo/bar/baz', groups: { '0': 'bar/baz' } }
      },
      { pathname: '/Foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+', caseSensitivePath: false }],
      [{ pathname: '/fOo/bar/baz' }],
      {
        pathname: { input: '/fOo/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null,
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foO/(.*)+', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      },
      { pathname: '/foO/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foO/*+', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null,
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)+', caseSensitivePath: false }],
      [{ pathname: '/fo' }],
      null,
      { pathname: '/foo/*+' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/*+', caseSensitivePath: false }],
      [{ pathname: '/fo' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foO/(.*)*', caseSensitivePath: false }],
      [{ pathname: '/foO/baR' }],
      {
        pathname: { input: '/foO/baR', groups: { '0': 'baR' } }
      },
      { pathname: '/foO/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/**', caseSensitivePath: false }],
      [{ pathname: '/foo/bar' }],
      {
        pathname: { input: '/foo/bar', groups: { '0': 'bar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/(.*)*', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      {
        pathname: { input: '/foo/bar/baz', groups: { '0': 'bar/baz' } }
      },
      { pathname: '/Foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**', caseSensitivePath: false }],
      [{ pathname: '/foO/bar/baz' }],
      {
        pathname: { input: '/foO/bar/baz', groups: { '0': 'bar/baz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/Foo/(.*)*', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/foo', groups: { '0': null } }
      },
      { pathname: '/Foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**', caseSensitivePath: false }],
      [{ pathname: '/fOo' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: '/fOo', groups: { '0': null } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foO/(.*)*', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      },
      { pathname: '/foO/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foO/**', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      {
        pathname: { input: '/foo/', groups: { '0': '' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null,
      { pathname: '/foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**', caseSensitivePath: false }],
      [{ pathname: '/foobar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/(.*)*', caseSensitivePath: false }],
      [{ pathname: '/fo' }],
      null,
      { pathname: '/foo/**' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/**', caseSensitivePath: false }],
      [{ pathname: '/fo' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}', caseSensitivePath: false }],
      [{ pathname: '/foO/baR' }],
      {
        pathname: { input: '/foO/baR', groups: {} }
      },
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      null,
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null,
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null,
      { pathname: '/foo/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?', caseSensitivePath: false }],
      [{ pathname: '/Foo/bAr' }],
      {
        pathname: { input: '/Foo/bAr', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?', caseSensitivePath: false }],
      [{ pathname: '/fOo' }],
      {
        pathname: { input: '/fOo', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}?', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+', caseSensitivePath: false }],
      [{ pathname: '/Foo/bar' }],
      {
        pathname: { input: '/Foo/bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+', caseSensitivePath: false }],
      [{ pathname: '/Foo/bAr/baR' }],
      {
        pathname: { input: '/Foo/bAr/baR', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+', caseSensitivePath: false }],
      [{ pathname: '/foo' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}+', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*', caseSensitivePath: false }],
      [{ pathname: '/foO/Bar' }],
      {
        pathname: { input: '/foO/Bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*', caseSensitivePath: false }],
      [{ pathname: '/Foo/bAr/baR' }],
      {
        pathname: { input: '/Foo/bAr/baR', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*', caseSensitivePath: false }],
      [{ pathname: '/foo/bar/baz' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*', caseSensitivePath: false }],
      [{ pathname: '/Foo' }],
      {
        pathname: { input: '/Foo', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo{/bar}*', caseSensitivePath: false }],
      [{ pathname: '/foo/' }],
      null
    );
    yield new URLPatternTestData(
      [{ protocol: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ username: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ password: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ pathname: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ search: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hash: '(café)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ protocol: ':café' }],
      [{ protocol: 'foo' }],
      {
        protocol: { input: 'foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ username: ':café' }],
      [{ username: 'foo' }],
      {
        username: { input: 'foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ password: ':café' }],
      [{ password: 'foo' }],
      {
        password: { input: 'foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ hostname: ':café' }],
      [{ hostname: 'foo' }],
      {
        hostname: { input: 'foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/:café' }],
      [{ pathname: '/foo' }],
      {
        pathname: { input: '/foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ search: ':café' }],
      [{ search: 'foo' }],
      {
        search: { input: 'foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ hash: ':café' }],
      [{ hash: 'foo' }],
      {
        hash: { input: 'foo', groups: { 'café': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ protocol: ':\u2118' }],
      [{ protocol: 'foo' }],
      {
        protocol: { input: 'foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ username: ':\u2118' }],
      [{ username: 'foo' }],
      {
        username: { input: 'foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ password: ':\u2118' }],
      [{ password: 'foo' }],
      {
        password: { input: 'foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ hostname: ':\u2118' }],
      [{ hostname: 'foo' }],
      {
        hostname: { input: 'foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/:\u2118' }],
      [{ pathname: '/foo' }],
      {
        pathname: { input: '/foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ search: ':\u2118' }],
      [{ search: 'foo' }],
      {
        search: { input: 'foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ hash: ':\u2118' }],
      [{ hash: 'foo' }],
      {
        hash: { input: 'foo', groups: { '\u2118': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ protocol: ':\u3400' }],
      [{ protocol: 'foo' }],
      {
        protocol: { input: 'foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ username: ':\u3400' }],
      [{ username: 'foo' }],
      {
        username: { input: 'foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ password: ':\u3400' }],
      [{ password: 'foo' }],
      {
        password: { input: 'foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ hostname: ':\u3400' }],
      [{ hostname: 'foo' }],
      {
        hostname: { input: 'foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/:\u3400' }],
      [{ pathname: '/foo' }],
      {
        pathname: { input: '/foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ search: ':\u3400' }],
      [{ search: 'foo' }],
      {
        search: { input: 'foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ hash: ':\u3400' }],
      [{ hash: 'foo' }],
      {
        hash: { input: 'foo', groups: { '\u3400': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ protocol: '(.*)' }],
      [{ protocol: 'café' }],
      null,
      { protocol: '*' },
    );
    yield new URLPatternTestData(
      [{ protocol: '(.*)' }],
      [{ protocol: 'cafe' }],
      {
        protocol: { input: 'cafe', groups: { '0': 'cafe' } }
      },
      { protocol: '*' },

    );
    yield new URLPatternTestData(
      [{ protocol: 'foo-bar' }],
      [{ protocol: 'foo-bar' }],
      {
        protocol: { input: 'foo-bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ username: 'caf%C3%A9' }],
      [{ username: 'café' }],
      {
        username: { input: 'caf%C3%A9', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ username: 'café' }],
      [{ username: 'café' }],
      {
        username: { input: 'caf%C3%A9', groups: {} }
      },
      { username: 'caf%C3%A9' },
    );
    yield new URLPatternTestData(
      [{ username: 'caf%c3%a9' }],
      [{ username: 'café' }],
      null
    );
    yield new URLPatternTestData(
      [{ password: 'caf%C3%A9' }],
      [{ password: 'café' }],
      {
        password: { input: 'caf%C3%A9', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ password: 'café' }],
      [{ password: 'café' }],
      {
        password: { input: 'caf%C3%A9', groups: {} }
      },
      { password: 'caf%C3%A9' },
    );
    yield new URLPatternTestData(
      [{ password: 'caf%c3%a9' }],
      [{ password: 'café' }],
      null
    );
    yield new URLPatternTestData(
      [{ hostname: 'xn--caf-dma.com' }],
      [{ hostname: 'café.com' }],
      {
        hostname: { input: 'xn--caf-dma.com', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ hostname: 'café.com' }],
      [{ hostname: 'café.com' }],
      {
        hostname: { input: 'xn--caf-dma.com', groups: {} }
      },
      { hostname: 'xn--caf-dma.com' },
    );
    yield new URLPatternTestData(
      [{ port: '' }],
      [{ protocol: 'http', port: '80' }],
      {
        protocol: { input: 'http', groups: { '0': 'http' } }
      },
      undefined,
      ['port'],
    );
    yield new URLPatternTestData(
      [{ protocol: 'http', port: '80' }],
      [{ protocol: 'http', port: '80' }],
      {
        protocol: { input: 'http', groups: {} }
      },
      undefined,
      ['port'],
    );
    yield new URLPatternTestData(
      [{ protocol: 'http', port: '80{20}?' }],
      [{ protocol: 'http', port: '80' }],
      null
    );
    yield new URLPatternTestData(
      [{ protocol: 'http', port: '80 ' }],
      [{ protocol: 'http', port: '80' }],
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ port: '80' }],
      [{ protocol: 'http', port: '80' }],
      null
    );
    yield new URLPatternTestData(
      [{ protocol: 'http{s}?', port: '80' }],
      [{ protocol: 'http', port: '80' }],
      null
    );
    yield new URLPatternTestData(
      [{ port: '80' }],
      [{ port: '80' }],
      {
        port: { input: '80', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ port: '(.*)' }],
      [{ port: 'invalid80' }],
      null,
      {
        port: '*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/./bar' }],
      {
        pathname: { input: '/foo/bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/baz' }],
      [{ pathname: '/foo/bar/../baz' }],
      {
        pathname: { input: '/foo/baz', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/caf%C3%A9' }],
      [{ pathname: '/café' }],
      {
        pathname: { input: '/caf%C3%A9', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/café' }],
      [{ pathname: '/café' }],
      {
        pathname: { input: '/caf%C3%A9', groups: {} }
      },
      { pathname: '/caf%C3%A9' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/caf%c3%a9' }],
      [{ pathname: '/café' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: 'foo/bar' }],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: 'foo/bar', baseURL: 'https://example.com' }],
      {
        protocol: { input: 'https', groups: { '0': 'https' } },
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo/bar', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/../bar' }],
      [{ pathname: '/bar' }],
      {
        pathname: { input: '/bar', groups: {} }
      },
      { pathname: '/bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: './foo/bar', baseURL: 'https://example.com' }],
      [{ pathname: 'foo/bar', baseURL: 'https://example.com' }],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} }
      },
      { pathname: '/foo/bar' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: '', baseURL: 'https://example.com' }],
      [{ pathname: '/', baseURL: 'https://example.com' }],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: '{/bar}', baseURL: 'https://example.com/foo/' }],
      [{ pathname: './bar', baseURL: 'https://example.com/foo/' }],
      null,
      { pathname: '/bar' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: '\\/bar', baseURL: 'https://example.com/foo/' }],
      [{ pathname: './bar', baseURL: 'https://example.com/foo/' }],
      null,
      { pathname: '/bar' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: 'b', baseURL: 'https://example.com/foo/' }],
      [{ pathname: './b', baseURL: 'https://example.com/foo/' }],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/b', groups: {} }
      },
      { pathname: '/foo/b' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: 'foo/bar' }],
      ['https://example.com/foo/bar'],
      null
    );
    yield new URLPatternTestData(
      [{ pathname: 'foo/bar', baseURL: 'https://example.com' }],
      ['https://example.com/foo/bar'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo/bar', groups: {} }
      },
      { pathname: '/foo/bar' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: ':name.html', baseURL: 'https://example.com' }],
      ['https://example.com/foo.html'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo.html', groups: { 'name': 'foo' } }
      },
      { pathname: '/:name.html' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ search: 'q=caf%C3%A9' }],
      [{ search: 'q=café' }],
      {
        search: { input: 'q=caf%C3%A9', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ search: 'q=café' }],
      [{ search: 'q=café' }],
      {
        search: { input: 'q=caf%C3%A9', groups: {} }
      },
      { search: 'q=caf%C3%A9' },
    );
    yield new URLPatternTestData(
      [{ search: 'q=caf%c3%a9' }],
      [{ search: 'q=café' }],
      null
    );
    yield new URLPatternTestData(
      [{ hash: 'caf%C3%A9' }],
      [{ hash: 'café' }],
      {
        hash: { input: 'caf%C3%A9', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ hash: 'café' }],
      [{ hash: 'café' }],
      {
        hash: { input: 'caf%C3%A9', groups: {} }
      },
      { hash: 'caf%C3%A9' },
    );
    yield new URLPatternTestData(
      [{ hash: 'caf%c3%a9' }],
      [{ hash: 'café' }],
      null,
    );
    yield new URLPatternTestData(
      [{ protocol: 'about', pathname: '(blank|sourcedoc)' }],
      ['about:blank'],
      {
        protocol: { input: 'about', groups: {} },
        pathname: { input: 'blank', groups: { '0': 'blank' } }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: 'data', pathname: ':number([0-9]+)' }],
      ['data:8675309'],
      {
        protocol: { input: 'data', groups: {} },
        pathname: { input: '8675309', groups: { 'number': '8675309' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/(\\m)' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo!' }],
      [{ pathname: '/foo!' }],
      {
        pathname: { input: '/foo!', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo\\:' }],
      [{ pathname: '/foo:' }],
      {
        pathname: { input: '/foo:', groups: {} }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo\\{' }],
      [{ pathname: '/foo{' }],
      {
        pathname: { input: '/foo%7B', groups: {} }
      },
      { pathname: '/foo%7B' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo\\(' }],
      [{ pathname: '/foo(' }],
      {
        pathname: { input: '/foo(', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: 'javascript', pathname: 'var x = 1;' }],
      [{ protocol: 'javascript', pathname: 'var x = 1;' }],
      {
        protocol: { input: 'javascript', groups: {} },
        pathname: { input: 'var x = 1;', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: 'var x = 1;' }],
      [{ protocol: 'javascript', pathname: 'var x = 1;' }],
      null,
      { pathname: 'var%20x%20=%201;' },
    );
    yield new URLPatternTestData(
      [{ protocol: 'javascript', pathname: 'var x = 1;' }],
      [{ baseURL: 'javascript:var x = 1;' }],
      {
        protocol: { input: 'javascript', groups: {} },
        pathname: { input: 'var x = 1;', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: '(data|javascript)', pathname: 'var x = 1;' }],
      [{ protocol: 'javascript', pathname: 'var x = 1;' }],
      {
        protocol: { input: 'javascript', groups: { '0': 'javascript' } },
        pathname: { input: 'var x = 1;', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: '(https|javascript)', pathname: 'var x = 1;' }],
      [{ protocol: 'javascript', pathname: 'var x = 1;' }],
      null,
      { pathname: 'var%20x%20=%201;' },
    );
    yield new URLPatternTestData(
      [{ pathname: 'var x = 1;' }],
      [{ pathname: 'var x = 1;' }],
      {
        pathname: { input: 'var%20x%20=%201;', groups: {} }
      },
      { pathname: 'var%20x%20=%201;' },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      ['./foo/bar', 'https://example.com'],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo/bar', groups: {} },
        protocol: { input: 'https', groups: { '0': 'https' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo/bar' }],
      [{ pathname: '/foo/bar' }, 'https://example.com'],
      'error'
    );
    yield new URLPatternTestData(
      ['https://example.com:8080/foo?bar#baz'],
      [{
        pathname: '/foo', search: 'bar', hash: 'baz',
        baseURL: 'https://example.com:8080'
      }],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        port: { input: '8080', groups: {} },
        pathname: { input: '/foo', groups: {} },
        search: { input: 'bar', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', port: '8080', pathname: '/foo', search: 'bar', hash: 'baz' },
      ['username', 'password'],
    );
    yield new URLPatternTestData(
      ['/foo?bar#baz', 'https://example.com:8080'],
      [{
        pathname: '/foo', search: 'bar', hash: 'baz',
        baseURL: 'https://example.com:8080'
      }],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        port: { input: '8080', groups: {} },
        pathname: { input: '/foo', groups: {} },
        search: { input: 'bar', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { pathname: '/foo', search: 'bar', hash: 'baz' },
      ['username', 'password'],
    );
    yield new URLPatternTestData(
      ['/foo'],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['example.com/foo'],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['http{s}?://{*.}?example.com/:product/:endpoint'],
      ['https://sub.example.com/foo/bar'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'sub.example.com', groups: { '0': 'sub' } },
        pathname: {
          input: '/foo/bar', groups: {
            'product': 'foo',
            'endpoint': 'bar'
          }
        }
      },
      { protocol: 'http{s}?', hostname: '{*.}?example.com', pathname: '/:product/:endpoint' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com?foo'],
      ['https://example.com/?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/', search: 'foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com#foo'],
      ['https://example.com/#foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} },
        hash: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/', hash: 'foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com:8080?foo'],
      ['https://example.com:8080/?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        port: { input: '8080', groups: {} },
        pathname: { input: '/', groups: {} },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', port: '8080', pathname: '/', search: 'foo' },
      ['username', 'password', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com:8080#foo'],
      ['https://example.com:8080/#foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        port: { input: '8080', groups: {} },
        pathname: { input: '/', groups: {} },
        hash: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', port: '8080', pathname: '/', hash: 'foo' },
      ['username', 'password', 'search'],
    );
    yield new URLPatternTestData(
      ['https://example.com/?foo'],
      ['https://example.com/?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/', search: 'foo' },
      ['username', 'password', 'port', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/#foo'],
      ['https://example.com/#foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} },
        hash: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/', hash: 'foo' },
      ['username', 'password', 'port', 'search'],
    );
    yield new URLPatternTestData(
      ['https://example.com/*?foo'],
      ['https://example.com/?foo'],
      null,
      { protocol: 'https', hostname: 'example.com', pathname: '/*?foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/*\\?foo'],
      ['https://example.com/?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: { '0': '' } },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/*', search: 'foo' },
      ['username', 'password', 'port', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/:name?foo'],
      ['https://example.com/bar?foo'],
      null,
      { protocol: 'https', hostname: 'example.com', pathname: '/:name?foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/:name\\?foo'],
      ['https://example.com/bar?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/bar', groups: { 'name': 'bar' } },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/:name', search: 'foo' },
      ['username', 'password', 'port', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/(bar)?foo'],
      ['https://example.com/bar?foo'],
      null,
      { protocol: 'https', hostname: 'example.com', pathname: '/(bar)?foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/(bar)\\?foo'],
      ['https://example.com/bar?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/bar', groups: { '0': 'bar' } },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/(bar)', search: 'foo' },
      ['username', 'password', 'port', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/{bar}?foo'],
      ['https://example.com/bar?foo'],
      null,
      { protocol: 'https', hostname: 'example.com', pathname: '/{bar}?foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/{bar}\\?foo'],
      ['https://example.com/bar?foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/bar', groups: {} },
        search: { input: 'foo', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/bar', search: 'foo' },
      ['username', 'password', 'port', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://example.com/'],
      ['https://example.com:8080/'],
      null,
      { protocol: 'https', hostname: 'example.com', port: '', pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['data:foobar'],
      ['data:foobar'],
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['data\\:foobar'],
      ['data:foobar'],
      {
        protocol: { input: 'data', groups: {} },
        pathname: { input: 'foobar', groups: {} }
      },
      { protocol: 'data', pathname: 'foobar' },
      ['username', 'password', 'hostname', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://{sub.}?example.com/foo'],
      ['https://example.com/foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo', groups: {} }
      },
      { protocol: 'https', hostname: '{sub.}?example.com', pathname: '/foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://{sub.}?example{.com/}foo'],
      ['https://example.com/foo'],
      null,
      'error',
    );
    yield new URLPatternTestData(
      ['{https://}example.com/foo'],
      ['https://example.com/foo'],
      null,
      'error',
    );
    yield new URLPatternTestData(
      ['https://(sub.)?example.com/foo'],
      ['https://example.com/foo'],
      // The `null` below is translated to undefined in the test harness.
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: { '0': null } },
        pathname: { input: '/foo', groups: {} }
      },
      { protocol: 'https', hostname: '(sub.)?example.com', pathname: '/foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://(sub.)?example(.com/)foo'],
      ['https://example.com/foo'],
      null,
      { protocol: 'https', hostname: '(sub.)?example(.com/)foo', pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['(https://)example.com/foo'],
      ['https://example.com/foo'],
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['https://{sub{.}}example.com/foo'],
      ['https://example.com/foo'],
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['https://(sub(?:.))?example.com/foo'],
      ['https://example.com/foo'],
      // The `null` below is translated to undefined in the test harness.
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: { '0': null } },
        pathname: { input: '/foo', groups: {} }
      },
      { protocol: 'https', hostname: '(sub(?:.))?example.com', pathname: '/foo' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['file:///foo/bar'],
      ['file:///foo/bar'],
      {
        protocol: { input: 'file', groups: {} },
        pathname: { input: '/foo/bar', groups: {} }
      },
      { protocol: 'file', pathname: '/foo/bar' },
      ['username', 'password', 'hostname', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['data:'],
      ['data:'],
      {
        protocol: { input: 'data', groups: {} }
      },
      { protocol: 'data' },
      ['username', 'password', 'hostname', 'port', 'pathname', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['foo://bar'],
      ['foo://bad_url_browser_interop'],
      null,
      { protocol: 'foo', hostname: 'bar' },
      ['username', 'password', 'port', 'pathname', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['(café)://foo'],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['https://example.com/foo?bar#baz'],
      [{
        protocol: 'https:',
        search: '?bar',
        hash: '#baz',
        baseURL: 'http://example.com/foo'
      }],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo', groups: {} },
        search: { input: 'bar', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/foo', search: 'bar', hash: 'baz' },
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      [{
        protocol: 'http{s}?:',
        search: '?bar',
        hash: '#baz'
      }],
      ['http://example.com/foo?bar#baz'],
      {
        protocol: { input: 'http', groups: {} },
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo', groups: { '0': '/foo' } },
        search: { input: 'bar', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { protocol: 'http{s}?', search: 'bar', hash: 'baz' },
    );
    yield new URLPatternTestData(
      ['?bar#baz', 'https://example.com/foo'],
      ['?bar#baz', 'https://example.com/foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo', groups: {} },
        search: { input: 'bar', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/foo', search: 'bar', hash: 'baz' },
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      ['?bar', 'https://example.com/foo#baz'],
      ['?bar', 'https://example.com/foo#snafu'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo', groups: {} },
        search: { input: 'bar', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/foo', search: 'bar' },
      ['username', 'password', 'port', 'hash'],
    );
    yield new URLPatternTestData(
      ['#baz', 'https://example.com/foo?bar'],
      ['#baz', 'https://example.com/foo?bar'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo', groups: {} },
        search: { input: 'bar', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/foo', search: 'bar', hash: 'baz' },
      ['username', 'password', 'port'],
    );
    yield new URLPatternTestData(
      ['#baz', 'https://example.com/foo'],
      ['#baz', 'https://example.com/foo'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/foo', groups: {} },
        hash: { input: 'baz', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/foo', hash: 'baz' },
      ['username', 'password', 'port', 'search'],
    );
    yield new URLPatternTestData(
      [{ pathname: '*' }],
      ['foo', 'data:data-urls-cannot-be-base-urls'],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '*' }],
      ['foo', 'not|a|valid|url'],
      null,
    );
    yield new URLPatternTestData(
      ['https://foo\\:bar@example.com'],
      ['https://foo:bar@example.com'],
      {
        protocol: { input: 'https', groups: {} },
        username: { input: 'foo', groups: {} },
        password: { input: 'bar', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'https', username: 'foo', password: 'bar', hostname: 'example.com', pathname: '/' },
      ['port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://foo@example.com'],
      ['https://foo@example.com'],
      {
        protocol: { input: 'https', groups: {} },
        username: { input: 'foo', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'https', username: 'foo', hostname: 'example.com', pathname: '/' },
      ['password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://\\:bar@example.com'],
      ['https://:bar@example.com'],
      {
        protocol: { input: 'https', groups: {} },
        password: { input: 'bar', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'https', password: 'bar', hostname: 'example.com', pathname: '/' },
      ['username', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://:user::pass@example.com'],
      ['https://foo:bar@example.com'],
      {
        protocol: { input: 'https', groups: {} },
        username: { input: 'foo', groups: { 'user': 'foo' } },
        password: { input: 'bar', groups: { 'pass': 'bar' } },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'https', username: ':user', password: ':pass', hostname: 'example.com', pathname: '/' },
      ['port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https\\:foo\\:bar@example.com'],
      ['https:foo:bar@example.com'],
      {
        protocol: { input: 'https', groups: {} },
        username: { input: 'foo', groups: {} },
        password: { input: 'bar', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'https', username: 'foo', password: 'bar', hostname: 'example.com', pathname: '/' },
      ['port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['data\\:foo\\:bar@example.com'],
      ['data:foo:bar@example.com'],
      {
        protocol: { input: 'data', groups: {} },
        pathname: { input: 'foo:bar@example.com', groups: {} }
      },
      { protocol: 'data', pathname: 'foo\\:bar@example.com' },
      ['username', 'password', 'hostname', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['https://foo{\\:}bar@example.com'],
      ['https://foo:bar@example.com'],
      null,
      { protocol: 'https', username: 'foo%3Abar', hostname: 'example.com', pathname: '/' },
      ['password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['data{\\:}channel.html', 'https://example.com'],
      ['https://example.com/data:channel.html'],
      {
        protocol: { input: 'https', groups: {} },
        hostname: { input: 'example.com', groups: {} },
        pathname: { input: '/data:channel.html', groups: {} }
      },
      { protocol: 'https', hostname: 'example.com', pathname: '/data\\:channel.html' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['http://[\\:\\:1]/'],
      ['http://[::1]/'],
      {
        protocol: { input: 'http', groups: {} },
        hostname: { input: '[::1]', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'http', hostname: '[\\:\\:1]', pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['http://[\\:\\:1]:8080/'],
      ['http://[::1]:8080/'],
      {
        protocol: { input: 'http', groups: {} },
        hostname: { input: '[::1]', groups: {} },
        port: { input: '8080', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'http', hostname: '[\\:\\:1]', port: '8080', pathname: '/' },
      ['username', 'password', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['http://[\\:\\:a]/'],
      ['http://[::a]/'],
      {
        protocol: { input: 'http', groups: {} },
        hostname: { input: '[::a]', groups: {} },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'http', hostname: '[\\:\\:a]', pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['http://[:address]/'],
      ['http://[::1]/'],
      {
        protocol: { input: 'http', groups: {} },
        hostname: { input: '[::1]', groups: { 'address': '::1' } },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'http', hostname: '[:address]', pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      ['http://[\\:\\:AB\\::num]/'],
      ['http://[::ab:1]/'],
      {
        protocol: { input: 'http', groups: {} },
        hostname: { input: '[::ab:1]', groups: { 'num': '1' } },
        pathname: { input: '/', groups: {} }
      },
      { protocol: 'http', hostname: '[\\:\\:ab\\::num]', pathname: '/' },
      ['username', 'password', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ hostname: '[\\:\\:AB\\::num]' }],
      [{ hostname: '[::ab:1]' }],
      {
        hostname: { input: '[::ab:1]', groups: { 'num': '1' } }
      },
      { hostname: '[\\:\\:ab\\::num]' },
    );
    yield new URLPatternTestData(
      [{ hostname: '[\\:\\:xY\\::num]' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: '{[\\:\\:ab\\::num]}' }],
      [{ hostname: '[::ab:1]' }],
      {
        hostname: { input: '[::ab:1]', groups: { 'num': '1' } }
      },
    );
    yield new URLPatternTestData(
      [{ hostname: '{[\\:\\:fé\\::num]}' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: '{[\\:\\::num\\:1]}' }],
      [{ hostname: '[::ab:1]' }],
      {
        hostname: { input: '[::ab:1]', groups: { 'num': 'ab' } }
      },
    );
    yield new URLPatternTestData(
      [{ hostname: '{[\\:\\::num\\:fé]}' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: '[*\\:1]' }],
      [{ hostname: '[::ab:1]' }],
      {
        hostname: { input: '[::ab:1]', groups: { '0': '::ab' } }
      },
    );
    yield new URLPatternTestData(
      [{ hostname: '*\\:1]' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['https://foo{{@}}example.com'],
      ['https://foo@example.com'],
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['https://foo{@example.com'],
      ['https://foo@example.com'],
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['data\\:text/javascript,let x = 100/:tens?5;'],
      ['data:text/javascript,let x = 100/5;'],
      // The `null` below is translated to undefined in the test harness.
      {
        protocol: { input: 'data', groups: {} },
        pathname: { input: 'text/javascript,let x = 100/5;', groups: { 'tens': null } }
      },
      { protocol: 'data', pathname: 'text/javascript,let x = 100/:tens?5;' },
      ['username', 'password', 'hostname', 'port', 'search', 'hash'],
    );
    yield new URLPatternTestData(
      [{ pathname: '/:id/:id' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo', baseURL: '' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      ['/foo', ''],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ pathname: '/foo' }, 'https://example.com'],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ pathname: ':name*' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'name': 'foobar' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: ':name+' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'name': 'foobar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: ':name' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'name': 'foobar' } }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: ':name*' }],
      [{ protocol: 'foobar' }],
      {
        protocol: { input: 'foobar', groups: { 'name': 'foobar' } }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: ':name+' }],
      [{ protocol: 'foobar' }],
      {
        protocol: { input: 'foobar', groups: { 'name': 'foobar' } }
      },
    );
    yield new URLPatternTestData(
      [{ protocol: ':name' }],
      [{ protocol: 'foobar' }],
      {
        protocol: { input: 'foobar', groups: { 'name': 'foobar' } }
      },
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad#hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad%hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad/hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad\\:hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad<hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad>hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad?hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad@hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad[hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad]hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad\\\\hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad^hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad|hostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad\nhostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad\rhostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{ hostname: 'bad\thostname' }],
      undefined,
      null,
      'error'
    );
    yield new URLPatternTestData(
      [{}],
      ['https://example.com/'],
      {
        protocol: { input: 'https', groups: { '0': 'https' } },
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/', groups: { '0': '/' } }
      },
    );
    yield new URLPatternTestData(
      [],
      ['https://example.com/'],
      {
        protocol: { input: 'https', groups: { '0': 'https' } },
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/', groups: { '0': '/' } }
      },
    );
    yield new URLPatternTestData(
      [],
      [{}],
      {}
    );
    yield new URLPatternTestData(
      [],
      [],
      { 'inputs': [{}] }
    );
    yield new URLPatternTestData(
      [{ pathname: '(foo)(.*)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { '0': 'foo', '1': 'barbaz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '{(foo)bar}(.*)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { '0': 'foo', '1': 'baz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '(foo)?(.*)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { '0': 'foo', '1': 'barbaz' } }
      },
      {
        pathname: '(foo)?*'
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}(.*)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { 'foo': 'f', '0': 'oobarbaz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}(barbaz)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { 'foo': 'foo', '0': 'barbaz' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}{(.*)}' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { 'foo': 'f', '0': 'oobarbaz' } }
      },
      { pathname: '{:foo}(.*)' },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}{(.*)bar}' }],
      [{ pathname: 'foobarbaz' }],
      null,
      { pathname: ':foo{*bar}' },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}{bar(.*)}' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { 'foo': 'foo', '0': 'baz' } }
      },
      { pathname: ':foo{bar*}' },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}:bar(.*)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { 'foo': 'f', 'bar': 'oobarbaz' } }
      },
      { pathname: ':foo:bar(.*)' },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}?(.*)' }],
      [{ pathname: 'foobarbaz' }],
      {
        pathname: { input: 'foobarbaz', groups: { 'foo': 'f', '0': 'oobarbaz' } }
      },
      { pathname: ':foo?*' },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo\\bar}' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'foo' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo\\.bar}' }],
      [{ pathname: 'foo.bar' }],
      {
        pathname: { input: 'foo.bar', groups: { 'foo': 'foo' } }
      },
      { pathname: '{:foo.bar}' },
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo(foo)bar}' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: '{:foo}bar' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'foo' } }
      }
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo\\bar' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'foo' } }
      },
      { pathname: '{:foo}bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo{}(.*)' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'f', '0': 'oobar' } }
      },
      { pathname: '{:foo}(.*)' },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo{}bar' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'foo' } }
      },
      { pathname: '{:foo}bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo{}?bar' }],
      [{ pathname: 'foobar' }],
      {
        pathname: { input: 'foobar', groups: { 'foo': 'foo' } }
      },
      { pathname: '{:foo}bar' },
    );
    yield new URLPatternTestData(
      [{ pathname: '*{}**?' }],
      [{ pathname: 'foobar' }],
      // The `null` below is translated to undefined in the test harness.
      {
        pathname: { input: 'foobar', groups: { '0': 'foobar', '1': null } }
      },
      { pathname: '*(.*)?' },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo(baz)(.*)' }],
      [{ pathname: 'bazbar' }],
      {
        pathname: { input: 'bazbar', groups: { 'foo': 'baz', '0': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo(baz)bar' }],
      [{ pathname: 'bazbar' }],
      {
        pathname: { input: 'bazbar', groups: { 'foo': 'baz' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '*/*' }],
      [{ pathname: 'foo/bar' }],
      {
        pathname: { input: 'foo/bar', groups: { '0': 'foo', '1': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '*\\/*' }],
      [{ pathname: 'foo/bar' }],
      {
        pathname: { input: 'foo/bar', groups: { '0': 'foo', '1': 'bar' } }
      },
      { pathname: '*/{*}' },
    );
    yield new URLPatternTestData(
      [{ pathname: '*/{*}' }],
      [{ pathname: 'foo/bar' }],
      { pathname: { input: 'foo/bar', groups: { '0': 'foo', '1': 'bar' } } },
    );
    yield new URLPatternTestData(
      [{ pathname: '*//*' }],
      [{ pathname: 'foo/bar' }],
      null,
    );
    yield new URLPatternTestData(
      [{ pathname: '/:foo.' }],
      [{ pathname: '/bar.' }],
      {
        pathname: { input: '/bar.', groups: { 'foo': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/:foo..' }],
      [{ pathname: '/bar..' }],
      {
        pathname: { input: '/bar..', groups: { 'foo': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: './foo' }],
      [{ pathname: './foo' }],
      {
        pathname: { input: './foo', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '../foo' }],
      [{ pathname: '../foo' }],
      {
        pathname: { input: '../foo', groups: {} }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo./' }],
      [{ pathname: 'bar./' }],
      {
        pathname: { input: 'bar./', groups: { 'foo': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: ':foo../' }],
      [{ pathname: 'bar../' }],
      {
        pathname: { input: 'bar../', groups: { 'foo': 'bar' } }
      },
    );
    yield new URLPatternTestData(
      [{ pathname: '/:foo\\bar' }],
      [{ pathname: '/bazbar' }],
      {
        pathname: { input: '/bazbar', groups: { 'foo': 'baz' } }
      },
      { pathname: '{/:foo}bar' },
    );
    yield new URLPatternTestData(
      [{ search: 'a=:a' }],
      ['https://example.com/foo/bar?a=x/y'],
      {
        hostname: { input: 'example.com', groups: { '0': 'example.com' } },
        pathname: { input: '/foo/bar', groups: { '0': '/foo/bar' } },
        protocol: { input: 'https', groups: { '0': 'https' } },
        search: { input: 'a=x/y', groups: { 'a': 'x/y' } }
      }
    );
  }

  let i = 0;

  const kComponents = [
    'protocol',
    'username',
    'password',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash',
  ];

  for (const entry of getData()) {
    it(`Test data ${i++}: Pattern: ${JSON.stringify(entry.pattern)} Inputs: ${JSON.stringify(entry.inputs)}`, function () {
      if (entry.expected_obj === 'error') {
        assert.throws(() => new URLPattern(...entry.pattern as [URLPatternInit]), TypeError, 'expected instantiation error');
        return;
      }

      const pattern = new URLPattern(...entry.pattern as [URLPatternInit]);

      // The compiled URLPattern object should have a property for each
      // component exposing the compiled pattern string.
      for (const component of kComponents) {
        // If the test case explicitly provides an expected pattern string,
        // then use that.  This is necessary in cases where the original
        // construction pattern gets canonicalized, etc.
        let expected = entry.expected_obj[component];

        // If there is no explicit expected pattern string, then compue
        // the expected value based on the URLPattern constructor args.
        if (expected === undefined) {
          // First determine if there is a baseURL present in the pattern
          // input.  A baseURL can be the source for many component patterns.
          let baseURL = null;
          const pattern = entry.pattern;
          const [patInitOrString, baseUrl] = pattern;
          if (typeof baseUrl === 'string') {
            baseURL = new URL(baseUrl);
          } else if (patInitOrString != null && typeof patInitOrString === 'object' && 'baseURL' in patInitOrString) {
            baseURL = new URL(patInitOrString.baseURL);
          }

          // We automatically populate the expected pattern string using
          // the following options in priority order:
          //
          //  1. If the original input explicitly provided a pattern, then
          //     echo that back as the expected value.
          //  2. If the baseURL exists and provides a component value then
          //     use that for the expected pattern.
          //  3. Otherwise fall back on the default pattern of `*` for an
          //     empty component pattern.
          if (entry.exactly_empty_components?.includes(component)) {
            expected = '';
          } else if (typeof patInitOrString === 'object' &&
            typeof patInitOrString[component] === 'string') {
            expected = patInitOrString[component];
          } else if (baseURL) {
            let base_value = baseURL[component];
            // Unfortunately some URL() getters include separator chars; e.g.
            // the trailing `:` for the protocol.  Strip those off if necessary.
            if (component === 'protocol')
              base_value = base_value.substring(0, base_value.length - 1);
            else if (component === 'search' || component === 'hash')
              base_value = base_value.substring(1, base_value.length);
            expected = base_value;
          } else {
            expected = '*';
          }
        }

        // Finally, assert that the compiled object property matches the
        // expected property.
        assert.strictEqual(pattern[component], expected, `compiled pattern property '${component}'`);
      }

      if (entry.expected_match === 'error') {
        assert.throws(() => pattern.test(...entry.inputs as [string, string]), TypeError);
        assert.throws(() => pattern.exec(...entry.inputs as [string, string]), TypeError);
        return;
      }

      // First, validate the test() method by converting the expected result to
      // a truthy value.
      assert.strictEqual(pattern.test(...entry.inputs as [string, string]), !!entry.expected_match, 'test() result');

      // Next, start validating the exec() method.
      const exec_result = pattern.exec(...entry.inputs as [string, string]);

      // On a failed match exec() returns null.
      if (!entry.expected_match || typeof entry.expected_match !== 'object') {
        assert.strictEqual(exec_result, entry.expected_match, 'exec() failed match result');
        return;
      }

      // Next verify the result.input is correct.  This may be a structured
      // URLPatternInit dictionary object or a URL string.
      assert.strictEqual(exec_result.inputs.length, entry.expected_match.inputs.length, 'exec() result.inputs.length');
      for (let i = 0; i < exec_result.inputs.length; ++i) {
        const input = exec_result.inputs[i];
        const expected_input = entry.expected_match.inputs[i];
        if (typeof input === 'string') {
          assert.strictEqual(input, expected_input, `exec() result.inputs[${i}]`);
          continue;
        }
        for (const component of kComponents) {
          assert.strictEqual(input[component], expected_input[component], `exec() result.inputs[${i}}][${component}]`);
        }
      }

      // Next we will compare the URLPatternComponentResult for each of these
      // expected components.
      for (const component of kComponents) {
        let expected_obj = entry.expected_match[component];

        // If the test expectations don't include a component object, then
        // we auto-generate one.  This is convenient for the many cases
        // where the pattern has a default wildcard or empty string pattern
        // for a component and the input is essentially empty.
        if (!expected_obj) {
          expected_obj = { input: '', groups: {} };

          // Next, we must treat default wildcards differently than empty string
          // patterns.  The wildcard results in a capture group, but the empty
          // string pattern does not.  The expectation object must list which
          // components should be empty instead of wildcards in
          // |exactly_empty_components|.
          if (!entry.exactly_empty_components ||
            !entry.exactly_empty_components.includes(component)) {
            expected_obj.groups['0'] = '';
          }
        }

        // JSON does not allow us to use undefined directly, so the data file
        // contains null instead.  Translate to the expected undefined value
        // here.
        for (const key in expected_obj.groups) {
          if (expected_obj.groups[key] === null) {
            expected_obj.groups[key] = undefined;
          }
        }
        assert.deepEqual(exec_result[component], expected_obj, `exec() result for ${component}`);
      }
    });
  }
});
