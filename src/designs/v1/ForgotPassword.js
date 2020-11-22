import React, {useRef, useState} from 'react';
import {Form, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import styled from 'styled-components';
import { BsEnvelope } from 'react-icons/bs';

const CustomCard = styled.div`
    background: #fff;
    height: 100%;
    border-radius: 25px;
    -webkit-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-wrap: wrap;
`
const CustomLeftCol = styled.div.attrs(props => ({
    className: "col",
}))`
    min-width: fit-content;
`

const LeftContainer = styled.div`
    background: #fff;
    border-radius: 25px;
    height: 100%;
    padding: 25px;
`
const CustomRightCol = styled.div.attrs(props => ({
    className: "col",
}))`
    background-image: linear-gradient(45deg, #f046ff, #9b00e8);
    border-radius: 25px;
`
const RightContainer = styled.div`
    height: 100%;
    padding: 25px;
    color: rgb(192, 192, 192);
    font-size: 12px; 
    display: flex;
    justify-content: center;
    align-items: center;
`
const FormTitle = styled.header`
    color: blueviolet;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
`
const CustomInput = styled.input`
    width: 60%;
    border-radius: 25px;
    padding: 10px;
    padding-left: 50px;
    margin-right: 10px;
    border: none;
    -webkit-box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);

    &:focus {
        outline: none;
    }
`
const ButtonSubmit = styled.button`
    background: linear-gradient(45deg, #bb36fd, #9b00e8);
    color: #fff;
    width: 230px;
    border: none;
    border-radius: 25px;
    padding: 10px;
    box-shadow: 0px 10px 41px -11px rgba(0, 0, 0, 0.7);
    margin-top: 20px;
    margin-bottom: 20px;

    &:hover {
        background: linear-gradient(45deg, #c85bff, #b726ff);
    }

    &:focus {
        outline: none;
    }
`
const Box = styled.div`
    position: relative;
    margin: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Welcome = styled.header`
    color: #fff;
    font-size: 44px;
    text-align: center;
    padding-bottom: 15px;
`
const ButtonOut = styled.button`
    background: transparent;
    color: #fff;
    width: 120px;
    border: 2px solid#fff;
    border-radius: 25px;
    padding: 10px;
    -webkit-box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);

    &:hover {
        border: 2px solid#eecbff;
    }

    &:focus {
        outline: none;
    }
`
const LinkContainer =  styled.div`
    margin-top: 15px;
`

const IconStyle = {
    position: "relative",
    color: "#bb36fd",
    left: "36px"
}

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
            <CustomCard>
                    <CustomLeftCol>
                        <LeftContainer>
                            <Form onSubmit={handleSubmit} className="text-center position-relative mt-5">
                                <FormTitle>Need help reseting your password?</FormTitle>
                                <p className="pb-3">
                                    Enter your email, click 'Reset Password' and we will send you an email withthe instructions
                                </p>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <Form.Group id="email">
                                    <BsEnvelope style={IconStyle}></BsEnvelope> 
                                    <CustomInput 
                                        placeholder="Email"
                                        type="email" 
                                        ref={emailRef} 
                                        required
                                    >
                                    </CustomInput>
                                </Form.Group>
                                <ButtonSubmit disabled={loading} type="submit">Reset Password</ButtonSubmit>
                                <LinkContainer>
                                    Back to <Link to="/login">Log In</Link>
                                </LinkContainer>
                                <LinkContainer>
                                    Need an account? <Link to="/signup">Sign Up</Link>
                                </LinkContainer>
                            </Form>
                        </LeftContainer>
                    </CustomLeftCol>
                    <CustomRightCol>
                        <RightContainer>
                            <Box>
                                <Welcome>It's okay</Welcome>
                            
                                <p className="text-justify">
                                    My new password is "SnowWhite&the7dwarves". 
                                    Because it said I needed at least 8 characters, including caps, a number and a symbol
                                </p>

                                <Link to="/learn-more"><ButtonOut>Learn More</ButtonOut></Link>
                            </Box>
                        </RightContainer>
                    </CustomRightCol>
            </CustomCard>
        </div>
    )
}
