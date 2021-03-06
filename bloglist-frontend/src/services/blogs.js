import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const config ={
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

const update = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return response.data
}

const remove = async (id) => {
  const config ={
    headers: { Authorization: token }
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, createBlog, setToken, update, remove }