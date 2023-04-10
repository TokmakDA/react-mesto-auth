import React from 'react';
import FormTemplate from './FormTemplate';

const Login = ({ isLoggedIn, onLogin, isLoading }) => {
  const form = {
    name: 'login',
    title: 'Вход',
    button: 'Войти',
    loadingButton: 'Подождите...',
  };

  return (
    <FormTemplate
      isLoggedIn={isLoggedIn}
      onSubmit={onLogin}
      form={form}
      isLoading={isLoading}
    />
  );
};

export default Login;
