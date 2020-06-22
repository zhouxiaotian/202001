import React from 'react';
import ReactDOM from 'react-dom';

/* 
  ref=‘xxx’ 这种方式 我们通过 this.refs.xxx 获取对应的DOM 或者 组件；将来要被废弃
  ref={(el)=>{this.xxx=el}} 直接通过 this.xxx 即可调到对应的组件或者DOM元素
  
  第三种 ：
  先在constructor中 编写 this.xxx = React.createRef();
  使用的时候  ref={this.xxx}  通过 this.xxx.current 即可调到对应的组件或者DOM元素

*/
class Child extends React.Component{
  render(h) {
    return <h1>
      子组件
    </h1>
  }
}

class App extends React.Component {
    constructor() {
        super();
        this.myRef = React.createRef();// 最先写法
        this.myRef2 = React.createRef();// 最先写法
    }
    fn=()=>{
      console.log(this)
    }
    render() {
        return <div className=''>
          <button onClick={this.fn}>获取</button>
          {/* <Child ref='child'/>
          <h2 ref='h2'>666</h2> */}

          {/* <Child ref={(el)=>{this.child = el}}/>
          <h2 ref={(ele)=>{this.h2 = ele}}>666</h2> */}

          <Child ref={this.myRef}/>
          <h2 ref={this.myRef2}>666</h2>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))