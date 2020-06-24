import React from 'react';
import action from '../store/actions/action';
import { connect } from 'react-redux';

function Minus(props) {
	return <>
		<button onClick={ev => {
			props.minus(10);
		}}>-</button>
	</>;
};
export default connect(null, action.computed)(Minus);

/* export default connect(null, dispatch => {
	// dispatch === store.dispatch
	return {
		minus(payload) {
			dispatch(action.computed.minus(payload));
		},
		plus(payload){
			dispatch(action.computed.plus(payload));
		}
	};
})(Minus); */