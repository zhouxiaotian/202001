import Vue from 'vue';
import VueRouter from 'vue-router';

/* 导入需要匹配的组件 */
import Home from '../pages/Home.vue';
import Custome from '../pages/Custome.vue';
import System from '../pages/System.vue';
import Page404 from '../pages/Page404.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	// HASH（哈希路由） && HISTORY（BROWSER路由）
	mode: 'hash',
	// 配置路由表：在不同的HASH值下匹配不同的组件
	routes: [{
		path: '/',
		component: Home
	}, {
		path: '/custome',
		component: Custome
	}, {
		path: '/system',
		component: System
	}, {
		path: '*',
		// component: Page404
		redirect: '/'
	}]
});
export default router;

/*
 * HASH路由
 *    在URL地址末尾加入 #/  哈希值/
 *    #/userlist  哈希值/userlist
 *    #/useradd   哈希值/useradd 
 * 
 * vue-router监听当前页面HASH值的改变，根据不容的HASH值，在“路由视图容器”中渲染不同的组件
 *  
 * router-view 路由容器：根据路由表的匹配规则，匹配到不同的组件，每一次都可以把匹配到的组件放置在容器中进行渲染
 *  
 * 每一次URL地址后面的HASH值改变，程序就监听到了，程序会重新从路由表中第一个开始向下依次进行匹配，直到找到符合的那一项为止
 */