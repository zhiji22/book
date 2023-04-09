const collect = require('./collect')
const address = require('./address')
const index = require('./index/floorlist')
const shop = require('./shop')
const user = require('./user')
const pay = require('./pay')


module.exports = {
  address,
  collect,
  index,
  shop,
  user,
  pay
}