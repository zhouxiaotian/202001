function isNumbic(num) {
	num = Number(num);
	if (isNaN(num)) {
		throw new TypeError('传递的数据必须是有效数字！');
		return;
	}
	return num;
}
Number.prototype.plus = function plus(num) {
	num = isNumbic(num);
	return this + num;
};
Number.prototype.minus = function minus(num) {
	num = isNumbic(num);
	return this - num;
};

let n = 10;
let m = n.plus(10).minus(5);
console.log(m); //=>15（10+10-5）