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
				let str = `<div class="card">
					<a href="${link}">
						<div class="lazyImageBox" style="height:${height}px">
							<img src="" alt="" data-image="${pic}">
						</div>
						<p>${title}</p>
					</a>
				</div>`;

				columns[index].innerHTML += str;
				//=>原来添加的不能删掉，所以是加等于
			});
		}
	};


	return {
		init() {
			queryData();
			bindHTML();
		}
	}
})();
cascadeFlowModule.init();