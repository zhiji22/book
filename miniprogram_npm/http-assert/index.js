module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1680777218858, function(require, module, exports) {
var createError = require('http-errors')
var eql = require('deep-equal')

module.exports = assert

function assert (value, status, msg, opts) {
  if (value) return
  throw createError(status, msg, opts)
}

assert.fail = function (status, msg, opts) {
  assert(false, status, msg, opts)
}

assert.equal = function (a, b, status, msg, opts) {
  assert(a == b, status, msg, opts) // eslint-disable-line eqeqeq
}

assert.notEqual = function (a, b, status, msg, opts) {
  assert(a != b, status, msg, opts) // eslint-disable-line eqeqeq
}

assert.ok = function (value, status, msg, opts) {
  assert(value, status, msg, opts)
}

assert.strictEqual = function (a, b, status, msg, opts) {
  assert(a === b, status, msg, opts)
}

assert.notStrictEqual = function (a, b, status, msg, opts) {
  assert(a !== b, status, msg, opts)
}

assert.deepEqual = function (a, b, status, msg, opts) {
  assert(eql(a, b), status, msg, opts)
}

assert.notDeepEqual = function (a, b, status, msg, opts) {
  assert(!eql(a, b), status, msg, opts)
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1680777218858);
})()
//miniprogram-npm-outsideDeps=["http-errors","deep-equal"]
//# sourceMappingURL=index.js.map