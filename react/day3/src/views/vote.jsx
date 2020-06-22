import React from 'react';
import PropTypes from 'prop-types';


export default class Vote extends React.Component {
	constructor(props) {
		super(props);

		// 初始化状态
		this.state = {
			n: 0,
			m: 0
		};
	}

	render() {
		let { title } = this.props;
		return <div className="voteBox">
			{title}
		</div>;
	}
};


/* export default class Vote extends React.Component {
	constructor(props) {
		super(props);
	}

	// 调取组件，属性发生改变触发的周期函数：即将接收最新传递的属性
	// 1. this.props还是原来的属性值，还没有被更新过来了
	// 2. nextProps存储的是新传递过来的属性
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}

	// 每一次属性或者状态改变的时候，都先触发它，方法返回TRUE则允许更新，返回FALSE则不允许更新，一般用于组件内部的更新优化，避免非必要的渲染
	shouldComponentUpdate(nextProps, nextState) {
		// nextProps, nextState  即将要更改的属性和状态
		// this.props, this.state 还是之前的值
		return true;
	}

	render() {
		let { title } = this.props;
		return <div className="voteBox">
			{title}
		</div>;
	}
}; */