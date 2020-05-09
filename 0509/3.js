// let p1 = new Promise();
// Uncaught TypeError: Promise resolver undefined is not a function

// 语法：new Promise([executor])
// [executor]是一个函数，我们一般在函数中管控我们的异步编程代码
// 1.NEW PROMISE的时候就会把EXECUTOR立即执行
// 2.并且给EXECUTOR函数传递两个实参（两个实参都是函数）：RESOLVE/REJECT
//------------
// PROMISE的实例拥有[[PromiseStatus]]/[[PromiseValue]]
// 1.[[PromiseStatus]]是PROMISE状态：
//    pending准备状态（new Promise的时候默认状态就是pending）
//    fulfilled/resolved成功状态（一般在异步操作成功后，我们通过执行resolve函数，可以把PROMISE的状态改为resolved）
//    rejected失败状态（一般在异步操作失败后，我们通过执行reject函数，可以把PROMISE的状态改为rejected）
//    pending => resolved/rejected  只要状态一旦更改，则不可以再改变
// 2.[[PromiseValue]]是PROMISE的值
//    不论执行resolve/reject哪个函数，都可以传递值，传递的值最后赋值给[[PromiseValue]]
/* let p1 = new Promise((resolve, reject) => {
	console.log('我是EXECUTOR，NEW PROMISE的时候，我会立即执行！');
	setTimeout(() => {
		// 基于EXECUTOR中的RESOLVE/REJECT可以改变PROMISE的状态和值
		resolve('OK');
		console.log(p1); //=>'resolved'  'ok'
	}, 1000);
});
console.log(p1); //=>'pending'  undefined */

//======================================
/* 
let p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() < 0.5) {
			reject('NO');
		} else {
			resolve('OK');
		}
	}, 1000);
});
// p1.then([状态为成功时执行的],[状态为失败时执行的])，我们修改PROMISE的状态，目的就是为了控制TEHN中的两个方法，哪一个去执行
// result/reason接收的是[[PromiseValue]]的信息（在EXECUTOR函数中，基于RESOLVE/REJECT执行传递的值，就是给PROMISE-VALUE传递的值，并且只能传递一个值，传递第二个实参没用）
p1.then(result => {
	console.log(`成功：${result}`);
}, reason => {
	console.log(`失败：${reason}`);
}); 
*/


/* 
new Promise((resolve, reject) => {
	// 异步请求放置在EXECUTOR中，请求成功或者失败后做啥事情都写在THEN中
	$.ajax({
		url: '/api/info',
		method: 'get',
		success: result => {
			resolve(result);
		},
		error: reject
	});
}).then(result => {
	
}, reason => {

});
*/

/* 
new Promise((resolve, reject) => {
	// EXECUTOR函数中理论上是管控异步编程代码的，但是实际开发中，你可以自己随意处理；但是不论怎么处理，THEN中的方法，只会在PROMISE状态变为成功或者失败的状态下才会执行；
	// 在EXECUTOR函数中执行RESOLVE或者REJECT，并不一定会立即通知THEN中的方法执行；如果在这两个函数执行之前，已经基于THEN把成功或者失败的方法放置好了，则立即通知执行；如果还没有执行过THEN方法，则需要等到THEN执行后，方法放置好，再通知成功或者失败的方法执行！
	reject(100);
}).then(result => {
	console.log(`成功：${result}`);
}, reason => {
	console.log(`失败：${reason}`);
}); 

//=>THEN中的方法可以只写一个（指定在成功或者失败的时候做什么，其它的情况可以啥事都不做或者在THEN链中处理一些事情）
// .THEN([成功])
// .THEN(NULL,[失败])
*/



let p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('OK'); //=>P1状态是成功的
	}, 1000);
});
let p2 = p1.then(result => {
	console.log(`成功：${result}`);
	return result + '@@';
	// 代码执行没有报错，P2新的PROMISE的状态也是成功的  VALUE:'OK@@'
}, reason => {
	console.log(`失败：${reason}`);
	return reason + '!!';
});
// 每一次执行.THEN都会返回一个新的PROMISE实例（初始状态:PENDING  初始VALUE:UNDEFINED），这样可以继续.THEN下去，这就是PROMISE中的THEN链机制
//   1.P2这个实例的成功或者失败状态，是由P1.THEN这堆代码来决定的
//     1）P1.THEN中的不论哪个方法执行，只要不报错，新的P2实例的状态都会变为成功态，而方法返回的结果就是P2实例的PROMIE-VALUE值（也就是上一个TEHN执行的返回结果，会传递给下一个THEN中的方法，上一个THEN不写RETURN，传递给下一个THEN的是UNDEFINED）；同理，两个方法中，不管哪一个执行报错，P2一定是失败态！
//     2）如果P1.THEN中的某个方法执行，返回的是新的PROMISE实例，则会等待这个PROMISE的执行结果，作为P2实例的状态
let p3 = p2.then(result => {
	console.log(result); //=>'OK@@'
	// return Promise.resolve(100); //=>P3的状态变为成功，值是100
	return Promise.reject(0); //=>P3的状态变为失败，值是0
}, reason => {
	
});

p3.then(result => {
	console.log('成功' + result);
}, reason => {
	console.log('失败' + reason);
});