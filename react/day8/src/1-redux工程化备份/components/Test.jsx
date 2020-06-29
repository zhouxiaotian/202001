import React from 'react';
import Minus from './Minus';
import Plus from './Plus';
import './Test.less';
import ThemeContext from '../ThemeContext';

export default class Test extends React.Component {
	static contextType = ThemeContext;

	render() {
		const state = this.context.store.getState();

		return <div className="testBox">
			<Minus />
			<span>{state.computed.count}</span>
			<Plus />
		</div>;
	}

	componentDidMount() {
		const unsubscribe = this.context.store.subscribe(() => {
			this.forceUpdate();
		});
		// unsubscribe():把加入的方法从事件池中移除掉
	}
};