// export function addCount(state,option){
//   state.count += option
// }
// export function removeCount(state,option){
//   state.count -= option
// }
import * as types from './types.js'
export default {
  // addCount(state,option){
  //   state.count += option
  // },
  // removeCount(state,option){
  //   state.count -= option
  // }

  [types.ADDCOUNT](state,option){
    state.count += option
  },
  [types.REOMOVECOUNT](state,option){
    state.count -= option
  },
  [types.SETUSERINFO](state,option){
    state.userInfo = option
  }
}