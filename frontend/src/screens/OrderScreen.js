import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Button, ListGroup, Row, Col, Image } from 'react-bootstrap'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';


export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  
  const redirect = props.location.search
  ? props.location.search.split('=')[1]
  : '/';

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
        const { data } = await Axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
      if (
        !order ||
        successPay ||
        successDeliver ||
        (order && order._id !== orderId)
      ) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(detailsOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
    }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  
    const goBack = () => {
      history.goBack()
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };
    const deliverHandler = () => {
      if(order.paymentMethod === 'Cash On Delivery'){
        dispatch(deliverOrder(order._id))
      } else {
        dispatch(deliverOrder(order._id));
      }
    };
  
  return loading ? ( <LoadingBox></LoadingBox> ) 
  : error ? ( <MessageBox variant="danger">{error}</MessageBox> ) 
  : (
    <Container className='py-5'>
      <Button onClick={goBack}
        className='btn btn-light my-3'>Go Back
      </Button>
      <div className='pt-3'>
        <h3 className='text-center pb-3'>ORDER DETAILS</h3>
        <Row className='d-flex align-items-start'>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {/* <div className="card card-body"> */}
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt.substring(0, 10)}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                {/* </div> */}
                </ListGroup.Item>

                <ListGroup.Item>
                  {/* <div className="card card-body"> */}
                    <h4>Payment</h4>
                    <p>
                      <strong>Method:</strong> {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Paid at {order.paidAt.substring(0, 10)}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  {/* </div> */}
                </ListGroup.Item>

                <ListGroup.Item>
                  {/* <div className="card card-body"> */}
                    <h4>Order Items</h4>
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                          <Row>
                            <Col >
                              <Image
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></Image>
                            </Col>
                            <Col className="min-30">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
    
                            <div>
                              {item.qty} x PHP {item.price} = PHP {item.qty * item.price}
                            </div>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  {/* </div> */}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              {/* <div className="card card-body"> */}
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Order Summary</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <div>Items</div>
                      <div>PHP {order.itemsPrice.toFixed(2)}</div>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <div>Shipping</div>
                      <div>PHP {order.shippingPrice.toFixed(2)}</div>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <div>Tax</div>
                      <div>PHP {order.taxPrice.toFixed(2)}</div>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>PHP {order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </Row>
                  </ListGroup.Item>
    
                  {!order.isPaid && order.paymentMethod === 'PayPal' && (
                    <ListGroup.Item>
                      {!sdkReady ? (
                        <LoadingBox></LoadingBox>
                      ) : (
                        <>
                          {errorPay && (
                            <MessageBox variant="danger">{errorPay}</MessageBox>
                          )}
                          {loadingPay && <LoadingBox></LoadingBox>}
    
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        </>
                      )}
                    </ListGroup.Item>
                  )}
                  {userInfo.isAdmin 
                  && (order.isPaid || order.paymentMethod === 'Cash On Delivery')
                  && !order.isDelivered && (
                    <ListGroup.Item>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      {errorDeliver && (
                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                      )}
                      <Button
                        type="button"
                        className="primary block"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              {/* </div> */}
            </Col>
        </Row>
      </div>
    </Container>
  );
}