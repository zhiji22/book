// components/index/label/label.js
Component({
  properties: {

  },
  data: {
    // 书籍分类：IT类,小说,情商,健身,社会学,心灵与修养
    lableList: [
      [{
          type: 'IT',
          src: '/static/it.png',
          text: 'IT类'
        },
        {
          type: '小说',
          src: '/static/novel.png',
          text: '小说'
        },
        {
          type: '情商',
          src: '/static/iq.png',
          text: '情商'
        }
      ],
      [{
          type: '运动',
          src: '/static/gym.png',
          text: '运动'
        },
        {
          type: '社会学',
          src: '/static/society.png',
          text: '社会学'
        },
        {
          type: '心灵与修养',
          src: '/static/love.png',
          text: '心与养'
        }
      ]
    ]
  },
  methods: {
    goToGoodsList(e) {
      const type = e.currentTarget.dataset.type;
      wx.navigateTo({
        url: `/packageA/pages/goodsList/goodsList?type=${type}`,
      })
    }
  }
})
