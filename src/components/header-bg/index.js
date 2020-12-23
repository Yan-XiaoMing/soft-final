import React, {useEffect, useRef, useState} from "react";
import {defaultStyles, leftStyles, rightStyles} from "./styleConfig";
import bg1 from '../../assets/img/1.png'
import bg2_1 from '../../assets/img/2_1.png'
import bg2_2 from '../../assets/img/2_2.png'
import bg2_3 from '../../assets/img/2_3.png'
import bg3 from '../../assets/img/3.png'
import bg4 from '../../assets/img/4.png'
import bg5 from '../../assets/img/5.png'
import bg6 from '../../assets/img/6.png'
import './style.less'

const HeaderBg = () => {

  let interval = null

  const [width,setWidth] = useState(document.body.clientWidth)

  const list = useRef()

  const imgList = document.getElementsByTagName('img')
  const length = 6
  const setDefaultImgStyle = () => {
    for (let i = 0; i < length; i++) {
      const imgItem = imgList[i]
      const defaultStyle = defaultStyles[i]
      const {translateX, translateY, blur} = defaultStyle
      const changeStyle = {
        transform: `translate(${translateX}px,${translateY})`,
        filter: `blur(${blur}px)`
      }
      imgItem.style.transform = changeStyle.transform
      imgItem.style.filter = changeStyle.filter
    }
  }
  const setShakeAnimation = () => {
    const imgGirl = imgList[1]
    interval = setInterval(()=>{
      //先是女孩半闭眼
      imgGirl.src = bg2_2

      setTimeout(()=>{
        imgGirl.src = bg2_3
      },100)

      setTimeout(()=>{
        imgGirl.src = bg2_2
      },300)

      setTimeout(()=>{
        imgGirl.src = bg2_1
      },400)
    },3000)
  }

  const setLeftImgStyle = (offsetRatio) => {
    for(let i = 0;i<length;i++){
      const imgItem = imgList[i]
      const {
        translateX: defaultTranslateX,
        translateY: defaultTranslateY,
        blur: defaultBlur
      } = defaultStyles[i]
      const leftStyle = leftStyles[i]
      //根据移动的比例来计算最终的坐标和高斯模糊值
      const translateX = (leftStyle.translateX - defaultTranslateX) * offsetRatio + defaultTranslateX
      const blur = (leftStyle.blur - defaultBlur) * offsetRatio + defaultBlur
      const changeStyle = {
        transform: `translate(${translateX}px,${defaultTranslateY}px)`,
        filter:`blur(${blur})px`
      }
      imgItem.style.transform = changeStyle.transform
      imgItem.style.filter = changeStyle.filter
    }
  }

  const setRightImgStyle = (offsetRatio) => {
    for(let i = 0;i<length;i++){
      const imgItem = imgList[i]
      const {
        translateX: defaultTranslateX,
        translateY: defaultTranslateY,
        blur : defaultBlur
      } = defaultStyles[i]
      let rightStyle = rightStyles[i]
      let rightBlur = rightStyle.blur
      let blur = defaultBlur
      const translateX = (rightStyle.translateX - defaultTranslateX) * offsetRatio + defaultTranslateX
      if(Array.isArray(rightBlur)){
        const targetBlur = offsetRatio < 0.5 ? rightBlur[0] : rightBlur[1]
        const ratio = offsetRatio < 0.5 ? offsetRatio * 2 : (offsetRatio - 0.5) * 2
        const currentBlur = offsetRatio < 0.5 ? defaultBlur : rightBlur[0]
        blur = (targetBlur - currentBlur) * ratio + currentBlur
      }else{
        blur = (rightBlur - defaultBlur) * offsetRatio +defaultBlur
      }
      const changeStyle = {
        transform: `translate(${translateX}px,${defaultTranslateY}px)`,
        filter: `blur(${blur}px)`
      }
      imgItem.style.transform = changeStyle.transform
      imgItem.style.filter = changeStyle.filter
    }
  }
  const mouseEnterChange = (e) => {
    list.current.onmouseleave = () => {

      list.current.removeEventListener('mouseleave',()=>{})
      list.current.removeEventListener('mousemove',()=>{})
    }

    const originalX = e.pageX
    list.current.onmousemove = (e) => {
      //鼠标移动的时候记录的位置
      const currentX = e.pageX
      const offsetRatio = (currentX - originalX) / width
      if(offsetRatio < 0) {//鼠标左移
        setLeftImgStyle(Math.abs(offsetRatio))
      }
      else{//鼠标右移
        setRightImgStyle(Math.abs(offsetRatio))
      }
    }
  }

  useEffect(() => {
    setDefaultImgStyle()
    setShakeAnimation()
    //屏幕宽度
    return () => {
      clearInterval(interval)
    }
  })
  return (
    <section ref = {list} onMouseEnter={(e)=>mouseEnterChange(e)} className='header-img-list'>
      <div className='header-layer'>
        <img width="3000" height="250" src={bg1} alt=''/>
      </div>
      <div className='header-layer'>
        <img width="1800" height="165" src={bg2_1} alt=''/>
      </div>
      <div className='header-layer'>
        <img width="3000" height="250" src={bg3} alt=''/>
      </div>
      <div className='header-layer'>
        <img width="1800" height="150" src={bg4} alt=''/>
      </div>
      <div className='header-layer'>
        <img width="1800" height="165" src={bg5} alt=''/>
      </div>
      <div className='header-layer'>
        <img width="1950" height="178" src={bg6} alt=''/>
      </div>
    </section>
  )
}

export default HeaderBg
