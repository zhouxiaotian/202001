var class2type = {};
var toString = class2type.toString; //=>Object.prototype.toString 检测数据类型
var hasOwn = class2type.hasOwnProperty; //=>Object.prototype.hasOwnProperty
var fnToString = hasOwn.toString; //=>Function.prototype.toString 转换字符串
var ObjectFunctionString = fnToString.call(Object); //=>"function Object() { [native code] }" 把内置类Object转换为字符串

//=================================
let arr = "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "); //=>["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol"]
arr.forEach(item => {
	class2type["[object " + item + "]"] = item.toLowerCase();
});
/*
console.log(class2type);
{
	[object Boolean]: "boolean", 
	[object Number]: "number", 
	[object String]: "string"
	......
}
 */

//=============================
function toType(obj) {
	//传递给我的是null/undefined，直接返回 "null"/"undefined"
	if (obj == null) {
		return obj + "";
	}
	// typeof obj === "object" || typeof obj === "function" =>引用数据类型
	//   => 如果是基本数据类型值，检测数据类型使用typeof就很“香”
	//   => 如果是引用数据类型值，则基于toString这一套来搞定
	//         => toString.call(obj)  检测当前值的数据类型 "[object Xxx]"
	//         => class2type["[object Xxx]"] 当上一步生成的对象中，基于对应的属性名，找到属性值（所属的数据类型），如果没有则返回 "object"
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[toString.call(obj)] || "object" :
		typeof obj;
}

//=====================
var isFunction = function isFunction(obj) {
	// Support: Chrome <=57, Firefox <=52
	// In some browsers, typeof returns "function" for HTML <object> elements
	// (i.e., `typeof document.createElement( "object" ) === "function"`).
	// We don't want to classify *any* DOM node as a function.
	return typeof obj === "function" && typeof obj.nodeType !== "number";
};

var isWindow = function isWindow(obj) {
	//=>window.window===window   window对象的特点
	return obj != null && obj === obj.window;
};

function isArrayLike(obj) {
	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE

	//=>length获取的结果 length属性值/false
	//=>type获取数据类型
	var length = !!obj && "length" in obj && obj.length,
		type = toType(obj);

	//=>排除函数和window
	if (isFunction(obj) || isWindow(obj)) {
		return false;
	}

	/*
	 * 数组和类数组的一种情况
	 *  typeof length === "number"  当前对象有length属性，并且属性值是一个数字
	 *  length > 0 并且长度大于零
	 *  (length - 1) in obj  最后一个索引在当前对象中
	 * 
	 * 其它情况
	 *   type === "array"  数组
	 *   或者
	 *   length === 0  空集合
	 */
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && (length - 1) in obj;
}