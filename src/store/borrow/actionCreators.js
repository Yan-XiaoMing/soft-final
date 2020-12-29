import {ADD_BORROW, ADD_SHOPLIST, DELETE_BORROW, DELETE_SHOPLIST, UPDATE_DISTANCE} from "./constants";

export const addBorrow = (shopList = []) => ({
  type:ADD_BORROW,
  data:shopList
})

export const deleteBorrow = (deleteBook = {}) => ({
  type:DELETE_BORROW,
  data:deleteBook
})

export const addShopList = (book) =>  ({
  type:ADD_SHOPLIST,
  data:book
})

export const deleteShopList = (book) => ({
  type:DELETE_SHOPLIST,
  data:book
})

export const updateDistance = (borrowBooks) => ({
  type: UPDATE_DISTANCE,
  data:borrowBooks
})
