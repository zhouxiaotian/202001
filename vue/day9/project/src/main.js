import Vue from 'vue';
import App from './App.vue';

/* 导入公共的样式资源 */
import './assets/reset.min.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount('#app');