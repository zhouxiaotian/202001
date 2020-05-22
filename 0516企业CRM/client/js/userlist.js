let userListModule = (function () {
	let $deleteAll = $('.deleteAll'),
		$selectBox = $('.selectBox'),
		$searchInp = $('.searchInp'),
		$tableBox = $('.tableBox'),
		$tbody = $tableBox.find('tbody');

	// 绑定部门信息
	async function bindDepart() {
		let result = await queryDepart();
		if (result.code == 0) {
			let str = ``;
			result.data.forEach(item => {
				str += `<option value="${item.id}">${item.name}</option>`;
			});
			$selectBox.append(str);
		}
	}

	// 从服务器获取员工列表进行绑定
	async function bindHTML() {
		let params = {
			departmentId: $selectBox.val(),
			search: $searchInp.val().trim()
		};
		let result = await axios.get('/user/list', {
			params
		});
		if (result.code != 0) return;

		let str = ``;
		result.data.forEach(item => {
			let {
				id,
				name,
				sex,
				email,
				phone,
				department,
				job,
				desc
			} = item;
			str += `<tr>
				<td class="w3"><input type="checkbox"></td>
				<td class="w10">${name}</td>
				<td class="w5">${sex==0?'男':'女'}</td>
				<td class="w10">${department}</td>
				<td class="w10">${job}</td>
				<td class="w15">${email}</td>
				<td class="w15">${phone}</td>
				<td class="w20">${desc}</td>
				<td class="w12">
					<a href="javascript:;">编辑</a>
					<a href="javascript:;">删除</a>
					<a href="javascript:;">重置密码</a>
				</td>
			</tr>`;
		});
		$tbody.html(str);
	}

	// 搜索触发数据的重新绑定
	function searchHandle() {
		$selectBox.change(bindHTML);
		$searchInp.on('keydown', ev => {
			if (ev.keyCode === 13) {
				// 按下的是ENTER键
				bindHTML();
			}
		});
	}

	return {
		init() {
			bindDepart();
			bindHTML();
			searchHandle();




		}
	}
})();
userListModule.init();