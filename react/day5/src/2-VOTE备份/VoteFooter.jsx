import React from 'react';
import ThemeContext from './ThemeContext';

export default class VoteFooter extends React.Component {
	static contextType = ThemeContext;

	render() {
		return <footer className="voteFooter">
			<button onClick={_ => {
				this.context.handle(0);
			}}>支持</button>

			<button onClick={_ => {
				this.context.handle(1);
			}}>反对</button>
		</footer>;
	}
};