import React from 'react';
import ReactDOM from 'react-dom';
import Vote from './views/vote';

/* JSX中调取组件：基于REACT-APP把JSX变为CREATE-ELEMENT后，遇到的是组件 type:Vote，当最后进行渲染的时候，遇到的TYPE如果是组件，怎把当前组件执行（函数式组件就是普通执行，类组件就是NEW执行，并且创建当前类的一个实例）；并且都会把解析出来的PROPS传递这个函数或者类； */

ReactDOM.render(<div>
  珠峰培训

  {/* 单闭合调用 */}
  <Vote title="你喜欢REACT还是VUE？" />

  {/* 双闭合调用 */}
  <Vote>
    <span>哈哈</span>
    <span>呵呵</span>
  </Vote>
</div>, document.getElementById('root'));