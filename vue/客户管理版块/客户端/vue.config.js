module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	// 跨域处理
	devServer: {
		// proxy: 'http://127.0.0.1:8888'
		proxy: {
			'/': {
				target: 'http://127.0.0.1:8888',
				changeOrigin: true
			}
		}
	}
};