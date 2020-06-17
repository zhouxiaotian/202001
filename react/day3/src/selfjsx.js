let React = {};
let ReactDOM = {};

function each(obj, callback) {
	// 这样可以不用检测是否为私有的属性了
	Object.keys(obj).forEach(key => {
		let value = obj[key];
		callback && callback(value, key);
	});
}

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

ReactDOM.render = function render(virtualDOM, container, callback) {
	let {
		type,
		props
	} = virtualDOM;
	let element = document.createElement(type);
	// 给元素设置对应的属性
	each(props, (value, key) => {
		if (key === 'className') {
			element.className = value;
			return;
		}
		if (key === 'style') {
			each(value, (styV, styK) => {
				element['style'][styK] = styV;
			});
			return;
		}
		if (key === 'children') {
			let children = value;
			children = Array.isArray(children) ? children : [children];
			each(children, item => {
				if (typeof item === "string") {
					// 文本节点
					element.appendChild(document.createTextNode(item));
					return;
				}
				// 虚拟DOM对象
				render(item, element);
			});
			return;
		}
		element.setAttribute(key, value);
	});
	container.appendChild(element);
	if (typeof callback === "function") {
		callback();
	}
};

export default {
	React,
	ReactDOM
};