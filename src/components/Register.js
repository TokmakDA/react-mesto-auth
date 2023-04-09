import React from 'react';
import FormTemplate from './FormTemplate';
import { Link } from 'react-router-dom';

const Register = ({ isLoggedIn, onRegister }) => {
  const form = {
    name: 'register',
    title: 'Регистрация',
    button: 'Зарегистрироваться',
  };

  return (
    <FormTemplate isLoggedIn={isLoggedIn} onSubmit={onRegister} form={form}>
      <Link className="form__link" to="../sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </FormTemplate>
  );
};

export default Register;
