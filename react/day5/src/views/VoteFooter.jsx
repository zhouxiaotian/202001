import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

export default function VoteFooter(props) {
	const { handle } = useContext(ThemeContext);
	return <footer className="voteFooter">
		<button onClick={_ => {
			handle(0);
		}}>支持</button>

		<button onClick={_ => {
			handle(1);
		}}>反对</button>
	</footer>
};