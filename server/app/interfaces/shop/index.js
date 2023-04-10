const Router = require('koa-router');
const mysql = require('mysql');
const { getConnectionMysql } = require('../../util/utils')

const router = new Router({
  prefix: '/shop'
});

router.get('/join', async (ctx) => {
  console.log('join...')
  // 创建连接
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  })
  // 根据type查询
  const sql = 'select * from books';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})

// 初始化表
router.post('/init', async (ctx) => {
  console.log(ctx.request.body)
  // 创建连接
  const sql = 'select * from books';
  getConMysql(sql, ctx)
})
// 更新商品收藏状态
router.get('/setGoodsCollect', async (ctx) => {

})

module.exports = router;