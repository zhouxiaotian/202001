const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
	// 配置WEBPACK的优化项
	optimization: {
		// 设置压缩方式
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserPlugin()
		]
	},
	// 配置WEBPACK的插件
	plugins: [
		...htmlPlugins,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].min.css'
		})
	],
	// 配置WEBPACK的加载器LOADER
	module: {
		rules: [{
			test: /\.(css|less)$/i,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				"postcss-loader",
				"less-loader"
			],
			// 指定哪些目录下的CSS我们才处理
			include: path.resolve(__dirname, 'src'),
			// 忽略哪些目录下的CSS我们不处理
			exclude: /node_modules/
		}, {
			// 图片的处理  file-loader就是编译图片的加载器
			test: /\.(png|jpe?g|gif|ico|bmp|svg|eot|ttf|woff|woff2)$/i,
			use: [{
				// url-loader在编译的时候，会把符合条件的图片进行BASE64，对于不符合条件的还是继续使用file-loader处理
				loader: "url-loader",
				options: {
					limit: 100 * 1024,
					// 在编译的时候，把图片都放在统一的IMAGES文件夹下
					name: 'images/[name].[hash].[ext]',
					esModule: false
				}
			}]
		}, {
			// 编译HTML中的图片的，把其按照上述图片的处理机制处理
			test: /\.html$/,
			use: ['html-withimg-loader']
		}, {
			test: /\.js$/i,
			use: [{
				loader: "babel-loader",
				options: {
					presets: [
						// 把ES6转为ES5
						"@babel/preset-env"
					],
					// 基于插件处理ES6/ES7中CLASS的特殊语法
					plugins: [
						// 类的装饰器的
						["@babel/plugin-proposal-decorators", {
							"legacy": true
						}],
						// 类中设置属性的
						["@babel/plugin-proposal-class-properties", {
							"loose": true
						}],
						"@babel/plugin-transform-runtime"
					]
				}
			}], // , "eslint-loader"  开启词法检测
			include: path.resolve(__dirname, 'src'),
			exclude: /node_modules/
		}]
	}
};