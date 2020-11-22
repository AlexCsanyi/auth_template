import React, {useRef, useState} from 'react';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

export default function UpdateProfile() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const promises = [];

    function handleSubmit(e) {
        e.preventDefault()

        setError('');
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100" style={{minHeight: "100vh"}}>
            <Card className="w-50 p-3">
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control 
                                type="password" 
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Update Profile</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div> 
            </Card> 
        </div>
    )
}
