import React, {useState, useEffect} from 'react';
import {actionCreators as frameac} from '../../pages/container/store';
import {connect} from 'react-redux';
import {Avatar} from 'antd';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HZNUImg from '../../assets/img/hznu-logo.png'
import {useHistory} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {logoutUser} from "../../pages/login/store/actionCreators";
import HeaderBg from "../header-bg";
import {isEmptyObject} from "../../utils/utils";
import boy from '../../assets/img/boy.svg'
import girl from '../../assets/img/girl.svg'
import './style.styl';

const Header = props => {

  const history = useHistory();
  //存储是否显示用户信息的下拉菜单
  const [open, setOpen] = useState(false);

  //退出当前账号的业务逻辑
  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <Navbar expand="md" className="header-wrapper p-0">
      <HeaderBg/>
      <Navbar.Brand href="#home" className="header-logo" onClick={() => history.push('/index/search')}>
        <img src={HZNUImg} width={50}/>
        <span className="header-logo-text">图书管理系统</span>
      </Navbar.Brand>
      <Navbar.Toggle id="header_toggle" className="mr-4"/>
      <Navbar.Collapse id="header_collapse">
        <Nav className="mr-auto header_router">
          <div className='header-router-wrapper'>
            <Nav.Link className="header_link" onClick={() => history.push('/index/search')}>寻找</Nav.Link>
          </div>
          <div className='header-router-wrapper'>
            <Nav.Link className="header_link" onClick={() => history.push('/index/borrow')}>借阅</Nav.Link>
          </div>
          <div className='header-router-wrapper'>
            <Nav.Link className="header_link" onClick={() => history.push('/index/renew')}>续借 / 归还</Nav.Link>
          </div>
          <div className='header-router-wrapper'>
            <Nav.Link className="header_link" onClick={() => history.push('/index/visit')}>场馆实景</Nav.Link>
          </div>
        </Nav>
        <Nav>
          <div className="header-user-info">
            {isEmptyObject(props.user) ?
              <ul className="header-user-login-register header_link">
                <li>
                  <Nav.Link onClick={() => history.push('/login')}>登录</Nav.Link>
                </li>
              </ul> :
              (
                document.body.clientWidth >= 768 ? (
                  <div className="header-avatar-wrapper"
                       onMouseEnter={() => setOpen(true)}
                       onMouseLeave={() => setOpen(false)}>
                    {props.user.sex === 0 ?<Avatar src={boy}/> : <Avatar src={girl}/>}
                    <span className="header-mini-name">{props.user.name}</span>
                    <ArrowDropDownIcon className="header-avatar-dropdown-icon"/>
                    {
                      open ?
                        (
                          <div className="user-info-board"
                               onMouseEnter={() => setOpen(true)}
                               onMouseLeave={() => setOpen(false)}>
                            <ul className="user-info-board-list">
                              <li onClick={() => history.push('/index/usercenter')}>
                                <SettingsIcon className="user-info-board-list-li-icon"/><span>用户中心</span>
                              </li>
                              <li onClick={() => handleLogout()}>
                                <ExitToAppIcon className="user-info-board-list-li-icon"/>
                                <span>退出</span>
                              </li>
                            </ul>
                          </div>
                        ) : null
                    }
                  </div>
                ) : (
                  <div className="header-mini-wrapper">
                    <div>
                      {props.user.sex === 0 ?<Avatar src={boy}/> : <Avatar src={girl}/>}
                      <span className="header-mini-name">{props.user.name}</span>
                    </div>
                    <ul className="user-info-mini-board-list m-0 mr-4">
                      <li onClick={() => history.push('/index/usercenter')}>
                        <SettingsIcon className="user-info-board-list-li-icon pb-1"/><span>用户中心</span>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <ExitToAppIcon className="user-info-board-list-li-icon pb-1"/><span>退出</span>
                      </li>
                    </ul>
                  </div>
                )
              )
            }
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user:state.loginUser.user,
  login: state.frame.get('login'),
  select: state.frame.get('select'),
  showAlert: state.frame.get('showAlert'),
  message: state.frame.get('message'),
  messageType: state.frame.get('messageType'),
  name: state.frame.get('name'),
  card: state.frame.get('card'),
  cover: state.frame.get('cover'),
});

const mapDispatch = (dispatch) => ({
  modifySelect(key) {
    dispatch(frameac.modifySelect(key));
  },
  modifyUserInfo(info) {
    dispatch(frameac.modifyUserInfo(info));
  },
  modifyShowAlert(show, message, type) {
    dispatch(frameac.modifyShowAlert(show, message, type));
  },
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatch)(Header)
