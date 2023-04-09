import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../store/store'
import { showLoading } from '../../utils/util'

Page({
  data: {
    // 是否已经登录
    isLogin: false,
    active: 1,
    radio: false,
    goodsList: [],
    // 当前收货地址
    addressObj: ''
  },
  onLoad(options) {
    // 获取默认地址
    const openid = wx.getStorageSync('openid')
    if(openid) {
      this.setData({
        isLogin: true
      })
      this.getDefaultAddress(openid)
    }
    // 绑定store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['goodsCardId'],
    })
    showLoading()
    const timer = setTimeout(() => {
      const goodsCardId  = this.data.goodsCardId
      if(goodsCardId) {
        this.requestList(goodsCardId);
        this.initTable(goodsCardId)
        clearTimeout(timer)
      }
    }, 0)
    // 获取登录信息
    const userInfo = wx.getStorageSync('userInfo') || ''
    if(userInfo) {
      this.setData({
        userInfo
      })
    }
  },
  onUnload(){
    this.storeBindings.destroyStoreBindings()
  },
  onShow() {
    // 更新自定义tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      })
    }
  },
  // 提交订单
  onClickButton() {
    
  },
  // 请求数据
  requestList(goodsCardId) {
    wx.request({
      url: `http://localhost:3000/app/getAllGoods`,
      success: (res) => {
        let arr = [];
        for(var i = 0; i < goodsCardId.length; i++) {
          var obj = res.data.find(item => goodsCardId[i] == item.id);
          arr.push(obj)
        }
        this.setData({
          goodsList: arr
        })
      }
    })
  },

  // 跳转到地址管理
  goToAddress() {
    if(!this.data.userInfo) return
    wx.navigateTo({
      url: '/packageA/pages/address/address',
    })
  },

  // 选择收货地址
  goToMy() {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  // 初始化表 shop_cart  -- 数量，状态...
  initTable(goodsCardId) {
    // wx.request({
    //   url: 'http://localhost:3000/shop/init',
    //   method: 'POST',
    //   data: goodsCardId,
    //   success: (res) => {
    //     console.log(res.data)
    //   }
    // })
  },

  // 获取默认地址
  getDefaultAddress(openid) {
    wx.request({
      url: `http://localhost:3000/app/pay/getDefaultAddress?openid=${openid}`,
      method: 'GET',
      success: (res) => {
        this.setData({
          addressObj: res.data[0]
        })
        console.log(this.data.addressObj)
      }
    })
  }
})