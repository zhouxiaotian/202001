/*
 * 函数每一次执行都是形成全新的上下文，和之前形成的上下文没有必然关系 
 */
/* var i = 20;
function fn() {
    i -= 2;
    var i = 10;
    return function (n) {
        console.log((++i) - n);
    }
}
var f = fn();
f(1);
f(2);
fn()(3);
fn()(4);
f(5);
console.log(i); */

/* 
var n = 0;
function a() {
	var n = 10;
	function b() {
		n++;
		console.log(n);
	}
	b();
	return b;
}
var c = a();
c();
console.log(n); */

/* let x = 5;
function fn(x) {
	// 私有上下文中有私有变量x
    return function(y) {
		// 这里的x都是EC(FN)中的x
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x); */

/* let x = 5;
function fn() {
	// 私有上下文中没有x
    return function(y) {
		// 这里的是x是EC(G)中的x
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x); */

/* let a = 0,
	b = 0;

function A(a) {
	A = function (b) {
		alert(a + b++);
	}; //=>第一执行A的时候，把全局A函数重新赋值为里面的新的小函数，后期在执行A，执行的是赋值后的小函数 （此处小函数是私有上下文中的，但是此时也相当于被外面的A占用了，所以上下文不会销毁掉的）
	alert(a++);
}
A(1);

A(2); */


/* 
 * EC(G)全局向下文
 *    var test;
 */
// test = 自执行函数执行的返回结果赋值给test
//      = BBBFFF000; （返回的小函数）
var test = (function (i) {
	/*
	 * 自执行函数执行 EC(AN)  =>不会释放
	 *    i = 2 （4）
	 * 作用域链：<EC(AN)，EC(G)>
	 * 形参赋值
	 * 变量提升
	 */
	return function () {
		/*
		 * 私有上下文 EC(TEST)
		 * 
		 * 作用域链：<EC(TEST)，EC(AN)>
		 * 初始化ARGUMENTS = { 0:5,length:1 }
		 * 形参赋值
		 * 变量提升
		 */
		alert(i *= 2); //=>i=i*2   i是上级上下文EC(AN)中的i
	}; //=>return BBBFFF000;
})(2);
test(5);