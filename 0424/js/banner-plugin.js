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