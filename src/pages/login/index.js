import React, {useEffect, useRef, useState} from 'react'
import {Form, Input, Button, Tooltip, Divider, message} from 'antd';
import {UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import * as Yup from 'yup'
import background from '../../assets/img/bg.png';
import logo from '../../assets/img/hznu-logo.png';
import Title from "./components/title/title";
import {useDebounce} from '../../components/debounce/debounce.hook'
import Oauth from "./components/oauth";
import Agreement from "./components/agreement";
import Register from "./components/register";
import './style.styl'
import './style.less'
import {validatePhone} from "../../utils/utils";

const Login = (props) => {
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

  const codeClick = () => {
    console.log(timeout)
    if (timeout.current) {
      message.warn('请稍后再获取验证码')
    } else {
      timeout.current = setTimeout(() => {
        setTimer(c=>c-1)
      }, 1000)
    }
  }

  const handleCodeClick = useDebounce(codeClick, 100)

  const onFinish = () => {
    if(showType === 1){ //学号登录

    }
    else{ //短信登录

    }
    const {history} = props
    history.replace('/')
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
                    name="password"
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

export default Login
