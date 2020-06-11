import Vue from 'vue'
import Vuex from 'vuex'
import state  from './state.js'
// import * as mutations from './mutations';//把所有额导出 都放到mutations对象中
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions,
  modules: {
  }
})
