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
			_each(options, (item, key) => {
				this[key] = item;
			});
			this.container = container;
			this.activeIndex = this.initialSlide;
			this.init();
		}
		init() {
			// 先基于它获取元素后，才可以获取实例上的信息
			this.computed();

			let {
				autoplay,
				autoMove,
				container,
				pagination,
				paginationList,
				arrowNext,
				arrowPrev
			} = this;

			// 控制是否自动切换
			if (autoplay) {
				this.autoTimer = setInterval(autoMove.bind(this), autoplay);
				container.onmouseenter = () => clearInterval(this.autoTimer);
				container.onmouseleave = () => this.autoTimer = setInterval(autoMove.bind(this), autoplay);
			}

			// 控制焦点切换
			if (toType(pagination) === "object" && pagination.clickable === true && paginationList) {
				_each(paginationList, (item, index) => {
					item.onclick = () => {
						let {
							activeIndex,
							slides
						} = this;
						if ((index === activeIndex) || (index === 0 && activeIndex === slides.length - 1)) return;
						this.activeIndex = index;
						this.change();
					};
				});
			}

			// 控制左右按钮切换
			arrowNext ? arrowNext.onclick = autoMove.bind(this) : null;
			arrowPrev ? arrowPrev.onclick = () => {
				if (this.activeIndex === 0) {
					this.activeIndex = this.slides.length - 1;
					this.change(true);
				}
				this.activeIndex--;
				this.change();
			} : null;

			// 初始化完成，触发INIT回调函数
			if (toType(this.on) === "object" && isFunction(this.on.init)) {
				// 把回调函数执行，让方法中的THIS是实例，并且传递的第一个参数也是实例
				this.on.init.call(this, this);
			}
		}
		// 计算结构和样式
		computed() {
			let {
				container,
				pagination,
				navigation
			} = this;

			// 轮播图
			this.wrapper = container.querySelector('.zhufeng-wrapper');
			this.slidesTrue = container.querySelectorAll('.zhufeng-slide');
			this.wrapper.appendChild(this.slidesTrue[0].cloneNode(true));
			this.slides = container.querySelectorAll('.zhufeng-slide');

			// 分页器
			this.paginationBox = null;
			this.paginationList = null;
			if (toType(pagination) === "object") {
				let el = pagination.el;
				if (el) {
					this.paginationBox = container.querySelector(el);
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
			if (toType(navigation) === "object") {
				navigation.prevEl ? this.arrowPrev = container.querySelector(navigation.prevEl) : null;
				navigation.nextEl ? this.arrowNext = container.querySelector(navigation.nextEl) : null;
			}

			// 控制元素的样式（包含初始展示哪一个）
			this.changeWidth = parseFloat(getComputedStyle(container).width);
			this.activeIndex = this.activeIndex < 0 ? 0 : (this.activeIndex > this.slides.length - 1 ? this.slides.length - 1 : this.activeIndex);
			this.wrapper.style.width = `${this.changeWidth*this.slides.length}px`;
			this.wrapper.style.transition = `left ${this.speed}ms`;
			this.wrapper.style.left = `${-this.activeIndex*this.changeWidth}px`;
			_each(this.slides, item => {
				item.style.width = `${this.changeWidth}px`;
			});
			this.autoFocus();
		}
		// 自动轮播
		autoMove() {
			if (this.activeIndex === this.slides.length - 1) {
				this.activeIndex = 0;
				this.change(true);
			}
			this.activeIndex++;
			this.change();
		}
		// 实现轮播图切换
		change(now = false) {
			let {
				wrapper,
				speed,
				activeIndex,
				changeWidth,
				on
			} = this;
			let isO = toType(on) === "object" ? true : false,
				transitionStart = isO ? on.transitionStart : null,
				transitionEnd = isO ? on.transitionEnd : null;
			// 切换之前触发的钩子函数
			!now && transitionStart ? transitionStart.call(this, this) : null;

			wrapper.style.transitionDuration = `${now?0:speed}ms`;
			wrapper.style.left = `${-activeIndex*changeWidth}px`;
			if (now) {
				wrapper.offsetWidth;
			} else {
				this.autoFocus();
			}

			// 切换之后触发的钩子函数
			let fn = () => {
				!now && transitionEnd ? transitionEnd.call(this, this) : null;
				// 每一次都会重新监听，所以监听完需要把上一次监听的移除掉
				wrapper.removeEventListener('transitionend', fn);
			};
			wrapper.addEventListener('transitionend', fn);
		}
		// 实现焦点对齐
		autoFocus() {
			let {
				paginationList,
				activeIndex,
				slides
			} = this;
			if (!paginationList) return;
			activeIndex === slides.length - 1 ? activeIndex = 0 : null;
			_each(paginationList, (item, index) => {
				if (index === activeIndex) {
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