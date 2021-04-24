import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE': {
    const responseBlog = action.blog
    return state.map(blogInList => blogInList.id !== responseBlog.id ? blogInList : responseBlog)
  }

  case 'ADD': {
    return state.concat(action.newBlog)
  }

  case 'INITIALIZE':{
    return action.blogs.sort((a,b) => b.likes-a.likes)
  }

  case 'REMOVE': {
    return state.filter(blog => blog.id !== action.id )
  }

  default:{
    return state
  }
  }
}





export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INITIALIZE', blogs })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({ type: 'REMOVE', id })
  }
}

export const likeBlog = (title, author, url, likes, id) => {
  return async dispatch => {
    const likedBlog= { title: title, author: author, url: url, likes: likes+1, id: id }
    const responseBlog = await blogService.update(likedBlog)
    dispatch({ type: 'LIKE', blog: responseBlog })
  }

}

export const newBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog)
    dispatch({ type: 'ADD', newBlog })
  }
}

export default reducer