Page({
  data: {
    addressList: ''
  },
  onLoad(options) {
    const openid = wx.getStorageSync('openid') || '';
    this.getDefaultAddress(openid)
  },

  onShow() {

  },

  onUnload() {

  },

  // 获取默认地址
  getDefaultAddress(openid) {
    wx.request({
      url: `http://localhost:3000/app/pay/getDefaultAddress?openid=${openid}`,
      method: 'GET',
      success: (res) => {
        if(res.statusCode == 200) {
          this.setData({
            addressList: res.data
          })
        }
      }
    })
  }
})