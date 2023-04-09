import React, { useRef } from 'react';

const InfoTooltip = ({ isOpen, onClose, isInfoTooltip }) => {
  const info = {
    ok: 'Вы успешно зарегистрировались!',
    fail: 'Что-то пошло не так! Попробуйте ещё раз.',
  };
  const modalRef = useRef();

  function checkIsClickedOutside(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_info-tooltip ${isOpen && 'popup_is-opened'}`}
      onClick={checkIsClickedOutside}
    >
      <div className="popup__container" ref={modalRef}>
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <div className="popup__tooltip">
          <div
            className={`popup__tooltip-union popup__tooltip-union_${
              isInfoTooltip ? 'ok' : 'error'
            }`}
          />
          <p className="popup__tooltip-text">
            {isInfoTooltip ? info.ok : info.fail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
