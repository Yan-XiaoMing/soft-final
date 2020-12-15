import React from 'react'
import {Form, Input, Button, Tooltip, Divider} from 'antd';
import {UserOutlined, LockOutlined,EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import * as Yup from 'yup'
import background from '../../assets/img/bg.png';
import logo from '../../assets/img/hznu-logo.png';
import './style.styl'
import './style.less'

const SignupSchema = Yup.object().shape({
  account: Yup.string()
    .required('请输入学号')
    .matches(/^[0-9]+$/, '学号只包含数字')
    .length(13, '学号位数应该是13位的'),
  password: Yup.string()
    .required('请输入密码')
    .matches(
      /^[a-zA-Z0-9_]{5,}$/,
      '密码是只由数字、大小写字母、下划线组成的至少5位的字符串'
    ),
  captcha: Yup.string().required('请输入验证码').length(4, '验证码有4位'),
  policy: Yup.boolean().test({
    name: 'policy',
    message: '您必须同意我们的隐私政策',
    test: (value) => {
      console.log('this is ' + value)
      return value
    },
  }),
})

const Login = () => {
  return (
      <div className='login-wrapper' style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#b8e5f8'
      }}>
        <div className='login-title'
             style={{backgroundImage: `url(${logo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
        <h1 className='login-title-h'>图书管理系统</h1>
        <div className='login-content-wrapper'>
          <div className='login-content'>
            <div className='login-content-title'>
          <span className='login-content-header'>
            密码登录
          </span>
            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true
                }}

            >
              <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的账号!'
                    }
                  ]}
              >
                <Input size='large' prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入您的账号"/>
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

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button login-form-button-item">
                  登录
                </Button>
              </Form.Item>
            </Form>
            <div className='login-divider-wrapper'>
              <Divider/>
            </div>
          </div>
          <div className='login-end'>
            杭州师范大学图书管理系统
          </div>
        </div>
      </div>
  )
}

export default Login
