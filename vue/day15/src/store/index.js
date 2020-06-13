import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../assets/lib/utils';
import {
  Loading
} from 'element-ui';

Vue.use(Vuex);
export default new Vuex.Store({
  // 公共状态
  state: {
    data: [{
      id: 1,
      task: "我今天临时安排的一个任务，下午我们需要进行模拟考试",
      state: 1,
      time: "2020-06-13 18:00:00"
    }]
  },
  // 相当于COMPUTED，是对公共的STATE的计算属性
  getters: {
    num(state) {
      return state.data.length;
    }
  },
  // 同步修改STATE信息
  mutations: {
    // 新增任务信息
    insertDATA(state, payload) {
      let data = state.data;
      let taskInfo = Object.assign({
        id: data.length === 0 ? 1 : (parseInt(data[0]['id']) + 1),
        task: "",
        state: 1,
        time: ""
      }, payload);
      state.data.unshift(taskInfo);
    },
    // 删除任务信息
    deleteDATA(state, payload) {
      let data = state.data;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.id == payload.id) {
          state.data.splice(i, 1);
          break;
        }
      }
    },
    // 修改任务为完成
    updateDATA(state, payload) {
      let data = state.data;
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.id == payload.id) {
          item.state = 2;
          item.time = utils.queryNowTime();
          break;
        }
      }
    }
  },
  // 异步修改STATE信息
  actions: {
    async asyncDeleteDATA(store, payload) {
      const loading = Loading.service({
        text: '小主，奴家正在努力处理中~~',
        background: 'rgba(0,0,0,0.5)'
      });
      await utils.delay();
      store.commit('deleteDATA', payload);
      loading.close();
    },
    async asyncUpdateDATA({
      commit
    }, payload) {
      const loading = Loading.service({
        text: '小主，奴家正在努力处理中~~',
        background: 'rgba(0,0,0,0.5)'
      });
      await utils.delay();
      commit('updateDATA', payload);
      loading.close();
    }
  }
});