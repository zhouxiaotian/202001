let class2type = {};
let toString = class2type.toString;
"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(item => {
	class2type["[object " + item + "]"] = item.toLowerCase();
});

function toType(obj) {
	if (obj == null) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[toString.call(obj)] || "object" :
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
	if (isFunction(obj) || isWindow(obj)) {
		return false;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && (length - 1) in obj;
}

function _each(obj, callback, context = window) {
	obj = _cloneDeep(obj);
	if (obj == null) {
		throw new TypeError('OBJ必须是一个对象/数组/类数组!');
	}
	if (typeof obj !== "object") {
		throw new TypeError('OBJ必须是一个对象/数组/类数组!');
	}
	if (typeof callback !== "function") {
		throw new TypeError('CALLBACK必须是一个函数!');
	}

	if (isArrayLike(obj)) {
		for (let i = 0; i < obj.length; i++) {
			let res = callback.call(context, obj[i], i);
			if (res === false) {
				break;
			}
			if (res !== undefined) {
				obj[i] = res;
			}
		}
	} else {
		for (let key in obj) {
			if (!obj.hasOwnProperty(key)) break;
			let res = callback.call(context, obj[key], key);
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
		if (toType(v1) === "object" && toType(v2) === "object") {
			obj[key] = _assignDeep(v1, v2);
			continue;
		}
		obj[key] = v2;
	}
	return obj;
}

//======================================
/* 关于封装一个方法，我们需要传递很多参数的处理 */
// 1.设置为形参，一个个的传递
// ->传递实参的顺序必须和形参设置顺序保持一致
// ->不好给形参设置默认值
// ->中间的一些项如果不传递，会把后面传递的项错位
//一般这种情况只应用于参数特别的少的情况下（一般不超过两个）
/* function bannerPlugin(container, initialSlide = 0, autoplay) {

}
bannerPlugin(box, 0, 3000);
bannerPlugin(box, 3000); */

// 2.对于传递多个参数的情况下，我们一般基于对象键值对的方式处理
// ->我可以传递，也可以不传递
// ->传递的顺序也随意，因为都是基于属性名标记好的，只要属性和值对应，顺序是无所谓的
// ->方便扩展
// ->不传递的信息我们给其设置默认值





class Banner {
	constructor(container, options) {
		// 把传递进来的信息都挂载到当前类的实例上
		// 1.信息都作为他的私有属性（这样每一个实例之间互不影响）
		// 2.挂载到实例上，以后在当前类的其它方法中，只要保证THIS是实例，都可以基于THIS.XXX获取和操作
		this.container = container;
		_each(options, (item, key) => {
			this[key] = item;
		});
		this.activeIndex = this.initialSlide;
	}
	// 设置一些公共的方法
}

function bannerPlugin(container, options = {}) {
	// 参数初始化：用我们自己配置项的值替换默认配置信息
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

	// container处理
	if (typeof container === "string") {
		// 基于传递的选择器获取需要操作的元素
		container = document.querySelector(container);
	}
	if (!container || container.nodeType !== 1) {
		throw new TypeError('CONTAINER必须是DOM元素节点!');
	}

	// 实现轮播图效果
	return new Banner(container, options);
}