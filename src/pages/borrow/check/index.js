import React, { useEffect, useState } from 'react'
import { Card, List, Avatar, Space, Button, Spin, Tag, message } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import bookData from '../../../config/mock/books'
import { connect } from 'react-redux'
import { actionCreators as frameac} from '../../container/store'
import { actionCreators } from '../store'
import './style.styl'
import { Redirect,useHistory } from 'react-router-dom'
import {deleteShopList} from "../../../store/borrow/actionCreators";
import pannelData from "../../../config/mock/pannelData";

const Check = (props) => {
  const history = useHistory()
  const [next,setNext] = useState(false) //是否可以到下一步
  const [listData, setListData] = useState([]) //列表数据
  let { shopList, borrowBooks } = props //获取redux中的数据
  //进入后首先将select设置为1，获取从搜索产生的待借阅的图书
  useEffect(() => {
    props.changeStep(0)
  }, [])

  useEffect(()=>{
    if(shopList.length - 1 > 0){
      setNext(true)
    }
    else{
      setNext(false)
    }
  },[shopList])

  //按照书的状态生成字符串
  const bookStateToString = (state = 1) => {
    if (state >= 1)
      return '可借'
    else
      return '不可借'
  }

  //按照书的状态生成颜色
  const bookStateToColor = (state) => {
    if (state >= 1)
      return '#87d068'
    else
      return '#f50'
  }

  const cancelBorrow = (id,index) => {
    let book = null
    for(let item of bookData){
      if(item[0].id == id){
        book = item[0]
        break
      }
    }
    props.deleteShopList(book)
    message.success('移除成功')
  }

  // //对某一本书取消借阅
  // const cancelBorrow = (index) => {
  //
  //   let newListData = shopList.concat([])
  //   newListData.splice(index, 1)
  //   setListData(newListData)
  //   let newBookData = null
  //   if(typeof props.bookData._tail !== 'undefined')
  //      newBookData = props.bookData._tail.array.concat([])
  //   else
  //      newBookData = props.bookData
  //   newBookData.splice(index, 1)
  //   props.commitBorrowBook(newBookData)
  // }

  //提交图书
  const commitBook = () => {
    history.push('/index/borrow/inspect')
  }

  return (
    <div className="readrfidWrapper">
    <Card title="温馨提示" bordered={false} size="small" className="tipsCard">
        <p>
          请在下方操作您要借阅的图书，如果您希望添加新图书，请<span className="link" onClick={()=>history.push('/index/search')}>前往“搜索”页面</span>来添加新图书。
        </p>
        <p>
          <span className="strong">建议:</span>您当前还有{borrowBooks.length}本书在借阅中，建议您先归还图书，再进行借阅。
        </p>
      </Card>
      <List
        className="list"
        bordered={true}
        itemLayout="vertical"
        size="large"
        dataSource={shopList}
        footer={
          <div className="footer">
            <Button disabled={!next} onClick={() => commitBook()}>下一步</Button>
          </div>
        }
        renderItem={(item, index) => (
          <List.Item
            className="listItem"
            key={item.id}
            actions={[
              <Button
                type="link"
                danger
                onClick={() => cancelBorrow(item.id)}
                style={{padding:'5px 0'}}
              >
                取消借阅
              </Button>,
            ]}
            extra={<img width={100} alt="图书的图片" src={item.cover} />}
          >
            <List.Item.Meta
              title={<div>{item.name}</div>}
              description={
                <div>
                  <Tag>作者:{item.author}</Tag>
                  <Tag>出版:{item.publisher}</Tag>
                  <Tag color={bookStateToColor(item.state)}>
                    状态:
                    {bookStateToString(item.state)}
                  </Tag>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

const mapState = (state) => ({
  borrowBooks: state.bookData.borrowBooks,
  shopList: state.bookData.shopList,
  isBorrowing: state.frame.get('isBorrowing'),
  bookData: state.borrow.get('bookData'),
})

const mapDispatch = (dispatch) => ({
  commitBorrowBook(bookData) {
    dispatch(actionCreators.commitBorrowedBooks(bookData))
  },
  changeStep() {
    dispatch(actionCreators.changeStep(0))
  },
  modifyListData(listData) {
    dispatch(actionCreators.modifyListData(listData))
  },
  modifyShowAlert(show, message, type) {
    dispatch(frameac.modifyShowAlert(show, message, type))
  },
  deleteShopList:(book)=>dispatch(deleteShopList(book))
})

export default connect(mapState, mapDispatch)(Check)
