//index.js
// 页面中的文件的名字 要保持一致
//获取应用实例
const app = getApp();// 用来获取 根实例的

Page({
  data: {
    motto: 'Hello 珠峰',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShow:false
  },
  show(){
    this.setData({
      isShow:true
    })
  },
  hide(){
    this.setData({
      isShow:false
    })
  },
  //事件处理函数
  qqq: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  fn(){
    wx.navigateTo({
      url: '../qqq/qqq'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({ 
        // 类似于 react的setState;修改数据 并且触发视图更新
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback123 = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo123: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
