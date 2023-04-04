import { areaList } from '@vant/area-data'
Page({
  data: {
    active: 2,
    //是否已经获取用户信息
    hasUserInfo: false,
    //是否可以调用获取信息得函数
    canIUseGetUserProfile: false,
    //用户基本信息(头像、昵称)
    userInfo: {
      avatarUrl: '/static/head-picture.png',
      nickName: ''
    },
  },
  onLoad(options) {
    this.setData({
      canIUseGetUserProfile: true
    })
    console.log(this.data.hasUserInfo)
  },

  onReady() {

  },
  onShow() {
    // 更新自定义tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
      })
    };
    //获取用户globalData信息
    var n = wx.getStorageSync('userInfo')
    if (n.nickName != '' && n.nickName != null) {
      this.setData({
        userInfo: n,
        hasUserInfo: true,
        canIUseGetUserProfile: true
      })
      // 通过wx.login获取登录凭证（code），然后通过code去获取我们用户的openid
      wx.login({
        success: (res) => {
          console.log(res);
        },
      })
    }
  },
  onUnload() {

  },

  // method
  // 获取用户信息
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '获取您的微信个人信息',
      success: (res) => {
        console.log(res)
        this.setData({
          hasUserInfo: true,
          userInfo: res.userInfo
        })
        // 缓存
        // wx.setStorageSync('userInfo', res.userInfo)
      }
    })
  },
})