/* /!*
 * EC(G)全局上下文
 *    var a;
 *    function fn(){...};
 *!/
console.log(a); //=>undefined
var a=12; //=>全局变量a=12
function fn(){
	/!*
	 * EC(FN)私有上下文
	 *    var a; 
	 *!/
    console.log(a); //=>undefined
    var a=13; //=>私有变量a=13
}
fn();   
console.log(a); //=>全局变量a的值是12 
*/

/* /!*
 * EC(G)全局上下文
 *    var a;
 *    function fn(){...};
 *!/
console.log(a); //=>undefined
var a=12;//全局a=12
function fn(){
	/!*
	 * EC(FN)私有上下文
	 *!/
    console.log(a);  //=>不是自己的私有变量，找到的是EC(G)中的全局变量  12
    a=13;//全局a=13
}
fn();
console.log(a); //=>13 */


/* /!*
 * EC(G)全局上下文
 *   function fn(){...};
 *!/
console.log(a); //=>Uncaught ReferenceError: a is not defined
a=12;
function fn(){
	/!*
	 * EC(FN)私有上下文
	 *!/
    console.log(a);
    a=13;
}
fn();
console.log(a); */


/* /!*
* EC(G)全局上下文
*   var foo;
*   function bar(){...};
*!/
var foo=1;//全局foo=1
function bar(){
	/!*
	 * EC(BAR)私有上下文
	 *   var foo;
	 *!/
    if(!foo){ //!foo  =>!undefined  =>true 条件成立
        var foo=10;  //私有foo=10
    }
    console.log(foo); //=>10
}
bar(); */

/* 
/!*
 * EC(G)全局上下文
 *   var a;  var b;  var c; 
 *   function test(){...};   test[[scope]]=EC(G);
 *!/
var a=10,b=11,c=12; //全局a=10 b=11 c=12
function test(a){
	 /!*
	  * EC(TEST)私有上下文  （形参和在函数体中声明过的变量是私有变量）
	  *    a = 10
	  *    b   
	  * SCOPE-CHAIN:<EC(TEST),EC(G)>
	  * 形参赋值：a=10
	  * 变量提升：var b;
	  *!/
     a=1; //私有a=1
     var b=2; //私有b=2
     c=3; //全局c=3
}
test(10);
console.log(a);  //=>10
console.log(b);  //=>11
console.log(c);  //=>3
 */


/* 
/!*
 * EC(G)全局上下文
 *   var a;  
 *      ->声明一个全局变量 VO(G)
 *      ->给GO(window)设置一个属性 window.a
 *!/
if (!("a" in window)) { //"a" in window => TRUE
	var a = 1;
}
console.log(a); //=>undefined */

/* 
/!*
 * EC(G)全局上下文
 *   var a;
 *   function b(x,y,a){...};  b[[scope]]=EC(G);
 *!/
var a = 4; //全局a=4
function b(x, y, a) {
	/!* 
	 * EC(B)私有上下文
	 *   x=1
	 *   y=2
	 *   a=3
	 * 
	 * 1.SCOPE-CHAIN:<EC(B),EC(G)>
	 * 2.初始化THIS
	 * 3.初始化ARGUMENTS = { 0:1, 1:2, 2:3, length:3 }
	 * 4.形参赋值：分别给x/y/a赋值  
	 * 5.变量提升
	 * 6.代码执行
	 *  
	 * 在JS非严格模式下，ARGUMENTS和形参变量存在映射机制（因为都是用来存储传递的实参信息的，ARGUMENTS不管是否定义形参都会存在，定义形参后，不仅形参可以获取传递的值，ARGUMENTS中也存储了传递的值，此时两者有映射机制了）
	 *   第一个形参变量 映射 ARGUMENTS[0]
	 *   第二个形参变量 映射 ARGUMENTS[1]
	 *   ...
	 *   映射：后期不论是形参变量更改值，还是ARGUMENTS更改每一项的值，互相都会跟着改变
	 *!/
	console.log(a); //=>3
	arguments[2] = 10; //=>把ARGUMENTS索引为2（也就是第三个传递的实参）修改为10，由于映射机制，形参a的值也会跟着变为10
	console.log(a); //=>10
}
a = b(1, 2, 3); //把b函数执行，分别传递1,2,3三个实参给函数，把函数执行的返回值（只看RETURN）赋值给全局变量a  =>全局a=undefined，因为函数没有写return返回值
console.log(a); //=>undefined */


/* function fn(x, y, z) {
	console.log(x, y, z, arguments);
	// => x=10  y=20  z=30
	// => arguments = [10,20,30]

	arguments[0] = 100; //[100,20,30] x=100
	y = 200; //y=200 [100,200,30]
	arguments[2] = 300; //[100,200,300] z=300

	console.log(x, y, z, arguments);
	// => x=100  y=200  z=300
	// => arguments = [100,200,300]
}
fn(10, 20, 30); */

/* "use strict"; //=>使用JS严格模式（JS最开始位置加）
function fn(x) {
	console.log(x); //=>10
	arguments[0] = 100; //严格JS模式下，映射机制不存在，此处只是把arguments修改了，x是不会跟着改变的
	console.log(x); //=>10
}
fn(10); */


/* /!*
 * EC(G)全局上下文
 *   var foo; 
 *!/
var foo = 'hello'; //全局foo='hello'
(function (foo) {
	/!*
	 * EC(AN)私有上下文
	 *    foo = 'hello'  此处是私有变量，和全局不是一个，但是因为是把全局值给他的，所以此时两个变量的值是一样的，但是不是相同的变量
	 * 
	 * SCOPE-CHAIN:<EC(AN),EC(G)>
	 * 初始THIS/ARGUMENTS
	 * 形参赋值:给foo赋值
	 * 变量提升:var foo;（已经声明了）
	 * 代码执行
	 *!/
	console.log(foo); //=>'hello'
	var foo = foo || 'world'; //foo='hello' || 'word'='hello'
	console.log(foo); //=>'hello'
})(foo); //自执行函数执行，把全局foo的值作为实参传递给函数  ...('hello')
console.log(foo); //=>'hello' */