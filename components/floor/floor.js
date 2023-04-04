import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from "../../store/store"
Component({
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{ typeList: 'typeList' }
  },
  data: {
    imagesId: [],
    floorList: []
  },
  pageLifetimes: {
    show() {
      this.getFloorList()
    },
  },
  methods: {
    getFloorList() {
      wx.request({
        url: 'http://localhost:3000/app/getAllGoods',
        method: 'GET',
        success: (res) => {
          // 增加关键字 心灵与修养
          let data = res.data
          data.forEach(item => {
            if(item.type == '心与养') {
              item.type.replace('心与养', '心灵与修养')
            }
          })
          let bigArray = []
          let typeList = this.data.typeList;
          for(let i = 0; i < typeList.length; i++) {
            // 根据type分类成每个数组
            const sameArr = data.filter(item => item.type == typeList[i])
            // 只取第一个数组里的对象
            let obj = sameArr[0];
            // 取出相同type的4张图片
            let imgArr = []
            for(let j = 1; j < sameArr.length; j++) {
              if(j > 4) break
              imgArr.push(sameArr[j].src)
            }
            // 增加子数组用于渲染小图片
            obj.subSwiperList = imgArr;
            bigArray.push(obj)
            this.setData({
              floorList: bigArray
            })
          }
        }
      })
    },
    // 转去商品列表
    goToGoodsList(e) {
      const type = e.currentTarget.dataset.type
      wx.navigateTo({
        url: `/packageA/pages/goodsList/goodsList?type=${type}`,
      })
    }
  }
})
