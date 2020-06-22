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

class App extends React.Component {
    constructor() {
        super();
        
    }
    render() {
        return <div className=''>
          <Count/>
        </div>;
    }
}

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>,document.getElementById('root'))