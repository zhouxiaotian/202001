let options = require('./2.js');// js后缀可以省略；
let options3 = require('./3');
let {ppp} = require('./3');// 可以使用解构赋值
let a = 123;
// let obj = {};
// console.log(a+100)
// console.log(typeof a)
// console.log(Object.assign({},obj))
// console.log(options);
// console.log(options3)
// console.log(new ppp)
// console.log(window)
// console.log(global)
console.log(__dirname);// 当前文件 所在文件夹的绝对目录；
console.log(__filename)// 当前文件的绝对目录