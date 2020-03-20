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








