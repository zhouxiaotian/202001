/* let func = function (x, y) {
	this.sum = x + y;
};
window.name = "HELLO~";
let obj = {
	name: '珠峰培训'
};
 */
/*
 * CALL方法：让函数执行，改变函数中THIS指向的 
 * APPLY方法：和CALL方法的作用一样，唯一的区别就是传递给函数的参数方式不一样
 *   + CALL方法是把实参信息一个个的传递进来  fn.call(context,params1,params2...)
 *   + APPLY传参方式是传递一个数组进来，但是也相当于再给函数一项项的传参，语法上需要写成数组而已 fn.apply(context,[params1,params2...])
 * 
 * CALL的性能要比APPLY好一些，尤其是需要传递给函数的实参超过三个的时候，所以真实项目中使用CALL偏多；但是某些需求基于APPLY可以实现更好的效果；
 */
/* func.call(obj, 10, 20);
func.apply(obj, [10, 20]); */

/*
 * 需求：获取当前数组中的最大值和最小值 
 */
/* let arr = [10, 20, 14, 8, 25, 13, 16, 10],
	max = 0,
	min = 0;
max = Math.max(...arr);
min = Math.min(...arr);
console.log(max, min);
 */

// 陈磊方案：排序
/* 
arr.sort((a, b) => a - b);
max = arr[arr.length - 1];
min = arr[0];
*/

// 张藜潆/张硕：基于Math.max/Math.min获取最大值和最小值
/* max = Math.max(arr);
console.log(max); //=>NaN  Math.max本身是获取一堆数中的最大值,需要把数字一个个的传递给这个方法，例如：Math.max(10, 20, 14,...) 而不能传递一个数组 Math.max([10, 20,...]) 

// 基于ES6展开运算符，把数组中每一项依次展开传递给方法
// max = Math.max(...arr);
// min = Math.min(...arr);

// 利用APPLY虽然在语法上是写成一个数组，但是和CALL一样，也是把数组中的每一项传递给函数（Math.max这些方法执行的时候和THIS没关系，所以THIS改成啥都行）
max = Math.max.apply(null, arr);
min = Math.min.apply(null, arr);
*/

// 时益众：假设数组中的第一项就是最大值或者最小值，然后拿这个值分别后后面的每一项进行比较，一旦发现比他大的，说明假设失败，让当前最大值替换原有假设的值即可
/*
max = min = arr[0];
for (let i = 1; i < arr.length; i++) {
	let item = arr[i];
	item > max ? max = item : null;
	item < min ? min = item : null;
}
*/

//=================================
// 把类数组变为数组
/* 
 * 函数实参集合ARGUMRNTS（类数组集合）
 * =>不是数组是一个对象  arguments.__proto__:Object.prototype
 * {
 *   0:10,
 *   1:20,
 *   2:30,
 *   length:3,
 *   __proto__:Object.prototype
 * }
 * arguments.length传递实参个数
 * arguments[0]获取第一个传递的实参信息
 */
function func() {
	// 方案1：基于内置方法Array.from
	// console.log(Array.from(arguments));

	// 方法2：直接...展开即可（把ARGUMRNTS中每一项都放置到一个新数组中）
	// let arr = [...arguments];

	// 方法3：基于Array执行直接创建数组（把ARGUMRNTS中的每一项分别传递会ARRAY）
	// console.log(Array.apply(null, arguments));

	// 方法4：自己搞一个循环
	/* 
	let arr = [];
	for (let i = 0; i < arguments.length; i++) {
		arr.push(arguments[i]);
	}
	*/

	// 方法5：借用数组原型上的SLICE方法，让SLICE方法执行的时候，方法中的THIS变为要操作的类数组ARGUMENTS，这样就等价于ARGUMENTS利用数组中指定方法的代码完成一些自己要操作的需求（ARGUMENTS和数组解构很相似，所以能操作数组的代码，一般也能操作ARGUMENTS这种类数组的）
	// 找到原型上的SLICE：
	// Array.prototype.slice
	// [].slice  => [].__proto__.slice
	// let arr = Array.prototype.slice.call(arguments, 0);
	// let arr = [].slice.call(arguments, 0);

	// 除了能借用SLICE，数组的大部分方法都可以借用过来使用的
	[].forEach.call(arguments, item => {
		console.log(item);
	});
}
func(10, 20, 30);


/* Array.prototype.slice = function slice() {
	// this:操作数组实例（要克隆的数组）
	// 模拟的内置SLICE代码
	let arr = [];
	for (let i = 0; i < this.length; i++) {
		arr.push(this[i]);
	}

	/!* 
	// 把arguments转换为数组的代码
	let arr = [];
	for (let i = 0; i < arguments.length; i++) {
		arr.push(arguments[i]);
	} 
	*!/

	// 如果我们能够把Array.prototype.slice方法执行，并且让方法中的THIS变为要操作的类数组（例如：ARGUMENTS），就相当于在遍历类数组中的每一项，把每一项内容存放到新的数组中，实现了把类数组转换为数组
	return arr;
}; */
/* 
let arr = [10, 20, 30];
// 数组克隆
let arr2 = arr.slice(); */