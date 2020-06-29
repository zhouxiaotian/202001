//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // wx 是小程序中的一个全局变量
    
    // var logs = locaStorage.getItem('logs) || [];
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // debugger
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // openId 是微信用户的一个唯一凭证
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback123) {
                this.userInfoReadyCallback123(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // 相当于 在跟组件 创造一个公用对象  对象的名字随意起
    // 这里一般会放置一些共用属性；
    userInfo: null
  }
})