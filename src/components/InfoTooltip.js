import React from 'react';

const InfoTooltip = ({ isOpen, onClose, isInfoTooltip }) => {
  const info = {
    ok: 'Вы успешно зарегистрировались!',
    fail: 'Что-то пошло не так! Попробуйте ещё раз.',
  };
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
