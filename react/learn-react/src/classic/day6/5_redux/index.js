import React from 'react';
import ReactDOM from 'react-dom';

import {Provider,connect} from 'react-redux'
import store from './store'

class Count extends React.Component{
  render(){
    console.log(this.props)
    return <h1>
      当前数字是：{this.props.qqq}
    </h1>
  }
}
Count = connect((state)=>{
  console.log(state)
  return {
    qqq:state.count,
    www:111,
    eee:333
  }
},(dispatch)=>{
  return {
    dispatch
  }
})(Count)

class  Count2 extends React.Component{
  // 哪个组件想用 redux中的数据  就需要使用 connect处理， 不用的话 就需要使用 connect
  render(){
    console.log(this.props)
    return <h2>count2</h2>
  }
}

class App extends React.Component {
    constructor() {
        super();
        
    }
    add = ()=>{
      ///这个位置怎么能够调用到 dispatch
      console.log(this.props)
      // action  就是一个对象
      this.props.dispatch({type:"ADD",num123:10})
    }
    minus = ()=>{
      this.props.dispatch({type:"MINUS",num123:100})
    }
    render() {
        return <div className=''>
          <button onClick={this.add}>+</button>
          <button onClick={this.minus}>-</button>
          <Count/>
          <Count2/>
        </div>;
    }
}
App = connect(()=>{
  return {}
},(dispatch)=>{
  return {
    dispatch:dispatch
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>,document.getElementById('root'))