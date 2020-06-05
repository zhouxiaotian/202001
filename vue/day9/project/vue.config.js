let NODE_ENV = process.env.NODE_ENV,
	BASE_URL = process.env.BASE_URL;

module.exports = {
	// 在服务器打包部署的时候，我们往往会根据服务器部署的地址，指定左右插入资源的统一前缀路径（默认/代表部署到服务器根目录）
	publicPath: NODE_ENV === "production" ? '/dist/' : '/',

	// 配置多页面
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			// <%= htmlWebpackPlugin.options.title %>
			title: '珠峰培训首页',
			chunks: ["chunk-vendors", "chunk-common", "index"]
		},
		login: {
			entry: 'src/login.js',
			template: 'public/login.html',
			filename: 'login.html',
			chunks: ["chunk-vendors", "chunk-common", "login"]
		}
	},
	// 在开发环境下，是否每次代码编译都执行词法检测（开启后：编译会变慢、而且以后在xxx.vue中可能多加一个空格它都编译不过去）
	lintOnSave: false,
	productionSourceMap: false,

	// webpack-dev-server
	devServer: {
		port: 3000,
		proxy: {
			'/api': {
				target: BASE_URL,
				changeOrigin: true
			}
		}
	}
};