import React from 'react';

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_card-image ${props.isOpen && 'popup_is-opened'}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button"
        ></button>
        <img className="popup__image" src={props.link} alt={props.name} />
        <h2 className="popup__title-image">{props.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
