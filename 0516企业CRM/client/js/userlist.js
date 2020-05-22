let userListModule = (function () {
	let $deleteAll = $('.deleteAll'),
		$selectBox = $('.selectBox'),
		$searchInp = $('.searchInp'),
		$tableBox = $('.tableBox'),
		$tbody = $tableBox.find('tbody'),
		$checkAll = $('#checkAll'),
		$checkList = null;

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
				<td class="w3"><input type="checkbox" userId="${id}"></td>
				<td class="w10">${name}</td>
				<td class="w5">${sex==0?'男':'女'}</td>
				<td class="w10">${department}</td>
				<td class="w10">${job}</td>
				<td class="w15">${email}</td>
				<td class="w15">${phone}</td>
				<td class="w20">${desc}</td>
				<td class="w12" userId="${id}">
					<a href="javascript:;">编辑</a>
					<a href="javascript:;">删除</a>
					<a href="javascript:;">重置密码</a>
				</td>
			</tr>`;
		});
		$tbody.html(str);
		$checkList = $tbody.find('input[type="checkbox"]');
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

	// 基于事件委托实现需要处理的事情
	function delegate() {
		$tbody.click(async ev => {
			let target = ev.target,
				$target = $(target),
				TAG = target.tagName,
				TEXT = target.innerHTML.trim();
			if (TAG === 'A') {
				let userId = $target.parent().attr('userId');
				if (TEXT === "编辑") {
					// 跳转到新增页面：为了区分是修改还是新增，我们需要问号传递一个标识过去，并且告知页面我们需要修改的是谁 useradd.html?id=xxx
					window.location.href = `useradd.html?id=${userId}`;
					return;
				}

				if (TEXT === "删除") {
					// 防止误操作，我们在删除前做一个提示
					let flag = confirm(`小主，您确定要删除编号为 [ ${userId} ] 的信息吗？一但删除可就没了哈~~`);
					if (!flag) return;
					let result = await axios.get('/user/delete', {
						params: {
							userId
						}
					});
					if (result.code == 0) {
						alert('小主，您很棒，奴家已经成功为您删除了本条数据~~');
						// 在页面中移除本数据
						$target.parent().parent().remove();
						$checkList = $tbody.find('input[type="checkbox"]');
						return;
					}
					alert('小主，当前网络繁忙，请您刷新后重试~~');
					return;
				}

				if (TEXT === "重置密码") {
					let flag = confirm(`小主，您确定要为编号为 [ ${userId} ] 的员工重置密码吗？`);
					if (!flag) return;
					let result = await axios.post('/user/resetpassword', {
						userId
					});
					if (result.code == 0) {
						alert('小主，您很棒，密码已经被重置，赶紧去通知员工吧~~');
						return;
					}
					alert('小主，当前网络繁忙，请您刷新后重试~~');
				}
			}
		});
	}

	// 全选处理
	function selectHandle() {
		$checkAll.click(ev => {
			let checked = $checkAll.prop('checked');
			$checkList.prop('checked', checked);
		});

		$tbody.click(ev => {
			let target = ev.target,
				TAG = target.tagName;
			if (TAG === "INPUT") {
				let flag = true;
				[].forEach.call($checkList, item => {
					if (!$(item).prop('checked')) {
						flag = false;
					}
				});
				$checkAll.prop('checked', flag);
			}
		});

		$deleteAll.click(ev => {
			// 获取当前选中项对应的员工编号
			let arr = [];
			[].forEach.call($checkList, item => {
				if ($(item).prop('checked')) {
					arr.push($(item).attr('userId'));
				}
			});

			// 如果没有被选中的要做提示
			if (arr.length === 0) {
				alert('小主，请您先选中要删除的项~');
				return;
			}

			// 删除前的确认提示
			let flag = confirm(`小主，您确定要删除这 ${arr.length} 条数据吗？`);
			if (!flag) return;

			// 批量删除真实项目中有两种方法：1.把要删除的私信传递给服务器，服务自己实现批量删除，客户端不需要做特别多的处理  2.需要客户端自己基于递归的方式，一项项的去删除（客户端需要处理）
			let index = -1;
			let complete = () => {
				if (index >= arr.length) {
					alert(`小主，已经成功为您删除选中的数据~~`);
				} else {
					alert(`小主，已经成功为您删除了 ${index+1} 条数据，删除中遇到部分信息无法删除，奴家已经为您结束删除操作~~`);
				}
				// 重新数据绑定
				bindHTML();
			};
			let send = async () => {
				if (index >= arr.length) {
					// 都删除了
					complete();
					return;
				}
				let userId = arr[++index];
				let result = await axios.get('/user/delete', {
					params: {
						userId
					}
				});
				if (result.code != 0) {
					// 删除中遇到错误的结束删除
					complete();
					return;
				}
				send();
			};
			send();
		});
	}

	return {
		init() {
			bindDepart();
			bindHTML();
			searchHandle();
			delegate();
			selectHandle();
		}
	}
})();
userListModule.init();