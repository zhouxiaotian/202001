/*
 * 1.进入页面首先要获取部门信息和职务信息，绑定到执行的下拉框中
 * 2.获取到用户输入的信息
 *   格式校验
 *   发送给服务器对应的请求 
 */
let useraddModule = (function () {
	let $username = $('.username'),
		$spanusername = $('.spanusername'),
		$man = $('#man'),
		$woman = $('#woman'),
		$useremail = $('.useremail'),
		$spanuseremail = $('.spanuseremail'),
		$userphone = $('.userphone'),
		$spanuserphone = $('.spanuserphone'),
		$userdepartment = $('.userdepartment'),
		$userjob = $('.userjob'),
		$userdesc = $('.userdesc'),
		$submit = $('.submit');

	// 绑定部分和职务的信息
	async function bindDepartAndJob() {
		// 首先看本地是否存在缓存信息，如果存在，在验证时效性；不存在或者过期了，我们重新发送请求，否则直接用本地的信息即可
		let departmentData = null,
			jobData = null,
			isStorage = false;
		let departmentANDjob = localStorage.getItem('departmentANDjob');
		if (departmentANDjob) {
			departmentANDjob = JSON.parse(departmentANDjob);
			if (new Date().getTime() - departmentANDjob.time < 86400000) {
				[departmentData, jobData] = departmentANDjob.data;
				isStorage = true;
			}
		}

		// 使用的非缓存数据，我们需要重新获取信息
		if (!isStorage) {
			// AJAX并行获取数据
			[departmentData, jobData] = await axios.all([
				axios.get('/department/list'),
				axios.get('/job/list')
			]);
			// 获取信息后先把信息缓存到本地（时效性1天）
			localStorage.setItem('departmentANDjob', JSON.stringify({
				time: new Date().getTime(),
				data: [departmentData, jobData]
			}));
		}

		if (departmentData.code == 0) {
			departmentData = departmentData.data;
			let str = ``;
			departmentData.forEach(item => {
				str += `<option value="${item.id}">${item.name}</option>`;
			});
			$userdepartment.html(str);
		}

		if (jobData.code == 0) {
			jobData = jobData.data;
			let str = ``;
			jobData.forEach(item => {
				str += `<option value="${item.id}">${item.name}</option>`;
			});
			$userjob.html(str);
		}
	}

	// 表单校验
	function checkName() {
		let val = $username.val().trim();
		if (val.length === 0) {
			$spanusername.html('小主，当前是必填项哦~~');
			return false;
		}
		if (!/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/.test(val)) {
			$spanusername.html('小主，请填写真实姓名【2~10位汉字】~~');
			return false;
		}
		$spanusername.html('');
		return true;
	}

	function checkEmail() {
		let val = $useremail.val().trim();
		if (val.length === 0) {
			$spanuseremail.html('小主，当前是必填项哦~~');
			return false;
		}
		if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(val)) {
			$spanuseremail.html('小主，请填写真实邮箱~~');
			return false;
		}
		$spanuseremail.html('');
		return true;
	}

	function checkPhone() {
		let val = $userphone.val().trim();
		if (val.length === 0) {
			$spanuserphone.html('小主，当前是必填项哦~~');
			return false;
		}
		if (!/^1\d{10}$/.test(val)) {
			$spanuserphone.html('小主，请填写真实手机号码~~');
			return false;
		}
		$spanuserphone.html('');
		return true;
	}

	// 点击确认提交按钮
	async function submitHandle() {
		// 重复表单校验
		if (!checkName() || !checkEmail() || !checkPhone()) return;

		// 获取用户输入的信息
		let params = {
			name: $username.val().trim(),
			sex: $man.prop('checked') ? 0 : 1,
			email: $useremail.val().trim(),
			phone: $userphone.val().trim(),
			departmentId: $userdepartment.val(),
			jobId: $userjob.val(),
			desc: $userdesc.val().trim()
		};
		
		// 向服务器发送请求
		let result = await axios.post('/user/add', params);
		if (result.code == 0) {
			alert('小主，您很棒，奴家已经成功为您新增一条数据~~');
			window.location.href = "userlist.html";
			return;
		}
		alert('小主，当前网络繁忙，请您刷新后重试~~');
	}

	return {
		init() {
			bindDepartAndJob();

			// 文本框失去焦点的时候做表单校验
			$username.blur(checkName);
			$useremail.blur(checkEmail);
			$userphone.blur(checkPhone);

			// 点击提交按钮
			$submit.click(submitHandle);
		}
	}
})();
useraddModule.init();