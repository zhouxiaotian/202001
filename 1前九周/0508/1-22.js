/* 
 * _new:重写内置NEW方法，实现出和内置NEW相类似的效果（创建类的实例） 
 *   @params:
 *      Func:创建这个类的一个实例
 *      args:基于剩余运算符获取到所有要给类传递的实参信息
 *   @return
 *      一般都是当前类的实例，特殊情况是自己函数中返回的值
 */
function _new(Func, ...args) {
	let obj = Object.create(Func.prototype);
	let result = Func.call(obj, ...args);
	(result !== null && /^(object|function)$/i.test(typeof result)) ? obj = result: null;
	return obj;
}

function Dog(name) {
	this.name = name;
}
Dog.prototype.bark = function () {
	console.log('wangwang');
}
Dog.prototype.sayName = function () {
	console.log('my name is ' + this.name);
}
let sanmao = _new(Dog, '三毛');
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true