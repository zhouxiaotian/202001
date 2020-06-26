import * as TYPE from '../action-types';
const initialstate = {
	// 全部任务信息
	data: []
};
export default function task(state = initialstate, action) {
	state = JSON.parse(JSON.stringify(state));

	let payload = action.payload;
	switch (action.type) {
		case TYPE.TASK_SYNC:
			state.data = payload;
			break;
	}
	return state;
};