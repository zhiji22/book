Component({
  properties: {
    showGallary: Boolean,
    currentIndex: Number,
    swiperList: {
      type: Array,
      default: []
    }
  },
  data: {
  },
  methods: {
    handleCloseGallary() {
      this.triggerEvent('changeGallary', false)
    },
    // 控制播放index
    handleCurrent(e) {
      console.log(e)
    }
  }
})
