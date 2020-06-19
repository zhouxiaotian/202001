import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './vote.less';

function ratio(state) {
	let { supNum, oppNum } = state,
		total = supNum + oppNum;
	if (total === 0) return '--';
	return (supNum / total * 100).toFixed(2) + '%';
}

export default function Vote(props) {
	let { title, supNum = 0, oppNum = 0 } = props;

	// 应用状态
	let [state, setState] = useState({
		supNum,
		oppNum
	});

	return <div className="voteBox">
		<header className="voteHeader">
			<h3>{title}</h3>
			<span>【{state.supNum + state.oppNum}】</span>
		</header>
		<main className="voteMain">
			<p>支持数：{state.supNum}</p>
			<p>反对数：{state.oppNum}</p>
			<p>支持率：{ratio(state)}</p>
		</main>
		<footer className="voteFooter">
			<button onClick={ev => {
				setState({ ...state, supNum: ++state.supNum });
			}}>支持</button>

			<button onClick={ev => {
				setState({ ...state, oppNum: ++state.oppNum });
			}}>反对</button>
		</footer>
	</div>;
};