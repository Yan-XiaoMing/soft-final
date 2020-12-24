import React, {useState, useEffect, useRef, useCallback} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import books from "../../config/mock/books";
import {BackTop} from 'antd'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
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
import './style.styl'

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
  const [perpage, setPerpage] = useState(20)
  const [perrow, setPerrow] = useState(5)
  const [screen, setScreen] = useState({
    bookTypes: [],
    authors: [],
    publishers: [],
    libraries: [],
  }) //筛选
  const history = useHistory()
  const [classifyState, setClassifyState] = useState("searchClassify_normal")
  const [date, setDate] = useState([]) //设置时间区间
  const [author, setAuthor] = useState('')
  const [key, setKey] = useState('') //设置关键字
  const [library, setLibrary] = useState('')
  const [bookState, setBookState] = useState('') //存储选中的书籍的状态
  const [layers, setLayers] = useState([]) //表示可以选择的层范围
  const [showPannel, setShowPannel] = useState(-1)
  const [borrowingBooks, setBorrowingBooks] = useState([])
  const [functionButtonStyle, setFunctionButtonStyle] = useState(1)
  const [visible, setVisible] = useState(false)
  let {login} = props //登陆的标志符

  //获取book的数据，直接返回

  //如果login状态发生变化，就要重新查看是否有进入usercenter的权限
  // useEffect(() => {
  //   console.log(login)
  //   if (login || Token.validate()) {
  //     console.log('验证通过')
  //   } else {
  //     setBorrowingBooks([])
  //     setFunctionButtonStyle(-3)
  //   }
  // }, [login])


  //获取用户数据和借书的情况

  //
  // //验证是否登录
  // useEffect(() => {
  //   console.log(props.login)
  //   //如果内存里登录成功或本地token依然有效，那么数据也肯定加载进来了
  //   if (props.login || Token.validate()) {
  //     // props.modifyLogin(true)
  //     getInitUserData()
  //   } else {
  //     console.log('第三方登录验证')
  //     //没有登陆成功，查看是否是通过第三方登陆进来的
  //     if (props.location.search !== '') {
  //       //说明是由第三方登录进来的，这个链接只有可能是通过第三方登录进来的
  //       let token_array = props.location.search
  //         .split('?')[1]
  //         .split('&')[0]
  //         .split('=')
  //       console.log(token_array)
  //       //如果有token这个字段，说明第三方登陆
  //       if (token_array[0] === 'token') {
  //         //本地设置token
  //         Token.set(token_array[1])
  //         //然后就可以获取数据了
  //         getInitUserData(token_array[1])
  //       }
  //     } else {
  //
  //     }
  //   }
  // }, [])

  //修改当前所在的图书馆
  const handleChangeLibrary = (value) => {
    console.log(value)
    setLibrary(value)
    screen.libraries.map((item, index) => {
      if (item.name === value) {
        setLayers(item.layers)
      }
    })
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
  const borrowBook = (id) => {
    props.modifyBookData(props.bookData.concat([id]))
    setFunctionButtonStyle(0)
  }

  //取消借书事件
  const cancelBorrowBook = id => {
    let newBookData = []
    props.bookData.map((item, index) => {
      if (item !== id)
        newBookData.push(item)
    })
    props.modifyBookData(newBookData)
    setFunctionButtonStyle(1)
  }

  useEffect(() => {
    let current_clientWidth = document.body.clientWidth;
    if (current_clientWidth >= 768) {
      let perRow = Math.floor((current_clientWidth * 0.68) / (current_clientWidth * 0.13));
      console.log(perRow);
      setPerrow(perRow);
      setPerpage(perRow * 4)
    } else {
      let perRow = Math.floor((current_clientWidth * 0.98 - 32) / (current_clientWidth * 0.35));
      console.log(perRow);
      setPerrow(perRow);
      setPerpage(perRow * 4)
    }

  }, [])

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
                      <div className="searchMainData">
                        <div className="searchBookName">{pannelData[index][0].name}</div>
                        <div className="searchBookItem">
                          <span className="searchBookBefore">作者</span> |{' '}
                          {pannelData[index][0].author}
                        </div>
                        <div className="searchBookItem">
                          <span className="searchBookBefore">出版社</span> |{' '}
                          {pannelData[index][0].publisher}
                        </div>
                        <div className="searchBookItem">
                          <span className="searchBookBefore">书籍位置</span> |{' '}
                          {pannelData[index][0].place}
                        </div>
                        <div className="searchBookItem">
                          <span className="searchBookBefore">剩余可借</span> |{' '}
                          {pannelData[index][0].state}
                        </div>
                      </div>
                      <div className="searchBookMore">
                        <img src={pannelData[index][0].cover} className="searchBookImg"/>
                        <h3 className='book-detail-name'
                            title={pannelData[index][0].name}>{pannelData[index][0].name}</h3>
                        {
                          //0代表取消加入
                          functionButtonStyle === 0 ?
                            (
                              <div className='book-detail-btn-wrapper'>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => cancelBorrowBook(pannelData[index][0].id)}>
                                  移出借书单
                                </Button>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  onClick={() => borrowBook(pannelData.id)}>
                                  详情
                                </Button>
                              </div>
                            ) : null
                        }
                        {
                          //-2代表已经加入
                          functionButtonStyle === -2 ?
                            (
                              <Button disabled>
                                已借阅
                              </Button>
                            ) : null
                        }
                        {
                          //-1代表已经达到上限
                          functionButtonStyle === -1 ?
                            (
                              <Button disabled>
                                您可以借阅的书籍已达上限
                              </Button>
                            ) : null
                        }
                        {
                          //-3代表需要登陆
                          functionButtonStyle === -3 ?
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
                          //1代表可以借阅
                          functionButtonStyle === 1 ?
                            (
                              <div className='book-detail-btn-wrapper'>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => borrowBook(pannelData.id)}>
                                  加入借书单
                                </Button>
                                <Button
                                  size="small"
                                  className="positiveButton"
                                  onClick={() => borrowBook(pannelData.id)}>
                                  详情
                                </Button>
                              </div>
                            ) : null
                        }
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
        </div>
      </div>
      <BackTop>
        <div className="back-top-button"><ArrowUpwardIcon/></div>
      </BackTop>
      <SearchTab visible={visible} setVisible={setVisible}/>
    </div>
  )
}

const mapState = state => ({
  login: state.frame.get('login'),
  bookData: state.borrow.get('bookData'),//要借阅的书籍
  name: state.frame.get('name'),
  card: state.frame.get('card'),
  cover: state.frame.get('cover'),
  hasBorrowed: state.frame.get('hasBorrowed'),
  isBorrowing: state.frame.get('isBorrowing'),
  step: state.borrow.get('step'),
  identity: state.frame.get('identity'),
})

const mapDispatch = (dispatch) => ({
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
  }
})

export default connect(mapState, mapDispatch)(Search)
