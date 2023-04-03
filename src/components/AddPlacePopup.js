import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [values, setValues] = useState({ name: '', link: '' });

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(values);

  }

  useEffect(()=>{
    // сбрасываем инпуты
    setValues({ ...values, name: '', link: '' });
  }, [isOpen])


  return (
    <PopupWithForm
      name={'card-form'}
      title={'Новое место'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      isLoading={isLoading}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input"
          id="place-image-name"
          type="text"
          placeholder="Название"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          name="placeImageName"
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
          value={values.link}
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          name="placeImageLink"
          required
        />
        <span className="popup__error" id="place-image-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
