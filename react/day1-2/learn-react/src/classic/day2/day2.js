// import React from 'react';
// import ReactDOM from 'react-dom';

// let str = '我很帅';// {不能写对象}  map(数组)

// function CountType(props){
//   console.log(props);
//   let {n} = props;
//   return <>
//     {/* 三元在我们react中就 有类似于 v-if的功能 */}
//     {n}是{
//       n%2 ?
//       <strong>奇数</strong>:
//       n>5?
//       <strong>大于5的偶数</strong>:
//       <strong>小于5的偶数</strong>
//     }
//   </>
// }


// function App(props){
//   return <>
//       <h1 className={str}>{str}</h1>
//       <CountType n={2} qqq={123} www={444}/> 
//       {/* 把所有的行内属性 打包成一个对象 传给组件对应的函数 */}
//       <CountType n={5}/>
//       <CountType n={4}/>
//       <CountType n={6}/>
//   </>
// }
// ReactDOM.render(<>
//   <App/>
// </>,document.getElementById('root'))

// import './1_class组件'
// import './2_状态和属性'
// import './3_事件'
// import './4_父子组件.js'
// import './5_父子组件2'
// import './6_ref'
import './7_prop-types'