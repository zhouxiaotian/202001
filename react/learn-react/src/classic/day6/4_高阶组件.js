import React from 'react';
import ReactDOM from 'react-dom';
//  高阶组件 其实就是一个函数； 函数接收一个组件作为参数 返回值是一个新组件
let connect = (Comp)=>{
  // 接收了一个组件
  class HHH extends React.Component{
    render(){
      return <div className='hahaha'>
        <Comp name='你猜' age='不知道'/>
        {/* <Temp name='你猜' age='不知道'/> */}
      </div>
    }
  }
  return HHH
}
let connect2 = function(options){
  return function(Comp){
    class HHH extends React.Component{
      render(){
        return <div className='hahaha'>
          <Comp {...options}/>
          {/* <Temp name='你猜' age='不知道'/> */}
        </div>
      }
    }
    return HHH
  }
}

let connect3 = options=>Comp=>{
  class HHH extends React.Component{
    render(){
      return <div className='hahaha'>
        <Comp {...options}/>
        {/* <Temp name='你猜' age='不知道'/> */}
      </div>
    }
  }
  return HHH
}

class Temp extends React.Component{
  render(){
    console.log(this.props)
    return <h1>小组件</h1>
  }
}

let Temp2 = connect(Temp);

let Temp3 = connect3({name:'你猜123',age:'不知道123'})(Temp);
// Temp2 就是 connect函数执行的结果 HHH
// 渲染 Temp2  其实就是 渲染的 HHH
// HHH渲染的时候 要执行自己的render
// 当 render执行 返回 div结构的时候 发现里边有一个组件Comp
// Comp 是connect执行的是 传进来的参数；--》（Temp组件）
// 渲染Comp 就是渲染  Temp这个组件

class App extends React.Component {
    constructor() {
        super();
        
    }
    render() {
        return <div className=''>
          <Temp></Temp>
          <Temp2/>
          <Temp3/>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))