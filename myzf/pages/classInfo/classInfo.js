let app =  getApp();
Page({
  data: {
    til:'',
    img:"",
    id:'',
    price:0,
    num:0
  },
  onLoad(options) {
    // options对应的是 跳转当前页面所传递所有的url参数
    console.log(options)
    
    let {til,img,id,price} = options;
    // 刚进这个页面的时候  要更新购物的数量
    let t = app.globalData.goodsList.reduce((prev,cur)=>{
      return prev + cur.count
    },0)
    this.setData({
      til,img,id,price,num:t
    })
  },
  add(){
    // 当前的商品 添加到购物车里边
    let {til,img,id,price} = this.data;
    // 先判断 购物车是否有对应的商品 有的话 就直接增加数量即可 
    let bol = app.globalData.goodsList.some(item=>{
      if(item.id == id){
        item.count++
        return true
      }
      // return item.id == id
    });
    if(!bol){
      app.globalData.goodsList.push({til,img,id,price,count:1})
    }
    let t = app.globalData.goodsList.reduce((prev,cur)=>{
      return prev + cur.count
    },0)
    this.setData({
      num:t
    })
    console.log(app.globalData)

  },
  buy(){
    // 编程式 导航
    wx.switchTab({
      url:'/pages/user/user'
    })
  }
});