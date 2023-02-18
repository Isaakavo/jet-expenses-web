import { Button, Card, Col, Input, Row, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationResult } from '../../models/AuthenticationResult';
import { LoginContext } from '../App';
import '../shared/styles/shared.css';
import './login.css';

const { Title } = Typography;

export const Login: React.FC = () => {
  const [loginState, setLoginState] = React.useState<{
    email: '';
    password: '';
  }>({
    email: '',
    password: '',
  });
  const { setAuthenticationState } = React.useContext(LoginContext);
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const onClickHandle = async () => {
    const axiosConf = {
      headers: {
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        'Content-Type': 'application/x-amz-json-1.1',
      },
    };
    const data = {
      AuthParameters: {
        USERNAME: loginState.email,
        PASSWORD: loginState.password,
      },
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: '25oksgjnl258639r4cvp4nl0v2',
    };
    const resp = await axios.post(
      'https://cognito-idp.us-east-2.amazonaws.com/',
      data,
      axiosConf
    );
    const authenticationResult = new AuthenticationResult(
      resp.data.AuthenticationResult
    );
    setAuthenticationState(authenticationResult);
    localStorage.setItem("loginToken", authenticationResult.AccessToken)
    navigate("expenses");
  };

  return (
    <section className='main-container'>
      <Card>
        <Row justify={'center'} align='middle'>
          <Col>
            <Title className='text' level={2}>
              Hola
            </Title>
            <Title className='text' level={3}>
              Inicia sesión
            </Title>
          </Col>
        </Row>
        <Row className='margin-top' justify={'center'}>
          <Col>
            <Input
              name='email'
              className='margin-top'
              placeholder='E-mail'
              value={loginState.email}
              onChange={handleOnChange}
            />
            <Input.Password
              name='password'
              placeholder='Password'
              value={loginState.password}
              onChange={handleOnChange}
            />
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col>
            <Button size={'large'} onClick={onClickHandle}>
              Iniciar sesión
            </Button>
          </Col>
        </Row>
      </Card>
    </section>
  );
};
