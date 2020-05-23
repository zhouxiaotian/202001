const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
	mode: 'production',
	entry: {
		index: './src/main.js',
		login: './src/login.js',
	},
	output: {
		filename: '[name].[hash].min.js',
		path: path.resolve(__dirname, 'build')
	},
	devServer: {
		port: '3000',
		compress: true,
		open: true,
		hot: true
	},
	// 配置WEBPACK的插件
	plugins: [
		...htmlPlugins,
		new CleanWebpackPlugin(),
		// 抽离CSS到单独的文件
		new MiniCssExtractPlugin({
			filename: '[name].[hash].min.css'
		})
	],
	// 配置WEBPACK的加载器LOADER
	module: {
		// 设置规则和处理方案  默认执行顺序：从右到左、从下向上
		rules: [{
			// 匹配哪些文件基于正则处理（此处是处理CSS/LESS文件）
			test: /\.(css|less)$/i,
			use: [
				// "style-loader", // 把处理好的CSS插入到页面中（内嵌式）
				MiniCssExtractPlugin.loader,
				"css-loader", // 处理@import/URL这种语法
				"postcss-loader", // 设置CSS前缀（处理兼容 需要搭配autoprefixer一起使用，需要而外再配置一些信息）
				"less-loader" // 把LESS编译为CSS
			]
		}]
	}
};