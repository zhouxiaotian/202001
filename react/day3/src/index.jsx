import SELFJSX from './selfjsx';
const {
  React
} = SELFJSX;

console.log(React.createElement("div", {
  className: "box",
  style: {
    color: 'red'
  },
  key: "1",
  ref: "AA"
},
  "\u73E0\u5CF0\u57F9\u8BAD",
  React.createElement("i", null),
  React.createElement("span", {
    className: "text"
  }, "\u54C8\u54C8")
));
















/* import React from 'react';
import ReactDOM from 'react-dom'; */

/* let data = {
  title: '珠峰培训最新课程',
  list: [{
    id: 1,
    title: '两晚带你彻底掌握vue3.0核心知识与实战开发'
  }, {
    id: 2,
    title: '2020年暑期面试题训练营'
  }],
  teacher: {
    name: '周啸天',
    sex: 0
  }
};

const STY_OBJ = {
  color: 'red'
};

ReactDOM.render(<div className="box">
  <h2 style={STY_OBJ}>{data.title}</h2>
  <ul>
    {data.list.map(item => {
      return <li key={item.id}>
        {item.title}
      </li>;
    })}
  </ul>
</div>, document.getElementById('root')); */

/*
ReactDOM.render(<div>
  珠峰培训
</div>, document.getElementById('root')); */

/*
 * REACT中虚拟DOM（JSX DOM）到真实DOM的过程
 *   1.基于babel-preset-react-app可以把JSX语法解析为一个虚拟的DOM对象
 *     第一步：基于BABEL的语法包，把JSX语法变为REACT.CREATEELEMENT格式
 *     React.createElement([元素标签名/组件],[属性/null],所有的子元素内容)
 *        1)凡是遇到一个元素标签，必然会生成为React.createElement格式
 *        2)设置的属性都会在第二个参数中保存起来（对象）
 *        createElement中至少传递两个值，从第三个开始，都是当前容器的子元素内容
 *
 *     第二步：基于createElement执行，会生成一个虚拟的DOM对象（JSX对象/JSX元素）
 *
 *   2.基于ReactDOM.render([虚拟DOM对象],[容器],[回调函数])
 *     当我们把虚拟DOM变为真实的DOM后，插入到指定的容器，同时出发回调函数执行
 */

// console.log(React.createElement("i", null));
/*
 {
    props:{},  记录属性和子元素
    key:null,
    ref:null,
    type:'i'  标签名
 }
 */

// console.log(React.createElement("span", {
//   className: "text"
// }, "\u54C8\u54C8"));
/*
 {
    props:{
       className: "text",
       //有子元素就有一个children属性，并且属性值根据元素的个数是不一样的，只有一个子元素，属性值是当前子元素（字符串/新的虚拟DOM对象），有多个子元素就是一个数组
       children:'哈哈'
    },
    key:null,
    ref:null,
    type:'span'
 }
 */

/*  console.log(React.createElement("div", {
  className: "box",
  style: {
    color: 'red'
  },
  key: "1",
  ref: "AA"
},
  "\u73E0\u5CF0\u57F9\u8BAD",
  React.createElement("i", null),
  React.createElement("span", {
    className: "text"
  }, "\u54C8\u54C8")
));  */


/*
 * JSX：JAVASCRIPT AND XML(HTML)
 *    <></>：Fragment空文档标记标签
 *    {} 大括号中存放JS表达式（执行有返回结果的）
 *       -> null/undefined 空
 *       -> 不能直接写对象（对象不是一个合法的元素），除几个特殊情况
 *          + 设置行内样式，样式属性值必须是对象，不能是字符串
 *          + 数组是可以的（变为没有逗号分隔的字符串）
 *          + 如果是JSX虚拟DOM对象是可以的
 *          + ...
 *       -> 设置样式类名用的是className
 */