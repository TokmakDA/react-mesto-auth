import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ isLoggedIn, onLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userData);
  };

  return (
    <div className="">
      <div className="spinner">
        <i></i>
      </div>
      <form className="form" name="new-card-form" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_margin-bottom_m">Вход</h2>
        <fieldset className="form__inputs">
          <input
            type="email"
            className="form__input"
            id="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            name="email"
            required
            maxLength="100"
          />
          <span id="email-error" className="form__error"></span>
          <input
            type="password"
            className="form__input"
            id="password"
            placeholder="Пароль"
            value={userData.password}
            onChange={handleChange}
            name="password"
            maxLength="100"
            required
          />
          <span id="password-error" className="form__error"></span>
        </fieldset>
        <button type="submit" className="form__button">
          {'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
