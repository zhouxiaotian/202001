/*
 * EC(G)变量提升
 *   var test; 
 */
// 把自执行函数执行的返回值赋值给TEST=BBBFFF000
var test = (function (i) {
	/*
	 * EC(AN1)私有上下文 （闭包）
	 *   作用域链：<EC(AN1),EC(G)>
	 *   形参赋值：i = 2
	 *   变量提升：--
	 */
	//return BBBFFF000;
	return function () {
		/*
		 * TEST(5)私有的上下文 EC(T1)
		 *   作用域链:<EC(T1),EC(AN1)>
		 *   形参赋值:--
		 *   变量提升:--
		 */
		alert(i *= 2); //=>i=i*2  让EC(AN1)中的i=4   //=>输出'4'
	};
})(2);
test(5);