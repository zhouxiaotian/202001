import React from 'react';
import { connect } from 'react-redux'
// import {ADDTODO} from '../myredux/types'
import {add} from '../myredux/actions'
class MyInput extends React.Component {
  state = {
    todo: ''
  }
  change = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  submit = (e)=>{
    if(e.keyCode == 13){
      console.log(this.props)
      // this.props.dispatch({type:ADDTODO,val:this.state.todo})
      this.props.dispatch(add(this.state.todo))
      this.setState({
        todo:''
      })
    }
  }
  render() {
    let { todo } = this.state;
    return <div className=''>
      <input type="text" value={todo} onChange={this.change} onKeyDown={this.submit} />
    </div>;
  }
}
MyInput = connect(() => {

  return {}
}, (dispatch) => {
  return {
    dispatch
  }
})(MyInput)
export default MyInput
