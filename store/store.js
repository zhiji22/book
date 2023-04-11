import { observable, action } from 'mobx-miniprogram';

export const store = observable({
  // 用户登录状态
  isLogin: false,
  // 数据的类型
  typeList: ['IT', '小说', '情商', '运动', '社会学', '心灵与修养'],
  // 购物车书籍的id
  // goodsCardId: [],
  goodsCardId: JSON.parse(wx.getStorageSync('goodsCardId')) || [],
  waitGoodsListIds: JSON.parse(wx.getStorageSync('waitGoodsListIds')) || [],

  addCartNum: action(function(id) {
    // 商品是否已经加购
    const findResult = this.goodsCardId.find(goods => goods == id);
    if(findResult) return '书籍已加入购物车！';
    this.goodsCardId.push(id)
    return this.goodsCardId.slice();
  }),
  cutCartNum: action(function(id) {
    const index = this.goodsCardId.indexOf(id);
    this.goodsCardId.splice(index, 1)
  }),
  // 改变登录状态
  changeLoginState: action(function() {
    this.isLogin = !this.isLogin;
  }),
  // 增加收藏商品id
  // addCollectId: action(function(id) {
  //   // 商品是否已经加购
  //   this.collectIds.push(id)
  // }),
  // // 移出收藏商品id
  // removeCollectId: action(function(id) {
  //   const index = this.collectIds.indexOf(id);
  //   this.collectIds.splice(index, 1)
  // })
  // 增加代发货id
  addWaitGoodsId(ids) {
    ids.forEach(id => {
      const index = this.waitGoodsListIds.indexOf(id);
      if(index >= 0 ) return;
      this.waitGoodsListIds.push(id)
    })
    wx.setStorageSync('waitGoodsListIds', JSON.stringify(this.waitGoodsListIds))
  }
})