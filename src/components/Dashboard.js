import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('')
        
        try {
            await logout();
            history.push('/login')
        } catch (error) {
            setError("Failed to logout")
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <Card className="w-50 p-3"> 
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: {currentUser.email}</strong>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>  
            </Card>
        </div>
    )
}
