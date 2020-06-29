import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import action from '../store/actions/action';

export default function Plus(props) {
	const context = useContext(ThemeContext);

	return <>
		<button onClick={ev => {
			context.store.dispatch(action.computed.plus(20));
		}}>+</button>
	</>;
};