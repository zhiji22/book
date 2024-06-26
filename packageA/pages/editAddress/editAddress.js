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
    if(options.id) this.setData({
      showDelButton: true,
      currentAddressId: options.id
    })
    // 获取地址信息
    this.getAddressById(options.id)
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
      id: this.data.currentAddressId
    }
    wx.request({
      url: 'http://localhost:3000/app/address/update',
      method: 'POST',
      data,
      success: res => {
        if(res.data.affectedRows) {
          wx.showLoading({
            title: '提交中...',
          })
          const timer1 = setTimeout(() => {
            wx.showToast({
              title: '修改成功！',
            })
            clearTimeout(timer1)
          }, 1400)
          const timer2 = setTimeout(() => {
            wx.navigateTo({
              url: '/packageA/pages/address/address',
            })
            clearTimeout(timer2)
          }, 2500)
        }
      }
    })
  },

  // 删除
  handleDelete() {
    if(this.data.checked) return wx.showToast({
      title: '默认地址不能删除！',
      icon: 'error'
    })
    const id = this.data.currentAddressId;
    wx.request({
      url: `http://localhost:3000/app/address/delete?id=${id}`,
      method: 'DELETE',
      success: res => {
        if(res.data.affectedRows) {
          wx.showLoading({
            title: '提交中...',
          })
          const timer1 = setTimeout(() => {
            wx.showToast({
              title: '删除成功！',
            })
            clearTimeout(timer1)
          }, 1400)
          const timer2 = setTimeout(() => {
            wx.navigateTo({
              url: '/packageA/pages/address/address',
            })
            clearTimeout(timer2)
          }, 2500)
        }
      }
    })
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

  // 收货人输入框发生变化
  handleUserName(e) {
    console.log(e.detail)
  },

  // 手机号码
  handleUserNumber(e) {
    console.log(e.detail)
  },

  // 所在地区
  handleUserArea(e) {
    console.log(e.detail)
  },

  // 所在地区
  handleUserDetailAddr(e) {
    console.log(e.detail)
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

  // 根据id获取地址信息
  getAddressById(id) {
    wx.request({
      url: `http://localhost:3000/app/address/getAddressById?id=${id}`,
      method: 'GET',
      success: res => {
        const data = res.data[0];
        this.setData({
          userName: data.user_name,
          userNumber: data.user_number,
          userArea: data.user_area,
          userDetailAddr: data.user_detail_addr,
          checked: data.default ? true : false
        })
      }
    })
  }
}) 