import request from '../utils/request'
import {GET, POST} from "../config/requestMethodConfig";

export function createUser(data){
  return request({
    method: POST,
    url: `/user/register`,
    data:data
  });
}

export function userLogin({ username = '',password = ''}){
  return request({
    method:POST,
    url:'/user/userLogin',
    data:{
      username,
      password
    }
  })
}


export function phoneLogin({ phone = '',code = ''}){
  return request({
    method:GET,
    url:'/user/phoneLogin',
    params:{
      phone,
      code
    }
  })
}

export function getPhoneCode(phone = ''){
  return request({
    method:GET,
    url:'/user/getCode',
    params:{
      phone:phone
    }
  })
}
