import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [values, setValues] = useState({ name: '', about: '' });

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({
      name: currentUser?.name,
      about: currentUser?.about,
    });
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name={'profile-form'}
      title={'Редактировать профиль'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      isLoading={isLoading}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input"
          id="profile-name"
          placeholder="Имя"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          name="profileName"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error" id="profile-name-error"></span>
        <input
          className="popup__input"
          id="profile-job"
          type="text"
          placeholder="О себе"
          value={values.about}
          onChange={(e) => setValues({ ...values, about: e.target.value })}
          name="profileJob"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error" id="profile-job-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
