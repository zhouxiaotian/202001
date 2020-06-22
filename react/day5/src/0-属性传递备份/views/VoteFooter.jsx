import React from 'react';
export default function VoteFooter(props) {
	let handle = props.callback || Function.prototype;

	return <footer className="voteFooter">
		<button onClick={_ => {
			handle(0);
		}}>支持</button>
		<button onClick={handle.bind(null, 1)}>反对</button>
	</footer>
};