const Router = require('koa-router');
const mysql = require('mysql');

const router = new Router();

router.get('/', async (ctx) => {
  // 创建连接
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  })
  // 根据type查询
  const sql = 'select * from books b, book_image bm where b.id = ? and bm.book_id = b.id';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, [ctx.request.query.id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})

module.exports = router;