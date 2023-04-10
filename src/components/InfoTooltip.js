import React from 'react';
import Popup from './Popup';

const InfoTooltip = ({ isOpen, onClose, isInfoTooltip }) => {
  const info = {
    ok: 'Вы успешно зарегистрировались!',
    fail: 'Что-то пошло не так! Попробуйте ещё раз.',
  };

  return (
    <Popup name={`info-tooltip`} isOpen={isOpen} onClose={onClose}>
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
    </Popup>
  );
};

export default InfoTooltip;
