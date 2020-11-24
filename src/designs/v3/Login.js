import React, {useRef, useState} from 'react';
import {Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import styled from 'styled-components';
import { FaLock, FaUser, FaGoogle} from 'react-icons/fa';
import SubscribeSVG from './assets/subscribe.svg'
import LoginSVG from './assets/login.svg'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Abril Fatface', 'sans-serif']
  }
});

const Container = styled.div`
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
    font-family: "Abril Fatface";

    &::before {
        content: "";
        position: absolute;
        height: 2000px;
        width: 2000px;
        top: -10%;
        right: 48%;
        transform: translateY(-50%);
        background-image: linear-gradient(-45deg, #00BFA6 0%, #88ffef 100%);
        transition: 1.8s ease-in-out;
        border-radius: 50%;
        z-index: 6;

        @media (max-width: 870px) {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        }

        @media (max-width: 570px) {
            bottom: 72%;
            left: 50%;
        }
    }

    &.sign-up-mode:before {
        transform: translate(100%, -50%);
        right: 52%;

        @media (max-width: 870px) {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
        }

        @media (max-width: 570px) {
            bottom: 28%;
            left: 50%;
        }
    }

    &.sign-up-mode .left-panel .image {
        transform: translateX(-800px);

        @media (max-width: 870px) {
            transform: translateY(-300px);
        }
    }

    &.sign-up-mode .left-panel .content {
        transform: translateX(-800px);

        @media (max-width: 870px) {
            transform: translateY(-300px);
        }
    }
    
    &.sign-up-mode .signin-signup {
        left: 25%;

        @media (max-width: 870px) {
            top: 5%;
            transform: translate(-50%, 0);
        }
    }

    &.sign-up-mode .sign-up-form {
        opacity: 1;
        z-index: 2;
    }

    &.sign-up-mode .sign-in-form {
        opacity: 0;
        z-index: 1;
    }

    &.sign-up-mode .right-panel .image,
    &.sign-up-mode .right-panel .content {
        transform: translateX(0%);

        @media (max-width: 870px) {
            transform: translateY(0px);
        }
    }

    &.sign-up-mode .left-panel {
        pointer-events: none;
    }

    &.sign-up-mode .right-panel {
        pointer-events: all;
    }

    @media (max-width: 870px) {
        min-height: 800px;
        height: 100vh;

        &.sign-up-mode .signin-signup {
            left: 50%;
        }
    }

    @media (max-width: 570px) {
        padding: 1.5rem;
    }
`

const FormsContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const SignInSignUp = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;

    @media (max-width: 870px) {
        width: 100%;
        top: 95%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
        left: 50%;
    }
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    .sign-up-form {
        opacity: 0;
        z-index: 1;
    }

    .sign-in-form {
        z-index: 2;
    }

    @media (max-width: 570px) {
        padding: 0 1.5rem;
    }
`

const SignInForm = styled(Form)`
    z-index: 2;
`;

const SignUpForm = styled(Form)`
    opacity: 0;
    z-index: 1;
`;

const Title = styled.h2`
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
    font-weight: 600;
`

const InputField = styled.div`
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;

    svg {
        align-self: center;
        color: #acacac;
        font-size: 1.1rem;
        justify-self: center;
    }

    input {
        background: none;
        outline: none;
        border: none;
        line-height: 1;
        font-weight: 600;
        font-size: 1.1rem;
        color: #2F2E41;

        &::placeholder {
            color: #aaa;
            font-weight: 500;
        }
    }
`

const SocialText = styled.p`
    padding: 0.7rem 0;
    font-size: 1rem;
`

const SocialMedia = styled.div`
    display: flex;
    justify-content: center;
`

const SocialIcon = styled.a`
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #2F2E41;
    border-radius: 50%;
    border: 1px solid #2F2E41;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;

    &:hover {
        color: #00BFA6;
        border-color: #00BFA6;
    }
`
const Button = styled.input`
    width: 150px;
    background-color: #00BFA6;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        background-color: #00a28d;
    }
`

const PanelsContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 870px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }
`
const Image = styled.img`
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;

    @media (max-width: 870px) {
        width: 200px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    @media (max-width: 570px) {
        display: none;
    }
`

const RightPanelImage = styled(Image)`
    transform: translateX(800px);

    @media (max-width: 870px) {
        transform: translateY(300px);
    }
`

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;

    h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 1.5rem;

        @media (max-width: 870px) {
            font-size: 1.2rem;
        }
    }

    p {
        font-size: 0.95rem;
        padding: 0.7rem 0;

        @media (max-width: 870px) {
            font-size: 0.7rem;
            padding: 0.5rem 0;
        }
    }

    @media (max-width: 870px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
    }
`

const LeftPanel = styled(Panel)`
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;

    @media (max-width: 870px) {
        grid-row: 1 / 2;
    }
`;

const RightPanel = styled(Panel)`
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;

    @media (max-width: 870px) {
        grid-row: 3 / 4;
    }
`;

const Content = styled.div`
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;

    p {
        font-size: 1.2rem;
    }

    @media (max-width: 870px) {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    @media (max-width: 570px) {
        padding: 0.5rem 1rem;
    }
`

const RightPanelContent = styled(Content)`
    transform: translateX(800px);

    @media (max-width: 870px) {
        transform: translateY(300px);
    }
`;

const TransparentButton = styled.button`
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
    width: 150px;
    background-color: #00BFA6;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        background-color: #00a28d;
    }

    &:focus {
        border: none;
        outline: none;
    }

    &:active {
        border: none;
        outline: none;
    }

    @media (max-width: 870px) {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
    }
`;

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { login, signup, loginWithProvider } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [singupMode, setSignupMode] = useState('');
    const history = useHistory();



    async function handleLogin(e) {
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

    async function handleLoginWithProvider(e) {
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            await loginWithProvider(e.target.getAttribute('data-provider'));
            history.push('/')
        } catch {
            setError("Failed to sign in")
            setLoading(false);
        }
    }

    async function handleSingup(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/')
        } catch {
            setError("Failed to create an account")
            setLoading(false);
        }
    }

    function handleFormSwitch(e) {
        e.target.id === "sign-in-btn" ? setSignupMode('') : setSignupMode('sign-up-mode');
    }

    return (
        <Container className={singupMode}>
            <FormsContainer>
                <SignInSignUp className="signin-signup">
                    <SignInForm className="sign-in-form" onSubmit={handleLogin}>
                        <Title>Sign in</Title>
                        {
                            error &&
                            <Alert variant="danger">{error}</Alert>
                        }
                        <InputField>
                            <FaUser></FaUser>
                            <input type="email" placeholder="Email" ref={emailRef} required />
                        </InputField>
                        <InputField>
                            <FaLock></FaLock>
                            <input type="password" required ref={passwordRef} placeholder="Password" />
                        </InputField>
                        <Button type="submit" value="Login"/>
                        <Link to="/forgot-password">Forgot Password?</Link>
                        <SocialText>Sign in with Google</SocialText>
                        <SocialMedia>
                            <SocialIcon onClick={handleLoginWithProvider} data-provider="google" href="/">
                                <FaGoogle></FaGoogle>
                            </SocialIcon>
                        </SocialMedia>
                    </SignInForm>
                    <SignUpForm className="sign-up-form" onSubmit={handleSingup}>
                        <Title>Sign up</Title>
                        <InputField>
                            <FaUser></FaUser>
                            <input type="email" placeholder="Email" ref={emailRef} required />
                        </InputField>
                        <InputField>
                            <FaLock></FaLock>
                            <input type="password" required ref={passwordRef} placeholder="Password" />
                        </InputField>
                        <InputField>
                            <FaLock></FaLock>
                            <input type="password" required ref={passwordConfirmRef} placeholder="Password Confirmation" />
                        </InputField>
                        <Button type="submit" value="Sign up" disabled={loading} />
                        <SocialText>Get started using your Google account</SocialText>
                        <SocialMedia>
                            <SocialIcon onClick={handleLoginWithProvider} data-provider="google" href="/">
                                <FaGoogle></FaGoogle>
                            </SocialIcon>
                        </SocialMedia>
                    </SignUpForm>
                </SignInSignUp>
            </FormsContainer>
        
            <PanelsContainer>
                <LeftPanel className="left-panel">
                    <Content className="content">
                        <h3>New here ?</h3>
                        <p>
                            You can create an account by clicking the below button. We only ask you for your email and password. <br/>
                            If you want to learn more about our organisation visit our about page.
                        </p>
                        <TransparentButton onClick={handleFormSwitch} id="sign-up-btn">
                            Sign Up
                        </TransparentButton>
                    </Content>
                    <Image className="image" src={LoginSVG} alt="An email drawing with tick-boxes" />
                </LeftPanel>
                <RightPanel className="right-panel">
                    <RightPanelContent className="content">
                        <h3>One of us ?</h3>
                        <p>
                            So nice to see you back. Don't forget that we are always here to assist you with your account.
                        </p>
                        <TransparentButton onClick={handleFormSwitch} id="sign-in-btn">
                            Sign In
                        </TransparentButton>
                    </RightPanelContent>
                    <RightPanelImage className="image" src={SubscribeSVG} alt="A person opening a door" />
                </RightPanel>
            </PanelsContainer>
      </Container>
    )
}
