import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators as frameac} from '../container/store'
import RightCard from './components/RightCard'
import {
  ManOutlined, WomanOutlined
} from '@ant-design/icons';
import {Avatar, Card, Button, message} from 'antd';
import {makeStyles} from '@material-ui/core/styles'
import Modal from 'react-bootstrap/Modal'
import BsButton from 'react-bootstrap/Button'
import {changeNum2StrType, isEmptyObject} from "../../utils/utils";
import boy from '../../assets/img/boy.svg'
import girl from '../../assets/img/girl.svg'
import './style.styl'

let formInputColor = '#0182ff'


const useStyles = makeStyles({
  input: {
    marginLeft: '10px',
  },
  fieldRoot: {
    width: '100%',
  },
  closeButton: {
    color: formInputColor,
  },
  uploadRoot: {
    color: formInputColor,
  },
  root: {
    marginLeft: '10px',
  },
  focused: {
    color: formInputColor,
  },
  button: {
    backgroundColor: '#0182ff',
  },
  expand: {
    border: 'none',
    boxShadow: 'none',
    marginTop: '5px',
  },
  radioRoot: {
    color: formInputColor,
    // width: "10px",
    // height:"10px"
  },
  radioChecked: {
    //   backgroundColor:formInputColor
    color: formInputColor
  },
})

const PersonalCenter = props => {
  const classes = useStyles()
  let history = useHistory()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  //设置文件上传的state
  const [fileList, setFileList] = useState([])
  //设置是否打开修改用户信息的对话框
  const [openDialog, setOpenDialog] = useState(false)
  //设置文件的返回头像的state
  const [avatarUrl, setAvatarUrl] = useState('')
  //设置密码可见性
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  let {
    select,
    login, //记录用户的登录状态
    showAlert,
    name,
    card,
    cover,
    hasBorrowed,
    isBorrowing,
    step,
    identity,
    sex,
    email,
    phone,
    signTime,
    user,
    borrowBooks,
    shopList
  } = props
  //验证是否登录
  console.log(props)

  const gridStyle = {
    width: '100%',
    textAlign: 'left',
  }

  //如果login状态发生变化，就要重新查看是否有进入usercenter的权限
  useEffect(() => {
    if (isEmptyObject(user)) {
      message.warning('请先完成登录')
      history.replace('/login')
    }
  }, [])


  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  //关闭编辑用户信息的模态框
  const closeModifyUserInfoDialog = () => {
    setOpenDialog(false)
    setFileList([])
  }

  return (
    <div className="personalCenterWrapper">
      <Button id="user_info_toggle" onClick={() => setOpen(true)}><span>></span></Button>
      {(
        document.body.clientWidth >= 768 ? (
          <Card
            className="infoBoard"
            title={
              <div className="avatarRow">
                {user.sex === 0 ? <Avatar className="avatar" size={34} src={boy}/>
                  : <Avatar className="avatar" size={34} src={girl}/>}
                <span className="name">书山有路勤为径</span>
              </div>
            }
          >
            <Card.Grid style={gridStyle}>姓名 | {user.name}</Card.Grid>
            <Card.Grid style={gridStyle}>学号 | {user.username}</Card.Grid>
            <Card.Grid style={gridStyle}>身份 | {changeNum2StrType(user.type)}</Card.Grid>
            <Card.Grid style={gridStyle}>电话
              | {typeof user.phone == 'undefined' || user.phone === '' ? "未指定" : user.phone}</Card.Grid>
            <Card.Grid style={gridStyle}>
              已借阅 | {borrowBooks.length} 本
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              我的书单 | {shopList.length} 本
            </Card.Grid>
            <Card.Grid style={gridStyle} className="modifyButtonLine">
              <Button className="modifyButton" type="link" onClick={() => {message.info('敬请期待!')}}>编辑我的信息</Button>
            </Card.Grid>
          </Card>
        ) : (
          <div>
            <Modal show={open} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>用户信息查看</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Card
                  className="mini_infoBoard"
                  title={
                    <div className="avatarRow">
                      <Avatar className="avatar" size={48} src={props.cover}/>
                      <span className="name">{props.name}</span>
                      {
                        sex === 1 ?
                          <ManOutlined className="sexIcon" style={{color: "#0182ff"}}/> :
                          <WomanOutlined className="sexIcon" style={{color: "#FF69B4"}}/>
                      }
                    </div>
                  }
                >
                  <Card.Grid style={gridStyle}>卡号 | {card}</Card.Grid>
                  <Card.Grid style={gridStyle}>身份 | {identity}</Card.Grid>
                  <Card.Grid style={gridStyle}>邮箱
                    | {typeof email == 'undefined' || email === '' ? "未指定" : email}</Card.Grid>
                  <Card.Grid style={gridStyle}>电话
                    | {typeof phone == 'undefined' || phone === '' ? "未指定" : phone}</Card.Grid>
                  <Card.Grid style={gridStyle}>第一次相遇
                    | {typeof signTime == 'undefined' || signTime === '' ? "未指定" : signTime}</Card.Grid>
                  <Card.Grid style={gridStyle}>
                    已借阅 | {borrowBooks.length} 本
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    我的书单 | {shopList.length} 本
                  </Card.Grid>
                  <Card.Grid style={gridStyle} className="modifyButtonLine">
                    <Button className="modifyButton" type="link" onClick={() => setOpenDialog(true)}>编辑我的信息</Button>
                  </Card.Grid>
                </Card>
              </Modal.Body>
              <Modal.Footer>
                <BsButton variant="primary" onClick={handleClose}>
                  关闭
                </BsButton>
              </Modal.Footer>
            </Modal>
          </div>
        )
      )
      }
      <div className="right-card-wrapper">
        <RightCard onOrderChange={() => {
          console.log('RightCard onOrderChange')
        }}/>
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
  email: state.frame.get('email'),
  name: state.frame.get('name'),
  card: state.frame.get('card'),
  cover: state.frame.get('cover'),
  hasBorrowed: state.frame.get('hasBorrowed'),
  isBorrowing: state.frame.get('isBorrowing'),
  step: state.borrow.get('step'),
  identity: state.frame.get('identity'),
  sex: state.frame.get('sex'),
  phone: state.frame.get('phone'),
  signTime: state.frame.get('signTime')
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter)
