import React from 'react';
import ReactDOM from 'react-dom';
import Vote from './views/vote';

let n = 0;

setInterval(() => {
  n++;
  if (n > 2) return;

  ReactDOM.render(<div>
    {/*
      * 第一次调取组件，组件周期函数：constructor -> WillMount -> render -> DidMount 
      * 1000MS
      * 第二次调取组件，传递给组件的属性发生了改变，但是Vote组件并不是按照全新加载的方式渲染（上一次调用的组件并没有销毁），周期函数：componentWillReceiveProps -> shouldComponentUpdate ->(TURE) -> WillUpdate -> render -> DidUpdate
     */}
    <Vote title={n} />
  </div>, document.getElementById('root'));
}, 1000);