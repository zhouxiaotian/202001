class HistoryRoute {
	constructor() {
		this.current = null;
	}
}

class VueRouter {
	constructor(options) {
		let {
			mode = "hash",
				routes = []
		} = options;
		this.mode = mode;
		this.routes = routes;

		// 把路由表变为{[path]:[component],...}格式
		this.routesMap = this.createMap(this.routes);

		// 需要存放的当前路径
		this.history = new HistoryRoute;

		// 初始化
		this.init();
	}
	createMap(routes) {
		return routes.reduce((obj, item) => {
			obj[item.path] = item.component;
		}, {});
	}
	init() {
		let mode = this.mode;
		if (mode === "hash") {
			location.hash ? "" : location.hash = "/";
			window.addEventListener('load', () => {
				this.history.current = location.hash.slice(1);
			});
			window.addEventListener('hashchange', () => {
				this.history.current = location.hash.slice(1);
			});
			return;
		}
		location.pathname ? "" : location.pathname = "/";
		window.addEventListener('load', () => {
			this.history.current = location.pathname;
		});
		window.addEventListener('popstate', () => {
			this.history.current = location.pathname;
		});

	}
}
VueRouter.install = _Vue => {

};
export default VueRouter;