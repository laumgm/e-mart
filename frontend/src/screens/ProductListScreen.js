import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Row, Col, Form } from 'react-bootstrap'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import SearchBox from '../components/SearchBox';
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
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : ''}, pageNumber));
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
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
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
                    <Button
                      type="button"
                      variant='danger'
                      className="btn-sm"
                      onClick={() => deleteHandler(product)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </Container>
    </div>
  );
}