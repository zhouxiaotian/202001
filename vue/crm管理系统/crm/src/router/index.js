import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './route'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',// hash 利用的就是路由hashchange; history需要后台配后
  base: process.env.BASE_URL,
  routes:routes,
  linkActiveClass:'current',//修改 对应路径的 link的类名 默认是 router-link-active
  linkExactActiveClass:'exactCurrent',//不仅路径一样 参数也一样的时候 才会有这个类名
})

export default router
