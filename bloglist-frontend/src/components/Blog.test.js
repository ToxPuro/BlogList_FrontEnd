import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
const blog = {
  title: 'TestTitle',
  author: 'TestAuthor',
  likes: 5,
  url: 'TestUrl',
  user: {
    username: 'TestUsername',
    name: 'Testname',
    id: 'TestId'
  }
}
let component
const mockHandler = jest.fn()
beforeEach(() => {
  window.localStorage.setItem(
    'loggedUser', JSON.stringify({ username: 'TestUsername', name: 'Testname' })
  )
  component = render(
    <Blog blog={blog} addLike={mockHandler}/>
  )
})
test('renders title and author, but not url or likes', () => {

  expect(component.container).toHaveTextContent('TestTitle')
  expect(component.container).toHaveTextContent('TestAuthor')
  expect(component.container).not.toHaveTextContent('TestUrl')
  expect(component.container).not.toHaveValue(5)

})

test('View shows also url and likes', () => {
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('TestTitle')
  expect(component.container).toHaveTextContent('TestAuthor')
  expect(component.container).toHaveTextContent('TestUrl')
  expect(component.container).toHaveTextContent('likes: 5')
})

test('addLikes get called twice when button gets clicked twice', () => {
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})