const initialState = {
  online: false,
  name: '',
  userId: '',
  picture: '',
  email: '',
  error: null,
  authorized: false,
  authorizing: false
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_LOGIN': {
      return Object.assign({}, state, {
        online: true,
        authorized: true,
        name: action.payload.name,
        userId: action.payload.userId,
        picture: action.payload.picture,
        email: action.payload.email,
        authorizing: false
      })
    }
    case 'USER_PENDING_LOGIN':{
       return Object.assign({}, state, {
        authorizing: true
      })
    }
    case 'USER_LOGOUT': {
      return Object.assign({}, state, {
        online: action.payload,
        name: '',
        userId: '',
        picture: '',
        email: '',
        error: null,
        authorized: false,
      });
    }
     default: {
      return state
    }
  }
}

export default authReducer