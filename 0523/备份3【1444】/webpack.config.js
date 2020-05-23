const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		filename: 'bundle.[hash].min.js',
		path: path.resolve(__dirname, 'build')
	},
	// 配置DEV-SERVER  编译后的结果放在计算机内存中，并不会向之前的webpack命令一样，把编译后的东西放到build下，dev-server仅仅是在开发模式下，随时编译并且预览的，项目要部署的时候，还是需要基于webpack编译打包的
	devServer: {
		// WEB服务的端口号
		port: '3000',
		// 开启GZIP压缩
		compress: true,
		// 指定资源访问的路径
		contentBase: path.resolve(__dirname, "build"),
		// 自动打开浏览器
		open: true,
		// 开启热更新
		hot: true,
		// Proxy跨域代理
		// proxy: {
		// 	'/': 'http://127.0.0.1:8888'
		// }
	},
	// 在WEBPACK中使用插件
	plugins: [
		// 配置指定的HTML页面模板
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeAttributeQuotes: true,
				removeEmptyAttributes: true
			}
		}),
		// 每一次打包都把之前打包的清空
		new CleanWebpackPlugin()
	]
};