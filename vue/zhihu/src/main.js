import Vue from 'vue';
import App from './App.vue';
import router from './router/router';

/* 导入公共的样式 && VANT */
import './assets/reset.min.css';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');