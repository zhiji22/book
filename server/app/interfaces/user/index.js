/*
 * @Description: 
 * @Author: wanghong
 * @Date: 2023-04-05 20:19:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-06 19:29:17
 */
const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/user'
});

router.post('/addUser', async (ctx) => {
  const {openid, userInfo:{ nickName: nickname, gender, avatarUrl: avatarurl }}  = ctx.request.body;
  const conn = createConnection()
  // 先判断用户是否已存在
  const selectSql = 'select * from users where openid = ?'
  const result = await new Promise((resolve, reject) => {
    conn.query(selectSql, [openid], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  if(result) return ctx.body = {errorMsg: '用户已存在！', code: ''}

  // 插入数据
  const insertSql = 'insert into users values(?, ?, ?, ?, ?)'
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(insertSql, [null, openid, nickname, gender, avatarurl], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  // 如果插入失败
  if(!data.insertId) 
    return ctx.body = {errorMsg: '插入失败！', code: ''}
  // 成功
  ctx.body = {
    message: '插入成功',
    code: 200,
    data: {
      userId: data.insertId
    }
  }
})

module.exports = router;