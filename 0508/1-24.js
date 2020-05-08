/*
 * 不指定KEY返回所有的问号参数信息和哈希信息。传递KEY，返回指定KEY对应的信息。 
 */
String.prototype.queryURLParams = function queryURLParams(key) {
	// 1.解析出所有问号参数值和哈希值
	let obj = {};
	// HASH值只要有一定出现在URL的末尾，并且以#xxx的方式出现
	let pollIndex = this.lastIndexOf('#');
	if (pollIndex > -1) {
		obj['_HASH'] = this.substring(pollIndex + 1);
	}
	this.replace(/([^?&=#]+)=([^?&=#]+)/g, (_, $1, $2) => obj[$1] = $2);

	// 2.验证KEY是否传递
	if (key !== undefined) {
		return obj[key];
	}
	return obj;
};

/*
 * 编写queryURLParams方法实现如下的效果（至少两种方案）
 */
let url = "http://www.zhufengpeixun.cn/?lx=1&from=wx#video";
console.log(url.queryURLParams("from")); //=>"wx"
console.log(url.queryURLParams("_HASH")); //=>"video"
console.log(url.queryURLParams()); //=>对象