import React from 'react';
import ReactDOM from 'react-dom';
import Vote from './views/vote';

/* 导入公共的样式 */
import './assets/css/reset.min.css';
import './assets/css/common.less';

ReactDOM.render(<React.StrictMode>
  <Vote title="你更喜欢vue还是react" />
</React.StrictMode>, document.getElementById('root'));