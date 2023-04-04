const mysql = require('mysql');

// 数据库连接
const createConnection = () => {
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  })
  return conn;
}
// 无参数据库连接
const getConMysql = async (sql, ctx) => { // arr为sql语句中参数
  const conn = createConnection();
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, (err, result) => {
      if(err) { reject(err) }
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
}
// 有参数据库连接
const getConMysqlArr = async (sql, ctx, arr) => { // arr为sql语句中参数
  const conn = createConnection();
  const data = await new Promise((resolve, reject) => { // koa下query需要promise封装
    conn.query(sql, arr, (err, result) => {
      if(err) { reject(err) }
      resolve(result)

      // 结束
      conn.end()
    })
  })
  ctx.body = data;
}

module.exports = {
  createConnection,
  getConMysql,
  getConMysqlArr
}