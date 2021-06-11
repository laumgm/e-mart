import React, { useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen({ match }) {
  const keyword = match.params.keyword
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  
  return (
    <Container >
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <Row className='d-flex align-items-start'>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                {/* components can take in props */}
                <Product product={product} />
          </Col>
        ))}
      </Row>
    )}
  </Container>
  );
}