import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function SearchBox({ history }) {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  
  useEffect(() => {
    if (category.trim() === 'all') {
      setKeyword('')
      history.push('/')
    } else {
      setKeyword('')
      if (category.trim()) {
        history.push(`/category/${category}`)
      } else {
        history.push('/')
      }
    }
  }, [category])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <div className='searchbox-container'>
      <Col>
        <Row>
          <Form inline>
              <Form.Control
                type='text'
                name='q'
                value={keyword}
                placeholder='Seach product...'
                className='searchbox ml-sm-5'
                onChange={(e) => setKeyword(e.target.value)}
              />
              <select 
                className='category'
                value={category}
                onChange={(e) =>  setCategory(e.target.value)}
              >
                <option value='all'>All Products</option>
                <option value='baby products'>Baby Products</option>
                <option value='beverage'>Beverage</option>
                <option value='body care'>Body Care</option>
                <option value='dairy'>Dairy</option>
                <option value='face care'>Face Care</option>
                <option value='hair care'>Hair Care</option>
                <option value='household'>Household</option>
                <option value='laundry'>Laundry</option>
                <option value='oral care'>Oral Care</option>
                <option value='health care'>Health Care</option>
                <option value='womens essential'>Women's essential</option>
              </select>
              <Button type='submit' variant='secondary' onClick={submitHandler}>
                <i className='fas fa-search' />
              </Button>
          </Form>
        </Row>
      </Col>
    </div>
  )
}
