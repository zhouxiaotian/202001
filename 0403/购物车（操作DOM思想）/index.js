let shopModule = (function () {
	// 获取所需要的DOM元素
	let list = document.querySelector('.list'),
		btns = list.querySelectorAll('i'),
		countInps = list.querySelectorAll('em'),
		strongs = list.querySelectorAll('strong'),
		priceArr = [],
		subtotalArr = [];
	// 在所有的STRONG标签中，分出单价和小计的
	[].forEach.call(strongs, (item, index) => {
		if (index % 2 === 0) {
			priceArr.push(item);
		} else {
			subtotalArr.push(item);
		}
	});
	let ems = document.querySelectorAll('.info em'),
		totalQuantity = ems[0],
		totalPrice = ems[1],
		maxPrice = ems[2];

	// 计算总信息
	let computedInfo = function computedInfo() {
		// 总数量 && 已购买商品单价集合
		let counts = 0,
			arr = [0];
		[].forEach.call(countInps, (item, index) => {
			let n = parseFloat(item.innerHTML);
			counts += n;
			if (n > 0) {
				arr.push(parseFloat(priceArr[index].innerHTML));
			}
		});
		totalQuantity.innerHTML = counts;
		maxPrice.innerHTML = Math.max(...arr);

		// 总价格
		let total = 0;
		subtotalArr.forEach(item => {
			total += parseFloat(item.innerHTML);
		});
		totalPrice.innerHTML = total;
	};

	// 给所有的+/-绑定事件
	let handle = function handle() {
		[].forEach.call(btns, item => {
			item.onclick = function () {
				let flag = this.getAttribute('data-btn'),
					parent = this.parentNode,
					em = parent.querySelector('em'),
					strongs = parent.querySelectorAll('strong');
				// 数量处理
				if (flag === 'minus') {
					em.innerHTML--;
					em.innerHTML < 0 ? em.innerHTML = 0 : null;
				} else {
					em.innerHTML++;
				}
				// 小计处理
				strongs[1].innerHTML = em.innerHTML * parseFloat(strongs[0].innerHTML) + '元';
				// 重新计算总信息
				computedInfo();
			};
		});
	};

	return {
		init() {
			handle();
		}
	};
})();
shopModule.init();