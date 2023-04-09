import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../../store/store'
import { showLoading } from '../../../utils/util'

Page({
  data: {
    // 是否已登录
    isLogin: false,
    // 当前商品的id
    cartId: '',
    // 加入收藏的标志
    isCollect: 0,
    // 收藏图标背景色
    icon: 'like-o',
    openid: '',
    showGallary: false,
    currentIndex: 0,
    swiperList: []
  },

  onLoad(options) {
    this.data.cartId = options.id;
    this.requestGoodsList(options.id);
    // 判断是否登录
    const openid = wx.getStorageSync('openid');
    if(openid) this.setData({ isLogin: true, openid })
    // 绑定store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['goodsCardId', 'collectIds', 'isLogin'],
      actions: ['addCartNum', 'cutCartNum', 'changeLoginState']
    })
  },

  onShow() {
    // 将浏览记录加入足迹表
    wx.request({
      url: 'http://localhost:3000/app/user/addUserTrace',
      method: 'POST',
      data: {
        user_id: this.data.openid,
        goods_id: this.data.cartId
      },
      success: (res) => {
        console.log(res)
      }
    })
  },
  onUnload(){
    this.storeBindings.destroyStoreBindings()
  },

  // methods
  requestGoodsList(id) {
    wx.request({
      url: `http://localhost:3000?id=${id}`,
      method: 'GET',
      success: (res) => {
        const result = res.data.find(item => item.id == this.data.cartId)
        // 设置收藏的图标
        if(result.collect == 1) {
          this.setData({
            icon: 'like'
          })
        }
        this.setData({
          swiperList: res.data
        })
      }
    })
  },
  handleShowGallary() {
    this.setData({
      showGallary: true
    })
  },
  changeGallary(e) {
    this.setData({
      showGallary: e.detail
    })
  },
  swiperChange(e) {
  },

  // 当前页数
  handleCurrent(e) {
    this.setData({
      currentIndex: e.detail
    })
  },
  // 收藏
  handleCollect() {
    // 判断用户是否已登录
    if(!this.data.isLogin) return wx.showToast({
      title: '请先登录！',
      icon: 'none'
    })
    // 取消收藏
    if(this.data.icon === 'like') {
      this.setData({
        icon: 'like-o',
        isCollect: 0
      })
      this.addOrRemove('取消收藏成功')
      return
    }
    // 收藏
    this.setData({
      icon: 'like',
      isCollect: 1
    })
    this.addOrRemove('收藏成功')
  },
  addOrRemove(title) {
    const id = this.data.cartId;
    // isCollect == 1 -> 代表后台要进行收藏操作
    wx.request({
      url: 'http://localhost:3000/app/collect/addOrRemove',
      method: 'PUT',
      data: {
        isCollect: this.data.isCollect,
        id,
      },
      success: (res) => {
        console.log(res.data)
      }
    })
    wx.showToast({
      title,
      icon: 'success'
    })
  },

  // 加入购物
  handleAddCart(){
    // 判断用户是否已登陆
    if(!this.data.isLogin) return wx.showToast({
      title: '请先登录！',
      icon: 'none'
    })

    showLoading()
    const timer = setTimeout(() => {
      const info = this.addCartNum(this.data.cartId);
      console.log(info)
      // 书籍已加入购物车
      if(typeof info == 'string') {
        var tips = info;
      }else{
        // 更新 goodsCardId
        this.setData({
          goodsCardId: info
        })
        this.saveToStorage(info)
      }
      wx.showToast({
        title: tips ? tips : '加入购物成功！',
        icon: tips ? 'none' : 'success'
      })
      clearTimeout(timer)
    }, 800)
  },

  // 购物车数量持久化
  saveToStorage(goodsCardId){
    wx.setStorageSync('goodsCardId', JSON.stringify(goodsCardId))
  },

  // 跳转购物车页面
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  // 前往支付页面
  goToPay() {
    wx.navigateTo({
      url: `/packageA/pages/pay/pay?id=${this.data.cartId}`,
    })
  }
})