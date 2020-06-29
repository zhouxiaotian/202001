import React from 'react';
import action from '../store/actions/action';
import { connect } from 'react-redux';

function Plus(props) {
	return <>
		<button onClick={ev => {
			props.plus(20);
		}}>+</button>
	</>;
};
export default connect(
	state => state.computed,
	action.computed
)(Plus);