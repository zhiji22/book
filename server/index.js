const Koa2 = require('koa')
const app = new Koa2();

const json = require('koa-json')
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const appRouter = require('./app/interfaces/router')

const getGoodsByType = require('./app/interfaces/getGoodsByType')
const floorList = require('./app/interfaces/index/floorlist')
const getAllGoods = require('./app/interfaces/getAllGoods')
const getGoodsById = require('./app/interfaces/getGoodsById')
const getGoodsImagesById = require('./app/interfaces/getGoodsImagesById')
// shop
const shop = require('./app/interfaces/shop')
// address
const address = require('./app/interfaces/address')

// web
const book = require('./web/interface/books/index');

app.use(bodyParser({
  extendTypes: ['json', 'form', 'text'],
  multipart: true
}))
app.use(json())
app.use(cors())

// 注册app(小程序)端路由
for(const i in appRouter) {
  app.use(appRouter[i].routes()).use(appRouter[i].allowedMethods())
}

app.use(getGoodsByType.routes()).use(getGoodsByType.allowedMethods())
app.use(floorList.routes()).use(floorList.allowedMethods())
app.use(getAllGoods.routes()).use(getAllGoods.allowedMethods())
app.use(getGoodsById.routes()).use(getGoodsById.allowedMethods())
app.use(getGoodsImagesById.routes()).use(getGoodsImagesById.allowedMethods())
// shop
app.use(shop.routes()).use(shop.allowedMethods())
// address
app.use(address.routes()).use(address.allowedMethods())
// web
app.use(book.routes()).use(book.allowedMethods())

app.listen(3000)
