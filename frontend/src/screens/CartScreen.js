import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Container, Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <>
      <Container className='py-5'>
        <h3>SHOPPING CART</h3>
        <Row className='d-flex align-items-start'>
          <Col>
            {cartItems.length === 0 ? (
              <MessageBox variant='danger'>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <div>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="small"
                        ></Image>
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        Quuantity: &nbsp;
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div><b> Total: PHP {item.price} </b></div>
                      <div>
                        <Button
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
    
          <Col>
            <div className="card card-body pt-3">
              <ListGroup >
                <ListGroup.Item>
                  <h5>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} item/s) : PHP 
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </h5>
                </ListGroup.Item>
                <ListGroup>
                  <Button
                    type="button"
                    onClick={checkoutHandler}
                    className="primary block mt-3"
                    disabled={cartItems.length === 0}
                    >
                    Proceed to Checkout
                  </Button>
                </ListGroup>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}