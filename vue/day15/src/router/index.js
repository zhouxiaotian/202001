import Vue from 'vue';
import VueRouter from 'vue-router';
import Task from '../views/Task.vue';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes: [{
    path: '/',
    component: Task
  }]
});
export default router;