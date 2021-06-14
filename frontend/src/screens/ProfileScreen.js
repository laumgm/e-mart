import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };
  
  const goBack = () => history.goBack()

  return (
    <Container className='pt-5'>
      <Button onClick={goBack}
        className='btn btn-light ml-5 my-3'>Go Back
      </Button>
        <FormContainer>
          <Form>
            <h3 className='text-center'>USER PROFILE</h3>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* {user.isSeller && (
                <>
                  <div className="row currentScreen">
                    <h2>SELLER</h2>
                  </div>
                  <Form.Group >
                    <Form.Label>Seller Name</Form.Label>
                    <Form.Control
                      id="sellerName"
                      type="text"
                      placeholder="Enter Seller Name"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='sellerLogo'>
                    <Form.Label>Seller Logo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Seller Logo"
                      value={sellerLogo}
                      onChange={(e) => setSellerLogo(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='sellerDescription'>
                    <Form.Label>Seller Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Seller Description"
                      value={sellerDescription}
                      onChange={(e) => setSellerDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </>
              )} */}
              
              <Button className="primary" type="submit" onClick={submitHandler}>
                Update
              </Button>
            </>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
}