import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './vote.less';

// 在外面编写一些在函数式组件中需要用到的方法
function ratio(state) {
	let { supNum, oppNum } = state,
		total = supNum + oppNum;
	if (total === 0) return '--';
	return (supNum / total * 100).toFixed(2) + '%';
}

let preDOM = null;

export default function Vote(props) {
	// 获取传递的属性值：不传递的值，我们给其设置初始值
	let { title, supNum = 0, oppNum = 0 } = props;

	// 应用状态
	let [state, setState] = useState({
		supNum,
		oppNum
	});

	// 使用周期函数 useEffect（可以使用多次）
	// => useEffect([callback])：第一次渲染完和每一次重新渲染完执行（componentDidMount/componentDidUpdate）
	// => useEffect([callback],[])：第一次渲染完执行（componentDidMount）
	// => useEffect([callback],[dependencies,...])：只有依赖状态发生改变，才会触发执行回调函数（第一次渲染一般会执行一次，因为设置初始状态也算改变状态）
	// useEffect(() => {
	// 	console.log(1);
	// }, [state.supNum]);
	// ----
	// useEffect(() => {
	// 	return () => {
	// 		// 只有状态更新的时候执行 componentDidUpdate
	// 		console.log('1');
	// 	}
	// });

	// 使用REF操作DOM
	// useRef返回一个对象，在视图中让元素的ref等于这个对象，这样在视图渲染完成后，我们可以基于 对象.current 获取到这个DOM元素
	// createRef每一次重新渲染，createRef都会生成一个新的对象，useRef只有第一次创建一个对象，后期重新渲染用的都是之前创建好的对象（性能更好）
	let titleBox = useRef();
	// useEffect(() => {
	// 	if (preDOM) {
	// 		console.log(titleBox === preDOM);
	// 	}
	// 	preDOM = titleBox;
	// 	// console.log(titleBox.current); //=>H3
	// });

	return <div className="voteBox">
		<header className="voteHeader">
			<h3 ref={titleBox}>
				{title}
			</h3>
			<span>【{state.supNum + state.oppNum}】</span>
		</header>
		<main className="voteMain">
			<p>支持数：{state.supNum}</p>
			<p>反对数：{state.oppNum}</p>
			<p>支持率：{ratio(state)}</p>
		</main>
		<footer className="voteFooter">
			<button onClick={ev => {
				setState({ ...state, supNum: ++state.supNum });
			}}>支持</button>

			<button onClick={ev => {
				setState({ ...state, oppNum: ++state.oppNum });
			}}>反对</button>
		</footer>
	</div>;
};



/*
 * REACT HOOK
 *   在我们的函数式组件（静态组件）中应用一些HOOK函数，使静态组件动态化（目前项目中最常用的，具备了类组件和函数组件各自的优势），对于特别复杂的组件我们才使用类组件处理
 */

/* export default function Vote(props) {
	let { title, supNum = 0, oppNum = 0 } = props;

	// useState：在函数式组件中应用状态
	// useState([初始状态值])：返回结果是一个数组，第一项当前状态值，第二项修改状态的方法
	// 组件重新渲染的时候，再次执行useState，它会自己分析知否已经存在状态值，存在则拿到最新的状态值赋值给n，而不是从新的初始化
	// let [n, changeN] = useState(supNum);
	// let [m, changeM] = useState(oppNum);
	// 把用到的多个状态合并在一起
	let [state, setState] = useState({
		n: supNum,
		m: oppNum
	});

	return <div className="voteBox">
		<header className="voteHeader">
			<h3>{title}</h3>
			<span>【--】</span>
		</header>
		<main className="voteMain">
			<p>支持数：{state.n}</p>
			<p>反对数：{state.m}</p>
			<p>支持率：--</p>
		</main>
		<footer className="voteFooter">
			<button onClick={ev => {
				// changeN修改状态的方法,传递的值就是修改状态的值,状态值修改后，会通知当前组件重新渲染
				// changeN(++n);

				// 合并后执行统一修改状态的方法：方法中传递的是啥，会把整个状态值替换成啥，所以每一次我们需要把原始状态先拷贝一份过来，再去修改指定状态信息
				setState({
					...state,
					n: ++state.n
				});
			}}>支持</button>

			<button onClick={ev => {
				// changeM(++m);
			}}>反对</button>
		</footer>
	</div>;
}; */


/* export default class Vote extends React.Component {
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

console.dir(React); */