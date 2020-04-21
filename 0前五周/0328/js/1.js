/*
 * 类(函数)即是函数数据类型（主类型），也是对象数据类型（辅助类型）
 *    [函数类型]
 *        + 普通函数（EC/AO/SCOPE/SCOPE-CHAIN...）
 *        + 构造函数（类/实例/原型/原型链...）
 *    [对象类型]
 *        + 普通对象（和一个OBJ没啥区别，就是用来存储键值对的）
 *        + __proto__：所有的函数都是Function内置类的实例，所以函数的__proto__指向Function.prototype
 */
/* 
function Fn() {
	this.x = 10;
	this.y = 20;
}
// 当做普通对象设置的私有属性方法，只能 Fn.xxx 调用
Fn.n = 1000;
Fn.say = function () {
	console.log('hello world！');
};
// 当做类，在原型上设置的属性方法，供实例调取的：实例.xxx 或者 Fn.prototype.xxx
Fn.prototype.sum = function () {
	return this.x + this.y;
};
let f1 = new Fn;
// f1.say(); //Uncaught TypeError: f1.say is not a function   say是Fn当做普通对象私有的属性方法，实例f1找的是Fn.prototype上的属性方法 （函数的角色之间是没有啥必然联系的）
Fn.say();
// Fn.sum(); //Uncaught TypeError: Fn.sum is not a function sum是它原型上的方法，实例可以调用，或者Fn.prototype.sum这样调用，但是Fn这个对象本身无法调用 
*/

function Foo() {
	getName = function () {
		console.log(1);
	};
	// this.xxx = xxx 才是给实例设置的私有属性方法
	return this;
}
Foo.getName = function () {
	console.log(2);
};
Foo.prototype.getName = function () {
	console.log(3);
};
var getName = function () {
	console.log(4);
};
function getName() {
	console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();