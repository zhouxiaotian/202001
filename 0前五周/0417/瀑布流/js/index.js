let imageModule = (function () {
	// 获取需要操作的元素
	let $columns = $('.column'),
		$lazyBoxs = null,
		_data = [],
		isRuning = false, //=>没有正在加载数据
		count = 1;

	// 从服务器获取数据（AJAX请求）
	let queryData = function queryData() {
		// JQ中提供了从服务获取数据的AJAX方法
		$.ajax({
			// 请求的接口地址
			url: 'json/data.json',
			// 请求方式
			method: 'get',
			// 把从服务器获取的结果预设为JSON对象格式
			dataType: 'json',
			// 开始同步请求（在数据没有请求回来之前，其余的事情都无法处理）
			async: false,
			// JQ封装：当从服务器获取到数据后，触发的函数，形参RESULT存储的值就是我们从服务器端获取的数据
			success: result => {
				_data = result;
			}
		});
	};

	// 实现数据的绑定
	let bindHTML = function bindHTML() {
		// 计算图片渲染的宽度和高度
		_data = _data.map(item => {
			let {
				width,
				height
			} = item;
			// 计算宽度缩放比例
			let n = width / 230;
			// 获取到渲染的高度
			height = height / n;
			// 进行替换
			item.width = 230;
			item.height = height;
			return item;

			/* return {
				// 把之前的数据拷贝一份
				...item,
				// 在把宽高修改一下即可
				width: 230,
				height: height
			}; */
		});

		// 循环获取的数据（每三个为一组进行循环）
		for (let i = 0; i < _data.length; i += 3) {
			// GROUP获取的每一组数据
			let group = _data.slice(i, i + 3);

			// 第一次不排序直接插入
			if (i !== 0) {
				// 把数据升序，把列降序
				// 值得注意的是：从服务器获取的图片，它们的宽度不一定是一样的，也不一定和最后渲染到页面中的宽度是一致的，所以我们需要按照最后的渲染宽度，计算出图片的缩放比例，从而得到最后准确渲染的高度，以这个高度进行排序才是准确的
				group.sort((a, b) => a.height - b.height);
				// $.fn.sort===Array.prototype.sort
				$columns.sort((a, b) => b.offsetHeight - a.offsetHeight);
			}

			// 把排好序的数据插入到每一列中（循环GROUP中的每一项，根据每一项的数据动态创建CARD盒子，最后插入到指定的列中即可） =>基于JQ中的EACH遍历
			$.each(group, (index, item) => {
				let {
					link,
					pic,
					height,
					title
				} = item;
				$(`<div class="card">
					<a href="${link}">
						<div class="lazyImageBox" 
							style="height:${height}px">
							<img src="" alt="" data-image="${pic}">
						</div>
						<p>${title}</p>
					</a>
				</div>`).appendTo($columns.eq(index));
			});
		}

		// 每一次数据绑定完成，我们最好获取到所有的lazyImageBox（条件：只有它里面的图片有DATA-IMAGE自定义属性的，才是没有处理过的，我们再获取处理）
		// $lazyBoxs = $('.lazyImageBox');
	};

	// 图片的延迟加载（出现在视口中的图片延迟加载）
	let lazyFunc = function lazyFunc() {
		// 获取到所有的lazyImageBox（条件：只有它里面的图片有DATA-IMAGE自定义属性的，才是没有处理过的，我们再获取处理）
		// JQ:filter用来进行筛选的
		$lazyBoxs = $('.lazyImageBox').filter((index, item) => {
			// 有自定义属性获取的值，没有是null；返回的null，则当前项不会出现在最后的结果中；filter特点是只把RETURN结果是TRUE的筛选到；
			return $(item).find('img').attr('data-image');
		});

		// 遍历集合中的每一项，给每一项做图片的延迟加载
		$lazyBoxs.each((index, item) => {
			// 当前ITEM（图片所在的盒子）底边距离BODY的距离<=浏览器底边距离BODY的距离
			let $window = $(window),
				$item = $(item);
			let A = $window.outerHeight() + $window.scrollTop(),
				B = $item.outerHeight() + $item.offset().top;
			if (B <= A) {
				// 开始单张图片延迟加载 
				// JQ:find查找容器后代中的某些元素
				// JQ:attr获取或者设置元素的自定义属性值 removeAttr移除自定义属性
				let $img = $item.find('img'),
					dataImage = $img.attr('data-image'),
					tempImage = new Image;
				tempImage.src = dataImage;
				tempImage.onload = () => {
					// 图片地址是正确的，能够正常加载
					// JQ:css操作样式的
					// JQ:支持链式写法
					$img.attr('src', dataImage).css({
						// CSS3中设置了TRANSITION动画
						opacity: 1
					});
				};
				tempImage = null;
				$img.removeAttr('data-image');
			}
		});
	};

	// 加载更多的数据
	let loadMore = function loadMore() {
		// 条件：滚动到页面的底部(一屏幕高度+卷去的高度=页面真实高度，代表滚动到页面的底部了，但是页面真实高度是一个约等于的值，不准确，所以我们需要设置一定的误差)
		let $window = $(window),
			winH = $window.outerHeight(),
			scrollT = $window.scrollTop(),
			scrollH = $('body').outerHeight(); //=>获取页面真实的高度
		if (winH + scrollT + winH / 2 >= scrollH) {
			if (isRuning) return; //=>上一次数据没有加载完成之前，什么事情都不会操作
			isRuning = true; //=>正在加载

			// 每一次加载计数
			count++;
			if (count > 5) {
				isRuning = false;
				return;
			}

			// 滚动到页面底部了，加载更多数据
			queryData();
			bindHTML();
			lazyFunc();
			isRuning = false; //=>数据加载完了
		}
	};

	return {
		init() {
			queryData();
			bindHTML();
			lazyFunc();

			// JQ中的事件绑定：$元素.on([事件],[函数])
			$(window).on('scroll', function () {
				lazyFunc();
				loadMore();
			});
		}
	};
})();
imageModule.init();