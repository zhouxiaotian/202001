// => $(document).ready(function(){}) 
// 当DOM结构加载完成才会触发执行
// 1.监听的是DOMContentLoaded事件（和load事件不同，window.onload是所有资源都加载完）
// 2.此操作也可以形成一个私有的闭包
$(function () {
	// 获取需要操作的DOM元素
	let $list = $('.list'),
		$btns = $list.find('i'),
		$countBoxs = $list.find('em'),
		$strongs = $list.find('strong'),
		$priceBoxs = $strongs.even(),
		$xiaojiBoxs = $strongs.odd();

	let $info = $('.info'),
		$infoEms = $info.find('em'),
		$totalBox = $infoEms.eq(0),
		$totalPriceBox = $infoEms.eq(1),
		$maxPriceBox = $infoEms.eq(2);

	// 计算最后的总数据
	function computed() {
		// 总数量
		let total = Array.from($countBoxs).reduce((n, item) => {
			return n + parseFloat($(item).html());
		}, 0);
		$totalBox.html(total);

		// 总价格
		let totalPrice = [...$xiaojiBoxs].reduce((n, item) => {
			return n + parseFloat($(item).html());
		}, 0);
		$totalPriceBox.html(totalPrice.toFixed(2));

		// 最高单价
		let arr = [0];
		$countBoxs.each((index, item) => {
			// 数量盒子的索引和单价盒子的索引是一一对应的
			if ($(item).html() >= 1) {
				// 购买过
				arr.push(parseFloat($priceBoxs.eq(index).html()));
			}
		});
		$maxPriceBox.html(Math.max(...arr));
	}
	computed();

	// 点击加减按钮控制数量和小计的变化
	// =>JQ内置循环机制：集合.xxx()操作，在JQ内部会执行循环操作，把集合中每一项都处理了
	$btns.on('click', function () {
		// this:当前点击的这个按钮
		let $this = $(this),
			flag = $this.attr('data-btn'),
			$parent = $this.parent(),
			$countBox = $parent.find('em'),
			$strongs = $parent.find('strong'),
			$xiaojiBox = $strongs.eq(1),
			$priceBox = $strongs.eq(0);

		let count = parseFloat($countBox.html());
		if (flag === "plus") {
			// 点击加号
			count++;
			count > 10 ? count = 10 : null;
		} else {
			// 点击减号
			count--;
			count < 0 ? count = 0 : null;
		}
		$countBox.html(count);

		let xiaoji = count * parseFloat($priceBox.html());
		$xiaojiBox.html(xiaoji.toFixed(2) + '元');

		computed();
	});

	// EM内容手动输入改变：oninput输入内容的时候触发
	$countBoxs.on('input', function () {
		let $this = $(this),
			$strongs = $this.parent().find('strong'),
			$xiaojiBox = $strongs.eq(1),
			$priceBox = $strongs.eq(0);

		let count = parseFloat($this.html());
		(isNaN(count) || count < 0) ? count = 0: null;
		count > 10 ? count = 10 : null;
		$this.html(count);

		let xiaoji = count * parseFloat($priceBox.html());
		$xiaojiBox.html(xiaoji.toFixed(2) + '元');
		computed();
	});
});

/* reduce:数组经典的迭代方法之一 */
/* let arr = [10, 20, 30, 40];
let total = arr.reduce((n, item) => {
	// n：上一次处理的结果 
	//   如果没有给REDUCE传递第二个参数：第一次N的初始值是数组第一项，ITEM是数组的第二项
	//   如果传递了第二个参数：第一次N的初始值就是这个参数值，ITEM是数组中的第一项
	//   上一次迭代中返回的是啥，这一次的N就是啥
	// item：数组每次遍历的这一项

	// RETURN是啥，相当于这一次的处理结果是啥
	// console.log(n, item); //=> 0 10 / 10 20 / 30 30 / 60 40
	return n + item;
}, 0);
console.log(total); */