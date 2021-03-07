import React, { useState } from 'react'
const Blog = ({ blog, removeBlock, addLike }) => {
  const [info, setInfo] = useState(false)
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  if(!info){
    return(
      <div>
        <span>
          {blog.title} {blog.author}
          <button onClick={() => setInfo(true)}> view </button>
        </span>
      </div>
    )
  }
  return(
    <div>
      <div>
        <span>
          {blog.title} {blog.author}
          <button onClick={() => setInfo(false)}>hide</button>
        </span>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        <span>
          likes: {blog.likes}
          <button onClick={() => addLike(blog.title, blog.author, blog.url, blog.likes, blog.id)}>like</button>
        </span>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {blog.user.username === loggedUser.username ? <button onClick={() => removeBlock(blog.title,blog.author,blog.id)}>remove</button> : null}
      </div>

    </div>
  )
}



export default Blog
