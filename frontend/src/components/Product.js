import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap';

export default function Product( {product} ) {
 //const {product} = props; 
  return (
    <Card className='my-3 p-3 rounded'>
      {/* <Container className=''> */}
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' alt={product.name}/>
        </Link>
      {/* </Container> */}
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>
              {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='h5'> PHP {product.price} </Card.Text>
      </Card.Body>
    </Card>
  ) 
}