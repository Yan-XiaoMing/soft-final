const pannelData = [
  [{
    id:"1",
    name:"欢喜：冯唐时间管理手账",
    author:"冯唐",
    publisher:"北京联合出版有限公司",
    place:"图书馆二楼南①区 14排A面1列1层",
    state:"10",
    cover:"http://img3m5.ddimg.cn/37/6/28983475-5_u_10.jpg",
    isBorrow:false
  }],
  [{
    id:"2",
    name:"灵光集：兰波诗歌集注",
    author:"阿蒂尔·兰波",
    publisher:"商务印书馆",
    place:"图书馆二楼南①区 12排A面2列5层",
    state:"8",
    cover:"http://img3m8.ddimg.cn/70/3/29133988-5_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"3",
    name:"卡梅里亚的哲学世界",
    author:"胡安·安东尼奥·里维拉",
    publisher:"海南出版社",
    place:"图书馆二楼南①区 11排A面3列5层",
    state:"5",
    cover:"http://img3m0.ddimg.cn/83/24/29140040-7_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"4",
    name:"古代人的日常生活",
    author:"讲历史的王老师",
    publisher:"江苏凤凰文艺出版社",
    place:"图书馆二楼西①区 8排A面3列5层",
    state:"12",
    cover:"http://img3m2.ddimg.cn/14/2/28509242-4_u_6.jpg",
    isBorrow:false
  }],
  [{
    id:"5",
    name:"书信里的逝水年华—钱锺书与我",
    author:"许渊冲",
    publisher:"江西美术出版社",
    place:"图书馆二楼南①区 2排B面2列5层",
    state:"1",
    cover:"http://img3m8.ddimg.cn/84/16/29137368-5_u_7.jpg",
    isBorrow:false
  }],
  [{
    id:"6",
    name:"漫画诺贝尔科学家：物理学奖",
    author:"胖乐胖乐",
    publisher:"湖南科技出版社",
    place:"图书馆二楼北①区 7排B面1列3层",
    state:"3",
    cover:"http://img3m2.ddimg.cn/42/9/29136732-5_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"7",
    name:"星光的速度",
    author:"科林·斯图尔特 提莫·阿巴迪亚",
    publisher:"辽宁少年儿童出版社",
    place:"图书馆二楼西①区 11排B面6列5层",
    state:"2",
    cover:"http://img3m2.ddimg.cn/52/20/28517992-5_u_2.jpg",
    isBorrow:false
  }],
  [{
    id:"8",
    name:"众神的战争:希腊神话与西方艺术",
    author:"江逐浪",
    publisher:"化学工业出版社",
    place:"图书馆二楼北①区 11排A面3列5层",
    state:"4",
    cover:"http://img3m3.ddimg.cn/66/19/29150913-5_u_13.jpg",
    isBorrow:false
  }],
  [{
    id:"9",
    name:"浮生六记",
    author:"沈复",
    publisher:"时代文艺出版社",
    place:"图书馆二楼东①区 3排B面12列1层",
    state:"6",
    cover:"http://img3m4.ddimg.cn/46/23/26487694-5_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"10",
    name:"文豪日历2021",
    author:"人民文学出版社外国文学编辑室",
    publisher:"人民文学出版社",
    place:"图书馆二楼北①区 1排A面1列3层",
    state:"5",
    cover:"http://img3m4.ddimg.cn/48/32/28991604-4_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"11",
    name:"掬水月在手：镜中的叶嘉莹",
    author:"行人文化 活字文化",
    publisher:"四川人民出版社",
    place:"图书馆二楼北①区 7排B面4列2层",
    state:"2",
    cover:"http://img3m5.ddimg.cn/3/22/29137485-5_u_9.jpg",
    isBorrow:false
  }],
  [{
    id:"12",
    name:"烟火漫卷",
    author:"迟子建",
    publisher:"人民文学出版社",
    place:"图书馆二楼南①区 7排B面2列1层",
    state:"8",
    cover:"http://img3m3.ddimg.cn/7/6/29124223-3_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"13",
    name:"趣说中国史",
    author:"趣哥",
    publisher:"台海出版社",
    place:"图书馆二楼南①区 11排A面12列2层",
    state:"6",
    cover:"http://img3m1.ddimg.cn/98/3/29151341-8_u_6.jpg",
    isBorrow:false
  }],
  [{
    id:"14",
    name:"半小时漫画经济学4：理财篇",
    author:"陈磊 半小时漫画团队",
    publisher:"海南出版社",
    place:"图书馆二楼西①区 5排A面7列4层",
    state:"7",
    cover:"http://img3m0.ddimg.cn/25/13/29128300-5_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"15",
    name:"培养孩子的社会情商",
    author:"叶如风",
    publisher:"中国妇女出版社",
    place:"图书馆二楼西①区 7排B面7列4层",
    state:"2",
    cover:"http://img3m3.ddimg.cn/56/34/29140013-3_u_6.jpg",
    isBorrow:false
  }],
  [{
    id:"16",
    name:"永远不要停下前进的脚步",
    author:"石雷鹏",
    publisher:"天地出版社",
    place:"图书馆二楼南①区 3排A面3列3层",
    state:"3",
    cover:"http://img3m1.ddimg.cn/61/21/29145661-7_u_9.jpg",
    isBorrow:false
  }],
  [{
    id:"17",
    name:"你想过怎样的一生",
    author:"海克·法勒",
    publisher:"北京联合出版有限公司",
    place:"图书馆二楼北①区 11排B面6列3层",
    state:"5",
    cover:"http://img3m0.ddimg.cn/55/35/29133280-4_u_9.jpg",
    isBorrow:false
  }],
  [{
    id:"18",
    name:"人生随时可以重来",
    author:"摩西奶奶",
    publisher:"北京日报出版社（原同心出版社）",
    place:"图书馆二楼西①区 6排B面11列1层",
    state:"1",
    cover:"http://img3m5.ddimg.cn/63/14/28978155-8_u_3.jpg",
    isBorrow:false
  }],
  [{
    id:"19",
    name:"回归故里",
    author:"迪迪埃·埃里蓬",
    publisher:"上海文化出版社",
    place:"图书馆二楼北①区 2排A面11列3层",
    state:"2",
    cover:"http://img3m3.ddimg.cn/28/11/28559053-6_u_17.jpg",
    isBorrow:false
  }],
  [{
    id:"20",
    name:"董其昌传",
    author:"孙炜",
    publisher:"广西师范大学出版社",
    place:"图书馆二楼南①区 11排B面4列4层",
    state:"4",
    cover:"http://img3m7.ddimg.cn/11/26/29114327-8_u_5.jpg",
    isBorrow:false
  }]
]

export default pannelData
