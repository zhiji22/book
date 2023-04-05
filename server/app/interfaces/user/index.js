const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/user'
});

router.post('/addUser', async (ctx) => {
  console.log(ctx.request.body.openid)
  const {nickName: nickname, gender, avatarUrl}  = ctx.request.body;
  // const conn = createConnection()
  
  // const sql = 'insert into users values(?, ?, ?, ?)'
  // const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
  //   conn.query(sql, [null, nickname, gender, avatarUrl], (err, result) => {
  //     if(err) reject(err)
  //     resolve(result)

  //     // 结束
  //     conn.end()
  //   })
  // })
  // // 如果插入失败
  // if(!data.insertId) 
  //   return ctx.body = {message: '插入失败！', code: ''}
  // // 成功
  // ctx.body = {
  //   message: '插入成功',
  //   code: 200,
  //   data: {
  //     userId: data.insertId
  //   }
  // }
})

module.exports = router;