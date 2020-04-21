console.log(a, b);
var a = 12,
	b = 12;
function fn() {
	console.log(a, b);
	var a = b = 13;
	console.log(a, b);
}
fn();
console.log(a, b);












// var a=12,
//     b=12;
// var a=12;  var b=12; 连续创建多个变量，可以使用逗号分隔；
//-----------
// var a=b=12;
// var a=12; b=12;  只有第一个带VAR，第二个不带VAR