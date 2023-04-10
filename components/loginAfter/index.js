import Dialog from '@vant/weapp/dialog/dialog';
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../store/store'
Component({
  properties: {
    userInfo: Object
  },
  lifetimes: {
    attached() {
      this.getCollectGoods()
      this.getTraceGoods()
      this.storeBindings = createStoreBindings(this, {
        store,
        fields: ['goodsCardId'],
      })
    },
    detached() {
      this.storeBindings.destroyStoreBindings()
    }
  },
  data: {
    iconList: [
      {
        text: '待发货',
        icon: 'logistics'
      },
      {
        text: '待收货',
        icon: 'after-sale'
      },
      {
        text: '全部订单',
        icon: 'balance-list-o'
      }
    ],
    collectList: [],
    traceList: []
  },
  methods: {
    handleTapInfo(e) {
      const index = e.currentTarget.dataset.index;
      // 跳转到收货地址
      if(index == 0) {
        this.goToAddress()
      }
      // 关于作者
      if(index == 1) {
        this.goToAboutAuthor()
      }
      //用户点击退出登录
      if(index == 2) {
        this.handleQuitLogin()
      }
    },

    // 跳转到关于作者页面
    goToAboutAuthor() {
      const url = '/packageA/pages/aboutAuthor/aboutAuthor';
      this.handleNavigateTo(url)
    },

    // 跳转到收货地址
    goToAddress() {
      const url = '/packageA/pages/address/address'
      this.handleNavigateTo(url)
    },
    // 用户退出登录
    handleQuitLogin() {
      Dialog.confirm({
        context: this,
        title: '退出',
        message: '确认退出登录？',
        width: '230px',
      })
      .then(() => {
        // on confirm
        console.log('确认')
      })
      .catch(() => {
        // on cancel
        console.log('取消')
      });
    },

    // 转去订单页面
    goToOrder() {
      const url = '/packageA/pages/order/order';
      this.handleNavigateTo(url)
    },

    // 跳转到购物车
    // goToShopCart() {
    //   wx.switchTab({
    //     url: '/pages/cart/cart',
    //   })
    // },

    goToMyOrderPage(e) {
      const index = e.target.dataset.index;
    },

    // 跳转到收藏页面
    goToCollect(e) {
      const name = e.target.dataset.name;
      if(name == 'collect') {
        const url = '/packageA/pages/collect/collect'
        this.handleNavigateTo(url)
      }else if (name == 'trace') {
        const url = '/packageA/pages/trace/trace'
        this.handleNavigateTo(url)
      }else {
        wx.switchTab({
          url: '/pages/cart/cart',
        })
      }
    },

    // 用于跳转
    handleNavigateTo(url) {
      wx.navigateTo({
        url
      })
    },
    // 获取收藏的商品数量
    getCollectGoods() {
      wx.request({
        url: 'http://localhost:3000/app/collect/getCollectGoods',
        method: 'GET',
        success: res => {
          this.setData({
            collectList: res.data
          })
        }
      })
    },

    // 获取足迹的商品数量
    getTraceGoods() {
      const openid = wx.getStorageSync('openid')
      if(openid) {
        wx.request({
          url: `http://localhost:3000/app/user/getTraceInfo?openid=${openid}`,
          method: 'GET',
          success: res => {
            this.setData({
              traceList: res.data
            })
          }
        })
      }
    }
  },
})
