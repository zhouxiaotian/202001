/*
 * 编写自定义的webpack配置项，以后webpack打包编译的时候是按照自己配置的内容进行打包编译处理的（这个文件放置在项目的根目录下）
 *     文件名：webpack.config.js / webpackfile.js
 * 
 * 1. webpack本身是基于Node开发的，所以配置项的模块处理规则参考CommonJS规范来完成
 */
const path = require('path');

module.exports = {
	// 设置编译的模式 development/production（默认）
	mode: 'production',
	// 设置编译的入口文件（真实项目中一般开发的代码都要放置到SRC下）
	entry: './src/main.js',
	// 设置编译的出口文件
	output: {
		// 编译后的文件名  [hash]编译的时候会随机在名字中生成唯一的哈希值，以此保证每一次编译出来的文件是不一样的
		filename: 'bundle.[hash].min.js',
		// 输出的目录（需要是绝对路径）
		path: path.resolve(__dirname, 'build')
	}
};