let url = require('url');// 解析url使用

let path = require('path');// 主要用来处理路径问题
// path.resolve  path.join
console.log('resolve结果：',path.resolve('./qqq','www'));// 根据当前路径和参数 拼接出参数的绝对路径 C:\珠峰培训\2020-01\202001\0518\qqq
console.log('join结果:',path.join('./qqq','www','eee'));// 参数拼接成路径 qqq\www\eee
console.log('join__dirname:',path.join(__dirname,'qqq','www'))


let str = 'https://www.baidu.com/qqq?w=123&x=abc&name=baidu#hash';
console.log(url.parse(str)) // 里边的query是前端传给后台的 search部分； query只是一个字符串
console.log(url.parse(str,true))// 这时的 query就变成了一个对象；
console.log(url.parse(str,true).query.name)
