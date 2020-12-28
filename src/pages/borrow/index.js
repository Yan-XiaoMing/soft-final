import React, { useEffect, useCallback, useContext } from 'react'
import { Steps,  Card, Avatar,message} from 'antd'
import { connect } from 'react-redux'
import Check from './check'
import Inspect from './inspect';
import Process from './process';
import {actionCreators as frameac} from '../container/store';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom'
import {changeNum2StrType, isEmptyObject} from "../../utils/utils";
import boy from '../../assets/img/boy.svg'
import girl from '../../assets/img/girl.svg'
import './style.styl'
//borrow组件
const Borrow = (props) => {
  let history = useHistory()
  // 获取store中的数据
  let {
    hasBorrowed,
    isBorrowing,
    step,
    identity,
    user,
    borrowBooks,
    shopList
  } = props
  //引入steps步骤条
  const { Step } = Steps
  const gridStyle = {
    width: '100%',
    textAlign: 'left',
  }

  //如果login状态发生变化，就要重新查看是否有进入usercenter的权限
  // useEffect(()=>{
  //   console.log(user)
  //   if(isEmptyObject(user)){
  //     message.warning('请先进行登录')
  //     history.replace('/login')
  //   }
  // },[])

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
          extra={user.sex === 0 ?<Avatar size="small" src={boy} />:<Avatar size='small' src={girl}/>}
        >
          <Card.Grid style={gridStyle}>学号 | {user.username}</Card.Grid>
          <Card.Grid style={gridStyle}>姓名 | {user.name}</Card.Grid>
          <Card.Grid style={gridStyle}>身份 | {changeNum2StrType(user.type)}</Card.Grid>
          <Card.Grid style={gridStyle}>
            已借阅 | {borrowBooks.length} 本
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            我的书单 | {shopList.length} 本
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
  user: state.loginUser.user,
  borrowBooks: state.bookData.borrowBooks,
  shopList: state.bookData.shopList,
  showAlert: state.frame.get('showAlert'),
  message: state.frame.get('message'),
  messageType: state.frame.get('messsageType'),
  name: state.frame.get('name'),
  card: state.frame.get('card'),
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
