import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
/* 
状态提升： 把子组件自己的state提升到 父组件上； 然后子组件通过props接收参数

*/
class Count extends React.PureComponent{
  // state = {
  //   count :199
  // }
  render() {
    return <div>
      <h2>当前数字是{this.props.count}</h2>
    </div>
  }
}
class App extends React.Component {
    constructor() {
        super();
        this.state = {
          num:100
        }
    }
    render() {
        return <div className=''>
            <button onClick={()=>{this.setState({num:++this.state.num})}}>+++</button>
            <Count count={this.state.num}/>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))