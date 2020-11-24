import React, {useRef, useState} from 'react';
import {Form, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import styled from 'styled-components';
import HeroImage from './assets/bg-resetpass.png'

const CustomRow = styled.div.attrs(props => ({
    className: "row",
}))`
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 12px 12px 22px grey;
    align-items: center;

    @media(max-width: 990px) {
        box-shadow: none;
    }
`

const CustomColImage = styled.div.attrs(props => ({
    className: "col-lg-6 p-0",
}))`
    background-color: #C8C8CA;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

    @media(max-width: 990px) {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-left-radius: 0;
    }
`

const CustomImage = styled.img`
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

    @media(max-width: 990px) {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-left-radius: 0;
    }
`

const CustomColForm = styled.div.attrs(props => ({
    className: "col-lg-6",
}))`
    padding-left: 3.5rem;

    @media(max-width: 990px) {
        padding-left: 1rem;
    }
`

const WelcomeContainer = styled.div`
    color: #000;
    text-transform: uppercase;
    font-size: 36px;
    font-weight: bold;
    width: 100%;
    padding-bottom: 25px;
    display: block;
`
const Flip = styled.div`
    height:50px;
    overflow:hidden;

    > div > div {
        color: #fff;
        padding: 1px 10px;
        height: 45px;
        margin-bottom: 45px;
        display: inline-block;
    }

    div:first-child {
        animation: show 5s linear infinite;
    }

    div div {
        background: #000;
    }

    @keyframes show {
        0% {margin-top:-270px;}
        5% {margin-top:-180px;}
        33% {margin-top:-180px;}
        38% {margin-top:-90px;}
        66% {margin-top:-90px;}
        71% {margin-top:0px;}
        99.99% {margin-top:0px;}
        100% {margin-top:-270px;}
    }
`
const CustomInput = styled.input.attrs(props => ({
    className: "form-control",
}))`
    border: 1px solid rgba(245, 209, 13, 1);

    &:focus {
        border-color: rgba(245, 209, 13, 1);
        box-shadow: inset 0 1px 1px rgba(245, 209, 13, 1), 0 0 8px rgba(245, 209, 13, 1);
    }
`

const ButtonSubmit = styled.button`
    border: none;
    outline: none;
    height: 50px;
    width: 100%;
    background-color: #000000;
    color: #fff;
    border-radius: 4px;
    font-weight: bold;
    transition: all 200ms ease-in;

    &:hover {
        background-color: #fff;
        color: #000000;
        border: 2px solid;
    }
`

const StyledLink = styled(Link)`
    display: block;
    margin-bottom: 5px;
    max-width: max-content;
    color: #000;
    text-decoration: none;
    font-weight: 700;
    background-image: linear-gradient(to bottom, transparent 50%, rgba(245, 209, 13, 0.4) 50%);
    background-size: 100% 200%;
    transition: background-position 200ms ease-in-out;

    &:hover {
        background-position: 100% 50%;
        text-decoration: none;
        color: #000;
    }
`;

export default function ForgotPassword() {

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password")
            setLoading(false);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100" style={{minHeight: "100vh"}}>
            <section className="m-1">
                <div className="container">
                    <CustomRow>
                        <CustomColImage>
                            <CustomImage 
                                src={HeroImage} 
                                alt="A laptop, pencils, glasses and a smart watch"
                                className="img-fluid"
                            />
                        </CustomColImage>
                        <CustomColForm>
                            <WelcomeContainer>
                                Make 
                                <Flip>
                                    <div><div>Work</div></div>
                                    <div><div>lifeStyle</div></div>
                                    <div><div>Everything</div></div>
                                </Flip>
                                Awesome
                            </WelcomeContainer>
                            <h4>Enter your email you signed up with and click reset</h4>
                            <Form onSubmit={handleSubmit} className="w-100">
                                {
                                    error &&   
                                    <Form.Row>
                                        <div className="col-lg-9">
                                            <Alert variant="danger">{error}</Alert> 
                                        </div>
                                    </Form.Row>
                                }
                                {
                                    message &&   
                                    <Form.Row>
                                        <div className="col-lg-9">
                                            <Alert variant="success">{message}</Alert> 
                                        </div>
                                    </Form.Row>
                                }
                                <Form.Row id="email">
                                    <div className="col-lg-9">
                                        <CustomInput
                                            type="email" 
                                            placeholder="Email" 
                                            ref={emailRef}  
                                            required 
                                            className="my-3 p-4" 
                                        />
                                    </div>
                                </Form.Row>
                                <Form.Row>
                                    <div className="col-lg-9">
                                        <ButtonSubmit disabled={loading} type="submit" className="mt-3 mb-5">
                                            Reset Password
                                        </ButtonSubmit>
                                    </div>
                                </Form.Row>
                                <StyledLink to="/login">
                                    Back to Log In
                                </StyledLink>
                                <StyledLink to="/signup">
                                    Need an account? Sign Up
                                </StyledLink>
                            </Form>
                        </CustomColForm>
                    </CustomRow>
                </div>
            </section>
        </div>
    )
}
