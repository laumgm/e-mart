import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap'
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
        type: USER_DETAILS_RESET,
      });

  }, [dispatch, successDelete]);
  
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <>
      <Container className='pt-5'>
      <div className='current-screen'>
        <h3 className='text-center'>USERS</h3>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table striped bordered responsive className="table-sm pt-5">
          <thead className='text-center'>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller 
                  ? <i className='fas fa-check' /> 
                  : <i className='fas fa-times' />}
                </td>
                <td>{user.isAdmin
                  ? <i className='fas fa-check' /> 
                  : <i className='fas fa-times' />}
                </td>
                <td>
                  <Button
                    variant='warning'
                    className="btn-sm"
                    onClick={() => props.history.push(`/admin/user/${user._id}/edit`)}
                  >
                    <i className='fas fa-edit' />
                  </Button>
                  <Button
                    variant='danger'
                    className="btn-sm"
                    onClick={() => deleteHandler(user)}
                  >
                    <i className='fas fa-trash' />
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