import * as types from './types'

export let add = (val)=>{
  return {type:types.ADDTODO,val:val}
}
export let remove = (val)=>{
  return {type:types.REMOVETODO,val:val}
}