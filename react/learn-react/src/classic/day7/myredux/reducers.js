// 存放 对应的 reducer
// reducer这类函数 是用来修改redux中的值的  也是 给初始值的
import * as types from './types'
export const countReducer = (state={count:100},action)=>{
  // state = state || {}
  switch (action.type) {
    case types.ADD:
      // debugger
      return {
        ...state,
        count:state.count + action.qqq
      }
    case types.MINUS:
      return {
        ...state,
        count:state.count - action.qqq
      }
    default:
      return {
        ...state
      }
  }
}
// export function  countReducer (){

// }

export  const todoReducer = (state={todoList:[100,200,300]},action)=>{
    switch (action.type) {
      case types.ADDTODO:
        // state.todoList.push(action.val)
        // debugger
        return {
          ...state,
          todoList:state.todoList.concat(action.val)
        }
      case types.REMOVE:
        return {
          ...state,
          todoList:state.todoList.filter(item=>item !== action.val)
        }
    
      default:
        return {
          ...state
        }
    }
}