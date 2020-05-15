/* 
 * 基于PROMISE封装自己的AJAX库 【v1.0.0】
 */
(function anonymous() {
	let isObj = function isObj(val) {
		return val !== null && typeof val === "object";
	};

	let char = function char(url) {
		return url.includes('?') ? '&' : '?';
	};


	/* ===AJAX核心处理=== */
	class MyAJAX {
		constructor(options = {}) {
			this.config = options;
			this.ISGET = /^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method);
			return this.init();
		}
		init() {
			let {
				method,
			} = this.config;

			return new Promise((resolve, reject) => {
				// 发送AJAX请求
				let xhr = new XMLHttpRequest;
				xhr.open(method, this.handleURL());
				this.handleHeaders(xhr);
				xhr.onreadystatechange = () => {

				};
				xhr.send(this.handleData());
			});
		}
		// URL处理:CACHE/PARAMS
		handleURL() {
			let {
				url,
				baseURL,
				cache,
				params
			} = this.config;
			url = baseURL + url;
			if (this.ISGET) {
				if (isObj(params)) {
					let paramsText = ``;
					for (let key in params) {
						if (!params.hasOwnProperty(key)) break;
						paramsText += `&${key}=${params[key]}`;
					}
					paramsText = paramsText.substring(1);
					url += char(url) + paramsText;
				}
				if (cache === false) {
					url += `${char(url)}_=${new Date().getTime()}`;
				}
			}
			return url;
		}
		// 设置请求头信息
		handleHeaders(xhr) {
			let {
				headers
			} = this.config;
			if (isObj(headers)) {
				for (let key in headers) {
					if (!headers.hasOwnProperty(key)) break;
					xhr.setRequestHeader(key, headers[key]);
				}
			}
		}
		// 请求主体的值
		handleData() {
			if (this.ISGET) return null;
			let data = this.config.data;
			if (isObj(data)) {
				// 不能把JSON对象传递给服务器,默认传递的是JSON字符串
				data = JSON.stringify(data);
			}
			return data;
		}
	}


	/* ===配置出_AJAX应有的接口并暴露到全局上=== */

	// 把用户传递的OPTIONS信息和DEFAULTS默认信息进行合并处理
	function initParams(options = {}) {
		// 有些配置项不能直接硬性替换（二级数据）：此时需要深层替换  HEADERS
		_ajax.defaults.headers = !isObj(_ajax.defaults.headers) ? {} : null;
		options.headers = !isObj(options.headers) ? {} : null;
		options.headers = Object.assign(_ajax.defaults.headers, options.headers);
		return Object.assign(_ajax.defaults, options);
	}

	// _AJAX执行发送请求
	function _ajax(options = {}) {
		options = initParams(options);
		return new MyAJAX(options);
	}

	// 默认的参数配置信息
	_ajax.defaults = {
		baseURL: '',
		url: '',
		method: 'get',
		responseType: 'json',
		withCredentials: false,
		cache: true,
		params: null,
		data: null,
		headers: {
			"Content-Type": "application/json"
		},
		transformRequest: null,
		transformReponse: null,
		validateStatus: status => {
			return status >= 200 && status < 300;
		}
	};

	// _AJAX的快捷请求方法
	['get', 'delete', 'head', 'options'].forEach(item => {
		_ajax[item] = function (url, options = {}) {
			options.url = url;
			options.method = item;
			options = initParams(options);
			return new MyAJAX(options);
		};
	});
	['post', 'put'].forEach(item => {
		_ajax[item] = function (url, data = {}, options = {}) {
			options.url = url;
			options.method = item;
			options.data = data;
			options = initParams(options);
			return new MyAJAX(options);
		};
	});
	window._ajax = _ajax;
})();