Component({
  properties: {
    // 商品发货状态
    stateText: String,
    // // 按钮文字
    // btnText1: String,
    // btnText2: String,
    // 是否显示商品数量
    showNum: {
      type: Boolean,
      value: true
    },
    // 要渲染的商品列表
    list: Array
  },
  data: {

  },
  methods: {
    goToDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/packageA/pages/goodsDetail/goodsDetail?id=${id}`,
      })
    }
  }
})
