const Router = require('koa-router');
const mysql = require('mysql');
const router = new Router();
router.get('/getGoodsById', async (ctx) => {
  const conn = mysql.createConnection({ // 创建连接
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  })
  const sql = 'select * from books where id = ?'; // 根据type查询
  const data = await new Promise((resolve, reject) => {
    conn.query(sql, [ctx.request.query.id], (err, result) => {
      if(err) reject(err)
      resolve(result)
      conn.end() // 关闭连接
    })
  })
  ctx.body = data;
})

module.exports = router;