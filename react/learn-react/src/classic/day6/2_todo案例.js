import React from 'react';
import ReactDOM from 'react-dom';
// 创造一个input组件 
// 一个列表组件
// 一个button组件
class Input extends React.PureComponent{
  render() {
    let {value,onChange,onKeydown123} = this.props;
    return <>
      <input value={value} onChange={onChange} onKeyDown={onKeydown123} type="text"/>
    </>
  }
}
class List extends React.PureComponent{
  //  shouldComponentUpdate(){} // PureComponent 进行浅比较；新旧值 一样的生活 就不重新渲染
  render(){
    let {list123=[]} = this.props;
    return <>
      <ul>
        {
          list123.map((item,index)=>{
            return <li key={index}>{item} <Button>删除</Button></li>
          })
        }
        {/* <li>
          gsdfgsdfgsdfgf  <Button>删除</Button>
        </li> */}
      </ul>
    </>
  }
}
class Button extends React.PureComponent{
  render(){
    //children 类似于 vue的插槽
    let {children} = this.props;
    return <button>{children}</button>
  }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[1,2,3],// 这里存放 我们要去做的事情
          todo:''
        }
    }
    change = (e)=>{
      this.setState({
        todo:e.target.value
      })
    }
    keydown = (e)=>{
      // console.log(e.keyCode)
      if(e.keyCode == 13){
        // 证明敲的回车
        console.log(this.state.todo)
        // this.state.data.push(this.state.todo);
        this.state.data = this.state.data.concat(this.state.todo)
        this.setState({})
        // this.setState({
        //   data:this.state.data.concat(this.state.todo)
        // })
      }
    }
    render() {
        let {data,todo} = this.state;
        console.log(data)
        return <div className=''>
          <Input  value={todo} onChange={this.change} onKeydown123={this.keydown}/>
          <List list123={data}/>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))