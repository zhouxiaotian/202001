// 请说出 “箭头函数和普通函数“ 的区别？
/* 
 1. 箭头函数没有ARGUMENTS
 2. 箭头函数没有THIS（THIS是所在上下文中的THIS）
 3. 箭头函数没有构造函数和原型属性，所以不能被NEW

 箭头函数中不能使用ARGUMENTS来获取实参集合，但是ES6中给我们提供剩余运算符，可以获取到传递的所有实参，而且结果是一个数组，这样就不用再把ARGUMENTS这个类数组基于ARRAY.PROTOTYPE.SLICE.CALL的方式转换为数组了，用起来更加的方便

 箭头函数中没有自己的THIS，THIS是所在上下文中的THIS，所以真实开发的时候，是要和传统的函数配合一起来使用；例如：我经常把回调函数设置为箭头函数，这样在回调函数中用到THIS也是其所在上下文中的THIS，很方便，无需在外侧定义一个变量来存储THIS了... 再比如，我们最外层的函数，一般都用普通函数，这样可以有效的保存住自己独有的THIS，供后面使用...在Vue中，内部做了处理，保证每一个METHODS方法中的THIS都是实例，但是REACT并没有这样处理，所以，REACT组件中，编写的方法一般以箭头函数偏多...
     let obj={
		x:100,
		func:function func(){
			// this=>obj
			let _this=this;
			setTimeout(function(){
				// this=>window
				console.log(_this.x);
			},1000);
		}
	 };
	 obj.func();

	 ====改善后的代码
	 
	 let obj={
		x:100,
		func:function func(){
			setTimeout(()=>{
				console.log(this.x);
			},1000);
		}
	 };
	 obj.func();

   箭头函数没有构造函数和原型属性，所以不能被NEW
*/

// let func = (...args) => {
// 	// args => [...]
// };