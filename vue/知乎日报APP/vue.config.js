module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		// 跨域请求：PROXY代理
		proxy: {
			'/': {
				target: 'http://news-at.zhihu.com/api/4',
				changeOrigin: true
			}
		}
	}
};