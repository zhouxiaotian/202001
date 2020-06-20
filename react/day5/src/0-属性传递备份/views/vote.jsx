import React, { useState } from 'react';
import './vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';

export default function Vote(props) {
	let [state, setState] = useState({
		supNum: 0,
		oppNum: 0
	});

	function handle(lx = 0) {
		// 支持
		if (lx === 0) {
			setState({ ...state, supNum: state.supNum + 1 });
			return;
		}
		// 反对
		setState({ ...state, oppNum: state.oppNum + 1 });
	}

	return <div className="voteBox">
		<header className="voteHeader">
			<h3>{props.title}</h3>
			<span>【{state.supNum + state.oppNum}】</span>
		</header>
		{/* 基于属性把父组件中的状态信息传递给子组件 */}
		<VoteMain supNum={state.supNum} oppNum={state.oppNum}></VoteMain>
		{/* 把修改状态的方法基于属性传递给子组件（子组件中执行这个方法） */}
		<VoteFooter callback={handle}></VoteFooter>
	</div>;
};