import React from 'react';
import Minus from './Minus';
import Plus from './Plus';
import './Test.less';
import { connect } from 'react-redux';

class Test extends React.Component {
	render() {
		let { count } = this.props;

		return <div className="testBox">
			<Minus />
			<span>{count}</span>
			<Plus />
		</div>;
	}
};
export default connect(state => state.computed)(Test);

/* export default connect(state => {
	// state:公共状态 {computed:{},task:{}...}
	return {
		...state.computed
	};
})(Test);
 */
/*
 * connect高阶组件：返回一个代理组件
 *    connect([mapStateToProps],[mapDispatchToProps])([组件])
 *    =>不需要的可以写null/或者不传递
 *    =>mapStateToProps：把store容器中的公共状态进行遍历，把遍历后的结果(公共状态)当做属性传递给对应的组件
 *    =>mapDispatchToProps：把需要派发的行为任务进行遍历，最后也是基于属性传递给对应的组件
 *
 *    默认帮我们基于subscribe向redux事假池中加入一个方法，当状态更新，会默认通知这个方法执行，并且让当前组件重新渲染
 */