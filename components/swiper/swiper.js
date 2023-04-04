import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from "../../store/store"

Component({
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{ typeList: 'typeList' }
  },
  lifetimes: {
    attached() {
      this.getSwiperList()
    }
  },
  properties: {
    //默认播放的index
    currentIndex: {
      type: Number,
      value: 0
    },
    // 是否显示圆点
    showDots: {
      type: Boolean,
      value: true
    },
    swiperHeight: {
      type: Number,
      value: 400
    },
    swiperList: {
      type: Array,
      value: []
    }
  },
  data: {
    // 存放轮播图id
    imagesId: [],
    swiperList: [],
  },
  methods: {
    swiperChange(e) {
      this.triggerEvent('handleCurrent', e.detail.current)
    },
    // 生成随机id
    getRandomId() {
      const arr = []
      // 根据type的个数生成id
      for(let i = 0; i < this.data.typeList.length; i++) {
        let id =  Math.floor(Math.random() * 56 + 1)
        if(arr.indexOf(id) > 0) id++
        arr.push(id)
      }
      this.setData({
        imagesId: arr
      })
    },
    getSwiperList() {
      // 获取随机图片的id
      this.getRandomId()
      wx.request({
        url: 'http://localhost:3000/app/getAllGoods',
        method: 'GET',
        success: (res) => {
          const imagesId = this.data.imagesId;
          // 筛选出相同id的数据
          const arr = res.data.filter(item => imagesId.indexOf(item.id) >= 0);
          this.setData({
            swiperList: arr
          })
        }
      })
    },
    // 商品详情
    goToGoodsDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/packageA/pages/goodsDetail/goodsDetail?id=${id}`,
      })
    }
  }
})
