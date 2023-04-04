Page({
  data: {
    value1: '',
    options1: [
      // 书籍分类：IT,小说,情商,运动,社会学,心灵与修养
      {
        text: 'IT',
        value: 1,
        icon: 'none',
      },{
        text: '小说',
        value: 2,
        icon: 'none',
      },{
        text: '情商',
        value: 3,
        icon: 'none',
      },{
        text: '运动',
        value: 4,
        icon: 'none',
      },{
        text: '社会学',
        value: 5,
        icon: 'none',
      },{
        text: '心灵与修养',
        value: 6,
        icon: 'none',
      }
    ],
    options2: [{
      text: '价格',
      value: 1,
      icon: 'none'
    }],
    // 收藏列表
    collectList: []
  },
  onLoad(options) {
    this.getCollectGoods()
  },
  onUnload() {
  },

  // 查询已收藏的商品
  getCollectGoods() {
    wx.request({
      url: 'http://localhost:3000/app/collect/getCollectGoods',
      method: 'GET',
      success:(res) => {
        this.setData({
          collectList: res.data
        })
      }
    })
  },
  // 获取分类的索引
  changeItem(e) {
    const index = e.detail;
    // 找到到type
    const result = this.data.options1.find(item => item.value == index);
    wx.request({
      url: 'http://localhost:3000/app/collect/getGoodsByType',
      method: 'GET',
      data: {type: result.text},
      success: (res) => {
        this.setData({
          collectList: res.data
        })
      }
    })
  },
  // 根据价格排序
  handleSort() {
    let collectList = this.data.collectList;
    collectList.sort((a, b) => a.price - b.price)
    this.setData({
      collectList: this.data.collectList.sort((a, b) => a.price - b.price)
    })
  }
})