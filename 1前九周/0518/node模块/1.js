let path = require('path');// 导入模块;path是内置模块
let obj = require('./2.js');//自定义模块
let $ = require('jquery');// 三方模块
// let q = require('qqq'); 不指定路径的 导入；查找的顺序
// 先在兄弟路径下查找 node_modules这个文件夹 若有 就去这个文件夹下 找对应的包，若没有这个node_modules
// 这个文件夹 或者 node_modues这个文件夹下没有 指定的包， 则回去上级查找 node_modules文件夹，重复上边的操作，
//  一直找到 跟路径(全局环境)
console.log($)
console.log(path,obj);
