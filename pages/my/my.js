Page({
  data: {
    active: 2,
    //是否有用户信息
    hasUserInfo: false,
    //是否可以调用获取信息得函数
    canIUseGetUserProfile: false,
    //用户基本信息(头像、昵称)
    userInfo: {
      avatarUrl: '/static/head-picture.png',
      nickName: ''
    },
    openid: ''
  },
  onLoad(options) {
    console.log(getApp())
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
    // var n = wx.getStorageSync('userInfo')
    // if (n.nickName != '' && n.nickName != null) {
    //   this.setData({
    //     userInfo: n,
    //     hasUserInfo: true,
    //     canIUseGetUserProfile: true
    //   })
    //   // 通过wx.login获取登录凭证（code），然后通过code去获取我们用户的openid
    //   wx.login({
    //     success: (res) => {
    //       console.log(res);
    //     },
    //   })
    // }
  },
  onUnload() {

  },

  // method
  // 获取用户信息
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '获取您的微信个人信息',
      success: async (res) => {
        console.log(res)
        this.setData({
          hasUserInfo: true,
          userInfo: res.userInfo
        })
        // 获取用户openid
        await wx.login({
          success: (res) => {
            const code = res.code;
            const appid = 'wx59d03c28eb909b19';
            const secret = 'b149328dadc90730745470ab86a76519';
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
              method: 'GET',
              success: (res) => {
                this.setData({
                  openid: res.data.openid + 'gHp'
                })
              },
              fail: (err) => {
                wx.showToast({
                  title: `获取openid失败，请重试！error_message=${err}`,
                  icon: 'none'
                })
              }
            })
          },
        })
        // 缓存
        // wx.setStorageSync('userInfo', res.userInfo);
        // 判断是否有openid
        console.log(this.data.openid)
        if(this.data.openid) {
          console.log(111)
          // 保存到数据库
          wx.request({
            url: 'http://localhost:3000/app/user/addUser',
            method: 'POST',
            data: {
              userInfo: res.userInfo,
              openid: this.data.openid
            },
            success: (res) => {
              console.log(res.data)
            }
          })
        }
      }
    })
  },
})