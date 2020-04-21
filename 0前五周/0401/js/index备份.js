/* 以后写代码第一件事情应当就想到“闭包”：保护作用 */
(function () {
	// 获取需要操作的DOM元素
	let navList = document.querySelectorAll('.navbar-nav .nav-item'),
		productBox = document.querySelector('.productBox'),
		cardList = null,
		data = null;

	// 从服务器获取数据（AJAX）
	// ->从服务器获取的结果是JSON格式的字符串（我们需要把其处理为对象再操作）
	// ->vscode预览的时候，我们基于 open with live server 来预览，让页面地址是：http://127.0.0.1:5500...这种网络协议格式，而不是 file://E:... 文件协议格式，因为文件协议不能发送AJAX请求
	let xhr = new XMLHttpRequest;
	xhr.open('GET', './json/product.json', false);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			data = JSON.parse(xhr.responseText);
		}
	};
	xhr.send(null);

	// 数据绑定
	// 我们从服务器获取的数据是一个数组，数组中有多少项，证明有多少个产品，此时我们创建多少个CAED盒子（展示不同的产品信息），最好把所有创建好的CARD放到容器中即可
	let str = ``; //=>ES6的模板字符串（两个撇）
	for (let i = 0; i < data.length; i++) {
		let item = data[i]; //=>item是获取的每一个产品对象
		let {
			id,
			title,
			price,
			time,
			hot,
			img
		} = item;
		// ${}是在ES6的模板字符串中拼接一个JS表达式（执行有结果的JS语句）的结果
		// 结构中写的 data-xxx 一般都是设置自定义属性
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
	// 数据绑定完，获取到页面中创建的10个CARD盒子（cardList：存储的是CARD的元素对象，他是一个节点集合）
	cardList = productBox.querySelectorAll('.card');

	// 点击价格按照价格的升序排序
	// navList[0] 集合中的第一项就是价格这个按钮
	navList[0].onclick = function () {
		// 先把类数组集合变为数组（目的是一会用SORT排序）
		let arr = Array.from(cardList);

		// 需求在循环数据绑定的时候，我们可以知道每一个产品的价格、销量、日期等数据，但是此时我们是想在点击按钮的时候，也拿到这个值，只有难道这些值才能进行排序比较的 => 之前的一些信息，需要在后续的某个操作中使用，此时我们可以在之前把信息存储到当前元素的“自定义属性上”，后续需要的时候直接从自定义属性中获取即可
		arr.sort((a, b) => {
			// b:数组中的当前项
			// a:当前项的后一项
			// 此时a/b在就是数组中每一个CARD元素对象
			// 返回的结果是<0的值，让a和b交换位置，否则位置不变，以此来实现排序效果
			return a.getAttribute('data-price') - b.getAttribute('data-price');
		});

		// 光数组排完序还是不够的，我们需要按照最新的顺序，把每一个CARD放到页面中
		for (let i = 0; i < arr.length; i++) {
			// appendChild：把元素添加到容器的末尾
			productBox.appendChild(arr[i]);
		}
	};


})();
/* 
let arr = [10, 20, 30],
	flag = 1;
arr.sort((a, b) => {
	/!* // 第一次执行：a=20 b=10   flag=-1  交换位置  [20, 10, 30]
	// 第二次执行：b=20 a=30   flag=1  不交换位置 [20, 10, 30]
	// 第三次执行：b=30 a=10   flag=-1 交换位置 [20, 30, 10]
	debugger;
	console.log(a, b);
	flag = flag * -1;
	return flag; *!/
	// a 当前比较的下一项
	// b 比较的当前项
	// 返回小于零的的值，则两者交换位置
});
// console.log(arr); //=>[20,30,10] */