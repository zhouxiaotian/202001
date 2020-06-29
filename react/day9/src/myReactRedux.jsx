import React from 'react';
import PropTypes from 'prop-types';
const ThemeContext = React.createContext();

// Provider：把基于属性传递进来的store挂载到上下文上
export class Provider extends React.Component {
	static propTypes = {
		store: PropTypes.object.isRequired
	};
	render() {
		return <ThemeContext.Provider
			value={{
				store: this.props.store
			}}>
			{/* 调用组件时候，双闭合中间编写的东西（真实要渲染的组件），拿来渲染 */}
			{this.props.children}
		</ThemeContext.Provider>;
	}
}

export function connect(mapStateToProps, mapDispatchToProps) {
	// 参数初始化:赋值默认值以及对参数进行特殊处理
	if (typeof mapStateToProps !== "function") {
		mapStateToProp = state => {
			return {};
		};
	}
	if (typeof mapDispatchToProps !== "function") {
		if (
			mapDispatchToProps !== null &&
			typeof mapDispatchToProps === "object"
		) {
			// 传递的是一个ACTION模块对象（需要把它变为DISPATCH模式的函数）
			let action = mapDispatchToProps;
			mapDispatchToProps = dispatch => {
				let obj = {};
				Object.keys(action).forEach(key => {
					obj[key] = (...args) => {
						dispatch(action[key](...args));
					};
				});
				return obj;
			};
		} else {
			mapDispatchToProps = dispatch => {
				return {};
			};
		}
	}

	return function connectHOC(Component) {
		// 我们导出的是一个代理组件Proxy（后续在其它组件中调用的就是Proxy）
		// 但Component才是我们最后要渲染的组件
		return class Proxy extends React.Component {
			static contextType = ThemeContext;

			render() {
				return <Component {...this.queryProps()} />;
			}

			// 把两个MAP方法执行，获取需要传递给组件的属性
			queryProps = () => {
				let { store } = this.context,
					state = store.getState(),
					dispatch = store.dispatch;
				return {
					...mapStateToProps(state),
					...mapDispatchToProps(dispatch)
				};
			};

			// 当容器中的状态改变，我们需要让当前组件重新渲染
			componentDidMount() {
				this.context.store.subscribe(() => {
					this.forceUpdate();
				});
			}
		};
	};
}