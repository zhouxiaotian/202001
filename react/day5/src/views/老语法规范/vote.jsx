import React from 'react';
import PropTypes from 'prop-types';
import './vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from './ThemeContext';

export default class Vote extends React.Component {
	/* 设置祖先元素的上下文【老】 */
	static childContextTypes = {
		supNum: PropTypes.number,
		oppNum: PropTypes.number,
		handle: PropTypes.func
	};
	getChildContext() {
		// 返回对象就是注册的上下文（此方法第一次渲染和重新渲染的时候都会被触发执行）
		return {
			supNum: this.state.supNum,
			oppNum: this.state.oppNum,
			handle: this.handle
		};
	}

	state = {
		supNum: 0,
		oppNum: 0
	};

	render() {
		let { supNum, oppNum } = this.state;
		return <div className="voteBox">
			<header className="voteHeader">
				<h3>{this.props.title}</h3>
				<span>【{supNum + oppNum}】</span>
			</header>
			<VoteMain></VoteMain>
			<VoteFooter></VoteFooter>
		</div>;
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
 * 新语法
 */