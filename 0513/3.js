// 自己调研JQ的文档，整理JQ的AJAX可支持的参数配置
/* 
$.ajax({
	url: './data.json',
	method: 'get',
	// DATA-TYPE它不会影响服务器返回的数据格式（一般都是JSON格式的字符串，这样处理只是把服务器返回的数据格式最后变为JSON格式的对象 =>AJAX内部处理的）
	dataType: 'json',
	// 如果设置的是GET请求，会默认把DATA中的数据变为 xxx=xxx&xxx=xxx 的形式，并且把数据基于问号传参传递给服务器；如果是POST请求，则会基于请求主体，把信息传递给服务器；
	data: {
		name: 'zhufeng',
		age: 11
	},
	async: true,
	cache: false,
	success: function (result) {

	}
}); 
*/

/* AXIOS基于PROMISE封装的AJAX库（真实项目中最常用的） */

// 1.基于AXIOS发送请求（每当发送一次请求，返回的结果都是PROMISE实例）
/* 
axios({
	url: './data.json',
	// GET请求，传参：可以自己URL问号拼接，也可以基于PARAMS指定需要传递的参数信息
	method: 'get',
	params: {
		name: 'zhufeng',
		age: 11
	}
}).then(result => {
	console.log(result);
	/!*
	 * status / statusText HTTP状态码和对应的描述
	 * request AJAX原始的实例对象XHR
	 * headers 包含响应头信息
	 * data 包含响应主体信息
	 * config 发送请求时候我们自己配置的参数信息
	 *!/
}); 
*/

/*
axios({
	url: './data.json',
	// POST请求传参：基于DATA把信息通过请求主体传递给服务器（默认会把DATA中的内容转换为JSON格式的字符串传递给服务器，而不是JQ中看到的xxx=xxx&xxx=xxx的格式）
	method: 'post',
	data: {
		name: 'zhufeng',
		age: 11
	}
}).then(result => {
	console.log(result);
});
*/

/* 
// 真实项目中我们使用AXIOS发送对应的请求，会基于快捷请求方法实现
// axios.get/post/delete/put/head/options()
// axios.get([URL],[OPTIONS])  [OPTIONS]中包含[PARAMS]负责传递信息值
axios.get('./data.json', {
	params: {
		name: 'zhufeng',
		age: 11
	}
}).then(result => {
	console.log(result.data);
});
// axios.post([URL],[DATA],[OPTIONS])  第二部分直接就是请求主体的信息
axios.post('./data.json', {
	name: 'zhufeng',
	age: 11
}).then(result => {}); 
*/

// 2.支持的配置信息都有哪些常用的
/*
 url / baseURL 请求地址和请求地址的前缀
 transformRequest:function(data){
	 //只针对于POST系列请求，把客户端传递给服务器的请求主体数据的格式做特殊处理
 }
 headers:{}  自定义请求头信息
 params:{}  GET请求传参
 data:{}  POST请求传参
 timeout:0 设置超时时间（0不设置）
 withCredentials:false 在CORS跨域中设置是否允许携带资源凭证
 responseType:'json'  把从服务器获取的数据格式转换为指定的格式 
 validateStatus: function (status) {
	//设置服务器返回的状态码介于什么范围之间算是请求成功，成功触发THEN，失败触发CATCH
    return status >= 200 && status < 300; // default
 }
 */

/* 
axios.post('./data.json', {
	name: 'zhufeng',
	age: 11
}, {
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	transformRequest: data => {
		if (data !== null && typeof data === "object") {
			/!* let str = ``;
			for (let key in data) {
				if (!data.hasOwnProperty(key)) break;
				str += `&${key}=${data[key]}`;
			}
			str = str.substring(1);
			return str; *!/

			// Qs.stringify就是把一个对象变为URLENCODED格式的数据
			return Qs.stringify(data);
		}
		return data;
	}
});
*/

/* axios.post('./data.json', {
	name: 'zhufeng',
	age: 11
}, {
	transformRequest: data => {
		// data：传递给服务器的请求主体信息（在这我们可以根据需要，把信息变为服务器需要的数据格式）
		// 安装一个接口测试软件：Postman
		// 客户端基于请求主体传递给服务器的数据格式经常有下面的几种：
		// 1. form-data 表单数据 ：在表单提交或者文件上传（传递的不是编码，而直接是文件流信息）的时候，经常使用FORM-DATA格式
		// let form = new FormData();
		// form.append('name', 'zhufeng');
		// form.append('age', 11);

		// 2. x-www-form-urlencoded  格式:xxx=xxx&xxx=xxx字符串格式（真实项目中最常用的格式，因为GET请求的问号参数就属于这种格式）  请求头中设置：Content-Type='application/x-www-form-urlencoded'

		// 3. raw 文本/XML/JSON/HTML等格式：不做任何处理的情况下，我们一般都是把请求主体中的JSON对象转换为JSON格式字符串传递给服务器的

		// 4. binary 文件流格式（把一个文件转换为2/16进制编码格式传递给服务器）：一般用于文件上传（我们在客户端本地把选取的文件转换为进制编码），基于AJAX把进制编码传递给服务器，服务器接收到编码后，可以存储编码，也可以基于编码在转解析为对应的文件，从而把文件存储到服务器上

		// 需求把DATA对象中的信息变为URLENCODED格式
		if (data !== null && typeof data === "object") {
			let str = ``;
			for (let key in data) {
				if (!data.hasOwnProperty(key)) break;
				str += `&${key}=${data[key]}`;
			}
			str = str.substring(1);
			return str;
		}
		return data;
	}
}); */


// 3.把一个公共的配置信息提前处理（请求拦截器、响应拦截器）
// BASE-URL是每次发送请求设置的公共前缀
axios.defaults.baseURL = 'http://127.0.0.1:8888';
// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => Qs.stringify(data);
axios.defaults.validateStatus = status => {
	return /^(2|3)\d{2}$/.test(status);
};
// 请求拦截器（在客户端把信息传递给服务器的时候 GET/POST），中间拦截一下（在拦截的时候可以自己在而外修改配置点信息）
axios.interceptors.request.use(config => {
	// console.log(config);
	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	// 真实项目中我们可能会在请求拦截器中，设置自定义请求头，把TOKEN信息传递给服务器，这样做接口的合法性验证
	return config;
});

// 响应拦截器（在获取服务器返回结果和执行自己的.THEN之间处理的事情）
axios.interceptors.response.use(result => {
	// 成功
	return result.data;
	//=>只把响应主体信息返回（在自己.THEN的时候获取的只有主体信息了）
}, reason => {
	reason = reason.response;
	// 失败
	// 在此处统一做错误处理（和服务器通信了，服务器返回的是4/5开头状态码，此时我们根据不同的状态码统一做提示即可；连通信都没有通信，此时说明网络有问题，我们做对应的提示）；
});


axios.get('/department/list').then(result => {
	console.log(result);
});

axios.get('/department/info', {
	params: {
		departmentId: 1
	}
}).then(result => {
	console.log(result);
});


// 浏览器内置的API ：FETCH本身也是基于PROMISE管理的，底层不是AJAX是新的方式