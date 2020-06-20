import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

export default class VoteFooter extends React.Component {
	/* 后代组件使用上下文【老】 */
	static contextTypes = {
		handle: PropTypes.func
	};

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