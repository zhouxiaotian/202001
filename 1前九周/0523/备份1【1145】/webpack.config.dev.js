/* 开发环境下的配置项 */
const path = require('path');
module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	}
};