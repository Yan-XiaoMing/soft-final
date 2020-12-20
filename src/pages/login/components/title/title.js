import React from "react";

const loginHeadConfig = [
  {
    key: 1,
    name: '密码登录'
  },
  {
    key: 2,
    name: '手机登录'
  }
]

const Title = ({showType = 1,setShowType}) => {

  const handleTitleClick = key => {
    setShowType(key)
  }

  return (
    <div className='login-content-title'>
      {loginHeadConfig.map(item => (
        <span onClick={() => handleTitleClick(item.key)} key={item.key} className={`${showType === item.key ? 'login-content-header login-content-header-no' : 'login-content-header-no'}`}>
          {item.name}
        </span>
      ))}
    </div>
  )
}

export default Title
