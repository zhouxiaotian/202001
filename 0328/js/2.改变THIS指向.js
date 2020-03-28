/*
 * 在Function.prototype上有三个方法（所有的函数都可以调用）：
 *   call
 *   apply
 *   bind
 * 这三个方法都是用来改变函数执行时候，方法中的THIS指向问题 
 */

/*
 * 改变函数中的THIS指向 
 *   @params
 *      func：当前要执行的方法
 * 		context：要改变的THIS指向（需要是一个对象，如果不是对象，可以把它变为对象）
 *      剩余的参数都是未来执行func函数的时候，传递给函数的参数
 *   @return 
 * 		--
 * 实现原理：让func和context之间建立关联（func是context的一个属性的属性值）
 */
/* function changeThis(func, context) {
	// 获取未来打算传递给FUNC函数的实参信息
	let args = Array.from(arguments).slice(2); //=>[10,20]
	// 生成唯一的属性名（为了防止关联的时候，我们设置属性把原有对象中的属性值给覆盖掉）
	let uniqueKey = `$$${new Date().getTime()}`;
	// 让CONTEXT和FUNC关联在一起
	context[uniqueKey] = func;
	// 让函数执行（该传参传参）：利用ES6中的展开运算符，把数组中的每一项展开，分别作为实参传递给函数 func(...[10,20,30]) <=> func(10,20,30)
	context[uniqueKey](...args);
	// 应用完之后，最好把设置的属性给干掉
	delete context[uniqueKey];
} */


/* function changeThis(func, context, ...args) {
	let uniqueKey = `$$${new Date().getTime()}`;
	context[uniqueKey] = func;
	let result = context[uniqueKey](...args);
	delete context[uniqueKey];
	return result; //=>执行changeThis的时候，我们想办法把func执行了（改变this传递参数... =>context[uniqueKey](...args) ），此时们接收func执行的返回结果，最后changeThis执行完，我们把得到的结果再返回，这样每一次调取changeThis都可以获取要执行函数的返回值了
} */

// 每一个函数都可以调取这个方法了
Function.prototype.changeThis = function changeThis(context, ...args) {
	// THIS:当前要执行并且改变THIS指向的函数
	// CONTEXT特殊情况的处理：不传递是window，传递null/undefined也让其是window，传递非对象或者函数类型值，我们需要让其变为对象或者函数
	/* if (context == null) { //=>context是null或者undefined
		context = window;
	} */
	context == null ? context = window : null;
	if (typeof context !== "object" && typeof context !== "function") {
		context = new context.constructor(context);
	}
	let uniqueKey = `$$${new Date().getTime()}`;
	context[uniqueKey] = this;
	let result = context[uniqueKey](...args);
	delete context[uniqueKey];
	return result;
};

let func = function (x, y) {
	console.log(this);
	return x + y;
};
window.name = "HELLO~";
let obj = {
	name: '珠峰培训'
};

// let result = changeThis(func, obj, 10, 20);
// ==想让函数直接调取这个方法执行，而不是执行方法，把函数传递进去
// let result = func.changeThis(obj, 10, 20);
// let result = func.changeThis();
// let result = func.changeThis(null/undefined);
let result = func.changeThis(10, 20); //=>方法执行，方法中的THIS是10，给方法传递了20（第一个参数是我们要改变的THIS指向问题）


/* 
function changeThis(func, context, ...args) {
    ...args ES6剩余运算符
   把除了 func, context 以外剩下传递的参数都存储到args这个数组中，实现了 let args = Array.from(arguments).slice(2);  要完成的功能 
}

function changeThis(context=window, ...args) {
	context = window：ES6中给形参设置默认值，也就是如果不给context传递值，那么context的默认值是window
	等价于
	context=context||window;
}
*/

// new Date() 获取当前本机时间  [日期格式对象] Sat Mar 28 2020 14:45:38 GMT+0800 (中国标准时间)
// new Date().getTime() 获取当前时间距离1970-01-01 00:00:00时间的毫秒差（时间戳）

/*
// func(10, 20); //=>this:window  'HELLO~' 30
// obj.func(10, 20); //=>Uncaught TypeError: obj.func is not a function

// ===让func执行，需要让方法中的this变为obj（func和obj本身还没啥关连）？
// 实现思路：让func和obj关联在一起
// 1.给obj设置一个属性$func，让其属性值是函数func
// 2.obj.$func() 相当于把func执行了，此时方法中的this就是obj
// 3.这种操作方式会存在一些安全隐患：如果原有obj对象中就有$func的属性，我们设置的这个属性会覆盖原有的属性值[真实操作中，我们尽可能保证这个属性名的唯一性]；我们设置的属性，在用完后，还要把它移除掉，因为人家对象原本是没有这个属性的；
// obj.$func = func;
// obj.$func(10, 20); //=>this:obj  '珠峰培训' 30
// delete obj.$func;
// console.log(obj);
*/

/*
创建数据值有两种方式：
1. 字面量方式 
let n=10;
let x={};
2. 构造函数方式
let m=new Number(10);
let y=new Object();

=>引用数据类型值的两种方式并没有啥特别的区别，除了一点语法上的细节点，其余都是一样的（都是创建类的实例，结果也都是对象数据类型值）
=>但是基本数据类型不行，两种方式还是有区别的，虽然都是创建类的实例，但是字面量方式得到的是基本数据类型值（原始值），而构造函数方式获取的才是对象类型值；所以不能说实例都是对象，基本数据类型值就要除外
*/