let shopModule = (function () {
	// 获取需要操作的元素
	let box = document.querySelector('.box');

	// 构建数据模型
	let data = [{
		id: 1,
		count: 0,
		price: 12.5
	}, {
		id: 2,
		count: 0,
		price: 10.5
	}, {
		id: 3,
		count: 0,
		price: 8.5
	}, {
		id: 4,
		count: 0,
		price: 8
	}, {
		id: 5,
		count: 0,
		price: 14.5
	}];

	// 渲染数据
	let render = function render() {
		let str = `<ul class="list">`;
		data.forEach(item => {
			str += `<li>
				<i></i>
				<em>0</em>
				<i></i>
				<span>
					单价：<strong>12.5元 </strong> 小计：<strong>0元</strong>
				</span>
			</li>`;
		});
		str += `</ul>`;
		str += `<div class="info">
			<span>商品公合计：<em>0</em>件</span>
			<span>共花费了：<em>0</em>元</span>
			<br />
			<br />
			<span>其中最贵的商品单价是：<em>0</em>元</span>
		</div>`;
		box.innerHTML = str;
	};

	return {
		init() {
			render();
		}
	};
})();
shopModule.init();