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
    addressObj: '',
    openid: '',
    // 已加入购物车的商品id
    goodsCardIds: []
  },
  onLoad(options) {
    let goodsCardIds = JSON.parse(wx.getStorageSync('goodsCardIds')) || '';
    if(goodsCardIds) this.setData({ goodsCardIds })
    // 获取默认地址
    const openid = wx.getStorageSync('openid');
    this.setData({
      openid
    })
    this.getDefaultAddress(openid)
    // 绑定store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['goodsCardId'],
    })
    showLoading()
    const timer = setTimeout(() => {
      const goodsCardIds  = this.data.goodsCardIds
      if(goodsCardIds) {
        this.requestList(goodsCardIds);
        // this.initTable(goodsCardId)
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
    this.getDefaultAddress(this.data.openid)
  },
  // 提交订单
  onClickButton() {
    const goodsCardIds = JSON.stringify(this.data.goodsCardIds)
    
    wx.navigateTo({
      url: `/packageA/pages/pay/pay?ids=${goodsCardIds}`,
    })
  },
  // 请求数据
  requestList(goodsCardIds) {
    wx.request({
      url: `http://localhost:3000/app/getAllGoods`,
      success: (res) => {
        let arr = [];
        let totalPrice = 0;
        for(var i = 0; i < goodsCardIds.length; i++) {
          var obj = res.data.find(item => goodsCardIds[i] == item.id);
          arr.push(obj);
          // 计算价格
          totalPrice += parseInt(obj.discount);
        }
        this.setData({
          goodsList: arr,
          totalPrice: parseInt(totalPrice + '00')
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
      }
    })
  },

  // 从购物车移出商品
  handleDelete(e) {
    const id = e.currentTarget.dataset.id.toString();
    let arr = []
    for(let i = 0; i < this.data.goodsCardIds.length; i++) {
      if(this.data.goodsCardIds[i] == id) continue;
      arr.push(this.data.goodsCardIds[i])
    }
    this.setData({
      goodsCardIds: arr
    })
    // 持久化
    wx.setStorageSync('goodsCardIds', this.data.goodsCardIds);
    this.requestList(this.data.goodsCardIds)
    // 刷新页面
    this.onLoad()
  }
})