Page({

  data: {
    value: '',
    isFocus: true,
    timer: '',
    historyKey: 'historyKey',
    searchList: [
      {
        id: 1,
        text: 11
      },
      {
        id: 2,
        text: 22
      },
      {
        id: 3,
        text: 33
      },{
        id: 4,
        text: 44
      }
    ],
    historyList: [],
    indexList: ['A', 'B', 'C']
  },
  onLoad() {

    // 获取持久化的搜索记录
    const list = JSON.parse(wx.getStorageSync(this.data.historyKey) || '[]')
    const historyList = list.filter(item => item !== '')
    this.setData({ historyList })
  },

// == methods
  onChange(e) {
    // 防抖 多次输入只执行最后一次
    clearTimeout(this.data.timer);
    let value = e.detail;
    let arr = this.data.historyList
    this.data.timer = setTimeout(() => {
      this.setData({
        value: value,
        historyList: value ? this.getNewHistory(value) : arr
      })
    }, 500);
    this.getNewHistory(value)
  },
  getNewHistory(value) {
    let set = new Set(this.data.historyList)
    set.delete(value)
    let arr = Array.from(set);
    arr.unshift(value);

    // 持久化存储
    wx.setStorageSync(this.data.historyKey, JSON.stringify(arr))
    return arr
  },
  // 清除历史记录
  removeHistory() {
    this.setData({
      historyList: []
    })
    wx.removeStorageSync(this.data.historyKey)
  },
  // goToDetail(e) {
  //   const index = e.currentTarget.dataset.index;
  //   wx.navigateTo({
  //     url: `/packageA/pages/goodsDetail/goodsDetail?id=${index}`,
  //   })
  // }
})