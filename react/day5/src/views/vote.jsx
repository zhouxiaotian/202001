import React, { useState } from 'react';
import './vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from './ThemeContext';

export default function Vote(props) {
	// 使用状态
	let [state, setState] = useState({
		supNum: 0,
		oppNum: 0
	});
	const handle = (lx = 0) => {
		// 支持
		if (lx === 0) {
			setState({ ...state, supNum: state.supNum + 1 });
			return;
		}
		// 反对
		setState({ ...state, oppNum: state.oppNum + 1 });
	};

	return <ThemeContext.Provider
		value={{
			// 需要提供的上下文信息
			...state,
			handle
		}}>
		<div className="voteBox">
			<header className="voteHeader">
				<h3>{props.title}</h3>
				<span>【{state.supNum + state.oppNum}】</span>
			</header>
			<VoteMain></VoteMain>
			<VoteFooter></VoteFooter>
		</div>
	</ThemeContext.Provider>;
};

/*
 【函数式组件  HOOKS】
  1.创建上下文对象ThemeContext：React.createContext();
  2.在祖先上创建上下文 ThemeContext.Provider value={...}
  技巧：需要用到的上下文，我们一般设置为祖先元素的状态，这样后期只要修改状态，组件重新渲染，这样就会重新设置上下文中的信息（信息就是最新的状态）
  3.在后代组件中使用上下文信息  context=React.useContext(ThemeContext)
 */