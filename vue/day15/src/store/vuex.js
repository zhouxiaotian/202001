function forEach(obj, callback) {
	Object.keys(obj).forEach(key => {
		callback && callback(key, obj[key]);
	});
}

class Store {
	constructor(options) {
		let {
			state = {},
				getters = {},
				mutations = {},
				actions = {}
		} = options;

		// 处理STATE（设置为响应式操作）
		this._vm = new Vue({
			data: {
				state
			}
		});

		// 处理GETTERS
		this.getters = {};
		forEach(getters, (key, func) => {
			Object.defineProperty(this.getters, key, {
				get: () => {
					return func.call(this, this.state);
				}
			});
		});

		// 处理MUTATIONS
		this.mutations = {};
		forEach(mutations, (key, func) => {
			this.mutations[key] = payload => {
				func.call(this, this.state, payload);
			};
		});

		// 处理ACTIONS
		this.actions = {};
		forEach(actions, (key, func) => {
			this.actions[key] = payload => {
				func.call(this, this, payload);
			};
		});
	}
	// 取值函数
	get state() {
		return this._vm.state;
	}
	// COMMIT
	commit = (type, payload) => {
		this.mutations[type](payload);
	}
	// DISPATCH
	dispatch = (type, payload) => {
		this.actions[type](payload);
	}
};

let Vue;
let Vuex = {
	install: _Vue => {
		Vue = _Vue;
		// 给每一个组件都注册 $store
		Vue.mixin({
			beforeCreate() {
				let store = this.$options && this.$options.store;
				if (store) {
					// 根组件
					this.$store = store;
				} else {
					// 其余组件
					this.$store = this.$parent && this.$parent.$store;
				}
			}
		});
	},
	Store
};
export default Vuex;