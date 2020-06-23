import React from 'react';
import { connect } from 'react-redux'
import { remove } from './store/actions'
class List extends React.Component {
  del = (item) => {
    this.props.dispatch(remove(item))
    if (this.props.ary.length == 1) {
      this.props.history.replace('/add')
    }
  }
  // 有兴趣 可以做 列表页的二级详情页
  render() {
    let { ary } = this.props;
    // if(ary.length == 0){
    //   this.props.history.replace('/add')
    // }
    return <ul className=''>
      {
        ary.map(item => <li key={item}>{item} <button onClick={() => { this.del(item) }}>删除</button></li>)
      }
    </ul>;
  }
}
List = connect((state) => {
  return {
    ary: state.toAry.list
  }
}, (dispatch) => {
  return {
    dispatch
  }
})(List)
export default List