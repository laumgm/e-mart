import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 2500 ? toPrice(0) : toPrice(45);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // dispatch place order action
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push('/orderhistory')
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div className='pt-3'>
      <Container>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Row className='d-flex align-items-start py-5'> {/* flex-start */}
          <Col>
            <ListGroup>
              <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                    ,{cart.shippingAddress.country}
                  </p>
              </ListGroup.Item>
              <ListGroup.Item>
                  <h4>Payment</h4>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
              </ListGroup.Item>
              <ListGroup.Item>
                  <h4>Order Items</h4>
                  <ListGroup>
                    {cart.cartItems.map((item) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col>
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
                          <Col>
                            {item.qty} x Php {item.price} = Php {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
              <ListGroup>
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <div>Items</div>
                    <div>PHP {cart.itemsPrice.toFixed(2)}</div>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <div>Shipping</div>
                    <div>PHP {cart.shippingPrice.toFixed(2)}</div>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <div>Tax</div>
                    <div>PHP {cart.taxPrice.toFixed(2)}</div>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <div>
                      <strong>Order Total</strong>
                    </div>
                    <div>
                      <strong>PHP {cart.totalPrice.toFixed(2)}</strong>
                    </div>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to='/payment' className='btn btn-light my-3'>Go Back</Link>
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    className="primary block mx-2"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}