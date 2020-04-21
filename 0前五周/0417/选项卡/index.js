/*
 * 基于JQ封账选项卡插件
 *   要求符合固定的结构
 * 		1.样式类为TAB的UL中包含了多个页卡LI
 *      2.UL的同级有和LI个数相同的DIV作为切换的内容 
 *      ......
 *   封装一个方法：tabplugin
 *      $xxx.tabplugin(); 实现选项卡效果
 *      $xxx.tabplugin({
 *          initIndex:0,  初始哪一个页卡默认展示
 *          effect:'click' 哪一种事件行为操作控制页卡的切换 
 *      });
 * 
 *   封装JQ插件一般都是向原型上扩展方法，这样才能让元素进行调用
 */
$.fn.extend({
	/* 扩展的选项卡插件 */
	tabplugin(option = {}) {
		// 参数初始化处理
		option = Object.assign({
			initIndex: 0,
			effect: 'click'
		}, option);

		// THIS:我们操作的这个选项卡容器
		let $this = $(this),
			$navList = $this.find('.tab>li'),
			$conList = $this.children('div'),
			prevIndex = option.initIndex;

		// 初始展示initIndex对应项
		$navList.eq(prevIndex).addClass('active')
			.siblings().removeClass('active');
		$conList.eq(prevIndex).addClass('active')
			.siblings('div').removeClass('active');

		// 点击谁选中谁
		$navList.on(option.effect, function () {
			// THIS:当前点击的LI
			let $this = $(this),
				index = $this.index();
			if (index === prevIndex) return;
			$navList.eq(prevIndex).removeClass('active');
			$conList.eq(prevIndex).removeClass('active');
			$this.addClass('active');
			$conList.eq(index).addClass('active');
			prevIndex = index;
		});
	}
});

$('#TAB1').tabplugin();
$('#TAB2').tabplugin({
	initIndex: 2
});
$('#TAB3').tabplugin({
	initIndex: 3,
	effect: 'mouseover'
});


/*
$(function () {
	let $tabBox = $('.tabBox'),
		$tab = $tabBox.children('.tab'),
		$navList = $tab.children('li'),
		$conList = $tabBox.children('div');

	// prevIndex记录上一次选中项的索引（初始是0，因为默认选中的是第一项）
	let prevIndex = 0;
	$navList.on('click', function () {
		let $this = $(this),
			index = $this.index();
		// 当前点击的和上一次选中的一样（不用做任何的处理）
		if (index === prevIndex) return;

		// 只移除上一次选中的
		$navList.eq(prevIndex).removeClass('active');
		$conList.eq(prevIndex).removeClass('active');

		// 让当前本次点击的有选中样式
		$this.addClass('active');
		$conList.eq(index).addClass('active');

		// 本次操作完，当前这一次点击的索引就是下一次点击的“上一次的索引”
		prevIndex = index;
	});
});
*/

/* 
$(function () {
	let $tabBox = $('.tabBox'),
		$tab = $tabBox.children('.tab'),
		$navList = $tab.children('li'),
		$conList = $tabBox.children('div');

	// 给所有的LI绑定点击事件
	$navList.on('click', function () {
		let $this = $(this),
			index = $this.index();

		// 点击谁让谁有选中样式，而让其兄弟没有选中的样式
		$this.addClass('active').siblings().removeClass('active');
		$conList.eq(index).addClass('active')
			.siblings('div').removeClass('active');
	});
});
*/

/* 
$(function () {
	let $tabBox = $('.tabBox'),
		$tab = $tabBox.children('.tab'),
		$navList = $tab.children('li'),
		$conList = $tabBox.children('div');

	// 给所有的LI绑定点击事件
	$navList.on('click', function () {
		// this : 当前点击的LI
		// index : 当前点击LI的索引（基于JQ方法获取的）
		let $this = $(this),
			index = $this.index();

		// 清空所有的选中样式
		$navList.removeClass('active');
		$conList.removeClass('active');

		// 当前点击的有选中的样式
		$this.addClass('active');
		$conList.eq(index).addClass('active');
	});
}); 
*/

/* 
// 默认参数
		let _default = {
			initIndex: 0,
			effect: 'click'
		};
		// 把传递进来的信息替换默认的信息
		$.each(option, (key, value) => {
			_default[key] = value;
		});
*/