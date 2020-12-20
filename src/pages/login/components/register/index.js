import React, {useState} from 'react';
import {Drawer, Form, Button, Col, Row, Input, Select, Popconfirm} from 'antd';
import {validatePhone, validateID} from "../../../../utils/utils";
import './style.less'

const {Option} = Select;

const Register = () => {

  const [visible, setVisible] = useState(true)

  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true)
  };
  const onClose = () => {
    setVisible(false)
    setTimeout(()=>{
      form.resetFields()
    },300)
  };

  const onSubmit = () => {
    const validate = form.validateFields()
    console.log(validate)
    const value = form.getFieldsValue()
    console.log(value)
  }

  return (
    <>
      <div className='login-register'>
        <Button onClick={showDrawer} type="link">立即注册</Button>
      </div>
      <Drawer
        title="创建用户"
        width={520}
        onClose={onClose}
        visible={visible}
        bodyStyle={{paddingBottom: 80}}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Popconfirm
              placement="topRight"
              title="确定要取消注册吗?"
              onConfirm={onClose}
              okText="确定"
              cancelText="取消"
            >
              <Button style={{marginRight: 8}}>
                取消
              </Button>
            </Popconfirm>,

            <Button onClick={onSubmit} type="primary">
              注册
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{required: true, message: '请输入您的姓名'}]}
                hasFeedback
              >
                <Input  placeholder="请输入您的姓名"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                name="username"
                label="学(工)号"
                rules={[{required: true, message: '请输入您的学(工)号'}]}
              >
                <Input  placeholder="请输入您的学(工)号"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="密码"
                rules={[{required: true, message: '请输入您的密码'},{min:6,message:'密码不能少于6位'},{max:12,message:'密码不能大于12位'}]}
                hasFeedback
              >
                <Input.Password placeholder="请输入您的密码"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password2"
                label="密码确认"
                rules={[
                  {required: true, message: '请再次输入您的密码'},
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次密码输入不一致');
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password  placeholder="请输入您的密码"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sex"
                label="性别"
                rules={[{required: true, message: '请选择您的性别'}]}
                hasFeedback
              >
                <Select  placeholder="请选择您的性别">
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="身份"
                rules={[{required: true, message: '请选择您的身份(职位)'}]}
              >
                <Select  placeholder="请选择您的身份(职位)">
                  <Option value="0">校工作人员(非教师)</Option>
                  <Option value="1">本科生</Option>
                  <Option value="2">研究生</Option>
                  <Option value="3">教师</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="idNum"
            label="身份证号"
            rules={[{required: true,validator: validateID}]}
            hasFeedback
          >
            <Input placeholder="请输入您的身份证号"/>
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{required: true,validator: validatePhone}]}
            hasFeedback
          >
            <Input placeholder="请输入您的手机号"/>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
    ;
};

export default Register;
