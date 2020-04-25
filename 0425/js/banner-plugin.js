/* 工具包 */
(function () {
	let class2type = {};
	["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol"].forEach(item => {
		class2type["[object " + item + "]"] = item.toLowerCase();
	});

	function toType(obj) {
		if (obj == null) return obj + "";
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[class2type.toString.call(obj)] || "object" :
			typeof obj;
	}

	function isFunction(obj) {
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	}

	function isWindow(obj) {
		return obj != null && obj === obj.window;
	}

	function isArrayLike(obj) {
		var length = !!obj && "length" in obj && obj.length,
			type = toType(obj);
		if (isFunction(obj) || isWindow(obj)) return false;
		return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
	}

	function _each(obj, callback, context = window) {
		if (/^(ARRAY|OBJECT)$/i.test(obj.constructor)) {
			obj = _cloneDeep(obj);
		}
		if (isArrayLike(obj)) {
			for (let i = 0; i < obj.length; i++) {
				let res = callback && callback.call(context, obj[i], i);
				if (res === false) break;
				if (res !== undefined) obj[i] = res;
			}
		} else {
			for (let key in obj) {
				if (!obj.hasOwnProperty(key)) break;
				let res = callback && callback.call(context, obj[key], key);
				if (res === false) break;
				if (res !== undefined) obj[key] = res;
			}
		}
		return obj;
	}

	function _cloneDeep(obj) {
		if (obj === null) return null;
		if (typeof obj !== "object") return obj;
		if (obj instanceof RegExp) return new RegExp(obj);
		if (obj instanceof Date) return new Date(obj);
		let cloneObj = new obj.constructor;
		for (let key in obj) {
			if (!obj.hasOwnProperty(key)) break;
			cloneObj[key] = _cloneDeep(obj[key]);
		}
		return cloneObj;
	}

	function _assignDeep(obj1, obj2) {
		let obj = _cloneDeep(obj1);
		for (let key in obj2) {
			if (!obj2.hasOwnProperty(key)) break;
			let v2 = obj2[key],
				v1 = obj[key];
			if ((v1 !== null && typeof v1 === "object") && (v2 !== null && typeof v2 === "object")) {
				obj[key] = _assignDeep(v1, v2);
				continue;
			}
			obj[key] = v2;
		}
		return obj;
	}

	['_each', '_cloneDeep', '_assignDeep', 'toType', 'isFunction', 'isWindow', 'isArrayLike'].forEach(item => {
		window[item] = eval(item);
	});
})();

/* 轮播图插件 */
(function () {
	class Banner {
		constructor(container, options) {
			this.container = container;
			_each(options, (item, key) => {
				this[key] = item;
			});
			this.activeIndex = this.initialSlide;
			this.init();
		}
		// BANNER.PROTOTYPE  实例.XXX()
		init() {
			// 入口，在这里控制代码执行的逻辑顺序
			this.computed();

		}
		computed() {
			// 先获取需要操作的元素
			let container = this.container;
			this.wrapper = container.querySelector('.zhufeng-wrapper');
			this.slidesTrue = container.querySelectorAll('.zhufeng-slide');
			// 克隆第一张到容器的末尾
			this.wrapper.appendChild(this.slidesTrue[0].cloneNode(true));
			this.slides = container.querySelectorAll('.zhufeng-slide');

			// 分页器
			this.paginationBox = null;
			this.paginationList = null;
			if (toType(this.pagination) === "object") {
				let el = this.pagination.el;
				if (el) {
					this.paginationBox = container.querySelector(el);
					// 创建SPAN
					let str = ``;
					_each(this.slidesTrue, item => {
						str += `<span></span>`;
					});
					this.paginationBox.innerHTML = str;
					this.paginationList = this.paginationBox.querySelectorAll('span');
				}
			}

			// 左右切换
			this.arrowPrev = null;
			this.arrowNext = null;
			if (toType(this.navigation) === "object") {
				this.navigation.prevEl ? this.arrowPrev = container.querySelector(this.navigation.prevEl) : null;
				this.navigation.nextEl ? this.arrowNext = container.querySelector(this.navigation.nextEl) : null;
			}

			// 控制元素的样式（包含初始展示哪一个）
			this.changeWidth = parseFloat(window.getComputedStyle(this.container).width);
			this.activeIndex = this.activeIndex < 0 ? 0 : (this.activeIndex > this.slides.length - 1 ? this.slides.length - 1 : this.activeIndex);
			this.wrapper.style.width = `${this.changeWidth*this.slides.length}px`;
			this.wrapper.style.transition = `left ${this.speed}ms`;
			this.wrapper.style.left = `${-this.activeIndex*this.changeWidth}px`;
			_each(this.slides, item => {
				item.style.width = `${this.changeWidth}px`;
			});
			
			// 默认焦点对齐
			this.autoFocus();
		}
		autoFocus() {
			// 实现焦点对齐
			if (!this.paginationList) return;
			let temp = this.activeIndex;
			temp === this.slides.length - 1 ? temp = 0 : null;
			_each(this.paginationList, (item, index) => {
				if (index === temp) {
					item.className = 'active';
					return;
				}
				item.className = '';
			});
		}
	}

	function bannerPlugin(container, options = {}) {
		let defaultParams = {
			initialSlide: 0,
			autoplay: 3000,
			speed: 300,
			pagination: {
				el: '.zhufeng-pagination',
				clickable: true
			},
			navigation: {
				nextEl: '.zhufeng-arrow-next',
				prevEl: '.zhufeng-arrow-prev'
			},
			on: {
				init() {},
				transitionStart() {},
				transitionEnd() {}
			}
		};
		options = _assignDeep(defaultParams, options);

		typeof container === "string" ? container = document.querySelector(container) : null;
		if (!container || container.nodeType !== 1) {
			throw new TypeError('container must be an element!');
		}

		return new Banner(container, options);
	}

	window.bannerPlugin = bannerPlugin;
})();