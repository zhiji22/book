const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/address'
});

// 获取所有地址信息
router.get('/getAll', async (ctx) => {
  console.log('getAddress...')
  // 创建连接
  const conn = createConnection()

  const sql = 'select * from user_address';
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

// 添加收货地址
router.post('/insert', async (ctx) => {
  // // 创建连接
  // const conn = createConnection()

  // // 更新数据语句
  // const sql = 'insert into book values(?,?,?,?,?)';
  // // 重置收货地址语句
  // const sql2 = 'insert into book';

  // const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
  //   conn.query(sql, (err, result) => {
  //     if(err) reject(err)
  //     resolve(result)

  //     // 结束
  //     conn.end()
  //   })
  // })
  // ctx.body = data;
})


module.exports = router;