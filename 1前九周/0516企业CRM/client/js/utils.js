/*
 * formatTime：时间字符串的格式化处理
 */
function formatTime(templete = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
	let timeAry = this.match(/\d+/g);
	return templete.replace(/\{(\d+)\}/g, (...[, $1]) => {
		let time = timeAry[$1] || "00";
		return time.length < 2 ? "0" + time : time;
	});
}
String.prototype.formatTime = formatTime;

/* 
 * queryURLParams：获取URL地址问号和面的参数信息（可能也包含HASH值）
 */
function queryURLParams() {
	let obj = {};
	this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => obj[$1] = $2);
	this.replace(/#([^?=&#]+)/g, (...[, $1]) => obj['HASH'] = $1);
	return obj;
}
String.prototype.queryURLParams = queryURLParams;

/*
 * _each：遍历数组、类数组、对象中的每一项 
 */
function _each(obj, callback, context = window) {
	let isLikeArray = Array.isArray(obj) || (('length' in obj) && (typeof obj.length === "number"));
	typeof callback !== "function" ? callback = Function.prototype : null;

	//=>数组或者类数组
	if (isLikeArray) {
		let arr = [...obj];
		for (let i = 0; i < arr.length; i++) {
			let item = arr[i],
				result = callback.call(context, item, i);
			if (result === false) break;
			if (typeof result === "undefined") continue;
			arr[i] = result;
		}
		return arr;
	}

	//=>对象的处理
	let opp = {
		...obj
	};
	for (let key in opp) {
		if (!opp.hasOwnProperty(key)) break;
		let value = opp[key],
			result = callback.call(context, value, key);
		if (result === false) break;
		if (typeof result === "undefined") continue;
		opp[key] = result;
	}
	return opp;
}

/*
 * 缓存部门信息 
 */
async function queryDepart() {
	let result,
		department = localStorage.getItem('department');
	if (department) {
		department = JSON.parse(department);
		if (new Date().getTime() - department.time <= 86400000) {
			return department.data;
		}
	}
	result = await axios.get('/department/list');
	localStorage.setItem('department', JSON.stringify({
		time: new Date().getTime(),
		data: result
	}));
	return result;
}

/*
 * 缓存职务信息 
 */
async function queryJob() {
	let result,
		job = localStorage.getItem('job');
	if (job) {
		job = JSON.parse(job);
		if (new Date().getTime() - job.time <= 86400000) {
			return job.data;
		}
	}
	result = await axios.get('/job/list');
	localStorage.setItem('job', JSON.stringify({
		time: new Date().getTime(),
		data: result
	}));
	return result;
}