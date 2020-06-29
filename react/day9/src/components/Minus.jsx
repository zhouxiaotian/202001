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