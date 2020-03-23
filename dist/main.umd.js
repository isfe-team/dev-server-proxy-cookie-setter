(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.main = factory());
}(this, (function () { 'use strict';

  var src = function generateProxyCokieSetter (label, filePath) {
    return function setUAPProxyCookie (proxyReq) {
    try {
      fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
        .split('\n')
        .map((x) => x.trim())
        .filter(x => !!x)
        .reduce((acc, x) => {
          const [l, ...kv] = x.split(',');
          if (l === label) {
            acc.push(kv);
          }
          return acc
        }, [])
        .forEach(([k, v]) => proxyReq.setHeader('cookie', `${k}=${v}`));
      } catch (err) {
        throw err
      }
    }
  };

  return src;

})));
//# sourceMappingURL=main.umd.js.map
