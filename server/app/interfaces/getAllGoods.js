const Router = require('koa-router');
const mysql = require('mysql')

const router = new Router({
  prefix: '/app'
});

router.get('/getAllGoods', async (ctx) => {
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  })
  console.log('在查询所有数据...')

  const sql = 'select * from books';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, (err, result) => {
      if(err) { reject(err) }
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})

module.exports = router;