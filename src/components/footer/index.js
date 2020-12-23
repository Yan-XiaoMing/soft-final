import React from 'react'
import './style.styl'
import QRCode from '../../assets/img/qrcode.png'
const Footer = props=>{
    return <div className="footer-wrapper">
    <div>
       <ul className="footer-team" id="develope_team">
         <li>小组成员</li>
         <li>严启铭</li>
         <li>蔡逸源</li>
         <li>陈柯明</li>
         <li>李晓钊</li>
         <li>林庆树</li>
         <li>(排名不分先后)</li>
       </ul>
       <ul className="footer-team">
       <li>合作机构</li>
       <li><a href='https://lib.hznu.edu.cn/'>杭州师范大学图书馆</a></li>
     </ul>
     <ul className="footer-team">
     <li>指导老师:</li>
       <li>@<a href='https://hise.hznu.edu.cn/c/2016-03-01/742184.shtml'>吴英飞</a></li>
   </ul>
   </div>
   <div className="footer-icons">
      <img src={QRCode} width={70}/>
      <span>联系我们</span>
   </div>
    </div>
}

export default Footer
