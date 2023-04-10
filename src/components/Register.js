import React from 'react';
import FormTemplate from './FormTemplate';
import { Link } from 'react-router-dom';

const Register = ({ isLoggedIn, onRegister, isLoading }) => {
  const form = {
    name: 'register',
    title: 'Регистрация',
    button: 'Зарегистрироваться',
    loadingButton: 'Подождите...',
  };

  return (
    <FormTemplate
      isLoggedIn={isLoggedIn}
      onSubmit={onRegister}
      form={form}
      isLoading={isLoading}
    >
      <Link className="form__link" to="../sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </FormTemplate>
  );
};

export default Register;
