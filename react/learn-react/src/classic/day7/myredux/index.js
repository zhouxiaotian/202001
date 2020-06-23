import {createStore,combineReducers,applyMiddleware} from 'redux'
import {countReducer,todoReducer} from './reducers'
import reduxThunk from 'redux-thunk' ;// 可让 dispatch 接收一个函数了
// const rootReducer = combineReducers({
//   count123:countReducer,
//   todo123:todoReducer
// });
const rootReducer = combineReducers({countReducer,todoReducer});// 合并多个reducer
// let store = createStore(countReducer)
let store = createStore(rootReducer,applyMiddleware(reduxThunk))// 传递的是 合并之后的reducer

export default store