// 获取需要操作的DOM元素
let container = document.querySelector('.container'),
	wrapper = container.querySelector('.wrapper'),
	sliderList = wrapper.querySelectorAll('.slider'),
	pagination = container.querySelector('.pagination'),
	paginationList = pagination.querySelectorAll('li'),
	changeLeft = container.querySelector('.changeLeft'),
	changeRight = container.querySelector('.changeRight');

// 定义公共数据
// step:步长，控制当前展示的是一个SLIDER（索引）
// interval:间隔时间因子，控制多久切换一次
// autoTimer:存储自动轮播的定时器
// len:存储的是SLIDER的个数（包含克隆的那一个）
let step = 0,
	interval = 1000,
	autoTimer = null,
	len = sliderList.length;

// 自动轮播的方法
function autoMove() {
	if (step === (len - 1)) {
		// 当到达指定间隔时间再一次执行AUTO-MOVE的时候，我们需要验证当前是否已经为最后一张（也就是克隆的第一张），如果是，我们则需要让其立即运动到真实的第一张
		step = 0;
		wrapper.style.transitionDuration = '0s';
		wrapper.style.left = '0px';
		// 基于获取元素的样式来中断渲染队列的存储，让立即回到第一张的操作先渲染
		wrapper.offsetWidth;
	}
	step++;
	wrapper.style.transitionDuration = '0.3s';
	wrapper.style.left = -step * 800 + 'px';
}
autoTimer = setInterval(autoMove, interval);