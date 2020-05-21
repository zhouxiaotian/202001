// 如何基于 ES5/ES6 实现类的继承，两种方式有什么区别？

/*
 * 类继承的方式
 *   1.原型继承
 *     子类的原型指向父类的实例
 *       1）父类的私有和公有都会变为子类的公有
 *       2）重构了子类的原型，导致子类的constructor丢失
 * 
 *   2.CALL继承
 *     在子类的构造函数中，把父类当做普通的方法去执行，让其THIS改变为子类的实例
 *       1）只是把父类的私有拷贝给子类私有中一份
 * 
 *   3.寄生组合式继承
 *     融合原型和CALL继承，让子类的原型指向基于Object.create创建的新对象，新对象的原型链指向父类的原型
 * 
 *   4.ES6中的CLASS继承
 *     原理和寄生组合式继承类似，直接基于extends即可实现
 */

/* function Parent() {
	this.x = 100;
}
Parent.prototype.getX = function getX() {};

function Child() {
	// CALL继承（把Parent当做普通函数执行，和类的原型没啥关系）
	Parent.call(this);
	this.y = 200;
}
// 原型继承
// Child.prototype = new Parent;
// 寄生继承方式
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.getY = function getY() {}; */

class Parent {
	x = 100;
	getX() {}
}

class Child extends Parent {
	/* constructor() {
		super();
		// Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor 继承中，一但设置constructor，必须在第一行代码处写上super
	} */
	y = 200;
	getY() {}
}

console.log(new Child);