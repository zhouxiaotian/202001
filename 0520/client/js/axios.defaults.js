// axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;// 告诉浏览器  跨域访问的时候 允许携带cookie
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
axios.interceptors.response.use(function onFulfilled(response) {
	// 说明能从服务器正常获取数据（数据不一定是我们想要的  状态码：^2|3）
	return response.data;
}, function onRejected(reason) {
	// 不能从服务器正常获取到数据（状态码：^4|5），这类错误我们是统一在响应拦截器中进行处理即可 =>reason={response:{status: 404},message:'xxx',...}
	if (reason.response) {
		// 收到了服务器的反馈（最起码链接上服务器了）
		switch (String(reason.response.status)) {
			case '404':
				alert('小主，当前请求的地址不存在~~');
				break;
		}
	} else {
		// 服务器都没链接上（断网了）
		// alert('您当前的网络中断，请链接网络后，刷新页面重试！');
	}
	return Promise.reject(reason);
});
axios.defaults.validateStatus = function (status) {
	return /^(2|3)\d{2}$/.test(status);
}