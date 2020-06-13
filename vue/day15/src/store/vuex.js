function forEach(obj, callback) {
	Object.keys(obj).forEach(key => {
		callback && callback(key, obj[key]);
	});
}

class Store {
	constructor(options) {
		// 解析用户在STORE/INDEX中预先传递的信息
		let {
			state = {},
				getters = {},
				mutations = {},
				actions = {}
		} = options;

		// 处理STATE（需要保证STATE是响应式数据）
		this._vm = new Vue({
			data: {
				state
			}
		});

		// 处理GETTERS（在获取GETTERS中某个属性时候，我们需要把OPTIONS传递进来的GETTERS执行，并获取其结果）
		this.getters = {};
		forEach(getters, (key, func) => {
			Object.defineProperty(this.getters, key, {
				get: () => {
					return func.call(this, this.state);
				}
			});
		});

		// 处理MUTIONS
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
	// CLASS的取值函数(GET/SET)：实例.STATE获取值的时候触发这个GETTER函数
	get state() {
		return this._vm.state;
	}
	// COMMIT（箭头函数：保证方法中的THIS永远是当前类的实例）：通知MUTATIONS中的方法执行
	commit = (type, payload) => {
		this.mutations[type](payload);
	}
	// DISPATCH：通知ACTIONS中的方法执行
	dispatch = (type, payload) => {
		this.actions[type](payload);
	}
}

let Vue;
let Vuex = {
	install: _Vue => {
		// Vue.use(Vuex) 首先调用的就是 install
		Vue = _Vue;

		// 给所有的组件或者VUE实例都设置一个$store属性
		Vue.mixin({
			beforeCreate() {
				// this : 每一个组件或者实例
				let store = this.$options && this.$options.store;
				if (store) {
					// 根实例
					this.$store = store;
				} else {
					// 组件
					this.$store = this.$parent && this.$parent.$store;
				}
			}
		});
	},
	Store
};
export default Vuex;