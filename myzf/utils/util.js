const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 对 wx.request 进行二次封装
const baseURL = 'http://localhost:3000';
const http = function(option){
  let {url,method='GET',data={}} = option;
  return new Promise((res,rej)=>{
    wx.request({
      url:baseURL+url,
      method:(method+'').toUpperCase(),
      data:data,
      success(data){
        res(data.data)
      },
      fail(err){
        rej(err)
      }
    })
  })
}
http.get = function (url,data) {
  return http({url,data,method:'GET'})
}
http.post = function (url,data) {
  return http({url,data,method:'POST'})
}

module.exports = {
  formatTime: formatTime,http
}
