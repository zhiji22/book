const utils = require('../../../utils/util')
Page({
  data: {
    isLoading: false, //节流
    pageNum: 1,
    pageSize: 7,
    total: 0,
    requestType: '',
    goodsList: []
  },
  onLoad(options) {
    this.setData({ requestType: options.type})
    this.getGoodsList()
  },
  onReady() {

  },
  onShow() {

  },

  onPullDownRefresh() {
    this.setData({
      pageNum: 1,
      total: 0,
      isLoading: false,
      goodsList: []
    })

    // 重新发起请求
    utils.showLoading()
    this.getGoodsList(() => wx.stopPullDownRefresh())
  },

  onReachBottom() {
    utils.showLoading()
    // 数据已全部加载
    if(this.data.pageNum*this.data.pageSize > this.data.total) {
      console.log(111)
      return wx.showToast({
        title: '无更多的数据！',
        icon: 'none'
      })
    } 
    // 数据加载中，避免重复请求数据
    if(this.data.isLoading) return
    // 请求数据
    // this.getGoodsList()
    this.setData({
      pageNum: this.data.pageNum+1
    })
  },

  // methods
  getGoodsList(stopPullDown) {
    this.setData({
      isLoading: true
    })
    wx.request({
      url: `http://localhost:3000/goodslist/${this.data.requestType}`,
      method: 'GET',
      success:(res) => {
        this.setData({
          goodsList: res.data,
          total: res.data.length
        })
      }
    })
    this.setData({
      isLoading: false
    })
    stopPullDown && stopPullDown()
  },
  goToDetail(e) {
    const goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId)
    wx.navigateTo({
      url: `/packageA/pages/goodsDetail/goodsDetail?id=${goodsId}`,
    })
  }
})