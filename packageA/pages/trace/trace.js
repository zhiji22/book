Page({
  data: {
    value1: '',
    // 分类的title
    title: '',
    // openid
    openid: '',
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
    // 用于渲染商品列表
    traceList: [],
    // 全部商品列表
    AllGoodsList: []
  },
  onLoad(options) {
    const openid = wx.getStorageSync('openid') || '';
    this.setData({
      openid
    })
    this.getTraceInfo()
  },

  onShow() {

  },

  onHide() {

  },
  onUnload() {

  },

  // 获取分类的索引
  changeItem(e) {
    const index = e.detail;
    // 找到到type
    const result = this.data.options1.find(item => item.value == index);
    this.setData({
      title: result.text
    })
    // 根据type获取商品
    this.getTraceListByType(result.text)
  },

  // 根据价格排序
  handleSort() {
    let traceList = this.data.traceList;
    traceList.sort((a, b) => a.price - b.price)
    this.setData({
      traceList: this.data.traceList.sort((a, b) => a.price - b.price)
    })
  },

  // 获取足迹信息
  getTraceInfo() {
    wx.request({
      url: `http://localhost:3000/app/user/getTraceInfo?openid=${this.data.openid}`,
      method: 'GET',
      success: (res) => {
        // 获取到商品id
        let ids = []
        res.data.forEach(item => ids.push(item.goods_id))
        // 根据id获取商品信息
        this.getTraceList(ids)
      }
    })
  },

  // 获取全部商品
  getTraceList(ids) {
    wx.request({
      url: 'http://localhost:3000/app/getAllGoods',
      method: 'GET',
      success: (res) => {
        let data = [];
        ids.forEach(id => {
          res.data.forEach(item => {
            if(item.id == id) data.push(item)
          })
        })
        this.setData({
          traceList: data,
          AllGoodsList: data
        })
      }
    })
  },

  // 根据type获取商品
  getTraceListByType(type) {
    let data = [];
    this.data.AllGoodsList.forEach(item => {
      if(item.type == type) {
        data.push(item)
      }
    })
    this.setData({
      traceList: data
    })
    console.log(this.data.traceList)
  }
})