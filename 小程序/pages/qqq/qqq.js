// pages/qqq.js
// 新建页面的流程 ： 先去pages里边创建一个文件夹 在文件夹中 创造4个名字一样的文件 .wxml .js .json .wxss
// 创造完成之后  在 app.json的pages中添加对应的路径
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fn(){
    console.log(arguments)
  }
  
})
/* 
  在小程序中： 
  App()根组件  
  Page()页面级的组件  
  Component()功能项组件 需要在对应的JSON 中 有一个 配置项 "component":true

  使用功能组件的流程：
    1- 创造组件 先创造一个对应的文件夹 然后右键 新建Component  这样会一次生成4个对应的文件
    2- 想在哪里使用 就需要在哪里注册； 
            注册是在 对应的JSON的 usingComponents:{自定义组件名：‘对应的组件路径’}
    3- 注册完成之后 就可以在当前组建的模板（wxml）中使用 <自定义组件名></自定义组件名>

    4- 父传子： 跟vue 一样； <自定义组件名  自定义属性名= '值'></自定义组件名>
              子组件 通过  properties:{自定义属性名:{type:数据类型，value:默认值}}
       子传父：         <自定义组件名  bind自定义事件名= '函数名'></自定义组件名>
              子组件 通过  this.triggerEvent(自定义事件名,{参数})





*/