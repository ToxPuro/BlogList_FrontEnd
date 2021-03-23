import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
const Blogs = ({ blogs, removeBlock, addLike }) => {

  const style = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
  blogs.sort((blog1,blog2) => blog2.likes-blog1.likes)
  blogs = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} removeBlock={removeBlock} addLike={addLike} />)
  return(
    <ul id='blogs' style={style}>
      {blogs}
    </ul>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  removeBlock: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired
}

export default Blogs