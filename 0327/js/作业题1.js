/* 
/!*
 * 利用了闭包的保存功能
 *   =>第一次函数执行，形成一个临时不销毁的私有上下文EC(FN)，里面x/y私有的变量也不销毁
 *   =>执行返回的小函数，在新行成的上下文EC(AN)中，遇到变量x/y不是自己私有的，找上级没有销毁的上下文EC(FN)中的x/y即可
 *!/
function fn(x, y) {
	return function (z) {
		return x + y + z;
	}
}
let res = fn(1, 2)(3); //=>先让FN执行，执行的返回结果再执行（返回结果一定是个函数），把返回的小函数执行，最后小函数返回的结果是把，这几次传递的实参依次相加
console.log(res); //=>6  1+2+3 
*/

/* 
function fn() {
	// 执行FN传递的进来的实参集合  Array.from()把类数组转换为数组
	let outerArg = Array.from(arguments);
	return function () {
		// 执行返回的小函数，传递进来的实参集合
		let innerArg = Array.from(arguments);
		outerArg = outerArg.concat(innerArg);
		// 把数组按照"+"变为每一项相加的字符串，再基于EVAL把字符串变为表达式执行
		return eval(outerArg.join('+'));
	}
}
let res = fn(1, 2)(3);
console.log(res); //=>6  1+2+3 
*/

//=>基于ES6中的箭头函数来优化
/* let fn = (x, y) => {
	return z => {
		return x + y + z;
	};
}; */
/* let fn = (x, y) => (z) => x + y + z;
let res = fn(1, 2)(3);
console.log(res); //=>6 */

//============================================
/* var x = 2;
var y = {
	x: 3,
	// 在创建对象堆，给z属性赋值的时候，就要把自执行函数执行了，把其返回结果赋值给属性z
	// 自执行函数（JS代码自上而下执行到某处）：
	//  1.创建一个函数（堆内存存储代码字符串）
	//  2.立即把创建的函数执行
	z: (function (x) {
		this.x *= x;
		x += 2;
		return function (n) {
			this.x *= n;
			x += 3;
			console.log(x);
		}
	})(x)
};
var m = y.z;
m(4);
y.z(5);
console.log(x, y.x); */

//============================================
/* function Fn(n, m) {
	n = n || 0;
	m = m || 0;
	this.x = n;
	this.y = m;
	this.getX = function () {
		console.log(this.x);
	}
	return n + m;  
}
Fn.prototype.sum = function () {
	console.log(this.x + this.y);
}
Fn.prototype = {
	getX: function () {
		this.x += 1;
		console.log(this.x);
	},
	getY: function () {
		this.y -= 1;
		console.log(this.y);
	}
};
let f1 = new Fn(10, 20);
let f2 = new Fn;
console.log(f1.getX === f2.getX); //=>false  都是私有的
console.log(f1.getY === f2.getY); //=>true  都是公有的
console.log(f1.__proto__.getY === Fn.prototype.getY); //=>true 都是找原型上的方法（值得注意的是：在IE浏览器中是不允许我们直接操作 __proto__）
console.log(Fn.prototype.getX === f2.getX); //=>false  原型上的 VS 私有的
console.log(f1.constructor); //=>Object
f1.getX();
// 执行的是私有的getX；方法中的this:f1；console.log(this.x) => f1.x => 10
Fn.prototype.getX();
// 执行的是公有的getX；方法中的this:Fn.prototype；
// this.x += 1    Fn.prototype.x=Fn.prototype.x+1=undefined+1=NaN
// console.log(this.x); => Fn.prototype.x => NaN
f2.getY();
// 执行的是公有的getY；方法中的this:f2；
// this.y -= 1;   f2.y=f2.y-1=0-1=-1
// console.log(this.y);  => f2.y => -1
Fn.prototype.getY();
// 执行的是公有的getY；方法中的this:Fn.prototype；
// this.y -= 1;   Fn.prototype.y=Fn.prototype.y-1=undefined-1=NaN
// console.log(this.y);  => Fn.prototype.y => NaN
f1.sum();
// f1.sum => undefined
// undefined() ：报错，f1.sum is not a function */

/* 优化点 
Fn.prototype.sum = function () {
	console.log(this.x + this.y);
}
let obj = {
	// constructor: Fn,
	getX: function () {
		this.x += 1;
		console.log(this.x);
	},
	getY: function () {
		this.y -= 1;
		console.log(this.y);
	}
};
// Object.assign(obj1,obj2)把两个对象进行合并，合并过程中，有冲突的属性以obj2为主，剩余的不冲突的都合并在一起，返回一个合并后的新对象
Fn.prototype = Object.assign(Fn.prototype, obj); */

//===================================
/* 
function fun() {
	this.a = 0;
	this.b = function () {
		alert(this.a);
	}
}
fun.prototype = {
	b: function () {
		this.a = 20;
		alert(this.a);
	},
	c: function () {
		this.a = 30;
		alert(this.a)
	}
}
var my_fun = new fun(); //=>fun是一个类  my_fun它的一个实例
// 实例私有属性：{a:0,b:function...}   my_fun
// 实例公有属性：{b:function...,c:function...}
my_fun.b();
// 执行的是私有方法b；this=>my_fun；
// alert(this.a); => my_fun.a  =>"0"
my_fun.c();
// 执行的是公有方法c；this=>my_fun；
// this.a = 30;  => my_fun.a=30 把自己的私有属性a的值修改为30
// alert(this.a) => "30" 
*/


/* 
function C1(name) {
	// name = undefined
	if (name) { //=>if(undefined)
		// 条件不成立，也就不执行这句话（没有给实例设置私有的属性NAME）
		this.name = name;
	}
}
function C2(name) {
	// name = undefined
	this.name = name; //=>给实例设置一个私有的属性NAME，属性值是UNDEFINED
}
function C3(name) {
	// name = undefined
	this.name = name || 'join'; //=>给实例设置了一个私有的属性NAME，属性值'JOIN'
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name));
// new C1().name  创建C1类的一个实例，调取实例上的NAME  =>"Tom"
// new C2().name  =>"undefined"
// new C3().name  =>'join'
// =>"Tomundefinedjoin" 
*/

/* 
function Fn() {
	let a = 1;
	this.a = a;
}
Fn.prototype.say = function () {
	this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;
Fn.prototype.b = function () {
	this.a = 3;
};
console.log(f1.a); //=>1  私有属性
console.log(f1.prototype); //=>undefined 
// 只有函数有原型prototype属性，实例是不存在这个属性的
console.log(f1.b); //=>f (){this.a = 3;} 这个函数
console.log(f1.hasOwnProperty('b')); //=>false 因为不是它的私有属性
console.log('b' in f1); //=>true
console.log(f1.constructor == Fn); //=>true 
*/

/*
function Person() {
	this.name = 'zhufeng';
}
Person.prototype.getName = function () {
	console.log(this.name);
	console.log(this.age);
};
Person.prototype.age = 5000;
/!*
 * 实例对象
 * per1 = {
 *    //=>私有属性
 *    name : 'zhufeng',
 *    age : 9,
 *    __proto__ : {
 *        //=>原型上公有的属性和方法
 *        getName : function...,
 *        age : 5000
 *    }
 * } 
 *!/
var per1 = new Person;
per1.getName();
// 执行的是公有方法；this=>per1；
// this.name => per1.name => 'zhufeng'  私有
// this.age => per1.age => 5000  公有
per1.age = 9; //=>给PER1这个实例对象设置私有属性AGE=9
per1.getName();
// 执行的是公有方法；this=>per1；
// this.name => per1.name => 'zhufeng'  私有
// this.age => per1.age => 9  私有
console.log(per1.age); //=>9

/!*
 * per2 = {
 *	  //=>私有属性
 *    name : 'zhufeng',
 *    __proto__ : {
 *        //=>原型上公有的属性和方法
 *        getName : function...,
 *        age : 5000
 *    }
 * } 
 *!/
var per2 = new Person;
console.log(per2.age); //=>5000
*/