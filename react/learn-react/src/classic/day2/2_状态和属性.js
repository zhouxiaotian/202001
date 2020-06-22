import React,{Component} from 'react'
import ReactDOM from 'react-dom';

/* 
  在react中 每一个组件 只有两个数据来源；
  状态state  组件自己的数据   vue的data
  属性props  外边传给这个组件的数据  vue的props

  无状态组件 就是没有自己的state 数据全在 props中；
*/
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      a:10000,
      b:20000
    }
  }
  render(){
    console.log(this.props)
    this.state.a = 1;
    // this.props.a = 2; props中的属性只能读不能改 这点跟vue一致；
    return <div>
      属性是：{this.props.a}
      状态是：{this.state.a}
    </div>
  }
}
ReactDOM.render(<App className='qqq' a = {666} b = {888} />,document.getElementById('root'))

