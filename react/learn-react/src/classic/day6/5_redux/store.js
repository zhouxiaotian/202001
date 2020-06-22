import {createStore} from 'redux'

const countReducer = (state,action)=>{
  state = state || {count:1000,name:"zhunfeg"};// 给state一个默认值； state是个形参
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count:state.count + action.num
        // 新创造了一个对象  内容 是老state中的内容，只是把老state中的count给顶替了
      }
    case "MINUS":
      return {
        ...state,
        count:state.count - action.num
      }  
    default:
      return {
        ...state
      }
  }
}

let store = createStore(countReducer)
export default  store