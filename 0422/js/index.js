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
	paginationFocus();
}

// 焦点对齐
function paginationFocus() {
	let tempStep = step;
	tempStep === (len - 1) ? tempStep = 0 : null;
	// 循环焦点每一项，根据焦点的索引和当前步长做对比，控制哪一个焦点选中
	[].forEach.call(paginationList, (item, index) => {
		if (index === tempStep) {
			item.className = 'active';
			return;
		}
		item.className = '';
	});
}

// 加载页面:开始自动轮播
autoTimer = setInterval(autoMove, interval);

// 鼠标进入到CONTAINER停止自动轮播，离开后自动轮播可以继续
container.onmouseenter = function () {
	clearInterval(autoTimer);
};
container.onmouseleave = function () {
	autoTimer = setInterval(autoMove, interval);
};

// 点击焦点实现切换
[].forEach.call(paginationList, (item, index) => {
	item.onclick = function () {
		// 如果点击的这一项索引正好是现在展示的这一张，则无需在处理（特殊项：点击的是第一个焦点，并且当前正好展示的也是克隆的这个SLIDER项）
		if (index === step || (index === 0 && step === (len - 1))) {
			return;
		}

		// 点击项的索引是谁，就让WRAPPER切换到哪一张即可
		step = index;
		wrapper.style.transitionDuration = '0.3s';
		wrapper.style.left = -step * 800 + 'px';

		// 焦点对齐
		paginationFocus();
	};
});

// 点击左右按钮实现切换（右边按钮简单，因为点击右边按钮和自动轮播一致）
changeRight.onclick = autoMove;
changeLeft.onclick = function () {
	// 如果当前已经是真实的第一张，再减减左侧没东西了，此时我们让其快速移动端克隆的第一张（末尾），然后紧接着运动到倒数第二张（真实的最后一张）
	if (step === 0) {
		step = len - 1;
		wrapper.style.transitionDuration = '0s';
		wrapper.style.left = -step * 800 + 'px';
		wrapper.offsetWidth;
	}
	step--;
	wrapper.style.transitionDuration = '0.3s';
	wrapper.style.left = -step * 800 + 'px';
	paginationFocus();
};