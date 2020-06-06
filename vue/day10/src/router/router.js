import Vue from 'vue';
import VueRouter from 'vue-router';

/* 导入需要匹配的组件 */
import Home from '../pages/Home.vue';
import Custome from '../pages/Custome.vue';
import System from '../pages/System.vue';
import Active from '../pages/Active.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	routes: [{
		// path匹配的是地址(也就是HASH值)
		// name是给当前路由起一个名字
		path: '/',
		name: 'nhome',
		component: Home
	}, {
		path: '/custome',
		name: 'ncustome',
		component: Custome
	}, {
		path: '/system',
		name: 'nsystem',
		component: System
	}, {
		path: '/active',
		name: 'nactive',
		component: Active
	}, {
		path: '/active/:id',
		name: 'nactive',
		component: Active
	}, {
		// 动态路由的提前占位：跳转的地址 /active/xxx，则会把xxx当做值传递给id（$route.params中可以获取到），真实项目中，如果需要传递参数，我们一般都是基于这种方式，而很少用问号传参（因为它丑）
		path: '/active/:id/:name',
		name: 'nactive',
		component: Active
	}, {
		path: '*',
		redirect: '/'
	}]
});
export default router;