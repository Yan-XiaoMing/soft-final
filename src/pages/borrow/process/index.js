import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Card, Table, Avatar, Button,Spin,Alert } from 'antd'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { actionCreators } from '../store'
import {useHistory} from 'react-router-dom'
import Axios from '../../../utils/request'
import { actionCreators as frameac } from '../../container/store'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import './style.styl'
const Process = props => {
  let history = useHistory()
  const [uploading, setUploading] = useState(true)
  const [success,setSuccess] = useState(0)
  const [serial,setSerial] =useState("") //保存获得的订单号
  useEffect(() => {
    setTimeout(()=>{
      setUploading(false)
      setSuccess(1)
    },2000)
    if(props.bookData.size === 0 && props.step !== 1)
        history.replace('/index/borrow/check')
     props.changeStep()
  }, [])

    return (
      <div className="processbookWrapper">
        <Card title="温馨提示" bordered={false} size="small" className="tipsCard">
        <p>
         <span className="important">请不要退出</span>，耐心等待借书订单的生成。
        </p>
      </Card>
        <Spin  tip="提交借书订单中，请不要退出，耐心等待..." spinning={uploading}>
            <div>{
                success === 1 ? (
                    <div className="spin">
                        <CheckCircleOutlineRoundedIcon className="icon success"/>
                        <div className="success-text">借书订单生成成功</div>
                        <div className="success-order">书单号为{serial}</div>
                        <Button  className="go-back" onClick={()=>history.replace('/index/usercenter')}>前往个人中心查看</Button>
                    </div>
                ) :(
                    success === -1?(
                        <div className="spin">
                        <HighlightOffRoundedIcon className="icon failure"/>
                        <div className="success-text">借书失败</div>
                        <Button danger className="go-back" onClick={()=>history.replace('/index/borrow')}>尝试回到上一步重新提交</Button>
                    </div>
                    ):<div className="spin"></div>
                )
            }
            </div>
        </Spin>
      </div>
    )
}

const mapState = (state) => ({
  bookData: state.borrow.get('bookData'),
  listData: state.borrow.get('listData'),
  step:state.borrow.get('step')
})
const mapDispatch = (dispatch) => ({
  commitBorrowBook(bookData) {
    dispatch(actionCreators.commitBorrowedBooks(bookData))
  },
  changeStep() {
    dispatch(actionCreators.changeStep(2))
  },
  modifyShowAlert(show, message, type) {
    dispatch(frameac.modifyShowAlert(show, message, type))
  },
})

export default connect(mapState, mapDispatch)(Process)
