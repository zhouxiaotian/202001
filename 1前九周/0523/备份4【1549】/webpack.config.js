const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

// 配置多页面模板
const htmlPlugins = ['index', 'login'].map(item => {
	return new HtmlWebpackPlugin({
		template: `./public/${item}.html`,
		filename: `${item}.html`,
		// chunks: ['jquery', item], // 指定当前页面的依赖项
		chunks: [item],
		minify: {
			collapseWhitespace: true,
			removeComments: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true
		}
	});
});

module.exports = {
	// 基础配置
	mode: 'production',
	// entry: './src/main.js',
	// 多入口 KEY:VALUE
	entry: {
		index: './src/main.js',
		login: './src/login.js',
		// 如果不想把JQ合并在其它的JS中，想独立打包出来（多个页面公共的部分我们可以独立打包出来）
		// jquery: 'jquery'
	},
	output: {
		// [name]多入口中配置的属性名 index/login
		filename: '[name].[hash].min.js',
		path: path.resolve(__dirname, 'build')
	},
	// 配置DEV-SERVER
	devServer: {
		port: '3000',
		compress: true,
		open: true,
		hot: true
	},
	plugins: [
		// 配置指定的HTML页面模板
		...htmlPlugins,
		// 每一次打包都把之前打包的清空
		new CleanWebpackPlugin()
	]
};