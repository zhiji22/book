// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    value: ''
  },
  onLoad() {
  },
  onShow() {
    // 更新自定义tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
  },

  // methods
  goToSearch() {
    wx.navigateTo({
      url: '/packageA/pages/search/search',
    })
  }

})
