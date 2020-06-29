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

/*
 * 各版块的REDUCER合并后,STATE状态也是按照指定的版块名分开管理的
 * state = { 
 *    computed:{
 *        count:0
 *    },
 *    task:{
 *        data:[]
 *    }
 * }
 */