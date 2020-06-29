import * as TYPE from '../action-types';
import API from '../../api/index';

const task = {
	queryAllTask() {
		return async dispatch => {
			// 先从服务器获取全局的任务信息，再派发给REDUCER
			let result = await API.task.getTaskList(),
				action = {
					type: TYPE.TASK_SYNC,
					payload: []
				};
			if (result.code == 0) {
				action.payload = result.list;
			}
			dispatch(action);
		};
	},
	deleteTask(id) {
		return {
			type: TYPE.TASK_DELETE,
			payload: id
		};
	},
	completeTask(id) {
		return {
			type: TYPE.TASK_COMPLETE,
			payload: id
		};
	}
};
export default task;