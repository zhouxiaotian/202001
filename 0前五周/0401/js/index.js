/* 基于单例模式实现业务板块的开发 */
let shopModule = (function () {
	let navList = document.querySelectorAll('.navbar-nav .nav-item'),
		productBox = document.querySelector('.productBox'),
		cardList = null,
		data = null;

	// queryData：从服务器获取数据
	let queryData = function queryData() {
		let xhr = new XMLHttpRequest;
		xhr.open('GET', './json/product.json', false);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
			}
		};
		xhr.send(null);
	};

	// bindHTML：完成数据绑定
	let bindHTML = function bindHTML() {
		let str = ``;
		data.forEach(item => {
			let {
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
		});
		productBox.innerHTML = str;
		cardList = productBox.querySelectorAll('.card');
	};

	// clear：控制除当前点击LI以外的，升降序标识都回归1
	let clear = function clear() {
		// this : 当前点击的这个LI
		[].forEach.call(navList, item => {
			if (item !== this) {
				item.flag = -1;
			}
		});
	};

	// sortCard：排序
	let sortCard = function sortCard(i) {
		// this : 当前点击的这个LI
		let arr = Array.from(cardList);
		let char = "data-price";
		i === 1 ? char = 'data-time' : null;
		i === 2 ? char = 'data-hot' : null;
		arr.sort((a, b) => {
			a = a.getAttribute(char);
			b = b.getAttribute(char);
			if (char === 'data-time') {
				a = a.replace(/-/g, '');
				b = b.replace(/-/g, '');
			}
			return (a - b) * this.flag;
		});
		for (let j = 0; j < arr.length; j++) {
			productBox.appendChild(arr[j]);
		}
	};

	// handleNav：按钮的循环事件绑定
	let handleNav = function handleNav() {
		[].forEach.call(navList, (item, index) => {
			item.flag = -1;
			item.onclick = function () {
				// this : 当前点击的这个LI
				clear.call(this);
				this.flag *= -1;
				sortCard.call(this, index);
			};
		});
	};

	return {
		init() {
			// 大脑中枢：控制所有的方法按照逻辑依次执行
			queryData();
			bindHTML();
			handleNav();
		}
	};
})();
shopModule.init();