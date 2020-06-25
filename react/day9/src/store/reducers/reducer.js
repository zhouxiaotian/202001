import {
	combineReducers
} from 'redux';
import computed from './computed';
import task from './task';

const reducer = combineReducers({
	computed,
	task
});
export default reducer;