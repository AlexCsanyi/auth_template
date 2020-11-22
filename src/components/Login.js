import React, {useRef, useState} from 'react';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/')
        } catch {
            setError("Failed to sign in")
            setLoading(false);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <Card className="w-50 p-3">
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>  
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>  
            </Card>
        </div>
    )
}
