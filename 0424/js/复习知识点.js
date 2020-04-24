/* JS中类的概念 */
/* class Modal {
	// 构造函数：this.xxx=xxx 都是给实例设置的私有的属性
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	// 这样写也是给实例设置私有的属性
	// z = 10;  //=>this.z=10

	// 直接写方法就是扩展到原型上的
	getX() {
		console.log(this.x);
	}
	getY() {
		console.log(this.y);
	}

	// 把类作为对象设置私有的属性方法
	static n = 200;
	static setNumber(n) {
		this.n = n;
	}
}
Modal.prototype.z = 10;

let m = new Modal(10, 20);
let n = new Modal(30, 40); */

/* 回调函数 */
// 把一个函数当做值传递给另外一个函数，在另外一个函数中把这个函数执行 “回调函数”
// 1.数组的迭代等方法
/* let arr = [10, 20];
arr.forEach(item => {});
("12345ddd67890").replace(/\d+/g, () => {});
setTimeout(() => {}, 1000);
$.ajax({
	url:'',
	success:function(){
		// 请求成功会把传递的函数执行
	}
});
window.addEventListener('scroll',function(){}); */

// callback：约定俗成的回调函数形参名字
/* function func(callback) {
	// callback => anonymous
	// 在FUNC函数执行的过程中，我们可以“尽情”的操作这个回调函数
	// 1.可以把它执行（执行零到多次）
	// 2.还可以给回调函数传递实参
	// 3.还可以改变里面的THIS
	// 4.还可以接受函数执行的返回结果
	for (let i = 0; i < 5; i++) {
		// callback(i); //=>分别把每一次循环的I的值当做实参传递给anonymous，所以anonymous总计被执行了5次，每一次执行都可以基于形参index获取到传递的i的值
		let res = callback.call(document, i);
		// res是每一次anonymous执行返回的结果
		if (res === false) {
			// 接受回调函数返回的结果，控制循环结束
			break;
		}
	}
}
func(function anonymous(index) {
	// console.log(index, this);
	if (index >= 3) {
		return false;
	}
	return '@' + index;
});

// func((index) => {
// 	// 箭头函数中没有THIS，用的THIS都是上下文中的
// 	console.log(index, this);
// }); */


// 在JQ中有个方法 $.each([ARRAY/OBJECT/类数组],[CALLBACK])
// 自己封装一个EACH，我们让自己封装的方法比JQ的EACH还强大
// _EACH([VALUE],[CALLBACK],[CONTEXT])
// 1.可以遍历数组、类数组、对象，每一次遍历都可以把[CALLBACK]执行
// 2.每一次执行回调函数，都会把当前遍历的结果（当前项\索引）传递给回调函数
// 3.支持第三个参数，用来改变回调函数中的THIS指向(不传递，默认是WINDOW)
// 4.支持回调函数返回值，每一次返回的值会把当前集合中的这一项的值替换掉；如果回调函数返回的是FALSE（一定是FALSE），则结束遍历；

/*
 * _each封装一个强大的迭代器 
 *   @params
 *      obj:要迭代的数组、类数组、对象
 *      callback:每一次迭代触发执行的回调函数
 *      context:要改变的回调函数的THIS
 *   @return 
 *      返回处理后的新数组/对象
 */
// 检测是否为数组或者类数组
function isArrayLike(obj) {
	let length = !!obj && ("length" in obj) && obj.length;
	return Array.isArray(obj) || length === 0 || (typeof length === "number" && length > 0 && (length - 1) in obj);
}

function _each(obj, callback, context = window) {
	// 参数合法性校验
	if (obj == null) {
		//=>null undefined  
		// 手动抛出异常信息，一但抛出，控制台会报错，下面代码不在执行 Error/TypeError/ReferenceError/SyntaxError...
		throw new TypeError('OBJ必须是一个对象/数组/类数组!');
	}
	if (typeof obj !== "object") {
		throw new TypeError('OBJ必须是一个对象/数组/类数组!');
	}
	if (typeof callback !== "function") {
		throw new TypeError('CALLBACK必须是一个函数!');
	}

	// 开始循环（数组和类数组基于FOR循环，对象循环是基于FOR IN）
	if (isArrayLike(obj)) {
		// 数组或者类数组
		for (let i = 0; i < obj.length; i++) {
			// 每一次遍历都执行回调函数，传递实参：当前遍历这一项和对应索引
			// 而且改变其THIS
			// RES就是回调函数的返回值
			let res = callback.call(context, obj[i], i);
			if (res === false) {
				// 返回FALSE结束循环
				break;
			}
			if (res !== undefined) {
				// 有返回值，则把当前数组中的这一项替换掉
				obj[i] = res;
			}
		}
	} else {
		// 对象
		for (let key in obj) {
			if (!obj.hasOwnProperty(key)) break;
			let res = callback.call(context, obj[key], key);
			if (res === false) break;
			if (res !== undefined) obj[key] = res;
		}
	}
	return obj;
}

/* _each([10, 20, 30, 40], function anonymous(item, index) {
	// item:当前遍历的这一项
	// index:当前这一项的索引
});
 */
let arr = [10, 20, 30, 40];
let boxs = document.getElementsByTagName('*');
let oo = [];
let obj = {
	xxx: 'xxx',
	age: 10
};

// _each(obj, item => {
// 	console.log(item);
// });

// _each(boxs, function (item) {
// 	if (item.tagName === 'SCRIPT') {
// 		// this => oo
// 		this.push(item);
// 	}
// }, oo);
// console.log(oo);

// _each(arr, (item, index) => {
// 	console.log(item, index);
// });

// arr = _each(arr, (item, index) => {
// 	return item * 10;
// });
// console.log(arr);

// _each(arr, (item, index) => {
// 	// 遇到大于20的就结束迭代
// 	if (item > 20) {
// 		return false;
// 	}
// 	console.log(item);
// });