/* 基于单例模式直接构建商品排序板块的功能 */
let shopModule = (function () {
	// 获取想要操作的元素
	let navList = document.querySelectorAll('.navbar-nav .nav-item'),
		productBox = document.querySelector('.productBox'),
		data = null;

	// 从服务器获取数据
	let queryData = function queryData() {
		let xhr = new XMLHttpRequest;
		xhr.open('GET', './json/product.json', false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
			}
		};
		xhr.send(null);
	};

	// 根据获取的数据，把产品信息渲染到页面中
	let render = function render() {
		let str = ``;
		data.forEach(item => {
			let {
				title,
				price,
				time,
				hot,
				img
			} = item;
			str += `<div class="card">
				<img src="${img}" class="card-img-top" alt="">
				<div class="card-body">
					<h5 class="card-title">${title}</h5>
					<p class="card-text">价格：￥${price.toFixed(2)}</p>
					<p class="card-text">销量：${hot}</p>
					<p class="card-text">时间：${time.replace(/-/g,'/')}</p>
				</div>
			</div>`;
		});
		productBox.innerHTML = str;
	};

	// 循环所有的LI，给每个按钮绑定点击事件
	let clear = function clear() {
		// this:点击的这个LI
		Array.from(navList).forEach(item => {
			if (item !== this) {
				item.flag = -1;
			}
		});
	};
	let handle = function handle() {
		Array.from(navList).forEach(item => {
			// 给每个LI设置自定义属性FLAG：升降序标识，初始-1
			item.flag = -1;
			item.onclick = function () {
				// this:点击的这个LI
				// 点击当前LI，按照当前维度排序，最好让其它的维度的FLAG回归初始-1，这样再点击其它的，才是继续从升序开始
				clear.call(this);
				// 不论点击哪一个LI，进来第一步都是把当前LI的升降序标识乘以-1，从而实现1和-1之间的切换（也就是升降序的切换）
				this.flag *= -1;
				// 在结构中把每一个LI排序的标字段设置为自定义属性，点击的时候获取它的排序字段 pai='price'/'time'/'hot'
				let pai = this.getAttribute('data-pai');
				data.sort((a, b) => {
					// 只有字符串才有replace方法，我们把获取的结果都先变为字符串
					a = String(a[pai]).replace(/-/g, '');
					b = String(b[pai]).replace(/-/g, '');
					return (a - b) * this.flag;
				});
				render();
			};
		});
	};

	return {
		// 模块的入口，在这里能够按照该有的顺序，依次实现整个模块相关的功能
		init() { //init:function(){...}
			queryData();
			render();
			handle();
		}
	};
})();
shopModule.init();