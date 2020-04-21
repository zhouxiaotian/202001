/*
 * ||：逻辑或
 * &&：逻辑与 
 * 
 * 1.在条件判断中分别代表 或者 和 并且
 * 2.在JS表达式中出现，可以根据对应的值，运算出相应的结果
 *   X = A || B;  首先看A的值是真还是假（转换为布尔），如果A是真，X等于A的值，反之如果A是假，X等于B的值（不论B是真还是假）
 *   X = A && B;  首先看A的值是真还是假，如果A是真，X等于B的值，反之如果A是假，X等于A的值（和逻辑或是相反的）
 *   运算中同时出现，逻辑或者逻辑与，逻辑与的优先级高于逻辑或   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 */

/* if (1 === 1 || 2 > 2) {
	// 条件是成立的：只要多个中有一个条件成立，整体就为真
}
if (1 === 1 && 2 > 2) {
	// 条件是失败的：并且 是要求所有的条件都成立，整体才成立
} */

/* let x = 0 || 10;
console.log(x); //=>10
x = undefined || null;
console.log(x); //=>null
x = 10 || true;
console.log(x); //=>10

x = 0 && 10;
console.log(x); //=>0
x = undefined && null;
console.log(x); //=>undefined
x = 10 && true;
console.log(x); //=>true */

// let x = 1 || 2 && 3 || 4 && 0 || 5;
// //  2 && 3 => 3    4 && 0 => 0   =>1 || 3 || 0 || 5
// //  1 || 3 => 1    1 || 0 => 1   =>1 || 5 => 1
// console.log(x);

/*
 * 真实的应用场景
 *   1.逻辑或一般用于赋值默认值
 *   2.逻辑与一般应用于函数执行判断中 
 */
// function sum(x, y) {
// 	// 定义形参，执行不传递实参，默认值是undefined
// 	// 需求：如果不传递实参，我想让其默认值是0
// 	/* if (typeof x === "undefined") {
// 		x = 0;
// 	}
// 	if (typeof y === "undefined") {
// 		y = 0;
// 	} */
// 	x = x || 0; //=>这样也可以，因为不传递值，默认值undefined，左侧为假，返回的还是右侧的值，只不过不严谨，因为传递的是false/NaN/""/null等也为假，此时也让他等于零
// 	y = y || 0;
// 	return x + y;
// }
// sum();

// let obj = {
// 	name: '珠峰'
// };
// let age = obj.age || 25; //=>意思想表达为：如果OBJ中没有AGE属性（获取的值是UNDEFINED），我们为其赋值25的默认值（也是不严谨）

/* function func(callback) {
	// callback：回调函数，要求用户执行func的时候，应该给我们传递一个函数，或者不传递任何的东西  callback=undefined/函数
	/!* if (typeof callback === "function") {
		callback();
	} *!/
	callback && callback(); //=>也是不严谨，如果用户传递其它的非函数值，也能代表真，但是也不能当函数执行，例如：传递100
}
func();
func(function () {

}); */