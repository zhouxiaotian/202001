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

	// 循环事件绑定：点击每一个LI按照对应的标识进行升降序排序
	for (let i = 0; i < navList.length; i++) {
		let item = navList[i];
		// 给每个LI设置自定义属性FLAG：存储自己升降序的标识
		item.flag = -1;
		item.onclick = function () {
			let arr = Array.from(cardList);
			//=>控制“其他按钮”的升降序标识回归-1
			for (let z = 0; z < navList.length; z++) {
				if (navList[z] !== this) {
					navList[z].flag = -1;
				}
			}
			//=>控制升降序
			this.flag *= -1;
			//=>控制排序的维度标识
			let char = "data-price";
			i === 1 ? char = 'data-time' : null;
			i === 2 ? char = 'data-hot' : null;
			arr.sort((a, b) => {
				a = a.getAttribute(char);
				b = b.getAttribute(char);
				if (char === 'data-time') {
					// 如果是按照日期排序，需要去掉中杠
					a = a.replace(/-/g, '');
					b = b.replace(/-/g, '');
				}
				return (a - b) * this.flag;
			});

			for (let j = 0; j < arr.length; j++) {
				productBox.appendChild(arr[j]);
			}
		};
	}
})();