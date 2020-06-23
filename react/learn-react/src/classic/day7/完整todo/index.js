import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/index'
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Add from './add'
import List from './list'
class App extends React.Component {
  constructor() {
    super();

  }
  render() {
    return <div className=''>
      <h1>
        <Link to='/add'>新增页</Link>
        <Link to='/list'>列表页</Link>
      </h1>
      <Switch>
        <Route path='/' exact render={(props) => {
          return <Redirect to='/list'></Redirect>
        }}></Route>
        <Route path='/add' component={Add}></Route>
        <Route path='/list' component={List}></Route>
      </Switch>
    </div>;
  }
}

ReactDOM.render(<Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
</Provider>, document.getElementById('root'))