import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { HttpStatusCode } from 'axios';
import { FormikErrors, useFormik } from 'formik';
import { useApi } from 'hooks/useApi';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationResult } from '../../models/AuthenticationResult';
import { LoginContext } from '../App';
import '../shared/styles/shared.css';
import './login.css';

const { Title } = Typography;

interface FormValues {
  email: string;
  password: string;
}

interface FormValuesErrors extends FormValues {
  incorrectUsernameOrPassword: string;
}

const axiosCognitoConf = {
  headers: {
    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    'Content-Type': 'application/x-amz-json-1.1',
  },
};

const cognitoUrl = 'https://cognito-idp.us-east-2.amazonaws.com/';
const incorrectUserNameOrPassword = 'Incorrect username or password.';
const validate = (values: FormValuesErrors): FormikErrors<FormValuesErrors> => {
  const errors: FormikErrors<FormValuesErrors> = {};
  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 50) {
    errors.password = 'Must be 50 characters or less';
  } else if (values.password === incorrectUserNameOrPassword) {
    errors.password = '';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export const Login: React.FC = () => {
  const formik = useFormik<FormValuesErrors>({
    initialValues: {
      email: '',
      password: '',
      incorrectUsernameOrPassword: '',
    },
    validate,
    onSubmit: () => {},
  });
  const navigate = useNavigate();
  const { setAuthenticationState } = React.useContext(LoginContext);

  const handleOnClick = async () => {
      await fetch();
  };

  const cognitoData = {
    AuthParameters: {
      USERNAME: formik.values.email,
      PASSWORD: formik.values.password,
    },
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: '25oksgjnl258639r4cvp4nl0v2',
  };

  const { data, error, loading, fetch } = useApi(
    cognitoUrl,
    'post',
    cognitoData,
    undefined,
    axiosCognitoConf.headers
  );

  if (data && !error && !loading) {
    const authenticationResult = new AuthenticationResult(
      data.AuthenticationResult
    );
    setAuthenticationState(authenticationResult);
    localStorage.setItem('loginToken', authenticationResult.AccessToken);
    navigate('expenses');
  }

  if (error && !loading) {
    if (error.response?.status === HttpStatusCode.BadRequest) {
      if (error.response.data.message === incorrectUserNameOrPassword) {
        formik.errors.incorrectUsernameOrPassword = error.response.data.message;
      }
    }
  }

  //TODO make a component for the error message under the inputs
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
              status={
                formik.errors.email || formik.errors.incorrectUsernameOrPassword
                  ? 'error'
                  : undefined
              }
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <Input.Password
              name='password'
              placeholder='Password'
              status={formik.errors.password || formik.errors.incorrectUsernameOrPassword ? 'error' : undefined}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            {formik.errors.incorrectUsernameOrPassword ? (
              <div>{formik.errors.incorrectUsernameOrPassword}</div>
            ) : null}
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col>
            <Button
              htmlType='submit'
              size={'large'}
              loading={loading}
              onClick={handleOnClick}
            >
              Iniciar sesión
            </Button>
          </Col>
        </Row>
      </Card>
    </section>
  );
};
