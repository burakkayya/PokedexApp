import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { FaSearch } from 'react-icons/fa';
import { Button, Modal, Form, Card, Col, Row } from 'react-bootstrap';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    axios.get('http://localhost:8080/users', { withCredentials: true })
      .then(response => {
        setUserList(response.data);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  };

  const filteredUserList = userList.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleActivity = (userId, newActivityStatus) => {
    setSelectedUserId(userId);
    setPendingAction(newActivityStatus);
    setShowConfirmation(true);
  };
  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      if (pendingAction !== null) {
        try {
          const user = userList.find(user => user.id === selectedUserId);
          if (user) {
            const updatedUserList = userList.map(u => {
              if (u.id === user.id) {
                return { ...u, active: pendingAction };
              }
              return u;
            });
            setUserList(updatedUserList);
            if(!user.active){
            await axios.put(`http://localhost:8080/users/activate/${user.id}`, null, { withCredentials: true });
            }else{
              await axios.delete(`http://localhost:8080/users/${user.id}`, { withCredentials: true });
            }
          }
        } catch (error) {
          console.error('Error updating user activity:', error);
        }
      }
    }
  
    setShowConfirmation(false);
    setSelectedUserId(null);
    setPendingAction(null);
  };



  return (
    <>
      <AdminNavbar />
      <div style={{ backgroundColor: '#010712', padding: '20px' }}>
        <div className='mt-4 justify-content-center ' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white' }} className='mt-5 mb-3'>User List</h1>
        </div>
        <div className='mt-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="d-flex justify-content-end mb-2">
            <div className="position-relative" style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
              <div className="position-absolute" style={{ paddingLeft: '5px' }}>
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search User Name"
                className="form-control"
                style={{ width: '250px', paddingLeft: '30px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Row className="justify-content-center mt-2">
          {filteredUserList.map(user => (
            <Col xs={12} md={6} lg={4} xl={3} key={user.id} className="m-3 ">
              <Card
                border={user.active ? 'success' : 'danger'}
                style={{
                  borderRadius: '50%',
                  backgroundColor: user.active ? '#28a745' : '#dc3545',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    borderRadius: '50%',
                    overflow: 'hidden',
                    width: '120px',
                    height: '120px',
                    margin: '20px auto',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src="/img/userImage.jpg"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="card-header" style={{ fontSize: '20px', marginBottom: '10px' }}>
                    {user.username}
                  </Card.Title>
                  <Card.Text className='mt-2' style={{ fontSize: '14px' }}>
                    <p>
                      <strong>Email:</strong> {user.email}
                      <br />
                      <strong>Subscription Date:</strong> {user.createDate}
                      <br />
                      <strong>Last Activity Date:</strong> {user.updateDate}
                    </p>
                  </Card.Text>
                  <Card.Footer>
                    <div className="d-flex justify-content-center align-items-center">
                      <h5 style={{ fontSize: '16px', marginRight: '10px' }}>Activity Status</h5>
                      <Form.Check
                        type="switch"
                        style={{ fontSize: '16px', margin: '5px' }}
                        id={`custom-switch-${user.id}`}
                        checked={user.active}
                        onChange={() => handleToggleActivity(user.id, !user.active)}
                      />
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showConfirmation} onHide={() => handleConfirmation(false)} style={{ color: 'black' }}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to change the user activity status?</Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="secondary" onClick={() => handleConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirmation(true)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
