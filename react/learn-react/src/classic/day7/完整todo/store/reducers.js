import * as types from './types'

export function todoReducer(state={
  list:[1,2,3]
},action) {
  switch (action.type) {
    case types.ADDTODO:
      return {
        ...state,
        list: state.list.concat(action.val)
      }
    case types.REMOVETODO:
      return {
        ...state,
        list: state.list.filter(item=>item!=action.val)
      } 
    default:
      return {
        ...state
      }
  }
}