import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './styles/Navbar.css';
import { Link } from 'react-router-dom';

function UserNavbar() {
  return (
    <>
      <Navbar  fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/img/logo.jpg"
              width="100"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand> 
          <Nav className="me-auto">
          <Link to="/Home" className="nav-link">Home</Link>
            <Link to="/WishList" className="nav-link">Wish List</Link>
            <Link to="/CatchList" className="nav-link">Catch List</Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
    </>
  );
}

export default UserNavbar;
