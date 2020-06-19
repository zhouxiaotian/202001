import React from 'react';
import PropTypes, { element } from 'prop-types';

export default class Vote extends React.PureComponent {
	state = {
		arr: [10, 20]
	};

	render() {
		return <div className="voteBox">
			{this.state.arr.map((item, index) => {
				return <span key={index}>
					{item}
				</span>;
			})}
			<button onClick={this.handle}>按钮</button>
		</div>;
	}

	// PureComponent相对于Component会默认创建一个shouldComponentUpdate周期函数（如果用户自己设置shouldComponentUpdate，以用户自己设置的为主，此时没有任何的区别）
	/* shouldComponentUpdate(nextProps, nextState) {
		// 并且在这个周期函数中默认把最新的 属性/状态 和之前的 属性/状态 进行浅比较（shallowEqual），一但发现没有任何的变化，则返回FALSE
		let should = false;
		Object.keys(nextProps).forEach(key => {
			if (nextProps[key] !== this.props[key]) {
				should = true;
			}
		});
		Object.keys(nextState).forEach(key => {
			if (nextState[key] !== this.state[key]) {
				should = true;
			}
		});
		return should;
	} */

	/* // 解决方案1:自己设置替换默认设置的（不建议）
	shouldComponentUpdate() {
		return true;
	} */

	handle = () => {
		let arr = this.state.arr;
		arr.push(30);
		this.setState({
			arr: [...arr]
		});

		// 方案2：直接跳过should进行渲染
		// this.forceUpdate();

		/* this.setState({
			// 只是把ARR堆中的值修改了，但是ARR本身的地址没有改变，shouldComponentUpdate中进行浅比较的时候，发现地址没变，返回的是FALSE
			arr
		}); */

		// this.setState({}); //=>这样也会通知当前组件重新渲染，和forceUpdate的区别是：forceUpdate方法执行会跳过shouldComponentUpdate周期函数
	};
};