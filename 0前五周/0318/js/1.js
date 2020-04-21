/*
 * 浏览器加载页面，想让代码执行，首先会形成一个栈内存（执行环境栈 ECStack）；然后开始让代码准备执行；
 *    => 最开始要执行的一定是全局下的代码，此时形成一个全局代码的执行环境（全局执行上下文 EC(G)），把EC(G)压缩到栈内存中去执行（进栈）；每一个函数的执行也是这样操作的...
 *    => 有些上下文在代码执行完成后，会从栈内存中移除去（出栈），但是有些情况是不能移出出去的（例如：全局上下文就不能移除...）
 *    => 在下一次有新的执行上下文进栈的时候，会把之前没有移除的都放到栈内存的底部，让最新要执行的在顶部执行
 */

/*
 * 变量提升：在当前执行上下文中（不论是全局，还是函数执行私有的），JS代码自上而下执行之前，首先会默认把所有带VAR和FUNCTION关键字的进行声明或者定义
 *   =>带VAR的只是提前声明
 *   =>带FUNCTION的会提前声明+定义
 */

/* var n = 100;
// 1. 创建值100存储到栈内存中（引用数据类型首先创建堆，存完数据后，把堆的地址存放到栈中）
// 2. 创建一个变量  var a;  =>变量声明（declare）
// 3. 让变量和值关联在一起   =>变量定义（defined）
// var a;  只声明变量但是没有给变量赋值（也就是未定义），所以默认值是undefined未定义 */

/*
 * 全局变量提升：var a; function func(){....}; 
 */
/* console.log(a);
console.log(func);
var a = 10;
function func(){
	/!*
	 * 变量提升：var b; 
	 *!/
	console.log(b);
	var b=20;
	console.log(b);
}
func();
console.log(a);
console.log(func); */


/* 函数表达式方式创建函数，在变量提升阶段，并不会给函数赋值，这样只有代码执行的过程中，函数赋值后才可以执行（不能在赋值之前执行） =>符合严谨的执行逻辑  =>真实项目中推荐的方式*/
// func();
// function func() {
// 	console.log('OK');
// }

// // 变量提升：var func;  （默认值是undefined）
// // func(); //=> undefined() =>Uncaught TypeError: func is not a function  
// var func = function () {
// 	console.log('OK');
// };
// func();

// 为了保证语法的规范性，JS中原本创建的匿名函数，我们最好设置一个名字，但是这个名字在函数外面还是无法使用的，只能在本函数体中使用（一般也不用）
/* var func = function anonymous() {
	// console.log(anonymous); //=>当前这个函数
};
// console.log(anonymous); //=>Uncaught ReferenceError: anonymous is not defined
func(); */

/* var func = function func() {
	console.log(func); //=>函数名func
};
console.log(func); //=>变量func，存储的值是函数
func(); */


//========================
// 截止目前，我们的上下文只有两种：
// =>全局上下文
// =>函数执行产生的私有上下文

// 1.在当前执行上下文中，不管条件是否成立，变量提升是有效的

/*
 * 全局上下文中的变量提升：
 *    [VO(G) 全局变量对象]
 *    var n;  不论IF条件是否成立
 */
// console.log(n); //=>undefined
// if (1 > 1) { //=>条件不成立
// 	var n = 100;
// }
// console.log(n); //=>undefined

/*
 * 全局上下文中的变量提升：
 *   [VO(G) 全局变量对象]
 *     [IE 10及以前以及谷歌等浏览器低版本状态下]
 *       function func(){ ... }  声明+定义都处理了
 * 
 *     [最新版本的浏览器中，机制变了]
 *       function func;  用判断或者循环等包裹起来的函数，在变量提升阶段，不论条件是否成立，此处只会先声明
 */
// console.log(func); //=>undefined
// if (1 === 1) {
// 	// 此时条件成立，进来的第一件事情还是先把函数定义了（迎合ES6中的块作用域） => func=function(){ .... }
// 	console.log(func); //=>函数
// 	function func() {
// 		console.log('OK');
// 	}
// 	console.log(func); //=>函数
// }
// console.log(func); //=>函数

//===============================================
// var obj = {
// 	name: '珠峰培训'
// };
// 验证：name或者age是不是obj的属性
// 1.基于判断属性值是否为undefined来验证是否有这个属性
// if (obj.name !== undefined) {
// 	// OBJ中存在这个属性
// }
// if (obj['age'] === undefined) {
// 	// OBJ不存在这个属性
// }
// 2.基于检测符 in 来检测当前属性是否属于这个对象  =>语法： 属性名 in 对象
// if ('age' in obj) {
// 	// AGE是OBJ属性返回TRUE，不是它的属性返回FALSE
// }

//----------
// “在全局执行上下文中”，带VAR和不带VAR定义值是两套不同的机制
//  =>带VAR是创建一个全局变量，存放在全局变量对象VO(G)中
//  =>不带VAR创建的不是变量，而是全局对象GO（global object）的一个属性 （全局对象：浏览器默认会自带很多供JS调取使用的内置API，这些属性方法都在GO中存储着，在浏览器端，把GO对象赋值给window，在node端把GO赋值给了global）
// 总结：全局上下文中，基于VAR创建变量，会给VO(G)和GO中各自存储一份，不带VAR的，只是给GO设置一个属性而已；当我们输出这个变量值的时候，首先看是否为全局变量，是则输出全局变量的值，如果不是，则在看是否为全局对象的属性，如果再不是，则报错!!
/* var n = 100;
console.log(n);
console.log(window.n);
m = 200;
console.log(m);
console.log(x);
 */

/*
 * 全局上下文中的变量提升
 *     var a;
 *       ->给VO(G)中新增一个全局变量 a
 *       ->给GO中新增一个属性 a
 *       ->默认值都是 undefined
 */
// console.log(a); //=>undefined
// if (!('a' in window)) {
// 	// 'a' in window 检测a是否为window的一个属性 =>TRUE
// 	// !true => FALSE  条件不成立
// 	var a = 13;
// }
// console.log(a); //=>undefined


/*
 * 全局上下文中的变量提升（最新版本浏览器中）
 *     function fn;
 *       ->VO(G)中存在一个fn全局变量
 *       ->GO中存在一个fn属性
 */
// console.log(fn); //=>undefined
// // fn();//=> undefined() =>Uncaught TypeError: fn is not a function  JS中，一但当前代码报错，那么下面的代码都不会再执行了
// if ('fn' in window) {  //=>TRUE
// 	// 进来第一件事情：给FN赋值  fn=function(){ ... }
// 	fn(); //=>'哈哈哈'
// 	function fn() {
// 		console.log('哈哈哈');
// 	}
// }
// fn(); //=>'哈哈哈'


//========================================
// 浏览器有一个特征：做过的事情不会重新再做第二遍（例如：不会重复声明）
/*
 * 全局上下文中的变量提升
 *     fn = function(){ 1 }  声明+定义
 *        = function(){ 2 }
 *     var fn; 声明这一步不处理了（已经声明过了）
 *        = function(){ 4 }
 *        = function(){ 5 }
 * 结果：声明一个全局变量fn，赋的值是 function(){ 5 }
 */
// fn(); //=>5
// function fn(){ console.log(1); }  //=>跳过（变量提升的时候搞过了）
// fn(); //=>5
// function fn(){ console.log(2); }  //=>跳过
// fn(); //=>5
// var fn = function(){ console.log(3); } //=>var fn; 这一步跳过，但是赋值这个操作在变量提升阶段没有搞过，需要执行一次  => fn = function(){ 3 }
// fn(); //=>3
// function fn(){ console.log(4); } //=>跳过
// fn(); //=>3
// function fn(){ console.log(5); } //=>跳过
// fn(); //=>3


/*
 * 低版本浏览器（包含IE10及以内） 
 * 全局上下文中变量提升
 *    没有
 */
// f=function (){return true;};//给GO中设置一个属性 f = function () {return true;}
// g=function (){return false;};//给GO中设置一个属性 g = function () {return false;}
// (function () {
// 	/* 
// 	 * 自执行函数执行，形成一个私有的执行上下文
// 	 *    [变量提升]
// 	 *    function g(){return true;}
// 	 */
// 	// 条件解析：
// 	// g() => 私有的G执行 TRUE
// 	// []==![] => []==false => 0==0 => TRUE
//     if (g() && [] == ![]) { //=>条件成立
//         f = function () {return false;} //f不是自己私有的，则向上查找，属于全局对象中的f，此处是把全局对象中的 f = function () {return false;}
//         function g() {return true;} //跳过（变量提升处理过了）
//     }
// })();
// console.log(f()); //=>FALSE
// console.log(g()); //=>FALSE  这个G找全局的（函数里面的G是自己私有的）


/*
 * 高版本浏览器 
 * 全局上下文中变量提升：没有
 */
// f=function (){return true;};//给GO中设置一个属性 f = function () {return true;}
// g=function (){return false;};//给GO中设置一个属性 g = function () {return false;}
// (function () {
// 	/* 
// 	 * 自执行函数执行，形成一个私有的执行上下文
// 	 *    [变量提升]
// 	 *    function g; 高版本浏览器中，在判断和循环中的函数，变量提升阶段只声明不定义
// 	 */
// 	// 条件解析：
// 	// g() => undefined() => Uncaught TypeError: g is not a function 下面操作都不在执行了
//     if (g() && [] == ![]) {
//         f = function () {return false;} 
//         function g() {return true;}
//     }
// })();
// console.log(f());
// console.log(g());