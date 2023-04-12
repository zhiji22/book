module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1681302932507, function(require, module, exports) {

var isJSON = require('koa-is-json');
var Stringify = require('streaming-json-stringify');

var hasOwnProperty = Object.hasOwnProperty

/**
 * Pretty JSON response middleware.
 *
 *  - `pretty` default to pretty response [true]
 *  - `param` optional query-string param for pretty responses [none]
 *
 * @param {Object} opts
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function(opts){
  var opts = opts || {};
  var param = opts.param;
  var pretty = null == opts.pretty ? true : opts.pretty;
  var spaces = opts.spaces || 2;

  return function filter(ctx, next){
    return next().then(() => {
      var body = ctx.body;
      // unsupported body type
      var stream = body
        && typeof body.pipe === 'function'
        && body._readableState
        && body._readableState.objectMode;
      var json = isJSON(body);
      if (!json && !stream) return;

      // query
      var hasParam = param && hasOwnProperty.call(ctx.query, param);
      var prettify = pretty || hasParam;

      // always stringify object streams
      if (stream) {
        ctx.response.type = 'json';
        var stringify = Stringify();
        if (prettify) stringify.space = spaces;
        ctx.body = body.pipe(stringify);
        return;
      }

      // prettify JSON responses
      if (json && prettify) {
        return ctx.body = JSON.stringify(body, null, spaces);
      }
    });
  }
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1681302932507);
})()
//miniprogram-npm-outsideDeps=["koa-is-json","streaming-json-stringify"]
//# sourceMappingURL=index.js.map