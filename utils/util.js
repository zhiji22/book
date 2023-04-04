const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 显示加载中
const showLoading = (time) => {
  wx.showLoading({
    title: '数据加载中...'
  })
  const timer = setTimeout(() => {
    wx.hideLoading()
    clearTimeout(timer)
  }, time ? time : 800)
}
// 提示信息
const showToast = (title, icon) => {
  const timer = setTimeout(() => {
    wx.showToast({
      title: title,
      icon: icon ? icon : 'success'
    })
    clearTimeout(timer)
  }, 800)
}
// 请求所有数据
// const  request = async (url, method, data) => {
//   const baseUrl = 'http://localhost:3000/app';
//   const info = await wx.request({
//     url: baseUrl + url,
//     method,
//     data,
//     success: (res) => {
//       console.log(res.data)
//     },
//   })
//   return info
// }

module.exports = {
  formatTime,
  showLoading,
  showToast
}
