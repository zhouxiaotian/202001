import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* 导入公共的样式资源 */
import './assets/css/reset.min.css';
import './assets/css/common.less';

/* 导入数据接口 */
import api from './api/index';
import utils from './assets/lib/utils';

/* 导入ELEMENT UI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

Vue.config.productionTip = false;
new Vue({
  router, //=> this.$router  this.$route
  store, //=> this.$store
  render: h => h(App)
}).$mount('#app');