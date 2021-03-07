import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

let component
const mockHandler = jest.fn()
beforeAll(() => {
  component = render(
    <BlogForm submitBlog={mockHandler}/>
  )
})

test('submitBlog gets called with correct values', () => {
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('#form')
  fireEvent.change(title, {
    target: { value: 'testTitle' }
  })
  fireEvent.change(author, {
    target: { value: 'testAuthor' }
  })
  fireEvent.change(url, {
    target: { value: 'testUrl' }
  })
  fireEvent.submit(form)
  expect(mockHandler.mock.calls[0]).toEqual(['testTitle', 'testAuthor', 'testUrl'])

})