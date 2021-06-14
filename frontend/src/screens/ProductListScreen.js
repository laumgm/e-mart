import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Row, Col, Form } from 'react-bootstrap'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import Paginate from '../components/Paginate'

export default function ProductListScreen(props) {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const pageNumber = props.match.params.pageNumber || 1
  const sellerMode = props.match.path.indexOf('/seller') >= 0;

  const [addProduct, setAddProduct] = useState(false)

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages} = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    // { seller: sellerMode ? userInfo._id : ''}
    dispatch(listProducts('', pageNumber));
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  
  return (
    <div>
      <Container className='py-5'>
        <div className='d-flex justify-content-between current-screen pb-3'>
          <h3 className='text-center'>PRODUCTS</h3>
          <input
            type='text'
            value={keyword}
            placeholder='Search...'
            className='searchbox-admin'
            onChange={(e) => { setKeyword(e.target.value) }}
          />
          <Button type="button" variant="primary" className='btn-sm' onClick={createHandler}>
            + Create Product
          </Button>
        </div>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <Table bordered striped responsive hover className="text-center table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
              products.filter((item) => {
                if (keyword == '') {
                  return item
                } else if (item.name.toLowerCase().includes(keyword.toLowerCase())){
                  return item
                }
              }).map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>{(product.countInStock > 0) 
                    ? <div className='text-success'>available</div> 
                    : <div className='text-danger'>restock</div> }
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant='warning'
                      className="btn-sm"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)}
                    >
                      <i className='fas fa-edit' />
                    </Button>
                    {userInfo.isAdmin && (
                      <Button
                        type="button"
                        variant='danger'
                        className="btn-sm"
                        onClick={() => deleteHandler(product)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate 
            pages={pages} 
            page={page} 
            isAdmin={userInfo.isAdmin} 
            isSeller={userInfo.isSeller} />
          </>
        )}
      </Container>
    </div>
  );
}