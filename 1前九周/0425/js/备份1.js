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
			// THIS:当前类的实例
			// 入口，在这里控制代码执行的逻辑顺序
			this.computed();

			// 控制是否自动切换
			if (this.autoplay) {
				// this.autoTimer = setInterval(this.autoMove, this.autoplay);
				// 这样处理后，每间隔一定时间执行THIS.AUTOMOVE方法，方法中的THIS不在是当前类的实例，而是WINDOW
				// this.autoTimer = setInterval(this.autoMove.bind(this), this.autoplay);
				// this.autoTimer = setInterval(() => {
				// 	// THIS:用的也是外面的THIS，也就是实例
				// 	this.autoMove();
				// }, this.autoplay);

				this.autoTimer = setInterval(this.autoMove.bind(this), this.autoplay);
				let _this = this;
				this.container.onmouseenter = function () {
					// THIS:容器本身  CONTAINER
					// _THIS外面创建的变量存储的是实例
					clearInterval(_this.autoTimer);
				};
				this.container.onmouseleave = () => {
					// 箭头函数中的THIS是上下文中的，也就是实例
					this.autoTimer = setInterval(this.autoMove.bind(this), this.autoplay);
				};
			}

			// 控制焦点切换
			if (toType(this.pagination) === "object" && this.pagination.clickable === true && this.paginationList) {
				_each(this.paginationList, (item, index) => {
					item.onclick = () => {
						if ((index === this.activeIndex) || (index === 0 && this.activeIndex === this.slides.length - 1)) return;
						this.activeIndex = index;
						this.wrapper.style.transitionDuration = `${this.speed}ms`;
						this.wrapper.style.left = `${-this.activeIndex*this.changeWidth}px`;
						this.autoFocus();
					};
				});
			}

			// 控制左右按钮切换
			if (this.arrowNext) {
				this.arrowNext.onclick = this.autoMove.bind(this);
			}
			if (this.arrowPrev) {
				this.arrowPrev.onclick = () => {
					if (this.activeIndex === 0) {
						this.activeIndex = this.slides.length - 1;
						this.wrapper.style.transitionDuration = `0ms`;
						this.wrapper.style.left = `${-this.activeIndex*this.changeWidth}px`;
						this.wrapper.offsetWidth;
					}
					this.activeIndex--;
					this.wrapper.style.transitionDuration = `${this.speed}ms`;
					this.wrapper.style.left = `${-this.activeIndex*this.changeWidth}px`;
					this.autoFocus();
				};
			}
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
		autoMove() {
			let {
				activeIndex,
				slides,
				wrapper,
				speed,
				changeWidth
			} = this;
			if (activeIndex === slides.length - 1) {
				// 累加之前已经是最后一张了，此时我们应该让其立即运动到第一张，再继续累加切换到第二张才可以
				activeIndex = 0; //=>这只是把变量值修改了，但是实例上的activeIndex还没有被更改，你也需要把它更改才可以
				this.activeIndex = activeIndex;

				wrapper.style.transitionDuration = '0ms';
				wrapper.style.left = `0px`;
				wrapper.offsetWidth;
			}
			activeIndex++;
			this.activeIndex = activeIndex;
			wrapper.style.transitionDuration = speed + 'ms';
			wrapper.style.left = `${-activeIndex*changeWidth}px`;
			this.autoFocus();
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