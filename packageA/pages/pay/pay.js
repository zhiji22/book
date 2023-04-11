Page({
  data: {
    checked: false,
    // 合计价格
    allPay: '',
    // 商品id
    goodsIds: '',
    goodsList: [],
    totalPrice: 0,
    originPrice: 0
  },
  onLoad(options) {
    if(options.ids) {
      const goodsIds = JSON.parse(options.ids)
      this.setData({
        goodsIds
      })
    }
    const openid = wx.getStorageSync('openid') || '';
    this.getDefaultAddress(openid);
    this.getGoodsInfo(this.data.goodsIds)
  },

  onShow() {

  },

  onUnload() {

  },

  // 退换货开关
  onChange() {
    this.setData({
      checked: !this.data.checked
    })
    if(this.data.checked) {
      this.setData({
        totalPrice: parseInt((this.data.totalPrice/100 + 6) + '00')
      })
    }else {
      this.setData({
        totalPrice: this.data.originPrice
      })
    }
  },

  // 获取默认地址
  getDefaultAddress(openid) {
    wx.request({
      url: `http://localhost:3000/app/pay/getDefaultAddress?openid=${openid}`,
      method: 'GET',
      success: (res) => {
        if(res.statusCode == 200) {
          this.setData({
            addressList: res.data
          })
        }
      }
    })
  },

  // 获取商品信息
  getGoodsInfo(goodsIds) {
    wx.request({
      url: 'http://localhost:3000/app/getAllGoods',
      method: 'GET',
      success: res => {
        let totalPrice = 0;
        let goodsList = [];
        goodsIds.forEach(id => {
          res.data.forEach(item => {
            if(id == item.id) {
              totalPrice += parseInt(item.discount)
              goodsList.push(item)
            }
          })
        })
        console.log(totalPrice)
        this.setData({
          goodsList,
          totalPrice: parseInt(totalPrice + '00'),
          originPrice: parseInt(totalPrice + '00')
        })
      }
    })
  },

  // 提交订单
  onClickButton() {
    wx.showToast({
      title: '提交成功',
    })
    let goodsIds = this.data.goodsIds;
    setTimeout(() => {
      wx.navigateTo({
        url: `/packageA/pages/order/order?ids=${JSON.stringify(goodsIds)}`,
      })
    }, 900)
  }
}) 