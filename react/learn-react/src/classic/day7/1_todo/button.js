import React from 'react';
import {connect} from 'react-redux'
// import {REMOVE} from '../myredux/types'
import {minus} from '../myredux/actions'
class Button extends React.Component {
    del = ()=>{
      // this.props.dispatch({type:REMOVE,val:this.props.item})
      this.props.dispatch(minus(this.props.item))
    }
    render() {
        return <>
          <button onClick={this.del}>删除</button>
        </>;
    }
}
Button = connect(()=>{return {}},(dispatch)=>{
  return {
    dispatch
  }
})(Button)
export default Button