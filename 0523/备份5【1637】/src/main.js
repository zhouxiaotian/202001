/*
 * 真实项目中，入口文件中会引入项目所需要的大部分资源
 *   样式资源
 *   JS资源
 *   各种模块 
 *   ...
 * 
 * 最后webpack会把对应类型的资源文件全部合并打包在一起（而且按照依赖关系处理的）
 */
import './static/css/reset.min.css';
require('./static/css/index.less');