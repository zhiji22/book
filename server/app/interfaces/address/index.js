const Router = require('koa-router');
const { createConnection } = require('../../util/utils')

const router = new Router({
  prefix: '/app/address'
});

const user_id = 'oevEQ46yHJMebNpbJNIl9XyAuFmYgHp';
// 获取所有地址信息
router.get('/getAll', async (ctx) => {
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

// 修改收货地址
router.post('/update', async (ctx) => {
  const reqData = ctx.request.body;

  const conn = createConnection()
  if(reqData.checked) {
    // 获取默认地址id
    const defaultSql  = 'select id from user_address where `default` = 1 and user_id = ?'
    const defaultData = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(defaultSql, [user_id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      })
    })

    // 更新默认收货地址
    const updateDefaultSql = 'update user_address set `default` = 0 where id = ? and user_id = ?'
    const updateDefaultData = await new Promise((resolve, reject) => { // koa下query需要promise封装
      conn.query(updateDefaultSql, [defaultData[0].id, user_id], (err, result) => {
        if(err) reject(err)
        resolve(result)
  
      })
    })
  }

  // 更新数据语句
  const sql = 'update user_address set user_name=?,user_number=?,user_area=?,user_detail_addr=?,`default`=? where id=? and user_id=?';
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, [reqData.userName,reqData.userNumber,reqData.userArea,reqData.userDetailAddr,reqData.checked,reqData.id,user_id], (err, result) => {
      if(err) reject(err)
      resolve(result)

    })
  })
  // // 结束
  conn.end()
  // console.log(data)
  ctx.body = data;
})

// 根据id获取收货地址
router.get('/getAddressById', async (ctx) => {
  const id = ctx.request.query.id
  const conn = createConnection();

  const sql = 'select * from user_address where id = ? and user_id = ?';
  const data = await new Promise((resolve, reject) => { 
    conn.query(sql, [id, user_id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})

// 新增收货地址
router.post('/insert', async (ctx) => {
  console.log(ctx.request.body)
  const reqData = ctx.request.body;
  const conn = createConnection();

  // 要先调用是否设置了默认地址
  if(reqData.checked) {
    // 获取默认地址id
    const defaultSql  = 'select id from user_address where `default` = 1 and user_id = ?'
    const defaultData = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(defaultSql, [user_id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      })
    })

    // 更新默认收货地址
    const updateDefaultSql = 'update user_address set `default` = 0 where id = ? and user_id = ?'
    const updateDefaultData = await new Promise((resolve, reject) => { // koa下query需要promise封装
      conn.query(updateDefaultSql, [defaultData[0].id, user_id], (err, result) => {
        if(err) reject(err)
        resolve(result)
  
      })
    })
  }

  // 插入一条收货地址
  const sql = 'insert into user_address values(?,?,?,?,?,?,?)'
  const data = await new Promise((resolve, reject) => { 
    conn.query(sql, [null, user_id,reqData.userName,reqData.userNumber,reqData.userArea,reqData.userDetailAddr,reqData.checked], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})

// 删除收货地址
router.delete('/delete', async (ctx) => {
  const id = ctx.request.query.id

  const conn = createConnection();

  const sql = 'delete from user_address where id = ? and user_id = ?'
  const data = await new Promise((resolve, reject) => { 
    conn.query(sql, [id, user_id], (err, result) => {
      if(err) reject(err)
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
})


module.exports = router;