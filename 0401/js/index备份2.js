(function () {
	// 获取需要操作的DOM元素
	let navList = document.querySelectorAll('.navbar-nav .nav-item'),
		productBox = document.querySelector('.productBox'),
		cardList = null,
		data = null;

	// 从服务器获取数据（AJAX）
	let xhr = new XMLHttpRequest;
	xhr.open('GET', './json/product.json', false);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			data = JSON.parse(xhr.responseText);
		}
	};
	xhr.send(null);

	// 数据绑定
	let str = ``;
	for (let i = 0; i < data.length; i++) {
		let item = data[i];
		let {
			id,
			title,
			price,
			time,
			hot,
			img
		} = item;
		str += `<div class="card" data-price="${price}" data-time="${time}"
			data-hot="${hot}">
			<img src="${img}" class="card-img-top" alt="">
			<div class="card-body">
				<h5 class="card-title">${title}</h5>
				<p class="card-text">价格：￥${price.toFixed(2)}</p>
				<p class="card-text">销量：${hot}</p>
				<p class="card-text">时间：${time}</p>
			</div>
		</div>`;
	}
	productBox.innerHTML = str;
	cardList = productBox.querySelectorAll('.card');

	// 点击按照价格的升降序
	let flag = -1;
	navList[0].onclick = function () {
		flag *= -1;

		let arr = Array.from(cardList);
		// 排序的核心：a的价格-b的价格是升序（b的价格-a的价格就是降序）
		arr.sort((a, b) => {
			return (a.getAttribute('data-price') - b.getAttribute('data-price')) * flag;
		});
		for (let i = 0; i < arr.length; i++) {
			productBox.appendChild(arr[i]);
		}
	};

	// 点击按照时间的升降序
	navList[1].flag = -1; //=>把当前按照日期进行升降序排序的标识，不是创建一个变量，而是给当前按钮的自定义属性（好处：每一个按钮都可以设置自己独有的升降序标识）
	navList[1].onclick = function () {
		// this => navList[1]
		this.flag *= -1;

		let arr = Array.from(cardList);
		arr.sort((a, b) => {
			// 把日期数据变为数字才能相减
			// 箭头函数中的this是其上下文中的THIS  => navList[1]
			a = a.getAttribute('data-time');
			b = b.getAttribute('data-time');
			a = a.replace(/-/g, '');
			b = b.replace(/-/g, '');
			return (a - b) * this.flag;
		});
		for (let i = 0; i < arr.length; i++) {
			productBox.appendChild(arr[i]);
		}
	};
})();