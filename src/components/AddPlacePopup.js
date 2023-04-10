import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(values);
  }

  useEffect(() => {
    // сбрасываем инпуты
    setValues({ ...values, name: '', link: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'card-form'}
      title={'Новое место'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input"
          id="place-image-name"
          type="text"
          placeholder="Название"
          value={values?.name || ''}
          onChange={handleChange}
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error" id="place-image-name-error"></span>
        <input
          className="popup__input"
          id="place-image-link"
          type="url"
          placeholder="Ссылка на картинку"
          value={values?.link || ''}
          onChange={handleChange}
          name="link"
          required
        />
        <span className="popup__error" id="place-image-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
