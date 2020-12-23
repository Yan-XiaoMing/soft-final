import React, { useEffect, useCallback, useContext } from 'react'
import './style.styl'
import { StoreContext } from 'redux-react-hook'
import { Steps, Row, Col, Card, Avatar } from 'antd'
import { connect } from 'react-redux'
import Check from './check'
import Inspect from './inspect';
import Process from './process';
import {actionCreators as frameac} from '../container/store';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom'
import Token from '../../utils/token'
import Axios from '../../utils/request'
//borrow组件
const Borrow = (props) => {
  let history = useHistory()
  // 获取store中的数据
  let {
    login, //记录用户的登录状态
    name,
    card,
    cover,
    hasBorrowed,
    isBorrowing,
    step,
    identity,
  } = props


  //引入steps步骤条
  const { Step } = Steps
  const gridStyle = {
    width: '100%',
    textAlign: 'left',
  }

  //如果login状态发生变化，就要重新查看是否有进入usercenter的权限
  useEffect(()=>{
    if(login || Token.validate()){
    }else
        history.replace('/login')
  },[login])

  return (
    <div className="borrowWrapper">
      <div className="stepBar">
        <Steps current={step}>
          <Step title="操作图书" description="操作您要借阅的书籍" />
          <Step title="确认图书" description="确认您要借阅的书籍" />
          <Step  title="提交借书订单" description="提交您的书单"
          />
        </Steps>
      </div>
      <div className="infoLine">
              <Card
                className="infoCard"
                title="用户信息"
                extra={<Avatar size="small" src={cover} />}
              >
                <Card.Grid style={gridStyle}>卡号 | {card}</Card.Grid>
                <Card.Grid style={gridStyle}>姓名 | {name}</Card.Grid>
                <Card.Grid style={gridStyle}>身份 | {identity}</Card.Grid>
                <Card.Grid style={gridStyle}>
                  已借阅 | {hasBorrowed} 本
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  正在借阅 | {isBorrowing} 本
                </Card.Grid>
              </Card>
          <div className="infoRight">
            <Switch>
              <Route path="/index/borrow/check" component={Check} />
              <Route path="/index/borrow/inspect" component={Inspect} />
              <Route path="/index/borrow/process" component={Process}/>
              <Redirect exact from="/index/borrow" to="/index/borrow/check" />
            </Switch>
          </div>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  login: state.frame.get('login'),
  showAlert: state.frame.get('showAlert'),
  message: state.frame.get('message'),
  messageType: state.frame.get('messsageType'),
  name: state.frame.get('name'),
  card: state.frame.get('card'),
  cover: state.frame.get('cover'),
  hasBorrowed: state.frame.get('hasBorrowed'),
  isBorrowing: state.frame.get('isBorrowing'),
  step: state.borrow.get('step'),
  identity: state.frame.get('identity')
});

const mapDispatch = (dispatch) => ({
  //修改用户的数据
  modifyUserInfo(info) {
    dispatch(frameac.modifyUserInfo(info))
  },
  modifyLogin(state) {
    dispatch(frameac.modifyLogin(state))
  },
  modifyShowAlert(show, message, type) {
    dispatch(frameac.modifyShowAlert(show, message, type))
  },
})

export default connect(mapState, mapDispatch)(Borrow)
