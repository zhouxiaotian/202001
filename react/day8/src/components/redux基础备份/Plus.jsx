import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

export default function Plus(props) {
	const context = useContext(ThemeContext);

	return <>
		<button onClick={ev => {
			context.store.dispatch({
				type: 'PLUS',
				payload: 20
			});
		}}>+</button>
	</>;
};