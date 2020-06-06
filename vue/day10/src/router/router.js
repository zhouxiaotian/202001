import Vue from 'vue';
import VueRouter from 'vue-router';

/* 导入需要匹配的组件 */
// import Home from '../pages/Home.vue';
// import Custome from '../pages/Custome.vue';
// import System from '../pages/System.vue';
// import Active from '../pages/Active.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	routes: [{
		// path匹配的是地址(也就是HASH值)
		// name是给当前路由起一个名字
		path: '/',
		name: 'nhome',
		component: () => {
			// 路由懒加载
			return import('../pages/Home.vue');
		}
		// component: Home
		// components: {
		// 	default: Home,
		// 	AAA: Active
		// }
	}, {
		path: '/custome',
		name: 'ncustome',
		component: () => {
			return import('../pages/Custome.vue')
		},
		// 二级路由
		children: [{
			path: '/custome',
			redirect: '/custome/list'
		}, {
			path: '/custome/list',
			component: () => {
				return import('../pages/custome/List.vue');
			},
			// 三级路由
			children: []
		}, {
			path: '/custome/add',
			component: () => {
				return import('../pages/custome/Add.vue');
			}
		}, {
			path: '/custome/tong',
			component: () => {
				return import('../pages/custome/Tong.vue');
			}
		}]
	}, {
		path: '/system',
		name: 'nsystem',
		component: () => {
			return import('../pages/System.vue')
		}
	}, {
		path: '/active',
		name: 'nactive',
		component: () => {
			return import('../pages/Active.vue')
		}
	}, {
		path: '/active/:id',
		name: 'nactive',
		component: () => {
			return import('../pages/Active.vue')
		}
	}, {
		// 动态路由的提前占位：跳转的地址 /active/xxx，则会把xxx当做值传递给id（$route.params中可以获取到），真实项目中，如果需要传递参数，我们一般都是基于这种方式，而很少用问号传参（因为它丑）
		path: '/active/:id/:name',
		name: 'nactive',
		component: () => {
			return import('../pages/Active.vue')
		}
	}, {
		path: '*',
		redirect: '/'
	}]
});
export default router;