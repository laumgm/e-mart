import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  
  return (
    <div className='pt-3'>
      <Container>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
      </Container>
      <FormContainer>
        <Form className='py-5'>
          <ListGroup>
            <ListGroup.Item>
              <h3 className='text-center'>Payment Method</h3>
              <Form.Group controlId='paypal'>
                <div>
                  <input
                    type="radio"
                    value="PayPal"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                  <label htmlFor="paypal">&nbsp;PayPal</label>
                </div>
              </Form.Group>
  
              <Form.Group>
                <div>
                  <input
                    type="radio"
                    id="stripe"
                    value="Cash On Delivery"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                  <label htmlFor="stripe">&nbsp;Cash on Delivery</label>
                </div>
              </Form.Group>

              <Link to='/shipping' className='btn btn-light my-3'>Go Back</Link>
              <Button className="primary mx-2" type="submit" onClick={submitHandler}>
                Continue
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Form>
      </FormContainer>
    </div>
  );
}