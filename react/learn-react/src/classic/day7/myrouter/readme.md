BrowserRouter  相当于我们的 history模式
HashRouter    相当于我们的  hash 模式
  Route   相当于我们的 router-view  ===>
          path:'/home'  
          component={Home}
          render={()=><h1>666</h1>}
          exact 属性 是相当于 精确匹配 ；只有路径一摸一样的时候 才会走到


  Link    类似于 router-link 只是没有对应的活动类名
  NavLink  有活动类名 
  Switch  用这个盒子包起来之后 只要有一个匹配了 下边的Route就不再查看
  Redirect  这个组件是用来重定向的；




  传参的两种方式 ： search   params  state
  search  
    <Link to="/home?qq=123&bb=234">   获取： this.props.location.search
    <Link to={{pathname:'/home',search='?qqq=123&bbb=234'}}>

  params 
    <Route path='/home/:aaa' component={HOME}>
    <Link to='/home/666'>   获取  this.props.match.params


react-router-dom中的路由嵌套：
哪个组件的子路由  就在哪个组件中编写 Route    


编程式 导航： this.props.history.push  .replace   .go .goBack
  
