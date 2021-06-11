import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function SearchBox({ history }) {
  const [keyword, setKeyword] = useState('')
  
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
        history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          placeholder='Seach product...'
          className='searchbox mr-sm-2 ml-sm-5'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type='submit' variant='secondary'>
          <i className='fas fa-search' />
        </Button>
    </Form>
  )
}
