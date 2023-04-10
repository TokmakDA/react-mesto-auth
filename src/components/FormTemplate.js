import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const FormTemplate = ({ isLoggedIn, onSubmit, form, children, isLoading }) => {
  const [currentButton, setButton] = useState(form.button);
  useEffect(
    () => (isLoading ? setButton(form.loadingButton) : setButton(form.button)),
    [isLoading, form]
  );

  const { values, handleChange } = useForm();

  // const [userData, setUserData] = useState({
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="form" name={`${form.name}-form`} onSubmit={handleSubmit}>
      <h2 className="form__title form__title_margin-bottom_m">{form.title}</h2>
      <fieldset className="form__inputs">
        <input
          autoComplete="email"
          type="email"
          className="form__input"
          id="email"
          placeholder="Email"
          value={values?.email || ''}
          onChange={handleChange}
          name="email"
          required
          maxLength="100"
        />
        <span id="email-error" className="form__error"></span>
        <input
          autoComplete="current-password"
          type="password"
          className="form__input"
          id="password"
          placeholder="Пароль"
          value={values?.password || ''}
          onChange={handleChange}
          name="password"
          maxLength="100"
          required
        />
        <span id="password-error" className="form__error"></span>
      </fieldset>
      <button type="submit" className="form__button">
        {currentButton}
      </button>
      {children}
    </form>
  );
};

export default FormTemplate;
