import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../../store/store'
import { showLoading } from '../../../utils/util'

Page({
  data: {
    // 当前商品的id
    cartId: '',
    // 加入收藏的标志
    isCollect: 0,
    // 收藏图标背景色
    icon: 'like-o',
    showGallary: false,
    currentIndex: 0,
    swiperList: [
      {
        src: 'https://ts1.cn.mm.bing.net/th/id/R-C.30d4281c08fed5a14036733fdec4c633?rik=%2fpHx8LFazpmCCw&riu=http%3a%2f%2fup.deskcity.org%2fpic_source%2f30%2fd4%2f28%2f30d4281c08fed5a14036733fdec4c633.jpg&ehk=g5GUHM4zqQlYbuvY3%2bakna9bCgy8VNjv6bVRH04xfS8%3d&risl=&pid=ImgRaw&r=0',
      },{
        src: 'https://ts1.cn.mm.bing.net/th/id/R-C.d9306d32ee301991bca5fed6015f5603?rik=L0%2bS93KIml%2fuNw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fphotoblog%2f8%2f4%2f8%2f1%2f8481085%2f20094%2f30%2f1241102580205.jpg&ehk=67yuQwNbakayElF8fKfqBq%2fD1EwYhNXY0NQnbzWyjJg%3d&risl=&pid=ImgRaw&r=0',
      },{
        src: 'https://i2.3conline.com/images/piclib/201004/09/batch/1/57506/1270769483878e9dfcb6wmx.jpg',
      },{
        src: 'https://img.zcool.cn/community/015aed5a1ea48ba80121713279dd6b.jpg@1280w_1l_2o_100sh.jpg',
      },{
        src: 'https://ts1.cn.mm.bing.net/th/id/R-C.6f70485401a290e4ed199676e68fe78d?rik=PV25b4V98uG%2bgA&riu=http%3a%2f%2fpic.bizhi360.com%2fbbpic%2f43%2f5943.jpg&ehk=bgG43HKTMBwdYZrtOGhPrucErMeicIDB08OCXTLrwYA%3d&risl=&pid=ImgRaw&r=0',
      },{
        src: 'https://ts1.cn.mm.bing.net/th/id/R-C.c2a19b9488674570df065034976b0fcc?rik=WMfuLie3GSThow&riu=http%3a%2f%2fgb.cri.cn%2fmmsource%2fimages%2f2005%2f11%2f11%2feo051111969.jpg&ehk=qkM931fvT9j3wfcX3e8r6ZevJ7rKM1qBsiD4bGknboE%3d&risl=&pid=ImgRaw&r=0',
      }
    ]
  },

  onLoad(options) {
    this.data.cartId = options.id;
    this.requestGoodsList(options.id);
    // 绑定store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['goodsCardId', 'collectIds'],
      actions: ['addCartNum', 'cutCartNum']
    })
  },
  onUnload(){
    this.storeBindings.destroyStoreBindings()
  },

  // methods
  requestGoodsList(id) {
    wx.request({
      url: `http://localhost:3000?id=${id}`,
      method: 'GET',
      success: (res) => {
        const result = res.data.find(item => item.id == this.data.cartId)
        // 设置收藏的图标
        if(result.collect == 1) {
          this.setData({
            icon: 'like'
          })
        }
        this.setData({
          swiperList: res.data
        })
      }
    })
  },
  handleShowGallary() {
    this.setData({
      showGallary: true
    })
  },
  changeGallary(e) {
    this.setData({
      showGallary: e.detail
    })
  },
  swiperChange(e) {
  },
  // 当前页数
  handleCurrent(e) {
    this.setData({
      currentIndex: e.detail
    })
  },
  // 收藏
  handleCollect() {
    // 取消收藏
    if(this.data.icon === 'like') {
      this.setData({
        icon: 'like-o',
        isCollect: 0
      })
      this.addOrRemove('取消收藏成功')
      return
    }
    // 收藏
    this.setData({
      icon: 'like',
      isCollect: 1
    })
    this.addOrRemove('收藏成功')
  },
  addOrRemove(title) {
    const id = this.data.cartId;
    // isCollect == 1 -> 代表后台要进行收藏操作
    wx.request({
      url: 'http://localhost:3000/app/collect/addOrRemove',
      method: 'PUT',
      data: {
        isCollect: this.data.isCollect,
        id,
      },
      success: (res) => {
        console.log(res.data)
      }
    })
    wx.showToast({
      title,
      icon: 'success'
    })
  },
  // 加入购物
  handleAddCart(){
    showLoading()
    const timer = setTimeout(() => {
      const info = this.addCartNum(this.data.cartId);
      console.log(info)
      // 书籍已加入购物车
      if(typeof info == 'string') {
        var tips = info;
      }else{
        // 更新 goodsCardId
        this.setData({
          goodsCardId: info
        })
        this.saveToStorage(info)
      }
      wx.showToast({
        title: tips ? tips : '加入购物成功！',
        icon: tips ? 'none' : 'success'
      })
      clearTimeout(timer)
    }, 800)
  },
  // 购物车数量持久化
  saveToStorage(goodsCardId){
    wx.setStorageSync('goodsCardId', JSON.stringify(goodsCardId))
  },
  // 跳转购物车页面
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})