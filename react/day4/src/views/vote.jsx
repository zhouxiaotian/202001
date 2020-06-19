import React from 'react';
import PropTypes from 'prop-types';
import './vote.less';

export default class Vote extends React.Component {
	// 处理属性
	static defaultProps = {
		supNum: 0,
		oppNum: 0
	};
	static propTypes = {
		title: PropTypes.string.isRequired,
		supNum: PropTypes.number,
		oppNum: PropTypes.number
	};

	// 初始化状态：把传递的属性值赋值给状态，后期可以修状态值
	constructor(props) {
		super(props);

		let { supNum, oppNum } = this.props;
		this.state = {
			supNum,
			oppNum
		};
	}

	render() {
		let { title } = this.props,
			{ supNum, oppNum } = this.state;
		return <div className="voteBox">
			<header className="voteHeader">
				<h3>{title}</h3>
				<span>【{supNum + oppNum}】</span>
			</header>
			<main className="voteMain">
				<p>支持数：{supNum}</p>
				<p>反对数：{oppNum}</p>
				<p>支持率：{this.ratio()}</p>
			</main>
			<footer className="voteFooter">
				<button onClick={this.handle.bind(this, 0)}>支持</button>
				<button onClick={this.handle.bind(this, 1)}>反对</button>
			</footer>
		</div>;
	}

	ratio = () => {
		let { supNum, oppNum } = this.state,
			total = supNum + oppNum;
		if (total === 0) return '--';
		return (supNum / total * 100).toFixed(2) + '%';
	};

	handle = lx => {
		let { supNum, oppNum } = this.state;
		// 支持
		if (lx === 0) {
			this.setState({ supNum: supNum + 1 });
			return;
		}
		// 反对
		this.setState({ oppNum: oppNum + 1 });
	};
};