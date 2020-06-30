//index.js
//获取应用实例
import {http} from '../../utils/util.js'
const app = getApp()
const bannerList = []
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    bannerList:[],
    classList:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
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
  getClass(){
    http.get('/publicList').then(data=>{
      console.log(data)
      this.setData({
        classList:data.data
      })
    })
  },
  getBanner(){
    http.get('/banner').then(data=>{
      console.log(data)
      // 请求成功之后 把后台给的数据 渲染到页面上
      this.setData({
        bannerList:data.data
      })
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getBanner();
    this.getClass();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
