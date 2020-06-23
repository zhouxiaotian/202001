//这里边放置的是各种函数  函数要不是直接返回一个action({type:'',xxx:''})要不就是i返回一个回调函数
import * as types from './types'
export  function add(val){
  return {type:types.ADDTODO,val:val}
}

export function minus(val){
  return (dispatch,getState)=>{
    setTimeout(() => {
      dispatch({type:types.REMOVE,val:val})
    }, 1000);
  }
}