const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/collect'
});
// 加入收藏 或 移出收藏
router.put('/addOrRemove', async (ctx) => {
  console.log('addCollectGoods...')
  const body = ctx.request.body
  // 创建连接
  const conn = createConnection()

  const sql = 'update books set collect = ? where id = ?';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, [body.isCollect, body.id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  console.log(data.affectedRows)
  ctx.body = data.affectedRows == 0 ? '更新失败' : '更新成功';
})
// 查询已收藏的商品
router.get('/getCollectGoods', async (ctx) => {
  const conn = createConnection()

  const sql = 'select * from books where collect = 1';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data ? data : '查询失败！'
})
// 根据类型查询商品
router.get('/getGoodsByType', async (ctx) => {
  const conn = createConnection()
  const type  = ctx.request.query.type
  const collect  = ctx.request.query.collect

  const sql = 'select * from books where type = ? and collect = 1';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, [type], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  console.log(data)
  ctx.body = data ? data : '查询失败！'
})

module.exports = router;