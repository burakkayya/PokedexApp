import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './styles/SignIn.css';
import NavbarComponent from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        const endpoint = 'http://localhost:8080/login';

        const loginData = new URLSearchParams();
        loginData.append('username', username);
        loginData.append('password', password);

        try {
            const response = await axios.post(endpoint, loginData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 200) {
                localStorage.setItem('username', username);
                navigateToCorrectPage(username);
            } else {
                setShowError(true);
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            setShowError(true);
        }
    }

    function navigateToCorrectPage(username) {
        const rolesEndpoint = `http://localhost:8080/users/username/${username}`;

        axios.get(rolesEndpoint, config).then((response) => {
            const userActive = response.data.active;
            const userRoles = response.data.roles;
            if (userRoles.includes('ROLE_ADMIN') && userActive) {
                navigate('/Admin');
            } else if (userRoles.includes('ROLE_USER') && userActive) {
                navigate('/Home');
            } else {
                console.log('Geçersiz rol.');
            }
        }).catch((error) => {
            console.error('Rol bilgilerini alma sırasında bir hata oluştu:', error);
        });
    }

    function handleClick(path) {
        navigate(path);
    }

    return (
        <>
            <NavbarComponent />
            <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center mt-4">
                <Row className="row-reverse justify-content-center">
                    <Col sm={6} className="d-flex justify-content-center align-items-center mb-5" >
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb- mt-md-3">
                                    <h1 className="fw-bold mb-3 text-uppercase ">Sign In</h1>
                                    <p className=" mb-3">Please enter your username and password!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleLogin}>
                                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <FaUserAlt />
                                                        </span>
                                                    </div>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <FaLock />
                                                        </span>
                                                    </div>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </Form.Group>
                                            <div className="d-grid justify-content-center">
                                                <Button variant="primary" type="submit">
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <div className="d-grid justify-content-center">
                                                <Button variant="secondary" className="mr-3" onClick={() => handleClick("SignUp")}>
                                                    Sign Up
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {showError && (
                                        <Alert variant="danger" className="mt-3">
                                            Username or password is wrong. Please try again.
                                        </Alert>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className="d-flex justify-content-center align-items-center ">
                        <Image src="/img/welcome.png" alt="Welcome" fluid />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Signin;
