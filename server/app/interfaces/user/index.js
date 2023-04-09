/*
 * @Description: 
 * @Author: wanghong
 * @Date: 2023-04-05 20:19:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-09 21:52:28
 */
const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/user'
});

// 添加用户
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

// 将商品加入足迹
router.post('/addUserTrace', async (ctx) => {
  const {user_id, goods_id} = ctx.request.body;
  const conn = createConnection()

  // 判断商品是否已加入
  const selectSql = 'select * from user_trace where goods_id = ?'
  const result = await new Promise((resolve, reject) => {
    conn.query(selectSql, [goods_id], (err, result) => {
      if(err) reject(err)
      resolve(result)
    })
  })
  if(result.length) return ctx.body = {errorMsg: '商品已存在', code: ''}

  // 商品还未加入user_trace表
  const sql = 'insert into user_trace values(?,?)'
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, [user_id, goods_id], (err, result) => {
      if(err) reject(err)
      resolve(result)
    })
  })
  // 结束
  conn.end()

  console.log(data)
})

module.exports = router;