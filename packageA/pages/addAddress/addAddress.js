import Toast from '@vant/weapp/toast/toast';
import { areaList } from '@vant/area-data'
Page({
  data: {
    value: '',
    // 控制是否是默认地址
    checked: false,
    // 显示删除按钮
    showDelButton: false,
    // 展示区域选择
    showPopup: false,
    // 表单数据
    userName: '',
    userNumber: '',
    userArea: '',
    userDetailAddr: '',

    // 当前收货地址id
    currentAddressId: '',
    // 区域信息
    areaList,
  },
  onLoad(options) {
  },
  onReady() {

  },
  onShow() {

  },
  onUnload() {

  },
  // methods
  // 保存
  handleSubmit() {
    // 验证是否所有数据已填
    const flag = this.data.userName && this.data.userNumber && this.data.userArea;
    if(!flag) return Toast.fail('还有必要的数据没有填哦！')
    // 判断手机号码是否输入的是数字
    let results = parseInt(this.data.userNumber)
    if(results.toString().length < this.data.userNumber.length) {
      return Toast.fail('手机号码一定为数字哦')
    }else if(results.toString().length != 11) return Toast.fail('手机号码为11位')
    // wx.showLoading({
    //   title: '保存中...',
    // })
    let data = {
      userName: this.data.userName,
      userNumber: this.data.userNumber,
      userArea: this.data.userArea,
      userDetailAddr: this.data.userDetailAddr,
      checked: this.data.checked ? 1 : 0,
    }
    wx.request({
      url: 'http://localhost:3000/app/address/addAddress',
      method: 'POST',
      data,
      success: res => {
        console.log(res.data)
      }
    })
  },

  // 删除
  handleDelete() {
    console.log('delete...')
    this.showLoading()
  },

  // 显示加载提示
  showLoading() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      // 展示时间
      duration: 800
    });
  },

  // 显示区域选择
  showPopup(e) {
    this.setData({ showPopup: true })
  },

  // 关闭区域选择框
  onClose() {
    this.setData({ showPopup: false });
  },

  // 设置默认地址事件
  handleCheckbox(e) {
    this.setData({
      checked: !this.data.checked
    })
  },

  // 确定选择区域信息
  handleConfirm(e) {
    let arr = ''
    e.detail.values.forEach((item, index) => {
      if(index ==2) return arr += item.name
      arr += item.name + ' '
    })
    this.setData({ 
      showPopup: false,
      userArea: arr
    })
  },

  // 用户取消选择区域
  handleCancel() {
    this.setData({
      showPopup: false
    })
  },
}) 