import {
  combineReducers
} from 'redux'
import {
  reducer as loginReducer
} from '../pages/login/store'

import {
  reducer as borrowReducer
} from '../pages/borrow/store'
import {
  reducer as frameReducer
} from '../pages/container/store'
export default combineReducers({
  login: loginReducer,
  borrow: borrowReducer, //借书
  frame: frameReducer
})
