/*
 * 让a等于啥的情况下，可以使a即等于1也等于2也等于3 
 */
/*
 * 解决方案一
 *   ==和===的区别？ 
 *    1. ==进行比较的时候，两边数据类型不一致，则先转换为相同的数据类型，然后再进行比较
 *    2. 除了 对象==字符串 是把对象转换为字符串，其余的都是转换为数字（其中比较特殊的是对象，对象转换为数字，首先要把他转换为字符串  =>  toString 方法）
 */

// var a = {
// 	n: 0,
// 	toString: function () {
// 		// a.toString() : this=>a
// 		return ++this.n;
// 	}
// };
// if (a == 1 && a == 2 && a == 3) {
// 	console.log('OK');
// }

// 让每一次toString的时候都执行shift，删除数组中的第一项，每一次删除返回的结果就是删除的这一项
// var a = [1, 2, 3];
// a.toString = a.shift;
// if (a == 1 && a == 2 && a == 3) {
// 	console.log('OK');
// }

/*
 * 解决方案二
 *   Object.defineProperty：监听某个对象的某个属性，可以在获取或者设置属性的值的时候，做一些自己要做的事情（Vue框架MVVM实现的原理就是基于这个完成的） =>同样原理的还可以使用Proxy代理处理
 *   
 *   全局上下文中变量不带VAR相当于给全局window设置一个属性
 */
// var i = 0;
// Object.defineProperty(window, 'a', {
// 	get() {
// 		// 只要获取a的值，就一定会触发get方法执行
// 		return ++i;
// 	}
// });
// if (a === 1 && a === 2 && a === 3) {
// 	console.log('OK');
// }


/* 
let obj = {
	n: 0
};
console.log(obj.toString()); //=>"[object Object]"  它是obj实例基于__proto__找到Object.prototype上的toString方法，然后去执行的 

let obj = {
	n: 0,
	toString: function () {
		return 'OK';
	}
};
console.log(obj.toString()); //=>"OK" 此处执行的是自己的私有方法（私有中有，就不会再向原型上进行查找了）
*/


// obj.push调取的是私有的属性方法 => Array.prototype.push
// obj.push(1) 相当于让Array原型上的push方法执行
/* Array.prototype.push = function push(n) {
	// 给数组THIS（操作的这个实例）末尾追加新的值
	this[this.length] = n;
	// 1.不仅新增内容到了末尾
	// 2.而且让数组的长度LENGTH累加1
	return this.length;
};
arr.push(100); */

let obj = {
	2: 3,
	3: 4,
	length: 2,
	push: Array.prototype.push
};
obj.push(1);
/*
 * n=1  this:obj
 *   obj[obj.length]=1 => obj[2]=1 => {2:1,3:4...}
 *   length累加1 => {2:1,3:4,length:3...}
 */
obj.push(2);
/*
 * n=2  this:obj 
 *   this[this.length]=n => obj[obj.length]=2 => obj[3]=2 => {2:1,3:2,length:3...}
 *   length++  => {2:1,3:2,length:4...}
 */
console.log(obj); //=>{2: 1, 3: 2, length: 4, push: ƒ}