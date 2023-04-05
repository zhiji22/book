module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1680696071979, function(require, module, exports) {
/** !
 * koa-body-parser - index.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */



/**
 * Module dependencies.
 */

const parse = require('co-body');
const copy = require('copy-to');

/**
 * @param [Object] opts
 *   - {String} jsonLimit default '1mb'
 *   - {String} formLimit default '56kb'
 *   - {string} encoding default 'utf-8'
 *   - {Object} extendTypes
 */

module.exports = function(opts) {
  opts = opts || {};
  const {detectJSON} = opts;
  const {onerror} = opts;

  const enableTypes = opts.enableTypes || ['json', 'form'];
  const enableForm = checkEnable(enableTypes, 'form');
  const enableJson = checkEnable(enableTypes, 'json');
  const enableText = checkEnable(enableTypes, 'text');
  const enableXml = checkEnable(enableTypes, 'xml');

  opts.detectJSON = undefined;
  opts.onerror = undefined; // eslint-disable-line unicorn/prefer-add-event-listener

  // force co-body return raw body
  opts.returnRawBody = true;

  // default json types
  const jsonTypes = [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report',
    'application/scim+json'
  ];

  // default form types
  const formTypes = ['application/x-www-form-urlencoded'];

  // default text types
  const textTypes = ['text/plain'];

  // default xml types
  const xmlTypes = ['text/xml', 'application/xml'];

  const jsonOpts = formatOptions(opts, 'json');
  const formOpts = formatOptions(opts, 'form');
  const textOpts = formatOptions(opts, 'text');
  const xmlOpts = formatOptions(opts, 'xml');

  const extendTypes = opts.extendTypes || {};

  extendType(jsonTypes, extendTypes.json);
  extendType(formTypes, extendTypes.form);
  extendType(textTypes, extendTypes.text);
  extendType(xmlTypes, extendTypes.xml);

  // eslint-disable-next-line func-names
  return async function bodyParser(ctx, next) {
    if (ctx.request.body !== undefined || ctx.disableBodyParser)
      return await next(); // eslint-disable-line no-return-await
    try {
      const res = await parseBody(ctx);
      ctx.request.body = 'parsed' in res ? res.parsed : {};
      if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw;
    } catch (err) {
      if (onerror) {
        onerror(err, ctx);
      } else {
        throw err;
      }
    }

    await next();
  };

  async function parseBody(ctx) {
    if (
      enableJson &&
      ((detectJSON && detectJSON(ctx)) || ctx.request.is(jsonTypes))
    ) {
      return await parse.json(ctx, jsonOpts); // eslint-disable-line no-return-await
    }

    if (enableForm && ctx.request.is(formTypes)) {
      return await parse.form(ctx, formOpts); // eslint-disable-line no-return-await
    }

    if (enableText && ctx.request.is(textTypes)) {
      return (await parse.text(ctx, textOpts)) || '';
    }

    if (enableXml && ctx.request.is(xmlTypes)) {
      return (await parse.text(ctx, xmlOpts)) || '';
    }

    return {};
  }
};

function formatOptions(opts, type) {
  const res = {};
  copy(opts).to(res);
  res.limit = opts[type + 'Limit'];
  return res;
}

function extendType(original, extend) {
  if (extend) {
    if (!Array.isArray(extend)) {
      extend = [extend];
    }

    extend.forEach(function(extend) {
      original.push(extend);
    });
  }
}

function checkEnable(types, type) {
  return types.includes(type);
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1680696071979);
})()
//miniprogram-npm-outsideDeps=["co-body","copy-to"]
//# sourceMappingURL=index.js.map