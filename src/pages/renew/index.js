import React, {useEffect, useCallback, useContext, useState} from 'react'
import './style.styl'
import {StoreContext} from 'redux-react-hook'
import {Steps, Row, Col, Card, Avatar, Table, Button, Progress, message} from 'antd'
import {connect} from 'react-redux'
import {actionCreators as frameac} from '../container/store'
import {Route, Redirect, useHistory, Switch} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Config from '../../config'
import {changeNum2StrType, isEmptyObject} from "../../utils/utils";
import boy from "../../assets/img/boy.svg";
import girl from "../../assets/img/girl.svg";
import {updateDistance} from "../../store/borrow/actionCreators";
//borrow组件
const Renew = (props) => {
  const [hasExceed, setHasExceed] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogBook, setDialogBook] = useState({})
  let history = useHistory()
  // 获取store中的数据
  let {
    cover,
    hasBorrowed,
    isBorrowing,
    step,
    identity,
    user,
    borrowBooks,
    shopList,
    updateDistance
  } = props

  useEffect(() => {
    if (isEmptyObject(props.user)) {
      message.warning('请先进行登录')
      history.replace('/login')
    }
  }, [])

  //引入steps步骤条
  const {Step} = Steps
  const gridStyle = {
    width: '100%',
    textAlign: 'left',
  }

  const handleDistance = (dialogBook) => {
    const {id} = dialogBook
    let newArray = JSON.parse(JSON.stringify(borrowBooks))
    for (let item of newArray) {
      if (item.id == id) {
        if (item.distance + 30 > 60) {
          message.info('该书的时间充裕,无需续借')
          break
        } else {
          item.distance += 30
        }
        break
      }
    }
    updateDistance(newArray)
    message.success('续借成功')
    setOpenDialog(false)
  }

  //求借书时间百分比
  const getPresentNumber = (time) => {
    if (time > 30) {
      return 100
    }
    if (time > 0) {
      return Math.floor(time / 30 * 100)
    } else {
      return 0
    }
  }

  const columns = [
    {
      title: '书封',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover, record, index) => <Avatar src={cover}/>,
    },
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: '剩余到期天数',
      dataIndex: 'distance',
      key: 'distance',
      render: (text, record) => {
        return (
          <div className="remainDateInfo">
            <Progress showInfo={false} percent={getPresentNumber(text)}
                      strokeColor={getPresentNumber(text) >= 85 ? "#52c41a" : getPresentNumber(text) >= 40 ? "#1890ff" : '#ff4d4f'}/>
            &nbsp;&nbsp;
            <span
              className="remainDateInfoText">{(parseInt(text) < 0 ? `超出了${Math.abs(parseInt(text))}天` : `剩余${text}天`)}</span>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'isReborrow',
      key: 'operation',
      render: (text, record, index) => {
        // debugger
        //已续借并未超期
        if (record.isReborrow && record.distance >= 0) {
          return <Button className="successText" type="primary"
                         onClick={() => props.modifyShowAlert(true, "请前往图书馆归还", "warning")}>归还</Button>
        } else {
          //说明有逾期的书
          if (hasExceed) {
            if (record.distance > 0)
              return <Button type="primary" disabled>续借</Button>
            else
              return <Button danger type="primary">缴纳罚金</Button>
          } else {
            record.index = index
            return <Button type="primary" onClick={() => openRenewDialog(record)}>续借</Button>
          }
        }
      }
    },
  ]

  //续借按钮按下
  const openRenewDialog = (record) => {
    setDialogBook(record)
    setOpenDialog(true)
  }

  return (
    <div className="renewWrapper">
      <Dialog
        open={openDialog}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-description">
            是否需要续借&nbsp;&nbsp;<span className="dialogBookName">《{dialogBook.name}》</span>&nbsp;&nbsp;?
          </DialogTitle>
          <DialogContentText id="alert-dialog-description" className="dialogBookText">
            书籍归还时间延长30天
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="primary" color="primary" onClick={() => handleDistance(dialogBook)}>
            确定
          </Button>
          <Button color="primary" onClick={() => setOpenDialog(false)}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <div className="infoLine">
        <Card
          className="infoCard"
          title="用户信息"
          extra={user.sex === 0 ? <Avatar size="small" src={boy}/> : <Avatar size='small' src={girl}/>}
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
      </div>
      <div className="renewbookWrapper">
        <Card title="温馨提示" bordered={false} size="small" className="tipsCard">
          <p>
            您可以在此处续借您之前借阅的图书，若您想要归还图书，请<span className="important">前往图书馆进行归还</span>，目前平台不支持归还书籍。
          </p>
        </Card>
        <Table
          pagination={false}
          rowKey={record => record.id}
          className="table"
          dataSource={borrowBooks}
          columns={columns}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.loginUser.user,
  borrowBooks: state.bookData.borrowBooks,
  shopList: state.bookData.shopList,
  showAlert: state.frame.get('showAlert'),
  message: state.frame.get('message'),
  messageType: state.frame.get('messsageType'),
  name: state.frame.get('name'),
  card: state.frame.get('card'),
  cover: state.frame.get('cover'),
  hasBorrowed: state.frame.get('hasBorrowed'),
  isBorrowing: state.frame.get('isBorrowing'),
  step: state.borrow.get('step'),
  identity: state.frame.get('identity'),
})

const mapDispatchToProps = (dispatch) => ({
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
  updateDistance: (borrowBooks) => dispatch(updateDistance(borrowBooks))
})

export default connect(mapStateToProps, mapDispatchToProps)(Renew)
