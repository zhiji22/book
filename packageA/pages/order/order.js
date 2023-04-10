// packageA/pages/order/order.js
Page({
  data: {
    active: 0,
    ids: []
  },
  onLoad(options) {
    this.getGoodsList()
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  // methods
  onChange(e) {
  },

  // 获取所有商品
  getGoodsList() {
    wx.request({
      url: 'http://localhost:3000/app/getAllGoods',
      method: 'GET',
      success: res => {
        console.log(res.data)
      }
    })
  }
})