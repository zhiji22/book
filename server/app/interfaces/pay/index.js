const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/pay'
});

// 获取默认地址信息
router.get('/getDefaultAddress', async (ctx) => {
  const user_id = ctx.request.query.openid;
  // 创建连接
  const conn = createConnection()

  const sql = 'select * from user_address where user_id = ? and `default`=1';
  const data = await new Promise((resolve, reject) => {
    conn.query(sql, [user_id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  console.log(data)
  ctx.body = data;
})


module.exports = router;