import { ConfigurableRoute, Endpoint, RecognizedRoute, RouteRecognizer } from '@aurelia/route-recognizer';
import { assert } from '@aurelia/testing';

describe.only(RouteRecognizer.name, function () {

  interface RecognizeSpec {
    routes: string[];
    tests: [string, string | null, Record<string, string> | null][];
  }

  const recognizeSpecs: RecognizeSpec[] = [
    // #region 1-depth static routes
    {
      routes: [
        '',
      ],
      tests: [
        ['',   '',   null],
        ['a',  null, null],
      ],
    },
    {
      routes: [
        'a',
      ],
      tests: [
        ['',   null, null],
        ['a',  'a',  null],
        ['b',  null, null],
        ['aa', null, null],
      ],
    },
    {
      routes: [
        '',
        'a',
      ],
      tests: [
        ['',   '',   null],
        ['a',  'a',  null],
        ['b',  null, null],
        ['aa', null, null],
      ],
    },
    {
      routes: [
        'aa',
      ],
      tests: [
        ['',    null, null],
        ['a',   null, null],
        ['aa',  'aa', null],
        ['ab',  null, null],
        ['ba',  null, null],
        ['aaa', null, null],
      ],
    },
    {
      routes: [
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    null,  null],
        ['aa',   null,  null],
        ['aaa',  'aaa', null],
        ['aab',  null,  null],
        ['baa',  null,  null],
        ['aba',  null,  null],
        ['aaaa', null,  null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
      ],
      tests: [
        ['',    null, null],
        ['a',   'a',  null],
        ['aa',  'aa', null],
        ['aaa', null, null],
      ],
    },
    {
      routes: [
        'a',
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    'a',   null],
        ['aa',   null,  null],
        ['aaa',  'aaa', null],
        ['aaaa', null,  null],
      ],
    },
    {
      routes: [
        'aa',
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    null,  null],
        ['aa',   'aa',  null],
        ['aaa',  'aaa', null],
        ['aaaa', null,  null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    'a',   null],
        ['aa',   'aa',  null],
        ['aaa',  'aaa', null],
        ['aaaa', null,  null],
      ],
    },
    // #endregion
    // #region 2-depth static routes
    {
      routes: [
        'a/a',
      ],
      tests: [
        ['',    null,  null],
        ['a',   null,  null],
        ['aa',  null,  null],
        ['aaa', null,  null],
        ['a/a', 'a/a', null],
        ['a/b', null,  null],
        ['b/a', null,  null],
      ],
    },
    {
      routes: [
        '',
        'a/a',
      ],
      tests: [
        ['',    '',    null],
        ['a',   null,  null],
        ['aa',  null,  null],
        ['aaa', null,  null],
        ['a/a', 'a/a', null],
        ['a/b', null,  null],
        ['b/a', null,  null],
      ],
    },
    {
      routes: [
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['aaaa',  null,   null],
        ['a/a',   null,   null],
        ['aa/a',  'aa/a', null],
        ['a/aa',  null,   null],
      ],
    },
    {
      routes: [
        'a/aa',
      ],
      tests: [
        ['',     null,   null],
        ['a',    null,   null],
        ['aa',   null,   null],
        ['aaa',  null,   null],
        ['aaaa', null,   null],
        ['a/a',  null,   null],
        ['aa/a', null,   null],
        ['a/aa', 'a/aa', null],
      ],
    },
    {
      routes: [
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   null,    null],
        ['aa/a',  null,    null],
        ['a/aa',  null,    null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['aaaa',  null,   null],
        ['a/a',   'a/a',  null],
        ['aa/a',  'aa/a', null],
        ['a/aa',  null,   null],
      ],
    },
    {
      routes: [
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['aaaa',  null,   null],
        ['a/a',   'a/a',  null],
        ['aa/a',  null,   null],
        ['a/aa',  'a/aa', null],
      ],
    },
    {
      routes: [
        'a/a',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  null,    null],
        ['a/aa',  null,    null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a/a',
        'aa/a',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  'aa/a',  null],
        ['a/aa',  null,    null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a/a',
        'a/aa',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  null,    null],
        ['a/aa',  'a/aa',  null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a/a',
        'aa/a',
        'a/aa',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  'aa/a',  null],
        ['a/aa',  'a/aa',  null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    // #endregion
    // #region mixed 1,2-depth static routes
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
      ],
      tests: [
        ['',    null,  null],
        ['a',   'a',   null],
        ['aa',  'aa',  null],
        ['aaa', 'aaa', null],
        ['a/a', 'a/a', null],
      ],
    },
    {
      routes: [
        '',
        'a',
        'aa',
        'aaa',
        'a/a',
      ],
      tests: [
        ['',    '',    null],
        ['a',   'a',   null],
        ['aa',  'aa',  null],
        ['aaa', 'aaa', null],
        ['a/a', 'a/a', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     'a',    null],
        ['aa',    'aa',   null],
        ['aaa',   'aaa',  null],
        ['aaaa',  null,   null],
        ['a/a',   null,   null],
        ['aa/a',  'aa/a', null],
        ['a/aa',  null,   null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/aa',
      ],
      tests: [
        ['',     null,   null],
        ['a',    'a',    null],
        ['aa',   'aa',   null],
        ['aaa',  'aaa',  null],
        ['aaaa', null,   null],
        ['a/a',  null,   null],
        ['aa/a', null,   null],
        ['a/aa', 'a/aa', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a',     null],
        ['aa',    'aa',    null],
        ['aaa',   'aaa',   null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   null,    null],
        ['aa/a',  null,    null],
        ['a/aa',  null,    null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     'a',    null],
        ['aa',    'aa',   null],
        ['aaa',   'aaa',  null],
        ['aaaa',  null,   null],
        ['a/a',   'a/a',  null],
        ['aa/a',  'aa/a', null],
        ['a/aa',  null,   null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,   null],
        ['a',     'a',    null],
        ['aa',    'aa',   null],
        ['aaa',   'aaa',  null],
        ['aaaa',  null,   null],
        ['a/a',   'a/a',  null],
        ['aa/a',  null,   null],
        ['a/aa',  'a/aa', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a',     null],
        ['aa',    'aa',    null],
        ['aaa',   'aaa',   null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  null,    null],
        ['a/aa',  null,    null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
        'aa/a',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a',     null],
        ['aa',    'aa',    null],
        ['aaa',   'aaa',   null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  'aa/a',  null],
        ['a/aa',  null,    null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
        'a/aa',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a',     null],
        ['aa',    'aa',    null],
        ['aaa',   'aaa',   null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  null,    null],
        ['a/aa',  'a/aa',  null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    {
      routes: [
        'a',
        'aa',
        'aaa',
        'a/a',
        'aa/a',
        'a/aa',
        'aa/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a',     null],
        ['aa',    'aa',    null],
        ['aaa',   'aaa',   null],
        ['aaaa',  null,    null],
        ['aaaaa', null,    null],
        ['a/a',   'a/a',   null],
        ['aa/a',  'aa/a',  null],
        ['a/aa',  'a/aa',  null],
        ['aa/aa', 'aa/aa', null],
      ],
    },
    // #endregion
    // #region 1-depth dynamic routes
    {
      routes: [
        ':a',
      ],
      tests: [
        ['',    null, null],
        ['a',   ':a', { a: 'a' }],
        ['b',   ':a', { a: 'b' }],
        ['aa',  ':a', { a: 'aa' }],
        ['a/a', null, null],
      ],
    },
    {
      routes: [
        '',
        ':a',
      ],
      tests: [
        ['',    '',   null],
        ['a',   ':a', { a: 'a' }],
        ['b',   ':a', { a: 'b' }],
        ['aa',  ':a', { a: 'aa' }],
        ['a/a', null, null],
      ],
    },
    {
      routes: [
        ':a',
        'a',
      ],
      tests: [
        ['',    null, null],
        ['a',   'a',  null],
        ['b',   ':a', { a: 'b' }],
        ['aa',  ':a', { a: 'aa' }],
        ['a/a', null, null],
      ],
    },
    {
      routes: [
        ':a',
        'a',
        'aa',
      ],
      tests: [
        ['',    null, null],
        ['a',   'a',  null],
        ['b',   ':a', { a: 'b' }],
        ['aa',  'aa', null],
        ['aaa', ':a', { a: 'aaa' }],
        ['a/a', null, null],
      ],
    },
    {
      routes: [
        ':a',
        'a',
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    'a',   null],
        ['aa',   ':a',  { a: 'aa' }],
        ['aaa',  'aaa', null],
        ['aaaa', ':a',  { a: 'aaaa' }],
        ['a/a',  null,  null],
      ],
    },
    {
      routes: [
        ':a',
        'aa',
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    ':a',  { a: 'a' }],
        ['aa',   'aa',  null],
        ['aaa',  'aaa', null],
        ['aaaa', ':a',  { a: 'aaaa' }],
        ['a/a',  null,  null],
      ],
    },
    {
      routes: [
        ':a',
        'a',
        'aa',
        'aaa',
      ],
      tests: [
        ['',     null,  null],
        ['a',    'a',   null],
        ['aa',   'aa',  null],
        ['aaa',  'aaa', null],
        ['aaaa', ':a',  { a: 'aaaa' }],
        ['a/a',  null,  null],
      ],
    },
    // #endregion
    // #region 2-depth dynamic routes
    // d/s
    {
      routes: [
        ':a/a',
        'a/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  null,   null],
        ['aa/a',  ':a/a', { a: 'aa' }],
        ['aa/aa', null,   null],
        ['a/a/a', null,   null],
      ],
    },
    {
      routes: [
        ':a/a',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  null,   null],
        ['aa/a',  'aa/a', null],
        ['aaa/a', ':a/a', { a: 'aaa' }],
        ['aa/aa', null,   null],
        ['a/a/a', null,   null],
      ],
    },
    // s/d
    {
      routes: [
        'a/:b',
        'a/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  'a/:b', { b: 'aa' }],
        ['aa/a',  null,   null],
        ['aa/aa', null,   null],
        ['a/a/a', null,   null],
      ],
    },
    {
      routes: [
        'a/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  'a/aa', null],
        ['a/aaa', 'a/:b', { b: 'aaa' }],
        ['aa/a',  null,   null],
        ['aa/aa', null,   null],
        ['a/a/a', null,   null],
      ],
    },
    // d/s + s/d
    {
      routes: [
        ':a/a',
        'a/:b',
        'a/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  'a/:b', { b: 'aa' }],
        ['aa/a',  ':a/a', { a: 'aa' }],
        ['a/a/a', null,   null],
      ],
    },
    {
      routes: [
        ':a/a',
        'a/:b',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  'a/:b', { b: 'aa' }],
        ['aa/a',  'aa/a', null],
        ['aaa/a', ':a/a', { a: 'aaa' }],
        ['a/a/a', null,   null],
      ],
    },
    {
      routes: [
        ':a/a',
        'a/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  'a/aa', null],
        ['a/aaa', 'a/:b', { b: 'aaa' }],
        ['aa/a',  ':a/a', { a: 'aa' }],
        ['a/a/a', null,   null],
      ],
    },
    {
      routes: [
        ':a/a',
        'a/:b',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',      null,   null],
        ['a',     null,   null],
        ['aa',    null,   null],
        ['aaa',   null,   null],
        ['a/a',   'a/a',  null],
        ['a/aa',  'a/aa', null],
        ['a/aaa', 'a/:b', { b: 'aaa' }],
        ['aa/a',  'aa/a', null],
        ['aaa/a', ':a/a', { a: 'aaa' }],
        ['a/a/a', null,   null],
      ],
    },
    // d/d + d/s + s/s
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  ':a/:b', { a: 'a', b: 'aa' }],
        ['aa/a',  ':a/a',  { a: 'aa' }],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s:b* + s/s
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   ':a/aa', { a: 'a' }],
        ['a/aaa',  ':a/:b', { a: 'a', b: 'aaa' }],
        ['aa/a',   ':a/a',  { a: 'aa' }],
        ['aa/aa',  ':a/aa', { a: 'aa' }],
        ['aa/aaa', ':a/:b', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s + s/s:b*
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  ':a/:b', { a: 'a', b: 'aa' }],
        ['aa/a',  'aa/a',  null],
        ['aaa/a', ':a/a',  { a: 'aaa' }],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s:b* + s/s:b*
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   ':a/aa', { a: 'a' }],
        ['a/aaa',  ':a/:b', { a: 'a', b: 'aaa' }],
        ['aa/a',   'aa/a',  null],
        ['aaa/a',  ':a/a',  { a: 'aaa' }],
        ['aa/aa',  ':a/aa', { a: 'aa' }],
        ['aa/aaa', ':a/:b', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + s/d + s/s
    {
      routes: [
        ':a/:b',
        'a/:b',
        'a/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/:b',  { b: 'aa' }],
        ['aa/a',  ':a/:b', { a: 'aa', b: 'a' }],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + s/d:b* + s/s
    {
      routes: [
        ':a/:b',
        'a/:b',
        'aa/:b',
        'a/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/:b',  { b: 'aa' }],
        ['aa/a',   'aa/:b', { b: 'a' }],
        ['aa/aa',  'aa/:b', { b: 'aa' }],
        ['aaa/aa', ':a/:b', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + s/d + s/s:b*
    {
      routes: [
        ':a/:b',
        'a/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/aa',  null],
        ['a/aaa', 'a/:b',  { b: 'aaa' }],
        ['aa/a',  ':a/:b', { a: 'aa', b: 'a' }],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + s/d:b* + s/s:b*
    {
      routes: [
        ':a/:b',
        'a/:b',
        'aa/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/aa',  null],
        ['a/aaa',  'a/:b',  { b: 'aaa' }],
        ['aa/a',   'aa/:b', { b: 'a' }],
        ['aa/aa',  'aa/:b', { b: 'aa' }],
        ['aaa/aa', ':a/:b', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s + s/d + s/s
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'a/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/:b',  { b: 'aa' }],
        ['aa/a',  ':a/a',  { a: 'aa' }],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s:b* + s/d + s/s
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'a/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/:b',  { b: 'aa' }],
        ['aa/a',   ':a/a',  { a: 'aa' }],
        ['aa/aa',  ':a/aa', { a: 'aa' }],
        ['aa/aaa', ':a/:b', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s + s/d:b* + s/s
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'aa/:b',
        'a/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/:b',  { b: 'aa' }],
        ['aa/a',   'aa/:b', { b: 'a' }],
        ['aa/aa',  'aa/:b', { b: 'aa' }],
        ['aaa/aa', ':a/:b', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s:b* + s/d:b* + s/s
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'aa/:b',
        'a/a',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['a/aa',    'a/:b',  { b: 'aa' }],
        ['aa/a',    'aa/:b', { b: 'a' }],
        ['aa/aa',   'aa/:b', { b: 'aa' }],
        ['aa/aaa',  'aa/:b', { b: 'aaa' }],
        ['aaa/aa',  ':a/aa', { a: 'aaa' }],
        ['aaa/aaa', ':a/:b', { a: 'aaa', b: 'aaa' }],
        ['a/a/a',   null,    null],
      ],
    },
    // d/d + d/s + s/d + s/s:b* #1
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/:b',  { b: 'aa' }],
        ['aa/a',  'aa/a',  null],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['aaa/a', ':a/a',  { a: 'aaa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s:b* + s/d + s/s:b* #1
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/:b',  { b: 'aa' }],
        ['aa/a',   'aa/a',  null],
        ['aa/aa',  ':a/aa', { a: 'aa' }],
        ['aa/aaa', ':a/:b', { a: 'aa', b: 'aaa' }],
        ['aaa/a',  ':a/a',  { a: 'aaa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s + s/d:b* + s/s:b* #1
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'aa/:b',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/:b',  { b: 'aa' }],
        ['aa/a',   'aa/a',  null],
        ['aa/aa',  'aa/:b', { b: 'aa' }],
        ['aaa/a',  ':a/a',  { a: 'aaa' }],
        ['aaa/aa', ':a/:b', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s:b* + s/d:b* + s/s:b* #1
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'aa/:b',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['a/aa',    'a/:b',  { b: 'aa' }],
        ['aa/a',    'aa/a',  null],
        ['aa/aa',   'aa/:b', { b: 'aa' }],
        ['aa/aaa',  'aa/:b', { b: 'aaa' }],
        ['aaa/a',   ':a/a',  { a: 'aaa' }],
        ['aaa/aa',  ':a/aa', { a: 'aaa' }],
        ['aaa/aaa', ':a/:b', { a: 'aaa', b: 'aaa' }],
        ['a/a/a',   null,    null],
      ],
    },
    // d/d + d/s + s/d + s/s:b* #2
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/aa',  null],
        ['a/aaa', 'a/:b',  { b: 'aaa' }],
        ['aa/a',  ':a/a',  { a: 'aa' }],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s:b* + s/d + s/s:b* #2
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/aa',  null],
        ['a/aaa',  'a/:b',  { b: 'aaa' }],
        ['aa/a',   ':a/a',  { a: 'aa' }],
        ['aa/aa',  ':a/aa', { a: 'aa' }],
        ['aa/aaa', ':a/:b', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s + s/d:b* + s/s:b* #2
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'aa/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/aa',  null],
        ['a/aaa',  'a/:b',  { b: 'aaa' }],
        ['aa/a',   'aa/:b', { b: 'a' }],
        ['aa/aa',  'aa/:b', { b: 'aa' }],
        ['aaa/a',  ':a/a',  { a: 'aaa' }],
        ['aaa/aa', ':a/:b', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s:b* + s/d:b* + s/s:b* #2
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'aa/:b',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['a/aa',    'a/aa',  null],
        ['a/aaa',   'a/:b',  { b: 'aaa' }],
        ['aa/a',    'aa/:b', { b: 'a' }],
        ['aa/aa',   'aa/:b', { b: 'aa' }],
        ['aa/aaa',  'aa/:b', { b: 'aaa' }],
        ['aaa/a',   ':a/a',  { a: 'aaa' }],
        ['aaa/aa',  ':a/aa', { a: 'aaa' }],
        ['aaa/aaa', ':a/:b', { a: 'aaa', b: 'aaa' }],
        ['a/a/a',   null,    null],
      ],
    },
    // d/d + d/s + s/d + s/s*3
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     null,    null],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/aa',  null],
        ['a/aaa', 'a/:b',  { b: 'aaa' }],
        ['aa/a',  'aa/a',  null],
        ['aa/aa', ':a/:b', { a: 'aa', b: 'aa' }],
        ['aaa/a', ':a/a',  { a: 'aaa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s:b* + s/d + s/s*3
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/aa',  null],
        ['a/aaa',  'a/:b',  { b: 'aaa' }],
        ['aa/a',   'aa/a',  null],
        ['aa/aa',  ':a/aa', { a: 'aa' }],
        ['aa/aaa', ':a/:b', { a: 'aa', b: 'aaa' }],
        ['aaa/a',  ':a/a',  { a: 'aaa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s + s/d:b* + s/s*3
    {
      routes: [
        ':a/:b',
        ':a/a',
        'a/:b',
        'aa/:b',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',       null,    null],
        ['a',      null,    null],
        ['aa',     null,    null],
        ['aaa',    null,    null],
        ['a/a',    'a/a',   null],
        ['a/aa',   'a/aa',  null],
        ['a/aaa',  'a/:b',  { b: 'aaa' }],
        ['aa/a',   'aa/a',  null],
        ['aa/aa',  'aa/:b', { b: 'aa' }],
        ['aaa/a',  ':a/a',  { a: 'aaa' }],
        ['aaa/aa', ':a/:b', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,    null],
      ],
    },
    // d/d + d/s:b* + s/d:b* + s/s*3
    {
      routes: [
        ':a/:b',
        ':a/a',
        ':a/aa',
        'a/:b',
        'aa/:b',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['a/aa',    'a/aa',  null],
        ['a/aaa',   'a/:b',  { b: 'aaa' }],
        ['aa/a',    'aa/a',  null],
        ['aa/aa',   'aa/:b', { b: 'aa' }],
        ['aa/aaa',  'aa/:b', { b: 'aaa' }],
        ['aaa/a',   ':a/a',  { a: 'aaa' }],
        ['aaa/aa',  ':a/aa', { a: 'aaa' }],
        ['aaa/aaa', ':a/:b', { a: 'aaa', b: 'aaa' }],
        ['a/a/a',   null,    null],
      ],
    },
    // #endregion
    {
      routes: [
        ':a?',
      ],
      tests: [
        ['',    ':a?', { a: void 0 }],
        ['a',   ':a?', { a: 'a' }],
        ['aa',  ':a?', { a: 'aa' }],
        ['aaa', ':a?', { a: 'aaa' }],
        ['a/a', null,  null],
      ],
    },
    // #region 2-depth optional dynamic routes
    // d/s
    {
      routes: [
        ':a?/a',
        'a/a',
      ],
      tests: [
        ['',      null,    null],
        // ['a',     ':a?/a', { a: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  null,    null],
        ['aa/a',  ':a?/a', { a: 'aa' }],
        ['aa/aa', null,    null],
        ['a/a/a', null,    null],
      ],
    },
    {
      routes: [
        ':a?/a',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,    null],
        // ['a',     ':a?/a', { a: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  null,    null],
        ['aa/a',  'aa/a',  null],
        ['aaa/a', ':a?/a', { a: 'aaa' }],
        ['aa/aa', null,    null],
        ['a/a/a', null,    null],
      ],
    },
    // s/d
    {
      routes: [
        'a/:b?',
        'a/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a/:b?', { b: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/:b?', { b: 'aa' }],
        ['aa/a',  null,    null],
        ['aa/aa', null,    null],
        ['a/a/a', null,    null],
      ],
    },
    {
      routes: [
        'a/:b?',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a/:b?', { b: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/aa',  null],
        ['a/aaa', 'a/:b?', { b: 'aaa' }],
        ['aa/a',  null,    null],
        ['aa/aa', null,    null],
        ['a/a/a', null,    null],
      ],
    },
    // d/s + s/d
    {
      routes: [
        ':a?/a',
        'a/:b?',
        'a/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a/:b?', { b: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/:b?', { b: 'aa' }],
        ['aa/a',  ':a?/a', { a: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    {
      routes: [
        ':a?/a',
        'a/:b?',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a/:b?', { b: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/:b?', { b: 'aa' }],
        ['aa/a',  'aa/a',  null],
        ['aaa/a', ':a?/a', { a: 'aaa' }],
        ['a/a/a', null,    null],
      ],
    },
    {
      routes: [
        ':a?/a',
        'a/:b?',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a/:b?', { b: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/aa',  null],
        ['a/aaa', 'a/:b?', { b: 'aaa' }],
        ['aa/a',  ':a?/a', { a: 'aa' }],
        ['a/a/a', null,    null],
      ],
    },
    {
      routes: [
        ':a?/a',
        'a/:b?',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',      null,    null],
        ['a',     'a/:b?', { b: void 0 }],
        ['aa',    null,    null],
        ['aaa',   null,    null],
        ['a/a',   'a/a',   null],
        ['a/aa',  'a/aa',  null],
        ['a/aaa', 'a/:b?', { b: 'aaa' }],
        ['aa/a',  'aa/a',  null],
        ['aaa/a', ':a?/a', { a: 'aaa' }],
        ['a/a/a', null,    null],
      ],
    },
    // d/d + d/s + s/s
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        'a/a',
      ],
      tests: [
        ['',      ':a?/:b?', { a: void 0, b: void 0 }],
        // ['a',     ':a?/a',   { a: void 0 }],
        ['aa',    ':a?/:b?', { a: 'aa', b: void 0 }],
        ['aaa',   ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',   'a/a',     null],
        ['a/aa',  ':a?/:b?', { a: 'a', b: 'aa' }],
        ['aa/a',  ':a?/a',   { a: 'aa' }],
        ['aa/aa', ':a?/:b?', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,      null],
      ],
    },
    // d/d + d/s:b* + s/s
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        ':a?/aa',
        'a/a',
      ],
      tests: [
        ['',       ':a?/:b?', { a: void 0, b: void 0 }],
        // ['a',      ':a?/a',   { a: void 0 }],
        // ['aa',     ':a?/aa',  { a: void 0 }],
        ['aaa',    ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',    'a/a',     null],
        ['a/aa',   ':a?/aa',  { a: 'a' }],
        ['a/aaa',  ':a?/:b?', { a: 'a', b: 'aaa' }],
        ['aa/a',   ':a?/a',   { a: 'aa' }],
        ['aa/aa',  ':a?/aa',  { a: 'aa' }],
        ['aa/aaa', ':a?/:b?', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,      null],
      ],
    },
    // d/d + d/s + s/s:b*
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',      ':a?/:b?', { a: void 0, b: void 0 }],
        // ['a',     ':a?/a',   { a: void 0 }],
        ['aa',    ':a?/:b?', { a: 'aa', b: void 0 }],
        ['aaa',   ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',   'a/a',     null],
        ['a/aa',  ':a?/:b?', { a: 'a', b: 'aa' }],
        ['aa/a',  'aa/a',    null],
        ['aaa/a', ':a?/a',   { a: 'aaa' }],
        ['aa/aa', ':a?/:b?', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,      null],
      ],
    },
    // d/d + d/s:b* + s/s:b*
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        ':a?/aa',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',       ':a?/:b?', { a: void 0, b: void 0 }],
        // ['a',      ':a?/a',   { a: void 0 }],
        // ['aa',     ':a?/aa',  { a: void 0 }],
        ['aaa',    ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',    'a/a',     null],
        ['a/aa',   ':a?/aa',  { a: 'a' }],
        ['a/aaa',  ':a?/:b?', { a: 'a', b: 'aaa' }],
        ['aa/a',   'aa/a',    null],
        ['aaa/a',  ':a?/a',   { a: 'aaa' }],
        ['aa/aa',  ':a?/aa',  { a: 'aa' }],
        ['aa/aaa', ':a?/:b?', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,      null],
      ],
    },
    // d/d + s/d + s/s
    {
      routes: [
        ':a?/:b?',
        'a/:b?',
        'a/a',
      ],
      tests: [
        ['',      ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',     'a/:b?',   { b: void 0 }],
        ['aa',    ':a?/:b?', { a: 'aa', b: void 0 }],
        ['aaa',   ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',   'a/a',     null],
        ['a/aa',  'a/:b?',   { b: 'aa' }],
        ['aa/a',  ':a?/:b?', { a: 'aa', b: 'a' }],
        ['aa/aa', ':a?/:b?', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,      null],
      ],
    },
    // d/d + s/d:b* + s/s
    {
      routes: [
        ':a?/:b?',
        'a/:b?',
        'aa/:b?',
        'a/a',
      ],
      tests: [
        ['',       ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',      'a/:b?',   { b: void 0 }],
        ['aa',     'aa/:b?',  { b: void 0 }],
        ['aaa',    ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',    'a/a',     null],
        ['a/aa',   'a/:b?',   { b: 'aa' }],
        ['aa/a',   'aa/:b?',  { b: 'a' }],
        ['aa/aa',  'aa/:b?',  { b: 'aa' }],
        ['aaa/aa', ':a?/:b?', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,      null],
      ],
    },
    // d/d + s/d + s/s:b*
    {
      routes: [
        ':a?/:b?',
        'a/:b?',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',      ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',     'a/:b?',   { b: void 0 }],
        ['aa',    ':a?/:b?', { a: 'aa', b: void 0 }],
        ['aaa',   ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',   'a/a',     null],
        ['a/aa',  'a/aa',    null],
        ['a/aaa', 'a/:b?',   { b: 'aaa' }],
        ['aa/a',  ':a?/:b?', { a: 'aa', b: 'a' }],
        ['aa/aa', ':a?/:b?', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,      null],
      ],
    },
    // d/d + s/d:b* + s/s:b*
    {
      routes: [
        ':a?/:b?',
        'a/:b?',
        'aa/:b?',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',       ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',      'a/:b?',   { b: void 0 }],
        ['aa',     'aa/:b?',  { b: void 0 }],
        ['aaa',    ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',    'a/a',     null],
        ['a/aa',   'a/aa',    null],
        ['a/aaa',  'a/:b?',   { b: 'aaa' }],
        ['aa/a',   'aa/:b?',  { b: 'a' }],
        ['aa/aa',  'aa/:b?',  { b: 'aa' }],
        ['aaa/aa', ':a?/:b?', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,      null],
      ],
    },
    // d/d + d/s + s/d + s/s
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        'a/:b?',
        'a/a',
      ],
      tests: [
        ['',      ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',     'a/:b?',   { b: void 0 }],
        ['aa',    ':a?/:b?', { a: 'aa', b: void 0 }],
        ['aaa',   ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',   'a/a',     null],
        ['a/aa',  'a/:b?',   { b: 'aa' }],
        ['aa/a',  ':a?/a',   { a: 'aa' }],
        ['aa/aa', ':a?/:b?', { a: 'aa', b: 'aa' }],
        ['a/a/a', null,      null],
      ],
    },
    // d/d + d/s:b* + s/d + s/s
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        ':a?/aa',
        'a/:b?',
        'a/a',
      ],
      tests: [
        ['',       ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',      'a/:b?',   { b: void 0 }],
        // ['aa',     ':a?/aa',  { a: void 0 }],
        ['aaa',    ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',    'a/a',     null],
        ['a/aa',   'a/:b?',   { b: 'aa' }],
        ['aa/a',   ':a?/a',   { a: 'aa' }],
        ['aa/aa',  ':a?/aa',  { a: 'aa' }],
        ['aa/aaa', ':a?/:b?', { a: 'aa', b: 'aaa' }],
        ['a/a/a',  null,      null],
      ],
    },
    // d/d + d/s + s/d:b* + s/s
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        'a/:b?',
        'aa/:b?',
        'a/a',
      ],
      tests: [
        ['',       ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',      'a/:b?',   { b: void 0 }],
        ['aa',     'aa/:b?',  { b: void 0 }],
        ['aaa',    ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',    'a/a',     null],
        ['a/aa',   'a/:b?',   { b: 'aa' }],
        ['aa/a',   'aa/:b?',  { b: 'a' }],
        ['aa/aa',  'aa/:b?',  { b: 'aa' }],
        ['aaa/aa', ':a?/:b?', { a: 'aaa', b: 'aa' }],
        ['a/a/a',  null,      null],
      ],
    },
    // d/d + d/s:b* + s/d:b* + s/s
    {
      routes: [
        ':a?/:b?',
        ':a?/a',
        ':a?/aa',
        'a/:b?',
        'aa/:b?',
        'a/a',
      ],
      tests: [
        ['',        ':a?/:b?', { a: void 0, b: void 0 }],
        ['a',       'a/:b?',   { b: void 0 }],
        ['aa',      'aa/:b?',  { b: void 0 }],
        ['aaa',     ':a?/:b?', { a: 'aaa', b: void 0 }],
        ['a/a',     'a/a',     null],
        ['a/aa',    'a/:b?',   { b: 'aa' }],
        ['aa/a',    'aa/:b?',  { b: 'a' }],
        ['aa/aa',   'aa/:b?',  { b: 'aa' }],
        ['aa/aaa',  'aa/:b?',  { b: 'aaa' }],
        ['aaa/aa',  ':a?/aa',  { a: 'aaa' }],
        ['aaa/aaa', ':a?/:b?', { a: 'aaa', b: 'aaa' }],
        ['a/a/a',   null,      null],
      ],
    },
    // #endregion
    // #region 1-depth star routes
    {
      routes: [
        ':a*',
      ],
      tests: [
        ['',      ':a*', { a: '' }],
        ['a',     ':a*', { a: 'a' }],
        ['aa',    ':a*', { a: 'aa' }],
        // ['a/a',   ':a*', { a: 'a/a' }],
        // ['aa/a',  ':a*', { a: 'aa/a' }],
        // ['a/aa',  ':a*', { a: 'a/aa' }],
        // ['aa/aa', ':a*', { a: 'aa/aa' }],
        // ['a/a/a', ':a*', { a: 'a/a/a' }],
      ],
    },
    // {
    //   routes: [
    //     '',
    //     ':a*',
    //   ],
    //   tests: [
    //     ['',      '',   null],
    //     ['a',     ':a*', { a: 'a' }],
    //     ['aa',    ':a*', { a: 'aa' }],
    //     ['a/a',   ':a*', { a: 'a/a' }],
    //     ['aa/a',  ':a*', { a: 'aa/a' }],
    //     ['a/aa',  ':a*', { a: 'a/aa' }],
    //     ['aa/aa', ':a*', { a: 'aa/aa' }],
    //     ['a/a/a', ':a*', { a: 'a/a/a' }],
    //   ],
    // },
    {
      routes: [
        ':a*',
        'a',
      ],
      tests: [
        ['',      ':a*', { a: '' }],
        ['a',     'a',  null],
        ['aa',    ':a*', { a: 'aa' }],
        // ['a/a',   ':a*', { a: 'a/a' }],
        // ['aa/a',  ':a*', { a: 'aa/a' }],
        // ['a/aa',  ':a*', { a: 'a/aa' }],
        // ['aa/aa', ':a*', { a: 'aa/aa' }],
        // ['a/a/a', ':a*', { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        'a',
        'aa',
      ],
      tests: [
        ['',      ':a*', { a: '' }],
        ['a',     'a',  null],
        ['aa',    'aa', null],
        ['aaa',   ':a*', { a: 'aaa' }],
        // ['a/a',   ':a*', { a: 'a/a' }],
        // ['aa/a',  ':a*', { a: 'aa/a' }],
        // ['a/aa',  ':a*', { a: 'a/aa' }],
        // ['aa/aa', ':a*', { a: 'aa/aa' }],
        // ['a/a/a', ':a*', { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        'a',
        'aaa',
      ],
      tests: [
        ['',      ':a*',  { a:'' }],
        ['a',     'a',   null],
        ['aa',    ':a*',  { a: 'aa' }],
        ['aaa',   'aaa', null],
        ['aaaa',  ':a*',  { a: 'aaaa' }],
        // ['a/a',   ':a*',  { a: 'a/a' }],
        // ['aa/a',  ':a*',  { a: 'aa/a' }],
        // ['a/aa',  ':a*',  { a: 'a/aa' }],
        // ['aa/aa', ':a*',  { a: 'aa/aa' }],
        // ['a/a/a', ':a*',  { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        'aa',
        'aaa',
      ],
      tests: [
        ['',      ':a*',  { a:'' }],
        ['a',     ':a*',  { a: 'a' }],
        ['aa',    'aa',  null],
        ['aaa',   'aaa', null],
        ['aaaa',  ':a*',  { a: 'aaaa' }],
        // ['a/a',   ':a*',  { a: 'a/a' }],
        // ['aa/a',  ':a*',  { a: 'aa/a' }],
        // ['a/aa',  ':a*',  { a: 'a/aa' }],
        // ['aa/aa', ':a*',  { a: 'aa/aa' }],
        // ['a/a/a', ':a*',  { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        'a',
        'aa',
        'aaa',
      ],
      tests: [
        ['',      ':a*',  { a: '' }],
        ['a',     'a',   null],
        ['aa',    'aa',  null],
        ['aaa',   'aaa', null],
        ['aaaa',  ':a*',  { a: 'aaaa' }],
        // ['a/a',   ':a*',  { a: 'a/a' }],
        // ['aa/a',  ':a*',  { a: 'aa/a' }],
        // ['a/aa',  ':a*',  { a: 'a/aa' }],
        // ['aa/aa', ':a*',  { a: 'aa/aa' }],
        // ['a/a/a', ':a*',  { a: 'a/a/a' }],
      ],
    },
    // #endregion
    // #region 1-depth star + dynamic routes
    {
      routes: [
        ':a*',
        ':a',
      ],
      tests: [
        ['',      ':a*', { a: '' }],
        ['a',     ':a', { a: 'a' }],
        ['aa',    ':a', { a: 'aa' }],
        // ['a/a',   ':a*', { a: 'a/a' }],
        // ['aa/a',  ':a*', { a: 'aa/a' }],
        // ['a/aa',  ':a*', { a: 'a/aa' }],
        // ['aa/aa', ':a*', { a: 'aa/aa' }],
        // ['a/a/a', ':a*', { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        ':a',
        'a',
      ],
      tests: [
        ['',      ':a*', { a: '' }],
        ['a',     'a',  null],
        ['aa',    ':a', { a: 'aa' }],
        // ['a/a',   ':a*', { a: 'a/a' }],
        // ['aa/a',  ':a*', { a: 'aa/a' }],
        // ['a/aa',  ':a*', { a: 'a/aa' }],
        // ['aa/aa', ':a*', { a: 'aa/aa' }],
        // ['a/a/a', ':a*', { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        ':a',
        'a',
        'aa',
      ],
      tests: [
        ['',      ':a*', { a: '' }],
        ['a',     'a',  null],
        ['aa',    'aa', null],
        ['aaa',   ':a', { a: 'aaa' }],
        // ['a/a',   ':a*', { a: 'a/a' }],
        // ['aa/a',  ':a*', { a: 'aa/a' }],
        // ['a/aa',  ':a*', { a: 'a/aa' }],
        // ['aa/aa', ':a*', { a: 'aa/aa' }],
        // ['a/a/a', ':a*', { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        ':a',
        'a',
        'aaa',
      ],
      tests: [
        ['',      ':a*',  { a: '' }],
        ['a',     'a',   null],
        ['aa',    ':a',  { a: 'aa' }],
        ['aaa',   'aaa', null],
        ['aaaa',  ':a',  { a: 'aaaa' }],
        // ['a/a',   ':a*',  { a: 'a/a' }],
        // ['aa/a',  ':a*',  { a: 'aa/a' }],
        // ['a/aa',  ':a*',  { a: 'a/aa' }],
        // ['aa/aa', ':a*',  { a: 'aa/aa' }],
        // ['a/a/a', ':a*',  { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        ':a',
        'aa',
        'aaa',
      ],
      tests: [
        ['',      ':a*',  { a: '' }],
        ['a',     ':a',  { a: 'a' }],
        ['aa',    'aa',  null],
        ['aaa',   'aaa', null],
        ['aaaa',  ':a',  { a: 'aaaa' }],
        // ['a/a',   ':a*',  { a: 'a/a' }],
        // ['aa/a',  ':a*',  { a: 'aa/a' }],
        // ['a/aa',  ':a*',  { a: 'a/aa' }],
        // ['aa/aa', ':a*',  { a: 'aa/aa' }],
        // ['a/a/a', ':a*',  { a: 'a/a/a' }],
      ],
    },
    {
      routes: [
        ':a*',
        ':a',
        'a',
        'aa',
        'aaa',
      ],
      tests: [
        ['',      ':a*',  { a: '' }],
        ['a',     'a',   null],
        ['aa',    'aa',  null],
        ['aaa',   'aaa', null],
        ['aaaa',  ':a',  { a: 'aaaa' }],
        // ['a/a',   ':a*',  { a: 'a/a' }],
        // ['aa/a',  ':a*',  { a: 'aa/a' }],
        // ['a/aa',  ':a*',  { a: 'a/aa' }],
        // ['aa/aa', ':a*',  { a: 'aa/aa' }],
        // ['a/a/a', ':a*',  { a: 'a/a/a' }],
      ],
    },
    // #endregion
    // #region 2-depth dynamic routes
    // d/s
    {
      routes: [
        ':a(.)*/a',
      ],
      tests: [
        ['',       null,   null],
        ['a',      null,   null],
        ['aa',     null,   null],
        ['aaa',    null,   null],
        ['a/a',    ':a(.)*/a', { a: 'a' }],
        ['a/aa',   null,   null],
        ['aa/a',   ':a(.)*/a', { a: 'aa' }],
        ['aa/aa',  null,   null],
        ['a/a/a',  ':a(.)*/a', { a: 'a/a' }],
        ['aa/a/a', ':a(.)*/a', { a: 'aa/a' }],
        ['a/aa/a', ':a(.)*/a', { a: 'a/aa' }],
        ['a/a/aa',  null,  null],
      ],
    },
    {
      routes: [
        ':a(.)*/a',
        'a/a',
      ],
      tests: [
        ['',       null,   null],
        ['a',      null,   null],
        ['aa',     null,   null],
        ['aaa',    null,   null],
        ['a/a',    'a/a',  null],
        ['a/aa',   null,   null],
        ['aa/a',   ':a(.)*/a', { a: 'aa' }],
        ['aa/aa',  null,   null],
        ['a/a/a',  ':a(.)*/a', { a: 'a/a' }],
        ['aa/a/a', ':a(.)*/a', { a: 'aa/a' }],
        ['a/aa/a', ':a(.)*/a', { a: 'a/aa' }],
        ['a/a/aa',  null,  null],
      ],
    },
    {
      routes: [
        ':a(.)*/a',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',       null,   null],
        ['a',      null,   null],
        ['aa',     null,   null],
        ['aaa',    null,   null],
        ['a/a',    'a/a',  null],
        ['a/aa',   null,   null],
        ['aa/a',   'aa/a', null],
        ['aaa/a',  ':a(.)*/a', { a: 'aaa' }],
        ['aa/aa',  null,   null],
        ['a/a/a',  ':a(.)*/a', { a: 'a/a' }],
        ['aa/a/a', ':a(.)*/a', { a: 'aa/a' }],
        ['a/aa/a', ':a(.)*/a', { a: 'a/aa' }],
        ['a/a/aa',  null,  null],
      ],
    },
    // s/d
    {
      routes: [
        'a/:b*',
      ],
      tests: [
        ['',       null,   null],
        ['a',      'a/:b*', { b: void 0 }],
        ['aa',     null,   null],
        ['aaa',    null,   null],
        ['a/a',    'a/:b*', { b: 'a' }],
        ['a/aa',   'a/:b*', { b: 'aa' }],
        ['aa/a',   null,   null],
        ['aa/aa',  null,   null],
        ['a/a/a',  'a/:b*', { b: 'a/a' }],
        ['aa/a/a', null,   null],
      ],
    },
    {
      routes: [
        'a/:b*',
        'a/a',
      ],
      tests: [
        ['',       null,   null],
        ['a',      'a/:b*', { b: void 0 }],
        ['aa',     null,   null],
        ['aaa',    null,   null],
        ['a/a',    'a/a',  null],
        ['a/aa',   'a/:b*', { b: 'aa' }],
        ['aa/a',   null,   null],
        ['aa/aa',  null,   null],
        ['a/a/a',  'a/:b*', { b: 'a/a' }],
        ['a/aa/a', 'a/:b*', { b: 'aa/a' }],
        ['a/a/aa', 'a/:b*', { b: 'a/aa' }],
        ['aa/a/a', null,   null],
      ],
    },
    {
      routes: [
        'a/:b*',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',       null,   null],
        ['a',      'a/:b*', { b: void 0 }],
        ['aa',     null,   null],
        ['aaa',    null,   null],
        ['a/a',    'a/a',  null],
        ['a/aa',   'a/aa', null],
        ['a/aaa',  'a/:b*', { b: 'aaa' }],
        ['aa/a',   null,   null],
        ['aa/aa',  null,   null],
        ['a/a/a',  'a/:b*', { b: 'a/a' }],
        ['a/aa/a', 'a/:b*', { b: 'aa/a' }],
        ['a/a/aa', 'a/:b*', { b: 'a/aa' }],
        ['aa/a/a', null,   null],
      ],
    },
    // d/s + s/d
    {
      routes: [
        ':a(.)*/a',
        'a/:b*',
      ],
      tests: [
        ['',        null,   null],
        ['a',       'a/:b*', { b: void 0 }],
        ['aa',      null,   null],
        ['aaa',     null,   null],
        ['a/a',     'a/:b*', { b: 'a' }],
        ['a/aa',    'a/:b*', { b: 'aa' }],
        ['aa/a',    ':a(.)*/a', { a: 'aa' }],
        ['aa/aa',   null,   null],
        ['a/a/a',   'a/:b*', { b: 'a/a' }],
        ['a/aa/a',  'a/:b*', { b: 'aa/a' }],
        ['a/a/aa',  'a/:b*', { b: 'a/aa' }],
        ['aa/a/a',  ':a(.)*/a', { a: 'aa/a' }],
        ['aa/a/aa', null,   null],
      ],
    },
    {
      routes: [
        ':a(.)*/a',
        'a/:b*',
        'a/a',
      ],
      tests: [
        ['',        null,   null],
        ['a',       'a/:b*', { b: void 0 }],
        ['aa',      null,   null],
        ['aaa',     null,   null],
        ['a/a',     'a/a',  null],
        ['a/aa',    'a/:b*', { b: 'aa' }],
        ['aa/a',    ':a(.)*/a', { a: 'aa' }],
        ['aa/aa',   null,   null],
        ['a/a/a',   'a/:b*', { b: 'a/a' }],
        ['a/aa/a',  'a/:b*', { b: 'aa/a' }],
        ['a/a/aa',  'a/:b*', { b: 'a/aa' }],
        ['aa/a/a',  ':a(.)*/a', { a: 'aa/a' }],
        ['aa/a/aa', null,   null],
      ],
    },
    {
      routes: [
        ':a(.)*/a',
        'a/:b*',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',        null,   null],
        ['a',       'a/:b*', { b: void 0 }],
        ['aa',      null,   null],
        ['aaa',     null,   null],
        ['a/a',     'a/a',  null],
        ['a/aa',    'a/:b*', { b: 'aa' }],
        ['aa/a',    'aa/a', null],
        ['aaa/a',   ':a(.)*/a', { a: 'aaa' }],
        ['aa/aa',   null,   null],
        ['a/a/a',   'a/:b*', { b: 'a/a' }],
        ['a/aa/a',  'a/:b*', { b: 'aa/a' }],
        ['a/a/aa',  'a/:b*', { b: 'a/aa' }],
        ['aa/a/a',  ':a(.)*/a', { a: 'aa/a' }],
        ['aa/a/aa', null,   null],
      ],
    },
    {
      routes: [
        ':a(.)*/a',
        'a/:b*',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',        null,   null],
        ['a',       'a/:b*', { b: void 0 }],
        ['aa',      null,   null],
        ['aaa',     null,   null],
        ['a/a',     'a/a',  null],
        ['a/aa',    'a/aa', null],
        ['a/aaa',   'a/:b*', { b: 'aaa' }],
        ['aa/a',    ':a(.)*/a', { a: 'aa' }],
        ['aa/aa',   null,   null],
        ['a/a/a',   'a/:b*', { b: 'a/a' }],
        ['a/aa/a',  'a/:b*', { b: 'aa/a' }],
        ['a/a/aa',  'a/:b*', { b: 'a/aa' }],
        ['aa/a/a',  ':a(.)*/a', { a: 'aa/a' }],
        ['aa/a/aa', null,   null],
      ],
    },
    {
      routes: [
        ':a(.)*/a',
        'a/:b*',
        'a/a',
        'a/aa',
        'aa/a',
      ],
      tests: [
        ['',        null,   null],
        ['a',       'a/:b*', { b: void 0 }],
        ['aa',      null,   null],
        ['aaa',     null,   null],
        ['a/a',     'a/a',  null],
        ['a/aa',    'a/aa', null],
        ['a/aaa',   'a/:b*', { b: 'aaa' }],
        ['aa/a',    'aa/a', null],
        ['aaa/a',   ':a(.)*/a', { a: 'aaa' }],
        ['aa/aa',   null,   null],
        ['a/a/a',   'a/:b*', { b: 'a/a' }],
        ['a/aa/a',  'a/:b*', { b: 'aa/a' }],
        ['a/a/aa',  'a/:b*', { b: 'a/aa' }],
        ['aa/a/a',  ':a(.)*/a', { a: 'aa/a' }],
        ['aa/a/aa', null,   null],
      ],
    },
    // d/d
    {
      routes: [
        ':a(.)*/:b*',
      ],
      tests: [
        ['',        ':a(.)*/:b*', { a:'',         b: void 0 }],
        ['a',       ':a(.)*/:b*', { a:'a',        b: void 0 }],
        ['aa',      ':a(.)*/:b*', { a:'aa',       b: void 0 }],
        ['aaa',     ':a(.)*/:b*', { a:'aaa',      b: void 0 }],
        ['a/a',     ':a(.)*/:b*', { a: 'a/a',     b: void 0 }],
        ['a/aa',    ':a(.)*/:b*', { a: 'a/aa',    b: void 0 }],
        ['aa/a',    ':a(.)*/:b*', { a: 'aa/a',    b: void 0 }],
        ['aa/aa',   ':a(.)*/:b*', { a: 'aa/aa',   b: void 0 }],
        ['a/a/a',   ':a(.)*/:b*', { a: 'a/a/a',   b: void 0 }],
        ['a/aa/a',  ':a(.)*/:b*', { a: 'a/aa/a',  b: void 0 }],
        ['a/a/aa',  ':a(.)*/:b*', { a: 'a/a/aa',  b: void 0 }],
        ['aa/a/a',  ':a(.)*/:b*', { a: 'aa/a/a',  b: void 0 }],
        ['aa/aa/a', ':a(.)*/:b*', { a: 'aa/aa/a', b: void 0 }],
        ['aa/a/aa', ':a(.)*/:b*', { a: 'aa/a/aa', b: void 0 }],
      ],
    },
    // d/d + d/s
    {
      routes: [
        ':a(.)*/:b*',
        ':a(.)*/a',
      ],
      tests: [
        ['',        ':a(.)*/:b*', { a:'',         b: void 0 }],
        ['a',       ':a(.)*/:b*', { a:'a',        b: void 0 }],
        ['aa',      ':a(.)*/:b*', { a:'aa',       b: void 0 }],
        ['aaa',     ':a(.)*/:b*', { a:'aaa',      b: void 0 }],
        ['a/a',     ':a(.)*/a',   { a: 'a'                  }],
        ['a/aa',    ':a(.)*/:b*', { a: 'a/aa',    b: void 0 }],
        ['aa/a',    ':a(.)*/a',   { a: 'aa'                 }],
        ['aa/aa',   ':a(.)*/:b*', { a: 'aa/aa',   b: void 0 }],
        ['a/a/a',   ':a(.)*/a',   { a: 'a/a'                }],
        ['a/aa/a',  ':a(.)*/a',   { a: 'a/aa'               }],
        ['a/a/aa',  ':a(.)*/:b*', { a: 'a/a/aa',  b: void 0 }],
        ['aa/a/a',  ':a(.)*/a',   { a: 'aa/a'               }],
        ['aa/aa/a', ':a(.)*/a',   { a: 'aa/aa'              }],
        ['aa/a/aa', ':a(.)*/:b*', { a: 'aa/a/aa', b: void 0 }],
      ],
    },
    // d/d + d/s + s/s
    {
      routes: [
        ':a(.)*/:b*',
        ':a(.)*/a',
        'a/a',
      ],
      tests: [
        ['',        ':a(.)*/:b*', { a:'',         b: void 0 }],
        ['a',       ':a(.)*/:b*', { a:'a',        b: void 0 }],
        ['aa',      ':a(.)*/:b*', { a:'aa',       b: void 0 }],
        ['aaa',     ':a(.)*/:b*', { a:'aaa',      b: void 0 }],
        ['a/a',     'a/a',   null],
        ['a/aa',    ':a(.)*/:b*', { a: 'a/aa',    b: void 0 }],
        ['aa/a',    ':a(.)*/a',   { a: 'aa'                 }],
        ['aa/aa',   ':a(.)*/:b*', { a: 'aa/aa',   b: void 0 }],
        ['a/a/a',   ':a(.)*/a',   { a: 'a/a'                }],
        ['a/aa/a',  ':a(.)*/a',   { a: 'a/aa'               }],
        ['a/a/aa',  ':a(.)*/:b*', { a: 'a/a/aa',  b: void 0 }],
        ['aa/a/a',  ':a(.)*/a',   { a: 'aa/a'               }],
        ['aa/aa/a', ':a(.)*/a',   { a: 'aa/aa'              }],
        ['aa/a/aa', ':a(.)*/:b*', { a: 'aa/a/aa', b: void 0 }],
      ],
    },
    // d/d + d/s:b* + s/s
    {
      routes: [
        ':a(.)*/:b*',
        ':a(.)*/a',
        ':a(.)*/aa',
        'a/a',
      ],
      tests: [
        ['',         ':a(.)*/:b*', { a:'',         b: void 0 }],
        ['a',        ':a(.)*/:b*', { a:'a',        b: void 0 }],
        ['aa',       ':a(.)*/:b*', { a:'aa',       b: void 0 }],
        ['aaa',      ':a(.)*/:b*', { a:'aaa',      b: void 0 }],
        ['a/a',      'a/a',    null],
        ['a/aa',     ':a(.)*/aa',  { a: 'a'                   }],
        ['a/aaa',    ':a(.)*/:b*', { a: 'a/aaa',    b: void 0 }],
        ['aa/a',     ':a(.)*/a',   { a: 'aa'                  }],
        ['aa/aa',    ':a(.)*/aa',  { a: 'aa'                  }],
        ['aa/aaa',   ':a(.)*/:b*', { a: 'aa/aaa',   b: void 0 }],
        ['a/a/a',    ':a(.)*/a',   { a: 'a/a'                 }],
        ['a/aa/a',   ':a(.)*/a',   { a: 'a/aa'                }],
        ['a/a/aa',   ':a(.)*/aa',  { a: 'a/a'                 }],
        ['a/a/aaa',  ':a(.)*/:b*', { a: 'a/a/aaa',  b: void 0 }],
        ['aa/a/a',   ':a(.)*/a',   { a: 'aa/a'                }],
        ['aa/aa/a',  ':a(.)*/a',   { a: 'aa/aa'               }],
        ['aa/a/aa',  ':a(.)*/aa',  { a: 'aa/a'                }],
        ['aa/a/aaa', ':a(.)*/:b*', { a: 'aa/a/aaa', b: void 0 }],
      ],
    },
    // d/d + d/s + s/s:b*
    {
      routes: [
        ':a*/:b*',
        ':a*/a',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['aa/a',    'aa/a',  null],
        ['a/aa',    ':a*/:b*', { a: 'a', b: 'aa' }],
        ['aa/aa',   ':a*/:b*', { a: 'aa', b: 'aa' }],
        ['a/a/a',   ':a*/a',  { a: 'a/a' }],
        ['a/aa/a',  ':a*/a',  { a: 'a/aa' }],
        ['a/a/aa',  ':a*/:b*', { a: 'a', b: 'a/aa' }],
        ['aa/a/a',  ':a*/a',  { a: 'aa/a' }],
        ['aa/aa/a', ':a*/a',  { a: 'aa/aa' }],
        ['aa/a/aa', ':a*/:b*', { a: 'aa', b: 'a/aa' }],
      ],
    },
    // d/d + d/s:b* + s/s:b*
    {
      routes: [
        ':a*/:b*',
        ':a*/a',
        ':a*/aa',
        'a/a',
        'aa/a',
      ],
      tests: [
        ['',         null,    null],
        ['a',        null,    null],
        ['aa',       null,    null],
        ['aaa',      null,    null],
        ['a/a',      'a/a',   null],
        ['aa/a',     'aa/a',  null],
        ['a/aa',     ':a*/aa', { a: 'a' }],
        ['a/aaa',    ':a*/:b*', { a: 'a', b: 'aaa' }],
        ['aa/aa',    ':a*/aa', { a: 'aa' }],
        ['aa/aaa',   ':a*/:b*', { a: 'aa', b: 'aaa' }],
        ['a/a/a',    ':a*/a',  { a: 'a/a' }],
        ['a/aa/a',   ':a*/a',  { a: 'a/aa' }],
        ['a/a/aa',   ':a*/aa', { a: 'a/a' }],
        ['a/a/aaa',  ':a*/:b*', { a: 'a', b: 'a/aaa' }],
        ['aa/a/a',   ':a*/a',  { a: 'aa/a' }],
        ['aa/aa/a',  ':a*/a',  { a: 'aa/aa' }],
        ['aa/a/aa',  ':a*/aa', { a: 'aa/a' }],
        ['aa/a/aaa', ':a*/:b*', { a: 'aa', b: 'a/aaa' }],
      ],
    },
    // d/d + s/d + s/s
    {
      routes: [
        ':a*/:b*',
        'a/:b*',
        'a/a',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['aa/a',    ':a*/:b*', { a: 'aa', b: 'a' }],
        ['a/aa',    'a/:b*',  { b: 'aa' }],
        ['aa/aa',   ':a*/:b*', { a: 'aa', b: 'aa' }],
        ['a/a/a',   'a/:b*',  { b: 'a/a' }],
        ['a/aa/a',  'a/:b*',  { b: 'aa/a' }],
        ['aa/a/a',  ':a*/:b*', { a: 'aa', b: 'a/a' }],
        ['a/a/aa',  'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa', 'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa', ':a*/:b*', { a: 'aa', b: 'a/aa' }],
      ],
    },
    // d/d + s/d:b* + s/s
    {
      routes: [
        ':a*/:b*',
        'a/:b*',
        'aa/:b*',
        'a/a',
      ],
      tests: [
        ['',         null,    null],
        ['a',        null,    null],
        ['aa',       null,    null],
        ['aaa',      null,    null],
        ['a/a',      'a/a',   null],
        ['aa/a',     'aa/:b*', { b: 'a' }],
        ['aaa/a',    ':a*/:b*', { a: 'aaa', b: 'a' }],
        ['a/aa',     'a/:b*',  { b: 'aa' }],
        ['aa/aa',    'aa/:b*', { b: 'aa' }],
        ['aaa/aa',   ':a*/:b*', { a: 'aaa', b: 'aa' }],
        ['a/a/a',    'a/:b*',  { b: 'a/a' }],
        ['a/aa/a',   'a/:b*',  { b: 'aa/a' }],
        ['aa/a/a',   'aa/:b*', { b: 'a/a' }],
        ['aaa/a/a',  ':a*/:b*', { a: 'aaa', b: 'a/a' }],
        ['a/a/aa',   'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa',  'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa',  'aa/:b*', { b: 'a/aa' }],
        ['aaa/a/aa', ':a*/:b*', { a: 'aaa', b: 'a/aa' }],
      ],
    },
    // d/d + s/d + s/s:b*
    {
      routes: [
        ':a*/:b*',
        'a/:b*',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',        null,    null],
        ['a',       null,    null],
        ['aa',      null,    null],
        ['aaa',     null,    null],
        ['a/a',     'a/a',   null],
        ['a/aa',    'a/aa',  null],
        ['aa/a',    ':a*/:b*', { a: 'aa', b: 'a' }],
        ['aa/aa',   ':a*/:b*', { a: 'aa', b: 'aa' }],
        ['a/a/a',   'a/:b*',  { b: 'a/a' }],
        ['a/aa/a',  'a/:b*',  { b: 'aa/a' }],
        ['aa/a/a',  ':a*/:b*', { a: 'aa', b: 'a/a' }],
        ['a/a/aa',  'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa', 'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa', ':a*/:b*', { a: 'aa', b: 'a/aa' }],
      ],
    },
    // d/d + s/d:b* + s/s:b*
    {
      routes: [
        ':a*/:b*',
        'a/:b*',
        'aa/:b*',
        'a/a',
        'a/aa',
      ],
      tests: [
        ['',         null,    null],
        ['a',        null,    null],
        ['aa',       null,    null],
        ['aaa',      null,    null],
        ['a/a',      'a/a',   null],
        ['a/aa',     'a/aa',  null],
        ['aa/a',     'aa/:b*', { b: 'a' }],
        ['aaa/a',    ':a*/:b*', { a: 'aaa', b: 'a' }],
        ['aa/aa',    'aa/:b*', { b: 'aa' }],
        ['aaa/aa',   ':a*/:b*', { a: 'aaa', b: 'aa' }],
        ['a/a/a',    'a/:b*',  { b: 'a/a' }],
        ['a/aa/a',   'a/:b*',  { b: 'aa/a' }],
        ['aa/a/a',   'aa/:b*', { b: 'a/a' }],
        ['aaa/a/a',  ':a*/:b*', { a: 'aaa', b: 'a/a' }],
        ['a/a/aa',   'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa',  'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa',  'aa/:b*', { b: 'a/aa' }],
        ['aaa/a/aa', ':a*/:b*', { a: 'aaa', b: 'a/aa' }],
      ],
    },
    // d/d + d/s + s/d + s/s
    {
      routes: [
        ':a*/:b*',
        ':a*/a',
        'a/:b*',
        'a/a',
      ],
      tests: [
        ['',         null,    null],
        ['a',        null,    null],
        ['aa',       null,    null],
        ['aaa',      null,    null],
        ['a/a',      'a/a',   null],
        ['aa/a',     ':a*/a',  { a: 'aa' }],
        ['a/aa',     'a/:b*',  { b: 'aa' }],
        ['aa/aa',    ':a*/:b*', { a: 'aa', b: 'aa' }],
        ['a/a/a',    'a/:b*',  { b: 'a/a' }],
        ['aa/a/a',   ':a*/a',  { a: 'aa/a' }],
        ['a/aa/a',   'a/:b*',  { b: 'aa/a' }],
        ['aa/aa/a',  ':a*/a',  { a: 'aa/aa' }],
        ['a/a/aa',   'a/:b*',  { b: 'a/aa' }],
        ['aa/a/aa',  ':a*/:b*', { a: 'aa', b: 'a/aa' }],
        ['a/aa/aa',  'a/:b*',  { b: 'aa/aa' }],
        ['aa/aa/aa', ':a*/:b*', { a: 'aa', b: 'aa/aa' }],
      ],
    },
    // d/d + d/s:b* + s/d + s/s
    {
      routes: [
        ':a*/:b*',
        ':a*/a',
        ':a*/aa',
        'a/:b*',
        'a/a',
      ],
      tests: [
        ['',          null,    null],
        ['a',         null,    null],
        ['aa',        null,    null],
        ['aaa',       null,    null],
        ['a/a',       'a/a',   null],
        ['aa/a',      ':a*/a',  { a: 'aa' }],
        ['a/aa',      'a/:b*',  { b: 'aa' }],
        ['aa/aa',     ':a*/aa', { a: 'aa' }],
        ['aa/aaa',    ':a*/:b*', { a: 'aa', b: 'aaa' }],
        ['a/a/a',     'a/:b*',  { b: 'a/a' }],
        ['aa/a/a',    ':a*/a',  { a: 'aa/a' }],
        ['a/aa/a',    'a/:b*',  { b: 'aa/a' }],
        ['aa/aa/a',   ':a*/a',  { a: 'aa/aa' }],
        ['a/a/aa',    'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa',   'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa',   ':a*/aa', { a: 'aa/a' }],
        ['aa/a/aaa',  ':a*/:b*', { a: 'aa', b: 'a/aaa' }],
        ['aa/aa/aa',  ':a*/aa', { a: 'aa/aa' }],
        ['aa/aa/aaa', ':a*/:b*', { a: 'aa', b: 'aa/aaa' }],
      ],
    },
    // d/d + d/s + s/d:b* + s/s
    {
      routes: [
        ':a*/:b*',
        ':a*/a',
        'a/:b*',
        'aa/:b*',
        'a/a',
      ],
      tests: [
        ['',          null,    null],
        ['a',         null,    null],
        ['aa',        null,    null],
        ['aaa',       null,    null],
        ['a/a',       'a/a',   null],
        ['aa/a',      'aa/:b*', { b: 'a' }],
        ['aaa/a',     ':a*/a',  { a: 'aaa' }],
        ['a/aa',      'a/:b*',  { b: 'aa' }],
        ['aa/aa',     'aa/:b*', { b: 'aa' }],
        ['aaa/aa',    ':a*/:b*', { a: 'aaa', b: 'aa' }],
        ['a/a/a',     'a/:b*',  { b: 'a/a' }],
        ['aa/a/a',    'aa/:b*', { b: 'a/a' }],
        ['aaa/a/a',   ':a*/a',  { a: 'aaa/a' }],
        ['a/aa/a',    'a/:b*',  { b: 'aa/a' }],
        ['aa/aa/a',   'aa/:b*', { b: 'aa/a' }],
        ['aaa/aa/a',  ':a*/a',  { a: 'aaa/aa' }],
        ['a/a/aa',    'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa',   'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa',   'aa/:b*', { b: 'a/aa' }],
        ['aaa/a/aa',  ':a*/:b*', { a: 'aaa', b: 'a/aa' }],
        ['aa/aa/aa',  'aa/:b*', { b: 'aa/aa' }],
        ['aaa/aa/aa', ':a*/:b*', { a: 'aaa', b: 'aa/aa' }],
      ],
    },
    // d/d + d/s:b* + s/d:b* + s/s
    {
      routes: [
        ':a*/:b*',
        ':a*/a',
        ':a*/aa',
        'a/:b*',
        'aa/:b*',
        'a/a',
      ],
      tests: [
        ['',           null,    null],
        ['a',          null,    null],
        ['aa',         null,    null],
        ['aaa',        null,    null],
        ['a/a',        'a/a',   null],
        ['aa/a',       'aa/:b*', { b: 'a' }],
        ['aaa/a',      ':a*/a',  { a: 'aaa' }],
        ['a/aa',       'a/:b*',  { b: 'aa' }],
        ['aa/aa',      'aa/:b*', { b: 'aa' }],
        ['aaa/aa',     ':a*/aa', { a: 'aaa' }],
        ['aaa/aaa',    ':a*/:b*', { a: 'aaa', b: 'aaa' }],
        ['a/a/a',      'a/:b*',  { b: 'a/a' }],
        ['aa/a/a',     'aa/:b*', { b: 'a/a' }],
        ['aaa/a/a',    ':a*/a',  { a: 'aaa/a' }],
        ['a/aa/a',     'a/:b*',  { b: 'aa/a' }],
        ['aa/aa/a',    'aa/:b*', { b: 'aa/a' }],
        ['aaa/aa/a',   ':a*/a',  { a: 'aaa/aa' }],
        ['a/a/aa',     'a/:b*',  { b: 'a/aa' }],
        ['a/aa/aa',    'a/:b*',  { b: 'aa/aa' }],
        ['aa/a/aa',    'aa/:b*', { b: 'a/aa' }],
        ['aaa/a/aa',   ':a*/aa', { a: 'aaa/a' }],
        ['aaa/a/aaa',  ':a*/:b*', { a: 'aaa', b: 'a/aaa' }],
        ['aa/aa/aa',   'aa/:b*', { b: 'aa/aa' }],
        ['aaa/aa/aa',  ':a*/aa', { a: 'aaa/aa' }],
        ['aaa/aa/aaa', ':a*/:b*', { a: 'aaa', b: 'aa/aaa' }],
      ],
    },
    // #endregion
    // #region complex combinations
    // TODO(fkleuver): this is not done yet. Plenty of edge cases still to be added (esp. with dynamic vs optional dynamic with star segments, etc)
    {
      routes: [
        'a',
        'a/a',
        'a/a/a',
        'a/a/aa',
        'a/a/:c',
        'a/a/:c?/a',
        'a/a/:c?/aa',
        'a/aa',
        'a/aa/a',
        'a/aa/aa',
        'a/aa/:c',
        'a/aa/:c?/a',
        'a/aa/:c?/aa',
        'a/:b',
        'a/:b/a',
        'a/:b/aa',
        'a/:b/:c',
        'a/:b/:c?/a',
        'a/:b/:c?/aa',
        'aa',
        'aa/a',
        'aa/a/a',
        'aa/a/aa',
        'aa/a/:c',
        'aa/a/:c?/a',
        'aa/a/:c?/aa',
        'aa/aa',
        'aa/aa/a',
        'aa/aa/aa',
        'aa/aa/:c',
        'aa/aa/:c?/a',
        'aa/aa/:c?/aa',
        'aa/:b',
        'aa/:b/a',
        'aa/:b/aa',
        'aa/:b/:c',
        'aa/:b/:c?/a',
        'aa/:b/:c?/aa',
        ':a',
        ':a/a',
        ':a/a/a',
        ':a/a/aa',
        ':a/a/:c',
        ':a/a/:c?/a',
        ':a/a/:c?/aa',
        ':a/aa',
        ':a/aa/a',
        ':a/aa/aa',
        ':a/aa/:c',
        ':a/aa/:c?/a',
        ':a/aa/:c?/aa',
        ':a/:b',
        ':a/:b/a',
        ':a/:b/aa',
        ':a/:b/:c',
        ':a/:b/:c?/a',
        ':a/:b/:c?/aa',
      ],
      tests: [
        ['a',              'a',            null],
        ['a/a',            'a/a',          null],
        ['a/a/a',          'a/a/:c?/a',    { c: void 0 }],
        ['a/a/aa',         'a/a/:c?/aa',   { c: void 0 }],
        ['a/a/aaa',        'a/a/:c',       { c: 'aaa' }],
        ['a/a/aaa/a',      'a/a/:c?/a',    { c: 'aaa' }],
        ['a/a/aaa/aa',     'a/a/:c?/aa',   { c: 'aaa' }],
        ['a/aa',           'a/aa',         null],
        ['a/aa/a',         'a/aa/:c?/a',   { c: void 0 }],
        ['a/aa/aa',        'a/aa/:c?/aa',  { c: void 0 }],
        ['a/aa/aaa',       'a/aa/:c',      { c: 'aaa' }],
        ['a/aa/aaa/a',     'a/aa/:c?/a',   { c: 'aaa' }],
        ['a/aa/aaa/aa',    'a/aa/:c?/aa',  { c: 'aaa' }],
        ['a/aaa',          'a/:b',         { b: 'aaa' }],
        ['a/aaa/a',        'a/:b/:c?/a',   { b: 'aaa', c: void 0 }],
        ['a/aaa/aa',       'a/:b/:c?/aa',  { b: 'aaa', c: void 0 }],
        ['a/aaa/aaa',      'a/:b/:c',      { b: 'aaa', c: 'aaa' }],
        ['a/aaa/aaa/a',    'a/:b/:c?/a',   { b: 'aaa', c: 'aaa' }],
        ['a/aaa/aaa/aa',   'a/:b/:c?/aa',  { b: 'aaa', c: 'aaa' }],
        ['aa',             'aa',           null],
        ['aa/a',           'aa/a',         null],
        ['aa/a/a',         'aa/a/:c?/a',   { c: void 0 }],
        ['aa/a/aa',        'aa/a/:c?/aa',  { c: void 0 }],
        ['aa/a/aaa',       'aa/a/:c',      { c: 'aaa' }],
        ['aa/a/aaa/a',     'aa/a/:c?/a',   { c: 'aaa' }],
        ['aa/a/aaa/aa',    'aa/a/:c?/aa',  { c: 'aaa' }],
        ['aa/aa',          'aa/aa',        null],
        ['aa/aa/a',        'aa/aa/:c?/a',  { c: void 0 }],
        ['aa/aa/aa',       'aa/aa/:c?/aa', { c: void 0 }],
        ['aa/aa/aaa',      'aa/aa/:c',     { c: 'aaa' }],
        ['aa/aa/aaa/a',    'aa/aa/:c?/a',  { c: 'aaa' }],
        ['aa/aa/aaa/aa',   'aa/aa/:c?/aa', { c: 'aaa' }],
        ['aa/aaa',         'aa/:b',        { b: 'aaa' }],
        ['aa/aaa/a',       'aa/:b/:c?/a',  { b: 'aaa', c: void 0 }],
        ['aa/aaa/aa',      'aa/:b/:c?/aa', { b: 'aaa', c: void 0 }],
        ['aa/aaa/aaa',     'aa/:b/:c',     { b: 'aaa', c: 'aaa' }],
        ['aa/aaa/aaa/a',   'aa/:b/:c?/a',  { b: 'aaa', c: 'aaa' }],
        ['aa/aaa/aaa/aa',  'aa/:b/:c?/aa', { b: 'aaa', c: 'aaa' }],
        ['aaa',            ':a',           { a: 'aaa' }],
        ['aaa/a',          ':a/a',         { a: 'aaa' }],
        ['aaa/a/a',        ':a/a/:c?/a',   { a: 'aaa', c: void 0 }],
        ['aaa/a/aa',       ':a/a/:c?/aa',  { a: 'aaa', c: void 0 }],
        ['aaa/a/aaa',      ':a/a/:c',      { a: 'aaa', c: 'aaa' }],
        ['aaa/a/aaa/a',    ':a/a/:c?/a',   { a: 'aaa', c: 'aaa' }],
        ['aaa/a/aaa/aa',   ':a/a/:c?/aa',  { a: 'aaa', c: 'aaa' }],
        ['aaa/aa',         ':a/aa',        { a: 'aaa' }],
        ['aaa/aa/a',       ':a/aa/:c?/a',  { a: 'aaa', c: void 0 }],
        ['aaa/aa/aa',      ':a/aa/:c?/aa', { a: 'aaa', c: void 0 }],
        ['aaa/aa/aaa',     ':a/aa/:c',     { a: 'aaa', c: 'aaa' }],
        ['aaa/aa/aaa/a',   ':a/aa/:c?/a',  { a: 'aaa', c: 'aaa' }],
        ['aaa/aa/aaa/aa',  ':a/aa/:c?/aa', { a: 'aaa', c: 'aaa' }],
        ['aaa/aaa',        ':a/:b',        { a: 'aaa', b: 'aaa' }],
        ['aaa/aaa/a',      ':a/:b/:c?/a',  { a: 'aaa', b: 'aaa', c: void 0 }],
        ['aaa/aaa/aa',     ':a/:b/:c?/aa', { a: 'aaa', b: 'aaa', c: void 0 }],
        ['aaa/aaa/aaa',    ':a/:b/:c',     { a: 'aaa', b: 'aaa', c: 'aaa' }],
        ['aaa/aaa/aaa/a',  ':a/:b/:c?/a',  { a: 'aaa', b: 'aaa', c: 'aaa' }],
        ['aaa/aaa/aaa/aa', ':a/:b/:c?/aa', { a: 'aaa', b: 'aaa', c: 'aaa' }],
      ],
    },
    // #endregion
  ];

  for (const hasLeadingSlash of [true, false]) {
    for (const hasTrailingSlash of [true, false]) {
      for (const reverseAdd of [true, false]) {
        for (const { tests, routes: $routes } of recognizeSpecs) {
          const routes = reverseAdd ? $routes.slice().reverse() : $routes;
          for (const [path, match, $params] of tests) {
            const leading = hasLeadingSlash ? '/' : '';
            const trailing = hasTrailingSlash ? '/' : '';

            let title = `should`;
            if (match === null) {
              title = `${title} reject '${path}' out of routes: [${routes.map(x => `'${x}'`).join(',')}]`;

              it(title, function () {
                // Arrange
                const sut = new RouteRecognizer();
                for (const route of routes) {
                  sut.add({ path: route, handler: null });
                }

                // Act
                const actual = sut.recognize(path);

                // Assert
                assert.strictEqual(actual, null);
              });
            } else {
              const input = `${leading}${path}${trailing}`;
              title = `${title} recognize '${input}' as '${match}' out of routes: [${routes.map(x => `'${x}'`).join(',')}]`;

              it(title, function () {
                // Arrange
                const sut = new RouteRecognizer();
                for (const route of routes) {
                  sut.add({ path: route, handler: null });
                }

                const params = { ...$params };
                // const paramNames = Object.keys(params);
                const configurableRoute = new ConfigurableRoute(match, false, null);
                // const endpoint = new Endpoint(configurableRoute, paramNames);
                const expected = new RecognizedRoute(configurableRoute, params);

                // Act
                const actual1 = sut.recognize(path);
                const actual2 = sut.recognize(path);

                // Assert
                assert.deepStrictEqual(actual1, actual2, `consecutive calls should return the same result`);
                assert.deepStrictEqual(actual1, expected);
              });
            }
          }
        }
      }
    }
  }

  for (const [path, match, routes, expectedParams] of [
    ['/a' ,  ':a?/a',  ['a/a', ':a?/a'],                        { a: void 0 }],
    ['/a' ,  ':a?/a',  ['aa/a', 'a/a', ':a?/a'],                { a: void 0 }],
    ['/a' ,  ':a?/a',  ['a/a', ':a?/a', ':a?/:b?'],             { a: void 0 }],
    ['/a' ,  ':a?/a',  ['a/a', ':a?/aa', ':a?/a', ':a?/:b?'],   { a: void 0 }],
    ['/aa', ':a?/aa',  ['a/a', ':a?/aa', ':a?/a', ':a?/:b?'],   { a: void 0 }],
    ['/a' ,  ':a?/a',  ['aa/a', 'a/a', ':a?/a', ':a?/:b?'],     { a: void 0 }],
    ['/a' ,  ':a?/a',  ['aa/a', 'a/a', ':a?/aa', ':a?/a', ':a?/:b?'],     { a: void 0 }],
    ['/aa', ':a?/aa',  ['aa/a', 'a/a', ':a?/aa', ':a?/a', ':a?/:b?'],     { a: void 0 }],
    ['/aa', ':a?/aa',  ['a/a', 'a/:b?', ':a?/aa', ':a?/a', ':a?/:b?'],    { a: void 0 }],
    ['a/a', ':a*',     [':a*'],                                           { a: 'a/a' }],
    ['aa/a', ':a*',     [':a*'],                                           { a: 'aa/a' }],
    ['a/aa', ':a*',     [':a*'],                                           { a: 'a/aa' }],
    ['a/aa', ':a*',     [':a*'],                                           { a: 'a/aa' }],
    ['aa/aa', ':a*',     [':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a', ':a*',     [':a*'],                                           { a: 'a/a/a' }],
    ['a/a',   ':a*',     ['a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',     ['a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',     ['a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',     ['a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',     ['a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',     ['aa', 'a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',     ['aa', 'a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',     ['aa', 'a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',     ['aa', 'a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',     ['aa', 'a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aaa', 'a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aaa', 'a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aaa', 'a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aaa', 'a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aaa', 'a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aaa', 'aa', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aaa', 'aa', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aaa', 'aa', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aaa', 'aa', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aaa', 'aa', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aaa', 'aa', 'a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aaa', 'aa', 'a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aaa', 'aa', 'a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aaa', 'aa', 'a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aaa', 'aa', 'a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        [':a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       [':a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       [':a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      [':a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      [':a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['a', ':a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['a', ':a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['a', ':a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['a', ':a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['a', ':a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aa', 'a', ':a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aa', 'a', ':a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aa', 'a', ':a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aa', 'a', ':a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aa', 'a', ':a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aaa', 'a', ':a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aaa', 'a', ':a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aaa', 'a', ':a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aaa', 'a', ':a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aaa', 'a', ':a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aaa', 'aa', ':a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aaa', 'aa', ':a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aaa', 'aa', ':a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aaa', 'aa', ':a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aaa', 'aa', ':a', ':a*'],                                           { a: 'a/a/a' }],

    ['a/a',   ':a*',        ['aaa', 'aa', 'a', ':a', ':a*'],                                           { a: 'a/a' }],
    ['aa/a',   ':a*',       ['aaa', 'aa', 'a', ':a', ':a*'],                                           { a: 'aa/a' }],
    ['a/aa',   ':a*',       ['aaa', 'aa', 'a', ':a', ':a*'],                                           { a: 'a/aa' }],
    ['aa/aa',   ':a*',      ['aaa', 'aa', 'a', ':a', ':a*'],                                           { a: 'aa/aa' }],
    ['a/a/a',   ':a*',      ['aaa', 'aa', 'a', ':a', ':a*'],                                           { a: 'a/a/a' }],

  ] as const) {

    it(`should recognize ${path} as ${match} out of ${JSON.stringify(routes)}`, function () {
      // Arrange
      const sut = new RouteRecognizer();
      for (const route of routes) {
        sut.add({ path: route, handler: null });
      }

      const params = { ...expectedParams };
      // const paramNames = Object.keys(params);
      const configurableRoute = new ConfigurableRoute(match, false, null);
      // const endpoint = new Endpoint(configurableRoute, paramNames);
      const expected = new RecognizedRoute(configurableRoute, params);

      // Act
      const actual1 = sut.recognize(path);
      const actual2 = sut.recognize(path);

      // Assert
      assert.deepStrictEqual(actual1, actual2, `consecutive calls should return the same result`);
      assert.deepStrictEqual(actual1, expected);
    });
  }

  for (const [route1, route2] of [
    ['', '?:a'],
    ['?:a', ''],
    ['a', 'a'],
    [':a', ':b'],
    [':a*', ':b*'],
  ]) {
    it(`throws on clashing patterns: [${route1},${route2}]`, function () {
      const sut = new RouteRecognizer();
      let _err: Error | null = null;

      sut.add({ path: route1, handler: null });
      try {
        sut.add({ path: route2, handler: null });
      } catch(e) {
        _err = e;
      }

      assert.throws(() => sut.add({ path: route2, handler: null }), `Cannot add ambiguous route. The pattern '${route2}' clashes with '${route1}'`);
    });
  }
});
