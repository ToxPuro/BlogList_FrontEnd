import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state=null, action) => {
  switch(action.type){
  case 'SET':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}



export const clearNotification = () => (
  { type: 'CLEAR' }
)

export const initializeUser = (loggedUser) => {
  return async dispatch => {
    const user = JSON.parse(loggedUser)
    blogService.setToken(user.token)
    dispatch({ type: 'SET', user })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({ type: 'SET', user })
  }
}

export const logoutReducer = () => {
  return async dispatch => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    dispatch({ type: 'LOGOUT' })
  }
}

export default reducer