module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1681302932629, function(require, module, exports) {

/*

  db.collection.find().stream().pipe(Stringify()).pipe(res)

*/

var Transform = require('readable-stream/transform')
var stringify = require('json-stringify-safe')
var util = require('util')

util.inherits(Stringify, Transform)

module.exports = Stringify

function Stringify(options) {
  if (!(this instanceof Stringify))
    return new Stringify(options || {})
  if (options && options.replacer) {
    this.replacer = options.replacer;
  }
  if (options && options.space !== undefined) {
    this.space = options.space;
  }
  Transform.call(this, options || {})
  this._writableState.objectMode = true

  // Array Deliminator and Stringifier defaults
  var opener = options && options.opener ? options.opener : '[\n'
  var seperator = options && options.seperator ? options.seperator : '\n,\n'
  var closer = options && options.closer ? options.closer : '\n]\n'
  var stringifier = options && options.stringifier ? options.stringifier : stringify

  // Array Deliminators and Stringifier
  this.opener = new Buffer(opener, 'utf8')
  this.seperator = new Buffer(seperator, 'utf8')
  this.closer = new Buffer(closer, 'utf8')
  this.stringifier = stringifier
}

// Flags
Stringify.prototype.started = false

// JSON.stringify options
Stringify.prototype.replacer = null
Stringify.prototype.space = 0

Stringify.prototype._transform = function (doc, enc, cb) {
  if (this.started) {
    this.push(this.seperator)
  } else {
    this.push(this.opener)
    this.started = true
  }

  doc = this.stringifier(doc, this.replacer, this.space)

  this.push(new Buffer(doc, 'utf8'))
  cb()
}

Stringify.prototype._flush = function (cb) {
  if (!this.started) this.push(this.opener)
  this.push(this.closer)
  this.push(null)
  cb()
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1681302932629);
})()
//miniprogram-npm-outsideDeps=["readable-stream/transform","json-stringify-safe","util"]
//# sourceMappingURL=index.js.map