import CloseIcon from "@material-ui/icons/Close";
import React, {useEffect, useState} from 'react';
import { Select, DatePicker, Input,Affix,Drawer } from 'antd'
import './style.styl'

const { RangePicker } = DatePicker
const { Option } = Select

const SearchTab = ({visible,setVisible}) => {
  const [classifyState,setClassifyState] = useState("searchClassify_normal")
  const [publisher, setPublisher] = useState('')
  const [bookState, setBookState] = useState('') //存储选中的书籍的状态
  const [bookType, setBookType] = useState('') //设置书本的类型
  const [date, setDate] = useState([]) //设置时间区间
  const [library, setLibrary] = useState('')
  const [layers, setLayers] = useState([]) //表示可以选择的层范围
  const [screen, setScreen] = useState({
    bookTypes: [],
    authors: [],
    publishers: [],
    libraries: [],
  }) //筛选
  const [author, setAuthor] = useState('')
  const [layer, setLayer] = useState('') //表示选中的层
  const [ISBN, setISBN] = useState('') //ISBN码
  const [ISBNError, setISBNError] = useState(false)
  const [origin, setOrigin] = useState('') //东西南北四个字符

//校验ISBN
  const validateISBN = (e) => {
    if (
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(e.target.value) ||
      e.target.value === ''
    ) {
      setISBNError(false)
      setISBN(e.target.val)
    } else {
      setISBNError(true)
    }
  }

  //设置时间
  const handleChangeDate = (date) => {
    setDate([date[0].format('YYYYMMDD'), date[1].format('YYYYMMDD')])
  }

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

   const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  useEffect(()=>{
    if(document.body.clientWidth >= 768)
      setClassifyState("searchClassify_normal");
    else
      setClassifyState("searchClassify_hide");
  },[])

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
    <Affix offsetTop={72}>
      <div className={classifyState+" searchClassify"}>
        <div className="title">筛选</div>
        {
          classifyState==="searchClassify_float"?(
            <div className="closeButton" onClick={()=>setClassifyState("searchClassify_hide")}>
              <CloseIcon />
            </div>
          ):null
        }
        <div className="select">
          <div className="select-title">类别</div>
          <Select
            defaultValue="请选择类别"
            style={{ width: 120 }}
            onChange={(value) => setBookType(value)}
          >
            <Option value={""}>
              全部
            </Option>
            {screen.bookTypes.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className="select date">
          <div className="select-title">入库日期区间</div>
          <RangePicker inputReadOnly onChange={handleChangeDate} />
        </div>
        <div className="select">
          <div className="select-title">书籍状态</div>
          <Select
            defaultValue="请选择书籍状态"
            style={{ width: 120 }}
            onChange={(value) => setBookState(value)}
          >
            <Option value={''}>全部</Option>
            {['可以借阅', '无剩余可借'].map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className="select">
          <div className="select-title">出版社</div>
          <Select
            defaultValue="请选择出版社"
            style={{ width: 'fit-content' }}
            onChange={(value) => setPublisher(value)}
          >
            <Option value={''}>全部</Option>
            {screen.publishers.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className="select">
          <div className="select-title">作者</div>
          <Select
            defaultValue="请选择作者"
            style={{ width: 'fit-content' }}
            onChange={(value) => setAuthor(value)}
          >
            <Option value={''}>全部</Option>
            {screen.authors.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className="select">
          <div className="select-title">图书馆馆址</div>
          <Select
            defaultValue="请选择图书馆"
            style={{ width: 'fit-content' }}
            onChange={(value) => handleChangeLibrary(value)}
          >
            <Option value={''}>全部</Option>
            {screen.libraries.map((item, index) => {
              if (
                typeof item.name !== 'undefined' ||
                item.name !== '' ||
                item.name !== null
              ) {
                return (
                  <Option value={item.name} key={index}>
                    {item.name}
                  </Option>
                )
              } else return null
            })}
          </Select>
        </div>
        <div className="select">
          <div className="select-title">图书馆馆层</div>
          <Select
            defaultValue="请选择图书馆层"
            style={{ width: 'fit-content' }}
            onChange={(value) => setLayer(value)}
          >
            <Option value={''}>全部</Option>
            {layers.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className="select">
          <div className="select-title">图书馆馆区</div>
          <Select
            defaultValue="请选择图书馆管区"
            style={{ width: 'fit-content' }}
            onChange={(value) => setOrigin(value)}
          >
            <Option value={''}>全部</Option>
            {['东', '西', '南', '北'].map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className="select">
          <div className="select-title">ISBN</div>
          <Input placeholder="输入ISBN" onChange={(e) => validateISBN(e)} />
          <div className="error">{ISBNError ? 'ISBN码格式错误' : ''}</div>
        </div>
      </div>
    </Affix>
    </Drawer>
  );
};

export default SearchTab;
