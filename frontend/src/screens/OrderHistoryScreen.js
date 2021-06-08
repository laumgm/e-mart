import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const [qty, setQty] = useState(0)
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <>
      <Container className='pt-5'>
        <h3 className='text-center pb-3'>ORDER HISTORY</h3>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <Table bordered striped responsive className="table-sm text-center">
          <thead>
            <tr>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>PHP {order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) 
                  : <i className='fas fa-times' />}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : <i className='fas fa-times' />}
                </td>
                <td>
                  <Button type="button" className="btn-sm" onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}>
                    Details
                  </Button>
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