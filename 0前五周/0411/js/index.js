let cascadeFlowModule = (function () {
	let columns = Array.from(document.querySelectorAll('.column')),
		_data = [];

	// 从服务器获取数据
	let queryData = function queryData() {
		let xhr = new XMLHttpRequest;
		xhr.open('GET', 'json/data.json', false);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				_data = JSON.parse(xhr.responseText);
			}
		};
		xhr.send(null);
	};

	// 实现数据绑定
	let bindHTML = function bindHTML() {
		// 按照获取的数据排序，不能直接按照数据中的图片高度排序，因为我们数据中每一张图片的宽度和高度是不一样的，我们最后要渲染到240大小的窗口中，这样图片的宽度会缩放，那么为了保证图片不变形，高度也应该跟着进行缩放（我们排序比较的高度，应该是最后放到230窗口中，最后会渲染的高度来进行排序，这样才准确） =>我们可以把获取的数据，按照真实图片的宽度和渲染宽度230做对比，把其渲染高度计算处理（修改获取的数据）
		_data = _data.map(item => {
			// 数据中图片的真实宽度和高度
			let w = item.width,
				h = item.height;
			// 真实渲染的高度
			h = h / (w / 230);
			item.width = 230;
			item.height = h;
			return item;
		});

		// 按照三个为一组进行循环（最后一组可能不到三项）
		for (let i = 0; i < _data.length; i += 3) {
			// group:就是每一轮获取的三个数据，把数据按照渲染的高度进行排序（升序）
			let group = _data.slice(i, i + 3);
			group.sort((a, b) => {
				return a.height - b.height;
			});
			// 把三个列按照现在的高度进行排序（降序）
			columns.sort((a, b) => {
				return b.offsetHeight - a.offsetHeight;
			});

			// 循环三个数据中的每一项：每循环一项，创建一个CARD，把创建的CARD放到对应的列中即可
			group.forEach((item, index) => {
				let {
					pic,
					link,
					title,
					height
				} = item;
				let card = document.createElement('div');
				card.className = "card";
				card.innerHTML = `<a href="${link}">
					<div class="lazyImageBox" style="height:${height}px">
						<img src="" alt="" data-image="${pic}">
					</div>
					<p>${title}</p>
				</a>`;
				columns[index].appendChild(card);
				
				/* let str = `<div class="card">
					<a href="${link}">
						<div class="lazyImageBox" style="height:${height}px">
							<img src="" alt="" data-image="${pic}">
						</div>
						<p>${title}</p>
					</a>
				</div>`;
				columns[index].innerHTML += str;//=>原来添加的不能删掉，所以是加等于 */
			});
		}
	};

	// 延迟加载
	let lazyFunc = function lazyFunc() {
		// 所有的lazyImageBoxs都要进行延迟加载的处理
		let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
		[].forEach.call(lazyImageBoxs, lazyImageBox => {
			// 处理过的盒子就不要在处理了
			let isLoad = lazyImageBox.getAttribute('isLoad');
			if (isLoad === "true") return;
			// 获取lazyImageBox一半的位置距离BODY顶端的距离
			// 获取浏览器底边距离BODY顶端的距离
			let B = utils.offset(lazyImageBox).top +
				lazyImageBox.offsetHeight / 2;
			let A = document.documentElement.clientHeight +
				document.documentElement.scrollTop;
			// 延迟加载的条件：盒子距离BODY的距离小于浏览器距离BODY的距离
			if (B <= A) {
				// 单张加载处理
				lazyImg(lazyImageBox);
			}
		});
	};
	let lazyImg = function lazyImg(lazyImageBox) {
		let img = lazyImageBox.querySelector('img'),
			dataImage = img.getAttribute('data-image'),
			tempImage = new Image;
		tempImage.src = dataImage;
		tempImage.onload = () => {
			img.src = dataImage;
			utils.css(img, 'opacity', 1);
		};
		img.removeAttribute('data-image');
		tempImage = null;
		// 给当前处理的盒子记录已经处理过的标识  setAttribute设置的自定义属性值都是字符串（即使编写的不是字符串，最后转换为字符串）
		lazyImageBox.setAttribute('isLoad', 'true');
	};

	// 加载更多数据
	let isRender;
	let loadMoreData = function loadMoreData() {
		let HTML = document.documentElement;
		// 一屏幕的高度+卷去的高度+半屏幕高度 >= 真实高度  
		// 滚动到底部了
		if (HTML.clientHeight + HTML.clientHeight / 2 + HTML.scrollTop >= HTML.scrollHeight) {
			// 加载更多数据：获取数据（此时我们获取一样的，真实项目中我们可以传递不同的参数给服务器，获取更多不同的数据）+继续绑定数据+新绑定的数据做一下延迟加载
			// isRender：每一次重新加载之前，标记为true证明正在加载中，后期条件再次出发，只要没有加载完，不会重新加载；在第一次加载完，在让其变为false...
			if (isRender) return;
			isRender = true;
			queryData();
			bindHTML();
			lazyFunc();
			isRender = false;
		}
	};

	return {
		init() {
			queryData();
			bindHTML();
			lazyFunc();
			window.onscroll = function () {
				// 现有图片的延迟加载
				lazyFunc();
				// 加载更多数据
				loadMoreData();
			};
		}
	}
})();
cascadeFlowModule.init();