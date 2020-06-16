import React from 'react';
import ReactDOM from 'react-dom';
/* 

  父传子： 通过行内自定义属性 + this.props
  子传父： 通过行内自定义属性（对应的是一个函数） + this.props
  凡是用在组件上的属性  都是创造组件的那个人自己定义的
*/
class Button extends React.PureComponent{
  add=()=>{
    this.props.onClick(10)
  }
  minus=()=>{
    this.props.onClick(-10)
  }
  render(){
    console.log(this.props.qqq)
    return <div>
      <button onClick={this.add}>+</button>
      <button onClick={this.minus}>-</button>
    </div>
  }
}
// PureComponent 和  Component 都是react的内置组件；但是前者的性能稍高（涉及到某个钩子函数）
class Show extends React.PureComponent{
  // constructor(props){
  //   super(props)
  // }
  render(){
    // 子组件可以通过 this.props 接过来这个对象
    console.log(this.props)
    return <div className={this.props.className}>
      <h1>当前数字是{this.props.num}</h1>
    </div>
  }
}
class App extends React.Component {
    constructor() {
        super();
        this.state = {
          count:100
        }
    }
    changeCount(n){
      this.setState({
        count:this.state.count + n
      })
    }
    render() {
        let {count} = this.state;
        return <div className=''>
          {/* 把qqq:箭头函数 打包成一个对象传给了 Button组件对应的函数 */}
          <Button onClick={(n)=>{this.changeCount(n)}}/>

          <Show qqq={123} aaa={666} num={count} className='box'/>
          {/* 把qqq:123 aaa:666 num:100 打包成一个对象 传给Show组件对应的函数 */}
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))