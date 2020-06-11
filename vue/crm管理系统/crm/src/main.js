import Vue from 'vue'
import App123 from './Appqqq.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';// import导入css只能导出本地的 不能导入在线的
Vue.use(ElementUI);// 使用vue的插件基本都需要调用 use这个函数
Vue.config.productionTip = false

// console.log(store)
router.beforeEach((to, from, next) => {
  // 根据是否登录 来判断 能否进入后续的页面
  // to 要去哪个页面
  // from 代表是从哪个页面过来的
  // next() 接着向下走的意思  可以接收参数 参数就是我们要去跳转的路径
  //在这里我们可以做一下 登录判断， 若没有登录 就直接跳转到登录页，若登录就向下接着走
  document.title = to.meta.til || 'CRM管理系统'
  if(to.name=='login'){
    // 若我们要跳转的本身就是 login页 就不用走下边的判断了
    next();
    return;
  }
  if(store.state.userInfo.userName){
    next()
  }else{
    next('/login')
  }
  // console.log(to,from)
  // next();
})

new Vue({
  router,
  store,
  render: h => h(App123)// 需要跟组件 就得导入
}).$mount('#app')
// $mount(#app) 这里的app它是去找 public下的html中的 div#app 去了
// render: h => h(App) 这个APP是我们的跟组件
// 效果 其实就是 用APP 跟组件渲染出来的内容 把 div#app顶替了；
