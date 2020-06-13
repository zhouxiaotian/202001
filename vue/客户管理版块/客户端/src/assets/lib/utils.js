function delay(interval = 1000) {
	return new Promise(resolve => {
		let timer = setTimeout(() => {
			clearTimeout(timer);
			resolve();
		}, interval);
	});
}

function readFile(file) {
	return new Promise(resolve => {
		let reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = ev => {
			resolve(ev.target.result);
		};
	});
}

function formatWeetJSON(result) {
	let propertyMap = {
		name: {
			key: '姓名',
			type: 'string'
		},
		sex: {
			key: '性别',
			type: 'number',
			rule: val => {
				return val === "男" ? 0 : 1;
			}
		},
		email: {
			key: '邮箱',
			type: 'string'
		},
		phone: {
			key: '电话',
			type: 'string'
		},
		QQ: {
			key: 'QQ',
			type: 'string'
		},
		weixin: {
			key: '微信',
			type: 'string'
		},
		type: {
			key: '类型',
			type: 'string'
		},
		address: {
			key: '地址',
			type: 'string'
		}
	};

	// 把从EXCEL表格中获取的数据变为需要传递给服务器的数据
	return result.map(item => {
		let obj = {};
		Object.keys(propertyMap).forEach(key => {
			let {
				type,
				key: keyMap,
				rule
			} = propertyMap[key];
			let value = item[keyMap];
			typeof rule === "function" ? value = rule(value) : null;
			switch (type) {
				case 'string':
					value = String(value);
					break;
				case 'number':
					value = Number(value);
					break;
			}
			obj[key] = value;
		});
		return obj;
	});
}

function formatJSONWeet(result) {
	let propertyMap = {
		'编号': {
			key: 'id',
			type: 'number'
		},
		'姓名': {
			key: 'name',
			type: 'string'
		},
		'性别': {
			key: 'sex',
			type: 'string',
			rule: val => {
				return val == 0 ? '男' : '女';
			}
		},
		'邮箱': {
			key: 'email',
			type: 'string'
		},
		'电话': {
			key: 'phone',
			type: 'string'
		},
		"QQ": {
			key: 'QQ',
			type: 'string'
		},
		'微信': {
			key: 'weixin',
			type: 'string'
		},
		'类型': {
			key: 'type',
			type: 'string'
		},
		'地址': {
			key: 'address',
			type: 'string'
		}
	};

	return result.map(item => {
		let obj = {};
		Object.keys(propertyMap).forEach(key => {
			let {
				type,
				key: keyMap,
				rule
			} = propertyMap[key];
			let value = item[keyMap];
			typeof rule === "function" ? value = rule(value) : null;
			switch (type) {
				case 'string':
					value = String(value);
					break;
				case 'number':
					value = Number(value);
					break;
			}
			obj[key] = value;
		});
		return obj;
	});
}

// 对组件的二次封装
function message(_this, options) {
	options = Object.assign({
		message: '',
		type: 'info',
		showClose: true,
		duration: 1500,
		onClose: Function.prototype
	}, options);
	_this.$message(options);
}

export default {
	delay,
	readFile,
	formatWeetJSON,
	formatJSONWeet,
	message
};