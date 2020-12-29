import {borrowState} from '../../config/mock/borrow'
import {ADD_BORROW, ADD_SHOPLIST, DELETE_BORROW, DELETE_SHOPLIST, UPDATE_DISTANCE} from "./constants";
import {deleteItemInArr} from "../../utils/utils";

const defaultState = borrowState

export default (state = defaultState, action) => {
  console.log(action)
  switch (action.type){
    case ADD_BORROW:
      return {
        shopList: [],
        borrowBooks: state.borrowBooks.concat(action.data)
      }
    case DELETE_BORROW:
      const newBorrow = deleteItemInArr(state.borrowBooks,action.data)
      return {
        ...state,
        borrowBooks: newBorrow
      }
    case ADD_SHOPLIST:
      let arr = JSON.parse(JSON.stringify(borrowState.shopList))
      arr.push(action.data)
      const result ={
        ...state,
        shopList: state.shopList.concat(arr)
      }
      return result
    case DELETE_SHOPLIST:
      const newShopList = deleteItemInArr(state.shopList,action.data)
      return {
        ...state,
        shopList: newShopList || []
      }
    case UPDATE_DISTANCE:
      console.log('updateDistance')
      return {
        ...state,
        borrowBooks: [].concat(action.data)
      }
    default:
      return state
  }
}
