import * as TYPE from '../action-types';
const initialstate = {
	count: 0
};
export default function computed(state = initialstate, action) {
	state = JSON.parse(JSON.stringify(state));
	let {
		type,
		payload
	} = action;

	switch (type) {
		case TYPE.COMPUTED_MINUS:
			state.count -= payload;
			break;
		case TYPE.COMPUTED_PLUS:
			state.count += payload;
			break;
	}
	return state;
};