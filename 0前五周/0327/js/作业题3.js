/*
 * 实现内置NEW的操作 
 */
function Dog(name) {
	this.name = name;
}
Dog.prototype.bark = function () {
	console.log('wangwang');
}
Dog.prototype.sayName = function () {
	console.log('my name is ' + this.name);
}
/*
 * _new：模拟内置NEW的操作，可以创建某个类的实例
 *   @params
 *      Fn:想创建哪个类的实例，就把哪个类传递进来
 *      后续参数不固定个数，都是给当前类执行时候传递的值
 *   @return
 *      Fn这个类的一个实例 
 */
function _new(Fn) {
	// 处理传递的实参信息：把除传递给Fn的值以外的其它值都获取到
	let args = Array.from(arguments).slice(1);
	// 创建实例对象OBJ（obj.__proto__===Fn.prototype）
	let obj = Object.create(Fn.prototype);
	// 执行Fn函数（普通函数）的时候，需要让Fn中的THIS指向实例对象OBJ
	let result = Fn.apply(obj, args);
	// 把创建的实例对象返回（前提是Fn执行返回的不是对象等引用值）
	if (result !== null && (typeof result === "object" || typeof result === "function")) {
		return result;
	}
	return obj;
}
let sanmao = _new(Dog, '三毛', 100, 200, 300);
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true

// sanmao = new Dog('三毛');
// 首先要把Dog当做普通函数执行（私有上下文、形参赋值、作用域链、变量提升、代码执行...）
// 特殊1：创建一个对象（而这个对象是当前类的一个实例  对象.__proto__===类.prototype）
// 特殊2：并且让函数中的THIS指向创建的这个对象
// 特殊3：在函数没有返回结果或者返回基本数据值的情况，把创建的实例对象返回


/* let obj = {};
obj.__proto__ = Fn.prototype; //=>IE中不允许我们这样玩__proto__ */

/*
// =>Object.create 
let xxx = {name:'珠峰'};
let obj = Object.create(xxx);
创建一个空对象，把xxx做为空对象的原型（也就是让obj.__proto__===xxx）
 */