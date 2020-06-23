import React from 'react';
import ReactDOM from 'react-dom';
// 使用 router 需要引入对应的组件
import {HashRouter,BrowserRouter,Route,Link,NavLink,Switch,Redirect} from 'react-router-dom'
// HashRouter  类似于 vue  --> mode:hash
// BrowserRouter 类似于 vue -->  mode:history
// Route  类似于 vue 的 router-view
// Link  相当于 我们vue 的 router-link
// NavLink 类似于 Link  但是比Link 多了一个活动类名

import HOME from './home'
import LIST from './list'
class App extends React.Component {
    constructor() {
        super();
        
    }
    render() {
        return <div className=''>
          {/* <NavLink to='/home'>首页</NavLink>
          <NavLink to='/list'>列表页</NavLink> */}
          <NavLink to={{pathname:'/home',search:'?qqq=123&bbb=234'}}>首页</NavLink>
          <NavLink to={{pathname:'/list'}}>列表页1</NavLink>
          <NavLink to={{pathname:'/list/666'}}>列表页2</NavLink>
          <NavLink to={{pathname:'/list/888',state:{a:12,b:23}}}>列表页3</NavLink>
          <div>
            {/* <Route path='/home' component={HOME}></Route>
            <Route path='/list' exact component={LIST}></Route>
            <Route path='/list/:aaa' component={LIST}></Route> */}
            <Switch>
              {/* <Route path='/' exact render={()=><h1>hello</h1> }></Route> */}
              <Route path='/' exact render={()=>{
                return <Redirect to='/list/999'></Redirect>
              }}></Route>
              <Route path='/home' component={HOME}></Route>
              <Route path='/list/:aaa' component={LIST}></Route>
              <Route path='/list' component={HOME}></Route>
              <Route render={()=><h1>404</h1>}></Route>
            </Switch>
          </div>
        </div>;
    }
}

ReactDOM.render(<HashRouter>
  <App/>
</HashRouter>,document.getElementById('root'))