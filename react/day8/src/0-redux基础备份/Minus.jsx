import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

export default function Minus(props) {
	const context = useContext(ThemeContext);

	return <>
		<button onClick={ev => {
			// 派发行为ACTION对象
			context.store.dispatch({
				type: 'MINUS',
				payload: 10
			});
		}}>-</button>
	</>;
};