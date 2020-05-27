Vue.filter('money',function(val){
  return "￥"+(val/100).toFixed(2)
})
let vm = new Vue({
  el:'#app',
  data:{
    name:"珠峰",
    dataList:[],
    isShow:false,
    delIndex:null
  },
  // 获取数据 我们把获取数据的操作封装成函数
  created() {
    // 当vue创建好模板之后 会执行这个函数；
    // 大白话 就是一打开页面 就会执行这个函数； vue自动执行的
    this.getData();
  },
  
  methods: {
    getData(){
      // 用来获取数据
      // fetch 浏览器新增API 专门用来请求接口的
      fetch('./data.json').then(qqq=>qqq.json()).then(data=>{
        console.log(data)
        this.dataList = data;
      })
    },
    del(n){
      // n 就是要删除哪一项的索引
      this.isShow = true;
      this.delIndex = n;
    },
    cancel(){
      this.isShow = false;
    },
    sure(){
      // 真正要删除了
      this.dataList.splice(this.delIndex,1);
      this.delIndex = null;
      // 删除之后 让弹框消失
      this.isShow = false;
    },
    clear(){
      this.dataList = [];
    }
  },
  // 总价 是依赖于 每一条数据的 每一条数据的isSelect是true的那些，进行数量*单价 的累加
  computed: {
    total(){
      // 怎么从 this.dataList 中筛选出 isSelect是true的项
      // this.dataList.filter(item=>item.isSelect) 
      let ary = this.dataList.filter(item=>item.isSelect);
      let t = ary.reduce((prev,next)=>{
        return prev + next.count*next.price
      },0)
      return t
    },
    // checkAll(){
    //   // checkAll 什么时候才嫩是true
    //   // 每一条数据中的isSelect都是true \
    //   return this.dataList.every(item=>item.isSelect)
    // },
    checkAll:{
      /* 
        ....but it has no setter.
        我们给一个计算属性 赋值了；但是没有给这个计算属性设置 set方法
      */
      get(){
        // 简写方式 只是相当于写了一个get
        return this.dataList.every(item=>item.isSelect)
      },
      set(val){
        console.log(val);
        this.dataList.forEach(item=>item.isSelect=val)
      }

    }
  },
})