import React, {useState} from 'react';
import {Button, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import styled from 'styled-components';

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
    text-align: center;
`
const CustomRightCol = styled.div.attrs(props => ({
    className: "col",
}))`
    background-image: linear-gradient(45deg, #f046ff, #9b00e8);
    border-radius: 25px;
`
const RightContainer = styled.div`
    height: 100%;
    padding: 10px;
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
    margin-top: 2.5rem;
`
const ButtonLogOut = styled.button`
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
    margin: 5px;
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
        <div className="d-flex align-items-center justify-content-center w-100" style={{minHeight: "100vh"}}>
            <CustomCard>
                    <CustomLeftCol>
                        <LeftContainer>
                                <FormTitle>Email: {currentUser.email}</FormTitle>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <LinkContainer>
                                    <ButtonLogOut onClick={handleLogout}>Log Out</ButtonLogOut>
                                </LinkContainer>
                        </LeftContainer>
                    </CustomLeftCol>
                    <CustomRightCol>
                        <RightContainer>
                            <Box>
                                <Welcome>How are you</Welcome>
                            
                                <p className="text-justify">
                                    If I were any better, I'd be illegal.
                                </p>
                                
                            </Box>
                        </RightContainer>
                    </CustomRightCol>
            </CustomCard>
        </div>
    )
}
