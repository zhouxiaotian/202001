import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* 导入公共的样式 */
import './assets/css/reset.min.css';
import './assets/css/common.less';

/* 导入ANTD组件库 */
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

/* 导入STORE */
import store from './store/index';
import ThemeContext from './ThemeContext';

ReactDOM.render(<ConfigProvider locale={zhCN}>
  <ThemeContext.Provider value={{ store }}>
    <App />
  </ThemeContext.Provider>
</ConfigProvider>, document.getElementById('root'));