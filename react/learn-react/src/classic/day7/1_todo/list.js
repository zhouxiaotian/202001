import React from 'react';
import Button from './button'
import {connect} from 'react-redux'
class List extends React.Component {
    render() {
        let {list} = this.props;
        console.log(list)
        return <ul className=''>
            {
              list.map(item=>{
                return <li key={item}>{item}  <Button item={item}/></li>
              })
            }
        </ul>;
    }
}
List = connect((state)=>{
  return {
    list:state.todoReducer.todoList
  }
},(dispatch)=>{
  return {
    dispatch
  }
})(List)
export default List