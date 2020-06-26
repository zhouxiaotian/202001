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
		case TYPE.TASK_DELETE:
			state.data = state.data.filter(item => item.id != payload);
			break;
		case TYPE.TASK_COMPLETE:
			state.data = state.data.map(item => {
				if (item.id == payload) {
					item.state = 2;
				}
				return item;
			});
			break;
	}
	return state;
};