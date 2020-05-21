/*
 * DOM结构加载完触发执行（可以获取到页面中的DOM元素）
 * 形成一个闭包 
 */
$(function () {
	let $container = $('.container'),
		$slideList = $container.find('.slide'),
		$paginationList = $container.find('.pagination>li'),
		$changeLeft = $container.children('.changeLeft'),
		$changeRight = $container.children('.changeRight');

	// STEP当前展示的SLIDE的索引
	// PREV上一次展示的SLIDE的索引
	let step = 0,
		prev = 0,
		interval = 1000,
		autoTimer = null;

	// AUTOMOVE自动切换
	function autoMove() {
		/* if (step === ($slideList.length - 1)) {
			// 当前已经是最后一张，我们应该让其显示第一张
			prev = $slideList.length - 1;
			step = 0;
		} else {
			prev = step;
			step++;
		} */
		prev = step;
		step++;
		step > ($slideList.length - 1) ? step = 0 : null;

		let $cur = $slideList.eq(step),
			$pre = $slideList.eq(prev);
		// 先改变层级关系
		$cur.css('zIndex', 1);
		$pre.css('zIndex', 0);
		// 改变透明度（当前张从零变为一[300MS]之后，让上一张直接变为零）
		// once是当前事件只绑定一次(触发一次后就移除绑定)
		// transitionend监听CSS3过渡动画完成事件
		$cur.css({
			transitionDuration: '.3s',
			opacity: 1
		}).one('transitionend', () => {
			$pre.css({
				transitionDuration: '0s',
				opacity: 0
			});
		});
	}


	// 加载页面开始自动切换
	autoTimer = setInterval(autoMove, interval);


});