let express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = 9999;

//=>CREATE SERVER
app.listen(port, () => {
	console.log(`THE WEB SERVICE IS CREATED ==> ${port}`);
});
app.use(bodyParser.urlencoded({
	extended: false
}));

//=>API
let utils = require('./admin/admin-utils');
app.use(async function (req, res, next) {
	req.TASKDATA = await utils.readFile('TASK.JSON');
	req.BANNERDATA = await utils.readFile('BANNER.JSON');
	next();
});

app.get('/banner', (req, res) => {
	req.BANNERDATA = req.BANNERDATA.map(item => {
		item.pic = `http://127.0.0.1:${port}/${item.pic}`;
		return item;
	});
	res.send({
		code: 0,
		msg: 'OK!',
		data: req.BANNERDATA
	});
});

app.get('/getTaskList', (req, res) => {
	let {
		TASKDATA,
		query
	} = req, {
		limit = 100,
		page = 1,
		state = 0
	} = query;

	//=>筛选状态信息
	TASKDATA = TASKDATA.slice(0).reverse();
	if (parseFloat(state) !== 0) {
		TASKDATA = TASKDATA.filter(item => parseFloat(item['state']) === parseFloat(state));
	}

	//=>分页返回数据
	let total = TASKDATA.length,
		pageNum = Math.ceil(total / limit),
		result = [];
	if (page <= pageNum) {
		for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
			let item = TASKDATA[i];
			if (!item) break;
			result.push({
				id: parseFloat(item['id']),
				task: item['task'],
				state: item['state'],
				time: item['time'],
				complete: item['complete']
			});
		}
	}
	res.send({
		code: result.length === 0 ? 1 : 0,
		message: result.length === 0 ? 'NO MATCH ANY-ONE' : 'OK',
		limit: limit,
		page: page,
		pageNum: pageNum,
		total: total,
		list: result
	});
});

app.post('/addTask', (req, res) => {
	let {
		TASKDATA,
		body
	} = req;

	let nowTime = new Date().toLocaleString();
	body = {
		id: TASKDATA.length === 0 ? 1 : parseFloat(TASKDATA[TASKDATA.length - 1]['id']) + 1,
		task: '',
		state: 1,
		time: nowTime,
		complete: nowTime,
		...body,
	};
	body.complete = body.time;

	TASKDATA.push(body);
	utils.writeFile('TASK.JSON', TASKDATA).then(() => {
		res.send({
			code: 0,
			msg: 'OK!'
		});
	}).catch(() => {
		res.send({
			code: 1,
			msg: 'NO!'
		});
	});
});

app.get('/removeTask', (req, res) => {
	let {
		TASKDATA,
		query
	} = req, {
		id = 0
	} = query;

	if (parseFloat(id) === 0) {
		res.send({
			code: 1,
			msg: 'NO!'
		});
		return;
	}

	TASKDATA = TASKDATA.filter(item => {
		return parseFloat(item.id) !== parseFloat(id);
	});
	utils.writeFile('TASK.JSON', TASKDATA).then(() => {
		res.send({
			code: 0,
			msg: 'OK!'
		});
	}).catch(() => {
		res.send({
			code: 1,
			msg: 'NO!'
		});
	});
});

app.get('/completeTask', (req, res) => {
	let {
		TASKDATA,
		query
	} = req, {
		id = 0
	} = query;

	if (parseFloat(id) === 0) {
		res.send({
			code: 1,
			msg: 'NO!'
		});
		return;
	}

	TASKDATA = TASKDATA.map(item => {
		if (parseFloat(item.id) === parseFloat(id)) {
			return {
				...item,
				state: 2,
				complete: new Date().toLocaleString()
			};
		}
		return item;
	});
	utils.writeFile('TASK.JSON', TASKDATA).then(() => {
		res.send({
			code: 0,
			msg: 'OK!'
		});
	}).catch(() => {
		res.send({
			code: 1,
			msg: 'NO!'
		});
	});
});

app.use(express.static('./'))

app.use(function (req, res, next) {
	//=>404
	res.status(404);
	res.send('NOT FOUND!');
});