const CONFIG = require('./config'),
	bodyParser = require('body-parser');

/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(CONFIG.PORT, () => {
	console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
	const {
		ALLOW_ORIGIN,
		CREDENTIALS,
		HEADERS,
		ALLOW_METHODS
	} = CONFIG.CROS;
	res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
	res.header("Access-Control-Allow-Credentials", CREDENTIALS);
	res.header("Access-Control-Allow-Headers", HEADERS);
	res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
	req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});
app.use(bodyParser.urlencoded({
	extended: false
}));

/*-API-*/
app.get('/queryList', (req, res) => {
	res.send({
		code: 0,
		codeText: 'OK',
		params: req.query,
		data: [{
			id: 1,
			name: '珠峰培训',
			age: 11
		}, {
			id: 2,
			name: '周啸天',
			age: 30
		}]
	});
});

app.post('/insertInfo', (req, res) => {
	res.send({
		code: 0,
		codeText: 'OK',
		params: req.body
	});
});

app.use((req, res) => {
	res.status(404);
	res.send('NOT FOUND!');
});