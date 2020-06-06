import Vue from 'vue';
import VueRouter from 'vue-router';

/* 导入需要渲染的组件 */
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	routes: [{
		path: '/',
		name: 'home',
		component: Home
	}, {
		path: '/detail',
		name: 'detail',
		component: Detail
	}, {
		path: '/detail/:id',
		name: 'detail',
		component: Detail
	}, {
		path: '*',
		redirect: '/'
	}]
});
export default router;