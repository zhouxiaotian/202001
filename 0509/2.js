/*
 * Promise：ES6中新提供的一个内置类，基于Promise可以有效的管理JS中的异步编程，解决传统异步编程+回调函数导致的“回调地狱”问题 =>我们把基于PROMISE进行异步管控的模式叫做 “PROMISE设计模式”
 *   【普通对象->静态的私有属性方法】
 *    Promise.all()
 *    Promise.race()
 *    Promise.resolve()
 *    Promise.reject()
 *   【类->原型链上的公共属性和方法】
 *    Promise.prototype.then()
 *    Promise.prototype.catch()
 *    Promise.prototype.finally() [一般不用]
 *   【NEW创建实例】
 */

// JQ中的AJAX发送数据请求（真实项目中的AJAX请求基本上都是异步的：让数据请求和页面渲染同时进行，提高页面的加载效率，而且即使数据请求出现问题，也不会影响到页面的渲染...）
/* $.ajax({
	url: '',
	method: 'get',
	success: function (result) {
		// 数据请求成功触发SUCCESS回调函数执行，并且把从服务器获取的数据传递给RESULT
	}
}); */

// 需求：先发送第一个请求 /api/userInfo?id=1  获取到学生的基本信息；拿到信息后，基于学生的 name 再发送第二个请求 /api/repeatList?name=xxx 获取到重名的学生都有哪些；获取到同样名字学生的集合后，再发送第三个请求 /api/score?list=xxx 获取到每一个学生的分数信息；...
// “AJAX的串行”：第一个成功才能发送第二个，第二个成功才能发送第三个...上一个请求完，才能进行下一个请求，依次按照顺序发送请求（请求之间可能存在依赖）
// “AJAX的并行”：同时发送多个请求（每个请求之间不会存在依赖），当所有请求都成功后，统一做什么事情


/* 回调地狱：回调函数中嵌套回调函数（不利于开发，不利于维护的代码） */
// 第一个异步请求开始
/* $.ajax({
	url: '/api/userInfo?id=1',
	method: 'get',
	success: function (result) {
		// 第一个异步请求成功的回调函数中发送第二个请求
		$.ajax({
			url: `/api/repeatList?name=${result.name}`,
			method: 'get',
			success: function (result) {
				// 第二个异步请求成功的回调函数中发送第三个请求
				$.ajax({
					url: `/api/score?list=${result.list}`,
					method: 'get',
					success: function (result) {
						console.log(result);
					}
				});
			}
		});
	}
}); */

/* 
function ajax1(id, success) {
	$.ajax({
		url: `/api/userInfo?id=${id}`,
		method: 'get',
		success
	});
}

function ajax2(name, success) {
	$.ajax({
		url: `/api/repeatList?name=${name}`,
		method: 'get',
		success
	});
}

function ajax3(list, success) {
	$.ajax({
		url: `/api/score?list=${list}`,
		method: 'get',
		success
	});
}

ajax1(1, result1 => {
	ajax2(result1.name, result2 => {
		ajax3(result2.list, result3 => {
			console.log(result3);
		});
	});
}); 
*/

//===================基于PROMISE解决AJAX异步串行
function ajax1(id) {
	return new Promise(resolve => {
		$.ajax({
			url: `/api/userInfo?id=${id}`,
			method: 'get',
			success: resolve
		});
	});
}

function ajax2(name) {
	return new Promise(resolve => {
		$.ajax({
			url: `/api/repeatList?name=${name}`,
			method: 'get',
			success: resolve
		});
	});
}

function ajax3(list) {
	return new Promise(resolve => {
		$.ajax({
			url: `/api/score?list=${list}`,
			method: 'get',
			success: resolve
		});
	});
}

ajax1(1).then(result1 => {
	return ajax2(result1.name);
}).then(result2 => {
	return ajax3(result2.list);
}).then(result3 => {
	console.log(result3);
});

// ES7中提供了PROMISE的语法糖：ASYNC AWAIT
async function send() {
	let result1 = await ajax1(1);
	let result2 = await ajax2(result1.name);
	let result3 = await ajax3(result2.list);
	console.log(result3);
}
send();