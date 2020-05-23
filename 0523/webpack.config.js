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
		login: './src/login.js',
		index: './src/main.js',
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