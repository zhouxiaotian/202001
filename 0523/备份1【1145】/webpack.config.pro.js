/* 生产环境下的配置项 */
const path = require('path');
module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		filename: 'bundle.[hash].min.js',
		path: path.resolve(__dirname, 'build')
	}
};