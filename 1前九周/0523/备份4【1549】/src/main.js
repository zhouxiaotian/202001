/* 作为当前项目的入口（最后会把需要用到的模块全部合并打包到这里） */
import {
	minus
} from './B';

const {
	plus
} = require('./A');

// const $ = require('jquery');

console.log(plus(20, 10));
console.log(minus(20, 10));
console.log("我是首页面的入口");