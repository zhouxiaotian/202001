/* 
 * 利用闭包的保护作用 
 *   1.团队协作开发中，A/B共同开发一个页面，最后要把代码合并在一起，为了防止全局变量的冲突污染，我们建议每个开发者，都把自己的代码放置到一个闭包中（自执行函数执行即可，这样就是私有的上下文）保护起来
 *   2.如果我们是封装一个插件或者类库等，为了防止我们定义的变量和方法 和 用户定义的冲突，我们也是需要把所有写的代码放到一个闭包中，例如：jQuery...
 *   ......
 */

/* 
// A的代码
(function anonymous() {
	/!* 自执行函数执行，会形成一个私有的上下文，在这里声明+定义的变量或者函数都是私有的 *!/
	var x = 100,
		y = 200;

	function func() {
		// ...
	}
})();

// B的代码
~ function anonymous() {
	// console.log(anonymous); //=>函数本身 匿名函数设置的函数名只能在函数里面应用，函数外面是无法访问的
	var x = 200,
		n = 0;

	function func() {
		// ...
	}

	function handled() {
		// ...
	}
}();
// console.log(anonymous); //=>Uncaught ReferenceError: anonymous is not defined 
*/

/* JQUERY源码一瞥 */
/* 
// typeof window !== "undefined" ? window : this  浏览器端window是存在的
(function (global, factory) {
	"use strict";
	// => global===window
	// => factory===function (window, noGlobal){...}
	factory(global);
})(window, function (window, noGlobal) {
	// JQUERY的源码
}); 
*/


/* 需求：我们需要把某一个闭包（私有上下文）中的值暴露到外面 */

/* JS中的设计模式：单例设计模式 */
/* var obj = (function anonymous() {
	// queryURLParams：获取URL地址参数信息
	function queryURLParams() {
		// ...
	}

	// sum：实现任意数求和
	function sum() {
		// ...
	}

	// 把需要供外面访问的变量和方法，赋值给一个对象，最后返回（外层基于VAR OBJ定义变量来接收即可）
	return {
		queryURLParams: queryURLParams,
		sum: sum
	}; //=>return AAAFFF000;
})();
// console.log(obj); //=>{queryURLParams:函数,sum:函数}
obj.queryURLParams();
obj.sum(); */

/* 也可以基于window.xxx=xxx暴露到全局上来使用*/
/* (function anonymous() {
	function queryURLParams() {
		// ...
	}

	function sum() {
		// ...
	}

	// 想暴露到外面使用，可以暴露到全局上（赋值给全局对象GO =>window）
	window.queryURLParams = queryURLParams;
	window.sum = sum;
})();
queryURLParams(); //=>window.queryURLParams() */