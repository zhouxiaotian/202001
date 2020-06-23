import React from 'react';
import ReactDOM from 'react-dom';
// 使用 router 需要引入对应的组件
import {HashRouter,BrowserRouter,Route,Link,NavLink,Switch} from 'react-router-dom'
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
          
            <Link to='/home'>首页</Link>
            <Link to='/list' title='666' className='box'>列表页</Link>

            {/* activeClassName='qqqq' 可以用来修改选中的属性名(默认是 active) */}
            <NavLink to='/home/666' activeClassName='qqqq'>首页</NavLink>
            <NavLink to='/list'>列表页</NavLink>

            <NavLink to={{pathname:'/home',params:{qqq:888}}}>首页</NavLink>


            {/* {path:/home,component:HOMR} */}
            <h3>444 </h3>
            <Switch>
              <Route path='/home/:qqq'  component={HOME}></Route>
              <Route path='/home'  component={HOME}></Route>
              {/* 是有 当前路径是 /home的时候  上边的这行代码 会被替换成 对应的组件 */}
              
              <h1>6666</h1>
              <Route path='/list'  component={LIST}></Route>
            </Switch>
        </div>;
    }
}

ReactDOM.render(<HashRouter>
  <App/>
</HashRouter>,document.getElementById('root'))