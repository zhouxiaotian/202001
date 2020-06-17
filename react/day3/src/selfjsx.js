let React = {};
let ReactDOM = {};

// 创建一个虚拟的DOM对象
React.createElement = function createElement(type, props, ...children) {
	let virtualDOM = {
		type,
		props: {},
		ref: null,
		key: null
	};
	// 处理PROPS
	if (props) {
		virtualDOM['ref'] = props.hasOwnProperty('ref') ? props['ref'] : null;
		virtualDOM['key'] = props.hasOwnProperty('key') ? props['key'] : null;
		delete props['key'];
		delete props['ref'];
		virtualDOM.props = {
			...props
		};
	}
	// 处理CHILDREN
	if (children.length > 0) {
		virtualDOM.props.children = children.length === 1 ? children[0] : children;
	}
	return virtualDOM;
};

ReactDOM.render = function render() {

};

export default {
	React,
	ReactDOM
};