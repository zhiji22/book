import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from '../store/store';

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      goodsCardId: () => store.goodsCardId
    }
  },
  lifetimes: {
    attached() {
      let goodsCardIds = JSON.parse(wx.getStorageSync('goodsCardIds')) || '';
      console.log(goodsCardIds)
    if(goodsCardIds) this.setData({ goodsCardIds })
    }
  },
  properties: {
  },
  data: {
    active: 0,
    // 已加入购物车的商品id
    goodsCardIds: [],
    list: [
      {
        name: 'index',
        text: '首页',
        iconPath: '/static/index.png',
        iconPath2: '/static/index-2.png',
        pagePath: '/pages/index/index',
      },{
        name: 'cart',
        text: '购物车',
        iconPath: '/static/cart.png',
        iconPath2: '/static/cart-2.png',
        pagePath: '/pages/cart/cart',
        info: 0
      },{
        name: 'my',
        text: '我的',
        iconPath: '/static/my.png',
        iconPath2: '/static/my-2.png',
        pagePath: '/pages/my/my'
      }
    ]
  },
  methods: {
    onChange(e) {
      const url = this.data.list[e.detail].pagePath;
      this.setData({ active: e.detail });
      wx.switchTab({
        url
      })
    }
  }
})
