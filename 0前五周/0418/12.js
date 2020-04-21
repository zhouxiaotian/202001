/*
 * 两种大的实现思路
 *   1.利用==比较的时候，左右两边数据类型不一致的情况下，浏览器默认进行隐性的转换 
 *     对象==数字  =>  要把对象转换为数字(先把对象转换为字符串/再把字符串转换为数字)
 *     对象转换为字符串，默认调用的是valueOf()和toString()
 * 
 *   2.基于Object.defineProperty进行数据操作监听（数据劫持）
 */

/* 
let i = 0;
Object.defineProperty(window, 'a', {
	get() {
		// 获取a属性值，就会触发GETTER函数
		return ++i;
	},
	// 设置属性a的值，就会触发SETTER函数
	set() {}
});
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
}
*/

/* 
var a = {
	i: 0,
	// 替换成为toString也是可以的
	valueOf() {
		// this:a
		return ++this.i;
	}
};
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
}
 */

/* 
var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
}
*/