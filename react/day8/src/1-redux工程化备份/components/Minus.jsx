import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import action from '../store/actions/action';

export default function Minus(props) {
	const context = useContext(ThemeContext);

	return <>
		<button onClick={ev => {
			context.store.dispatch(action.computed.minus(10));
		}}>-</button>
	</>;
};