import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../../store/store'

Page({
  data: {
    active: 0,
    ids: [],
    // 存放等待发货的id
    goodIds: [],
    // 代发货
    goodList: []
  },
  onLoad(options) {
    let ids = wx.getStorageSync('goodIds') || '';
    this.setData({
      goodIds: ids
    })
    if(options.ids) {
      const goodIds = JSON.parse(options.ids);
      this.setData({
        goodIds: [...new Set(this.data.goodIds.concat(goodIds))]
      })
      wx.setStorageSync('goodIds', this.data.goodIds)
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
        // const storeList = this.data.waitGoodsListIds.slice();
        let arr = []
        res.data.forEach(item => {
          this.data.goodIds.forEach(id => {
            if(item.id == id) arr.push(item)
          })
        })
        this.setData({
          goodList: arr
        })
        // this.addWaitGoodsId(ids)

        // let waitGoodList = [];
        // const goodsIds = this.data.waitGoodsListIds.slice()
        // goodsIds.forEach(id => {
        //   res.data.forEach(item => {
        //     if(item.id == id) waitGoodList.push(item)
        //   })
        // })
        // this.setData({
        //   waitGoodList
        // })
        setTimeout(() => {
          wx.hideLoading()
        }, 3000)
      }
    })
  }
})