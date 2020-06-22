import React from 'react';
import ReactDOM from 'react-dom';
import Types from 'prop-types';

// react中的 怎么 限制 父串子过来的数据的类型 
// 需要用到 prop-types这个包

class Child extends React.Component{
  static propTypes = {
    // 
    // name:Types.number,// 规定 name必须是一个字符传
    name:Types.oneOfType([
      // 类型 可以是数字 也可以是 字符串  ;参数必传
      Types.string.isRequired,
      Types.number.isRequired
    ])
  }
  static defaultProps = {
    // 设置默认值使用的
    name:"默认值"
  }
  render() {
    let {name='默认值'} = this.props;
    return <h1>
      子组件
    </h1>
  }
}
// child.propTypes={}
class App extends React.Component {
    constructor() {
        super();
        
    }
    render() {
        return <div className=''>
            <Child name='666'/>
        </div>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))