/* Array.prototype.push = function push(val) {
	// this:arr
	// 1.给THIS末尾追加一个新项
	// this[this.length]=val;
	// 2.让数组的长度自动扩充
	// this.length++;
	// 3.返回新增后数据的长度
	// return this.length;
};
let arr = [10, 20, 30];
arr.push(40); */

/* let obj = {
	0: 3, //=>10
	1: 4, //=>20
	length: 0, //=>1 2
	push: Array.prototype.push
}
obj.push(10);
// obj[obj.length]=10 =>obj[0]=10
// obj.length++  =>obj.length=1
obj.push(20);
// obj[obj.length]=20 =>obj[1]=20
// obj.length++  =>obj.length=2
console.log(obj); */

/* let obj = {
	0: 3,
	1: 4,
	length: 0
};
[].push.call(obj, 10);
[].push.call(obj, 20);
console.log(obj); */