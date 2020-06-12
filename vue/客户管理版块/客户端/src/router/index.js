import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'customlist',
    component: () => {
      return import('../views/CustomList.vue');
    }
  }, {
    path: '/create',
    name: 'customcreate',
    component: () => {
      return import('../views/CustomCreate.vue');
    }
  }, {
    path: '/upload',
    name: 'customupload',
    component: () => {
      return import('../views/CustomUpload.vue');
    }
  }, {
    path: '/visit/:customid',
    name: 'visithandle',
    component: () => {
      return import('../views/VisitHandle.vue');
    }
  }, {
    path: '*',
    redirect: {
      path: '/',
      query: {
        error: 404
      }
    }
  }]
});
export default router;