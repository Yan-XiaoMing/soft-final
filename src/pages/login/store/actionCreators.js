import * as constants from './constants'

export const loginUser = (user, loginType = 0) => ({ // 0密码 1手机 2auth
  type: constants.SET_USER,
  data: {
    loginType,
    user
  }
})

export const logoutUser = (user) => ({
  type:constants.DELETE_USER,
  data:{
    user:{}
  }
})
