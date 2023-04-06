
Page({
  data: {
    value: 3,
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
})