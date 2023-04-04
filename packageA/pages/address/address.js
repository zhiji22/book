import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../../store/store'

Page({
  data: {
    selected: 0,
    addressList: []
  },
  onLoad(options) {
    // 绑定store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['loginState'],
      actions: ['changeLoginState']
    })
    this.getAllAddress()
  },
  // methods
  getAllAddress() {
    wx.request({
      url: 'http://localhost:3000/app/address/getAll',
      method: 'GET',
      success: (res) => {
        this.setData({
          addressList: res.data
        })
      }
    })
  },
  // 改变背景颜色
  changeBackGround(e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
    // 改变登录状态
    this.changeLoginState(true)
  },
  // 跳转到修改收货地址
  goToEditAddress(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packageA/pages/editAddress/editAddress?id=${id?id:''}`,
    })
  }
})