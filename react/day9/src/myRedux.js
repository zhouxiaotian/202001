export function cloneDeep(obj) {
	if (obj === null) return null;
	if (typeof obj !== "object") return obj;
	if (obj instanceof RegExp) return new RegExp(obj);
	if (obj instanceof Date) return new Date(obj);
	let clone = new obj.constructor;
	Object.keys(obj).forEach(key => {
		clone[key] = cloneDeep(obj[key]);
	});
	return clone;
}

export function createStore(reducer) {
	if (typeof reducer !== "function") {
		throw new TypeError("Expected the reducer to be a function.");
	}

	// state：存放公共状态
	// listeners：事件池
	let state,
		listeners = [];

	// 获取状态
	function getState() {
		// 优化：把返回的状态信息进行深度克隆，这样后面获取到的状态信息，不能直接基于STATE.XXX修改了，只能基于DISPATCH
		return cloneDeep(state);
	}

	// 向事件池中追加方法
	function subscribe(func) {
		if (typeof func !== 'function') {
			throw new Error('Expected the listener to be a function.');
		}
		// 优化：向事件池中追加方法，需要先做去重校验
		if (!listeners.includes(func)) {
			listeners.push(func);
		}

		return function unsubscribe() {
			listeners = listeners.filter(item => item !== func);
		}
	}

	// 派发任务的
	function dispatch(action) {
		if (action == null || typeof action !== "object") {
			throw new Error(
				'Actions must be plain objects. ' +
				'Use custom middleware for async actions.'
			);
		}

		if (typeof action.type === 'undefined') {
			throw new Error(
				'Actions may not have an undefined "type" property. ' +
				'Have you misspelled a constant?'
			);
		}

		// 通知REDUCER执行替换容器中的状态
		// 优化：为了防止在REDUCER中直接STATE.XXX也会修改状态信息，我们把传递给REDUCER的状态最好也深度克隆一下（即使我们这不处理，在REDUCER中自己也会处理）
		state = reducer(state, action);

		// 状态改变，需要通知事件池中的方法执行
		// 优化：可以拿最新的状态和原始的状态比较，如果没有任何的变化，则无需触发函数执行
		listeners.forEach(item => item());

		return action;
	}

	// 默认创建STORE的时候，我们就派发一次：给状态赋值初始值（让REDUCER默认执行一次）
	// 注意不能和REDUCER中后期用户传递的ACTION.TYPE冲突
	dispatch({
		type: Symbol('INIT')
	});
	
	return {
		getState,
		subscribe,
		dispatch
	};
}