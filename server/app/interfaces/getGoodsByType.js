const Router = require('koa-router');
const mysql = require('mysql');

const router = new Router({
  prefix: '/goodslist'
});

router.get('/:type', async (ctx) => {
  const type = ctx.request.params.type
  // 创建连接
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  })
  // 根据type查询
  const sql = 'select * from books where type = ?'
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, [type], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})

module.exports = router;