export function Login(info){
  return {
  type: "USER_LOGIN",
  payload: info
  }
}

export function pendingLogin(info){
  return {
    type: "USER_PENDING_LOGIN",
    payload: info
  }
}

export function LogOut(info){
  return {
  type: "USER_LOGOUT",
  payload: info
  }
}