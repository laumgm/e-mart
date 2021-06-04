import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.js';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // sign in action
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className='mt-5'>
        <FormContainer>
          <h1>Sign in</h1>
          { error && <MessageBox variant='danger'> {error} </MessageBox> }
          { loading && <LoadingBox /> }
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type='email' 
                placeholder='Enter email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type='password' 
                placeholder='Enter password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}>
              </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Sign in</Button>
          </Form>

          <Row className='py-3'>
            <Col>
              New Customer? {' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Create an account
              </Link>
            </Col>
          </Row>
        </FormContainer>
    </div>
  );
}