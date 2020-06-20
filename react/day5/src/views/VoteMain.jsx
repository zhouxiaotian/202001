import React from 'react';
import ThemeContext from './ThemeContext';

export default class VoteMain extends React.Component {
	/* 使用上下文信息第一种方式：this.context */
	// static contextType = ThemeContext;

	render() {
		/* 使用上下文信息第一种方式：基于Consumer组件来使用上下文信息 */
		return <ThemeContext.Consumer>
			{context => {
				let { supNum, oppNum } = context;
				return <main className="voteMain">
					<p>支持数：{supNum}</p>
					<p>反对数：{oppNum}</p>
					<p>支持率：{this.ratio(supNum, oppNum)}</p>
				</main>;
			}}
		</ThemeContext.Consumer>;
	}

	ratio = (supNum, oppNum) => {
		let total = supNum + oppNum;
		if (total === 0) return '--';
		return (supNum / total * 100).toFixed(2) + '%';
	}
};