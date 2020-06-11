// 存储路由映射表
import Home from '../views/Home.vue'
import Crm from '../components/crm/index.vue'
import Org from '../components/org'
export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/crm',
    children:[
      {
        path:'/crm',
        name:'crm',
        component:Crm,
        meta:{
          //存放的是自定义的属性
          til:"客户管理"
        }
      },
      {
        path:'/org',
        name:'org',
        component:Org,
        meta:{
          til:"组织管理"
        },
        children:[
          {
            path:'/org/list',
            name:'orgList',
            component:()=>import(/* webpackChunkName: "orgList" */ '../components/org/department/list.vue')
          },
          {
            path:'/org/add',
            name:'orgAdd',
            component:()=>import(/* webpackChunkName: "orgAdd" */ '../components/org/department/add.vue')
          },
          {
            path:'/org/user',
            name:'userList',
            component:()=>import(/* webpackChunkName: "userList" */ '../components/org/user/user.vue')
          },
          {
            path:'/org/addUser',
            name:'addUser',
            component:()=>import(/* webpackChunkName: "addUser" */ '../components/org/user/add.vue')
          }
        ]
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
    name:'login',
    component:() => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }
]