/* function Modal(x, y) {
	this.x = x;
	this.y = y;
}
Modal.prototype.z = 10;
Modal.prototype.getX = function () {
	console.log(this.x);
}
Modal.prototype.getY = function () {
	console.log(this.y);
}
Modal.n = 200;
Modal.setNumber = function (n) {
	this.n = n;
};
let m = new Model(10, 20); */

class Modal {
	// 构造函数（NEW MODAL的时候，执行构造函数）
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	// z = 10; //=>这个和在构造函数中的this.xxx=xxx一样，是给实例设置的私有属性

	// 设置在原型上的方法（暂时只能设置方法，属性值不是函数的无法设置）
	getX() {
		console.log(this.x);
	}
	getY() {
		console.log(this.y);
	}

	// 类作为普通对象设置的私有属性方法（静态的）
	static n = 200;
	static setNumber(n) {
		this.n = n;
	}
}
Modal.prototype.z = 10;
let m = new Modal(10, 20);