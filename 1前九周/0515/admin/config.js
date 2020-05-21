module.exports = {
	//=>WEB服务端口号
	PORT: 9999,

	//=>CROS跨域相关信息
	CROS: {
		ALLOW_ORIGIN: '*',
		ALLOW_METHODS: 'PUT,POST,GET,DELETE,OPTIONS,HEAD',
		HEADERS: 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With',
		CREDENTIALS: false
	}
};