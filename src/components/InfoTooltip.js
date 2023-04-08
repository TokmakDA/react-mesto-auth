import React from 'react';

const InfoTooltip = ({ isOpen, onClose }) => {
  const info = 'Вы успешно зарегистрировались!';
  const OK = true;
  return (
    <div className={`popup popup_info-tooltip ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <div className="popup__tooltip">
          <div
            className={`popup__tooltip-union popup__tooltip-union_${
              OK ? 'ok' : 'error'
            }`}
          />

          <p className="popup__tooltip-text">{info}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
