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
import {
  reducer as bookDataReducer
} from './borrow'
export default combineReducers({
  loginUser: loginReducer,
  borrow: borrowReducer, //借书
  frame: frameReducer,
  bookData:bookDataReducer
})
