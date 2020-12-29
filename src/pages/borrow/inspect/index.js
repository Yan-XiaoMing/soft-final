import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Card, Table, Avatar, Button, message} from 'antd'
import { actionCreators } from '../store'
import {useHistory} from 'react-router-dom'
import './style.styl'
import {addBorrow} from "../../../store/borrow/actionCreators";
const Inspect = props => {
  let history = useHistory()
  useEffect(() => {
    if(props.shopList.size === 0 && props.step !== 0){
      history.replace('/index/borrow/check')
    }
     props.changeStep(1)
  }, [])

  const columns = [
    {
      title: '书封',
      dataIndex: 'cover',
      key: 'cover',
      render: (text, record, index) => <Avatar src={text}/>,
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
    }
  ]

  const commitShopList = () => {
    const {addBorrow,shopList} = props
    if(shopList.length > 0){
      addBorrow(shopList)
      history.push('/index/borrow/process')
    }
    else{
      message.warn('书单信息有误')
      history.replace('/index/borrow/check')
    }
  }
    return (
      <div className="checkbookWrapper">
        <Card title="温馨提示" bordered={false} size="small" className="tipsCard">
          <p>
            请检查您的借阅信息，如果出现错误，请回退到上一步修改您的借阅信息.
          </p>
        </Card>
        <Table
          pagination={false}
          rowKey="table"
          className="table"
          dataSource={props.shopList}
          columns={columns}
        />
        <div className="oprationbuttons">
          <Button onClick={()=>history.goBack()}>上一步</Button>
          <Button onClick={()=>commitShopList()}>提交订单</Button>
        </div>
      </div>
    )
}

const mapState = (state) => ({
  borrowBooks: state.bookData.borrowBooks,
  shopList: state.bookData.shopList,
  step:state.borrow.get('step')
})
const mapDispatch = (dispatch) => ({
  changeStep() {
    dispatch(actionCreators.changeStep(1))
  },
  addBorrow:(shopList)=>dispatch(addBorrow(shopList))
})

export default connect(mapState, mapDispatch)(Inspect)
