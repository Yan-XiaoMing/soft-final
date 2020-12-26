import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './style.styl'
import 'bootstrap/dist/css/bootstrap.min.css';
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from "antd";

ReactDOM.render(<ConfigProvider locale={zhCN}><App/></ConfigProvider>, document.getElementById('root'))
