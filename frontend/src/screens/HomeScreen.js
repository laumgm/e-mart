import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom'

export default function HomeScreen({ match }) {
  const keyword = match.params.keyword
  const category = match.params.category
  const pageNumber = match.params.pageNumber || 1
  
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, category, pageNumber]);
  
  return (
    <Container className='my-5'>
      <Meta />
      {keyword 
        ? (
          <>
            <Link to = '/' className='btn btn-light my-3'>Go Back</Link>
            <h5>You searched for {keyword}...</h5>
          </>
        ) 
        : category 
        ? (
          <>
            <Link to = '/' className='btn btn-light my-3'>Go Back</Link>
            <h5>Results for {category.charAt(0).toUpperCase() + category.slice(1)}..</h5>
          </>
        )
        : (<h3>Latest Products</h3>) 
      }
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row className='d-flex flex-wrap justify-content-start'>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                {/* components can take in props */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate 
            pages={pages} 
            page={page} 
            keyword={keyword ? keyword : ''}
            category={category ? category : ''}
          />
        </>
      )}
    </Container>
  );
}