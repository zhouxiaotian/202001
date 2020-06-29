/* 创建STORE容器的 */
import {
	createStore,
	applyMiddleware
} from 'redux';
import reducer from './reducers/reducer';

const store = createStore(reducer);
export default store;