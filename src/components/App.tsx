import { AuthenticationResult } from 'models/AuthenticationResult';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ExpensesHome } from './Expenses/expenses-home';
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
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='expenses' element={<ExpensesHome />} />
      </Routes>
    </LoginContext.Provider>
  );
};
