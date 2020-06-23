import React from 'react';
import{ Route } from 'react-router-dom'
class HOME extends React.Component {
    render() {
      console.log(this.props)
        return <div className=''>
          HOME
          <Route path='/home/a' render={()=><h2>home的a组件</h2>}></Route>
          <Route path='/home/b' render={()=><h2>home的b组件</h2>}></Route>
        </div>;
    }
}
export default HOME