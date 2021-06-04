import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { signout } from '../actions/userActions.js';

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <header>
      <Navbar bg='primary' expand='lg' collapseOnSelect>
        <Container className='p-2'>
          <LinkContainer to='/'>
            <Navbar.Brand>Everyday Mart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart mr-2'/>Cart
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className='dropdown-item'>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item className='dropdown-item'>Order History</NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to='/'> */}
                    <NavDropdown.Item className='dropdown-item-signout' onClick={signoutHandler}>
                      Sign out
                    </NavDropdown.Item>
                  {/* </LinkContainer> */}
                </NavDropdown>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link>
                    <i className='fas fa-user mr-2'/>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isSeller && (
                <NavDropdown title="Seller" id="sellerMenu">
                  <LinkContainer to="/productlist/seller">
                    <NavDropdown.Item className='dropdown-item'>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderlist/seller">
                    <NavDropdown.Item className='dropdown-item'>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminMenu'>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className='dropdown-item'>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item className='dropdown-item' >Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item className='dropdown-item' >Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
