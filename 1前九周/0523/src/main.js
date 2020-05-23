// import './static/css/reset.min.css';
// // import './static/css/iconfont.css';
// require('./static/css/index.less');

// 在JS中动态创建图片
// 1.如果地址是一个外网的绝对地址直接使用即可（编译后地址还是外网地址）
// 2.如果需要设置的是相对地址，则需要基于require把图片导入进来在使用，否则编译后地址是找不到的
// let A = require("./static/images/icon.png");
// let image = new Image();
// image.src = A;
// document.body.appendChild(image);

/*
 * 默认情况加，webpack只是把各版块的代码合并压缩，对于JS并没有做其它的处理
 *    如果代码需要兼容一些低版本浏览器，我们写的ES6代码都需要处理兼容（需要把其转换为ES5的代码） => babel    https://babeljs.io
 */
// let [a, b] = [10, 20];
// console.log(a, b);

/*
 *  @babel/polyfill和其它的webpack加载器和插件不一样，其它的是编译时（编译代码的时候处理），而polyfill是运行时，是在代码运行的时候，把一些ES7等特殊的语法进行兼容处理
 *    1. 需要安装在生产环境下，因为上线代码运行时也是需要的
 *       @babel/runtime 
 *       @babel/polyfill
 *    2. 需要一个插件的支持
 *       @babel/plugin-transform-runtime
 */
require('@babel/polyfill');