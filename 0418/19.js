/* function fn() {
	// 获取外层函数传递的实参集合
	let outerArg = [].slice.call(arguments);

	return function anonymous() {
		// 获取里层小函数传递的实参集合
		let innerArg = [].slice.call(arguments);

		// 把两个集合拼接在一起
		let arr = outerArg.concat(innerArg);

		// 求和
		return arr.reduce((n, item) => {
			return n + item;
		}, 0);
	};
}
 */

// ...outerArg：代替ARGUMENTS回去传递的实参集合（数组）
/* let fn = (...outerArg) => {
	return (...innerArg) => {
		let arr = outerArg.concat(innerArg);
		return arr.reduce((n, item) => {
			return n + item;
		}, 0);
	};
}; */

let fn = (...A) => (...B) => [...A, ...B].reduce((n, item) => n + item, 0);

let res = fn(1, 2)(3);
console.log(res); //=>6  1+2+3

res = fn(10, 20, 30)(40, 50);
console.log(res); //=>150  10+20+30+40+50