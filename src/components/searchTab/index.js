import CloseIcon from "@material-ui/icons/Close";
import React, {useEffect, useState} from 'react';
import {Select, DatePicker, Input, Drawer, Form, Row, Col, Cascader} from 'antd'
import {RightCircleOutlined, UpCircleOutlined, DownCircleOutlined, LeftCircleOutlined} from '@ant-design/icons'
import {categoryOptions} from '../../config/mock/options'
import './style.styl'

const {RangePicker} = DatePicker
const {Option, OptGroup} = Select

const SearchTab = ({visible, setVisible}) => {
  const [classifyState, setClassifyState] = useState("searchClassify_normal")
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


  return (
    <Drawer
      width={540}
      title='图书搜索'
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={14}>
            <Form.Item
              name="name"
              label="类别"
            >
              <Cascader options={categoryOptions}/>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="url"
              label="出版日期"
            >
              <RangePicker
                format="YYYY-MM-DD "
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={14}>
            <Form.Item
              name="owner"
              label="出版社"
            >
              <Select placeholder="请选择出版社">
                <OptGroup label="热门搜索出版社">
                  <Option value="商务印书馆">商务印书馆</Option>
                  <Option value="海南出版社">海南出版社</Option>
                  <Option value="北京日报出版社（原同心出版社）">北京日报出版社（原同心出版社）</Option>
                </OptGroup>
                <OptGroup label="常规搜索">
                  <Option value="北京联合出版有限公司">北京联合出版有限公司</Option>
                  <Option value="江苏凤凰文艺出版社">江苏凤凰文艺出版社</Option>
                  <Option value="辽宁少年儿童出版社">辽宁少年儿童出版社</Option>
                  <Option value="辽宁少年儿童出版社">中国妇女出版社</Option>
                </OptGroup>
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="type"
              label="图书馆馆址"
            >
              <Select placeholder="请选择馆藏位置">
                <Option value="仓前校区">仓前校区</Option>
                <Option disabled={true} value="下沙校区">下沙校区</Option>
                <Option disabled={true} value="玉皇山校区">玉皇山校区</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={14}>
            <Form.Item
              name="level"
              label="图书馆馆层"
            >
              <Select placeholder="请选择图书馆馆层">
                <Option value="二层">二层</Option>
                <Option value="三层">三层</Option>
                <Option value="四层">四层</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="approver"
              label="图书馆馆区"
            >
              <Select placeholder="请选择图书馆区域">
                <Option value="East" label="East">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="East">
                      🀀
                    </span>
                    East (东)
                  </div>
                </Option>
                <Option value="South" label="South">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="South">
                      🀁
                    </span>
                    South (南)
                  </div>
                </Option>
                <Option value="West" label="West">
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="West">
                      🀂
                    </span>
                    West (西)
                  </div>
                </Option>
                <Option value="North" label="North">
                  <div className="demo-option-label-item">
                  <span role="img" aria-label="North">
                    🀃
                  </span>
                    North (北)
                  </div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default SearchTab;
