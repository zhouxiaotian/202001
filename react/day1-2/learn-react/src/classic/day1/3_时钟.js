import React from 'react';// webpack.ProvidePlugin
import ReactDOM from 'react-dom'
function Clock(){
  let date = new Date();
  // setInterval(() => {
  //   date = new Date();
  // }, 1000);
  return <h1>
    当前时间是：{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
  </h1>
}
setInterval(() => {
  ReactDOM.render(<Clock/>,document.getElementById('root'));
}, 1000);
ReactDOM.render(<Clock/>,document.getElementById('root'));
