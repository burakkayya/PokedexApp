import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './styles/SignIn.css';
import NavbarComponent from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showUserExistsError, setShowUserExistsError] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setShowPasswordError(true);
            return;
        }

        const endpoint = 'http://localhost:8080/pokedex/users';

        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await axios.post(endpoint, userData);

            if (response.status === 201 || response.status === 200) {
                navigate("/");
            } else if (response.status === 422) {
                setShowUserExistsError(true);
            } else {
                console.log('Kullanıcı oluşturulamadı.');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setShowUserExistsError(true);
            } else {
                console.error('Bir hata oluştu:', error);
            }
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center mt-4">
                <Row className=" row-reverse justify-content-center">
                    <Col sm={6} className="d-flex justify-content-center align-items-center mb-5" >
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb- mt-md-3">
                                    <h1 className="fw-bold mb-2 text-uppercase ">Sign Up</h1>
                                    <p className=" mb-3">Please enter your information to sign up!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <FaEnvelope />
                                                        </span>
                                                    </div>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </Form.Group>

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

                                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <FaLock />
                                                        </span>
                                                    </div>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                </div>
                                            </Form.Group>

                                            <div className="mt-3">
                                                <div className="d-grid justify-content-center">
                                                    <Button
                                                        variant="secondary"
                                                        className="mr-3"
                                                        onClick={handleSubmit}
                                                    >
                                                        Sign Up
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                {showPasswordError && (
                                    <Alert variant="danger" className="mt-3">
                                        Passwords do not match. Please re-enter.
                                    </Alert>
                                )}

                                {showUserExistsError && (
                                    <Alert variant="danger" className="mt-3">
                                        User already exists. Please choose a different username.
                                    </Alert>
                                )}
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={4} className="d-flex justify-content-center align-items-center ">
                        <Image src="/img/signup.png" alt="Signup" fluid />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Signup;
