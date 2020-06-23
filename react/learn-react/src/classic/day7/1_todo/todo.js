import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux'
import store from '../myredux/index'
import MyInput from './myinput'
import List from './list'
class App extends React.Component {
    constructor() {
        super();
        
    }
    render() {
        console.log(this.props)
        return <div className=''>
            <MyInput></MyInput>
            <List/>
        </div>;
    }
}
App = connect((state)=>{
  console.log(state)// 使用了 combineReducers之后，state就成了各个小state的合集
  return {
    aaa:state.countReducer.count
  }
},(dispatch)=>{
  return {
    dispatch
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>,document.getElementById('root'))