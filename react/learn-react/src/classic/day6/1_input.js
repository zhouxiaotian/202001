import React from 'react';
import ReactDOM from 'react-dom';
class MyInput extends React.PureComponent{
  render(){
    let {
      type='text',
      value,
      onChange
    } = this.props;
    return <div>
      <input type={type} value={value} onChange={onChange}/>
    </div>
  }
}
/* 
    受控组件：  表单元素的值 受本组件的控制
    非受控组件： 表单元素的值 跟组件没关系  爱是啥是啥
 
*/
class App extends React.Component {
    state = {
      name:"我很帅"
    }
    change(e){
      this.setState({
        name:e.target.value
      })
    }
    change2 = (e)=>{
      // this 肯定是当前实例
      // this.setState({
      //   name:e.target.value
      // })
    }
    componentDidMount(){
      this.inp.value = this.state.name
    }
    input=(e)=>{
      // this.state.name = e.target.value;
      // this.setState({});
    }
    render() {
        let {name} = this.state;
        return <div className=''>
            <h1>{name}</h1>
            <MyInput type="text" value={name} onChange={(e)=>{this.change(e)}}/>
            <MyInput type="text" value={name} onChange={this.change.bind(this)}/>
            <MyInput type="text" value={name} onChange={this.change2}/>
            <input type="text" value={name} onChange={(e)=>{this.change(e)}}/>
            <input type="text" ref={(el)=>this.inp = el} onInput={this.input}/>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))