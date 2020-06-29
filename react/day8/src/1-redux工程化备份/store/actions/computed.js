import * as TYPE from '../action-types';
const computed = {
	plus(payload) {
		return {
			type: TYPE.COMPUTED_PLUS,
			payload
		};
	},
	minus(payload) {
		return {
			type: TYPE.COMPUTED_MINUS,
			payload
		};
	}
};
export default computed;