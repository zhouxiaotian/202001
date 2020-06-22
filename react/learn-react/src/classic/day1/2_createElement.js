import React from 'react'
import ReactDom from 'react-dom'
// let ele = <div qqq='123' id='box'>
//   hello world
//   <span>哈哈哈<i>呵呵呵</i></span>
// </div>;
//babel 的一个react插件 会把 上边的语法转成 react能够执行的语法
let ele = React.createElement('div',{qqq:123,id:'box'},'hello world',
React.createElement('span',null,'哈哈哈',React.createElement('i',null,'呵呵呵')));

/* 
  React.createElement(标签名，{行内属性}，。。。children(都是子元素))

*/
ReactDom.render(ele,document.getElementById('root'))