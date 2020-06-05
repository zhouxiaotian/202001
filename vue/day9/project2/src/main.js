import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');

/*
 * 导入需要渲染的组件，在new Vue的时候，把组件进行编译，最后放置在模板页面中#APP容器中
 */