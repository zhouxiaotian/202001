console.log(a);
if (!('a' in window)) {
	var a = 13;
}
console.log(a);

console.log(fn);
fn();
if ('fn' in window) {
	fn();
	function fn() {
		console.log('哈哈哈');
	}
}
fn();


f = function () {return true;}
g = function () {return false;}
(function () {
    if (g() && [] == ![]) {
        f = function () {return false;}
        function g() {return true;}
    }
})();
console.log(f());
console.log(g());


fn();
function fn(){ console.log(1); }
fn();
function fn(){ console.log(2); }
fn();
var fn = function(){ console.log(3); }
fn();
function fn(){ console.log(4); }
fn();
function fn(){ console.log(5); }
fn();

// ==================

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


console.log(a, b, c);
var a = 12,
	b = 13,
	c = 14;
function fn(a) {
	console.log(a, b, c);
	a = 100;
	c = 200;
	console.log(a, b, c);
}
b = fn(10);
console.log(a, b, c);


function sum(a) {
	console.log(a);
	let a = 100;
	console.log(a);
}
sum(200);

var ary = [12, 23];
function fn(ary) {
	console.log(ary);
	ary[0] = 100;
	ary = [100];
	ary[0] = 0;
	console.log(ary);
}
fn(ary);
console.log(ary);


var i = 0;
function A() {
	var i = 10;
	function x() {
		console.log(i);
	}
	return x;
}
var y = A();
y();
function B() {
	var i = 20;
	y();
}
B();


var i = 5;
function fn(i) {
    return function (n) {
        console.log(n + (++i));
    }
}
var f = fn(1);
f(2);
fn(3)(4);
fn(5)(6);
f(7);
console.log(i);


var i = 20;
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
console.log(i);


//================================

let x = 1;
function A(y){
   let x = 2;
   function B(z){
       console.log(x+y+z);
   }
   return B;
}
let C = A(2);
C(3);


let x = 5;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
//=>如果去掉function fn(x)的x呢？


/*阿里面试原题*/
let a=0,
    b=0;
function A(a){
    A=function(b){
        alert(a+b++);
    };
    alert(a++);
}
A(1);
A(2);








