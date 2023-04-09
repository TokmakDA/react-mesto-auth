import React, { useState, useEffect, useRef } from 'react';

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

  const modalRef = useRef();

  function checkIsClickedOutside(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_${name} ${isOpen && 'popup_is-opened'}`}
      onClick={checkIsClickedOutside}
    >
      <div className="popup__container" ref={modalRef}>
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>

          {/* Инпуты */}
          {children}

          <button className="popup__button" type="submit" required>
            {currentButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
