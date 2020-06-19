import React from 'react';
import ReactDOM from 'react-dom';
import Vote from './views/vote';

/* 导入公共的样式 */
import './assets/css/reset.min.css';
import './assets/css/common.less';

ReactDOM.render(<>
  <Vote title="你更喜欢vue还是react" supNum={10} oppNum={20} />

  <Vote title="大家肯定能找到好工作" />
</>, document.getElementById('root'));