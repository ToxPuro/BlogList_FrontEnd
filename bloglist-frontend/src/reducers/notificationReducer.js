
const reducer = (state=null, action) => {
  switch(action.type){
  case 'NOTIFY':
    return { message: action.message, error: action.error }
  case 'CLEAR':
    return null
  default:
    return state
  }
}
let timer
export const setNotification = (message, time, error) => {
  return async dispatch => {
    dispatch({ type: 'NOTIFY', message, error })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time)
  }
}



export const clearNotification = () => (
  { type: 'CLEAR' }
)

export default reducer