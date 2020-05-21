/* 
let n = 10;
setTimeout(() => {
	n++;
	console.log(n); //=>11 (2)
}, 1000);
console.log(n); //=>10 (1) 
*/

/* 
let n = 10;
setTimeout(() => {
	n++;
	console.log(n); //=>11 (2)
}, 0); //定时器的等待时间即使设置为零，也不是立即执行，浏览器有一个最小的等待时间（谷歌5~6MS IE浏览器10~13MS）
console.log(n); //=>10 (1)
*/

/* 在滚动相同的距离下，事件被触发多少次，取决于滚动所用的时间（速度）来决定的：浏览器有最小的反应时间，假设是5MS，整体运动时间100MS，这段时间内，浏览器能够识别出来的次数是100/5=20次，同理如果我们运动1000MS，那么识别触发的次数就是200次 */
// window.onscroll = function () {
// 	console.log('OK');
// };

/*
 console.time('AAA');
 for (let i = 0; i < 99999999; i++) {}
 console.timeEnd('AAA');  
  
 获取代码执行所需要的时间（这个时间需要受到电脑配置、和当前电脑运行的环境等多方面因素影响），时间只作为参考
*/

/* 
let n = 10;
setTimeout(() => {
	n++;
	console.log(n); //=>11 (3)
}, 0);
console.log(n); //=>10 (1)
for (let i = 0; i < 99999999; i++) {
	// 循环到一半的时候，定时器肯定到达时间了
}
console.log(n); //=>10 (2) 
*/

//=============================================
/*
 * 1.进程和线程
 *   进程代表的是一个程序（例如：打开一个软件、浏览器打开一个页面）
 *   线程是程序中需要处理的事情，如果程序中需要同时处理很多事情，则需要开辟多个线程（一个线程同时只能做一个事情） “进程中包含多个线程”
 * 
 * 2.JS代码的渲染是单线程的
 *   浏览器是多线程的（打开一个页面后，浏览器至少要分配好几个线程同时去处理事情），但是浏览器只会分配一个线程去渲染代码（GUI渲染线程），所以说JS是单线程的：“在JS代码执行过程中，一次只能处理一个事情”  
 *   同步编程：[单线程] 任务是依次执行，上面的任务没有执行完成，下面的任务是不能去操作的
 *   异步编程：[多线程] 同时可以处理很多事情，但是JS中的异步编程是利用浏览器的相关机制构造出来的异步效果
 * 
 * 3.事件队列 EventQueue
 * 4.事件循环 EventLoop
 */

/* 
let n = 10;
setTimeout(() => {
	n++;
	console.log(n);
}, 0);
console.log(n);
for (let i = 0; i < 99999999; i++) {}
console.log(n); */


/* setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); */


/* console.log(1); //=>1(1)
setTimeout(function () {
	console.log(2);
}, 20);
console.log(3); //=>3(2)
for (let i = 0; i > -1; i++) {} //=>死循环，GUI线程啥都做不了，一直在这加载（其它什么事情都干不了）
console.log(4);
setTimeout(function () {
	console.log(5);
}, 10);
console.log(6); */

/* 
// navList是LI元素集合（三项）
for (var i = 0; i < navList.length; i++) {
	// 事件绑定是异步编程，循环的时候，只是把任务放置到EventQueue中，继续下一轮循环；等待循环结束，用户手动点击某个LI，会把对用的方法从EventQueue中拿回到栈中执行...
	navList[i].onclick = function () {
		console.log(i); //=>点击每个LI，执行对应的函数，此时函数中的i不是私有的，是全局上下文中的i，已经变为循环结束的3了
	};
} */