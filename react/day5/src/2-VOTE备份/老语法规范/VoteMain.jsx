import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

export default class VoteMain extends React.Component {
	/* 后代组件使用上下文【老】 */
	// this.context存储你需要使用的上下文信息
	static contextTypes = {
		supNum: PropTypes.number,
		oppNum: PropTypes.number,
	};

	render() {
		let { supNum, oppNum } = this.context;
		return <main className="voteMain">
			<p>支持数：{supNum}</p>
			<p>反对数：{oppNum}</p>
			<p>支持率：{this.ratio(supNum, oppNum)}</p>
		</main>;
	}

	ratio = (supNum, oppNum) => {
		let total = supNum + oppNum;
		if (total === 0) return '--';
		return (supNum / total * 100).toFixed(2) + '%';
	}
};