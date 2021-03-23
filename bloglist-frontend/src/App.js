import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
const Logout = ({ user,logout }) => {
  return(
    <span>
      { user.name} logged in
      <button onClick={logout}>logout</button>
    </span>
  )

}
const Notification= ({ notification }) => {
  if(notification===null){
    return null
  }
  if(!notification.error){
    return(
      <div className="success">
        {notification.message}
      </div>
    )
  }
  return(
    <div className="error">
      {notification.message}
    </div>
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
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [ notification, setNotification] = useState(null)
  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const removeBlock = async (title, author, id) => {
    if(window.confirm(`Remove blog ${title} by ${author}`)){
      await blogService.remove(id)
      setBlogs(blogs.filter(blogInList => blogInList.id !== id))
    }
  }
  const addLike= async (title, author, url, likes, id ) => {
    const likedBlog= { title: title, author: author, url: url, likes: likes+1, id: id }
    const responseBlog = await blogService.update(likedBlog)
    setBlogs(blogs.map(blogInList => blogInList.id !== responseBlog.id ? blogInList : responseBlog))
  }
  const blogFormRef = useRef()
  const submitBlog = async (title,author,url) => {
    try{
      blogFormRef.current.toggleVisibility()
      const blog = { title, author, url }
      const newBlog = await blogService.createBlog(blog)
      setBlogs(blogs.concat(newBlog))
      setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, error: false })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch(exception){
      console.log(exception)
      console.log('invalid credentials')
    }

  }
  const handleLogin = async (username, password) => {
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
    } catch(exception){
      console.log('wrong credentials')
      setNotification({ message: 'wrong username or password', error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <Notification notification={notification}/>
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