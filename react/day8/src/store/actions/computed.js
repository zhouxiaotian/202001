import * as TYPE from '../action-types';
import utils from '../../assets/lib/utils';

const computed = {
	plus(payload) {
		// redux-thunk
		return async dispatch => {
			await utils.delay();
			dispatch({
				type: TYPE.COMPUTED_PLUS,
				payload
			});
		};
	},
	minus(payload) {
		// redux-promise（严格要求传参必须是payload）
		return {
			type: TYPE.COMPUTED_MINUS,
			payload: new Promise(async resolve => {
				await utils.delay();
				resolve(payload);
			})
		};
	}
};
export default computed;