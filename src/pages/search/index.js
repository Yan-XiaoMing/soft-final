import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import books from "../../config/mock/books";
import {Drawer,Timeline, message} from 'antd';
import {BookOutlined, NumberOutlined, UserOutlined} from '@ant-design/icons'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {actionCreators as frameac} from '../container/store'
import {actionCreators as borrowac} from '../borrow/store'
import SearchTab from "../../components/searchTab";
import pannelData from '../../config/mock/pannelData'
import publicer from '../../assets/img/public.svg'
import location from '../../assets/img/location.svg'
import './style.styl'
import {addShopList, deleteShopList} from "../../store/borrow/actionCreators";
import {isEmptyObject} from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 700,
    height: '40px',
    boxShadow: '0px 0px 30px 1px rgba(0,0,0,0.1)',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  cardRoot: {
    width: 180,
    height: 300,
    margin: '10px',
  },
  media: {
    height: 200,
  },
}))

const Search = (props) => {
  const classes = useStyles()
  const [bookData, setBookData] = useState(books)
  const history = useHistory()
  const [classifyState, setClassifyState] = useState("searchClassify_normal")
  const [date, setDate] = useState([]) //设置时间区间
  const [key, setKey] = useState('') //设置关键字
  const [showPannel, setShowPannel] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [showDetail,setShowDetail] = useState(false)
  const [nothing,setNothing] = useState(0)

  const showDetailClose = () => {
    setShowDetail(false)
  }

  const showDetailOpen = () => {
    setShowDetail(true)
  }

  //展示pannel
  const showSummary = (index) => {
    setShowPannel(index)
  }

  //隐藏pannel
  const hideSummary = () => {
    setShowPannel(-1)
  }

  //设置时间
  const handleChangeDate = (date) => {
    setDate([date[0].format('YYYYMMDD'), date[1].format('YYYYMMDD')])
  }

  //借书事件
  const borrowBook = (id,index) => {
    if(props.borrowBooks.length + props.shopList.length < 10){
      let book = null
      for(let item of bookData){
        if(item[0].id == id){
          book = item[0]
          break
        }
      }
      props.addShopList(book)
      message.success('添加成功')
      pannelData[index][0].isBorrow = true
      setNothing(nothing+1)
    }
    else{
      message.error('您的书单总和已达上限10本')
    }
  }

  //取消借书事件
  const cancelBorrowBook = (id,index) => {
    let book = null
    for(let item of bookData){
      if(item[0].id == id){
        book = item[0]
        break
      }
    }
    props.deleteShopList(book)
    message.success('移除成功')
    pannelData[index][0].isBorrow = false
    setNothing(nothing+1)
  }


  useEffect(() => {
    if (document.body.clientWidth >= 768)
      setClassifyState("searchClassify_normal");
    else
      setClassifyState("searchClassify_hide");
  }, [])

  return (
    <div className="searchPage">
      <div className="searchBody">
        <div className="searchbar">
          {/* <span className="setting">
            <SettingsIcon />
          </span> */}
          <Paper component="form" className={classes.root + " search_form"}>
            <InputBase
              className={classes.input}
              placeholder="搜索书籍的名字、出版社、作者"
              inputProps={{'aria-label': '搜索书籍的名字、出版社、作者'}}
              onChange={(e) => setKey(e.target.value)}
            />
            <IconButton

              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon/>
            </IconButton>
          </Paper>
          <div className="sortButtonGroup">
            <Button onClick={() => setVisible(true)}>
              高级搜索
            </Button>
          </div>
        </div>
        <div className="searchResult">
          {
            bookData.map((item, index) => {
              return (
                <div className="searchLine" key={index}>
                  {item.map((item2) => {
                    return (
                      <Card className={classes.cardRoot + " is_Borrowing_Book_Item"} key={item2.id}>
                        <CardActionArea
                          onClick={() => showSummary(index, item2.id)}
                        >
                          <CardMedia
                            className={classes.media + " is_Borrowing_Book_Item_Image"}
                            image={item2.cover}
                            title="cover"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="h2"
                              className="bookname"
                            >
                              {item2.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="h6"
                              className="bookauthor  is_Borrowing_Book_Item_Font"
                            >
                              {item2.author} | 所作
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="h6"
                              className="bookpublisher  is_Borrowing_Book_Item_Font"
                            >
                              {item2.publisher} | 出版
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    )
                  })}
                  {showPannel === index ? (
                    <div className="searchSummary">
                      <div className="closeButton" onClick={() => hideSummary()}>
                        <CloseIcon width='20px' height='20px' style={{width: '20px', height: '20px'}}/>
                      </div>
                      <div className="searchBookMore">
                        <img src={pannelData[index][0].cover} className="searchBookImg"/>
                        <h3 className='book-detail-name'
                            title={pannelData[index][0].name}>{pannelData[index][0].name}</h3>
                        {
                          //0代表取消加入
                          pannelData[index][0].isBorrow === true ?
                            (
                              <div className='book-detail-btn-wrapper'>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => cancelBorrowBook(pannelData[index][0].id,index)}>
                                  移出借书单
                                </Button>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  onClick={() => showDetailOpen()}>
                                  详情
                                </Button>
                              </div>
                            ) : null
                        }
                        {
                          isEmptyObject(props.user) === true ?
                            (
                              <Button
                                className="positiveButton"
                                variant="outlined"
                                onClick={() => history.push('/login')}
                                color="primary"
                              >
                                先登录方能借阅
                              </Button>
                            ) : null
                        }
                        {
                          //false代表可以借阅
                          pannelData[index][0].isBorrow === false ?
                            (
                              <div className='book-detail-btn-wrapper'>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => borrowBook(pannelData[index][0].id,index)}>
                                  加入借书单
                                </Button>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  onClick={() => showDetailOpen()}>
                                  详情
                                </Button>
                              </div>
                            ) : null
                        }
                      </div>
                      <Drawer
                        title="图书详情"
                        width={340}
                        placement="right"
                        closable
                        onClose={showDetailClose}
                        visible={showDetail}
                      >
                        <Timeline className=''>
                          <Timeline.Item dot={<BookOutlined  style={{ fontSize: '20px' }} />} >
                            <h1 className='book-detail-item-title'>
                              书籍名称:
                            </h1>
                            <p>{pannelData[index][0].name}</p>
                          </Timeline.Item>
                          <Timeline.Item  dot={<UserOutlined  style={{ fontSize: '20px' }} />} >
                            <h1 className='book-detail-item-title'>
                              作者:
                            </h1>
                            <p>{pannelData[index][0].author}</p>
                          </Timeline.Item>
                          <Timeline.Item dot={<img width='20px' src={publicer} alt='出版社'/>}>
                            <h1 className='book-detail-item-title'>
                              出版社:
                            </h1>
                            <p> {pannelData[index][0].publisher}</p>
                          </Timeline.Item>
                          <Timeline.Item dot={<img width='20px' src={location} alt='出版社'/>}>
                            <h1 className='book-detail-item-title'>
                              书籍位置:
                            </h1>
                            <p>{pannelData[index][0].place}</p>
                          </Timeline.Item>
                          <Timeline.Item dot={<NumberOutlined style={{ fontSize: '20px' }} /> } color={pannelData[index][0].state>0?'green':'red'}>
                            <h1 className='book-detail-item-title'>
                              可借数量: {pannelData[index][0].state}
                            </h1>
                          </Timeline.Item>
                        </Timeline>
                      </Drawer>
                    </div>
                  ) : null}
                </div>
              )
            })}
        </div>
      </div>
      <SearchTab visible={visible} setVisible={setVisible}/>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.loginUser.user,
  borrowBooks: state.bookData.borrowBooks,
  shopList: state.bookData.shopList,
  name: state.frame.get('name'),
  card: state.frame.get('card'),
  cover: state.frame.get('cover'),
  hasBorrowed: state.frame.get('hasBorrowed'),
  isBorrowing: state.frame.get('isBorrowing'),
  step: state.borrow.get('step'),
  identity: state.frame.get('identity'),
})

const mapDispatchToProps = (dispatch) => ({
  modifyLogin(state) {
    dispatch(frameac.modifyLogin(state))
  },
  modifyUserInfo(info) {
    dispatch(frameac.modifyUserInfo(info))
  },
  modifyShowAlert(show, message, type) {
    dispatch(frameac.modifyShowAlert(show, message, type))
  },
  modifyBookData(newBookData) {
    dispatch(borrowac.commitBorrowedBooks(newBookData))
  },
  addShopList:(book)=>dispatch(addShopList(book)),
  deleteShopList:(book)=>dispatch(deleteShopList(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
