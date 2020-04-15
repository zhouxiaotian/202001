// JQ本身就是放到一个闭包中的（保护：防止全局变量污染）
// => typeof window !== "undefined" ? window : this  区分是浏览器环境还是NODE环境（浏览器环境下全局对象GO赋值给window，NODE环境中是没有window的）
// => 浏览器暂时性死区的问题：typeof 一个未被声明定义的变量，不会报错，结果是undefined
(function (global, factory) {
	// factory===anonymous
	if (typeof module === "object" && typeof module.exports === "object") {
		// 符合这个条件，说明是基于CommonJS模块规范的运行环境（例如：NODE环境）
		// ...
	} else {
		// 浏览器环境 global===window
		factory(global);
	}
})(window, function anonymous(window, noGlobal) {
	// window === window
	// noGlobal === undefined
	// 这里的代码才是JQ的核心代码，之前的闭包仅仅是为了做环境的区分
	"use strict";

	// jQuery是一个类（也是一个普通的函数、也是一个普通的对象）
	var jQuery = function jQuery(selector, context) {
		// $() JQUERY选择器提供两个参数
		// 第一个是选择器，第二个是上下文（限定获取的范围）
		// 把JQUERY当做普通方法执行

		// new jQuery.fn.init 它是创建init这个类的一个实例，实例找到的是init.prototype，但是init.prototype就是JQUERY的原型，所以创建的实例也可以被理解为是JQUERY类的一个实例
		return new jQuery.fn.init(selector, context);
	};

	// 当做类：类的原型（公共的属性方法，供实例调用）
	// jQuery.fn是给他设置的一个小名
	// jQuery.prototype重定向到新的对象中，需要保证constructor
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		// 借用数组原型上的方法，把类数组转换为数组
		toArray() {
			return [].slice.call(this);
		},
		each(callback) {
			return jQuery.each(this, callback);
		},
		get(num) {
			// 基于索引把JQ对象转换为原生DOM对象
			if (num == null) {
				return slice.call(this);
			}
			return num < 0 ? this[num + this.length] : this[num];
		},
		eq(i) {
			// 返回的结果还是一个JQ实例对象（类数组集合）
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		}
		// ...
	};

	// 核心处理的代码
	var init = jQuery.fn.init = function init(selector, context, root) {
		root = root || rootjQuery; //=> jQuery(document)
		if (typeof selector === "string") {
			// 传递的选择器是一个字符串
			// =>基于选择器获取元素  $('.box')
			// =>$('<div>珠峰培训</div>') 这是创建一个新的元素

		} else if (selector.nodeType) {
			// 传递的选择器是一个节点（一般都是元素节点  也就是原生JS中的元素对象）
			// =>把原生的JS对象转换为JQUERY对象（类数组集合）
			this[0] = selector;
			this.length = 1;
			return this;
		} else if (isFunction(selector)) {
			// 传递的选择器是一个函数
			// =>DOM结构都加载完再执行这个函数
			return jQuery(document).ready(selector);
			/* return root.ready !== undefined ?
				root.ready( selector ) :
				selector( jQuery ); */
		}
		// 最后创建的是一个JQUERY类数组结合
		return jQuery.makeArray(selector, this);
	};
	init.prototype = jQuery.fn;
	

	// 暴露到全局使用
	if (typeof noGlobal === "undefined") {
		// 浏览器环境下必执行的代码
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});