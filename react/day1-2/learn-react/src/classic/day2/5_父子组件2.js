import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component{
  render(){
    console.log(this.props)
    let {children} = this.props;//等价于 vue中的 slot
    // children 有可能是一个数组 也有可能是一个字符串
    let til = [],text = [];
    if(children instanceof Array){
      // 判断children是不是一个数组 是数组 我们就从数组中挑出 要放到h1中的元素
      children.forEach(item=>{
        if(typeof item == 'object'){
          // 证明item是一个标签
          if(item.props && item.props.name123 =='title'){
            // 若这个标签是要放到 h1中的 那么就把它push到til这个数组中
            til.push(item)
          }else{
            // 没有title这个属性 证明是要放到 文本中的
            text.push(item)
          }
        }else{
          // 就是一个字符串 那肯定就是放到text中的
          text.push(item)
        }
      })
    }
    return <>
      <h1>{til}</h1>
      <button onClick={this.props.onClick}>{text}</button>
    </>
  }
}
class Show extends React.Component{
  render(){
    return <h1>
      当前数字是{this.props.count}
    </h1>
  }
}
class App extends React.Component {
    constructor() {
        super();
        this.state = {
          count:10
        }
    }
    add=(n)=>{
      this.setState({
        count:this.state.count + n
      })
    }
    minus=(n)=>{
      this.setState({
        count:this.state.count - n
      })
    }
    render() {
        return <div className=''>
          <Show count={this.state.count}></Show>
          <Button onClick={()=>this.add(1)}>增加<i name123='title'>hahaha</i></Button>
          <Button onClick={()=>this.minus(2)}>减少<strong>666</strong></Button>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))