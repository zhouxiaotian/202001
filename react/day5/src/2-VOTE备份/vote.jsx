import React from 'react';
import './vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from './ThemeContext';

export default class Vote extends React.Component {
	state = {
		supNum: 0,
		oppNum: 0
	};

	render() {
		let { supNum, oppNum } = this.state;

		/* 基于ThemeContext.Provider中的value注册上下文信息 */
		return <ThemeContext.Provider
			value={{
				supNum,
				oppNum,
				handle: this.handle
			}}>
			<div className="voteBox">
				<header className="voteHeader">
					<h3>{this.props.title}</h3>
					<span>【{supNum + oppNum}】</span>
				</header>
				<VoteMain></VoteMain>
				<VoteFooter></VoteFooter>
			</div>
		</ThemeContext.Provider>;
	}

	handle = (lx = 0) => {
		// 支持
		if (lx === 0) {
			this.setState({ supNum: this.state.supNum + 1 });
			return;
		}
		// 反对
		this.setState({ oppNum: this.state.oppNum + 1 });
	}
};


/*
 * 类组件中应用上下文
 *    1.祖先元素设置上下文
 *    2.后代元素使用上下文
 *
 * 老语法 =>REACT第15代版本中提供的  在StrictModel模式下有警告错误
 * 新语法 =>Context API
 *    const ThemeContext = React.createContext();
 */