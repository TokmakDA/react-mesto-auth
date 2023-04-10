import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup name={'card-image'} isOpen={isOpen} onClose={onClose}>
      <img className="popup__image" src={card?.link} alt={card?.name} />
      <h2 className="popup__title-image">{card?.name}</h2>
    </Popup>
  );
}

export default ImagePopup;
