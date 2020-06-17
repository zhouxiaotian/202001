import React from 'react';
import PropTypes from 'prop-types';

/* 1.函数式组件：一个函数中返回JSX元素 */
/* export default function Vote(props) {
	/!* props是只读的 *!/
	let { title, children } = props;
	children = children || [];

	return <div className="voteBox">
		{title}
		{children}
	</div>;
}; */

/* 2.类组件：创建一个类，用来继承React.Component/PureComponent，必须要有一个钩子函数render用来做视图的渲染，在函数中返回JSX */
export default class Vote extends React.Component {
	// 给属性设置默认值
	static defaultProps = {
		title: '投票标题',
		children: []
	};

	// 基于prop-types官方插件（单独安装）设置属性规则
	static propTypes = {
		title: PropTypes.string,
		children: PropTypes.any
	};

	constructor(props) {
		super(props); // 基于ES6继承还设置了CONSTRUCTOR，那么第一句必须SUPER，否则报错 React.Component.call(this,...) 
	}

	render() {
		let { title } = this.props;
		return <div className="voteBox">
			{title}
		</div>;
	}
};

/*
 * REACT中的组件有两大类
 *   1.函数式组件
 *     =>静态组件
 *     =>可以基于HOOKS函数让其动态化
 *   2.类组件（动态组件）
 *
 * 静态组件和动态组件：
 *   1. 静态组件是没有自己的状态、生命周期函数等这些内容，所以组件一但被调用渲染，渲染出来的内容就固定了，除非重新调用组件，否则内容不变！优势：渲染速度快，操作简单；弊端：静态化以及功能简单；
 *   2. 动态组件有自己的状态、周期函数等内容，功能强大，即便组件被渲染完成，也可以基于内部的状态等去控制内容重新渲染；优势：功能强大，动态化管理数据；弊端：运行速度相对函数组件来讲较慢，因为要处理的东西比较多；
 *
 *   =>项目中最常用的组件是“HOOKS”，对于复杂的功能还是类组件，对于只需要展示的功能使用静态组件即可
 */