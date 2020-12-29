import React, {useEffect, useRef, useState} from 'react'
import {Form, Input, Button, Divider, message} from 'antd';
import {UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import background from '../../assets/img/bg.png';
import logo from '../../assets/img/hznu-logo.png';
import Title from "./components/title/title";
import {useDebounce} from '../../components/debounce/debounce.hook'
import Oauth from "./components/oauth";
import Agreement from "./components/agreement";
import Register from "./components/register";
import {checkResponse, validatePhone} from "../../utils/utils";
import {getPhoneCode, phoneLogin, userLogin} from "../../api/user";
import {connect} from "react-redux";
import { loginUser } from './store/actionCreators'
import './style.styl'
import './style.less'

const Login = ({handleLoginUser,history}) => {
  const [showType, setShowType] = useState(1)
  let [timer, setTimer] = useState(60)
  const timeout = useRef(null)
  const [form] = Form.useForm();

  useEffect(() => {
    if (timer != 60) {
      setTimeout(() => {
        if (timer > 0) {
          setTimer((c) => c - 1);
        }
        else{
          setTimer(60)
        }
      }, 1000);
    }
  }, [timer])

  const codeClick = async () => {
    const validate = await form.validateFields(['phone'])
    console.log(validate)
    if (timeout.current) {
      message.warn('请稍后再获取验证码')
    } else {
      const result = await getPhoneCode(validate.phone)
      console.log(result)
      if(checkResponse(result)){
        timeout.current = setTimeout(() => {
          setTimer(c=>c-1)
        }, 1000)
      }
    }
  }

  const handleCodeClick = useDebounce(codeClick, 100)

  const onFinish = async () => {
    const value = form.getFieldsValue()
    let result = null
    console.log(value)
    if(showType === 1){ //学号登录
      result = await userLogin(value)
    }
    else{ //短信登录
      result = await phoneLogin(value)
    }
    console.log(result)
    if(checkResponse(result)){
      const {data} = result.data
      handleLoginUser(data)
      message.success('登录成功')
      history.replace('/')
    }
    else{
      if(showType === 1){
        message.error('用户名或密码错误')
      }
      else{
        message.error('验证码有误或已过期')
      }
    }
  }
  return (
    <div className='login-wrapper' style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundColor: '#b8e5f8'
    }}>
      <div className='login-title'>
        <img src={logo} alt='logo'/>
      </div>
      <h1 className='login-title-h'>图书管理系统</h1>
      <div className='login-content-wrapper'>
        <div className='login-content'>
          <Title showType={showType} setShowType={setShowType}/>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            {showType === 1 ? (
              <>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的学(工)号!'
                    }
                  ]}
                >
                  <Input size='large' prefix={<UserOutlined className="site-form-item-icon"/>}
                         placeholder="请输入您的学(工)号"/>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的密码!'
                    }
                  ]}
                >
                  <Input.Password
                    size='large'
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    placeholder="请输入您的密码"
                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      validator:validatePhone,
                    }
                  ]}
                >
                  <Input size='large' addonBefore="手机号" placeholder="请输入您的账号"/>
                </Form.Item>
                <div style={{display: "flex"}}>
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: true,
                        message: '请输入您的验证码!'
                      }
                    ]}
                  >
                    <Input addonBefore="验证码" size='large' placeholder="请输入验证码"/>
                  </Form.Item>
                  <div onClick={handleCodeClick} className='login-code-btn'>
                    <span>{timer === 60 ? '获取验证码' : `${timer}s 后再获取`}</span>
                  </div>
                </div>

              </>
            )
            }
            <Form.Item>
              <Button type="primary" htmlType="submit"
                      className="login-form-button login-form-button-item">
                登录
              </Button>
            </Form.Item>
          </Form>
          <Agreement />
          <Register />
          <div className='login-divider-wrapper'>
            <Divider style={{margin:'10px 0 0px'}}/>
          </div>
        </div>
        <Oauth />
        <div className='login-end'>
          杭州师范大学图书管理系统
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginUser:(user) => dispatch(loginUser(user))
  }
}

export default connect(null,mapDispatchToProps)(Login)
