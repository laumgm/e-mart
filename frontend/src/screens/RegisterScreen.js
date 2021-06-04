import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.js';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  
  return (
    <div className='mt-5'>
      <FormContainer>
        <h1>Sign up</h1>
        { message && <MessageBox variant='danger'> {message} </MessageBox> }
        { error && <MessageBox variant='danger'> {error} </MessageBox> }
        { loading && <LoadingBox /> }
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Enter your name' 
              value={name}
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type='email' 
              placeholder='Enter email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Enter password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Confirm password' 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' onClick={submitHandler}>Sign Up</Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an account? {' '}
            <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
                Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}