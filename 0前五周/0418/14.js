/* 
 *  匿名函数具名化的特点：
 *    1.设置的名字只能在函数的内部使用，外部是用不了的
 *    2.还不允许被修改
 */

/* let fn = function handle() {
	// console.log(handle); //=>函数本身
	handle = 10;
	// console.log(handle); //=>函数本身
};
fn();
// console.log(handle); //=>Uncaught ReferenceError: handle is not defined */


/* var b = 10;
(function b() { //=>此处的b和全局变量b没有任何的关系
	b = 20;
	console.log(b); //=>函数
})();
console.log(b); //=>10 */

/* var b = 10;
(function b() {
	// 私有上下文中，我们手动声明的变量优先级高于具名化的函数名
	/!* 
	 * 变量提升 
	 *   var b; 
	 *!/
	var b = 20;
	console.log(b); //=>20
})();
console.log(b); //=>10 */