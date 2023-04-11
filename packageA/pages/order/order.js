import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../../store/store'

Page({
  data: {
    active: 0,
    ids: [],
    // 代发货
    waitGoodList: []
  },
  onLoad(options) {
    if(options.ids) {
      const goodIds = JSON.parse(options.ids);
      this.getGoodsList(goodIds);
      // setTimeout(() => {
      //   wx.showLoading({
      //     title: '加载中...',
      //   })
      // }, 300)
    }
    // 绑定store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['waitGoodsListIds'],
      actions: ['addWaitGoodsId']
    })
  },

  onUnload() {

  },
  // methods
  onChange(e) {
  },

  // 获取所有商品
  getGoodsList(goodIds) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://localhost:3000/app/getAllGoods',
      method: 'GET',
      success: res => {
        // 存为store
        let ids = [];
        const storeList = this.data.waitGoodsListIds.slice();
        storeList.forEach(storeId => {
          goodIds.forEach(id => {
            if(storeId != id) ids.push(id)
          })
        })
        this.addWaitGoodsId(ids)

        let waitGoodList = [];
        const goodsIds = this.data.waitGoodsListIds.slice()
        goodsIds.forEach(id => {
          res.data.forEach(item => {
            if(item.id == id) waitGoodList.push(item)
          })
        })
        this.setData({
          waitGoodList
        })
        console.log(this.data.waitGoodList)
        setTimeout(() => {
          wx.hideLoading()
        }, 3000)
      }
    })
  }
})