import {useDispatch, useSelector} from 'react-redux';
import { Container, Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap'

import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useEffect, useState } from 'react';
import {detailsProduct} from '../actions/productActions'

export default function ProductScreen(props){
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const {loading, error, product} = productDetails;
  
  useEffect(() =>{
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  
  const addToCartHandler = () =>{
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  
  return(
    <>
      <Container>
      { loading ? (<LoadingBox></LoadingBox>)
      : error ? (<MessageBox variant="danger"> {error} </MessageBox>)
      : (
        <div>
          <Link to='/' className='btn btn-light my-3'>Go Back</Link>
          <Row>
              <Col>
                <Image className="large" src={ product.image } alt={ product.name } rounded></Image>
              </Col>
              <Col>
                <ListGroup variant='flush'>
                  <ListGroup.Item><h2>{ product.name }</h2></ListGroup.Item>
                  {/* <ListGroup.Item><Rating rating={ product.rating } numReview={ product.numReview }></Rating></ListGroup.Item> */}
                  <ListGroup.Item><b>Item Price:</b> PHP{ product.price }</ListGroup.Item>
                  <ListGroup.Item>
                    <b>Description:</b>
                    <p>{ product.description }</p>
                  </ListGroup.Item>
                </ListGroup>
                <hr/>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <div>Price:</div>
                    <div className="price">PHP{ product.price * qty} </div>
                  </Row>
                </ListGroup.Item>  
                <ListGroup.Item>
                    <Row>
                    <div>Status: </div>
                    <div>
                      {product.countInStock > 0 
                        ? (<span className="text-success"><b>In Stock</b></span>) 
                        : (<span className="text-danger"><b>Unavailable</b></span>)}
                    </div>
                    </Row>
                </ListGroup.Item>  
                {
                    product.countInStock > 0 &&(
                    <>
                    <ListGroup.Item>
                    <Row>
                    <div>Quantity</div>
                        <div>
                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(
                            (x) => (
                                <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            )
                            )}
                        </select>
                        </div>
                    </Row>
                    </ListGroup.Item>
                    <Button onClick={addToCartHandler} className="primary block">
                      Add to Cart
                    </Button>
                    </>
                )}
                </ListGroup>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </>
  )
}