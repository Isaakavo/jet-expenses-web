import { AuthenticationResult } from 'models/AuthenticationResult';
import React, { Dispatch, SetStateAction } from 'react';
import './App.css';
import { Login } from './Login';

export type InitialVal = {
  authenticationState: AuthenticationResult | null;
  setAuthenticationState: (state: AuthenticationResult | null) => void;
};

export const LoginContext = React.createContext<InitialVal>({
  authenticationState: null,
  setAuthenticationState: (state: AuthenticationResult | null) => {},
});

export const App = () => {
  const [authenticationState, setAuthenticationState] =
    React.useState<AuthenticationResult | null>(null);

  return (
    <LoginContext.Provider
      value={{
        authenticationState,
        setAuthenticationState,
      }}
    >
      <Login />
    </LoginContext.Provider>
  );
};
