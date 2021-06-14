import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    // { seller: sellerMode ? userInfo._id : '' }
    dispatch(listOrders());
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  
  return (
    <>
      <Container className='pt-5'>
        <h3 className='text-center pb-3'>ORDERS</h3>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Table striped bordered responsive className='table-sm'>
            <thead className='text-center'>
              <tr>
                <th>DATE</th>
                <th>SHIPPING ADDRESS</th>
                <th>TOTAL</th>
                <th>PAYMENT METHOD</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.shippingAddress.city}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' />}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : <i className='fas fa-times' />}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant='warning'
                      className="btn-sm"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      <i className='fas fa-edit' />
                    </Button>
                    {userInfo.isAdmin && (
                      <Button
                        type="button"
                        variant='danger'
                        className="btn-sm"
                        onClick={() => deleteHandler(order)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}