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
	// 在WEBPACK中使用插件
	plugins: [
		// 配置指定的HTML页面模板（后期在编译的时候会把编译好的资源文件自动导入到我们的页面模板中）
		new HtmlWebpackPlugin({
			// 模板的路径
			template: './public/index.html',
			// 编译后生成的文件名
			filename: 'index.html',
			// 是否把编译的资源文件导入到页面中，设置HASH值（清除强缓存，和OUTPUT设置HASH值是一样的）
			// hash: true,
			// 把模板中的HTML代码也进行压缩编译(配置规则)
			// https://github.com/kangax/html-minifier
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