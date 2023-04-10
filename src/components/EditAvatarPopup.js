import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, setValues } = useForm();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar(values.avatar);
  }

  useEffect(() => {
    // сбрасываем инпуты
    setValues({ ...values, avatar: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'profile-avatar-form'}
      title={'Обновить аватар'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input"
          id="profile-avatar-link"
          type="url"
          placeholder="Введите ссылку на аватарку"
          value={values?.avatar || ''}
          onChange={handleChange}
          name="avatar"
          required
        />
        <span className="popup__error" id="profile-avatar-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
