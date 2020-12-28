import React from "react";
import { message } from 'antd'
import {CLIENT_ID,AUTHORIZE_URI,REDIRECT_URI} from "../../../../config/oauthConfig";
import GitHub from '../../../../assets/img/GitHub.svg'
import QQ from '../../../../assets/img/qq.svg'
import Wechat from '../../../../assets/img/wechat.svg'
import './style.less'

const oauthConfig = [
  {
    key: 1,
    name: 'GitHub',
    icon: GitHub
  },
  {
    key: 2,
    name: 'QQ',
    icon: QQ
  },
  {
    key:3,
    name:'微信',
    icon: Wechat
  }
]

const Oauth = () => {

  return (
    <div className='login-oauth'>
      <h1>社交帐号登录</h1>
      <OauthLink oauthConfig={oauthConfig} />
    </div>
  )
}

const OauthLink = ( {oauthConfig = []} ) => {

  const oauthClick = (key) => {
    if(key > 1){
      message.warn('该功能暂不开放,请选择GitHub登录')
    }else{
      console.log(`${AUTHORIZE_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`)
      debugger
      window.location.href = `${AUTHORIZE_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    }
  }

  return (
    <ul className='oauth-link' >
      {oauthConfig.map(item => (
        <li key={item.key} onClick={ () => oauthClick(item.key)} className='oauth-link-item'>
          <img src={item.icon} alt='icon' />
          <h2>{item.name}</h2>
        </li>
      ))}
    </ul>
  )
}

export default Oauth
