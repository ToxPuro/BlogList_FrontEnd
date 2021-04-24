import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, removeBlog, likeBlog, newBlog } from './reducers/blogsReducer'
import { initializeUser, login, logoutReducer } from './reducers/userReducer'

const Logout = ({ user,logout }) => {
  return(
    <span>
      { user.name} logged in
      <button onClick={logout}>logout</button>
    </span>
  )

}





const LoginForm = ({ handleLogin }) => {
  const logInFromForm= (event) => {
    event.preventDefault()
    handleLogin(username,password)
    setUsername('')
    setPassword('')
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return(
    <form onSubmit = {logInFromForm}>
      <div>
      username
        <input type="text" id="username" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
      password
        <input type="password" id="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <div>
        <button id="login-button" type="submit">login</button>
      </div>
    </form>
  )
}

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutReducer())
  }
  const removeBlock = async (title, author, id) => {
    if(window.confirm(`Remove blog ${title} by ${author}`)){
      dispatch(removeBlog(id))
    }
  }
  const addLike= async (title, author, url, likes, id ) => {
    dispatch(likeBlog(title, author, url, likes, id))
  }
  const blogFormRef = useRef()
  const submitBlog = async (title,author,url) => {
    try{
      blogFormRef.current.toggleVisibility()
      const blog = { title, author, url }
      await dispatch(newBlog(blog))
      await dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5000 ,false))
    } catch(exception){
      console.log(exception)
      console.log('invalid credentials')
    }

  }
  const handleLogin = async (username, password) => {
    try{
      await dispatch(login(username, password))
    } catch(exception){
      console.log('wrong credentials')
      dispatch(setNotification('wrong username or password', 5000 ,true))
    }
  }
  useEffect(() => {
    dispatch(initializeBlogs(blogs))

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      dispatch(initializeUser(loggedUserJSON))
    }

  }, [])

  return (
    <div>
      <Notification/>
      <h2>Login</h2>
      {user === null ? null: <Logout user={user} logout={logout}/>}
      {user === null ?
        <LoginForm handleLogin={handleLogin}/> :
        <Togglable buttonLabel = "new blog" ref={blogFormRef}>
          <BlogForm blogs={blogs} submitBlog={submitBlog}/>
        </Togglable>}
      <br/><br/>
      {user === null ? null : <Blogs blogs={blogs} addLike={addLike} removeBlock={removeBlock}/>}
    </div>
  )
}

export default App