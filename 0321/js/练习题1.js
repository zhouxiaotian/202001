/*
 * 函数每一次执行都是形成全新的上下文，和之前形成的上下文没有必然关系 
 */
/* var i = 20;
function fn() {
    i -= 2;
    var i = 10;
    return function (n) {
        console.log((++i) - n);
    }
}
var f = fn();
f(1);
f(2);
fn()(3);
fn()(4);
f(5);
console.log(i); */


var n = 0;
function a() {
	var n = 10;
	function b() {
		n++;
		console.log(n);
	}
	b();
	return b;
}
var c = a();
c();
console.log(n);