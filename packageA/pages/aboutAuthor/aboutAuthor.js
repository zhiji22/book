
Page({
  data: {
    value: 5,
    userInfo: ''
  },
  onLoad(options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || ''
    })
    console.log(this.data.userInfo)
  },
  onShow() {

  },
  onUnload() {

  },

  // methods
  goBack() {
    console.log(11)
    wx.switchTab({
      url: '/pages/my/my',
    })
  }
})