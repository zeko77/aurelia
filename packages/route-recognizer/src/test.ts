import { RouteRecognizer as RROld } from './index-old.js';
import { RouteRecognizer as RRNew } from './index.js';

const paths = ['a', ':a'];

const rrOld = new RROld();
const rrNew = new RRNew();

for (const path of paths) {
  rrOld.add({ path, handler: null });
  rrNew.add({ path, handler: null });
}

paths.reverse();

const rrOldRev = new RROld();
const rrNewRev = new RRNew();

for (const path of paths) {
  rrOldRev.add({ path, handler: null });
  rrNewRev.add({ path, handler: null });
}

let path = 'a';

console.log('rrOld.recognize("a")',rrOld.recognize(path)?.endpoint.route.path);
console.log('rrNew.recognize("a")',rrNew.recognize(path)?.route.path);

console.log('rrOldRev.recognize("a")', rrOldRev.recognize(path)?.endpoint.route.path);
console.log('rrNewRev.recognize("a")', rrNewRev.recognize(path)?.route.path);
