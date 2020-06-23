import React from 'react';
import {connect} from 'react-redux'
import {add} from './store/actions'
class Add extends React.Component {
    state = {
      todo:''
    }
    change = (e)=>{
      this.setState({
        todo:e.target.value
      })
    }
    add= ()=>{
      // this.props.dispatch({})
      this.props.dispatch(add(this.state.todo))
      this.props.history.push('/list')
    }
    render() {
        return <div className=''>
            <input type="text" value={this.state.todo} onChange={this.change}/>
            <button onClick={this.add}>新增</button>
        </div>;
    }
}
Add = connect((state)=>{
  return {}
},(dispatch)=>{
  return {
    dispatch
  }
})(Add)
export default Add