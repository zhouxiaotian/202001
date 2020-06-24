import React from 'react';
import Minus from './Minus';
import Plus from './Plus';
import './Test.less';

/* REDUX */
import ThemeContext from './ThemeContext';
import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';

const initialState = {
	count: 0
};
const reducer = function reducer(state = initialState, action) {
	// state : store容器中的状态（state.xxx=xxx直接就修改了，我们想return的时候再修改，所以我们需要在最开始把state克隆一份【深拷贝】）
	// action : dispatch派发的行为对象（需要有成员type）
	state = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'MINUS':
			state.count -= action.payload;
			break;
		case 'PLUS':
			state.count += action.payload;
			break;
	}
	return state;  // return的内容会修改原始容器中的状态信息
};
const store = createStore(reducer, applyMiddleware(reduxLogger));

export default class Test extends React.Component {
	constructor(props) {
		super(props);

		// 获取store中的公共状态信息，赋值给当前组件的私有状态
		let { count } = store.getState();
		this.state = {
			count
		};
	}
	
	render() {
		return <ThemeContext.Provider
			value={{
				store: store
			}}>
			<div className="testBox">
				<Minus />
				<span>{this.state.count}</span>
				<Plus />
			</div>
		</ThemeContext.Provider>;
	}

	componentDidMount() {
		store.subscribe(() => {
			// this.forceUpdate();
			let count1 = this.state.count,
				{ count: count2 } = store.getState();
			if (count1 != count2) {
				this.setState({
					count: count2
				});
			}
		});
	}
};