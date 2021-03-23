import React, { useState } from 'react'

const BlogForm = ({ submitBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const submitAndNullBlog = (event) => {
    submitBlog(title,author,url)
    event.preventDefault()
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return(
    <div>
      <h2>Create a new blog</h2>
      <form id='form' onSubmit={submitAndNullBlog}>
        <div>
        title:
          <input type="text" id='title' value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
        author:
          <input type="text" id='author' value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
        url:
          <input type="text" id='url' value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <div>
          <button id='create-blog-button' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm