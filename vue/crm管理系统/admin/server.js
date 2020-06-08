const CONFIG = require('./config'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	qs = require('qs');

/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(CONFIG.PORT, () => {
	console.log(`当前服务 起于${CONFIG.PORT}端口`);
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
app.use(session(CONFIG.SESSION));
app.use((req,res,next)=>{
	let str = '';
	req.on('data',(chunk)=>{
			str += chunk;
	})
	req.on('end',()=>{
			let obj = {};
			try {
					obj = JSON.parse(str)
			} catch (error) {
					obj = qs.parse(str)
			}
			req.body = obj;
			next();
	})
})

/*-QUERY DATA-*/
const {
	readFile
} = require('./utils/promiseFS');

const {
	filterInvalid
} = require('./utils/tools');

app.use(async (req, res, next) => {
	req.$customerDATA = filterInvalid(JSON.parse(await readFile('./json/customer.json')));
	req.$departmentDATA = filterInvalid(JSON.parse(await readFile('./json/department.json')));
	req.$jobDATA = filterInvalid(JSON.parse(await readFile('./json/job.json')));
	req.$userDATA = filterInvalid(JSON.parse(await readFile('./json/user.json')));
	req.$visitDATA = filterInvalid(JSON.parse(await readFile('./json/visit.json')));
	next();
});

/*-ROUTE-*/
app.use('/user', require('./routes/user'));
app.use('/customer', require('./routes/customer'));
app.use('/department', require('./routes/department'));
app.use('/visit', require('./routes/visit'));
app.use('/job', require('./routes/job'));
app.use((req, res) => {
	res.status(404);
	res.send('NOT FOUND!');
});