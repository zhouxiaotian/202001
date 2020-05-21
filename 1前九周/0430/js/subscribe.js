/*
 * 自己封装的发布订阅库 
 */
(function anonymous() {
	class Sub {
		// 创建一个事件池，并且挂载到实例上
		pond = {};
		// 向事件池中追加方法
		on(flag, func) {
			// 首先校验新增的标识是否存在事件池中（不存在，我们创建一个这样的标识，并且初始值是一个空的数组，用来存储后续增加的方法；如果存在就拿到现有的数组）
			let pond = this.pond;
			if (!pond.hasOwnProperty(flag)) {
				pond[flag] = [];
			}
			let arr = pond[flag];
			//每次增加之前做一个去重
			if (!arr.includes(func)) {
				arr.push(func);
			}
		}
		// 从事件池中移除方法
		off(flag, func) {
			let pond = this.pond;
			let arr = pond[flag];
			// 如果移除的标识不在事件池中，说明之前从没有设置过这个标识的方法，也就不需要再移除了
			if (!arr) return;
			for (let i = 0; i < arr.length; i++) {
				// 增加的时候是去重的，所以移除的时候，只需要移除一个就够了
				if (arr[i] === func) {
					// 为了防止数据塌陷，我们删除的时候，不去改变原生数组的索引，我们把当前项先赋值为null即可
					// arr.splice(i, 1);
					arr[i] = null;
					break;
				}
			}
		}
		// 通知事件池中的方法执行
		fire(flag, ...params) {
			let arr = this.pond[flag];
			if (!arr) return;
			for (let i = 0; i < arr.length; i++) {
				let item = arr[i];
				// 把当前项不是函数的，从数组中移除掉即可
				if (typeof item !== "function") {
					arr.splice(i, 1);
					i--;
					continue;
				}
				item.call(this, ...params);
			}
		}
	}

	window.subscribe = function subscribe() {
		return new Sub();
	};
})();