/*
 * ES3定义变量
 *   + var
 *   + function
 * 
 * ES6定义变量
 *   + let 
 *   + const
 *   + class
 *   + import 导入模块
 *  
 * ES6语法相对于ES3来说，最大的特点就是让JS变的更加严谨，告别JS松散的特点
 */

/* VAR存在变量提升  而LET不存在
console.log(n); //=>undefined
var n = 10;
console.log(n); //=>10

console.log(n); //=>Uncaught ReferenceError: Cannot access 'n' before initialization  LET不存在变量提升，所以变量只能在声明定义后使用
let n = 10;
console.log(n); //=>10 
*/

/* LET是不允许重复声明的：在当前上下文中，不管用什么方式，只要声明了这个变量，都不能在基于LET重复声明了（而VAR允许重复声明，浏览器本身只识别一次，但是不会报错）
var n = 12;
var n = 13;
console.log(n); //=>13

let n = 12;
let n = 13;
console.log(n); //=>Uncaught SyntaxError: Identifier 'n' has already been declared

var n = 12;
let n = 13; //=>Uncaught SyntaxError: Identifier 'n' has already been declared

//=>是否重新声明，并不是在代码执行阶段检测的，而是在词法解析阶段检测的（词法解析阶段类似于变量提升，在代码还没有执行之前，就发生了，一旦发现有词法错误 SyntaxError ，当前代码都不会再执行了）
console.log('OK');
var n = 12;
let n = 13; //=>报错 但是OK都没有被执行
 */


/* 在全局上下文中，用VAR声明的变量即是全局变量，也相当于给GO(window)设置了一个属性，而且两者建立映射机制；但是用LET声明的变量仅仅是全局变量，和GO没啥关系；
var n = 10;
console.log(window.n); //=>10

let n = 10;
console.log(window.n); //=>undefined
 */


/* 
 * 浏览器有一个BUG（暂时性死区）：基于typeof检测一个没有被声明过的变量，并不会报错，结果是"undefined"；但是从正确角度来讲应该报错才是正常的！

console.log(typeof n); //=>"undefined"

//=>如果这个变量在后面会用LET声明，则前面再基于typeof检测就会报错：不能在声明之前使用
console.log(typeof n); //=>Uncaught ReferenceError: Cannot access 'n' before initialization
let n = 10;
 */

/*
 在整个JS中，目前为止我们接触的上下文（作用域）只有两种
	+ 全局上下文 EC(G)
	+ 函数执行形成的私有上下文 EC(XX)
 此时循环体或者判断体等，都不会单独形成私有的上下文，里面的变量都是所在上下文中的变量

if (1 === 1) {
	var n = 10;
	console.log(n); //=>10
}
console.log(n); //=>10

for (var i = 0; i < 5; i++) {}
console.log(i); //=>5

------------------------------------
 但是在ES6中，提供了一个新的上下文（作用域）形式：块级作用域
	+ 除对象/函数等大括号以外，如果在其余的大括号中（例如：判断和循环）出现 LET/CONST 等，则会把当前大括号包起来的部分形成一个独立的私有上下文，基于 LET/CONST创建的变量是当前块级作用域域中的私有变量

if (1 === 1) {
	var n = 10; //=>n是全局变量
	let m = 20; //=>m是当前大括号包起来的 私有的 块级作用域中的 私有变量
	console.log(m); //=>20
}
console.log(n); //=>10
console.log(m); //=>Uncaught ReferenceError: m is not defined


// 类似于形成两个闭包（这里叫做私有的块级作用域）
{
	let x = 10,
		y = 20;
	console.log(x, y);
}
{
	let x = 100,
		y = 200;
	console.log(x, y);
}


for (let i = 0; i < 3; i++) {
	console.log(i); //=>0 1 2
}
console.log(i); //=>Uncaught ReferenceError: i is not defined
 */



/* 
 * LET 和 CONST 的区别：
 *    CONST声明的变量，不能重新指向新的值（不能修改指针的指向）
 */
// let n = 10;
// n = 20;
// console.log(n); //=>20

// const n = 10;
// n = 20; //=>Uncaught TypeError: Assignment to constant variable.
// console.log(n);

// 面试题：用const定义的变量值，永远不能被修改了？
/* const obj = {
	name: '珠峰'
};
// obj = [10, 20]; //=>Uncaught TypeError: Assignment to constant variable. 它不能更改指的是：obj这个变量不能在和其它值进行关联了，也就是不能修改const声明变量的指向
obj.name = '哈哈'; //=>但是可以在不改变指向的情况下，修改堆内存中的信息（这样也是把值更改了），所以记住：const声明的变量，不能修改它的指针指向，但是可以改变其存储值的
console.log(obj); */