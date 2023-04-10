const Router = require('koa-router');
const router = new Router();
const { createConnection }  = require('../util/utils')

// 根据id获取商品
router.get('/app/getGoodsById', async (ctx) => {
  const conn = createConnection()

  const sql = 'select * from books where id = ?';
  const data = await new Promise((resolve, reject) => {
    conn.query(sql, [ctx.request.query.id], (err, result) => {
      if(err) reject(err)
      resolve(result)
      
      conn.end()
    })
  })
  ctx.body = data;
})

module.exports = router;