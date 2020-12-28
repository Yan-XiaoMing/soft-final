import * as constants from '../store/constants'
const defaultState = {
  user:{
    id:6,
    name:'严启铭',
    username:'2017210904069',
    phone:'17816600516',
    idNumber:'410504199905161512',
    type:1,
    sex:0,
    password:'$2a$10$Ev/FAXb…QtVy',
    token:'eyJhbGciOiJIUz…WnO8',
    accessToken:null,
    node_id:null
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_USER:
      return action.data
    case constants.DELETE_USER:
      return action.data
    default:
      return state
  }
}
