import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './styles/Navbar.css'

function NavbarComponent() {
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
    </>
  );
}

export default NavbarComponent;