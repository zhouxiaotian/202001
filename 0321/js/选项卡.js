var tabBox = document.getElementById('tabBox'),
	navList = tabBox.getElementsByTagName('li'),
	conList = tabBox.getElementsByTagName('div');

// changeTab：实现页卡切换的方法
function changeTab(index) {
	// index存储的是当前点击这一项的索引
	for (var i = 0; i < navList.length; i++) {
		navList[i].className = '';
		conList[i].className = '';
	}
	navList[index].className = 'active';
	conList[index].className = 'active';
}


/* for (var i = 0; i < navList.length; i++) {
	navList[i].onclick = function () {
		changeTab(i); //=>当元素点击行为触发，执行对应函数的时候，我们遇到变量i，此时的i并不是当前上下文中的i，而是上级上下文EC(G)全局下的i；而全局下的i在循环结束的时候就已经是3了；
	};
} */

/* 利用闭包的保存作用：形成一个不被释放的私有上下文（这种方式是不好的，因为循环多少次，就形成多少个不销毁的上下文，很消耗性能，真实项目中是不推荐使用的） */
/* for (var i = 0; i < navList.length; i++) {
	navList[i].onclick = (function (i) {
		// i也是闭包中的私有变量
		return function () {
			changeTab(i);
		}
	})(i); // i是每一轮循环全局下的i
} */

// 这种方案的原理就是闭包，和上面没有啥区别
[].forEach.call(navList, function (item, index) {
	item.onclick = function () {
		changeTab(index);
	}
});

/* for (var i = 0; i < navList.length; i++) {
	navList[i].onclick = (function (n) {
		return function () {
			changeTab(n);
		}
	})(i);
} */

/* 
i=0 第一轮循环
    navList[0].onclick = (function (n) {
		自执行函数执行，形成一个私有的上下文EC(AN1)  [此上下文不会销毁]
			作用域链：<EC(AN1)，EC(G)>
			形参赋值：n=0
			变量提升：--
			代码执行:
		//=>return BBBFFF000;
		return function () {
			changeTab(n);
		} 
	})(i); //=>把当前全局变量i的值作为实参传递给自执行函数 ...(0)

	navList[0].onclick=BBBFFF000;

i=1 第二轮循环
	navList[1].onclick = (function (n) {
		自执行函数执行，形成一个私有的上下文EC(AN2)  [此上下文不会销毁]
			作用域链：<EC(AN2)，EC(G)>
			形参赋值：n=1
			变量提升：--
			代码执行:
		//=>return BBBFFF111;
		return function () {
			//=>点击哪一个LI就会把它绑定的办法执行，也会形成私有上下文EC(LI2)
			// 作用域链：<EC(LI2)，EC(AN2)>
			// 形参赋值：--
			// 变量提升：--
			// 代码执行：
			changeTab(n); //=>n不是私有变量，是EC(AN2)中的1
		} 
	})(1);

	navList[1].onclick=BBBFFF111;

......

循环结束后，全局i=3；这一套循环结束，我们每一轮循环都创建了一个不销毁的私有上下文（闭包）：EC(AN1)~EC(AN3)，而且每一个闭包中都有一个私有变量n，存储的是本轮循环全局i的值（EC(AN1)中的n=0  EC(AN1)中的n=1 ...）
 */







// 循环绑定点击事件（基于自定义属性解决循环事件绑定中索引i的问题）
/* for (var i = 0; i < navList.length; i++) {
	navList[i].index = i;
	navList[i].onclick = function () {
		changeTab(this.index);
	};
} */