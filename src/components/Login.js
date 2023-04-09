import React from 'react';
import FormTemplate from './FormTemplate';

const Login = ({ isLoggedIn, onLogin }) => {
  const form = {
    name: 'login',
    title: 'Вход',
    button: 'Войти',
  };

  return (
    <FormTemplate isLoggedIn={isLoggedIn} onSubmit={onLogin} form={form} />
  );
};

export default Login;
