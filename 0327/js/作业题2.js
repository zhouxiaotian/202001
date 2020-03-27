/*
 * 在Number.prototype上扩展方法，这样所有的数字都可以调取这些方法了
 */
/* 
Number.prototype.plus = function plus(n) {
	// this:当前操作的这个数字
	return this + n;
};

Number.prototype.minus = function minus(n) {
	return this - n;
};

let n = 10;
let m = n.plus(10).minus(5); //=>为了能够调用链式写法，需要保证PLUS/MINUS方法执行完的返回结果依然是一个数字
console.log(m); //=>15 
*/


/* 
Array.prototype.unique = function unique() {
	// this:一般都是当前Array类的一个实例（我们要操作的数组）
	return Array.from(new Set(this));
};
let ary = [12, 23, 12, 13, 13, 12, 23, 14, 8];
ary = ary.unique().sort((a, b) => a - b);
console.log(ary); 
*/

String.prototype.getParams = function getParams(attr) {
	// 1.获取字符串中问号后面传参的值，以对象键值对的方式进行存储
	let askIndex = this.indexOf('?'),
		polIndex = this.indexOf('#'),
		askText = '',
		obj = {};
	if (askIndex > -1) {
		polIndex === -1 ? polIndex = this.length : null;
		askText = this.substring(askIndex + 1, polIndex);
	}
	askText = askText.split('&'); //=>["key1=val1", "key2=val2", "key3=val3"]
	askText.forEach(item => {
		item = item.split('='); //=>["key1", "val1"] ...
		obj[item[0]] = item[1];
	});
	// console.log(obj); //=>{key1: "val1", key2: "val2", key3: "val3"}
	// 2.根据传递的属性名到对象中找到对应的属性值（如果没有这个属性，不让其返回UNDEFINED，而是让其返回空字符串）
	return obj[attr] || "";
};
let url = "locallhost?key1=val1&key2=val2&key3=val3";
console.log(url.getParams("aaa"));