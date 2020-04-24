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
		obj = _cloneDeep(obj);
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
		}
	}
	
	function bannerPlugin(container, options = {}) {
		let defaultParams = {
			initialSlide: 0,
			autoplay: 3000,
			speed: 300,
			pagination: {
				el: '.pagination',
				clickable: true
			},
			navigation: {
				nextEl: '.changeRight',
				prevEl: '.changeLeft'
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