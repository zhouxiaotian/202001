// 存储路由映射表
import Home from '../views/Home.vue'
import Crm from '../components/crm/index.vue'
import Org from '../components/org'
export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/crm',
        name:'crm',
        component:Crm
      },
      {
        path:'/org',
        name:'org',
        component:Org
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    component:() => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }
]