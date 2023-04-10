import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function PopupWithForm({
  name,
  title,
  button,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  children,
}) {
  const [currentButton, setButton] = useState(button);

  // Меняем кнопку на попапе
  useEffect(
    () =>
      isLoading
        ? setButton('Вносим изменения, подождите...')
        : setButton(button),
    [isLoading, button]
  );

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form className="popup__form" name={name} onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>

        {/* Инпуты */}
        {children}

        <button className="popup__button" type="submit" required>
          {currentButton}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
