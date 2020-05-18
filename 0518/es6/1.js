// node不支持 es6的导入和导出
// 浏览器不支持 node的导入和导出
import qqq from './2.js';// 这块不能省略后缀； 从2.js中导入 obj;  obj这个词是自定义的

// import obj from './3.js';// 这种导入的方式 适合 默认导出（export default）

import {fn2,aaa} from './3.js';// 适用于 export 声明关键字
// 想用哪个属性 就导入哪个属性 属性名是导出方定义好的
import * as myObj from './3.js'// 把3.js中的所有导出 都合成一个对象，对象名是 myObj

let a = 12,
    b = 13;
console.log(qqq.fn(a,b));  

// console.log(obj);  
console.log(fn2,aaa) 
console.log(myObj)
myObj.fn2();