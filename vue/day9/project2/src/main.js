import Vue from 'vue';
import App from './App.vue';

/* 导入路由表 */
import router from './router/router';

Vue.config.productionTip = false;
new Vue({
  // 使用路由：所有基于路由管控的组件中将会包含两个属性
  // this.$router => 实现路由的切换等
  // this.$route  => 包含路由的一些基本信息
  router,
  render: h => h(App),
}).$mount('#app');