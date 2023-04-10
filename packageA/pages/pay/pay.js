Page({
  data: {
    checked: false,
    // 商品id
    goodsId: '',
    // 合计价格
    allPay: '',
    goodsList: []
  },
  onLoad(options) {
    this.setData({
      goodsId: options.id
    })
    const openid = wx.getStorageSync('openid') || '';
    this.getDefaultAddress(openid);
    this.getGoodsInfo(options.id)
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
  getGoodsInfo(id) {
    wx.request({
      url: `http://localhost:3000/app/getGoodsById?id=${id}`,
      method: 'GET',
      success: res => {
        this.setData({
          goodsList: res.data
        })
      }
    })
  },

  // 提交订单
  onClickButton() {
    wx.showToast({
      title: '提交成功',
    })
    setTimeout(() => {
      wx.navigateTo({
        url: `/packageA/pages/order/order?id=${this.data.goodsId}`,
      })
    }, 900)
  }
}) 