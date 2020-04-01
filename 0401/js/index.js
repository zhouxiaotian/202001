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
	console.log(data);








})();