let app =  getApp();

  
Page({
  data: {
    list:[],
    t:0
  },
  
  onShow() {
    console.log(app.globalData.goodsList)
    this.setData({
      list:app.globalData.goodsList
    })
    this.getTotal();
  },
  getTotal(){
    let a = app.globalData.goodsList.reduce((prev,cur)=>{
      return prev + cur.count*cur.price
    },0)
    this.setData({
      t:a
    })
  },
  change(e){
    //执行的时候 需要 把 购物车中的对应的数据的count更新
    let ary = app.globalData.goodsList;
    let val = ary.filter(item=>item.id == e.target.dataset.xxx.id)
    val[0].count = e.detail.value/1;
    console.log(ary)
    console.log(e)
    this.getTotal();
  }
});