let loginModule = (function () {
	let $userName = $('.userName'),
		$userPass = $('.userPass'),
		$submit = $('.submit');

	function handle() {
		$submit.click(async function () {
			let account = $userName.val().trim(),
				password = $userPass.val().trim();
			// 格式校验（非空+格式）
			if (account === "" || password === "") {
				alert('亲，账号和密码不能为空哦(*￣︶￣)');
				return;
			}
			// 给密码MD5加密
			password = md5(password);
			// 发送POST请求，把获取的账号密码传递给服务器
			let result = await axios.post('/user/login', {
				account,
				password
			});
			if (parseInt(result.code) === 0) {
				alert('小主，已经成功为您登录，即将跳转到首页~~');
				window.location.href = "index.html";
				return;
			}
			alert('小主，您输入的账号密码不匹配，请您重新输入哦~~');
		});
	}

	return {
		init() {
			handle();
		}
	}
})();
loginModule.init();