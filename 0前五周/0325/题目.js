/* 做原型类的题目，没有比画图更好的方式了 */
/* function Fn() {
	this.x = 100;
	this.y = 200;
	this.getX = function () {
		console.log(this.x);
	}
}
Fn.prototype.getX = function () {
	console.log(this.x);
};
Fn.prototype.getY = function () {
	console.log(this.y);
};
let f1 = new Fn;
let f2 = new Fn;
console.log(f1.getX === f2.getX);
console.log(f1.getY === f2.getY);
console.log(f1.__proto__.getY === Fn.prototype.getY);
console.log(f1.__proto__.getX === f2.getX);
console.log(f1.getX === Fn.prototype.getX);
console.log(f1.constructor);
console.log(Fn.prototype.__proto__.constructor);
f1.getX();
f1.__proto__.getX();
f2.getY();
Fn.prototype.getY();
 */
//------------------------------

/* function Fn(num) {
	this.x = this.y = num;
} */
/*
 * 向类的原型上扩展属性方法
 *     Fn.prototype.xxx = xxx  向默认开辟的堆内存中增加属性方法
 *     =>如果需要设置很多属性方法，操作起来比较的麻烦（小技巧，给Fn.prototype设置别名）
 *     let prop = Fn.prototype;
 *     prop.A = 100;
 *     prop.B = 200;
 *     prop.C = 300;
 *     =>这类方式的特点都是向默认开辟的堆中扩展属性方法，默认开辟的堆内存中存在CONSTRUCTOR这个属性
 *    
 *    重定向Fn的原型指向
 *    =>自己开辟的堆内存中是没有CONSTRUCTOR这个属性的，所以真实项目中，为了保证结构的严谨性，我们需要自己手动设置CONSTRUCTOR
 *    =>如果在重定向之前，我们向默认开辟的原型堆内存中设置了一些属性方法，重定向后，之前设置的属性方法都丢失了（没用了）
 *    Fn.prototype = {
 *        constructor:Fn,
 *        xxx:xxx
 *    }
 */
// Fn.prototype.AA = 100;
/* Fn.prototype = {
	x: 20,
	sum: function () {
		console.log(this.x + this.y);
	}
};
let f = new Fn(10);
console.log(f.sum === Fn.prototype.sum);
f.sum();
Fn.prototype.sum();
console.log(f.constructor); */