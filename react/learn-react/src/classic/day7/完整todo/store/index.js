import {createStore,combineReducers} from 'redux'

import {todoReducer} from './reducers'
let rootReducer = combineReducers({
  toAry:todoReducer
})

let store = createStore(rootReducer)

export default store