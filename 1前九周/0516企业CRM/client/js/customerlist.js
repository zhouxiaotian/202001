let customerListModule = (function () {
	let $selectBox = $('.selectBox'),
		$searchInp = $('.searchInp'),
		$tableBox = $('.tableBox'),
		$tbody = $tableBox.find('tbody'),
		$pageBox = $('.pageBox');

	let lx = "my",
		limit = 10,
		page = 1,
		total = 0,
		totalPage = 1;

	// 从服务器端获取数完成数据绑定
	async function bindHTML() {
		let result = await axios.get("/customer/list", {
			params: {
				lx,
				type: $selectBox.val(),
				search: $searchInp.val().trim(),
				limit,
				page
			}
		});

		$tbody.html("");
		$pageBox.html("");
		if (result.code != 0) return;

		// 存储总数和总页数
		total = parseInt(result.total);
		totalPage = parseInt(result.totalPage);

		// 绑定表格的数据
		result = result.data;
		let str = ``;
		result.forEach(item => {
			let {
				id,
				name,
				sex,
				email,
				phone,
				QQ,
				weixin,
				type,
				address,
				userName
			} = item;
			str += `<tr>
				<td class="w8">${name}</td>
				<td class="w5">${sex==0?'男':'女'}</td>
				<td class="w10">${email}</td>
				<td class="w10">${phone}</td>
				<td class="w10">${weixin}</td>
				<td class="w10">${QQ}</td>
				<td class="w5">${type}</td>
				<td class="w8">${userName}</td>
				<td class="w20">${address}</td>
				<td class="w14" customerId="${id}">
					<a href="javascript:;">编辑</a>
					<a href="javascript:;">删除</a>
					<a href="visit.html?id=${id}">回访记录</a>
				</td>
			</tr>`;
		});
		$tbody.html(str);

		// 分页数据的绑定
		if (totalPage > 1) {
			str = ``;
			page > 1 ? str += `<a href="javascript:;">上一页</a>` : null;
			str += `<ul class="pageNum">`;
			for (let i = 1; i <= totalPage; i++) {
				str += `<li class="${i==page?'active':''}">${i}</li>`;
			}
			str += `</ul>`;
			page < totalPage ? str += `<a href="javascript:;">下一页</a>` : null;
			$pageBox.html(str);
		}
	}

	// 操作处理
	function handle() {
		$selectBox.change(bindHTML);

		$searchInp.keydown(ev => {
			if (ev.keyCode === 13) {
				bindHTML();
			}
		});

		$pageBox.click(ev => {
			let target = ev.target,
				TAG = target.tagName,
				TEXT = target.innerHTML,
				temp = page;
			if (TAG === "A") {
				if (TEXT === "上一页") {
					temp--;
				}
				if (TEXT === "下一页") {
					temp++;
				}
			}
			if (TAG === "LI") {
				temp = parseInt(TEXT);
			}
			temp !== page ? (page = temp, bindHTML()) : null;
		});
	}

	return {
		init() {
			// 获取传递进来的类型
			let params = window.location.href.queryURLParams();
			params.lx ? lx = params.lx : null;

			bindHTML();
			handle();
		}
	}
})();
customerListModule.init();