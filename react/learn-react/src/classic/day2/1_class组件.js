import React,{Component} from 'react';
import ReactDOM from 'react-dom'
console.log(React.Component)// React中的内置类
/* 
  react 中两种编写组件的方式 
  1  function 组件名【首字母必须大写】(使用该组件时，在组件行内编写的参数){
    return  组件对应的结构
  }

  2  class 组件名【首字母大写】 extends 内置类(Component){
    render(){
      return  组件对应的结钩
    }
  }

*/

function Child2(props){
  return <>
    className是{props.className}
    function 组件
  </>
}

class Child1 extends Component{
  // constructor(props){
  //   console.log(props)
  //   super(props)//super就是Component这个父类；其实相当于我们的call继承（也就是继承私有属性）
  // }
  render(){
    // this是谁？ 都是当前实例
    console.log(this.props)
    return <>
      className是{this.props.className}
      <h2>HELLO</h2>
    </>
  }
}
class App extends React.Component{
  render(){
    // 这个函数名是react规定的一个函数名；当前这个组件渲染的结构
    // 就是这个函数的返回值；
    return <div>
      <h1>class组件</h1>
      <Child1 className='qqq'/> 

      {/*把行内属性 整个打包成一个对象传给组件对应的函数 */}
      <Child2 className='qqq'/>
    </div>
  }
}
ReactDOM.render(<App/>,document.getElementById('root'))
