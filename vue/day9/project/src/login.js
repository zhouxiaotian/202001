/* 兼容处理 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import AppLogin from './AppLogin.vue';

Vue.config.productionTip = false;
new Vue({
	render: h => h(AppLogin)
}).$mount('#app');