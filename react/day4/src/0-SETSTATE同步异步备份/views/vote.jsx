import React from 'react';
import PropTypes, { element } from 'prop-types';


export default class Vote extends React.Component {
	state = { n: 0, m: 0 };
	render() {
		let { title } = this.props;
		let { n, m } = this.state;

		return <div className="voteBox">
			{title}【<span>{n}</span>】

			<button onClick={this.handle}
				ref={x => this.button = x}>
				我是按钮
			</button>
		</div>;
	}

	componentWillMount() {
		// 如果是在willMount中设置SET-STATE
		// 1.本身是异步的，在WillMount没有执行完之前，态是没有状更新的
		// 2.按照我们的理解，应该接下里的RENDER/DidMount还都应该是0，等到第一次渲染完，setState再控制其重新渲染一次（相当于渲染了两次）；但是REACT为了避免没必要的重新渲染，在WillMount执行完成后，立即修改了状态，在第一次RENDER的时候就按照最新修改的状态去渲染，这样就没有必要再次重新渲染了
		// this.setState({
		// 	n: this.state.n + 1
		// });
		// console.log('willMount', this.state.n); //=>0
	}

	componentDidMount() {
		// 在声明周期函数中，我们的setState是异步的，也需要等待周期函数执行完成后，再去修改状态（之所以这样设计，是为了保证当前的周期函数得执行完，不能因为setState的重新渲染操作，把周期函数的顺序搞乱了）
		// console.log('didMount', this.state.n); //=>1
		// this.setState({
		// 	m: this.state.m + 1
		// });
		// console.log("DidMount", this.state.m);

		// 定时器本身就是异步的，本身就需要等待周期函数执行完才能执行的
		// setTimeout(() => {
		// 	// 定时器中的setState是同步的
		// 	// =>shouldComponentUpdate -> WillUpdate -> render -> DidUpdate -> 继续向下执行代码
		// 	this.setState({
		// 		m: this.state.m + 1
		// 	});
		// 	console.log("DidMount", this.state.m);
		// }, 1000);

		// this.button.addEventListener('click', () => {
		// 	//=>原生DOM事件绑定中 setState也是同步的
		// 	this.setState({
		// 		m: this.state.m + 1
		// 	});
		// 	console.log("DidMount", this.state.m);
		// });

		// console.log('OK');

		// ====批量更新的问题
		this.setState({ n: 1 }); //【异步】会把当前修改状态操作先放到任务队列中
		console.log(this.state.n); //=>0

		setTimeout(() => {
			console.log(this.state.n);//=>2

			this.setState({ n: 3 }); //【同步】立即去修改状态通知重新渲染
			console.log(this.state.n); //=>3

			this.setState({ n: 4 }); //【同步】立即去修改状态通知重新渲染
			console.log(this.state.n); //=>4
		}, 0);

		this.setState({ n: 2 }); //【异步】会把当前修改状态操作先放到任务队列中
		console.log(this.state.n); //=>0
		
		// 周期函数执行完，通知任务队列中刚才放入的任务去执行（如果多个任务修改的是同一个状态，以最后一次修改的为主，而且是把多个任务统一合并成为一个去通知渲染的“类似于浏览器渲染队列机制，避免不必要的重新渲染”）
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate", nextState.n); //=>2 3 4
		return true;
	}

	// componentDidUpdate() {
	// 	console.log("componentDidUpdate");
	// }

	handle = ev => {
		// 在JSX合成事件中：SET-STATE是异步的
		// this.setState({
		// 	n: this.state.n + 1
		// });
		// console.log(this.state.n);
	}
};












/* export default class Vote extends React.Component {
	state = { n: 0, m: 0 };
	render() {
		let { title } = this.props;
		let { n } = this.state;

		return <div className="voteBox">
			{title}【<span ref={x => this.span = x}>{n}</span>】

			<button onClick={this.handle}
				ref={x => this.button = x}>
				我是按钮
			</button>
		</div>;
	}

	handle = ev => {
		// persist 把合成事件对象转换为类似于原生事件对象

		// ====虽然修改了状态的数据，但是不会通知视图重新渲染
		// this.forceUpdate([callback]) 强制更新（特点：跳过shouldComponentUpdate的校验，直接进入到 componentWillUpdate -> render -> componentDidUpdate，所以项目中慎用）
		// this.state.n = this.state.n + 1;
		// this.forceUpdate();

		// ====专业修改状态并且能通知视图重新渲染的方法
		// this.setState([partialState],[callback])
		this.setState({
			n: this.state.n + 1
		}, () => {
			// 重新渲染完成后触发的回调函数
			// console.log(this.span.innerHTML);
		});
	}

	/!* componentDidMount() {
		this.button.addEventListener('click', ev => {
			console.log('原生事件', ev);
			ev.stopPropagation();
		});
	} *!/
}; */


/* export default class Vote extends React.Component {
	constructor(props) {
		super(props);
		// 最经常做的事情：初始化他的状态
		this.state = {
			n: 0
		};
	}

	render() {
		let { title } = this.props;
		let { n } = this.state;
		return <div className="voteBox">
			{title}【{n}】

			<button ref={x => {
				this.button = x;
			}}>我是按钮</button>
		</div>;
	}

	componentDidMount() {
		// 获取到第一次渲染完成的DOM元素（直接去操作DOM）
		this.button.addEventListener('click', () => {
			// ...
		});
	}
}; */

/*
 * REACT中的事件绑定有两种
 *   1.原生的DOM事件绑定
 *   2.用JSX中自带的“合成事件”  onXxx
 *     REACT为了处理事件的兼容以及移动端事件的处理，所有的事件都是合成的（事件对象也是自己合成的）=> 原理：事件委托，把每一种事件类型都在document上委托一下
 *   真实项目中不建议两者混用的
 */

/*
 * REF
 *    <button ref="AA">我是按钮</button>
 *    this.refs={AA:按钮元素}
 * ---
 *    <button ref={x => {
 *         // x就是当前的DOM元素
 *		   this.AA = x;
 *	   }}>我是按钮</button>
 */