import {createStore} from 'redux'

const countReducer = (state,action)=>{
  state = state || {count:1000,name:"zhunfeg"};// 给state一个默认值； state是个形参
  // 这里给 state的默认值 其实就是 给的初始值
  // 这里的这个默认值 对象 就相当于 vuex中的state的初始值
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count:state.count + action.num123
        // 新创造了一个对象  内容 是老state中的内容，只是把老state中的count给顶替了
      }
    case "MINUS":
      return {
        ...state,
        count:state.count - action.num123
      }  
    default:
      return {
        ...state
      }
  }
}

let store = createStore(countReducer)
export default  store