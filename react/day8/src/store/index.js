/* 创建STORE容器的 */
import {
	createStore,
	applyMiddleware
} from 'redux';
import reducer from './reducers/reducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
// reduxThunk / reduxPromise：管控异步dispatch

const store = createStore(reducer, applyMiddleware(
	reduxLogger,
	reduxThunk,
	reduxPromise
));
export default store;