import React from "react";
import './style.less'
import GitHub from '../../../../assets/img/GitHub.svg'
import QQ from '../../../../assets/img/qq.svg'
import Wechat from '../../../../assets/img/wechat.svg'

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
  return (
    <ul className='oauth-link'>
      {oauthConfig.map(item => (
        <li key={item.key} className='oauth-link-item'>
          <img src={item.icon} alt='icon' />
          <h2>{item.name}</h2>
        </li>
      ))}
    </ul>
  )
}

export default Oauth
